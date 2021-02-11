FROM node:14.15.4-alpine

WORKDIR /usr/app

COPY . .

CMD ["./docker/entrypoint.sh"]