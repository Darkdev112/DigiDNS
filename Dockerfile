FROM node:18.1.0-alpine

WORKDIR /usr/src/app

COPY BACKEND/package*.json ./backend/
RUN cd backend && npm install

COPY SERVER/package*json ./server/
RUN cd server && npm install

COPY BACKEND/ ./backend/
COPY SERVER/ ./server/

RUN npm install -g pm2

# CMD ["pm2-runtime", "start", "--name", "backend", "backend/app.js", "--name", "server", "server/index.js"]
CMD [ "node", "server/index.js" ]

EXPOSE 5000 53/udp
EXPOSE 53/tcp