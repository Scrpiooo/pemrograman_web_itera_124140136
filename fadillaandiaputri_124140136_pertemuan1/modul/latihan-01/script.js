const nama = "Fadilla Andia Putri";
let umur = 20;
const kotaAsal = "Bandar Lampung";

document.getElementById("result").innerHTML = `
    <p>Nama: ${nama}</p>
    <p>Umur: ${umur} tahun</p>
    <p>Kota Asal: ${kotaAsal}</p>
`;

////////
const nilai = 90;

if(nilai >= 70){
    document.getElementById("result").innerHTML += `
    <p>Nilai: ${nilai}<p>
    <p>Status: Lulus</p>`;
}else{
    document.getElementById("result").innerHTML += `
    <p>Nilai: ${nilai}<p>
    <p>Status: Tidak Lulus</p>`;
}

///////
const umurKategori = 14;

if(umurKategori < 12){
    document.getElementById("result").innerHTML += `
    <p>Umur: ${umurKategori}<p>
    <p>Kategori: Anak-anak<p/>`;
}else if(umurKategori >= 12 && umurKategori <= 17){
    document.getElementById("result").innerHTML += `
    <p>Umur: ${umurKategori}<p>
    <p>Kategori: Remaja</p>`;
}else if(umurKategori >= 18 && umurKategori <= 59){
    document.getElementById("result").innerHTML += `
    <p>Umur: ${umurKategori}<p>
    <p>Kategori: Dewasa</p>`;
}else{
    document.getElementById("result").innerHTML += `
    <p>Umur: ${umurKategori}<p>
    <p>Kategori: Lansia</p>`;
}

//////
const nomorHari = 3;

switch (nomorHari) {
    case 1:
        document.getElementById("result").innerHTML += `
            <p>Hari: Monday</p>
        `;
        break;
    case 2:
        document.getElementById("result").innerHTML += `
            <p>Hari: Tuesday</p>
        `;
        break;
    case 3:
        document.getElementById("result").innerHTML += `
            <p>Hari: Wednesday</p>
        `;
        break;
    case 4:
        document.getElementById("result").innerHTML += `
            <p>Hari: Thursday</p>
        `;
        break;
    case 5:
        document.getElementById("result").innerHTML += `
            <p>Hari: Friday</p>
        `;
        break;
    case 6:
        document.getElementById("result").innerHTML += `
            <p>Hari: Saturday</p>
        `;
        break;
    case 7:
        document.getElementById("result").innerHTML += `
            <p>Hari: Sunday</p>
        `;
        break;
    default:
        document.getElementById("result").innerHTML += `
            <p>the number is invalid</p>
        `;
}

//////
const nilaiGrade = 85;

const grade = nilaiGrade >= 80 ? "A" : nilaiGrade >= 70 ? "B" : "C";
    document.getElementById("result").innerHTML += `
        <p>Nilai: ${nilaiGrade}</p>
        <p>Grade: ${grade}</p>
    `;