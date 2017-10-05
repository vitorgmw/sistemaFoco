APP.controller("relatorioStatusController", function($scope, $rootScope, $location, $http){
    
	$scope.abaAtual = "Filtros";
	var dataInicial;
	var dataFinal;
    var totalAberto = 0;
    var totalVencido= 0;
    var totalPago = 0;
    var porcAberto = 0;
    var porcVencido = 0;
    var porcPago = 0;
    var total = 0;
    var data = "";

	var setAbaAtual = function (aba) {
		$scope.abaAtual = aba;
	}

	$scope.isAbaAtual = function (aba) {
		return $scope.abaAtual == aba ? true : false;
	}

	$scope.limpaTela = function () {
        $rootScope.AlunoSel = null;
		$scope.dtInicial = "";
		$scope.dtFinal = "";
		$scope.Aluno = {};
		$scope.abaAtual = "Filtros";
        totalAberto = 0;
        totalVencido= 0;
        totalPago = 0;
        porcAberto = 0;
        porcVencido = 0;
        porcPago = 0;
        total = 0;
	}

	var formataData = function (dtInicial, dtFinal) {
		dataInicial = new Date(dtInicial);
		dataInicial = dataInicial.toISOString().slice(0,10);
		dataFinal = new Date(dtFinal);
		dataFinal = dataFinal.toISOString().slice(0,10);
	}

	$scope.buscaAluno = function (){
		$rootScope.ProximaRota = "/relatorioStatus";
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

    var calculaValoresRelatorio = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            data = new Date(arr[i].parc_vencimento);
            arr[i].parc_valorliquido = parseInt(arr[i].parc_valorliquido);
            if (arr[i].parc_status == "A" && data < new Date()) {
                totalVencido += arr[i].parc_valorliquido;
            }else if (arr[i].parc_status == "A" && data >= new Date()) {
                totalAberto += arr[i].parc_valorliquido;
            } else if (arr[i].parc_status == "P") {
                totalPago += arr[i].parc_valorliquido;
            }   
        }
        total = totalVencido + totalPago + totalAberto;
        porcPago = (total / 100) * totalPago;
        porcVencido = (total / 100) * totalVencido;
        porcAberto = (total / 100) * totalAberto;
        
    }

    var formataData = function (dtInicial, dtFinal) {
        dataInicial = new Date(dtInicial);
        dataInicial = dataInicial.toISOString().slice(0,10);
        dataFinal = new Date(dtFinal);
        dataFinal = dataFinal.toISOString().slice(0,10);
    }

	$scope.geraRelatorio = function () {
        formataData($scope.dtInicial, $scope.dtFinal);
        $http.post("models/parcelasDAO.php",{
            'idAluno' : $scope.Aluno.id,
            'dtInicial' : dataInicial,
            'dtFinal' : dataFinal,
            'funcao' : "RealatorioStatus"}
        ).success (function(callback){
            if (callback == ""){
                iziToast.warning({
                    title: 'Nenhum Resultado Encontrado com os Filtros Informados!',
                    position: 'topRight',
                });
            } else {
                setAbaAtual("Relatorio");
                calculaValoresRelatorio(callback);
                Highcharts.chart('graficoStatus', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Status Financeiro'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true
                        }
                    },
                    series: [{
                        name: 'Porcentagem',
                        colorByPoint: true,
                        data: [{
                            name: 'Em Aberto',
                            y: porcAberto,
                            valor : totalAberto,
                            color: '#4682B4'
                        }, {
                            name: 'Vencido',
                            y: porcVencido,
                            valor : totalVencido,
                            sliced: true,
                            selected: true,
                            color: '#FF0000'
                        }, {
                            name: 'Pago',
                            y: porcPago,
                            valor : totalPago,
                            color: '#008000'
                        }]
                    }]
                });

            }
        })
        .error (function(data){
            alert(data);
        });
	}

});

