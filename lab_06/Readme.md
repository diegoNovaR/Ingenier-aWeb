# Nombre del Proyecto: [Inserta aquí el título]

Breve descripción de qué hace la aplicación y cuál es su objetivo principal.

---

## 👥 Integrantes
* **Diego Nova Rosas** 
* **Renzo Murillo Alvarez** 
* **Angelica Castillo Tovar** 

---

## 1. Creación del Proyecto en Visual Studio (MVC)

Pasos seguidos para inicializar el entorno:

1.  Abrir **Visual Studio 2022**.
2.  Seleccionar **Crear un nuevo proyecto**.
3.  Elegir la plantilla **ASP.NET Core Web App (Model-View-Controller)**.
4.  Configurar el nombre del proyecto y la ubicación.
5.  **Configuración adicional:** Seleccionar .NET 8.0 (o la versión que uses) y marcar la casilla de **Habilitar Docker** (opcional desde el inicio).
6.  Luego instalar los paquetes correspondientes.

[Imagen de la configuración del proyecto en Visual Studio]
![imagen 1](./imagenesReadme/Captura%20de%20pantalla%202026-05-06%20215933.png)

![Imagen 2](./imagenesReadme/Captura%20de%20pantalla%202026-05-06%20220723.png)

![Imagen 3](./imagenesReadme/docker1.png)

![Imagen 4](./imagenesReadme/docker2.png)

![Imagen 5](./imagenesReadme/paquetes.png)


### Resultado del proyecto creado
![Imagen 6](./imagenesReadme/creacionProyectoFinal.png)

---


---
## 2. Dockerización de la Aplicación

Para empaquetar la aplicación, se creó un archivo `Dockerfile` en la raíz del proyecto.
Con la configuración anterior todo sucede de manera automática, ahora vamos a mostrarles como se debería de desarrollar con comandos en docker sin interfaz.

### Contenido del Dockerfile

#### Creando la imagen:
```dockerfile
# Imagen base
```
![Imagen 7](./imagenesReadme/ImagenNET.png)

#### Creando el contenedor y corriendo el mismo:

![Imagen 8 ](./imagenesReadme/Contenedor.png)

#### Los resultados que tenemos serían:

![Imagen 9 ](./imagenesReadme/docker1.png)

![Imagen 10 ](./imagenesReadme/docker2.png)

#### Ahora dockerizamos la base de datos:

![Imagen 11 ](./imagenesReadme/sql1.png)

![Imagen 12 ](./imagenesReadme/sql2.png)

---
## 3. Realizando el Scaffold dentro de .NET

Una vez terminado los pasos anteriores y se crearon las tablas en el contenedor de SQL. Debemos ejecutar lo siguiente en la intergaz de visual studio.

![Imagen 11 ](./imagenesReadme/saffold.png)

Se crean modelos en base a la base de datos que se configuro y creo anteriormente.

![Imagen 12 ](./imagenesReadme/modelos.png)


---