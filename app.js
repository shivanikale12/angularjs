
  var app = angular.module('sample',["ngRoute"]);
app.config(function($routeProvider){
 
    $routeProvider.
    when("/NewEvent",{
        templateUrl : "Templates/add_event.html",
        controller: "AddEventController"
    }).
    when("/DisplayEvent", {
        templateUrl: "Templates/show_event.html",
        controller: "ShowDisplayController"
    }).
    when("/Login", {
        templateUrl: "Templates/login.html",
        controller: "LoginController",
        css: 'Css/loginStyles.css'
    }).
    when("/ShowWorklist", {
        templateUrl: "Templates/ShowWorklist.html",
        controller: "ShowWorklistController",
       
    }).
    otherwise ({
        redirectTo: '/ShowWorklist'
    });
    
});
app.controller("AddEventController", function($scope) {
    console.log("AddEventController");
    $scope.message = "This is to Add a new Event";

});
app.controller("ShowDisplayController",function($scope){
    console.log("ShowDisplayController");
    $scope.message = "This is display an Event";

  
});
app.controller("LoginController",function($scope){
    console.log("LoginController");
    $scope.message = "This is display an Event";
    
    LoginFormLoad();
  
});
app.controller("ShowWorklistController",function($scope){
    console.log("ShowWorklistController");
    onWorklistLoad();

  
});

