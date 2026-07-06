# Guidelines do projeto

Regras e convenções para manter o código consistente.

## Geral

- Preferir layouts responsivos com flexbox/grid; usar posicionamento absoluto
  só quando necessário.
- Manter os ficheiros pequenos: cada secção do site vive em `src/app/sections/`
  e cada componente reutilizável em `src/app/components/`.
- Textos, serviços, produtos e contactos ficam centralizados em
  `src/data/content.ts` — não espalhar strings pelo código.
- Nunca referenciar imagens por nomes fixos (ex.: `1.jpg`). Usar os helpers de
  `src/lib/galleries.ts`, que resolvem as fotos a partir das pastas.

## Fotografias

- Colocar as imagens diretamente nas pastas de `public/` — o manifesto
  (`galleries.json`) é regenerado automaticamente pelo Vite.
- Usar sempre `loading="lazy"`, `decoding="async"` e `draggable={false}` nas
  fotos de galeria; a primeira imagem do hero pode usar `loading="eager"`.

## Tipografia

- **Playfair Display** (`font-serif`) para títulos editoriais.
- **Montserrat** (`font-sans`) para títulos fortes/uppercase.
- **Outfit** (`font-outfit`) para labels, botões e texto de interface.
- Tamanho base: 16px. _Tracking_ generoso (`tracking-[0.2em]`+) em labels
  uppercase.

## Estilo

- Paleta: preto (`#000`), off-white (`#f5f5f5` / `#e8e4da`) e vermelho de
  destaque (`#8B1A1A`).
- Transições suaves (`duration-300`+) e `ease-out`. Evitar animações bruscas.
