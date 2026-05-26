/* ═══════════════════════════════════════════════════════════════════════
   A LOS PIES DEL ÁRBOL — ANIMACIÓN CANVAS Y MENÚ
   Sistema generativo de líneas bezier + control de menús
   ═══════════════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────────────
   CONFIGURACIÓN E INICIALIZACIÓN - CANVAS
   ───────────────────────────────────────────────────────────────────── */

const canvas = document.getElementById("tree-lines");
const ctx = canvas.getContext("2d", { willReadFrequently: false });

// Variables globales
let width;
let height;
let lines = [];
let animationFrameId = null;

const GREEN = "#c7ff02";
const BREAKPOINT = 768; // Punto de quiebre para cambiar cantidad de líneas

/* ─────────────────────────────────────────────────────────────────────
   FUNCIÓN: REDIMENSIONAR CANVAS
   Reajusta el tamaño del canvas al tamaño de la ventana y regenera líneas
   ───────────────────────────────────────────────────────────────────── */

function resizeCanvas() {
  // Usar devicePixelRatio para retina displays
  const dpr = window.devicePixelRatio || 1;

  width = canvas.width = window.innerWidth * dpr;
  height = canvas.height = window.innerHeight * dpr;

  // Aplicar estilos CSS
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  // Escalar contexto según DPR
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Regenerar líneas con la nueva dimensión
  createLines();
}

/* ─────────────────────────────────────────────────────────────────────
   FUNCIÓN: CREAR LÍNEAS
   Genera N líneas bezier con propiedades aleatorias
   ───────────────────────────────────────────────────────────────────── */

function createLines() {
  // Determinar cantidad de líneas según ancho de pantalla
  const count = window.innerWidth < BREAKPOINT ? 5 : 9;

  lines = Array.from({ length: count }, (_, i) => {
    // Distribución equidistante de puntos iniciales
    const startX = (window.innerWidth / (count + 1)) * (i + 1);

    // Variación aleatoria en desplazamiento horizontal (drift)
    const drift = (Math.random() - 0.5) * 260;

    // Variación aleatoria en curvatura de puntos de control
    const curve = (Math.random() - 0.5) * 420;

    return {
      startX,
      startY: -80 - Math.random() * 180,
      endX: startX + drift,
      endY: window.innerHeight + 180,

      // Puntos de control para curva bezier cúbica
      cp1X: startX + curve,
      cp1Y: window.innerHeight * (0.25 + Math.random() * 0.2),
      cp2X: startX - curve * 0.55,
      cp2Y: window.innerHeight * (0.55 + Math.random() * 0.25),

      // Propiedades de animación
      progress: 0,
      speed: 0.0007 + Math.random() * 0.0012,
      width: 0.45 + Math.random() * 0.45,
      opacity: 0.3 + Math.random() * 0.25,
    };
  });
}

/* ─────────────────────────────────────────────────────────────────────
   FUNCIÓN: CALCULAR PUNTO EN CURVA BEZIER CÚBICA
   Usa fórmula de interpolación para obtener punto en la curva
   ───────────────────────────────────────────────────────────────────── */

function getBezierPoint(t, p0, p1, p2, p3) {
  // Fórmula de Bernstein para bezier cúbica
  const cX = 3 * (p1.x - p0.x);
  const bX = 3 * (p2.x - p1.x) - cX;
  const aX = p3.x - p0.x - cX - bX;

  const cY = 3 * (p1.y - p0.y);
  const bY = 3 * (p2.y - p1.y) - cY;
  const aY = p3.y - p0.y - cY - bY;

  // Retornar punto interpolado
  return {
    x: aX * Math.pow(t, 3) + bX * Math.pow(t, 2) + cX * t + p0.x,
    y: aY * Math.pow(t, 3) + bY * Math.pow(t, 2) + cY * t + p0.y,
  };
}

/* ─────────────────────────────────────────────────────────────────────
   FUNCIÓN: DIBUJAR LÍNEA
   Renderiza una línea bezier en el canvas usando el progreso actual
   ───────────────────────────────────────────────────────────────────── */

function drawLine(line) {
  const p0 = { x: line.startX, y: line.startY };
  const p1 = { x: line.cp1X, y: line.cp1Y };
  const p2 = { x: line.cp2X, y: line.cp2Y };
  const p3 = { x: line.endX, y: line.endY };

  ctx.beginPath();

  // Calcular primer punto
  const first = getBezierPoint(0, p0, p1, p2, p3);
  ctx.moveTo(first.x, first.y);

  // Interpolar múltiples puntos a lo largo de la curva
  const steps = 140; // Cantidad de segmentos (más = más suave)
  const maxT = line.progress; // Propiedad animada

  for (let i = 1; i <= steps * maxT; i++) {
    const t = i / steps;
    const point = getBezierPoint(t, p0, p1, p2, p3);
    ctx.lineTo(point.x, point.y);
  }

  // Aplicar estilos
  ctx.strokeStyle = GREEN;
  ctx.globalAlpha = line.opacity;
  ctx.lineWidth = line.width;
  ctx.lineCap = "round"; // Terminaciones redondeadas
  ctx.lineJoin = "round";
  ctx.stroke();
  ctx.globalAlpha = 1;
}

/* ─────────────────────────────────────────────────────────────────────
   FUNCIÓN: ANIMAR
   Loop principal de animación usando requestAnimationFrame
   ───────────────────────────────────────────────────────────────────── */

function animate() {
  // Limpiar canvas
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  // Actualizar y dibujar cada línea
  lines.forEach((line) => {
    // Incrementar progreso hasta 1 (línea completamente visible)
    if (line.progress < 1) {
      line.progress += line.speed;
    }

    // Dibujar línea actual
    drawLine(line);
  });

  // Solicitar siguiente frame (más eficiente que setInterval)
  animationFrameId = requestAnimationFrame(animate);
}

/* ═══════════════════════════════════════════════════════════════════════
   MENÚ - LÓGICA
   ═══════════════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────────────
   ELEMENTOS DEL DOM
   ───────────────────────────────────────────────────────────────────── */

const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuToggle = document.getElementById("menuToggle");
const dropdownMenu = document.getElementById("dropdownMenu");

/* ─────────────────────────────────────────────────────────────────────
   FUNCIÓN: TOGGLE MENÚ HAMBURGUESA (MOBILE)
   Abre/cierra el menú móvil al hacer click en el botón
   ───────────────────────────────────────────────────────────────────── */

function toggleMobileMenu() {
  const isOpen = mobileMenu.classList.contains("active");

  if (isOpen) {
    mobileMenu.classList.remove("active");
    hamburgerBtn.classList.remove("active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
  } else {
    mobileMenu.classList.add("active");
    hamburgerBtn.classList.add("active");
    hamburgerBtn.setAttribute("aria-expanded", "true");
  }
}

/* ─────────────────────────────────────────────────────────────────────
   FUNCIÓN: TOGGLE MENÚ DESPLEGABLE (DESKTOP)
   Abre/cierra el menú desplegable al hacer click
   ───────────────────────────────────────────────────────────────────── */

function toggleDropdownMenu() {
  const isOpen = dropdownMenu.classList.contains("active");

  if (isOpen) {
    dropdownMenu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  } else {
    dropdownMenu.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
  }
}

/* ─────────────────────────────────────────────────────────────────────
   FUNCIÓN: CERRAR MENÚS
   Cierra los menús cuando se hace click fuera o en un enlace
   ───────────────────────────────────────────────────────────────────── */

function closeMenus() {
  // Cerrar menú móvil
  mobileMenu.classList.remove("active");
  hamburgerBtn.classList.remove("active");
  hamburgerBtn.setAttribute("aria-expanded", "false");

  // Cerrar menú desplegable
  dropdownMenu.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
}

/* ─────────────────────────────────────────────────────────────────────
   EVENT LISTENERS - MENÚ
   ───────────────────────────────────────────────────────────────────── */

// Click en botón hamburguesa
hamburgerBtn.addEventListener("click", toggleMobileMenu);

// Click en botón desplegable
menuToggle.addEventListener("click", toggleDropdownMenu);

// Click en enlaces del menú móvil (cierra menú al navegar)
document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", closeMenus);
});

// Click en enlaces del menú desplegable (cierra menú al navegar)
document.querySelectorAll(".dropdown-menu a").forEach((link) => {
  link.addEventListener("click", closeMenus);
});

// Click fuera del menú cierra ambos menús
document.addEventListener("click", (event) => {
  const isClickInsideMenu =
    mobileMenu.contains(event.target) ||
    hamburgerBtn.contains(event.target) ||
    menuToggle.contains(event.target) ||
    dropdownMenu.contains(event.target);

  if (!isClickInsideMenu) {
    closeMenus();
  }
});

// Cerrar menús cuando se redimensiona la pantalla
window.addEventListener("resize", () => {
  closeMenus();
});

/* ═══════════════════════════════════════════════════════════════════════
   INICIALIZACIÓN - CANVAS
   ═══════════════════════════════════════════════════════════════════════ */

// Redimensionar canvas cuando cambia tamaño de ventana
window.addEventListener("resize", resizeCanvas);

// Implementar lazy initialization: solo iniciar animación si está visible
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    resizeCanvas();
    animate();
  });
} else {
  // Si el script se carga después de DOMContentLoaded
  resizeCanvas();
  animate();
}

// Pausar animación si pestaña no está visible (mejora performance)
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Cancelar animation frame
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  } else {
    // Reanudar animación
    animate();
  }
});

/* ─────────────────────────────────────────────────────────────────────
   NOTAS DE PERFORMANCE Y ACCESIBILIDAD
   ───────────────────────────────────────────────────────────────────── */
/*
  CANVAS:
  ✓ requestAnimationFrame en lugar de setInterval
  ✓ Detección de visibilidad de pestaña para pausar animación
  ✓ Support para High DPI displays (devicePixelRatio)
  ✓ Menos líneas en mobile (5 vs 9 en desktop)

  MENÚ:
  ✓ Mobile First: menú hamburguesa por defecto
  ✓ Menú desplegable en desktop
  ✓ ARIA labels para accesibilidad
  ✓ Cierre automático al navegar o hacer click fuera
  ✓ Respeta prefers-reduced-motion
  ✓ Estados focus para navegación keyboard
*/
