var key = ;
var apiUrl = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';
var requestApi = function (data, callback) {

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



var createLi = function (field, value) {
  //Uppercase
  var fieldUc, valueR;
  if ( field !== undefined ) {
    fieldUc = field.substring(0,1).toUpperCase() +
    field.substring(1, field.length);
    if( field === 'runtime') {
      valueR = [value, ' min.'].join('');
    } else {
      valueR = value;
    }

    return [
      '<li>',
      '<span>',
      fieldUc,
      '</span>',
      ' : ',
      valueR,
      '</li>'
        ].join('');
  }
};

var findKey = function (obj, value) {

  var key;
  var i = 0;
  var keys = Object.keys(obj);
  if ( value !== undefined ) {
    while(obj[keys[i]] !== value && i < keys.length) {
      i++;
    }

    return keys[i];
  }
};

var createLiList = function(item, valuesList) {
  var list = valuesList.map( function(itemValue ) {
    return createLi(findKey(item, itemValue), itemValue);
  });

  return list.join('');
};

var casting = function (castingList) {
  var resultList;
  if( castingList && castingList.length > 0) {
    resultList = castingList.map( function (item) {
      if (item.characters === undefined) {
        return [
          '<li><span>',
              item.name,
              '</span>',
          '</li>'
          ].join('');
      } else {
        return [
          '<li><span>',
              item.name,
          ': </span>',
              item.characters,
          '</li>'
        ].join('');
      }
    });

    return [
      '<li><span>Cast :</span>',
        '<ul>',
          resultList.join(''),
        '</ul>',
      '</li>',
        ].join('');
  }
};

var detailsHtml = function ( movie ) {

  return [
    '<img id="close" src="images/close.jpg">',
    '<div id="details">',
    '   <ul>',
          createLiList(movie, [movie.year,
              movie.mpaa_rating, movie.runtime]),
    '     <li> <span>Release dates:</span>',
    '       <ul>',
          createLiList(movie.release_dates, [movie.release_dates.theater,
              movie.release_dates.dvd]),
    '       </ul>',
    '     </li>',
    '     <li> <span>Ratings:</span>',
    '       <ul>',
    '         <li> <span>Critics:</span> ',
    '           <ul>',
          createLiList(movie.ratings, [ movie.ratings.critics_rating,
            movie.ratings.critics_score ]),
    '          </ul>',
    '         </li>',
    '         <li> <span>Audience: </span>',
    '           <ul>',
          createLiList(movie.ratings, [ movie.ratings.audience_rating,
            movie.ratings.audience_score]),
    '           </ul>',
    '         </li>',
    '       </ul>',
    '     </li>',
           casting(movie.abridged_cast),
    '   </ul>',
    '</div>'
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


var myApp2 = function (response, detailRequest) {

  var search = 'li[data-detail-request="'+detailRequest+'"]';
  var movieDataList = response.movies;
  var movie = movieDataList.map( function(movieItem) {
    if(movieItem.links.self == detailRequest) {
      return detailsHtml(movieItem);
    }
  });

  if( $('#details')) {
    $('#details').remove();
  }

  $('#containerDetails').get(0).innerHTML = [
        movie.join('')
  ].join('');

};

$('#movieSearchForm').on('submit', function (event) {
  event.preventDefault();

  $('#resultList').load('main.js #resultList');

  var movieTitle = $('#movieSearchForm input').val();

  requestApi({ q: movieTitle }, myApp);
});


var myApp = function (response) {
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


