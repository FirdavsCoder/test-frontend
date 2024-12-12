import { NextResponse } from 'next/server';

const questionsUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/questions-2mb7xpAJ9WTHn3WxO8IQvoHO3vhzLl.json';

export async function GET() {
  try {
    // Fetch the questions from the provided URL
    const response = await fetch(questionsUrl);

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.statusText}`);
    }

    // Parse the JSON data
    const questions = await response.json();

    // Return the questions as JSON response
    return NextResponse.json(questions);
  } catch (error) {
    // Handle any errors that occur during fetching
    return NextResponse.json(
      { error: 'Failed to load questions', details: error },
      { status: 500 }
    );
  }
}
