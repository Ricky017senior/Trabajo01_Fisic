function calcularKirchhoffSerie() {
    const resistencias = document.getElementById("resistencias-serie").value.split(',').map(Number);
    const resistenciaTotal = resistencias.reduce((acc, val) => acc + val, 0);
    document.getElementById("resultado-kirchhoff-serie").innerText = `Resistencia Total en Serie: ${resistenciaTotal} Ω`;
}

function calcularKirchhoffParalelo() {
    const resistencias = document.getElementById("resistencias-paralelo").value.split(',').map(Number);
    const resistenciaTotal = 1 / resistencias.reduce((acc, val) => acc + (1 / val), 0);
    document.getElementById("resultado-kirchhoff-paralelo").innerText = `Resistencia Total en Paralelo: ${resistenciaTotal.toFixed(2)} Ω`;
}

function calcularOhm() {
    const voltaje = parseFloat(document.getElementById("voltaje").value);
    const corriente = parseFloat(document.getElementById("corriente").value);
    const resistencia = parseFloat(document.getElementById("resistencia").value);
    const potencia = parseFloat(document.getElementById("potencia").value);

    if (isNaN(voltaje)) {
        if (!isNaN(corriente) && !isNaN(resistencia)) {
            document.getElementById("voltaje").value = (corriente * resistencia).toFixed(2);
        } else if (!isNaN(potencia) && !isNaN(corriente)) {
            document.getElementById("voltaje").value = (potencia / corriente).toFixed(2);
        } else if (!isNaN(potencia) && !isNaN(resistencia)) {
            document.getElementById("voltaje").value = Math.sqrt(potencia * resistencia).toFixed(2);
        }
    }
    
    if (isNaN(corriente)) {
        if (!isNaN(voltaje) && !isNaN(resistencia)) {
            document.getElementById("corriente").value = (voltaje / resistencia).toFixed(2);
        } else if (!isNaN(potencia) && !isNaN(voltaje)) {
            document.getElementById("corriente").value = (potencia / voltaje).toFixed(2);
        } else if (!isNaN(potencia) && !isNaN(resistencia)) {
            document.getElementById("corriente").value = Math.sqrt(potencia / resistencia).toFixed(2);
        }
    }

    if (isNaN(resistencia)) {
        if (!isNaN(voltaje) && !isNaN(corriente)) {
            document.getElementById("resistencia").value = (voltaje / corriente).toFixed(2);
        } else if (!isNaN(voltaje) && !isNaN(potencia)) {
            document.getElementById("resistencia").value = (Math.pow(voltaje, 2) / potencia).toFixed(2);
        } else if (!isNaN(potencia) && !isNaN(corriente)) {
            document.getElementById("resistencia").value = (potencia / Math.pow(corriente, 2)).toFixed(2);
        }
    }

    if (isNaN(potencia)) {
        if (!isNaN(voltaje) && !isNaN(corriente)) {
            document.getElementById("potencia").value = (voltaje * corriente).toFixed(2);
        } else if (!isNaN(voltaje) && !isNaN(resistencia)) {
            document.getElementById("potencia").value = (Math.pow(voltaje, 2) / resistencia).toFixed(2);
        } else if (!isNaN(resistencia) && !isNaN(corriente)) {
            document.getElementById("potencia").value = (Math.pow(corriente, 2) * resistencia).toFixed(2);
        }
    }
}

function calcularMaxwell() {
    const E = parseFloat(document.getElementById("campo-electrico").value);
    const Phi = parseFloat(document.getElementById("flujo-electrico").value);
    const rho = parseFloat(document.getElementById("densidad-carga").value);
    const epsilon = parseFloat(document.getElementById("permisividad").value);

    let resultado = "";

    if (!isNaN(E) && !isNaN(Phi) && !isNaN(epsilon)) {
        if (isNaN(rho)) {
            const A = Phi / (E * epsilon);
            resultado = `Área (A) = ${A.toFixed(2)} m²`;
        } else {
            const Q = rho * epsilon;
            resultado = `Carga (Q) = ${Q.toFixed(2)} C`;
        }
    } else if (!isNaN(Phi) && !isNaN(epsilon) && !isNaN(rho)) {
        const E_calculado = Phi / (epsilon * rho);
        resultado = `Campo Eléctrico (E) = ${E_calculado.toFixed(2)} V/m`;
    } else if (!isNaN(E) && !isNaN(rho) && !isNaN(epsilon)) {
        const Phi_calculado = E * rho * epsilon;
        resultado = `Flujo Eléctrico (Φ) = ${Phi_calculado.toFixed(2)} Vm`;
    } else {
        resultado = `Por favor, ingresa todos los valores necesarios.`;
    }

    document.getElementById("resultado-maxwell").innerText = resultado;
}

function calcularGauss() {
    const E = parseFloat(document.getElementById("campo-electrico-gauss").value);
    const A = parseFloat(document.getElementById("area").value);
    const Q = parseFloat(document.getElementById("carga").value);

    let resultado = "";

    if (!isNaN(E) && !isNaN(A)) {
        const Phi = E * A;
        resultado = `Flujo Eléctrico (Φ): ${Phi.toFixed(2)} Vm`;
    } else if (!isNaN(Q) && !isNaN(A)) {
        const epsilon = 8.854e-12; // Constante de permisividad del vacío
        const E_calculado = Q / (epsilon * A);
        resultado = `Campo Eléctrico (E): ${E_calculado.toFixed(2)} N/C`;
    } else {
        resultado = `Por favor, ingresa todos los valores necesarios.`;
    }

    document.getElementById("resultado-gauss").innerText = resultado;
}

function calcularFaraday() {
    const deltaPhi = parseFloat(document.getElementById("variacion-flujo").value);
    const deltaT = parseFloat(document.getElementById("tiempo").value);

    if (!isNaN(deltaPhi) && !isNaN(deltaT)) {
        const emf = -deltaPhi / deltaT;
        document.getElementById("resultado-faraday").innerText = `Fuerza Electromotriz Inducida (EMF): ${emf.toFixed(2)} V`;
    } else {
        document.getElementById("resultado-faraday").innerText = `Por favor, ingresa todos los valores necesarios.`;
    }
}
