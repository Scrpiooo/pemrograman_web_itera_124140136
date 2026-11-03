#Menghitung Luas Persegi
def luas_persegi(sisi):
    return sisi * sisi

#Menghitung Keliling Persegi 
def keliling_Persegi(sisi):
    return 4 * sisi

#Menghitung Luas Persegi Panjang
def luas_persegi_panjang(panjang, lebar):
    return panjang * lebar

#Menghitung Keliling Persegi Panjang
def keliling_persegi_panjang(panjang, lebar):
    return 2 * (panjang + lebar)

#Kosntanta
PI = 3.14159

#Menghitung Luas Lingkaran
def luas_lingkaran(jari_jari):
    return PI * jari_jari * jari_jari

#Menghitung Keliling Lingkaran
def keliling_lingkaran(jari_jari):
    return 2 * PI * jari_jari

#Konversi Celcius ke Farenheit
def celsius_ke_farenheit(celcius):
    return (celcius * 9/5) + 32

#Konversi Celcius ke Kelvin
def celcius_ke_kelvin(celcius):
    return celcius + 273.15