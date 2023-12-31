import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {

    static listarAutores = async (req, res, next) =>  {
        try {
            const buscaAutores = autores.find();
        
            req.resultado = buscaAutores;

            next();
        } catch (erro) {
            next(erro);
        }
    };
    
    static obterAutorPorId = async (req, res, next) =>  {
        try {
            const id = req.params.id;

            const autoresResultado = await autores.findById(id);

            if (autoresResultado !== null) {
                res.status(200).json(autoresResultado);
            } else {
                next(new NaoEncontrado("Autor não encontrado."));
            }
        } catch (erro) {
            next(erro);      
        }
    };

    static cadastrarAutor = async (req, res, next) => {
        try {
            let autor  = new autores(req.body);

            await autor.save(); 

            res.status(201).send(autor.toJSON());
        } catch (erro) {
            next(erro); 
        }
    };

    static atualizarAutor = async (req, res, next) => {
        try {
            const id = req.params.id;

            const autorResultado = await autores.findByIdAndUpdate(id, {$set: req.body});

            if (autorResultado !== null) {
                res.status(200).json(autorResultado);
            } else {
                next(new NaoEncontrado("Autor não encontrado."));
            }

            res.status(200).send({message: "Autor atualizado com sucesso!"});
        } catch (erro) {
            next(erro); 
        }
    };

    static excluirAutor = async (req, res, next) => {
        try {
            const id = req.params.id;

            const autorResultado = await autores.findByIdAndDelete(id);

            if (autorResultado !== null) {
                res.status(200).send({message: "Autor excluido com sucesso!"});
            } else {
                next(new NaoEncontrado("Autor não encontrado."));
            }
        } catch (erro) {
            next(erro); 
        }
    };
}

export default AutorController;