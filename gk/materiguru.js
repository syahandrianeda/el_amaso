
const updatematerikan = () => {

    let idokmateri = tglStringZero();
    localStorage.removeItem("kbmtoday" + idokmateri);
    let parameterlain = "&crtToken=" + idokmateri + "&idtoken=" + idJenjang;
    $.getJSON(linkmateri + parameterlain + "&action=materihariini", function (f) {
        //             //console.log(f)
        let data = f.result;
        localStorage.setItem("kbmtoday" + idokmateri, JSON.stringify(data));

        kbm_hari_ini.innerHTML = `
                    <h3 class="w3-card w3-padding"><button class="w3-button w3-pink w3-round w3-right w3-tiny" onclick="updatematerikan()"><i class="fa fa-refresh"></i> Materi</button><br>Ada ${data.length} Materi Pembelajaran untuk hari Hari:</h3><br>`

        for (i = 0; i < data.length; i++) {
            kbm_hari_ini.innerHTML += `<h4> Materi ke- ${i + 1}</h4>`
            let tabel = document.createElement("table");
            tabel.setAttribute("class", "versi-table w3-card w3-bordered");
            let brs = tabel.insertRow(0);
            let sel = brs.insertCell(-1)
            sel.innerHTML = "Identitas Materi"
            sel = brs.insertCell(-1);
            sel.innerHTML = data[i].idmapel;

            brs = tabel.insertRow(-1);
            sel = brs.insertCell(-1)
            sel.innerHTML = "Jenis Tagihan"
            sel = brs.insertCell(-1);
            sel.innerHTML = (data[i].idaksessiswa == "sekali") ? "Ulangan (Menerima data nilai)" : "Latihan (tidak menerima nilai siswa)";

            brs = tabel.insertRow(-1);
            sel = brs.insertCell(-1)
            sel.innerHTML = "Jumlah PG"
            sel = brs.insertCell(-1);
            sel.innerHTML = data[i].jumlahpg;

            brs = tabel.insertRow(-1);
            sel = brs.insertCell(-1)
            sel.innerHTML = "Jumlah Essay"
            sel = brs.insertCell(-1);
            sel.innerHTML = data[i].jumlahessay;

            brs = tabel.insertRow(-1);
            sel = brs.insertCell(-1)
            sel.innerHTML = "Lihat Materi"
            sel = brs.insertCell(-1);
            sel.innerHTML = `<button class="w3-button w3-green" onclick="previewriwayat(${i})">Tampilkan</button>`;
            if (data[i].idaksessiswa == "beberapa kali") {
                brs = tabel.insertRow(-1);
                sel = brs.insertCell(-1)
                sel.innerHTML = "Respon Siswa"
                sel = brs.insertCell(-1);
                sel.innerHTML = `Tidak ada tagihan`;
            } else {
                brs = tabel.insertRow(-1);
                sel = brs.insertCell(-1)
                sel.innerHTML = "Lihat Materi"
                sel = brs.insertCell(-1);
                sel.innerHTML = `<button class="w3-button w3-blue" onclick="getdaftarnilai(${i})">Nilai Siswa</button>`;
            }


            kbm_hari_ini.appendChild(tabel)
        }
    }).fail(function (er) { kbm_hari_ini.innerHTML = "Terjadi kesalahan... coba lagi. <br>kode error: " + er })

}
const previewriwayat = (par) => {
    pranalamateri.style.display = "block";
    document.querySelector(".classReviewMateri").innerHTML = "";
    let tes = document.querySelector(".classReviewMateri");
    let keyy = "kbmtoday" + tglStringZero()

    let datamateri = JSON.parse(localStorage.getItem(keyy))

    //bikin judul h4
    var judul = document.createElement("h4")
    judul.setAttribute("class", "w3-center");
    judul.innerHTML = "Identitas e-Lamaso";
    tes.innerHTML = ""
    tes.appendChild(judul);

    //-- Bikin Tabel identitas:
    var tabelidentitas = document.createElement("table");
    tabelidentitas.setAttribute("class", "versi-table tabel_idreview");
    tabelidentitas.setAttribute("style", "margin:auto");
    var tr = tabelidentitas.insertRow(-1);

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Sekolah"
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idSekolah
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Nama Siswa"
    var td = tr.insertCell(-1);
    td.innerHTML = "NAMA SISWA ANDA"
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kelas"
    var td = tr.insertCell(-1);
    td.innerHTML = idNamaKelas;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Mapel/Tema"
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idmapel;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Frekuensi Akses"
    var td = tr.insertCell(-1);
    var keteranganakses;
    if (datamateri[par].idaksessiswa == "sekali") {
        keteranganakses = "TEST <br>Sekali saja sejak mengirim nilai"
    } else {
        keteranganakses = "LATIHAN <br>Berapa kali saja untuk latihan"
    }
    td.innerHTML = keteranganakses;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Tanggal Publikasi"
    var td = tr.insertCell(-1);
    td.innerHTML = tanggalfulllengkap(datamateri[par].idtgl);

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kompetensi KD<br><sub class='w3-text-red'>Tidak akan muncul di siswa</sub>"
    var td = tr.insertCell(-1);
    td.setAttribute("id", "forKD")
    td.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kunci Jawaban<br><sub class='w3-text-red'>Tidak akan muncul di siswa</sub>"
    var td = tr.insertCell(-1);
    td.setAttribute("id", "forkuncijawaban")
    td.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;


    var tr = tabelidentitas.insertRow(-1);
    var cel1 = tr.insertCell(-1);
    cel1.setAttribute("id", "timer");
    cel1.setAttribute("colspan", "2");
    cel1.setAttribute("style", "text-align:center");
    cel1.innerHTML = "Timer: ";
    var cdtimer = document.createElement("input")
    cdtimer.setAttribute("id", "cd_seconds");
    cdtimer.setAttribute("disabled", "true");
    cdtimer.setAttribute("value", datamateri[par].iddurasi);
    cdtimer.setAttribute("style", "width:50px")
    cel1.appendChild(cdtimer);
    cel1.innerHTML += " Menit."
    var tr = tabelidentitas.insertRow(-1);
    var cel1 = tr.insertCell(-1);
    cel1.setAttribute("id", "tempatdurasi");
    cel1.setAttribute("colspan", "2");
    cel1.setAttribute("style", "text-align:center");
    var cdstatus = document.createElement("b");
    cdstatus.setAttribute("id", "cd_status");
    var tekscdstatus = document.createTextNode("Durasi Penyelesaian:");
    cdstatus.appendChild(tekscdstatus);
    var cdjam = document.createElement("span");
    cdjam.setAttribute("id", "cd_h");
    var tekscdjam = document.createTextNode("00:");
    cdjam.appendChild(tekscdjam);
    var cdmenit = document.createElement("span");
    cdmenit.setAttribute("id", "cd_m");
    var tekscdmenit = document.createTextNode("00:");
    cdmenit.appendChild(tekscdmenit);
    var cddetik = document.createElement("span");
    cddetik.setAttribute("id", "cd_s");
    var tekscddetik = document.createTextNode("00");
    cddetik.appendChild(tekscddetik);
    var cdpause = document.createElement("input")
    cdpause.setAttribute("type", "button");
    cdpause.setAttribute("id", "cd_pause");
    cdpause.setAttribute("value", "Jeda");
    var cdpstop = document.createElement("input")
    cdpstop.setAttribute("type", "button");
    cdpstop.setAttribute("id", "cd_stop");
    cdpstop.setAttribute("value", "Selesai");
    var gntibaris = document.createElement("br");
    var controltimer = document.createElement("b")
    var tekscontroltimer = document.createTextNode("Control Timer:");
    controltimer.appendChild(tekscontroltimer);
    var controlstart = document.createElement("input");
    controlstart.setAttribute("type", "button");
    controlstart.setAttribute("id", "cd_start");
    controlstart.setAttribute("value", "Mulai Mengerjakan");
    var controlreset = document.createElement("input");
    controlreset.setAttribute("type", "button");
    controlreset.setAttribute("id", "cd_reset");
    controlreset.setAttribute("value", "Reset Timer");
    var titikdua = document.createElement("b");
    var tekstitikdua = document.createTextNode(":");
    titikdua.appendChild(tekstitikdua);
    cel1.appendChild(controltimer);
    cel1.innerHTML += "<br/>";
    cel1.appendChild(controlstart);
    //cel1.appendChild(controlreset);
    //cel1.appendChild(cdpause);
    cel1.appendChild(cdpstop);
    cel1.appendChild(gntibaris);
    cel1.appendChild(cdstatus);
    cel1.innerHTML += ":<br/>";
    cel1.appendChild(cdjam);
    cel1.innerHTML += "";
    cel1.appendChild(cdmenit);
    cel1.appendChild(titikdua)
    cel1.appendChild(cddetik);
    cel1.innerHTML += "<br/><sub>Waktu hanya berjalan di laman siswa</sub>";

    tes.appendChild(tabelidentitas)
    var brek = document.createElement("div")

    brek.setAttribute("style", "break-after:page");
    tes.appendChild(brek)

    var idm = encodeURIComponent(datamateri[par].idmateri);
    //
    $('.classReviewMateri').nextAll('button').remove();
    $.getJSON(linkmateri + "&idmateri=" + idm + "&action=previewriwayat", function (json) {
        //  loadingmodal.style.display="none";
        //$("#output").html(brkline(json))
        // document.getElementById("judulpetunjuk").innerHTML = "Preview e-Lamaso";
        //        document.getElementById("isipetunjuk").innerHTML = brkline(json);
        //   document.querySelector(".kontenmateri").innerHTML += brkline(json);
        tes.innerHTML += brkline(json).teks;
        let inhtml = "<table class='versi-table w3-tiny'><tr><td>Mapel</td><td>KD</td><td>No Soal</td></tr>";
        let xx = brkline(json).kd.split("<br>");
        for (a = 0; a < xx.length; a++) {
            inhtml += `<tr><td> ${xx[a].split("_")[0]}</td><td> ${xx[a].split("_")[1].split(":")[0]}</td><td>${xx[a].split("_")[1].split(":")[1]}</td></tr>`
        }
        inhtml += `</table>`;

        forKD.innerHTML = inhtml;

        let tekskunci = brkline(json).kunci;
        //console.log(tekskunci);
        if (tekskunci == "" || tekskunci == "undefined" || tekskunci == null) {
            forkuncijawaban.innerHTML = "Tidak Ada PG"
        } else {
            forkuncijawaban.innerHTML = window.atob(tekskunci).split(",").join("<br>");

        }


        var elEssay = document.getElementsByClassName("soalessay")
        if (elEssay.length !== 0) {
            for (i = 0; i < elEssay.length; i++) {
                var idEl = elEssay[i].getAttribute("id");
                var inidEl = idEl.replace("essay", "");
                var tempattombol = document.getElementById("tomboljawaban" + inidEl);
                var tombolsatu = document.createElement("button");
                tombolsatu.setAttribute("onclick", "tombolketikjawaban('" + inidEl + "')");
                var tekstombolsatu = document.createTextNode("Ketik Jawaban No " + inidEl);
                tombolsatu.appendChild(tekstombolsatu);
                tempattombol.appendChild(tombolsatu);
                tempattombol.innerHTML += "<br/><sub>atau</sub></br/> "
                var tomboldua = document.createElement("button");
                tomboldua.setAttribute("onclick", "tomboluploadjawaban('" + inidEl + "')");
                var tekstomboldua = document.createTextNode("Upload Jawaban No " + inidEl);
                tomboldua.appendChild(tekstomboldua);
                tempattombol.appendChild(tomboldua);
                tempattombol.innerHTML += "<br/><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>"

            }
        }

        let tombol = document.createElement("button");
        tombol.setAttribute("class", "w3-button w3-dark-grey w3-display-bottommiddle w3-margin-bottom");
        tombol.setAttribute("onclick", `printPortrait('idpracetak,,,${StringTanggal(new Date())}')`);
        tombol.innerHTML = `<i class="fa fa-print"></i>  Cetak `

        tes.after(tombol)
    })
    // ;


}

const getdaftarnilai = (id) => {
    //alert(id)
    let teks = "kbmtoday" + tglStringZero();
    idtabaktif.innerHTML = id;
    koreksidarimana.innerHTML = id + "_hariini"
    let datamaterilocal = JSON.parse(localStorage.getItem(teks))[id];
    let materi = datamaterilocal.idmapel.toUpperCase();

    let mtri = datamaterilocal.idmapel;
    let tagih = datamaterilocal.jenistagihan;
    //alert (teks)
    let kodeunik = tagih + "_" + tglStringZero();
    modaldaftarnilai.style.display = "block";
    document.querySelector("#modalidmapel").innerHTML = "<br>" + tagih + " " + materi;
    document.getElementsByClassName("tablink")[0].click();
    //$.getJSON(constlinknilai+"&action=dataanalisisharian", function(json))
    // let kelas = e.parameter.idkelas;
    // let idmapel = e.parameter.idmapel;
    // let kodeunik = e.parameter.kodeunik;
    let paramtambahan = "&idkelas=" + encodeURIComponent(idNamaKelas);
    paramtambahan += "&idmapel=" + encodeURIComponent(mtri);
    paramtambahan += "&kodeunik=" + encodeURIComponent(kodeunik)
    tablinkKDtabel.innerHTML = `<i class="fa fa-refresh fa-spin w3-xxxlarge"><i>`
    fetch(constlinknilai + "?action=dataanalisisharian" + paramtambahan)
        .then(m => m.json())
        .then(f => {
            nilairespon = f.records;
            forModalTabel(id)
            //console.log(f)
        }
        )


}


function bukaModalTab(evt, cityName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].classList.remove("w3-light-grey");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.classList.add("w3-light-grey");

}

const forModalTabel = (id) => {
    //tes dulu bekerja di id tablinkKDtabel

    let datamaterilocal = JSON.parse(localStorage.getItem("kbmtoday" + tglStringZero()))[id];
    // // console.log(JSON.parse(datamaterilocal.kuncikd));
    let identitasmapel = datamaterilocal.idmapel;
    let datakd = JSON.parse(datamaterilocal.kuncikd);
    let punyaessay = (datamaterilocal.jumlahessay == 0) ? false : true;
    // console.log(punyaessay)

    // console.log("datakd:")
    // console.log(datakd)

    let banyakkd = Object.keys(datakd);

    // console.log("banyakkd:")
    // console.log(banyakkd.length);
    // console.log("idKD");
    // console.log(banyakkd)
    // filter untuk dijadikan unik pada key
    let mapelunik = [];
    let koleksikd = []
    let kdpermapel = {};
    for (i = 0; i < banyakkd.length; i++) {
        let mp = banyakkd[i].split("_")[0]
        if (mapelunik.indexOf(mp) == -1) {
            mapelunik.push(mp);
        }
    }
    let koleksinamasiswa = jsondatasiswa.map(k => k.pd_nama)
    let koleksitokensiswa = jsondatasiswa.map(k => k.id)

    // console.log(kdpermapel);
    // console.log(mapelunik)
    //bikin tabel
    let tabel = document.createElement("table")
    tabel.setAttribute("class", "versi-table w3-tiny");
    tabel.setAttribute("id", "tabel_rekap_KD");
    //bikin head;
    //let row = tabel.insertRow(0)
    let rthead = tabel.createTHead();
    let rth = rthead.insertRow(0)
    let rtd = document.createElement("th")
    rtd.setAttribute("rowspan", 3)
    rtd.innerHTML = "No"
    rth.appendChild(rtd);
    rtd = document.createElement("th")
    rtd.setAttribute("rowspan", 3)
    rtd.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
    rtd.innerHTML = "Nama Siswa"
    rth.appendChild(rtd);
    // if (punyaessay) {
    //     rtd = document.createElement("th")
    //     rtd.setAttribute("rowspan", 3)
    //     rtd.innerHTML = "Koreksi"
    //     rth.appendChild(rtd);
    // }
    rtd = document.createElement("th")
    rtd.setAttribute("rowspan", 3)
    rtd.innerHTML = "Aksi"
    rth.appendChild(rtd);

    rtd = document.createElement("th")
    rtd.setAttribute("colspan", banyakkd.length)
    rtd.innerHTML = "Mata Pelajaran"
    rth.appendChild(rtd);

    rth = rthead.insertRow(-1);
    rth.setAttribute("colspan", banyakkd.length);
    rth2 = rthead.insertRow(-1)
    for (k = 0; k < mapelunik.length; k++) {
        rtd = document.createElement("th")
        //  rtd.innerHTML = mapelunik[k]
        //  rth.appendChild(rtd);
        let coun = 0;

        for (j = 0; j < banyakkd.length; j++) {

            let st = banyakkd[j]
            if (st.indexOf(mapelunik[k]) > -1) {
                coun++;


                //let tekconsol = "Mapel " + mapelunik[k] +"KD " + banyakkd[j];
                //console.log(tekconsol)
                let rtd1 = document.createElement("th")
                rtd1.innerHTML = banyakkd[j].split("_")[1] + "<br>" + banyakkd[j]
                rth2.appendChild(rtd1);
            }
        }
        rtd.innerHTML = mapelunik[k]
        rtd.setAttribute("colspan", coun)
        rth.appendChild(rtd);
    }
    let tbo = tabel.createTBody();
    for (z = 0; z < koleksinamasiswa.length; z++) {
        let rowisi = tbo.insertRow(-1);
        let sel = rowisi.insertCell(-1)
        sel.innerHTML = (z + 1);

        sel = rowisi.insertCell(-1)
        sel.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
        sel.innerHTML = koleksinamasiswa[z];
        // if (punyaessay) {
        sel = rowisi.insertCell(-1)
        sel.innerHTML = tombolaksihariini(punyaessay, koleksitokensiswa[z]);
        // }
        for (a = 0; a < mapelunik.length; a++) {
            //  rtd.innerHTML = mapelunik[k]
            //  rth.appendChild(rtd);
            let coun = 0;

            for (j = 0; j < banyakkd.length; j++) {

                let st = banyakkd[j]
                if (st.indexOf(mapelunik[a]) > -1) {
                    coun++;


                    let tekconsol = "Mapel " + mapelunik[a] + "KD " + banyakkd[j];
                    //console.log(tekconsol)

                    let sell = rowisi.insertCell(-1)
                    sell.innerHTML = nilaiKDSiswa(koleksitokensiswa[z], banyakkd[j]).replace(".", ",");// banyakkd[j] + "nama = " + koleksinamasiswa[z];

                }
            }
        }

    }



    let idtabel = `tabel_rekap_KD`;
    let judul1 = `DAFTAR NILAI PER-KD ${identitasmapel.toUpperCase()}  KELAS ${idNamaKelas.toUpperCase()}`;
    let judul2 = `Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}`;
    let tekstgl = `${StringTanggal(new Date())}`;
    let namafile = `DAFTAR NILAI PER-KD ${identitasmapel.toUpperCase()} Kelas ${idNamaKelas} id file ${new Date().getTime()}`;
    let xx = `${idtabel}, ${judul1}, ${judul2}, ${tekstgl}`;
    let xxx = `${idtabel}, ${namafile},${judul1}`

    tablinkKDtabel.innerHTML = `<button button class="w3-button w3-green w3-round-xlarge" onclick = "printModalPKD('${xx}')" > <i class="fa fa-print"></i> Cetak </button > | <button class="w3-button w3-teal w3-round-xlarge" onclick="ExcelModalKD('${xxx}')"><i class="fa fa-file-excel-o"></i> Ms. Excel </button>  <hr>`;

    //tablinkKDtabel.appendChild(tombolprint)
    tablinkKDtabel.appendChild(tabel);

}

const nilaiKDSiswa = (parNama, keyKD) => {
    let FilterRec = nilairespon.filter(k => k.tokensiswa == parNama);
    let jmlh = FilterRec.length, nn;
    if (jmlh > 0) {

        let arry = FilterRec[jmlh - 1].nilaikd
        let obj = JSON.parse(arry)[keyKD]
        //nn = JSON.parse(FilterRec[jmlh - 1].nilaikd)[keyKD];
        nn = (obj >= 0) ? obj : "0.00";
        //console.log(nn)
    } else {
        nn = ""
    }
    return nn
}
const OpsiSiswa = (parNama, keyKD) => {

    let angka = keyKD.match(/(\d+)/)[0] // mengembalikan angkanya aja
    let cek = nilairespon.filter(k => k.tokensiswa == parNama).map(d => [d[keyKD], d["SKOR_" + angka]]);
    let ada = cek.length;

    let opsinya = [];
    if (ada > 0) {
        opsinya = [true, cek[ada - 1][0], cek[ada - 1][1]];
    } else {
        opsinya = [false]
    }

    return opsinya
}

document.querySelector(".tabpg").addEventListener("click", function () {
    let a = parseInt(idtabaktif.innerHTML);

    formModalTabelAnalisisPG(a)
})
document.querySelector(".tabskor").addEventListener("click", function () {
    let a = parseInt(idtabaktif.innerHTML);
    formModalTabelAnalisisSkor(a)
})
// document.querySelector(".tabgabungan").addEventListener("click", function () {
//     let a = parseInt(idtabaktif.innerHTML);
//     forModalTabelGabungan(a)
// })


const formModalTabelAnalisisPG = (id) => {
    let datamaterilocal = JSON.parse(localStorage.getItem("kbmtoday" + tglStringZero()))[id];
    // let jumlahpg = parseInt(datamaterilocal.jumlahpg);
    let jumlahpg = (datamaterilocal.jumlahpg == 0) ? 1 : parseInt(datamaterilocal.jumlahpg);


    let identitasmapel = datamaterilocal.idmapel;
    //console.log(jumlahpg);
    let koleksinamasiswa = jsondatasiswa.map(k => k.pd_nama);
    let koleksitokensiswa = jsondatasiswa.map(k => k.id);

    let tabel = document.createElement("table");
    tabel.setAttribute("class", "versi-table w3-tiny");
    tabel.setAttribute("id", "table_rekap_pg");
    let thead = tabel.createTHead();
    let row = thead.insertRow(0);
    let th = document.createElement("th");
    th.setAttribute("rowspan", 2)
    th.innerHTML = "No";
    row.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("rowspan", 2)
    th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
    th.innerHTML = "NAMA SISWA";
    row.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("colspan", jumlahpg)
    th.innerHTML = "NOMOR SOAL";
    row.appendChild(th);

    row = thead.insertRow(-1)
    if (datamaterilocal.jumlahpg !== 0) {
        for (b = 0; b < jumlahpg; b++) {
            th = document.createElement("th");
            th.innerHTML = (b + 1);
            row.appendChild(th);
        }
    } else {
        th = document.createElement("th");
        th.innerHTML = "Tidak Ada PG";
        row.appendChild(th);
    }


    let bdy = tabel.createTBody();
    for (c = 0; c < koleksinamasiswa.length; c++) {
        let tr = bdy.insertRow(-1)
        let sel = tr.insertCell(-1)
        sel.innerHTML = (c + 1);

        sel = tr.insertCell(-1);
        sel.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
        sel.innerHTML = koleksinamasiswa[c];
        if (datamaterilocal.jumlahpg !== 0) {
            for (d = 0; d < jumlahpg; d++) {
                sel = tr.insertCell(-1)
                //sel.innerHTML = OpsiSiswa(koleksitokensiswa[c],"PG_" + (d+1));
                if (OpsiSiswa(koleksitokensiswa[c], "PG_" + (d + 1))[0]) {
                    if (OpsiSiswa(koleksitokensiswa[c], "PG_" + (d + 1))[2] == 1) {
                        sel.setAttribute("style", "background-color:green");
                        sel.innerHTML = OpsiSiswa(koleksitokensiswa[c], "PG_" + (d + 1))[1]
                    } else {
                        sel.setAttribute("style", "background-color:red");
                        sel.innerHTML = OpsiSiswa(koleksitokensiswa[c], "PG_" + (d + 1))[1]
                    }

                } else {
                    sel.innerHTML = ""
                }


            }

        } else {
            sel = tr.insertCell(-1)
            sel.innerHTML = "Tidak ada Soal PG"

        }

    }


    let idtabel = `table_rekap_pg`;
    let judul1 = `ANALISIS SOAL ${identitasmapel.toUpperCase()}  KELAS ${idNamaKelas.toUpperCase()}`;
    let judul2 = `Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}`;
    let tekstgl = `${StringTanggal(new Date())}`;
    let namafile = `ANALISIS SOAL ${identitasmapel.toUpperCase()} Kelas ${idNamaKelas} id file ${new Date().getTime()}`;
    let xx = `${idtabel},${judul1}, ${judul2}, ${tekstgl}`;
    let xxx = `${idtabel}, ${namafile},${judul1}`

    tablinkPGtabel.innerHTML = `<button class="w3-button w3-green w3-round-xlarge" onclick="printModalL('${xx}')"><i class="fa fa-print"></i> Cetak </button> | <button class="w3-button w3-teal w3-round-xlarge" onclick="ExcelModal('${xxx}')"><i class="fa fa-file-excel-o"></i> Ms. Excel </button>  <hr>`;

    //tablinkKDtabel.appendChild(tombolprint)
    tablinkPGtabel.appendChild(tabel);








}
const formModalTabelAnalisisSkor = (id) => {
    let datamaterilocal = JSON.parse(localStorage.getItem("kbmtoday" + tglStringZero()))[id];
    let jumlahpg = parseInt(datamaterilocal.jumlahpg) + parseInt(datamaterilocal.jumlahessay);

    let identitasmapel = datamaterilocal.idmapel;
    //console.log(jumlahpg);
    let koleksinamasiswa = jsondatasiswa.map(k => k.pd_nama);
    let koleksitokensiswa = jsondatasiswa.map(k => k.id);

    let tabel = document.createElement("table");
    tabel.setAttribute("class", "versi-table w3-tiny");
    tabel.setAttribute("id", "table_rekap_skor");
    let thead = tabel.createTHead();
    let row = thead.insertRow(0);
    let th = document.createElement("th");
    th.setAttribute("rowspan", 2)
    th.innerHTML = "No";
    row.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("rowspan", 2)
    th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
    th.innerHTML = "NAMA SISWA";
    row.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("colspan", jumlahpg)
    th.innerHTML = "NOMOR SOAL";
    row.appendChild(th);

    row = thead.insertRow(-1)
    for (b = 0; b < jumlahpg; b++) {
        th = document.createElement("th");
        th.innerHTML = (b + 1);
        row.appendChild(th);
    }

    let bdy = tabel.createTBody();
    for (c = 0; c < koleksinamasiswa.length; c++) {
        let tr = bdy.insertRow(-1)
        let sel = tr.insertCell(-1)
        sel.innerHTML = (c + 1);

        sel = tr.insertCell(-1);
        sel.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
        sel.innerHTML = koleksinamasiswa[c];

        for (d = 0; d < jumlahpg; d++) {
            sel = tr.insertCell(-1)
            // sel.innerHTML = "-";
            if (OpsiSiswa(koleksitokensiswa[c], "PG_" + (d + 1))[0]) {
                if (OpsiSiswa(koleksitokensiswa[c], "PG_" + (d + 1))[2] == 1) {
                    sel.setAttribute("style", "background-color:green");
                    sel.innerHTML = OpsiSiswa(koleksitokensiswa[c], "PG_" + (d + 1))[2]
                } else {
                    sel.setAttribute("style", "background-color:red");
                    sel.innerHTML = OpsiSiswa(koleksitokensiswa[c], "PG_" + (d + 1))[2]
                }

            } else {
                sel.innerHTML = ""
            }

        }

    }


    let idtabel = `table_rekap_skor`;
    let judul1 = `ANALISIS SKOR SOAL ${identitasmapel.toUpperCase()}  KELAS ${idNamaKelas.toUpperCase()}`;
    let judul2 = `Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}`;
    let tekstgl = `${StringTanggal(new Date())}`;
    let namafile = `ANALISIS SKOR SOAL ${identitasmapel.toUpperCase()} Kelas ${idNamaKelas} id file ${new Date().getTime()}`;
    let xx = `${idtabel},${judul1}, ${judul2}, ${tekstgl}`;
    let xxx = `${idtabel}, ${namafile},${judul1}`;

    tablinkSkortabel.innerHTML = `<button class="w3-button w3-green w3-round-xlarge" onclick="printModalL('${xx}')"><i class="fa fa-print"></i> Cetak </button> | <button class="w3-button w3-teal w3-round-xlarge" onclick="ExcelModal('${xxx}')"><i class="fa fa-file-excel-o"></i> Ms. Excel </button>  <hr>`;

    //tablinkKDtabel.appendChild(tombolprint)
    tablinkSkortabel.appendChild(tabel);








}

const forModalTabelGabungan = (id) => {
    //tes dulu bekerja di id tablinkKDtabel

    let datamaterilocal = JSON.parse(localStorage.getItem("kbmtoday" + tglStringZero()))[id];
    // // console.log(JSON.parse(datamaterilocal.kuncikd));
    let identitasmapel = datamaterilocal.idmapel;
    let datakd = JSON.parse(datamaterilocal.kuncikd);
    let punyaessay = (datamaterilocal.jumlahessay == 0) ? false : true;
    // console.log(punyaessay)

    // console.log("datakd:")
    // console.log(datakd)

    let banyakkd = Object.keys(datakd);

    // console.log("banyakkd:")
    // console.log(banyakkd.length);
    // console.log("idKD");
    // console.log(banyakkd)
    // filter untuk dijadikan unik pada key
    let mapelunik = [];
    let koleksikd = []
    let kdpermapel = {};
    for (i = 0; i < banyakkd.length; i++) {
        let mp = banyakkd[i].split("_")[0]
        if (mapelunik.indexOf(mp) == -1) {
            mapelunik.push(mp);
        }
    }
    let koleksinamasiswa = jsondatasiswa.map(k => k.pd_nama)
    let koleksitokensiswa = jsondatasiswa.map(k => k.id)

    // console.log(kdpermapel);
    // console.log(mapelunik)
    //bikin tabel
    let tabel = document.createElement("table")
    tabel.setAttribute("class", "versi-table w3-tiny");
    tabel.setAttribute("id", "tabel_rekap_Gabungan");
    //bikin head;
    //let row = tabel.insertRow(0)
    let rthead = tabel.createTHead();
    let rth = rthead.insertRow(0)
    let rtd = document.createElement("th")
    rtd.setAttribute("rowspan", 3)
    rtd.innerHTML = "No"
    rth.appendChild(rtd);
    rtd = document.createElement("th")
    rtd.setAttribute("rowspan", 3)
    rtd.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
    rtd.innerHTML = "Nama Siswa"
    rth.appendChild(rtd);
    if (punyaessay) {
        rtd = document.createElement("th")
        rtd.setAttribute("rowspan", 3)
        rtd.innerHTML = "Koreksi"
        rth.appendChild(rtd);
    }

    rtd = document.createElement("th")
    rtd.setAttribute("colspan", banyakkd.length)
    rtd.innerHTML = "Mata Pelajaran"
    rth.appendChild(rtd);

    rth = rthead.insertRow(-1);
    rth.setAttribute("colspan", banyakkd.length);
    rth2 = rthead.insertRow(-1)
    for (k = 0; k < mapelunik.length; k++) {
        rtd = document.createElement("th")
        //  rtd.innerHTML = mapelunik[k]
        //  rth.appendChild(rtd);
        let coun = 0;

        for (j = 0; j < banyakkd.length; j++) {

            let st = banyakkd[j]
            if (st.indexOf(mapelunik[k]) > -1) {
                coun++;


                //let tekconsol = "Mapel " + mapelunik[k] +"KD " + banyakkd[j];
                //console.log(tekconsol)
                let rtd1 = document.createElement("th")
                rtd1.innerHTML = banyakkd[j].split("_")[1] + "<br>" + banyakkd[j]
                rth2.appendChild(rtd1);
            }
        }
        rtd.innerHTML = mapelunik[k]
        rtd.setAttribute("colspan", coun)
        rth.appendChild(rtd);
    }
    let tbo = tabel.createTBody();
    for (z = 0; z < koleksinamasiswa.length; z++) {
        let rowisi = tbo.insertRow(-1);
        let sel = rowisi.insertCell(-1)
        sel.innerHTML = (z + 1);

        sel = rowisi.insertCell(-1)
        sel.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
        sel.innerHTML = koleksinamasiswa[z];
        if (punyaessay) {
            sel = rowisi.insertCell(-1)
            sel.innerHTML = `<button class="w3-button w3-blue">Koreksi</button>`;
        }
        for (a = 0; a < mapelunik.length; a++) {
            //  rtd.innerHTML = mapelunik[k]
            //  rth.appendChild(rtd);
            let coun = 0;

            for (j = 0; j < banyakkd.length; j++) {

                let st = banyakkd[j]
                if (st.indexOf(mapelunik[a]) > -1) {
                    coun++;


                    let tekconsol = "Mapel " + mapelunik[a] + "KD " + banyakkd[j];
                    //console.log(tekconsol)

                    let sell = rowisi.insertCell(-1)
                    sell.innerHTML = nilaiKDSiswa(koleksitokensiswa[z], banyakkd[j]);// banyakkd[j] + "nama = " + koleksinamasiswa[z];

                }
            }
        }

    }



    let idtabel = `tabel_rekap_Gabungan`;
    let judul1 = `DAFTAR NILAI PER-KD ${identitasmapel.toUpperCase()}  KELAS ${idNamaKelas.toUpperCase()}`;
    let judul2 = `Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}`;
    let tekstgl = `${StringTanggal(new Date())}`;
    let namafile = `DAFTAR NILAI PER-KD ${identitasmapel.toUpperCase()} Kelas ${idNamaKelas} id file ${new Date().getTime()}`;
    let xx = `${idtabel},${judul1}, ${judul2}, ${tekstgl}`;
    let xxx = `${idtabel}, ${namafile},${judul1}`

    tablinkGabungantabel.innerHTML = `<button class="w3-button w3-green w3-round-xlarge" onclick="printModalP('${xx}')"><i class="fa fa-print"></i> Cetak </button> | <button class="w3-button w3-teal w3-round-xlarge" onclick="ExcelModal('${xxx}')"><i class="fa fa-file-excel-o"></i> Ms. Excel </button>  <hr>`;

    //tablinkKDtabel.appendChild(tombolprint)
    tablinkGabungantabel.appendChild(tabel);

}




const printModalP = (xx) => {
    let idtabel = xx.split(",")[0],
        judul1 = xx.split(",")[1],
        judul2 = xx.split(",")[2],
        tgl = xx.split(",")[3];
    // alert("tes print rekap semeste");
    let t = new Date()
    let s = StringTanggal(t);
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    //tabelhasil.setAttribute("class","versi-table garis");
    //tabelhasil.setAttribute("style","border-spacing: 0");
    tabelhasil.setAttribute("id", "myTableCopy");


    var tabeleditt = document.getElementById(idtabel);//.getElementsByTagName("tbody")[0];
    //   var tabeleditt = document.getElementById("tabel_rekap_KD");//.getElementsByTagName("tbody")[0];
    tabeleditt.outerHTML.replace("position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000", "display:block")
    tabeleditt.outerHTML.replace("box-shadow: inset 0 0 1px #000000", "border:1px solid black")
    tabeleditt.getElementsByTagName("tbody")[0].removeAttribute("class");
    var cln = tabeleditt.cloneNode(true);

    tabelhasil.appendChild(cln);
    datasiswadiv.appendChild(tabelhasil);


    let sr = SemesterBerapaSekarang();
    //   printPortrait("myTableCopy,Daftar Rekap Absen Kelas "+ruangankelas+", Semester "+ sr+ " Tahun Pelajaran "+idTeksTapel+","+s);
    printPortrait("myTableCopy, " + judul1 + ", " + judul2 + ", " + tgl)
    datasiswadiv.innerHTML = "";
}
const printModalPKD = (xx) => {
    let idtabel = xx.split(",")[0],
        judul1 = xx.split(",")[1],
        judul2 = xx.split(",")[2],
        tgl = xx.split(",")[3];
    // alert("tes print rekap semeste");
    let t = new Date()
    let s = StringTanggal(t);
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    //tabelhasil.setAttribute("class","versi-table garis");
    //tabelhasil.setAttribute("style","border-spacing: 0");
    tabelhasil.setAttribute("id", "myTableCopy");


    var tabeleditt = document.getElementById(idtabel);//.getElementsByTagName("tbody")[0];
    //   var tabeleditt = document.getElementById("tabel_rekap_KD");//.getElementsByTagName("tbody")[0];
    tabeleditt.outerHTML.replace("position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000", "display:block")
    tabeleditt.outerHTML.replace("box-shadow: inset 0 0 1px #000000", "border:1px solid black")
    tabeleditt.getElementsByTagName("tbody")[0].removeAttribute("class");
    var cln = tabeleditt.cloneNode(true);

    tabelhasil.appendChild(cln);
    datasiswadiv.appendChild(tabelhasil);
    //hapus thead kolom ke 3 dengan indeks 2
    var tabeledithead = document.getElementById("myTableCopy").getElementsByTagName("thead")[0];
    tabeledithead.rows[0].deleteCell(2);

    var tabeledit = document.getElementById("myTableCopy").getElementsByTagName("tbody")[0];
    for (i = 0; i < tabeledit.rows.length; i++) {
        for (j = 0; j < 4; j++) {
            if (j == 2) {
                tabeledit.rows[i].deleteCell(j)
            }
        };


    }

    let sr = SemesterBerapaSekarang();
    //   printPortrait("myTableCopy,Daftar Rekap Absen Kelas "+ruangankelas+", Semester "+ sr+ " Tahun Pelajaran "+idTeksTapel+","+s);
    printPortrait("myTableCopy, " + judul1 + ", " + judul2 + ", " + tgl)
    datasiswadiv.innerHTML = "";
}
const printModalL = (xx) => {
    let idtabel = xx.split(",")[0],
        judul1 = xx.split(",")[1],
        judul2 = xx.split(",")[2],
        tgl = xx.split(",")[3];
    // alert("tes print rekap semeste");
    let t = new Date()
    let s = StringTanggal(t);
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    //tabelhasil.setAttribute("class","versi-table garis");
    //tabelhasil.setAttribute("style","border-spacing: 0");
    tabelhasil.setAttribute("id", "myTableCopy");


    var tabeleditt = document.getElementById(idtabel);//.getElementsByTagName("tbody")[0];
    //   var tabeleditt = document.getElementById("tabel_rekap_KD");//.getElementsByTagName("tbody")[0];
    tabeleditt.outerHTML.replace("position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000", "display:block")
    tabeleditt.outerHTML.replace("box-shadow: inset 0 0 1px #000000", "border:1px solid black")
    tabeleditt.getElementsByTagName("tbody")[0].removeAttribute("class");
    var cln = tabeleditt.cloneNode(true);

    tabelhasil.appendChild(cln);
    datasiswadiv.appendChild(tabelhasil);

    let sr = SemesterBerapaSekarang();
    //   printPortrait("myTableCopy,Daftar Rekap Absen Kelas "+ruangankelas+", Semester "+ sr+ " Tahun Pelajaran "+idTeksTapel+","+s);
    printLandscape("myTableCopy, " + judul1 + ", " + judul2 + ", " + tgl)
    datasiswadiv.innerHTML = "";
}

const ExcelModal = (xx) => {
    let idtabel = xx.split(",")[0],
        namafileexcel = xx.split(",")[1],
        judul = xx.split(",")[2];
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    tabelhasil.setAttribute("class", "versi-table");
    tabelhasil.setAttribute("id", "myTableCopy");

    var tabeleditt = document.getElementById(idtabel);//.getElementsByTagName("tbody")[0];
    var cln = tabeleditt.cloneNode(true);
    tabelhasil.appendChild(cln);
    datasiswadiv.appendChild(tabelhasil);

    //------------------
    //let cobatabel = tabeledit;// document.getElementById("myTableCopy");
    let tabeledit = document.getElementById("myTableCopy").getElementsByTagName("tbody")[0];
    let tabeledithead = document.getElementById("myTableCopy").getElementsByTagName("thead")[0];

    let countcol = tabeledit.rows[0].cells.length;
    let brs = tabeledithead.insertRow(0)
    let sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol);
    sel.setAttribute("style", "text-align:center");
    sel.innerHTML = idNamaSekolah.toUpperCase()

    brs = tabeledithead.insertRow(1)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol)
    sel.innerHTML = judul;;

    brs = tabeledithead.insertRow(2)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol);
    sel.innerHTML = "Semester " + idSemester + " Tahun Pelajaran " + idTeksTapel

    brs = tabeledithead.insertRow(3)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol)

    //---------- TAMBAHKAN TANDA TANGAN

    //let cobatabel = tabeledit;// document.getElementById("myTableCopy");
    let rowcount = tabeledit.rows.length;
    //console.log(rowcount)
    let colcount = tabeledit.rows[0].cells.length;
    countcol = tabeledit.rows[0].cells.length;
    if (colcount >= 5) {

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "NIP. " + idNipKepsek;
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = "NIP. " + idNipGuruKelas;
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "<b><u>" + idNamaKepsek + "</u></b>"
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = "<b><u>" + namauser + "</u></b>"
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas

        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "Kepala " + idNamaSekolah;
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = idJenisGuru + " " + idNamaKelas
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas



        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "Mengetahui,";
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = jlo.kota + ", " + tanggalfull(new Date())
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas




        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)


    } else {
        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "NIP. " + idNipKepsek;


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "<b><u>" + idNamaKepsek + "</u></b>"


        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "Kepala " + idNamaSekolah;


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "Mengetahui,";




        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "NIP. " + idNipGuruKelas;


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "<b><u>" + namauser + "</u></b>"


        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = idJenisGuru + " " + idNamaKelas


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek

        sel.innerHTML = jlo.kota + ", " + tanggalfull(new Date())




        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)


    }


    let s = SemesterBerapaSekarang()
    $("#myTableCopy").table2excel({
        //exclude: ".excludeThisClass",
        //name: "Worksheet Name",
        //filename: "SomeFile.xls", // do include extension
        //preserveColors: true // set to true if you want background colors and font colors preserved
        name: "Worksheet Name",
        // filename: "Data Rekap Absen Kelas "+ ruangankelas +" Semester "+s+" dicetak pada " + new Date(),
        filename: namafileexcel,
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true
    });
    datasiswadiv.innerHTML = "";
}


const ExcelModalKD = (xx) => {
    let idtabel = xx.split(",")[0],
        namafileexcel = xx.split(",")[1],
        judul = xx.split(",")[2];
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    tabelhasil.setAttribute("class", "versi-table");
    tabelhasil.setAttribute("id", "myTableCopy");

    var tabeleditt = document.getElementById(idtabel);//.getElementsByTagName("tbody")[0];
    var cln = tabeleditt.cloneNode(true);
    tabelhasil.appendChild(cln);
    datasiswadiv.appendChild(tabelhasil);
    var tabeledithead = document.getElementById("myTableCopy").getElementsByTagName("thead")[0];
    tabeledithead.rows[0].deleteCell(2);

    var tabeledit = document.getElementById("myTableCopy").getElementsByTagName("tbody")[0];
    for (i = 0; i < tabeledit.rows.length; i++) {
        for (j = 0; j < 4; j++) {
            if (j == 2) {
                tabeledit.rows[i].deleteCell(j)
            }
        };


    }
    //------------------
    //let cobatabel = tabeledit;// document.getElementById("myTableCopy");
    let countcol = tabeledit.rows[0].cells.length;
    let brs = tabeledithead.insertRow(0)
    let sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol);
    sel.setAttribute("style", "text-align:center");
    sel.innerHTML = idNamaSekolah.toUpperCase()

    brs = tabeledithead.insertRow(1)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol)
    sel.innerHTML = judul;;

    brs = tabeledithead.insertRow(2)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol);
    sel.innerHTML = "Semester " + idSemester + " Tahun Pelajaran " + idTeksTapel

    brs = tabeledithead.insertRow(3)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol)

    //---------- TAMBAHKAN TANDA TANGAN

    //let cobatabel = tabeledit;// document.getElementById("myTableCopy");
    let rowcount = tabeledit.rows.length;
    //console.log(rowcount)
    let colcount = tabeledit.rows[0].cells.length;
    countcol = tabeledit.rows[0].cells.length;
    if (colcount >= 5) {

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "NIP. " + idNipKepsek;
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = "NIP. " + idNipGuruKelas;
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "<b><u>" + idNamaKepsek + "</u></b>"
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = "<b><u>" + namauser + "</u></b>"
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas

        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "Kepala " + idNamaSekolah;
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = idJenisGuru + " " + idNamaKelas
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas



        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "Mengetahui,";
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = jlo.kota + ", " + tanggalfull(new Date())
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas




        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)


    } else {
        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "NIP. " + idNipKepsek;


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "<b><u>" + idNamaKepsek + "</u></b>"


        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "Kepala " + idNamaSekolah;


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "Mengetahui,";




        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "NIP. " + idNipGuruKelas;


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "<b><u>" + namauser + "</u></b>"


        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = idJenisGuru + " " + idNamaKelas


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek

        sel.innerHTML = jlo.kota + ", " + tanggalfull(new Date())




        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)


    }


    //------------------------------------
    let s = SemesterBerapaSekarang()
    $("#myTableCopy").table2excel({
        //exclude: ".excludeThisClass",
        //name: "Worksheet Name",
        //filename: "SomeFile.xls", // do include extension
        //preserveColors: true // set to true if you want background colors and font colors preserved
        name: "Worksheet Name",
        // filename: "Data Rekap Absen Kelas "+ ruangankelas +" Semester "+s+" dicetak pada " + new Date(),
        filename: namafileexcel,
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 4
    });
    datasiswadiv.innerHTML = "";
}



function printPortrait(x) {
    var splitt = x.split(',')

    var id = splitt[0],
        h1 = splitt[1],
        h2 = splitt[2],
        bulan = splitt[3];

    var html = document.getElementById("iframeprint");
    var isi = html.contentDocument;
    var headnya = isi.head;
    while (headnya.hasChildNodes()) {
        headnya.removeChild(headnya.firstChild);
    }
    //var bodynya = isi.body;
    //bodynya="";

    var titlee = document.createElement("title");
    // var	teksjudul = document.createTextNode("width:950px;height:400px;border:1px solid blue;border-radius:15px")
    var teksjudul = document.createTextNode("e-lamaso")
    titlee.appendChild(teksjudul)
    headnya.appendChild(titlee);
    headnya.innerHTML += '<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">';
    //headnya.appendChild(foot);
    var css = '@page { size: portrait;}';
    //head = document.head || document.getElementsByTagName('head')[0],
    var style = document.createElement('style');
    var cssd = '.versii-table {width:950px;max-width:100%;border-collapse:collapse}.versii-table th,.versii-table td,.versii-table tr {border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versii-table th{background-color:#eee;color:blue;vertical-align:middle;text-align:center}.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}.versi-table {width:auto;max-width:100%;border-collapse:collapse}.versi-table th,.versi-table td,.versi-table tr {border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th{background-color:#eee;color:blue;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}versi-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}';
    headnya.innerHTML += '<style>' + cssd + '</style>';

    style.type = 'text/css';
    style.media = 'print';

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));

    }

    var d = new Date(bulan);
    var tglakhir = d.getDate();
    var blnakhirr = d.getMonth();
    var namabulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    var thnakhirr = d.getFullYear();
    //var tglakhirr = daysInMonth(blnakhirr+1,thnakhirr);
    var namakepsekku = idNamaKepsek;
    var nipkepsekku = idNipKepsek;//document.getElementById('nipkepsek').innerHTML;
    var guruapa = idJenisGuru + " " + ruangankelas;//document.getElementById("tblguru").innerHTML+" "+document.frmlogin.kelasguru.value;
    var namaguruku = namauser;//document.getElementById('namagurux').innerHTML;
    var nipguruku = idNipGuruKelas;//document.getElementById('nipgurux').innerHTML;

    headnya.appendChild(style);
    var bodynya = isi.body;
    //var teksbody = document.getElementById(id).innerHTML;
    var teksbody = document.getElementById(id).innerHTML.replace("position:sticky;position:-webkit-sticky", "").replace("box-shadow: inset 0 0 1px #000000", "");
    //var teksbody =document.getElementById(id).outerHTML;
    bodynya.innerHTML = "";
    //bodynya.innerHTML='<style>'+cssd+'</style>';
    //bodynya.innerHTML+='<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">';
    bodynya.innerHTML += '<h1 style="text-align:center">' + h1 + '</h1>';
    bodynya.innerHTML += '<h2 style="text-align:center">' + h2 + '</h2>';
    bodynya.innerHTML += teksbody;
    bodynya.innerHTML += '<br/><br/><br/>';
    bodynya.innerHTML += '<div style="float:left;position:relative;margin-left:50px;text-align:center">Mengetahui,<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><br/><u><b>' + namakepsekku + '</b></u><br/>NIP. ' + nipkepsekku + '</div>';
    bodynya.innerHTML += '<div style="float:right;position:relative;text-align:center"> Depok , ' + tglakhir + ' ' + namabulan[blnakhirr] + ' ' + thnakhirr + '<br/>' + guruapa + '<br/><br/><br/><br/><br/><b><u>' + namaguruku + '</u></b><br/>NIP. ' + nipguruku + '</div>';
    //bodynya.innerHTML+='<br/><br/><br/>'+guruapa+'<br/><br/><br/><b><u>'+namaguruku+'</u></b><br/>NIP. '+nipguruku+'</div>';


    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}


function printLandscape(x) {
    var splitt = x.split(',')

    var id = splitt[0],
        h1 = splitt[1],
        h2 = splitt[2],
        bulan = splitt[3];

    var html = document.getElementById("iframeprint");
    var isi = html.contentDocument;
    var headnya = isi.head;
    while (headnya.hasChildNodes()) {
        headnya.removeChild(headnya.firstChild);
    }
    //var bodynya = isi.body;
    //bodynya="";

    var titlee = document.createElement("title");
    // var	teksjudul = document.createTextNode("width:950px;height:400px;border:1px solid blue;border-radius:15px")
    var teksjudul = document.createTextNode("e-lamaso")
    titlee.appendChild(teksjudul)
    headnya.appendChild(titlee);
    headnya.innerHTML += '<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">';
    //headnya.appendChild(foot);
    var css = '@page { size: landscape;}';
    //head = document.head || document.getElementsByTagName('head')[0],
    var style = document.createElement('style');
    var cssd = '.versii-table {width:950px;max-width:100%;border-collapse:collapse}.versii-table th,.versii-table td,.versii-table tr {border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versii-table th{background-color:#eee;color:blue;vertical-align:middle;text-align:center}.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}.versi-table {width:auto;max-width:100%;border-collapse:collapse}.versi-table th,.versi-table td,.versi-table tr {border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th{background-color:#eee;color:blue;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}versi-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}';
    headnya.innerHTML += '<style>' + cssd + '</style>';

    style.type = 'text/css';
    style.media = 'print';

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));

    }
    var d = new Date(bulan);
    var tglakhir = d.getDate();
    var blnakhirr = d.getMonth();
    var namabulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    var thnakhirr = d.getFullYear();
    //var tglakhirr = daysInMonth(blnakhirr+1,thnakhirr);
    var namakepsekku = idNamaKepsek;
    var nipkepsekku = idNipKepsek;//document.getElementById('nipkepsek').innerHTML;
    var guruapa = idJenisGuru + " " + ruangankelas;//document.getElementById("tblguru").innerHTML+" "+document.frmlogin.kelasguru.value;
    var namaguruku = namauser;//document.getElementById('namagurux').innerHTML;
    var nipguruku = idNipGuruKelas;//document.getElementById('nipgurux').innerHTML;

    headnya.appendChild(style);
    var bodynya = isi.body;
    //var teksbody = document.getElementById(id).innerHTML;
    var teksbody = document.getElementById(id).innerHTML.replace("position:sticky;position:-webkit-sticky", "").replace("box-shadow: inset 0 0 1px #000000", "");
    //var teksbody =document.getElementById(id).outerHTML;
    bodynya.innerHTML = "";
    bodynya.innerHTML = '<style>' + cssd + '</style>';
    //bodynya.innerHTML+='<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">';
    bodynya.innerHTML += '<h1 style="text-align:center">' + h1 + '</h1>';
    bodynya.innerHTML += '<h2 style="text-align:center">' + h2 + '</h2>';
    bodynya.innerHTML += teksbody;
    bodynya.innerHTML += '<br/><br/><br/>';
    bodynya.innerHTML += '<div style="float:left;position:relative;margin-left:50px;text-align:center">Mengetahui,<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><br/><u><b>' + namakepsekku + '</b></u><br/>NIP. ' + nipkepsekku + '</div>';
    bodynya.innerHTML += '<div style="float:right;position:relative;text-align:center"> Depok , ' + tglakhir + ' ' + namabulan[blnakhirr] + ' ' + thnakhirr + '<br/>' + guruapa + '<br/><br/><br/><br/><br/><b><u>' + namaguruku + '</u></b><br/>NIP. ' + nipguruku + '</div>';
    //bodynya.innerHTML+='<br/><br/><br/>'+guruapa+'<br/><br/><br/><b><u>'+namaguruku+'</u></b><br/>NIP. '+nipguruku+'</div>';


    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}



function brkline(teks) { //coba
    var tek = teks.split("\r\n"); //cari sKetiap ganti baris;
    var inn = "";
    var indexpotojawaban = 0;
    var kodeganti = ["_JUDUL_", "_PECAHAN BIASA_"];

    //   var keypg = document.getElementById("keypg");
    //   if (keypg == null) {
    //       var scrippg = document.createElement("script");
    //       scrippg.setAttribute("id", "keypg");
    //       scrippg.innerHTML = "var keybase=''";
    //       tttkeybase.innerHTML = "";

    //       document.body.appendChild(scrippg);

    //   } else {
    //       keypg.innerHTML = "var keybase=''";
    //       tttkeybase.innerHTML = "";
    //   }
    //////////////////////////////////////////////////////////////
    if (localStorage.hasOwnProperty("keybase")) {
        localStorage.removeItem("keybase")
    }
    if (localStorage.hasOwnProperty("kuncikd")) {
        localStorage.removeItem("kuncikd")
    }

    for (x = 0; x < tek.length; x++) {
        var asal = tek[x]; // dalam satu baris ini, misal baris pertama:
        var cJudul = jumlahdobel(asal, "_JUDUL_");
        var cGambar = jumlahdobel(asal, "_GAMBAR_");
        var cPecBiasa = jumlahdobel(asal, "_PECAHAN-BIASA_");
        var cPecCamp = jumlahdobel(asal, "_PECAHAN-CAMPURAN_");


        //inn += "ke-"+ x +" = " + asal + "<hr style='border-bottom:1px solid red'/>";
        //inn += "ke-"+ x + " = JUDUL = " + cJudul +", GAMBAR = " + cGambar +", Pecahan Biasa = " + cPecBiasa +", Pecahan Campuran = " + cPecCamp + "<hr style='border-bottom:1px solid blue'/>";
        var katajadi = "";

        if (asal.indexOf("_JUDUL_") > -1) {
            var hJudul;
            var arjud = asal.split("_JUDUL_");
            var katakonversi;
            for (jd in arjud) {
                if (jd > 0) {
                    katakonversi = katajadireplace(arjud[jd]);
                    //hJudul = "<h4 style='background-color:darkslategrey;color:white;padding:1px'>" + arjud[jd]+ "</h4>";
                    //hJudul = "<h4 style='background-color:darkslategrey;color:white;padding:1px'>" + katakonversi + "</h4>";
                    hJudul = "<h4 class='w3-card-4 w3-blue-grey w3-center w3-round-xxlarge'>" + katakonversi + "</h4>";
                    //katajadi += hJudul ;
                    katajadi += hJudul + "<br/>";
                }
            }
        } else if (asal.indexOf("_ESSAY-NO_") > -1) {
            var esayno = asal.split("_ESSAY-NO_")[0];
            var tekspisah = asal.replace("_ESSAY-NO_", "").split(" ");
            katajadi += "<div class='w3-badge w3-aqua w3-left'>" + tekspisah[0] + "</div><ol style='list-style-type:none' start='" + tekspisah[0] + "'  class='w3-padding w3-card-4'><li id='essay" + tekspisah[0] + "' class='soalessay' style='border-bottom:1px solid blue'><div id='pertanyaanessay_" + tekspisah[0] + "'>";
            for (es in tekspisah) {
                if (es > 0) {
                    katajadi += katajadireplace(tekspisah[es]);
                }
            }


            katajadi += "</div><div id='tomboljawaban" + tekspisah[0] + "'><hr/></div>"
            katajadi += "<br/></li></ol>"
        } else if (asal.indexOf("_START-TABEL_") > -1) {
            katajadi += asal.replace("_START-TABEL_", "<div style='overflow-x:auto'><table class='versi-table'>");
            //katajadi += asal.replace("_START-TABEL_","<table class='versi-table'>");
        } else if (asal.indexOf("_START-TABEL-OPSI_") > -1) {
            katajadi += asal.replace("_START-TABEL-OPSI_", "<hr style='border-top:1px solid olive'/><div style='overflow-x:auto'><table class='versi-table'>");
            //katajadi += asal.replace("_START-TABEL_","<table class='versi-table'>");
        } else if (asal.indexOf("<|HEADER|>") > -1) {
            katajadi += "<tr>";
            var tekarray = asal.split("<|HEADER|>");
            var katakonversi;
            for (th in tekarray) {
                katakonversi = katajadireplace(tekarray[th]);
                //katajadi +="<th>" + tekarray[th] +"</th>";
                katajadi += "<th>" + katakonversi + "</th>";
            }
            katajadi += "</tr>"
        } else if (asal.indexOf("<|>") > -1) {
            katajadi += "<tr>";
            var tekarray = asal.split("<|>");
            var katakonversi;
            for (td in tekarray) {
                katakonversi = katajadireplace(tekarray[td]);
                katajadi += "<td>" + katakonversi + "</td>"
            }
            katajadi += "</tr>"
            //inn +=  "<table class='versi-table'>";
        } else if (asal.indexOf("_SELESAI-TABEL_") > -1) {
            katajadi += "</table></div><br/>";
            //katajadi +=  "</table><br/>";

        } else if (asal.indexOf("_SELESAI-TABEL-OPSI_") > -1) {
            //katajadi +=  "</table></div><br/>";
            katajadi += "</table><br/></li></ol>";

        } else if (asal.indexOf("_PG_") > -1) {
            var Q_PG = "";
            var teks = asal.replace("_PG_", ""); // return = 1 teks pertanyaaan bla bla bla
            var arrTeks = teks.split(" ");
            nosoal = arrTeks[0];
            Q_PG += "<div class='w3-badge w3-left'>" + nosoal + "</div><ol style='list-style-type:decimal' start='" + nosoal + "' class='w3-padding w3-card-4'><li id='soalke-" + nosoal + "' class='calcnosoal' style='list-style-type:none'>";
            var katakonversi;
            for (ss in arrTeks) {
                if (ss > 0) {
                    katakonversi = katajadireplace(arrTeks[ss]);
                    Q_PG += katakonversi;
                }
            }
            //katajadi = Q_PG + "<hr style='border-top:1px solid olive'/>";
            katajadi = Q_PG;//+ "<hr style='border-top:1px solid olive'/>";

        } else if (asal.indexOf("_OPSI-PG_") > -1) {
            var opsipg = "";
            var arpgg = asal.replace("_OPSI-PG_", ""); // hasilnya: 1A teks pertanyaan bla bla bla
            var arpg = arpgg.split(" "); //hasilnya: 0=1A 1=teks 2=pertanyaan ... dst.
            var idopsi = arpg[0]; // hasilnya: 1A
            //var abjad = idopsi.slice(1, 2); // hasilnya A
            //var nosoal = idopsi.slice(0, 1); // hasilnya 1
            var nosoal = idopsi.match(/(\d+)/)[0];//parseInt(idopsi);
            var abjad = idopsi.replace(nosoal, "");

            if (abjad === "A") {
                opsipg += "<hr style='border-top:1px solid olive'/>";
                opsipg += "<ol style='list-style-type:upper-alpha;margin:5px 5px 0px 20px;padding:0' ><li><input class='calc' type='radio' style='display:none' name='soal" + nosoal + "' id='" + idopsi + "'/><label class='opsi' for='" + idopsi + "'>"; // Khusus opsi A, ada elemen OL lalu dilanjut teksnya
            } else {
                opsipg += "<li><input class='calc' type='radio' style='display:none' name='soal" + nosoal + "' id='" + idopsi + "'/><label class='opsi' for='" + idopsi + "'>"; // selain opsi A, dilanjut.  Tapi tanpa element OL
            }
            var katakonversi;
            for (tt in arpg) { //hasilnya: 0=1A 1=teks 2=pertanyaan ... dst.
                if (tt > 0) { // hindari array 0=1A
                    katakonversi = katajadireplace(arpg[tt]);
                    //hJudul = "<h4 style='background-color:darkslategrey;color:white;padding:1px'>" + arjud[jd]+ "</h4>";
                    opsipg += katakonversi
                }
            }
            if (abjad === "D") {
                opsipg += "</label></li></ol></li></ol>";
            } else {
                opsipg += "</label></li>";
            }


            katajadi += opsipg;



        } else if (asal.indexOf("_OPSI-PG-C_") > -1) {
            var opsipg = "";
            var arpgg = asal.replace("_OPSI-PG-C_", ""); // hasilnya: 1A teks pertanyaan bla bla bla
            var arpg = arpgg.split(" "); //hasilnya: 0=1A 1=teks 2=pertanyaan ... dst.
            var idopsi = arpg[0]; // hasilnya: 1A
            //var abjad = idopsi.slice(1, 2); // hasilnya A
            //var nosoal = idopsi.slice(0, 1); // hasilnya 1
            var nosoal = idopsi.match(/(\d+)/)[0];//parseInt(idopsi);
            var abjad = idopsi.replace(nosoal, "");

            if (abjad === "A") {
                opsipg += "<hr style='border-top:1px solid olive'/>";
                opsipg += "<ol style='list-style-type:upper-alpha;margin:5px 5px 0px 20px;padding:0' ><li><input class='calc' type='radio' style='display:none' name='soal" + nosoal + "' id='" + idopsi + "'/><label class='opsi' for='" + idopsi + "'>"; // Khusus opsi A, ada elemen OL lalu dilanjut teksnya
            } else {
                opsipg += "<li><input class='calc' type='radio' style='display:none' name='soal" + nosoal + "' id='" + idopsi + "'/><label class='opsi' for='" + idopsi + "'>"; // selain opsi A, dilanjut.  Tapi tanpa element OL
            }
            var katakonversi;
            for (tt in arpg) { //hasilnya: 0=1A 1=teks 2=pertanyaan ... dst.
                if (tt > 0) { // hindari array 0=1A
                    katakonversi = katajadireplace(arpg[tt]);
                    //hJudul = "<h4 style='background-color:darkslategrey;color:white;padding:1px'>" + arjud[jd]+ "</h4>";
                    opsipg += katakonversi
                }
            }
            if (abjad === "C") {
                opsipg += "</label></li></ol></li></ol>";
            } else {
                opsipg += "</label></li>";
            }


            katajadi += opsipg;

        } else if (asal.indexOf("_POTO-JAWABAN-TUGAS_") > -1) {
            var tekssplit = asal.replace("_POTO-JAWABAN-TUGAS_", "").split(" ")[0]; // return: 1/2/3
            var mediaessay = "";
            var bnyk = tekssplit.split("/");
            for (de in bnyk) {
                mediaessay += bnyk[de] + ", ";
            }
            katajadi += "<div style='background-color:#ffcdc9;padding:10px'>Upload Media(Poto, audio, video, pdf, word/txt, dll) jawaban Tugas No";
            katajadi += " " + mediaessay + " dengan menguploadnya di sini: <br/><br/>";
            katajadi += "<label style='border:1px solid black;background-color:#eee;padding:5px;border-radius:5px' for='iduploadpototugas" + indexpotojawaban + "' id='label" + indexpotojawaban + "'><i class='fa fa-camera'></i> Upload Jawaban</label><br/><br/>";
            katajadi += "<div class='potoessay' id='" + tekssplit + "' style='overflow-x:auto'><div id='mediapreview" + indexpotojawaban + "'>";
            katajadi += "<img src='https://1.bp.blogspot.com/-q57d59JTX8g/Xa-kAy6T0XI/AAAAAAAAOSo/seM01RU3Q_Q7BvLm73wC09BBsQMs05pYACLcBGAsYHQ/s320/LOGO%2BLAMASO.png'  style='width:145px;margin:auto;border:1px solid blue'/>";
            katajadi += "</div></div>";

            katajadi += "<input type='file' id='iduploadpototugas" + indexpotojawaban + "' onchange='uploadpototugas(" + indexpotojawaban + ")' style='display:none'/><div  id='filejawaban" + indexpotojawaban + "' class='jawabanfile' style='display:none' ></div>"


            katajadi += "</div>";

            indexpotojawaban += 1;


        } else if (asal.indexOf("_KUNCI-PG_") > -1) {
            //REPLACE DULU = misal: _KUNCI-PG_1A, 2B, 3C<kalo adaspasi>
            var tekskunci = asal.replace("_KUNCI-PG_", "").replace(/\s+/g, "").split(","); // hasilnya: 1A,2B,3C
            var arrkunci = [];
            for (o = 0; o < tekskunci.length; o++) {
                arrkunci.push(tekskunci[o])
            }
            basekunci = window.btoa(arrkunci);
            var kunci = basekunci;
            //basekunci = arrkunci;//window.btoa(arrkunci);
            //localStorage.setItem("keybase", basekunci)
            //localStorage.setItem("artikeybase", window.atob(basekunci))

            //   var keypg = document.getElementById("keypg");
            //     keypg.setAttribute("style", "display:none")

            //   //var teksscript = document.createTextNode("var keybase='"+basekunci+"'");
            //   //	keypg.appendChild(teksscript);
            //   keypg.innerHTML = "var keybase='" + basekunci + "'";
            //   tttkeybase.innerHTML = basekunci;

        } else if (asal.indexOf("_KUNCI-KD_") > -1) {
            //REPLACE DULU = misal: _KUNCI-PG_1A, 2B, 3C<kalo adaspasi>
            var tekskunci = asal.replace("_KUNCI-KD_", "").replace(/\s+/g, "").split("<||>");//.split(":");
            let ar = []
            let ob = {};
            for (i = 0; i < tekskunci.length; i++) {

                // ob[tekskunci[i].split(":")[0]] = tekskunci[i].split(":")[1].split(",");
                ob[tekskunci[i].split(":")[0]] = tekskunci[i].split(":")[1].replace("[", "").replace("]", "").split(",");
                ar.push(ob)
            }
            var kdkd = tekskunci.join("<br>");//.join("<br>");
            //   localStorage.setItem("kuncikd", JSON.stringify(ob)) ;// ---> sudah objek array



        } else {
            var katakonversi = katajadireplace(asal);
            katajadi += katakonversi + "<br/>";

        }
        inn += katajadi; //+ "&lt;br/&gt;" ;
    }
    let data = {};
    data.teks = inn;
    data.kunci = kunci;
    data.kd = kdkd;

    // return inn
    return data
}

function katajadireplace(asal) {
    var splitTeks = asal.split(" ");
    var ccJudul = 1;
    var brsTabel = 0;
    var katajadi = "";
    for (i = 0; i < splitTeks.length; i++) {
        //jika judul:
        if (splitTeks[i].indexOf("_GAMBAR_") > -1) {
            katajadi += "<img src='" + splitTeks[i].replace("_GAMBAR_", "") + "' style='width:50%;border:1px solid red;border-radius:5px' alt='tidak muncul, link Anda salah atau ada spasi setelah kode'/>";
        } else if (splitTeks[i].indexOf("_GAMBAR-DRIVE_") > -1) {
            var hilangkankode = splitTeks[i].replace("_GAMBAR-DRIVE_", "");
            var hilangkanprefik = hilangkankode.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=view&id=");
            var hilangkansufik = hilangkanprefik.replace("/view", "");
            var hilangkansufike = hilangkansufik.replace("?usp=drivesdk", "");

            katajadi += "<img src='" + hilangkansufike + "' style='width:50%;border:1px solid red;border-radius:5px' alt='tidak muncul, link Anda salah atau ada spasi setelah kode, contoh link:https://drive.google.com/file/d/1J0NUwTrxFBZ0JZBCzVTlsDFeXbn3mIci/view'/> ";
        } else if (splitTeks[i].indexOf("_PECAHAN-BIASA_") > -1) {
            var a = splitTeks[i].replace("_PECAHAN-BIASA_", "").split("/")[0];
            var b = splitTeks[i].replace("_PECAHAN-BIASA_", "").split("/")[1];
            katajadi += "<img src='https://chart.apis.google.com/chart?cht=tx&chl=%5Cfrac%7B" + a + "%7D%7B" + b + "%7D%20&chf=bg%2Cs%2CFFFFFF100&chco=000000' />"


        } else if (splitTeks[i].indexOf("_PECAHAN-CAMPURAN_") > -1) {
            var a = splitTeks[i].replace("_PECAHAN-CAMPURAN_", "").split("/")[0];
            var b = splitTeks[i].replace("_PECAHAN-CAMPURAN_", "").split("/")[1];
            var c = splitTeks[i].replace("_PECAHAN-CAMPURAN_", "").split("/")[2];
            katajadi += "<img src='https://chart.apis.google.com/chart?cht=tx&chl=" + a + "%5Cfrac%7B" + b + "%7D%7B" + c + "%7D%20&chf=bg%2Cs%2CFFFFFF80&chco=000000' />"


        } else if (splitTeks[i].indexOf("_AKAR-KUADRAT_") > -1) {
            var a = splitTeks[i].replace("_AKAR-KUADRAT_", "");

            katajadi += "<img src='https://chart.apis.google.com/chart?cht=tx&chl=%5Csqrt%7B%20" + a + "%20%7D%20&chf=bg%2Cs%2CFFFFFF80&chco=000000' />"


        } else if (splitTeks[i].indexOf("_AKAR-TIGA_") > -1) {
            var a = splitTeks[i].replace("_AKAR-TIGA_", "");
            katajadi += " <img src='https://chart.apis.google.com/chart?cht=tx&chl=%5Csqrt%5B3%5D%7B%20" + a + "%20%7D%20&chf=bg%2Cs%2CFFFFFF80&chco=000000' /> "


        } else if (splitTeks[i].indexOf("_PANGKAT_") > -1) {
            var a = splitTeks[i].replace("_PANGKAT_", "").split("/")[0];
            var b = splitTeks[i].replace("_PANGKAT_", "").split("/")[1];
            katajadi += " <img src='https://chart.apis.google.com/chart?cht=tx&chl=%5C" + a + "^" + b + "%20&chf=bg%2Cs%2CFFFFFF80&chco=000000' /> "
            //katajadi += a + "<sup>" + b + "</sup>";

        } else if (splitTeks[i].indexOf("_PANGKAT-HURUF_") > -1) {
            var a = splitTeks[i].replace("_PANGKAT-HURUF_", "").split("/")[0];
            var b = splitTeks[i].replace("_PANGKAT-HURUF_", "").split("/")[1];
            //katajadi += " <img src='https://chart.apis.google.com/chart?cht=tx&chl=%5C" + a + "^" + b + "%20&chf=bg%2Cs%2CFFFFFF80&chco=000000' /> "
            katajadi += "<span class='w3-cursive'>" + a + "</span><sup>" + b + "</sup>";

        } else if (splitTeks[i].indexOf("_EQUATION-LAINNYA_") > -1) {
            var a = splitTeks[i].replace("_EQUATION-LAINNYA_", "");
            var b = decodeURIComponent(a);
            //var c = decodeURIComponent(b);
            katajadi += " <img src='https://chart.apis.google.com/chart?cht=tx&chl=" + b + "%20&chf=bg%2Cs%2CFFFFFF80&chco=000000' /> "


        } else if (splitTeks[i].indexOf("_YOUTUBE_") > -1) {
            var linkyoutube, konv, konv2, konv3;
            konv = splitTeks[i].replace("_YOUTUBE_", "<br/><div class='containerbaru'><iframe class='responsive-iframebaru ' src='")
            konv2 = konv.replace("https://youtu.be/", "https://www.youtube.com/embed/"); // kalo link awalnya https://youtu.be/ 
            konv3 = konv2.replace("watch?v=", "embed/"); // jika diambil dari https://www.youtube.com/
            linkyoutube = konv3 + "' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div><br/>";

            katajadi += linkyoutube;

        } else if (splitTeks[i].indexOf("_OPSI-SEL_") > -1) {
            var splitteks = splitTeks[i].replace("_OPSI-SEL_", "").split(" ");
            var id = splitteks[0].replace(/\s+/g, ""); //4A

            var abjad = (id.length == 2) ? id.slice(1, 2) : id.slice(2, 3); //B
            var nosoal = id.match(/(\d+)/)[0];// id.slice(0, 1); //nosoal 4
            var innteks = "<input class='calc' type='radio' style='display:none' name='soal" + nosoal + "' id='" + id + "'/><label class='opsi' for='" + id + "'>" + abjad + "</label>"

            katajadi += innteks;
        } else if (splitTeks[i].indexOf("_PHI_") > -1) {
            katajadi += `<img src="https://chart.apis.google.com/chart?cht=tx&amp;chl=%5Cpi%20&amp;chf=bg%2Cs%2CFFFFFF100&amp;chco=000000">`
        } else if (splitTeks[i].indexOf('display:none') > -1) {
            katajadi += splitTeks[i].replace("display:none", "display:block");

        } else if (splitTeks[i].indexOf('tombolkirimnilaielamaso()') > -1) {
            katajadi += splitTeks[i].replace("tombolkirimnilaielamaso()", "alert('Maaf, tombol dinonaktirkan')");

        }

        else {
            katajadi += splitTeks[i] + " ";

        }
    }

    return katajadi

}

function fn_map(s) {

    var paragrafsiap = "";
    if (s.indexOf("_JUDUL_") > -1) {
        paragrafsiap += "<h2 style='background-color:black;color:white;padding:1px'>" + s.replace("_JUDUL_", "") + "</h2>"
    } else {
        paragrafsiap += s
    }
    return paragrafsiap
}

function jumlahdobel(arrTeks, txt) {
    var count = 0;
    var crtArr = arrTeks.split(" ");
    for (i in crtArr) {
        if (crtArr[i].indexOf(txt) > -1) {
            count += 1
        }
    }

    return count
}

function gantiapaaja(teks, cariapa, gantiawal, gantiakhir) {
    var split = teks.split(cariapa);
    var teksganti = "";
    //for (x in split){
    for (x = 1; x < split.length; x++) {
        if (split[x].length > 0) {
            teksganti += gantiawal + split[x] + gantiakhir;
        }; //.split(" ")[0] +"</h3>";

    }
    return teksganti
}

function tambahtombolisijawaban() {
    var elEssay = document.getElementsByClassName("soalessay")
    if (elEssay.length !== 0) {
        for (i = 0; i < elEssay.length; i++) {
            var idEl = elEssay[i].getAttribute("id");
            var inidEl = idEl.replace("essay", "");
            var tempattombol = document.getElementById("tomboljawaban" + inidEl);
            var tombolsatu = document.createElement("button");
            tombolsatu.setAttribute("onclick", "tombolketikjawaban('" + inidEl + "')");
            var tekstombolsatu = document.createTextNode("Ketik Jawaban No " + inidEl);
            tombolsatu.appendChild(tekstombolsatu);
            tempattombol.appendChild(tombolsatu);
            tempattombol.innerHTML += "<br/><sub>atau</sub></br/> "
            var tomboldua = document.createElement("button");
            tomboldua.setAttribute("onclick", "tomboluploadjawaban('" + inidEl + "')");
            var tekstomboldua = document.createTextNode("Upload Jawaban No " + inidEl);
            tomboldua.appendChild(tekstomboldua);
            tempattombol.appendChild(tomboldua);
            tempattombol.innerHTML += "<br/><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>"

        }
    }

}


const previewkronologi = (par) => {
    pranalamateri.style.display = "block";
    document.querySelector(".classReviewMateri").innerHTML = "";
    let tes = document.querySelector(".classReviewMateri");
    //let keyy = "kbmtoday" + tglStringZero()

    //let datamateri = JSON.parse(localStorage.getItem(keyy))
    let datamateri = kronologijson;


    //bikin judul h4
    var judul = document.createElement("h4")
    judul.setAttribute("class", "w3-center");
    judul.innerHTML = "Identitas e-Lamaso";
    tes.innerHTML = ""
    tes.appendChild(judul);

    //-- Bikin Tabel identitas:
    var tabelidentitas = document.createElement("table");
    tabelidentitas.setAttribute("class", "versi-table tabel_idreview");
    tabelidentitas.setAttribute("style", "margin:auto");
    var tr = tabelidentitas.insertRow(-1);

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Sekolah"
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idSekolah
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Nama Siswa"
    var td = tr.insertCell(-1);
    td.innerHTML = "NAMA SISWA ANDA"
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kelas"
    var td = tr.insertCell(-1);
    td.innerHTML = idNamaKelas;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Mapel/Tema"
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idmapel;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Frekuensi Akses"
    var td = tr.insertCell(-1);
    var keteranganakses;
    if (datamateri[par].idaksessiswa == "sekali") {
        keteranganakses = "TEST <br>Sekali saja sejak mengirim nilai"
    } else {
        keteranganakses = "LATIHAN <br>Berapa kali saja untuk latihan"
    }
    td.innerHTML = keteranganakses;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Tanggal Publikasi"
    var td = tr.insertCell(-1);
    td.innerHTML = tanggalfulllengkap(datamateri[par].idtgl);

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kompetensi KD<br><sub class='w3-text-red'>Tidak akan muncul di siswa</sub>"
    var td = tr.insertCell(-1);
    td.setAttribute("id", "forKD")
    td.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kunci Jawaban<br><sub class='w3-text-red'>Tidak akan muncul di siswa</sub>"
    var td = tr.insertCell(-1);
    td.setAttribute("id", "forkuncijawaban")
    td.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;


    var tr = tabelidentitas.insertRow(-1);
    var cel1 = tr.insertCell(-1);
    cel1.setAttribute("id", "timer");
    cel1.setAttribute("colspan", "2");
    cel1.setAttribute("style", "text-align:center");
    cel1.innerHTML = "Timer: ";
    var cdtimer = document.createElement("input")
    cdtimer.setAttribute("id", "cd_seconds");
    cdtimer.setAttribute("disabled", "true");
    cdtimer.setAttribute("value", datamateri[par].iddurasi);
    cdtimer.setAttribute("style", "width:50px")
    cel1.appendChild(cdtimer);
    cel1.innerHTML += " Menit."
    var tr = tabelidentitas.insertRow(-1);
    var cel1 = tr.insertCell(-1);
    cel1.setAttribute("id", "tempatdurasi");
    cel1.setAttribute("colspan", "2");
    cel1.setAttribute("style", "text-align:center");
    var cdstatus = document.createElement("b");
    cdstatus.setAttribute("id", "cd_status");
    var tekscdstatus = document.createTextNode("Durasi Penyelesaian:");
    cdstatus.appendChild(tekscdstatus);
    var cdjam = document.createElement("span");
    cdjam.setAttribute("id", "cd_h");
    var tekscdjam = document.createTextNode("00:");
    cdjam.appendChild(tekscdjam);
    var cdmenit = document.createElement("span");
    cdmenit.setAttribute("id", "cd_m");
    var tekscdmenit = document.createTextNode("00:");
    cdmenit.appendChild(tekscdmenit);
    var cddetik = document.createElement("span");
    cddetik.setAttribute("id", "cd_s");
    var tekscddetik = document.createTextNode("00");
    cddetik.appendChild(tekscddetik);
    var cdpause = document.createElement("input")
    cdpause.setAttribute("type", "button");
    cdpause.setAttribute("id", "cd_pause");
    cdpause.setAttribute("value", "Jeda");
    var cdpstop = document.createElement("input")
    cdpstop.setAttribute("type", "button");
    cdpstop.setAttribute("id", "cd_stop");
    cdpstop.setAttribute("value", "Selesai");
    var gntibaris = document.createElement("br");
    var controltimer = document.createElement("b")
    var tekscontroltimer = document.createTextNode("Control Timer:");
    controltimer.appendChild(tekscontroltimer);
    var controlstart = document.createElement("input");
    controlstart.setAttribute("type", "button");
    controlstart.setAttribute("id", "cd_start");
    controlstart.setAttribute("value", "Mulai Mengerjakan");
    var controlreset = document.createElement("input");
    controlreset.setAttribute("type", "button");
    controlreset.setAttribute("id", "cd_reset");
    controlreset.setAttribute("value", "Reset Timer");
    var titikdua = document.createElement("b");
    var tekstitikdua = document.createTextNode(":");
    titikdua.appendChild(tekstitikdua);
    cel1.appendChild(controltimer);
    cel1.innerHTML += "<br/>";
    cel1.appendChild(controlstart);
    //cel1.appendChild(controlreset);
    //cel1.appendChild(cdpause);
    cel1.appendChild(cdpstop);
    cel1.appendChild(gntibaris);
    cel1.appendChild(cdstatus);
    cel1.innerHTML += ":<br/>";
    cel1.appendChild(cdjam);
    cel1.innerHTML += "";
    cel1.appendChild(cdmenit);
    cel1.appendChild(titikdua)
    cel1.appendChild(cddetik);
    cel1.innerHTML += "<br/><sub>Waktu hanya berjalan di laman siswa</sub>";


    tes.appendChild(tabelidentitas)
    var brek = document.createElement("div")

    brek.setAttribute("style", "break-after:page");
    tes.appendChild(brek)

    var idm = encodeURIComponent(datamateri[par].idmateri);
    //
    $('.classReviewMateri').nextAll('button').remove();
    $.getJSON(linkmateri + "&idmateri=" + idm + "&action=previewriwayat", function (json) {
        //  loadingmodal.style.display="none";
        //$("#output").html(brkline(json))
        // document.getElementById("judulpetunjuk").innerHTML = "Preview e-Lamaso";
        //        document.getElementById("isipetunjuk").innerHTML = brkline(json);
        //   document.querySelector(".kontenmateri").innerHTML += brkline(json);
        tes.innerHTML += brkline(json).teks;
        let inhtml = "<table class='versi-table w3-tiny'><tr><td>Mapel</td><td>KD</td><td>No Soal</td></tr>";
        let xx = brkline(json).kd.split("<br>");
        for (a = 0; a < xx.length; a++) {
            inhtml += `<tr><td> ${xx[a].split("_")[0]}</td><td> ${xx[a].split("_")[1].split(":")[0]}</td><td>${xx[a].split("_")[1].split(":")[1]}</td></tr>`
        }
        inhtml += `</table>`;

        forKD.innerHTML = inhtml;
        // forkuncijawaban.innerHTML = window.atob(brkline(json).kunci).split(",").join("<br>");
        let tekskunci = brkline(json).kunci;
        //console.log(tekskunci);
        if (tekskunci == "" || tekskunci == "undefined" || tekskunci == null) {
            forkuncijawaban.innerHTML = "Tidak Ada PG"
        } else {
            forkuncijawaban.innerHTML = window.atob(tekskunci).split(",").join("<br>");

        }


        var elEssay = document.getElementsByClassName("soalessay")
        if (elEssay.length !== 0) {
            for (i = 0; i < elEssay.length; i++) {
                var idEl = elEssay[i].getAttribute("id");
                var inidEl = idEl.replace("essay", "");
                var tempattombol = document.getElementById("tomboljawaban" + inidEl);
                var tombolsatu = document.createElement("button");
                tombolsatu.setAttribute("onclick", "tombolketikjawaban('" + inidEl + "')");
                var tekstombolsatu = document.createTextNode("Ketik Jawaban No " + inidEl);
                tombolsatu.appendChild(tekstombolsatu);
                tempattombol.appendChild(tombolsatu);
                tempattombol.innerHTML += "<br/><sub>atau</sub></br/> "
                var tomboldua = document.createElement("button");
                tomboldua.setAttribute("onclick", "tomboluploadjawaban('" + inidEl + "')");
                var tekstomboldua = document.createTextNode("Upload Jawaban No " + inidEl);
                tomboldua.appendChild(tekstomboldua);
                tempattombol.appendChild(tomboldua);
                tempattombol.innerHTML += "<br/><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>"

            }
        }

        let tombol = document.createElement("button");
        tombol.setAttribute("class", "w3-button w3-dark-grey w3-display-bottommiddle w3-margin-bottom");
        tombol.setAttribute("onclick", `printPortrait('idpracetak,,,${StringTanggal(new Date())}')`);
        tombol.innerHTML = `<i class="fa fa-print"></i>  Cetak `

        tes.after(tombol)
    })
    // ;


}

const editkronologi = (par) => {
    let datamateri = kronologijson;
    let tdata = kronologijson[par].idtgl;
    let timeTdata = new Date(tdata).getTime();
    let nowtime = new Date().getTime()

    pranalamateri.style.display = "block";
    document.querySelector(".classReviewMateri").innerHTML = "";
    let tes = document.querySelector(".classReviewMateri");

    if (nowtime < timeTdata) { ///jika waktu yang dibuat belum dimulai, boleh diedit, kalo lewat jangan diedit


        $('.classReviewMateri').nextAll('button').remove();
        //let keyy = "kbmtoday" + tglStringZero()

        //let datamateri = JSON.parse(localStorage.getItem(keyy))
        // let datamateri = kronologijson;
        tes.innerHTML = `<h3 class='w3-cursive w3-border-bottom w3-border-cyan w3-center'>EDIT AKSES MATERI</h3> `;


        let form = document.createElement("form");
        form.setAttribute("id", "formeditmateri")
        form.setAttribute("name", "formeditmateri")
        form.setAttribute("class", "w3-card-4 w3-padding w3-margin-bottom w3-center w3-round-xlarge")
        //form.setAttribute("enctype","application/x-form-encoded")

        //elemen 1
        // let label = document.createElement("label");       
        //     label.setAttribute("for","idbaris");
        //     label.innerHTML = "ID Materi:"

        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", "idbaris");
        input.setAttribute("class", "w3-round-xxlarge w3-padding");
        input.setAttribute("style", "width:20%;display:none");
        input.setAttribute("name", "idbaris");
        input.setAttribute("value", datamateri[par].idbaris);


        // form.appendChild(label)
        // let br = document.createElement("br")
        //     form.appendChild(br)
        form.appendChild(input)

        // Element 2
        //  label = document.createElement("label");       
        //  label.setAttribute("for","crtToken");
        //  label.innerHTML = "crtToken:"

        input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", "crtToken");
        input.setAttribute("name", "crtToken");
        input.setAttribute("class", "w3-round-xxlarge w3-padding w3-center");
        input.setAttribute("style", "width:40%;display:none");

        input.setAttribute("value", datamateri[par].crtToken);

        //  br = document.createElement("br")
        //  form.appendChild(br)
        //  form.appendChild(label)
        //  br = document.createElement("br")
        //  form.appendChild(br)
        form.appendChild(input)


        // Element 3
        // label = document.createElement("label");       
        // label.setAttribute("for","dibuatoleh");
        // label.innerHTML = "Oleh:"

        input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", "dibuatoleh");
        input.setAttribute("name", "dibuatoleh");
        input.setAttribute("class", "w3-round-xxlarge w3-padding w3-center");
        input.setAttribute("style", "width:90%;display:none");
        input.setAttribute("value", namauser);

        // br = document.createElement("br")
        // form.appendChild(br)
        // br = document.createElement("br")
        // form.appendChild(br)
        // form.appendChild(label)
        // form.appendChild(br)
        form.appendChild(input)
        let label = document.createElement("label");
        label.setAttribute("for", "idmapel");
        label.innerHTML = "Identitas Materi"

        input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", "idmapel");
        input.setAttribute("name", "idmapel");
        input.setAttribute("class", "w3-round-xxlarge w3-padding w3-center");
        input.setAttribute("style", "width:90%");
        input.value = datamateri[par].idmapel;

        br = document.createElement("br")
        form.appendChild(br)
        br = document.createElement("br")
        form.appendChild(br)
        br = document.createElement("br")
        form.appendChild(br)
        form.appendChild(label)
        form.appendChild(br)
        form.appendChild(input)

        // Element 7
        label = document.createElement("label");
        label.setAttribute("for", "idaksessiswa");
        label.innerHTML = "Jenis Pembelajaran"
        let selek = document.createElement("select");
        selek.setAttribute("id", "idaksessiswa");
        selek.setAttribute("name", "idaksessiswa");
        selek.setAttribute("class", "w3-round-xxlarge w3-padding w3-center");
        selek.setAttribute("style", "width:40%");
        selek.setAttribute("onclick", "janganadatagihan()");
        let selekopsi = document.createElement("option");
        selekopsi.setAttribute("id", "selekopsi01");
        selekopsi.setAttribute("value", "sekali");
        selekopsi.setAttribute("class", "w3-round-xxlarge w3-padding w3-center");
        selekopsi.innerHTML = "Ulangan (Menerima tugas siswa)"
        selek.appendChild(selekopsi)

        selekopsi = document.createElement("option");
        selekopsi.setAttribute("id", "selekopsi02");
        selekopsi.setAttribute("value", "beberapa kali");
        selekopsi.innerHTML = "Latihan (Tidak menerima tugas)"
        selek.appendChild(selekopsi)

        selek.value = datamateri[par].idaksessiswa;

        br = document.createElement("br")
        form.appendChild(br)
        br = document.createElement("br")
        form.appendChild(br)
        br = document.createElement("br")
        form.appendChild(br)
        form.appendChild(label)
        form.appendChild(br)
        form.appendChild(selek)

        // Element 8
        label = document.createElement("label");
        label.setAttribute("for", "jenistagihan");
        label.innerHTML = "Jenis Tagihan"
        selek = document.createElement("select");
        selek.setAttribute("id", "jenistagihan");
        selek.setAttribute("name", "jenistagihan");
        selek.setAttribute("class", "w3-round-xxlarge w3-padding w3-center");
        selek.setAttribute("style", "width:30%");
        selek.setAttribute("onchange", "gabolehaksessekali()");


        selekopsi = document.createElement("option");
        selekopsi.setAttribute("id", "seleKOpsi10");
        selekopsi.setAttribute("value", "");
        selekopsi.setAttribute("class", "w3-round-xxlarge w3-padding w3-center");
        selekopsi.innerHTML = ""
        selek.appendChild(selekopsi);

        selekopsi = document.createElement("option");
        selekopsi.setAttribute("id", "selekopsi1");
        selekopsi.setAttribute("value", "PH");
        selekopsi.setAttribute("class", "w3-round-xxlarge w3-padding w3-center");
        selekopsi.innerHTML = "PH"
        selek.appendChild(selekopsi)

        selekopsi = document.createElement("option");
        selekopsi.setAttribute("id", "selekopsi2");
        selekopsi.setAttribute("value", "PTS");
        selekopsi.innerHTML = "PTS"
        selek.appendChild(selekopsi)

        selekopsi = document.createElement("option");
        selekopsi.setAttribute("id", "selekopsi3");
        selekopsi.setAttribute("value", "PAS");
        selekopsi.innerHTML = "PAS (untuk semester 1)"
        selek.appendChild(selekopsi)

        selekopsi = document.createElement("option");
        selekopsi.setAttribute("id", "selekopsi4");
        selekopsi.setAttribute("value", "PAK");
        selekopsi.innerHTML = "PAK (untuk semester 2)"
        selek.appendChild(selekopsi);

        selekopsi = document.createElement("option");
        selekopsi.setAttribute("id", "selekopsi5");
        selekopsi.setAttribute("value", "kpraktik");
        selekopsi.innerHTML = "Praktik (KI-4)"
        selek.appendChild(selekopsi);

        selekopsi = document.createElement("option");
        selekopsi.setAttribute("id", "selekopsi6");
        selekopsi.setAttribute("value", "kproduk");
        selekopsi.innerHTML = "Produk (KI-4)";
        selek.appendChild(selekopsi);

        selekopsi = document.createElement("option");
        selekopsi.setAttribute("id", "selekopsi7");
        selekopsi.setAttribute("value", "kproyek");
        selekopsi.innerHTML = "Proyek (KI-4)";
        selek.appendChild(selekopsi);

        selekopsi = document.createElement("option");
        selekopsi.setAttribute("id", "selekopsi8");
        selekopsi.setAttribute("value", "ustertulis");
        selekopsi.innerHTML = "US Tertulis (kelas 6)";
        selek.appendChild(selekopsi);

        selekopsi = document.createElement("option");
        selekopsi.setAttribute("id", "selekopsi9");
        selekopsi.setAttribute("value", "uspraktek");
        selekopsi.innerHTML = "US Praktek (kelas 6)";
        selek.appendChild(selekopsi);

        // <option id="seltagih6" value=></option>
        // <option id="seltagih7" value="kproduk">Produk (KI-4)</option>
        // <option id="seltagih8" value="kproyek">Proyek (KI-4)</option>
        // <option id="seltagih9" value="ustertulis">US Tertulis (kelas 6)</option>
        // <option id="seltagih10" value="uspraktek">US Praktek (kelas 6)</option>


        //selek.setAttribute("value",datamateri[par].jenistagihan);
        selek.value = datamateri[par].jenistagihan;

        br = document.createElement("br")
        form.appendChild(br)
        br = document.createElement("br")
        form.appendChild(br)
        br = document.createElement("br")
        form.appendChild(br)
        form.appendChild(label)
        form.appendChild(br)
        form.appendChild(selek)

        //------------------------------
        label = document.createElement("label");
        label.setAttribute("for", "iddurasi");
        label.innerHTML = "Durasi (Menit)"
        input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("id", "iddurasi");
        input.setAttribute("name", "iddurasi");
        input.setAttribute("class", "w3-round-xxlarge w3-padding w3-center");
        input.setAttribute("style", "width:30%");
        input.setAttribute("min", 1);
        input.setAttribute("max", 120);
        input.setAttribute("value", datamateri[par].iddurasi);

        br = document.createElement("br")
        form.appendChild(br)

        br = document.createElement("br")
        form.appendChild(br)
        form.appendChild(label)
        br = document.createElement("br")
        form.appendChild(br)
        form.appendChild(input)

        //--------------------------------

        //element 4
        let tglawal = datamateri[par].idtgl;
        label = document.createElement("label");
        label.setAttribute("for", "idtgl");
        label.innerHTML = "Waktu Mulai:"

        input = document.createElement("input");
        input.setAttribute("type", "datetime-local");
        input.setAttribute("id", "idtgl");
        input.setAttribute("name", "idtgl");
        input.setAttribute("style", "width:90%");
        input.setAttribute("onchange", "pengenbuatcrtToken()");
        input.setAttribute("class", "w3-round-xxlarge w3-padding w3-center");

        //2020-12-01T17:00:00.000Z
        input.setAttribute("value", stringForDateTimeLocal(tglawal))
        // console.log(par)
        // console.log(tglawal)
        // console.log(datamateri[par].idtgl)


        br = document.createElement("br")
        form.appendChild(br)
        br = document.createElement("br")
        form.appendChild(br)
        br = document.createElement("br")
        form.appendChild(br)
        form.appendChild(label)
        form.appendChild(br)
        form.appendChild(input)

        //element 5
        let tglakhir = datamateri[par].idtglend;
        label = document.createElement("label");
        label.setAttribute("for", "idtglend");
        label.innerHTML = "Waktu Selesai:"

        input = document.createElement("input");
        input.setAttribute("type", "datetime-local");
        input.setAttribute("id", "idtglend");
        input.setAttribute("name", "idtglend");
        input.setAttribute("style", "width:90%");
        input.setAttribute("class", "w3-round-xxlarge w3-padding w3-center");

        //2020-12-01T17:00:00.000Z
        input.setAttribute("value", stringForDateTimeLocal(tglakhir))
        // console.log(par)
        // console.log(tglawal)
        // console.log(datamateri[par].idtgl)


        br = document.createElement("br")
        form.appendChild(br)
        br = document.createElement("br")
        form.appendChild(br)
        br = document.createElement("br")
        form.appendChild(br)
        form.appendChild(label)
        form.appendChild(br)
        form.appendChild(input)

        // Element 6









        tes.appendChild(form)
        let subm = document.createElement("button");
        subm.setAttribute("onclick", "kirimeditmateri()");
        subm.setAttribute("class", "w3-button w3-hover-green w3-blue w3-round-xxlarge");
        subm.innerHTML = `<i class="fa fa-paper-plane  w3-xlarge"></i>   KIRIM PERUBAHAN`;
        let cente = document.createElement("div");
        cente.setAttribute("class", "w3-margin w3-center")
        cente.appendChild(subm)

        subm = document.createElement("button");
        subm.setAttribute("onclick", "pranalamateri.style.display='none';idpracetak.innerHTML = ''");
        subm.setAttribute("class", "w3-button w3-hover-black w3-red w3-round-xxlarge");
        subm.innerHTML = `<i class="fa fa-cross  w3-xlarge"></i>   BATAL`;
        cente.appendChild(subm)


        tes.appendChild(cente)
    } else {
        tes.innerHTML = `<h3 class='w3-cursive w3-border-bottom w3-border-cyan w3-center'>MAAF, MATERI ANDA TIDAK BISA DIEDIT</h3> `;
        tes.innerHTML += "Akses materi yang dapat diedit hanya materi yang belum dilaksankan."
    }
}

const pengenbuatcrtToken = () => {
    let val = document.formeditmateri.idtgl.value;
    let d = new Date(val)
    let dd = d.getDate();
    let mm = d.getMonth() + 1;
    let yy = d.getFullYear();




    let newval = addZero(dd) + "" + addZero(mm) + "" + yy;
    //console.log(newval)
    document.formeditmateri.crtToken.value = newval

}

const gabolehaksessekali = () => {
    let akses = document.formeditmateri.idaksessiswa.value
    let betulbetul = (akses == "sekali") ? false : true;
    if (betulbetul) {
        alert("Anda tidak bisa memilih jenis tagihan, karena jenis pembelajaran(KBM) yang Anda edit hanya untuk latihan/tidak menerima tagihan nilai dari siswa");
        document.formeditmateri.jenistagihan.value = ""
    }

}

const janganadatagihan = () => {
    let akses = document.formeditmateri.idaksessiswa.value
    let betulbetul = (akses == "sekali") ? false : true;
    if (betulbetul) {
        document.formeditmateri.jenistagihan.value = ""

    }
}

const kirimeditmateri = () => {
    //alert("ya jalan ...")
    let dom = document.getElementById("formeditmateri");
    let data = new FormData(dom);
    idpracetak.innerHTML = `<i class="fa fa-spin fa-spinner w3-xxxlarge"></i> On Proess kirim`
    let url = linkmateri + "&action=editaksesmateri"
    fetch(url, { method: 'post', body: data })
        .then(m => m.json())
        .then(f => {
            idpracetak.innerHTML = f.result;
            pembelajaran();
            updatematerikan();

        })
        .catch(er => idpracetak.innerHTML = "Maaf terjadi kesalahan, coba lagi. Pesan error:" + er)


}





const stringForDateTimeLocal = (tgl) => {
    let n = new Date(tgl);
    let yyyy = n.getFullYear();
    let mmmm = n.getMonth() + 1;
    let MM = addZero(mmmm);
    let dd = addZero(n.getDate());
    let hh = addZero(n.getHours());
    let mm = addZero(n.getMinutes())
    let ss = addZero(n.getSeconds())
    let teks = yyyy + "-" + MM + "-" + dd + "T" + hh + ":" + mm + ":" + ss
    return teks
}

function unggahmateri() { // upload offline atau ambil file dari drive PC/root HP
    var isimapel = document.formuploadmateri.idmapel.value;
    var isitanggal = document.formuploadmateri.idtgl.value;
    var isidurasi = document.formuploadmateri.iddurasi.value;
    var isiakses = document.formuploadmateri.idaksessiswa.value;
    if (isimapel == "" || isitanggal == "" || isidurasi == "") { // Beri kondisi jika isian tidak lengkap maka ditolak
        alert("Isian tidak lengkap, Mohon lengkapi isian data di atas");

        document.getElementById("uploadmateri").value = "";
    } else {
        var item = "";

        item = "";
        item = document.getElementById("uploadmateri").files[0];

        var fr = new FileReader();
        fr.onload = function () {

            var tes = brkline(fr.result);
            //document.getElementById("output").textContent = tes ;//fr.result;

            //document.getElementById("materiimport").innerHTML+="</div>";					
            document.getElementById("materiimport").appendChild(tabelpreview);
            document.getElementById("materiimport").innerHTML += tes; //fr.result;
            document.getElementById("namafileupload").innerHTML = item.name + " (" + (item.size / 1000).toFixed(2) + " Kb)";
            $("#previewlogohp").hide();
            $("#previewloginsiswa").hide();
            $("#materiimport").hide();
            $("#layardepan").show();
            //console.log(tes)

        }
        fr.readAsText(item);
        // ini untuk menguload ke Drive
        var oFReader = new FileReader();
        oFReader.readAsDataURL(item);

        oFReader.onload = function (oFREvent) {
            document.getElementById("basetxt").value = oFREvent.target.result;

        };

    }
}


const tombolaksihariini = (currEssay, parNama) => {
    //let currEssay = ;//ada ga essay? false (jika ga ada)
    //anggap aja ada essay dulu!
    let kodehtml = "";
    let cek = nilairespon.filter(k => k.tokensiswa == parNama);
    if (cek.length == 0) {
        //jika siswa belum mengerjakan!
        kodehtml = "-"

    } else {
        // console.log(cek)
        // console.log(cek[cek.length - 1])
        // console.log(cek[cek.length - 1]['nilaiEssay'])
        let indek = cek.length - 1;
        let indekk = indek + "<|>" + parNama


        if (currEssay) {
            // jika ada essay, cek lagi. Nilai essaynya udah masuk apa belum
            // jika belum masuk, maka tampilkan tombol koreksi
            if (cek[indek].nilaiEssay == "") {
                kodehtml = `<button class="w3-button w3-red" onclick="lihatljksaya('${cek[indek].html_jawaban}')">LJK</button><br>
          <button class="w3-button w3-green" onclick="gurumengoreksihariini('${indekk}')">Koreksi</button><br></br>
          `
            } else {
                kodehtml = `<button class="w3-button w3-blue" onclick="lihatljksaya('${cek[indek].html_jawaban}')">LJK</button><br>
          <button class="w3-button w3-green" onclick="gurumengoreksihariini('${indekk}')">Koreksi Ulang</button><br></br>
          `
                //<button class="w3-button w3-green" onclick="gurumengoreksi('${indek}')">Koreksi Ulang</button><br></br>
                //
            }

        } else {
            kodehtml = `<button class="w3-button w3-blue" onclick = "lihatljksaya('${cek[indek].html_jawaban}')" > LJK</button > `
        }
    }
    return kodehtml
}

const gurumengoreksihariini = (bid) => {
    let indek = bid.split("<|>")[0];
    let parnama = bid.split("<|>")[1];

    let cek = nilairespon.filter(k => k.tokensiswa == parnama)[indek];
    let idbaris = cek.idbaris;
    let prefikkodeunik = cek.matericode + "_" + cek.kodeunik + "_";
    let tagihankoreksi = cek.jenistagihan;
    let namasiswakoreksi = cek.namasiswa;

    loadingljk.style.display = "block";
    infoloadingljk.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle" ></i > `;
    let divljk = document.createElement("div");
    divljk.setAttribute("id", "divljkkoreksi");
    let formljk = document.createElement("form");
    formljk.setAttribute("id", "formgurumengoreksi")
    //formljk.setAttribute("id", "formgurumengoreksi")

    $('#infoloadingljk').nextAll('button').remove();
    $('#infoloadingljk').nextAll('center').remove();
    let html_jawaban = cek.html_jawaban;
    $.getJSON(constpreviewljk + "?idmateri=" + html_jawaban + "&action=previewriwayat", function (json) {

        // infoloadingljk.innerHTML = brkline(json).teks + "<br><br><br>";
        infoloadingljk.innerHTML = "";//brkline(json).teks + "<br><br><br>";
        infoloadingljk.appendChild(divljk)
        divljkkoreksi.innerHTML = brkline(json).teks + "<br><br><br>";
        var elEssay = document.getElementsByClassName("koleksilj")
        if (elEssay.length !== 0) {
            for (i = 0; i < elEssay.length; i++) {
                var idEl = elEssay[i].getAttribute("id");
                var inidEl = idEl.replace("untuklj", "");
                var tempattombol = document.getElementById("untuklj" + inidEl);
                var tombolsatu = document.createElement("input");
                tombolsatu.setAttribute("type", "number");
                tombolsatu.setAttribute("id", "koreksisoal_" + inidEl);
                tombolsatu.setAttribute("value", cek["SKOR_" + inidEl] * 100);
                tombolsatu.setAttribute("class", "koreksisoal");
                tombolsatu.setAttribute("onchange", `updatenilaikoreksihariini('${inidEl}')`);
                tempattombol.innerHTML = `Nilai Koreksi :<span id='nilaiessaykoreksi_${inidEl}'></span>`;
                tempattombol.appendChild(tombolsatu);


            }
        }
        //-----------------------------------------------------
        infoloadingljk.appendChild(formljk);
        //dibikin fildseet
        let fieldsett = document.createElement("fieldset")
        fieldsett.setAttribute("style", "display:none");
        fieldsett.setAttribute("id", "kirimanedit");
        formgurumengoreksi.appendChild(fieldsett)

        let teks = "kbmtoday" + tglStringZero();
        let obb = JSON.parse(localStorage.getItem(teks))[parseInt(idtabaktif.innerHTML)]
        let ob = JSON.parse(obb.kuncikd);

        let obnosoal = ubahjsonkuncikd(ob);

        //console.log(obnosoal.length);
        let dibikin = Object.keys(obnosoal)
        //console.log(dibikin.length)
        for (let i = 0; i < dibikin.length; i++) {
            // console.log(dibikin[i])
            // console.log(])
            //infoloadingljk.innerHTML += `<input value="TES ${i}"/>`
            let lbl = document.createElement("label")
            lbl.setAttribute("for", "SKOR_" + dibikin[i]);
            let tek = document.createTextNode("No " + dibikin[i])
            lbl.appendChild(tek)
            let docinput = document.createElement("input")
            docinput.setAttribute("id", "SKOR_" + dibikin[i]);
            docinput.setAttribute("class", obnosoal[dibikin[i]]);
            docinput.setAttribute("name", "SKOR_" + dibikin[i]);
            docinput.setAttribute("value", cek["SKOR_" + dibikin[i]]);
            kirimanedit.appendChild(lbl)
            kirimanedit.appendChild(docinput)
            // let gantibaris = document.createElement("br")
            // kirimanedit.appendChild(gantibaris)

        }


        var tengahdulu = document.createElement("fieldset");
        tengahdulu.setAttribute("style", "background-color:yellow;display:block");
        tengahdulu.setAttribute("id", "formedittontonin");
        tengahdulu.setAttribute("class", "w3-center");

        var inputidbaris = document.createElement("input");
        inputidbaris.setAttribute("id", "brs");
        inputidbaris.setAttribute("name", "brs");
        inputidbaris.setAttribute("class", "w3-input w3-center");
        inputidbaris.setAttribute("value", idbaris);
        // inputidbaris.setAttribute("disabled", "true");

        inputidbaris.setAttribute("style", "display:block");

        var inputnilaikoreksi = document.createElement("input");
        inputnilaikoreksi.setAttribute("type", "number");
        inputnilaikoreksi.setAttribute("class", "w3-input w3-center");
        inputnilaikoreksi.setAttribute("id", "nilaiakhiressay");
        inputnilaikoreksi.setAttribute("name", "nilaiakhiressay");


        var tombolkirim = document.createElement("button");
        tombolkirim.setAttribute("onclick", "siapkirimnilai()");
        tombolkirim.setAttribute("class", "wa");
        tombolkirim.innerHTML = "Beri Nilai";

        let inputnilaikd = document.createElement("input")
        inputnilaikd.setAttribute("id", "nilaikdkoreksi");
        inputnilaikd.setAttribute("name", "nilaikd");
        inputnilaikd.setAttribute("class", "w3-input w3-center");
        // inputnilaikd.setAttribute("disabled", false);

        lbl = document.createElement("label");
        lbl.setAttribute("for", "brs")
        tek = document.createTextNode("ID LJK")
        lbl.appendChild(tek)
        kirimanedit.appendChild(lbl)
        kirimanedit.appendChild(inputidbaris);

        lbl = document.createElement("label");
        lbl.setAttribute("for", "nilaikdkoreksi")
        tek = document.createTextNode("Nilai Per KD");
        lbl.appendChild(tek);
        kirimanedit.appendChild(lbl)

        kirimanedit.appendChild(inputnilaikd);

        // let inputt = document.createElement("input");
        // inputt.setAttribute("id",)
        kirimanedit.innerHTML += "Preview Nilai Essay : "
        kirimanedit.appendChild(inputnilaikoreksi);

        tengahdulu.innerHTML += "Preview Nilai Essay : "
        let sp = document.createElement("span");
        sp.setAttribute("id", "prevprevnilaikoreksi")
        tengahdulu.appendChild(sp)

        docinput = document.createElement("textarea");
        //docinput.textContent = json
        docinput.setAttribute("id", "htmlljkkoreksi")
        docinput.setAttribute("name", "htmlljkkoreksi")
        // formgurumengoreksi.appendChild(docinput)

        //     formgurumengoreksi.appendChild(tengahdulu)
        kirimanedit.appendChild(docinput)

        let inputprefik = document.createElement("input");
        inputprefik.setAttribute("id", "prefikkodeunik");
        inputprefik.setAttribute("name", "prefikkodeunik");
        inputprefik.setAttribute("value", prefikkodeunik);

        kirimanedit.appendChild(inputprefik)

        inputprefik = document.createElement("input");
        inputprefik.setAttribute("id", "jenistagihankoreksi");
        inputprefik.setAttribute("name", "jenistagihankoreksi");
        inputprefik.setAttribute("value", tagihankoreksi);
        kirimanedit.appendChild(inputprefik)

        inputprefik = document.createElement("input");
        inputprefik.setAttribute("id", "jenjangkoreksi");
        inputprefik.setAttribute("name", "jenjangkoreksi");
        inputprefik.setAttribute("value", idJenjang);
        kirimanedit.appendChild(inputprefik)

        inputprefik = document.createElement("input");
        inputprefik.setAttribute("id", "kelaskoreksi");
        inputprefik.setAttribute("name", "kelaskoreksi");
        inputprefik.setAttribute("value", idNamaKelas);
        kirimanedit.appendChild(inputprefik)
        inputprefik = document.createElement("input");
        inputprefik.setAttribute("id", "namasiswakoreksi");
        inputprefik.setAttribute("name", "namasiswakoreksi");
        inputprefik.setAttribute("value", namasiswakoreksi);
        kirimanedit.appendChild(inputprefik)


        formgurumengoreksi.appendChild(tengahdulu)
        formgurumengoreksi.after(tombolkirim);



        let tombol = document.createElement("button");
        tombol.setAttribute("class", "w3-button w3-dark-grey w3-display-bottommiddle w3-margin-bottom");
        tombol.setAttribute("onclick", `printPortrait('divljkkoreksi,,,${StringTanggal(new Date())}')`);
        tombol.innerHTML = `<i class="fa fa-print" ></i > Cetak`




        //---------------------------------------------------------------


        // docinput.textcontent
        // var teksarea = document.getElementById("tekshtmlnilai");
        // var isiteks = document.getElementById("borderidhasilakhirnama");
        // var teksbtoa = encodeURIComponent(isiteks.innerHTML);

        // teksarea.textContent = window.btoa(unescape(encodeURIComponent(isiteks.innerHTML)));

        infoloadingljk.after(tombol)

    })



}



function updatenilaikoreksihariini(id) {
    let inputedit = document.getElementById("koreksisoal_" + id);
    if (inputedit.value > 100) {
        alert("Nilai Maksimum 100, dan minimum 0")
        inputedit.value = 100;
    }
    document.getElementById("SKOR_" + id).value = (inputedit.value / 100).toFixed(2);
    document.getElementById("nilaiessaykoreksi_" + id).innerHTML = inputedit.value;

    var kelasinput = document.getElementsByClassName("koreksisoal");
    var nilai = 0;
    for (i = 0; i < kelasinput.length; i++) {

        nilai += kelasinput[i].value * 1;

    }
    /// ---------------------------------------------------

    let teks = "kbmtoday" + tglStringZero();
    let obb = JSON.parse(localStorage.getItem(teks))[parseInt(idtabaktif.innerHTML)]


    // var jumlahsoalessaysebenarnya = kronologijson[parseInt(idtabaktif.innerHTML)].jumlahessay;
    var jumlahsoalessaysebenarnya = obb.jumlahessay;

    var nilaiakhir = (nilai / jumlahsoalessaysebenarnya).toFixed(2);
    // document.getElementById("nilaiakhiressay").value = nilai;
    document.getElementById("nilaiakhiressay").value = nilaiakhir;
    /// ---------------------------------------------------

    //document.getElementById("nilaiakhiressay").value = nilaiakhir;
    //document.getElementById("htmlljkkoreksi").textContent = divljkkoreksi.innerHTML;

    let kd = JSON.parse(obb.kuncikd);

    // let kd = JSON.parse(kronologijson[parseInt(idtabaktif.innerHTML)].kuncikd)
    let keykd = Object.keys(kd); // MTK_3.1 , PKN_3.5
    let objnilai = {};
    for (let k = 0; k < keykd.length; k++) {
        let nomorsoal = kd[keykd[k]];

        let jumlahnomor = nomorsoal.length;

        let count = 0;
        let inkd = document.getElementsByClassName(keykd[k]);
        for (let j = 0; j < inkd.length; j++) {
            count += inkd[j].value * 1;
            //console.log(inkd[j].value)
        }

        let nilaiakhir = (count / jumlahnomor * 100).toFixed(2)
        objnilai[keykd[k]] = nilaiakhir
    }
    document.getElementById("nilaikdkoreksi").value = JSON.stringify(objnilai)

    document.getElementById("prevprevnilaikoreksi").innerHTML = `<hr> Skor Essay = <br>${nilaiakhir} <hr> Skor KD = <br> ${JSON.stringify(objnilai)}`




}

