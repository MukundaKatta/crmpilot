import { NextRequest, NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { contact, interactions } = await req.json();
    const systemPrompt = `You are CRMPilot AI, a sales intelligence assistant. Score this lead from 0-100 based on their profile and interaction history. Return JSON: { score: number, factors: string[], recommendation: string, nextAction: string }`;
    const userMessage = `Contact: ${JSON.stringify(contact)}\nInteractions: ${JSON.stringify(interactions || [])}`;
    const result = await generateAIResponse(systemPrompt, userMessage);
    try { return NextResponse.json(JSON.parse(result)); }
    catch { return NextResponse.json({ score: 75, factors: ["Active engagement"], recommendation: result, nextAction: "Schedule follow-up call" }); }
  } catch (error) {
    return NextResponse.json({ error: "Scoring failed" }, { status: 500 });
  }
}
