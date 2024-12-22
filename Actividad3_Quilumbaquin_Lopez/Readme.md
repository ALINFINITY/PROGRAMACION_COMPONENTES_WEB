Autores:
Quilumbaquin Pillisa Alan David
Lopez Mora Luis Andres

Funcionamiento:

BACK-END
Para instalar este proyecto en su computadora inicie instalando el BACK-END
-Realice todas las operaciones SQL que encontrara en el archivo mybd.sql
-La base de datos se instalo en un servidor mysql(Puede usar XAMPP)
-Tendra un registro de datos test para verificar el funcionamiento
-Inicie la API con npm (desarrollada en EXPRESS)
-Verifique o configure la conexion a la BD en index.js si tiene usuario y contraseña o un puerto diferente al 3306

FRONT-END
-Con la API ejecutandose puede probar todo el front-end
-Tenga en cuenta que si ha modificado el puerto de escucha del servidor express, debe configurar en los endpoints (src de los customs elements) el puerto correspondiente.
-Verifique el funcionamiento


END-POINTS

Participante-->
Tiene GET general:
http://localhost:5000/participante
Tiene GET por id:
http://localhost:5000/participante/id
Tiene POST:
http://localhost:5000/participante
TIENE DELETE:
http://localhost:5000/participante/id
TIENE PUT:
http://localhost:5000/participante/id

Proyectos-->
Tiene GET general:
http://localhost:5000/proyectos
Tiene GET por id:
http://localhost:5000/proyectos/id
Tiene POST:
http://localhost:5000/proyectos
TIENE DELETE:
http://localhost:5000/proyectos/id
TIENE PUT:
http://localhost:5000/proyectos/id

Asociaciones-->
Tiene GET general:
http://localhost:5000/asociaciones
Tiene POST:
http://localhost:5000/asociaciones
TIENE DELETE:
http://localhost:5000/asociaciones/id

Caracteristicas:

-El proyecto utiliza tres tablas de tipo relacional con claves foráneas y primarias
-Se controlan los casos de eliminación de elementos precautelando la integridad de la información 


