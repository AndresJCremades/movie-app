/* key = my Rotten Tomatoes api key which grant me 
   to access the information 
*/
var key = ;

/* The base URI to access all resources 
*/
var apiUrl = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';

/* FUNCTION: requestApi
   - Purpose: build a valid request api  
*/
var requestApi = function (data, callback) {

/* Request params which are to be added to the apiUri */
  var params = $.extend({
    apikey: 'j23zuzdpapq9ny3watvc9kja'
  }, data);


  var settings = {
    url: apiUrl,
    data: params,
    dataType: 'jsonp'
  };

  $.ajax(settings).success(callback);
};

/* FUNCTION: itemHtml 
   - Purpose: build a HTML item
*/

var itemHtml = function (originalSrc, title, detailUrl) {
  return [
    '<tr',
    ' class="movie"',
    ' data-detail-request="' + detailUrl + '"',
    '>',
    '<td>',
    '   <img src="',
          originalSrc,
    '   ">',
    '</td>',
    '<td>',
    '   <p>',
        title,
    '   </p>',
    '<td>',
    '</tr>'
  ].join('');
};

$(document.body).on('click', '#close', function () {

});

$(document.body).on('click', '.movie', function (event) {
  event.preventDefault();

  var movieTitle = $(this).text();
  var detailRequest = $(this).data('detailRequest');
  requestApi( { q : movieTitle }, function(response) { myApp2(response,
      detailRequest);});
});



$('#movieSearchForm').on('submit', function (event) {

  event.preventDefault();

  $('#resultList').load('main.js #resultList');

  var movieTitle = $('#movieSearchForm input').val();

  requestApi({ q: movieTitle }, myApp);
});


var myApp = function (response) {
  console.log("--> entrando en myApp");
  var movieListData = response.movies;
  var movieList = movieListData.map(function (movieItem) {
    return itemHtml(movieItem.posters.original, movieItem.title,
      movieItem.links.self);
  });

  $('#movieList').get(0).innerHTML = [
    '<table>',
        movieList.join(''),
      '</table>'
  ].join('');

};


