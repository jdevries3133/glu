FROM nginx:1.21-alpine

RUN mkdir -p /etc/nginx/conf.d
COPY site.conf /etc/nginx/conf.d
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY public .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
