# Stage 1
FROM node:16.14-slim as base

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

RUN mkdir /usr/app && chown node:node /usr/app

WORKDIR /usr/app


ARG PORT=3000

ENV PORT $PORT

COPY package.json ./

RUN rm -rf node_modules/

RUN npm cache clean --force

RUN npm install --unsafe-perm=true  && npm cache clean --force


COPY --chown=node:node . .


# dev setup

FROM base as dev

ENV NODE_ENV = development

ENTRYPOINT [ "npm", "run", "start" ]


# prod setup

FROM base as prod

ENV NODE_ENV = development

# nginx 
FROM nginx

COPY ../nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/build /usr/share/nginx/html
