'use strict';
(function () {
  // обозначаем константы и переменные
  var COMMENTS = ['Всё отлично', 'В целом всё неплохо. Но не всё',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var AUTHORS = ['Петр', 'Василий', 'Дарина', 'Герман', 'Анна'];
  var NUMBER_PHOTOS = 25;

  // находим контейнер с фото - тег <template> с классом pictures и внутри ccылку с id picture, в которой одно изображение

  function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  // функция для создания массива с данными пользователя (имя, аватар, комментарии)
  var generateUsersData = function () {
    var users = [];
    for (var i = 0; i < AUTHORS.length; i++) {
      var userElement = {
        avatar: 'img/avatar-' + (i + 1) + '.svg',
        message: COMMENTS[Math.floor(Math.random() * COMMENTS.length)],
        name: AUTHORS[i]
      };
      users[i] = userElement;
    }
    return users;
  };

  // функция для создания массива с данными фотографии (имя пользователя, аватар, url фото, комментарии
  var generatePhotosData = function (count) {
    var photos = [];
    for (var i = 0; i < count; i++) {
      var randAuthor = Math.floor(Math.random() * users.length);
      var block = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: randomInteger(15, 200),
        comments: [
          users[randAuthor]
        ]
      };
      photos[i] = block;
    }
    return photos;
  };

  var users = generateUsersData();
  var photos = generatePhotosData(NUMBER_PHOTOS);
  window.photos = photos;
})();
