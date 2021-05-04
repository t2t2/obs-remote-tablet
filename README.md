# OBS Remote Tablet

OBS Remote UI optimised for tablets, but really it works with any web browser.

## Building instructions

* Clone the repository
* Install dependencies `npm install`
* Build it! `npm run build`

Built files will be in `dist/` directory, serve these with your favourite webserver, be it nginx, apache, one of those fancy one-liners or whatever.

## Developing

* Clone
* Install dependencies
* `npm run dev`

## Dockerfile

The Dockerfile may be useful if you don't want to/can't install npm.
It is not currently officially supported, please send fixes if
needed.

* `docker build -t obs-tablet-remote .`
* `docker run -it --rm --expose=8080 obs-tablet-remote`
* You can then direct your web browser to `http://localhost:8080`
