FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]

# docker build -t vilmarmartins/api-boilerplate .

# docker run -p 3000:3000 -d vilmarmartins/api-boilerplate