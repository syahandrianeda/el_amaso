$('#cmd').click(function () {
    var pdf = new jsPDF('p', 'pt', 'letter'),
        source = document.getElementById('fromHTMLtestdiv'),
        specialElementHandlers = {
            '#bypassme': function (element, renderer) {
                return true
            },
            '.hide': function (element, renderer) {
                return true
            }
        }
    var margins = {
        top: 10,
        bottom: 10,
        left: 10,
        width: 522
    };
    pdf.fromHTML(source, margins.left, margins.top, {
            'width': margins.width,
            'elementHandlers': specialElementHandlers
        },
        function (dispose) {
            var NamaFileLamaso = namasiswa;
            pdf.save(NamaFileLamaso + '.pdf');
        }, margins)
});