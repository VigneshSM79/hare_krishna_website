// Supabase Edge Function: imagekit-upload
// Purpose: Securely upload images to ImageKit.io without exposing private key to frontend
// Runtime: Deno

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface UploadRequest {
  file: string; // Base64 encoded file
  fileName: string;
  folder?: string;
}

interface ImageKitUploadResponse {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  height: number;
  width: number;
  size: number;
  filePath: string;
  tags: string[];
  isPrivateFile: boolean;
  customCoordinates: string | null;
  fileType: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Verify authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }

    // Create Supabase client to verify the JWT token
    // Note: SUPABASE_URL and SUPABASE_ANON_KEY are automatically provided by Supabase Edge Functions
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: authHeader },
      },
    });

    // Verify the user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized - Invalid or expired token" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`Authenticated user: ${user.id} (${user.email})`);

    // 2. Get ImageKit credentials from environment (SECURE - stays on server)
    const imagekitPublicKey = Deno.env.get("IMAGEKIT_PUBLIC_KEY");
    const imagekitPrivateKey = Deno.env.get("IMAGEKIT_PRIVATE_KEY");
    const imagekitUrlEndpoint = Deno.env.get("IMAGEKIT_URL_ENDPOINT");

    if (!imagekitPublicKey || !imagekitPrivateKey || !imagekitUrlEndpoint) {
      throw new Error("Missing ImageKit configuration");
    }

    // 3. Parse request body
    const body: UploadRequest = await req.json();

    if (!body.file || !body.fileName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: file and fileName" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 4. Prepare ImageKit upload request
    const folder = body.folder || "temple-images";

    // Create form data for ImageKit upload
    const formData = new FormData();
    formData.append("file", body.file);
    formData.append("fileName", body.fileName);
    formData.append("folder", folder);
    formData.append("useUniqueFileName", "true");

    // 5. Upload to ImageKit with private key (SECURE)
    const authToken = btoa(`${imagekitPrivateKey}:`);

    console.log(`Uploading file: ${body.fileName} to folder: ${folder}`);

    const uploadResponse = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${authToken}`,
      },
      body: formData,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error("ImageKit upload failed:", errorText);
      throw new Error(`ImageKit upload failed: ${uploadResponse.status} - ${errorText}`);
    }

    const uploadResult: ImageKitUploadResponse = await uploadResponse.json();

    console.log(`Upload successful: ${uploadResult.fileId}`);

    // 6. Return success response
    return new Response(
      JSON.stringify({
        success: true,
        data: uploadResult,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error in imagekit-upload function:", error);

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
