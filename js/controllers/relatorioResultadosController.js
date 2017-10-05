APP.controller("relatorioResultadosController", function($scope, $rootScope, $location, $http){

	$scope.abaAtual = "Filtros";
	var dataInicial;
	var dataFinal;
	$scope.arrayAvaliações = [];

	var setAbaAtual = function (aba) {
		$scope.abaAtual = aba;
	}

	$scope.isAbaAtual = function (aba) {
		return $scope.abaAtual == aba ? true : false;
	}		

	$scope.geraRelatorio = function () {
		if ($scope.Aluno.id == "" || $scope.Aluno.id == null) {
			iziToast.error({
			    title: 'Informe a Matrícula do Aluno!',
			    position: 'topRight',
			});
		}
		else if ($scope.Aluno.nome == "" || $scope.Aluno.nome == null) {
			iziToast.error({
			    title: 'Informe o nome do Aluno!',
			    position: 'topRight',
			});
		}
		else if ($scope.dtInicial == "" || $scope.dtInicial == null) {
			iziToast.error({
			    title: 'Informe a Data Inicial!',
			    position: 'topRight',
			});
		} else if ($scope.dtFinal == "" || $scope.dtFinal == null){
			iziToast.error({
			    title: 'Informe a Data Final!',
			    position: 'topRight',
			});
		} else {
			formataData($scope.dtInicial, $scope.dtFinal);

			$http.post("models/AvaliacaoDAO.php",{
				'dtInicial' : dataInicial,
				'dtFinal' : dataFinal,
				'idAluno' : $scope.Aluno.id,
				'funcao' : "AvaliacoesAlunoData"}
			).success (function(callback){
				if (callback == ""){
					iziToast.warning({
					    title: 'Nenhum Resultado Encontrado com os Filtros Informados!',
					    position: 'topRight',
					});
	 			} else {
	 				setAbaAtual("Relatorio");
	 				$scope.arrayAvaliacoes = callback
	 			}
			})
			.error (function(data){
				alert(data);
			});
		}
	}

	$scope.buscaAluno = function (){
		$rootScope.ProximaRota = "/relatorioResultados";
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

	$scope.limpaTela = function () {
		$scope.dtInicial = "";
		$scope.dtFinal = "";
		$scope.Aluno = {};	
		$scope.abaAtual = "Filtros";
		$rootScope.AlunoSel = null;
	}

	var formataData = function (dtInicial, dtFinal) {
		dataInicial = new Date(dtInicial);
		dataInicial = dataInicial.toISOString().slice(0,10);
		dataFinal = new Date(dtFinal);
		dataFinal = dataFinal.toISOString().slice(0,10);
	}
	
});
