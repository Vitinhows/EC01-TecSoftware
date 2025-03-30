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