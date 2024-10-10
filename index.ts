import { createRepo } from './createRepo';
import { copyFilesToNewRepo } from './copyFiles';
import axios from 'axios';


require('dotenv').config();

const token = '';
const username = 'UendelMSantos';
const repoName = 'ApiGov';

interface File {
  path: string;
  download_url: string;
  type: string;
}

const listFilesInRepo = async (path: string = ''): Promise<File[]> => {
  try {
    const response = await axios.get<File[]>(
      `https://api.github.com/repos/${username}/${repoName}/contents/${path}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Erro ao listar arquivos:', error.message);
    return [];
  }
};

const main = async () => {
  await listFilesInRepo();

  const newRepoName = 'ApiGooVVV';
  await createRepo(newRepoName);

//   if (newRepo) {
//     await copyFilesToNewRepo(files, newRepoName);
//   }
};

main();
