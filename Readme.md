# A los pies del árbol — Sitio web

Sitio web de la obra teatral **_A los pies del árbol_**, protagonizada por Patricia Rivadeneira y basada en el pensamiento de Humberto Maturana. Dirigida por Manuela Oyarzún Grau.

---

## Descripción

Landing page de una sola página (`index.html`) que presenta la obra, sus secciones de reseña y descripción, los créditos del equipo, y los enlaces para descargar el dossier en español e inglés.

Incluye una animación generativa de líneas curvas (inspiradas en ramas de árbol) renderizada sobre un canvas fijo, usando la paleta cromática característica de la obra: **verde eléctrico `#c7ff02` sobre negro**.

---

## Estructura del proyecto

```
/
├── index.html
└── assets/
    ├── Lunema-Regular.woff2      # Tipografía principal
    ├── hero.jpg                  # Imagen de fondo — sección hero
    ├── resena.jpg                # Imagen de fondo — sección Reseña
    ├── description.jpg           # Imagen de fondo — sección Descripción
    ├── a-los-pies-del-arbol_DOSSIER_ES_.pdf
    └── a-los-pies-del-arbol_DOSSIER_EN_.pdf
```

---

## Secciones

| ID / Ancla    | Contenido                                                  |
| ------------- | ---------------------------------------------------------- |
| `#inicio`     | Hero con nombres, título y botones de descarga del dossier |
| `#info`       | Reseña — concepto de autopoiesis y propósito de la obra    |
| _(sin ancla)_ | Descripción — sinopsis dramática                           |
| _(sin ancla)_ | Créditos del equipo creativo y técnico                     |

---

## Tecnologías

- **HTML5 / CSS3** — sin frameworks ni dependencias externas
- **Canvas API (JavaScript vanilla)** — animación generativa de líneas bezier
- **Tipografía web** — fuente `Lunema` cargada con `@font-face`
- **Diseño responsive** — breakpoint en `900px` con adaptaciones para móvil

---

## Paleta de colores

| Variable CSS | Valor     | Uso                                              |
| ------------ | --------- | ------------------------------------------------ |
| `--green`    | `#c7ff02` | Color principal, textos, bordes, líneas animadas |
| `--black`    | `#000000` | Fondo general                                    |
| `--white`    | `#e8e8e8` | Textos secundarios (créditos, dossier)           |
| `--dark`     | `#050505` | Fondo sección créditos                           |

---

## Animación Canvas

El canvas (`#tree-lines`) se renderiza en posición `fixed` por encima del fondo y por debajo del contenido. Genera entre **5 y 9 líneas bezier cúbicas** (según el ancho de pantalla) que descienden continuamente desde arriba, con variaciones aleatorias de:

- Posición horizontal y deriva
- Curvatura de los puntos de control
- Velocidad de avance
- Grosor y opacidad

Las líneas se regeneran al redimensionar la ventana (`resize`).

---

## Uso

No requiere servidor ni dependencias. Abrir directamente en navegador:

```bash
open index.html
```

O servir localmente para evitar restricciones CORS con las fuentes y assets:

```bash
npx serve .
# → http://localhost:3000
```

---

## Créditos

**Diseño y desarrollo web:** Roberto Torres — [Wonder Digital](https://wonderdigital.cl)

**Obra:** _A los pies del árbol_
**Dirección:** Manuela Oyarzún Grau
**Intérprete:** Patricia Rivadeneira
**Instagram:** [@alospiesdelarbol](https://www.instagram.com/alospiesdelarbol/)
