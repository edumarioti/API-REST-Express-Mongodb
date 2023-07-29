import NaoEncontrado from "../erros/NaoEncontrado.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import { autores, livros } from "../models/index.js";

class LivroController {

    
    static listarLivros = async (req, res, next) => {
        try {

            let { limite = 5, pagina = 1 } = req.query;

            limite = parseInt(limite);
            pagina = parseInt(pagina);

            if (pagina > 0 && limite > 0) {
                const livrosResultado = await livros.find()
                    .skip((pagina - 1) * limite)
                    .limit(limite)
                    .populate("autor")
                    .exec();
        
                res.status(200).json(livrosResultado);
            } else {
                next(new RequisicaoIncorreta());
            }
        } catch (erro) {
            next(erro);
        }
    };
    
    static obterLivroPorId = async (req, res, next) =>  {
        try {
            const id = req.params.id;

            const livrosResultado = await livros.findById(id)
                .populate("autor", "nome")
                .exec();

            if (livrosResultado !== null) {
                res.status(200).json(livrosResultado);
            } else {
                next(new NaoEncontrado("Livro não encontrado."));  
            }
        } catch (erro) {
            next(erro); 
        }
    };
    
    static listarLivrosPorFiltro = async (req, res, next) => {
        try {

            const busca = await processaBusca(req.query);
            
            if (busca !== null) {
                const livrosResultado = await livros
                    .find(busca)
                    .populate("autor");
    
                res.status(200).send(livrosResultado);
            
            } else {
                res.status(200).send([]);
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

async function processaBusca(parametros) {
    const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;
    
    let busca = {};
    
    // Editora
    // termo para busca com Regex nativo do JavaScript
    const regex = new RegExp(editora, "i");
    if (editora) busca.editora = regex;

    // Titulo
    // termo para busca com o Regex de operador do mongoDB
    if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

    // Máxino e mínimo de páginas
    if (minPaginas || maxPaginas) busca.numeroPaginas = {};
    // gte = Great Than or Equal = Maior ou igual que
    if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
    // lte = Less Than or Equal = Menor ou igual que
    if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

    // Autor
    if (nomeAutor) {
        let autor = await autores.findOne({ nome: nomeAutor});

        if (autor !== null) {
            busca.autor = autor._id;
        } else {
            busca = null;
        }
    }

    return busca;
    
}


export default LivroController;