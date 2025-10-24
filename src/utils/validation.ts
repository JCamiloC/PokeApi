export type PokemonForm = {
  name: string
  type: string
  generation: number | ''
  height: number | ''
  weight: number | ''
}


export const nameIsValid = (name: string): boolean => {
  if (name.trim().length < 3) return false
  // Sólo letras, números y guiones medios, sin caracteres especiales.
  return /^[A-Za-z0-9-]+$/.test(name.trim())
}

export const validatePokemonForm = (form: PokemonForm) => {
  const errors: Partial<Record<keyof PokemonForm, string>> = {}

  if (!nameIsValid(form.name)) {
    errors.name = 'El nombre debe tener al menos 3 caracteres y no usar caracteres especiales.'
  }
  if (!form.type) {
    errors.type = 'Selecciona un tipo.'
  }
  const toNumber = (v: number | '') => (v === '' ? NaN : Number(v))
  const gen = toNumber(form.generation)
  const h = toNumber(form.height)
  const w = toNumber(form.weight)
  if (!Number.isInteger(gen) || gen < 1 || gen > 9) {
    errors.generation = 'La generación debe ser un entero entre 1 y 9.'
  }
  if (!Number.isFinite(h) || h <= 0) {
    errors.height = 'La altura debe ser un número positivo.'
  }
  if (!Number.isFinite(w) || w <= 0) {
    errors.weight = 'El peso debe ser un número positivo.'
  }
  return errors
}
