(() => {
    const biblioteca = window.Biblioteca;

    /* Exibe uma lista de registros ou uma mensagem quando ela estiver vazia. */
    biblioteca.mostrarLista = (lista, elemento, vazio, formatar, excluir) => {
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
            const texto = document.createElement("span");
            texto.textContent = formatar(registro);
            item.append(texto);

            if (excluir) {
                const botaoExcluir = document.createElement("button");
                botaoExcluir.type = "button";
                botaoExcluir.className = "botao-excluir";
                botaoExcluir.textContent = "Excluir";
                botaoExcluir.setAttribute("aria-label", `Excluir ${formatar(registro)}`);
                botaoExcluir.addEventListener("click", () => excluir(registro));
                item.append(botaoExcluir);
            }

            elemento.append(item);
        });
    };

    /* Atualiza as listas de alunos, livros e vínculos na página. */
    biblioteca.atualizarListas = () => {
        biblioteca.mostrarLista(biblioteca.alunos, document.querySelector("#lista-alunos"), "Nenhum aluno cadastrado.",
            (aluno) => `${aluno.nome} - Matrícula: ${aluno.matricula}`,
            (aluno) => biblioteca.excluirAluno(aluno));
        biblioteca.mostrarLista(biblioteca.livros, document.querySelector("#lista-livros"), "Nenhum livro cadastrado.",
            (livro) => `${livro.titulo} - ${livro.autor}`,
            (livro) => biblioteca.excluirLivro(livro));
        biblioteca.atualizarOpcoesVinculo();
        biblioteca.mostrarLista(biblioteca.vinculos, document.querySelector("#lista-vinculos"), "Nenhum vínculo cadastrado.",
            (vinculo) => {
                const aluno = biblioteca.alunos.find((registro) => registro.matricula === vinculo.matricula);
                const livro = biblioteca.livros.find((registro) => registro.id === vinculo.livroId);
                return `${aluno ? aluno.nome : "Aluno removido"} - ${livro ? livro.titulo : "Livro removido"}`;
            },
            (vinculo) => biblioteca.excluirVinculo(vinculo));
        biblioteca.mostrarLista(biblioteca.historico, document.querySelector("#lista-historico"), "Nenhum vínculo no histórico.",
            (registro) => {
                const dataEncerramento = new Date(registro.encerradoEm);
                const dataFormatada = Number.isNaN(dataEncerramento.getTime())
                    ? "Data não informada"
                    : new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(dataEncerramento);
                return `${registro.nomeAluno} - ${registro.tituloLivro}${registro.autorLivro ? ` - ${registro.autorLivro}` : ""} - Encerrado em ${dataFormatada}`;
            });
    };
})();
