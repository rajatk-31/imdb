const app = angular.module('imdbapp', ['ngRoute', 'ngMessages']);

app.run(function($rootScope) {
    alert("we are the champion")

});

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        template: '<h1>Hello</h1>'
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
    });
    $routeProvider.when("/home", {
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
    });

    // otherwise({
    //  redirect: '/'
    // });
    $locationProvider.html5Mode(true);
});

app.controller('ActorsController', function($http, $scope) {
    $scope.refresh = function() {
        $http({
            url: 'api/actor/all'
        }).then(function(response) {
            $scope.actors = response.data.actors;
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
    $scope.submitForm = function() {

    }

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

app.controller('MovieFormController', function($http, $scope, $location) {
    $scope.submitMovieForm = function() {
        var form = new FormData();
        form.append('poster', $scope.movie.poster);
        form.append('title', $scope.movie.title);
        form.append('release_date', $scope.movie.release_date);
        form.append('director', $scope.movie.director);
        form.append('runtime', $scope.movie.runtime);
        form.append('plot', $scope.movie.plot);
        $http({
            url: 'api/movie',
            method: 'POST',
            data: form,
            headers: {
                'content-type': undefined
            }
        }).then(function(response) {
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