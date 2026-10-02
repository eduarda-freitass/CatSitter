FROM node:22-trixie-slim

WORKDIR /app

ENV NODE_ENV=production

# Instala só as dependências de produção (aproveita o cache do Docker)
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY src ./src

# Pasta do banco SQLite, montada como volume pelo docker-compose
RUN mkdir -p /app/data && chown -R node:node /app/data

USER node

EXPOSE 3000

CMD ["node", "src/server.js"]
