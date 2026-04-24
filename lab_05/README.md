# 🏟️ Canchas Proyect — Sistema de Gestión y Reserva de Canchas

<div align="center">

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-4.2+-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3.0+-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/)
[![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/)

</div>

---

## 📋 Descripción del Proyecto

**Canchas Proyect** es un sistema web desarrollado con el framework Django para la automatización y gestión integral de complejos deportivos. Permite administrar distintos tipos de superficies (grass sintético, losa), registrar canchas con sus características y precios, y gestionar reservas de clientes de manera eficiente.

> 💡 **Punto diferenciador:** El proyecto implementa una **Arquitectura Modular MVT** que supera la estructura básica de Django, separando responsabilidades en directorios independientes para facilitar la escalabilidad y el mantenimiento del sistema.

---

## 🧠 Arquitectura de Software

El proyecto sigue el patrón **MVT (Model-View-Template)** en su versión modularizada, organizando cada capa en su propio subdirectorio dentro de `canchas_app`:

```
canchas_proyect/
│
├── canchas_app/                    # Módulo principal de la aplicación
│   ├── forms/                      # Capa de formularios y validación
│   │   └── __init__.py             # Exporta formularios del módulo
│   │
│   ├── models/                     # Capa de persistencia de datos
│   │   ├── __init__.py             # Exporta modelos al ORM de Django
│   │   └── cancha.py               # Clases: TipoCancha, Cancha, Reserva
│   │
│   ├── views/                      # Capa de lógica de negocio
│   │   └── __init__.py             # Exporta vistas y controladores
│   │
│   ├── admin.py                    # Configuración del panel administrativo
│   ├── apps.py                     # Configuración de la aplicación
│   └── migrations/                 # Historial de migraciones de la BD
│
├── canchas_proyect/                # Configuración global del proyecto
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── db.sqlite3                      # Base de datos con datos precargados
├── manage.py                       # CLI de Django
└── requirements.txt                # Dependencias del proyecto
```

### 📐 Diagrama de Modelos (Entidades)

| Modelo | Campos Clave | Relación |
|---|---|---|
| `TipoCancha` | nombre, descripcion | — |
| `Cancha` | nombre, precio_hora, disponible | `ForeignKey → TipoCancha` |
| `Reserva` | cliente, fecha, hora_inicio, hora_fin | `ForeignKey → Cancha` |

---

## 🚀 Instalación y Despliegue Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/usuario/canchas_proyect.git
cd canchas_proyect
```

### 2. Activar el entorno virtual

```bash
# En Windows
.\my_env\Scripts\activate

# En macOS / Linux
source my_env/bin/activate
```

### 3. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 4. Aplicar migraciones

```bash
python manage.py migrate
```

### 5. Iniciar el servidor de desarrollo

```bash
python manage.py runserver
```

✅ La aplicación estará disponible en: **http://127.0.0.1:8000**

---

## ⚙️ Panel de Administración (Django Admin)

El sistema utiliza el motor de administración de Django, configurado y personalizado en `admin.py` para ofrecer una experiencia de gestión completa.

| Parámetro | Valor |
|---|---|
| URL de acceso | `http://127.0.0.1:8000/admin` |
| Usuario | `admin` |
| Contraseña | `admin123` |

### 📦 Datos Precargados en `db.sqlite3`

La base de datos incluida contiene información de prueba lista para evaluar el sistema:

- **Tipos de Cancha:** Grass Sintético, Losa, Fútbol 7
- **Canchas registradas:** Con precios por hora y estado de disponibilidad
- **Reservas de prueba:** Vinculadas a clientes con horarios definidos

---

## 🛠️ Tecnologías Utilizadas

| Capa | Tecnología | Descripción |
|---|---|---|
| Lenguaje | Python 3.10+ | Lenguaje principal del backend |
| Framework Web | Django 4.2+ | Estructura MVT y ORM |
| Base de Datos | SQLite3 | Persistencia local de datos |
| Frontend | HTML5 + CSS3 | Plantillas del panel administrativo |
| Scripts | JavaScript | Interactividad en el cliente |
| Control de Versiones | Git | Gestión del código fuente |
| Editor | VS Code | Entorno de desarrollo |

---

## 🔑 Conceptos de Ingeniería Aplicados

- **Separación de responsabilidades (SoC):** Modelos, vistas y formularios en módulos independientes.
- **ORM de Django:** Abstracción de la base de datos mediante clases Python sin escribir SQL directamente.
- **Patrón MVT:** Adaptación del patrón MVC a la arquitectura de Django.
- **Migraciones:** Control de versiones del esquema de base de datos con `makemigrations` y `migrate`.
- **Admin Personalizado:** Registro de modelos con configuraciones avanzadas de visualización y filtrado.

---

## 👥 Integrantes del Equipo

| # | Nombre |
|---|---|
| 1 | Marcelo Silva Cabrera |
| 2 | Renzo Murillo Alvarez |
| 3 | Diego Nova Rosas |
| 4 | Angélica Castillo Tovar |

---

## 📚 Información del Curso

| Campo | Detalle |
|---|---|
| **Curso** | Ingeniería Web |
| **Docente** | Richart Escobedo Quispe |
| **Institución** | Universidad La Salle — Arequipa |

---

<div align="center">
  Desarrollado con ❤️ por el equipo · Universidad La Salle Arequipa
</div>