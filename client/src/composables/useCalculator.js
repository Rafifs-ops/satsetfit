import { ref } from "vue";

export function useCalculator() {
    // Tempat penyimpanan data hasil hitung kalkuator dan nilai default
    const hasilHitung = ref({
        bmi: 0,
        bmr: 0,
        tdde: 0
    });

    function hitung(inputData) {

        // Cek apakah input data sudah dilakukan ? output = boolean
        const hasCalculated = inputData.beratBadan > 0 && inputData.tinggiBadan > 0 && inputData.usia > 0;

        if (!hasCalculated) { // Jika hasCalculated bernilai false (Belum input data)
            return false;
        }
        else { // Jika hasCalculated bernilai true (Sudah input data)

            // Hitung BMI, konversi tinggi badan cm ke m
            const rumusBmi = inputData.beratBadan / ((inputData.tinggiBadan / 100) ** 2);
            hasilHitung.value.bmi = rumusBmi.toFixed(1);

            if (inputData.jenisKelamin === "Laki-laki") {

                // Hitung BMR, rumus mifflin st jeor (Pria)
                const rumusBmr = 5 + (10 * inputData.beratBadan) + (6.25 * inputData.tinggiBadan) - (5 * inputData.usia);
                hasilHitung.value.bmr = rumusBmr.toFixed(1);

                // Hitung TDDE
                const rumusTdde = rumusBmr * inputData.tingkatAktvitas;
                hasilHitung.value.tdde = rumusTdde.toFixed(1);


            } else if (inputData.jenisKelamin === "Perempuan") {

                // Hitung BMR, rumus mifflin st jeor (Wanita)
                const rumusBmr = (10 * inputData.beratBadan) + (6.25 * inputData.tinggiBadan) - (5 * inputData.usia) - 161;
                hasilHitung.value.bmr = rumusBmr.toFixed(1);

                // Hitung TDDE
                const rumusTdde = rumusBmr * inputData.tingkatAktvitas;
                hasilHitung.value.tdde = rumusTdde.toFixed(1);
            }
            return true;
        }
    }
    return {
        hasilHitung,
        hitung
    }; // Return fungsi dan variabel agar dapat digunakan di manapun
}