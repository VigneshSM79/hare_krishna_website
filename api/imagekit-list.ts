// Vercel Serverless Function: POST /api/imagekit-list
// Replaces the former Supabase Edge Function `imagekit-list`.
//
// Purpose: list the images in an ImageKit folder so the public Gallery can
// display them. Uses the ImageKit PRIVATE key, which stays server-side and is
// NEVER sent to the browser.
//
// Required env var (set in Vercel → Project → Settings → Environment Variables,
// and in .env.local for local `vercel dev`):
//   IMAGEKIT_PRIVATE_KEY=private_xxxxxxxx
//
// `fetch` and `Buffer` are globally available in Vercel's Node runtime.

// Minimal structural types so we don't need the @vercel/node dependency.
interface Req {
  method?: string;
  body: unknown;
}
interface Res {
  status: (code: number) => Res;
  json: (body: unknown) => void;
}

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!privateKey) {
    return res.status(500).json({ error: 'Missing ImageKit private key configuration' });
  }

  // Vercel auto-parses JSON bodies, but guard for a raw string just in case.
  const body =
    typeof req.body === 'string'
      ? JSON.parse(req.body || '{}')
      : ((req.body as Record<string, unknown>) || {});

  const folderPath = typeof body.folderPath === 'string' ? body.folderPath : '';
  if (!folderPath) {
    return res.status(400).json({ error: 'Missing required field: folderPath' });
  }

  // ImageKit's API doesn't want a leading slash on the path.
  const cleanPath = folderPath.startsWith('/') ? folderPath.slice(1) : folderPath;
  const authToken = Buffer.from(`${privateKey}:`).toString('base64');
  const apiUrl = `https://api.imagekit.io/v1/files?path=${encodeURIComponent(cleanPath)}`;

  try {
    const listResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!listResponse.ok) {
      const errorText = await listResponse.text();
      return res
        .status(502)
        .json({ error: `ImageKit list failed: ${listResponse.status} - ${errorText}` });
    }

    const files = await listResponse.json();

    return res.status(200).json({
      success: true,
      data: files,
      count: Array.isArray(files) ? files.length : 0,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
}
