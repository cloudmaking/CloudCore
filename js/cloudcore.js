document.addEventListener("DOMContentLoaded", () => {
    const addTrackBtn = document.getElementById("add-track-btn");
    const addAudioTrackBtn = document.getElementById("add-audio-track-btn");
    const addMidiTrackBtn = document.getElementById("add-midi-track-btn");
    const addTrackModal = document.getElementById("add-track-modal");
    const trackContainer = document.getElementById("track-container");

    addTrackBtn.addEventListener("click", () => {
        addTrackModal.style.display = "flex";
    });

    addAudioTrackBtn.addEventListener("click", () => {
        addTrack("audio");
        addTrackModal.style.display = "none";
    });

    addMidiTrackBtn.addEventListener("click", () => {
        addTrack("midi");
        addTrackModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === addTrackModal) {
            addTrackModal.style.display = "none";
        }
    });

    function addTrack(type) {
        const track = document.createElement("div");
        track.className = "track";
        track.style.backgroundColor = type === "audio" ? "green" : "red";
    
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.className = "delete-track-btn";
        deleteButton.addEventListener("click", () => {
            trackContainer.removeChild(track);
        });
    
        track.appendChild(deleteButton);
        trackContainer.appendChild(track);
    }
    
});
