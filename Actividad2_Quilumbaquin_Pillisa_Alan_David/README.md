<--Autor: Quilumbaquin Pillisa Alan David-->

<--Aspectos generales-->
-Cada componente cuenta con su propio estilo definido en el shadowroot.
-Se utilizan propiedades de HTML para enviar argumentos puntuales a los componentes.
-Se utilizan recursos locales del proyecto y algunos recursos externos para mantener la consistencia de los componentes en todo momento.

<--Características adicionales-->
-Se crearon páginas adicionales "Pages_ADD" para generar un entorno de paginas web que se relacionen entre si, ademas de que son de utilidad para comprobar el funcionamiento de enlaces y el menu de navegación.

<--Funcionamiento del Header-->
Descripción-->
Este componente esta elaborado con un titulo, una etiqueta y una imagen. El titulo ingresa como parámetro al componente, en la etiqueta se coloca el nombre del autor que también ingresa como parámetro al componente y para la imagen el src de la misma ingresa como parámetro al componente.
Propiedades del componente-->
title: Un titulo para la página.
author: El nombre del autor de la página.
iconsrc: El src de la imagen que se encuentra a la derecha del header.

<--Funcionamiento del Footer-->
Descripción-->
El footer cuenta con 3 divs principales en donde se clasificaron elementos de la siguiente manera:

Div1: Se muestra el idioma que ingresa como parámetro, la privacidad y términos de uso obtiene sus href desde las propiedades del componente y finalmente el copyright se muestra con el nombre de la compañía que ingresa como parámetro.

Div2: Se colocaron las redes sociales de pokemon en elementos "a" y con imágenes representativas para que el usuario al presionarlas, sea redireccionado hacia la red social que presiono, el src de las imágenes y los enlaces a las redes sociales ingresan al componente como parámetros.

Div3: Se coloco el contacto de la compañía, en este caso el contacto varia en función del idioma de la página, esta sección muestra el nombre de la compañía la cual ingresa como parámetro al componente.
Propiedades del componente-->
company: Nombre de la Compañía propietaria de la página web.
srcimgfk: El src del logo de Facebook.
srcimgig: El src del logo de Instagram. 
srcimgx: El src del logo de X (Antes twitter).
languaje: El lenguaje de la pagina (String).
fklink: Enlace hacia el Facebook de la compañía.
iglink: Enlace hacia el Instagram de la compañía.
xlink: Enlace hacia el X de la compañía.
termlink: Enlace hacia la página de términos de uso.
privlink: Enlace hacia la página de política de privacidad. 

<--Funcionamiento del Main-->
Descripción-->
Este componente se encarga de generar slots dinámicos para que los elementos HTML que se definan dentro de este componente se integren de forma satisfactoria en el DOM.
Propiedades del componente-->
N/A

<--Funcionamiento del Menu-->
Descripción-->
Este componente internamente crea un menu de forma dinámica en función de los parámetros que reciba desde sus propiedades, se utilizan elementos "ul", "li" y "a".
Propiedades del componente-->
numitems: Recibe el número de items que se ubicaran en el menú.
nameitem<n>: En función del numero de items, esta etiqueta asigna el texto que tendrá el item "n".
srcitem<n>: En función del numero de items, esta etiqueta asigna el enlace "href" de direccionamiento que tendrá el item "n".

<--Funcionamiento del Social Profile-->
Descripción-->
Este componente renderiza mis datos almacenados en un objeto en el documento HTML con la utilización de elementos "div", "label" y "br" para que la tarjeta de presentación tenga una estructura bien definida.
Propiedades del componente-->
N/A

<--Funcionamiento de Custom Table-->
Descripción-->
Este componente carga los datos extraídos a través de una API en la tabla de datos. Con la API se extrajo nombre, usuario, email, código postal, teléfono, website y nombre de la compañía, estos nombres de encabezado se almacenaron en un array para posteriormente ser ubicados en la tabla a través de un foreach. Se utilizo una función asíncrona para extraer los datos a través de la API; el enlace de la API ingresa como parámetro al componente. La estructura de la tabla se extrajo de un template para optimizar la creación de elementos HTML. Una vez extraída la data, con un foreach se fue ubicando cada dato en la tabla.
Propiedades del componente-->
srcAPI: Recibe la URL de la API.

<--Funcionamiento de Gallery-->
Descripción-->
Este componente utiliza un template el cual es la plantilla base para cada tarjeta Pokemon, en cada tarjeta se presenta el nombre del Pokemon, su imagen, su experiencia base y el tipo de Pokemon que es. En este componente se realiza un doble fetch, el primer fetch extrae un conjunto de endpoints de n Pokemones solicitados a través de la URL en la propiedad "limit", a continuación el segundo fetch extrae la data individual de cada Pokemon como "nombre", "experiencia", "tipo" e imagen. Cada tarjeta es renderizada y agregada al contenedor padre por la función mygallery.

URL utilizada: https://pokeapi.co/api/v2/pokemon?limit=40&offset=0
Para esta URL se está solicitando a través de la API 40 Pokemons, este numero puede variar pero la estructura se debe mantener.

Esta URL la proporciona PokéAPI como una de sus opciones para extraer conjuntos de datos.

Propiedades del componente-->
srcAPI: Recibe la URL de la PokéAPI.

