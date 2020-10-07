FROM node:12.2.0-alpine
RUN mkdir -p /home/node/app
WORKDIR /home/node/app/

COPY package*.json ./ 
RUN npm install
RUN npm install -g pm2
ENV PATH /home/node/app/node_modules/.bin:$PATH
COPY . .


CMD ["pm2-runtime","process.json", "--env development"]