document.getElementById("formMahasiswa").addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value;
    const nim = document.getElementById("nim").value;
    const jurusan = document.getElementById("jurusan").value;
    const nilai = document.getElementById("nilai").value;

    if (nama === "" || nim === "" || jurusan === "" || nilai === "") {
        document.getElementById("result").innerHTML = "Semua data harus diisi!";
        return;
    }

     const mahasiswa = {
        nama: nama,
        nim: nim,
        jurusan: jurusan,
        nilai: nilai
    };

    localStorage.setItem("mahasiswa", JSON.stringify(mahasiswa));

    document.getElementById("result").innerHTML = `
        <p>Data mahasiswa berhasil ditambahkan!</p>
        <p>Nama: ${nama}</p>
        <p>NIM: ${nim}</p>
        <p>Jurusan: ${jurusan}</p>
        <p>Nilai: ${nilai}</p>`;
});

//////
let dataPost = [];
let halaman = 1;
const jumlahPost = 5;

fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => {
        dataPost = data;
        tampilkanPost();
    });

function tampilkanPost() {
    const mulai = (halaman - 1) * jumlahPost;
    const akhir = mulai + jumlahPost;

    const dataHalaman = dataPost.slice(mulai, akhir);

    document.getElementById("posts").innerHTML = "";

    dataHalaman.forEach(post => {
        document.getElementById("posts").innerHTML += `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        `;
    });
}

document.getElementById("darkMode").addEventListener("click", function() {
    document.body.classList.toggle("dark");
});


document.getElementById("next").addEventListener("click", function() {
    if (halaman < Math.ceil(dataPost.length / jumlahPost)) {
        halaman++;
        tampilkanPost();
    }
});


document.getElementById("previous").addEventListener("click", function() {
    if (halaman > 1) {
        halaman--;
        tampilkanPost();
    }
});

//////
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function tampilkanTodo() {
    document.getElementById("todoList").innerHTML = "";

    todos.forEach((todo, index) => {
        document.getElementById("todoList").innerHTML += `
            <li>
                <span>${todo.text}</span>
                <button onclick="selesaiTodo(${index})">
                    ${todo.selesai ? "Batal" : "Selesai"}
                </button>
                <button onclick="hapusTodo(${index})">
                    Hapus
                </button>
            </li>
        `;
    });
}

document.getElementById("tambahTodo").addEventListener("click", function() {
    const input = document.getElementById("todoInput");
    const text = input.value;

    if (text === "") {
        return;
    }

    todos.push({
        text: text,
        selesai: false
    });

    localStorage.setItem("todos", JSON.stringify(todos));

    input.value = "";

    tampilkanTodo();
});

function selesaiTodo(index) {
    todos[index].selesai = !todos[index].selesai;

    localStorage.setItem("todos", JSON.stringify(todos));

    tampilkanTodo();
}

function hapusTodo(index) {
    todos.splice(index, 1);

    localStorage.setItem("todos", JSON.stringify(todos));

    tampilkanTodo();
}

tampilkanTodo();