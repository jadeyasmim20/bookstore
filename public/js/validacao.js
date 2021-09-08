// se não tiver livros
var registros = document.getElementById('itensLivrosBiblioteca').rows.length;

$(document).ready(function () {
  if (registros < 2) {
    $('#itensLivrosBiblioteca').append(
      ' <h3>Favor preencher um novo livro, clicando no botão "inserir livro"</h3>'
    );
  }
  $('#myInput').on('keyup', function () {
    var value = $(this).val().toLowerCase();
    $('#myTable tr').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

// validação categoria

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

// $('#nome').blur(function () {
//   var nome = $('#nome').val();
//   if (nome == '' || !isNaN(nome)) {
//     $('#nome').css('borderColor', 'red');
//   } else {
//     $('#nome').css('borderColor', 'green');
//   }
// });
