const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let particulas = [];
let fuegosActivos = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particula {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocidadX = (Math.random() - 0.5) * 8;
        this.velocidadY = (Math.random() - 0.75) * 8;
        this.tamano = Math.random() * 4 + 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.alpha = 1;
        this.gravedad = 0.1;
    }
    
    actualizar() {
        this.velocidadY += this.gravedad;
        this.x += this.velocidadX;
        this.y += this.velocidadY;
        this.alpha -= 0.015;
    }
    
    dibujar() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.tamano, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if(fuegosActivos) {
        if(Math.random() < 0.1) {
            lanzarFuegos(
                Math.random() * canvas.width,
                Math.random() * canvas.height * 0.5
            );
        }
    }

    particulas.forEach((particula, index) => {
        particula.actualizar();
        particula.dibujar();
        
        if (particula.alpha <= 0 || 
            particula.y > canvas.height + 100 ||
            particula.x < -100 || 
            particula.x > canvas.width + 100) {
            particulas.splice(index, 1);
        }
    });

    requestAnimationFrame(animar);
}
animar();

function lanzarFuegos(x, y) {
    for(let i = 0; i < 50; i++) {
        particulas.push(new Particula(x, y));
    }
}

function activarFuegos() {
    fuegosActivos = true;
    document.querySelector('.boton').style.animation = 'clickEffect 0.3s';
    
    // Reproducir el audio
    const audio = document.getElementById('audioPerdon');
    audio.play().catch(error => {
        console.log('Error al reproducir audio:', error);
    });
}

// Contador de días
const fechaInicial = new Date('2025-03-08T00:00:00');

function actualizarContador() {
    const hoy = new Date();
    const diferencia = hoy - fechaInicial;
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    
    document.getElementById('contador').textContent = dias;
    document.getElementById('hashtag').textContent = `#Día${dias}TratandoDeQueSeasFeliz`;
}

const style = document.createElement('style');
style.textContent = `
    @keyframes clickEffect {
        0% { transform: scale(1); }
        50% { transform: scale(0.95); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

actualizarContador();
setInterval(actualizarContador, 1000 * 60 * 60);