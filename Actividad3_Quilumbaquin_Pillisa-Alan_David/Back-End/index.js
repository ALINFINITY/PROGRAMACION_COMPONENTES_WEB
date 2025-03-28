import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
//Puesto escucha
app.listen(port,()=>{
    console.log(`Server escuchando en el puerto ${port}`)
});

//Conexión a la BD
//Cambio de credenciales Aqui - Entorno de desarrollo Back-End
const bd = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'admin',
        port: 3306,
        database: 'pic'
    }
);

bd.connect(error => {
    if (!error) {
        console.log('Conexión exitosa a la BD');
    } else {
        console.log('Error al establecer la conexión a la BD');
        return;
    }
});

//Método GET participantes
app.get("/participante/", (req, res) => {
    const consulta = 'SELECT * FROM participante';
    bd.query(consulta, (error, results) => {
        if (error) {
            res.status(500).send(`Error al obtener datos: ${error}`);
            return;
        }
        res.status(200).json(results);
        console.log("Se obtuvieron: " + results.length + " participante(s)");
    });
});

app.get("/participante/:id", (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM participante WHERE id =?';
    bd.query(query, [id],
        (error, results) => {
            if (error) {
                res.status(500).send("Error al obtener el participante");
                return;
            }
            res.status(200).json(results);
            console.log("Se obtuvieron: " + results.length + " participantes(s)");
        }
    );
});

//Método GET proyectos
app.get("/proyectos/", (req, res) => {
    const consulta = 'SELECT * FROM proyectos';
    bd.query(consulta, (error, results) => {
        if (error) {
            res.status(500).send(`Error al obtener datos: ${error}`);
            return;
        }
        res.status(200).json(results);
        console.log("Se obtuvieron: " + results.length + " Proyecto(s)");
    });
});

app.get("/proyectos/:id", (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM proyectos WHERE id =?';
    bd.query(query, [id],
        (error, results) => {
            if (error) {
                res.status(500).send("Error al obtener el proyecto");
                return;
            }
            res.status(200).json(results);
            console.log("Se obtuvieron: " + results.length + " Proyecto(s)");
        }
    );
});

//Método GET asociaciones
app.get("/asociaciones/", (req, res) => {
    const consulta = "SELECT SO.id, PT.nombre AS 'participante', PT.edad, PT.rol, PR.nombre AS 'nombreproyecto', PR.tipo FROM asociacion as SO INNER JOIN participante as PT on SO.idpt = PT.id INNER JOIN proyectos as PR on SO.idpro = PR.id;";
    bd.query(consulta, (error, results) => {
        if (error) {
            res.status(500).send(`Error al rescibir datos: ${error}`);
            return;
        }
        res.status(200).json(results);
        console.log("Se obtuvieron: " + results.length + " Proyecto(s)");
    });
});


//Método POST
app.post("/participante/", (req, res) => {
    const { nombre, rol, edad} = req.body;
    const query = 'INSERT INTO participante(nombre,rol,edad) VALUES (?,?,?);'
    bd.query(query,
        [nombre, rol, edad],
        (error, results) => {
            if (error) {
                res.status(500).json(`Error al insertar ${error}`);
                return;
            }
            res.status(201).json(`Participante registrado con el ID: ${results.insertId}`);
            console.log(`Participante registrado con el ID: ${results.insertId}`)
        }
    );
});

app.post("/proyectos/", (req, res) => {
    const { nombre,tipo } = req.body;
    const query = 'INSERT INTO proyectos(nombre,tipo) VALUES (?,?);'
    bd.query(query,
        [nombre,tipo],
        (error, results) => {
            if (error) {
                res.status(500).json(`Error al insertar ${error}`);
                return;
            }
            res.status(201).json(`Proyecto registrado con el ID: ${results.insertId}`);
            console.log(`Proyecto registrado con el ID: ${results.insertId}`)
        }
    );
});

app.post("/asociaciones/", (req, res) => {
    const {idpt,idpro } = req.body;
    const query = 'INSERT INTO asociacion(idpt,idpro) VALUES (?,?);'
    bd.query(query,
        [idpt, idpro],
        (error, results) => {
            if (error) {
                res.status(500).json(`Error al insertar ${error}`);
                return;
            }
            res.status(201).json(`Asociación registrada con el ID: ${results.insertId}`);
            console.log(`Asociación registrada con el ID: ${results.insertId}`)
        }
    );
});

//Delete
app.delete("/participante/:id", (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM participante WHERE id =?';
    bd.query(query, [id],
        (error, results) => {
            if (error) {
                res.status(500).send("Error al eliminar el participante");
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).send("Participante no encontrado");
                return;
            }
            res.status(200).json('Participante eliminado exitosamente');
        }
    );
});

app.delete("/proyectos/:id", (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM proyectos WHERE id =?';
    bd.query(query, [id],
        (error, results) => {
            if (error) {
                res.status(500).send("Error al eliminar el proyecto");
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).send("Proyecto no encontrado");
                return;
            }
            res.status(200).json('Proyecto eliminado exitosamente');
        }
    );
});

app.delete("/asociaciones/:id", (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM asociacion WHERE id =?';
    bd.query(query, [id],
        (error, results) => {
            if (error) {
                res.status(500).send("Error al eliminar la asociación");
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).send("Asociación no encontrada");
                return;
            }
            res.status(200).json('Asociación eliminada exitosamente');
        }
    );
});

//Update
app.put("/participante/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, rol, edad } = req.body;

    // Validación básica de campos
    if (!nombre || !rol || !edad) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const query = 'UPDATE participante SET nombre = ?, rol = ?, edad = ? WHERE id = ?';

    bd.query(query, [nombre, rol, edad, id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al actualizar el participante" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Participante no encontrado" });
        }

        return res.status(200).json({ message: "Participante actualizado exitosamente" });
    });
});

app.put("/proyectos/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, tipo } = req.body;

    // Validación básica de campos
    if (!nombre || !tipo) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const query = 'UPDATE proyectos SET nombre = ?, tipo = ? WHERE id = ?';

    bd.query(query, [nombre, tipo, id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al actualizar el proyecto" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Proyecto no encontrado" });
        }

        return res.status(200).json({ message: "Proyecto actualizado exitosamente" });
    });
});