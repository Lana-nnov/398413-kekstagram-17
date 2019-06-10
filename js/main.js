'use strict';

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function trunCate(str, maxlength) {
  if (str.length > maxlength) {
    return str.slice(0, maxlength - 3) + '...';
    // итоговая длина равна maxlength
  }
  return str;
}
// находим контейнер с фото - тег <template> с классом pictures и внутри ccылку с id picture, в которой одно изображение
var similarListElement = document.querySelector('.pictures');
var similarPhotoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

// обозначаем массивы и переменные
var photos = [];
var comments = ['Всё отлично', 'В целом всё неплохо. Но не всё',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var authors = ['Петр', 'Василий', 'Дарина', 'Герман', 'Анна'];
var avatars = [];
var numberPhotos = 25;
// var randComment = comments[Math.floor(Math.random() * comments.length)];

// функция для создания массива с данными польвателя (имя и аватар)
var renderAvatar = function (names, icons) {
  for (var i = 0; i < names.length; i++) {
    var userElement = {
      url: 'img/' + (i + 1) + '.svg',
      name: names[i]
    };
    icons[i] = userElement;
  }
  return userElement;
};

renderAvatar(authors, avatars);

// функция для создания массива с данными фотографии (имя пользователя, аватар, url фото, комментарии
var renderPhotoInfo = function (blocks, text, icons) {
  for (var i = 0; i < numberPhotos; i++) {
    var randAuthor = Math.floor(Math.random() * icons.length);
    var block = {
      author: icons[randAuthor].name,
      icon: icons[randAuthor].url,
      url: 'photos/' + (i + 1) + '.jpg',
      comment: text[Math.floor(Math.random() * text.length)]
    };
    blocks[i] = block;
  }
  return block;
};

renderPhotoInfo(photos, comments, avatars);

// функция для создания блока с фото, передаем конкретное фото + количество лайков
var renderPhoto = function (photo) {
  var photoElement = similarPhotoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__comments').textContent = trunCate(photo.comment, 8);
  photoElement.querySelector('.picture__likes').textContent = randomInteger(15, 200);
  return photoElement;
};

var fragment = document.createDocumentFragment();

// передаем параметры нашего массива в функцию, вставляем фотографии ...
for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhoto(photos[i]));
}
similarListElement.appendChild(fragment);
