var express = require('express');
var mongoose = require('mongoose');

const app = express();
const port = 8000;

mongoose.connect(
  'mongodb+srv://jade_yasmim:jade_yasmim@cluster0.91nhm.mongodb.net/biblioteca?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

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
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Página inicial');
});

app.get('/livros', (req, res) => {
  let consulta = Livros.find({}, (err, livro) => {
    if (err) return res.status(500).send('Erro ao consultar Livro');

    res.render('livros', { livro_itens: livro });
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

app.listen(port, () => {
  console.log('Servidor rodando na porta ' + port);
});
