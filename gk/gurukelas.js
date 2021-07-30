let jsonlocalstorage, jsonlocalstoragetypeuser, linkdatauser;
let linkDataUserWithIdss, linkAbsenKaldik // digunakan untuk link yang mengakses SS DataUSer (guru/siswa)
let namauser, ruangankelas, gmpkelas
let idguru = "",
    idgurubaru = "";
let jsondatasiswa = [],
    arrayStringTglLibur = [];
let arraydatasiswadariimport = [];
let idNamaSekolah, idNamaKelas, idGuruKelas, idNipGuruKelas,
    idKepsek, idNipKepsek, idSemester,
    idJenisGuru, idNoWa, idTeksTapel,
    idNamaKepsek, idJenjang;
let REKAPAbsen = {},
    OBJEKHariEfektif;
let obDataRekapKehadiran;
let idinterval
let informasiusulandata = {};
let buateditorkdaktif = [];
jsonlocalstorage = JSON.parse(localStorage.getItem("inst_id"));
let stoploadingtopbar;
const loadingtopbarin = (el) => {
        var elem = document.querySelector("." + el);
        elem.className = elem.className.replace("w3-hide", "")
        var width = 1;
        stoploadingtopbar = setInterval(frame2, 10);

        function frame2() {
            // if (width >= 1000000) {
            //     clearInterval(stoploadingtopbar);
            //     // elem.style.width = 0;
            //     // elem.style.width = 90 + '%';
            //     // elem.innerHTML = `100%`;
            // } else {
            width += 100;
            elem.style.width = width / 1000 + '%';
            //elem.innerHTML = (width / 105).toFixed(0) + "% ";
            //}
        }
    }
    (async function () {
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
        ruangankelas = jsonlocalstoragetypeuser.room;
        idguru = jsonlocalstoragetypeuser.idrow;
        idimage = jsonlocalstoragetypeuser.idimg; //
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
        let idInstansi = JSON.parse(localStorage.getItem("inst_id"));
        idNamaSekolah = idInstansi.namainstansi;
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

        namasekolah.innerHTML = namauser;
        namakota.innerHTML = gmpkelas + " " + ruangankelas;
        var logo = document.getElementById("logosekolahmenu");
        logo.setAttribute("src", "https://drive.google.com/uc?export=view&id=" + idimage);
        logo.setAttribute("alt", "Poto Guru");
        logo.setAttribute("style", "width:90px; height:90px");
        // if (localStorage.hasOwnProperty("datasiswa_" + ruangankelas)) {
        //     jsondatasiswa = JSON.parse(localStorage.getItem("datasiswa_" + ruangankelas)).datasiswa;
        // } else {
        await fetch(linkDataUserWithIdss + "&action=datasiswaaktif&kelas=" + ruangankelas)
            .then(m => m.json())
            .then(k => {
                jsondatasiswa = k.datasiswa;
                localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(k));

            }).catch(er => {
                console.log("muat ulang lagi: " + er);
                fetch(linkDataUserWithIdss + "&action=datasiswaaktif&kelas=" + ruangankelas)
                    .then(m => m.json())
                    .then(k => {
                        jsondatasiswa = k.datasiswa;
                        localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(k));

                    })
            });
        // }
        await fetch(linkDataUserWithIdss + "&action=usulanperbaikandata")
            .then(m => m.json())
            .then(k => {
                //console.log(k)
                let dataaktif = k.datasiswa.filter(s => s.aktif == "aktif");
                let usulkelasini = k.datasiswa.filter(k => (k.nama_rombel == idNamaKelas));
                let usulkelasinibelumdisetujui = dataaktif.filter(k => (k.nama_rombel == idNamaKelas && k.usulanperubahandata.indexOf("disetujui") == -1));
                // console.log(usulkelasinibelumdisetujui.length);
                // console.log(usulkelasinibelumdisetujui.length);

                let usulkelasinisudahdisetujui = dataaktif.filter(k => (k.nama_rombel == idNamaKelas && k.usulanperubahandata.indexOf("disetujui") > -1));
                informasiusulandata["usulanbaru"] = usulkelasinibelumdisetujui;
                informasiusulandata["usulandisetujui"] = usulkelasinisudahdisetujui;
                informasiusulandata["all"] = usulkelasini;


                if (usulkelasinibelumdisetujui.length !== jsondatasiswa.length) {
                    document.querySelector(".pesankhusussiswa").className = document.querySelector(".pesankhusussiswa").className.replace(" w3-hide", "");
                    document.querySelector(".pesankhusussiswa").innerHTML = `Anda memiliki ${usulkelasinibelumdisetujui.length} usulan data perubahan data baru (Daftar Ulang) dari siswa Anda yang belum disetujui (diverifikasi). Segera Verifikasi data tersebut di menu Data Kelas Anda. (Tombol informasi berwarna merah menandakan siswa yang mengusulkan perbaruan data.)
                <br/>
                <br/>
                <table class="w3-table-all w3-striped" style="width:50%;margin:0 auto">
                <caption>Tabel Pengusulan Perubahan Data (Daftar Ulang)</caption>
                    <tr>
                        <td>Jumlah Siswa</td>
                        <td>${jsondatasiswa.length}</td>
                    </tr><tr>    
                        <td>Usulan <b class="w3-text-red">Belum</b> Diverifikasi</td>
                        <td>${usulkelasinibelumdisetujui.length}</td>
                    </tr><tr>    
                    <td>Usulan <b  class="w3-text-blue">Sudah</b> Diverifikasi</th>
                        <td>${usulkelasinisudahdisetujui.length}</td>
                    </tr>
                </table>
                <hr/>
                `;

                } else {
                    if (document.querySelector(".pesankhusussiswa").className.indexOf("w3-hide") == -1) {
                        document.querySelector(".pesankhusussiswa").className += " w3-hide";
                    }
                }

            })
            .catch(er => {
                console.log(er);
            })
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

        if (navigator.storage && navigator.storage.estimate) {
            const quota = await navigator.storage.estimate();
            const percentageUsed = (quota.usage / quota.quota) * 100;
            console.log(`You've used ${percentageUsed}% of the available storage.`);
            const remaining = quota.quota - quota.usage;
            console.log(`You can write up to ${remaining} more bytes.`);
        }
        await buattabelrekapsemester();

        dashboardgurukelas.innerHTML = idJenisGuru + " " + idNamaKelas + " ( " + namauser + " )";

        clearInterval(stoploadingtopbar);
        let divlod = document.querySelector(".loadingtopbar");
        divlod.style.width = "100%";
        setTimeout(() => {
            divlod.style.width = "1px"
            divlod.className += " w3-hide";

        }, 3000);

    })();

const updateDatasiswa = () => {
    fetch(linkDataUserWithIdss + "&action=datasiswaaktif&kelas=" + ruangankelas)
        .then(m => m.json())
        .then(k => {
            jsondatasiswa = k.datasiswa;
            localStorage.setItem("datasiswa", JSON.stringify(k));
        })
};


function tabeldatakelassaya() { // Versi ngambil data dari TAB SPREADSHEET .... coba versi ngambil data dari NOTEPAD
    try {
        arraydatasiswadariimport = []
        document.getElementById("inputimportdatasiswa").value = "";
        let perluverifikasi = informasiusulandata["usulanbaru"]; //.filter(s => s.usulanperubahandata.indexOf);
        let sudahverifikasi = informasiusulandata["usulandisetujui"]; //.filter(s => s.usulanperubahandata.indexOf);
        //console.log(perluverifikasi);
        loadkelassaya.innerHTML = "<i class='fa fa-spinner fa-spin w3-xxxlarge'></i>";
        var tempattabel = document.getElementById("tabeltempatdaftarkelassaya");
        tempattabel.innerHTML = "";
        tempattabel.innerHTML = "<h3 class='w3-center w3-card-4'>Daftar Siswa Kelas " + ruangankelas + "</h3>";
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
            var bbt = document.createElement("button");
            if (perluverifikasi.filter(s => s.id == jsondatasiswa[i].id).length > 0) {
                bbt.setAttribute("class", "w3-button w3-red w3-round w3-card-4 w3-border-bottom w3-border-black w3-border-right");
            } else {
                bbt.setAttribute("class", "w3-button warnaeka w3-round w3-card-4 w3-border-bottom w3-border-black w3-border-right");
            }

            bbt.setAttribute("onclick", "detailformulir(" + jsondatasiswa[i].id + ")");
            bbt.setAttribute("title", "Detail Data Anak ini");
            bbt.innerHTML = `<span class="w3-badge w3-container">${jsondatasiswa[i].id}</span>`;
            var btnn = document.createElement("button");
            btnn.setAttribute("onclick", "editsiswa(" + i + ")");
            btnn.setAttribute("title", "Simpan Editan Anda");
            if (sudahverifikasi.filter(s => s.id == jsondatasiswa[i].id).length > 0) {
                btnn.setAttribute("class", "w3-button w3-light-green w3-round w3-card-4 w3-border-bottom w3-border-black w3-border-right");
            } else {
                btnn.setAttribute("class", "w3-button warnaeka w3-round w3-card-4 w3-border-bottom w3-border-black w3-border-right");
            }

            btnn.innerHTML = "<i class='fa fa-save  '></i>"; // (" + jsondatasiswa[i].id + ")";
            var btnnn = document.createElement("button");
            btnnn.setAttribute("onclick", "hapussiswa(" + jsondatasiswa[i].id + ")");
            btnnn.setAttribute("class", "w3-button warnaeka w3-round w3-card-4 w3-border-bottom w3-border-black w3-border-right");
            btnnn.setAttribute("title", "Hapus siswa ini dari kelas Anda");
            btnnn.innerHTML = `<i class="fa fa-trash"></i>`
            tabcell.appendChild(bbt);
            tabcell.appendChild(btnn);
            tabcell.appendChild(btnnn); // ------------> isi sel tombol(2)
            var tabcell = tr.insertCell(-1)
            tabcell.setAttribute("contenteditable", true);
            tabcell.innerHTML = jsondatasiswa[i].nis; // 
            var tabcell = tr.insertCell(-1)
            tabcell.setAttribute("contenteditable", true);
            tabcell.innerHTML = jsondatasiswa[i].nisn; //
            var tabcell = tr.insertCell(-1);
            tabcell.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;");
            tabcell.setAttribute("contenteditable", true);
            tabcell.innerHTML = jsondatasiswa[i].pd_nama.toUpperCase(); // 
            var tabcell = tr.insertCell(-1);
            tabcell.setAttribute("contenteditable", true);
            tabcell.innerHTML = jsondatasiswa[i].pd_jk; // 
            var tabcell = tr.insertCell(-1);
            tabcell.setAttribute("onclick", `editdataagamasiswa(${i})`);
            tabcell.innerHTML = jsondatasiswa[i].pd_agama; // 
            var tabcell = tr.insertCell(-1);
            tabcell.setAttribute("contenteditable", true);
            tabcell.innerHTML = jsondatasiswa[i].pd_tl; // 
            var tabcell = tr.insertCell(-1);
            tabcell.setAttribute("onclick", `editttl(${i})`)
            var da = jsondatasiswa[i].pd_tanggallahir || "";
            tabcell.innerHTML = da ? tanggalfull(jsondatasiswa[i].pd_tanggallahir) : "";
            var tabcell = tr.insertCell(-1);
            tabcell.setAttribute("contenteditable", true)
            tabcell.innerHTML = jsondatasiswa[i].pd_namaayah; // 
            var tabcell = tr.insertCell(-1);
            tabcell.setAttribute("contenteditable", true)
            tabcell.innerHTML = jsondatasiswa[i].pd_namaibu; // 
            var tabcell = tr.insertCell(-1);
            tabcell.setAttribute("contenteditable", true)
            tabcell.innerHTML = jsondatasiswa[i].pd_alamat; // 
            var tabcell = tr.insertCell(-1);
            tabcell.setAttribute("contenteditable", true)
            tabcell.innerHTML = jsondatasiswa[i].pd_hp; // 
        }

        tbljumlahsiswa.innerHTML = jsondatasiswa.length;
        tbljumlahlakilaki.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                return true;
            }
        }).length;
        tbljumlahperempuan.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }).length;
        usiaL6tahun.innerHTML = umur6tahun;
        usiaP6tahun.innerHTML = umurP6tahun;
        usiaL7tahun.innerHTML = umur7tahun;
        usiaP7tahun.innerHTML = umurP7tahun;
        usiaL13tahun.innerHTML = umur13tahun;
        usiaP13tahun.innerHTML = umurP13tahun;
        umur6total.innerHTML = jsondatasiswa.filter(s => umure(s.pd_tanggallahir).tahun <= 6).length;
        umur7total.innerHTML = jsondatasiswa.filter(s => umure(s.pd_tanggallahir).tahun >= 7 && umure(s.pd_tanggallahir).tahun <= 12).length;
        umur13total.innerHTML = jsondatasiswa.filter(s => umure(s.pd_tanggallahir).tahun >= 13).length;
        //>= 7 && umurtahun <= 12

        tblberagamaislam.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_agama == "ISLAM" || lk.pd_agama == "Islam" || lk.pd_agama == "islam") {
                return true;
            }
        }).length;
        tblberagamakristen.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_agama == "KRISTEN" ||
                lk.pd_agama == "Kristen" ||
                lk.pd_agama == "kristen" ||
                lk.pd_agama == "PROTESTAN" || lk.pd_agama == "Protestan") {
                return true;
            }
        }).length;
        tblberagamakatholik.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katolik" || lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katholik" || lk.pd_agama == "katholik") {
                return true;
            }
        }).length;
        tblberagamahindu.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_agama == "HINDU" || lk.pd_agama == "Hindu" || lk.pd_agama == "hindu") {
                return true;
            }
        }).length;
        tblberagamabudha.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_agama == "BUDHA" || lk.pd_agama == "BUDA" || lk.pd_agama == "Budha" || lk.pd_agama == "Buda" || lk.pd_agama == "buda") {
                return true;
            }
        }).length;

        tblberagamaislamL.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_agama == "ISLAM" || lk.pd_agama == "Islam" || lk.pd_agama == "islam") {
                if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                    return true;
                }
            }
        }).length;
        tblberagamakristenL.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_agama == "KRISTEN" ||
                lk.pd_agama == "Kristen" ||
                lk.pd_agama == "kristen" ||
                lk.pd_agama == "PROTESTAN" || lk.pd_agama == "Protestan") {
                if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                    return true;
                }
            }
        }).length;
        tblberagamakatholikL.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katolik" || lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katholik" || lk.pd_agama == "katholik") {
                if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                    return true;
                }
            }
        }).length;
        tblberagamahinduL.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_agama == "HINDU" || lk.pd_agama == "Hindu" || lk.pd_agama == "hindu") {
                if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                    return true;
                }
            }
        }).length;
        tblberagamabudhaL.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_agama == "BUDHA" || lk.pd_agama == "BUDA" || lk.pd_agama == "Budha" || lk.pd_agama == "Buda" || lk.pd_agama == "buda") {
                if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                    return true;
                }
            }
        }).length;

        tblberagamaislamP.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_agama == "ISLAM" || lk.pd_agama == "Islam" || lk.pd_agama == "islam") {
                if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                    return true;
                }
            }
        }).length;
        tblberagamakristenP.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_agama == "KRISTEN" ||
                lk.pd_agama == "Kristen" ||
                lk.pd_agama == "kristen" ||
                lk.pd_agama == "PROTESTAN" || lk.pd_agama == "Protestan") {
                if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                    return true;
                }
            }
        }).length;
        tblberagamakatholikP.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katolik" || lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katholik" || lk.pd_agama == "katholik") {
                if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                    return true;
                }
            }
        }).length;
        tblberagamahinduP.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_agama == "HINDU" || lk.pd_agama == "Hindu" || lk.pd_agama == "hindu") {
                if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                    return true;
                }
            }
        }).length;
        tblberagamabudhaP.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_agama == "BUDHA" || lk.pd_agama == "BUDA" || lk.pd_agama == "Budha" || lk.pd_agama == "Buda" || lk.pd_agama == "buda") {
                if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                    return true;
                }
            }
        }).length;
        tblberagamakhonghucuP.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_agama == "KHONGHUCU" || lk.pd_agama == "Khonghucu" || lk.pd_agama == "konghucu" || lk.pd_agama == "KHONG HU CU" || lk.pd_agama == "khong hucu") {
                if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                    return true;
                }
            }
        }).length;
        tblberagamakhonghucuL.innerHTML = jsondatasiswa.filter(function (lk) {
            if (lk.pd_agama == "KHONGHUCU" || lk.pd_agama == "Khonghucu" || lk.pd_agama == "konghucu" || lk.pd_agama == "KHONG HU CU" || lk.pd_agama == "khong hucu") {
                if (lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "Laki-laki" || lk.pd_jk == "L") {
                    return true;
                }
            }
        }).length;

        loadkelassaya.innerHTML = "";

        tempattabel.appendChild(tb);
        var btnx = document.createElement("hr");
        btnx.setAttribute("style", "border-top:1px solid blue");
        tempattabel.appendChild(btnx);
        tampilinsublamangurukelas("datakelas");
    } catch (err) {
        tampilinsublamangurukelas("beranda");
        console.log(err)
        alert("Laman Belum Siap");

    }
}
const importdatasiswa = () => {
    let idelemen = "tabeltempatdaftarkelassaya";
    let elinput = document.getElementById("inputimportdatasiswa");
    elinput.addEventListener('change', () => {
        var fileUpload = elinput; //document.getElementById("fileUpload");

        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value)) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();

                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        prosesimportdasasiswa(e.target.result, idelemen);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        prosesimportdasasiswa(data, idelemen);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                alert("Browsernya versi jadul. Ga support.... Ganti dengan Chrome yang terupdate ya");
            }
        } else {
            alert("Importnya file Excel ya ... bukan yang lain.");
            fileUpload.value = "";
        }
    })
    elinput.click();
};

const barusimpanserverdatasiswa = async () => {
    let konfirm = confirm("Proses pengiriman data ke server dari tabel ini akan membutuhkan waktu yang lama. Anda yakin ingin melanjutkannya (Proses tidak bisa dihentikan)?\n\n Klik OK untuk melanjutkan atau klik CANCEL untuk membatalkan.");

    if (!konfirm) {
        alert("Terima kasih, Anda dapat mengedit nama siswa dengan fitur bawaannya.");
        arraydatasiswadariimport = [];
        return;
    }
    loadingljk.style.display = "block";
    $('#infoloadingljk').nextAll('button').remove();

    //buat dulu data anaknya!
    let datahtml = "",
        fil;
    datahtml += `<h3 class="w3-center">Proses Pengiriman Data</h3>
    Mohon Tunggu, proses membutuhkan waktu yang lama
    <div class="w3-border">
        <div class="warnaeka lebarin" style="width:1%;height:20px;transition: width 2s"></div>
    </div>
    <table class="w3-table w3-striped tabelproseskirim w3-small">`;
    for (let i = 0; i < jsondatasiswa.length; i++) {
        datahtml += `<tr>
            <td><div class="warnaeka statuskirimserveranake_${i}" style="width:1%;transition:width 2s;position:absolute;text-align:right"></div><div style="position:relative;">${jsondatasiswa[i].pd_nama}</div></td>
            </tr>`
        // <td class="statuskirimserveranake_${i}"><i class="fa fa-refresh fa-spin"></i></td>
    }

    datahtml += `</table>
    Keterangan: Jika Anda mengubah nama pada isian, data nama di atas adalah data sebelum Anda mengirimkan perubahan.
    `;

    let ss = jlo.ss_datauser;
    let ur = jlo.url_datauser;

    let ling = ur + "?idss=" + ss;



    infoloadingljk.innerHTML = datahtml

    let objekdikirim = [];
    if (arraydatasiswadariimport.length !== 0) {
        objekdikirim = arraydatasiswadariimport;
    } else {
        objekdikirim = jsondatasiswa;
    }
    let ld_atas = document.querySelector(".lebarin");
    let i = 0;
    do {
        let elemen = document.querySelector(".statuskirimserveranake_" + i);
        let kelas = ".statuskirimserveranake_" + i
        animasimove("statuskirimserveranake_" + i);
        let count = i + 1;
        let wd = (count / objekdikirim.length) * 100;
        ld_atas.style.width = `${wd}%`;
        ld_atas.innerHTML = `${wd.toFixed(0)}%`;
        await generatoreditsiswa(objekdikirim, i, kelas)
        // await fetch(linkDataUserWithIdss + "&action=usulanperbaikandata")
        //     .then(m => m.json())
        //     .then(k => {
        //         clearInterval(idinterval);

        //         elemen.style.width = "90%";
        //         elemen.innerHTML = "100%";
        //         console.log(i);
        //     }).catch(er => {
        //         console.log(er);
        //         elemen.style.width = "90%";

        //         elemen.innerHTML = "gagal";

        //     })

        i++
    }
    while (i < objekdikirim.length)
    ld_atas.innerHTML = "100% Lengkap"
    // let selaktif = document.querySelector(".statuskirimserveranake_0");
    // selaktif.innerHTML = `<div class="warnaeka siswake_0" style="width=1%;transition: width 2s"></div>`
    // 
    // setTimeout(() => {
    //     clearInterval(idinterval);
    //     document.querySelector(".statuskirimserveranake_").style.width = 80 + "%";
    // }, 10000);

    // await fetch(ling + "&action=usulanperbaikandata"){


    arraydatasiswadariimport = [];
    updatesetelahverifikasidaftarulang()

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

    //versi2
    // var width = 0;
    // var counter = 0;
    // var id = setInterval(frame, 600);
    // function frame() {
    //     if (width >= 1000) {
    //         clearInterval(id);
    //     } else {
    //         counter++
    //         console.log(counter);
    //         if (counter % 5 == 0) {
    //             width += 10;
    //             elem.style.width = width + '%';
    //             elem.innerHTML = (width / 10.10).toFixed(0) + "% ";
    //         }
    //     }
    // }
};

const prosesimportdasasiswa = (data, idelemen) => {
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    console.log(excelRows[0]);
    let hed = Object.keys(excelRows[0]);
    let head = arrayheadsumber;
    let arrObjek = [];
    // arraydatasiswadariimport;
    arraydatasiswadariimport = [];
    for (i = 0; i < excelRows.length; i++) {
        let objek = {}
        for (j = 0; j < head.length; j++) {
            let key = head[j]
            if (excelRows[i].hasOwnProperty(key)) {
                if (key == "id" || key == "jenjang") {
                    objek[key] = parseInt(excelRows[i][key]);
                } else if (angkadistring.indexOf(key) > -1) {
                    objek[key] = excelRows[i][key]; //.replace("'", "");

                } else if (key == "pd_tanggallahir") {
                    objek[key] = tanggalfull(new Date(excelRows[i][key]));
                } else {
                    objek[key] = excelRows[i][key];
                }
            } else {
                objek[key] = "";
            };
        }
        arrObjek.push(objek);
    }
    //console.table(arrObjek);
    arraydatasiswadariimport = arrObjek;
    let headtabel = ["No. Urut", "Token", "No Induk Siswa", "N I S N", "Nama Siswa", "Jenis Kelamin", "Agama", "Tempat Lahir", "Tanggal Lahir", "Nama Ayah", "Nama Ibu", "Alamat", "No HP"];
    let keyhead = ["", "id", "nis", "nisn", "pd_nama", "pd_jk", "pd_agama", "pd_tl", "pd_tanggallahir", "pd_namaayah", "pd_namaibu", "pd_alamat", "pd_hp"];
    let html = `<h3 class='w3-center w3-card-4 w3-white'>Daftar Siswa Kelas ${idNamaKepsek} </h3>
    <div class="w3-center w3-text-red w3-card-4 w3-white">File berhasil diimport. Tabel ini tidak lagi bisa diedit di laman. Jika ingin kembali ke bentuk tabel semula, Anda kembali memilih menu <b>Data Kelas</b>. Data ini belum disimpan di Server, Jika Anda ingin menyimpannya, gunakan fitur <b>Simpan Detail Server.</b></div>
    <table id="myTable" class="versi-table">
        <thead>
            <tr>
                <th>${headtabel[0]}</th>
                <th>${headtabel[1]}</th>
                <th>${headtabel[2]}</th>
                <th>${headtabel[3]}</th>
                <th>${headtabel[4]}</th>
                <th>${headtabel[5]}</th>
                <th>${headtabel[6]}</th>
                <th>${headtabel[7]}</th>
                <th>${headtabel[8]}</th>
                <th>${headtabel[9]}</th>
                <th>${headtabel[10]}</th>
                <th>${headtabel[11]}</th>
                <th>${headtabel[12]}</th>
            </tr>
        </thead>
        <tbody>
    `;
    for (j = 0; j < arrObjek.length; j++) {
        html += "<tr>"
        for (l = 0; l < keyhead.length; l++) {
            if (l == 0) {
                html += `<td>${(j + 1)}`;
            } else {
                html += `<td>${arrObjek[j][keyhead[l]]}</td>`
            }

        }
        html += "</tr>"
    }
    html += `</table>`
    document.getElementById(idelemen).innerHTML = html

    //buat head
    //let jsondatasiswatanpatimestamp = jsondatasiswa.map(k => (Object.fromEntries(Object.entries(k).filter(([s, v]) => s !== "time_stamp"))));
    //console.table(jsondatasiswatanpatimestamp);



}


async function generatoreditsiswa(pararrayobjek, y, elemen) {

    let td = document.querySelector(elemen);
    let namatabel = document.getElementById("myTable").getElementsByTagName("tbody")[0].rows[y];
    let xid = pararrayobjek[y].id,
        xjenjang = idJenjang,
        xnama_rombel = idNamaKelas,
        xnis = namatabel.cells[2].innerHTML,
        xnisn = namatabel.cells[3].innerHTML,
        xnik = pararrayobjek[y].nik,
        xnokk = pararrayobjek[y].nokk,
        xpdnama = namatabel.cells[4].innerHTML,
        xpdjk = namatabel.cells[5].innerHTML,
        xpdtl = namatabel.cells[7].innerHTML;
    let t = namatabel.cells[8].innerHTML;
    let dt = formatbalikin((t == "") ? "1 Juli 2019" : t);
    let xpdtgl = StringTanggal2(new Date(dt)),
        spdagama = namatabel.cells[6].innerHTML,
        spdayah = namatabel.cells[9].innerHTML,
        spdibu = namatabel.cells[10].innerHTML,
        spdalamat = namatabel.cells[11].innerHTML,
        spdhp = namatabel.cells[12].innerHTML,
        spdaktif = "aktif",
        spdeditoleh = namauser;

    let jsonlamaanakini = pararrayobjek.filter(s => s.id == xid)[0];
    jsonlamaanakini["id"] = xid;
    jsonlamaanakini["jenjang"] = xjenjang;
    jsonlamaanakini["nama_rombel"] = xnama_rombel;
    jsonlamaanakini["nis"] = xnis.replace(/&nbsp;/g, "");
    jsonlamaanakini["nisn"] = xnisn.replace(/&nbsp;/g, "");
    jsonlamaanakini["nik"] = xnik.replace(/&nbsp;/g, "");
    jsonlamaanakini["nokk"] = xnokk.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_nama"] = xpdnama.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_jk"] = xpdjk.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_tl"] = xpdtl.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_tanggallahir"] = xpdtgl;
    jsonlamaanakini["pd_agama"] = spdagama.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_namaayah"] = spdayah.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_namaibu"] = spdibu.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_alamat"] = spdalamat.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_hp"] = spdhp.replace(/&nbsp;/g, "");
    jsonlamaanakini["aktif"] = spdaktif.replace(/&nbsp;/g, "");
    jsonlamaanakini["dieditoleh"] = spdeditoleh;


    let pus = [];
    let key = arrayheadsumber.filter(s => s !== "time_stamp"); //array

    //Jika sebelumnya belum daftar ulang, maka API yang digunakan ini
    let databelumkirim = new FormData();
    for (let i = 0; i < key.length; i++) {
        pus.push(jsonlamaanakini[key[i]]);
        databelumkirim.append(key[i], jsonlamaanakini[key[i]]);
    }

    //Jika sebelumnya sudah daftar ulang, maka API yang digunakan ini
    let tabel = JSON.stringify(pus);
    let datakirim = new FormData();
    datakirim.append("tabel", tabel);
    datakirim.append("tokensiswa", xid);
    datakirim.append("idss", jlo.ss_datauser);

    let semuapendaftarulang = informasiusulandata["all"]
    let sudahdaftarulang = semuapendaftarulang.filter(s => s.id == xid)
    if (sudahdaftarulang.length == 0) {
        let aaa = linkDataUserWithIdss + "&action=editsiswa";
        await fetch(aaa, {
                method: "post",
                body: databelumkirim
            }).then(m => m.json())
            .then(f => {
                console.log(f);
                clearInterval(idinterval);
                td.style.width = "90%";
                td.innerHTML = "100%";

            })
            .catch(er => {
                console.log(er);
                clearInterval(idinterval);
                td.style.width = "90%";
                td.innerHTML = "Gagal"
            });
    } else {
        await fetch(url_absensiswa + "?action=daftarulangduasheet", {
                method: "post",
                body: datakirim
            })
            .then(m => m.json())
            .then(r => {
                //infoloadingljk.innerHTML = r.result;
                // console.log(r)
                // let datasiswakelasini = r.datasiswa.filter(s => s.nama_rombel == idNamaKelas && s.aktif == "aktif");
                // // console.log(datasiswakelasini)
                // pararrayobjek = datasiswakelasini;
                // localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(datasiswakelasini));
                clearInterval(idinterval);
                td.style.width = "90%";
                td.innerHTML = "100%";


            })
            .catch(er => {
                console.log(er);
                clearInterval(idinterval);
                td.style.width = "90%";
                td.innerHTML = "Gagal"
                // infoloadingljk.innerHTML = "Terjadi kesalahan";
            })
    }

}

const profilguru = async () => {
    modaledituser.style.display = "block";
    formedituser.style.display = "block";
    prosesloadingdaftaredit.innerHTML = ""; //<i class='fa fa-spin fa-spinner w3-xxxlarge'><i> sedang mencari data Anda..";
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
    timelinekbm.style.display = "block";
    timelinekbm.innerHTML = "<i class='fa fa-spin fa-spinner w3-xxlarge'></i>";
    await kurikulumdiamdiam();
    //buateditorkdaktif= tabelkearray();
    tampilinsublamangurukelas("pembelajaran");
    await fetch(linkmateri + "&action=kronolog&idtoken=" + idJenjang)
        .then(m => m.json())
        .then(j => {
            if (j.result.length > 0) {
                templatekronologi(j.result);
                kronologijson = j.result;
            } else {
                timelinekbm.innerHTML = "<h4>Anda belum pernah membuat Materi</h4>";
            }
            clearInterval(stoploadingtopbar);
            let divlod = document.querySelector(".loadingtopbar");
            divlod.style.width = "100%";
            setTimeout(() => {
                divlod.style.width = "1px"
                divlod.className += " w3-hide";

            }, 3000);
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
        let adacrtToken = jsonmateri[i].crtToken;
        let buatapaedit = (aksi == "materibaru") ? "Dibuat oleh:" : "Diedit oleh";
        let tmblprev = `<button class="w3-button w3-blue w3-hover-red" onclick="previewkronologi('${i}')"><i class="fa fa-eye"></i></button>`;
        //let tmblprevw = `<button class="w3-button w3-blue w3-hover-red" onclick="previewkronologi('${i}')"><i class="fa fa-eye"></i></button>`;
        let tmbledit = `<button class="w3-button w3-green  w3-blue w3-hover-red" onclick="editkronologi('${i}')"><i class="fa fa-edit"></i></button>`;
        let editfilemateri = `<button class="w3-button w3-red  w3-blue w3-hover-red" onclick="editfilemateri('${i}')"><i class="fa fa-edit"></i></button>`;
        //let statuscrtToken = (adacrtToken == "") ? `<b class='w3-text-red'>&times; Tidak Tampil </b><br>(Waktu Awal gagal menggenerate)<br><button class='w3-button w3-black w3-hover-white' onclick="fnv7perbaikikonten('${i}')"><i class='fa fa-clock-o'></i> Perbaiki</button>` : "<b class='w3-text-blue' >&checkmark; Tampil di siswa </b> dengan kode Token " + adacrtToken;
        let sebarankd = jsonmateri[i].kuncikd;
        let statuscrtToken;
        if (adacrtToken == "" && sebarankd == "undefined") {
            statuscrtToken = `<b class='w3-text-red'>&times; Tidak Tampil </b><br>
            <ul><li>(Waktu Awal gagal menggenerate)
            </li><li>(Sebaran KD undefined)</li></ul>`;

        } else if (adacrtToken !== "" && sebarankd == "undefined") {
            statuscrtToken = `<b class='w3-text-red'>&times; Tidak Tampil </b><br>
             (Sebaran KD undefined)`;
        } else if (adacrtToken == "" && sebarankd !== "undefined") {
            statuscrtToken = `<b class='w3-text-red'>&times; Tidak Tampil </b><br>
            (Waktu Awal gagal menggenerate)<br/>
            <button class='w3-button w3-black w3-hover-white' onclick="fnv7perbaikikonten('${i}')"><i class='fa fa-clock-o'></i> Perbaiki</button>
            `;

        } else if (adacrtToken !== "" && sebarankd.indexOf("{") == -1) {
            statuscrtToken = `<b class='w3-text-red'>&times; Tidak Tampil/error </b><br>
            (format Sebaran KD belum digenerate)<br/><span class="w3-red">${sebarankd}</span>`;

        } else {
            statuscrtToken = `<b class='w3-text-blue' >&checkmark; Tampil di siswa </b> dengan kode Token ${adacrtToken}`
        }

        let statusijinkonten = (jsonmateri[i].idpendaftar == "") ? `<br class='w3-text-blue w3-hover-cyan'>&checkmark; Diijinkan</br><br><button class='w3-red w3-button w3-hover-blue' onclick="ubahijinpublik('${i}')">Privat</button>` : `<b class='w3-text-red'>&times; Tidak diijinkan</br><button class='w3-blue w3-button w3-hover-cyan'  onclick="ubahijinpublik('${i}')">Ijinkan</button>`;

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

    timelinekbm.innerHTML = `<button class="w3-button w3-red w3-hover-blue w3-round-large" onclick="fnv7kotenmateridihapus('${idJenjang}')"> Daftar Materi yang dihapus</button><hr><h4>Materi di Jenjang Kelas Anda yang dipublikasikan:</h4>` + temp;
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
        // quota.usage -> Number of bytes used.
        // quota.quota -> Maximum number of bytes available.

        const percentageUsed = (quota.usage / quota.quota) * 100;
        console.log(`dipake: ${quota.usage}`)
        console.log(`You've used ${percentageUsed}% of the available storage.`);
        const remaining = quota.quota - quota.usage;
        console.log(`You can write up to ${remaining} more bytes.`);
    }
}


function tampilinsublamangurukelas(fitur) {

    if (fitur == "beranda") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataraport.style.display = "none";
        dataframekreatif.style.display = "none";

    } else if (fitur == "datakelas") {
        datakelassaya.style.display = "block";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataraport.style.display = "none";
        dataframekreatif.style.display = "none";
        document.getElementById("batasaksesguru").scrollIntoView();
    } else if (fitur == "absen") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "block";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataraport.style.display = "none";
        dataframekreatif.style.display = "none";
        document.getElementById("batasaksesguru").scrollIntoView();

    } else if (fitur == "pembelajaran") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "block";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataraport.style.display = "none";
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
        dataraport.style.display = "none";
        dataframekreatif.style.display = "none";
        document.getElementById("batasaksesguru").scrollIntoView();
    } else if (fitur == "mapel") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "block";
        datakehadiranguru.style.display = "none";
        dataraport.style.display = "none";
        dataframekreatif.style.display = "none";
        document.getElementById("batasaksesguru").scrollIntoView();
    } else if (fitur == "kehadiranguru") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "block";
        dataraport.style.display = "none";
        dataframekreatif.style.display = "none";

        document.getElementById("batasaksesguru").scrollIntoView();
    } else if (fitur == "raport") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataraport.style.display = "block";
        dataframekreatif.style.display = "none";



        document.getElementById("batasaksesguru").scrollIntoView();
    } else if (fitur == "meme") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataraport.style.display = "none";
        dataframekreatif.style.display = "block";



        document.getElementById("batasaksesguru").scrollIntoView();
    }
    w3_close();
}

//////

const htmldataprofil = () => {
    let html = `
    <h3 class="w3-center warnaeka w3-round-large w3-card-4">DATA SISWA</h3>
    <div style="overflow-x:auot">
    <table class="w3-table w3-striped w3-border">
        <tr>
            <th class="w3-light-green w3-center" colspan="3">KODE AKSES</th>
        </tr>
        <tr>
            <td>Kode Token</td>
            <td>:</td>
            <td class="hdp_id">hdp_id</td>
        </tr>
        <tr>
            <td>Status Data</td>
            <td>:</td>
            <td class="hdp_usulanperubahandata">usulanperubahandata</td>
        </tr>
        <tr>
            <th colspan="3"></th>
        </tr>
        <tr>
            <th class="w3-light-green w3-center" colspan="3">NARAHUBUNG</th>
        </tr>
        <tr>
            <td>Email</td>
            <td>:</td>
            <td class="hdp_dapo_email">hdp__dapo_email</td>
        </tr>
        <tr>
            <td>No. HP WA</td>
            <td>:</td>
            <td class="hdp_pd_hp">hdp_pd_hp"</td>
        </tr>
        <tr>
            <th colspan="3"></th>
        </tr>
        <tr>
            <th class="w3-light-green w3-center" colspan="3">JENJANG KELAS</th>
        </tr>
        <tr>
            <td>Jenjang Kelas</td>
            <td>:</td>
            <td class="hdp_jenjang">hdp_jenjang</td>
        </tr>
        <tr>
            <td>Rombel</td>
            <td>:</td>
            <td class="hdp_nama_rombel">hdp_nama_rombel</td>
        </tr>
        <tr>
            <th colspan="3"></th>
        </tr>
        <tr>
            <th class="w3-light-green w3-center" colspan="3">DATA PRIBADI</th>
        </tr>
        <tr>
        <td>NIS</td>
        <td>:</td>
        <td class="hdp_nis"> hdp_nis</td>
    </tr>
     <tr>
        <td>NISN</td>
        <td>:</td>
        <td class="hdp_nisn">hdp_nisn</td>
    </tr>
        <tr>
            <td>Nama Lengkap</td>
            <td>:</td>
            <td class="hdp_pd_nama">pd_nama</td>
        </tr>
        <tr>
            <td>Jenis Kelamin</td>
            <td>:</td>
            <td class="hdp_pd_jk">hdp_pd_jk</td>
        </tr>

        <tr>
        <td>Agama</td>
        <td>:</td>
        <td class="hdp_pd_agama">hdp_pd_agama</td>
        </tr>
        <tr>
            <td>Tempat Lahir</td>
            <td>:</td>
            <td class="hdp_pd_tl"> hdp_pd_tl</td>
        </tr>
        <tr>
            <td>Tanggal Lahir</td>
            <td>:</td>
            <td class="hdp_pd_tanggallahir"> hdp_pd_tanggallahir</td>
        </tr>
        <tr>
            <td>No Registrasi Akta Kelahiran</td>
            <td>:</td>
            <td class="hdp_dapo_noregistrasiaktalahir"> hdp_dapo_noregistrasiaktalahir</td>
        </tr>
        <tr>
            <td>Anak Ke-</td>
            <td>:</td>
            <td class="hdp_dapo_anakkeberapa"></td>
        </tr>
        <tr>
            <td>Jumlah Saudara Kandung</td>
            <td>:</td>
            <td><span class="hdp_dapo_jumlahsaudarakandung">...</span> Saudara</td>
        </tr>
        
        <tr>
            <td>Berkebutuhan Khusus?</td>
            <td>:</td>
            <td class="hdp_dapo_kebutuhankhusus"></td>
        </tr>
        <tr>
            <td>Sekolah Asal</td>
            <td>:</td>
            <td class="hdp_dapo_sekolahasal"></td>
        </tr>
        <tr>
            <td colspan="3" class="w3-center"><b>Dokumen Akta Kelahiran/Surat Kenal Lahir</b></td>
        </tr>
        <tr>
            <td colspan="3" class="hdp_dok_akte">
                
            </td>
        </tr>
        <tr>
            <td>NIK</td>
            <td>:</td>
            <td class="hdp_nik">hdp_nik</td>
        </tr>
         <tr>
            <td>Nomor KK</td>
            <td>:</td>
            <td class="hdp_nokk">hdp_nokk</td>
        </tr>
        <tr>
            <td>Alamat Jalan</td>
            <td>:</td>
            <td class="hdp_pd_alamat">hdp_pd_alamat</td>
        </tr>
        <tr>
            <td>Nama Dusun</td>
            <td>:</td>
            <td class="hdp_dapo_dusun">hdp_dapo_dusun</td>
        </tr>
        <tr>
            <td>RT</td>
            <td>:</td>
            <td class="hdp_dapo_rt"></td>
        </tr>
        
        <tr>
            <td>RW</td>
            <td>:</td>
            <td class="hdp_dapo_rw"></td>
        </tr>
        <tr>
            <td>Kelurahan</td>
            <td>:</td>
            <td class="hdp_dapo_kelurahan">hdp_dapo_kelurahan</td>
        </tr>
        <tr>
            <td>Kecamatan</td>
            <td>:</td>
            <td class="hdp_dapo_kecamatan">hdp_dapo_kecamatan</td>
        </tr>
        <tr>
            <td>Kota</td>
            <td>:</td>
            <td class="hdp_dapo_kota">hdp_dapo_kota</td>
        </tr>
        <tr>
            <td>Provinsi</td>
            <td>:</td>
            <td class="hdp_dapo_provinsi">hdp_dapo_provinsi</td>
        </tr>
        <tr>
            <td>Kode Pos</td>
            <td>:</td>
            <td class="hdp_dapo_kodepos"></td>
        </tr>
        <tr>
            <td>Jenis Tinggal</td>
            <td>:</td>
            <td class="hdp_dapo_jenistinggal">hdp_dapo_jenistinggal</td>
        </tr>

        <tr>
            <td>Moda Transportasi</td>
            <td>:</td>
            <td class="hdp_dapo_alattransportasi">hdp_dapo_alattransportasi</td>
        </tr>
        <tr>
            <td colspan="3" class="w3-center"><b>Dokumen Kartu Keluarga</b></td>
        </tr>
        <tr>
            <td colspan="3" class="hdp_dok_kk">
                
            </td>
        </tr>
        <tr>
            <th colspan="3"></th>
        </tr>
        <tr>
            <th class="w3-light-green w3-center" colspan="3">Koordinat Geografis</th>
        </tr>
        <tr>
            <td>Lintang (Latitude)</td>
            <td>:</td>
            <td class="hdp_dapo_lintang">hdp_dapo_lintang</td>
        </tr>
        <tr>
            <td>Bujur (Longitude)</td>
            <td>:</td>
            <td class="hdp_dapo_bujur">hdp_dapo_longitude</td>
        </tr>
        <tr>
            <td>Jarak Rumah Ke sekolah</td>
            <td>:</td>
            <td class="hdp_dapo_jarakrumahkesekolah">hdp_dapo_jarakrumahkesekoilah</td>
        </tr>
        <tr>
            <th colspan="3"></th>
        </tr>
        <tr>
            <th class="w3-light-green w3-center" colspan="3">Program KIP/KKS/KPS/PKH/PIP</th>
        </tr>
        <tr>
            <td>Nomor KKS<br><sub>Kartu Keluarga Sejahtera)</sub></td>
            <td>:</td>
            <td class="hdp_dapo_nomorkks"></td>
        </tr>
        
        <tr>
            <td colspan="3" class="w3-center"><b>Dokumen KKS (Kartu Keluarga Sejahtera)</b></td>
        </tr>
        <tr>
            <td colspan="3" class="hdp_dok_kks">
               
            </td>
        </tr>
        <tr>
            <td>Penerima KPS/PKH?</td>
            <td>:</td>
            <td class="hdp_dapo_penerimakps"></td>
        </tr>
        <tr>
            <td>Nomor KPS/PKH</td>
            <td>:</td>
            <td class="hdp_dapo_nokps">hdp_dapo_nokps</td>
        </tr>
        
        <tr>
            <td colspan="3" class="w3-center"><b>Dokumen KPS(Kartu Perlindungan Sosial) / PKH(Program Keluarga Harapan)</b></td>
        </tr>
        <tr>
            <td colspan="3" class="hdp_dok_kpspkh">
                
            </td>
        </tr>
        <tr>
            <td>Memiliki KIP?</td>
            <td>:</td>
            <td class="hdp_dapo_penerimakip">hdp_dapo_penerimakip</td>
        </tr>
        <tr>
            <td>Nomor KIP</td>
            <td>:</td>
            <td class="hdp_dapo_nomorkip">hdp_dapo_nomorkip</td>
        </tr>
        <tr>
            <td>Nama di KIP</td>
            <td>:</td>
            <td class="hdp_dapo_namadikip">hdp_dapo_namadikip</td>
        </tr>
        
        <tr>
            <td colspan="3" class="w3-center"><b>Dokumen KIP(Kartu Indonesia Pintar)</b></td>
        </tr>
        <tr>
            <td colspan="3" class="hdp_dok_kip">
                
            </td>
        </tr>
        
        <tr>
            <th colspan="3"></th>
        </tr>
        <tr>
            <th class="w3-light-green w3-center" colspan="3">Alasan Layak PIP</th>
        </tr>
        <tr>
            <td>Layak PIP?</td>
            <td>:</td>
            <td class="hdp_dapo_layakpip">hdp_dapo_layakpip</td>
        </tr>
        <tr>
            <td>Alasan layak</td>
            <td>:</td>
            <td class="hdp_dapo_alasanlayakpip">hdp_dapo_alasanlayakpip</td>
        </tr>
        <tr>
            <th colspan="3"></th>
        </tr>
        <tr>
            <th class="w3-light-green w3-center" colspan="3">BANK PENERIMA PIP<br/>Khusus bagi siswa yang mendapatkan dana PIP</th>
        </tr>
        <tr>
            <td>Nama Bank</td>
            <td>:</td>
            <td class="hdp_dapo_bank"></td>
        </tr>
        <tr>
            <td>Nomor Rekening Bank</td>
            <td>:</td>
            <td class="hdp_dapo_namarekeningbank"></td>
        </tr>
        <tr>
            <td>Rekening Atas Nama</td>
            <td>:</td>
            <td class="hdp_dapo_rekeningatasnama"></td>
        </tr>
        <tr>
            <th colspan="3"></th>
        </tr>
        <tr>
            <th class="w3-light-green w3-center" colspan="3">DATA ORANG TUA</th>
        </tr>
        <tr>
            <td colspan="3" class="w3-center"><b>Ayah Kandung</b></td>
        </tr>
        <tr>
            <td>Nama Lengkap Ayah</td>
            <td>:</td>
            <td class="hdp_pd_namaayah"></td>
        </tr>
        <tr>
            <td>Tanggal Lahir Ayah</td>
            <td>:</td>
            <td class="hdp_dapo_tahunlahirayah"></td>
        </tr>
        <tr>
            <td>Pendidikan Ayah</td>
            <td>:</td>
            <td class="hdp_dapo_jenjangpendidikanayah"></td>
        </tr>
        <tr>
            <td>NIK Ayah</td>
            <td>:</td>
            <td class="hdp_dapo_nikayah"></td>
        </tr>
        <tr>
            <td>Pekerjaan Ayah</td>
            <td>:</td>
            <td class="hdp_dapo_pekerjaanayah"></td>
        </tr>
        <tr>
            <td>Penghasilan Ayah</td>
            <td>:</td>
            <td class="hdp_dapo_penghasilanayah"></td>
        </tr>
        
        <tr>
            <td>Berkebutuhan Khusus?</td>
            <td>:</td>
            <td class="hdp_dapo_abkayah"></td>
        </tr>
        <tr>
            <td colspan="3" class="w3-center"><b>Ibu Kandung</b></td>
        </tr>
        <tr>
            <td>Nama Lengkap Ibu</td>
            <td>:</td>
            <td class="hdp_pd_namaibu"></td>
        </tr>
        <tr>
            <td>Tanggal Lahir Ibu</td>
            <td>:</td>
            <td class="hdp_dapo_tahunlahiribu"></td>
        </tr>
        
        <tr>
            <td>Pendidikan Ibu</td>
            <td>:</td>
            <td class="hdp_dapo_jenjangpendidikanibu"></td>
        </tr>
        <tr>
            <td>NIK Ibu</td>
            <td>:</td>
            <td class="hdo_dapo_nikibu"></td>
        </tr>
        <tr>
            <td>Pekerjaan Ibu</td>
            <td>:</td>
            <td class="hdp_dapo_pekerjaanibu"></td>
        </tr>
        <tr>
            <td>Penghasilan Ibu</td>
            <td>:</td>
            <td class="hdp_dapo_penghasilanibu"></td>
        </tr>
        
        <tr>
            <td>Berkebutuhan Khusus?</td>
            <td>:</td>
            <td class="hdp_dapo_abkibu"></td>
        </tr>
        <tr>
            <td colspan="3" class="w3-center"><b>Wali</b></td>
        </tr>
        <tr>
            <td>Nama Lengkap Wali</td>
            <td>:</td>
            <td class="hdp_dapo"></td>
        </tr>
        <tr>
            <td>Tanggal Lahir Wali</td>
            <td>:</td>
            <td class="hdp_dapo_tahunlahirwali"></td>
        </tr>
        
        <tr>
            <td>Pendidikan Wali</td>
            <td>:</td>
            <td class="hdp_dapo_jenjangpendidikanwali"></td>
        </tr>
        <tr>
            <td>NIK Wali</td>
            <td>:</td>
            <td class="hdo_dapo_nikwali"></td>
        </tr>
        <tr>
            <td>Pekerjaan Wali</td>
            <td>:</td>
            <td class="hdp_dapo_pekerjaanwali"></td>
        </tr>
        <tr>
            <td>Penghasilan Wali</td>
            <td>:</td>
            <td class="hdp_dapo_penghasilanwali"></td>
        </tr>
        <tr>
            <td>Berkebutuhan Khusus (Wali)</td>
            <td>:</td>
            <td class="hdp_dapo_abkwali"></td>
        </tr>
        <tr>
            <th colspan="3"></th>
        </tr>
        <tr>
            <th class="w3-light-green w3-center" colspan="3">DATA PRIODIK PERKEMBANGAN SISWA</th>
        </tr>
        <tr>
            <td>Tinggi Badan (Cm)</td>
            <td>:</td>
            <td class="hdp_dapo_tinggibadan"></td>
        </tr>
        <tr>
            <td>Berat Badan (Kg)</td>
            <td>:</td>
            <td class="hdp_dapo_beratbadan"></td>
        </tr>
        <tr>
            <td>Lingkar Kepala</td>
            <td>:</td>
            <td class="hdp_dapo_lingkarkepala"></td>
        </tr>
    </table>
    </div>
    `;

    return html
};

const htmlformulirdatasiswa = (tokensiswa) => {
    let html = `
    <h3 class="w3-center warnaeka w3-round-large w3-card-4">FORMULIR AJUAN DATA SISWA</h3>
    <div style="overflow-x:auto">
    <form name="formajuandatasiswa" id="formajuandatasiswa">
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
            <h3 class="w3-light-green w3-center" >KODE AKSES<br>(Tidak bisa diubah)</h3>
            <label for="hfd_id">Kode Token:
        <br/><input type="text" class="w3-input  w3-border w3-border-black w3-round" name="id" id="hfd_id" disabled/>
            <hr/>
            <label for="hfd_usulanperubahandata">Status Data:</label>
            <br/>
            <input type="text" class="w3-input  w3-border w3-border-black w3-round"  name="usulanperubahandata" id="hfd_usulanperubahandata" disabled>
        </fieldset> 
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
        <h3 class="w3-light-green w3-center" >JENJANG KELAS<br>(Tidak bisa diubah)</h3>
        <label for="hfd_jenjang">Jenjang Kelas:</label>
            <br/>
            <input type="number" class="w3-input  w3-border" name="jenjang" id="hfd_jenjang" disabled>
            <br/>
            <label>Rombel:</label>
            <br/>
            <input type="text" class="w3-input w3-border w3-border-black w3-round"  name="nama_rombel" id="hfd_nama_rombel" disabled/>

        </fieldset>   
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
            <h3 class="w3-light-green w3-center" >NARAHUBUNG</h3>
        <label for="hfd_dapo_email">Email:</label>
            <br/>
            <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round"  name="dapo_email" id="hfd_dapo_email"/>
            <br/>
            <label for="hfd_pd_hp">No. HP WA:</label>
            (bisa dihubungi)
            <br/>
            <input type="tel" class="w3-input w3-white w3-border w3-border-black w3-round"  name="pd_hp" id="hfd_pd_hp"/>
            <br/>
            <label for="hfd_dapo_telepon">No Telpon Rumah</label>
            <br/>
            <input type="tel" class="w3-input w3-white w3-border w3-border-black w3-round"  name="dapo_telepon" id="hfd_dapo_telepon"/>
        </fieldset>
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
        <h3 class="w3-light-green w3-center" >DATA PRIBADI</h3>
        <label for="hfd_nis">NIS:</label>
        <br/>
        <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round"  name="nis" id="hfd_nis">
        <br/>
        <label for="hfd_nisn">NISN:</label>
        <br/>
        <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="nisn" id="hfd_nisn">
        <br/>
        <label for="hfd_pd_nama">Nama Lengkap:</label>
            <br/>
            <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="pd_nama" id="hfd_pd_nama" oninput="ketik_kapital(this)"/>
            <br/>
            Jenis Kelamin: <br/>
            <label for="hfd_pd_jk_l">
                <input type="radio" class="w3-radio" name="pd_jk" id="hfd_pd_jk_l" value="L"/>
                Laki-laki
            </label>
            <label for="hfd_pd_jk_p">
                <input type="radio" class="w3-radio" name="pd_jk" ="hfd_pd_jk_p" value="P"/>
                Perempuan
            </label>
        <br/>
        <br/>
        <label for="hfd_pd_agama">Agama:</label>
        <br/>
        <select class="w3-select warnaeka w3-border warnaeka" name="pd_agama" id="hfd_pd_agama">
        <option value="">Silakan Pilih</option>
                    <option value="ISLAM" >ISLAM</option>
                    <option value="KRISTEN">KRISTEN/PROTESTAN</option>
                    <option value="KATHOLIK">KATHOLIK</option>
                    <option value="HINDU">HINDU</option>
                    <option value="BUDHA">BUDHA</option>
                    <option value="KHONGHUCU">KHONGHUCU</option>
                    <option value="Kepercayaan Lain">Kepercayaan Lainnya</option>
        </select>
        <br/>
        <br/>
        <label for="hfd_pd_tl">Tempat Lahir:</label>
            <br/>
            <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="pd_tl" id="hdf_pd_tl" oninput="ketik_kapital(this)">
            <br/>
            <label for="hfd_pd_tanggallahir">Tanggal Lahir:</label>
            <input type="date" class="w3-padding w3-border w3-border-black w3-round"  name="pd_tanggallahir" id="hfd_pd_tanggallahir" onchange="konversi_tanggal(this,'sub_arti_tanggal')"/>
            Teks Tanggal Lahir: <b class="sub_arti_tanggal w3-text-red"></b>
          <br/>  
          <br/>  
            <label for="hfd_dapo_noregistrasiaktalahir">No Registrasi Akta Kelahiran:</label>
            <br/>
            <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_noregistrasiaktalahir"/>
            <br/>
            <label for="hfd_dapo_anakkeberapa">Anak Ke-:</label>
            <input type="number" class="w3-white w3-padding w3-border w3-border-black w3-round" name="dapo_anakkeberapa" id="hfd_dapo_anakkeberapa" style="width:100px"/>
            
            <label for="hfd_dapo_jumlahsaudarakandung">Jumlah Saudara Kandung:</label>
            <input type="number" class="w3-white w3-padding w3-border w3-border-black w3-round" name="dapo_jumlahsaudarakandung" id="hfd_dapo_jumlahsaudarakandung" style="width:100px"/>
            <br/>

            <br/>
            <br/>
            <label for="hfd_dapo_kebutuhankhusus">Berkebutuhan Khusus?</label>

                <select id="hfd_dapo_kebutuhankhusus" name="dapo_kebutuhankhusus" class="w3-select w3-border warnaeka">
            <option value="">Silakan Pilih</option>
                    <option value="TIDAK" >Tidak</option> 
                    <option value="NETRA (A)">Netra (A)</option>
                    <option value="RUNGU (B)">Rungu (B)</option>
                    <option value="GRAHITA RINGAN (C)">Grahita Ringan (C)</option>
                    <option value="GRAHITA SEDANG (C1)">Grahita Sedang (C1)</option>
                    <option value="DAKSA RINGAN (D)">Daksa Ringan (D)</option>
                    <option value="DAKSA SEDANG (D1)">Daksa Sedang (D1)</option>
                    <option value="INDIGO (O)">Indigo (O)</option>
                    <option value="DOWN SINDROME (P)">Down Sindrome (P)</option>
                    <option value="AUTIS (Q)">Autis (Q)</option>
                    <option value="LARAS (E)">Laras ( E)</option>
                    <option value="WICARA (F)">Wicara (F)</option>
                    <option value="TUNA GANDA (G)">Tuna Ganda (G)</option>
                    <option value="HIPERAKTIF (H)">Hiperaktif (H)</option>
                    <option value="CERDAS ISTIMEWA (I)">Cerdas Istimewa (i)</option>
                    <option value="BAKAT ISTIMEWA (J)">Bakat Istimewa (J)</option>
                    <option value="KESULITAN BELAJAR (K)">Kesulitan Belajar (K)</option> 
                </select>
                <br>
                <br>
                
            </fieldset>
            <fieldset class="w3-card-4 w3-margin w3-light-grey">
            <h5 class="w3-light-green w3-center">Dokumen Akta Kelahiran/Surat Kenal Lahir</h5>
            Unggah Dokumen Akta Kelahiran / Surat Keterangan Lahir:<br/>    
            <label for="input_dok_akte" id="label_dok_akte" class="w3-button warnaeka w3-round-large w3-card-4 w3-border-bottom w3-border-black"><i class="fa fa-upload"></i> Unggah Dokumen</label>
                <input type="text" name="dok_akte" id="hfd_dok_akte" class="w3-input  w3-round" disabled/>
                <div class="status_idfile_akta w3-center w3-text-blue"></div>
                <div id="hdp_dok_akte" class="w3-card-4 w3-padding">PREVIEW</div>
            </fieldset>
            <fieldset class="w3-card-4 w3-margin w3-light-grey"> 
            <h3 class="w3-light-green w3-center">ALAMAT</h3>
            <span class="w3-text-red">Disi sesuai dengan dokumen Kartu Keluarga</span>  <br/><br/> 
            <label for="hfd_nik">NIK:</label>
            <input type="number" class="w3-input w3-white w3-border w3-border-black w3-round" name="nik" id="hfd_nik">
        <br/>
            <label for="hfd_nokk">Nomor KK:</label>
            
            <input type="number" class="w3-input w3-white w3-border w3-border-black w3-round" name="nokk" ="hfd_nokk">
            <br/>
            <label for="hfd_pd_alamat">Alamat Jalan:</label>
            <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="pd_alamat" id="hfd_pd_alamat">
            <br/>
            <label for="hfd_dapo_dusun">Nama Dusun:</label>
            <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_dusun" id="hfd_dapo_dusun">
            <br/>
            <label for="hfd_rt">RT: </label> <input type="number" class="w3-white w3-border w3-border-black w3-round w3-padding" name="dapo_rt" id="hfd_dapo_rt" min="1" style="width:100px"/>
            <label for="hfd_rw">RW: </label> <input type="number" class="w3-white w3-border w3-border-black w3-round w3-padding" name="dapo_rw" id="hfd_dapo_rw" min="1" style="width:100px"/>
            <br/>
            <br/>
            <label for="hfd_dapo_kelurahan">Kelurahan:</label>
            <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_kelurahan" id="hfd_dapo_kelurahan" oninput="ketik_kapital(this)">
            <div class="w3-tiny">
            Refrensi Tulisan Kelurahan (Perhatikan spasinya)<br/>
            RATUJAYA, CIPAYUNG JAYA, BOJONG PONDOK TERONG, PONDOK JAYA
            </div><br/>
            <label for="hfd_dapo_kecamatan">Kecamatan :</label>
            <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_kecamatan" id="hfd_dapo_kecamatan" oninput="ketik_kapital(this)"/>
            <br/>
            <laber for="hfd_dapo_kota">Kota:</td>
            <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_kota" id="hfd_dapo_kota" oninput="ketik_kapital(this)"/>
            <br/>
            <label for="hfd_dapo_provinsi">Provinsi:</label>
            <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_provinsi" id="hfd_dapo_provinsi" oninput="ketik_kapital(this)"/>
            <br/>
            <label for="hfd_dapo_kodepos">Kode Pos:</label>
            <input type="number" class="w3-white w3-border w3-border-black w3-round w3-padding" name="dapo_kodepos" id="hfd_dapo_kodepos" style="width:150px;"/>
            <br/>
            <br/>
            <label for="hfd_dapo_jenistinggal">Jenis Tinggal:</label>
            <select class="w3-select w3-border warnaeka" name="dapo_jenistinggal" id="hfd_dapo_jenistinggal">
            <option value="">Silakan Pilih</option>
            <option value="Bersama Orang Tua" >Bersama Orang tua</option>
                <option value="Wali">Wali</option>
                <option value="Kos">Kos</option>
                <option value="Asrama">Asrama</option>
                <option value="Panti Asuhan">Panti Asuhan</option>
                <option value="Lainnya">Lainnya</option>
            </select>
            <br/>
            <br/>
            
            <label for="hfd_dapo_alattransportasi">Moda Transportasi:</label>
            <select class="w3-select warnaeka w3-border" name="dapo_alattransportasi" id="hfd_dapo_alattransportasi">
            <option value="">Silakan Pilih</option>
            <option value="Jalan Kaki" >Jalan Kaki</option>
                <option value="Kendaraan Pribadi">Kendaraan Pribadi</option>
                <option value="Kendaraan Umum/Angkot/Pete-pete">Kendaraan Umum/Angkot/Pete-pete</option>
                <option value="Jemputan Sekolah">Jemputan Sekolah</option>
                <option value="Kereta Api">Kereta Api</option>
                <option value="Ojek">Ojek</option>
                <option value="Andong/Bendi/Sado/Dokar/Delman/Beca">Andong/Bendi/Sado/Dokar/Delman/Beca</option>
                <option value="Perahu Penyebrangan/Rakit/Getek">Perahu Penyebrangan/Rakit/Getek</option>
                <option value="Lainnya">Lainnya</option>
            </option>
            </select>
        </fieldset>
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
            <h5 class="w3-light-green w3-center">Dokumen Kartu Keluarga</h5>
            Unggah Dokumen Kartu Keluarga:<br/>
            <label for="input_dok_kk" id="label_dok_kk" class="w3-button warnaeka w3-round-large w3-card-4 w3-border-bottom w3-border-black"><i class="fa fa-upload"></i> Unggah Dokumen</label>
                <input type="text" name="dok_kk" id="hfd_dok_kk" class="w3-input  w3-round" disabled/>
                <div class="status_idfile_kk w3-center w3-text-blue"></div>
                <div id="hdp_dok_kk" class="w3-card-4 w3-padding">PREVIEW</div>
        </fieldset>
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
            <h3 class="w3-light-green w3-center">Koordinat Geografis</h3>
        Pastikan dalam pengisian ini, Anda berada di tempat tinggal Anda. Silakan klik tombol berikut untuk menggenerate titik koordinat rumah tinggal Ananda di sini.
        <br/>
        <br/>
        <label for="tombol_titikkoordinat" id="label_tombol_titikkoordinat" class="w3-button w3-card-4 warnaeka w3-border-bottom w3-border-black w3-round-large"><i class="fa fa-map-marker"></i> Koordinat Saya</label>
        <br/>
        <br/>
        <label for="hfd_dapo_lintang">Lintang (Latitude):</label>
        <input type="text" class="w3-input  w3-border w3-border-black w3-round" name="dapo_lintang" id="hfd_dapo_lintang" disabled/>
        <br/>
        <label for="hfd_dapo_bujur">Bujur (Longitude)</td>
        <input type="text" class="w3-input  w3-border w3-border-black w3-round" name="dapo_bujur" id="hfd_dapo_bujur" disabled/>
        <br/>
        <label for="hfd_dapo_jarakrumahkesekolah">Jarak Rumah Ke sekolah (Km)</label>
        <input type="text" class="w3-input  w3-border w3-border-black w3-round" name="dapo_jarakrumahkesekolah" id="hfd_dapo_jarakrumahkesekolah" disabled />
        </fieldset>
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
            <h3 class="w3-light-green w3-center">Program KIP/KKS/KPS/PKH/PIP</h3>
            <h4 class="w3-light-green w3-center">KKS (Kartu Keluarga Sejahtera) </h4>
        <label for="hfd_dapo_nomorkks">Nomor KKS:</label>
        <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_nomorkks" id="hfd_dapo_nomorkks"/>
        <br/>
        <br/>
        Dokumen KKS<br/>
        <label for="input_dok_kks" id="label_dok_kks" class="w3-button warnaeka w3-round-large w3-card-4 w3-border-bottom w3-border-black"><i class="fa fa-upload"></i> Unggah Dokumen</label>
        <input type="text" class="w3-input  w3-round" name="dok_kks" id="hfd_dok_kks" disabled/>
        <div id="hdp_dok_kks" class="w3-card-4 w3-padding">PREVIEW</div>
        <br/>     
        <br/>     
        <br/>     
        <h4 class="w3-light-green w3-center">KPS/PKH</h4>
        <sub class="w3-text-blue">KPS(Kartu Perlindungan Sosial) / PKH(Program Keluarga Harapan)</sub><br/><br/>
        <label for="hfd_dapo_penerimakps">Penerima KPS/PKH?</label>
        <select class="w3-select warnaeka w3-border" name="dapo_penerimakps" id="hfd_dapo_penerimakps">
            <option value="TIDAK" >TIDAK</option>
            <option value="YA" >YA</option>
        </select>
        <br/>    
        <label for="hfd_dapo_nokps">Nomor KPS/PKH:</label>
        <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_nokps" id="hfd_dapo_nokps"/>
            <br/>
            <br/>
            Dokumen Kartu KPS atau PKH<br/>
        <label for="input_dok_kpspkh" id="label_dok_kpspkh" class="w3-button warnaeka w3-round-large w3-card-4 w3-border-bottom w3-border-black"><i class="fa fa-upload"></i> Unggah Dokumen</label>
        <input type="text" class="w3-input w3-round" name="dok_kpspkh" id="hfd_dok_kpspkh" disabled/>
        <div id="hdp_dok_kpspkh" class="w3-card-4 w3-padding">PREVIEW</div>
        <br/>
        <br/>
        <br/>
        <h4 class="w3-light-green w3-center">KIP (Kartu Indonesia Pintar)</h4>
            <label for="hfd_dapo_penerimakip">Memiliki KIP?</label>
            <select class="w3-select warnaeka w3-border" name="dapo_penerimakip" id="hfd_dapo_penerimakip">
            <option value="TIDAK" >TIDAK</option>
            <option value="YA">YA</option>
            </select>
            <br/>
            <br/>
        <label for="hfd_dapo_nomorkip">Nomor KIP</label>
        <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_nomorkip" id="hfd_dapo_nomorkip"/>
        <br/>
        <label for="hfd_dapo_namadikip">Nama di KIP:</label>
        <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_namadikip" id="hfd_dapo_namadikip"/>
        <br/><br/>
        Dokumen KIP(Kartu Indonesia Pintar):<br/>
        <label for="input_dok_kip" id="label_dok_kip" class="w3-button warnaeka w3-round-large w3-card-4 w3-border-bottom w3-border-black"><i class="fa fa-upload"></i> Unggah Dokumen</label>
        <input type="text" class="w3-input  w3-round" name="dok_kip" id="hfd_dok_kip" disabled/>
        <div id="hdp_dok_kip" class="w3-card-4 w3-padding">PREVIEW</div>
        <br/>
        <br/>
        <br/>
        <h4 class="w3-light-green w3-center">Kelayakan PIP:</h4>
        
        <label for="hfd_dapo_layakpip">Layak PIP?</label>
        <select class="w3-select warnaeka w3-border" name="dapo_layakpip" id="hfd_dapo_layakpip" disabled>
            <option value="TIDAK" >TIDAK</option>
            <option value="YA" >YA</option>
        </select>
        <br/>
        <br/>
        <input type="text" class="w3-input  w3-round" name="dapo_alasanlayakpip" id="hfd_dapo_alasanlayakpip" placeholder="Terotomasi oleh Dapodik" disabled/>
        </fieldset>
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
        <h3 class="w3-light-green w3-center">DATA ORANG TUA</h3>
        </fieldset>
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
            <h4 class="w3-light-green w3-center">Ayah Kandung</h4>
        <label for="hfd_pd_namaayah">Nama Lengkap Ayah:</label>
        <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="pd_namaayah" ="hfd_pd_namaayah" oninput="ketik_kapital(this)"/>
        <br/>
        <label for="hfd_dapo_tahunlahirayah">Tanggal Lahir Ayah:</label>
        <input type="date" class="w3-padding w3-border w3-border-black w3-round" name="dapo_tahunlahirayah" id="hfd_dapo_tahunlahirayah" onchange="konversi_tanggal(this,'sub_arti_tanggal_ayah')"/>
        Teks Tanggal Lahir: <b class="sub_arti_tanggal_ayah w3-text-red"></b>
        <br/>
        <br/>
        <label for="hfd_dapo_jenjangpendidikanayah">Pendidikan Ayah</label>
            <select class="w3-select warnaeka w3-border" name="dapo_jenjangpendidikanayah" id="hfd_dapo_jenjangpendidikanayah">
            <option value="">Silakan Pilih</option>
            <option value="Tidak Sekolah" >Tidak Sekolah</option>
                <option value="Putus SD">Putus SD</option>
                <option value="SD Sederajat">SD Sederajat</option>
                <option value="SMP Sederajat">SMP Sederajat</option>
                <option value="SMA Sederajat" >SMA Sederajat</option>
                <option value="DI">D1</option>
                <option value="D2">D2</option>
                <option value="D3">D3</option>
                <option value="D4/S1">D4/S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
            </select>
        <br/>
        <br/>
        <label for="hfd_dapo_nikayah">NIK Ayah:</label>
        <input type="number" class="w3-input w3-white w3-border w3-border-black w3-round"  name="dapo_nikayah" id="hfd_dapo_nikayah">
            <br/>
            <label for="hfd_dapo_pekerjaanayah">Pekerjaan Ayah</label>
            <select class="w3-select warnaeka w3-border" name="dapo_pekerjaanayah" id="hfd_dapo_pekerjaanayah">
            <option value="">Silakan Pilih</option>
            <option value="Tidak bekerja" >Tidak bekerja</option>
                <option value="Nelayan">Nelayan</option>
                <option value="Petani">Petani</option>
                <option value="Peternak">Peternak</option>
                <option value="PNS/TNI/Polri">PNS/TNI/Polri</option>
                <option value="Karyawan Swasta">Karyawan Swasta</option>
                <option value="Pedagang Kecil">Pedagang Kecil</option>
                <option value="Pedagang Besar">Pedagang Besar</option>
                <option value="Wiraswasta" >Wiraswasta</option>
                <option value="Wirausaha">Wirausaha</option>
                <option value="Buruh">Buruh</option>
                <option value="Pensiunan">Pensiunan</option>
                <option value="Tenaga Kerja Indonesia (TKI)">Tenaga Kerja Indonesia (TKI)</option>
                <option value="Tidak dapat diterapkan">Tidak dapat diterapkan</option>
                <option value="Meninggal Dunia">Meninggal Dunia</option>
                <option value="Lainnya">Lainnya</option>
            </select>
            <br>
            <br>
            <label for="hfd_dapo_penghasilanayah">Penghasilan Ayah</label>
            <select class="w3-select warnaeka w3-border" name="dapo_penghasilanayah" ="hfd_dapo_penghasilanayah">
            <option value="">Silakan Pilih</option>
            <option value="Kurang dari Rp. 1.000.000,-">Kurang dari Rp. 1.000.000,-</option>
            <option value="Rp. 1.000.000 - Rp. 2.000.000">Rp. 1.000.000 - Rp. 2.000.000</option>
                <option value="Lebih dari Rp. 2.000.000">Lebih dari Rp. 2.000.000</option>
                <option value="Kurang dari Rp. 500.000">Kurang dari Rp. 500.000</option>
                <option value="Rp. 500.000 - Rp. 999.999">Rp. 500.000 - Rp. 999.999</option>
                <option value="Rp. 1.000.000 - Rp. 1.999.999" >Rp. 1.000.000 - Rp. 1.999.999</option>
                <option value="Rp. 2.000.000 - Rp. 4.999.999" >Rp. 2.000.000 - Rp. 4.999.999</option>
                <option value="Rp. 5.000.000 - Rp. 20.000.000">Rp. 5.000.000 - Rp. 20.000.000</option>
                <option value="Lebih dari Rp.20.000.000">Lebih dari Rp.20.000.000</option>
                <option value="Tidak Berpenghasilan">Tidak Berpenghasilan</option>
                <option value="Lainnya">Lainnya</option>
        </select>
        <br/>
        <br/>
        <label for="hfd_dapo_abkayah">Berkebutuhan Khusus?</label>
            <select class="w3-select warnaeka w3-border" name="dapo_abkayah" id="hfd_dapo_abkayah">
            <option value="">Silakan Pilih</option>
                <option value="TIDAK" >Tidak</option> 
                <option value="NETRA (A)">Netra (A)</option>
                <option value="RUNGU (B)">Rungu (B)</option>
                <option value="GRAHITA RINGAN (C)">Grahita Ringan (C)</option>
                <option value="GRAHITA SEDANG (C1)">Grahita Sedang (C1)</option>
                <option value="DAKSA RINGAN (D)">Daksa Ringan (D)</option>
                <option value="DAKSA SEDANG (D1)">Daksa Sedang (D1)</option>
                <option value="INDIGO (O)">Indigo (O)</option>
                <option value="DOWN SINDROME (P)">Down Sindrome (P)</option>
                <option value="AUTIS (Q)">Autis (Q)</option>
                <option value="LARAS (E)">Laras ( E)</option>
                <option value="WICARA (F)">Wicara (F)</option>
                <option value="TUNA GANDA (G)">Tuna Ganda (G)</option>
                <option value="HIPERAKTIF (H)">Hiperaktif (H)</option>
                <option value="CERDAS ISTIMEWA (I)">Cerdas Istimewa (i)</option>
                <option value="BAKAT ISTIMEWA (J)">Bakat Istimewa (J)</option>
                <option value="KESULITAN BELAJAR (K)">Kesulitan Belajar (K)</option> 
            </select>
        </fieldset>
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
        <h4 class="w3-light-green w3-center">Ibu Kandung</h4>
        <label for="hfd_pd_namaibu">Nama Lengkap ibu:</label>
        <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="pd_namaibu" ="hfd_pd_namaibu" oninput="ketik_kapital(this)"/>
        <br/>
        <label for="hfd_dapo_tahunlahiribu">Tanggal Lahir ibu:</label>
        <input type="date" class="w3-padding w3-border w3-border-black w3-round" name="dapo_tahunlahiribu" id="hfd_dapo_tahunlahiribu" onchange="konversi_tanggal(this,'sub_arti_tanggal_ibu')"/>
        Teks Tanggal Lahir: <b class="sub_arti_tanggal_ibu w3-text-red"></b>
        <br/>
        <br/>
        <label for="hfd_dapo_jenjangpendidikanibu">Pendidikan ibu</label>
            <select class="w3-select warnaeka w3-border" name="dapo_jenjangpendidikanibu" id="hfd_dapo_jenjangpendidikanibu">
                <option value="">Silakan Pilih</option>
                <option value="Tidak Sekolah" >Tidak Sekolah</option>
                <option value="Putus SD">Putus SD</option>
                <option value="SD Sederajat">SD Sederajat</option>
                <option value="SMP Sederajat">SMP Sederajat</option>
                <option value="SMA Sederajat" >SMA Sederajat</option>
                <option value="DI">D1</option>
                <option value="D2">D2</option>
                <option value="D3">D3</option>
                <option value="D4/S1">D4/S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
            </select>
        <br/>
        <br/>
        <label for="hfd_dapo_nikibu">NIK ibu:</label>
        <input type="number" class="w3-input w3-white w3-border w3-border-black w3-round"  name="dapo_nikibu" id="hfd_dapo_nikibu">
            <br/>
            <label for="hfd_dapo_pekerjaanibu">Pekerjaan ibu</label>
            <select class="w3-select warnaeka w3-border" name="dapo_pekerjaanibu" id="hfd_dapo_pekerjaanibu">
            <option value="">Silakan Pilih</option>
            <option value="Tidak bekerja" >Tidak bekerja</option>
                <option value="Nelayan">Nelayan</option>
                <option value="Petani">Petani</option>
                <option value="Peternak">Peternak</option>
                <option value="PNS/TNI/Polri">PNS/TNI/Polri</option>
                <option value="Karyawan Swasta">Karyawan Swasta</option>
                <option value="Pedagang Kecil">Pedagang Kecil</option>
                <option value="Pedagang Besar">Pedagang Besar</option>
                <option value="Wiraswasta" >Wiraswasta</option>
                <option value="Wirausaha">Wirausaha</option>
                <option value="Buruh">Buruh</option>
                <option value="Pensiunan">Pensiunan</option>
                <option value="Tenaga Kerja Indonesia (TKI)">Tenaga Kerja Indonesia (TKI)</option>
                <option value="Tidak dapat diterapkan">Tidak dapat diterapkan</option>
                <option value="Meninggal Dunia">Meninggal Dunia</option>
                <option value="Lainnya">Lainnya</option>
            </select>
            <br>
            <br>
            <label for="hfd_dapo_penghasilanibu">Penghasilan ibu</label>
            <select class="w3-select warnaeka w3-border" name="dapo_penghasilanibu" ="hfd_dapo_penghasilanibu">
            <option value="">Silakan Pilih</option>
            <option value="Kurang dari Rp. 1.000.000,-" >Kurang dari Rp. 1.000.000,-</option>
            <option value="Rp. 1.000.000 - Rp. 2.000.000">Rp. 1.000.000 - Rp. 2.000.000</option>
                <option value="Lebih dari Rp. 2.000.000">Lebih dari Rp. 2.000.000</option>
                <option value="Kurang dari Rp. 500.000">Kurang dari Rp. 500.000</option>
                <option value="Rp. 500.000 - Rp. 999.999" >Rp. 500.000 - Rp. 999.999</option>
                <option value="Rp. 1.000.000 - Rp. 1.999.999">Rp. 1.000.000 - Rp. 1.999.999</option>
                <option value="Rp. 2.000.000 - Rp. 4.999.999" >Rp. 2.000.000 - Rp. 4.999.999</option>
                <option value="Rp. 5.000.000 - Rp. 20.000.000">Rp. 5.000.000 - Rp. 20.000.000</option>
                <option value="Lebih dari Rp.20.000.000">Lebih dari Rp.20.000.000</option>
                <option value="Tidak Berpenghasilan">Tidak Berpenghasilan</option>
                <option value="Lainnya">Lainnya</option>
        </select>
        <br/>
        <br/>
        <label for="hfd_dapo_abkibu">Berkebutuhan Khusus?</label>
        <select class="w3-select warnaeka w3-border" name="dapo_abkibu" id="hfd_dapo_abkibu">
        <option value="">Silakan Pilih</option>
                <option value="TIDAK" >Tidak</option> 
                <option value="NETRA (A)">Netra (A)</option>
                <option value="RUNGU (B)">Rungu (B)</option>
                <option value="GRAHITA RINGAN (C)">Grahita Ringan (C)</option>
                <option value="GRAHITA SEDANG (C1)">Grahita Sedang (C1)</option>
                <option value="DAKSA RINGAN (D)">Daksa Ringan (D)</option>
                <option value="DAKSA SEDANG (D1)">Daksa Sedang (D1)</option>
                <option value="INDIGO (O)">Indigo (O)</option>
                <option value="DOWN SINDROME (P)">Down Sindrome (P)</option>
                <option value="AUTIS (Q)">Autis (Q)</option>
                <option value="LARAS (E)">Laras ( E)</option>
                <option value="WICARA (F)">Wicara (F)</option>
                <option value="TUNA GANDA (G)">Tuna Ganda (G)</option>
                <option value="HIPERAKTIF (H)">Hiperaktif (H)</option>
                <option value="CERDAS ISTIMEWA (I)">Cerdas Istimewa (i)</option>
                <option value="BAKAT ISTIMEWA (J)">Bakat Istimewa (J)</option>
                <option value="KESULITAN BELAJAR (K)">Kesulitan Belajar (K)</option> 
            </select>
        </fieldset>
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
        <h4 class="w3-light-green w3-center">Wali</h4>
        <label for="hfd_dapo_namawali">Nama Lengkap wali:</label>
        <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_namawali" ="hfd_dapo_namawali" oninput="ketik_kapital(this)"/>
        <br/>
        <label for="hfd_dapo_tahunlahirwali">Tanggal Lahir wali:</label>
        <input type="date" class="w3-padding w3-border w3-border-black w3-round" name="dapo_tahunlahirwali" id="hfd_dapo_tahunlahirwali" onchange="konversi_tanggal(this,'sub_arti_tanggal_wali')"/>
        Teks Tanggal Lahir: <b class="sub_arti_tanggal_wali w3-text-red"></b>
        <br/>
        <br/>
        <label for="hfd_dapo_jenjangpendidikanwali">Pendidikan wali</label>
            <select class="w3-select warnaeka w3-border" name="dapo_jenjangpendidikanwali" id="hfd_dapo_jenjangpendidikanwali">
            <option value="">Silakan Pilih</option>
            <option value="Tidak Sekolah">Tidak Sekolah</option>
                <option value="Putus SD">Putus SD</option>
                <option value="SD Sederajat">SD Sederajat</option>
                <option value="SMP Sederajat">SMP Sederajat</option>
                <option value="SMA Sederajat" >SMA Sederajat</option>
                <option value="DI">D1</option>
                <option value="D2">D2</option>
                <option value="D3">D3</option>
                <option value="D4/S1">D4/S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
            </select>
        <br/>
        <br/>
        <label for="hfd_dapo_nikwali">NIK wali:</label>
        <input type="number" class="w3-input w3-white w3-border w3-border-black w3-round"  name="dapo_nikwali" id="hfd_dapo_nikwali">
            <br/>
            <label for="hfd_dapo_pekerjaanwali">Pekerjaan wali</label>
            <select class="w3-select warnaeka w3-border" name="dapo_pekerjaanwali" id="hfd_dapo_pekerjaanwali">
            <option value="">Silakan Pilih</option>
            <option value="Tidak bekerja">Tidak bekerja</option>
                <option value="Nelayan">Nelayan</option>
                <option value="Petani">Petani</option>
                <option value="Peternak">Peternak</option>
                <option value="PNS/TNI/Polri">PNS/TNI/Polri</option>
                <option value="Karyawan Swasta">Karyawan Swasta</option>
                <option value="Pedagang Kecil">Pedagang Kecil</option>
                <option value="Pedagang Besar">Pedagang Besar</option>
                <option value="Wiraswasta" >Wiraswasta</option>
                <option value="Wirausaha">Wirausaha</option>
                <option value="Buruh">Buruh</option>
                <option value="Pensiunan">Pensiunan</option>
                <option value="Tenaga Kerja Indonesia (TKI)">Tenaga Kerja Indonesia (TKI)</option>
                <option value="Tidak dapat diterapkan">Tidak dapat diterapkan</option>
                <option value="Meninggal Dunia">Meninggal Dunia</option>
                <option value="Lainnya">Lainnya</option>
            </select>
            <br>
            <br>
            <label for="hfd_dapo_penghasilanwali">Penghasilan wali</label>
            <select class="w3-select warnaeka w3-border" name="dapo_penghasilanwali" ="hfd_dapo_penghasilanwali">
            <option value="">Silakan Pilih</option>
            <option value="Kurang dari Rp. 1.000.000,-">Kurang dari Rp. 1.000.000,-</option>
            <option value="Rp. 1.000.000 - Rp. 2.000.000">Rp. 1.000.000 - Rp. 2.000.000</option>
                <option value="Lebih dari Rp. 2.000.000">Lebih dari Rp. 2.000.000</option>
                <option value="Kurang dari Rp. 500.000">Kurang dari Rp. 500.000</option>
                <option value="Rp. 500.000 - Rp. 999.999">Rp. 500.000 - Rp. 999.999</option>
                <option value="Rp. 1.000.000 - Rp. 1.999.999">Rp. 1.000.000 - Rp. 1.999.999</option>
                <option value="Rp. 2.000.000 - Rp. 4.999.999" >Rp. 2.000.000 - Rp. 4.999.999</option>
                <option value="Rp. 5.000.000 - Rp. 20.000.000">Rp. 5.000.000 - Rp. 20.000.000</option>
                <option value="Lebih dari Rp.20.000.000">Lebih dari Rp.20.000.000</option>
                <option value="Tidak Berpenghasilan">Tidak Berpenghasilan</option>
                <option value="Lainnya">Lainnya</option>
        </select>
        <br/>
        <br/>
        <label for="hfd_dapo_abkwali">Berkebutuhan Khusus?</label>
            <select class="w3-select warnaeka w3-border" name="dapo_abkwali" id="hfd_dapo_abkwali">
            <option value="">Silakan Pilih</option>
            <option value="TIDAK" >Tidak</option> 
                <option value="NETRA (A)">Netra (A)</option>
                <option value="RUNGU (B)">Rungu (B)</option>
                <option value="GRAHITA RINGAN (C)">Grahita Ringan (C)</option>
                <option value="GRAHITA SEDANG (C1)">Grahita Sedang (C1)</option>
                <option value="DAKSA RINGAN (D)">Daksa Ringan (D)</option>
                <option value="DAKSA SEDANG (D1)">Daksa Sedang (D1)</option>
                <option value="INDIGO (O)">Indigo (O)</option>
                <option value="DOWN SINDROME (P)">Down Sindrome (P)</option>
                <option value="AUTIS (Q)">Autis (Q)</option>
                <option value="LARAS (E)">Laras ( E)</option>
                <option value="WICARA (F)">Wicara (F)</option>
                <option value="TUNA GANDA (G)">Tuna Ganda (G)</option>
                <option value="HIPERAKTIF (H)">Hiperaktif (H)</option>
                <option value="CERDAS ISTIMEWA (I)">Cerdas Istimewa (i)</option>
                <option value="BAKAT ISTIMEWA (J)">Bakat Istimewa (J)</option>
                <option value="KESULITAN BELAJAR (K)">Kesulitan Belajar (K)</option> 
            </select>
        </fieldset>
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
            <h4 class="w3-light-green w3-center">DATA PRIODIK PERKEMBANGAN SISWA</h4>
        <label for="hfd_dapo_tinggibadan">Tinggi Badan (Cm):</label>
        <input type="number" class="w3-padding w3-white w3-border w3-border-black w3-round" name="dapo_tinggibadan" id="hfd_dapo_tinggibadan" style="width=80px"/>
        <br/>
        <br/>
            <label for="hfd_dapo_beratbadan">Berat Badan (Kg):</label>
            <input type="number" class="w3-padding w3-white w3-border w3-border-black w3-round" name="dapo_beratbadan" id="hfd_dapo_beratbadan" style="width=80px"/>
            <br/>
            <br/>
            <label for="hfd_dapo_lingkarkepala">Lingkar Kepala:</label>
            <input type="number" class="w3-padding w3-white w3-border w3-border-black w3-round" name="dapo_lingkarkepala" id="hfd_dapo_lingkarkepala" style="width=80px"/>
    </fieldset>
    <fieldset class="w3-card-4 w3-margin w3-light-grey">
            <h4 class="w3-light-green w3-center">BANK PENERIMA KIP</h4>
    <label for="hfd_dapo_bank">Nama Bank PIP:</label>
    <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round"  name="dapo_bank" id="hfd_dapo_bank"/>
    <br/>
    <label for="hfd_dapo_bank">Nomor Rekening Bank PIP:</label>
    <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round"  name="dapo_nomorrekeningbank" id="hfd_dapo_nomorrekeningbank"/>
    <br/>
    <label for="hfd_dapo_rekeningatasnama">Rekening Atas Nama:</label>
    <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round"  name="dapo_rekeningatasnama" id="hfd_dapo_rekeningatasnama"/>
    <br/>

    </fieldset>
    <fieldset class="w3-card-4 w3-margin w3-light-grey">
    <h4 class="w3-light-green w3-center">RIWAYAT SEKOLAH</h4>
    Isian ini untuk mengisi data riwayat sekolah sebelum di ${idNamaSekolah}. Contoh TK, RA, PAUD.<br/><br/>
    Bagi Siswa Pindahan, Isikan nama sekolah sebelumnya.
    <br/>
    <br/>
    <label for="hfd_dapo_sekolahasal">Sekolah Asal:</label>
    <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_sekolahasal" id="hfd_dapo_sekolahasal" oninput="ketik_kapital(this)"/>
    </fieldset> 
    <fieldset class="w3-hide">
    <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="aktif" id="hfd_aktif" disabled placeholder="Status Aktif"/>
    <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dieditoleh" id="hfd_dieditoleh" placeholder="Diusulkan Kepada" disabled />
    <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="action" id="hfd_action" disabled placeholder="Aktifasi"/>
    <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_nopesertaujiannasional" id="hfd_dapo_nopesertaujiannasional" disabled placeholder="No Peserta Ujian (untuk lulusan kelas 6)"/>
    <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_skhun" id="hfd_dapo_skhun" disabled placeholder="Data SKHUN (untuk lulusan kelas 6)"/>
    <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_noseriijazah" id="hfd_dapo_noseriijazah" disabled placeholder="No Seri Ijazah (untuk lulusan kelas 6)"/>
    </fieldset>       
    </form>
   <div class="w3-hide">
        <input type="file" id="input_dok_akte" onchange="fnbaru_unggahfiledulu(this)"/>
        <input type="file" id="input_dok_kk" onchange="fnbaru_unggahfiledulu(this)"/>
        <button id="tombol_titikkoordinat" onclick="getLocation(this)">Koordinat</button>
        <input type="file" id="input_dok_kks" onchange="fnbaru_unggahfiledulu(this)"/>
        <input type="file" id="input_dok_kpspkh" onchange="fnbaru_unggahfiledulu(this)"/>
        <input type="file" id="input_dok_kip" onchange="fnbaru_unggahfiledulu(this)"/>
        </div>
        <div class="w3-margin-top w3-center">
        <button onclick="validasiajuandata(${tokensiswa})" class="w3-button w3-card-4 warnaeka w3-margin w3-border-bottom w3-border-black w3-round-large"><i class="fa fa-paper-plane"></i> Kirim Ajuan </button>
        <button class="w3-button warnaeka w3-card-4 w3-round-large w3-margin w3-border-bottom w3-border-black " onclick="infoloadingljk.innerHTML='';loadingljk.style.display='none'">Tutup Form</button>
        </div>
    </div>
    
    `;

    return html
};

const StringTanggalnol = (tgl) => { //parameter tgl bentuk tgl
    let m = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let y = tgl.getFullYear();


    let string = y + "-" + addZero(m) + "-" + addZero(d);


    //console.log(string)
    return string
}


const fnbaru_unggahfiledulu = (el) => {
    let elemen_id = el.getAttribute("id");
    let id_label = elemen_id.replace("input_", "label_");
    let id_input = elemen_id.replace("input_", "hfd_");

    let elemen_label = document.getElementById(id_label);
    elemen_label.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "end"
    });
    let innersebelumnya = elemen_label.innerHTML;
    elemen_label.innerHTML = `<img scr="/img/barloading.gif"/>`;
    var file = document.getElementById(elemen_id).files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        //document.getElementById('uploadForm').submit();

        let src = e.target.result;
        let data = src.replace(/^.*,/, '');
        let tipe = e.target.result.match(/^.*(?=;)/)[0];
        fn_upload_file(id_input, data, tipe);
        // console.log(tipe);
        // console.log(data);
    }
    reader.readAsDataURL(file);
}

const fn_upload_file = (id_input, param, tipe) => {
    let inputnama = document.querySelector("input[id='hfd_pd_nama']").value; //cpdb_id_file_akta
    let div = document.querySelector("input[id=" + id_input + "]"); //cpdb_id_file_akta
    let namadokumen = id_input.replace("hfd_", "");
    let id_label = id_input.replace("hfd_", "label_")
    let el_label = document.querySelector("label[id=" + id_label + "]"); //cpdb_id_file_akta
    el_label.innerHTML = `<img src="/img/barloading.gif"/>`;
    el_label.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "end"
    });
    let namafile = inputnama.value + "_" + namadokumen;

    let data = new FormData();
    data.append("action", "uploadfiledulu");
    data.append("fileContent", param);
    data.append("mimeType", tipe);
    data.append("filename", namafile);
    data.append("kelas", idNamaKelas);
    var url = url_absensiswa; // + "?action=uploaddulu";
    fetch(url, {
            method: 'post',
            body: data
        }).then(m => m.json())
        .then(r => {
            if (r.sukses == "Gagal") {
                setTimeout(() => {
                    el_label.innerHTML = `<i class="fa fa-upload"></i> Unggah Dokumen`;

                }, 3000);
                el_label.innerHTML = `Gagal Mengunggah`;
            } else {
                el_label.innerHTML = `<i class="fa fa-upload"></i> Unggah Dokumen`;
                div.value = r.idfile;
            }
        })
        .catch(er => {
            console.log(er);
            setTimeout(() => {
                el_label.innerHTML = `<i class="fa fa-upload"></i> Unggah Dokumen`;

            }, 3000);
            el_label.innerHTML = `Gagal Mengunggah`;
            alert("Maaf, terjadi kesalahan. Silakan ulangi sesi Anda sesaat lagi.")
        })
};

function getLocation(el) {
    let id = el.getAttribute("id")
    let elemenlabel = document.getElementById("label_" + id)
    elemenlabel.scrollIntoView();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        hfd_dapo_lintang.value = "Duh, HP Anda tidak support. Coba dengan HP Lain";
        hfd_dapo_bujur.value = "Duh, HP Anda tidak support. Coba dengan HP Lain";
    }
}

function showPosition(position) {
    hfd_dapo_lintang.value = position.coords.latitude;
    hfd_dapo_bujur.value = position.coords.longitude;
    var xJarak = distance(hfd_dapo_lintang.value, hfd_dapo_bujur.value, "K");
    hfd_dapo_jarakrumahkesekolah.value = xJarak.toFixed(3);
}

function distance(lat1, lon1, unit) {
    // var lat2 = -6.4198454;
    // var lon2 = 106.8134214;

    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180

    var radlon1 = Math.PI * lon1 / 180
    var radlon2 = Math.PI * lon2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") {
        dist = dist * 1.609344
    }
    // if (unit == "K") { dist = dist * 0.01609344 }
    if (unit == "N") {
        dist = dist * 0.8684
    }
    return dist
}

function komponenform(form) { // fungsi untuk membuat Array Object beserta value-nya dalam bentuk JSON
    var koleksielement = form.elements;
    var buatkolomheader = Object.keys(koleksielement).filter(function (k) {
        if (koleksielement[k].name === "time_stamp") {
            koleksispam = koleksielement[k].value;
            return false;
        }
        return true; // hasilnya [0,1,2,3, ..., "dieditoleh", "id", "nis", ....berdasarkan nama]

    }).map(function (k) {
        if (koleksielement[k].name !== undefined) {
            return koleksielement[k].name;
        } else if (koleksielement[k].length > 0) {
            return koleksielement[k].item(0).name; //
        }
    }).filter(function (item, pos, self) {
        return self.indexOf(item) == pos && item;
    });

    var dataJSON = {};

    buatkolomheader.forEach(function (name) { // masing-masing element yang memiliki attribute name;
        var nameselement = koleksielement[name];
        dataJSON[name] = nameselement.value;
        if (nameselement.length) {
            var data = [];
            for (var i = 0; i < nameselement.length; i++) {
                var item = nameselement.item(i);
                if (item.checked || item.selected) {
                    data.push(item.value);
                }
            }
            dataJSON[name] = data.join(', ');
        }

    });
    //dataJSON.formDataNameOrder = JSON.stringify(buatkolomheader);
    return {
        data: dataJSON,
        head: buatkolomheader
    }
}
const validasiajuandata = async (tokensiswa) => {
    let namaform = document.getElementById("formajuandatasiswa"); //.elements;
    let dataoke = [];
    let datagaada = [];
    let cekhead = arrayheadsumber.filter(s => s !== "time_stamp"); //array

    let avoid_head = ["aktif", "dieditoleh", "action", "usulanperubahandata"];
    let elemenform = komponenform(namaform); /// object
    let dataelemen = elemenform.data; // {id:"", data: "", dst}

    if (dataelemen.dok_akte == "" || dataelemen.dok_kk == "") {
        alert("Anda wajib mengunggah file akte dan kartu keluarga");
        return
    }
    let objekada = {};
    let keyurut = [];
    let valurut = [];
    for (let i = 0; i < cekhead.length; i++) {
        if (dataelemen[cekhead[i]] == undefined) {
            datagaada.push(cekhead[i]);
            if (angkadistring.indexOf(cekhead[i]) > -1) {
                let n = "'"; //+ dataelemen[cekhead[i]]
                valurut.push(n);
            } else {
                valurut.push("")
            }
        } else {
            dataoke.push(cekhead[i])
            objekada[cekhead[i]] = dataelemen[cekhead[i]]
            if (angkadistring.indexOf(cekhead[i]) > -1) {
                let n = "'" + dataelemen[cekhead[i]]
                valurut.push(n);
            } else {

                valurut.push(dataelemen[cekhead[i]]);
            }
        }
        keyurut.push(cekhead[i]);
    }
    // console.log(keyurut);
    // console.log(valurut)
    let cocok = (JSON.stringify(keyurut) == JSON.stringify(cekhead)) ? "COCOK" : "BEDA";
    // console.log(cocok);

    // console.log("dataoke");
    // console.log(dataoke);
    // console.log("datagaada");
    // console.log(datagaada);
    let tabel = JSON.stringify(valurut);
    let datakirim = new FormData();
    // datakirim.append("action", );
    //datakirim.append("tab", "new_datasiswa");
    datakirim.append("tabel", tabel);
    datakirim.append("tokensiswa", tokensiswa);
    datakirim.append("idss", jlo.ss_datauser);

    infoloadingljk.innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"/></p>`
    await fetch(url_absensiswa + "?action=daftarulangduasheet", {
            method: "post",
            body: datakirim
        })
        .then(m => m.json())
        .then(r => {
            infoloadingljk.innerHTML = r.result;
            // console.log(r)
            let datasiswakelasini = r.datasiswa.filter(s => s.nama_rombel == idNamaKelas && s.aktif == "aktif");
            // console.log(datasiswakelasini)
            jsondatasiswa = datasiswakelasini;
            localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(datasiswakelasini));
        })
        .catch(er => {
            console.log(er);
            infoloadingljk.innerHTML = "Terjadi kesalahan";
        })
    updatesetelahverifikasidaftarulang();

};
const updatesetelahverifikasidaftarulang = async () => {
    await updateDatasiswa()
    document.querySelector(".pesankhusussiswa").innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"/></p>`;
    await fetch(linkDataUserWithIdss + "&action=usulanperbaikandata")
        .then(m => m.json())
        .then(k => {
            //console.log(k);
            let dataaktif = k.datasiswa.filter(s => s.aktif == "aktif");
            let usulkelasini = k.datasiswa.filter(k => (k.nama_rombel == idNamaKelas));
            let usulkelasinibelumdisetujui = dataaktif.filter(k => (k.nama_rombel == idNamaKelas && k.usulanperubahandata.indexOf("disetujui") == -1));
            // console.log(usulkelasinibelumdisetujui.length);
            // console.log(usulkelasinibelumdisetujui.length);

            let usulkelasinisudahdisetujui = dataaktif.filter(k => (k.nama_rombel == idNamaKelas && k.usulanperubahandata.indexOf("disetujui") > -1));
            informasiusulandata["usulanbaru"] = usulkelasinibelumdisetujui;
            informasiusulandata["usulandisetujui"] = usulkelasinisudahdisetujui;
            informasiusulandata["all"] = usulkelasini;

            if (usulkelasinibelumdisetujui.length !== jsondatasiswa.length) {
                document.querySelector(".pesankhusussiswa").className = document.querySelector(".pesankhusussiswa").className.replace(" w3-hide", "");
                document.querySelector(".pesankhusussiswa").innerHTML = `Anda memiliki ${usulkelasinibelumdisetujui.length} usulan data perubahan data baru (Daftar Ulang) dari siswa Anda yang belum disetujui (diverifikasi). Segera Verifikasi data tersebut di menu Data Kelas Anda. (Tombol informasi berwarna merah menandakan siswa yang mengusulkan perbaruan data.)
                <br/>
                <br/>
                <table class="w3-table-all w3-striped" style="width:50%;margin:0 auto">
                <caption>Tabel Pengusulan Perubahan Data (Daftar Ulang)</caption>
                    <tr>
                        <td>Jumlah Siswa</td>
                        <td>${jsondatasiswa.length}</td>
                    </tr><tr>    
                        <td>Usulan <b class="w3-text-red">Belum</b> Diverifikasi</td>
                        <td>${usulkelasinibelumdisetujui.length}</td>
                    </tr><tr>    
                    <td>Usulan <b  class="w3-text-blue">Sudah</b> Diverifikasi</th>
                        <td>${usulkelasinisudahdisetujui.length}</td>
                    </tr>
                </table>
                <hr/>
                `;

            } else {
                if (document.querySelector(".pesankhusussiswa").className.indexOf("w3-hide") == -1) {
                    document.querySelector(".pesankhusussiswa").className += " w3-hide";
                }
            }
            tabeldatakelassaya();

        })
        .catch(er => {
            console.log(er);
        })
};

const printModalinfoljk = (title, ele) => {
    let isi = document.querySelector("#" + ele).innerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO ${title}</title>`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link href="https://fonts.googleapis.com/css?family=Raleway">`;
    head.innerHTML += `<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>`;
    head.innerHTML += `<style type="text/css"> .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000} .garis td,.garis th,.garis tr{border:0.5px solid rgb(119, 116, 116)} .garis th{border:1px solid #000;text-align:center;vertical-align:middle} </style>`;

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

    body.innerHTML = `${isi}`;


    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}
const ketik_kapital = (el) => el.value = el.value.toUpperCase();


const detailformulir = async (tokensiswa) => {
    let ss = jlo.ss_datauser;
    let ur = jlo.url_datauser;
    let ling = ur + "?idss=" + ss;
    let datahtml = "",
        fil;
    loadingljk.style.display = "block";
    $('#infoloadingljk').nextAll('button').remove();

    // let img = document.querySelector(".avatarsiswa");
    // let srcimg = img.getAttribute("src");
    // // console.log(srcimg)'
    infoloadingljk.innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"></p>`;

    await fetch(ling + "&action=usulanperbaikandata")
        .then(m => m.json())
        .then(k => {
            let cariidd = k.datasiswa.filter(s => s.id == tokensiswa);
            let httml = "";
            if (cariidd.length == 0) {
                httml = `<div id="bio_print"><h4 class="w3-center">Siswa ini belum pernah mengusulkan Perubahan Data (Belum pernah mendaftar ulang)</h4>`;
                httml += htmldataprofil();
                httml += `</div><div class="w3-center tempattomboltambahan">
                <br/>        
                <button class="w3-button w3-card-4 w3-round-large warnaeka" onclick="ajuanperubahandataolehguru(${tokensiswa})"> Bantu Isi</button>
                <br/>
                <br/>
                <button class="w3-button w3-card-4 w3-round-large warnaeka" onclick="printModalinfoljk('Data Siswa','bio_print')">Cetak</button>
                <button class="w3-button warnaeka w3-card-4 w3-round-large" onclick="infoloadingljk.innerHTML='';loadingljk.style.display='none'">Tutup Form</button>
                
                </div>`;
            } else {
                httml = `<div id="bio_print">${htmldataprofil()}`;
                httml += `</div><div class="w3-center tempattomboltambahan">
                        <button class="w3-button w3-card-4 w3-round-large warnaeka" onclick="ajuanperubahandata(${tokensiswa})">Verifikasikan</button>
                        <br>
                        <br>
                        <button class="w3-button w3-card-4 w3-round-large warnaeka" onclick="printModalinfoljk('Data Siswa','bio_print')">Cetak</button>
                        <button class="w3-button warnaeka w3-card-4 w3-round-large" onclick="infoloadingljk.innerHTML='';loadingljk.style.display='none'">Tutup Form</button>
                        </div>`;
            }
            infoloadingljk.innerHTML = `${httml}
                `;
            if (cariidd.length !== 0) {
                let cariid = cariidd[0];
                let keyss = Object.keys(cariid);
                let keys = keyss.filter(s => s !== "time_stamp");
                for (i = 0; i < keys.length; i++) {
                    let el = document.querySelector(".hdp_" + keys[i]);
                    if (el == undefined || el == null) {} else {
                        if (keys[i].indexOf("dok_") > -1) {
                            let iddoc = (cariid[keys[i]] == "") ? `<b class="w3-text-red">Tidak Melampirkan</b>` : `<div class="containerbaru"><iframe class="responsive-iframebaru" src="https://drive.google.com/file/d/${(cariid[keys[i]] == "") ? "18Zvo5idM92xYEIzqKDDFnc0iqI6JvUnS" : cariid[keys[i]]}/preview" title="dokumen"></iframe></div>`;
                            el.innerHTML = iddoc;
                        } else if (keys[i].indexOf("tahunlahir") > -1) {
                            el.innerHTML = (cariid[keys[i]] == "") ? "" : tanggalfull(cariid[keys[i]]);
                        } else if (keys[i].indexOf("tanggallahir") > -1) {
                            el.innerHTML = (cariid[keys[i]] == "") ? "" : tanggalfull(cariid[keys[i]]);
                        } else {
                            el.innerHTML = cariid[keys[i]];
                        }
                    }
                }
                let teks = "";
                let status = cariid.usulanperubahandata;

                if (status.indexOf("disetujui") > -1) {
                    teks = ""; //status
                } else {
                    teks = "dan Anda harus segera memverifikasinya"
                }
                if (cariidd.length == 0) {
                    alert("Ananda belum pernah mengirimkan perubahan data (Belum daftar ulang)");
                } else {
                    alert("Siswa ini mengirimkan perubahan data " + status + " " + teks);


                }
            } else {
                let cariid = jsondatasiswa.filter(s => s.id == tokensiswa)[0];
                let keyss = Object.keys(cariid);
                let keys = keyss.filter(s => s !== "time_stamp");
                for (i = 0; i < keys.length; i++) {
                    let el = document.querySelector(".hdp_" + keys[i]);
                    if (el == undefined || el == null) {} else {
                        if (keys[i].indexOf("dok_") > -1) {
                            let iddoc = (cariid[keys[i]] == "") ? `<b class="w3-text-red">Tidak Melampirkan</b>` : `<div class="containerbaru"><iframe class="responsive-iframebaru" src="https://drive.google.com/file/d/${(cariid[keys[i]] == "") ? "18Zvo5idM92xYEIzqKDDFnc0iqI6JvUnS" : cariid[keys[i]]}/preview" title="dokumen"></iframe></div>`;
                            el.innerHTML = iddoc;
                        } else if (keys[i].indexOf("tahunlahir") > -1) {
                            el.innerHTML = (cariid[keys[i]] == "") ? "" : tanggalfull(cariid[keys[i]]);
                        } else if (keys[i].indexOf("tanggallahir") > -1) {
                            el.innerHTML = (cariid[keys[i]] == "") ? "" : tanggalfull(cariid[keys[i]]);
                        } else {
                            el.innerHTML = cariid[keys[i]];
                        }
                    }
                }
            }
        })
        .catch(er => {
            console.log(er);
            infoloadingljk.innerHTML = "Terjadi kesalahan. Ulangi sesi Anda sesaat lagi."
        })
};
const ajuanperubahandata = async (tokensiswa) => {
    let ss = jlo.ss_datauser;
    let ur = jlo.url_datauser;
    let ling = ur + "?idss=" + ss;
    let datahtml = "",
        cariid;
    let namakelas = idNamaKelas;
    loadingljk.style.display = "block";
    $('#infoloadingljk').nextAll('button').remove();
    // let img = document.querySelector(".avatarsiswa");
    // let srcimg = img.getAttribute("src");
    // // console.log(srcimg)'
    infoloadingljk.innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"></p>`;

    await fetch(ling + "&action=usulanperbaikandata")
        .then(m => m.json())
        .then(k => {
            // console.log(k);
            let sumber = k.datasiswa.filter(s => s.id == tokensiswa);
            //console.log(sumber);
            datahtml = htmlformulirdatasiswa(tokensiswa);
            infoloadingljk.innerHTML = datahtml;
            let obj = sumber[0];
            obj.action = "";
            let statussebelumnya = obj.usulanperubahandata

            obj.usulanperubahandata = "Ajuan Ke-" + (parseInt(statussebelumnya.match(/(\d+)/)[0])) + " disetujui";


            let key = Object.keys(obj); // key == header
            let nilai = Object.keys(obj).map(m => obj[m]);

            var elementform = document.getElementById("formajuandatasiswa").elements;
            for (x = 0; x < elementform.length; x++) {
                for (d = 0; d < key.length; d++) {
                    if (elementform[x].name == key[d]) {
                        if (elementform[x].type == "date") {
                            elementform[x].value = StringTanggalnol(new Date(nilai[d])) //;
                        } else if (elementform[x].type == "radio") {
                            if (elementform[x].value == nilai[d]) {
                                elementform[x].checked = true;
                            }
                        } else if (elementform[x].type == "select-one") {
                            // if (elementform[x].options[elementform[x].selectedIndex].value == nilai[d]) {
                            //     elementform[x].options[elementform[x].selectedIndex].selected = true;
                            //     //     elementform[x].selected = true;
                            // }
                            elementform[x].value = nilai[d];
                            // console.log(elementform[x].name + "|" + elementform[x].type)
                        } else {
                            if (angkadistring.indexOf(key[d]) > -1) {
                                console.log(key[d]);
                                elementform[x].value = nilai[d];
                            } else {
                                elementform[x].value = nilai[d]

                            }
                        };
                        //ganti id
                        if (key[d].indexOf("dok_") > -1) {
                            let idel = "hdp_" + key[d];
                            //console.log(idel);
                            let elemendiv = document.querySelector("#" + idel);
                            if (elemendiv !== undefined || elemendiv !== null) {
                                let iddrive = (nilai[d] == "") ? `<p class="w3-text-red w3-ceneter">Tidak Melampirkan</p><div class="containerbaru"><iframe class="responsive-iframebaru" src="https://drive.google.com/file/d/18Zvo5idM92xYEIzqKDDFnc0iqI6JvUnS/preview" title="dokumen"></iframe></div>` : `<div class="containerbaru"><iframe class="responsive-iframebaru" src="https://drive.google.com/file/d/${nilai[d]}/preview" title="dokumen"></iframe></div>`;
                                elemendiv.innerHTML = iddrive;
                            }

                        }
                    }

                }
            }

        }).catch(er => {
            console.log(er);
            infoloadingljk.innerHTML = "Terjadi kesalahan."
        })

};
const ajuanperubahandataolehguru = async (tokensiswa) => {
    let ss = jlo.ss_datauser;
    let ur = jlo.url_datauser;
    let ling = ur + "?idss=" + ss;
    let datahtml = "",
        cariid;
    let namakelas = idNamaKelas;
    loadingljk.style.display = "block";
    $('#infoloadingljk').nextAll('button').remove();
    // let img = document.querySelector(".avatarsiswa");
    // let srcimg = img.getAttribute("src");
    // // console.log(srcimg)'
    infoloadingljk.innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"></p>`;

    await fetch(ling + "&action=datasiswaaktif&kelas=" + namakelas)
        .then(m => m.json())
        .then(k => {
            // console.log(k);
            ///update local storage
            jsondatasiswa = k.datasiswa;
            localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(k));

            let sumber = k.datasiswa.filter(s => s.id == tokensiswa);

            // console.log(sumber);
            datahtml = htmlformulirdatasiswa(tokensiswa);
            infoloadingljk.innerHTML = `<div class="bio_print">${datahtml}</div>`;
            let obj = sumber[0];
            obj.action = "";
            obj.action = "";
            let statussebelumnya = obj.usulanperubahandata
            if (statussebelumnya.indexOf("disetujui") > -1) {
                obj.usulanperubahandata = "Ajuan Ke-" + (parseInt(statussebelumnya.match(/(\d+)/)[0]) + 1) + "disetujui dan isian dibantu guru ke-" + parseInt(statussebelumnya.match(/(\d+)/)[0]) + 1;
            } else {
                obj.usulanperubahandata = "Ajuan Ke-1";
            }
            let key = Object.keys(obj); // key == header
            let nilai = Object.keys(obj).map(m => obj[m]);

            var elementform = document.getElementById("formajuandatasiswa").elements;
            for (x = 0; x < elementform.length; x++) {
                for (d = 0; d < key.length; d++) {
                    if (elementform[x].name == key[d]) {
                        if (elementform[x].type == "date") {
                            elementform[x].value = StringTanggalnol(new Date(nilai[d])) //;
                        } else if (elementform[x].type == "radio") {
                            if (elementform[x].value == nilai[d]) {
                                elementform[x].checked = true;
                            }
                        } else if (elementform[x].type == "select-one") {
                            elementform[x].value = nilai[d];
                        } else {
                            if (angkadistring.indexOf(key[d]) > -1) {
                                elementform[x].value = nilai[d].replace("'", "")
                            } else {
                                elementform[x].value = nilai[d]
                            }
                        };
                        //ganti id
                        if (key[d].indexOf("dok_") > -1) {
                            let idel = "hdp_" + key[d];
                            //console.log(idel);
                            let elemendiv = document.querySelector("#" + idel);
                            if (elemendiv !== undefined || elemendiv !== null) {
                                let iddrive = (nilai[d] == "") ? `<p class="w3-text-red w3-ceneter">Tidak Melampirkan</p><div class="containerbaru"><iframe class="responsive-iframebaru" src="https://drive.google.com/file/d/18Zvo5idM92xYEIzqKDDFnc0iqI6JvUnS/preview" title="dokumen"></iframe></div>` : `<div class="containerbaru"><iframe class="responsive-iframebaru" src="https://drive.google.com/file/d/${nilai[d]}/preview" title="dokumen"></iframe></div>`;
                                elemendiv.innerHTML = iddrive;
                            }

                        }
                    }

                }
            }

        }).catch(er => {
            console.log(er);
            infoloadingljk.innerHTML = "Terjadi kesalahan."
        })

};