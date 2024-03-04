FROM node:20.5.1

WORKDIR /home/mehio/Desktop/Shine-n-Ride-Backend

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT 8000

EXPOSE 8000

RUN npm install -g nodemon

CMD ["npm", "start"]
