class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }
    
    isAprovado = () => this.notaFinal >= 7;
    
    toString = () => `${this.nome}, ${this.idade} anos, Curso: ${this.curso}, Nota: ${this.notaFinal}, Status: ${this.isAprovado() ? 'Aprovado' : 'Reprovado'}`;
}

let alunos = [];

document.getElementById("alunoForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const curso = document.getElementById("curso").value;
    const notaFinal = parseFloat(document.getElementById("nota").value);
    
    const aluno = new Aluno(nome, idade, curso, notaFinal);
    alunos.push(aluno);
    atualizarTabela();
    console.log("Aluno cadastrado:", aluno.toString());
    alert("Aluno cadastrado com sucesso!");
    event.target.reset();
});

const atualizarTabela = () => {
    const tabela = document.getElementById("tabelaAlunos");
    tabela.innerHTML = "";
    alunos.forEach((aluno, index) => {
        const row = tabela.insertRow();
        row.innerHTML = `<td>${aluno.nome}</td><td>${aluno.idade}</td><td>${aluno.curso}</td><td>${aluno.notaFinal}</td>
        <td>${aluno.isAprovado() ? 'Aprovado' : 'Reprovado'}</td>
        <td><button class="editar" data-index="${index}">Editar</button>
        <button class="excluir" data-index="${index}">Excluir</button></td>`;
    });
    adicionarEventos();
};

const adicionarEventos = () => {
    document.querySelectorAll(".excluir").forEach(btn => {
        btn.addEventListener("click", (event) => excluirAluno(event.target.getAttribute("data-index")));
    });
    document.querySelectorAll(".editar").forEach(btn => {
        btn.addEventListener("click", (event) => editarAluno(event.target.getAttribute("data-index")));
    });
};

const excluirAluno = (index) => {
    alert(`Aluno ${alunos[index].nome} excluído!`);
    alunos.splice(index, 1);
    atualizarTabela();
};

const editarAluno = (index) => {
    const aluno = alunos[index];
    document.getElementById("nome").value = aluno.nome;
    document.getElementById("idade").value = aluno.idade;
    document.getElementById("curso").value = aluno.curso;
    document.getElementById("nota").value = aluno.notaFinal;
    alunos.splice(index, 1);
    atualizarTabela();
};

document.getElementById("listarAprovados").addEventListener("click", () => {
    const aprovados = alunos.filter(aluno => aluno.isAprovado());
    document.getElementById("relatorio").innerText = aprovados.map(aluno => aluno.toString()).join("\n");
});

document.getElementById("mediaNotas").addEventListener("click", () => {
    const media = alunos.reduce((acc, aluno) => acc + aluno.notaFinal, 0) / alunos.length;
    alert(`Média das notas: ${media.toFixed(2)}`);
});

document.getElementById("mediaIdades").addEventListener("click", () => {
    const media = alunos.reduce((acc, aluno) => acc + parseInt(aluno.idade), 0) / alunos.length;
    alert(`Média das idades: ${media.toFixed(2)}`);
});

document.getElementById("ordenarNomes").addEventListener("click", () => {
    alunos.sort((a, b) => a.nome.localeCompare(b.nome));
    atualizarTabela();
});

document.getElementById("contarCursos").addEventListener("click", () => {
    const contagem = alunos.reduce((acc, aluno) => {
        acc[aluno.curso] = (acc[aluno.curso] || 0) + 1;
        return acc;
    }, {});
    alert(`Quantidade de alunos por curso: ${JSON.stringify(contagem)}`);
});