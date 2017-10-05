APP.controller("relatorioHistoricoFinanceiroController", function($scope, $rootScope, $location, $http){

	$scope.abaAtual = "Filtros";
	$scope.arrayParcelas = {};
	var dataInicial;
	var dataFinal;
	
	var setAbaAtual = function (aba) {
		$scope.abaAtual = aba;
	}

	$scope.isAbaAtual = function (aba) {
		return $scope.abaAtual == aba ? true : false;
	}		

	$scope.geraRelatorio = function () {
		if ($scope.Aluno.id == null || $scope.Aluno.id == "") {
			iziToast.error({
			    title: 'Informe a Matricula Aluno!',
			    position: 'topRight',
			});
		}
		else if ($scope.Aluno.nome == null || $scope.Aluno.nome == "") {
			iziToast.error({
			    title: 'Informe o Nome Aluno!',
			    position: 'topRight',
			});
		}
		else if ($scope.dpwStatus == null || $scope.dpwStatus == "") {
			iziToast.error({
			    title: 'Informe o Status!',
			    position: 'topRight',
			});
		}else if ($scope.dtInicial == "" || $scope.dtInicial == null) {
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
			if ($scope.dpwStatus == "Todas") {
				$http.post("models/parcelasDAO.php",{
					'idAluno' : $scope.Aluno.id,
					'dtInicial' : dataInicial,
					'dtFinal' : dataFinal,
					'funcao' : "RealatorioHistoricoTodos"}
				).success (function(callback){
					if (callback == ""){
						iziToast.warning({
						    title: 'Nenhum Resultado Encontrado com os Filtros Informados!',
						    position: 'topRight',
						});
		 			} else {
		 				setAbaAtual("Relatorio");
		 				$scope.arrayParcelas = callback;
		 			}
				})
				.error (function(data){
					alert(data);
				});
			} else if ($scope.dpwStatus == "Vencidas"){
				$http.post("models/parcelasDAO.php",{
					'idAluno' : $scope.Aluno.id,
					'dtInicial' : dataInicial,
					'dtFinal' : dataFinal,
					'funcao' : "RelatorioHistoricoVencidas"}
				).success (function(callback){
					if (callback == ""){
						iziToast.warning({
						    title: 'Nenhum Resultado Encontrado com os Filtros Informados!',
						    position: 'topRight',
						});
		 			} else {
		 				setAbaAtual("Relatorio");
		 				$scope.arrayParcelas = callback;
		 			}
				})
				.error (function(data){
					alert(data);
				});
			} else {
				$http.post("models/parcelasDAO.php",{
					'idAluno' : $scope.Aluno.id,
					'status' : $scope.dpwStatus,
					'dtInicial' : dataInicial,
					'dtFinal' : dataFinal,
					'funcao' : "RelatorioHistorico"}
				).success (function(callback){
					if (callback == ""){
						iziToast.warning({
						    title: 'Nenhum Resultado Encontrado com os Filtros Informados!',
						    position: 'topRight',
						});
		 			} else {
		 				setAbaAtual("Relatorio");
		 				$scope.arrayParcelas = callback;
		 			}
				})
				.error (function(data){
					alert(data);
				});
			}
		}
	}

	$scope.buscaAluno = function (){
		$rootScope.ProximaRota = "/relatorioHistoricoFinanceiro";
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
		$scope.Aluno = {};
		$scope.dtInicial = "";
		$scope.dtFinal = "";
		$scope.dpwStatus = "";		
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

