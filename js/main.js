'use strict';

// обозначаем константы и переменные
var COMMENTS = ['Всё отлично', 'В целом всё неплохо. Но не всё',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var AUTHORS = ['Петр', 'Василий', 'Дарина', 'Герман', 'Анна'];
var NUMBER_PHOTOS = 25;

// находим контейнер с фото - тег <template> с классом pictures и внутри ccылку с id picture, в которой одно изображение
var similarListElement = document.querySelector('.pictures');
var similarPhotoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

// открытие и закрытие поля редактирования фотографии
var popup = document.querySelector('.img-upload__overlay');
var uploadFileElement = document.querySelector('.img-upload__start');
var popupClose = popup.querySelector('.img-upload__cancel');
var ESC_KEYCODE = 27;

// поиск полей для масштабирования фото, для наложения фильтров
var imgSize = popup.querySelector('.scale__control--value');
var imgSizeSmaller = popup.querySelector('.scale__control--smaller');
var imgSizeBigger = popup.querySelector('.scale__control--bigger');
var imgPreviewContainer = popup.querySelector('.img-upload__preview');
var imgPreview = imgPreviewContainer.querySelector('img');
var fieldsetElement = popup.querySelector('.img-upload__effects');
var pinEffect = popup.querySelector('.effect-level__pin');
var pinEffectDepth = popup.querySelector('.effect-level__depth');
var pinContainer = popup.querySelector('.effect-level');

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

// функция для создания блока с фото, передаем конкретное фото + количество лайков
var renderPhoto = function (photo) {
  var photoElement = similarPhotoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  return photoElement;
};

// функция для открытия и закрытия всплывающего окна - редактирования фото


var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onButtonClose();
  }
};

var onImageChange = function () {
  popup.classList.remove('hidden');
  imgSize.value = '100%';
  document.addEventListener('keydown', onPopupEscPress);
};

var onButtonClose = function () {
  popup.classList.add('hidden');
  document.removeEventListener('click', onImageChange);
  document.removeEventListener('kewdown', onPopupEscPress);
};

// изменение размеров изображения (меньше - больше)
var onButtonSizeSmallClick = function () {
  var size = parseInt(imgSize.value.slice(0, -1), 10);
  var step = 25;
  if (size > step) {
    var sizeNew = size - step;
    imgSize.value = sizeNew + '%';
    var sizeTransform = 'scale(0.' + sizeNew + ')';
    imgPreview.style.transform = sizeTransform;
  }
};
var onButtonSizeBigClick = function () {
  var size = parseInt(imgSize.value.slice(0, -1), 10);
  var step = 25;
  var sizeNew = size + step;
  if (size <= step * 2) {
    imgSize.value = sizeNew + '%';
    var sizeTransform = 'scale(0.' + sizeNew + ')';
    imgPreview.style.transform = sizeTransform;
  }
  if (size >= 100 - step && size < 100) {
    imgSize.value = sizeNew + '%';
    imgPreview.style.transform = 'scale(1.0)';
  }
};

// передаем параметры нашего массива в функцию, вставляем фотографии ...

var renderPhotos = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderPhoto(array[i]));
  }
  similarListElement.appendChild(fragment);
};

var users = generateUsersData();
var photos = generatePhotosData(NUMBER_PHOTOS);
renderPhotos(photos);

// открываем и закрываем popup
uploadFileElement.addEventListener('change', function () {
  onImageChange();
});

popupClose.addEventListener('click', function () {
  onButtonClose();
});

// изменяем размер фото
imgSizeSmaller.addEventListener('click', onButtonSizeSmallClick);
imgSizeBigger.addEventListener('click', onButtonSizeBigClick);

// выбираем фильтры
fieldsetElement.addEventListener('change', function () {
  var checked = fieldsetElement.querySelector('input:checked');
  pinEffect.style.left = '100%';
  pinEffectDepth.style.width = '100%';
  switch (checked.value) {
    case 'chrome':
      imgPreview.style.filter = 'grayscale(0.5)';
      break;
    case 'sepia':
      imgPreview.style.filter = 'sepia(1)';
      break;
    case 'marvin':
      imgPreview.style.filter = 'invert(100%)';
      break;
    case 'phobos':
      imgPreview.style.filter = 'blur(3px)';
      break;
    case 'heat':
      imgPreview.style.filter = 'brightness(3)';
      break;
    default:
      imgPreview.style.filter = 'none';
  }
  pinEffect.addEventListener('mouseup', function (evt) {
    evt.preventDefault();
    var rectObject = pinContainer.getBoundingClientRect();
    var pinWidth = evt.clientX - rectObject.left;
    switch (checked.value) {
      case 'chrome':
        imgPreview.style.filter = 'grayscale(' + pinWidth * 1 / pinContainer.offsetWidth + ')';
        break;
      case 'sepia':
        imgPreview.style.filter = 'sepia(' + pinWidth * 1 / pinContainer.offsetWidth + ')';
        break;
      case 'marvin':
        imgPreview.style.filter = 'invert(' + pinWidth * 100 / pinContainer.offsetWidth + '%)';
        break;
      case 'phobos':
        imgPreview.style.filter = 'blur(' + pinWidth * 3 / pinContainer.offsetWidth + 'px)';
        break;
      case 'heat':
        imgPreview.style.filter = 'brightness(' + pinWidth * 3 / pinContainer.offsetWidth + ')';
        break;
      default:
        imgPreview.style.filter = 'none';
    }
  });
});
