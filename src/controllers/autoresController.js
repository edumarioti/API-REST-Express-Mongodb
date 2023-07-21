import autores from "../models/Autor.js";

class AutorController {

    static listarAutores = async (req, res) =>  {
        try {
            const autoresResultado = await autores.find();
            res.status(200).json(autoresResultado);
        } catch (erro) {
            res.status(500).send({message: `Erro interno do servidor  \n ${erro}`});
        }
    };
    
    static obterAutorPorId = async (req, res) =>  {
        try {
            const id = req.params.id;
            const autoresResultado = await autores.findById(id);
            res.status(200).json(autoresResultado);
        } catch (erro) {
            res.status(500).send({message: `Erro interno do servidor  \n ${erro}`});
        }
    };

    static cadastrarAutor = async (req, res) => {
        try {
            let autor  = new autores(req.body);
            await autor.save(); 
            res.status(201).send(autor.toJSON());
        } catch (erro) {
            res.status(500).send({message: `Falha ao cadastrar autor \n ${erro}`});
        }
    };

    static atualizarAutor = async (req, res) => {
        try {
            const id = req.params.id;
            await autores.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({message: "Autor atualizado com sucesso!"});
        } catch (erro) {
            res.status(500).send({message: `Falha ao atualizar o autor \n ${erro}`});
        }
    };

    static excluirAutor = async (req, res) => {
        try {
            const id = req.params.id;
            await autores.findByIdAndDelete(id);
            res.status(200).send({message: "Autor excluido com sucesso!"});
        } catch (erro) {
            res.status(500).send({message: `Falha ao excluir o autor \n ${erro}`});
        }
    };
}

export default AutorController;