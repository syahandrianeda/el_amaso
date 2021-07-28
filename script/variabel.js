//KUMPULAN VARIABLE ARRAY
// const idlogo = "1BZwicOBix4eILY0IQrJs4H825w2k4g-3";
//..... versi lama .....
let jsonguru = [], //sekali klik
    //jsondatasiswa=[],  // sekali klik
    jsondatamurid = [],  // sekali klik
    jsonabsen = [], // jika ada perubahan, mungkin diberi setInterval
    jsondatapendaftar = [],  //jika ada pendaftar guru baru
    arraysiswatidakaktif = []; // jika ada pendaftar siswa baru;


// KUMPULAN VARIABLE STRING
let jumlahseluruhsiswadisekolah = "",
    tekstapel = "",
    awalmasuksekolah = "",
    angkasemester = "";


//KUMPULAN VARIABLE INTEGER
//let idguru = "", idgurubaru ="";

// VARIABEL URL GS include idSS DAN PENGGANTINYA; 
let url_login_guru; // pengganti script_url untuk memanggil data_user!
let url_login_siswa;
let url_absenkaldik;
let url_data_siswa; //pengganti script_url untuk memanggil tab "datasiswa"!
let url_data_absen; // pengganti data absen, include kelas. Kriteria bulan, perhari ada di aksi
let url_data_pembelajaran;
let url_data_nilai;
let url_data_kurikulum;

// variabel nilai-nilai
let nilairespon = [];
let nilairesponkronologi = [];
let kronologijson = [];


const anjangsanaguru = () => {
    alert("Maaf, fitur belum tersedia")
}

