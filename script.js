// Inicializar iconos de Lucide
lucide.createIcons();

// Datos de los episodios
const episodesData = {
    1: {
        title: "1. El inicio de algo bonito",
        description: "Donde todo comenzó. Recordar los primeros días a su lado siempre me saca una sonrisa y me confirma que tomar su mano siempre es la mejor decisión.",
        image: "https://i.ibb.co/qFk1JwZM/IMG-20220704-WA0185.jpg"
    },
    2: {
        title: "2. Nuestros mejores momentos",
        description: "Viajes, risas, salidas y aventuras. Cada día a su lado es una nueva historia que vale la pena guardar para siempre.",
        image: "https://i.ibb.co/jvDGbt8Z/190674.jpg"
    },
    3: {
        title: "3. Por muchos meses más",
        description: "1 año y 2 meses son solo el comienzo de todo lo que nos espera por vivir juntos. Te amo con todo mi corazón.",
        image: "https://i.ibb.co/dwb6ng1Y/IMG-20220704-WA0194.jpg"
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

// Reproducir y Pausar Música
const audio = document.getElementById('audio-player');
const playIcon = document.getElementById('play-icon');
const vinyl = document.getElementById('vinyl');
const progressFill = document.getElementById('progress-fill');
const currentTimeEl = document.getElementById('current-time');
const totalDurationEl = document.getElementById('total-duration');

function togglePlayMusic() {
    if (audio.paused) {
        audio.play();
        playIcon.setAttribute('data-lucide', 'pause');
        vinyl.classList.add('playing');
    } else {
        audio.pause();
        playIcon.setAttribute('data-lucide', 'play');
        vinyl.classList.remove('playing');
    }
    lucide.createIcons();
}

// Actualizar barra de progreso y tiempo actual
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = `${progressPercent}%`;

        // Formatear tiempo actual (minutos:segundos)
        const currentMin = Math.floor(audio.currentTime / 60);
        const currentSec = Math.floor(audio.currentTime % 60);
        currentTimeEl.textContent = `${currentMin}:${currentSec < 10 ? '0' : ''}${currentSec}`;

        // Formatear duración total
        const totalMin = Math.floor(audio.duration / 60);
        const totalSec = Math.floor(audio.duration % 60);
        totalDurationEl.textContent = `${totalMin}:${totalSec < 10 ? '0' : ''}${totalSec}`;
    }
});