/**
 * legend.js — Leyenda bivariada matricial 3x3
 *
 * Estilo Joshua Stevens: celdas grandes, flechas de eje,
 * etiquetas cortas. Hover sobre celda resalta regiones.
 */

import { BIVARIATE_COLORS, N } from "./bivariate.js";

const CELL = 34;
const GAP = 1.5;

/**
 * Renderiza la leyenda bivariada.
 * @param {string} selector - Selector CSS del contenedor
 * @param {Object} opts - { labelA, labelB, onCellHover, onCellLeave }
 */
function drawLegend(selector, { labelA, labelB, onCellHover, onCellLeave } = {}) {
  const size = N * (CELL + GAP) - GAP;
  const margin = { top: 6, right: 6, bottom: 40, left: 24 };
  const w = size + margin.left + margin.right;
  const h = size + margin.top + margin.bottom;

  const svg = d3.select(selector)
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "bivariate-legend");

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Celdas de color — fila 0 (arriba) = B alto, fila 2 (abajo) = B bajo
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      const bIdx = N - 1 - row;
      g.append("rect")
        .attr("x", col * (CELL + GAP))
        .attr("y", row * (CELL + GAP))
        .attr("width", CELL)
        .attr("height", CELL)
        .attr("fill", BIVARIATE_COLORS[bIdx][col])
        .attr("class", `legend-cell cell-${col}-${bIdx}`)
        .style("cursor", "pointer")
        .on("mouseenter", () => onCellHover?.(col, bIdx))
        .on("mouseleave", () => onCellLeave?.());
    }
  }

  // --- Flechas de eje ---
  const arrowLen = size + 6;

  // Eje X (horizontal)
  g.append("line")
    .attr("x1", 0).attr("y1", size + 8)
    .attr("x2", arrowLen).attr("y2", size + 8)
    .attr("stroke", "#9a958c").attr("stroke-width", 1);
  g.append("polygon")
    .attr("points", `${arrowLen},${size + 5} ${arrowLen},${size + 11} ${arrowLen + 5},${size + 8}`)
    .attr("fill", "#9a958c");

  // Eje Y (vertical)
  g.append("line")
    .attr("x1", -8).attr("y1", size)
    .attr("x2", -8).attr("y2", -6)
    .attr("stroke", "#9a958c").attr("stroke-width", 1);
  g.append("polygon")
    .attr("points", `${-11},${-6} ${-5},${-6} ${-8},${-11}`)
    .attr("fill", "#9a958c");

  // --- Etiquetas de eje ---
  g.append("text")
    .attr("x", size / 2).attr("y", size + 20)
    .attr("text-anchor", "middle")
    .attr("class", "legend-label")
    .text(labelA || "Variable A");

  g.append("text")
    .attr("x", -(size / 2)).attr("y", -16)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("class", "legend-label")
    .text(labelB || "Variable B");

  // --- No data indicator ---
  const ndY = size + 28;
  g.append("rect")
    .attr("x", 0).attr("y", ndY)
    .attr("width", 12).attr("height", 12)
    .attr("fill", "#ddd8ce").attr("stroke", "#cdc8be").attr("stroke-width", 0.5);
  g.append("text")
    .attr("x", 16).attr("y", ndY + 10)
    .attr("class", "legend-label")
    .style("text-transform", "none")
    .text("No data");

  return svg;
}

export { drawLegend };
