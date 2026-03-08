const url = "https://webbutveckling.miun.se/files/ramschema.json"

async function fetchSchedule() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.log("Något har gått fel:", error);
    }
}

function showTable(courses) {
    const tbody = document.getElementById("table-body");
    tbody.innerHTML = "";

    courses.ForEach(function(course) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${course.code}</td>
        <td>${course.coursename}</td>
        <td>${course.progression}</td>
        `;
        tbody.appenChuld(row);
    });
}

