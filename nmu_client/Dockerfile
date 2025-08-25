# Stage 1: build
FROM node:20-alpine AS builder

WORKDIR /app

# Оптимально: сначала пакеты
COPY package*.json ./
RUN npm ci

# Копируем весь проект
COPY . .

# Собираем next
RUN npm run build

# Stage 2: runtime
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Копируем нужные артефакты
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
