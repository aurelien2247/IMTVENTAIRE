FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3333

ENV NODE_ENV=production
ENV SSL_KEY=/app/ssl/server.key
ENV SSL_CERT=/app/ssl/server.cert

CMD ["npm", "run", "start"] 