

/**
 * 
 |<div class="form-group col-md-3">
 |    <label for="inputcep">Cep</label>
 |    <input type="text" class="form-control" id="input_cep" name="endereco[cep]" maxlength="9" onblur="pesquisacep(this.value);" value="">
 |</div> 
*/

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('input_rua').value = ('');
    document.getElementById('input_rua').value = ('');
    document.getElementById('input_bairro').value = ('');
    document.getElementById('input_cidade').value = ('');
    document.getElementById('input_estado').value = ('');
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('input_rua').value = (conteudo.logradouro);
        document.getElementById('input_bairro').value = (conteudo.bairro);
        document.getElementById('input_cidade').value = (conteudo.localidade);
        document.getElementById('input_estado').value = (conteudo.uf);

    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('input_rua').value = "consultando";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = '//viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};



