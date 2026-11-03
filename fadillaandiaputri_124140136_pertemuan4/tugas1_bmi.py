berat = float(input("Masukkan Berat Badan (kg): "))
tinggi = float(input("Masukkan Tinggi Badan (m): "))

bmi = berat / (tinggi * tinggi)

print(f"BMI kamu adalah: {bmi:.2f}")

#Percabangan untuk kategori
if bmi < 18.5:
    kategori = "Berat badan kurang"
elif bmi < 25:
    kategori = "Berat badan normal"
elif bmi < 30:
    kategori = "Berat badan berlebih"
else:
    kategori = "Obesitas"

print("Kategori:", kategori)
