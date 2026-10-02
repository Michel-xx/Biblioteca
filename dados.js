/* Prepara os dados compartilhados pelos módulos da biblioteca. */
(() => {
    const biblioteca = window.Biblioteca = window.Biblioteca || {};

    /* Recupera do armazenamento local as listas de alunos, livros e vínculos. */
    biblioteca.alunos = JSON.parse(localStorage.getItem("alunos") || "[]");
    biblioteca.livros = JSON.parse(localStorage.getItem("livros") || "[]");
    biblioteca.vinculos = JSON.parse(localStorage.getItem("vinculos") || "[]");
    biblioteca.historico = JSON.parse(localStorage.getItem("historico") || "[]");

    /* Cria um identificador único para cada livro cadastrado. */
    biblioteca.criarId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    /* Salva cada tipo de cadastro em uma chave própria do navegador. */
    biblioteca.salvarAlunos = () => localStorage.setItem("alunos", JSON.stringify(biblioteca.alunos));
    biblioteca.salvarLivros = () => localStorage.setItem("livros", JSON.stringify(biblioteca.livros));
    biblioteca.salvarVinculos = () => localStorage.setItem("vinculos", JSON.stringify(biblioteca.vinculos));
    biblioteca.salvarHistorico = () => localStorage.setItem("historico", JSON.stringify(biblioteca.historico));

    /* Remove apenas um item do histórico ou limpa todo o histórico de vínculos. */
    biblioteca.excluirHistorico = (registro) => {
        if (!registro) return;
        biblioteca.historico = biblioteca.historico.filter((item) => item !== registro);
        biblioteca.salvarHistorico();
        biblioteca.atualizarListas();
    };
    biblioteca.limparHistorico = () => {
        if (!window.confirm("Excluir todo o histórico de vínculos?")) return;
        biblioteca.historico = [];
        biblioteca.salvarHistorico();
        biblioteca.atualizarListas();
    };

    /* Arquiva uma cópia dos vínculos com os nomes e a data de encerramento. */
    biblioteca.arquivarVinculos = (vinculos) => {
        const encerradoEm = new Date().toISOString();

        vinculos.forEach((vinculo) => {
            const aluno = biblioteca.alunos.find((registro) => registro.matricula === vinculo.matricula);
            const livro = biblioteca.livros.find((registro) => registro.id === vinculo.livroId);

            biblioteca.historico.unshift({
                nomeAluno: aluno ? aluno.nome : "Aluno removido",
                matricula: vinculo.matricula,
                tituloLivro: livro ? livro.titulo : "Livro removido",
                autorLivro: livro ? livro.autor : "",
                pegoEm: vinculo.pegoEm || new Date().toISOString(),
                encerradoEm
            });
        });

        if (vinculos.length > 0) biblioteca.salvarHistorico();
    };

    /* Adiciona IDs aos livros antigos para que possam ser vinculados individualmente. */
    let livrosAtualizados = false;
    biblioteca.livros.forEach((livro) => {
        if (!livro.id) {
            livro.id = biblioteca.criarId();
            livrosAtualizados = true;
        }
    });
    if (livrosAtualizados) biblioteca.salvarLivros();
})();
