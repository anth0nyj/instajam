console.log("main.js linked");

const app = angular.module("JamApp", []);

app.controller("MainController", ["$http", function($http) {
  this.test = 'test';
}]);
