/*
alurnya bagaimana?
- cek semua data niai PH, PTS, dan PAK/PAS
- cek semua data ceklis kd
- buat array nama mapel, kode mapel yang berlaku
*/

let tabolahnilai = document.querySelector(".tabolahnilai");
let tabeldatakd = document.getElementById("datadatakdraport");

let tabpetunjukraport = document.querySelector(".tabpetunjukraport")

let divolahnilai = document.getElementById("olahnilai");
let divdasarhukum = document.getElementById("petunjukraport");

tabolahnilai.addEventListener("click", function () {

    isikanrentang()

    //let tes = koleksiarraymapelaktif();
    // console.log(tes);
})

tabpetunjukraport.addEventListener("click", function () {

    ;
})

const koleksiarraymapelaktif = () => {
    let restult = [];
    let min = 100;
    let tabel = document.getElementById("datadatakdraport").rows.length;
    for (i = 1; i < tabel; i++) {
        let isi = document.getElementById("datadatakdraport").rows[i].cells[1].textContent;
        let angka = document.getElementById("angkakkm_" + isi).innerHTML;
        let inMin = (isi == "") ? 0 : parseInt(angka);
        if (min >= inMin) {
            min = inMin
        }
        restult.push(isi)
    }
    let data = {}
    data.kodemapel = restult;
    data.kkmmin = min;

    return data
}

const accordiontab = (evt, cityName) => {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("accordkonten");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("accordbutton");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" activee", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " activee";

}

const simulasinilai = () => {
    let nsimulasi = document.querySelector(".inputsimulasi").value;
    if (nsimulasi > 100) {
        alert('Batas nilai hanya sampai 100');
        document.querySelector(".inputsimulasi").value = 0;
        return;

    }
    let data = fn_predikatkriteria(nsimulasi);
    document.querySelector(".resultsimulasi").innerHTML = data;
    //console.log(data)


}

const fn_predikatkriteria = (x) => {

    let tabel = document.querySelector(".tabelkriteriadanrentangkkm");
    let nilai = parseFloat(x);
    let minA = parseInt(tabel.rows[1].cells[1].innerHTML);//maks A = 100
    let minB = parseInt(tabel.rows[2].cells[1].innerHTML);

    let minC = parseInt(tabel.rows[3].cells[1].innerHTML);

    let maxB = parseInt(tabel.rows[2].cells[2].innerHTML);
    let maxC = parseInt(tabel.rows[3].cells[2].innerHTML);
    let nD = parseInt(tabel.rows[4].cells[1].innerHTML);
    //console.log(nD);
    let result = ""
    if (nilai <= 100 && nilai > minA) {
        result = tabel.rows[1].cells[0].innerHTML;
    } else if (nilai > minB && nilai <= maxB) {
        result = tabel.rows[2].cells[0].innerHTML;
    } else if (nilai > minC && nilai <= maxC) {
        result = tabel.rows[3].cells[0].innerHTML;
    } else if (nilai <= nD) {
        result = tabel.rows[4].cells[0].innerHTML;
    } else {
        result = "Kriteria Tidak dikenal"
    }
    return result

}

const isikanrentang = () => {
    let n_d = parseInt(document.querySelector(".kkmsatuanpendidikan").textContent);
    document.querySelectorAll(".a_kkm").forEach(k => k.innerHTML = n_d);
    let n_rentang = Math.round((100 - n_d) / 3);
    document.querySelector("#a_rentangkkm").innerHTML = n_rentang;
    let tabel = document.querySelector(".tabelkriteriadanrentangkkm");
    let minAmaxB = 100 - parseFloat(n_rentang);
    let minBmaxC = minAmaxB - parseFloat(n_rentang);

    tabel.rows[1].cells[1].innerHTML = minAmaxB;
    tabel.rows[2].cells[2].innerHTML = minAmaxB;
    tabel.rows[2].cells[1].innerHTML = minBmaxC;
    tabel.rows[3].cells[2].innerHTML = minBmaxC;

}

// Tab tab Accordion:
let tabacrdk1 = document.querySelector(".tabacrdk1");
tabacrdk1.addEventListener("click", function () {
    let div = document.getElementById("tabeldatanilaiki1");
    let datanama = jsondatasiswa.map(k => k.pd_nama);

    let tekshtmlserver = `Indikator (Deskripsi) Raport (silakan edit/tambah sesuai kebutuhan) Lihat dokumen Panduan Penilaian Halaman 21 atau dokumen 1 di sekolah Anda.
     <table class="w3-table-all garis add_indikatorindikatork1">
    <thead>
    <tr>
        <th>
            Indikator Raport Keterampilan Spritual (KI-1)
        </th>
        <th>
            Sikap
        </th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td contenteditable="true">berdoa sebelum belajar</td>
        <td contenteditable="true">Ketaatan Beribadah</td>
    </tr>
    <tr>
        <td contenteditable="true">meyakini kebesaran Allah</td>
        <td contenteditable="true">Ketaatan Beribadah</td>
    </tr>
    <tr>
        <td contenteditable="true">memberi salam pada setiap awal dan akhir kegiatan</td>
        <td contenteditable="true">ketaatan Beribadah</td>
    </tr>
    <tr>
        <td contenteditable="true">bersyukur atas nikmat dan karunia Tuhan Yang Maha Esa</td>
        <td contenteditable="true">Berperilaku syukur</td>
    </tr>
    <tr>
        <td contenteditable="true">mensyukuri kemampuan manusia dalam mengendalikan diri</td>
        <td contenteditable="true">Berperilaku Syukur</td>
    </tr>
    <tr>
        <td contenteditable="true">bersyukur ketika berhasil mengerjakan sesuatu</td>
        <td contenteditable="true">Berperilaku Syukur</td>
    </tr>
    <tr>
        <td contenteditable="true">berserah diri (tawakal) kepada Tuhan setelah berikhtiar atau melakukan usaha</td>
        <td contenteditable="true">Berperilaku Syukur</td>
    </tr>
    <tr>
        <td contenteditable="true">memelihara hubungan baik dengan sesama umat</td>
        <td contenteditable="true">Toleransi dalam beribadah</td>
    </tr>
    <tr>
        <td contenteditable="true">menghormati orang lain yang menjalankan ibadah sesuai dengan agamanya</td>
        <td contenteditable="true">Toleransi dalam beribadah</td>
    </tr>
    <tr>
        <td contenteditable="true">...</td>
        <td contenteditable="true">...</td>
    </tr>
    <tr>
        <td contenteditable="true">...</td>
        <td contenteditable="true">...</td>
    </tr>
    </tbody>
    </table>
    
    <h4>Rekapitulasi Jurnal Sikap Spritual (KI-1)</h4>
    Silakan lengkapi Rekapitulasi Jurnal Spiritual pada tabel di bawah ini:<hr/>
    <button class="w3-button w3-red w3-round-large w3-margin" onclick="exportk12('classtabelk1')"><i class="fa fa-file-excel-o"></i> Export Ms. Excel</button>
    <button class="w3-button w3-green w3-round-large w3-margin" onclick="importk12('classtabelk1')"><i class="fa fa-file-excel-o"></i> import Ms. Excel</button>
    <button class="w3-button w3-khaki simpanLSK1 w3-round-large w3-margin" onclick="saveLSK1()">Simpan di Server</button>
    <table class='w3-table-all garis classtabelk1'>
    <thead>
        <tr>
            <th>No</th>
            <th  style="position:sticky;position:-webkit-sticky;left:0px;">Nama Siswa</th>
            <th>Predikat Nilai</th>
            <th>Indikator Maksimal</th>
            <th>Indikator Minimal</th>
            <th>Aksi</th>
        </tr>
    </thead><tbody>
    `;
    let tekshtml = `Indikator (Deskripsi) Raport (silakan edit/tambah sesuai kebutuhan) Lihat dokumen Panduan Penilaian Halaman 21 atau dokumen 1 di sekolah Anda.
   <table class="w3-table-all garis add_indikatorindikatork1">
    <thead>
    <tr>
        <th>
            Indikator Raport Keterampilan Spritual (KI-1)
        </th>
        <th>
            Sikap
        </th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td contenteditable="true">berdoa sebelum belajar</td>
        <td contenteditable="true">Ketaatan Beribadah</td>
    </tr>
    <tr>
        <td contenteditable="true">meyakini kebesaran Allah</td>
        <td contenteditable="true">Ketaatan Beribadah</td>
    </tr>
    <tr>
        <td contenteditable="true">memberi salam pada setiap awal dan akhir kegiatan</td>
        <td contenteditable="true">ketaatan Beribadah</td>
    </tr>
    <tr>
        <td contenteditable="true">bersyukur atas nikmat dan karunia Tuhan Yang Maha Esa</td>
        <td contenteditable="true">Berperilaku syukur</td>
    </tr>
    <tr>
        <td contenteditable="true">mensyukuri kemampuan manusia dalam mengendalikan diri</td>
        <td contenteditable="true">Berperilaku Syukur</td>
    </tr>
    <tr>
        <td contenteditable="true">bersyukur ketika berhasil mengerjakan sesuatu</td>
        <td contenteditable="true">Berperilaku Syukur</td>
    </tr>
    <tr>
        <td contenteditable="true">berserah diri (tawakal) kepada Tuhan setelah berikhtiar atau melakukan usaha</td>
        <td contenteditable="true">Berperilaku Syukur</td>
    </tr>
    <tr>
        <td contenteditable="true">memelihara hubungan baik dengan sesama umat</td>
        <td contenteditable="true">Toleransi dalam beribadah</td>
    </tr>
    <tr>
        <td contenteditable="true">menghormati orang lain yang menjalankan ibadah sesuai dengan agamanya</td>
        <td contenteditable="true">Toleransi dalam beribadah</td>
    </tr>
    <tr>
        <td contenteditable="true">...</td>
        <td contenteditable="true">...</td>
    </tr>
    <tr>
        <td contenteditable="true">...</td>
        <td contenteditable="true">...</td>
    </tr>
    </tbody>
    </table>
    
    <h4>Rekapitulasi Jurnal Sikap Spritual (KI-1)</h4>
    Silakan lengkapi Rekapitulasi Jurnal Spiritual pada tabel di bawah ini:<hr/>
    <button class="w3-button w3-red w3-round-large w3-margin" onclick="exportk12('classtabelk1')"><i class="fa fa-file-excel-o"></i> Export Ms. Excel</button>
    <button class="w3-button w3-green w3-round-large w3-margin" onclick="importk12('classtabelk1')"><i class="fa fa-file-excel-o"></i> import Ms. Excel</button>
    <button class="w3-button w3-khaki simpanLSK1 w3-round-large w3-margin" onclick="saveLSK1()">Simpan di Server</button>
    <table class='versi-table classtabelk1'>
    <thead>
        <tr>
            <th>No</th>
            <th  style="position:sticky;position:-webkit-sticky;left:0px;">Nama Siswa</th>
            <th>Predikat Nilai</th>
            <th>Indikator Maksimal</th>
            <th>Indikator Minimal</th>
            <th>Aksi</th>
        </tr>
    </thead><tbody>
    `;
    for (i = 0; i < datanama.length; i++) {
        tekshtml += `<tr>
            <td>${i + 1}</td>
            <td   style="position:sticky;position:-webkit-sticky;left:0px;">${datanama[i]}</td>
            <td></td>
            <td></td>
            <td></td>
            <td><button title="Tambahkan indikator" onclick="modtambahindikator('k1',${i})">+</button>
            
            <button title="Hapus indikator ini" onclick="hapusindikator('k1',${i})"><i class="fa fa-trash"></i></button></td>

        </tr>`;

    }
    tekshtml += `</tbody></table><hr/>
    
    <hr/>
   `;


    // div.innerHTML = tekshtml;
    div.innerHTML = "<i class='fa fa-spin fa-spinner'></i> Sedang mengambil data di Server. Mohon tunggu ....";

    let tab = "rekapjurnalk1";

    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    fetch(constlinknilai + "?action=getdatafromtab" + param)
        .then(m => m.json())
        .then(k => {

            if (k.result == 0) {
                alert("Anda belum pernah membuat data Rekapitulasi Jurnal Kompetensi Spiritual (KI-1)");
                div.innerHTML = tekshtml;
            } else {
                //div.innerHTML = tekshtmlserver;
                for (j = 0; j < k.data.length; j++) {
                    tekshtmlserver += `<tr>
                    <td>${k.data[j]["nourut"]}</td>
                    <td   style="position:sticky;position:-webkit-sticky;left:0px;">${k.data[j]["namasiswa"]}</td>
                    <td>${k.data[j]["nilaipredikat"]}</td>
                    <td>${k.data[j]["indikmaks"]}</td>
                    <td>${k.data[j]["indikmin"]}</td>
                    <td><button title="Tambahkan indikator" onclick="modtambahindikator('k1',${j})">+</button>
                    
            <button title="Hapus indikator ini" onclick="hapusindikator('k1',${j})"><i class="fa fa-trash"></i></button></td>
        
                </tr>`;
                }
                tekshtmlserver += `</tbody></table><hr/>
                
                <hr/>
               `;
                div.innerHTML = tekshtmlserver
            }
        })
        .catch(er => console.log(er))

});
const hapusindikator = (kompetensi, ii) => {
    let tabelkki = document.querySelector(".classtabel" + kompetensi);
    //hapus kriteria maks
    let i = ii + 1;
    tabelkki.rows[i].cells[2].innerHTML = "";
    tabelkki.rows[i].cells[3].innerHTML = "";
    tabelkki.rows[i].cells[4].innerHTML = "";

}

const modtambahindikator = (kompetensi, ii) => {
    let i = ii + 1;
    // console.log(i)
    let dataindikator = [];
    let tabel = document.querySelector(".add_indikatorindikator" + kompetensi);
    let tabelkki = document.querySelector(".classtabel" + kompetensi);
    let namasiswa = tabelkki.rows[i].cells[1].innerHTML;
    let judulmodal = document.querySelector(".judul_addindikatorkompetensi");
    let divuntuktabel = document.querySelector(".tabel_indikatorindikatorraport");
    let simulasinama = document.getElementById("simulasinama");
    let tabelsimulasi = document.querySelector(".simulasiraportkki");
    tabelsimulasi.rows[1].cells[0].innerHTML = "";
    tabelsimulasi.rows[1].cells[1].innerHTML = "";
    let juduljudul = (kompetensi == "k1") ? "Kompetensi Spiritual (KI-1)" : "Kompetensi Sosial (KI-2)";
    judulmodal.innerHTML = "Tambahkan Indikator " + juduljudul + "<br>untuk Ananda ";
    simulasinama.innerHTML = namasiswa;



    let lr = tabel.rows;
    for (r = 1; r < lr.length; r++) {
        let perbaris = lr[r];
        let isi = []
        // for (s = 0; s < perbaris.cells.length; s++) {
        let d = perbaris.cells[0].innerHTML;

        //------------ butir
        isi.push(d);

        dataindikator.push(isi)
    }

    //alert(i);
    let predikat = fn_datapredikat();


    document.getElementById("add_tambahindikatorkomepentsi").style.display = "block";
    let htmlteks = `
    <select class="w3-select w3-border w3-border-teal w3-centered" id="selectindikatorkompetensi" >
    `;
    let datapredikatada = tabelkki.rows[i].cells[2].innerHTML;
    for (s = 0; s < 4; s++) {
        if (datapredikatada !== "") {
            if (predikat[s] == datapredikatada) {
                htmlteks += `<option selected value="${predikat[s]}">${predikat[s]}</option>`;

            } else {

                htmlteks += `<option value="${predikat[s]}">${predikat[s]}</option>`;
            }
        } else {
            htmlteks += `<option value="${predikat[s]}">${predikat[s]}</option>`;

        }
    }

    htmlteks += `</select>`;
    divuntuktabel.innerHTML = htmlteks;
    //berittahu kalo sudah diisi di sel yang bersangkutan ada, maka tinggal tambahkan selected
    //let select = document.getElementById("selectindikatorkompetensi");
    //console.log(datapredikatada);
    // if (datapredikatada !== "") {
    //     select.value = datapredikatada;
    // }
    //
    let htmltabel = `<table class="w3-table-all garis kliktabelindikator w3-tiny">
    <tr>
        <th>Index</th>
        <th>Indikator</th>
        <th>Tambahkan Indikator Maksimal</th>
        <th>Tambahkan Indikator Minimal</th>
    </tr>
   `;
    let arrayindikmax = tabelkki.rows[i].cells[3].innerHTML.replace(/\s+/gi, "").split(",");
    // console.log(arrayindikmax)
    let arrayindikmin = tabelkki.rows[i].cells[4].innerHTML.replace(/\s+/gi, "").split(",");;
    //console.log(arrayindikmin)

    for (j = 0; j < dataindikator.length; j++) {
        let tombolmak = (arrayindikmax.indexOf(j.toString()) > -1) ? "sudah ditambahkan" : `<button onclick="kdmaks('${kompetensi}',${i},${j})">+</button>`;
        let tombolmin = (arrayindikmin.indexOf(j.toString()) > -1) ? "sudah ditambahkan" : `<button onclick="kdmin('${kompetensi}',${i},${j})">+</button>`;

        htmltabel += `<tr>
            <td>${j}
            <td>${dataindikator[j]}</td>
            <td class="w3-center">${tombolmak}</td>
            <td class="w3-center">${tombolmin}</td>
       </tr>`;
    }
    htmltabel += `</table>`;
    divuntuktabel.innerHTML += `<hr/>${htmltabel}`;
    document.getElementById("simulasikanpredikat").setAttribute("onclick", `simulasikanpredikat('${kompetensi}',${i})`);
    document.getElementById("tombol_addindikatorkompetensi").setAttribute("onclick", `simpanindikatorkki('${kompetensi}',${i})`);


}

const fn_datapredikat = () => {
    let tabelpredikat = document.querySelector(".tabelkriteriadanrentangkkm");
    let arr = [];
    let lr = tabelpredikat.rows;
    for (r = 1; r < lr.length; r++) {
        let perbaris = lr[r];
        let isi = []
        // for (s = 0; s < perbaris.cells.length; s++) {
        let d = perbaris.cells[0].innerHTML;

        //---------
        arr.push(d)
    }
    return arr

}

const simulasikanpredikat = (kompetensi, r) => {
    let tabel = document.querySelector(".simulasiraportkki");
    let tabeldatakki = document.querySelector(".classtabel" + kompetensi);
    let tabeldeskripsi = document.querySelector(".kliktabelindikator");

    let namasiswa = tabeldatakki.rows[r].cells[1].innerHTML;
    let arrayindikmax = tabeldatakki.rows[r].cells[3].innerHTML.replace(/\s+/gi, "").split(",");
    let arrayindikmin = tabeldatakki.rows[r].cells[4].innerHTML.replace(/\s+/gi, "").split(",");;

    //let select = document.getElementById("selectindikatorkompetensi");
    // select.value = datapredikatada;
    let opsi = document.getElementById("selectindikatorkompetensi").options;
    let indek = document.getElementById("selectindikatorkompetensi").selectedIndex;

    tabel.rows[1].cells[0].innerHTML = opsi[indek].value;

    let teksall = `<b class="w3-text-blue">Ananda</b> ${namasiswa} `;
    let teksmaks = `<b class="w3-text-blue">selalu</b> `;
    let teksmin = `<b class="w3-text-blue">mulai tampak dalam</b> `;
    for (a = 0; a < arrayindikmax.length; a++) {
        teksmaks += tabeldeskripsi.rows[parseInt(arrayindikmax[a]) + 1].cells[1].innerHTML + ", ";
    }
    for (b = 0; b < arrayindikmin.length; b++) {
        teksmin += tabeldeskripsi.rows[parseInt(arrayindikmin[b]) + 1].cells[1].innerHTML + ", ";
    }
    teksall += teksmaks + teksmin;
    tabel.rows[1].cells[1].innerHTML = teksall;

}

const kdmaks = (kompetensi, id, indek) => {
    let i = parseInt(id);
    let indekx = indek + 1;
    let tabel = document.querySelector(".classtabel" + kompetensi);
    let tabelmodal = document.querySelector(".kliktabelindikator");
    let indikmax = tabel.rows[i].cells[3].innerHTML;
    let teksmaks = ""
    if (indikmax == "") {
        teksmaks = indek;
    } else {
        teksmaks += indikmax + ", " + indek;
    }


    tabel.rows[i].cells[3].innerHTML = teksmaks;

    tabelmodal.rows[indekx].cells[2].innerHTML = "sudah ditambahkan";// <button onclick(";
    // tabelmodal.rows[indekx].cells[2].innerHTML = `Sudah ditambakan <button onclick="hapuskdmaks('${kompetensi}',${id},${index})"><i class="fa fa-trash"></i></button>`;

}


const kdmin = (kompetensi, id, indek) => {
    let i = parseInt(id);
    let indekx = indek + 1;
    let tabel = document.querySelector(".classtabel" + kompetensi);
    let tabelmodal = document.querySelector(".kliktabelindikator");
    let indikmin = tabel.rows[i].cells[4].innerHTML;
    let teksmaks = ""
    if (indikmin == "") {
        teksmaks = indek;
    } else {
        teksmaks += indikmin + ", " + indek;
    }

    tabel.rows[i].cells[4].innerHTML = teksmaks;


    tabelmodal.rows[indekx].cells[3].innerHTML = "sudah ditambahkan";


}

const simpanindikatorkki = (kompetensi, i) => {
    let tabel = document.querySelector(".classtabel" + kompetensi);
    let opsi = document.getElementById("selectindikatorkompetensi").options;
    let indek = document.getElementById("selectindikatorkompetensi").selectedIndex;
    let modal = document.getElementById("add_tambahindikatorkomepentsi");

    tabel.rows[parseInt(i)].cells[2].innerHTML = opsi[indek].value;
    modal.style.display = "none";


}
let tabackriteria = document.querySelector(".tabacrdkriteria");
tabackriteria.addEventListener("click", function () {
    isikanrentang()
})

let tabacrdk2 = document.querySelector(".tabacrdk2");
tabacrdk2.addEventListener("click", function () {
    let div = document.getElementById("tabeldatanilaiki2");
    let datanama = jsondatasiswa.map(k => k.pd_nama);
    let tekshtmlserver = `Indikator (Deskripsi) Raport (silakan edit/tambah sesuai kebutuhan) Lihat dokumen Panduan Penilaian Halaman 23 atau dokumen 1 di sekolah Anda.
    <table class="w3-table-all garis add_indikatorindikatork2">
    <thead>
    <tr>
        <th>
            Indikator Raport Keterampilan Spritual (KI-2)
        </th>
        <th>
            Sikap
        </th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td contenteditable="true">tidak pernah berbohong, tidak mencontek, dan sikap jujur lainnya</td>
        <td contenteditable="true">Jujur</td>
    </tr>
    <tr>
        <td contenteditable="true">mengikuti peraturan dan tata tertib sekolah</td>
        <td contenteditable="true">Disiplin</td>
    </tr>
    <tr>
        <td contenteditable="true">mengerjakan tugas/PR tepat waktu</td>
        <td contenteditable="true">Disiplin</td>
    </tr>
    <tr>
        <td contenteditable="true">menyelesaikan piket, mengerjakan tugas/PR</td>
        <td contenteditable="true">Tanggung Jawab</td>
    </tr>
    <tr>
        <td contenteditable="true">mengakui kesalahan, tidak menyalahkan orang lain</td>
        <td contenteditable="true">Tanggung Jawab</td>
    </tr>
    <tr>
        <td contenteditable="true">menghomati orang lain dan menghormati cara bicara dengan tepat</td>
        <td contenteditable="true">Santun</td>
    </tr>
    <tr>
        <td contenteditable="true">ramah, ceria, bersahabat, dan selalu tersenyum</td>
        <td contenteditable="true">Santun</td>
    </tr>
    <tr>
        <td contenteditable="true">ikut berperan serta dan aktif dalam kegiatan sosial di lingkungan sekitar</td>
        <td contenteditable="true">Peduli</td>
    </tr>
    <tr>
        <td contenteditable="true">menunjukkan rasa peduli terhadap teman yang lain</td>
        <td contenteditable="true">Peduli</td>
    </tr>
    <tr>
        <td contenteditable="true">...</td>
        <td contenteditable="true">...</td>
    </tr>
    <tr>
        <td contenteditable="true">...</td>
        <td contenteditable="true">...</td>
    </tr>
    </tbody>
    </table>
    
    <h4>Rekapitulasi Jurnal Sikap Sosial (KI-2)</h4>
    Silakan lengkapi Rekapitulasi Jurnal Sosial pada tabel di bawah ini:<hr/>
    <button class="w3-button w3-red w3-round-large w3-margin" onclick="exportk12('classtabelk2')"><i class="fa fa-file-excel-o"></i> Export Ms. Excel</button>
    <button class="w3-button w3-green w3-round-large w3-margin" onclick="importk12('classtabelk2')"><i class="fa fa-file-excel-o"></i> import Ms. Excel</button>
    <button class="w3-button w3-orange w3-round-large w3-margin" onclick="saveLSK2()">Simpan di Server</button>
    <table class='versi-table classtabelk2'>
    <thead>
        <tr>
            <th>No</th>
            <th style="position:sticky;position:-webkit-sticky;left:0px;">Nama Siswa</th>
            <th>Predikat Nilai</th>
            <th>Indikator Maksimal</th>
            <th>Indikator Minimal</th>
            <th>Aksi</th>
        </tr>
    </thead><tbody>
    `;
    let tekshtml = `Indikator (Deskripsi) Raport (silakan edit/tambah sesuai kebutuhan) Lihat dokumen Panduan Penilaian Halaman 23 atau dokumen 1 di sekolah Anda.
    <table class="w3-table-all garis add_indikatorindikatork2">
    <thead>
    <tr>
        <th>
            Indikator Raport Keterampilan Spritual (KI-2)
        </th>
        <th>
            Sikap
        </th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td contenteditable="true">tidak pernah berbohong, tidak mencontek, dan sikap jujur lainnya</td>
        <td contenteditable="true">Jujur</td>
    </tr>
    <tr>
        <td contenteditable="true">mengikuti peraturan dan tata tertib sekolah</td>
        <td contenteditable="true">Disiplin</td>
    </tr>
    <tr>
        <td contenteditable="true">mengerjakan tugas/PR tepat waktu</td>
        <td contenteditable="true">Disiplin</td>
    </tr>
    <tr>
        <td contenteditable="true">menyelesaikan piket, mengerjakan tugas/PR</td>
        <td contenteditable="true">Tanggung Jawab</td>
    </tr>
    <tr>
        <td contenteditable="true">mengakui kesalahan, tidak menyalahkan orang lain</td>
        <td contenteditable="true">Tanggung Jawab</td>
    </tr>
    <tr>
        <td contenteditable="true">menghomati orang lain dan menghormati cara bicara dengan tepat</td>
        <td contenteditable="true">Santun</td>
    </tr>
    <tr>
        <td contenteditable="true">ramah, ceria, bersahabat, dan selalu tersenyum</td>
        <td contenteditable="true">Santun</td>
    </tr>
    <tr>
        <td contenteditable="true">ikut berperan serta dan aktif dalam kegiatan sosial di lingkungan sekitar</td>
        <td contenteditable="true">Peduli</td>
    </tr>
    <tr>
        <td contenteditable="true">menunjukkan rasa peduli terhadap teman yang lain</td>
        <td contenteditable="true">Peduli</td>
    </tr>
    <tr>
        <td contenteditable="true">...</td>
        <td contenteditable="true">...</td>
    </tr>
    <tr>
        <td contenteditable="true">...</td>
        <td contenteditable="true">...</td>
    </tr>
    </tbody>
    </table>
    
    <h4>Rekapitulasi Jurnal Sikap Sosial (KI-2)</h4>
    Silakan lengkapi Rekapitulasi Jurnal Sosial pada tabel di bawah ini:<hr/>
    <button class="w3-button w3-red w3-round-large w3-margin" onclick="exportk12('classtabelk2')"><i class="fa fa-file-excel-o"></i> Export Ms. Excel</button>
    <button class="w3-button w3-green w3-round-large w3-margin" onclick="importk12('classtabelk2')"><i class="fa fa-file-excel-o"></i> import Ms. Excel</button>
    <button class="w3-button w3-khaki simpanLSK2 w3-round-large w3-margin" onclick="saveLSK2()">Simpan di Server</button>
    <table class='versi-table classtabelk2'>
    <thead>
        <tr>
            <th>No</th>
            <th style="position:sticky;position:-webkit-sticky;left:0px;">Nama Siswa</th>
            <th>Predikat Nilai</th>
            <th>Indikator Maksimal</th>
            <th>Indikator Minimal</th>
            <th>Aksi</th>
        </tr>
    </thead><tbody>
    `;
    for (i = 0; i < datanama.length; i++) {
        tekshtml += `<tr>
            <td>${i + 1}</td>
            <td  style="position:sticky;position:-webkit-sticky;left:0px;">${datanama[i]}</td>
            <td></td>
            <td></td>
            <td></td>
            <td><button title="Tambahkan indikator" onclick="modtambahindikator('k2',${i})">+</button>
            <button title="Hapus indikator ini" onclick="hapusindikator('k2',${i})"><i class="fa fa-trash"></i></button></td>

        </tr>`;
    }
    tekshtml += `</tbody></table><hr/>
    
    <hr/>
   
    `;
    div.innerHTML = "<i class='fa fa-spin fa-spinner'></i> Sedang mengambil data di Server. Mohon tunggu ....";

    let tab = "rekapjurnalk2";

    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    fetch(constlinknilai + "?action=getdatafromtab" + param)
        .then(m => m.json())
        .then(k => {
            if (k.result == 0) {
                alert("Anda belum pernah membuat data Rekapitulasi Jurnal Kompetensi Sosial (KI-2)");
                div.innerHTML = tekshtml;
            } else {
                //div.innerHTML = tekshtmlserver;
                for (j = 0; j < k.data.length; j++) {
                    tekshtmlserver += `<tr>
                    <td>${k.data[j]["nourut"]}</td>
                    <td   style="position:sticky;position:-webkit-sticky;left:0px;">${k.data[j]["namasiswa"]}</td>
                    <td>${k.data[j]["nilaipredikat"]}</td>
                    <td>${k.data[j]["indikmaks"]}</td>
                    <td>${k.data[j]["indikmin"]}</td>
                    <td><button title="Tambahkan indikator" onclick="modtambahindikator('k2',${j})">+</button>
                    <button title="Hapus indikator ini" onclick="hapusindikator('k2',${j})"><i class="fa fa-trash"></i></button></td>
        
                </tr>`;
                }
                tekshtmlserver += `</tbody></table><hr/>
                
                <hr/>
               `;
                div.innerHTML = tekshtmlserver
            }
        })
        .catch(er => console.log(er))


});

const saveLSK1 = () => {
    let tb = document.querySelector(".classtabelk1");
    //let tombol = document.querySelectorAll(".simpanLSK1");
    //tombol.forEach(el => el.innerHTML = "<i class='fa fa-spinner fa-spin'></i> proses kirim")
    let lr = tb.rows;
    let all = []
    for (r = 1; r < lr.length; r++) {
        let perbaris = lr[r];
        let isi = []
        for (s = 0; s < perbaris.cells.length - 1; s++) {

            let d = perbaris.cells[s].innerHTML;

            isi.push(d);

        }
        all.push(isi)
    }

    let headt = ["nourut", "namasiswa", "nilaipredikat", "indikmaks", "indikmin"];

    let tab = "rekapjurnalk1";
    let tabel = JSON.stringify(all);
    let head = JSON.stringify(headt);

    let data = new FormData();
    data.append("tabel", tabel);
    data.append("head", head);
    data.append("kelas", idNamaKelas);
    data.append("prefiktab", tab);
    fetch(constlinknilai + "?action=inserttabeltospreadsheet", {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(k => {
            alert(k.result);
            // tombol.innerHTML = "Simpan di Server";
            // tombol.forEach(el => el.innerHTML = "Simpan di Server")
        })
        .catch(er => alert(er))

}
const saveLSK2 = () => {
    let tb = document.querySelector(".classtabelk2");
    //let tombol = document.querySelector(".simpanLSK2");
    //tombol.innerHTML = "<i class='fa fa-spin fa-spinner'></i> proses kirim"
    let lr = tb.rows;
    let all = []
    for (r = 1; r < lr.length; r++) {
        let perbaris = lr[r];
        let isi = []
        for (s = 0; s < perbaris.cells.length - 1; s++) {

            let d = perbaris.cells[s].innerHTML;

            isi.push(d);

        }
        all.push(isi)
    }

    let headt = ["nourut", "namasiswa", "nilaipredikat", "indikmaks", "indikmin"];

    let tab = "rekapjurnalk2";
    let tabel = JSON.stringify(all);
    let head = JSON.stringify(headt);

    let data = new FormData();
    data.append("tabel", tabel);
    data.append("head", head);
    data.append("kelas", idNamaKelas);
    data.append("prefiktab", tab);
    fetch(constlinknilai + "?action=inserttabeltospreadsheet", {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(k => {
            alert(k.result);
            //      tombol.innerHTML = "Simpan di Server"
        })
        .catch(er => alert(er))

}

let tabpts = document.querySelector(".tabraportpts");
tabpts.addEventListener("click", function () {
    let div = document.querySelector(".h3raportpts");
    div.innerHTML = "<i class='fa fa-spin fa-spinner'><i>";
    let htmlopsi = "<option value='' selected>Silakan Pilih Nama Siswa Anda</option>";
    for (i = 0; i < jsondatasiswa.length; i++) {
        htmlopsi += `<option value="${i}" id='opsisiswapts_${i}'>${jsondatasiswa[i].pd_nama}</option>`
    }
    namasiswaraportpts.innerHTML = htmlopsi;

    fetch(constlinknilai + "?action=lihatnilairekap&tab=PTS&kelas=" + idNamaKelas)
        .then(m => m.json())
        .then(r => {
            dataapipts = r;
            div.innerHTML = "Raport PTS (Raport Bayangan)"
            //  console.log(r)
        })
    // let datakkm = koleksiarraymapelaktif();
    // document.querySelector(".kkmsatuanpendidikan").innerHTML = datakkm.kkmmin;
    // document.querySelectorAll(".a_kkm").forEach(k => k.innerHTML = datakkm.kkmmin);
    // document.getElementById("a_rentangkkm").innerHTML = Math.round((100 - datakkm.kkmmin) / 3);
});

let tabacrdk3 = document.querySelector(".tabacrdk3");
let dataapiph = {};
let dataapipaspak = {};
tabacrdk3.addEventListener("click", async function () {
    let dataph = Object.keys(dataapiph);
    let datapts = Object.keys(dataapipts);
    let datapaspak = Object.keys(dataapipaspak);
    let tesrekappaspak = document.querySelector(".teksrekappaspak");
    tesrekappaspak.innerHTML = (idSemester == 2) ? "Rekap PAK" : "Rekap PAS";
    let paspak = (idSemester == 2) ? "PAK" : "PAS";
    let statusPH = document.querySelector(".statusdataPH");
    let statusPTS = document.querySelector(".statusdataPTS");
    let statusPAS = document.querySelector(".statusdataPASPAK");

    // let datakkm = koleksiarraymapelaktif();
    // console.log(datakkm);


    if (dataph.length == 0) {
        await fetch(constlinknilai + "?action=lihatnilairekap&tab=PH&kelas=" + idNamaKelas)
            .then(m => m.json())
            .then(r => {
                dataapiph = r;
                let adakd = r.banyakkd.length;
                if (adakd == 4) {
                    statusPH.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data)</b>`;

                } else {
                    statusPH.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
                }

            })

    } else {
        let adakd = dataapiph.banyakkd.length;
        if (adakd == 4) {
            statusPH.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data)</b>`;

        } else {
            statusPH.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
        }

    }

    if (datapts.length == 0) {
        await fetch(constlinknilai + "?action=lihatnilairekap&tab=PTS&kelas=" + idNamaKelas)
            .then(m => m.json())
            .then(r => {
                dataapipts = r;
                let adakd = r.banyakkd.length;
                if (adakd == 4) {
                    statusPTS.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data)</b> `;

                } else {

                    statusPTS.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
                }

            })

    } else {
        let adakd = dataapipts.banyakkd.length;
        if (adakd == 4) {
            statusPTS.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data)</b> `;

        } else {

            statusPTS.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
        }
        //statusPTS.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`
    }


    if (datapaspak.length == 0) {
        await fetch(constlinknilai + "?action=lihatnilairekap&tab=" + paspak + "&kelas=" + idNamaKelas)
            .then(m => m.json())
            .then(r => {
                dataapipaspak = r;
                let adakd = r.banyakkd.length;
                if (adakd == 4) {
                    statusPAS.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data)</b>`;

                } else {

                    statusPAS.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
                }



            })

    } else {
        let adakd = dataapipaspak.banyakkd.length;
        if (adakd == 4) {
            statusPAS.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data)</b>`;

        } else {

            statusPAS.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
        }

        //statusPAS.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
        // console.log(datapaspak.length)
    }

    koleksicekliskd();

})



const koleksicekliskd = () => {
    let datakkm = koleksiarraymapelaktif();
    let datamapel = datakkm.kodemapel;
    let td = document.querySelector(".resultkdyangdicek");
    let tes = tabelkearray();
    let paspak = (idSemester == 2) ? "PAK" : "PAS";

    let KD3 = {}
    let tekshtml = "<table class='w3-table garis w3-tiny'><tr><th>Mapel</th><th>KD diceklis</th><th>KD PH</th><th>KD PTS</th><th>KD PAK</th></tr>";
    for (i = 0; i < datamapel.length; i++) {
        let arrKD3 = tes.filter(k => k[6] == true && k[0] == datamapel[i]);
        let arrPH = dataapiph.banyakkd.filter(k => k.indexOf(datamapel[i]) > -1).map(k => k.split("_")[4]).filter((a, b, c) => c.indexOf(a) == b).sort();
        let arrPTS = dataapipts.banyakkd.filter(k => k.indexOf(datamapel[i]) > -1).map(k => k.split("_")[4]).filter((a, b, c) => c.indexOf(a) == b).sort();
        let arrPAS = dataapipaspak.banyakkd.filter(k => k.indexOf(datamapel[i]) > -1).map(k => k.split("_")[4]).filter((a, b, c) => c.indexOf(a) == b).sort();
        let kd = arrKD3.map(l => l[1])
        KD3[datamapel[i]] = kd;
        tekshtml += `<tr><td>${datamapel[i]}
        </td>
        <td>${kd.join(", ")}</td>
        <td>
            ${arrPH.join(", ")}
        </td>
        
        <td>
            ${arrPTS.join(", ")}
        </td>
        <td>
            ${arrPAS.join(", ")}
        </td>
        
        </tr>
        `;
        // console.log(arrKD3)
        //console.log(kd)
        KD3[datamapel[i]] = kd;


    }

    //console.log(KD3)
    // console.log(KD3["PKN"].length)
    tekshtml += `</table> 
    <ul class="w3-tiny">
    <li><span class="w3-text-blue">KD PH, KD PTS, KD PAS/PAK</span> adalah KD yang didapat dari tagihan penilaian yang telah Anda laksanakan
    </li><li>Yang akan dijadikan KD pada Deskripsi Raport adalah <span class="w3-text-blue">KD diceklis</span>
    </li><li><span class="w3-text-blue">KD diceklis</span> diatur di menu Kurkulum pada Tab Kompetensi Dasar. 
    </li><li>Ceklislah KD yang memuat minimal di <span class="w3-text-blue">KD PH</span> dan <span class="w3-text-blue">KD PAS/PAK</span> telah dilaksanakan (datanya telah Ada) dan minimal jumlah ceklis KD sebanyak 2 KD.
    </li>
    </ul>
    `
    td.innerHTML = tekshtml;//
    //
    let jumlahceklis = tes.filter(k => k[6] == true);
    let jumlahkolom = jumlahceklis * 3;
    //console.log(jumlahceklis.length);



    let divto = document.getElementById("menumenunilaikd3");
    divto.innerHTML = `
    Menu-menu Data KI-3:<br/>
    <button onclick="koleksicekliskd()" title="Tampilkan data Asli yang diperoleh siswa">Tampilkan Data Asli</button>
    <button onclick="getdataolahan()">Tampilkan Data Olahan</button>
    <button onclick="jadikansemuakkm()" title="jadikan nilai kosong atau di bawah KKM menjadi nilai KKM Mapel tersebut">KKM-kan ?</button>
    <button onclick="simpandatakd3()" title="Simpan hasil Olahan Data Nilai Anda tanpa menghilangkan data asli siswa" class="tombolsimpanserverkd3">Simpan Data Olah</button>
    <button onclick="printdatakd3()" title="Cetak halaman ini ke Printer">Print</button>
    <button onclick="exceldatakd3()" title="Export halaman ini dalam format Ms. Excel">Ms. Excel</button>
    <button onclick="importdataKeTable('datarekapkd3')" title="Import Data Nlai">Import Data dari File Export</button>
    <br/>

    Ini adalah nilai yang benar-benar diperoleh siswa tanpa Anda olah.<hr/>Rekapitulasi Data Nilai Kompetensi Pengetahuan (KI-3)`;


    let rekap = `
    <table class="versi-table w3-tiny datarekapkd3">
    <thead>
    <tr>
        <th rowspan="3">No.</th>
        <th style="position:sticky;position:-webkit-sticky;left:0px;" rowspan="3">Nama Siswa</th>
    
    <th colspan="${jumlahceklis.length}">Rekap Penilaian Harian (PH)</th>
    <th colspan="${jumlahceklis.length}">Rekap Penilaian Tengah Semester (PTS)</th>
    <th colspan="${jumlahceklis.length}">Rekap Penilaian ${paspak.toUpperCase()}</th>
        </tr><tr>
    `;



    // head PH
    for (a = 0; a < datamapel.length; a++) {
        let kolomkd = KD3[datamapel[a]].length;
        let id = "angkakkm_" + datamapel[a];
        let kkmnya = document.getElementById(id).innerHTML;
        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapPH" colspan="${kolomkd}"> ${datamapel[a]} (KKM = ${kkmnya})</th>`;
        }
    }
    // head PTS
    for (d = 0; d < datamapel.length; d++) {
        let kolomkd = KD3[datamapel[d]].length;
        let id = "angkakkm_" + datamapel[d];
        let kkmnya = document.getElementById(id).innerHTML;

        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapPTS w3-light-green" colspan="${kolomkd}">  ${datamapel[d]} (KKM = ${kkmnya})</th>`;
        }
    }
    // head PAS
    for (e = 0; e < datamapel.length; e++) {
        let kolomkd = KD3[datamapel[e]].length;
        let id = "angkakkm_" + datamapel[e];
        let kkmnya = document.getElementById(id).innerHTML;
        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapPAS w3-deep-orange"  colspan="${kolomkd}">${datamapel[e]} (KKM = ${kkmnya})</th>`;
        }
    }

    rekap += "</tr><tr>";

    for (b = 0; b < datamapel.length; b++) {
        let kolomkds = KD3[datamapel[b]].length
        if (kolomkds !== 0) {
            for (c = 0; c < kolomkds; c++) {
                rekap += `<th  class="tt_rekapPH" >${KD3[datamapel[b]][c]}</th>`
            }

        }
    }
    for (f = 0; f < datamapel.length; f++) {
        let kolomkds = KD3[datamapel[f]].length
        if (kolomkds !== 0) {
            for (g = 0; g < kolomkds; g++) {
                rekap += `<th  class="tt_rekapPTS w3-light-green" >${KD3[datamapel[f]][g]}</th>`
            }

        }
    }
    for (m = 0; m < datamapel.length; m++) {
        let kolomkds = KD3[datamapel[m]].length
        if (kolomkds !== 0) {
            for (n = 0; n < kolomkds; n++) {
                rekap += `<th  class="tt_rekapPAS w3-deep-orange" >${KD3[datamapel[m]][n]}</th>`
            }

        }
    }

    rekap += `</tr></thead><tbody>`;

    //isikan data siswa
    for (o = 0; o < jsondatasiswa.length; o++) {
        //console.log(o)
        rekap += `<tr>
        <td>${o + 1}</td>
        <td  style="position:sticky;position:-webkit-sticky;left:0px;">${jsondatasiswa[o].pd_nama}</td>`

        for (b = 0; b < datamapel.length; b++) {
            let kolomkds = KD3[datamapel[b]].length
            if (kolomkds !== 0) {
                for (c = 0; c < kolomkds; c++) {
                    //  console.log(KD3[datamapel[b]][c])
                    let nilaisementara = fungsirerataKD("PH", `${jsondatasiswa[o].id}`, `${datamapel[b]}`, `${KD3[datamapel[b]][c]}`);
                    // rekap += `<td  class="tt_rekapPH tt_KD3_${datamapel[b]}" style="visibility: visible;" contenteditable="true"> ${nilaisementara}</td>`;
                    rekap += `<td  class="tt_rekapPH tt_KD3_${datamapel[b]}"  contenteditable="true">${nilaisementara}</td>`;
                }

            }
        }
        for (f = 0; f < datamapel.length; f++) {
            let kolomkds = KD3[datamapel[f]].length
            if (kolomkds !== 0) {
                for (g = 0; g < kolomkds; g++) {
                    let nilaisementarapts = fungsirerataKD("PTS", `${jsondatasiswa[o].id}`, `${datamapel[f]}`, `${KD3[datamapel[f]][g]}`);
                    // rekap += `<td  class="tt_rekapPTS tt_KD3_${datamapel[f]}" style="visibility: hidden" contenteditable="true"></td>`;
                    rekap += `<td  class="tt_rekapPTS tt_KD3_${datamapel[f]}"  contenteditable="true">${nilaisementarapts}</td>`;
                }

            }
        }
        for (m = 0; m < datamapel.length; m++) {
            let kolomkds = KD3[datamapel[m]].length
            if (kolomkds !== 0) {
                for (n = 0; n < kolomkds; n++) {
                    let nilaisementarapaspak = fungsirerataKD("PASPAK", `${jsondatasiswa[o].id}`, `${datamapel[m]}`, `${KD3[datamapel[m]][n]}`);
                    //rekap += `<td  class="tt_rekapPAS  tt_KD3_${datamapel[m]}" style="visibility: hidden" contenteditable="true"></td>`;
                    rekap += `<td  class="tt_rekapPAS  tt_KD3_${datamapel[m]}" contenteditable="true">${nilaisementarapaspak}</td>`;
                }

            }
        }

        `</tr>`
    }
    document.getElementById("tabeldatanilaiki3").innerHTML = rekap;
    let wid = document.querySelector(".datarekapkd3").offsetWidth;
    let divscroll = document.getElementById("scrollatas");
    let isidivscroll = document.getElementById("isiscrollatas");
    let divolahnilai = document.getElementById("olahnilai");
    let ww = divolahnilai.offsetWidth;

    divscroll.setAttribute("style", `border: none 0px red;overflow-x: scroll;position:sticky;position:-webkit-sticky;top:25px;`)

    isidivscroll.setAttribute("style", `width:${wid}px;height:20px`)

}


let togel = document.querySelector(".togglekesiapandata");
togel.addEventListener("click", function () {
    let x = document.querySelector(".datatoggle");
    if (x.style.display === "none") {
        x.style.display = "block";
        togel.innerHTML = "<i class='fa fa-eye-slash'></i> Tutup";
    } else {
        x.style.display = "none";
        togel.innerHTML = "<i class='fa fa-eye'></i> Sumber Data";
    }
})

const fungsirerataKD = (t, tokennya, mapel, kd) => {
    let doo = {};
    if (t == "PH") {
        doo = dataapiph.records.filter(k => k.tokensiswa == tokennya)[0];
    } else if (t == "PTS") {
        doo = dataapipts.records.filter(k => k.tokensiswa == tokennya)[0];

    } else if (t == "PASPAK") {
        doo = dataapipaspak.records.filter(k => k.tokensiswa == tokennya)[0];

    }

    let inNilai = 0;
    let akhirnilai;
    if (doo === undefined) {
        // console.log(doo)
        akhirnilai = ""
    } else {
        let datakd = Object.keys(doo).filter(j => j.indexOf(mapel + "_" + kd) > -1);
        //console.log(datakd.length)
        for (i = 0; i < datakd.length; i++) {
            let nilai = (doo[datakd[i]] == "") ? 0 : doo[datakd[i]];
            // console.log(nilai)
            inNilai += parseInt(nilai);
        }

        if (datakd.length !== 0) {
            // akhirnilai = (inNilai / datakd.length).toFixed(2);
            akhirnilai = Math.round((inNilai / datakd.length));

        } else {
            akhirnilai = "";
        }
    }
    return akhirnilai

}


let tt_tabtabrekapph = document.querySelector(".tabtabrekapph");
let tt_tabtabrekappts = document.querySelector(".tabtabrekappts");
let tt_tabtabrekappas = document.querySelector(".tabtabrekappaspak");
tt_tabtabrekapph.addEventListener("click", function () {
    tt_tabtabrekapph.className += " activee";
    tt_tabtabrekappts.className = tt_tabtabrekappts.className.replace(/activee/g, "");
    tt_tabtabrekappas.className = tt_tabtabrekappas.className.replace(/activee/g, "");

    let classph = document.querySelectorAll(".tt_rekapPH");
    if (classph[0] == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("tabeldatanilaiki3");
    let tabel = document.querySelector(".datarekapkd3");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph[0].offsetLeft;
    div.scrollLeft = 0;// (x - y);

})

tt_tabtabrekappts.addEventListener("click", function () {
    tt_tabtabrekappts.className += " activee";
    tt_tabtabrekapph.className = tt_tabtabrekapph.className.replace(/activee/g, "");
    tt_tabtabrekappas.className = tt_tabtabrekappas.className.replace(/activee/g, "");
    let classpts = document.querySelectorAll(".tt_rekapPTS");
    if (classpts[0] == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let x = classpts[0].offsetLeft;
    let div = document.getElementById("tabeldatanilaiki3");
    let tabel = document.querySelector(".datarekapkd3");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    div.scrollLeft = (x - y);

})

tt_tabtabrekappas.addEventListener("click", function () {
    tt_tabtabrekappas.className += " activee";
    tt_tabtabrekappts.className = tt_tabtabrekappts.className.replace(/activee/g, "")
    tt_tabtabrekapph.className = tt_tabtabrekapph.className.replace(/activee/g, "")
    let classpaspak = document.querySelectorAll(".tt_rekapPAS");
    if (classpaspak[0] == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let x = classpaspak[0].offsetLeft;
    let div = document.getElementById("tabeldatanilaiki3");

    let tabel = document.querySelector(".datarekapkd3");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    div.scrollLeft = (x - y);

})

const getdataolahan = () => {
    let divto = document.getElementById("menumenunilaikd3");
    divto.innerHTML = "Sedang proses mengambil data Pengolahan Nilai Anda di Server  <i class='fa fa-refresh fa-spin'></i>"
    let tes = tabelkearray();
    let paspak = (idSemester == 2) ? "PAK" : "PAS";
    let tabeldata = document.querySelector(".datarekapkd3").getElementsByTagName("tbody")[0];
    let ddph = tes.filter(k => k[6] == true).map(k => "PH_" + k[0] + "_" + k[1]);
    let ddpts = tes.filter(k => k[6] == true).map(k => "PTS_" + k[0] + "_" + k[1]);
    let ddpas = tes.filter(k => k[6] == true).map(k => paspak + "_" + k[0] + "_" + k[1]);
    let a = ddph.concat(ddpts);

    let dds = a.concat(ddpas);

    let tab = "rekapkd3";
    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    fetch(constlinknilai + "?action=getdatafromtab" + param)
        .then(m => m.json())
        .then(k => {
            console.log(k);
            if (k.result == 0) {
                alert("Anda belum pernah menyimpan data pengolahan nilai.");
                divto.innerHTML = `
                Menu-menu Data KI-3:<br/>
                <button onclick="koleksicekliskd()" title="Tampilkan data Asli yang diperoleh siswa">Tampilkan Data Asli</button>
                <button onclick="getdataolahan()">Tampilkan Data Olahan</button>
                <button onclick="jadikansemuakkm()" title="jadikan nilai kosong atau di bawah KKM menjadi nilai KKM Mapel tersebut">KKM-kan ?</button>
                <button onclick="simpandatakd3()" title="Simpan hasil Olahan Data Nilai Anda tanpa menghilangkan data asli siswa" class="tombolsimpanserverkd3">Simpan Data Olah</button>
                <button onclick="printdatakd3()" title="Cetak halaman ini ke Printer">Print</button>
                <button onclick="exceldatakd3()" title="Export halaman ini dalam format Ms. Excel">Ms. Excel</button>
                <button onclick="importdataKeTable('datarekapkd3')" title="Import Data Nlai">Import Data dari File Export</button>
                <br/>Ini adalah nilai yang benar-benar diperoleh siswa tanpa Anda olah.<hr/>Rekapitulasi Data Nilai Kompetensi Pengetahuan (KI-3)`;

            } else {
                let ob = Object.keys(k.data[0]).filter(k => !(k === "no" || k === "nama"));
                console.log(ob)
                let key = Object.keys(k.data[0]);
                let obb = JSON.stringify(ob);
                let ddx = JSON.stringify(dds);
                if (obb === ddx) {
                    //alert("sama headnya")
                    let lr = tabeldata.rows;

                    for (r = 0; r < lr.length; r++) {
                        let perbaris = lr[r];
                        for (s = 0; s < perbaris.cells.length; s++) {
                            let d = k.data[r][key[s]];
                            perbaris.cells[s].innerHTML = d;
                        }
                    }
                    divto.innerHTML = `
                    Menu-menu Data KI-3:<br/>
                    <button onclick="koleksicekliskd()" title="Tampilkan data Asli yang diperoleh siswa">Tampilkan Data Asli</button>
                    <button onclick="getdataolahan()">Tampilkan Data Olahan</button>
                    <button onclick="jadikansemuakkm()" title="jadikan nilai kosong atau di bawah KKM menjadi nilai KKM Mapel tersebut">KKM-kan ?</button>
                    <button onclick="simpandatakd3()" title="Simpan hasil Olahan Data Nilai Anda tanpa menghilangkan data asli siswa" class="tombolsimpanserverkd3">Simpan Data Olah</button>
                    <button onclick="printdatakd3()" title="Cetak halaman ini ke Printer">Print</button>
                    <button onclick="exceldatakd3()" title="Export halaman ini dalam format Ms. Excel">Ms. Excel</button>
                    <button onclick="importdataKeTable('datarekapkd3')" title="Import Data Nlai">Import Data dari File Export</button>
                    <br/>

                    <span class="w3-text-red">Ini adalah nilai yang telah Anda Olah.</span><hr/>Rekapitulasi Data Nilai Kompetensi Pengetahuan (KI-3) <span class="w3-text-red">(Data Pengolahan Nilai)</span>`;


                } else {
                    let konf = confirm("Sebaran KD yang telah disimpan sebelumnya berbeda dengan sebaran KD saat ini. Sebaran KD sebelumnya mungkin saja tidak valid dengan dengan data sebaran KD saat ini. Anda sebaiknya membuat Data Pengolahan Nilai yang sesuai dengan sebaran KD saat ini sebab data yang akan dijadikan deskripsi raport adalah sebaran KD saat ini. Apakah Anda ingin tetap menampilkannya?\n\n Klik [OK] untuk menampilkan data, atau \n\n Klik [CANCEL] untuk membatalkan");
                    //console.log(k.data)

                    if (!konf) {
                        divto.innerHTML = `
    Menu-menu Data KI-3:<br/>
    <button onclick="koleksicekliskd()" title="Tampilkan data Asli yang diperoleh siswa">Tampilkan Data Asli</button>
    <button onclick="getdataolahan()">Tampilkan Data Olahan</button>
    <button onclick="jadikansemuakkm()" title="jadikan nilai kosong atau di bawah KKM menjadi nilai KKM Mapel tersebut">KKM-kan ?</button>
    <button onclick="simpandatakd3()" title="Simpan hasil Olahan Data Nilai Anda tanpa menghilangkan data asli siswa" class="tombolsimpanserverkd3">Simpan Data Olah</button>
    <button onclick="printdatakd3()" title="Cetak halaman ini ke Printer">Print</button>
    <button onclick="exceldatakd3()" title="Export halaman ini dalam format Ms. Excel">Ms. Excel</button>
    <button onclick="importdataKeTable('datarekapkd3')" title="Import Data Nlai">Import Data dari File Export</button>
    <br/>`

                        // Ini adalah nilai yang benar-benar diperoleh siswa tanpa Anda olah.<hr/>Rekapitulasi Data Nilai Kompetensi Pengetahuan (KI-3)`;

                        return
                    }
                    dataolahbeda(k.data);
                    divto.innerHTML = `
                    Menu-menu Data KI-3:<br/>
                    <button onclick="koleksicekliskd()" title="Tampilkan data Asli yang diperoleh siswa">Tampilkan Data Asli</button>
                    <button onclick="getdataolahan()">Tampilkan Data Olahan</button>
                    <button onclick="jadikansemuakkm()" title="jadikan nilai kosong atau di bawah KKM menjadi nilai KKM Mapel tersebut">KKM-kan ?</button>
                    <button onclick="simpandatakd3()" title="Simpan hasil Olahan Data Nilai Anda tanpa menghilangkan data asli siswa" class="tombolsimpanserverkd3">Simpan Data Olah</button>
                    <button onclick="printdatakd3()" title="Cetak halaman ini ke Printer">Print</button>
                    <button onclick="exceldatakd3()" title="Export halaman ini dalam format Ms. Excel">Ms. Excel</button>
                    <button onclick="importdataKeTable('datarekapkd3')" title="Import Data Nlai">Import Data dari File Export</button>
                    <br/>
                    
                    <span class="w3-text-red">Ini adalah nilai yang telah Anda Olah.</span><hr/>Rekapitulasi Data Nilai Kompetensi Pengetahuan (KI-3) <span class="w3-text-red">(Data Pengolahan Nilai ini berbeda dengan sebaran KD saat ini)</span><br/><br/>
                    Saran: Jika peringatan ini muncul, Anda sebaiknya membuat data pengolahan nilai baru lagi yang diambil dari data asli yang sesaui dengan sebaran KD saat ini kemudian simpan data pengolahan ke server.
                    `;

                }
                //console.log(obb);
            }


        })
        .catch(er => console.log(er))


}

const jadikansemuakkm = () => {
    let datakkm = koleksiarraymapelaktif();
    let datamapel = datakkm.kodemapel;
    let td = document.querySelector(".resultkdyangdicek");
    let tes = tabelkearray();
    let paspak = (idSemester == 2) ? "PAK" : "PAS";
    //permapel
    for (a = 0; a < datamapel.length; a++) {
        let selid = "tt_KD3_" + datamapel[a];
        let angkaid = "angkakkm_" + datamapel[a];
        let sel = document.querySelectorAll("." + selid);
        let angkakkm = document.getElementById(angkaid).innerHTML;
        sel.forEach(k => {
            if (k.innerHTML < parseInt(angkakkm)) {
                k.innerHTML = parseInt(angkakkm);
            }

        })
    }
}

var wrapperel1 = document.getElementById('scrollatas');
var wrapperel2 = document.getElementById('tabeldatanilaiki3');
wrapperel1.onscroll = function () {
    wrapperel2.scrollLeft = wrapperel1.scrollLeft;
};
wrapperel2.onscroll = function () {
    wrapperel1.scrollLeft = wrapperel2.scrollLeft;
};

const simpandatakd3 = () => {
    let konfirmasi = confirm("Anda yakin ingin menyimpan data ini ke server?. Data yang sebelumnya akan diganti dengan data tabel ini. Klik OK untuk menyimpan atau klik CANCEL untuk membatalkannya.");
    if (!konfirmasi) {
        alert("Anda membatalkan simpan");
        return;
    }
    let tes = tabelkearray();
    let paspak = (idSemester == 2) ? "PAK" : "PAS";
    let tabeldata = document.querySelector(".datarekapkd3").getElementsByTagName("tbody")[0];
    let ddph = tes.filter(k => k[6] == true).map(k => "PH_" + k[0] + "_" + k[1]);
    let ddpts = tes.filter(k => k[6] == true).map(k => "PTS_" + k[0] + "_" + k[1]);
    let ddpas = tes.filter(k => k[6] == true).map(k => paspak + "_" + k[0] + "_" + k[1]);
    let a = ddph.concat(ddpts);

    let dds = a.concat(ddpas);
    let abc = ["no", "nama"];
    let dd = abc.concat(dds);

    let btn = document.querySelector(".tombolsimpanserverkd3");
    btn.innerHTML = "Simpan Data Olah <i class='fa fa-spin fa-spinner'></i>";
    //console.log(dd)
    let lr = tabeldata.rows;
    let all = []
    for (r = 0; r < lr.length; r++) {
        let perbaris = lr[r];
        let isi = []
        for (s = 0; s < perbaris.cells.length; s++) {
            let d;
            d = perbaris.cells[s].innerHTML;
            isi.push(d);
        }
        all.push(isi)
    }


    // console.log(all);

    let tab = "rekapkd3";
    let tabel = JSON.stringify(all);
    let head = JSON.stringify(dd);

    let data = new FormData();
    data.append("tabel", tabel);
    data.append("head", head);
    data.append("kelas", idNamaKelas);
    data.append("prefiktab", tab);
    fetch(constlinknilai + "?action=inserttabeltospreadsheet", {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(k => {
            alert(k.result);
            btn.innerHTML = "Simpan Data Olah";
            //tombol.innerHTML = "Simpan di Server"
        })
        .catch(er => alert(er))

}

const dataolahbeda = (arr) => {
    let dmapel = koleksiarraymapelaktif();
    let paspak = (idSemester == 2) ? "PAK" : "PAS";
    let datamapel = dmapel.kodemapel;
    let key = Object.keys(arr[0]);
    let keyid = key.filter(k => !(k === "no" || k === "nama"))
    // console.log(keyid);
    let cek = keyid.filter(j => j.indexOf("PH_") > -1)
    let ceka = keyid.filter(j => j.indexOf("PTS_") > -1)
    console.log(ceka)
    let cekb = keyid.filter(j => j.indexOf("PAK_") > -1)
    let countkey = (cek.length)
    let countkeya = (ceka.length)
    let countkeyb = (cekb.length)
    // console.log(cek.length);
    // console.log(ceka.length);
    // console.log(cekb.length);
    //et KD3 = arr;




    //console.log(cek);
    //console.log(keyid);

    // for(a = 0 ; a < datamapel ; a++){

    // }
    //console.log(countkey);

    let rekap = `
    <table class="versi-table w3-tiny datarekapkd3">
    <thead>
    <tr>
        <th rowspan="3">No.</th>
        <th style="position:sticky;position:-webkit-sticky;left:0px;" rowspan="3">Nama Siswa</th>

    <th colspan="${countkey}">Rekap Penilaian Harian (PH)</th>
    <th colspan="${countkeya}">Rekap Penilaian Tengah Semester (PTS)</th>
    <th colspan="${countkeyb}">Rekap Penilaian ${paspak.toUpperCase()}</th>
        </tr><tr>
    `;
    // head PH
    for (a = 0; a < datamapel.length; a++) {
        let kolomkd = keyid.filter(j => j.indexOf("PH_" + datamapel[a]) > -1);
        let id = "angkakkm_" + datamapel[a];
        let kkmnya = document.getElementById(id).innerHTML;
        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapPH" colspan="${kolomkd.length}"> ${datamapel[a]} (KKM = ${kkmnya})</th>`;
        }
    }
    // head PTS
    for (d = 0; d < datamapel.length; d++) {
        let kolomkd = keyid.filter(j => j.indexOf("PTS_" + datamapel[d]) > -1)
        let id = "angkakkm_" + datamapel[d];
        let kkmnya = document.getElementById(id).innerHTML;

        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapPTS w3-light-green" colspan="${kolomkd.length}">  ${datamapel[d]} (KKM = ${kkmnya})</th>`;
        }
    }
    // head PAS
    for (e = 0; e < datamapel.length; e++) {
        let kolomkd = keyid.filter(j => j.indexOf(paspak + "_" + datamapel[e]) > -1);
        let id = "angkakkm_" + datamapel[e];
        let kkmnya = document.getElementById(id).innerHTML;
        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapPAS w3-deep-orange"  colspan="${kolomkd.length}">${datamapel[e]} (KKM = ${kkmnya})</th>`;
        }
    }

    rekap += "</tr><tr>";

    for (b = 0; b < datamapel.length; b++) {
        let kolomkds = keyid.filter(j => j.indexOf("PH_" + datamapel[b]) > -1);
        //console.log(kolomkds);
        if (kolomkds !== 0) {
            for (c = 0; c < kolomkds.length; c++) {
                rekap += `<th  class="tt_rekapPH" >${kolomkds[c].split("_")[2]}</th>`

            }

        }
    }
    for (f = 0; f < datamapel.length; f++) {
        let kolomkds = keyid.filter(j => j.indexOf("PTS_" + datamapel[f]) > -1);
        if (kolomkds !== 0) {
            for (g = 0; g < kolomkds.length; g++) {
                rekap += `<th  class="tt_rekapPTS w3-light-green" >${kolomkds[g].split("_")[2]}</th>`
            }

        }
    }
    for (m = 0; m < datamapel.length; m++) {
        let kolomkds = keyid.filter(j => j.indexOf(paspak + "_" + datamapel[m]) > -1)
        if (kolomkds !== 0) {
            for (n = 0; n < kolomkds.length; n++) {
                rekap += `<th  class="tt_rekapPAS w3-deep-orange" >${kolomkds[n].split("_")[2]}</th>`
            }

        }
    }

    rekap += `</tr></thead><tbody>`;

    //isikan data siswa
    for (o = 0; o < jsondatasiswa.length; o++) {
        //console.log(o)
        rekap += `<tr>
            <td>${o + 1}</td>
            <td  style="position:sticky;position:-webkit-sticky;left:0px;">${jsondatasiswa[o].pd_nama}</td>`

        for (b = 0; b < datamapel.length; b++) {
            let xxx = keyid.filter(j => j.indexOf("PH_" + datamapel[b]) > -1);
            let kolomkds = xxx;
            if (kolomkds !== 0) {
                for (c = 0; c < kolomkds.length; c++) {
                    //  console.log(KD3[datamapel[b]][c])

                    let nilaisementara = arr[o][kolomkds[c]];
                    rekap += `<td  class="tt_rekapPH tt_KD3_${datamapel[b]}"  contenteditable="true">${nilaisementara}</td>`;
                }

            }
        }
        for (f = 0; f < datamapel.length; f++) {
            let xxx = keyid.filter(j => j.indexOf("PTS_" + datamapel[f]) > -1);
            let kolomkds = xxx;
            if (kolomkds !== 0) {
                for (g = 0; g < kolomkds.length; g++) {
                    let nilaisementarapts = arr[o][kolomkds[g]];
                    rekap += `<td  class="tt_rekapPTS tt_KD3_${datamapel[f]}"  contenteditable="true">${nilaisementarapts}</td>`;
                }

            }
        }
        for (m = 0; m < datamapel.length; m++) {
            let xxx = keyid.filter(j => j.indexOf(paspak + "_" + datamapel[m]) > -1);
            let kolomkds = xxx;
            if (kolomkds !== 0) {
                for (n = 0; n < kolomkds.length; n++) {
                    let nilaisementarapaspak = arr[o][kolomkds[n]];
                    rekap += `<td  class="tt_rekapPAS  tt_KD3_${datamapel[m]}" contenteditable="true">${nilaisementarapaspak}</td>`;
                }

            }
        }

        `</tr>`
    }
    document.getElementById("tabeldatanilaiki3").innerHTML = rekap;
    let wid = document.querySelector(".datarekapkd3").offsetWidth;
    let divscroll = document.getElementById("scrollatas");
    let isidivscroll = document.getElementById("isiscrollatas");
    let divolahnilai = document.getElementById("olahnilai");
    let ww = divolahnilai.offsetWidth;

    divscroll.setAttribute("style", `border: none 0px red;overflow-x: scroll;`)
    isidivscroll.setAttribute("style", `width:${wid}px;height:20px`)
}
const printdatakd3 = () => {
    let isibody = document.getElementById("tabeldatanilaiki3").innerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO DATA REKAP NILAI KETERAMPILAN</title>`;
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

    body.innerHTML = `<h3 class="w3-center">Rekapitulasi Nilai Kompetensi Pengetahuan (KI-3)</h3`;
    body.innerHTML += `<h4 class="w3-center">Kelas ${idNamaKelas} Semester ${idSemester}</h4>`;
    body.innerHTML += `<h5 class="w3-center">Tahun Pelajaran ${idTeksTapel}</h5>`;
    body.innerHTML += `${isibody}`;
    body.innerHTML += '<div style="float:left;position:relative;margin-left:50px;text-align:center">Mengetahui,<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><br/><u><b>' + idNamaKepsek + '</b></u><br/>NIP. ' + idNipKepsek + '</div>';
    body.innerHTML += '<div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ', ' + tanggalfull(new Date()) + '<br/>' + idJenisGuru + '<br/><br/><br/><br/><br/><b><u>' + namauser + '</u></b><br/>NIP. ' + idNipGuruKelas + '</div>';



    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}

const exceldatakd3 = () => {
    let tabelsumber = document.querySelector(".datarekapkd3");
    let divto = document.getElementById("datasiswaprint");
    let headsumber = tabelsumber.getElementsByTagName("thead")[0];
    let bodysumber = tabelsumber.getElementsByTagName("tbody")[0];
    let jumlahkolom = bodysumber.rows[0].cells.length;

    let tekshtml = `<table class="versi-table w3-tiny" id="tablekeexcelekapkd3">
    <tr>
        <td colspan="${jumlahkolom}">Rekapitulasi Nilai Kompetensi Pengetahuan (KI-3)</td>
        </tr><tr>
        <td colspan="${jumlahkolom}">Kelas ${idNamaKelas} Semester ${idSemester}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}">Tahun Pelajaran ${idTeksTapel}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}"></td>
        
    <tr>
    ${headsumber.innerHTML.replace(/3\./g, "'3.")}
    ${bodysumber.innerHTML}
    <tr>
         
    <tr>`


    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Mengetahui, </td>
    <td></td>
    `;
    let sisakolom = jumlahkolom - 11;
    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${jlo.kota}, ${tanggalfull(new Date())}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Kepala ${idNamaSekolah} </td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${idJenisGuru} ${idNamaKelas}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>
    <tr></tr>
    <tr></tr>
    <tr></tr>
    `;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3"><b><u>${idNamaKepsek}</u></b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3"><b><u>${namauser}</u></b></td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">NIP. ${idNipKepsek}</b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">NIP. ${idNipGuruKelas}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `</table>`;
    divto.innerHTML = tekshtml
    $("#tablekeexcelekapkd3").table2excel({

        name: "Worksheet Name",
        filename: "Rekap Nilai KI 3 idfile " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 3,
        barisatas: 5

    });
    divto.innerHTML = "";

}

//Rapot
let tr_kesiapandata = document.querySelector(".tr_kesiapandata");
tr_kesiapandata.addEventListener("click", function () {
    //cek cek
    let dataki1 = document.querySelector(".classtabelk1");
    let dataki2 = document.querySelector(".classtabelk2");
    let dataki3 = document.querySelector(".datarekapkd3");
    let dataki4 = document.querySelector(".datarekapkd4");
    let dataki5 = document.querySelector(".tabeldataperkembangan");
    let divdata = document.querySelector("#b_data");
    let cekdataki3 = document.getElementById("menumenunilaikd3").innerHTML;
    let cekcek = (cekdataki3.indexOf("Data Pengolahan Nilai") > -1) ? "Sumber data dari Pengolahan Nilai" : "Sumber Data dari data Asli";
    let tekshtml = `<h3>Berikut kesiapan data untuk bisa menggenerate Buku Raport atau Buku Induk</h3>
    <table class="versi-table w3-small" style="margin:0 auto">
    <tr>
        <th>Data</th>
        <th>Keterangan</th>
    </tr>
    <tr>
        <td>Data KI-1</td>
        <td>${(dataki1 === null) ? "Tidak Ada" : "Ada"}</td>
    </tr>
    <tr>
        <td>Data KI-2</td>
        <td>${(dataki2 === null) ? "Tidak Ada" : "Ada"}</td>
    </tr>
     <tr>
        <td>Data KI-3</td>
        <td>${(dataki3 === null) ? "Tidak Ada" : "Ada (lihat <span class='w3-text-blue'>Rekap Raport KI-3</span> di laman ini)<br/>" + cekcek}
           
        </td>
    </tr>
     <tr>
        <td>Data KI-4</td>
        <td>${(dataki4 === null) ? "Tidak Ada" : "Ada "}
           
        </td>
    </tr>
     <tr>
        <td>Data Rekap Perkembangan dan Prestasi</td>
        <td>${(dataki5 === null) ? "Tidak Ada" : "Ada "}
           
        </td>
    </tr>
     <tr>
        <td>Rekapitulasi Absen</td>
        <td>Pastikan Anda sudah membuka tabel REKAP ABSEN dan sudah tergenerate data kehadirannya</td>
    </tr>
     <tr>
        <td>Titimangsa Raport</td>
        <td>Jika Anda tidak membuat agenda kalender pendidikan dengan keterangan "TITIMANGSA RAPORT SEMESTER 2" (tanpa tanda kutip) di KALDIK, maka titimangsa raport versi ini adalah 25 Juni 2021</td>
    </tr>
    </table>
    `;
    divdata.innerHTML = tekshtml;

})

let tr_halamannilai = document.querySelector(".tr_halamannilai");
tr_halamannilai.addEventListener("click", function () {
    let select = document.getElementById("listnamaraport");
    select.innerHTML = `<option selected>Pilih Nama Siswa</option>`;
    for (a = 0; a < jsondatasiswa.length; a++) {
        select.innerHTML += `<option value="${a}">${jsondatasiswa[a].pd_nama}</option>`;
    }

})

const pilihlistnamaraport = () => {
    try {
        let el = document.getElementById("listnamaraport");
        let y = el.selectedIndex;
        let x = el.options;
        if (y == 0) {
            alert("Pilih nama siswa Anda")
            return
        };//

        //pastikan semua sudah dibuka:
        let dataki1 = document.querySelector(".classtabelk1");
        let dataki2 = document.querySelector(".classtabelk2");
        let dataki3 = document.querySelector(".datarekapkd3");
        let dataki4 = document.querySelector(".datarekapkd4");
        let dataki5 = document.querySelector(".tabeldataperkembangan");
        if (dataki1 === null || dataki2 === null || dataki3 === null || dataki4 === null || dataki5 === null) {
            alert("Pastikan Anda telah membuka setiap Rekapitulasi Nilai pada Tab Olah Nilai.")
            return
        }





        let yy = y - 1;
        //console.log(yy);
        let datarraport = algoritmakurtilas(yy);
        let nilairaport = datarraport.datarraport; //nforaport["datarraport"]
        let datarraportk4 = algoritmaketerampilan(yy);
        let nilairaportk4 = datarraportk4.datarraport;
        let datahadir = kehadiranraport(yy);
        //nforaport["datarraport"]
        // console.log(nilairaportk4);
        // let cekkris = nilairaport.filter(k => k.indexOf("kriteria_PKRIS") > -1)
        // console.log(cekkris);
        let infosiswa = jsondatasiswa[yy];
        //console.log(y);
        let dataspiritual = document.querySelector(".classtabelk1").getElementsByTagName("tbody")[0];
        //let deskripsispiritual = document.querySelector(".add_indikatorindikatork1").getElementsByTagName("tbody")[0];
        //predikat:
        let predikatki1 = dataspiritual.rows[yy].cells[2].innerHTML;
        //let arrki1maks = dataspiritual.rows[y].cells[3].innerHTML;//.split(", ");
        let deskripsikd1 = deskripsikd12("k1");



        let datasosial = document.querySelector(".classtabelk2").getElementsByTagName("tbody")[0];
        //let deskripsisosial = document.querySelector(".add_indikatorindikatork2").getElementsByTagName("tbody")[0];
        let predikatki2 = datasosial.rows[yy].cells[2].innerHTML;
        //let arrki2maks = datasosial.rows[y].cells[3].innerHTML;//.split(", ");
        let deskripsikd2 = deskripsikd12("k2");
        let datakkm = koleksiarraymapelaktif();
        let datamapel = datakkm.kodemapel;
        //console.log(datamapel);
        let mapelnonagama = datamapel.filter(k => !(k == "PAI" || k == "PKATO" || k == "PKRIS" || k == "PHIND" || k == "PBUDH" || k == "PKONG"));
        let mapelinti = datamapel.filter(k => !(k == "PAI" || k == "PKATO" || k == "PKRIS" || k == "PHIND" || k == "PBUDH" || k == "PKONG" || k == "BSUND" || k == "TIK"));
        //console.log(mapelnonagama);//
        let agamasiswa = "";
        let kkmmapel = 0;
        let n_agama = "";
        let kriteria_n_agama = "";
        let n_maks = "";
        let kriteria_n_maks = "";
        let n_min = "";
        let kriteria_n_min = "";
        let deskripsiagama = "";
        let inhtmldeskripsimaks;
        let inhtmldeskripsimin;

        //datanilai keterampilan
        let n_rapork4 = "";
        let kriteria_n_raportk4 = "";
        let n_maksk4 = "";
        let kriteria_n_maksk4 = ""
        let n_mink4 = "";
        let kriteria_n_mink4 = "";
        let deskripsi_raportk4 = "";
        let deskripsi_maksk4 = "";
        let deskripsik4_mink4 = "";

        let n_mapel, kriteria_n_mapel, indexmapel, indexmapelk4, deskripsikd3inti, namasubjek, kkmnya;
        if (infosiswa.pd_agama == "ISLAM" || infosiswa.pd_agama == "Islam") {
            kkmmapel = document.getElementById("angkakkm_PAI").innerHTML;
            agamasiswa = "PAI";
            n_agama = nilairaport[0]["raport_PAI"];

            kriteria_n_agama = nilairaport[0]["kriteria_PAI"];

            n_maks = nilairaport[0]["maks_PAI"];
            kriteria_n_maks = nilairaport[0]["kriteria_maks_PAI"];
            n_min = nilairaport[0]["min_PAI"];
            kriteria_n_min = nilairaport[0]["kriteria_min_PAI"];
            inhtmldeskripsimaks = document.getElementById("deskripsikd3_PAI_" + n_maks).innerHTML;
            inhtmldeskripsimin = document.getElementById("deskripsikd3_PAI_" + n_min).innerHTML;

            deskripsiagama = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maks} dalam ${inhtmldeskripsimaks}, dan mulai ${kriteria_n_min} dalam ${inhtmldeskripsimin}`;
            n_rapork4 = nilairaportk4[0]["raportk4_PAI"];
            kriteria_n_raportk4 = nilairaportk4[0]["kriteriak4_PAI"];

            n_maksk4 = nilairaportk4[0]["maksk4_PAI"];
            kriteria_n_maksk4 = nilairaportk4[0]["kriteria_maksk4_PAI"];
            n_mink4 = nilairaportk4[0]["mink4_PAI"];
            kriteria_n_mink4 = nilairaportk4[0]["kriteria_mink4_PAI"];
            deskripsi_maksk4 = document.getElementById("deskripsikd4_PAI_" + n_maksk4).innerHTML;
            deskripsi_mink4 = document.getElementById("deskripsikd4_PAI_" + n_mink4).innerHTML;

            deskripsi_raportk4 = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maksk4} dalam ${deskripsi_maksk4}, dan mulai ${kriteria_n_mink4} dalam ${deskripsi_mink4}`;


        } else if (infosiswa.pd_agama == "KRISTEN" || infosiswa.pd_agama == "Kristen") {
            kkmmapel = document.getElementById("angkakkm_PKRIS").innerHTML;
            agamasiswa = "PKRIS";
            let indexagama = nilairaport.findIndex(x => x["kriteria_PKRIS"]);
            n_agama = nilairaport[indexagama]["raport_PKRIS"];

            kriteria_n_agama = nilairaport[indexagama]["kriteria_PKRIS"];
            n_maks = nilairaport[indexagama]["maks_PKRIS"];
            kriteria_n_maks = nilairaport[indexagama]["kriteria_maks_PKRIS"];
            n_min = nilairaport[indexagama]["min_PKRIS"];
            kriteria_n_min = nilairaport[indexagama]["kriteria_min_PKRIS"];
            inhtmldeskripsimaks = document.getElementById("deskripsikd3_PKRIS_" + n_maks).innerHTML;
            inhtmldeskripsimin = document.getElementById("deskripsikd3_PKRIS_" + n_min).innerHTML;

            deskripsiagama = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maks} dalam ${inhtmldeskripsimaks}, dan mulai ${kriteria_n_min} dalam ${inhtmldeskripsimin}`;

            indexmapelk4 = nilairaportk4.findIndex(x => x["kriteriak4_PKRIS"]);
            n_rapork4 = nilairaportk4[indexmapelk4]["raportk4_PKRIS"];
            kriteria_n_raportk4 = nilairaportk4[indexmapelk4]["kriteriak4_PKRIS"];
            n_maksk4 = nilairaportk4[indexmapelk4]["maksk4_PKRIS"];
            kriteria_n_maksk4 = nilairaportk4[indexmapelk4]["kriteria_maksk4_PKRIS"];
            n_mink4 = nilairaportk4[indexmapelk4]["mink4_PKRIS"];
            kriteria_n_mink4 = nilairaportk4[indexmapelk4]["kriteria_mink4_PKRIS"];
            deskripsi_maksk4 = document.getElementById("deskripsikd4_PKRIS_" + n_maksk4).innerHTML;
            deskripsi_mink4 = document.getElementById("deskripsikd4_PKRIS_" + n_mink4).innerHTML;

            deskripsi_raportk4 = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maksk4} dalam ${deskripsi_maksk4}, dan mulai ${kriteria_n_mink4} dalam ${deskripsi_mink4}`;




        } else if (infosiswa.pd_agama == "KATHOLIK" || infosiswa.pd_agama == "Katholik") {
            kkmmapel = document.getElementById("angkakkm_PKATO").innerHTML;
            agamasiswa = "PKATO";

            let indexagama = nilairaport.findIndex(x => x["kriteria_PKATO"]);
            n_agama = nilairaport[indexagama]["raport_PKATO"];

            kriteria_n_agama = nilairaport[indexagama]["kriteria_PKATO"];
            n_maks = nilairaport[indexagama]["maks_PKATO"];
            kriteria_n_maks = nilairaport[indexagama]["kriteria_maks_PKATO"];
            n_min = nilairaport[indexagama]["min_PKATO"];
            kriteria_n_min = nilairaport[indexagama]["kriteria_min_PKATO"];
            inhtmldeskripsimaks = document.getElementById("deskripsikd3_PKATO_" + n_maks).innerHTML;
            inhtmldeskripsimin = document.getElementById("deskripsikd3_PKATO_" + n_min).innerHTML;
            deskripsiagama = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maks} dalam ${inhtmldeskripsimaks}, dan mulai ${kriteria_n_min} dalam ${inhtmldeskripsimin}`;

            indexmapelk4 = nilairaportk4.findIndex(x => x["kriteriak4_PKATO"]);
            n_rapork4 = nilairaportk4[indexmapelk4]["raportk4_PKATO"];
            kriteria_n_raportk4 = nilairaportk4[indexmapelk4]["kriteriak4_PKATO"];
            n_maksk4 = nilairaportk4[indexmapelk4]["maksk4_PKATO"];
            kriteria_n_maksk4 = nilairaportk4[indexmapelk4]["kriteria_maksk4_PKATO"];
            n_mink4 = nilairaportk4[indexmapelk4]["mink4_PKATO"];
            kriteria_n_mink4 = nilairaportk4[indexmapelk4]["kriteria_mink4_PKATO"];
            deskripsi_maksk4 = document.getElementById("deskripsikd4_PKATO_" + n_maksk4).innerHTML;
            deskripsi_mink4 = document.getElementById("deskripsikd4_PKATO_" + n_mink4).innerHTML;

            deskripsi_raportk4 = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maksk4} dalam ${deskripsi_maksk4}, dan mulai ${kriteria_n_mink4} dalam ${deskripsi_mink4}`;

        } else if (infosiswa.pd_agama == "HINDU" || infosiswa.pd_agama == "Hindu") {
            kkmmapel = document.getElementById("angkakkm_PHIND").innerHTML;
            agamasiswa = "PHIND";

            let indexagama = nilairaport.findIndex(x => x["kriteria_PHIND"]);
            n_agama = nilairaport[indexagama]["raport_PHIND"];

            kriteria_n_agama = nilairaport[indexagama]["kriteria_PHIND"];
            n_maks = nilairaport[indexagama]["maks_PHIND"];
            kriteria_n_maks = nilairaport[indexagama]["kriteria_maks_PHIND"];
            n_min = nilairaport[indexagama]["min_PHIND"];
            kriteria_n_min = nilairaport[indexagama]["kriteria_min_PHIND"];
            inhtmldeskripsimaks = document.getElementById("deskripsikd3_PHIND_" + n_maks).innerHTML;
            inhtmldeskripsimin = document.getElementById("deskripsikd3_PHIND_" + n_min).innerHTML;
            deskripsiagama = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maks} dalam ${inhtmldeskripsimaks}, dan mulai ${kriteria_n_min} dalam ${inhtmldeskripsimin}`;

            indexmapelk4 = nilairaportk4.findIndex(x => x["kriteriak4_PHIND"]);
            n_rapork4 = nilairaportk4[indexmapelk4]["raportk4_PHIND"];
            kriteria_n_raportk4 = nilairaportk4[indexmapelk4]["kriteriak4_PHIND"];
            n_maksk4 = nilairaportk4[indexmapelk4]["maksk4_PHIND"];
            kriteria_n_maksk4 = nilairaportk4[indexmapelk4]["kriteria_maksk4_PHIND"];
            n_mink4 = nilairaportk4[indexmapelk4]["mink4_PHIND"];
            kriteria_n_mink4 = nilairaportk4[indexmapelk4]["kriteria_mink4_PHIND"];
            deskripsi_maksk4 = document.getElementById("deskripsikd4_PHIND_" + n_maksk4).innerHTML;
            deskripsi_mink4 = document.getElementById("deskripsikd4_PHIND_" + n_mink4).innerHTML;

            deskripsi_raportk4 = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maksk4} dalam ${deskripsi_maksk4}, dan mulai ${kriteria_n_mink4} dalam ${deskripsi_mink4}`;

        } else if (infosiswa.pd_agama == "BUDHA" || infosiswa.pd_agama == "Budha") {
            kkmmapel = document.getElementById("angkakkm_PBUDH").innerHTML;
            agamasiswa = "PBUDH";
            let indexagama = nilairaport.findIndex(x => x["kriteria_PBUDH"]);
            n_agama = nilairaport[indexagama]["raport_PBUDH"];

            kriteria_n_agama = nilairaport[indexagama]["kriteria_PBUDH"];
            n_maks = nilairaport[indexagama]["maks_PBUDH"];
            kriteria_n_maks = nilairaport[indexagama]["kriteria_maks_PBUDH"];
            n_min = nilairaport[indexagama]["min_PBUDH"];
            kriteria_n_min = nilairaport[indexagama]["kriteria_min_PBUDH"];
            inhtmldeskripsimaks = document.getElementById("deskripsikd3_PBUDH_" + n_maks).innerHTML;
            inhtmldeskripsimin = document.getElementById("deskripsikd3_PBUDH_" + n_min).innerHTML;
            deskripsiagama = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maks} dalam ${inhtmldeskripsimaks}, dan mulai ${kriteria_n_min} dalam ${inhtmldeskripsimin}`;

            indexmapelk4 = nilairaportk4.findIndex(x => x["kriteriak4_PBUDH"]);
            n_rapork4 = nilairaportk4[indexmapelk4]["raportk4_PBUDH"];
            kriteria_n_raportk4 = nilairaportk4[indexmapelk4]["kriteriak4_PBUDH"];
            n_maksk4 = nilairaportk4[indexmapelk4]["maksk4_PBUDH"];
            kriteria_n_maksk4 = nilairaportk4[indexmapelk4]["kriteria_maksk4_PBUDH"];
            n_mink4 = nilairaportk4[indexmapelk4]["mink4_PBUDH"];
            kriteria_n_mink4 = nilairaportk4[indexmapelk4]["kriteria_mink4_PBUDH"];
            deskripsi_maksk4 = document.getElementById("deskripsikd4_PBUDH_" + n_maksk4).innerHTML;
            deskripsi_mink4 = document.getElementById("deskripsikd4_PBUDH_" + n_mink4).innerHTML;

            deskripsi_raportk4 = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maksk4} dalam ${deskripsi_maksk4}, dan mulai ${kriteria_n_mink4} dalam ${deskripsi_mink4}`;


        } else if (infosiswa.pd_agama == "KONGHUCU" || infosiswa.pd_agama == "KHONGHUCU") {
            kkmmapel = document.getElementById("angkakkm_PBUDH").innerHTML;
            agamasiswa = "PKONG";

            let indexagama = nilairaport.findIndex(x => x["kriteria_PKONG"]);
            n_agama = nilairaport[indexagama]["raport_PKONG"];

            kriteria_n_agama = nilairaport[indexagama]["kriteria_PKONG"];
            n_maks = nilairaport[indexagama]["maks_PKONG"];
            kriteria_n_maks = nilairaport[indexagama]["kriteria_maks_PKONG"];
            n_min = nilairaport[indexagama]["min_PKONG"];
            kriteria_n_min = nilairaport[indexagama]["kriteria_min_PKONG"];
            inhtmldeskripsimaks = document.getElementById("deskripsikd3_PKONG_" + n_maks).innerHTML;
            inhtmldeskripsimin = document.getElementById("deskripsikd3_PKONG_" + n_min).innerHTML;
            deskripsiagama = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maks} dalam ${inhtmldeskripsimaks}, dan mulai ${kriteria_n_min} dalam ${inhtmldeskripsimin}`;


            indexmapelk4 = nilairaportk4.findIndex(x => x["kriteriak4_PKONG"]);
            n_rapork4 = nilairaportk4[indexmapelk4]["raportk4_PKONG"];
            kriteria_n_raportk4 = nilairaportk4[indexmapelk4]["kriteriak4_PKONG"];
            n_maksk4 = nilairaportk4[indexmapelk4]["maksk4_PKONG"];
            kriteria_n_maksk4 = nilairaportk4[indexmapelk4]["kriteria_maksk4_PKONG"];
            n_mink4 = nilairaportk4[indexmapelk4]["mink4_PKONG"];
            kriteria_n_mink4 = nilairaportk4[indexmapelk4]["kriteria_mink4_PKONG"];
            deskripsi_maksk4 = document.getElementById("deskripsikd4_PKONG_" + n_maksk4).innerHTML;
            deskripsi_mink4 = document.getElementById("deskripsikd4_PKONG_" + n_mink4).innerHTML;

            deskripsi_raportk4 = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maksk4} dalam ${deskripsi_maksk4}, dan mulai ${kriteria_n_mink4} dalam ${deskripsi_mink4}`;

        } else {
            kkmmapel = "data Agama tidak terdeteksi, pastikan data siswa Anda sudah terisi dengan benar";
            deskripsiagama = "Agama Siswa tidak valid";
            n_agama = "Agama siswa tidak valid";
            kriteria_n_agama = "Agama siswa tidak valid";
        }

        //     "Raport_IPA" : 90,
        //     "kriteria_IPA": "Baik",
        //     "maks_IPA" : "3.1",
        //     "kriteria_maks_IPA": "Baik",
        //     "min_IPA" : "3.2"
        //     "kriteria_min_IPA": "Cukup",

        let divto = document.getElementById("halamanraport");
        let tekshtml = `<h4 class="w3-center">RAPORT DAN PROFIL PESERTA DIDIK</h4>
    <table style="width:100%" >
    <tr>
        <td>Nama</td>
        <td>:</td>
        <td>${x[y].text}</td>
        <td>Kelas</td>
        <td>:</td>
        <td>${idNamaKelas}</td>
    </tr>
    <tr>
        <td>No Induk</td>
        <td>:</td>
        <td>${infosiswa.nis}/${infosiswa.nisn}</td>
        <td>Semester</td>
        <td>:</td>
        <td>${idSemester}</td>
    </tr>
    <tr>
        <td>Nama Sekolah</td>
        <td>:</td>
        <td>${idNamaSekolah}</td>
        <td>Tahun Pelajaran</td>
        <td>:</td>
        <td>${idTeksTapel}</td>
    </tr>
    <tr>
        <td>Alamat Sekolah</td>
        <td>:</td>
        <td colspan="4">${document.getElementById("editalamatkopsurat").innerHTML}</td>
    </tr>
    </table>
    <br/>
    <b>A. Sikap</b><br/>
    1. Sikap Spiritual
    <table class="versi-table w3-centered w3-small">
    <tr>
        <th>Predikat</th>
        <th>Deskripsi</th>
    </tr>
    <tr>
    <td>${predikatki1}</td>
    <td>${deskripsikd1}</td>
    </tr>
    </table>
    <br/>
    2. Sikap Sosial
    <table class="versi-table  w3-centered w3-small">
    <tr>
        <th>Predikat</th>
        <th>Deskripsi</th>
    </tr>
    <tr>
    <td>${predikatki2}</td>
    <td>${deskripsikd2}</td>
    </tr>
    </table>
      <br/>
    <b>B. Pengetahuan dan Keterampilan</b>
    <table class="versi-table w3-centered w3-small">
    <thead>
        <tr>
            <th rowspan="2">NO</th>
            <th rowspan="2">MUATAN PELAJARAN</th>
            <th rowspan="2">KKM</th>
            <th colspan="3">PENGETAHUAN</th>
            <th colspan="3">KETERAMPILAN</th>
        </tr>
        <tr>
            <th>Nilai</th>
            <th>Predikat</th>
            <th style="width:30%">Deksripsi</th>
            <th>Nilai</th>
            <th>Predikat</th>
            <th style="width:30%">Deksripsi</th>
        </tr>
    </thead>
    <tbody>
    <tr>
        <td colspan="9">A. MUATAN NASIONAL</td>
    </tr>
    <tr>
        <td rowspan="2">1</td>
        <td colspan="8"  class="w3-left-align">Pendidikan Agama dan Budi Pekerti</td>
    </tr>
    <tr>
        <td   class="w3-left-align">Pendidikan Agama ${titleCase(infosiswa.pd_agama)} dan Budi Pekerti </td>
        <td>${kkmmapel}</td>
        <td>${n_agama}</td>
        <td>${kriteria_n_agama}</td>
        <td class="w3-justify">${deskripsiagama}</td>
        <td>${n_rapork4}</td>
        <td>${kriteria_n_raportk4}</td>
        <td class="w3-justify">${deskripsi_raportk4}</td>
        
    </tr>`;

        for (i = 0; i < mapelinti.length; i++) {
            namasubjek = document.getElementById("namamapelraport_" + mapelinti[i]).innerHTML;
            kkmnya = document.getElementById("angkakkm_" + mapelinti[i]).innerHTML;

            indexmapel = nilairaport.findIndex(x => x["kriteria_" + mapelinti[i]]);
            indexmapelk4 = nilairaportk4.findIndex(x => x["kriteriak4_" + mapelinti[i]]);
            // console.log(indexmapelk4);
            n_mapel = nilairaport[indexmapel]["raport_" + mapelinti[i]];

            kriteria_n_mapel = nilairaport[indexmapel]["kriteria_" + mapelinti[i]];
            n_maks = nilairaport[indexmapel]["maks_" + mapelinti[i]];
            kriteria_n_maks = nilairaport[indexmapel]["kriteria_maks_" + mapelinti[i]];
            n_min = nilairaport[indexmapel]["min_" + mapelinti[i]];
            kriteria_n_min = nilairaport[indexmapel]["kriteria_min_" + mapelinti[i]];
            inhtmldeskripsimaks = document.getElementById("deskripsikd3_" + mapelinti[i] + "_" + n_maks).innerHTML;
            inhtmldeskripsimin = document.getElementById("deskripsikd3_" + mapelinti[i] + "_" + n_min).innerHTML;
            deskripsikd3inti = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maks} dalam ${inhtmldeskripsimaks}, dan mulai ${kriteria_n_min} dalam ${inhtmldeskripsimin}`;

            // console.log(mapelinti[i]);
            n_rapork4 = nilairaportk4[indexmapelk4]["raportk4_" + mapelinti[i]];
            kriteria_n_raportk4 = nilairaportk4[indexmapelk4]["kriteriak4_" + mapelinti[i]];
            n_maksk4 = nilairaportk4[indexmapelk4]["maksk4_" + mapelinti[i]];
            kriteria_n_maksk4 = nilairaportk4[indexmapelk4]["kriteria_maksk4_" + mapelinti[i]];
            n_mink4 = nilairaportk4[indexmapelk4]["mink4_" + mapelinti[i]];
            kriteria_n_mink4 = nilairaportk4[indexmapelk4]["kriteria_mink4_" + mapelinti[i]];
            // console.log(n_maksk4)
            deskripsi_maksk4 = document.getElementById("deskripsikd4_" + mapelinti[i] + "_" + n_maksk4).innerHTML;
            deskripsi_mink4 = document.getElementById("deskripsikd4_" + mapelinti[i] + "_" + n_mink4).innerHTML;

            deskripsi_raportk4 = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maksk4} dalam ${deskripsi_maksk4}, dan mulai ${kriteria_n_mink4} dalam ${deskripsi_mink4}`;

            tekshtml += `
        <tr>
            <td>${i + 2}</td>
            <td   class="w3-left-align">${namasubjek}</td>
            <td>${kkmnya}</td>
            <td>${n_mapel}</td>
            <td>${kriteria_n_mapel}</td>
            <td class="w3-justify">${deskripsikd3inti}</td>
            <td>${n_rapork4}</td>
        <td>${kriteria_n_raportk4}</td>
        <td class="w3-justify">${deskripsi_raportk4}</td>
        </tr>`;

        }

        let mulokinti = document.getElementById("namamapelraport_BSUND").innerHTML;
        let kkmmulokinti = document.getElementById("angkakkm_BSUND").innerHTML;
        indexmapel = nilairaport.findIndex(x => x["kriteria_BSUND"]);
        n_mapel = nilairaport[indexmapel]["raport_BSUND"];

        kriteria_n_mapel = nilairaport[indexmapel]["kriteria_BSUND"];
        n_maks = nilairaport[indexmapel]["maks_BSUND"];
        kriteria_n_maks = nilairaport[indexmapel]["kriteria_maks_BSUND"];
        n_min = nilairaport[indexmapel]["min_BSUND"];
        kriteria_n_min = nilairaport[indexmapel]["kriteria_min_BSUND"];
        inhtmldeskripsimaks = document.getElementById("deskripsikd3_BSUND_" + n_maks).innerHTML;
        inhtmldeskripsimin = document.getElementById("deskripsikd3_BSUND_" + n_min).innerHTML;
        deskripsikd3inti = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maks} dalam ${inhtmldeskripsimaks}, dan mulai ${kriteria_n_min} dalam ${inhtmldeskripsimin}`;

        indexmapelk4 = nilairaportk4.findIndex(x => x["kriteriak4_BSUND"]);
        n_rapork4 = nilairaportk4[indexmapelk4]["raportk4_BSUND"];
        kriteria_n_raportk4 = nilairaportk4[indexmapelk4]["kriteriak4_BSUND"];
        n_maksk4 = nilairaportk4[indexmapelk4]["maksk4_BSUND"];
        kriteria_n_maksk4 = nilairaportk4[indexmapelk4]["kriteria_maksk4_BSUND"];
        n_mink4 = nilairaportk4[indexmapelk4]["mink4_BSUND"];
        kriteria_n_mink4 = nilairaportk4[indexmapelk4]["kriteria_mink4_BSUND"];
        deskripsi_maksk4 = document.getElementById("deskripsikd4_BSUND_" + n_maksk4).innerHTML;
        deskripsi_mink4 = document.getElementById("deskripsikd4_BSUND_" + n_mink4).innerHTML;

        deskripsi_raportk4 = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maksk4} dalam ${deskripsi_maksk4}, dan mulai ${kriteria_n_mink4} dalam ${deskripsi_mink4}`;


        tekshtml += `<tr><td colspan="9">B. MUATAN LOKAL</tr>
    <tr>
        <td></td>
        <td colspan="8" class="w3-left-align">Muatan Lokal Wajib</td>
    </tr>
    <tr>
            <td>${mapelinti.length + 2}</td>
            <td class="w3-left-align">${mulokinti}</td>
            <td>${kkmmulokinti}</td>
            <td>${n_mapel}</td>
            <td>${kriteria_n_mapel}</td>
            <td class="w3-justify">${deskripsikd3inti}</td>
            <td>${n_rapork4}</td>
        <td>${kriteria_n_raportk4}</td>
        <td class="w3-justify">${deskripsi_raportk4}</td>
        </tr>`;

        tekshtml += `
    </tbody>
    </table>
    <br/>
    <b>C. Ekstrakurikuler</b><br/>
    <table class="w3-table-all garis  w3-small" >
    <thead>
        <tr>
            <th>No</th>
            <th>Kegiatan Ekstrakurikuler</th>
            <th>Nilai</th>
            <th>Keterangan</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_0"]}</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_1"]}</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_2"]}</td>
            
        </tr>
        <tr>
            <td>2</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_3"]}</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_4"]}</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_5"]}</td>
        </tr>
        <tr>
            <td>3</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_6"]}</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_7"]}</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_8"]}</td>        
        </tr>
    </tbody>
    </table><br/>
    <br>
    <b>D. Saran-saran</b></br>
    <div class="w3-panel w3-leftbar w3-light-grey">
    <p class="w3-large w3-serif raportsaran"><i>"${datatambahan.data[yy]["head_9"]}"</i></p>
    
  </div>
    <b>E. Tinggi dan Berat Badan</b><br/>
    <table class="versi-table w3-small" style="width:100%" >
    <thead>
        <tr>
            <th rowspan="2">No</th>
            <th rowspan="2">Aspek Yang Dinilai</th>
            <th colspan="2">Semester</th>
            
        </tr>
        <tr>
            <th>1</th>
            <th>2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Tinggi Badan (cm)</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_10"]}</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_11"]}</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Berat Badan (kg)</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_12"]}</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_13"]}</td>
        </tr>
      
    </tbody>
    </table>
    <br/>
    <b>F. Kondisi Kesehatan</b><br/>
    <table class="versi-table w3-small" style="width:100%" >
    <thead>
        <tr>
            <th>No.</th>
            <th> Aspek Fisik</th>
            <th>Keterangan</th>
            
        </tr>

    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Pendengaran</td>
            <td>${datatambahan.data[yy]["head_14"]}</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Penglihatan</td>
            <td>${datatambahan.data[yy]["head_15"]}</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Gigi</td>
            <td>${datatambahan.data[yy]["head_16"]}</td>
        </tr>
        <tr>
            <td>4</td>
            <td>Lainnya</td>
            <td>${datatambahan.data[yy]["head_17"]}</td>
        </tr>
    </tbody>
    </table><br/>
    <b>G. Prestasi</b><br/>
    <table class="versi-table w3-small" style="width:100%" >
    <thead>
        <tr>
            <th>No.</th>
            <th>Jenis Prestasi</th>
            <th>Keterangan</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>${datatambahan.data[yy]["head_18"]}</td>
            <td>${datatambahan.data[yy]["head_19"]}</td>
        </tr>
        <tr>
            <td>2</td>
            <td>${datatambahan.data[yy]["head_20"]}</td>
            <td>${datatambahan.data[yy]["head_21"]}</td>
        </tr>
        <tr>
            <td>3</td>
            <td>${datatambahan.data[yy]["head_22"]}</td>
            <td>${datatambahan.data[yy]["head_23"]}</td>
        </tr>
    </tbody>
    </table>
    <br/>
    <b>H. Kehadiran </b>
    <br/>
    <table class="w3-small">
        <tr>
            <td>Hadir </td>
            <td>:</td>
            <td contenteditable="true">${datahadir["hadir"]} hari </td>

        </tr>
        <tr>
            <td>Ijin </td>
            <td>:</td>
            <td contenteditable="true"> ${datahadir["ijin"]} hari </td>

        </tr>
        <tr>
            <td>Sakit </td>
            <td>:</td>
            <td contenteditable="true"> ${datahadir["sakit"]} hari </td>

        </tr>
        <tr>
            <td>Tanpa Keterangan </td>
            <td>:</td>
            <td contenteditable="true"> ${datahadir["alpa"]} hari </td>

        </tr>
    </table>
    <br/>
    <div class="w3-border w3-border-blue w3-padding">
    Dengan memperhatikan dan mempertimbangkan hasil nilai raport pada Tahun Pelajaran ini, maka Ananda <b>${titleCase(infosiswa.pd_nama)}</b> dengan ini dinyatakan <b><em>${(datatambahan.data[yy]["head_24"] == "") ? "... belum diisi ..." : datatambahan.data[yy]["head_24"]}</em></b>
    </div>
    <br/>
    <div class="w3-main">
    <div class="w3-left" contenteditable="true" style="width:25%">
    Orang tua/ Wali
    <br/>
    <br/>
    <br/><br/>
    <br/>
    <br/>
    <br/>
    --------------------
    </div>
   <div class="w3-left w3-margin-left">
   Mengetahui,<br/>
   Kepala ${idNamaSekolah}
   <div id="ttdkepsek"></div>
   <br/>
   <b><u>${idNamaKepsek}
   </u></b><br/>
   NIP. ${idNipKepsek}
   
   
   </div>

   <div class="w3-right">
   ${jlo.kota}, ${titimangsaraport()}<br/>
   ${idJenisGuru} ${idNamaKelas}
   <div id="ttdgurukelas"></div>
   <br/>
   <b><u>${namauser}
   </u></b><br/>
   NIP. ${idNipGuruKelas}
   
   </div>

   </div>
    `;
        divto.innerHTML = tekshtml;

        let cek = document.querySelector("#cekbarcode");
        if (cek.checked) {

            let teksbarkode = "Data Raport Semester 2 ini telah diketahui dan ditandatangani oleh Kepala " + idNamaSekolah + " untuk siswa atas nama " + infosiswa.pd_nama;//document.getElementById("text");
            let teksbarkode2 = "Data Raport Semester 2 ini telah  ditandatangani oleh Guru Kelas " + idNamaKelas + " untuk siswa atas nama " + infosiswa.pd_nama;//document.getElementById("text");
            barcodekan('ttdkepsek', teksbarkode);
            barcodekan('ttdgurukelas', teksbarkode2);
        } else {
            document.getElementById("ttdgurukelas").innerHTML = "<br/><br/>";
            document.getElementById("ttdkepsek").innerHTML = "<br/><br/>";
        }
    } catch (err) {
        alert("Maaf, Raport untuk siswa ini tidak bisa ditampilkan. Pastikan data nilai KI-3 dan KI-4 minimal ada 2 KD yang memiliki nilai. \n\n Tips: jika memang tidak ada data nilai, beri nilai nol (tidak boleh dikosongkan) untuk Rekap KI-3 atau KI-4.)");
        console.log(err.message)
        let divto = document.getElementById("halamanraport");
        divto.innerHTML = "Ada yang salah ... Periksa seluruh rekapitulasi nilai. <br/><br/> Periksa apakah ada nilai yang tidak diisi (wajib diisi, jika memang nilai kosong anggap nilainya adalah nol), Periksa juga apakah Data Siswa benar-benar telah diisi dengan lengkap (terutama data agama siswa)"

    }
}

const algoritmakurtilas = (xx) => {
    let x = parseInt(xx)

    let datakkm = koleksiarraymapelaktif();
    let datamapel = datakkm.kodemapel;
    //let td = document.querySelector(".resultkdyangdicek");
    let tes = tabelkearray();
    let sumbernilai = document.querySelector(".datarekapkd3").getElementsByTagName("tbody")[0];
    let paspak = (idSemester == 2) ? "PAK" : "PAS";

    //console.log(datamapel)
    let datakd3 = {};
    let datasementara = {};
    let jumlahsemuakd = 0;

    for (i = 0; i < datamapel.length; i++) {
        let arrKD3 = tes.filter(k => k[6] == true && k[0] == datamapel[i]);
        jumlahsemuakd += arrKD3.length;
        let kd = arrKD3.map(l => l[1])

        datasementara[datamapel[i]] = kd;


    }
    datakd3["data"] = datasementara;
    datakd3["jumlahsemuakd"] = jumlahsemuakd;
    // console.log(datakd3);
    let ph = 2;
    let pts = parseInt(ph + jumlahsemuakd);
    let pas = parseInt(pts + jumlahsemuakd);
    // console.log(ph)
    // console.log(pts)
    // console.log(pas)
    // for(c = 0 ; c < jumlahsemuakd ; c++){
    //     let nilaiph = 
    // }

    //contoh salah satu siswa dulu:
    // for(a = 0 ; a < jsondatasiswa.length ; a++) // aktifkan ini untuk seluruh siswa
    //let infomapel = Object.keys(datakd3.data);
    let inforaport = {};
    // inforaport["namasiswa"] = jsondatasiswa[a]
    let acuan = 0;
    let arrayobjekmapel = [];

    for (b = 0; b < datamapel.length; b++) {
        let objeknilai = {};
        let arraynilai = [];

        let namamapel = datamapel[b];

        //objeknilai["raport_IPA"]
        // console.log(namamapel)
        // jumlahkdmapelin
        let jumlahkdmapelini = datakd3["data"][datamapel[b]];
        //console.log(jumlahkdmapelini.length)
        let arrpts = []
        let angkanilaikd = 0;
        let angkapembagi = 0;
        let acuanmaks = 0;
        let acuanmin = 0;
        let nilaiKD = 0;
        let kdMaks = "";
        let kdMins = "";
        let nilaiRaport = 0;
        for (c = 0; c < jumlahkdmapelini.length; c++) {
            // console.log(jumlahkdmapelini[c]);
            let acuanph = b + c + 2 + acuan;
            let acuanpts = b + c + 2 + acuan + jumlahsemuakd;
            let acuanpas = b + c + 2 + acuan + jumlahsemuakd + jumlahsemuakd;
            //tentukan masing-masing nilainya
            let nilaiph = sumbernilai.rows[x].cells[acuanph].innerHTML;
            let in_nilaiph = (nilaiph === "") ? 0 : parseInt(nilaiph);
            let tambahpembagi = (nilaiph === "") ? 0 : 2;

            let nilaipts = sumbernilai.rows[x].cells[acuanpts].innerHTML;
            let in_nilaipts = (nilaipts === "") ? 0 : parseInt(nilaipts);
            let tambahpembagipts = (nilaipts === "") ? 0 : 1;

            let nilaipas = sumbernilai.rows[x].cells[acuanpas].innerHTML;
            let in_nilaipas = (nilaipas === "") ? 0 : parseInt(nilaipas);
            let tambahpembagipas = (nilaipas === "") ? 0 : 1;

            angkanilaikd = ((in_nilaiph * 2) + in_nilaipts + in_nilaipas);
            angkapembagi = (tambahpembagi + tambahpembagipts + tambahpembagipas);

            if (angkapembagi !== 0) {
                nilaiKD = Math.round(angkanilaikd / angkapembagi)
            }
            //console.log(nilaiKD);
            if (acuanmaks < nilaiKD) {
                acuanmaks = nilaiKD;
                kdMaks = jumlahkdmapelini[c];
            }
            if (acuanmin == 0 || acuanmin > nilaiKD) {
                acuanmin = nilaiKD
                kdMins = jumlahkdmapelini[c];
            }

            nilaiRaport += nilaiKD;
        }
        //console.log("nilai maks : " + acuanmaks);
        // console.log("KD maks : " + kdMaks);
        // //console.log("nialai min : " + acuanmin);
        // console.log("KD min : " + kdMins);
        //console.log("angka pembagi " + angkapembagi) 
        //fn_predikatkriteria

        let oknilairaport = Math.round(nilaiRaport / jumlahkdmapelini.length);
        //console.log()

        acuan += jumlahkdmapelini.length - 1;
        //console.log(arrpts);
        objeknilai["raport_" + namamapel] = oknilairaport;
        objeknilai["kriteria_" + namamapel] = fn_predikatkriteria(oknilairaport);
        objeknilai["maks_" + namamapel] = kdMaks;
        objeknilai["kriteria_maks_" + namamapel] = fn_predikatkriteria(acuanmaks);
        objeknilai["min_" + namamapel] = kdMins;
        objeknilai["kriteria_min_" + namamapel] = fn_predikatkriteria(acuanmin);

        arrayobjekmapel.push(objeknilai);

    }
    inforaport["datarraport"] = arrayobjekmapel;
    //console.log(inforaport);
    return inforaport

}

const deskripsikd12t = (kompetensi, rr, namasiswa) => {
    let r = parseInt(rr);
    //kompetensi ada 2, yaitu: k1 atau k2;
    // r adalah indeks baris pada data sumber;
    // r diasumsikan sebagai selectedIndex pada pemilihan nama siswa;
    // tabel deskripsi:
    let tabeldeskripsi = document.querySelector(".add_indikatorindikator" + kompetensi);
    let tabeldatakki = document.querySelector(".classtabel" + kompetensi);

    let datamaks = tabeldatakki.rows[r].cells[3].innerHTML;
    let datamin = tabeldatakki.rows[r].cells[4].innerHTML;
    let arrayindikmax, arrayindikmin, teksall = "", teksmaks = "", teksmin = "";
    // let teksmaks = ` selalu `;
    // let teksmin = ` dan mulai tampak dalam `;

    if (datamaks == "") {
        arrayindikmax = [];
    } else {
        arrayindikmax = tabeldatakki.rows[r].cells[3].innerHTML.replace(/\s+/g, "").split(",");
        teksall = `Ananda  ${titleCase(namasiswa)} `;
        teksmaks = " selalu ";
    }

    if (datamin == "") {
        arrayindikmin = [];
    } else {
        arrayindikmin = tabeldatakki.rows[r].cells[4].innerHTML.replace(/\s+/g, "").split(",");
        teksall = `Ananda ${titleCase(namasiswa)}`;
        teksmin = " dan mulai tampak "

    }

    // console.log(r)
    // console.log(kompetensi);
    // console.log(arrayindikmax.length);
    if (arrayindikmax.length !== 0) {
        for (a = 0; a < arrayindikmax.length; a++) {
            teksmaks += tabeldeskripsi.rows[parseInt(arrayindikmax[a]) + 1].cells[0].innerHTML + ", ";
        }

    }
    //console.log(arrayindikmin.length)
    if (arrayindikmin.length !== 0) {
        for (b = 0; b < arrayindikmin.length; b++) {
            teksmin += tabeldeskripsi.rows[parseInt(arrayindikmin[b]) + 1].cells[0].innerHTML + ", ";
        }

    }
    teksall += teksmaks + teksmin;
    //tabel.rows[1].cells[1].innerHTML = teksall;
    return teksall



}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}

const deskripsikd12 = (kompetensi) => {
    //rr diambil dari argumen value
    // rr akan menjadi baris kedua

    let x = document.querySelector("#listnamaraport");
    let y = x.selectedIndex;
    let z = x.options;
    let n = z[y].value;
    let t = z[y].text;

    let tabel_deskripsi = document.querySelector(".add_indikatorindikator" + kompetensi).getElementsByTagName("tbody")[0];
    let sumber_data = document.querySelector(".classtabel" + kompetensi).getElementsByTagName("tbody")[0];

    let predikat = sumber_data.rows[n].cells[2].innerHTML;
    let kodemaks = sumber_data.rows[n].cells[3].innerHTML;
    let kodemin = sumber_data.rows[n].cells[4].innerHTML;

    let arrmaks = []
    if (kodemaks !== "") {
        arrmaks = kodemaks.replace(/\s+/g, "").split(",")
    };
    let arrmin = []
    if (kodemin !== "") {
        arrmin = kodemin.replace(/\s+/g, "").split(",");
    }


    let teks = "Ananda " + titleCase(t);

    if (arrmaks.length == 0) {
        teks += " <span class='w3-text-red'>Data KI-" + kompetensi.replace("k", "") + " maksimal tidak ada/kosong</span> ";
    } else {
        teks += " selalu ";
        for (i = 0; i < arrmaks.length; i++) {
            let a = parseInt(arrmaks[i]);
            teks += tabel_deskripsi.rows[a].cells[0].innerHTML + ", ";
        }
    }

    if (arrmin.length == 0) {
        teks += "<span class='w3-text-red'>Data KI-" + kompetensi.replace("k", "") + " minimal tidak ada/kosong</span> ";
    } else {
        teks += " dan mulai tampak ";

        for (j = 0; j < arrmin.length; j++) {
            let b = parseInt(arrmin[j]);
            if (j == arrmin.length - 1) {
                teks += tabel_deskripsi.rows[b].cells[0].innerHTML + ".";
            } else {
                teks += tabel_deskripsi.rows[b].cells[0].innerHTML + ", ";
            }


        }
    }




    // console.log(kompetensi);
    // let returntext = "k1 = " + kompetensi + ", Nama Siswa (" + t + ") Predikat " + predikat + ", maks (" + kodemaks + "), min (" + kodemin + ")"
    let returntext = teks;
    return returntext
}


///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

let tabacrdk4 = document.querySelector(".tabacrdk4");
let dataapikpraktik = {};
let dataapikproduk = {};
let dataapikproyek = {};
// setiap ''ph' diganti kpraktik
//setiap pts diganti kproduk
//setiap pas diganti kproyek
tabacrdk4.addEventListener("click", async function () {
    let datakpraktik = Object.keys(dataapikpraktik);
    let datakproduk = Object.keys(dataapikproduk);
    let datakproyek = Object.keys(dataapikproyek);
    // let tesrekappaspak = document.querySelector(".teksrekappaspak");
    // tesrekappaspak.innerHTML = (idSemester == 2) ? "Rekap PAK" : "Rekap PAS";
    //let paspak = (idSemester == 2) ? "PAK" : "PAS";

    let statuskpraktik = document.querySelector(".statusdatakpraktik");
    let statuskproduk = document.querySelector(".statusdatakproduk");
    let statuskproyek = document.querySelector(".statusdatakproyek");

    // let datakkm = koleksiarraymapelaktif();
    // console.log(datakkm);


    if (datakpraktik.length == 0) {
        await fetch(constlinknilai + "?action=lihatnilairekap&tab=kpraktik&kelas=" + idNamaKelas)
            .then(m => m.json())
            .then(r => {
                dataapikpraktik = r;
                let adakd = r.banyakkd.length;
                if (adakd == 4) {
                    statuskpraktik.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data/belum pernah membuat tagihan)</br>`;

                } else {
                    statuskpraktik.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
                }

            })

    } else {
        let adakd = dataapikpraktik.banyakkd.length;
        if (adakd == 4) {
            statuskpraktik.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data/belum pernah membuat tagihan)</b>`;

        } else {
            statuskpraktik.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
        }

    }

    if (datakproduk.length == 0) {
        await fetch(constlinknilai + "?action=lihatnilairekap&tab=kproduk&kelas=" + idNamaKelas)
            .then(m => m.json())
            .then(r => {
                dataapikproduk = r;
                let adakd = r.banyakkd.length;
                if (adakd == 4) {
                    statuskproduk.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data/belum pernah membuat tagihan)</b> `;

                } else {

                    statuskproduk.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
                }

            })

    } else {
        let adakd = dataapikproduk.banyakkd.length;
        if (adakd == 4) {
            statuskproduk.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data/belum pernah membuat tagihan)</b> `;

        } else {

            statuskproduk.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
        }
        //statuskproduk.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`
    }


    if (datakproyek.length == 0) {
        await fetch(constlinknilai + "?action=lihatnilairekap&tab=kproyek&kelas=" + idNamaKelas)
            .then(m => m.json())
            .then(r => {
                dataapikproyek = r;
                let adakd = r.banyakkd.length;
                if (adakd == 4) {
                    statuskproyek.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data)</b>`;

                } else {

                    statuskproyek.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
                }



            })

    } else {
        let adakd = dataapikproyek.banyakkd.length;
        if (adakd == 4) {
            statuskproyek.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data)</b>`;

        } else {

            statuskproyek.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
        }

        //statusPAS.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
        // console.log(datapaspak.length)
    }

    koleksicekliskdketerampilan();

})



const koleksicekliskdketerampilan = () => {
    let datakkm = koleksiarraymapelaktif();
    let datamapel = datakkm.kodemapel;
    let td = document.querySelector(".resultkdyangdicekketerampilan");
    let tes = tabelkearray();
    // let paspak = (idSemester == 2) ? "PAK" : "PAS";

    let KD4 = {}
    let tekshtml = "<table class='w3-table garis w3-tiny'><tr><th>Mapel</th><th>KD diceklis</th><th>KD Praktik</th><th>KD Produk</th><th>KD Proyek</th></tr>";
    for (i = 0; i < datamapel.length; i++) {
        let arrKD4 = tes.filter(k => k[7] == true && k[0] == datamapel[i]);
        let arrkpraktik = dataapikpraktik.banyakkd.filter(k => k.indexOf(datamapel[i]) > -1).map(k => k.split("_")[4]).filter((a, b, c) => c.indexOf(a) == b).sort();
        let arrkproduk = dataapikproduk.banyakkd.filter(k => k.indexOf(datamapel[i]) > -1).map(k => k.split("_")[4]).filter((a, b, c) => c.indexOf(a) == b).sort();
        let arrkproyek = dataapikproyek.banyakkd.filter(k => k.indexOf(datamapel[i]) > -1).map(k => k.split("_")[4]).filter((a, b, c) => c.indexOf(a) == b).sort();
        let kd = arrKD4.map(l => l[3])
        KD4[datamapel[i]] = kd;
        tekshtml += `<tr><td>${datamapel[i]}
        </td>
        <td>${kd.join(", ")}</td>
        <td>
            ${arrkpraktik.join(", ")}
        </td>
        
        <td>
            ${arrkproduk.join(", ")}
        </td>
        <td>
            ${arrkproyek.join(", ")}
        </td>
        
        </tr>
        `;
        // console.log(arrKD3)
        //console.log(kd)
        KD4[datamapel[i]] = kd;


    }

    //console.log(KD4)
    // console.log(KD3["PKN"].length)
    tekshtml += `</table> 
    <ul class="w3-tiny">
    <li><span class="w3-text-blue">KD Praktik, KD Produk, KD Proyek</span> adalah KD yang didapat dari tagihan penilaian yang telah Anda laksanakan
    </li><li>Yang akan dijadikan KD pada Deskripsi Raport adalah <span class="w3-text-blue">KD diceklis</span>
    </li><li><span class="w3-text-blue">KD diceklis</span> diatur di menu Kurkulum pada Tab Kompetensi Dasar. 
    </li><li>Ceklislah KD yang memuat minimal di <span class="w3-text-blue">KD Praktik, KD Produk, atau KD Proyek</span> telah dilaksanakan (data nilainya telah Ada) dan minimal jumlah ceklis KD sebanyak 2 KD.
    </li><li>Anda dapat mengisikan nilai tagihan keterampilan secara langsung di tabel rekapitulasi nilai kompetensi keterampilan. Nilai yang Anda isi akan menjadi nilai untuk Raport
    </li><li>Tips: Jika Anda belum pernah membuat tagihan nilai (membuat konten pelajaran elamaso), Anda dapat mengisi nilai di salah satu tagihan saja untuk dapat dijadikan nilai raport pada tabel Rekapitulasi Nilai Keterampilan di bawah ini. Misalnya, Anda mengisikan semua nilai KD di tagihan nilai Praktik saja tanpa harus mengisikan nilai di tagihan Produk atau Proyek.
    </li>
    </ul>
    `
    td.innerHTML = tekshtml;//
    //
    let jumlahceklis = tes.filter(k => k[7] == true);
    let jumlahkolom = jumlahceklis * 3;
    //console.log(jumlahceklis.length);



    let divto = document.getElementById("menumenunilaikd4");
    divto.innerHTML = `
    Menu-menu Data KI-4:<br/>
    <button onclick="koleksicekliskdketerampilan()" title="Tampilkan data Asli yang diperoleh siswa">Tampilkan Data Asli</button>
    <button onclick="getdataolahanketerampilan()">Tampilkan Data Olahan</button>
    <button onclick="jadikansemuakkmketerampilan()" title="jadikan nilai kosong atau di bawah KKM menjadi nilai KKM Mapel tersebut">KKM-kan ?</button>
    <button onclick="simpandatakd4()" title="Simpan hasil Olahan Data Nilai Anda tanpa menghilangkan data asli siswa" class="tombolsimpanserverkd4">Simpan Data Olah</button>
    <button onclick="printdatakd4()" title="Cetak halaman ini ke Printer">Print</button>
    <button onclick="exceldatakd4()" title="Export halaman ini dalam format Ms. Excel">Ms. Excel</button>
    <button onclick="importdataKeTable('datarekapkd4')" title="Import Data Nlai">Import Data dari File Export</button>
    <br/>

    Ini adalah nilai yang benar-benar diperoleh siswa tanpa Anda olah.<hr/>Rekapitulasi Data Nilai Kompetensi Keterampilan (KI-4)`;


    let rekap = `
    <table class="versi-table w3-tiny datarekapkd4">
    <thead>
    <tr>
        <th rowspan="3">No.</th>
        <th style="position:sticky;position:-webkit-sticky;left:0px;" rowspan="3">Nama Siswa</th>
    
    <th colspan="${jumlahceklis.length}">Rekap Nilai Praktik</th>
    <th colspan="${jumlahceklis.length}">Rekap Nilai Produk</th>
    <th colspan="${jumlahceklis.length}">Rekap Nilai Proyek</th>
        </tr><tr>
    `;



    // head PH
    for (a = 0; a < datamapel.length; a++) {
        let kolomkd = KD4[datamapel[a]].length;
        let id = "angkakkm_" + datamapel[a];
        let kkmnya = document.getElementById(id).innerHTML;
        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapkpraktik" colspan="${kolomkd}"> ${datamapel[a]} (KKM = ${kkmnya})</th>`;
        }
    }
    // head PTS
    for (d = 0; d < datamapel.length; d++) {
        let kolomkd = KD4[datamapel[d]].length;
        let id = "angkakkm_" + datamapel[d];
        let kkmnya = document.getElementById(id).innerHTML;

        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapkproduk w3-light-green" colspan="${kolomkd}">  ${datamapel[d]} (KKM = ${kkmnya})</th>`;
        }
    }
    // head PAS
    for (e = 0; e < datamapel.length; e++) {
        let kolomkd = KD4[datamapel[e]].length;
        let id = "angkakkm_" + datamapel[e];
        let kkmnya = document.getElementById(id).innerHTML;
        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapkproyek w3-deep-orange"  colspan="${kolomkd}">${datamapel[e]} (KKM = ${kkmnya})</th>`;
        }
    }

    rekap += "</tr><tr>";

    for (b = 0; b < datamapel.length; b++) {
        let kolomkds = KD4[datamapel[b]].length
        if (kolomkds !== 0) {
            for (c = 0; c < kolomkds; c++) {
                rekap += `<th  class="tt_rekapkpraktik" >${KD4[datamapel[b]][c]}</th>`
            }

        }
    }
    for (f = 0; f < datamapel.length; f++) {
        let kolomkds = KD4[datamapel[f]].length
        if (kolomkds !== 0) {
            for (g = 0; g < kolomkds; g++) {
                rekap += `<th  class="tt_rekapkproduk w3-light-green" >${KD4[datamapel[f]][g]}</th>`
            }

        }
    }
    for (m = 0; m < datamapel.length; m++) {
        let kolomkds = KD4[datamapel[m]].length
        if (kolomkds !== 0) {
            for (n = 0; n < kolomkds; n++) {
                rekap += `<th  class="tt_rekapkproyek w3-deep-orange" >${KD4[datamapel[m]][n]}</th>`
            }

        }
    }

    rekap += `</tr></thead><tbody>`;

    //isikan data siswa
    for (o = 0; o < jsondatasiswa.length; o++) {
        //console.log(o)
        rekap += `<tr>
        <td>${o + 1}</td>
        <td  style="position:sticky;position:-webkit-sticky;left:0px;">${jsondatasiswa[o].pd_nama}</td>`

        for (b = 0; b < datamapel.length; b++) {
            let kolomkds = KD4[datamapel[b]].length
            if (kolomkds !== 0) {
                for (c = 0; c < kolomkds; c++) {
                    //  console.log(KD3[datamapel[b]][c])
                    let nilaisementara = fungsirerataKDketerampilan("kpraktik", `${jsondatasiswa[o].id}`, `${datamapel[b]}`, `${KD4[datamapel[b]][c]}`);
                    // rekap += `<td  class="tt_rekapPH tt_KD3_${datamapel[b]}" style="visibility: visible;" contenteditable="true"> ${nilaisementara}</td>`;
                    rekap += `<td  class="tt_rekapkpraktik tt_KD4_${datamapel[b]}"  contenteditable="true">${nilaisementara}</td>`;
                }

            }
        }
        for (f = 0; f < datamapel.length; f++) {
            let kolomkds = KD4[datamapel[f]].length
            if (kolomkds !== 0) {
                for (g = 0; g < kolomkds; g++) {
                    let nilaisementarakproduk = fungsirerataKDketerampilan("kproduk", `${jsondatasiswa[o].id}`, `${datamapel[f]}`, `${KD4[datamapel[f]][g]}`);
                    // rekap += `<td  class="tt_rekapPTS tt_KD3_${datamapel[f]}" style="visibility: hidden" contenteditable="true"></td>`;
                    rekap += `<td  class="tt_rekapkproduk tt_KD4_${datamapel[f]}"  contenteditable="true">${nilaisementarakproduk}</td>`;
                }

            }
        }
        for (m = 0; m < datamapel.length; m++) {
            let kolomkds = KD4[datamapel[m]].length
            if (kolomkds !== 0) {
                for (n = 0; n < kolomkds; n++) {
                    let nilaisementarakproyek = fungsirerataKDketerampilan("kproyek", `${jsondatasiswa[o].id}`, `${datamapel[m]}`, `${KD4[datamapel[m]][n]}`);
                    //rekap += `<td  class="tt_rekapPAS  tt_KD3_${datamapel[m]}" style="visibility: hidden" contenteditable="true"></td>`;
                    rekap += `<td  class="tt_rekapkproyek  tt_KD4_${datamapel[m]}" contenteditable="true">${nilaisementarakproyek}</td>`;
                }

            }
        }

        `</tr>`
    }
    document.getElementById("tabeldatanilaiki4").innerHTML = rekap;
    let wid = document.querySelector(".datarekapkd4").offsetWidth;
    let divscroll = document.getElementById("scrollatasketerampilan");
    let isidivscroll = document.getElementById("isiscrollatasketerampilan");
    let divolahnilai = document.getElementById("olahnilai");
    let ww = divolahnilai.offsetWidth;

    divscroll.setAttribute("style", `border: none 0px red;overflow-x: scroll;position:sticky;position:-webkit-sticky;top:25px;`)
    isidivscroll.setAttribute("style", `width:${wid}px;height:20px`)

}


let togelketerampilan = document.querySelector(".togglekesiapandataketerampilan");
togelketerampilan.addEventListener("click", function () {
    let x = document.querySelector(".datatoggleketerampilan");
    if (x.style.display === "none") {
        x.style.display = "block";
        togel.innerHTML = "<i class='fa fa-eye-slash'></i> Tutup";
    } else {
        x.style.display = "none";
        togel.innerHTML = "<i class='fa fa-eye'></i> Sumber Data";
    }
})

const fungsirerataKDketerampilan = (t, tokennya, mapel, kd) => {
    let doo = {};
    if (t == "kpraktik") {
        doo = dataapikpraktik.records.filter(k => k.tokensiswa == tokennya)[0];
    } else if (t == "kproduk") {
        doo = dataapikproduk.records.filter(k => k.tokensiswa == tokennya)[0];

    } else if (t == "kproyek") {
        doo = dataapikproyek.records.filter(k => k.tokensiswa == tokennya)[0];

    }

    // let inNilai = 0;
    let inNilai = [];
    let akhirnilai;
    if (doo === undefined) {
        // console.log(doo)
        akhirnilai = ""
    } else {
        let datakd = Object.keys(doo).filter(j => j.indexOf(mapel + "_" + kd) > -1);
        //console.log(datakd.length)
        for (i = 0; i < datakd.length; i++) {
            let nilai = (doo[datakd[i]] == "") ? 0 : parseInt(doo[datakd[i]]);
            // console.log(nilai)
            // inNilai += parseInt(nilai);
            inNilai.push(nilai);
        }

        if (datakd.length !== 0) {
            // akhirnilai = (inNilai / datakd.length).toFixed(2);
            // akhirnilai = Math.round((inNilai / datakd.length));
            akhirnilai = Math.max(...inNilai);
            // akhirnilai = inNilai.reduce((p, v) => (p > v) ? p : v);

        } else {
            akhirnilai = "";
        }
    }
    return akhirnilai

}


let tt_tabtabrekapkpraktik = document.querySelector(".tabtabrekapkpraktik");
let tt_tabtabrekapkproduk = document.querySelector(".tabtabrekapkproduk");
let tt_tabtabrekapkproyek = document.querySelector(".tabtabrekapkproyek");
tt_tabtabrekapkpraktik.addEventListener("click", function () {
    tt_tabtabrekapkpraktik.className += " activee";
    tt_tabtabrekapkproduk.className = tt_tabtabrekapkproduk.className.replace(/activee/g, "");
    tt_tabtabrekapkproyek.className = tt_tabtabrekapkproyek.className.replace(/activee/g, "");

    let classph = document.querySelectorAll(".tt_rekapkpraktik");
    if (classph[0] == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("tabeldatanilaiki4");
    let tabel = document.querySelector(".datarekapkd4");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph[0].offsetLeft;
    div.scrollLeft = 0;// (x - y);

})

tt_tabtabrekapkproduk.addEventListener("click", function () {
    tt_tabtabrekapkproduk.className += " activee";
    tt_tabtabrekapkpraktik.className = tt_tabtabrekapkpraktik.className.replace(/activee/g, "");
    tt_tabtabrekapkproyek.className = tt_tabtabrekapkproyek.className.replace(/activee/g, "");
    let classpts = document.querySelectorAll(".tt_rekapkproduk");
    if (classpts[0] == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let x = classpts[0].offsetLeft;
    let div = document.getElementById("tabeldatanilaiki4");
    let tabel = document.querySelector(".datarekapkd4");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    div.scrollLeft = (x - y);

})

tt_tabtabrekapkproyek.addEventListener("click", function () {
    tt_tabtabrekapkproyek.className += " activee";
    tt_tabtabrekapkproduk.className = tt_tabtabrekapkproduk.className.replace(/activee/g, "")
    tt_tabtabrekapkpraktik.className = tt_tabtabrekapkpraktik.className.replace(/activee/g, "")
    let classpaspak = document.querySelectorAll(".tt_rekapkproyek");
    if (classpaspak[0] == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let x = classpaspak[0].offsetLeft;
    let div = document.getElementById("tabeldatanilaiki4");

    let tabel = document.querySelector(".datarekapkd4");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    div.scrollLeft = (x - y);

})

const getdataolahanketerampilan = () => {
    let divto = document.getElementById("menumenunilaikd4");
    divto.innerHTML = "Sedang proses mengambil data Pengolahan Nilai Anda di Server  <i class='fa fa-refresh fa-spin'></i>"
    let tes = tabelkearray();
    //let paspak = (idSemester == 2) ? "PAK" : "PAS";
    let tabeldata = document.querySelector(".datarekapkd4").getElementsByTagName("tbody")[0];
    let ddph = tes.filter(k => k[7] == true).map(k => "kpraktik_" + k[0] + "_" + k[3]);
    let ddpts = tes.filter(k => k[7] == true).map(k => "kproduk_" + k[0] + "_" + k[3]);
    let ddpas = tes.filter(k => k[7] == true).map(k => "kproyek_" + k[0] + "_" + k[3]);
    let a = ddph.concat(ddpts);

    let dds = a.concat(ddpas);
    //let tab = "rekapkd3";
    // let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    // fetch(constlinknilai + "?action=getdatafromtab" + param)

    let tab = "rekapkd4";
    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    fetch(constlinknilai + "?action=getdatafromtab" + param)
        .then(m => m.json())
        .then(k => {
            console.log(k);
            if (k.result == 0) {
                alert("Anda belum pernah menyimpan data pengolahan nilai.");
                divto.innerHTML = `
                Menu-menu Data KI-4:<br/>
                <button onclick="koleksicekliskdketerampilan()" title="Tampilkan data Asli yang diperoleh siswa">Tampilkan Data Asli</button>
                <button onclick="getdataolahanketerampilan()">Tampilkan Data Olahan</button>
                <button onclick="jadikansemuakkmketerampilan()" title="jadikan nilai kosong atau di bawah KKM menjadi nilai KKM Mapel tersebut">KKM-kan ?</button>
                <button onclick="simpandatakd4()" title="Simpan hasil Olahan Data Nilai Anda tanpa menghilangkan data asli siswa" class="tombolsimpanserverkd4">Simpan Data Olah</button>
                <button onclick="printdatakd4()" title="Cetak halaman ini ke Printer">Print</button>
                <button onclick="exceldatakd4()" title="Export halaman ini dalam format Ms. Excel">Ms. Excel</button>
                <button onclick="importdataKeTable('datarekapkd4')" title="Import Data Nlai">Import Data dari File Export</button>
                <br/><br/><br/>
                `
            } else {
                let ob = Object.keys(k.data[0]).filter(k => !(k === "no" || k === "nama"));
                let key = Object.keys(k.data[0]);
                let obb = JSON.stringify(ob);
                let ddx = JSON.stringify(dds);
                if (obb === ddx) {
                    //alert("sama headnya")
                    let lr = tabeldata.rows;

                    for (r = 0; r < lr.length; r++) {
                        let perbaris = lr[r];
                        for (s = 0; s < perbaris.cells.length; s++) {
                            let d = k.data[r][key[s]];
                            perbaris.cells[s].innerHTML = d;
                        }
                    }
                    divto.innerHTML = `
                    Menu-menu Data KI-4:<br/>
                    <button onclick="koleksicekliskdketerampilan()" title="Tampilkan data Asli yang diperoleh siswa">Tampilkan Data Asli</button>
                    <button onclick="getdataolahanketerampilan()">Tampilkan Data Olahan</button>
                    <button onclick="jadikansemuakkmketerampilan()" title="jadikan nilai kosong atau di bawah KKM menjadi nilai KKM Mapel tersebut">KKM-kan ?</button>
                    <button onclick="simpandatakd4()" title="Simpan hasil Olahan Data Nilai Anda tanpa menghilangkan data asli siswa" class="tombolsimpanserverkd4">Simpan Data Olah</button>
                    <button onclick="printdatakd4()" title="Cetak halaman ini ke Printer">Print</button>
                    <button onclick="exceldatakd4()" title="Export halaman ini dalam format Ms. Excel">Ms. Excel</button>
                    <button onclick="importdataKeTable('datarekapkd4')" title="Import Data Nlai">Import Data dari File Export</button>
                    <br/>

                    <span class="w3-text-red">Ini adalah nilai yang telah Anda Olah.</span><hr/>Rekapitulasi Data Nilai Kompetensi Keterampilan (KI-4) <span class="w3-text-red">(Data Pengolahan Nilai)</span>`;


                } else {
                    let konf = confirm("Sebaran KD yang telah disimpan sebelumnya berbeda dengan sebaran KD saat ini. Sebaran KD sebelumnya mungkin saja tidak valid dengan dengan data sebaran KD saat ini. Anda sebaiknya membuat Data Pengolahan Nilai yang sesuai dengan sebaran KD saat ini sebab data yang akan dijadikan deskripsi raport adalah sebaran KD saat ini. Apakah Anda ingin tetap menampilkannya?\n\n Klik [OK] untuk menampilkan data, atau \n\n Klik [CANCEL] untuk membatalkan");
                    //console.log(k.data)

                    if (!konf) {
                        divto.innerHTML = `
                        Menu-menu Data KI-4:<br/>
                        <button onclick="koleksicekliskdketerampilan()" title="Tampilkan data Asli yang diperoleh siswa">Tampilkan Data Asli</button>
                        <button onclick="getdataolahanketerampilan()">Tampilkan Data Olahan</button>
                        <button onclick="jadikansemuakkmketerampilan()" title="jadikan nilai kosong atau di bawah KKM menjadi nilai KKM Mapel tersebut">KKM-kan ?</button>
                        <button onclick="simpandatakd4()" title="Simpan hasil Olahan Data Nilai Anda tanpa menghilangkan data asli siswa" class="tombolsimpanserverkd4">Simpan Data Olah</button>
                        <button onclick="printdatakd4()" title="Cetak halaman ini ke Printer">Print</button>
                        <button onclick="exceldatakd4()" title="Export halaman ini dalam format Ms. Excel">Ms. Excel</button>
                        <button onclick="importdataKeTable('datarekapkd4')" title="Import Data Nlai">Import Data dari File Export</button>
                        <br/>`

                        // Ini adalah nilai yang benar-benar diperoleh siswa tanpa Anda olah.<hr/>Rekapitulasi Data Nilai Kompetensi Pengetahuan (KI-3)`;

                        return
                    }
                    dataolahbedaketerampilan(k.data);
                    divto.innerHTML = `
                    Menu-menu Data KI-4:<br/>
                    <button onclick="koleksicekliskdketerampilan()" title="Tampilkan data Asli yang diperoleh siswa">Tampilkan Data Asli</button>
                    <button onclick="getdataolahanketerampilan()">Tampilkan Data Olahan</button>
                    <button onclick="jadikansemuakkmketerampilan()" title="jadikan nilai kosong atau di bawah KKM menjadi nilai KKM Mapel tersebut">KKM-kan ?</button>
                    <button onclick="simpandatakd4()" title="Simpan hasil Olahan Data Nilai Anda tanpa menghilangkan data asli siswa" class="tombolsimpanserverkd4">Simpan Data Olah</button>
                    <button onclick="printdatakd4()" title="Cetak halaman ini ke Printer">Print</button>
                    <button onclick="exceldatakd4()" title="Export halaman ini dalam format Ms. Excel">Ms. Excel</button>
                    <button onclick="importdataKeTable('datarekapkd4')" title="Import Data Nlai">Import Data dari File Export</button>
                    <br/>
                    
                    <span class="w3-text-red">Ini adalah nilai yang telah Anda Olah.</span><hr/>Rekapitulasi Data Nilai Kompetensi Keterampilan (KI-4) <span class="w3-text-red">(Data Pengolahan Nilai ini berbeda dengan sebaran KD saat ini)</span><br/><br/>
                    Saran: Jika peringatan ini muncul, Anda sebaiknya membuat data pengolahan nilai baru lagi yang diambil dari data asli yang sesaui dengan sebaran KD saat ini kemudian simpan data pengolahan ke server.
                    `;

                }
                //console.log(obb);
            }


        })
        .catch(er => console.log(er))


}

const jadikansemuakkmketerampilan = () => {
    let datakkm = koleksiarraymapelaktif();
    let datamapel = datakkm.kodemapel;
    let td = document.querySelector(".resultkdyangdicekketerampilan");
    let tes = tabelkearray();
    let paspak = (idSemester == 2) ? "PAK" : "PAS";
    //permapel
    for (a = 0; a < datamapel.length; a++) {
        let selid = "tt_KD4_" + datamapel[a];
        let angkaid = "angkakkm_" + datamapel[a];
        let sel = document.querySelectorAll("." + selid);
        let angkakkm = document.getElementById(angkaid).innerHTML;
        sel.forEach(k => {
            if (k.innerHTML < parseInt(angkakkm)) {
                k.innerHTML = parseInt(angkakkm);
            }

        })
    }
}

var wrapperel1keterampilan = document.getElementById('scrollatasketerampilan');
var wrapperel2keterampilan = document.getElementById('tabeldatanilaiki4');
wrapperel1keterampilan.onscroll = function () {
    wrapperel2keterampilan.scrollLeft = wrapperel1keterampilan.scrollLeft;
};
wrapperel2keterampilan.onscroll = function () {
    wrapperel1keterampilan.scrollLeft = wrapperel2keterampilan.scrollLeft;
};
let nuhaaa
const simpandatakd4 = () => {
    let konfirmasi = confirm("Anda yakin ingin menyimpan data ini ke server?. Data yang sebelumnya akan diganti dengan data tabel ini. Klik OK untuk menyimpan atau klik CANCEL untuk membatalkannya.");
    if (!konfirmasi) {
        alert("Anda membatalkan simpan");
        return;
    };
    let tes = tabelkearray();
    nuhaaa = tes
    //let paspak = (idSemester == 2) ? "PAK" : "PAS";
    let tabeldata = document.querySelector(".datarekapkd4").getElementsByTagName("tbody")[0];
    let ddph = tes.filter(k => k[7] == true).map(k => "kpraktik_" + k[0] + "_" + k[3]);
    let ddpts = tes.filter(k => k[7] == true).map(k => "kproduk_" + k[0] + "_" + k[3]);
    let ddpas = tes.filter(k => k[7] == true).map(k => "kproyek_" + k[0] + "_" + k[3]);
    let a = ddph.concat(ddpts);

    let dds = a.concat(ddpas);
    let abc = ["no", "nama"];
    let dd = abc.concat(dds);

    let btn = document.querySelector(".tombolsimpanserverkd4");
    btn.innerHTML = "Simpan Data Olah <i class='fa fa-spin fa-spinner'></i>";
    //console.log(dd)
    let lr = tabeldata.rows;
    let all = []
    for (r = 0; r < lr.length; r++) {
        let perbaris = lr[r];
        let isi = []
        for (s = 0; s < perbaris.cells.length; s++) {

            let d = perbaris.cells[s].innerHTML;

            isi.push(d);

        }
        all.push(isi)
    }


    // console.log(all);

    let tab = "rekapkd4";
    let tabel = JSON.stringify(all);
    let head = JSON.stringify(dd);

    let data = new FormData();
    data.append("tabel", tabel);
    data.append("head", head);
    data.append("kelas", idNamaKelas);
    data.append("prefiktab", tab);
    fetch(constlinknilai + "?action=inserttabeltospreadsheet", {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(k => {
            alert(k.result);
            btn.innerHTML = "Simpan Data Olah";
            //tombol.innerHTML = "Simpan di Server"
        })
        .catch(er => alert(er))

}

const dataolahbedaketerampilan = (arr) => {
    let dmapel = koleksiarraymapelaktif();
    let paspak = (idSemester == 2) ? "PAK" : "PAS";
    let datamapel = dmapel.kodemapel;
    let key = Object.keys(arr[0])
    let keyid = key.filter(k => !(k === "no" || k === "nama"))
    // console.log(keyid);
    let cek = keyid.filter(j => j.indexOf("kpraktik_") > -1)
    let ceka = keyid.filter(j => j.indexOf("kproduk_") > -1)
    let cekb = keyid.filter(j => j.indexOf("kproyek_") > -1)
    let countkey = (cek.length)
    let countkeya = (ceka.length)
    let countkeyb = (cekb.length)
    // console.log(cek.length);
    // console.log(ceka.length);
    // console.log(cekb.length);
    //et KD3 = arr;




    //console.log(cek);
    //console.log(keyid);

    // for(a = 0 ; a < datamapel ; a++){

    // }
    //console.log(countkey);

    let rekap = `
    <table class="versi-table w3-tiny datarekapkd4">
    <thead>
    <tr>
        <th rowspan="3">No.</th>
        <th style="position:sticky;position:-webkit-sticky;left:0px;" rowspan="3">Nama Siswa</th>

    <th colspan="${countkey}">Rekap Nilai Praktik</th>
    <th colspan="${countkeya}">Rekap Nilai Produk</th>
    <th colspan="${countkeyb}">Rekap Nilai Proyek</th>
        </tr><tr>
    `;
    // head PH
    for (a = 0; a < datamapel.length; a++) {
        let kolomkd = keyid.filter(j => j.indexOf("kpraktik_" + datamapel[a]) > -1);
        let id = "angkakkm_" + datamapel[a];
        let kkmnya = document.getElementById(id).innerHTML;
        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapkpraktik" colspan="${kolomkd.length}"> ${datamapel[a]} (KKM = ${kkmnya})</th>`;
        }
    }
    // head PTS
    for (d = 0; d < datamapel.length; d++) {
        let kolomkd = keyid.filter(j => j.indexOf("kproduk_" + datamapel[d]) > -1)
        let id = "angkakkm_" + datamapel[d];
        let kkmnya = document.getElementById(id).innerHTML;

        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapkproduk w3-light-green" colspan="${kolomkd.length}">  ${datamapel[d]} (KKM = ${kkmnya})</th>`;
        }
    }
    // head PAS
    for (e = 0; e < datamapel.length; e++) {
        let kolomkd = keyid.filter(j => j.indexOf("kproyek_" + datamapel[e]) > -1);
        let id = "angkakkm_" + datamapel[e];
        let kkmnya = document.getElementById(id).innerHTML;
        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapkproyek w3-deep-orange"  colspan="${kolomkd.length}">${datamapel[e]} (KKM = ${kkmnya})</th>`;
        }
    }

    rekap += "</tr><tr>";

    for (b = 0; b < datamapel.length; b++) {
        let kolomkds = keyid.filter(j => j.indexOf("kpraktik_" + datamapel[b]) > -1);
        //console.log(kolomkds);
        if (kolomkds !== 0) {
            for (c = 0; c < kolomkds.length; c++) {
                rekap += `<th  class="tt_rekapkpraktik" >${kolomkds[c].split("_")[2]}</th>`

            }

        }
    }
    for (f = 0; f < datamapel.length; f++) {
        let kolomkds = keyid.filter(j => j.indexOf("kproduk_" + datamapel[f]) > -1);
        if (kolomkds !== 0) {
            for (g = 0; g < kolomkds.length; g++) {
                rekap += `<th  class="tt_rekapkproduk w3-light-green" >${kolomkds[g].split("_")[2]}</th>`
            }

        }
    }
    for (m = 0; m < datamapel.length; m++) {
        let kolomkds = keyid.filter(j => j.indexOf("kproyek_" + datamapel[m]) > -1)
        if (kolomkds !== 0) {
            for (n = 0; n < kolomkds.length; n++) {
                rekap += `<th  class="tt_rekapkproyek w3-deep-orange" >${kolomkds[n].split("_")[2]}</th>`
            }

        }
    }

    rekap += `</tr></thead><tbody>`;

    //isikan data siswa
    for (o = 0; o < jsondatasiswa.length; o++) {
        //console.log(o)
        rekap += `<tr>
            <td>${o + 1}</td>
            <td  style="position:sticky;position:-webkit-sticky;left:0px;">${jsondatasiswa[o].pd_nama}</td>`

        for (b = 0; b < datamapel.length; b++) {
            let xxx = keyid.filter(j => j.indexOf("kpraktik_" + datamapel[b]) > -1);
            let kolomkds = xxx;
            if (kolomkds !== 0) {
                for (c = 0; c < kolomkds.length; c++) {
                    //  console.log(KD3[datamapel[b]][c])

                    let nilaisementara = arr[o][kolomkds[c]];
                    rekap += `<td  class="tt_rekapkpraktik tt_KD4_${datamapel[b]}"  contenteditable="true">${nilaisementara}</td>`;
                }

            }
        }
        for (f = 0; f < datamapel.length; f++) {
            let xxx = keyid.filter(j => j.indexOf("kproduk_" + datamapel[f]) > -1);
            let kolomkds = xxx;
            if (kolomkds !== 0) {
                for (g = 0; g < kolomkds.length; g++) {
                    let nilaisementarapts = arr[o][kolomkds[g]];
                    rekap += `<td  class="tt_rekapkproduk tt_KD4_${datamapel[f]}"  contenteditable="true">${nilaisementarapts}</td>`;
                }

            }
        }
        for (m = 0; m < datamapel.length; m++) {
            let xxx = keyid.filter(j => j.indexOf("kproyek_" + datamapel[m]) > -1);
            let kolomkds = xxx;
            if (kolomkds !== 0) {
                for (n = 0; n < kolomkds.length; n++) {
                    let nilaisementarapaspak = arr[o][kolomkds[n]];
                    rekap += `<td  class="tt_rekapkproyek  tt_KD4_${datamapel[m]}" contenteditable="true">${nilaisementarapaspak}</td>`;
                }

            }
        }

        `</tr>`
    }
    document.getElementById("tabeldatanilaiki4").innerHTML = rekap;
    let wid = document.querySelector(".datarekapkd4").offsetWidth;
    let divscroll = document.getElementById("scrollatasketerampilan");
    let isidivscroll = document.getElementById("isiscrollatasketerampilan");
    let divolahnilai = document.getElementById("olahnilai");
    let ww = divolahnilai.offsetWidth;

    divscroll.setAttribute("style", `border: none 0px red;overflow-x: scroll;`)
    isidivscroll.setAttribute("style", `width:${wid}px;height:20px`)
}
const printdatakd4 = () => {
    let isibody = document.getElementById("tabeldatanilaiki4").innerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO DATA NILAI KETERAMPILAN</title>`;
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

    body.innerHTML = `<h3 class="w3-center">Rekapitulasi Nilai Kompetensi Keterampilan (KI-4)</h3`;
    body.innerHTML += `<h4 class="w3-center">Kelas ${idNamaKelas} Semester ${idSemester}</h4>`;
    body.innerHTML += `<h5 class="w3-center">Tahun Pelajaran ${idTeksTapel}</h5>`;
    body.innerHTML += `${isibody}`;
    body.innerHTML += '<div style="float:left;position:relative;margin-left:50px;text-align:center">Mengetahui,<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><br/><u><b>' + idNamaKepsek + '</b></u><br/>NIP. ' + idNipKepsek + '</div>';
    body.innerHTML += '<div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ', ' + tanggalfull(new Date()) + '<br/>' + idJenisGuru + '<br/><br/><br/><br/><br/><b><u>' + namauser + '</u></b><br/>NIP. ' + idNipGuruKelas + '</div>';



    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}

const exceldatakd4 = () => {
    let tabelsumber = document.querySelector(".datarekapkd4");
    let divto = document.getElementById("datasiswaprint");
    let headsumber = tabelsumber.getElementsByTagName("thead")[0];
    let bodysumber = tabelsumber.getElementsByTagName("tbody")[0];
    let jumlahkolom = bodysumber.rows[0].cells.length;

    let tekshtml = `<table class="versi-table w3-tiny" id="tablekeexcelekapkd4">
    <tr>
        <td colspan="${jumlahkolom}">Rekapitulasi Nilai Kompetensi Keterampilan (KI-4)</td>
        </tr><tr>
        <td colspan="${jumlahkolom}">Kelas ${idNamaKelas} Semester ${idSemester}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}">Tahun Pelajaran ${idTeksTapel}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}"></td>
        
    <tr>
    ${headsumber.innerHTML.replace(/4\./g, "'4.")}
    ${bodysumber.innerHTML}
    <tr>
         
    <tr>`


    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Mengetahui, </td>
    <td></td>
    `;
    let sisakolom = jumlahkolom - 11;
    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${jlo.kota}, ${tanggalfull(new Date())}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Kepala ${idNamaSekolah} </td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${idJenisGuru} ${idNamaKelas}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>
    <tr></tr>
    <tr></tr>
    <tr></tr>
    `;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3"><b><u>${idNamaKepsek}</u></b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3"><b><u>${namauser}</u></b></td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">NIP. ${idNipKepsek}</b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">NIP. ${idNipGuruKelas}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `</table>`;
    divto.innerHTML = tekshtml
    $("#tablekeexcelekapkd4").table2excel({

        name: "Worksheet Name",
        filename: "Rekap Nilai KI 4 idfile " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 3,
        barisatas: 5

    });
    divto.innerHTML = "";

}

const algoritmaketerampilan = (xx) => {
    let x = parseInt(xx)

    let datakkm = koleksiarraymapelaktif();
    let datamapel = datakkm.kodemapel;
    //let td = document.querySelector(".resultkdyangdicek");
    let tes = tabelkearray();
    let sumbernilai = document.querySelector(".datarekapkd4").getElementsByTagName("tbody")[0];


    //console.log(datamapel)
    let datakd4 = {};
    let datasementara = {};
    let jumlahsemuakd = 0;

    for (i = 0; i < datamapel.length; i++) {
        let arrKD4 = tes.filter(k => k[7] == true && k[0] == datamapel[i]);
        jumlahsemuakd += arrKD4.length;
        let kd = arrKD4.map(l => l[3])

        datasementara[datamapel[i]] = kd;


    }
    datakd4["data"] = datasementara;
    datakd4["jumlahsemuakd"] = jumlahsemuakd;
    // console.log(datakd3);
    // let praktik = 2;
    // let produk = parseInt(praktik + jumlahsemuakd);
    // let proyek = parseInt(produk + jumlahsemuakd);
    // // console.log(ph)
    // console.log(pts)
    // console.log(pas)
    // for(c = 0 ; c < jumlahsemuakd ; c++){
    //     let nilaiph = 
    // }

    //contoh salah satu siswa dulu:
    // for(a = 0 ; a < jsondatasiswa.length ; a++) // aktifkan ini untuk seluruh siswa
    //let infomapel = Object.keys(datakd3.data);
    let inforaport = {};
    // inforaport["namasiswa"] = jsondatasiswa[a]
    let acuan = 0;
    let arrayobjekmapel = [];

    for (b = 0; b < datamapel.length; b++) {
        let objeknilai = {};
        let arraynilai = [];

        let namamapel = datamapel[b];

        //objeknilai["raport_IPA"]
        // console.log(namamapel)
        // jumlahkdmapelin
        let jumlahkdmapelini = datakd4["data"][datamapel[b]];
        //console.log(jumlahkdmapelini.length)
        let arrpts = []
        let angkanilaikd = 0;
        let angkapembagi = 0;
        let acuanmaks = 0;
        let acuanmin = 0;
        let nilaiKD = 0;
        let kdMaks = "";
        let kdMins = "";
        let nilaiRaport = 0;
        let angkapembagitotal = 0;
        for (c = 0; c < jumlahkdmapelini.length; c++) {
            // console.log(jumlahkdmapelini[c]);
            let acuanph = b + c + 2 + acuan;
            // console.log(acuanph);
            let acuanpts = b + c + 2 + acuan + jumlahsemuakd;
            let acuanpas = b + c + 2 + acuan + jumlahsemuakd + jumlahsemuakd;
            //tentukan masing-masing nilainya
            let nilaiph = sumbernilai.rows[x].cells[acuanph].innerHTML;
            // console.log(nilaiph);
            let in_nilaiph = (nilaiph === "") ? 0 : parseInt(nilaiph);
            let tambahpembagi = (nilaiph === "") ? 0 : 1;


            let nilaipts = sumbernilai.rows[x].cells[acuanpts].innerHTML;
            let in_nilaipts = (nilaipts === "") ? 0 : parseInt(nilaipts);
            let tambahpembagipts = (nilaipts === "") ? 0 : 1;

            let nilaipas = sumbernilai.rows[x].cells[acuanpas].innerHTML;
            let in_nilaipas = (nilaipas === "") ? 0 : parseInt(nilaipas);
            let tambahpembagipas = (nilaipas === "") ? 0 : 1;

            angkanilaikd = (in_nilaiph + in_nilaipts + in_nilaipas);
            // console.log("angka nilaikd=" + angkanilaikd)
            angkapembagi = (tambahpembagi + tambahpembagipts + tambahpembagipas);
            // console.log("angka pembagi=" + angkapembagi)

            if (angkapembagi !== 0) {
                nilaiKD = Math.round(angkanilaikd / angkapembagi)
            }
            // console.log("Nilai tiap KD = " + nilaiKD);
            if (acuanmaks < nilaiKD) {
                acuanmaks = nilaiKD;
                kdMaks = jumlahkdmapelini[c];
            }
            if (acuanmin == 0 || acuanmin > nilaiKD) {
                acuanmin = nilaiKD
                kdMins = jumlahkdmapelini[c];
            }

            nilaiRaport += nilaiKD;
            angkapembagitotal += (angkapembagi > 0) ? 1 : 0;
        }
        //console.log("nilai maks : " + acuanmaks);
        // console.log("KD maks : " + kdMaks);
        // //console.log("nialai min : " + acuanmin);
        // console.log("KD min : " + kdMins);
        // console.log("nilairaport " + nilaiRaport)
        // console.log("angka pembagi total = " + angkapembagitotal)
        //fn_predikatkriteria

        // let oknilairaport = Math.round(nilaiRaport / jumlahkdmapelini.length);
        let oknilairaport = (angkapembagitotal == 0) ? "" : Math.round(nilaiRaport / angkapembagitotal);
        //console.log()

        acuan += jumlahkdmapelini.length - 1;
        //console.log(arrpts);
        objeknilai["raportk4_" + namamapel] = oknilairaport;
        objeknilai["kriteriak4_" + namamapel] = fn_predikatkriteria(oknilairaport);
        objeknilai["maksk4_" + namamapel] = kdMaks;
        objeknilai["kriteria_maksk4_" + namamapel] = fn_predikatkriteria(acuanmaks);
        objeknilai["mink4_" + namamapel] = kdMins;
        objeknilai["kriteria_mink4_" + namamapel] = fn_predikatkriteria(acuanmin);

        arrayobjekmapel.push(objeknilai);

    }
    inforaport["datarraport"] = arrayobjekmapel;
    // console.log(inforaport);
    return inforaport

}

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
let tabacrdklainnya = document.querySelector(".tabdataperkembanganraport");
let tabelblainnya = document.getElementById("tabel_data_b_lainnya");
// setiap ''ph' diganti kpraktik
//setiap pts diganti kproduk
//setiap pas diganti kproyek
let datatambahan = {};
tabacrdklainnya.addEventListener("click", async function () {

    let tekshtml = "";
    let tab = "pelengkapraport";
    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;
    await fetch(constlinknilai + "?action=getdatafromtab" + param)
        .then(m => m.json())
        .then(k => {
            datatambahan = k;
            if (k.result == 0) {
                alert("Anda belum pernah membuat data rekap perkembangan lainnya.");
                tekshtml = `
                <table class="versi-table tabeldataperkembangan w3-small">
                <thead>
                <tr>
                <th rowspan="3" class="th_no">No</th>
                <th rowspan="3" class="th_namasiswa" style="position:sticky;position:-webkit-sticky;left:0px;">Nama Siswa</th>
                        <th colspan="9" class="th_ekskul">Ekstrakurikuler</th>
                        <th rowspan="3" class="th_saran">   Saran-saran   </th>
                        <th colspan="4" class="th_tbbb">Tinggi dan Berat Badan</th>
                        <th colspan="4" class="th_kesehatan">Kondisi Kesehatan</th>
                        <th colspan="6" class="th_prestasi">Prestasi</th>
                        <th rowspan="3" class="th_naikkelas">Kenaikan Kelas/Kelulusan</th>    
                        </tr>
                        <tr>
                        <th colspan="3">Ekskul ke-1</th>
                        <th colspan="3">Ekskul ke-2</th>
                        <th colspan="3">Ekskul ke-3</th>
                        <th colspan="2">Tinggi Badan (Cm)<br/>Isi tanpa satuannya</th>
                        <th colspan="2">Berat Badan Badan(Kg)<br/>Isi tanpa satuannya</th>
                        <th rowspan="2">Pendengaran</th>
                        <th rowspan="2">Penglihatan</th>
                        <th rowspan="2">Gigi</th>
                        <th rowspan="2">Lainnya</th>
                        <th colspan="2">Prestasi ke-1</th>
                        <th colspan="2">Prestasi ke-2</th>
                        <th colspan="2">Prestasi ke-3</th>
                    
                </tr>
                    <tr>
                    <th>Nama Ekskul ke-1</th>
                    <th>Nilai Ekskul ke-1</th>
                    <th>Keterangan Ekskul ke-1</th>
                    <th>Nama Ekskul ke-2</th>
                    <th>Nilai Ekskul ke-2</th>
                    <th>Keterangan Ekskul ke-2</th>
                    <th>Nama Ekskul ke-3</th>
                    <th>Nilai Ekskul ke-3</th>
                    <th>Keterangan Ekskul ke-3</th>
                    <th> Semester 1</th>
                    <th> Semester 2</th>
                    <th> Semester 1</th>
                    <th> Semester 2</th>
                    <th>Jenis Prestasi ke-1</th>
                    <th>Keterangan Prestasi ke-1</th>
                    <th>Jenis Prestasi ke-2</th>
                    <th>Keterangan Prestasi ke-2</th>
                    <th>Jenis Prestasi ke-3</th>
                    <th>Keterangan Prestasi ke-3</th>
                    </tr>
                    
                    
                    
                    
                    </thead>
                    <tbody>
                    `
                for (a = 0; a < jsondatasiswa.length; a++) {
                    tekshtml += `
                        <tr>
                        <td>${a + 1}</td>
                        <td style="position:sticky;position:-webkit-sticky;left:0px;">${jsondatasiswa[a].pd_nama}</td>`;
                    for (b = 0; b < 25; b++) {
                        if (b == 9) {
                            tekshtml += `<td class="tdlain_${a}_${b}"   contenteditable="true"></td>`;
                        } else {
                            tekshtml += `<td class="tdlain_${a}_${b}" contenteditable="true"></td>`;
                        }



                    }
                    tekshtml += `</tr>`;
                }
                tekshtml += `
                </tbody>
                <table>
                `;


            } else {
                tekshtml = `
                <table class="versi-table tabeldataperkembangan w3-small">
                <thead>
                <tr>
                <th rowspan="3" class="th_no">No</th>
                <th rowspan="3" class="th_namasiswa" style="position:sticky;position:-webkit-sticky;left:0px;">Nama Siswa</th>
                        <th colspan="9" class="th_ekskul">Ekstrakurikuler</th>
                        <th rowspan="3" class="th_saran">   Saran-saran   </th> 
                        <th colspan="4" class="th_tbbb">Tinggi dan Berat Badan</th>
                        <th colspan="4" class="th_kesehatan">Kondisi Kesehatan</th>
                        <th colspan="6" class="th_prestasi">Prestasi</th>
                        <th rowspan="3" class="th_naikkelas">Kenaikan Kelas/Kelulusan</th>    
                        </tr>
                        <tr>
                        <th colspan="3">Ekskul ke-1</th>
                        <th colspan="3">Ekskul ke-2</th>
                        <th colspan="3">Ekskul ke-3</th>
                        <th colspan="2">Tinggi Badan (Cm)<br/>Isi tanpa satuannya</th>
                        <th colspan="2">Berat Badan Badan(Kg)<br/>Isi tanpa satuannya</th>
                        <th rowspan="2">Pendengaran</th>
                        <th rowspan="2">Penglihatan</th>
                        <th rowspan="2">Gigi</th>
                        <th rowspan="2">Lainnya</th>
                        <th colspan="2">Prestasi ke-1</th>
                        <th colspan="2">Prestasi ke-2</th>
                        <th colspan="2">Prestasi ke-3</th>
                    
                </tr>
                    <tr>
                    <th>Nama Ekskul ke-1</th>
                    <th>Nilai Ekskul ke-1</th>
                    <th>Keterangan Ekskul ke-1</th>
                    <th>Nama Ekskul ke-2</th>
                    <th>Nilai Ekskul ke-2</th>
                    <th>Keterangan Ekskul ke-2</th>
                    <th>Nama Ekskul ke-3</th>
                    <th>Nilai Ekskul ke-3</th>
                    <th>Keterangan Ekskul ke-3</th>
                    <th> Semester 1</th>
                    <th> Semester 2</th>
                    <th> Semester 1</th>
                    <th> Semester 2</th>
                    <th>Jenis Prestasi ke-1</th>
                    <th>Keterangan Prestasi ke-1</th>
                    <th>Jenis Prestasi ke-2</th>
                    <th>Keterangan Prestasi ke-2</th>
                    <th>Jenis Prestasi ke-3</th>
                    <th>Keterangan Prestasi ke-3</th>
                    </tr>
                    
                    
                    
                    
                    </thead>
                    <tbody>
                    `;
                for (i = 0; i < k.data.length; i++) {
                    tekshtml += `
                    <tr>
                    <td>${i + 1}</td>
                    <td style="position:sticky;position:-webkit-sticky;left:0px;">${k.data[i].nama}</td>`;
                    for (b = 0; b < 25; b++) {
                        if (b == 9) {
                            tekshtml += `<td class="tdlain_${i}_${b}" contenteditable="true" style="width:300px">${k.data[i]["head_" + b]}</td>`;
                        } else {
                            tekshtml += `<td class="tdlain_${i}_${b}" contenteditable="true">${k.data[i]["head_" + b]}</td>`;

                        }
                    }
                    tekshtml += `</tr>`;

                }
                tekshtml += `
                </tbody>
                <table>
                `;

            }
        })
        .catch(er => console.log(er))

    tabelblainnya.innerHTML = tekshtml;
    let wid = document.querySelector(".tabeldataperkembangan").offsetWidth;
    let divscroll = document.getElementById("scrollatas_b");
    let isidivscroll = document.getElementById("isiscrollatas_b");


    divscroll.setAttribute("style", `border: none 0px red;overflow-x: scroll;position:sticky;position:-webkit-sticky;top:25px;`)
    isidivscroll.setAttribute("style", `width:${wid}px;height:20px`)
})


var wrapperel1w = document.getElementById('scrollatas_b');
var wrapperel2w = document.getElementById('tabel_data_b_lainnya');
wrapperel1w.onscroll = function () {
    wrapperel2w.scrollLeft = wrapperel1w.scrollLeft;
};
wrapperel2w.onscroll = function () {
    wrapperel1w.scrollLeft = wrapperel2w.scrollLeft;
};


let tt_tabtab1 = document.querySelector(".tabtabekskul");
let tt_tabtab2 = document.querySelector(".tabtabsaran");
let tt_tabtab3 = document.querySelector(".tabtabtinggibadan");
let tt_tabtab4 = document.querySelector(".tabtabkondisikesehatan");
let tt_tabtab5 = document.querySelector(".tabtabprestasi");
let tt_tabtab6 = document.querySelector(".tabtabkenaikankelas");
tt_tabtab1.addEventListener("click", function () {
    tt_tabtab1.className += " activee";
    tt_tabtab2.className = tt_tabtab2.className.replace(/activee/g, "");
    tt_tabtab3.className = tt_tabtab3.className.replace(/activee/g, "");
    tt_tabtab4.className = tt_tabtab4.className.replace(/activee/g, "");
    tt_tabtab5.className = tt_tabtab5.className.replace(/activee/g, "");
    tt_tabtab6.className = tt_tabtab6.className.replace(/activee/g, "");

    let classph = document.querySelectorAll(".tabeldataperkembangan");
    if (classph[0] == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("tabel_data_b_lainnya");
    let tabel = document.querySelector(".tabeldataperkembangan");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph[0].offsetLeft;
    div.scrollLeft = 0;// (x - y);
})
tt_tabtab2.addEventListener("click", function () {
    tt_tabtab2.className += " activee";
    tt_tabtab1.className = tt_tabtab1.className.replace(/activee/g, "");
    tt_tabtab3.className = tt_tabtab3.className.replace(/activee/g, "");
    tt_tabtab4.className = tt_tabtab4.className.replace(/activee/g, "");
    tt_tabtab5.className = tt_tabtab5.className.replace(/activee/g, "");
    tt_tabtab6.className = tt_tabtab6.className.replace(/activee/g, "");

    let classph = document.querySelector(".th_saran");
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("tabel_data_b_lainnya");
    let tabel = document.querySelector(".tabeldataperkembangan");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = (x - y);
})
tt_tabtab3.addEventListener("click", function () {
    tt_tabtab3.className += " activee";
    tt_tabtab1.className = tt_tabtab1.className.replace(/activee/g, "");
    tt_tabtab2.className = tt_tabtab2.className.replace(/activee/g, "");
    tt_tabtab4.className = tt_tabtab4.className.replace(/activee/g, "");
    tt_tabtab5.className = tt_tabtab5.className.replace(/activee/g, "");
    tt_tabtab6.className = tt_tabtab6.className.replace(/activee/g, "");

    let classph = document.querySelector(".th_tbbb");
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("tabel_data_b_lainnya");
    let tabel = document.querySelector(".tabeldataperkembangan");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = (x - y);
})
tt_tabtab4.addEventListener("click", function () {
    tt_tabtab4.className += " activee";
    tt_tabtab1.className = tt_tabtab1.className.replace(/activee/g, "");
    tt_tabtab2.className = tt_tabtab2.className.replace(/activee/g, "");
    tt_tabtab3.className = tt_tabtab3.className.replace(/activee/g, "");
    tt_tabtab5.className = tt_tabtab5.className.replace(/activee/g, "");
    tt_tabtab6.className = tt_tabtab6.className.replace(/activee/g, "");

    let classph = document.querySelector(".th_kesehatan");
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("tabel_data_b_lainnya");
    let tabel = document.querySelector(".tabeldataperkembangan");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = (x - y);
})

tt_tabtab5.addEventListener("click", function () {
    tt_tabtab5.className += " activee";
    tt_tabtab1.className = tt_tabtab1.className.replace(/activee/g, "");
    tt_tabtab2.className = tt_tabtab2.className.replace(/activee/g, "");
    tt_tabtab3.className = tt_tabtab3.className.replace(/activee/g, "");
    tt_tabtab4.className = tt_tabtab4.className.replace(/activee/g, "");
    tt_tabtab6.className = tt_tabtab6.className.replace(/activee/g, "");

    let classph = document.querySelector(".th_prestasi");
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("tabel_data_b_lainnya");
    let tabel = document.querySelector(".tabeldataperkembangan");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = (x - y);
})
tt_tabtab6.addEventListener("click", function () {
    tt_tabtab6.className += " activee";
    tt_tabtab1.className = tt_tabtab1.className.replace(/activee/g, "");
    tt_tabtab2.className = tt_tabtab2.className.replace(/activee/g, "");
    tt_tabtab3.className = tt_tabtab3.className.replace(/activee/g, "");
    tt_tabtab4.className = tt_tabtab4.className.replace(/activee/g, "");
    tt_tabtab5.className = tt_tabtab5.className.replace(/activee/g, "");

    let classph = document.querySelector(".th_naikkelas");
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("tabel_data_b_lainnya");
    let tabel = document.querySelector(".tabeldataperkembangan");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = (x - y);
})

let prtRekapLain = document.querySelector(".bl_print")

prtRekapLain.addEventListener("click", function () {
    let isibody = document.getElementById("tabel_data_b_lainnya").innerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO REKAP DATA PERKEMBANGAN SISWA</title>`;
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

    body.innerHTML = `<h3 class="w3-center">Rekapitulasi Perkembangan dan Prestasi Siswa</h3`;
    body.innerHTML += `<h4 class="w3-center">Kelas ${idNamaKelas} Semester ${idSemester}</h4>`;
    body.innerHTML += `<h5 class="w3-center">Tahun Pelajaran ${idTeksTapel}</h5>`;
    body.innerHTML += `${isibody}`;
    body.innerHTML += '<div style="float:left;position:relative;margin-left:50px;text-align:center">Mengetahui,<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><br/><u><b>' + idNamaKepsek + '</b></u><br/>NIP. ' + idNipKepsek + '</div>';
    body.innerHTML += '<div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ', ' + tanggalfull(new Date()) + '<br/>' + idJenisGuru + '<br/><br/><br/><br/><br/><b><u>' + namauser + '</u></b><br/>NIP. ' + idNipGuruKelas + '</div>';



    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

})

let excelprkembang = document.querySelector(".bl_excel");
excelprkembang.addEventListener("click", function () {
    let tabelsumber = document.querySelector(".tabeldataperkembangan");
    let divto = document.getElementById("datasiswaprint");
    let headsumber = tabelsumber.getElementsByTagName("thead")[0];
    let bodysumber = tabelsumber.getElementsByTagName("tbody")[0];
    let jumlahkolom = bodysumber.rows[0].cells.length;

    let tekshtml = `<table class="versi-table w3-tiny" id="tablekeexcelkembang">
    <tr>
        <td colspan="${jumlahkolom}">Rekapitulasi Perkembangan dan Prestasi Siswa</td>
        </tr><tr>
        <td colspan="${jumlahkolom}">Kelas ${idNamaKelas} Semester ${idSemester}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}">Tahun Pelajaran ${idTeksTapel}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}"></td>
        
    <tr>
    ${headsumber.innerHTML}
    ${bodysumber.innerHTML}
    <tr>
         
    <tr>`


    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Mengetahui, </td>
    <td></td>
    `;
    let sisakolom = jumlahkolom - 11;
    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${jlo.kota}, ${tanggalfull(new Date())}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Kepala ${idNamaSekolah} </td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${idJenisGuru} ${idNamaKelas}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>
    <tr></tr>
    <tr></tr>
    <tr></tr>
    `;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3"><b><u>${idNamaKepsek}</u></b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3"><b><u>${namauser}</u></b></td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">NIP. ${idNipKepsek}</b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">NIP. ${idNipGuruKelas}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `</table>`;
    divto.innerHTML = tekshtml
    $("#tablekeexcelkembang").table2excel({

        name: "Worksheet Name",
        filename: "Rekap Perkembangan dan Prestasi idfile " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 3,
        barisatas: 5

    });
    divto.innerHTML = "";

})

let btn_savekembang = document.querySelector(".bl_simpanserver");
btn_savekembang.addEventListener("click", function () {

    //let paspak = (idSemester == 2) ? "PAK" : "PAS";
    let tabeldata = document.querySelector(".tabeldataperkembangan").getElementsByTagName("tbody")[0];


    btn_savekembang.innerHTML = "Simpan Ke Server  <i class='fa fa-spin fa-spinner'></i> ...";
    //console.log(dd)
    let lr = tabeldata.rows;
    let all = []
    for (r = 0; r < lr.length; r++) {
        let perbaris = lr[r];
        let isi = []
        for (s = 0; s < perbaris.cells.length; s++) {

            let d = perbaris.cells[s].innerHTML;

            isi.push(d);

        }
        all.push(isi)
    }


    // console.log(all);

    let dd = ["no", "nama"]
    for (b = 0; b < 25; b++) {
        let teks = "head_" + b;
        dd.push(teks)
    }

    let tab = "pelengkapraport";
    let tabel = JSON.stringify(all);
    let head = JSON.stringify(dd);

    let data = new FormData();
    data.append("tabel", tabel);
    data.append("head", head);
    data.append("kelas", idNamaKelas);
    data.append("prefiktab", tab);
    fetch(constlinknilai + "?action=inserttabeltospreadsheet", {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(k => {

            alert(k.result);
            btn_savekembang.innerHTML = `<i class="fa fa-globe"></i> Simpan Ke Server`;

            //tombol.innerHTML = "Simpan di Server"
        })
        .catch(er => alert(er))

});
let btn_impor = document.querySelector(".bl_importexcel");
btn_impor.addEventListener("click", () => {
    importdataKeTablePerlengkapan('tabeldataperkembangan');
});
const titimangsaraport = () => {
    let teks = "TITIMANGSA RAPORT SEMESTER " + idSemester;
    let ok = ""
    let tt = JSON.parse(localStorage.getItem("Kaldik"));

    let st = tt.findIndex(k => k["keterangan"] == teks)
    if (st > -1) {
        ok = tanggalfull(tt[st]["start_tgl"])
    } else {
        ok = "25 Juni 2021"
    }
    return ok
}

const kehadiranraport = (indek) => {
    //let indek = 0;
    let tabel = document.getElementById("idtabelrekapsemester").getElementsByTagName("tbody")[0];
    let cH = 0;
    let cI = 0
    let cS = 0;
    let cA = 0;

    let sel = tabel.rows[indek];
    let cekdata, angkaH, angkaS, angkaI, angkaA;
    let codH = [3, 8, 13, 18, 23, 28];
    let codS = [4, 9, 14, 19, 24, 29];
    let codI = [5, 10, 15, 20, 25, 30];
    let codA = [6, 11, 16, 21, 26, 31]
    for (i = 0; i < 6; i++) {
        let h = sel.cells[codH[i]].innerHTML;
        let s = sel.cells[codS[i]].innerHTML;
        let ij = sel.cells[codI[i]].innerHTML;
        let A = sel.cells[codA[i]].innerHTML;
        angkaH = (h == "" || h == "-") ? 0 : parseInt(h);
        angkaS = (s == "" || s == "-") ? 0 : parseInt(s);
        angkaI = (ij == "" || ij == "-") ? 0 : parseInt(ij);
        angkaA = (A == "" || A == "-") ? 0 : parseInt(A);
        cH += angkaH;
        cS += angkaS;
        cI += angkaI;
        cA += angkaA;

    }
    let data = {}
    data["hadir"] = cH;
    data["sakit"] = cS;
    data["ijin"] = cI;
    data["alpa"] = cA;
    return data

}

const changebarcode = () => {
    let dd = document.getElementById("ttdbarcoderaport")
    let ini = document.getElementById("cekbarcode");
    if (ini.checked) {
        dd.innerHTML = "Tanda Tangan Barcode (Aktif)"
    } else {
        dd.innerHTML = "Tanda Tangan Barcode (Tidak Aktif)/Tidak menyertakan barcode tanda tangan"
    }

}

const cetakraportsiswaini = () => {

    let isi = document.getElementById("halamanraport").innerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>Raport E-LAMASO</title>`;
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

const listpublikasiraportsemester = () => {
    let bt = document.querySelector("#halamanlistraport");
    bt.innerHTML = "<i class='fa fa-spinner fa-spin'></i>";

    let div = document.querySelector("#halamanlistraport");
    div.scrollIntoView();
    let tekshtml = `<h4>Data Publikasi Raport Semester</h4><table class="versi-table w3-small" id="tabelcekpublikasiraportsemester">
                <thead><tr>
                    <th>No</th>
                    <th>Nama Siswa</th>
                    <th>Preview</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
                </thead><tbody>
                `;
    for (i = 0; i < jsondatasiswa.length; i++) {
        tekshtml += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${jsondatasiswa[i].pd_nama}</td>
                        <td class="w3-center">Belum dipublikasikan</td>
                        <td class="w3-center"><span class="w3-text-red">?</span></td>
                        <td class="w3-center">-</td>
                    </tr>
                    `
    }
    tekshtml += `</tbody></table>`;
    div.innerHTML = tekshtml;

    fetch(constlinknilai + "?action=cekpublikasiraportsemester&kelas=" + idNamaKelas)
        .then(m => m.json())
        .then(r => {
            //console.log(r);

            let cekdata = r.result;

            if (cekdata == 0) {
                div.innerHTML = "<h4>Maaf, Anda belum pernah mempublikasikan Raport Semester</h4>";
            } else {
                let data = r.data;
                let datanama, dataid, dataaksi,
                    indektabel, idtabel = document.getElementById("tabelcekpublikasiraportsemester").getElementsByTagName("tbody")[0];
                for (j = 0; j < data.length; j++) {
                    datanama = data[j].namasiswa;
                    dataid = data[j].raportsemester;
                    dataaksi = data[j].semesterpublikasi;
                    indektabel = jsondatasiswa.map(s => s.pd_nama).indexOf(datanama);

                    if (indektabel > -1) {
                        idtabel.rows[indektabel].cells[2].innerHTML = `<button onclick="previewraportsemester('${dataid}')" title="Lihat")><i class="fa fa-eye"></i> Lihat</button>`;
                        idtabel.rows[indektabel].cells[3].innerHTML = (dataaksi == "show") ? `<b class="w3-text-green">&checkmark;</b>` : `<b class="w3-text-red">&times;</b>`;
                        idtabel.rows[indektabel].cells[4].innerHTML = (dataaksi == "show") ? `<button onclick="sembunyikanraportsemester('${datanama}')" title="Hapus")><i class="fa fa-trash"></i> Hapus</button>` : `<button onclick="tampilkanraportsemester('${datanama}')" title="Kembalikan")><i class="fa fa-refresh"></i> </button>`;
                    }



                }




            }

        })
        .catch(er => console.log(er))
    //console.log

}


const previewraportsemester = (id) => {
    pranalamateri.style.display = "block";
    document.querySelector(".classReviewMateri").innerHTML = "";
    let tes = document.querySelector(".classReviewMateri");
    tes.innerHTML = "<i class='fa fa-spin fa-spinner'></i>"
    let tekshtml = "";
    $('.classReviewMateri').nextAll('button').remove();
    fetch(linkmateri + "&idmateri=" + id + "&action=previewriwayat")
        .then(m => m.json())
        .then(r => {
            tekshtml += `${r}<hr/>
        <center>
        <div class="w3-clear"></div>
        <button onclick="print_print_bantusiswa()"><i class="fa fa-print"></i> Cetak</button>
        </center><hr/>
        `;
            tes.innerHTML = tekshtml;
        }).catch(er => {
            tekshtml += "Maaf terjadi kesalahan dengan kode: " + er;
            tes.innerHTML = tekshtml;
        })

}

const sembunyikanraportsemester = (namasiswa) => {
    fetch(constlinknilai + "?action=showhideraportsemester&kelas=" + idNamaKelas + "&namasiswa=" + namasiswa + "&aksi=hide")
        .then(m => m.json())
        .then(k => {
            alert(k.result);
            listpublikasiraportsemester();
        })
        .catch(er => alert(er))
}

const tampilkanraportsemester = (namasiswa) => {
    fetch(constlinknilai + "?action=showhideraportsemester&kelas=" + idNamaKelas + "&namasiswa=" + namasiswa + "&aksi=show")
        .then(m => m.json())
        .then(k => {
            alert(k.result);
            listpublikasiraportsemester();
        })
        .catch(er => alert(er))
}


const publikasikanraportsemester = () => {
    //    alert("publikasikanraportpts()");
    let btn = document.querySelector(".tombolpublikasiraportsemester");
    btn.innerHTML = "<i class='fa fa-spin fa-spinner'></i> Proses Publikasi";
    let divraportsemester = document.getElementById("halamanraport");
    let op = document.getElementById("listnamaraport").options;
    let indop = document.getElementById("listnamaraport").selectedIndex;
    let namarsemester = op[indop].text;
    if (divraportsemester.innerHTML == "") {
        alert("Raport Belum siap dipublikasikan");
        btn.innerHTML = "<i class='fa fa-globe'></i> Publikasikan";
    } else {
        let confr = confirm("Anda yakin ingin mempublikasikan raport ini kepada siswa yang bersangkutan? Anda masih bisa mengedit nilai dari tampilan raport tersebut. Data yang berhasil dipublikasikan akan muncul di tabel Publikasikan Raport Semester\n\n Klik [OK] untuk melanjutkan.\n\n Klik [NO] untuk membatalkan.");
        if (confr) {
            let tekhtml = divraportsemester.innerHTML;
            let dtext = document.getElementById("tempattextarea");
            dtext.textContent = tekhtml.replace(/contenteditable=\"true\"/gi, "");
            let htmlraport = window.btoa(unescape(encodeURIComponent(dtext.textContent)));
            let data = new FormData();
            data.append("kelas", idNamaKelas);
            data.append("namasiswa", namarsemester);
            data.append("htmlraport", htmlraport);
            fetch(constlinknilai + "?action=publikasiraportsemester", {
                method: "post",
                body: data
            }).then(m => m.json())
                .then(r => {
                    alert(r.result + "Publikasi");
                    btn.innerHTML = "<i class='fa fa-globe'></i> Publikasikan";
                })
                .catch(er => alert(er))
            // console.log(namarpts);
            // console.log(htmlraport);

            // let namasubfolder = e.parameter.kelas;
            // let namasiswa = e.parameter.namasiswa;
            // let htmlraport = e.parameter.htmlraport;
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
let tmbl_raportus = document.querySelector(".btnolah_raport");
let headerraportus = ["no", "namasiswa", "raport_4_1_AGAMA", "raport_4_1_PKN", "raport_4_1_BINDO", "raport_4_1_MTK", "raport_4_1_IPA", "raport_4_1_IPS", "raport_4_1_SBDP", "raport_4_1_PJOK", "raport_4_1_BSUND", "raport_4_2_AGAMA", "raport_4_2_PKN", "raport_4_2_BINDO", "raport_4_2_MTK", "raport_4_2_IPA", "raport_4_2_IPS", "raport_4_2_SBDP", "raport_4_2_PJOK", "raport_4_2_BSUND", "raport_5_1_AGAMA", "raport_5_1_PKN", "raport_5_1_BINDO", "raport_5_1_MTK", "raport_5_1_IPA", "raport_5_1_IPS", "raport_5_1_SBDP", "raport_5_1_PJOK", "raport_5_1_BSUND", "raport_5_2_AGAMA", "raport_5_2_PKN", "raport_5_2_BINDO", "raport_5_2_MTK", "raport_5_2_IPA", "raport_5_2_IPS", "raport_5_2_SBDP", "raport_5_2_PJOK", "raport_5_2_BSUND", "raport_6_1_AGAMA", "raport_6_1_PKN", "raport_6_1_BINDO", "raport_6_1_MTK", "raport_6_1_IPA", "raport_6_1_IPS", "raport_6_1_SBDP", "raport_6_1_PJOK", "raport_6_1_BSUND", "raport_6_2_AGAMA", "raport_6_2_PKN", "raport_6_2_BINDO", "raport_6_2_MTK", "raport_6_2_IPA", "raport_6_2_IPS", "raport_6_2_SBDP", "raport_6_2_PJOK", "raport_6_2_BSUND"]
let headerolaus = ["no", "namasiswa", "ut_AGAMA", "ut_PKN", "ut_BINDO", "ut_MTK", "ut_IPA", "ut_IPS", "ut_SBDP", "ut_PJOK", "ut_BSUND", "up_AGAMA", "up_PKN", "up_BINDO", "up_MTK", "up_IPA", "up_IPS", "up_SBDP", "up_PJOK", "up_BSUND"];
let arrmapelus = ["AGAMA", "PKN", "BINDO", "MTK", "IPA", "IPS", "SBDP", "PJOK", "BSUND"];
let objraportall = {};
tmbl_raportus.addEventListener("click", function () {
    //animasikan dulu
    document.querySelector(".loadingraportus").innerHTML = "<i class='fa fa-spin fa-spinner'></i> Sedang mengambil data di Server";
    //definsikan table mana ia bekerja;
    let bodytabel = document.querySelector(".tabelolahraportus").getElementsByTagName("tbody")[0];

    let tab = "RaportAllKelas";
    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    fetch(constlinknilai + "?action=getdatafromtab" + param)
        .then(m => m.json())
        .then(k => {
            // console.log(k);
            let tekshtml = "";
            if (k.result == 0) {
                alert("Anda belum pernah menyimpan data rekap raport dari kelas 4 sampai dengan kelas 6. Aplikasi akan menggenarate hanya data raport kelas 6 semester 2 saja.");

                let dataki3 = document.querySelector(".datarekapkd3");
                let dataki4 = document.querySelector(".datarekapkd4");
                if (dataki3 === null || dataki4 === null) {
                    alert("Nilai Raport Kelas 6 Semester 2 tidak berhasil digenerate. pastikan Anda telah membuka Rekap Nilai K-3 dan K-4 di menu tab Olah Nilai");
                }
                let i = 0;
                do {
                    if (dataki3 === null || dataki4 === null) {
                        //     alert("Nilai Raport Kelas 6 Semester 2 tidak berhasil digenerate. pastikan Anda telah membuka Rekap Nilai K-3 dan K-4 di menu tab Olah Nilai");
                        tekshtml += `<tr><td>${i + 1}</td><td style="position:sticky;position:-webkit-sticky;left:0px;;box-shadow: inset 0 0 1px #000000">${jsondatasiswa[i].pd_nama}</td>`;
                        for (p = 0; p < 54; p++) {
                            tekshtml += `<td contenteditable="true"></td>`;
                        }
                        tekshtml += "</tr>";

                    } else {
                        let data = raportsemester12(i)
                        tekshtml += `<tr><td>${i + 1}</td><td style="position:sticky;position:-webkit-sticky;left:0px;;box-shadow: inset 0 0 1px #000000">${jsondatasiswa[i].pd_nama}</td>`;
                        for (j = 0; j < 45; j++) {
                            tekshtml += `<td contenteditable="true"></td>`;
                        }

                        tekshtml += `<td contenteditable="true">${data["AGAMA"]}</td>`;
                        tekshtml += `<td contenteditable="true">${data["PKN"]}</td>`;
                        tekshtml += `<td contenteditable="true">${data["BINDO"]}</td>`;
                        tekshtml += `<td contenteditable="true">${data["MTK"]}</td>`;
                        tekshtml += `<td contenteditable="true">${data["IPA"]}</td>`;
                        tekshtml += `<td contenteditable="true">${data["IPS"]}</td>`;
                        tekshtml += `<td contenteditable="true">${data["SBDP"]}</td>`;
                        tekshtml += `<td contenteditable="true">${data["PJOK"]}</td>`;
                        tekshtml += `<td contenteditable="true">${data["BSUND"]}</td>`;
                        tekshtml += "</tr>";
                    }
                    i++

                }
                while (i < jsondatasiswa.length);
                bodytabel.innerHTML = tekshtml;

                document.querySelector(".loadingraportus").innerHTML = "";


            } else {

                document.querySelector(".loadingraportus").innerHTML = "";
                objraportall = k.data;
                for (a = 0; a < k.data.length; a++) {
                    tekshtml += `<tr><td>${a + 1}</td>`
                    for (b = 1; b < headerraportus.length; b++) {
                        if (b == 1) {
                            tekshtml += `<td style="position:sticky;position:-webkit-sticky;left:0px;;box-shadow: inset 0 0 1px #000000">${k.data[a][headerraportus[b]]}</td>`

                        } else {
                            tekshtml += `<td contenteditable="true">${k.data[a][headerraportus[b]]}</td>`

                        }

                    }
                    tekshtml += `</tr>`
                }

                bodytabel.innerHTML = tekshtml;
                //console.log(objraportall)

            }
        })
        .catch(err => console.log(err))

})


tt_tabraport7 = document.querySelector(".tabtabraport4_1");
tt_tabraport8 = document.querySelector(".tabtabraport4_2");
tt_tabraport9 = document.querySelector(".tabtabraport5_1");
tt_tabraport10 = document.querySelector(".tabtabraport5_2");
tt_tabraport11 = document.querySelector(".tabtabraport6_1");
tt_tabraport12 = document.querySelector(".tabtabraport6_2");

tt_tabraport7.addEventListener("click", function () {
    tt_tabraport7.className += " activee";
    tt_tabraport8.className = tt_tabraport8.className.replace(/activee/g, "");
    tt_tabraport9.className = tt_tabraport9.className.replace(/activee/g, "");
    tt_tabraport10.className = tt_tabraport10.className.replace(/activee/g, "");
    tt_tabraport11.className = tt_tabraport11.className.replace(/activee/g, "");
    tt_tabraport12.className = tt_tabraport12.className.replace(/activee/g, "");

    let classph = document.querySelector(".tabelolahraportus").getElementsByTagName("thead")[0].rows[0].cells[0];
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("divtabelolahraport");
    // let tabel = document.querySelector(".tabelolahraportus");
    // let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    // let x = classph.offsetLeft;
    //div.scrollLeft = (x - y);
    div.scrollLeft = 0;
})
tt_tabraport8.addEventListener("click", function () {
    tt_tabraport8.className += " activee";
    tt_tabraport7.className = tt_tabraport7.className.replace(/activee/g, "");
    tt_tabraport9.className = tt_tabraport9.className.replace(/activee/g, "");
    tt_tabraport10.className = tt_tabraport10.className.replace(/activee/g, "");
    tt_tabraport11.className = tt_tabraport11.className.replace(/activee/g, "");
    tt_tabraport12.className = tt_tabraport12.className.replace(/activee/g, "");

    let classph = document.querySelector(".tabelolahraportus").getElementsByTagName("thead")[0].rows[0].cells[3];
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("divtabelolahraport");
    let tabel = document.querySelector(".tabelolahraportus");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = (x - y);

})
tt_tabraport9.addEventListener("click", function () {
    tt_tabraport9.className += " activee";
    tt_tabraport7.className = tt_tabraport7.className.replace(/activee/g, "");
    tt_tabraport8.className = tt_tabraport8.className.replace(/activee/g, "");
    tt_tabraport10.className = tt_tabraport10.className.replace(/activee/g, "");
    tt_tabraport11.className = tt_tabraport11.className.replace(/activee/g, "");
    tt_tabraport12.className = tt_tabraport12.className.replace(/activee/g, "");

    let classph = document.querySelector(".tabelolahraportus").getElementsByTagName("thead")[0].rows[0].cells[4];
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("divtabelolahraport");
    let tabel = document.querySelector(".tabelolahraportus");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = (x - y);

})
tt_tabraport10.addEventListener("click", function () {
    tt_tabraport10.className += " activee";
    tt_tabraport7.className = tt_tabraport7.className.replace(/activee/g, "");
    tt_tabraport8.className = tt_tabraport8.className.replace(/activee/g, "");
    tt_tabraport9.className = tt_tabraport9.className.replace(/activee/g, "");
    tt_tabraport11.className = tt_tabraport11.className.replace(/activee/g, "");
    tt_tabraport12.className = tt_tabraport12.className.replace(/activee/g, "");

    let classph = document.querySelector(".tabelolahraportus").getElementsByTagName("thead")[0].rows[0].cells[5];
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("divtabelolahraport");
    let tabel = document.querySelector(".tabelolahraportus");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = (x - y);

})
tt_tabraport11.addEventListener("click", function () {
    tt_tabraport11.className += " activee";
    tt_tabraport7.className = tt_tabraport7.className.replace(/activee/g, "");
    tt_tabraport8.className = tt_tabraport8.className.replace(/activee/g, "");
    tt_tabraport9.className = tt_tabraport9.className.replace(/activee/g, "");
    tt_tabraport10.className = tt_tabraport10.className.replace(/activee/g, "");
    tt_tabraport12.className = tt_tabraport12.className.replace(/activee/g, "");

    let classph = document.querySelector(".tabelolahraportus").getElementsByTagName("thead")[0].rows[0].cells[6];
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("divtabelolahraport");
    let tabel = document.querySelector(".tabelolahraportus");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = (x - y);

})
tt_tabraport12.addEventListener("click", function () {
    tt_tabraport12.className += " activee";
    tt_tabraport7.className = tt_tabraport7.className.replace(/activee/g, "");
    tt_tabraport8.className = tt_tabraport8.className.replace(/activee/g, "");
    tt_tabraport9.className = tt_tabraport9.className.replace(/activee/g, "");
    tt_tabraport10.className = tt_tabraport10.className.replace(/activee/g, "");
    tt_tabraport11.className = tt_tabraport11.className.replace(/activee/g, "");

    let classph = document.querySelector(".tabelolahraportus").getElementsByTagName("thead")[0].rows[0].cells[7];
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("divtabelolahraport");
    let tabel = document.querySelector(".tabelolahraportus");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = (x - y);

})

let tmblrpts12 = document.querySelector(".tabupdateraport");
tmblrpts12.addEventListener("click", function () {
    try {
        let i = 0;
        let sel = document.querySelector(".tabelolahraportus").getElementsByTagName("tbody")[0];
        do {
            let data = raportsemester12(i)
            sel.rows[i].cells[47].innerHTML = data["AGAMA"];
            sel.rows[i].cells[48].innerHTML = data["PKN"];
            sel.rows[i].cells[49].innerHTML = data["BINDO"];
            sel.rows[i].cells[50].innerHTML = data["MTK"];
            sel.rows[i].cells[51].innerHTML = data["IPA"];
            sel.rows[i].cells[52].innerHTML = data["IPS"];
            sel.rows[i].cells[53].innerHTML = data["SBDP"];
            sel.rows[i].cells[54].innerHTML = data["PJOK"];
            sel.rows[i].cells[55].innerHTML = data["BSUND"];
            //  arr.push(data);
            i++
        }
        while (i < jsondatasiswa.length)

    } catch (err) { alert(`Terjadi kesalahan (${err}), data-data berikut harus sudah dilengkapi dan diload(dibuka terlebih dahulu. yaitu: \n\n - Pastikan data agama seluruh siswa terisi \n - pastikan Anda sudah membuka Rekap KI3 dan Ki-4`) };


})

const raportsemester12 = (i) => {
    let datakd3 = algoritmakurtilas(i);
    let datakd4 = algoritmaketerampilan(i);
    let nkd3 = datakd3["datarraport"];
    let nkd4 = datakd4["datarraport"];
    let agama = jsondatasiswa[i].pd_agama;
    let defagama = ["ISLAM", "KRISTEN", "KATHOLIK", "HINDU", "BUDHA", "KHONGHUCU"];
    let kodeagama = ["PAI", "PKRIS", "PKATO", "PHIND", "PBUDH", "PKONG"];
    let indekagama = (agama !== "") ? defagama.indexOf(agama) : "";
    let acuanagama = kodeagama[indekagama];

    // for(i = 0 ;  i < jsondatasiswa.length;i++){
    // };
    //agama//
    //pkn;
    let objek = {};
    objek["namasiswa"] = jsondatasiswa[i].pd_nama;

    //nilai agama = 
    let kd3mapel1 = nkd3.findIndex(agama => agama["raport_" + acuanagama]);
    let kd4mapel1 = nkd4.findIndex(agama => agama["raportk4_" + acuanagama]);
    let nskd3mapel1 = nkd3[kd3mapel1]["raport_" + acuanagama];
    let nskd4mapel1 = nkd4[kd4mapel1]["raportk4_" + acuanagama];
    let intk3mapel1 = (nskd3mapel1 == "") ? 0 : nskd3mapel1;
    let intk4mapel1 = (nskd4mapel1 == "") ? 0 : nskd4mapel1;
    let nasmapel1 = (intk3mapel1 + intk4mapel1) / 2;
    let namapel1 = Math.round(nasmapel1);
    objek["AGAMA"] = namapel1;

    let kd3mapel2 = nkd3.findIndex(pkn => pkn["raport_PKN"]);
    let kd4mapel2 = nkd4.findIndex(pkn => pkn["raportk4_PKN"]);
    let nskd3mapel2 = nkd3[kd3mapel2]["raport_PKN"];
    let nskd4mapel2 = nkd4[kd4mapel2]["raportk4_PKN"];
    let intk3mapel2 = (nskd3mapel2 == "") ? 0 : nskd3mapel2;
    let intk4mapel2 = (nskd4mapel2 == "") ? 0 : nskd4mapel2;
    let nasmapel2 = (intk3mapel2 + intk4mapel2) / 2;
    let namapel2 = Math.round(nasmapel2);
    objek["PKN"] = namapel2;

    let kd3mapel3 = nkd3.findIndex(bindo => bindo["raport_BINDO"]);
    let kd4mapel3 = nkd4.findIndex(bindo => bindo["raportk4_BINDO"]);
    let nskd3mapel3 = nkd3[kd3mapel3]["raport_BINDO"];
    let nskd4mapel3 = nkd4[kd4mapel3]["raportk4_BINDO"];
    let intk3mapel3 = (nskd3mapel3 == "") ? 0 : nskd3mapel3;
    let intk4mapel3 = (nskd4mapel3 == "") ? 0 : nskd4mapel3;
    let nasmapel3 = (intk3mapel3 + intk4mapel3) / 2;
    let namapel3 = Math.round(nasmapel3);
    objek["BINDO"] = namapel3;


    let kd3mapel4 = nkd3.findIndex(mtk => mtk["raport_MTK"]);
    let kd4mapel4 = nkd4.findIndex(mtk => mtk["raportk4_MTK"]);
    let nskd3mapel4 = nkd3[kd3mapel4]["raport_MTK"];
    let nskd4mapel4 = nkd4[kd4mapel4]["raportk4_MTK"];
    let intk3mapel4 = (nskd3mapel4 == "") ? 0 : nskd3mapel4;
    let intk4mapel4 = (nskd4mapel4 == "") ? 0 : nskd4mapel4;
    let nasmapel4 = (intk3mapel4 + intk4mapel4) / 2;
    let namapel4 = Math.round(nasmapel4);
    objek["MTK"] = namapel4;


    let kd3mapel5 = nkd3.findIndex(ipa => ipa["raport_IPA"]);
    let kd4mapel5 = nkd4.findIndex(ipa => ipa["raportk4_IPA"]);
    let nskd3mapel5 = nkd3[kd3mapel5]["raport_IPA"];
    let nskd4mapel5 = nkd4[kd4mapel5]["raportk4_IPA"];
    let intk3mapel5 = (nskd3mapel5 == "") ? 0 : nskd3mapel5;
    let intk4mapel5 = (nskd4mapel5 == "") ? 0 : nskd4mapel5;
    let nasmapel5 = (intk3mapel5 + intk4mapel5) / 2;
    let namapel5 = Math.round(nasmapel5);
    objek["IPA"] = namapel5;

    let kd3mapel6 = nkd3.findIndex(ips => ips["raport_IPS"]);
    let kd4mapel6 = nkd4.findIndex(ips => ips["raportk4_IPS"]);
    let nskd3mapel6 = nkd3[kd3mapel6]["raport_IPS"];
    let nskd4mapel6 = nkd4[kd4mapel6]["raportk4_IPS"];
    let intk3mapel6 = (nskd3mapel6 == "") ? 0 : nskd3mapel6;
    let intk4mapel6 = (nskd4mapel6 == "") ? 0 : nskd4mapel6;
    let nasmapel6 = (intk3mapel6 + intk4mapel6) / 2;
    let namapel6 = Math.round(nasmapel6);
    objek["IPS"] = namapel6;

    let kd3mapel7 = nkd3.findIndex(k => k["raport_SBDP"]);
    let kd4mapel7 = nkd4.findIndex(k => k["raportk4_SBDP"]);
    let nskd3mapel7 = nkd3[kd3mapel7]["raport_SBDP"];
    let nskd4mapel7 = nkd4[kd4mapel7]["raportk4_SBDP"];
    let intk3mapel7 = (nskd3mapel7 == "") ? 0 : nskd3mapel7;
    let intk4mapel7 = (nskd4mapel7 == "") ? 0 : nskd4mapel7;
    let nasmapel7 = (intk3mapel7 + intk4mapel7) / 2;
    let namapel7 = Math.round(nasmapel7);
    objek["SBDP"] = namapel7;


    let kd3mapel8 = nkd3.findIndex(k => k["raport_PJOK"]);
    let kd4mapel8 = nkd4.findIndex(k => k["raportk4_PJOK"]);
    let nskd3mapel8 = nkd3[kd3mapel8]["raport_PJOK"];
    let nskd4mapel8 = nkd4[kd4mapel8]["raportk4_PJOK"];
    let intk3mapel8 = (nskd3mapel8 == "") ? 0 : nskd3mapel8;
    let intk4mapel8 = (nskd4mapel8 == "") ? 0 : nskd4mapel8;
    let nasmapel8 = (intk3mapel8 + intk4mapel8) / 2;
    let namapel8 = Math.round(nasmapel8);
    objek["PJOK"] = namapel8;

    let kd3mapel9 = nkd3.findIndex(k => k["raport_BSUND"]);
    let kd4mapel9 = nkd4.findIndex(k => k["raportk4_BSUND"]);
    let nskd3mapel9 = nkd3[kd3mapel9]["raport_BSUND"];
    let nskd4mapel9 = nkd4[kd4mapel9]["raportk4_BSUND"];
    let intk3mapel9 = (nskd3mapel9 == "") ? 0 : nskd3mapel9;
    let intk4mapel9 = (nskd4mapel9 == "") ? 0 : nskd4mapel9;
    let nasmapel9 = (intk3mapel9 + intk4mapel9) / 2;
    let namapel9 = Math.round(nasmapel9);
    objek["BSUND"] = namapel9;

    // console.log(objek);
    return objek





}


const simpanolahijazah = (namaclass) => {
    // let tab = "RaportAllKelas";
    // let head = JSON.stringify(headerraportus);
    let tab, head, load;
    if (namaclass == "tabelolahraportus") {
        tab = "RaportAllKelas";
        head = JSON.stringify(headerraportus);
        load = ".loadingraportus";
    } else if (namaclass == "tabelolahus") {
        tab = "olahus";
        head = JSON.stringify(headerolaus);
        load = ".loadingolahus"
    }

    let tb = document.querySelector("." + namaclass).getElementsByTagName("tbody")[0];
    let tombol = document.querySelector(load);
    tombol.innerHTML = "<i class='fa fa-spinner fa-spin'></i> proses kirim"
    let lr = tb.rows;
    let all = []
    for (r = 0; r < lr.length; r++) {
        let perbaris = lr[r];
        let isi = []
        for (s = 0; s < perbaris.cells.length; s++) {

            let d = perbaris.cells[s].innerHTML;

            isi.push(d);

        }
        all.push(isi)
    }

    //let headt = ["nourut", "namasiswa", "nilaipredikat", "indikmaks", "indikmin"];

    //let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;

    let tabel = JSON.stringify(all);


    let data = new FormData();
    data.append("tabel", tabel);
    data.append("head", head);
    data.append("kelas", idNamaKelas);
    data.append("prefiktab", tab);
    fetch(constlinknilai + "?action=inserttabeltospreadsheet", {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(k => {
            alert(k.result + ", Aplikasi akan melakukan refresh data. Mohon tunggu sebentar..");
            tombol.innerHTML = k.result;
            tmbl_raportus.click()
            setTimeout(function () { tombol.innerHTML = ""; }, 1000);
        })
        .catch(er => alert(er))

}

const printolahijazah = (classtabel) => {
    // let isibody = document.getElementById("tabeldatanilaiki3").innerHTML;
    let judul, subjudul, titel, mediaprint;
    if (classtabel == "tabelolahraportus") {
        titel = "E-Lamaso Data Raport";
        judul = "<h3 class='w3-center'>Data Nilai Raport Kelas 4 s/d Kelas 6</h3>";
        subjudul = `<h3 class='w3-center'>Kelas ${idNamaKelas} Tahun Pelajaran ${idTeksTapel}</h3>`;
        mediaprint = "landscape";
    } else if (classtabel == "tabelrekapraportus") {
        titel = "E-Lamaso Rekap Raport US";
        judul = "<h3 class='w3-center'>Rekapitulasi Nilai Raport </h3>";
        subjudul = `<h3 class='w3-center'>Kelas ${idNamaKelas} Tahun Pelajaran ${idTeksTapel}</h3>`;
        mediaprint = "portrait";

    } else if (classtabel == "tabelolahus") {
        titel = "E-Lamaso Pengolahan Nilai US";
        judul = "<h3 class='w3-center'>Data Pengolahan Nilai US (Tertulis & Praktek) </h3>";
        subjudul = `<h3 class='w3-center'>Kelas ${idNamaKelas} Tahun Pelajaran ${idTeksTapel}</h3>`;
        mediaprint = "portrait";

    } else if (classtabel == "tabelrekapus") {
        titel = "E-Lamaso Rekap Nilai US";
        judul = "<h3 class='w3-center'>Rekapitulasi Nilai US (Tertulis & Praktek) </h3>";
        subjudul = `<h3 class='w3-center'>Kelas ${idNamaKelas} Tahun Pelajaran ${idTeksTapel}</h3>`;
        mediaprint = "portrait";

    } else if (classtabel == "tabelolahijazah") {
        titel = "E-Lamaso Pengolahan Nilai Ijazah";
        judul = "<h3 class='w3-center'>Data Pengolahan Nilai Ijazah </h3>";
        subjudul = `<h3 class='w3-center'>Kelas ${idNamaKelas} Tahun Pelajaran ${idTeksTapel}</h3>`;
        mediaprint = "portrait";

    } else if (classtabel == "tabelnilaiijazahfix") {
        titel = "E-Lamaso Daftar Nilai Ijazah";
        judul = "<h3 class='w3-center'>Data  Nilai Ijazah </h3>";
        subjudul = `<h3 class='w3-center'>Kelas ${idNamaKelas} Tahun Pelajaran ${idTeksTapel}</h3>`;
        mediaprint = "portrait";

    }
    else {
        titel = "BELUM ADA JUDUL";
        judul = "<h3 class='w3-center'>BELUM ADA JUDUL </h3>";
        subjudul = `<h3 class='w3-center'>Kelas ${idNamaKelas} Tahun Pelajaran ${idTeksTapel}</h3>`;

    }


    let isibody = judul + subjudul + "<br/><br/>";
    isibody += document.querySelector("." + classtabel).outerHTML;//.replace("w3-tiny", "");
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>${titel}</title>`;
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
            size: A4 ${mediaprint};
            max-height:100%;
            max-width:100%;
            
            }
    }
    </style>`;


    body.innerHTML = `${isibody}<br/><br/>`;
    body.innerHTML += '<div style="float:left;position:relative;margin-left:50px;text-align:center">Mengetahui,<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><br/><u><b>' + idNamaKepsek + '</b></u><br/>NIP. ' + idNipKepsek + '</div>';
    body.innerHTML += '<div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ', ' + tanggalfull(new Date()) + '<br/>' + idJenisGuru + '<br/><br/><br/><br/><br/><b><u>' + namauser + '</u></b><br/>NIP. ' + idNipGuruKelas + '</div>';



    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();
}

const excelolahijazah = (classtabel) => {
    let judul;
    if (classtabel == "tabelolahraportus") {

        judul = "Data Nilai Raport Kelas 4 s/d Kelas 6";

    } else if (classtabel == "tabelrekapraportus") {

        judul = "Rekapitulasi Nilai Raport";


    } else if (classtabel == "tabelolahus") {

        judul = "Data Pengolahan Nilai US (Tertulis & Praktek)";


    } else if (classtabel == "tabelrekapus") {

        judul = "Rekapitulasi Nilai US (Tertulis & Praktek)";


    } else if (classtabel == "tabelolahijazah") {

        judul = "Data Pengolahan Nilai Ijazah";


    } else if (classtabel == "tabelnilaiijazahfix") {

        judul = "Data  Nilai Ijazah ";


    }
    else {
        judul = "BELUM ADA JUDUL";

    }

    let tabelsumber = document.querySelector("." + classtabel);
    let divto = document.getElementById("datasiswaprint");
    let headsumber = tabelsumber.getElementsByTagName("thead")[0];
    let bodysumber = tabelsumber.getElementsByTagName("tbody")[0];
    let jumlahkolom = bodysumber.rows[0].cells.length;

    let tekshtml = `<table class="versi-table w3-tiny" id="tabeltabelolahijazah">
    <tr>
        <td colspan="${jumlahkolom}">${judul}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}"> ${idNamaSekolah.toUpperCase()}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}">Kelas ${idNamaKelas} Tahun Pelajaran ${idTeksTapel}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}"></td>
        
    <tr>
    ${headsumber.innerHTML}
    ${bodysumber.innerHTML.replace(/\./g, ",")}
    <tr>
         
    <tr>`


    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Mengetahui, </td>
    <td></td>
    `;
    let sisakolom = jumlahkolom - 11;
    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${jlo.kota}, ${tanggalfull(new Date())}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Kepala ${idNamaSekolah} </td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${idJenisGuru} ${idNamaKelas}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>
    <tr></tr>
    <tr></tr>
    <tr></tr>
    `;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3"><b><u>${idNamaKepsek}</u></b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3"><b><u>${namauser}</u></b></td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">NIP. ${idNipKepsek}</b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">NIP. ${idNipGuruKelas}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `</table>`;
    divto.innerHTML = tekshtml
    $("#tabeltabelolahijazah").table2excel({

        name: "Worksheet Name",
        filename: judul + " " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 3,
        barisatas: 5

    });
    divto.innerHTML = "";

}

///////////////////////////////////////////////////////////////////////////
let ob_rekapraport = {};
let ob_rekapus = {};
let tmbl_rekapraport = document.querySelector(".btn_rekapraport");
tmbl_rekapraport.addEventListener("click", function () {
    let bodytabel = document.querySelector(".tabelolahraportus").getElementsByTagName("tbody")[0];
    let bodytabelrekap = document.querySelector(".tabelrekapraportus").getElementsByTagName("tbody")[0];

    if (bodytabel.innerHTML == "") {
        alert("Anda belum membuka Menu Accordion OLAH RAPORT");
        return;
    }
    let i = 0;//2 + 9 + 9 + 9  
    let tekshtml = "";
    let arr = []
    do {
        let obj = {};
        obj["indek"] = i;
        tekshtml += `<tr><td>${i + 1}</td><td>${jsondatasiswa[i].pd_nama}</td>`;
        obj["namasiswa"] = jsondatasiswa[i].pd_nama;
        //agama
        let n_4_1 = (bodytabel.rows[i].cells[2].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[2].innerHTML);
        let n_4_2 = (bodytabel.rows[i].cells[11].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[11].innerHTML);
        let n_5_1 = (bodytabel.rows[i].cells[20].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[20].innerHTML);
        let n_5_2 = (bodytabel.rows[i].cells[29].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[29].innerHTML);
        let n_6_1 = (bodytabel.rows[i].cells[38].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[38].innerHTML);
        let n_6_2 = (bodytabel.rows[i].cells[47].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[47].innerHTML);
        let na = n_4_1 + n_4_2 + n_5_1 + n_5_2 + n_6_1 + n_6_2;
        // tekshtml += `<td>${Math.round(na / 6)}</td>`;
        // obj["AGAMA"] = Math.round(na / 6);
        tekshtml += `<td>${(na / 6).toFixed(2)}</td>`;
        obj["AGAMA"] = (na / 6).toFixed(2);


        //pkn
        n_4_1 = (bodytabel.rows[i].cells[3].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[3].innerHTML);
        n_4_2 = (bodytabel.rows[i].cells[12].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[12].innerHTML);
        n_5_1 = (bodytabel.rows[i].cells[21].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[21].innerHTML);
        n_5_2 = (bodytabel.rows[i].cells[30].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[30].innerHTML);
        n_6_1 = (bodytabel.rows[i].cells[39].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[39].innerHTML);
        n_6_2 = (bodytabel.rows[i].cells[48].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[48].innerHTML);
        na = n_4_1 + n_4_2 + n_5_1 + n_5_2 + n_6_1 + n_6_2;
        // tekshtml += `<td>${Math.round(na / 6)}</td>`;
        // obj["PKN"] = Math.round(na / 6);
        tekshtml += `<td>${(na / 6).toFixed(2)}</td>`;
        obj["PKN"] = (na / 6).toFixed(2);
        //bindo
        n_4_1 = (bodytabel.rows[i].cells[4].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[4].innerHTML);
        n_4_2 = (bodytabel.rows[i].cells[13].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[13].innerHTML);
        n_5_1 = (bodytabel.rows[i].cells[22].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[22].innerHTML);
        n_5_2 = (bodytabel.rows[i].cells[31].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[31].innerHTML);
        n_6_1 = (bodytabel.rows[i].cells[40].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[40].innerHTML);
        n_6_2 = (bodytabel.rows[i].cells[49].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[49].innerHTML);
        na = n_4_1 + n_4_2 + n_5_1 + n_5_2 + n_6_1 + n_6_2;
        // tekshtml += `<td>${Math.round(na / 6)}</td>`;
        // obj["BINDO"] = Math.round(na / 6);
        tekshtml += `<td>${(na / 6).toFixed(2)}</td>`;
        obj["BINDO"] = (na / 6).toFixed(2);
        //mtk
        n_4_1 = (bodytabel.rows[i].cells[5].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[5].innerHTML);
        n_4_2 = (bodytabel.rows[i].cells[14].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[14].innerHTML);
        n_5_1 = (bodytabel.rows[i].cells[23].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[23].innerHTML);
        n_5_2 = (bodytabel.rows[i].cells[32].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[32].innerHTML);
        n_6_1 = (bodytabel.rows[i].cells[41].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[41].innerHTML);
        n_6_2 = (bodytabel.rows[i].cells[50].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[50].innerHTML);
        na = n_4_1 + n_4_2 + n_5_1 + n_5_2 + n_6_1 + n_6_2;
        // tekshtml += `<td>${Math.round(na / 6)}</td>`;
        // obj["MTK"] = Math.round(na / 6);
        tekshtml += `<td>${(na / 6).toFixed(2)}</td>`;
        obj["MTK"] = (na / 6).toFixed(2);

        //ipa
        n_4_1 = (bodytabel.rows[i].cells[6].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[6].innerHTML);
        n_4_2 = (bodytabel.rows[i].cells[15].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[15].innerHTML);
        n_5_1 = (bodytabel.rows[i].cells[24].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[24].innerHTML);
        n_5_2 = (bodytabel.rows[i].cells[33].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[33].innerHTML);
        n_6_1 = (bodytabel.rows[i].cells[42].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[42].innerHTML);
        n_6_2 = (bodytabel.rows[i].cells[51].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[51].innerHTML);
        na = n_4_1 + n_4_2 + n_5_1 + n_5_2 + n_6_1 + n_6_2;
        // tekshtml += `<td>${Math.round(na / 6)}</td>`;
        // obj["IPA"] = Math.round(na / 6);
        tekshtml += `<td>${(na / 6).toFixed(2)}</td>`;
        obj["IPA"] = (na / 6).toFixed(2);
        //ips
        n_4_1 = (bodytabel.rows[i].cells[7].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[7].innerHTML);
        n_4_2 = (bodytabel.rows[i].cells[16].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[16].innerHTML);
        n_5_1 = (bodytabel.rows[i].cells[25].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[25].innerHTML);
        n_5_2 = (bodytabel.rows[i].cells[34].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[34].innerHTML);
        n_6_1 = (bodytabel.rows[i].cells[43].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[43].innerHTML);
        n_6_2 = (bodytabel.rows[i].cells[52].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[52].innerHTML);
        na = n_4_1 + n_4_2 + n_5_1 + n_5_2 + n_6_1 + n_6_2;
        // tekshtml += `<td>${Math.round(na / 6)}</td>`;
        // obj["IPS"] = Math.round(na / 6);
        tekshtml += `<td>${(na / 6).toFixed(2)}</td>`;
        obj["IPS"] = (na / 6).toFixed(2);
        //sbdp
        n_4_1 = (bodytabel.rows[i].cells[8].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[8].innerHTML);
        n_4_2 = (bodytabel.rows[i].cells[17].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[17].innerHTML);
        n_5_1 = (bodytabel.rows[i].cells[26].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[26].innerHTML);
        n_5_2 = (bodytabel.rows[i].cells[35].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[35].innerHTML);
        n_6_1 = (bodytabel.rows[i].cells[44].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[44].innerHTML);
        n_6_2 = (bodytabel.rows[i].cells[53].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[53].innerHTML);
        na = n_4_1 + n_4_2 + n_5_1 + n_5_2 + n_6_1 + n_6_2;
        // tekshtml += `<td>${Math.round(na / 6)}</td>`;
        // obj["SBDP"] = Math.round(na / 6);
        tekshtml += `<td>${(na / 6).toFixed(2)}</td>`;
        obj["SBDP"] = (na / 6).toFixed(2);
        //pjok
        n_4_1 = (bodytabel.rows[i].cells[9].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[9].innerHTML);
        n_4_2 = (bodytabel.rows[i].cells[18].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[18].innerHTML);
        n_5_1 = (bodytabel.rows[i].cells[27].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[27].innerHTML);
        n_5_2 = (bodytabel.rows[i].cells[36].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[36].innerHTML);
        n_6_1 = (bodytabel.rows[i].cells[45].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[45].innerHTML);
        n_6_2 = (bodytabel.rows[i].cells[54].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[54].innerHTML);
        na = n_4_1 + n_4_2 + n_5_1 + n_5_2 + n_6_1 + n_6_2;
        // tekshtml += `<td>${Math.round(na / 6)}</td>`;
        // obj["PJOK"] = Math.round(na / 6);
        tekshtml += `<td>${(na / 6).toFixed(2)}</td>`;
        obj["PJOK"] = (na / 6).toFixed(2);
        //bsund
        n_4_1 = (bodytabel.rows[i].cells[10].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[10].innerHTML);
        n_4_2 = (bodytabel.rows[i].cells[19].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[19].innerHTML);
        n_5_1 = (bodytabel.rows[i].cells[28].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[28].innerHTML);
        n_5_2 = (bodytabel.rows[i].cells[37].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[37].innerHTML);
        n_6_1 = (bodytabel.rows[i].cells[46].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[46].innerHTML);
        n_6_2 = (bodytabel.rows[i].cells[55].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[55].innerHTML);
        na = n_4_1 + n_4_2 + n_5_1 + n_5_2 + n_6_1 + n_6_2;
        // tekshtml += `<td>${Math.round(na / 6)}</td></tr>`;
        // obj["BSUND"] = Math.round(na / 6);
        tekshtml += `<td>${(na / 6).toFixed(2)}</td></tr>`;
        obj["BSUND"] = (na / 6).toFixed(2);

        arr.push(obj);
        i++;
    }
    while (i < jsondatasiswa.length);
    bodytabelrekap.innerHTML = tekshtml;
    ob_rekapraport = arr;

})

let jsonnilaiustertulis = {};
let jsonnilaiuspraktek = {};
let tmbl_btnolah_us = document.querySelector(".btnolah_us");
tmbl_btnolah_us.addEventListener("click", function () {
    //kesiapan data dulu coy....
    let datakkm = koleksiarraymapelaktif();
    let datamapel = datakkm.kodemapel;
    let mapelagama = datamapel.filter(k => (k == "PAI" || k == "PKRIS" || k == "PKATO" || k == "PHIND" || k == "PBUDH" || k == "PKONG"));
    let mapelnonagama = datamapel.filter(k => !(k == "PAI" || k == "PKRIS" || k == "PKATO" || k == "PHIND" || k == "PBUDH" || k == "PKONG"));
    let tab = "olahus";
    let tabel = document.querySelector(".tabelolahus").getElementsByTagName("tbody")[0];
    let animasidiv = document.querySelector(".loadingolahus");
    animasidiv.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Sedang mencoba mengambil data Pengolahan US Server.`;



    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    fetch(constlinknilai + "?action=getdatafromtab" + param)
        .then(m => m.json())
        .then(k => {
            let tekshtml = "";
            if (k.result == 0) {
                alert("Anda belum pernah menyimpan data Olah Nilai US di server, data akan mengambil dari nilai US tertulis dan/atau US Praktek yang telah Anda laksanakan.");


                ambildataserverus();

            } else {
                let hasil = k.data;
                for (a = 0; a < hasil.length; a++) {
                    tekshtml += `<tr><td>${a + 1}</td><td style="position:sticky;position:-webkit-sticky;left:0px;;box-shadow: inset 0 0 1px #000000">${hasil[a].namasiswa}</td>
                    <td contenteditable="true">${hasil[a].ut_AGAMA}</td>
                    <td contenteditable="true">${hasil[a].ut_PKN}</td>
                    <td contenteditable="true">${hasil[a].ut_BINDO}</td>
                    <td contenteditable="true">${hasil[a].ut_MTK}</td>
                    <td contenteditable="true">${hasil[a].ut_IPA}</td>
                    <td contenteditable="true">${hasil[a].ut_IPS}</td>
                    <td contenteditable="true">${hasil[a].ut_SBDP}</td>
                    <td contenteditable="true">${hasil[a].ut_PJOK}</td>
                    <td contenteditable="true">${hasil[a].ut_BSUND}</td>
                    
                    <td contenteditable="true">${hasil[a].up_AGAMA}</td>
                    <td contenteditable="true">${hasil[a].up_PKN}</td>
                    <td contenteditable="true">${hasil[a].up_BINDO}</td>
                    <td contenteditable="true">${hasil[a].up_MTK}</td>
                    <td contenteditable="true">${hasil[a].up_IPA}</td>
                    <td contenteditable="true">${hasil[a].up_IPS}</td>
                    <td contenteditable="true">${hasil[a].up_SBDP}</td>
                    <td contenteditable="true">${hasil[a].up_PJOK}</td>
                    <td contenteditable="true">${hasil[a].up_BSUND}</td>
                    </tr>
                    `;
                }
                tabel.innerHTML = tekshtml;

                animasidiv.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Sedang menggenerate data Nilai Pengolahan US.`;
                document.querySelector(".statusdataolahus").innerHTML = " Status Data: Nilai Pengolahan US";
                animasidiv.innerHTML = "";
            }
        })
        .catch(er => console.log(er))


});
const ambildataserverus = async () => {
    let tidakadadiustertulis = [];
    let tidakadadiuspraktek = [];
    try {
        let defagama = ["ISLAM", "KRISTEN", "KATHOLIK", "HINDU", "BUDHA", "KHONGHUCU"];
        let kodeagama = ["PAI", "PKRIS", "PKATO", "PHIND", "PBUDH", "PKONG"];
        let animasidiv = document.querySelector(".loadingolahus");
        animasidiv.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Sedang mencoba mengambil data Nilai US Asli di Server.`;
        //ambil data US TERTULIS

        await fetch(constlinknilai + "?action=lihatnilairekap&tab=ustertulis&kelas=" + idNamaKelas)
            .then(m => m.json())
            .then(r => {
                let sumberkd = r.banyakkd;
                let datanilai = r.records;
                // console.log(datanilai);
                let arr = [];

                let i = 0;
                do {
                    let objdata = {};
                    objdata["indek"] = i;
                    objdata["nama"] = jsondatasiswa[i].pd_nama;
                    objdata["agamasiswa"] = jsondatasiswa[i].pd_agama;
                    //nilaiagama


                    let indekmapel = defagama.findIndex(k => k == jsondatasiswa[i].pd_agama);
                    let indeksiswa = datanilai.findIndex(o => o["namasiswa"] == jsondatasiswa[i].pd_nama);
                    if (indeksiswa == -1) {
                        objdata["AGAMA"] = "";
                        objdata["PKN"] = "";
                        objdata["BINDO"] = "";
                        objdata["MTK"] = "";
                        objdata["IPA"] = "";
                        objdata["IPS"] = "";
                        objdata["SBDP"] = "";
                        objdata["PJOK"] = "";
                        objdata["BSUND"] = "";
                        //alert("Siswa atas nama " + jsondatasiswa[i].pd_nama + " tidak ada di server US Tertulis, pastikan nilai siswa tersebut telah diinput ke server")
                        tidakadadiustertulis.push(jsondatasiswa[i].pd_nama);
                    }
                    else {


                        let indekkodemapel = kodeagama[indekmapel]; // "PAI";
                        // let kdagama = sumberkd.filter(l => l.indexOf(indekkodemapel) > -1)
                        let kdagama = sumberkd.filter(l => l.indexOf(indekkodemapel) > -1);


                        // let nilaiagama = (kdagama.length == 0) ? 0 : datanilai[indeksiswa][kdagama];
                        let nilaiagama = (kdagama.length == 0) ? 0 : Object.keys(datanilai[indeksiswa]).filter(s => kdagama.indexOf(s) > -1).map(d => datanilai[indeksiswa][d]).reduce((a, b) => parseFloat(a) + parseFloat(b));;
                        let pembagiagama = (kdagama.length == 0) ? 0 : kdagama.length;
                        let naAgama = (nilaiagama == 0) ? 0 : Math.round(nilaiagama / pembagiagama);
                        // console.log(naAgama);
                        objdata["AGAMA"] = naAgama

                        let kdpkn = sumberkd.filter(l => l.indexOf("PKN") > -1);
                        let nilaipkn = (kdpkn.length == 0) ? 0 : Object.keys(datanilai[indeksiswa]).filter(s => kdpkn.indexOf(s) > -1).map(d => datanilai[indeksiswa][d]).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagipkn = (kdpkn.length == 0) ? 0 : kdpkn.length;
                        let napkn = (nilaipkn == 0) ? 0 : Math.round(nilaipkn / pembagipkn);
                        objdata["PKN"] = napkn;


                        let kdbindo = sumberkd.filter(l => l.indexOf("BINDO") > -1);
                        let nilaibindo = (kdbindo.length == 0) ? 0 : Object.keys(datanilai[indeksiswa]).filter(s => kdbindo.indexOf(s) > -1).map(d => datanilai[indeksiswa][d]).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagibindo = (kdbindo.length == 0) ? 0 : kdbindo.length;
                        let nabindo = (nilaibindo == 0) ? 0 : Math.round(nilaibindo / pembagibindo);
                        objdata["BINDO"] = nabindo;

                        let kdmtk = sumberkd.filter(l => l.indexOf("MTK") > -1);
                        let nilaimtk = (kdmtk.length == 0) ? 0 : Object.keys(datanilai[indeksiswa]).filter(s => kdmtk.indexOf(s) > -1).map(d => datanilai[indeksiswa][d]).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagimtk = (kdmtk.length == 0) ? 0 : kdmtk.length;
                        let namtk = (nilaimtk == 0) ? 0 : Math.round(nilaimtk / pembagimtk);
                        objdata["MTK"] = namtk;

                        let kdipa = sumberkd.filter(l => l.indexOf("IPA") > -1);
                        let nilaiipa = (kdipa.length == 0) ? 0 : Object.keys(datanilai[indeksiswa]).filter(s => kdipa.indexOf(s) > -1).map(d => datanilai[indeksiswa][d]).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagiipa = (kdipa.length == 0) ? 0 : kdipa.length;
                        let naipa = (nilaiipa == 0) ? 0 : Math.round(nilaiipa / pembagiipa);
                        objdata["IPA"] = naipa;

                        let kdips = sumberkd.filter(l => l.indexOf("IPS") > -1);
                        let nilaiips = (kdips.length == 0) ? 0 : Object.keys(datanilai[indeksiswa]).filter(s => kdips.indexOf(s) > -1).map(d => datanilai[indeksiswa][d]).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagiips = (kdips.length == 0) ? 0 : kdips.length;
                        let naips = (nilaiips == 0) ? 0 : Math.round(nilaiips / pembagiips);
                        objdata["IPS"] = naips;

                        let kdsbdp = sumberkd.filter(l => l.indexOf("SBDP") > -1);
                        let nilaisbdp = (kdsbdp.length == 0) ? 0 : Object.keys(datanilai[indeksiswa]).filter(s => kdsbdp.indexOf(s) > -1).map(d => datanilai[indeksiswa][d]).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagisbdp = (kdsbdp.length == 0) ? 0 : kdsbdp.length;
                        let nasbdp = (nilaisbdp == 0) ? 0 : Math.round(nilaisbdp / pembagisbdp);
                        objdata["SBDP"] = nasbdp;

                        let kdpjok = sumberkd.filter(l => l.indexOf("PJOK") > -1);
                        let nilaipjok = (kdpjok.length == 0) ? 0 : Object.keys(datanilai[indeksiswa]).filter(s => kdpjok.indexOf(s) > -1).map(d => datanilai[indeksiswa][d]).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagipjok = (kdpjok.length == 0) ? 0 : kdpjok.length;
                        // let napjok = Math.round(nilaipjok / kdpjok.length);
                        let napjok = (nilaipjok == 0) ? 0 : Math.round(nilaipjok / pembagipjok);
                        objdata["PJOK"] = napjok;

                        let kdbsund = sumberkd.filter(l => l.indexOf("BSUND") > -1);
                        let nilaibsund = (kdbsund.length == 0) ? 0 : Object.keys(datanilai[indeksiswa]).filter(s => kdbsund.indexOf(s) > -1).map(d => datanilai[indeksiswa][d]).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagibsund = (kdbsund.length == 0) ? 0 : kdbsund.length;
                        let nabsund = (nilaibsund == 0) ? 0 : Math.round(nilaibsund / pembagibsund);
                        objdata["BSUND"] = nabsund;
                    }
                    arr.push(objdata);
                    i++;

                }
                while (i < jsondatasiswa.length)
                jsonnilaiustertulis["naus"] = arr;
                //console.log(jsonnilaiustertulis);

            })
            .catch(err => {
                console.log(err);
                alert("Ada siswa Anda yang belum mengikuti ini. Periksa nilai US Tertulisnya. Jika benar-benar tidak mengikuti US Tertulis dan ingin menampilkan seluruh data, maka kasih nilai siswa tersebut dengan nilai [ periksa Time Line Nilai US Tertulis]")
            });

        //ambil data US PRAKTEK
        await fetch(constlinknilai + "?action=lihatnilairekap&tab=uspraktek&kelas=" + idNamaKelas)
            .then(m => m.json())
            .then(r => {
                let sumberkd = r.banyakkd;
                let datanilai = r.records;
                // console.log(datanilai);
                let arr = [];

                let i = 0;
                do {
                    let objdata = {};
                    objdata["indek"] = i;
                    objdata["nama"] = jsondatasiswa[i].pd_nama;
                    objdata["agamasiswa"] = jsondatasiswa[i].pd_agama;
                    //nilaiagama


                    let indekmapel = defagama.findIndex(k => k == jsondatasiswa[i].pd_agama);
                    let indeksiswa = datanilai.findIndex(o => o["namasiswa"] == jsondatasiswa[i].pd_nama);
                    if (indeksiswa == -1) {
                        objdata["AGAMA"] = "";
                        objdata["PKN"] = "";
                        objdata["BINDO"] = "";
                        objdata["MTK"] = "";
                        objdata["IPA"] = "";
                        objdata["IPS"] = "";
                        objdata["SBDP"] = "";
                        objdata["PJOK"] = "";
                        objdata["BSUND"] = "";
                        tidakadadiuspraktek.push(jsondatasiswa[i].pd_nama);
                    }
                    else {
                        let indekkodemapel = kodeagama[indekmapel]; // "PAI";
                        // let kdagama = sumberkd.filter(l => l.indexOf(indekkodemapel) > -1)
                        let kdagama = sumberkd.filter(l => l.indexOf(indekkodemapel) > -1);


                        // let nilaiagama = (kdagama.length == 0) ? 0 : datanilai[indeksiswa][kdagama];
                        let nilaiagama = (kdagama.length == 0) ? "" : Object.keys(datanilai[indeksiswa]).filter(s => kdagama.indexOf(s) > -1).map(d => parseFloat((datanilai[indeksiswa][d] == "") ? 0 : datanilai[indeksiswa][d])).reduce((a, b) => parseFloat(a) + parseFloat(b));;
                        let pembagiagama = (kdagama.length == 0) ? "" : kdagama.length;
                        let naAgama = (nilaiagama == "") ? "" : Math.round(nilaiagama / pembagiagama);
                        // console.log(nilaiagama);
                        objdata["AGAMA"] = (isNaN(naAgama)) ? 0 : naAgama;

                        let kdpkn = sumberkd.filter(l => l.indexOf("PKN") > -1);
                        let nilaipkn = (kdpkn.length == 0) ? "" : Object.keys(datanilai[indeksiswa]).filter(s => kdpkn.indexOf(s) > -1).map(d => parseFloat((datanilai[indeksiswa][d] == "") ? 0 : datanilai[indeksiswa][d])).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagipkn = (kdpkn.length == 0) ? "" : kdpkn.length;
                        let napkn = (nilaipkn == "") ? "" : Math.round(nilaipkn / pembagipkn);
                        objdata["PKN"] = (isNaN(napkn)) ? 0 : napkn;


                        let kdbindo = sumberkd.filter(l => l.indexOf("BINDO") > -1);
                        let nilaibindo = (kdbindo.length == 0) ? "" : Object.keys(datanilai[indeksiswa]).filter(s => kdbindo.indexOf(s) > -1).map(d => parseFloat((datanilai[indeksiswa][d] == "") ? 0 : datanilai[indeksiswa][d])).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagibindo = (kdbindo.length == 0) ? "" : kdbindo.length;
                        let nabindo = (nilaibindo == "") ? "" : Math.round(nilaibindo / pembagibindo);
                        objdata["BINDO"] = (isNaN(nabindo)) ? 0 : nabindo;

                        let kdmtk = sumberkd.filter(l => l.indexOf("MTK") > -1);
                        let nilaimtk = (kdmtk.length == 0) ? "" : Object.keys(datanilai[indeksiswa]).filter(s => kdmtk.indexOf(s) > -1).map(d => parseFloat((datanilai[indeksiswa][d] == "") ? 0 : datanilai[indeksiswa][d])).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagimtk = (kdmtk.length == 0) ? "" : kdmtk.length;
                        let namtk = (nilaimtk == "") ? "" : Math.round(nilaimtk / pembagimtk);
                        objdata["MTK"] = (isNaN(namtk)) ? 0 : namtk;

                        let kdipa = sumberkd.filter(l => l.indexOf("IPA") > -1);
                        let nilaiipa = (kdipa.length == 0) ? "" : Object.keys(datanilai[indeksiswa]).filter(s => kdipa.indexOf(s) > -1).map(d => parseFloat((datanilai[indeksiswa][d] == "") ? 0 : datanilai[indeksiswa][d])).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagiipa = (kdipa.length == 0) ? "" : kdipa.length;
                        let naipa = (nilaiipa == "") ? "" : Math.round(nilaiipa / pembagiipa);
                        objdata["IPA"] = (isNaN(naipa)) ? 0 : naipa;

                        let kdips = sumberkd.filter(l => l.indexOf("IPS") > -1);
                        let nilaiips = (kdips.length == 0) ? "" : Object.keys(datanilai[indeksiswa]).filter(s => kdips.indexOf(s) > -1).map(d => parseFloat((datanilai[indeksiswa][d] == "") ? 0 : datanilai[indeksiswa][d])).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagiips = (kdips.length == 0) ? "" : kdips.length;
                        let naips = (nilaiips == "") ? "" : Math.round(nilaiips / pembagiips);
                        objdata["IPS"] = (isNaN(naips)) ? 0 : naips;

                        let kdsbdp = sumberkd.filter(l => l.indexOf("SBDP") > -1);
                        let nilaisbdp = (kdsbdp.length == 0) ? "" : Object.keys(datanilai[indeksiswa]).filter(s => kdsbdp.indexOf(s) > -1).map(d => parseFloat((datanilai[indeksiswa][d] == "") ? 0 : datanilai[indeksiswa][d])).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagisbdp = (kdsbdp.length == 0) ? "" : kdsbdp.length;
                        let nasbdp = (nilaisbdp == "") ? "" : Math.round(nilaisbdp / pembagisbdp);
                        objdata["SBDP"] = (isNaN(nasbdp)) ? 0 : nasbdp;

                        let kdpjok = sumberkd.filter(l => l.indexOf("PJOK") > -1);
                        let nilaipjok = (kdpjok.length == 0) ? "" : Object.keys(datanilai[indeksiswa]).filter(s => kdpjok.indexOf(s) > -1).map(d => parseFloat((datanilai[indeksiswa][d] == "") ? 0 : datanilai[indeksiswa][d])).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagipjok = (kdpjok.length == 0) ? "" : kdpjok.length;
                        // let napjok = Math.round(nilaipjok / kdpjok.length);
                        let napjok = (nilaipjok == "") ? "" : Math.round(nilaipjok / pembagipjok);
                        objdata["PJOK"] = (isNaN(napjok)) ? 0 : napjok;

                        let kdbsund = sumberkd.filter(l => l.indexOf("BSUND") > -1);
                        let nilaibsund = (kdbsund.length == 0) ? "" : Object.keys(datanilai[indeksiswa]).filter(s => kdbsund.indexOf(s) > -1).map(d => parseFloat((datanilai[indeksiswa][d] == "") ? 0 : datanilai[indeksiswa][d])).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagibsund = (kdbsund.length == 0) ? "" : kdbsund.length;
                        let nabsund = (nilaibsund == "") ? "" : Math.round(nilaibsund / pembagibsund);
                        objdata["BSUND"] = (isNaN(nabsund)) ? 0 : nabsund;
                    }
                    arr.push(objdata);
                    i++;

                }
                while (i < jsondatasiswa.length)
                jsonnilaiustertulis["nauspraktek"] = arr;


                //console.log(jsonnilaiustertulis);

            })

            .catch(err => {
                console.log(err);
                alert("Ada siswa Anda yang belum mengikuti ini. Periksa nilai US Tertulisnya. Jika benar-benar tidak mengikuti US Tertulis dan ingin menampilkan seluruh data, maka kasih nilai siswa tersebut dengan nilai [ periksa Time Line Nilai US Praktek]");

            });

        let tekshtml = "";
        let tabel = document.querySelector(".tabelolahus").getElementsByTagName("tbody")[0];
        for (i = 0; i < jsondatasiswa.length; i++) {
            tekshtml += `<tr><td>${i + 1}</td><td style="position:sticky;position:-webkit-sticky;left:0px;;box-shadow: inset 0 0 1px #000000">${jsondatasiswa[i].pd_nama}</td>`;
            for (j = 0; j < 9; j++) {
                let mp = arrmapelus[j]
                tekshtml += `<td contenteditable="true">${jsonnilaiustertulis["naus"][i][mp]}</td>`;
            }
            for (k = 0; k < 9; k++) {
                let mpk = arrmapelus[k]
                tekshtml += `<td contenteditable="true">${jsonnilaiustertulis["nauspraktek"][i][mpk]}</td>`
            }
            tekshtml += "</td>";
            tabel.innerHTML = tekshtml;
            document.querySelector(".statusdataolahus").innerHTML = " Status Data: Nilai US Asli";
            document.querySelector(".loadingolahus").innerHTML = "";
            animasidiv.innerHTML = "";
        }
    } catch (err) {

        document.querySelector(".loadingolahus").innerHTML = "";
        if (tidakadadiustertulis.length == jsondatasiswa.length) {
            alert("Anda belum pernah membuat data US Tertulis");
            document.querySelector(".loadingolahus").innerHTML += "<br/>US Tertulis tidak lengkap";
        } else if (tidakadadiustertulis.length > 0) {
            alert("Siswa-siswa berikut Tidak terdeteksi di server US Tertulis. Pastikan siswa berikut telah mengikuti US Tertulis: " + tidakadadiustertulis.join("\n"));
            document.querySelector(".loadingolahus").innerHTML += "<br/>US Tertulis tidak lengkap";
        } else {

        }

        if (tidakadadiuspraktek.length == jsondatasiswa.length) {
            alert("Anda belum pernah membuat data US Praktek");
            document.querySelector(".loadingolahus").innerHTML += "<br/>US Tertulis tidak lengkap";
        } else if (tidakadadiuspraktek.length > 0) {
            alert("Siswa-siswa berikut Tidak terdeteksi di server US Praktek. Pastikan siswa berikut telah mengikuti US Tertulis: " + tidakadadiuspraktek.join("\n"))
            document.querySelector(".loadingolahus").innerHTML += "<br/>US Tertulis tidak lengkap";
        } else {

        }

    }

}

let t_ust = document.querySelector(".tabtabustertulis")
let t_usp = document.querySelector(".tabtabuspraktik")
t_ust.addEventListener("click", function () {
    t_ust.className += " activee";
    t_usp.className = t_usp.className.replace(/activee/g, "");
    let classph = document.querySelector(".tabelolahus").getElementsByTagName("thead")[0].rows[0].cells[3];
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("divtabelolahus");
    let tabel = document.querySelector(".tabelolahus");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = 0;//(x - y);  
})
t_usp.addEventListener("click", function () {
    t_usp.className += " activee";
    t_ust.className = t_ust.className.replace(/activee/g, "");
    let classph = document.querySelector(".tabelolahus").getElementsByTagName("thead")[0].rows[0].cells[3];
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("divtabelolahus");
    let tabel = document.querySelector(".tabelolahus");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = (x - y);
})

let b_rekus = document.querySelector(".btn_rekapus");
b_rekus.addEventListener("click", function () {
    //jaga-jaga jika USer belum pernah klik tab accordion Olah US;
    let cek = document.querySelector(".tabelolahus").getElementsByTagName("tbody")[0];
    if (cek.innerHTML == "") {
        alert("Maaf, Anda belum membuka tab OLAH US. Silakan buka laman tersebut untuk menggenerate hasil nilai");

    }
    document.querySelector(".tabelrekapus").getElementsByTagName("tbody")[0].innerHTML = `<tr>
    <td><i class="fa fa-spin fa-spinner"></i></td>
    <td><i class="fa fa-spin fa-spinner"></i></td>
    <td><i class="fa fa-spin fa-spinner"></i></td>
    <td><i class="fa fa-spin fa-spinner"></i></td>
    <td><i class="fa fa-spin fa-spinner"></i></td>
    <td><i class="fa fa-spin fa-spinner"></i></td>
    <td><i class="fa fa-spin fa-spinner"></i></td>
    <td><i class="fa fa-spin fa-spinner"></i></td>
    <td><i class="fa fa-spin fa-spinner"></i></td>
    <td><i class="fa fa-spin fa-spinner"></i></td>
    <td><i class="fa fa-spin fa-spinner"></i></td>
    </tr>`
    let defagama = ["ISLAM", "KRISTEN", "KATHOLIK", "HINDU", "BUDHA", "KHONGHUCU"];
    let kodeagama = ["PAI", "PKRIS", "PKATO", "PHIND", "PBUDH", "PKONG"];
    let datakkm = koleksiarraymapelaktif();
    let datamapel = datakkm.kodemapel;
    let mapelagama = datamapel.filter(k => kodeagama.indexOf(k) > -1);
    let mapelnonagama = datamapel.filter(k => !(kodeagama.indexOf(k) > -1));
    //console.log(datamapel)
    //console.log(mapelnonagama)

    //cek mapel yang telah ada nilai US-nya
    fetch(constlinknilai + "?action=lihatnilairekap&tab=uspraktek&kelas=" + idNamaKelas)
        .then(m => m.json())
        .then(r => {
            let sumberkd = r.banyakkd;
            //console.log(sumberkd);
            let pembagimapelus = {};
            for (i = 0; i < datamapel.length; i++) {
                let kodemapel = datamapel[i];
                let n_indek = sumberkd.filter(l => l.indexOf(kodemapel) > -1);
                let adatidak = (n_indek > -1) ? 1 : 2;

                pembagimapelus[datamapel[i]] = adatidak;
            }
            //console.log(pembagimapelus);
            let tekshtml = `<table class="w3-tiny versi-table">
            <thead>
            <tr>
                <th>Kode Mapel</th>
                <th>Identitas Mapel</th>
                <th>Pelaksanaan US Praktik(Ya/Tidak)</th>
            </tr>
            </thead><tbody>
            <tr><td rowspan="${mapelagama.length}">Agama</td>`
            let namamapel = document.getElementById("namamapelraport_" + mapelagama[0]).innerHTML
            let cekcek = (pembagimapelus[mapelagama[0]] == 1) ? "Tidak" : "Ya";
            if (cekcek == "Ya") {
                tekshtml += `<td class="w3-yellow">${mapelagama[0]} (${namamapel})</td><td class="w3-yellow">${cekcek}</td></tr>`
            } else {
                tekshtml += `<td>${mapelagama[0]} (${namamapel})</td><td>${cekcek}</td></tr>`

            }


            if (mapelagama.length > 1) {
                for (j = 1; j < mapelagama.length; j++) {
                    namamapel = document.getElementById("namamapelraport_" + mapelagama[j]).innerHTML
                    cekcek = (pembagimapelus[mapelagama[j]] == 1) ? "Tidak" : "Ya";
                    if (cekcek == "Ya") {
                        tekshtml += `<tr>
                        <td class="w3-yellow">${mapelagama[j]} (${namamapel})</td>
                        <td class="w3-yellow">${cekcek}</td>
                                </tr>
                                `

                    } else {
                        tekshtml += `<tr>
                                <td>${mapelagama[j]} (${namamapel})</td>
                                <td>${cekcek}</td>
                                </tr>

                                `
                    }
                }
            }
            for (k = 0; k < mapelnonagama.length; k++) {
                namamapel = document.getElementById("namamapelraport_" + mapelnonagama[k]).innerHTML;
                cekcek = (pembagimapelus[mapelnonagama[k]] == 1) ? "Tidak" : "Ya";
                if (cekcek == "Ya") {
                    tekshtml += `<tr>
                            <td>${mapelnonagama[k]}</td>
                            <td class="w3-yellow">${namamapel}</td>
                            <td class="w3-yellow">${cekcek}</td>
                            </tr>`
                } else {
                    tekshtml += `<tr>
                            <td>${mapelnonagama[k]}</td>
                            <td>${namamapel}</td>
                            <td>${cekcek}</td>
                            </tr>`

                }


            }
            tekshtml += `</tbody></table>Keterangan: 
            <ul><li>Data Mata pelajaran Agama berdasarkan pendeteksian agama siswa di kelas Anda.
            </li>
            <liL>Pelaksanaan US di tabel ini berdasarkan data nilai siswa yang telah diterima di server Lamaso berdasarkan kategori US Praktek.
            </li>
            <li>"Ya" artinya Anda telah melaksanakan US Praktek pada mata pelajaran tersebut berdasarkan data nilai siswa yang telah masuk ke server
            </li><li>"Tidak" artinya Anda telah melaksanakan US Praktek pada mata pelajaran tersebut berdasarkan data nilai siswa yang telah masuk ke server
            </li>
            </ul>
            `;
            document.querySelector(".deteksimapeluspraktek").innerHTML = tekshtml;
            let tabelus = document.querySelector(".tabelolahus").getElementsByTagName("tbody")[0];
            let lr = tabelus.rows.length;
            //let l = 0;
            let ht = "";
            //console.log(lr)
            // do {
            let arr = [];
            for (l = 0; l < lr; l++) {
                //identitas
                //console.log(l);
                let obj = {};
                obj["indek"] = l;
                obj["namasiswa"] = jsondatasiswa[l].pd_nama;
                let namasiswaus = tabelus.rows[l].cells[1].innerHTML;
                let agamasiswa = jsondatasiswa[l].pd_agama;
                ht += `<tr><td>${l + 1}</td>
                <td>${namasiswaus}</td>
                `
                //agama;
                let us = (tabelus.rows[l].cells[2].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[2].innerHTML);
                let up = (tabelus.rows[l].cells[11].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[11].innerHTML);
                let in_agama = defagama.indexOf(agamasiswa);
                let kagama = kodeagama[in_agama]
                let pembagi = pembagimapelus[kagama];
                // let na1 = Math.round((us + up) / pembagi);
                let na1 = ((us + up) / pembagi).toFixed(2);
                obj["AGAMA"] = na1;
                // console.log(na1);
                ht += (pembagi == 2) ? `<td class="w3-yellow">${na1}</td>` : `<td>${na1}</td>`;

                //pkn;
                us = (tabelus.rows[l].cells[3].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[3].innerHTML);
                up = (tabelus.rows[l].cells[12].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[12].innerHTML);
                pembagi = pembagimapelus["PKN"];
                // na1 = Math.round((us + up) / pembagi);
                na1 = ((us + up) / pembagi).toFixed(2);
                ht += (pembagi == 2) ? `<td class="w3-yellow">${na1}</td>` : `<td>${na1}</td>`;
                obj["PKN"] = na1;

                //bindo;
                us = (tabelus.rows[l].cells[4].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[4].innerHTML);
                up = (tabelus.rows[l].cells[13].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[13].innerHTML);
                pembagi = pembagimapelus["BINDO"];
                // na1 = Math.round((us + up) / pembagi);
                na1 = ((us + up) / pembagi).toFixed(2);
                ht += (pembagi == 2) ? `<td class="w3-yellow">${na1}</td>` : `<td>${na1}</td>`;
                obj["BINDO"] = na1;

                //MTK;
                us = (tabelus.rows[l].cells[5].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[5].innerHTML);
                up = (tabelus.rows[l].cells[14].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[14].innerHTML);
                pembagi = pembagimapelus["MTK"];
                // na1 = Math.round((us + up) / pembagi);
                na1 = ((us + up) / pembagi).toFixed(2);
                ht += (pembagi == 2) ? `<td class="w3-yellow">${na1}</td>` : `<td>${na1}</td>`;
                obj["MTK"] = na1;

                //IPA;
                us = (tabelus.rows[l].cells[6].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[6].innerHTML);
                up = (tabelus.rows[l].cells[15].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[15].innerHTML);
                pembagi = pembagimapelus["IPA"];
                // na1 = Math.round((us + up) / pembagi);
                na1 = ((us + up) / pembagi).toFixed(2);
                ht += (pembagi == 2) ? `<td class="w3-yellow">${na1}</td>` : `<td>${na1}</td>`;
                obj["IPA"] = na1;

                //IPS;
                us = (tabelus.rows[l].cells[7].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[7].innerHTML);
                up = (tabelus.rows[l].cells[16].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[16].innerHTML);
                pembagi = pembagimapelus["IPS"];
                // na1 = Math.round((us + up) / pembagi);
                na1 = ((us + up) / pembagi).toFixed(2);
                ht += (pembagi == 2) ? `<td class="w3-yellow">${na1}</td>` : `<td>${na1}</td>`;
                obj["IPS"] = na1;

                //SBDP;
                us = (tabelus.rows[l].cells[8].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[8].innerHTML);
                up = (tabelus.rows[l].cells[17].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[17].innerHTML);
                pembagi = pembagimapelus["SBDP"];
                // na1 = Math.round((us + up) / pembagi);
                na1 = ((us + up) / pembagi).toFixed(2);
                ht += (pembagi == 2) ? `<td class="w3-yellow">${na1}</td>` : `<td>${na1}</td>`;
                obj["SBDP"] = na1;
                //PJOK;
                us = (tabelus.rows[l].cells[9].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[9].innerHTML);
                up = (tabelus.rows[l].cells[18].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[18].innerHTML);
                pembagi = pembagimapelus["PJOK"];
                // na1 = Math.round((us + up) / pembagi);
                na1 = ((us + up) / pembagi).toFixed(2);
                ht += (pembagi == 2) ? `<td class="w3-yellow">${na1}</td>` : `<td>${na1}</td>`;
                obj["PJOK"] = na1;
                //BSUND;
                us = (tabelus.rows[l].cells[10].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[10].innerHTML);
                up = (tabelus.rows[l].cells[19].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[19].innerHTML);
                pembagi = pembagimapelus["BSUND"];
                // na1 = Math.round((us + up) / pembagi);
                na1 = ((us + up) / pembagi).toFixed(2);
                obj["BSUND"] = na1;
                ht += (pembagi == 2) ? `<td class="w3-yellow">${na1}</td></tr>` : `<td>${na1}</td></tr>`;
                arr.push(obj)
            }


            document.querySelector(".tabelrekapus").getElementsByTagName("tbody")[0].innerHTML = ht;// + `Ket: Sel yang berwarna kuning adalah nilai rata-rata US Tertulis dan US Praktik`;
            ob_rekapus = arr;



        })
        .catch(er => console.log(er))

})

let b_ij = document.querySelector(".btn_nilaiijazah");
b_ij.addEventListener("click", function () {
    if (ob_rekapraport.length === undefined || ob_rekapus.length === undefined) {
        console.log("undefined terdeteksi");
        alert("Maaf, Anda belum membuka Rekap Raport dan/atau Rekap US.")
        return
    }
    //let arrmapelus = ["AGAMA", "PKN", "BINDO", "MTK", "IPA", "IPS", "SBDP", "PJOK", "BSUND"];
    let thtml = "", thtmlr = "", mp, nr, nus, na, nb, ns, nrr;
    let tabelolah = document.querySelector(".tabelolahijazah").getElementsByTagName("tbody")[0];
    let tabelrekap = document.querySelector(".tabelnilaiijazahfix").getElementsByTagName("tbody")[0];
    for (i = 0; i < jsondatasiswa.length; i++) {
        ns = 0, nrr = 0;
        thtml += `<tr><td>${i + 1}</td><td style="position:sticky;position:-webkit-sticky;left:0px;;box-shadow: inset 0 0 1px #000000">${jsondatasiswa[i].pd_nama}</td>`;
        thtmlr += `<tr><td>${i + 1}</td><td style="position:sticky;position:-webkit-sticky;left:0px;;box-shadow: inset 0 0 1px #000000">${jsondatasiswa[i].pd_nama}</td>`;
        for (j = 0; j < arrmapelus.length; j++) {
            mp = arrmapelus[j];
            nr = (ob_rekapraport[i][mp] * 0.7).toFixed(2);
            nus = (ob_rekapus[i][mp] * 0.3).toFixed(2);
            na = (parseFloat(nr) + parseFloat(nus)).toFixed(2);
            nb = Math.round(parseFloat(nr) + parseFloat(nus));
            thtml += `<td>${nr}</td>`;
            thtml += `<td>${nus}</td>`;
            thtml += `<td>${na}</td>`;
            thtmlr += `<td>${nb}</td>`;
            ns += nb
        }
        nrr = (ns / 9).toFixed(2);

        thtml += "</tr>";
        thtmlr += `<td>${nrr}</td></tr>`;
    }

    tabelolah.innerHTML = thtml;
    tabelrekap.innerHTML = thtmlr;

});

let t_olij, t_fixij, d_olij, d_fixij;
t_olij = document.querySelector(".tabtabtabelolahijazah");
t_fixij = document.querySelector(".tabtabtabelnilaiijazahfix");

d_olij = document.querySelector(".idtabelolahijazah");
d_fixij = document.querySelector(".idtabelnilaiijazahfix");
t_olij.addEventListener("click", function () {
    d_olij.className = d_olij.className.replace("w3-hide", "w3-show")
    d_fixij.className = d_fixij.className.replace("w3-show", "w3-hide")
})
t_fixij.addEventListener("click", function () {
    d_olij.className = d_olij.className.replace("w3-show", "w3-hide")
    d_fixij.className = d_fixij.className.replace("w3-hide", "w3-show")
})

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// SURAT KETERANGAN KELULUSAN ///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
let t_skl = document.querySelector(".tabpengumumankelulusan");
t_skl.addEventListener("click", function () {
    let tabelrekap = document.querySelector(".tabelnilaiijazahfix").getElementsByTagName("tbody")[0];
    if (tabelrekap.innerHTML == "") {
        alert("Maaf, Nilai Kelulusan belum bisa Anda lihat. Periksa seluruh komponen proses penilaian ijazah di menu Tab OLAH IJAZAH");
        return;
    }

    let div_select = document.getElementById("idselectnamakelulusan");
    let div_selectskhu = document.getElementById("idselectnamaskhu");
    let div_selectketraport = document.getElementById("idselectnamaketraport");
    let div_selectformatijazah = document.getElementById("idselectnamaformatijazah");
    let htmlopsi = "<option value='' selected>Pilih Nama Siswa</option>";
    for (a = 0; a < jsondatasiswa.length; a++) {
        htmlopsi += `<option value="${a}">${jsondatasiswa[a].pd_nama}</option>`
    }
    div_select.innerHTML = htmlopsi;
    div_selectskhu.innerHTML = htmlopsi;
    div_selectketraport.innerHTML = htmlopsi;
    div_selectformatijazah.innerHTML = htmlopsi;

    //document.querySelector(".htmlskhu").setAttribute("style", "background-image:url('https://drive.google.com/uc?export=view&id=1qcpzq9ABBR8WVMXOk38AEiKN8KRj6YH-');background-repeat: no-repeat;background-size: 100% 100%;padding:8% 10%")

})

const selectnamakelulusan = () => {
    let a = document.getElementById("idselectnamakelulusan");
    let b = a.selectedIndex;
    let c = a.options;
    let v = c[b].value;
    let t = c[b].text;

    let tabelrekap = document.querySelector(".tabelnilaiijazahfix").getElementsByTagName("tbody")[0];
    let nrr = tabelrekap.rows[v].cells[11].innerHTML;
    let dd = document.querySelector(".htmlkelulusan");
    let ttskl = document.querySelector("#idtglsuratskl").innerHTML;
    let noskl = document.querySelector("#idnosuratskl").innerHTML;
    let tt = document.querySelector(".divpublikasikelulusan");
    dd.className = dd.className.replace("w3-hide", "w3-show");
    tt.className = tt.className.replace("w3-show", "w3-hide");
    let ttl = tanggalfull(jsondatasiswa[v].pd_tanggallahir);
    let divhtml = `
    <div class="w3-container">
        <div class="w3-left w3-padding">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Lambang_Kota_Depok.png/371px-Lambang_Kota_Depok.png" style="width:100px"/>
        </div>
        <div class="w3-center w3-bottombar  w3-border-black">
            <h4>PEMERINTAH DAERAH ${jlo.idkota.toUpperCase()} ${jlo.kota.toUpperCase()}<br/>
            DINAS PENDIDIKAN ${jlo.idkota.toUpperCase()}  ${jlo.kota.toUpperCase()} 
            <br/><b  class="w3-xxlarge">${idNamaSekolah.toUpperCase()}</b></br/>
            <sub>Alamat : ${editalamatkopsurat.innerHTML}</sub></h4>
        </div>
    </div>
    <div class="w3-main w3-padding">
        <h4 class="w3-center">SURAT KETERANGAN KELULUSAN</h4>
        <h6 class="w3-center" contenteditable="true">No : ${noskl}</h6>
        <br/>
        <br/>
        <p class="w3-justify">
            Yang bertanda tangan di bawah ini, Kepala ${idNamaSekolah}, ${jlo.idkota} ${jlo.kota} menerangkan bahwa:
        </p>
       <table style="margin-left:20px">
            <tr>
                <td style="vertical-align:top">Nama</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].pd_nama}</td>
            </tr>
            <tr>
                <td style="vertical-align:top">Tempat, Tanggal Lahir</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].pd_tl}, ${ttl}</td>
            </tr>
            <tr>
                <td style="vertical-align:top">Nomor Induk Siswa (NIS)</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].nis}</td>
            </tr>
            <tr>
                <td style="vertical-align:top">Nomor Induk Siswa Nasional (NISN)</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].nisn}</td>
            </tr>
       </table>
       <div class="w3-justify">
                    Berdasarkan :<ul style="list-style-type:decimal"><li>Surat Edaran Menteri Pendidikan dan Kebudayaan Republik Indonesia Nomor 1 Tahun 2021, tentang peniadaan Ujian Nasional dan Ujian Kesetaraan serta Pelaksanaan Ujian Sekolah dalam Masa Darurat Penyebaran Corona Virus Deseases (Covid - 19).
                </li><li>Peraturan Sekretaris Jenderal Kementerian Pendidikan dan Kebudayaan Nomor 5 Tahun 2021, tentang Spesifikasi Teknis, Bentuk dan Tata Cara Pengisian Blangko Pengisian Ijazah Pendidikan Dasar dan Pendidikan Menengah Tahun Pelajaran 2020/2021.
                </li><li>Hasil Rapat Dewan Guru SD ${idNamaSekolah}. pada ${ttskl}, tentang Penetapan Kelulusan,
                </li></ul>
                Dengan ini nama tersebut di atas dinyatakan :

       </div>
        <div class="w3-center">
         <span class="w3-xxlarge w3-padding" > --- LULUS --- </span>
        </div>
        <br/>
        <div class="w3-clear"></div>
        Pada Satuan Pendidikan ${idNamaSekolah} Tahun Pelajaran 2020/2021 dengan nilai sebagai berikut :
        <table class="versi-table" style="margin:0 auto"><thead>
        
            <tr class="w3-aqua">
                <th>No</th>
                <th>Mata Pelajaran<br/>(Kurikulum 2013)</th>
                <th>Nilai Kelulusan</th>
            <tr>
        </thead>
        <tbody>
            <tr>
                <td colspan="3">Kelompok A</td>
            </tr>
                <tr>
                    <td>1</td>
                    <td class="rekapkelulusan_namamapel0"></td>
                    <td class="rekapkelulusan_nilaimapel0"></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td class="rekapkelulusan_namamapel1"></td>
                    <td class="rekapkelulusan_nilaimapel1"></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td class="rekapkelulusan_namamapel2"></td>
                    <td class="rekapkelulusan_nilaimapel2"></td>
                </tr>
                <tr>
                    <td>4</td>
                    <td class="rekapkelulusan_namamapel3"></td>
                    <td class="rekapkelulusan_nilaimapel3"></td>
                </tr>
                <tr>
                    <td>5</td>
                    <td class="rekapkelulusan_namamapel4"></td>
                    <td class="rekapkelulusan_nilaimapel4"></td>
                </tr>
                <tr>
                    <td>6</td>
                    <td class="rekapkelulusan_namamapel5"></td>
                    <td class="rekapkelulusan_nilaimapel5"></td>
                </tr>
                <tr>
                <td colspan="3">Kelompok B</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td class="rekapkelulusan_namamapel6"></td>
                    <td class="rekapkelulusan_nilaimapel6"></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td class="rekapkelulusan_namamapel7"></td>
                    <td class="rekapkelulusan_nilaimapel7"></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Muatan Lokal</td>
                    <td></td>
                </tr>
                
                <tr>
                    <td rowspan="3"></td>
                    <td class="rekapkelulusan_namamapel8"></td>
                    <td class="rekapkelulusan_nilaimapel8"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="w3-aqua">
                    <td colspan="2" >Rata-rata</td>
                    <td class="rekapkelulusan_ratarata">${nrr}</td>
                </tr>
        </tbody>
        </table>
        <br/><br/>
        <p class="w3-justify">
        Demikian Surat Keterangan ini dibuat, untuk dapat dipergunakan sebagaimana mestinya.
        </p>
        <div style="float:right;position:relative;text-align:left;right:50px">
                <table>
                    <tr>
                        <td>Ditetapkan di </td>
                        <td>:</td>
                        <td>${jlo.kota}</td>
                    </tr>
                    <tr>
                        <td>Pada Tanggal </td>
                        <td>:</td>
                        <td>15 Juni 2021</td>
                    </tr>
                    <tr>
                        <td colspan="3">Kepala ${idNamaSekolah}</td>
                    </tr>
                    <tr>
                        <td colspan="3" id="barcodepengumumankelulusan"></td>
                    </tr>
                    <tr>
                        <td colspan="3"><u><b>${idNamaKepsek}</b></u></td>
                    </tr>
                    <tr>
                        <td colspan="3">NIP. ${idNipKepsek}</td>
                    </tr>
                </table>
        </div>
        <div class="w3-clear"></div>





    </div> 
    
    `

    dd.innerHTML = divhtml;


    // alert(v + "   " + t);

    let mp, nr, nus, na, nb, ns = 0, nrrs = 0, namasubjek;

    for (j = 0; j < arrmapelus.length; j++) {
        mp = arrmapelus[j];
        nr = (ob_rekapraport[v][mp] * 0.7).toFixed(2);
        nus = (ob_rekapus[v][mp] * 0.3).toFixed(2);
        na = (parseFloat(nr) + parseFloat(nus)).toFixed(2);
        nb = Math.round(parseFloat(nr) + parseFloat(nus));
        if (mp == "AGAMA") {
            namasubjek = "Pendidikan Agama dan Budi Pekerti";
        } else {
            namasubjek = document.getElementById("namamapelraport_" + mp).innerHTML;

        }

        // divhtml += `<tr><td>${j + 1}</td>
        //                     <td>${namasubjek}</td>`;
        // // divhtml += `<td>${nr}</td>`;
        // // divhtml += `<td>${nus}</td>`;
        // divhtml += `<td>${ob_rekapraport[v][mp]}</td>`;
        // divhtml += `<td>${ob_rekapus[v][mp]}</td>`;
        // divhtml += `<td>${nb}</td></tr>`;
        let namamapel = ".rekapkelulusan_namamapel" + j;
        let nilaimapel = ".rekapkelulusan_nilaimapel" + j;
        document.querySelector(namamapel).innerHTML = namasubjek;
        document.querySelector(nilaimapel).innerHTML = nb;

        ns += parseFloat(nb)
    };

    nrrs = (ns / 9).toFixed(2);
    //document.querySelector(".rekapkelulusan_ratarata").innerHtml = nrr;
    let cek = document.querySelector("#cekbarcodekelulusan");
    if (cek.checked) {

        let teksbarkode = `Telah diketahui dan ditandatangani oleh Kepala ${idNamaSekolah} bahwa Surat Keterangan Kelulusan atas nama ${t} dengan nilai ijazah ${nrr}`;

        barcodekan('barcodepengumumankelulusan', teksbarkode);

    } else {
        document.getElementById("barcodepengumumankelulusan").innerHTML = "<br/><br/><br/>";

    }
}


const changebarcodekelulusan = () => {
    let dd = document.getElementById("ttdbarcodekelulusan")
    let ini = document.getElementById("cekbarcodekelulusan");
    if (ini.checked) {
        dd.innerHTML = "Tanda Tangan Barcode (Aktif)"
    } else {
        dd.innerHTML = "Tanda Tangan Barcode (Tidak Aktif)/Tidak menyertakan barcode tanda tangan"
    }

}

const selectnamaskhu = () => {
    let a = document.getElementById("idselectnamaskhu");
    let b = a.selectedIndex;
    let c = a.options;
    let v = c[b].value;
    let t = c[b].text;

    let tabelrekap = document.querySelector(".tabelnilaiijazahfix").getElementsByTagName("tbody")[0];
    let nrr = tabelrekap.rows[v].cells[11].innerHTML;
    let dd = document.querySelector(".htmlskhu");
    let tt = document.querySelector(".div_skhu");
    dd.className = dd.className.replace("w3-hide", "w3-show");
    tt.className = tt.className.replace("w3-show", "w3-hide");
    let ttl = tanggalfull(jsondatasiswa[v].pd_tanggallahir);

    let divhtml = `
    <div class="w3-container">
        <div class="w3-left w3-padding">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Lambang_Kota_Depok.png/371px-Lambang_Kota_Depok.png" style="width:100px"/>
        </div>
        <div class="w3-center w3-bottombar  w3-border-black">
            <h4>PEMERINTAH DAERAH ${jlo.idkota.toUpperCase()} ${jlo.kota.toUpperCase()}<br/>
            DINAS PENDIDIKAN ${jlo.idkota.toUpperCase()} ${jlo.kota.toUpperCase()} 
            <br/><b  class="w3-xxlarge">${idNamaSekolah.toUpperCase()}</b></br/>
            <sub>Alamat : ${editalamatkopsurat.innerHTML}</sub></h4>
        </div>
    </div>
    <div class="w3-main w3-padding">
        <h4 class="w3-center">SURAT KETERANGAN HASIL BELAJAR</h4>
        <h6 class="w3-center" contenteditable="">No : 42.2/... ... .../SD/VI/2021</h6>
        <br/>
        <br/>
        <p class="w3-justify">
        Yang bertanda tangan di bawah ini, Kepala ${idNamaSekolah}, ${jlo.idkota} ${jlo.kota} menerangkan bahwa:
        </p>
       <table style="margin-left:20px">
            <tr>
                <td style="vertical-align:top">Nama</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].pd_nama}</td>
            </tr>
            <tr>
            <td style="vertical-align:top">Tempat, Tanggal Lahir</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].pd_tl}, ${ttl}</td>
            </tr>
            <tr>
            <td style="vertical-align:top">Nomor Induk Siswa (NIS)</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].nis}</td>
            </tr>
            <tr>
            <td style="vertical-align:top">Nomor Induk Siswa Nasional (NISN)</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].nisn}</td>
            </tr>
       </table>
       <p class="w3-justify">
       Adalah benar bahwa siswa tersebut adalah siswa ${idNamaSekolah} telah mengikuti seluruh rangkaian kegiatan pendidikan sampai dengan Tahun Pelajaran ${idTeksTapel} di sekolah kami dan telah dinyatakan:
        </p>
        <div class="w3-center">
        <span class="w3-border w3-border-black w3-padding" >LULUS / <s>TIDAK LULUS</s> </span>
        </div><br/>
        <div class="w3-clear"></div>
        dengan rincian hasil belajar:
        <div style="overflow-x:auto">
        <table class="versi-table">
        <thead>
            <tr>
                <th>No</th>
                <th>Muatan Pelajaran <br/> (Kurikulum 2013)</th>
                <th>Rata-rata Raport</th>
                <th>Rata-rata US</th>
                <th>Nilai Ijazah <br/>(pembulatan)</th>
            </tr>
        </thead>
        <tbody>`
    let mp, nr, nus, na, nb, ns = 0, nrrs = 0, namasubjek;

    for (j = 0; j < arrmapelus.length; j++) {
        mp = arrmapelus[j];
        nr = (ob_rekapraport[v][mp] * 0.7).toFixed(2);
        nus = (ob_rekapus[v][mp] * 0.3).toFixed(2);
        na = (parseFloat(nr) + parseFloat(nus)).toFixed(2);
        nb = Math.round(parseFloat(nr) + parseFloat(nus));
        if (mp == "AGAMA") {
            namasubjek = "Pendidikan Agama dan Budi Pekerti";
        } else {
            namasubjek = document.getElementById("namamapelraport_" + mp).innerHTML;

        }

        divhtml += `<tr><td>${j + 1}</td>
                            <td>${namasubjek}</td>`;
        // divhtml += `<td>${nr}</td>`;
        // divhtml += `<td>${nus}</td>`;
        divhtml += `<td>${ob_rekapraport[v][mp]}</td>`;
        divhtml += `<td>${ob_rekapus[v][mp]}</td>`;
        divhtml += `<td>${nb}</td></tr>`;
        ns += nb
    }
    nrrs = (ns / 9).toFixed(2);

    divhtml += `<tr><td colspan="4" class="w3-center">Jumlah</td><td>${ns}</td></tr>
        <tr><td colspan="4" class="w3-center">Rata-rata</td><td>${nrrs}</td></tr>
        
        </tbody>
        </table></div><br/>
        <sub>Ket: Nilai ijazah didapat dengan formulasi <span class="w3-border w3-border-black w3-padding">(Nilai Raport x 70 % ) + (Nilai US x 30 % ) </span>.
        </sub><br/><br/>
        <p class="w3-justify">
        Demikian Surat Keterangan ini dibuat, untuk dapat dipergunakan sebagaimana mestinya.
        </p>
        <div style="float:right;position:relative;text-align:left">
        <table>
            <tr><td>Ditetapkan di </td><td>:</td><td>${jlo.kota}</td></tr>
            <tr><td>Pada Tanggal </td><td>:</td><td>15 Juni 2021</td></tr>
            <tr><td colspan="3">Kepala ${idNamaSekolah}</td></tr>
            <tr><td colspan="3" id="barcodepengumumanskhu"></td></tr>
            <tr><td colspan="3"><u><b>${idNamaKepsek}</b></u></td></tr>
            <tr><td colspan="3">NIP. ${idNipKepsek}</td></tr>
        </table>
        </div>
        <div class="w3-clear"></div>





    </div> 
    
    `

    dd.innerHTML = divhtml;
    let cek = document.querySelector("#cekbarcodeskhu");
    if (cek.checked) {

        let teksbarkode = `Telah diketahui dan ditandatangani oleh Kepala ${idNamaSekolah} bahwa Surat Keterangan Hasil Belajar  atas nama ${t} dengan nilai ijazah ${nrr}`;

        barcodekan('barcodepengumumanskhu', teksbarkode);

    } else {
        document.getElementById("barcodepengumumanskhu").innerHTML = "<br/><br/><br/>";

    }
    // alert(v + "   " + t)


}


const changebarcodeskhu = () => {
    let dd = document.getElementById("ttdbarcodeskhu")
    let ini = document.getElementById("cekbarcodeskhu");
    if (ini.checked) {
        dd.innerHTML = "Tanda Tangan Barcode (Aktif)"
    } else {
        dd.innerHTML = "Tanda Tangan Barcode (Tidak Aktif)/Tidak menyertakan barcode tanda tangan"
    }

}


const selectnamaketraport = () => {
    let a = document.getElementById("idselectnamaketraport");
    let b = a.selectedIndex;
    let c = a.options;
    let v = c[b].value;
    let t = c[b].text;
    if (objraportall.length === undefined) {
        alert("Anda belum pernah menyimpan di server data pengolahan Raport seluruh siswa. Anda belum bisa membuat rekap Raport saat ini.");
        return
    }
    let tabelrekap = document.querySelector(".tabelnilaiijazahfix").getElementsByTagName("tbody")[0];
    let nrr = tabelrekap.rows[v].cells[11].innerHTML;
    let dd = document.querySelector(".htmlketraport");
    let tt = document.querySelector(".div_ketraport");
    dd.className = dd.className.replace("w3-hide", "w3-show");
    tt.className = tt.className.replace("w3-show", "w3-hide");
    let ttl = tanggalfull(jsondatasiswa[v].pd_tanggallahir);

    let divhtml = `
    <div class="w3-container">
        <div class="w3-left w3-padding">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Lambang_Kota_Depok.png/371px-Lambang_Kota_Depok.png" style="width:100px"/>
        </div>
        <div class="w3-center w3-bottombar  w3-border-black">
            <h4>PEMERINTAH DAERAH ${jlo.idkota.toUpperCase()} ${jlo.kota.toUpperCase()}<br/>
            DINAS PENDIDIKAN ${jlo.idkota.toUpperCase()} ${jlo.kota.toUpperCase()} 
            <br/><b  class="w3-xxlarge">${idNamaSekolah.toUpperCase()}</b></br/>
            <sub>Alamat : ${editalamatkopsurat.innerHTML}</sub></h4>
        </div>
    </div>
    <div class="w3-main w3-padding">
        <h4 class="w3-center">SURAT KETERANGAN DAFTAR NILAI RAPORT</h4>
        <h6 class="w3-center" contenteditable="">No : 42.2/... ... .../SD/VI/2021</h6>
        <br/>
        <br/>
        <p class="w3-justify">
        Yang bertanda tangan di bawah ini, Kepala ${idNamaSekolah}, ${jlo.idkota} ${jlo.kota} menerangkan bahwa:
        </p>
       <table style="margin-left:20px">
            <tr>
                <td style="vertical-align:top">Nama</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].pd_nama}</td>
            </tr>
            <tr>
            <td style="vertical-align:top">Tempat, Tanggal Lahir</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].pd_tl}, ${ttl}</td>
            </tr>
            <tr>
            <td style="vertical-align:top">Nomor Induk Siswa (NIS)</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].nis}</td>
            </tr>
            <tr>
            <td style="vertical-align:top">Nomor Induk Siswa Nasional (NISN)</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].nisn}</td>
            </tr>
       </table>
       <p class="w3-justify">
       Adalah benar bahwa siswa tersebut adalah siswa ${idNamaSekolah} telah mengikuti seluruh rangkaian kegiatan pendidikan sampai dengan Tahun Pelajaran ${idTeksTapel} di sekolah kami dan telah dinyatakan:
        </p>
        <div class="w3-center">
        <span class="w3-border w3-border-black w3-padding" >LULUS / <s>TIDAK LULUS</s> </span>
        </div><br/>
        <div class="w3-clear"></div>
        dengan rincian Nilai Raport sebagai berikut:
        <div style="overflow-x:auto">
        <table class="versi-table w3-small">
        <thead>
            <tr>
                <th rowspan="2">No</th>
                <th rowspan="2">Muatan Pelajaran <br/> (Kurikulum 2013)</th>
                <th colspan="5">Daftar Nilai Raport</th>
                <th rowspan="2">Rata-rata</th>
            </tr>
            <tr>
                <th>Kelas 4 Semester 1 (7)</th>
                <th>Kelas 4 Semester 2 (8)</th>
                <th>Kelas 5 Semester 1 (9)</th>
                <th>Kelas 5 Semester 6 (10)</th>
                <th>Kelas 6 Semester 1 (11)</th>
               
            </tr>
        </thead>
        <tbody>`
    let mp, nr, nus, na, nb, ns = 0, nrrs = 0, namasubjek;
    // na --> untuk isi setiap sel itu sendiri
    // ns --> untuk isi rata-rata tiap mapel (sel paling pojok kanan)
    // nb --> untuk isi sel baris terakhir

    let arrprefik = ["raport_4_1_", "raport_4_2_", "raport_5_1_", "raport_5_2_", "raport_6_1_"]
    //[2, 11, 20, 29, 38, 47]
    //[3, 12, 21, 30, 39, 48]
    let arrmaplusk = ["AGAMA", "PKN", "BINDO", "MTK", "IPA", "IPS"];
    for (j = 0; j < arrmaplusk.length; j++) {
        mp = arrmaplusk[j];
        nus = 0;
        if (mp == "AGAMA") {
            namasubjek = "Pendidikan Agama dan Budi Pekerti";
        } else {
            namasubjek = document.getElementById("namamapelraport_" + mp).innerHTML;

        }

        divhtml += `<tr><td>${j + 1}</td>
        <td>${namasubjek}</td>`;

        for (k = 0; k < 5; k++) {

            let pref = arrprefik[k] + mp;
            nr = objraportall[v][pref]
            na = (isNaN(parseFloat(nr))) ? 0 : parseFloat(nr);
            nus += na
            divhtml += `<td>${na}</td>`;



        }
        nus = (isNaN(nus / 5)) ? 0 : (nus / 5).toFixed(2);
        divhtml += `<td>${nus}</td>`

        divhtml += `</tr>`;
        ns += parseFloat(nus);

    }
    nb = (isNaN(ns / 6)) ? 0 : (ns / 6).toFixed(2);


    divhtml += `<tr><td colspan="7" class="w3-center">Jumlah</td><td>${ns.toFixed(2)}</td></tr>
        <tr><td colspan="7" class="w3-center">Rata-rata</td><td>${nb}</td></tr>
        
        </tbody>
        </table>
        </div>
        <br/><br/>
        <p class="w3-justify">
        Demikian Surat Keterangan ini dibuat, untuk dapat dipergunakan sebagaimana mestinya.
        </p>
        <div style="float:right;position:relative;text-align:left">
        <table>
            <tr><td>Ditetapkan di </td><td>:</td><td>${jlo.kota}</td></tr>
            <tr><td>Pada Tanggal </td><td>:</td><td>15 Juni 2021</td></tr>
            <tr><td colspan="3">Kepala ${idNamaSekolah}</td></tr>
            <tr><td colspan="3" id="barcodepengumumanketraport"></td></tr>
            <tr><td colspan="3"><u><b>${idNamaKepsek}</b></u></td></tr>
            <tr><td colspan="3">NIP. ${idNipKepsek}</td></tr>
        </table>
        </div>
        <div class="w3-clear"></div>





    </div> 
    
    `

    dd.innerHTML = divhtml;
    let cek = document.querySelector("#cekbarcodeketraport");
    if (cek.checked) {

        let teksbarkode = `Telah diketahui dan ditandatangani oleh Kepala ${idNamaSekolah} bahwa Surat Keterangan Daftar Nilai Rapot  atas nama ${t} dengan rata-rata Raport ${nb}`;

        barcodekan('barcodepengumumanketraport', teksbarkode);

    } else {
        document.getElementById("barcodepengumumanketraport").innerHTML = "<br/><br/><br/>";

    }
    // alert(v + "   " + t)


}


const changebarcodeketraport = () => {
    let dd = document.getElementById("ttdbarcodeketraport")
    let ini = document.getElementById("cekbarcodeketraport");
    if (ini.checked) {
        dd.innerHTML = "Tanda Tangan Barcode (Aktif)"
    } else {
        dd.innerHTML = "Tanda Tangan Barcode (Tidak Aktif)/Tidak menyertakan barcode tanda tangan"
    }

}


const selectnamaformatijazah = () => {
    let a = document.getElementById("idselectnamaformatijazah");
    let b = a.selectedIndex;
    let c = a.options;
    let v = c[b].value;
    let t = c[b].text;

    let tabelrekap = document.querySelector(".tabelnilaiijazahfix").getElementsByTagName("tbody")[0];
    let nrr = tabelrekap.rows[v].cells[11].innerHTML;
    let dd = document.querySelector(".htmlformatijazah");
    //let tt = document.querySelector(".div_formatijazah");
    dd.className = dd.className.replace("w3-hide", "w3-show");
    //dd.setAttribute("style","background-image(url:https://drive.google.com/uc?export=view&id=1qcpzq9ABBR8WVMXOk38AEiKN8KRj6YH-);background-repeat: no-repeat;background-size: 100% 100%")
    //tt.className = tt.className.replace("w3-show", "w3-hide");
    let ttl = tanggalfull(jsondatasiswa[v].pd_tanggallahir);

    let divhtml = `
    <div style="background-image:url(https://drive.google.com/uc?export=view&id=1qcpzq9ABBR8WVMXOk38AEiKN8KRj6YH-);background-repeat: no-repeat;background-size: 100% 100%">
        <div style="padding:8% 12%">    
            <p class="w3-center"><b class="w3-large">
                KEMENTRIAN PENDIDIKAN DAN KEBUDAYAAN REPUBLIK INDONESIA</b><br/>
                <b class="w3-center w3-xxlarge">I J A Z A H</b>
            </p>
            <p class="w3-center w3-large"><b>SEKOLAH DASAR</b><br/>TAHUN PELAJARAN ${idTeksTapel}</p>
            <p class="w3-justify"> 
            Yang bertanda tangan di bawah ini, Kepala <b> ${idNamaSekolah.replace("UPTD SDN", "Sekolah Dasar Negeri")}</b>
            </p>
            <div  style="border-bottom:1px dotted black;"></div>
            <span class="w3-clear"></span>
            <p class="w3-left"> Nomor Pokok Sekolah Nasional:</p><p class="w3-left" style="border-bottom:1px dotted black;width:50%">${document.querySelector(".idnpsn").innerHTML}</p>
            <span class="w3-clear"></span>
            <p class="w3-left">Kabupaten/Kota: </p><p class="w3-left"  style="border-bottom:1px dotted black;width:55%">${jlo.kota}</p>
            <span class="w3-clear"></span>
            
             
            <p class="w3-left" >Provinsi :</p><p class="w3-left" style="width:50%;border-bottom:1px dotted black;">JAWA BARAT </p><p class="w3-right">menerangkan bahwa:</p>
            <span class="w3-clear"></span>
            <table >
                <tr>
                    <td>nama</td>
                    <td>:</td>
                    <td>${jsondatasiswa[v].pd_nama}</td>
                </tr>
                <tr>
                    <td>tempat dan tanggal lahir</td>
                    <td>:</td>
                    <td>${jsondatasiswa[v].pd_tl}, ${ttl}</td>
                </tr>
                <tr>
                    <td>nama orang tua/wali</td>
                    <td>:</td>
                    <td>${jsondatasiswa[v].pd_namaayah}</td>
                </tr>
                <tr>
                    <td>Nomor Induk Siswa</td>
                    <td>:</td>
                    <td>${jsondatasiswa[v].nis}</td>
                </tr>
                <tr>
                    <td>Nomor Induk Siswa Nasional</td>
                    <td>:</td>
                    <td>${jsondatasiswa[v].nisn}</td>
                </tr>
            </table>
            
            <p class="w3-xxlarge w3-center">LULUS</p>
            <p class="w3-justify">
                dari sekolah dasar setelah memenuhi seluruh kriteria sesuai dengan peraturan perundang-undangan yang diumumkan tanggal 15 Juni 2021.
            </p>
            
            <div style="float:right;position:relative;text-align:left">
                ${jlo.kota}, 15 Juni 2021<br/>
                Kepala sekolah
                <br/>
                <br/>
                <br/>
                <b><u>${idNamaKepsek}</u></b><br/>
                NIP. ${idNipKepsek}
            </div>
      
            <div style="left:20%;position:relative;width:3cm; height:4cm;border:.5px solid black;padding:1cm 0;text-align:center">
            Poto ukuran 3 x 4 cm.
            </div>
            <div class="w3-clear"></div>
            </div>
        </div><div style="break-after:page;"></div>
        <div>
        <h3 class="w3-center">DAFTAR NILAI</h3>
        <h5 class="w3-center">SEKOLAH DASAR</h5>
        <h6 class="w3-center">TAHUN PELALARAN ${idTeksTapel}</h6>
        <br/>
        <table style="margin:0 auto">
        <tr>
            <td>Nama</td><td>:</td>
            <td style="border-bottom:.5px dotted black">${jsondatasiswa[v].pd_nama}</td>
        </tr>
        <tr>
            <td>Nomor Induk Siswa Nasional</td><td>:</td>
            <td style="border-bottom:.5px dotted black">${jsondatasiswa[v].nisn}</td>
        </tr>
        </table>
        <br/><br/>
        <table class="versi-table" style="margin:0 auto;width:80%;">
            <tr>
                <th>No.</th>
                <th>Mata Pelajaran <br/>(Kurikulum 2013)</th>
                <th>Nilai Ujian <br/>Sekolah</th>
            </tr>
            <tr>
            <td colspan="2">Kelompok A</td><td></td>
            </tr>
            <tr>
                <td>1</td>
                <td>Pendidikan Agama dan Budi Pekerti</td>
                <td>${tabelrekap.rows[v].cells[2].innerHTML}</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Pendidikan Kewarganegaraan</td>
                <td>${tabelrekap.rows[v].cells[3].innerHTML}</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Bahasa Indonesia</td>
                <td>${tabelrekap.rows[v].cells[4].innerHTML}</td>
            </tr>
            <tr>
                <td>4</td>
                <td>Matematika</td>
                <td>${tabelrekap.rows[v].cells[5].innerHTML}</td>
            </tr>
            <tr>
                <td>5</td>
                <td>Ilmu Pengetahuan Alam</td>
                <td>${tabelrekap.rows[v].cells[6].innerHTML}</td>
            </tr>
            <tr>
                <td>6</td>
                <td>Ilmu Pengetahuan Sosial</td>
                <td>${tabelrekap.rows[v].cells[7].innerHTML}</td>
                <tr>
                <td colspan="2">Kelompok B</td><td></td>
                </tr>
            </tr>
            <tr>
                    <td>1</td>
                    <td>Seni Budaya dan Prakarya</td>
                    <td>${tabelrekap.rows[v].cells[8].innerHTML}</td>
            </tr>
            <tr>
                    <td>2</td>
                    <td>Pendidikan Jasmani, Olahraga, dan Kesehatan</td>
                    <td>${tabelrekap.rows[v].cells[9].innerHTML}</td>
            </tr>
            <tr>
                    <td rowspan="4">3</td>
                    <td>Muatan Lokal</td>
                    <td></td>
            </tr>
            <tr>
                <td>a. Bahasa Sunda</td>
                
                <td>${tabelrekap.rows[v].cells[10].innerHTML}</td>
            </tr>
            <tr>
                <td>b.</td>
                <td></td>
            </tr>
            <tr>
                <td>c.</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="2" class="w3-center"><b>Rata-rata</b></td>
                <td>${tabelrekap.rows[v].cells[11].innerHTML}</td>
            </tr>

        </table><br/>
                <div style="float:right;position:relative;text-align:left">
                ${jlo.kota}, 15 Juni 2021<br/>
                Kepala sekolah
                <br/>
                <br/>
                <br/>
                <b><u>${idNamaKepsek}</u></b><br/>
                NIP. ${idNipKepsek}
            </div>
        </div>
        `










    dd.innerHTML = divhtml;

    // alert(v + "   " + t)


}

const printformatijazah = (elemenprint) => {
    //let isibody = document.querySelector(".htmlformatijazah").innerHTML;;//.replace("w3-tiny", "");
    let isibody = document.querySelector("." + elemenprint).innerHTML;;//.replace("w3-tiny", "");
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>Contoh Format Ijazah</title>`;
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


    body.innerHTML = `${isibody}`;



    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}


const fn_publikasikan = (eltombol, elhalaman, elselect, pubapa) => {
    //    alert("publikasikanraportpts()");
    let btn = document.querySelector("." + eltombol);
    // let divraportsemester = document.getElementById("halamanraport");
    let divraportsemester = document.querySelector("." + elhalaman);
    let op = document.getElementById(elselect).options;
    let indop = document.getElementById(elselect).selectedIndex;
    let namarsemester = op[indop].text;
    if (op[indop].value == "") {
        alert("Silakan pilih nama siswa Anda, untuk mempublikasikan halaman ini di server.");
        return
    }
    if (divraportsemester.innerHTML == "") {
        alert("Halaman Belum siap dipublikasikan");
        btn.innerHTML = "<i class='fa fa-globe'></i> Publikasikan";
    } else {
        let confr = confirm("Anda yakin ingin mempublikasikan ini kepada siswa yang bersangkutan? Data yang berhasil dipublikasikan akan muncul di tabel Publikasi.\n\n Klik [OK] untuk melanjutkan.\n\n Klik [NO] untuk membatalkan.");
        if (confr) {
            btn.innerHTML = "<i class='fa fa-spin fa-spinner'></i> Proses Publikasi";
            //alert(eltombol + ", " + elhalaman + ", " + elselect + ", " + pubapa)
            let tekhtml = divraportsemester.innerHTML;
            let dtext = document.getElementById("tempattextarea");
            dtext.textContent = tekhtml.replace(/contenteditable/gi, "");
            let htmlraport = window.btoa(unescape(encodeURIComponent(dtext.textContent)));
            let data = new FormData();
            data.append("kelas", idNamaKelas);
            data.append("namasiswa", namarsemester);
            data.append("htmlraport", htmlraport);
            data.append("jenispublikasi", pubapa);
            fetch(constlinknilai + "?action=postpublikasiumum", {
                method: "post",
                body: data
            }).then(m => m.json())
                .then(r => {
                    //console.log(r)
                    alert(r.result + "Publikasi");
                    btn.innerHTML = "<i class='fa fa-globe'></i> Publikasikan";
                })
                .catch(er => alert(er))
            // console.log(namarpts);
            // console.log(htmlraport);

            // let namasubfolder = e.parameter.kelas;
            // let namasiswa = e.parameter.namasiswa;
            // let htmlraport = e.parameter.htmlraport;
        }
    }

}

const fn_tabelpublikasi = (eltombol, elhalaman, eltabel, tabelapa) => {
    let divprint = document.querySelector("." + elhalaman);
    let div = document.querySelector("." + eltabel);

    let bt = document.querySelector("." + eltombol);
    bt.innerHTML = "<i class='fa fa-spinner fa-spin'></i>";

    // let div = document.querySelector("."+el);
    div.className = div.className.replace("w3-hide", "w3-show");
    div.scrollIntoView();
    let tekshtml = `<h4>Data Publikasi</h4><table class="versi-table w3-small" id="tabelcekpublikasi${tabelapa}">
                <thead><tr>
                    <th>No</th>
                    <th>Nama Siswa</th>
                    <th>Preview</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
                </thead><tbody>
                `;
    for (i = 0; i < jsondatasiswa.length; i++) {
        tekshtml += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${jsondatasiswa[i].pd_nama}</td>
                        <td class="w3-center">Belum dipublikasikan</td>
                        <td class="w3-center"><span class="w3-text-red">?</span></td>
                        <td class="w3-center">-</td>
                    </tr>
                    `
    }
    tekshtml += `</tbody></table>`;
    div.innerHTML = tekshtml;

    fetch(constlinknilai + "?action=cekpublikasi&kelas=" + idNamaKelas + "&jenispublikasi=" + tabelapa)
        .then(m => m.json())
        .then(r => {
            //console.log(r);
            bt.innerHTML = `<i class="fa fa-eye"></i> Tabel Publikasi</button>`;
            let cekdata = r.result;

            if (cekdata == 0) {
                div.innerHTML = "<h4>Maaf, Anda belum pernah mempublikasikan laman ini</h4>";
            } else {
                let data = r.data;
                let datanama, dataid, dataaksi,
                    indektabel, idtabel = document.getElementById("tabelcekpublikasi" + tabelapa).getElementsByTagName("tbody")[0];
                for (j = 0; j < data.length; j++) {
                    datanama = data[j].namasiswa;
                    dataid = data[j].idfile;
                    dataaksi = data[j].publikasi;
                    indektabel = jsondatasiswa.map(s => s.pd_nama).indexOf(datanama);

                    if (indektabel > -1) {
                        idtabel.rows[indektabel].cells[2].innerHTML = `<button onclick="previewraportsemester('${dataid}')" title="Lihat")><i class="fa fa-eye"></i> Lihat</button>`;
                        idtabel.rows[indektabel].cells[3].innerHTML = (dataaksi == "show") ? `<b class="w3-text-green">&checkmark;</b>` : `<b class="w3-text-red">&times;</b>`;
                        idtabel.rows[indektabel].cells[4].innerHTML = (dataaksi == "show") ? `<button onclick="sembunyikanpublikasi('${eltombol}', '${elhalaman}', '${eltabel}','${datanama}','${tabelapa}')" title="Hapus")><i class="fa fa-trash"></i> Hapus</button>` : `<button onclick="tampilkankanpublikasi('${eltombol}', '${elhalaman}', '${eltabel}','${datanama}','${tabelapa}')" title="Kembalikan")><i class="fa fa-refresh"></i> </button>`;
                    }



                }




            }

        })
        .catch(er => console.log(er))
    //console.log


}

const sembunyikanpublikasi = (eltombol, elhalaman, eltabel, datanama, tabelapa) => {
    fetch(constlinknilai + "?action=showhidepublikasi&kelas=" + idNamaKelas + "&namasiswa=" + datanama + "&aksi=hide&jenispublikasi=" + tabelapa)
        .then(m => m.json())
        .then(k => {
            alert(k.result);
            fn_tabelpublikasi(eltombol, elhalaman, eltabel, tabelapa)
        })
        .catch(er => alert(er))
}
const tampilkankanpublikasi = (eltombol, elhalaman, eltabel, datanama, tabelapa) => {
    fetch(constlinknilai + "?action=showhidepublikasi&kelas=" + idNamaKelas + "&namasiswa=" + datanama + "&aksi=show&jenispublikasi=" + tabelapa)
        .then(m => m.json())
        .then(k => {
            alert(k.result);
            fn_tabelpublikasi(eltombol, elhalaman, eltabel, tabelapa);
        })
        .catch(er => alert(er))
}


const pindahTabSeleksi = (el, a) => {
    if (a == "leger_k3") {
        cek_leger_k3();
    } else {
        cek_leger_k4();

    }
    let tabv = document.querySelectorAll('.tabverifs')
    tabv.forEach(elem => {
        elem.className = elem.className.replace("active", "");
    });
    el.className += " active";

};
const cek_leger_k3 = () => {
    try {
        let arrayLeger = [];
        //alert('cek leger k3');
        let div = document.querySelector(".leger_k3");
        let tekssumberdata = document.querySelector("#menumenunilaikd3").innerHTML;
        let ada = tekssumberdata.indexOf("Data Pengolahan Nilai") > 1 ? "Sumber Data: Tabel Data Nilai Olahan" : "Sumber Data: Tabel Data Nilai Asli";
        let pr = document.querySelector(".printleger");
        pr.innerHTML = `<button class="w3-button w3-red w3-margin" onclick="printleger('leger_k3')"><i class="fa fa-print"></i>  PRINT</button>`;
        pr.innerHTML += `<button class="w3-button w3-green w3-margin" onclick="excelleger('leger_k3')"><i class="fa fa-file-excel-o"></i>  Ms. Excel</button>`;
        document.querySelector(".leger_k3").className = document.querySelector(".leger_k3").className.replace("w3-hide", "w3-show");
        document.querySelector(".leger_k4").className = document.querySelector(".leger_k4").className.replace("w3-show", "w3-hide");
        // data.datarraport.forEach(el => console.table(el));
        let defagama = ["ISLAM", "KRISTEN", "KATHOLIK", "HINDU", "BUDHA", "KHONGHUCU"];
        let kodeagama = ["PAI", "PKRIS", "PKATO", "PHIND", "PBUDH", "PKONG"];
        let siswa = jsondatasiswa;
        if (idJenjang > 3) {
            // console.log(idJenjang)
            let i = 0
            // let arrayLeger = [];
            let arrayRangking = [];
            let rowbawah = [];
            let html = "<h3>Leger Nilai Kompetensi Pengetahuan (KI-3)</h3>" + ada;
            html += `<table class="versi-table w3-tiny tabellegerk3">
        <thead>
            <tr>
                <th rowspan="2">No</th>
                <th rowspan="2">Nama Siswa</th>
                <th colspan="9">Mata Pelajaran</th>
                <th rowspan="2">Jumlah</th>
                <th rowspan="2">Rata</th>
                <th rowspan="2">Rangking<br><button onclick="urutkanTabel(this,true,'leger_k3')">urutkan</button></th>
            </tr>
            <tr>
                <th>Agama</th>
                <th>PKN</th>
                <th>BINDO</th>
                <th>MTK</th>
                <th>IPA</th>
                <th>IPS</th>
                <th>SBDP</th>
                <th>PJOK</th>
                <th>B SUNDA</th>
                </tr>
        </thead>
        <tbody>
    `;
            //objek_nunuy = algoritmakurtilas(0).datarraport;
            do {
                let legerbaru = {};
                let data = algoritmakurtilas(i);
                legerbaru["namasiswa"] = jsondatasiswa[i].pd_nama;
                let agamasiswa = jsondatasiswa[i].pd_agama;
                let keyagama = kodeagama[defagama.indexOf(agamasiswa)];
                let keymapel = ["raport_" + keyagama, "raport_PKN", "raport_BINDO", "raport_MTK", "raport_IPA", "raport_IPS", "raport_SBDP", "raport_PJOK", "raport_BSUND"]
                let keymapel2 = ["raport_PKN", "raport_BINDO", "raport_MTK", "raport_IPA", "raport_IPS", "raport_SBDP", "raport_PJOK", "raport_BSUND"]
                // let o_nilai = data.datarraport.map(k => Object.fromEntries(Object.entries(k).filter(([a, b]) => a.indexOf("raport_") > -1)));
                // let o_nilai = data.datarraport.map(k => Object.fromEntries(Object.entries(k).filter(([a, b]) => keymapel.indexOf(a) > -1)));
                let o_nilai = data.datarraport.map(k => Object.fromEntries(Object.entries(k).filter(([a, b]) => keymapel.indexOf(a) > -1))).filter(value => Object.keys(value).length !== 0);;
                // let jadi_nilai = Object.entries(o_nilai).filter(([, v]) => Object.keys(v) !== null);

                //let objekselainagama = o_nilai.filter(value => Object.keys(value).length !== 0);

                legerbaru["nilai"] = o_nilai;
                legerbaru["cek"] = o_nilai.map(a => a[Object.keys(a)]);//.map(a => o_nilai[a]);//.reduce((a, b) => a + b);
                legerbaru["jumlah"] = o_nilai.map(a => a[Object.keys(a)]).reduce((a, b) => a + b);;//.map(a => o_nilai[a]);//.reduce((a, b) => a + b);
                legerbaru["rerata"] = (o_nilai.map(a => a[Object.keys(a)]).reduce((a, b) => a + b) / 9).toFixed(2);;//.map(a => o_nilai[a]);//.reduce((a, b) => a + b);
                arrayRangking.push((o_nilai.map(a => a[Object.keys(a)]).reduce((a, b) => a + b) / 9).toFixed(2));
                // legerbaru["nilaijadi"] = jadi_nilai;
                //legerbaru["nilaijadi2"] = objekselainagama;

                html += `<tr>
            <td>${i + 1}</td>
            <td>${jsondatasiswa[i].pd_nama}</td>
            <td>${data.datarraport.map(k => k["raport_" + keyagama])[data.datarraport.findIndex(s => s["raport_" + keyagama])]}</td>
            <td>${data.datarraport.map(k => k["raport_PKN"])[data.datarraport.findIndex(s => s["raport_PKN"])]}</td>
            <td>${data.datarraport.map(k => k["raport_BINDO"])[data.datarraport.findIndex(s => s["raport_BINDO"])]}</td>
            <td>${data.datarraport.map(k => k["raport_MTK"])[data.datarraport.findIndex(s => s["raport_MTK"])]}</td>
            <td>${data.datarraport.map(k => k["raport_IPA"])[data.datarraport.findIndex(s => s["raport_IPA"])]}</td>
            <td>${data.datarraport.map(k => k["raport_IPS"])[data.datarraport.findIndex(s => s["raport_IPS"])]}</td>
            <td>${data.datarraport.map(k => k["raport_SBDP"])[data.datarraport.findIndex(s => s["raport_SBDP"])]}</td>
            <td>${data.datarraport.map(k => k["raport_PJOK"])[data.datarraport.findIndex(s => s["raport_PJOK"])]}</td>
            <td>${data.datarraport.map(k => k["raport_BSUND"])[data.datarraport.findIndex(s => s["raport_BSUND"])]}</td>
            <td>${legerbaru["jumlah"]}</td>
            <td>${legerbaru["rerata"]}</td>
            <td></td>
        </tr>`;
                //agama;
                // rowbawah.push(data.datarraport.map(k => k["raport_" + keyagama])[data.datarraport.findIndex(s => s["raport_" + keyagama])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_PKN"])[data.datarraport.findIndex(s => s["raport_PKN"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_BINDO"])[data.datarraport.findIndex(s => s["raport_BINDO"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_MTK"])[data.datarraport.findIndex(s => s["raport_MTK"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_IPA"])[data.datarraport.findIndex(s => s["raport_IPA"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_IPS"])[data.datarraport.findIndex(s => s["raport_IPS"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_SBDP"])[data.datarraport.findIndex(s => s["raport_SBDP"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_PJOK"])[data.datarraport.findIndex(s => s["raport_PJOK"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_BSUND"])[data.datarraport.findIndex(s => s["raport_BSUND"])]);

                // html += `<tr>
                //     <td>${i + 1}</td>
                //     <td>${jsondatasiswa[i].pd_nama}</td>
                //     <td>${data.datarraport.map(k => k["raport_" + keyagama])[data.datarraport.findIndex(s => s["raport_" + keyagama])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_PKN"])[data.datarraport.findIndex(s => s["raport_PKN"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_BINDO"])[data.datarraport.findIndex(s => s["raport_BINDO"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_MTK"])[data.datarraport.findIndex(s => s["raport_MTK"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_IPA"])[data.datarraport.findIndex(s => s["raport_IPA"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_IPS"])[data.datarraport.findIndex(s => s["raport_IPS"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_SBDP"])[data.datarraport.findIndex(s => s["raport_SBDP"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_PJOK"])[data.datarraport.findIndex(s => s["raport_PJOK"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_BSUND"])[data.datarraport.findIndex(s => s["raport_BSUND"])]}</td>
                //     <td>jumlah</td>
                //     <td>rerata</td>
                //     <td>rangking</td>
                // </tr>`;


                // legerbaru["AgamaSiswa"] = agamasiswa;
                // legerbaru["AGAMA"] = data.datarraport.map(k => k["raport_" + keyagama])[0];
                // legerbaru["PKN"] = data.datarraport.map(k => k["raport_PKN"])[data.datarraport.findIndex(s => s["raport_PKN"])];
                // legerbaru["BINDO"] = data.datarraport.map(k => k["raport_BINDO"])[data.datarraport.findIndex(s => s["raport_BINDO"])];
                // legerbaru["MTK"] = data.datarraport.map(k => k["raport_MTK"])[data.datarraport.findIndex(s => s["raport_MTK"])];
                // legerbaru["IPA"] = data.datarraport.map(k => k["raport_IPA"])[data.datarraport.findIndex(s => s["raport_IPA"])];
                // legerbaru["IPS"] = data.datarraport.map(k => k["raport_IPS"])[data.datarraport.findIndex(s => s["raport_IPS"])];
                // legerbaru["SBDP"] = data.datarraport.map(k => k["raport_SBDP"])[data.datarraport.findIndex(s => s["raport_SBDP"])];
                // legerbaru["PJOK"] = data.datarraport.map(k => k["raport_PJOK"])[data.datarraport.findIndex(s => s["raport_PJOK"])];
                // legerbaru["BSUND"] = data.datarraport.map(k => k["raport_BSUND"])[data.datarraport.findIndex(s => s["raport_BSUND"])];
                arrayLeger.push(legerbaru);
                // arrayLeger.push(o_nilai);

                i++;
            }
            while (i < siswa.length);
            //console.log(arrayLeger);
            html += `</tbody></table>`;
            div.innerHTML = html;
            let tabelini = document.querySelector(".tabellegerk3").getElementsByTagName("tbody")[0];
            let arrsortrangk = rangking(arrayRangking);

            for (let j = 0; j < tabelini.rows.length; j++) {
                tabelini.rows[j].cells[13].innerHTML = arrsortrangk[j];
            };
            let tesade = TbodyToArray("leger_k3");
            console.table(tesade);
        } else {
            let i = 0
            // let arrayLeger = [];
            let arrayRangking = [];
            let rowbawah = [];
            let html = "<h3>Leger Nilai Kompetensi Pengetahuan (KI-3)</h3>" + ada;
            html += `<table class="versi-table w3-tiny tabellegerk3">
        <thead>
            <tr>
                <th rowspan="2">No</th>
                <th rowspan="2">Nama Siswa</th>
                <th colspan="7">Mata Pelajaran</th>
                <th rowspan="2">Jumlah</th>
                <th rowspan="2">Rata</th>
                <th rowspan="2">Rangking<br><button onclick="urutkanTabel(this,true,'leger_k3')">urutkan</button></th>
            </tr>
            <tr>
                <th>Agama</th>
                <th>PKN</th>
                <th>BINDO</th>
                <th>MTK</th>
                <th>SBDP</th>
                <th>PJOK</th>
                <th>B SUNDA</th>
                </tr>
        </thead>
        <tbody>
    `;
            //objek_nunuy = algoritmakurtilas(0).datarraport;
            do {
                let legerbaru = {};
                let data = algoritmakurtilas(i);
                legerbaru["namasiswa"] = jsondatasiswa[i].pd_nama;
                let agamasiswa = jsondatasiswa[i].pd_agama;
                let keyagama = kodeagama[defagama.indexOf(agamasiswa)];
                let keymapel = ["raport_" + keyagama, "raport_PKN", "raport_BINDO", "raport_MTK", "raport_IPA", "raport_IPS", "raport_SBDP", "raport_PJOK", "raport_BSUND"]
                let keymapel2 = ["raport_PKN", "raport_BINDO", "raport_MTK", "raport_IPA", "raport_IPS", "raport_SBDP", "raport_PJOK", "raport_BSUND"]
                // let o_nilai = data.datarraport.map(k => Object.fromEntries(Object.entries(k).filter(([a, b]) => a.indexOf("raport_") > -1)));
                // let o_nilai = data.datarraport.map(k => Object.fromEntries(Object.entries(k).filter(([a, b]) => keymapel.indexOf(a) > -1)));
                let o_nilai = data.datarraport.map(k => Object.fromEntries(Object.entries(k).filter(([a, b]) => keymapel.indexOf(a) > -1))).filter(value => Object.keys(value).length !== 0);;
                // let jadi_nilai = Object.entries(o_nilai).filter(([, v]) => Object.keys(v) !== null);

                //let objekselainagama = o_nilai.filter(value => Object.keys(value).length !== 0);

                legerbaru["nilai"] = o_nilai;
                legerbaru["cek"] = o_nilai.map(a => a[Object.keys(a)]);//.map(a => o_nilai[a]);//.reduce((a, b) => a + b);
                legerbaru["jumlah"] = o_nilai.map(a => a[Object.keys(a)]).reduce((a, b) => a + b);;//.map(a => o_nilai[a]);//.reduce((a, b) => a + b);
                legerbaru["rerata"] = (o_nilai.map(a => a[Object.keys(a)]).reduce((a, b) => a + b) / 7).toFixed(2);;//.map(a => o_nilai[a]);//.reduce((a, b) => a + b);
                arrayRangking.push((o_nilai.map(a => a[Object.keys(a)]).reduce((a, b) => a + b) / 7).toFixed(2));
                // legerbaru["nilaijadi"] = jadi_nilai;
                //legerbaru["nilaijadi2"] = objekselainagama;

                html += `<tr>
            <td>${i + 1}</td>
            <td>${jsondatasiswa[i].pd_nama}</td>
            <td>${data.datarraport.map(k => k["raport_" + keyagama])[data.datarraport.findIndex(s => s["raport_" + keyagama])]}</td>
            <td>${data.datarraport.map(k => k["raport_PKN"])[data.datarraport.findIndex(s => s["raport_PKN"])]}</td>
            <td>${data.datarraport.map(k => k["raport_BINDO"])[data.datarraport.findIndex(s => s["raport_BINDO"])]}</td>
            <td>${data.datarraport.map(k => k["raport_MTK"])[data.datarraport.findIndex(s => s["raport_MTK"])]}</td>
           <td>${data.datarraport.map(k => k["raport_SBDP"])[data.datarraport.findIndex(s => s["raport_SBDP"])]}</td>
            <td>${data.datarraport.map(k => k["raport_PJOK"])[data.datarraport.findIndex(s => s["raport_PJOK"])]}</td>
            <td>${data.datarraport.map(k => k["raport_BSUND"])[data.datarraport.findIndex(s => s["raport_BSUND"])]}</td>
            <td>${legerbaru["jumlah"]}</td>
            <td>${legerbaru["rerata"]}</td>
            <td></td>
        </tr>`;
                //agama;
                // rowbawah.push(data.datarraport.map(k => k["raport_" + keyagama])[data.datarraport.findIndex(s => s["raport_" + keyagama])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_PKN"])[data.datarraport.findIndex(s => s["raport_PKN"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_BINDO"])[data.datarraport.findIndex(s => s["raport_BINDO"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_MTK"])[data.datarraport.findIndex(s => s["raport_MTK"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_IPA"])[data.datarraport.findIndex(s => s["raport_IPA"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_IPS"])[data.datarraport.findIndex(s => s["raport_IPS"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_SBDP"])[data.datarraport.findIndex(s => s["raport_SBDP"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_PJOK"])[data.datarraport.findIndex(s => s["raport_PJOK"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_BSUND"])[data.datarraport.findIndex(s => s["raport_BSUND"])]);

                // html += `<tr>
                //     <td>${i + 1}</td>
                //     <td>${jsondatasiswa[i].pd_nama}</td>
                //     <td>${data.datarraport.map(k => k["raport_" + keyagama])[data.datarraport.findIndex(s => s["raport_" + keyagama])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_PKN"])[data.datarraport.findIndex(s => s["raport_PKN"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_BINDO"])[data.datarraport.findIndex(s => s["raport_BINDO"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_MTK"])[data.datarraport.findIndex(s => s["raport_MTK"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_IPA"])[data.datarraport.findIndex(s => s["raport_IPA"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_IPS"])[data.datarraport.findIndex(s => s["raport_IPS"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_SBDP"])[data.datarraport.findIndex(s => s["raport_SBDP"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_PJOK"])[data.datarraport.findIndex(s => s["raport_PJOK"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_BSUND"])[data.datarraport.findIndex(s => s["raport_BSUND"])]}</td>
                //     <td>jumlah</td>
                //     <td>rerata</td>
                //     <td>rangking</td>
                // </tr>`;


                // legerbaru["AgamaSiswa"] = agamasiswa;
                // legerbaru["AGAMA"] = data.datarraport.map(k => k["raport_" + keyagama])[0];
                // legerbaru["PKN"] = data.datarraport.map(k => k["raport_PKN"])[data.datarraport.findIndex(s => s["raport_PKN"])];
                // legerbaru["BINDO"] = data.datarraport.map(k => k["raport_BINDO"])[data.datarraport.findIndex(s => s["raport_BINDO"])];
                // legerbaru["MTK"] = data.datarraport.map(k => k["raport_MTK"])[data.datarraport.findIndex(s => s["raport_MTK"])];
                // legerbaru["IPA"] = data.datarraport.map(k => k["raport_IPA"])[data.datarraport.findIndex(s => s["raport_IPA"])];
                // legerbaru["IPS"] = data.datarraport.map(k => k["raport_IPS"])[data.datarraport.findIndex(s => s["raport_IPS"])];
                // legerbaru["SBDP"] = data.datarraport.map(k => k["raport_SBDP"])[data.datarraport.findIndex(s => s["raport_SBDP"])];
                // legerbaru["PJOK"] = data.datarraport.map(k => k["raport_PJOK"])[data.datarraport.findIndex(s => s["raport_PJOK"])];
                // legerbaru["BSUND"] = data.datarraport.map(k => k["raport_BSUND"])[data.datarraport.findIndex(s => s["raport_BSUND"])];
                arrayLeger.push(legerbaru);
                // arrayLeger.push(o_nilai);

                i++;
            }
            while (i < siswa.length);
            //console.log(arrayLeger);
            html += `</tbody></table>`;
            div.innerHTML = html;
            let tabelini = document.querySelector(".tabellegerk3").getElementsByTagName("tbody")[0];
            let arrsortrangk = rangking(arrayRangking);

            for (let j = 0; j < tabelini.rows.length; j++) {
                tabelini.rows[j].cells[11].innerHTML = arrsortrangk[j];
            }
            let tesade = TbodyToArray("leger_k3");
            console.table(tesade);
        }
    } catch (err) {
        // alert("Maaf, Raport untuk siswa ini tidak bisa ditampilkan. Pastikan data nilai KI-3 dan KI-4 minimal ada 2 KD yang memiliki nilai. \n\n Tips: jika memang tidak ada data nilai, beri nilai nol (tidak boleh dikosongkan) untuk Rekap KI-3 atau KI-4.)");
        console.log(err)
        let divto = document.querySelector(".leger_k3");
        divto.innerHTML = "Peringatan! Halaman ini akan muncul ketika Anda telah membuka laman <b>Kompetensi Pengetahuan [k-3]</b>";

    }
};
const rangking = (arr) => {
    const sorted = [...new Set(arr)].sort((a, b) => b - a);
    const rank = new Map(sorted.map((x, i) => [x, i + 1]));
    return arr.map((x) => rank.get(x));
};
const cek_leger_k4 = () => {
    try {
        let arraylegerk4 = [];
        // alert('cek leger k4');
        document.querySelector(".leger_k4").className = document.querySelector(".leger_k4").className.replace("w3-hide", "w3-show");
        document.querySelector(".leger_k3").className = document.querySelector(".leger_k3").className.replace("w3-show", "w3-hide");
        let tekssumberdata = document.querySelector("#menumenunilaikd4").innerHTML;
        let ada = tekssumberdata.indexOf("Data Pengolahan Nilai") > 1 ? "Sumber Data: Tabel Data Nilai Olahan" : "Sumber Data: Tabel Data Nilai Asli";

        let div = document.querySelector(".leger_k4");
        let pr = document.querySelector(".printleger");
        pr.innerHTML = `<button class="w3-button w3-red w3-margin" onclick="printleger('leger_k4')"><i class="fa fa-print"></i>  PRINT</button>`;
        pr.innerHTML += `<button class="w3-button w3-green w3-margin" onclick="excelleger('leger_k4')"><i class="fa fa-file-excel-o"></i>  Ms. Excel</button>`;

        // data.datarraport.forEach(el => console.table(el));
        let defagama = ["ISLAM", "KRISTEN", "KATHOLIK", "HINDU", "BUDHA", "KHONGHUCU"];
        let kodeagama = ["PAI", "PKRIS", "PKATO", "PHIND", "PBUDH", "PKONG"];
        let siswa = jsondatasiswa;
        let i = 0
        // let arrayLeger = [];
        let arrayRangking = [];
        let rowbawah = [];
        let html = "<h3>Leger Nilai Kompetensi Keterampilan (KI-4)</h3>Sumber Data : " + ada;
        html += `<table class="versi-table w3-tiny tabellegerk4">
        <thead>
            <tr>
                <th rowspan="2">No</th>
                <th rowspan="2">Nama Siswa</th>
                <th colspan="9">Mata Pelajaran</th>
                <th rowspan="2">Jumlah</th>
                <th rowspan="2">Rata</th>
                
            </tr>
            <tr>
                <th>Agama</th>
                <th>PKN</th>
                <th>BINDO</th>
                <th>MTK</th>
                <th>IPA</th>
                <th>IPS</th>
                <th>SBDP</th>
                <th>PJOK</th>
                <th>B SUNDA</th>
                </tr>
        </thead>
        <tbody>
    `;
        //objek_nunuy = algoritmakurtilas(0).datarraport;
        do {
            let legerbaru = {};
            let data = algoritmaketerampilan(i);
            // console.log(data);
            legerbaru["namasiswa"] = jsondatasiswa[i].pd_nama;
            let agamasiswa = jsondatasiswa[i].pd_agama;
            let keyagama = kodeagama[defagama.indexOf(agamasiswa)];
            let keymapel = ["raportk4_" + keyagama, "raportk4_PKN", "raportk4_BINDO", "raportk4_MTK", "raportk4_IPA", "raportk4_IPS", "raportk4_SBDP", "raportk4_PJOK", "raportk4_BSUND"]
            let keymapel2 = ["raportk4_PKN", "raportk4_BINDO", "raportk4_MTK", "raportk4_IPA", "raportk4_IPS", "raportk4_SBDP", "raportk4_PJOK", "raportk4_BSUND"]
            // let o_nilai = data.datarraport.map(k => Object.fromEntries(Object.entries(k).filter(([a, b]) => a.indexOf("raportk4_") > -1)));
            // let o_nilai = data.datarraport.map(k => Object.fromEntries(Object.entries(k).filter(([a, b]) => keymapel.indexOf(a) > -1)));
            let o_nilai = data.datarraport.map(k => Object.fromEntries(Object.entries(k).filter(([a, b]) => keymapel.indexOf(a) > -1))).filter(value => Object.keys(value).length !== 0);;
            // let jadi_nilai = Object.entries(o_nilai).filter(([, v]) => Object.keys(v) !== null);

            //let objekselainagama = o_nilai.filter(value => Object.keys(value).length !== 0);

            legerbaru["nilai"] = o_nilai;
            legerbaru["cek"] = o_nilai.map(a => a[Object.keys(a)]);//.map(a => o_nilai[a]);//.reduce((a, b) => a + b);
            legerbaru["jumlah"] = o_nilai.map(a => a[Object.keys(a)]).reduce((a, b) => a + b);;//.map(a => o_nilai[a]);//.reduce((a, b) => a + b);
            legerbaru["rerata"] = (o_nilai.map(a => a[Object.keys(a)]).reduce((a, b) => a + b) / 9).toFixed(2);;//.map(a => o_nilai[a]);//.reduce((a, b) => a + b);
            arrayRangking.push((o_nilai.map(a => a[Object.keys(a)]).reduce((a, b) => a + b) / 9).toFixed(2));
            // legerbaru["nilaijadi"] = jadi_nilai;
            //legerbaru["nilaijadi2"] = objekselainagama;

            html += `<tr>
            <td>${i + 1}</td>
            <td>${jsondatasiswa[i].pd_nama}</td>
            <td>${data.datarraport.map(k => k["raportk4_" + keyagama])[data.datarraport.findIndex(s => s["raportk4_" + keyagama])]}</td>
            <td>${data.datarraport.map(k => k["raportk4_PKN"])[data.datarraport.findIndex(s => s["raportk4_PKN"])]}</td>
            <td>${data.datarraport.map(k => k["raportk4_BINDO"])[data.datarraport.findIndex(s => s["raportk4_BINDO"])]}</td>
           <td>${data.datarraport.map(k => k["raportk4_MTK"])[data.datarraport.findIndex(s => s["raportk4_MTK"])]}</td>
           
           <td>${data.datarraport.map(k => k["raportk4_IPA"])[data.datarraport.findIndex(s => s["raportk4_IPA"])]}</td>
            <td>${data.datarraport.map(k => k["raportk4_IPS"])[data.datarraport.findIndex(s => s["raportk4_IPS"])]}</td>
           
            <td>${data.datarraport.map(k => k["raportk4_SBDP"])[data.datarraport.findIndex(s => s["raportk4_SBDP"])]}</td>
            <td>${data.datarraport.map(k => k["raportk4_PJOK"])[data.datarraport.findIndex(s => s["raportk4_PJOK"])]}</td>
            <td>${data.datarraport.map(k => k["raportk4_BSUND"])[data.datarraport.findIndex(s => s["raportk4_BSUND"])]}</td>
            <td>${legerbaru["jumlah"]}</td>
            <td>${legerbaru["rerata"]}</td>
           
        </tr>`;
            //agama;
            //agama;
            // rowbawah.push(data.datarraport.map(k => k["raport_" + keyagama])[data.datarraport.findIndex(s => s["raport_" + keyagama])]);
            // rowbawah.push(data.datarraport.map(k => k["raport_PKN"])[data.datarraport.findIndex(s => s["raport_PKN"])]);
            // rowbawah.push(data.datarraport.map(k => k["raport_BINDO"])[data.datarraport.findIndex(s => s["raport_BINDO"])]);
            // rowbawah.push(data.datarraport.map(k => k["raport_MTK"])[data.datarraport.findIndex(s => s["raport_MTK"])]);
            // rowbawah.push(data.datarraport.map(k => k["raport_IPA"])[data.datarraport.findIndex(s => s["raport_IPA"])]);
            // rowbawah.push(data.datarraport.map(k => k["raport_IPS"])[data.datarraport.findIndex(s => s["raport_IPS"])]);
            // rowbawah.push(data.datarraport.map(k => k["raport_SBDP"])[data.datarraport.findIndex(s => s["raport_SBDP"])]);
            // rowbawah.push(data.datarraport.map(k => k["raport_PJOK"])[data.datarraport.findIndex(s => s["raport_PJOK"])]);
            // rowbawah.push(data.datarraport.map(k => k["raport_BSUND"])[data.datarraport.findIndex(s => s["raport_BSUND"])]);

            // // html += `<tr>
            //     <td>${i + 1}</td>
            //     <td>${jsondatasiswa[i].pd_nama}</td>
            //     <td>${data.datarraport.map(k => k["raport_" + keyagama])[data.datarraport.findIndex(s => s["raport_" + keyagama])]}</td>
            //     <td>${data.datarraport.map(k => k["raport_PKN"])[data.datarraport.findIndex(s => s["raport_PKN"])]}</td>
            //     <td>${data.datarraport.map(k => k["raport_BINDO"])[data.datarraport.findIndex(s => s["raport_BINDO"])]}</td>
            //     <td>${data.datarraport.map(k => k["raport_MTK"])[data.datarraport.findIndex(s => s["raport_MTK"])]}</td>
            //     <td>${data.datarraport.map(k => k["raport_IPA"])[data.datarraport.findIndex(s => s["raport_IPA"])]}</td>
            //     <td>${data.datarraport.map(k => k["raport_IPS"])[data.datarraport.findIndex(s => s["raport_IPS"])]}</td>
            //     <td>${data.datarraport.map(k => k["raport_SBDP"])[data.datarraport.findIndex(s => s["raport_SBDP"])]}</td>
            //     <td>${data.datarraport.map(k => k["raport_PJOK"])[data.datarraport.findIndex(s => s["raport_PJOK"])]}</td>
            //     <td>${data.datarraport.map(k => k["raport_BSUND"])[data.datarraport.findIndex(s => s["raport_BSUND"])]}</td>
            //     <td>jumlah</td>
            //     <td>rerata</td>
            //     <td>rangking</td>
            // </tr>`;


            // legerbaru["AgamaSiswa"] = agamasiswa;
            // legerbaru["AGAMA"] = data.datarraport.map(k => k["raport_" + keyagama])[0];
            // legerbaru["PKN"] = data.datarraport.map(k => k["raport_PKN"])[data.datarraport.findIndex(s => s["raport_PKN"])];
            // legerbaru["BINDO"] = data.datarraport.map(k => k["raport_BINDO"])[data.datarraport.findIndex(s => s["raport_BINDO"])];
            // legerbaru["MTK"] = data.datarraport.map(k => k["raport_MTK"])[data.datarraport.findIndex(s => s["raport_MTK"])];
            // legerbaru["IPA"] = data.datarraport.map(k => k["raport_IPA"])[data.datarraport.findIndex(s => s["raport_IPA"])];
            // legerbaru["IPS"] = data.datarraport.map(k => k["raport_IPS"])[data.datarraport.findIndex(s => s["raport_IPS"])];
            // legerbaru["SBDP"] = data.datarraport.map(k => k["raport_SBDP"])[data.datarraport.findIndex(s => s["raport_SBDP"])];
            // legerbaru["PJOK"] = data.datarraport.map(k => k["raport_PJOK"])[data.datarraport.findIndex(s => s["raport_PJOK"])];
            // legerbaru["BSUND"] = data.datarraport.map(k => k["raport_BSUND"])[data.datarraport.findIndex(s => s["raport_BSUND"])];
            arraylegerk4.push(legerbaru);
            // arrayLeger.push(o_nilai);

            i++;
        }
        while (i < siswa.length);
        //console.log(arraylegerk4);
        html += `</tbody></table>`
        div.innerHTML = html;
        // let tabelini = document.querySelector(".tabellegerk4").getElementsByTagName("tbody")[0];
        // let arrsortrangk = rangking(arrayRangking);
        // for (let j = 0; j < tabelini.rows.length; j++) {
        //     tabelini.rows[j].cells[13].innerHTML = arrsortrangk[j];
        // }
    } catch (err) {
        // alert("Maaf, Raport untuk siswa ini tidak bisa ditampilkan. Pastikan data nilai KI-3 dan KI-4 minimal ada 2 KD yang memiliki nilai. \n\n Tips: jika memang tidak ada data nilai, beri nilai nol (tidak boleh dikosongkan) untuk Rekap KI-3 atau KI-4.)");
        // console.log(err.message)
        let divto = document.querySelector(".leger_k4");
        divto.innerHTML = "Peringatan! Halaman ini akan muncul ketika Anda telah membuka laman <b>Kompetensi Keterampilan [k-4]</b>";

    }
}
const printleger = (kelas) => {
    let isibody = document.querySelector("." + kelas).innerHTML;
    let kmp
    if (kelas == "leger_k3") {
        kmp = "pengetahuan"
    } else {
        kmp = "Keterampilan"
    }
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO LEGER</title>`;
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

    body.innerHTML = `<h3 class="w3-center">LEGER NILAI ${kmp}</h3`;
    body.innerHTML += `<h4 class="w3-center">Kelas ${idNamaKelas} Semester ${idSemester}</h4>`;
    body.innerHTML += `<h5 class="w3-center">Tahun Pelajaran ${idTeksTapel}</h5>`;
    body.innerHTML += `${isibody}`;
    body.innerHTML += '<div style="float:left;position:relative;margin-left:50px;text-align:center">Mengetahui,<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><br/><u><b>' + idNamaKepsek + '</b></u><br/>NIP. ' + idNipKepsek + '</div>';
    body.innerHTML += '<div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ', ' + tanggalfull(new Date()) + '<br/>' + idJenisGuru + '<br/><br/><br/><br/><br/><b><u>' + namauser + '</u></b><br/>NIP. ' + idNipGuruKelas + '</div>';



    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();
};

const print_print_bantusiswa = () => {
    let isibody = document.getElementById("idpracetak").innerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO</title>`;
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
    body.innerHTML = `${isibody}`;
    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

};
const excelleger = (kelas) => {
    let tabelsumber = document.querySelector("." + kelas);
    let kdnya = kelas.split("_")[1];
    let tekskd = (kdnya == "k3") ? "PENGETAHUAN" : "KETERAMPILAN"
    let divto = document.getElementById("datasiswaprint");
    let headsumber = tabelsumber.getElementsByTagName("thead")[0];
    let bodysumber = tabelsumber.getElementsByTagName("tbody")[0];
    let jumlahkolom = bodysumber.rows[0].cells.length;

    let tekshtml = `<table class="versi-table w3-tiny" id="tablekeexcelekapkd3${kelas}">
    <tr>
        <td colspan="${jumlahkolom}">LEGER NILAI ${tekskd}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}">Kelas ${idNamaKelas} Semester ${idSemester}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}">Tahun Pelajaran ${idTeksTapel}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}"></td>
        
    <tr>
    ${headsumber.innerHTML}
    
    ${bodysumber.innerHTML.replace(/\./g, ",")}
    <tr>
         
    <tr>`


    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Mengetahui, </td>
    <td></td>
    `;
    let sisakolom = jumlahkolom - 11;
    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${jlo.kota}, ${tanggalfull(new Date())}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Kepala ${idNamaSekolah} </td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${idJenisGuru} ${idNamaKelas}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>
    <tr></tr>
    <tr></tr>
    <tr></tr>
    `;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3"><b><u>${idNamaKepsek}</u></b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `<td colspan="3"><b><u>${namauser}</u></b></td> <td></td> <td></td> <td></td> </tr>`;

    tekshtml += `<tr><td></td>
    <td colspan="3">NIP. ${idNipKepsek}</b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `<td colspan="3">NIP. ${idNipGuruKelas}</td> <td></td> <td></td> <td></td> </tr>`;

    tekshtml += `</table>`;
    divto.innerHTML = tekshtml
    $("#tablekeexcelekapkd3" + kelas).table2excel({
        name: "Worksheet Name",
        filename: "Leger nilai " + tekskd + " " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 2,
        barisatas: 5

    });
    divto.innerHTML = "";
};
const urutkanTabel = (el, bol, kelas) => {
    // alert('awalnya ' + bol);
    // alert('kelasnya ' + kelas);
    let div = document.querySelector("." + kelas).getElementsByTagName("tbody")[0];
    let rows, switching, i, x, y, shouldSwitch;

    if (bol) {
        let kolom = div.rows[0].cells.length - 1;
        switching = true;
        while (switching) {
            switching = false;
            rows = div.rows;
            for (i = 0; i < rows.length; i++) {
                shouldSwitch = false;
                x = Number(rows[i].cells[kolom].innerHTML);
                if (i == rows.length - 1) {
                    y = Number(rows[i].cells[kolom].innerHTML);
                } else {
                    y = Number(rows[i + 1].cells[kolom].innerHTML);
                };
                if (x > y) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }

        el.setAttribute("onclick", `urutkanTabel(this,false,'${kelas}')`);
        el.innerHTML = "Kembali";
    } else {
        let kolom = 0;
        switching = true;
        while (switching) {
            switching = false;
            rows = div.rows;
            for (i = 0; i < rows.length; i++) {
                shouldSwitch = false;
                x = Number(rows[i].cells[kolom].innerHTML);
                if (i == rows.length - 1) {
                    y = Number(rows[i].cells[kolom].innerHTML);
                } else {
                    y = Number(rows[i + 1].cells[kolom].innerHTML);
                };
                if (x > y) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
        el.setAttribute("onclick", `urutkanTabel(this,true,'${kelas}')`);
        el.innerHTML = "Urutkan";
        // alert(kolom);

    }
};

const TbodyToArray = (idbody) => {
    var tableInfo = Array.prototype.map.call(document.querySelector("." + idbody).getElementsByTagName('tbody')[0].getElementsByTagName("tr"), function (tr) {
        return Array.prototype.map.call(tr.querySelectorAll('td'), function (td) {
            return td.innerHTML;
        });
    });
    return tableInfo
};
const importdataKeTable = (kelas) => {
    // let div = document.querySelector("." + kelas);
    let konfirmasi = confirm("Sebelum Anda mengimport data excel ke tabel ini, Anda harus memperhatikan data Header file Anda dengan data Header dalam tabel ini. Usahakan data Header di di dalam file Anda sudah sama dengan data header yang ada di dalam Tabel Laman ini. Klik OK untuk melanjutkan, klik CANCEL untuk membatalkan/memperbaiki file");
    if (!konfirmasi) {
        return;
    }
    let tinputexcel = document.getElementById("fileImportExcel");
    tinputexcel.addEventListener('change', () => {
        var fileUpload = tinputexcel;//document.getElementById("fileUpload");

        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value)) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();

                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessExcel(e.target.result, kelas);
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
                        ProcessExcel(data, kelas);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                alert("Browsernya versi jadul. Ga support.... Ganti dengan Chrome yang terupdate ya");
            }
        } else {
            alert("Importnya file Excel ya ... bukan yang lain.");
        }
    })
    tinputexcel.click();

}


function ProcessExcel(data, kelas) {
    let div = document.querySelector("." + kelas).getElementsByTagName("tbody")[0];
    let tt = div.rows;
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    let sortir = excelRows.filter((k, i) => i > 4 && i < jsondatasiswa.length + 5);
    // console.log(sortir);
    let seltabel = tt[0].cells;
    let arrBaru = [];
    for (let a = 0; a < sortir.length; a++) {
        let ob = {};
        let ob_sortir = sortir[a];
        let kos = Object.keys(ob_sortir);

        ob[kos[0]] = ob_sortir[kos[0]];//nomor urut
        ob[kos[1]] = ob_sortir[kos[1]];//nnama siswa
        for (let b = 2; b < seltabel.length; b++) {
            let keyT = "__EMPTY_" + (b - 1);
            let valXL = ob_sortir[keyT];
            let valBaru = (valXL === undefined) ? "" : valXL;
            ob[keyT] = valBaru;
        }
        arrBaru.push(ob);
    };
    // console.table(arrBaru);
    // console.log(arrBaru);
    let html = ``;
    for (let i = 0; i < arrBaru.length; i++) {
        let d_ob = arrBaru[i];
        html += `<tr>`;
        for (nu in d_ob) {
            html += `<td>${d_ob[nu]}</td>`
        }
        html += `</tr>`;
    }
    div.innerHTML = html;

};
const fn_combineTableVsExcel = () => {
    let tabel = document.querySelector('.kelastabel').getElementsByTagName('tbody')[0];
    let objek = shortir[1];
    for (i = 0; i < tabel.rows[a].length; i++) {

    }

};
const importdataKeTablePerlengkapan = (kelas) => {
    // let div = document.querySelector("." + kelas);
    let konfirmasi = confirm("Sebelum Anda mengimport data excel ke tabel ini, Anda harus memperhatikan data Header file Anda dengan data Header dalam tabel ini. Usahakan data Header di di dalam file Anda sudah sama dengan data header yang ada di dalam Tabel Laman ini. Klik OK untuk melanjutkan, klik CANCEL untuk membatalkan/memperbaiki file");
    if (!konfirmasi) {
        return;
    }
    let tinputexcel = document.getElementById("fileImportExcel");
    tinputexcel.addEventListener('change', () => {
        var fileUpload = tinputexcel;//document.getElementById("fileUpload");

        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value)) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();

                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessExcel2(e.target.result, kelas);
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
                        ProcessExcel2(data, kelas);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                alert("Browsernya versi jadul. Ga support.... Ganti dengan Chrome yang terupdate ya");
            }
        } else {
            alert("Importnya file Excel ya ... bukan yang lain.");
        }
    })
    tinputexcel.click();

}


function ProcessExcel2(data, kelas) {
    let div = document.querySelector("." + kelas).getElementsByTagName("tbody")[0];
    let tt = div.rows;
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    let sortir = excelRows.filter((k, i) => i > 5 && i < jsondatasiswa.length + 6);
    console.log(sortir);
    let seltabel = tt[0].cells;
    let arrBaru = [];
    for (let a = 0; a < sortir.length; a++) {
        let ob = {};
        let ob_sortir = sortir[a];
        let kos = Object.keys(ob_sortir);

        ob[kos[0]] = ob_sortir[kos[0]];//nomor urut
        ob[kos[1]] = ob_sortir[kos[1]];//nnama siswa
        for (let b = 2; b < seltabel.length; b++) {
            let keyT = "__EMPTY_" + (b - 1);
            let valXL = ob_sortir[keyT];
            let valBaru = (valXL === undefined) ? "" : valXL;
            ob[keyT] = valBaru;
        }
        arrBaru.push(ob);
    };
    // console.table(arrBaru);
    // console.log(arrBaru);
    let html = ``;
    for (let i = 0; i < arrBaru.length; i++) {
        let d_ob = arrBaru[i];
        html += `<tr>`;
        for (nu in d_ob) {
            html += `<td>${d_ob[nu]}</td>`
        }
        html += `</tr>`;
    }
    div.innerHTML = html;

};

const exportk12 = (kelas) => {
    //alert(c);
    let tabelsumber = document.querySelector("." + kelas);

    let tekskd = (kelas == "classtabelk1") ? "SPIRITUAL" : "SOSIAL"
    let divto = document.getElementById("datasiswaprint");
    let headsumber = tabelsumber.getElementsByTagName("thead")[0];
    let bodysumber = tabelsumber.getElementsByTagName("tbody")[0];
    let jumlahkolom = bodysumber.rows[0].cells.length;

    let tekshtml = `<table class="versi-table w3-tiny" id="table__keexcel${kelas}">
    <tr>
        <td colspan="${jumlahkolom}">REKAPITULASI JURNAL KOMPETENSI ${tekskd}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}">Kelas ${idNamaKelas} Semester ${idSemester}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}">Tahun Pelajaran ${idTeksTapel}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}"></td>
        
    <tr>
    ${headsumber.innerHTML}
    ${bodysumber.innerHTML.replace(/\./g, ",")}
    <tr>
         
    <tr>`


    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Mengetahui, </td>
    <td></td>
    `;
    let sisakolom = jumlahkolom - 11;
    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${jlo.kota}, ${tanggalfull(new Date())}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Kepala ${idNamaSekolah} </td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${idJenisGuru} ${idNamaKelas}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>
    <tr></tr>
    <tr></tr>
    <tr></tr>
    `;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3"><b><u>${idNamaKepsek}</u></b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `<td colspan="3"><b><u>${namauser}</u></b></td> <td></td> <td></td> <td></td> </tr>`;

    tekshtml += `<tr><td></td>
    <td colspan="3">NIP. ${idNipKepsek}</b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `<td colspan="3">NIP. ${idNipGuruKelas}</td> <td></td> <td></td> <td></td> </tr>`;

    tekshtml += `</table>`;
    divto.innerHTML = tekshtml
    $("#table__keexcel" + kelas).table2excel({
        name: "Worksheet Name",
        filename: "JURNAL KOMPETENSI " + tekskd + " " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 1,
        barisatas: 5

    });
    divto.innerHTML = "";
};
const importk12 = (kelas) => {
    //alert(c) 
    let konfirmasi = confirm("Sebelum Anda mengimport data excel ke tabel ini, Anda harus memperhatikan data Header file Anda dengan data Header dalam tabel ini. Usahakan data Header di di dalam file Anda sudah sama dengan data header yang ada di dalam Tabel Laman ini. Klik OK untuk melanjutkan, klik CANCEL untuk membatalkan/memperbaiki file");
    if (!konfirmasi) {
        return;
    }
    let tinputexcel = document.getElementById("fileImportExcel");
    tinputexcel.addEventListener('change', () => {
        var fileUpload = tinputexcel;//document.getElementById("fileUpload");

        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value)) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();

                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessExcel3(e.target.result, kelas);
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
                        ProcessExcel3(data, kelas);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                alert("Browsernya versi jadul. Ga support.... Ganti dengan Chrome yang terupdate ya");
            }
        } else {
            alert("Importnya file Excel ya ... bukan yang lain.");
        }
    })
    tinputexcel.click();
};
function ProcessExcel3(data, kelas) {
    let div = document.querySelector("." + kelas).getElementsByTagName("tbody")[0];
    let kk = (kelas == "classtabelk1") ? "k1" : "k2";
    let tt = div.rows;
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    let sortir = excelRows.filter((k, i) => i > 2 && i < jsondatasiswa.length + 3);
    console.log(sortir);
    let seltabel = tt[0].cells;
    let arrBaru = [];
    for (let a = 0; a < sortir.length; a++) {
        let ob = {};
        let ob_sortir = sortir[a];
        let kos = Object.keys(ob_sortir);

        ob[kos[0]] = ob_sortir[kos[0]];//nomor urut
        ob[kos[1]] = ob_sortir[kos[1]];//nnama siswa
        for (let b = 2; b < seltabel.length; b++) {
            let keyT = "__EMPTY_" + (b - 1);
            let valXL = ob_sortir[keyT];
            let valBaru = (valXL === undefined) ? "" : valXL;
            ob[keyT] = valBaru;
        }
        arrBaru.push(ob);
    };
    // console.table(arrBaru);
    // console.log(arrBaru);
    let html = ``;
    for (let i = 0; i < arrBaru.length; i++) {
        let d_ob2 = arrBaru[i];
        let d_ob = Object.keys(arrBaru[i]);
        html += `<tr>`;
        // for (nu in d_ob) {
        //     html += `<td>${d_ob[nu]}</td>`
        // }
        for (j = 0; j < d_ob.length - 1; j++) {
            html += `<td>${d_ob2[d_ob[j]]}</td>`
        }
        html += `<td>
        <button title="Tambahkan indikator" onclick="modtambahindikator('${kk}',${i})">+</button>
        <button title="Hapus indikator ini" onclick="hapusindikator('${kk}',${i})"><i class="fa fa-trash"></i></button>
        </td></tr>`;
    }
    div.innerHTML = html;

};
