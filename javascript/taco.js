$(document).ready(function () {
      var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        autoplayDisableOnInteraction: false,
        autoHeight: false
      });

      var apiInfo = [{
          name: "margarita",
          placement: "#margarita-card-holder"
        },
        {
          name: "mexican rice",
          placement: "#rice-card-holder"
        },
        {
          name: "taco filling",
          placement: "#filling-card-holder"
        },
        {
          name: "salsa",
          placement: "#salsa-card-holder"
        },
        {
          name: "guacamole",
          placement: "#guac-card-holder"
        }
      ];

      var apiCounter = 0;

      function printCards(searchTerm, destination) {
          var queryURL = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=e4a1878b&app_key=0e63bfc5291dfe20fad787020026c8ad&from=0&to=3";

          $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function (response) {
            console.log(response);

            for (var i = 0; i < response.hits.length; i++) {
              console.log(response.hits[i])
              var cardHolder = $(destination)
              //create a div with a col class
              var cardCol = $('<div>');
              cardCol.addClass("col s4");

              //create the card
              var card = $('<div>');
              card.addClass("card blue-grey darken-1");

              //create card content
              var cardContent = $('<div>');
              cardContent.addClass('card-content white-text');

              var cardTitle = $('<span>');
              cardTitle.addClass('card-title');
              cardTitle.html(response.hits[i].recipe.label)

              cardContent.prepend(cardTitle);

              var recipeSource = $('<p>');
              recipeSource.html(response.hits[i].recipe.source);
              cardContent.append(recipeSource);

              var recipeLink = $('<div>');
              recipeLink.addClass("card-action center-align");

              var a = $("<a>");
              a.attr("href", response.hits[i].recipe.shareAs);
              a.html("Get Recipe");

              recipeLink.append(a);
              cardContent.append(recipeLink);
              card.append(cardContent);
              cardCol.append(card);
              cardHolder.append(cardCol);
            }

            apiCounter++;

            if (apiCounter < apiInfo.length) {
              printCards(apiInfo[apiCounter].name, apiInfo[apiCounter].placement);
            }
          });
        }

        printCards(apiInfo[apiCounter].name, apiInfo[apiCounter].placement);

        var queryURL2 = "https://www.googleapis.com/youtube/v3/playlists?channelId=UC7bX_RrH3zbdp5V4j5umGgw&key=AIzaSyD5gZvasVNbDmW7Pv1IP6_Q_rPPCvEDriI&part=snippet,contentDetails";

        var queryURL2 = "https://www.googleapis.com/youtube/v3/playlists?id=PL-mzrQ96YAORBhi7iNU6Bu_Q5kbchMz0R&key=AIzaSyD5gZvasVNbDmW7Pv1IP6_Q_rPPCvEDriI&part=snippet,contentDetails";

        $.ajax({
          url: queryURL2,
          method: "GET"
        }).then(function (youTube) {
          console.log(youTube);
        });

      });