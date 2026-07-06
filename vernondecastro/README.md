# Vernon De Castro — Portfólio de Fotografia

Site de portfólio do fotógrafo e diretor **Vernon De Castro**. Uma _single page
application_ (SPA) em React que reúne galerias de fotografia, exposições,
biografia, loja de impressões e agendamento de sessões.

Projeto originalmente gerado no **Figma Make** e depois refatorado, corrigido e
polido (ver secção _Alterações_).

---

## 🛠️ Stack

- **React 18** + **TypeScript**
- **Vite 6** (build e dev server)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **motion** (Framer Motion) — animações e transições
- Fontes: Montserrat, Playfair Display, Outfit (Google Fonts)

## 🚀 Como executar

```bash
npm install        # instala dependências
npm run dev        # servidor de desenvolvimento (http://localhost:5173)
npm run build      # build de produção para ./dist
npm run preview    # pré-visualiza a build de produção
```

## 📂 Estrutura

```
vernondecastro/
├── index.html                    # HTML base (meta tags, favicon, SEO)
├── vite.config.ts                # config Vite + plugin de galerias
├── scripts/
│   └── generate-galleries.mjs    # gera o manifesto de galerias a partir de public/
├── public/                       # fotos e assets estáticos (servidos na raiz)
│   ├── galeria_pagina_inicial/   # slideshow do hero
│   ├── Galeria_Foto/             # pessoas · estilo · marcas · historias
│   ├── Galeria_Exibicoes/        # as-camadas-da-alma · os-mangais-de-angola
│   ├── background_de_botoes/     # fundos ao passar o rato no menu
│   ├── biografia/                # retrato
│   └── logotipo/                 # logo
└── src/
    ├── main.tsx                  # ponto de entrada
    ├── app/
    │   ├── App.tsx               # orquestrador (roteamento + layout)
    │   ├── components/           # Navbar, Lightbox, GalleryImage
    │   └── sections/             # Hero, Biografia, Imprensa, Exibicao,
    │                             #   Historias, Quiosque, Agendamento, Galeria
    ├── data/
    │   ├── content.ts            # textos, serviços, produtos, contactos
    │   └── galleries.json        # manifesto gerado automaticamente
    ├── lib/
    │   ├── galleries.ts          # helpers de galerias (slug, URLs, histórias)
    │   └── hooks.ts              # hooks (scroll, click-outside, proteção)
    └── styles/                   # fonts · tailwind · theme · index
```

## 🖼️ Como adicionar fotografias

O manifesto de galerias (`src/data/galleries.json`) é **gerado automaticamente**
a partir das pastas em `public/` — ordenado pela data de criação dos ficheiros.

- **Galerias** (Pessoas, Estilo, Marcas, Exibições): basta colocar a imagem
  (`.jpg`, `.jpeg`, `.png`, `.webp`) na pasta correspondente em `public/`.
- **Histórias**: cada história é uma subpasta em
  `public/Galeria_Foto/historias/`, com uma pasta `Capa/` (imagem de capa) e as
  restantes imagens da série. Criar uma nova pasta = nova história, sem tocar no
  código.
- **Quiosque / Agendamento**: as imagens dos produtos e serviços são resolvidas
  automaticamente a partir das galerias (as primeiras fotos de cada secção).

Em `npm run dev` o manifesto atualiza-se em tempo real ao adicionar/remover
ficheiros.

## 🧭 Navegação (secções)

| Secção            | Hash (URL)             | Descrição                                   |
| ----------------- | ---------------------- | ------------------------------------------- |
| Início            | `/`                    | Slideshow controlado pelo rato              |
| Pessoas / Estilo / Marcas | `#pessoas` etc. | Galerias em masonry + lightbox              |
| Histórias         | `#historias`           | Séries fotográficas (grelha + detalhe)      |
| As camadas da alma | `#as-camadas-da-alma` | Exposição em scroll horizontal              |
| Os mangais de Angola | `#os-mangais-de-angola` | Exposição em scroll horizontal          |
| Biografia         | `#biografia`           | Retrato + texto biográfico                  |
| Imprensa          | `#imprensa`            | Contactos de imprensa e representação       |
| Quiosque          | `#quiosque`            | Loja de impressões (encomenda por email)    |
| Agendamentos      | `#agendamento`         | Serviços + formulário de reserva por email  |

## ✨ Alterações desta versão (0.1.0)

**Correções**

- Imagens quebradas no Quiosque e Agendamento (referências a `1.jpg`/`2.jpg`
  inexistentes) — agora resolvidas dinamicamente a partir das pastas.
- Fundos de _hover_ em falta no menu (As camadas da alma, Os mangais, Biografia).
- URLs com acentos/espaços (ex.: `História 1`) agora corretamente codificadas.
- Formulários de agendamento agora **funcionais** (inputs controlados + envio por
  email com os dados preenchidos).

**Organização**

- `App.tsx` reduzido de **1375 → ~180 linhas**, dividido em componentes e secções.
- Dados e textos centralizados em `src/data/content.ts`.
- Histórias tornadas **dinâmicas** (lidas das pastas em vez de _hardcoded_).
- Removido código morto, `useState` não usados e textos _placeholder_.
- Contactos de imprensa de terceiros substituídos por contactos do próprio site.

**Visual / CSS**

- Tipografia editorial (Playfair Display nos títulos), _antialiasing_ e
  `::selection` personalizada.
- Galerias em **masonry** responsivo (preserva as proporções das fotos).
- _Scrollbar_ discreta, sublinhado animado nos links, indicadores no slideshow,
  gradientes subtis e transições mais suaves.
- `index.html` com favicon, `theme-color` e meta tags de SEO/Open Graph.

**Repositório**

- Adicionado `.gitignore` (ignora `node_modules/`, `dist/`, `.make`, `.DS_Store`…).
- Removidos ficheiros grandes/lixo do repo (bundle `.make` de 16 MB, logs,
  `.DS_Store`, componentes shadcn não usados).
- `package.json` enxuto (apenas as dependências realmente usadas).

## 📸 Créditos

Ver [ATTRIBUTIONS.md](./ATTRIBUTIONS.md).
