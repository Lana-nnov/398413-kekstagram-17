'use strict';
(function () {
  // обозначаем константы и переменные
  var similarListElement = document.querySelector('.pictures');
  var similarPhotoTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var uploadFileElement = document.querySelector('.img-upload__start');
  var imgFilters = document.querySelector('.img-filters');
  var popularPhotoFilter = imgFilters.querySelector('#filter-popular');
  var discussedPhotoFilter = imgFilters.querySelector('#filter-discussed');
  var newPhotoFilter = imgFilters.querySelector('#filter-new');
  var buttonsFilter = imgFilters.querySelectorAll('button');
  var picturesBlock = [];
  var ENTER_KEYCODE = 13;

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

  // функция для удаления всех элементов из родителя
  var clearPictures = function () {
    similarListElement.querySelectorAll('.picture').forEach(function (element) {
      element.remove();
    });
  };

  // функция для сортировки массива в случайном порядке
  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  // функция для смены класса на активном элементе и удаления предыдущей выборки фото
  var activateFilter = function (buttonActive) {
    buttonsFilter.forEach(function (elem) {
      elem.classList.remove('img-filters__button--active');
    });
    buttonActive.classList.add('img-filters__button--active');
  };

  // функция для сортировки и показа фотографий по обсуждаемости (в зависимости от количества комментариев)
  var showDiscussedFotos = function (array) {
    var arrayCopy = array.slice();
    arrayCopy.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
    renderPhotos(arrayCopy);
  };

  // функция для показа новых фотографий (в случайном порядке)
  var showNewFotos = function (array) {
    var arrayCopy = array.slice();
    shuffleArray(arrayCopy);
    renderPhotos(arrayCopy);
  };

  // в случае успешного ответа сервера загружаем фотографии с данными
  var showLoadSuccess = function (array) {
    picturesBlock = array;
    imgFilters.classList.remove('img-filters--inactive');
    renderPhotos(picturesBlock);
    return picturesBlock;
  };

  var onFilterButtonClick = function (evt) {
    clearPictures();
    activateFilter(evt.target);
    var id = evt.target.id;
    if (id === 'filter-popular') {
      renderPhotos(picturesBlock);
    } else if (id === 'filter-new') {
      showNewFotos(picturesBlock);
    } else if (id === 'filter-discussed') {
      showDiscussedFotos(picturesBlock);
    }
  };

  var showBigPhoto = function (attribute) {
    for (var i = 0; i < picturesBlock.length; i++) {
      if (picturesBlock[i].url === attribute) {
        window.showBigPicture(picturesBlock[i]);
        break;
      }
    }
  };

  // открываем popup
  uploadFileElement.addEventListener('change', function () {
    window.openPopup();
  });

  window.load(showLoadSuccess, window.showErrorOfLoad);

  var onFilterButtonClickDebounce = window.debounce(onFilterButtonClick);

  // меняем подборку фотографий при нажатии на фильтр "Популярные"
  discussedPhotoFilter.addEventListener('click', onFilterButtonClickDebounce);
  popularPhotoFilter.addEventListener('click', onFilterButtonClickDebounce);
  newPhotoFilter.addEventListener('click', onFilterButtonClickDebounce);

  // открываем большое фото при клике на превью
  similarListElement.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      var photoAttribute = evt.target.getAttribute('src');
      showBigPhoto(photoAttribute);
    }
  });

  similarListElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      if (evt.target.classList.contains('picture')) {
        var photo = evt.target.firstElementChild;
        var photoAttribute = photo.getAttribute('src');
        showBigPhoto(photoAttribute);
      }
    }
  });
})();
