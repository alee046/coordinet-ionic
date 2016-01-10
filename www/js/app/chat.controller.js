(function(){
"use strict";
angular
  .module("app")
  .controller("ChatController", ChatController);

ChatController.$inject= ["$log","$scope","usersDataService","socketService","$ionicScrollDelegate","$stateParams", "$sanitize"];
function ChatController($log, $scope, usersDataService, socketService, $ionicScrollDelegate, $stateParams, sanitize){
  var vm = this;
  var typing = false;
  vm.users = usersDataService;

 $log.log(vm.users.current);
    var COLORS = [
      '#e21400', '#91580f', '#f8a700', '#f78b00',
      '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
      '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
    ];

    vm.messages=[];

    socketService.on("connect",function(){
      // $log.log(vm.users.current.name)
      //add user
      // socketService.emit('add-user', vm.users.current.name);
    })


    socketService.on('new message', function (data) {
      if(data.message&&data.name)
      {
        addMessageToList(data.name,true,data.message)
      }
    });

    function addMessageToList(username,style_type,message){
      username = $sanitize(username)
      removeChatTyping(username)
      var color = style_type ? getUsernameColor(username) : null
      vm.messages.push({content:$sanitize(message),style:style_type,username:username,color:color})
      $ionicScrollDelegate.scrollBottom();
    }

// add user
// messages
// private messages
// typing

}
})();
