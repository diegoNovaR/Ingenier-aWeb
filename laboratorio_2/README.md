# 🚀 Laboratorio 02: Infraestructura con Docker y Apache

Este proyecto despliega un servidor web Apache sobre **Ubuntu 24.04** configurando **Virtual Hosts** y **Alias** para una gestión eficiente de múltiples sitios locales.

---

## 🛠️ Instrucciones de Despliegue

Ejecute los siguientes comandos en su terminal para levantar la infraestructura:

### 1. Construir la imagen
```bash
docker build . -t image_msilvac
```

### 2. Ejecutar el contenedor
```bash
docker run -d --name container_msilvac -p 8105:80 image_msilvac
```

---

## 🌐 Configuración de Red Local (Archivo Hosts)

> [!IMPORTANT]
> **¡Atención!** Para que los dominios `.local` funcionen, es obligatorio realizar estos pasos con permisos de **Administrador**. De lo contrario, Windows no le permitirá guardar los cambios.

📍 **Ruta del archivo:** `C:\Windows\System32\drivers\etc\hosts`

---

### Paso 1: Abrir el Bloc de Notas como Administrador

1. Presione la tecla **Windows** en su teclado.
2. Escriba **"Bloc de notas"**.
3. Haga clic derecho sobre el icono y elija **"Ejecutar como administrador"** *(acepte la ventana de confirmación)*.

---

### Paso 2: Buscar el archivo hosts

1. Dentro del Bloc de notas, vaya a **Archivo > Abrir**.
2. En la barra de direcciones superior, pegue esta ruta y presione Enter:
```
   C:\Windows\System32\drivers\etc
```
3. En la esquina inferior derecha *(encima del botón Abrir)*, cambie **"Documentos de texto (.txt)"** por **"Todos los archivos (.\*)"**.
4. Seleccione el archivo llamado **`hosts`** y haga clic en **Abrir**.

---

### Paso 3: Agregar los dominios

1. Diríjase al **final del archivo** y, sin borrar nada, pegue las siguientes líneas:
```
127.0.0.1 alumnos.local
127.0.0.1 docentes.local
127.0.0.1 administrativo.local
```

2. Guarde los cambios con **Ctrl + S** o mediante **Archivo > Guardar**.

---

## 🔗 Enlaces de Acceso

Una vez configurado el archivo `hosts`, acceda a las siguientes rutas desde su navegador:

| Sección | URL |
|---|---|
| 📖 Alumnos | http://alumnos.local:8105/alumnos |
| 👨‍🏫 Docentes | http://docentes.local:8105/docentes |
| 💼 Administrativo | http://administrativo.local:8105/admin |

---

## 🧹 Comandos de Limpieza

Para detener y eliminar los recursos creados, ejecute:
```bash
# Detener el contenedor
docker stop container_msilvac

# Eliminar el contenedor
docker rm container_msilvac

# Eliminar la imagen
docker rmi image_msilvac
```

---
