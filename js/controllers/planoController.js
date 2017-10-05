APP.controller('planoController', function($scope, $http){
	
	$scope.arrayPlanos = [];
	$scope.Plano = {
		id : "",
		descricao : "",
		qtDias : "",
		qtParcelas : "",
		vencimento : "",
		valorTotal : "",
		valorParcela : "",
		status : ""
	};
	var resultadoCalculo = 0;
	var validaStatus;
	var edita = false;
	var idPlanoSel = null;



	var listaPlanos = function () {
	$http.post("models/PlanoDao.php",{'funcao': "ListarTodos"})
		.success (function (callback) {
			for (var i = 0 ; i < callback.length; i++) {
				resultadoCalculo = callback[i].plan_valor / callback[i].plan_qtparcelas;	
				if (callback[i].plan_ativo == "t") {
					validaStatus = "Ativo";
				}else {
					validaStatus = "Inativo";
				}
				$scope.arrayPlanos.push({
	    			id : callback[i].plan_cod,
		    		descricao : callback[i].plan_descricao, 
					qtDias: callback[i].plan_dias,
					qtParcelas : callback[i].plan_qtparcelas,
					vencimento : callback[i].plan_diavencimento,
					valorTotal: callback[i].plan_valor,
					valorParcela: resultadoCalculo,
					status : validaStatus
				});
			}
		}) 
		.error(function(data) {
           alert(data);
	});
	}
	listaPlanos ();

	$scope.setLinhaTabelaSel = function (id) {
		idPlanoSel = id;
	}

	$scope.isLinhaTabelaSel = function (id) {
		return idPlanoSel == id ? true : false;
	}	

	$scope.limpaTela = function () {
		$scope.arrayPlanos = [];
		$scope.Plano = {};
		idPlanoSel = 0;
		edita = false;
		listaPlanos ();
		idPlanoSel = null;
	} 

	

	$scope.editaPlano = function (){
		$scope.Plano.descricao = $scope.arrayPlanos[idPlanoSel].descricao;
		$scope.Plano.qtDias = parseInt($scope.arrayPlanos[idPlanoSel].qtDias);
		$scope.Plano.qtParcelas = parseInt($scope.arrayPlanos[idPlanoSel].qtParcelas);
		$scope.Plano.vencimento = parseInt($scope.arrayPlanos[idPlanoSel].vencimento);
		$scope.Plano.valorTotal = parseInt($scope.arrayPlanos[idPlanoSel].valorTotal);
		$scope.Plano.valorParcela = parseInt($scope.arrayPlanos[idPlanoSel].valorParcela);
		if ($scope.arrayPlanos[idPlanoSel].status == "Ativo"){
			$scope.Plano.status = "true";
		} else {
			$scope.Plano.status = "false";
		}
		edita = true;
	}

	$scope.calculaValorParcela = function () {
		if ($scope.Plano.valorTotal != null && $scope.Plano.valorTotal != "" && $scope.Plano.qtParcelas != null && $scope.Plano.qtParcelas != "") {		
			$scope.Plano.valorParcela = $scope.Plano.valorTotal / $scope.Plano.qtParcelas;	
		} else {
			$scope.Plano.valorParcela = 0;
		}
		
	}

	$scope.salvar = function (){
		if ($scope.Plano.descricao =="" || $scope.Plano.descricao == null) {
			iziToast.error({
			    title: 'Informe a Descrição!',
			    position: 'topRight',
			});
		}
		else if ($scope.Plano.qtDias =="" || $scope.Plano.qtDias == null || $scope.Plano.qtDias < 1) {
			iziToast.error({
			    title: 'Informe a Quantidade de Dias!',
			    position: 'topRight',
			});			
		}
		else if ($scope.Plano.qtParcelas =="" || $scope.Plano.qtParcelas == null || $scope.Plano.qtParcelas < 1) {
			iziToast.error({
			    title: 'Informe a Quantidade de Parcelas!',
			    position: 'topRight',
			});
		}
		else if ($scope.Plano.vencimento =="" || $scope.Plano.vencimento == null) {
			iziToast.error({
			    title: 'Informe a Data de Vencimento!',
			    position: 'topRight',
			});
		}
		else if ($scope.Plano.vencimento > 31 || $scope.Plano.vencimento < 1) {
			iziToast.error({
			    title: 'Data de Vencimento Inválida!',
			    position: 'topRight',
			});
		}
		else if ($scope.Plano.valorTotal =="" || $scope.Plano.valorTotal == null || $scope.Plano.valorTotal < 1) {
			iziToast.error({
			    title: 'Informe o valor Total!',
			    position: 'topRight',
			});
		}
		else if ($scope.Plano.status == null || $scope.Plano.status == "") {
			iziToast.error({
			    title: 'Informe o Status!',
			    position: 'topRight',
			});
		}
		else {
			if (edita == false) {
				$http.post("models/PlanoDao.php",
				{'plano':$scope.Plano, 'funcao' : "Salvar"}
				).success (function(data){
					if (data == ""){
						iziToast.success({
						    title: 'Cadastro Realizado com Sucesso!',
						    position: 'topRight',
						});
						$scope.limpaTela();
						listaPlanos ();
					} else {
						iziToast.error({
						    title: 'Erro ao Cadastrar!',
						    position: 'topRight',
						});
		 				alert (data);
		 			}
				});
			} else {
				$http.post("models/PlanoDao.php",
				{'plano':$scope.Plano,
				'idPlano' : $scope.arrayPlanos[idPlanoSel].id,
				'funcao' : "Editar"}
				).success (function(data){
					if (data == ""){
						iziToast.success({
						    title: 'Plano Atualizado com Sucesso!',
						    position: 'topRight',
						});
						$scope.limpaTela();
						listaPlanos ();
					} else {
						iziToast.error({
						    title: 'Erro ao Editar!',
						    position: 'topRight',
						});
		 				alert (data);
		 			}
				});
			}
			edita = false;
		}
	}



});

