// WhatsApp Booking Function
function sendWA() {
    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const pickup = document.getElementById('pickup').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const passengers = document.getElementById('passengers').value;
    const payment = document.getElementById('payment').value;

    // Format date and time
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const formattedTime = time;
    const datetime = `${formattedDate} ${formattedTime}`;

    // WhatsApp numbers (can choose which one to use)
    const waNumbers = [
        "6285861461473",  // Primary number
        "6282116725720"   // Alternative number
    ];

    // Validation
    if (!name || !phone || !pickup || !destination || !date || !time) {
        alert("Mohon lengkapi semua data yang diperlukan (Nama, WhatsApp, Alamat, Tujuan, Tanggal & Waktu)!");
        return;
    }

    // Format the message according to instructions
    const message = `Halo BE TRANS, saya ingin pesan travel:%0A%0A` +
        `*Nama lengkap:* ${name}%0A` +
        `*No WhatsApp aktif:* ${phone}%0A` +
        `*Alamat penjemputan lengkap:* ${pickup}%0A` +
        `*Tujuan lengkap:* ${destination}%0A` +
        `*Tanggal dan waktu keberangkatan:* ${datetime}%0A` +
        `*Jumlah penumpang:* ${passengers}%0A` +
        `*Layanan yang dipesan:* ${service}%0A` +
        `*Metode pembayaran:* ${payment}%0A%0A` +
        `Mohon segera dikonfirmasi ya, terima kasih!`;

    // Open WhatsApp (using primary number)
    window.open(`https://wa.me/${waNumbers[0]}?text=${message}`, '_blank');
}

// Set minimum date to today
document.addEventListener('DOMContentLoaded', function() {
    // Set min date for booking
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
    
    // Set default time to next hour
    const now = new Date();
    const nextHour = new Date(now.getTime() + 60 * 60 * 1000);
    const hours = nextHour.getHours().toString().padStart(2, '0');
    const minutes = nextHour.getMinutes().toString().padStart(2, '0');
    document.getElementById('time').value = `${hours}:${minutes}`;
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(0,0,0,0.95)';
                navLinks.style.padding = '20px';
                navLinks.style.gap = '15px';
                navLinks.style.borderTop = '2px solid var(--main)';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        navLinks.style.display = 'none';
                    }
                }
            }
        });
    });
    
    // Form validation enhancement
    const formInputs = document.querySelectorAll('.booking-card input, .booking-card select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#ff4444';
            } else {
                this.style.borderColor = '#27ae60';
                setTimeout(() => {
                    this.style.borderColor = 'var(--gray-dark)';
                }, 1500);
            }
        });
    });
    
    // Service card hover effect enhancement
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Update passenger input limits based on service type
    const serviceSelect = document.getElementById('service');
    const passengerInput = document.getElementById('passengers');
    
    serviceSelect.addEventListener('change', function() {
        const service = this.value;
        
        if (service.includes('Carter') || service.includes('Private')) {
            passengerInput.max = 20;
            passengerInput.placeholder = "Maks 20 penumpang";
        } else if (service.includes('Reguler')) {
            passengerInput.max = 8;
            passengerInput.placeholder = "Maks 8 penumpang";
        } else if (service.includes('Sewa Harian')) {
            passengerInput.max = 15;
            passengerInput.placeholder = "Maks 15 penumpang";
        } else {
            passengerInput.max = 20;
            passengerInput.placeholder = "Jumlah penumpang";
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(0,0,0,0.98)';
        nav.style.padding = '10px 5%';
        nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
    } else {
        nav.style.background = 'rgba(0,0,0,0.95)';
        nav.style.padding = '15px 5%';
        nav.style.boxShadow = 'none';
    }
});