FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 1060

CMD [ "npm", "run", "dev" ]

RUN npx prisma generate
