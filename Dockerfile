FROM node:6.2-slim
RUN DEBIAN_FRONTEND=noninteractive \
  apt-get update && \
  apt-get install -y graphicsmagick


WORKDIR /u/app
ADD . /u/app

EXPOSE 3000

RUN npm install

CMD npm start
