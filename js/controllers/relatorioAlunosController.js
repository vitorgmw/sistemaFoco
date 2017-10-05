APP.controller("relatorioAlunosController", function($scope, $rootScope, $location, $http){

	$scope.abaAtual = "Filtros";
	var dataInicial;
	var dataFinal;

	var setAbaAtual = function (aba) {
		$scope.abaAtual = aba;
	}

	$scope.isAbaAtual = function (aba) {
		return $scope.abaAtual == aba ? true : false;
	}		

	$scope.geraRelatorio = function () {
		if ($scope.status == null) {
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

			if ($scope.status == "todos") {
				$http.post("models/alunoDAO.php",{
					'dtInicial' : dataInicial,
					'dtFinal' : dataFinal,
					'funcao' : "RealatorioAlunosTodos"}
				).success (function(callback){
					if (callback == ""){
						iziToast.warning({
						    title: 'Nenhum Resultado Encontrado com os Filtros Informados!',
						    position: 'topRight',
						});
		 			} else {
		 				setAbaAtual("Relatorio");
		 				$scope.arrayAlunos = callback;
		 				for (var i = 0; i < $scope.arrayAlunos.length;i++){
		 					if ($scope.arrayAlunos[i].alu_ativo == 't') {
		 						$scope.arrayAlunos[i].alu_ativo = "Ativo";
		 					} else {
		 						$scope.arrayAlunos[i].alu_ativo = "Inativo";
		 					}
		 				}
		 			}
				})
				.error (function(data){
					alert(data);
				});
			} else {
				$http.post("models/alunoDAO.php",{
					'status' : $scope.status,
					'dtInicial' : dataInicial,
					'dtFinal' : dataFinal,
					'funcao' : "RealatorioAlunos"}
				).success (function(callback){
					if (callback == ""){
						iziToast.warning({
						    title: 'Nenhum Resultado Encontrado com os Filtros Informados!',
						    position: 'topRight',
						});
		 			} else {
		 				setAbaAtual("Relatorio");
		 				$scope.arrayAlunos = callback;
		 				for (var i = 0; i < $scope.arrayAlunos.length;i++){
		 					if ($scope.arrayAlunos[i].alu_ativo == 't') {
		 						$scope.arrayAlunos[i].alu_ativo = "Ativo";
		 					} else {
		 						$scope.arrayAlunos[i].alu_ativo = "Inativo";
		 					}
		 				}
		 			}
				})
				.error (function(data){
					alert(data);
				});
			}
		}
	}

	$scope.limpaTela = function () {
		$scope.dtInicial = "";
		$scope.dtFinal = "";
		$scope.status = "";		
		$scope.abaAtual = "Filtros";
	}

	var formataData = function (dtInicial, dtFinal) {
		dataInicial = new Date(dtInicial);
		dataInicial = dataInicial.toISOString().slice(0,10);
		dataFinal = new Date(dtFinal);
		dataFinal = dataFinal.toISOString().slice(0,10);
	}
	
});

