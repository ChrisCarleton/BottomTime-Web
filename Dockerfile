FROM node:10.11.0

RUN mkdir -p /var/lib/bottomtime
WORKDIR /var/lib/bottomtime
ADD . .
RUN npm install -g gulp-cli
RUN npm install

CMD [ "node", "service/index.js" ]
