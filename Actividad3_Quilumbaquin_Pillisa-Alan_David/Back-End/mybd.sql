CREATE DATABASE pic;

CREATE TABLE proyectos(
id int AUTO_INCREMENT PRIMARY KEY,
nombre varchar(100) not null,
tipo varchar(100) not null
);

CREATE TABLE participante(
id int AUTO_INCREMENT PRIMARY KEY,
nombre varchar(50) not null,
rol varchar(50) not null,
edad int not null
);

CREATE TABLE asociacion(
id int AUTO_INCREMENT PRIMARY KEY,
idpt int not null,
idpro int not null,
FOREIGN KEY (idpt) REFERENCES participante (id) on DELETE CASCADE,
FOREIGN KEY (idpro) REFERENCES proyectos (id) on DELETE CASCADE
);

/*Dato de test*/

INSERT INTO participante(nombre,rol,edad) VALUES ('Alan','Admin',21);
INSERT INTO proyectos(nombre,tipo) VALUES ('PIC','Actividad');
INSERT INTO asociacion (idpt,idpro) VALUES (1,1);

SELECT PT.nombre AS 'PARTICIPANTE', PT.edad, PR.nombre AS 'NOMBRE PROYECTO', PR.tipo FROM asociacion as SO
INNER JOIN participante as PT on SO.idpt = PT.id
INNER JOIN proyectos as PR on SO.idpro = PR.id;