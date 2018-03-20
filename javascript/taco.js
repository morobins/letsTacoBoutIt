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
      debugger;
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


  // var queryURL2 = "https://www.googleapis.com/youtube/v3/playlists?id=PL-mzrQ96YAORBhi7iNU6Bu_Q5kbchMz0R&key=AIzaSyD5gZvasVNbDmW7Pv1IP6_Q_rPPCvEDriI&part=snippet,contentDetails";

  // $.ajax({
  //   url: queryURL2,
  //   method: "GET"
  // }).then(function (youTube) {
  //   console.log(youTube);
  // });

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

  // database.ref().on("child_added", function (childSnapshot) {

  //   var name = childSnapshot.val().name;
  //   var email = childSnapshot.val().email;
  //   var comment = childSnapshot.val().comment;



  //   var tbody = $('#comment-data')
  //   var tr = $("<tr>");
  //   var tdName = $("<td>").text(name);
  //   var tdEmail = $("<td>").text(email);
  //   var tdComment = $("<td>").text(comment);

  //   tr.append(tdName, tdEmail, tdComment);

  //   tbody.append(tr);

  // Handle the errors
  // }, function (errorObject) {
  //   console.log("Errors handled: " + errorObject.code);
});