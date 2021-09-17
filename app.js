var express = require('express');
var mongoose = require('mongoose');

const app = express();
const port = 8000;
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash'); // middleware
//const cookie = require('cookie');
//const setCookie = cookie.serialize('employee', 'true');

mongoose.connect('STRING DE CONEXAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Livros = mongoose.model('Livros', {
  categoria: String,
  nome: String,
  autor: String,
  ano: Number,
  editora: String
});

app.set('view engine', 'ejs');
app.set('views', __dirname, '/views');
app.use(express.urlencoded());
app.use(flash());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true })); // criando uma secret p/ session
app.use(express.json());
app.use(express.static('public'));

// Passport.json
app.use(passport.initialize());

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
}); // queremos recuperar ali, o objeto service ligado pela primary key criada automaticamente

UserSchema.methods.validPassword = function (pwd) {
  // EXAMPLE CODE!
  return this.password === pwd;
};

const User = mongoose.model('User', UserSchema);

LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  })
); // estratégias de autenticação

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use(passport.session());

app.get('/', (req, res) => {
  req.logout();
  res.send(
    '<h1>Seja bem-vindo!<h1/><a href="/login">Login</a> <a href="/livros">Livros</a>'
  );
});

app.get('/login', (req, res) => {
  req.logout();

  res.send(
    '<form action="/login" method="post"><div><label>Username:</label><input type="text" name="username"/></div><div><label>Password:</label><input type="password" name="password"/></div><div><input type="submit" value="Log In"/></div></form>'
  );
});

app.get('/livros', (req, res, err) => {
  let consulta = Livros.find({}, (err, livro) => {
    if (err) return res.status(500).send('Erro ao consultar Livro');
    // SE USUARIO AUTENTICADO
    if (req.isAuthenticated()) {
      /// USUARIO LOGADO
      //res.cookie('employee', 'true');
      res.render('livros', { livro_itens: livro });
    } else {
      /// USUARIO NAO LOGADO
      res.render('livrosUsuario', { livro_itens: livro });
    }
  });
});

app.get('/cadastrarLivros', (req, res) => {
  res.render('formlivros');
});

app.post('/cadastrarLivros', (req, res) => {
  let livro = new Livros();
  livro.categoria = req.body.categoria;
  livro.nome = req.body.nome;
  livro.autor = req.body.autor;
  livro.ano = req.body.ano;
  livro.editora = req.body.editora;

  livro.save(err => {
    if (err) return res.status(500).send('Erro ao cadastrar');
    return res.redirect('/livros');
  });
});

app.get('/deletarLivro/:id', (req, res) => {
  var chave = req.params.id;

  Livros.deleteOne({ _id: chave }, (err, result) => {
    if (err) res.status(500).send('Erro ao excluir livro');
    res.redirect('/livros');
  });
});

app.get('/editarLivro/:id', (req, res) => {
  Livros.findById(req.params.id, (err, livro) => {
    if (err) return res.status(500).send('Erro ao consultar livro');
    res.render('formEditarlivro', { livro_item: livro });
  });
});

app.post('/editarLivro', (req, res) => {
  var id = req.body.id;
  Livros.findById(id, (err, livro) => {
    if (err) return res.status(500).send('Erro ao consultar livro');
    livro.categoria = req.body.categoria;
    livro.nome = req.body.nome;
    livro.autor = req.body.autor;
    livro.ano = req.body.ano;
    livro.editora = req.body.editora;

    livro.save(err => {
      if (err) return res.status(500).send('Erro ao editar livro');
      return res.redirect('/livros');
    });
  });
});

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/livros',
    failureRedirect: '/login',
    failureFlash: true
  })
);

app.listen(port, () => {
  console.log('Servidor rodando na porta ' + port);
});
