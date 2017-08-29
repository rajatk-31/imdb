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
        $rootScope.flag = 1;
    }

    $rootScope.getMovie = function(id) {
        $rootScope.act = [];
        $http({
            url: 'api/movie/' + id
        }).then(function(response) {
            $rootScope.mov = response.data;
            console.log($rootScope.mov)
        }, function(response) {
            console.log("error")
        });
        setTimeout(function() {
            $rootScope.mov.actors.actors.forEach(function(id) {
                $http({
                    url: 'api/actor/' + id
                }).then(function(response) {
                    $rootScope.act.push(response.data);
                    console.log($rootScope.act)
                }, function(response) {
                    console.log("error")
                })
            })
            $location.path('/moviedetails');
        }, 10);
    }




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
    $scope.view = function(id) {
        $rootScope.getActor(id);
    }
});

app.controller('ActorsController', function($http, $scope, $rootScope, $location) {
    $scope.refresh = function() {
        $http({
            url: 'api/actor/all'
        }).then(function(response) {
            $scope.actors = response.data.actors;
            console.log($scope.actors)
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
    $scope.editActor = function(actor) {
        $rootScope.flag = 2;
        $rootScope.aid = actor._id;

        $rootScope.a = actor;
        console.log($rootScope.aid);
        console.log($rootScope.a)
        $location.path('/addactor');

    }

});

app.controller('MoviesController', function($http, $scope, $rootScope, $location) {
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
    $scope.editMovie = function(movie) {
        $rootScope.flag = 2;
        $rootScope.mid = movie._id;

        $rootScope.m = movie;
        console.log($rootScope.mid);
        console.log($rootScope.m)
        $location.path('/addmovie');
    }

});



app.controller('ActorFormController', function($http, $scope, $location, $rootScope) {


    $scope.submitForm = function() {
        var form = new FormData();
        form.append('photo', $scope.actor.photo);
        form.append('name', $scope.actor.name);
        form.append('bio', $scope.actor.bio);
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

    $scope.actor = $rootScope.a;

    $scope.submit = function() {

        console.log($scope.actor);
        var form = new FormData();
        form.append('photo', $scope.actor.photo);
        form.append('name', $scope.actor.name);
        form.append('dob', $scope.actor.dob);
        form.append('bio', $scope.actor.bio);
        $http({
            url: 'api/actor/edit/' + $rootScope.aid,
            method: 'POST',
            data: form,
            headers: {
                'content-type': undefined
            }
        }).then(function(response) {
            if (response.data.status) {
                alert('Successfully Updated Actor');
                console.log(response);
                $location.path('/actors');
            } else {
                alert('Something went wrong here');
            }
        }, function(response) {
            alert('Something went wrong 2here');
            console.log(response)
        });
        $rootScope.flag = 1;
    }



});

app.controller('ActorEditController', function($http, $scope, $location) {

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
    $scope.view = function(movie) {
        $rootScope.act = [];
        $http({
            url: 'api/movie/' + movie._id
        }).then(function(response) {
            $rootScope.mov = response.data;
            console.log($rootScope.mov)
        }, function(response) {
            console.log("error")
        });
        movie.actors.forEach(function(id) {
            $http({
                url: 'api/actor/' + id
            }).then(function(response) {
                $rootScope.act.push(response.data);
                console.log($rootScope.act)
            }, function(response) {
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

    $scope.movie = $rootScope.m;

    $scope.submitmovie = function() {

        console.log($scope.movie);
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
            url: 'api/movie/edit/' + $rootScope.mid,
            method: 'POST',
            data: form,
            headers: {
                'content-type': undefined
            }
        }).then(function(response) {
            if (response.data.status) {
                alert('Successfully Updated Actor');
                console.log(response);
                $location.path('/movies');
            } else {
                alert('Something went wrong here');
            }
        }, function(response) {
            alert('Something went wrong 2here');
            console.log(response)
        });
        $rootScope.flag = 1;
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
// app.directive ("myDir", function () {
//     return {
//         restrict: 'A',
//         template: "<span>mayank</span>",
//         link : function (scope, element, attrs) {
//             element.css({'font-size':'10px'});
//             console.log ("link is called")

//         },
//         controller : function ($element) {
//             console.log("controller is called ");
//         },

//         // compile : function (element) {
//         //     console.log ("compile is called")
//         //     element.css({'background':'pink'})
//         // },
//     }
// } )