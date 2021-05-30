FROM tiangolo/node-frontend:10 as build-stage

FROM node:latest as build

WORKDIR /usr/local/app
COPY ./ /usr/local/app/

RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=build /usr/local/app/dist/client /usr/share/nginx/html

EXPOSE 4201