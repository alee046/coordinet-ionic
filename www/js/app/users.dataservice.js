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
        icon:   "",
        position: {
                        latitude: "",
                        longitude: ""
                    }
      },
      message: "",
      addUser: addUser,
      seed: [{
      id: 1,
      name: "General Assembly - Santa Monica",
      icon: '../img/info.png',
      position: {
        latitude:  34.06,
        longitude: -118.3
      },
      message: "Meet And Hire today from 5:30-9:00!"
    },
    {
      id: 2,
      name: "DKs Doughnuts",
      icon: '../img/info.png',
      position: {
        latitude:  34.06,
        longitude: -118.3
      },
      message: "Special on 1 dozen cronuts today!"
    },
    {
      id: 3,
      name: "Bruh",
      icon: '../img/info.png',
      position: {
        latitude:  34.06,
        longitude: -118.3
      },
      message: "broo"
    },
    {
      id: 4,
      name: "Bro",
      icon: '../img/info.png',
      position: {
        latitude:  34.06,
        longitude: -118.3
      },
      message: "Need help to move some stuff ? $50/ hr"
    }]
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
      // $log.log('all the users are', users.all);
      // $log.log('the current user is', users.current);
    };
  };

    function guid() {
      // return Math.random().toString(16).substring(2,15);
      return (Math.floor(Math.random()*(100000-1))+1)

    }

    return users;
  }

})();
