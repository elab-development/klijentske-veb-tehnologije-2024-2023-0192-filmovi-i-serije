import { useParams } from 'react-router-dom'

export function MovieDetails() {
  const { id } = useParams()
  return <h1>Movie Details placeholder – ID: {id}</h1>
}
