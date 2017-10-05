<?php	
  
  $path = $_SERVER['DOCUMENT_ROOT'].'/SistemaFoco';
  include("$path/models/biblioteca/conexaobd.php");


  $Contato = json_decode(file_get_contents("php://input"));  
  $funcao = $Contato->funcao;

  switch ($funcao){

    case "Salvar":
      for ($i = 0; $i < $Contato->qtContatos; $i++) {
        $query = "insert into AlunoContato (alu_matricula, alucon_descricao, alucon_numero, alucon_email)".
        "values (".$Contato->idAluno.",'".$Contato->arrayContatos[$i]->descricao."','".$Contato->arrayContatos[$i]->numero."','".$Contato->arrayContatos[$i]->email."');";
        $resultado = pg_query ($query);
      }
      return $resultado;

    case "Editar": 
      $resultado = pg_query ("delete from AlunoContato where alu_matricula = ".$Contato->idAluno.";"); 
      for ($i = 0; $i < $Contato->qtContatos; $i++) {
        $query = "insert into AlunoContato (alu_matricula, alucon_descricao, alucon_numero, alucon_email)".
        "values (".$Contato->idAluno.",'".$Contato->arrayContatos[$i]->descricao."','".$Contato->arrayContatos[$i]->numero."','".$Contato->arrayContatos[$i]->email."');";
        $resultado = pg_query ($query);
      }
      return $resultado;
    
    case "Listar":
      $arrContatos = Array();
      $resultado = pg_query ("select * from alunocontato where alu_matricula = ".$Contato->idAluno.";");
      while ($obj = pg_fetch_object($resultado)) {
          array_push($arrContatos, $obj);
      }
      echo json_encode($arrContatos);
      break;
  }
?>