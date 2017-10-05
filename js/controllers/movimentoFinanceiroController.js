APP.controller('movimentoFinanceiroController', function($scope, $rootScope, $location, $http){

	var idParcelaSel,data,dia,mes,ano = "";
	$rootScope.ProximaRota = "";
	$rootScope.filtro = "";
	$scope.arrayParcelas = [];
	$scope.filtroMovimento = "";

	$scope.atualizaFiltro = function () {
		if ($scope.dataMovimento != null) {
			data = new Date($scope.dataMovimento);
		    dia = data.getDate();
		    if (dia.toString().length == 1) dia = "0"+dia;
		    mes = data.getMonth()+1;
		    if (mes.toString().length == 1) mes = "0"+mes;
		    ano = data.getFullYear();  
			$scope.filtroMovimento = ano+"-"+mes+"-"+dia;
		} else {
			$scope.filtroMovimento = "";
		}
	}

	$scope.setLinhaTabelaSel = function (id) {
		idParcelaSel = id;
	}

	$scope.isLinhaTabelaSel = function (id) {
		return idParcelaSel == id ? true : false;
	}	

	$scope.limpaTela = function () {
		$scope.arrayParcelas = [];
		idParcelaSel = "";
		$scope.Aluno = {};
		$rootScope.AlunoSel = null;
	}

	var carregaMovimentosDia = function() {
		if ($scope.Aluno == null || $scope.Aluno == "") {
			$http.post("models/ParcelasDAO.php",{'funcao' : "MovimentosDia"}
			).success (function(callback){
				if (callback != ""){
	 				$scope.arrayParcelas = callback;
	 			}
			})
			.error (function(data){
				alert(data);
			});
		}
	}
	carregaMovimentosDia();	

	$scope.buscaAluno = function (){
		$rootScope.ProximaRota = "/movimentoFinanceiro";
		$location.path("/buscaAluno");
		if ($scope.Aluno.id != null && $scope.Aluno.id != "") {
			$rootScope.filtro = $scope.Aluno.id;
		}
	}

	var carregaAluno = function () {
		if ($rootScope.AlunoSel != null || $rootScope.AlunoSel != "") {
			$scope.Aluno = $rootScope.AlunoSel;
		}
	}

	carregaAluno();

	var carregaMovimentosAluno = function() {
		if ($scope.Aluno != null && $scope.Aluno != "") {
			$http.post("models/ParcelasDAO.php",{'idAluno' : $scope.Aluno.id, 'funcao' : "MovimentosAluno"}
			).success (function(callback){
				if (callback == ""){
					iziToast.warning({
					    title: 'Não Existem Parcelas Pagas pelo Aluno!',
					    position: 'topRight',
					});
	 			} else {
	 				$scope.arrayParcelas = callback;
	 			}
			})
			.error (function(data){
				alert(data);
			});
		}
	}
	carregaMovimentosAluno();	

});

