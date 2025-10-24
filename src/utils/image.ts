export function getPokemonImageFromSprites(raw?: string): string | undefined {
  if (!raw) return undefined
  try {
    const sprites = JSON.parse(raw)
    // Prefer official artwork
    const official = sprites?.other?.['official-artwork']?.front_default
    if (official) return official as string
    const dream = sprites?.other?.dream_world?.front_default
    if (dream) return dream as string
    const home = sprites?.other?.home?.front_default
    if (home) return home as string
    return sprites?.front_default as string | undefined
  } catch {
    return undefined
  }
}

export function getPokemonImage(id: number, spritesRaw?: string): string | undefined {
  const fromSprites = getPokemonImageFromSprites(spritesRaw)
  if (fromSprites) return fromSprites
  // Fallback a official-artwork por id (garantiza imagen)
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}
