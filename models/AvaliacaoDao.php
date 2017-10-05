<?php	
  
  $path = $_SERVER['DOCUMENT_ROOT'].'/SistemaFoco';
  include("$path/models/biblioteca/conexaobd.php");

  $Avaliacao = json_decode(file_get_contents("php://input"));  
  $funcao = $Avaliacao->funcao;


  switch ($funcao){
    case "Salvar":
      $query = "insert into avaliacao (ava_peso, ava_antebraco, ava_torax, ava_diametroPunho, ava_ombro, ava_bracoContraido, ava_cintura, ava_coxa, ava_bracoRelaxado, ava_diametroJoelho, ava_panturrilha, ava_gorduraCorporal, ava_data, ava_pesoGordo, ava_pesoMagro, ava_pesoOsseo, ava_pesoMuscular, alu_matricula, ava_altura)".
        "values (".$Avaliacao->avaAluno->peso.",".$Avaliacao->avaAluno->antebraco.",".$Avaliacao->avaAluno->torax.",".
      $Avaliacao->avaAluno->diametroPunho.",".$Avaliacao->avaAluno->ombro.",".$Avaliacao->avaAluno->bracoContraido.",".$Avaliacao->avaAluno->cintura.",".$Avaliacao->avaAluno->coxa.",".$Avaliacao->avaAluno->bracoRelaxado.",".$Avaliacao->avaAluno->diametroJoelho.",".$Avaliacao->avaAluno->panturrilha.",".$Avaliacao->avaAluno->gorduraCorporal.",'".$Avaliacao->dataAvaliacao."',".$Avaliacao->avaAluno->pesoGordo.",".$Avaliacao->avaAluno->pesoMagro.",".$Avaliacao->avaAluno->pesoOsseo.",".$Avaliacao->avaAluno->pesoMuscular.",".$Avaliacao->idAluno.",".$Avaliacao->avaAluno->altura.");";
      $resultado = pg_query ($query);
      return $resultado;

    case "AvaliacoesAluno":
      $arrAvaliacoes = Array();
      $resultado = pg_query ("select * from avaliacao where alu_matricula = ".$Avaliacao->idAluno." order by ava_data;");
      while ($obj = pg_fetch_object($resultado)) {
          array_push($arrAvaliacoes, $obj);
      }
      echo json_encode($arrAvaliacoes);
      break;

    case "AvaliacoesAlunoData":
      $arrAvaliacoes = Array();
      $resultado = pg_query ("select * from avaliacao where alu_matricula = ".$Avaliacao->idAluno." and ava_data between".
      "'".$Avaliacao->dtInicial."' and '".$Avaliacao->dtFinal."'order by ava_data;");
      while ($obj = pg_fetch_object($resultado)) {
          array_push($arrAvaliacoes, $obj);
      }
      echo json_encode($arrAvaliacoes);
      break;

    case "ListaPrimeiraAvaliacao":
      $query = "select min(ava_cod) from avaliacao where alu_matricula = ".$Avaliacao->idAluno.";";
      $primeiraAvaliacao = pg_query($query);
      $id = pg_fetch_object($primeiraAvaliacao);
      if ($id == "") $id = 0; 
      $query = "select * from avaliacao where ava_cod = ".$id->min.";";
      $resultado = pg_query($query);
      $resultado = pg_fetch_object($resultado);
      echo json_encode($resultado);
      break;
    case "ListaUltimaAvaliacao":  
      $query = "select max(ava_cod) from avaliacao where alu_matricula = ".$Avaliacao->idAluno.";";
      $ultimaAvaliacao = pg_query($query);
      $id = pg_fetch_object($ultimaAvaliacao);
      $query = "select * from avaliacao where ava_cod = ".$id->max.";";
      $resultado = pg_query($query);
      $resultado = pg_fetch_object($resultado);
      echo json_encode($resultado);
      break;

    case "Excluir":
      $resultado = pg_query ("delete from avaliacao where ava_cod = ".$Avaliacao->idAvaliacao.";"); 
      return $resultado;
      break;
  }

?>