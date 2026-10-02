/* Inicia os formulários e atualiza a interface depois que os módulos carregam. */
(() => {
    const biblioteca = window.Biblioteca;

    if (document.querySelector("#form-aluno")) {
        biblioteca.inicializarAlunos();
    }
    if (document.querySelector("#form-livro")) {
        biblioteca.inicializarLivros();
    }
    if (document.querySelector("#form-vinculo")) {
        biblioteca.inicializarVinculos();
    }
    if (document.querySelector("#lista-alunos") || document.querySelector("#lista-livros")
        || document.querySelector("#lista-vinculos") || document.querySelector("#lista-historico")) {
        biblioteca.atualizarListas();
    }
})();
