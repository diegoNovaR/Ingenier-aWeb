# Construir la imagen
docker build . -t image_msilvac

# Ejecutar el contenedor
docker run -d --name container_msilvac -p 8105:80 image_msilvac

# Acceder a la siguiente ruta C:\Windows\System32\drivers\etc\hosts buscar la carpeta host, abrir el txt con administrador y poner lo siguiente en la parte de abajo:
127.0.0.1 alumnos.local
127.0.0.1 docentes.local
127.0.0.1 administrativo.local

# Enlaces de acceso (Prueba de Alias/Virtual Hosts)
http://alumnos.local:8105/alumnos
http://docentes.local:8105/docentes
http://administrativo.local:8105/admin

# Comandos de limpieza
docker stop container_msilvac
docker rm container_msilvac
docker rmi image_msilvac