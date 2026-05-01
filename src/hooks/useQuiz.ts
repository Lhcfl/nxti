import { useCallback, useEffect, useReducer } from 'react'
import { questions } from '../data/questions'
import { getTopThree, rankPersonas, summarizeThemes } from '../lib/scoring'
import {
  clearState,
  loadState,
  saveState,
  type PersistedState,
} from '../lib/storage'
import type { RankedPersona } from '../types'

const TOTAL = questions.length

type Phase = 'start' | 'resume' | 'quiz' | 'result'

export type QuizState = {
  phase: Phase
  currentIndex: number
  answers: Array<number | null>
  startedAt: string
  top3: RankedPersona[]
  topThemesSummary: string
}

type Action =
  | { type: 'BEGIN' }
  | { type: 'RESUME' }
  | { type: 'ANSWER'; optionIndex: number }
  | { type: 'PREV' }
  | { type: 'SUBMIT' }
  | { type: 'RESTART' }
  | { type: 'LOAD'; persisted: PersistedState }

function makeInitialState(): QuizState {
  return {
    phase: 'start',
    currentIndex: 0,
    answers: Array(TOTAL).fill(null),
    startedAt: '',
    top3: [],
    topThemesSummary: '',
  }
}

function reducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case 'LOAD': {
      const p = action.persisted
      if (p.finishedAt && p.topResultCodes?.length) {
        const { ranking, topThemes } = rankPersonas(p.answers)
        return {
          phase: 'result',
          currentIndex: TOTAL - 1,
          answers: p.answers,
          startedAt: p.startedAt,
          top3: ranking.slice(0, 3),
          topThemesSummary: summarizeThemes(topThemes),
        }
      }
      return {
        phase: 'resume',
        currentIndex: p.currentIndex,
        answers: p.answers,
        startedAt: p.startedAt,
        top3: [],
        topThemesSummary: '',
      }
    }
    case 'BEGIN':
      return {
        ...makeInitialState(),
        phase: 'quiz',
        startedAt: new Date().toISOString(),
      }
    case 'RESUME':
      return { ...state, phase: 'quiz' }
    case 'ANSWER': {
      const answers = [...state.answers]
      answers[state.currentIndex] = action.optionIndex
      const next = state.currentIndex + 1
      if (next >= TOTAL) {
        return { ...state, answers, phase: 'quiz' }
      }
      return { ...state, answers, currentIndex: next }
    }
    case 'PREV':
      return {
        ...state,
        currentIndex: Math.max(0, state.currentIndex - 1),
      }
    case 'SUBMIT': {
      const { ranking, topThemes } = rankPersonas(state.answers)
      return {
        ...state,
        phase: 'result',
        top3: ranking.slice(0, 3),
        topThemesSummary: summarizeThemes(topThemes),
      }
    }
    case 'RESTART': {
      clearState()
      return makeInitialState()
    }
    default:
      return state
  }
}

export function useQuiz() {
  const [state, dispatch] = useReducer(reducer, undefined, makeInitialState)

  useEffect(() => {
    const persisted = loadState(TOTAL)
    if (persisted) {
      dispatch({ type: 'LOAD', persisted })
    }
  }, [])

  useEffect(() => {
    if (state.phase === 'quiz' || state.phase === 'result') {
      saveState({
        schemaVersion: 1,
        startedAt: state.startedAt,
        updatedAt: new Date().toISOString(),
        currentIndex: state.currentIndex,
        answers: state.answers,
        ...(state.phase === 'result'
          ? {
              finishedAt: new Date().toISOString(),
              topResultCodes: state.top3.map((r) => r.persona.code),
            }
          : {}),
      })
    }
  }, [state.phase, state.currentIndex, state.answers, state.startedAt, state.top3])

  const begin = useCallback(() => dispatch({ type: 'BEGIN' }), [])
  const resume = useCallback(() => dispatch({ type: 'RESUME' }), [])
  const answer = useCallback(
    (optionIndex: number) => dispatch({ type: 'ANSWER', optionIndex }),
    [],
  )
  const prev = useCallback(() => dispatch({ type: 'PREV' }), [])
  const submit = useCallback(() => dispatch({ type: 'SUBMIT' }), [])
  const restart = useCallback(() => dispatch({ type: 'RESTART' }), [])

  const currentQuestion = questions[state.currentIndex]
  const currentAnswer = state.answers[state.currentIndex]
  const answeredCount = state.answers.filter((a) => a !== null).length
  const allAnswered = answeredCount === TOTAL
  const progress = Math.round((answeredCount / TOTAL) * 100)

  return {
    state,
    currentQuestion,
    currentAnswer,
    answeredCount,
    allAnswered,
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

export { getTopThree }
