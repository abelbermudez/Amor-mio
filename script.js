// Inicializar iconos de Lucide
document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
});

// 1. DATOS DE LOS EPISODIOS (SECCIÓN INICIO)
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
        description: "1 año y 3 meses son solo el comienzo de todo lo que nos espera por vivir juntos. Te amo con todo mi corazón.",
        image: "https://i.ibb.co/fz0Khs9T/In-Shot-20260122-135553607.jpg"
    }
};

// 2. DATOS DE LAS SERIES (SECCIÓN SERIES)
const seriesData = {
    1: {
        title: "1. El Primer Chispazo",
        description: "El día exacto en que supimos que fue amor. Ese instante en el que una simple mirada cambió el destino de nuestras vidas para siempre.",
        image: "https://i.ibb.co/dwb6ng1Y/IMG-20220704-WA0194.jpg",
        isVideo: false
    },
    2: {
        title: "2. Nuestra Primera Cita",
        description: "Llenos de nervios, risas inolvidables y pláticas infinitas donde nos dimos cuenta de que éramos el uno para el otro.",
        image: "https://i.ibb.co/wTP0n5f/IMG-20260724-141750919.jpg",
        isVideo: false
    },
    3: {
        title: "3. El Sí Oficial",
        description: "El momento en que decidimos caminar juntos como pareja y formalizar este hermoso capítulo de nuestro gran amor.",
        videoUrl: "https://streamable.com/e/e1es11?",
        isVideo: true
    },
    4: {
        title: "4. Escapadas y Viajes",
        description: "Nuestras salidas, paseos y descubrimientos tomados de la mano, guardando recuerdos inolvidables en cada lugar.",
        image: "https://i.ibb.co/hx12DDRh/IMG-20260724-140429960.jpg",
        isVideo: false
    },
    5: {
        title: "5. Un Futuro Juntos",
        description: "Todos los sueños, proyectos y metas que estamos construyendo día a día para vivir una vida entera uno al lado del otro.",
        image: "https://i.ibb.co/nNcQnkNH/20260724-122757.jpg",
        isVideo: false
    }
};

// 3. CAMBIAR DE PESTAÑA (NAVEGACIÓN)
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    const selectedTab = document.getElementById(`tab-${tabName}`);
    if (selectedTab) selectedTab.classList.add('active');
    
    // Marcar enlace activo
    const activeLink = Array.from(document.querySelectorAll('.nav-link')).find(
        a => a.getAttribute('onclick') && a.getAttribute('onclick').includes(tabName)
    );
    if (activeLink) activeLink.classList.add('active');
}

// 4. ABRIR MODAL DESDE INICIO (EPISODIOS)
function openEpisode(id) {
    const data = episodesData[id];
    if (data) {
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-desc').textContent = data.description;
        
        const modalImgWrapper = document.querySelector('.modal-img-wrapper');
        modalImgWrapper.innerHTML = `<img id="modal-img" src="${data.image}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover;">`;
        
        document.getElementById('modal-episode').style.display = 'flex';
    }
}

// 5. ABRIR MODAL DESDE SERIES (SELECCIÓN DE TARJETAS Y VIDEO)
function openSeriesModal(id) {
    const data = seriesData[id];
    if (!data) return;

    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalImgWrapper = document.querySelector('.modal-img-wrapper');

    modalTitle.textContent = data.title;
    modalDesc.textContent = data.description;

    if (data.isVideo) {
        modalImgWrapper.innerHTML = `<iframe allow="fullscreen" allowfullscreen src="${data.videoUrl}" style="width:100%; height:100%; border:none;"></iframe>`;
    } else {
        modalImgWrapper.innerHTML = `<img id="modal-img" src="${data.image}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover;">`;
    }

    document.getElementById('modal-episode').style.display = 'flex';
}

// 6. CERRAR VENTANA MODAL
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

// 7. MANEJO DEL REPRODUCTOR DE AUDIO (MÚSICA)
const audio = document.getElementById('audio-player');
const playBtn = document.querySelector('.btn-play-music-lg');

audio.addEventListener('play', () => {
    playBtn.innerHTML = '<i data-lucide="pause"></i>';
    if (window.lucide) lucide.createIcons();
});

audio.addEventListener('pause', () => {
    playBtn.innerHTML = '<i data-lucide="play"></i>';
    if (window.lucide) lucide.createIcons();
});

function togglePlayMusic() {
    const audio = document.getElementById('audio-player');
    const playBtn = document.querySelector('.btn-play-music-lg');

    if (audio.paused) {
        audio.play();
        // Cambia el ícono a 'pause'
        playBtn.innerHTML = '<i data-lucide="pause"></i>';
    } else {
        audio.pause();
        // Cambia el ícono a 'play'
        playBtn.innerHTML = '<i data-lucide="play"></i>';
    }

    // Fuerza a Lucide a renderizar el nuevo SVG del ícono
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Cargar duración y progreso del audio
if (audio) {
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            if (progressFill) progressFill.style.width = `${progressPercent}%`;

            const currentMin = Math.floor(audio.currentTime / 60);
            const currentSec = Math.floor(audio.currentTime % 60);
            if (currentTimeEl) {
                currentTimeEl.textContent = `${currentMin}:${currentSec < 10 ? '0' : ''}${currentSec}`;
            }

            const totalMin = Math.floor(audio.duration / 60);
            const totalSec = Math.floor(audio.duration % 60);
            if (totalDurationEl) {
                totalDurationEl.textContent = `${totalMin}:${totalSec < 10 ? '0' : ''}${totalSec}`;
            }
        }
    });

    if (progressBar) {
        progressBar.addEventListener('click', (e) => {
            const width = progressBar.clientWidth;
            const clickX = e.offsetX;
            const duration = audio.duration;
            if (duration) {
                audio.currentTime = (clickX / width) * duration;
            }
        });
    }
}