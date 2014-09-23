              
var apiUrl = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';


var requestApi = function (data, callback) {
  // Request API
  //
  var params = $.extend({
    apikey: 'j23zuzdpapq9ny3watvc9kja'
  }, data);

  var settings = {
    url: apiUrl,
    data: params,
    dataType: 'jsonp'
  };

  // debug
  console.debug(settings);
  $.ajax(settings).success(callback);

};


var itemHtml = function (thumbnailSrc, title, detailUrl) {
  return [
    '<li',
    ' class="movie"',
    ' data-detail-request="' + detailUrl + '"',
    '>',
    '   <p>',
        title,
    '   </p>',
    '   <img src="',
          thumbnailSrc,
    '   ">',
    '</li>'
  ].join('');
};

var castingItem = function (item) {
  if(item.characters && item.characters.length > 0) {
    return [
      '<li>',
      item.name,
      ' : ',
      item.characters[0],
      '</li>'
    ].join('');
  }
};

var detailsHtml = function (movie){

  var castList = movie.abridged_cast.map( function (item) {
    return castingItem(item);
  });

  return [
    '<div class="details">',
    '   <h3>',
          movie.title,
    '   </h3>',
    '   <img src="',
          movie.posters.thumbnail,
    '   ">',
    '   <ul>',
    '     <li> Title: ',
          movie.title,
    '     </li>',
    '     <li> ID: ',
          movie.id,
    '     </li>',
    '     <li> Year: ',
          movie.year,
    '     </li>',
    '     <li> MPAA Rating: ',
          movie.mpaa_rating,
    '     </li>',
    '     <li> Duration: ',
            movie.runtime,
    ' min.</li>',
    '     <li> Release dates:',
    '       <ul>',
    '         <li> Theater: ',
          movie.release_dates.theater,
    '         </li>',
    '         <li> DVD: ',
          movie.release_dates.dvd,
    '         </li>',
    '       </ul>',
    '     </li>',
    '     <li> Ratings:',
    '       <ul>',
    '         <li> Critics rating: ', movie.ratings.critics_rating, ' / Critics score: ', movie.ratings.critics_score,
    '         </li>',
    '         <li> Audience rating: ', movie.ratings.audience_rating, ' / Audience score: ', movie.ratings.audience_score,
    '         </li>',
    '       </ul>',
    '     </li>',
    '     <li> Cast:',
    '       <ul>',
            castList.join(''),
    '       </ul>',
    '     </li>',
    '   </ul>',
    '</div>'
  ].join('');
};

$(document.body).on('click', '.movie', function (event) {
  event.preventDefault();

  console.log($(this).data('detailRequest'));
});


var myApp2 = function (response) {
  var movie =  response.movies[0];
  var movieItem = detailsHtml(movie);

  $('#resultList').get(0).innerHTML = [
    movieItem
  ];

};

$('#movieSearchForm').on('submit', function (event) {
  event.preventDefault();
  $('#resultList').load('main.js #resultList');

  var movieTitle = $('#movieSearchForm input').val();

  requestApi({ q: movieTitle  }, myApp);
});


var myApp = function (response) {
  var movieListData = response.movies;
  var movieList = movieListData.map(function (movieItem) {
    return itemHtml(movieItem.posters.thumbnail, movieItem.title, movieItem.links.self);
  });

  $('#movieList').get(0).innerHTML = [
    '<ul>',
        movieList.join(''),
      '</ul>'
  ].join('');

};


