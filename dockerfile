
# dockerfile
# build stage
FROM nikolaik/python-nodejs:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm config set registry "https://registry.npm.taobao.org"
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]