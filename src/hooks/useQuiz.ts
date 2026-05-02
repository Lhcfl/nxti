import { useCallback, useEffect, useReducer } from 'react'
import { questions as questions_original } from '../data/questions'
import { rankPersonas } from '../lib/scoring'
import {
  clearState,
  loadState,
  saveState,
  type PersistedState,
} from '../lib/storage'
import type { AnswerMap, QuestionOptionId, RankedPersona } from '../types'

const [questions, initialIndex] = (() => {
  // 打乱题目顺序
  const shuffled = [...questions_original].sort(() => Math.random() - 0.5)

  if (shuffled[0].special === 'dont-first') {
    const it = shuffled[0];
    shuffled[0] = shuffled.at(-3)!;
    shuffled[shuffled.length - 3] = it;
  }

  // 打乱每个题目的选项
  for (const question of shuffled) {
    question.options.sort(() => Math.random() - 0.5)
  }

  // 加载已保存状态
  const state = loadState()

  if (state != null) {
    // 已答题放前面，未答题放后面
    const answered = shuffled.filter((q) => state.answers[q.id])
    const unanswered = shuffled.filter((q) => !state.answers[q.id])
    const resumeIndex = Math.min(answered.length, Math.max(shuffled.length - 1, 0))
    return [[...answered, ...unanswered], resumeIndex]
  }

  return [shuffled, 0]
})()

const TOTAL = questions.length
const TOP_RESULT_COUNT = 5

type Phase = 'start' | 'resume' | 'quiz' | 'result'

export type QuizState = {
  phase: Phase
  currentIndex: number
  maxReachedIndex: number
  answers: AnswerMap
  startedAt: string
  topResults: RankedPersona[]
}

type Action =
  | { type: 'BEGIN' }
  | { type: 'RESUME' }
  | { type: 'ANSWER'; optionId: QuestionOptionId }
  | { type: 'PREV' }
  | { type: 'SUBMIT' }
  | { type: 'RESTART' }
  | { type: 'LOAD'; persisted: PersistedState }

function makeInitialState(): QuizState {
  return {
    phase: 'start',
    currentIndex: 0,
    maxReachedIndex: 0,
    answers: {},
    startedAt: '',
    topResults: [],
  }
}

function reducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case 'LOAD': {
      const p = action.persisted
      if (p.finishedAt && p.topResultCodes?.length) {
        const { ranking } = rankPersonas(p.answers)
        return {
          phase: 'result',
          currentIndex: initialIndex,
          maxReachedIndex: initialIndex,
          answers: p.answers,
          startedAt: p.startedAt,
          topResults: ranking.slice(0, TOP_RESULT_COUNT),
        }
      }
      return {
        phase: 'resume',
        currentIndex: initialIndex,
        maxReachedIndex: initialIndex,
        answers: p.answers,
        startedAt: p.startedAt,
        topResults: [],
      }
    }
    case 'BEGIN':
      return {
        ...makeInitialState(),
        phase: 'quiz',
        currentIndex: 0,
        maxReachedIndex: 0,
        startedAt: new Date().toISOString(),
      }
    case 'RESUME':
      return { ...state, phase: 'quiz' }
    case 'ANSWER': {
      const currentQuestion = questions[state.currentIndex]
      const nextIndex = Math.min(state.currentIndex + 1, TOTAL - 1)
      return {
        ...state,
        answers: {
          ...state.answers,
          [currentQuestion.id]: action.optionId,
        },
        currentIndex: nextIndex,
        maxReachedIndex: Math.max(state.maxReachedIndex, nextIndex),
      }
    }
    case 'PREV':
      return {
        ...state,
        currentIndex: Math.max(0, state.currentIndex - 1),
      }
    case 'SUBMIT': {
      const { ranking } = rankPersonas(state.answers)
      return {
        ...state,
        phase: 'result',
        topResults: ranking.slice(0, TOP_RESULT_COUNT),
      }
    }
    case 'RESTART': {
      clearState()
      return {
        ...makeInitialState(),
        phase: 'quiz',
        currentIndex: 0,
        maxReachedIndex: 0,
        startedAt: new Date().toISOString(),
      }
    }
    default:
      return state
  }
}

export function useQuiz() {
  const [state, dispatch] = useReducer(reducer, undefined, makeInitialState)

  useEffect(() => {
    const persisted = loadState()
    if (persisted) {
      const hasAnswered = Object.keys(persisted.answers).length > 0
      if (!hasAnswered && !persisted.finishedAt) {
        clearState()
        return
      }
      dispatch({ type: 'LOAD', persisted })
    }
  }, [])

  useEffect(() => {
    if (state.phase === 'quiz' || state.phase === 'result') {
      saveState({
        schemaVersion: 2,
        startedAt: state.startedAt,
        updatedAt: new Date().toISOString(),
        answers: state.answers,
        ...(state.phase === 'result'
          ? {
              finishedAt: new Date().toISOString(),
              topResultCodes: state.topResults.map((r) => r.persona.code),
            }
          : {}),
      })
    }
  }, [state.phase, state.answers, state.startedAt, state.topResults])

  const begin = useCallback(() => dispatch({ type: 'BEGIN' }), [])
  const resume = useCallback(() => dispatch({ type: 'RESUME' }), [])
  const answer = useCallback(
    (optionId: QuestionOptionId) => dispatch({ type: 'ANSWER', optionId }),
    [],
  )
  const prev = useCallback(() => dispatch({ type: 'PREV' }), [])
  const submit = useCallback(() => dispatch({ type: 'SUBMIT' }), [])
  const restart = useCallback(() => dispatch({ type: 'RESTART' }), [])

  const currentQuestion = questions[state.currentIndex]
  const currentAnswer = currentQuestion ? state.answers[currentQuestion.id] ?? null : null
  const answeredCount = Object.keys(state.answers).length
  const allAnswered = answeredCount === TOTAL
  const progress = Math.round((answeredCount / TOTAL) * 100)
  const currentIndex = state.currentIndex
  const maxReachedIndex = state.maxReachedIndex

  return {
    state,
    currentQuestion,
    currentAnswer,
    answeredCount,
    allAnswered,
    currentIndex,
    maxReachedIndex,
    progress,
    total: TOTAL,
    begin,
    resume,
    answer,
    prev,
    submit,
    restart,
  }
}

