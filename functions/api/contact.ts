interface ContactPayload {
  name: string;
  email: string;
  tour: string;
  message: string;
}

interface Env {
  CONTACT_EMAIL?: string;
  RESEND_API_KEY?: string;
}

interface CFContext {
  request: Request;
  env: Env;
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function onRequestPost(context: CFContext): Promise<Response> {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  try {
    const body = (await context.request.json()) as ContactPayload;

    // Validate required fields
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return new Response(JSON.stringify({ error: "Name, email, and message are required" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const toEmail = context.env.CONTACT_EMAIL || "atlantistours@buyalgarveproperties.com";
    const apiKey = context.env.RESEND_API_KEY;

    if (!apiKey) {
      // Log to console for debugging but don't expose to client
      console.error("RESEND_API_KEY not configured");
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 503,
        headers: corsHeaders,
      });
    }

    const tourLabel = body.tour || "Not specified";
    const emailBody = `New contact form submission:\n\nName: ${body.name}\nEmail: ${body.email}\nTour Interest: ${tourLabel}\n\nMessage:\n${body.message}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Atlantis Tours <noreply@atlantistours.pt>",
        to: [toEmail],
        reply_to: [body.email],
        subject: `Contact from ${body.name}${body.tour ? ` — ${body.tour}` : ""}`,
        text: emailBody,
      }),
    });

    if (!res.ok) {
      console.error("Resend API error:", await res.text());
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 502,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("Contact form error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}
