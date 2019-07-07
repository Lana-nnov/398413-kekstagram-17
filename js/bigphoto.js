'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  var bigPictureCommentsList = bigPicture.querySelector('.social__comments');
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  var bigPictureImg = bigPicture.querySelector('img');

  window.showBigPicture = function (imgBig) {
    bigPicture.classList.remove('hidden');
    bigPictureImg.src = imgBig.url;
    bigPictureLikes.textContent = imgBig.likes;
    bigPictureCommentsCount.textContent = imgBig.comments.length;
    bigPictureDescription.innerHTML = imgBig.description;
    showComments(imgBig.comments);
  };

  var createElement = function (element, elementClass) {
    var newElement = document.createElement(element);
    newElement.classList.add(elementClass);
    return newElement;
  };

  var showComments = function (comments) {
    var bigPictureComments = bigPicture.querySelectorAll('.social__comment');
    bigPictureComments.forEach(function (element) {
      element.remove();
    });
    comments.forEach(function (element) {
      var commentItem = createElement('li', 'social__comment');
      var comment = createElement('p', 'social__text');
      var commentImg = createElement('img', 'social__picture');
      comment.textContent = element.message;
      commentImg.src = element.avatar;
      commentImg.alt = 'Аватар комментатора фотографии';
      commentImg.width = 35;
      bigPictureCommentsList.appendChild(commentItem);
      commentItem.appendChild(commentImg);
      commentItem.appendChild(comment);
    });
  };
})();
