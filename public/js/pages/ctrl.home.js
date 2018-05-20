angular
    .module('latyn')
    .directive('fileModel', ['$parse', function($parse){
        return{
            restrict: 'A',
            link: function(scope, element, attrs){
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        console.log(element[0].files[0])
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])
    .service('ngCopy', ['$window', function ($window) {
        var body = angular.element($window.document.body);
        var textarea = angular.element('<textarea/>');
        textarea.css({
            position: 'fixed',
            opacity: '0'
        });

        return function (toCopy) {
            textarea.val(toCopy);
            body.append(textarea);
            textarea[0].select();

            try {
                var successful = document.execCommand('copy');
                if (!successful) throw successful;
            } catch (err) {
                window.prompt("Copy to clipboard: Ctrl+C, Enter", toCopy);
            }

            textarea.remove();
        }
    }])
    .directive('ngClickCopy', ['ngCopy', function (ngCopy) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', function (e) {
                    ngCopy(attrs.ngClickCopy);
                });
            }
        }
    }])
    .controller('MainCtrl', MainCtrl);
MainCtrl.$inject = ["$http"];

function MainCtrl($http){
    var vm = this;
    vm.hideFile = true;
    vm.hide = true;
    vm.button = false;
    vm.downDoc = false;
    vm.toLatin = true;
    vm.toCyril = false;
    vm.toAuto = false;
    vm.doProcess = function(){
        vm.hide = false;
        if(vm.text==0){
            vm.hide = true;
            vm.result = '';
        }
        var word = {
            text: vm.text
        }
        if(vm.text.length > 0) {
            $http.post('/api/do/latyn', word)
                .success(function(data){
                    vm.result = data.word;
                })
        }

    }

    vm.doProcessCyril = function(){
        vm.hide = false;
        if(vm.text==0){
            vm.hide = true;
            vm.result = '';
        }
        var word = {
            text: vm.text
        }
        if(vm.text.length > 0) {
            $http.post('/api/do/cyril', word)
                .success(function(data){
                    vm.result = data.word;
                })
        }

    }

    vm.doProcessAuto = function(){
        vm.hide = false;
        if(vm.text==0){
            vm.hide = true;
            vm.result = '';
        }
        var word = {
            text: vm.text
        }
        if(vm.text.length > 0) {
            $http.post('/api/do/auto', word)
                .success(function(data){
                    vm.result = data.word;
                })
        }

    }

    vm.test = function(){

        var data = {
            file: vm.file

        }
        var fd = new FormData();
        fd.append('file', vm.file);

        $http.post('/api/test', fd, {
            headers: {'Content-Type': undefined}
        })
            .success(function(data){
                vm.result = data;
                vm.downDoc = true;
                vm.hideFile = false;
                vm.button = false;
            })
    }

    vm.showButton = function(){
        vm.button = true;
    }
    vm.toLatinBut = function(){
        vm.toLatin = !vm.toLatin;
        vm.toCyril = !vm.toCyril;
        //vm.toAuto = false;
    }
    vm.toCyrilBut = function(){
        vm.toLatin = false;
        vm.toCyril = true;
        vm.toAuto = false;
    }
    vm.toAutoBut = function(){
        vm.toLatin = false;
        vm.toCyril = false;
        vm.toAuto = true;
    }
    vm.clear = function () {
        vm.text = "";
        vm.result = "";
    }
}