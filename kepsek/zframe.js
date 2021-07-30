const framekreatifitas = () => {
    let div1 = document.getElementById("kesiapanmeme");
    let div2 = document.getElementById("pilihframe");
    div1.innerHTML = "<i class='fa fa-refresh fa-spin'></i> Mohon tunggu sebentar. Sedang ngopi Liong dulu servernya ..."
    tampilinsublamangurukelas("meme");
    document.getElementById("potomeme").src = "https://drive.google.com/uc?export=view&id=" + idlogo;
    document.getElementById("downloadmeme").className = document.getElementById("downloadmeme").className.replace("w3-show", "w3-hide");
    document.getElementById("downloadmeme").removeAttribute("onclick");

    // let tekshtml = `<option value="0" selected="">Silakan Pilih Frame</option>
    //         <option value="/memetemplate/23rt.png" >Tema 1</option>
    //         <option value="/memetemplate/sukseskanlombafls2nkotadepok.png" >Tema 2 New</option>
    //         `;

    // div2.innerHTML = tekshtml;
    // div1.innerHTML = " Kreasikan Poto Anda di sini:";

    fetch(linkmateri + "&action=datatemplate&jenisuser=Guru")
        .then(m => m.json())
        .then(k => {
            // console.log(k);
            let datafilter = k.records.filter(k => k.status == "aktif");
            let tekshtml = `<option value="0" selected="">Silakan Pilih Frame</option>`;
            // for (i = 0; i < datafilter.length; i++) {
            for (let i = datafilter.length - 1; i >= 0; i--) {
                if (i == datafilter.length - 1) {

                    tekshtml += `<option value="/memetemplate/${datafilter[i].htmlgambar}">${datafilter[i].keterangan} <b class="w3-text-red">[Baru]</b></option>`;
                } else {

                    tekshtml += `<option value="/memetemplate/${datafilter[i].htmlgambar}">${datafilter[i].keterangan}</option>`
                }
            }
            div2.innerHTML = tekshtml;
            div1.innerHTML = " Kreasikan Poto Anda di sini:";

        })
        .catch(er => console.log(er))

}

const selectframekreatif = () => {



    var d = document.getElementById("pilihframe").selectedIndex;
    var e = document.getElementById("pilihframe").options;
    if (e[d].value == 0) {
        alert("Pilih Background Tema")
        return
    }
    var bg = document.getElementById("scream");
    bg.setAttribute("src", e[d].value);

    bg.onload = function () {
        var myCanvas = document.getElementById("myCanvas");
        var myContext = myCanvas.getContext("2d");
        var img = document.getElementById("scream");
        //img.Origin = "use-credential";
        // img.cros

        //  ctx.drawImage(img, 0, 0, myCanvas.width, myCanvas.height);
        //bg.crossOrigin = "anonymous";
        // img.width = d.width;
        // img.height = d.height;
        // ctx.drawImage(img, 0, 0);
        //var img2 = document.getElementById("scream2");

        //ctx.drawImage(img2, 20, 30);

        let imgInput = document.getElementById('imageInput');
        imgInput.addEventListener('change', function (e) {
            if (e.target.files) {
                let imageFile = e.target.files[0]; //here we get the image file
                var reader = new FileReader();
                reader.readAsDataURL(imageFile);
                reader.onloadend = function (e) {
                    var myImage = new Image(); // Creates image object
                    myImage.src = e.target.result; // Assigns converted image to image object
                    // myImage.setAttribute('crossOrigin', 'anonymous');
                    document.getElementById("potomeme").src = e.target.result

                    // myImage.src = document.getElementById("scream")
                    myImage.onload = function (ev) {
                        //myImage.crossOrigin = "anonymous";
                        //var myCanvas = document.getElementById("myCanvas"); // Creates a canvas object

                        //var myContext = myCanvas.getContext("2d"); // Creates a contect object
                        myCanvas.width = 1575;//img.width;//d.width;//myImage.width; // Assigns image's width to canvas
                        myCanvas.height = 1581;//img.height;//.height;// myImage.height; // Assigns image's height to canvas
                        // myImage.width = document.getElementById("potomeme").width;
                        // myImage.height = document.getElementById("potomeme").height;
                        //myImage.width = myCanvas.width * 0.6;
                        // let w = document.getElementById("potomeme").width;
                        // let h = document.getElementById("potomeme").height;
                        // console.log(w);
                        let w = myCanvas.width * 0.6;
                        let h = myCanvas.height * 0.71;
                        //let h = document.getElementById("potomeme").height;
                        // console.log(w);
                        // console.log(h);
                        let x = myCanvas.width * 0.4;
                        let y = myCanvas.height * 0.2;
                        myContext.drawImage(myImage, x, y, w, h); // Draws the image on canvas
                        myContext.save();
                        myContext.drawImage(img, 0, 0, myCanvas.width, myCanvas.height);
                        // ctx.drawImage(img, 0, 0, myCanvas.width, myCanvas.height);
                        //let img2 = loadImage(img)

                        //draw in canvas
                        // var ctx = elem.getContext('2d');
                        // ctx.drawImage(el.target, 0, 0, elem.width, elem.height);

                        // //get the base64-encoded Data URI from the resize image
                        // let loaddata = myCanvas.getContext("2d")
                        // var srcEncoded = myCanvas.toDataURL('image/jpeg', 0.75);
                        // console.log(srcEncoded)
                        let imgData = myCanvas.toDataURL(); // Assigns image base64 string in jpeg format to a variable
                        // console.log(imgData)
                        // // // // console.log(myCanvas.toDataURL())
                        // // let eldoc = document.getElementById("downloadmeme");
                        // // eldoc.setAttribute("onclick", `downloadCanvas('${imgData}')`);
                        // // eldoc.className = eldoc.className.replace("w3-hide", "w3-show")
                        // // var myCanvas2 = document.getElementById("myCanvas"); // Creates a canvas object

                        // // var myContext = myCanvas2.getContext("2d"); // Creates a contect object
                        // let data = myCanvas.toDataURL()
                        // console.log(data)
                        // //let imgData = myCanvas.toDataURL("image/png", 0.75); // Assigns image base64 string in jpeg format to a variable
                        // // // console.log(myCanvas.toDataURL())
                        // myCanvas.toBlob(function (blob) {

                        //     var read = new FileReader();
                        //     reader.readAsBinaryString(blob);
                        //     //read.readAsDataURL(blob);

                        //     read.onload = function () {
                        //         console.log(read.result);
                        //     }

                        // })
                        // var imgData = myCanvas.toBlob(img)
                        // console.log(imgData);
                        let eldoc = document.getElementById("downloadmeme");
                        eldoc.setAttribute("onclick", `downloadCanvas('${imgData}')`);
                        eldoc.className = eldoc.className.replace("w3-hide", "w3-show")
                    }

                }
            }
        });
    }
    // var myCanvas = document.getElementById("myCanvas"); // Creates a canvas object

    // var myContext = myCanvas.getContext("2d"); // Creates a contect object

    // let imgData = myCanvas.toDataURL("image/jpeg", 0.75); // Assigns image base64 string in jpeg format to a variable
    // // // // console.log(myCanvas.toDataURL())
    // console.log(imgData);
    // let eldoc = document.getElementById("downloadmeme");
    // eldoc.setAttribute("onclick", `downloadCanvas('${imgData}')`);
    // eldoc.className = eldoc.className.replace("w3-hide", "w3-show")

}



function downloadCanvas(canvas) {
    let namaku = (location.href.indexOf("siswa.html") > - 1) ? namasiswa : namauser;
    var tmpLink = document.createElement('a');
    // tmpLink.download = namauser.replace(/\./g, "_") + '_id_' + new Date().getTime(); // set the name of the download file 
    tmpLink.download = namaku.replace(/\./g, "_") + '_id_' + new Date().getTime(); // set the name of the download file 
    tmpLink.href = canvas

    // temporarily add link to body and initiate the download  
    document.body.appendChild(tmpLink);
    tmpLink.click();
    document.body.removeChild(tmpLink);



}

const imageReceived = () => {
}
// }
function loadImage(src, callback) {
    var img = new Image();

    img.onload = callback;
    img.setAttribute('crossorigin', 'anonymous'); // works for me

    img.src = src;

    return img;
}