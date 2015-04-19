angular.module('userService', [])
.factory('User', function($http) {
// create a new object
var userFactory = {};
// get a single user
userFactory.get = function(id) {
return $http.get('/api/usuarios/' + id);
};
// get all users
userFactory.all = function() {
return $http.get('/api/usuarios/');
};
// create a user
userFactory.create = function(userData) {
return $http.post('/api/usuarios/', userData);
};
// update a user
userFactory.update = function(id, userData) {
return $http.put('/api/usuarios/' + id, userData);
};
// delete a user
userFactory.delete = function(id) {
return $http.delete('/api/usuarios/' + id);
};
// return our entire userFactory object
return userFactory;
});