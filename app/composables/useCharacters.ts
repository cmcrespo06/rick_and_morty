import type {
  Character,
  ApiResponse,
  CharacterFilters,
} from "~/types-and-utils/character";

const BASE_URL = "https://rickandmortyapi.com/api";

export const useCharacters = () => {
  const characters = ref<Character[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const totalCount = ref(0);
  const searchQuery = ref("");

  const hasNextPage = computed(() => currentPage.value < totalPages.value);
  const hasPrevPage = computed(() => currentPage.value > 1);
  const hasResults = computed(() => characters.value.length > 0);
  const isEmpty = computed(
    () => !isLoading.value && characters.value.length === 0,
  );

  // Fetch personajes con filtros y paginación
  const fetchCharacters = async (filters: CharacterFilters = {}) => {
    isLoading.value = true;
    error.value = null;

    try {
      // Construir URL con parámetros
      const params = new URLSearchParams();

      if (filters.page) params.append("page", filters.page.toString());
      if (filters.name) params.append("name", filters.name);
      if (filters.status) params.append("status", filters.status);

      const url = `${BASE_URL}/character?${params.toString()}`;

      const response = await fetch(url);

      // Error cuando no hay resultados
      if (response.status === 404) {
        characters.value = [];
        totalPages.value = 1;
        totalCount.value = 0;
        return;
      }

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();

      // Actualizar estado con los datos recibidos
      characters.value = data.results;
      totalPages.value = data.info.pages;
      totalCount.value = data.info.count;
      currentPage.value = filters.page ?? 1;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = "Error al obtener personajes";
      }
      characters.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  // Búsqueda con debounce
  let searchTimeout: ReturnType<typeof setTimeout> | null = null;

  const handleSearch = (query: string) => {
    searchQuery.value = query;

    // Limpiar timeout anterior
    if (searchTimeout) clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      fetchCharacters({
        name: query,
        page: 1,
      });
    }, 500);
  };

  // Paginación
  const goToNextPage = () => {
    if (hasNextPage.value) {
      fetchCharacters({
        name: searchQuery.value,
        page: currentPage.value + 1,
      });
    }
  };

  const goToPrevPage = () => {
    if (hasPrevPage.value) {
      fetchCharacters({
        name: searchQuery.value,
        page: currentPage.value - 1,
      });
    }
  };

  const goToPage = (page: number) => {
    fetchCharacters({
      name: searchQuery.value,
      page,
    });
  };

  // Obtener un personaje por ID
  const fetchCharacterById = async (id: number): Promise<Character | null> => {
    try {
      const response = await fetch(`${BASE_URL}/character/${id}`);

      if (!response.ok) throw new Error("Personaje no encontrado");

      return await response.json();
    } catch {
      return null;
    }
  };

  // Limpiar búsqueda
  const clearSearch = () => {
    searchQuery.value = "";
    fetchCharacters({ page: 1 });
  };

  // Limpiar errores
  const clearError = () => {
    error.value = null;
  };

  return {
    characters,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalCount,
    searchQuery,
    hasNextPage,
    hasPrevPage,
    hasResults,
    isEmpty,
    fetchCharacters,
    handleSearch,
    goToNextPage,
    goToPrevPage,
    goToPage,
    fetchCharacterById,
    clearSearch,
    clearError,
  };
};
