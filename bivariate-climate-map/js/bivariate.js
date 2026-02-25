/**
 * bivariate.js — Clasificación bivariada y paleta de colores
 * 
 * Dos variables → quantiles → matriz n×n → colores mezclados.
 * Paleta basada en Joshua Stevens (dpto. cartografía, US Census).
 * 
 * Variable A (eje X): GHG per cápita 2023 (t CO₂eq/persona)
 * Variable B (eje Y): % cambio emisiones 2013→2023
 */

// --- Paleta bivariada 3×3: Teal × Magenta (NYC bikeshare-inspired) ---
// Teal = emissions reducing (cool/positive). Magenta = emissions increasing (warm/alert).
// Lighter tints = low per capita. Deeper saturation = high per capita.
// Cross-mix produces lavender/mauve in the center — readable on warm gray bg.
// Ref: NYC subway/bikeshare heatmap palette (teal → cream → coral → magenta).
// Matrix[row][col]: row = quantile B (change), col = quantile A (per capita)
const BIVARIATE_COLORS = [
  // B low (strong reduction) — teal light → teal deep
  ["#73d2c0", "#3a9e8f", "#1b6e62"],
  // B mid — lavender/mauve neutral blend
  ["#c0b5c8", "#8e7e96", "#5e4f66"],
  // B high (increase / little reduction) — rose → magenta → deep berry
  ["#e48aaf", "#c24e80", "#882058"]
];

// Número de clases por eje
const N = 3;

/**
 * Calcula los breakpoints de quantiles para un array de valores.
 * Devuelve N-1 umbrales que dividen los datos en N grupos iguales.
 */
function quantileBreaks(values, n = N) {
  const sorted = [...values].filter(v => v != null).sort((a, b) => a - b);
  return Array.from({ length: n - 1 }, (_, i) =>
    sorted[Math.floor(((i + 1) / n) * sorted.length)]
  );
}

/**
 * Clasifica un valor en su quantil (0 a N-1) según los breaks.
 */
function classify(value, breaks) {
  for (let i = 0; i < breaks.length; i++) {
    if (value <= breaks[i]) return i;
  }
  return breaks.length; // último grupo
}

/**
 * Clasifica todas las regiones y devuelve breaks + clasificaciones.
 * @param {Array} data - Array de objetos con campos varA y varB
 * @param {string} keyA - nombre del campo para variable A (eje X)
 * @param {string} keyB - nombre del campo para variable B (eje Y)
 * @returns {Object} { breaksA, breaksB, classified }
 */
function bivariateClassify(data, keyA, keyB) {
  const valuesA = data.map(d => d[keyA]);
  const valuesB = data.map(d => d[keyB]);
  const breaksA = quantileBreaks(valuesA);
  const breaksB = quantileBreaks(valuesB);

  const classified = data.map(d => ({
    ...d,
    classA: classify(d[keyA], breaksA),
    classB: classify(d[keyB], breaksB),
    get color() { return BIVARIATE_COLORS[this.classB][this.classA]; }
  }));

  return { breaksA, breaksB, classified };
}

export { BIVARIATE_COLORS, N, quantileBreaks, classify, bivariateClassify };
