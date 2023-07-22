import NaoEncontrado from "../erros/NaoEncontrado.js";
import { livros } from "../models/index.js";

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

            if (livrosResultado !== null) {
                res.status(200).json(livrosResultado);
            } else {
                next(new NaoEncontrado("Livro não encontrado."));  
            }
        } catch (erro) {
            next(erro); 
        }
    };
    
    static listarLivrosPorEditora = async (req, res, next) => {
        try {
            const editora = req.query.editora;

            const livrosResultado = await livros.find({"editora": editora});

            if (livrosResultado !== null) {
                res.status(200).json(livrosResultado);
            } else {
                next(new NaoEncontrado("Livro não encontrado."));  
            }
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

            const livroResultaddo = await livros.findByIdAndUpdate(id, {$set: req.body});

            if (livroResultaddo !== null) {
                res.status(200).send({message: "Livro atualizado com sucesso!"});
            } else {
                next(new NaoEncontrado("Livro não encontrado."));  
            }

        } catch (erro) {
            next(erro); 
        }
    };

    static excluirLivro = async (req, res, next) => {
        try {
            const id = req.params.id;
            
            const livroResultaddo = await livros.findByIdAndDelete(id);

            if (livroResultaddo !== null) {
                res.status(200).send({message: "Livro excluido com sucesso!"});
            } else {
                next(new NaoEncontrado("Livro não encontrado."));  
            }

        } catch (erro) {
            next(erro); 
        }
    };
}

export default LivroController;