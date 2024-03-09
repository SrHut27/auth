const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser')
const session = require('express-session');
const PORT = 8000;
const app = express()

//Importando a conexão com o banco de dados:
const connection = require('../express_session/routes/database');
//Importando as rotas do app:
const authRoutes = require('../express_session/routes/auth')

// Iniciando a conexão com o servidor:
connection.connect((err) => {
    if(err) throw err; // Se houver um erro na conexão
    console.log('Connected to database!')
});

// Configurando o handlebars, que será nossa views engine:
app.engine('hbs', hbs.engine({
    extname: 'hbs', // Definimos aqui que a extensão dos arquivos de template será: hbs
    defaultLayout: 'main' // será o layout base para todos os outros
}));
//Definindo o handlebars como o motor de renderização de templates:
app.set('view engine', 'hbs');

//Configurando os middlewares
app.use(express.static('public')); // Falaqndo onde deixaremos nossos arquivos estátivcos
app.use(bodyParser.urlencoded({extended: true})); // permitindo o preocessamento de formulários
app.use(express.urlencoded({ extended: true }));
app.use(session({ // Configurando a sessão de usuário
    secret: 'yousecretkey',
    resave: false,
    saveUninitialized: true,
}));

//Importando as rotas de métodos do auth.js:
app.use('/auth', authRoutes);


// Iniciando a porta do servidor
app.listen(PORT, () =>{
    console.log("Server is running in http://localhost:" + PORT);
})





