// Require Node modules in the browser thanks to Browserify: http://browserify.org
var bespoke = require('bespoke'),
  classes = require('bespoke-classes'),
  keys = require('bespoke-keys'),
  touch = require('bespoke-touch'),
  pdf = require('bespoke-pdf'),
  bullets = require('bespoke-bullets'),
  backdrop = require('bespoke-backdrop'),
  scale = require('bespoke-scale'),
  hash = require('bespoke-hash'),
  progress = require('bespoke-progress');

// Bespoke.js
var deck = bespoke.from('article', [
  classes(),
  keys(),
  touch(),
  pdf(),
  bullets('li, .bullet'),
  backdrop(),
  scale(),
  hash(),
  progress()
]);

(function bespokeBackgrounds(deck) {
  var backgrounds = [];

  deck.slides.forEach(function(slide) {
    var background = document.createElement('div');
    background.className = 'bespoke-background bespoke-background-inactive';

    var className = slide.getAttribute('data-bespoke-background');
    if (className) {
      background.className += ' ' + className;
    }

    backgrounds.push(background);
  });

  var activateBackgroundByIndex = function(index) {
      backgrounds.forEach(deactivateBackground.bind(null, index));
      activateBackground(backgrounds[index]);
    },

    activateBackground = function(background) {
      background.classList.remove('bespoke-background-inactive');
      background.classList.remove('bespoke-background-before');
      background.classList.remove('bespoke-background-after');
      background.classList.add('bespoke-background-active');
    };

    deactivateBackground = function(activeIndex, background, backgroundIndex) {
      background.classList.add('bespoke-background-' + (backgroundIndex < activeIndex ? 'before' : 'after'));
      background.classList.add('bespoke-background-inactive');
      background.classList.remove('bespoke-background-active');
    };

  deck.on('activate', function(e) {
    activateBackgroundByIndex(e.index);
  });

  backgrounds.forEach(deck.parent.appendChild.bind(deck.parent));
}(deck));


(function preloadBackgroundImages() {

  var matches, image,
    forEach = function(arrayLike, fn) {
      [].slice.call(arrayLike, 0).forEach(fn);
    };

  forEach(document.styleSheets, function(sheet) {
    forEach(sheet.rules, function(rule) {
      if (rule.style && rule.style.backgroundImage) {
        matches = rule.style.backgroundImage.match(/url\((.*)\)/);
        if (matches) {
          image = new Image();
          image.src = matches[1];
        }
      }
    });
  });

}());

// Prism syntax highlighting
// This is actually loaded from "bower_components" thanks to
// debowerify: https://github.com/eugeneware/debowerify
require('prism');

// Docker Language support
Prism.languages.docker = {
	'keyword': {
		pattern: /(^\s*)(?:ONBUILD|FROM|MAINTAINER|RUN|EXPOSE|ENV|ADD|COPY|VOLUME|USER|WORKDIR|CMD|LABEL|ENTRYPOINT)(?=\s)/mi,
		lookbehind: true
	},
	'string': /("|')(\\\n|\\?.)*?\1/,
	'comment': /#.*/,
	'punctuation': /([:[\]{}\-,|>?]|---|\.\.\.)/
};
