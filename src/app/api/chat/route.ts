import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log("--- /api/chat request started ---"); // Log start
  let step = 'initializing'; // Track progress

  try {
    step = 'parsing request body';
    const body = await request.json();
    const { query: userQuery, userId } = body; // Destructure query and userId
    console.log("Received query for n8n:", userQuery);
    console.log("Received userId:", userId); // Log userId

    step = 'reading environment variable';
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("N8N_WEBHOOK_URL is not set in environment variables.");
      return NextResponse.json({ error: 'Webhook URL not configured' }, { status: 500 });
    }

    if (!userQuery || !userId) { // Check for userId too
        console.log("Query or userId is missing from request body");
        return NextResponse.json({ error: 'Query or userId is missing' }, { status: 400 }); // Updated error message
    }

    // Send the query to the n8n webhook
    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: userQuery, userId: userId }), // Send userId to n8n
    });
    console.log(`n8n response status: ${n8nResponse.status}`); // Log status

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      console.error(`n8n webhook request failed with status ${n8nResponse.status}: ${errorText}`);
      throw new Error(`n8n webhook failed: ${n8nResponse.statusText}`);
    }

    // Assume n8n returns JSON like { "answer": "..." }
    const n8nData = await n8nResponse.json();
    const aiResponse = n8nData.answer; // Adjust '.answer' if n8n returns a different structure

    if (!aiResponse) {
        console.error("n8n response did not contain an 'answer' field:", n8nData);
        throw new Error("Invalid response structure from n8n");
    }

    console.log("Received answer from n8n:", aiResponse);

    return NextResponse.json({ response: aiResponse }); // Send n8n's answer back to the frontend

  } catch (error) {
    console.error("Error in /api/chat:", error);
    // Provide a generic error to the frontend, details are logged server-side
    return NextResponse.json({ error: 'Failed to process chat request due to an internal error.' }, { status: 500 });
  }
} 