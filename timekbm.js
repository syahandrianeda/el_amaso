let linkyangsedangaktif = window.location.href;

const yyyyxmmxdd = (tgl) => {
    let m = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let y = tgl.getFullYear();
    let string = y + "-" + nolxx(m) + "-" + nolxx(d);
    return string
}
const nolxx = (i) => {
    if (i < 10) {
        i = "0" + i;
    };
    return i;
};

if (linkyangsedangaktif.indexOf("guru.html") > -1) {
    document.getElementById("pilihbulanrekap").innerHTML = `
    <option id="indeka" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek0" value="2021-07-01">Juli 2021</option>
    <option id="indek1" value="2021-08-01">Agustus 2021</option>
    <option id="indek2" value="2021-09-01">September 2021</option>
    <option id="indek3" value="2021-10-01">Oktober 2021</option>
    <option id="indek4" value="2021-11-01">Nopember 2021</option>
    <option id="indek5" value="2021-12-01">Desember 2021</option>`;

    document.getElementById("daftarpilihbulankehadiranguru").innerHTML = `
    <option id="indeka" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek0" value="2021-07-01">Juli 2021</option>
    <option id="indek1" value="2021-08-01">Agustus 2021</option>
    <option id="indek2" value="2021-09-01">September 2021</option>
    <option id="indek3" value="2021-10-01">Oktober 2021</option>
    <option id="indek4" value="2021-11-01">Nopember 2021</option>
    <option id="indek5" value="2021-12-01">Desember 2021</option>`;

    let kodebarismateriyangdikerjakan = "belumdisi";
    let parameterbantuisiljk = "belumdisi";
    sumber_repository.innerHTML = `
        <option id="repo0" value="0" selected>Silakan Pilih Repository</option>
        <option id="repo1" value="1">Repository dari Sekolah Lain</option>
        <option id="repo2" value="2">Cara Membuat Konten Materi</option>
        <option id="repo3" value="3">Download File KKM dan KD</option>
        `;

    // let teksalamat = "JL. SMP Ratujaya No. 41 RT.005/003 Kel. Ratujaya Kec. Cipayung";
    document.getElementById("editalamatkopsurat").innerHTML = teksalamat;
    if (idJenjang == 6) {
        document.querySelector(".tabolahijazah").style.display = "block";
        document.querySelector(".tabpengumumankelulusan").style.display = "block";
    } else {
        document.querySelector(".tabolahijazah").style.display = "none";
        document.querySelector(".tabpengumumankelulusan").style.display = "none";
    }

} else if (linkyangsedangaktif.indexOf("siswa.html") > -1) {

    if (jlo.id !== pelanggan_id) {
        alert("Maaf, sedang terjadi pembaruan. Silakan login kembali ...." + jlo.id);
        window.localStorage.clear();
        window.location.replace("/index.html")

    }
    if (jenjang == 6) {
        document.querySelector(".menukelulusan").style.display = "block";
        document.querySelector(".barkelulusanku").style.display = "block";
    } else {
        document.querySelector(".menukelulusan").style.display = "none";
        document.querySelector(".barkelulusanku").style.display = "none";

    }

    document.getElementById("siswapilihbulan").innerHTML = `
    <option id="indeka" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek0" value="2021-07-01">Juli 2021</option>
    <option id="indek1" value="2021-08-01">Agustus 2021</option>
    <option id="indek2" value="2021-09-01">September 2021</option>
    <option id="indek3" value="2021-10-01">Oktober 2021</option>
    <option id="indek4" value="2021-11-01">Nopember 2021</option>
    <option id="indek5" value="2021-12-01">Desember 2021</option>`;


} else if (linkyangsedangaktif.indexOf("gmp.html") > -1) {
    document.getElementById("pilihbulanrekap").innerHTML = `
    <option id="indeka" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek0" value="2021-07-01">Juli 2021</option>
    <option id="indek1" value="2021-08-01">Agustus 2021</option>
    <option id="indek2" value="2021-09-01">September 2021</option>
    <option id="indek3" value="2021-10-01">Oktober 2021</option>
    <option id="indek4" value="2021-11-01">Nopember 2021</option>
    <option id="indek5" value="2021-12-01">Desember 2021</option>`;

    document.getElementById("daftarpilihbulankehadiranguru").innerHTML = `
    <option id="indeka" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek0" value="2021-07-01">Juli 2021</option>
    <option id="indek1" value="2021-08-01">Agustus 2021</option>
    <option id="indek2" value="2021-09-01">September 2021</option>
    <option id="indek3" value="2021-10-01">Oktober 2021</option>
    <option id="indek4" value="2021-11-01">Nopember 2021</option>
    <option id="indek5" value="2021-12-01">Desember 2021</option>`;

    let kodebarismateriyangdikerjakan = "belumdisi";
    let parameterbantuisiljk = "belumdisi";
    sumber_repository.innerHTML = `
    <option id="repo0" value="0" selected>Silakan Pilih Repository</option>
    <option id="repo1" value="1">Repository dari Sekolah Lain</option>
    <option id="repo2" value="2">Cara Membuat Konten Materi</option>
    <option id="repo3" value="3">Download File KKM dan KD</option>`;

}

/// kelas untuk tombol 
//class="w3-button warnaeka w3-round-large w3-card-4 w3-border-bottom w3-border-black"