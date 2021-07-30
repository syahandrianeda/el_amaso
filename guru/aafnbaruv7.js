let msb_obje = {}
let valueeditormateri = {};
const pgeditnosoal = () => {
    let val = inputnosoalpg.value;
    let txar = document.getElementById("ketpen4");
    document.getElementById("contohsoalke-1").innerHTML = val;
    txar.textContent = `_PG_${val} isikan pertanyaan ....
_OPSI-PG_${val}A isikan opsi jawaban A
_OPSI-PG_${val}B isikan opsi jawaban B
_OPSI-PG_${val}C isikan opsi jawaban C
_OPSI-PG_${val}D isikan opsi jawaban D
`
}
const pgeditnosoalC = () => {
    let val = inputnosoalpgC.value;
    let txar = document.getElementById("ketpen27");
    document.getElementById("contohsoalke-1C").innerHTML = val;
    txar.textContent = `_PG_${val} isikan pertanyaan ....
_OPSI-PG-C_${val}A isikan opsi jawaban A
_OPSI-PG-C_${val}B isikan opsi jawaban B
_OPSI-PG-C_${val}C isikan opsi jawaban C

`
}
const pgeditnosoaltabel = () => {
    let val = inputnosoalpgtabel.value;
    let txar = document.getElementById("ketpen5");
    document.getElementById("contohsoaltabelke1").innerHTML = val;
    txar.textContent = `
_PG_${val} Pertanyaan soal Pilhan Ganda
_START-TABEL-OPSI_
Opsi <|HEADER|>	Header	<|HEADER|>	Contoh
_OPSI-SEL_${val}A	<|>	Mutualisme	<|>	Hubungan bunga dengan lebah
_OPSI-SEL_${val}B 	<|>	Parasitisme	<|>	Hubungan bakteri E-Coli pada usus manusia
_OPSI-SEL_${val}C 	<|>	Komensialisme	<|>	Benalu pada batang pohon mangga
_OPSI-SEL_${val}D 	<|>	Xerofitisme	<|>	Hubungan burung jalak dengan kerbau`
}
const editnosoalessay = () => {
    let val = inputnosoalessay.value;
    let txar = document.getElementById("ketpen6");
    document.getElementById("contohsoalessay").innerHTML = val;
    txar.textContent = `_ESSAY-NO_${val} pertanyaan Essay`
}
const tombolketikjawaban = (id) => {
    alert("Siswa mengetik jawaban essay nomor " + id)
}
const tomboluploadjawaban = (id) => {
    alert("Siswa mengupload jawaban essay nomor " + id)
}
const klikpotosiswa = (el) => {

    document.getElementById("img01").src = el.src;
    document.getElementById("previewpotoabsen").style.display = "block";

}

const fnv7hapusmateri = (ids) => {
    let konfirmasihapus = confirm("Anda yakin ingin menghapus konten materi ini? \n \n Jika Anda menghapusnya, maka seluruh jenjang kelas Anda tidak bisa mengakses konten materi ini lagi. Baik oleh guru sejawat Anda maupun siswa. Pastikan Anda yakin dan telah mengkonfirmasi bersama guru sejawat Anda di sekolah untuk tidak menggunakan konten materi ini. \n \n Jika tetap ingin menghapus, klik OK. / Untuk membatalkan klik CANCEL");
    if (!konfirmasihapus) {
        return
    }
    let brs = kronologijson[ids].idbaris;
    let data = new FormData();
    data.append("idbaris", brs);

    fetch(linkmateri + "&action=hapusmateridaridaftar", {
            method: 'post',
            body: data
        }).then(m => m.json())
        .then(k => {
            alert(k.result);
            pembelajaran();
        }).catch(er => console.log(er))
}

const fnv7perbaikikonten = (ids) => {
    let id = kronologijson[ids].idtgl;
    let brs = kronologijson[ids].idbaris;
    let teksidok = addZero(new Date(id).getDate()) + "" + addZero(new Date(id).getMonth() + 1) + "" + new Date(id).getFullYear();
    let data = new FormData();
    data.append("dibuatoleh", namauser);
    data.append("crtToken", teksidok);
    data.append("idbaris", brs);
    fetch(linkmateri + "&action=aktifkancrtToken", {
            method: 'post',
            body: data
        }).then(m => m.json())
        .then(k => {
            alert(k.result);
            pembelajaran();
        }).catch(er => console.log(er))
}

let jsonmateridihapus = "";
const fnv7kotenmateridihapus = (ids) => {
    //alert('ids = ' + ids);
    timelinekbm.innerHTML = "<i class='fa fa-spin fa-spinner w3-xxlarge'></i>";
    fetch(linkmateri + "&action=kronologhapus&idtoken=" + idJenjang)
        .then(m => m.json())
        .then(k => {
            // console.log(k);
            jsonmateridihapus = k.result;
            let temp = `<div style="overflow-x:auto"><table class='versi-table w3-tiny'><thead>
            <tr>
                <th> Baris Database</th>
                <th> Judul Materi</th>
                <th> Jenis KBM </th>
                <th> Waktu Pelaksanaan</th>
                <th> Preview</th>
                <th> Aksi </th>
            </tr>
            </thead>
            <tbody>
        `
            let kk = k.result;

            if (kk.length > 0) {
                for (a = 0; a < kk.length; a++) {
                    temp += `
            <tr><td>${kk[a].idbaris}</td>
                <td> ${kk[a].idmapel.toUpperCase()}</td>
                <td> ${(kk[a].idaksessiswa == 'sekali') ? 'ULANGAN<br>Menerima Tugas Siswa' : 'LATIHAN<br>Tidak Menerima Tugas'}</td>
                <td> ${tanggalfulllengkap(kk[a].idtgl)} <br>s/d<br> ${tanggalfulllengkap(kk[a].idtglend)}</td>
                <td><button onclick="fn7preview('${a}')" class="w3-button w3-green w3-hover-red">PREVIEW</button></td>
                <td class='fn7tombolaksi${a}'> <button onclick="fn7kembalikankonten('${a}')" class="w3-button w3-blue w3-hover-green">Kembalikan</button><br><br>
                <button onclick="fn7jadikankontenbaru('${a}')" class="w3-button w3-khaki w3-hover-green">Simpan Draft</button>
                </td>
            </tr>
            `
                }
            } else {
                temp += `
            <tr>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
            </tr>
            `
            }
            temp += `</tbody></table></div>`;
            timelinekbm.innerHTML = `<button class="w3-button w3-red w3-hover-blue w3-round-large" onclick="pembelajaran()"> Kembali ke Kronologi</button><hr><h4>Materi di Jenjang Kelas Anda yang telah dihapus:</h4>` + temp;

        })
        .catch(er => console.log(er));
}

const fn7preview = (par) => {
    pranalamateri.style.display = 'block';

    document.querySelector(".classReviewMateri").innerHTML = "";
    let tes = document.querySelector(".classReviewMateri");
    //let keyy = "kbmtoday" + tglStringZero()

    //let datamateri = JSON.parse(localStorage.getItem(keyy))
    let datamateri = jsonmateridihapus;


    //bikin judul h4
    var judul = document.createElement("h4");
    judul.setAttribute("class", "w3-center");
    judul.innerHTML = "Identitas e-Lamaso";
    tes.innerHTML = "";
    tes.appendChild(judul);

    //-- Bikin Tabel identitas:
    var tabelidentitas = document.createElement("table");
    tabelidentitas.setAttribute("class", "versi-table tabel_idreview");
    tabelidentitas.setAttribute("style", "margin:auto");
    var tr = tabelidentitas.insertRow(-1);

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Sekolah";
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idSekolah;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Dibuat/Diedit Oleh";
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].dibuatoleh;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kelas";
    var td = tr.insertCell(-1);
    td.innerHTML = idNamaKelas;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Identitas Pembelajaran";
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idmapel;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Frekuensi Akses";
    var td = tr.insertCell(-1);
    var keteranganakses;
    if (datamateri[par].idaksessiswa == "sekali") {
        keteranganakses = "TEST <br>(Menerima Jawaban/Tugas Siswa)";
    } else {
        keteranganakses = "LATIHAN <br>(Tidak menerima jawaban/tugas)";
    }
    td.innerHTML = keteranganakses;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Tanggal Publikasi";
    var td = tr.insertCell(-1);
    td.innerHTML = tanggalfulllengkap(datamateri[par].idtgl);

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kompetensi KD<br><sub class='w3-text-red'>Tidak akan muncul di siswa</sub>";
    var td = tr.insertCell(-1);
    td.setAttribute("id", "forKD")
    td.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kunci Jawaban<br><sub class='w3-text-red'>Tidak akan muncul di siswa</sub>";
    var td = tr.insertCell(-1);
    td.setAttribute("id", "forkuncijawaban");
    td.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Baris Database Materi";
    var td = tr.insertCell(-1);
    td.innerHTML = `${datamateri[par].idbaris}`;



    tes.appendChild(tabelidentitas);
    var brek = document.createElement("div");

    brek.setAttribute("style", "break-after:page");
    brek.innerHTML = "<h4 class='w3-center'>PREVIEW MATERI DI ELAMASO SISWA</h4>"
    tes.appendChild(brek);

    //var idm = encodeURIComponent(datamateri[par].idmateri);
    var idm = datamateri[par].idmateri;
    //
    $('.classReviewMateri').nextAll('button').remove();
    $.getJSON(linkmateri + "&idmateri=" + idm + "&action=previewriwayat", function (json) {

        tes.innerHTML += brkline(json).teks;
        let inhtml = "<table class='versi-table w3-tiny'><tr><td>Mapel</td><td>KD</td><td>No Soal</td></tr>";
        let xx = brkline(json).kd.split("<br>");
        for (a = 0; a < xx.length; a++) {
            inhtml += `<tr><td> ${xx[a].split("_")[0]}</td><td> ${xx[a].split("_")[1].split(":")[0]}</td><td>${xx[a].split("_")[1].split(":")[1]}</td></tr>`
        }
        inhtml += `</table>`;

        forKD.innerHTML = inhtml;


        let tekskunci = brkline(json).kunci;

        if (tekskunci == "" || tekskunci == "undefined" || tekskunci == null) {
            forkuncijawaban.innerHTML = "Tidak Ada PG";
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
                tempattombol.innerHTML += "<br/><sub>atau</sub></br/> ";
                var tomboldua = document.createElement("button");
                tomboldua.setAttribute("onclick", "tomboluploadjawaban('" + inidEl + "')");
                var tekstomboldua = document.createTextNode("Upload Jawaban No " + inidEl);
                tomboldua.appendChild(tekstomboldua);
                tempattombol.appendChild(tomboldua);
                tempattombol.innerHTML += "<br/><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>";

            }
        }

    })
    // ;
}
const fn7kembalikankonten = (id) => {
    let konfirmasihapus = confirm("Anda yakin ingin mengembalikan materi ini di Time Line Anda? \n \n Jika tetap ingin mengembalikan, klik OK. / Untuk membatalkan klik CANCEL");
    if (!konfirmasihapus) {
        return;
    }
    let brs = jsonmateridihapus[id].idbaris;
    let data = new FormData();
    data.append("idbaris", brs);
    data.append("idtoken", idJenjang);

    fetch(linkmateri + "&action=kembalikanmateridaridaftar", {
            method: 'post',
            body: data
        }).then(m => m.json())
        .then(k => {

            alert(k.result);
            pembelajaran();
        }).catch(er => console.log(er))
}
const fn7jadikankontenbaru = (id) => {
    let konfirmasihapus = confirm("Anda yakin ingin menyimpan Konten Materi ini menjadi draft Anda? \n \n Simpanan Draft sebelumnya akan hilang dan digantikan dengan draft ini. \n\n Jika tetap ingin menyimpan draf, klik OK.  / Untuk membatalkan klik CANCEL");
    if (!konfirmasihapus) {
        return;
    }
    let ids = id;
    let tdtombol = document.querySelector(".fn7tombolaksi" + ids);
    tdtombol.innerHTML = `<button onclick="fn7kembalikankonten('${ids}')" class="w3-button w3-blue w3-hover-green">Kembalikan</button><br><br>
    <i class='fa fa-refresh fa-spin w3-xxlarge'></i>`
    let idmapel = jsonmateridihapus[id].idmapel;
    let iddurasi = jsonmateridihapus[id].iddurasi;
    let idaksessiswa = jsonmateridihapus[id].idaksessiswa;
    let jenistagihan = jsonmateridihapus[id].jenistagihan;
    let idtgl = new Date()
    let idtglend = new Date();
    $.getJSON(linkmateri + "&idmateri=" + jsonmateridihapus[id].idmateri + "&action=previewriwayat", function (json) {
        let kontenmateri = json;
        let botakin = window.btoa(unescape(encodeURIComponent(kontenmateri)));
        //let botakin = window.btoa(unescape(kontenmateri));
        let obj = {};
        obj.idmapel = idmapel;
        obj.iddurasi = iddurasi;
        obj.jenistagihan = jenistagihan;
        obj.idaksessiswa = idaksessiswa;
        obj.idtgl = idtgl;
        obj.idtglend = idtglend;
        obj.botakin = botakin;

        window.localStorage.setItem("drafmateri", JSON.stringify(obj));
        tdtombol.innerHTML = `<button onclick="fn7kembalikankonten('${ids}')" class="w3-button w3-blue w3-hover-green">Kembalikan</button><br><br>
        <button onclick="fn7jadikankontenbaru('${ids}')" class="w3-button w3-khaki w3-hover-green">Simpan Draft</button>`;

        let ingindownload = confirm("Draft berhasil disimpan, apakah Anda ingin mendownload materi ini juga?");
        if (ingindownload) {
            downloadfiledraft(json, idmapel);
        } else {
            alert('Draft berhasil disimpan, silakan menuju menu UPLOAD MATERI lalu klik TARUH DRAFT');
        }
    })


}

const downloadfiledraft = (json, namafile) => {
    var blob = new Blob([json], {
        type: "text/plain"
    });
    window.URL = window.URL || window.webkitURL;
    link = window.URL.createObjectURL(blob);
    a = document.createElement("a");
    a.download = namafile + " id=" + new Date().getTime();
    a.href = link;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
}

const berandaguru = () => {
    tampilinsublamangurukelas("beranda")
}
let urlmaterisekolahlain = [];
const pilihrepository = () => {
    //alert("Maaf, fitur belum tersedia dipindah");
    let x = document.getElementById("sumber_repository").selectedIndex;
    let y = document.getElementById("sumber_repository").options;
    let valupilih = y[x].value;
    let idskrip = jlo.id;
    //sdnratujaya 2 
    //"https://script.google.com/macros/s/AKfycbyecPmGp7oCrNKNUoUwgN9agd11HD60DXqEs9PULXqZCqF142q2efq-/exec?idss=1NEJkoXUwilKkq3z9GTuvLvqXGruVi44Eoso_6SDDO1g"

    // sdnratujaya 1
    // "https://script.google.com/macros/s/AKfycbxnQL4WMBUYJx7IrY8CnKycG1OuzOjaL4IY3f8LM7cuYCcW-Kd_sVcRXA/exec?idss=1f4Rg_uax5Tk6X9Xawo972uDYnll0aHoYGM3NVLrW0rU"

    // elamaso trial
    // "https://script.google.com/macros/s/AKfycbzbP_PClJ3EE9ZMpTf8Qi15-WjwLJVO8-PByQz8cA7Gdo5CrhuM0x6d/exec?idss=1luZRWd4yuRt3dlnf-DKjPJ5WfP8oby1Mxv-UILU02Wg"
    //console.log(idskrip);

    // sdn ponter 1
    // "https://script.google.com/macros/s/AKfycbw4xlfeVjGO_OlRbhE3HZ8BrSFZm62Km4lHboJnGYF1j8E90L3sNMiIQzANVwd7UvoY/exec?idss=19Tw8u4AAp0L3M1-OUSnw215FXeEoR7vqwHOPsMLyFXI"

    // sdn ratujaya 4
    // "https://script.google.com/macros/s/AKfycbzL3Zhz5dwlcrRpmRXFEjuPGcv7--46qfxVjnQrzpk_dGutYIpXwto30Kz4hP7JYmhN/exec?idss=1-cbpgFt84gd04neni8T_wy2284Cplyl3nS868SUkGhM"

    //sdn utanjaya
    // "https://script.google.com/macros/s/AKfycbyBvS4ayF8y4FCIibIf__FSMGK2o01zX2zze4H3eDbk3pBjPsr7c5nmEkWJPUsycjkfOA/exec?idss=1RBZyosma-IcsQ4CE8gzMSL4iYZLXhx0g6otCoaer7q8"
    let htmlopt = "";
    if (idskrip == 4) {
        htmlopt += `
        <option id='sekolah1' value="0">SDN Ratujaya 2</option>
        <option id='sekolah2' value="1">ELAMASO TRIAL</option>
        <option id='sekolah3' value="2">SDN Ratujaya 4</option>
        <option id='sekolah4' value="3">SDN Pondok Terong 1</option>
        <option id='sekolah5' value="4">SDN Utan Jaya </option>
        
        `;
        urlmaterisekolahlain = [
            "https://script.google.com/macros/s/AKfycbyecPmGp7oCrNKNUoUwgN9agd11HD60DXqEs9PULXqZCqF142q2efq-/exec?idss=1NEJkoXUwilKkq3z9GTuvLvqXGruVi44Eoso_6SDDO1g",
            "https://script.google.com/macros/s/AKfycbzbP_PClJ3EE9ZMpTf8Qi15-WjwLJVO8-PByQz8cA7Gdo5CrhuM0x6d/exec?idss=1luZRWd4yuRt3dlnf-DKjPJ5WfP8oby1Mxv-UILU02Wg",
            "https://script.google.com/macros/s/AKfycbzL3Zhz5dwlcrRpmRXFEjuPGcv7--46qfxVjnQrzpk_dGutYIpXwto30Kz4hP7JYmhN/exec?idss=1-cbpgFt84gd04neni8T_wy2284Cplyl3nS868SUkGhM",
            "https://script.google.com/macros/s/AKfycbw4xlfeVjGO_OlRbhE3HZ8BrSFZm62Km4lHboJnGYF1j8E90L3sNMiIQzANVwd7UvoY/exec?idss=19Tw8u4AAp0L3M1-OUSnw215FXeEoR7vqwHOPsMLyFXI",
            "https://script.google.com/macros/s/AKfycbyBvS4ayF8y4FCIibIf__FSMGK2o01zX2zze4H3eDbk3pBjPsr7c5nmEkWJPUsycjkfOA/exec?idss=1RBZyosma-IcsQ4CE8gzMSL4iYZLXhx0g6otCoaer7q8"

        ]
    } else if (idskrip == 8) {
        htmlopt += `<option id='sekolah1' value="0" >SDN Ratujaya 1</option>
        <option id='sekolah2' value="1">ELAMASO TRIAL</option>
        <option id='sekolah3' value="2">SDN Ratujaya 4</option>
        <option id='sekolah4' value="3">SDN Pondok Terong 1</option>
        <option id='sekolah5' value="4">SDN Utan Jaya</option>
        `
        urlmaterisekolahlain = [
            "https://script.google.com/macros/s/AKfycbxnQL4WMBUYJx7IrY8CnKycG1OuzOjaL4IY3f8LM7cuYCcW-Kd_sVcRXA/exec?idss=1f4Rg_uax5Tk6X9Xawo972uDYnll0aHoYGM3NVLrW0rU",
            "https://script.google.com/macros/s/AKfycbzbP_PClJ3EE9ZMpTf8Qi15-WjwLJVO8-PByQz8cA7Gdo5CrhuM0x6d/exec?idss=1luZRWd4yuRt3dlnf-DKjPJ5WfP8oby1Mxv-UILU02Wg",
            "https://script.google.com/macros/s/AKfycbzL3Zhz5dwlcrRpmRXFEjuPGcv7--46qfxVjnQrzpk_dGutYIpXwto30Kz4hP7JYmhN/exec?idss=1-cbpgFt84gd04neni8T_wy2284Cplyl3nS868SUkGhM",
            "https://script.google.com/macros/s/AKfycbw4xlfeVjGO_OlRbhE3HZ8BrSFZm62Km4lHboJnGYF1j8E90L3sNMiIQzANVwd7UvoY/exec?idss=19Tw8u4AAp0L3M1-OUSnw215FXeEoR7vqwHOPsMLyFXI",
            "https://script.google.com/macros/s/AKfycbyBvS4ayF8y4FCIibIf__FSMGK2o01zX2zze4H3eDbk3pBjPsr7c5nmEkWJPUsycjkfOA/exec?idss=1RBZyosma-IcsQ4CE8gzMSL4iYZLXhx0g6otCoaer7q8"
        ]
    } else if (idskrip == 9) {
        htmlopt += `<option id='sekolah1' value="0" >SDN Ratujaya 1</option>
        <option id='sekolah2' value="1">SDN Ratujaya 2</option>
        <option id='sekolah3' value="2">ELAMASO TRIAL</option>
        <option id='sekolah4' value="3">SDN Pondok Terong 1</option>
        <option id='sekolah5' value="4">SDN Utan Jaya</option>
        `;
        urlmaterisekolahlain = [
            "https://script.google.com/macros/s/AKfycbxnQL4WMBUYJx7IrY8CnKycG1OuzOjaL4IY3f8LM7cuYCcW-Kd_sVcRXA/exec?idss=1f4Rg_uax5Tk6X9Xawo972uDYnll0aHoYGM3NVLrW0rU",
            "https://script.google.com/macros/s/AKfycbyecPmGp7oCrNKNUoUwgN9agd11HD60DXqEs9PULXqZCqF142q2efq-/exec?idss=1NEJkoXUwilKkq3z9GTuvLvqXGruVi44Eoso_6SDDO1g",
            "https://script.google.com/macros/s/AKfycbzbP_PClJ3EE9ZMpTf8Qi15-WjwLJVO8-PByQz8cA7Gdo5CrhuM0x6d/exec?idss=1luZRWd4yuRt3dlnf-DKjPJ5WfP8oby1Mxv-UILU02Wg",
            "https://script.google.com/macros/s/AKfycbw4xlfeVjGO_OlRbhE3HZ8BrSFZm62Km4lHboJnGYF1j8E90L3sNMiIQzANVwd7UvoY/exec?idss=19Tw8u4AAp0L3M1-OUSnw215FXeEoR7vqwHOPsMLyFXI",
            "https://script.google.com/macros/s/AKfycbyBvS4ayF8y4FCIibIf__FSMGK2o01zX2zze4H3eDbk3pBjPsr7c5nmEkWJPUsycjkfOA/exec?idss=1RBZyosma-IcsQ4CE8gzMSL4iYZLXhx0g6otCoaer7q8"
        ]
    } else if (idskrip == 10) {
        htmlopt += `<option id='sekolah1' value="0" >SDN Ratujaya 1</option>
        <option id='sekolah2' value="1">SDN Ratujaya 2</option>
        <option id='sekolah3' value="2">ELAMASO TRIAL</option>
        <option id='sekolah4' value="3">SDN Ratujaya 4</option>
        <option id='sekolah5' value="4">SDN Utan Jaya</option>
        `;
        urlmaterisekolahlain = [
            "https://script.google.com/macros/s/AKfycbxnQL4WMBUYJx7IrY8CnKycG1OuzOjaL4IY3f8LM7cuYCcW-Kd_sVcRXA/exec?idss=1f4Rg_uax5Tk6X9Xawo972uDYnll0aHoYGM3NVLrW0rU",
            "https://script.google.com/macros/s/AKfycbyecPmGp7oCrNKNUoUwgN9agd11HD60DXqEs9PULXqZCqF142q2efq-/exec?idss=1NEJkoXUwilKkq3z9GTuvLvqXGruVi44Eoso_6SDDO1g",
            "https://script.google.com/macros/s/AKfycbzbP_PClJ3EE9ZMpTf8Qi15-WjwLJVO8-PByQz8cA7Gdo5CrhuM0x6d/exec?idss=1luZRWd4yuRt3dlnf-DKjPJ5WfP8oby1Mxv-UILU02Wg",
            "https://script.google.com/macros/s/AKfycbzL3Zhz5dwlcrRpmRXFEjuPGcv7--46qfxVjnQrzpk_dGutYIpXwto30Kz4hP7JYmhN/exec?idss=1-cbpgFt84gd04neni8T_wy2284Cplyl3nS868SUkGhM",
            "https://script.google.com/macros/s/AKfycbyBvS4ayF8y4FCIibIf__FSMGK2o01zX2zze4H3eDbk3pBjPsr7c5nmEkWJPUsycjkfOA/exec?idss=1RBZyosma-IcsQ4CE8gzMSL4iYZLXhx0g6otCoaer7q8"
        ]

    } else {
        htmlopt += `<option id='sekolah1' value="0" >SDN Ratujaya 1</option>
                       <option id='sekolah2' value="1">SDN Ratujaya 2</option>
                       <option id='sekolah3' value="2">SDN Ratujaya 4</option>
                       <option id='sekolah4' value="3">SDN Pondok Terong 1</option>
                       `
        urlmaterisekolahlain = [
            "https://script.google.com/macros/s/AKfycbxnQL4WMBUYJx7IrY8CnKycG1OuzOjaL4IY3f8LM7cuYCcW-Kd_sVcRXA/exec?idss=1f4Rg_uax5Tk6X9Xawo972uDYnll0aHoYGM3NVLrW0rU",
            "https://script.google.com/macros/s/AKfycbyecPmGp7oCrNKNUoUwgN9agd11HD60DXqEs9PULXqZCqF142q2efq-/exec?idss=1NEJkoXUwilKkq3z9GTuvLvqXGruVi44Eoso_6SDDO1g",
            "https://script.google.com/macros/s/AKfycbzL3Zhz5dwlcrRpmRXFEjuPGcv7--46qfxVjnQrzpk_dGutYIpXwto30Kz4hP7JYmhN/exec?idss=1-cbpgFt84gd04neni8T_wy2284Cplyl3nS868SUkGhM",
            "https://script.google.com/macros/s/AKfycbw4xlfeVjGO_OlRbhE3HZ8BrSFZm62Km4lHboJnGYF1j8E90L3sNMiIQzANVwd7UvoY/exec?idss=19Tw8u4AAp0L3M1-OUSnw215FXeEoR7vqwHOPsMLyFXI"
        ]
    }


    if (valupilih == 0) {
        alert('Silakan pilih opsi repository');
        tabel_repository_sendiri.innerHTML = "";
    } else if (valupilih == 2) {
        tabel_repository_sendiri.innerHTML = `<h4>Cara membuat Konten Materi</h4><div class='containerbaru w3-center'><iframe class='responsive-iframebaru' src='https://www.youtube.com/embed/Kr--xBecwOI' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div>`;

    } else if (valupilih == 1) {
        tabel_repository_sendiri.innerHTML = `<hr/><select onchange='fn7selectreposistory()' id='pilihanrepositorysekolahlain' class='w3-select w3-yellow w3-hover-khaki' >
        <option id='sekolah0' value="" selected>Pilih Sekolah</option>
        ${htmlopt}
        </select>
        <div id="tempatrepositorysekolahlain"></div>
        `
    } else if (valupilih == 3) {
        //<a href="https://drive.google.com/uc?id=11ms2DpGpr71ja5ScL7eVbPnF4dUXANY0&amp;export=download" target="_blank"> DOWNLOAD FILE DI SINI </a>
        tabel_repository_sendiri.innerHTML = `
        <hr>Tabel berikut ini adalah file unggah untuk mengisi data KKM dan KD. Silakan unduh kemudian upload pada menu KURIKULUM tab UPLOAD KURIKULUM di tombol UNGGAH FILE FORMAT
        <table class='versi-table'>
            <tr>
                <th>Jenjang</th>
                <th>Aksi</th>
            </tr>
            <tr>
                <td> Kelas 1 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1OiOKNuU_KOLS5Osg8j9sPnaq7SsE7DI8&export=download' target='_blank'> UNDUH Kelas 1</a></button></td>
            </tr>
            <tr>
                <td> Kelas 2 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1LuSF4YRgNP1AXMxCfWUdzqw2dyk0L655&export=download' target='_blank'> UNDUH Kelas 2</a></button></td>
            </tr>
            <tr>
                <td> Kelas 3 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1QTa6pklrukQzuhurJU5AQGWDqautNQzO&export=download' target='_blank'> UNDUH Kelas 3</a></button></td>
            </tr>
             <tr>
                <td> Kelas 4 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=18-vYgLHb6CgSzmGsB2oloTbd3mH6-TvT&export=download' target='_blank'> UNDUH Kelas 4</a></button></td>
            </tr>
            <tr>
                <td> Kelas 5 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1mW1ag1e1V_DmhtO15xcSD7jH3o2N92SX&export=download' target='_blank'> UNDUH Kelas 5</a></button></td>
            </tr>
            <tr>
                <td> Kelas 6 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1xjM7DsTJCgN6DAqfblk0mi0sjcgvkPji&export=download' target='_blank'> UNDUH Kelas 6</a></button></td>
            </tr>
        </table>
        Keterangan:<br>
        <ul>
            <li>Silakan pilih salah satu file KKM dan KD di atas, lalu Unduh.  Kemudian file diunggah.
            </li><li>Sangat tidak disarankan Anda mengedit langsung dari filenya. Sebab akan mempengaruhi proses rekap nilai Raport
            </li><li>Anda boleh mengeditnya (jika berbeda dengan repository dari Tim Elamaso di Menu UPLOAD KURIKULUM. Di sana tabel KKM dan KD bisa diedit secara manual
            </li><li>Data Indikator pada file-file di tabel di atas adalah data indikator yang telah disusun oleh Tim ELamaso sesuai dengan PERMENDIKBUD No. 37 Tahun 2018
            </li>
        </ul>
        `;
    }

}

const pilihrepositorymapel = () => {
    //alert("Maaf, fitur belum tersedia dipindah");
    let x = document.getElementById("sumber_repository").selectedIndex;
    let y = document.getElementById("sumber_repository").options;
    let valupilih = y[x].value;
    let idskrip = jlo.id;
    //sdnratujaya 2 
    //"https://script.google.com/macros/s/AKfycbyecPmGp7oCrNKNUoUwgN9agd11HD60DXqEs9PULXqZCqF142q2efq-/exec?idss=1NEJkoXUwilKkq3z9GTuvLvqXGruVi44Eoso_6SDDO1g"

    // sdnratujaya 1
    // "https://script.google.com/macros/s/AKfycbxnQL4WMBUYJx7IrY8CnKycG1OuzOjaL4IY3f8LM7cuYCcW-Kd_sVcRXA/exec?idss=1f4Rg_uax5Tk6X9Xawo972uDYnll0aHoYGM3NVLrW0rU"

    // elamaso trial
    // "https://script.google.com/macros/s/AKfycbzbP_PClJ3EE9ZMpTf8Qi15-WjwLJVO8-PByQz8cA7Gdo5CrhuM0x6d/exec?idss=1luZRWd4yuRt3dlnf-DKjPJ5WfP8oby1Mxv-UILU02Wg"
    //console.log(idskrip);

    // sdn ponter 1
    // "https://script.google.com/macros/s/AKfycbw4xlfeVjGO_OlRbhE3HZ8BrSFZm62Km4lHboJnGYF1j8E90L3sNMiIQzANVwd7UvoY/exec?idss=19Tw8u4AAp0L3M1-OUSnw215FXeEoR7vqwHOPsMLyFXI"

    // sdn ratujaya 4
    // "https://script.google.com/macros/s/AKfycbzL3Zhz5dwlcrRpmRXFEjuPGcv7--46qfxVjnQrzpk_dGutYIpXwto30Kz4hP7JYmhN/exec?idss=1-cbpgFt84gd04neni8T_wy2284Cplyl3nS868SUkGhM"

    //sdn utanjaya
    // "https://script.google.com/macros/s/AKfycbyBvS4ayF8y4FCIibIf__FSMGK2o01zX2zze4H3eDbk3pBjPsr7c5nmEkWJPUsycjkfOA/exec?idss=1RBZyosma-IcsQ4CE8gzMSL4iYZLXhx0g6otCoaer7q8"
    let htmlopt = "";
    if (idskrip == 4) {
        htmlopt += `
        <option id='sekolah1' value="0">SDN Ratujaya 2</option>
        <option id='sekolah2' value="1">ELAMASO TRIAL</option>
        <option id='sekolah3' value="2">SDN Ratujaya 4</option>
        <option id='sekolah4' value="3">SDN Pondok Terong 1</option>
        <option id='sekolah5' value="4">SDN Utan Jaya </option>
        
        `;
        urlmaterisekolahlain = [
            "https://script.google.com/macros/s/AKfycbyecPmGp7oCrNKNUoUwgN9agd11HD60DXqEs9PULXqZCqF142q2efq-/exec?idss=1NEJkoXUwilKkq3z9GTuvLvqXGruVi44Eoso_6SDDO1g",
            "https://script.google.com/macros/s/AKfycbzbP_PClJ3EE9ZMpTf8Qi15-WjwLJVO8-PByQz8cA7Gdo5CrhuM0x6d/exec?idss=1luZRWd4yuRt3dlnf-DKjPJ5WfP8oby1Mxv-UILU02Wg",
            "https://script.google.com/macros/s/AKfycbzL3Zhz5dwlcrRpmRXFEjuPGcv7--46qfxVjnQrzpk_dGutYIpXwto30Kz4hP7JYmhN/exec?idss=1-cbpgFt84gd04neni8T_wy2284Cplyl3nS868SUkGhM",
            "https://script.google.com/macros/s/AKfycbw4xlfeVjGO_OlRbhE3HZ8BrSFZm62Km4lHboJnGYF1j8E90L3sNMiIQzANVwd7UvoY/exec?idss=19Tw8u4AAp0L3M1-OUSnw215FXeEoR7vqwHOPsMLyFXI",
            "https://script.google.com/macros/s/AKfycbyBvS4ayF8y4FCIibIf__FSMGK2o01zX2zze4H3eDbk3pBjPsr7c5nmEkWJPUsycjkfOA/exec?idss=1RBZyosma-IcsQ4CE8gzMSL4iYZLXhx0g6otCoaer7q8"

        ]
    } else if (idskrip == 8) {
        htmlopt += `<option id='sekolah1' value="0" >SDN Ratujaya 1</option>
        <option id='sekolah2' value="1">ELAMASO TRIAL</option>
        <option id='sekolah3' value="2">SDN Ratujaya 4</option>
        <option id='sekolah4' value="3">SDN Pondok Terong 1</option>
        <option id='sekolah5' value="4">SDN Utan Jaya</option>
        `
        urlmaterisekolahlain = [
            "https://script.google.com/macros/s/AKfycbxnQL4WMBUYJx7IrY8CnKycG1OuzOjaL4IY3f8LM7cuYCcW-Kd_sVcRXA/exec?idss=1f4Rg_uax5Tk6X9Xawo972uDYnll0aHoYGM3NVLrW0rU",
            "https://script.google.com/macros/s/AKfycbzbP_PClJ3EE9ZMpTf8Qi15-WjwLJVO8-PByQz8cA7Gdo5CrhuM0x6d/exec?idss=1luZRWd4yuRt3dlnf-DKjPJ5WfP8oby1Mxv-UILU02Wg",
            "https://script.google.com/macros/s/AKfycbzL3Zhz5dwlcrRpmRXFEjuPGcv7--46qfxVjnQrzpk_dGutYIpXwto30Kz4hP7JYmhN/exec?idss=1-cbpgFt84gd04neni8T_wy2284Cplyl3nS868SUkGhM",
            "https://script.google.com/macros/s/AKfycbw4xlfeVjGO_OlRbhE3HZ8BrSFZm62Km4lHboJnGYF1j8E90L3sNMiIQzANVwd7UvoY/exec?idss=19Tw8u4AAp0L3M1-OUSnw215FXeEoR7vqwHOPsMLyFXI",
            "https://script.google.com/macros/s/AKfycbyBvS4ayF8y4FCIibIf__FSMGK2o01zX2zze4H3eDbk3pBjPsr7c5nmEkWJPUsycjkfOA/exec?idss=1RBZyosma-IcsQ4CE8gzMSL4iYZLXhx0g6otCoaer7q8"
        ]
    } else if (idskrip == 9) {
        htmlopt += `<option id='sekolah1' value="0" >SDN Ratujaya 1</option>
        <option id='sekolah2' value="1">SDN Ratujaya 2</option>
        <option id='sekolah3' value="2">ELAMASO TRIAL</option>
        <option id='sekolah4' value="3">SDN Pondok Terong 1</option>
        <option id='sekolah5' value="4">SDN Utan Jaya</option>
        `;
        urlmaterisekolahlain = [
            "https://script.google.com/macros/s/AKfycbxnQL4WMBUYJx7IrY8CnKycG1OuzOjaL4IY3f8LM7cuYCcW-Kd_sVcRXA/exec?idss=1f4Rg_uax5Tk6X9Xawo972uDYnll0aHoYGM3NVLrW0rU",
            "https://script.google.com/macros/s/AKfycbyecPmGp7oCrNKNUoUwgN9agd11HD60DXqEs9PULXqZCqF142q2efq-/exec?idss=1NEJkoXUwilKkq3z9GTuvLvqXGruVi44Eoso_6SDDO1g",
            "https://script.google.com/macros/s/AKfycbzbP_PClJ3EE9ZMpTf8Qi15-WjwLJVO8-PByQz8cA7Gdo5CrhuM0x6d/exec?idss=1luZRWd4yuRt3dlnf-DKjPJ5WfP8oby1Mxv-UILU02Wg",
            "https://script.google.com/macros/s/AKfycbw4xlfeVjGO_OlRbhE3HZ8BrSFZm62Km4lHboJnGYF1j8E90L3sNMiIQzANVwd7UvoY/exec?idss=19Tw8u4AAp0L3M1-OUSnw215FXeEoR7vqwHOPsMLyFXI",
            "https://script.google.com/macros/s/AKfycbyBvS4ayF8y4FCIibIf__FSMGK2o01zX2zze4H3eDbk3pBjPsr7c5nmEkWJPUsycjkfOA/exec?idss=1RBZyosma-IcsQ4CE8gzMSL4iYZLXhx0g6otCoaer7q8"
        ]
    } else if (idskrip == 10) {
        htmlopt += `<option id='sekolah1' value="0" >SDN Ratujaya 1</option>
        <option id='sekolah2' value="1">SDN Ratujaya 2</option>
        <option id='sekolah3' value="2">ELAMASO TRIAL</option>
        <option id='sekolah4' value="3">SDN Ratujaya 4</option>
        <option id='sekolah5' value="4">SDN Utan Jaya</option>
        `;
        urlmaterisekolahlain = [
            "https://script.google.com/macros/s/AKfycbxnQL4WMBUYJx7IrY8CnKycG1OuzOjaL4IY3f8LM7cuYCcW-Kd_sVcRXA/exec?idss=1f4Rg_uax5Tk6X9Xawo972uDYnll0aHoYGM3NVLrW0rU",
            "https://script.google.com/macros/s/AKfycbyecPmGp7oCrNKNUoUwgN9agd11HD60DXqEs9PULXqZCqF142q2efq-/exec?idss=1NEJkoXUwilKkq3z9GTuvLvqXGruVi44Eoso_6SDDO1g",
            "https://script.google.com/macros/s/AKfycbzbP_PClJ3EE9ZMpTf8Qi15-WjwLJVO8-PByQz8cA7Gdo5CrhuM0x6d/exec?idss=1luZRWd4yuRt3dlnf-DKjPJ5WfP8oby1Mxv-UILU02Wg",
            "https://script.google.com/macros/s/AKfycbzL3Zhz5dwlcrRpmRXFEjuPGcv7--46qfxVjnQrzpk_dGutYIpXwto30Kz4hP7JYmhN/exec?idss=1-cbpgFt84gd04neni8T_wy2284Cplyl3nS868SUkGhM",
            "https://script.google.com/macros/s/AKfycbyBvS4ayF8y4FCIibIf__FSMGK2o01zX2zze4H3eDbk3pBjPsr7c5nmEkWJPUsycjkfOA/exec?idss=1RBZyosma-IcsQ4CE8gzMSL4iYZLXhx0g6otCoaer7q8"
        ]

    } else {
        htmlopt += `<option id='sekolah1' value="0" >SDN Ratujaya 1</option>
                       <option id='sekolah2' value="1">SDN Ratujaya 2</option>
                       <option id='sekolah3' value="2">SDN Ratujaya 4</option>
                       <option id='sekolah4' value="3">SDN Pondok Terong 1</option>
                       `
        urlmaterisekolahlain = [
            "https://script.google.com/macros/s/AKfycbxnQL4WMBUYJx7IrY8CnKycG1OuzOjaL4IY3f8LM7cuYCcW-Kd_sVcRXA/exec?idss=1f4Rg_uax5Tk6X9Xawo972uDYnll0aHoYGM3NVLrW0rU",
            "https://script.google.com/macros/s/AKfycbyecPmGp7oCrNKNUoUwgN9agd11HD60DXqEs9PULXqZCqF142q2efq-/exec?idss=1NEJkoXUwilKkq3z9GTuvLvqXGruVi44Eoso_6SDDO1g",
            "https://script.google.com/macros/s/AKfycbzL3Zhz5dwlcrRpmRXFEjuPGcv7--46qfxVjnQrzpk_dGutYIpXwto30Kz4hP7JYmhN/exec?idss=1-cbpgFt84gd04neni8T_wy2284Cplyl3nS868SUkGhM",
            "https://script.google.com/macros/s/AKfycbw4xlfeVjGO_OlRbhE3HZ8BrSFZm62Km4lHboJnGYF1j8E90L3sNMiIQzANVwd7UvoY/exec?idss=19Tw8u4AAp0L3M1-OUSnw215FXeEoR7vqwHOPsMLyFXI"
        ]
    }

    if (valupilih == 0) {
        alert('Silakan pilih opsi repository');
        tabel_repository_sendiri.innerHTML = "";
    } else if (valupilih == 2) {
        tabel_repository_sendiri.innerHTML = `<h4>Cara membuat Konten Materi</h4><div class='containerbaru w3-center'><iframe class='responsive-iframebaru' src='https://www.youtube.com/embed/Kr--xBecwOI' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div>`;

    } else if (valupilih == 1) {
        tabel_repository_sendiri.innerHTML = `<hr/><select onchange='fn7selectreposistorymapel()' id='pilihanrepositorysekolahlain' class='w3-select w3-blue w3-hover-khaki' >
        <option id='sekolah0' value="" selected>Pilih Sekolah</option>
        ${htmlopt}
        </select>
        <div id="tempatrepositorysekolahlain"></div>
        `;
    } else if (valupilih == 3) {
        //<a href="https://drive.google.com/uc?id=11ms2DpGpr71ja5ScL7eVbPnF4dUXANY0&amp;export=download" target="_blank"> DOWNLOAD FILE DI SINI </a>
        tabel_repository_sendiri.innerHTML = `
        <hr>Tabel berikut ini adalah file unggah untuk mengisi data KKM dan KD. Silakan unduh kemudian upload pada menu KURIKULUM tab UPLOAD KURIKULUM di tombol UNGGAH FILE FORMAT
        <table class='versi-table'>
            <tr>
                <th>Jenjang</th>
                <th>Aksi</th>
            </tr>
            <tr>
                <td> Kelas 1 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1OiOKNuU_KOLS5Osg8j9sPnaq7SsE7DI8&export=download' target='_blank'> UNDUH Kelas 1</a></button></td>
            </tr>
            <tr>
                <td> Kelas 2 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1LuSF4YRgNP1AXMxCfWUdzqw2dyk0L655&export=download' target='_blank'> UNDUH Kelas 2</a></button></td>
            </tr>
            <tr>
                <td> Kelas 3 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1QTa6pklrukQzuhurJU5AQGWDqautNQzO&export=download' target='_blank'> UNDUH Kelas 3</a></button></td>
            </tr>
             <tr>
                <td> Kelas 4 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=18-vYgLHb6CgSzmGsB2oloTbd3mH6-TvT&export=download' target='_blank'> UNDUH Kelas 4</a></button></td>
            </tr>
            <tr>
                <td> Kelas 5 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1mW1ag1e1V_DmhtO15xcSD7jH3o2N92SX&export=download' target='_blank'> UNDUH Kelas 5</a></button></td>
            </tr>
            <tr>
                <td> Kelas 6 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1xjM7DsTJCgN6DAqfblk0mi0sjcgvkPji&export=download' target='_blank'> UNDUH Kelas 6</a></button></td>
            </tr>
        </table>
        Keterangan:<br>
        <ul>
            <li>Silakan pilih salah satu file KKM dan KD di atas, lalu Unduh.  Kemudian file diunggah.
            </li><li>Sangat tidak disarankan Anda mengedit langsung dari filenya. Sebab akan mempengaruhi proses rekap nilai Raport
            </li><li>Anda boleh mengeditnya (jika berbeda dengan repository dari Tim Elamaso di Menu UPLOAD KURIKULUM. Di sana tabel KKM dan KD bisa diedit secara manual
            </li><li>Data Indikator pada file-file di tabel di atas adalah data indikator yang telah disusun oleh Tim ELamaso sesuai dengan PERMENDIKBUD No. 37 Tahun 2018
            </li>
        </ul>
        `;
    }

}

let jsonmaterisekolahlain = "";
const fn7selectreposistory = () => {
    let x = document.getElementById("pilihanrepositorysekolahlain").selectedIndex;
    let y = document.getElementById("pilihanrepositorysekolahlain").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);  
    let xx = y[x].value;
    if (y[x].index !== 0) {
        tempatrepositorysekolahlain.innerHTML = "<i class='fa fa-refresh fa-spin w3-xxlarge'></i>";

        fetch(urlmaterisekolahlain[xx] + "&action=kronolog&idtoken=" + idJenjang)
            .then(m => m.json())
            .then(k => {
                // console.log(k);
                jsonmaterisekolahlain = k.result; //.filter(k => k.idpendaftar !== "tolak");

                let temp = `<div style="overflow-x:auto"><table class='versi-table w3-tiny'><thead>
            <tr>
            <th> Judul Materi</th>
                <th> Mapel dan KD</th>
                <th> Jenis KBM </th>
                <th> Waktu Pelaksanaan</th>
                <th> Dibuat oleh</th>
                <th> Preview</th>
                <th> Aksi </th>
            </tr>
            </thead>
            <tbody>
        `
                let kk = k.result; //.filter(k => k.idpendaftar !== "tolak");

                let objekgagal = {
                    'MAPELTIDAKDIISI_3.1': ['1', '2']
                };
                if (kk.length > 0) {
                    for (a = 0; a < kk.length; a++) {
                        // console.log(a);
                        // console.log("________");
                        // console.log(kk[a].idbaris);
                        // console.log("________");
                        // console.log(kk[a].kuncikd);
                        let ab;
                        if (kk[a].kuncikd == "undefined") {
                            ab = objekgagal;

                        } else {
                            ab = JSON.parse(kk[a].kuncikd)
                        };

                        temp += `
                        <tr>
                        <td>${kk[a].idmapel.toUpperCase()}</td>
                        <td>`
                        let obab = Object.keys(ab);

                        let untukKD = `<table class='versi-table w3-tiny'>
                        <tr>
                            <th> Mapel</th>
                            <th> KD </th>
                            <th> No. Soal </th>
                        </tr>
                        `
                        for (b = 0; b < obab.length; b++) {
                            let key = obab[b];

                            let arrsplit = ab[key].join("<br/>");

                            untukKD += `
                                <tr>
                                    <td>${obab[b].split("_")[0]}</td>
                                    <td>${obab[b].split("_")[1]}</td>
                                    <td>${(ab[obab[b]] == "undefined") ? "Tidak terdeteksi" : arrsplit}</td>
                                </tr>
                            `
                        }
                        untukKD += `</table>`;
                        temp += untukKD;
                        temp += `
                        </td>
                        <td> ${(kk[a].idaksessiswa == 'sekali') ? 'ULANGAN<br>Menerima Tugas Siswa' : 'LATIHAN<br>Tidak Menerima Tugas'}</td>
                        <td> ${tanggalfulllengkap(kk[a].idtgl)} <br>s/d<br> ${tanggalfulllengkap(kk[a].idtglend)}</td>
                        
                        <td>${kk[a].dibuatoleh}</td>
                        <td><button onclick="fn7previewsekolahlain(${a},${xx})" class="w3-button w3-green w3-hover-red">PREVIEW</button></td>
                        <td class="fn7tombolaksisekolahlain${a}"><button onclick="fn7jadikankontenbarudarisekolahlain(${a},${xx})" class="w3-button w3-khaki w3-hover-green">Jadikan Materi Saya</button></td>
                        
                    </tr>
            `
                    }
                } else {
                    temp += `  <tr>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
            </tr>
            `
                }
                temp += `</tbody></table></br>`;
                tempatrepositorysekolahlain.innerHTML = "Berikut ini Konten Materi di Jenjang Kelas " + idJenjang + " yang telah dipublikasikan di " + y[x].text;
                tempatrepositorysekolahlain.innerHTML += temp;

            })

    } else {
        tempatrepositorysekolahlain.innerHTML = "Silakan pilih sekolah untuk melihat Konten Materi yang telah dipublikasikan di Sekolah yang terdaftar di Elamaso";

    }
}
const fn7previewsekolahlain = (indektabel, indeksekolah) => {
    //alert("Indek materi " + indektabel + "\n\n Indek sekolah: " + indeksekolah);
    pranalamateri.style.display = 'block';

    document.querySelector(".classReviewMateri").innerHTML = "";
    let tes = document.querySelector(".classReviewMateri");
    //let keyy = "kbmtoday" + tglStringZero()

    //let datamateri = JSON.parse(localStorage.getItem(keyy))
    // let datamateri = jsonmateridihapus;
    let par = indektabel;
    let datamateri = jsonmaterisekolahlain;


    //bikin judul h4
    var judul = document.createElement("h4");
    judul.setAttribute("class", "w3-center");
    judul.innerHTML = "Identitas e-Lamaso";
    tes.innerHTML = "";
    tes.appendChild(judul);

    //-- Bikin Tabel identitas:
    var tabelidentitas = document.createElement("table");
    tabelidentitas.setAttribute("class", "versi-table tabel_idreview");
    tabelidentitas.setAttribute("style", "margin:auto");
    var tr = tabelidentitas.insertRow(-1);

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Sekolah";
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idSekolah;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Dibuat/Diedit Oleh";
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].dibuatoleh;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kelas";
    var td = tr.insertCell(-1);
    td.innerHTML = idNamaKelas;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Identitas Pembelajaran";
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idmapel;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Frekuensi Akses";
    var td = tr.insertCell(-1);
    var keteranganakses;
    if (datamateri[par].idaksessiswa == "sekali") {
        keteranganakses = "TEST <br>(Menerima Jawaban/Tugas Siswa)";
    } else {
        keteranganakses = "LATIHAN <br>(Tidak menerima jawaban/tugas)";
    }
    td.innerHTML = keteranganakses;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Tanggal Publikasi";
    var td = tr.insertCell(-1);
    td.innerHTML = tanggalfulllengkap(datamateri[par].idtgl);

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kompetensi KD<br><sub class='w3-text-red'>Tidak akan muncul di siswa</sub>";
    var td = tr.insertCell(-1);
    td.setAttribute("id", "forKD")
    td.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kunci Jawaban<br><sub class='w3-text-red'>Tidak akan muncul di siswa</sub>";
    var td = tr.insertCell(-1);
    td.setAttribute("id", "forkuncijawaban");
    td.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Baris Database Materi";
    var td = tr.insertCell(-1);
    td.innerHTML = `${datamateri[par].idbaris}`;



    tes.appendChild(tabelidentitas);
    var brek = document.createElement("div");

    brek.setAttribute("style", "break-after:page");
    brek.innerHTML = "<h4 class='w3-center'>PREVIEW MATERI DI ELAMASO SISWA</h4>"
    tes.appendChild(brek);

    //var idm = encodeURIComponent(datamateri[par].idmateri);
    var idm = datamateri[par].idmateri;
    //
    $('.classReviewMateri').nextAll('button').remove();
    $.getJSON(urlmaterisekolahlain[indeksekolah] + "&idmateri=" + idm + "&action=previewriwayat", function (json) {

        tes.innerHTML += brkline(json).teks;
        let inhtml = "<table class='versi-table w3-tiny'><tr><td>Mapel</td><td>KD</td><td>No Soal</td></tr>";
        let xx = brkline(json).kd.split("<br>");
        for (a = 0; a < xx.length; a++) {
            inhtml += `<tr><td> ${xx[a].split("_")[0]}</td><td> ${xx[a].split("_")[1].split(":")[0]}</td><td>${xx[a].split("_")[1].split(":")[1]}</td></tr>`
        }
        inhtml += `</table>`;

        forKD.innerHTML = inhtml;

        let tekskunci = brkline(json).kunci;

        if (tekskunci == "" || tekskunci == "undefined" || tekskunci == null) {
            forkuncijawaban.innerHTML = "Tidak Ada PG";
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
                tempattombol.innerHTML += "<br/><sub>atau</sub></br/> ";
                var tomboldua = document.createElement("button");
                tomboldua.setAttribute("onclick", "tomboluploadjawaban('" + inidEl + "')");
                var tekstomboldua = document.createTextNode("Upload Jawaban No " + inidEl);
                tomboldua.appendChild(tekstomboldua);
                tempattombol.appendChild(tomboldua);
                tempattombol.innerHTML += "<br/><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>";

            }
        }

    })
}
const fn7jadikankontenbarudarisekolahlain = (id, indeksekolah) => {
    //alert("Indek materi " + id + "\n\n Indek sekolah: " + indeksekolah);
    let konfirmasihapus = confirm("Anda yakin ingin menyimpan Konten Materi ini menjadi draft Anda? \n \n Simpanan Draft sebelumnya akan hilang dan digantikan dengan draft ini. \n\n Jika tetap ingin menyimpan draf, klik OK.  / Untuk membatalkan klik CANCEL");
    if (!konfirmasihapus) {
        return;
    }
    let ids = id;
    let tdtombol = document.querySelector(".fn7tombolaksisekolahlain" + ids);
    tdtombol.innerHTML = `<i class='fa fa-refresh fa-spin w3-xxlarge'></i>`
    let idmapel = jsonmaterisekolahlain[id].idmapel;
    let iddurasi = jsonmaterisekolahlain[id].iddurasi;
    let idaksessiswa = jsonmaterisekolahlain[id].idaksessiswa;
    let jenistagihan = jsonmaterisekolahlain[id].jenistagihan;
    let idtgl = new Date()
    let idtglend = new Date();
    $.getJSON(urlmaterisekolahlain[indeksekolah] + "&idmateri=" + jsonmaterisekolahlain[id].idmateri + "&action=previewriwayat", function (json) {
        let kontenmateri = json;
        let botakin = window.btoa(unescape(encodeURIComponent(kontenmateri)));
        //let botakin = window.btoa(unescape(kontenmateri));
        let obj = {};
        obj.idmapel = idmapel;
        obj.iddurasi = iddurasi;
        obj.jenistagihan = jenistagihan;
        obj.idaksessiswa = idaksessiswa;
        obj.idtgl = idtgl;
        obj.idtglend = idtglend;
        obj.botakin = botakin;

        window.localStorage.setItem("drafmateri", JSON.stringify(obj));
        tdtombol.innerHTML = `<button onclick="fn7jadikankontenbarudarisekolahlain(${id},${indeksekolah})" class="w3-button w3-khaki w3-hover-green">Jadikan Materi Saya</button>`;

        let ingindownload = confirm("Draft berhasil disimpan, apakah Anda ingin mendownload materi ini juga?");
        if (ingindownload) {
            downloadfiledraft(json, idmapel);
        } else {
            alert('Draft berhasil disimpan, silakan menuju menu UPLOAD MATERI lalu klik TARUH DRAFT');
        }
    })


}


let btnfn7cekpreview = document.querySelector(".fn7cekpreview");
btnfn7cekpreview.addEventListener("click", function () {
    pratinjaubuatmateri();
});
let btnfn7petunjukuploadmateri = document.querySelector(".fn7petunjukuploadmateri");
btnfn7petunjukuploadmateri.addEventListener("click", function () {
    petunjukuploadmateri();
})
let btnfn7gambar = document.querySelector(".fn7gambar");
btnfn7gambar.addEventListener("click", function () {
    daftarGambar();
})
let btnfn7simpandraft = document.querySelector(".fn7simpandraft");
btnfn7simpandraft.addEventListener("click", function () {
    simpancatatansementara();
})
let btnfn7taruhdraft = document.querySelector(".fn7taruhdraft");
btnfn7taruhdraft.addEventListener("click", function () {
    taruhcatatansementara();
})

const ubahijinpublik = (id) => {
    //alert("id = " + id);
    let data = kronologijson[id];
    let idbaris = data.idbaris;
    let kirimdata = new FormData();
    kirimdata.append("idbaris", idbaris);
    fetch(linkmateri + "&action=berbagikontenmateri", {
            method: 'post',
            body: kirimdata
        }).then(m => m.json())
        .then(k => {
            alert(k.result);
            pembelajaran();
        })
        .catch(er => alert(er))
}
//KHUSUS MAPEL
const fnv7kotenmateridihapusmapel = (ids) => {
    //alert('ids = ' + ids);
    timelinekbm.innerHTML = "<i class='fa fa-spin fa-spinner w3-xxlarge'></i>";
    fetch(linkmateri + "&action=kronologhapus&idtoken=" + idJenjang)
        .then(m => m.json())
        .then(k => {
            // console.log(k);
            jsonmateridihapus = k.result.filter(k => k.kuncikd.indexOf(idgurumapelmapel) > -1);
            let temp = `<div style="overflow-x:auto"><table class='versi-table w3-tiny'><thead>
            <tr>
                <th> Baris Database</th>
                <th> Judul Materi</th>
                <th> Jenis KBM </th>
                <th> Waktu Pelaksanaan</th>
                <th> Preview</th>
                <th> Aksi </th>
            </tr>
            </thead>
            <tbody>
        `
            let kk = k.result.filter(k => k.kuncikd.indexOf(idgurumapelmapel) > -1);;

            if (kk.length > 0) {
                for (a = 0; a < kk.length; a++) {
                    temp += `
            <tr><td>${kk[a].idbaris}</td>
                <td> ${kk[a].idmapel.toUpperCase()}</td>
                <td> ${(kk[a].idaksessiswa == 'sekali') ? 'ULANGAN<br>Menerima Tugas Siswa' : 'LATIHAN<br>Tidak Menerima Tugas'}</td>
                <td> ${tanggalfulllengkap(kk[a].idtgl)} <br>s/d<br> ${tanggalfulllengkap(kk[a].idtglend)}</td>
                <td><button onclick="fn7preview('${a}')" class="w3-button w3-green w3-hover-red">PREVIEW</button></td>
                <td class='fn7tombolaksi${a}'> <button onclick="fn7kembalikankonten('${a}')" class="w3-button w3-blue w3-hover-green">Kembalikan</button><br><br>
                <button onclick="fn7jadikankontenbaru('${a}')" class="w3-button w3-khaki w3-hover-green">Simpan Draft</button>
                </td>
            </tr>
            `
                }
            } else {
                temp += `
            <tr>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
            </tr>
            `
            }
            temp += `</tbody></table></div>`;
            timelinekbm.innerHTML = `<button class="w3-button w3-red w3-hover-blue w3-round-large" onclick="pembelajaran()"> Kembali ke Kronologi</button><hr><h4>Materi di Jenjang Kelas Anda yang telah dihapus:</h4>` + temp;

        })
        .catch(er => console.log(er));
}
const fn7selectreposistorymapel = () => {
    let x = document.getElementById("pilihanrepositorysekolahlain").selectedIndex;
    let y = document.getElementById("pilihanrepositorysekolahlain").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);  
    let xx = y[x].value;
    if (y[x].index !== 0) {
        tempatrepositorysekolahlain.innerHTML = "<i class='fa fa-refresh fa-spin w3-xxlarge'></i>";

        fetch(urlmaterisekolahlain[xx] + "&action=kronolog&idtoken=" + idJenjang)
            .then(m => m.json())
            .then(k => {
                // console.log(k);
                jsonmaterisekolahlain = k.result.filter(k => k.kuncikd.indexOf(idgurumapelmapel) > -1);

                let temp = `<div style="overflow-x:auto"><table class='versi-table w3-tiny'><thead>
            <tr>
            <th> Judul Materi</th>
                <th> Mapel dan KD</th>
                <th> Jenis KBM </th>
                <th> Waktu Pelaksanaan</th>
                <th> Dibuat oleh</th>
                <th> Preview</th>
                <th> Aksi </th>
            </tr>
            </thead>
            <tbody>
        `
                let kk = k.result.filter(k => k.kuncikd.indexOf(idgurumapelmapel) > -1);

                let objekgagal = {
                    'MAPELTIDAKDIISI_3.1': ['1', '2']
                };
                if (kk.length > 0) {
                    for (a = 0; a < kk.length; a++) {

                        let ab;
                        if (kk[a].kuncikd == "undefined") {
                            ab = objekgagal;

                        } else {
                            ab = JSON.parse(kk[a].kuncikd)
                        };

                        temp += `
                        <tr>
                        <td>${kk[a].idmapel.toUpperCase()}</td>
                        <td>`
                        let obab = Object.keys(ab);

                        let untukKD = `<table class='versi-table w3-tiny'>
                        <tr>
                            <th> Mapel</th>
                            <th> KD </th>
                            <th> No. Soal </th>
                        </tr>
                        `
                        for (b = 0; b < obab.length; b++) {
                            let key = obab[b];

                            let arrsplit = ab[key].join("<br/>");

                            untukKD += `
                                <tr>
                                    <td>${obab[b].split("_")[0]}</td>
                                    <td>${obab[b].split("_")[1]}</td>
                                    <td>${(ab[obab[b]] == "undefined") ? "Tidak terdeteksi" : arrsplit}</td>
                                </tr>
                            `
                        }
                        untukKD += `</table>`;
                        temp += untukKD;
                        temp += `
                        </td>
                        <td> ${(kk[a].idaksessiswa == 'sekali') ? 'ULANGAN<br>Menerima Tugas Siswa' : 'LATIHAN<br>Tidak Menerima Tugas'}</td>
                        <td> ${tanggalfulllengkap(kk[a].idtgl)} <br>s/d<br> ${tanggalfulllengkap(kk[a].idtglend)}</td>
                        
                        <td>${kk[a].dibuatoleh}</td>
                        <td><button onclick="fn7previewsekolahlain(${a},${xx})" class="w3-button w3-green w3-hover-red">PREVIEW</button></td>
                        <td class="fn7tombolaksisekolahlain${a}"><button onclick="fn7jadikankontenbarudarisekolahlain(${a},${xx})" class="w3-button w3-khaki w3-hover-green">Jadikan Materi Saya</button></td>
                        
                    </tr>
            `
                    }
                } else {
                    temp += `  <tr>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
                <td>Tidak Ditemukan materi</td>
            </tr>
            `
                }
                temp += `</tbody></table></div>`;
                tempatrepositorysekolahlain.innerHTML = "Berikut ini Konten Materi di Jenjang Kelas " + idJenjang + " yang telah dipublikasikan di " + y[x].text;
                tempatrepositorysekolahlain.innerHTML += temp;

            })

    } else {
        tempatrepositorysekolahlain.innerHTML = "Silakan pilih sekolah untuk melihat Konten Materi yang telah dipublikasikan di Sekolah yang terdaftar di Elamaso";

    }
}

let eidmateri = document.querySelector("#idmateri");
let hteks = {}; //{} id: 0, data: eidmateri.value };
let flag = 0;
let ahteks = "";

eidmateri.addEventListener("blur", function (e) {


    //hteks.id = new Date().getTime();
    let teks = e.target.value;

    // ahteks.push(hteks)
    ahteks += teks + "<<|>>"
    flag++

})

let btnundo = document.querySelector(".fn7undo");
btnundo.addEventListener("click", function () {

    if (flag > 0) {
        flag--;
    }


    let ar = ahteks.split("<<|>>");

    let x = parseInt(flag);
    let textarea = document.querySelector("#idmateri");
    textarea.value = ar[x];
});
let btnredo = document.querySelector(".fn7redo");
btnredo.addEventListener("click", function () {

    let ar = ahteks.split("<<|>>");
    let mak = ar.length - 1;
    if (flag < mak) {
        flag++;
    }

    let x = parseInt(flag);
    let textarea = document.querySelector("#idmateri");
    textarea.value = ar[x];

});

let btnfn7video = document.querySelector(".fn7video");
btnfn7video.addEventListener("click", function () {
    daftarvideo();
});

function barufindkuncipgkd(teks) {
    let findPG = teks.match(/^_PG_\d{1,2}\s|^_OPSI-PG_\d{1,2}[A-D]\s|^_OPSI-PG-C_\d+[A-D]\s|^_OPSI-SEL_\d{1,2}[A-D]\s|^_ESSAY-NO_\d{1,2}\s/gm);
    let textarea = document.getElementById("idmateri");
    // <div id="divbantu_kuncijawaban"></div>
    // <div id="divbantu_sebarankd"></div>
    let div = document.querySelector(".tekeditorpg");
    let divekd = document.querySelector(".tekesebarankd");
    let divradiopg = document.getElementById("divbantu_kuncijawaban");
    let seljt = document.getElementById("jenistagihan");
    let valjt = seljt.options[seljt.selectedIndex].value;
    let jtKD4 = ["kpraktik", "kproduk", "kproyek", "uspraktek"];
    divradiopg.innerHTML = "";

    if (findPG !== null) {
        let cekcariopsi = teks.match(/^_OPSI-PG_\d{1,2}[A-D]\s|^_OPSI-PG-C_\d+[A-D]\s|^_OPSI-SEL_\d{1,2}[A-D]\s/gm);


        let tanpaspasi = findPG.map(s => s.replace(/\s|\t/g, ""));
        let opsinya = (cekcariopsi == null) ? [] : cekcariopsi.map(s => s.replace(/\s|\t/g, ""));


        valueeditormateri = {};
        let cekduplikat = tanpaspasi.filter((x, i, a) => a.indexOf(x) !== i)
        valueeditormateri["elemenduplikat"] = cekduplikat;



        let koleksiEl_PG = tanpaspasi.filter(s => s.indexOf("_PG_") > -1); //.map(m=> m.replace("_PG_"));
        let koleksino_PG = tanpaspasi.filter(s => s.indexOf("_PG_") > -1).map(m => parseInt(m.replace("_PG_", "")));
        let koleksiopsi_PG = opsinya.map(s => s.replace("_OPSI-PG_", "") || s.replace("_OPSI-PG-C_", "") || s.replace("_OPSI-SEL_", "")); //.map(m => m.match(/\d[A-D]/g)[0]);

        valueeditormateri["koleksi_el_pg"] = koleksiEl_PG; // "_SEMUA KODE_"
        valueeditormateri["koleksi_no_pg"] = koleksino_PG; // 
        valueeditormateri["koleksi_opsi_pg"] = koleksiopsi_PG;
        let pg_duplikat = koleksiopsi_PG.filter((x, i, a) => a.indexOf(x) !== i);
        valueeditormateri["koleksi_opsi_pg_duplikat"] = pg_duplikat;
        valueeditormateri["koleksi_all_elemen"] = tanpaspasi;

        // valueeditormateri["koleksino_opsi"] = opsinya.map(m => m.replace(/_/, ""));
        let PG = [];
        for (i = 0; i < koleksino_PG.length; i++) {
            let cocokkan = koleksino_PG[i];
            let pattern = cocokkan
            let nopg = koleksiopsi_PG.filter(s => (s == cocokkan + "A" || s == cocokkan + "B" || s == cocokkan + "C" || s == cocokkan + "D"));
            let obj = {};
            obj["nosoal"] = koleksino_PG[i];
            obj["arrayopsi"] = nopg;

            PG.push(obj);
        }
        // valueeditormateri["PG"] = PG;
        let filteressay = tanpaspasi.filter(s => s.indexOf("_ESSAY-NO_") > -1);;
        let filter_no_essay = tanpaspasi.filter(s => s.indexOf("_ESSAY-NO_") > -1).map(m => parseInt(m.replace("_ESSAY-NO_", "")));

        let koleksi_all_nosoal = koleksino_PG.concat(filter_no_essay);
        let koleksi_nosoal_duplikat = koleksi_all_nosoal.filter((x, i, a) => a.indexOf(x) !== i);



        valueeditormateri["koleksi_el_essay"] = filteressay;
        valueeditormateri["koleksi_no_essay"] = filter_no_essay;
        valueeditormateri["koleksi_all_nosoal"] = koleksi_all_nosoal;
        valueeditormateri["koleksi_nosoal_duplikat"] = koleksi_nosoal_duplikat;
        valueeditormateri["NOSOAL"] = PG;


        let html = "";
        let ketesay = "";

        let oke = "Kode Soal PG dan Opsinya yang terdeteksi:";
        let el_input = "";

        // GA BOLEH ADA DUPLIKAT, harusnol;
        let nolelemen = cekduplikat.length;
        let nolnomorsoal = koleksi_nosoal_duplikat.length;
        let nolopsipg = pg_duplikat.length;
        if (nolelemen > 0 || nolnomorsoal > 0 || nolopsipg > 0) {
            html = "Terdapat elemen yang duplikat:"
            if (nolelemen > 0) {
                html += "<br/><br/>Terdapat Kode ELemen yang dupplikat yaitu " + nolelemen.join(", ");
            }
            if (nolnomorsoal > 0) {
                html += "<br/><br/>Terdapat Kode Nomor Soal yang sama. yaitu " + nolnomorsoal.join(", ");
                html += "<br/>Jika nomor soal yang sama tersebut adalah PG dan Essay, utamakan penomoran soal essay melanjutkan dari nomor soal PG sebelumnya";
            }
            if (nolopsipg > 0) {
                html += "<br/><br/>Terdapat opsi PG yang sama. yaitu " + nolopsipg.join(", ");

            }

        } else {
            let objekdatasoal = valueeditormateri.NOSOAL;
            let soalessay = valueeditormateri["koleksi_no_essay"];
            ketesay = "<hr/>";
            // console.log(objekdatasoal)
            if (objekdatasoal.length == 0) {
                html = `TIDAK TERDETEKSI ADANYA SOAL PILIHAN GANDA`
            } else {
                html = "Silakan Pilih tiap-tiap Opsi Pilihan Ganda tiap nomor soal berikut sebagai kunci jawabannya."
                html += `<table class="w3-table-all w3-tiny garis w3-centered"><tr>
                <th>No Soal</th>
                <th colspan="4">Opsi Jawaban<br/><sub>(Klik hurufny, huruf yang menyala adalah kunci jawaban pilihan Anda</sub></th>
                </tr>`
                for (let a = 0; a < objekdatasoal.length; a++) {
                    html += `<tr><td class="warnaeka">${objekdatasoal[a].nosoal}</td>`;
                    let arrayopsi = objekdatasoal[a].arrayopsi;
                    //console.log(arrayopsi);
                    for (let b = 0; b < arrayopsi.length; b++) {
                        html += `<td class="tdpg_pgeditor_${arrayopsi[b]} tdnosoal_editor_${objekdatasoal[a].nosoal} td_ke${b}" style="cursor:pointer">
                        <label for="tomboleditor_bantuopsi${arrayopsi[b]}" class="lbl_pgeditor_${arrayopsi[b]}">${arrayopsi[b].match(/\D/)[0]}</label>
                        </td>`;
                        el_input += `<br/><input type="radio" id="tomboleditor_bantuopsi${arrayopsi[b]}" name="rdsoal_${objekdatasoal[a].nosoal}" class="pg_buatkuncikd" value="${arrayopsi[b]}" onchange="checked_buatkunci(this)"/>${arrayopsi[b]}`;

                    }

                    html += `</tr>`
                }
                html += `</table>`;


            }
            if (soalessay.length == 0) {
                ketesay += "TIDAK TERDETEKSI ADANYA SOAL ESSAY"
            } else {
                ketesay += "SOAL ESSAY TERDETEKSI:<br/>"
                ketesay += `Nomor-nomor soal Essay<br/><br/>`;
                soalessay.forEach(element => {
                    ketesay += `<span class="w3-badge warnaeka w3-border-bottom w3-border-black w3-margin w3-text-black">${element}</span>`
                });

            }


        }
        div.innerHTML = html + ketesay;
        divradiopg.innerHTML = el_input;
        //console.log(buateditorkdaktif)
        let cekkunci = teks.match(/^_KUNCI-PG_/gm);
        let cekkd = teks.match(/^_KUNCI-KD_/gm);
        let val = textarea.value;
        let n = val.length;

        if (cekkd !== null) {
            let awalkd = val.indexOf("_KUNCI-KD_");
            let batasawalkd = val.substring(awalkd, n)

            let str_kd_kunci = batasawalkd.split("\n")[0];


            if (cekkd.length > 1) {
                alert("Anda membuat kode sebaran KD lebih dari 1. Kode pada baris tersebut akan dihapus.");
                textarea.value = textarea.value.replace(str_kd_kunci, "");
            } else {
                let arr0 = str_kd_kunci.replace("_KUNCI-KD_", "");
                let arr1 = arr0.replace(/\s+/gm, "")
                let grup = arr1.split("<||>");

                let htmlsebaran = ""
                if (valjt == "") {
                    htmlsebaran = `Anda Akan membuat konten materi jenis tagihan tanpa menerima respon jawaban siswa namun sebaran KD sifatnya wajib. Untuk membantu menggenerate sebaran KD, klik tombol <label for="modal_generate_sebarankd" class="w3-button warnaeka w3-border-bottom w3-border-black w3-round-large">Generate Sebaran KD</label>.(Jika belum Berubah, ketikan sesuatu di teks area materi)`;
                } else {

                }

                let indekjt = jtKD4.indexOf(valjt);
                // console.log(indekjt);
                // console.log(valjt);

                let stKD3apaKD4 = ""
                if (indekjt == -1) {
                    stKD3apaKD4 = " Kompetensi Pengetahuan (KD-3) "
                } else {
                    stKD3apaKD4 = " Kompetensi Keterampilan (KD-4) "

                }

                htmlsebaran = "SEBARAN KD TERDETEKSI<br/>"
                htmlsebaran += `Anda memilih jenis Tagihan <span class="w3-card-4 w3-margin-bottom warnaeka"> ${stKD3apaKD4}</span>.<br/><br/>
                    Atau Jika Anda perlu membuat sebaran KD dari fitur elamaso, silakan klik <label for="modal_generate_sebarankd" class="w3-button warnaeka w3-border-bottom w3-border-black w3-round-large">Generate Sebaran KD</label>
                    <br/><br/>
                    Berikut hasil tabel Sebran KD pada konten materi Anda yang terbaca oleh sistem:
                    <table class="w3-table-all w3-bordered"><tr>
                    <th>Mata Pelajaran (Kode)</th>
                    <th>No KD</th>
                    <th>Nomor Soal</th>
                    </tr>`;
                for (let g = 0; g < grup.length; g++) {
                    let grupmapel = grup[g].split(":");
                    htmlsebaran += `<tr>
                        <td>${grupmapel[0].split("_")[0]}</td>
                        <td>${grupmapel[0].split("_")[1]}</td>
                        <td>${grupmapel[1]}</td>
                        <td></td></tr>`
                }
                htmlsebaran += `</table><hr/> Berdasarkan Urutan Soal
                   <div class="w3-card-4">
                    `;
                //mengurutkan soal;
                let mod_str = JSON.parse(objekKD(str_kd_kunci));
                let mod_obj = ubahjsonkuncikd(mod_str);

                let oo = Object.keys(mod_obj);

                for (h = 0; h < oo.length; h++) {
                    htmlsebaran += `<div class="w3-left w3-margin warnaeka w3-border-bottom w3-border-black w3-padding w3-round w3-text-black">
                        <span class="w3-badge w3-margin-right w3-white">${oo[h]}</span> ${mod_obj[oo[h]].split("_")[0]} KD ${mod_obj[oo[h]].split("_")[1]}
                        </div>`

                }


                // console.log(mod_str);
                // console.log(mod_obj);
                htmlsebaran += `</div>`



                divekd.innerHTML = htmlsebaran;
            }


        }

        if (cekkunci !== null) {
            // console.log(cekkunci);

            let awal = val.indexOf("_KUNCI-PG_");
            let batasawal = val.substring(awal, n)

            let str_pg_kunci = batasawal.split("\n")[0];
            if (cekkunci.length > 1) {
                alert("Anda membuat kode kunci jawaban PG lebih dari 1. Kode pada baris tersebut akan dihapus.");
                textarea.value = textarea.value.replace(str_pg_kunci, "");
            } else {
                let cekunci = str_pg_kunci.match(/\d+[A-D]/gm);
                //console.log(str_pg_kunci);
                for (let a = 0; a < cekunci.length; a++) {
                    let tdel = document.querySelector(".tdpg_pgeditor_" + cekunci[a]);
                    tdel.className += " w3-light-blue";
                    document.getElementById("tomboleditor_bantuopsi" + cekunci[a]).checked = true;
                }

            }

        }



    } else {
        let html = ` PENGATURAN KUNCI JAWABAN
        <br /><br />
        Saat ini belum terdeteksi adanya nomor soal Pilihan Ganda atau ESSAY diketikan Anda. Nomor soal dan
        pilihan opsi jawabannya akan muncul otomatis. Anda tinggal memilih Opsi Jawaban di
        tiap-tiap opsi yang terdeteksi sebagai KUNCI JAWABAN soal PG Anda.
        <br /><br />Abaikan pesan ini jika Anda akan memmbuat konten materi tanpa adanya tagihan
        <br/><br/>
        <table class="w3-table-all tabelpilihkuncipg">
           
        </table>`;
        let html2 = `SEBARAN KD TIDAK TERDETEKSI (Sebaran KD Wajib diisi)*
        `
        div.innerHTML = html;
        divekd.innerHTML = html2;
    }
    // let cariopsi =(cekcariopsi !== null)?[]:cekcariopsi; 
    //console.log(cekcariopsi);
}
eidmateri.addEventListener("keyup", function (e) {
    let teks = e.target.value;


    // let teks = e.target.value;
    if (teks !== "") {
        barufindkuncipgkd(teks);

    }

});

function generaterasebarankd() {
    // alert("modal generate sebaran KD");
    modalbuatsebarankd.style.display = "block";
    let datakd = buateditorkdaktif
    let seljt = document.getElementById("jenistagihan");
    let valjt = seljt.options[seljt.selectedIndex].value;
    let jtKD4 = ["kpraktik", "kproduk", "kproyek", "uspraktek"];
    let indekjt = jtKD4.indexOf(valjt);
    let indekkd = "";
    let colkd = "kd3";
    // console.log(indekjt);
    // console.log(valjt);

    let stKD3apaKD4 = ""
    if (indekjt == -1) {
        stKD3apaKD4 = " Kompetensi Pengetahuan (KD-3) ";
        indekkd = "cekliskd3";
        colkd = "kd3"
    } else {
        stKD3apaKD4 = " Kompetensi Keterampilan (KD-4) ";
        indekkd = "cekliskd4";
        colkd = "kd4";
    };
    msb_obje = {}
    let datakdaktif = datakd.filter(s => s[indekkd] === true);
    //datakd.filter(s => Object.keys(s).filter(d => datakd[indekkd] == true)); //Object.entries(datakd).filter(([k, v]) => k === indekkd && v === true)
    //console.table(datakdaktif);
    let datamapelaktif = datakdaktif.map(s => s["mapel"]).filter((x, i, a) => a.indexOf(x) == i);

    msb_obje["datamapel"] = datamapelaktif;
    datamapelaktif.forEach(s => {
        msb_obje[s] = datakdaktif.filter(d => d["mapel"] == s).map(m => m[colkd]);
    })
    //console.log(datamapelaktif)
    //console.log(msb_obje) //
    let tabel = document.querySelector(".mbs_tabelbantusebarankd").getElementsByTagName("tbody")[0];
    let isihtml = "";
    let opsihtmlmapel = "";
    let opsihtmlkd = "";
    //deteksi sebaranKD di textarea
    let teksarea = document.getElementById("idmateri");
    let val = teksarea.value;
    let n = val.length;
    let ada = val.indexOf("_KUNCI-KD_");
    ///let awal = val.indexOf("_KUNCI-PG_");
    let batasawal = val.substring(ada, n)

    let str_pg_d = batasawal.split("\n")[0];

    if (ada == -1) {
        for (let i = 0; i < datamapelaktif.length; i++) {
            if (i == 0) {
                opsihtmlmapel += `<option value="${datamapelaktif[i]}" selected>${datamapelaktif[i]}</option>`;
            } else {
                opsihtmlmapel += `<option value="${datamapelaktif[i]}">${datamapelaktif[i]}</option>`;
            }
        };
        let selectmap = datamapelaktif[0];
        let kdmapelpertama = msb_obje[selectmap];
        for (i = 0; i < kdmapelpertama.length; i++) {
            opsihtmlkd += `<option value="${selectmap}_${kdmapelpertama[i]}">${kdmapelpertama[i]}<option>`;
        }
        document.querySelector(".brsmapel_0").innerHTML = opsihtmlmapel;
        document.querySelector(".brskd_0").innerHTML = opsihtmlkd;
    } else {
        let arr0 = str_pg_d.replace("_KUNCI-KD_", "");
        let arr1 = arr0.replace(/\s+/gm, "")
        let mgrup = arr1.split("<||>");
        // console.log(mgrup);
        let mapelsesuai = [];
        let mapeltidaksesuai = [];
        let nosoalngaco;

        let tr, td;
        let rr = mgrup.length - tabel.rows.length;
        let htmlrow = ""
        //update dulu tabel formatnya ...)
        for (let g = 0; g < mgrup.length; g++) {
            let r = g
            htmlrow += `<tr>
                <td>
                    <select class="w3-select mbs_selectmapel brsmapel_${r}" onchange="fn_mbs_selectmapel(this)">
                        <option value="" selected>PILIH MAPEL</option>
                    </select>
                </td>
                <td>
                    <select class="w3-select mbs_selectkd brskd_${r}" onchange="fn_mbs_selectkd(this)">
                        <option value="" selected>PILIH KD</option>
                    </select>
                </td>
                <td>
                    <input class="w3-input w3-border w3-border-teal mbs_textarea brsnosoal_${r}" placeholder="Contoh pengisian: 1,2,3 (di akhir nomor jangan diberi koma)"/>
                </td></tr>`;
        }
        tabel.innerHTML = htmlrow

        //ambil data sebaran kd dari teks area
        for (g = 0; g < mgrup.length; g++) {
            let grup = mgrup[g].split(":");
            opsihtmlmapel = "";
            opsihtmlkd = "";
            let nmp = grup[0].split("_")[0];
            let nkd = grup[0].split("_")[1];
            let valnosoal = grup[1]

            nosoalngaco = nkd.match(/(\d+[A-Za-z.])/);
            if (datamapelaktif.indexOf(nmp) > -1) {

                for (let i = 0; i < datamapelaktif.length; i++) {
                    opsihtmlmapel += `<option value="${datamapelaktif[i]}">${datamapelaktif[i]}</option>`;
                };
                let selectmap = nmp;
                let kdmapelpertama = msb_obje[selectmap];
                for (i = 0; i < kdmapelpertama.length; i++) {
                    opsihtmlkd += `<option value="${selectmap}_${kdmapelpertama[i]}">${kdmapelpertama[i]}</option>`;
                }

                if (kdmapelpertama.indexOf(nkd) == -1) {
                    tabel.rows[g].cells[1].style.backgroundColor = "red";
                }
                document.querySelector(".brsmapel_" + g).innerHTML = opsihtmlmapel;
                document.querySelector(".brskd_" + g).innerHTML = opsihtmlkd;
                //
                document.querySelector(".brsmapel_" + g).value = nmp;
                document.querySelector(".brskd_" + g).value = nmp + "_" + nkd;

                document.querySelector(".brsnosoal_" + g).value = valnosoal.replace(/[azAZ.]/gm, ",");



            } else {
                //mapeltidaksesuai.push(nmp);
                for (let i = 0; i < datamapelaktif.length; i++) {
                    if (i == 0) {
                        opsihtmlmapel += `<option value="${datamapelaktif[i]}" selected>${datamapelaktif[i]}</option>`;
                    } else {
                        opsihtmlmapel += `<option value="${datamapelaktif[i]}">${datamapelaktif[i]}</option>`;
                    }
                };
                let selectmap = datamapelaktif[0];
                let kdmapelpertama = msb_obje[selectmap];

                for (i = 0; i < kdmapelpertama.length; i++) {
                    opsihtmlkd += `<option value="${selectmap}_${kdmapelpertama[i]}">${kdmapelpertama[i]}</option>`;

                }
                tabel.rows[g].cells[0].style.backgroundColor = "red";
                document.querySelector(".brsmapel_" + g).innerHTML = opsihtmlmapel;

                document.querySelector(".brskd_" + g).innerHTML = opsihtmlkd;

                document.querySelector(".brsmapel_" + g).value = nmp;
                document.querySelector(".brskd_" + g).value = nmp + "_" + nkd;

                document.querySelector(".brsnosoal_" + g).value = valnosoal.replace(/[azAZ.]/gm, ",");
            }
        }
    }
}

function fn_mbs_tambahbaris() {
    let tabel = document.querySelector(".mbs_tabelbantusebarankd").getElementsByTagName("tbody")[0];
    let lr = tabel.rows.length;
    let opsimapel = msb_obje["datamapel"];
    let html = "";
    opsimapel.forEach(s => {
        html += `<option value="${s}">${s}</option>`
    })
    let cr_tr = tabel.insertRow(-1);
    let cr_td = cr_tr.insertCell(-1);

    cr_td.innerHTML = `<select class="w3-select mbs_selectmapel brsmapel_${lr}" onchange="fn_mbs_selectmapel(this)">
   ${html}
</select>`;

    cr_td = cr_tr.insertCell(-1);
    cr_td.innerHTML = `<select class="w3-select mbs_selectkd brskd_${lr}" onchange="fn_mbs_selectkd(this)">
                <option value="" selected>PILIH MAPEL DULU</option>
                </select>`;
    cr_td = cr_tr.insertCell(-1);
    cr_td.innerHTML = `<input class="w3-input w3-border w3-border-teal mbs_textarea brsnosoal_${lr}" placeholder="Contoh pengisian: 1,2,3 (di akhir nomor jangan diberi koma)"/>`;
};

function fn_mbs_selectmapel(el) {
    let attr = el.className; //.indexOf("brsmapel_");
    let baris = attr.match(/(\d+)/gm)[1];
    let ops = document.querySelector(".brsmapel_" + baris).options;
    let indek = document.querySelector(".brsmapel_" + baris).selectedIndex;
    let val = ops[indek].value;
    let divopsikd = document.querySelector(".brskd_" + baris);
    let opsikd = msb_obje[val];
    let html = "";
    opsikd.forEach(s => {
        html += `<option value="${val}_${s}">${s}</option>`
    });
    divopsikd.innerHTML = html;


};

function fn_mbs_selectkd(el) {

};

function fn_mbs_simpansebarankd() {
    let teksarea = document.getElementById("idmateri");
    let val = teksarea.value;
    let n = val.length;
    let awal = val.indexOf("_KUNCI-KD_");
    let batasawal = val.substring(awal, n)
    let cari = batasawal.split("\n")[0];
    let arr = "_KUNCI-KD_"
    let elkd = document.querySelectorAll(".mbs_selectkd");
    //brsnosoal_${r}
    let ar = [];
    for (i = 0; i < elkd.length; i++) {
        let elinput = elkd[i].value + ":";
        let attr = elkd[i].className; //.indexOf("brsmapel_");
        let baris = attr.match(/(\d+)/gm)[1];
        let nomorinput = document.querySelector(".brsnosoal_" + baris);
        let valno = nomorinput.value
        elinput += valno;
        ar.push(elinput);
    }
    arr += ar.join("<||>")
    if (awal == -1) {
        teksarea.value += "\n\n" + arr;
    } else {
        teksarea.value = teksarea.value.replace(cari, arr);
    }

}

function fn_mbs_hapusbaris() {
    let tabel = document.querySelector(".mbs_tabelbantusebarankd").getElementsByTagName("tbody")[0];
    let lr = tabel.rows.length;
    if (lr == 1) {
        alert("Maaf, tidak bisa menghapus lagi.")
        return
    };
    let row = tabel.rows;

    tabel.deleteRow(-1);

};

function tanpasebarankd() {
    let teksarea = document.getElementById("idmateri");
    let arr = "_KUNCI-KD_NONKD_5.1:1";
    let val = teksarea.value;
    let n = val.length;
    let awal = val.indexOf("_KUNCI-KD_");
    let batasawal = val.substring(awal, n)
    let cari = batasawal.split("\n")[0];

    if (awal == -1) {
        teksarea.value += "\n\n" + arr;
    } else {
        teksarea.value = teksarea.value.replace(cari, arr);
    }

}
const checked_buatkunci = (el) => {
    let opsilengkap = el.value; //1A
    let no = el.value.match(/\d+/); //1A
    let ele = document.querySelectorAll(".tdnosoal_editor_" + no);
    let elaktif = document.querySelector(".tdpg_pgeditor_" + opsilengkap);
    //hapus dulu bg warannya;
    for (i = 0; i < ele.length; i++) {
        ele[i].className = ele[i].className.replace("w3-light-blue", "");
    };
    elaktif.className += " w3-light-blue";

    let textarea = document.getElementById("idmateri");
    let val = textarea.value;
    let n = val.length;
    let awal = val.indexOf("_KUNCI-PG_");
    let batasawal = val.substring(awal, n)

    let str_pg_kunci = batasawal.split("\n")[0];

    let ceklis = document.querySelectorAll(".pg_buatkuncikd");
    let arrceklis = []
    for (j = 0; j < ceklis.length; j++) {
        let n = ceklis[j].value;
        if (ceklis[j].checked) {
            arrceklis.push(n)

        }

    }
    // console.log(arrceklis)
    let teksnya = "_KUNCI-PG_" + arrceklis.join(",")
    // console.log(str_pg_kunci)
    // console.log(teksnya);
    // textarea.value = textarea.value.substring(0, awal) + teksnya + textarea.value.substring(end, len);
    let teksganti = str_pg_kunci;
    // console.log(awal)
    if (awal == -1) {
        textarea.value = textarea.value + "\n\n" + teksnya; //+ textarea.value.substring(end, len);
    } else {
        textarea.value = textarea.value.replace(str_pg_kunci, teksnya);

    }


};

async function kurikulumdiamdiam() {
    if (window.location.href.indexOf("gmp.html") > -1) {

        let valuekelas = document.getElementById("gmppilihrombel"); //.value;

        if (valuekelas !== "null" && valuekelas.value == "none") {
            alert("Anda belum memilih kelas. Silakan pilih Kelas terlebih dulu")
            return

        }
    }


    let tas = "kelas" + idJenjang;
    await fetch(linkmateri + "&action=cekdkkm&tab=" + tas)
        .then(m => m.json())
        .then(k => {

            let statusunggah = (k.unggah == "Jenjang Kelas Anda sudah mengunggah KKM dan KD") ? true : false;
            let data = k.result;
            buateditorkdaktif = data;
            //console.log(data)


        })
        .catch(er => {
            console.log(er);

        })





};
async function kurikulumdiamdiamgagal() {
    if (window.location.href.indexOf("gmp.html") > -1) {

        let valuekelas = document.getElementById("gmppilihrombel"); //.value;

        if (valuekelas !== "null" && valuekelas.value == "none") {
            alert("Anda belum memilih kelas. Silakan pilih Kelas terlebih dulu")
            return

        }
    }


    let tabkd = document.querySelector(".classtabkd");
    let tabkkm = document.querySelector(".classtabkkm");
    let tabupl = document.querySelector(".classtabuploadkurikulum");
    tabkd.innerHTML = "Kompetensi Dasar <i class='fa fa-spin fa-spinner'></i>"
    tabkkm.innerHTML = "KKM <i class='fa fa-spin fa-spinner'></i>"
    tabupl.innerHTML = "Upload Kurikulum <i class='fa fa-spin fa-spinner'></i>"

    kurikulum_kd.style.display = "block";
    //document.getElementById("kurikulum_kd").click();
    //------------------------------------------
    let islam = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "ISLAM" || lk.pd_agama == "Islam" || lk.pd_agama == "islam") {
            return true;
        }
    }).length;
    let bolislam = (islam == 0) ? false : true;

    let kristen = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KRISTEN" ||
            lk.pd_agama == "Kristen" ||
            lk.pd_agama == "kristen" ||
            lk.pd_agama == "PROTESTAN" || lk.pd_agama == "Protestan") {
            return true;
        }
    }).length;
    let bolkristen = (kristen == 0) ? false : true;

    let katolik = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katolik" || lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katholik" || lk.pd_agama == "katholik") {
            return true;
        }
    }).length;
    let bolkatolik = (katolik == 0) ? false : true;

    let hindu = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "HINDU" || lk.pd_agama == "Hindu" || lk.pd_agama == "hindu") {
            return true;
        }
    }).length;
    let bolhindu = (hindu == 0) ? false : true;

    let budha = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "BUDHA" || lk.pd_agama == "BUDA" || lk.pd_agama == "Budha" || lk.pd_agama == "Buda" || lk.pd_agama == "buda") {
            return true;
        }
    }).length;
    let bolbudha = (budha == 0) ? false : true;
    let khonghucu = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KHONGHUCU" || lk.pd_agama == "Khong Hu Cu" || lk.pd_agama == "KHONG HUCU" || lk.pd_agama == "Khong Hucu" || lk.pd_agama == "Khong hucu") {
            return true;
        }
    }).length;
    let bolkhonghucu = (khonghucu == 0) ? false : true;


    let divkurikulum = document.getElementById("kurikulum_kd");
    divkurikulum.innerHTML = "<i class='fa fa-spin fa-spinner w3-xxxlarge'></i>";


    let tekshtml = "<h3> Kompetensi Dasar</h3>Sebaran Kompetensi Dasar<hr/>";
    tekshtml += `<button class='w3-button w3-round-large w3-blue' onclick="datacekliskd()">Simpan</button><hr/>`;
    let tragama = "";
    let elkkm = "";


    if (bolislam) {
        tragama += `<tr><td>Pendidikan Agama Islam dan Budi Pekerti</td><td>PAI</td>
        <td>
            <label for="kd3_PAI_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.1" name="kd3_PAI_3.1" />
                3.1
            </label><br>
            <label for="kd3_PAI_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.2" name="kd3_PAI_3.2" />
                3.2
                </label><br>
            <label for="kd3_PAI_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.3" name="kd3_PAI_3.3" />
                3.3
                </label><br>
            <label for="kd3_PAI_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.4" name="kd3_PAI_3.4" />
                3.4
            </label><br>
            <label for="kd3_PAI_3.5">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.5" name="kd3_PAI_3.5" />
                3.5
            </label><br>
            <label for="kd3_PAI_3.6">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.6" name="kd3_PAI_3.6" />
                3.6
                </label><br>
            <label for="kd3_PAI_3.7">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.7" name="kd3_PAI_3.7" />
                3.7
                </label><br>
            <label for="kd3_PAI_3.8">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.8" name="kd3_PAI_3.8" />
                3.8
            </label><br>
            <label for="kd3_PAI_3.9">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.9" name="kd3_PAI_3.9" />
                3.9
            </label><br>
            <label for="kd3_PAI_3.10">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.10" name="kd3_PAI_3.10" />
                3.10
                </label><br>
            <label for="kd3_PAI_3.11">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.11" name="kd3_PAI_3.11" />
                3.11
                </label><br>
            <label for="kd3_PAI_3.12">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.12" name="kd3_PAI_3.12" />
                3.12
            </label><br>
            <label for="kd3_PAI_3.13">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.13" name="kd3_PAI_3.13" />
                3.13
            </label><br>
            <label for="kd3_PAI_3.14">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.14" name="kd3_PAI_3.14" />
                3.14
                </label><br>
            <label for="kd3_PAI_3.15">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.15" name="kd3_PAI_3.15" />
                3.15
                </label><br>
            <label for="kd3_PAI_3.16">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.16" name="kd3_PAI_3.16" />
                3.16
            </label><br>
             <label for="kd3_PAI_3.17">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.17" name="kd3_PAI_3.17" />
                3.17
                </label><br>
            <label for="kd3_PAI_3.18">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.18" name="kd3_PAI_3.18" />
                3.18
            </label><br>
            <label for="kd3_PAI_3.19">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.19" name="kd3_PAI_3.19" />
                3.19
            </label><br>
            <label for="kd3_PAI_3.20">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.20" name="kd3_PAI_3.20" />
                3.20
                </label><br>
            <label for="kd3_PAI_3.21">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.21" name="kd3_PAI_3.21" />
                3.21
                </label>
        </td>
        <td>
        
        <label for="kd4_PAI_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.1" name="kd4_PAI_4.1" />
        4.1
        </label><br>
        <label for="kd4_PAI_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.2" name="kd4_PAI_4.2" />
        4.2
        </label><br>
        <label for="kd4_PAI_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.3" name="kd4_PAI_4.3" />
        4.3
        </label><br>
        <label for="kd4_PAI_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.4" name="kd4_PAI_4.4" />
        4.4
        </label><br>
        <label for="kd4_PAI_4.5">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.5" name="kd4_PAI_4.5" />
        4.5
        </label><br>
        <label for="kd4_PAI_4.6">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.6" name="kd4_PAI_4.6" />
        4.6
        </label><br>
        <label for="kd4_PAI_4.7">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.7" name="kd4_PAI_4.7" />
        4.7
        </label><br>
        <label for="kd4_PAI_4.8">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.8" name="kd4_PAI_4.8" />
        4.8
        </label><br>
        <label for="kd4_PAI_4.9">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.9" name="kd4_PAI_4.9" />
        4.9
        </label><br>
        <label for="kd4_PAI_4.10">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_3.10" name="kd4_PAI_4.10" />
        4.10
        </label><br>
        <label for="kd4_PAI_4.11">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.11" name="kd4_PAI_4.11" />
        4.11
        </label><br>
        <label for="kd4_PAI_4.12">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.12" name="kd4_PAI_4.12" />
        4.12
        </label><br>
        <label for="kd4_PAI_4.13">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.13" name="kd4_PAI_4.13" />
        4.13
        </label><br>
        <label for="kd4_PAI_4.14">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.14" name="kd4_PAI_4.14" />
        4.14
        </label><br>
        <label for="kd4_PAI_4.15">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.15" name="kd4_PAI_4.15" />
        4.15
        </label><br>
        <label for="kd4_PAI_4.16">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.16" name="kd4_PAI_4.16" />
        4.16
        </label><br>
        <label for="kd4_PAI_4.17">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.17" name="kd4_PAI_4.17" />
        4.17
        </label><br>
        <label for="kd4_PAI_4.18">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.18" name="kd4_PAI_4.18" />
        4.18
        </label><br>
        <label for="kd4_PAI_4.19">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.19" name="kd4_PAI_4.19" />
        4.19
        </label><br>
        <label for="kd4_PAI_4.20">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.20" name="kd4_PAI_4.20" />
        4.20
        </label><br>
        <label for="kd4_PAI_4.21">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.21" name="kd4_PAI_4.21" />
        4.21
        </label>
        </td>
        </tr>`;
        elkkm += `<tr><td>PAI</td><td contenteditable="true" id="namamapelraport_PAI">Pendidikan Agama Islam dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PAI">00</td></tr>`;
    }
    if (bolkristen) {
        tragama += `<tr><td>Pendidikan Agama Kristen dan Budi Pekerti<br><br><sub class="w3-text-red">Siswa di kelas Anda terdeteksi memiliki jumlah siswa beragama Kristen sebanyak ${kristen} siswa.<sub></td><td>PKRIS</td>
        <td>
            <label for="kd3_PKRIS_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PKRIS_3.1" name="kd3_PKRIS_3.1" />
                3.1
            </label><br>
            <label for="kd3_PKRIS_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PKRIS_3.2" name="kd3_PKRIS_3.2" />
                3.2
                </label><br>
            <label for="kd3_PKRIS_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PKRIS_3.3" name="kd3_PKRIS_3.3" />
                3.3
                </label><br>
            <label for="kd3_PKRIS_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PKRIS_3.4" name="kd3_PKRIS_3.4" />
                3.4
            </label><br>
            
        </td>
        <td>
        
        <label for="kd4_PKRIS_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PKRIS_4.1" name="kd4_PKRIS_4.1" />
        4.1
        </label><br>
        <label for="kd4_PKRIS_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PKRIS_4.2" name="kd4_PKRIS_4.2" />
        4.2
        </label><br>
        <label for="kd4_PKRIS_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PKRIS_4.3" name="kd4_PKRIS_4.3" />
        4.3
        </label><br>
        <label for="kd4_PKRIS_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PKRIS_4.4" name="kd4_PKRIS_4.4" />
        4.4
        </label><br>

        </td>
        </tr>`;
        elkkm += `<tr><td>PKRIS</td><td contenteditable="true" id="namamapelraport_PKRIS">Pendidikan Agama Kristen dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PKRIS">00</td></tr>`;
    }
    if (bolkatolik) {
        tragama += `<tr><td>Pendidikan Agama Katholik dan Budi Pekerti<br><br><sub class="w3-text-red">Siswa di kelas Anda terdeteksi memiliki jumlah siswa beragama Katolik sebanyak ${katolik} siswa.<sub></td><td>PKATO</td>
        <td>
            <label for="kd3_PKATO_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.1" name="kd3_PKATO_3.1" />
                3.1
            </label><br>
            <label for="kd3_PKATO_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.2" name="kd3_PKATO_3.2" />
                3.2
                </label><br>
            <label for="kd3_PKATO_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.3" name="kd3_PKATO_3.3" />
                3.3
                </label><br>
            <label for="kd3_PKATO_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.4" name="kd3_PKATO_3.4" />
                3.4
            </label><br>
            <label for="kd3_PKATO_3.5">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.5" name="kd3_PKATO_3.5" />
                3.5
            </label><br>
            <label for="kd3_PKATO_3.6">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.6" name="kd3_PKATO_3.6" />
                3.6
                </label><br>
            <label for="kd3_PKATO_3.7">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.7" name="kd3_PKATO_3.7" />
                3.7
                </label><br>
            <label for="kd3_PKATO_3.8">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.8" name="kd3_PKATO_3.8" />
                3.8
            </label><br>
           
        </td>
        <td>
        
        <label for="kd4_PKATO_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.1" name="kd4_PKATO_4.1" />
        4.1
        </label><br>
        <label for="kd4_PKATO_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.2" name="kd4_PKATO_4.2" />
        4.2
        </label><br>
        <label for="kd4_PKATO_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.3" name="kd4_PKATO_4.3" />
        4.3
        </label><br>
        <label for="kd4_PKATO_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.4" name="kd4_PKATO_4.4" />
        4.4
        </label><br>
        <label for="kd4_PKATO_4.5">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.5" name="kd4_PKATO_4.5" />
        4.5
        </label><br>
        <label for="kd4_PKATO_4.6">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.6" name="kd4_PKATO_4.6" />
        4.6
        </label><br>
        <label for="kd4_PKATO_4.7">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.7" name="kd4_PKATO_4.7" />
        4.7
        </label><br>
        <label for="kd4_PKATO_4.8">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.8" name="kd4_PKATO_4.8" />
        4.8
        </label><br>
        
        </td>
        </tr>`;
        elkkm += `<tr><td>PKATO</td><td contenteditable="true" id="namamapelraport_PKATO">Pendidikan Agama Katholik dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PKATO">00</td></tr>`;
    }
    if (bolbudha) {
        tragama += `<tr><td>Pendidikan Agama Budha dan Budi Pekerti<br><br><sub class="w3-text-red">Siswa di kelas Anda terdeteksi memiliki jumlah siswa beragama Budha sebanyak ${budha} siswa.<sub></td><td>PBUDH</td>
        <td>
            <label for="kd3_PBUDH_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PBUDH_3.1" name="kd3_PBUDH_3.1" />
                3.1
            </label><br>
            <label for="kd3_PBUDH_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PBUDH_3.2" name="kd3_PBUDH_3.2" />
                3.2
                </label><br>
            <label for="kd3_PBUDH_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PBUDH_3.3" name="kd3_PBUDH_3.3" />
                3.3
                </label><br>
            <label for="kd3_PBUDH_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PBUDH_3.4" name="kd3_PBUDH_3.4" />
                3.4
            </label><br>
            
        </td>
        <td>
        
        <label for="kd4_PBUDH_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PBUDH_4.1" name="kd4_PBUDH_4.1" />
        4.1
        </label><br>
        <label for="kd4_PBUDH_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PBUDH_4.2" name="kd4_PBUDH_4.2" />
        4.2
        </label><br>
        <label for="kd4_PBUDH_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PBUDH_4.3" name="kd4_PBUDH_4.3" />
        4.3
        </label><br>
        <label for="kd4_PBUDH_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PBUDH_4.4" name="kd4_PBUDH_4.4" />
        4.4
        </label><br>

        </td>
        </tr>`;
        elkkm += `<tr><td>PBUDH</td><td contenteditable="true" id="namamapelraport_PBUDH">Pendidikan Agama Budha dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PBUDH">00</td></tr>`;
    }
    if (bolhindu) {
        tragama += `<tr><td>Pendidikan Agama Hindu dan Budi Pekerti<br><br><sub class="w3-text-red">Siswa di kelas Anda terdeteksi memiliki jumlah siswa beragama Hindu sebanyak ${hindu} siswa.<sub></td><td>PHIND</td>
        <td>
            <label for="kd3_PHIND_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.1" name="kd3_PHIND_3.1" />
                3.1
            </label><br>
            <label for="kd3_PHIND_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.2" name="kd3_PHIND_3.2" />
                3.2
                </label><br>
            <label for="kd3_PHIND_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.3" name="kd3_PHIND_3.3" />
                3.3
                </label><br>
            <label for="kd3_PHIND_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.4" name="kd3_PHIND_3.4" />
                3.4
            </label><br>
            <label for="kd3_PHIND_3.5">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.5" name="kd3_PHIND_3.5" />
                3.5
            </label><br>
            <label for="kd3_PHIND_3.6">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.6" name="kd3_PHIND_3.6" />
                3.6
                </label><br>
            <label for="kd3_PHIND_3.7">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.7" name="kd3_PHIND_3.7" />
                3.7
                </label><br>
            
           
        </td>
        <td>
        
        <label for="kd4_PHIND_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.1" name="kd4_PHIND_4.1" />
        4.1
        </label><br>
        <label for="kd4_PHIND_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.2" name="kd4_PHIND_4.2" />
        4.2
        </label><br>
        <label for="kd4_PHIND_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.3" name="kd4_PHIND_4.3" />
        4.3
        </label><br>
        <label for="kd4_PHIND_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.4" name="kd4_PHIND_4.4" />
        4.4
        </label><br>
        <label for="kd4_PHIND_4.5">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.5" name="kd4_PHIND_4.5" />
        4.5
        </label><br>
        <label for="kd4_PHIND_4.6">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.6" name="kd4_PHIND_4.6" />
        4.6
        </label><br>
        <label for="kd4_PHIND_4.7">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.7" name="kd4_PHIND_4.7" />
        4.7
        </label>
        
        </td>
        </tr>`;
        elkkm += `<tr><td>PHIND</td><td contenteditable="true" id="namamapelraport_PHIND">Pendidikan Agama Hindu dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PHIND">00</td></tr>`;
    }
    if (bolkhonghucu) {
        tragama += `<tr><td>Pendidikan Agama Khonghucu dan Budi Pekerti<br><br><sub class="w3-text-red">Siswa di kelas Anda terdeteksi memiliki jumlah siswa beragama Khonghucu sebanyak ${khonghucu} siswa.<sub></td><td>PHIND</td>
        <td>
            <label for="kd3_PKONG_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.1" name="kd3_PKONG_3.1" />
                3.1
            </label><br>
            <label for="kd3_PKONG_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.2" name="kd3_PKONG_3.2" />
                3.2
                </label><br>
            <label for="kd3_PKONG_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.3" name="kd3_PKONG_3.3" />
                3.3
                </label><br>
            <label for="kd3_PKONG_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.4" name="kd3_PKONG_3.4" />
                3.4
            </label><br>
            <label for="kd3_PKONG_3.5">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.5" name="kd3_PKONG_3.5" />
                3.5
            </label><br>
            <label for="kd3_PKONG_3.6">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.6" name="kd3_PKONG_3.6" />
                3.6
                </label><br>
            <label for="kd3_PKONG_3.7">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.7" name="kd3_PKONG_3.7" />
                3.7
                </label><br>
            
           
        </td>
        <td>
        
        <label for="kd4_PKONG_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.1" name="kd4_PKONG_4.1" />
        4.1
        </label><br>
        <label for="kd4_PKONG_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.2" name="kd4_PKONG_4.2" />
        4.2
        </label><br>
        <label for="kd4_PKONG_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.3" name="kd4_PKONG_4.3" />
        4.3
        </label><br>
        <label for="kd4_PKONG_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.4" name="kd4_PKONG_4.4" />
        4.4
        </label><br>
        <label for="kd4_PKONG_4.5">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.5" name="kd4_PKONG_4.5" />
        4.5
        </label><br>
        <label for="kd4_PKONG_4.6">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.6" name="kd4_PKONG_4.6" />
        4.6
        </label><br>
        <label for="kd4_PKONG_4.7">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.7" name="kd4_PKONG_4.7" />
        4.7
        </label>
        
        </td>
        </tr>`;
        elkkm += `<tr><td>PKONG</td><td contenteditable="true" id="namamapelraport_PKONG">Pendidikan Agama Khonghucu dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PKONG">00</td></tr>`;
    }

    if (!bolislam && !bolkristen && !bolkatolik && !bolbudha && !bolhindu && !bolkhonghucu) {
        tragama += `
        <tr>
            <td>Tidak terdeteksi adanya isian Agama di kelas Anda</td>
            <td>???</td>
            <td>Silakan lengkapi data siswa Anda</td>
            <td>Silakan lengkapi data siswa Anda</td>
        </tr>
        `;
        elkkm += `<tr><td>AGAMA</td><td>Tidak terdeteksi data agama di Data Siswa Anda</td><td>00</td=></tr>`;
    }

    let ipsipa = "";
    if (idJenjang >= 4) {
        ipsipa = `
        <tr>
        <td>Ilmu Pengetahuan Alam</td>
        <td>IPA</td>
        <td>
        <label for="kd3_IPA_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.1" name="kd3_IPA_3.1" />
        3.1
    </label><br>
    <label for="kd3_IPA_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.2" name="kd3_IPA_3.2" />
        3.2
        </label><br>
    <label for="kd3_IPA_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.3" name="kd3_IPA_3.3" />
        3.3
        </label><br>
    <label for="kd3_IPA_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.4" name="kd3_IPA_3.4" />
        3.4
    </label><br>
    <label for="kd3_IPA_3.5">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.5" name="kd3_IPA_3.5" />
        3.5
    </label><br>
    <label for="kd3_IPA_3.6">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.6" name="kd3_IPA_3.6" />
        3.6
        </label><br>
    <label for="kd3_IPA_3.7">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.7" name="kd3_IPA_3.7" />
        3.7
        </label><br>
    <label for="kd3_IPA_3.8">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.8" name="kd3_IPA_3.8" />
        3.8
    </label><br>
    <label for="kd3_IPA_3.9">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.9" name="kd3_IPA_3.9" />
        3.9
</label>
    
 
        </td><td>
        <label for="kd4_IPA_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.1" name="kd4_IPA_4.1" />
        4.1
    </label><br>
    <label for="kd4_IPA_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.2" name="kd4_IPA_4.2" />
        4.2
        </label><br>
    <label for="kd4_IPA_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.3" name="kd4_IPA_4.3" />
        4.3
        </label><br>
    <label for="kd4_IPA_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.4" name="kd4_IPA_4.4" />
        4.4
    </label><br>
    <label for="kd4_IPA_4.5">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.5" name="kd4_IPA_4.5" />
        4.5
    </label><br>
    <label for="kd4_IPA_4.6">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.6" name="kd4_IPA_4.6" />
        4.6
        </label><br>
    <label for="kd4_IPA_4.7">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.7" name="kd4_IPA_4.7" />
        4.7
        </label><br>
    <label for="kd4_IPA_4.8">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.8" name="kd4_IPA_4.8" />
        4.8
    </label><br>
    <label for="kd4_IPA_4.9">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.9" name="kd4_IPA_4.9" />
        4.9
    </label><br>
        </td>

    </tr> 
    <tr>    
        <td>Ilmu Pengetahuan Sosial</td>
        <td>IPS</td>
        <td>
        <label for="kd3_IPS_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_IPS_3.1" name="kd3_IPS_3.1" />
        3.1
    </label><br>
    <label for="kd3_IPS_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_IPS_3.2" name="kd3_IPS_3.2" />
        3.2
        </label><br>
    <label for="kd3_IPS_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_IPS_3.3" name="kd3_IPS_3.3" />
        3.3
        </label><br>
    <label for="kd3_IPS_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_IPS_3.4" name="kd3_IPS_3.4" />
        3.4
    </label><br>
        </td>
        <td>
        <label for="kd4_IPS_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_IPS_4.1" name="kd4_IPS_4.1" />
        4.1
    </label><br>
    <label for="kd4_IPS_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_IPS_4.2" name="kd4_IPS_4.2" />
        4.2
        </label><br>
    <label for="kd4_IPS_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_IPS_4.3" name="kd4_IPS_4.3" />
        4.3
        </label><br>
    <label for="kd4_IPS_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_IPS_4.4" name="kd4_IPS_4.4" />
        4.4
    </label><br>
    
        </td>
    </tr> 
        `
    }

    tekshtml += `<div style="overflow-x:auto">
    <table class='versi-table' id="datadatakdraport">
    <tr >
        <th>Mata Pelajaran</th>
        <th>Kode Mapel</th>
        <th>Kompetensi Pengetahuan<br> (KI-3)</the>
        <th>Kompetensi Keterampilan <br>(KI-4)</thtyle>
    </tr>
    ${tragama}
    <tr>
        <td>Pendidikan Kewarganegaraan</td>
        <td>PKN</td>
    
        <td>
        <label for="kd3_PKN_3.1">
            <input class="cekliskd" type="checkbox" id="kd3_PKN_3.1" name="kd3_PKN_3.1" />
            3.1
        </label><br>
        <label for="kd3_PKN_3.2">
            <input class="cekliskd" type="checkbox" id="kd3_PKN_3.2" name="kd3_PKN_3.2" />
            3.2
            </label><br>
        <label for="kd3_PKN_3.3">
            <input class="cekliskd" type="checkbox" id="kd3_PKN_3.3" name="kd3_PKN_3.3" />
            3.3
            </label><br>
        <label for="kd3_PKN_3.4">
            <input class="cekliskd" type="checkbox" id="kd3_PKN_3.4" name="kd3_PKN_3.4" />
            3.4
        </label><br>
                   
       
    </td>
    <td>
            <label for="kd4_PKN_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PKN_4.1" name="kd4_PKN_4.1" />
        4.1
        </label><br>
        <label for="kd4_PKN_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PKN_4.2" name="kd4_PKN_4.2" />
        4.2
        </label><br>
        <label for="kd4_PKN_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PKN_4.3" name="kd4_PKN_4.3" />
        4.3
        </label><br>
        <label for="kd4_PKN_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PKN_4.4" name="kd4_PKN_4.4" />
        4.4
        </label><br>
    
            </td>
        </tr>
    <tr>
        <td> Bahasa Indonesia
        </td><td>BINDO</td><td>
        <label for="kd3_BINDO_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.1" name="kd3_BINDO_3.1" />
        3.1
    </label><br>
    <label for="kd3_BINDO_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.2" name="kd3_BINDO_3.2" />
        3.2
        </label><br>
    <label for="kd3_BINDO_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.3" name="kd3_BINDO_3.3" />
        3.3
        </label><br>
    <label for="kd3_BINDO_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.4" name="kd3_BINDO_3.4" />
        3.4
    </label><br>
    <label for="kd3_BINDO_3.5">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.5" name="kd3_BINDO_3.5" />
        3.5
    </label><br>
    <label for="kd3_BINDO_3.6">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.6" name="kd3_BINDO_3.6" />
        3.6
        </label><br>
    <label for="kd3_BINDO_3.7">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.7" name="kd3_BINDO_3.7" />
        3.7
        </label><br>
    <label for="kd3_BINDO_3.8">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.8" name="kd3_BINDO_3.8" />
        3.8
    </label><br>
    <label for="kd3_BINDO_3.9">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.9" name="kd3_BINDO_3.9" />
        3.9
    </label><br>
    <label for="kd3_BINDO_3.10">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.10" name="kd3_BINDO_3.10" />
        3.10
        </label><br>
    <label for="kd3_BINDO_3.11">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.11" name="kd3_BINDO_3.11" />
        3.11
        </label><br>
 
        </td><td>
        <label for="kd4_BINDO_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.1" name="kd4_BINDO_4.1" />
        4.1
    </label><br>
    <label for="kd4_BINDO_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.2" name="kd4_BINDO_4.2" />
        4.2
        </label><br>
    <label for="kd4_BINDO_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.3" name="kd4_BINDO_4.3" />
        4.3
        </label><br>
    <label for="kd4_BINDO_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.4" name="kd4_BINDO_4.4" />
        4.4
    </label><br>
    <label for="kd4_BINDO_4.5">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.5" name="kd4_BINDO_4.5" />
        4.5
    </label><br>
    <label for="kd4_BINDO_4.6">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.6" name="kd4_BINDO_4.6" />
        4.6
        </label><br>
    <label for="kd4_BINDO_4.7">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.7" name="kd4_BINDO_4.7" />
        4.7
        </label><br>
    <label for="kd4_BINDO_4.8">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.8" name="kd4_BINDO_4.8" />
        4.8
    </label><br>
    <label for="kd4_BINDO_4.9">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.9" name="kd4_BINDO_4.9" />
        4.9
    </label><br>
    <label for="kd4_BINDO_4.10">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.10" name="kd4_BINDO_4.10" />
        4.10
        </label><br>
    <label for="kd4_BINDO_4.11">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.11" name="kd4_BINDO_4.11" />
        4.11
        </label><br>
 
        </td>
    </tr>
    <tr>
        <td>Matematika</td>
        <td>MTK</td>
        <td>
        <label for="kd3_MTK_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.1" name="kd3_MTK_3.1" />
        3.1
    </label><br>
    <label for="kd3_MTK_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.2" name="kd3_MTK_3.2" />
        3.2
        </label><br>
    <label for="kd3_MTK_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.3" name="kd3_MTK_3.3" />
        3.3
        </label><br>
    <label for="kd3_MTK_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.4" name="kd3_MTK_3.4" />
        3.4
    </label><br>
    <label for="kd3_MTK_3.5">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.5" name="kd3_MTK_3.5" />
        3.5
    </label><br>
    <label for="kd3_MTK_3.6">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.6" name="kd3_MTK_3.6" />
        3.6
        </label><br>
    <label for="kd3_MTK_3.7">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.7" name="kd3_MTK_3.7" />
        3.7
        </label><br>
    <label for="kd3_MTK_3.8">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.8" name="kd3_MTK_3.8" />
        3.8
    </label><br>
    <label for="kd3_MTK_3.9">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.9" name="kd3_MTK_3.9" />
        3.9
    </label><br>
    <label for="kd3_MTK_3.10">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.10" name="kd3_MTK_3.10" />
        3.10
        </label><br>
    <label for="kd3_MTK_3.11">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.11" name="kd3_MTK_3.11" />
        3.11
        </label><br>
<label for="kd3_MTK_3.12">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.12" name="kd3_MTK_3.12" />
        3.12
        </label><br>
    <label for="kd3_MTK_3.13">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.13" name="kd3_MTK_3.13" />
        3.13
        </label><br>
 
        </td>
        <td>
        <label for="kd4_MTK_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.1" name="kd4_MTK_4.1" />
        4.1
    </label><br>
    <label for="kd4_MTK_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.2" name="kd4_MTK_4.2" />
        4.2
        </label><br>
    <label for="kd4_MTK_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.3" name="kd4_MTK_4.3" />
        4.3
        </label><br>
    <label for="kd4_MTK_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.4" name="kd4_MTK_4.4" />
        4.4
    </label><br>
    <label for="kd4_MTK_4.5">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.5" name="kd4_MTK_4.5" />
        4.5
    </label><br>
    <label for="kd4_MTK_4.6">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.6" name="kd4_MTK_4.6" />
        4.6
        </label><br>
    <label for="kd4_MTK_4.7">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.7" name="kd4_MTK_4.7" />
        4.7
        </label><br>
    <label for="kd4_MTK_4.8">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.8" name="kd4_MTK_4.8" />
        4.8
    </label><br>
    <label for="kd4_MTK_4.9">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.9" name="kd4_MTK_4.9" />
        4.9
    </label><br>
    <label for="kd4_MTK_4.10">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.10" name="kd4_MTK_4.10" />
        4.10
        </label><br>
    <label for="kd4_MTK_4.11">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.11" name="kd4_MTK_4.11" />
        4.11
        </label><br>
<label for="kd4_MTK_4.12">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.12" name="kd4_MTK_4.12" />
        4.12
        </label><br>
    <label for="kd4_MTK_4.13">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.13" name="kd4_MTK_4.13" />
        4.13
        </label><br>
 
        </td>
    </tr> 
   ${ipsipa}
    <tr>
        <td>Seni Budaya dan Prakarya</td>
        <td>SBDP</td>
        <td>
        <label for="kd3_SBDP_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_SBDP_3.1" name="kd3_SBDP_3.1" />
        3.1
    </label><br>
    <label for="kd3_SBDP_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_SBDP_3.2" name="kd3_SBDP_3.2" />
        3.2
        </label><br>
    <label for="kd3_SBDP_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_SBDP_3.3" name="kd3_SBDP_3.3" />
        3.3
        </label><br>
    <label for="kd3_SBDP_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_SBDP_3.4" name="kd3_SBDP_3.4" />
        3.4
    </label><br>
        </td>
        <td>
        <label for="kd4_SBDP_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_SBDP_4.1" name="kd4_SBDP_4.1" />
        4.1
    </label><br>
    <label for="kd4_SBDP_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_SBDP_4.2" name="kd4_SBDP_4.2" />
        4.2
        </label><br>
    <label for="kd4_SBDP_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_SBDP_4.3" name="kd4_SBDP_4.3" />
        4.3
        </label><br>
    <label for="kd4_SBDP_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_SBDP_4.4" name="kd4_SBDP_4.4" />
        4.4
    </label><br>
        </td>
    </tr> 
    <tr>
        <td>Pendidikan Jasmani dan Kesehatan<br>PJOK</td>
        <td>PJOK</td>
        <td>
        <label for="kd3_PJOK_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.1" name="kd3_PJOK_3.1" />
        3.1
    </label><br>
    <label for="kd3_PJOK_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.2" name="kd3_PJOK_3.2" />
        3.2
        </label><br>
    <label for="kd3_PJOK_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.3" name="kd3_PJOK_3.3" />
        3.3
        </label><br>
    <label for="kd3_PJOK_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.4" name="kd3_PJOK_3.4" />
        3.4
    </label><br>
    <label for="kd3_PJOK_3.5">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.5" name="kd3_PJOK_3.5" />
        3.5
    </label><br>
    <label for="kd3_PJOK_3.6">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.6" name="kd3_PJOK_3.6" />
        3.6
        </label><br>
    <label for="kd3_PJOK_3.7">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.7" name="kd3_PJOK_3.7" />
        3.7
        </label><br>
    <label for="kd3_PJOK_3.8">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.8" name="kd3_PJOK_3.8" />
        3.8
    </label><br>
    <label for="kd3_PJOK_3.9">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.9" name="kd3_PJOK_3.9" />
        3.9
    </label><br>
    <label for="kd3_PJOK_3.10">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.10" name="kd3_PJOK_3.10" />
        3.10
        </label><br>
   
 
        </td>
        <td>
        <label for="kd4_PJOK_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.1" name="kd4_PJOK_4.1" />
        4.1
    </label><br>
    <label for="kd4_PJOK_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.2" name="kd4_PJOK_4.2" />
        4.2
        </label><br>
    <label for="kd4_PJOK_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.3" name="kd4_PJOK_4.3" />
        4.3
        </label><br>
    <label for="kd4_PJOK_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.4" name="kd4_PJOK_4.4" />
        4.4
    </label><br>
    <label for="kd4_PJOK_4.5">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.5" name="kd4_PJOK_4.5" />
        4.5
    </label><br>
    <label for="kd4_PJOK_4.6">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.6" name="kd4_PJOK_4.6" />
        4.6
        </label><br>
    <label for="kd4_PJOK_4.7">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.7" name="kd4_PJOK_4.7" />
        4.7
        </label><br>
    <label for="kd4_PJOK_4.8">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.8" name="kd4_PJOK_4.8" />
        4.8
    </label><br>
    <label for="kd4_PJOK_4.9">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.9" name="kd4_PJOK_4.9" />
        4.9
    </label><br>
    <label for="kd4_PJOK_4.10">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.10" name="kd4_PJOK_4.10" />
        4.10
        </label><br>
        </td>
    </tr>
    <tr>
        <td>Bahasa Sunda</td>
        <td>BSUND</td>
        <td>
        <label for="kd3_BSUND_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.1" name="kd3_BSUND_3.1" />
        3.1
    </label><br>
    <label for="kd3_BSUND_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.2" name="kd3_BSUND_3.2" />
        3.2
        </label><br>
    <label for="kd3_BSUND_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.3" name="kd3_BSUND_3.3" />
        3.3
        </label><br>
    <label for="kd3_BSUND_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.4" name="kd3_BSUND_3.4" />
        3.4
    </label><br>
    <label for="kd3_BSUND_3.5">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.5" name="kd3_BSUND_3.5" />
        3.5
    </label><br>
    <label for="kd3_BSUND_3.6">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.6" name="kd3_BSUND_3.6" />
        3.6
        </label><br>
    <label for="kd3_BSUND_3.7">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.7" name="kd3_BSUND_3.7" />
        3.7
        </label><br>
    <label for="kd3_BSUND_3.8">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.8" name="kd3_BSUND_3.8" />
        3.8
    </label><br>
    <label for="kd3_BSUND_3.9">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.9" name="kd3_BSUND_3.9" />
        3.9
    </label><br>
    
 
        </td>
        <td>
        <label for="kd4_BSUND_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.1" name="kd4_BSUND_4.1" />
        4.1
    </label><br>
    <label for="kd4_BSUND_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.2" name="kd4_BSUND_4.2" />
        4.2
        </label><br>
    <label for="kd4_BSUND_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.3" name="kd4_BSUND_4.3" />
        4.3
        </label><br>
    <label for="kd4_BSUND_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.4" name="kd4_BSUND_4.4" />
        4.4
    </label><br>
    <label for="kd4_BSUND_4.5">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.5" name="kd4_BSUND_4.5" />
        4.5
    </label><br>
    <label for="kd4_BSUND_4.6">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.6" name="kd4_BSUND_4.6" />
        4.6
        </label><br>
    <label for="kd4_BSUND_4.7">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.7" name="kd4_BSUND_4.7" />
        4.7
        </label><br>
    <label for="kd4_BSUND_4.8">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.8" name="kd4_BSUND_4.8" />
        4.8
    </label><br>
    <label for="kd4_BSUND_4.9">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.9" name="kd4_BSUND_4.9" />
        4.9
    </label><br>
    
        </td>
    </tr>
    </table></div>`

    kurikulum_kkm.innerHTML = `<h3>Data Kriteria Ketuntasan Minimal (KKM)</h3>
    <button class="w3-button w3-blue" onclick="fnprinttabelkkm('printtabelkkm,DATA KKM KELAS ${idJenjang}, SEMESTER ${idSemester} TAHUN PELAJARAN ${idTeksTapel},${StringTanggal(new Date())}')"><i class="fa fa-print"></i> Cetak</button>
   
    <hr/><div id="printtabelkkm"><center><table class="versi-table" id="ttttt">
        <tr>
            <th>Kode Mapel</th>
            <th>Identitas Mapel<br/><sub>Edit identitas mapel ini untuk identitas Mapel di Buku Raport</sub></th>
            <th>Nilai KKM</th>
        </tr>
        ${elkkm}
        <tr><td>PKN</td><td contenteditable="true" id="namamapelraport_PKN">Pendidikan Kewarganegaraan</td><td contenteditable="true" id="angkakkm_PKN">00</td></tr>
        <tr><td>BINDO</td><td contenteditable="true" id="namamapelraport_BINDO">Bahasa Indonesia</td><td contenteditable="true" id="angkakkm_BINDO">00</td></tr>
        <tr><td>MTK</td><td contenteditable="true" id="namamapelraport_MTK">Matematika</td><td contenteditable="true" id="angkakkm_MTK">00</td></tr>
        <tr><td>IPA</td><td contenteditable="true" id="namamapelraport_IPA">Ilmu Pengetahuan Alam</td><td contenteditable="true" id="angkakkm_IPA">00</td></tr>
        <tr><td>IPS</td><td contenteditable="true" id="namamapelraport_IPS">Ilmu Pengetahuan Sosial</td><td contenteditable="true" id="angkakkm_IPS">00</td></tr>
        <tr><td>PJOK</td><td contenteditable="true" id="namamapelraport_PJOK">Pendidikan Jasmani, Olahraga, dan Kesehatan</td><td contenteditable="true" id="angkakkm_PJOK">00</td></tr>
        <tr><td>SBDP</td><td contenteditable="true" id="namamapelraport_SBDP">Seni Budaya dan Prakarya</td><td contenteditable="true" id="angkakkm_SBDP">00</td></tr>
        <tr><td>BSUND</td><td contenteditable="true" id="namamapelraport_BSUND">Bahasa Sunda</td><td contenteditable="true" id="angkakkm_BSUND">00</td></tr>
    </table></center></div>
    <button onclick="fnsimpanidkkm()" class="w3-button w3-green w3-right">Simpan Perubahan</button><hr/>
    Keterangan: <sub class="w3-text-blue">Di tabel ini, Anda dapat mengedit nama mata pelajaran yang akan ditampilkan di Buku Raport Siswa. Di sini pula, Anda dapat mengubah KKM masing-masing mata pelajaran yang nantinya setiap KD akan otomatis menyesuaikan angka KKM yang Anda Edit di KKM yang Anda unggah di UPLOAD DATA (Setelah mengeklik tombol SIMPAN)</sub>
    
    `

    let tas = "kelas" + idJenjang;
    await fetch(linkmateri + "&action=cekdkkm&tab=" + tas)
        .then(m => m.json())
        .then(k => {

            let statusunggah = (k.unggah == "Jenjang Kelas Anda sudah mengunggah KKM dan KD") ? true : false;
            let data = k.result;

            if (statusunggah) {

                let teks = "<hr/><div style='overflow-x:auto'><table class='versi-table w3-small tabelkkmkd'><tr><th>Mata Pelajaran</th><th>KD-3</th><th>Indikator KI-3 <br>(Pengetahuan)</th><th>KD-4</th><th>Indikator KI-4 <br>(Keterampilan)</th><th>KKM</th></tr>";
                for (i = 0; i < data.length; i++) {
                    let divelkkm = document.getElementById("angkakkm_" + data[i].mapel);
                    if (divelkkm !== null) {
                        divelkkm.innerHTML = data[i].kkm;
                    }
                    // teks += "<tr><td>" + data[i].mapel + "</td><td>" + data[i].kd3 + "</td><td contenteditable='true'>" + data[i].indikatorkd3 + "</td><td>" + data[i].kd4 + "</td><td  contenteditable='true'>" + data[i].indikatorkd4 + "</td><td  contenteditable='true'>" + data[i].kkm + "</td></tr>";
                    teks += `<tr><td>${data[i].mapel}</td><td>${data[i].kd3}</td><td contenteditable="true" id="deskripsikd3_${data[i].mapel}_${data[i].kd3}">${data[i].indikatorkd3}</td><td>${data[i].kd4}</td><td contenteditable="true" id="deskripsikd4_${data[i].mapel}_${data[i].kd4}">${data[i].indikatorkd4}</td><td contenteditable="true">${data[i].kkm}</td></tr>`;
                    let truekd3 = data[i].cekliskd3;
                    let truekd4 = data[i].cekliskd4;
                    let iddiv = "kd3_" + data[i].mapel + "_" + data[i].kd3;
                    let divnya = document.getElementById(iddiv);
                    if (divnya !== null) {
                        if (truekd3) {
                            divnya.checked = true;
                        } else {
                            divnya.checked = false;
                        }
                    }
                    let iddivv = "kd4_" + data[i].mapel + "_" + data[i].kd4;
                    let divnyaa = document.getElementById(iddivv);
                    if (divnyaa !== null) {
                        if (truekd4) {
                            divnyaa.checked = true;
                        } else {
                            divnyaa.checked = false;
                        }
                    }


                }

                pisahpisah.innerHTML = k.unggah + `<hr/><button class='w3-button w3-round-large w3-blue' onclick="datacekliskd()">Simpan</button><button class='w3-button w3-round-large w3-red' onclick="hapuskkmkd()">Hapus KKM dan KD</button><hr/>` + teks + "</table></div>";

            } else {
                pisahpisah.innerHTML = k.unggah + `<br/>Jika Anda belum mengunggah file KKM dan KD di server dan
                membutuhkan format filenya, silakan kunjungi Repository.</br><br /> Disana akan dijelaskan bagaimana caranya.<hr><label for="uploadcsv"><i class="fa fa-upload w3-button w3-blue w3-round-large"> Unggah File
                Format</i></label>
        <input type="file" onchange="uploadcsv()" id="uploadcsv" class="w3-hide" /><hr/>
        Berikut ini adalah contoh file KKM dan KD. Silakan unduh lalu Anda unggah pada tombol di atas, kemudian Anda edit (jika diperlukan);
        <table class='versi-table'>
            <tr>
                <th>Jenjang</th>
                <th>Aksi</th>
            </tr>
            <tr>
                <td> Kelas 1 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1OiOKNuU_KOLS5Osg8j9sPnaq7SsE7DI8&export=download' target='_blank'> UNDUH Kelas 1</a></button></td>
            </tr>
            <tr>
                <td> Kelas 2 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1LuSF4YRgNP1AXMxCfWUdzqw2dyk0L655&export=download' target='_blank'> UNDUH Kelas 2</a></button></td>
            </tr>
            <tr>
                <td> Kelas 3 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1QTa6pklrukQzuhurJU5AQGWDqautNQzO&export=download' target='_blank'> UNDUH Kelas 3</a></button></td>
            </tr>
             <tr>
                <td> Kelas 4 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=18-vYgLHb6CgSzmGsB2oloTbd3mH6-TvT&export=download' target='_blank'> UNDUH Kelas 4</a></button></td>
            </tr>
            <tr>
                <td> Kelas 5 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1mW1ag1e1V_DmhtO15xcSD7jH3o2N92SX&export=download' target='_blank'> UNDUH Kelas 5</a></button></td>
            </tr>
            <tr>
                <td> Kelas 6 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1xjM7DsTJCgN6DAqfblk0mi0sjcgvkPji&export=download' target='_blank'> UNDUH Kelas 6</a></button></td>
            </tr>
        </table>
        Keterangan:<br>
        <ul>
            <li>Silakan pilih salah satu file KKM dan KD di atas, lalu Unduh.  Kemudian file diunggah.
            </li><li>Sangat tidak disarankan Anda mengedit langsung dari filenya. Sebab akan mempengaruhi proses rekap nilai Raport
            </li><li>Anda boleh mengeditnya (jika berbeda dengan repository dari Tim Elamaso di Menu UPLOAD KURIKULUM. Di sana tabel KKM dan KD bisa diedit secara manual
            </li><li>Data Indikator pada file-file di tabel di atas adalah data indikator yang telah disusun oleh Tim ELamaso sesuai dengan PERMENDIKBUD No. 37 Tahun 2018
            </li>
        </ul>
        `
            }
            tabkd.innerHTML = "Kompetensi Dasar"
            tabkkm.innerHTML = "KKM"
            tabupl.innerHTML = "Upload Kurikulum"

        })
        .catch(er => {
            console.log(er);
            tabkd.innerHTML = "Kompetensi Dasar !"
            tabkkm.innerHTML = "KKM !"
            tabupl.innerHTML = "Upload Kurikulum !"
        })

    divkurikulum.innerHTML = tekshtml;



};