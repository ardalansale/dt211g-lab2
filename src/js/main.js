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

fetchSchedule();