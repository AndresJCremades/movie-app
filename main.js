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
  var query = 'asdasd';

  alert('submitting');
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


// Request API
//
$.getJSON('spiderman-api-call.json').success(myApp);
