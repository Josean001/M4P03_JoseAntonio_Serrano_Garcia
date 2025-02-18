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
        <td><button class="delete-btn" onclick="deleteEntry(${photo.id}, this)">Eliminar</button></td>
    `;
    tableBody.appendChild(row);
}

function deleteEntry(id, button) {
    fetch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log(`Registro ${id} eliminado correctamente.`);
            button.parentElement.parentElement.remove();
        } else {
            console.error(`Error al eliminar el registro ${id}`);
        }
    })
    .catch(error => console.error("Error en la petición de eliminación:", error));
}

document.getElementById("addEntry").addEventListener("click", () => {
    const tableBody = document.getElementById("albumTableBody");
    const rows = tableBody.getElementsByTagName("tr");
    const newTitle = "José Antonio Serrano García";
    
    for (let row of rows) {
        if (row.dataset.title === newTitle) {
            alert("El registro ya existe en la tabla.");
            return;
        }
    }
    
    const newEntry = {
        albumId: 1,
        thumbnailUrl: null,
        title: newTitle,
        url: "https://cursos.com/wp-content/uploads/2021/04/academia-tokio-school.jpg"
    };

    fetch('https://jsonplaceholder.typicode.com/photos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEntry)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Nueva entrada añadida:", data);
        addRowToTable(data);
    })
    .catch(error => console.error("Error al añadir la nueva entrada:", error));
});
