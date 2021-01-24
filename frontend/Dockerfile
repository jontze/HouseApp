FROM node:14.15-alpine as build
WORKDIR /usr/frontend
COPY package*.json ./
COPY tsconfig.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.17.1-alpine as production
WORKDIR /usr/frontend
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/frontend/dist/frontend /usr/share/nginx/html