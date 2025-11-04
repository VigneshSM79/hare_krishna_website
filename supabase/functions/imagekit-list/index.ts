// Supabase Edge Function: imagekit-list
// Purpose: Securely list images from ImageKit.io folder without exposing private key to frontend
// Runtime: Deno

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ListRequest {
  folderPath: string;
}

interface ImageKitFile {
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
  fileType: string;
  createdAt: string;
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
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Missing Supabase configuration");
    }

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

    // 2. Get ImageKit private key from environment (SECURE - stays on server)
    const imagekitPrivateKey = Deno.env.get("IMAGEKIT_PRIVATE_KEY");

    if (!imagekitPrivateKey) {
      throw new Error("Missing ImageKit private key configuration");
    }

    // 3. Parse request body
    const body: ListRequest = await req.json();

    if (!body.folderPath) {
      return new Response(
        JSON.stringify({ error: "Missing required field: folderPath" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 4. List files from ImageKit with private key (SECURE)
    const authToken = btoa(`${imagekitPrivateKey}:`);

    console.log(`Listing files from folder: ${body.folderPath}`);

    const apiUrl = `https://api.imagekit.io/v1/files?path=${encodeURIComponent(body.folderPath)}`;

    const listResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Authorization": `Basic ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!listResponse.ok) {
      const errorText = await listResponse.text();
      console.error("ImageKit list failed:", errorText);
      throw new Error(`ImageKit list failed: ${listResponse.status} - ${errorText}`);
    }

    const files: ImageKitFile[] = await listResponse.json();

    console.log(`Listed ${files.length} files from folder: ${body.folderPath}`);

    // 5. Return success response
    return new Response(
      JSON.stringify({
        success: true,
        data: files,
        count: files.length,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error in imagekit-list function:", error);

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
