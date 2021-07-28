let jsonlocalstorage, jsonlocalstoragetypeuser, linkdatauser;
let linkDataUserWithIdss, linkAbsenKaldik // digunakan untuk link yang mengakses SS DataUSer (guru/siswa)
let namauser, ruangankelas, gmpkelas
let idguru = "",
    idgurubaru = "";
let jsondatasiswa = [],
    arrayStringTglLibur = [];
let idNamaSekolah, idNamaKelas, idGuruKelas, idNipGuruKelas,
    idKepsek, idNipKepsek, idSemester,
    idJenisGuru, idNoWa, idTeksTapel,
    idNamaKepsek, idJenjang;
let REKAPAbsen = {},
    OBJEKHariEfektif;
let obDataRekapKehadiran;
jsonlocalstorage = JSON.parse(localStorage.getItem("inst_id"));
let jsonabsenkelasperbulan = [];
let idinterval;

let buateditorkdaktif = [];
let stoploadingtopbar;
const loadingtopbarin = (el) => {
        var elem = document.querySelector("." + el);
        elem.className = elem.className.replace("w3-hide", "");
        elem.style.width = "1px";
        var width = 1;
        stoploadingtopbar = setInterval(frame2, 10);

        function frame2() {
            if (width >= 1000000) {
                clearInterval(stoploadingtopbar);
                // elem.style.width = 0;
                // elem.style.width = 90 + '%';
                // elem.innerHTML = `100%`;
            } else {
                width += 100;
                elem.style.width = width / 1000 + '%';
                //elem.innerHTML = (width / 105).toFixed(0) + "% ";
            }
        }
    }
    (async function () {
        var elem = document.querySelector(".loadingtopbar");
        elem.style.width = "1px";
        let divlod;
        loadingtopbarin("loadingtopbar");
        OBJEKHariEfektif = {
            "Januari": 0,
            "Februari": 0,
            "Maret": 0,
            "April": 0,
            "Mei": 0,
            "Juni": 0,
            "Juli": 0,
            "Agustus": 0,
            "September": 0,
            "Oktober": 0,
            "November": 0,
            "Desember": 0
        };
        obDataRekapKehadiran = {
            "Hadir": 0,
            "Ijin": 0,
            "Sakit": 0,
            "Alpa": 0
        };
        let tgl = new Date();
        let m = tgl.getMonth();
        let sm = tgl.getMonth() + 1;
        let d = tgl.getDate();
        let day = tgl.getDay()
        let y = tgl.getFullYear();
        let string = y + "-" + sm + "-" + d;
        let arraynamaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        let teksbulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];
        htmlhariini.innerHTML = "Kehadiran Hari Ini " + arraynamaHari[day] + ", " + d + " " + teksbulan[m] + " " + y; // + tanggalfull(string)
        jsonlocalstoragetypeuser = JSON.parse(localStorage.getItem("typeuser"));
        namauser = jsonlocalstoragetypeuser.user;
        gmpkelas = jsonlocalstoragetypeuser.akses;
        idguru = jsonlocalstoragetypeuser.idrow;
        idimage = jsonlocalstoragetypeuser.idimg; //
        idgurumapelmapel = jsonlocalstoragetypeuser.room;
        idGuruKelas = jsonlocalstoragetypeuser.user;
        idNipGuruKelas = jsonlocalstoragetypeuser.nip_guru;
        idNamaKepsek = jsonlocalstoragetypeuser.nama_kepsek;
        idNipKepsek = jsonlocalstoragetypeuser.nip_kepsek;
        idJenisGuru = jsonlocalstoragetypeuser.akses;
        idNoWa = jsonlocalstoragetypeuser.no_wa;
        idSemester = jsonlocalstoragetypeuser.idsemester;
        idTeksTapel = jsonlocalstoragetypeuser.tekstapel;
        jsonlocalstorage = JSON.parse(localStorage.getItem("inst_id"));
        linkDataUserWithIdss = jsonlocalstorage.url_datauser + "?idss=" + jsonlocalstorage.ss_datauser;
        linkAbsenKaldik = jsonlocalstorage.url_dataabsen + "?idss=" + jsonlocalstorage.ss_dataabsen;
        url_absenkaldik = jsonlocalstorage.url_dataabsen + "?action=datakaldik&idss=" + jsonlocalstorage.ss_dataabsen
        let idInstansi = JSON.parse(localStorage.getItem("inst_id"));
        idNamaSekolah = idInstansi.namainstansi;
        // loadingAPI.style.display = "block";
        // infoloadingAPI.innerHTML = "Sedang memproses Kalender Pendidikan ..."
        //
        await fetch(url_absenkaldik).then(m => m.json()).then(k => {
            localStorage.setItem('Kaldik', JSON.stringify(k.records));
            localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl))

            arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
            arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));
            // loadingAPI.style.display = "none";
            // infoloadingAPI.innerHTML = "";

        }).catch(er => {
            console.log("muat ulang: " + er);
            //infoloadingAPI.innerHTML = "Ups, maaf. Terjadi Kesalahan... Coba lagi ya ...."
        });

        namasekolah.innerHTML = namauser;
        namakota.innerHTML = gmpkelas + " " + idgurumapelmapel;
        var logo = document.getElementById("logosekolahmenu");
        logo.setAttribute("src", "https://drive.google.com/uc?export=view&id=" + idimage);
        logo.setAttribute("alt", "Poto Guru");
        logo.setAttribute("style", "width:90px; height:90px");

        if (navigator.storage && navigator.storage.estimate) {
            const quota = await navigator.storage.estimate();
            const percentageUsed = (quota.usage / quota.quota) * 100;
            console.log(`You've used ${percentageUsed}% of the available storage.`);
            const remaining = quota.quota - quota.usage;
            console.log(`You can write up to ${remaining} more bytes.`);
        }
        dashboardgurukelas.innerHTML = idJenisGuru + " " + idgurumapelmapel + " ( " + namauser + " )";
        let gmpbuatselectrombeol = document.createElement("option");
        gmpbuatselectrombeol.setAttribute("id", "awal");
        gmpbuatselectrombeol.setAttribute("value", "none")
        let teks = document.createTextNode("PILIH KELAS")
        gmpbuatselectrombeol.appendChild(teks)
        gmppilihrombel.innerHTML = "";
        gmppilihrombel.appendChild(gmpbuatselectrombeol);
        // loadingAPI.style.display = "block";
        // infoloadingAPI.innerHTML = "Sedang memproses Identitas Guru"

        await fetch(linkDataUserWithIdss + "&action=profilguru&id=" + idguru)
            .then(m => m.json())
            .then(k => {
                let gmpdataguru = k.profil[0].kelasampu.replace(/\s+/g, "").split(",")
                for (let a = 0; a < gmpdataguru.length; a++) {
                    gmpbuatselectrombeol = document.createElement("option");
                    gmpbuatselectrombeol.setAttribute("id", gmpdataguru[a]);
                    gmpbuatselectrombeol.setAttribute("value", gmpdataguru[a])
                    let teks = document.createTextNode("KELAS " + gmpdataguru[a])
                    gmpbuatselectrombeol.appendChild(teks)
                    gmppilihrombel.appendChild(gmpbuatselectrombeol);
                }
                // loadingAPI.style.display = "";
                // infoloadingAPI.innerHTML = "";

            })
            .catch(er => {
                console.log(er)
                // loadingAPI.style.display = "block";
                // infoloadingAPI.innerHTML = "Ups, Terjadi Kesalahan. Silakan coba lagi nanti. <br>Kode Eror: " + er
            });
        clearInterval(stoploadingtopbar);
        divlod = document.querySelector(".loadingtopbar");
        divlod.style.width = "100%";
        setTimeout(() => {
            divlod.style.width = "1px"
            divlod.className += " w3-hide";

        }, 3000);
    })();

const fngmppilihrombel = async () => {
    loadingtopbarin("loadingtopbar");
    let x = document.getElementById("gmppilihrombel").selectedIndex;
    let y = document.getElementById("gmppilihrombel").options;
    ruangankelas = y[x].value
    idNamaKelas = y[x].value;
    idJenjang = y[x].value.slice(0, 1); //y[x].value.match(/(\d+)/)[0];
    let ddurl = "url_nilaikelas" + idJenjang;
    constlinknilai = jlo[ddurl];
    constpreviewljk = jlo[ddurl];
    // if (localStorage.hasOwnProperty("datasiswa_" + ruangankelas)) {
    //     jsondatasiswa = JSON.parse(localStorage.getItem("datasiswa_" + ruangankelas)).datasiswa;
    //     tabeldatakelassaya();
    // } else {
    // loadingAPI.style.display = "block";
    // infoloadingAPI.innerHTML = "Sedang memproses Data Siswa Kelas " + ruangankelas + ", Mohon tunggu....";
    await fetch(linkDataUserWithIdss + "&action=datasiswaaktif&kelas=" + ruangankelas)
        .then(m => m.json())
        .then(k => {

            jsondatasiswa = k.datasiswa;
            localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(k));
            tabeldatakelassaya();
        }).catch(er => {
            console.log("muat ulang lagi: " + er);
            // infoloadingAPI.innerHTML = "Maaf, Terjadi Kesalahan. Coba lagi nanti. <br>Kode error : " + er + " <br>row: 231"
        });;
    // };


    await buattabelrekapsemester();
    clearInterval(stoploadingtopbar);
    divlod = document.querySelector(".loadingtopbar");
    divlod.style.width = "100%";
    setTimeout(() => {
        divlod.style.width = "1px"
        divlod.className += " w3-hide";

    }, 3000);
}

const updateDatasiswa = () => {
    loadingAPI.style.display = "block";
    infoloadingAPI.innerHTML = "Sedang memproses Update Data Siswa ..."
    fetch(linkDataUserWithIdss + "&action=datasiswaaktif&kelas=" + ruangankelas)
        .then(m => m.json())
        .then(k => {
            loadingAPI.style.display = "none";
            infoloadingAPI.innerHTML = ""
            jsondatasiswa = k.datasiswa;
            localStorage.setItem("datasiswa", JSON.stringify(k));
        }).catch(er => {
            infoloadingAPI.innerHTML = "Maaf, Terjadi Kesalahan. Coba lagi nanti. <br>brs : 254<br> kode : " + er
        })
}

function updatetabeldatakelassaya() { // Versi ngambil data dari TAB SPREADSHEET .... coba versi ngambil data dari NOTEPAD
    loadkelassaya.innerHTML = "<i class='fa fa-spinner fa-spin w3-xxxlarge'></i>";
    var tempattabel = document.getElementById("tabeltempatdaftarkelassaya");
    tempattabel.innerHTML = "";
    tempattabel.innerHTML = "<h3>Daftar Siswa Kelas " + ruangankelas + "</div>";

    var tb = document.createElement("table")
    tb.setAttribute("class", "versi-table");
    tb.setAttribute("id", "myTable");
    var tr = tb.insertRow(0);
    var td2 = document.createElement("th");
    td2.innerHTML = "No. Urut";
    tr.appendChild(td2);
    var td1 = document.createElement("th");
    td1.innerHTML = "Token siswa";
    tr.appendChild(td1);
    var td4 = document.createElement("th");
    td4.innerHTML = "No Induk Sekolah";
    tr.appendChild(td4);
    var td7 = document.createElement("th");
    td7.innerHTML = "N I S N";
    tr.appendChild(td7);
    var td5 = document.createElement("th");
    td5.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;");
    td5.innerHTML = "Nama Siswa";
    tr.appendChild(td5);
    var td6 = document.createElement("th");
    td6.innerHTML = "Jenis Kelamin";
    tr.appendChild(td6);
    var td3 = document.createElement("th");
    td3.innerHTML = "Agama";
    tr.appendChild(td3);
    var td11 = document.createElement("th");
    var td8 = document.createElement("th");
    td8.innerHTML = "Tempat Lahir";
    tr.appendChild(td8);
    var td9 = document.createElement("th");
    td9.innerHTML = "Tanggal Lahir";
    tr.appendChild(td9);
    td11.innerHTML = "Nama Ayah";
    tr.appendChild(td11);
    var td12 = document.createElement("th");
    td12.innerHTML = "Nama Ibu";
    tr.appendChild(td12);
    var td10 = document.createElement("th");
    td10.innerHTML = "Alamat";
    tr.appendChild(td10);
    var td14 = document.createElement("th");
    td14.innerHTML = "No HP";
    tr.appendChild(td14);
    let umur6tahun = 0;
    let umurP6tahun = 0;
    let umur7tahun = 0;
    let umurP7tahun = 0;
    let umur13tahun = 0;
    let umurP13tahun = 0;
    for (var i = 0; i < jsondatasiswa.length; i++) {
        let umur = umure(jsondatasiswa[i].pd_tanggallahir)
        let umurtahun = umur.tahun;
        if (umurtahun <= 6 && jsondatasiswa[i].pd_jk == "L") {
            umur6tahun += 1;
        }
        if (umurtahun >= 7 && umurtahun <= 12 && jsondatasiswa[i].pd_jk == "L") {
            umur7tahun++;
        }
        if (umurtahun >= 13 && jsondatasiswa[i].pd_jk == "L") {
            umur13tahun += 1;
        }
        if (umurtahun <= 6 && jsondatasiswa[i].pd_jk == "P") {
            umurP6tahun += 1;
        }
        if (umurtahun >= 7 && umurtahun <= 12 && jsondatasiswa[i].pd_jk == "P") {
            umurP7tahun += 1;
        }
        if (umurtahun >= 13 && jsondatasiswa[i].pd_jk == "P") {
            umurP13tahun += 1;
        }
        tr = tb.insertRow(-1);
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = (i * 1) + 1; // nourut (1)
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].id;
        // var btnn = document.createElement("button");
        // btnn.setAttribute("onclick", "alert('Maaf, hanya bisa diakses guru kelas')");
        // btnn.innerHTML = "Edit";
        // var btnnn = document.createElement("button");
        // btnnn.setAttribute("onclick", "alert('Maaf, hanya bisa diakses Guru Kelas')");
        // btnnn.innerHTML = "Hapus";
        // tabcell.appendChild(btnn);
        // tabcell.appendChild(btnnn); // ------------> isi sel tombol(2)
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].nis; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].nisn; //
        var tabcell = tr.insertCell(-1);
        tabcell.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;");
        tabcell.innerHTML = jsondatasiswa[i].pd_nama.toUpperCase(); // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_jk; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_agama; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_tl; // 
        var tabcell = tr.insertCell(-1)
        var da = jsondatasiswa[i].pd_tanggallahir || "";
        tabcell.innerHTML = da ? tanggalfull(jsondatasiswa[i].pd_tanggallahir) : "";
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_namaayah; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_namaibu; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_alamat; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_hp; // 
    }
    tbljumlahsiswa.innerHTML = jsondatasiswa.length;
    tbljumlahlakilaki.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
            return true;
        }
    }).length + " siswa";
    tbljumlahperempuan.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
            return true;
        }
    }).length + " siswa";
    usiaL6tahun.innerHTML = umur6tahun + " Siswa"
    usiaP6tahun.innerHTML = umurP6tahun + " Siswa"
    usiaL7tahun.innerHTML = umur7tahun + " Siswa"
    usiaP7tahun.innerHTML = umurP7tahun + " Siswa"
    usiaL13tahun.innerHTML = umur13tahun + " Siswa"
    usiaP13tahun.innerHTML = umurP13tahun + " Siswa"
    tblberagamaislam.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "ISLAM" || lk.pd_agama == "Islam" || lk.pd_agama == "islam") {
            return true;
        }
    }).length + " siswa";
    tblberagamakristen.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KRISTEN" ||
            lk.pd_agama == "Kristen" ||
            lk.pd_agama == "kristen" ||
            lk.pd_agama == "PROTESTAN" || lk.pd_agama == "Protestan") {
            return true;
        }
    }).length + " siswa";
    tblberagamakatholik.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katolik" || lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katholik" || lk.pd_agama == "katholik") {
            return true;
        }
    }).length + " siswa";
    tblberagamahindu.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "HINDU" || lk.pd_agama == "Hindu" || lk.pd_agama == "hindu") {
            return true;
        }
    }).length + " siswa";
    tblberagamabudha.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "BUDHA" || lk.pd_agama == "BUDA" || lk.pd_agama == "Budha" || lk.pd_agama == "Buda" || lk.pd_agama == "buda") {
            return true;
        }
    }).length + " siswa";
    tblberagamaislamL.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "ISLAM" || lk.pd_agama == "Islam" || lk.pd_agama == "islam") {
            if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                return true;
            }
        }
    }).length + " siswa";
    tblberagamakristenL.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KRISTEN" ||
            lk.pd_agama == "Kristen" ||
            lk.pd_agama == "kristen" ||
            lk.pd_agama == "PROTESTAN" || lk.pd_agama == "Protestan") {
            if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                return true;
            }
        }
    }).length + " siswa";
    tblberagamakatholikL.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katolik" || lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katholik" || lk.pd_agama == "katholik") {
            if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                return true;
            }
        }
    }).length + " siswa";
    tblberagamahinduL.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "HINDU" || lk.pd_agama == "Hindu" || lk.pd_agama == "hindu") {
            if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                return true;
            }
        }
    }).length + " siswa";
    tblberagamabudhaL.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "BUDHA" || lk.pd_agama == "BUDA" || lk.pd_agama == "Budha" || lk.pd_agama == "Buda" || lk.pd_agama == "buda") {
            if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                return true;
            }
        }
    }).length + " siswa";
    tblberagamaislamP.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "ISLAM" || lk.pd_agama == "Islam" || lk.pd_agama == "islam") {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }
    }).length + " siswa";
    tblberagamakristenP.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KRISTEN" ||
            lk.pd_agama == "Kristen" ||
            lk.pd_agama == "kristen" ||
            lk.pd_agama == "PROTESTAN" || lk.pd_agama == "Protestan") {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }
    }).length + " siswa";
    tblberagamakatholikP.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katolik" || lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katholik" || lk.pd_agama == "katholik") {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }
    }).length + " siswa";
    tblberagamahinduP.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "HINDU" || lk.pd_agama == "Hindu" || lk.pd_agama == "hindu") {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }
    }).length + " siswa";
    tblberagamabudhaP.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "BUDHA" || lk.pd_agama == "BUDA" || lk.pd_agama == "Budha" || lk.pd_agama == "Buda" || lk.pd_agama == "buda") {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }
    }).length + " siswa";
    loadkelassaya.innerHTML = "";
    tempattabel.appendChild(tb);
    var btnx = document.createElement("hr");
    btnx.setAttribute("style", "border-top:1px solid blue");
    tempattabel.appendChild(btnx);
}

function tabeldatakelassaya() { // Versi ngambil data dari TAB SPREADSHEET .... coba versi ngambil data dari NOTEPAD
    let valuekelas = document.getElementById("gmppilihrombel").value;
    if (valuekelas == "none") {
        alert("Anda belum memilih kelas. Silakan pilih Kelas terlebih dulu")
        return
    }
    tampilinsublamangurukelas("datakelas");
    loadkelassaya.innerHTML = "<i class='fa fa-spinner fa-spin w3-xxxlarge'></i>";
    var tempattabel = document.getElementById("tabeltempatdaftarkelassaya");
    tempattabel.innerHTML = "";
    tempattabel.innerHTML = "<h3>Daftar Siswa Kelas " + ruangankelas + "</div>";
    var tb = document.createElement("table")
    tb.setAttribute("class", "versi-table");
    tb.setAttribute("id", "myTable");
    let thead = tb.createTHead();
    var tr = thead.insertRow(0);
    var td2 = document.createElement("th");
    td2.innerHTML = "No. Urut";
    tr.appendChild(td2);
    var td1 = document.createElement("th");
    td1.innerHTML = "Token";
    tr.appendChild(td1);
    var td4 = document.createElement("th");
    td4.innerHTML = "No Induk Sekolah";
    tr.appendChild(td4);
    var td7 = document.createElement("th");
    td7.innerHTML = "N I S N";
    tr.appendChild(td7);
    var td5 = document.createElement("th");
    td5.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;");
    td5.innerHTML = "Nama Siswa";
    tr.appendChild(td5);
    var td6 = document.createElement("th");
    td6.innerHTML = "Jenis Kelamin";
    tr.appendChild(td6);
    var td3 = document.createElement("th");
    td3.innerHTML = "Agama";
    tr.appendChild(td3);
    var td11 = document.createElement("th");
    var td8 = document.createElement("th");
    td8.innerHTML = "Tempat Lahir";
    tr.appendChild(td8);
    var td9 = document.createElement("th");
    td9.innerHTML = "Tanggal Lahir";
    tr.appendChild(td9);
    td11.innerHTML = "Nama Ayah";
    tr.appendChild(td11);
    var td12 = document.createElement("th");
    td12.innerHTML = "Nama Ibu";
    tr.appendChild(td12);
    var td10 = document.createElement("th");
    td10.innerHTML = "Alamat";
    tr.appendChild(td10);
    var td14 = document.createElement("th");
    td14.innerHTML = "No HP";
    tr.appendChild(td14);
    let umur6tahun = 0;
    let umurP6tahun = 0;
    let umur7tahun = 0;
    let umurP7tahun = 0;
    let umur13tahun = 0;
    let umurP13tahun = 0;
    let tbody = tb.createTBody();
    for (var i = 0; i < jsondatasiswa.length; i++) {
        let umur = umure(jsondatasiswa[i].pd_tanggallahir)
        let umurtahun = umur.tahun;
        if (umurtahun <= 6 && jsondatasiswa[i].pd_jk == "L") {
            umur6tahun += 1;
        }
        if (umurtahun >= 7 && umurtahun <= 12 && jsondatasiswa[i].pd_jk == "L") {
            umur7tahun++;
        }
        if (umurtahun >= 13 && jsondatasiswa[i].pd_jk == "L") {
            umur13tahun += 1;
        }
        if (umurtahun <= 6 && jsondatasiswa[i].pd_jk == "P") {
            umurP6tahun += 1;
        }
        if (umurtahun >= 7 && umurtahun <= 12 && jsondatasiswa[i].pd_jk == "P") {
            umurP7tahun += 1;
        }
        if (umurtahun >= 13 && jsondatasiswa[i].pd_jk == "P") {
            umurP13tahun += 1;
        }
        tr = tbody.insertRow(-1);
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = (i * 1) + 1; // nourut (1)
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].id;
        // var btnn = document.createElement("button");
        // btnn.setAttribute("onclick", "alert('Maaf, hanya bisa diakses guru kelas')");
        // btnn.innerHTML = "Edit";
        // var btnnn = document.createElement("button");
        // btnnn.setAttribute("onclick", "alert('Maaf, hanya bisa diakses Guru Kelas')");
        // btnnn.innerHTML = "Hapus";
        // tabcell.appendChild(btnn);
        // tabcell.appendChild(btnnn); // ------------> isi sel tombol(2)
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].nis; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].nisn; //
        var tabcell = tr.insertCell(-1);
        tabcell.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;");
        tabcell.innerHTML = jsondatasiswa[i].pd_nama.toUpperCase(); // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_jk; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_agama; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_tl; // 
        var tabcell = tr.insertCell(-1)
        var da = jsondatasiswa[i].pd_tanggallahir || "";
        tabcell.innerHTML = da ? tanggalfull(jsondatasiswa[i].pd_tanggallahir) : "";
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_namaayah; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_namaibu; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_alamat; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_hp; // 
    }
    tbljumlahsiswa.innerHTML = jsondatasiswa.length;
    tbljumlahlakilaki.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
            return true;
        }
    }).length + " siswa";
    tbljumlahperempuan.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
            return true;
        }
    }).length + " siswa";
    usiaL6tahun.innerHTML = umur6tahun + " Siswa"
    usiaP6tahun.innerHTML = umurP6tahun + " Siswa"
    usiaL7tahun.innerHTML = umur7tahun + " Siswa"
    usiaP7tahun.innerHTML = umurP7tahun + " Siswa"
    usiaL13tahun.innerHTML = umur13tahun + " Siswa"
    usiaP13tahun.innerHTML = umurP13tahun + " Siswa"
    tblberagamaislam.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "ISLAM" || lk.pd_agama == "Islam" || lk.pd_agama == "islam") {
            return true;
        }
    }).length + " siswa";
    tblberagamakristen.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KRISTEN" ||
            lk.pd_agama == "Kristen" ||
            lk.pd_agama == "kristen" ||
            lk.pd_agama == "PROTESTAN" || lk.pd_agama == "Protestan") {
            return true;
        }
    }).length + " siswa";
    tblberagamakatholik.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katolik" || lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katholik" || lk.pd_agama == "katholik") {
            return true;
        }
    }).length + " siswa";
    tblberagamahindu.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "HINDU" || lk.pd_agama == "Hindu" || lk.pd_agama == "hindu") {
            return true;
        }
    }).length + " siswa";
    tblberagamabudha.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "BUDHA" || lk.pd_agama == "BUDA" || lk.pd_agama == "Budha" || lk.pd_agama == "Buda" || lk.pd_agama == "buda") {
            return true;
        }
    }).length + " siswa";
    tblberagamaislamL.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "ISLAM" || lk.pd_agama == "Islam" || lk.pd_agama == "islam") {
            if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                return true;
            }
        }
    }).length + " siswa";
    tblberagamakristenL.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KRISTEN" ||
            lk.pd_agama == "Kristen" ||
            lk.pd_agama == "kristen" ||
            lk.pd_agama == "PROTESTAN" || lk.pd_agama == "Protestan") {
            if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                return true;
            }
        }
    }).length + " siswa";
    tblberagamakatholikL.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katolik" || lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katholik" || lk.pd_agama == "katholik") {
            if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                return true;
            }
        }
    }).length + " siswa";
    tblberagamahinduL.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "HINDU" || lk.pd_agama == "Hindu" || lk.pd_agama == "hindu") {
            if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                return true;
            }
        }
    }).length + " siswa";
    tblberagamabudhaL.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "BUDHA" || lk.pd_agama == "BUDA" || lk.pd_agama == "Budha" || lk.pd_agama == "Buda" || lk.pd_agama == "buda") {
            if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                return true;
            }
        }
    }).length + " siswa";
    tblberagamaislamP.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "ISLAM" || lk.pd_agama == "Islam" || lk.pd_agama == "islam") {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }
    }).length + " siswa";
    tblberagamakristenP.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KRISTEN" ||
            lk.pd_agama == "Kristen" ||
            lk.pd_agama == "kristen" ||
            lk.pd_agama == "PROTESTAN" || lk.pd_agama == "Protestan") {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }
    }).length + " siswa";
    tblberagamakatholikP.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katolik" || lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katholik" || lk.pd_agama == "katholik") {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }
    }).length + " siswa";
    tblberagamahinduP.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "HINDU" || lk.pd_agama == "Hindu" || lk.pd_agama == "hindu") {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }
    }).length + " siswa";
    tblberagamabudhaP.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "BUDHA" || lk.pd_agama == "BUDA" || lk.pd_agama == "Budha" || lk.pd_agama == "Buda" || lk.pd_agama == "buda") {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }
    }).length + " siswa";
    loadkelassaya.innerHTML = "";

    tempattabel.appendChild(tb);
    var btnx = document.createElement("hr");
    btnx.setAttribute("style", "border-top:1px solid blue");
    tempattabel.appendChild(btnx);
}


function tampilinsublamangurukelas(fitur) {
    if (fitur == "datakelas") {
        datakelassaya.style.display = "block";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataframekreatif.style.display = "none";
        document.getElementById("batasaksesguru").scrollIntoView();
    } else if (fitur == "absen") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "block";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataframekreatif.style.display = "none";
        document.getElementById("batasaksesguru").scrollIntoView();

    } else if (fitur == "pembelajaran") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "block";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataframekreatif.style.display = "none";
        upload_materi.style.display = "none";

        document.getElementById("batasaksesguru").scrollIntoView();
    } else if (fitur == "kurikulum") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "block";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataframekreatif.style.display = "none";
        document.getElementById("batasaksesguru").scrollIntoView();
    } else if (fitur == "mapel") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "block";
        datakehadiranguru.style.display = "none";
        dataframekreatif.style.display = "none";
        document.getElementById("batasaksesguru").scrollIntoView();
    } else if (fitur == "kehadiranguru") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "block";
        dataframekreatif.style.display = "none";


        document.getElementById("batasaksesguru").scrollIntoView();
    } else if (fitur == "meme") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        // dataraport.style.display = "none";
        dataframekreatif.style.display = "block";



        document.getElementById("batasaksesguru").scrollIntoView();
    }

    w3_close();
}


const profilguru = async () => {
    modaledituser.style.display = "block";
    formedituser.style.display = "block";
    prosesloadingdaftaredit.innerHTML = ""; //<i class='fa fa-spin fa-spinner w3-xxxlarge'><i> sedang mencari data Anda..";
    registrasikanedit.style.display = "block";
    judulpetunjukedit.innerHTML = "<i class='fa fa-spin fa-spinner w3-xxxlarge'><i>"
    w3_close();
    loadingAPI.style.display = "block";
    infoloadingAPI.innerHTML = "Sedang memproses Profil Guru ..."
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
                                elementform[x].value = nilai[d] //;
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
            loadingAPI.style.display = "none";
            infoloadingAPI.innerHTML = ""
        }).catch(er => {
            infoloadingAPI.innerHTML = "Maaf, terjadi kesalahan. Coba lagi nanti.<br>row : 958 <br>kode : " + er
        })
}

function logout() {
    tabeltempatdaftarkelassaya.innerHTML = "";
    w3_close();
    window.localStorage.clear();
    window.location.replace("/index.html")
}

async function pembelajaran() {
    loadingtopbarin("loadingtopbar");
    let valuekelas = document.getElementById("gmppilihrombel").value;
    if (valuekelas == "none") {
        alert("Anda belum memilih kelas. Silakan pilih Kelas terlebih dulu")
        return

    }
    await kurikulumdiamdiam();
    tampilinsublamangurukelas("pembelajaran");
    timelinekbm.style.display = "block";

    fetch(linkmateri + "&action=kronolog&idtoken=" + idJenjang)
        .then(m => m.json())
        .then(j => {

            let kk = j.result.filter(k => k.kuncikd.indexOf(idgurumapelmapel + "_") > -1)
            templatekronologi(kk);
            kronologijson = kk;
            clearInterval(stoploadingtopbar);
            let divlod = document.querySelector(".loadingtopbar");
            divlod.style.width = "100%";
            setTimeout(() => {
                divlod.style.width = "1px"
                divlod.className += " w3-hide";

            }, 3000);

        }).catch(er => {
            loadingAPI.style.display = "block";

            infoloadingAPI.innerHTML = "Maaf, terjadi kesalahan. Coba lagi nanti. <br>row : 991<br>kode : " + er
        })
}

function templatekronologi(jsonmateri) {
    let temp = `<div class="kronologi">`
    for (let i = jsonmateri.length - 1; i >= 0; i--) {
        let idtgl = tanggalfull(jsonmateri[i].idtgl);
        let judulmateri = jsonmateri[i].idmapel;
        let kelasmateri = jsonmateri[i].idkelas;
        let waktuawal = jsonmateri[i].idtgl;
        let waktuakhir = jsonmateri[i].idtglend;
        let jenistgh = jsonmateri[i].jenistagihan;
        let akses = jsonmateri[i].idaksessiswa;
        let jpg = jsonmateri[i].jumlahpg;
        let jess = jsonmateri[i].jumlahessay;
        let jeniskbm = (akses == "sekali") ? "ULANGAN <br><sub>Menerima Tugas Siswa</sub>" : "LATIHAN<br><sub>Tidak Menerima Tugas</sub>";
        let jenispenilaian = (akses == "sekali") ? jenistgh : "<sub class='w3-text-red'>-Tidak Menerima Nilai-</sub>";
        let tombolnilai = (akses == "sekali") ? `<button class="w3-button w3-teal w3-hover-sepia" onclick="daftarnilaikronologi('${i}')"><i class="fa fa-graduation-cap"></i></button>` : "Tidak Menerima ";
        let oleh = jsonmateri[i].dibuatoleh;
        let aksi = jsonmateri[i].action;
        let buatapaedit = (aksi == "uploadmateri") ? "Dibuat oleh:" : "Diedit oleh";
        let tmblprev = `<button class="w3-button w3-blue w3-hover-red" onclick="previewkronologi('${i}')"><i class="fa fa-eye"></i></button>`;
        let tmbledit = `<button class="w3-button w3-green  w3-blue w3-hover-red" onclick="editkronologi('${i}')"><i class="fa fa-edit"></i></button>`;
        let editfilemateri = `<button class="w3-button w3-red  w3-blue w3-hover-red" onclick="editfilemateri('${i}')"><i class="fa fa-edit"></i></button>`;
        let adacrtToken = jsonmateri[i].crtToken;
        let statuscrtToken = (adacrtToken == "") ? `<b class='w3-text-red'>&times; Tidak Tampil </b><br>(Waktu Awal gagal menggenerate)<br><button class='w3-button w3-black w3-hover-white' onclick="fnv7perbaikikonten('${i}')"><i class='fa fa-clock-o'></i> Perbaiki</button>` : "<b class='w3-text-blue' >&checkmark; Tampil di siswa </b> dengan kode Token " + adacrtToken;
        let statusijinkonten = (jsonmateri[i].idpendaftar == "") ? `<b class='w3-text-blue w3-hover-cyan'>&checkmark; Diijinkan</b><br><button class='w3-red w3-button w3-hover-blue' onclick="ubahijinpublik('${i}')">Privat</button>` : `<b class='w3-text-red'>&times; Tidak diijinkan</br><button class='w3-blue w3-button w3-hover-cyan'  onclick="ubahijinpublik('${i}')">Ijinkan</button>`;

        if (i % 2 == 0) { //klo genap
            temp += `<div class="isi kiri"> 
            <div class="konten">
            <i class="fa fa-trash-o w3-hover-red w3-right w3-xxlarge" onclick="fnv7hapusmateri('${i}')" title="Hapus Materi Ini"></i>

                        <h3>${judulmateri.toUpperCase()}</h3>
                        <div style="overflow-x:auto">
                        <table class="w3-table-all w3-card-4 w3-hoverable w3-small">
                            <tr>
                                <td>
                                    Jenis KBM:
                                </td>
                                <td>    
                                    ${jeniskbm} 
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Jenis Penilaian:
                                </td>
                                <td>    
                                    ${jenispenilaian}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Waktu Mulai:
                                </td>
                                <td>    
                                    ${tanggalfulllengkap(new Date(waktuawal))}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Waktu Akhir:
                                </td>
                                <td>    
                                    ${tanggalfulllengkap(new Date(waktuakhir))}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                  Jumlah Soal PG:
                                </td>
                                <td>    
                                    ${jpg}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                  Jumlah Soal Essay:
                                </td>
                                <td>    
                                    ${jess}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   ${buatapaedit}:
                                </td>
                                <td>    
                                    ${oleh}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   Pratinjau:
                                </td>
                                <td>    
                                    ${tmblprev}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   Edit Akses:
                                </td>
                                <td>    
                                    ${tmbledit}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   Edit Konten Materi:
                                </td>
                                <td>    
                                    ${editfilemateri}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   Lihat Nilai Siswa:
                                </td>
                                <td>    
                                    ${tombolnilai}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   Baris Database Materi:
                                </td>
                                <td>    
                                    ${jsonmateri[i].idbaris}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   Status di e-Lamaso Siswa:
                                </td>
                                <td>    
                                    ${statuscrtToken}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   Sekolah Lain Boleh Meniru ini
                                </td>
                                <td>    
                                    ${statusijinkonten}
                                </td>
                            </tr>
                        </table>
                        </div>
                    </div>
                </div>`

        } else {
            temp += `<div class="isi kanan" style="overflow-x:auto">

            <div class="konten">
            <i class="fa fa-trash-o w3-hover-red w3-right w3-xxlarge" onclick="fnv7hapusmateri('${i}')" title="Hapus Materi Ini"></i>
                        <h3>${judulmateri.toUpperCase()}</h3>
                        <div style="overflow-x:auto">
                        <table class="w3-table-all w3-card-4 w3-hoverable w3-small">
                            <tr>
                                <td>
                                    Jenis KBM:
                                </td>
                                <td>    
                                    ${jeniskbm} 
                            </tr>
                            <tr>
                                <td>
                                    Jenis Penilaian:
                                </td>
                                <td>    
                                    ${jenispenilaian}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Waktu Mulai:
                                </td>
                                <td>    
                                    ${tanggalfulllengkap(new Date(waktuawal))}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Waktu Akhir:
                                </td>
                                <td>    
                                    ${tanggalfulllengkap(new Date(waktuakhir))}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                  Jumlah Soal PG:
                                </td>
                                <td>    
                                    ${jpg}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                  Jumlah Soal Essay:
                                </td>
                                <td>    
                                    ${jess}
                                </td>
                            </tr>
                             <tr>
                                <td>
                                   ${buatapaedit}:
                                </td>
                                <td>    
                                    ${oleh}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   Pratinjau:
                                </td>
                                <td>    
                                    ${tmblprev}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   Edit Akses:
                                </td>
                                <td>    
                                    ${tmbledit}
                                </td>
                            </tr>
                            <tr>
                            <td>
                               Edit Konten Materi:
                            </td>
                            <td>    
                                ${editfilemateri}
                            </td>
                        </tr>

                            <tr>
                                <td>
                                   Lihat Nilai Siswa:
                                </td>
                                <td>    
                                    ${tombolnilai}
                                </td>
                            </tr><tr>
                            <td>
                               Baris Database Materi:
                            </td>
                            <td>    
                                ${jsonmateri[i].idbaris}
                            </td>
                        </tr>
                            <tr>
                                <td>
                                   Status di e-Lamaso Siswa:
                                </td>
                                <td>    
                                    ${statuscrtToken}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   Sekolah Lain Boleh Meniru ini
                                </td>
                                <td>    
                                    ${statusijinkonten}
                                </td>
                            </tr>
                        </table>
                        </div>
                    </div>
                </div>`
        }
    }
    temp += `</div>`

    timelinekbm.innerHTML = `<button class="w3-button w3-red w3-hover-blue w3-round-large" onclick="fnv7kotenmateridihapusmapel('${idJenjang}')"> Daftar Materi yang dihapus</button><hr><h4>Materi di Jenjang Kelas Anda yang dipublikasikan:</h4>` + temp;
}





function raportkelas() {
    alert("Maaf, fitur belum tersedia")
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



var mySidebar = document.getElementById("mySidebar"); // Get the Sidebar
var overlayBg = document.getElementById("myOverlay"); // Get the DIV with overlay effect

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

const cekDiskLocalStorage = async () => {
    if (navigator.storage && navigator.storage.estimate) {
        const quota = await navigator.storage.estimate();
        const percentageUsed = (quota.usage / quota.quota) * 100;
        console.log(`dipake: ${quota.usage}`)
        console.log(`You've used ${percentageUsed}% of the available storage.`);
        const remaining = quota.quota - quota.usage;
        console.log(`You can write up to ${remaining} more bytes.`);
    }
}

const animasimove = (el) => {
    var elem = document.querySelector("." + el);
    var width = 1;
    idinterval = setInterval(frame, 10);

    function frame() {
        if (width >= 8000) {
            clearInterval(idinterval);
            // elem.style.width = 0;
            // elem.style.width = 90 + '%';
            // elem.innerHTML = `100%`;
        } else {
            width += 10;
            elem.style.width = width / 10 + '%';
            elem.innerHTML = (width / 105).toFixed(0) + "% ";
        }
    }

};