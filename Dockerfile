FROM node:18
WORKDIR /app
#COPY package.json ./
COPY ./src .
RUN npm install -g @angular/cli
RUN npm install -g npm@9.6.5
RUN npm install
#COPY ./src .

EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]
