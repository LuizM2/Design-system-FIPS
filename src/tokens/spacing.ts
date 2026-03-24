/** Escala de espaçamento sugerida (múltiplos de 4px) — documentada nas Foundations */
export const spacingScale = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] as const

export type SpacingStep = (typeof spacingScale)[number]
