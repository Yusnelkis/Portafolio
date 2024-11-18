library(tidyverse)
library(ggforce)
library(ggtext)
library(showtext)

# ------ Leer Datos ------ 
data <- read.csv("expanded_simulated_survey_data.csv")

# ------ Limpieza y Preparación de Datos ------ 

# Definir niveles de sentimientos explícitos
sentiment_levels <- c("Positive", "Neutral", "Negative")

# Asegurarse de que todos los sentimientos estén presentes
df <- data %>%
  mutate(Sentiment = factor(Sentiment, levels = sentiment_levels)) %>%
  group_by(Category, Sentiment) %>%
  summarise(n = sum(responses, na.rm = TRUE), .groups = "drop") %>%
  complete(Category, Sentiment, fill = list(n = 0)) %>%  # Asegurar todas las combinaciones
  group_by(Category) %>%
  mutate(total = sum(n),
         perc_of_total = round(100 * n / total, 1),
         category_nr = row_number()) %>%
  ungroup()

f <- 0.5  # Factor para dar forma a los "globos"

# Verificar dinámicamente el número de categorías reales
num_categories <- max(df$category_nr, na.rm = TRUE)

df_shapes <- df %>%
  rowwise() %>%
  mutate(
    x_coords = list(c(0,
                      f * perc_of_total * sin(category_nr * 2 * pi / 3 - pi/4),
                      perc_of_total * sin(category_nr * 2 * pi / 3),
                      f * perc_of_total * sin(category_nr * 2 * pi / 3 + pi/5),
                      0)),
    y_coords = list(c(0,
                      f * perc_of_total * cos(category_nr * 2 * pi / 3 - pi/5),
                      perc_of_total * cos(category_nr * 2 * pi / 3),
                      f * perc_of_total * cos(category_nr * 2 * pi / 3 + pi/4),
                      0))
  ) %>%
  ungroup()

# Expande las listas dinámicamente y renombra para evitar conflictos
df_shapes <- df_shapes %>%
  mutate(points = map2(x_coords, y_coords, ~ tibble(x = .x, y = .y))) %>%
  unnest(points, names_sep = "_")

# ------ Colores ------ 
# Azul medio, gris claro, rojo
pal <- c("#2A9D8F", "#BFBFBF", "#E63946")  # Azul medio, Gris claro, Rojo

# ------ Tipografía ------ 
font_add_google("Fraunces", "title_font")
font_add_google("Chivo", "body_font")
showtext_auto()

title_font <- "title_font"
body_font <- "body_font"

# ------ Configuración del Tema ------ 
bg <- "#FFFFFF"
txt_col <- "black"

# ------ Textos ------ 
title_text <- "Customer sentiment analysis survey data"
subtitle_text <- "**Key Insights:**<br>• Aesthetics and Design show strongest positive sentiment<br>• Customer Service and Durability need immediate attention<br>• Overall satisfaction rate: 38%"
caption_text <- "Based on 1,334 responses<br>Graphic by Yusnelkis Milanés Guisado | Data: Expanded Simulated Survey"

# ------ Gráfico ------ 
df_shapes %>%
  ggplot() +
  geom_bspline_closed(aes(points_x, points_y, group = interaction(Category, Sentiment), fill = Sentiment), alpha = 0.8) +
  scale_fill_manual(values = pal, labels = sentiment_levels) +
  coord_fixed() +
  facet_wrap(vars(Category), ncol = 4,
             labeller = labeller(Category = label_wrap_gen(width = 10))) +
  labs(title = title_text,
       subtitle = subtitle_text,
       caption = caption_text,
       x = "",
       y = "") +
  theme_minimal(base_family = "Chivo") +
  theme(
    strip.text.x = element_text(family = title_font,
                                face = 'bold',
                                size = 15, colour = "grey20"),
    axis.text = element_blank(),
    axis.ticks = element_blank(),
    panel.grid.major = element_line(color = "grey90", size = 0.2),  # Cuadrícula más pequeña
    panel.grid.minor = element_line(color = "grey95", size = 0.1),  # Cuadrícula adicional, más fina
    legend.position = "top",
    legend.title = element_blank(),
    legend.key.height = unit(0.5, 'cm'),
    legend.key.width = unit(1.5, 'cm'),
    legend.text = element_text(family = body_font,
                               size = 12,
                               face = 'plain',
                               color = txt_col),
    plot.title = element_text(family = title_font, size = 24, face = "bold", hjust = 0.5,
                              margin = margin(t = 20, b = 10)),  # Espaciado del título
    plot.subtitle = element_markdown(family = body_font, size = 14, hjust = 0.5, color = "grey30",
                                     margin = margin(t = 10, b = 20)),  # Espaciado entre subtítulos
    plot.caption = element_markdown(family = body_font, size = 12, hjust = 0.5, color = "grey40",
                                    margin = margin(t = 20)),  # Espaciado del pie de página
    plot.margin = margin(t = 30, r = 20, b = 30, l = 20),  # Espaciado general
    legend.margin = margin(t = 10, b = 20),  # Espaciado entre leyenda y gráfico
    plot.background = element_rect(fill = bg, color = NA)
  )

# ------ Guardar Gráfico ------ 
ggsave("customer_sentiment.png", dpi = 320,
       width = 14, height = 15)
showtext_auto(FALSE)
