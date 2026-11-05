'use client';

import { useState } from 'react';
import Link from 'next/link';

import QuestionCard from '@/components/exam/QuestionCard';
import { Button } from '@/components/ui/button';
import { isCorrectResponse, type Exam } from '@/lib/exam';

interface ExamSheetProps {
  exam: Exam;
}

export default function ExamSheet({ exam }: ExamSheetProps) {
  const [responses, setResponses] = useState<Record<number, string[]>>({});
  const [isGraded, setIsGraded] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const results = exam.questions.map((question, index) =>
    isCorrectResponse(question, responses[index] ?? [])
  );
  const correctCount = results.filter(Boolean).length;

  const handleChangeResponse = (index: number, response: string[]) => {
    setResponses(current => ({ ...current, [index]: response }));
  };

  const handleGradeExam = () => {
    setIsGraded(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetryExam = () => {
    setResponses({});
    setIsGraded(false);
    setAttempt(current => current + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← 목록으로
        </Link>
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-2xl font-bold">{exam.title}</h1>
          {isGraded ? (
            <p className="font-semibold">
              {correctCount} / {exam.questions.length} 정답
            </p>
          ) : null}
        </div>
      </header>

      {exam.questions.map((question, index) => (
        <QuestionCard
          key={`${attempt}-${index}`}
          number={index + 1}
          question={question}
          response={responses[index] ?? []}
          isGraded={isGraded}
          isCorrect={results[index]}
          onChangeResponse={response => handleChangeResponse(index, response)}
        />
      ))}

      <div className="flex justify-center gap-3">
        <Button onClick={handleGradeExam} disabled={isGraded}>
          채점하기
        </Button>
        <Button variant="outline" onClick={handleRetryExam}>
          다시 풀기
        </Button>
      </div>
    </div>
  );
}
