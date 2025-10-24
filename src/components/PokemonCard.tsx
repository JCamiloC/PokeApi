import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from '../store/favoritesSlice'
import type { RootState } from '../store'
import './PokemonCard.css'
import { asset } from '../utils/asset'

type Props = {
  id: number
  name: string
  image?: string
  types: string[]
}

export default function PokemonCard({ id, name, image, types }: Props) {
  const dispatch = useDispatch()
  const isFav = useSelector((s: RootState) => Boolean(s.favorites.items[id]))

  return (
    <div className="pk-card">
      <button
        aria-label={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        className={`pk-card__fav ${isFav ? 'is-active' : ''}`}
        onClick={(e) => {
          e.preventDefault(); e.stopPropagation();
          if (isFav) {
            dispatch(removeFavorite(id))
          } else {
            dispatch(addFavorite({ id, name, image: image || '', types }))
          }
        }}
      >
        <img src={isFav ? asset('heart-fill.svg') : asset('heart.svg')} alt={isFav ? 'Favorito' : 'No favorito'} className="heart-img" />
      </button>
      <div className="pk-card__num">#{String(id).padStart(3, '0')}</div>
      <Link to={`/pokemon/${name}`} className="pk-card__link">
        <div className="pk-card__media">
          {image ? (
            <img src={image} alt={name} />
          ) : (
            <div className="pk-card__placeholder" />
          )}
        </div>
        <h3 className="pk-card__title">{name}</h3>
        <div className="pk-card__types">
          {types.map((t) => (
            <span key={t} className={`type-badge type-${t}`}>{t}</span>
          ))}
        </div>
      </Link>
    </div>
  )
}
