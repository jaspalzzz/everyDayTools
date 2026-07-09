/**
 * Deterministic phrasing-variant picker for programmatic page templates.
 *
 * Problem this solves: when many records share the same categorical value
 * (e.g. ~20 US states all sitting at the federal $7.25/hr minimum wage
 * floor), a single answer template produces near-identical text across all
 * of them -- the exact "mad-libs" pattern that risks Google's Scaled
 * Content Abuse enforcement. Measured directly: two federal-minimum-wage
 * state pages came out as low as ~16% unique content against each other
 * before this fix.
 *
 * The fix isn't fabricating new facts per state -- it's varying *how* the
 * same true fact is phrased, selected deterministically per record (same
 * seed always picks the same variant, so builds are reproducible) rather
 * than randomly on every render.
 */
// FNV-1a: chosen over a plain multiplicative hash because short, similar
// seeds (e.g. "kansas-ptorule" vs "idaho-ptorule") produced clustered,
// low-avalanche indices with `hash*31+c`, causing unrelated states to
// collide on the same variant far more often than a uniform distribution
// would predict.
function fnv1a(seed: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export function pickVariant<T>(seed: string, variants: readonly [T, ...T[]]): T {
  const index = fnv1a(seed) % variants.length;
  return variants[index] as T;
}
