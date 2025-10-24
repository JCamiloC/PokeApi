import { useEffect } from 'react'
import './FilterModal.css'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store'
import { setOrderBy } from '../store/filtersSlice'

type Props = {
  open: boolean
  onClose: () => void
}

export default function FilterModal({ open, onClose }: Props) {
  const dispatch = useDispatch()
  const orderBy = useSelector((s: RootState) => s.filters.orderBy)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return
      // Bloquear cierre con Esc: no cerramos hasta elegir opción (según requerimiento)
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null

  const choose = (value: 'name' | 'number') => {
    dispatch(setOrderBy(value))
    onClose() // Cierra sólo al seleccionar opción
  }

  return (
    <div className="fmodal__backdrop">
      <div className="fmodal">
        <div className="fmodal__header">Filtrar por</div>
        <div className="fmodal__card">
          <label className="fmodal__option">
            <input
              type="radio"
              name="orderBy"
              checked={orderBy === 'name'}
              onChange={() => choose('name')}
            />
            <span>Nombre</span>
          </label>
          <label className="fmodal__option">
            <input
              type="radio"
              name="orderBy"
              checked={orderBy === 'number'}
              onChange={() => choose('number')}
            />
            <span>Número</span>
          </label>
        </div>
      </div>
    </div>
  )
}
