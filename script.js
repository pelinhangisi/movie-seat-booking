const container = document.querySelector('.container');
const koltuklar = document.querySelectorAll('.row .koltuk:not(.dolu)');
const count =document.getElementById('count');
const total =document.getElementById('total');
const filmSecimi= document.getElementById('film');


populateUI();


let biletFiyat = +filmSecimi.value;


// Seçili Filmin Index ve Fiyatını Kaydetmek
function setFilmData(filmIndex, filmFiyat){
    localStorage.setItem('seciliFilmIndex', filmIndex);
    localStorage.setItem('seciliFilmFiyat',filmFiyat);
}


// Fiyat ve Seçili Koltuk Adet Sayısını Güncelleyecek Fonksiyon
function updateSeciliCount() {
    const seciliKoltuklar = document.querySelectorAll('.row .koltuk.secili');

    const koltuklarIndex = [...seciliKoltuklar].map((koltuk) => [...koltuklar].indexOf(koltuk));
    
    localStorage.setItem('seciliKoltuklar', JSON.stringify(koltuklarIndex));

    const seciliKoltuklarinSayisi = seciliKoltuklar.length;

    count.innerText = seciliKoltuklarinSayisi;
    total.innerText = seciliKoltuklarinSayisi * biletFiyat;
}


// localStorage kısmından verile alıp ekrana yazdırma
function populateUI(){
    const seciliKoltuklar = JSON.parse(localStorage.getItem('seciliKoltuklar'));

    if(seciliKoltuklar !== null && seciliKoltuklar.length >0) {
        koltuklar.forEach((koltuk,index) => {
            if(seciliKoltuklar.indexOf(index) > -1){
                koltuk.classList.add('secili');
            }
        });
    }

    const seciliFilmIndex = localStorage.getItem('seciliFilmIndex');

    if(seciliFilmIndex !== null) {
        filmSecimi.seciliIndex = seciliFilmIndex;
    }
}


// Film Seçimi Değiştiğinde Fiyat Değişmesi
filmSecimi.addEventListener('change', (e) => {
    biletFiyat = +e.target.value;
    setFilmData(e.target.seciliIndex, e.target.value);
    updateSeciliCount();
});


// Koltuk Seçimi
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('koltuk') && !e.target.classList.contains('dolu') ) {
        e.target.classList.toggle('secili');

        updateSeciliCount();
    }
});


updateSeciliCount();