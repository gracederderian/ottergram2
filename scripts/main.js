var DETAIL_IMAGE_SELECTOR = "[data-image-role=\"target\"]";
var DETAIL_TITLE_SELECTOR = "[data-image-role=\"title\"]";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role=\"trigger\"]";
var PREV_BUTTON_SELECTOR = "[prev-button-role=\"trigger\"]";
var NEXT_BUTTON_SELECTOR = "[next-button-role=\"trigger\"]";
var currImage = 0;

function setDetails(imageURL, titleText) {
  "use strict";

  //change the detail image
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageURL);

  //change detail image title
  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  "use strict";
  thumb.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function prevButtonClickHandler(button) {
  "use strict";

  button.addEventListener("click", function(event) {
    event.preventDefault();
    var thumbArray = getThumbnailsArray();
    if (currImage == 0) {
      currImage = thumbArray.length - 1;
      setDetailsFromThumb(thumbArray[currImage]);
    } else if (currImage != 0) {
      setDetailsFromThumb(thumbArray[currImage - 1]);
      currImage = currImage - 1;
    }
  });
}

function nextButtonClickHandler(button) {
  "use strict";

  button.addEventListener("click", function(event) {
    event.preventDefault();
    var thumbArray = getThumbnailsArray();
    currImage = (currImage + 1) % thumbArray.length;
    setDetailsFromThumb(thumbArray[currImage]);
  });
}

function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function getPrevArray() {
  "use strict";
  var button = document.querySelectorAll(PREV_BUTTON_SELECTOR);
  var buttonArray = [].slice.call(button);
  return buttonArray;
}

function getNextArray() {
  "use strict";
  var button = document.querySelectorAll(NEXT_BUTTON_SELECTOR);
  var buttonArray = [].slice.call(button);
  return buttonArray;
}

function initializeEvents() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  var previous = getPrevArray();
  previous.forEach(prevButtonClickHandler);
  var next = getNextArray();
  next.forEach(nextButtonClickHandler);
}


initializeEvents();
