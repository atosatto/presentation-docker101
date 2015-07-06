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
the instructions at https://docs.docker.com/installation/

Then, run the slides with:

```bash
$ docker-compose up
```
