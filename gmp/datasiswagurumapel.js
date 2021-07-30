function editsiswa(id) { //menampilkan modal saat user mengeklik salah satu nama di tabel data kelas
    let bt = document.getElementById("tomboledithapus")
    bt.setAttribute("onclick", "kirimeditsiswa()")
    modal_edit_siswa.style.display = "block";
    modaledithapus.style.display = "block";
    tomboledithapus.style.display = "block"
    inputtambahan.innerHTML = "";
    var tes = document.getElementById("testestestes");
    resultedit.innerHTML = "";
    let elform = document.getElementById("modaledithapus");
    elform.reset();
    elform.dieditoleh.value = namauser;
    modaledithapus.id.value = jsondatasiswa[id].id;
    modaledithapus.pd_hp.value = jsondatasiswa[id].pd_hp;
    modaledithapus.nis.value = jsondatasiswa[id].nis;
    modaledithapus.nisn.value = jsondatasiswa[id].nisn;
    modaledithapus.pd_nama.value = jsondatasiswa[id].pd_nama.toUpperCase();
    modaledithapus.pd_tl.value = jsondatasiswa[id].pd_tl.toUpperCase();;
    let t = (jsondatasiswa[id].pd_tanggallahir == "") ? "2021-01-01" : jsondatasiswa[id].pd_tanggallahir;
    let d = new Date(t);
    let tgl = d.getDate();
    let bln = d.getMonth() + 1;
    let thn = d.getFullYear();
    let jadi = thn + "-" + addZero(bln) + "-" + addZero(tgl);

    modaledithapus.pd_tanggallahir.value = jadi;//new Date("07-09-2020") ;//addZero(bln) +"-"+addZero(tgl) + "-"+thn;//`addZero(${bln}) - addZero(${tgl}) - ${thn}`;
    modaledithapus.pd_agama.value = jsondatasiswa[id].pd_agama.toUpperCase();;
    modaledithapus.pd_namaayah.value = jsondatasiswa[id].pd_namaayah.toUpperCase();;
    modaledithapus.pd_namaibu.value = jsondatasiswa[id].pd_namaibu.toUpperCase();;
    terjemahantanggal.innerHTML = "";
    terjemahantanggal.innerHTML = tanggalfull(jadi);
    aktif.value = jsondatasiswa[id].aktif;
    jenjang.value = jsondatasiswa[id].jenjang;
    nik.value = jsondatasiswa[id].nik;
    nokk.value = jsondatasiswa[id].nokk;
    pd_alamat.value = jsondatasiswa[id].pd_alamat;

    const opskelas = document.createElement("option");
    opskelas.setAttribute("value", jsondatasiswa[id].nama_rombel);
    opskelas.innerHTML = jsondatasiswa[id].nama_rombel;
    nama_rombel.innerHTML = "";
    nama_rombel.appendChild(opskelas);
    pd_jk.value = jsondatasiswa[id].pd_jk;
}
function hapussiswa(id) {
    var konfirm = confirm("Siswa ini akan dihilangkan dari kelas Anda. \n \n Tapi data masih berada di database kami. \n \n Anda yakin ingin menghapusnya? id " + id)
    if (konfirm == true) {
        var url = linkDataUserWithIdss + "&action=hapussiswa"
        $.ajax({
            crossDomain: true,
            url: url,
            dataType: 'json',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            data: 'id=' + id,
            success: async function (x) {
                alert(x);
                await fetch(linkDataUserWithIdss + "&action=datasiswaaktif&kelas=" + ruangankelas)
                    .then(m => m.json())
                    .then(k => {
                        jsondatasiswa = k.datasiswa;
                        localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(k));
                    });
                tabeldatakelassaya();
                await fetch(linkDataUserWithIdss + "&action=datasiswatidakaktif")
                    .then(m => m.json())
                    .then(k => {
                        arraysiswatidakaktif = k.datasiswa;
                        jumlahseluruhsiswadisekolah = k.total
                        localStorage.setItem("datasiswatidakaktif", JSON.stringify(k))
                    })
            },
            error: function (er) {
                alert(er);
            }
        })
    } else { alert("Anda membatalkan perintah untuk menghapus siswa Anda.") }
}

function kirimeditsiswa() { // versil lama, terbaru tanpa keterangan lama
    var namaform = document.getElementById("modaledithapus");
    namaform.style.display = "none";
    tomboledithapus.style.display = "none"
    var encode_nya = diserialkansiswa(namaform);//+ "&idss="+idspreadsheet ;//$("#modaledithapus").serialize();//
    var url = linkDataUserWithIdss + "&action=editsiswa";//script_url+"&action=updatesiswa";
    $.ajax({
        crossDomain: true,
        url: url,
        dataType: 'json',
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        data: encode_nya,
        success: async function (p) {
            $('#resultedit').html(p);
            await fetch(linkDataUserWithIdss + "&action=datasiswaaktif&kelas=" + ruangankelas)
                .then(m => m.json())
                .then(k => {
                    jsondatasiswa = k.datasiswa;
                    localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(k));
                });
            tabeldatakelassaya();
            modaledithapus.reset();
            modal_edit_siswa.style.display = "none";
        },
        error: function (er) { $("#resultedit").html(er) }
    });
}

function tmblbarutambahsiswa() { // versil lama, terbaru tanpa keterangan lama
    var namaform = document.getElementById("modaledithapus");
    namaform.style.display = "none";
    tomboledithapus.style.display = "none"
    var encode_nya = diserialkansiswa(namaform);//+ "&idss="+idspreadsheet ;//$("#modaledithapus").serialize();//
    var url = linkDataUserWithIdss + "&action=tambahtambahsiswa";//script_url+"&action=updatesiswa";
    $.ajax({
        crossDomain: true,
        url: url,
        dataType: 'json',
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        data: encode_nya,
        success: async function (p) {
            $('#resultedit').html(p);
            await fetch(linkDataUserWithIdss + "&action=datasiswaaktif&kelas=" + ruangankelas)
                .then(m => m.json())
                .then(k => {
                    jsondatasiswa = k.datasiswa;
                    localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(k));
                });
            tabeldatakelassaya();
            modaledithapus.reset();
            modal_edit_siswa.style.display = "none";
        },
        error: function (er) { $("#resultedit").html(er) }
    });
}

function cekelement(id) {
    alert(id.split("_")[1]);
    var noid = id.split("_")[1];
    var datasiswaklik = Object.keys(jsondatasiswa).filter(function (x) {
        if (jsondatasiswa[x].id == noid)
            return true
    }).map(function (x) {
        jsondatasiswa[x].pd_nama
    });
}


function updateformeditsiswa() { /// ga kepake
    var namaform = document.getElementById("modaledithapus");
    var tes = ArrayObjectPadaFormEditSiswa(namaform);
    var encode_nya = diserialkansiswa(namaform);//+ "&idss="+idspreadsheet ;//$("#modaledithapus").serialize();//

}

function ArrayObjectPadaFormEditSiswa(form) { // fungsi untuk membuat Array Object beserta value-nya dalam bentuk JSON
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
    var idsiswa_isian = koleksielement["id"].value; // menampilkan value dari attribute id.
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

    dataJSON.formDataNameOrder = JSON.stringify(buatkolomheader);
    return {
        data: dataJSON
    }
}

function diserialkansiswa(form) {
    var formData = ArrayObjectPadaFormEditSiswa(form); // menghasilkan Array Object dari FORM yang akan dikirimkan;
    var data = formData.data;
    var encoded = Object.keys(data).map(function (k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    return encoded;
}

function cetakini() {
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    tabelhasil.setAttribute("class", "versi-table");
    tabelhasil.setAttribute("id", "myTableCopy");
    var tabeleditt = document.getElementById("myTable");//.getElementsByTagName("tbody")[0];
    var cln = tabeleditt.cloneNode(true);
    tabelhasil.appendChild(cln);
    datasiswadiv.appendChild(tabelhasil);
    var tabeledithead = document.getElementById("myTableCopy").getElementsByTagName("thead")[0];
    tabeledithead.rows[0].deleteCell(1);
    var tabeledit = document.getElementById("myTableCopy").getElementsByTagName("tbody")[0];
    for (i = 0; i < tabeledit.rows.length; i++) {
        for (j = 0; j < 4; j++) {
            if (j == 1) {
                tabeledit.rows[i].deleteCell(j)
            }
        };
    }
    var tinggitabel = tabelhasil.offsetHeight * 0.0264583333;// cm;
    var kelass = ruangankelas;//document.getElementById("kelassayapilih").innerHTML;
    print("datasiswaprint,Daftar Siswa Kelas " + idNamaKelas + ",Tahun Pelajaran " + idTeksTapel + "," + "2020-7-16");
    datasiswadiv.innerHTML = "";
}

function print(x) {
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
    var titlee = document.createElement("title");
    var teksjudul = document.createTextNode("e-Lamaso")
    titlee.appendChild(teksjudul)
    headnya.appendChild(titlee);
    headnya.innerHTML += '<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">';
    var css = '@page { size: landscape;}';
    var style = document.createElement('style');
    var cssd = '.versii-table {width:950px;max-width:100%;border-collapse:collapse}.versii-table th,.versii-table td,.versii-table tr {border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versii-table th{background-color:#eee;color:blue;vertical-align:middle;text-align:center}.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}.versi-table {width:auto;max-width:100%;border-collapse:collapse}.versi-table th,.versi-table td,.versi-table tr {border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th{background-color:#eee;color:blue;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}versi-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}';
    style.type = 'text/css';
    style.media = 'print';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    var d = new Date(bulan);
    var tglakhirr = d.getDate();
    var blnakhirr = d.getMonth();
    var namabulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    var thnakhirr = d.getFullYear();
    var tglakhir = daysInMonth(blnakhirr + 1, thnakhirr);
    var namakepsekku = idNamaKepsek;
    var nipkepsekku = idNipKepsek;//document.getElementById('nipkepsek').innerHTML;
    var guruapa = idJenisGuru + " " + idgurumapelmapel;//document.getElementById("tblguru").innerHTML+" "+document.frmlogin.kelasguru.value;
    var namaguruku = namauser;//document.getElementById('namagurux').innerHTML;
    var nipguruku = idNipGuruKelas;//document.getElementById('nipgurux').innerHTML;
    headnya.appendChild(style);
    var bodynya = isi.body;
    var teksbody = document.getElementById(id).innerHTML.replace("position:sticky;position:-webkit-sticky", "").replace("box-shadow: inset 0 0 1px #000000", "");
    bodynya.innerHTML = "";
    bodynya.innerHTML = '<style>' + cssd + '</style>';
    bodynya.innerHTML += '<h1 style="text-align:center">' + h1 + '</h1>';
    bodynya.innerHTML += '<h2 style="text-align:center">' + h2 + '</h2>';
    bodynya.innerHTML += teksbody;
    bodynya.innerHTML += '<br/><br/><br/>';
    bodynya.innerHTML += '<div style="float:left;position:relative;margin-left:50px;text-align:center">Mengetahui,<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><br/><u><b>' + namakepsekku + '</b></u><br/>NIP. ' + nipkepsekku + '</div>';
    bodynya.innerHTML += '<div style="float:right;position:relative;text-align:center"> Depok , ' + tglakhir + ' ' + namabulan[blnakhirr] + ' ' + thnakhirr + '<br/>' + guruapa + '<br/><br/><br/><br/><br/><b><u>' + namaguruku + '</u></b><br/>NIP. ' + nipguruku + '</div>';

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();
}

function exceldatasiswa() {
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    tabelhasil.setAttribute("class", "versi-table");
    tabelhasil.setAttribute("id", "myTableCopy");

    var tabeleditt = document.getElementById("myTable");//.getElementsByTagName("tbody")[0];
    var cln = tabeleditt.cloneNode(true);
    tabelhasil.appendChild(cln);
    datasiswadiv.appendChild(tabelhasil);
    var tabeledithead = document.getElementById("myTableCopy").getElementsByTagName("thead")[0];
    tabeledithead.rows[0].deleteCell(1);
    var tabeledit = document.getElementById("myTableCopy").getElementsByTagName("tbody")[0];
    for (i = 0; i < tabeledit.rows.length; i++) {
        for (j = 0; j < 4; j++) {
            if (j == 1) {
                tabeledit.rows[i].deleteCell(j)
            }
        };

    }
    let countcol = tabeledithead.rows[0].cells.length;
    let brs = tabeledithead.insertRow(0)
    let sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol);
    sel.setAttribute("style", "text-align:center");
    sel.innerHTML = idNamaSekolah.toUpperCase()
    brs = tabeledithead.insertRow(1)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol)
    sel.innerHTML = "DAFTAR SISWA KELAS " + idNamaKelas.toUpperCase();
    brs = tabeledithead.insertRow(2)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol);
    sel.innerHTML = "Semester " + idSemester + " Tahun Pelajaran " + idTeksTapel
    brs = tabeledithead.insertRow(3)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol)
    let rowcount = tabeledit.rows.length;
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
        sel.innerHTML = idJenisGuru + " " + idgurumapelmapel
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
    }

    $("#myTableCopy").table2excel({
        name: " SDN Ratujaya 1",
        filename: "Data Siswa Kelas " + ruangankelas + " ID FILE " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_judul: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true
    });
    datasiswadiv.innerHTML = "";
}

const tambahsiswa = () => {
    alert("Maaf, hanya ada untuk Guru Kelas")
}
function isikantambahsiswa(index) {
    inputtambahan.style.display = "none";
    tomboledithapus.style.display = "block";
    modaledithapus.style.display = "block";
    dieditoleh.value = namauser;
    aktif.value = "aktif";
    jenjang.value = idJenjang;
    id.value = index;
    pd_nama.value = "";

    var bikinkelas = document.createElement("option");
    bikinkelas.setAttribute("id", ruangankelas)
    bikinkelas.innerHTML = ruangankelas;
    nama_rombel.appendChild(bikinkelas);
    let bt = document.getElementById("tomboledithapus")
    bt.setAttribute("onclick", "tmblbarutambahsiswa()")
}

async function aktifkansiswadikelas(encodednya) {
    let ambilid = "tombolambil" + encodednya.split("&")[0].split("=")[1]
    let url = linkDataUserWithIdss + "&action=aktifkansiswa";
    let data = new FormData();
    data.append('id', encodednya.split("&")[0].split("=")[1])
    data.append('jenjang', encodednya.split("&")[1].split("=")[1]);
    data.append('kelas', encodednya.split("&")[2].split("=")[1])
    await fetch(url, { method: 'post', body: data })
        .then(m => m.json())
        .then(k => {
            document.getElementById(ambilid).innerHTML = k;
        })
        .catch(err => alert(err))
    await fetch(linkDataUserWithIdss + "&action=datasiswaaktif&kelas=" + ruangankelas)
        .then(m => m.json())
        .then(k => {
            jsondatasiswa = k.datasiswa;
            localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(k));
        });
    tabeldatakelassaya();
    await fetch(linkDataUserWithIdss + "&action=datasiswatidakaktif")
        .then(m => m.json())
        .then(k => {
            arraysiswatidakaktif = k.datasiswa;
            jumlahseluruhsiswadisekolah = k.total
            localStorage.setItem("datasiswatidakaktif", JSON.stringify(k))
        })
}