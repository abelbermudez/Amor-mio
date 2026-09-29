// Inicializar iconos de Lucide
lucide.createIcons();

// Datos de los episodios
const episodesData = {
    1: {
        title: "1. El inicio de algo bonito",
        description: "Donde todo comenzó. Recordar los primeros días a su lado siempre me saca una sonrisa y me confirma que tomar su mano siempre es la mejor decisión.",
        image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80"
    },
    2: {
        title: "2. Nuestros mejores momentos",
        description: "Viajes, risas, salidas y aventuras. Cada día a su lado es una nueva historia que vale la pena guardar para siempre.",
        image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80"
    },
    3: {
        title: "3. Por muchos meses más",
        description: "1 año y 3 meses son solo el comienzo de todo lo que nos espera por vivir juntos. Te amo con todo mi corazón.",
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80"
    }
};

// Cambiar de Pestaña (Navegación)
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    document.getElementById(`tab-${tabName}`).classList.add('active');
    
    // Marcar enlace activo
    const activeLink = Array.from(document.querySelectorAll('.nav-link')).find(
        a => a.getAttribute('onclick').includes(tabName)
    );
    if (activeLink) activeLink.classList.add('active');
}

// Abrir Ventana Modal del Episodio
function openEpisode(id) {
    const data = episodesData[id];
    if (data) {
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-desc').textContent = data.description;
        document.getElementById('modal-img').src = data.image;
        document.getElementById('modal-episode').style.display = 'flex';
    }
}

// Cerrar Ventana Modal
function closeModal() {
    document.getElementById('modal-episode').style.display = 'none';
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById('modal-episode');
    if (event.target === modal) {
        closeModal();
    }
};

// Reproductor de Música
let isPlaying = false;
let progressInterval = null;

function togglePlayMusic() {
    const vinyl = document.getElementById('vinyl');
    const playIcon = document.getElementById('play-icon');
    const progressFill = document.getElementById('progress-fill');
    const currentTimeEl = document.getElementById('current-time');
    
    isPlaying = !isPlaying;

    if (isPlaying) {
        vinyl.classList.add('playing');
        playIcon.setAttribute('data-lucide', 'pause');
        lucide.createIcons();

        let progress = 0;
        let seconds = 0;
        
        progressInterval = setInterval(() => {
            progress += 1;
            seconds += 1;
            
            if (progress > 100) {
                progress = 0;
                seconds = 0;
            }

            progressFill.style.width = `${progress}%`;
            
            let mins = Math.floor(seconds / 60);
            let secs = seconds % 60;
            currentTimeEl.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }, 1000);

    } else {
        vinyl.classList.remove('playing');
        playIcon.setAttribute('data-lucide', 'play');
        lucide.createIcons();
        clearInterval(progressInterval);
    }
}