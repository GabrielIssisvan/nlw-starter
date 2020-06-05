//importar a dependencia do sqlite3
const sqlite3 = require ("sqlite3").verbose()

//cria o db
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utliza objeto de db para operações

db.serialize(() => {
    // //criar tabela
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id integer primary key autoincrement,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `)

    // //inserir dados
    // const query = `
    //     INSERT INTO places(
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //         ) VALUES(?,?,?,?,?,?,?);   
    //         `

    // const values = [
    //     "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    //     "Papersider",
    //     "Guilherme Gemballa, Jardim América",
    //     "Número 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Papéis e papelão"
    //     ]

    // function afterInsertData(err){
    //     if(err) {
    //         return console.log(err)
    //     }
    //    console.log("Cadastrado com sucesso!")
    //    console.log (this)
    // }

    // //Executa a inserção no DB
    // db.run (query, values, afterInsertData) 

    //cosultar dados da tabela
    // db.all (`SELECT * FROM places`,function(err,rows){
    //     if(err) {
    //         return console.log(err)
    //     }
    //     console.log("Aqui estáo os registros!")
    //     console.log (rows)
    // })


    //delete dados da tabela
    // db.run (`DELETE FROM places WHERE id =?`,[3],function(err){
    //     if(err) {
    //         return console.log(err)
    //     }
    //     console.log("Registro deletado!")
    // })


})

