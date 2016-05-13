(function() {
    angular.module('populationSurvey')
        .controller('PopulationController', PopulationController);

    PopulationController.$inject = ['ApiService'];

    function PopulationController(ApiService) {

        var vm = this;
        vm.currentTab='world';

    }

})();
