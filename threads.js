const canvas = document.getElementById("threads");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// CONFIG — you can tune these later
const LINE_COUNT = 14;      // number of horizontal waves
const AMPLITUDE = 25;       // wave height
const WAVELENGTH = 300;     // distance between peaks
const SPEED = 0.015;        // wave speed

let time = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(180,220,255,0.15)";
  ctx.lineWidth = 1;

  for (let i = 0; i < LINE_COUNT; i++) {
    const yBase = (canvas.height / (LINE_COUNT + 1)) * (i + 1);

    ctx.beginPath();

    for (let x = 0; x <= canvas.width; x += 10) {
      const y =
        yBase +
        Math.sin((x / WAVELENGTH) + time + i + scrollY) * AMPLITUDE;

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.stroke();
  }

  time += SPEED;
  requestAnimationFrame(draw);
}

let running = true;
document.addEventListener("visibilitychange", () => {
  running = !document.hidden;
});


if (running) requestAnimationFrame(draw);

let scrollY = 0;
window.addEventListener("scroll", () => {
  scrollY = window.scrollY * 0.002;
});


