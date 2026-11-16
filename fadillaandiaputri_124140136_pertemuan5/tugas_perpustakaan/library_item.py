from abc import ABC, abstractmethod

class LibraryItem(ABC):
    def __init__(self, item_id, title, year):
        self.__item_id = item_id
        self.__title = title
        self.__year = year

    @property
    def item_id(self):
        return self.__item_id

    @property
    def title(self):
        return self.__title

    @property
    def year(self):
        return self.__year

    @abstractmethod
    def display_info(self):
        pass

class Book(LibraryItem):
    def __init__(self, item_id, title, year, author):
        super().__init__(item_id, title, year)
        self.author = author

    def display_info(self):
        print("Jenis: Buku")
        print(f"ID: {self.item_id}")
        print(f"Judul: {self.title}")
        print(f"Tahun: {self.year}")
        print(f"Penulis: {self.author}")

class Magazine(LibraryItem):
    def __init__(self, item_id, title, year, edition):
        super().__init__(item_id, title, year)
        self.edition = edition

    def display_info(self):
        print("Jenis: Majalah")
        print(f"ID: {self.item_id}")
        print(f"Judul: {self.title}")
        print(f"Tahun: {self.year}")
        print(f"Edisi: {self.edition}")

        