const JADWAL = {
  "Tasikmalaya - Karangnunggal": ["06:00 WIB","08:00 WIB","10:00 WIB","13:00 WIB","15:00 WIB","17:00 WIB"],
  "Tasikmalaya - Bandung": ["06:00 WIB","08:00 WIB","10:00 WIB","13:00 WIB","16:00 WIB","19:00 WIB"],
  "Tasikmalaya - Jakarta": ["06:00 WIB","08:00 WIB","12:00 WIB","16:00 WIB","19:00 WIB"],
  "Tasikmalaya - Jabodetabek": ["06:00 WIB","08:00 WIB","12:00 WIB","16:00 WIB","19:00 WIB"],
  "Lainnya / Custom": ["06:00 WIB","08:00 WIB","10:00 WIB","13:00 WIB","16:00 WIB","19:00 WIB"]
};

function pilihLayanan(nama){
  document.getElementById('service').value = nama;
  updateForm();
  document.getElementById('booking').scrollIntoView({behavior:'smooth'});
}
function pesanJadwal(rute, jam){
  document.getElementById('service').value = 'Reguler (Leguler)';
  document.getElementById('routeSelect').value = rute;
  updateForm();
  document.getElementById('jadwalReguler').value = jam;
  document.getElementById('booking').scrollIntoView({behavior:'smooth'});
}
function updateForm(){
  const service = document.getElementById('service').value;
  const rute = document.getElementById('routeSelect').value;
  const penumpangBox = document.getElementById('penumpang-box');
  const paketFields = document.getElementById('paket-fields');
  const jadwalBox = document.getElementById('jadwal-reguler-box');
  const jamBebasBox = document.getElementById('jam-bebas-box');
  const jadwalSelect = document.getElementById('jadwalReguler');

  // Update pilihan jam sesuai rute
  if(JADWAL[rute]){
    jadwalSelect.innerHTML = JADWAL[rute].map(j=>`<option value="${j}">${j} ${j.startsWith('06')||j.startsWith('08')?' - Pagi':j.startsWith('10')||j.startsWith('12')||j.startsWith('13')?' - Siang':j.startsWith('15')||j.startsWith('16')?' - Sore':' - Malam'}</option>`).join('');
  }

  if(service === 'Paket Ekspres'){
    penumpangBox.style.display='none';
    paketFields.style.display='block';
    jadwalBox.style.display='none';
    jamBebasBox.style.display='block';
  } else if(service === 'Reguler (Leguler)'){
    penumpangBox.style.display='block';
    paketFields.style.display='none';
    jadwalBox.style.display='block';
    jamBebasBox.style.display='none';
    document.getElementById('passengers').max = 8;
  } else {
    penumpangBox.style.display='block';
    paketFields.style.display='none';
    jadwalBox.style.display='none';
    jamBebasBox.style.display='block';
    document.getElementById('passengers').max = 20;
  }
}
function sendWA(){
  const name=document.getElementById('name').value;
  const phone=document.getElementById('phone').value;
  const service=document.getElementById('service').value;
  const rute=document.getElementById('routeSelect').value;
  const pickup=document.getElementById('pickup').value;
  const destination=document.getElementById('destination').value;
  const date=document.getElementById('date').value;
  const jadwalReguler=document.getElementById('jadwalReguler').value;
  const jamBebas=document.getElementById('time').value;
  const jam = service==='Reguler (Leguler)' ? jadwalReguler : jamBebas;
  const passengers=document.getElementById('passengers').value;
  const payment=document.getElementById('payment').value;
  const jenisPaket=document.getElementById('jenisPaket')?.value||'';
  const jumlahPaket=document.getElementById('jumlahPaket')?.value||'';
  const namaBarang=document.getElementById('namaBarang')?.value||'';
  const beratPaket=document.getElementById('beratPaket')?.value||'';

  if(!name||!phone||!pickup||!destination||!date){alert("Lengkapi semua data dulu bro!");return;}
  if(service==='Paket Ekspres' && !namaBarang){alert("Isi Nama Barang / Isi Paket dulu!");return;}

  const d=new Date(date);
  const tgl=d.toLocaleDateString('id-ID',{day:'2-digit',month:'2-digit',year:'numeric'});
  let msg=`Halo BE TRANS, saya mau pesan:%0A%0A*Nama:* ${name}%0A*No WA:* ${phone}%0A*Rute:* ${rute}%0A*Penjemputan:* ${pickup}%0A*Tujuan:* ${destination}%0A*Tanggal:* ${tgl}%0A*Jam Berangkat:* ${jam} ${service==='Reguler (Leguler)'?'(JADWAL REGULER)':''}%0A*Layanan:* ${service}%0A`;
  if(service==='Paket Ekspres'){
    msg+=`*Jenis Paket:* ${jenisPaket}%0A*Nama Barang:* ${namaBarang}%0A*Jumlah:* ${jumlahPaket} koli%0A*Berat:* ${beratPaket}%0A`;
  } else {
    msg+=`*Jumlah Penumpang:* ${passengers} orang%0A`;
  }
  msg+=`*Pembayaran:* ${payment}%0A%0AMohon konfirmasi ya, terima kasih!`;
  window.open(`https://wa.me/6281949388429?text=${msg}`,'_blank');
}
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('date').min=new Date().toISOString().split('T')[0];
  document.getElementById('time').value='08:00';
  document.getElementById('service').addEventListener('change',updateForm);
  document.getElementById('routeSelect').addEventListener('change',updateForm);
  updateForm();
  const toggle=document.querySelector('.menu-toggle');
  const links=document.querySelector('.nav-links');
  if(toggle){toggle.addEventListener('click',()=>{links.style.display=links.style.display==='flex'?'none':'flex'; if(links.style.display==='flex'){links.style.flexDirection='column';links.style.position='absolute';links.style.top='100%';links.style.left='0';links.style.width='100%';links.style.background='rgba(0,0,0,0.95)';links.style.padding='20px';}});}
});
