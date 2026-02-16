/** FHSA constants per CRA rules */
export const FHSA_ANNUAL_LIMIT = 8_000;
export const FHSA_LIFETIME_LIMIT = 40_000;
export const FHSA_MAX_CARRYFORWARD = 8_000;
export const FHSA_START_YEAR = 2023;
export const FHSA_CURRENT_YEAR = 2026;
export const FHSA_ASSUMED_NEXT_YEAR_LIMIT = 8_000;

export interface FHSAYearDetail {
  year: number;
  carryforward: number;
  room: number;
  contributions: number;
}

export interface FHSAResult {
  years: FHSAYearDetail[];
  remainingRoom: number;
  projectedRoomNextYear: number;
  lifetimeContributions: number;
  lifetimeRemaining: number;
}

/**
 * Computes the FHSA participation room carryforward for the next year.
 *
 * Simplified formula (no excess contributions, no re-participation):
 *   cf_next = min($8,000, max(0, $8,000 + cf_current - contributions))
 */
function nextCarryforward(cf: number, contributions: number): number {
  return Math.min(
    FHSA_MAX_CARRYFORWARD,
    Math.max(0, FHSA_ANNUAL_LIMIT + cf - contributions)
  );
}

/**
 * Calculates the full FHSA result from user inputs.
 *
 * Walks the carryforward chain year-by-year from yearOpened through the
 * current year, clamping contributions to each year's participation room.
 */
export function calculateFHSA(
  yearOpened: number,
  contributions: Record<number, number>
): FHSAResult {
  const years: FHSAYearDetail[] = [];
  let cf = 0;
  let totalContributions = 0;

  for (let year = yearOpened; year <= FHSA_CURRENT_YEAR; year++) {
    const isFirst = year === yearOpened;
    const yearCf = isFirst ? 0 : cf;

    // Room = min(annual_limit + carryforward, lifetime_limit - prior_contributions)
    const room = Math.min(
      FHSA_ANNUAL_LIMIT + yearCf,
      FHSA_LIFETIME_LIMIT - totalContributions
    );

    const clamped = Math.min(Math.max(contributions[year] ?? 0, 0), room);

    years.push({ year, carryforward: yearCf, room, contributions: clamped });

    cf = nextCarryforward(yearCf, clamped);
    totalContributions += clamped;
  }

  const currentYearDetail = years.find((y) => y.year === FHSA_CURRENT_YEAR);
  const remainingRoom = currentYearDetail
    ? currentYearDetail.room - currentYearDetail.contributions
    : 0;

  const projectedRoomNextYear = Math.min(
    FHSA_ASSUMED_NEXT_YEAR_LIMIT + cf,
    FHSA_LIFETIME_LIMIT - totalContributions
  );

  return {
    years,
    remainingRoom,
    projectedRoomNextYear,
    lifetimeContributions: totalContributions,
    lifetimeRemaining: Math.max(0, FHSA_LIFETIME_LIMIT - totalContributions),
  };
}
