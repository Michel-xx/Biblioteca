(() => {
    const biblioteca = window.Biblioteca;

    /* Exclui um aluno e os vínculos associados após confirmação. */
    biblioteca.excluirAluno = (aluno) => {
        if (!window.confirm(`Excluir ${aluno.nome} e os vínculos associados?`)) return;

        const indice = biblioteca.alunos.findIndex((registro) => registro.matricula === aluno.matricula);
        if (indice === -1) return;

        const vinculosDoAluno = biblioteca.vinculos.filter((vinculo) => vinculo.matricula === aluno.matricula);
        biblioteca.arquivarVinculos(vinculosDoAluno);
        biblioteca.alunos.splice(indice, 1);
        biblioteca.vinculos = biblioteca.vinculos.filter((vinculo) => vinculo.matricula !== aluno.matricula);
        biblioteca.salvarAlunos();
        biblioteca.salvarVinculos();
        biblioteca.atualizarListas();
    };

    /* Configura o formulário de cadastro e impede matrículas repetidas. */
    biblioteca.inicializarAlunos = () => {
        /* Valida os dados, salva o aluno e atualiza a interface ao enviar. */
        document.querySelector("#form-aluno").addEventListener("submit", (evento) => {
            evento.preventDefault();
            const formulario = evento.currentTarget;
            const dados = new FormData(formulario);
            const matricula = dados.get("matricula").trim();
            const status = document.querySelector("#status-aluno");

            if (biblioteca.alunos.some((aluno) => aluno.matricula === matricula)) {
                status.textContent = "Já existe um aluno com essa matrícula.";
                return;
            }

            biblioteca.alunos.push({ nome: dados.get("nome").trim(), matricula });
            biblioteca.salvarAlunos();
            status.textContent = "";
            formulario.reset();
            biblioteca.atualizarListas();
        });
    };
})();
