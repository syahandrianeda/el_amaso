window.onscroll = function () { scrollFunction() };
let elementini = document.querySelector(".tomboleditor");
let el_set_kuncipg = document.querySelector(".tekeditorpg");

function scrollFunction() {
    let a = document.querySelector("#idmateri").offsetTop;

    let b = document.querySelector("#loadketKD").offsetTop;// + 20;
    //console.log((rounded >= a && rounded <= b))
    var rounded = Math.round(document.documentElement.scrollTop);
    if (rounded >= a && rounded <= b) {
        elementini.className = elementini.className.replace("l12", "l9");
    } else {
        elementini.className = elementini.className.replace("l9", "l12");

    }
}

// function scrollFunction() {

//     let a = document.querySelector("#idmateri").offsetTop;
//     let b = document.querySelector("#loadketKD").offsetTop + 20;

//     console.log(elementini.offsetWidth)
//     var rounded = Math.round(document.documentElement.scrollTop);
//     if (rounded >= a && rounded <= b) {
//         elementini.setAttribute("style", "position:sticky;top:43px;transition:0.2s;");
//         let cekcol = elementini.className.indexOf("w3-col l12");
//         if(cekcol == -1){
//             elementini.className += " w3-col l";
//         }else{
//             elementini.className = elementini.className.replace("w3-col l3", "")
//         }
//         elementini.className = ` w3-col l9`;
//     } else {
//         elementini.setAttribute("style", "transition:0.2s;width:1320px");
//     }
//}

let btneditor = document.querySelector(".bukatekseditor");
let btneditor2 = document.querySelector(".bukatekseditor2");
let btneditor3 = document.querySelector(".bukatekseditor3");
btneditor.addEventListener("click", function () {
    let x = document.querySelector(".divtekseditor");
    if (x.className.indexOf("w3-show") == -1) {
        x.className = x.className.replace("w3-hide", "w3-show");
        btneditor.innerHTML = `<i class="fa fa-angle-double-up w3-medium"></i>`;
        btneditor2.innerHTML = `<i class="fa fa-angle-double-down w3-medium"></i>`;
        btneditor3.innerHTML = `<i class="fa fa-angle-double-down w3-medium"></i>`;
    } else {
        x.className = x.className.replace("w3-show", "w3-hide");
        btneditor.innerHTML = `<i class="fa fa-angle-double-down w3-medium"></i>`;

    }
    let y = document.querySelector(".divtekseditor2");
    y.className = y.className.replace("w3-show", "w3-hide");
    let z = document.querySelector(".divtekseditor3");
    z.className = z.className.replace("w3-show", "w3-hide");
})

btneditor2.addEventListener("click", function () {
    let x = document.querySelector(".divtekseditor2");
    if (x.className.indexOf("w3-show") == -1) {
        x.className = x.className.replace("w3-hide", "w3-show");
        btneditor2.innerHTML = `<i class="fa fa-angle-double-up w3-medium"></i>`;
        btneditor.innerHTML = `<i class="fa fa-angle-double-down w3-medium"></i>`;
        btneditor3.innerHTML = `<i class="fa fa-angle-double-down w3-medium"></i>`;


    } else {
        x.className = x.className.replace("w3-show", "w3-hide");
        btneditor2.innerHTML = `<i class="fa fa-angle-double-down w3-medium"></i>`;
    }
    let y = document.querySelector(".divtekseditor");
    y.className = y.className.replace("w3-show", "w3-hide");
    let z = document.querySelector(".divtekseditor3");
    z.className = z.className.replace("w3-show", "w3-hide");
})

btneditor3.addEventListener("click", function () {
    let x = document.querySelector(".divtekseditor3");
    if (x.className.indexOf("w3-show") == -1) {
        x.className = x.className.replace("w3-hide", "w3-show");
        btneditor3.innerHTML = `<i class="fa fa-angle-double-up w3-medium"></i>`;
        btneditor2.innerHTML = `<i class="fa fa-angle-double-down w3-medium"></i>`;
        btneditor.innerHTML = `<i class="fa fa-angle-double-down w3-medium"></i>`;


    } else {
        x.className = x.className.replace("w3-show", "w3-hide");
        btneditor3.innerHTML = `<i class="fa fa-angle-double-down w3-medium"></i>`;
    }
    let y = document.querySelector(".divtekseditor");
    y.className = y.className.replace("w3-show", "w3-hide");
    let z = document.querySelector(".divtekseditor2");
    z.className = z.className.replace("w3-show", "w3-hide");
})

let tombol1 = document.querySelector(".ed_ratatengah");
tombol1.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<p class='w3-center'>" + adabaris[i] + "</p>\n";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

})

let tombol2 = document.querySelector(".ed_ratapinggir");
tombol2.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<p class='w3-justify'>" + adabaris[i] + "</p>\n";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

})

let tombol3 = document.querySelector(".ed_ratakanan");
tombol3.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<p class='w3-right-align'>" + adabaris[i] + "</p>\n";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

})
let tombol4 = document.querySelector(".ed_ratakiri");
tombol4.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<p class='w3-left-align'>" + adabaris[i] + "</p>\n";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

})

let tombol5 = document.querySelector(".ed_tebalkan");
tombol5.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<b>" + adabaris[i] + "</b>";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

})
let tombol6 = document.querySelector(".ed_miringkan");
tombol6.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<i>" + adabaris[i] + "</i>";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

})
let tombol7 = document.querySelector(".ed_garisbawah");
tombol7.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<u>" + adabaris[i] + "</u>";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

})
let tombol8 = document.querySelector(".ed_semuakapital");
tombol8.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<span style='text-transform:uppercase'>" + adabaris[i] + "</span>";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

})

let tombol9 = document.querySelector(".ed_semuahurufkecil");
tombol9.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<span style='text-transform:lowercase'>" + adabaris[i] + "</span>";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

})

let tombol10 = document.querySelector(".ed_tiapawalkatakapital");
tombol10.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<span style='text-transform:capitalize'>" + adabaris[i] + "</span>";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

})

let tombol11 = document.querySelector(".ed_pangkat");
tombol11.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<sup>" + adabaris[i] + "</sup>";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

})

let tombol12 = document.querySelector(".ed_subtitle");
tombol12.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<sub>" + adabaris[i] + "</sub>";
        }
    }

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

})

let tombol13 = document.querySelector(".ed_listnomor");
tombol13.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "<ol style='list-style-type:decimal;margin-left:-15px'>\n";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<li>" + adabaris[i] + "\n</li>";
        }
    }
    replace += "</ol>\n"

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

})

let tombol14 = document.querySelector(".ed_listabjadkapital");
tombol14.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "<ol style='list-style-type:upper-alpha;margin-left:-15px'>\n";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<li>" + adabaris[i] + "\n</li>";
        }
    }
    replace += "</ol>\n"

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

})
let tombol15 = document.querySelector(".ed_listabjadnonkapital");
tombol15.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "<ol style='list-style-type:lower-alpha;margin-left:-15px'>\n";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<li>" + adabaris[i] + "\n</li>";
        }
    }
    replace += "</ol>\n"

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

})
let tombolbul = document.querySelector(".ed_listbulet");
tombolbul.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "<ul style='list-style-type:circle;margin-left:-15px'>\n";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<li>" + adabaris[i] + "\n</li>";
        }
    }
    replace += "</ul>\n"

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

})
let tombolcustom = document.querySelector(".ed_listcustom");
tombolcustom.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "<ul style='list-style-type:none;margin-left:-15px'>\n";
    let adabaris = sel.split("\n");
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            replace += "<li>" + adabaris[i] + "\n</li>";
        }
    }
    replace += "</ul>\n"

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

})

let btn_mtk = document.querySelector(".ed_pecahanbiasa");
btn_mtk.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let adabaris = sel.split("/");

    if (adabaris.length !== 2) {
        alert("tanda garis miring harus satu yang diblok");
        return
    }
    let replace = " _PECAHAN-BIASA_" + adabaris[0].replace(/\s+/g, "") + "/" + adabaris[1].replace(/\s+/g, "") + " ";


    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

})
let btn_mtk2 = document.querySelector(".ed_pecahancampuran");
btn_mtk2.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let adabaris = sel.split("/");

    if (adabaris.length !== 3) {
        alert("tanda garis miring harus dua yang diblok: misal 2/3/4");
        return
    }
    let replace = " _PECAHAN-CAMPURAN_" + adabaris[0].replace(/\s+/g, "") + "/" + adabaris[1].replace(/\s+/g, "") + "/" + adabaris[2].replace(/\s+/g, "") + " ";


    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

})
let btn_mtk3 = document.querySelector(".ed_pangkatn");
btn_mtk3.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let adabaris = sel.split("/");

    if (adabaris.length !== 2) {
        alert("tanda garis miring harus dua yang diblok: misal 2/3");
        return
    }
    let replace = " _PANGKAT_" + adabaris[0].replace(/\s+/g, "") + "/" + adabaris[1].replace(/\s+/g, "") + " ";


    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});

let btn_mtk4 = document.querySelector(".ed_akarkuadrat");
btn_mtk4.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " _AKAR-KUADRAT_" + sel.replace(/\s+/g, "") + " ";



    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});
let btn_mtk5 = document.querySelector(".ed_akarpangkattiga");
btn_mtk5.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " _AKAR-TIGA_" + sel.replace(/\s+/g, "") + " ";




    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});
let btn_mtk6 = document.querySelector(".ed_kali");
btn_mtk6.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " &times; " + sel + " ";




    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});
let btn_mtk7 = document.querySelector(".ed_bagi");
btn_mtk7.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " &div; " + sel + " ";




    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

})
    ;
let btn_mtk8 = document.querySelector(".ed_sudut");
btn_mtk8.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " &ang; " + sel + " ";




    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});
let btn_mtk9 = document.querySelector(".ed_lebihkecilsamadengan");
btn_mtk9.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " &le; " + sel + " ";




    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});
let btn_mtk10 = document.querySelector(".ed_lebihbesarsamadengan");
btn_mtk10.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " &ge; " + sel + " ";




    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});
let btn_mtk11 = document.querySelector(".ed_plusminus");
btn_mtk11.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " &PlusMinus; " + sel + " ";
    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);

});
let btn_mtk12 = document.querySelector(".ed_derajatsuhu");
btn_mtk12.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "&#176; " + sel + " ";
    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});
let btn_mtk13 = document.querySelector(".ed_ceklis");
btn_mtk13.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = "&checkmark; " + sel + " ";
    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});
let btn_mtk14 = document.querySelector(".ed_pi");
btn_mtk14.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " &#8508; " + sel + " ";
    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});
let btn_mtk15 = document.querySelector(".ed_panahkiri");
btn_mtk15.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " &larr; " + sel + " ";
    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});
let btn_mtk16 = document.querySelector(".ed_panahkanan");
btn_mtk16.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " &rarr; " + sel + " ";
    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});
let btn_mtk17 = document.querySelector(".ed_panahkiridobel");
btn_mtk17.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " &DoubleLongLeftArrow; " + sel + " ";
    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});
let btn_mtk18 = document.querySelector(".ed_panahkanandobel");
btn_mtk18.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);

    let replace = " &DoubleLongRightArrow; " + sel + " ";
    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
})

let btn_elamaso = document.querySelector(".ed_pgd");
btn_elamaso.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");
    var x = document.querySelector(".in_pgd").value;

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);
    let adabaris = sel.split("\n");
    let abjadopsi = ["", "A", "B", "C", "D"]
    if (adabaris.length !== 5) {
        alert("Maaf, area yang diblok harus 5 baris. Jika Soal/Opsi Anda lebih satu paragraf, gunakan fitur PETUNJUK");
        return
    }
    let replace = "";
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            if (i == 0) {
                let tekssoal = adabaris[i].slice(adabaris[i].indexOf(".") + 1, adabaris[i].length).replace(/\t/g, "");
                replace += "_PG_" + x + " " + tekssoal + "\n";
            } else {
                replace += "_OPSI-PG_" + x + abjadopsi[i] + " " + adabaris[i].slice(2, adabaris[i].length).replace(/\t/g, "") + "\n";
            }

        }
    }
    // replace += "</ol>\n"

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
});
let btn_elamaso2 = document.querySelector(".ed_pgc");
btn_elamaso2.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");
    var x = document.querySelector(".in_pgc").value;

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);
    let adabaris = sel.split("\n");
    let abjadopsi = ["", "A", "B", "C", ""]
    if (adabaris.length !== 4) {
        alert("Maaf, area yang diblok harus 4 baris. Jika Soal/Opsi Anda lebih satu paragraf, gunakan fitur PETUNJUK");
        return
    }
    let replace = "";
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            if (i == 0) {
                let tekssoal = adabaris[i].slice(adabaris[i].indexOf(".") + 1, adabaris[i].length).replace(/\t/g, "");
                replace += "_PG_" + x + " " + tekssoal + "\n";
            } else {
                replace += "_OPSI-PG-C_" + x + abjadopsi[i] + " " + adabaris[i].slice(2, adabaris[i].length).replace(/\t/g, "") + "\n";
            }

        }
    }
    // replace += "</ol>\n"

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
})
let btn_elamaso3 = document.querySelector(".ed_pgtabel");
btn_elamaso3.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");
    var x = document.querySelector(".in_pgtabel").value;

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);
    let adabaris = sel.split("\n");
    let abjadopsi = ["", "", "A", "B", "C", "D"]
    if (adabaris.length !== 6) {
        alert("Maaf, area yang diblok harus 6 baris (termasuk harus ada header opsi PG). Jika Soal/Opsi Anda lebih satu paragraf, gunakan fitur PETUNJUK \n \n Keterangan lebih lanjut, lihat Repository");
        return
    }
    let replace = "";
    for (i = 0; i < adabaris.length; i++) {
        if (adabaris[i].length > 0) {
            if (i == 0) {
                let tekssoal = adabaris[i].slice(adabaris[i].indexOf(".") + 1, adabaris[i].length).replace(/\t/g, "");
                replace += "_PG_" + x + " " + tekssoal + "\n";
            } else if (i == 1) {
                replace += "_START-TABEL-OPSI_\n";
                replace += adabaris[i].slice(0, adabaris[i].length).replace(/\t/g, " <|HEADER|> ") + "\n";
            } else {
                replace += "_OPSI-SEL_" + x + abjadopsi[i] + " <|> " + adabaris[i].slice(2, adabaris[i].length).replace(/\t/g, " <|> ") + "\n";
            }
        }
    }

    replace += "_SELESAI-TABEL-OPSI_\n";

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
})
let btn_elamaso4 = document.querySelector(".ed_essay");
btn_elamaso4.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");
    var x = document.querySelector(".in_essay").value;

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);
    var replace = "_ESSAY-NO_" + x + " " + sel.slice(sel.indexOf(".") + 1, sel.length).replace(/\t/g, "").replace(/\n/g, " <br> ");

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
})
let btn_elamaso5 = document.querySelector(".ed_satubariskan");
btn_elamaso5.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");


    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);
    var replace = sel.slice(0, sel.length).replace(/\n/g, " <br> ");

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
})

let btn_elamaso6 = document.querySelector(".ed_tabel");
btn_elamaso6.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");
    var x = document.getElementById("ed_headertabel");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);
    let adabaris = sel.split("\n");

    let replace = "\n_START-TABEL_\n";
    if (x.checked) {
        for (i = 0; i < adabaris.length; i++) {
            if (i == 0) {
                replace += adabaris[i].slice(0, adabaris[i].length).replace(/\t/g, " <|HEADER|> ") + "\n";
            } else {
                replace += adabaris[i].slice(0, adabaris[i].length).replace(/\t/g, " <|> ") + "\n";

            }
        }

    } else {
        for (i = 0; i < adabaris.length; i++) {
            replace += adabaris[i].slice(0, adabaris[i].length).replace(/\t/g, " <|> ") + "\n";
        }

    }

    replace += "_SELESAI-TABEL_\n";

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
})
let btn_elamaso7 = document.querySelector(".ed_youtube");
btn_elamaso7.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);


    let replace = "\n_YOUTUBE_" + sel;
    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
})
let btn_elamaso8 = document.querySelector(".ed_pemisahkunci");
btn_elamaso8.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");

    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);


    let replace = " <||> " + sel;
    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
})

let btn_elamasosbk = document.querySelector(".ed_sebarankddaritabel");
btn_elamasosbk.addEventListener("click", function () {
    var textarea = document.getElementById("idmateri");


    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);
    let adabaris = sel.split("\n");

    let replace = "\n_KUNCI-KD_";

    for (i = 0; i < adabaris.length; i++) {
        if (i !== 0) {
            //replace += adabaris[i].slice(0, adabaris[i].length).replace(/\t/g, " <||> ");//+ "\n";
            replace += adabaris[i].split("\t")[0] + "_" + adabaris[i].split("\t")[1] + ":" + adabaris[i].split("\t")[2];//+ "<||>";
            if (i !== adabaris.length - 1) {
                replace += "<||>"
            }
        }

    }



    // replace += "_SELESAI-TABEL_\n";

    textarea.value = textarea.value.substring(0, start) + replace + textarea.value.substring(end, len);
})
