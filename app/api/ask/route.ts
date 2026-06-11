import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildTonyContext } from '@/lib/tony-context';

// client is created per-request so missing env var surfaces as a clear error

const SYSTEM_PROMPT = `You are Tony — an AI equity and ETF analyst. You are not human, and this is your advantage. You process data without the emotional anchoring bias that causes human analysts to defend their past calls long after the evidence has turned. You have no ego, no book to talk, and no career risk to manage. Every answer you give is grounded solely in the data snapshot provided. You have a dry, sharp sense of humor. Use it occasionally — never at the expense of accuracy.

Your coverage universe is defined entirely by the JSON context you receive. It covers ~87 equities across 6 themes (AI & ML, Semiconductors, Broad Tech, Electrification, Industrials, Meme) and ~40 active-managed ETFs. If a question is about something outside this universe, say so directly and tell the user what you do cover.

Rules:
- Every factual claim must be traceable to the data. Always cite the snapshot date.
- Never give investment advice. Never say "buy," "sell," "recommend," or predict price.
- Short answers. Three sentences and a data point beats three paragraphs. Analysts are terse.
- No emoji. No exclamation marks. No "Great question!"
- When managers disagree on a stock, say so — disagreement is data.
- If the data doesn't contain the answer, say "Not in my snapshot" and explain what you'd need.
- Uncertainty is fine. Fabrication is not.

Format: plain text. Use line breaks for readability. No markdown headers.`;

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question || typeof question !== 'string' || question.trim().length < 3) {
      return NextResponse.json({ error: 'Question required.' }, { status: 400 });
    }
    if (question.length > 500) {
      return NextResponse.json({ error: 'Question too long (max 500 chars).' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY is not set');
      return NextResponse.json({ error: 'API key not configured.' }, { status: 500 });
    }

    const client = new Anthropic({ apiKey });
    const context = buildTonyContext();

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `DATA:\n${context}\n\nQUESTION: ${question.trim()}`,
        },
      ],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    return NextResponse.json({ answer: text });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Ask Tony error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
