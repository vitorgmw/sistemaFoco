<?php	
  
  $path = $_SERVER['DOCUMENT_ROOT'].'/SistemaFoco';
  include("$path/models/biblioteca/conexaobd.php");

  $Estado = json_decode(file_get_contents("php://input"));  
  $funcao = $Estado->funcao;

  switch ($funcao){
    case "ListarTodos":
      $arrEstado = Array();
      $resultado = pg_query ("select * from Estado;");
      while ($obj = pg_fetch_object($resultado)) {
          array_push($arrEstado, $obj);
      }
      echo json_encode($arrEstado);
  }

?>