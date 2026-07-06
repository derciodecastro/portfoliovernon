import { defineConfig, type PluginOption, type ViteDevServer } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { generateGalleries, GALLERY_FOLDERS } from './scripts/generate-galleries.mjs'

// Gera src/data/galleries.json a partir das pastas em public/, listando
// as fotos pela data de criação do ficheiro. Assim, basta colocar uma
// foto na pasta para que apareça na galeria, sem precisar de a numerar.
function galleryManifestPlugin(): PluginOption {
  const watchPaths = GALLERY_FOLDERS.map((folder: string) => path.join(__dirname, 'public', folder))

  return {
    name: 'gallery-manifest',
    buildStart() {
      generateGalleries(__dirname)
    },
    configureServer(server: ViteDevServer) {
      generateGalleries(__dirname)
      server.watcher.add(watchPaths)
      server.watcher.on('all', (event: string, filePath: string) => {
        if (event !== 'add' && event !== 'unlink') return
        if (!watchPaths.some((dir: string) => filePath.startsWith(dir))) return
        generateGalleries(__dirname)
        server.ws.send({ type: 'full-reload' })
      })
    },
  }
}

export default defineConfig({
  plugins: [galleryManifestPlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Suporte a importações raw de SVG/CSV, se necessário.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
