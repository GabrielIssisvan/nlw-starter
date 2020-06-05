const express = require ("express");
const server = express();

//pegar o banco de dados
const db = require("./database/db.js")

//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso doreq.body - VERBOM POST
server.use(express.urlencoded({extended:true}))

//utilizando template engine
const nunjucks = require("nunjucks")
//confiugra rota para nunjucks
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})

//caminhos da minha aplicação

server.get("/", (req,res) => {
    return res.render("index.html",{title:"Seu marketplace de coleta de resíduos"})
})

server.get("/create-point", (req,res) => {

    //requisita informações da URL (query strings)
    //console.log(req.query)
    
    return res.render("create-point.html")
})


server.post("/savepoint", (req,res) => {
    //req.body: O corpo do nosso formulário
    
    
    //Log POST
    //console.log(req.body)
    // return res.send("OK")

    //inserir dados no banco de dados
     //inserir dados
    const query = `
        INSERT INTO places(
            image,
            name,
            address,
            address2,
            state,
            city,
            items
            ) VALUES(?,?,?,?,?,?,?);   
            `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
        ]

    function afterInsertData(err){
        if(err) {
            return console.log(err)
            return res.send("Erro no cadastro!")
        }
       console.log("Cadastrado com sucesso!")
       console.log (this)
       return res.render("create-point.html", {saved: true})
    }

 //Executa a inserção no DB
    db.run (query, values, afterInsertData) 

})




server.get("/search", (req,res) => {
    const search = req.query.search
    if (search==""){
        //pesquisa vazia
        return res.render ("search-results.html",{total:0})
    }

    //pagar os dados do banco de dados
        db.all (`SELECT * FROM places WHERE city LIKE '%${search}%'`,function(err,rows){
        if(err) {
            return console.log(err)
        }

        const total = rows.length
        // console.log("Aqui estáo os registros!")
        // console.log (rows)

        //Mostrar a pagina html com os dados do DB
    return res.render("search-results.html",{places: rows, total:total})
    })

})


server.listen(3000);

