
var apiUrl = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=j23zuzdpapq9ny3watvc9kja';
var requestApi = function (query, callback) {

  // Request API
  //
  $.ajax({
    url: apiUrl,
    data: {
      q: query
    },
    dataType: 'jsonp'
  }).success(callback);

}
// My Application
//
//
//
var itemHtml = function (thumbnailSrc, title) {
  return [
    '<li>',
    '   <p>',
          title,
    '   </p>',
    '   <img src="',
          thumbnailSrc,
    '   ">',
    '</li>'
  ].join('');
};

var detailsHtml = function (title, imgSrc, detailList){
  return [
    '<div id=#details>',
    '   <h3>',
          title,
    '   </h3>',
    '   <img src="',
          imgSrc,
    '   ">',
    '   <ul>',
          detailsList.join(''),
    '   </ul>',
    '</div>'
  ].join('');
};

$('#movieDetail').on('click', function (event) {});

$('#movieSearchForm').on('submit', function (event) {
  event.preventDefault();

  var movieTitle = $('#movieSearchForm input').val();


  requestApi(movieTitle, myApp);

});

var myApp = function (response) {
  var movieListData = response.movies;

  var movieList = movieListData.map(function (movieItem) {
    return itemHtml(movieItem.posters.thumbnail, movieItem.title);
  });

  $('#movieList').get(0).innerHTML = [
    '<ul>',
        movieList.join(''),
      '</ul>'
  ].join('');

};


