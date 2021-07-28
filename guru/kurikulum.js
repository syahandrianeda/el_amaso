function kurikulum() {
    if (window.location.href.indexOf("gmp.html") > -1) {

        let valuekelas = document.getElementById("gmppilihrombel");//.value;

        if (valuekelas !== "null" && valuekelas.value == "none") {
            alert("Anda belum memilih kelas. Silakan pilih Kelas terlebih dulu")
            return

        }
    }

    tampilinsublamangurukelas("kurikulum");
    let tabkd = document.querySelector(".classtabkd");
    let tabkkm = document.querySelector(".classtabkkm");
    let tabupl = document.querySelector(".classtabuploadkurikulum");
    tabkd.innerHTML = "Kompetensi Dasar <i class='fa fa-spin fa-spinner'></i>"
    tabkkm.innerHTML = "KKM <i class='fa fa-spin fa-spinner'></i>"
    tabupl.innerHTML = "Upload Kurikulum <i class='fa fa-spin fa-spinner'></i>"

    kurikulum_kd.style.display = "block";
    //document.getElementById("kurikulum_kd").click();
    //------------------------------------------
    let islam = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "ISLAM" || lk.pd_agama == "Islam" || lk.pd_agama == "islam") {
            return true;
        }
    }).length;
    let bolislam = (islam == 0) ? false : true;

    let kristen = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KRISTEN" ||
            lk.pd_agama == "Kristen" ||
            lk.pd_agama == "kristen" ||
            lk.pd_agama == "PROTESTAN" || lk.pd_agama == "Protestan") {
            return true;
        }
    }).length;
    let bolkristen = (kristen == 0) ? false : true;

    let katolik = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katolik" || lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katholik" || lk.pd_agama == "katholik") {
            return true;
        }
    }).length;
    let bolkatolik = (katolik == 0) ? false : true;

    let hindu = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "HINDU" || lk.pd_agama == "Hindu" || lk.pd_agama == "hindu") {
            return true;
        }
    }).length;
    let bolhindu = (hindu == 0) ? false : true;

    let budha = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "BUDHA" || lk.pd_agama == "BUDA" || lk.pd_agama == "Budha" || lk.pd_agama == "Buda" || lk.pd_agama == "buda") {
            return true;
        }
    }).length;
    let bolbudha = (budha == 0) ? false : true;
    let khonghucu = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KHONGHUCU" || lk.pd_agama == "Khong Hu Cu" || lk.pd_agama == "KHONG HUCU" || lk.pd_agama == "Khong Hucu" || lk.pd_agama == "Khong hucu") {
            return true;
        }
    }).length;
    let bolkhonghucu = (khonghucu == 0) ? false : true;


    let divkurikulum = document.getElementById("kurikulum_kd");
    divkurikulum.innerHTML = "<i class='fa fa-spin fa-spinner w3-xxxlarge'></i>";


    let tekshtml = "<h3> Kompetensi Dasar</h3>Sebaran Kompetensi Dasar<hr/>";
    tekshtml += `<button class='w3-button w3-round-large w3-blue' onclick="datacekliskd()">Simpan</button><hr/>`;
    let tragama = "";
    let elkkm = "";


    if (bolislam) {
        tragama += `<tr><td>Pendidikan Agama Islam dan Budi Pekerti</td><td>PAI</td>
        <td>
            <label for="kd3_PAI_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.1" name="kd3_PAI_3.1" />
                3.1
            </label><br>
            <label for="kd3_PAI_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.2" name="kd3_PAI_3.2" />
                3.2
                </label><br>
            <label for="kd3_PAI_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.3" name="kd3_PAI_3.3" />
                3.3
                </label><br>
            <label for="kd3_PAI_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.4" name="kd3_PAI_3.4" />
                3.4
            </label><br>
            <label for="kd3_PAI_3.5">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.5" name="kd3_PAI_3.5" />
                3.5
            </label><br>
            <label for="kd3_PAI_3.6">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.6" name="kd3_PAI_3.6" />
                3.6
                </label><br>
            <label for="kd3_PAI_3.7">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.7" name="kd3_PAI_3.7" />
                3.7
                </label><br>
            <label for="kd3_PAI_3.8">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.8" name="kd3_PAI_3.8" />
                3.8
            </label><br>
            <label for="kd3_PAI_3.9">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.9" name="kd3_PAI_3.9" />
                3.9
            </label><br>
            <label for="kd3_PAI_3.10">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.10" name="kd3_PAI_3.10" />
                3.10
                </label><br>
            <label for="kd3_PAI_3.11">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.11" name="kd3_PAI_3.11" />
                3.11
                </label><br>
            <label for="kd3_PAI_3.12">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.12" name="kd3_PAI_3.12" />
                3.12
            </label><br>
            <label for="kd3_PAI_3.13">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.13" name="kd3_PAI_3.13" />
                3.13
            </label><br>
            <label for="kd3_PAI_3.14">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.14" name="kd3_PAI_3.14" />
                3.14
                </label><br>
            <label for="kd3_PAI_3.15">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.15" name="kd3_PAI_3.15" />
                3.15
                </label><br>
            <label for="kd3_PAI_3.16">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.16" name="kd3_PAI_3.16" />
                3.16
            </label><br>
             <label for="kd3_PAI_3.17">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.17" name="kd3_PAI_3.17" />
                3.17
                </label><br>
            <label for="kd3_PAI_3.18">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.18" name="kd3_PAI_3.18" />
                3.18
            </label><br>
            <label for="kd3_PAI_3.19">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.19" name="kd3_PAI_3.19" />
                3.19
            </label><br>
            <label for="kd3_PAI_3.20">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.20" name="kd3_PAI_3.20" />
                3.20
                </label><br>
            <label for="kd3_PAI_3.21">
                <input class="cekliskd" type="checkbox" id="kd3_PAI_3.21" name="kd3_PAI_3.21" />
                3.21
                </label>
        </td>
        <td>
        
        <label for="kd4_PAI_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.1" name="kd4_PAI_4.1" />
        4.1
        </label><br>
        <label for="kd4_PAI_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.2" name="kd4_PAI_4.2" />
        4.2
        </label><br>
        <label for="kd4_PAI_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.3" name="kd4_PAI_4.3" />
        4.3
        </label><br>
        <label for="kd4_PAI_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.4" name="kd4_PAI_4.4" />
        4.4
        </label><br>
        <label for="kd4_PAI_4.5">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.5" name="kd4_PAI_4.5" />
        4.5
        </label><br>
        <label for="kd4_PAI_4.6">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.6" name="kd4_PAI_4.6" />
        4.6
        </label><br>
        <label for="kd4_PAI_4.7">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.7" name="kd4_PAI_4.7" />
        4.7
        </label><br>
        <label for="kd4_PAI_4.8">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.8" name="kd4_PAI_4.8" />
        4.8
        </label><br>
        <label for="kd4_PAI_4.9">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.9" name="kd4_PAI_4.9" />
        4.9
        </label><br>
        <label for="kd4_PAI_4.10">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_3.10" name="kd4_PAI_4.10" />
        4.10
        </label><br>
        <label for="kd4_PAI_4.11">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.11" name="kd4_PAI_4.11" />
        4.11
        </label><br>
        <label for="kd4_PAI_4.12">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.12" name="kd4_PAI_4.12" />
        4.12
        </label><br>
        <label for="kd4_PAI_4.13">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.13" name="kd4_PAI_4.13" />
        4.13
        </label><br>
        <label for="kd4_PAI_4.14">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.14" name="kd4_PAI_4.14" />
        4.14
        </label><br>
        <label for="kd4_PAI_4.15">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.15" name="kd4_PAI_4.15" />
        4.15
        </label><br>
        <label for="kd4_PAI_4.16">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.16" name="kd4_PAI_4.16" />
        4.16
        </label><br>
        <label for="kd4_PAI_4.17">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.17" name="kd4_PAI_4.17" />
        4.17
        </label><br>
        <label for="kd4_PAI_4.18">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.18" name="kd4_PAI_4.18" />
        4.18
        </label><br>
        <label for="kd4_PAI_4.19">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.19" name="kd4_PAI_4.19" />
        4.19
        </label><br>
        <label for="kd4_PAI_4.20">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.20" name="kd4_PAI_4.20" />
        4.20
        </label><br>
        <label for="kd4_PAI_4.21">
            <input class="cekliskd" type="checkbox" id="kd4_PAI_4.21" name="kd4_PAI_4.21" />
        4.21
        </label>
        </td>
        </tr>`;
        elkkm += `<tr><td>PAI</td><td contenteditable="true" id="namamapelraport_PAI">Pendidikan Agama Islam dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PAI">00</td></tr>`;
    }
    if (bolkristen) {
        tragama += `<tr><td>Pendidikan Agama Kristen dan Budi Pekerti<br><br><sub class="w3-text-red">Siswa di kelas Anda terdeteksi memiliki jumlah siswa beragama Kristen sebanyak ${kristen} siswa.<sub></td><td>PKRIS</td>
        <td>
            <label for="kd3_PKRIS_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PKRIS_3.1" name="kd3_PKRIS_3.1" />
                3.1
            </label><br>
            <label for="kd3_PKRIS_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PKRIS_3.2" name="kd3_PKRIS_3.2" />
                3.2
                </label><br>
            <label for="kd3_PKRIS_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PKRIS_3.3" name="kd3_PKRIS_3.3" />
                3.3
                </label><br>
            <label for="kd3_PKRIS_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PKRIS_3.4" name="kd3_PKRIS_3.4" />
                3.4
            </label><br>
            
        </td>
        <td>
        
        <label for="kd4_PKRIS_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PKRIS_4.1" name="kd4_PKRIS_4.1" />
        4.1
        </label><br>
        <label for="kd4_PKRIS_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PKRIS_4.2" name="kd4_PKRIS_4.2" />
        4.2
        </label><br>
        <label for="kd4_PKRIS_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PKRIS_4.3" name="kd4_PKRIS_4.3" />
        4.3
        </label><br>
        <label for="kd4_PKRIS_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PKRIS_4.4" name="kd4_PKRIS_4.4" />
        4.4
        </label><br>

        </td>
        </tr>`;
        elkkm += `<tr><td>PKRIS</td><td contenteditable="true" id="namamapelraport_PKRIS">Pendidikan Agama Kristen dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PKRIS">00</td></tr>`;
    }
    if (bolkatolik) {
        tragama += `<tr><td>Pendidikan Agama Katholik dan Budi Pekerti<br><br><sub class="w3-text-red">Siswa di kelas Anda terdeteksi memiliki jumlah siswa beragama Katolik sebanyak ${katolik} siswa.<sub></td><td>PKATO</td>
        <td>
            <label for="kd3_PKATO_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.1" name="kd3_PKATO_3.1" />
                3.1
            </label><br>
            <label for="kd3_PKATO_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.2" name="kd3_PKATO_3.2" />
                3.2
                </label><br>
            <label for="kd3_PKATO_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.3" name="kd3_PKATO_3.3" />
                3.3
                </label><br>
            <label for="kd3_PKATO_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.4" name="kd3_PKATO_3.4" />
                3.4
            </label><br>
            <label for="kd3_PKATO_3.5">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.5" name="kd3_PKATO_3.5" />
                3.5
            </label><br>
            <label for="kd3_PKATO_3.6">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.6" name="kd3_PKATO_3.6" />
                3.6
                </label><br>
            <label for="kd3_PKATO_3.7">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.7" name="kd3_PKATO_3.7" />
                3.7
                </label><br>
            <label for="kd3_PKATO_3.8">
                <input class="cekliskd" type="checkbox" id="kd3_PKATO_3.8" name="kd3_PKATO_3.8" />
                3.8
            </label><br>
           
        </td>
        <td>
        
        <label for="kd4_PKATO_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.1" name="kd4_PKATO_4.1" />
        4.1
        </label><br>
        <label for="kd4_PKATO_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.2" name="kd4_PKATO_4.2" />
        4.2
        </label><br>
        <label for="kd4_PKATO_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.3" name="kd4_PKATO_4.3" />
        4.3
        </label><br>
        <label for="kd4_PKATO_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.4" name="kd4_PKATO_4.4" />
        4.4
        </label><br>
        <label for="kd4_PKATO_4.5">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.5" name="kd4_PKATO_4.5" />
        4.5
        </label><br>
        <label for="kd4_PKATO_4.6">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.6" name="kd4_PKATO_4.6" />
        4.6
        </label><br>
        <label for="kd4_PKATO_4.7">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.7" name="kd4_PKATO_4.7" />
        4.7
        </label><br>
        <label for="kd4_PKATO_4.8">
            <input class="cekliskd" type="checkbox" id="kd4_PKATO_4.8" name="kd4_PKATO_4.8" />
        4.8
        </label><br>
        
        </td>
        </tr>`;
        elkkm += `<tr><td>PKATO</td><td contenteditable="true" id="namamapelraport_PKATO">Pendidikan Agama Katholik dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PKATO">00</td></tr>`;
    }
    if (bolbudha) {
        tragama += `<tr><td>Pendidikan Agama Budha dan Budi Pekerti<br><br><sub class="w3-text-red">Siswa di kelas Anda terdeteksi memiliki jumlah siswa beragama Budha sebanyak ${budha} siswa.<sub></td><td>PBUDH</td>
        <td>
            <label for="kd3_PBUDH_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PBUDH_3.1" name="kd3_PBUDH_3.1" />
                3.1
            </label><br>
            <label for="kd3_PBUDH_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PBUDH_3.2" name="kd3_PBUDH_3.2" />
                3.2
                </label><br>
            <label for="kd3_PBUDH_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PBUDH_3.3" name="kd3_PBUDH_3.3" />
                3.3
                </label><br>
            <label for="kd3_PBUDH_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PBUDH_3.4" name="kd3_PBUDH_3.4" />
                3.4
            </label><br>
            
        </td>
        <td>
        
        <label for="kd4_PBUDH_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PBUDH_4.1" name="kd4_PBUDH_4.1" />
        4.1
        </label><br>
        <label for="kd4_PBUDH_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PBUDH_4.2" name="kd4_PBUDH_4.2" />
        4.2
        </label><br>
        <label for="kd4_PBUDH_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PBUDH_4.3" name="kd4_PBUDH_4.3" />
        4.3
        </label><br>
        <label for="kd4_PBUDH_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PBUDH_4.4" name="kd4_PBUDH_4.4" />
        4.4
        </label><br>

        </td>
        </tr>`;
        elkkm += `<tr><td>PBUDH</td><td contenteditable="true" id="namamapelraport_PBUDH">Pendidikan Agama Budha dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PBUDH">00</td></tr>`;
    }
    if (bolhindu) {
        tragama += `<tr><td>Pendidikan Agama Hindu dan Budi Pekerti<br><br><sub class="w3-text-red">Siswa di kelas Anda terdeteksi memiliki jumlah siswa beragama Hindu sebanyak ${hindu} siswa.<sub></td><td>PHIND</td>
        <td>
            <label for="kd3_PHIND_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.1" name="kd3_PHIND_3.1" />
                3.1
            </label><br>
            <label for="kd3_PHIND_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.2" name="kd3_PHIND_3.2" />
                3.2
                </label><br>
            <label for="kd3_PHIND_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.3" name="kd3_PHIND_3.3" />
                3.3
                </label><br>
            <label for="kd3_PHIND_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.4" name="kd3_PHIND_3.4" />
                3.4
            </label><br>
            <label for="kd3_PHIND_3.5">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.5" name="kd3_PHIND_3.5" />
                3.5
            </label><br>
            <label for="kd3_PHIND_3.6">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.6" name="kd3_PHIND_3.6" />
                3.6
                </label><br>
            <label for="kd3_PHIND_3.7">
                <input class="cekliskd" type="checkbox" id="kd3_PHIND_3.7" name="kd3_PHIND_3.7" />
                3.7
                </label><br>
            
           
        </td>
        <td>
        
        <label for="kd4_PHIND_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.1" name="kd4_PHIND_4.1" />
        4.1
        </label><br>
        <label for="kd4_PHIND_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.2" name="kd4_PHIND_4.2" />
        4.2
        </label><br>
        <label for="kd4_PHIND_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.3" name="kd4_PHIND_4.3" />
        4.3
        </label><br>
        <label for="kd4_PHIND_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.4" name="kd4_PHIND_4.4" />
        4.4
        </label><br>
        <label for="kd4_PHIND_4.5">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.5" name="kd4_PHIND_4.5" />
        4.5
        </label><br>
        <label for="kd4_PHIND_4.6">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.6" name="kd4_PHIND_4.6" />
        4.6
        </label><br>
        <label for="kd4_PHIND_4.7">
            <input class="cekliskd" type="checkbox" id="kd4_PHIND_4.7" name="kd4_PHIND_4.7" />
        4.7
        </label>
        
        </td>
        </tr>`;
        elkkm += `<tr><td>PHIND</td><td contenteditable="true" id="namamapelraport_PHIND">Pendidikan Agama Hindu dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PHIND">00</td></tr>`;
    }
    if (bolkhonghucu) {
        tragama += `<tr><td>Pendidikan Agama Khonghucu dan Budi Pekerti<br><br><sub class="w3-text-red">Siswa di kelas Anda terdeteksi memiliki jumlah siswa beragama Khonghucu sebanyak ${khonghucu} siswa.<sub></td><td>PHIND</td>
        <td>
            <label for="kd3_PKONG_3.1">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.1" name="kd3_PKONG_3.1" />
                3.1
            </label><br>
            <label for="kd3_PKONG_3.2">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.2" name="kd3_PKONG_3.2" />
                3.2
                </label><br>
            <label for="kd3_PKONG_3.3">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.3" name="kd3_PKONG_3.3" />
                3.3
                </label><br>
            <label for="kd3_PKONG_3.4">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.4" name="kd3_PKONG_3.4" />
                3.4
            </label><br>
            <label for="kd3_PKONG_3.5">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.5" name="kd3_PKONG_3.5" />
                3.5
            </label><br>
            <label for="kd3_PKONG_3.6">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.6" name="kd3_PKONG_3.6" />
                3.6
                </label><br>
            <label for="kd3_PKONG_3.7">
                <input class="cekliskd" type="checkbox" id="kd3_PKONG_3.7" name="kd3_PKONG_3.7" />
                3.7
                </label><br>
            
           
        </td>
        <td>
        
        <label for="kd4_PKONG_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.1" name="kd4_PKONG_4.1" />
        4.1
        </label><br>
        <label for="kd4_PKONG_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.2" name="kd4_PKONG_4.2" />
        4.2
        </label><br>
        <label for="kd4_PKONG_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.3" name="kd4_PKONG_4.3" />
        4.3
        </label><br>
        <label for="kd4_PKONG_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.4" name="kd4_PKONG_4.4" />
        4.4
        </label><br>
        <label for="kd4_PKONG_4.5">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.5" name="kd4_PKONG_4.5" />
        4.5
        </label><br>
        <label for="kd4_PKONG_4.6">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.6" name="kd4_PKONG_4.6" />
        4.6
        </label><br>
        <label for="kd4_PKONG_4.7">
            <input class="cekliskd" type="checkbox" id="kd4_PKONG_4.7" name="kd4_PKONG_4.7" />
        4.7
        </label>
        
        </td>
        </tr>`;
        elkkm += `<tr><td>PKONG</td><td contenteditable="true" id="namamapelraport_PKONG">Pendidikan Agama Khonghucu dan Budi Pekerti</td><td contenteditable="true" id="angkakkm_PKONG">00</td></tr>`;
    }

    if (!bolislam && !bolkristen && !bolkatolik && !bolbudha && !bolhindu && !bolkhonghucu) {
        tragama += `
        <tr>
            <td>Tidak terdeteksi adanya isian Agama di kelas Anda</td>
            <td>???</td>
            <td>Silakan lengkapi data siswa Anda</td>
            <td>Silakan lengkapi data siswa Anda</td>
        </tr>
        `;
        elkkm += `<tr><td>AGAMA</td><td>Tidak terdeteksi data agama di Data Siswa Anda</td><td>00</td=></tr>`;
    }

    let ipsipa = "";
    if (idJenjang >= 4) {
        ipsipa = `
        <tr>
        <td>Ilmu Pengetahuan Alam</td>
        <td>IPA</td>
        <td>
        <label for="kd3_IPA_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.1" name="kd3_IPA_3.1" />
        3.1
    </label><br>
    <label for="kd3_IPA_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.2" name="kd3_IPA_3.2" />
        3.2
        </label><br>
    <label for="kd3_IPA_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.3" name="kd3_IPA_3.3" />
        3.3
        </label><br>
    <label for="kd3_IPA_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.4" name="kd3_IPA_3.4" />
        3.4
    </label><br>
    <label for="kd3_IPA_3.5">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.5" name="kd3_IPA_3.5" />
        3.5
    </label><br>
    <label for="kd3_IPA_3.6">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.6" name="kd3_IPA_3.6" />
        3.6
        </label><br>
    <label for="kd3_IPA_3.7">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.7" name="kd3_IPA_3.7" />
        3.7
        </label><br>
    <label for="kd3_IPA_3.8">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.8" name="kd3_IPA_3.8" />
        3.8
    </label><br>
    <label for="kd3_IPA_3.9">
        <input class="cekliskd" type="checkbox" id="kd3_IPA_3.9" name="kd3_IPA_3.9" />
        3.9
</label>
    
 
        </td><td>
        <label for="kd4_IPA_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.1" name="kd4_IPA_4.1" />
        4.1
    </label><br>
    <label for="kd4_IPA_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.2" name="kd4_IPA_4.2" />
        4.2
        </label><br>
    <label for="kd4_IPA_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.3" name="kd4_IPA_4.3" />
        4.3
        </label><br>
    <label for="kd4_IPA_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.4" name="kd4_IPA_4.4" />
        4.4
    </label><br>
    <label for="kd4_IPA_4.5">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.5" name="kd4_IPA_4.5" />
        4.5
    </label><br>
    <label for="kd4_IPA_4.6">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.6" name="kd4_IPA_4.6" />
        4.6
        </label><br>
    <label for="kd4_IPA_4.7">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.7" name="kd4_IPA_4.7" />
        4.7
        </label><br>
    <label for="kd4_IPA_4.8">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.8" name="kd4_IPA_4.8" />
        4.8
    </label><br>
    <label for="kd4_IPA_4.9">
        <input class="cekliskd" type="checkbox" id="kd4_IPA_4.9" name="kd4_IPA_4.9" />
        4.9
    </label><br>
        </td>

    </tr> 
    <tr>    
        <td>Ilmu Pengetahuan Sosial</td>
        <td>IPS</td>
        <td>
        <label for="kd3_IPS_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_IPS_3.1" name="kd3_IPS_3.1" />
        3.1
    </label><br>
    <label for="kd3_IPS_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_IPS_3.2" name="kd3_IPS_3.2" />
        3.2
        </label><br>
    <label for="kd3_IPS_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_IPS_3.3" name="kd3_IPS_3.3" />
        3.3
        </label><br>
    <label for="kd3_IPS_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_IPS_3.4" name="kd3_IPS_3.4" />
        3.4
    </label><br>
        </td>
        <td>
        <label for="kd4_IPS_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_IPS_4.1" name="kd4_IPS_4.1" />
        4.1
    </label><br>
    <label for="kd4_IPS_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_IPS_4.2" name="kd4_IPS_4.2" />
        4.2
        </label><br>
    <label for="kd4_IPS_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_IPS_4.3" name="kd4_IPS_4.3" />
        4.3
        </label><br>
    <label for="kd4_IPS_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_IPS_4.4" name="kd4_IPS_4.4" />
        4.4
    </label><br>
    
        </td>
    </tr> 
        `
    }

    tekshtml += `<div style="overflow-x:auto">
    <table class='versi-table' id="datadatakdraport">
    <tr >
        <th>Mata Pelajaran</th>
        <th>Kode Mapel</th>
        <th>Kompetensi Pengetahuan<br> (KI-3)</the>
        <th>Kompetensi Keterampilan <br>(KI-4)</thtyle>
    </tr>
    ${tragama}
    <tr>
        <td>Pendidikan Kewarganegaraan</td>
        <td>PKN</td>
    
        <td>
        <label for="kd3_PKN_3.1">
            <input class="cekliskd" type="checkbox" id="kd3_PKN_3.1" name="kd3_PKN_3.1" />
            3.1
        </label><br>
        <label for="kd3_PKN_3.2">
            <input class="cekliskd" type="checkbox" id="kd3_PKN_3.2" name="kd3_PKN_3.2" />
            3.2
            </label><br>
        <label for="kd3_PKN_3.3">
            <input class="cekliskd" type="checkbox" id="kd3_PKN_3.3" name="kd3_PKN_3.3" />
            3.3
            </label><br>
        <label for="kd3_PKN_3.4">
            <input class="cekliskd" type="checkbox" id="kd3_PKN_3.4" name="kd3_PKN_3.4" />
            3.4
        </label><br>
                   
       
    </td>
    <td>
            <label for="kd4_PKN_4.1">
            <input class="cekliskd" type="checkbox" id="kd4_PKN_4.1" name="kd4_PKN_4.1" />
        4.1
        </label><br>
        <label for="kd4_PKN_4.2">
            <input class="cekliskd" type="checkbox" id="kd4_PKN_4.2" name="kd4_PKN_4.2" />
        4.2
        </label><br>
        <label for="kd4_PKN_4.3">
            <input class="cekliskd" type="checkbox" id="kd4_PKN_4.3" name="kd4_PKN_4.3" />
        4.3
        </label><br>
        <label for="kd4_PKN_4.4">
            <input class="cekliskd" type="checkbox" id="kd4_PKN_4.4" name="kd4_PKN_4.4" />
        4.4
        </label><br>
    
            </td>
        </tr>
    <tr>
        <td> Bahasa Indonesia
        </td><td>BINDO</td><td>
        <label for="kd3_BINDO_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.1" name="kd3_BINDO_3.1" />
        3.1
    </label><br>
    <label for="kd3_BINDO_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.2" name="kd3_BINDO_3.2" />
        3.2
        </label><br>
    <label for="kd3_BINDO_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.3" name="kd3_BINDO_3.3" />
        3.3
        </label><br>
    <label for="kd3_BINDO_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.4" name="kd3_BINDO_3.4" />
        3.4
    </label><br>
    <label for="kd3_BINDO_3.5">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.5" name="kd3_BINDO_3.5" />
        3.5
    </label><br>
    <label for="kd3_BINDO_3.6">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.6" name="kd3_BINDO_3.6" />
        3.6
        </label><br>
    <label for="kd3_BINDO_3.7">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.7" name="kd3_BINDO_3.7" />
        3.7
        </label><br>
    <label for="kd3_BINDO_3.8">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.8" name="kd3_BINDO_3.8" />
        3.8
    </label><br>
    <label for="kd3_BINDO_3.9">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.9" name="kd3_BINDO_3.9" />
        3.9
    </label><br>
    <label for="kd3_BINDO_3.10">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.10" name="kd3_BINDO_3.10" />
        3.10
        </label><br>
    <label for="kd3_BINDO_3.11">
        <input class="cekliskd" type="checkbox" id="kd3_BINDO_3.11" name="kd3_BINDO_3.11" />
        3.11
        </label><br>
 
        </td><td>
        <label for="kd4_BINDO_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.1" name="kd4_BINDO_4.1" />
        4.1
    </label><br>
    <label for="kd4_BINDO_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.2" name="kd4_BINDO_4.2" />
        4.2
        </label><br>
    <label for="kd4_BINDO_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.3" name="kd4_BINDO_4.3" />
        4.3
        </label><br>
    <label for="kd4_BINDO_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.4" name="kd4_BINDO_4.4" />
        4.4
    </label><br>
    <label for="kd4_BINDO_4.5">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.5" name="kd4_BINDO_4.5" />
        4.5
    </label><br>
    <label for="kd4_BINDO_4.6">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.6" name="kd4_BINDO_4.6" />
        4.6
        </label><br>
    <label for="kd4_BINDO_4.7">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.7" name="kd4_BINDO_4.7" />
        4.7
        </label><br>
    <label for="kd4_BINDO_4.8">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.8" name="kd4_BINDO_4.8" />
        4.8
    </label><br>
    <label for="kd4_BINDO_4.9">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.9" name="kd4_BINDO_4.9" />
        4.9
    </label><br>
    <label for="kd4_BINDO_4.10">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.10" name="kd4_BINDO_4.10" />
        4.10
        </label><br>
    <label for="kd4_BINDO_4.11">
        <input class="cekliskd" type="checkbox" id="kd4_BINDO_4.11" name="kd4_BINDO_4.11" />
        4.11
        </label><br>
 
        </td>
    </tr>
    <tr>
        <td>Matematika</td>
        <td>MTK</td>
        <td>
        <label for="kd3_MTK_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.1" name="kd3_MTK_3.1" />
        3.1
    </label><br>
    <label for="kd3_MTK_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.2" name="kd3_MTK_3.2" />
        3.2
        </label><br>
    <label for="kd3_MTK_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.3" name="kd3_MTK_3.3" />
        3.3
        </label><br>
    <label for="kd3_MTK_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.4" name="kd3_MTK_3.4" />
        3.4
    </label><br>
    <label for="kd3_MTK_3.5">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.5" name="kd3_MTK_3.5" />
        3.5
    </label><br>
    <label for="kd3_MTK_3.6">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.6" name="kd3_MTK_3.6" />
        3.6
        </label><br>
    <label for="kd3_MTK_3.7">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.7" name="kd3_MTK_3.7" />
        3.7
        </label><br>
    <label for="kd3_MTK_3.8">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.8" name="kd3_MTK_3.8" />
        3.8
    </label><br>
    <label for="kd3_MTK_3.9">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.9" name="kd3_MTK_3.9" />
        3.9
    </label><br>
    <label for="kd3_MTK_3.10">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.10" name="kd3_MTK_3.10" />
        3.10
        </label><br>
    <label for="kd3_MTK_3.11">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.11" name="kd3_MTK_3.11" />
        3.11
        </label><br>
<label for="kd3_MTK_3.12">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.12" name="kd3_MTK_3.12" />
        3.12
        </label><br>
    <label for="kd3_MTK_3.13">
        <input class="cekliskd" type="checkbox" id="kd3_MTK_3.13" name="kd3_MTK_3.13" />
        3.13
        </label><br>
 
        </td>
        <td>
        <label for="kd4_MTK_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.1" name="kd4_MTK_4.1" />
        4.1
    </label><br>
    <label for="kd4_MTK_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.2" name="kd4_MTK_4.2" />
        4.2
        </label><br>
    <label for="kd4_MTK_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.3" name="kd4_MTK_4.3" />
        4.3
        </label><br>
    <label for="kd4_MTK_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.4" name="kd4_MTK_4.4" />
        4.4
    </label><br>
    <label for="kd4_MTK_4.5">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.5" name="kd4_MTK_4.5" />
        4.5
    </label><br>
    <label for="kd4_MTK_4.6">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.6" name="kd4_MTK_4.6" />
        4.6
        </label><br>
    <label for="kd4_MTK_4.7">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.7" name="kd4_MTK_4.7" />
        4.7
        </label><br>
    <label for="kd4_MTK_4.8">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.8" name="kd4_MTK_4.8" />
        4.8
    </label><br>
    <label for="kd4_MTK_4.9">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.9" name="kd4_MTK_4.9" />
        4.9
    </label><br>
    <label for="kd4_MTK_4.10">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.10" name="kd4_MTK_4.10" />
        4.10
        </label><br>
    <label for="kd4_MTK_4.11">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.11" name="kd4_MTK_4.11" />
        4.11
        </label><br>
<label for="kd4_MTK_4.12">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.12" name="kd4_MTK_4.12" />
        4.12
        </label><br>
    <label for="kd4_MTK_4.13">
        <input class="cekliskd" type="checkbox" id="kd4_MTK_4.13" name="kd4_MTK_4.13" />
        4.13
        </label><br>
 
        </td>
    </tr> 
   ${ipsipa}
    <tr>
        <td>Seni Budaya dan Prakarya</td>
        <td>SBDP</td>
        <td>
        <label for="kd3_SBDP_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_SBDP_3.1" name="kd3_SBDP_3.1" />
        3.1
    </label><br>
    <label for="kd3_SBDP_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_SBDP_3.2" name="kd3_SBDP_3.2" />
        3.2
        </label><br>
    <label for="kd3_SBDP_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_SBDP_3.3" name="kd3_SBDP_3.3" />
        3.3
        </label><br>
    <label for="kd3_SBDP_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_SBDP_3.4" name="kd3_SBDP_3.4" />
        3.4
    </label><br>
        </td>
        <td>
        <label for="kd4_SBDP_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_SBDP_4.1" name="kd4_SBDP_4.1" />
        4.1
    </label><br>
    <label for="kd4_SBDP_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_SBDP_4.2" name="kd4_SBDP_4.2" />
        4.2
        </label><br>
    <label for="kd4_SBDP_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_SBDP_4.3" name="kd4_SBDP_4.3" />
        4.3
        </label><br>
    <label for="kd4_SBDP_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_SBDP_4.4" name="kd4_SBDP_4.4" />
        4.4
    </label><br>
        </td>
    </tr> 
    <tr>
        <td>Pendidikan Jasmani dan Kesehatan<br>PJOK</td>
        <td>PJOK</td>
        <td>
        <label for="kd3_PJOK_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.1" name="kd3_PJOK_3.1" />
        3.1
    </label><br>
    <label for="kd3_PJOK_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.2" name="kd3_PJOK_3.2" />
        3.2
        </label><br>
    <label for="kd3_PJOK_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.3" name="kd3_PJOK_3.3" />
        3.3
        </label><br>
    <label for="kd3_PJOK_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.4" name="kd3_PJOK_3.4" />
        3.4
    </label><br>
    <label for="kd3_PJOK_3.5">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.5" name="kd3_PJOK_3.5" />
        3.5
    </label><br>
    <label for="kd3_PJOK_3.6">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.6" name="kd3_PJOK_3.6" />
        3.6
        </label><br>
    <label for="kd3_PJOK_3.7">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.7" name="kd3_PJOK_3.7" />
        3.7
        </label><br>
    <label for="kd3_PJOK_3.8">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.8" name="kd3_PJOK_3.8" />
        3.8
    </label><br>
    <label for="kd3_PJOK_3.9">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.9" name="kd3_PJOK_3.9" />
        3.9
    </label><br>
    <label for="kd3_PJOK_3.10">
        <input class="cekliskd" type="checkbox" id="kd3_PJOK_3.10" name="kd3_PJOK_3.10" />
        3.10
        </label><br>
   
 
        </td>
        <td>
        <label for="kd4_PJOK_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.1" name="kd4_PJOK_4.1" />
        4.1
    </label><br>
    <label for="kd4_PJOK_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.2" name="kd4_PJOK_4.2" />
        4.2
        </label><br>
    <label for="kd4_PJOK_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.3" name="kd4_PJOK_4.3" />
        4.3
        </label><br>
    <label for="kd4_PJOK_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.4" name="kd4_PJOK_4.4" />
        4.4
    </label><br>
    <label for="kd4_PJOK_4.5">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.5" name="kd4_PJOK_4.5" />
        4.5
    </label><br>
    <label for="kd4_PJOK_4.6">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.6" name="kd4_PJOK_4.6" />
        4.6
        </label><br>
    <label for="kd4_PJOK_4.7">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.7" name="kd4_PJOK_4.7" />
        4.7
        </label><br>
    <label for="kd4_PJOK_4.8">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.8" name="kd4_PJOK_4.8" />
        4.8
    </label><br>
    <label for="kd4_PJOK_4.9">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.9" name="kd4_PJOK_4.9" />
        4.9
    </label><br>
    <label for="kd4_PJOK_4.10">
        <input class="cekliskd" type="checkbox" id="kd4_PJOK_4.10" name="kd4_PJOK_4.10" />
        4.10
        </label><br>
        </td>
    </tr>
    <tr>
        <td>Bahasa Sunda</td>
        <td>BSUND</td>
        <td>
        <label for="kd3_BSUND_3.1">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.1" name="kd3_BSUND_3.1" />
        3.1
    </label><br>
    <label for="kd3_BSUND_3.2">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.2" name="kd3_BSUND_3.2" />
        3.2
        </label><br>
    <label for="kd3_BSUND_3.3">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.3" name="kd3_BSUND_3.3" />
        3.3
        </label><br>
    <label for="kd3_BSUND_3.4">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.4" name="kd3_BSUND_3.4" />
        3.4
    </label><br>
    <label for="kd3_BSUND_3.5">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.5" name="kd3_BSUND_3.5" />
        3.5
    </label><br>
    <label for="kd3_BSUND_3.6">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.6" name="kd3_BSUND_3.6" />
        3.6
        </label><br>
    <label for="kd3_BSUND_3.7">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.7" name="kd3_BSUND_3.7" />
        3.7
        </label><br>
    <label for="kd3_BSUND_3.8">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.8" name="kd3_BSUND_3.8" />
        3.8
    </label><br>
    <label for="kd3_BSUND_3.9">
        <input class="cekliskd" type="checkbox" id="kd3_BSUND_3.9" name="kd3_BSUND_3.9" />
        3.9
    </label><br>
    
 
        </td>
        <td>
        <label for="kd4_BSUND_4.1">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.1" name="kd4_BSUND_4.1" />
        4.1
    </label><br>
    <label for="kd4_BSUND_4.2">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.2" name="kd4_BSUND_4.2" />
        4.2
        </label><br>
    <label for="kd4_BSUND_4.3">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.3" name="kd4_BSUND_4.3" />
        4.3
        </label><br>
    <label for="kd4_BSUND_4.4">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.4" name="kd4_BSUND_4.4" />
        4.4
    </label><br>
    <label for="kd4_BSUND_4.5">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.5" name="kd4_BSUND_4.5" />
        4.5
    </label><br>
    <label for="kd4_BSUND_4.6">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.6" name="kd4_BSUND_4.6" />
        4.6
        </label><br>
    <label for="kd4_BSUND_4.7">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.7" name="kd4_BSUND_4.7" />
        4.7
        </label><br>
    <label for="kd4_BSUND_4.8">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.8" name="kd4_BSUND_4.8" />
        4.8
    </label><br>
    <label for="kd4_BSUND_4.9">
        <input class="cekliskd" type="checkbox" id="kd4_BSUND_4.9" name="kd4_BSUND_4.9" />
        4.9
    </label><br>
    
        </td>
    </tr>
    </table></div>`

    kurikulum_kkm.innerHTML = `<h3>Data Kriteria Ketuntasan Minimal (KKM)</h3>
    <button class="w3-button w3-blue" onclick="fnprinttabelkkm('printtabelkkm,DATA KKM KELAS ${idJenjang}, SEMESTER ${idSemester} TAHUN PELAJARAN ${idTeksTapel},${StringTanggal(new Date())}')"><i class="fa fa-print"></i> Cetak</button>
   
    <hr/><div id="printtabelkkm"><center><table class="versi-table" id="ttttt">
        <tr>
            <th>Kode Mapel</th>
            <th>Identitas Mapel<br/><sub>Edit identitas mapel ini untuk identitas Mapel di Buku Raport</sub></th>
            <th>Nilai KKM</th>
        </tr>
        ${elkkm}
        <tr><td>PKN</td><td contenteditable="true" id="namamapelraport_PKN">Pendidikan Kewarganegaraan</td><td contenteditable="true" id="angkakkm_PKN">00</td></tr>
        <tr><td>BINDO</td><td contenteditable="true" id="namamapelraport_BINDO">Bahasa Indonesia</td><td contenteditable="true" id="angkakkm_BINDO">00</td></tr>
        <tr><td>MTK</td><td contenteditable="true" id="namamapelraport_MTK">Matematika</td><td contenteditable="true" id="angkakkm_MTK">00</td></tr>
        <tr><td>IPA</td><td contenteditable="true" id="namamapelraport_IPA">Ilmu Pengetahuan Alam</td><td contenteditable="true" id="angkakkm_IPA">00</td></tr>
        <tr><td>IPS</td><td contenteditable="true" id="namamapelraport_IPS">Ilmu Pengetahuan Sosial</td><td contenteditable="true" id="angkakkm_IPS">00</td></tr>
        <tr><td>PJOK</td><td contenteditable="true" id="namamapelraport_PJOK">Pendidikan Jasmani, Olahraga, dan Kesehatan</td><td contenteditable="true" id="angkakkm_PJOK">00</td></tr>
        <tr><td>SBDP</td><td contenteditable="true" id="namamapelraport_SBDP">Seni Budaya dan Prakarya</td><td contenteditable="true" id="angkakkm_SBDP">00</td></tr>
        <tr><td>BSUND</td><td contenteditable="true" id="namamapelraport_BSUND">Bahasa Sunda</td><td contenteditable="true" id="angkakkm_BSUND">00</td></tr>
    </table></center></div>
    <button onclick="fnsimpanidkkm()" class="w3-button w3-green w3-right">Simpan Perubahan</button><hr/>
    Keterangan: <sub class="w3-text-blue">Di tabel ini, Anda dapat mengedit nama mata pelajaran yang akan ditampilkan di Buku Raport Siswa. Di sini pula, Anda dapat mengubah KKM masing-masing mata pelajaran yang nantinya setiap KD akan otomatis menyesuaikan angka KKM yang Anda Edit di KKM yang Anda unggah di UPLOAD DATA (Setelah mengeklik tombol SIMPAN)</sub>
    
    `

    let tas = "kelas" + idJenjang;
    fetch(linkmateri + "&action=cekdkkm&tab=" + tas)
        .then(m => m.json())
        .then(k => {

            let statusunggah = (k.unggah == "Jenjang Kelas Anda sudah mengunggah KKM dan KD") ? true : false;
            let data = k.result;

            if (statusunggah) {

                let teks = "<hr/><div style='overflow-x:auto'><table class='versi-table w3-small tabelkkmkd'><tr><th>Mata Pelajaran</th><th>KD-3</th><th>Indikator KI-3 <br>(Pengetahuan)</th><th>KD-4</th><th>Indikator KI-4 <br>(Keterampilan)</th><th>KKM</th></tr>";
                for (i = 0; i < data.length; i++) {
                    let divelkkm = document.getElementById("angkakkm_" + data[i].mapel);
                    if (divelkkm !== null) {
                        divelkkm.innerHTML = data[i].kkm;
                    }
                    // teks += "<tr><td>" + data[i].mapel + "</td><td>" + data[i].kd3 + "</td><td contenteditable='true'>" + data[i].indikatorkd3 + "</td><td>" + data[i].kd4 + "</td><td  contenteditable='true'>" + data[i].indikatorkd4 + "</td><td  contenteditable='true'>" + data[i].kkm + "</td></tr>";
                    teks += `<tr><td>${data[i].mapel}</td><td>${data[i].kd3}</td><td contenteditable="true" id="deskripsikd3_${data[i].mapel}_${data[i].kd3}">${data[i].indikatorkd3}</td><td>${data[i].kd4}</td><td contenteditable="true" id="deskripsikd4_${data[i].mapel}_${data[i].kd4}">${data[i].indikatorkd4}</td><td contenteditable="true">${data[i].kkm}</td></tr>`;
                    let truekd3 = data[i].cekliskd3;
                    let truekd4 = data[i].cekliskd4;
                    let iddiv = "kd3_" + data[i].mapel + "_" + data[i].kd3;
                    let divnya = document.getElementById(iddiv);
                    if (divnya !== null) {
                        if (truekd3) {
                            divnya.checked = true;
                        } else {
                            divnya.checked = false;
                        }
                    }
                    let iddivv = "kd4_" + data[i].mapel + "_" + data[i].kd4;
                    let divnyaa = document.getElementById(iddivv);
                    if (divnyaa !== null) {
                        if (truekd4) {
                            divnyaa.checked = true;
                        } else {
                            divnyaa.checked = false;
                        }
                    }


                }

                pisahpisah.innerHTML = k.unggah + `<hr/><button class='w3-button w3-round-large w3-blue' onclick="datacekliskd()">Simpan</button><button class='w3-button w3-round-large w3-red' onclick="hapuskkmkd()">Hapus KKM dan KD</button><hr/>` + teks + "</table></div>";

            } else {
                pisahpisah.innerHTML = k.unggah + `<br/>Jika Anda belum mengunggah file KKM dan KD di server dan
                membutuhkan format filenya, silakan kunjungi Repository.</br><br /> Disana akan dijelaskan bagaimana caranya.<hr><label for="uploadcsv"><i class="fa fa-upload w3-button w3-blue w3-round-large"> Unggah File
                Format</i></label>
        <input type="file" onchange="uploadcsv()" id="uploadcsv" class="w3-hide" /><hr/>
        Berikut ini adalah contoh file KKM dan KD. Silakan unduh lalu Anda unggah pada tombol di atas, kemudian Anda edit (jika diperlukan);
        <table class='versi-table'>
            <tr>
                <th>Jenjang</th>
                <th>Aksi</th>
            </tr>
            <tr>
                <td> Kelas 1 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1OiOKNuU_KOLS5Osg8j9sPnaq7SsE7DI8&export=download' target='_blank'> UNDUH Kelas 1</a></button></td>
            </tr>
            <tr>
                <td> Kelas 2 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1LuSF4YRgNP1AXMxCfWUdzqw2dyk0L655&export=download' target='_blank'> UNDUH Kelas 2</a></button></td>
            </tr>
            <tr>
                <td> Kelas 3 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1QTa6pklrukQzuhurJU5AQGWDqautNQzO&export=download' target='_blank'> UNDUH Kelas 3</a></button></td>
            </tr>
             <tr>
                <td> Kelas 4 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=18-vYgLHb6CgSzmGsB2oloTbd3mH6-TvT&export=download' target='_blank'> UNDUH Kelas 4</a></button></td>
            </tr>
            <tr>
                <td> Kelas 5 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1mW1ag1e1V_DmhtO15xcSD7jH3o2N92SX&export=download' target='_blank'> UNDUH Kelas 5</a></button></td>
            </tr>
            <tr>
                <td> Kelas 6 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1xjM7DsTJCgN6DAqfblk0mi0sjcgvkPji&export=download' target='_blank'> UNDUH Kelas 6</a></button></td>
            </tr>
        </table>
        Keterangan:<br>
        <ul>
            <li>Silakan pilih salah satu file KKM dan KD di atas, lalu Unduh.  Kemudian file diunggah.
            </li><li>Sangat tidak disarankan Anda mengedit langsung dari filenya. Sebab akan mempengaruhi proses rekap nilai Raport
            </li><li>Anda boleh mengeditnya (jika berbeda dengan repository dari Tim Elamaso di Menu UPLOAD KURIKULUM. Di sana tabel KKM dan KD bisa diedit secara manual
            </li><li>Data Indikator pada file-file di tabel di atas adalah data indikator yang telah disusun oleh Tim ELamaso sesuai dengan PERMENDIKBUD No. 37 Tahun 2018
            </li>
        </ul>
        `
            }
            tabkd.innerHTML = "Kompetensi Dasar"
            tabkkm.innerHTML = "KKM"
            tabupl.innerHTML = "Upload Kurikulum"

        })
        .catch(er => {
            console.log(er);
            tabkd.innerHTML = "Kompetensi Dasar !"
            tabkkm.innerHTML = "KKM !"
            tabupl.innerHTML = "Upload Kurikulum !"
        })

    divkurikulum.innerHTML = tekshtml;



}

const fnsimpanidkkm = () => {
    let arrMapel = ["PAI", "PKRIS", "PKATO", "PHIND", "PBUDH", "PKONG", "PKN", "BINDO", "MTK", "IPA", "IPS", "SBDP", "PJOK", "BSUND", "TIK"];
    let cKd = [21, 4, 8, 7, 4, 6, 4, 11, 13, 9, 4, 4, 10, 9, 9];
    let tabel = document.getElementsByClassName("tabelkkmkd")[0];
    let k = 1;

    for (i = 0; i < arrMapel.length; i++) {
        let el = document.getElementById("angkakkm_" + arrMapel[i]);
        // let urut = k;
        let batas = k + cKd[i];
        //console.log(urut);
        for (j = k; j < batas; j++) {
            if (el !== null) {
                tabel.rows[j].cells[5].innerHTML = el.innerHTML

            }
        }
        k = batas;

    }
    datacekliskd();
}

const tabelkearray = () => {
    let tabel = document.querySelector(".tabelkkmkd");
    let arr = [];
    let baris = tabel.rows.length;
    for (i = 0; i < baris; i++) {
        let arrtd = [];
        let td1 = tabel.rows[i].cells[0].innerHTML;
        let td2 = tabel.rows[i].cells[1].innerHTML;
        let td3 = tabel.rows[i].cells[2].innerHTML;
        let td4 = tabel.rows[i].cells[3].innerHTML;
        let td5 = tabel.rows[i].cells[4].innerHTML;
        let td6 = tabel.rows[i].cells[5].innerHTML;
        // let td7 = tabel.rows[i].cells[6].innerHTML;
        // let td8 = tabel.rows[i].cells[7].innerHTML;
        if (i == 0) {
            arrtd.push("mapel");
            arrtd.push("kd3");
            arrtd.push("indikatorkd3");
            arrtd.push("kd4");
            arrtd.push("indikatorkd4");
            arrtd.push("kkm");
            let teks = "cekliskd3"
            arrtd.push(teks);
            teks = "cekliskd4"
            arrtd.push(teks);

        } else {
            arrtd.push(td1);
            arrtd.push(td2);
            arrtd.push(td3);
            arrtd.push(td4);
            arrtd.push(td5);
            arrtd.push(td6);
            let teks = "kd3_" + td1 + "_" + td2;
            let trufals = document.getElementById(teks);
            let hsil = false;
            if (trufals !== null) {
                hsil = (trufals.checked) ? true : false;
            }
            arrtd.push(hsil);

            let teks4 = "kd4_" + td1 + "_" + td4;
            let trufals4 = document.getElementById(teks4);
            let hsil4 = false;
            if (trufals4 !== null) {
                hsil4 = (trufals4.checked) ? true : false;
            }
            arrtd.push(hsil4);


        }
        arr.push(arrtd)
    }
    // console.log(baris);
    // console.log(arr)
    //let starr = JSON.stringify(arr);
    // console.log(starr)
    return arr
}
const datacekliskd = () => {
    let statusupload = document.querySelector(".tabelkkmkd");
    if (statusupload == null) {
        alert("Jenjang Kelas Anda belum mengunggah file KKM dan KD");
        return
    }
    let tes = tabelkearray();
    let data = JSON.stringify(tes);
    let tab = "kelas" + idJenjang;
    let kirimin = new FormData();
    kirimin.append("tabel", data);
    fetch(linkmateri + "&action=simpancekliskd&tab=" + tab, {
        method: "post",
        body: kirimin
    }).then(m => m.json())
        .then(k => {
            alert(k.result);
        })
        .catch(er => alert(er))
    //console.log(tes);
}
const uploadcsv = () => {
    let item = document.querySelector("#uploadcsv").files[0];
    pisahpisah.innerHTML = "<i class='fa fa-refresh fa-spin w3-large'></i>";
    let reader = new FileReader();
    reader.readAsDataURL(item);
    reader.onload = async function (e) {

        let bs64 = e.target.result.replace(/^.*,/, '');

        let data = new FormData();
        data.append("isi", bs64);
        data.append("tab", "kelas" + idJenjang);

        await fetch(linkmateri + "&action=uploadkurikulum", {
            method: "post",
            body: data,
        }).then(m => m.json())
            .then(k => {

                pisahpisah.innerHTML = k.result + `<hr/><button class='w3-button w3-round-large w3-blue' onclick="datacekliskd()">Simpan</button><button class='w3-button w3-round-large w3-red' onclick="hapuskkmkd()">Hapus KKM dan KD</button>`;

                let teks = "<hr/><div style='overflow-x:auto'><table class='versi-table w3-small tabelkkmkd'><tr><th>Mata Pelajaran</th><th>KD-3</th><th>Indikator KI-3 <br>(Pengetahuan)</th><th>KD-4</th><th>Indikator KI-4 <br>(Keterampilan)</th><th>KKM</th></tr>";
                for (i = 1; i < k.arr.length; i++) {
                    //teks += "<tr><td>" + k.arr[i][0] + "</td><td>" + k.arr[i][1] + "</td><td contenteditable='true'>" + k.arr[i][2] + "</td><td>" + k.arr[i][3] + "</td><td contenteditable='true'>" + k.arr[i][4] + "</td><td contenteditable='true'>" + k.arr[i][5] + "</td></tr>"
                    teks += `<tr><td>${k.arr[i][0]}</td><td>${k.arr[i][1]}</td><td contenteditable='true' id="deskripsikd3_${k[i][0]}_${k.arr[i][1]}">${k.arr[i][2]}</td><td>${k.arr[i][3]}</td><td contenteditable='true' id="deskripsikd4_${k[i][0]}_${k.arr[i][3]}" >${k.arr[i][4]}</td><td contenteditable='true'>${k.arr[i][5]}</td></tr>`;
                }

                pisahpisah.innerHTML += teks + "</table></div>";
                alert("Selanjutnya, kami akan menyimpan data ceklis yang sebelumnya Anda isi (jika Ada)");
                datacekliskd();
            })
            .catch(er => {
                alert(er);
            })
    }
}

const hapuskkmkd = () => {
    let konfirmasihapus = confirm("Anda akan menghapus KKM dan KD ini di server. Konfirmasikan bersama teman sejawat Anda bahwa Anda akan menghapus KKM dan KD ini. Apakah Anda yakin?\n\n Klik OK untuk menghapus \nKlik CANCEL untuk membatalkan");
    if (!konfirmasihapus) {
        return
    }
    //alert("Anda menghapus");
    fetch(linkmateri + "&action=hapuskkmkd&tab=kelas" + idJenjang, {
        method: "post"
    })
        .then(m => m.json())
        .then(k => {
            alert(k.result);
            pisahpisah.innerHTML = `Jika Anda belum mengunggah file KKM dan KD di server dan
            membutuhkan format filenya, silakan kunjungi Repository.<br/><br /> Disana akan dijelaskan bagaimana caranya.<hr><label for="uploadcsv"><i class="fa fa-upload w3-button w3-blue w3-round-large"> Unggah File
            Format</i></label><input type="file" onchange="uploadcsv()" id="uploadcsv" class="w3-hide" />`;
        })
        .catch(er => alert(er))

}

const fnprinttabelkkm = (xx) => {
    let idtabel = xx.split(",")[0],
        judul1 = xx.split(",")[1],
        judul2 = xx.split(",")[2],
        tgl = xx.split(",")[3];
    // alert("tes print rekap semeste");

    //datasiswadiv.innerHTML = ""

    //   printPortrait("myTableCopy,Daftar Rekap Absen Kelas "+ruangankelas+", Semester "+ sr+ " Tahun Pelajaran "+idTeksTapel+","+s);
    printPortrait(idtabel + ", " + judul1 + ", " + judul2 + ", " + tgl)
    //datasiswadiv.innerHTML = ""
}