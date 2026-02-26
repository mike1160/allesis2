import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { naam, email, onderwerp, bericht } = await request.json();

    if (!naam || !email || !bericht) {
      return NextResponse.json({ error: "Vul alle verplichte velden in." }, { status: 400 });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Allesis Contact <onboarding@resend.dev>",
      to: "leerthaismetmij@gmail.com",
      replyTo: email,
      subject: `Nieuw bericht: ${onderwerp || "Contactformulier"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a3bcc; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">Nieuw bericht via Allesis.nl</h1>
          </div>
          <div style="background: #f8f9fc; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e2e6f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 100px;">Naam</td><td style="padding: 8px 0; font-weight: bold; color: #0f172a;">${naam}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">E-mail</td><td style="padding: 8px 0; color: #1a3bcc;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Onderwerp</td><td style="padding: 8px 0; color: #0f172a;">${onderwerp || "-"}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e2e6f0; margin: 20px 0;" />
            <h3 style="color: #0f172a; margin: 0 0 12px;">Bericht:</h3>
            <p style="color: #374151; line-height: 1.7; white-space: pre-wrap;">${bericht}</p>
            <hr style="border: none; border-top: 1px solid #e2e6f0; margin: 20px 0;" />
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">Beantwoord direct door op Reply te klikken in uw e-mailclient.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mail error:", error);
    return NextResponse.json({ error: "Verzenden mislukt. Probeer het opnieuw." }, { status: 500 });
  }
}
