<?php	
  
  $path = $_SERVER['DOCUMENT_ROOT'].'/SistemaFoco';
  include("$path/models/biblioteca/conexaobd.php");

  $Endereco = json_decode(file_get_contents("php://input"));  
  $funcao = $Endereco->funcao;

  switch ($funcao){
    case "Salvar":
      $query = "insert into EnderecoAluno (Alu_Matricula, EndAlu_Cep, EndAlu_Endereco, EndAlu_Complemento, EndAlu_Bairro,".
      "Muni_Cod) values (".$Endereco->idAluno.",'".$Endereco->Endereco->cep."','".$Endereco->Endereco->endereco."',".
      "'".$Endereco->Endereco->complemento."','".$Endereco->Endereco->bairro."',".$Endereco->Cidade.");";
      $resultado = pg_query ($query);
      return $resultado;

    case "Listar":
      $query = "select * from enderecoaluno where alu_matricula = ".$Endereco->idAluno.";";
      $resultado = pg_query($query);
      $resultado = pg_fetch_object($resultado);
      echo json_encode($resultado);
      break;

    case "Editar":
      $resultado = pg_query("select * from EnderecoAluno where alu_matricula = ".$Endereco->idAluno.";");
      if (pg_num_rows($resultado) == 0){
        $query = "insert into EnderecoAluno (Alu_Matricula, EndAlu_Cep, EndAlu_Endereco, EndAlu_Complemento, EndAlu_Bairro,".
        "Muni_Cod) values (".$Endereco->idAluno.",'".$Endereco->Endereco->cep."','".$Endereco->Endereco->endereco."',".
        "'".$Endereco->Endereco->complemento."','".$Endereco->Endereco->bairro."',".$Endereco->Cidade.");";
        $resultado = pg_query ($query);
      } else {
        $query = "update EnderecoAluno set EndAlu_Cep = '".$Endereco->Endereco->cep."', EndAlu_Endereco = '".
        $Endereco->Endereco->endereco."', EndAlu_Complemento = '".$Endereco->Endereco->complemento."',".
        "EndAlu_Bairro = '".$Endereco->Endereco->bairro."', Muni_Cod =".$Endereco->Cidade." where alu_matricula = ".
        $Endereco->idAluno.";";
      }
      $resultado = pg_query ($query);
      return $resultado;
      
  }

?>