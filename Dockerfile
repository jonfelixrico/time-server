FROM node:16-buster As development

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm
RUN pnpm fetch

ADD . .

RUN pnpm install -r --offline

RUN pnpm run build

FROM node:16-buster As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm
RUN pnpm fetch --prod

ADD . .

RUN pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]