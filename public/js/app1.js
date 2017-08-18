const app = angular.module('imdbapp', ['ngRoute', 'ngMessages']);

app.run(function($rootScope, $http, $routeParams, $location) {
    alert("we are the champion")
    $rootScope.refresh = function() {
        $http({
            url: 'api/actor/all'
        }).then(function(response) {
            $rootScope.actors = response.data.actors;
            console.log($rootScope.actors)
        }, function(response) {

        });
    }
    $rootScope.refresh();
    $rootScope.getActor = function(id) {
        $http({
            url: 'api/actor/' + id,
            method: 'GET'
        }).then(function(response) {
            $rootScope.actor = response.data;
            $rootScope.actor._id = response.data.actors._id;
            $rootScope.getmovie = function() {
                $http({
                    url: 'api/actor/actor/' + $rootScope.actor._id,
                    method: 'GET'
                }).then(function(response) {
                    $rootScope.movies = response.data.actors;
                    console.log($rootScope.movies)
                }, function(response) {
                    alert("Something Went wrong");
                });
            }

            $rootScope.getmovie()


            console.log($rootScope.actor)
        }, function(response) {
            alert("Something Went wrong");
        });


            $location.path('/actorbio');
    }

    // $rootScope.getActor = function (_id) {

    // }

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
    }).when('/actorbio', {
        templateUrl: 'views/actors/actorbio.html',
        controller: 'actorBioController'
    }).when('/moviedetails', {
        templateUrl: 'views/movies/movieview.html',
        controller: 'moviedetailcontroller'
    });


    // otherwise({
    //  redirect: '/'
    // });
    $locationProvider.html5Mode(true);
});


app.controller('LoginController', function($http, $scope) {
    console.log("Login Page");
});

app.controller('moviedetailcontroller', function($http, $scope, $location, $rootScope) {
    console.log("movie detail page");
    $scope.view=function(id){
        $rootScope.getActor(id);
    }
});

app.controller('ActorsController', function($http, $scope) {
    $scope.refresh = function() {
        $http({
            url: 'api/actor/all'
        }).then(function(response) {
            $scope.actors = response.data.actors;
            console.log($rootScope.actors)
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

});

app.controller("actorBioController", function($http, $scope, $location, $rootScope, $routeParams) {
    alert("actor bio page called");
    $scope.view=function(movie){
        $rootScope.act=[];
        $http({
            url: 'api/movie/'+movie._id
        }).then(function(response){
            $rootScope.mov = response.data;
            console.log($rootScope.mov)
        },function(response){
            console.log("error")
        });
        movie.actors.forEach(function(id){
        $http({
            url: 'api/actor/'+id
        }).then(function(response){
            $rootScope.act.push(response.data);
            console.log($rootScope.act)
        },function(response){
            console.log("error")
        })
    })
        $location.path('/moviedetails');
    }
    
    // $rootScope.getActor = function(id) {
    //     $http({
    //         url: 'api/actor/' + id,
    //         method: 'GET'
    //     }).then(function(response) {
    //         $scope.actors = response.data.actors;
    //         console.log($rootScope.actors)
    //     }, function(response) {
    //         alert("Something Went wrong");
    //     });
    //     $http({
    //         url: 'api/actor/actor/' + id,
    //         method: 'GET'
    //     }).then(function(response) {
    //         $scope.actors.movie = response.data.actors;
    //         console.log($rootScope.actors)
    //     }, function(response) {
    //         alert("Something Went wrong");
    //     });
    // }
});

app.controller('MovieFormController', function($http, $scope, $location, $rootScope) {
    $scope.refresh = function() {
        $http({
            url: 'api/actor/all'
        }).then(function(response) {
            $scope.actors = response.data.actors;
            console.log($scope.actors)
        }, function(response) {

        });
    }
    $scope.refresh()
    $scope.submitMovieForm = function() {
        console.log($scope.actor_id)
        var form = new FormData();
        form.append('poster', $scope.movie.poster);
        form.append('title', $scope.movie.title);
        form.append('release_date', $scope.movie.release_date);
        form.append('director', $scope.movie.director);
        form.append('runtime', $scope.movie.runtime);
        form.append('plot', $scope.movie.plot);
        $scope.actor_id.forEach(function(actor) {
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
            console.log(response.data);
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