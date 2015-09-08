angular.module('cinescape', ['ui.bootstrap', 'ngRoute'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider){
      $routeProvider
        .when('/', {
          templateUrl: 'templates/show_movie.html',
          controller: 'ShowMovieCtrl' 
        })
      
        .when('/search', {
          templateUrl: 'templates/search.html',
          controller: 'SearchCtrl' 
        })
        
        // .when('/log-in', {
        //   templateUrl: 'templates/log-in.html',
        //   controller: 'LoginCtrl' 
        // })
        // .when('/profile', {
        //   templateUrl: 'templates/profile.html',
        //   controller: 'ProfileCtrl' 
        // })
        
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
      });
    }])

  .controller('ShowMovieCtrl', ['$scope', function ($scope){
    $scope.myInterval = 2000;
    $scope.slides = [
    {
      image: 'http://media4.onsugar.com/files/2014/02/07/741/n/1922283/4d41ec0f319c3b81_say-anything-1040cs022412.jpg.xxxlarge/i/15-Most-Romantic-Movie-Scenes.jpg'
    },
    {
      image: 'http://screenrant.com/wp-content/uploads/Mad-Max-4-Fury-Road-Reviews.jpg'
    },
    {
      image: 'http://cdn.theatlantic.com/static/mt/assets/culture_test/han%20anhBANNER1.jpg'
    },
    {
      image: 'http://cdn.entertainmentfuse.com/media/2014/12/the-lord-of-the-rings-the-fellowship.jpg'
    },
    {
      image: 'http://pansypanda.com/wp-content/uploads/2014/05/pulp-fiction.jpg'
    },
    {
      image: 'https://usatlife.files.wordpress.com/2014/12/joker-heath-ledger.jpg?w=1000&h=638'
    },
    {
      image: 'http://www.alfavita.gr/sites/default/files/iconic-movie-images-30-pics_18.jpg'
    },
    {
      image: 'http://s3.media.squarespace.com/production/465215/5307116/wp-content/uploads/2009/11/Iconic-ET.jpg'
    },
    {
      image: 'http://i.onionstatic.com/clickhole/295/16x9/960.jpg'
    },
    {
      image: 'http://www.hollywoodreporter.com/sites/default/files/imagecache/675x380/2014/11/the_hunger_games_mockingjay_part_1_still_8.jpg'
    },
    {
      image: 'http://www.artofvfx.com/TWILIGHT5/TWILIGHT5_TIPPETT_VFX_10.jpg'
    },
  ];
}])

  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
              
      $scope.searchMovie = function () {
        console.log($scope.title);

        var title = $scope.title;
        $scope.title = '';
        var trailerUrl =  '/api/movietrailers';
        var url = 'http://www.omdbapi.com/?type=movie&tomatoes=true&plot=full&t=' + title;
        $http.get(url)
          .then(function (response) {
            console.log(response);
            //var $scope.trailers = 
            $scope.movie = response.data;
          })


        $http.post(trailerUrl, {trailer: title})
          .then(function (response) {
            console.log(response);
            $scope.trailer = response.data;
            //var $scope.trailers = 
            // $scope.movie = response.data;
          })
      }; 
  }]);



