let totalBelanja = 0;
let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

document.getElementById("formBarang").addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = document.getElementById("namaBarang").value.trim();
    const harga = Number(document.getElementById("hargaBarang").value);
    const qty = Number(document.getElementById("qtyBarang").value);

    document.getElementById("errorNama").innerHTML = "";
    document.getElementById("errorHarga").innerHTML = "";
    document.getElementById("errorQty").innerHTML = "";

    let valid = true;

    if (nama.length < 3) {
        document.getElementById("errorNama").innerHTML =
            "Nama barang minimal 3 karakter.";
        valid = false;
    }

    if (harga < 500 || isNaN(harga)) {
        document.getElementById("errorHarga").innerHTML =
            "Harga minimal Rp500.";
        valid = false;
    }

    if (!Number.isInteger(qty) || qty < 1) {
        document.getElementById("errorQty").innerHTML =
            "Qty harus berupa angka bulat minimal 1.";
        valid = false;
    }

    if (valid) {
        const subtotal = harga * qty;

        keranjang.push({
            nama: nama,
            harga: harga,
            qty: qty,
            subtotal: subtotal
        });

        localStorage.setItem("keranjang", JSON.stringify(keranjang));

        tampilkanKeranjang();
        hitungTotalKeranjang();

        document.getElementById("formBarang").reset();
    }
});

function hitungKembalian() {
    const uangBayar = Number(document.getElementById("uangBayar").value);

    if (uangBayar < totalBelanja) {
        document.getElementById("kembalian").innerHTML =
            "Uang tidak mencukupi";
    } else {
        const kembalian = uangBayar - totalBelanja;

        document.getElementById("kembalian").innerHTML =
            "Rp" + kembalian.toLocaleString("id-ID");
    }
}

document.getElementById("uangBayar").addEventListener("input", function() {
    hitungKembalian();
});

function tampilkanKeranjang() {
    document.getElementById("keranjang").innerHTML = "";

    keranjang.forEach((barang, index) => {
        document.getElementById("keranjang").innerHTML += `
            <tr>
                <td>${barang.nama}</td>
                <td>Rp${barang.harga.toLocaleString("id-ID")}</td>
                <td>${barang.qty}</td>
                <td>Rp${barang.subtotal.toLocaleString("id-ID")}</td>
                <td>
                    <button onclick="hapusBarang(${index})">Hapus</button>
                </td>
            </tr>
        `;
    });
}


function hapusBarang(index) {
    keranjang.splice(index, 1);

    localStorage.setItem("keranjang", JSON.stringify(keranjang));

    tampilkanKeranjang();
    hitungTotalKeranjang();
}


function hitungTotalKeranjang() {
    let subtotalSemua = 0;

    keranjang.forEach((barang) => {
        subtotalSemua += barang.subtotal;
    });

    let diskon = 0;

    if (subtotalSemua >= 50000) {
        diskon = subtotalSemua * 0.1;
    }

    totalBelanja = subtotalSemua - diskon;

    document.getElementById("subtotal").innerHTML =
        "Rp" + subtotalSemua.toLocaleString("id-ID");

    document.getElementById("diskon").innerHTML =
        "Rp" + diskon.toLocaleString("id-ID");

    document.getElementById("total").innerHTML =
        "Rp" + totalBelanja.toLocaleString("id-ID");

    hitungKembalian();
}


document.getElementById("resetTransaksi").addEventListener("click", function() {
    keranjang = [];

    localStorage.removeItem("keranjang");
    document.getElementById("uangBayar").value = "";

    tampilkanKeranjang();
    hitungTotalKeranjang();
});


tampilkanKeranjang();
hitungTotalKeranjang();