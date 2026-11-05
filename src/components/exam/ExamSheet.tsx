'use client';

import { useState } from 'react';

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

  const handleChangeResponse = (index: number, response: string[]) => {
    setResponses(current => ({ ...current, [index]: response }));
  };

  const handleGradeExam = () => {
    setIsGraded(true);
  };

  const handleRetryExam = () => {
    setResponses({});
    setIsGraded(false);
    setAttempt(current => current + 1);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{exam.title}</h1>

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
