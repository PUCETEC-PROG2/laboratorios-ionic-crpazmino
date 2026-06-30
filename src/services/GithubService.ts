import axios from 'axios';
import type { Repository } from '../interfaces/Repository';

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL || 'https://api.github.com';
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'PUCETEC-PROG2';
const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || import.meta.env.VITE_GITHUB_API_TOKEN;

export const fetchRepositories = async (): Promise<Repository[]> => {
  try {
    const isAuthenticatedRequest = Boolean(GITHUB_API_TOKEN);
    const endpoint = isAuthenticatedRequest
      ? `${GITHUB_API_URL}/user/repos`
      : `${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos`;

    const response = await axios.get(endpoint, {
      headers: isAuthenticatedRequest
        ? {
            Authorization: `Bearer ${GITHUB_API_TOKEN}`,
          }
        : undefined,
      params: {
        per_page: 100,
        sort: 'created',
        direction: 'desc',
        ...(isAuthenticatedRequest ? { affiliation: 'owner' } : {}),
        t: Date.now(),
      },
    });

    if (response.status !== 200) {
      throw new Error(`Error obteniendo repositorios: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error obteniendo repositorios:', error);
    return [];
  }
};

export const createRepository = async (
  data: Pick<Repository, 'name' | 'description'>,
): Promise<Repository> => {
  if (!GITHUB_API_TOKEN) {
    throw new Error('Token de autenticación no configurado. No se puede crear el repositorio.');
  }

  try {
    const response = await axios.post(`${GITHUB_API_URL}/user/repos`, data, {
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    });

    if (response.status !== 201) {
      throw new Error(`Error creando repositorio: ${response.statusText}`);
    }

    return response.data;
  } catch (error: unknown) {
    console.error('Error creando repositorio:', error);
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.statusText ||
        error.message;
      throw new Error(`Error creando repositorio: ${message}`);
    }
    throw new Error('Error creando repositorio.');
  }
};

export const updateRepository = async (
  owner: string,
  repo: string,
  data: Partial<Pick<Repository, 'name' | 'description'>>,
): Promise<Repository> => {
  if (!GITHUB_API_TOKEN) {
    throw new Error('Token de autenticación no configurado. No se puede actualizar el repositorio.');
  }

  try {
    const response = await axios.patch(`${GITHUB_API_URL}/repos/${owner}/${repo}`, data, {
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    });

    if (response.status !== 200) {
      throw new Error(`Error actualizando repositorio: ${response.statusText}`);
    }

    return response.data;
  } catch (error: unknown) {
    console.error('Error actualizando repositorio:', error);
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.statusText ||
        error.message;
      throw new Error(`Error actualizando repositorio: ${message}`);
    }
    throw new Error('Error actualizando repositorio.');
  }
};

export const deleteRepository = async (owner: string, repo: string): Promise<void> => {
  if (!GITHUB_API_TOKEN) {
    throw new Error('Token de autenticación no configurado. No se puede eliminar el repositorio.');
  }

  try {
    const response = await axios.delete(`${GITHUB_API_URL}/repos/${owner}/${repo}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    });

    if (response.status !== 204) {
      throw new Error(`Error eliminando repositorio: ${response.statusText}`);
    }
  } catch (error: unknown) {
    console.error('Error eliminando repositorio:', error);
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.statusText ||
        error.message;
      throw new Error(`Error eliminando repositorio: ${message}`);
    }
    throw new Error('Error eliminando repositorio.');
  }
};

export const getRepos = fetchRepositories;