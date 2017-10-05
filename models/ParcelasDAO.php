<?php	
  
  $path = $_SERVER['DOCUMENT_ROOT'].'/SistemaFoco';
  include("$path/models/biblioteca/conexaobd.php");

  $Parcela = json_decode(file_get_contents("php://input"));  
  $funcao = $Parcela->funcao;

  switch ($funcao){
    case "GravarParcelas":
      for ($i = 0; $i < $Parcela->qtParcelas; $i++) {
        $query = "insert into parcelas (parc_emissao, parc_vencimento, parc_status, parc_pagamento, parc_valorliquido,".
        "parc_valorjurosmulta, parc_valordesconto, alu_matricula, parc_valorbruto)".
        " values (current_date,'".$Parcela->arrayParcelas[$i]->vencimento."','".$Parcela->arrayParcelas[$i]->status."',null,".
        $Parcela->arrayParcelas[$i]->valor.",null,".$Parcela->arrayParcelas[$i]->vDesconto.",".$Parcela->idAluno.",".
        $Parcela->arrayParcelas[$i]->vBruto.");";
        $result = pg_query ($query);
      }
      return $result;
    
    case "ListarParcelasAluno":
      $arrParcelas = Array();
      $result = pg_query ("select * from parcelas where alu_matricula = ".$Parcela->idAluno." ;");
      while ($obj = pg_fetch_object($result)) {
          array_push($arrParcelas, $obj);
      }
      echo json_encode($arrParcelas);
      break;

    case "ListarParcelasAbertasAluno":
      $arrParcelas = Array();
      $result = pg_query ("select * from parcelas where alu_matricula = ".$Parcela->idAluno." and parc_status = 'A' ;");
      while ($obj = pg_fetch_object($result)) {
          array_push($arrParcelas, $obj);
      }
      echo json_encode($arrParcelas);
      break;

    case "BaixarParcela":
      $query = "update parcelas set parc_status = 'P', parc_pagamento = current_date, parc_valorliquido =".
      $Parcela->vLiquido.", parc_valorjurosmulta = ".$Parcela->vJurosMulta.", parc_valordesconto =".
      $Parcela->vDesconto." where parc_cod =".$Parcela->codigoParcela.";";
      $result = pg_query ($query);
      return $result;

    case "MovimentosAluno":
      $arrParcelas = Array();
      $query = "select parc_cod,parc_emissao,parc_status,parc_pagamento,parc_valorliquido,parc_valorjurosmulta,".
      "parc_valordesconto,parc_valorbruto,parc_vencimento, a.alu_nome from parcelas p inner join aluno a on p.alu_matricula = ".
      $Parcela->idAluno." and a.alu_matricula = ".$Parcela->idAluno." and parc_status = 'P';";
      $result = pg_query ($query);
      while ($obj = pg_fetch_object($result)) {
          array_push($arrParcelas, $obj);
      }
      echo json_encode($arrParcelas);
      break;

    case "MovimentosDia":
      $arrParcelas = Array();
      $query = "select parc_cod,parc_emissao,parc_status,parc_pagamento,parc_valorliquido,parc_valorjurosmulta,".
      "parc_valordesconto,parc_valorbruto,parc_vencimento, a.alu_nome from parcelas p inner join aluno a on ".
      "p.alu_matricula = a.alu_matricula and parc_status = 'P' and parc_pagamento= current_date ;";
      $result = pg_query ($query);
      while ($obj = pg_fetch_object($result)) {
          array_push($arrParcelas, $obj);
      }
      echo json_encode($arrParcelas);
      break;
    case "RealatorioHistoricoTodos":
      $arrParcelas = Array();
      $query = "select * from parcelas where alu_matricula = ".$Parcela->idAluno." and parc_emissao between '".
      $Parcela->dtInicial."' and '".$Parcela->dtFinal."';";
      $result = pg_query ($query);
      while ($obj = pg_fetch_object($result)) {
          array_push($arrParcelas, $obj);
      }
      echo json_encode($arrParcelas);
      break;

    case "RelatorioHistorico":
      $arrParcelas = Array();
      $query = "select * from parcelas where alu_matricula = ".$Parcela->idAluno." and parc_status = '".$Parcela->status."' ".
      " and parc_emissao between '".$Parcela->dtInicial."' and '".$Parcela->dtFinal."';";
      $result = pg_query ($query);
      while ($obj = pg_fetch_object($result)) {
          array_push($arrParcelas, $obj);
      }
      echo json_encode($arrParcelas);
      break;

    case "RelatorioHistoricoVencidas":
      $arrParcelas = Array();
      $query = "select * from parcelas where alu_matricula = ".$Parcela->idAluno." and parc_status = 'A' ".
      " and parc_emissao between '".$Parcela->dtInicial."' and '".$Parcela->dtFinal."' and parc_vencimento < current_date;";
      $result = pg_query ($query);
      while ($obj = pg_fetch_object($result)) {
          array_push($arrParcelas, $obj);
      }
      echo json_encode($arrParcelas);
      break;
      

    case "RealatorioStatus":
      $arrParcelas = Array();
      $query = "select * from parcelas where alu_matricula = ".$Parcela->idAluno." and parc_emissao between '".
      $Parcela->dtInicial."' and '".$Parcela->dtFinal."';";
      $result = pg_query ($query);
      while ($obj = pg_fetch_object($result)) {
          array_push($arrParcelas, $obj);
      }
      echo json_encode($arrParcelas);
      break;
  }

?>