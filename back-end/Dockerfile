FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY cert.key /app/cert.key
COPY cert.crt /app/cert.crt
RUN npm run build

EXPOSE 3333

ENV NODE_ENV=production
ENV SSL_KEY=/app/cert.key
ENV SSL_CERT=/app/cert.crt

CMD ["npm", "run", "start"] 