document.addEventListener("DOMContentLoaded", () => {
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=20')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("albumTableBody");
            const recordIdsDiv = document.getElementById("recordIds");
            let recordIdsText = "<h2>ID de los registros:</h2><p>";
            
            data.forEach(photo => {
                addRowToTable(photo);
                recordIdsText += `${photo.id}, `;
            });
            
            recordIdsText = recordIdsText.slice(0, -2) + "</p>";
            recordIdsDiv.innerHTML = recordIdsText;
        })
        .catch(error => console.error("Error al obtener los datos:", error));
});

function addRowToTable(photo) {
    const tableBody = document.getElementById("albumTableBody");
    const row = document.createElement("tr");
    row.dataset.title = photo.title;
    row.innerHTML = `
        <td>${photo.albumId}</td>
        <td>${photo.title}</td>
        <td><img src="${photo.url}" alt="Imagen del álbum"></td>
    `;
    tableBody.appendChild(row);
}