import { generateStrikeDataset, type StrikeDataset } from "./strike-data";

/**
 * Data access boundary for STRIKE. Today it serves the deterministic synthetic
 * Permian dataset; swap the body of `loadStrikeDataset` for real Enverus API
 * calls (wells, permits, rigs, Landtrac leases) without touching the UI.
 */
let cached: StrikeDataset | null = null;

export function loadStrikeDataset(): StrikeDataset {
  if (!cached) cached = generateStrikeDataset();
  return cached;
}
