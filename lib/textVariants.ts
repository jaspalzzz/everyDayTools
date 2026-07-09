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

/**
 * Position-based variant picker for a known shared-value cluster (e.g. the
 * ~20 states that all sit at the federal minimum wage, or the ~26 states
 * with no PTO payout requirement).
 *
 * Hash-based selection (pickVariant) can coincidentally assign two
 * unrelated records in the same cluster to the *same* variant on *every*
 * field at once -- purely by chance, since each field's hash is
 * independent. Measured directly: Mississippi and Kansas share the
 * federal-wage tier and collided on 4 of 5 answer fields, landing at
 * ~18-20% unique content (deep in HARD STOP territory) even after
 * expanding to 5-7 variants per field.
 *
 * This picker instead uses each record's rank within its cluster (e.g.
 * alphabetical position among same-tier states) mod the variant count.
 * Two distinct cluster members only collide on a field if their rank
 * *difference* happens to be a multiple of that field's variant count --
 * and because sibling fields intentionally use different variant counts,
 * no rank difference smaller than the cluster size can be a multiple of
 * all of them simultaneously (e.g. lcm(5,6,7) = 210, far larger than any
 * real cluster). So two cluster members can share at most a few answers,
 * never the whole page.
 */
export function pickVariantByPosition<T>(position: number, variants: readonly [T, ...T[]]): T {
  const index = ((position % variants.length) + variants.length) % variants.length;
  return variants[index] as T;
}

/** 0-indexed rank of `key` within `keys` sorted ascending; -1 if absent. */
export function clusterRank(keys: readonly string[], key: string): number {
  return [...keys].sort().indexOf(key);
}
