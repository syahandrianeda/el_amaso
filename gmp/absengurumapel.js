async function absensisiswa() {
    loadingtopbarin("loadingtopbar");
    if (jsondatasiswa.length == 0) {
        alert("Anda Belum Memilih Kelas.");
        return;
    } else {
        await createtableabsenhariini(); //fungsi untuk membuat tabel REKAP ABSEN dalam hari ini

    }
    tampilinsublamangurukelas("absen");
    absenhariini.style.display = "block";
    clearInterval(stoploadingtopbar);
    divlod = document.querySelector(".loadingtopbar");
    divlod.style.width = "100%";
    setTimeout(() => {
        divlod.style.width = "1px"
        divlod.className += " w3-hide";

    }, 3000);
}

async function createtableabsenhariini() {
    var tgl = new Date();
    var tglabsen = tgl.getDate();
    var blnabsenx = tgl.getMonth() + 1;
    var blnabsen = addZero(blnabsenx);

    var thnabsen = tgl.getFullYear();
    let idok = tglabsen + "" + blnabsen + "" + thnabsen;

    var tabel = document.createElement("table");
    tabel.setAttribute("class", "versi-table");
    tabel.setAttribute("id", "tabelloadinghariini")
    var tr = tabel.insertRow(0);
    var thno = document.createElement("th");
    thno.innerHTML = "No.";
    tr.appendChild(thno);
    var thnama = document.createElement("th");
    thnama.innerHTML = "Nama";
    tr.appendChild(thnama);
    var thkehadiran = document.createElement("th");
    thkehadiran.innerHTML = "Kehadiran";
    tr.appendChild(thkehadiran);

    var thaksi = document.createElement("th");
    thaksi.innerHTML = "Aksi";
    tr.appendChild(thaksi);

    for (var i = 0; i < jsondatasiswa.length; i++) {
        var trs = tabel.insertRow(-1);
        var selno = trs.insertCell(-1);
        selno.innerHTML = (i * 1) + 1;
        var selnama = trs.insertCell(-1);
        selnama.innerHTML = jsondatasiswa[i].pd_nama;
        var selkehadiran = trs.insertCell(-1);
        selkehadiran.setAttribute("style", "vertical-align:center;text-align:center");
        selkehadiran.innerHTML = "<i class='fa fa-spin fa-spinner'></i> Loading ...";
        var selaksi = trs.insertCell(-1);

        var tombolwa = document.createElement("button");
        tombolwa.setAttribute("onclick", "kirimwauntukabsen('wa" + "_" + jsondatasiswa[i].id + "')");
        tombolwa.innerHTML = "<i class='fa fa-whatsapp'></i> Siswa";
        selaksi.appendChild(tombolwa);

        var pisahin = document.createElement("br");
        selaksi.appendChild(pisahin);
        var tombolbantusiswa = document.createElement("button");
        tombolbantusiswa.setAttribute("onclick", "bantuabsen('" + encodeURIComponent(jsondatasiswa[i].pd_nama) + "_" + idok + "')");
        tombolbantusiswa.innerHTML = "<i class='fa fa-child'></i> Bantu";
        selaksi.appendChild(tombolbantusiswa);
    }
    tabelabsenhariini.innerHTML = "";
    tabelabsenhariini.appendChild(tabel);

    var tglcari = new Date()
    var thn = tglcari.getFullYear();
    var bln = tglcari.getMonth();
    var tgl = tglcari.getDate();

    spinspin.innerHTML = "<i class='fa fa-spin fa-spinner'></i> Loading ...";

    var jsonabsenkelasperbulan = [];
    let kelas = ruangankelas;

    if (localStorage.hasOwnProperty('absenHariIni_' + encodeURIComponent(ruangankelas))) {
        jsonabsenkelasperbulan = JSON.parse(localStorage.getItem('absenHariIni_' + encodeURIComponent(ruangankelas)));//.absenhariini;
    } else {
        jsonabsenkelasperbulan = await fecjsonabsen();
        localStorage.setItem('absenHariIni_' + ruangankelas, JSON.stringify(jsonabsenkelasperbulan));

        setTimeout(function () {
            localStorage.removeItem('absenHariIni_' + encodeURIComponent(ruangankelas))
        }, 60000);
    }

    spinspin.innerHTML = "";

    var datatabel = tabelloadinghariini;
    for (var u = 0; u < datatabel.rows.length; u++) {
        if (u !== 0) {
            if (jsonabsenkelasperbulan.length > 0) {
                for (var v = 0; v < jsonabsenkelasperbulan.length; v++) {
                    if (datatabel.rows[u].cells[1].innerHTML == jsonabsenkelasperbulan[v].name) {
                        var link = jsonabsenkelasperbulan[v].fileContent;
                        if (link !== "") {
                            var linksplit = link.replace("https://drive.google.com/file/d/", "");
                            var idpoto = linksplit.replace("/view?usp=drivesdk", "");

                        } else {
                            var idpoto = idlogo;
                        }

                        datatabel.rows[u].cells[2].innerHTML = `<img src="https://drive.google.com/uc?export=view&id=${idpoto}" style="width:75px;cursor:pointer" alt="poto" onclick="klikpotosiswa(this)"/><br/>Hadir`;
                        datatabel.rows[u].cells[3].innerHTML = "Pukul <br/>" + addZero(new Date(jsonabsenkelasperbulan[v].Time_Stamp).getHours()) + ":" + addZero(new Date(jsonabsenkelasperbulan[v].Time_Stamp).getMinutes()) + ":" + addZero(new Date(jsonabsenkelasperbulan[v].Time_Stamp).getSeconds());
                        if (jsonabsenkelasperbulan[v].idbaris !== "") {
                            datatabel.rows[u].cells[3].innerHTML += `<br/> <button onclick="hapusabsensiswaini('${jsonabsenkelasperbulan[v].idbaris}')">Ganti/Hapus</button>;`
                        }
                        break;
                    } else {
                        datatabel.rows[u].cells[2].innerHTML = "Belum Absen";
                    }
                }
            } else {
                datatabel.rows[u].cells[2].innerHTML = "Belum Absen";
            }
        }
    }
}

const fecjsonabsen = () => {
    let tgl = new Date();
    let dtgl = tgl.getDate();
    let mtgl = tgl.getMonth() + 1;
    let nol = addZero(mtgl);
    let ytg = tgl.getFullYear();

    let idHariini = dtgl + "" + nol + "" + ytg;

    absenheader = "absen" + idJenjang;
    url_absensiswa = jlo[absenheader];


    return fetch(url_absensiswa + "?action=absenkelashariini&id=" + idHariini + "&kelas=" + encodeURIComponent(ruangankelas))
        .then(m => m.json())
        .then(k => k.absenhariini)
        .catch(er => {
            console.log(er);
            loadingAPI.style.display = "block";
            infoloadingAPI.innerHTML = "Terjadi kesalahan. Coba Lagi Nanti atau Logout dulu ...."
        });
}

const refreshAbsenHariIni = async () => {
    let k = await fecjsonabsen();
    localStorage.setItem('absenHariIni_' + encodeURIComponent(ruangankelas), JSON.stringify(k));
    createtableabsenhariini();
    setTimeout(function () {
        localStorage.removeItem('absenHariIni_' + encodeURIComponent(ruangankelas));
    }, 60000);
}

const buattabelrekapsemester = () => {
    let indekssemester = SemesterBerapaSekarang();
    let divtabel = document.getElementById("tabelabsenrekap");
    divtabel.innerHTML = "";
    let tabel = document.createElement("table");
    tabel.setAttribute("class", "versi-table w3-border modifgaris w3-tiny");
    tabel.setAttribute("id", "idtabelrekapsemester");

    let thead = tabel.createTHead();
    let brstr = thead.insertRow(0);
    let th0 = document.createElement("th");
    th0.setAttribute("class", "w3-blue-grey");
    th0.setAttribute("rowspan", "3");
    th0.innerHTML = "No";
    brstr.appendChild(th0);
    let th1 = document.createElement("th");
    th1.setAttribute("class", "w3-khaki");
    th1.setAttribute("rowspan", "3");
    th1.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
    th0.innerHTML = "No";
    th1.innerHTML = "Nama";
    brstr.appendChild(th1);

    let th2 = document.createElement("th");
    th2.setAttribute("class", "w3-light-blue");
    th2.setAttribute("colspan", "30");
    th2.innerHTML = "Bulan";
    brstr.appendChild(th2);

    let brstrhead = thead.insertRow(-1);
    let brstrket = thead.insertRow(-1);
    let warnabulan = ["w3-red", "w3-blue", "w3-aqua", "w3-sand", "w3-yellow", "w3-deep-orange"];
    for (var a = 0; a < 6; a++) {
        var indeks = arrayIndeksBulan[a];
        var indek = parseFloat(indeks)
        var th3 = document.createElement("th");
        th3.setAttribute("class", warnabulan[a]);
        th3.setAttribute("colspan", "5");
        th3.innerHTML = namaBulanDiSemesterBerarpa(indekssemester, a);//NamaBulandariIndex(indek);
        brstrhead.appendChild(th3);

        var thhe = document.createElement("th");
        thhe.setAttribute("class", warnabulan[a]);
        thhe.innerHTML = "HE";
        brstrket.appendChild(thhe);

        var thhe = document.createElement("th");
        thhe.setAttribute("class", warnabulan[a]);
        thhe.innerHTML = "Hadir";
        brstrket.appendChild(thhe);

        var thhe = document.createElement("th");
        thhe.setAttribute("class", warnabulan[a]);
        thhe.innerHTML = "Sakit";
        brstrket.appendChild(thhe);

        var thhe = document.createElement("th");
        thhe.setAttribute("class", warnabulan[a]);
        thhe.innerHTML = "Ijin";
        brstrket.appendChild(thhe);

        var thhe = document.createElement("th");
        thhe.setAttribute("class", warnabulan[a]);
        thhe.innerHTML = "alpa";
        brstrket.appendChild(thhe);


    }

    let i = 1, x, y, z, o;// = 0;
    let tbody = tabel.createTBody();
    jsondatasiswa.forEach(element => {


        let brs = tbody.insertRow(-1);
        let selbaris = brs.insertCell(-1);
        selbaris.setAttribute("class", "w3-aqua");
        selbaris.innerHTML = i;
        let selbaris1 = brs.insertCell(-1);
        selbaris1.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
        selbaris1.setAttribute("class", "w3-khaki");
        selbaris1.innerHTML = element.pd_nama;
        for (let b = 0; b < 30; b++) {
            if (b == 0) {
                o = 0;
            } else if (b % 5 == 0) {
                o += 1;
            }
            let selbaris3 = brs.insertCell(-1);
            selbaris3.setAttribute("class", warnabulan[o]);
            selbaris3.innerHTML = "-";
        }
        i++;


    });





    // }
    divtabel.innerHTML = `<button class="w3-button w3-aqua w3-round-large" onclick="excelRekapSemester()"><i class="fa fa-file-excel-o"><i> Simpan Excel</button>`;
    divtabel.innerHTML += `   <button class="w3-button w3-blue-grey w3-round-large" onclick="printRekapSemester()"><i class="fa fa-print"><i> Print </button><hr>`;
    divtabel.appendChild(tabel);

}


var datasiswaklik = [];
function kirimwauntukabsen(id) {
    var noid = id.split("_")[1];
    datasiswaklik = jsondatasiswa.filter(x => x.id == noid);
    var tgl = new Date();
    var stgl = tgl.getDate();
    var xbln = tgl.getMonth() + 1;
    var sbln = addZero(xbln);
    var sthn = tgl.getFullYear();
    var idok = stgl + "" + sbln + "" + sthn;
    var kelas = ruangankelas;//document.getElementById("kelassayapilih").innerHTML;	
    document.getElementById("namaanakdiwa").innerHTML = datasiswaklik[0].pd_nama;//decodeURIComponent(id.split("_")[3]);
    document.getElementById('wasiswa').style.display = 'block';
    document.kirimwasiswa.nowasiswa.value = "";
    var nowanya = datasiswaklik[0].pd_hp;
    if (nowanya.length > 11) {
        document.kirimwasiswa.nowasiswa.disabled = true;
        document.kirimwasiswa.nowasiswa.value = nowanya;
        pesanawalwa.innerHTML = "No WA sudah terisi dan siap menghubungi Ananda  ";
    }
    else {
        document.kirimwasiswa.nowasiswa.disabled = false;
        pesanawalwa.innerHTML = "No WA belum terisi untuk mengirim pesan WA ke Ananda  ";
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
    var teksnya = "Assalamualaikum, Salam sejahtera. \n \n Kami melacak  bahwa Ananda " + namaanakdiwa.innerHTML + " belum mengisi kehadiran, silakan kunjungi alamat  atau balas WA ini dengan mengirimkan Poto untuk Kami bantu kehadirannya. \n \n Berikut pesan khususnya: ";

    var nowaa = document.kirimwasiswa.nowasiswa.value;
    var nowa;

    if (nowaa.slice(0, 1) == "0") { //jika nomor awalannya 0, contoh 0821
        nowa = "+62" + nowaa.slice(1, 12);
    }
    else if (nowaa.slice(0, 1) == "6") { // jika nomor awalannya 62 tanpa +, contoh 628213837666
        nowa = "+" + nowaa;
    } else {
        nowa = nowaa;
    }
    var urlnya = getLinkWhastapp(nowa, teksnya + "\n \n " + document.kirimwasiswa.tekssiswa.value);
    window.open(urlnya);
    document.kirimwasiswa.reset();
    document.getElementById("wasiswa").style.display = "none";
}


function bantuabsen(encodenama) {
    document.bantuisi.reset();
    document.bantukirim.reset();
    var teks = encodenama;
    var split = teks.split("_");
    var kodenama = split[0];
    var tgl = split[1];

    document.getElementById("divbantuabsen").style.display = "block";
    document.bantuisi.style.display = "block";
    document.getElementById("loginbantu").style.display = "none";
    document.getElementById("tombolbantusimpan").style.display = "block";
    document.getElementById("thankyou_messagekirim").style.display = "none";
    loginclosebantu.innerHTML = "Batal";
    kodefilepotosiswaabsen.innerHTML = "";

    document.getElementById("bantusiapa").innerHTML = decodeURIComponent(kodenama);
    document.bantukirim.name.value = decodeURIComponent(kodenama);
    document.bantukirim.kelas.value = ruangankelas;//document.getElementById("kelassayapilih").innerHTML;
    document.getElementById("potosiswa").src = "/img/eabsensi.webp";
    var ltgl = tgl.length;
    var dtg, dbln, dthn
    if (ltgl == 7) { //7082020 --> 7(
        dtg = addZero(tgl.slice(0, 1));
        dbln = tgl.slice(1, 3);
        dthn = tgl.slice(3, 7)

    } else {
        dtg = tgl.slice(0, 2);
        dbln = tgl.slice(2, 4);
        dthn = tgl.slice(4, 8);
    }
    var tglnya = dthn + "-" + dbln + "-" + dtg;
    document.bantuisi.time_stampbantu.value = tglnya;
    document.bantukirim.Time_Stamp.value = tglnya;
    document.bantukirim.id.value = deleteZero(dtg) + "" + dbln + "" + dthn;

    var namabulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    document.getElementById("dibaca").innerHTML = "Tanggal " + deleteZero(dtg) + "  bulan: " + namabulan[deleteZero(dbln) - 1] + "  Tahun: " + dthn;

}

function getLinkWhastapp(number, message) {
    var url = 'https://api.whatsapp.com/send?phone=' + number + '&text=' + encodeURIComponent(message);

    return url
}

function tombolbantukirim() {
    document.getElementById("bantusiapa").innerHTML = "<i class='fa fa-spin fa-spinner'></i> Sedang proses ...";
    document.bantuisi.style.display = "none";
    document.getElementById("loginbantu").style.display = "none";
    var tgl = document.bantuisi.time_stampbantu.value;
    var id1 = tgl.split("-")[0];//tahun
    var id2 = tgl.split("-")[1];//bulan
    var id3 = tgl.split("-")[2];//tgl
    var stringdate = id1 + "-" + deleteZero(id2) + "-" + deleteZero(id3);
    var en = $("#bantukirim").serialize();
    var url = url_absensiswa + "?action=siswaabsen";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("bantusiapa").innerHTML = "";//+ "  Data telah berhasil dibantu, Terima kasih";
            document.getElementById("thankyou_messagekirim").style.display = "block";
            document.getElementById("thankyou_messagekirim").innerHTML = JSON.parse(xhr.responseText);
            document.getElementById("tombolbantusimpan").style.display = "block"; //????
            document.getElementById("loginclosebantu").innerHTML = "Selesai dan Keluar";
            refreshAbsenHariIni();
            updateLocaleRekapkelas(stringdate);
        }
    };
    xhr.send(en);
}


function uploadfilebantu() {


    //define the width to resize e.g 600px
    var resize_width = 150;//without px

    //get the image selected
    var item = document.querySelector('#lampirkanpotoabsen').files[0];

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

            //assign it to thumb src
            var poto = document.querySelector('#potosiswa')
            poto.src = srcEncoded;

            kodefilepotosiswaabsen.innerHTML = "";

            var inputbase64 = document.createElement("input");
            inputbase64.setAttribute("name", "fileContent");
            inputbase64.value = srcEncoded.replace(/^.*,/, '');

            var inputfilename = document.createElement("input");
            inputfilename.setAttribute("name", "filename");
            inputfilename.value = "avatar_" + namebantukirim.value.toUpperCase().replace(/\s+/, "_");

            var inputmimetype = document.createElement("input");
            inputmimetype.setAttribute("name", "mimeType")
            inputmimetype.value = "data:image/jpeg"; //e.target.result.match(/^.*(?=;)/)[0]

            kodefilepotosiswaabsen.appendChild(inputbase64);
            kodefilepotosiswaabsen.appendChild(inputfilename);
            kodefilepotosiswaabsen.appendChild(inputmimetype);
        }
        loginbantu.style.display = "block";
    }
}

function gantikehadiranbantu() {
    var sss = document.bantuisi.pilih_kehadiran;
    document.bantukirim.kehadiran.value = sss.value;
}

function bantuisitanggal() {
    var tgl = document.bantuisi.time_stampbantu.value;
    var id1 = tgl.split("-")[0];//tahun
    var id2 = tgl.split("-")[1];//bulan
    var id3 = tgl.split("-")[2];//tgl
    var idok = deleteZero(id3) + "" + id2 + "" + id1;
    document.bantukirim.Time_Stamp.value = tgl;
    document.bantukirim.id.value = idok;
    var namabulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    document.getElementById("dibaca").innerHTML = "Tanggal " + deleteZero(id3) + "  bulan: " + namabulan[deleteZero(id2) - 1] + "  Tahun: " + id1;
}

function pilihopsibulanrekap() {

    document.getElementById("tabel_rekap_absen_sia_tgl").innerHTML = "";
    let idselect = document.getElementById("pilihbulanrekap");
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

    document.getElementById("bulanrekap").innerHTML = "Tabel Rekap Absensi Bulan " + namabulan + " " + y;

    let tabel = document.createElement("table");
    tabel.setAttribute("class", "versi-table w3-tiny");
    tabel.setAttribute("id", "tabelxx");
    //baris pertama:
    let thead = tabel.createTHead();
    let tr = thead.insertRow(0);

    let th = document.createElement("th");
    th.setAttribute("rowspan", "2");
    th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
    th.innerHTML = "NAMA SISWA";
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
        let sd_tbl = StringTanggal(d_tbl);
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

            itungHE++;
        }

        th.innerHTML = itgl + "<br>" + NamaHaridariIndex(indekshari);


        tr.appendChild(th);

        itgl++;
    }
    let datanama = Object.keys(jsondatasiswa).map(k => jsondatasiswa[k].pd_nama);

    let encodenama;

    let tbody = tabel.createTBody()
    for (let j = 0; j < datanama.length; j++) {
        tr = tbody.insertRow(-1);
        let cell = tr.insertCell(-1);
        cell.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px; box-shadow: inset 0 0 1px #000000");
        cell.innerHTML = "<span style='font-size:12px;' id='datakelas" + j + "'>" + datanama[j] + "</span>";
        encodenama = encodeURIComponent(datanama[j]);
        let ke = 1;

        for (let k = 0; k < jumlahharibulanini; k++) {
            cell = tr.insertCell(-1);
            d_tbl = new Date(y, m, ke);
            sd_tbl = StringTanggal(d_tbl);
            indekshari = d_tbl.getDay()
            libur = (arrayStringTglLibur.indexOf(sd_tbl) > -1) ? true : false;
            indekslibur = (arrayStringTglLibur.indexOf(sd_tbl) > -1) ? arrayStringTglLibur.indexOf(sd_tbl) : -1;
            weekend = (indekshari == 0 || indekshari == 6) ? true : false;
            if (libur) {
                cell.setAttribute("class", "w3-red");
                cell.setAttribute("style", "background-color:red");
            } else if (weekend) {
                cell.setAttribute("class", "w3-red");
                cell.setAttribute("style", "background-color:red");
            } else {
                cell.setAttribute("style", "cursor:pointer");
                cell.setAttribute("id", "td_" + encodenama + "_" + ke + "" + nolbulan + "" + y + "");
                cell.setAttribute("onclick", "bantuabsen('" + encodenama + "_" + ke + "" + nolbulan + "" + y + "')");
                cell.innerHTML = "<span style='font-size:10px' id='" + ke + "" + nolbulan + "" + y + "_" + encodeURIComponent(ruangankelas) + "_" + encodenama + "'>x</span>";
            }
            ke++;
        }
    }
    document.getElementById("tabel_rekap_absen_sia_tgl").appendChild(tabel);
    document.getElementById("tabel_rekap_absen_sia_tgl").innerHTML += `Keterangan Libur: <ul>`;
    arrayKeteranganLibur.forEach(m => {
        document.getElementById("tabel_rekap_absen_sia_tgl").innerHTML += `<li> ${m} </li>`;
    })
    document.getElementById("tabel_rekap_absen_sia_tgl").innerHTML += `</ul>`;
    var TglCetak = new Date(y, m, 1);
    let datee = StringTanggal(TglCetak);
    lihatrekapkelas(datee);
    let tombolprint = document.getElementById("printke1");
    tombolprint.removeAttribute("onclick");
    tombolprint.setAttribute("onclick", "print('tabel_rekap_absen_sia_tgl,Daftar Absensi Siswa Kelas " + ruangankelas + ",Bulan " + namabulan + " " + y + "," + TglCetak + "')");
    tombolprint = document.getElementById("simpanabsenbulananexcel");
    tombolprint.removeAttribute("onclick");
    tombolprint.setAttribute("onclick", "excelrekapbulan()");
}

const excelrekapbulan = () => {
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    tabelhasil.setAttribute("class", "versi-table");
    tabelhasil.setAttribute("id", "myTableCopy");

    var tabeleditt = document.getElementById("tabelxx");//.getElementsByTagName("tbody")[0];


    var cln = tabeleditt.cloneNode(true);
    tabelhasil.appendChild(cln);
    datasiswadiv.appendChild(tabelhasil);
    var tabeledithead = document.getElementById("myTableCopy").getElementsByTagName("thead")[0];
    //tabeledithead.rows[0].deleteCell(1);
    var identitasbulanrekap = tabeledithead.rows[0].cells[1].innerHTML;

    var tabeledit = document.getElementById("myTableCopy").getElementsByTagName("tbody")[0];
    for (i = 0; i < tabeledit.rows.length; i++) {
        for (j = 0; j < tabeledit.rows[i].cells.length; j++) {

            let teks = tabeledit.rows[i].cells[j].innerHTML.replace("<br>", "");
            let tekss = teks.replace("poto", "");
            tabeledit.rows[i].cells[j].innerHTML = tekss;

        }
    }
    let countcol = tabeledit.rows[0].cells.length;
    let brs = tabeledithead.insertRow(0);
    let sel = brs.insertCell(-1);
    sel.setAttribute("colspan", countcol);
    sel.setAttribute("style", "text-align:center");
    sel.innerHTML = idNamaSekolah.toUpperCase();

    brs = tabeledithead.insertRow(1);
    sel = brs.insertCell(-1);
    sel.setAttribute("colspan", countcol);
    sel.innerHTML = "REKAPITULASI KEHADIRAN SISWA KELAS  " + idNamaKelas.toUpperCase() + " " + identitasbulanrekap.toUpperCase();

    brs = tabeledithead.insertRow(2);
    sel = brs.insertCell(-1);
    sel.setAttribute("colspan", countcol);
    sel.innerHTML = "Semester " + idSemester + " Tahun Pelajaran " + idTeksTapel;

    brs = tabeledithead.insertRow(3);
    sel = brs.insertCell(-1);
    sel.setAttribute("colspan", countcol);
    let rowcount = tabeledit.rows.length;

    let colcount = tabeledit.rows[0].cells.length;
    countcol = tabeledit.rows[0].cells.length;
    if (colcount >= 5) {
        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1);
        sel.setAttribute("style", "word-wrap: normal;");
        sel.innerHTML = "NIP. " + idNipKepsek;
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1);
        }
        sel = brs.insertCell(-1);
        sel.setAttribute("style", "word-wrap: normal;");
        sel.innerHTML = "NIP. " + idNipGuruKelas;
        sel = brs.insertCell(-1);

        brs = tabeledit.insertRow(rowcount);
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1);
        sel.setAttribute("style", "word-wrap: normal;");
        sel.innerHTML = "<b><u>" + idNamaKepsek + "</u></b>";
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1);
        }
        sel = brs.insertCell(-1);
        sel.setAttribute("style", "word-wrap: normal;");
        sel.innerHTML = "<b><u>" + namauser + "</u></b>";
        sel = brs.insertCell(-1);

        brs = tabeledit.insertRow(rowcount);
        brs = tabeledit.insertRow(rowcount);
        brs = tabeledit.insertRow(rowcount);

        brs = tabeledit.insertRow(rowcount);
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1);
        sel.setAttribute("style", "word-wrap: normal;");
        sel.innerHTML = "Kepala " + idNamaSekolah;
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1);
        }
        sel = brs.insertCell(-1);
        sel.setAttribute("style", "word-wrap: normal;");
        sel.innerHTML = idJenisGuru + " " + idNamaKelas;
        sel = brs.insertCell(-1);

        brs = tabeledit.insertRow(rowcount);
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1);
        sel.setAttribute("style", "word-wrap: normal;");
        sel.innerHTML = "Mengetahui,";
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1);
        }
        sel = brs.insertCell(-1);
        sel.setAttribute("style", "word-wrap: normal;");
        sel.innerHTML = jlo.kota + ", " + tanggalfull(new Date());
        sel = brs.insertCell(-1);
        brs = tabeledit.insertRow(rowcount);
        brs = tabeledit.insertRow(rowcount);

    }

    $("#myTableCopy").table2excel({
        name: " SDN Ratujaya 1",
        filename: "Rekap kehadiran siswa Kelas " + ruangankelas + " " + identitasbulanrekap + " ID FILE " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_judul: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 2
    });
    datasiswadiv.innerHTML = "";
}


const lihatrekapkelas = async (datee) => {
    let kelas = ruangankelas;
    document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML = "";
    document.getElementById("spinspin").innerHTML = "<i class='fa fa-spin fa-spinner w3-xxxlarge'></i>";
    var kodeid;
    var kodetd;
    var hadir;

    document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML = "Nama Siswa yang tidak ada di absen, tapi terdata di kelas ini: <ol>";

    let ind = new Date(datee).getMonth();
    let namabulansekarang = NamaBulandariIndex(new Date().getMonth());
    let bulanapi = NamaBulandariIndex(ind);
    var jsonabsenkelasperbulan = [];
    jsonlocalstorage = JSON.parse(localStorage.getItem("inst_id"));

    if (localStorage.hasOwnProperty(bulanapi)) {
        if (bulanapi !== namabulansekarang) {
            let kk = JSON.parse(localStorage.getItem(bulanapi));
            jsonabsenkelasperbulan = kk;
        } else {
            loadingAPI.style.display = "block";
            infoloadingAPI.innerHTML = "Sedang memproses rekap per bulan ..."
            await fetch(url_absensiswa + "?action=rekapbulan&kelas=" + kelas + "&strtgl=" + datee)
                .then(m => m.json())
                .then(k => {
                    loadingAPI.style.display = "none";
                    infoloadingAPI.innerHTML = "";
                    jsonabsenkelasperbulan = k[bulanapi];

                    localStorage.setItem(bulanapi, JSON.stringify(k[bulanapi]));
                }).catch(er => {
                    infoloadingAPI.innerHTML = "Terjadi kesalahan. Coba Lagi Nanti atau Logout dulu ...";
                    fetch(url_absensiswa + "?action=rekapbulan&kelas=" + kelas + "&strtgl=" + datee)
                        .then(m => m.json())
                        .then(k => {
                            jsonabsenkelasperbulan = k[bulanapi];

                            localStorage.setItem(bulanapi, JSON.stringify(k[bulanapi]));
                        }).catch(err => { console.log(err.toString() + " paksa reload") })
                })
        }

    } else {
        await fetch(url_absensiswa + "?action=rekapbulan&kelas=" + kelas + "&strtgl=" + datee)
            .then(m => m.json())
            .then(k => {
                jsonabsenkelasperbulan = k[bulanapi];
                localStorage.setItem(bulanapi, JSON.stringify(k[bulanapi]));
            }).catch(er => {
                console.log(er.toString());
                fetch(url_absensiswa + "?action=rekapbulan&kelas=" + kelas + "&strtgl=" + datee)
                    .then(m => m.json())
                    .then(k => {
                        jsonabsenkelasperbulan = k[bulanapi];
                        console.log("ga punya local, dan sedang buat local dari " + er)
                        localStorage.setItem(bulanapi, JSON.stringify(k[bulanapi]));
                    }).catch(er => { console.log(er.toString() + " paksa reload") })

            })
    }
    spinspin.innerHTML = "";
    for (var i = 0; i < jsonabsenkelasperbulan.length; i++) {
        kodeid = jsonabsenkelasperbulan[i].id + "_" + kelas + "_" + encodeURIComponent(jsonabsenkelasperbulan[i].name);
        kodetd = "td_" + encodeURIComponent(jsonabsenkelasperbulan[i].name) + "_" + jsonabsenkelasperbulan[i].id;
        var isikehadiran = document.getElementById(kodeid);
        if (isikehadiran == null) {
            document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML += "<li>" + decodeURIComponent(jsonabsenkelasperbulan[i].name) + " pada tanggal " + new Date(jsonabsenkelasperbulan[i].Time_Stamp).getDate() + " Tidak ada/diubah namanya.</li>";
        } else {
            var link = jsonabsenkelasperbulan[i].fileContent;
            if (link !== "") {
                var linksplit = link.replace("https://drive.google.com/file/d/", "");
                var linksplitt = linksplit.replace("/view?usp=drivesdk", "");
            } else {
                var linksplitt = idlogo;
            }
            var cekdiv = document.getElementById(kodetd);
            if (cekdiv != null) {
                document.getElementById(kodetd).removeAttribute("onclick");
                isikehadiran.innerHTML = `<img src="https://drive.google.com/uc?export=view&id=${linksplitt}" style="width:20px; height:30px;cursor:pointer" alt="poto" onclick="klikpotosiswa(this)"/><br/>${jsonabsenkelasperbulan[i].kehadiran}`;
            }
        }
    }
    document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML += "</ol>";

    if (BolehEksekusiJikaDiSemesterIni(datee)) {
        let namatabel = document.getElementById("tabelxx");//.rows.length; ;
        let datanama = Object.keys(jsondatasiswa).map(k => jsondatasiswa[k].pd_nama);
        let arrayy = [];
        let indektabelrekapsemester = [2, 7, 12, 17, 22, 27];
        let indeksbulanini = IndeksBulanDiSemesteTertentu(datee);
        let iStart = indektabelrekapsemester[indeksbulanini];
        let tabelnya = document.getElementById("idtabelrekapsemester");
        for (let k = 0; k < datanama.length; k++) {
            let objdata = {}
            objdata.namasiswa = datanama[k];

            let countHadir = 0, countIjin = 0, countSakit = 0;//, countAlpa = datanama[k]["HE"];
            let countHE = namatabel.rows[2].cells.length - 1;
            for (let l = 1; l < namatabel.rows[k + 2].cells.length; l++) {
                let el = namatabel.rows[k + 2].cells[l].outerHTML;
                if (el.indexOf("red") > -1) {
                    countHE -= 1
                }

                let tes = namatabel.rows[k + 2].cells[l].innerHTML;
                if (tes.indexOf("Hadir") > -1) {
                    countHadir++;
                } else if (tes.indexOf("Ijin") > -1) {
                    countIjin++;
                } else if (tes.indexOf("Sakit") > -1) {
                    countSakit++;
                }
            }
            objdata.Hadir = countHadir;
            objdata.Ijin = countIjin;
            objdata.Sakit = countSakit;
            objdata.Alpa = countHE - (countHadir + countIjin + countSakit);
            objdata.HariEfektif = countHE;
            arrayy.push(objdata)
            tabelnya.rows[k + 3].cells[iStart].innerHTML = countHE; // HE
            tabelnya.rows[k + 3].cells[iStart * 1 + 1].innerHTML = countHadir; //Hadir
            tabelnya.rows[k + 3].cells[iStart * 1 + 2].innerHTML = countSakit; //Sakit
            tabelnya.rows[k + 3].cells[iStart * 1 + 3].innerHTML = countIjin; //Ijin
            tabelnya.rows[k + 3].cells[iStart * 1 + 4].innerHTML = countHE - (countHadir + countIjin + countSakit); //alpa
        }
        REKAPAbsen[bulanapi] = arrayy;
    }

}



const updateLocaleRekapkelas = async (datee) => {
    let kelas = ruangankelas;
    document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML = "";
    document.getElementById("spinspin").innerHTML = "<i class='fa fa-spin fa-spinner w3-xxxlarge'></i>"
    var kodeid;
    var kodetd;
    var hadir;
    document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML = "Nama Siswa yang tidak ada di absen, tapi terdata di kelas ini: <ol>";
    let ind = new Date(datee).getMonth();
    let namabulansekarang = NamaBulandariIndex(new Date().getMonth());
    let bulanapi = NamaBulandariIndex(ind);
    var jsonabsenkelasperbulan = [];
    await fetch(url_absensiswa + "?action=rekapbulan&kelas=" + encodeURIComponent(ruangankelas) + "&strtgl=" + datee)
        .then(m => m.json())
        .then(k => {
            jsonabsenkelasperbulan = k[bulanapi];
            localStorage.setItem(bulanapi, JSON.stringify(k[bulanapi]));
        }).catch(er => alert("OUps, terjadi kesalahan. Silakan ulangi perintahnya. \n" + er))
    spinspin.innerHTML = "";

    for (var i = 0; i < jsonabsenkelasperbulan.length; i++) {
        kodeid = jsonabsenkelasperbulan[i].id + "_" + kelas + "_" + encodeURIComponent(jsonabsenkelasperbulan[i].name);
        kodetd = "td_" + encodeURIComponent(jsonabsenkelasperbulan[i].name) + "_" + jsonabsenkelasperbulan[i].id;
        var isikehadiran = document.getElementById(kodeid);
        if (isikehadiran == null) {
            document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML += "<li>" + decodeURIComponent(jsonabsenkelasperbulan[i].name) + " pada tanggal " + new Date(jsonabsenkelasperbulan[i].Time_Stamp).getDate() + " Tidak ada/diubah namanya.</li>";
        } else {
            var link = jsonabsenkelasperbulan[i].fileContent;
            if (link !== "") {
                var linksplit = link.replace("https://drive.google.com/file/d/", "");
                var linksplitt = linksplit.replace("/view?usp=drivesdk", "");
            } else {
                linksplitt = idlogo;
            }
            var cekdiv = document.getElementById(kodetd);
            if (cekdiv != null) {
                document.getElementById(kodetd).removeAttribute("onclick");
                isikehadiran.innerHTML = "<div style='width:22px;height:32px;cursor:pointer;border:1px solid blue'><a href='" + jsonabsenkelasperbulan[i].fileContent + "' target='_blank'><img src='https://drive.google.com/uc?export=view&id=" + linksplitt + "'  style='width:20px; height:30px'  alt='poto'><br/>" + jsonabsenkelasperbulan[i].kehadiran + "</a></div>";
            }
        }
    }
    document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML += "</ol>";
}

document.addEventListener("click", function (e) {
    let el = e.target;
    let cls = el.classList.contains('tabkaldik');
    let kal = JSON.parse(localStorage.getItem('Kaldik'));
    let clsx = el.classList.contains('kbmtoday');
    let upmat = el.classList.contains('klikuploadmateri');
    let a = new Date();
    let b = a.getDate();
    let c = a.getMonth() + 1;
    let d = a.getFullYear();
    let idokmateri = addZero(b) + "" + addZero(c) + "" + d;
    if (cls) {
        tabelkaldikss.innerHTML = "";
        let tabel = document.createElement("table")
        tabel.setAttribute("class", "versi-table");

        let thead = tabel.createTHead();
        let tr = thead.insertRow(0);
        let th = document.createElement("th")
        th.innerHTML = "No"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Keterangan"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Durasi (hari)"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Tanggal Mulai"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Tanggal Akhir"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Diedit Oleh";
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Aksi"
        tr.appendChild(th)
        let tbody = tabel.createTBody()
        for (let i = 0; i < kal.length; i++) {
            tr = tbody.insertRow(-1);
            let td = tr.insertCell(-1)
            td.innerHTML = i + 1;

            td = tr.insertCell(-1)
            td.innerHTML = kal[i].keterangan;
            td = tr.insertCell(-1)
            td.innerHTML = kal[i].lama;
            td = tr.insertCell(-1)
            td.innerHTML = tanggalfull(kal[i].start_tgl);
            td = tr.insertCell(-1)
            td.innerHTML = tanggalfull(kal[i].end_tgl);
            td = tr.insertCell(-1);
            td.innerHTML = kal[i].oleh;
            td = tr.insertCell(-1);
            td.innerHTML = `<button onclick="ubahtanggalini(${kal[i].idbaris})">Ubah</button><button onclick="hapustanggalini('${kal[i].idbaris}')"})">Hapus</button>`;
        }
        tabelkaldikss.appendChild(tabel)
        tabelkaldikss.innerHTML += `<hr><button onclick="tambahKaldik()" class="wa"><i class="fa fa-calendar-plus-o w3-xxxlarge"></i>   Tambah Kalender</button>`
    } else if (clsx) {
        kbm_hari_ini.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`
        //alert("iya ini kbm today")
        if (localStorage.hasOwnProperty("kbmtoday" + idokmateri)) {
            let data = JSON.parse(localStorage.getItem("kbmtoday" + idokmateri));
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
        } else {
            updatematerikan()
        }
    } else if (upmat) {

        if (tombolpublikasikan.innerHTML !== "PUBLIKASIKAN") {
            let konfirm = confirm("Anda dalam posisi ingin mengedit materi. Apakah Anda akan melanjutkan edit? \n \n Klik OK untuk kembali mengedit. \n \n Klik CANCEL untuk Membuat Materi Baru.")
            if (!konfirm) {
                document.formuploadmateri.reset();
                document.formuploadmateri.idmateri.value = "";
                tombolpublikasikan.setAttribute("onclick", "publikasikanmateribaru()")
                tombolpublikasikan.removeAttribute("class");//.wa w3-deep-purple w3-hover-aqua);
                tombolpublikasikan.setAttribute("class", "wa w3-deep-purple w3-hover-aqua");
                tombolpublikasikan.innerHTML = "PUBLIKASIKAN";

            }

        }
    }
})


function excelRekapSemester() {
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    tabelhasil.setAttribute("class", "versi-table");
    tabelhasil.setAttribute("id", "myTableCopy");

    var tabeleditt = document.getElementById("idtabelrekapsemester");//.getElementsByTagName("tbody")[0];
    var cln = tabeleditt.cloneNode(true);
    tabelhasil.appendChild(cln);
    datasiswadiv.appendChild(tabelhasil);
    let tabeledit = document.getElementById("myTableCopy").getElementsByTagName("tbody")[0]
    let tabeledithead = document.getElementById("myTableCopy").getElementsByTagName("thead")[0];
    let countcol = tabeledit.rows[0].cells.length;
    let brs = tabeledithead.insertRow(0)
    let sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol);
    sel.setAttribute("style", "text-align:center");
    sel.innerHTML = idNamaSekolah.toUpperCase()

    brs = tabeledithead.insertRow(1);
    sel = brs.insertCell(-1);
    sel.setAttribute("colspan", countcol);
    sel.innerHTML = "REKAP KEHADIRAN DALAM SATU SEMESTER KELAS  " + idNamaKelas.toUpperCase();

    brs = tabeledithead.insertRow(2);
    sel = brs.insertCell(-1);
    sel.setAttribute("colspan", countcol);
    sel.innerHTML = "Semester " + idSemester + " Tahun Pelajaran " + idTeksTapel;

    brs = tabeledithead.insertRow(3);
    sel = brs.insertCell(-1);
    sel.setAttribute("colspan", countcol);
    let rowcount = tabeledit.rows.length;

    let colcount = tabeledit.rows[0].cells.length;
    countcol = tabeledit.rows[0].cells.length;
    if (colcount >= 5) {
        brs = tabeledit.insertRow(rowcount);
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1); /// colom kedua ttd kepsek
        sel.innerHTML = "NIP. " + idNipKepsek;
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1); /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1); /// colom ketiga titimangsa guru kelas
        sel.innerHTML = "NIP. " + idNipGuruKelas;
        sel = brs.insertCell(-1); /// colom ketiga titimangsa guru kelas

        brs = tabeledit.insertRow(rowcount);
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1); /// colom kedua ttd kepsek
        sel.innerHTML = "<b><u>" + idNamaKepsek + "</u></b>";
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1); /// colom ketiga titimangsa guru kelas
        sel.innerHTML = "<b><u>" + namauser + "</u></b>";
        sel = brs.insertCell(-1); /// colom ketiga titimangsa guru kelas

        brs = tabeledit.insertRow(rowcount);
        brs = tabeledit.insertRow(rowcount);
        brs = tabeledit.insertRow(rowcount);

        brs = tabeledit.insertRow(rowcount);
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1); /// colom kedua ttd kepsek
        sel.innerHTML = "Kepala " + idNamaSekolah;
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1); /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1); /// colom ketiga titimangsa guru kelas
        sel.innerHTML = idJenisGuru + " " + idgurumapelmapel;
        sel = brs.insertCell(-1); /// colom ketiga titimangsa guru kelas



        brs = tabeledit.insertRow(rowcount);
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1); /// colom kedua ttd kepsek
        sel.innerHTML = "Mengetahui,";
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1); /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1); /// colom ketiga titimangsa guru kelas
        sel.innerHTML = jlo.kota + ", " + tanggalfull(new Date());
        sel = brs.insertCell(-1);/// colom ketiga titimangsa guru kelas
        brs = tabeledit.insertRow(rowcount);
        brs = tabeledit.insertRow(rowcount);
    } else {
        brs = tabeledit.insertRow(rowcount);
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1);/// colom kedua ttd kepsek
        sel.innerHTML = "NIP. " + idNipKepsek;

        brs = tabeledit.insertRow(rowcount);
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1); /// colom kedua ttd kepsek
        sel.innerHTML = "<b><u>" + idNamaKepsek + "</u></b>";

        brs = tabeledit.insertRow(rowcount);
        brs = tabeledit.insertRow(rowcount);
        brs = tabeledit.insertRow(rowcount);

        brs = tabeledit.insertRow(rowcount);
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1); /// colom kedua ttd kepsek
        sel.innerHTML = "Kepala " + idNamaSekolah;

        brs = tabeledit.insertRow(rowcount);
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1); /// colom kedua ttd kepsek
        sel.innerHTML = "Mengetahui,";

        brs = tabeledit.insertRow(rowcount);
        brs = tabeledit.insertRow(rowcount);
        brs = tabeledit.insertRow(rowcount);
        brs = tabeledit.insertRow(rowcount);
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1);/// colom kedua ttd kepsek
        sel.innerHTML = "NIP. " + idNipGuruKelas;

        brs = tabeledit.insertRow(rowcount);
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1);/// colom kedua ttd kepsek
        sel.innerHTML = "<b><u>" + namauser + "</u></b>";

        brs = tabeledit.insertRow(rowcount);
        brs = tabeledit.insertRow(rowcount);
        brs = tabeledit.insertRow(rowcount);

        brs = tabeledit.insertRow(rowcount);
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1); /// colom kedua ttd kepsek
        sel.innerHTML = idJenisGuru + " " + idgurumapelmapel;

        brs = tabeledit.insertRow(rowcount);
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1); /// colom kedua ttd kepsek

        sel.innerHTML = jlo.kota + ", " + tanggalfull(new Date());

        brs = tabeledit.insertRow(rowcount);
        brs = tabeledit.insertRow(rowcount);

    }

    let s = SemesterBerapaSekarang();
    $("#myTableCopy").table2excel({
        name: "Worksheet Name",
        filename: "Data Rekap Absen Kelas " + ruangankelas + " Semester " + s + " id file " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 3
    });
    datasiswadiv.innerHTML = "";
}


const printRekapSemester = () => {
    let t = new Date();
    let s = StringTanggal(t);
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    tabelhasil.setAttribute("id", "myTableCopy");

    var tabeleditt = document.getElementById("idtabelrekapsemester");//.getElementsByTagName("tbody")[0];
    tabeleditt.outerHTML.replace("position:sticky;position:-webkit-sticky;", "");
    tabeleditt.outerHTML.replace("box-shadow: inset 0 0 1px #000000", "");
    tabeleditt.getElementsByTagName("tbody")[0].removeAttribute("class");
    var cln = tabeleditt.cloneNode(true);
    tabelhasil.appendChild(cln);
    datasiswadiv.appendChild(tabelhasil);
    let sr = SemesterBerapaSekarang();
    print("myTableCopy,Daftar Rekap Absen Kelas " + ruangankelas + ", Semester " + sr + " Tahun Pelajaran " + idTeksTapel + "," + s);
    datasiswadiv.innerHTML = "";
}


const ubahtanggalini = (w) => {
    let ind = parseInt(w);
    modaleditkaldik.style.display = "block";
    formmodaleditkaldik.style.display = "block";
    tomboleditkaldik.style.display = "block";
    tomboleditkaldik.innerHTML = `<i class="fa fa-gears w3-xxxlarge"></i> EDIT`
    tomboleditkaldik.setAttribute("onclick", "kirimeditkalender()");
    juduleditkaldik.innerHTML = "Edit Kalender Pendidikan"

    let sumberx = JSON.parse(localStorage.getItem("Kaldik"));
    let sumber = sumberx.filter(k => k.idbaris == ind)[0];
    idbariskaldik.value = ind;
    keterangan.value = sumber.keterangan;
    let d = new Date(sumber.start_tgl);
    let tgl = d.getDate();
    let bln = d.getMonth() + 1;
    let thn = d.getFullYear();
    let jadi = thn + "-" + addZero(bln) + "-" + addZero(tgl);
    //let jadi = thn +"-"+bln + "-"+ tgl;

    start_tgl.value = jadi;// + "T08:00:00";

    let dend = new Date(sumber.end_tgl);
    let tgle = dend.getDate();
    let blne = dend.getMonth() + 1;
    let thne = dend.getFullYear();
    let jadie = thne + "-" + addZero(blne) + "-" + addZero(tgle);

    end_tgl.value = jadie;//+ "T08:00:00";
}

const kirimeditkalender = async () => {
    formmodaleditkaldik.style.display = "none";
    tomboleditkaldik.style.display = "none";
    juduleditkaldik.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo"><i>`;
    let dot = document.getElementById("formmodaleditkaldik");
    url_absenkaldik = jlo.url_dataabsen + "?action=datakaldik&idss=" + jlo.ss_dataabsen;
    let ol = namauser;
    let link = url_kaldikaja + "?action=editkaldik";
    let data = new FormData(dot);
    data.append('oleh', ol);
    await fetch(link, { method: 'post', body: data })
        .then(m => m.json())
        .then(k => {
            juduleditkaldik.innerHTML = k;
        })
        .catch(err => juduleditkaldik.innerHTML = err);

    await fetch(url_absenkaldik).then(m => m.json()).then(k => {
        let kal = k.records;
        tabelkaldikss.innerHTML = "";
        let tabel = document.createElement("table");
        tabel.setAttribute("class", "versi-table");
        let thead = tabel.createTHead();
        let tr = thead.insertRow(0);
        let th = document.createElement("th");
        th.innerHTML = "No";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Keterangan";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Durasi (hari)";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Tanggal Mulai";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Tanggal Akhir";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Diedit Oleh";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Aksi";
        tr.appendChild(th);
        let tbody = tabel.createTBody();
        for (let i = 0; i < kal.length; i++) {
            tr = tbody.insertRow(-1);
            let td = tr.insertCell(-1);
            td.innerHTML = i + 1;
            td = tr.insertCell(-1);
            td.innerHTML = kal[i].keterangan;
            td = tr.insertCell(-1);
            td.innerHTML = kal[i].lama;
            td = tr.insertCell(-1);
            td.innerHTML = tanggalfull(kal[i].start_tgl);
            td = tr.insertCell(-1);
            td.innerHTML = tanggalfull(kal[i].end_tgl);
            td = tr.insertCell(-1);
            td.innerHTML = kal[i].oleh;
            td = tr.insertCell(-1);
            td.innerHTML = `<button onclick="ubahtanggalini(${kal[i].idbaris})">Ubah</button><button onclick="hapustanggalini('${kal[i].idbaris}')"})">Hapus</button>`;
        }
        tabelkaldikss.appendChild(tabel);
        tabelkaldikss.innerHTML += `<hr><button onclick="tambahKaldik()" class="wa"><i class="fa fa-calendar-plus-o w3-xxxlarge"></i>   Tambah Kalender</button>`;

        arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
        arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

        localStorage.setItem('Kaldik', JSON.stringify(k.records));
        localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl));

        modaleditkaldik.style.display = "none";
    })
}

const kirimtambahkalender = async () => {
    formmodaleditkaldik.style.display = "none";
    tomboleditkaldik.style.display = "none";
    juduleditkaldik.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo"><i>`;
    url_absenkaldik = jlo.url_dataabsen + "?action=datakaldik&idss=" + jlo.ss_dataabsen;
    let dot = document.getElementById("formmodaleditkaldik");
    let ol = namauser;

    let link = url_kaldikaja + "?action=tambahkaldik";
    let data = new FormData(dot);
    data.append('oleh', ol);
    await fetch(link, { method: 'post', body: data })
        .then(m => m.json())
        .then(k => {
            juduleditkaldik.innerHTML = k;
        })
        .catch(err => juduleditkaldik.innerHTML = err);
    await fetch(url_absenkaldik).then(m => m.json()).then(k => {
        let kal = k.records;
        tabelkaldikss.innerHTML = "";
        let tabel = document.createElement("table");
        tabel.setAttribute("class", "versi-table");
        let thead = tabel.createTHead();
        let tr = thead.insertRow(0);
        let th = document.createElement("th");
        th.innerHTML = "No";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Keterangan";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Durasi (hari)";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Tanggal Mulai";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Tanggal Akhir";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Diedit Oleh";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Aksi";
        tr.appendChild(th);
        let tbody = tabel.createTBody();
        for (let i = 0; i < kal.length; i++) {
            tr = tbody.insertRow(-1);
            let td = tr.insertCell(-1);
            td.innerHTML = i + 1;
            td = tr.insertCell(-1);
            td.innerHTML = kal[i].keterangan;
            td = tr.insertCell(-1);
            td.innerHTML = kal[i].lama;
            td = tr.insertCell(-1);
            td.innerHTML = tanggalfull(kal[i].start_tgl);
            td = tr.insertCell(-1);
            td.innerHTML = tanggalfull(kal[i].end_tgl);
            td = tr.insertCell(-1);
            td.innerHTML = kal[i].oleh;
            td = tr.insertCell(-1);
            td.innerHTML = `<button onclick="ubahtanggalini(${kal[i].idbaris})">Ubah</button><button onclick="hapustanggalini('${kal[i].idbaris}')"})">Hapus</button>`;
        }
        tabelkaldikss.appendChild(tabel);
        tabelkaldikss.innerHTML += `<hr><button onclick="tambahKaldik()" class="wa"><i class="fa fa-calendar-plus-o w3-xxxlarge"></i>   Tambah Kalender</button>`;
        arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
        arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

        localStorage.setItem('Kaldik', JSON.stringify(k.records));
        localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl));
        modaleditkaldik.style.display = "none";
    })
}

const tambahKaldik = () => {
    modaleditkaldik.style.display = "block";
    formmodaleditkaldik.style.display = "block";
    tomboleditkaldik.style.display = "block";
    tomboleditkaldik.innerHTML = `<i class="fa fa-calendar-times-o w3-xxxlarge"></i> TAMBAH`
    tomboleditkaldik.setAttribute("onclick", "kirimtambahkalender()");
    juduleditkaldik.innerHTML = "Tambah Kalender Pendidikan"
    formmodaleditkaldik.reset();
    datakalenderdihapus.innerHTML = "<i class='fa fa-spin fa-spinner w3-large'></i>";
    fetch(url_kaldikaja + "?action=kaldikdihapus")
        .then(m => m.json())
        .then(k => {
            let data = k.records;
            let tekshtml = "";
            if (data.length > 0) {
                tekshtml = `<table class='versi-table w3-small'>
        <tr><th>No</th>
                <th>Keterangan</th>
                <th>Durasi hari</th>
                <th>Tanggal Mulai</th>
                <th>Tanggal Akhir</th>
                <th>Dibuat/diedit oleh</th>
                <th>Aksi</th>
                </tr>
            `;
                for (i = 0; i < data.length; i++) {
                    tekshtml += `<tr>
                    <td>${(i + 1)}</td>
                    <td>${data[i].keterangan}</td>
                    <td>${data[i].lama}</td>
                    <td>${tanggalfull(data[i].start_tgl)}</td>
                    <td>${tanggalfull(data[i].end_tgl)}</td>
                    <td>${data[i].oleh}</td>
                    <td><button onclick="kembalikantanggalini('${data[i].idbaris}')">Kembalikan</button></td>
                    </tr>`;
                }
                tekshtml += `</table>`
            } else {
                tekshtml = ""
            }
            datakalenderdihapus.innerHTML = tekshtml
        })

}


const hapustanggalini = async (ind) => {
    let konfirm = confirm("Anda yakin ingin menghapus kalender pendidikan tertanggal ini? \n\n Klik OK untuk menghapus \n Klik CANCEL untuk membatalkan")
    if (!konfirm) {
        alert("Anda membatalkan penghapusan tanggal kalender");
        return;
    }
    //alert("Anda menghapus tanggal pada baris di idss = " + (ind + 2))
    let brs = ind;
    await fetch(url_kaldikaja + "?action=hapuskaldik&idbaris=" + brs, {
        method: "post"
    }).then(m => m.json())
        .then(k => {
            alert(k);

        })
        .catch(f => alert(f))

    await fetch(url_kaldikaja + "?action=datakaldik").then(m => m.json()).then(k => {

        let kal = k.records;
        tabelkaldikss.innerHTML = "";
        let tabel = document.createElement("table")
        tabel.setAttribute("class", "versi-table");

        let thead = tabel.createTHead();
        let tr = thead.insertRow(0);
        let th = document.createElement("th")
        th.innerHTML = "No"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Keterangan"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Durasi (hari)"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Tanggal Mulai"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Tanggal Akhir"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Diedit Oleh";
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Aksi"
        tr.appendChild(th)
        let tbody = tabel.createTBody()
        for (let i = 0; i < kal.length; i++) {
            tr = tbody.insertRow(-1);
            let td = tr.insertCell(-1)
            td.innerHTML = i + 1;

            td = tr.insertCell(-1)
            td.innerHTML = kal[i].keterangan;
            td = tr.insertCell(-1)
            td.innerHTML = kal[i].lama;
            td = tr.insertCell(-1)
            td.innerHTML = tanggalfull(kal[i].start_tgl);
            td = tr.insertCell(-1)
            td.innerHTML = tanggalfull(kal[i].end_tgl);
            td = tr.insertCell(-1);
            td.innerHTML = kal[i].oleh;
            td = tr.insertCell(-1);
            td.innerHTML = `<button onclick="ubahtanggalini(${kal[i].idbaris})">Ubah</button><button onclick="hapustanggalini(${kal[i].idbaris})"})">Hapus</button>`;
        }
        tabelkaldikss.appendChild(tabel)
        tabelkaldikss.innerHTML += `<hr><button onclick="tambahKaldik()" class="wa"><i class="fa fa-calendar-plus-o w3-xxxlarge"></i>   Tambah Kalender</button>`

        arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
        arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

        localStorage.setItem('Kaldik', JSON.stringify(k.records));

        localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl))

        modaleditkaldik.style.display = "none";
    })



}
const kembalikantanggalini = async (ind) => {
    let konfirm = confirm("Anda yakin ingin mengembalikan kalender pendidikan tertanggal ini? \n\n Klik OK untuk mengembalikannya \n Klik CANCEL untuk membatalkan")
    if (!konfirm) {
        alert("Anda membatalkan perintah.");
        return;
    }
    modaleditkaldik.style.display = "none";
    //alert("Anda menghapus tanggal pada baris di idss = " + (ind + 2))
    let brs = ind;
    await fetch(url_kaldikaja + "?action=hapuskaldik&idbaris=" + brs, {
        method: "post"
    }).then(m => m.json())
        .then(k => {
            alert(k);

        })
        .catch(f => alert(f))

    await fetch(url_kaldikaja + "?action=datakaldik").then(m => m.json()).then(k => {

        let kal = k.records;
        tabelkaldikss.innerHTML = "";
        let tabel = document.createElement("table")
        tabel.setAttribute("class", "versi-table");

        let thead = tabel.createTHead();
        let tr = thead.insertRow(0);
        let th = document.createElement("th")
        th.innerHTML = "No"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Keterangan"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Durasi (hari)"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Tanggal Mulai"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Tanggal Akhir"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Diedit Oleh";
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Aksi"
        tr.appendChild(th)
        let tbody = tabel.createTBody()
        for (let i = 0; i < kal.length; i++) {
            tr = tbody.insertRow(-1);
            let td = tr.insertCell(-1)
            td.innerHTML = i + 1;

            td = tr.insertCell(-1)
            td.innerHTML = kal[i].keterangan;
            td = tr.insertCell(-1)
            td.innerHTML = kal[i].lama;
            td = tr.insertCell(-1)
            td.innerHTML = tanggalfull(kal[i].start_tgl);
            td = tr.insertCell(-1)
            td.innerHTML = tanggalfull(kal[i].end_tgl);
            td = tr.insertCell(-1);
            td.innerHTML = kal[i].oleh;
            td = tr.insertCell(-1);
            td.innerHTML = `<button onclick="ubahtanggalini(${kal[i].idbaris})">Ubah</button><button onclick="hapustanggalini(${kal[i].idbaris})"})">Hapus</button>`;
        }
        tabelkaldikss.appendChild(tabel)
        tabelkaldikss.innerHTML += `<hr><button onclick="tambahKaldik()" class="wa"><i class="fa fa-calendar-plus-o w3-xxxlarge"></i>   Tambah Kalender</button>`

        arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
        arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

        localStorage.setItem('Kaldik', JSON.stringify(k.records));

        localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl))

        modaleditkaldik.style.display = "none";
    })



}

const hapusabsensiswaini = (lr) => {
    //alert('oke ' + lr);
    let confir = confirm("Anda yakin ingin menghapus absen siswa ini?\n\n Klik OK untuk menghapus \n klik CANCEL untuk batal");
    if (!confir) {
        return
    }

    fetch(url_absensiswa + "?action=hapusabsensiswaini&lr=" + lr)
        .then(m => m.json())
        .then(k => {
            alert(k.result);
            refreshAbsenHariIni()
        })
        .catch(er => alert(er))
}

