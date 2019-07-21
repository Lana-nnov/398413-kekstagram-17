'use strict';
(function () {
  // поиск полей для масштабирования фото, для наложения фильтров
  var MIN_SCALE = 0;
  var MAX_SCALE = 100;
  var popup = document.querySelector('.img-upload__overlay');
  var fieldsetElement = popup.querySelector('.img-upload__effects');
  var imgPreviewContainer = popup.querySelector('.img-upload__preview');
  var imgPreview = imgPreviewContainer.querySelector('img');
  var levelFieldset = popup.querySelector('.img-upload__effect-level');
  var levelEffect = popup.querySelector('.effect-level__pin');
  var levelEffectDepth = popup.querySelector('.effect-level__depth');
  var levelLine = popup.querySelector('.effect-level__line');

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
      effectPercentage = Math.min(effectPercentage, MAX_SCALE);
      effectPercentage = Math.max(effectPercentage, MIN_SCALE);
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

  window.filter = {
    applyFilter: applyFilter
  };
})();
