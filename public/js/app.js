const app = angular.module('imdbapp', ['ngRoute', 'ngMessages']);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        template: '<h1>Hello</h1>'
    }).when('/actors', {
        templateUrl: 'views/actors/actors.html',
        controller: 'ActorsController'
    }).when('/addactor', {
        templateUrl: 'views/actors/actor-form.html',
        controller: 'ActorFormController'
    });
});

app.controller('ActorsController', function ($http, $scope) {
    $scope.refresh = function () {
        $http({
            url: 'api/actor/all'
        }).then(function (response) {
            $scope.actors = response.data.actors;
        }, function (response) {

        });
    }
    $scope.refresh();
    $scope.deleteActor = function (actor) {
        if (confirm('Are you sure!')) {
            $http({
                url: 'api/actor/' + actor._id,
                method:'DELETE'
            }).then(function (response) {
                $scope.refresh();
                alert('Successfully deleted Actor');


            }, function (response) {
                alert('Something went wrong');
                console.log(response)
            });
        }

    }
});
app.controller('ActorFormController', function ($http, $scope, $location) {
    $scope.submitForm = function () {
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
        }).then(function (response) {
            if (response.data.status) {
                alert('Successfully added Actor');
                $location.path('/actors');
            } else {
                alert('Something went wrong');
            }
        }, function (response) {
            alert('Something went wrong');
            console.log(response)
        })
    }
});


app.directive('fileModel', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
});