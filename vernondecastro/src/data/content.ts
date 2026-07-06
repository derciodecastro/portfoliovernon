import { getSectionImage, getSectionImages, stories } from '../lib/galleries';

/** Identidade / contactos usados em vários sítios. */
export const site = {
  name: 'Vernon De Castro',
  email: 'info@vernondecastro.com',
  instagram: 'https://instagram.com/vernondecastro',
  instagramHandle: '@vernondecastro',
};

/** Texto da biografia (parágrafos). */
export const biography = {
  portrait: '/biografia/retrato.jpg',
  paragraphs: [
    'Vernon De Castro é um fotógrafo e diretor que sintetiza moda, documentário e retrato clássico para conectar tradição histórica e identidade moderna. A sua prática recontextualiza temas contemporâneos através de mitologias antigas e autorais, utilizando o enquadramento fotográfico como um espaço para "política filosófica" a fim de examinar como mitos coletivos moldam o poder e a vulnerabilidade individuais.',
    'Ao aplicar os princípios de iluminação e estrutura da retratística tradicional, Vernon eleva os seus retratados, ancorando a alta moda editorial e o documentário cru no peso da história da arte. O seu trabalho caracteriza-se por um compromisso em dar voz a perspetivas sub-representadas com sensibilidade e força, criando uma linguagem visual simultaneamente atemporal e urgente.',
  ],
};

export type ExhibitionCopy = {
  slug: string;
  title: string;
  paragraphs: string[];
};

/** Textos das exposições (secções de scroll horizontal). */
export const exhibitions: ExhibitionCopy[] = [
  {
    slug: 'as-camadas-da-alma',
    title: 'As camadas da alma',
    paragraphs: [
      'Há sucessos que não se fazem por estratégia, mas por instinto. Por mais que a razão dite o contrário, lá no fundo há sempre alguma coisa que aponta em direção ao caminho certo. Quando decidimos levar o MIA (Mês da Identidade Africana) para Luanda, há muito que sabíamos que era inevitável voltar à casa que nos viu nascer há dez anos.',
      'Cada retrato desta série é uma camada — memória, herança e presença — sobreposta sobre o rosto de quem posa. O que revela não é apenas quem somos, mas de onde viemos.',
    ],
  },
  {
    slug: 'os-mangais-de-angola',
    title: 'Os mangais de Angola',
    paragraphs: [
      'Uma travessia contemplativa pelos mangais angolanos, onde a terra e o mar se confundem. Vernon De Castro fotografa este ecossistema como quem escuta — atento ao silêncio, à luz e ao tempo lento das marés.',
      'A série revela a beleza frágil e a importância ecológica destes santuários naturais, um apelo silencioso à sua preservação para as gerações que hão de vir.',
    ],
  },
];

export const getExhibition = (slug: string): ExhibitionCopy | undefined =>
  exhibitions.find((e) => e.slug === slug);

export type Product = {
  id: string;
  name: string;
  price: string;
  images: string[];
  description: string;
};

/** Produtos do Quiosque — imagens resolvidas dinamicamente das pastas. */
const printDescription =
  'Impressão de arquivo em papel de algodão 310g. Edição limitada, numerada e assinada pelo artista.';
const selectedDescription =
  'Impressão fotográfica de alta qualidade. Disponível em vários formatos. Assinada pelo artista.';

export const products: Product[] = [
  { id: 'as-camadas-da-alma', name: 'As camadas da alma — Impressão', price: 'A partir de €120', description: printDescription },
  { id: 'os-mangais-de-angola', name: 'Os mangais de Angola — Impressão', price: 'A partir de €120', description: printDescription },
  { id: 'pessoas', name: 'Pessoas — Impressão selecionada', price: 'A partir de €80', description: selectedDescription },
  { id: 'estilo', name: 'Estilo — Impressão selecionada', price: 'A partir de €80', description: selectedDescription },
  { id: 'marcas', name: 'Marcas — Impressão selecionada', price: 'A partir de €80', description: selectedDescription },
].map((p) => {
  const imgs = getSectionImages(p.id);
  return { ...p, images: imgs.length >= 2 ? imgs.slice(0, 2) : [imgs[0] || '', imgs[0] || ''] };
});

export type Service = {
  id: number;
  name: string;
  description: string;
  image: string;
  duration: string;
  photos: string;
  delivery: string;
  price: string;
};

/** Serviços de agendamento — imagens resolvidas dinamicamente. */
export const services: Service[] = [
  {
    id: 1,
    name: 'Fotojornalismo',
    description: 'Cobertura documental de histórias reais — do campo às ruas de Luanda.',
    image: stories[0]?.images[0] || getSectionImage('marcas', 0),
    duration: 'Meio dia',
    photos: 'Sob consulta',
    delivery: '48 horas',
    price: '170.000 KZ',
  },
  {
    id: 2,
    name: 'Sessão de retrato',
    description: 'Uma sessão fotográfica só para ti — sem ocasião especial, apenas o mood certo.',
    image: getSectionImage('pessoas', 0),
    duration: '1h30',
    photos: '15–20 fotos',
    delivery: '14 dias',
    price: '95.000 KZ',
  },
  {
    id: 3,
    name: 'Estilo & Moda',
    description: 'Fotografia de moda e estilo para marca pessoal, editorial ou campanha.',
    image: getSectionImage('estilo', 0),
    duration: '3 horas',
    photos: '25–35 fotos',
    delivery: '21 dias',
    price: '200.000 KZ',
  },
  {
    id: 4,
    name: 'Eventos',
    description: 'Cobertura fotográfica completa do teu evento, do início ao fim.',
    image: getSectionImage('marcas', 0),
    duration: '6 horas',
    photos: '80–100 fotos',
    delivery: '21 dias',
    price: '370.000 KZ',
  },
];

/** Banner da página de contactos/imprensa. */
export const pressBanner = getSectionImage('os-mangais-de-angola', 0);

/** Itens de navegação. */
export const navGroups = {
  fotos: ['Pessoas', 'Estilo', 'Histórias', 'Marcas'],
  exibicoes: ['As camadas da alma', 'Os mangais de Angola'],
};
