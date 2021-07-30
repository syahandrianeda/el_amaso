var modal = document.getElementById('id01'); // Get the modal
var mySidebar = document.getElementById("mySidebar"); // Get the Sidebar
var overlayBg = document.getElementById("myOverlay"); // Get the DIV with overlay effect
//variabel link login database
let url_login_guru,
    url_login_siswa,
    url_absenkaldik;

(async function () {
    loadingmodal.style.display = "block";

    let id = pelanggan_id;
    await fetch("https://script.google.com/macros/s/AKfycbwL1kT_ga2_KMMV1mPdZg_lDfhmur3Q1j5I_ZK7fvNIV7BIhkWF_zL0/exec?id=" + id)
        .then(m => m.json())
        .then(k => {
            loadingmodal.style.display = "";
            window.localStorage.setItem("inst_id", JSON.stringify(k));
            url_login_guru = k.url_datauser + "?action=login&idss=" + k.ss_datauser; // pengganti script_url untuk memanggil data_user!
            url_login_siswa = k.url_datauser + "?action=loginsiswa&idss=" + k.ss_datauser; // pengganti script_url untuk memanggil data_user!
            url_absenkaldik = k.url_dataabsen + "?action=datakaldik&idss=" + k.ss_dataabsen; // pengganti script_url untuk memanggil data_user!

            namasekolah.innerHTML = k.namainstansi;
            namakota.innerHTML = k.idkota + " " + k.kota;

        }).catch(er => {
            console.log(er);
            location.reload()

        })
})();

const gurulogin = async () => {
    // kode untuk mengeksekusi login, abaikan dulu <--- harap dihapus jika tidak diabaikan

    // kode untuk mengeksekusi login, abaikan dulu <--- harap dihapus jika tidak diabaikan

    var inputusername = document.getElementById("namauser").value;
    var inputpassword = document.getElementById("passwordlogin").value;
    loaderform.innerHTML = "<i class='fa fa-spin fa-spinner' style='font-size:36px'></i> Prosess ..."

    await fetch(url_login_guru + "&username=" + inputusername + "&password=" + inputpassword)
        .then(m => m.json())
        .then(m => {
            //console.log(m);
            if (m.ijinkan == "ok") {
                window.localStorage.setItem("typeuser", JSON.stringify(m));
                if (m.akses == "Guru Kelas") {
                    //window.location.href="/user/guru.html";
                    window.location.replace("/user/guru.html");

                } else if (m.akses == "Guru Mapel") {
                    window.location.replace("/user/gmp.html");

                } else if (m.akses == "Kepala Sekolah") {

                    window.location.replace("/user/kepsek.html");
                } else if (m.akses == "Staff") {

                    window.location.replace("/user/staff.html");
                    location.reload()
                } else {

                }

            } else {
                loaderform.innerHTML = m.ijinkan;
                window.localStorage.removeItem("typeuser");

            }
            //tipeuser 


        }).catch(er => {
            //alert("Ups, maaf terjadi kesalahan ... 2 detik lagi akan kembali ("+er+")");
            console.log(er)
            // setTimeout(function(){
            //location.reload()

            fetch(url_login_guru + "&username=" + inputusername + "&password=" + inputpassword)
                .then(m => m.json())
                .then(m => {
                    //console.log(m);
                    if (m.ijinkan == "ok") {
                        window.localStorage.setItem("typeuser", JSON.stringify(m));
                        if (m.akses == "Guru Kelas") {
                            //window.location.href="/user/guru.html";
                            window.location.replace("/user/guru.html");

                        } else if (m.akses == "Guru Mapel") {
                            window.location.replace("/user/gmp.html");

                        } else if (m.akses == "Kepala Sekolah") {

                            window.location.replace("/user/kepsek.html");
                        } else if (m.akses == "Staff") {

                            window.location.replace("/user/staff.html");
                            location.reload()
                        } else {

                        }

                    } else {
                        loaderform.innerHTML = m.ijinkan;
                        window.localStorage.removeItem("typeuser");

                    }
                })
            // },2000)
        });




};


function w3_open() { // Toggle between showing and hiding the sidebar, and add overlay effect
    if (mySidebar.style.display === 'block') {
        mySidebar.style.display = 'none';
        overlayBg.style.display = "none";
    } else {
        mySidebar.style.display = 'block';
        overlayBg.style.display = "block";
    }
};

function w3_close() { // Close the sidebar with the close button
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
};

function loginelamaso() { //fungsi pada bar

    //buatsiswa.scrollIntoView();

    w3_close();
};

function fn2lihatpassword(id, labell) { // fungsi untuk melihat input password (dalam simbol atau teks biasa)
    var x = document.getElementById(id);
    var label = document.getElementById(labell);
    if (x.type === "password") {
        x.type = "text";
        label.innerHTML = "<i class='fa fa-eye-slash'></i> Sembunyikan Password"
    } else {
        x.type = "password";
        label.innerHTML = "<i class='fa fa-eye'></i> Lihat Password"
    }

};

const kliklamaso = async () => {
    ceksiswa.innerHTML = "<i class='fa fa-spin fa-spinner'></i>"
    let inputvalue = previewtoken.value;
    await fetch(url_login_siswa + "&id=" + inputvalue)
        .then(m => m.json())
        .then(k => {
            // console.log(k)
            if (k.ijinkan == "ok") {
                window.localStorage.setItem("typeuser", JSON.stringify(k));
                window.location.replace("/user/siswa.html");
                // ceksiswa.innerHTML = k.ijinkan;

            } else {
                ceksiswa.innerHTML = k.ijinkan;
                window.localStorage.removeItem("typeuser");
            }

        }).catch(err => {
            console.log("terjadi error, sedang meminta kembali: " + err);
            fetch(url_login_siswa + "&id=" + inputvalue).then(m => m.json())
                .then(k => {
                    // console.log(k)
                    if (k.ijinkan == "ok") {
                        window.localStorage.setItem("typeuser", JSON.stringify(k));
                        window.location.replace("/user/siswa.html");
                        // ceksiswa.innerHTML = k.ijinkan;

                    } else {
                        ceksiswa.innerHTML = k.ijinkan;
                        window.localStorage.removeItem("typeuser");
                    }
                })
        })
}
