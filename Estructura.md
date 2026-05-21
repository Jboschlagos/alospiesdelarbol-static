# PROYECTO OPTIMIZADO — Estructura de carpetas

```
a-los-pies-del-arbol/
│
├── index.html                    # HTML puro (solo estructura semántica)
├── css/
│   └── styles.css               # Estilos separados (13 secciones organizadas)
├── js/
│   └── main.js                  # JavaScript separado (animación Canvas optimizada)
└── assets/
    ├── Lunema-Regular.woff2     # Tipografía
    ├── hero.jpg                 # Imagen hero
    ├── resena.jpg               # Imagen reseña
    ├── description.jpg          # Imagen descripción
    ├── a-los-pies-del-arbol_DOSSIER_ES_.pdf
    └── a-los-pies-del-arbol_DOSSIER_EN_.pdf
```

---

## CAMBIOS REALIZADOS

### 1. **HTML** (`index.html`)

✓ Eliminados estilos inline  
✓ Eliminado script inline  
✓ Agregados atributos semánticos (`role`, `aria-label`)  
✓ Agregado meta description  
✓ Preload de tipografía para mejor performance  
✓ Scripts cargados con atributo `defer`

### 2. **CSS** (`css/styles.css`)

✓ 13 secciones comentadas por funcionalidad  
✓ Organizado con CSS variables (--green, --black, etc.)  
✓ Transiciones centralizadas (var(--transition-speed))  
✓ Agregado efecto parallax (background-attachment: fixed)  
✓ Mejoras de accesibilidad:

- Respeto a `prefers-reduced-motion`
- Soporte para `prefers-contrast: more`
- Estados focus para navegación keyboard  
  ✓ Mobile-first responsive (breakpoint en 900px)

### 3. **JavaScript** (`js/main.js`)

✓ Comentarios detallados por función  
✓ Manejo de High DPI displays (devicePixelRatio)  
✓ Lazy initialization (espera DOMContentLoaded)  
✓ Pausa automática cuando pestaña está oculta  
✓ Optimizaciones de performance documentadas  
✓ Mejor estructura del código (modular)

---

## OPTIMIZACIONES DE PERFORMANCE

| Aspecto           | Mejora                                             |
| ----------------- | -------------------------------------------------- |
| **Rendering**     | requestAnimationFrame en lugar de setInterval      |
| **Memory**        | Pausa animación cuando pestaña no está visible     |
| **Mobile**        | Menos líneas (5 vs 9), parallax desactivado        |
| **Fuentes**       | Preload WOFF2 + font-display: swap                 |
| **CSS**           | Variables reutilizables, media queries optimizadas |
| **Accesibilidad** | ARIA labels, focus states, respeto a preferencias  |
| **DPI**           | Soporte para retina displays (devicePixelRatio)    |

---

## CÓMO USAR

### Opción 1: Local (sin servidor)

```bash
cd a-los-pies-del-arbol
open index.html
```

### Opción 2: Con servidor local

```bash
npx serve .
# → http://localhost:3000
```

---

## VERIFICACIÓN DE FUNCIONALIDAD

✅ Esética visual **idéntica** a original  
✅ Animación Canvas funcionando con 5-9 líneas bezier  
✅ Responsive en mobile (breakpoint 900px)  
✅ Navegación smooth scroll y topbar fijo  
✅ Botones de descarga PDF funcionales  
✅ Enlaces Instagram funcionales  
✅ Canvas redibuja al redimensionar ventana  
✅ Canvas pausa cuando pestaña oculta (performance)

---

## NOTAS DE MANTENIMIENTO

- Los comentarios están en español para mantener consistencia
- Rutas de assets están relativas desde index.html
- CSS variables facilitan cambios de color/timing
- JavaScript es vanilla (sin dependencias)
- Código listo para minificar si se desea
