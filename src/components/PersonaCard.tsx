import type { RankedPersona } from '../types'

type Props = {
  ranked: RankedPersona
  rank: number
}

const rankEmoji = ['🥇', '🥈', '🥉']
const rankLabel = ['主人格', '次人格', '隐藏面']

export function PersonaCard({ ranked, rank }: Props) {
  const { persona } = ranked
  const isPrimary = rank === 0

  return (
    <div
      className={[
        'rounded-xl border p-5 flex flex-col gap-3 transition-all',
        isPrimary
          ? 'border-[var(--accent)] bg-[var(--accent-bg)] shadow-lg'
          : 'border-[var(--border)] bg-[var(--code-bg)]',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-lg">{rankEmoji[rank]}</span>
            <span className="text-xs font-mono text-[var(--text)] border border-[var(--border)] rounded px-1.5 py-0.5">
              {rankLabel[rank]}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-[var(--text-h)] leading-tight mt-1">
            {persona.title}
          </h2>
          <p className="text-xs text-[var(--text)] mt-0.5 italic">
            {persona.subtitle}
          </p>
        </div>
        <span className="font-mono text-[var(--accent)] text-sm shrink-0 pt-1">
          {persona.code}
        </span>
      </div>

      {isPrimary && (
        <p className="text-sm text-[var(--text)] leading-relaxed">
          {persona.description}
        </p>
      )}

      <div className="flex flex-wrap gap-1.5">
        {persona.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full border border-[var(--accent-border)] text-[var(--accent)] bg-[var(--accent-bg)]"
          >
            {tag}
          </span>
        ))}
      </div>

      {isPrimary && ranked.reasons.length > 0 && (
        <div className="border-t border-[var(--border)] pt-3 mt-1">
          <p className="text-xs font-medium text-[var(--text-h)] mb-1.5">
            为什么像你
          </p>
          <ul className="flex flex-col gap-1">
            {ranked.reasons.map((reason) => (
              <li key={reason} className="text-xs text-[var(--text)] flex gap-1.5">
                <span className="text-[var(--accent)] shrink-0">·</span>
                {reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      {isPrimary && (
        <p className="text-xs text-[var(--text)] italic border-t border-[var(--border)] pt-3 mt-1">
          💡 {persona.recommendation}
        </p>
      )}
    </div>
  )
}
