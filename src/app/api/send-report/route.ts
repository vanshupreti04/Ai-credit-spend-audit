import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, reportUrl, monthlySavings, annualSavings } =
      await request.json();

    if (!email || !reportUrl) {
      return NextResponse.json(
        { error: "Missing email or report URL" },
        { status: 400 },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Missing RESEND_API_KEY" },
        { status: 500 },
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const fullReportUrl = `${siteUrl}${reportUrl}`;

    const { data, error } = await resend.emails.send({
      from: "Credex Audit <onboarding@resend.dev>",
      to: [email],
      subject: "Your AI Spend Audit Report is ready",
      html: `
        <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:32px;">
          <div style="max-width:640px; margin:0 auto; background:#ffffff; border-radius:24px; padding:32px; border:1px solid #e2e8f0;">
            <p style="font-size:12px; font-weight:700; color:#d946ef; text-transform:uppercase; letter-spacing:1.5px;">
              Credex AI Spend Audit
            </p>

            <h1 style="font-size:30px; color:#0f172a; margin:12px 0;">
              Your audit report is ready
            </h1>

            <p style="font-size:16px; line-height:1.6; color:#475569;">
              Your audit found an estimated 
              <strong>$${monthlySavings}/month</strong> and 
              <strong>$${annualSavings}/year</strong> optimization opportunity.
            </p>

            <a href="${fullReportUrl}" style="display:inline-block; margin-top:20px; background:#0f172a; color:white; padding:14px 22px; border-radius:14px; text-decoration:none; font-weight:700;">
              View Report
            </a>

            <p style="font-size:13px; color:#64748b; margin-top:24px;">
              Public report link: ${fullReportUrl}
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to send report",
      },
      { status: 500 },
    );
  }
}