(() => {
    const biblioteca = window.Biblioteca;

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
