/**
 * VIGIL SCORING & XP PRIMITIVES
 * VERSION: 1.0.0
 */

export const SILO_DIFFICULTY: Record<number, number> = {
  1: 1.0, // Identity
  2: 1.2, // Intel
  3: 1.5, // Logic
  4: 2.0, // Execution
  5: 2.5, // Purity
  6: 3.0, // Evolution
  7: 3.5, // Log
  8: 5.0, // Audit
  9: 7.0, // Mesh
  10: 10.0 // Void
};

export interface ScoringResult {
  briDelta: number;
  xpGained: number;
}

/**
 * Calculates BRI and XP changes based on performance and silo level.
 * Success grants points * difficulty, Failure penalizes flat BRI.
 */
export function calculateScoring(isSuccess: boolean, level: number): ScoringResult {
  const multiplier = SILO_DIFFICULTY[level] || 1.0;
  
  if (isSuccess) {
    const basePoints = 10;
    return {
      briDelta: basePoints,
      xpGained: Math.round(basePoints * multiplier * 10)
    };
  } else {
    return {
      briDelta: -5,
      xpGained: 0
    };
  }
}
