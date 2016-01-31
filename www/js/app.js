// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase', 'ngCordova'])
.factory('Items', ['$firebaseArray', function($firebaseArray) {
  var itemRef = new Firebase('https://shining-inferno-2964.firebaseio.com/items');
  return $firebaseArray(itemRef);
}])
.controller('listCtrl', function($scope, $ionicListDelegate, $cordovaDialogs, Items) {
  $scope.items = Items;
  
  $scope.addItem = function() {
    $cordovaDialogs.prompt('What do you want to add to the list?', 'Task Tracker', ['Cancel', 'Add'], '')
    .then(function(result) {
      if (result.buttonIndex == 2) {
        $scope.items.$add({name: result.input1});
      }
    });
  };
  
  $scope.completedTask = function(item) {
    var itemRef = new Firebase('https://shining-inferno-2964.firebaseio.com/items/' + item.$id);
    itemRef.child('status').set('completed');
    $ionicListDelegate.closeOptionButtons();
  };
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
