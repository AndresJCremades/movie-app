
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


var itemHtml = function (thumbnailSrc, title) {
  return [
    '<li>',
    '   <p>',
    '     <a class="movie" href="javascript:void(0);">',
            title,
          '</a>',
    '   </p>',
    '   <img src="',
          thumbnailSrc,
    '   ">',
    '</li>'
  ].join('');
};

var casting = function (item) {
  return [
  '<li> ',
    item.characters[0],
  ' : ',
    item.name,
  '</li>'
    ].join('');
};


var detailsHtml = function (movie){

  var castList = movie.abridged_cast.map(function (castItem) {
      casting(castItem);
  });

  return [
    '<div class=#details>',
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


$(document.body).on('click','.movie', function () {
  var movieTitle = $(this).text();

  requestApi(movieTitle, function(response) { myApp2(response, movieTitle); });
});


var myApp2 = function (response, movieTitle) {
  var movie =  response.movies[0];
  var movieItem = detailsHtml(movie);

  $('#resultList').get(0).innerHTML = [
    movieItem
    ];

};

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


