#Import seluruh modul
import math_operation

#Import fungsi tertentu dari modul
from math_operation import(
    luas_persegi, celsius_ke_farenheit
)

#Menghitung bangun datar
print("---Perhitungan Bangun Datar---")

sisi = 3
print(f"Luas Persegi: {luas_persegi(sisi)}")
print(f"Keliling Persegi: {math_operation.keliling_Persegi(sisi)}")

panjang = 8
lebar = 4
print(
    f"Luas Persegi Panjang: "
    f"{math_operation.luas_persegi_panjang(panjang, lebar)}"
)
print(
    f"Keliling Persegi Panjang: "
    f"{math_operation.keliling_persegi_panjang(panjang, lebar)}"
)

jari_jari = 7
print(
    f"Luas Lingkaran: "
    f"{math_operation.luas_lingkaran(jari_jari):.2f}"
)
print(
    f"Keliling Lingkaran: "
    f"{math_operation.keliling_lingkaran(jari_jari):.2f}"
)

#Konversi Suhu
print("\n---Konversi Suhu---")

suhu = 25
print(
    f"{suhu} Celcius = "
    f"{celsius_ke_farenheit(suhu):.2f} Farenheit"
)
print(
    f"{suhu} Celcius = "
    f"{math_operation.celcius_ke_kelvin(suhu):.2f} Kelvin"
)

