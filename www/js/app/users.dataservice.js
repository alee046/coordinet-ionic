(function() {
  "use strict";

  angular
    .module("app")
    .factory("usersDataService", usersDataService);

  usersDataService.$inject = ['$log'];

  function usersDataService($log) {
    var users = {
      all:     [],
      current: {
        id:     guid(),
        name:   "",
        status: "",
        lat:    "",
        lng:    ""
      },
      addUser: addUser
    };

    function addUser(data){
      var notInAll=true;
      if (data.id != users.current.id){
        users.all.forEach(function(user){
          if(user.id == data.id){
            notInAll=false;
          }
        });
        if (notInAll){
      users.all.push(data);
      }
      $log.log('all the users are', users.all);
      $log.log('the current user is', users.current);
    };
  };

    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16).substring(1);
      };
      return s4() + s4() + '-' + s4() + '-' + s4() + s4();
    }

    return users;
  }

})();
