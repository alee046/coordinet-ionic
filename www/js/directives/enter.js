(function(){
  "use strict";
  angular.module('ngEnter', [])
  .directive('ngEnter', function(){
    return function(scope, element, attr){
      element.bind("keydown keypress", function(event){
        if(event.which === 13){
          scope.$apply(function(){
            scope.$eval(attrs.ngEnter);
          })
          event.preventDefault();
        }
      });
    };
  });
})();
