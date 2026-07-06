import galleriesData from '../data/galleries.json';

export type Story = {
  id: string;
  title: string;
  cover: string;
  images: string[];
};

type GalleryManifest = Record<string, string[]> & {
  __stories?: Story[];
};

const manifest = galleriesData as unknown as GalleryManifest;

/** Slugify — remove acentos e espaços (ex: "As camadas da alma" -> "as-camadas-da-alma"). */
export const slugify = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');

/** Codifica cada segmento de um caminho, preservando as barras. */
export const encodePath = (p: string): string =>
  p
    .split('/')
    .map((segment, i) => (i === 0 && segment === '' ? '' : encodeURIComponent(segment)))
    .join('/');

/** Pasta-mãe de uma secção (Galeria_Foto ou Galeria_Exibicoes). */
export const getGalleryFolder = (section: string): string => {
  if (['pessoas', 'estilo', 'historias', 'marcas'].includes(section)) return 'Galeria_Foto';
  if (['as-camadas-da-alma', 'os-mangais-de-angola'].includes(section)) return 'Galeria_Exibicoes';
  return 'galeria';
};

/** Lista de ficheiros (nomes) de uma secção a partir do manifesto. */
export const getSectionFiles = (section: string): string[] => {
  const key = `${getGalleryFolder(section)}/${section}`;
  return manifest[key] || [];
};

/** URLs completas e codificadas das fotos de uma secção. */
export const getSectionImages = (section: string): string[] => {
  const folder = getGalleryFolder(section);
  return getSectionFiles(section).map((file) => encodePath(`/${folder}/${section}/${file}`));
};

/** URL da foto n (0-indexed) de uma secção, com fallback para a primeira. */
export const getSectionImage = (section: string, index = 0): string => {
  const images = getSectionImages(section);
  if (images.length === 0) return '';
  return images[Math.min(index, images.length - 1)];
};

/** Fotos da galeria da página inicial (hero). */
export const heroImages: string[] = (manifest['galeria_pagina_inicial'] || []).map((file) =>
  encodePath(`/galeria_pagina_inicial/${file}`),
);

/** Histórias estruturadas (dinâmicas a partir das pastas). */
export const stories: Story[] = manifest.__stories || [];

export default manifest;
