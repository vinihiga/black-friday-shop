FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=optional || npm install
COPY . .
EXPOSE 3000

CMD ["npx", "tsx", "src/index.ts"]
