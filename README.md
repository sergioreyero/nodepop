# **Nodepop**
**API** correspondiente a la práctica de NodeJS del MobileBootcamp KeepCoding.

### Práctica DevOps

* Web estatica en:
https://www.sergioreyero.com
(18.219.99.35)

* Servir estáticos con cabecera personalizada "X-Owner:SergioRB"
https://nodepop.sergioreyero.com/images/anuncios/iphone.jpg

* API en:
https://nodepop.sergioreyero.com/

Version 1:
https://nodepop.sergioreyero.com/apiv1

Despliegue sobre EC2 de AWS (t2.micro)
-AMI: ubuntu-xenial-16.04-amd64-server-20180109 (ami-2581aa40)


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
