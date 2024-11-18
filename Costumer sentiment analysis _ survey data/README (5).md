# Customer Sentiment Analysis Dashboard

## Overview

This project visualizes sentiment data from a simulated customer survey, highlighting positive, neutral, and negative responses across various categories. The dashboard is built using R and `ggplot2`, with storytelling elements to emphasize key insights.

## Key Features

- **Visualization Style:** Bubble charts created with `geom_bspline_closed` to represent sentiment proportions in each category.
- **Storytelling Insights:**
  - Aesthetics and Design show strongest positive sentiment.
  - Customer Service and Durability need immediate attention.
  - Overall satisfaction rate: 38%.
- **Data Source:** Simulated survey responses.

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/usuario/CustomerSentimentDashboard.git
   ```
2. Open the R project or script file in your R environment (e.g., RStudio).
3. Install the required packages:
   ```r
   install.packages(c("tidyverse", "ggforce", "ggtext", "showtext"))
   ```
4. Run the script `customer_sentiment_dashboard.R` to generate the visualization.
5. The dashboard will be saved as `customer_sentiment_dashboard_aligned.png`.

## Example Visualization

![Dashboard Example](customer_sentiment_dashboard_aligned.png)

## Credits

- **Author:** Yusnelkis Milanés Guisado
- **Data:** Expanded Simulated Survey
- **Tools:** R, ggplot2, ggforce, ggtext

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
