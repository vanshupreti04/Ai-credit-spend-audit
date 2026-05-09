import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function createPublicId() {
  return crypto.randomUUID().slice(0, 8);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      email,
      companyName,
      role,
      teamSize,
      actionType,
      auditInput,
      auditResult,
      aiReport,
    } = body;

    if (!email || !auditResult || !auditInput) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const publicId = createPublicId();

    const { data: report, error: reportError } = await supabase
      .from("audit_reports")
      .insert({
        public_id: publicId,
        audit_input: auditInput,
        audit_result: auditResult,
        ai_report: aiReport,
      })
      .select("id, public_id")
      .single();

    if (reportError) {
      return NextResponse.json(
        { error: reportError.message },
        { status: 500 },
      );
    }

    const { error: leadError } = await supabase.from("audit_leads").insert({
      report_id: report.id,
      email,
      company_name: companyName || null,
      role: role || null,
      team_size: teamSize ? Number(teamSize) : null,
      action_type: actionType,
    });

    if (leadError) {
      return NextResponse.json(
        { error: leadError.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      publicId: report.public_id,
      reportUrl: `/report/${report.public_id}`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to save report",
      },
      { status: 500 },
    );
  }
}