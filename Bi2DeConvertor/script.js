function convert () {
    const input = document.getElementById('number');
    const number = input.value;
    let decimal = 0;
    number.split('').forEach((digit,index) => {
        const power = number.length - 1 - index;
        decimal += parseInt(digit)*Math.pow(2,power);
    })
    document.getElementById('result').textContent = decimal;
}