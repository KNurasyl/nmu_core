# --- Build stage ---
FROM node:24-alpine AS builder
WORKDIR /app

# Копируем package.json и lock-файлы
COPY package*.json ./
# COPY .env ./.env
COPY . .

RUN npm install --frozen-lockfile

# Важно! Если используешь переменные окружения для билд-тайма,
# либо положи их в .env, либо пробрасывай через ARG как у тебя.

# Собираем проект
RUN npm run build

# --- Production stage ---
FROM node:24-alpine AS runner
WORKDIR /app

# Копируем необходимые файлы из builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env

# Для SSR: пробрасываем переменную окружения, если нужно
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

EXPOSE 4000

CMD ["npm", "start"]
