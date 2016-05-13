(function() {
    angular.module('populationSurvey')
        .config(function($stateProvider, $urlRouterProvider) {
            
            $urlRouterProvider.otherwise("/population/world");
            
            $stateProvider
                .state('population', {
                    url: "/population",
                    templateUrl: "app/views/population.html",
                    controller:"PopulationController as populationCtrl"
                })
                .state('population.world', {
                    url: "/world",
                    templateUrl: "app/views/population.world.html",
                    controller: "WorldPopulationController as worldPopulationCtrl"
                }).state('population.country', {
                    url: "/country",
                    templateUrl: "app/views/population.country.html",
                    controller: "CountryPopulationController as countryPopulationCtrl"
                });
        });

})();