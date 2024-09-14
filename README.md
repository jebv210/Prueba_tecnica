COMO CONFIGURAR Y EJECUTAR LA APLICACION
(requisitos tener node.js, postgresql y git)

1) CONFIGURAR

    Copia el link del repositorio github, luego en la terminal junto con 
    
    git clone https://github.com/jebv210/Prueba_tecnica.git con el repositorio lo pegan,

    luego acceden a la carpeta en donde la dejaron (La carpeta principal se llamara "PRUEBA_TECNICA"), 
    dentro de esa carpeta van a estar otras dos, una llamada "Backend" y otra llamada "frontend_pt".

    1 EN EL LADO DEL BACKEND: Accediendo a la carpeta "Backend", ingresando a la terminal, se ejecutara 
                            el siguiente comando, npm install (este comando ejecutara o traera todos los paquetes que se usaron en el package.json ) 
                            (cd PRUEBA_TECNICA/Backend, npm install)

    2 EN EL LADO DEL FRONTEND: Accediendo a la carpeta "frontend_pt", ingresando a la terminal, se ejecutara 
                            el siguiente comando, npm install (este comando ejecutara o traera todos los paquetes que se usaron en el package.json ) 
                            (cd PRUEBA_TECNICA/frontend_pt, npm install)

    3 EN EL LADO DE LA BASE DE DATOS: Accediendo a la carpeta "Backend", ingresando a la terminal, se ejecutara 
                            el siguiente comando, npx prisma generate (este comando ejecutara o actualizara las migraciones que se tengan de prisma trallendo la mas reciente) 
                            (cd PRUEBA_TECNICA/Backend, npx prisma generate)

2) EJECUTAR 

    1)Accediendo a la carpeta "frontend_pt", ingresando a la terminal, se ejecutara 
    el siguiente comando, npm install (este comando ejecutara o traera todos los paquetes que se usaron en el package.json )
    (cd PRUEBA_TECNICA/frontend_pt, npm install)

    2)en "Backend" por la terminal ejecuta, npm install (este comando ejecutara o traera todos los paquetes que se usaron en el package.json) y npx prisma generate (este comando ejecutara o actualizara las migraciones que se tengan de prisma trallendo la mas reciente)
    (cd PRUEBA_TECNICA/Backend, npx prisma generate)

    3)en "Backend" por la terminal ejecuta, npm run seederes (este comando ejecutaraunas operaciones para que te queden registradas en bases de datos), sirve para que e traiga 10 registros en las tablas de la PRUEBA
    (cd PRUEBA_TECNICA/Backend, npm run seederes)

    4) en la carpeta "PRUEBA_TECNICA",por la terminar (un ejemplo "Desktop\Trabajo\Prueba_tecnica>"), se ejecuta el siguiente comando npm install y luego npm start, para que ejecute las dos carpetas (frontend_pt,Backend) 
    (Trabajo\Prueba_tecnica, npm install y npm start)

NAME      EMAIL                      PASSWORD
User 1	user@gmail1.com	$2b$10$S5UU1wGSOUa4/kfF2QLIYOfgXOxUw1AZUXM1LlGrSYz66iLIG2o/.
User 2	user@gmail2.com	$2b$10$DheC15aXIz0D.BktFRCK5eXI9m/r5yw/8r5O6krGHjNPFHC9QEE1a
User 3	user@gmail3.com	$2b$10$luWq2661JgGnigVcDUmnq.urTru17WptxmRWYA7dGmLmA8NWAYrpm
User 4	user@gmail4.com	$2b$10$jcNhHdoWB2seqDbY8J8cTux4wh/KalN4agzOumN.rwugYUhNRdSpe
User 5	user@gmail5.com	$2b$10$GZ6d2.ZGlqFcoxkYtGxXFODaNjOgbx3T/Xy9nG8xfRVw5VALYWnTG
User 6	user@gmail6.com	$2b$10$epZggYxpJ7QVfktbdhO3TOOjT79bzDjmCffXjQ/xv8uZuoLprKnn.
User 7	user@gmail7.com	$2b$10$BEiri8W10uGvfBISGxMERuBqdvf4Hk1ApdZpAotiyTuoD9uJo/q.m
User 8	user@gmail8.com	$2b$10$OZpg/3y1ciYUW3NFW01XIuUKzdkhUKdoayzCDfZsnpYhWtzbJ98FO
User 9	user@gmail9.com	$2b$10$KEpN1q9162hkK/62U/rOsuhfoHBo8opCmHBZj9T7z3o7vLKlVSs82
User 10	user@gmail10.com$2b$10$NzCltZYwXYfvKmvlSXdDU.UL7JA2XNMcGjasPDCZsTOdyQ6r8mJL2

TODOS SON ADMIN

   EMAIL            PASSWORD 
user@gmail1.com usuario1conclave1
user@gmail2.com usuario2conclave2
user@gmail3.com usuario3conclave3
user@gmail4.com usuario4conclave4
user@gmail5.com usuario5conclave5
