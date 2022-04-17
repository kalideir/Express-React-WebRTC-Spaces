# Stage 1
FROM node:16.14-slim as base

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

RUN npm i npm@latest -g

RUN mkdir /usr/app && chown node:node /usr/app

WORKDIR /usr/app


ARG PORT=3000

ENV PORT $PORT

COPY --chown=node:node package*.json ./

# RUN export NODE_OPTIONS=--max_old_space_size=4096

RUN rm -rf node_modules && npm install --unsafe-perm=true  && npm cache clean --force


COPY --chown=node:node . .


# dev setup
FROM base as dev

ENV NODE_ENV = development

ENTRYPOINT [ "npm", "run", "start" ]



# nginx 
FROM nginx

COPY ../nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/build /usr/share/nginx/html
