(() => {
    const biblioteca = window.Biblioteca;

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
