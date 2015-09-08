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

        .when('/profile', {
          templateUrl: 'templates/profile.html'
          // controller: 'ProfileCtrl' 
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

  .controller('SearchCtrl', ['$scope', '$http', function ($scope, $http){
      $scope.searchMovie = function () {
        console.log($scope.title);

        var title = $scope.title;
        $scope.title = '';
        var trailerUrl =  '/api/movietrailers';
        var url = 'http://www.omdbapi.com/?type=movie&tomatoes=true&plot=full&t=' + title;
        $http.get(url)
          .then(function (response) {
            console.log("HI");
            $scope.movie = response.data;
            console.log("HELLLLLLLLLLLLL", response.data);

          })


        $http.post(trailerUrl, {trailer: title})
          .then(function (response) {
            console.log(response);
            var trailer = response.data
            console.log("HELLLOOO", trailer)
            // $scope.trailer = response.data.trailers.trailer[0].embed[0];
            //var $scope.trailers = 
            // $scope.movie = response.data;
          })
      };
  }])

  .controller('ShowMovieCtrl', ['$scope', function ($scope){
    $scope.myInterval = 2000;
    $scope.slides = [
    {
      image: 'http://screenrant.com/wp-content/uploads/Mad-Max-4-Fury-Road-Reviews.jpg'
    },
    {
      image: 'http://cdn.entertainmentfuse.com/media/2014/12/the-lord-of-the-rings-the-fellowship.jpg'
    },
    {
      image: 'http://www.artofvfx.com/TWILIGHT5/TWILIGHT5_TIPPETT_VFX_10.jpg'
    },
  ];
}])

  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
              
     
  }]);



