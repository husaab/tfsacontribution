/** Province/Territory codes */
export type Province =
  | "AB"
  | "BC"
  | "SK"
  | "MB"
  | "ON"
  | "QC"
  | "NB"
  | "NS"
  | "PE"
  | "NL"
  | "YT"
  | "NT"
  | "NU";

export const PROVINCES: { code: Province; name: string }[] = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "SK", name: "Saskatchewan" },
  { code: "MB", name: "Manitoba" },
  { code: "ON", name: "Ontario" },
  { code: "QC", name: "Quebec" },
  { code: "NB", name: "New Brunswick" },
  { code: "NS", name: "Nova Scotia" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "NL", name: "Newfoundland and Labrador" },
  { code: "YT", name: "Yukon" },
  { code: "NT", name: "Northwest Territories" },
  { code: "NU", name: "Nunavut" },
];

// ---------------------------------------------------------------------------
// Tax bracket types
// ---------------------------------------------------------------------------

/** Upper bound of bracket (Infinity for the top bracket) and the marginal rate */
interface TaxBracket {
  upTo: number;
  rate: number;
}

// ---------------------------------------------------------------------------
// Federal tax brackets
// ---------------------------------------------------------------------------

const FEDERAL_BRACKETS: Record<number, TaxBracket[]> = {
  2025: [
    { upTo: 57375, rate: 0.15 },
    { upTo: 114750, rate: 0.205 },
    { upTo: 177882, rate: 0.26 },
    { upTo: 253414, rate: 0.29 },
    { upTo: Infinity, rate: 0.33 },
  ],
  2026: [
    { upTo: 58523, rate: 0.14 },
    { upTo: 117045, rate: 0.205 },
    { upTo: 181440, rate: 0.26 },
    { upTo: 258482, rate: 0.29 },
    { upTo: Infinity, rate: 0.33 },
  ],
};

// ---------------------------------------------------------------------------
// Provincial tax brackets (2025)
// 2026 brackets are indexed ~2% – we approximate by applying 1.02 to
// thresholds (except Ontario $150k/$220k which are not indexed).
// ---------------------------------------------------------------------------

const PROVINCIAL_BRACKETS_2025: Record<Province, TaxBracket[]> = {
  AB: [
    { upTo: 151234, rate: 0.1 },
    { upTo: 181481, rate: 0.12 },
    { upTo: 241974, rate: 0.13 },
    { upTo: 362961, rate: 0.14 },
    { upTo: Infinity, rate: 0.15 },
  ],
  BC: [
    { upTo: 49279, rate: 0.0506 },
    { upTo: 98560, rate: 0.077 },
    { upTo: 113158, rate: 0.105 },
    { upTo: 137407, rate: 0.1229 },
    { upTo: 186306, rate: 0.147 },
    { upTo: 259829, rate: 0.168 },
    { upTo: Infinity, rate: 0.205 },
  ],
  SK: [
    { upTo: 53463, rate: 0.105 },
    { upTo: 152750, rate: 0.125 },
    { upTo: Infinity, rate: 0.145 },
  ],
  MB: [
    { upTo: 47564, rate: 0.108 },
    { upTo: 101200, rate: 0.1275 },
    { upTo: Infinity, rate: 0.174 },
  ],
  ON: [
    { upTo: 52886, rate: 0.0505 },
    { upTo: 105775, rate: 0.0915 },
    { upTo: 150000, rate: 0.1116 },
    { upTo: 220000, rate: 0.1216 },
    { upTo: Infinity, rate: 0.1316 },
  ],
  QC: [
    { upTo: 53255, rate: 0.14 },
    { upTo: 106495, rate: 0.19 },
    { upTo: 129590, rate: 0.24 },
    { upTo: Infinity, rate: 0.2575 },
  ],
  NB: [
    { upTo: 51306, rate: 0.094 },
    { upTo: 102614, rate: 0.14 },
    { upTo: 190060, rate: 0.16 },
    { upTo: Infinity, rate: 0.195 },
  ],
  NS: [
    { upTo: 30507, rate: 0.0879 },
    { upTo: 61015, rate: 0.1495 },
    { upTo: 95883, rate: 0.1667 },
    { upTo: 154650, rate: 0.175 },
    { upTo: Infinity, rate: 0.21 },
  ],
  PE: [
    { upTo: 33328, rate: 0.095 },
    { upTo: 64656, rate: 0.1347 },
    { upTo: 105000, rate: 0.166 },
    { upTo: 140000, rate: 0.1762 },
    { upTo: Infinity, rate: 0.19 },
  ],
  NL: [
    { upTo: 44192, rate: 0.087 },
    { upTo: 88382, rate: 0.145 },
    { upTo: 157792, rate: 0.158 },
    { upTo: 220910, rate: 0.178 },
    { upTo: 282214, rate: 0.198 },
    { upTo: 564429, rate: 0.208 },
    { upTo: 1128858, rate: 0.213 },
    { upTo: Infinity, rate: 0.218 },
  ],
  YT: [
    { upTo: 57375, rate: 0.064 },
    { upTo: 114750, rate: 0.09 },
    { upTo: 177882, rate: 0.109 },
    { upTo: 500000, rate: 0.128 },
    { upTo: Infinity, rate: 0.15 },
  ],
  NT: [
    { upTo: 51964, rate: 0.059 },
    { upTo: 103930, rate: 0.086 },
    { upTo: 168967, rate: 0.122 },
    { upTo: Infinity, rate: 0.1405 },
  ],
  NU: [
    { upTo: 54707, rate: 0.04 },
    { upTo: 109413, rate: 0.07 },
    { upTo: 177881, rate: 0.09 },
    { upTo: Infinity, rate: 0.115 },
  ],
};

/** Index 2025 brackets by ~2% for 2026 (standard CRA indexation factor). */
function indexBrackets(brackets: TaxBracket[], factor: number): TaxBracket[] {
  return brackets.map((b) => ({
    upTo: b.upTo === Infinity ? Infinity : Math.round(b.upTo * factor),
    rate: b.rate,
  }));
}

// Ontario special case: $150k and $220k thresholds are NOT indexed
function indexOntarioBrackets(brackets: TaxBracket[], factor: number): TaxBracket[] {
  return brackets.map((b) => {
    if (b.upTo === 150000 || b.upTo === 220000 || b.upTo === Infinity) {
      return b; // not indexed
    }
    return { upTo: Math.round(b.upTo * factor), rate: b.rate };
  });
}

const INDEXATION_2026 = 1.02;

const PROVINCIAL_BRACKETS_2026: Record<Province, TaxBracket[]> = Object.fromEntries(
  (Object.entries(PROVINCIAL_BRACKETS_2025) as [Province, TaxBracket[]][]).map(
    ([prov, brackets]) => [
      prov,
      prov === "ON"
        ? indexOntarioBrackets(brackets, INDEXATION_2026)
        : indexBrackets(brackets, INDEXATION_2026),
    ]
  )
) as Record<Province, TaxBracket[]>;

const PROVINCIAL_BRACKETS: Record<number, Record<Province, TaxBracket[]>> = {
  2025: PROVINCIAL_BRACKETS_2025,
  2026: PROVINCIAL_BRACKETS_2026,
};

// ---------------------------------------------------------------------------
// Canada Child Benefit (CCB) parameters
// ---------------------------------------------------------------------------

// July 2025 – June 2026 payment year (based on 2024 base year)
const CCB_2025 = {
  maxUnder6: 7997,
  max6to17: 6748,
  threshold1: 37487,
  threshold2: 81222,
  // Reduction rates between threshold1 and threshold2 (by number of children)
  reduction1: [0, 0.07, 0.135, 0.19, 0.23] as readonly number[], // index = # children (0 unused)
  // Fixed reduction at threshold2 + additional rate above threshold2
  reduction2Fixed: [0, 3061, 5904, 8310, 10059] as readonly number[],
  reduction2Rate: [0, 0.032, 0.057, 0.08, 0.095] as readonly number[],
};

// July 2026 – June 2027 (indexed ~2%)
const CCB_2026 = {
  maxUnder6: 8157,
  max6to17: 6883,
  threshold1: 38237,
  threshold2: 82847,
  reduction1: [0, 0.07, 0.135, 0.19, 0.23] as readonly number[],
  reduction2Fixed: [0, 3122, 6022, 8476, 10260] as readonly number[],
  reduction2Rate: [0, 0.032, 0.057, 0.08, 0.095] as readonly number[],
};

const CCB_PARAMS: Record<number, typeof CCB_2025> = {
  2025: CCB_2025,
  2026: CCB_2026,
};

// ---------------------------------------------------------------------------
// GST/HST Credit parameters
// ---------------------------------------------------------------------------

// July 2025 – June 2026
const GST_2025 = {
  adultAmount: 349,
  spouseAmount: 349,
  childAmount: 184,
  singleSupplementMax: 184,
  singleSupplementIncomeThreshold: 11337,
  singleSupplementRate: 0.02,
  clawbackThreshold: 45521,
  clawbackRate: 0.05,
};

// July 2026 – June 2027 (indexed ~2%)
const GST_2026 = {
  adultAmount: 356,
  spouseAmount: 356,
  childAmount: 188,
  singleSupplementMax: 188,
  singleSupplementIncomeThreshold: 11564,
  singleSupplementRate: 0.02,
  clawbackThreshold: 46432,
  clawbackRate: 0.05,
};

const GST_PARAMS: Record<number, typeof GST_2025> = {
  2025: GST_2025,
  2026: GST_2026,
};

// ---------------------------------------------------------------------------
// RRSP annual limit
// ---------------------------------------------------------------------------

export const RRSP_ANNUAL_LIMIT: Record<number, number> = {
  2025: 32490,
  2026: 33810,
};

// ---------------------------------------------------------------------------
// Input / output types
// ---------------------------------------------------------------------------

export interface RRSPInputs {
  taxYear: number;
  province: Province;
  income: number;
  rrspRoom: number;
  kidsUnder6: number;
  kids6to17: number;
  hasSpouse: boolean;
  spouseIncome: number;
}

export interface METRBreakdown {
  contribution: number;
  effectiveIncome: number;
  federalRate: number;
  provincialRate: number;
  ccbClawbackRate: number;
  gstClawbackRate: number;
  totalMETR: number;
  taxSavings: number;
  benefitIncrease: number;
  netBenefit: number;
}

export interface RRSPResult {
  metrAtZero: METRBreakdown;
  metrAtMax: METRBreakdown;
  maxContribution: number;
  totalTaxSavings: number;
  totalBenefitIncrease: number;
  totalNetBenefit: number;
  metrBreakdowns: METRBreakdown[];
}

// ---------------------------------------------------------------------------
// Calculation helpers
// ---------------------------------------------------------------------------

/** Get the marginal tax rate for a given income using a bracket table. */
function getMarginalRate(income: number, brackets: TaxBracket[]): number {
  for (const bracket of brackets) {
    if (income <= bracket.upTo) {
      return bracket.rate;
    }
  }
  return brackets[brackets.length - 1].rate;
}

/** Calculate total tax payable for a given income using brackets. */
function calculateTax(income: number, brackets: TaxBracket[]): number {
  let tax = 0;
  let prev = 0;
  for (const bracket of brackets) {
    if (income <= prev) break;
    const taxableInBracket = Math.min(income, bracket.upTo) - prev;
    tax += taxableInBracket * bracket.rate;
    prev = bracket.upTo;
  }
  return tax;
}

/** Calculate CCB annual benefit for a given family net income. */
function calculateCCB(
  familyIncome: number,
  kidsUnder6: number,
  kids6to17: number,
  year: number
): number {
  const totalKids = kidsUnder6 + kids6to17;
  if (totalKids === 0) return 0;

  const params = CCB_PARAMS[year] ?? CCB_2025;
  const maxBenefit =
    kidsUnder6 * params.maxUnder6 + kids6to17 * params.max6to17;

  if (familyIncome <= params.threshold1) return maxBenefit;

  // Cap the index to 4 (the tables only go up to 4+)
  const kidIndex = Math.min(totalKids, 4);

  // First reduction: between threshold1 and threshold2
  const incomeOverT1 = familyIncome - params.threshold1;
  let reduction: number;

  if (familyIncome <= params.threshold2) {
    reduction = incomeOverT1 * params.reduction1[kidIndex];
  } else {
    // Full first reduction + second reduction above threshold2
    const incomeOverT2 = familyIncome - params.threshold2;
    reduction =
      params.reduction2Fixed[kidIndex] +
      incomeOverT2 * params.reduction2Rate[kidIndex];
  }

  return Math.max(0, maxBenefit - reduction);
}

/** Calculate GST/HST credit annual amount for a given family net income. */
function calculateGSTCredit(
  familyIncome: number,
  hasSpouse: boolean,
  totalKids: number,
  year: number
): number {
  const params = GST_PARAMS[year] ?? GST_2025;

  let credit = params.adultAmount;

  if (hasSpouse) {
    credit += params.spouseAmount;
  }

  // Single parent: first child gets spouse amount, rest get child amount
  if (!hasSpouse && totalKids > 0) {
    credit += params.spouseAmount; // first child counts as "spouse equivalent"
    credit += Math.max(0, totalKids - 1) * params.childAmount;
  } else {
    credit += totalKids * params.childAmount;
  }

  // Single supplement (for individuals without spouse)
  if (!hasSpouse) {
    const excessIncome = Math.max(0, familyIncome - params.singleSupplementIncomeThreshold);
    credit += Math.min(params.singleSupplementMax, excessIncome * params.singleSupplementRate);
  }

  // Clawback
  if (familyIncome > params.clawbackThreshold) {
    const clawback = (familyIncome - params.clawbackThreshold) * params.clawbackRate;
    credit = Math.max(0, credit - clawback);
  }

  return credit;
}

// ---------------------------------------------------------------------------
// METR calculation
// ---------------------------------------------------------------------------

/**
 * Calculate the METR breakdown for a specific contribution amount.
 *
 * The METR is determined by comparing the taxes paid and benefits received
 * at the current income vs. at the reduced income (income - contribution).
 */
function calculateMETRAtContribution(
  inputs: RRSPInputs,
  contribution: number
): METRBreakdown {
  const { taxYear, province, income, kidsUnder6, kids6to17, hasSpouse, spouseIncome } = inputs;

  const effectiveIncome = income - contribution;
  const totalKids = kidsUnder6 + kids6to17;

  // Family income for benefit calculations (both CCB and GST use family net income)
  const familyIncomeBefore = income + (hasSpouse ? spouseIncome : 0);
  const familyIncomeAfter = effectiveIncome + (hasSpouse ? spouseIncome : 0);

  // Federal brackets
  const fedBrackets = FEDERAL_BRACKETS[taxYear] ?? FEDERAL_BRACKETS[2025];
  const provBrackets =
    (PROVINCIAL_BRACKETS[taxYear] ?? PROVINCIAL_BRACKETS[2025])[province];

  // Marginal rates at the current effective income (for display)
  const federalRate = getMarginalRate(effectiveIncome, fedBrackets);
  const provincialRate = getMarginalRate(effectiveIncome, provBrackets);

  // Actual tax savings (difference in tax with and without contribution)
  const fedTaxBefore = calculateTax(income, fedBrackets);
  const fedTaxAfter = calculateTax(effectiveIncome, fedBrackets);
  const provTaxBefore = calculateTax(income, provBrackets);
  const provTaxAfter = calculateTax(effectiveIncome, provBrackets);
  const taxSavings = (fedTaxBefore - fedTaxAfter) + (provTaxBefore - provTaxAfter);

  // Benefit increase from lowered family income
  const ccbBefore = calculateCCB(familyIncomeBefore, kidsUnder6, kids6to17, taxYear);
  const ccbAfter = calculateCCB(familyIncomeAfter, kidsUnder6, kids6to17, taxYear);
  const ccbIncrease = ccbAfter - ccbBefore;

  const gstBefore = calculateGSTCredit(familyIncomeBefore, hasSpouse, totalKids, taxYear);
  const gstAfter = calculateGSTCredit(familyIncomeAfter, hasSpouse, totalKids, taxYear);
  const gstIncrease = gstAfter - gstBefore;

  const benefitIncrease = ccbIncrease + gstIncrease;
  const netBenefit = taxSavings + benefitIncrease;

  // Effective METR: what percentage of the contribution comes back as benefit
  const totalMETR = contribution > 0 ? netBenefit / contribution : 0;

  // Approximate component rates for the breakdown display
  const ccbClawbackRate = contribution > 0 ? ccbIncrease / contribution : 0;
  const gstClawbackRate = contribution > 0 ? gstIncrease / contribution : 0;

  return {
    contribution,
    effectiveIncome,
    federalRate,
    provincialRate,
    ccbClawbackRate,
    gstClawbackRate,
    totalMETR,
    taxSavings,
    benefitIncrease,
    netBenefit,
  };
}

// ---------------------------------------------------------------------------
// Main calculation
// ---------------------------------------------------------------------------

export function calculateRRSP(inputs: RRSPInputs): RRSPResult {
  const maxContribution = Math.min(
    inputs.rrspRoom,
    Math.max(0, inputs.income) // can't deduct more than income
  );

  if (maxContribution <= 0) {
    const zero = calculateMETRAtContribution(inputs, 0);
    return {
      metrAtZero: zero,
      metrAtMax: zero,
      maxContribution: 0,
      totalTaxSavings: 0,
      totalBenefitIncrease: 0,
      totalNetBenefit: 0,
      metrBreakdowns: [zero],
    };
  }

  // Generate METR breakdowns at $500 intervals
  const step = 500;
  const breakdowns: METRBreakdown[] = [];

  for (let c = 0; c <= maxContribution; c += step) {
    breakdowns.push(calculateMETRAtContribution(inputs, c));
  }

  // Ensure we include the max contribution point
  if (breakdowns[breakdowns.length - 1].contribution !== maxContribution) {
    breakdowns.push(calculateMETRAtContribution(inputs, maxContribution));
  }

  const metrAtZero = breakdowns[0];
  const metrAtMax = breakdowns[breakdowns.length - 1];

  return {
    metrAtZero,
    metrAtMax,
    maxContribution,
    totalTaxSavings: metrAtMax.taxSavings,
    totalBenefitIncrease: metrAtMax.benefitIncrease,
    totalNetBenefit: metrAtMax.netBenefit,
    metrBreakdowns: breakdowns,
  };
}
