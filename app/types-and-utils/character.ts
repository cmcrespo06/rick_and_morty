export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'

// Personaje
export interface Character {
  id: number
  name: string
  status: CharacterStatus
  species: string
  image: string
  url: string
  created: string
}

// Información de paginación
export interface PaginationInfo {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

// Respuesta API
export interface ApiResponse {
  info: PaginationInfo
  results: Character[]
}

// Filtros de búsqueda
export interface CharacterFilters {
  name?: string
  status?: CharacterStatus | ''
  page?: number
}