'use strict';
(function () {
  // поиск полей для масштабирования фото
  var imgSizeSmaller = window.form.popup.querySelector('.scale__control--smaller');
  var imgSizeBigger = window.form.popup.querySelector('.scale__control--bigger');
  var STEP = 25;
  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;

  // изменение размеров изображения (меньше - больше)

  var getImageScale = function () {
    return parseInt(window.form.imgSize.value.slice(0, -1), 10);
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
    window.form.imgSize.value = percentage + '%';
    var sizeTransform = 'scale(' + value + ')';
    window.imgPreview.style.transform = sizeTransform;
  };

  // изменяем размер фото
  imgSizeSmaller.addEventListener('click', onButtonSizeSmallClick);
  imgSizeBigger.addEventListener('click', onButtonSizeBigClick);
})();
