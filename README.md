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
