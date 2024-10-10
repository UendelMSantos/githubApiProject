import axios from 'axios';

require('dotenv').config();

const token = ''; 
const username = 'UendelMSantos';

interface File {
  path: string;
  download_url: string;
  type: string;
}

export const createFileInRepo = async (repoName: string, path: string, content: string) => {
  try {
    await axios.put(
      `https://api.github.com/repos/${username}/${repoName}/contents/${path}`,
      {
        message: `Adicionando ${path} ao repositório`,
        content: Buffer.from(content).toString('base64'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(`Arquivo ${path} criado com sucesso no repositório ${repoName}`);
  } catch (error: any) {
    console.error(`Erro ao criar arquivo ${path}:`, error.message);
  }
};

export const copyFilesToNewRepo = async (files: File[], newRepoName: string) => {
  for (const file of files) {
    if (file.type === 'file') {
      const fileContentResponse = await axios.get(file.download_url);
      await createFileInRepo(newRepoName, file.path, fileContentResponse.data);
    }
  }
};
