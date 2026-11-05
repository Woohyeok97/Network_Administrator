interface QuestionBase {
  prompt: string;
  explanation: string;
  isRestored?: boolean;
}

export interface ShortQuestion extends QuestionBase {
  type: 'short';
  accepted: string[];
}

export interface BlanksQuestion extends QuestionBase {
  type: 'blanks';
  blanks: { label: string; accepted: string[] }[];
  options?: string[];
}

export interface ListQuestion extends QuestionBase {
  type: 'list';
  count: number;
  accepted: string[];
}

export interface SingleChoiceQuestion extends QuestionBase {
  type: 'single';
  options: string[];
  answer: string;
}

export interface MultipleChoiceQuestion extends QuestionBase {
  type: 'multiple';
  options: string[];
  answers: string[];
}

export type Question =
  | ShortQuestion
  | BlanksQuestion
  | ListQuestion
  | SingleChoiceQuestion
  | MultipleChoiceQuestion;

export interface Exam {
  id: string;
  title: string;
  year?: number;
  questions: Question[];
}

const normalizeAnswer = (value: string) =>
  value.replace(/\s+/g, '').toLowerCase();

const matchesAccepted = (value: string, accepted: string[]) =>
  accepted.some(answer => normalizeAnswer(answer) === normalizeAnswer(value));

export function isCorrectResponse(question: Question, response: string[]) {
  switch (question.type) {
    case 'short':
      return matchesAccepted(response[0] ?? '', question.accepted);
    case 'blanks':
      return question.blanks.every((blank, index) =>
        matchesAccepted(response[index] ?? '', blank.accepted)
      );
    case 'list': {
      const entries = response.filter(entry => entry?.trim());
      const uniqueEntries = new Set(entries.map(normalizeAnswer));
      return (
        uniqueEntries.size === question.count &&
        entries.every(entry => matchesAccepted(entry, question.accepted))
      );
    }
    case 'single':
      return response[0] === question.answer;
    case 'multiple':
      return (
        response.length === question.answers.length &&
        question.answers.every(answer => response.includes(answer))
      );
  }
}

export function getAnswerText(question: Question) {
  switch (question.type) {
    case 'short':
      return question.accepted[0];
    case 'blanks':
      return question.blanks
        .map(blank => `${blank.label} ${blank.accepted[0]}`)
        .join('\n');
    case 'list':
      return question.accepted.length > question.count
        ? `${question.accepted.join(', ')} 중 ${question.count}가지`
        : question.accepted.join(', ');
    case 'single':
      return question.answer;
    case 'multiple':
      return question.answers.join('\n');
  }
}

export function getQuestionTypeLabel(question: Question) {
  switch (question.type) {
    case 'short':
    case 'list':
      return '단답형';
    case 'blanks':
      return question.options ? '연결형' : '빈칸형';
    case 'single':
      return '선택형';
    case 'multiple':
      return '복수 선택';
  }
}
