
document.addEventListener('DOMContentLoaded', function () {
    const pesoInput = document.getElementById('pesofloat');
    const estaturaInput = document.getElementById('estaturafloat');
    // const imcInput = document.getElementById('imcfloat');

    function calcularIMC() {
        const peso = parseFloat(pesoInput.value);
        const estatura = parseFloat(estaturaInput.value) / 100;

        if (!isNaN(peso) && !isNaN(estatura) && estatura > 0) {
            const imc = peso / (estatura * estatura);
        //     imcInput.value = imc.toFixed(2);
        }
    }

    pesoInput.addEventListener('input', calcularIMC);
    estaturaInput.addEventListener('input', calcularIMC);
});
