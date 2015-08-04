var contactControllers = angular.module('contactControllers', ['firebase', 'ngDialog']);
var ref = new Firebase("https://cremalabcontacts.firebaseio.com/");

contactControllers.controller('ListController', ['$scope', 'ngDialog', '$firebaseArray',  function($scope, ngDialog, $firebaseArray) {
    $scope.contacts = $firebaseArray(ref);
    $scope.contactOrder = 'fName';
    $scope.whichItem = null;

    this.addContact = function() {
        ngDialog.openConfirm({
            className: 'ngdialog-theme-default',
            template: 'partials/addition.html',
            controller: 'AdditionController as addition',
            scope: $scope
        })
    }
    this.editContact = function(memId) {
        $scope.whichItem = memId;
        console.log(memId);
        ngDialog.openConfirm({
            className: 'ngdialog-theme-default',
            template: 'partials/edit.html',
            controller: 'EditController as edit',
            scope: $scope
        })
    }
}]);

contactControllers.controller('EditController', ['$scope', '$firebaseArray', '$routeParams', '$location', function($scope, $firebaseArray, $routeParams, $location) {
    $scope.contacts = $firebaseArray(ref);
    this.editContact = function() {
        $scope.contacts.$save($scope.contacts[$scope.whichItem]);
        $scope.closeThisDialog(0);
    };
    this.removeContact = function(){
        $scope.contacts.$remove($scope.contacts[$scope.whichItem]);
        $scope.closeThisDialog(0);
    };
}]);

contactControllers.controller('AdditionController', ['$scope', '$firebaseArray', '$location', function($scope, $firebaseArray, $location) {
    $scope.contacts = $firebaseArray(ref);
    this.fName  = "";
    this.lName  = "";
    this.number = "";
    this.email  = "";
    this.title = "";
    this.addContact = function() {
        $scope.contacts.$add({
            fName: this.fName,
    		lName: this.lName,
    		phone: this.number,
    		email: this.email,
            title: this.title,
            short_name: this.fName
        });
        $scope.closeThisDialog(0);
    };
}]);