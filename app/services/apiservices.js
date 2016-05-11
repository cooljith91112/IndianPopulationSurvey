(function(){
      angular.module('populationSurvey')
        .factory('ApiService', ApiService);

      ApiService.$inject = ['$http'];

      function ApiService($http){
        return  $http({
                method: 'GET',
                url: 'http://api.population.io/1.0/population/India/1'
            });
      };
})();
