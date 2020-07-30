function identifyLovers() {
    event.informacoesCorretas();
    if ($("#_loversInvolved").val().length <=10) {
      $("#_loversInvolved").focus();
      alert("Número Inválido");
      return;
    }
  
    if (!$("#_party").val().startsWith("0x")) {
      alert("Endereço inválido");
      $("#_endereco").focus();
      return;
    }
  
    if ($("#_name").val().length < 5) {
      alert("Nome inválido");
      $("#_name").focus();
      return;
    }
  
    if (typeof contratoComSignatario === "undefined") {
      alert("Você não está conectado ao Ethereum. Verifique seu Metamask");
      return;
    }

    contratoComSignatario
    .commitment($("#_loverId").val(), $("#_consent1").val(), $("#_consent2").val())
    .then((transacao) => {
      $("#descricaoStatusTransacoes").html("Transação enviada. Aguarde pela mineração...");
      $("#statusTransacoes").toggle();
      transacao
        .wait()
        .then((resultado) => {
          console.log("commitment - o resultado foi ", resultado);
          if (resultado.status === 1) {
            $("#descricaoStatusTransacoes").html("Transação executada.");
          } else {
            $("#descricaoStatusTransacoes").html("Houve um erro na execução da transação no Ethereum.");
          }
        })
        .catch((err) => {
          console.error("registraImovel - a transação foi minerada e houve um erro. Veja abaixo");
          console.error(err);
          $("#descricaoStatusTransacoes").html("Algo saiu errado: " + err.message);
        });
    })
    .catch((err) => {
      console.error("commitment - tx só foi enviada");
      console.error(err);
      $("#descricaoStatusTransacoes").html("Algo saiu errado antes de enviar ao Ethereum: " + err.message);
    });
}