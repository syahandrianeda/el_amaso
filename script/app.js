const versisw = new Date().getTime();
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
            console.log('Teregistrasi', reg);
        })
        .catch((er) => console.log("Gagal Teregistrasi", er));

}