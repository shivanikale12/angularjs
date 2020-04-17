console.log("Hi");
  var app = angular.module('sample',["ngRoute"]);
app.config(function($routeProvider){
    console.log("Hi2");
    $routeProvider.
    when("/NewEvent",{
        templateUrl : "Templates/add_event.html",
        controller: "AddEventController"
    }).
    when("/DisplayEvent", {
        templateUrl: "Templates/show_event.html",
        controller: "ShowDisplayController"
    })
    
    
});
app.controller("AddEventController", function($scope) {
    console.log("AddEventController");
    $scope.message = "This is to Add a new Event";

});
app.controller("ShowDisplayController",function($scope){
    console.log("ShowDisplayController");
    $scope.message = "This is display an Event";

});
