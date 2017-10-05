APP.controller('buscaController', function($scope, $location, $rootScope, $http){

	var idAlunoSel = 0;
	$scope.arrayAlunos = [];
	$rootScope.AlunoSel = {};
	var validaStatus = true;
	$rootScope.AlunoSel = "";

	if ($rootScope.filtro != null && $rootScope.filtro != "") {
			$scope.filtroAlunos = $rootScope.filtro;
	}

	var listaAlunos = function () {
	$http.post("models/AlunoDao.php",{'funcao': "ListarAtivos"})
		.success (function (callback) {
			for (var i = 0 ; i < callback.length; i++) {
				if (callback[i].alu_ativo == "t") {
					validaStatus = "Ativo";
				}else {
					validaStatus = "Inativo";	
				}
				$scope.arrayAlunos.push({
	    			id : callback[i].alu_matricula,
					nome : callback[i].alu_nome,
					nascimento : callback[i].alu_nascimento,
					status : validaStatus,
					cpf : callback[i].alu_cpf,
					rg : callback[i].alu_rg,
					planoCodigo : callback[i].plan_cod,
					sexo : callback[i].alu_sexo,
					plano : callback[i].plan_cod
				});
			}
		}) 
		.error(function(data) {
           alert(data);
		});
	}

	listaAlunos();

	$scope.setAlunoSel = function (aluno) {
		$rootScope.AlunoSel = aluno;
		setLinhaTabelaSel(aluno.id);
	}

	var setLinhaTabelaSel = function (id) {
		idAlunoSel = id;
	}


	$scope.isLinhaTabelaSel = function (id) {
		return idAlunoSel == id ? true : false;
	}	

	$scope.ordenacao = function(coluna){
		if (coluna == 0) {
			$scope.filtro = $scope.filtro == "id" ? "-id" : "id"; 
		}else if (coluna == 1) {
			$scope.filtro = $scope.filtro == "nome" ? "-nome" : "nome";
		}else if (coluna == 2) {
			$scope.filtro = $scope.filtro == "status" ? "-status" : "status";
		}
	}

	$scope.selecionaAluno = function () {
		if ($rootScope.AlunoSel != "" && $rootScope.AlunoSel != null) {
    		$location.path($rootScope.ProximaRota);
    	} else {
			iziToast.error({
			    title: 'Selecione um Aluno!',
			    position: 'topRight',
			});
    	}
	}

	$scope.cancela = function () {
		$rootScope.AlunoSel = "";
		$location.path($rootScope.ProximaRota);
	}

	


});
