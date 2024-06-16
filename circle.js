const canvas = document.getElementById('circleCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawImage();
}

function getPointOnCircle(cx, cy, radius, angle) {
  const x = cx + radius * Math.cos(angle);
  const y = cy + radius * Math.sin(angle);
  return { x, y };
}

function drawCircle(center, radius, depth, color, numPoints) {
    if (depth === 0) return;
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    // ctx.strokeStyle = 'white';
    ctx.strokeStyle = `hsl(${color}, 100%, 50%)`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Calculate and draw points on the circle
    for (let i = 0; i < numPoints; i++) {
      const angle = (i * 2 * Math.PI) / numPoints + Math.PI / 2;

      // Add some randomness to the points coordinates
      const variancePoint = 0;
      const x = center.x - variancePoint/2 + Math.random() * variancePoint;
      const y = center.y - variancePoint/2 + Math.random() * variancePoint;


      const point = getPointOnCircle(x, y, radius, angle);

      // ctx.beginPath();
      // ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
      // ctx.fillStyle = 'red';
      // ctx.fill();

      const varianceRadius = 5;
      const newRadius = radius - varianceRadius / 2 + Math.random() * varianceRadius;
      const newColor = Math.floor((Math.random() * 100)) - 50 + color;

      drawCircle(point, newRadius, depth - 1, newColor, numPoints);
    }
}

function drawImage() {
  const width = canvas.width;
  const height = canvas.height;
  const radius = Math.min(width, height) / 13; // Radius of the circle
  const maxDepth = 6;
  const startColor = Math.random() * 360;
  const numPoints = 6; // Number of points to draw

  ctx.clearRect(0, 0, width, height);

  const center = {
    x: width / 2,
    y: height / 2
  };
  drawCircle(center, radius, maxDepth, startColor, numPoints);

}

window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();
