import type { Question } from '../types'

type Props = {
  question: Question
  selectedIndex: number | null
  questionNumber: number
  total: number
  onAnswer: (index: number) => void
  onPrev: () => void
  onSubmit: () => void
  canGoBack: boolean
  isLast: boolean
  allAnswered: boolean
}

const optionLabels = ['A', 'B', 'C', 'D'] as const

export function QuestionCard({
  question,
  selectedIndex,
  questionNumber,
  total,
  onAnswer,
  onPrev,
  onSubmit,
  canGoBack,
  isLast,
  allAnswered,
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs text-[var(--text)] mb-2">
          第 {questionNumber} 题，共 {total} 题
        </p>
        <h2 className="text-xl font-medium text-[var(--text-h)] leading-snug">
          {question.prompt}
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {question.options.map((option, index) => {
          const selected = selectedIndex === index
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onAnswer(index)}
              className={[
                'flex items-start gap-3 text-left px-4 py-3 rounded-lg border transition-all duration-150',
                'hover:border-[var(--accent)] hover:bg-[var(--accent-bg)]',
                selected
                  ? 'border-[var(--accent)] bg-[var(--accent-bg)] text-[var(--text-h)]'
                  : 'border-[var(--border)] text-[var(--text)]',
              ].join(' ')}
            >
              <span
                className={[
                  'shrink-0 w-6 h-6 rounded-full text-xs font-mono flex items-center justify-center border',
                  selected
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
                    : 'border-[var(--border)]',
                ].join(' ')}
              >
                {optionLabels[index]}
              </span>
              <span className="pt-0.5">{option.text}</span>
            </button>
          )
        })}
      </div>

      <div className="flex justify-between items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canGoBack}
          className="px-4 py-2 text-sm rounded-lg border border-[var(--border)] text-[var(--text)] disabled:opacity-30 hover:border-[var(--accent)] transition-colors"
        >
          ← 上一题
        </button>

        {isLast && allAnswered && (
          <button
            type="button"
            onClick={onSubmit}
            className="px-5 py-2 text-sm rounded-lg bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-opacity"
          >
            查看结果 →
          </button>
        )}
      </div>
    </div>
  )
}
