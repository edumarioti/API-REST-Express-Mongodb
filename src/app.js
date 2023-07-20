import express from "express"
import db from "./config/dbConnect.js"

db.on("erro", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => console.log('Conexão com o banco estabelacida'))


const app = express()

app.use(express.json())

const livros = [
    {
        id: 1,
        "titulo": "Senhor dos Aneis"},
    {
        id: 2,
        "titulo": "O Hobbit"
    }
]

app.get('/', (req, res) => {
    res.status(200).send('Curso de NodeJS')
}) 

app.get('/livros', (req, res) => {
    res.status(200).json(livros)
})

app.get('/livros/:id', (req, res) => {
    const index = buscaLivroPorID(req.params.id)
    res.json(livros[index])
})

app.post('/livros', (req, res) => {
    livros.push(req.body)
    res.status(201).send('Livro cadastrado!')
})

app.put('/livros/:id', (req, res) => {
    const index = buscaLivroPorID(req.params.id)
    livros[index].titulo = req.body.titulo
    res.json(livros)
})

app.delete('/livros/:id', (req, res) => {
    const {id} = req.params
    const index = buscaLivroPorID(id)
    livros.splice(index, 1)
    res.send(`Livro do id ${id} apagado!`)
})

function buscaLivroPorID(id) {
    return livros.findIndex(livro => livro.id == id)
}

export default app