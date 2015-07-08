FROM google/nodejs

MAINTAINER Andrea Tosatto <andrea.tosy@gmail.com>

WORKDIR /presentation

RUN npm install -g gulp bower
RUN echo '{ "allow_root": true }' > /root/.bowerrc
ADD . /presentation
RUN npm install && bower install

EXPOSE 8080

CMD [ ]
ENTRYPOINT ["gulp", "connect"]
