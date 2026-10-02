/* Inicia os formulários e atualiza a interface depois que os módulos carregam. */
(() => {
	const biblioteca = window.Biblioteca;

	biblioteca.inicializarAlunos();
	biblioteca.inicializarLivros();
	biblioteca.inicializarVinculos();
	biblioteca.atualizarListas();
})();
