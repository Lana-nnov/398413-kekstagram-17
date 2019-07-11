'use strict';
(function () {
  var popup = document.querySelector('.img-upload__overlay');
  var hashtag = popup.querySelector('.text__hashtags');
  var MAX_HASHTAGS = 5;
  var MIN_LENGTH_HASHTAG = 2;
  var MAX_LENGTH_HASHTAG = 20;

  var checkHashtags = function () {
    var hashtagValue = hashtag.value.replace(/\s+/g, ' ').trim().toLowerCase();
    var hashtagArray = hashtagValue.split(' ');
    var errorMessage;
    var repeatedHashtags = hashtagArray.filter(function (element, indexElement, array) {
      return indexElement !== array.indexOf(element) || indexElement !== array.lastIndexOf(element);
    });

    for (var i = 0; i < hashtagArray.length; i++) {
      var hash = hashtagArray[i];
      if (hash.charAt(0) !== '#') {
        errorMessage = 'Хэш-тег должен начинаться с символа #';
      } else if (hash.charAt(0) === '#' && hash.length < MIN_LENGTH_HASHTAG) {
        errorMessage = 'Хэш-тег должен быть больше одного символа';
      } else if (hash.charAt(0) === '#' && hash.length >= MIN_LENGTH_HASHTAG) {
        var result = hash.match(/#/g).length;
        if (hash.length > MAX_LENGTH_HASHTAG) {
          errorMessage = 'Хэш-тег должен быть не больше 20 символов';
        } else if (hashtagArray.length > MAX_HASHTAGS) {
          errorMessage = 'Должно быть не больше 5 хэш-тегов';
        } else if (result > 1) {
          errorMessage = 'Хэш-теги должны быть разделены пробелами';
        } else if (repeatedHashtags.length > 0) {
          errorMessage = 'Хэш-теги не должны повторяться';
        }
      }
      if (errorMessage) {
        hashtag.setCustomValidity(errorMessage);
        hashtag.style.border = '2px solid red';
      } else {
        hashtag.setCustomValidity(' ');
        hashtag.style.border = 'none';
      }
    }
  };

  hashtag.addEventListener('change', checkHashtags);
})();
