import { questions } from '../data/questions'
import type { AnswerMap } from '../types'

export const SCHEMA_VERSION = 2
const STORAGE_KEY = `nxti_state_v${SCHEMA_VERSION}`

export type PersistedState = {
  schemaVersion: number
  startedAt: string
  updatedAt: string
  answers: AnswerMap
  finishedAt?: string
  topResultCodes?: string[]
}

export function loadState(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return null
    }

    const parsed = JSON.parse(raw) as PersistedState
    if (parsed.schemaVersion !== SCHEMA_VERSION) {
      clearState()
      return null
    }

    if (!parsed.answers || typeof parsed.answers !== 'object' || Array.isArray(parsed.answers)) {
      clearState()
      return null
    }

    const validIds = new Set(questions.map((q) => q.id))
    const answerKeys = Object.keys(parsed.answers)
    if (answerKeys.some((key) => !validIds.has(key))) {
      clearState()
      return null
    }

    return parsed
  } catch {
    clearState()
    return null
  }
}

export function saveState(state: PersistedState): void {
  const payload: PersistedState = {
    ...state,
    schemaVersion: SCHEMA_VERSION,
    updatedAt: new Date().toISOString(),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

export function clearState(): void {
  localStorage.removeItem(STORAGE_KEY)
}
