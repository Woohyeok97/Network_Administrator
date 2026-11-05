import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import ExamSheet from '@/components/exam/ExamSheet';
import { exams, findExam, frequentExam } from '@/data/exams';

type ExamPageProps = PageProps<'/exams/[examId]'>;

export function generateStaticParams() {
  return [...exams, frequentExam].map(exam => ({ examId: exam.id }));
}

export default function ExamPage({ params }: ExamPageProps) {
  return (
    <Suspense>
      <ExamContent params={params} />
    </Suspense>
  );
}

async function ExamContent({ params }: Pick<ExamPageProps, 'params'>) {
  const { examId } = await params;
  const exam = findExam(examId);

  if (!exam) notFound();

  return <ExamSheet exam={exam} />;
}
