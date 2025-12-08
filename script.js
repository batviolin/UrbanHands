const workersDB = [
    { name: "Sunita Devi", role: "Maid", area: "Dwarka", rating: 4.8, education: "Literate", image: "https://randomuser.me/api/portraits/women/11.jpg" },
    { name: "Ramesh Kumar", role: "Cleaner", area: "Bandra", rating: 3.5, education: "Illiterate", image: "https://randomuser.me/api/portraits/men/22.jpg" },
    { name: "Anita Singh", role: "Cook", area: "Dwarka", rating: 2.5, education: "Literate", image: "https://randomuser.me/api/portraits/women/33.jpg" },
    { name: "Rajesh Gupta", role: "Sweeper", area: "Connaught Place", rating: 4.2, education: "Literate", image: "https://randomuser.me/api/portraits/men/44.jpg" },
    { name: "Priya Sharma", role: "Maid", area: "Bandra", rating: 4.9, education: "Literate", image: "https://randomuser.me/api/portraits/women/55.jpg" },
    { name: "Mohan Lal", role: "Cleaner", area: "Indiranagar", rating: 2.9, education: "Illiterate", image: "https://randomuser.me/api/portraits/men/66.jpg" }
];

const container = document.getElementById('workerContainer');

function getRatingConfig(rating) {
    if (rating >= 4.5) return { class: 'card-green', colorClass: 'text-green', label: 'Premium' };
    if (rating >= 3.0) return { class: 'card-blue', colorClass: 'text-blue', label: 'Good' };
    return { class: 'card-red', colorClass: 'text-red', label: 'Low/New' };
}

function displayWorkers(data) {
    container.innerHTML = "";
    if(data.length === 0) {
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
                    </div>
                    <button class="btn-contact" onclick="contactWorker('${worker.name}')">
                        Contact ${worker.name.split(' ')[0]}
                    </button>
                </div>
            </div>
        `;
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

function contactWorker(name) {
    // In a real app, this would open a modal or redirect
    alert(`Contact details request for ${name} has been logged. Please Sign Up to view phone numbers.`);
}

document.getElementById('workerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Application Submitted! Verification Pending.");
    this.reset();
});

// Initial Load
displayWorkers(workersDB);