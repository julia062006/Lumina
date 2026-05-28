import Swal from "sweetalert2";

export function criarFormData(campos) {
    const formData = new FormData();
    Object.entries(campos).forEach(([chave, valor]) => {
        if (valor !== null && valor !== undefined) {
            formData.append(chave, valor);
        }
    });
    return formData;
}

export function alertaSucesso(mensagem) {
    return Swal.fire({ icon: "success", title: mensagem });
}

export function alertaErro(mensagem) {
    return Swal.fire({ icon: "error", title: mensagem });
}

export function alertaConfirmacao(mensagem = "Esta ação não poderá ser desfeita.") {
    return Swal.fire({
        title: "Tem certeza?",
        text: mensagem,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, excluir",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#d33",
    });
}

export function tratarErrosResposta(resposta, setError) {
    if (resposta.data.erros) {
        resposta.data.erros.forEach((erro) =>
            setError(erro.path, { type: "server", message: erro.msg })
        );
    } else if (resposta.data.mensagem) {
        alertaErro(resposta.data.mensagem);
    }
}