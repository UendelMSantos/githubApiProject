import axios from 'axios';

const GITHUB_TOKEN = ''; 
const OWNER = 'UendelMSantos'; 
const REPO = 'ApiGov'; 
const BRANCH = 'main'; 

console.log("<<<<<TOKEN:>>>>>", GITHUB_TOKEN)

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
  },
});

interface File {
  path: string;
  type: string;
}

async function listRepositoryFiles(owner: string, repo: string, branch: string) {
  try {
    const response = await githubApi.get(`/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`);
    const files = response.data.tree.filter((file: File) => file.type === 'blob');
    return files.map((file: File) => file.path);
  } catch (error) {
    console.error('Erro ao listar os arquivos do repositório:', error);
    return [];
  }
}

async function readFileContent(owner: string, repo: string, filePath: string) {
  try {
    const response = await githubApi.get(`/repos/${owner}/${repo}/contents/${filePath}`);
    const content = Buffer.from(response.data.content, 'base64').toString('utf-8'); 
    return content;
  } catch (error) {
    console.error(`Erro ao ler o arquivo ${filePath}:`, error);
    return null;
  }
}

async function main() {
  const files = await listRepositoryFiles(OWNER, REPO, BRANCH);

    if(files.length > 0) {
        console.log('Arquivos encontrados no repositório:');
        console.log(files);

        for(const filePath of files){
            try{
                const fileContent = await readFileContent(OWNER, REPO, filePath);
            
                if(fileContent){
                    console.log(`Conteúdo do arquivo ${filePath}: `);
                    console.log(fileContent);
                }
            } catch (error) {
                console.error(`Erro ao ler o arquivo ${filePath}:`, error);
            }
        }
    } else {
        console.log('Nenhum arquivo encontrado no repositório.');
    }
}

main();

