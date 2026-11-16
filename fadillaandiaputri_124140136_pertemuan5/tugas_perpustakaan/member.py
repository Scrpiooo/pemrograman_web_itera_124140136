class Member:
    def __init__(self, member_id, name):
        self.__member_id = member_id
        self.__name = name

    @property
    def member_id(self):
        return self.__member_id

    @property
    def name(self):
        return self.__name

    def display_info(self):
        print(f"ID Anggota: {self.member_id}")
        print(f"Nama: {self.name}")   
        