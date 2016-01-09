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
        position: {
                        latitude: "",
                        longitude: ""
                    }

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
      return Math.random().toString(16).substring(2,15);
    }

    return users;
  }

})();
