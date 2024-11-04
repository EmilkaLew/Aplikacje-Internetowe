document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM w pełni załadowany");

    const rasterMap = document.getElementById("rasterMap");
    const pieceContainer = document.getElementById("pieces");
    const targetContainer = document.getElementById("targets");

    //Ustawienia początkowe mapy
    let map = L.map('map').setView([53.44868746107255, 14.492275423160033], 18);

    //Dodanie warstwy Esri World Imagery
    //po to aby mapa wyświetlała obrazy satelitarne
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map);

    let userMarker = null;

    //Pobieranie lokalizacji użytkownika i zapis mapy jako obraz
    document.getElementById("getLocation").addEventListener("click", function() {
        console.log("Przycisk 'Moja lokalizacja' kliknięty");

        if (!navigator.geolocation) {
            alert("Geolokalizacja nie jest obsługiwana przez tę przeglądarkę.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                //Przesunięcie mapy do lokalizacji użytkownika
                map.setView([lat, lon], 15);

                if (userMarker) userMarker.remove();

                userMarker = L.marker([lat, lon]).addTo(map)
                    .bindPopup("Twoja lokalizacja").openPopup();

                saveMapAsImage();
            },
            positionError => {
                alert("Nie udało się pobrać lokalizacji: " + positionError.message);
            },
            { enableHighAccuracy: false }
        );
    });

    //Funkcja zapisu mapy jako obraz
    function saveMapAsImage() {
        leafletImage(map, function(err, canvas) {
            if (err) return console.error("Błąd podczas pobierania mapy:", err);

            console.log("Mapa pobrana jako obraz");
            
            let rasterContext = rasterMap.getContext("2d");
            rasterContext.clearRect(0, 0, rasterMap.width, rasterMap.height);
            rasterContext.drawImage(canvas, 0, 0, rasterMap.width, rasterMap.height);

            //Tworzenie fragmentów mapy
            createMapPieces();
            shufflePieces();
        });
    }

    //Funkcja tworząca fragmenty mapy
    function createMapPieces() {
        pieceContainer.innerHTML = "";
        targetContainer.innerHTML = "";

        const pieceSize = 50;
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const piece = document.createElement("canvas");
                piece.classList.add("item");
                piece.width = pieceSize;
                piece.height = pieceSize;
                piece.id = `piece-${row}-${col}`;

                const pieceContext = piece.getContext("2d");
                pieceContext.drawImage(
                    rasterMap,
                    col * pieceSize, row * pieceSize, pieceSize, pieceSize,
                    0, 0, pieceSize, pieceSize
                );

                piece.setAttribute("draggable", "true");
                pieceContainer.appendChild(piece);
            }
        }

        createTargets();
        initializeDragAndDrop();
    }

    //Funkcja tworząca miejsca docelowe
    function createTargets() {
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const target = document.createElement("div");
                target.classList.add("drag-target");
                target.id = `target-${row}-${col}`;
                target.dataset.correctPiece = `piece-${row}-${col}`;
                targetContainer.appendChild(target);
            }
        }
    }

    // Losowe przetasowanie fragmentów mapy
    function shufflePieces() {
        const pieces = Array.from(pieceContainer.children);
        for (let i = pieces.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            pieceContainer.insertBefore(pieces[j], pieces[i]);
        }
    }

    //Funkcja inicjująca Drag & Drop
    function initializeDragAndDrop() {
        const items = document.querySelectorAll('.item');
        for (let item of items) {
            item.addEventListener("dragstart", function(event) {
                this.style.border = "2px dashed #D8D8FF";
                event.dataTransfer.setData("text", this.id);
            });

            item.addEventListener("dragend", function() {
                this.style.borderWidth = "0";
            });
        }

        const targets = document.querySelectorAll(".drag-target");
        for (let target of targets) {
            target.addEventListener("dragenter", function () {
                this.style.border = "2px solid #7FE9D9";
            });
            target.addEventListener("dragleave", function () {
                this.style.border = "2px dashed #7f7fe9";
            });
            target.addEventListener("dragover", function (event) {
                event.preventDefault();
            });
            target.addEventListener("drop", function (event) {
                event.preventDefault();
                const pieceId = event.dataTransfer.getData("text");
                const piece = document.getElementById(pieceId);

                if (this.children.length === 0) {
                    this.appendChild(piece);
                    checkIfPuzzleIsComplete();
                }
                this.style.border = "2px dashed #7f7fe9";
            });
        }
    }

    //Funkcja sprawdzająca poprawność ułożenia układanki
    function checkIfPuzzleIsComplete() {
        const targets = document.querySelectorAll(".drag-target");
        let allCorrect = true; 
    
        targets.forEach(target => {
            const piece = target.firstChild;
            if (!piece) {
                allCorrect = false;
                return;
            }
            
            if (piece.id !== target.dataset.correctPiece) {
                allCorrect = false;
                showNotification(`Fragment ${piece.id} jest w złym miejscu!`, "error");
            }
        });
        if (allCorrect) {
            showNotification("Gratulacje! Ułożyłeś wszystkie fragmenty poprawnie.", "success");
            showSystemNotification("Gratulacje! Ułożyłeś wszystkie fragmenty poprawnie.");
        }
    }

    function showNotification(message, type) {
    console.log(message);
    
    const notification = document.getElementById("notification");
    notification.innerText = message;
    notification.style.display = "block"; 

    if (type === "success") {
        notification.style.color = "#28a745"; 
    } else if (type === "error") {
        notification.style.color = "#dc3545"; 
    }

    setTimeout(() => {
        notification.style.display = "none"; 
    }, 3000);
    }

    function showSystemNotification(message){
        if("Notification" in window) {
            if (Notification.permission === "granted"){
                new Notification(message);
            } else if (Notification.permission !== "denied"){
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        new Notification(message);
                    }
                });
            }
        } else {
            alert(message);
        }
    }

    // document.getElementById("resetButton").addEventListener("click", function() {
    //     pieceContainer.innerHTML = ""; 
    //     targetContainer.innerHTML = ""; 
    //     createMapPieces(); 
    //     showNotification("Puzzle zresetowane!"); 
    // });
    
    document.getElementById("saveButton").addEventListener("click", function() {
        saveMapAsImage();
    });
});
