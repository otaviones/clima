const buscarBtn = document.getElementById('buscar-btn');
if (buscarBtn) {
    buscarBtn.addEventListener('click', mostraClima);
} else {
    console.error("Elemento 'buscar-btn' não encontrado.");
}

function mostraClima(event) {
    event.preventDefault();

    const cidadeInput = document.getElementById('cidade-input');
    const cidade = cidadeInput ? cidadeInput.value.trim() : '';

    if (!cidade) {
        alert('Por favor, informe uma cidade.');
        return;
    }

    //fetch para chamar a rota da API
    fetch(`/clima?cidade=${encodeURIComponent(cidade)}`)
        .then(response => {
            if (!response.ok) throw new Error('Resposta de rede não OK');
            return response.json();
        })
        .then(data => {

            if (data.error) {
                alert(data.error.message || 'Erro retornado pela API');
                return;
            }

            const cidadeEl = document.getElementById('cidade');
            const temperaturaEl = document.getElementById('temperatura');
            const condicaoEl = document.getElementById('condicao');

            if (cidadeEl) cidadeEl.textContent = data.location?.name ?? '';
            if (temperaturaEl) temperaturaEl.textContent = data.current?.temp_c ?? '';
            if (condicaoEl) condicaoEl.textContent = data.current?.condition?.text ?? '';

        })
        .catch(error => console.error('Erro ao buscar dados do clima:', error));
}

