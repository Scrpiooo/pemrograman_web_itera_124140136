## Identitas
- **Nama:** Fadilla Andia Putri
- **NIM:** 124140136

## Deskripsi
Program ini merupakan sistem manajemen perpustakaan sederhana yang dibuat menggunakan Python dengan menerapkan konsep Object-Oriented Programming (OOP). Program dapat mengelola data buku dan majalah, menampilkan katalog perpustakaan, serta mencari item berdasarkan judul atau ID.

## Fitur Program
1. Menambahkan buku dan majalah ke katalog perpustakaan.
2. Menampilkan seluruh koleksi perpustakaan.
3. Mencari item berdasarkan judul atau ID.
4. Menampilkan informasi anggota perpustakaan.

## Konsep OOP yang Digunakan
- **Class dan Object:** Membuat class LibraryItem, Book, Magazine, Library, dan Member.
- **Inheritance:** Class Book dan Magazine mewarisi class LibraryItem.
- **Encapsulation:** Menggunakan atribut private untuk menyimpan data.
- **Abstraction:** Menggunakan abstract class dan abstract method pada LibraryItem.
- **Polymorphism:** Method `display_info()` memiliki implementasi berbeda pada class Book dan Magazine.
- **Properties:** Menggunakan `@property` untuk mengakses atribut private.

## Cara Menjalankan Program
1. Pastikan Python sudah terinstal.
2. Buka terminal pada folder `tugas_perpustakaan`.
3. Jalankan perintah berikut:

```bash
python main.py
```

4. Program akan menampilkan katalog perpustakaan, hasil pencarian item, dan informasi anggota.

## Dokumentasi
Tangkapan layar hasil program:

![Hasil Program](tugas_perpustakaan\screenshot\hasil.png)
