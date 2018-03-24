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
      name: "guacamole",
      placement: "#guac-card-holder"
    },
    {
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
  ];

  var apiCounter = 0;

  function printCards(searchTerm, destination) {
    var queryURL = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=37a0ea27&app_key=bc7804ad0a82ffd292c9b2f97619876b&from=0&to=3";
    //edamam API call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);

      for (var i = 0; i < response.hits.length; i++) {
        // console.log(response.hits[i])
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
        a.attr("target", "_blank");
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


  //Pinterest API call
  var queryURL2 = "https://api.pinterest.com/v1/boards/eventprep/fiesta-themed-event/pins/?access_token=AVLO9DT26n5QIo51b82JWrmEjD1UFR1gVsDvElxEyV7qa4AvwAAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cboard%2Cimage&limit=3";


  $.ajax({
    url: queryURL2,
    method: "GET"
  }).then(function (pinterest) {
    console.log(pinterest);

    var results = pinterest.data;

    for (var i = 0; i < results.length; i++) {
      var cardHolder = $("#party-ideas")
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
      cardTitle.html(results[i].note)
      cardContent.prepend(cardTitle);

      var partyLink = $('<div>');
      partyLink.addClass("card-action center-align");

      var a = $("<a>");
      a.attr("href", results[i].link);
      a.attr("target", "_blank");
      a.html("Get Ideas");

      partyLink.append(a);
      cardContent.append(partyLink);
      card.append(cardContent);
      cardCol.append(card);
      cardHolder.append(cardCol);
    }
  });


  //firebase
  var config = {
    apiKey: "AIzaSyDXjvCeNcd0deU_LCHEnLq80jQsFavW_ng",
    authDomain: "letstacoboutit01.firebaseapp.com",
    databaseURL: "https://letstacoboutit01.firebaseio.com",
    projectId: "letstacoboutit01",
    storageBucket: "letstacoboutit01.appspot.com",
    messagingSenderId: "458312732124"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database
  var database = firebase.database();

  var name = "";
  var email = "";
  var comment = "";

  $("#submit-form").on("click", function () {
    event.preventDefault();
    // Grabbed values from text boxes
    name = $("#name-input").find("input").val().trim();
    email = $("#email-input").find("input").val().trim();
    comment = $("#comment-input").find("textarea").val().trim();

    console.log(name, email, comment);

    // Change what is saved in firebase
    database.ref().set({
      name: name,
      email: email,
      comment: comment
  
    });

    name = $("#name-input").find("input").val("");
    email = $("#email-input").find("input").val("");
    comment = $("#comment-input").find("textarea").val("");
  });

 
});