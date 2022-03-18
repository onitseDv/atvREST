const express = require('express');
const res = require('express/lib/response');
const app = express ()
const porta = 3000

app.listen(porta, () => console.log(`Server funcionando na porta ${porta}`));


let movies = [{
        id: "1",
        nome: "Grey's Anatomy",
        foto: "https://i.pinimg.com/originals/33/39/9d/33399df9faacc5de9e3928f52fabbacf.jpg",
        descricao: "Durante sua residência, Meredith Grey vive paixões profissionais e pessoais com seus colegas médicos em um hospital de Seattle.",
        elenco: "Ellen Pompeo, Sandra Oh, Katherine Heigl"
    },{
        id: "2",
        nome: "Vingadores Guerra Infinita",
        foto: "https://i.pinimg.com/736x/63/c7/41/63c741c433aa938eadafdbd386e4e676.jpg",
        descricao: "Em Vingadores: Guerra Infinita, Thanos (Josh Brolin) enfim chega à Terra, disposto a reunir as Joias do Infinito. Para enfrentá-lo, os Vingadores precisam unir forças com os Guardiões da Galáxia, ao mesmo tempo em que lidam com desavenças entre alguns de seus integrantes.",
        elenco: "Tom Holland, Chris Evans, Scarlett Johansson, Robert Downey Jr" 
    },{
        id: "3",
        nome: "Black Summer",
        foto: "https://i.pinimg.com/736x/e6/5a/3a/e65a3a4a13f4c0533bc1a74dd38673fb.jpg",
        descricao: "Nos primeiros dias de um sombrio apocalipse zumbi, estranhos se unem para sobreviver e voltar para aqueles que amam.",
        elenco: "Jaime King, Justin Chu Cary, Christine Lee"  
    },{
        id: "4",
        nome: "A Era do Gelo 4",
        foto: "https://i.pinimg.com/originals/71/63/5e/71635ee4e257edbef3f71e60b8226749.jpg",
        descricao: "A louca perseguição de Scrat sempre à caça de sua noz inquieta - perseguição à qual ele tem se dedicado desde os primórdios dos tempos - tem consequências que mudam o mundo e causam um cataclismo continental que leva Manny, Diego e Sid a viverem a maior aventura de todos os tempos.",
        elenco: "Alessandra Vieira, Angélica Borges, Carolina Vieira, Christiane Louise, Carlos Gesteira"  
    },{
        id: "5",
        nome: "The Witcher",
        foto: "https://i.pinimg.com/736x/6c/40/3e/6c403ecb280e490fc89d6c58439158a4.jpg",
        descricao: "O mutante Geralt de Rívia é um caçador de monstros que luta para encontrar seu lugar num mundo onde as pessoas muitas vezes são mais perversas que as criaturas selvagens.",
        elenco: "Henry Cavill, Anya Chalotra, Freya Allan"
    },{
        id: "6",
        nome: "O Mentalista",
        foto: "https://i.pinimg.com/originals/69/d2/ab/69d2ab8af047c6698ddeb7af447d96e6.jpg",
        descricao: "Um famoso (médium) se autointitula e começa a trabalhar como consultor do California Bureau of Investigation para encontrar (Red John), o louco que matou sua esposa e filha.",
        elenco: "Amanda Righetti, Owain Yeoman, Tim Kang, Robin Tunney, Simon Baker"
    },{
        id: "7",
        nome: "Narcos",
        foto: "https://br.web.img2.acsta.net/pictures/15/07/29/14/06/297599.jpg",
        descricao: "A notória série sobre o tráfico é baseada na história real de violência e poder dos cartéis colombianos.",
        elenco: "Wagner Moura, Pedro Pascal, Boyd Holbrook"
    }  
]

app.use(express.json());
app.use(express.urlencoded({extended: false }));

//requisição GET pra pegar a lista de filmes na forma de um json
//teste: http://localhost:3000/filmes/
app.get('/filmes', (requisicao, resposta) => {
    resposta.json(movies)
})

//requisição GET para procurar um filme na lista
//teste: http://localhost:3000/filmes/id-do-filme-aqui
app.get('/filmes/:id', (requisicao, resposta) => {
    const id = requisicao.params.id
    for(let movie_search of movies){
         if(movie_search.id === id){
             resposta.json(movie_search)
             return
        }
    }
    resposta.status(404).send('Filme não encontrado!')
})

//requisição POST pra adicionar um filme na lista
//teste: POST pelo postman com o endpoint: http://localhost:3000/filmes/ com a mesma estrutura que o array possui
app.post('/filmes', (requisicao, resposta) => {
    const movie_add = requisicao.body;
    console.log(movie_add);
    movies.push(movie_add);
    resposta.send("Filme adicionado a lista!");
})

//requisição DELETE para remover um filme da lista
//teste: http://localhost:3000/filmes/id-do-filme-aqui
app.delete('/filmes/:id', (requisicao, resposta) => {
    const id = requisicao.params.id
    movies = movies.filter(movies => {
        if(movies.id !== id){
            return true
       }
       return false
    })
    resposta.send(`Filme com id ${id} excluído!`)

})