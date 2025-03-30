let alunos = []
document.getElementById(alunoForm).addEventListener("submit", function(event){
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const curso = document.getElementById("curso").value;
    const nota = document.getElementById("notafinal").value;

    alunos.push({nome, idade, curso, nota});
    atualizarTabela();
    this.reset();
});

function atualizarTabela(){
    const tabela = document.getElementById("tableAlunos");
    tabela.innerHTML = "";
    alunos.forEach((aluno, index) => {
        const row = tabela.insertRow();
        row.innerHTML = `<td>${aluno.nome}</td><td>${aluno.idade}</td><td>${aluno.curso}</td><td>${aluno.nota}</td>
                <td><button onclick="editarAluno(${index})">Editar</button>
                <button onclick="excluirAluno(${index})">Excluir</button></td>`;
    });
}

function editarAluno(index){
    const aluno = alunos[index];
    document.getElementById("nome").value = aluno.nome;
    document.getElementById("idade").value = aluno.idade;
    document.getElementById("curso").value = aluno.curso;
    document.getElementById("notafinal").value = aluno.nota;
    alunos.splice(index, 1);
    atualizarTabela();
}