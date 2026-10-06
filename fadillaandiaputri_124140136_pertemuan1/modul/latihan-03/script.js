const mahasiswa = [
    {
        nama: "Fadilla",
        nim: "124140136",
        jurusan: "Teknik Informatika",
        nilai: 90
    },
    {
        nama: "Nabilah",
        nim: "124140106",
        jurusan: "Teknik Informatika",
        nilai: 85
    },
    {
        nama: "Dhea",
        nim: "124220088",
        jurusan: "Teknik Lingkungan",
        nilai: 80
    },
    {
        nama: "Lala",
        nim: "126130167",
        jurusan: "Teknik Elektro",
        nilai: 75
    },
    {
        nama: "Aisyah",
        nim: "123008008",
        jurusan: "Farmasi",
        nilai: 88
    }
];

for (let i = 0; i < mahasiswa.length; i++) {
    document.getElementById("result").innerHTML += `
        <tr>
            <td>${mahasiswa[i].nama}</td>
            <td>${mahasiswa[i].nim}</td>
            <td>${mahasiswa[i].jurusan}</td>
            <td>${mahasiswa[i].nilai}</td>
        </tr>`;
}

//////
function cariNilaiTertinggi(data) {
    return data.reduce((tertinggi, mahasiswa) => {
        return mahasiswa.nilai > tertinggi.nilai ? mahasiswa : tertinggi;
    });
}

const mahasiswaTertinggi = cariNilaiTertinggi(mahasiswa);

document.getElementById("resultt").innerHTML += `
    <p>Nilai tertinggi: ${mahasiswaTertinggi.nama} - ${mahasiswaTertinggi.nilai}</p>`;

//////
const totalNilai = mahasiswa.reduce((total, mhs) => {
    return total + mhs.nilai;
}, 0);

const rataRata = totalNilai / mahasiswa.length;

const mahasiswaDiAtasRata = mahasiswa.filter((mhs) => {
    return mhs.nilai > rataRata;
});

document.getElementById("resultt").innerHTML += `
    <h4>Mahasiswa dengan Nilai di Atas Rata-rata</h4>
    <p>Rata-rata nilai: ${rataRata.toFixed(2)}</p>`;

mahasiswaDiAtasRata.forEach((mhs) => {
    document.getElementById("resultt").innerHTML += `
        <p>${mhs.nama} - ${mhs.nilai}</p>`;
});

//////
function urutkanNama(data, ascending = true) {
    return [...data].sort((a, b) => {
        if (ascending) {
            return a.nama > b.nama ? 1 : -1;
        } else {
            return a.nama < b.nama ? 1 : -1;
        }
    });
}

const ascending = urutkanNama(mahasiswa, true);
const descending = urutkanNama(mahasiswa, false);

document.getElementById("resultt").innerHTML += `
    <h4>Ascending</h4>`;

ascending.forEach((mhs) => {
    document.getElementById("resultt").innerHTML += `
        <p>${mhs.nama}</p>`;
});

document.getElementById("resultt").innerHTML += `
    <h4>Descending</h4>`;

descending.forEach((mhs) => {
    document.getElementById("resultt").innerHTML += `
        <p>${mhs.nama}</p>`;
});

///////
const editmhs = [];

function tampilkanMahasiswa() {
    document.getElementById("result").innerHTML = "";

    editmhs.forEach((mhs, index) => {
        document.getElementById("result").innerHTML += `
            <tr>
                <td>${mhs.nama}</td>
                <td>${mhs.nim}</td>
                <td>${mhs.jurusan}</td>
                <td>${mhs.nilai}</td>
                <td>
                    <button onclick="editMahasiswa(${index})">Edit</button>
                    <button onclick="hapusMahasiswa(${index})">Hapus</button>
                </td>
            </tr>
        `;
    });
}

document.getElementById("tambah").addEventListener("click", function() {
    const nama = document.getElementById("nama").value;
    const nim = document.getElementById("nim").value;
    const jurusan = document.getElementById("jurusan").value;
    const nilai = Number(document.getElementById("nilai").value);

    editmhs.push({
        nama: nama,
        nim: nim,
        jurusan: jurusan,
        nilai: nilai
    });

    tampilkanMahasiswa();
});

function editMahasiswa(index) {
    const mhs = editmhs[index];

    mhs.nama = prompt("Nama baru:", mhs.nama);
    mhs.nim = prompt("NIM baru:", mhs.nim);
    mhs.jurusan = prompt("Jurusan baru:", mhs.jurusan);
    mhs.nilai = Number(prompt("Nilai baru:", mhs.nilai));

    tampilkanMahasiswa();
}

function hapusMahasiswa(index) {
    editmhs.splice(index, 1);
    tampilkanMahasiswa();
}