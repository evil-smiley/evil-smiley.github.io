var notBlank = function(text) {
  return (text.trim().length > 0);
}

var formatPage = function() {
  $(".beer-icon").css("display", "none");
  $(".heading-primary").css("display", "none");
  $(".heading-secondary").css("display", "none");
  
  $('#food').val('');

  let container = document.getElementById("container");
  container.style.display = 'block';
  container.style.height = '10rem';
  $("#container").addClass('margin-top-medium');

  let item = document.getElementById('item');
  document.getElementById('item').style.margin = "0 auto";

  $('#beer-section').removeClass('hide');
  $('#container').addClass('margin-bottom-medium');

  var beerSection = document.getElementById('beer-section');

  while (beerSection.hasChildNodes()) {   
    beerSection.removeChild(beerSection.firstChild);
  }

  var popup = document.getElementById('popup');

  while (popup.hasChildNodes()) {   
    popup.removeChild(popup.firstChild);
  }

  $('#error').addClass('hide');
}

var getBeerList = function(food) {
  let api = "https://api.punkapi.com/v2/beers?food=" + food;
  var beerSection = document.getElementById('beer-section');
  var popup = document.getElementById('popup');
  var colCount = 0;

  $.ajax({url:api,
    success:function (result) {

      if (result.length > 0) {
        var row = document.createElement('div');
        row.setAttribute("class", "row");

        for (var i = 0; i < result.length; i++) {

          if (colCount == 4) {
            var row = document.createElement('div');
            row.setAttribute("class", "row");
            colCount = 0;
          }
  
          var col = document.createElement('div');
          col.setAttribute("class", "col");
          col.setAttribute("onclick","window.location.href='#"+result[i].id+"';");
  
          var beer = document.createElement('div');
          beer.setAttribute("class", "beer");
  
          var img = document.createElement('img');
          img.setAttribute("src", result[i].image_url);
          img.setAttribute("class", "beer__image");
  
          var imgOverlay = document.createElement('div');
          imgOverlay.setAttribute("class", "beer__img-overlay");
  
          var beerName = document.createElement('div');
          beerName.setAttribute("class", "beer__name");
          var name = document.createTextNode(result[i].name); 
          beerName.appendChild(name);
  
          var beerTagline = document.createElement('div');
          beerTagline.setAttribute("class", "beer__tagline");
          var tagline = document.createTextNode(result[i].tagline);
          beerTagline.appendChild(tagline);
  
          imgOverlay.appendChild(beerName);
          imgOverlay.appendChild(beerTagline);
          beer.appendChild(imgOverlay);
          beer.appendChild(img);
          col.appendChild(beer);
          row.appendChild(col);
          
          beerSection.appendChild(row);
  
          colCount++;
  
          var popupDiv = document.createElement('div');
          popupDiv.setAttribute("class", "popup");
          popupDiv.setAttribute("id", result[i].id);
  
          popupContent = document.createElement('div');
          popupContent.setAttribute("class", "popup__content");
  
          var popupLeft = document.createElement('div');
          popupLeft.setAttribute("class", "popup__left");
  
          var popupRight = document.createElement('div');
          popupRight.setAttribute("class", "popup__right");
  
          var popupImg = document.createElement('img');
          popupImg.setAttribute("src", result[i].image_url);
          popupImg.setAttribute("class", "popup__img");
  
          var popupClose = document.createElement('a');
          popupClose.setAttribute("class", "popup__close");
          popupClose.setAttribute("href", "#");
          var close = document.createTextNode('\u00D7'); 
          popupClose.appendChild(close);
  
          var popupName = document.createElement('div');
          popupName.setAttribute("class", "popup__name");
          var popupBeerName = document.createTextNode(result[i].name); 
          popupName.appendChild(popupBeerName);
  
          var popupDesc = document.createElement('div');
          popupDesc.setAttribute("class", "popup__desc margin-top-small");
          var popupBeerDesc = document.createTextNode(result[i].description); 
          popupDesc.appendChild(popupBeerDesc);
  
          var popupPairing = document.createElement('div');
          popupPairing.setAttribute("class", "popup__pairing margin-top-small");
  
          var pairingText = "Other food pairing(s): ";
         
          for (var j = 0; j < result[i].food_pairing.length; j++) {
            if (j == 0) {
              pairingText = pairingText + " " + result[i].food_pairing[j];
            } else {
              pairingText = pairingText + ", " + result[i].food_pairing[j];
            }
          }
  
          var foodPair = document.createTextNode(pairingText); 
          popupPairing.appendChild(foodPair);
  
          popupClose.appendChild(close);
          popupLeft.appendChild(popupImg);
          popupRight.appendChild(popupClose);
          popupRight.appendChild(popupName);
          popupRight.appendChild(popupDesc);
          popupRight.appendChild(popupPairing);
          popupContent.appendChild(popupLeft);
          popupContent.appendChild(popupRight);
          popupDiv.appendChild(popupContent);
          popup.appendChild(popupDiv);
        }
      } else {
        var error = document.getElementById('error');
        error.setAttribute('class', 'error margin-top-big');
      }
    },
    error: function(result) {
      alert('Too Many Requests. You have reached your limit on this ip address. Please wait for an hour.');
    }
  });

}

var srchBeer = function(food, event) {
  event.preventDefault();

  if (notBlank(food)) {
    formatPage();
    food = food.replace(/ /g, "_");

    getBeerList(food);
  }
}

