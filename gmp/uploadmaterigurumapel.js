const kopipaste = (id) => {
  var copyText = document.getElementById(id);
  copyText.select();
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy");
  // alert("Copied the text: " + copyText.value);
  // alert("Berhasil Ngopi ... ^_^");
  resultuploadpotomateri.innerHTML = "";
}

const pratinjaubuatmateri = () => {
  prevhp.style.display = "block";
  let idtextarea = document.formuploadmateri.idmateri;

  var copyText = document.formuploadmateri.idmateri; //document.querySelector(id);//document.getElementById(id);
  // copyText.select();
  // copyText.setSelectionRange(0, 999999)
  // // document.execCommand("copy");
  // // alert("Copied the text: " + copyText.value);
  // alert("Berhasil Ngopi ... ^_^");
  // materiimport.innerHTML = brkline(unescape(decodeURIComponent(copyText.value))).teks
  let arrteks = copyText.value.split("\n");

  let tteks = "";
  let kuncipg = "Kunci PG: <br>";
  let kuncienk = "<br>Arti enksripsi: <br>"
  let kuncikd = "Data Sebaran KD :<br>";
  let oo;
  let countpg = 0;
  let countess = 0;
  for (let i = 0; i < arrteks.length; i++) {
    tteks += brkline(arrteks[i]).teks;
    // kuncipg += brkline(arrteks[i]).kunci; //window.atob(brkline(json).kunci).split(",").join("<br>");
    if (arrteks[i].indexOf("_KUNCI-PG_") > -1) {
      kuncipg += brkline(arrteks[i]).kunci; //+"<br>";//.split(",").join("<br>");
      kuncienk += window.atob(brkline(arrteks[i]).kunci)

    }
    if (arrteks[i].indexOf("_KUNCI-KD_") > -1) {
      kuncikd += brkline(arrteks[i]).kd + "<br>";
      oo = objekKD(arrteks[i])
    }
    if (arrteks[i].indexOf("_PG_") > -1) {
      countpg += 1;
    }
    if (arrteks[i].indexOf("_ESSAY-NO_") > -1) {
      countess += 1;
    }



    materiimport.innerHTML = tteks;
    tambahtombolisijawaban()
    loadketkunci.innerHTML = kuncipg;
    loadketkunci.innerHTML += kuncienk;
    loadketKD.innerHTML = kuncikd;
    document.formuploadmateri.kuncikd.value = oo;
    document.formuploadmateri.jumlahpg.value = countpg;
    document.formuploadmateri.jumlahessay.value = countess;
    document.formuploadmateri.idkelas.value = idNamaKelas;
    document.formuploadmateri.idtoken.value = idJenjang;
    document.formuploadmateri.idSekolah.value = idNamaSekolah;
    document.formuploadmateri.dibuatoleh.value = namauser;
    //brkline(json).teks

  }
}

const gabolehaksessekalibuat = () => {
  let akses = document.formuploadmateri.idaksessiswa.value
  let betulbetul = (akses == "sekali") ? false : true;
  if (betulbetul) {
    alert("Anda tidak bisa memilih jenis tagihan, karena jenis pembelajaran(KBM) yang Anda edit hanya untuk latihan/tidak menerima tagihan nilai dari siswa");
    document.formuploadmateri.jenistagihan.value = ""
  }

}

const janganadatagihanbuat = () => {
  let akses = document.formuploadmateri.idaksessiswa.value
  let betulbetul = (akses == "sekali") ? false : true;
  if (betulbetul) {
    document.formuploadmateri.jenistagihan.value = ""

  } else {
    document.formuploadmateri.jenistagihan.value = "PH"
  }
}


const awalbuatwaktu = () => {
  let val = document.formuploadmateri.idtgl.value;
  let d = new Date(val)
  let dd = d.getDate();
  let mm = d.getMonth() + 1;
  let yy = d.getFullYear();


  let newval = addZero(dd) + "" + addZero(mm) + "" + yy;
  //console.log(newval)
  document.formuploadmateri.crtToken.value = newval

}

const objekKD = (asal) => {
  if (asal.indexOf("_KUNCI-KD_") > -1) {
    //REPLACE DULU = misal: _KUNCI-PG_1A, 2B, 3C<kalo adaspasi>
    var tekskunci = asal.replace("_KUNCI-KD_", "").replace(/\s+/g, "").split("<||>"); //.split(":");
    let ar = []
    let ob = {};
    for (i = 0; i < tekskunci.length; i++) {

      // ob[tekskunci[i].split(":")[0]] = tekskunci[i].split(":")[1].split(",");
      ob[tekskunci[i].split(":")[0]] = tekskunci[i].split(":")[1].replace("[", "").replace("]", "").split(",");
      ar.push(ob)
    }
    return JSON.stringify(ob)
    //localStorage.setItem("kuncikd", JSON.stringify(ob)) ;// ---> sudah objek array



  }
}


const daftarGambar = async () => {
  //alert ("bakal dibuat modal");
  koleksigambar.style.display = 'block';
  tempattextarea.innerHTML = "";
  // document.getElementById("tabelkoleksigambarmateri").innerHTML ="";
  document.getElementById("tabelkoleksigambarmateri").innerHTML = "<i class='fa fa-spin fa-refresh w3-xxxlarge'></i>";
  await fetch(linkmateri + "&action=koleksigambar")
    .then(m => m.json())
    .then(j => {
      // console.log(j)
      // console.log(j.records)
      // let datasheet = j.records;
      let tabelmateri = document.createElement("table");
      tabelmateri.setAttribute("class", "versi-table w3-card-4 w3-center");
      tabelmateri.setAttribute("id", "tabeltabelkoleksiuploadgambar");
      let row = tabelmateri.insertRow(0);
      let cell = row.insertCell(-1);
      cell.innerHTML = "No";
      cell = row.insertCell(-1);
      cell.innerHTML = "Preview";
      cell = row.insertCell(-1);
      cell.innerHTML = "Tombol Copy";

      cell = row.insertCell(-1);
      cell.innerHTML = "Keterangan";



      for (let i = 0; i < j.records.length; i++) {
        row = tabelmateri.insertRow(-1);
        cell = row.insertCell(-1);
        cell.innerHTML = i + 1;
        cell = row.insertCell(-1);
        cell.innerHTML = j.records[i].htmlgambar;
        cell = row.insertCell(-1);


        let txtarea = document.createElement("textarea");
        txtarea.setAttribute("id", "kodegambar" + i)
        txtarea.value = j.records[i].htmlgambar;
        txtarea.setAttribute("style", "width:30%");
        // cell.appendChild(txtarea);
        cell.innerHTML = `<button class="w3-button w3-tiny w3-round-xlarge w3-green" onclick="kopipaste('kodegambar${i}')">Copy Kode</button>`;

        tempattextarea.appendChild(txtarea)
        cell = row.insertCell(-1);
        cell.innerHTML = j.records[i].keterangan;
      }
      document.getElementById("tabelkoleksigambarmateri").innerHTML = "";
      document.getElementById("tabelkoleksigambarmateri").appendChild(tabelmateri)

    })
  //console.log(linkmateri)
}


// {/* <input type="file" id="tmbluploadgambarmatei" onchange="uploadgambarmateri()" class="w3-hide" accept="image/*">
//                 <div id="resultuploadpotomateri">...</div> */}

const uploadgambarmateri = () => {
  resultuploadpotomateri.innerHTML = "";


  var resize_width = 900; //without px

  //get the image selected
  var item = "";
  item = document.querySelector('#tmbluploadgambarmatei').files[0];

  //create a FileReader
  var reader = new FileReader();

  //image turned to base64-encoded Data URI.
  reader.readAsDataURL(item);
  reader.name = item.name; //get the image's name
  reader.size = item.size; //get the image's size
  reader.onload = function (event) {
    let mmtpe = event.target.result.match(/^.*(?=;)/)[0];
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
      // var srcEncoded = ctx.canvas.toDataURL(el.target, 'image/jpeg', 0);
      var srcEncoded = ctx.canvas.toDataURL(el.target, mmtpe, 0);


      resultuploadpotomateri.innerHTML = "";

      var inputbase64 = document.createElement("input");
      inputbase64.setAttribute("name", "gmbrdata");
      inputbase64.setAttribute("id", "gmbrdata");
      inputbase64.value = srcEncoded.replace(/^.*,/, '');
      inputbase64.setAttribute("style", "display:none");

      var inputfilename = document.createElement("input");
      inputfilename.setAttribute("name", "gmbrfilename");
      inputfilename.setAttribute("id", "gmbrfilename");
      inputfilename.setAttribute("style", "display:none");
      inputfilename.value = new Date().getTime();; // + namebantukirim.value.toUpperCase().replace(/\s+/, "_");

      var inputmimetype = document.createElement("input");
      inputmimetype.setAttribute("name", "gmbrmimeType")
      inputmimetype.setAttribute("id", "gmbrmimeType")
      inputmimetype.setAttribute("style", "display:none")

      inputmimetype.value = srcEncoded.match(/^.*(?=;)/)[0];; //"data:image/jpeg"; 


      resultuploadpotomateri.appendChild(inputbase64);
      resultuploadpotomateri.appendChild(inputfilename);
      resultuploadpotomateri.appendChild(inputmimetype);
      let teks1 = document.createTextNode("Data siap upload. Klik tombol ini ")
      resultuploadpotomateri.appendChild(teks1);
      let tmbl = document.createElement("button", );
      tmbl.setAttribute("class", "w3-black w3-button w3-hover-blue  w3-tiny w3-round-xxlarge");
      tmbl.setAttribute("onclick", "uplgmbrmateri()");
      tmbl.innerHTML = "Upload ke Server"

      resultuploadpotomateri.append(tmbl)



    }

  }


  daftarGambar()
}

const uplgmbrmateri = async () => {
  let ketval = document.formuploadmateri.idmapel.value
  let val = (ketval == "") ? "e-lamaso" : ketval;

  let frmdata = new FormData();
  frmdata.append("gmbrdata", gmbrdata.value);
  frmdata.append("gmbrfilename", gmbrfilename.value);
  frmdata.append("gmbrmimeType", gmbrmimeType.value);
  frmdata.append("keterangan", val);

  resultuploadpotomateri.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`

  await fetch(linkmateri + "&action=uplgmbrmateri", {
      method: 'post',
      body: frmdata
    })
    .then(m => m.json())
    .then(k => {
      //console.log(k);

      resultuploadpotomateri.innerHTML = k.result;
      let txtarea = document.createElement("textarea");
      txtarea.setAttribute("id", "kodegambarjson")
      txtarea.textContent = k.result

      resultuploadpotomateri.innerHTML += `<br><button class="w3-button w3-tiny w3-round-xlarge w3-dark-grey" onclick="kopipaste('kodegambarjson')">Copy Kode</button>`;
      //tempattextarea.innerHTML = "";
      tempattextarea.appendChild(txtarea)
      //cell = row.insertCell(-1);
      //cell.innerHTML = j.records[i].keterangan;


      // document.getElementById("tabelkoleksigambarmateri").appendChild(tabelmateri)
      //document.getElementById("tabelkoleksigambarmateri").appendChild()
      //daftarGambar()
      let tb = document.getElementById("tabeltabelkoleksiuploadgambar"); //.appendChild(txtarea)
      let tr = tb.insertRow(-1);
      let sel = tr.insertCell(-1);
      sel.innerHTML = "NEW";
      sel = tr.insertCell(-1);
      sel.innerHTML = k.result;
      sel = tr.insertCell(-1);
      sel.innerHTML = `<button class="w3-button w3-tiny w3-round-xlarge w3-green" onclick="kopipaste('kodegambarjson')">Copy Kode</button>`;
      sel = tr.insertCell(-1);
      sel.innerHTML = `Terbaru`;







      ///--------------------------------------------          
    })
  //.catch(er => console.log(er))



}

const petunjukuploadmateri = () => {
  document.querySelector(".isipetunjukbuatmateri").innerHTML = `
  <table class="w3-table-all modifgaris" style="margin: 0 auto">
  <tr>
      <th>
          Keterangan
      </th>
      <th>
          Tampilan
      </th>
      <th>
          Parameter
      </th>
      <th>
          Tombol
      </th>

  </tr>
  <tr>
      <td>
          Judul
      </td>
      <td class="w3-padding">
          <h4 class="w3-card-4 w3-blue-grey w3-center w3-round-xxlarge">JUDUL</h4>
      </td>
      <td>
          default
      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen1')">Copy</button>
      </td>
  </tr>
  <tr>
      <td>
          KUNCI jawaban Pilihan Ganda
      </td>
      <td>

          .... tidak ditampilkan di siswa dan teks jawaban akan dienkripsi().
          Cara mengeceknya ada di keterangan atas:
          <hr>
          Contoh penulisan: _KUNCI-PG_1A, 2B, 3C, ...dst...., 40D (diakhir kunci ga boleh ada koma
          lagi)
      </td>
      <td>
          Paramater: 1A &DoubleRightArrow; No. 1 kunci jawabannya A.
          <br>Masing-masing kunci jawaban dipisahkan dengan koma.<br><br>
          Contoh penulisan: _KUNCI-PG_1A, 2B, 3C, ...dst...., 40D (diakhir kunci ga boleh ada koma
          lagi)




      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen25')">Copy</button>
      </td>
  </tr>

  <tr>
      <td>
          SEBARAN KD
      </td>
      <td>
          .... tidak ditampilkan di siswa dan teks jawaban akan dienkripsi().
          Cara mengeceknya ada di keterangan atas:
          <hr>Contoh penulisan: _KUNCI-KD_ <span class="w3-text-blue">PKN_</span>3.1 <b
              class="w3-text-red">:</b> 1, 2, 3 &lt;||&gt; <span
              class="w3-text-blue">MTK_</span>3.1 <b class="w3-text-red">:</b> 4, 5, 6
          <br><br>Default kode Mata pelajaran
          <table class="w3-table-all modifgaris w3-tiny">
            <tr>
              <th>Nama Mapel</th>
              <th>Kode<br><sub>HURUF KAPITAL SEMUA</sub></th>
            </tr>
            <tr>
              <td>
                Pendidikan Kewarganegaraan
              </td>
              <td>
                PKN
              </td>
            </tr>
            <tr>
              <td>
                Pendidikan Agama Islam dan Budi Pekerti
              </td>
              <td>
                PAI
              </td>
            </tr>
            <tr>
              <td>
                Pendidikan Agama Kristen dan Budi Pekerti
              </td>
              <td>
                PKRIS
              </td>
            </tr>
            <tr>
              <td>
                Pendidikan Agama Katolik dan Budi Pekerti
              </td>
              <td>
                PKATO
              </td>
            </tr>
            <tr>
              <td>
                Pendidikan Agama Hindu dan Budi Pekerti
              </td>
              <td>
                PHIND
              </td>
            </tr>
             <tr>
              <td>
                Pendidikan Agama Budha dan Budi Pekerti
              </td>
              <td>
                PBUDH
              </td>
            </tr>
            <tr>
              <td>
                Pendidikan Agama Khonghucu dan Budi Pekerti
              </td>
              <td>
                PKONG
              </td>
            </tr>
            <tr>
              <td>
                Bahasa Indonesia
              </td>
              <td>
                BINDO
              </td>
            </tr>
            <tr>
              <td>
                Matematika
              </td>
              <td>
                MTK
              </td>
            </tr>
            <tr>
              <td>
                IPA (Ilmu Pengetahuan Alam)
              </td>
              <td>
                IPA
              </td>
            </tr>
            <tr>
              <td>
                IPS (Ilmu Pengetahuan Sosial)
              </td>
              <td>
                IPS
              </td>
            </tr>
            <tr>
              <td>
                SBDP (Seni Budaya dan Prakarya)
              </td>
              <td>
                SBDP
              </td>
            </tr>
            <tr>
              <td>
                PJOK (Pendidikan Jasmani dan Kesehatan)
              </td>
              <td>
                PJOK
              </td>
            </tr>
            <tr>
              <td>
                Bahasa Sunda (Mulok wajib)
              </td>
              <td>
                BSUND
              </td>
            </tr>
            <tr>
              <td>
                TIK (Mulok Pilihan)
              </td>
              <td>
                TIKOM
              </td>
            </tr>
          </table>


      </td>
      <td>
          Paramater: "PKN_3.1: 1, 2, 3, 4, 5" &DoubleRightArrow; Mapel PKN dangan KD 3.1 untuk
          nomor soal: 1, 2, 3, 4, dan 5;<br>
          Masing-masing parameter dipisahkan kode &lt;||&gt;
          <br>Contoh penulisan: _KUNCI-KD_ PKN_3.1 : 1, 2, 3 &lt;||&gt; MTK_3.1 : 4, 5, 6
          <br>
          Kode | adalah tombol garis tegak lurus yang ada di atas tombol ENTER




      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen26')">Copy</button>
      </td>
  </tr>
  <tr>
      <td>
          Video Youtube
      </td>
      <td class="w3-padding">
          <iframe width="300" height="215" src="https://www.youtube.com/embed/GR2jxW4tlkY"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
      </td>
      <td>
          default:<br>
          copy paste link url, contoh: <br>https://www.youtube.com/watch?v=GR2jxW4tlkY
          <br>
      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen2')">Copy</button>
      </td>
  </tr>
  <tr>
      <td>
          Buat Tabel
      </td>
      <td class="w3-padding">
          <table class="versi-table">
              <tbody>
                  <tr>
                      <th> NO </th>
                      <th> NAMA </th>
                      <th> KELAS</th>
                  </tr>
                  <tr>
                      <td> 1 </td>
                      <td> ADZKA </td>
                      <td> 3A</td>
                  </tr>
                  <tr>
                      <td> 2 </td>
                      <td> NUHAA </td>
                      <td> 4A</td>
                  </tr>
              </tbody>
          </table>
      </td>
      <td>
          default: <br>kode &lt;|HEADER|&gt; untuk batas garis header<br>
          kode &lt;|&gt; untuk batas garis sel <br>
          Kode | adalah tombol garis tegak lurus yang ada di atas tombol ENTER


      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen3')">Copy</button>
      </td>
  </tr>

  <tr>
      <td>
          Pilihan Ganda (Normal), OPSI sampai D
      </td>
      <td class="w3-padding">
          <div id="contohsoalke-1" class="w3-badge w3-left">1</div>
          <ol style="list-style-type:decimal" start="1" class="w3-padding w3-card-4">
              <li style="list-style-type:none">
                  ASEAN didirikan berdasarkan Deklarasi Bangkok yang ditandatangani pada tanggal….
                  <hr style="border-top:1px solid olive">

                  <ol style="list-style-type:upper-alpha;">
                      <li>
                          <input type="radio" style="display:none" name="contohsoal1"
                              id="contoh1A" />
                          <label class="opsi" for="contoh1A">
                              ini teks opsi jawaban A.
                          </label>
                      </li>
                      <li>
                          <input type="radio" style="display:none" name="contohsoal1"
                              id="contoh1B" />
                          <label class="opsi" for="contoh1B">
                              ini teks opsi jawaban B.
                          </label>
                      </li>
                      <li>
                          <input type="radio" style="display:none" name="contohsoal1"
                              id="contoh1C" />
                          <label class="opsi" for="contoh1C">
                              contoh teks Jawaban C
                          </label>
                      </li>
                      <li>
                          <input type="radio" style="display:none" name="contohsoal1"
                              id="contoh1D" />
                          <label class="opsi" for="contoh1D">
                              ini teks opsi jawaban D.
                          </label>
                      </li>
                  </ol>
              </li>
          </ol>

      </td>
      <td>
          Masukkan No soal sebelum dicopy: <br>
          No. Soal: <input id="inputnosoalpg" type="number" value="1" min="1" max="40"
              onchange="pgeditnosoal()" />



      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen4')">Copy</button>
      </td>
  </tr>
  <tr>
      <td>
          Pilihan Ganda (Normal), OPSI sampai C
      </td>
      <td class="w3-padding">
          <div id="contohsoalke-1C" class="w3-badge w3-left">1</div>
          <ol style="list-style-type:decimal" start="1" class="w3-padding w3-card-4">
              <li style="list-style-type:none">
                  ASEAN didirikan berdasarkan Deklarasi Bangkok yang ditandatangani pada tanggal….
                  <hr style="border-top:1px solid olive">

                  <ol style="list-style-type:upper-alpha;">
                      <li>
                          <input type="radio" style="display:none" name="contohsoal1C"
                              id="contoh1AC" />
                          <label class="opsi" for="contoh1AC">
                              ini teks opsi jawaban A.
                          </label>
                      </li>
                      <li>
                          <input type="radio" style="display:none" name="contohsoal1C"
                              id="contoh1BC" />
                          <label class="opsi" for="contoh1BC">
                              ini teks opsi jawaban B.
                          </label>
                      </li>
                      <li>
                          <input type="radio" style="display:none" name="contohsoal1C"
                              id="contoh1CC" />
                          <label class="opsi" for="contoh1CC">
                              contoh teks Jawaban C
                          </label>
                      </li>

                  </ol>
              </li>
          </ol>

      </td>
      <td>
          Masukkan No soal sebelum dicopy: <br>
          No. Soal: <input id="inputnosoalpgC" type="number" value="1" min="1" max="40"
              onchange="pgeditnosoalC()" />



      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen27')">Copy</button>
      </td>
  </tr>

  <tr>
      <td>
          Pilihan Ganda (Opsi Berupa Tabel)
      </td>
      <td class="w3-padding">
          <div id="contohsoaltabelke1" class="w3-badge w3-left">1</div>
          <ol style="list-style-type:none;padding:0" class="w3-padding w3-white w3-card-4">
              <li style="border-top:1px double blue">
                  Yang termasuk contoh simbiosis dan contohnya yang tepat adalah ...
                  <hr style="border-top:1px solid olive">
                  <div style="overflow-x:auto">
                      <table class="versi-table">
                          <tbody>
                              <tr>
                                  <th> </th>
                                  <th> Simbiosis </th>
                                  <th> contoh </th>
                              </tr>
                              <tr>
                                  <td><input type="radio" style="display:none" name="soalx5"
                                          id="contoh5A	">
                                      <label class="opsi" for="contoh5A	">A</label>
                                  </td>
                                  <td> Mutualisme
                                  </td>
                                  <td> Hubungan bunga dengan lebah
                                  </td>
                              </tr>
                              <tr>
                                  <td><input type="radio" style="display:none" name="soalx5"
                                          id="contoh5B	">
                                      <label class="opsi" for="contoh5B	">B</label>
                                  </td>
                                  <td> Parasitisme
                                  </td>
                                  <td> Hubungan bakteri E-Coli pada usus manusia
                                  </td>
                              </tr>
                              <tr>
                                  <td><input type="radio" style="display:none" name="soalx5"
                                          id="contoh5C	">
                                      <label class="opsi" for="contoh5C	">C</label>
                                  </td>
                                  <td> Komensialisme
                                  </td>
                                  <td> Benalu pada batang pohon mangga
                                  </td>
                              </tr>
                              <tr>
                                  <td><input type="radio" style="display:none" name="soalx5"
                                          id="contoh5D	">
                                      <label class="opsi" for="contoh5D	">D</label>
                                  </td>
                                  <td> Xerofitisme
                                  </td>
                                  <td> Hubungan burung jalak dengan kerbau
                                  </td>
                              </tr>
                          </tbody>
                      </table><br>
                  </div>
              </li>
          </ol>
      </td>
      <td>
          Masukkan No soal sebelum dicopy: <br>
          No. Soal: <input id="inputnosoalpgtabel" type="number" value="1" min="1" max="20"
              onchange="pgeditnosoaltabel()" />



      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen5')">Copy</button>
      </td>
  </tr>

  <tr>
      <td>
          ESSAY
      </td>
      <td class="w3-padding">
          <div id="contohsoalessay" class="w3-badge w3-left">1</div>
          <ol style="list-style-type:none" class="w3-padding w3-card-4">
              <li id="essaxy5" class="soalessaxy" style="border-bottom:1px solid blue">
                  <div id="pertanyaanessaxy_5">
                      Patung yang digunakan sebagai sarana untuk beribadah dan memiliki makna yang
                      religius adalah patung ….
                  </div>
                  <div id="tomboljawabaxn5">
                      <hr>
                      <button onclick="alert('hanya bisa diakses siswa')">
                          Ketik Jawaban No 5
                      </button><br><sub>atau</sub><br>
                      <button onclick="alert('hanya bisa diakses siswa')">
                          Upload Jawaban No 5
                      </button><br>
                      <sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>
                  </div><br>
              </li>
          </ol>
      </td>
      <td>
          Masukkan No soal sebelum dicopy: <br>
          No. Soal: <input id="inputnosoalessay" type="number" value="1" min="1" max="40"
              onchange="editnosoalessay()" />



      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen6')">Copy</button>
      </td>
  </tr>
  <tr>
      <td>
          Matematika:<br>PECAHAN BIASA
      </td>
      <td>Contoh:
          <img
              src="https://chart.apis.google.com/chart?cht=tx&amp;chl=%5Cfrac%7Ba%7D%7Bb%7D%20&amp;chf=bg%2Cs%2CFFFFFF100&amp;chco=000000">
      </td>
      <td>
          a = Pembilang<br>
          b = penyebut
      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen7')">Copy</button>
      </td>

  </tr>
  <tr>
      <td>
          Matematika:<br>PECAHAN BIASA CAMPURAN
      </td>
      <td>Contoh:
          <img
              src="https://chart.apis.google.com/chart?cht=tx&amp;chl=a%5Cfrac%7Bb%7D%7Bc%7D%20&amp;chf=bg%2Cs%2CFFFFFF100&amp;chco=000000">
      </td>
      <td>
          a = Satuan<br>
          b = Pembilang<br>
          c = penyebut
      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen8')">Copy</button>
      </td>

  </tr>
  <tr>
      <td>
          Matematika:<br>AKAR KUADRAT
      </td>
      <td>Contoh:
          <img
              src="https://chart.apis.google.com/chart?cht=tx&amp;chl=%5Csqrt%7Ba%7D%20&amp;chf=bg%2Cs%2CFFFFFF100&amp;chco=000000">
      </td>
      <td>
          a = angka dalam akar<br>

      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen9')">Copy</button>
      </td>

  </tr>
  <tr>
      <td>
          Matematika:<br>AKAR PANGKAT TIGA
      </td>
      <td>Contoh:
          <img
              src="https://chart.apis.google.com/chart?cht=tx&amp;chl=%5Csqrt[3]%7Bangka%7D%20&amp;chf=bg%2Cs%2CFFFFFF100&amp;chco=000000">
      </td>
      <td>
          angka = angka dalam akar<br>

      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen10')">Copy</button>
      </td>

  </tr>
  <tr>
      <td>
          Matematika:<br>PANGKAT (Semua angka)
      </td>
      <td>Contoh:
          <img
              src="https://chart.apis.google.com/chart?cht=tx&amp;chl=a^b%20&amp;chf=bg%2Cs%2CFFFFFF100&amp;chco=000000">
      </td>
      <td>
          a = angka<br>
          b = eksponen<br><br>
          a dan b berupa angka

      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen11')">Copy</button>
      </td>

  </tr>
  <tr>
      <td>
          Matematika:<br>PANGKAT HURUF (boleh huruf)
      </td>
      <td>Contoh:
          <img
              src="https://chart.apis.google.com/chart?cht=tx&amp;chl=a^b%20&amp;chf=bg%2Cs%2CFFFFFF100&amp;chco=000000">
      </td>
      <td>
          a = angka<br>
          b = eksponen<br><br>
          a dan b boleh huruf<br><br>
          Misalnya digunakan untuk menulis rumus matematika, contoh:<br><br>
          <!-- Rumus luas lingkaran adalah:<div class="w3-white"> <img
                  src="https://chart.apis.google.com/chart?cht=tx&amp;chl=%5Cpi%20&amp;chf=bg%2Cs%2CFFFFFF100&amp;chco=000000">
              x r <sup>2</sup></div> -->
          Rumus luas lingkaran adalah:<div class="w3-white"> &#8508; x r <sup>2</sup></div>

      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen12')">Copy</button>
      </td>

  </tr>
  <tr>
      <td>
          Matematika:<br>EQUATION EDITOR LAINNYA
      </td>
      <td>Contoh:
          <img
              src="https://chart.apis.google.com/chart?cht=tx&amp;chl=%5Csqrt%7B325%20%5Cfrac%7B2%7D%7B3%7D%7D%20&amp;chf=bg%2Cs%2CFFFFFF100&amp;chco=000000">
      </td>
      <td>
          dibutuhkan kode equation editor di link ini:<br />
          <a href="http://atomurl.net/math/" target="_blank">equation editor
              online</a>;
          <br>
          Contoh di atas adalah dengan menggunakan kode: \sqrt{325\frac{2}{3}} <br>
          kode di atas dihilangkan spasinya;
      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen13')">Copy</button>
      </td>

  </tr>
  <tr>
      <td>
          Simbol:<br> Operator pembagian
      </td>
      <td>Contoh:
          <span class="w3-xxlarge">
              &#247;
          </span>
      </td>
      <td>
          default:
          Digunakan untuk operator matematika
      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen14')">Copy</button>
      </td>

  </tr>
  <tr>
      <td>
          Simbol:<br> Tanda Derajat
      </td>
      <td>Contoh:
          <span class="w3-xxlarge">
              &#176;
          </span>
      </td>
      <td>
          default:
          Digunakan untuk eksponen yang menyatakan suhu:<br>
          Suhu di Kota Depok adalah 35 &#176; Celcius
      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen15')">Copy</button>
      </td>

  </tr>
  <tr>
      <td>
          Simbol:<br> tanda sudut lancip
      </td>
      <td>Contoh:
          <span class="w3-xxlarge">
              &ang;
          </span>
      </td>
      <td>
          default:
          Digunakan untuk menulis simbol sudut lancip
      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen16')">Copy</button>
      </td>

  </tr>
  <tr>
      <td>
          Simbol:<br> tanda sudut siku-siku
      </td>
      <td>Contoh:
          <span class="w3-xxlarge">
              &angrtvb;
          </span>
      </td>
      <td>
          default:
          Digunakan untuk menulis simbol sudut siku-siku
      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen17')">Copy</button>
      </td>

  </tr>
  <tr>
      <td>
          Simbol:<br> Plus Minus (Kurang lebih)
      </td>
      <td>Contoh:
          <span class="w3-xxlarge">
              &PlusMinus;
          </span>
      </td>
      <td>
          default:
          Digunakan untuk menulis simbol kurang lebih
      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen18')">Copy</button>
      </td>

  </tr>
  <tr>
      <td>
          Simbol:<br> Checklist
      </td>
      <td>Contoh:
          <span class="w3-xxlarge">
              &checkmark;
          </span>
      </td>
      <td>
          default:
          Digunakan untuk menulis simbol ceklis
      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen19')">Copy</button>
      </td>

  </tr>
  <tr>
      <td>
          Simbol:<br> Phi
      </td>
      <td>Contoh:
          <span class="w3-xxlarge">
              &#8508;
          </span>
      </td>
      <td>
          default:
          Digunakan untuk menulis simbol phi : 22/7
      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen20')">Copy</button>
      </td>

  </tr>
  <tr>
      <td>
          Simbol:<br> Tanda panah ke kiri
      </td>
      <td>Contoh:
          <span class="w3-xxlarge">
              &larr;
          </span>
      </td>
      <td>
          default:
          Digunakan untuk menulis tanda panah
      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen21')">Copy</button>
      </td>

  </tr>
  <tr>
      <td>
          Simbol:<br> Tanda panah ke kanan
      </td>
      <td>Contoh:
          <span class="w3-xxlarge">
              &rarr;
          </span>
      </td>
      <td>
          default:
          Digunakan untuk menulis tanda panah
      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen22')">Copy</button>
      </td>

  </tr>
  <tr>
      <td>
          Simbol:<br> Tanda panah dobel ke kanan
      </td>
      <td>Contoh:
          <span class="w3-xxlarge">
              &DoubleLongRightArrow;
          </span>
      </td>
      <td>
          default:
          Digunakan untuk menulis tanda panah
      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen23')">Copy</button>
      </td>

  </tr>
  <tr>
      <td>
          Simbol:<br> Tanda panah dobel ke kiri
      </td>
      <td>Contoh:
          <span class="w3-xxlarge">
              &DoubleLongLeftArrow;
          </span>
      </td>
      <td>
          default:
          Digunakan untuk menulis tanda panah
      </td>
      <td>
          <button class="w3-button w3-round-xlarge w3-teal"
              onclick="kopipaste('ketpen24')">Copy</button>
      </td>

  </tr>
</table>
  `
  petunjukcarabuatmateri.style.display = "block"
  txtareapetunjuk.style.display = "block";
}

const publikasikanmateribaru = () => {
  let tglkosong = document.formuploadmateri.idtgl.value
  let boltgl = (tglkosong == "") ? alert('Waktu Mulai tidak boleh kosong') : true;
  let mapel = document.formuploadmateri.idmapel.value;
  let bolmapel = (mapel == "") ? alert('Identitas pembelajaran tidak boleh kosong') : true;

  let kuncikosong = document.formuploadmateri.kuncikd.value;
  let bolkd = (kuncikosong == "") ? alert("Anda belum membuat sebaran KD") : true;
  if (bolmapel && boltgl && bolkd) {
    let dom = document.getElementById("formuploadmateri");
    let data = new FormData(dom);
    pranalamateri.style.display = "block";
    dom.reset();
    idpracetak.innerHTML = `<i class="fa fa-spin fa-spinner w3-xxxlarge"></i> On Proess kirim`
    let url = linkmateri + "&action=materibaru"
    fetch(url, {
        method: 'post',
        body: data
      })
      .then(m => m.json())
      .then(f => {
        idpracetak.innerHTML = f.result;
        loadketkunci.innerHTML = "";

        loadketKD.innerHTML = "";
        //console.log(f)
        pembelajaran();
        updatematerikan();
        localStorage.removeItem("draftmateri")

      })
      .catch(er => idpracetak.innerHTML = "Maaf, terjadi kesalahan: <br> Error Code" + er)

  }

}

const daftarnilaikronologi = (id) => {
  //alert(id)
  //let teks = "kbmtoday"+ tglStringZero();
  idtabaktif.innerHTML = id;
  koreksidarimana.innerHTML = id + "_kronologi";
  // let datamaterilocal = JSON.parse(localStorage.getItem(teks))[id];
  let datamaterilocal = kronologijson[id];

  let materi = datamaterilocal.idmapel.toUpperCase();

  let mtri = datamaterilocal.idmapel;
  let tagih = datamaterilocal.jenistagihan;
  let ctok = datamaterilocal.crtToken;
  //alert (teks)
  //let kodeunik = tagih + "_" + tglStringZero();
  modaldaftarnilaikronologi.style.display = "block";
  document.querySelector("#modalidmapelkronologi").innerHTML = "<br>" + tagih + " " + materi;
  document.getElementsByClassName("tablinkkronologi")[0].click();
  //$.getJSON(constlinknilai+"&action=dataanalisisharian", function(json))
  // let kelas = e.parameter.idkelas;
  // let idmapel = e.parameter.idmapel;
  // let kodeunik = e.parameter.kodeunik;
  let paramtambahan = "&idkelas=" + encodeURIComponent(idNamaKelas);
  // paramtambahan += "&idmapel=" + encodeURIComponent(mtri);
  // paramtambahan += "&kodeunik=" + encodeURIComponent(kodeunik)
  // tablinkKDtabel.innerHTML = `<i class="fa fa-refresh fa-spin w3-xxxlarge"><i>`
  // fetch(constlinknilai + "?action=dataanalisisharian" + paramtambahan)

  fetch(constlinknilai + "?action=nilairseponkronologi" + paramtambahan)
    .then(m => m.json())
    .then(f => {
      //console.log(f)
      let res = f.records;


      nilairesponkronologi = res.filter(k => k.idmapel == mtri && k.jenistagihan == tagih & k.crtToken == ctok)
      // nilairesponkronologi = f.records;
      //console.log(nilairesponkronologi)
      forModalTabelkronologi(id)
    })


}


function bukaModalTabkronologi(evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("citykronologi");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinkkronologi");
  for (i = 0; i < x.length; i++) {
    tablinks[i].classList.remove("w3-light-grey");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.classList.add("w3-light-grey");

}

const forModalTabelkronologi = (id) => {
  //tes dulu bekerja di id tablinkKDtabel

  let datamaterilocal = kronologijson[id];
  // console.log(datamaterilocal)
  // // console.log(JSON.parse(datamaterilocal.kuncikd));
  let identitasmapel = datamaterilocal.idmapel;
  let idd = parseInt(id);
  let datakd = JSON.parse(datamaterilocal.kuncikd);
  let punyaessay = (datamaterilocal.jumlahessay == 0) ? false : true;
  // console.log(punyaessay)

  // console.log("datakd:")
  // console.log(datakd)

  let banyakkd = Object.keys(datakd);

  // console.log("banyakkd:")
  // console.log(banyakkd.length);
  // console.log("idKD");
  // console.log(banyakkd)
  // filter untuk dijadikan unik pada key
  let mapelunik = [];
  let koleksikd = []
  let kdpermapel = {};
  for (i = 0; i < banyakkd.length; i++) {
    let mp = banyakkd[i].split("_")[0]
    if (mapelunik.indexOf(mp) == -1) {
      mapelunik.push(mp);
    }
  }
  let koleksinamasiswa = jsondatasiswa.map(k => k.pd_nama)

  let koleksitokensiswa = jsondatasiswa.map(k => k.id)
  // console.log(kdpermapel);
  // console.log(mapelunik)
  //bikin tabel
  let tabel = document.createElement("table")
  tabel.setAttribute("class", "versi-table w3-tiny");
  tabel.setAttribute("id", "tabel_rekap_KDkronologi");
  //bikin head;
  //let row = tabel.insertRow(0)
  let rthead = tabel.createTHead();
  let rth = rthead.insertRow(0)
  let rtd = document.createElement("th")
  rtd.setAttribute("rowspan", 3)
  rtd.innerHTML = "No"
  rth.appendChild(rtd);
  rtd = document.createElement("th")
  rtd.setAttribute("rowspan", 3)
  rtd.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
  rtd.innerHTML = "Nama Siswa"
  rth.appendChild(rtd);
  // if (punyaessay) {
  //   rtd = document.createElement("th")
  //   rtd.setAttribute("rowspan", 3)
  //   rtd.innerHTML = "Koreksi"
  //   rth.appendChild(rtd);
  // }

  rtd = document.createElement("th")
  rtd.setAttribute("rowspan", 3)
  rtd.innerHTML = "Aksi"
  rth.appendChild(rtd);


  rtd = document.createElement("th")
  rtd.setAttribute("colspan", banyakkd.length)
  rtd.innerHTML = "Mata Pelajaran"
  rth.appendChild(rtd);

  rth = rthead.insertRow(-1);
  rth.setAttribute("colspan", banyakkd.length);
  rth2 = rthead.insertRow(-1)
  for (k = 0; k < mapelunik.length; k++) {
    rtd = document.createElement("th")
    //  rtd.innerHTML = mapelunik[k]
    //  rth.appendChild(rtd);
    let coun = 0;

    for (j = 0; j < banyakkd.length; j++) {

      let st = banyakkd[j]
      if (st.indexOf(mapelunik[k]) > -1) {
        coun++;


        //let tekconsol = "Mapel " + mapelunik[k] +"KD " + banyakkd[j];
        //console.log(tekconsol)
        let rtd1 = document.createElement("th")
        rtd1.innerHTML = banyakkd[j].split("_")[1] + "<br>" + banyakkd[j]
        rth2.appendChild(rtd1);
      }
    }
    rtd.innerHTML = mapelunik[k]
    rtd.setAttribute("colspan", coun)
    rth.appendChild(rtd);
  }
  let tbo = tabel.createTBody();
  for (z = 0; z < koleksinamasiswa.length; z++) {
    let rowisi = tbo.insertRow(-1);
    let sel = rowisi.insertCell(-1)
    sel.innerHTML = (z + 1);

    sel = rowisi.insertCell(-1)
    sel.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
    sel.innerHTML = koleksinamasiswa[z];
    // if (punyaessay) {
    sel = rowisi.insertCell(-1)
    sel.innerHTML = tombolaksikronologi(punyaessay, koleksitokensiswa[z], z, idd);
    // sel.innerHTML = `<button class="w3-button w3-blue">Koreksi</button>`;

    // }
    for (a = 0; a < mapelunik.length; a++) {
      //  rtd.innerHTML = mapelunik[k]
      //  rth.appendChild(rtd);
      let coun = 0;

      for (j = 0; j < banyakkd.length; j++) {

        let st = banyakkd[j];

        if (st.indexOf(mapelunik[a]) > -1) {
          coun++;


          let tekconsol = "Mapel " + mapelunik[a] + "KD " + banyakkd[j];
          //console.log(tekconsol)

          let sell = rowisi.insertCell(-1)
          sell.innerHTML = nilaiKDSiswakronologi(koleksitokensiswa[z], banyakkd[j]).replace(".", ","); // banyakkd[j] + "nama = " + koleksinamasiswa[z];

        }
      }
    }

  }



  let idtabel = `tabel_rekap_KDkronologi`;
  let judul1 = `DAFTAR NILAI PER-KD ${identitasmapel.toUpperCase()}  KELAS ${idNamaKelas.toUpperCase()}`;
  let judul2 = `Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}`;
  let tekstgl = `${StringTanggal(new Date())}`;
  let namafile = `DAFTAR NILAI PER-KD ${identitasmapel.toUpperCase()} Kelas ${idNamaKelas}  id file ${new Date().getTime()}`;
  let xx = `${idtabel},${judul1}, ${judul2}, ${tekstgl}`;
  let xxx = `${idtabel}, ${namafile},${judul1}`

  tablinkKDkronologitabel.innerHTML = `<button class="w3-button w3-green w3-round-xlarge" onclick="printModalPKD('${xx}')"><i class="fa fa-print"></i> Cetak </button> | <button class="w3-button w3-teal w3-round-xlarge" onclick="ExcelModalKD('${xxx}')"><i class="fa fa-file-excel-o"></i> Ms. Excel </button>  <hr>`;

  //tablinkKDtabel.appendChild(tombolprint)
  tablinkKDkronologitabel.appendChild(tabel);
  let teksket = document.createTextNode("Tombol LJK merah menandakan LJK belum dikoreksi dan belum ada nilai")
  tablinkKDkronologitabel.appendChild(teksket)
  let brr = document.createElement("br")
  tablinkKDkronologitabel.appendChild(brr)
  teksket = document.createTextNode("Tombol LJK biru menandakan LJK sudah dikoreksi dan sudah ada nilai")
  tablinkKDkronologitabel.appendChild(teksket)

}


document.querySelector(".tabpgkronologi").addEventListener("click", function () {
  let a = parseInt(idtabaktif.innerHTML);

  formModalTabelAnalisisPGkronologi(a)
})
document.querySelector(".tabskorkronologi").addEventListener("click", function () {
  let a = parseInt(idtabaktif.innerHTML);
  formModalTabelAnalisisSkorkronologi(a)
})


const formModalTabelAnalisisPGkronologi = (id) => {
  let datamaterilocal = kronologijson[id];

  let jumlahpg = (datamaterilocal.jumlahpg == 0) ? 1 : parseInt(datamaterilocal.jumlahpg);

  let identitasmapel = datamaterilocal.idmapel;
  //console.log(jumlahpg);
  let koleksinamasiswa = jsondatasiswa.map(k => k.pd_nama);
  let koleksitokensiswa = jsondatasiswa.map(k => k.id);
  let tabel = document.createElement("table");
  tabel.setAttribute("class", "versi-table w3-tiny");
  tabel.setAttribute("id", "table_rekap_pgkronologi");
  let thead = tabel.createTHead();
  let row = thead.insertRow(0);
  let th = document.createElement("th");
  th.setAttribute("rowspan", 2)
  th.innerHTML = "No";
  row.appendChild(th);

  th = document.createElement("th");
  th.setAttribute("rowspan", 2)
  th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
  th.innerHTML = "NAMA SISWA";
  row.appendChild(th);

  th = document.createElement("th");
  th.setAttribute("colspan", jumlahpg)
  th.innerHTML = "NOMOR SOAL";
  row.appendChild(th);

  row = thead.insertRow(-1)
  if (datamaterilocal.jumlahpg !== 0) {
    for (b = 0; b < jumlahpg; b++) {
      th = document.createElement("th");
      th.innerHTML = (b + 1);
      row.appendChild(th);
    }
  } else {
    th = document.createElement("th");
    th.innerHTML = "Tidak Ada PG";
    row.appendChild(th);
  }

  let bdy = tabel.createTBody();
  for (c = 0; c < koleksinamasiswa.length; c++) {
    let tr = bdy.insertRow(-1)
    let sel = tr.insertCell(-1)
    sel.innerHTML = (c + 1);

    sel = tr.insertCell(-1);
    sel.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
    sel.innerHTML = koleksinamasiswa[c];
    if (datamaterilocal.jumlahpg !== 0) {
      for (d = 0; d < jumlahpg; d++) {
        sel = tr.insertCell(-1)
        //sel.innerHTML = OpsiSiswakronologi(koleksinamasiswa[c],"PG_" + (d+1));
        if (OpsiSiswakronologi(koleksitokensiswa[c], "PG_" + (d + 1))[0]) {
          if (OpsiSiswakronologi(koleksitokensiswa[c], "PG_" + (d + 1))[2] == 1) {
            sel.setAttribute("style", "background-color:aqua");
            sel.innerHTML = OpsiSiswakronologi(koleksitokensiswa[c], "PG_" + (d + 1))[1]
          } else {
            sel.setAttribute("style", "background-color:red");
            sel.innerHTML = OpsiSiswakronologi(koleksitokensiswa[c], "PG_" + (d + 1))[1]
          }

        } else {
          sel.innerHTML = ""
        }


      }

    } else {
      sel = tr.insertCell(-1)
      sel.innerHTML = "Tidak ada Soal PG"

    }

  }


  let idtabel = `table_rekap_pgkronologi`;
  let judul1 = `ANALISIS SOAL ${identitasmapel.toUpperCase()}  KELAS ${idNamaKelas.toUpperCase()}`;
  let judul2 = `Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}`;
  let tekstgl = `${StringTanggal(new Date())}`;
  let namafile = `ANALISIS SOAL ${identitasmapel.toUpperCase()} Kelas ${idNamaKelas}  id file ${new Date().getTime()}`;
  let xx = `${idtabel},${judul1}, ${judul2}, ${tekstgl}`;
  let xxx = `${idtabel}, ${namafile},${judul1}`

  tablinkPGkronologitabel.innerHTML = `<button class="w3-button w3-green w3-round-xlarge" onclick="printModalL('${xx}')"><i class="fa fa-print"></i> Cetak </button> | <button class="w3-button w3-teal w3-round-xlarge" onclick="ExcelModal('${xxx}')"><i class="fa fa-file-excel-o"></i> Ms. Excel </button>  <hr>`;

  //tablinkKDtabel.appendChild(tombolprint)
  tablinkPGkronologitabel.appendChild(tabel);








}
const formModalTabelAnalisisSkorkronologi = (id) => {
  let datamaterilocal = kronologijson[id];
  let jumlahpg = parseInt(datamaterilocal.jumlahpg) + parseInt(datamaterilocal.jumlahessay);

  let identitasmapel = datamaterilocal.idmapel;
  //console.log(jumlahpg);
  let koleksinamasiswa = jsondatasiswa.map(k => k.pd_nama);
  let koleksitokensiswa = jsondatasiswa.map(k => k.id);

  let tabel = document.createElement("table");
  tabel.setAttribute("class", "versi-table w3-tiny");
  tabel.setAttribute("id", "table_rekap_skorkronologi");
  let thead = tabel.createTHead();
  let row = thead.insertRow(0);
  let th = document.createElement("th");
  th.setAttribute("rowspan", 2)
  th.innerHTML = "No";
  row.appendChild(th);

  th = document.createElement("th");
  th.setAttribute("rowspan", 2)
  th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
  th.innerHTML = "NAMA SISWA";
  row.appendChild(th);

  th = document.createElement("th");
  th.setAttribute("colspan", jumlahpg)
  th.innerHTML = "NOMOR SOAL";
  row.appendChild(th);

  row = thead.insertRow(-1)
  for (b = 0; b < jumlahpg; b++) {
    th = document.createElement("th");
    th.innerHTML = (b + 1);
    row.appendChild(th);
  }

  let bdy = tabel.createTBody();
  for (c = 0; c < koleksinamasiswa.length; c++) {
    let tr = bdy.insertRow(-1)
    let sel = tr.insertCell(-1)
    sel.innerHTML = (c + 1);

    sel = tr.insertCell(-1);
    sel.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
    sel.innerHTML = koleksinamasiswa[c];

    for (d = 0; d < jumlahpg; d++) {
      sel = tr.insertCell(-1)
      // sel.innerHTML = "-";
      if (OpsiSiswakronologi(koleksitokensiswa[c], "PG_" + (d + 1))[0]) {
        if (OpsiSiswakronologi(koleksitokensiswa[c], "PG_" + (d + 1))[2] == 1) {
          sel.setAttribute("style", "background-color:aqua");
          sel.innerHTML = OpsiSiswakronologi(koleksitokensiswa[c], "PG_" + (d + 1))[2]
        } else {
          sel.setAttribute("style", "background-color:red");
          sel.innerHTML = OpsiSiswakronologi(koleksitokensiswa[c], "PG_" + (d + 1))[2]
        }

      } else {
        sel.innerHTML = ""
      }

    }

  }


  let idtabel = `table_rekap_skorkronologi`;
  let judul1 = `ANALISIS SKOR SOAL ${identitasmapel.toUpperCase()}  KELAS ${idNamaKelas.toUpperCase()}`;
  let judul2 = `Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}`;
  let tekstgl = `${StringTanggal(new Date())}`;
  let namafile = `ANALISIS SKOR SOAL ${identitasmapel.toUpperCase()} Kelas ${idNamaKelas}  id file ${new Date().getTime()}`;
  let xx = `${idtabel},${judul1}, ${judul2}, ${tekstgl}`;
  let xxx = `${idtabel}, ${namafile},${judul1}`

  tablinkSkorkronologitabel.innerHTML = `<button class="w3-button w3-green w3-round-xlarge" onclick="printModalL('${xx}')"><i class="fa fa-print"></i> Cetak </button> | <button class="w3-button w3-teal w3-round-xlarge" onclick="ExcelModal('${xxx}')"><i class="fa fa-file-excel-o"></i> Ms. Excel </button>  <hr>`;

  //tablinkKDtabel.appendChild(tombolprint)
  tablinkSkorkronologitabel.appendChild(tabel);








}

const tutuploadingljk = () => {
  $('#infoloadingljk').nextAll('button').remove();
  $('#infoloadingljk').nextAll('center').remove();
  infoloadingljk.innerHTML = "";
  loadingljk.style.display = 'none'
}
const nilaiKDSiswakronologi = (parNama, keyKD) => {
  let FilterRec = nilairesponkronologi.filter(k => k.tokensiswa == parNama);


  let jmlh = FilterRec.length,
    nn;
  if (jmlh > 0) {
    //JSON.parse(nilairespon.filter(k => k.namasiswa == "ABIN NUGRAHA")[0].nilaikd)
    let arry = FilterRec[jmlh - 1].nilaikd
    let obj = JSON.parse(arry)[keyKD];
    //console.log(obj);
    //nn = JSON.parse(FilterRec[jmlh - 1].nilaikd)[keyKD];
    nn = (obj >= 0) ? obj : "0.00";
    //console.log(nn)
  } else {
    nn = ""
  }
  return nn
}
const OpsiSiswakronologi = (parNama, keyKD) => {
  //nilairespon.filter(k=>k.namasiswa == "ABIN NUGRAHA").map(k => [k.PG_1, k.SKOR_1])
  let angka = keyKD.match(/(\d+)/)[0] // mengembalikan angkanya aja
  let cek = nilairesponkronologi.filter(k => k.tokensiswa == parNama).map(d => [d[keyKD], d["SKOR_" + angka]]);

  //nilairespon.filter(k => k.namasiswa == "ABIN NUGRAHA").map(d => d["PG_4"])[0]
  // let cek = nilairespon.filter(k => k.namasiswa == parNama).map(d => d[keyKD]);
  let ada = cek.length;

  // let angka = keyKD.match(/(\d+)/)[0] // mengembalikan angkanya aja
  // let  skoropsi =nilairespon.filter(k => k.namasiswa == parNama).map(d => d["SKOR_" + angka]);
  let opsinya = [];
  if (ada > 0) {
    opsinya = [true, cek[ada - 1][0], cek[ada - 1][1]];
  } else {
    opsinya = [false]
  }

  return opsinya
}

const tombolaksikronologi = (currEssay, parNama, z, idhtmlmateri) => {
  //let currEssay = ;//ada ga essay? false (jika ga ada)
  //anggap aja ada essay dulu!
  let kodehtml = "";
  let cek = nilairesponkronologi.filter(k => k.tokensiswa == parNama);

  if (cek.length == 0) {
    //jika siswa belum mengerjakan, tolong bantu isi!
    kodehtml = `<button class="w3-button w3-khaki w3-card-4" onclick="bantusiswaisiljk('${z + "_" + idhtmlmateri}')">Bantu Isi</button>`

  } else {
    // console.log(cek)
    // console.log(cek[cek.length - 1])
    // console.log(cek[cek.length - 1]['nilaiEssay'])
    let indek = cek.length - 1;
    let indekk = indek + "<|>" + parNama


    if (currEssay) {
      // jika ada essay, cek lagi. Nilai essaynya udah masuk apa belum
      // jika belum masuk, maka tampilkan tombol koreksi
      if (cek[indek].nilaiEssay == "") {
        kodehtml = `<button class="w3-button w3-red" onclick="lihatljksaya('${cek[indek].html_jawaban}')">LJK</button><br>
        <button class="w3-button w3-green" onclick="gurumengoreksi('${indekk}')">Koreksi</button><br><br>
        <button class="w3-button w3-black" onclick="hapusljk('${cek[indek].idbaris}')">Hapus</button><br>
        `
      } else {
        kodehtml = `<button class="w3-button w3-blue" onclick="lihatljksaya('${cek[indek].html_jawaban}')">LJK</button><br>
        <button class="w3-button w3-green" onclick="gurumengoreksi('${indekk}')">Koreksi Ulang</button><br><br>
        <button class="w3-button w3-black" onclick="hapusljk('${cek[indek].idbaris}')">Hapus</button><br>
        `
        //<button class="w3-button w3-green" onclick="gurumengoreksi('${indek}')">Koreksi Ulang</button><br></br>
        //
      }

    } else {
      kodehtml = `<button class="w3-button w3-blue" onclick = "lihatljksaya('${cek[indek].html_jawaban}')" > LJK</button ><br> <br> 
      <button class="w3-button w3-black" onclick="hapusljk('${cek[indek].idbaris}')">Hapus</button><br>
      `
    }
  }
  return kodehtml
}

const lihatljksaya = (html_jawaban) => {
  loadingljk.style.display = "block";
  infoloadingljk.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle" ></i > `;
  $('#infoloadingljk').nextAll('button').remove();
  $('#infoloadingljk').nextAll('center').remove();
  $.getJSON(constpreviewljk + "?idmateri=" + html_jawaban + "&action=previewriwayat", function (json) {

    //loadingljk.style.display  = "none";
    //$("#output").html(brkline(json))
    // document.getElementById("judulpetunjuk").innerHTML = "Preview e-Lamaso";
    //        document.getElementById("isipetunjuk").innerHTML = brkline(json);
    infoloadingljk.innerHTML = brkline(json).teks + "<br><br><br>";



    let tombol = document.createElement("button");
    tombol.setAttribute("class", "w3-button w3-dark-grey w3-display-bottommiddle w3-margin-bottom");
    tombol.setAttribute("onclick", `printPortrait('infoloadingljk,,,${StringTanggal(new Date())}')`);
    tombol.innerHTML = `<i class="fa fa-print" ></i > Cetak`

    infoloadingljk.after(tombol)

  })

}

const gurumengoreksi2 = (bid) => {
  //let nilkdstr = cek.nilaikd;
  //let nilkdobj = JSON.parse(nilkdstr)
  let indek = bid.split("<|>")[0];
  let parnama = bid.split("<|>")[1];
  let cek = nilairesponkronologi.filter(k => k.tokensiswa == parnama)[indek];
  let idbaris = cek.idbaris;
  let html_jawaban = cek.html_jawaban;
  let ob = JSON.parse(kronologijson[parseInt(idtabaktif.innerHTML)].kuncikd);
  let nilaisebelumnya = JSON.parse(cek.nilaikd)
  console.log(nilaisebelumnya)
  // let 



  loadingljk.style.display = "block";
  infoloadingljk.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle" ></i > `;

  $('#infoloadingljk').nextAll('button').remove();
  $('#infoloadingljk').nextAll('center').remove();
  $.getJSON(constpreviewljk + "?idmateri=" + html_jawaban + "&action=previewriwayat", function (json) {

    //loadingljk.style.display  = "none";
    //$("#output").html(brkline(json))
    // document.getElementById("judulpetunjuk").innerHTML = "Preview e-Lamaso";
    //        document.getElementById("isipetunjuk").innerHTML = brkline(json);
    infoloadingljk.innerHTML = brkline(json).teks + "<br><br><br>";
    var elEssay = document.getElementsByClassName("koleksilj")
    if (elEssay.length !== 0) {
      for (i = 0; i < elEssay.length; i++) {
        var idEl = elEssay[i].getAttribute("id");
        var inidEl = idEl.replace("untuklj", "");
        var tempattombol = document.getElementById("untuklj" + inidEl);
        var tombolsatu = document.createElement("input");
        tombolsatu.setAttribute("type", "number");
        tombolsatu.setAttribute("class", "koreksisoal");
        // tombolsatu.setAttribute("min", 0);
        // tombolsatu.setAttribute("max", 100);
        tombolsatu.setAttribute("onchange", "updatenilaikoreksi()");
        tempattombol.innerHTML = "Beri Nilai :";
        tempattombol.appendChild(tombolsatu);


      }
    }


    var tengahdulu = document.createElement("center");
    tengahdulu.setAttribute("style", "background-color:yellow");

    var inputidbaris = document.createElement("input");
    inputidbaris.setAttribute("id", "brs");
    inputidbaris.setAttribute("value", idbaris);
    inputidbaris.setAttribute("disabled", "true");
    inputidbaris.setAttribute("style", "display:block");

    var inputnilaikoreksi = document.createElement("input");
    inputnilaikoreksi.setAttribute("type", "number");
    inputnilaikoreksi.setAttribute("id", "nilaiakhiressay");
    inputnilaikoreksi.setAttribute("disabled", "true");

    var tombolkirim = document.createElement("button");
    tombolkirim.setAttribute("onclick", "siapkirimnilai()")
    tombolkirim.innerHTML = "Beri Nilai";


    tengahdulu.appendChild(inputidbaris);

    // let inputt = document.createElement("input");
    // inputt.setAttribute("id",)
    tengahdulu.innerHTML += "Preview Nilai Essay : "
    tengahdulu.appendChild(inputnilaikoreksi);
    tengahdulu.appendChild(tombolkirim);





    let tombol = document.createElement("button");
    tombol.setAttribute("class", "w3-button w3-dark-grey w3-display-bottommiddle w3-margin-bottom");
    tombol.setAttribute("onclick", `printPortrait('infoloadingljk,,,${StringTanggal(new Date())}')`);
    tombol.innerHTML = `<i class="fa fa-print" ></i > Cetak`

    infoloadingljk.after(tengahdulu)
    infoloadingljk.after(tombol)

  })

}

const gurumengoreksi3 = (bid) => {
  let indek = bid.split("<|>")[0];
  let parnama = bid.split("<|>")[1];
  let cek = nilairesponkronologi.filter(k => k.tokensiswa == parnama)[indek];
  let idbaris = cek.idbaris;

  loadingljk.style.display = "block";
  infoloadingljk.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle" ></i > `;
  let divljk = document.createElement("div");
  divljk.setAttribute("id", "divljkkoreksi");

  $('#infoloadingljk').nextAll('button').remove();
  $('#infoloadingljk').nextAll('center').remove();
  let html_jawaban = cek.html_jawaban;
  $.getJSON(constpreviewljk + "?idmateri=" + html_jawaban + "&action=previewriwayat", function (json) {

    // infoloadingljk.innerHTML = brkline(json).teks + "<br><br><br>";
    infoloadingljk.innerHTML = ""; //brkline(json).teks + "<br><br><br>";
    infoloadingljk.appendChild(divljk)
    divljkkoreksi.innerHTML = brkline(json).teks + "<br><br><br>";
    var elEssay = document.getElementsByClassName("koleksilj")
    if (elEssay.length !== 0) {
      for (i = 0; i < elEssay.length; i++) {
        var idEl = elEssay[i].getAttribute("id");
        var inidEl = idEl.replace("untuklj", "");
        var tempattombol = document.getElementById("untuklj" + inidEl);
        var tombolsatu = document.createElement("input");
        tombolsatu.setAttribute("type", "number");
        tombolsatu.setAttribute("id", "koreksisoal_" + inidEl);
        tombolsatu.setAttribute("class", "koreksisoal");
        tombolsatu.setAttribute("onchange", `updatenilaikoreksi('${inidEl}')`);
        tempattombol.innerHTML = `Nilai Koreksi :<span id='nilaiessaykoreksi_${inidEl}'></span>`;
        tempattombol.appendChild(tombolsatu);


      }
    }
    //-----------------------------------------------------

    var tengahdulu = document.createElement("center");
    tengahdulu.setAttribute("style", "background-color:yellow");

    var inputidbaris = document.createElement("input");
    inputidbaris.setAttribute("id", "brs");
    inputidbaris.setAttribute("value", idbaris);
    inputidbaris.setAttribute("disabled", "true");
    inputidbaris.setAttribute("style", "display:block");

    var inputnilaikoreksi = document.createElement("input");
    inputnilaikoreksi.setAttribute("type", "number");
    inputnilaikoreksi.setAttribute("id", "nilaiakhiressay");
    inputnilaikoreksi.setAttribute("disabled", "true");

    var tombolkirim = document.createElement("button");
    tombolkirim.setAttribute("onclick", "siapkirimnilai()")
    tombolkirim.innerHTML = "Beri Nilai";

    let inputnilaikd = document.createElement("input")
    inputnilaikd.setAttribute("id", "nilaikdkoreksi")


    tengahdulu.appendChild(inputidbaris);
    tengahdulu.appendChild(inputnilaikd);

    // let inputt = document.createElement("input");
    // inputt.setAttribute("id",)
    tengahdulu.innerHTML += "Preview Nilai Essay : "
    tengahdulu.appendChild(inputnilaikoreksi);
    tengahdulu.appendChild(tombolkirim);





    let tombol = document.createElement("button");
    tombol.setAttribute("class", "w3-button w3-dark-grey w3-display-bottommiddle w3-margin-bottom");
    tombol.setAttribute("onclick", `printPortrait('divljkkoreksi,,,${StringTanggal(new Date())}')`);
    tombol.innerHTML = `<i class="fa fa-print" ></i > Cetak`




    //---------------------------------------------------------------
    let ob = JSON.parse(kronologijson[parseInt(idtabaktif.innerHTML)].kuncikd);
    let obnosoal = ubahjsonkuncikd(ob);
    //console.log(obnosoal)
    //console.log(obnosoal.length);
    let dibikin = Object.keys(obnosoal)
    //console.log(dibikin.length)
    for (let i = 0; i < dibikin.length; i++) {
      // console.log(dibikin[i])
      // console.log(])
      //infoloadingljk.innerHTML += `<input value="TES ${i}"/>`
      let lbl = document.createElement("label")
      let tek = document.createTextNode("No " + dibikin[i])
      lbl.appendChild(tek)
      let docinput = document.createElement("input")
      docinput.setAttribute("id", "SKOR_" + dibikin[i]);
      docinput.setAttribute("class", obnosoal[dibikin[i]]);
      docinput.setAttribute("name", "SKOR_" + dibikin[i]);
      docinput.setAttribute("value", cek["SKOR_" + dibikin[i]]);
      infoloadingljk.appendChild(lbl)
      infoloadingljk.appendChild(docinput)
    }

    docinput = document.createElement("textarea");
    //docinput.textContent = json
    docinput.setAttribute("id", "htmlljkkoreksi")
    infoloadingljk.appendChild(docinput)

    // docinput.textcontent
    // var teksarea = document.getElementById("tekshtmlnilai");
    // var isiteks = document.getElementById("borderidhasilakhirnama");
    // var teksbtoa = encodeURIComponent(isiteks.innerHTML);

    // teksarea.textContent = window.btoa(unescape(encodeURIComponent(isiteks.innerHTML)));
    infoloadingljk.after(tengahdulu)
    infoloadingljk.after(tombol)

  })



}


function updatenilaikoreksi(id) {
  let inputedit = document.getElementById("koreksisoal_" + id);
  if (inputedit.value > 100) {
    alert("Nilai Maksimum 100, dan minimum 0")
    inputedit.value = 100;
  }
  document.getElementById("SKOR_" + id).value = (inputedit.value / 100).toFixed(2);
  document.getElementById("nilaiessaykoreksi_" + id).innerHTML = inputedit.value;

  var kelasinput = document.getElementsByClassName("koreksisoal");
  var nilai = 0;
  for (i = 0; i < kelasinput.length; i++) {

    nilai += kelasinput[i].value * 1;

  }
  /// ---------------------------------------------------
  var jumlahsoalessaysebenarnya = kronologijson[parseInt(idtabaktif.innerHTML)].jumlahessay;
  var nilaiakhir = (nilai / jumlahsoalessaysebenarnya).toFixed(2);
  // document.getElementById("nilaiakhiressay").value = nilai;
  document.getElementById("nilaiakhiressay").value = nilaiakhir;
  /// ---------------------------------------------------

  document.getElementById("nilaiakhiressay").value = nilaiakhir;
  //document.getElementById("htmlljkkoreksi").textContent = divljkkoreksi.innerHTML;

  let kd = JSON.parse(kronologijson[parseInt(idtabaktif.innerHTML)].kuncikd)
  let keykd = Object.keys(kd); // MTK_3.1 , PKN_3.5
  let objnilai = {};
  for (let k = 0; k < keykd.length; k++) {
    let nomorsoal = kd[keykd[k]];
    let jumlahnomor = nomorsoal.length;
    let count = 0;
    let inkd = document.getElementsByClassName(keykd[k]);
    for (let j = 0; j < inkd.length; j++) {
      count += inkd[j].value * 1;
      //console.log(inkd[j].value)
    }

    let nilaiakhir = (count / jumlahnomor * 100).toFixed(2)
    objnilai[keykd[k]] = nilaiakhir
  }
  document.getElementById("nilaikdkoreksi").value = JSON.stringify(objnilai)


  document.getElementById("prevprevnilaikoreksi").innerHTML = `<hr> Skor Essay = <br>${nilaiakhir} <hr> Skor KD = <br> ${JSON.stringify(objnilai)}`


}

function updatenilaikoreksi2() {
  var kelasinput = document.getElementsByClassName("koreksisoal");
  var nilai = 0;
  for (i = 0; i < kelasinput.length; i++) {
    if (kelasinput[i].value > 100) {
      alert("Nilai maksimal 100");
      kelasinput[i].value = 100;
    }
    nilai += kelasinput[i].value * 1;


  }
  var jumlahsoalessaysebenarnya = kronologijson[parseInt(idtabaktif.innerHTML)].jumlahessay;
  var nilaiakhir = (nilai / jumlahsoalessaysebenarnya).toFixed(2);
  //document.getElementById("nilaiakhiressay").value = nilai;
  //document.getElementById("nilaiakhiressay").value = nilaiakhir;
}

const ubahjsonkuncikd = (ob) => {
  //let ob = JSON.parse(kronologijson[0].kuncikd);
  let key = Object.keys(ob);
  let val = Object.keys(ob).map(m => ob[m]);
  let obnew = {}
  for (i = 0; i < val.length; i++) {
    let kol = val[i]
    for (j = 0; j < kol.length; j++) {
      obnew[kol[j]] = key[i]
    }
  }
  return obnew
}


const gurumengoreksi = (bid) => {
  let indek = bid.split("<|>")[0];
  let parnama = bid.split("<|>")[1];
  let cek = nilairesponkronologi.filter(k => k.tokensiswa == parnama)[indek];
  let idbaris = cek.idbaris;
  let prefikkodeunik = cek.matericode + "_" + cek.kodeunik + "_";
  let tagihankoreksi = cek.jenistagihan;
  let namasiswakoreksi = cek.namasiswa;

  loadingljk.style.display = "block";
  infoloadingljk.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle" ></i > `;
  let divljk = document.createElement("div");
  divljk.setAttribute("id", "divljkkoreksi");
  let formljk = document.createElement("form");
  formljk.setAttribute("id", "formgurumengoreksi")
  //formljk.setAttribute("id", "formgurumengoreksi")

  $('#infoloadingljk').nextAll('button').remove();
  $('#infoloadingljk').nextAll('center').remove();
  let html_jawaban = cek.html_jawaban;
  $.getJSON(constpreviewljk + "?idmateri=" + html_jawaban + "&action=previewriwayat", function (json) {

    // infoloadingljk.innerHTML = brkline(json).teks + "<br><br><br>";
    infoloadingljk.innerHTML = ""; //brkline(json).teks + "<br><br><br>";
    infoloadingljk.appendChild(divljk)
    divljkkoreksi.innerHTML = brkline(json).teks + "<br><br><br>";
    var elEssay = document.getElementsByClassName("koleksilj")
    if (elEssay.length !== 0) {
      for (i = 0; i < elEssay.length; i++) {
        var idEl = elEssay[i].getAttribute("id");
        var inidEl = idEl.replace("untuklj", "");
        var tempattombol = document.getElementById("untuklj" + inidEl);
        var tombolsatu = document.createElement("input");
        tombolsatu.setAttribute("type", "number");
        tombolsatu.setAttribute("id", "koreksisoal_" + inidEl);
        tombolsatu.setAttribute("value", cek["SKOR_" + inidEl] * 100);
        tombolsatu.setAttribute("class", "koreksisoal");
        tombolsatu.setAttribute("onchange", `updatenilaikoreksi('${inidEl}')`);
        tempattombol.innerHTML = `Nilai Koreksi :<span id='nilaiessaykoreksi_${inidEl}'></span>`;
        tempattombol.appendChild(tombolsatu);


      }
    }
    //-----------------------------------------------------
    infoloadingljk.appendChild(formljk);
    //dibikin fildseet
    let fieldsett = document.createElement("fieldset")
    fieldsett.setAttribute("style", "display:none");
    fieldsett.setAttribute("id", "kirimanedit");
    formgurumengoreksi.appendChild(fieldsett)

    let ob = JSON.parse(kronologijson[parseInt(idtabaktif.innerHTML)].kuncikd);
    let obnosoal = ubahjsonkuncikd(ob);
    //console.log(obnosoal)
    //console.log(obnosoal.length);
    let dibikin = Object.keys(obnosoal)
    //console.log(dibikin.length)
    for (let i = 0; i < dibikin.length; i++) {
      // console.log(dibikin[i])
      // console.log(])
      //infoloadingljk.innerHTML += `<input value="TES ${i}"/>`
      let lbl = document.createElement("label")
      lbl.setAttribute("for", "SKOR_" + dibikin[i]);
      let tek = document.createTextNode("No " + dibikin[i])
      lbl.appendChild(tek)
      let docinput = document.createElement("input")
      docinput.setAttribute("id", "SKOR_" + dibikin[i]);
      docinput.setAttribute("class", obnosoal[dibikin[i]]);
      docinput.setAttribute("name", "SKOR_" + dibikin[i]);
      docinput.setAttribute("value", cek["SKOR_" + dibikin[i]]);
      kirimanedit.appendChild(lbl)
      kirimanedit.appendChild(docinput)
      let gantibaris = document.createElement("br")
      kirimanedit.appendChild(gantibaris)

    }

    var tengahdulu = document.createElement("fieldset");
    tengahdulu.setAttribute("style", "background-color:yellow;display:block");
    tengahdulu.setAttribute("id", "formedittontonin");
    tengahdulu.setAttribute("class", "w3-center");

    var inputidbaris = document.createElement("input");
    inputidbaris.setAttribute("id", "brs");
    inputidbaris.setAttribute("name", "brs");
    inputidbaris.setAttribute("class", "w3-input w3-center");
    inputidbaris.setAttribute("value", idbaris);
    // inputidbaris.setAttribute("disabled", "true");

    inputidbaris.setAttribute("style", "display:block");

    var inputnilaikoreksi = document.createElement("input");
    inputnilaikoreksi.setAttribute("type", "number");
    inputnilaikoreksi.setAttribute("class", "w3-input w3-center");
    inputnilaikoreksi.setAttribute("id", "nilaiakhiressay");
    inputnilaikoreksi.setAttribute("name", "nilaiakhiressay");


    var tombolkirim = document.createElement("button");
    tombolkirim.setAttribute("onclick", "siapkirimnilai()");
    tombolkirim.setAttribute("class", "wa");
    tombolkirim.innerHTML = "Beri Nilai";

    let inputnilaikd = document.createElement("input")
    inputnilaikd.setAttribute("id", "nilaikdkoreksi");
    inputnilaikd.setAttribute("name", "nilaikd");
    inputnilaikd.setAttribute("class", "w3-input w3-center");
    // inputnilaikd.setAttribute("disabled", false);

    lbl = document.createElement("label");
    lbl.setAttribute("for", "brs")
    tek = document.createTextNode("ID LJK")
    lbl.appendChild(tek)
    kirimanedit.appendChild(lbl)
    kirimanedit.appendChild(inputidbaris);

    lbl = document.createElement("label");
    lbl.setAttribute("for", "nilaikdkoreksi")
    tek = document.createTextNode("Nilai Per KD");
    lbl.appendChild(tek);
    kirimanedit.appendChild(lbl)

    kirimanedit.appendChild(inputnilaikd);

    // let inputt = document.createElement("input");
    // inputt.setAttribute("id",)
    kirimanedit.innerHTML += "Preview Nilai Essay : "
    kirimanedit.appendChild(inputnilaikoreksi);

    tengahdulu.innerHTML += "Preview Nilai Essay : "
    let sp = document.createElement("span");
    sp.setAttribute("id", "prevprevnilaikoreksi")
    tengahdulu.appendChild(sp)

    docinput = document.createElement("textarea");
    //docinput.textContent = json
    docinput.setAttribute("id", "htmlljkkoreksi")
    docinput.setAttribute("name", "htmlljkkoreksi")
    // formgurumengoreksi.appendChild(docinput)

    //     formgurumengoreksi.appendChild(tengahdulu)
    kirimanedit.appendChild(docinput)

    let inputprefik = document.createElement("input");
    inputprefik.setAttribute("id", "prefikkodeunik");
    inputprefik.setAttribute("name", "prefikkodeunik");
    inputprefik.setAttribute("value", prefikkodeunik);

    kirimanedit.appendChild(inputprefik)

    inputprefik = document.createElement("input");
    inputprefik.setAttribute("id", "jenistagihankoreksi");
    inputprefik.setAttribute("name", "jenistagihankoreksi");
    inputprefik.setAttribute("value", tagihankoreksi);
    kirimanedit.appendChild(inputprefik)

    inputprefik = document.createElement("input");
    inputprefik.setAttribute("id", "jenjangkoreksi");
    inputprefik.setAttribute("name", "jenjangkoreksi");
    inputprefik.setAttribute("value", idJenjang);
    kirimanedit.appendChild(inputprefik)

    inputprefik = document.createElement("input");
    inputprefik.setAttribute("id", "kelaskoreksi");
    inputprefik.setAttribute("name", "kelaskoreksi");
    inputprefik.setAttribute("value", idNamaKelas);
    kirimanedit.appendChild(inputprefik)
    inputprefik = document.createElement("input");
    inputprefik.setAttribute("id", "namasiswakoreksi");
    inputprefik.setAttribute("name", "namasiswakoreksi");
    inputprefik.setAttribute("value", namasiswakoreksi);
    kirimanedit.appendChild(inputprefik)


    formgurumengoreksi.appendChild(tengahdulu)
    formgurumengoreksi.after(tombolkirim);




    let tombol = document.createElement("button");
    tombol.setAttribute("class", "w3-button w3-dark-grey w3-display-bottommiddle w3-margin-bottom");
    tombol.setAttribute("onclick", `printPortrait('divljkkoreksi,,,${StringTanggal(new Date())}')`);
    tombol.innerHTML = `<i class="fa fa-print" ></i > Cetak`




    //---------------------------------------------------------------


    // docinput.textcontent
    // var teksarea = document.getElementById("tekshtmlnilai");
    // var isiteks = document.getElementById("borderidhasilakhirnama");
    // var teksbtoa = encodeURIComponent(isiteks.innerHTML);

    // teksarea.textContent = window.btoa(unescape(encodeURIComponent(isiteks.innerHTML)));

    infoloadingljk.after(tombol)

  })



}

const siapkirimnilai = () => {



  let hapusinput = document.querySelectorAll(".koreksisoal")

  for (let i = 0; i < hapusinput.length; i++) {
    let id = hapusinput[i].getAttribute("id").replace("koreksisoal_", ""); //i + 1;
    let inputedit = document.getElementById("koreksisoal_" + id);
    document.getElementById("nilaiessaykoreksi_" + id).innerHTML = inputedit.value;



    hapusinput[i].remove();
  }
  //jaga-jaga jika ada LJK yang mau dikoreksi ulang
  let ttdkoreksi = document.querySelectorAll(".ttdkoreksi")
  for (let i = 0; i < ttdkoreksi.length; i++) {
    ttdkoreksi[i].remove();
  }


  // console.log(hapusinput.length)
  let isidiv = document.getElementById("divljkkoreksi")
  let htmlisidiv = isidiv.innerHTML;

  let nilaikd = JSON.parse(document.querySelector("#nilaikdkoreksi").value);

  let mapelnya = Object.keys(nilaikd)

  let teks = "";
  teks = `<table class="versi-table ttdkoreksi" style="margin:0 auto">
  <tr>
    <th colspan="2">Data Nilai</th>
    </tr><tr>
    <th>Mapel & KD</th>
    <th>Nilai</th>
  </tr>`
  for (let i = 0; i < mapelnya.length; i++) {
    teks += `<tr>
    <td>
      ${mapelnya[i].split("_")[0]}<br>
      KD ${mapelnya[i].split("_")[1]}
    </td>
    <td>
      ${nilaikd[mapelnya[i]]}
      </td>
    </tr>`
  }
  teks += `</table>`

  htmlisidiv += teks;
  let teksinner = `<div class="ttdkoreksi w3-card-4 w3-aqua w3-center w3-padding">
  Essay telah dikoreksi oleh = <br>${namauser}<br>
  Pada tanggal = <br>${tanggalfulllengkap(new Date())}
  </div>
  `
  htmlisidiv += teksinner;

  // htmlljkkoreksi.textContent = htmlisidiv;
  htmlljkkoreksi.textContent = window.btoa(unescape(encodeURIComponent(htmlisidiv)));
  let akseskoreksi = koreksidarimana.innerHTML;
  let idakseskoreksi = akseskoreksi.split("_")[0];
  let iddarimana = akseskoreksi.split("_")[1]

  let namaform = document.querySelector("#formgurumengoreksi")
  let dataform = new FormData(namaform)
  fetch(constlinknilai + "?action=koreksianguru", {
      method: "post",
      body: dataform
    }).then(m => m.json())
    .then(f => {
      //console.log(f);
      document.querySelector("#infoloadingljk").innerHTML = `<h3 class="w3-center">${f.result}</h3>`;
      if (iddarimana == "hariini") {
        getdaftarnilai(idakseskoreksi)
      } else(
        daftarnilaikronologi(idakseskoreksi)

      )

      //setTimeout(tutuploadingljk(), 5000)


    })
    .catch(er => console.log(er))
  document.querySelector("#infoloadingljk").innerHTML = `<i class="fa fa-spin fa-refresh w3-center w3-xxxlarge"></i>`

}




const bantusiswaisiljk = (param) => {

  let params = param.split("_");
  let par = params[1]; //indek materi kbm
  parameterbantuisiljk = par;
  let idsw = params[0]; //indek id siswa

  //alert (par);
  let siswabantu = JSON.parse(localStorage.getItem("datasiswa_" + idNamaKelas))["datasiswa"][idsw];

  loadingljk.style.display = "block";

  //bikin judul h4
  let datamateri = kronologijson;
  kodebarismateriyangdikerjakan = datamateri[par].idbaris;
  let adapg = (datamateri[par].jumlahpg == 0) ? false : true;

  let jumlahsoal = (datamateri[par].jumlahpg * 1) + (datamateri[par].jumlahessay * 1);

  //console.log(datamateri)
  var judul = document.createElement("h4")
  judul.setAttribute("class", "w3-center");
  judul.innerHTML = "Identitas e-Lamaso";

  let tes = document.getElementById("infoloadingljk");
  // tes.innerHTML = `<i class="fa fa-spin fa-refresh w3-xxxlarge"></i> On Process ...`
  tes.innerHTML = "";

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
  td.innerHTML = siswabantu.pd_nama;
  var tr = tabelidentitas.insertRow(-1);
  var td = tr.insertCell(-1);
  td.innerHTML = "Kelas"
  var td = tr.insertCell(-1);
  td.innerHTML = idNamaKelas;
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

  tes.appendChild(tabelidentitas);



  let formljkbantu = document.createElement("form")
  formljkbantu.setAttribute("id", "ljkbantu")
  formljkbantu.setAttribute("class", "w3-hide")






  $.getJSON(constpreviewljk + "?idmateri=" + datamateri[par].idmateri + "&action=previewriwayat", function (json) {

    document.querySelector("#infoloadingljk").innerHTML += brkline(json).teks;


    //console.log(kuncijawabanku)
    var elEssay = document.getElementsByClassName("soalessay")
    if (elEssay.length !== 0) {
      for (i = 0; i < elEssay.length; i++) {
        var idEl = elEssay[i].getAttribute("id");
        var inidEl = idEl.replace("essay", "");
        var tempattombol = document.getElementById("tomboljawaban" + inidEl);
        var tombolsatu = document.createElement("button");
        tombolsatu.setAttribute("onclick", "tombolketikjawaban2('" + inidEl + "_" + idsw + "')");
        var tekstombolsatu = document.createTextNode("Ketik Jawaban No " + inidEl);
        tombolsatu.appendChild(tekstombolsatu);
        tempattombol.appendChild(tombolsatu);
        tempattombol.innerHTML += "<br/><sub>atau</sub></br/> "
        var tomboldua = document.createElement("button");
        tomboldua.setAttribute("onclick", "tomboluploadjawaban2('" + inidEl + "_" + idsw + "')");
        var tekstomboldua = document.createTextNode("Upload Jawaban No " + inidEl);
        tomboldua.appendChild(tekstomboldua);
        tempattombol.appendChild(tomboldua);
        tempattombol.innerHTML += "<br/><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>"

      }
    }
    //})
    //idkelas	idmapel	namasiswa crtToken	jenistagihan	kodeunik		nilaikd	html_jawaban	emailguru
    document.querySelector("#infoloadingljk").appendChild(formljkbantu);
    let identitasljkbantu = document.createElement("input")
    identitasljkbantu.setAttribute("id", "idkelas")
    identitasljkbantu.setAttribute("name", "idkelas")
    identitasljkbantu.setAttribute("value", idNamaKelas);
    document.getElementById("ljkbantu").appendChild(identitasljkbantu);

    identitasljkbantu = document.createElement("input")
    identitasljkbantu.setAttribute("tokensiswa", "tokensiswa")
    identitasljkbantu.setAttribute("name", "tokensiswa")
    identitasljkbantu.setAttribute("value", siswabantu.id);
    document.getElementById("ljkbantu").appendChild(identitasljkbantu);

    identitasljkbantu = document.createElement("input")
    identitasljkbantu.setAttribute("id", "idmapel")
    identitasljkbantu.setAttribute("name", "idmapel")
    identitasljkbantu.setAttribute("value", datamateri[par].idmapel);
    document.getElementById("ljkbantu").appendChild(identitasljkbantu);

    identitasljkbantu = document.createElement("input")
    identitasljkbantu.setAttribute("id", "crtToken")
    identitasljkbantu.setAttribute("name", "crtToken")
    identitasljkbantu.setAttribute("value", datamateri[par].crtToken);
    document.getElementById("ljkbantu").appendChild(identitasljkbantu);

    identitasljkbantu = document.createElement("input")
    identitasljkbantu.setAttribute("id", "jenistagihan")
    identitasljkbantu.setAttribute("name", "jenistagihan")
    identitasljkbantu.setAttribute("value", datamateri[par].jenistagihan);
    document.getElementById("ljkbantu").appendChild(identitasljkbantu);

    identitasljkbantu = document.createElement("input")
    identitasljkbantu.setAttribute("id", "kodeunik")
    identitasljkbantu.setAttribute("name", "kodeunik")
    identitasljkbantu.setAttribute("value", datamateri[par].jenistagihan + "_" + datamateri[par].crtToken);
    document.getElementById("ljkbantu").appendChild(identitasljkbantu);

    identitasljkbantu = document.createElement("textarea")
    identitasljkbantu.setAttribute("id", "buathtmlbantu")
    identitasljkbantu.setAttribute("name", "tekshtmlnilai")
    identitasljkbantu.setAttribute("value", "buathtmlbantu");
    document.getElementById("ljkbantu").appendChild(identitasljkbantu);

    identitasljkbantu = document.createElement("input")
    identitasljkbantu.setAttribute("id", "nilaikd")
    identitasljkbantu.setAttribute("name", "nilaikd")
    identitasljkbantu.setAttribute("value", "Nilai KD Otomatis");
    document.getElementById("ljkbantu").appendChild(identitasljkbantu);

    //idtoken	idsekolah	nilaiPG	idbaris	nilaiEssay	matericode
    identitasljkbantu = document.createElement("input")
    identitasljkbantu.setAttribute("id", "idtoken")
    identitasljkbantu.setAttribute("name", "idtoken")
    identitasljkbantu.setAttribute("value", datamateri[par].idtoken);
    document.getElementById("ljkbantu").appendChild(identitasljkbantu);

    identitasljkbantu = document.createElement("input")
    identitasljkbantu.setAttribute("id", "idsekolah")
    identitasljkbantu.setAttribute("name", "idsekolah")
    identitasljkbantu.setAttribute("value", idNamaSekolah);
    document.getElementById("ljkbantu").appendChild(identitasljkbantu);

    identitasljkbantu = document.createElement("input")
    identitasljkbantu.setAttribute("id", "nilaiPG")
    identitasljkbantu.setAttribute("name", "nilaiPG")
    // identitasljkbantu.setAttribute("value", "Nilai PG ");
    document.getElementById("ljkbantu").appendChild(identitasljkbantu);


    identitasljkbantu = document.createElement("input")
    identitasljkbantu.setAttribute("id", "nilaiEssay")
    identitasljkbantu.setAttribute("name", "nilaiEssay")
    // identitasljkbantu.setAttribute("value", "nilaiEssay");
    document.getElementById("ljkbantu").appendChild(identitasljkbantu);

    identitasljkbantu = document.createElement("input")
    identitasljkbantu.setAttribute("id", "matericode")
    identitasljkbantu.setAttribute("name", "matericode")
    identitasljkbantu.setAttribute("value", datamateri[par].idbaris);
    document.getElementById("ljkbantu").appendChild(identitasljkbantu);


    identitasljkbantu = document.createElement("input")
    identitasljkbantu.setAttribute("id", "namasiswa")
    identitasljkbantu.setAttribute("name", "namasiswa")
    identitasljkbantu.setAttribute("value", siswabantu.pd_nama);
    document.getElementById("ljkbantu").appendChild(identitasljkbantu);

    identitasljkbantu = document.createElement("div")
    identitasljkbantu.setAttribute("id", "inputpgdanskor")
    identitasljkbantu.innerHTML = "tempat PG dan Skor:<hr>"
    document.getElementById("ljkbantu").appendChild(identitasljkbantu);

    //---nosoalpada skor, dan PG_1
    let obnosoal = JSON.parse(datamateri[par].kuncikd)
    let ob = ubahjsonkuncikd(obnosoal)
    let dibikin = Object.keys(ob);
    for (let i = 0; i < dibikin.length; i++) {
      let lbl = document.createElement("label")
      lbl.setAttribute("for", "SKOR_" + dibikin[i]);
      let tek = document.createTextNode("No " + dibikin[i])
      lbl.appendChild(tek)
      let docinput = document.createElement("input")
      docinput.setAttribute("id", "SKOR_" + dibikin[i]);
      docinput.setAttribute("class", "hitungskor");
      docinput.setAttribute("name", "SKOR_" + dibikin[i]);
      docinput.setAttribute("value", "");
      inputpgdanskor.appendChild(lbl);
      let br = document.createElement("br")
      inputpgdanskor.appendChild(br)
      inputpgdanskor.appendChild(docinput);
      br = document.createElement("br")
      inputpgdanskor.appendChild(br)
    }

    let nopg = datamateri[par].jumlahpg;
    for (let j = 0; j < nopg; j++) {
      lbl = document.createElement("label")
      lbl.setAttribute("for", "PG_" + (j + 1));
      let tek = document.createTextNode("No PG " + (j + 1))
      lbl.appendChild(tek)
      docinput = document.createElement("input")
      docinput.setAttribute("id", "PG_" + (j + 1));
      docinput.setAttribute("class", "hitungpg");
      docinput.setAttribute("name", "PG_" + (j + 1));
      docinput.setAttribute("value", "");
      inputpgdanskor.appendChild(lbl);
      let br = document.createElement("br")
      inputpgdanskor.appendChild(br)
      inputpgdanskor.appendChild(docinput);
      br = document.createElement("br")
      inputpgdanskor.appendChild(br)
    }


    identitasljkbantu = document.createElement("div")
    identitasljkbantu.setAttribute("id", "previewljkbantu")
    identitasljkbantu.setAttribute("class", "w3-card-4 w3-padding")
    identitasljkbantu.setAttribute("style", "display:none")
    identitasljkbantu.innerHTML = "previewljkbantu"
    document.getElementById("ljkbantu").after(identitasljkbantu);

    // identitasljkbantu = document.createElement("button")
    // identitasljkbantu.setAttribute("onclick", "cekljk()")
    // identitasljkbantu.setAttribute("class", "w3-button w3-card-4 w3-blue")
    // identitasljkbantu.innerHTML = "Preview LJK"
    // document.getElementById("ljkbantu").after(identitasljkbantu);

    previewljkbantu.innerHTML = buathtmlljk(adapg);
    selwaktumulai.innerHTML = tanggalfulllengkap(new Date());

    hasilakhirnamasiswa.innerHTML = siswabantu.pd_nama;
    hasilakhirmapeltema.innerHTML = datamateri[par].idmapel.toUpperCase();

    let kuncijawabanku = "";
    if (adapg) {
      kuncijawabanku = brkline(json).kunci;
      document.querySelector("#infoloadingljk").innerHTML += `<button class="wa" onclick="hasilakhirelamasopg('${kuncijawabanku}')">Selesai</button>`

    } else {
      document.querySelector("#infoloadingljk").innerHTML += `<button class="wa" onclick="hasilakhirelamaso('${par}')">Selesai</button>`

    }


  })


}

const cekljk = () => {
  var x = document.getElementById("previewljkbantu");
  if (x.style.display === "none") {
    x.style.display = "block";

  } else {
    x.style.display = "none";
  }
}

function PGBenar(opsi, kuncijawaban) { // kebalik, hahahaha
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

function pgskor(opsik, kuncijawaban) { // kebalik, hahahaha
  var benarsalah;
  let opsi = opsik.split(",");
  let benar = opsi.filter(f => f == kuncijawaban);
  // let benar = kuncijawaban.filter(f => f == opsi);
  if (benar.length == 1) {
    benarsalah = 1;
  } else {
    benarsalah = 0;
  }
  // if (opsi.indexOf(kuncijawaban) > -1) {
  //     benarsalah = "Benar"
  // } else {
  //     benarsalah = "Salah"
  // }
  // return benarsalah
  return benarsalah
}


const hasilakhirelamaso = (par) => {
  hasilakhirwaktu.innerHTML = tanggalfulllengkap(new Date());
  let koleksiceklis = []
  let datakuncikd = JSON.parse(kronologijson[parameterbantuisiljk].kuncikd); //JSON.parse(localStorage.getItem("kuncikd"))
  let keyarray = Object.keys(datakuncikd);
  let obj = {};
  for (l = 0; l < keyarray.length; l++) {
    let valu = datakuncikd[keyarray[l]]; // [1, 2, 3, 4, dst]
    let valulengt = valu.length; // [banyaknya array di atas]
    let coun = 0;
    for (z = 0; z < valu.length; z++) { // nomor soal pada kunciKD 
      for (m = 0; m < koleksiceklis.length; m++) { //jawaban siswa 1A, 2B

        var skor = (PGBenar(arrkunci, koleksiceklis[m]) == "Benar") ? 1 : 0;
        if (parseInt(valu[z]) == parseInt(koleksiceklis[m])) {
          coun += skor
        }

      }
    }
    let nilaikd = (coun / valulengt * 100).toFixed(2);

    obj[keyarray[l]] = nilaikd


  }

  nilaikd.value = JSON.stringify(obj)
  // tempatinputpilihanganda.innerHTML += "Nilai KD  <input type='text' name='nilaikd' value='" + JSON.stringify(obj) + "'/><br/>"



  // var resulthasilessay = "JAWABAN ESSAY:<br/>";;
  var resulthasilessay = (kronologijson[parameterbantuisiljk].jumlahessay == 0) ? "" : "JAWABAN ESSAY:<br/>";;

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
        resulthasilessay += "<ol style='list-style-type:decimal' start='" + noessay + "'><li><b style='color:blue'>Pertanyaan:</b>:<br/>";
        resulthasilessay += document.getElementById("pertanyaanessay_" + noessay).innerHTML + "<hr style='border-top:1px solid black'/><b style='color:blue'>Jawaban:</b>:<br/>";

        resulthasilessay += elFilejawaban[c].outerHTML;
        resulthasilessay += "<div id='untuklj" + noessay + "' class='koleksilj' style='border:1px solid red;padding:5px;background-color:#eeeeff'>Nilai</div>";
        resulthasilessay += "</li></ol>";

      }
    }

  }
  resumenilaiskhir.innerHTML = resulthasilessay;


  buathtmlbantu.textContent = window.btoa(unescape(encodeURIComponent(previewljkbantu.innerHTML)));
  let iddarimana = (koreksidarimana.innerHTML).split("_")[1];
  let idakseskoreksi = (koreksidarimana.innerHTML).split("_")[0];
  let namaform = document.getElementById("ljkbantu")
  let dataform = new FormData(namaform);
  fetch(constlinknilai + "?action=gurukirimnilai", {
      method: 'post',
      body: dataform
    })
    .then(u => u.json())
    .then(q => {
      document.getElementById("infoloadingljk").innerHTML = q.result;
      if (iddarimana == "hariini") {
        getdaftarnilai(idakseskoreksi)
      } else(
        daftarnilaikronologi(idakseskoreksi)

      )

    })
    .catch(er => console.log(er))
  document.getElementById("infoloadingljk").innerHTML = `<i class="fa fa-spin fa-refresh w3-xxlarge" style="margin:0 auto"></i> proses kirim ....`;
}

const hasilakhirelamasopg = (par) => {
  hasilakhirwaktu.innerHTML = tanggalfulllengkap(new Date());

  let kuncijawaban = window.atob(par);

  let arrkunci = kuncijawaban.split(",")

  tabelpgbantu.innerHTML = ""
  let tr = tabelpgbantu.insertRow(0);
  let th = document.createElement("th");
  th.innerHTML = "Jawaban";
  tr.appendChild(th);
  th = document.createElement("th")
  th.innerHTML = "Kunci"
  tr.appendChild(th)
  th = document.createElement("th")
  th.innerHTML = "Nilai"
  tr.appendChild(th)

  let benarsalah = "";
  let skorpg = 0;
  let opsipg = document.getElementsByClassName("calc");
  let koleksiceklis = []
  for (let i = 0; i < opsipg.length; i++) {
    if (opsipg[i].checked) {
      let idpg = opsipg[i].getAttribute("id");
      let nosoalinput = idpg.match(/(\d+)/)[0] // mengembalikan angkanya aja
      benarsalah = PGBenar(arrkunci, idpg);
      document.getElementById("PG_" + nosoalinput).value = idpg.replace(nosoalinput, "");
      document.getElementById("SKOR_" + nosoalinput).value = pgskor(kuncijawaban, idpg);
      tr = tabelpgbantu.insertRow(-1)
      let sel = tr.insertCell(-1);
      sel.innerHTML = idpg;
      sel = tr.insertCell(-1);
      sel.innerHTML = arrkunci[nosoalinput - 1];
      sel = tr.insertCell(-1);
      sel.innerHTML = benarsalah;

      if (benarsalah == "Benar") {
        skorpg++
      }
      koleksiceklis.push(idpg)
    }
  }

  let jumlahpg = kronologijson[parameterbantuisiljk].jumlahpg;
  nilaiPG.value = ((skorpg / jumlahpg) * 100).toFixed(2)

  tr = tabelpgbantu.insertRow(-1);
  sel = tr.insertCell(-1);
  sel.setAttribute("colspan", 2)
  sel.innerHTML = "SKOR PG";
  sel = tr.insertCell(-1);
  sel.innerHTML = ((skorpg / jumlahpg) * 100).toFixed(2);

  let inputskor = document.querySelectorAll(".hitungskor");
  // let datakuncikd = JSON.parse(kronologijson[parameterbantuisiljk].kuncikd)
  // let keyarray = Object.keys(datakuncikd);
  // let obj = {}
  // for (let m = 0; m < keyarray.length; m++) {

  //   for (let k = 0; k < inputskor.length; k++) {

  //   }
  // }

  let datakuncikd = JSON.parse(kronologijson[parameterbantuisiljk].kuncikd); //JSON.parse(localStorage.getItem("kuncikd"))
  let keyarray = Object.keys(datakuncikd);
  let obj = {};
  for (l = 0; l < keyarray.length; l++) {
    let valu = datakuncikd[keyarray[l]]; // [1, 2, 3, 4, dst]
    let valulengt = valu.length; // [banyaknya array di atas]
    let coun = 0;
    for (z = 0; z < valu.length; z++) { // nomor soal pada kunciKD 
      for (m = 0; m < koleksiceklis.length; m++) { //jawaban siswa 1A, 2B

        var skor = (PGBenar(arrkunci, koleksiceklis[m]) == "Benar") ? 1 : 0;
        if (parseInt(valu[z]) == parseInt(koleksiceklis[m])) {
          coun += skor
        }

      }
    }
    let nilaikd = (coun / valulengt * 100).toFixed(2);

    obj[keyarray[l]] = nilaikd


  }

  nilaikd.value = JSON.stringify(obj)
  // tempatinputpilihanganda.innerHTML += "Nilai KD  <input type='text' name='nilaikd' value='" + JSON.stringify(obj) + "'/><br/>"



  // var resulthasilessay = "JAWABAN ESSAY:<br/>";;
  var resulthasilessay = (kronologijson[parameterbantuisiljk].jumlahessay == 0) ? "" : "JAWABAN ESSAY:<br/>";;

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
        resulthasilessay += "<ol style='list-style-type:decimal' start='" + noessay + "'><li><b style='color:blue'>Pertanyaan:</b>:<br/>";
        resulthasilessay += document.getElementById("pertanyaanessay_" + noessay).innerHTML + "<hr style='border-top:1px solid black'/><b style='color:blue'>Jawaban:</b>:<br/>";

        resulthasilessay += elFilejawaban[c].outerHTML;
        resulthasilessay += "<div id='untuklj" + noessay + "' class='koleksilj' style='border:1px solid red;padding:5px;background-color:#eeeeff'>Nilai</div>";
        resulthasilessay += "</li></ol>";

      }
    }

  }
  resumenilaiskhir.innerHTML = resulthasilessay;

  buathtmlbantu.textContent = window.btoa(unescape(encodeURIComponent(previewljkbantu.innerHTML)));
  let iddarimana = (koreksidarimana.innerHTML).split("_")[1];
  let idakseskoreksi = (koreksidarimana.innerHTML).split("_")[0];
  let namaform = document.getElementById("ljkbantu")
  let dataform = new FormData(namaform);
  document.getElementById("infoloadingljk").innerHTML = `<i class="fa fa-spin fa-refresh w3-xxlarge" style="margin:0 auto"></i> proses kirim ....`;
  fetch(constlinknilai + "?action=gurukirimnilai", {
      method: 'post',
      body: dataform
    })
    .then(u => u.json())
    .then(q => {
      document.getElementById("infoloadingljk").innerHTML = q.result;
      if (iddarimana == "hariini") {
        getdaftarnilai(idakseskoreksi)
      } else(
        daftarnilaikronologi(idakseskoreksi)

      )

    })
    .catch(er => {
      console.log(er);
      document.getElementById("infoloadingljk").innerHTML = "terjadi kesalahan " + er;
    })
}

const hapusljk = (idbaris) => {
  let konfirmasihapus = confirm("Anda yakin ingin menghapusnya? \n \n Klik Ok untuk menghapus. \n \n Klik CANCEL untuk membatalkan");
  if (!konfirmasihapus) {
    return
  }

  let cekcrtToken = kronologijson.filter(k => k.idbaris = idbaris)
  alert("pengen hapus data baris ke-" + idbaris + " di SS jenjang kelas " + idJenjang + " dan ini crtTokennya " + cekcrtToken[0].crtToken)
  let idok = cekcrtToken[0].crtToken;
  let dataform = new FormData();
  dataform.append("idbaris", idbaris);
  dataform.append("idok", idok);
  fetch(constlinknilai + "?action=hapusljk", {
      method: 'post',
      body: dataform
    }).then(m => m.json())
    .then(f => {
      alert(f.result);
      refreshdatakdkd();
    })
    .catch(er => alert(er))

}

const refreshdatakdkd = () => {
  let iddarimana = (koreksidarimana.innerHTML).split("_")[1];
  let idakseskoreksi = (koreksidarimana.innerHTML).split("_")[0];
  if (iddarimana == "hariini") {
    getdaftarnilai(idakseskoreksi)
  } else(
    daftarnilaikronologi(idakseskoreksi)

  )
}

const buathtmlljk = (adapg) => {
  let tekshtml = "";
  if (adapg) {
    tekshtml = `<center>
    <img src="https://1.bp.blogspot.com/-6sOgNpeDql8/X_3gwIOMYOI/AAAAAAAAUOk/nKeuB6Z-X7siR2bJfMrOEca38zx0PWmXQCLcBGAsYHQ/s0/lamaso.png" class="w3-circle" style="width:145px;border:2px dotted red">
    <h3>Nilai Belajar</h3>

    <table class="versi-table" id="tabelku">
        <tbody><tr>
            <td>Sekolah </td>
            <td id="hasilakhirnamasekolah">${idNamaSekolah}</td>
        </tr>
        <tr>
            <td>Nama </td>
            <td id="hasilakhirnamasiswa"><i class="fa fa-spin fa-refresh"></i></td>
        </tr>
        <tr>
            <td>Kelas </td>
            <td id="hasilakhirkelas">${idNamaKelas}</td>
        </tr>
        <tr>
            <td>Mapel/Tema </td>
            <td id="hasilakhirmapeltema"><i class="fa fa-spin fa-refresh"></i></td>
        </tr>
        <tr><td>Waktu Mulai <br><sub class='w3-text-red'>oleh Guru</sub></td><td id="selwaktumulai"><i class="fa fa-spin fa-refresh"></i></td></tr><tr>
            <td>Waktu Selesai <br><sub class='w3-text-red'>oleh Guru</sub></td>
            <td id="hasilakhirwaktu"><i class="fa fa-spin fa-refresh"></i></td>
        </tr>
    </tbody></table>
  </center>
  <div id="resumenilai" style="display:block">
    PILIHAN GANDA:
      <table class="versi-table" id="tabelpgbantu">
        <tbody>
          <tr>
            <td>Jawaban</td>
            <td>Kunci:</td>
            <td>Nilai</td>
          </tr>
         
        </tbody>
      </table>
    </div>
    <div id="resumenilaiskhir"></div>
  `;

  } else {
    tekshtml = `<center>
    <img src="https://1.bp.blogspot.com/-6sOgNpeDql8/X_3gwIOMYOI/AAAAAAAAUOk/nKeuB6Z-X7siR2bJfMrOEca38zx0PWmXQCLcBGAsYHQ/s0/lamaso.png" class="w3-circle" style="width:145px;border:2px dotted red">
    <h3>Nilai Belajar</h3>

    <table class="versi-table" id="tabelku">
        <tbody><tr>
            <td>Sekolah </td>
            <td id="hasilakhirnamasekolah">${idNamaSekolah}</td>
        </tr>
        <tr>
            <td>Nama </td>
            <td id="hasilakhirnamasiswa"><i class="fa fa-spin fa-refresh"></i></td>
        </tr>
        <tr>
            <td>Kelas </td>
            <td id="hasilakhirkelas">${idNamaKelas}</td>
        </tr>
        <tr>
            <td>Mapel/Tema </td>
            <td id="hasilakhirmapeltema"><i class="fa fa-spin fa-refresh"></i></td>
        </tr>
        <tr><td>Waktu Mulai <br><sub class='w3-text-red'>oleh Guru</sub></td><td id="selwaktumulai"><i class="fa fa-spin fa-refresh"></i></td></tr><tr>
            <td>Waktu Selesai <br><sub class='w3-text-red'>oleh Guru</sub></td>
            <td id="hasilakhirwaktu"><i class="fa fa-spin fa-refresh"></i></td>
        </tr>
    </tbody></table>
  </center>
  <div id="resumenilai" style="display:block">
  </div>
    <div id="resumenilaiskhir"></div>
  `;
  }

  return tekshtml
}

function tombolketikjawaban2(idpar) {
  let id = idpar.split("_")[0];
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
  tombollain.setAttribute("onclick", "tomboluploadjawaban2('" + idpar + "')");
  tombollain.innerHTML = "Upload Jawaban No " + id
  tempatnya.appendChild(tombollain);
  tempatnya.innerHTML += "<sub> dengan memilih cara lain, jawaban yang sudah diketik akan hilang dan diganti dengan jawaban berupa gambar/media yang diunggah</sub>"


}

function tomboluploadjawaban2(idpar) {
  //alert("Tombol Upload Jawbaan No " + id)
  //console.log(idpar)
  let id = idpar.split("_")[0]
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
  katajadi += "<img src='https://1.bp.blogspot.com/-q57d59JTX8g/Xa-kAy6T0XI/AAAAAAAAOSo/seM01RU3Q_Q7BvLm73wC09BBsQMs05pYACLcBGAsYHQ/s320/LOGO%2BLAMASO.png'  style='width:145px;margin:auto;border:1px solid blue'/>";
  katajadi += "</div>";

  katajadi += `<input type='file' id='iduploadpotoessay${id}' onchange='uploadpotoessay("${idpar}")' style='display:none'/>"`
  katajadi += "</div>";
  //-----------------------------
  katajadi += "<br/>Ganti dengan mengetik jawaban:";
  katajadi += `<button onclick='tombolketikjawaban2("${idpar}")'>Ketik Jawaban No. ${id}</button>`; //"<button onclick='tombolketikjawaban(" + id + ")'>Ketik Jawaban No. " + id + "</button>";

  // katajadi += "<button onclick='tombolketikjawaban2(" + idpar + ")'>Ketik Jawaban No. " + id + "</button>";
  katajadi += "<sub> dengan memilih cara lain, jawaban yang sudah  diupload akan hilang dan diganti dengan jawaban berupa ketikan/tulisan</sub>"
  //-----------------------------
  tempatnya.innerHTML = katajadi;
}


const simpancatatansementara = () => {
  let isiteks = document.formuploadmateri.idmateri.value
  if (isiteks == "") {
    alert("Maaf, Draft Anda kosong .... :(");
    return
  }
  let idmapel = document.formuploadmateri.idmapel.value;
  let iddurasi = document.formuploadmateri.iddurasi.value;
  let idaksessiswa = document.formuploadmateri.idaksessiswa.value;
  let jenistagihan = document.formuploadmateri.jenistagihan.value;
  let idtgl = document.formuploadmateri.idtgl.value;
  let idtglend = document.formuploadmateri.idtglend.value;
  let botakin = window.btoa(unescape(encodeURIComponent(isiteks)));
  let obj = {};
  obj.idmapel = idmapel;
  obj.iddurasi = iddurasi;
  obj.jenistagihan = jenistagihan;
  obj.idaksessiswa = idaksessiswa;
  obj.idtgl = idtgl;
  obj.idtglend = idtglend;
  obj.botakin = botakin;



  window.localStorage.setItem("drafmateri", JSON.stringify(obj));
  let ingindownload = confirm("Apakah Anda ingin mendownload materi ini juga?");
  if (ingindownload) {
    downloadfiledraft(isiteks, idmapel);

    alert("Draf, berhasil disimpan dan File telah Anda unduh");
  } else {
    alert("Draf, berhasil disimpan dan File tidak Anda unduh");

  }
}

const taruhcatatansementara = () => {
  let idmapel = document.formuploadmateri.idmapel;
  let iddurasi = document.formuploadmateri.iddurasi;
  let idaksessiswa = document.formuploadmateri.idaksessiswa;
  let jenistagihan = document.formuploadmateri.jenistagihan;
  let idtgl = document.formuploadmateri.idtgl;
  let idtglend = document.formuploadmateri.idtglend;

  let isiteks = document.formuploadmateri.idmateri

  if (localStorage.hasOwnProperty("drafmateri")) {
    let teks = JSON.parse(localStorage.getItem("drafmateri"))
    idmapel.value = teks.idmapel;
    iddurasi.value = teks.iddurasi;
    idaksessiswa.value = teks.idaksessiswa;
    jenistagihan.value = teks.jenistagihan;
    idtgl.value = teks.idtgl;
    idtglend.value = teks.idtglend;
    let botakin = teks.botakin;
    //console.log(botakin);
    isiteks.value = window.atob(unescape(encodeURIComponent(botakin)));
    //isiteks.textContent = window.atob(botakin);
    alert("Anda mempunyai Draft")
  } else {
    alert("Maaf, Anda tidak memiliki Draft.")



  }
  return true
}

const editfilemateri = (id) => {
  let file = kronologijson[id]; //.idmateri;
  let idbaris = file.idbaris;
  let time = new Date(file.idtgl).getTime()
  let now = new Date().getTime()
  if (now > time) {
    alert("Perhatian! Materi ini sedang/Sudah/Telah lewat dipublikasikan saat ini. Mungkin saja siswa Anda sudah mengirimkan pekejaannya dari materi ini. Jika mengedit alokasi waktu awal Anda akan kehilangan data REKAP PENILAIAN yang berlangsung, dan Materi akan diganti dengan materi yang Anda Edit (overwrite). Hindari mengubah Alokasi Waktu Awal jika Alokasi awal sudah berlangsung karena Rekap Penilaian Anda tidak sinkron.");
    // return
  }
  // document.getElementsByClassName("tablinks")[2].click();
  //openCity(event, 'upload_materi')
  // lainnya tutup
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById("upload_materi").style.display = "block";

  let idmapel = document.formuploadmateri.idmapel;
  let iddurasi = document.formuploadmateri.iddurasi;
  let idaksessiswa = document.formuploadmateri.idaksessiswa;
  let jenistagihan = document.formuploadmateri.jenistagihan;
  let idtgl = document.formuploadmateri.idtgl;
  let idtglend = document.formuploadmateri.idtglend;

  let isiteks = document.formuploadmateri.idmateri;

  idmapel.value = file.idmapel;
  iddurasi.value = file.iddurasi;
  idaksessiswa.value = file.idaksessiswa;
  jenistagihan.value = file.jenistagihan;
  idtgl.value = file.idtgl;
  idtglend.value = file.idtglend;
  let botakin = file.idmateri;
  let idm = encodeURIComponent(botakin)




  tombolpublikasikan.setAttribute("onclick", `editfilematerikeserver('${idbaris}')`)
  tombolpublikasikan.removeAttribute("class"); //.wa w3-deep-purple w3-hover-aqua);
  tombolpublikasikan.setAttribute("class", "wa w3-red w3-hover-aqua");
  tombolpublikasikan.innerHTML = "EDIT KONTEN MATERI"

  // $.getJSON(linkmateri + "&idmateri=" + idm + "&action=previewriwayat", function (json) { })
  fetch(linkmateri + "&action=previewriwayat&idmateri=" + idm).then(m => m.json())
    .then(k => {

      //isiteks.textContent = k;
      isiteks.value = k;

      let ingindownload = confirm("Apakah Anda ingin mendownload materi ini juga?");
      if (ingindownload) {
        downloadfiledraft(k, idmapel.value);
      }
    }).catch(er => {
      isiteks.textContent = er
    })
  //alert("Anda membuka link upload materi")




}

const editfilematerikeserver = (id) => {

  let tglkosong = document.formuploadmateri.idtgl.value
  let boltgl = (tglkosong == "") ? alert('Waktu Mulai tidak boleh kosong') : true;
  let mapel = document.formuploadmateri.idmapel.value;
  let bolmapel = (mapel == "") ? alert('Identitas pembelajaran tidak boleh kosong') : true;

  let kuncikosong = document.formuploadmateri.kuncikd.value;
  let bolkd = (kuncikosong == "") ? alert("Anda belum membuat sebaran KD") : true;
  if (bolmapel && boltgl && bolkd) {
    let dom = document.getElementById("formuploadmateri");
    let data = new FormData(dom);
    data.append("idbaris", id)
    pranalamateri.style.display = "block";
    dom.reset();
    dom.idmateri.value = "";
    idpracetak.innerHTML = `<i class="fa fa-spin fa-spinner w3-xxxlarge"></i> On Proess kirim`
    let url = linkmateri + "&action=materiedit"
    fetch(url, {
        method: 'post',
        body: data
      })
      .then(m => m.json())
      .then(f => {
        idpracetak.innerHTML = f.result;
        loadketkunci.innerHTML = "";

        loadketKD.innerHTML = "";
        //console.log(f)
        pembelajaran();
        updatematerikan();



      })
      .catch(er => idpracetak.innerHTML = "Maaf, terjadi kesalahan: <br> Error Code" + er)

  }
  localStorage.removeItem("draftmateri")
  tombolpublikasikan.setAttribute("onclick", "publikasikanmateribaru()")
  tombolpublikasikan.removeAttribute("class"); //.wa w3-deep-purple w3-hover-aqua);
  tombolpublikasikan.setAttribute("class", "wa w3-deep-purple w3-hover-aqua");
  tombolpublikasikan.innerHTML = "PUBLIKASIKAN";
}


function uploadpotoessay(idpar) {
  //console.log(idpar)
  let id = idpar.split("_")[0];
  let idsw = idpar.split("_")[1];
  var item = document.getElementById("iduploadpotoessay" + id).files[0];
  var tempat = document.getElementById("filejawaban" + id);
  let total = (1048576 / item.size).toFixed(2);
  tempat.innerHTML = `<i class="fa fa-spin fa-spinner w3-xxlarge"></i> Sedang proses, mohon tunggu ...`;



  let ekstensi = item.name.substring(item.name.lastIndexOf('.') + 1);


  var filename;
  // format nama file = kodetokensiswa_kelas_nomateri_nosoal
  let tokensiswa = JSON.parse(localStorage.getItem("datasiswa_" + idNamaKelas))["datasiswa"][idsw].id;
  filename = idNamaKelas + "_" + tokensiswa + "_MateriKoreksi_" + kodebarismateriyangdikerjakan + "_essayno_" + id;

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
    datafom.append("kelas", idNamaKelas);
    datafom.append("filename", filename);
    datafom.append("ekstensi", ekstensi);
    await fetch(constlinknilai + "?action=siswauploadmedia", {
        method: 'post',
        body: datafom
      }).then(m => m.json())
      .then(k => {
        tempat.innerHTML = k.result

      })
      .catch(er => {
        tempat.innerHTML = "Ups, Maaf. Media gagal diunggah ke server. <br><br>Kode Error: " + er;

      })



  }



}