Welcome to my data science and data visualization portfolio. Here, I share a selection of personal projects, mainly focused on data visualization, machine learning, and occasionally deep learning.

These projects are built using open datasets or curated data sources that spark analytical interest. My goals are:

To answer meaningful questions using data

To practice and improve my skills in visual storytelling, ML/DL modeling, and data workflows

And most importantly, to enjoy the learning journey 🚀

Feel free to explore and connect if anything inspires you.

# 📊 Wiring the AI Era: Data Center Energy & Capacity, 2020–2035

## 🌍 Overview
This project visualizes scenarios of **data center energy demand, capacity, efficiency (PUE)**, and load factors from **2020–2035**, in the context of the **AI era**.

It uses data from the [IEA – Energy and AI](https://www.iea.org/data-and-statistics/data-product/energy-and-ai).

![Wiring the AI Era: Data Center Energy & Capacity, 2020–2035](https://github.com/Yusnelkis/Portafolio/blob/main/Enery%20Data%20Center%20AI/Energy%20and%20AI.PNG)

The design emphasizes **clarity, narrative, and usability**:
- Strong, compact headline for impact.  
- Key insights highlighted upfront.  
- Unified legend explaining **Types (color)** and **Scenarios (line styles)**.  
- Metrics defined in plain language for non-technical audiences.  
- Interactive filtering to explore scenarios without clutter.  

## 🛠️ Technology Stack
- **HTML5 / CSS3** → responsive structure & layout.  
- **JavaScript (ES6+)** → interactivity and filtering.  
- **[D3.js](https://d3js.org/)** → data-driven charts and dynamic visualization.  
- **JetBrains Mono & Inter fonts** → clear separation of data (mono) vs narrative (sans).  
- No heavy framework: built as a **lightweight standalone app** for maximum portability.

- Note: The design was crafted with the support of generative AI tools to explore visual options and accelerate the creative process.

# What customer love ?

A data visualization designed to synthesize insights from 1,300+ customer responses, highlighting strengths, mixed performance areas, and critical pain points.
Each metric is represented with a proportional semicircle and a central percentage, reinforced by a clear label (“POSITIVE” / “NEGATIVE”) to indicate the dominant sentiment.
The three-block structure (Strengths – Mixed Performance – Needs Attention) enables quick scanning to identify what drives satisfaction and what threatens retention.

Goal: create a modular, scalable, and easy-to-interpret visual model for executive reports and customer experience analysis.

Note: The design was crafted with the support of generative AI tools to explore visual options and accelerate the creative process.

![What customer love ?](https://github.com/Yusnelkis/Portafolio/blob/main/WHAT%20CUSTOMER%20LOVE/Customer%20project.png)

# 🏙️ Barcelona Livability Index

**Geospatial analysis of urban livability across Barcelona districts using OpenStreetMap data**

![Barcelona Livability Index](https://github.com/Yusnelkis/Portafolio/blob/main/Barcelona_Livability_Index/BCN%20Map%20livability%20Index_Clean.png)

## Project Overview
Multi-criteria analysis evaluating livability across 8 Barcelona districts based on density of urban amenities. Uses OSMnx for data extraction and creates professional choropleth visualization with weighted composite scoring.

**Key Results**: Eixample (92) and Ciutat Vella (86) lead in livability, while peripheral districts show lower service density.

## OSM Data Dimensions
**Parks & Recreation**: `leisure=park`, `leisure=garden`, `leisure=recreation_ground`, `landuse=recreation_ground`

**Healthcare Services**: `amenity=hospital`, `amenity=clinic`, `amenity=pharmacy`, `amenity=doctors`, `healthcare=*`

**Educational Facilities**: `amenity=school`, `amenity=university`, `amenity=kindergarten`, `amenity=college`

**Commercial Services**: `shop=*`, `amenity=marketplace`, `building=retail`, `landuse=commercial`

## Technical Implementation
- **Data Source**: OpenStreetMap via OSMnx Overpass API
- **Analysis**: Spatial density calculation per km² and weighted composite scoring
- **Visualization**: Custom matplotlib choropleth with subtle urban context
- **Coverage**: 8/10 districts with sufficient data quality (>10 amenities per category)

## Skills Demonstrated
- Geospatial data processing (GeoPandas, OSMnx)
- Multi-criteria analysis and normalization
- Cartographic visualization design
- Scientific transparency in data limitations

**Technologies**: Python • OSMnx • GeoPandas • Matplotlib

# AI Python libraries.

Link interactive data viz [AIPuyhonlibraries](https://yusnelkis.github.io/AIPythonlibraries/)

![Ai python](https://github.com/Yusnelkis/Portafolio/blob/main/AI%20PYTHON%20LIBRARIES/Ai%20pyhton%20libraries.PNG))

Data scources: GitHUB starts, llMS. 
Note: The design was crafted with the support of generative AI tools to explore visual options and accelerate the creative process.

# Survivalschart

Fuente de inspiración:  

Github de Tanya Shapiro [tashapiro](https://github.com/tashapiro/TidyTuesday/commits?author=tashapiro)

![survivals](https://github.com/Yusnelkis/Survivalschart_Day01/blob/c7fb8d2fc74077349a5fdf95572d59fcfcae5010/Imagenes/survivalists_week01.png)

# 🌍 Shadow Economies: The Hidden Networks of Informal Markets in Africa

![survivals](https://github.com/Yusnelkis/Portafolio/blob/9913854272b4ebac75192e1e02bfaf0b8a1e74bd/Shadow%20Economies%3A%20The%20Hidden%20Networks%20of%20Informal%20Markets%20in%20Africa/iNFORMAL%20aFRICAN%20ECONOMY.png)


This project explores the hidden structure of informal economies across **49 African nations (2018–2022)** using **network analysis** and **weighted degree clustering**.

The result is a circular network visualization that reveals cross-regional patterns of economic informality — from **North African formalist clusters** to **Traditional Market Zones**, where informal economies can exceed **60% of GDP**.

## 🧠 What this visualization shows

- **Node size**: Economic importance within the network (weighted degree)
- **Arcs**: Similarities in economic structure between countries based on informal market intensity
- **Color-coded clusters**: Represent six macroeconomic typologies across the continent
- **Countries** are positioned by similarity, not geography

> This visualization helps expose regional economic parallels not always visible through traditional indicators.

## 🛠 Tools and Data

- **Data sources**:
  - World Bank
  - IMF
  - ILO estimates (2018–2022)
- **Visualization tools**:
  - Built using [Scimago Graphica] (https://www.graphica.app/) and edited with graphic design tools

## 📈 Use case

This project is part of a broader research portfolio on **informal markets**, **development economics**, and **regional economic resilience** in Africa.

It aims to provide a **macro-structural lens** for researchers, policymakers, and international organizations interested in the role of informal sectors in national economies.

## 🎯 Author

**Yusnelkis Milanés Guisado**  
Data Scientific & Data Visualization 
✉️ [ymilanes@gmail.com]  

---



# Pablo de Olavide University at Macro citation reports_ chart02

With this visualization, beyond testing Datawrapper’s new small multiples line chart feature, I aimed to take a first look at the citation behavior and profile of the Universidad Pablo de Olavide using the Macro Citation Reports from InCites.

This is a preliminary analysis based on InCites data (the bibliometric suite from Web of Science), covering the period 2010–2021.

Macro Citation Topics (MCTs) are reports that offer an overview of the most prominent research themes and areas within a specific academic field, based on citation analysis from the scientific literature.

However, this remains a partial view, as it relies on a single data source. For more robust insights, it is recommended to complement Macro Citation Topics with additional data sources.

Explore the interactive visualization at: [https://www.datawrapper.de/_/j0J9c](https://datawrapper.dwcdn.net/j0J9c/1/)

![UPO_Macrocitationreports](https://github.com/Yusnelkis/Portafolio/blob/main/UPO%20en%20los%20Macro%20Citation%20%20report/UPO_Macrocitationsreports_09022024.png)


#  Using Bar Charts for Survey Data Visualization — Library Satisfaction Survey _chart03
This example showcases the use of traditional bar charts as an effective visual model for displaying survey satisfaction data.

Only a few selected examples are shown for illustration purposes.

You can access the interactive visualization at: [https://public.tableau.com/app/profile/yusnelkis/viz/Encuestasatisfaccinbiblioteca_2023_YMG270724/Usodebarras_datosencuesta]

![Uso de barras_datos encuesta_v1](https://github.com/Yusnelkis/Portafolio/blob/main/Barras%20en%20datos%20de%20encuesta/Uso%20de%20barras_datos%20encuesta_v1.png)


# Credit Card Fraud Detection

This machine learning project, developed through the construction and validation of a Random Forest classification model, was completed as the final assessed work to obtain certification in the Artificial Intelligence Program by IBM and IBM SkillUp.

![Matriz de confusion_Proyecto datos fraude](https://github.com/Yusnelkis/Portafolio/blob/main/Proyectos_ML_RandomeForest_datosfraude/Matriz%20de%20confusion_Proyecto%20datos%20fraude.png)

# Course Metrics 

This data analytics and visualization project using Tableau allowed me to replicate one of the dashboards featured in the book “The Big Book of Dashboards.”

You can access the interactive visualization at: [https://public.tableau.com/app/profile/yusnelkis/viz/Encuestasatisfaccinbiblioteca_2023_YMG270724/Usodebarras_datosencuesta]

![Dashboard_Coursemetrics](https://github.com/Yusnelkis/Portafolio/blob/main/Dashboard_Course%20metrics/Pursemterics_Dashboard.PNG)

## Customer Sentiment Analysis survey data 

This project visualizes sentiment data from a simulated customer survey, highlighting positive, neutral, and negative responses across various categories. The dashboard is built using R and `ggplot2`, with storytelling elements to emphasize key insights.

## Key Features

- **Visualization Style:** Bubble charts created with `geom_bspline_closed` to represent sentiment proportions in each category.
- **Storytelling Insights:**
  - Aesthetics and Design show strongest positive sentiment.
  - Customer Service and Durability need immediate attention.
  - Overall satisfaction rate: 38%.
- **Data Source:** Simulated survey responses.

![Costumer sentiment analysis _ survey data/customer_sentiment.PNG](https://github.com/Yusnelkis/Portafolio/blob/c3879fa4f9a8c4801293fa98483406dbfa148a78/Costumer%20sentiment%20analysis%20_%20survey%20data/customer_sentiment.png))



