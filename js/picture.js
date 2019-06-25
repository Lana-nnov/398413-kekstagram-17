'use strict';
(function () {
  // поиск полей для масштабирования фото, для наложения фильтров
  var fieldsetElement = window.form.popup.querySelector('.img-upload__effects');
  var imgPreviewContainer = window.form.popup.querySelector('.img-upload__preview');
  var imgPreview = imgPreviewContainer.querySelector('img');
  var levelEffect = window.form.popup.querySelector('.effect-level__pin');
  var levelEffectDepth = window.form.popup.querySelector('.effect-level__depth');
  var levelLine = window.form.popup.querySelector('.effect-level__line');
  window.imgPreview = imgPreview;

  // расчет насыщенности фильтра в зависимости от значения
  var applyFilter = function (percentage) {
    var checked = fieldsetElement.querySelector('input:checked');
    var filter;
    window.form.levelFieldset.classList.remove('hidden');
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
        window.form.levelFieldset.classList.add('hidden');
    }

    imgPreview.style.filter = filter;
    levelEffect.style.left = percentage + '%';
    levelEffectDepth.style.width = percentage + '%';
  };

  // выбираем фильтры
  fieldsetElement.addEventListener('change', function () {
    applyFilter(100);
  });

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
})();
