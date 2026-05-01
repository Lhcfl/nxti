import { personas } from '../data/personas'
import { questions } from '../data/questions'
import type { PersonaId, RankedPersona, Theme } from '../types'

const reasonLimit = 3

type Scoreboard = Record<PersonaId, number>

type ThemeBoard = Record<Theme, number>

function createScoreboard(): Scoreboard {
  return personas.reduce((acc, persona) => {
    acc[persona.id] = persona.baseScore ?? 0
    return acc
  }, {} as Scoreboard)
}

function createThemeBoard(): ThemeBoard {
  return {
    philosophy: 0,
    immutability: 0,
    packaging: 0,
    dx: 0,
    devops: 0,
    culture: 0,
    constraint: 0,
  }
}

function getTopThemes(themeBoard: ThemeBoard, count = 3): Theme[] {
  return (Object.entries(themeBoard) as [Theme, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([theme]) => theme)
}

function buildReasons(personaId: PersonaId, topThemes: Theme[]): string[] {
  const persona = personas.find((item) => item.id === personaId)
  if (!persona) {
    return []
  }

  const reasons = [...persona.anchors]
  const affinity = persona.themeAffinity ?? {}

  topThemes
    .filter((theme) => (affinity[theme] ?? 0) > 0)
    .forEach((theme) => {
      reasons.push(`你在 ${theme} 相关题目中表现出稳定偏好`)
    })

  return reasons.slice(0, reasonLimit)
}

export function rankPersonas(answers: Array<number | null>): {
  ranking: RankedPersona[]
  topThemes: Theme[]
} {
  const scoreboard = createScoreboard()
  const themeBoard = createThemeBoard()

  questions.forEach((question, index) => {
    const answerIndex = answers[index]
    if (answerIndex == null) {
      return
    }

    const option = question.options[answerIndex]
    if (!option) {
      return
    }

    if (question.theme) {
      themeBoard[question.theme] += 1
    }

    if (option.effect) {
      Object.entries(option.effect).forEach(([personaId, delta]) => {
        scoreboard[personaId as PersonaId] += delta ?? 0
      })
    }

    if (option.vibe) {
      Object.entries(option.vibe).forEach(([theme, score]) => {
        themeBoard[theme as Theme] += score ?? 0
      })
    }
  })

  personas.forEach((persona) => {
    const affinity = persona.themeAffinity ?? {}
    const bonus = (Object.entries(themeBoard) as [Theme, number][]).reduce(
      (sum, [theme, score]) => sum + score * (affinity[theme] ?? 0),
      0,
    )
    scoreboard[persona.id] += bonus * 0.28
  })

  const topThemes = getTopThemes(themeBoard)

  const ranking = personas
    .map((persona) => ({
      persona,
      score: Number(scoreboard[persona.id].toFixed(2)),
      reasons: buildReasons(persona.id, topThemes),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score
      }
      const aBase = a.persona.baseScore ?? 0
      const bBase = b.persona.baseScore ?? 0
      if (bBase !== aBase) {
        return bBase - aBase
      }
      return a.persona.code.localeCompare(b.persona.code)
    })

  return { ranking, topThemes }
}

export function getTopThree(answers: Array<number | null>): RankedPersona[] {
  const { ranking } = rankPersonas(answers)
  return ranking.slice(0, 3)
}

export function summarizeThemes(topThemes: Theme[]): string {
  const map: Record<Theme, string> = {
    philosophy: '配置哲学',
    immutability: '不可变性',
    packaging: '打包与缓存',
    dx: '开发体验',
    devops: '部署运维',
    culture: '社区文化',
    constraint: '组织约束',
  }

  return topThemes.map((theme) => map[theme]).join(' / ')
}
