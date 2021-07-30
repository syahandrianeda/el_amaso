/////////////////////////////
// siswa.js
/////////////////////////////

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
};




function logout() {

    w3_close();
    let nilaikuki = getCookie("lamankode");
    let nilaipukul = getCookie("ketpukul");
    let nilaikethadir = getCookie("kethadir")
    let nilaisrcImg = getCookie("srcImg")

    var dt = new Date();
    let d = new Date(dt.getFullYear() - 1, dt.getMonth(), dt.getDate(), 0, 0, 0, 0)
    // var expires = "expires="+d.toUTCString();
    var expires = "expires=" + d;
    document.cookie = "lamankode=" + nilaikuki + ";" + expires + ";path=/";
    document.cookie = "ketpukul=" + nilaipukul + ";" + expires + ";path=/";
    document.cookie = "kethadir=" + nilaikethadir + ";" + expires + ";path=/";
    document.cookie = "srcImg=" + nilaisrcImg + ";" + expires + ";path=/";


    window.localStorage.clear();
    window.location.replace("/index.html")
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



const tampilinsublamansiswa = (fitur) => {
    //datakelas
    if (fitur == "libur") {
        lamansiswa.style.display = "none";
        lamanlibur.style.display = "block";
        lamanmateri.style.display = "none"

        document.getElementById("mySidebar").scrollIntoView();
    } else if (fitur == "aktifsudahabsen") {
        lamansiswa.style.display = "block";
        document.querySelector(".sudahabsen").style.display = "none"
        document.querySelector(".belumabsen").style.display = "none"
        lamanlibur.style.display = "none";
        lamanmateri.style.display = "none";
        panggilmateri()


        document.getElementById("mySidebar").scrollIntoView();

    } else if (fitur == "aktifbelumabsen") {
        lamansiswa.style.display = "block";
        document.querySelector(".sudahabsen").style.display = "none"
        document.querySelector(".belumabsen").style.display = "inline-block"
        lamanlibur.style.display = "none";
        lamanmateri.style.display = "none"

    } else if (fitur == 3) { // ketika siswa udah mengeklik materi dan sudah ditampilkan materi;
        panggilmateri();
        document.querySelector(".sudahabsen").style.display = "none"
        ///-------------------------------------------------------

        document.getElementById("mySidebar").scrollIntoView();
    } else if (fitur == 4) { // lamansudah aktif;
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
    return tgl + " " + bulan[bln] + " " + thn;
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

function uploadfilebantu2gagal() {


    //define the width to resize e.g 600px
    var resize_width = 150; //without px

    //get the image selected
    var item = document.querySelector('#lampirkanpotoabsen').files[0];

    //create a FileReader
    var reader = new FileReader();

    //image turned to base64-encoded Data URI.
    reader.readAsDataURL(item);
    reader.name = item.name; //get the image's name
    reader.size = item.size; //get the image's size
    reader.onload = function (event) {
        var img = new Image(); //create a image
        img.src = event.target.result; //result is base64-encoded Data URI
        img.name = event.target.name; //set name (optional)
        img.size = event.target.size; //set size (optional)
        img.onload = function (el) {
            var elem = document.createElement('canvas'); //create a canvas

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
            //console.log(inputbase64.length)


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
    document.bantukirim.tokensiswa.value = tokensiswa;
    document.bantukirim.id.value = idok;
    document.bantukirim.kelas.value = namakelas;
    document.bantukirim.name.value = namasiswa;
    //document.bantukirim.name.value = namasiswa;
    document.bantuisi.style.display = "none";
    document.querySelector(".inginkirim").style.display = "block";
    thankyou_messagekirim.innerHTML = "Data Siap Dikirim"
}

function uploadfilebantu() {
    //define the width to resize e.g 600px
    var resize_width = 150; //without px
    //get the image selected
    var item = document.querySelector('#lampirkanpotoabsen').files[0];
    //create a FileReader
    var reader = new FileReader();
    //image turned to base64-encoded Data URI.
    reader.readAsDataURL(item);
    reader.name = item.name; //get the image's name
    reader.size = item.size; //get the image's size
    reader.onload = function (event) {
        var img = new Image(); //create a image
        img.src = event.target.result; //result is base64-encoded Data URI

        img.size = event.target.size; //set size (optional)
        img.onload = function (el) {
            var elem = document.createElement('canvas'); //create a canvas
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
            poto.src = "/img/barloading.gif";

            kodefilepotosiswaabsen.innerHTML = "";

            // var inputbase64 = document.createElement("input");
            // inputbase64.setAttribute("name", "fileContent");
            // inputbase64.value = srcEncoded.replace(/^.*,/, '');

            // var inputfilename = document.createElement("input");
            // inputfilename.setAttribute("name", "filename");
            // inputfilename.value = "avatar_" + namebantukirim.value.toUpperCase().replace(/\s+/, "_");

            // var inputmimetype = document.createElement("input");
            // inputmimetype.setAttribute("name", "mimeType")
            // inputmimetype.value = "data:image/jpeg"; //e.target.result.match(/^.*(?=;)/)[0]
            //sekarang kita taroh di sini:

            // buat generate input
            // kodefilepotosiswaabsen.appendChild(inputbase64);
            // kodefilepotosiswaabsen.appendChild(inputfilename);
            // kodefilepotosiswaabsen.appendChild(inputmimetype);
            let d_bs64 = srcEncoded.replace(/^.*,/, '');
            let d_fname = "avatar_" + namebantukirim.value.toUpperCase().replace(/\s+/, "_");
            let d_mtp = srcEncoded.match(/^.*(?=;)/)[0];
            let data = new FormData();
            data.append("action", "uploaddulu");
            data.append("filename", d_fname);
            data.append("fileContent", d_bs64);
            data.append("mimeType", d_mtp);
            var url = url_absensiswa + "?action=uploaddulu";
            fetch(url, {
                    method: 'post',
                    body: data
                }).then(m => m.json())
                .then(k => {
                    console.log(k)
                    var inputbase64 = document.createElement("input");
                    inputbase64.setAttribute("name", "fileContent");
                    poto.src = (k.idfile == "") ? srcEncoded : "https://drive.google.com/uc?export=view&id=" + k.idfile;

                    if (k.sukses == "Sukses") {
                        document.bantuisi.style.display = "none";
                        document.querySelector(".inginkirim").style.display = "block";
                        thankyou_messagekirim.innerHTML = "Data Siap Dikirim"
                        inputbase64.value = k.idfile;

                    } else {
                        document.bantuisi.style.display = "block";
                        document.querySelector(".inginkirim").style.display = "block";
                        thankyou_messagekirim.innerHTML = "Data Siap dikirim (pengecualian)"
                        inputbase64.value = srcEncoded;


                    }


                    // akhir.sukses = "Sukses";
                    // akhir.respon = "";
                    // akhir.idfile = idFile;
                    let a = new Date();
                    let b = a.getDate();
                    let c = a.getMonth() + 1;
                    let d = a.getFullYear()
                    let idok = b + "" + addZero(c) + "" + d;
                    document.bantukirim.tokensiswa.value = tokensiswa;
                    document.bantukirim.id.value = idok;
                    document.bantukirim.kelas.value = namakelas;
                    document.bantukirim.name.value = namasiswa;
                    //document.bantukirim.name.value = namasiswa;
                    kodefilepotosiswaabsen.appendChild(inputbase64);
                }).catch(er => console.log(er));



        }
        loginbantu.style.display = "inline-block";
    }

    //document.bantuisi.time_stampbantu.value = new Date();
    //document.bantukirim.Time_Stamp.value = new Date();
    // let a = new Date();
    // let b = a.getDate();
    // let c = a.getMonth() + 1;
    // let d = a.getFullYear()
    // let idok = b + "" + addZero(c) + "" + d;
    // document.bantukirim.tokensiswa.value = tokensiswa;
    // document.bantukirim.id.value = idok;
    // document.bantukirim.kelas.value = namakelas;
    // document.bantukirim.name.value = namasiswa;
    // //document.bantukirim.name.value = namasiswa;
    // document.bantuisi.style.display = "none";
    // document.querySelector(".inginkirim").style.display = "block";
    // thankyou_messagekirim.innerHTML = "Data Siap Dikirim"
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

    var namaform = document.getElementById("bantukirim");
    var en = new FormData(namaform)

    var url = url_absensiswa + "?action=siswaabsensiswa";
    fetch(url, {
            method: 'post',
            body: en
        }).then(m => m.json())
        .then(k => {
            document.getElementById("bantusiapa").innerHTML = ""; //+ "  Data telah berhasil dibantu, Terima kasih";
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
            document.querySelector(".ketabsensiswa").innerHTML = kethadir + " " + ketpukul;
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
}
let stoploadingtopbar;
const loadingtopbarin = (el) => {
    var elem = document.querySelector("." + el);
    elem.className = elem.className.replace("w3-hide", "");
    elem.style.width = "1px";
    var width = 1;
    stoploadingtopbar = setInterval(frame2, 10);

    function frame2() {
        if (width >= 1000000) {
            clearInterval(stoploadingtopbar);
            // elem.style.width = 0;
            // elem.style.width = 90 + '%';
            // elem.innerHTML = `100%`;
        } else {
            width += 100;
            elem.style.width = width / 1000 + '%';
            //elem.innerHTML = (width / 105).toFixed(0) + "% ";
        }
    }
}

(async function () {
    namasekolah.innerHTML = identitassekolah;
    namakota.innerHTML = identitaskotasekolah;
    
    //---------------------------------------------------------
    //loadingmodal.style.display = "block";
    var elem = document.querySelector(".loadingtopbar");
    elem.style.width = "1px";
    let divlod;
    loadingtopbarin("loadingtopbar");
    dashboardnamasiswa.innerHTML = `<i class="fa fa-spin fa-spinner w3-large"><i>`;
    /// fungsi untuk mengupdate datasiswa ();
    let url_login_siswa = jlo.url_datauser + "?action=loginsiswa&idss=" + jlo.ss_datauser;
    await fetch(url_login_siswa + "&id=" + tokensiswa)
        .then(m => m.json())
        .then(k => {
            // console.log(k)
            if (k.ijinkan == "ok") {
                window.localStorage.setItem("typeuser", JSON.stringify(k));
                //window.location.replace("/user/siswa.html");
                // ceksiswa.innerHTML = k.ijinkan;
                namasiswa = k.user;
                namakelas = k.room;
                tokensiswa = k.idrow;
                jenjang = k.jenjang;
                absenheader = "absen" + jenjang;

            } else {
                //ceksiswa.innerHTML = k.ijinkan;
                alert(k.ijinkan);
                window.localStorage.removeItem("typeuser");
                window.location.replace("/index.html")
            }

        }).catch(err => {
            console.log(err)
        })
    await fetch(url_absenkaldik).then(m => m.json()).then(k => {
        //console.table(k.records)
        arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
        arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));
        localStorage.setItem('Kaldik', JSON.stringify(k.records));

        localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl))
    }).catch(er => console.log(er))

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

            if (indekhari == 0 || indekhari == 6 || indek > -1) {
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

    } else {
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

            if (indekhari == 0 || indekhari == 6 || indek > -1) {
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

    clearInterval(stoploadingtopbar);
    divlod = document.querySelector(".loadingtopbar");
    divlod.style.width = "100%";
    setTimeout(() => {
        divlod.style.width = "1px"
        divlod.className += " w3-hide";

    }, 3000);

})()

const absennya = (bol) => {
    if (bol) {
        //console.log("cara data absen")
        let a = new Date();
        let b = a.getDate();
        let c = a.getMonth() + 1;
        let d = a.getFullYear()
        let idok = b + "" + addZero(c) + "" + d;
        fetch(url_absensiswa + "?action=absensiswahariini&kelas=" + namakelas + "&tokensiswa=" + tokensiswa + "&id=" + idok)
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
                    document.querySelector(".ketabsensiswa").innerHTML = kethadir + " " + ketpukul;
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
                console.log(er); //
                alert("Terjadi kesalahan, silakan hubungi pihak sekolah.")
                setTimeout(function () {
                    //location.reload()
                }, 2000)
            });; //.catch(err => {console.log(err);location.replace("siswa.html")}) 
    }
}


const lihatraportpts = () => {
    //cek dulu data apinya ada ga untuk namasiswa ini:
    w3_close();
    loadingAPI.style.display = "block";
    fetch(urlnilai + "?action=cekpublikasiraportpts&kelas=" + namakelas)
        .then(m => m.json())
        .then(r => {
            let namaanakini = r.data.filter(k => k.namasiswa == namasiswa); //"ABIN NUGRAHA");
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
        let param = "&kelas=" + namakelas + "&prefiktab=" + tab; //+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
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

const profilsayasiswa = () => {
    let ss = jlo.ss_datauser;
    let ur = jlo.url_datauser;
    let ling = ur + "?idss=" + ss;
    let datahtml = "",
        fil;
    loadingljk.style.display = "block";
    let img = document.querySelector(".avatarsiswa");
    let srcimg = img.getAttribute("src");
    // console.log(srcimg)

    document.querySelector(".kontenmateri").innerHTML = "";
    infoloadingljk.innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"></p>`;

    fetch(ling + "&action=datasiswaaktif&kelas=" + namakelas)
        .then(m => m.json())
        .then(k => {
            //console.log(k);
            fil = k.datasiswa.filter(k => k.id == tokensiswa)[0];
            //console.log(fil);
            infoloadingljk.innerHTML = `
            <h4 class="w3-center">Biodataku (Profil)</h4>
            <div class="w3-center">
            <img src='${srcimg}' class='avatarsiswa' style="width:50%"/><br/>
            <sup>Poto Profil ini berdasarkan Poto Absen Ananda hari ini</sup>
            </div>
            <hr/>
           
            <table class="w3-table w3-striped w3-border">
                <tr class="warnaeka">
                    <td colspan="3" class="w3-center">Kode Akses Lamaso (Token)</td>
                </tr>
                <tr>
                    <td>Kode Token</td>
                    <td>:</td>
                    <td>${fil.id}</td>
                </tr>
                
                
                <tr class="warnaeka">
                    <td colspan="3" class="w3-center">Data Pribadi Siswa</td>
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
                <tr class="w3-white">
                    <td colspan="3" class="w3-center"></td>
                </tr>
                
                <tr class="warnaeka">
                    <td colspan="3" class="w3-center">Data Orang Tua</td>
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
            </table>
            Apabila data-data tersebut ada bagian data yang kurang tepat, Silakan ajukan Usulan Perubahan Data di tombol berikut ini
            <br/>
            <br/>
            <div class="w3-center">
            <button class="w3-button w3-card-4 w3-round-large warnaeka" onclick="biolengkap()">Biodata Detail</button>
            <button class="w3-button w3-card-4 w3-round-large warnaeka" onclick="ajuanperubahandata()">Ajuan Perubahan Data</button>
            </div>
            <br/>
            `;
            //infoloadingljk.innerHTML = datahtml;

        })
}
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

function umur(tgllahir) {
    var curday = new Date().getDate();; //document.cir.len11.value;
    var curmon = new Date().getMonth(); //.cir.len12.value;
    var curyear = new Date().getFullYear(); //.cir.len13.value;

    var calday = new Date(tgllahir).getDate(); //document.cir.len21.value;
    var calmon = new Date(tgllahir).getMonth(); //document.cir.len22.value;
    var calyear = new Date(tgllahir).getFullYear(); //document.cir.len23.value;

    var curd = new Date(curyear, curmon, curday);
    var cald = new Date(calyear, calmon, calday);


    var dife = datediff(curd, cald);
    let objret = {};
    objret.tahun = dife[0];
    objret.bulan = dife[1];
    objret.hari = dife[2];
    return objret
}

function datediff(date1, date2) {
    var y1 = date1.getFullYear(),
        m1 = date1.getMonth(),
        d1 = date1.getDate(),
        y2 = date2.getFullYear(),
        m2 = date2.getMonth(),
        d2 = date2.getDate();

    if (d1 < d2) {
        m1--;
        d1 += DaysInMonth2(y2, m2);
    }
    if (m1 < m2) {
        y1--;
        m1 += 12;
    }
    return [y1 - y2, m1 - m2, d1 - d2];
}

function DaysInMonth2(Y, M) {
    with(new Date(Y, M, 1, 12)) {
        setDate(0);
        return getDate();
    }
}

const konversi_tanggal = (el, kelas) => {
    let d = new Date(el.value);
    let div = document.querySelector("." + kelas);

    var tgl = d.getDate();
    var bln = d.getMonth();
    var thn = d.getFullYear();
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    let result = tgl + " " + bulan[bln] + " " + thn;

    div.innerHTML = `${result}`;
};
const htmlformulirdatasiswa = () => {
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
    Isian ini untuk mengisi data riwayat sekolah sebelum di ${identitassekolah}. Contoh TK, RA, PAUD.<br/><br/>
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
        <button onclick="validasiajuandata()" class="w3-button w3-card-4 warnaeka w3-margin w3-border-bottom w3-border-black w3-round-large"><i class="fa fa-paper-plane"></i> Kirim Ajuan </button>
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
    let namafile = namasiswa + "_" + namadokumen;

    let data = new FormData();
    data.append("action", "uploadfiledulu");
    data.append("fileContent", param);
    data.append("mimeType", tipe);
    data.append("filename", namafile);
    data.append("kelas", namakelas);
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
const validasiajuandata = () => {
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
    datakirim.append("tab", "new_datasiswa");
    datakirim.append("tabel", tabel);
    datakirim.append("tokensiswa", tokensiswa);
    datakirim.append("idss", jlo.ss_datauser);

    infoloadingljk.innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"/></p>`
    fetch(url_absensiswa + "?action=daftarulangdankonfirmasinya", {
            method: "post",
            body: datakirim
        })
        .then(m => m.json())
        .then(r => {
            infoloadingljk.innerHTML = r.result;
        })
        .catch(er => {
            console.log(er);
            infoloadingljk.innerHTML = "Terjadi kesalahan";
        })


};
const biolengkap = () => {
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

    fetch(ling + "&action=usulanperbaikandata")
        .then(m => m.json())
        .then(k => {
            let cariidd = k.datasiswa.filter(s => s.id == tokensiswa);
            if (cariidd.length == 0) {
                infoloadingljk.innerHTML = `<h4 class="w3-center">Maaf, Ananda belum pernah mengusulkan Perubahan Data (Belum pernah mendaftar ulang)</h4>
                <div class="w3-center">
                <button class="w3-button w3-card-4 w3-round-large warnaeka" onclick="ajuanperubahandata()">Ajuan Perubahan Data</button>
                <button class="w3-button warnaeka w3-card-4 w3-round-large" onclick="infoloadingljk.innerHTML='';loadingljk.style.display='none'">Tutup Form</button>
                </div>`;
            } else {
                let html = htmldataprofil()
                infoloadingljk.innerHTML = `<div id="bio_print">${html}</div>
                <div class="w3-center tempattomboltambahan">
                Apabila ada data-data di atas terdapat kekeliruan, silakan ajukan perubahan data di link berikut:<br><br>
                <button class="w3-button w3-card-4 w3-round-large warnaeka" onclick="ajuanperubahandata()">Ajuan Perubahan Data</button>
                <br>
                <br>
                <button class="w3-button w3-card-4 w3-round-large warnaeka" onclick="printModalinfoljk('Data Siswa','bio_print')">Cetak</button>
                <button class="w3-button warnaeka w3-card-4 w3-round-large" onclick="infoloadingljk.innerHTML='';loadingljk.style.display='none'">Tutup Form</button>

                </div>`;
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
            }
        })
        .catch(er => {
            console.log(er);
            infoloadingljk.innerHTML = "Terjadi kesalahan. Ulangi sesi Anda sesaat lagi."
        })


    //document.querySelector(".kontenmateri").innerHTML = "";
    // infoloadingljk.innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"></p>`;
    //cekdaftarulang
};
const ajuanperubahandata = async () => {
    let ss = jlo.ss_datauser;
    let ur = jlo.url_datauser;
    let ling = ur + "?idss=" + ss;
    let datahtml = "",
        cariid;
    loadingljk.style.display = "block";
    $('#infoloadingljk').nextAll('button').remove();
    // let img = document.querySelector(".avatarsiswa");
    // let srcimg = img.getAttribute("src");
    // // console.log(srcimg)'
    infoloadingljk.innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"></p>`;
    await fetch(ling + "&action=usulanperbaikandata")
        .then(m => m.json())
        .then(k => {
            let sss = k.datasiswa.filter(s => s.id == tokensiswa);
            let ss = sss[0];
            let teks = "";
            let status = ss.usulanperubahandata
            if (status.indexOf("disetujui") > -1) {
                teks = status
            } else {
                teks = "sedang menunggu persetujuan admin Dapodik untuk disetujui."
            }
            if (sss.length == 0) {
                alert("Ananda belum pernah mengirimkan perubahan data (Belum daftar ulang)");
            } else {
                alert("Ananda Sudah pernah mengajukan perubahan data dan " + teks);

            }
        }).catch(er => {
            alert("terjadi kesalahan");
            console.log(er)
        })
    await fetch(ling + "&action=datasiswaaktif&kelas=" + namakelas)
        .then(m => m.json())
        .then(k => {
            // console.log(k);
            let sumber = k.datasiswa.filter(s => s.id == tokensiswa);
            console.log(sumber);
            datahtml = htmlformulirdatasiswa();
            infoloadingljk.innerHTML = datahtml;
            let obj = sumber[0];
            obj.action = "";
            let statussebelumnya = obj.usulanperubahandata
            if (statussebelumnya.indexOf("disetujui") > -1) {
                obj.usulanperubahandata = "Ajuan Ke-" + (parseInt(statussebelumnya.match(/(\d+)/)[0]) + 1);
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
                            // if (elementform[x].options[elementform[x].selectedIndex].value == nilai[d]) {
                            //     elementform[x].options[elementform[x].selectedIndex].selected = true;
                            //     //     elementform[x].selected = true;
                            // }
                            elementform[x].value = nilai[d];
                            // console.log(elementform[x].name + "|" + elementform[x].type)
                        } else {
                            if (angkadistring.indexOf(key[d]) > -1) {
                                elementform[x].value = nilai[d].replace("'", "")
                            } else {
                                elementform[x].value = nilai[d]

                            }
                        };
                    }
                }
            }

        }).catch(er => {
            console.log(er);
            infoloadingljk.innerHTML = "Terjadi kesalahan."
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

const lihatraportsemester = () => {
    //cek dulu data apinya ada ga untuk namasiswa ini:
    w3_close();
    loadingAPI.style.display = "block";
    fetch(urlnilai + "?action=cekpublikasiraportsemester&kelas=" + namakelas)
        .then(m => m.json())
        .then(r => {
            let namaanakini = r.data.filter(k => k.namasiswa == namasiswa); //"ABIN NUGRAHA");
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
};

const klikpotosiswa = (el) => {

    document.getElementById("img01").src = el.src;
    document.getElementById("previewpotoabsen").style.display = "block";

};


const panggilmateri = async () => {
    // loadingAPI.style.display = "block";
    // infoloadingAPI.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`;
    // //panggil dataApinya dulu;
    let a = new Date();
    let b = a.getDate();
    let c = a.getMonth() + 1;
    let d = a.getFullYear()
    let idokmateri = addZero(b) + "" + addZero(c) + "" + d;
    let parameterlain = "&crtToken=" + idokmateri + "&idtoken=" + jenjang;
    let html = "";
    let apikontenmateri
    await fetch(linkmateri + "&action=materihariini" + parameterlain)
        .then(m => m.json())
        .then(f => {
            console.log(f.result)
            localStorage.setItem("materi", JSON.stringify(f.result));
            let kontenmateri = f.result;
            apikontenmateri = f.result;
            if (kontenmateri.length == 0) {
                html = "Hari ini tidak ada materi."
            } else {
                html += `Materi Ananda hari ini ada ${kontenmateri.length}:`
                for (i = 0; i < kontenmateri.length; i++) {
                    html += `<div class="w3-card-4 mhi mhi_ke${i} w3-container w3-margin-bottom w3-margin-top">
                    <div class="w3-badge w3-left w3-black">${i+1}</div>
                    <div class="w3-badge w3-right warnaeka w3-text-black">${kontenmateri[i].jenistagihan}</div>
                    <div class="w3-clear"></div>
                    <h5 class="mhi_pembelajaran w3-bottombar">${kontenmateri[i].idmapel}</h5>
                    <div class="mhi_waktu w3-tiny w3-center w3-border-bottom">${waktufulllengkap(kontenmateri[i].idtgl)} - ${waktufulllengkap(kontenmateri[i].idtglend)}</div>
                    <div class="mhi_status_${i} w3-small w3-center">Sedang Memeriksa ... <i class="fa fa-refresh fa-spin"></i></div>
                    </div>`;
                }

            }
            document.querySelector(".klikmateri").innerHTML = html;

        })
        .catch(er => {
            console.log(er);
            infoloadingAPI.innerHTML = "Maaf, terjadi kegagalan koneksi. <hr>Pesan error :" + er
            document.querySelector(".klikmateri").innerHTML = "Mohon Maaf, terjadi kesalahan. Ulangi beberapa saat lagi. <br>Kode" + er

        })


    let j = 0;
    do {
        await cekkerjaan(j, apikontenmateri[j])
        j++
    }
    while (j < apikontenmateri.length);

    loadingAPI.style.display = "none";

}

const panggilmateridd = async () => {
    // console.log (namasiswa);
    // console.log (namakelas);
    // console.log (jenjang);
    loadingAPI.style.display = "block";
    infoloadingAPI.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`



    let a = new Date();
    let b = a.getDate();
    let c = a.getMonth() + 1;
    let d = a.getFullYear()
    let idokmateri = addZero(b) + "" + addZero(c) + "" + d;
    let parameterlain = "&crtToken=" + idokmateri + "&idtoken=" + jenjang;
    //console.log(idokmateri)


    //let idss = "1f4Rg_uax5Tk6X9Xawo972uDYnll0aHoYGM3NVLrW0rU" + parameterlain;
    await fetch(linkmateri + "&action=materihariini" + parameterlain)
        .then(m => m.json())
        .then(f => {
            loadingAPI.style.display = "none"
            //console.log(f)
            localStorage.setItem("materi", JSON.stringify(f.result));
            let html = `
            <h4 class="w3-card-4 w3-padding w3-margin">
                <button class="w3-button w3-pink w3-round w3-right w3-tiny" onclick="panggilmateri()">
                    <i class="fa fa-refresh"></i> Refresh Materi
                </button>Materi Ananda Hari Ini:<h3>`;

            document.querySelector(".klikmateri").innerHTML = `<h4 class="w3-card-4 w3-padding w3-margin"><button class="w3-button w3-pink w3-round w3-right w3-tiny" onclick="panggilmateri()"><i class="fa fa-refresh"></i> Materi</button>Materi Ananda Hari Ini:<h3> `;
            // f.result.forEach(element => {
            let tabel = document.createElement("table")
            tabel.setAttribute("class", "versi-table w3-card-4 w3-margin-bottom tabelmaterihariini")
            let row = tabel.insertRow(0);
            let th = row.insertCell(-1);
            th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:-16px;box-shadow: inset 0 0 1px #000000");
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





            let element = f.result;
            for (i = 0; i < element.length; i++) {
                let row = tabel.insertRow(-1);
                sel = row.insertCell(-1);
                sel.setAttribute("style", "position:sticky;position:-webkit-sticky;left:-16px;box-shadow: inset 0 0 1px #000000");
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
                sel.innerHTML = `tekan tombol cek`; //<button class="w3-button w3-green" onclick="previewriwayat(${i})">Materi</button>`;
            }
            //}

            document.querySelector(".klikmateri").appendChild(tabel)
            document.querySelector(".sudahabsen").style.display = "none";
            setCookie("lamankode", 3)

        }).catch(er => {
            //alert("Ups, maaf terjadi kesalahan ... 2 detik lagi akan kembali ("+er+")");
            //console.log(er)
            infoloadingAPI.innerHTML = "Maaf, terjadi kegagalan koneksi. <hr>Pesan error :" + er
            document.querySelector(".klikmateri").innerHTML = "Mohon Maaf, terjadi kesalahan. Ulangi beberapa saat lagi. <br>Kode" + er
        });;

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
    let namabulan = y[x].text.replace(" 2021", "").replace(/\s+/g, "");
    modalnamabulan.innerHTML = '<img src="/img/barloading.gif"/>'; //y[x].text.toUpperCase();

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
        td.innerHTML += `<div id="td_${encodeURIComponent(tokensiswa)}_${idok}"></div>`

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
            let x = document.getElementById("siswapilihbulan").selectedIndex;
            let y = document.getElementById("siswapilihbulan").options;
            //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);
            let namabulan = y[x].text.replace(" 2021", "").replace(/\s+/g, "");
            modalnamabulan.innerHTML = y[x].text.toUpperCase();
            //console.log(k)
            //jsonabsenkelasperbulan = k[bulanapi];
            rekapabsensiswabulanan = k[namabulan].filter(s => s.tokensiswa == tokensiswa);
            // console.log(namabulan)
            // rekapabsensiswabulanan = k[namabulan].filter(s => s.name == namasiswa);
            //console.log(rekapabsensiswabulanan)
            //---------------------------------------------------

            for (var i = 0; i < rekapabsensiswabulanan.length; i++) {
                //mengecek element kodeid
                //kodeid = jsonabsenkelasperbulan[i].id + "_" + kelas + "_" + encodeURIComponent(jsonabsenkelasperbulan[i].name);
                let kodetd = "td_" + encodeURIComponent(rekapabsensiswabulanan[i].tokensiswa) + "_" + rekapabsensiswabulanan[i].id;
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



//////////////////////////////////////////////////////////

let jsonmenudatapembelajaran;
const menudatapembelajaran = () => {
    modalmateri.style.display = "block";
    fetch(linkmateri + "&action=kronolog&idtoken=" + jenjang)
        .then(m => m.json())
        .then(j => {

            spanlabelmateri.innerHTML = "Jumlah Materi ada " + j.result.length + " Silakan pilih : <br><sub class='w3-text-blue'>Materi terbaru ada di urutan terakhir</sub>";

            jsonmenudatapembelajaran = j.result;
            siswapilihmateri.innerHTML = "<option value=''>Silakan Pilih Materinya</option>"
            for (let i = 0; i < j.result.length; i++) {
                let op = document.createElement("option");
                op.setAttribute("value", i)
                op.setAttribute("id", "materike" + i)
                let teks = document.createTextNode(j.result[i].idmapel)
                op.appendChild(teks)
                siswapilihmateri.appendChild(op)

            }


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

const modalfnmateri = () => {
    let x = document.getElementById("siswapilihmateri").selectedIndex;
    let y = document.getElementById("siswapilihmateri").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);
    //let namabulan = y[x].text;
    //modalnamabulan.innerHTML = namabulan.toUpperCase() + " 2021";
    let indek = parseInt(y[x].value);

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
    <table class="w3-card-4 w3-table-all garis w3-centered">
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
                } else if (integerWaktusekarang > awalwaktu && integerWaktusekarang > bataswaktu) {

                    ddtabelhasilbelajar.innerHTML = "Ananda melewatkan KBM Ini";
                    tdtombolsoaloffline.innerHTML = `<button class='w3-button w3-blue' onclick='soaloffline("${idmateri}");modalmateri.style.display = "none"'>Latihan lagi</button>`;
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

                tdtombolsoaloffline.innerHTML = `<button class='w3-button w3-blue' onclick='soaloffline("${idmateri}");modalmateri.style.display = "none"'>Latihan lagi</button>`


            }


        })


};

////////////////////////////////////////////////////

function uploadpotoessayt(id) {
    var item = document.getElementById("iduploadpotoessay" + id).files[0];
    var tempat = document.getElementById("filejawaban" + id);
    let total = (1048576 / item.size).toFixed(2);
    tampilan.innerHTML = `<i class="fa fa-spin fa-spinner w3-xxlarge"></i> Sedang proses, mohon tunggu ...`



    let ekstensi = item.name.substring(item.name.lastIndexOf('.') + 1);


    var filename;
    // format nama file = kodetokensiswa_kelas_nomateri_nosoal
    filename = namakelas + "_" + tokensiswa + "_idmateri_" + kodebarismateriyangdikerjakan + "_essayno_" + id;

    let dataaa = ""
    var ofReader = new FileReader();
    ofReader.readAsDataURL(item);
    ofReader.onload = async function (e) {

        let base64 = e.target.result.replace(/^.*,/, '');
        let mmtype = e.target.result.match(/^.*(?=;)/)[0];
        dataaa = e.target.result
        let datafom = new FormData()
        datafom.append("base64", base64);
        datafom.append("mmtype", mmtype);
        datafom.append("kelas", namakelas);
        datafom.append("filename", filename);
        datafom.append("ekstensi", ekstensi);
        await fetch(urlnilai + "?action=siswauploadmedia", {
                method: 'post',
                body: datafom
            }).then(m => m.json())
            .then(k => {
                tampilan.innerHTML = k.result

            })
            .catch(er => {
                tampilan.innerHTML = "<div class='w3-red w3-large'>Ups, Maaf. Media gagal diunggah ke server. Jaringan Ananda sedang terjadi trafick, silakan UNGGAH ULANG (klik UPLOAD JAWABAN lagi ...) </div><br><br>Kode Error: " + er;
                // // let divhapus = document.getElementById("tomboljawaban" + id);
                // // divhapus.innerHTML = ``;
                // tampilan.innerHTML = `media gagal diunggah silakan upload ulang kode ${er}`;//`<div id="tomboljawaban${id}"><hr>Maaf, jaringan skrip 1 Ananda terjadi trafik (kode error: ${er}). Media gagal diunggah. Silakan coba lagi ya ...<br><button onclick="tombolketikjawaban('${id}')">Ketik Jawaban No ${id}</button><br><sub>atau</sub><br> <button onclick="tomboluploadjawaban('${id}')">Upload Jawaban No ${id}</button><br><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub></div>`;

            })



    }



}
const siswauploadmediajawaban = () => {

    let dataform = new FormData();
    dataform.append("base64", mediabase64.value);
    dataform.append("mmtype", mediammtype.value);
    dataform.append("filename", mediafilename.value);
    dataform.append("kelas", mediakelas.value);

    fetch(urlnilai + "?siswauploadmedia", {
            method: 'post',
            body: dataform
        }).then(m => m.json())
        .then(k => {
            return k.result
        })
        .catch(er => {
            let teks = "Ups, maaf. Upload Gagal.<br>Kode error: " + er
            // let divhapus = document.getElementById("tomboljawaban" + id);
            // divhapus.innerHTML = "";
            // //tampilan.innerHTML = `<div id="tomboljawaban${id}"><hr>Maaf, jaringan skrip 1 Ananda terjadi trafik (kode error: ${er}). Media gagal diunggah. Silakan coba lagi ya ...<br><button onclick="tombolketikjawaban('${id}')">Ketik Jawaban No ${id}</button><br><sub>atau</sub><br> <button onclick="tomboluploadjawaban('${id}')">Upload Jawaban No ${id}</button><br><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub></div>`;
            // let teks = `<div id="tomboljawaban${id}"><hr>Maaf, jaringan Ananda skrip 2 terjadi trafik (kode error: ${er}). Media gagal diunggah. Silakan coba lagi ya ...<br><button onclick="tombolketikjawaban('${id}')">Ketik Jawaban No ${id}</button><br><sub>atau</sub><br> <button onclick="tomboluploadjawaban('${id}')">Upload Jawaban No ${id}</button><br><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub></div>`;
            return teks
        })
}


const modalrekamandulu = () => {
    document.getElementById("koleksivideo").style.display = "block";

}


let tmblkirim = document.getElementById("uploadvideodiljk");
let btnvideo = document.getElementById("tmblvid");
let btnpoto = document.getElementById("tmblpot");
let btngal = document.getElementById("tmblgal");

let inbtnpot = document.getElementById("inputtmblpoto");
let inbtngal = document.getElementById("inputtmblgaleri");
let resultpotogaleri = document.getElementById("elemintmblpotogaleri");
let tampilan = document.getElementById("resultuploadvideomateri");

let localStream = ""; // vidvid2.style.display = "none";
let spanstatus = document.querySelector("#spanstatusrekaman");
let spanstatus2 = document.querySelector("#spanstatusrekaman2");
let videostatus = document.querySelector("#statusrekaman");
let elvid1 = document.querySelector("#divvideokamera");
let elvid2 = document.querySelector("#divvideorekam");
let starter = document.getElementById('btnStart');
let stopB = document.getElementById('btnStop');
let btnBack = document.getElementById('btnBack');
let vidSave = document.getElementById('vid2');
let vidlayar = document.getElementById('vid1');
let eltombolwebcam = document.getElementById("tomboltombolwebcam");

const mulaivideo = (depblak, id) => {
    tmblkirim.innerHTML = "Unggah Jawaban No. " + id;
    tmblkirim.setAttribute("onclick", "alert('Belum ada media yang dapat diunggah')");
    // let divV = document.getElementById('vid2');
    // divV.style.display = "none";
    // divP.style.display = "block";
    // let divP = document.getElementById('vid1');
    // let vidvid2 = document.getElementById('divvid2');
    let acuankamera = "";
    let indikatorkamer;;
    if (depblak == "belakang") {
        // facingMode: {exact: "user"}
        // facingMode: "environment"     
        indikatorkamer = "environment";
        btnBack.innerHTML = " Depan";
        acuankamera = "depan";
    } else {
        indikatorkamer = {
            exact: "user"
        };
        btnBack.innerHTML = " Belakang";
        acuankamera = "belakang";
    }
    //resultuploadvideomateri.innerHTML = "";
    let constraintObj = {
        audio: true,
        video: {
            facingMode: indikatorkamer,
            width: 320,
            height: 240
            // , //"user",
            // width: { min: 640, ideal: 1280, max: 1920 },
            // height: { min: 480, ideal: 720, max: 1080 }
            // class: 'responsive-iframebaru',
            // poster: '/img/192.png'
        }
    };
    // width: 1280, height: 720  -- preference only
    // facingMode: {exact: "user"}
    // facingMode: "environment"

    //handle older browsers that might implement getUserMedia in some way
    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
        navigator.mediaDevices.getUserMedia = function (constraintObj) {
            let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
            return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraintObj, resolve, reject);
            });
        }

    } else {
        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                devices.forEach(device => {
                    // console.log(device.kind.toUpperCase(), device.label);
                    // console.log(device.getTracks());
                    //alert(device.deviceId)
                })
            })
            .catch(err => {
                // console.log(err.name, err.message);
                alert(err.name + "\n" + err.message);
            })

    }


    navigator.mediaDevices.getUserMedia(constraintObj)
        .then(function (mediaStreamObj) {
            //connect the media stream to the first video element
            let video = document.querySelector('video');
            if ("srcObject" in video) {
                video.srcObject = mediaStreamObj;
            } else {
                //old version
                video.src = window.URL.createObjectURL(mediaStreamObj);
            }

            video.onloadedmetadata = function (ev) {
                //show in the video element what is being captured by the webcam
                video.play();
            };

            localStream = mediaStreamObj;
            //add listeners for saving video/audio

            let mediaRecorder = new MediaRecorder(mediaStreamObj);
            let chunks = [];

            starter.addEventListener('click', (ev) => {
                // divP.style.display = "block";
                // divV.style.display = "none";
                spanstatus.innerHTML = "Sedang merekam <i class='fa fa-spin fa-refresh'></i>";
                videostatus.removeAttribute("class"); //.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");
                videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-middle w3-show"); //.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");
                elvid1.removeAttribute("class");
                elvid1.setAttribute("class", "w3-center w3-show");
                elvid2.removeAttribute("class");
                elvid2.setAttribute("class", "w3-center w3-hide");

                //video.play();
                // console.log(mediaRecorder.state);
                if (mediaRecorder.state == "recording") {
                    alert("Anda sedang proses merekam.");
                    return
                }
                video.play();
                mediaRecorder.start();
                //localStream.getTracks().forEach(k => k = mediaStreamObj);
                //elvid2.getAttribute("class").replace("containerbaru w3-center w3-show", "containerbaru w3-center w3-hide")
            })
            stopB.addEventListener('click', (ev) => {
                if (mediaRecorder.state === "inactive") {
                    alert("Maaf, Tombol berfungsi ketika sedang proses rekaman");
                    return
                }
                videostatus.removeAttribute("class");
                videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-topmiddle w3-show"); //.replace("w3-blue w3-opacity w3-display-topmiddle w3-show", "w3-blue w3-opacity w3-display-topmiddle w3-hide");
                elvid1.removeAttribute("class");
                elvid1.setAttribute("class", "containerbaru w3-center w3-hide");
                elvid2.removeAttribute("class");
                elvid2.setAttribute("class", "containerbaru w3-center w3-show");


                video.pause();
                mediaRecorder.stop();
                //localStream.getTracks().forEach(k => k.stop());
                // console.log(mediaRecorder.state);
                //console.log(mediaRecorder);
            });
            mediaRecorder.ondataavailable = function (ev) {

                chunks.push(ev.data);
            }
            mediaRecorder.onstop = (ev) => {
                // divP.style.display = "none";
                // divV.style.display = "block";
                let blob = new Blob(chunks, {
                    'type': 'video/mp4;'
                });
                let videoURL = window.URL.createObjectURL(blob);
                vidSave.src = videoURL;
                //console.log(formatBytes(blob.size, 2));
                spanstatus.innerHTML = "Ukuran Video " + formatBytes(blob.size, 2) + " (Batas Maksimal unggah harus kurang dari 50 MB)";
                //---------------------------------------------------
                var reader = new FileReader();
                reader.readAsDataURL(blob);

                reader.onload = function (e) {
                    let urlbs64 = e.target.result;
                    //console.log(urlbs64);
                    var inputbase64 = document.createElement("input");
                    inputbase64.setAttribute("name", "videodata");
                    inputbase64.setAttribute("id", "videodata");
                    inputbase64.value = urlbs64.replace(/^.*,/, '');

                    inputbase64.setAttribute("style", "display:none");

                    var inputfilename = document.createElement("input");
                    inputfilename.setAttribute("name", "videofilename");
                    inputfilename.setAttribute("id", "videofilename");
                    inputfilename.setAttribute("style", "display:none");
                    inputfilename.value = "Kelas_" + jenjang + "_" + StringTanggal(new Date()) + "_id_" + new Date().getTime();; // + namebantukirim.value.toUpperCase().replace(/\s+/, "_");

                    var inputmimetype = document.createElement("input");
                    inputmimetype.setAttribute("name", "videomimeType")
                    inputmimetype.setAttribute("id", "videomimeType")
                    inputmimetype.setAttribute("style", "display:none")

                    inputmimetype.value = "video/mp4"; //srcEncoded.match(/^.*(?=;)/)[0];;//"data:image/jpeg";;// 


                    resultuploadvideomateri.innerHTML = "";
                    resultuploadvideomateri.appendChild(inputbase64);
                    resultuploadvideomateri.appendChild(inputfilename);
                    resultuploadvideomateri.appendChild(inputmimetype);
                    tmblkirim.innerHTML = "Video siap diunggah untuk jawaban Nomor " + id + " KLik tombol ini.";
                    tmblkirim.setAttribute("onclick", `uploadvideorekaman(${id})`);
                }
                //---------------------------------------------------
                chunks = [];

            }
            btnBack.addEventListener('click', (ev) => {
                if (mediaRecorder.state == "recording") {
                    alert("Anda sedang merekam. Silakan berhenti dulu dari perekaman");
                    return
                }
                //video.play();
                mulaivideo(acuankamera, id);
                vidSave.src = "";
                videostatus.removeAttribute("class");
                videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-middle w3-hide"); //.replace("w3-blue w3-opacity w3-display-topmiddle w3-show", "w3-blue w3-opacity w3-display-topmiddle w3-hide");
                elvid1.removeAttribute("class");
                elvid1.setAttribute("class", "w3-center w3-show");
                elvid2.removeAttribute("class");
                elvid2.setAttribute("class", "w3-center w3-hide");
                spanstatus.innerHTML = "Kamera sudah siap, silakan rekam.";
                resultuploadvideomateri.innerHTML = "";



            })


        })
        .catch(function (err) {
            //console.log(err.name, err.message);
            alert(err.name + "\n" + err.message);
        });

    // let el = document.getElementById("tomboltombolwebcam");
    // let el2 = document.getElementById("tomboltombolscreenrecorder");
    // el.style.display = "block";
    // el2.style.display = "none";
    // // vidlayar.setAttribute("poster", "/img/192.png");
    // // vidlayar.play();
    // // vidSave.stop();
    elvid1.removeAttribute("class");
    elvid1.setAttribute("class", "w3-center w3-show");
    elvid2.removeAttribute("class");
    elvid2.setAttribute("class", "w3-center w3-hide");
    spanstatus.innerHTML = "Kamera siap untuk merekam."; // <i class='fa fa-spin fa-refresh'></i>";
    videostatus.removeAttribute("class"); //.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");
    videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-middle w3-hide"); //.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");


}

const tutupkamera = () => {

    if (localStream == "") {
        //alert("Mohon tunggu, proses loading sedang berlangsung....");
        return
    }
    localStream.getTracks().forEach(k => k.stop());

    resultuploadvideomateri.innerHTML = "";
    resultpotogaleri.innerHTML = "";
    inbtnpot.value = "";
    inbtngal.value = "";
}

function formatBytes(a, b = 2) {
    if (0 === a)
        return "0 Bytes";
    const c = 0 > b ? 0 : b,
        d = Math.floor(Math.log(a) / Math.log(1024));
    return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
}

const uploadpotoessay = (id) => {
    //alert(id);
    document.getElementById("koleksivideo").style.display = "block";
    // mulaivideo();
    btnvideo.setAttribute("onclick", `recordvideo(${id})`);
    btnpoto.setAttribute("onclick", `shootpoto(${id})`);
    btngal.setAttribute("onclick", `galerihp(${id})`);
    elvid1.removeAttribute("class");
    elvid1.setAttribute("class", "w3-center w3-hide");
    elvid2.removeAttribute("class");
    elvid2.setAttribute("class", "w3-center w3-hide");
    eltombolwebcam.removeAttribute("class");
    eltombolwebcam.setAttribute("class", "w3-center w3-hide");
    resultpotogaleri.innerHTML = "";
    tampilan.innerHTML = "";
    inbtnpot.value = "";
    inbtngal.value = "";
    tmblkirim.setAttribute("onclick", "alert('Belum ada media yang dapat diunggah')");
    tmblkirim.innerHTML = "Unggah Jawaban No. " + id;

    tutupkamera();

}

const recordvideo = (id) => {
    //alert("video jawaban no " + id);
    resultpotogaleri.innerHTML = "";
    tampilan.innerHTML = "";
    inbtnpot.value = "";
    inbtngal.value = "";
    eltombolwebcam.removeAttribute("class");
    eltombolwebcam.setAttribute("class", "w3-center w3-show");
    mulaivideo("depan", id);



}
const shootpoto = (id) => {
    inbtnpot.value = "";
    inbtngal.value = "";
    resultpotogaleri.innerHTML = "";
    tampilan.innerHTML = "";
    tutupkamera();
    elvid1.removeAttribute("class");
    elvid1.setAttribute("class", "w3-center w3-hide");
    elvid2.removeAttribute("class");
    elvid2.setAttribute("class", "w3-center w3-hide");

    eltombolwebcam.removeAttribute("class");
    eltombolwebcam.setAttribute("class", "w3-center w3-hide");
    inbtnpot.setAttribute("onchange", `ambilpotodarikamera(${id})`);
    inbtnpot.click();
    // alert("Poto jawaban no " + id);
}
const galerihp = (id) => {
    inbtnpot.value = "";
    inbtngal.value = "";
    resultpotogaleri.innerHTML = "";
    tampilan.innerHTML = "";
    tutupkamera();
    elvid1.removeAttribute("class");
    elvid1.setAttribute("class", "w3-center w3-hide");
    elvid2.removeAttribute("class");
    elvid2.setAttribute("class", "w3-center w3-hide");

    eltombolwebcam.removeAttribute("class");
    eltombolwebcam.setAttribute("class", "w3-center w3-hide");

    inbtngal.setAttribute("onchange", `ambilfiledarigaleri(${id})`);
    inbtngal.click();
    // alert("galeri jawaban no " + id);

}

const ambilpotodarikamera = (id) => {

    let item = inbtnpot.files[0];
    let read = new FileReader();
    let sz = 900;
    read.readAsDataURL(item);
    read.onload = function (e) {
        let src = e.target.result;
        let tipe = src.match(/^.*(?=;)/)[0];
        if (tipe.indexOf("video") > -1) {
            alert("Mohon maaf, video tidak bisa diunggah melalui fitur POTO, silakan klik VIDEO");
            return
        }
        let img = new Image();
        img.src = e.target.result; //result is base64-encoded Data URI
        //img.name = event.target.name;//set name (optional)
        img.size = e.target.size; //set size (optional)
        img.onload = function (el) {
            var elem = document.createElement('canvas'); //create a canvas

            //scale the image to 600 (width) and keep aspect ratio
            var scaleFactor = sz / el.target.width;
            elem.width = sz;
            elem.height = el.target.height * scaleFactor;

            //draw in canvas
            var ctx = elem.getContext('2d');
            ctx.drawImage(el.target, 0, 0, elem.width, elem.height);

            //get the base64-encoded Data URI from the resize image
            // var srcEncoded = ctx.canvas.toDataURL(el.target, 'image/jpeg', 0);
            var srcEncoded = ctx.canvas.toDataURL(el.target, 'image/jpeg', 0);
            // var srcEncoded = ctx.canvas.toDataURL(el.target);
            tampilan.innerHTML = "<img src='" + srcEncoded + "' class='w3-image'/>";


            let base64e = srcEncoded.replace(/^.*,/, '');
            let mtipe = srcEncoded.match(/^.*(?=;)/)[0];
            let elbase64 = document.createElement("div");
            elbase64.setAttribute("id", "jwbase64");
            // elbase64.setAttribute("value", base64e);
            elbase64.textContent = base64e;

            let namafile = namakelas + "_" + tokensiswa + "_idmateri_" + kodebarismateriyangdikerjakan + "_essayno_" + id;
            let innamafile = document.createElement("input");
            innamafile.setAttribute("id", "namafilejawaban");
            innamafile.setAttribute("value", namafile);

            let intipe = document.createElement("input");
            intipe.setAttribute("id", "mtipe");
            intipe.setAttribute("value", mtipe);


            resultpotogaleri.innerHTML = "";
            resultpotogaleri.appendChild(elbase64);
            resultpotogaleri.appendChild(innamafile);
            resultpotogaleri.appendChild(intipe);

            tmblkirim.innerHTML = "Poto siap diunggah untuk jawaban Nomor " + id;
            tmblkirim.setAttribute("onclick", `uploadpotokamera(${id})`);

        }


    }
}
const ambilfiledarigaleri = (id) => {

    let item = inbtngal.files[0];
    let ukuran = item.size;
    let read = new FileReader();
    read.readAsDataURL(item);
    read.onload = function (e) {
        let src = e.target.result;
        let tipe = src.match(/^.*(?=;)/)[0];
        // if (tipe.indexOf("video") > -1) {
        //     alert("Mohon maaf, video tidak bisa diunggah melalui fitur POTO, silakan klik VIDEO");
        //     return
        // }

        var srcEncoded = src;
        let base64 = srcEncoded.replace(/^.*,/, '');
        let mtipe = srcEncoded.match(/^.*(?=;)/)[0];
        /////////////////////////////////////////////////////////
        if (mtipe.indexOf("image") > -1) {
            tampilan.innerHTML = "<img id='image" + id + "' src='" + src + "' class='w3-image'/><br/>tipe gambar: " + mtipe.split("/")[1];
        } else if (mtipe.indexOf("video") > -1) {
            tampilan.innerHTML = "<video id='myvideo" + id + "' width='280' height='200'  poster='/img/lamaso.webp' controls><source src='" + src + "' type='" + mtipe + "' />Browser Anda tidak mendukung/format video tidak mendukung</video>";
        } else if (mtipe.indexOf("audio") > -1) {
            tampilan.innerHTML = "<video id='myaudio" + id + "' width='280' height='200'  poster='/img/lamaso.webp' controls><source src='" + src + "' type='" + mtipe + "' />Browser Anda tidak mendukung/format video/audio tidak mendukung</video>";
        } else if (mtipe.indexOf("wordprocessingml") > -1) {
            tampilan.innerHTML = "<i id='taktersedia_" + id + "' class='fa fa-file-word-o w3-xxxlarge' style='font-size:72px'></i><br/> Pratinjau tidak terrsedia ";
            //var idac = id +" "+ src;
            //panci(idac);

        } else if (mtipe.indexOf("text") > -1) {
            tampilan.innerHTML = "<iframe id='myiframe" + id + "' src='" + src + "' type='" + tipe + "' width='98%' height='400'></iframe><br/>tipe file: " + mtipe.split("/")[1];
        } else if (mtipe.indexOf("pdf") > -1) {
            tampilan.innerHTML = "<iframe id='pdfke" + id + "' src='" + src + "' type='" + tipe + "' width='98%' height='400'></iframe><br/>tipe file: " + mtipe.split("/")[1];
        } else {
            tampilan.innerHTML = "<i id='takdikenal_" + id + "'  class='fa fa-file-o w3-xxxlarge' style='font-size:72px'></i><br/> File Tidak dikenal <br/>tipe file: " + mtipe.split("/")[1];;
        }
        tampilan.innerHTML += "<hr/><div class='w3=center'>Ukuran FIle " + formatBytes(ukuran, 2) + " (Batas maksimal unggah adalah kurang dari 50 MB)</div>";

        /////////////////////////////////////////////////////////


        let elbase64 = document.createElement("div");

        elbase64.setAttribute("id", "jwbase64");
        // elbase64.setAttribute("value", base64e);
        elbase64.textContent = base64;

        let namafile = namakelas + "_" + tokensiswa + "_idmateri_" + kodebarismateriyangdikerjakan + "_essayno_" + id;
        let innamafile = document.createElement("input");
        innamafile.setAttribute("id", "namafilejawaban");
        innamafile.setAttribute("value", namafile);

        let intipe = document.createElement("input");
        intipe.setAttribute("id", "mtipe");
        intipe.setAttribute("value", mtipe);


        resultpotogaleri.appendChild(elbase64);
        resultpotogaleri.appendChild(innamafile);
        resultpotogaleri.appendChild(intipe);
        tmblkirim.innerHTML = "Media siap diunggah untuk jawaban Nomor " + id;
        tmblkirim.setAttribute("onclick", `uploadmediagaleri(${id})`);


    }
}


const uploadvideorekaman = async (id) => {
    tmblkirim.innerHTML = `<i class="fa fa-refresh fa-spin"></i> Sedang proses ....`;

    let videodata = document.getElementById("videodata").value;
    let videomimeType = document.getElementById("videomimeType").value;
    let videofilename = document.getElementById("videofilename").value;
    var tempat = document.getElementById("filejawaban" + id);
    let datafom = new FormData()
    datafom.append("base64", videodata);
    datafom.append("mmtype", videomimeType);
    datafom.append("kelas", namakelas);
    datafom.append("filename", videofilename);
    datafom.append("ekstensi", "mp4");
    resultpotogaleri.innerHTML = "";
    await fetch(urlnilai + "?action=siswauploadmedia", {
            method: 'post',
            body: datafom
        }).then(m => m.json())
        .then(k => {
            tmblkirim.innerHTML = `Berhasil diunggah`;


            document.getElementById("silangmodal").click();
            tempat.innerHTML = k.result;
            //resultpotogaleri.innerHTML = "";

        })
        .catch(er => {
            document.getElementById("silangmodal").click();
            tempat.innerHTML = "<div class='w3-red w3-large'>Ups, Maaf. Media gagal diunggah ke server. Jaringan Ananda sedang terjadi trafick, silakan UNGGAH ULANG (klik UPLOAD JAWABAN lagi ...) </div><br><br>Kode Error: " + er;
            // // let divhapus = document.getElementById("tomboljawaban" + id);
            // // divhapus.innerHTML = ``;
            // tampilan.innerHTML = `media gagal diunggah silakan upload ulang kode ${er}`;//`<div id="tomboljawaban${id}"><hr>Maaf, jaringan skrip 1 Ananda terjadi trafik (kode error: ${er}). Media gagal diunggah. Silakan coba lagi ya ...<br><button onclick="tombolketikjawaban('${id}')">Ketik Jawaban No ${id}</button><br><sub>atau</sub><br> <button onclick="tomboluploadjawaban('${id}')">Upload Jawaban No ${id}</button><br><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub></div>`;

        })




}
const uploadpotokamera = async (id) => {
    tmblkirim.innerHTML = `<i class="fa fa-refresh fa-spin"></i> Sedang proses ....`;
    let jwbase64 = document.getElementById("jwbase64").textContent
    var tempat = document.getElementById("filejawaban" + id);

    let namafilejawaban = document.getElementById("namafilejawaban").value;
    let mtipe = document.getElementById("mtipe").value;
    let ekstensi = mtipe.substring(mtipe.lastIndexOf('.') + 1);


    let datafom = new FormData()
    datafom.append("base64", jwbase64);
    datafom.append("mmtype", mtipe);
    datafom.append("kelas", namakelas);
    datafom.append("filename", namafilejawaban);
    datafom.append("ekstensi", ekstensi);
    resultpotogaleri.innerHTML = "";
    await fetch(urlnilai + "?action=siswauploadmedia", {
            method: 'post',
            body: datafom
        }).then(m => m.json())
        .then(k => {
            tmblkirim.innerHTML = `Poto berhasil diunggah`;
            document.getElementById("silangmodal").click();
            tempat.innerHTML = k.result;

        })
        .catch(er => {
            document.getElementById("silangmodal").click();
            tempat.innerHTML = "<div class='w3-red w3-large'>Ups, Maaf. Media gagal diunggah ke server. Jaringan Ananda sedang terjadi trafick, silakan UNGGAH ULANG (klik UPLOAD JAWABAN lagi ...) </div><br><br>Kode Error: " + er;
            // // let divhapus = document.getElementById("tomboljawaban" + id);
            // // divhapus.innerHTML = ``;
            // tampilan.innerHTML = `media gagal diunggah silakan upload ulang kode ${er}`;//`<div id="tomboljawaban${id}"><hr>Maaf, jaringan skrip 1 Ananda terjadi trafik (kode error: ${er}). Media gagal diunggah. Silakan coba lagi ya ...<br><button onclick="tombolketikjawaban('${id}')">Ketik Jawaban No ${id}</button><br><sub>atau</sub><br> <button onclick="tomboluploadjawaban('${id}')">Upload Jawaban No ${id}</button><br><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub></div>`;

        })

}
const uploadmediagaleri = async (id) => {
    tmblkirim.innerHTML = `<i class="fa fa-refresh fa-spin"></i> Sedang proses ....`;
    let jwbase64 = document.getElementById("jwbase64").textContent
    var tempat = document.getElementById("filejawaban" + id);

    let namafilejawaban = document.getElementById("namafilejawaban").value;
    let mtipe = document.getElementById("mtipe").value;
    let ekstensi = mtipe.substring(mtipe.lastIndexOf('.') + 1);


    let datafom = new FormData()
    datafom.append("base64", jwbase64);
    datafom.append("mmtype", mtipe);
    datafom.append("kelas", namakelas);
    datafom.append("filename", namafilejawaban);
    datafom.append("ekstensi", ekstensi);
    resultpotogaleri.innerHTML = "";
    await fetch(urlnilai + "?action=siswauploadmedia", {
            method: 'post',
            body: datafom
        }).then(m => m.json())
        .then(k => {
            tmblkirim.innerHTML = `Media berhasil diunggah`;
            document.getElementById("silangmodal").click();
            tempat.innerHTML = k.result;

        })
        .catch(er => {
            document.getElementById("silangmodal").click();
            tempat.innerHTML = "<div class='w3-red w3-large'>Ups, Maaf. Media gagal diunggah ke server. Jaringan Ananda sedang terjadi trafick, silakan UNGGAH ULANG (klik UPLOAD JAWABAN lagi ...) </div><br><br>Kode Error: " + er;
            // // let divhapus = document.getElementById("tomboljawaban" + id);
            // // divhapus.innerHTML = ``;
            // tampilan.innerHTML = `media gagal diunggah silakan upload ulang kode ${er}`;//`<div id="tomboljawaban${id}"><hr>Maaf, jaringan skrip 1 Ananda terjadi trafik (kode error: ${er}). Media gagal diunggah. Silakan coba lagi ya ...<br><button onclick="tombolketikjawaban('${id}')">Ketik Jawaban No ${id}</button><br><sub>atau</sub><br> <button onclick="tomboluploadjawaban('${id}')">Upload Jawaban No ${id}</button><br><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub></div>`;

        })
}