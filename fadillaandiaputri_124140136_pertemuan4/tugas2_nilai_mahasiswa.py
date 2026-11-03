#Data Mahasiswa
mahasiswa = [
    {
        "nama": "Fadilla",
        "nim": "124140136",
        "nilai_uts": 90,
        "nilai_uas": 85,
        "nilai_tugas": 95
    },
    {
        "nama": "Niken",
        "nim": "124140106",
        "nilai_uts": 80,
        "nilai_uas": 95,
        "nilai_tugas": 80 
    },
    {
        "nama": "Nafisya",
        "nim": "12140100",
        "nilai_uts": 78,
        "nilai_uas": 85,
        "nilai_tugas": 95
    },
    {
        "nama": "Oliv",
        "nim": "124140034",
        "nilai_uts": 75,
        "nilai_uas": 70,
        "nilai_tugas": 97
    },
    {
        "nama": "Naila",
        "nim": "126270167",
        "nilai_uts": 68,
        "nilai_uas": 80,
        "nilai_tugas": 90
    },
]

#Menghitung Nilai Akhir
for mhs in mahasiswa:
    nilai_akhir = (
        mhs["nilai_uts"] * 0.3 
        + mhs["nilai_uas"] * 0.4
        + mhs["nilai_tugas"] * 0.3
    )
    mhs["nilai_akhir"] = nilai_akhir

    if nilai_akhir >= 80:
        grade = "A"
    elif nilai_akhir >= 70:
        grade = "B"
    elif nilai_akhir >= 60:
        grade = "C"
    elif nilai_akhir >= 50:
        grade = "D"
    else:
        grade = "E"

    mhs["grade"] = grade

#Tabel mahasiswa
print("\nDaftar Nilai Mahasiswa")
print("-" * 50)
print(f"{"nama":<12} {"nim":<12} {"nilai_akhir":<15} {"grade":<5}")
print("-" * 50)

for mhs in mahasiswa:
    print(
        f"{mhs["nama"]:<12} "
        f"{mhs["nim"]:<12} "
        f"{mhs["nilai_akhir"]:<15.2f} "
        f"{mhs['grade']:<5}"
    )

print("-" * 50)

#Nilai Tertinggi dan Terendah
nilai_tertinggi = max(
    mahasiswa, key=lambda mhs: mhs["nilai_akhir"]
)

nilai_terendah = min(
    mahasiswa, key=lambda mhs: mhs["nilai_akhir"]
)

print("\nNilai Tertinggi: ")
print(
    f"{nilai_tertinggi["nama"]} - "
    f"{nilai_tertinggi["nilai_akhir"]:.2f}"
)

print("\nNilai Terendah: ")
print(
    f"{nilai_terendah["nama"]} - "
    f"{nilai_terendah["nilai_akhir"]:.2f}"
)

