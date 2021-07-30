$(document).ready(function () {
    // Timer
    (function ($) {
        $.extend({
            APP: {
                formatTimer: function (a) {
                    if (a < 10) {
                        a = '0' + a;
                    }
                    return a;
                },
                startTimer: function (dir) {
                    var a;
                    // save type
                    $.APP.dir = dir;
                    // get current date
                    $.APP.d1 = new Date();
                    switch ($.APP.state) {
                        case 'pause':
                            // resume timer
                            // get current timestamp (for calculations) and
                            // substract time difference between pause and now
                            $.APP.t1 = $.APP.d1.getTime() - $.APP.td;
                            break;
                        default:
                            // get current timestamp (for calculations)
                            $.APP.t1 = $.APP.d1.getTime();
                            // if countdown add ms based on seconds in textfield
                            if ($.APP.dir === 'cd') {
                                $.APP.t1 += parseInt($('#cd_seconds').val()) * 60000;
                            }
                            break;
                    }
                    // reset state
                    $.APP.state = 'alive';
                    $('#' + $.APP.dir + '_status').html('Durasi Waktu Masih Berjalan');
                    // start loop
                    $.APP.loopTimer();
                },
                pauseTimer: function () {
                    // save timestamp of pause
                    $.APP.dp = new Date();
                    $.APP.tp = $.APP.dp.getTime();
                    // save elapsed time (until pause)
                    $.APP.td = $.APP.tp - $.APP.t1;
                    // change button value
                    $('#' + $.APP.dir + '_start').val('Berhenti dari Jeda');
                    // set state
                    $.APP.state = 'pause';
                    $('#' + $.APP.dir + '_status').html('Jeda');
                },
                stopTimer: function () {
                    // change button value
                    $('#' + $.APP.dir + '_start').val('Mulai Lagi');
                    // set state
                    $.APP.state = 'stop';
                    $('#' + $.APP.dir + '_status').html('Selesai');

                },
                resetTimer: function () {
                    // reset display
                    $('#' + $.APP.dir + '_ms,#' + $.APP.dir + '_s,#' + $.APP.dir + '_m,#' + $.APP.dir + '_h').html('00');
                    // change button value
                    $('#' + $.APP.dir + '_start').val('Mulai Lagi!');
                    // set state
                    $.APP.state = 'reset';
                    $('#' + $.APP.dir + '_status').html('Setel ulang waktu untuk mengerjakan');
                },
                endTimer: function (callback) {
                    // change button value
                    $('#' + $.APP.dir + '_start').val('Mulai Lagi');
                    // set state
                    $.APP.state = 'end';
                    // invoke callback
                    if (typeof callback === 'function') {
                        callback();
                        // tambahan
                        let x = parseFloat(indekmaterionline.innerHTML)
                        hasilakhirelamaso(x);
                    }

                },
                loopTimer: function () {
                    var td;
                    var d2, t2;
                    var ms = 0;
                    var s = 0;
                    var m = 0;
                    var h = 0;
                    if ($.APP.state === 'alive') {
                        // get current date and convert it into 
                        // timestamp for calculations
                        d2 = new Date();
                        t2 = d2.getTime();
                        // calculate time difference between
                        // initial and current timestamp
                        if ($.APP.dir === 'sw') {
                            td = t2 - $.APP.t1;
                            // reversed if countdown
                        } else {
                            td = $.APP.t1 - t2;
                            if (td <= 0) {
                                // if time difference is 0 end countdown
                                $.APP.endTimer(function () {
                                    $.APP.resetTimer();
                                    $('#' + $.APP.dir + '_status').html('Ulangi Latihan');
                                });
                            }
                        }
                        // calculate milliseconds
                        ms = td % 1000;
                        if (ms < 1) {
                            ms = 0;
                        } else {
                            // calculate seconds
                            s = (td - ms) / 1000;
                            if (s < 1) {
                                s = 0;
                            } else {
                                // calculate minutes   
                                var m = (s - (s % 60)) / 60;
                                if (m < 1) {
                                    m = 0;
                                } else {
                                    // calculate hours
                                    var h = (m - (m % 60)) / 60;
                                    if (h < 1) {
                                        h = 0;
                                    }
                                }
                            }
                        }
                        // substract elapsed minutes & hours
                        ms = Math.round(ms / 100);
                        s = s - (m * 60);
                        m = m - (h * 60);
                        // update display
                        $('#' + $.APP.dir + '_ms').html($.APP.formatTimer(ms));
                        $('#' + $.APP.dir + '_s').html($.APP.formatTimer(s));
                        $('#' + $.APP.dir + '_m').html($.APP.formatTimer(m));
                        $('#' + $.APP.dir + '_h').html($.APP.formatTimer(h));
                        // loop
                        $.APP.t = setTimeout($.APP.loopTimer, 1);
                    } else {
                        // kill loop
                        clearTimeout($.APP.t);
                        return true;

                    }

                }

            }

        });


        //$('#cd_start,#timermulai').live('click', function() { //LAMASO ASLI
        $('#cd_start').live('click', function () { //LAMASO ASLI
            $.APP.startTimer('cd');
            //mulaibelajar();
        });
        $('#cd_stop,#selesaingambang').live('click', function () { //LAMASO ASLI
            //$.APP.stopTimer();
            $.APP.resetTimer();
            let x = parseFloat(indekmaterionline.innerHTML)
            hasilakhirelamaso(x);
            $('html,body').animate({
                scrollTop: $("#hasilakhir").offset().top
            }, 1000);

        });
        $('#cd_reset').live('click', function () {
            $.APP.resetTimer();
        });
        $('#cd_pause').live('click', function () {
            $.APP.pauseTimer();
        });

    })(jQuery);

})



const previewriwayat = (par) => {
    //alert (par);
    // let domTabel = document.querySelector(".tabelmaterihariini");
    // domTabel.rows[(par + 1)].cells[6].innerHTML = `<i class="fa fa-refresh fa-spin"></i>`

    indekmaterionline.innerHTML = par;
    tescekelement.innerHTML = "";
    let datamateri = JSON.parse(localStorage.getItem("materi"));
    kodebarismateriyangdikerjakan = datamateri[par].idbaris;

    loadingmodal.style.display = "block";
    var idm = encodeURIComponent(datamateri[par].idmateri);
    let tes = document.querySelector(".kontenmateri"); //document.getElementById("lamanmateri");   
    infoloadingljk.innerHTML = "";
    tes.innerHTML = "<i class='fa fa-spin fa-spinner w3-xxxlarge'  ></i>";
    document.querySelector(".kontenmateri").style.display = "block";
    //bikin judul h4
    var judul = document.createElement("h4")
    judul.setAttribute("class", "w3-center");
    judul.innerHTML = "Identitas e-Lamaso";
    tes.innerHTML = ""
    tes.appendChild(judul);

    //-- Bikin Tabel identitas:
    var tabelidentitas = document.createElement("table");
    tabelidentitas.setAttribute("class", "versi-table");
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
    td.innerHTML = namasiswa
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kelas"
    var td = tr.insertCell(-1);
    td.innerHTML = namakelas;
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
        keteranganakses = "LATIHAN<br>Berapa kali saja untuk latihan"
    }
    td.innerHTML = keteranganakses;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Tanggal Publikasi"
    var td = tr.insertCell(-1);
    td.innerHTML = tanggalfulllengkap(datamateri[par].idtgl);

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
    cel1.innerHTML += ":";
    cel1.appendChild(cdmenit);
    cel1.appendChild(titikdua)
    cel1.appendChild(cddetik);

    tes.appendChild(tabelidentitas)

    $.getJSON(urlnilai + "?idmateri=" + idm + "&action=previewriwayat", function (json) {
        loadingmodal.style.display = "none";
        //$("#output").html(brkline(json))
        // document.getElementById("judulpetunjuk").innerHTML = "Preview e-Lamaso";
        //        document.getElementById("isipetunjuk").innerHTML = brkline(json);
        document.querySelector(".kontenmateri").innerHTML += brkline(json);

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

        //document.querySelector(".kontenmateri").innerHTML += `<button class="wa" onclick="hasilakhirelamaso(${par})">Selesai</button>`
        tampilinsublamansiswa(4);
        //aktifkan timer:
        $.APP.startTimer('cd');
        var adaselini = document.getElementById("selwaktumulai");
        if (adaselini == null) {
            var tabel = document.getElementById("tabelku");
            var brs = tabel.insertRow(4);
            var sel = brs.insertCell(-1);
            sel.setAttribute("id", "selwaktumulai");
            sel.innerHTML = "Waktu Mulai";
            var sel = brs.insertCell(-1);
            sel.innerHTML = waktusekarang();
        } else {
            var tabel = document.getElementById("tabelku");
            tabel.rows[4].cells[0].innerHTML = "Waktu Mulai";
            tabel.rows[4].cells[1].innerHTML = waktusekarang();

        }
        document.querySelector(".kontenmateri").innerHTML += `<button class="wa" onclick="hasilakhirelamaso(${par})">Selesai</button>`

    })


}


function mulaibelajar() {
    materiimport.style.display = "block";
    previewloginsiswa.style.display = "none";
    tes.style.display = "block";
    hasilakhir.style.display = "none";
    materiimport.innerHTML = "<i class='fa fa-spin fa-spinner w3-xxxlarge'  ></i>";
    //bikin judul h4
    var judul = document.createElement("h4")
    judul.setAttribute("class", "w3-center");
    judul.innerHTML = "Identitas e-Lamaso";
    tes.innerHTML = ""
    tes.appendChild(judul);

    //-- Bikin Tabel identitas:
    var tabelidentitas = document.createElement("table");
    tabelidentitas.setAttribute("class", "versi-table");
    tabelidentitas.setAttribute("style", "margin:auto");
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "ID Token"
    var td = tr.insertCell(-1);
    td.innerHTML = keyidToken.innerHTML;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Sekolah"
    var td = tr.insertCell(-1);
    td.innerHTML = keyidSekolah.innerHTML;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Nama Siswa"
    var td = tr.insertCell(-1);
    td.innerHTML = previewpilihnama.value;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kelas"
    var td = tr.insertCell(-1);
    td.innerHTML = keykelas.innerHTML;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Mapel/Tema"
    var td = tr.insertCell(-1);
    td.innerHTML = keymapel.innerHTML;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Frekuensi Akses"
    var td = tr.insertCell(-1);
    var keteranganakses;;
    if (keyaksessiswa.innerHTML == "sekali") {
        keteranganakses = "TEST <br>Sekali saja sejak mengirim nilai"
    } else {
        keteranganakses = "LATIHAN <br>Berapa kali saja untuk latihan"
    }
    td.innerHTML = keteranganakses;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Tanggal Publikasi"
    var td = tr.insertCell(-1);
    td.innerHTML = formattanggallengkap(keypublikasi.innerHTML);

    var tr = tabelidentitas.insertRow(-1);
    var cel1 = tr.insertCell(-1);
    cel1.setAttribute("id", "timer");
    cel1.setAttribute("colspan", "2");
    cel1.setAttribute("style", "text-align:center");
    cel1.innerHTML = "Timer: ";
    var cdtimer = document.createElement("input")
    cdtimer.setAttribute("id", "cd_seconds");
    cdtimer.setAttribute("disabled", "true");
    cdtimer.setAttribute("value", keydurasi.innerHTML);
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
    cel1.innerHTML += ":";
    cel1.appendChild(cdmenit);
    cel1.appendChild(titikdua)
    cel1.appendChild(cddetik);

    tes.appendChild(tabelidentitas)

    var usersekolah = keysekolah.innerHTML
    var alt_url;
    if (usersekolah == "SDN Ratujaya 1") {
        alt_url = script_url;
    } else {
        alt_url = script_url2;
    }

    //panggil jsonmateri:
    var id = keyidmateri.innerHTML;
    var idm = encodeURIComponent(id);
    var en = "idmateri=" + idm;
    //var url = script_url + "?" + en + "&action=previewriwayat";
    var url = alt_url + "?" + en + "&action=previewriwayat";


    $.getJSON(url, function (json) {
        //$("#output").html(brkline(json))
        //document.getElementById("isipetunjuk").innerHTML = brkline(json);
        materiimport.innerHTML = brkline(json);
        $.APP.startTimer('cd');
        tambahtombolisijawaban();
        var adaselini = document.getElementById("selwaktumulai");
        if (adaselini == null) {
            var tabel = document.getElementById("tabelku");
            var brs = tabel.insertRow(4);
            var sel = brs.insertCell(-1);
            sel.setAttribute("id", "selwaktumulai");
            sel.innerHTML = "Waktu Mulai";
            var sel = brs.insertCell(-1);
            sel.innerHTML = waktusekarang();
        }

        var adadivngambang = document.getElementById("selesaingambang");
        if (adadivngambang == null) {
            var divngambang = document.createElement("div");
            divngambang.setAttribute("id", "selesaingambang");
            divngambang.setAttribute("style", "border:1px solid black;width:50%;top:46px;text-align:center;position:fixed;cursor:pointer;left:10%;background-color:black;color:white;");
            divngambang.innerHTML = "<i class='fa fa-clock-o'></i>  Belajar Selesai";
            materiimport.appendChild(divngambang);
        }

    })

    ///--- Kondisi untuk menampilkan hasil belajar  ------////
    // Kondisi awal, dihidden



    //cektugasdansoal();



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
            katajadi = Q_PG; //+ "<hr style='border-top:1px solid olive'/>";

        } else if (asal.indexOf("_OPSI-PG_") > -1) {
            var opsipg = "";
            var arpgg = asal.replace("_OPSI-PG_", ""); // hasilnya: 1A teks pertanyaan bla bla bla
            var arpg = arpgg.split(" "); //hasilnya: 0=1A 1=teks 2=pertanyaan ... dst.
            var idopsi = arpg[0]; // hasilnya: 1A
            //var abjad = idopsi.slice(1, 2); // hasilnya A
            //var nosoal = idopsi.slice(0, 1); // hasilnya 1
            var nosoal = idopsi.match(/(\d+)/)[0]; //parseInt(idopsi);
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
            var nosoal = idopsi.match(/(\d+)/)[0]; //parseInt(idopsi);
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
            katajadi += "<img src='/img/lamaso.webp'  style='width:145px;margin:auto;border:1px solid blue'/>";
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
            //basekunci = arrkunci;//window.btoa(arrkunci);
            localStorage.setItem("keybase", basekunci)
            //localStorage.setItem("artikeybase", window.atob(basekunci))

            //   var keypg = document.getElementById("keypg");
            //     keypg.setAttribute("style", "display:none")

            //   //var teksscript = document.createTextNode("var keybase='"+basekunci+"'");
            //   //	keypg.appendChild(teksscript);
            //   keypg.innerHTML = "var keybase='" + basekunci + "'";
            //   tttkeybase.innerHTML = basekunci;

        } else if (asal.indexOf("_KUNCI-KD_") > -1) {
            //REPLACE DULU = misal: _KUNCI-PG_1A, 2B, 3C<kalo adaspasi>
            var tekskunci = asal.replace("_KUNCI-KD_", "").replace(/\s+/g, "").split("<||>"); //.split(":");
            let ar = []
            let ob = {};
            for (i = 0; i < tekskunci.length; i++) {

                // ob[tekskunci[i].split(":")[0]] = tekskunci[i].split(":")[1].split(",");
                ob[tekskunci[i].split(":")[0]] = tekskunci[i].split(":")[1].replace("[", "").replace("]", "").split(",");
                ar.push(ob)
            }
            localStorage.setItem("kuncikd", JSON.stringify(ob)); // ---> sudah objek array



        } else {
            var katakonversi = katajadireplace(asal);
            katajadi += katakonversi + "<br/>";

        }
        inn += katajadi; //+ "&lt;br/&gt;" ;
    }


    return inn
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


        } else if (splitTeks[i].indexOf("_PANGKAT-HURUF_") > -1) {
            var a = splitTeks[i].replace("_PANGKAT-HURUF_", "").split("/")[0];
            var b = splitTeks[i].replace("_PANGKAT-HURUF_", "").split("/")[1];
            //katajadi += " <img src='https://chart.apis.google.com/chart?cht=tx&chl=%5C" + a + "^" + b + "%20&chf=bg%2Cs%2CFFFFFF80&chco=000000' /> "
            katajadi += a + "<sup>" + b + "</sup>";

        } else if (splitTeks[i].indexOf("_EQUATION-LAINNYA_") > -1) {
            var a = splitTeks[i].replace("_EQUATION-LAINNYA_", "");
            var b = decodeURIComponent(a);
            //var c = decodeURIComponent(b);
            katajadi += " <img src='https://chart.apis.google.com/chart?cht=tx&chl=" + b + "%20&chf=bg%2Cs%2CFFFFFF80&chco=000000' /> "


        } else if (splitTeks[i].indexOf("_YOUTUBE_") > -1) {
            var linkyoutube, konv, konv2, konv3;
            konv = splitTeks[i].replace("_YOUTUBE_", "<br/><div class='containerbaru w3-center'><iframe class='responsive-iframebaru ' src='")
            konv2 = konv.replace("https://youtu.be/", "https://www.youtube.com/embed/"); // kalo link awalnya https://youtu.be/ 
            konv3 = konv2.replace("watch?v=", "embed/"); // jika diambil dari https://www.youtube.com/
            linkyoutube = konv3 + "' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div><br/>";

            katajadi += linkyoutube;

        } else if (splitTeks[i].indexOf("_OPSI-SEL_") > -1) {
            var splitteks = splitTeks[i].replace("_OPSI-SEL_", "").split(" ");
            var id = splitteks[0]; //4A

            //var abjad = id.slice(1, 2); //B
            var id = splitteks[0].replace(/\s+/g, ""); //4A

            var abjad = (id.length == 2) ? id.slice(1, 2) : id.slice(2, 3); //B
            var nosoal = id.match(/(\d+)/)[0]; // id.slice(0, 1); //nosoal 4
            var innteks = "<input class='calc' type='radio' style='display:none' name='soal" + nosoal + "' id='" + id + "'/><label class='opsi' for='" + id + "'>" + abjad + "</label>"

            katajadi += innteks;
        } else if (splitTeks[i].indexOf("_PHI_") > -1) {
            katajadi += `<img src="https://chart.apis.google.com/chart?cht=tx&amp;chl=%5Cpi%20&amp;chf=bg%2Cs%2CFFFFFF100&amp;chco=000000">`
        } else if (splitTeks[i].indexOf('display:none') > -1) {
            katajadi += splitTeks[i].replace("display:none", "display:block");

        } else if (splitTeks[i].indexOf('tombolkirimnilaielamaso()') > -1) {
            katajadi += splitTeks[i].replace("tombolkirimnilaielamaso()", "alert('Maaf, tombol dinonaktirkan')");

        } else {
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

function tombolkirimnilaielamaso() {



    //var namaform = document.kirimnilaielamaso;
    hasilakhir.style.display = "none";
    hasilbelajarsekali.style.display = "block";
    tescekelement.innerHTML = " Sedang Proses Kirim ... <i fa-spin fa-spinner w3-xxxlarge></i>"
    //var res = KoleksiFormSiswa(namaform);
    // //var kirimdataini = encodeURIComponent(JSON.stringify(res.data));
    //var kirimdataini = new URLSearchParams(res.data);
    var kirimdataini = $("#kirimnilaielamaso").serialize();
    //var encode_nya = new FormData(namaform)
    var xhr = new XMLHttpRequest
    xhr.open("POST", urlnilai + "?action=siswakirimnilai", true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4 && xhr.status === 200) {

            document.getElementById("resumenilai").removeAttribute("style");
            document.getElementById("resumenilai").setAttribute("style", "display:block");
            resumenilai.innerHTML = "";
            resumenilaiskhir.innerHTML = "";

            tescekelement.innerHTML = "Server berhasil merespon dengan pesan: " + JSON.parse(xhr.responseText).result; //"Terima Kasih, Ananda telah menyelesaikan pembelajaran ini dengan hasil:<br/>Skor PG = " + nilaiPGku.innerHTML; //+ xhr.responseText ;
            setTimeout(function () {
                tescekelement.innerHTML = "";
                let id = parseInt(indekmaterionline.innerHTML);
                //cekkerjaan(id);
                document.getElementById("hasilakhir").style.display = "none";
                panggilmateri();

            }, 2000)
        } else {
            tescekelement.innerHTML = "Gagal merespon.."
        }
    };
    // url encode form data for sending as post data

    xhr.send(kirimdataini);

    // // var usersekolah = keysekolah.innerHTML
    // $.ajax({
    //     crossDomain: true,
    //     url: urlnilai+"?action=siswakirimnilai",
    //     dataType: 'json',
    //     method: 'POST',
    //     contentType: 'application/x-www-form-urlencoded',
    //     data: res,
    //     success: function(p){
    //         console.log(p)
    //     },
    //     error: function(er){
    //         // tescekelement.innerHTML = er
    //         console.log(er)
    //     }

    // });
}


function KoleksiFormSiswa(form) {
    //--------- mendefinisikan beberapa element
    var koleksielement = form.elements;
    //--------- element yang digunakan untuk element spam
    var koleksispam;


    var bidangdata = Object.keys(koleksielement)
        .filter(function (k) {
            if (koleksielement[k].name === "koleksispam") {
                koleksispam = koleksielement[k].value;
                return false;
            }
            return true;
        })
        .map(function (k) {
            if (koleksielement[k].name !== undefined) {
                return koleksielement[k].name;
            } else if (koleksielement[k].length > 0) {
                return koleksielement[k].item(0).name;
            }
        }).filter(function (item, pos, self) {
            return self.indexOf(item) == pos && item;
        });
    // console.log(bidangdata);
    var Dataform = {};
    bidangdata.forEach(function (name) {
        var element = koleksielement[name];
        // jika datanya memiliki satu nilai (value), biasanya berupa teks dalam value.
        Dataform[name] = element.value;

        // ketika data value-nya bukan teks, seperti value pada tag input type radio, atau tag select, maka dibuatkan array lagi dengan fungsi tambah array [.push('new Array')
        if (element.length) {
            var data = [];
            for (var i = 0; i < element.length; i++) {
                var item = element.item(i);
                if (item.checked || item.selected) {
                    data.push(item.value);
                }
            }
            // console.log(data);
            Dataform[name] = data.join(', ');
        }
    });

    //Dataform.formDataNameOrder = JSON.stringify(bidangdata);
    //Dataform.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    //Dataform.formGoogleSendEmail = form.dataset.email || ""; // no email by default

    return {
        data: Dataform
    }; //, koleksispam: koleksispam};
}


function tombolketikjawaban(id) {
    //alert("Tombol ketik Jawbaan No " + id)
    var tempatnya = document.getElementById("tomboljawaban" + id)
    tempatnya.innerHTML = "";
    var teksarea = document.createElement("textarea");
    teksarea.setAttribute("class", "filejawaban");
    teksarea.setAttribute("id", "filejawaban" + id);
    teksarea.setAttribute("cols", "30");
    teksarea.setAttribute("rows", "10");
    teksarea.setAttribute("placeholder", "Silakan ketik jawaban essay untuk No. Soal " + id);
    tempatnya.appendChild(teksarea);
    tempatnya.innerHTML += "<br/>Ganti dengan mengupload media:";
    var tombollain = document.createElement("button")
    tombollain.setAttribute("onclick", "tomboluploadjawaban('" + id + "')");
    tombollain.innerHTML = "Upload Jawaban No " + id
    tempatnya.appendChild(tombollain);
    tempatnya.innerHTML += "<sub> dengan memilih cara lain, jawaban yang sudah diketik akan hilang dan diganti dengan jawaban berupa gambar/media yang diunggah</sub>"


}

function tombolketikjawaban2(id) {
    //alert("Tombol ketik Jawbaan No " + id)
    var tempatnya = document.getElementById("tomboljawaban" + id)
    tempatnya.innerHTML = "";
    var teksarea = document.createElement("textarea");
    teksarea.setAttribute("class", "filejawaban");
    teksarea.setAttribute("id", "filejawaban" + id);
    teksarea.setAttribute("cols", "30");
    teksarea.setAttribute("rows", "10");
    teksarea.setAttribute("placeholder", "Silakan ketik jawaban essay untuk No. Soal " + id);
    tempatnya.appendChild(teksarea);
    tempatnya.innerHTML += "<br/>Ganti dengan mengupload media:";
    var tombollain = document.createElement("button")
    tombollain.setAttribute("onclick", "tomboluploadjawaban2('" + id + "')");
    tombollain.innerHTML = "Upload Jawaban No " + id
    tempatnya.appendChild(tombollain);
    tempatnya.innerHTML += "<sub> dengan memilih cara lain, jawaban yang sudah diketik akan hilang dan diganti dengan jawaban berupa gambar/media yang diunggah</sub>"


}


function tomboluploadjawaban(id) {
    //alert("Tombol Upload Jawbaan No " + id)
    var tempatnya = document.getElementById("tomboljawaban" + id);
    var katajadi = "";
    tempatnya.innerHTML = "";
    //	var divbackground = document.createElement("div");
    //		divbackground.setAttribute("style","background-color:#ffcdc9;padding:10px");
    //		divbackground.innerHTML = "Upload Media(Poto, audio, video, pdf, word/txt, dll) jawaban essay No " + id + " dengan menguploadnya di sini: <br/><br/>";
    //			var labelupload = document.createElement("label");
    //				labelupload.setAttribute("style", "border:1px solid black;background-color:#eee;padding:5px;border-radius:5px");
    //				labelupload.setAttribute("for",

    katajadi += "<div style='background-color:#ffcdc9;padding:10px'>Upload Media(Poto, audio, video, pdf, word/txt, dll) jawaban essay No";
    katajadi += " " + id + " dengan menguploadnya di sini: <br/><br/>";
    katajadi += "<label style='border:1px solid black;background-color:#eee;padding:5px;border-radius:5px' for='iduploadpotoessay" + id + "' id='label" + id + "'><i class='fa fa-camera'></i> Upload Jawaban</label><br/><br/>";
    katajadi += "<div id='filejawaban" + id + "' class='filejawaban' style='overflow-x:auto'>";
    katajadi += "<img src='/img/lamaso.webp'  style='width:145px;margin:auto;border:1px solid blue'/>";
    katajadi += "</div>";

    //katajadi += `<input type='file' id='iduploadpotoessay${id}' onchange='uploadpotoessay("${id}")' style='display:none'/>`;//"<input type='file' id='iduploadpotoessay" + id + "' onchange='uploadpotoessay(" + id + ")' style='display:none'/>"; //<div  id='filejawaban"+indexpotojawaban+"' class='jawabanfile' style='display:none' ></div>"
    katajadi += `<input id='iduploadpotoessay${id}' onclick='uploadpotoessay("${id}")' style='display:none'/>`; //"<input type='file' id='iduploadpotoessay" + id + "' onchange='uploadpotoessay(" + id + ")' style='display:none'/>"; //<div  id='filejawaban"+indexpotojawaban+"' class='jawabanfile' style='display:none' ></div>"
    katajadi += "</div>";
    //-----------------------------
    katajadi += "<br/>Ganti dengan mengetik jawaban:";
    katajadi += `<button onclick='tombolketikjawaban("${id}")'>Ketik Jawaban No. ${id}</button>`; //"<button onclick='tombolketikjawaban(" + id + ")'>Ketik Jawaban No. " + id + "</button>";
    katajadi += "<sub> dengan memilih cara lain, jawaban yang sudah  diupload akan hilang dan diganti dengan jawaban berupa ketikan/tulisan</sub>"
    //-----------------------------
    tempatnya.innerHTML = katajadi;
}


function tomboluploadjawaban2(id) {
    //alert("Tombol Upload Jawbaan No " + id)
    var tempatnya = document.getElementById("tomboljawaban" + id);
    var katajadi = "";
    tempatnya.innerHTML = "";


    katajadi += "<div style='background-color:#ffcdc9;padding:10px'>Upload Media(Poto, audio, video, pdf, word/txt, dll) jawaban essay No";
    katajadi += " " + id + " dengan menguploadnya di sini: <br/><br/>";
    katajadi += "<label style='border:1px solid black;background-color:#eee;padding:5px;border-radius:5px' for='iduploadpotoessay" + id + "' id='label" + id + "'><i class='fa fa-camera'></i> Upload Jawaban</label><br/><br/>";
    katajadi += "<div id='filejawaban" + id + "' class='filejawaban' style='overflow-x:auto'>";
    katajadi += "<img src='/img/lamaso.webp'  style='width:145px;margin:auto;border:1px solid blue'/>";
    katajadi += "</div>";

    katajadi += `<input type='file' id='iduploadpotoessay${id}' onchange='uploadpotoessay2("${id}")' style='display:none'/>"`; //<div  id='filejawaban"+indexpotojawaban+"' class='jawabanfile' style='display:none' ></div>"
    katajadi += "</div>";
    //-----------------------------
    katajadi += "<br/>Ganti dengan mengetik jawaban:"
    katajadi += `<button onclick='tombolketikjawaban2("${id}")'>Ketik Jawaban No. ${id}</button>`
    katajadi += '<sub> dengan memilih cara lain, jawaban yang sudah  diupload akan hilang dan diganti dengan jawaban berupa ketikan/tulisan</sub>'
    //-----------------------------
    tempatnya.innerHTML = katajadi;
}


function uploadpotoessay2(id) { //fungsi dipindahkan ke uploadmedia.js
    var item = document.getElementById("iduploadpotoessay" + id).files[0];
    var tempat = document.getElementById("filejawaban" + id);
    tempat.innerHTML = ""
    var ofReader = new FileReader();
    ofReader.readAsDataURL(item);
    var resize_width = "150"
    ofReader.onload = function (e) {
        // --- convert image ====
        ofReader.size = item.size; //get the image's size


        var src = e.target.result;
        document.getElementById("filejawaban" + id).innerHTML = src;
        var base64 = e.target.result.replace(/^.*,/, '');
        var typeasal = e.target.result.match(/^.*(?=;)/)[0];
        var typenyaaja = typeasal.replace("data:", "");
        if (typenyaaja.indexOf("image") > -1) {
            tempat.innerHTML = "<img id='image" + id + "' src='" + src + "' style='width:500px; border:1px solid blue; padding:5px; border-radius:10px'/><br/>tipe gambar: " + typenyaaja.split("/")[1];
        } else if (typenyaaja.indexOf("video") > -1) {
            tempat.innerHTML = "<video id='myvideo" + id + "' width='350' height='200'  poster='/img/lamaso.webp' controls><source src='" + src + "' type='" + typenyaaja + "' />Browser Anda tidak mendukung/format video tidak mendukung</video>";
        } else if (typenyaaja.indexOf("audio") > -1) {
            tempat.innerHTML = "<video id='myaudio" + id + "' width='350' height='200'  poster='/img/lamaso.webp' controls><source src='" + src + "' type='" + typenyaaja + "' />Browser Anda tidak mendukung/format video/audio tidak mendukung</video>";
        } else if (typenyaaja.indexOf("wordprocessingml") > -1) {
            tempat.innerHTML = "<i id='taktersedia_" + id + "' class='fa fa-file-word-o w3-xxxlarge' style='font-size:72px'></i><br/> Pratinjau tidak terrsedia ";
            //var idac = id +" "+ src;
            //panci(idac);

        } else if (typenyaaja.indexOf("text") > -1) {
            tempat.innerHTML = "<iframe id='myiframe" + id + "' src='" + src + "' type='" + typenyaaja + "' width='98%' height='400'></iframe><br/>tipe file: " + typenyaaja.split("/")[1];
        } else if (typenyaaja.indexOf("pdf") > -1) {
            tempat.innerHTML = "<iframe id='pdfke" + id + "' src='" + src + "' type='" + typenyaaja + "' width='98%' height='400'></iframe><br/>tipe file: " + typenyaaja.split("/")[1];
        } else {
            tempat.innerHTML = "<i id='takdikenal_" + id + "'  class='fa fa-file-o w3-xxxlarge' style='font-size:72px'></i><br/> File Tidak dikenal <br/>tipe file: " + typenyaaja.split("/")[1];;
        }
    }

}

function hasilakhirelamaso(id) { // untuk tipe berkali-kali (bukan type token akses lamaso "sekali"
    let dlo = JSON.parse(localStorage.getItem("materi"))[id]
    //console.log("dlo, dng par= " + id + "\n \n Jika ingin tau akses nilainya ini: " + dlo.idaksessiswa)

    var keytokenakses = dlo.idaksessiswa;;
    // //konten isi materi, dan identitas waktu disembunyikan. Baik untuk akses "sekali", ataupun "beberapa kali"
    //  materiimport.style.display = "none";
    document.querySelector(".kontenmateri").style.display = "none";
    // tes.style.display = "none"

    if (keytokenakses == "beberapa kali") {
        document.getElementById("resumenilai").removeAttribute("style");
        document.getElementById("resumenilai").setAttribute("style", "display:block")
        //  resumenilai.style.display = "block";
        hasilakhir.style.display = "block";
        cmd.style.display = "block";

        var elSoal = document.getElementsByClassName("calcnosoal");
        var elPG = document.getElementsByClassName("calc");
        var tempatLJ = document.getElementById("resumenilai");
        tempatLJ.innerHTML = "";
        let xx = localStorage.getItem("keybase")
        var kuncijawabann = window.atob(xx);
        var kuncijawaban = window.atob(xx).split(",");
        //         var kuncijawaban = window.atob(localStorage.getItem("keybase"));
        //     // identitasnya dulu;
        hasilakhirnamasekolah.innerHTML = dlo.idSekolah;;
        hasilakhirnamasiswa.innerHTML = namasiswa;
        hasilakhirmapeltema.innerHTML = dlo.idmapel;
        //     //hasilakhirmapeltema
        hasilakhirkelas.innerHTML = namakelas;
        hasilakhirwaktu.innerHTML = waktusekarang();
        //     // hasil ceklis
        //tempatLJ.innerHTML = "<table><tr><td>Pilihan Ganda:</td></tr>";
        var tblpg = document.createElement("table");
        var tr = tblpg.insertRow(-1);
        var td = tr.insertCell(-1);
        td.innerHTML = "Pilihan Ganda:"
        var koleksiceklis = []
        for (var a = 0; a < elPG.length; a++) {
            if (elPG[a].checked) {
                var idopsi = elPG[a].getAttribute("id").replace(/\s+/g, "");
                koleksiceklis.push(idopsi)
                var tr = tblpg.insertRow(-1);
                var td = tr.insertCell(-1);
                td.innerHTML = idopsi;

            }
        }
        //tempatLJ.innerHTML += "<tr><td>" + koleksiceklis.join("<br/>") + "</td></tr>";;
        //tempatLJ.innerHTML += 
        var cB = 0;
        for (var b = 0; b < koleksiceklis.length; b++) {
            var resPG = PGBenar(kuncijawaban, koleksiceklis[b])
            if (resPG == "Benar") {
                cB += 1
            }
        }
        var NilaiAkhirPGnya = (cB / elSoal.length * 100).toFixed(2)
        //tempatLJ.innerHTML += "<tr></td><b style='color:blue'>Skor PG</b> = <b style='color:red'>" + NilaiAkhirPGnya + "</b></td></tr>";
        //tempatLJ.innerHTML += "</table>";
        var tr = tblpg.insertRow(-1);
        var td = tr.insertCell(-1);
        td.innerHTML = "<b style='color:blue'>Skor PG</b> = <b style='color:red'>" + NilaiAkhirPGnya + "</b>"
        tempatLJ.appendChild(tblpg);

        // soalessay = ;
        var resulthasilessay = "";
        //resulthasilessay += "<!-- ADD_PAGE -->";
        var elFilejawaban = document.getElementsByClassName("filejawaban");
        if (elFilejawaban.length > 0) { //mengantisipasi jika tidak ada filejawaban kosong ga perlu dieksekusi
            for (var c = 0; c < elFilejawaban.length; c++) {
                var innernya = elFilejawaban[c].tagName;
                var noessay = elFilejawaban[c].getAttribute("id").replace("filejawaban", "");
                //console.log(innernya)
                if (innernya == "TEXTAREA") {
                    resulthasilessay += "<p style='color:blue'>Pertanyaan No. " + noessay + " :</p>";
                    resulthasilessay += document.getElementById("pertanyaanessay_" + noessay).innerHTML + "<hr style='border-top:1px solid black'/><p style='color:red'>Jawaban:</p>";
                    resulthasilessay += elFilejawaban[c].value.split("\n").join("<p>");
                    //resulthasilessay += "</li></ol>"
                } else {
                    resulthasilessay += "<p style='color:blue'>Pertanyaan No. " + noessay + " :</p>";
                    resulthasilessay += document.getElementById("pertanyaanessay_" + noessay).innerHTML + "<hr style='border-top:1px solid black'/><p style='color:red'>Jawaban:</p>";

                    resulthasilessay += elFilejawaban[c].outerHTML;
                }
            }

        }
        tempatLJ.innerHTML += resulthasilessay;
    } else {

        //resumenilai.style.display = "block";
        document.kirimnilaielamaso.matericode.value = dlo.idbaris;
        document.kirimnilaielamaso.tokensiswa.value = tokensiswa;
        hasilakhir.style.display = "block";
        cmd.style.display = "none";
        bypassme.style.display = "none";
        var elSoal = document.getElementsByClassName("calcnosoal");
        var elPG = document.getElementsByClassName("calc");
        var tempatLJ = document.getElementById("resumenilai");
        tempatLJ.innerHTML = "";
        let xx = localStorage.getItem("keybase")
        var kuncijawabann = window.atob(xx);
        var kuncijawaban = window.atob(xx).split(",");
        //     // identitasnya dulu;
        hasilakhirnamasekolah.innerHTML = dlo.idSekolah;
        hasilakhirnamasiswa.innerHTML = namasiswa
        hasilakhirmapeltema.innerHTML = dlo.idmapel
        //     //hasilakhirmapeltema
        hasilakhirkelas.innerHTML = namakelas;
        hasilakhirwaktu.innerHTML = waktusekarang();
        //     // hasil ceklis
        //tempatLJ.innerHTML = "<table><tr><td>Pilihan Ganda:</td></tr>";
        tempatLJ.innerHTML += "PILIHAN GANDA:"
        var tblpg = document.createElement("table");
        tblpg.setAttribute("class", "versi-table")
        var tr = tblpg.insertRow(-1);
        var td = tr.insertCell(-1);
        td.innerHTML = "Jawaban"
        var td = tr.insertCell(-1);
        td.innerHTML = "Kunci:"
        var td = tr.insertCell(-1);
        td.innerHTML = "Nilai"

        var koleksiceklis = []
        var indexkunci = 0;
        for (var a = 0; a < elPG.length; a++) {
            if (elPG[a].checked) {
                var idopsi = elPG[a].getAttribute("id").replace(/\s+/g, "");
                koleksiceklis.push(idopsi)
                var tr = tblpg.insertRow(-1);
                var td = tr.insertCell(-1);
                td.innerHTML = idopsi;
                var td = tr.insertCell(-1);
                td.innerHTML = "###"; //kuncijawaban[parseInt(idopsi) - 1];
                var td = tr.insertCell(-1);
                td.innerHTML = "###"; //PGBenar(kuncijawaban, idopsi)

            }
            indexkunci += 1;
        }

        //tempatLJ.appendChild(tblpg);

        //tempatLJ.innerHTML += "<tr><td>" + koleksiceklis.join("<br/>") + "</td></tr>";;
        //tempatLJ.innerHTML += 

        //var tblpg = document.getElementById("tabelku");
        var cB = 0;
        for (var b = 0; b < koleksiceklis.length; b++) {
            var resPG = PGBenar(kuncijawaban, koleksiceklis[b])
            if (resPG == "Benar") {
                cB += 1
            }
        }
        var NilaiAkhirPGnya = (cB / elSoal.length * 100).toFixed(2)
        //tempatLJ.innerHTML += "<tr></td><b style='color:blue'>Skor PG</b> = <b style='color:red'>" + NilaiAkhirPGnya + "</b></td></tr>";
        //tempatLJ.innerHTML += "</table>";
        var tr = tblpg.insertRow(-1);
        var td = tr.insertCell(-1);
        td.setAttribute("colspan", "2");
        td.innerHTML = "<b style='color:blue'>Skor PG</b>"
        var td = tr.insertCell(-1);

        td.innerHTML = " <b id='nilaiPGku' style='color:red'>" + NilaiAkhirPGnya + "</b>";
        tempatLJ.appendChild(tblpg);

        // soalessay = ;
        var resulthasilessay = (dlo.jumlahessay == 0) ? "" : "JAWABAN ESSAY:<br/>";;

        //resulthasilessay += "<!-- ADD_PAGE -->";
        var elFilejawaban = document.getElementsByClassName("filejawaban");
        if (elFilejawaban.length > 0) { //mengantisipasi jika tidak ada filejawaban kosong ga perlu dieksekusi
            for (var c = 0; c < elFilejawaban.length; c++) {
                var innernya = elFilejawaban[c].tagName;
                var noessay = elFilejawaban[c].getAttribute("id").replace("filejawaban", "");
                //console.log(innernya)
                if (innernya == "TEXTAREA") {
                    resulthasilessay += "<ol style='list-style-type:decimal' start='" + noessay + "'><li><b style='color:blue'>Pertanyaan:</b>:<br/>";
                    resulthasilessay += document.getElementById("pertanyaanessay_" + noessay).innerHTML + "<hr style='border-top:1px solid black'/><b style='color:blue'>Jawaban:</b>:<br/>";
                    resulthasilessay += elFilejawaban[c].value.split("\n").join("<br/>");
                    resulthasilessay += "<div id='untuklj" + noessay + "' class='koleksilj' style='border:1px solid red;padding:5px;background-color:#eeeeff'>Nilai</div>";
                    resulthasilessay += "</li></ol>";
                } else {
                    //resulthasilessay += "<!-- ADD_PAGE -->";
                    //resulthasilessay +="<ol style='list-style-type:decimal' start='"+noessay+"'><li>";
                    //resulthasilessay += document.getElementById("pertanyaanessay_"+noessay).innerHTML +"<hr style='border-top:1px solid black'/>";
                    //resulthasilessay += "<p>"+elFilejawaban[c].innerHTML+"</p>";
                    resulthasilessay += "<ol style='list-style-type:decimal' start='" + noessay + "'><li><b style='color:blue'>Pertanyaan:</b>:<br/>";
                    resulthasilessay += document.getElementById("pertanyaanessay_" + noessay).innerHTML + "<hr style='border-top:1px solid black'/><b style='color:blue'>Jawaban:</b>:<br/>";

                    resulthasilessay += elFilejawaban[c].outerHTML;
                    resulthasilessay += "<div id='untuklj" + noessay + "' class='koleksilj' style='border:1px solid red;padding:5px;background-color:#eeeeff'>Nilai</div>";
                    resulthasilessay += "</li></ol>";

                }
            }

        }
        tempatLJ.innerHTML += resulthasilessay;

        ceknilai(dlo);
        //--------------htmlnilaisiswa(); --------------------
        var teksarea = document.getElementById("tekshtmlnilai");
        var isiteks = document.getElementById("borderidhasilakhirnama");
        var teksbtoa = encodeURIComponent(isiteks.innerHTML);

        teksarea.textContent = window.btoa(unescape(encodeURIComponent(isiteks.innerHTML)));
        //resumenilai.style.display = "none";
        document.getElementById("resumenilai").removeAttribute("style"); //removeAttribute
        document.getElementById("resumenilai").setAttribute("style", "display:none")
        //----------------------------------------------------
        //var belumadatombol = document.getElementById("idtombolkirimnilaielamaso")
        //if (belumadatombol == null) {
        var tengah = document.createElement("center");
        var kirimnilaikeserver = document.createElement("button");
        kirimnilaikeserver.setAttribute("onclick", "tombolkirimnilaielamaso()");
        kirimnilaikeserver.setAttribute("id", "idtombolkirimnilaielamaso");
        kirimnilaikeserver.setAttribute("class", "wa");
        kirimnilaikeserver.innerHTML = "<i class='fa fa-paper-plane'></i> Kirim Nilai"
        tengah.appendChild(kirimnilaikeserver);
        //  borderidhasilakhirnama.innerHTML += "<hr/><center>Terima kasih, Nilai Ananda siap dikirim ke server e-Lamaso. Klik tombol Kirim Nilai agar diproses gurumu.</center>";
        //  borderidhasilakhirnama.innerHTML += "<hr/>";
        //  borderidhasilakhirnama.appendChild(tengah);
        document.getElementById("resumenilaiskhir").innerHTML = "<hr/><center>Terima kasih, Nilai Ananda siap dikirim ke server e-Lamaso. Klik tombol Kirim Nilai agar diproses gurumu.</center>";
        document.getElementById("resumenilaiskhir").innerHTML += "<hr/>";
        document.getElementById("resumenilaiskhir").appendChild(tengah);
        //}
    }


}

function waktusekarang() {

    var d = new Date();
    var n = addZero(d.getDate());
    var y = d.getFullYear();
    var m = addZero(d.getMonth() + 1);
    var j = addZero(d.getHours());
    var mnt = addZero(d.getMinutes());
    var dtk = addZero(d.getSeconds());
    var str = "Tgl " + n + "/" + m + "/" + y + " Pkl. " + j + ":" + mnt + ":" + dtk;
    return str
}


function ceknilai(dlo) {
    //
    let a = new Date();
    let b = a.getDate();
    let c = a.getMonth() + 1;
    let d = a.getFullYear()
    let constidok = addZero(b) + "" + addZero(c) + "" + d;


    tempatinputpilihanganda.innerHTML = "Nama Sekolah: <input name='idsekolah' id='kirimidsekolah' type='text' value='" + dlo.idSekolah + "'/><br/>";
    tempatinputpilihanganda.innerHTML += "emailguru: <input name='emailguru' id='emailguru' type='text' value='" + surel + "'/><br/>";
    tempatinputpilihanganda.innerHTML += "Nama Kelas : <input name='idkelas' id='kirimidkelas' type='text' value='" + namakelas + "'/><br/>";
    tempatinputpilihanganda.innerHTML += "Mapel : <input name='idmapel' id='kirimidmapel' type='text' value='" + dlo.idmapel + "'/><br/>";
    tempatinputpilihanganda.innerHTML += "Token : <input name='idtoken' id='kirimidtoken' type='text' value='" + dlo.idtoken + "'/><br/>";
    tempatinputpilihanganda.innerHTML += "jenistagihan : <input name='jenistagihan' id='kirimjenistagihan' type='text' value='" + dlo.jenistagihan + "'/><br/>";
    tempatinputpilihanganda.innerHTML += "kodeunik : <input name='kodeunik' id='kirimkodeunik' type='text' value='" + dlo.jenistagihan + "_" + constidok + "'/><br/>";

    tempatinputpilihanganda.innerHTML += "crtToken : <input name='crtToken' id='kirimcrtToken' type='text' value='" + constidok + "'/><br/>";
    tempatinputpilihanganda.innerHTML += "Nama : <input name='namasiswa' id='kirimnamasiswa' type='text' value='" + namasiswa + "'/><br/>";
    tempatinputpilihanganda.innerHTML += "NIlai PG : <input name='nilaiPG' id='kirimnilaiPG' type='text' value='" + nilaiPGku.innerHTML + "'/><br/>";

    var jumlahsoal = document.getElementsByClassName("calcnosoal");
    var jumlahopsipg = document.getElementsByClassName("calc");
    var kuncijawaban = window.atob(localStorage.getItem("keybase")).split(",");
    var koleksiceklis = [];
    tempatinputpilihanganda.innerHTML += "Data Pilihan Ganda:<br/>"
    for (var i = 0; i < jumlahopsipg.length; i++) {
        if (jumlahopsipg[i].checked) {
            var idopsi = jumlahopsipg[i].getAttribute("id").replace(/\s+/g, "");
            koleksiceklis.push(idopsi)
        }
    }
    //koleksiceklis = kuncijawaban.replace("/\s+/g","").split(",").join("=");
    //cektagihan.innerHTML = koleksiceklis.join("<br/>");
    //cektagihan.innerHTML +="<hr/>" + kuncijawaban ; //.split(",")
    //cektagihan.innerHTML  += "<hr/> Ini hasil koreksinya:<br/>";
    for (j = 0; j < koleksiceklis.length; j++) {
        //cektagihan.innerHTML += koleksiceklis[j] +" = " + PGBenar(kuncijawaban, koleksiceklis[j]) +"<br/>"
        tempatinputpilihanganda.innerHTML += "No. " + parseInt(koleksiceklis[j]) + " <input type='text' name='PG_" + parseInt(koleksiceklis[j]) + "' value='" + koleksiceklis[j].replace(parseInt(koleksiceklis[j]), "") + "'/><br/>"
    }

    for (k = 0; k < koleksiceklis.length; k++) {
        var skor = (PGBenar(kuncijawaban, koleksiceklis[k]) == "Benar") ? 1 : 0;
        //cektagihan.innerHTML += koleksiceklis[j] +" = " + PGBenar(kuncijawaban, koleksiceklis[j]) +"<br/>"
        tempatinputpilihanganda.innerHTML += "Skor No. " + parseInt(koleksiceklis[k]) + " <input type='text' name='SKOR_" + parseInt(koleksiceklis[k]) + "' value='" + skor + "'/><br/>"
    }

    //kd PKN_3.1
    let datakuncikd = JSON.parse(localStorage.getItem("kuncikd"))
    let keyarray = Object.keys(datakuncikd);
    let obj = {};
    for (l = 0; l < keyarray.length; l++) {
        let valu = datakuncikd[keyarray[l]]; // [1, 2, 3, 4, dst]
        let valulengt = valu.length; // [banyaknya array di atas]
        let coun = 0;
        for (z = 0; z < valu.length; z++) { // nomor soal pada kunciKD 
            for (m = 0; m < koleksiceklis.length; m++) { //jawaban siswa 1A, 2B

                var skor = (PGBenar(kuncijawaban, koleksiceklis[m]) == "Benar") ? 1 : 0;
                if (parseInt(valu[z]) == parseInt(koleksiceklis[m])) {
                    coun += skor
                }

            }
        }
        let nilaikd = (coun / valulengt * 100).toFixed(2);

        obj[keyarray[l]] = nilaikd


    }

    tempatinputpilihanganda.innerHTML += "Nilai KD  <input type='text' name='nilaikd' value='" + JSON.stringify(obj) + "'/><br/>"



}

async function cekkerjaan(j, d) {
    //.style.display = "none";
    document.querySelector(".kontenmateri").innerHTML = "";
    hasilakhir.style.display = "none";

    tescekelement.innerHTML = "";
    // loadingAPI.style.display = "block";
    // infoloadingAPI.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`

    let datanya = d
    let nm = tokensiswa;
    let crTo = datanya.crtToken;
    let idmap = datanya.jenistagihan;
    let jes = datanya.jumlahessay;
    let idmapel = datanya.idmapel;
    let soalmateri = datanya.idmateri;
    let bataswaktu = new Date(datanya.idtglend).getTime();
    let awalwaktu = new Date(datanya.idtgl).getTime()

    let integerWaktusekarang = new Date().getTime();
    let kadalmateri = (bataswaktu > integerWaktusekarang) ? false : true;
    //console.log(kadalmateri)
    let trueEssay = (datanya.jumlahessay == 0) ? false : true;

    let param = "&namasiswa=" + encodeURIComponent(nm);
    param += "&crtToken=" + encodeURIComponent(crTo);
    param += "&jenistagihan=" + encodeURIComponent(idmap)
    param += "&idmapel=" + encodeURIComponent(idmapel)

    // let domTabel = document.querySelector(".tabelmaterihariini");
    // domTabel.rows[(d + 1)].cells[6].innerHTML = `<i class="fa fa-refresh fa-spin"></i>`;
    let div = document.querySelector(".mhi_status_" + j);
    let url = urlnilai + "?action=datasiswasudahmengerjakan";
    await fetch(url + param)
        .then(m => m.json())
        .then(k => {
            // console.log(k)
            if (k.records.length == 0) {
                if (integerWaktusekarang < awalwaktu && integerWaktusekarang < bataswaktu) {
                    div.innerHTML = "Maaf, Pembelajaran belum bisa diakses"
                } else if (integerWaktusekarang > awalwaktu && integerWaktusekarang > bataswaktu) {
                    div.innerHTML = "Maaf, Pembelajaran sudah Ananda lewatkan"

                } else {
                    div.innerHTML = `<button class="w3-button w3-green" onclick="previewriwayat(${j})">Yuk Mulai Belajar</button>`
                }

                // if(kadalmateri){
                //     domTabel.rows[(d+1)].cells[6].innerHTML = "Maaf, materi sudah ditutup"
                // }else{
                //     domTabel.rows[(d+1)].cells[6].innerHTML = `<button class="w3-button w3-green" onclick="previewriwayat(${d})">Mulai Belajar</button>`
                // }
            } else {
                let last = k.records.length - 1;
                let obnilaikd = k.records[last].nilaikd;
                let idhtml = k.records[last].html_jawaban;
                let cekessay = (k.records[last].nilaiEssay == "" && trueEssay) ? `<button class='w3-button w3-red' onclick='lihatljksaya("${idhtml}")'>LJK (?)</button>` : `<button class='w3-button w3-green' onclick='lihatljksaya("${idhtml}")'>LJK <i class="fa fa-check-circle"></i></button>`;

                let objek = JSON.parse(obnilaikd);
                let keyobjek = Object.keys(objek)
                let teks = (k.records[last].nilaiPG == "") ? "" : "Nilai PG = " + k.records[last].nilaiPG + "<br/>";
                teks += (jes == 0) ? "" : "Nilai Essay = " + k.records[last].nilaiEssay;


                div.innerHTML = `Selamat Ananda sudah mengerjakan materi ini.<hr class="w3-border-bottom"/> ${teks}<hr class="w3-border-bottom"/>${cekessay}<button class='w3-button w3-blue' onclick='soaloffline("${soalmateri}")'>Latihan lagi</button><br/>`;

            }

            //domTabel.after(teksnode)
            // loadingAPI.style.display = "none";
            // infoloadingAPI.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`
            // //     hasilakhir.style.display = "none";
            // //  resumenilai.style.display = "none";
            //  cmd.style.display = "none";
            //  bypassme.style.display = "none";
            //hasilbelajarsekali.style.display = "none";

        }).catch(er => {
            loadingAPI.style.display = "block";
            infoloadingAPI.innerHTML = `Terjadi Kegagalan koneksi. Coba lagi nanti. <hr>Pesan error: ${er}`

        })
}
async function cekkerjaanjadul(d) {
    //.style.display = "none";
    document.querySelector(".kontenmateri").innerHTML = "";
    hasilakhir.style.display = "none";

    tescekelement.innerHTML = "";
    loadingAPI.style.display = "block";
    infoloadingAPI.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`

    let datanya = JSON.parse(localStorage.getItem("materi"))[d];
    let nm = namasiswa;
    let crTo = datanya.crtToken;
    let idmap = datanya.jenistagihan;
    let idmapel = datanya.idmapel;
    let soalmateri = datanya.idmateri;
    let bataswaktu = new Date(datanya.idtglend).getTime();
    let awalwaktu = new Date(datanya.idtgl).getTime()

    let integerWaktusekarang = new Date().getTime();
    let kadalmateri = (bataswaktu > integerWaktusekarang) ? false : true;
    //console.log(kadalmateri)
    let trueEssay = (datanya.jumlahessay == 0) ? false : true;

    let param = "&namasiswa=" + encodeURIComponent(nm);
    param += "&crtToken=" + encodeURIComponent(crTo);
    param += "&jenistagihan=" + encodeURIComponent(idmap)
    param += "&idmapel=" + encodeURIComponent(idmapel)

    // let fd = new FormData();
    // fd.append("namasiswa", nm);
    // fd.append("crtToken", crTo);
    // fd.append('idmapel', idmap)

    // let param = new URLSearchParams(fd)

    let domTabel = document.querySelector(".tabelmaterihariini");
    domTabel.rows[(d + 1)].cells[6].innerHTML = `<i class="fa fa-refresh fa-spin"></i>`
    let url = urlnilai + "?action=datasiswasudahmengerjakan";
    await fetch(url + param)
        .then(m => m.json())
        .then(k => {
            // console.log(k)
            if (k.records.length == 0) {
                if (integerWaktusekarang < awalwaktu && integerWaktusekarang < bataswaktu) {
                    domTabel.rows[(d + 1)].cells[6].innerHTML = "Maaf, Pembelajaran belum bisa diakses"
                } else if (integerWaktusekarang > awalwaktu && integerWaktusekarang > bataswaktu) {
                    domTabel.rows[(d + 1)].cells[6].innerHTML = "Maaf, Pembelajaran sudah Ananda lewatkan"

                } else {
                    domTabel.rows[(d + 1)].cells[6].innerHTML = `<button class="w3-button w3-green" onclick="previewriwayat(${d})">Mulai Belajar</button>`
                }

                // if(kadalmateri){
                //     domTabel.rows[(d+1)].cells[6].innerHTML = "Maaf, materi sudah ditutup"
                // }else{
                //     domTabel.rows[(d+1)].cells[6].innerHTML = `<button class="w3-button w3-green" onclick="previewriwayat(${d})">Mulai Belajar</button>`
                // }
            } else {
                let last = k.records.length - 1;
                let obnilaikd = k.records[last].nilaikd;
                let idhtml = k.records[last].html_jawaban;
                let cekessay = (k.records[last].nilaiEssay == "" && trueEssay) ? `<button class='w3-button w3-red' onclick='lihatljksaya("${idhtml}")'>LJK (?)</button>` : `<button class='w3-button w3-green' onclick='lihatljksaya("${idhtml}")'>LJK <i class="fa fa-check-circle"></i></button>`;

                let objek = JSON.parse(obnilaikd);
                let keyobjek = Object.keys(objek)
                let teks = "";
                for (i = 0; i < keyobjek.length; i++) {
                    teks += keyobjek[i] + " = " + objek[keyobjek[i]] + "<br>"

                }

                //let teks =`${obnilaikd["PKN_3.1"]}`
                let usbukan = (k.records[last].jenistagihan == "ustertulis") ? true : false;
                if (usbukan) {
                    domTabel.rows[(d + 1)].cells[6].innerHTML = `Nilai akan diumumkan pada tanggal 15 Juni 2021 di menu Pengumuman Kelulusan`;

                } else {
                    domTabel.rows[(d + 1)].cells[6].innerHTML = `Selesai, dengan skor <br> ${teks}<br>${cekessay}<button class='w3-button w3-blue' onclick='soaloffline("${soalmateri}")'>Latihan lagi</button>`;

                }

                //domTabel.after(teksnode)
            }
            loadingAPI.style.display = "none";
            infoloadingAPI.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`
            //     hasilakhir.style.display = "none";
            //  resumenilai.style.display = "none";
            //  cmd.style.display = "none";
            //  bypassme.style.display = "none";
            //hasilbelajarsekali.style.display = "none";

        }).catch(er => {
            loadingAPI.style.display = "block";
            infoloadingAPI.innerHTML = `Terjadi Kegagalan koneksi. Coba lagi nanti. <hr>Pesan error: ${er}`

        })
}



const soaloffline = (html_jawaban) => {
    loadingljk.style.display = "block";

    document.querySelector(".kontenmateri").innerHTML = "";
    infoloadingljk.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`;
    $('#infoloadingljk').nextAll('button').remove();
    $.getJSON(urlnilai + "?idmateri=" + html_jawaban + "&action=previewriwayat", function (json) {

        //loadingljk.style.display  = "none";
        //$("#output").html(brkline(json))
        // document.getElementById("judulpetunjuk").innerHTML = "Preview e-Lamaso";
        //        document.getElementById("isipetunjuk").innerHTML = brkline(json);
        infoloadingljk.innerHTML = `<h1 class='w3-center w3-cursive'>LATIHAN LAGI...</h1>`;
        infoloadingljk.innerHTML += brkline(json) + "<br><br><br>";
        var elEssay = document.getElementsByClassName("soalessay")
        if (elEssay.length !== 0) {
            for (i = 0; i < elEssay.length; i++) {
                var idEl = elEssay[i].getAttribute("id");
                var inidEl = idEl.replace("essay", "");
                var tempattombol = document.getElementById("tomboljawaban" + inidEl);
                var tombolsatu = document.createElement("button");
                tombolsatu.setAttribute("onclick", "tombolketikjawaban2('" + inidEl + "')");
                var tekstombolsatu = document.createTextNode("Ketik Jawaban No " + inidEl);
                tombolsatu.appendChild(tekstombolsatu);
                tempattombol.appendChild(tombolsatu);
                tempattombol.innerHTML += "<br/><sub>atau</sub></br/> "
                var tomboldua = document.createElement("button");
                tomboldua.setAttribute("onclick", "tomboluploadjawaban2('" + inidEl + "')");
                var tekstomboldua = document.createTextNode("Upload Jawaban No " + inidEl);
                tomboldua.appendChild(tekstomboldua);
                tempattombol.appendChild(tomboldua);
                tempattombol.innerHTML += "<br/><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>"

            }
        }
        let tombol = document.createElement("button");
        tombol.setAttribute("class", "w3-button w3-dark-grey w3-display-bottommiddle w3-margin-bottom");
        tombol.setAttribute("onclick", "printPortrait('infoloadingljk,,,${StringTanggal(new Date())}')");
        tombol.innerHTML = `<i class="fa fa-print"></i>  Cetak `

        infoloadingljk.innerHTML += "<center>Ini hanya untuk latihan ya ..., Tidak bisa dikirimkan ke e-Lamaso. Jika ingin memperbaiki nilai, silakan tulis di bukumu lalu serahkan ke gurumu melalui WA</center>";
        infoloadingljk.after(tombol)

    })

}

const lihatljksaya = (html_jawaban) => {
    loadingljk.style.display = "block";
    infoloadingljk.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`;
    $('#infoloadingljk').nextAll('button').remove();
    $.getJSON(urlnilai + "?idmateri=" + html_jawaban + "&action=previewriwayat", function (json) {

        //loadingljk.style.display  = "none";
        //$("#output").html(brkline(json))
        // document.getElementById("judulpetunjuk").innerHTML = "Preview e-Lamaso";
        //        document.getElementById("isipetunjuk").innerHTML = brkline(json);
        infoloadingljk.innerHTML = brkline(json) + "<br><br><br>";



        let tombol = document.createElement("button");
        tombol.setAttribute("class", "w3-button w3-dark-grey w3-display-bottommiddle w3-margin-bottom");
        tombol.setAttribute("onclick", `printPortrait('infoloadingljk,,,${StringTanggal(new Date())}')`);
        tombol.innerHTML = `<i class="fa fa-print"></i>  Cetak `

        infoloadingljk.after(tombol)

    })

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
    style.type = 'text/css';
    style.media = 'print';

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));

    }

    headnya.appendChild(style);
    var bodynya = isi.body;
    //var teksbody = document.getElementById(id).innerHTML;
    var teksbody = document.getElementById(id).innerHTML;
    //var teksbody =document.getElementById(id).outerHTML;
    bodynya.innerHTML = "";
    bodynya.innerHTML = '<style>' + cssd + '</style>';
    bodynya.innerHTML += '<h1 style="text-align:center">' + h1 + '</h1>';
    bodynya.innerHTML += '<h2 style="text-align:center">' + h2 + '</h2>';
    bodynya.innerHTML += teksbody;
    bodynya.innerHTML += '<br/><br/><br/>';

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}



function ceknilaiaksessekali() {
    var jumlahsoal = document.getElementsByClassName("calcnosoal");
    var jumlahopsipg = document.getElementsByClassName("calc");
    var kuncijawaban = window.atob(JSON.parse(localStorage.getItem("keybase")));
    var koleksiceklis = [];
    tempatinputpilihanganda.innerHTML = "Data Pilihan Ganda:<br/>"
    for (var i = 0; i < jumlahopsipg.length; i++) {
        if (jumlahopsipg[i].checked) {
            var idopsi = jumlahopsipg[i].getAttribute("id").replace(/\s+/g, "");
            koleksiceklis.push(idopsi)
        }
    }
    //koleksiceklis = kuncijawaban.replace("/\s+/g","").split(",").join("=");
    cektagihan.innerHTML = koleksiceklis.join("<br/>");
    cektagihan.innerHTML += "<hr/>" + kuncijawaban; //.split(",")
    cektagihan.innerHTML += "<hr/> Ini hasil koreksinya:<br/>";
    for (j = 0; j < koleksiceklis.length; j++) {
        cektagihan.innerHTML += koleksiceklis[j] + " = " + PGBenar(kuncijawaban, koleksiceklis[j]) + "<br/>"
        tempatinputpilihanganda.innerHTML += "No. " + parseInt(koleksiceklis[j]) + " <input type='text' name='PG_" + parseInt(koleksiceklis[j]) + "' value='" + koleksiceklis[j].replace(parseInt(koleksiceklis[j]), "") + "'/><br/>"
    }

    var koleksigambarjawaban = document.getElementsByClassName("filejawaban");
    tempatinputjawabanessay.innerHTML = "Data Poto Essay:<br/>"
    for (var i = 0; i < koleksigambarjawaban.length; i++) {
        var dataupload = koleksigambarjawaban[i].innerHTML;
        //if(dataupload.length > -1){
        //if(dataupload.length !== ""){
        if (dataupload !== "") {
            var base64 = dataupload.replace(/^.*,/, '');
            var typeasal = dataupload.match(/^.*(?=;)/)[0];
            var typenyaaja = typeasal.replace("data:", "");
            var inputbase64 = document.createElement("input");
            inputbase64.setAttribute("value", base64);
            inputbase64.setAttribute("name", "data");
            var inputtype = document.createElement("input");
            inputtype.setAttribute("value", typeasal);
            inputtype.setAttribute("name", "mimetype");
            var inputfilename = document.createElement("input");
            inputfilename.setAttribute("value", "Poto Essay ke-" + (i + 1));
            inputfilename.setAttribute("name", "filename");
            tempatinputjawabanessay.innerHTML += "<br/>Poto Ke-" + (i + 1);
            tempatinputjawabanessay.appendChild(inputbase64);
            tempatinputjawabanessay.appendChild(inputtype);
            tempatinputjawabanessay.appendChild(inputfilename);
        }
    }

}

function PGBenar(opsi, kuncijawaban) {
    var benarsalah;
    let benar = opsi.filter(f => f == kuncijawaban);
    if (benar.length == 1) {
        benarsalah = "Benar"
    } else {
        benarsalah = "Salah"
    }
    // if (opsi.indexOf(kuncijawaban) > -1) {
    //     benarsalah = "Benar"
    // } else {
    //     benarsalah = "Salah"
    // }
    // return benarsalah
    return benarsalah
}


/////================================== dari timeer

function tanggalfulllengkap(tgl) {
    var d = new Date(tgl);
    var tgl = d.getDate();
    var bln = d.getMonth();
    var thn = d.getFullYear();
    var jam = d.getHours();
    var menit = d.getMinutes();
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return tgl + " " + bulan[bln] + " " + thn + " Pukul " + addZero(jam) + ":" + addZero(menit);
}

function waktufulllengkap(tgl) {
    var d = new Date(tgl);
    var tgl = d.getDate();
    var bln = d.getMonth();
    var thn = d.getFullYear();
    var jam = d.getHours();
    var menit = d.getMinutes();
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return " Pukul " + addZero(jam) + ":" + addZero(menit);
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    };
    return i;
}

function deleteZero(i) {
    if (i.slice(0, 1) == "0") {
        i = i.slice(1, 2);
    };
    return i;
}


const infoupdate = () => {
    infoinfo.style.display = "block"
}
const tahapselanjutnya = () => {
    //maintenace.style.display = "block";
    w3_close();
}