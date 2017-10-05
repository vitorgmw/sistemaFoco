<?php	
  
  $path = $_SERVER['DOCUMENT_ROOT'].'/SistemaFoco';
  include("$path/models/biblioteca/conexaobd.php");

  $Aluno = json_decode(file_get_contents("php://input"));  
  $funcao = $Aluno->funcao;

  switch ($funcao){
    case "Salvar":
      $query = "insert into aluno (alu_nome, alu_nascimento, alu_ativo, alu_cpf, alu_rg, plan_cod,alu_sexo,alu_dtcadastro)".
      "values ('".$Aluno->Aluno->nome."','".$Aluno->dataNascimento."',".$Aluno->Aluno->status.",'".
      $Aluno->Aluno->cpf."','".$Aluno->Aluno->rg."',".$Aluno->Plano.",'".$Aluno->Aluno->sexo."',current_date);";
      $resultado = pg_query ($query);
      return $resultado;

    case "Editar":
      $query = "update aluno set alu_nome = '".$Aluno->Aluno->nome."', alu_nascimento = '".$Aluno->dataNascimento.
      "', alu_ativo = ".$Aluno->Aluno->status.", alu_cpf = '".$Aluno->Aluno->cpf."', alu_rg = '".$Aluno->Aluno->rg.
      "', plan_cod = ".$Aluno->Plano.",alu_sexo = '".$Aluno->Aluno->sexo."',alu_dtcadastro = current_date where".
      " alu_matricula = ".$Aluno->Aluno->id.";";
      $resultado = pg_query ($query);
      return $resultado;

    case "RealatorioAlunos":
      $arrAlunos = Array();
      $resultado = pg_query ("select * from aluno where alu_ativo = '".$Aluno->status."' and alu_dtcadastro ".
      " between '".$Aluno->dtInicial."' and '".$Aluno->dtFinal."' order by alu_nome;");
      while ($obj = pg_fetch_object($resultado)) {
          array_push($arrAlunos, $obj);
      }
      echo json_encode($arrAlunos);
      break;

    case "RealatorioAlunosTodos":
      $arrAlunos = Array();
      $resultado = pg_query ("select * from aluno where alu_dtcadastro between '".$Aluno->dtInicial."' and '".
      $Aluno->dtFinal."' order by alu_nome;");
      while ($obj = pg_fetch_object($resultado)) {
          array_push($arrAlunos, $obj);
      }
      echo json_encode($arrAlunos);
      break;

    case "ListarTodos":
      $arrAlunos = Array();
      $resultado = pg_query ("select * from aluno order by alu_matricula;");
      while ($obj = pg_fetch_object($resultado)) {
          array_push($arrAlunos, $obj);
      }
      echo json_encode($arrAlunos);
      break;

    case "ListarAtivos":
      $arrAlunos = Array();
      $resultado = pg_query ("select * from aluno where alu_ativo = true order by alu_matricula;");
      while ($obj = pg_fetch_object($resultado)) {
          array_push($arrAlunos, $obj);
      }
      echo json_encode($arrAlunos);
      break;

    case "idAlunoCadastrado":
      $query = "select max(alu_matricula) from aluno";
      $resultado = pg_query($query);
      $id = pg_fetch_object($resultado);
      echo ($id->max);
      break; 
  }

?>