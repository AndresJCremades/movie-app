// My Application
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


$('#movieSearchForm').on('submit', function () {
  var movieTitle = $('#movieSearchForm input').val();

  $.getJSON('spiderman-api-call.json').success(function(response, movieTitle){
    var movieListData =  response.movies;
    var movieList = movieListData.map(function (movieItem) {

    console.log('HOLA!');
      if(movieItem.title === movieTitle)
        return itemHtml(movieItem.posters.thumbnail, movieItem.title);
    });

    $('#resultList').get(0).innerHTML = [
      '<ul>',
        movieList.join(''),
      '</ul>'
    ].join('');
  });
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

  console.log('HALLO!');
};


// Request API
//
$.getJSON('spiderman-api-call.json').success(myApp);
