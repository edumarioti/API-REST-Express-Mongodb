import livros from "../models/Livro.js";

class LivroController {

    
    static listarLivros = async (req, res) =>  {
        try {
            const livrosResultado = await livros.find();
            res.status(200).json(livrosResultado);
        } catch (erro) {
            res.status(500).send({message: `Erro interno do servidor  \n ${erro}`});
        }
    };
    
    static obterLivroPorId = async (req, res) =>  {
        try {
            const id = req.params.id;
            const livrosResultado = await livros.findById(id);
            res.status(200).json(livrosResultado);
        } catch (erro) {
            res.status(500).send({message: `Erro interno do servidor  \n ${erro}`});
        }
    };
    
    static listarLivrosPorEditora = async (req, res) => {
        try {
            const editora = req.query.editora;
            const livrosResultado = await livros.find({"editora": editora});
            res.status(201).send(livrosResultado);
        } catch (erro) {
            res.status(500).send({message: `Não foi possível encontrar os livros da editora  \n ${erro}`});
        }
    };

    static cadastrarLivro = async (req, res) => {
        try {
            let livro  = new livros(req.body);
            await livro.save(); 
            res.status(201).send(livro.toJSON());
        } catch (erro) {
            res.status(500).send({message: `Falha ao cadastrar livro \n ${erro}`});
        }
    };

    static atualizarLivro = async (req, res) => {
        try {
            const id = req.params.id;
            await livros.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({message: "Livro atualizado com sucesso!"});
        } catch (erro) {
            res.status(500).send({message: `Falha ao atualizar o livro \n ${erro}`});
        }
    };

    static excluirLivro = async (req, res) => {
        try {
            const id = req.params.id;
            await livros.findByIdAndDelete(id);
            res.status(200).send({message: "Livro excluido com sucesso!"});
        } catch (erro) {
            res.status(500).send({message: `Falha ao excluir o livro \n ${erro}`});
        }
    };
}

export default LivroController;