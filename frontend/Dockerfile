# build environment
FROM node:8 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json .
RUN npm install --silent
COPY . .
RUN npm run build

# production environment
FROM nginx:1.13.9-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]