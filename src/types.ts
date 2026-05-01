export const themes = [
  'philosophy',
  'immutability',
  'packaging',
  'dx',
  'devops',
  'culture',
  'constraint',
] as const

export type Theme = (typeof themes)[number]

export type PersonaId =
  | 'NERD'
  | 'PLM'
  | 'FPL'
  | 'ARCH'
  | 'XYN'
  | 'PERF'
  | 'IDK'
  | 'PRAG'
  | 'DOPS'
  | 'ENV'
  | 'LBRD'
  | 'RICE'
  | 'FLAKE'
  | 'CACHE'
  | 'PKGX'
  | 'REPRO'
  | 'FIXER'
  | 'DOCS'
  | 'HOME'
  | 'BOOT'

export type ScoreDelta = Partial<Record<PersonaId, number>>
export type ThemeVector = Partial<Record<Theme, number>>

export type QuestionOption = {
  id: 'A' | 'B' | 'C' | 'D'
  text: string
  effect: ScoreDelta
  vibe?: ThemeVector
}

export type Question = {
  id: number
  prompt: string
  theme: Theme
  options: QuestionOption[]
}

export type Persona = {
  id: PersonaId
  code: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  recommendation: string
  anchors: string[]
  baseScore?: number
  themeAffinity?: ThemeVector
}

export type RankedPersona = {
  persona: Persona
  score: number
  reasons: string[]
}
