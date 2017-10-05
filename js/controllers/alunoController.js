APP.controller('alunoController', function($scope, $http, $rootScope, $location){
	
	$rootScope.ProximaRota = "";
	$scope.Aluno = {};
	$rootScope.filtro = "";
	$scope.Endereco = {};
	$scope.arrayAvaliacoes = [];
	var edita = false;
	var avaliacaoSel = "";



	// abas
	var abaAtual = "Dados" ;
	var abaAtualAvaliacao = "avaCadastro" ;
	
	$scope.setAbaAtual = function (aba) {
		abaAtual = aba;
	}

	$scope.setAbaAtualAvaliacao = function (aba) {
		abaAtualAvaliacao = aba;
	}


	$scope.isAbaAtual = function (aba) {
		return abaAtual == aba ? true : false;
	}

	$scope.isAbaAtualAvaliacao = function (aba) {
		return abaAtualAvaliacao == aba ? true : false;
	}

	// contatos

	$scope.arrayContatos = [];
	$scope.Contato = {};
	var idContato = 1;
	var idContatoSel = 0;
	

    $scope.addContato = function () {

    	if ($scope.Contato.numeroContato == null) $scope.Contato.numeroContato = "";
		if ($scope.Contato.emailContato == null) $scope.Contato.emailContato = "";

    	if ($scope.Contato.descricaoContato == null) {
    		iziToast.error({
			    title: 'Informe a descrição!',
			    position: 'topRight',
			});
    	} else if (idContatoSel <= idContato && idContatoSel != 0) { 
    		$scope.arrayContatos[idContatoSel - 1] = {
    			id : idContatoSel,
	    		descricao : $scope.Contato.descricaoContato, 
				numero: $scope.Contato.numeroContato, 
				email : $scope.Contato.emailContato
			};
    		limpaCamposContato();
    	} else{
    		$scope.arrayContatos.push({
    			id : idContato,
	    		descricao : $scope.Contato.descricaoContato, 
				numero: $scope.Contato.numeroContato, 
				email : $scope.Contato.emailContato
			});
    		idContato += 1;
    		limpaCamposContato();
    	}
	}

	$scope.editaContato = function () {   
		if (idContatoSel != null && idContatoSel != "") {	
	    	$scope.Contato.descricaoContato = $scope.arrayContatos[idContatoSel - 1].descricao; 
			$scope.Contato.numeroContato = $scope.arrayContatos[idContatoSel - 1].numero; 
			$scope.Contato.emailContato = $scope.arrayContatos[idContatoSel - 1].email;
		} else {
    		iziToast.error({
			    title: 'Selecione um Contato!',
			    position: 'topRight',
			});
		} 	
	}

	$scope.excluiContato = function () {
		if (idContatoSel != null && idContatoSel != "") {
			$scope.arrayContatos.splice(idContatoSel - 1, 1);
			idContatoSel = 0;
		} else {
    		iziToast.error({
			    title: 'Selecione um Contato!',
			    position: 'topRight',
			});
		} 	
	}

	$scope.setLinhaTabelaContatoSel = function (id) {
		idContatoSel = id;
	}


	$scope.isLinhaTabelaContatoSel = function (id) {
		return idContatoSel == id ? true : false;
	}

	var limpaCamposContato = function () {
		$scope.Contato = {};
		idContatoSel = "";
	}

	$scope.limpaTela = function () {
		$scope.Aluno = {};
		$rootScope.AlunoSel = null;
		$scope.Parcela = {};
		$scope.avaAluno = {};
		$scope.Endereco = {};
		$scope.arrayContatos = [];
		$scope.arrayParcelas = [];
		$scope.arrayParcelas = [];
		abaAtual = "Dados";
		abaAtualAvaliacao = "avaCadastro";
		limpaCamposContato();
		$scope.Endereco.estado = "";
		$scope.arrCidades = [];
		edita = false;
	}

	// Aluno

	var dataAvaliacao = new Date();
	$rootScope.arrayAlunos = [];
	$scope.arrayParcelas = [];
	$scope.Aluno = {};
	var idAluno;
	var planoSel = "";

	$scope.salvaAluno = function(){
		if ($scope.Aluno.rg == null) {
			$scope.Aluno.rg = "";
		}  	

		if ($scope.Aluno.nascimento){		
			var dataNascimento = new Date($scope.Aluno.nascimento);
			dataNascimento = dataNascimento.toISOString().slice(0,10);
		}

		if ($scope.Aluno.plano  == "" || $scope.Aluno.plano == null ) {
			planoSel = "null";
		} else {
			planoSel = $scope.Aluno.plano;
		}

		if ($scope.Aluno.status == null) {
    		iziToast.error({
			    title: 'Informe o Status!',
			    position: 'topRight',
			});
		}
		else if ($scope.Aluno.nome =="" || $scope.Aluno.nome == null) {
    		iziToast.error({
			    title: 'Informe o Nome do Aluno!',
			    position: 'topRight',
			});	
		}
		else if ($scope.Aluno.nascimento == null) {
    		iziToast.error({
			    title: 'Informe a Data de Nascimento do Aluno!',
			    position: 'topRight',
			}); 
		} 
		else if ($scope.Aluno.nascimento >= new Date()) {
    		iziToast.error({
			    title: 'Data de Nascimento Inválida! Deve ser Menor do que a Data Atual.',
			    position: 'topRight',
			});
		}
		else if ($scope.Aluno.cpf == "" || $scope.Aluno.cpf == null) {
			iziToast.error({
			    title: 'Informe o numero do CPF!',
			    position: 'topRight',
			}); 
		} 
		else if ($scope.Aluno.cpf.length != 11 || isNaN($scope.Aluno.cpf)) {
			iziToast.error({
			    title: 'CPF Incorreto. Deve Conter Onze Dígitos e Apenas Números!',
			    position: 'topRight',
			});
		} 
		else if ($scope.Endereco.estado == "" || $scope.Endereco.estado == null ){
			iziToast.error({
			    title: 'Informe o Estado!',
			    position: 'topRight',
			});
		}
		else if ($scope.Endereco.cidade =="" || $scope.Endereco.cidade == null ){
			iziToast.error({
			    title: 'Informe a Cidade!',
			    position: 'topRight',
			});
		}
		else if ($scope.Endereco.cep == null || $scope.Endereco.cep == "") {
			iziToast.error({
			    title: 'Informe o CEP!',
			    position: 'topRight',
			});
		} 
		else if ($scope.Endereco.cep.length != 8 || isNaN($scope.Endereco.cep)) {
			iziToast.error({
			    title: 'CEP Incorreto. Deve Conter Oito Dígitos e Apenas Números!',
			    position: 'topRight',
			});
		}
		else if (isNaN($scope.Aluno.rg)) {
			iziToast.error({
			    title: 'RG Inválido!',
			    position: 'topRight',
			});
		}
		else {
			if (!edita) {
				$http.post("models/AlunoDAO.php",{
					'Aluno':$scope.Aluno,
					'funcao' : "Salvar",
					'dataNascimento': dataNascimento,
					'Plano' : planoSel
				}
				).success (function(data){
					if (data == ""){
						$http.post("models/AlunoDAO.php",
							{'funcao' : "idAlunoCadastrado"}
						).success (function(callback){
							idAluno = callback;
							iziToast.success({
							    title: 'Aluno Cadastrado Sucesso!',
							    position: 'topRight',
							});

						validaEndereco();

						$http.post("models/EnderecoAlunoDAO.php",
						{'Endereco': $scope.Endereco,
						'Cidade' : $scope.Endereco.cidade,
						'Estado' : $scope.Endereco.estado,
						'funcao' : "Salvar",
						'idAluno' : idAluno}
						).success (function(data){
							if (data != ""){
								iziToast.error({
								    title: 'Erro ao Cadastrar Endereço!',
								    position: 'topRight',
								});
				 				alert (data);
				 			}
						});


						//Contatos
						if ($scope.arrayContatos.length > 0) {
							$http.post("models/AlunoContatoDAO.php",
							{'arrayContatos': $scope.arrayContatos,
							 'funcao' : "Salvar",
							 'qtContatos' : $scope.arrayContatos.length,
							 'idAluno' : idAluno}
							).success (function(data){
								if (data != ""){
									iziToast.error({
									    title: 'Erro ao Cadastrar Contatos!',
									    position: 'topRight',
									});
					 				alert (data);
					 			}
							});
						}
						
						//Avaliação
						if (salvarAvaliacao) {
							
							if (!validaAvaliação()) {
								iziToast.error({
								    title: 'Erro ao cadastrar Avaliação, resultados do Aluno Inválidos!',
								    position: 'topRight',
								});
							} else {
								$http.post("models/AvaliacaoDAO.php",
								{'avaAluno':$scope.avaAluno,
								'funcao' : "Salvar",
								'dataAvaliacao' : dataAvaliacao,
								'idAluno' : idAluno}
								).success (function(data){
									if (data != ""){
						 				iziToast.error({
										    title: 'Erro ao Cadastrar Avaliação!',
										    position: 'topRight',
										});
						 				alert (data);
						 			}else {
						 				salvarAvaliacao = false;
						 			}
								});
							}
						}

						//Parcelas
						if ($scope.arrayParcelas.length > 0) {
							$http.post("models/ParcelasDAO.php",
							{'arrayParcelas':$scope.arrayParcelas,
							 'qtParcelas': $scope.Parcela.qtParcelas,
							 'funcao' : "GravarParcelas",
							 'idAluno' : idAluno}
							).success (function(data){
								if (data != ""){
					 				iziToast.error({
									    title: 'Erro ao Cadastrar Parcelas!',
									    position: 'topRight',
									});
					 				alert (data);
					 			}
							});
						}
						$scope.limpaTela();


						}) 
						.error(function(data) {
			 				iziToast.error({
							    title: 'Erro ao Cadastrar!' + data,
							    position: 'topRight',
							});
						});

					}
					else {
		 				iziToast.error({
						    title: 'Erro ao Cadastrar!',
						    position: 'topRight',
						});
		 				alert (data);
			 		}
				});

			}else {
				$http.post("models/AlunoDAO.php",{
					'Aluno': $scope.Aluno,
					'funcao' : "Editar",
					'dataNascimento': dataNascimento,
					'Plano' : planoSel
				}
				).success (function(data){
					if (data == ""){
						validaEndereco();
						$http.post("models/EnderecoAlunoDAO.php",
						{'Endereco': $scope.Endereco,
						'Cidade' : $scope.Endereco.cidade,
						'Estado' : $scope.Endereco.estado,
						'funcao' : "Editar",
						'idAluno' : $scope.Aluno.id}
						).success (function(data){
							if (data != ""){
				 				iziToast.error({
								    title: 'Erro ao Editar Endereço!',
								    position: 'topRight',
								});
				 				alert (data);
				 			}
						});

						//Contatos
						if ($scope.arrayContatos.length > 0) {
							$http.post("models/AlunoContatoDAO.php",
							{'arrayContatos': $scope.arrayContatos,
							 'funcao' : "Editar",
							 'qtContatos' : $scope.arrayContatos.length,
							 'idAluno' : $scope.Aluno.id}
							).success (function(data){
								if (data != ""){
									iziToast.error({
									    title: 'Erro ao Editar Contatos!',
									    position: 'topRight',
									});
					 				alert (data);
					 			}
							});
						}

						//Avaliação
						if (salvarAvaliacao) {
							
							if (!validaAvaliação()) {
								iziToast.error({
								    title: 'Erro ao cadastrar Avaliação, resultados do Aluno Inválidos!',
								    position: 'topRight',
								});
							} else {
								$http.post("models/AvaliacaoDAO.php",
								{'avaAluno':$scope.avaAluno,
								'funcao' : "Salvar",
								'dataAvaliacao' : dataAvaliacao,
								'idAluno' : $scope.Aluno.id}
								).success (function(data){
									if (data != ""){
						 				iziToast.error({
										    title: 'Erro ao Cadastrar Avaliação!',
										    position: 'topRight',
										});
						 				alert (data);
						 			}else {
						 				salvarAvaliacao = false;
						 			}
								});
							}
						}

						//Parcelas
						if ($scope.arrayParcelas.length > 0) {
							$http.post("models/ParcelasDAO.php",
							{'arrayParcelas':$scope.arrayParcelas,
							 'qtParcelas': $scope.Parcela.qtParcelas,
							 'funcao' : "GravarParcelas",
							 'idAluno' : $scope.Aluno.id}
							).success (function(data){
								if (data != ""){
					 				iziToast.error({
									    title: 'Erro ao Cadastrar Parcelas!',
									    position: 'topRight',
									});
					 				alert (data);
					 			}
							});
						}

						iziToast.success({
						    title: 'Aluno Editado com Sucesso!',
						    position: 'topRight',
						});
						$scope.limpaTela();
					} else {
							iziToast.error({
							    title: 'Erro ao Cadastrar!',
							    position: 'topRight',
							});
			 				alert (data);
			 		}
				});
			}
		}
	}

	//Endereço Aluno

	$scope.arrEstados = [];
	var carregaEstados = function () {
		$http.post("models/EstadoDAO.php",{'funcao' : "ListarTodos"}
		).success (function(callback){
			if (callback == ""){
 				iziToast.error({
				    title: 'Erro ao Listar Estados!',
				    position: 'topRight',
				});
 			} else {
 				$scope.arrEstados = callback;
 			}
		})
		.error (function(data){
			alert(data);
		});
	}

	$scope.arrCidades = [];	
	$scope.carregaCidades = function (Codestado) {
		var estado;
		if (Codestado == ""){
			estado = $scope.Endereco.estado;
		} else {
			estado = Codestado;
		}

		if ($scope.Endereco.estado != null && $scope.Endereco.estado != "") {
			$http.post("models/MunicipioDAO.php",{
			'Estado' : estado,
			'funcao' : "ListarCidades"
			}
			).success (function(callback){
				if (callback == ""){
	 				iziToast.error({
					    title: 'Erro ao Listar Cidades!',
					    position: 'topRight',
					});
	 			} else {
	 				$scope.arrCidades = callback;
	 			}
			})
			.error (function(data){
				alert(data);
			});
		}
	}

	carregaEstados ();

	var validaEndereco = function (){
		if ($scope.Endereco.endereco == null) $scope.Endereco.endereco = "";
		if ($scope.Endereco.complemento == null) $scope.Endereco.complemento = "";
		if ($scope.Endereco.bairro == null ) $scope.Endereco.bairro = "";
	}

	// Avaliacao

	$scope.avaAluno = {};
	var salvarAvaliacao = false;

	var carregaAvaliacoes = function () {
		$scope.arrayAvaliacoes = [];
		$http.post("models/AvaliacaoDAO.php",
		{'funcao' : "AvaliacoesAluno",'idAluno' : $scope.Aluno.id}
		).success (function(callback){
			if (callback != ""){
				$scope.arrayAvaliacoes = callback;
			}
		});
	}

	$scope.geraAvaliacao = function () {
		if ($scope.avaAluno.altura == null || $scope.avaAluno.altura == "") {
			iziToast.warning({
			    title: 'Informe a Altura!',
			    position: 'topRight',
			});
		} else if ($scope.avaAluno.peso == null || $scope.avaAluno.peso == "") {
			iziToast.warning({
			    title: 'Informe o Peso!',
			    position: 'topRight',
			});
		} else if ($scope.avaAluno.diametroPunho == null || $scope.avaAluno.diametroPunho == "") {
			iziToast.warning({
			    title: 'Informe o Diâmetro do Punho!',
			    position: 'topRight',
			});
		} else if ($scope.avaAluno.diametroJoelho == null || $scope.avaAluno.diametroJoelho == "") {
			iziToast.warning({
			    title: 'Informe o Diâmetro do Joelho!',
			    position: 'topRight',
			});
		} else if ($scope.Aluno.nascimento == null) {
			iziToast.warning({
			    title: 'Informe a Data de Nascimento do Aluno!',
			    position: 'topRight',
			});
		} else if ($scope.Aluno.sexo == null) {
			iziToast.warning({
			    title: 'Informe Sexo do Aluno!',
			    position: 'topRight',
			});
		} else {
			$scope.avaAluno.altura = $scope.avaAluno.altura.replace(",",".");
			$scope.avaAluno.peso = $scope.avaAluno.peso.replace(",", ".");
			$scope.avaAluno.diametroPunho = $scope.avaAluno.diametroPunho.replace(",", ".");
			$scope.avaAluno.diametroJoelho = $scope.avaAluno.diametroJoelho.replace(",", ".");
			
			var resultadoCalculo = 0;
			var sexo = 0;
			var anoAtual = new Date().getFullYear();
			var idadeAluno = anoAtual - ($scope.Aluno.nascimento.getFullYear());

			//IMC
			var imc = $scope.avaAluno.peso / Math.pow($scope.avaAluno.altura,2);

			//peso residual
			var pesoResidual = $scope.avaAluno.peso * 0.24;

			//Gordura Corporal
			var sexo = 0;
			$scope.Aluno.sexo == "M" ? sexo = 1 : sexo = 0;
			resultadoCalculo = (1.2 * imc) + (0.23 * idadeAluno) - (10.8 * sexo) - 5.4;
			$scope.avaAluno.gorduraCorporal = resultadoCalculo.toFixed(2);

			//Peso Gordo
			resultadoCalculo = ($scope.avaAluno.peso * $scope.avaAluno.gorduraCorporal) / 100;
			$scope.avaAluno.pesoGordo = resultadoCalculo.toFixed(2);
			
			//Peso Magro
			resultadoCalculo = $scope.avaAluno.peso - $scope.avaAluno.pesoGordo;
			$scope.avaAluno.pesoMagro = resultadoCalculo.toFixed(2);
			
			//Peso Ósseo
			resultadoCalculo = 3.02 * (Math.pow((Math.pow($scope.avaAluno.altura,2) * ($scope.avaAluno.diametroPunho * $scope.avaAluno.diametroJoelho * 400)),0.712));
			$scope.avaAluno.pesoOsseo = resultadoCalculo.toFixed(2);

			//Peso Muscular
			var pesoGordo = parseInt($scope.avaAluno.pesoGordo);
			var pesoOsseo = parseInt($scope.avaAluno.pesoOsseo);

			resultadoCalculo = pesoGordo + pesoOsseo + pesoResidual;
			resultadoCalculo =  $scope.avaAluno.peso - resultadoCalculo;
			$scope.avaAluno.pesoMuscular = resultadoCalculo.toFixed(2);
			salvarAvaliacao = true;
			iziToast.success({
			    title: 'Avaliação Realizada com Sucesso!',
			    position: 'topRight',
			});
		}
		
	}

	var validaAvaliação = function () {
		
		if ($scope.avaAluno.dtAvaliacao) {
			dataAvaliacao = $scope.avaAluno.dtAvaliacao.toISOString().slice(0,10);
		} else {
			dataAvaliacao = new Date();
			dataAvaliacao = dataAvaliacao.toISOString().slice(0,10);
		}

		if ($scope.avaAluno.bracoContraido == null || $scope.avaAluno.bracoContraido == "") $scope.avaAluno.bracoContraido = 0;
		if ($scope.avaAluno.coxa == null || $scope.avaAluno.coxa == "") $scope.avaAluno.coxa = 0;
		if ($scope.avaAluno.torax == null || $scope.avaAluno.torax == "") $scope.avaAluno.torax = 0;
		if ($scope.avaAluno.bracoRelaxado == null || $scope.avaAluno.bracoRelaxado == "") $scope.avaAluno.bracoRelaxado = 0;
		if ($scope.avaAluno.cintura == null || $scope.avaAluno.cintura == "") $scope.avaAluno.cintura = 0;
		if ($scope.avaAluno.panturrilha == null || $scope.avaAluno.panturrilha == "") $scope.avaAluno.panturrilha = 0;
		if ($scope.avaAluno.ombro == null || $scope.avaAluno.ombro == "") $scope.avaAluno.ombro = 0;
		if ($scope.avaAluno.antebraco == null || $scope.avaAluno.antebraco == "") $scope.avaAluno.antebraco = 0;

		if ($scope.avaAluno.pesoMuscular.length >= 6){
			return false;	
		} 
		else if ($scope.avaAluno.gorduraCorporal.length >= 6){
			return false;	
		} else if ($scope.avaAluno.pesoGordo.length >= 6){
			return false;	
		} else if ($scope.avaAluno.pesoMagro.length >= 6){
			return false;	
		} else if ($scope.avaAluno.pesoOsseo.length >= 6){
			return false;	
		} else {
			return true;
		}
	}


	$scope.setLinhaTabelaAvaliacaoSel = function (id) {
		avaliacaoSel = id;
	}


	$scope.isLinhaTabelaAvaliacaoSel = function (id) {
		return avaliacaoSel == id ? true : false;
	}	

	$scope.excluiAvaliacao = function () {
		if (avaliacaoSel != "" && avaliacaoSel != null) {
			$http.post("models/AvaliacaoDAO.php",{'funcao' : "Excluir", 'idAvaliacao' : avaliacaoSel}
			).success (function(data){
				if (data == ""){
					iziToast.success({
					    title: 'Avaliação Excluida com Sucesso!',
					    position: 'topRight',
					});
					carregaAvaliacoes();
	 			} else {
	 				alert (data);
	 				iziToast.error({
					    title: 'Erro ao Excluir Avaliação, Verifique a conexão com o Banco de Dados!',
					    position: 'topRight',
					});
	 			}
			})
			.error (function(data){
				alert(data);
			});
		} else {
			iziToast.error({
			    title: 'Selecione uma Avaliação!',
			    position: 'topRight',
			});
		}

	}


	// Planos

	$scope.arrPlanos = [];
	$scope.Parcela = {};

	var carregaPlanos = function () {
		$http.post("models/PlanoDAO.php",{'funcao' : "ListarAtivos"}
		).success (function(callback){
			if (callback != ""){
 				$scope.arrPlanos = callback;
 			}
		})
		.error (function(data){
			alert(data);
		});
	}
	carregaPlanos();

	$scope.atualizaValor = function () {
		$scope.Parcela.valorDesconto == null ? $scope.Parcela.valorDesconto = 0 : $scope.Parcela.valorDesconto = $scope.Parcela.valorDesconto;
		$scope.Parcela.valorTotal = ($scope.Parcela.valorMensal - $scope.Parcela.valorDesconto) * $scope.Parcela.qtParcelas;
	}

	$scope.geraParcelas = function () {
		$scope.arrayParcelas = [];
		if ($scope.Parcela.qtParcelas == null || $scope.Parcela.qtParcelas == ""){
			iziToast.warning({
			    title: 'Informe a Quantidade de Parcelas!',
			    position: 'topRight',
			});
		}
		else if ($scope.Parcela.dtInicio == null || $scope.Parcela.dtInicio == ""){
			iziToast.warning({
			    title: 'Informe a Data de Início!',
			    position: 'topRight',
			});
		}
		else if ($scope.Parcela.vencimento == null || $scope.Parcela.vencimento == ""){
			iziToast.warning({
			    title: 'Informe O Dia de Vencimento!',
			    position: 'topRight',
			});	
		}
		else if ($scope.Parcela.valorTotal == null || $scope.Parcela.valorTotal == ""){
			iziToast.warning({
			    title: 'Informe o Valor Total ou o Valor Mensal!',
			    position: 'topRight',
			});
		}
		else if ($scope.Parcela.valorMensal == null || $scope.Parcela.valorMensal == ""){
			iziToast.warning({
			    title: 'Informe o Valor Total ou o Valor Mensal!',
			    position: 'topRight',
			});
		}
		else {
			var dtVencimento = $scope.Parcela.dtInicio;
			dtVencimento = dtVencimento.toISOString().slice(0,10);
			var mes = 0;
			var valorLiquido = $scope.Parcela.valorMensal;

			if ($scope.Parcela.valorDesconto > 0) {
				valorLiquido -=  $scope.Parcela.valorDesconto;
			}

			for (var i = 1; i <= $scope.Parcela.qtParcelas; i++) {
				$scope.arrayParcelas.push({
					parcela : i,
					vencimento: dtVencimento,
					status: "A", 
					valor: valorLiquido, 
					vDesconto: $scope.Parcela.valorDesconto / $scope.Parcela.qtParcelas, 
					vBruto: $scope.Parcela.valorMensal
				});
				dtVencimento = $scope.Parcela.dtInicio;
				dtVencimento.setDate($scope.Parcela.vencimento);
				mes = dtVencimento.getMonth();
				dtVencimento.setMonth(mes + 1);
				dtVencimento = dtVencimento.toISOString().slice(0,10);
			}
			iziToast.success({
			    title: 'Parcelas Geradas com Sucesso!',
			    position: 'topRight',
			});
		}
	}

	//editar
	var carregaAluno = function () {
		if ($rootScope.AlunoSel != null && $rootScope.AlunoSel != "") {
			edita = true;
			$scope.Aluno = $rootScope.AlunoSel;
			$scope.Aluno.nascimento = new Date($rootScope.AlunoSel.nascimento);
			if ($scope.Aluno.status != "Ativo"){
				$scope.Aluno.status = "true";
			} else {
				$scope.Aluno.status = "false";
			}	

			//carrega Endereço
			$http.post("models/EnderecoAlunoDAO.php",
			{'funcao' : "Listar",'idAluno' : $scope.Aluno.id}
			).success (function(callback){
				if (callback == ""){
					iziToast.error({
					    title: 'Erro ao Carregar Endereço!',
					    position: 'topRight',
					});
	 			} else {
	 				$scope.Endereco.cep = callback.endalu_cep;
	 				$scope.Endereco.complemento = callback.endalu_complemento;
	 				$scope.Endereco.bairro = callback.endalu_bairro;
	 				$scope.Endereco.endereco = callback.endalu_endereco;
					carregaEstados();
					$http.post("models/MunicipioDAO.php",{
					'Codigo' : callback.muni_cod,
					'funcao' : "BuscaEstadoCod"
					}
					).success (function(Estacod){
						if (Estacod == ""){
			 				iziToast.error({
							    title: 'Erro ao Listar Estado!',
							    position: 'topRight',
							});
			 			} else {
			 				$scope.Endereco.estado = Estacod.esta_cod;
							$scope.carregaCidades(Estacod.esta_cod);
			 			}
					})
					.error (function(data){
						alert(data);
					});
	 				$scope.Endereco.cidade = callback.muni_cod;
	 			}

			});

			//carrega Contatos
			$http.post("models/AlunoContatoDAO.php",
			{'funcao' : "Listar",'idAluno' : $scope.Aluno.id}
			).success (function(callback){
				if (callback != ""){
					for (var i = 0 ; i < callback.length; i++) {
						$scope.arrayContatos.push({
			    			id : callback[i].alucon_id,
				    		descricao : callback[i].alucon_descricao, 
							numero: callback[i].alucon_numero,
							email : callback[i].alucon_email
						});
					}
				}	
			});
		
			//Avaliações
			carregaAvaliacoes();
		}
	}


	carregaAluno();
	
	$scope.buscaAluno = function (){
		$rootScope.ProximaRota = "/viewAluno";
		$location.path("/buscaAluno");
		if ($scope.Aluno.id != null && $scope.Aluno.id != "") {
			$rootScope.filtro = $scope.Aluno.id;
		}
			 
	}

});