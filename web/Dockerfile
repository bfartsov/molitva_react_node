FROM node:12.2.0-alpine as build
RUN mkdir  /home/node/app
WORKDIR /home/node/app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm",  "start"]