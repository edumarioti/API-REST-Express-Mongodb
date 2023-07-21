import livros from "../models/Livro.js";

class LivroController {

    static listarLivros = (req, res) =>  {
        livros.find()
            .populate("autor")
            .exec((err, livros) => {
                res.status(200).json(livros);
            });
    };
    
    static obterLivroPorId = (req, res) =>  {
        const id = req.params.id;
        
        livros.findById(id)
            .populate("autor", "nome")
            .exec((err, livro) => {
                if (err) {
                    res.status(400).send({message: `Id do livro não localizado \n ${err.message}`});
                } else {
                    res.status(200).send(livro);
                }           
                res.status(200).json(livros);

            });
    };

    static listarLivroPorEditora = (req, res) => {
        const editora = req.query.editora;

        livros.find({"editora": editora}, {}, (err, livros) => {
            if (err) {
                res.status(404).send({message: `Não foi possível encontrar os livros da editora ${editora} \n ${err.message}`});
            } else {
                res.status(201).send(livros);
            }
        });
    };

    static cadastrarLivro = (req, res) => {
        let livro = new livros(req.body);

        livro.save((err) => {
            if (err) {
                res.status(500).send({message: `Falha ao cadastrar livro  \n ${err.message}`});
            } else {
                res.status(201).send(livro.toJSON());
            }
        });
    };

    static atualizarLivro = (req, res) => {
        const id = req.params.id;
        
        livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if (err) {
                res.status(500).send({message: `Falha ao atualizar o livro \n ${err.message}`});
            } else {
                res.status(200).send({message: "Livro atualizado com sucesso!"});
            }
        });

    };

    static excluirLivro = (req, res) => {
        const id = req.params.id;

        livros.findByIdAndDelete(id, (err) => {
            if (err) {
                res.status(500).send({message: `Falha ao excluir o livro  \n ${err.message}`});
            } else {
                res.status(200).send({message: "Livro excluido com sucesso!"});
            }
        });
    };
}

export default LivroController;