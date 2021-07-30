function nilaimapel() {

    if (window.location.href.indexOf("gmp.html") > -1) {

        let valuekelas = document.getElementById("gmppilihrombel");//.value;

        if (valuekelas !== "null" && valuekelas.value == "none") {
            alert("Anda belum memilih kelas. Silakan pilih Kelas terlebih dulu")
            return

        }
    }


    tampilinsublamangurukelas("mapel");
    ulhar.style.display = "block";
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


    let tekshtml = "<h3> Kompetensi Dasar</h3>";
    tekshtml += `<button class='w3-button w3-round-large w3-blue' onclick="datacekliskd()">Simpan</button><hr/>`;

    let opsimapelagama = ""

    if (bolislam) {
        opsimapelagama += `<option id='agama1' value='PAI'>Pendidikan Agama Islam dan Budi Pekerti</option>`;
    }
    if (bolkristen) {
        opsimapelagama += `<option id='agama2' value='PKRIS'>Pendidikan Agama Kristen dan Budi Pekerti</option>`;
    }
    if (bolkatolik) {
        opsimapelagama += `<option id='agama3' value='PKATO'>Pendidikan Agama Katholik dan Budi Pekerti</option>`;
    }
    if (bolbudha) {
        opsimapelagama += `<option id='agama4' value='PBUDH'>Pendidikan Agama Budha dan Budi Pekerti</option>`;
    }
    if (bolhindu) {
        opsimapelagama += `<option id='agama5' value='PHIND'>Pendidikan Agama Hindu dan Budi Pekerti</option>`;
    }
    if (bolkhonghucu) {
        opsimapelagama += `<option id='agama6' value='PKONG'>Pendidikan Agama Khonghucu dan Budi Pekerti</option>`;
    }

    let adaips = "";
    if (idJenjang >= 4) {
        adaips = `
        <option value="IPA">Ilmu Pengetahuan Alam(IPA)</option>
    <option  value="IPS">Ilmu Pengetahuan SOSIAL (IPS)</option>
        `
    }
    let htmlseleksiulhar = `<select class="w3-select w3-gray w3-hover-light-grey" id="selectnilaimapelulhar" onchange="nilaimapelulhar()">
    <option id="pilihnol" value="">Silakan Pilih Mata Pelajaran</option>
    ${opsimapelagama}
    <option id="selulhar0" value="PKN">Pendidikan Kewarganegaraan (PKN)</option>
    <option id="selulhar1" value="BINDO">Bahasa Indonesia (BINDO)</option>
    <option id="selulhar2" value="MTK">MATEMATIKA (MTK)</option>
    ${adaips}    
    <option id="selulhar5" value="PJOK">Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)</option>
    <option id="selulhar6" value="SBDP">Seni Budaya dan Prakarya (SBDP)</option>
    <option id="selulhar6" value="BSUND">Bahasa Sunda (BSUND)</option>
    </select>
    `;
    opsimapelulhar.innerHTML = htmlseleksiulhar;

    htmlseleksiulhar = `<select class="w3-select w3-gray w3-hover-light-grey" id="selectnilaimapelpts" onchange="nilaimapelpts()">
    <option id="pilihnolpts" value="">Silakan Pilih Mata Pelajaran</option>
    ${opsimapelagama}
    <option id="selptsr0" value="PKN">Pendidikan Kewarganegaraan (PKN)</option>
    <option id="selpts1" value="BINDO">Bahasa Indonesia (BINDO)</option>
    <option id="selpts2" value="MTK">MATEMATIKA (MTK)</option>
    ${adaips}    
    <option id="selpts5" value="PJOK">Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)</option>
    <option id="selpts6" value="SBDP">Seni Budaya dan Prakarya (SBDP)</option>
    <option id="selpts7" value="BSUND">Bahasa Sunda (BSUND)</option>
    </select>
    `;
    opsimapelpts.innerHTML = htmlseleksiulhar;
    htmlseleksiulhar = `<select class="w3-select w3-gray w3-hover-light-grey" id="selectnilaimapelpaspak" onchange="nilaimapelpaspak()">
    <option id="pilihnolpaspak" value="">Silakan Pilih Mata Pelajaran</option>
    ${opsimapelagama}
    <option id="selpaspak0" value="PKN">Pendidikan Kewarganegaraan (PKN)</option>
    <option id="selpaspak1" value="BINDO">Bahasa Indonesia (BINDO)</option>
    <option id="selpaspak2" value="MTK">MATEMATIKA (MTK)</option>
    ${adaips}    
    <option id="selpaspak5" value="PJOK">Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)</option>
    <option id="selpaspak6" value="SBDP">Seni Budaya dan Prakarya (SBDP)</option>
    <option id="selpaspak7" value="BSUND">Bahasa Sunda (BSUND)</option>
    </select>
    `;
    opsimapelpaspak.innerHTML = htmlseleksiulhar;

}


const fnkeyobjekmapel = (mapel, banyakkd) => {
    //let banyakkd = ["8_PH_03022021_PAI_3.8", "8_PH_03022021_PAI_3.9", "70_PH_03022021_PAI_3.8", "70_PH_03022021_PAI_3.9", "18_PH_16022021_IPA_3.8", "29_PH_22022021_PKN_3.3", "29_PH_22022021_BINDO_3.8", "29_PH_22022021_MTK_3.8", "34_PH_25022021_MTK_3.2", "36_PH_26022021_SBDP_3.2"];
    //let banyakkd = ["4_PH_29012021_MTK_3.4", "7_PH_05022021_PKN_3.2", "7_PH_05022021_BINDO_3.5", "7_PH_05022021_IPA_3.6", "7_PH_05022021_IPS_3.3", "7_PH_05022021_SBDP_3.2", "9_PH_11022021_PKN_3.3", "9_PH_11022021_BINDO_3.5", "9_PH_11022021_IPS_3.4", "9_PH_11022021_IPA_3.7", "9_PH_11022021_SBDP_3.3", "22_PH_18022021_MTK_3.5", "16_PH_19022021_PKN_3.3", "16_PH_19022021_BINDO_3.7", "16_PH_19022021_IPA_3.8", "16_PH_19022021_IPS_3.4", "16_PH_19022021_SBDP_3.4", "28_PH_22022021_IPS_3.4", "28_PH_22022021_IPA_3.7", "30_PH_24022021_MTK_3.5", "32_PH_25022021_IPS_3.4"];

    //let mapel = "PAI"

    let data = {};
    let pakefilter = banyakkd.filter(k => k.indexOf(mapel) > -1);
    data.namamapel = mapel;

    let ulanganke = [];
    for (i = 0; i < pakefilter.length; i++) {
        let mp = pakefilter[i].split("_")[0] + "_" + pakefilter[i].split("_")[1] + "_" + pakefilter[i].split("_")[2];
        if (ulanganke.indexOf(mp) == -1) {
            ulanganke.push(mp);
        }
    }

    let koleksi = {};
    for (j = 0; j < ulanganke.length; j++) {

        let arr = pakefilter.filter(k => k.indexOf(ulanganke[j]) > -1);

        koleksi[ulanganke[j]] = { "datakey": arr, "banyakkey": arr.length };//.map(k => k.split("_")[3] + "_" + k.split("_")[4]);

    }

    data.koleksiul = koleksi;

    return data
}
let pengenpengen = [];
const nilaimapelulhar = () => {
    let x = document.getElementById("selectnilaimapelulhar").selectedIndex;
    let y = document.getElementById("selectnilaimapelulhar").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);

    if (y[x].value == "") {
        alert("Silakan Pilih Mata Pelajaran");
        return
    }

    // let koleksiswa = koleksinamasiswaberdasarkanagama(y[x].value).map(k => k.pd_nama);
    let koleksiswa = koleksinamasiswaberdasarkanagama(y[x].value).map(k => k.pd_nama);
    let koleksitokensiswa = koleksinamasiswaberdasarkanagama(y[x].value).map(k => k.id);
    console.log(koleksiswa)
    console.log(koleksitokensiswa)
    datatabelnilaiulhar.innerHTML = "<hr/><i class='fa fa-refresh fa-spin w3-xxlarge'></i> Proses loading..."
    //alert("Fungsi baru")
    fetch(constlinknilai + "?action=lihatnilairekap&tab=PH&kelas=" + idNamaKelas)
        .then(m => m.json())
        .then(r => {
            // console.log(r);
            // pengenpengen = r.records;
            // let darikronologijson = kronologijson;
            let PH = fnkeyobjekmapel(y[x].value, r.banyakkd);

            let cPH = Object.keys(PH.koleksiul);
            let allcount = 0;
            let arrallcount = [];
            for (a = 0; a < cPH.length; a++) {
                // allcount = allcount + PH.koleksiul[cPH[k]].datakey.length
                allcount += PH.koleksiul[cPH[a]].datakey.length;
                arrallcount.push(PH.koleksiul[cPH[a]].datakey.length);
            }
            // console.log(allcount)
            // console.log(PH);
            // console.log(cPH.length);
            // console.log(cPH);


            let tekshtml = "";
            if (cPH.length > 0) {
                let tabel = document.createElement("table");
                tabel.setAttribute("class", "versi-table w3-small");
                tabel.setAttribute("id", "nilaiph_" + y[x].value);
                let thead = tabel.createTHead();
                let tr = thead.insertRow(0);
                let th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.innerHTML = "No.";
                tr.appendChild(th);
                th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                th.innerHTML = "Nama Siswa";
                tr.appendChild(th);


                th = document.createElement("th");
                th.setAttribute("colspan", allcount);// cPH.length);
                th.innerHTML = `Rekap Penilaian Harian<br/><sub>${y[x].text}</sub>`;
                tr.appendChild(th);

                tr = thead.insertRow(1);
                tr2 = thead.insertRow(2);
                for (i = 0; i < cPH.length; i++) {
                    let th = document.createElement("th");
                    th.setAttribute("colspan", arrallcount[i]);
                    th.innerHTML = inverstanggal(cPH[i].split("_")[2]) + `<button class="w3-blue w3-button" onclick="previewsoalnilairekap('${cPH[i].split("_")[0]}')"><i class="fa fa-eye"></i></button>`;
                    tr.appendChild(th);

                    for (c = 0; c < arrallcount[i]; c++) {
                        th2 = document.createElement("th");
                        th2.innerHTML = "KD " + PH.koleksiul[cPH[i]].datakey[c].split("_")[4];
                        tr2.appendChild(th2);
                    }
                }
                let trr = tabel.createTBody();
                for (j = 0; j < koleksiswa.length; j++) {
                    tr = trr.insertRow(-1);
                    let td = tr.insertCell(-1);
                    td.innerHTML = j + 1;
                    td = tr.insertCell(-1);
                    td.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                    td.innerHTML = koleksiswa[j];//.toUpperCase();
                    // let datanilai = r.records.filter(k => k.namasiswa == koleksiswa[j]);
                    let datanilai = r.records.filter(k => k.tokensiswa == koleksitokensiswa[j]);
                    console.log(datanilai);// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1))
                    for (k = 0; k < cPH.length; k++) {
                        for (d = 0; d < arrallcount[k]; d++) {
                            td = tr.insertCell(-1);
                            td.setAttribute("contenteditable", true);
                            let key = PH.koleksiul[cPH[k]].datakey[d];
                            let isikan = (datanilai.length > 0) ? datanilai[datanilai.length - 1][key].replace(".", ",") : "0,00";
                            //revisi
                            let isinilai =

                                td.innerHTML = isikan;// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1);//k.records.filter(k = k.)
                        }
                    }
                }

                datatabelnilaiulhar.innerHTML = `<hr/><button class="w3-button w3-dark-gray fa fa-print" onclick="printModalL('nilaiph_${y[x].value},DAFTAR NILAI HARIAN <br>MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()}, Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}, ${StringTanggal(new Date())}')"> Print</button>  <button class="w3-button w3-gray fa fa-file-excel-o" onclick="ExcelModalTabNilai('nilaiph_${y[x].value},DAFTAR NILAI HARIAN MATA PELAJARAN ${y[x].text.toUpperCase()},DAFTAR NILAI HARIAN MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()}, ${StringTanggal(new Date())}')"> Ms. Excel</button><hr/>`;
                datatabelnilaiulhar.appendChild(tabel)
            } else {

                let tabel = document.createElement("table");
                tabel.setAttribute("class", "versi-table w3-small");
                tabel.setAttribute("id", "nilaiph_" + y[x].value);
                let thead = tabel.createTHead();
                let tr = thead.insertRow(0);
                let th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.innerHTML = "No.";
                tr.appendChild(th);
                th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                th.innerHTML = "Nama Siswa";
                tr.appendChild(th);


                th = document.createElement("th");
                th.setAttribute("colspan", 2);// cPH.length);
                th.innerHTML = `Rekap Penilaian Harian<br/><sub>${y[x].text}</sub>`;
                tr.appendChild(th);

                tr = thead.insertRow(1);
                tr2 = thead.insertRow(2);
                for (i = 0; i < 2; i++) {
                    let th = document.createElement("th");
                    th.setAttribute("colspan", 1);
                    th.setAttribute("contenteditable", true);
                    th.innerHTML = "Ketik Tanggal";//inverstanggal(cPH[i].split("_")[2]) + `<br/><button class="w3-blue w3-button" onclick=" previewsoalnilairekap('${cPH[i].split("_")[0]}')"><i class="fa fa-eye"></i> Lihat Materi</button>`;
                    tr.appendChild(th);

                    for (c = 0; c < 1; c++) {
                        th2 = document.createElement("th");
                        th2.setAttribute("contenteditable", true)
                        th2.innerHTML = "KD ";//+ PH.koleksiul[cPH[i]].datakey[c].split("_")[4];
                        tr2.appendChild(th2);
                    }
                }
                let trr = tabel.createTBody();
                for (j = 0; j < koleksiswa.length; j++) {
                    tr = trr.insertRow(-1);
                    let td = tr.insertCell(-1);
                    td.innerHTML = j + 1;
                    td = tr.insertCell(-1);
                    td.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                    td.innerHTML = koleksiswa[j];//.toUpperCase();

                    // console.log(datanilai);// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1))
                    for (k = 0; k < 2; k++) {
                        for (d = 0; d < 1; d++) {
                            td = tr.insertCell(-1);
                            td.setAttribute("contenteditable", true);

                            let isikan = "tidak ada data"
                            td.innerHTML = isikan;// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1);//k.records.filter(k = k.)
                        }
                    }
                }

                //;datatabelnilaiulhar.innerHTML = `<hr/>`;
                datatabelnilaiulhar.innerHTML = `<hr/><button class="w3-button w3-dark-gray fa fa-print" onclick="printModalL('nilaiph_${y[x].value},DAFTAR NILAI HARIAN <br>MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()}, Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}, ${StringTanggal(new Date())}')"> Print</button>  <button class="w3-button w3-gray fa fa-file-excel-o" onclick="ExcelModalTabNilai('nilaiph_${y[x].value},DAFTAR NILAI HARIAN MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()},DAFTAR NILAI HARIAN MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()}, ${StringTanggal(new Date())}')"> Ms. Excel</button><hr/>`;
                datatabelnilaiulhar.appendChild(tabel)
                //datatabelnilaiulhar.innerHTML = `Tidak ada data`
            }

        })
        .catch(er => { alert(er); console.log(er) })
}
const nilaimapelpts = () => {
    let x = document.getElementById("selectnilaimapelpts").selectedIndex;
    let y = document.getElementById("selectnilaimapelpts").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);

    if (y[x].value == "") {
        alert("Silakan Pilih Mata Pelajaran");
        return
    }

    let koleksiswa = koleksinamasiswaberdasarkanagama(y[x].value).map(k => k.pd_nama);
    let koleksitokensiswa = koleksinamasiswaberdasarkanagama(y[x].value).map(k => k.id);
    datatabelnilaipts.innerHTML = "<hr/><i class='fa fa-refresh fa-spin w3-xxlarge'></i> Proses loading..."
    //alert("Fungsi baru")
    fetch(constlinknilai + "?action=lihatnilairekap&tab=PTS&kelas=" + idNamaKelas)
        .then(m => m.json())
        .then(r => {
            // console.log(r);
            // pengenpengen = r.records;
            // let darikronologijson = kronologijson;
            let PH = fnkeyobjekmapel(y[x].value, r.banyakkd);
            let cPH = Object.keys(PH.koleksiul);
            let allcount = 0;
            let arrallcount = [];
            for (a = 0; a < cPH.length; a++) {
                // allcount = allcount + PH.koleksiul[cPH[k]].datakey.length
                allcount += PH.koleksiul[cPH[a]].datakey.length;
                arrallcount.push(PH.koleksiul[cPH[a]].datakey.length);
            }
            // console.log(allcount)
            // console.log(PH);
            // console.log(cPH.length);
            // console.log(cPH);


            let tekshtml = "";
            if (cPH.length > 0) {
                let tabel = document.createElement("table");
                tabel.setAttribute("class", "versi-table w3-small");
                tabel.setAttribute("id", "nilaipts_" + y[x].value);
                let thead = tabel.createTHead();
                let tr = thead.insertRow(0);
                let th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.innerHTML = "No.";
                tr.appendChild(th);
                th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                th.innerHTML = "Nama Siswa";
                tr.appendChild(th);


                th = document.createElement("th");
                th.setAttribute("colspan", allcount);// cPH.length);
                th.innerHTML = `Rekap Penilaian Tengah Semester<br/><sub>${y[x].text}</sub>`;
                tr.appendChild(th);

                tr = thead.insertRow(1);
                tr2 = thead.insertRow(2);
                for (i = 0; i < cPH.length; i++) {
                    let th = document.createElement("th");
                    th.setAttribute("colspan", arrallcount[i]);
                    th.innerHTML = inverstanggal(cPH[i].split("_")[2]) + `<button class="w3-blue w3-button" onclick="previewsoalnilairekap('${cPH[i].split("_")[0]}')"><i class="fa fa-eye"></i></button>`;
                    tr.appendChild(th);

                    for (c = 0; c < arrallcount[i]; c++) {
                        th2 = document.createElement("th");
                        th2.innerHTML = "KD " + PH.koleksiul[cPH[i]].datakey[c].split("_")[4];
                        tr2.appendChild(th2);
                    }
                }
                let trr = tabel.createTBody();
                for (j = 0; j < koleksiswa.length; j++) {
                    tr = trr.insertRow(-1);
                    let td = tr.insertCell(-1);
                    td.innerHTML = j + 1;
                    td = tr.insertCell(-1);
                    td.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                    td.innerHTML = koleksiswa[j];//.toUpperCase();
                    // let datanilai = r.records.filter(k => k.namasiswa == koleksiswa[j]);
                    let datanilai = r.records.filter(k => k.tokensiswa == koleksitokensiswa[j]);
                    // console.log(datanilai);// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1))
                    for (k = 0; k < cPH.length; k++) {
                        for (d = 0; d < arrallcount[k]; d++) {
                            td = tr.insertCell(-1);
                            td.setAttribute("contenteditable", true);
                            let key = PH.koleksiul[cPH[k]].datakey[d];
                            let isikan = (datanilai.length > 0) ? datanilai[datanilai.length - 1][key].replace(".", ",") : "0,00";
                            td.innerHTML = isikan;// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1);//k.records.filter(k = k.)
                        }
                    }
                }

                datatabelnilaipts.innerHTML = `<hr/><button class="w3-button w3-dark-gray fa fa-print" onclick="printModalL('nilaipts_${y[x].value},DAFTAR NILAI PENILAIAN TENGAH SEMESTER <br>MATA PELAJARAN ${y[x].text.toUpperCase()}, Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}, ${StringTanggal(new Date())}')"> Print</button>  <button class="w3-button w3-gray fa fa-file-excel-o" onclick="ExcelModalTabNilai('nilaipts_${y[x].value},DAFTAR NILAI PENILAIAN TENGAH SEMESTER MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()},DAFTAR NILAI PENILAIAN TENGAH SEMESTER MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()}, ${StringTanggal(new Date())}')"> Ms. Excel</button><hr/>`;
                datatabelnilaipts.appendChild(tabel)
            } else {

                let tabel = document.createElement("table");
                tabel.setAttribute("class", "versi-table w3-small");
                tabel.setAttribute("id", "nilaipts_" + y[x].value);
                let thead = tabel.createTHead();
                let tr = thead.insertRow(0);
                let th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.innerHTML = "No.";
                tr.appendChild(th);
                th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                th.innerHTML = "Nama Siswa";
                tr.appendChild(th);


                th = document.createElement("th");
                th.setAttribute("colspan", 2);// cPH.length);
                th.innerHTML = `Rekap Penilaian Tengah Semester<br/><sub>${y[x].text}</sub>`;
                tr.appendChild(th);

                tr = thead.insertRow(1);
                tr2 = thead.insertRow(2);
                for (i = 0; i < 2; i++) {
                    let th = document.createElement("th");
                    th.setAttribute("colspan", 1);
                    th.setAttribute("contenteditable", true);
                    th.innerHTML = "Ketik Tanggal";//inverstanggal(cPH[i].split("_")[2]) + `<br/><button class="w3-blue w3-button" onclick=" previewsoalnilairekap('${cPH[i].split("_")[0]}')"><i class="fa fa-eye"></i> Lihat Materi</button>`;
                    tr.appendChild(th);

                    for (c = 0; c < 1; c++) {
                        th2 = document.createElement("th");
                        th2.setAttribute("contenteditable", true)
                        th2.innerHTML = "KD ";//+ PH.koleksiul[cPH[i]].datakey[c].split("_")[4];
                        tr2.appendChild(th2);
                    }
                }
                let trr = tabel.createTBody();
                for (j = 0; j < koleksiswa.length; j++) {
                    tr = trr.insertRow(-1);
                    let td = tr.insertCell(-1);
                    td.innerHTML = j + 1;
                    td = tr.insertCell(-1);
                    td.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                    td.innerHTML = koleksiswa[j];//.toUpperCase();

                    // console.log(datanilai);// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1))
                    for (k = 0; k < 2; k++) {
                        for (d = 0; d < 1; d++) {
                            td = tr.insertCell(-1);
                            td.setAttribute("contenteditable", true);

                            let isikan = "tidak ada data"
                            td.innerHTML = isikan;// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1);//k.records.filter(k = k.)
                        }
                    }
                }

                datatabelnilaipts.innerHTML = `<hr/><button class="w3-button w3-dark-gray fa fa-print" onclick="printModalL('nilaipts_${y[x].value},DAFTAR NILAI PENILAIAN TENGAH SEMESTER <br>MATA PELAJARAN ${y[x].text.toUpperCase()}, Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}, ${StringTanggal(new Date())}')"> Print</button>  <button class="w3-button w3-gray fa fa-file-excel-o" onclick="ExcelModalTabNilai('nilaipts_${y[x].value},DAFTAR NILAI PENILAIAN TENGAH SEMESTER MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()},DAFTAR NILAI PENILAIAN TENGAH SEMESTER MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()}, ${StringTanggal(new Date())}')"> Ms. Excel</button><hr/>`;
                datatabelnilaipts.appendChild(tabel)
                //datatabelnilaiulhar.innerHTML = `Tidak ada data`
            }

        })
        .catch(er => alert(er))
}
const nilaimapelpaspak = () => {
    let idpaspak = (idSemester == 2) ? "PAK" : "PAS";
    let x = document.getElementById("selectnilaimapelpaspak").selectedIndex;
    let y = document.getElementById("selectnilaimapelpaspak").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);

    if (y[x].value == "") {
        alert("Silakan Pilih Mata Pelajaran");
        return
    }

    let koleksiswa = koleksinamasiswaberdasarkanagama(y[x].value).map(k => k.pd_nama);
    let koleksitokensiswa = koleksinamasiswaberdasarkanagama(y[x].value).map(k => k.id);
    datatabelnilaipaspak.innerHTML = "<hr/><i class='fa fa-refresh fa-spin w3-xxlarge'></i> Proses loading..."
    //alert("Fungsi baru")
    fetch(constlinknilai + "?action=lihatnilairekap&tab=" + idpaspak + "&kelas=" + idNamaKelas)
        .then(m => m.json())
        .then(r => {
            // console.log(r);
            // pengenpengen = r.records;
            // let darikronologijson = kronologijson;
            let PH = fnkeyobjekmapel(y[x].value, r.banyakkd);
            let cPH = Object.keys(PH.koleksiul);
            let allcount = 0;
            let arrallcount = [];
            for (a = 0; a < cPH.length; a++) {
                // allcount = allcount + PH.koleksiul[cPH[k]].datakey.length
                allcount += PH.koleksiul[cPH[a]].datakey.length;
                arrallcount.push(PH.koleksiul[cPH[a]].datakey.length);
            }
            // console.log(allcount)
            // console.log(PH);
            // console.log(cPH.length);
            // console.log(cPH);



            if (cPH.length > 0) {
                let tabel = document.createElement("table");
                tabel.setAttribute("class", "versi-table w3-small");
                tabel.setAttribute("id", "nilaipaspak_" + y[x].value);
                let thead = tabel.createTHead();
                let tr = thead.insertRow(0);
                let th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.innerHTML = "No.";
                tr.appendChild(th);
                th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                th.innerHTML = "Nama Siswa";
                tr.appendChild(th);


                th = document.createElement("th");
                th.setAttribute("colspan", allcount);// cPH.length);
                th.innerHTML = `Rekap ${(idSemester == 2) ? 'Penilaian Akhir Kelas' : 'Penilaian Akhir Semester'}<br/><sub>${y[x].text}</sub>`;
                tr.appendChild(th);

                tr = thead.insertRow(1);
                tr2 = thead.insertRow(2);
                for (i = 0; i < cPH.length; i++) {
                    let th = document.createElement("th");
                    th.setAttribute("colspan", arrallcount[i]);
                    th.innerHTML = inverstanggal(cPH[i].split("_")[2]) + `<button class="w3-blue w3-button" onclick="previewsoalnilairekap('${cPH[i].split("_")[0]}')"><i class="fa fa-eye"></i></button>`;
                    tr.appendChild(th);

                    for (c = 0; c < arrallcount[i]; c++) {
                        th2 = document.createElement("th");
                        th2.innerHTML = "KD " + PH.koleksiul[cPH[i]].datakey[c].split("_")[4];
                        tr2.appendChild(th2);
                    }
                }
                let trr = tabel.createTBody();
                for (j = 0; j < koleksiswa.length; j++) {
                    tr = trr.insertRow(-1);
                    let td = tr.insertCell(-1);
                    td.innerHTML = j + 1;
                    td = tr.insertCell(-1);
                    td.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                    td.innerHTML = koleksiswa[j];//.toUpperCase();
                    // let datanilai = r.records.filter(k => k.namasiswa == koleksiswa[j]);
                    let datanilai = r.records.filter(k => k.tokensiswa == koleksitokensiswa[j]);
                    // console.log(datanilai);// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1))
                    for (k = 0; k < cPH.length; k++) {
                        for (d = 0; d < arrallcount[k]; d++) {
                            td = tr.insertCell(-1);
                            td.setAttribute("contenteditable", true);
                            let key = PH.koleksiul[cPH[k]].datakey[d];
                            let isikan = (datanilai.length > 0) ? datanilai[datanilai.length - 1][key].replace(".", ",") : "0,00";
                            td.innerHTML = isikan;// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1);//k.records.filter(k = k.)
                        }
                    }
                }

                datatabelnilaipaspak.innerHTML = `<hr/><button class="w3-button w3-dark-gray fa fa-print" onclick="printModalL('nilaipaspak_${y[x].value},DAFTAR NILAI ${(idSemester == 2) ? 'PENILAIAN AKHIR KELAS' : 'PENILAIAN AKHIR SEMESTER'} <br>MATA PELAJARAN ${y[x].text.toUpperCase()}, Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}, ${StringTanggal(new Date())}')"> Print</button>  <button class="w3-button w3-gray fa fa-file-excel-o" onclick="ExcelModalTabNilai('nilaipaspak_${y[x].value},DAFTAR NILAI ${(idSemester == 2) ? 'PENILAIAN AKHIR KELAS' : 'PENILAIAN AKHIR SEMESTER'} MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()},DAFTAR NILAI ${(idSemester == 2) ? 'PENILAIAN AKHIR KELAS' : 'PENILAIAN AKHIR SEMESTER'} MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()}, ${StringTanggal(new Date())}')"> Ms. Excel</button><hr/>`;
                datatabelnilaipaspak.appendChild(tabel)
            } else {

                let tabel = document.createElement("table");
                tabel.setAttribute("class", "versi-table w3-small");
                tabel.setAttribute("id", "nilaipaspak_" + y[x].value);
                let thead = tabel.createTHead();
                let tr = thead.insertRow(0);
                let th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.innerHTML = "No.";
                tr.appendChild(th);
                th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                th.innerHTML = "Nama Siswa";
                tr.appendChild(th);


                th = document.createElement("th");
                th.setAttribute("colspan", 2);// cPH.length);
                th.innerHTML = `Rekap ${(idSemester == 2) ? 'Penilaian Akhir Kelas' : 'Penilaian Akhir Semester'}<br/><sub>${y[x].text}</sub>`;
                tr.appendChild(th);

                tr = thead.insertRow(1);
                tr2 = thead.insertRow(2);
                for (i = 0; i < 2; i++) {
                    let th = document.createElement("th");
                    th.setAttribute("colspan", 1);
                    th.setAttribute("contenteditable", true);
                    th.innerHTML = "Ketik Tanggal";//inverstanggal(cPH[i].split("_")[2]) + `<br/><button class="w3-blue w3-button" onclick=" previewsoalnilairekap('${cPH[i].split("_")[0]}')"><i class="fa fa-eye"></i> Lihat Materi</button>`;
                    tr.appendChild(th);

                    for (c = 0; c < 1; c++) {
                        th2 = document.createElement("th");
                        th2.setAttribute("contenteditable", true)
                        th2.innerHTML = "KD ";//+ PH.koleksiul[cPH[i]].datakey[c].split("_")[4];
                        tr2.appendChild(th2);
                    }
                }
                let trr = tabel.createTBody();
                for (j = 0; j < koleksiswa.length; j++) {
                    tr = trr.insertRow(-1);
                    let td = tr.insertCell(-1);
                    td.innerHTML = j + 1;
                    td = tr.insertCell(-1);
                    td.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                    td.innerHTML = koleksiswa[j];//.toUpperCase();

                    // console.log(datanilai);// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1))
                    for (k = 0; k < 2; k++) {
                        for (d = 0; d < 1; d++) {
                            td = tr.insertCell(-1);
                            td.setAttribute("contenteditable", true);

                            let isikan = "tidak ada data"
                            td.innerHTML = isikan;// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1);//k.records.filter(k = k.)
                        }
                    }
                }

                datatabelnilaipaspak.innerHTML = `<hr/><button class="w3-button w3-dark-gray fa fa-print" onclick="printModalL('nilaipaspak_${y[x].value},DAFTAR NILAI ${(idSemester == 2) ? 'PENILAIAN AKHIR KELAS' : 'PENILAIAN AKHIR SEMESTER'} <br>MATA PELAJARAN ${y[x].text.toUpperCase()}, Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}, ${StringTanggal(new Date())}')"> Print</button>  <button class="w3-button w3-gray fa fa-file-excel-o" onclick="ExcelModalTabNilai('nilaipaspak_${y[x].value},DAFTAR NILAI ${(idSemester == 2) ? 'PENILAIAN AKHIR KELAS' : 'PENILAIAN AKHIR SEMESTER'} MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()},DAFTAR NILAI ${(idSemester == 2) ? 'PENILAIAN AKHIR KELAS' : 'PENILAIAN AKHIR SEMESTER'} MATA PELAJARAN ${y[x].text.replace(/\,/g, " ").toUpperCase()}, ${StringTanggal(new Date())}')"> Ms. Excel</button><hr/>`;
                datatabelnilaipaspak.appendChild(tabel)
                //datatabelnilaiulhar.innerHTML = `Tidak ada data`
            }

        })
        .catch(er => alert(er))
}

const inverstanggal = (par) => {
    //let par = "22022021";
    let tgl = parseInt(par.slice(0, 2));
    let bln = parseInt(deleteZero(par.slice(2, 4)));
    let thn = parseInt(par.slice(4, 8));
    let s = tanggalfull(thn + "-" + bln + "-" + tgl);
    return s
}

const prpw = (par) => {
    alert(par)
}
const previewsoalnilairekap = (par) => {
    if (kronologijson.length == 0) {
        alert("Anda harus melihat data Pembelajaran Anda terlebih dahulu untuk melihat preview konten materi ini.")
        return
    }
    pranalamateri.style.display = "block";
    document.querySelector(".classReviewMateri").innerHTML = "";
    let tes = document.querySelector(".classReviewMateri");
    //let keyy = "kbmtoday" + tglStringZero()

    //let datamateri = JSON.parse(localStorage.getItem(keyy))
    let datamateri = kronologijson.filter(k => k.idbaris == par)[0];


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
    td.innerHTML = datamateri.idSekolah
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
    td.innerHTML = datamateri.idmapel;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Frekuensi Akses"
    var td = tr.insertCell(-1);
    var keteranganakses;
    if (datamateri.idaksessiswa == "sekali") {
        keteranganakses = "TEST <br>Sekali saja sejak mengirim nilai"
    } else {
        keteranganakses = "LATIHAN <br>Berapa kali saja untuk latihan"
    }
    td.innerHTML = keteranganakses;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Tanggal Publikasi"
    var td = tr.insertCell(-1);
    td.innerHTML = tanggalfulllengkap(datamateri.idtgl);

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
    cdtimer.setAttribute("value", datamateri.iddurasi);
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

    var idm = encodeURIComponent(datamateri.idmateri);
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

const koleksinamasiswaberdasarkanagama = (idmapel) => {
    let namanamasiswa = [];
    if (idmapel == "PAI") {
        namanamasiswa = jsondatasiswa.filter(f => f.pd_agama == "ISLAM");//.map(k => k.pd_nama);

    }
    if (idmapel == "PKRIS") {
        namanamasiswa = jsondatasiswa.filter(f => f.pd_agama == "KRISTEN");//.map(k => k.pd_nama);

    }
    if (idmapel == "PKATO") {
        namanamasiswa = jsondatasiswa.filter(f => f.pd_agama == "KATHOLIK");//.map(k => k.pd_nama);

    }
    if (idmapel == "PBUDH") {
        namanamasiswa = jsondatasiswa.filter(f => f.pd_agama == "BUDHA");//.map(k => k.pd_nama);

    }
    if (idmapel == "PHIND") {
        namanamasiswa = jsondatasiswa.filter(f => f.pd_agama == "HINDU");//.map(k => k.pd_nama);

    }
    if (idmapel == "PKONG") {
        namanamasiswa = jsondatasiswa.filter(f => f.pd_agama == "KONGHUCU");//.map(k => k.pd_nama);

    }
    if (idmapel !== "PAI" && idmapel !== "PKRIS" && idmapel !== "PKATO" && idmapel !== "PBUDH" && idmapel !== "PHIND" && idmapel !== "PKONG") {
        namanamasiswa = jsondatasiswa;//.map(k => k.pd_nama);

    }

    return namanamasiswa

}

const ExcelModalTabNilai = (xx) => {
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
        preserveColors: true,
        jumlahheader: 4
    });
    datasiswadiv.innerHTML = "";
}

let dataapipts = {};
async function raportkelas() {
    let cekkurikulum = document.getElementById("ttttt");
    if (cekkurikulum == null) {
        alert("Untuk melihat data Raport, silakan periksa KKM terlebih dahulu untuk menggenerate identitas Raport Anda.");
        return
    }
    tampilinsublamangurukelas("raport");
    let tab = document.querySelector(".tabpetunjukraport");
    tab.click();

    // let htmlopsi = "<option value='' selected>Silakan Pilih Nama Siswa Anda</option>";
    // for (i = 0; i < jsondatasiswa.length; i++) {
    //     htmlopsi += `<option value="${i}" id='opsisiswapts_${i}'>${jsondatasiswa[i].pd_nama}</option>`
    // }
    // namasiswaraportpts.innerHTML = htmlopsi;

    // await fetch(constlinknilai + "?action=lihatnilairekap&tab=PTS&kelas=" + idNamaKelas)
    //     .then(m => m.json())
    //     .then(r => {
    //         dataapipts = r;
    //         //  console.log(r)
    //     })
    let datakkm = koleksiarraymapelaktif();
    document.querySelector(".kkmsatuanpendidikan").innerHTML = datakkm.kkmmin;
    document.querySelectorAll(".a_kkm").forEach(k => k.innerHTML = datakkm.kkmmin);
    document.getElementById("a_rentangkkm").innerHTML = Math.round((100 - datakkm.kkmmin) / 3);

}

const raportbayanganpilih = () => {
    // pastikan dataapipts sudah diload;
    //console.log(dataapipts)
    if (dataapipts.records == "undefined") {
        alert("Data belum siap. Silakan coba lagi");
        return
    }

    //user memilih:
    let x = document.getElementById("namasiswaraportpts").selectedIndex;
    let y = document.getElementById("namasiswaraportpts").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);
    //elemen raport:
    let divraport = document.getElementById("tampilanraportpts");
    let el = "";
    if (y[x].value == "") {
        alert("Silakan Pilih Mata siswa Anda");
        divraport.innerHTML = "Pilih Siswa Anda"
        return
    }
    let indek = parseInt(y[x].value);
    //1st kop
    el = `<div class="w3-card-4 ">
    <div class="w3-container">
        <div class="w3-left w3-padding">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Lambang_Kota_Depok.png/371px-Lambang_Kota_Depok.png" style="width:100px"/>
        </div>
        <div class="w3-center w3-bottombar  w3-border-black">
        <h4>PEMERINTAH DAERAH KOTA ${jlo.kota.toUpperCase()}<br/>
        DINAS PENDIDIKAN<br/>
        <b  class="w3-xxlarge">${idNamaSekolah.toUpperCase()}</b></br/>
        <sub>Alamat : ${editalamatkopsurat.innerHTML}</sub></h4>
        </div>
    </div>    
    
    <div class="w3-main w3-padding">
    <h5 class="w3-center">LAPORAN HASIL PENILAIAN TENGAH SEMESTER ${idSemester}<br/>
    TAHUN PELAJARAN ${idTeksTapel}</h5>
    <div class="w3-left">
        <table class="w3-table-all w3-small">
        <tr>
            <td>Nama Siswa</td>
            <td>:</td>
            <td>${y[x].text}</td>
        </tr>
        <tr>
            <td>No. Induk Sekolah</td>
            <td>:</td>
            <td>${jsondatasiswa[indek].nis}</td>
        </tr>
        <tr>
            <td>Nama Sekolah</td>
            <td>:</td>
            <td>${idNamaSekolah}</td>
        </tr>
        </table><br/>
    </div>
    
    <div class="w3-right">
    <table class="w3-table-all w3-small">
    <tr>
        <td>Kelas</td>
        <td>:</td>
        <td>${idNamaKelas}</td>
    </tr>
    <tr>
        <td>Semester</td>
        <td>:</td>
        <td>${idSemester}</td>
    </tr>
    <tr>
        <td>Tahun Pelajaran</td>
        <td>:</td>
        <td>${idTeksTapel}</td>
    </tr>
    </table>
    </div>
    <div class="w3-container w3-main">
    <table class="w3-table-all"><tr><td>
    Alamat: ${editalamatkopsurat.innerHTML}
    </td></tr></table>
    </div>
    <br/><center style="overflow-x:auto">
    <table class="versi-table ">
    <thead>
        <tr>
            <th>No. </th>
            <th>Mata Pelajaran</th>
            <th>KKM</th>
            <th>Nilai</th>
            <th>Ketuntasan</th>
        </tr>
    </thead>
    <tbody>
  

    `;
    //agamasiswa
    let arrayagama = ["ISLAM", "KRISTEN", "KATHOLIK", "HINDU", "BUDHA", "KHONGHUCU"];
    let arraykodeagama = ["PAI", "PKRIS", "PKATO", "PHIND", "PBUDH", "PKONG"];

    let agamasiswa = jsondatasiswa[indek].pd_agama;
    let cariindek = arrayagama.indexOf(agamasiswa);
    let idkkmagama, angkakkmagama, namamapelagama;
    let angkakkmmapel, namamapel;
    let arraynilai = [];
    let count;

    if (cariindek == -1) {
        el += `
        <tr>
        <td>1</td>
        <td>Agama Ananda tidak terdeteksi</td>
        <td>Agama Ananda tidak terdeteksi</td>
        <td>Agama Ananda tidak terdeteksi</td>
        <td>Agama Ananda tidak terdeteksi</td>
        </tr>
        `;

    } else {

        idkkmagama = "angkakkm_" + arraykodeagama[cariindek];
        //console.log(arraykodeagama[cariindek]);
        angkakkmagama = (document.getElementById(idkkmagama) == null) ? 0 : document.getElementById(idkkmagama).innerHTML;
        namamapelagama = (document.getElementById("namamapelraport_" + arraykodeagama[cariindek]) == null) ? "Gagal Meloading" : document.getElementById("namamapelraport_" + arraykodeagama[cariindek]).innerHTML;
        el += `
        <tr>
        <td>1</td>
        <td>${namamapelagama}</td>
        <td>${angkakkmagama}</td>
        <td contenteditable="true">${nilaidaridataapi(y[x].text, arraykodeagama[cariindek], angkakkmagama).nilai}</td>
        <td contenteditable="true">${nilaidaridataapi(y[x].text, arraykodeagama[cariindek], angkakkmagama).ketuntasan}</td>
        
        </tr>
        `;
        count = nilaidaridataapi(y[x].text, arraykodeagama[cariindek], angkakkmagama).nilai;

        arraynilai.push(count)

    }
    //pkn
    namamapel = document.getElementById("namamapelraport_PKN").innerHTML
    angkakkmmapel = document.getElementById("angkakkm_PKN").innerHTML
    el += `
        <tr>
        <td>2</td>
        <td>${namamapel}</td>
        <td>${angkakkmmapel}</td>
        <td contenteditable="true">${nilaidaridataapi(y[x].text, "PKN", angkakkmmapel).nilai}</td>
        <td contenteditable="true">${nilaidaridataapi(y[x].text, "PKN", angkakkmmapel).ketuntasan}</td>
        </tr>
        `;
    count = nilaidaridataapi(y[x].text, "PKN", angkakkmmapel).nilai;

    arraynilai.push(count)


    //Bindo
    namamapel = document.getElementById("namamapelraport_BINDO").innerHTML
    angkakkmmapel = document.getElementById("angkakkm_BINDO").innerHTML
    el += `
        <tr>
        <td>3</td>
        <td>${namamapel}</td>
        <td>${angkakkmmapel}</td>
        <td contenteditable="true">${nilaidaridataapi(y[x].text, "BINDO", angkakkmmapel).nilai}</td>
        <td contenteditable="true">${nilaidaridataapi(y[x].text, "BINDO", angkakkmmapel).ketuntasan}</td>
        </tr>
        `;
    count = nilaidaridataapi(y[x].text, "BINDO", angkakkmmapel).nilai;

    arraynilai.push(count)

    //MTK
    namamapel = document.getElementById("namamapelraport_MTK").innerHTML
    angkakkmmapel = document.getElementById("angkakkm_MTK").innerHTML
    el += `
        <tr>
        <td>4</td>
        <td>${namamapel}</td>
        <td>${angkakkmmapel}</td>
        <td contenteditable="true">${nilaidaridataapi(y[x].text, "MTK", angkakkmmapel).nilai}</td>
        <td contenteditable="true">${nilaidaridataapi(y[x].text, "MTK", angkakkmmapel).ketuntasan}</td>
        </tr>
        `;
    count = nilaidaridataapi(y[x].text, "MTK", angkakkmmapel).nilai;

    arraynilai.push(count)

    // UNTUK IPA DAN IPS HANYA ADA DI KELAS SELAIN KELAS 1, 2, 3
    if (idJenjang > 3) {
        //ipa
        namamapel = document.getElementById("namamapelraport_IPA").innerHTML
        angkakkmmapel = document.getElementById("angkakkm_IPA").innerHTML
        el += `
            <tr>
            <td>5</td>
            <td>${namamapel}</td>
            <td>${angkakkmmapel}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "IPA", angkakkmmapel).nilai}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "IPA", angkakkmmapel).ketuntasan}</td>
            </tr>
            `;
        count = nilaidaridataapi(y[x].text, "IPA", angkakkmmapel).nilai;

        arraynilai.push(count)

        //ipS
        namamapel = document.getElementById("namamapelraport_IPS").innerHTML
        angkakkmmapel = document.getElementById("angkakkm_IPS").innerHTML
        el += `
            <tr>
            <td>6</td>
            <td>${namamapel}</td>
            <td>${angkakkmmapel}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "IPS", angkakkmmapel).nilai}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "IPS", angkakkmmapel).ketuntasan}</td>
            </tr>
            `;
        count = nilaidaridataapi(y[x].text, "IPS", angkakkmmapel).nilai;

        arraynilai.push(count)

        //SBDP
        namamapel = document.getElementById("namamapelraport_SBDP").innerHTML
        angkakkmmapel = document.getElementById("angkakkm_SBDP").innerHTML
        el += `
            <tr>
            <td>7</td>
            <td>${namamapel}</td>
            <td>${angkakkmmapel}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "SBDP", angkakkmmapel).nilai}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "SBDP", angkakkmmapel).ketuntasan}</td>
            </tr>
            `;
        count = nilaidaridataapi(y[x].text, "SBDP", angkakkmmapel).nilai;

        arraynilai.push(count)

        //PJOK
        namamapel = document.getElementById("namamapelraport_PJOK").innerHTML
        angkakkmmapel = document.getElementById("angkakkm_PJOK").innerHTML
        el += `
            <tr>
            <td>8</td>
            <td>${namamapel}</td>
            <td>${angkakkmmapel}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "PJOK", angkakkmmapel).nilai}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "PJOK", angkakkmmapel).ketuntasan}</td>
            </tr>
            <tr>
            <td>9</td>
            <td colspan="4">Muatan Lokal</td>
            </tr>
            `;
        count = nilaidaridataapi(y[x].text, "PJOK", angkakkmmapel).nilai;

        arraynilai.push(count)

        //BSUND
        namamapel = document.getElementById("namamapelraport_BSUND").innerHTML
        angkakkmmapel = document.getElementById("angkakkm_BSUND").innerHTML
        el += `
            <tr>
            <td></td>
            <td>a. ${namamapel}</td>
            <td>${angkakkmmapel}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "BSUND", angkakkmmapel).nilai}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "BSUND", angkakkmmapel).ketuntasan}</td>
            </tr>
            
            `;
        count = nilaidaridataapi(y[x].text, "BSUND", angkakkmmapel).nilai;

        arraynilai.push(count)

    } else {

        //SBDP
        namamapel = document.getElementById("namamapelraport_SBDP").innerHTML
        angkakkmmapel = document.getElementById("angkakkm_SBDP").innerHTML
        el += `
            <tr>
            <td>5</td>
            <td>${namamapel}</td>
            <td>${angkakkmmapel}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "SBDP", angkakkmmapel).nilai}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "SBDP", angkakkmmapel).ketuntasan}</td>
            </tr>
            `;
        count = nilaidaridataapi(y[x].text, "SBDP", angkakkmmapel).nilai;

        arraynilai.push(count)

        //PJOK
        namamapel = document.getElementById("namamapelraport_PJOK").innerHTML
        angkakkmmapel = document.getElementById("angkakkm_PJOK").innerHTML
        el += `
            <tr>
            <td>6</td>
            <td>${namamapel}</td>
            <td>${angkakkmmapel}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "PJOK", angkakkmmapel).nilai}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "PJOK", angkakkmmapel).ketuntasan}</td>
            </tr>
            <tr>
            <td>7</td>
            <td colspan="4">Muatan Lokal</td>
            </tr>
            `;
        count = nilaidaridataapi(y[x].text, "PJOK", angkakkmmapel).nilai;

        arraynilai.push(count)

        //BSUND
        namamapel = document.getElementById("namamapelraport_BSUND").innerHTML
        angkakkmmapel = document.getElementById("angkakkm_BSUND").innerHTML
        el += `
            <tr>
            <td></td>
            <td>a. ${namamapel}</td>
            <td>${angkakkmmapel}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "BSUND", angkakkmmapel).nilai}</td>
            <td contenteditable="true">${nilaidaridataapi(y[x].text, "BSUND", angkakkmmapel).ketuntasan}</td>
            </tr>
            
            `;
        count = nilaidaridataapi(y[x].text, "BSUND", angkakkmmapel).nilai;

        arraynilai.push(count)
    }

    // console.log(arraynilai);
    let er = arraynilai.filter(k => !(k == "" || k == "-" || k == "Belum Dilaksanakan" || k == "Gagal Loading"))
    //console.log(er)

    let jumlah
    if (er.length == 0) {
        jumlah = 0
    } else {
        jumlah = arraynilai.filter(k => !(k == "" || k == "-" || k == "Belum Dilaksanakan" || k == "Gagal Loading")).map(d => parseFloat(d)).reduce((a, b) => a + b);

    }
    //console.log(jumlah)

    el += `</tbody></table></center>
    <br/>
   <h4> Jumlah Nilai ( <em><b contenteditable="true">${jumlah}</b></em> )<br/>
   Rata-rata nilai ( <span  contenteditable="true">${(jumlah / arraynilai.length).toFixed(2)} </span> )
    </h4>
    <div class="w3-main w3-container">
  <div class="w3-left w3-container">
  <br/>
    Orang Tua/Wali
    <br/>
    <br/>
    <br/>
    <br/>
    -----------------------
    <br/>
    <br/>
    <br/>
  </div>
  <div class="w3-left w3-container">
  Mengetahui,<br/>  
  Kepala ${idNamaSekolah}
  <br/>
  <div id='barcodeptskepsek'></div>
  <b><u>${idNamaKepsek}</u></b><br/>
  NIP. ${idNipKepsek}
  <br/>
  <br/>
  <br/>
  </div>
  <div class="w3-right w3-container">
  ${jlo.kota}, <span  contenteditable="true"> ${tanggalfull(new Date())}</span><br/>
  ${idJenisGuru} ${idNamaKelas}
  <br/>
  <div id='barcodeptsguru'></div>
    <b><u>${namauser}</u></b><br/>
   NIP. ${idNipGuruKelas}
   <br/>
   <br/>
   <br/>

</div>


    `;
    //end el
    el += `


    </div></div>
    
    `
    divraport.innerHTML = el;

    //console.log(dataapipts);
    let datanama = y[x].text;
    let teksbarkode = "Data Raport PTS ini telah diketahui dan ditandatangani oleh Kepala " + idNamaSekolah + " untuk siswa atas nama " + datanama;//document.getElementById("text");
    let teksbarkode2 = "Data Raport PTS ini telah  ditandatangani oleh Guru Kelas " + idNamaKelas + " untuk siswa atas nama " + datanama;//document.getElementById("text");
    barcodekan('barcodeptskepsek', teksbarkode);
    barcodekan('barcodeptsguru', teksbarkode2);




}


const barcodekan = (el, teks) => {

    var qrcode = new QRCode(document.getElementById(el), {
        width: 100,
        height: 100
    });
    //    let teks = "Data Raport PTS ini telah diketahui dan ditandatangani oleh Kepala " + idNamaSekolah + " untuk siswa atas nama " + datanama;//document.getElementById("text");
    //  
    qrcode.clear();
    qrcode.makeCode(teks);

    // $("#text").
    //     on("blur", function () {
    //         makeCode();
    //     }).
    //     on("keydown", function (e) {
    //         if (e.keyCode == 13) {
    //             makeCode();
    //         }
    //     });

}
//  function makeCode(elText) {
//         //var elText = "Data Raport PTS ini telah diketahui dan ditandatangani oleh Kepala " + idNamaSekolah + " untuk siswa atas nama " + datanama;//document.getElementById("text");

//         // if (!elText.value) {
//         //     alert("Input a text");
//         //     elText.focus();
//         //     return;
//         // }

//         qrcode.makeCode(elText);
//     }

const nilaidaridataapi = (namasiswa, mapel, kkm) => {
    let data = {};
    // console.log(dataapipts.records)
    if (dataapipts.records === undefined) {
        data.nilai = "Gagal Loading";
        data.ketuntasan = "<b class='w3-text-red'>Gagal Loading</b>";

    } else {
        let kosong = dataapipts.records.filter(k => k.namasiswa == namasiswa);//.length;
        // console.log(kosong)

        if (kosong.length == 0) {
            data.nilai = "-";//"Tidak ada data";
            data.ketuntasan = "<b class='w3-text-red'>Tidak Tuntas</b>";
        } else {


            let d = dataapipts.records.filter(k => k.namasiswa == namasiswa)[0];

            let f = Object.keys(d).filter(k => k.indexOf(mapel) > -1);//.length;
            // console.log(f);
            if (f.length == 0) {
                data.nilai = "Belum Dilaksanakan";
                data.ketuntasan = "<b class='w3-text-yellow'>Menunggu Pelaksanaan</b>";
            } else {
                let l = Object.keys(d).filter(k => k.indexOf(mapel) > -1).map(j => (d[j] == "") ? 0 : parseInt(d[j])).reduce((a, b) => a + b);
                let nilai = (l / f.length).toFixed(0);
                if (nilai == "NaN") {
                    data.nilai = "-";
                    data.ketuntasan = "<b class='w3-text-red'>Tidak Tuntas</b>";
                } else {
                    data.nilai = nilai;
                    data.ketuntasan = (parseInt(nilai) >= parseInt(kkm)) ? "<b class='w3-text-blue'>Tuntas</b>" : "<b class='w3-text-red'>Tidak Tuntas</b>";



                }
            }
        }
    }
    return data

}

const printraportpts = () => {
    let isibody = document.getElementById("tampilanraportpts").innerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO DATA RAPORT PTS</title>`;
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

    body.innerHTML = `${isibody}`


    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}

const publikasikanraportpts = () => {
    //    alert("publikasikanraportpts()");
    let btn = document.querySelector(".tombolpublikasiraportpts");
    btn.innerHTML = "<i class='fa fa-spin fa-spinner'></i> Proses Publikasi";
    let divraportpts = document.getElementById("tampilanraportpts");
    let op = document.getElementById("namasiswaraportpts").options;
    let indop = document.getElementById("namasiswaraportpts").selectedIndex;
    let namarpts = op[indop].text;
    if (divraportpts.innerHTML == "") {
        alert("Raport Belum siap dipublikasikan");
        btn.innerHTML = "<i class='fa fa-save'></i> Publikasikan";
    } else {
        let confr = confirm("Anda yakin ingin mempublikasikan raport ini kepada siswa yang bersangkutan? Anda masih bisa mengedit nilai dari tampilan raport tersebut. Data yang berhasil dipublikasikan akan muncul di tabel Publikasikan Raport PTS\n\n Klik [OK] untuk melanjutkan.\n\n Klik [NO] untuk membatalkan.");
        if (confr) {
            let tekhtml = divraportpts.innerHTML;
            let dtext = document.getElementById("tempattextarea");
            dtext.textContent = tekhtml.replace(/contenteditable=\"true\"/gi, "");
            let htmlraport = window.btoa(unescape(encodeURIComponent(dtext.textContent)));
            let data = new FormData();
            data.append("kelas", idNamaKelas);
            data.append("namasiswa", namarpts);
            data.append("htmlraport", htmlraport);
            fetch(constlinknilai + "?action=publikasiraportpts", {
                method: "post",
                body: data
            }).then(m => m.json())
                .then(r => {
                    alert(r.result + "Publikasi");
                    btn.innerHTML = "<i class='fa fa-save'></i> Publikasikan";
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

const gspublikasikan = () => {

}

const cekpublikasiraportpts = () => {
    //alert("cekpublikasiraportpts()");
    let bt = document.querySelector(".tombolcekpublikasiraportpts");
    bt.innerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    let div = document.querySelector(".kesiapanrapotpts");
    let tekshtml = `<h4>Data Publikasi Raport PTS</h4><table class="versi-table w3-small" id="tabelcekpublikasi">
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

    fetch(constlinknilai + "?action=cekpublikasiraportpts&kelas=" + idNamaKelas)
        .then(m => m.json())
        .then(r => {
            //console.log(r);
            bt.innerHTML = "Cek Publikasi";
            let cekdata = r.result;

            if (cekdata == 0) {
                div.innerHTML = "<h4>Maaf, Anda belum pernah mempublikasikan Raport PTS</h4>";
            } else {
                let data = r.data;
                let datanama, dataid, dataaksi,
                    indektabel, idtabel = document.getElementById("tabelcekpublikasi").getElementsByTagName("tbody")[0];
                for (j = 0; j < data.length; j++) {
                    datanama = data[j].namasiswa;
                    dataid = data[j].raportpts;
                    dataaksi = data[j].ptspublikasi;
                    indektabel = jsondatasiswa.map(s => s.pd_nama).indexOf(datanama);

                    if (indektabel > -1) {
                        idtabel.rows[indektabel].cells[2].innerHTML = `<button onclick="previewraportpts('${dataid}')" title="Lihat")><i class="fa fa-eye"></i> Lihat</button>`;
                        idtabel.rows[indektabel].cells[3].innerHTML = (dataaksi == "show") ? `<b class="w3-text-green">&checkmark;</b>` : `<b class="w3-text-red">&times;</b>`;
                        idtabel.rows[indektabel].cells[4].innerHTML = (dataaksi == "show") ? `<button onclick="sembunyikanraportpts('${datanama}')" title="Hapus")><i class="fa fa-trash"></i> Hapus</button>` : `<button onclick="tampilkanraportpts('${datanama}')" title="Kembalikan")><i class="fa fa-refresh"></i> </button>`;
                    }



                }




            }

        })
        .catch(er => console.log(er))
    //console.log

}

const previewraportpts = (id) => {
    pranalamateri.style.display = "block";
    document.querySelector(".classReviewMateri").innerHTML = "";
    let tes = document.querySelector(".classReviewMateri");
    tes.innerHTML = "<i class='fa fa-spin fa-spinner'></i>"
    let tekshtml = "<h5>Data Raport PTS di e-Lamaso Siswa</h5>"
    $('.classReviewMateri').nextAll('button').remove();
    fetch(linkmateri + "&idmateri=" + id + "&action=previewriwayat")
        .then(m => m.json())
        .then(r => {
            tekshtml += `${r}<hr/>
        <center>
        <button onclick="alert('Siswa Mencetak raport ini')"><i class="fa fa-print"></i> Cetak</button>
        </center><hr/>
        `;
            tes.innerHTML = tekshtml;
        }).catch(er => {
            tekshtml += "Maaf terjadi kesalahan dengan kode: " + er;
            tes.innerHTML = tekshtml;
        })

}

const sembunyikanraportpts = (namasiswa) => {
    fetch(constlinknilai + "?action=showhideraportpts&kelas=" + idNamaKelas + "&namasiswa=" + namasiswa + "&aksi=hide")
        .then(m => m.json())
        .then(k => {
            alert(k.result);
            cekpublikasiraportpts();
        })
        .catch(er => alert(er))
}

const tampilkanraportpts = (namasiswa) => {
    fetch(constlinknilai + "?action=showhideraportpts&kelas=" + idNamaKelas + "&namasiswa=" + namasiswa + "&aksi=show")
        .then(m => m.json())
        .then(k => {
            alert(k.result);
            cekpublikasiraportpts();
        })
        .catch(er => alert(er))
}



