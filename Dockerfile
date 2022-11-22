# build-stage
FROM node:16.7-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

# production-stage
FROM nginx:alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY default.conf.template /etc/nginx/templates/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]