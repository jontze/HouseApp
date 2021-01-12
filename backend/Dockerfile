FROM node:14.15-alpine as build
WORKDIR /usr/backend
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm i
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:14.15-alpine as production
WORKDIR /usr/backend/
COPY --from=build /usr/backend/node_modules ./node_modules
COPY --from=build /usr/backend/package*.json ./
COPY --from=build /usr/backend/dist ./dist
COPY --from=build /usr/backend/prisma ./prisma
CMD [ "npm", "run", "start:prod" ]