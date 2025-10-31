FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV OVERCLICKED_DB_DIR=.

RUN chown -R node .
USER node

CMD ["npm", "start"]
