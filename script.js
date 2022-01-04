const apiKey = 'a65c0df4e90778e4b62e8f83288a672f'

const main = document.querySelector('main')
const pesquisa = document.getElementById('pesquisa')
const form = document.querySelector('form')

const url = (cidade) => `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}`

async function verClimaPelaCidade(cidade) {
    const resp = await fetch(url(cidade), {origin: 'cros'})

    const respData = await resp.json()
    addClimaNaPagina(respData)
}

function addClimaNaPagina(data) {
    const temp = Ktoc(data.main.temp)
    const clima = document.createElement('div')

    clima.classList.add('clima')

    clima.innerHTML = `  
      <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>  
      <small>${data.weather[0].main}</small>  
    `;  

    main.innerHTML= "";  
    main.appendChild(clima);
}

function Ktoc(K) {
    return Math.floor(K - 273.15)
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const cidade = pesquisa.value

    if (cidade) {
        verClimaPelaCidade(cidade)
    }
})