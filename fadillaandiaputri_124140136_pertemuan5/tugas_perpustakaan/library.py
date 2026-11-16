class Library:
    def __init__(self):
        self.__koleksi = []

    def add_item(self, item):
        self.__koleksi.append(item)
        print(f"{item.title} berhasil ditambahkan")

    def display_katalog(self):
        if not self.__koleksi:
            print("Katalog perpustakaan masih kosong")
            return

        print(f"\n---KATALOG PERPUSTAKAAN---")
        for item in self.__koleksi:
            item.display_info()
            print("--------------------------")

    def search_item(self, keyword):
        found = False

        for item in self.__koleksi:
            if (keyword.lower() in item.title.lower() or keyword.lower() == item.item_id.lower()):
                item.display_info()
                found = True

        if not found:
            print("Item tidak ditemukan")