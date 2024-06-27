document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');
    fetchReports(index);
});

let reports = [];

function fetchReports(index) {
    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            reports = data.reports;
            displayReportDetails(index);
        })
        .catch(error => console.error('Error fetching reports:', error));
}

function displayReportDetails(index) {
    const report = reports[index];
    const reportDetailsElement = document.getElementById("report-details");
    reportDetailsElement.innerHTML = `
        <p><strong>Plate:</strong><br> ${report.plate} 
        <strong>Reason:</strong> <br>${report.reason}
        <strong>Location:</strong><br> ${report.location}
        <strong>Date:</strong><br> ${report.date}
        <strong>Status:</strong> <br>${report.status}
        <strong>Urgent:</strong><br> ${report.urgent ? "Yes" : "No"}</p>
    `;
    const reportImageElement = document.getElementById("report-image");
    reportImageElement.innerHTML = `<img src="${report.image}" alt="Car Image" style="width: 100%;">`;
    reportDetailsElement.dataset.index = index;

    const reportMapElement = document.getElementById("report-map");
    reportMapElement.innerHTML = `<img src="${report.map}" alt="Car Image" style="width: 100%;">`;
    reportDetailsElement.dataset.index = index;
}

function deleteReport() {
    const modal = document.getElementById("confirmModal");
    modal.style.display = "block";
}

function confirmDelete() {
    const reportDetailsElement = document.getElementById("report-details");
    const index = reportDetailsElement.dataset.index;
    reports.splice(index, 1);
    saveReports();
    window.location.href = "report_history.html";
}

function cancelDelete() {
    const modal = document.getElementById("confirmModal");
    modal.style.display = "none";
}

function saveReports() {
    fetch('data/data.json', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reports })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Failed to save reports');
        }
    }).catch(error => {
        console.error('Error saving reports:', error);
    });
}

function goBack() {
    window.history.back();
}
