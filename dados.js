/* Prepara os dados compartilhados pelos módulos da biblioteca. */
(() => {
    const biblioteca = window.Biblioteca = window.Biblioteca || {};

    /* Recupera do armazenamento local as listas de alunos, livros e vínculos. */
    biblioteca.alunos = JSON.parse(localStorage.getItem("alunos") || "[]");
    biblioteca.livros = JSON.parse(localStorage.getItem("livros") || "[]");
    biblioteca.vinculos = JSON.parse(localStorage.getItem("vinculos") || "[]");

    /* Cria um identificador único para cada livro cadastrado. */
    biblioteca.criarId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    /* Salva cada tipo de cadastro em uma chave própria do navegador. */
    biblioteca.salvarAlunos = () => localStorage.setItem("alunos", JSON.stringify(biblioteca.alunos));
    biblioteca.salvarLivros = () => localStorage.setItem("livros", JSON.stringify(biblioteca.livros));
    biblioteca.salvarVinculos = () => localStorage.setItem("vinculos", JSON.stringify(biblioteca.vinculos));

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
