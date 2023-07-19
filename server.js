const http = require('http')
const port = 3002

const router = {
    '/': 'Curso de node',
    '/livros': 'Entrei na pagina de livros',
    '/autores': 'Listagem de autores',
    '/editora': 'Editora',
    '/sobre': 'Sobre'
}

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end(router[req.url])
})

server.listen(port, () => {
    console.log(`Servidor escutando na porta: http://localhost:${port}`)
})