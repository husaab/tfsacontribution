/** TFSA annual dollar limits set by the CRA */
export const TFSA_ANNUAL_LIMITS: Record<number, number> = {
  2009: 5000,
  2010: 5000,
  2011: 5000,
  2012: 5000,
  2013: 5500,
  2014: 5500,
  2015: 10000,
  2016: 5500,
  2017: 5500,
  2018: 5500,
  2019: 6000,
  2020: 6000,
  2021: 6000,
  2022: 6000,
  2023: 6500,
  2024: 7000,
  2025: 7000,
  2026: 7000,
};

/** The first year TFSA existed */
export const TFSA_START_YEAR = 2009;

/** The current year for calculations */
export const CURRENT_YEAR = 2026;

/** Assumed limit for next year (not yet announced by CRA) */
export const ASSUMED_NEXT_YEAR_LIMIT = 7000;

export type TFSAMode = "birth" | "residency";

export interface TFSAInputs {
  mode: TFSAMode;
  yearValue: number; // birth year or year became resident
  totalContributions: number;
  withdrawalsBefore2026: number;
  withdrawalsIn2026: number;
}

export interface TFSAResult {
  isEligible: boolean;
  eligibilityYear: number;
  cumulativeLimit: number;
  room2026: number;
  room2027: number;
}

/**
 * Determines the first year the person started accumulating TFSA room.
 *
 * - Birth mode: max(2009, birthYear + 18)
 * - Residency mode: max(2009, yearBecameResident)
 */
export function getEligibilityYear(mode: TFSAMode, yearValue: number): number {
  if (mode === "birth") {
    return Math.max(TFSA_START_YEAR, yearValue + 18);
  }
  return Math.max(TFSA_START_YEAR, yearValue);
}

/**
 * Sums the TFSA annual limits from eligibilityYear through endYear (inclusive).
 * Returns 0 if eligibilityYear is after endYear.
 */
export function getCumulativeLimit(
  eligibilityYear: number,
  endYear: number = CURRENT_YEAR
): number {
  let total = 0;
  for (let year = eligibilityYear; year <= endYear; year++) {
    total += TFSA_ANNUAL_LIMITS[year] ?? 0;
  }
  return total;
}

/**
 * Calculates the full TFSA contribution room result from user inputs.
 */
export function calculateTFSA(inputs: TFSAInputs): TFSAResult {
  const eligibilityYear = getEligibilityYear(inputs.mode, inputs.yearValue);
  const isEligible = eligibilityYear <= CURRENT_YEAR;

  if (!isEligible) {
    return {
      isEligible: false,
      eligibilityYear,
      cumulativeLimit: 0,
      room2026: 0,
      room2027: 0,
    };
  }

  const cumulativeLimit = getCumulativeLimit(eligibilityYear);

  const room2026 =
    cumulativeLimit - inputs.totalContributions + inputs.withdrawalsBefore2026;

  const room2027 =
    room2026 + ASSUMED_NEXT_YEAR_LIMIT + inputs.withdrawalsIn2026;

  return {
    isEligible,
    eligibilityYear,
    cumulativeLimit,
    room2026,
    room2027,
  };
}
