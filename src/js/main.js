const url = "https://webbutveckling.miun.se/files/ramschema.json"

let allCourses = []; // En tom lista där alla kurser sparas när de hämtats
let sortColumn = "code"; // Vilken kolumn som det sorteras på just nu
let sortAscending = true; // Sortering på bokstavsordning där true = A till Ö och false = Ö till A

// Funktion som hämtar kurser från webbadressen ovan
async function fetchSchedule() { 
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Spara alla kurser i tabellen
        allCourses = data;

        // Visa kurserna i tabellen
        showTable(allCourses);

    } catch (error) {
        console.log("Något har gått fel:", error);
    }
}

// En funktion som skriver ut kurserna i tabellen
function showTable(courses) {
    const tbody = document.getElementById("table-body");

    // Tömmer tabellen innan den fylls igen
    tbody.innerHTML = "";

    // Går igenom varje kurs i listan, en i taget
    courses.forEach(function(course) {
        // Skapa en ny rad med kursens infromation/data och för att sedan lägga till den i tabellen
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