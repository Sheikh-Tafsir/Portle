FROM node:18-alpine

WORKDIR /app

COPY . /app

RUN npm rebuild bcrypt --build-from-source \
    && npm install

EXPOSE 8000

CMD ["node", "index.js"]
