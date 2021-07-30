
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
            method: 'post', body: datafom
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
        method: 'post', body: dataform
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

let localStream = "";// vidvid2.style.display = "none";
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
        indikatorkamer = { exact: "user" };
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
                videostatus.removeAttribute("class");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");
                videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-middle w3-show");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");
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
                videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-topmiddle w3-show");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-show", "w3-blue w3-opacity w3-display-topmiddle w3-hide");
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
                let blob = new Blob(chunks, { 'type': 'video/mp4;' });
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
                    inputfilename.value = "Kelas_" + jenjang + "_" + StringTanggal(new Date()) + "_id_" + new Date().getTime();;// + namebantukirim.value.toUpperCase().replace(/\s+/, "_");

                    var inputmimetype = document.createElement("input");
                    inputmimetype.setAttribute("name", "videomimeType")
                    inputmimetype.setAttribute("id", "videomimeType")
                    inputmimetype.setAttribute("style", "display:none")

                    inputmimetype.value = "video/mp4";//srcEncoded.match(/^.*(?=;)/)[0];;//"data:image/jpeg";;// 


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
                videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-middle w3-hide");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-show", "w3-blue w3-opacity w3-display-topmiddle w3-hide");
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
    spanstatus.innerHTML = "Kamera siap untuk merekam.";// <i class='fa fa-spin fa-refresh'></i>";
    videostatus.removeAttribute("class");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");
    videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-middle w3-hide");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");


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
        img.src = e.target.result;//result is base64-encoded Data URI
        //img.name = event.target.name;//set name (optional)
        img.size = e.target.size;//set size (optional)
        img.onload = function (el) {
            var elem = document.createElement('canvas');//create a canvas

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
        method: 'post', body: datafom
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
    tmblkirim.innerHTML = `<i class="fa fa-refresh fa-spinner"></i> Sedang proses ....`;
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
        method: 'post', body: datafom
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
    tmblkirim.innerHTML = `<i class="fa fa-refresh fa-spinner"></i> Sedang proses ....`;
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
        method: 'post', body: datafom
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
