let buscarBtn = document.getElementById('buscar-btn');
buscarBtn.onclick = function mostraClima() {

    let cidade = document.getElementById('cidade-input').value;

    //fetch para chamar a rota da API
    fetch(`/clima?cidade=${cidade}`)
        .then(response => response.json())
        .then(data => {

            if(data.error) {
                alert(data.error.message);
                return;
            }

            document.getElementById('cidade').textContent = data.location.name;
            document.getElementById('temperatura').textContent = data.current.temp_c;
            document.getElementById('condicao').textContent = data.current.condition.text;

        })
        .catch(error => console.error('Erro ao buscar dados do clima:', error));
}

