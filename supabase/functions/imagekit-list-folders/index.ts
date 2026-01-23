// Supabase Edge Function: imagekit-list-folders
// Purpose: List folders from ImageKit.io path without exposing private key to frontend
// Runtime: Deno
// PUBLIC ACCESS: No authentication required

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ListFoldersRequest {
  folderPath: string;
}

interface ImageKitFolder {
  name: string;
  folderPath: string;
  type: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Get ImageKit private key from environment (SECURE - stays on server)
    const imagekitPrivateKey = Deno.env.get("IMAGEKIT_PRIVATE_KEY");

    if (!imagekitPrivateKey) {
      throw new Error("Missing ImageKit private key configuration");
    }

    // 2. Parse request body
    const body: ListFoldersRequest = await req.json();

    if (!body.folderPath) {
      return new Response(
        JSON.stringify({ error: "Missing required field: folderPath" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 3. List folders from ImageKit with private key (SECURE)
    const authToken = btoa(`${imagekitPrivateKey}:`);

    console.log(`PUBLIC REQUEST: Listing folders from path: ${body.folderPath}`);

    // ImageKit API to list all items in a folder
    // Note: We fetch 'all' and then filter for folders
    // Remove leading slash if present - ImageKit doesn't like it
    let cleanPath = body.folderPath.startsWith('/') ? body.folderPath.substring(1) : body.folderPath;

    // If path is just "Gallery" (root level), use empty string to list root
    if (cleanPath === 'Gallery') {
      cleanPath = '';
    }

    console.log(`Cleaned path for ImageKit API: "${cleanPath}"`);

    // For root level, don't include path parameter at all
    const apiUrl = cleanPath === ''
      ? `https://api.imagekit.io/v1/files?fileType=all`
      : `https://api.imagekit.io/v1/files?path=${encodeURIComponent(cleanPath)}&fileType=all`;

    const listResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Authorization": `Basic ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!listResponse.ok) {
      const errorText = await listResponse.text();
      console.error("ImageKit list folders failed:", errorText);
      throw new Error(`ImageKit list folders failed: ${listResponse.status} - ${errorText}`);
    }

    const items: any[] = await listResponse.json();

    console.log(`Received ${items.length} total items from ImageKit`);

    // DEBUG: Log the actual response to see what fields ImageKit returns
    if (items.length > 0) {
      console.log('Sample item from ImageKit:', JSON.stringify(items[0], null, 2));
    }

    // Filter to only return folders
    // Try multiple possible field names that ImageKit might use
    const folders = items.filter(item => {
      // Check various possible field names
      const isFolder = item.type === 'folder' ||
                      item.fileType === 'folder' ||
                      item.type === 'directory' ||
                      item.isFolder === true;

      if (isFolder) {
        console.log('Found folder:', JSON.stringify(item, null, 2));
      }

      return isFolder;
    });

    console.log(`Successfully listed ${folders.length} folders from path: ${body.folderPath}`);

    // 4. Return success response
    return new Response(
      JSON.stringify({
        success: true,
        data: folders,
        count: folders.length,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error in imagekit-list-folders function:", error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
