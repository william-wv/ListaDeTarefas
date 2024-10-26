interface Tarefa {
    id: number;
    titulo: string;
    descricao: string;
    concluida: boolean;
  }
  
  let tarefas: Tarefa[] = [];
  let idCounter = 1;
  
  function adicionarTarefa(): void {
    const titulo = (document.getElementById("taskTitle") as HTMLInputElement).value;
    const descricao = (document.getElementById("taskDescription") as HTMLTextAreaElement).value;
  
    if (titulo && descricao) {
      const novaTarefa: Tarefa = { id: idCounter++, titulo, descricao, concluida: false };
      tarefas.push(novaTarefa);
      atualizarLista();
      (document.getElementById("taskTitle") as HTMLInputElement).value = '';
      (document.getElementById("taskDescription") as HTMLTextAreaElement).value = '';
    }
  }
  
  function atualizarLista(): void {
    const taskList = document.getElementById("taskList") as HTMLUListElement;
    taskList.innerHTML = '';
    
    tarefas.forEach(tarefa => {
      const tarefaElement = document.createElement("li");
      tarefaElement.className = "task";
      tarefaElement.classList.add(tarefa.concluida ? "concluida" : "pendente");
  
      const tarefaInfo = document.createElement("div");
      tarefaInfo.className = "task-info";
  
      // Elemento de título
      const tituloElement = document.createElement("span");
      tituloElement.className = "task-title";
      tituloElement.textContent = tarefa.titulo;
  
      // Elemento de descrição
      const descricaoElement = document.createElement("span");
      descricaoElement.className = "task-desc";
      descricaoElement.textContent = tarefa.descricao;
  
      // Adicionando título e descrição ao info
      tarefaInfo.appendChild(tituloElement);
      tarefaInfo.appendChild(descricaoElement);
  
      // Criação do contêiner para os botões
      const buttonContainer = document.createElement("div");
      buttonContainer.className = "button-container";
  
      // Botão para marcar/desmarcar como concluída
      const botaoConcluir = document.createElement("button");
      botaoConcluir.textContent = tarefa.concluida ? "Desmarcar" : "Concluir";
      botaoConcluir.onclick = () => {
        marcarComoConcluida(tarefa.id);
      };
  
      // Botão para remover a tarefa
      const botaoRemover = document.createElement("button");
      botaoRemover.textContent = "Remover";
      botaoRemover.onclick = () => {
        removerTarefa(tarefa.id);
      };
  
      // Adicionando os botões ao contêiner
      buttonContainer.appendChild(botaoConcluir);
      buttonContainer.appendChild(botaoRemover);
  
      tarefaElement.appendChild(tarefaInfo);
      tarefaElement.appendChild(buttonContainer); // Adicionando o contêiner de botões
      taskList.appendChild(tarefaElement);
    });
  }
  
  
  function marcarComoConcluida(id: number): void {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
      tarefa.concluida = !tarefa.concluida; // Alterna entre concluída e pendente
      atualizarLista();
    }
  }
  
  function removerTarefa(id: number): void {
    tarefas = tarefas.filter(t => t.id !== id); // Remove a tarefa pelo id
    atualizarLista();
  }
  