import { useQuiz } from './hooks/useQuiz'
import { ProgressBar } from './components/ProgressBar'
import { QuestionCard } from './components/QuestionCard'
import { PersonaCard } from './components/PersonaCard'
import { questions } from './data/questions'

export default function App() {
  const {
    state,
    currentQuestion,
    currentAnswer,
    answeredCount,
    allAnswered,
    progress,
    total,
    begin,
    resume,
    answer,
    prev,
    submit,
    restart,
  } = useQuiz()

  const { phase, currentIndex, top3, topThemesSummary } = state

  // ── Start page ──────────────────────────────────────────────────────────────
  if (phase === 'start') {
    return (
      <main className="quiz-shell">
        <div className="quiz-content flex flex-col gap-8 items-center text-center">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-mono text-[var(--accent)] tracking-widest uppercase">
              NXTI · Nix-TI
            </p>
            <h1 className="quiz-title">你是哪种<br />Nix 用户？</h1>
            <p className="text-[var(--text)] text-sm leading-relaxed max-w-sm mx-auto">
              {total} 道题，隐藏维度评分，输出你专属的搞怪人格。
              <br />一本正经地告诉你，你到底是什么类型的折腾选手。
            </p>
          </div>

          <button
            type="button"
            onClick={begin}
            className="quiz-btn-primary px-8 py-3 text-base"
          >
            开始测试 →
          </button>

          <p className="text-xs text-[var(--text)] opacity-60">
            约 5~10 分钟 · 结果仅保存在本地
          </p>
        </div>
      </main>
    )
  }

  // ── Resume prompt ────────────────────────────────────────────────────────────
  if (phase === 'resume') {
    return (
      <main className="quiz-shell">
        <div className="quiz-content flex flex-col gap-6 items-center text-center">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-[var(--text-h)]">
              发现上次的进度
            </h2>
            <p className="text-sm text-[var(--text)]">
              你已经答到第 {currentIndex + 1} 题，要继续还是重来？
            </p>
          </div>
          <ProgressBar current={answeredCount} total={total} percent={progress} />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={resume}
              className="quiz-btn-primary px-6 py-2.5 text-sm"
            >
              继续作答
            </button>
            <button
              type="button"
              onClick={restart}
              className="px-6 py-2.5 text-sm rounded-lg border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] transition-colors"
            >
              重新开始
            </button>
          </div>
        </div>
      </main>
    )
  }

  // ── Quiz ─────────────────────────────────────────────────────────────────────
  if (phase === 'quiz') {
    const isLast = currentIndex === total - 1
    return (
      <main className="quiz-shell">
        <div className="quiz-content flex flex-col gap-6">
          <ProgressBar current={answeredCount} total={total} percent={progress} />
          <QuestionCard
            question={currentQuestion}
            selectedIndex={currentAnswer ?? null}
            questionNumber={currentIndex + 1}
            total={total}
            onAnswer={answer}
            onPrev={prev}
            onSubmit={submit}
            canGoBack={currentIndex > 0}
            isLast={isLast}
            allAnswered={allAnswered}
          />
          {!allAnswered && isLast && (
            <p className="text-xs text-[var(--text)] text-center opacity-70">
              还有 {total - answeredCount} 题未作答，可以翻回去补上
            </p>
          )}
        </div>
      </main>
    )
  }

  // ── Result ───────────────────────────────────────────────────────────────────
  return (
    <main className="quiz-shell">
      <div className="quiz-content flex flex-col gap-6">
        <div className="text-center flex flex-col gap-1">
          <p className="text-xs font-mono text-[var(--accent)] tracking-widest uppercase">
            NXTI 测试结果
          </p>
          <h1 className="text-2xl font-semibold text-[var(--text-h)]">
            {top3[0]?.persona.title}
          </h1>
          <p className="text-sm text-[var(--text)]">
            主题倾向：{topThemesSummary}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {top3.map((ranked, index) => (
            <PersonaCard key={ranked.persona.id} ranked={ranked} rank={index} />
          ))}
        </div>

        <div className="border-t border-[var(--border)] pt-4 flex flex-col gap-3 items-center text-center">
          <p className="text-xs text-[var(--text)] opacity-70">
            结果基于 {questions.length} 题隐藏维度加权匹配，仅供娱乐 :3
          </p>
          <button
            type="button"
            onClick={restart}
            className="px-5 py-2 text-sm rounded-lg border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] transition-colors"
          >
            重新测试
          </button>
        </div>
      </div>
    </main>
  )
}
