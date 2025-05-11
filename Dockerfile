# ---- Build Stage ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build

# ---- Production Stage ----
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/dist ./dist

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "tcp://0.0.0.0:${PORT}"]