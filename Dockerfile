FROM node:22.17.1-slim AS base

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store-v10,target=/pnpm/store pnpm install --store-dir /pnpm/store --frozen-lockfile

FROM deps AS build

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

ARG TYPEGEN_DATABASE_URL

RUN DATABASE_URL="$TYPEGEN_DATABASE_URL" pnpm prisma:generate
RUN pnpm generate:graphql
RUN pnpm build

FROM base AS runtime

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

COPY --from=build /app ./

EXPOSE 3000

CMD ["pnpm", "start"]
