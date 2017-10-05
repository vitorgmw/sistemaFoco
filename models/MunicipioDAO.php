<?php	
  
  $path = $_SERVER['DOCUMENT_ROOT'].'/SistemaFoco';
  include("$path/models/biblioteca/conexaobd.php");

  $Cidade = json_decode(file_get_contents("php://input"));  
  $funcao = $Cidade->funcao;

  switch ($funcao){
    case "ListarCidades":
      $arrCidades = Array();
      $resultado = pg_query ("select * from Municipio where esta_cod = ".$Cidade->Estado.";");
      while ($obj = pg_fetch_object($resultado)) {
          array_push($arrCidades, $obj);
      }
      echo json_encode($arrCidades);
      break;
    case "BuscaEstadoCod":
      $resultado = pg_query ("select esta_cod from Municipio where muni_cod = ".$Cidade->Codigo.";");
      $resultado = pg_fetch_object($resultado);
      echo  json_encode($resultado);
      break;
  }

?>