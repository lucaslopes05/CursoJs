//carregado modeulos
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const app = express();
const adminRouter = require('./routes/admin');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');

//configuracao
    //Sessao
        app.use(session({
            secret: 'qualquerCoisa',
            resave: true,
            saveUninitialized: true
        }))
        //flash sempre abaixo da session
        app.use(flash());
    //Middlewares
    app.use((req,res,next)=>{
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        next();
    })


    //body parser
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());

    //Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars');
    

    //mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/blogapp',{useNewUrlParser: true}).then(()=>{
            console.log('Conectado ao Mongo Db')
        }).catch((err)=>{
            console.log('Erro no mongoose: '+err);
        })

    //Public
        app.use(express.static(path.join(__dirname,'public')));

//rotas
    app.use('/admin',adminRouter);


//outros 



//numero da porta da aplicacao
const POST = 8081;
app.listen(POST,()=>{
    console.log('Servidor rodano...');
})