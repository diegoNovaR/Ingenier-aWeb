# Imagen oficial de Node (ligera y estable)
FROM node:20

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias primero (optimiza cache)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto de tu app
EXPOSE 3000

# Comando para ejecutar la app
CMD ["node", "index.js"]