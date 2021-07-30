function tanggalfull(tgl) {
    var d = new Date(tgl);
    var tgl = d.getDate();
    var bln = d.getMonth();
    var thn = d.getFullYear();
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return tgl + " " + bulan[bln] + " " + thn
}
function formatbalikin(tekss) {
    let teks = tekss.toString();
    let str = teks.split(" ");
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    let date = new Date(str[2], bulan.indexOf(str[1]), str[0]);
    return date;
}

function umur(tgllahir) {
    var curday = new Date().getDate();;//document.cir.len11.value;
    var curmon = new Date().getMonth();//.cir.len12.value;
    var curyear = new Date().getFullYear();//.cir.len13.value;

    var calday = new Date(tgllahir).getDate();//document.cir.len21.value;
    var calmon = new Date(tgllahir).getMonth();//document.cir.len22.value;
    var calyear = new Date(tgllahir).getFullYear();//document.cir.len23.value;

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

const StringTanggal = (tgl) => { //parameter tgl bentuk tgl
    let m = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let y = tgl.getFullYear();


    let string = y + "-" + addZero(m) + "-" + addZero(d);


    //console.log(string)
    return string
}

const StringTanggal2 = (tgl) => { //parameter tgl bentuk tgl
    let m = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let y = tgl.getFullYear();


    let string = y + "-" + m + "-" + d;


    //console.log(string)
    return string
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

const CountDown = (d) => {
    let tgl = new Date(d).getTime();
    let now = new Date().getTime();
    let data = {};
    var tahun, month, days;
    if (tgl > now) {
        data.time = "akan datang"
        var distance = tgl - now;
        tahun = Math.floor(distance / (1000 * 60 * 60 * 24 * 30 * 12));
        month = Math.floor(distance % (1000 * 60 * 60 * 24 * 30 * 12) / (1000 * 60 * 60 * 24 * 30));
        days = Math.floor(distance / (1000 * 60 * 60 * 24));
    } else {
        data.time = "masa lalu"
        var distance = now - tgl;
        tahun = umur(d).tahun;
        month = umur(d).bulan;
        days = umur(d).days;
        // tahun = Math.floor(distance / (1000 * 60 * 60 * 24 * 30 * 12));
        // month = Math.floor(distance % (1000 * 60 * 60 * 24 * 30 * 12) / (1000 * 60 * 60 * 24 * 30));
        // days = Math.floor(distance / (1000 * 60 * 60 * 24));
    }

    // Time calculations for days, hours, minutes and seconds
    data.tahun = tahun;
    data.bulan = month;
    data.hari = days;
    return data

}

const NamaBulandariIndex = (index) => {
    let arraynamabulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return arraynamabulan[index]


}

const NamaHaridariIndex = (index) => {
    let arraynamabulan = ["Mg", "Sn", "Sl", "Rb", "Km", "Jm", "Sb"];
    return arraynamabulan[index]


}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
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


const tglStringZero = () => { // return= 
    let a = new Date();
    let b = a.getDate();
    let c = a.getMonth() + 1;
    let d = a.getFullYear()
    let idokmateri = b + "" + addZero(c) + "" + d;
    return idokmateri
}

const balikinidok = (teks) => { /// hasil: 2021-3-1
    // kondisi1 = "10032021"
    // kondisi2 = "1032021"
    //let ddd = teks.splice(-6)
    let d, m, y
    if (teks.length == 8) {
        d = teks.slice(0, 2);
        m = teks.slice(2, 4);
        y = teks.slice(4, 8);
    } else {
        d = teks.slice(0, 1);
        m = teks.slice(1, 3);
        y = teks.slice(3, 7);
    }
    let str = y + "-" + deleteZero(m) + "-" + deleteZero(d)
    return str
}
const zerozeroidok = () => { // return= 
    let a = new Date();
    let b = a.getDate();
    let c = a.getMonth() + 1;
    let d = a.getFullYear()
    let idokmateri = addZero(b) + "" + addZero(c) + "" + d;
    return idokmateri
}