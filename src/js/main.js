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

// Funktion som skriver ut kurserna i tabellen
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

// Funktion som sorterar kurserna när användaren klickar på en kolumn
function sortTable(column) {

    // Om användaren klickar på samma kolumn igen, vänds ordningen
    if (sortColumn === column) {
        sortAscending = !sortAscending;
    } else {
    
        // Byt till den nya kolumnen och börja med A till Ö
        sortColumn = column;
        sortAscending = true;
    }

    //Sortera listan
    allCourses.sort(function(a, b) {
        if (a[column] < b[column]) return sortAscending ? -1 : 1;
        if (a[column] > b[column]) return sortAscending ? 1 : -1;
        return 0;
    });

    // Gör om tabellen med den sorterade listan
    showTable(allCourses);
}

    // Hämta kolumnrubriker och lyssna på klick
    document.querySelectorAll("th").forEach(function(th) {
        th.addEventListener("click", function() {

            const column = th.dataset.col;

            // Anropa sorteringsfunktionen med kolumnens namn
            sortTable(column);
        });
    });

    // Lyssna på vad användaren skriver i sökfältet
    document.getElementById("search").addEventListener("input", function() {
        
        // Gör om det användaren har skrivit till små bokstäver
        const searchText = document.getElementById("search").value.toLowerCase();

        // Behåll bara kurser som matchar det användaren har skrivit
        const filteredCourses = allCourses.filter(function(course) {
            return course.code.toLowerCase().includes(searchText) ||
                course.coursename.toLowerCase().includes(searchText);
        });

        // Gör om tabellen med den sorterade listan
        showTable(filteredCourses);
    });

fetchSchedule();