FROM node:16-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json ./
RUN pnpm install
RUN pnpm add pkg
COPY . .
RUN pnpm build
RUN pnpx pkg -t node16-alpine dist/main.js -o /app/auth

FROM alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/auth ./

EXPOSE 3000

ENV PORT 3000

CMD ["/app/auth"]
