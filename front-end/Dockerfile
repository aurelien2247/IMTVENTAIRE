FROM node:18-alpine AS build
WORKDIR /app
COPY front-end/package*.json ./
RUN npm install
COPY front-end/. .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY front-end/nginx.conf /etc/nginx/conf.d/default.conf
COPY ssl/server.crt /etc/nginx/ssl/server.crt
COPY ssl/server.key /etc/nginx/ssl/server.key
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
