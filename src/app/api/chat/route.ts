import Anthropic from "@anthropic-ai/sdk";
import { AGENT_SYSTEM_PROMPT } from "@/lib/agent-context";

// Caps the newest user message (what the browser lets someone type/paste in).
const MAX_USER_MESSAGE_LENGTH = 1000;
// Sanity ceiling for anything in the array, incl. our own past replies —
// generous enough that a normal Claude response never hits it.
const MAX_ANY_MESSAGE_LENGTH = 8000;
const MAX_HISTORY_MESSAGES = 16;

type ChatMessage = { role: "user" | "assistant"; content: string };

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  if (candidate.role !== "user" && candidate.role !== "assistant") return false;
  if (typeof candidate.content !== "string" || candidate.content.length === 0) return false;
  if (candidate.content.length > MAX_ANY_MESSAGE_LENGTH) return false;
  // Only user-typed turns are capped to the input box's limit — Claude's own
  // past replies (role "assistant") are resent as history and can run longer.
  if (candidate.role === "user" && candidate.content.length > MAX_USER_MESSAGE_LENGTH) return false;
  return true;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const rawMessages = (body as Record<string, unknown>)?.messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return Response.json({ error: "messages must be a non-empty array." }, { status: 400 });
  }
  if (!rawMessages.every(isChatMessage)) {
    return Response.json(
      { error: `Each message needs a role of "user" or "assistant", with non-empty content (user messages up to ${MAX_USER_MESSAGE_LENGTH} characters).` },
      { status: 400 },
    );
  }

  const messages = (rawMessages as ChatMessage[]).slice(-MAX_HISTORY_MESSAGES);
  if (messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "The last message must be from the user." }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY is not set.");
    return Response.json({ error: "The assistant is not configured yet. Please email khangaienkhbat2026@depauw.edu instead." }, { status: 503 });
  }

  const workspaceId = process.env.ANTHROPIC_WORKSPACE_ID;
  const client = new Anthropic({
    apiKey,
    // Identity-linked API keys require this header on every request.
    defaultHeaders: workspaceId ? { "anthropic-workspace-id": workspaceId } : undefined,
  });

  try {
    const response = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 1024,
      system: AGENT_SYSTEM_PROMPT,
      messages,
    });

    const reply = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    if (!reply) {
      return Response.json({ error: "The assistant didn't return a response. Please try again." }, { status: 502 });
    }

    return Response.json({ reply });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return Response.json({ error: "Getting a lot of questions right now — please try again in a moment." }, { status: 429 });
    }
    if (error instanceof Anthropic.AuthenticationError) {
      console.error("Anthropic authentication error:", error.message);
      return Response.json({ error: "The assistant is misconfigured. Please email khangaienkhbat2026@depauw.edu instead." }, { status: 503 });
    }
    if (error instanceof Anthropic.APIError) {
      console.error("Anthropic API error:", error.status, error.message);
      return Response.json({ error: "The assistant hit an error. Please try again." }, { status: 502 });
    }
    console.error("Unexpected chat route error:", error);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
