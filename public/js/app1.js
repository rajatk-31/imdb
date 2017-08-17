const app = angular.module('imdbapp', ['ngRoute', 'ngMessages']);

app.run(function($rootScope) {
    alert("we are the champion")

});

app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
        templateUrl: "views/pagelayout.html",
        controller: "actrl"
    });
    $routeProvider.when("/registration", {
        templateUrl: "views/UserRegistration.html",
        controller: "bctrl"
    });
    $routeProvider.when("/coverPage", {
        templateUrl: "views/coverPage.html",
        controller: "dctrl"
    });
    $routeProvider.when("/otherInformation", {
        templateUrl: "views/otherInf.html",
        controller: "cctrl"
    }).when('/actors', {
        templateUrl: 'views/actors/actors.html',
        controller: 'ActorsController'
    }).when('/addactor', {
        templateUrl: 'views/actors/actor-form.html',
        controller: 'ActorFormController'
    }).when('/editactor', {
        templateUrl: 'views/actors/actor-form.html',
        controller: 'ActorEditController'
    }).when('/addmovie', {
        templateUrl: 'views/movies/movie-form.html',
        controller: 'MovieFormController'
    }).when('/movies', {
        templateUrl: 'views/movies/movies.html',
        controller: 'MoviesController'
    }).when('/login', {
        templateUrl: 'views/UserLogin.html',
        controller: 'LoginController'
    });


    // otherwise({
    //  redirect: '/'
    // });
    $locationProvider.html5Mode(true);
});


app.controller('LoginController', function($http, $scope) {
    console.log("Login Page");
});

app.controller('ActorsController', function($http, $scope) {
    $scope.refresh = function() {
        $http({
            url: 'api/actor/all'
        }).then(function(response) {
            $scope.actors = response.data.actors;
            console.log ($rootScope.actors)
        }, function(response) {

        });
    }
    $scope.refresh();
    $scope.deleteActor = function(actor) {
        if (confirm('Are you sure!')) {
            $http({
                url: 'api/actor/' + actor._id,
                method: 'DELETE'
            }).then(function(response) {
                $scope.refresh();
                alert('Successfully deleted Actor');


            }, function(response) {
                alert('Something went wrong');
                console.log(response)
            });
        }

    }

});

app.controller('MoviesController', function($http, $scope) {
    $scope.refresh = function() {
        $http({
            url: 'api/movie/all'
        }).then(function(response) {
            $scope.movies = response.data.movies;
        }, function(response) {

        });
    }
    $scope.refresh();
    $scope.deleteMovie = function(movie) {
        if (confirm('Are you sure!')) {
            $http({
                url: 'api/movie/' + movie._id,
                method: 'DELETE'
            }).then(function(response) {
                $scope.refresh();
                alert('Successfully deleted movie');


            }, function(response) {
                alert('Something went wrong');
                console.log(response)
            });
        }

    }

});


app.controller('ActorFormController', function($http, $scope, $location) {
    $scope.submitForm = function() {
        var form = new FormData();
        form.append('photo', $scope.actor.photo);
        form.append('name', $scope.actor.name);
        form.append('dob', $scope.actor.dob);
        $http({
            url: 'api/actor',
            method: 'POST',
            data: form,
            headers: {
                'content-type': undefined
            }
        }).then(function(response) {
            if (response.data.status) {
                alert('Successfully added Actor');
                $location.path('/actors');
            } else {
                alert('Something went wrong');
            }
        }, function(response) {
            alert('Something went wrong');
            console.log(response)
        })
    }
});
app.controller('ActorEditController', function($http, $scope, $location) {
    $scope.editActor = function(actor) {
        $scope.actor = actor;
        form.append('photo', $scope.actor.photo);
        form.append('name', $scope.actor.name);
        form.append('dob', $scope.actor.dob);
        $http({
            url: 'api/actor/:id',
            method: 'POST',
            data: form,
            headers: {
                'content-type': undefined
            }
        }).then(function(response) {
            if (response.data.status) {
                alert('Successfully Updated Actor');
                $location.path('/actors');
            } else {
                alert('Something went wrong');
            }
        }, function(response) {
            alert('Something went wrong');
            console.log(response)
        })
    }
});
app.controller("actrl", function($scope) {
    alert("first page called");

});
app.controller("bctrl", function($scope, $http) {
    alert("second page called");

});

app.controller("cctrl", function($scope) {
    alert("third page called");

});
app.controller("dctrl", function($scope) {
    alert("first page called again");

});

app.controller("formController", function($scope) {
    $scope.submitForm = function() {
        console.log($scope.contact);
    }

})

app.controller('MovieFormController', function($http, $scope, $location, $rootScope) {
    $scope.refresh = function() {
        $http({
            url: 'api/actor/all'
        }).then(function(response) {
            $scope.actors = response.data.actors;
            console.log ($scope.actors)
        }, function(response) {

        });
    }
    $scope.refresh ()
    $scope.submitMovieForm = function() {
        console.log($scope.actor_id)
        var form = new FormData();
        form.append('poster', $scope.movie.poster);
        form.append('title', $scope.movie.title);
        form.append('release_date', $scope.movie.release_date);
        form.append('director', $scope.movie.director);
        form.append('runtime', $scope.movie.runtime);
        form.append('plot', $scope.movie.plot);
        $scope.actor_id.forEach(function(actor){
            form.append('actors', actor);
        })
        
        $http({
            url: 'api/movie',
            method: 'POST',
            data: form,
            headers: {
                'content-type': undefined
            }
        }).then(function(response) {
            console.log (response.data);
            if (response.data.status) {
                
                alert('Successfully added movie');
                $location.path('/movies');
            } else {
                alert('Something went wrong');
            }
        }, function(response) {
            alert('Something went wrong');
            console.log(response)
        })
    }

});


app.directive('fileModel', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
});