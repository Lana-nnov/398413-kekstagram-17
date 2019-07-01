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

  // функция для смены класса на активном элементе
  var changeButtonActive = function (name) {
    Array.prototype.forEach.call(buttonsFilter, function (elem) {
      elem.classList.remove('img-filters__button--active');
    });
    name.classList.add('img-filters__button--active');
  };

  // функция для сортировки и показа фотографий по обсуждаемости (в зависимости от количества комментариев)
  var showDiscussedFotos = function (array) {
    deleteElements('.pictures', '.picture');
    var newArray = array.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
    return renderPhotos(newArray);
  };

  // функция для показа новых фотографий (в случайном порядке)
  var showNewFotos = function (array) {
    var showNewFotosSteps = function () {
      deleteElements('.pictures', '.picture');
      shuffleArray(array);
      renderPhotos(array);
    };
    window.debounce(showNewFotosSteps);
  };

  // открываем popup
  uploadFileElement.addEventListener('change', function () {
    window.openPopup();
  });

  // в случае успешного ответа сервера загружаем фотографии с данными
  var showLoadSuccess = function (array) {
    deleteElements('.pictures', '.picture');
    imgFilters.classList.remove('img-filters--inactive');
    renderPhotos(array);
  };

  // меняем подборку фотографий при нажатии на фильтр "Обсуждаемые"
  discussedPhotoFilter.addEventListener('click', function () {
    changeButtonActive(discussedPhotoFilter);
    window.load(showDiscussedFotos, window.showErrorOfLoad);
  });

  // меняем подборку фотографий при нажатии на фильтр "Популярные"
  popularPhotoFilter.addEventListener('click', function () {
    changeButtonActive(popularPhotoFilter);
    window.load(showLoadSuccess, window.showErrorOfLoad);
  });

  // меняем подборку фотографий при нажатии на фильтр "Новые"
  newPhotoFilter.addEventListener('click', function () {
    changeButtonActive(newPhotoFilter);
    window.load(showNewFotos, window.showErrorOfLoad);
  });

  window.load(showLoadSuccess, window.showErrorOfLoad);
})();
