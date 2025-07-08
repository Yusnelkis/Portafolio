# Portafolio

Aprovecho este espacio para compartir algunos de mis proyectos. En su mayoría serán proyectos de Visualización de datos y/o Machine Learning, con datos en abierto y otros de interés. El fin es resolver determinadas preguntas a partir de los datos, prácticar con distintos modelos tanto visuales como de Ml o DL y, sobre todas las cosas, disfrutar el camino mientras aprendo.

# 🏙️ Barcelona Livability Index

**Geospatial analysis of urban livability across Barcelona districts using OpenStreetMap data**

![Barcelona Livability Index](barcelona_livability_map.png)
![Uso de barras_datos encuesta_v1](https://github.com/Yusnelkis/Portafolio/blob/main/Barras%20en%20datos%20de%20encuesta/Uso%20de%20barras_datos%20encuesta_v1.png)

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

# Survivalschart

Fuente de inspiración:  

Github de Tanya Shapiro [tashapiro](https://github.com/tashapiro/TidyTuesday/commits?author=tashapiro)

![survivals](https://github.com/Yusnelkis/Survivalschart_Day01/blob/c7fb8d2fc74077349a5fdf95572d59fcfcae5010/Imagenes/survivalists_week01.png)

# Pablo de Olavide University at Macro citation reports_ chart02

Con esta visualización, además de querer testar el nuevo el nuevo modelo visual de Datawrapper (small multiples lines), quería realizar una primera mirada al comportamiento y perfil de citación de la Universidad Pablo de Olavide en los Macro citation reports de Incites. 
Es una primera aproximación usando los datos de Incites (Suit bibliométrica de Web of Science), durante el periodo 2010_2021. 

Los Macro Citation Topics (MCT) son informes que proporcionan una visión general de los temas y áreas de investigación más destacados en un campo académico específico, basados en el análisis de las citas dentro de la literatura científica.
Aún así esto resulta, de momento, insuficiente en tanto he utilizado una única base de datos. Es recomendable utilizar los Macro Citation Topics junto con otras fuentes de información

Puedes acceder a la visualización interactiva en: [https://www.datawrapper.de/_/j0J9c](https://datawrapper.dwcdn.net/j0J9c/1/)

![UPO_Macrocitationreports](https://github.com/Yusnelkis/Portafolio/blob/main/UPO%20en%20los%20Macro%20Citation%20%20report/UPO_Macrocitationsreports_09022024.png)


# Uso de barras en la visualización de datos de encuesta_ Encuesta de satisfacción en una biblioteca_chart03

Con este ejemplo de visualización de datos de encuesta, se muestra el uso de las traidcionales barras como modelo visual efectivo en la visualización de datos de encuesta de satisfacción.
Se muestran sólo algunos ejemplos. 

Puedes acceder a la visualización interactiva en: [https://public.tableau.com/app/profile/yusnelkis/viz/Encuestasatisfaccinbiblioteca_2023_YMG270724/Usodebarras_datosencuesta]

![Uso de barras_datos encuesta_v1](https://github.com/Yusnelkis/Portafolio/blob/main/Barras%20en%20datos%20de%20encuesta/Uso%20de%20barras_datos%20encuesta_v1.png)


# Detección de fraudes con tarjetas de crédito

Este proyecto de Machine Leraning, a través de la construcción y validación de un modelo de clasificación RandomForest, es resultado del trabajo final evaluado para obtener la certificación en el Programa de Inteligencia Artificial de IBM e IBMSkillUp

![Matriz de confusion_Proyecto datos fraude](https://github.com/Yusnelkis/Portafolio/blob/main/Proyectos_ML_RandomeForest_datosfraude/Matriz%20de%20confusion_Proyecto%20datos%20fraude.png)

# Course Metrics 

Este proyecto de analítica y visualización de datos con Tableau, me permitió replicar uno de los Dashboards incluidos en el libro "The big Dashboards. 

Puedes acceder a la visualización interactiva en:[https://public.tableau.com/app/profile/yusnelkis/viz/Encuestasatisfaccinbiblioteca_2023_YMG270724/Usodebarras_datosencuesta]

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



