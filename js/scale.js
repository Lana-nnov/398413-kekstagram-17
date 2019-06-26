'use strict';
(function () {
  // поиск полей для масштабирования фото
  var popup = document.querySelector('.img-upload__overlay');
  var imgPreviewContainer = popup.querySelector('.img-upload__preview');
  var imgSize = popup.querySelector('.scale__control--value');
  var STEP = 25;
  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;

  // изменение размеров изображения (меньше - больше)

  var getImageScale = function () {
    return parseInt(imgSize.value.slice(0, -1), 10);
  };

  // вычисление значения кнопки и коэффициента трансформации картинки
  var setImageScale = function (percentage) {
    var value = percentage / 100;
    imgSize.value = percentage + '%';
    var sizeTransform = 'scale(' + value + ')';
    imgPreviewContainer.style.transform = sizeTransform;
  };

  window.scale = {

    onButtonSizeSmallClick: function () {
      var size = getImageScale();

      if (size > MIN_SCALE_VALUE) {
        var sizeNew = size - STEP;
        setImageScale(sizeNew);
      }
    },

    onButtonSizeBigClick: function () {
      var size = getImageScale();
      var sizeNew = size + STEP;

      if (size < MAX_SCALE_VALUE) {
        setImageScale(sizeNew);
      }
    }
  };
})();
