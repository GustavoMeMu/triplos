document.getElementById('formularioExpresion').addEventListener('submit', function (e) {
    e.preventDefault();
    const entradaExpresion = document.getElementById('expresion').value.trim();
    const divResultado = document.getElementById('resultado');

    divResultado.innerHTML = '';

    // Validaciones
    if (!entradaExpresion) {
        divResultado.innerHTML = '<span id="error">Por favor, ingresa una expresión.</span>';
        return;
    }

    if (/[^0-9+\-*/()]/.test(entradaExpresion)) {
        divResultado.innerHTML = '<span id="error">La expresión contiene caracteres no válidos. Solo se permiten números y operadores (+, -, *, /).</span>';
        return;
    }

    if (/[\+\-\*\/]$/.test(entradaExpresion)) {
        divResultado.innerHTML = '<span id="error">La expresión no debe terminar con un operador.</span>';
        return;
    }

    const divPasos = document.createElement('div');
    divPasos.className = 'pasos';
    let expresionActual = entradaExpresion;


    while (expresionActual.includes('+') || expresionActual.includes('-') || expresionActual.includes('*') || expresionActual.includes('/')) {
        const regexOperacion = /(\d+(\.\d+)?)(\s*[\+\-\*\/]\s*)(\d+(\.\d+)?)/;
        const coincidencia = expresionActual.match(regexOperacion);
        if (coincidencia) {
            const operandoIzquierdo = parseFloat(coincidencia[1]);
            const operador = coincidencia[3].trim();
            const operandoDerecho = parseFloat(coincidencia[4]);
            let resultadoOperacion;

            
            switch (operador) {
                case '+':
                    resultadoOperacion = operandoIzquierdo + operandoDerecho;
                    break;
                case '-':
                    resultadoOperacion = operandoIzquierdo - operandoDerecho;
                    break;
                case '*':
                    resultadoOperacion = operandoIzquierdo * operandoDerecho;
                    break;
                case '/':
                    if (operandoDerecho === 0) {
                        divPasos.innerHTML += '<div class="paso" id="error">Error: No se puede dividir entre cero.</div>';
                        divResultado.appendChild(divPasos);
                        return; 
                    }
                    resultadoOperacion = operandoIzquierdo / operandoDerecho;
                    break;
            }

            
            expresionActual = expresionActual.replace(coincidencia[0], resultadoOperacion);
            divPasos.innerHTML += `<div class="paso">Realizando: ${operandoIzquierdo} ${operador} ${operandoDerecho} = ${resultadoOperacion}</div>`;
        }
    }

    divPasos.innerHTML += `<div class="paso">Resultado: ${expresionActual}</div>`;
    divResultado.appendChild(divPasos);
});
