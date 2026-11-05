import Link from 'next/link';

import { Card } from '@/components/ui/card';
import { examYears, exams, frequentExam } from '@/data/exams';
import type { Exam } from '@/lib/exam';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">네트워크관리사 2급 실기 기출</h1>
        <p className="text-sm text-muted-foreground">단답형/선택형 연습</p>
      </header>

      {examYears.map(year => (
        <ExamSection
          key={year}
          title={`${year}년`}
          exams={exams.filter(exam => exam.year === year)}
        />
      ))}

      <ExamSection title="회차 구분 없음" exams={[frequentExam]} />
    </div>
  );
}

interface ExamSectionProps {
  title: string;
  exams: Exam[];
}

function ExamSection({ title, exams }: ExamSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-semibold">{title}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {exams.map(exam => (
          <Link key={exam.id} href={`/exams/${exam.id}`}>
            <Card className="gap-1 p-4 transition-colors hover:bg-accent">
              <span className="font-medium">
                {exam.title.replace(/^\d+년 /, '')}
              </span>
              <span className="text-sm text-muted-foreground">
                {exam.questions.length}문제
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
