(function () {
    'use strict';

    angular.module('app')
        .controller('AppController', appController);

    function appController($state) {
        var vm = this;

        // Declare fields and methods on angular scope
        angular.extend(vm, {
            // Fields
            go: go
        });

        // Controller initialization
        init();

        function init() {

        }

        function go(state) {
            console.log(state);
            $state.go(state);
        }
    }

})();
