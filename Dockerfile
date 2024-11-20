FROM node:18.1.0-alpine

WORKDIR /usr/src/app

COPY BACKEND/package*.json ./backend/
RUN cd backend && npm install

COPY SERVER/package*json ./server/
RUN cd server && npm install

COPY BACKEND/ ./backend/
COPY SERVER/ ./server/

RUN npm install -g pm2

COPY start.sh /usr/src/app/start.sh
RUN chmod +x /usr/src/app/start.sh

CMD ["/usr/src/app/start.sh"]

EXPOSE 5000 53/udp
EXPOSE 53/tcp