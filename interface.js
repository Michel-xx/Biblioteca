(() => {
    const biblioteca = window.Biblioteca;

    /* Exibe uma lista de registros ou uma mensagem quando ela estiver vazia. */
    biblioteca.mostrarLista = (lista, elemento, vazio, formatar, excluir, textoBotao = "Excluir") => {
        if (!elemento) return;

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
                botaoExcluir.textContent = textoBotao;
                botaoExcluir.setAttribute("aria-label", `${textoBotao} ${formatar(registro)}`);
                botaoExcluir.addEventListener("click", () => excluir(registro));
                item.append(botaoExcluir);
            }

            elemento.append(item);
        });
    };

    /* Atualiza as listas de alunos, livros e vínculos na página. */
    biblioteca.atualizarListas = () => {
        const listaAlunos = document.querySelector("#lista-alunos");
        const listaLivros = document.querySelector("#lista-livros");
        const listaVinculos = document.querySelector("#lista-vinculos");
        const listaHistorico = document.querySelector("#lista-historico");

        biblioteca.mostrarLista(biblioteca.alunos, listaAlunos, "Nenhum aluno cadastrado.",
            (aluno) => `${aluno.nome} - Matrícula: ${aluno.matricula}`,
            (aluno) => biblioteca.excluirAluno(aluno));
        biblioteca.mostrarLista(biblioteca.livros, listaLivros, "Nenhum livro cadastrado.",
            (livro) => `${livro.titulo} - ${livro.autor}`,
            (livro) => biblioteca.excluirLivro(livro));

        if (document.querySelector("#aluno-vinculo") && document.querySelector("#livro-vinculo")) {
            biblioteca.atualizarOpcoesVinculo();
        }

        biblioteca.mostrarLista(biblioteca.vinculos, listaVinculos, "Nenhum vínculo cadastrado.",
            (vinculo) => {
                const aluno = biblioteca.alunos.find((registro) => registro.matricula === vinculo.matricula);
                const livro = biblioteca.livros.find((registro) => registro.id === vinculo.livroId);
                return `${aluno ? aluno.nome : "Aluno removido"} - ${livro ? livro.titulo : "Livro removido"}`;
            },
            (vinculo) => biblioteca.excluirVinculo(vinculo),
            "Livro devolvido");
        biblioteca.mostrarLista(biblioteca.historico, listaHistorico, "Nenhum vínculo no histórico.",
            (registro) => {
                const formatarData = (valor, etiqueta) => {
                    const data = new Date(valor);
                    if (Number.isNaN(data.getTime())) {
                        return `${etiqueta}: Data não informada`;
                    }
                    return `${etiqueta}: ${new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(data)}`;
                };

                const dataRetirada = formatarData(registro.pegoEm || registro.encerradoEm, "Pegou em");
                const dataEncerramento = formatarData(registro.encerradoEm, "Encerrado em");
                return `${registro.nomeAluno} - ${registro.tituloLivro}${registro.autorLivro ? ` - ${registro.autorLivro}` : ""} - ${dataRetirada} - ${dataEncerramento}`;
            },
            (registro) => biblioteca.excluirHistorico(registro));
    };
})();
