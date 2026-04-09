# 1. Imagen base (Ubuntu 24.04)
FROM ubuntu:24.04

# 2. Instalación de Apache sin prompts interactivos
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y apache2

# 3. Creación de directorios para los Virtual Hosts
RUN mkdir -p /var/www/docentes /var/www/alumnos /var/www/administrativo

# 4. Copia de archivos locales al contenedor

COPY ./docentes/ /var/www/docentes/
COPY ./alumnos/ /var/www/alumnos/
COPY ./administrativo/ /var/www/administrativo/

# 5. Copia de la configuración de Apache personalizada
COPY mis-sitios.conf /etc/apache2/sites-available/000-default.conf

# 6. Exponer el puerto y arrancar el servicio en primer plano
EXPOSE 8080
CMD ["apachectl", "-D", "FOREGROUND"]

# Configurar Apache para escuchar en el puerto 8080
Listen 8080

<VirtualHost *:8080>
    ServerName localhost

    # Forzar a que busque el index.html automáticamente
    DirectoryIndex index.html

    # Alias para Docentes
    Alias /docentes "/var/www/docentes/"
    <Directory "/var/www/docentes/">
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
    </Directory>

    # Alias para Alumnos
    Alias /alumnos "/var/www/alumnos/"
    <Directory "/var/www/alumnos/">
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
    </Directory>

    # Alias para Administrativo
    Alias /admin "/var/www/administrativo/"
    <Directory "/var/www/administrativo/">
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
    </Directory>
</VirtualHost>

# Guía de Comandos para el Servidor Apache


### Comandos Paso a Paso

1. **Construir la imagen:**
   ```bash
   docker build -t servidor-tarea .
   docker run -d -p 9090:8080 --name mi-servidor-(ejemplo) servidor-tarea

   docker stop mi-servidor-(ejemplo)