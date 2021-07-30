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

function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
}

function tanggalfull(tgl) {
        var d = new Date(tgl);
        var tgl = d.getDate();
        var bln = d.getMonth();
        var thn = d.getFullYear();
        var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        return tgl + " " + bulan[bln] + " " + thn
}

function tanggalfulllengkap(tgl) {
        var d = new Date(tgl);
        var tgl = d.getDate();
        var bln = d.getMonth();
        var thn = d.getFullYear();
        var jam = d.getHours();
        var menit = d.getMinutes();
        var detik = d.getSeconds()
        var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        return tgl + " " + bulan[bln] + " " + thn + " Pukul " + addZero(jam) + ":" + addZero(menit) + ":" + addZero(detik);
}


const KoleksiIndeksBulandiSemester = (param) => {
        if (param == 1) {
                return [6, 7, 8, 9, 10, 11]
        } else {
                return [0, 1, 2, 3, 4, 5]
        }
}


const SemesterBerapaSekarang = () => { // mengembalikan string/integer berupa angka aja
        let sekarang = new Date();
        let indeksbulan = sekarang.getMonth();
        if (indeksbulan >= 6) {
                return 1

        } else {
                return 2
        }
}

angkasemester = SemesterBerapaSekarang();
const arrayIndeksBulan = KoleksiIndeksBulandiSemester(angkasemester);

const ArraySemesterDanTahunPelajaran = () => { // mengembalikan array berupa [semester, tahun pelajaran]
        let sekarang = new Date();
        let tahunawal, tahunakhir, strrtapel, semester, arr = [];
        let indeksbulan = sekarang.getMonth();
        let tahun = sekarang.getFullYear();
        if (indeksbulan >= 6) {
                semester = 1;
                tahunakhir = tahun + 1;
                tahunawal = tahun;
                strrtapel = tahunawal + "/" + tahunakhir;


        } else {
                semester = 2;
                tahunakhir = tahun;
                tahunawal = tahun - 1;
                strrtapel = tahunawal + "/" + tahunakhir;
        }
        arr.push(semester);
        arr.push(strrtapel);
        return arr


}

const NamaBulandariIndex = (index) => {
        let arraynamabulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        return arraynamabulan[index]


}
const namaBulanDiSemesterBerarpa = (idsemester, indeksbulan) => {
        let bulansemesterganjil = ["Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        let bulansemestergenap = ["Januari", "Februari", "Maret", "April", "Mei", "Juni"];
        if (idsemester == 1) {
                return bulansemesterganjil[indeksbulan]
        }
        else {
                return bulansemestergenap[indeksbulan]

        }
}

const NamaHaridariIndex = (index) => {
        let arraynamabulan = ["Mg", "Sn", "Sl", "Rb", "Km", "Jm", "Sb"];
        return arraynamabulan[index]


}

const kodeidabsen = (tgl) => {
        let d = new Date()
        let dt = d.getDate();
        let m = d.getMonth() + 1;
        let mo = addZero(m);
        let y = d.getFullYear();
        let output = dt + "" + mo + "" + y;
        return output
}

function ade() {
        let d = new Date()
        let dt = d.getDate();
        let m = d.getMonth() + 1;
        let mo = addZero(m);
        let y = d.getFullYear();
        let output = dt + "" + mo + "" + y;
        console.log(output)
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

const BolehEksekusiJikaDiSemesterIni = (strdate) => {//(strdate)
        let bulannya = cekbulandisemesterberapa(strdate);
        let semesteskarang = SemesterBerapaSekarang()
        if (bulannya == semesteskarang) {
                return true
        } else {
                return false
        }

}

const IndeksBulanDiSemesteTertentu = (strdate) => { /// WAJIB DI KOLABORASI DENGAN SKRIP BolehEkseskusiJikaDiSemesterIni
        let bulannya = cekbulandisemesterberapa(strdate); // 1/2
        let semesteskarang = SemesterBerapaSekarang();// 1/2
        let indekbulan = new Date(strdate).getMonth()

        if (semesteskarang == 2) {
                return indekbulan

        } else {
                return indekbulan - 6

        }

}

function cekbulandisemesterberapa(stringdate) { // untuk mengecek (stringdate) "2021-1-1"
        let tgl = new Date(stringdate);
        let parbln = tgl.getMonth()
        // parbulan dalam bentuk index, sehngga Januari memiliki indeks nol
        // Semester 1 {juli, agustus, september, oktober, nopember, desember}
        // dengan index (6, 7, 8, 9, 10, 11)
        // semester 2 (januari, febr, mar, apr, mei, jun)
        // dengan index (0, 1, 2, 3, 4, 5)
        if (parbln >= 6) {
                return 1
        } else {
                return 2
        }

        //console.log(parbln)
        //return parbln
}

const tglStringZero = () => {
        let a = new Date();
        let b = a.getDate();
        let c = a.getMonth() + 1;
        let d = a.getFullYear()
        let idokmateri = addZero(b) + "" + addZero(c) + "" + d;
        return idokmateri
}


function umure(tgllahir) {
        var curday = new Date().getDate();;//document.cir.len11.value;
        var curmon = new Date().getMonth();//.cir.len12.value;
        var curyear = new Date().getFullYear();//.cir.len13.value;

        var calday = new Date(tgllahir).getDate();//document.cir.len21.value;
        var calmon = new Date(tgllahir).getMonth();//document.cir.len22.value;
        var calyear = new Date(tgllahir).getFullYear();//document.cir.len23.value;
        // if(curday == "" || curmon=="" || curyear=="" || calday=="" || calmon=="" || calyear=="")
        // {
        // alert("Mohon Isi semua data -");
        // } 
        // else if(curday == calday &&  curmon==calmon && curyear==calyear)
        // {
        // alert("Sekarang Tanggal Kelahiran Anda & Umur Anda 0 Tahun")
        // }
        // else
        // {
        // var curd = new Date(curyear,curmon-1,curday);
        // var cald = new Date(calyear,calmon-1,calday);
        var curd = new Date(curyear, curmon, curday);
        var cald = new Date(calyear, calmon, calday);

        // var diff = Date.UTC(curyear, curmon, curday, 0, 0, 0)
        //         - Date.UTC(calyear, calmon, calday, 0, 0, 0);

        var dife = datediff(curd, cald);
        let objret = {};
        objret.tahun = dife[0];
        objret.bulan = dife[1];
        objret.hari = dife[2];
        return objret

        //document.cir.val.value=dife[0]+" Tahun, "+dife[1]+" Bulan, Dan "+dife[2]+" hari";

        // var secleft = diff/1000/60;
        // document.cir.val3.value=secleft+" Menit Sejak Anda Lahir";

        // var hrsleft = secleft/60;
        // document.cir.val2.value=hrsleft+" Jam Sejak Anda Lahir";

        // var daysleft = hrsleft/24;
        // document.cir.val1.value=daysleft+" Hari Sejak Anda Lahir"; 

        // //alert(""+parseInt(calyear)+"--"+dife[0]+"--"+1);
        // var as = parseInt(calyear)+dife[0]+1;

        // var diff =  Date.UTC(as,calmon,calday,0,0,0)
        //     - Date.UTC(curyear,curmon,curday,0,0,0);
        // var datee = diff/1000/60/60/24;
        // document.cir.val4.value=datee+" Hari tersisa untuk ulang Tahun Berikutnya"; 


        // }
}

function datediff(date1, date2) {
        var y1 = date1.getFullYear(), m1 = date1.getMonth(), d1 = date1.getDate(),
                y2 = date2.getFullYear(), m2 = date2.getMonth(), d2 = date2.getDate();

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
        with (new Date(Y, M, 1, 12)) {
                setDate(0);
                return getDate();
        }
}

