import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
    {
        id: {type: String},
        titulo: {
            type: String,
            required: [true, "O titulo do livro é obrigatório"]
        },
        autor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "autores",
            required: [true, "O id do autor é obrigatório"]
        },
        editora: {
            type: String,
            required: [true, "O nome da editora é obrigatório"],
            enum: {
                values: ["Casa do Código", "Alura"],
                message: "A editora {VALUE} não é um valor permitido"
            }
        },
        numeroPaginas: {
            type: Number,
            // Validação padrão com mensagem personalizada
            // min: [5, "O numero de páginas deve estar entre 5 e 5000. Valor forecido {VALUE}"],
            // max: [5000, "O numero de páginas deve estar entre 5 e 5000. Valor forecido {VALUE}"]
            
            // Validadacão e mensagem personalizada 
            validate: {
                validator: (valor) => {
                    return valor >= 5 && valor <= 5000;
                },
                message: "O numero de páginas deve estar entre 5 e 5000. Valor forecido {VALUE}"
            }
        } 
    }
);

const livros = mongoose.model("livros", livroSchema);

export default livros;