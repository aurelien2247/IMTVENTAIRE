// Configuration de l'API
export const API_BASE_URL = 'https://10.144.193.151:3333'

// Configuration des headers par défaut
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

// Fonction utilitaire pour les appels API
export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...DEFAULT_HEADERS,
      ...options.headers,
    },
    credentials: 'include',
  })

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }

  return response.json();
} 