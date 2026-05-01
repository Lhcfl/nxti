import { personas } from '../data/personas'
import { questions } from '../data/questions'
import type { AnswerMap, PersonaId, RankedPersona } from '../types'

const reasonLimit = 3

type Scoreboard = Record<PersonaId, number>

function createScoreboard(): Scoreboard {
  return personas.reduce((acc, persona) => {
    acc[persona.id] = 0
    return acc
  }, {} as Scoreboard)
}

function buildReasons(personaId: PersonaId): string[] {
  const persona = personas.find((item) => item.id === personaId)
  if (!persona) {
    return []
  }

  return persona.anchors.slice(0, reasonLimit)
}

export function rankPersonas(answers: AnswerMap): { ranking: RankedPersona[] } {
  const scoreboard = createScoreboard()

  questions.forEach((question) => {
    const answerId = answers[question.id]
    if (!answerId) {
      return
    }

    const option = question.options.find((item) => item.id === answerId)
    if (!option) {
      return
    }

    if (option.effect) {
      Object.entries(option.effect).forEach(([personaId, delta]) => {
        scoreboard[personaId as PersonaId] += delta ?? 0
      })
    }
  })

  const ranking = personas
    .map((persona) => ({
      persona,
      score: Number(scoreboard[persona.id].toFixed(2)),
      reasons: buildReasons(persona.id),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score
      }
      return a.persona.code.localeCompare(b.persona.code)
    })

  return { ranking }
}

export function getTopThree(answers: AnswerMap): RankedPersona[] {
  const { ranking } = rankPersonas(answers)
  return ranking.slice(0, 3)
}
