FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

# Instalación de Apache y limpieza de caché
RUN apt-get update && \
    apt-get install -y apache2 && \
    rm -rf /var/lib/apt/lists/*

# Crear la estructura de carpetas primero
RUN mkdir -p /webapps/iw/lab02/alumnos \
             /webapps/iw/lab02/docentes \
             /webapps/iw/lab02/admin

# Copiar configuraciones de Virtual Hosts
COPY docentes.conf /etc/apache2/sites-available/docentes.conf
COPY alumnos.conf /etc/apache2/sites-available/alumnos.conf
COPY admin.conf /etc/apache2/sites-available/admin.conf

# Copiar el contenido de tu Practica1 a la carpeta de alumnos
# Asegúrate de que la carpeta Practica1 esté en el mismo nivel que el Dockerfile
COPY Practica1/ /webapps/iw/lab02/alumnos/

# Generar los index de bienvenida y activar sitios
RUN echo '<h1>Bienvenido a la sección Docente</h1>' > /webapps/iw/lab02/docentes/index.html && \
    echo '<h1>Bienvenido a la sección Administrativo</h1>' > /webapps/iw/lab02/admin/index.html && \
    a2dissite 000-default.conf && \
    a2ensite docentes.conf alumnos.conf admin.conf && \
    # Esto asegura que el servidor muestre que está corriendo en consola
    echo "ServerName localhost" >> /etc/apache2/apache2.conf

EXPOSE 80

# Usamos apache2ctl para cumplir con el estándar de Ubuntu
CMD ["apache2ctl", "-D", "FOREGROUND"]