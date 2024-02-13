const btnAddTarefa = document.querySelector('.btn__addtarefa');         //acha o btn add tarefa
const formAddTarefa = document.querySelector('.add__tarefa');          //acha o formulario

const textArea = document.querySelector('.form-textarea');            // variavel para adicionar uma tarefa
const ulTarefas = document.querySelector('.tarefas__todolist');
const paragrafoDescricao = document.querySelector('.tarefa__descricao');



let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')
const btnRemoverTodas = document.querySelector('#btn-remover-todas');

function updateTodoList(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas))   //salvando na localStorage
}

function criarTarefa(tarefa){
  
    const li = document.createElement('li');
    li.classList.add('tarefas__todolist-item');

    const svg = document.createElement('svg');
    svg.innerHTML= ` 
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `
    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descricao;
    paragrafo.classList.add('tarefas__todolist-descricao');

    const botao = document.createElement('button');  //criando um btn direto pelo JS
    botao.classList.add('btn-edit');

    botao.onclick = () => {
        const novaDescricao = prompt ("Qual é a nova tarefa?");

        if(novaDescricao){
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            updateTodoList()
        }
    }

    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute('src', '/img/edit.png')
    botao.append(imagemBotao)

    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    if(tarefa.completa){
        li.classList.add('tarefas__todolist-item-complete')
        botao.setAttribute('disabled', 'disabled')
    }else{
        li.onclick = () => {
            document.querySelectorAll('.tarefas__todolist-item-active')
            .forEach(elemento => {
                elemento.classList.remove('tarefas__todolist-item-active')
            })

            if(tarefaSelecionada == tarefa){
                paragrafoDescricao.textContent = ''
                tarefaSelecionada = null;
                liTarefaSelecionada = null
                return
            }
            tarefaSelecionada = tarefa;
            liTarefaSelecionada = li;
            paragrafoDescricao.textContent = tarefa.descricao;

            li.classList.add('tarefas__todolist-item-active')
        }
    }
    return li;
    
}

/*btnAddTarefa.addEventListener('click', () =>{   //quando alguem clica no btn add tarefa
    formAddTarefa.classList.toggle('hidden');   //faço uma alternancia com a classe hidden
});*/
btnAddTarefa.addEventListener('click', () => {
    formAddTarefa.classList.toggle('hidden');
});


formAddTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const tarefa = {
        descricao : textArea.value
    }

    tarefas.push(tarefa);
    const elementoTarefa = criarTarefa(tarefa)
    ulTarefas.append(elementoTarefa);
    updateTodoList()
    textArea.value=''
    formAddTarefa.classList.add('hidden')    

})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
})

//selecionar o btn cancelar do formulario
const btnCancelar = document.querySelector('.form-footer__btn-cancel');

const limparFormulario = () => {
    textArea.value = '';
    formAddTarefa.classList.add('hidden');
}

btnCancelar.addEventListener('click', limparFormulario);


document.addEventListener('FocoFinalizado', () =>{
    if(tarefaSelecionada && liTarefaSelecionada){
        liTarefaSelecionada.classList.remove('tarefas__todolist-item-active')
        liTarefaSelecionada.classList.add('tarefas__todolist-item-complete')
        liTarefaSelecionada.querySelector('button').setAttribute('disabled','disabled')
        tarefaSelecionada.completa= true;
        updateTodoList()
    }

})

const removerTarefas = (somenteCompletas) => {
    const seletor = somenteCompletas ?  ".tarefas__todolist-item-complete" : ".tarefas__todolist-item"

    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    })
    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : []
    updateTodoList()
}

btnRemoverConcluidas.onclick= () => removerTarefas(true);
btnRemoverTodas.onclick= () => removerTarefas(false)