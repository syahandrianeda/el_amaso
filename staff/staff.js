let jsonlocalstorage, jsonlocalstoragetypeuser, linkdatauser;
let linkDataUserWithIdss, linkAbsenKaldik // digunakan untuk link yang mengakses SS DataUSer (guru/siswa)
let namauser, ruangankelas, gmpkelas
let idguru = "", idgurubaru = "";
let jsondatasiswa = [], arrayStringTglLibur = [];
let idNamaSekolah, idNamaKelas, idGuruKelas, idNipGuruKelas,
    idKepsek, idNipKepsek, idSemester,
    idJenisGuru, idNoWa, idTeksTapel,
    idNamaKepsek, idJenjang;
let REKAPAbsen = {}, OBJEKHariEfektif;
let obDataRekapKehadiran;
let objekdataguru = {};
let absensekarang;
let jsonabsenkelasperbulan;
let dataseluruhmateri = [];
var mySidebar = document.getElementById("mySidebar"); // Get the Sidebar
var overlayBg = document.getElementById("myOverlay"); // Get the DIV with overlay effect
jsonlocalstoragetypeuser = JSON.parse(localStorage.getItem("typeuser"));
let idInstansi = JSON.parse(localStorage.getItem("inst_id"));
let dataketeranganakreditasi;
idNamaSekolah = idInstansi.namainstansi;
jsonlocalstorage = JSON.parse(localStorage.getItem("inst_id"));
namauser = jsonlocalstoragetypeuser.user;
gmpkelas = jsonlocalstoragetypeuser.akses;

ruangankelas = jsonlocalstoragetypeuser.room;
idguru = jsonlocalstoragetypeuser.idrow;
idimage = jsonlocalstoragetypeuser.idimg;//
idNamaKelas = jsonlocalstoragetypeuser.room;
idGuruKelas = jsonlocalstoragetypeuser.user;
idNipGuruKelas = jsonlocalstoragetypeuser.nip_guru;
idNamaKepsek = jsonlocalstoragetypeuser.nama_kepsek;
idNipKepsek = jsonlocalstoragetypeuser.nip_kepsek;
idJenisGuru = jsonlocalstoragetypeuser.akses;
idNoWa = jsonlocalstoragetypeuser.no_wa;
idSemester = jsonlocalstoragetypeuser.idsemester;
idTeksTapel = jsonlocalstoragetypeuser.tekstapel;
idJenjang = jsonlocalstoragetypeuser.jenjang;
jsonlocalstorage = JSON.parse(localStorage.getItem("inst_id"));
linkDataUserWithIdss = jsonlocalstorage.url_datauser + "?idss=" + jsonlocalstorage.ss_datauser;
linkAbsenKaldik = jsonlocalstorage.url_dataabsen + "?idss=" + jsonlocalstorage.ss_dataabsen;
url_absenkaldik = jsonlocalstorage.url_dataabsen + "?action=datakaldik&idss=" + jsonlocalstorage.ss_dataabsen
OBJEKHariEfektif = {
    "Januari": 0, "Februari": 0, "Maret": 0,
    "April": 0, "Mei": 0, "Juni": 0, "Juli": 0, "Agustus": 0,
    "September": 0, "Oktober": 0, "November": 0, "Desember": 0
};

obDataRekapKehadiran = { "Hadir": 0, "Ijin": 0, "Sakit": 0, "Alpa": 0 };
const linkkehadiranguru = jlo.ss_datanilai;
(async function () {


    let tgl = new Date();
    let m = tgl.getMonth();
    let sm = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let day = tgl.getDay()
    let y = tgl.getFullYear();
    let string = y + "-" + sm + "-" + d;
    let arraynamaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    let teksbulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];
    //htmlhariini.innerHTML = "Kehadiran Hari Ini " + arraynamaHari[day] + ", " + d + " " + teksbulan[m] + " " + y;// + tanggalfull(string)

    await fetch(url_absenkaldik).then(m => m.json()).then(k => {
        localStorage.setItem('Kaldik', JSON.stringify(k.records));
        localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl))
        arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
        arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));
    }).catch(er => {
        console.log("muat ulang: " + er);
        jsonlocalstorage = JSON.parse(localStorage.getItem("inst_id"));
        url_absenkaldik = jsonlocalstorage.url_dataabsen + "?action=datakaldik&idss=" + jsonlocalstorage.ss_dataabsen

        fetch(url_absenkaldik).then(m => m.json()).then(k => {
            //console.table(k.records)
            localStorage.setItem('Kaldik', JSON.stringify(k.records));

            localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl))
            arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
            arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));
            // console.log(k.records)
            // console.log(k.stringTgl)
        })
    });

    await fetch(linkdataguru)
        .then(m => m.json())
        .then(k => {
            dataapiguru = k.result;
            console.log(k.result)

        })




    namasekolah.innerHTML = namauser;
    namakota.innerHTML = gmpkelas + " ";//+ ruangankelas;
    var logo = document.getElementById("logosekolahmenu");
    logo.setAttribute("src", "https://drive.google.com/uc?export=view&id=" + idimage);
    logo.setAttribute("alt", "Poto Guru");
    logo.setAttribute("style", "width:90px; height:90px");
    if (ruangankelas !== "Penjaga") {
        if (localStorage.hasOwnProperty("datasiswa_all")) {
            jsondatasiswa = JSON.parse(localStorage.getItem("datasiswa_all")).datasiswa;
        } else {
            await fetch(linkDataUserWithIdss + "&action=datakelasaktifall")
                .then(m => m.json())
                .then(k => {
                    jsondatasiswa = k.datasiswa;
                    localStorage.setItem("datasiswa_all", JSON.stringify(k));

                }).catch(er => {
                    console.log("muat ulang lagi: " + er);
                    fetch(linkDataUserWithIdss + "&action=datakelasaktifall")
                        .then(m => m.json())
                        .then(k => {
                            jsondatasiswa = k.datasiswa;
                            localStorage.setItem("datasiswa_all", JSON.stringify(k));

                        })
                });
        }

        await fetch(linkDataUserWithIdss + "&action=datasiswatidakaktif")
            .then(m => m.json())
            .then(k => {
                arraysiswatidakaktif = k.datasiswa;
                jumlahseluruhsiswadisekolah = k.total
                localStorage.setItem("datasiswatidakaktif", JSON.stringify(k))


            }).catch(er => {
                console.log("muat ulang: " + er);
                fetch(linkDataUserWithIdss + "&action=datasiswatidakaktif")
                    .then(m => m.json())
                    .then(k => {
                        arraysiswatidakaktif = k.datasiswa;
                        jumlahseluruhsiswadisekolah = k.total
                        localStorage.setItem("datasiswatidakaktif", JSON.stringify(k))


                    })

            });
        await fetch("/kepsek/dataakreditasi.json").then(m => m.json())
            .then(k => {
                // console.log(k.data);
                dataketeranganakreditasi = k.data;

            })
            .catch(er => {
                console.log(er);

            })


        // await fetch(linktendik + "?action=noticeabsenkepsek")
        //     .then(m => m.json())
        //     .then(k => {
        //         //console.log(k)
        //         absensekarang = k.siapaaja;
        //         //console.log(absensekarang)
        //         if (absensekarang.length > 0) {
        //             // alert("ada " + absensekarang.length + " PTK yang sudah absen hari ini. Yaitu " + absensekarang.join("\n").idabsen)
        //             showmodalkonfirmasi(absensekarang)
        //         } else {
        //             datadivperlupersetujuan.innerHTML = "Sudah Tidak ada lagi. Periksa Kehadiran/Piket PTK Harian";
        //             modalkonfirmasiabsen.style.display = "none";
        //         }
        //     }).catch(er => alert(er))
    }
    if (navigator.storage && navigator.storage.estimate) {
        const quota = await navigator.storage.estimate();
        const percentageUsed = (quota.usage / quota.quota) * 100;
        console.log(`You've used ${percentageUsed}% of the available storage.`);
        const remaining = quota.quota - quota.usage;
        console.log(`You can write up to ${remaining} more bytes.`);
    }
    //await buattabelrekapsemester();

    dashboardgurukelas.innerHTML = dataapiguru.filter(k => k.idabsen == constidguruabsen)[0].jenjang + " ( " + namauser + " )"
})();

function w3_open() { // Toggle between showing and hiding the sidebar, and add overlay effect
    if (mySidebar.style.display === 'block') {
        mySidebar.style.display = 'none';
        overlayBg.style.display = "none";
    } else {
        mySidebar.style.display = 'block';
        overlayBg.style.display = "block";
    }
}

function w3_close() { // Close the sidebar with the close button
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
}

const aktifkanmodaltambahuser = (x) => {
    idgurubaru = x;
    idguru = parseFloat(idgurubaru) + 2;
}


async function tomboledituser() { //fungsi tombol untuk mengirimkan data ke server
    formedituser.style.display = "none";
    registrasikanedit.style.display = "none";
    prosesloadingdaftaredit.innerHTML = "<i class='fa fa-spin fa-spinner w3-jumbo'></i>";
    let formElem = document.getElementById("formedituser");
    let data = new FormData(formElem)
    data.append("brs", idguru);
    await fetch(linkDataUserWithIdss + "&action=editguru", {
        method: 'post',
        body: data //new FormData(formElem)
    }).then(m => m.json())
        .then(k => {
            //console.log(k);
            prosesloadingdaftaredit.innerHTML = k.info;
        })
        .catch(err => prosesloadingdaftaredit.innerHTML = "Proses Gagal, dengan kode error: " + err);
}


function kirimeditsiswsa() {
    let namaform = document.getElementById("modaledithapus");
    let data = new FormData(namaform);//new FormData(namaform);
    fetch(linkDataUserWithIdss + "&action=editsiswa", {
        method: 'POST',
        body: data
    }).then(m => m.json())
        .then(k => console.log(k.info))
        .catch(err => resultedit.innerHTML = err)

}

function bandingkan() {
    var dataku = $('#formedituser').serialize();
    dataku += "&brs=" + idguru;//keyidpendaftar.innerHTML;
    var link = linkDataUserWithIdss;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", link, true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            prosesloadingdaftaredit.innerHTML = JSON.parse(xhr.responseText);//"Terima kasih, Data Anda berhasil disimpan.";
            console.log(JSON.parse(xhr.responseText))
        }
    };
    xhr.send(dataku);
}

function validationedit() {
    var name = document.getElementById("usernameedit").value;
    var email = document.getElementById("emailedit").value;
    var sekolah = document.getElementById("sekolahedit").value;
    var kelas = document.getElementById("kelasedit").value;
    var dividpoto_potoguru = document.getElementById("idpoto_potoguruedit").innerHTML;
    var emailReg = email.indexOf("@gmail.com"); ///^([w-.]+@([w-]+.)+[w-]{2,4})?$/;
    if (name === '' || email === '' || sekolah === '' || dividpoto_potoguru === '' || kelas === '') {
        alert("Mohon lengkapi formulir ini dengan lengkap! \r\n Terutama: email, Nama Pengguna, Nama Sekolah, Kelas, termasuk poto");
        return false;
    } else if (emailReg < 0) {
        alert("Format email Anda salah. Mohon gunakan akun Gmail ya ...");
        return false;
    } else {
        return true;
    }
}


function ungg_avataredit() {
    var item = document.getElementById("upl_avataredit").files[0]
    var oFReader = new FileReader();
    oFReader.readAsDataURL(item);
    oFReader.onload = function (oFREvent) {
        document.getElementById("avatarkuedit").src = oFREvent.target.result;
        var tempatidpotoguru = document.getElementById("idpoto_potoguruedit")
        tempatidpotoguru.innerHTML = "";
        var inputbase64 = document.createElement("input");
        inputbase64.setAttribute("name", "data");
        inputbase64.value = oFREvent.target.result.replace(/^.*,/, '');
        var inputfilename = document.createElement("input");
        inputfilename.setAttribute("name", "filename");
        inputfilename.value = "avatar_" + guru_namalengkapedit.value.toUpperCase().replace(/\s+/, "_");
        var inputmimetype = document.createElement("input");
        inputmimetype.setAttribute("name", "mimeType")
        inputmimetype.value = "data:image/jpg"; //e.target.result.match(/^.*(?=;)/)[0]
        tempatidpotoguru.appendChild(inputbase64);
        tempatidpotoguru.appendChild(inputfilename);
        tempatidpotoguru.appendChild(inputmimetype);
    }
}

function fnlihatpasswordedit() { // fungsi untuk melihat input password (dalam simbol atau teks biasa)
    var x = document.getElementById("passwordedit");
    var label = document.getElementById("lihatpasswordedit");
    if (x.type === "password") {
        x.type = "text";
        label.innerHTML = "<i class='fa fa-eye-slash'></i> Sembunyikan Password"
    } else {
        x.type = "password";
        label.innerHTML = "<i class='fa fa-eye'></i> Lihat Password"
    }

}

function formatemail() {
    var inpemail = document.getElementById("emailedit")
    inpemail.value = inpemail.value.replace(/\s+/g, "").toLowerCase();
    if (inpemail.value.indexOf("gmail.com") < 0) {
        alert("Maaf, kami hanya menerima email dari akun Google. Misalnya emailanda@gmail.com")
        inpemail.value = ""
    }
}
let jsondatapendaftar = [];
function fnjangandobel() {
    let cekuser = dataapiguru.filter(x => x.username == usernameedit.value);
    if (cekuser.length == 1) {
        document.getElementById("jangandobeledit").innerHTML = "Maaf, nama ini sudah pernah mendaftar. silakan gunakan username lain.";
        document.getElementById("usernameedit").value = "";
    } else {
        document.getElementById("jangandobeledit").innerHTML = "Username diijinkan";
    }
}
const profilguru = async () => {
    modaledituser.style.display = "block";
    formedituser.style.display = "block";
    prosesloadingdaftaredit.innerHTML = "";//<i class='fa fa-spin fa-spinner w3-xxxlarge'><i> sedang mencari data Anda..";
    registrasikanedit.style.display = "block";
    judulpetunjukedit.innerHTML = "<i class='fa fa-spin fa-spinner w3-xxxlarge'><i>"
    w3_close();
    await fetch(linkDataUserWithIdss + "&action=profilguru&id=" + idguru)
        .then(m => m.json())
        .then(k => {

            let obj = k.profil[0];
            let key = Object.keys(obj); // key == header
            let nilai = Object.keys(obj).map(m => obj[m]);

            var elementform = document.getElementById("formedituser").elements;
            for (x = 0; x < elementform.length; x++) {

                if (elementform[x].type !== "file") {
                    for (d = 0; d < key.length; d++) {
                        if (elementform[x].name == key[d]) {
                            if (elementform[x].name == "password") {
                                elementform[x].value = nilai[d]//;
                            } else {
                                elementform[x].value = nilai[d]
                            };

                        }
                    }
                }
            }
            document.getElementById("avatarkuedit").removeAttribute("src");
            document.getElementById("avatarkuedit").setAttribute("src", "https://drive.google.com/uc?export=view&id=" + nilai[13]);

            judulpetunjukedit.innerHTML = "Profil Guru";
        })
}

function logout() {
    //tabeltempatdaftarkelassaya.innerHTML = "";
    w3_close();
    window.localStorage.clear();
    window.location.replace("/index.html")
}


function tampilinsublamangurukelas(fitur) {


    if (fitur == "dataguru") {
        datakelassaya.style.display = "block";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataframeeditor.style.display = "none";
        dataakreditasi.style.display = "none";
        divdatasiswa.style.display = "none";
        document.getElementById("batasaksesguru").scrollIntoView();
    } else if (fitur == "absen") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "block";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataframeeditor.style.display = "none";
        dataakreditasi.style.display = "none";
        divdatasiswa.style.display = "none";
        document.getElementById("batasaksesguru").scrollIntoView();

    } else if (fitur == "pembelajaran") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "block";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataframeeditor.style.display = "none";
        dataakreditasi.style.display = "none";
        divdatasiswa.style.display = "none";
        document.getElementById("batasaksesguru").scrollIntoView();
    } else if (fitur == "kurikulum") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "block";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataframeeditor.style.display = "none";
        dataakreditasi.style.display = "none";
        divdatasiswa.style.display = "none";
        document.getElementById("batasaksesguru").scrollIntoView();
    } else if (fitur == "mapel") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "block";
        datakehadiranguru.style.display = "none";
        dataframeeditor.style.display = "none";
        dataakreditasi.style.display = "none";
        divdatasiswa.style.display = "none";
        document.getElementById("batasaksesguru").scrollIntoView();
    }
    else if (fitur == "kehadiranguru") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "block";

        dataakreditasi.style.display = "none";
        dataframeeditor.style.display = "none";
        divdatasiswa.style.display = "none";

        document.getElementById("batasaksesguru").scrollIntoView();
    }
    else if (fitur == "meme") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataframeeditor.style.display = "block";
        dataakreditasi.style.display = "none";
        divdatasiswa.style.display = "none";


        document.getElementById("batasaksesguru").scrollIntoView();
    }
    else if (fitur == "akreditasi") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataakreditasi.style.display = "block";
        dataframeeditor.style.display = "none";
        divdatasiswa.style.display = "none";


        document.getElementById("batasaksesguru").scrollIntoView();
    } else if (fitur == "kesiswaan") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataakreditasi.style.display = "none";
        dataframeeditor.style.display = "none";
        divdatasiswa.style.display = "block";


        document.getElementById("batasaksesguru").scrollIntoView();
    }
    w3_close();
}


const buattabelkeaktifan = (json) => {
    let data = json;//.filter(f => f.kelas !== "Kepala Sekolah");
    //console.log(data);
    let temp = `<table class="versi-table "><thead>
    <tr>
        <th>No.</th>
        <th>Nama Guru</th>
        <th>Pembuatan Materi</th>
        <th>Penilaian Online</th>
        <th>Piket</th>

    </tr>
    </thead>
    <tbody>
    `;
    for (i = 0; i < data.length; i++) {
        temp += `
        <tr>
            <td>${i + 1}</td>
            <td>${data[i].guru_namalengkap}</td>
            <td class="w3-center"><button onclick="cekkbmhariini('${data[i].jenjang}')">Cek</button></td>
            <td class="w3-center"><button onclick="cekkoreksihariini('${data[i].jenjang}')">Cek</button></td>
            <td class="w3-center"><button onclick="cekpikethariini('${data[i].jenjang}')">Cek</button></td>
            </tr>
        `
    }
    temp += `</tbody></table>`;
    tabelabsenhariini.innerHTML = temp;

}
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}



let arraydatatendik = [];
const dataguru = () => {
    tampilinsublamangurukelas("dataguru");
    tabeltempatdaftarkelassayaa.style.display = "block";
    tabeltempatdaftarkelassaya.innerHTML = "<i class='fa fa-spinner fa-spin w3-xxxlarge'></i>";
    let arhead = ["No", "Nama Guru", "Tempat Lahir", "Tanggal Lahir", "NIP", "NUPTK", "JK", "Agama", "Status Perkawinan", "Ijazah Terakhir", "Tahun Lulus", "Kependidikan", "Jurusan", "Status Pegawai", "Jabatan", "TMT ASN", "TMT Sekolah", "Tahun Masa Kerja", "Bulan Masa Kerja", "Jenis Tendik", "Tanggal KGB YAD", "Tugas", "Rincian/Jumlah Jam", "Golongan Ruang", "Tanggal Pangkat", "S", "I", "A", "Masa Kerja Sekolah"];
    let notice = {};
    fetch(linktendik + "?action=tabeltendik")
        .then(m => m.json()).then(k => {
            //console.log(k);
            arraydatatendik = k;
            let temp = "<h3 class='w3-center'>DATA PENDIDIK DAN TENAGA KEPENDIDIKAN " + idNamaSekolah.toUpperCase() + "<br/><sub>Format Daftar 1</sub></h3><table class='versi-table w3-tiny' id='tbldaftar1pertama'><thead><tr>";

            for (a = 0; a < arhead.length; a++) {
                if (a == 1) {
                    temp += "<th style='position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000'>" + arhead[a] + "</th>";
                } else {
                    temp += "<th>" + arhead[a] + "</th>";
                }
            }
            temp += "</tr></thead><tbody>";
            let arrperguru = [];
            for (r = 1; r < k.length; r++) {
                let lr = k[r];
                // console.log(CountDown(lr[21]))
                let perguru = {};
                if (!(lr[14] == "HNR" || lr[14] == "HONOR" || lr[14] == "GTY" || lr[14] == "GTT")) {
                    perguru["namaguru"] = dataapiguru.filter(k => k.idabsen == lr[0])[0].guru_namalengkap;// lr[2];
                    perguru["statuspegawai"] = lr[14];
                    perguru["tglkgb"] = lr[21];
                    if (lr[21] != "") {
                        perguru["kettglkgb"] = CountDown(lr[21]).time;
                        perguru["tahunkgb"] = CountDown(lr[21]).tahun;
                        perguru["bulankgb"] = CountDown(lr[21]).bulan;
                    } else {
                        perguru["kettglkgb"] = CountDown(lr[21]).time;
                        perguru["tahunkgb"] = CountDown(lr[16]).tahun;
                        perguru["bulankgb"] = CountDown(lr[16]).bulan;

                    }
                    perguru["golruang"] = lr[24].toUpperCase();
                    perguru["tglpangkatterakhir"] = lr[25];
                    perguru["tahunpangkat"] = umur(lr[25]).tahun;
                    perguru["bulanpangkat"] = umur(lr[25]).tahun;

                    arrperguru.push(perguru);
                }
                temp += "<tr>";
                for (c = 1; c < lr.length; c++) {
                    let gmp = dataapiguru.filter(k => k.idabsen == lr[0])[0].gurukelas_gmp;
                    let mapelkelas = dataapiguru.filter(k => k.idabsen == lr[0])[0].kelas;
                    let kelasampu = dataapiguru.filter(k => k.idabsen == lr[0])[0].kelasampu;
                    let jabatan = "";
                    let jabatanguru = "";
                    //dataapiguru.filter(k => k.idabsen == lr[0])[0].guru_namalengkap;
                    if (gmp == "Guru Mapel") {
                        jabatanguru = "Guru " + mapelkelas;//+ "di Kelas " + kelasampu
                        jabatan = "Guru " + mapelkelas;
                    } else if (gmp == "Guru Kelas") {

                        jabatanguru = gmp + " " + kelasampu;
                        jabatan = gmp
                    } else {

                        jabatan = gmp;
                        jabatanguru = kelasampu;
                    }



                    if (c == 1 && r > 0) {
                        temp += "<td>" + r + "</td>";
                    } else if (c == 2) {
                        temp += "<td style='position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000' onclick='alert(\"hanya bisa diedit oleh guru yang bersangkutan di Elamaso Guru\")'>" + dataapiguru.filter(k => k.idabsen == lr[0])[0].guru_namalengkap + "</td>";
                    } else if (c == 4 || c == 16 || c == 17 || c == 21 || c == 25) {

                        temp += "<td onclick='edittanggal(" + r + "," + (c - 1) + ")'>" + ((lr[c] !== "") ? tanggalfull(lr[c]) : "") + "</td>";
                    } else if (c == 18) {
                        if (lr[16] !== "") {
                            temp += "<td onclick='alert(\"Perhitungan tahun sudah otomatis\")'>" + ((lr[c] !== "") ? umur(lr[16]).tahun : "") + "</td>";

                        } else {

                            temp += "<td onclick='alert(\"Perhitungan bulan sudah otomatis\")'>" + ((lr[c] !== "") ? umur(lr[17]).tahun : "") + "</td>";
                        }

                    } else if (c == 19) {
                        if (lr[16] !== "") {
                            temp += "<td onclick='alert(\"Perhitungan tahun sudah otomatis\")'>" + ((lr[c] !== "") ? umur(lr[16]).bulan : "") + "</td>";
                        } else {
                            temp += "<td onclick='alert(\"Perhitungan bulan sudah otomatis\")'>" + ((lr[c] !== "") ? umur(lr[17]).bulan : "") + "</td>";
                        }
                    } else if (c == 15) {

                        temp += "<td onclick='alert(\"hanya bisa diedit oleh guru yang bersangkutan di Elamaso Guru\")'>" + jabatan + "</td>";
                    }
                    else if (c == 22) {

                        temp += "<td onclick='alert(\"hanya bisa diedit oleh guru yang bersangkutan di Elamaso Guru\")'>" + jabatanguru + "</td>";
                    } else if (c == 29) {

                        temp += "<td onclick='alert(\"Masa Kerja Sekolah sudah otomatis\")'>" + umur(lr[17]).tahun + " Tahun, " + umur(lr[17]).bulan + " Bulan.</td>";
                    } else {
                        temp += "<td contenteditable='true'>" + lr[c] + "</td>";

                    }
                }
                temp += "</tr>";
            }
            temp += "</table>";

            tabeltempatdaftarkelassaya.innerHTML = temp;
            notice.data = arrperguru;//.filter(u => u.statuspegawai !== "HNR");
            // console.table(notice.data);
            let tabelkgb = `<table class='versi-table w3-tiny'>
            <thead><tr>
            <th>No.</th>
            <th>Nama Guru</th>
            <th>KGB YAD</th>
            <th>Keterangan</th>
            </tr></thead><tbody>
            `;
            let tabelpangkat = `<table class='versi-table w3-tiny'>
            <thead><tr>
            <th>No.</th>
            <th>Nama Guru</th>
            <th>Golongan/Ruang</th>
            <th>TMT Pangkat</th>
            <th>Masa Kerja Golongan<br/><sub>(dihitung dari TMT Gol/Ruang)</sub></th>
            <th>Usulan Kenaikan Pangkat</th>
            </tr></thead><tbody>
            `
            for (d = 0; d < notice.data.length; d++) {
                let thnkgb = notice.data[d].tahunkgb;
                let blnkgb = notice.data[d].bulankgb;
                let thnpangkat = parseInt(notice.data[d].tahunpangkat);
                let blnpangkat = parseInt(notice.data[d].bulanpangkat);
                let masa = notice.data[d].kettglkgb;
                let ket = "";
                if (masa == "akan datang") {
                    if (thnkgb == 0 && blnkgb == 0) {
                        ket = "<span class='w3-red '>Segera usulkan KGB / KGB yang akan datang perlu diperbarui</span> (!)";

                    } else if (thnkgb == 0 && blnkgb > 0) {
                        ket = "<span class='w3-yellow '>" + blnkgb + " bulan lagi KGB harus diperbarui</span>";
                    } else {
                        ket = "<span class='w3-green '>" + thnkgb + " Tahun " + blnkgb + " bulan lagi Usulan KGB berikutnya</span> <b>( &checkmark; )</b>";
                    }
                } else {
                    ket = "<span class='w3-red '>KGB YAD (yang akan datang) wajib diperbarui</span> (!)";

                }
                let ketpangkat = "";
                if (thnpangkat >= 2) {
                    if (blnpangkat > 6) {
                        ketpangkat = "<span class='w3-green'>Memenuhi Syarat</span><b>(&checkmark;)</b>";

                    } else {
                        ketpangkat = `<span class='w3-green'>Memenuhi Syarat ${6 - blnpangkat} bulan lagi.</span><b>(&checkmark;)</b>`;
                    }
                } else {
                    ketpangkat = `<span class='w3-red'>Belum memenuhi syarat</span><b>(!)</b>`;

                }

                let tglnya = (notice.data[d].tglkgb == "") ? "" : tanggalfull(notice.data[d].tglkgb);
                let tglpangkat = (notice.data[d].tglpangkatterakhir == "") ? "" : tanggalfull(notice.data[d].tglpangkatterakhir);
                tabelkgb += `<tr>
                <td>${d + 1}</td>
                <td>${notice.data[d].namaguru}</td>
                <td>${tglnya}</td>
                <td>${ket}</td>
                </td>
                </tr>`;
                tabelpangkat += `<tr>
                <td>${d + 1}</td>
                <td>${notice.data[d].namaguru}</td>
                <td>${notice.data[d].golruang}</td>
                <td>${tglpangkat}</td>
                <td>${thnpangkat} Tahun ${blnpangkat} Bulan.</td>
                <td>${ketpangkat}</td>
                </td>
                </tr>`;
            }

            tabelkgb += "</tbody></table>Keterangan:<br/>KGB YAD : Kenaikan Gaji Berkala Yang Akan Datang";
            tabelpangkat += "</tbody></table>Keterangan:<br/>KGB YAD : Kenaikan Gaji Berkala Yang Akan Datang";
            tabeltempatkgb.innerHTML = "<hr/><h3 class='w3-center'>NOTIFIKASI USULAN KENAIKAN GAJI BERKALA (KGB)<br/>PER BULAN " + NamaBulandariIndex(new Date().getMonth()).toUpperCase() + " " + new Date().getFullYear() + "</h3>" + tabelkgb;
            tabeltempatpangkat.innerHTML = "<hr/><h3 class='w3-center'>NOTIFIKASI USULAN KENAIKAN PANGKAT<br/>PER BULAN " + NamaBulandariIndex(new Date().getMonth()).toUpperCase() + " " + new Date().getFullYear() + "</h3>" + tabelpangkat;

        })//.catch(er => alert(er))

}

const edittanggal = (r, c) => {
    //alert("Baris ke-" + r + "\n\n Kolom ke-" + c);
    modaltanggal.style.display = "block";
    let namatabel = document.getElementById("tbldaftar1pertama");
    let namaheader = namatabel.rows[0].cells[c].innerHTML;
    let tgl = formatbalikin(namatabel.rows[r].cells[c].innerHTML);
    let balikintanggal = StringTanggal(new Date(tgl));
    //let teks = "ini data headerr yang diklik adalah " + namaheader;

    let teks = "<h3 class='w3-center'>Ubah " + namaheader + "</h3>";
    teks += namatabel.rows[r].cells[1].innerHTML + "<hr/>";
    teks += `<input type="date" class="w3-input" id="valuetanggal" onchange="modalubahtanggal()" value="${balikintanggal}"/>`
    teks += `<hr/><span id="translettgl">${tanggalfull(tgl)}</span><hr/>`;
    teks += `<button onclick="tanggaloke(${r},${c})">Simpan</button><hr/>`;
    teks += `<button onclick="hapustanggal(${r},${c})">Hapus</button><hr/>`;
    //

    dataubahtanggal.innerHTML = teks;
    //valuetanggal.value = balikintanggal;

}
const hapustanggal = (r, c) => {
    let namatabel = document.getElementById("tbldaftar1pertama");
    namatabel.rows[r].cells[c].innerHTML = "";
}

const modalubahtanggal = () => {
    let el = document.getElementById("valuetanggal");
    document.getElementById("translettgl").innerHTML = tanggalfull(el.value);
}
const tanggaloke = (r, c) => {
    let namatabel = document.getElementById("tbldaftar1pertama");
    let kolomtahun;// = namatabel.rows[c].cells[15].innerHTML;
    let tanggal = document.getElementById("valuetanggal");
    if (c == 15) {
        //kolomtahun = namatabel.rows[c].cells[15].innerHTML;

        namatabel.rows[r].cells[c].innerHTML = tanggalfull(tanggal.value);
        namatabel.rows[r].cells[17].innerHTML = umur(tanggal.value).tahun;
        namatabel.rows[r].cells[18].innerHTML = umur(tanggal.value).bulan;

    } else if (c == 16) {
        kolomtahun = namatabel.rows[r].cells[15].innerHTML;
        //console.log(kolomtahun);
        namatabel.rows[r].cells[c].innerHTML = tanggalfull(tanggal.value);
        if (kolomtahun !== "") {
            //alert("kosong \n kolomtahun=" + kolomtahun);
            namatabel.rows[r].cells[17].innerHTML = umur(formatbalikin(kolomtahun)).tahun;
            namatabel.rows[r].cells[18].innerHTML = umur(formatbalikin(kolomtahun)).bulan;
        } else {
            alert("tidak kosong \n kolomtahun=" + kolomtahun);
            namatabel.rows[r].cells[17].innerHTML = umur(tanggal.value).tahun;// kolomtahun;//umur(kolomtahun).tahun;
            namatabel.rows[r].cells[18].innerHTML = umur(tanggal.value).bulan;//new Date(kolomtahun);//'d';//umur(new Date(kolomtahun)).bulan;
        }
    } else {
        namatabel.rows[r].cells[c].innerHTML = tanggalfull(tanggal.value);
    }
    tutupmodaltanggal.click();
}

const cetakini = () => {
    let isibody = document.getElementById("tabeltempatdaftarkelassaya").innerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO DATA GURU</title>`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link href="https://fonts.googleapis.com/css?family=Raleway">`;
    head.innerHTML += `<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>`;
    head.innerHTML += `<style type="text/css">
    .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}
    </style>`;

    head.innerHTML += `<style type="text/css" media="print">
    @media print {
        html,body{height:100%;width:100%;margin:0;padding:0}
        
         @page {
            size: A4 landscape;
            max-height:100%;
            max-width:100%;
            
            }
    }
    </style>`;

    body.innerHTML = isibody.replace("Format Daftar 1", "");
    body.innerHTML += '<br/><div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ',' + tanggalfull(new Date()) + '<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><b><u>' + idNamaKepsek + '</u></b><br/>NIP. ' + idNipKepsek + '</div>';

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();


}
function exceldataguru() {
    // alert("dalam tahap pengembangan");


    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    tabelhasil.setAttribute("class", "versi-table");
    tabelhasil.setAttribute("id", "myTableCopy");

    var tabeleditt = document.getElementById("tbldaftar1pertama").getElementsByTagName("thead")[0];
    var cln = tabeleditt.cloneNode(true);
    tabelhasil.appendChild(cln);
    var tabeled = document.getElementById("tbldaftar1pertama").getElementsByTagName("tbody")[0];
    cln = tabeled.cloneNode(true);
    tabelhasil.appendChild(cln);

    datasiswadiv.appendChild(tabelhasil);
    ///sebelum disimpan beresin dulu format angka
    let dat = document.getElementById("myTableCopy")
    let data = document.getElementById("myTableCopy").rows;
    for (i = 0; i < data.length; i++) {
        for (j = 0; j < data[i].cells.length; j++) {
            if (j == 4 || j == 5) {
                //;;data[i].cells[j].innerHTML = "'" + data[i].cells[j].innerHTML
                //data[i].cells[j].setAttribute("data-type", "String");
                if (data[i].cells[j].innerHTML !== "") {
                    data[i].cells[j].innerHTML = "'" + data[i].cells[j].innerHTML
                }
            }
        }
    };
    let head = dat.getElementsByTagName("thead")[0];
    let brs = head.insertRow(0);
    let sel = brs.insertCell(-1);
    sel.setAttribute("colspan", tabeled.rows[0].cells.length)
    sel.innerHTML = "DATA PENDIDIK DAN TENAGA KEPENDIDIKAN UPTD " + idNamaSekolah.toUpperCase();
    brs = head.insertRow(1);
    sel = brs.insertCell(-1);
    sel.innerHTML = "";



    //---------- TAMBAHKAN TANDA TANGAN

    //let cobatabel = tabeledit;// document.getElementById("myTableCopy");
    let tabeledit = dat.getElementsByTagName("tbody")[0];
    let rowcount = tabeledit.rows.length;
    //console.log(rowcount)
    let colcount = tabeledit.rows[0].cells.length;
    countcol = tabeledit.rows[0].cells.length;
    if (colcount >= 5) {

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel.innerHTML = "NIP. " + idNipKepsek;


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel.innerHTML = "<b><u>" + idNamaKepsek + "</u></b>"


        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel.innerHTML = "Kepala " + idNamaSekolah;



        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel.innerHTML = jlo.kota + ", " + tanggalfull(new Date())


        brs = tabeledit.insertRow(rowcount)


    } else {



    }



    $("#myTableCopy").table2excel({

        name: "Worksheet Name",
        filename: "Data Pendidik dan Tendik id=" + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 1,
        barisatas: 2

    });
    datasiswadiv.innerHTML = "";

}

const simpanserverdataguru = () => {
    let tb = document.getElementById("tbldaftar1pertama");
    let lr = tb.rows;
    let all = []
    for (r = 1; r < lr.length; r++) {
        let perbaris = lr[r];
        let isi = []
        for (s = 0; s < perbaris.cells.length; s++) {
            if (s == 0) {
                isi.push(arraydatatendik[r][1])
            } else {
                let d = perbaris.cells[s].innerHTML;
                let o = "";
                if (s == 3 || s == 15 || s == 16 || s == 20 || s == 24) {
                    o = (d == "") ? "" : formatbalikin(d);
                } else {
                    o = d;
                }
                isi.push(o);
            }
        }
        all.push(isi)
    }

    let data = JSON.stringify(all);

    let kirimin = new FormData();
    kirimin.append("tabel", data);
    fetch(linktendik + "?action=simpantendik", {
        method: "post",
        body: kirimin
    }).then(m => m.json())
        .then(k => {
            alert(k.result);
            dataguru();
        })
        .catch(er => alert(er))
    //console.log(tes);
}

const showmodalkonfirmasi = (array) => {
    modalkonfirmasiabsen.style.display = "block";
    let tekshtml = "";
    tekshtml += `<div class="tombolpersetujuanabsen w3-hide w3-center"><div id='previewpotoptk'></div><hr/>
    <textarea id="alasantolak" placeholder="Tulis alasan mengapa Anda menolak absen PTK ini di sini." class="w3-textarea teksalasanditolak w3-hide"></textarea>
    <button class="w3-button w3-blue" id="tombolsetujuiabsen">Setujui</button>
    <button class="w3-button w3-red" id="tombolabsentolak">Tolak</button>
    </div>
    <hr/><center>Silakan Cek Kebenaran Poto Kehadiran PTK
    <table class='versi-table' id="tabelkehadiranmodal">
    <tr>
        <th>No.</th>
        <th>PTK</th>
        <th>Cek Poto</th>
    </tr>
    `;
    let untukdivtabel = `<center>Silakan Cek Kebenaran Poto Kehadiran PTK
    <table class='versi-table' id="tabelkehadiranmodal">
    <tr>
        <th>No.</th>
        <th>PTK</th>
        <th>Cek Poto</th>
    </tr>
    `
    for (i = 0; i < array.length; i++) {
        let namapengabsen = dataapiguru.filter(k => k.idabsen == array[i].idabsen)[0];
        //console.log(namapengabsen);
        tekshtml += `<tr>
        <td>${i + 1}</td>
        <td>${namapengabsen.guru_namalengkap}</td>
        <td id="tombolcekabsen_${i}">
        <button onclick="fncekkehadiran(${array[i].idabsen},${array[i].idbaris},${i})" class="w3-button w3-amber">CEK</button>
        </td>
        </tr>`;
        untukdivtabel += `<tr>
        <td>${i + 1}</td>
        <td>${namapengabsen.guru_namalengkap}</td>
        <td id="tombolcekabsen_${i}">
        <button onclick="fncekkehadiran(${array[i].idabsen},${array[i].idbaris},${i})" class="w3-button w3-amber">CEK</button>
        </td>
        </tr>`
    }
    tekshtml += `</table></center>`
    untukdivtabel += `</table></center>`
        ;
    datakonfirmasimasiabsen.innerHTML = tekshtml;
    datadivperlupersetujuan.innerHTML = untukdivtabel;

    let tomboltolak = document.getElementById("tombolabsentolak");
    let tombolsetuju = document.getElementById("tombolsetujuiabsen");
    let teksalasan = document.getElementById("alasantolak");
    tomboltolak.addEventListener("click", function () {
        //alert("tombol tolak jalan");
        if (tombolsetuju.innerHTML == "Setujui") {
            tombolsetuju.innerHTML = "Kirim";
            teksalasan.className = teksalasan.className.replace("w3-hide", "w3-show");
            // tomboltolak.className = tomboltolak.className.replace("w3-show", "w3-hide");
            if (tomboltolak.className.indexOf("w3-show") == - 1) {
                tomboltolak.className = tomboltolak.className + " w3-hide"
            } else {
                tomboltolak.className = tomboltolak.className.replace("w3-show", "w3-hide")

            }

        } else {
            tombolsetuju.innerHTML = "Setujui"
            teksalasan.className = teksalasan.className.replace("w3-show", "w3-hide");
            tomboltolak.className = tomboltolak.className.replace("w3-hide", "w3-show");


        }
    });

}

const fncekkehadiran = (indekabsen, indekbaris, indeksel) => {
    //alert("indek idabsen " + indekabsen + "\n Indekbaris " + indekbaris);
    modalkonfirmasiabsen.style.display = "block";
    let teksalasan = document.getElementById("alasantolak");
    let tomboltolak = document.getElementById("tombolabsentolak");
    let tombolsetuju = document.getElementById("tombolsetujuiabsen");
    //atur defaultnya
    teksalasan.className = teksalasan.className.replace("w3-show", "w3-hide");
    teksalasan.value = "";
    tomboltolak.innerHTML = "Tolak";
    tombolsetuju.innerHTML = "Setujui";
    tomboltolak.className = tomboltolak.className.replace("w3-hide", "");

    document.getElementsByClassName("tombolpersetujuanabsen")[0].className = document.getElementsByClassName("tombolpersetujuanabsen")[0].className.replace("w3-hide", "w3-show");
    document.getElementsByClassName("tombolpersetujuanabsen")[0].className = document.getElementsByClassName("tombolpersetujuanabsen")[0].className.replace("w3-hide", "w3-show");
    let src = absensekarang.filter(k => k.idabsen == indekabsen && k.idbaris == indekbaris)[0];
    previewpotoptk.innerHTML = `<img src="https://drive.google.com/uc?export=view&id=${src.fileContent}" class='w3-image w3-card-4'/>`;

    //     let alasan = e.parameter.alasan;
    //   let statusijin = e.parameter.status;
    //   let lr = e.parameter.brs;

    tombolsetuju.addEventListener("click", function () {
        let status = (tombolsetuju.innerHTML == "Setujui") ? "disetujui" : "ditolak";
        //let d = "tombolcekabsen_"+indek15_32

        previewpotoptk.innerHTML = "<i class='fa fa-spin fa-refresh'></i> sedang proses...";
        let datakirim = new FormData();
        datakirim.append("alasan", teksalasan.value);
        datakirim.append("status", status);
        datakirim.append("brs", indekbaris);
        //alert("tombol setuju jalan, kode absen " + indekabsen + "\n kode baris " + indekbaris);
        fetch(linktendik + "?action=setujuiabsen", {
            method: "post",
            body: datakirim
        }).then(m => m.json())
            .then(f => {
                // console.log(f.result)
                alert(f.result);

                fetch(linktendik + "?action=noticeabsenkepsek")
                    .then(m => m.json())
                    .then(k => {
                        absensekarang = k.siapaaja;
                        //console.log(absensekarang)
                        if (absensekarang.length > 0) {
                            // alert("ada " + absensekarang.length + " PTK yang sudah absen hari ini. Yaitu " + absensekarang.join("\n").idabsen)
                            showmodalkonfirmasi(absensekarang)
                        } else {
                            datadivperlupersetujuan.innerHTML = "Sudah Tidak ada lagi. Periksa Kehadiran/Piket PTK Harian";
                            modalkonfirmasiabsen.style.display = "none";

                        }
                    }).catch(er => alert(er))

            })
            .catch(er => {
                console.log(er);
                let sel = document.getElementById("tombolcekabsen_" + indekabsen + "_" + indekbaris);
                sel.innerHTML = `<button onclick="fncekkehadiran(${indekabsen},${indekbaris})" class="w3-button w3-red">ULANGI</button>`
            })



    })
};

const kehadiranguru = async () => {
    tampilinsublamangurukelas("kehadiranguru");
    let el = document.querySelector(".persetujuan");
    el.click();

    let labelfor = document.getElementById("tombolabsenguru");
    labelfor.removeAttribute("for");
    labelfor.setAttribute("for", "kamerapiket");
    labelfor.innerHTML = "Ambil Poto";
    labelfor.setAttribute("class", labelfor.className.replace("w3-blue", "w3-green"));
    var poto = document.querySelector('.imgguruabsen')
    poto.src = "/img/192.png";
    // let selekhadir = document.getElementById("pilih_kehadirangurupiket");
    // selekhadir.setAttribute("class", selekhadir.className.replace("w3-show", "w3-hide"));

    //console.log(constidguruabsen);

    //####################################################################################
    // linkdataguru = jlo.url_datauser + "?action=dataguruall&idss=" + jlo.ss_datauser;
    // fetch(linkdataguru).then(m => m.json()).then(k => console.log(k));
    //####################################################################################

    //let idguruabsen = constidguruabsen;
    let d = new Date();
    let dd = d.getDate();
    let m = d.getMonth() + 1;
    let mm = addZero(m);
    let y = d.getFullYear();

    let divket = document.querySelector(".ketabsenkehadiranguru");
    let divimg = document.querySelector(".imgguruabsen");
    let divtombol = document.querySelector("#belumabsenkehadiranguru");
    //divtombol.className.replace(" w3-hide", " w3-show ");
    //belumabsenkehadiranguru 

    let idtanggal = dd + "" + mm + "" + y;//tglStringZero();

    //console.log(idtanggal);
    await fetch(linkkehadiranguru + "?action=cekabsen&idguruabsen=" + constidguruabsen + "&idtanggal=" + idtanggal)
        .then(z => z.json())
        .then(x => {
            // console.log(x);
            let banyakabsen = x.result.length;

            if (banyakabsen == 0) {

                divket.innerHTML = "Anda belum Absen piket hari ini";
                //divtombol.className.replace(" w3-hide", " w3-show ");
                divtombol.style.display = "block";
            } else {
                let disetujui = "";
                if (x.result[banyakabsen - 1].resume == "disetujui") {
                    divtombol.style.display = "none";
                    divimg.src = "https://drive.google.com/uc?export=view&id=" + x.result[banyakabsen - 1].fileContent;
                    disetujui = x.result[banyakabsen - 1].kehadiran + "<br/>(disetujui kepala sekolah)<br/>" + tanggalfulllengkap(x.result[banyakabsen - 1].timestamp);
                } else if (x.result[banyakabsen - 1].resume == "ditolak") {
                    divtombol.style.display = "block";
                    divimg.src = "/img/192.png";
                    disetujui = "Pesan Kepala sekolah : " + x.result[banyakabsen - 1].alasantolak;
                } else {
                    divtombol.style.display = "none";
                    divimg.src = "/img/192.png";
                    disetujui = "Anda sudah absen hari ini, tunggu konfirmasi dari Kepala Sekolah."
                }
                divket.innerHTML = disetujui;

            }

        })
}

let tabkehadiranpiket = document.querySelector(".tabkehadiranpiket");
let divtabelpikethariini = document.getElementById("datadivkehadiranpiket");
tabkehadiranpiket.addEventListener("click", function () {
    if (dataapiguru.length == 0) {

        dataguru();
        return
    }
    let ind = new Date().getMonth() + 1;
    document.getElementById("daftarpilihbulankehadirangurupribadi").selectedIndex = ind;
    modalfnkalenderkehadirangurupribadi();
    //divtabelpikethariini.innerHTML = tekshtml;
    //refreshAbsenHariIni();

});

let tabrekappiket = document.querySelector(".tabrekappiket");
tabrekappiket.addEventListener("click", function () {
    // let idselect = document.getElementById("daftarpilihbulankehadiranguru");
    // let xx = idselect.selectedIndex;
    let ind = new Date().getMonth() + 1;
    // xx = ind;
    document.getElementById("daftarpilihbulankehadiranguru").selectedIndex = ind;
    modalfnkalenderkehadiranguru();
})

const modalfnkalenderkehadiranguru = async () => {
    //kondisikan dulu, jika arraydatatendik kosong, load dulu datanya:
    if (arraydatatendik.length == 0) {
        await fetch(linktendik + "?action=tabeltendik")
            .then(m => m.json()).then(k => {
                //console.log(k);
                arraydatatendik = k;
            })
            .catch(er => console.log(er))

    }




    document.getElementById("rekapabsenguru").innerHTML = "";
    let idselect = document.getElementById("daftarpilihbulankehadiranguru");
    let xx = idselect.selectedIndex;
    let strdate = idselect[xx].value;

    let d = new Date(strdate);
    let m = d.getMonth();
    let y = d.getFullYear()
    let dt = d.getDate();
    let sm = d.getMonth() + 1;
    let nolbulan = addZero(sm);
    let namabulan = NamaBulandariIndex(m);
    let jumlahharibulanini = daysInMonth(sm, y);

    //document.getElementById("bulanrekap").innerHTML = "Tabel Rekap Absensi Bulan " + namabulan + " " + y;

    let tabel = document.createElement("table");
    tabel.setAttribute("class", "versi-table w3-tiny");
    tabel.setAttribute("id", "tabelxx");
    let thead = tabel.createTHead();
    let tr = thead.insertRow(0);

    let th = document.createElement("th");
    th.setAttribute("rowspan", "2");
    th.innerHTML = "No. Urut";
    tr.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("rowspan", "2");
    th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
    th.innerHTML = "NAMA PTK";
    tr.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("rowspan", "2");
    th.innerHTML = "Jabatan/Tugas";
    tr.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("rowspan", "2");
    th.innerHTML = "Golongan/Ruang";
    tr.appendChild(th);




    th = document.createElement("th");
    th.setAttribute("colspan", jumlahharibulanini);
    th.setAttribute("id", "namaheaderbulan");
    th.innerHTML = "Bulan " + namabulan + " " + y;
    tr.appendChild(th);

    tr = thead.insertRow(-1);
    let itgl = 1;
    let arrayKeteranganLibur = [];
    let itungHE = 0;

    for (let i = 0; i < jumlahharibulanini; i++) {
        let d_tbl = new Date(y, m, itgl);
        let sd_tbl = StringTanggal2(d_tbl);
        let indekshari = d_tbl.getDay()
        let libur = (arrayStringTglLibur.indexOf(sd_tbl) > -1) ? true : false;
        let indekslibur = (arrayStringTglLibur.indexOf(sd_tbl) > -1) ? arrayStringTglLibur.indexOf(sd_tbl) : -1;
        let weekend = (indekshari == 0 || indekshari == 6) ? true : false;
        th = document.createElement("th");

        if (libur) {
            th.setAttribute("class", "w3-red");
            let teksbawah = "Tgl. " + tanggalfull(d_tbl) + " " + arrayKetLibur[indekslibur];
            arrayKeteranganLibur.push(teksbawah)
        } else if (weekend) {
            th.setAttribute("class", "w3-red");
        } else {

            itungHE++
        }

        th.innerHTML = itgl + "<br>" + NamaHaridariIndex(indekshari);


        tr.appendChild(th);

        itgl++
    }

    let datanama = Object.keys(dataapiguru).map(k => dataapiguru[k].guru_namalengkap);
    // let datajabatan = Object.keys(dataapiguru).map(k => dataapiguru[k].guru_namalengkap);
    // let datagolruang = Object.keys(dataapiguru).map(k => dataapiguru[k].guru_namalengkap);
    let encodenama;


    let tbody = tabel.createTBody()
    for (let j = 0; j < datanama.length; j++) {

        //encodenama = encodeURIComponent(unescape(datanama[j]));
        encodenama = encodeURIComponent(unescape(arraydatatendik[j + 1][2]));

        tr = tbody.insertRow(-1);
        let cell = tr.insertCell(-1);
        cell.innerHTML = j + 1;

        //tr = tbody.insertRow(-1);
        cell = tr.insertCell(-1);
        cell.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px; box-shadow: inset 0 0 1px #000000");
        cell.innerHTML = arraydatatendik[j + 1][2];//"<span style='font-size:12px;' id='datakelas" + j + "'>" + datanama[j] + "</span>";

        //tr = tbody.insertRow(-1);
        cell = tr.insertCell(-1);
        cell.innerHTML = arraydatatendik[j + 1][22];//jabatan 22

        //tr = tbody.insertRow(-1);
        cell = tr.insertCell(-1);
        cell.innerHTML = arraydatatendik[j + 1][24].toUpperCase();//golongan ruang


        let ke = 1;


        for (let k = 0; k < jumlahharibulanini; k++) {
            cell = tr.insertCell(-1);

            d_tbl = new Date(y, m, ke);
            sd_tbl = StringTanggal2(d_tbl);
            indekshari = d_tbl.getDay()
            libur = (arrayStringTglLibur.indexOf(sd_tbl) > -1) ? true : false;
            indekslibur = (arrayStringTglLibur.indexOf(sd_tbl) > -1) ? arrayStringTglLibur.indexOf(sd_tbl) : -1;
            weekend = (indekshari == 0 || indekshari == 6) ? true : false;
            if (libur) {
                cell.setAttribute("class", "w3-red");
                cell.setAttribute("style", "background-color:red")
            } else if (weekend) {
                cell.setAttribute("class", "w3-red");
                cell.setAttribute("style", "background-color:red")
            } else {

                cell.setAttribute("style", "cursor:pointer");
                cell.setAttribute("id", "td_" + encodenama + "_" + ke + "" + nolbulan + "" + y + "");
                // // cell.setAttribute("onclick", "bantuabsen('" + encodenama + "_" + ke + "" + nolbulan + "" + y + "')");
                cell.setAttribute("onclick", "alert('Hanya Kepala sekolah yang berhak membantu absen')");

                cell.innerHTML = "<span style='font-size:10px' id='" + ke + "" + nolbulan + "" + y + "_" + encodenama + "'>x</span>";
            }
            ke++
        }
    }



    document.getElementById("rekapabsenguru").appendChild(tabel);
    document.getElementById("rekapabsenguru").innerHTML += `Keterangan Libur: <ul>`;
    arrayKeteranganLibur.forEach(m => {
        document.getElementById("rekapabsenguru").innerHTML += `<li> ${m} </li>`
    })
    document.getElementById("rekapabsenguru").innerHTML += `</ul>`;

    tetetetetetet(strdate);
}

const tetetetetetet = (ed) => {
    let datee = StringTanggal2(new Date(ed));
    //console.log(datee)
    let namabulan = NamaBulandariIndex(new Date(datee).getMonth());
    //console.log(namabulan);

    fetch(linktendik + "?action=rekapbulanall&strtgl=" + datee)
        .then(m => m.json())
        .then(k => {
            //console.log(k);
            jsonabsenkelasperbulan = k[namabulan].filter(d => d.resume == "disetujui");
            //console.log(jsonabsenkelasperbulan);


            // var datatabel = document.getElementById("tabelxx").getElementsByTagName("tbody")[0];


            for (var i = 0; i < jsonabsenkelasperbulan.length; i++) {
                kodeid = jsonabsenkelasperbulan[i].idtanggal + "_" + encodeURIComponent(dataapiguru.filter(k => k.idabsen == jsonabsenkelasperbulan[i].idabsen)[0].guru_namalengkap);
                //  console.log(kodeid);
                //"<span style='font-size:10px' id='" + ke + "" + nolbulan + "" + y + "_" + ruangankelas + "_" + encodenama + "'>x</span>";

                kodetd = "td_" + encodeURIComponent(dataapiguru.filter(k => k.idabsen == jsonabsenkelasperbulan[i].idabsen)[0].guru_namalengkap) + "_" + jsonabsenkelasperbulan[i].idtanggal;
                var isikehadiran = document.getElementById(kodeid)

                if (isikehadiran == null) {
                    // document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML += "<li>" + decodeURIComponent(jsonabsenkelasperbulan[i].name) + " pada tanggal " + new Date(jsonabsenkelasperbulan[i].timestamp).getDate() + " Tidak ada/diubah namanya.</li>";
                } else {
                    var link = jsonabsenkelasperbulan[i].fileContent;
                    if (link !== "") {
                        var linksplit = link.replace("https://drive.google.com/file/d/", "");
                        var linksplitt = linksplit.replace("/view?usp=drivesdk", "");

                    } else {

                        var linksplitt = "1BZwicOBix4eILY0IQrJs4H825w2k4g-3";;
                    }


                    var cekdiv = document.getElementById(kodetd);
                    if (cekdiv != null) {
                        document.getElementById(kodetd).removeAttribute("onclick");

                        isikehadiran.innerHTML = `<img src="https://drive.google.com/uc?export=view&id=${linksplitt}" style="width:20px; height:30px;cursor:pointer" alt="poto" onclick="klikpotoguru(this,'${jsonabsenkelasperbulan[i].kehadiran}<br/>${jsonabsenkelasperbulan[i].timestamp}')"/><br/>${jsonabsenkelasperbulan[i].kehadiran}`;

                    }
                }

            }

        })
        .catch(er => alert(er))
}

const klikpotoguru = (el, pesan) => {

    document.getElementById("img01").src = el.src;
    document.getElementById("previewpotoabsen").style.display = "block";
    document.getElementById("pesanpreviewpotoabsen").innerHTML = pesan.split("<br/>")[0] + "<br/>" + tanggalfulllengkap(pesan.split("<br/>")[1])

}

async function refreshAbsenHariIni() {
    //alert("dalam tahap pengembangan");
    let datee = StringTanggal2(new Date());
    //console.log(datee)
    let namabulan = NamaBulandariIndex(new Date(datee).getMonth());
    //console.log(namabulan);

    await fetch(linktendik + "?action=rekapbulanall&strtgl=" + datee)
        .then(m => m.json())
        .then(k => {
            jsonabsenkelasperbulan = k[namabulan].filter(d => d.idtanggal == tglStringZero(datee));
            //console.log(jsonabsenkelasperbulan)
        })
        .catch(er => {
            alert(er);
            return
        })

    var datatabel = document.getElementById("tabelpikethariini");

    for (var u = 0; u < datatabel.rows.length; u++) {
        if (u !== 0) {
            if (jsonabsenkelasperbulan.length > 0) {
                for (var v = 0; v < jsonabsenkelasperbulan.length; v++) {
                    if (datatabel.rows[u].cells[1].innerHTML == dataapiguru.filter(g => g.idabsen == jsonabsenkelasperbulan[v].idabsen)[0].guru_namalengkap) {
                        //dataapiguru.filter(k => k.idabsen == lr[0])[0].guru_namalengkap
                        var link = jsonabsenkelasperbulan[v].fileContent;
                        if (link !== "") {
                            var linksplit = link.replace("https://drive.google.com/file/d/", "");
                            var idpoto = linksplit.replace("/view?usp=drivesdk", "");

                        } else {
                            var idpoto = idlogo;
                        }

                        let teks = (jsonabsenkelasperbulan[v].resume == "") ? " menunggu persetujuan" : jsonabsenkelasperbulan[v].resume;
                        datatabel.rows[u].cells[2].innerHTML = `<img src="https://drive.google.com/uc?export=view&id=${idpoto}" style="width:75px;cursor:pointer" alt="poto" onclick="klikpotoguru(this,'${jsonabsenkelasperbulan[v].kehadiran}<br/>${jsonabsenkelasperbulan[v].timestamp}')"/><br/>${jsonabsenkelasperbulan[v].kehadiran} `;
                        datatabel.rows[u].cells[2].innerHTML += "Pukul <br/>" + addZero(new Date(jsonabsenkelasperbulan[v].timestamp).getHours()) + ":" + addZero(new Date(jsonabsenkelasperbulan[v].timestamp).getMinutes()) + ":" + addZero(new Date(jsonabsenkelasperbulan[v].timestamp).getSeconds());
                        datatabel.rows[u].cells[3].innerHTML = teks;
                        // if (jsonabsenkelasperbulan[v].idbaris !== "") {
                        //     datatabel.rows[u].cells[3].innerHTML += `<br/> <button onclick="hapusabsensiswaini('${jsonabsenkelasperbulan[v].idbaris}')">Ganti/Hapus</button>`;
                        // }
                        break;
                    } else {
                        datatabel.rows[u].cells[2].innerHTML = "Belum Absen";
                        // console.log(dataapiguru.filter(g => g.idabsen == jsonabsenkelasperbulan[v].idabsen)[0].guru_namalengkap);

                        //"Aksi";
                        //"bantuabsen('" + encodenama + "_" + ke + "" + nolbulan + "" + y + "')";




                    }
                }
            } else {
                datatabel.rows[u].cells[2].innerHTML = "Belum Absen"
            }
        }
    }

}

function bantuabsen(encodenama) {


    var teks = encodenama;
    var split = teks.split("_");
    var kodenama = split[0];
    var tgl = split[1];
    var strtgl = balikinidok(tgl);
    modalkameraabsen.style.display = "block";
    //belumabsenkehadiranguru.style.display = "block";
    namagurupiket.innerHTML = decodeURIComponent(kodenama);

    document.querySelector(".ketabsenkehadiranguru").innerHTML = tanggalfull(new Date(strtgl));
    let kodedivpoto = document.querySelector("#datakirimgurupiket")
    kodedivpoto.innerHTML = "";

    tempatidok.value = tgl;
    tempatidabsen.value = dataapiguru.filter(k => k.guru_namalengkap == decodeURIComponent(kodenama))[0].idabsen;
    avatargurupiket.src = "/img/lamaso.webp"

};

const bantuabsenkehadiranguru = () => {
    //define the width to resize e.g 600px

    let idabsen = tempatidabsen.value;
    var resize_width = 150;//without px

    //get the image selected
    var item = document.querySelector('#kamerapiket').files[0];
    let kodedivpoto = document.querySelector("#datakirimgurupiket")

    //create a FileReader
    var reader = new FileReader();

    //image turned to base64-encoded Data URI.
    reader.readAsDataURL(item);
    reader.name = item.name;//get the image's name
    reader.size = item.size; //get the image's size
    reader.onload = function (event) {
        var img = new Image();//create a image
        img.src = event.target.result;//result is base64-encoded Data URI
        img.name = event.target.name;//set name (optional)
        img.size = event.target.size;//set size (optional)
        img.onload = function (el) {
            var elem = document.createElement('canvas');//create a canvas

            //scale the image to 600 (width) and keep aspect ratio
            var scaleFactor = resize_width / el.target.width;
            elem.width = resize_width;
            elem.height = el.target.height * scaleFactor;

            //draw in canvas
            var ctx = elem.getContext('2d');
            ctx.drawImage(el.target, 0, 0, elem.width, elem.height);

            //get the base64-encoded Data URI from the resize image
            var srcEncoded = ctx.canvas.toDataURL(el.target, 'image/jpeg', 0);

            // //assign it to thumb src
            var poto = document.querySelector('.imgguruabsen')
            poto.src = srcEncoded;



            kodedivpoto.innerHTML = "";

            var inputbase64 = document.createElement("input");
            inputbase64.setAttribute("id", "hgfileContent");
            inputbase64.value = srcEncoded.replace(/^.*,/, '');

            var inputfilename = document.createElement("input");
            inputfilename.setAttribute("id", "hgfilename");
            inputfilename.value = "avatar_" + idabsen + "_" + new Date().getTime();//StringTanggal(new Date());

            var inputmimetype = document.createElement("input");
            inputmimetype.setAttribute("id", "hgmimeType")
            inputmimetype.value = 'data:image/jpeg';//srcEncoded.match(/^.*(?=;)/)[0]
            //sekarang kita taroh di sini:
            //document.getElementById("idpoto_potoguru").value = srcEncode; //oFREvent.target.result;
            // buat generate input
            kodedivpoto.appendChild(inputbase64);
            kodedivpoto.appendChild(inputfilename);
            kodedivpoto.appendChild(inputmimetype);


        }
        //loginbantu.style.display = "inline-block";
    }


    let labelfor = document.getElementById("tombolabsenguru");
    labelfor.removeAttribute("for");
    labelfor.setAttribute("for", "kirimpotoabsenguru");
    labelfor.innerHTML = "Kirim";
    labelfor.setAttribute("class", labelfor.className.replace("w3-green", "w3-blue"));
    document.querySelector(".ketabsenkehadiranguru").innerHTML = "Poto Siap dikirim";
    let tambahklik = document.getElementById("kirimpotoabsenguru");
    tambahklik.setAttribute("onclick", "gurukirimabsen(" + idabsen + ")")
}

const gurukirimabsen = () => {
    let x = document.getElementById("pilih_kehadirangurupiket").selectedIndex;
    let y = document.getElementById("pilih_kehadirangurupiket").options;

    let idok = tglStringZero();//tempatidok.value;
    //let constidguruabsen = tempatidabsen.value;
    document.querySelector(".ketabsenkehadiranguru").innerHTML = "<i class='fa fa-refresh fa-spin w3-large'></i>";
    //belumabsenkehadiranguru.style.display = "none";


    let hadir = y[x].value;
    let database64 = document.getElementById("hgfileContent").value;
    let tipe = document.getElementById("hgmimeType").value;//.replace("data:", "");
    let filename = document.getElementById("hgfilename").value;

    let data = new FormData();
    data.append("database64", database64);
    data.append("tipe", tipe);
    data.append("filename", filename)
    data.append("hadir", hadir);
    data.append("idok", idok);
    data.append("idguruabsen", constidguruabsen);
    fetch(linktendik + "?action=guruisiabsen", { method: 'post', body: data })
        .then(m => m.json())
        .then(f => {
            //alert(f.result.replace('<br/>', '\n'));
            document.querySelector(".ketabsenkehadiranguru").innerHTML = f.result;
            //kehadiranguru();
            //console.log(f);
            let labelfor = document.getElementById("tombolabsenguru");
            labelfor.removeAttribute("for");
            labelfor.setAttribute("for", "kamerapiket");
            labelfor.innerHTML = "Absen";
            labelfor.setAttribute("class", labelfor.className.replace("w3-blue", "w3-green"));
            setTimeout(() => {
                modalkameraabsen.style.display = "none";
                //refreshAbsenHariIni();
                kehadiranguru();
            }, 2000);

        })
        .catch(er => {
            alert(er);
            document.querySelector(".ketabsenkehadiranguru").innerHTML = er;
            belumabsenkehadiranguru.style.display = "block";

        })
}

function kirimwauntukabsen(id) {
    var noid = id.split("_")[1];
    datasiswaklik = dataapiguru.filter(x => x.idabsen == noid);

    var tgl = new Date();
    var stgl = tgl.getDate();
    var xbln = tgl.getMonth() + 1;
    var sbln = addZero(xbln);


    var sthn = tgl.getFullYear();
    var idok = stgl + "" + sbln + "" + sthn;

    var kelas = ruangankelas;
    document.getElementById("namaanakdiwa").innerHTML = datasiswaklik[0].guru_namalengkap;
    document.getElementById('wasiswa').style.display = 'block';
    document.kirimwasiswa.nowasiswa.value = "";
    var nowanya = datasiswaklik[0].no_wa_user;
    if (nowanya.length > 11) {
        document.kirimwasiswa.nowasiswa.disabled = true;
        document.kirimwasiswa.nowasiswa.value = nowanya;
        pesanawalwa.innerHTML = "No WA sudah terisi dan siap menghubungi Bapak/Ibu  ";
    }
    else {
        document.kirimwasiswa.nowasiswa.disabled = false;
        pesanawalwa.innerHTML = "No WA belum terisi untuk mengirim pesan WA ke Bapa/Ibu  ";
    }

    var tombolwamodal = document.createElement("button");
    tombolwamodal.setAttribute("class", "login");
    tombolwamodal.setAttribute("onclick", "btnkirimwasiswa()");
    tombolwamodal.innerHTML = "<i class='fa fa-whatsapp'></i> Kirim Pesan";
    document.getElementById("tombolotomatis").innerHTML = "";
    document.getElementById("tombolotomatis").appendChild(tombolwamodal);
}
function btnkirimwasiswa() {
    pesanawalwa.innerHTML = "";
    var teksnya = "Assalamualaikum, Salam sejahtera. \n \n Kami melacak  bahwa Bpk/Ibu " + namaanakdiwa.innerHTML + " belum mengisi kehadiran, silakan balas WA ini dengan mengirimkan Poto untuk Kami bantu kehadirannya. \n \n Berikut pesan khususnya: ";
    var nowaa = document.kirimwasiswa.nowasiswa.value;
    var nowa;
    if (nowaa.slice(0, 1) == "0") {
        nowa = "+62" + nowaa.slice(1, 12);
    }
    else if (nowaa.slice(0, 1) == "6") {
        nowa = "+" + nowaa;
    } else {
        nowa = nowaa
    }
    var urlnya = getLinkWhastapp(nowa, teksnya + "\n \n " + document.kirimwasiswa.tekssiswa.value);
    window.open(urlnya)
    document.kirimwasiswa.reset();
    document.getElementById("wasiswa").style.display = "none";
}

function getLinkWhastapp(number, message) {
    var url = 'https://api.whatsapp.com/send?phone='
        + number
        + '&text='
        + encodeURIComponent(message)

    return url
}

let printrekappiket = document.getElementById("printrekappiket");
printrekappiket.addEventListener("click", function () {
    let isibody = document.getElementById("rekapabsenguru").innerHTML;
    let idselect = document.getElementById("daftarpilihbulankehadiranguru");
    let xx = idselect.selectedIndex;
    let strdate = idselect[xx].text;

    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO DATA GURU</title>`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link href="https://fonts.googleapis.com/css?family=Raleway">`;
    head.innerHTML += `<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>`;
    head.innerHTML += `<style type="text/css">
    .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}
    </style>`;

    head.innerHTML += `<style type="text/css" media="print">
    @media print {
        html,body{height:100%;width:100%;margin:0;padding:0}
        
         @page {
            size: A4 landscape;
            max-height:100%;
            max-width:100%;
            
            }
    }
    </style>`;

    body.innerHTML = `<h2 class="w3-center">DAFTAR HADIR PENDIDIK DAN TENAGA KEPENDIDIKAN ${idNamaSekolah.toUpperCase()}<br/>BULAN ${strdate.toUpperCase()} ${new Date().getFullYear()}</h2>`
    body.innerHTML += isibody
    body.innerHTML += '<br/><br/><div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ',' + tanggalfull(new Date()) + '<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><b><u>' + idNamaKepsek + '</u></b><br/>NIP. ' + idNipKepsek + '</div>';

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

})

let tombolexcelpiket = document.getElementById("excelrekappiket");
tombolexcelpiket.addEventListener("click", function () {
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    tabelhasil.setAttribute("class", "versi-table");
    tabelhasil.setAttribute("id", "myTableCopy");

    var tabeleditt = document.getElementById("tabelxx");


    var cln = tabeleditt.cloneNode(true);
    tabelhasil.appendChild(cln);
    datasiswadiv.appendChild(tabelhasil);
    var tabeledithead = document.getElementById("myTableCopy").getElementsByTagName("thead")[0];
    //tabeledithead.rows[0].deleteCell(1);
    var identitasbulanrekap = tabeledithead.rows[0].cells[4].innerHTML

    var tabeledit = document.getElementById("myTableCopy").getElementsByTagName("tbody")[0];
    for (i = 0; i < tabeledit.rows.length; i++) {
        for (j = 0; j < tabeledit.rows[i].cells.length; j++) {

            let teks = tabeledit.rows[i].cells[j].innerHTML.replace("<br/>", "")
            let tekss = teks.replace("poto", "")
            tabeledit.rows[i].cells[j].innerHTML = tekss;

        };


    }
    let countcol = tabeledit.rows[0].cells.length;
    let brs = tabeledithead.insertRow(0)
    let sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol);
    sel.setAttribute("style", "text-align:center");

    sel.innerHTML = "DAFTAR HADIR PENDIDIK DAN TENAGA KEPENDIDIKAN " + idNamaSekolah.toUpperCase();

    brs = tabeledithead.insertRow(1)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol);
    sel.innerHTML = identitasbulanrekap.toUpperCase();

    brs = tabeledithead.insertRow(2)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol)

    //---------- TAMBAHKAN TANDA TANGAN

    //let cobatabel = tabeledit;// document.getElementById("myTableCopy");
    //let tabeledit = dat.getElementsByTagName("tbody")[0];
    let rowcount = tabeledit.rows.length;
    //console.log(rowcount)
    let colcount = tabeledit.rows[0].cells.length;
    countcol = tabeledit.rows[0].cells.length;
    if (colcount >= 5) {

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        for (let a = 0; a < colcount - 14; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel.setAttribute("colspan", 10);
        sel.innerHTML = "NIP. " + idNipKepsek;


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        for (let a = 0; a < colcount - 14; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel.setAttribute("colspan", 10);
        sel.innerHTML = "<b><u>" + idNamaKepsek + "</u></b>";


        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        for (let a = 0; a < colcount - 14; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel.setAttribute("colspan", 10);
        sel.innerHTML = "Kepala " + idNamaSekolah;



        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        for (let a = 0; a < colcount - 14; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel.setAttribute("colspan", 10);
        sel.innerHTML = jlo.kota + ", " + tanggalfull(new Date())


        brs = tabeledit.insertRow(rowcount)


    } else {



    }




    $("#myTableCopy").table2excel({
        name: idNamaSekolah,
        filename: "Daftar Piket Guru" + " ID FILE " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_judul: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 3,
        barisatas: 3
    });
    datasiswadiv.innerHTML = "";
})



// async function absensisiswa() {
//     alert("FItur belum diaktifkan")
//     // if (dataapiguru.length == 0) {
//     //     alert("Anda harus melihat data guru Anda terlebih dahulu.");
//     //     return
//     // }
//     // tampilinsublamangurukelas("absen");
//     // let tabKBM = document.querySelector(".KBM");
//     // tabKBM.click();
//     // // let namarombel = arrayrombel();
//     // // let tekshtml = "<table class='versi-table w3-tiny' id='kelasaktif'><thead><tr><th>Jenjang Kelas</th><th>Kelas</th><th>Keaktifan (KBM Berlangsung)</th><th>Konten</th><th>Pembuat Konten</th><th>Pengedit Konten</th></tr></thead><tbody>";
//     // // for (i = 0; i < 6; i++) {
//     // //     tekshtml += `<tr>
//     // //     <td>Kelas ${i + 1}</td>
//     // //     <td>${namarombel.filter(k => k.match(/(\d+)/)[0] == (i + 1)).join("<br/>")}</td>
//     // //     <td>Sedang berlangsung / Tidak ada KBM</td>
//     // //     <td><button onclick="alert('Cek Konten')" class='w3-blue w3-btn'>Cek Konten</button></td>
//     // //     <td>PEmbuat</td>
//     // //     <td>diedit</td>
//     // //     </tr>
//     // //     `
//     // // }
//     // // tekshtml += "</tbody></table>";
//     // tabelabsenhariini.innerHTML = "FITUR BELUM DIAKTIFKAN";//tekshtml;
//     // let data = await datadatakontenmateri();
//     // dataseluruhmateri = data;
//     // let tabel = document.getElementById("kelasaktif").getElementsByTagName("tbody")[0];
//     // for (j = 0; j < tabel.rows.length; j++) {
//     //     let adamateri = data.filter(k => k.idtoken == (j + 1) && k.crtToken == zerozeroidok());
//     //     let adaaktifitas = data.filter(k => k.idtoken == (j + 1) && k.crtToken == zerozeroidok()).length;
//     //     tabel.rows[j].cells[2].innerHTML = (adaaktifitas == 0) ? "Tidak ada aktifitas KBM " : "Ada " + adaaktifitas + " Materi Hari ini";//+ " Materi";
//     //     tabel.rows[j].cells[3].innerHTML = "";
//     //     tabel.rows[j].cells[4].innerHTML = "";
//     //     tabel.rows[j].cells[5].innerHTML = "-";
//     //     if (adaaktifitas > 0) {
//     //         localStorage.setItem("kbmtodaykelas_" + (j + 1), JSON.stringify(adamateri));
//     //         for (u = 0; u < adaaktifitas; u++) {
//     //             tabel.rows[j].cells[3].innerHTML += `<button class="w3-button w3-blue w3-tiny" onclick="previewriwayat(${(j + 1)},${u})">Materi ${u + 1}</button><br/><br/>`;
//     //             tabel.rows[j].cells[4].innerHTML += adamateri[u].pembuatpertama + "<br/><br/>";
//     //             if (adamateri[u].action == "materibaru") {
//     //                 tabel.rows[j].cells[5].innerHTML = "- <br/><br/>";
//     //             } else {
//     //                 tabel.rows[j].cells[5].innerHTML += adamateri[u].dibuatoleh + "<br/><br/>";

//     //             }
//     //         }
//     //     }
//     //     // tabel.rows[j].cells[5].innerHTML = data.filter(k => k.idtoken == 1 && k.crtToken == zerozeroidok()).length + " Materi";
//     // }


// }


// let misal1 = data.filter(k => k.idtoken == 1)
// console.log(data)
// console.log(misal1)


const arrayrombel = () => {
    let arraykelas = jsondatasiswa.map(m => m.nama_rombel).filter((a, b, c) => c.indexOf(a) == b)
    // let tes = [];
    // for (i = 0; i < dataapiguru.length; i++) {
    //     let obj = dataapiguru[i];
    //     let namakelas = (obj.kelas == "Kepala Sekolah" || obj.kelas == "Operator Sekolah" || obj.kelas == "TU" || obj.kelas == "Penjaga" || obj.kelas == "PJOK" || obj.kelas == "PAI" || obj.kelas == "PKRIS" || obj.kelas == "BSUND" || obj.kelas == "PKATO" || obj.kelas == "PHIND" || obj.kelas == "PBUDH" || obj.kelas == "PKONG") ? "" : obj.kelas;

    //     if (arraykelas.indexOf(namakelas) == -1 && namakelas !== "") {
    //         //if (namakelas !== "") {
    //         arraykelas.push(namakelas)

    //         tes.push(arraykelas.indexOf(namakelas))
    //         //}

    //     }
    // }
    // console.log(arraykelas.sort());
    // console.log(tes);
    return arraykelas.sort()
}

const datadatakontenmateri = () => {
    //let hariini = e.parameter.idoknol;//
    let link = jlo.url_materi + "?idss=" + jlo.ss_materi + "&action=kepsekcekkonten";

    return fetch(link)
        .then(m => m.json())
        .then(k => k.result)

}

let kekatifanguru = document.querySelector(".Keaktifan");
kekatifanguru.addEventListener("click", async function () {
    if (dataseluruhmateri.length == 0) {
        dataseluruhmateri = await datadatakontenmateri();
    }
    let dataguru = dataapiguru.filter(f => f.gurukelas_gmp == "Guru Kelas" || f.gurukelas_gmp == "Guru Mapel");

    tekshtml = `<hr/><table class="versi-table w3-tiny" id="tabelkeaktifangurudalampjj">
    <thead>
    <tr>
    <th>No.</th>
    <th>Nama Guru</th>
    <th>Frekuensi Pembuatan Materi</th>
    <th>Frekuensi Pengeditan/Revisi Materi</th>
    </tr>
    </thead>
    <tbody>
    `;
    for (ii = 0; ii < dataguru.length; ii++) {

        tekshtml += `<tr>
        <td>${ii + 1}</td>
        <td>${dataguru[ii].guru_namalengkap}</td>
        <td>${(dataseluruhmateri.filter(g => g.pembuatpertama == dataguru[ii].guru_namalengkap).length == 0) ? "<b class='w3-text-red'>Belum Pernah Membuat</b>" : dataseluruhmateri.filter(g => g.pembuatpertama == dataguru[ii].guru_namalengkap).length + " Materi"} </td>
        <td>${(dataseluruhmateri.filter(g => g.dibuatoleh == dataguru[ii].guru_namalengkap).length == 0) ? "<b class='w3-text-red'>Belum Pernah Mengedit</b>" : dataseluruhmateri.filter(g => g.dibuatoleh == dataguru[ii].guru_namalengkap).length + " Materi"}</td>
        </tr>
        `
    }
    tekshtml += "</tbody></table>";
    document.getElementById("tabel_rekap_absen_sia_tgl").innerHTML = tekshtml;



})


function printkeaktifangurudalampjj() {
    //alert("Print")
    let isibody = document.getElementById("tabel_rekap_absen_sia_tgl").innerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO DATA GURU</title>`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link href="https://fonts.googleapis.com/css?family=Raleway">`;
    head.innerHTML += `<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>`;
    head.innerHTML += `<style type="text/css">
    .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}
    </style>`;

    head.innerHTML += `<style type="text/css" media="print">
    @media print {
        html,body{height:100%;width:100%;margin:0;padding:0}
        
         @page {
            size: A4 portrait;
            max-height:100%;
            max-width:100%;
            
            }
    }
    </style>`;

    body.innerHTML = `<h3 class='w3-center'>DATA KEAKTIFAN GURU DALAM KEGIATAN PJJ</h3><h3 class='w3-center'> SEMESTER ${idSemester} TAHUN PELAJARAN ${idTeksTapel}</h3><center> ${isibody}</center><br/><br/><br/>`
    body.innerHTML += '<div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ',' + tanggalfull(new Date()) + '<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><b><u>' + idNamaKepsek + '</u></b><br/>NIP. ' + idNipKepsek + '</div>';

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();


}

let konten = document.querySelector(".Konten");
konten.addEventListener("click", async function () {
    if (dataseluruhmateri.length == 0) {
        dataseluruhmateri = await datadatakontenmateri();
    }
    //let dataguru = dataapiguru.filter(f => f.gurukelas_gmp == "Guru Kelas" || f.gurukelas_gmp == "Guru Mapel");

    tekshtml = `<hr/><table class="versi-table " id="tabelkeaktifangurudalampjj">
    <thead>
    <tr>
    <th>No.</th>
    <th>Judul Materi</th>
    <th>Kelas</th>
    <th>Preview</th>
    </tr>
    </thead>
    <tbody>
    `;
    for (ii = 0; ii < dataseluruhmateri.length; ii++) {

        tekshtml += `<tr>
        <td>${ii + 1}</td>
        <td>${dataseluruhmateri[ii].idmapel}</td>
        <td> Kelas ${dataseluruhmateri[ii].idtoken}</td>
        <td> <button onclick="previewriwayat2(${ii})" class="w3-button w3-purple">Preview</button></td>
        
        </tr>
        `
    }
    tekshtml += "</tbody></table>";
    document.getElementById("tabelabsenrekap").innerHTML = tekshtml;



})


function printkontenpjj() {
    //alert("Print")
    let isibody = document.getElementById("tabelabsenrekap").innerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO DATA GURU</title>`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link href="https://fonts.googleapis.com/css?family=Raleway">`;
    head.innerHTML += `<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>`;
    head.innerHTML += `<style type="text/css">
    .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}
    </style>`;

    head.innerHTML += `<style type="text/css" media="print">
    @media print {
        html,body{height:100%;width:100%;margin:0;padding:0}
        
         @page {
            size: A4 portrait;
            max-height:100%;
            max-width:100%;
            
            }
    }
    </style>`;

    body.innerHTML = `<h3 class='w3-center'>DATA KONTEN MATERI KEGIATAN BDR/PJJ</h3><h3 class='w3-center'> SEMESTER ${idSemester} TAHUN PELAJARAN ${idTeksTapel}</h3><center> ${isibody}</center><br/><br/><br/>`
    body.innerHTML += '<div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ',' + tanggalfull(new Date()) + '<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><b><u>' + idNamaKepsek + '</u></b><br/>NIP. ' + idNipKepsek + '</div>';

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();


}

const modalfnkalenderkehadirangurupribadi = () => {
    let x = document.getElementById("daftarpilihbulankehadirangurupribadi").selectedIndex;
    let y = document.getElementById("daftarpilihbulankehadirangurupribadi").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);
    if (y[x].value == "") {
        alert("Silakan pilih bulannya untuk mengetahui daftar piket Anda.");
        return
    }
    let namabulan = y[x].text;
    modalnamabulan.innerHTML = namabulan.toUpperCase() + " 2021";

    let notgl = new Date(y[x].value);


    let tyear = notgl.getFullYear();
    let mont = notgl.getMonth();
    let tmont = notgl.getMonth() + 1;
    let tglakhir = daysInMonth(tmont, tyear);
    let lr = 1;

    let elkosong = document.querySelectorAll(".kosongindulu");
    for (let a = 0; a < elkosong.length; a++) {
        elkosong[a].innerHTML = "";
    }

    let ket = [];
    for (let i = 0; i < tglakhir; i++) {
        let dd = new Date(tyear, mont, (i + 1));
        let day = new Date(tyear, mont, (i + 1)).getDay(); /// dimulai dari 0
        let tday = new Date(tyear, mont, (i + 1)).getDate(); /// dimulai dari 0
        let idok = tday + "" + addZero(dd.getMonth() + 1) + "" + dd.getFullYear();
        let col = day + 1;


        let td = document.getElementById("kolomtabel" + lr + "_" + col)
        td.innerHTML = tday;
        //td.innerHTML += (rekapabsensiswabulanan.id == idok) ? `<br><img src=""/>` : `<br>Tidak Hadir`
        td.innerHTML += `<div id="td_${constidguruabsen}_${idok}"></div>`

        if (cocoklibur(dd)) {
            td.setAttribute("style", "background-color:red");
            let tgllibur = tanggalfull(dd) + " = " + keteranganlibur(dd)
            ket.push(tgllibur);
        } else {
            td.removeAttribute("style")
        }

        if (col == 7) {

            lr++
        }
    }
    if (ket.length == 0) {
        ketketliburkehadirangurupribadi.innerHTML = ""
    } else {
        ketketliburkehadirangurupribadi.innerHTML = ket.join("<br>")
    }
    //console.log(ket)
    let datee = StringTanggal2(notgl);
    dataabsenbulanan(datee, namabulan)
}


const cocoklibur = (tgl) => { /// bolean
    let k = JSON.parse(localStorage.getItem("TglLibur"))
    // let d = JSON.parse(localStorage.getItem("Ketlibur"))
    let arrayStringTglLibur = k.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
    //console.log(arrayStringTglLibur);
    //let arrayKetLibur = k.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

    let str = StringTanggal2(new Date(tgl))

    let inte = arrayStringTglLibur.indexOf(str)

    if (inte > -1) {
        return true
    } else {
        return false
    }

}
const keteranganlibur = (tgl) => { /// bolean
    let k = JSON.parse(localStorage.getItem("TglLibur"))
    // let d = JSON.parse(localStorage.getItem("Ketlibur"))
    let arrayStringTglLibur = k.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
    let arrayKetLibur = k.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

    let str = StringTanggal2(new Date(tgl))

    let inte = arrayStringTglLibur.indexOf(str);
    let arr = ''

    if (inte > -1) {
        arr = arrayKetLibur[inte]

    }

    return arr
}

const dataabsenbulanan = async (datee, namabulan) => {
    // console.log(datee + "\n\n" + namabulan)
    await fetch(linkkehadiranguru + "?action=rekapbulan&idguruabsen=" + constidguruabsen + "&strtgl=" + datee)
        .then(m => m.json())
        .then(k => {
            //jsonabsenkelasperbulan = k[bulanapi];
            rekapabsensiswabulanan = k[namabulan];//.filter(s => s.name == namasiswa);
            // console.log(k)
            // console.log(rekapabsensiswabulanan)
            //---------------------------------------------------

            for (var i = 0; i < rekapabsensiswabulanan.length; i++) {
                //mengecek element kodeid
                //kodeid = jsonabsenkelasperbulan[i].id + "_" + kelas + "_" + encodeURIComponent(jsonabsenkelasperbulan[i].name);
                let kodetd = "td_" + encodeURIComponent(rekapabsensiswabulanan[i].idabsen) + "_" + rekapabsensiswabulanan[i].idtanggal;
                //console.log(kodetd)
                var isikehadiran = document.getElementById(kodetd)

                if (isikehadiran == null) {
                    //document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML += "<li>" + decodeURIComponent(jsonabsenkelasperbulan[i].name) + " pada tanggal " + new Date(jsonabsenkelasperbulan[i].Time_Stamp).getDate() + " Tidak ada/diubah namanya.</li>";
                } else {
                    var link = rekapabsensiswabulanan[i].fileContent;
                    if (link !== "") {
                        var linksplit = link.replace("https://drive.google.com/file/d/", "");
                        var linksplitt = linksplit.replace("/view?usp=drivesdk", "");

                    } else {

                        var linksplitt = idlogo;
                    }


                    var cekdiv = document.getElementById(kodetd);
                    if (cekdiv != null) {
                        //document.getElementById(kodetd).removeAttribute("onclick");

                        // isikehadiran.innerHTML = "<div style='width:22px;height:32px;cursor:pointer;border:1px solid blue'><a href='" + jsonabsenkelasperbulan[i].fileContent + "' target='_blank'><img src='https://drive.google.com/uc?export=view&id=" + linksplitt + "'  style='width:20px; height:30px'  alt='poto'><br/>" + jsonabsenkelasperbulan[i].kehadiran + "</a></div>";
                        isikehadiran.innerHTML = `<img class="w3-image" src="https://drive.google.com/uc?export=view&id=${linksplitt}" style="width:20px; height:30px;cursor:pointer" alt="poto" onclick="klikpotoguru(this,'${rekapabsensiswabulanan[i].kehadiran}<br/>${rekapabsensiswabulanan[i].timestamp}')"/><br/>${rekapabsensiswabulanan[i].kehadiran}`;

                    }
                    //document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML +="";
                }

            }

        }).catch(er => {
            console.log(er)
        })

}
let tabuploadmeme = document.querySelector(".uploadmeme");
let tabsimulasi = document.querySelector(".simulasimeme");
const previewmemetemplate = () => {
    let item = document.getElementById("uploadmemetemplate").files[0];
    let div = document.getElementById("previewuploadmeme");
    let rd = new FileReader()
    rd.onload = function (e) {
        div.innerHTML = `<img src="${e.target.result}" class="w3-image"/>`
    }
    rd.readAsDataURL(item);

}

function uploadmm() {
    var files = document.getElementById("uploadmemetemplate").files;
    var untuksiapa = document.getElementById("untuksiapainitemplate").value;
    var keterangan = document.getElementById("keterangantemplate").value;
    // console.log(files.length)
    // if(files[0] == "")
    if (files.length == 0 || untuksiapa == "" || keterangan == "") {
        alert("Maaf, data gambar belum bisa diunggah. Pastikan semua data terisi");
        return
    }
    let namafile = files[0].name;

    //console.log(namafile)
    if (files.length > 0) {

        var formData = new FormData();
        formData.append("file", files[0]);

        var xhttp = new XMLHttpRequest();

        // Set POST method and ajax file path
        xhttp.open("POST", "/send.php", true);

        // call on request changes state
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                var response = this.responseText;
                if (response == 1) {

                    //disini akan dipanggil lagi data tulis
                    simpanmemekespreadsheet(namafile, "aktif", untuksiapa, keterangan)

                } else {
                    alert("File not uploaded.");
                }
            }
        };

        // Send request with data
        xhttp.send(formData);

    } else {
        alert("Please select a file");
    }


};

const simpanmemekespreadsheet = (a, b, c, d) => {
    let data = new FormData();
    data.append("htmlgambar", a);
    data.append("aktif", b);
    data.append("untuk", c);
    data.append("keterangan", d);
    fetch(linkmateri + "&action=tambahtemplate", {
        method: "post",
        body: data
    }).then(m => m.json())
        .then(k => {
            alert(k.result + " (Upload successfully) ");
            document.getElementById("previewuploadmeme").innerHTML = "";
            document.getElementById("keterangantemplate").value = "";
            tabuploadmeme.click();
        }).catch(er => alert(er))

}

let koleksinamafileuploaded;

let divtabelmeme = document.getElementById("tableuploadedmeme");
tabuploadmeme.addEventListener("click", function () {
    koleksinamafileuploaded = [];
    fetch(linkmateri + "&action=datatemplate&jenisuser=All")
        .then(m => m.json())
        .then(k => {
            //console.log(k);

            let tekshtml = `<h3>Tabel Template yang telah dibuat</h3><table class="versi-table">
       <thead>
       <tr>
       <th>No</th>
       <th>Keterangan</th>
       <th>Preview</th>
       <th>Diterbitkan untuk</th>
       <th>Aksi</th>
       </tr>
       </thead>
       <tbody>
       `;
            for (i = 0; i < k.records.length; i++) {
                koleksinamafileuploaded.push(k.records[i].htmlgambar);
                let terbitkantidak = (k.records[i].status == "aktif") ? `<button class="w3-button w3-tiny w3-red" onclick="publikasikandraft(${k.records[i].idmeme},'hapus')">Jadikan Draft</button>` : `<button class="w3-button w3-tiny w3-green" onclick="publikasikandraft(${k.records[i].idmeme},'aktif')">Publikasikan</button>`;
                tekshtml += `
           <tr>
                <td>${i + 1}</td>
                <td>${k.records[i].keterangan}</td>
                <td><img src="/memetemplate/${k.records[i].htmlgambar}" class="w3-image"  onclick="klikgambarmeme(this,'${k.records[i].keterangan}<br/>Untuk ${k.records[i].untuk}')"/>
                <br/><sub>Nama file : ${k.records[i].htmlgambar}</sub>
                </td>
                <td>${k.records[i].untuk}</td>
                <td>${terbitkantidak}</td>
            </tr>
           `;
            }
            tekshtml += `</tbody></table>`;
            divtabelmeme.innerHTML = tekshtml;

        })
        .catch(er => console.log(er))
})


const klikgambarmeme = (el, pesan) => {

    document.getElementById("img01").src = el.src;
    document.getElementById("previewpotoabsen").style.display = "block";
    document.getElementById("pesanpreviewpotoabsen").innerHTML = pesan.split("<br/>")[0] + "<br/>" + pesan.split("<br/>")[1];

}

tabsimulasi.addEventListener("click", function () {
    let div1 = document.getElementById("kesiapanmeme");
    let div2 = document.getElementById("pilihframe");
    div1.innerHTML = "<i class='fa fa-refresh fa-spin'></i> Mohon tunggu sebentar. Sedang ngopi Liong dulu servernya ..."

    document.getElementById("potomeme").src = "https://drive.google.com/uc?export=view&id=" + idlogo;
    document.getElementById("downloadmeme").className = document.getElementById("downloadmeme").className.replace("w3-show", "w3-hide");
    document.getElementById("downloadmeme").removeAttribute("onclick");

    // let tekshtml = `<option value="0" selected="">Silakan Pilih Frame</option>
    //         <option value="/memetemplate/23rt.png" >Tema 1</option>
    //         <option value="/memetemplate/sukseskanlombafls2nkotadepok.png" >Tema 2 New</option>
    //         `;

    // div2.innerHTML = tekshtml;
    // div1.innerHTML = " Kreasikan Poto Anda di sini:";

    fetch(linkmateri + "&action=datatemplate&jenisuser=Guru")
        .then(m => m.json())
        .then(k => {
            console.log(k);
            let datafilter = k.records.filter(k => k.status == "aktif");
            let tekshtml = `<option value="0" selected="">Silakan Pilih Frame</option>`;
            for (let i = datafilter.length - 1; i >= 0; i--) {
                if (i == datafilter.length - 1) {

                    tekshtml += `<option value="/memetemplate/${datafilter[i].htmlgambar}">${datafilter[i].keterangan} <b class="w3-text-red">[Baru]</b></option>`;
                } else {

                    tekshtml += `<option value="/memetemplate/${datafilter[i].htmlgambar}">${datafilter[i].keterangan}</option>`
                }
            }
            div2.innerHTML = tekshtml;
            div1.innerHTML = " Kreasikan Poto Anda di sini:";

        })
        .catch(er => console.log(er))
})

const frameeditor = () => {
    tampilinsublamangurukelas("meme")
    let m = JSON.parse(localStorage.getItem("typeuser"));
    if (m.jenjang == "Penjaga Sekolah") {
        document.querySelector(".simulasimeme").click()
    } else {
        document.querySelector(".petunjukmeme").click()
    }
}

const publikasikandraft = (id, aktif) => {
    let data = new FormData();
    data.append("status", aktif)
    data.append("idmeme", id)
    fetch(linkmateri + "&action=publikasitemplate", {
        method: "post",
        body: data
    })
        .then(m => m.json())
        .then(k => {
            console.log(k)
            let teks = (k.result == "aktif") ? "dipublikasikan" : "dihapus";
            alert("Template berhasil " + teks);
            tabuploadmeme.click()

        })
        .catch(er => alert("Ups, terjadi kesalahan. Pesan error: " + er))
}

//////////////////////////// akreditasi ////////////////

let akreditasitersimpan = [];
let tandaklikakreditas = 0;
const pembelajaran = async () => {
    document.getElementById("loadingambildataakreditasitersimpan").innerHTML = `<i class="fa fa-spin fa-spinner w3-xxlarge"></i>`;
    await getDataAkreditasi()
    tampilinsublamangurukelas("akreditasi");
    tandaklikakreditas = 1
    // document.querySelector(".tabbutir1").click();
    // document.getElementById("loadingambildataakreditasitersimpan").innerHTML = "";





}

function kriteriakareditasi(evt, cityName) {
    if (akreditasitersimpan.length == 0) {
        alert("Data file Akreditasi belum siap. Silakan coba lagi.")
        return
    }
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("kontentabbutir");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tabtabbutir");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" activee", "");

    }


    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " activee";

    let angkaid = cityName.match(/(\d+)/)[0];

    let idfilejson = dataketeranganakreditasi.filter(k => k["NO BUTIR"] == angkaid);
    let dataapiakreditasi = [];
    let cekdataapiakreditasi = akreditasitersimpan.filter(k => k.butir == angkaid).length;
    if (cekdataapiakreditasi == 0) {

        for (a = 0; a < idfilejson.length; a++) {
            let obj = {}
            obj.linkfile = "";
            dataapiakreditasi.push(obj);
        }
    } else {
        dataapiakreditasi = akreditasitersimpan.filter(k => k.butir == angkaid);
    }


    let namaid = "divindikatorbutir" + angkaid;
    let namaidkriteria = "divkriteriatelaahdokumenbutir" + angkaid;
    let divindikator = document.getElementById(namaid);
    let divkriteria = document.getElementById(namaidkriteria);
    let namaSNP = ['', 'SKL', 'ISI', 'PROSES', 'PENILAIAN', 'PTK', 'SARPRAS', 'PENGELOLAAN', 'PEMBIAYAAN'];



    divindikator.innerHTML = `<h5> INDIKATOR:</h5>
    <div class="w3-padding w3-card-4">
    ${idfilejson[0]["INDIKATOR"]}
    </div>
    <h5> SUB INDIKATOR:</h5>
    <div class="w3-padding w3-card-4">
    ${idfilejson[0]["SUB INDIKATOR"]}
    </div>
    <h5>STANDAR NASIONAL PENDIDIKAN</h5>
    <div class="w3-padding w3-card-4">
    SNP KE-${idfilejson[0]["SNP"]}
    
    </div>
    <hr/>
    <hr/>
    `;
    let htmlteks = `
    KRITERIA DAN TELAAH DOKUMEN
    <table class="versi-table" id="tabelkriteriadantelaahdokumen${angkaid}">
    <thead>
    <tr>
        <th>No.</th>
        <th>Kriteria</th>
        <th>Telaah Dokumen</th>
        <th>Tagihan</th>
        <th>Link Dokumen</th>
        <th>Aksi</th>
        </thead><tbody>
    </tr>
    `;

    for (j = 0; j < idfilejson.length; j++) {
        //butir;


        htmlteks += `
        <tr>
        <td>${j + 1}</td>
        <td>${idfilejson[j]["KRITERIA"]}</td>
        <td>${idfilejson[j]["TELAAH DOKUMEN "]}</td>
        <td>${idfilejson[j]["KETERANGAN"]}</td>
        
        <td>${dataapiakreditasi[j].linkfile}</td>
        <td>
        <button class="w3-green w3-tiny" onclick="uploaditemakreditasi(${angkaid},${j},${idfilejson[j]["SNP"]})"> + Item</button>
        <button class="w3-red w3-tiny" onclick="hapusselini(${angkaid},${j})"> Hapus</button>
        </td>
        </tr>
        `;
    }
    htmlteks += `</tbody></table>
    <button class="wa btnsimpanakreditasi" onclick="simpanserverdataakreditasi(${angkaid})"><i class="fa fa-save"></i> SIMPAN KE SERVER</button>
    <button class="wa" onclick="simpanexcelbutirini(${angkaid})"><i class="fa fa-download"></i> DOWNLOD FILE EXCEL</button>
    <button class="wa" onclick="printdataakreditasi(${angkaid})"><i class="fa fa-print"></i> PRINT </button>`;
    divkriteria.setAttribute("style", "overflow-x:auto")
    divkriteria.innerHTML = htmlteks
}

const uploaditemakreditasi = (btr, rtbl, snp) => {
    let divpranala = document.getElementById("pranalauploaditem");
    let divdata = document.getElementById("datauploaditem");
    divpranala.innerHTML = "";
    divdata.innerHTML = "";
    document.querySelector('#btnuploaditem').files[0] = "";

    let el = document.getElementById("uploadfileakreditasi")
    el.style.display = "block";
    let elbtn = document.getElementById("btnuploaditem");
    elbtn.removeAttribute("onchange");
    elbtn.setAttribute("onchange", `onCnguploaditem(${btr},${rtbl},${snp})`);
    // nanti setiap kali loading data lainnya, tombol copycode juga gitu.l

    let divt = document.getElementById("divtabelkoleksilink");
    divt.innerHTML = "";
    fetch(linktendik + "?action=getlinkitem").then(m => m.json())
        .then(r => {
            let tbl = document.createElement("table");
            tbl.setAttribute("class", "w3-table-all w3-small")
            let thd = tbl.createTHead();
            let th = thd.insertRow(-1);
            let sh = th.insertCell(-1);
            sh.innerHTML = "No";
            sh = th.insertCell(-1);
            sh.innerHTML = "Nama File";
            sh = th.insertCell(-1);
            sh.innerHTML = "SNP";
            sh = th.insertCell(-1);
            sh.innerHTML = "Preview";
            sh = th.insertCell(-1);
            sh.innerHTML = "Aksi";

            let tb = tbl.createTBody()
            let data = r.result;
            for (i = 0; i < data.length; i++) {
                let lr = tb.insertRow(-1);
                let sel = lr.insertCell(-1)
                sel.innerHTML = i + 1;
                sel = lr.insertCell(-1);
                sel.innerHTML = data[i].namafile;
                sel = lr.insertCell(-1);
                sel.innerHTML = data[i].snp;
                sel = lr.insertCell(-1);
                sel.innerHTML = `<button class="w3-btn w3-tiny w3-blue" onclick='window.open("${data[i].urlfile}","","width=720,height=600")'><i class="fa fa-eye"></i></button>`;
                sel = lr.insertCell(-1);
                sel.innerHTML = `<button class="w3-button w3-green w3-tiny" onclick="tambahkankesel(${btr},${rtbl},'${data[i].namafile}', '${data[i].urlfile}')">Tambahkan</button>`;//data[i].butir;


            }
            divt.appendChild(tbl)
        })


}

const onCnguploaditem = (btr, r, snp) => {
    pranalauploaditem.innerHTML = "";
    datauploaditem.innerHTML = "";


    //get the image selected
    var item = "";
    item = document.querySelector('#btnuploaditem').files[0];


    //create a FileReader
    var reader = new FileReader();

    //image turned to base64-encoded Data URI.
    reader.readAsDataURL(item);
    reader.name = item.name;//get the image's name
    reader.size = item.size; //get the image's size
    reader.onload = function (event) {
        let mmtpe = event.target.result.match(/^.*(?=;)/)[0];


        var srcEncoded = event.target.result;


        pranalauploaditem.innerHTML = "";
        let di = document.createElement("div");
        di.setAttribute("class", "containerbaru w3-center")
        if (mmtpe.indexOf("application/vnd") > -1) {

            ifr = document.createElement("div");
            ifr.setAttribute("class", "responsive-iframebaru w3-xxxlarge w3-center");

            ifr.innerHTML = "PRATINJAU TIDAK TERSEDIA <br/> <br/> File Tidak Dikenal <br/> Mengunggahnya akan menjadi link download.";
            di.appendChild(ifr);
            pranalauploaditem.appendChild(di);
        } else {
            let ifr = document.createElement("iframe");
            ifr.setAttribute("class", "responsive-iframebaru")
            ifr.setAttribute("src", srcEncoded);
            di.appendChild(ifr);
            pranalauploaditem.appendChild(di)

        }
        pranalauploaditem.innerHTML += "<hr/>";

        var inputbase64 = document.createElement("input");
        inputbase64.setAttribute("name", "videodataa");
        inputbase64.setAttribute("id", "videodataa");
        inputbase64.value = srcEncoded.replace(/^.*,/, '');
        // inputbase64.setAttribute("style", "display:none");

        var inputfilename = document.createElement("input");
        inputfilename.setAttribute("name", "videofilenamee");
        inputfilename.setAttribute("id", "videofilenamee");
        // inputfilename.setAttribute("style", "display:none");
        inputfilename.value = "butir_" + btr + "_kriteria_" + r + "_";

        var inputmimetype = document.createElement("input");
        inputmimetype.setAttribute("name", "videomimeTypee")
        inputmimetype.setAttribute("id", "videomimeTypee")
        // inputmimetype.setAttribute("style", "display:none")

        inputmimetype.value = srcEncoded.match(/^.*(?=;)/)[0];;//"data:image/jpeg"; 


        datauploaditem.appendChild(inputbase64);
        datauploaditem.appendChild(inputfilename);
        datauploaditem.appendChild(inputmimetype);
        let teks1 = document.createTextNode("Data siap upload. Klik tombol ini ")
        datauploaditem.appendChild(teks1);
        let tmbl = document.createElement("button",);
        tmbl.setAttribute("class", "w3-black w3-button w3-hover-blue  w3-tiny w3-round-xxlarge");
        tmbl.setAttribute("onclick", `uplitemakeditasi(${btr},${r}, ${snp})`);
        tmbl.innerHTML = "Upload ke Server"

        datauploaditem.append(tmbl);

    }
    //daftarvideo();

}
const uplitemakeditasi = async (btr, indexrow, snp) => {
    let ketval = document.getElementById("masukannamafileitem").value;
    let gmbrdata, gmbrfilename, gmbrmimeType;
    gmbrdata = document.getElementById("videodataa");
    gmbrfilename = document.getElementById("videofilenamee");
    let val = (ketval == "") ? gmbrfilename.value : ketval;
    gmbrmimeType = document.getElementById("videomimeTypee");

    if (gmbrdata == null && gmbrfilename == null && gmbrmimeType == null) {
        alert("Anda belum siap mengupload video/file lainnya ke server");
        return
    }


    //console.log("Data OKE");


    let frmdata = new FormData();
    frmdata.append("videodataa", gmbrdata.value);
    frmdata.append("videofilenamee", gmbrfilename.value);
    frmdata.append("videomimeTypee", gmbrmimeType.value);
    frmdata.append("namafileitem", val);
    frmdata.append("butir", btr);
    frmdata.append("indekkriteria", indexrow);
    frmdata.append("snp", snp);

    let div = document.getElementById("datauploaditem");
    div.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;

    await fetch(linktendik + "?action=uploadkriteriaitem", {
        method: 'post',
        body: frmdata
    })
        .then(m => m.json())
        .then(k => {
            console.log(k)
            alert(k.result)
            let link = k.urlfile;
            let namafile = k.namafile;
            div.innerHTML = `<button class="w3-button w3-green" onclick="tambahkankesel(${btr}, ${indexrow},'${namafile}', '${link}')">Tambahkan ke Tabel</button>`
            //datalinkitem()

            ///--------------------------------------------          
        })
        .catch(er => alert(er))


}

const tambahkankesel = (btr, indek, namafile, link) => {
    let eltabel = document.querySelector("#tabelkriteriadantelaahdokumen" + btr).getElementsByTagName("tbody")[0];
    eltabel.rows[parseInt(indek)].cells[4].innerHTML += `<a style="cursor:pointer"  onclick='window.open("${link}","","width=720,height=600")'>${namafile}</a><br/>`;
    let mod = document.getElementById("uploadfileakreditasi");
    mod.style.display = "none";
}

const simpanserverdataakreditasi = (angkaid) => {
    //alert(angkaid);
    let btn = document.querySelector(".btnsimpanakreditasi");
    btn.innerHTML = "<i class='fa fa-spin fa-spinner w3-large'></i>";
    let tb = "";
    tb = document.getElementById("tabelkriteriadantelaahdokumen" + angkaid).getElementsByTagName("tbody")[0];
    let lr = tb.rows;
    let all = []
    for (r = 0; r < lr.length; r++) {
        let perbaris = lr[r];
        let isi = []
        // for (s = 0; s < perbaris.cells.length; s++) {
        let d = perbaris.cells[4].innerHTML;

        //------------ butir
        isi.push(angkaid);
        isi.push(r);
        isi.push(d);

        all.push(isi)
    }

    let data = JSON.stringify(all);
    let dataform = new FormData();
    dataform.append("butir", angkaid);
    dataform.append("tabel", data);
    //console.log(all)
    fetch(linktendik + "?action=simpandataakreditasi", {
        method: "post",
        body: dataform
    }).then(m => m.json())
        .then(k => {
            alert(k.result);
            btn.innerHTML = `<i class="fa fa-save"></i> SIMPAN KE SERVER`;
        })
        .catch(er => alert(er))
}

function hapusselini(id, r) {

    let table = document.getElementById("tabelkriteriadantelaahdokumen" + id).getElementsByTagName("tbody")[0];
    console.log(table)
    table.rows[r].cells[4].innerHTML = "";
}

const getDataAkreditasi = () => {
    // const kurikulum = () => {
    fetch(linktendik + "?action=getDataSimpanAkreditasi")
        .then(m => m.json())
        .then(k => {
            console.log(k);
            akreditasitersimpan = k.result;
            document.getElementById("loadingambildataakreditasitersimpan").innerHTML = "";
            if (tandaklikakreditas == 1) {
                document.querySelector(".tabbutir1").click();
                tandaklikakreditas = 0
            }
        })
        .catch(er => {
            alert(er);
            akreditasitersimpan = [];
        })
}

const simpanexcelbutirini = (idtabel) => {
    let namatabel = document.getElementById("tabelkriteriadantelaahdokumen" + idtabel);
    let ketakre = dataketeranganakreditasi.filter(k => k["NO BUTIR"] == idtabel);
    let namaSNP = ['', 'SKL', 'ISI', 'PROSES', 'PENILAIAN', 'PTK', 'SARPRAS', 'PENGELOLAAN', 'PEMBIAYAAN'];
    // var datasiswadiv = document.getElementById("datasiswaprint");
    var datasiswadiv = document.getElementById("datasiswaprint");

    let tbl = document.createElement("table");
    tbl.setAttribute("class", "versi-table");
    tbl.setAttribute("id", "tabelprintakreditasi");
    //baris 1
    let tb = tbl.insertRow(0);
    let sel = tb.insertCell(-1);
    sel.setAttribute("colspan", 6);
    sel.innerHTML = "DATA ADMINISTRASI AKREDITASI BUTIR KE-" + idtabel;
    // tb = tbl.insertRow(0);
    // tb = tbl.insertRow(0);
    //baris 2
    tb = tbl.insertRow(-1);
    sel = tb.insertCell(-1);
    sel.setAttribute("colspan", 6);
    sel.innerHTML = idNamaSekolah.toUpperCase() + " KOTA " + jlo.kota.toUpperCase();

    //baris 3
    tb = tbl.insertRow(-1);
    for (i = 0; i < 6; i++) {
        sel = tb.insertCell(-1)
    }
    //baris 4
    tb = tbl.insertRow(-1);
    for (i = 0; i < 6; i++) {
        sel = tb.insertCell(-1)
    }
    //baris 5
    tb = tbl.insertRow(-1);
    for (i = 0; i < 6; i++) {
        sel = tb.insertCell(-1)
    }


    //baris 6
    tb = tbl.insertRow(-1);
    sel = tb.insertCell(-1)
    sel.setAttribute("colspan", 6);
    sel.innerHTML = "INDIKATOR :"
    // for (i = 0; i < 3; i++) {
    //     sel = tb.insertCell(-1)
    // }

    tb = tbl.insertRow(-1);
    sel = tb.insertCell(-1);
    sel.setAttribute("colspan", 6);
    sel.innerHTML = ketakre[0]["INDIKATOR"];

    tb = tbl.insertRow(-1);
    for (i = 0; i < 6; i++) {
        sel = tb.insertCell(-1)
    }



    tb = tbl.insertRow(-1);
    sel = tb.insertCell(-1)
    sel.setAttribute("colspan", 6);
    sel.innerHTML = "SUB INDIKATOR :"
    // for (i = 0; i < 3; i++) {
    //     sel = tb.insertCell(-1)
    // }
    tb = tbl.insertRow(-1);
    sel = tb.insertCell(-1);
    sel.setAttribute("colspan", 6);
    sel.innerHTML = ketakre[0]["SUB INDIKATOR"];

    tb = tbl.insertRow(-1);
    for (i = 0; i < 6; i++) {
        sel = tb.insertCell(-1)
    }
    tb = tbl.insertRow(-1);
    sel = tb.insertCell(-1)
    sel.setAttribute("colspan", 6);
    sel.innerHTML = "STANDAR NASIONAL PENDIDIKAN KE-:"
    // for (i = 0; i < 3; i++) {
    //     sel = tb.insertCell(-1)
    // }
    tb = tbl.insertRow(-1);
    sel = tb.insertCell(-1);
    sel.setAttribute("colspan", 6);
    let teksSNP = ketakre[0]["SNP"];
    let inSNP = parseInt(teksSNP)
    sel.innerHTML = "SNP Ke-" + teksSNP + "  (" + namaSNP[inSNP] + ")";

    tb = tbl.insertRow(-1);
    for (i = 0; i < 6; i++) {
        sel = tb.insertCell(-1);
    }
    tb = tbl.insertRow(-1);
    for (i = 0; i < 6; i++) {
        sel = tb.insertCell(-1);
    }

    tb = tbl.insertRow(-1);
    sel = tb.insertCell(-1);
    sel.setAttribute("colspan", 6);
    sel.innerHTML = "KRITERIA DAN TELAAH DOKUMEN";
    // for (i = 0; i < 3; i++) {
    //     sel = tb.insertCell(-1);
    // }

    // tb = tbl.insertRow(-1);
    // for (i = 0; i < 6; i++) {
    //     sel = tb.insertCell(-1);
    // }    // tb = tbl.insertRow(-1);
    // for (i = 0; i < 6; i++) {
    //     sel = tb.insertCell(-1);
    // }

    let brstabel = namatabel.rows.length
    for (a = 0; a < brstabel; a++) {
        tb = tbl.insertRow(-1);

        let isi = namatabel.rows[a].cells.length - 1;
        for (b = 0; b < isi; b++) {

            sel = tb.insertCell(-1);
            sel.innerHTML = namatabel.rows[a].cells[b].innerHTML;

        }
        if (a == 0) {
            sel = tb.insertCell(-1)
            sel.innerHTML = "Keterangan";
        } else {
            sel = tb.insertCell(-1)
            sel.innerHTML = "";

        }
    }


    // <div class="w3-padding w3-card-4">
    // ${idfilejson[0]["INDIKATOR"]}
    // </div>
    // <h5> SUB INDIKATOR:</h5>
    // <div class="w3-padding w3-card-4">
    // ${idfilejson[0]["SUB INDIKATOR"]}
    // </div>
    // <h5>STANDAR NASIONAL PENDIDIKAN</h5>
    // <div class="w3-padding w3-card-4">
    // SNP KE-${idfilejson[0]["SNP"]}

    datasiswadiv.innerHTML = "";
    datasiswadiv.appendChild(tbl)

    $("#tabelprintakreditasi").table2excel({

        name: "Worksheet Name",
        filename: "Data Akreditasi Butir ke-" + idtabel + "  idfile " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 1,
        barisatas: 16

    });
    datasiswadiv.innerHTML = "";

}

const printdataakreditasi = (butir) => {
    let isibody = "";
    isibody = `<h3 class="w3-center">DATA ADMINISTRASI AKREDITASI BUTIR KE-${butir}</h3>`;
    isibody += `<h3 class="w3-center">${idNamaSekolah.toUpperCase()} KOTA ${jlo.kota.toUpperCase()}</h1>`
    isibody += document.getElementById("divindikatorbutir" + butir).innerHTML;
    isibody += "KRITERIA DAN TELAAH DOKUMEN";
    // let tabsourc = document.getElementById("tabelkriteriadantelaahdokumen" + butir).outerHTML;
    // for(i=0;i<tabsourc;i++){

    // }
    isibody += document.getElementById("tabelkriteriadantelaahdokumen" + butir).outerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO AKREDITASI</title>`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link href="https://fonts.googleapis.com/css?family=Raleway">`;
    head.innerHTML += `<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>`;
    head.innerHTML += `<style type="text/css">
    .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}
    </style>`;

    head.innerHTML += `<style type="text/css" media="print">
    @media print {
        html,body{height:100%;width:100%;margin:0;padding:0}
        
         @page {
            size: A4 portrait;
            max-height:100%;
            max-width:100%;
            
            }
    }
    </style>`;

    body.innerHTML = isibody;
    body.innerHTML += '<br/><div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ',' + tanggalfull(new Date()) + '<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><b><u>' + idNamaKepsek + '</u></b><br/>NIP. ' + idNipKepsek + '</div>';

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}

const absensisiswa = () => {
    tampilinsublamangurukelas("kesiswaan");
    document.querySelector(".tabkesiswaan1").click();
    let div = document.querySelector(".face_divdatabasesiswa");
    let arr = JSON.parse(localStorage.getItem("datasiswa_all"))["datasiswa"];
    let html = `<table class="versi-table w3-tiny tabel_db_siswa"><thead>
        <tr>
            <th rowspan="2">Status</th>
            <th rowspan="2">No Urut</th>
            <th rowspan="2">ID Token</th>
            <th colspan="2">Jenjang dan Rombel</th>
            <th colspan="4">Penomoran</th>
            <th rowspan="2">Nama Siswa</th>
            <th rowspan="2">Jenis Kelamin</th>
            <th colspan="2">Tempat Tanggal Lahir</th>
            <th rowspan="2">Agama</th>
            <th colspan="2">Data Orang Tua</th>
            <th rowspan="2">Alamat</th>
            <th rowspan="2">No Handphone</th>
            <th rowspan="2">Aksi</th>
            
            </tr>
            <tr>
            
            
                    <th>Jenjang</th>
                    <th>Rombel</th>
        
        <th>NIS</th>
        <th>NISN</th>
        <th>NIK</th>
        <th>No KK</th>
        <th>Tempat</th>
        <th>Tanggal Lahir</th>

        <th>Nama Ayah</th>
        <th>Nama Ibu</th>
        </tr>
      
    </thead>
    <tbody>`;
    for (i = 0; i < arr.length; i++) {
        let tls = (arr[i].pd_tanggallahir == "") ? "" : tanggalfull(arr[i].pd_tanggallahir);
        html += `<tr>
            <td contenteditable="true">${arr[i].aktif}</td>
            <td>${i + 1}</td>
            <td>${arr[i].id}</td>
            <td contenteditable="true">${arr[i].jenjang}</td>
            <td contenteditable="true">${arr[i].nama_rombel}</td>
            <td contenteditable="true">${arr[i].nis}</td>
            <td contenteditable="true">${arr[i].nisn}</td>
            <td contenteditable="true">${arr[i].nik}</td>
            <td contenteditable="true">${arr[i].nokk}</td>
            <td contenteditable="true">${arr[i].pd_nama}</td>
            <td contenteditable="true">${arr[i].pd_jk}</td>
            <td contenteditable="true">${arr[i].pd_tl}</td>
            <td contenteditable="true" onclick="edittanggalsiswa('${i}','12')">${tls}</td>
            <td contenteditable="true">${arr[i].pd_agama}</td>
            <td contenteditable="true">${arr[i].pd_namaayah}</td>
            <td contenteditable="true">${arr[i].pd_namaibu}</td>
            <td contenteditable="true">${arr[i].pd_alamat}</td>
            <td contenteditable="true">${arr[i].pd_hp}</td>
                <td>
                    <button onclick="editsiswa('${i}')" title="Simpan Perubahan" class="w3-button w3-green"><i class="fa fa-save"></i></button>
                    <button onclick="hapussiswa('${arr[i].id}')" title="Hapus Siswa Ini" class="w3-button w3-red"><i class="fa fa-trash"></i></button>
                
                </td>
                
            </tr>`;

    }
    html += `</tbody></table>`
    div.innerHTML = html;
    // console.log(dbaktif);
    document.querySelector(".status_divdatabasesiswa").innerHTML = "Database Aktif Sekolah Anda Saat Ini";
}

const tambahkriteria = () => {
    let div = document.querySelector(".sortirsortir");
    let array = ["id",
        "jenjang", "nama_rombel", "nis", "nisn", "nik",
        "nokk", "pd_nama", "pd_jk", "pd_tl", "pd_tanggallahir",
        "pd_agama", "pd_namaayah", "pd_namaibu",
        "pd_alamat", "pd_hp", "aktif"];
    let arrayArti = ["Kode Token",
        "Jenjang", "Rombel", "NIS", "NISN", "NIK",
        "No Kartu Keluarga", "Nama Siswa", "Jenis Kelamin", "Tempat Lahir", "Tanggal Lahir",
        "Agama Siswa", "Nama Ayah", "Nama Ibu",
        "Alamat", "No HP", "Aktif"];
    //cari array
    let divcari = document.querySelectorAll(".kriteria_dinamis");
    for (i = 0; i < divcari.length; i++) {
        let el = divcari[i];
        let valueada = el.options[el.selectedIndex].value;
        //console.log(valueada);
        let indekada = array.indexOf(valueada);
        //console.log(indekada);
        array.splice(indekada, 1)
        arrayArti.splice(indekada, 1)
    }
    // console.log(array);
    if (array.length == 0) {
        alert("Sudah tidak ada kriteria lagi untuk dijadikan kriteria short");
        return;
    }
    let html = `
    <select class="w3-select w3-small w3-border w3-border-blue kriteria_dinamis" onchange="tambah_input_kriteria('${divcari.length + 1}')">
    `
    for (j = 0; j < array.length; j++) {
        if (j == 0) {
            html += `<option value='${array[j]}'  selected>${arrayArti[j]}  </option>`
        } else {
            html += `<option value='${array[j]}' >${arrayArti[j]}  </option>`
        }
    }
    html += `</select>
    <input class="w3-input w3-small w3-border w3-border-red classinputkriteria_${divcari.length + 1}" placeholder="Masukan nilai kriteria ${arrayArti[0]} yang ingin dicari"/>
    
    `;
    div.innerHTML += html;
    let elakhir = document.querySelectorAll(".kriteria_dinamis");
    let divhilang = document.querySelector(".hapus_dinamis")
    if (elakhir.length >= 2) {
        divhilang.className = divhilang.className.replace("w3-hide", "w3-show");
    } else {
        divhilang.className = divhilang.className.replace("w3-show", "w3-hide");

    }
    //onsole.log(elakhir.length)
}

const tambah_input_kriteria = (id) => {
    let indek = id - 1;
    let elselect = document.querySelectorAll(".kriteria_dinamis")[indek]
    let opp = elselect.options;
    let sel = elselect.selectedIndex;

    let div = document.querySelector(".classinputkriteria_" + id);
    div.placeholder = `Masukan nilai kriteria ${opp[sel].text} yang ingin dicari`;
}
const hapuskriteria = () => {
    let elakhir = document.querySelectorAll(".kriteria_dinamis");
    let inputakhir = document.querySelector(".classinputkriteria_" + elakhir.length)
    inputakhir.remove();
    elakhir[elakhir.length - 1].remove();
    let afakhir = document.querySelectorAll(".kriteria_dinamis");
    // console.log(afakhir.length);
    let elini = document.querySelector(".hapus_dinamis");
    if (afakhir.length === 1) {
        elini.className = elini.className.replace("w3-show", "w3-hide")
    }

}
const carikriteria = () => {
    let sel1 = document.querySelectorAll(".kriteria_dinamis")[0];
    let sel1_ops = sel1.options;
    let sel1_selected = sel1.selectedIndex;
    let vv = sel1_ops[sel1_selected].value;
    let vT = sel1_ops[sel1_selected].text;
    let tbdy = document.querySelector(".tabel_db_siswa").getElementsByTagName("tbody")[0];
    let arrb = [];
    let arr = [];
    if (vv == "aktif") {
        arrb = JSON.parse(localStorage.getItem("datasiswa_all"))["datasiswa"]
    } else {
        arrb = JSON.parse(localStorage.getItem("datasiswatidakaktif"))["datasiswa"]

    }
    let html = "";
    let krit_n = "";
    let nil_k = "";
    let i_ind = "";

    let prm_filter = "";
    // let plh_krit = document.querySelectorAll(".kriteria_dinamis");
    let plh_krit = document.getElementsByClassName("kriteria_dinamis");
    if (plh_krit.length == 1) {
        prm_filter = vT;
        arr = arrb;
    } else {
        prm_filter = vT;
        for (a = 1; a < plh_krit.length; a++) {
            let ops = plh_krit[a].options;
            let slctd = plh_krit[a].selectedIndex;
            krit_n = ops[slctd].value;
            let krit_t = ops[slctd].text;
            i_ind = (a + 1);
            nil_k = document.querySelector(".classinputkriteria_" + i_ind).value;
            prm_filter += `, ${krit_t} = ${nil_k}`;
            arr = arrb.filter(k => k[krit_n] == nil_k);


            arrb = arr;
            //a++
        }
        //while (a < arrb.length)
    }
    //    console.log(arr)

    if (arr.length == 0) {
        html += `<tr>
        <td class="w3-red" colspan="19"> Anda tidak memiliki database dengan kriteria ${prm_filter} </td>
        </tr>`;
    } else {
        for (i = 0; i < arr.length; i++) {
            let tls = (arr[i].pd_tanggallahir == "") ? "" : tanggalfull(arr[i].pd_tanggallahir);
            html += `<tr>
            <td contenteditable="true">${arr[i].aktif}</td>
            <td>${i + 1}</td>
            <td>${arr[i].id}</td>
            <td contenteditable="true">${arr[i].jenjang}</td>
            <td contenteditable="true">${arr[i].nama_rombel}</td>
            <td contenteditable="true">${arr[i].nis}</td>
            <td contenteditable="true">${arr[i].nisn}</td>
            <td contenteditable="true">${arr[i].nik}</td>
            <td contenteditable="true">${arr[i].nokk}</td>
            <td contenteditable="true">${arr[i].pd_nama}</td>
            <td contenteditable="true">${arr[i].pd_jk}</td>
            <td contenteditable="true">${arr[i].pd_tl}</td>
            <td contenteditable="true" onclick="edittanggalsiswa('${i}','12')">${tls}</td>
            <td contenteditable="true">${arr[i].pd_agama}</td>
            <td contenteditable="true">${arr[i].pd_namaayah}</td>
            <td contenteditable="true">${arr[i].pd_namaibu}</td>
            <td contenteditable="true">${arr[i].pd_alamat}</td>
            <td contenteditable="true">${arr[i].pd_hp}</td>
                <td>
                    <button onclick="editsiswa('${i}')" title="Simpan Perubahan" class="w3-button w3-green"><i class="fa fa-save"></i></button>
                    <button onclick="hapussiswa('${arr[i].id}')" title="Hapus Siswa Ini" class="w3-button w3-red"><i class="fa fa-trash"></i></button>

                </td>

            </tr>`;
        }
    }
    tbdy.innerHTML = html;
    document.querySelector(".status_divdatabasesiswa").innerHTML = "Database dalam bentuk pencarian berdasarkan kriteria: " + prm_filter;
};

const edittanggalsiswa = (r, c) => {
    //alert("Baris ke-" + r + "\n\n Kolom ke-" + c);
    modaltanggal.style.display = "block";
    let namatabel = document.querySelector(".tabel_db_siswa").getElementsByTagName('tbody')[0];
    let namaheader = "Tanggal Lahir";
    let tgl = formatbalikin(namatabel.rows[r].cells[c].innerHTML);
    let balikintanggal = StringTanggal(new Date(tgl));
    //let teks = "ini data headerr yang diklik adalah " + namaheader;

    let teks = "<h3 class='w3-center'>Ubah " + namaheader + "</h3>";
    teks += namatabel.rows[r].cells[9].innerHTML + "<hr/>";
    teks += `<input type="date" class="w3-input" id="valuetanggal" onchange="modalubahtanggal()" value="${balikintanggal}"/>`
    teks += `<hr/><span id="translettgl">${tanggalfull(tgl)}</span><hr/>`;
    teks += `<button onclick="tanggalokesiswa(${r},${c})">Simpan</button><hr/>`;
    teks += `<button onclick="hapustanggalsiswa(${r},${c})">Hapus</button><hr/>`;
    //

    dataubahtanggal.innerHTML = teks;
    //valuetanggal.value = balikintanggal;

}


const tanggalokesiswa = (r, c) => {
    let namatabel = document.querySelector(".tabel_db_siswa").getElementsByTagName('tbody')[0];;
    let kolomtahun;// = namatabel.rows[c].cells[15].innerHTML;
    let tanggal = document.getElementById("valuetanggal");
    //kolomtahun = namatabel.rows[c].cells[15].innerHTML;

    namatabel.rows[r].cells[c].innerHTML = tanggalfull(tanggal.value);



    tutupmodaltanggal.click();
}


const hapustanggalsiswa = (r, c) => {
    let namatabel = document.querySelector(".tabel_db_siswa").getElementsByTagName('tbody')[0];;
    namatabel.rows[r].cells[c].innerHTML = "";
}










async function editsiswa(y) {
    let konfirm = confirm("Apa Anda yakin ingin mengedit data siswa ini?\n\n Klik [OK] untuk mengedit\n\n Klik [CANCEL] untuk membatalkan");
    if (!konfirm) {
        return
    }
    new_loading.style.display = "block";
    let namatabel = document.querySelector(".tabel_db_siswa").getElementsByTagName('tbody')[0].rows[y];
    //let namaheader = namatabel.rows[0].cells[8].innerHTML;
    //alert(namaheader)
    let xid = namatabel.cells[2].innerHTML,
        xjenjang = namatabel.cells[3].innerHTML,
        xnama_rombel = namatabel.cells[4].innerHTML,
        xnis = namatabel.cells[5].innerHTML,
        xnisn = namatabel.cells[6].innerHTML,
        xnik = namatabel.cells[7].innerHTML,
        xnokk = namatabel.cells[8].innerHTML,
        xpdnama = namatabel.cells[9].innerHTML,
        xpdjk = namatabel.cells[10].innerHTML,
        xpdtl = namatabel.cells[11].innerHTML;
    let t = namatabel.cells[12].innerHTML;
    let dt = formatbalikin((t == "") ? "1 Juli 2019" : t);
    let xpdtgl = StringTanggal2(new Date(dt)),
        spdagama = namatabel.cells[13].innerHTML,
        spdayah = namatabel.cells[14].innerHTML,
        spdibu = namatabel.cells[15].innerHTML,
        spdalamat = namatabel.cells[16].innerHTML,
        spdhp = namatabel.cells[17].innerHTML,
        spdaktif = namatabel.cells[0].innerHTML,
        spdeditoleh = namauser;



    let data = new FormData();
    data.append("id", xid);
    data.append("jenjang", xjenjang);
    data.append("nama_rombel", xnama_rombel);
    data.append("nis", xnis);
    data.append("nisn", xnisn);
    data.append("nik", xnik);
    data.append("nokk", xnokk);
    data.append("pd_nama", xpdnama);
    data.append("pd_jk", xpdjk);
    data.append("pd_tl", xpdtl);
    data.append("pd_tanggallahir", xpdtgl);
    data.append("pd_agama", spdagama);
    data.append("pd_namaayah", spdayah);
    data.append("pd_namaibu", spdibu);
    data.append("pd_alamat", spdalamat);
    data.append("pd_hp", spdhp);
    data.append("aktif", spdaktif);
    data.append("dieditoleh", spdeditoleh);


    let aaa = linkDataUserWithIdss + "&action=editsiswa";
    await fetch(aaa, {
        method: "post",
        body: data
    }).then(m => m.json())
        .then(f => {

            alert(f);
            fetch(linkDataUserWithIdss + "&action=datakelasaktifall")
                .then(m => m.json())
                .then(k => {
                    jsondatasiswa = k.datasiswa;
                    localStorage.setItem("datasiswa_all", JSON.stringify(k));
                    alert('Database Berhasil Diperbaharui');
                }).catch(er => {
                    alert('terjadi kesalahan');
                    console.log(er)
                })


        })
        .catch(er => alert(er));
    new_loading.style.display = "none";
}
async function hapussiswa(id) {
    var konfirm = confirm("Siswa ini akan dihilangkan dari kelas Anda. \n \n Tapi data masih berada di database kami. \n \n Anda yakin ingin menghapusnya? id " + id)
    if (!konfirm) {
        return;
    }
    new_loading.style.display = "block";
    var url = linkDataUserWithIdss + "&action=hapussiswa";
    let data = new FormData();
    data.append("id", id);
    await fetch(url, {
        method: "post",
        body: data
    }).then(m => m.json())
        .then(s => {
            alert(s);

            fetch(linkDataUserWithIdss + "&action=datakelasaktifall")
                .then(m => m.json())
                .then(k => {
                    jsondatasiswa = k.datasiswa;
                    localStorage.setItem("datasiswa_all", JSON.stringify(k));
                    alert('Database Berhasil Diperbaharui');
                }).catch(er => {
                    alert('terjadi kesalahan');
                    console.log(er)
                })
            fetch(linkDataUserWithIdss + "&action=datasiswatidakaktif")
                .then(m => m.json())
                .then(kl => {
                    arraysiswatidakaktif = kl.datasiswa;
                    jumlahseluruhsiswadisekolah = kl.total
                    localStorage.setItem("datasiswatidakaktif", JSON.stringify(kl))


                }).catch(er => { console.log(er) })
        }).catch(er => console.log(er))
    new_loading.style.display = "none";
}

const exceldatabase = () => {
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    tabelhasil.setAttribute("class", "versi-table");
    tabelhasil.setAttribute("id", "myTableCopy");

    var tabeleditt = document.querySelector(".tabel_db_siswa");


    var cln = tabeleditt.cloneNode(true);
    tabelhasil.appendChild(cln);
    datasiswadiv.appendChild(tabelhasil);
    var tabeledithead = document.getElementById("myTableCopy").getElementsByTagName("thead")[0];
    //tabeledithead.rows[0].deleteCell(1);
    var identitasbulanrekap = "SEMESTER " + idSemester + " TAHUN PELAJARAN " + idTeksTapel;

    var tabeledit = document.getElementById("myTableCopy").getElementsByTagName("tbody")[0];
    let tesjumlahbaris = tabeledit.rows.length;
    console.log(tesjumlahbaris);
    // for (i = 0; i < tabeledit.rows.length; i++) {
    //     for (j = 0; j < tabeledit.rows[i].cells.length; j++) {

    //         let teks = tabeledit.rows[i].cells[j].innerHTML.replace("<br/>", "")
    //         let tekss = teks.replace("poto", "")
    //         tabeledit.rows[i].cells[j].innerHTML = tekss;

    //     };


    // }
    let countcol = tabeledit.rows[0].cells.length;
    let brs = tabeledithead.insertRow(0)
    let sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol);
    sel.setAttribute("style", "text-align:center");

    sel.innerHTML = "DATABASE SISWA " + idNamaSekolah.toUpperCase();

    brs = tabeledithead.insertRow(1)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol);
    sel.innerHTML = identitasbulanrekap.toUpperCase();

    brs = tabeledithead.insertRow(2)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol)

    //---------- TAMBAHKAN TANDA TANGAN

    //let cobatabel = tabeledit;// document.getElementById("myTableCopy");
    //let tabeledit = dat.getElementsByTagName("tbody")[0];
    let rowcount = tabeledit.rows.length;
    //console.log(rowcount)
    let colcount = tabeledit.rows[0].cells.length;
    countcol = tabeledit.rows[0].cells.length;


    brs = tabeledit.insertRow(rowcount)
    sel = brs.insertCell(-1)
    sel = brs.insertCell(-1) /// colom kedua ttd kepsek
    for (let a = 0; a < colcount - 7; a++) {
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
    }
    sel.setAttribute("colspan", 3);
    sel.innerHTML = "NIP. " + idNipKepsek;


    brs = tabeledit.insertRow(rowcount)
    sel = brs.insertCell(-1)
    sel = brs.insertCell(-1) /// colom kedua ttd kepsek
    for (let a = 0; a < colcount - 7; a++) {
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
    }
    sel.setAttribute("colspan", 3);
    sel.innerHTML = "<b><u>" + idNamaKepsek + "</u></b>";


    brs = tabeledit.insertRow(rowcount)
    brs = tabeledit.insertRow(rowcount)
    brs = tabeledit.insertRow(rowcount)

    brs = tabeledit.insertRow(rowcount)
    sel = brs.insertCell(-1);
    sel = brs.insertCell(-1) /// colom kedua ttd kepsek
    for (let a = 0; a < colcount - 7; a++) {
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
    }
    sel.setAttribute("colspan", 3);
    sel.innerHTML = "Kepala " + idNamaSekolah;



    brs = tabeledit.insertRow(rowcount)
    sel = brs.insertCell(-1)
    sel = brs.insertCell(-1) /// colom kedua ttd kepsek
    for (let a = 0; a < colcount - 7; a++) {
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
    }
    sel.setAttribute("colspan", 3);
    sel.innerHTML = jlo.kota + ", " + tanggalfull(new Date())


    brs = tabeledit.insertRow(rowcount)






    $("#myTableCopy").table2excel({
        name: idNamaSekolah,
        filename: "Database Siswa" + " ID FILE " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_judul: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 3,
        barisatas: 3,
        tabelmana: tesjumlahbaris
    });
    datasiswadiv.innerHTML = "";
}

const printdatabase = () => {

    let isibody = document.querySelector(".face_divdatabasesiswa").outerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO DATABASE SISWA</title>`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link href="https://fonts.googleapis.com/css?family=Raleway">`;
    head.innerHTML += `<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>`;
    head.innerHTML += `<style type="text/css">
    .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}
    </style>`;

    head.innerHTML += `<style type="text/css" media="print">
    @media print {
        html,body{height:100%;width:100%;margin:0;padding:0}
        
         @page {
            size: A4 landscape;
            max-height:100%;
            max-width:100%;
            
            }
    }
    </style>`;

    body.innerHTML = "<h4 class='w3-center'>DATABASE SISWA " + idNamaSekolah.toUpperCase() + "</h3>";
    body.innerHTML += "<h4 class='w3-center'>SEMESTER " + idSemester + " TAHUN PELAJARAN " + idTeksTapel + "</h3>";
    body.innerHTML += isibody;
    body.innerHTML += '<br/><div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ',' + tanggalfull(new Date()) + '<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><b><u>' + idNamaKepsek + '</u></b><br/>NIP. ' + idNipKepsek + '</div>';

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}
const printdaftarsatu = () => {

    let isibody = document.querySelector("#htmldaftar2").outerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO DAFTAR 2</title>`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link rel="stylesheet" href="/css/w3.css">`;
    head.innerHTML += `<link rel="stylesheet" href="/css/stylegurukelas.css">`;
    head.innerHTML += `<link href="https://fonts.googleapis.com/css?family=Raleway">`;
    head.innerHTML += `<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>`;
    head.innerHTML += `<style type="text/css">
    .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}
    .garis td,.garis th,.garis tr{border:1px solid #000}.garis th{border:1px solid #000;text-align:center;vertical-align:middle}
    </style>`;

    head.innerHTML += `<style type="text/css" media="print">
    @media print {
        html,body{height:100%;width:100%;margin:0;padding:0}
        
         @page {
            size: A4 landscape;
            max-height:100%;
            max-width:100%;
            
            }
    }
    </style>`;

    body.innerHTML = isibody;


    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}

let daftarsatu = document.querySelector(".tabkesiswaan2");
daftarsatu.addEventListener('click', function () {
    let div = document.getElementById("divdaftar2");
    let html = `            <div class="w3-border w3-border-blue w3-padding">Sub Menu:
    <button class="w3-button w3-teal w3-round" title="Print Laman ini" onclick="printdaftarsatu()"><i
            class="fa fa-print"></i></button>
</div>
<h3>Daftar 1 (Bagian 2)</h3>
<div id="htmldaftar2" style="overflow-x: auto;font-size: 10px;border:.5pt solid black;padding:2px">
    <b>PEMERINTAH DAERAH KOTA DEPOK</b><br />
    <b>DINAS PENDIDIKAN KOTA DEPOK</b><br />
    <b>KECAMATAN CIPAYUNG</b><br />
    <b>LAPORAN BULANAN</b><br />
    <div>
        <div class="w3-left">
            <table>
                <tr>
                    <td>Keadaan Tanggal</td>
                    <td>:</td>
                    <td contenteditable="true" class="df1_1 w3-border w3-border-black  w3-padding-small">
                       ${tanggalfull(new Date())}
                    </td>
                </tr>
            </table>
        </div>
        <div class="w3-left" style="width: 10%;color:white">&bnsp;</div>
        <div class="w3-left">
            <table>
                <tr>
                    <td>KODE SEKOLAH</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small"
                        colspan="4">000</td>
                </tr>
                <tr>
                    <td>NAMA SEKOLAH</td>
                    <td>:</td>
                    <td contenteditable="true" class="df1_2 w3-border w3-border-black  w3-padding-small"
                        colspan="4">${idNamaSekolah.toUpperCase()}
                    </td>
                </tr>
                <tr>
                    <td>NIS/NSS/NPSN</td>
                    <td>:</td>
                    <td contenteditable="true" class="df1_2 w3-border w3-border-black  w3-padding-small"
                        colspan="4">000000
                    </td>
                </tr>
                <tr>
                    <td>STATUS SEKOLAH</td>
                    <td>:</td>
                    <td contenteditable="true" class="df1_2 w3-border w3-border-black  w3-padding-small">
                        NEGERI
                    </td>
                    <td>AKREDITASI</td>
                    <td>:</td>
                    <td contenteditable="true" class="df1_2 w3-border w3-border-black  w3-padding-small">A
                    </td>
                </tr>
            </table>
        </div>

        <div class="w3-right ">
            <table>
                <tr>
                    <td>Tahun Pendirian</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black" style="padding:5px"
                        colspan="3">1900</td>
                </tr>
                <tr>
                    <td>No Ijin Operasional</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black" style="padding:5px">
                        1987</td>
                    <td>Tanggal</td>
                    <td contenteditable="true" class="w3-border w3-border-black" style="padding:5px">
                        1900</td>
                </tr>
                <tr>
                    <td>Alamat: Jln/Kmp.</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black" style="padding:5px"
                        colspan="3">1987</td>
                </tr>
                <tr>
                    <td>Kelurahan</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black" style="padding:5px">
                        Depok</td>
                    <td>RT/RW</td>
                    <td contenteditable="true" class="w3-border w3-border-black" style="padding:5px">
                        01/01</td>
                </tr>
                <tr>
                    <td>Telepon</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black" style="padding:5px">
                        00000</td>
                    <td>Email</td>
                    <td contenteditable="true" class="w3-border w3-border-black" style="padding:5px">
                        ${jlo.surel}</td>
                </tr>
            </table>
        </div>
    </div>

    <div class="w3-clear">
        <b>A. KEADAAN MURID</b>
        <table class="w3-table garis">
            <thead class="w3-light-gray">
                <tr>
                    <th rowspan="3">TINGKAT</th>
                    <th rowspan="3">JML ROM BEL</th>
                    <th rowspan="2" colspan="3">KEADAAN AWAL BULAN</th>
                    <th rowspan="2" colspan="2">KELUAR BULAN INI</th>
                    <th rowspan="2" colspan="2">MASUK BULAN INI</th>
                    <th rowspan="2" colspan="3">KEADAAN AKHIR BULAN</th>
                    <th colspan="7">ALASAN KELUAR</th>
                    <th colspan="7">UMUR SISWA</th>
                    <th colspan="13">SISWA MENURUT AGAMA</th>
                    <th colspan="4">KEWARGANEGARAAN</th>
                </tr>
                <tr>
                    <th colspan="2">Pindah</th>
                    <th colspan="2">DO</th>
                    <th colspan="2">Lulus / Lainnya</th>
                    <th rowspan="2">JML</th>

                    <th colspan="2">&le;6Th</th>
                    <th colspan="2">7-12Th</th>
                    <th colspan="2">&ge;13Th</th>
                    <th rowspan="2">JML</th>

                    <th colspan="2">ISLAM</th>
                    <th colspan="2">KRISTEN</th>
                    <th colspan="2">KATOLIK</th>
                    <th colspan="2">HINDU</th>
                    <th colspan="2">BUDHA</th>
                    <th colspan="2">KHONG HUCU</th>
                    <th rowspan="2">JML</th>
                    <th colspan="2">WNI</th>
                    <th colspan="2">WNA</th>

                </tr>
                <tr>
                    <th>L</th>
                    <th>P</th>
                    <th>JML</th>

                    <th>L</th>
                    <th>P</th>
                    <th>L</th>
                    <th>P</th>

                    <th>L</th>
                    <th>P</th>
                    <th>JML</th>

                    <th>L</th>
                    <th>P</th>
                    <th>L</th>
                    <th>P</th>
                    <th>L</th>
                    <th>P</th>

                    <th>L</th>
                    <th>P</th>
                    <th>L</th>
                    <th>P</th>
                    <th>L</th>
                    <th>P</th>

                    <th>L</th>
                    <th>P</th>
                    <th>L</th>
                    <th>P</th>
                    <th>L</th>
                    <th>P</th>
                    <th>L</th>
                    <th>P</th>
                    <th>L</th>
                    <th>P</th>
                    <th>L</th>
                    <th>P</th>

                    <th>L</th>
                    <th>P</th>
                    <th>L</th>
                    <th>P</th>

                </tr>
            </thead>`;
    let arrRombel = arrayrombel();
    let rombelkelas1 = arrRombel.filter(k => k.indexOf("1") > -1).length;

    let df1_r1_c2 = jsondatasiswa.filter(k => k.pd_jk == "L" && k.jenjang == "1").length;
    let df1_r1_c3 = jsondatasiswa.filter(k => k.pd_jk == "P" && k.jenjang == "1").length;
    let df1_r1_c4 = jsondatasiswa.filter(k => k.jenjang == "1").length;
    html += `
            <tbody>
                <tr>
                    <td>Kelas 1</td>
                    <td contenteditable="true" class="df1_r1_c1">${rombelkelas1}</td>
                    <td contenteditable="true" class="df1_r1_c2">${df1_r1_c2}</td>
                    <td contenteditable="true" class="df1_r1_c3">${df1_r1_c3}</td>
                    <td contenteditable="true" class="df1_r1_c4">${df1_r1_c4}</td>
                    <td contenteditable="true" class="df1_r1_c5">0</td>
                    <td contenteditable="true" class="df1_r1_c6">0</td>
                    <td contenteditable="true" class="df1_r1_c7">0</td>
                    <td contenteditable="true" class="df1_r1_c8">0</td>
                    <td contenteditable="true" class="df1_r1_c2">${df1_r1_c2}</td>
                    <td contenteditable="true" class="df1_r1_c3">${df1_r1_c3}</td>
                    <td contenteditable="true" class="df1_r1_c4">${df1_r1_c4}</td>
                    
                    
                    <td contenteditable="true" class="df1_r1_c12">0</td>
                    <td contenteditable="true" class="df1_r1_c13">0</td>
                    <td contenteditable="true" class="df1_r1_c14">0</td>
                    <td contenteditable="true" class="df1_r1_c15">0</td>
                    <td contenteditable="true" class="df1_r1_c16">0</td>
                    <td contenteditable="true" class="df1_r1_c17">0</td>
                    <td contenteditable="true" class="df1_r1_c18">0</td>`;
    let umurkelas1 = jsondatasiswa.filter(k => k.jenjang == "1").filter(l => l.pd_tanggallahir !== "");//.map(u=> umur(u.pd_tanggallahir).tahun)
    let u_k1_L_1 = umurkelas1.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;
    let u_k1_P_1 = umurkelas1.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;

    let u_k1_L_2 = umurkelas1.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;
    let u_k1_P_2 = umurkelas1.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;

    let u_k1_L_3 = umurkelas1.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    let u_k1_P_3 = umurkelas1.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    html += `<td contenteditable="true" class="df1_r1_c19">${u_k1_L_1}</td>
                    <td contenteditable="true" class="df1_r1_c20">${u_k1_P_1}</td>
                    <td contenteditable="true" class="df1_r1_c21">${u_k1_L_2}</td>
                    <td contenteditable="true" class="df1_r1_c22">${u_k1_P_2}</td>
                    <td contenteditable="true" class="df1_r1_c23">${u_k1_L_3}</td>
                    <td contenteditable="true" class="df1_r1_c24">${u_k1_P_3}</td>
                    <td contenteditable="true" class="df1_r1_c25">${umurkelas1.length}</td>`;
    let ag_k1 = jsondatasiswa.filter(k => k.jenjang == "1").filter(g => g.pd_agama !== "");
    let ag_k1_is_L = ag_k1.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "L").length;
    let ag_k1_is_P = ag_k1.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "P").length;

    let ag_k1_ks_L = ag_k1.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "L").length;
    let ag_k1_ks_P = ag_k1.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "P").length;

    let ag_k1_kt_L = ag_k1.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "L").length;
    let ag_k1_kt_P = ag_k1.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "P").length;

    let ag_k1_hd_L = ag_k1.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "L").length;
    let ag_k1_hd_P = ag_k1.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "P").length;

    let ag_k1_bd_L = ag_k1.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "L").length;
    let ag_k1_bd_P = ag_k1.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "P").length;

    let ag_k1_kh_L = ag_k1.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "L").length;
    let ag_k1_kh_P = ag_k1.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "P").length;

    html += ` <td contenteditable="true" class="df1_r1_c26">${ag_k1_is_L}</td>
                    <td contenteditable="true" class="df1_r1_c27">${ag_k1_is_P}</td>
                    <td contenteditable="true" class="df1_r1_c28">${ag_k1_ks_L}</td>
                    <td contenteditable="true" class="df1_r1_c29">${ag_k1_ks_P}</td>
                    <td contenteditable="true" class="df1_r1_c30">${ag_k1_kt_L}</td>
                    <td contenteditable="true" class="df1_r1_c31">${ag_k1_kt_P}</td>
                    <td contenteditable="true" class="df1_r1_c32">${ag_k1_hd_L}</td>
                    <td contenteditable="true" class="df1_r1_c33">${ag_k1_hd_P}</td>
                    <td contenteditable="true" class="df1_r1_c34">${ag_k1_bd_L}</td>
                    <td contenteditable="true" class="df1_r1_c35">${ag_k1_bd_P}</td>
                    <td contenteditable="true" class="df1_r1_c36">${ag_k1_kh_L}</td>
                    <td contenteditable="true" class="df1_r1_c37">${ag_k1_kh_P}</td>
                    <td contenteditable="true" class="df1_r1_c38">${ag_k1.length}</td>
                    <td contenteditable="true" class="df1_r1_c39">${df1_r1_c2}</td>
                    <td contenteditable="true" class="df1_r1_c40">${df1_r1_c3}</td>
                    <td contenteditable="true" class="df1_r1_c41">0</td>
                    <td contenteditable="true" class="df1_r1_c42">0</td>
                </tr>`
    ////////////////////// kelas 2 /////////////////
    let rombelkelas2 = arrRombel.filter(k => k.indexOf("2") > -1).length;

    let df1_r2_c2 = jsondatasiswa.filter(k => k.pd_jk == "L" && k.jenjang == "2").length;
    let df1_r2_c3 = jsondatasiswa.filter(k => k.pd_jk == "P" && k.jenjang == "2").length;
    let df1_r2_c4 = jsondatasiswa.filter(k => k.jenjang == "2").length;
    html += `<tr>
                <td>Kelas 2</td>
                <td contenteditable="true" class="df1_r2_c1">${rombelkelas2}</td>
                <td contenteditable="true" class="df1_r2_c2">${df1_r2_c2}</td>
                <td contenteditable="true" class="df1_r2_c3">${df1_r2_c3}</td>
                <td contenteditable="true" class="df1_r2_c4">${df1_r2_c4}</td>
                <td contenteditable="true" class="df1_r2_c5">0</td>
                <td contenteditable="true" class="df1_r2_c6">0</td>
                <td contenteditable="true" class="df1_r2_c7">0</td>
                <td contenteditable="true" class="df1_r2_c8">0</td>
                <td contenteditable="true" class="df1_r2_c2">${df1_r2_c2}</td>
                <td contenteditable="true" class="df1_r2_c3">${df1_r2_c3}</td>
                <td contenteditable="true" class="df1_r2_c4">${df1_r2_c4}</td>
                
                
                <td contenteditable="true" class="df1_r2_c12">0</td>
                <td contenteditable="true" class="df1_r2_c13">0</td>
                <td contenteditable="true" class="df1_r2_c14">0</td>
                <td contenteditable="true" class="df1_r2_c15">0</td>
                <td contenteditable="true" class="df1_r2_c16">0</td>
                <td contenteditable="true" class="df1_r2_c17">0</td>
                <td contenteditable="true" class="df1_r2_c18">0</td>`;
    let umurkelas2 = jsondatasiswa.filter(k => k.jenjang == "2").filter(l => l.pd_tanggallahir !== "");
    let u_k2_L_1 = umurkelas2.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;
    let u_k2_P_1 = umurkelas2.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;

    let u_k2_L_2 = umurkelas2.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;
    let u_k2_P_2 = umurkelas2.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;

    let u_k2_L_3 = umurkelas2.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    let u_k2_P_3 = umurkelas2.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    html += `<td contenteditable="true" class="df1_r2_c19">${u_k2_L_1}</td>
                <td contenteditable="true" class="df1_r2_c20">${u_k2_P_1}</td>
                <td contenteditable="true" class="df1_r2_c21">${u_k2_L_2}</td>
                <td contenteditable="true" class="df1_r2_c22">${u_k2_P_2}</td>
                <td contenteditable="true" class="df1_r2_c23">${u_k2_L_3}</td>
                <td contenteditable="true" class="df1_r2_c24">${u_k2_P_3}</td>
                <td contenteditable="true" class="df1_r2_c25">${umurkelas2.length}</td>`;
    let ag_k2 = jsondatasiswa.filter(k => k.jenjang == "2").filter(g => g.pd_agama !== "");
    let ag_k2_is_L = ag_k2.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "L").length;
    let ag_k2_is_P = ag_k2.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "P").length;

    let ag_k2_ks_L = ag_k2.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "L").length;
    let ag_k2_ks_P = ag_k2.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "P").length;

    let ag_k2_kt_L = ag_k2.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "L").length;
    let ag_k2_kt_P = ag_k2.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "P").length;

    let ag_k2_hd_L = ag_k2.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "L").length;
    let ag_k2_hd_P = ag_k2.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "P").length;

    let ag_k2_bd_L = ag_k2.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "L").length;
    let ag_k2_bd_P = ag_k2.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "P").length;

    let ag_k2_kh_L = ag_k2.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "L").length;
    let ag_k2_kh_P = ag_k2.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "P").length;

    html += `
                <td contenteditable="true" class="df1_r2_c26">${ag_k2_is_L}</td>
                <td contenteditable="true" class="df1_r2_c27">${ag_k2_is_P}</td>
                <td contenteditable="true" class="df1_r2_c28">${ag_k2_ks_L}</td>
                <td contenteditable="true" class="df1_r2_c29">${ag_k2_ks_P}</td>
                <td contenteditable="true" class="df1_r2_c30">${ag_k2_kt_L}</td>
                <td contenteditable="true" class="df1_r2_c31">${ag_k2_kt_P}</td>
                <td contenteditable="true" class="df1_r2_c32">${ag_k2_hd_L}</td>
                <td contenteditable="true" class="df1_r2_c33">${ag_k2_hd_P}</td>
                <td contenteditable="true" class="df1_r2_c34">${ag_k2_bd_L}</td>
                <td contenteditable="true" class="df1_r2_c35">${ag_k2_bd_P}</td>
                <td contenteditable="true" class="df1_r2_c36">${ag_k2_kh_L}</td>
                <td contenteditable="true" class="df1_r2_c37">${ag_k2_kh_P}</td>
                <td contenteditable="true" class="df1_r2_c38">${ag_k2.length}</td>
                <td contenteditable="true" class="df1_r2_c39">${df1_r2_c2}</td>
                <td contenteditable="true" class="df1_r2_c40">${df1_r2_c3}</td>
                <td contenteditable="true" class="df1_r2_c41">0</td>
                <td contenteditable="true" class="df1_r2_c42">0</td>
            </tr>`
    ////////////////////// kelas 3 /////////////////
    let rombelkelas3 = arrRombel.filter(k => k.indexOf("3") > -1).length;

    let df1_r3_c2 = jsondatasiswa.filter(k => k.pd_jk == "L" && k.jenjang == "3").length;
    let df1_r3_c3 = jsondatasiswa.filter(k => k.pd_jk == "P" && k.jenjang == "3").length;
    let df1_r3_c4 = jsondatasiswa.filter(k => k.jenjang == "3").length;
    html += `<tr>
                    <td>Kelas 3</td>
                    <td contenteditable="true" class="df1_r3_c1">${rombelkelas3}</td>
                    <td contenteditable="true" class="df1_r3_c2">${df1_r3_c2}</td>
                    <td contenteditable="true" class="df1_r3_c3">${df1_r3_c3}</td>
                    <td contenteditable="true" class="df1_r3_c4">${df1_r3_c4}</td>
                    <td contenteditable="true" class="df1_r3_c5">0</td>
                    <td contenteditable="true" class="df1_r3_c6">0</td>
                    <td contenteditable="true" class="df1_r3_c7">0</td>
                    <td contenteditable="true" class="df1_r3_c8">0</td>
                    <td contenteditable="true" class="df1_r3_c2">${df1_r3_c2}</td>
                    <td contenteditable="true" class="df1_r3_c3">${df1_r3_c3}</td>
                    <td contenteditable="true" class="df1_r3_c4">${df1_r3_c4}</td>
                    
                    
                    <td contenteditable="true" class="df1_r3_c12">0</td>
                    <td contenteditable="true" class="df1_r3_c13">0</td>
                    <td contenteditable="true" class="df1_r3_c14">0</td>
                    <td contenteditable="true" class="df1_r3_c15">0</td>
                    <td contenteditable="true" class="df1_r3_c16">0</td>
                    <td contenteditable="true" class="df1_r3_c17">0</td>
                    <td contenteditable="true" class="df1_r3_c18">0</td>`;
    let umurkelas3 = jsondatasiswa.filter(k => k.jenjang == "3").filter(l => l.pd_tanggallahir !== "");
    let u_k3_L_1 = umurkelas3.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;
    let u_k3_P_1 = umurkelas3.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;

    let u_k3_L_2 = umurkelas3.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;
    let u_k3_P_2 = umurkelas3.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;

    let u_k3_L_3 = umurkelas3.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    let u_k3_P_3 = umurkelas3.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    html += `<td contenteditable="true" class="df1_r3_c19">${u_k3_L_1}</td>
                    <td contenteditable="true" class="df1_r3_c20">${u_k3_P_1}</td>
                    <td contenteditable="true" class="df1_r3_c21">${u_k3_L_2}</td>
                    <td contenteditable="true" class="df1_r3_c22">${u_k3_P_2}</td>
                    <td contenteditable="true" class="df1_r3_c23">${u_k3_L_3}</td>
                    <td contenteditable="true" class="df1_r3_c24">${u_k3_P_3}</td>
                    <td contenteditable="true" class="df1_r3_c25">${umurkelas3.length}</td>`;
    let ag_k3 = jsondatasiswa.filter(k => k.jenjang == "3").filter(g => g.pd_agama !== "");
    let ag_k3_is_L = ag_k3.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "L").length;
    let ag_k3_is_P = ag_k3.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "P").length;

    let ag_k3_ks_L = ag_k3.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "L").length;
    let ag_k3_ks_P = ag_k3.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "P").length;

    let ag_k3_kt_L = ag_k3.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "L").length;
    let ag_k3_kt_P = ag_k3.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "P").length;

    let ag_k3_hd_L = ag_k3.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "L").length;
    let ag_k3_hd_P = ag_k3.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "P").length;

    let ag_k3_bd_L = ag_k3.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "L").length;
    let ag_k3_bd_P = ag_k3.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "P").length;

    let ag_k3_kh_L = ag_k3.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "L").length;
    let ag_k3_kh_P = ag_k3.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "P").length;

    html += `
                    <td contenteditable="true" class="df1_r3_c26">${ag_k3_is_L}</td>
                    <td contenteditable="true" class="df1_r3_c27">${ag_k3_is_P}</td>
                    <td contenteditable="true" class="df1_r3_c28">${ag_k3_ks_L}</td>
                    <td contenteditable="true" class="df1_r3_c29">${ag_k3_ks_P}</td>
                    <td contenteditable="true" class="df1_r3_c30">${ag_k3_kt_L}</td>
                    <td contenteditable="true" class="df1_r3_c31">${ag_k3_kt_P}</td>
                    <td contenteditable="true" class="df1_r3_c32">${ag_k3_hd_L}</td>
                    <td contenteditable="true" class="df1_r3_c33">${ag_k3_hd_P}</td>
                    <td contenteditable="true" class="df1_r3_c34">${ag_k3_bd_L}</td>
                    <td contenteditable="true" class="df1_r3_c35">${ag_k3_bd_P}</td>
                    <td contenteditable="true" class="df1_r3_c36">${ag_k3_kh_L}</td>
                    <td contenteditable="true" class="df1_r3_c37">${ag_k3_kh_P}</td>
                    <td contenteditable="true" class="df1_r3_c38">${ag_k3.length}</td>
                    <td contenteditable="true" class="df1_r3_c39">${df1_r3_c2}</td>
                    <td contenteditable="true" class="df1_r3_c40">${df1_r3_c3}</td>
                    <td contenteditable="true" class="df1_r3_c41">0</td>
                    <td contenteditable="true" class="df1_r3_c42">0</td>
                </tr>`
    ////////////////////// kelas 4 /////////////////
    let rombelkelas4 = arrRombel.filter(k => k.indexOf("4") > -1).length;

    let df1_r4_c2 = jsondatasiswa.filter(k => k.pd_jk == "L" && k.jenjang == "4").length;
    let df1_r4_c3 = jsondatasiswa.filter(k => k.pd_jk == "P" && k.jenjang == "4").length;
    let df1_r4_c4 = jsondatasiswa.filter(k => k.jenjang == "4").length;
    html += `<tr>
                    <td>Kelas 4</td>
                    <td contenteditable="true" class="df1_r4_c1">${rombelkelas4}</td>
                    <td contenteditable="true" class="df1_r4_c2">${df1_r4_c2}</td>
                    <td contenteditable="true" class="df1_r4_c3">${df1_r4_c3}</td>
                    <td contenteditable="true" class="df1_r4_c4">${df1_r4_c4}</td>
                    <td contenteditable="true" class="df1_r4_c5">0</td>
                    <td contenteditable="true" class="df1_r4_c6">0</td>
                    <td contenteditable="true" class="df1_r4_c7">0</td>
                    <td contenteditable="true" class="df1_r4_c8">0</td>
                    <td contenteditable="true" class="df1_r4_c2">${df1_r4_c2}</td>
                    <td contenteditable="true" class="df1_r4_c3">${df1_r4_c3}</td>
                    <td contenteditable="true" class="df1_r4_c4">${df1_r4_c4}</td>
                    
                    
                    <td contenteditable="true" class="df1_r4_c12">0</td>
                    <td contenteditable="true" class="df1_r4_c13">0</td>
                    <td contenteditable="true" class="df1_r4_c14">0</td>
                    <td contenteditable="true" class="df1_r4_c15">0</td>
                    <td contenteditable="true" class="df1_r4_c16">0</td>
                    <td contenteditable="true" class="df1_r4_c17">0</td>
                    <td contenteditable="true" class="df1_r4_c18">0</td>`;
    let umurkelas4 = jsondatasiswa.filter(k => k.jenjang == "4").filter(l => l.pd_tanggallahir !== "");
    let u_k4_L_1 = umurkelas4.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;
    let u_k4_P_1 = umurkelas4.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;

    let u_k4_L_2 = umurkelas4.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;
    let u_k4_P_2 = umurkelas4.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;

    let u_k4_L_3 = umurkelas4.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    let u_k4_P_3 = umurkelas4.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    html += `<td contenteditable="true" class="df1_r4_c19">${u_k4_L_1}</td>
                    <td contenteditable="true" class="df1_r4_c20">${u_k4_P_1}</td>
                    <td contenteditable="true" class="df1_r4_c21">${u_k4_L_2}</td>
                    <td contenteditable="true" class="df1_r4_c22">${u_k4_P_2}</td>
                    <td contenteditable="true" class="df1_r4_c23">${u_k4_L_3}</td>
                    <td contenteditable="true" class="df1_r4_c24">${u_k4_P_3}</td>
                    <td contenteditable="true" class="df1_r4_c25">${umurkelas4.length}</td>`;
    let ag_k4 = jsondatasiswa.filter(k => k.jenjang == "4").filter(g => g.pd_agama !== "");
    let ag_k4_is_L = ag_k4.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "L").length;
    let ag_k4_is_P = ag_k4.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "P").length;

    let ag_k4_ks_L = ag_k4.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "L").length;
    let ag_k4_ks_P = ag_k4.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "P").length;

    let ag_k4_kt_L = ag_k4.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "L").length;
    let ag_k4_kt_P = ag_k4.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "P").length;

    let ag_k4_hd_L = ag_k4.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "L").length;
    let ag_k4_hd_P = ag_k4.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "P").length;

    let ag_k4_bd_L = ag_k4.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "L").length;
    let ag_k4_bd_P = ag_k4.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "P").length;

    let ag_k4_kh_L = ag_k4.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "L").length;
    let ag_k4_kh_P = ag_k4.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "P").length;

    html += `
                    <td contenteditable="true" class="df1_r4_c26">${ag_k4_is_L}</td>
                    <td contenteditable="true" class="df1_r4_c27">${ag_k4_is_P}</td>
                    <td contenteditable="true" class="df1_r4_c28">${ag_k4_ks_L}</td>
                    <td contenteditable="true" class="df1_r4_c29">${ag_k4_ks_P}</td>
                    <td contenteditable="true" class="df1_r4_c30">${ag_k4_kt_L}</td>
                    <td contenteditable="true" class="df1_r4_c31">${ag_k4_kt_P}</td>
                    <td contenteditable="true" class="df1_r4_c32">${ag_k4_hd_L}</td>
                    <td contenteditable="true" class="df1_r4_c33">${ag_k4_hd_P}</td>
                    <td contenteditable="true" class="df1_r4_c34">${ag_k4_bd_L}</td>
                    <td contenteditable="true" class="df1_r4_c35">${ag_k4_bd_P}</td>
                    <td contenteditable="true" class="df1_r4_c36">${ag_k4_kh_L}</td>
                    <td contenteditable="true" class="df1_r4_c37">${ag_k4_kh_P}</td>
                    <td contenteditable="true" class="df1_r4_c38">${ag_k4.length}</td>
                    <td contenteditable="true" class="df1_r4_c39">${df1_r4_c2}</td>
                    <td contenteditable="true" class="df1_r4_c40">${df1_r4_c3}</td>
                    <td contenteditable="true" class="df1_r4_c41">0</td>
                    <td contenteditable="true" class="df1_r4_c42">0</td>
                </tr>`
    ////////////////////// kelas 5 /////////////////
    let rombelkelas5 = arrRombel.filter(k => k.indexOf("5") > -1).length;

    let df1_r5_c2 = jsondatasiswa.filter(k => k.pd_jk == "L" && k.jenjang == "5").length;
    let df1_r5_c3 = jsondatasiswa.filter(k => k.pd_jk == "P" && k.jenjang == "5").length;
    let df1_r5_c4 = jsondatasiswa.filter(k => k.jenjang == "5").length;
    html += `<tr>
                    <td>Kelas 5</td>
                    <td contenteditable="true" class="df1_r5_c1">${rombelkelas5}</td>
                    <td contenteditable="true" class="df1_r5_c2">${df1_r5_c2}</td>
                    <td contenteditable="true" class="df1_r5_c3">${df1_r5_c3}</td>
                    <td contenteditable="true" class="df1_r5_c4">${df1_r5_c4}</td>
                    <td contenteditable="true" class="df1_r5_c5">0</td>
                    <td contenteditable="true" class="df1_r5_c6">0</td>
                    <td contenteditable="true" class="df1_r5_c7">0</td>
                    <td contenteditable="true" class="df1_r5_c8">0</td>
                    <td contenteditable="true" class="df1_r5_c2">${df1_r5_c2}</td>
                    <td contenteditable="true" class="df1_r5_c3">${df1_r5_c3}</td>
                    <td contenteditable="true" class="df1_r5_c4">${df1_r5_c4}</td>
                    
                    
                    <td contenteditable="true" class="df1_r5_c12">0</td>
                    <td contenteditable="true" class="df1_r5_c13">0</td>
                    <td contenteditable="true" class="df1_r5_c14">0</td>
                    <td contenteditable="true" class="df1_r5_c15">0</td>
                    <td contenteditable="true" class="df1_r5_c16">0</td>
                    <td contenteditable="true" class="df1_r5_c17">0</td>
                    <td contenteditable="true" class="df1_r5_c18">0</td>`;
    let umurkelas5 = jsondatasiswa.filter(k => k.jenjang == "5").filter(l => l.pd_tanggallahir !== "");
    let u_k5_L_1 = umurkelas5.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;
    let u_k5_P_1 = umurkelas5.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;

    let u_k5_L_2 = umurkelas5.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;
    let u_k5_P_2 = umurkelas5.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;

    let u_k5_L_3 = umurkelas5.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    let u_k5_P_3 = umurkelas5.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    html += `<td contenteditable="true" class="df1_r5_c19">${u_k5_L_1}</td>
                    <td contenteditable="true" class="df1_r5_c20">${u_k5_P_1}</td>
                    <td contenteditable="true" class="df1_r5_c21">${u_k5_L_2}</td>
                    <td contenteditable="true" class="df1_r5_c22">${u_k5_P_2}</td>
                    <td contenteditable="true" class="df1_r5_c23">${u_k5_L_3}</td>
                    <td contenteditable="true" class="df1_r5_c24">${u_k5_P_3}</td>
                    <td contenteditable="true" class="df1_r5_c25">${umurkelas5.length}</td>`;
    let ag_k5 = jsondatasiswa.filter(k => k.jenjang == "5").filter(g => g.pd_agama !== "");
    let ag_k5_is_L = ag_k5.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "L").length;
    let ag_k5_is_P = ag_k5.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "P").length;

    let ag_k5_ks_L = ag_k5.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "L").length;
    let ag_k5_ks_P = ag_k5.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "P").length;

    let ag_k5_kt_L = ag_k5.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "L").length;
    let ag_k5_kt_P = ag_k5.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "P").length;

    let ag_k5_hd_L = ag_k5.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "L").length;
    let ag_k5_hd_P = ag_k5.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "P").length;

    let ag_k5_bd_L = ag_k5.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "L").length;
    let ag_k5_bd_P = ag_k5.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "P").length;

    let ag_k5_kh_L = ag_k5.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "L").length;
    let ag_k5_kh_P = ag_k5.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "P").length;

    html += `
                    <td contenteditable="true" class="df1_r5_c26">${ag_k5_is_L}</td>
                    <td contenteditable="true" class="df1_r5_c27">${ag_k5_is_P}</td>
                    <td contenteditable="true" class="df1_r5_c28">${ag_k5_ks_L}</td>
                    <td contenteditable="true" class="df1_r5_c29">${ag_k5_ks_P}</td>
                    <td contenteditable="true" class="df1_r5_c30">${ag_k5_kt_L}</td>
                    <td contenteditable="true" class="df1_r5_c31">${ag_k5_kt_P}</td>
                    <td contenteditable="true" class="df1_r5_c32">${ag_k5_hd_L}</td>
                    <td contenteditable="true" class="df1_r5_c33">${ag_k5_hd_P}</td>
                    <td contenteditable="true" class="df1_r5_c34">${ag_k5_bd_L}</td>
                    <td contenteditable="true" class="df1_r5_c35">${ag_k5_bd_P}</td>
                    <td contenteditable="true" class="df1_r5_c36">${ag_k5_kh_L}</td>
                    <td contenteditable="true" class="df1_r5_c37">${ag_k5_kh_P}</td>
                    <td contenteditable="true" class="df1_r5_c38">${ag_k5.length}</td>
                    <td contenteditable="true" class="df1_r5_c39">${df1_r5_c2}</td>
                    <td contenteditable="true" class="df1_r5_c40">${df1_r5_c3}</td>
                    <td contenteditable="true" class="df1_r5_c41">0</td>
                    <td contenteditable="true" class="df1_r5_c42">0</td>
                </tr>`
    ////////////////////// kelas 6 /////////////////
    let rombelkelas6 = arrRombel.filter(k => k.indexOf("6") > -1).length;
    let df1_r6_c2 = jsondatasiswa.filter(k => k.pd_jk == "L" && k.jenjang == "6").length;
    let df1_r6_c3 = jsondatasiswa.filter(k => k.pd_jk == "P" && k.jenjang == "6").length;
    let df1_r6_c4 = jsondatasiswa.filter(k => k.jenjang == "6").length;
    html += `<tr>
                                <td>Kelas 6</td>
                                <td contenteditable="true" class="df1_r6_c1">${rombelkelas6}</td>
                                <td contenteditable="true" class="df1_r6_c2">${df1_r6_c2}</td>
                                <td contenteditable="true" class="df1_r6_c3">${df1_r6_c3}</td>
                                <td contenteditable="true" class="df1_r6_c4">${df1_r6_c4}</td>
                                <td contenteditable="true" class="df1_r6_c5">0</td>
                                <td contenteditable="true" class="df1_r6_c6">0</td>
                                <td contenteditable="true" class="df1_r6_c7">0</td>
                                <td contenteditable="true" class="df1_r6_c8">0</td>
                                <td contenteditable="true" class="df1_r6_c2">${df1_r6_c2}</td>
                                <td contenteditable="true" class="df1_r6_c3">${df1_r6_c3}</td>
                                <td contenteditable="true" class="df1_r6_c4">${df1_r6_c4}</td>
                                
                                
                                <td contenteditable="true" class="df1_r6_c12">0</td>
                                <td contenteditable="true" class="df1_r6_c13">0</td>
                                <td contenteditable="true" class="df1_r6_c14">0</td>
                                <td contenteditable="true" class="df1_r6_c15">0</td>
                                <td contenteditable="true" class="df1_r6_c16">0</td>
                                <td contenteditable="true" class="df1_r6_c17">0</td>
                                <td contenteditable="true" class="df1_r6_c18">0</td>`;
    let umurkelas6 = jsondatasiswa.filter(k => k.jenjang == "6").filter(l => l.pd_tanggallahir !== "");
    let u_k6_L_1 = umurkelas6.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;
    let u_k6_P_1 = umurkelas6.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;

    let u_k6_L_2 = umurkelas6.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;
    let u_k6_P_2 = umurkelas6.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;

    let u_k6_L_3 = umurkelas6.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    let u_k6_P_3 = umurkelas6.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    html += `<td contenteditable="true" class="df1_r6_c19">${u_k6_L_1}</td>
                                <td contenteditable="true" class="df1_r6_c20">${u_k6_P_1}</td>
                                <td contenteditable="true" class="df1_r6_c21">${u_k6_L_2}</td>
                                <td contenteditable="true" class="df1_r6_c22">${u_k6_P_2}</td>
                                <td contenteditable="true" class="df1_r6_c23">${u_k6_L_3}</td>
                                <td contenteditable="true" class="df1_r6_c24">${u_k6_P_3}</td>
                                <td contenteditable="true" class="df1_r6_c25">${umurkelas6.length}</td>`;
    let ag_k6 = jsondatasiswa.filter(k => k.jenjang == "6").filter(g => g.pd_agama !== "");
    let ag_k6_is_L = ag_k6.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "L").length;
    let ag_k6_is_P = ag_k6.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "P").length;

    let ag_k6_ks_L = ag_k6.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "L").length;
    let ag_k6_ks_P = ag_k6.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "P").length;

    let ag_k6_kt_L = ag_k6.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "L").length;
    let ag_k6_kt_P = ag_k6.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "P").length;

    let ag_k6_hd_L = ag_k6.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "L").length;
    let ag_k6_hd_P = ag_k6.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "P").length;

    let ag_k6_bd_L = ag_k6.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "L").length;
    let ag_k6_bd_P = ag_k6.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "P").length;

    let ag_k6_kh_L = ag_k6.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "L").length;
    let ag_k6_kh_P = ag_k6.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "P").length;

    html += `
                                <td contenteditable="true" class="df1_r6_c26">${ag_k6_is_L}</td>
                                <td contenteditable="true" class="df1_r6_c27">${ag_k6_is_P}</td>
                                <td contenteditable="true" class="df1_r6_c28">${ag_k6_ks_L}</td>
                                <td contenteditable="true" class="df1_r6_c29">${ag_k6_ks_P}</td>
                                <td contenteditable="true" class="df1_r6_c30">${ag_k6_kt_L}</td>
                                <td contenteditable="true" class="df1_r6_c31">${ag_k6_kt_P}</td>
                                <td contenteditable="true" class="df1_r6_c32">${ag_k6_hd_L}</td>
                                <td contenteditable="true" class="df1_r6_c33">${ag_k6_hd_P}</td>
                                <td contenteditable="true" class="df1_r6_c34">${ag_k6_bd_L}</td>
                                <td contenteditable="true" class="df1_r6_c35">${ag_k6_bd_P}</td>
                                <td contenteditable="true" class="df1_r6_c36">${ag_k6_kh_L}</td>
                                <td contenteditable="true" class="df1_r6_c37">${ag_k6_kh_P}</td>
                                <td contenteditable="true" class="df1_r6_c38">${ag_k6.length}</td>
                                <td contenteditable="true" class="df1_r6_c39">${df1_r6_c2}</td>
                                <td contenteditable="true" class="df1_r6_c40">${df1_r6_c3}</td>
                                <td contenteditable="true" class="df1_r6_c41">0</td>
                                <td contenteditable="true" class="df1_r6_c42">0</td>
                            </tr>`


    let rombeljumlah = arrRombel.length

    let df1_rall_c2 = jsondatasiswa.filter(k => k.pd_jk == "L").length;
    let df1_rall_c3 = jsondatasiswa.filter(k => k.pd_jk == "P").length;
    let df1_rall_c4 = jsondatasiswa.length;
    html += `<tr>
                                            <td>JUMLAH</td>
                                            <td contenteditable="true" class="df1_r5_c1">${rombeljumlah}</td>
                                            <td contenteditable="true" class="df1_r5_c2">${df1_rall_c2}</td>
                                            <td contenteditable="true" class="df1_r5_c3">${df1_rall_c3}</td>
                                            <td contenteditable="true" class="df1_r5_c4">${df1_rall_c4}</td>
                                            <td contenteditable="true" class="df1_r5_c5">0</td>
                                            <td contenteditable="true" class="df1_r5_c6">0</td>
                                            <td contenteditable="true" class="df1_r5_c7">0</td>
                                            <td contenteditable="true" class="df1_r5_c8">0</td>
                                            <td contenteditable="true" class="df1_r5_c2">${df1_rall_c2}</td>
                                            <td contenteditable="true" class="df1_r5_c3">${df1_rall_c3}</td>
                                            <td contenteditable="true" class="df1_r5_c4">${df1_rall_c4}</td>
                                            
                                            
                                            <td contenteditable="true" class="df1_r5_c12">0</td>
                                            <td contenteditable="true" class="df1_r5_c13">0</td>
                                            <td contenteditable="true" class="df1_r5_c14">0</td>
                                            <td contenteditable="true" class="df1_r5_c15">0</td>
                                            <td contenteditable="true" class="df1_r5_c16">0</td>
                                            <td contenteditable="true" class="df1_r5_c17">0</td>
                                            <td contenteditable="true" class="df1_r5_c18">0</td>`;
    let umurkelasAll = jsondatasiswa.filter(l => l.pd_tanggallahir !== "");
    let u_kAll_L_1 = umurkelasAll.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;
    let u_kAll_P_1 = umurkelasAll.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;

    let u_kAll_L_2 = umurkelasAll.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;
    let u_kAll_P_2 = umurkelasAll.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;

    let u_kAll_L_3 = umurkelasAll.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    let u_kAll_P_3 = umurkelasAll.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    html += `<td contenteditable="true" class="df1_r5_c19">${u_kAll_L_1}</td>
                                            <td contenteditable="true" class="df1_r5_c20">${u_kAll_P_1}</td>
                                            <td contenteditable="true" class="df1_r5_c21">${u_kAll_L_2}</td>
                                            <td contenteditable="true" class="df1_r5_c22">${u_kAll_P_2}</td>
                                            <td contenteditable="true" class="df1_r5_c23">${u_kAll_L_3}</td>
                                            <td contenteditable="true" class="df1_r5_c24">${u_kAll_P_3}</td>
                                            <td contenteditable="true" class="df1_r5_c25">${umurkelasAll.length}</td>`;
    let ag_kAll = jsondatasiswa.filter(g => g.pd_agama !== "");
    let ag_kAll_is_L = ag_kAll.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "L").length;
    let ag_kAll_is_P = ag_kAll.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "P").length;

    let ag_kAll_ks_L = ag_kAll.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "L").length;
    let ag_kAll_ks_P = ag_kAll.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "P").length;

    let ag_kAll_kt_L = ag_kAll.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "L").length;
    let ag_kAll_kt_P = ag_kAll.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "P").length;

    let ag_kAll_hd_L = ag_kAll.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "L").length;
    let ag_kAll_hd_P = ag_kAll.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "P").length;

    let ag_kAll_bd_L = ag_kAll.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "L").length;
    let ag_kAll_bd_P = ag_kAll.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "P").length;

    let ag_kAll_kh_L = ag_kAll.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "L").length;
    let ag_kAll_kh_P = ag_kAll.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "P").length;

    html += `<td contenteditable="true" class="df1_r5_c26">${ag_kAll_is_L}</td>
                                            <td contenteditable="true" class="df1_r5_c27">${ag_kAll_is_P}</td>
                                            <td contenteditable="true" class="df1_r5_c28">${ag_kAll_ks_L}</td>
                                            <td contenteditable="true" class="df1_r5_c29">${ag_kAll_ks_P}</td>
                                            <td contenteditable="true" class="df1_r5_c30">${ag_kAll_kt_L}</td>
                                            <td contenteditable="true" class="df1_r5_c31">${ag_kAll_kt_P}</td>
                                            <td contenteditable="true" class="df1_r5_c32">${ag_kAll_hd_L}</td>
                                            <td contenteditable="true" class="df1_r5_c33">${ag_kAll_hd_P}</td>
                                            <td contenteditable="true" class="df1_r5_c34">${ag_kAll_bd_L}</td>
                                            <td contenteditable="true" class="df1_r5_c35">${ag_kAll_bd_P}</td>
                                            <td contenteditable="true" class="df1_r5_c36">${ag_kAll_kh_L}</td>
                                            <td contenteditable="true" class="df1_r5_c37">${ag_kAll_kh_P}</td>
                                            <td contenteditable="true" class="df1_r5_c38">${ag_kAll.length}</td>
                                            <td contenteditable="true" class="df1_r5_c39">${df1_rall_c2}</td>
                                            <td contenteditable="true" class="df1_r5_c40">${df1_rall_c3}</td>
                                            <td contenteditable="true" class="df1_r5_c41">0</td>
                                            <td contenteditable="true" class="df1_r5_c42">0</td>
                                        </tr>
            </tbody>
        </table>
    </div>
    <div class="w3-left w3-border w3-border-black" style="width:60%">
        <div class="w3-left w3-container">
            <b>B. ABSENSI DAN SOSIAL EKONOMI ORANG TUA MURID</b>
            <table>
                <tr>
                    <td>1. Absensi Murid</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small">... %</td>
                    <td class="w3-right-align">S</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small">..</td>
                    <td>I</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small">..</td>
                    <td>A</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small">..</td>
                </tr>
                <tr>
                    <td>2. Absensi Pegawai</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small">... %</td>
                    <td class="w3-right-align">S</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small">..</td>
                    <td>I</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small">..</td>
                    <td>A</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small">..</td>
                </tr>

                <tr>
                    <td>3. Jumlah Pegawai</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small">... %</td>
                    <td colspan="9"></td>
                </tr>
                <tr>
                    <td>4. Jumlah Hari Efektif</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small">... %</td>
                    <td colspan="9"></td>

                </tr>

                <tr>
                    <td rowspan="3" style="vertical-align:top">5. Kemampuan Ekonomi</td>
                    <td rowspan="3" style="vertical-align:top">:</td>
                    <td>Mampu</td>

                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small">... %</td>
                    <td colspan="8"></td>
                </tr>
                <tr>
                    <td>Kurang Mampu</td>

                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small">... %</td>
                    <td colspan="8"></td>
                </tr>
                <tr>
                    <td>Tidak Mampu</td>

                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small">..</td>
                    <td colspan="8"></td>
                </tr>


            </table>
        </div>

        <div class="w3-right">
            <table>
                <thead>
                    <tr>
                        <th colspan="3">DAFTAR PENERIMA KIP</th>
                    </tr>
                </thead>
                <tbody class="w3-table garis">
                    <tr>
                        <th>Tingkat</th>
                        <th>L</th>
                        <th>P</th>
                    </tr>
                    <tr>
                        <td>Tingkat 1</td>
                        <td>...</td>
                        <td>...</td>
                    </tr>
                    <tr>
                        <td>Tingkat 2</td>
                        <td>...</td>
                        <td>...</td>
                    </tr>

                    <tr>
                        <td>Tingkat 3</td>
                        <td>...</td>
                        <td>...</td>
                    </tr>

                    <tr>
                        <td>Tingkat 4</td>
                        <td>...</td>
                        <td>...</td>
                    </tr>

                    <tr>
                        <td>Tingkat 5</td>
                        <td>...</td>
                        <td>...</td>
                    </tr>

                    <tr>
                        <td>Tingkat 6</td>
                        <td>...</td>
                        <td>...</td>
                    </tr>
                    <tr>
                        <td>Jumlah</td>
                        <td>...</td>
                        <td>...</td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
    <div class="w3-left w3-border-black w3-border w3-container" style="width:40%">
        <div class="w3-container">
            <table>
                <thead>
                    <tr>
                        <td colspan="3">
                            <b>C.1 KEADAAN SARANA DAN PRASARANA SEKOLAH</b>

                        </td>
                    </tr>
                </thead>
                <tbody class="w3-table ">
                    <tr class="garis">
                        <td>STATUS TANAH</td>
                        <td>HAK MILIK</td>
                        <td>BUKAN HAK MILIK</td>
                    </tr>
                    <tr class="garis">
                        <td>a. Luas Tanah</td>
                        <td contenteditable="true">... m<sup>2</sup></td>
                        <td contenteditable="true">... m<sup>2</sup></td>
                    </tr>
                    <tr class="garis">
                        <td>b. Digunakan Bangunan</td>
                        <td contenteditable="true">... m<sup>2</sup></td>
                        <td contenteditable="true">... m<sup>2</sup></td>
                    </tr>
                    <tr class="garis">
                        <td>c. Asal Tanah</td>
                        <td contenteditable="true">Pasos/Pasom/Wakaf</td>
                        <td contenteditable="true"></td>
                    </tr>
                    <tr class="garis">
                        <td>d. Surat Hak Milik</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                    </tr>
                    <tr class="garis">
                        <td colspan="2">e. Luas Tanah yang digunakan untuk RKB</td>

                        <td contenteditable="true">...m<sup>2</sup></td>
                    </tr>

                    <tr>
                        <td colspan="3" class="w3-white">&nbsp;</td>
                    </tr>
                    <tr>
                        <td colspan="3" class="w3-white">&nbsp;</td>

                    </tr>

                </tbody>
            </table>
        </div>
    </div>
    <div class="w3-clear"></div>
    <div class="w3-left w3-border w3-border-black w3-container" style="width:60%">
        <b class="w3-left">C.2 KONDISI BANGUNAN & SARANA LAINNYA MILIK SEKOLAH (Bukan pinjaman /
            menumpang)</b>
        <div class="w3-clear"></div>
        <div class="w3-left" >
            <table class="w3-table" >
                <tbody class="garis">

                    <tr>
                        <th rowspan="2">BANGUNAN <br />DAN<br /> RUANGAN</th>
                        <th rowspan="2">JML</th>
                        <th colspan="5">KONDISI</th>
                    </tr>
                    <tr>
                        <th>B</th>
                        <th>S</th>
                        <th>RR</th>
                        <th>RB</th>
                        <th>RT</th>
                    </tr>
                    <tr>
                        <td>a. Jumlah Bangunan</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                    </tr>
                    <tr>
                        <td>b. Jumlah Ruang Kelas</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                    </tr>
                    <tr>
                        <td>c. Jumlah Ruang Perpustakaan</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                    </tr>
                    <tr>
                        <td>d. Jumlah Ruang Komputer</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                    </tr>
                    <tr>
                        <td>e. Jumlah Ruang Laboratorium</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                    </tr>
                    <tr>
                        <td>f. Jumlah Ruang Guru & TU</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                    </tr>
                    <tr>
                        <td>g. WC Siswa</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                    </tr>
                    <tr>
                        <td>h. WC Guru</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                    </tr>
                    <tr>
                        <td>i. Rumah Dinas Kepsek </td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                    </tr>
                    <tr>
                        <td>j. Rumah Dinas Guru</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                    </tr>
                    <tr>
                        <td>k. Rumah Dinas Penjaga</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                        <td contenteditable="true">...</td>
                    </tr>
                    <tr>
                        <td>l. Sarana Air Bersih</td>
                        <td contenteditable="true">...</td>
                        <td colspan="5">1. Ledeng; 2. Sumur; <br />3. Tidak ada; 4. Lainnya</td>
                    </tr>
                    <tr>
                        <td>m. Sarana Listrik</td>
                        <td contenteditable="true">...</td>
                        <td colspan="5">1. 450VA; 2. 900 VA;<br />3. 1300VA; 4. >1300VA <br />5. >2200VA; 6.
                            lainnya
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
        <div class="w3-left w3-margin"> </div>
        <div class="w3-right" >
            <table class="w3-table">

                <tbody class="garis">
                    <tr>
                        <th rowspan="2">SARANA DASAR</th>
                        <th rowspan="2">JUMLAH</th>
                        <th colspan="3">KONDISI</th>


                    </tr>
                    <tr>
                        <th>B</th>
                        <th>oK</th>
                        <th>R</th>

                    </tr>
                    <tr>
                        <td>
                            a. Meja Siswa <br />(Double)
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            b.Bangku (Double)
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            c. Meja Siswa (Single)
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            d. Kursi (Single)
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            e.Lemari
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            f. Meja Guru
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            g.Kursi Guru
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            h.Papan Tulis
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            i.Kursi Tamu
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            j. Rak Buku
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>

                    </tr>
                    </tr>
                    <tr>
                        <td>
                            l. Komputer
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>
                        <td contenteditable="true">
                        </td>

                    </tr>

                </tbody>

            </table>
        </div>




    </div>
    <div class="w3-left  w3-container" style="width: 40%;">
        <b>KEUANGAN BOS</b>
        <table>
            <tr>
                <td>1. Saldo Awal Triwulan</td>
                <td contenteditable="true" class="w3-border w3-border-black  w3-padding-small">Rp.
                    ............</td>
            </tr>
            <tr>
                <td>2. Penerimaan dalam Triwulan</td>
                <td contenteditable="true" class="w3-border w3-border-black  w3-padding-small">Rp.
                    ............</td>
            </tr>
            <tr>
                <td>3. Pengembalian</td>
                <td contenteditable="true" class="w3-border w3-border-black  w3-padding-small">Rp.
                    ............</td>
            </tr>
            <tr>
                <td>4. Penggunaan dalam Triwulan</td>
                <td contenteditable="true" class="w3-border w3-border-black  w3-padding-small">Rp.
                    ............</td>
            </tr>
            <tr>
                <td>5. Saldo Akhir Tahun</td>
                <td contenteditable="true" class="w3-border w3-border-black  w3-padding-small">Rp.
                    ............</td>
            </tr>
        </table>
        <br />
        <b>CATATAN KEJADIAN PENTING /KHUSUS</b>
        <div class="w3-border-black w3-border w3-round w3-margin w3-padding" contenteditable="true">

        </div>
    </div>


</div>`;
    div.innerHTML = html;
})

const sinkronkandatasiswa = async () => {
    new_loading.style.display = "block";
    await fetch(linkDataUserWithIdss + "&action=datakelasaktifall")
        .then(m => m.json())
        .then(k => {
            jsondatasiswa = k.datasiswa;
            localStorage.setItem("datasiswa_all", JSON.stringify(k));

        }).catch(er => {
            console.log(er);
            alert('Maaf, terjadi gangguan. Coba lagi nanti')
        });


    await fetch(linkDataUserWithIdss + "&action=datasiswatidakaktif")
        .then(m => m.json())
        .then(k => {
            arraysiswatidakaktif = k.datasiswa;
            jumlahseluruhsiswadisekolah = k.total
            localStorage.setItem("datasiswatidakaktif", JSON.stringify(k))


        }).catch(er => {
            console.log(er);
            alert('Maaf, Terjadi gangguan. Coba lagi nanti...')

        });
    new_loading.style.display = "none";
    alert('Proses sinkron berhasil.')
}