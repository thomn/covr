FROM node:16 as builder

ADD . /app
WORKDIR /app

RUN npm ci
RUN npm run build
RUN npm run test

# ---

FROM node:16

WORKDIR /app
COPY --from=builder /app /app

CMD ["node", "/app/index.js"]
