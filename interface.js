(() => {
    const biblioteca = window.Biblioteca;

    /* Exibe uma lista de registros ou uma mensagem quando ela estiver vazia. */
    biblioteca.mostrarLista = (lista, elemento, vazio, formatar) => {
        elemento.replaceChildren();
        if (lista.length === 0) {
            const item = document.createElement("li");
            item.className = "empty";
            item.textContent = vazio;
            elemento.append(item);
            return;
        }

        lista.forEach((registro) => {
            const item = document.createElement("li");
            item.textContent = formatar(registro);
            elemento.append(item);
        });
    };

    /* Atualiza as listas de alunos, livros e vínculos na página. */
    biblioteca.atualizarListas = () => {
        biblioteca.mostrarLista(biblioteca.alunos, document.querySelector("#lista-alunos"), "Nenhum aluno cadastrado.",
            (aluno) => `${aluno.nome} - Matrícula: ${aluno.matricula}`);
        biblioteca.mostrarLista(biblioteca.livros, document.querySelector("#lista-livros"), "Nenhum livro cadastrado.",
            (livro) => `${livro.titulo} - ${livro.autor}`);
        biblioteca.atualizarOpcoesVinculo();
        biblioteca.mostrarLista(biblioteca.vinculos, document.querySelector("#lista-vinculos"), "Nenhum vínculo cadastrado.",
            (vinculo) => {
                const aluno = biblioteca.alunos.find((registro) => registro.matricula === vinculo.matricula);
                const livro = biblioteca.livros.find((registro) => registro.id === vinculo.livroId);
                return `${aluno ? aluno.nome : "Aluno removido"} - ${livro ? livro.titulo : "Livro removido"}`;
            });
    };
})();
