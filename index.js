//Requirements
const express = require('express');
const axios = require('axios/dist/node/axios.cjs');
const path =  require('path');


const app = express();
app.use(express.static('public'));
const port = 3000;


/**
 * Middlewares
 */

//Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})



//Clima por região
app.get('/clima', async (req, res) => {
    console.log('Verificando a chave no servidor:', process.env.WEATHER_API_KEY);
    try {
        //Pegando a cidade que veio do FRONT URL
        const cidade = req.query.cidade;

        const response = await axios.get('http://api.weatherapi.com/v1/current.json', { //O sgundo parametro é um objeto com os shortcuts da URL
            params: {
                key: process.env.WEATHER_API_KEY,
                q: cidade,
                aqi: 'yes',
                lang: 'pt'
            }
        });

        res.json(response.data);

    } catch (error) {
        console.error("Erro ao buscar dados do clime:", error);
        res.status(500).send('Erro ao buscar dados do clima.');
    }
});










/**
 * SERVER START
 */

app.listen(port, () => {
    console.log(`exemplo escutando a porta ${port}`);
})