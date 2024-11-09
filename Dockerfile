# Definimos una imagen base de node y su versión para nuestro contenedor
FROM node:16

# Definimos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el archivo package.json y package-lock.json a la carpeta de trabajo
COPY package.json . 

# Instalamos las dependencias del proyecto usando `npm ci` para evitar conflictos de dependencias
RUN npm i

# Copiamos el resto de los archivos a la carpeta de trabajo
COPY . .

# Exponemos el puerto de trabajo, en este caso el 8080
EXPOSE 8080

# Definimos el comando para correr nuestra aplicación
CMD ["npm", "run", "dev"]