/**
 * main.js — Bivariate choropleth map orchestrator
 *
 * Flow:
 * 1. Load TopoJSON (NUTS2) + CSV (EDGAR data) in parallel
 * 2. Join by nuts_id, classify bivariate (quantiles 3x3)
 * 3. Draw map + legend + tooltips + annotations + insight
 *
 * Sources:
 * - EDGAR JRC v2024, GHG NUTS2 (DOI: 10.2905/D67EEDA8-C03E-4421-95D0-0ADC460B9658)
 * - Eurostat demo_r_d2jan (population 2023)
 * - Eurostat/GISCO Nuts2json (NUTS 2021 geometries)
 */

import { bivariateClassify } from "./bivariate.js?v=10";
import { drawLegend } from "./legend.js?v=10";
import { initTooltip, showTooltip, hideTooltip } from "./tooltip.js?v=10";

const TOPO_URL = "https://raw.githubusercontent.com/eurostat/Nuts2json/master/pub/v2/2021/4326/20M/2.json";
const DATA_URL = "data/bivariate_data.csv";

const REQUIRED_ID = "nuts_id";

async function init() {
  const [topo, csvRaw] = await Promise.all([
    d3.json(TOPO_URL),
    d3.csv(DATA_URL, d3.autoType)
  ]);

  if (!csvRaw?.length) throw new Error("CSV empty or unreachable");
  if (!topo?.objects) throw new Error("Invalid TopoJSON");

  const cols = Object.keys(csvRaw[0]);
  const VAR_A = cols.find(c => /per.?capita/i.test(c));
  const VAR_B = cols.find(c => /pct.?change/i.test(c));
  if (!VAR_A || !VAR_B) throw new Error(`Bivariate columns not found. Available: ${cols.join(", ")}`);
  if (!cols.includes(REQUIRED_ID)) throw new Error(`Column '${REQUIRED_ID}' not found`);

  // --- Bivariate classification ---
  const { breaksA, breaksB, classified } = bivariateClassify(csvRaw, VAR_A, VAR_B);
  const dataMap = new Map(classified.map(d => [d[REQUIRED_ID], d]));

  // --- Key data points ---
  const increasing = classified.filter(d => d[VAR_B] > 0);
  const highAndGrowing = classified.filter(d => d.classA === 2 && d.classB === 2);
  const maxIncrease = classified.reduce((a, b) => b[VAR_B] > a[VAR_B] ? b : a);
  const maxReduction = classified.reduce((a, b) => b[VAR_B] < a[VAR_B] ? b : a);
  const maxPerCapita = classified.reduce((a, b) => b[VAR_A] > a[VAR_A] ? b : a);

  // --- Narrative insight ---
  document.getElementById("insight").innerHTML =
    `<span class="hl-accent">${increasing.length} regions increased</span> emissions; ` +
    `${highAndGrowing.length} were already top emitters. ` +
    `From ${maxReduction.name} ` +
    `(<span class="hl-teal">${maxReduction[VAR_B].toFixed(0)}%</span>) to ${maxIncrease.name} ` +
    `(<span class="hl-accent">+${maxIncrease[VAR_B].toFixed(0)}%</span>), the transition is uneven.`;

  // --- Prepare geometries ---
  const objectKey = Object.keys(topo.objects).find(k =>
    topo.objects[k].geometries?.some(g => g.properties?.id?.length === 4)
  ) || Object.keys(topo.objects)[0];

  const geojson = topojson.feature(topo, topo.objects[objectKey]);

  // --- Draw map — maximize space ---
  const container = document.getElementById("map");
  const wrapper = container.closest(".map-wrapper");
  const width = wrapper.clientWidth || wrapper.getBoundingClientRect().width || 900;
  const height = wrapper.clientHeight || wrapper.getBoundingClientRect().height || 600;

  const svg = d3.select("#map")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMin meet");

  // Fit projection to continental EU only (exclude overseas territories)
  // Canaries, Azores, Madeira, French DOMs push the bbox too wide → tiny map
  const continental = {
    type: "FeatureCollection",
    features: geojson.features.filter(f => {
      const [lon, lat] = d3.geoCentroid(f);
      return lon > -12 && lon < 35 && lat > 34 && lat < 72;
    })
  };

  const projection = d3.geoConicConformal()
    .center([10, 52])
    .rotate([-10, 0])
    .parallels([35, 65])
    .fitSize([width, height], continental);

  const path = d3.geoPath(projection);

  // Country borders
  const cntrKey = Object.keys(topo.objects).find(k =>
    topo.objects[k].geometries?.some(g => g.properties?.id?.length === 2)
  );
  if (cntrKey) {
    svg.append("g").attr("class", "countries")
      .selectAll("path")
      .data(topojson.feature(topo, topo.objects[cntrKey]).features)
      .join("path")
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "#9a958c")
      .attr("stroke-width", 0.8);
  }

  // NUTS2 regions
  initTooltip({ keyA: VAR_A, keyB: VAR_B });

  svg.append("g").attr("class", "regions")
    .selectAll("path")
    .data(geojson.features)
    .join("path")
    .attr("d", path)
    .attr("fill", d => {
      const record = dataMap.get(d.properties.id);
      return record ? record.color : "#ddd8ce";
    })
    .attr("stroke", "#eae6de")
    .attr("stroke-width", 0.3)
    .attr("class", d => {
      const record = dataMap.get(d.properties.id);
      return record ? `region cell-${record.classA}-${record.classB}` : "region no-data";
    })
    .on("mouseenter", (event, d) => {
      const record = dataMap.get(d.properties.id);
      if (record) {
        d3.select(event.currentTarget).attr("stroke", "#2a2a2a").attr("stroke-width", 1.5);
        showTooltip(event, record);
      }
    })
    .on("mousemove", (event, d) => {
      const record = dataMap.get(d.properties.id);
      if (record) showTooltip(event, record);
    })
    .on("mouseleave", (event) => {
      d3.select(event.currentTarget).attr("stroke", "#eae6de").attr("stroke-width", 0.3);
      hideTooltip();
    });

  // --- Annotations — each placed in clear open space ---
  const annoGroup = svg.append("g").attr("class", "annotations");

  // Kýpros (SE) → right into Mediterranean sea
  // Dytiki Makedonia (N Greece) → down-right, separated from Kýpros
  // Groningen (NL north) → left-up into North Sea empty area
  const annoDefs = [
    { record: maxIncrease, type: "increase",
      fmt: r => `${r.name}: +${r[VAR_B].toFixed(0)}%`,
      why: "Transport & tourism rebound",
      ox: 65, oy: -25 },
    { record: maxReduction, type: "reduction",
      fmt: r => `${r.name}: ${r[VAR_B].toFixed(0)}%`,
      why: "Lignite plant shutdowns",
      ox: 55, oy: 75 },
    { record: maxPerCapita, type: "percapita",
      fmt: r => `${r.name}: ${r[VAR_A].toFixed(0)} t/cap`,
      why: "Europe\u2019s largest gas field",
      ox: -120, oy: -70 }
  ];

  annoDefs.forEach(({ record, type, fmt, why, ox, oy }) => {
    const feat = geojson.features.find(f => f.properties.id === record[REQUIRED_ID]);
    if (!feat) return;
    const [cx, cy] = path.centroid(feat);
    if (isNaN(cx)) return;

    const labelX = Math.max(50, Math.min(width - 140, cx + ox));
    const labelY = Math.max(16, Math.min(height - 12, cy + oy));

    annoGroup.append("line")
      .attr("class", `annotation-line annotation-line-${type}`)
      .attr("x1", cx).attr("y1", cy)
      .attr("x2", labelX).attr("y2", labelY);

    annoGroup.append("text")
      .attr("class", `annotation annotation-${type}`)
      .attr("x", labelX + 4).attr("y", labelY + 4)
      .text(fmt(record));

    annoGroup.append("text")
      .attr("class", `annotation-why annotation-why-${type}`)
      .attr("x", labelX + 4).attr("y", labelY + 16)
      .text(why);
  });

  // --- Legend ---
  drawLegend("#legend", {
    labelA: "GHG per capita (t)",
    labelB: "Emission change (%)",
    onCellHover(classA, classB) {
      svg.selectAll(".region")
        .transition().duration(150)
        .style("opacity", function () {
          return this.classList.contains(`cell-${classA}-${classB}`) ? 1 : 0.15;
        });
    },
    onCellLeave() {
      svg.selectAll(".region")
        .transition().duration(150)
        .style("opacity", 1);
    }
  });

  // --- Metadata inline in footer ---
  document.getElementById("meta").textContent =
    `${classified.length} NUTS2 · EU-27 · Per cap. breaks: ${breaksA.map(b => b.toFixed(1)).join(", ")} t · Change: ${breaksB.map(b => b.toFixed(1)).join(", ")}%`;
}

init().catch(err => {
  console.error("Error loading data:", err);
  document.getElementById("map").innerHTML =
    `<p class="error" style="color:#c24e80">Error: ${err.message}</p>`;
});
