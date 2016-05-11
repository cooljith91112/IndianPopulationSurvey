(function() {
    angular.module('populationSurvey')
        .controller('PopulationController', PopulationController);

    PopulationController.$inject = ['ApiService'];

    function PopulationController(ApiService) {

        var vm = this;

        vm.labels = [];
        vm.series = ['Male', 'Female', 'Male/Female Ratio', 'Total'];
        vm.data = [];
        vm.males = [];
        vm.females = [];
        vm.ratio = [];
        vm.total = [];

        vm.init = function() {
            vm.getPopulation();
        };


        vm.getPopulation = function(year) {
            vm.labels = [];
            vm.data = [];
            vm.males = [];
            vm.females = [];
            vm.ratio = [];
            vm.total = [];

            var minYear = (year === undefined) ? 1950 : parseInt(year);
            ApiService.then(function(response) {
                var agePopulationArray = response.data;

                angular.forEach(response.data, function(value, key) {
                    if (parseInt(value.year) >= minYear) {
                        vm.labels.push(value.year);
                        vm.males.push(value.males);
                        vm.females.push(value.females);
                        var ratio = (parseFloat(value.males) / parseFloat(value.females)).toFixed(2);
                        vm.ratio.push(ratio);
                        vm.total.push(value.total);
                    }
                });

                vm.data.push(vm.males);
                vm.data.push(vm.females);
                vm.data.push(vm.ratio);
                vm.data.push(vm.total);

            });
        };
    }

})();
