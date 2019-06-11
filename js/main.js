'use strict';

// обозначаем константы и переменные
var photos = [];
var COMMENTS = ['Всё отлично', 'В целом всё неплохо. Но не всё',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var AUTHORS = ['Петр', 'Василий', 'Дарина', 'Герман', 'Анна'];
var NUMBER_PHOTOS = 25;
var users = [];

// находим контейнер с фото - тег <template> с классом pictures и внутри ccылку с id picture, в которой одно изображение
var similarListElement = document.querySelector('.pictures');
var similarPhotoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

// функция для создания массива с данными пользователя (имя, аватар, комментарии)
var generateUsersData = function (names) {
  for (var i = 0; i < AUTHORS.length; i++) {
    var userElement = {
      url: 'img/' + (i + 1) + '.svg',
      name: AUTHORS[i],
      masage: COMMENTS[Math.floor(Math.random() * COMMENTS.length)]
    };
    names[i] = userElement;
  }
  return names;
};
generateUsersData(users);

// функция для создания массива с данными фотографии (имя пользователя, аватар, url фото, комментарии
var generatePhotosData = function (count) {
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

generatePhotosData(NUMBER_PHOTOS);

// функция для создания блока с фото, передаем конкретное фото + количество лайков
var renderPhoto = function (photo) {
  var photoElement = similarPhotoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  return photoElement;
};

// передаем параметры нашего массива в функцию, вставляем фотографии ...

var renderPhotos = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderPhoto(array[i]));
  }
  similarListElement.appendChild(fragment);
};

renderPhotos(photos);
