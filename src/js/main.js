const url = "https://webbutveckling.miun.se/files/ramschema.json"

async function fetchSchedule() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        showTable(data);
    } catch (error) {
        console.log("Något har gått fel:", error);
    }
}

function showTable(courses) {
    const tbody = document.getElementById("table-body");
    tbody.innerHTML = "";

    courses.forEach(function(course) {
        tbody.innerHTML += `
            <tr>
                <td>${course.code}</td>
                <td>${course.coursename}</td>
                <td>${course.progression}</td>
            </tr>
        `;
    });
}

fetchSchedule();