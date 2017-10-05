APP.controller('baixaController', function($scope, $rootScope, $location, $http){

	$scope.Parcela = {};
	$scope.Aluno = {};
	$scope.arrayParcelas = [];
	$rootScope.ProximaRota = "";
	$rootScope.filtro = "";
	var idParcelaSel = -1;

	$scope.setLinhaTabelaSel = function (id) {
		idParcelaSel = id;
		carregaValor(id);
	}

	$scope.isLinhaTabelaSel = function (id) {
		return idParcelaSel == id ? true : false;
	}	

	$scope.limpaTela = function () {
		$scope.arrayParcelas = [];
		idParcelaSel = -1;
		$scope.Parcela = {};
		$scope.Aluno = {};
		$rootScope.AlunoSel = null;
	}

	var limpaValores = function () {	
		idParcelaSel = -1;
		$scope.Parcela = {};
	}

	var carregaValor= function (id) {
		$scope.Parcela.vBruto = $scope.arrayParcelas[idParcelaSel].parc_valorbruto;
		$scope.Parcela.vLiquido = $scope.arrayParcelas[idParcelaSel].parc_valorbruto;
	}

	$scope.calculaValor = function () {
		if ($scope.Parcela.vJurosMulta == "" || $scope.Parcela.vJurosMulta == null) {
			$scope.Parcela.vJurosMulta = 0;
		} 
		if ($scope.Parcela.vDesconto == "" || $scope.Parcela.vDesconto == null) {
			$scope.Parcela.vDesconto = 0;
		}
		$scope.Parcela.vLiquido = $scope.Parcela.vBruto;
		$scope.Parcela.vLiquido -= $scope.Parcela.vDesconto;
		$scope.Parcela.vLiquido += $scope.Parcela.vJurosMulta;
	}

	$scope.buscaAluno = function (){
		$rootScope.ProximaRota = "/baixaParcelas";
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

	var carregaParcelas = function() {
		if ($scope.Aluno != null && $scope.Aluno != "") {
			$http.post("models/ParcelasDAO.php",{'idAluno' : $scope.Aluno.id, 'funcao' : "ListarParcelasAbertasAluno"}
			).success (function(callback){
				if (callback == ""){
					iziToast.warning({
					    title: 'Não Existem Parcelas Cadastradas para o Aluno!',
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
	carregaParcelas();

	$scope.baixarParcela = function () {
		if (idParcelaSel == "" || idParcelaSel == null) {
			iziToast.error({
			    title: 'Selecione uma Parcela!',
			    position: 'topRight',
			});
		} else {
			if ($scope.Parcela.vJurosMulta == "" || $scope.Parcela.vJurosMulta == null) {
				$scope.Parcela.vJurosMulta = 0;
			} 

			if ($scope.Parcela.vDesconto == "" || $scope.Parcela.vDesconto == null) {
				$scope.Parcela.vDesconto = 0;
			} 

			if ($scope.Parcela.vDesconto >= $scope.Parcela.vBruto) {
				iziToast.error({
				    title: 'Valor do desconto não pode ser maior ou igual ao valor da parcela!',
				    position: 'topRight',
				});
			} else {
				$http.post("models/ParcelasDAO.php",
				{'codigoParcela' : $scope.arrayParcelas[idParcelaSel].parc_cod,
				'vLiquido' : $scope.Parcela.vLiquido, 
				'vJurosMulta' : $scope.Parcela.vJurosMulta, 
				'vDesconto' : $scope.Parcela.vDesconto, 
				'funcao' : "BaixarParcela"}
				).success (function(id){
					if (id == ""){
						iziToast.success({
						    title: 'Parcela Baixada com Sucesso!',
						    position: 'topRight',
						});
		 				carregaParcelas();
		 				limpaValores();
		 			} else {
						iziToast.success({
						    title: 'Erro ao Baixar Parcela!',
						    position: 'topRight',
						});
		 			}
				})
				.error (function(data){
					alert(data);
				});
			}
		}	
	}

});

