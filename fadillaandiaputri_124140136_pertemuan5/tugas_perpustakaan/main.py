from library_item import Book, Magazine
from member import Member
from library import Library


library = Library()

#Membuat Objek buku dan majalah
book1 = Book("B001", "Bumi", 2014, "Tere Liye")
book2 = Book("B002", "Jujutsu Kaisen 01", 2026, "Gege Akutami")
magazine1 = Magazine("M001", "National Geographic", 2024, "Edisi Januari")

#Membuat Objek anggota
member1 = Member("A001", "Fadilla")

#Menambahkan item ke perpustakaan
library.add_item(book1)
library.add_item(book2)
library.add_item(magazine1)

library.display_katalog()

print("\n---Search Item---")
library.search_item("Jujutsu Kaisen 01")

print("\n---Data Anggota---")
member1.display_info()

