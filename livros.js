(() => {
    const biblioteca = window.Biblioteca;

    /* Exclui um livro e os vínculos associados após confirmação. */
    biblioteca.excluirLivro = (livro) => {
        if (!window.confirm(`Excluir "${livro.titulo}" e os vínculos associados?`)) return;

        const indice = biblioteca.livros.findIndex((registro) => registro.id === livro.id);
        if (indice === -1) return;

        const vinculosDoLivro = biblioteca.vinculos.filter((vinculo) => vinculo.livroId === livro.id);
        biblioteca.arquivarVinculos(vinculosDoLivro);
        biblioteca.livros.splice(indice, 1);
        biblioteca.vinculos = biblioteca.vinculos.filter((vinculo) => vinculo.livroId !== livro.id);
        biblioteca.salvarLivros();
        biblioteca.salvarVinculos();
        biblioteca.atualizarListas();
    };

    /* Configura o formulário e evita cadastrar novamente o mesmo título e autor. */
    biblioteca.inicializarLivros = () => {
        /* Normaliza o texto para comparar sem diferenciar maiúsculas ou espaços externos. */
        document.querySelector("#form-livro").addEventListener("submit", (evento) => {
            evento.preventDefault();
            const formulario = evento.currentTarget;
            const dados = new FormData(formulario);
            const titulo = dados.get("titulo").trim();
            const autor = dados.get("autor").trim();
            const status = document.querySelector("#status-livro");
            const normalizar = (texto) => texto.trim().toLocaleLowerCase("pt-BR");

            if (biblioteca.livros.some((livro) =>
                normalizar(livro.titulo) === normalizar(titulo) && normalizar(livro.autor) === normalizar(autor))) {
                status.textContent = "Este livro já está cadastrado.";
                return;
            }

            biblioteca.livros.push({
                id: biblioteca.criarId(),
                titulo,
                autor
            });
            biblioteca.salvarLivros();
            status.textContent = "";
            formulario.reset();
            biblioteca.atualizarListas();
        });
    };
})();
