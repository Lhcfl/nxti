type Props = {
  current: number
  total: number
  percent: number
}

export function ProgressBar({ current, total, percent }: Props) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-[var(--text)] mb-1.5">
        <span>
          {current} / {total}
        </span>
        <span>{percent}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
        <div
          className="h-full rounded-full bg-[var(--accent)] transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
