class proyecto extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.mystyle();

        this.container = document.createElement('div');

        this.shadowRoot.appendChild(this.container);

    }

    connectedCallback(){
        const src = this.getAttribute('src');
        this.fetchData(src);
    }

    fetchData = async (src) =>{
        try {
            const response = await fetch(src);
            const data = await response.json();
            const proyecto = data || [];
            console.log(`Se obtuvieron ${proyecto.length} proyectos`);
            console.log(proyecto);
            this.render(proyecto);
        } catch (error) {
            console.log(error);
        }
    }

    render = (proyecto) => {

        if (proyecto.length == 0) {
            this.container.innerHTML = `
                <p class="empty-alert">No existen proyectos disponibles</p>
            `;
        }

        //Formulario proyecto
        let form = `
        <div class="form-container" >
            <h2>Registrar un nuevo Proyecto</h2>

            <form id="proyecto-form">
                <label >Nombre</label>
                <input type="text" id="nombre" name="nombre">

                <label for="tipo">Tipo</label>
                <select name="tipo" id="tipo">
                    <option value="Investigación">Investigación</option>
                    <option value="Actividad">Actividad</option>
                    <option value="Empresarial">Empresarial</option>
                    <option value="Académico">Académico</option>
                    <option value="Personal">Personal</option>
                </select>

                <button type="submit">Registrar</button>                   
            </form>
            </div>
        `

        //construir el encabezado
        let tableHtml = `
            <h1>Proyectos</h1>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        //construir el body
        proyecto.forEach(obj => {
            tableHtml += `
                <tr>
                    <td>${obj.id}</td>   
                    <td>${obj.nombre}</td>                    
                    <td>${obj.tipo}</td>                    
                    <td class = "actions">
                        <button class="btn-update" data-id="${obj.id}">Actualizar</button>
                        <button class="btn-eliminar" data-id="${obj.id}">Eliminar</button>
                    </td>
                </tr>
            `;
        });

        //finalizo la construccion
        tableHtml += `
                </tbody>
            </table>
        `;

        this.container.innerHTML = form+tableHtml;

        this.container.querySelectorAll('.btn-eliminar').forEach(button => {
            button.addEventListener('click', () => this.handleDelete(button.dataset.id));
        });

        this.container.querySelectorAll('.btn-update').forEach(button => {
            button.addEventListener('click', () => this.handleUpdate(button.dataset.id));
        });


        this.shadowRoot.querySelector('#proyecto-form').addEventListener('submit', this.handleSubmit);

    }

    handleDelete = async (id) => {
        const confirmDelete = confirm(`Esta seguro de eliminar el proyecto con el id ${id}`);

        if (confirmDelete) {
            try {
                const response = await fetch(`${this.getAttribute('src')}/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    alert('proyecto eliminado exitosamente')
                    //this.fetchData()
                    const src = this.getAttribute('src');
                    this.fetchData(src);
                } else {
                    alert('Error al eliminar el proyecto')
                }
            } catch (error) {
                console.error(`Error al eliminar ${error}`);
            }
        }

    }

    handleUpdate = async (id) => {
        console.log("En el update");

        let up = `
        <div class="up-container" >
            <h2>Actualizar el Proyecto con ID: ${id}</h2>

            <form id="proyecto-form">
                <label >Nombre</label>
                <input type="text" id="unombre" name="unombre">

                <label for="tipo">Tipo</label>
                <select name="utipo" id="utipo">
                    <option value="Investigación">Investigación</option>
                    <option value="Actividad">Actividad</option>
                    <option value="Empresarial">Empresarial</option>
                    <option value="Académico">Académico</option>
                    <option value="Personal">Personal</option>
                </select>

                <button id="up" type="submit">Registrar</button>                   
            </form>
            </div>
        `

        //capturo los valores de los formnularios

        try {
            this.shadowRoot.querySelector('.form-container').hidden = true; 
            this.container.innerHTML = up + this.container.innerHTML;

            const response = await fetch(`${this.getAttribute('src')}/${id}`)
            const data = await response.json();
            this.shadowRoot.querySelector('#unombre').value = data[0].nombre;
            this.shadowRoot.querySelector('#utipo').value = data[0].tipo;
            this.shadowRoot.querySelector('#up').textContent = "Actualizar";
            this.shadowRoot.querySelector('#up').style.backgroundColor = 'red'; 
            this.shadowRoot.querySelector('#up').style.color = 'white'; 

            this.container.querySelectorAll('.btn-eliminar').forEach(button => {
                button.hidden = true; 
            });
            this.container.querySelectorAll('.btn-update').forEach(button => {
                button.hidden = true; 
            });

            this.shadowRoot.querySelector('#up').addEventListener('click', async ()=>{

                //capturo los valores de los formnularios
                const nombre = this.shadowRoot.querySelector('#unombre').value;
                const tipo = this.shadowRoot.querySelector('#utipo').value;

                 const upproyecto = {
                   nombre,
                   tipo
                 };

                const response = await fetch(`${this.getAttribute('src')}/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(upproyecto)
                });
    
                if (response.ok) {
                    alert('Proyecto actualizado exitosamente');
                    this.shadowRoot.querySelector("#proyecto-form").reset();
                    
                    const src = this.getAttribute('src');
                    this.fetchData(src);
                } else {
                    const errorData = await response.json();
                    alert("Error al actualizar: " + errorData.message);
                }
                
            });
        } catch (error) {
            console.log(error);
        }

    }

    handleSubmit = async (event) => {
        event.preventDefault();
        console.log("dentro del metodo registrar");

        //capturo los valores de los formnularios
        const nombre = this.shadowRoot.querySelector('#nombre').value;
        const tipo = this.shadowRoot.querySelector('#tipo').value;

        const newproyecto = {
            nombre,
            tipo
        };

        try {
            const response = await fetch(this.getAttribute('src'), {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newproyecto)
            });

            if (response.ok) {
                alert('Proyecto registrado exitosamente');
                this.shadowRoot.querySelector("#proyecto-form").reset();
                
                const src = this.getAttribute('src');
                this.fetchData(src);
            } else {
                const errorData = await response.json();
                alert("Error al registrar: " + errorData.message);
            }

        } catch (error) {
            console.error(`Error con la bd: ${error}`)
        }

    }

    mystyle = ()=>{
        this.mst = document.createElement('style');
        this.mst.innerHTML = `
        
        table{
                width:100%;
                border-collapse:collapse;
                margin:20px 0;
                font-size: 16px;
                text-align: letf;
            }
            th, td{
                padding: 10px;
                border: 1px solid lime;
            }
            th{
                background-color:black;
                color: lime;
            }
            .error-alert{
            }
            .empty-alert{
            }
            .actions{
                
            }
            .btn-eliminar{
                background-color:red;
                color:white;   
                padding: 5px 10px;
                border:none;
                border-radius: 10px;             
            }

            button{
                cursor:pointer;
            }

            .form-container,
            .up-container{
                background: linear-gradient(to right, #fc466b, #3f5efb);
                padding: 10px 30px 20px 30px ;
                border: 3px solid black;
                border-radius: 30px;
                color: white;
                text-shadow: -1px -1px 3px black;

            }
            
            .up-container button,
            .up-container input,
            .up-container select,
            .form-container button,
            .form-container input,
            .form-container select{
                border: 2px solid black;
                padding: 10px;
                border-radius: 30px;
                outline: none;

            }
        `;
        this.shadowRoot.appendChild(this.mst);
    }

}

window.customElements.define('proyecto-custom',proyecto);