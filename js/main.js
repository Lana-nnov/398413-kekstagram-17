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
var levelLine = popup.querySelector('.effect-level__line');
var levelEffect = popup.querySelector('.effect-level__pin');
var levelEffectDepth = popup.querySelector('.effect-level__depth');
var levelFieldset = popup.querySelector('.img-upload__effect-level');
var userCommentTextarea = popup.querySelector('.text__description');
var STEP = 25;
var MIN_SCALE_VALUE = 25;
var MAX_SCALE_VALUE = 100;

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
  var isFocused = (document.activeElement === userCommentTextarea);
  if (evt.keyCode === ESC_KEYCODE && !isFocused) {
    onButtonClose();
  }
};

var onImageChange = function () {
  popup.classList.remove('hidden');
  imgSize.value = '100%';
  document.addEventListener('keydown', onPopupEscPress);
  levelFieldset.classList.add('hidden');
};

var onButtonClose = function () {
  popup.classList.add('hidden');
  document.removeEventListener('kewdown', onPopupEscPress);
};

// изменение размеров изображения (меньше - больше)

var getImageScale = function () {
  return parseInt(imgSize.value.slice(0, -1), 10);
};

var onButtonSizeSmallClick = function () {
  var size = getImageScale();
  if (size > MIN_SCALE_VALUE) {
    var sizeNew = size - STEP;
    setImageScale(sizeNew);
  }
};

var onButtonSizeBigClick = function () {
  var size = getImageScale();
  var sizeNew = size + STEP;
  if (size < MAX_SCALE_VALUE) {
    setImageScale(sizeNew);
  }
};

// вычисление значения кнопки и коэффициента трансформации картинки
var setImageScale = function (percentage) {
  var value = percentage / 100;
  imgSize.value = percentage + '%';
  var sizeTransform = 'scale(' + value + ')';
  imgPreview.style.transform = sizeTransform;
};

// расчет насыщенности фильтра в зависимости от значения
var applyFilter = function (percentage) {
  var checked = fieldsetElement.querySelector('input:checked');
  var filter;
  levelFieldset.classList.remove('hidden');
  switch (checked.value) {
    case 'chrome':
      filter = 'grayscale(' + percentage / 100 + ')';
      break;
    case 'sepia':
      filter = 'sepia(' + percentage / 100 + ')';
      break;
    case 'marvin':
      filter = 'invert(' + percentage + '%)';
      break;
    case 'phobos':
      filter = 'blur(' + 3 * percentage / 100 + 'px)';
      break;
    case 'heat':
      filter = 'brightness(' + 3 * percentage / 100 + ')';
      break;
    default:
      imgPreview.style.filter = 'none';
      levelFieldset.classList.add('hidden');
  }

  imgPreview.style.filter = filter;
  levelEffect.style.left = percentage + '%';
  levelEffectDepth.style.width = percentage + '%';
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
uploadFileElement.addEventListener('change', onImageChange);
popupClose.addEventListener('click', onButtonClose);

// изменяем размер фото
imgSizeSmaller.addEventListener('click', onButtonSizeSmallClick);
imgSizeBigger.addEventListener('click', onButtonSizeBigClick);

// двигаем ползунок
levelEffect.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoord = evt.clientX;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = startCoord - moveEvt.clientX;

    startCoord = moveEvt.clientX;

    var nextCoordinate = levelEffectDepth.offsetWidth - shift;
    var effectPercentage = nextCoordinate * 100 / levelLine.offsetWidth;
    effectPercentage = Math.min(effectPercentage, 100);
    effectPercentage = Math.max(effectPercentage, 0);
    applyFilter(effectPercentage);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// выбираем фильтры
fieldsetElement.addEventListener('change', function () {
  applyFilter(100);
});
