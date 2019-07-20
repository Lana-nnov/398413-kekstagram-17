'use strict';
(function () {
  // обозначаем константы и переменные
  var ENTER_KEYCODE = 13;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var similarListElement = document.querySelector('.pictures');
  var similarPhotoTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var imgFilters = document.querySelector('.img-filters');
  var popularPhotoFilter = imgFilters.querySelector('#filter-popular');
  var discussedPhotoFilter = imgFilters.querySelector('#filter-discussed');
  var newPhotoFilter = imgFilters.querySelector('#filter-new');
  var buttonsFilter = imgFilters.querySelectorAll('button');
  var picturesBlock = [];
  var fileChooser = document.querySelector('.img-upload__input');
  var preview = document.querySelector('.img-upload__preview > img');

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
    array.forEach(function (element) {
      fragment.appendChild(renderPhoto(element));
    });
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
    array.sort(function () {
      return Math.random() - 0.5;
    });
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
    arrayCopy.length = 10;
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
    var newPicturesBlock = picturesBlock.filter(function (element) {
      return element.url === attribute;
    });
    window.bigphoto.showBigPicture(newPicturesBlock[0]);
  };

  // открываем popup

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
        window.form.openPopup();
      });

      reader.readAsDataURL(file);
    }
  });

  window.backend.load(showLoadSuccess, window.serverStatus.showErrorOfLoad);

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

  var onsimilarListElementClick = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      if (evt.target.classList.contains('picture')) {
        var photo = evt.target.firstElementChild;
        var photoAttribute = photo.getAttribute('src');
        showBigPhoto(photoAttribute);
      }
    }
  };

  similarListElement.addEventListener('keydown', onsimilarListElementClick);
})();
