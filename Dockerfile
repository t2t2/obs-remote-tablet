FROM ubuntu:20.04

RUN \
    apt-get update && \
    apt-get install -y --no-install-recommends \
        npm && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY *.js *.json LICENSE /obs-tablet-remote/
COPY public /obs-tablet-remote/public
COPY src    /obs-tablet-remote/src

WORKDIR /obs-tablet-remote/

RUN npm install -g http-server
RUN npm install && npm run build
EXPOSE 8080
WORKDIR /obs-tablet-remote/dist/
CMD ["http-server"]
