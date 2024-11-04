// Definisi Class novel
class novel {
    constructor(judul) {
        this.judul = judul;
    }

    tampilkanInfo() {
        return `${this.judul}`;
    }
}

// Array untuk menyimpan daftar novel dan novel favorit
let daftarnovel = [];
let novelFavorit = [];

// Mengambil elemen DOM
const formTambahnovel = document.getElementById('form-tambah-novel');
const divDaftarnovel = document.getElementById('daftar-novel');
const divnovelFavorit = document.getElementById('novel-favorit');
const btnSimpanNama = document.getElementById('btnSimpanNama');
const salamPengguna = document.getElementById('salamPengguna');

// Event Listener untuk Form Tambah novel
formTambahnovel.addEventListener('submit', function (e) {
    e.preventDefault();
    tambahnovel();
});

// Fungsi untuk menambahkan novel ke daftar
function tambahnovel() {
    const judul = document.getElementById('judul').value;

    // Validasi input
    if (judul === '') {
        alert('Semua kolom harus diisi!');
        return;
    }

    const novelBaru = new novel(judul);
    daftarnovel.push(novelBaru);
    simpanDaftarnovel(); // Simpan daftar novel setelah menambahkan novel baru
    tampilkanDaftarnovel();
    formTambahnovel.reset();
}

// Fungsi untuk menyimpan daftar novel ke Local Storage
function simpanDaftarnovel() {
    localStorage.setItem('daftarnovel', JSON.stringify(daftarnovel));
}

// Fungsi untuk menampilkan daftar novel
function tampilkanDaftarnovel() {
    divDaftarnovel.innerHTML = '';

    daftarnovel.forEach((novel, index) => {
        const divnovel = document.createElement('div');
        divnovel.classList.add('novel');
        divnovel.innerHTML = `
            <br>
            <p>${novel.tampilkanInfo()}</p>
            <br>
            <button onclick="tambahKeFavorit(${index})" style="margin-left: 1px;">Tambah ke Favorit</button>
            <button onclick="hapusDariDaftar(${index})" style="background-color: red; margin-left: 1px;">Sudah Di Baca</button>
            <br><br>
        `;
        divDaftarnovel.appendChild(divnovel);
    });
}

// Fungsi untuk menambahkan novel ke favorit
function tambahKeFavorit(index) {
    const novel = daftarnovel[index];

    // Cek apakah novel sudah ada di favorit
    const sudahAda = novelFavorit.some(favnovel => {
        return favnovel.judul === novel.judul;
    });

    if (sudahAda) {
        alert('Novel ini sudah ada di daftar favorit!');
        return;
    }

    novelFavorit.push(novel);
    simpannovelFavorit();
    tampilkannovelFavorit();
}

// Fungsi untuk menyimpan novel favorit ke Local Storage
function simpannovelFavorit() {
    localStorage.setItem('novelFavorit', JSON.stringify(novelFavorit));
}

// Fungsi untuk menampilkan novel favorit
function tampilkannovelFavorit() {
    divnovelFavorit.innerHTML = '';

    novelFavorit.forEach((novel, index) => {
        const divnovel = document.createElement('div');
        divnovel.classList.add('novel');
        divnovel.innerHTML = `
            <br>
            <p>${novel.tampilkanInfo()}</p>
            <br>
            <button onclick="hapusDariFavorit(${index})" style="background-color: red; margin-left: 1px;">Hapus</button>
            <br><br>
        `;
        divnovelFavorit.appendChild(divnovel);
    });
}

// Fungsi untuk menghapus novel dari favorit
function hapusDariFavorit(index) {
    novelFavorit.splice(index, 1);
    simpannovelFavorit();
    tampilkannovelFavorit();

    if(hapusDariFavorit) {
        alert('Apakah Anda Yakin Ingin Menghapus Dari Favorit ? ');
        return;
    }
}

//Fungsi untuk menghapus novel dari daftar
function hapusDariDaftar(index) {
    daftarnovel.splice(index, 1);
    simpanDaftarnovel();
    tampilkanDaftarnovel();

    if(hapusDariDaftar) {
        alert('Apakah Anda Yakin Ingin Menghapus Dari Daftar novel ? ');
        return;
    }
}

// Event Listener untuk tombol simpan nama pengguna
btnSimpanNama.addEventListener('click', function () {
    const nama = document.getElementById('namaPengguna').value;
    if (nama === '') {
        alert('Masukkan nama Anda!');
        return;
    }
    sessionStorage.setItem('namaPengguna', nama);
    tampilkanNamaPengguna();
    document.getElementById('namaPengguna').value = '';
});

// Fungsi untuk menampilkan nama pengguna
function tampilkanNamaPengguna() {
    const nama = sessionStorage.getItem('namaPengguna');

    if (nama) {
        salamPengguna.textContent = `Hai . . . , ${nama}!`;
    } else {
        salamPengguna.textContent = '';
    }
}

// Memuat data saat halaman dimuat
window.onload = function () {
    // Memuat daftar novel dari Local Storage
    if (localStorage.getItem('daftarnovel')) {
        const storedBooks = JSON.parse(localStorage.getItem('daftarnovel'));
        // Rekonstruksi objek novel menjadi instance dari kelas novel
        daftarnovel = storedBooks.map(book => {
            return new novel(book.judul);
        });
        tampilkanDaftarnovel();
    }

    // Memuat novel favorit dari Local Storage
    if (localStorage.getItem('novelFavorit')) {
        const storedFavorites = JSON.parse(localStorage.getItem('novelFavorit'));
        // Rekonstruksi objek novel menjadi instance dari kelas novel
        novelFavorit = storedFavorites.map(book => {
            return new novel(book.judul);
        });
        tampilkannovelFavorit();
    }

    // Menampilkan nama pengguna dari Session Storage
    tampilkanNamaPengguna();
};

function btntop(){document.querySelector('.btn-to-top').addEventListener('click', () => {
    window.location.replace('#');
})}