/**
 * Canvas Animation for EcoLife
 * Creates an interactive particle network that represents environmental connectivity
 */

const initCanvasAnimation = () => {
  const canvas = document.createElement('canvas');
  canvas.id = 'canvas-animation';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  let hue = 120; // Green hue

  // Set canvas size
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.color = `hsla(${hue}, 100%, 50%, 0.8)`;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Bounce off edges
      if (this.x > canvas.width || this.x < 0) {
        this.speedX = -this.speedX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.speedY = -this.speedY;
      }

      // Shrink particles
      if (this.size > 0.2) this.size -= 0.05;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Create particles
  const createParticles = () => {
    const particleCount = Math.floor(canvas.width * canvas.height / 15000);
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }
  };

  // Connect particles with lines if they're close enough
  const connectParticles = () => {
    const maxDistance = 100;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x;
        const dy = particlesArray[a].y - particlesArray[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance;
          ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${opacity * 0.4})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  };

  // Animation loop
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Slowly change hue for color variation (between green and blue tones)
    hue += 0.5;
    if (hue > 180) hue = 120;

    // Update and draw particles
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    
    connectParticles();
    
    // Remove small particles and add new ones
    particlesArray = particlesArray.filter(particle => particle.size > 0.2);
    if (particlesArray.length < 100) {
      for (let i = 0; i < 10; i++) {
        particlesArray.push(new Particle());
      }
    }
    
    requestAnimationFrame(animate);
  };

  createParticles();
  animate();

  return () => {
    // Cleanup function
    window.removeEventListener('resize', resizeCanvas);
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  };
};

export default initCanvasAnimation;