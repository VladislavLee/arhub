#STAGE 1
FROM node:16.14-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

#STAGE 2

FROM nginx:1.17.1-alpine

RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/ar-hub-mobile /usr/share/nginx/html
