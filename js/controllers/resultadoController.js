APP.controller('resultadoController', function($scope,$rootScope, $location, $http){
	
	var dataCompleta,dia,mes,ano = "";
	
	// Abas
	$scope.abaAtual = "Resultados";
	$scope.abaAtualAvaliacao = "PrimeiraAvaliacao";
	$rootScope.ProximaRota = "";
	$scope.arrayParcelas = [];

	$scope.setAbaAtual = function (aba) {
		$scope.abaAtual = aba;
	}

	$scope.isAbaAtual = function (aba) {
		return $scope.abaAtual == aba ? true : false;
	}		

	$scope.setAbaAtualAvaliacao = function (aba) {
		$scope.abaAtualAvaliacao = aba;
	}

	$scope.isAbaAtualAvaliacao = function (aba) {
		return $scope.abaAtualAvaliacao == aba ? true : false;
	}

	// Aluno

	$scope.buscaAluno = function (){
		$rootScope.ProximaRota = "/resultadoAluno";
		if ($scope.Aluno.id != null && $scope.Aluno.id != "") {
			$rootScope.filtro = $scope.Aluno.id;
		}
		$location.path("/buscaAluno");
	}

	var carregaAluno = function () {
		if ($rootScope.AlunoSel != null && $rootScope.AlunoSel != "") {
			$scope.Aluno = $rootScope.AlunoSel;
		}
	}

	carregaAluno();
	
	var carregaResultados = function() {
		if ($scope.Aluno != null && $scope.Aluno != "") {
			$http.post("models/AvaliacaoDAO.php",{'idAluno' : $scope.Aluno.id, 'funcao' : "ListaPrimeiraAvaliacao"}
			).success (function(callback){
				if (callback == ""){
	 				iziToast.warning({
					    title: 'Não Existem Avaliações Cadastradas para o Aluno!',
					    position: 'topRight',
					});
	 			} else {
	 				$scope.avaAluno = callback;
	 				$scope.avaAluno.ava_data = formataData($scope.avaAluno.ava_data);
	 			}
			})
			.error (function(data){
				alert(data);
			});

			$http.post("models/AvaliacaoDAO.php",{'idAluno' : $scope.Aluno.id, 'funcao' : "ListaUltimaAvaliacao"}
			).success (function(callback){
				if (callback != ""){
 					$scope.ultimaAvaAluno = callback;
 					$scope.ultimaAvaAluno.ava_data = formataData($scope.ultimaAvaAluno.ava_data);
	 			}
			})
			.error (function(data){
				alert(data);
			});

			//Parcelas
			$http.post("models/ParcelasDAO.php",{'idAluno' : $scope.Aluno.id, 'funcao' : "ListarParcelasAluno"}
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
	carregaResultados();

	$scope.limpaTela = function () {
		$scope.abaAtual = "Resultados";
		$scope.abaAtualAvaliacao = "PrimeiraAvaliacao";
		$scope.arrayParcelas = [];
		idParcelaSel = 0;
		$scope.avaAluno = {};
		$scope.ultimaAvaAluno = {};
		$scope.Aluno = {};
		$rootScope.AlunoSel = null;
	}

	function formataData(data){
	    dataCompleta = new Date(data);
	    dia = dataCompleta.getDate();
	    if (dia.toString().length == 1)
	      dia = "0"+dia;
	    mes = dataCompleta.getMonth()+1;
	    if (mes.toString().length == 1)
	      mes = "0"+mes;
	    ano = dataCompleta.getFullYear();  
	    return dia+"/"+mes+"/"+ano;
	}

});	
