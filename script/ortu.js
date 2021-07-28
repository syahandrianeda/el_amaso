

const setCookie = (cname, cvalue) => {
    var dt = new Date();
    let d = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + 1, 0, 0, 0, 0)
    // var expires = "expires="+d.toUTCString();
    var expires = "expires=" + d;
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const getCookie = (cname) => {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const checkCookie = (dicek) => {
    var ceken = getCookie(dicek);
    if (ceken != "") {
        // alert("Welcome again " + ceken);
        return ceken;

    } else {
        return ""
        // alert("gaada cookie dengan key: " + dicek)
        // user = prompt("Please enter your name:", "");
        // if (user != "" && user != null) {
        //     setCookie("username", user, 365);
        // }
    }
}








const tampilinsublamansiswa = (fitur) => {
    //datakelas
    if (fitur == "libur") {
        lamansiswa.style.display = "none";
        lamanlibur.style.display = "block";
        lamanmateri.style.display = "none"

        document.getElementById("mySidebar").scrollIntoView();
    } else if (fitur == "aktifsudahabsen") {
        lamansiswa.style.display = "block";
        document.querySelector(".sudahabsen").style.display = "inline-block"
        document.querySelector(".belumabsen").style.display = "none"
        lamanlibur.style.display = "none";
        lamanmateri.style.display = "none"


        document.getElementById("mySidebar").scrollIntoView();

    } else if (fitur == "aktifbelumabsen") {
        lamansiswa.style.display = "block";
        document.querySelector(".sudahabsen").style.display = "none"
        document.querySelector(".belumabsen").style.display = "inline-block"
        lamanlibur.style.display = "none";
        lamanmateri.style.display = "none"

    } else if (fitur == 3) { // ketika siswa udah mengeklik materi dan sudah ditampilkan materi;
        let mtr = JSON.parse(localStorage.getItem("materi"))
        ///-------------------------------------------------------

        document.querySelector(".klikmateri").innerHTML = `<h4 class="w3-card-4 w3-margin-top"><button class="w3-button w3-pink w3-round w3-right w3-tiny" onclick="panggilmateri()"><i class="fa fa-refresh"></i> Materi</button>Materi Ananda Hari Ini:<h3> `
            ;
        // f.result.forEach(element => {
        let tabel = document.createElement("table")
        tabel.setAttribute("class", "versi-table w3-card-4 w3-margin-bottom tabelmaterihariini")
        let row = tabel.insertRow(0);
        let th = row.insertCell(-1);
        th.innerHTML = "Pembelajaran";

        th = row.insertCell(-1);
        th.innerHTML = "Jenis Penilaian";

        th = row.insertCell(-1);
        th.innerHTML = "Status";

        th = row.insertCell(-1);
        th.innerHTML = "Waktu Mulai";

        th = row.insertCell(-1);
        th.innerHTML = "Waktu Akhir";

        th = row.insertCell(-1);
        th.innerHTML = "Durasi";

        th = row.insertCell(-1);
        th.innerHTML = "Aksi";





        let element = mtr;
        for (i = 0; i < element.length; i++) {
            let row = tabel.insertRow(-1);
            sel = row.insertCell(-1);
            sel.innerHTML = element[i].idmapel;
            sel = row.insertCell(-1);
            sel.innerHTML = element[i].jenistagihan;
            sel = row.insertCell(-1);
            sel.innerHTML = `<button class="w3-button w3-green" onclick="cekkerjaan(${i})">Cek</button>`;
            sel = row.insertCell(-1);
            sel.innerHTML = "Pukul " + addZero(new Date(element[i].idtgl).getHours()) + ":" + addZero(new Date(element[i].idtgl).getMinutes()) + ":" + addZero(new Date(element[i].idtgl).getSeconds());
            sel = row.insertCell(-1);
            sel.innerHTML = "Pukul " + addZero(new Date(element[i].idtglend).getHours()) + ":" + addZero(new Date(element[i].idtglend).getMinutes()) + ":" + addZero(new Date(element[i].idtglend).getSeconds());
            sel = row.insertCell(-1);
            sel.innerHTML = element[i].iddurasi;
            sel = row.insertCell(-1);
            sel.innerHTML = `tekan tombol cek`;//<button class="w3-button w3-green" onclick="previewriwayat(${i})">Materi</button>`;




        }
        //}
        // document.querySelector(".klikmateri").innerHTML += `</table>`
        document.querySelector(".klikmateri").appendChild(tabel)
        document.querySelector(".sudahabsen").style.display = "none"
        ///-------------------------------------------------------

        document.getElementById("mySidebar").scrollIntoView();
    } else if (fitur == 4) {// lamansudah aktif;
        lamansiswa.style.display = "block";
        document.querySelector(".sudahabsen").style.display = "none"
        document.querySelector(".belumabsen").style.display = "none"
        lamanlibur.style.display = "none";
        lamanmateri.style.display = "block"


        document.getElementById("lamanmateri").scrollIntoView();


    }

    w3_close();



}



const StringTanggal = (tgl) => { //parameter tgl bentuk tgl
    let m = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let y = tgl.getFullYear();
    let string = y + "-" + m + "-" + d;
    //console.log(string)
    return string
}

const NamaHariIniLengkap = () => {
    let tgl = new Date();
    let m = tgl.getMonth();
    let sm = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let day = tgl.getDay()
    let y = tgl.getFullYear();
    let string = y + "-" + sm + "-" + d;
    let arraynamaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    //console.log(string)

    let hari = arraynamaHari[day] + ", " + tanggalfull(string)

    return hari
}



const NamaHaridariIndex = (index) => {
    let arraynamabulan = ["Mg", "Sn", "Sl", "Rb", "Km", "Jm", "Sb"];
    return arraynamabulan[index]


}

function tanggalfull(tgl) {
    var d = new Date(tgl);
    var tgl = d.getDate();
    var bln = d.getMonth();
    var thn = d.getFullYear();
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return tgl + " " + bulan[bln] + " " + thn
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


            //document.querySelector('#fileContent').value = srcEncoded;

            //   document.bantukirim.fileContent.value = srcEncoded;
            //document.getElementById("formidentitas").style.display="block";
            /*Now you can send "srcEncoded" to the server and
            convert it to a png o jpg. Also can send
            "el.target.name" that is the file's name.*/

            //buat element input dengan attribute name: data/fileContent, 

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
            //sekarang kita taroh di sini:
            //document.getElementById("idpoto_potoguru").value = srcEncode; //oFREvent.target.result;
            // buat generate input
            kodefilepotosiswaabsen.appendChild(inputbase64);
            kodefilepotosiswaabsen.appendChild(inputfilename);
            kodefilepotosiswaabsen.appendChild(inputmimetype);


        }
        loginbantu.style.display = "inline-block";
    }

    //document.bantuisi.time_stampbantu.value = new Date();
    //document.bantukirim.Time_Stamp.value = new Date();
    let a = new Date();
    let b = a.getDate();
    let c = a.getMonth() + 1;
    let d = a.getFullYear()
    let idok = b + "" + addZero(c) + "" + d;
    document.bantukirim.id.value = idok;
    document.bantukirim.kelas.value = namakelas;
    document.bantukirim.name.value = namasiswa;
    //document.bantukirim.name.value = namasiswa;
    document.bantuisi.style.display = "none";
    document.querySelector(".inginkirim").style.display = "block";
    thankyou_messagekirim.innerHTML = "Data Siap Dikirim"
}


function bantuabsen() {
    document.bantuisi.reset();
    document.bantukirim.reset();
    document.getElementById("divbantuabsen").style.display = "block";
    document.querySelector(".inginkirim").style.display = "none";
    thankyou_messagekirim.innerHTML = ""

    bantusiapa.innerHTML = namasiswa;
    bantuisi.style.display = "block";

    potosiswa.setAttribute("src", "https://drive.google.com/uc?export=view&id=1RysbjHk6Ip3EG5oHO0iluI3MNOJD9FSb");



    //document.getElementById("potosiswa").src="https://drive.google.com/uc?export=view&id=1RysbjHk6Ip3EG5oHO0iluI3MNOJD9FSb";        
}


function gantikehadiranbantu() {
    var sss = document.bantuisi.pilih_kehadiran;
    document.bantukirim.kehadiran.value = sss.value;
}


function tombolbantukirim() {
    document.getElementById("bantusiapa").innerHTML = "<i class='fa fa-spin fa-spinner'></i> Sedang proses ...";
    document.bantuisi.style.display = "none";
    document.getElementById("loginbantu").style.display = "none";

    //untuk versi 2020G
    // var namaform = document.bantukirim;

    // var koleksdata = KoleksiFormSiswa(namaform);
    // var en = submitsiswa(namaform);
    // var en = $("#bantukirim").serialize();
    var namaform = document.getElementById("bantukirim");
    var en = new FormData(namaform)
    // //document.getElementById("resultpoto").innerHTML = en;
    //---------------------------------------
    //var x = document.frmeditpoto.idguru;
    //     let jsonlocalstorage = JSON.parse(localStorage.getItem("inst_id"));
    //    let linkAbsenKaldik = jsonlocalstorage.url_dataabsen + "?idss=" + jsonlocalstorage.ss_dataabsen;

    var url = url_absensiswa + "?action=siswaabsensiswa";
    fetch(url, {
        method: 'post',
        body: en
    }).then(m => m.json())
        .then(k => {
            document.getElementById("bantusiapa").innerHTML = "";//+ "  Data telah berhasil dibantu, Terima kasih";
            document.getElementById("thankyou_messagekirim").style.display = "block";
            document.getElementById("thankyou_messagekirim").innerHTML = k.ket;
            //document.getElementById("tombolbantusimpan").style.display="block"; //????
            document.getElementById("loginclosebantu").innerHTML = "Selesai dan Keluar";

            //console.log(k);
            let imgsiswa = k.kuki.srcImg;

            let kethadir = k.kuki.hadir;
            let tstamp = k.kuki.pukul;
            let ketpukul = "Pukul " + addZero(new Date(tstamp).getHours()) + ":" + addZero(new Date(tstamp).getMinutes()) + ":" + addZero(new Date(tstamp).getSeconds());

            document.querySelector(".avatarsiswa").setAttribute("src", imgsiswa)
            document.querySelector(".ketabsensiswa").innerHTML = kethadir + "<br>" + ketpukul;
            //kuki sudah absen
            setCookie("lamankode", 2);
            setCookie("srcImg", imgsiswa);
            setCookie("kethadir", kethadir);
            setCookie("ketpukul", ketpukul);
            tampilinsublamansiswa("aktifsudahabsen")
        })
        .catch(err => {
            document.getElementById("thankyou_messagekirim").innerHTML = err;
            setCookie("lamankode", 1)
            tampilinsublamansiswa("aktifbelumabsen")

        })
    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", url,true);
    //  //xhr.withCredentials = true;
    // xhr.setRequestHeader("Content-Type", "multipart/form-data");

    // xhr.onreadystatechange = function() {

    //       if (xhr.readyState === 4 && xhr.status === 200) {
    //         document.getElementById("bantusiapa").innerHTML = "" ;//+ "  Data telah berhasil dibantu, Terima kasih";
    //         document.getElementById("thankyou_messagekirim").style.display="block";
    //         document.getElementById("thankyou_messagekirim").innerHTML = JSON.parse(xhr.responseText);
    //         //document.getElementById("tombolbantusimpan").style.display="block"; //????
    //         document.getElementById("loginclosebantu").innerHTML = "Selesai dan Keluar";
    //         // var rekapabsenhariini = document.getElementById("divabsenkelashariini").style.display;//="block";
    //         //createtableabsenhariini();

    //         // dataabsenkelassayahariini();
    //         setCookie("lamankode", 2)
    //     }
    // };
    // // url encode form data for sending as post data

    // xhr.send(en);
    //---------------------------------------
    //document.getElementById("sembunyi").disabled=true;
    // console.log(en)
    ///butuh informasi tgl; informasi tgl adalah                    
}

const menudataabsen = () => {

    w3_close()
    modalabsen.style.display = "block"
}

let rekapabsensiswabulanan;
const modalfnkalender = () => {
    let x = document.getElementById("siswapilihbulan").selectedIndex;
    let y = document.getElementById("siswapilihbulan").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);
    let namabulan = y[x].text;
    modalnamabulan.innerHTML = namabulan.toUpperCase() + " 2021";

    let notgl = new Date(y[x].value);


    let tyear = notgl.getFullYear();
    let mont = notgl.getMonth();
    let tmont = notgl.getMonth() + 1;
    let tglakhir = daysInMonth(tmont, tyear);
    let lr = 1;

    let elkosong = document.querySelectorAll(".kosongindulu");
    for (let a = 0; a < elkosong.length; a++) {
        elkosong[a].innerHTML = "";
    }

    let ket = [];
    for (let i = 0; i < tglakhir; i++) {
        let dd = new Date(tyear, mont, (i + 1));
        let day = new Date(tyear, mont, (i + 1)).getDay(); /// dimulai dari 0
        let tday = new Date(tyear, mont, (i + 1)).getDate(); /// dimulai dari 0
        let idok = tday + "" + addZero(dd.getMonth() + 1) + "" + dd.getFullYear();
        let col = day + 1;


        let td = document.getElementById("kolomtabel" + lr + "_" + col)
        td.innerHTML = tday;
        //td.innerHTML += (rekapabsensiswabulanan.id == idok) ? `<br><img src=""/>` : `<br>Tidak Hadir`
        td.innerHTML += `<div id="td_${encodeURIComponent(namasiswa)}_${idok}"></div>`

        if (cocoklibur(dd)) {
            td.setAttribute("style", "background-color:red");
            let tgllibur = tanggalfull(dd) + " = " + keteranganlibur(dd)
            ket.push(tgllibur);
        } else {
            td.removeAttribute("style")
        }

        if (col == 7) {

            lr++
        }
    }
    if (ket.length == 0) {
        ketketlibur.innerHTML = ""
    } else {
        ketketlibur.innerHTML = ket.join("<br>")
    }
    let datee = StringTanggal(notgl);
    dataabsenbulanan(datee, namabulan)
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

const cocoklibur = (tgl) => { /// bolean

    let k = JSON.parse(localStorage.getItem("TglLibur"))
    // let d = JSON.parse(localStorage.getItem("Ketlibur"))
    let arrayStringTglLibur = k.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
    //let arrayKetLibur = k.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

    let str = StringTanggal(new Date(tgl))

    let inte = arrayStringTglLibur.indexOf(str)

    if (inte > -1) {
        return true
    } else {
        return false
    }

}
const keteranganlibur = (tgl) => { /// bolean
    let k = JSON.parse(localStorage.getItem("TglLibur"))
    // let d = JSON.parse(localStorage.getItem("Ketlibur"))
    let arrayStringTglLibur = k.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
    let arrayKetLibur = k.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

    let str = StringTanggal(new Date(tgl))

    let inte = arrayStringTglLibur.indexOf(str);
    let arr = ''

    if (inte > -1) {
        arr = arrayKetLibur[inte]

    }

    return arr
}

const dataabsenbulanan = async (datee, namabulan) => {

    await fetch(url_absensiswa + "?action=rekapbulan&kelas=" + namakelas + "&strtgl=" + datee)
        .then(m => m.json())
        .then(k => {
            //jsonabsenkelasperbulan = k[bulanapi];
            rekapabsensiswabulanan = k[namabulan].filter(s => s.name == namasiswa);
            //console.log(rekapabsensiswabulanan)
            //---------------------------------------------------

            for (var i = 0; i < rekapabsensiswabulanan.length; i++) {
                //mengecek element kodeid
                //kodeid = jsonabsenkelasperbulan[i].id + "_" + kelas + "_" + encodeURIComponent(jsonabsenkelasperbulan[i].name);
                let kodetd = "td_" + encodeURIComponent(rekapabsensiswabulanan[i].name) + "_" + rekapabsensiswabulanan[i].id;
                //console.log(kodetd)
                var isikehadiran = document.getElementById(kodetd)

                if (isikehadiran == null) {
                    //document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML += "<li>" + decodeURIComponent(jsonabsenkelasperbulan[i].name) + " pada tanggal " + new Date(jsonabsenkelasperbulan[i].Time_Stamp).getDate() + " Tidak ada/diubah namanya.</li>";
                } else {
                    var link = rekapabsensiswabulanan[i].fileContent;
                    if (link !== "") {
                        var linksplit = link.replace("https://drive.google.com/file/d/", "");
                        var linksplitt = linksplit.replace("/view?usp=drivesdk", "");

                    } else {

                        var linksplitt = idlogo;
                    }


                    var cekdiv = document.getElementById(kodetd);
                    if (cekdiv != null) {
                        //document.getElementById(kodetd).removeAttribute("onclick");

                        // isikehadiran.innerHTML = "<div style='width:22px;height:32px;cursor:pointer;border:1px solid blue'><a href='" + jsonabsenkelasperbulan[i].fileContent + "' target='_blank'><img src='https://drive.google.com/uc?export=view&id=" + linksplitt + "'  style='width:20px; height:30px'  alt='poto'><br/>" + jsonabsenkelasperbulan[i].kehadiran + "</a></div>";
                        isikehadiran.innerHTML = `<img class="w3-image" src="https://drive.google.com/uc?export=view&id=${linksplitt}" style="width:20px; height:30px;cursor:pointer" alt="poto" onclick="klikpotosiswa(this)"/><br/>${rekapabsensiswabulanan[i].kehadiran}`;

                    }
                    //document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML +="";
                }

            }

        }).catch(er => {
            console.log(er)
        })

}

const klikpotosiswa = (el) => {

    document.getElementById("img01").src = el.src;
    document.getElementById("previewpotoabsen").style.display = "block";

}


// let ddd = JSON.parse(localStorage.getItem("inst_id"));
// //versi satu sekolah
// // url_absenkaldik = ddd.url_dataabsen + "?action=datakaldik&idss=" + ddd.ss_dataabsen;
// //versi satu jenjang:
// url_absenkaldik = ddd.url_dataabsen + "?action=datakaldik";
// // url_absensiswa = ddd.url_dataabsen + "?action=absensiswahariini&idss=" + ddd.ss_dataabsen + "&kelas=" + namakelas;
// //let kriteria = "absen"+ jenjang;
// url_absensiswa = ddd[kriteria] + "?action=absensiswahariini";


(async function () {
    namasekolah.innerHTML = identitassekolah;
    namakota.innerHTML = identitaskotasekolah;
    //---------------------------------------------------------
    loadingmodal.style.display = "block";
    dashboardnamasiswa.innerHTML = `<i class="fa fa-spin fa-spinner w3-large"><i>`
    let cek = getCookie("lamankode");
    if (cek != "" & cek != null) {
        if (cek == 0) {
            let k = JSON.parse(localStorage.getItem("TglLibur"))
            let arrayKetLibur = JSON.parse(localStorage.getItem("Ketlibur"))
            arrayStringTglLibur = k.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
            arrayKetLibur = k.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

            //cek sekarang libur kaga!
            let day = new Date();
            let indekhari = day.getDay()
            // console.log(indekhari)
            let indek = arrayStringTglLibur.indexOf(StringTanggal(day));

            if (indekhari == 1 || indekhari == 1 || indek > -1) {
                //console.log("Libur atau Sabtu Minggu")
                belajaraktif = false;
                // tampilkan laman libur:
                let thariini = NamaHariIniLengkap();
                tekslibur1.innerHTML = `hari <b> ${thariini}</b>`;
                document.querySelector(".ketabsensiswa").innerHTML = `hari <b> ${thariini}</b> ini libur ya ...,`;
                if (indek > -1) {
                    tekslibur1.innerHTML += ` dan bertepatan dengan <b> ${arrayKetLibur[indek]} </b>`;
                    document.querySelector(".ketabsensiswa").innerHTML += ` dan bertepatan dengan <b> ${arrayKetLibur[indek]} </b>`;
                } else {
                    //tekslibur1.innerHTML += ` dan bertepatan dengan <b> ${arrayKetLibur[3]} </b>`
                }
            }
            //stop loading        
            loadingmodal.style.display = "none";
            //tampilin halaman libur:
            tampilinsublamansiswa("libur")
        } else if (cek == 1) {
            // stop loading
            loadingmodal.style.display = "none";
            //tampiin halaman belumabsen;
            document.querySelector(".ketabsensiswa").innerHTML = "Ananda Belum Absen";
            tampilinsublamansiswa("aktifbelumabsen")

        } else if (cek == 2) {
            let srcimg = getCookie("srcImg");
            let ket = getCookie("kethadir");;
            let pkl = getCookie("ketpukul");

            document.querySelector(".avatarsiswa").setAttribute("src", srcimg)
            document.querySelector(".ketabsensiswa").innerHTML = ket + " " + pkl;
            // stop loading
            loadingmodal.style.display = "none";
            //tampiin halaman belumabsen;
            tampilinsublamansiswa("aktifsudahabsen")
        } else {
            let srcimg = getCookie("srcImg");
            let ket = getCookie("kethadir");;
            let pkl = getCookie("ketpukul");

            document.querySelector(".avatarsiswa").setAttribute("src", srcimg)
            document.querySelector(".ketabsensiswa").innerHTML = ket + " " + pkl;
            // stop loading
            loadingmodal.style.display = "none";
            tampilinsublamansiswa(cek)
            //tempilankan halaman materi
        }
        namaku.innerHTML = namasiswa;
        dashboardnamasiswa.innerHTML = namasiswa + " ( Kelas " + namakelas + " )";

    }
    else {
        await fetch(url_absenkaldik).then(m => m.json()).then(k => {
            //console.table(k.records)
            arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
            arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));
            localStorage.setItem('Kaldik', JSON.stringify(k.records));

            localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl))
            // console.log(k.records)
            // console.log(k.stringTgl)

            namaku.innerHTML = namasiswa;
            dashboardnamasiswa.innerHTML = namasiswa + " ( Kelas " + namakelas + " )";

            //cek sekarang libur kaga!
            let day = new Date();
            let indekhari = day.getDay()
            // console.log(indekhari)
            let indek = arrayStringTglLibur.indexOf(StringTanggal(day));

            if (indekhari == 1 || indekhari == 1 || indek > -1) {
                //console.log("Libur atau Sabtu Minggu")
                belajaraktif = false;
                // tampilkan laman libur:
                let thariini = NamaHariIniLengkap();
                tekslibur1.innerHTML = `hari <b> ${thariini}</b>`
                if (indek > -1) {
                    tekslibur1.innerHTML += ` dan bertepatan dengan <b> ${arrayKetLibur[indek]} </b>`
                } else {
                    //tekslibur1.innerHTML += ` dan bertepatan dengan <b> ${arrayKetLibur[3]} </b>`
                }

                // stop loading
                loadingmodal.style.display = "none";
                //tampiin halaman belumabsen;

                //kuki hari libur
                setCookie("lamankode", 0);
                tampilinsublamansiswa("libur")
            } else {
                // loadingmodal.style.display= "none";
                //console.log("Ga Libur")
                belajaraktif = true;
                absennya(true)
                //kuki belajaraktif                
                //document.querySelector(".ketabsensiswa").innerHTML = "Ananda Belum Absen"             
                //setCookie("lamankode", 1)   
                //tampilinsublamansiswa("aktifbelumabsen")
            }
        }).catch(er => {
            console.log(er)
            //    setTimeout(function(){
            //     alert("Ups, maaf terjadi kesalahan ... 2 detik lagi akan kembali ("+er+")");
            //   location.reload()
            // },2000)
        });


    }

    if (jenjang == 6) {
        document.querySelector(".menukelulusan").style.display = "block"
    } else {

        document.querySelector(".menukelulusan").style.display = "none"
    }


})()

const absennya = (bol) => {
    if (bol) {
        //console.log("cara data absen")
        let a = new Date();
        let b = a.getDate();
        let c = a.getMonth() + 1;
        let d = a.getFullYear()
        let idok = b + "" + addZero(c) + "" + d;
        fetch(url_absensiswa + "?action=absensiswahariini&kelas=" + namakelas + "&name=" + namasiswa + "&id=" + idok)
            .then(m => m.json())
            .then(k => {

                //console.log(k.siswahariini.length);
                sudahhadir = k.siswahariini.length;
                if (sudahhadir > 0) {
                    let imag = k.siswahariini[0].fileContent;
                    let imgsisw = imag.replace("https://drive.google.com/file/d/", "").replace("/view?", "").replace("usp=drivesdk", "");
                    let imgsiswa = "https://drive.google.com/uc?export=view&id=" + imgsisw;

                    let kethadir = k.siswahariini[0].kehadiran;
                    let tstamp = k.siswahariini[0].Time_Stamp;
                    let ketpukul = "Pukul " + addZero(new Date(tstamp).getHours()) + ":" + addZero(new Date(tstamp).getMinutes()) + ":" + addZero(new Date(tstamp).getSeconds());

                    document.querySelector(".avatarsiswa").setAttribute("src", imgsiswa)
                    document.querySelector(".ketabsensiswa").innerHTML = kethadir + "<br>" + ketpukul;
                    loadingmodal.style.display = "none";
                    //kuki sudah absen
                    setCookie("lamankode", 2);
                    setCookie("srcImg", imgsiswa);
                    setCookie("kethadir", kethadir);
                    setCookie("ketpukul", ketpukul);
                    // stop loading
                    //tampiin halaman belumabsen;
                    tampilinsublamansiswa("aktifsudahabsen");
                } else {
                    loadingmodal.style.display = "none";
                    //kuki belum absen
                    setCookie("lamankode", 1)
                    // stop loading
                    //tampiin halaman belumabsen;
                    document.querySelector(".ketabsensiswa").innerHTML = "Ananda Belum Absen"
                    tampilinsublamansiswa("aktifbelumabsen")

                }


                //});//.catch(err => {console.log(err);location.replace("siswa.html")}) 
                //}
            }).catch(er => {
                //alert("Ups, maaf terjadi kesalahan ... 2 detik lagi akan kembali ("+er+")");
                console.log(er)
                setTimeout(function () {
                    location.reload()
                }, 2000)
            });;//.catch(err => {console.log(err);location.replace("siswa.html")}) 
    }
}


const lihatraportpts = () => {
    //cek dulu data apinya ada ga untuk namasiswa ini:
    w3_close();
    loadingAPI.style.display = "block";
    fetch(urlnilai + "?action=cekpublikasiraportpts&kelas=" + namakelas)
        .then(m => m.json())
        .then(r => {
            let namaanakini = r.data.filter(k => k.namasiswa == namasiswa);//"ABIN NUGRAHA");
            if (namaanakini.length > 0) {
                if (namaanakini[0].ptspublikasi == "show") {
                    modalraport(namaanakini[0].raportpts)

                } else {

                    alert("Mohon Maaf, Raport belum dipublikasikan.")
                }
            } else {
                alert("Mohon Maaf, Raport belum dipublikasikan.")
            }
            loadingAPI.style.display = "none";
        }).catch(er => {
            alert(er);
            loadingAPI.style.display = "none";

        })
}

const modalraport = (id) => {
    loadingljk.style.display = "block";

    document.querySelector(".kontenmateri").innerHTML = "";
    infoloadingljk.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`;
    $('#infoloadingljk').nextAll('button').remove();
    $.getJSON(urlnilai + "?idmateri=" + id + "&action=previewriwayat", function (json) {

        //loadingljk.style.display  = "none";
        //$("#output").html(brkline(json))
        // document.getElementById("judulpetunjuk").innerHTML = "Preview e-Lamaso";
        //        document.getElementById("isipetunjuk").innerHTML = brkline(json);

        infoloadingljk.innerHTML = brkline(json) + "<br><br><br><span class='w3-clear'></span>";

        let tombol = document.createElement("button");
        tombol.setAttribute("class", "w3-button w3-dark-grey w3-display-bottommiddle w3-margin-bottom");
        tombol.setAttribute("onclick", "printPortrait('infoloadingljk,,,${StringTanggal(new Date())}')");
        tombol.innerHTML = `<i class="fa fa-print"></i>  Cetak `

        infoloadingljk.innerHTML += "<center><hr/>";
        infoloadingljk.after(tombol)

    })

}

let datakelulusansiswa = {};
const pengumumankelulusan = async () => {
    let dataapikelulusan = {};
    let tgl = new Date(2021, 5, 15, 9, 0, 0);
    let tglTime = tgl.getTime();
    let tglNow = new Date().getTime();
    // let benarga = (tglTime > tglNow) ? true : false; // <---- skrip oke nih
    let benarga = (tglTime > tglNow) ? true : false;

    //getdatafromtab
    let htmlfokus = document.querySelector(".htmlfokus");
    let htmlfokuslainnya = document.querySelector(".htmlfokuslainnya");
    let btntombol = document.querySelector(".tmblprintkelulusan");
    btntombol.className = btntombol.className.replace("w3-show", "w3-hide");
    let tekshtmlfokus = "";
    let tekshtmlfokuslainnya = "";
    modalkelulusan.style.display = "block";


    document.querySelector(".kontenmateri").innerHTML = "";
    htmlfokus.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`;
    if (benarga) {
        tekshtmlfokus = "Tanggal Pengumuman " + tanggalfulllengkap(tgl) + "<br/> waktu Sekarang : " + tanggalfulllengkap(new Date());
        tekshtmlfokuslainnya = "";

    } else {
        let tab = "skkelulusan";
        let param = "&kelas=" + namakelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
        tekshtmlfokus = "Silakan Pilih Pengumuman untuk Anda periksa pada tabel di bawah ini!";
        await fetch(urlnilai + "?action=getdatafromtab" + param)
            .then(m => m.json())
            .then(k => {
                // console.log(k)
                if (k.result == 0) {
                    datakelulusansiswa["adapengumuman"] = "Maaf, Pengumuman Kelulusan untuk kelas Ananda belum dipublikasikan";
                    datakelulusansiswa["kodepengumuman"] = 0;
                } else {
                    dataapikelulusan = k.data.filter(n => n.namasiswa == namasiswa);
                    let indekdobel;
                    if (dataapikelulusan.length == 0) {
                        datakelulusansiswa["adapengumuman"] = "Maaf, Pengumuman kelulusan untuk Ananda belum dipublikasikan";
                        datakelulusansiswa["kodepengumuman"] = 0;
                    } else {
                        indekdobel = dataapikelulusan.length - 1;
                        datakelulusansiswa["idpengumuman"] = dataapikelulusan[indekdobel].idfile
                        datakelulusansiswa["adapengumuman"] = "&checkmark; Tersedia";
                        datakelulusansiswa["kodepengumuman"] = 1;
                    }
                }
            })
            .catch(er => console.log(er));
        let parame = "&kelas=" + namakelas + "&prefiktab=skhu"
        await fetch(urlnilai + "?action=getdatafromtab" + parame)
            .then(n => n.json())
            .then(o => {
                if (o.result == 0) {
                    datakelulusansiswa["adaskhb"] = "Maaf, Surat Keterangan Hasil Belajar untuk kelas Ananda belum dipublikasikan";
                    datakelulusansiswa["kodeskhb"] = 0;
                } else {
                    let arskhb = o.data.filter(b => b.namasiswa == namasiswa);
                    let indekskhb;
                    if (arskhb.length == 0) {
                        datakelulusansiswa["adaskhb"] = "Maaf, Surat Keterangan Hasil Belajar belum dipublikasikan guru Ananda";
                        datakelulusansiswa["kodeskhb"] = 0;
                    } else {
                        indekskhb = arskhb.length - 1;
                        datakelulusansiswa["idskhb"] = arskhb[indekskhb].idfile;
                        datakelulusansiswa["adaskhb"] = "&checkmark; Tersedia";
                        datakelulusansiswa["kodeskhb"] = 1;

                    }
                }

            })
            .catch(er => console.log(er));

        let paramer = "&kelas=" + namakelas + "&prefiktab=daftarraport"
        await fetch(urlnilai + "?action=getdatafromtab" + paramer)
            .then(n => n.json())
            .then(o => {
                if (o.result == 0) {
                    datakelulusansiswa["adaskraport"] = "Maaf, Surat Keterangan Daftar Nilai Raport untuk kelas Ananda belum dipublikasikan";
                    datakelulusansiswa["kodeskraport"] = 0;
                } else {
                    let arskrr = o.data.filter(b => b.namasiswa == namasiswa);
                    let indekskrr;
                    if (arskrr.length == 0) {
                        datakelulusansiswa["adaskraport"] = "Maaf, Surat Keterangan Daftar Nilai Raport belum dipublikasikan guru Ananda";
                        datakelulusansiswa["kodeskraport"] = 0;
                    } else {
                        indekskrr = arskrr.length - 1;
                        datakelulusansiswa["idskraport"] = arskrr[indekskrr].idfile;
                        datakelulusansiswa["adaskraport"] = "&checkmark; Tersedia";
                        datakelulusansiswa["kodeskraport"] = 1;

                    }
                }

            })
            .catch(er => console.log(er))



        let tombolpengumuman = (datakelulusansiswa["kodepengumuman"] == 1) ? `<button onclick="apikelulusan('${datakelulusansiswa["idpengumuman"]}')">Cek</button>` : "-";
        let tombolskhb = (datakelulusansiswa["kodeskhb"] == 1) ? `<button onclick="apikelulusan('${datakelulusansiswa["idskhb"]}')">Cek</button>` : "-";
        let tombolskraport = (datakelulusansiswa["kodeskraport"] == 1) ? `<button onclick="apikelulusan('${datakelulusansiswa["idskraport"]}')">Cek</button>` : "-";

        tekshtmlfokuslainnya = `
            <table class="w3-table-all">
                <tr>
                    <td>Surat Pengumuman Kelulusan</td>
                    <td>${tombolpengumuman}</td>
                    <td class="pengumumantersedia">${datakelulusansiswa["adapengumuman"]}</td>
                    </tr>
                    <tr>
                    <td>Surat Keterangan Hasil Belajar</td>
                    <td>${tombolskhb}</td>
                    <td>${datakelulusansiswa["adaskhb"]}</td>
                    </tr>
                    <tr>
                    <td>Surat Keterangan Daftar Nilai Raport</td>
                    <td>${tombolskraport}</td>
                    <td>${datakelulusansiswa["adaskraport"]}</td>
                </tr>
            </table>
            `;

    }
    htmlfokus.innerHTML = tekshtmlfokus;
    htmlfokuslainnya.innerHTML = tekshtmlfokuslainnya;

    //console.log(benarga)
}

const apikelulusan = (idfile) => {
    let htmlfokus = document.querySelector(".htmlfokus");
    htmlfokus.innerHTML = "<i class='fa fa-spin fa-spinner w3-xxlarge'></i> Sedang proses ...";
    //let htmlfokuslainnya = document.querySelector(".htmlfokuslainnya");
    fetch(urlnilai + "?idmateri=" + idfile + "&action=previewriwayat")
        .then(m => m.json())
        .then(k => {
            htmlfokus.innerHTML = brkline(k);
            let btntombol = document.querySelector(".tmblprintkelulusan");
            btntombol.className = btntombol.className.replace("w3-hide", "w3-show");
        })
        .catch(er => htmlfokus.innerHTML = er)
}
const printmodalkelulusan = () => {
    let isibody = document.querySelector(".htmlfokus").innerHTML;

    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO DATA KELULUSAN</title>`;
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
// loadingljk.style.display = "block";

// document.querySelector(".kontenmateri").innerHTML = "";
// infoloadingljk.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`;
// // setTimeout(function () {
// //     infoloadingljk.innerHTML = `${siswanya}`;
// //     //let cariindek = dataapikelulusan.findIndex(x => x["namasiswa"] == siswanya);
// //     console.log(dataapikelulusan);
// // }, 5000);
// let tab = "datakelulusan"
// let param = "&kelas=" + namakelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;

// await fetch(urlnilai + "?action=getdatafromtab" + param)

//}

const profilsayasiswa = () => {
    let ss = jlo.ss_datauser;
    let ur = jlo.url_datauser;
    let ling = ur + "?idss=" + ss;
    let datahtml = "", fil;
    loadingljk.style.display = "block";
    let img = document.querySelector(".avatarsiswa");
    let srcimg = (img === null || img === undefined) ? "/img/L_vT86_100px.png" : img.getAttribute("src");
    // console.log(srcimg)

    document.querySelector(".kontenmateri").innerHTML = "";
    infoloadingljk.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`;

    fetch(ling + "&action=datasiswaaktif&kelas=" + namakelas)
        .then(m => m.json())
        .then(k => {
            //console.log(k);
            fil = k.datasiswa.filter(k => k.pd_nama == namasiswa)[0];
            //console.log(fil);
            infoloadingljk.innerHTML = `
            <h4 class="w3-center">Profil Siswa</h4>
            <div class="w3-center">
            <img src='${srcimg}' class='avatarsiswa' style="width:50%"/><br/>
            <sup>Poto Profil ini berdasarkan Poto Absen Ananda hari ini</sup>
            </div>
            <hr/>

            <table class="w3-table w3-striped">
                <tr>
                    <td>Kode Token</td>
                    <td>:</td>
                    <td>${fil.id}</td>
                </tr>
                <tr>
                    <td>Nama Lengkap</td>
                    <td>:</td>
                    <td>${fil.pd_nama}</td>
                </tr>
                <tr>
                    <td>Tempat, Tanggal Lahir</td>
                    <td>:</td>
                    <td>${fil.pd_tl}, ${tanggalfull(fil.pd_tanggallahir)}</td>
                </tr>
                <tr>
                    <td>Kelas</td>
                    <td>:</td>
                    <td>${fil.nama_rombel}</td>
                </tr>
                <tr>
                    <td>Nomor Induk Sekolah (NIS)</td>
                    <td>:</td>
                    <td>${fil.nis}</td>
                </tr>
                <tr>
                    <td>Nomor Induk Sekolah Nasional (NISN)</td>
                    <td>:</td>
                    <td>${fil.nisn}</td>
                </tr>
                <tr>
                    <td>Agama</td>
                    <td>:</td>
                    <td>${fil.pd_agama}</td>
                </tr>
                <tr>
                    <td>Gender</td>
                    <td>:</td>
                    <td>${(fil.pd_jk == "L") ? "Laki-laki" : "Perempuan"}</td>
                </tr>

                <tr>
                    <td>Nama Ayah</td>
                    <td>:</td>
                    <td>${fil.pd_namaayah}</td>
                </tr>

                <tr>
                    <td>Nama Ibu</td>
                    <td>:</td>
                    <td>${fil.pd_namaibu}</td>
                </tr>
                <tr>
                    <td>Nomor Induk Kependudukan (NIK)</td>
                    <td>:</td>
                    <td>${fil.nik}</td>
                </tr>
                <tr>
                    <td>Nomor Handphone (HP Whatsapp)</td>
                    <td>:</td>
                    <td>${fil.pd_hp}</td>
                </tr>
                <tr>
                    <td>Alamat</td>
                    <td>:</td>
                    <td>${fil.pd_alamat}</td>
                </tr>

            </table>
            Apabila data-data tersebut ada bagian data yang kurang tepat, silakan hubungi guru kelas Ananda.
            <br/>
            <sub>Nama Siswa yang mengandung tanda baca apostrof (') atau titik satu di atas (huruf 'ain ejaan Bahasa Arab), sengaja tidak diperkanankan</sub>
            <br/>

            `;
            //infoloadingljk.innerHTML = datahtml;

        })
}


const lihatraportsemester = () => {
    //cek dulu data apinya ada ga untuk namasiswa ini:
    w3_close();
    loadingAPI.style.display = "block";
    fetch(urlnilai + "?action=cekpublikasiraportsemester&kelas=" + namakelas)
        .then(m => m.json())
        .then(r => {
            let namaanakini = r.data.filter(k => k.namasiswa == namasiswa);//"ABIN NUGRAHA");
            if (namaanakini.length > 0) {
                if (namaanakini[0].semesterpublikasi == "show") {
                    modalraport(namaanakini[0].raportsemester)

                } else {

                    alert("Mohon Maaf, Raport belum dipublikasikan.")
                }
            } else {
                alert("Mohon Maaf, Raport belum dipublikasikan.")
            }
            loadingAPI.style.display = "none";
        }).catch(er => {
            alert(er);
            loadingAPI.style.display = "none";

        })
}


let jsonmenudatapembelajaran;
const menudatapembelajaran = async () => {
    modalmateri.style.display = "block";
    spanlabelmateri.innerHTML = `<i class="fa fa-spin fa-spinner w3-large"></i>`;
    divmodalmateri.innerHTML = `<i class="fa fa-spin fa-spinner w3-large"></i> Memproses data`;
    let paramtambahan = "&idkelas=" + encodeURIComponent(namakelas);
    let ressort = [], res = [];

    spanlabelmateri.innerHTML = `<i class="fa fa-spin fa-spinner w3-large"></i>`;

    await fetch(linkmateri + "&action=kronolog&idtoken=" + jenjang)
        .then(m => m.json())
        .then(j => {

            spanlabelmateri.innerHTML = j.result.length;//"Jumlah Materi ada " +  + " Silakan pilih : <br><sub class='w3-text-blue'>Materi terbaru ada di urutan terakhir</sub>";

            jsonmenudatapembelajaran = j.result;

            let tekstabel = `
            <table class="w3-card-4 w3-table-all garis w3-centered w3-tiny">
            <tr>
                <th>
                    Identitas KBM
                </th>
                <th>
                    Hasil Belajar
                </th>
                <th>
                    Waktu KBM
                </th>
                <th>
                    Aksi
                </th>
            </tr>`;

            let i

            for (i = j.result.length - 1; i >= 0; i--) {
                let indek = i;
                let mtri = jsonmenudatapembelajaran[indek].idmapel;
                let idmateri = jsonmenudatapembelajaran[indek].idmateri;
                let tagih = jsonmenudatapembelajaran[indek].jenistagihan
                let ctok = jsonmenudatapembelajaran[indek].crtToken
                let idtgl = jsonmenudatapembelajaran[indek].idtgl;
                let idtglend = jsonmenudatapembelajaran[indek].idtglend;
                let trueEssay = (jsonmenudatapembelajaran[indek].jumlahessay == 0) ? false : true;
                let bataswaktu = new Date(idtglend).getTime();
                let awalwaktu = new Date(idtgl).getTime()

                let integerWaktusekarang = new Date().getTime();
                let tekstomboloffline = `<button class='w3-button w3-blue' onclick='soaloffline("${idmateri}")'>Materi</button>`
                let tombolcek = `<button class='w3-button w3-blue' onclick='modalfnmateri(${indek});'>Cek</button>`

                tekstabel += `
            <tr>
                <td>
                    ${mtri.toUpperCase()}
                </td>
                <td>
                    <div id="ddtabelhasilbelajar">
                    ${tombolcek}
                    </div>
                    </td>
                    <td>
                    ${tanggalfulllengkap(new Date(idtgl))} <br> s/d<br>
                    ${tanggalfulllengkap(new Date(idtglend))} <br>
                    
                    </td>
                    <td id="tdtombolsoaloffline">
                    ${tekstomboloffline}
                
                </td>
            </tr>
            `
            }

            tekstabel += `
            </table>
            
            `
            divmodalmateri.innerHTML = tekstabel;

        }).catch(er => {
            console.log(er);
        })




}
const fetckronologi = () => {
    fetch(linkmateri + "&action=kronolog&idtoken=" + jenjang)
        .then(m => m.json())
        .then(j => {
            //templatekronologi(j.result);
            //kronologijson = j.result;
            console.log(j)

        })
}

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


const modalfnmateri = (indekk) => {
    // let x = document.getElementById("siswapilihmateri").selectedIndex;
    // let y = document.getElementById("siswapilihmateri").options;
    // //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);
    //let namabulan = y[x].text;
    //modalnamabulan.innerHTML = namabulan.toUpperCase() + " 2021";
    let indek = parseInt(indekk);

    let mtri = jsonmenudatapembelajaran[indek].idmapel;
    let idmateri = jsonmenudatapembelajaran[indek].idmateri;
    let tagih = jsonmenudatapembelajaran[indek].jenistagihan
    let ctok = jsonmenudatapembelajaran[indek].crtToken
    let idtgl = jsonmenudatapembelajaran[indek].idtgl;
    let idtglend = jsonmenudatapembelajaran[indek].idtglend;
    let trueEssay = (jsonmenudatapembelajaran[indek].jumlahessay == 0) ? false : true;
    let bataswaktu = new Date(idtglend).getTime();
    let awalwaktu = new Date(idtgl).getTime()

    let integerWaktusekarang = new Date().getTime();

    divmodalmateri.innerHTML = `
    <table class="w3-card-4 w3-table-all garis w3-centered w3-tiny">
    <tr>
        <th>
            Identitas KBM
        </th>
        <th>
            Hasil Belajar
        </th>
        <th>
            Waktu KBM
        </th>
        <th>
            Aksi
        </th>
    </tr>
    <tr>
        <td>
            ${mtri.toUpperCase()}
        </td>
        <td>
            <div id="ddtabelhasilbelajar">
            <i class="fa fa-spin fa-refresh"></i>
            </div>
            </td>
            <td>
            ${tanggalfulllengkap(new Date(idtgl))} <br> s/d<br>
            ${tanggalfulllengkap(new Date(idtglend))} <br>
            
            </td>
            <td id="tdtombolsoaloffline">
            <i class="fa fa-spin fa-refresh"></i>
        
        </td>
    </tr>
    
    </table>
    <button class="wa" onclick="menudatapembelajaran()">Lihat Kembali</button>
    `

    // let url = urlnilai + "?action=datasiswasudahmengerjakan";
    let paramtambahan = "&idkelas=" + encodeURIComponent(namakelas);
    fetch(urlnilai + "?action=nilairseponkronologi" + paramtambahan)
        .then(m => m.json())
        .then(f => {
            // console.log(f)
            let res = f.records;



            let ressort = res.filter(k => k.idmapel == mtri && k.jenistagihan == tagih & k.crtToken == ctok & k.namasiswa == namasiswa)
            // nilairesponkronologi = f.records;
            if (ressort.length == 0) {
                if (integerWaktusekarang < awalwaktu && integerWaktusekarang < bataswaktu) {
                    ddtabelhasilbelajar.innerHTML = "Maaf, Pembelajaran belum bisa diakses";
                    tdtombolsoaloffline.innerHTML = "Maaf, Pembelajaran belum bisa diakses";
                }
                else if (integerWaktusekarang > awalwaktu && integerWaktusekarang > bataswaktu) {

                    ddtabelhasilbelajar.innerHTML = "Ananda melewatkan KBM Ini";
                    tdtombolsoaloffline.innerHTML = `<button class='w3-button w3-blue' onclick='soaloffline("${idmateri}")'>Materi</button>`;
                    alert("Ananda melewatkan KBM ini. Tapi jangan khawatir, cobalah Ananda Klik tombol Latihan Lagi, tulis jawabannya di kertas kemudian serahkan ke gurumu via Whatsapp. Gurumu akan membantumu.")
                } else {
                    //domTabel.rows[(d + 1)].cells[6].innerHTML = `<button class="w3-button w3-green" onclick="previewriwayat(${d})">Mulai Belajar</button>`
                    ddtabelhasilbelajar.innerHTML = "Sedang Berlangsung, tapi nilai belum dikirimkan";
                    tdtombolsoaloffline.innerHTML = "Sedang Berlangsung, tapi nilai belum dikirimkan";
                    let elhadir = document.querySelector(".ketabsensiswa")
                    if (elhadir.innerHTML == "Ananda Belum Absen") {
                        alert("Ayo, materi ini sedang berlangsung. Ananda masih punya kesempatan untuk mengerjakan dan mengirimkan nilai. Silakan Ananda Absen terlebih dahulu untuk mengerjakannya.")
                    } else {
                        alert("Ayo, materi ini sedang berlangsung. Ananda masih punya kesempatan untuk mengerjakan dan mengirimkan nilai. Ananda sudah absen, silakan ke halaman utama untuk mengerjakan materi")
                    }
                }

            } else {
                let last = ressort.length - 1;
                let obnilaikd = ressort[last].nilaikd;
                let idhtml = ressort[last].html_jawaban;
                let cekessay = (ressort[last].nilaiEssay == "" && trueEssay) ? `<button class='w3-button w3-red' onclick='lihatljksaya("${idhtml}");modalmateri.style.display = "none"'>LJK (?)</button>` : `<button class='w3-button w3-green' onclick='lihatljksaya("${idhtml}");modalmateri.style.display = "none"'>LJK <i class="fa fa-check-circle"></i></button>`;


                let objek = JSON.parse(obnilaikd);
                let keyobjek = Object.keys(objek)
                let teks = "";
                for (i = 0; i < keyobjek.length; i++) {
                    teks += keyobjek[i] + " = " + objek[keyobjek[i]] + "<br>"

                }

                //let teks =`${obnilaikd["PKN_3.1"]}`
                let usbukan = (ressort[last].jenistagihan == "ustertulis") ? true : false;
                if (usbukan) {
                    ddtabelhasilbelajar.innerHTML = `Nilai akan diumumkan pada tanggal 15 Juni 2021 di menu Pengumuman Kelulusan`;
                } else {
                    ddtabelhasilbelajar.innerHTML = `Selesai, dengan skor <br> ${teks}<br>${cekessay}`;

                }

                tdtombolsoaloffline.innerHTML = `<button class='w3-button w3-blue' onclick='soaloffline("${idmateri}")'>Materi</button>`


            }


        }
        )


}


const soaloffline = (html_jawaban) => {
    loadingljk.style.display = "block";
    modalmateri.style.display = "none";

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

        }
        else if (asal.indexOf("_OPSI-PG-C_") > -1) {
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
            var tekskunci = asal.replace("_KUNCI-KD_", "").replace(/\s+/g, "").split("<||>");//.split(":");
            let ar = []
            let ob = {};
            for (i = 0; i < tekskunci.length; i++) {

                // ob[tekskunci[i].split(":")[0]] = tekskunci[i].split(":")[1].split(",");
                ob[tekskunci[i].split(":")[0]] = tekskunci[i].split(":")[1].replace("[", "").replace("]", "").split(",");
                ar.push(ob)
            }
            localStorage.setItem("kuncikd", JSON.stringify(ob));// ---> sudah objek array



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

            tescekelement.innerHTML = "Server berhasil merespon dengan pesan: " + JSON.parse(xhr.responseText).result;//"Terima Kasih, Ananda telah menyelesaikan pembelajaran ini dengan hasil:<br/>Skor PG = " + nilaiPGku.innerHTML; //+ xhr.responseText ;
            setTimeout(function () {
                tescekelement.innerHTML = "";
                let id = parseInt(indekmaterionline.innerHTML);
                cekkerjaan(id);
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
    katajadi += `<input id='iduploadpotoessay${id}' onclick='uploadpotoessay("${id}")' style='display:none'/>`;//"<input type='file' id='iduploadpotoessay" + id + "' onchange='uploadpotoessay(" + id + ")' style='display:none'/>"; //<div  id='filejawaban"+indexpotojawaban+"' class='jawabanfile' style='display:none' ></div>"
    katajadi += "</div>";
    //-----------------------------
    katajadi += "<br/>Ganti dengan mengetik jawaban:";
    katajadi += `<button onclick='tombolketikjawaban("${id}")'>Ketik Jawaban No. ${id}</button>`;//"<button onclick='tombolketikjawaban(" + id + ")'>Ketik Jawaban No. " + id + "</button>";
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
                td.innerHTML = "###";//kuncijawaban[parseInt(idopsi) - 1];
                var td = tr.insertCell(-1);
                td.innerHTML = "###";//PGBenar(kuncijawaban, idopsi)

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
        document.getElementById("resumenilai").removeAttribute("style");//removeAttribute
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

const menudatahasilbelajar = () => {
    loadingljk.style.display = "block";

    let divclass = document.querySelector(".kontenmateri");
    let tekshtml = "";
    document.querySelector(".kontenmateri").innerHTML = "";
    infoloadingljk.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`;
    $('#infoloadingljk').nextAll('button').remove();
    tekshtml = `<h3 class='w3-center'>Data Hasil Belajar</h3>
    <table class='w3-table-all w3-striped w3-tiny'>
    <tr>
        <td>Laporan Hasil Belajar Tengah Semester (Raport Bayangan PTS)</td>
        <td><button onclick="lihatraportpts()">Cek Hasil PTS</button></td>
    </tr>
    <tr>
        <td>Laporan Hasil Belajar Akhir Semester (Raport Bayangan PTS)</td>
        <td><button onclick="lihatraportsemester()">Cek Raport Semester</button></td>
    </tr>`
    if (jenjang == 6) {
        tekshtml += `
        <tr>
            <td>Kelulusan</td>
            <td><button onclick="pengumumankelulusan()">Cek Kelulusan</button></td>
        </tr>`
    } else {

    };
    tekshtml += `
    </table>
    `
    infoloadingljk.innerHTML = tekshtml;



}