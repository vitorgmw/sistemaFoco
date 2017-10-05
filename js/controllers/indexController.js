APP.controller("indexController", function($scope, $rootScope, $location){

	$rootScope.AlunoSel = {};
	$rootScope.ProximaRota = "";
	$rootScope.filtro = "";
	
});

	
APP.filter("real", function(){
	return function(input){
		if(input){
			var v= parseFloat(input).toFixed(2);
			v = (v+"").replace(".",",");
			return "R$ "+ v;
		}
	}
});

