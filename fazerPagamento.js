function fazerPagamento() {
    var amount = document.frmPayment.amount.value;
    if (amount < 500) {
        alert("You must pay a minimum of 500 wei to the Contract");
        return false;
    }
    var motivation = document.frmPayment.motivation.value;
    var boxCommStatus = document.getElementById("boxCommStatus");
    boxCommStatus.innerHTML = "Sending transaction...";
    var additionalSettings = {
        value: ethers.utils.parseUnits(amount, 'wei')
    };
    contractWithSigner.pay(motivation, additionalSettings)
        .then((tx) => {
            console.log("fazerPagamento - Transaction ", tx);
            boxCommStatus.innerHTML = "Transaction sent. Waiting for the result...";
            tx.wait()
                .then((resultFromContract) => {
                    console.log("fazerPagamento - the result was ", resultFromContract);
                    getContractBalance();
                    boxCommStatus.innerHTML = "Transaction executed.";
                })
                .catch((err) => {
                    console.error("fazerPagamento - after tx being mint");
                    console.error(err);
                    boxCommStatus.innerHTML = "Algo saiu errado: " + err.message;
                });
        })
        .catch((err) => {
            console.error("fazerPagamento - tx has been sent");
            console.error(err);
            boxCommStatus.innerHTML = `Something went wrong: ${err.message}`;
        });

    function buscarDadosDoContratoInteligente() {
        contratoComSignatario
            .name()
            .then((resultado) => {
                console.log("O nome de um dos namorados é ", resultado);
                $("#name1").html(resultado);
            })
            .catch((err) => {
                console.error("Houve um erro ", err);
            });
        contratoComSignatario
            .party()
            .then((resultado) => {
                console.log("A carteira de um dos namorados é ", resultado);
                $("#party1").html(resultado);
            })
            .catch((err) => {
                console.error("Houve um erro ", err);
            });

        $("#confirmStatus").show();
        $("#consentimento").hide();
        $("#areaAdvgado").hide();
    };
}
