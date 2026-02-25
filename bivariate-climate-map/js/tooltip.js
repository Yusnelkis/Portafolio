/**
 * tooltip.js — Parametric tooltip for bivariate map
 *
 * Receives column names at init — no hardcoded fields.
 * Plain text, solid background, clean borders.
 */

let tooltip, varA, varB;

function initTooltip({ keyA, keyB } = {}) {
  varA = keyA;
  varB = keyB;
  tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
}

function showTooltip(event, d) {
  if (!d) return;
  const valA = d[varA], valB = d[varB];
  const arrow = valB > 0 ? "\u25B2" : "\u25BC";
  const changeClass = valB > 0 ? "change-up" : "change-down";

  tooltip
    .html(`
      <strong>${d.name || d.nuts_id}</strong>
      <span class="tooltip-country">${d.country || ""}</span>
      <div class="tooltip-row">
        <span class="tooltip-label">GHG per capita</span>
        <span class="tooltip-value">${valA.toFixed(1)} t</span>
      </div>
      <div class="tooltip-row">
        <span class="tooltip-label">Change 2013\u20132023</span>
        <span class="tooltip-value ${changeClass}">${arrow} ${Math.abs(valB).toFixed(1)}%</span>
      </div>
    `)
    .style("left", (event.pageX + 14) + "px")
    .style("top", (event.pageY - 28) + "px")
    .transition().duration(120)
    .style("opacity", 1);
}

function hideTooltip() {
  tooltip.transition().duration(200).style("opacity", 0);
}

export { initTooltip, showTooltip, hideTooltip };
