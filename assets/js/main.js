const imagemClima = document.getElementById('imagem-clima');
const nomeDaCidadeNoSpanDoTitulo = document.getElementById('nome-da-cidade')
const btn = document.getElementById('btn');
const btnLimpar = document.getElementById('btn-limpar');
const textoDasTemperaturas = document.getElementById('texto')
textoDasTemperaturas.style.display = 'none';

btn.addEventListener('click', () => {
    const cidade = document.getElementById('cidade').value;
    const APIKey = '6cab81b6a822d47ea40c50fea57221bd';
    const urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${APIKey}&lang=pt_br&units=metric`
    buscarAPI(urlAPI, cidade);
})

async function buscarAPI(urlAPI, cidade) {
    try {
        limparTexto();
        const conexao = await fetch(`${urlAPI}`);
        const conexaoConvertida = await conexao.json();
        console.log(conexaoConvertida);
        textoDasTemperaturas.style.display = 'flex';
        nomeDaCidadeNoSpanDoTitulo.innerHTML = `de ${cidade}`;
    
        mostrarTexto(conexaoConvertida);  
    } catch (error) {
        textoDasTemperaturas.innerHTML = `<p>Não foi possível acessar o clima da cidade</p>`
    }  
}

function mostrarTexto(conexaoConvertida){
    const tempMinima = document.createElement('p');
    tempMinima.classList.add('tempMinima');
    tempMinima.innerHTML = `Temperatura Miníma: <span class="temperaturas">${conexaoConvertida.main.temp_min}</span>`;

    const tempMax = document.createElement('p');
    tempMax.classList.add('tempMax');
    tempMax.innerHTML = `Temperatura Máxima: <span class="temperaturas">${conexaoConvertida.main.temp_max}</span>`;

    const temp = document.createElement('p');
    temp.classList.add('temp');
    temp.innerHTML = `Temperatura: <span class="temperaturas">${conexaoConvertida.main.temp}</span>`;

    const tempo = document.createElement('p');
    tempo.classList.add('tempo');
    tempo.innerHTML = `Tempo: <span class="temperaturas">${conexaoConvertida.weather[0].description}</span>`;

    textoDasTemperaturas.appendChild(tempMinima);
    textoDasTemperaturas.appendChild(tempMax);
    textoDasTemperaturas.appendChild(temp);
    textoDasTemperaturas.appendChild(tempo);

    imagemClima.src = `https://openweathermap.org/img/wn/${conexaoConvertida.weather[0].icon}@2x.png`;
    imagemClima.alt = conexaoConvertida.weather[0].description;
}

function limparTexto(){
    textoDasTemperaturas.innerHTML = '';
}

btnLimpar.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('cidade').value = '';
    textoDasTemperaturas.innerHTML = '';
    imagemClima.src = 'assets/img/sol.png';
    imagemClima.alt = 'Sol';
    nomeDaCidadeNoSpanDoTitulo.innerHTML = '';
    textoDasTemperaturas.style.display = 'none';
})