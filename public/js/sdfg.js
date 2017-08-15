var app = angular.module("imdb", ["ngRoute"]);

app.run(function($rootScope) {
    alert("we are the champion")

});

app.config(function($routeProvider,  $locationProvider) {
    $routeProvider.when("/home", {
        templateUrl: "view/pagelayout.html",
        controller: "actrl"
    });
    $routeProvider.when("/registration", {
        templateUrl: "view/UserRegistration.html",
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

app.controller("actrl", function($scope) {
    alert("first page called");

});
app.controller("bctrl", function($scope) {
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
