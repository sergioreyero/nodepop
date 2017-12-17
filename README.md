# **Nodepop**
**API** correspondiente a la practica de NodeJS del MobileBootcamp KeepCoding.

### Despliegue

1. Iniciar MongoDB: 
./bin/mongod --dbpath <directory_to_store_data> --directoryperdb

2. Instalar paquetes npm:
npm install

3. Inicializar mockup DB:
npm run startDB

4. Arrancar el servidor:
npm run start

Opcional - Modo cluster: npm run cluster

### Metodos GET:
#### Listar anuncios con filtros
**/apiv1/anuncios**?tag=mobile&venta=false&sort=precio&precio=50-300&token=X

#### Listar tags disponibles
/apiv1/anuncios/tags

### Metodos POST:
#### Registrarse como usuario
/apiv1/usuarios/register

* nombre
* email
* clave


#### Obtener el token para peticiones
/apiv1/usuarios/authenticate

* email
* clave
