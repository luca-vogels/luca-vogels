FROM alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN apk update && apk upgrade
RUN apk add curl npm

WORKDIR /app
COPY package.json .
RUN npm install --save
COPY . .

HEALTHCHECK CMD curl -f http://localhost/ || exit 1

EXPOSE 80

CMD ["npm", "run", "start"]