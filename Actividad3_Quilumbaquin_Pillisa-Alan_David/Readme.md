# Autor:
Quilumbaquin Pillisa Alan David

# Funcionamiento:

* BACK-END

Para instalar este proyecto en su computadora inicie instalando el BACK-END

- Realice todas las operaciones SQL que encontrara en el archivo mybd.sql

- La base de datos se instalo en un servidor mysql(Puede usar XAMPP)

- Tendra un registro de datos test para verificar el funcionamiento

- Inicie la API con npm (desarrollada en EXPRESS)

- Verifique o configure la conexion a la BD en index.js si tiene usuario y contraseña o un puerto diferente al 3306

* FRONT-END

- Con la API ejecutandose puede probar todo el front-end

- Tenga en cuenta que si ha modificado el puerto de escucha del servidor express, debe configurar en los endpoints (src de los customs elements) el puerto correspondiente.

- Verifique el funcionamiento


# END-POINTS:

* Participante-->

- Tiene GET general:
http://localhost:5000/participante

- Tiene GET por id:
http://localhost:5000/participante/id

- Tiene POST:
http://localhost:5000/participante

- TIENE DELETE:
http://localhost:5000/participante/id

- TIENE PUT:
http://localhost:5000/participante/id

* Proyectos-->

- Tiene GET general:
http://localhost:5000/proyectos

- Tiene GET por id:
http://localhost:5000/proyectos/id

- Tiene POST:
http://localhost:5000/proyectos

- TIENE DELETE:
http://localhost:5000/proyectos/id

- TIENE PUT:
http://localhost:5000/proyectos/id

* Asociaciones-->

- Tiene GET general:
http://localhost:5000/asociaciones

- Tiene POST:
http://localhost:5000/asociaciones

- TIENE DELETE:
http://localhost:5000/asociaciones/id

# Caracteristicas:

- El proyecto utiliza tres tablas de tipo relacional con claves foráneas y primarias

- Se controlan los casos de eliminación de elementos precautelando la integridad de la información 

# Licencia

* Usted es libre de:

-- Compartir : copiar y redistribuir el material en cualquier medio o formato. para cualquier propósito, incluso comercial.

-- Adaptar : remezclar, transformar y construir a partir del material para cualquier propósito, incluso comercial.
El licenciante no puede revocar estas libertades siempre y cuando usted cumpla con los términos de la licencia.

En los siguientes términos:

Atribución — Debe dar el crédito adecuado , proporcionar un enlace a la licencia e indicar si se realizaron cambios . Puede hacerlo de cualquier manera razonable, pero no de ninguna manera que sugiera que el licenciante lo respalda a usted o a su uso.

CompartirIgual: si remezclas, transformas o construyes a partir del material, debes distribuir tus contribuciones bajo la misma licencia que el original.

Sin restricciones adicionales : no puede aplicar términos legales o medidas tecnológicas que restrinjan legalmente que otros hagan cualquier cosa que permita la licencia.

* Avisos:
No tiene que cumplir con la licencia para los elementos del material que son de dominio público o donde su uso está permitido por una excepción o limitación aplicable.

No se ofrecen garantías. Es posible que la licencia no le otorgue todos los permisos necesarios para el uso previsto. Por ejemplo, otros derechos, como la publicidad, la privacidad o los derechos morales, pueden limitar la forma en que utiliza el material.

https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1

APP Básica con Express © 2025 por está bajo CC BY-SA 4.0 