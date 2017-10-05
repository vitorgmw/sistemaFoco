<?php	
  
  $path = $_SERVER['DOCUMENT_ROOT'].'/SistemaFoco';
  include("$path/models/biblioteca/conexaobd.php");


  $Plano = json_decode(file_get_contents("php://input"));  
  $funcao = $Plano->funcao;

  switch ($funcao){

    case "Salvar":
      $query = "insert into plano (plan_descricao, plan_ativo, plan_dias, plan_qtparcelas, plan_valor, plan_diavencimento)".
      "values ('".$Plano->plano->descricao."',".$Plano->plano->status.",".$Plano->plano->qtDias.",".$Plano->plano->qtParcelas.",".$Plano->plano->valorTotal.",".$Plano->plano->vencimento.");";
      $resultado = pg_query ($query);
      return $resultado;

    case "Editar":
      $query = "update plano  set plan_descricao = '".$Plano->plano->descricao."',plan_ativo = ".$Plano->plano->status.",".
      "plan_dias = ".$Plano->plano->qtDias.", plan_qtparcelas = ".$Plano->plano->qtParcelas.", plan_valor = ".$Plano->plano->valorTotal.", plan_diavencimento = ".$Plano->plano->vencimento." where plan_cod = ".$Plano->idPlano.";";
      $resultado = pg_query($query);
      return $resultado;

    case "ListarTodos":
      $arrPlanos = Array();
      $resultado = pg_query ("select * from plano order by plan_descricao;");
      while ($obj = pg_fetch_object($resultado)) {
          array_push($arrPlanos, $obj);
      }
      echo json_encode($arrPlanos);
      break;

    case "ListarAtivos":
      $arrPlanos = Array();
      $resultado = pg_query ("select * from plano where plan_ativo = true order by plan_descricao;");
      while ($obj = pg_fetch_object($resultado)) {
          array_push($arrPlanos, $obj);
      }
      echo json_encode($arrPlanos);
      break;
    
    case "PlanoAluno":
      $result = pg_query ("select plan_cod from plano where plan_cod = ".$Plano->idPlano.";");
      $result = pg_fetch_object($result); 
      echo json_encode($result);
      break;
  }
?>