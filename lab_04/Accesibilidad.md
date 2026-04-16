# Informe de Accesibilidad Web - RENIEC

## 📘 Curso
**Ingeniería Web**

## 👥 Integrantes

| Integrante           | Participación |
|--------------------|--------------|
| Diego Nova         | 100%         |
| Renzo Murillo      | 100%         |
| Angelica Castillo  | 100%         |
| Marcelo Silva      | 100%         |

---

## 📌 Objetivo

Evaluar la accesibilidad del sitio web de RENIEC utilizando herramientas y pruebas manuales, considerando los principios de accesibilidad web: perceptible, operable, comprensible y robusto.

---

## 🌐 Sitio Evaluado

- URL: *https://identidad.reniec.gob.pe/*
- Fecha de evaluación: *16/04/2026*

---

## 🛠️ Herramientas Utilizadas

- TAW (Test de Accesibilidad Web)
- Contrast Checker
- Navegador web (modo sin JavaScript)
- Herramientas de desarrollo del navegador

---

## 🔍 Evaluación de Accesibilidad (TAW)

### 1. Perceptible

**Descripción:**
El principio perceptible establece que la información y los componentes de la interfaz deben presentarse de forma que los usuarios puedan percibirlos, ya sea mediante la vista, el oído u otros sentidos. Esto incluye el uso adecuado de textos alternativos, contraste de colores y estructura visual clara.

**Resultados:**

La auditoría realizada con la herramienta TAW muestra un análisis general del cumplimiento de las WCAG (Pautas de Accesibilidad para el Contenido Web), clasificando los hallazgos en problemas, advertencias y elementos no verificados.

En relación con el principio **Perceptible**, no se detectaron errores automáticos críticos. Sin embargo, se identificaron aspectos que requieren revisión manual:

- **Problemas automáticos:** 0  
- **Advertencias:** 1  
- **Criterios no verificados:** 4  

Esto indica que, aunque no existen fallos evidentes detectados automáticamente, hay varios aspectos importantes que deben evaluarse manualmente, como:
- Uso correcto de textos alternativos en imágenes
- Contraste de colores adecuado
- Adaptabilidad del contenido a diferentes dispositivos o condiciones visuales

**Evidencias:**
![Evidencia perceptible](/taw.png)

**Problemas detectados:**
- Posible ausencia o uso inadecuado de atributos `alt` en imágenes.
- Contenido visual que podría no ser completamente accesible para usuarios con discapacidad visual.
- Falta de validación manual en elementos perceptibles importantes como multimedia o iconografía.
- Posibles problemas de contraste que no fueron completamente verificados automáticamente.

**Propuesta de mejora:**
- Implementar textos alternativos (`alt`) descriptivos en todas las imágenes.
- Verificar y asegurar un adecuado contraste de colores (mínimo WCAG AA).
- Incluir subtítulos o transcripciones en contenido multimedia.
- Validar manualmente todos los elementos visuales críticos del sitio.
- Aplicar buenas prácticas de diseño accesible para garantizar que la información sea clara y distinguible para todos los usuarios.

---

### 2. Operable

**Descripción:**
La interfaz debe ser navegable y usable.

**Resultados:**
- 

**Evidencias:**
![Evidencia operable](ruta_imagen)

**Problemas detectados:**
- 

**Propuesta de mejora:**
- 

---

### 3. Comprensible

**Descripción:**
La información y el funcionamiento deben ser claros.

**Resultados:**
- 

**Evidencias:**
![Evidencia comprensible](ruta_imagen)

**Problemas detectados:**
- 

**Propuesta de mejora:**
- 

---

### 4. Robusto

**Descripción:**
Compatibilidad con distintos dispositivos y tecnologías.

**Resultados:**
- 

**Evidencias:**
![Evidencia robusto](ruta_imagen)

**Problemas detectados:**
- 

**Propuesta de mejora:**
- 

---

## 🎨 Prueba de Contraste de Color

**Herramienta:** Contrast Checker

**Resultados:**
- *(colocar resultados de contraste)*

**Evidencias:**
![Contraste](ruta_imagen)

**Problemas detectados:**
- 

**Propuesta de mejora:**
- 

---

## ⚙️ Prueba sin JavaScript

**Descripción:**
Evaluación de funcionalidad sin JS.

**Resultados:**
- 

**Evidencias:**
![Sin JS](ruta_imagen)

**Problemas detectados:**
- 

**Propuesta de mejora:**
- 

---

## ⌨️ Navegación con Teclado

**Aspectos evaluados:**
- Foco visible
- Orden de navegación
- Acceso a botones y formularios

**Resultados:**
- 

**Evidencias:**
![Teclado](ruta_imagen)

**Problemas detectados:**
- 

**Propuesta de mejora:**
- 

---

## 📱 Prueba en Dispositivos Móviles

**Descripción:**
Evaluación en pantallas pequeñas.

**Resultados:**
- 

**Evidencias:**
![Movil](ruta_imagen)

**Problemas detectados:**
- 

**Propuesta de mejora:**
- 

---

## 💻 Tecnologías del Sitio

### 🔐 Análisis del Servidor y Mecanismos de Seguridad (Inspección de Cabeceras)

Se realizó un análisis de la respuesta del servidor del portal de RENIEC mediante la herramienta de línea de comandos `curl`, con el objetivo de identificar mecanismos de seguridad y configuraciones de red implementadas.

---

### A. Identificación de la Respuesta del Servidor

Al ejecutar la consulta `curl -I -L`, el servidor devuelve el siguiente código de estado:

- **HTTP/1.1 555 SECURITY PAGE**

**Interpretación:**
Este código no pertenece al estándar HTTP (como 200 OK o 404 Not Found), lo que indica que se trata de una respuesta personalizada.

**Significado:**
- El sitio implementa un **WAF (Web Application Firewall)** o un sistema de seguridad perimetral.
- La solicitud fue detectada como potencialmente riesgosa al provenir de una herramienta automatizada (curl).
- El acceso es bloqueado como medida de protección frente a:
  - Bots
  - Scraping automatizado
  - Posibles ataques

---

### B. Análisis de Tecnologías de Red

A partir de las cabeceras HTTP obtenidas, se identificaron las siguientes configuraciones:

#### 🔹 Políticas de Caché

- `Cache-Control: no-cache, no-store, must-revalidate`
- `Pragma: no-cache`

**Interpretación:**
- El servidor impide almacenar contenido en caché.
- Obliga al navegador a solicitar la información directamente en cada acceso.

**Propósito:**
- Proteger datos sensibles del usuario.
- Evitar almacenamiento de información en equipos públicos o compartidos.

---

#### 🔹 Caducidad del Contenido

- `Expires: 0`

**Interpretación:**
- El contenido expira inmediatamente.
- Garantiza que siempre se obtenga información actualizada.

---

#### 🔹 Tipo de Contenido

- `Content-Type: text/html`

**Interpretación:**
- La respuesta corresponde a una página HTML.
- Probablemente se trata de una página de advertencia o bloqueo generada por el sistema de seguridad.

---

### 📸 Evidencia

![Evidencia curl](/curl.png)

---

### C. Conclusión Técnica

El portal de RENIEC implementa mecanismos avanzados de seguridad a nivel de servidor, incluyendo protección contra accesos automatizados mediante WAF y políticas estrictas de control de caché. Estas medidas son adecuadas para proteger la información sensible de los usuarios, especialmente en entornos gubernamentales.

---

---

## 🔎 Auditoría de código

Se realizó una inspección del código fuente del sitio web mediante el uso del validador del W3C, con el objetivo de identificar errores de sintaxis, malas prácticas y el nivel de cumplimiento de los estándares modernos de desarrollo web.

---

### A. Análisis de Errores y Advertencias Detectadas

Los resultados obtenidos evidencian tres tipos principales de inconsistencias técnicas en la estructura del código HTML:

#### 1. Atributo `type` innecesario en recursos JavaScript (Warning)

**Descripción:**
El estándar HTML5 define que el tipo por defecto de las etiquetas `<script>` es JavaScript, por lo que el uso de `type="text/javascript"` resulta redundante y obsoleto.

**Impacto:**
- No afecta directamente la funcionalidad del sitio.
- Genera código innecesario.
- Aumenta ligeramente el tamaño del DOM.

**Ubicación:**
- Líneas: 150, 205, 567 y 590.

---

#### 2. Uso de barra inclinada final en elementos vacíos / "Trailing slash" (Info)

**Descripción:**
Se detectó el uso de etiquetas autoconclusivas con barra final (por ejemplo: `<link ... />`). En HTML5, esta sintaxis no es necesaria para elementos vacíos (void elements).

**Impacto:**
- No genera errores funcionales.
- Representa una inconsistencia en el estilo del código.
- Puede indicar uso de estándares antiguos como XHTML.

**Ubicación:**
- Líneas: 151, 152, 153, 170, 171, 191, 193, 195, 705 y 857.

---

#### 3. Atributo `type` innecesario en elementos de estilo (Warning)

**Descripción:**
En HTML5, los navegadores asumen automáticamente que las etiquetas `<style>` y `<link rel="stylesheet">` contienen CSS, por lo que el atributo `type="text/css"` es redundante.

**Impacto:**
- Introduce redundancia en el código.
- Afecta la limpieza y mantenibilidad del marcado.

**Ubicación:**
- Líneas: 714 y 858.

---

### B. Cuadro de Resumen Técnico
wa
| Tipo de Aviso | Elemento Afectado | Descripción del Problema                          | Gravedad     |
|--------------|------------------|--------------------------------------------------|-------------|
| Warning      | `<script>`       | Uso de atributo `type` redundante en JavaScript | Baja        |
| Warning      | `<style>`        | Uso de atributo `type` redundante en CSS        | Baja        |
| Info         | `<link>`         | Uso innecesario de barra final (`/>`)           | Informativa |

---

### C. Propuesta de Corrección (Optimización de Tecnologías)

Con el fin de mejorar la calidad del código y alinearlo con los estándares actuales del W3C, se plantean las siguientes recomendaciones:

- **Simplificación de etiquetas:**
  Eliminar los atributos innecesarios:
  - `type="text/javascript"`
  - `type="text/css"`

- **Limpieza del marcado:**
  Eliminar las barras inclinadas finales (`/>`) en elementos vacíos como:
  - `<link>`
  - `<meta>`
  - `<img>`

- **Estandarización del código:**
  Adoptar buenas prácticas de HTML5 para mejorar la legibilidad, mantenibilidad y compatibilidad del sitio.


**Evidencias:**
![Evidencia robusto](/2_1.png)

![Evidencia robusto](/html3.png)

---

### 🧪 Ejemplo de Corrección

**Código incorrecto:**
```html
<script type="text/javascript" src="js/main.js" />

---

## 🧠 Análisis General

**Resumen de problemas:**
- 

**Impacto en usuarios:**
- 

---

## 🛠️ Propuestas de Mejora

- 
- 
- 

---

## 📎 Anexos

*(Aquí puedes colocar todas las imágenes adicionales y evidencias)*

### Anexo 1
![Anexo 1](ruta_imagen)

### Anexo 2
![Anexo 2](ruta_imagen)

---

## 📂 Repositorio GitHub

- Enlace: *(colocar link del repositorio)*

---

## 📄 Entregable

- Archivo Markdown ✔️  
- Exportación a PDF ✔️  
- Repositorio GitHub ✔️  

---
