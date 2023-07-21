import autores from "../models/Autor.js";

class AutorController {

    static listarAutores = (req, res) =>  {
        autores.find((err, autores) => {
            res.status(200).json(autores);
        });
    };
    
    static obterAutorPorId = (req, res) =>  {
        const id = req.params.id;
        
        autores.findById(id,(err, autor ) => {
            if (err) {
                res.status(400).send({message: `Id do autor não localizado  \n ${err.message}`});
            } else {
                res.status(200).send(autor );
            }           
            res.status(200).json(autores);

        });
    };

    static cadastrarAutor = (req, res) => {
        let autor  = new autores(req.body);

        autor.save((err) => {
            if (err) {
                res.status(500).send({message: `Falha ao cadastrar autor \n ${err.message}`});
            } else {
                res.status(201).send(autor .toJSON());
            }
        });
    };

    static atualizarAutor = (req, res) => {
        const id = req.params.id;
        
        autores.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if (err) {
                res.status(500).send({message: `Falha ao atualizar o autor \n ${err.message}`});
            } else {
                res.status(200).send({message: "Autor atualizado com sucesso!"});
            }
        });

    };

    static excluirAutor = (req, res) => {
        const id = req.params.id;

        autores.findByIdAndDelete(id, (err) => {
            if (err) {
                res.status(500).send({message: `Falha ao excluir o autor \n ${err.message}`});
            } else {
                res.status(200).send({message: "Autor excluido com sucesso!"});
            }
        });
    };
}

export default AutorController;