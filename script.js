const workersDB = [
    { name: "Sunita Devi", role: "Maid", area: "Dwarka", rating: 4.8, education: "Literate", image: "https://randomuser.me/api/portraits/women/11.jpg", costs: { hourly: 200, daily: 1500, monthly: 30000 } },
    { name: "Ramesh Kumar", role: "Cleaner", area: "Bandra", rating: 3.5, education: "Illiterate", image: "https://randomuser.me/api/portraits/men/22.jpg", costs: { hourly: 150, daily: 1200, monthly: 25000 } },
    { name: "Anita Singh", role: "Cook", area: "Dwarka", rating: 2.5, education: "Literate", image: "https://randomuser.me/api/portraits/women/33.jpg", costs: { hourly: 180, daily: 1400, monthly: 28000 } },
    { name: "Rajesh Gupta", role: "Sweeper", area: "Connaught Place", rating: 4.2, education: "Literate", image: "https://randomuser.me/api/portraits/men/44.jpg", costs: { hourly: 120, daily: 1000, monthly: 20000 } },
    { name: "Priya Sharma", role: "Maid", area: "Bandra", rating: 4.9, education: "Literate", image: "https://randomuser.me/api/portraits/women/55.jpg", costs: { hourly: 220, daily: 1600, monthly: 32000 } },
    { name: "Mohan Lal", role: "Cleaner", area: "Indiranagar", rating: 2.9, education: "Illiterate", image: "https://randomuser.me/api/portraits/men/66.jpg", costs: { hourly: 130, daily: 1100, monthly: 22000 } }
];

const container = document.getElementById('workerContainer');

function getRatingConfig(rating) {
    if (rating >= 4.5) return { class: 'card-green', colorClass: 'text-green', label: 'Premium' };
    if (rating >= 3.0) return { class: 'card-blue', colorClass: 'text-blue', label: 'Good' };
    return { class: 'card-red', colorClass: 'text-red', label: 'Low/New' };
}

function displayWorkers(data) {
    container.innerHTML = "";
    if (data.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748b;">
            <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 10px;"></i>
            <p>No workers found in this area/category.</p>
        </div>`;
        return;
    }
    data.forEach(worker => {
        const config = getRatingConfig(worker.rating);
        const card = `
            <div class="worker-card ${config.class}">
                <div class="card-body">
                    <div class="card-top">
                        <div class="card-img">
                            <img src="${worker.image}" alt="${worker.name}">
                        </div>
                        <div class="card-info">
                            <h3>${worker.name}</h3>
                            <span class="verified"><i class="fas fa-shield-alt"></i> Verified</span>
                        </div>
                        <div class="rating-score ${config.colorClass}">
                            ${worker.rating} <i class="fas fa-star"></i>
                        </div>
                    </div>
                    <div class="card-details">
                        <p><i class="fas fa-user-tag"></i> <strong>Role:</strong> ${worker.role}</p>
                        <p><i class="fas fa-map-marker-alt"></i> <strong>Area:</strong> ${worker.area}</p>
                        <p><i class="fas fa-graduation-cap"></i> <strong>Education:</strong> ${worker.education}</p>
                        <p><i class="fas fa-info-circle"></i> <strong>Status:</strong> ${config.label}</p>
                        <p><i class="fas fa-money-bill-wave"></i> <strong>Hourly:</strong> ₹${worker.costs.hourly} | <strong>Daily:</strong> ₹${worker.costs.daily} | <strong>Monthly:</strong> ₹${worker.costs.monthly}</p>
                    </div>
                    <button class="btn-contact" onclick="openBookingModal('${worker.name}')">
                        Book ${worker.name.split(' ')[0]}
                    </button>
                </div>
            </div>`;
        container.innerHTML += card;
    });
}

function filterWorkers() {
    const areaInput = document.getElementById('areaInput').value.toLowerCase();
    const roleSelect = document.getElementById('roleSelect').value;
    const filtered = workersDB.filter(worker => {
        const matchesArea = worker.area.toLowerCase().includes(areaInput);
        const matchesRole = roleSelect === 'all' || worker.role === roleSelect;
        return matchesArea && matchesRole;
    });
    displayWorkers(filtered);
}

// Booking Modal Logic
const bookingModal = document.getElementById('bookingModal');
const bookingForm = document.getElementById('bookingForm');
const durationType = document.getElementById('durationType');
const endDateWrapper = document.getElementById('endDateWrapper');
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
let selectedWorker = "";

function openBookingModal(name) {
    selectedWorker = name;
    document.getElementById('bookingTitle').innerText = `Book ${name}`;
    bookingModal.style.display = "flex";
    bookingForm.reset();
    endDateWrapper.style.display = "none";
    durationType.value = "single";
}

function closeBookingModal() {
    bookingModal.style.display = "none";
    bookingForm.reset();
}

durationType.addEventListener('change', function() {
    if (this.value === "range") {
        endDateWrapper.style.display = "block";
        endDateInput.required = true;
    } else {
        endDateWrapper.style.display = "none";
        endDateInput.required = false;
    }
});

startDateInput.addEventListener('change', function() {
    if (this.value) {
        endDateInput.min = this.value;
        if (endDateInput.value && endDateInput.value < this.value) {
            endDateInput.value = this.value;
        }
    }
});

bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const start = startDateInput.value;
    let end = endDateInput.value;

    if (durationType.value === "single") {
        end = start;
    } else if (!end) {
        end = start;
    }

    alert(`Booking confirmed for ${selectedWorker}\nFrom: ${start}\nTo: ${end}`);
    closeBookingModal();
});

window.addEventListener('click', (e) => {
    if (e.target === bookingModal) closeBookingModal();
});

// Worker Registration
document.getElementById('workerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Application Submitted! Verification Pending.");
    this.reset();
});

// Mobile Menu
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('active'));
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('active')));

// Initial Load
displayWorkers(workersDB);
