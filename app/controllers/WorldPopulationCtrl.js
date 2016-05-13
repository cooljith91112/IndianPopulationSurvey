(function() {
    angular.module('populationSurvey')
        .controller('WorldPopulationController', WorldPopulationController);

    WorldPopulationController.$inject = ['ApiService', '$scope'];

    function WorldPopulationController(ApiService, $scope) {

        var vm = this;
        vm.minYear=1950,
        vm.maxYear=2099,
        vm.populationArray = null;
        vm.slider = {
          minValue: 1950,
          maxValue: 2099,
          options: {
            floor: 1950,
            ceil: 2099,
            showTicksValues: 10,
            onChange: function(sliderId, minValue, maxValue) {
                // console.log(sliderId,minValue, highValue); // logs 'on change slider-id'
                vm.minYear = minValue;
                vm.maxYear = maxValue;
            }
          },
          enforceRange:true
        };
      


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


        vm.getPopulation = function() {
            vm.labels = [];
            vm.data = [];
            vm.males = [];
            vm.females = [];
            vm.ratio = [];
            vm.total = [];

            // var minYear = (year === undefined) ? 1950 : parseInt(year);
            if(!vm.populationArray){
                ApiService.then(function(response) {
                    vm.populationArray = response.data;
                    filterPopulationByYears()
                });
            }
            else{
                filterPopulationByYears()
            }
            
        };
        
        function filterPopulationByYears(){
            angular.forEach(vm.populationArray, function(value, key) {
                if (parseInt(value.year) >= vm.minYear && parseInt(value.year) <= vm.maxYear) {
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
        }
    }

})();
