const calculate = document.querySelector('#calcular')

function IMC() {

    const name = document.querySelector('#nome').value
    const height = document.querySelector('#altura').value
    const weight = document.querySelector('#peso').value
    const result = document.querySelector('#resultado')

    if (name != "" && height != "" && weight != "") {

        const imc = (weight/(height*height)).toFixed(1)
        let info = ""
        
        if (imc < 18.5) {
            info = "abaixo do peso"
        }
        else if (imc >= 18.5 && imc <= 24.9) {
            info = "com peso normal"
        }
        else if (imc >= 25.0 && imc <= 29.9) {
            info = "com sobrepeso"
        }
        else if (imc >= 30.0 && imc <= 34.9) {
            info = " com obesidade grau I"
        }
        else if (imc >= 35.0 && imc <= 39.9) {
            info = "com obesidade grau II (severa)"
        }
        else{
            info = "com obesidade grau III (mórbida)"
        }

        result.textContent = `${name} seu IMC é ${imc} e você está ${info}`

    }else{
        result.textContent = "Por favor preencha todos os campos"
    }
}

calculate.addEventListener('click', IMC)



