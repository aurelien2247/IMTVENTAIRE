FROM node:18-alpine

WORKDIR /app

COPY IMTVENTAIRE/package*.json ./
RUN npm install

COPY IMTVENTAIRE/ .
RUN npm run build -- --ignore-ts-errors

EXPOSE 3333

CMD ["npm", "run", "start"] 