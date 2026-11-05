import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import type { Question } from '@/lib/exam';

interface ResponseInputProps {
  question: Question;
  response: string[];
  disabled: boolean;
  onChange: (response: string[]) => void;
}

export default function ResponseInput({
  question,
  response,
  disabled,
  onChange
}: ResponseInputProps) {
  const handleChangeEntry = (index: number, value: string) => {
    const nextResponse = [...response];
    nextResponse[index] = value;
    onChange(nextResponse);
  };

  const handleToggleOption = (option: string) => {
    onChange(
      response.includes(option)
        ? response.filter(selected => selected !== option)
        : [...response, option]
    );
  };

  switch (question.type) {
    case 'short':
      return (
        <Input
          aria-label="답 입력"
          placeholder="답 입력"
          value={response[0] ?? ''}
          disabled={disabled}
          onChange={event => handleChangeEntry(0, event.target.value)}
        />
      );

    case 'list':
      return (
        <div className="grid gap-2 sm:grid-cols-3">
          {Array.from({ length: question.count }, (_, index) => (
            <Input
              key={index}
              aria-label={`답 ${index + 1}`}
              placeholder={`답 ${index + 1}`}
              value={response[index] ?? ''}
              disabled={disabled}
              onChange={event => handleChangeEntry(index, event.target.value)}
            />
          ))}
        </div>
      );

    case 'blanks':
      return (
        <div className="grid gap-2">
          {question.blanks.map((blank, index) => (
            <div key={blank.label} className="flex items-center gap-3">
              <span className="w-8 shrink-0 text-sm font-medium">
                {blank.label}
              </span>
              {question.options ? (
                <Select
                  value={response[index] ?? ''}
                  disabled={disabled}
                  onValueChange={value => handleChangeEntry(index, value)}
                >
                  <SelectTrigger aria-label={`${blank.label} 선택`}>
                    <SelectValue placeholder="선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {question.options.map(option => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  aria-label={`${blank.label} 답 입력`}
                  value={response[index] ?? ''}
                  disabled={disabled}
                  onChange={event =>
                    handleChangeEntry(index, event.target.value)
                  }
                />
              )}
            </div>
          ))}
        </div>
      );

    case 'single':
      return (
        <RadioGroup
          value={response[0] ?? ''}
          disabled={disabled}
          onValueChange={value => onChange([value])}
        >
          {question.options.map(option => (
            <label key={option} className="flex items-center gap-3 text-sm">
              <RadioGroupItem value={option} />
              {option}
            </label>
          ))}
        </RadioGroup>
      );

    case 'multiple':
      return (
        <div className="grid gap-3">
          {question.options.map(option => (
            <label key={option} className="flex items-center gap-3 text-sm">
              <Checkbox
                checked={response.includes(option)}
                disabled={disabled}
                onCheckedChange={() => handleToggleOption(option)}
              />
              {option}
            </label>
          ))}
        </div>
      );
  }
}
