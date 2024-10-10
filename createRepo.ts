import axios from 'axios';

require('dotenv').config();

const token = '';
console.log("TOOOKKKENNN", token)

interface RepoResponse {
  html_url: string;
}

export const createRepo = async (newRepoName: string): Promise<RepoResponse | void> => {
    console.log(">>>>>>>>>>", newRepoName)
  try {
    const response = await axios.post<RepoResponse>(
      'https://api.github.com/user/repos',
      {
        name: newRepoName,
        private: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Novo repositório criado:', response.data.html_url);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao criar repositório:', error.message);
  }
};
