import livros from "../models/Livro.js";

class LivroController {

    
    static listarLivros = async (req, res, next) =>  {
        try {
            const livrosResultado = await livros.find();

            res.status(200).json(livrosResultado);
        } catch (erro) {
            next(erro); 
        }
    };
    
    static obterLivroPorId = async (req, res, next) =>  {
        try {
            const id = req.params.id;

            const livrosResultado = await livros.findById(id);

            res.status(200).json(livrosResultado);
        } catch (erro) {
            next(erro); 
        }
    };
    
    static listarLivrosPorEditora = async (req, res, next) => {
        try {
            const editora = req.query.editora;

            const livrosResultado = await livros.find({"editora": editora});

            res.status(201).send(livrosResultado);
        } catch (erro) {
            next(erro); 
        }
    };

    static cadastrarLivro = async (req, res, next) => {
        try {
            let livro  = new livros(req.body);

            await livro.save(); 

            res.status(201).send(livro.toJSON());
        } catch (erro) {
            next(erro); 
        }
    };

    static atualizarLivro = async (req, res, next) => {
        try {
            const id = req.params.id;

            await livros.findByIdAndUpdate(id, {$set: req.body});

            res.status(200).send({message: "Livro atualizado com sucesso!"});
        } catch (erro) {
            next(erro); 
        }
    };

    static excluirLivro = async (req, res, next) => {
        try {
            const id = req.params.id;
            
            await livros.findByIdAndDelete(id);

            res.status(200).send({message: "Livro excluido com sucesso!"});
        } catch (erro) {
            next(erro); 
        }
    };
}

export default LivroController;