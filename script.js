document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    const particles = [];

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = Math.random() * 2 - 1;
            this.vy = Math.random() * 2 - 1;
            this.alpha = Math.random() * 0.5 + 0.5;
        }

        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
            ctx.fillStyle = '#ff6f61';
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= 0.01;

            if (this.alpha <= 0) {
                const index = particles.indexOf(this);
                if (index > -1) {
                    particles.splice(index, 1);
                }
            }
        }
    }

    class Lightning {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.segments = [];
            this.alpha = 0.8;
            this.generateSegments();
        }

        generateSegments() {
            let currentX = this.x;
            let currentY = this.y;
            for (let i = 0; i < 10; i++) {
                const nextX = currentX + (Math.random() - 0.5) * 100;
                const nextY = currentY + Math.random() * 100;
                this.segments.push({ x: nextX, y: nextY });
                currentX = nextX;
                currentY = nextY;
            }
        }

        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.strokeStyle = 'rgba(0, 0, 139, 0.8)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            for (const segment of this.segments) {
                ctx.lineTo(segment.x, segment.y);
            }
            ctx.stroke();
        }

        update() {
            this.alpha -= 0.02;
            if (this.alpha <= 0) {
                const index = particles.indexOf(this);
                if (index > -1) {
                    particles.splice(index, 1);
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', (e) => {
        particles.push(new Particle(e.clientX, e.clientY));
    });

    window.addEventListener('resize', resizeCanvas);

    function debounce(func, delay) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }

    window.addEventListener('scroll', debounce(() => {
        const lightningX = Math.random() * window.innerWidth;
        const lightningY = Math.random() * window.innerHeight;
        particles.push(new Lightning(lightningX, lightningY));
    }, 100));

    resizeCanvas();
    animate();
});
document.addEventListener('DOMContentLoaded', () => {
    const projects = document.querySelectorAll('.project');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');

    projects.forEach(project => {
        project.addEventListener('click', () => {
            const imgSrc = project.querySelector('img').src;
            openLightbox(imgSrc);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);

    function openLightbox(imgSrc) {
        lightbox.style.display = 'block';
        lightboxImg.src = imgSrc;
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
    }
});
