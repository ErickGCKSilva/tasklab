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

        artigo.append(idi, tit, desc, pri, dat, con);
        lista.append(artigo);

    });
};



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
}





