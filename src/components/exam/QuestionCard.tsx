import { useState } from 'react';
import { CheckIcon, XIcon } from 'lucide-react';

import ResponseInput from '@/components/exam/ResponseInput';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  getAnswerText,
  getQuestionTypeLabel,
  type Question
} from '@/lib/exam';

interface QuestionCardProps {
  number: number;
  question: Question;
  response: string[];
  isGraded: boolean;
  isCorrect: boolean;
  onChangeResponse: (response: string[]) => void;
}

export default function QuestionCard({
  number,
  question,
  response,
  isGraded,
  isCorrect,
  onChangeResponse
}: QuestionCardProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [isSolutionVisible, setIsSolutionVisible] = useState(false);

  const handleChangeResponse = (nextResponse: string[]) => {
    setIsChecked(false);
    onChangeResponse(nextResponse);
  };

  return (
    <Card>
      <div className="flex items-center gap-2">
        <h2 className="font-semibold">문제 {number}</h2>
        <Badge>{getQuestionTypeLabel(question)}</Badge>
        {question.isRestored ? <Badge>복원된 문제</Badge> : null}
        {isGraded || isChecked ? <GradeMark isCorrect={isCorrect} /> : null}
      </div>

      <p className="leading-relaxed whitespace-pre-line">{question.prompt}</p>

      <ResponseInput
        question={question}
        response={response}
        disabled={isGraded}
        onChange={handleChangeResponse}
      />

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={isGraded}
          onClick={() => setIsChecked(true)}
        >
          정답 확인
        </Button>
        <Button
          variant="outline"
          size="sm"
          aria-expanded={isSolutionVisible}
          onClick={() => setIsSolutionVisible(current => !current)}
        >
          정답&해설
        </Button>
      </div>

      {isSolutionVisible ? (
        <>
          <RevealedText title="정답" text={getAnswerText(question)} />
          <RevealedText title="해설" text={question.explanation} />
        </>
      ) : null}
    </Card>
  );
}

function GradeMark({ isCorrect }: { isCorrect: boolean }) {
  return isCorrect ? (
    <span className="ml-auto flex items-center gap-1 text-sm font-medium text-success">
      <CheckIcon className="size-4" />
      정답
    </span>
  ) : (
    <span className="ml-auto flex items-center gap-1 text-sm font-medium text-destructive">
      <XIcon className="size-4" />
      오답
    </span>
  );
}

interface RevealedTextProps {
  title: string;
  text: string;
}

function RevealedText({ title, text }: RevealedTextProps) {
  return (
    <div className="rounded-md bg-muted p-3 text-sm leading-relaxed">
      <p className="mb-1 font-semibold">{title}</p>
      <p className="whitespace-pre-line">{text}</p>
    </div>
  );
}
