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

export const getRepos = fetchRepositories;