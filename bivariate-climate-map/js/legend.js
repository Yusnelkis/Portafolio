/**
 * legend.js — Leyenda bivariada matricial 3x3
 *
 * Celdas con flechas de eje + etiquetas descriptivas en esquinas
 * para guiar la lectura sin ambigüedad.
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
  const margin = { top: 20, right: 6, bottom: 60, left: 28 };
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

  // --- Axis labels with arrows (→ and ↑) inline ---
  g.append("text")
    .attr("x", size / 2).attr("y", size + 16)
    .attr("text-anchor", "middle")
    .attr("class", "legend-label")
    .text((labelA || "Variable A") + " \u2192");

  g.append("text")
    .attr("x", -(size / 2)).attr("y", -14)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("class", "legend-label")
    .text("\u2191 " + (labelB || "Variable B"));

  // --- Diagonal corner labels: the two extremes ---
  g.append("text")
    .attr("x", -2).attr("y", size + 28)
    .attr("class", "legend-corner")
    .text("Low, falling");

  g.append("text")
    .attr("x", size + 2).attr("y", -8)
    .attr("text-anchor", "end")
    .attr("class", "legend-corner")
    .text("High, rising");

  // --- No data indicator ---
  const ndY = size + 40;
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
