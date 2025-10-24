import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCustomPokemon } from '../store/customPokemonsSlice'
import { useQuery } from '@apollo/client/react'
import { GET_TYPES } from '../graphql/queries'
import { validatePokemonForm, type PokemonForm } from '../utils/validation'

type TypesData = { pokemon_v2_type: { id: number; name: string }[] }

export default function CreatePage() {
  const { data } = useQuery<TypesData>(GET_TYPES)
  const dispatch = useDispatch()
  const [form, setForm] = useState<PokemonForm>({ name: '', type: '', generation: '', height: '', weight: '' })
  const [errors, setErrors] = useState<ReturnType<typeof validatePokemonForm>>({})

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validatePokemonForm(form)
    setErrors(errs)
    if (Object.keys(errs).length) return
    dispatch(addCustomPokemon({
      name: form.name.trim().toLowerCase(),
      image: undefined,
      types: [form.type],
      generation: Number(form.generation),
      height: Number(form.height),
      weight: Number(form.weight),
    }))
    setForm({ name: '', type: '', generation: '', height: '', weight: '' })
    alert('Pokémon creado localmente (mock).')
  }

  return (
    <section className="page">
      <div className="container">
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 480 }}>
          <h2 style={{ marginBottom: 8 }}>Crear Pokémon (local)</h2>
          <label style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontWeight: 600 }}>Nombre</span>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="pidgey"
            />
            {errors.name && <small style={{ color: 'crimson' }}>{errors.name}</small>}
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontWeight: 600 }}>Tipo</span>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="">Selecciona…</option>
              {data?.pokemon_v2_type?.map((t: { id: number; name: string }) => (
                <option key={t.id} value={t.name}>{t.name}</option>
              ))}
            </select>
            {errors.type && <small style={{ color: 'crimson' }}>{errors.type}</small>}
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <label style={{ display: 'grid', gap: 6 }}>
              <span style={{ fontWeight: 600 }}>Generación</span>
              <input
                type="number"
                value={form.generation}
                onChange={(e) => setForm({ ...form, generation: e.target.value === '' ? '' : Number(e.target.value) })}
                placeholder="1"
              />
              {errors.generation && <small style={{ color: 'crimson' }}>{errors.generation}</small>}
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              <span style={{ fontWeight: 600 }}>Altura</span>
              <input
                type="number"
                step="0.1"
                value={form.height}
                onChange={(e) => setForm({ ...form, height: e.target.value === '' ? '' : Number(e.target.value) })}
                placeholder="10"
              />
              {errors.height && <small style={{ color: 'crimson' }}>{errors.height}</small>}
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              <span style={{ fontWeight: 600 }}>Peso</span>
              <input
                type="number"
                step="0.1"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value === '' ? '' : Number(e.target.value) })}
                placeholder="100"
              />
              {errors.weight && <small style={{ color: 'crimson' }}>{errors.weight}</small>}
            </label>
          </div>
          <button type="submit">Crear</button>
          <p style={{ color: 'var(--muted)' }}>Nota: Esta creación es local (no hay mutación real en PokeAPI).</p>
        </form>
      </div>
    </section>
  )
}
