
function hapussiswaxxxx(id) {
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


                await fetch(linkDataUserWithIdss + "&action=datasiswatidakaktif")
                    .then(m => m.json())
                    .then(k => {
                        arraysiswatidakaktif = k.datasiswa;
                        jumlahseluruhsiswadisekolah = k.total
                        localStorage.setItem("datasiswatidakaktif", JSON.stringify(k))
                    })

                updatesetelahverifikasidaftarulang()

            },
            error: function (er) {
                alert(er);
            }


        })

    } else { alert("Anda membatalkan perintah untuk menghapus siswa Anda.") }
}


function hapussiswa(id) {
    var konfirm = confirm("Siswa ini akan dihilangkan dari kelas Anda. \n \n Tapi data masih berada di database kami. \n \n Anda yakin ingin menghapusnya? id " + id)
    if (!konfirm) {
        alert("Anda membatalkan perintah hapus");
        return
    }
    //let namaheader = namatabel.rows[0].cells[8].innerHTML;
    var url = linkDataUserWithIdss + "&action=hapussiswa";
    //alert(namaheader)


    let jsonlamaanakini = jsondatasiswa.filter(s => s.id == id)[0];
    jsonlamaanakini["aktif"] = "non-aktif";



    let pus = [];
    let key = arrayheadsumber.filter(s => s !== "time_stamp");//array

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
    datakirim.append("tokensiswa", id);
    datakirim.append("idss", jlo.ss_datauser);

    let semuapendaftarulang = informasiusulandata["all"]
    let sudahdaftarulang = semuapendaftarulang.filter(s => s.id == id)
    if (sudahdaftarulang.length == 0) {
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


                await fetch(linkDataUserWithIdss + "&action=datasiswatidakaktif")
                    .then(m => m.json())
                    .then(k => {
                        arraysiswatidakaktif = k.datasiswa;
                        jumlahseluruhsiswadisekolah = k.total
                        localStorage.setItem("datasiswatidakaktif", JSON.stringify(k))
                    })

                updatesetelahverifikasidaftarulang()

            },
            error: function (er) {
                alert(er);
            }


        })

    } else {
        fetch(url_absensiswa + "?action=daftarulangduasheet", {
            method: "post",
            body: datakirim
        })
            .then(m => m.json())
            .then(r => {
                //infoloadingljk.innerHTML = r.result;
                // console.log(r)
                let datasiswakelasini = r.datasiswa.filter(s => s.nama_rombel == idNamaKelas && s.aktif == "aktif");
                // console.log(datasiswakelasini)
                jsondatasiswa = datasiswakelasini;
                localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(datasiswakelasini));

                updatesetelahverifikasidaftarulang();
                alert("Dengan fitur perubahan yang Anda lakukan, Status verifikasi sesuai dengan status verifikasi sebelumnya.")
            })
            .catch(er => {
                console.log(er);
                infoloadingljk.innerHTML = "Terjadi kesalahan";
            })




    }
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
    console.log(tes);
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
    var nipkepsekku = idNipKepsek;
    var guruapa = idJenisGuru + " " + ruangankelas;
    var namaguruku = namauser;
    var nipguruku = idNipGuruKelas;

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
    bodynya.innerHTML += '<div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ', ' + tglakhir + ' ' + namabulan[blnakhirr] + ' ' + thnakhirr + '<br/>' + guruapa + '<br/><br/><br/><br/><br/><b><u>' + namaguruku + '</u></b><br/>NIP. ' + nipguruku + '</div>';
    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();
}

function exceldatasiswa() {
    var datasiswadiv = document.getElementById("datasiswaprint");
    var tabeleditt = document.getElementById("myTable");//.getElementsByTagName("tbody")[0];
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    tabelhasil.setAttribute("class", "versi-table");
    tabelhasil.setAttribute("id", "myTableCopy");
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



function exceldatasiswaLama() {
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
    }

    $("#myTableCopy").table2excel({
        name: " SDN Ratujaya 1",
        filename: "Data Siswa Kelas " + ruangankelas + " dicetak pada " + new Date(),
        fileext: ".xlsx",
        exclude_img: true,
        exclude_judul: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true
    });
    datasiswadiv.innerHTML = "";
}
function exceldatasiswa() {
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var namatabel = document.getElementById("myTable");
    var head = namatabel.getElementsByTagName("thead")[0];
    var bodyy = namatabel.getElementsByTagName("tbody")[0];

    let html = `<table id="myTableCopy" class="versi-table">
    <tr>
        <td colspan="13"> ${idNamaSekolah.toUpperCase()}</td>
    </tr>
    <tr>
        <td colspan="13"> DATA SISWA KELAS ${idNamaKelas}</td>
    </tr>
    <tr>
        <td colspan="13"> SEMESTER ${idSemester} TAHUN PELAJARAN ${idTeksTapel}</td>
    </tr>
    <tr><td colspan="13"></td></tr>
    <tr><td colspan="13"></td></tr>
    ${head.outerHTML}
    `;
    let lr = bodyy.rows;
    //console.log(lr.length);
    // console.log(lr);
    let htmll = "";
    let isii, bersihspasi, bersihenter;
    for (let i = 0; i < lr.length; i++) {
        htmll += `<tr>`;
        let sel = lr[i].cells;
        for (let j = 0; j < sel.length; j++) {
            if (j == 1) {
                htmll += `<td>${jsondatasiswa[i].id}</td>`;
            } else if (j == 2 || j == 3 || j == 12) {
                isii = sel[j].innerHTML
                bersihspasi = isii.replace(/\s+/g, "");
                bersihenter = bersihspasi.replace(/\n/g, "");
                htmll += (sel[j].innerHTML == "") ? `<td></td>` : `<td>'${bersihenter}</td>`;
            }
            else {
                isii = sel[j].innerHTML
                bersihspasi = isii.replace(/\s+/g, "");
                bersihenter = bersihspasi.replace(/\n/g, "");
                htmll += `<td>${bersihenter}</td>`;
            }
        }
        htmll += `</tr>`;

    }

    //console.log(htmll);
    html += `${htmll}<tr><td colspan="13"></td></tr>
    <tr><td colspan="13"></td></tr>
    <tr>
    <td colspan="3">Mengetahui,</td>
    <td colspan="7"></td>
    <td colspan="3">${jlo.kota}, ${tanggalfull(new Date())}</td>
    </tr>
    <tr>
        <td colspan="3">Kepala ${idNamaSekolah}</td>
        <td colspan="7"></td>
        <td colspan="3">${idJenisGuru}  ${idNamaKelas}</td>
    </tr>
    <tr><td colspan="13"></td></tr>
    <tr><td colspan="13"></td></tr>
    <tr><td colspan="13"></td></tr>
    <tr>
        <td colspan="3"><b><u>${idNamaKepsek}</u></b></td>
        <td colspan="7"></td>
        <td colspan="3"><b><u>${namauser}</u></b></td>
    </tr><tr>
        <td colspan="3">NIP. ${idNipKepsek}</td>
        <td colspan="7"></td>
        <td colspan="3">NIP. ${idGuruKelas}</td>
    </tr></table>`;
    datasiswadiv.innerHTML = html;

    $("#myTableCopy").table2excel({
        name: " SDN Ratujaya 1",
        filename: "Data Siswa Kelas " + ruangankelas + " Tapel " + idTeksTapel.replace("/", " ") + " dicetak pada " + new Date(),
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 1,
        barisatas: 5
    });
    datasiswadiv.innerHTML = "";
};
const exportdatasiswa = () => {
    alert("Mengekspor Data Siswa Kelas Anda adalah mengekspor data berdasarkan database yang telah disimpan dan format sesuai dengan Database E-Lamaso (isi sesuai Dapodik). File ini bisa digunakan untuk mengekspor ke Tabel (jika diperlukan)");
    let datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    let html = `<table class="versi-table" id="myTableCopy"><tr>`;
    //head
    for (let i = 0; i < arrayheadsumber.length; i++) {
        html += `<td>${arrayheadsumber[i]}</td>`;
    }
    html += `</tr>`
    for (let j = 0; j < jsondatasiswa.length; j++) {
        html += `<tr>`;
        let ob = jsondatasiswa[j];
        for (k = 0; k < arrayheadsumber.length; k++) {
            let form_number = angkadistring.indexOf(arrayheadsumber[k])
            if (form_number > -1) {
                html += `<td>${(ob[arrayheadsumber[k]] == "") ? "" : "'" + ob[arrayheadsumber[k]]}</td>`;

            } else {
                html += `<td>${ob[arrayheadsumber[k]]}</td>`;

            }
        }

        html += `</tr>`
    }

    datasiswadiv.innerHTML = html;

    $("#myTableCopy").table2excel({
        name: " SDN Ratujaya 1",
        filename: "FILE EXPORT DATA SISWA KELAS " + ruangankelas + " " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 1,
        barisatas: 0
    });
    datasiswadiv.innerHTML = "";
};



const tambahsiswa = () => {
    modal_edit_siswa.style.display = "block";
    modaledithapus.style.display = "none";
    tomboledithapus.style.display = "none";
    if (arraysiswatidakaktif.length > 0) {
        inputtambahan.style.display = "block";
        inputtambahan.innerHTML = "Sebelum Anda menambahkan siswa, berikut terdapat siswa di database Kami yang belum dimasukkan ke dalam kelas. Jika memang ada, silakan pilih tombol 'Masukkan ke dalam kelas'";
        var bikintabel = document.createElement("table");
        bikintabel.setAttribute("class", "versi-table");
        var tr = bikintabel.insertRow(0);
        var td = tr.insertCell(-1);
        td.innerHTML = "No"
        var td = tr.insertCell(-1);
        td.innerHTML = "Nama"
        var td = tr.insertCell(-1);
        td.innerHTML = "Kelas Sebelumnya";
        var td = tr.insertCell(-1);
        td.innerHTML = "Masukan ke dalam kelas";
        for (i = 0; i < arraysiswatidakaktif.length; i++) {
            var tr = bikintabel.insertRow(-1);
            var td = tr.insertCell(-1);
            td.innerHTML = i + 1;
            var td = tr.insertCell(-1);
            td.innerHTML = arraysiswatidakaktif[i].pd_nama;
            var td = tr.insertCell(-1);
            td.innerHTML = arraysiswatidakaktif[i].nama_rombel;
            var td = tr.insertCell(-1);
            td.setAttribute("id", "tombolambil" + arraysiswatidakaktif[i].id);
            td.innerHTML = "";
            var tombolambil = document.createElement("button")
            tombolambil.setAttribute("onclick", "aktifkansiswadikelas('id=" + arraysiswatidakaktif[i].id + "&jenjang=" + idJenjang + "&kelas=" + ruangankelas + "')");
            tombolambil.innerHTML = "Masukan ke dalam kelas";
            td.appendChild(tombolambil);
        }
        inputtambahan.appendChild(bikintabel);
        inputtambahan.innerHTML += "<hr/> Jika tetap ingin menambahkan nama siswa. Klik tombol di bawah ini. <br/><br/>"
        var tombolambil = document.createElement("button")
        var aa = parseFloat(jumlahseluruhsiswadisekolah) + 1;
        tombolambil.setAttribute("onclick", "isikantambahsiswa(" + aa + ")");
        tombolambil.setAttribute("class", "wa");
        tombolambil.innerHTML = "Tambah Siswa";
        inputtambahan.appendChild(tombolambil);
    }
    else {
        var a = jumlahseluruhsiswadisekolah + 1;//parseFloat(jumlahseluruhsiswadisekolah)+2
        isikantambahsiswa(a)
    }
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

function editsiswalama(id) { //menampilkan modal saat user mengeklik salah satu nama di tabel data kelas
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


// dari sini mulai update edit siswa langsung dari tabel
async function editsiswa(y) {
    let konfirm = confirm("Apa Anda yakin ingin mengedit data siswa ini?\n\n Klik [OK] untuk mengedit\n\n Klik [CANCEL] untuk membatalkan");
    if (!konfirm) {
        return
    }
    // alert("Dengan menyimpan ini, Anda tidak secara langsung tidak memverifikasi");
    let namatabel = document.getElementById("myTable").getElementsByTagName("tbody")[0].rows[y];
    let xid = jsondatasiswa[y].id, xjenjang = idJenjang, xnama_rombel = idNamaKelas,
        xnis = namatabel.cells[2].innerHTML,
        xnisn = namatabel.cells[3].innerHTML, xnik = jsondatasiswa[y].nik,
        xnokk = jsondatasiswa[y].nokk, xpdnama = namatabel.cells[4].innerHTML,
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
        spdaktif = "aktif", spdeditoleh = namauser;

    let jsonlamaanakini = jsondatasiswa.filter(s => s.id == xid)[0];
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
    let key = arrayheadsumber.filter(s => s !== "time_stamp");//array

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

                alert(f);
                fetch(linkDataUserWithIdss + "&action=datasiswaaktif&kelas=" + ruangankelas)
                    .then(n => n.json())
                    .then(k => {
                        jsondatasiswa = k.datasiswa;
                        localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(k));
                        tabeldatakelassaya();
                    });


            })
            .catch(er => alert(er));
    } else {
        await fetch(url_absensiswa + "?action=daftarulangduasheet", {
            method: "post",
            body: datakirim
        })
            .then(m => m.json())
            .then(r => {
                //infoloadingljk.innerHTML = r.result;
                // console.log(r)
                let datasiswakelasini = r.datasiswa.filter(s => s.nama_rombel == idNamaKelas && s.aktif == "aktif");
                // console.log(datasiswakelasini)
                jsondatasiswa = datasiswakelasini;
                localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(datasiswakelasini));

                tabeldatakelassaya();
                alert("Dengan fitur perubahan yang Anda lakukan, Status verifikasi sesuai dengan status verifikasi sebelumnya.")
            })
            .catch(er => {
                console.log(er);
                infoloadingljk.innerHTML = "Terjadi kesalahan";
            })
    }
    //infoloadingljk.innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"/></p>`


    // console.log(jsonlamaanakini);
    // let statussebelumnya = jsonlamaanakini.usulanperubahandata;
    // if (statussebelumnya.indexOf("disetujui") > -1) {
    //     jsonlamaanakini.usulanperubahandata = "Ajuan Ke-" + (parseInt(statussebelumnya.match(/(\d+)/)[0])) + "disetujui dan isian dibantu guru ke-" + parseInt(statussebelumnya.match(/(\d+)/)[0]) + 1;
    // } else {
    //     jsonlamaanakini.usulanperubahandata = statussebelumnya;
    // }

    // data.append("jenjang", xjenjang);
    // data.append("nama_rombel", xnama_rombel);
    // data.append("nis", xnis);
    // data.append("nisn", xnisn);
    // data.append("nik", xnik);
    // data.append("nokk", xnokk);
    // data.append("pd_nama", xpdnama);
    // data.append("pd_jk", xpdjk);
    // data.append("pd_tl", xpdtl);
    // data.append("pd_tanggallahir", xpdtgl);
    // data.append("pd_agama", spdagama);
    // data.append("pd_namaayah", spdayah);
    // data.append("pd_namaibu", spdibu);
    // data.append("pd_alamat", spdalamat);
    // data.append("pd_hp", spdhp);
    // data.append("aktif", spdaktif);
    // data.append("dieditoleh", spdeditoleh);





}

const editttl = (brs) => {
    //alert("baris ke=" + brs);

    modaltanggal.style.display = "block";
    let namatabel = document.getElementById("myTable").getElementsByTagName("tbody")[0];
    let namaheader = namatabel.rows[brs].cells[4].innerHTML;
    let tekstanggal = (namatabel.rows[brs].cells[8].innerHTML == "") ? "1 Juli " + (new Date().getFullYear() - 12) : namatabel.rows[brs].cells[8].innerHTML;

    //console.log(tekstanggal);

    let tgl = formatbalikin(tekstanggal);
    let balikintanggal = StringTanggal2(new Date(tgl));
    //let teks = "ini data headerr yang diklik adalah " + namaheader;

    let teks = "<h3 class='w3-center'>Ubah Tanggal Lahir atas nama<br/>" + namaheader + "</h3>";

    teks += `<input type="date" class="w3-input" id="valuetanggal" onchange="modalubahtanggal()" value="${balikintanggal}"/>`
    teks += `<hr/><span id="translettgl">${tanggalfull(tgl)}</span><hr/>`;
    teks += `<button onclick="tanggaloke(${brs},8)">Simpan</button><hr/>`;
    teks += `<button onclick="hapustanggal(${brs},8)">Hapus</button><hr/>`;
    //

    dataubahtanggal.innerHTML = teks;
}

const editdataagamasiswa = (brs) => {
    //alert("baris ke=" + brs);

    modalagama.style.display = "block";
    let namatabel = document.getElementById("myTable").getElementsByTagName("tbody")[0];
    let elsel = document.getElementById("pd_agama_modal");
    elsel.value = namatabel.rows[brs].cells[6].innerHTML;
    elsel.setAttribute("onchange", `chgagamasiswa(${brs})`)
}
const chgagamasiswa = (z) => {
    let namatabel = document.getElementById("myTable").getElementsByTagName("tbody")[0];
    let elsel = document.getElementById("pd_agama_modal");
    let y = elsel.options;
    let x = elsel.selectedIndex;
    // alert(y[x].value + " " + y[x].text);
    namatabel.rows[z].cells[6].innerHTML = y[x].value;

    modalagama.style.display = "none";



}


function formatbalikin(tekss) {
    let teks = tekss.toString();
    let str = teks.split(" ");
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    let date = new Date(str[2], bulan.indexOf(str[1]), str[0]);
    return date;
}

const hapustanggal = (r, c) => {
    let namatabel = document.getElementById("myTable").getElementsByTagName("tbody")[0];;
    namatabel.rows[r].cells[c].innerHTML = "";
}

const modalubahtanggal = () => {
    let el = document.getElementById("valuetanggal");//.getElementsByTagName("tbody")[0];;
    document.getElementById("translettgl").innerHTML = tanggalfull(el.value);
}
const tanggaloke = (r, c) => {
    let namatabel = document.getElementById("myTable").getElementsByTagName("tbody")[0];;

    let tanggal = document.getElementById("valuetanggal");

    namatabel.rows[r].cells[c].innerHTML = tanggalfull(tanggal.value);

    tutupmodaltanggal.click();
}

const StringTanggal2 = (tgl) => { //parameter tgl bentuk tgl
    let m = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let y = tgl.getFullYear();


    let string = y + "-" + addZero(m) + "-" + addZero(d);


    //console.log(string)
    return string
}

