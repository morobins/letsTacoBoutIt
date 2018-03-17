$(document).ready(function(){
  var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30,
    // autoplay: 5000,
    autoplayDisableOnInteraction: false,
    loop: true,
    autoHeight: true
  });

var queryURL = "https://api.edamam.com/search?q=margarita&app_id=e4a1878b&app_key=0e63bfc5291dfe20fad787020026c8ad&from=0&to=2";


		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function(response) {

      console.log(response);
      
      $.each(response.hits, function (key, data) {
        //Loop to write all card element with json. (i is index for card in json.)
        console.log(data);
        $('#margarita-card-holder').append('<div class="col s4" >');
        $('#margarita-card-holder').append('<div class="card blue-grey darken-1">');
        //Card Content
        $('#margarita-card-holder').append('<div class="card-content white-text">');
        //Card Title
        $('#margarita-card-holder').append('<span class="card-title">' + response.hits[i].recipe.label + '</span>');
        //Card Subtitle
        $('#margarita-card-holder').append('<p>' + response.hits[i].recipe.source + '</p>');
    
    });
      // $("#margarita-card-title").html(response.hits[i].recipe.label);
      
      // = $("<div>");
      // margaritaCards.addClass("col s4");

      
			// $("#margarita-source").text("This recipe is from " + response.hits[0].recipe.source);

		});

		var queryURL2 = "https://www.googleapis.com/youtube/v3/playlists?channelId=UC7bX_RrH3zbdp5V4j5umGgw&key=AIzaSyD5gZvasVNbDmW7Pv1IP6_Q_rPPCvEDriI&part=snippet,contentDetails";


		$.ajax({
			url: queryURL2,
			method: "GET"
		}).then(function(youTube) {

			console.log(youTube);

    });
    
  });