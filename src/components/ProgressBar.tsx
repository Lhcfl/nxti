type Props = {
  currentIndex: number
  maxReachedIndex: number
  total: number
}

export function ProgressBar({ currentIndex, maxReachedIndex, total }: Props) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-[var(--text)] mb-1.5">
        <span>
          {currentIndex + 1} / {total}
        </span>
        <span>{Math.round(((currentIndex + 1) / total) * 100)}%</span>
      </div>
      <div className="flex gap-0.5 h-1.5">
        {Array.from({ length: total }).map((_, idx) => {
          let bgColor = 'bg-[var(--border)]' // 未完成
          if (idx === currentIndex) {
            bgColor = 'bg-[var(--accent)]' // 当前点
          } else if (idx <= maxReachedIndex) {
            bgColor = 'bg-green-500' // 已走过/已完成
          }
          return (
            <div
              key={idx}
              className={`flex-1 rounded-sm ${bgColor} transition-colors duration-300`}
            />
          )
        })}
      </div>
    </div>
  )
}
