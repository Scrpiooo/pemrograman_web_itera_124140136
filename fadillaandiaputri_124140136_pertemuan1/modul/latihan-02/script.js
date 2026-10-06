const angka = 9;

for (let i = 1; i <= 10; i++) {
    document.getElementById("result").innerHTML += `
        <p>${angka} x ${i} = ${angka * i}</p>`;
}

//////
function faktorial(a) {
    let hasil = 1;

    for (let i = 1; i <= a; i++) {
        hasil = hasil * i;
    }

    return hasil;
}

const a = 5;
const hasil = faktorial(a);

document.getElementById("result").innerHTML += `
    <p>Faktorial dari ${a} = ${hasil}</p>`;

//////
function isPrima(angka) {
    if (angka < 2) {
        return false;
    }

    for (let i = 2; i < angka; i++) {
        if (angka % i === 0) {
            return false;
        }
    }

    return true;
}

const angkaPrima = 7;

document.getElementById("result").innerHTML += `
    <p>${angkaPrima} adalah bilangan prima: ${isPrima(angkaPrima)}</p>`;

//////
function hitungBMI(berat, tinggi) {
    const tinggiMeter = tinggi / 100;
    const bmi = berat / (tinggiMeter * tinggiMeter);

    return bmi;
}

document.getElementById("hitung").addEventListener("click", function() {
    const berat = Number(document.getElementById("berat").value);
    const tinggi = Number(document.getElementById("tinggi").value);

    const bmi = hitungBMI(berat, tinggi);

    document.getElementById("result").innerHTML = `
        <p>BMI kamu: ${bmi.toFixed(2)}</p>`;
});

//////
for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        document.getElementById("result").innerHTML += `<p>FizzBuzz</p>`;
    } else if (i % 3 === 0) {
        document.getElementById("result").innerHTML += `<p>Fizz</p>`;
    } else if (i % 5 === 0) {
        document.getElementById("result").innerHTML += `<p>Buzz</p>`;
    } else {
        document.getElementById("result").innerHTML += `<p>${i}</p>`;
    }
}