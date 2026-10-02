(() => {
    const biblioteca = window.Biblioteca;

    /* Preenche um seletor com registros e uma opção inicial explicativa. */
    function preencherOpcoes(elemento, registros, valor, texto, vazio) {
        elemento.replaceChildren();
        const opcaoInicial = document.createElement("option");
        opcaoInicial.value = "";
        opcaoInicial.textContent = vazio;
        elemento.append(opcaoInicial);

        registros.forEach((registro) => {
            const opcao = document.createElement("option");
            opcao.value = valor(registro);
            opcao.textContent = texto(registro);
            elemento.append(opcao);
        });

        elemento.disabled = registros.length === 0;
    }

    /* Mostra alunos e somente livros que ainda não foram vinculados. */
    biblioteca.atualizarOpcoesVinculo = () => {
        const livrosDisponiveis = biblioteca.livros.filter((livro) =>
            !biblioteca.vinculos.some((vinculo) => vinculo.livroId === livro.id));
        preencherOpcoes(document.querySelector("#aluno-vinculo"), biblioteca.alunos,
            (aluno) => aluno.matricula,
            (aluno) => `${aluno.nome} (${aluno.matricula})`, "Cadastre um aluno primeiro");
        preencherOpcoes(document.querySelector("#livro-vinculo"), livrosDisponiveis,
            (livro) => livro.id,
            (livro) => `${livro.titulo} - ${livro.autor}`,
            biblioteca.livros.length === 0 ? "Cadastre um livro primeiro" : "Nenhum livro disponível");
        document.querySelector("#salvar-vinculo").disabled =
            biblioteca.alunos.length === 0 || livrosDisponiveis.length === 0;
    };

    /* Configura o formulário que associa um aluno a um livro disponível. */
    biblioteca.inicializarVinculos = () => {
        /* Evita vínculos repetidos, salva a associação e atualiza as listas. */
        document.querySelector("#form-vinculo").addEventListener("submit", (evento) => {
            evento.preventDefault();
            const dados = new FormData(evento.currentTarget);
            const matricula = dados.get("matricula");
            const livroId = dados.get("livroId");
            const status = document.querySelector("#status-vinculo");

            if (biblioteca.vinculos.some((vinculo) =>
                vinculo.matricula === matricula && vinculo.livroId === livroId)) {
                status.textContent = "Este aluno já está vinculado a esse livro.";
                return;
            }

            biblioteca.vinculos.push({ matricula, livroId });
            biblioteca.salvarVinculos();
            status.textContent = "";
            evento.currentTarget.reset();
            biblioteca.atualizarListas();
        });
    };
})();
