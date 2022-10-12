FROM node:16 as builder

ADD . /app
WORKDIR /app
RUN --mount=type=cache,target=/cache npm ci
RUN npm run test

# ---

FROM node:16

WORKDIR /app
COPY --from=builder /app /app

CMD node /app/index.js
