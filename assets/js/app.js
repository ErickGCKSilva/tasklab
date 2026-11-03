console.log("TaskLab iniciado.");

let tarefas = [];

const formulario =
    document.querySelector("#form-tarefa");

const campoTitulo =
    document.querySelector("#titulo");

const campoDescricao =
    document.querySelector("#descricao");

const campoPrioridade =
    document.querySelector("#prioridade");

const campoData =
    document.querySelector("#data");

const mensagemFormulario =
    document.querySelector(
        "#mensagem-formulario"
    );

const mensagemvazio = document.createElement("p")
mensagemvazio.textContent = "Nenhuma tarefa cadastrada!"

function validarTarefa(titulo, prioridade, data) {

    if (titulo === "") {
        mensagemFormulario.textContent = "Titulo vazio!";
        return false;
    };

    if (titulo.length < 5) {
        mensagemFormulario.textContent = "Titulo menor que 5 caracteres!";
        return false;
    };

    if (prioridade === "") {
        mensagemFormulario.textContent = "Prioridade vazia!";
        return false;
    };

    if (data === "") {
        mensagemFormulario.textContent = "Data vazia!";
        return false;
    };

    mensagemFormulario.textContent = "";
    return true;
};

//renderizacao

function renderizar(tarefas) {

    const lista = document.querySelector("#lista-tarefas");
    lista.textContent = "";

    tarefas.forEach(elemento => {

        const artigo = document.createElement("article");

        const idi = document.createElement("h3");
        idi.textContent = elemento.id;

        const tit = document.createElement("p");
        tit.textContent = elemento.titulo;

        const desc = document.createElement("p");
        desc.textContent = elemento.descricao;

        const pri = document.createElement("p");
        pri.textContent = elemento.prioridade;

        const dat = document.createElement("p");
        dat.textContent = elemento.data;

        const con = document.createElement("p");
        if (elemento.concluida) {
            con.textContent = "Concluída";
        } else {
            con.textContent = "Pendente";
        }

        if(elemento.conluida) {
            artigo.classList.add("tarefa-conluida")
        }

        const btnConcluir = criarBotao("Concluir", "concluir", elemento.id);
        const btnEditar = criarBotao("Editar", "editar", elemento.id);
        const btnExcluir = criarBotao("Excluir", "excluir", elemento.id);

        artigo.append(idi, tit, desc, pri, dat, con, btnConcluir, btnEditar, btnExcluir);
        lista.append(artigo);

    });
};

function criarBotao(texto, acao, id) {
    const botao = document.createElement("button");
    
    botao.textContent = texto;
    botao.dataset.acao = acao;
    botao.dataset.id = id;

    return botao;

}

formulario.addEventListener(
    "submit",
    event => {

        event.preventDefault();
        const titulo =
            campoTitulo.value.trim();

        const descricao =
            campoDescricao.value.trim();

        const prioridade =
            campoPrioridade.value;

        const data =
            campoData.value;

        if (!(validarTarefa(titulo, prioridade, data))) {
            return;
        }

        const novaTarefa = {
            id: gerarProximoId(),   // número novo, sem repetir
            titulo,                 // atalho de titulo: titulo
            descricao,
            prioridade,
            data,
            concluida: false        // toda tarefa nasce pendente
        };


        tarefas.push(novaTarefa);
        renderizar(tarefas);
        tarefasContador(tarefas);
    }
);

function gerarProximoId() {

    if (tarefas.length === 0) {
        return 1;
    }

    const ids =
        tarefas.map(
            tarefa => tarefa.id
        );

    return Math.max(...ids) + 1;
};

if(tarefas.length === 0) {

    const lista = document.querySelector("#lista-tarefas");

    artigo_1 = document.createElement("article");
    artigo_1.append(mensagemvazio);
    lista.append(artigo_1);

}

// atualiza resumo tarefas

function tarefasContador(tarefas) {
    let contador = 0;
    contador = tarefas.length;

    const resumo = document.querySelector("#resumo-tarefas");
    resumo.textContent = `${contador} tarefas`;

    return;
}

//botao

const lista = document.querySelector("#lista-tarefas");

lista.addEventListener("click", event => {

    // 1. sobe a partir do clique até achar um botão com data-acao
    const botao = event.target.closest("[data-acao]");

    // 2. clicou em outro lugar: ignora
    if (!botao) {
        return;
    }

    // 3. lê as duas etiquetas do botão
    const acao = botao.dataset.acao;
    const id = Number(botao.dataset.id);

    // 4. acha a tarefa com esse id
    const tarefa = tarefas.find(t => t.id === id);

    // 5. decide pela ação
    if (acao === "concluir") {
        tarefa.concluida = !tarefa.concluida;
        renderizar(tarefas);
    }
});