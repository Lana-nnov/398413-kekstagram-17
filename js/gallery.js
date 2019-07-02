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
  var deleteElements = function (parentElement, childElement) {
    var parentSelector = document.querySelector(parentElement);
    var childElements = parentSelector.querySelectorAll(childElement);
    for (var i = 0; i < childElements.length; i++) {
      parentSelector.removeChild(childElements[i]);
    }
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
  var activateFilter = function (activeButton) {
    buttonsFilter.forEach(function (elem) {
      elem.classList.remove('img-filters__button--active');
    });
    activeButton.classList.add('img-filters__button--active');
    deleteElements('.pictures', '.picture');
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

  // открываем popup
  uploadFileElement.addEventListener('change', function () {
    window.openPopup();
  });

  // меняем подборку фотографий при нажатии на фильтр "Обсуждаемые"
  discussedPhotoFilter.addEventListener('click', function () {
    window.debounce(function () {
      activateFilter(discussedPhotoFilter);
      showDiscussedFotos(picturesBlock);
    });
  });

  // меняем подборку фотографий при нажатии на фильтр "Популярные"
  popularPhotoFilter.addEventListener('click', function () {
    window.debounce(function () {
      activateFilter(popularPhotoFilter);
      renderPhotos(picturesBlock);
    });
  });

  // меняем подборку фотографий при нажатии на фильтр "Новые"
  newPhotoFilter.addEventListener('click', function () {
    window.debounce(function () {
      activateFilter(newPhotoFilter);
      showNewFotos(picturesBlock);
    });
  });

  window.load(showLoadSuccess, window.showErrorOfLoad);
})();
