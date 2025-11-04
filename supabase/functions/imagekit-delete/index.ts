// Supabase Edge Function: imagekit-delete
// Purpose: Securely delete images from ImageKit.io without exposing private key to frontend
// Runtime: Deno

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DeleteRequest {
  fileId: string;
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

    // 2. Get ImageKit private key from environment (SECURE - stays on server)
    const imagekitPrivateKey = Deno.env.get("IMAGEKIT_PRIVATE_KEY");

    if (!imagekitPrivateKey) {
      throw new Error("Missing ImageKit private key configuration");
    }

    // 3. Parse request body
    const body: DeleteRequest = await req.json();

    if (!body.fileId) {
      return new Response(
        JSON.stringify({ error: "Missing required field: fileId" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 4. Delete from ImageKit with private key (SECURE)
    const authToken = btoa(`${imagekitPrivateKey}:`);

    console.log(`Deleting file: ${body.fileId}`);

    const deleteResponse = await fetch(
      `https://api.imagekit.io/v1/files/${body.fileId}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Basic ${authToken}`,
        },
      }
    );

    if (!deleteResponse.ok) {
      const errorText = await deleteResponse.text();
      console.error("ImageKit delete failed:", errorText);
      throw new Error(`ImageKit delete failed: ${deleteResponse.status} - ${errorText}`);
    }

    console.log(`Delete successful: ${body.fileId}`);

    // 5. Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "File deleted successfully",
        fileId: body.fileId,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error in imagekit-delete function:", error);

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
