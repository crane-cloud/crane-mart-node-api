FROM node:14-alpine
WORKDIR /
COPY . .
RUN yarn install
CMD ["node", "index.js"]