import fs from 'fs';
import path from 'path';

// Pastas de galeria que devem listar as fotos automaticamente,
// ordenadas pela data de criação do ficheiro (mais antiga primeiro).
// Basta colocar uma foto na pasta para que ela apareça na galeria.
export const GALLERY_FOLDERS = [
  'galeria_pagina_inicial',
  'Galeria_Foto/pessoas',
  'Galeria_Foto/estilo',
  'Galeria_Foto/marcas',
  'Galeria_Exibicoes/as-camadas-da-alma',
  'Galeria_Exibicoes/os-mangais-de-angola',
];

// Pasta-mãe das histórias. Cada subpasta é uma história, com uma pasta
// "Capa" (imagem de capa) e as restantes imagens da série.
const STORIES_ROOT = 'Galeria_Foto/historias';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const isImage = (name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase());

// Lista imagens de uma pasta, ordenadas por data de criação (mais antiga primeiro).
function listImages(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter(isImage)
    .map((name) => ({ name, birthtime: fs.statSync(path.join(dirPath, name)).birthtimeMs }))
    .sort((a, b) => a.birthtime - b.birthtime)
    .map(({ name }) => name);
}

// Escaneia as histórias (subpastas de Galeria_Foto/historias) e devolve
// um array de objetos { id, cover, images } — assim é possível acrescentar
// novas histórias apenas criando uma pasta, sem tocar no código.
function buildStories(publicDir) {
  const storiesDir = path.join(publicDir, STORIES_ROOT);
  if (!fs.existsSync(storiesDir)) return [];

  return fs
    .readdirSync(storiesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, 'pt', { numeric: true }))
    .map((storyName) => {
      const storyPath = path.join(storiesDir, storyName);
      const coverDir = path.join(storyPath, 'Capa');
      const coverFiles = listImages(coverDir);
      const images = listImages(storyPath);

      const encode = (folder, file) =>
        `/${STORIES_ROOT}/${storyName}/${folder ? folder + '/' : ''}${file}`
          .split('/')
          .map((segment, i) => (i === 0 ? segment : encodeURIComponent(segment)))
          .join('/');

      return {
        id: storyName,
        title: storyName,
        cover: coverFiles.length ? encode('Capa', coverFiles[0]) : (images[0] ? encode('', images[0]) : ''),
        images: images.map((file) => encode('', file)),
      };
    })
    .filter((story) => story.images.length > 0 || story.cover);
}

export function generateGalleries(rootDir) {
  const publicDir = path.join(rootDir, 'public');
  const galleries = {};

  for (const folder of GALLERY_FOLDERS) {
    galleries[folder] = listImages(path.join(publicDir, folder));
  }

  // Histórias estruturadas (dinâmicas a partir das pastas).
  const stories = buildStories(publicDir);
  const manifest = { ...galleries, __stories: stories };

  const outPath = path.join(rootDir, 'src/data/galleries.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + '\n');
  return manifest;
}
