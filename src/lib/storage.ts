export const SCHEMA_VERSION = 1
const STORAGE_KEY = `nxti_state_v${SCHEMA_VERSION}`

type PersistedState = {
  schemaVersion: number
  startedAt: string
  updatedAt: string
  currentIndex: number
  answers: Array<number | null>
  finishedAt?: string
  topResultCodes?: string[]
}

export function loadState(expectedQuestionCount: number): PersistedState | null {
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

    if (!Array.isArray(parsed.answers) || parsed.answers.length !== expectedQuestionCount) {
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

export type { PersistedState }
