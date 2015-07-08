# Docker 101 - Coding, testing, shipping with Docker

## Abstract

Tutto il web acclama Docker come una delle più grandi innovazioni del millennio corrente.
Come possiamo utilizzare questa tecnologia per lo sviluppo, il testing e il rilascio delle nostre applicazioni e quali sono i vantaggi?

## View slides locally

First, ensure you have the following installed:

1. [Node.js](http://nodejs.org)
2. [Bower](http://bower.io): `$ npm install -g bower`
3. [Gulp](http://gulpjs.com): `$ npm install -g gulp`

Then, install dependencies and run the preview server:

```bash
$ npm install && bower install
$ gulp serve
```

## Run with Docker

Install Docker (or boot2docker) and docker-compose following
the instructions at https://docs.docker.com/installation/,
then...

#### On OsX

Install socat and xQuartz

```bash
$ brew install socat
$ brew cask install xquartz
```

Start socat to expose local xquartz socket on a TCP port

```bash
$ socat TCP-LISTEN:6000,reuseaddr,fork UNIX-CLIENT:\"$DISPLAY\"
```

Run boot2docker 1.6.2 as a workaround of the docker-compose's issue
https://github.com/docker/compose/issues/1638

```bash
$ boot2docker --iso-url="https://github.com/boot2docker/boot2docker/releases/download/v1.6.2/boot2docker.iso" init
$ boot2docker --iso-url="https://github.com/boot2docker/boot2docker/releases/download/v1.6.2/boot2docker.iso" up
$ boot2docker shellinit
```

Get your host vboxnet's ip address
NB: Substitute `vboxnet2` with the name of your virtualbox's private network

```bash
$ ifconfig vboxnet2 | grep 'inet' | awk '{ print $2}'
```

Update `DISPLAY` environment variable definition in the `docker-compose.yml`
file replacing the `_IP_` placeholder with the ip address
obtained in the previous step in order to pass the display to container

```yml
environment:
- DISPLAY=_IP_:0  # pass the display
```
