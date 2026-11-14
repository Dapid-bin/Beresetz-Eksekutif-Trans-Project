// BE TRANS - Logic Full Beli Tiket

const DESKRIPSI = {
  "Carter / Private Travel": {icon:"🚗", text:"Perjalanan eksklusif untuk keluarga, rombongan, maupun perjalanan pribadi."},
  "Travel Reguler": {icon:"🚌", text:"Layanan perjalanan dengan jadwal dan rute tertentu."},
  "Paket Ekspres": {icon:"📦", text:"Pengiriman paket dan barang secara cepat, praktis, dan terpercaya."},
  "Tour Wisata": {icon:"🏖️", text:"Paket perjalanan wisata untuk keluarga, komunitas, dan rombongan."},
  "Antar-Jemput Anak Sekolah": {icon:"🎒", text:"Layanan antar-jemput sekolah yang praktis dan terjadwal."},
  "Transportasi Event & Acara Khusus": {icon:"🎉", text:"Solusi transportasi untuk acara keluarga, gathering, kunjungan kerja, dan kegiatan lainnya."},
  "Langganan Bulanan": {icon:"📅", text:"Layanan transportasi rutin dengan sistem berlangganan."},
  "Sewa Kendaraan Harian": {icon:"🔑", text:"Pilihan kendaraan untuk kebutuhan perjalanan harian."}
};

const JADWAL = {
  "Tasikmalaya - Karangnunggal": ["06:00 WIB","08:00 WIB","10:00 WIB","13:00 WIB","15:00 WIB","17:00 WIB"],
  "Tasikmalaya - Bandung": ["06:00 WIB","08:00 WIB","10:00 WIB","13:00 WIB","16:00 WIB","19:00 WIB"],
  "Tasikmalaya - Jakarta": ["06:00 WIB","08:00 WIB","12:00 WIB","16:00 WIB","19:00 WIB"],
  "Tasikmalaya - Jabodetabek": ["06:00 WIB","08:00 WIB","12:00 WIB","16:00 WIB","19:00 WIB"],
  "Lainnya / Custom": ["06:00 WIB","08:00 WIB","10:00 WIB","13:00 WIB","16:00 WIB","19:00 WIB"]
};

// Klik Card Layanan -> isi form otomatis + scroll ke form
function pilihLayanan(nama){
  document.getElementById('service').value = nama;
  updateForm();
  document.getElementById('booking').scrollIntoView({behavior:'smooth'});
}

// Klik tombol Pesan Jadwal -> isi Reguler + rute + jam
function pesanJadwal(rute, jam){
  document.getElementById('service').value = 'Travel Reguler';
  document.getElementById('routeSelect').value = rute;
  updateForm();
  document.getElementById('jadwalReguler').value = jam;
  document.getElementById('booking').scrollIntoView({behavior:'smooth'});
}

// Ganti form sesuai layanan
function updateForm(){
  const s = document.getElementById('service').value;
  const rute = document.getElementById('routeSelect').value;
  const d = DESKRIPSI[s];

  // Update deskripsi
  document.getElementById('service-desc-title').innerText = s;
  document.getElementById('service-desc-text').innerText = d.text;
  document.querySelector('#service-desc-box span').innerText = d.icon;

  // Update jam reguler sesuai rute
  const jadwalSelect = document.getElementById('jadwalReguler');
  if(JADWAL[rute]){
    jadwalSelect.innerHTML = JADWAL[rute].map(j => `<option value="${j}">${j}</option>`).join('');
  }

  // Reset semua dulu
  document.getElementById('penumpang-box').style.display = 'block';
  document.getElementById('paket-fields').style.display = 'none';
  document.getElementById('jadwal-reguler-box').style.display = 'none';
  document.getElementById('jam-bebas-box').style.display = 'block';
  document.getElementById('extra-fields').style.display = 'none';
  ['field-tour','field-sekolah','field-event','field-carter'].forEach(id => {
    document.getElementById(id).style.display = 'none';
  });

  if(s === 'Paket Ekspres'){
    document.getElementById('penumpang-box').style.display = 'none';
    document.getElementById('paket-fields').style.display = 'block';
  } else if(s === 'Travel Reguler'){
    document.getElementById('jadwal-reguler-box').style.display = 'block';
    document.getElementById('jam-bebas-box').style.display = 'none';
    document.getElementById('passengers').max = 8;
  } else if(s === 'Tour Wisata'){
    document.getElementById('extra-fields').style.display = 'block';
    document.getElementById('field-tour').style.display = 'block';
  } else if(s === 'Antar-Jemput Anak Sekolah'){
    document.getElementById('extra-fields').style.display = 'block';
    document.getElementById('field-sekolah').style.display = 'block';
  } else if(s === 'Transportasi Event & Acara Khusus'){
    document.getElementById('extra-fields').style.display = 'block';
    document.getElementById('field-event').style.display = 'block';
  } else if(s === 'Carter / Private Travel' || s === 'Sewa Kendaraan Harian' || s === 'Langganan Bulanan'){
    document.getElementById('extra-fields').style.display = 'block';
    document.getElementById('field-carter').style.display = 'block';
    document.getElementById('passengers').max = 20;
  }
}

// Kirim ke WA
function sendWA(){
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const service = document.getElementById('service').value;
  const rute = document.getElementById('routeSelect').value;
  const pickup = document.getElementById('pickup').value;
  const destination = document.getElementById('destination').value;
  const date = document.getElementById('date').value;
  const jam = service === 'Travel Reguler' ? document.getElementById('jadwalReguler').value : document.getElementById('time').value;
  const passengers = document.getElementById('passengers').value;
  const payment = document.getElementById('payment').value;

  if(!name || !phone || !pickup || !destination || !date){
    alert("Mohon lengkapi semua data yang diperlukan!");
    return;
  }
  if(service === 'Paket Ekspres' && !document.getElementById('namaBarang').value){
    alert("Mohon isi Nama Barang / Isi Paketnya dulu!");
    return;
  }
  if(service === 'Antar-Jemput Anak Sekolah' && !document.getElementById('namaAnak').value){
    alert("Mohon isi Nama Anak dulu!");
    return;
  }

  const tgl = new Date(date).toLocaleDateString('id-ID', {day:'2-digit', month:'2-digit', year:'numeric'});

  let msg = `Halo BE TRANS, saya mau pesan:%0A%0A` +
    `*Nama:* ${name}%0A` +
    `*No WA:* ${phone}%0A` +
    `*Layanan:* ${service}%0A` +
    `*Deskripsi:* ${DESKRIPSI[service].text}%0A` +
    `*Rute:* ${rute}%0A` +
    `*Penjemputan:* ${pickup}%0A` +
    `*Tujuan:* ${destination}%0A` +
    `*Tanggal:* ${tgl}%0A` +
    `*Jam:* ${jam} ${service==='Travel Reguler' ? '(JADWAL REGULER)' : ''}%0A`;

  if(service === 'Paket Ekspres'){
    msg += `*Jenis Paket:* ${document.getElementById('jenisPaket').value}%0A` +
      `*Nama Barang:* ${document.getElementById('namaBarang').value}%0A` +
      `*Jumlah:* ${document.getElementById('jumlahPaket').value} koli%0A` +
      `*Berat:* ${document.getElementById('beratPaket').value}%0A`;
  } else {
    msg += `*Jumlah Penumpang:* ${passengers} orang%0A`;
  }

  if(service === 'Tour Wisata'){
    msg += `*Destinasi:* ${document.getElementById('destinasiWisata').value}%0A` +
      `*Durasi Tour:* ${document.getElementById('hariTour').value} hari%0A`;
  }
  if(service === 'Antar-Jemput Anak Sekolah'){
    msg += `*Nama Anak:* ${document.getElementById('namaAnak').value}%0A` +
      `*Sekolah:* ${document.getElementById('namaSekolah').value}%0A` +
      `*Jam Pergi:* ${document.getElementById('jamSekolahPergi').value}%0A` +
      `*Jam Pulang:* ${document.getElementById('jamSekolahPulang').value}%0A`;
  }
  if(service === 'Transportasi Event & Acara Khusus'){
    msg += `*Jenis Acara:* ${document.getElementById('jenisEvent').value}%0A` +
      `*Butuh Unit:* ${document.getElementById('unitEvent').value} unit%0A`;
  }
  if(service === 'Carter / Private Travel' || service === 'Sewa Kendaraan Harian' || service === 'Langganan Bulanan'){
    msg += `*Durasi Sewa:* ${document.getElementById('durasiSewa').value}%0A` +
      `*Paket Sewa:* ${document.getElementById('paketSewa').value}%0A`;
  }

  msg += `*Pembayaran:* ${payment}%0A%0A` + `Mohon konfirmasi ya, terima kasih!`;

  window.open(`https://wa.me/6281949388429?text=${msg}`, '_blank');
}

document.addEventListener('DOMContentLoaded', function(){
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('date').min = today;
  document.getElementById('time').value = '08:00';

  document.getElementById('service').addEventListener('change', updateForm);
  document.getElementById('routeSelect').addEventListener('change', updateForm);
  updateForm();

  // Menu HP
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if(menuToggle){
    menuToggle.addEventListener('click', function(){
      const isOpen = navLinks.style.display === 'flex';
      navLinks.style.display = isOpen ? 'none' : 'flex';
      if(!isOpen){
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%'; navLinks.style.left = '0';
        navLinks.style.width = '100%'; navLinks.style.background = 'rgba(0,0,0,0.95)';
        navLinks.style.padding = '20px'; navLinks.style.gap = '15px';
        navLinks.style.borderTop = '2px solid #ff6b00';
      }
    });
  }
});
