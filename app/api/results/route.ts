import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { answers, totalQuestions, correctAnswers, score } = body;

  // Bu yerda natijalarni ma'lumotlar bazasiga saqlash mantiqini qo'shishingiz mumkin
  console.log('Natijalar saqlandi:', { answers, totalQuestions, correctAnswers, score });

  return NextResponse.json({ message: 'Natijalar muvaffaqiyatli saqlandi' });
}

