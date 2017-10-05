var APP = angular.module('app',['ngRoute']);

  	APP.config(function ($routeProvider) {
		$routeProvider
		.when('/cadastros',{
			templateUrl:'templates/viewCadastros.html',
		})
		.when('/viewAluno',{
		 	templateUrl:'templates/viewAluno.html',
		 	controller:'alunoController'
		})
		.when('/resultadoAluno',{
		 	templateUrl:'templates/viewResultadoAluno.html',
		 	controller:'resultadoController'
		})
		.when('/buscaAluno',{
		 	templateUrl:'templates/viewBuscaPadrao.html',
		 	controller:'buscaController'
		})
		.when('/cadastroPlano',{
		 	templateUrl:'templates/viewCadastroPlano.html',
		 	controller:'planoController'
		})
		.when('/baixaParcelas',{
		 	templateUrl:'templates/viewBaixaParcelas.html',
		 	controller: 'baixaController'
		})
		.when('/financeiro',{
		 	templateUrl:'templates/viewFinanceiro.html'
		})
		.when('/movimentoFinanceiro',{
		 	templateUrl:'templates/viewMovimentoFinanceiro.html',
		 	controller: 'movimentoFinanceiroController'
		})
		.when('/relatorios',{
		 	templateUrl:'templates/viewRelatorios.html',
		})
		.when('/relatorioAlunos',{
		 	templateUrl:'templates/viewRelatorioAlunos.html',
		 	controller: 'relatorioAlunosController'
		})
		.when('/relatorioHistoricoFinanceiro',{
		 	templateUrl:'templates/viewRelatorioHistoricoFinanceiro.html',
		 	controller: 'relatorioHistoricoFinanceiroController'
		})
		.when('/relatorioStatus',{
		 	templateUrl:'templates/viewRelatorioStatus.html',
		 	controller: 'relatorioStatusController'
		})
		.when('/relatorioResultados',{
		 	templateUrl:'templates/viewRelatorioResultados.html',
		 	controller: 'relatorioResultadosController'
		})
		.otherwise ({ redirectTo: '/' });
	});