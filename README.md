# Pitico Pet Care — site

Site estático feito só com HTML, CSS e JavaScript. Ele não precisa de build nem de instalar nada.

```
index.html      → página
css/style.css   → visual (cores e fontes ficam no topo, em :root)
js/main.js      → menu, animações e links do WhatsApp
assets/         → logo, mascote e fotos
```

## Publicar na Vercel
1. Crie um repositório no GitHub e envie todos os arquivos desta pasta.
2. Em vercel.com, clique em **Add New → Project** e importe o repositório.
3. Em *Framework Preset*, deixe **Other** e clique em **Deploy**. Não precisa de mais nenhuma configuração.

## Publicar no GitHub Pages
1. Envie os arquivos para um repositório.
2. Vá em **Settings → Pages**, escolha *Deploy from a branch*, depois a branch `main` e a pasta `/ (root)`.
3. Em alguns minutos o site fica no ar em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

## Ajustes rápidos
- **Número do WhatsApp:** está em `js/main.js`, na linha `WHATSAPP_NUMERO`. Use só números, com 55 e DDD.
- **Mensagens prontas do WhatsApp:** ficam no atributo `data-msg` de cada botão, no `index.html`.
- **Preço "a partir de":** procure por `Planos a partir de` no `index.html`.
- **Fotos:** substitua os arquivos em `assets/` mantendo os mesmos nomes.
