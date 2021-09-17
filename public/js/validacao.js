// se não tiver livros
var registros = document.getElementById('itensLivrosBiblioteca').rows.length;

$(document).ready(function () {
  if (registros < 2) {
    $('#itensLivrosBiblioteca').append(
      ' <h3>Favor preencher um novo livro, clicando no botão "inserir livro"</h3>'
    );
  }
  $('#myInput').on('keyup', function () {
    // id  quando eu solto a teclado
    var value = $(this).val().toLowerCase(); // procura por letras minusculas
    $('#myTable tr').filter(function () {
      // vai filtrar o que tiver na minha tr
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1); //toggle vai mostrar, o texto que eu digitar no campo bucar em letras minusculas, e o -1 é pra que ele procure a partir de 1 letra.
    });
  });

  $('#mostrarLista').click(function () {
    $('.modal').css({ display: 'initial' });
  });

  $('#logar').click(function () {
    var usuario = document.getElementById('#login_nome').value;
    var senha = document.getElementById('#senha').value;
    alert('teste');
    /**
    if (usuario == 'adm' && senha == '123456') {
      $('.esconder').show();
      $('.modal').css({ display: 'none' });
      alert('Administrador logado!');
    } else {
      $('.modal').css({ display: 'none' });
      alert('Usuário logado!');
    }

 */
  });

  $(function () {
    $('.close').click(function () {
      $('.modal').css({ display: 'none' });
    });
  });
});

//função que valida campo nome
function validaNome() {
  var nome = document.getElementById('nome').value;

  if (!isNaN(nome) || nome == '') {
    alert('Nome invalido!');
    document.getElementById('nome').style.border = 'red solid';
  } else {
    document.getElementById('nome').style.border = 'green solid';
  }
}

/**
function getCookie() {
  var cookies = document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .reduce(
      (accumulator, [key, value]) => ({
        ...accumulator,
        [key.trim()]: decodeURIComponent(value)
      }),
      {}
    );
}
 */

// $('#nome').blur(function () {
//   var nome = $('#nome').val();
//   if (nome == '' || !isNaN(nome)) {
//     $('#nome').css('borderColor', 'red');
//   } else {
//     $('#nome').css('borderColor', 'green');
//   }
// });
