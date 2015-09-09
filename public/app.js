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
        .when('/sign-up', {
          templateUrl: 'templates/sign_up.html',
          controller: 'SignUpCtrl' 
        })

        .when('/login', {
          templateUrl: 'templates/login.html',
          controller: 'LogInCtrl' 
        })
        
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
      });
    }])

  .controller('SignUpCtrl', function ($rootScope, $scope, User, $location, Auth) {
   $scope.signup = function() {
     console.log($scope.user)
     console.log('signing up')
     $scope.user = {
       username: '',
       email: '',
       DOB: '',
       password: ''
     }
     $scope.postreq = function(user) {
       $http({
         method: 'post',
         url: '/sign-up',
         data:{
           user_username:user.username,
           user_email:user.email,
           user_DOB: user.DOB,
           user_password:user.password
         }
       }).success(function(data) {
         console.log("User posted to database")
       })
     }
         $rootScope.$broadcast('signup'); // TELL THE OTHER CONTROLLERS WE'RE LOGGED IN
         $location.path('/');
       },
       function (data) {
         var message = "Invalid Email or Password"
         console.log(message)
       }
 }) 

   .controller('LoginCtrl', function ($rootScope, $scope, User, $location, Auth) {
   $scope.user = {};
   $scope.login = function() {
     console.log($scope.user)
     console.log('logging in')
     User.login({}, $scope.user,
       function (data) {
         console.log(data.token)
         localStorage.setItem("jwtToken", data.token);
         $rootScope.$broadcast('loggedIn'); // TELL THE OTHER CONTROLLERS WE'RE LOGGED IN
         $location.path('/');
       },
       function (data) {
         var message = "Invalid Email or Password"
         console.log(message)
       }
     );
   };
 })

  .controller('SearchCtrl', ['$scope', '$http', '$sce', function ($scope, $http, $sce){
    $scope.searchMovie = function () {
      console.log($scope.title);
      var url = 'http://www.omdbapi.com/?type=movie&tomatoes=true&plot=full&t=' + $scope.title;;
      $http.get(url)
        .then(function (response) {
          console.log(response);
          //var $scope.trailers = 
          $scope.movie = response.data;

          $http.post('/api/movietrailers', { trailer: $scope.movie.Title })
            .then(function (response) {
              console.log(response);
              // var rawString = response.data.trailers.trailer[0].embed[0];
              console.log(response.data.trailers.trailer[0].embed[0])
              $scope.trailer = $sce.trustAsHtml(response.data.trailers.trailer[0].embed[0]);
              console.log("HELLLOOO", $scope.trailer)
              $scope.title = '';
              //var $scope.trailers = 
              // $scope.movie = response.data;
            }
          )
        }
      )
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

  .controller('MainCtrl', ['$rootScope', '$scope', '$location', 'Auth', '$http', function ($rootScope, $scope, $location, Auth, $http) {
      $scope.logout = function() {
      localStorage.removeItem('jwtToken');
      $location.path('/login')
      $scope.isLoggedIn = false;
    }

    // CHECK IF LOGGED IN (IF JWT TOKEN PRESENT)
    $scope.isLoggedIn = Auth.isLoggedIn();

    // ON LOGIN UPDATE NAVBAR
    $rootScope.$on('loggedIn', function () {
      $scope.isLoggedIn = true
    })
  }])
     
  // }]);



