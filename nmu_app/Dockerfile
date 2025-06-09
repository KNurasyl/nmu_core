FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev
RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

EXPOSE 5000
CMD ["sh", "-c", "dockerize -wait tcp://db:27017 -timeout 20s && npm run start:prod"]
