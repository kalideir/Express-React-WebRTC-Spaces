FROM node:16.14-slim as base

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

RUN npm i npm@latest -g


RUN mkdir /usr/app && chown node:node /usr/app

WORKDIR /usr/app

EXPOSE 8000
EXPOSE 9229

COPY --chown=node:node package*.json ./

USER node

RUN rm -rf node_modules/
RUN npm cache clean --force


RUN npm install --unsafe-perm=true  && npm cache clean --force
RUN npm install sharp


ENV PATH /usr/app/node_modules/.bin:$PATH


COPY --chown=node:node . .



# USER node


# if you want to use npm start instead, then use `docker run --init in production`
# so that signals are passed properly. Note the code in index.js is needed to catch Docker signals
# using node here is still more graceful stopping then npm with --init afaik
# I still can't come up with a good production way to run with npm and graceful shutdown
# CMD [ "node", "./bin/www" ]

FROM base as dev

ENV NODE_ENV = development



ENTRYPOINT [ "npm", "run", "dev" ]
