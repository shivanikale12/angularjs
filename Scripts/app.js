
  var app = angular.module('sample',['ui.router','myDirectives']);
  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    console.log("In Config");
      $stateProvider
        .state('DisplayEvent', {
          url: '/DisplayEvent',
          templateUrl: 'Templates/display_event_parent.html',
           controller: 'ShowDisplayParentController'
        })
        .state('DisplayEvent.coApplicant', {
            url: '/coApplicant',
            templateUrl: 'Templates/show_event.html',
            controller: 'ShowDisplayController'
          })
          .state('DisplayEvent.applicant', {
            url: '/applicant',
            templateUrl: 'Templates/show_event.html',
            controller: 'ShowDisplayController'
          })
        .state('Login', {
            url: '/Login',
            templateUrl: 'Templates/login.html',
            controller: 'LoginController'
          })
          .state('ShowWorklist', {
            url: '/ShowWorklist',
            templateUrl: 'Templates/ShowWorklist.html',
            controller: 'ShowWorklistController'
          })
          .state('NewEvent', {
            url: '/NewEvent',
            templateUrl: 'Templates/add_event.html',
            controller: 'AddEventController'
          })
          .state('NewKYCEvent', {
            url: '/NewKYCEvent',
            templateUrl: 'Templates/kyc_display_design.html',
            controller: 'NewKYCEventController'
          });
          
    
      $urlRouterProvider.otherwise('NewKYCEvent');
    }])

app.controller("AddEventController", function($scope) {
    console.log("AddEventController");
    $scope.message = "This is to Add a new Event";

});
app.controller("NewKYCEventController", function($scope) {
  console.log("NewKYCEventController");
  $scope.message = "This is to Add a new Event";
  $scope.passport=false;;
  $scope.pancard1=false;
  $scope.pancard2=false;
  this.upload = function () {
    $log.info("Uploading:", this.file || "no file selected!");
  }
  $scope.export=function(){
    var data={"KYCData":[{"docDefPath":null,"docName":"Page11.tif","docPath":"C:\\DaaS\\apache-tomcat-9.0.26\\tmpfiles\\Page11.tif","responseCode":null,"attributes":[{"attributeLabel":"Person Name","attributeValue":"GAJAGOUNI KRISHNAIAH GOUD","attributeBinValue":"0000000000000000000000000"},{"attributeLabel":"Father Name","attributeValue":"","attributeBinValue":null},{"attributeLabel":"Date Of Birth","attributeValue":"09/04/1986","attributeBinValue":"0000000000"},{"attributeLabel":"Permanent Account Number","attributeValue":"","attributeBinValue":null}],"docDetailsHeading":"INCOME TAX DEPARTMENT"},{"docDefPath":null,"docName":"B5184114PAN.jfif","docPath":"C:\\DaaS\\apache-tomcat-9.0.26\\tmpfiles\\B5184114PAN.jfif","responseCode":null,"attributes":[{"attributeLabel":"Person Name","attributeValue":"CHHAILBIHARI SINGH","attributeBinValue":"000000000000001000"},{"attributeLabel":"Father Name","attributeValue":"","attributeBinValue":null},{"attributeLabel":"Date Of Birth","attributeValue":"08/03/1969","attributeBinValue":"0000000000"},{"attributeLabel":"Permanent Account Number","attributeValue":"","attributeBinValue":null}],"docDetailsHeading":"INCOME TAX DEPARTMENT"}],"exportedXmlFilePath":"E:\\AppData\\KYCDocs\\AbbyyExport\\Batch_Fri May 15 00_21_23 GMT-12_00 2020.xml"};
debugger;
    JSONToCSVConvertor(data,"abc","abc");
  }

});
app.controller("ShowDisplayController",function($scope){
    console.log("ShowDisplayController");
    $scope.message = "This is display an Event";
    popover();
    NavActiveChange();
    $scope.editmode=false;
    $scope.fisrname="Kush Kumar Singh";
    $scope.objdate="1969-08-03";
    $scope.objmaxdate=getDate();
    $scope.$on("SendDown", function (evt, data) {
      debugger;
      $scope.Message = "Inside SendDown handler of parent controllers : " + data;
      console.log($scope.Message);
      $scope.editmode =true;
  });
});

app.controller("ShowDisplayParentController",function($scope){
  console.log("ShowDisplayParentController");
  $scope.editmodeP=false;
  $scope.user="Applicant";
  $scope.userApplicant=true;
  $scope.setUserType=function(event){
       if(event=='Applicant')
    $scope.userApplicant=true;
    else $scope.userApplicant=false;
   
  }
  $scope.sendNotification=function(){
    debugger;
    $scope.$broadcast("SendDown", "edit clicked");
    console.log("SendDown");
  }
  popover();
  ApplyScroll();
  $("#appFrmModal").on('show.bs.modal', function(){
    if($scope.userApplicant){
      $("#dvApplicant").show();
      $("#dvCoApplicant").hide();
    }
    else{
      $("#dvApplicant").hide();
      $("#dvCoApplicant").show();
    }
   
 });

});
app.controller("LoginController",function($scope){
    console.log("LoginController");
    $scope.message = "This is display an Event";
    
    LoginFormLoad();
  
});
app.controller("ShowWorklistController",function($scope,$log){
    console.log("ShowWorklistController");
    $scope.validate=true;
    onWorklistLoad();
    popover();
  $scope.moveNext=function(){
    $scope.validate=false;
  }
  $scope.moveBack=function(){
    $scope.validate=true;
  }
  this.upload = function () {
    $log.info("Uploading:", this.file || "no file selected!");
  }

  // Co- Applicant PAN number
$scope.choices = [{"id": 1,"value":""}];

$scope.index = $scope.choices.length;

$scope.addNewChoice = function() {
var newItemNo = ++$scope.index;
$scope.choices.push({'id':newItemNo, "value":""});

};

$scope.removeChoice = function(id) {

// if($scope.choices.length<=1){
// alert("input cannot be less than 1");
// return;
// }


var index = -1;
var comArr = eval( $scope.choices );
for( var i = 0; i < comArr.length; i++ ) {
if( comArr[i].id === id) {
index = i;
break;
}
}
if( index === -1 ) {
alert( "Something gone wrong" );
}
$scope.choices.splice( index, 1 );
};

});


// DIrective for file Upload
var myDirectives = angular.module("myDirectives", []);
myDirectives.directive("myFileUpload", function ($compile) {
  return {
    restrict: "AE",
    require: "ngModel",
    scope: true,
    link: link
  };

  function link (scope, element, attrs, ngModel) {
    var input = angular.element("<input type=\"file\" style=\"display: none;\">");

    input.bind("browse", function () {
      this.click();
    });
    
    input.bind("change", function (changed) {
      if (changed.target.files.length < 1) {
        return;
      }

      var fileName = changed.target.files[0].name;
      var reader = new FileReader();

      reader.onload = function (loaded) {
        scope.fileName = fileName;
        ngModel.$setViewValue(loaded.target.result);
      };
      
      reader.readAsDataURL(changed.target.files[0]);
    });

    $compile(input)(scope);
    element.append(input);

    scope.browse = function () {
      input.triggerHandler("browse");
    };
    
    scope.reset = function () {
      scope.fileName = null;
      ngModel.$setViewValue(null);
    };
  }
});
