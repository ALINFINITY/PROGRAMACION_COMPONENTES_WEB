class participante extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.mystyle();

    this.container = document.createElement("div");

    this.shadowRoot.appendChild(this.container);
  }

  connectedCallback() {
    const src = this.getAttribute("src");
    this.fetchData(src);
  }

  fetchData = async (src) => {
    try {
      const response = await fetch(src);
      const data = await response.json();
      const participante = data || [];
      //Console de desarrollo
      //console.log(`Se obtuvieron ${participante.length} participantes`);
      //console.log(participante);
      this.render(participante);
    } catch (error) {
      console.log(error);
    }
  };

  render = (participante) => {
    if (participante.length == 0) {
      this.container.innerHTML = `
                <p class="empty-alert">No existen participantes disponibles</p>
            `;
    }

    //Formulario participante
    let form = `
        <div class="form-container" >
                <h2>Registrar un nuevo Participante</h2>

            <form id="participante-form">
                <label >Nombre</label>
                <input required type="text" id="nombre" name="nombre">

                <label for="rol">Rol</label>
                <select required name="rol" id="rol">
                    <option value="Administrador">Administrador</option>
                    <option value="Invitado">Invitado</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Estudiante">Estudiante</option>
                </select>

                <label >Edad</label>
                <input required type="number" id="edad" name="edad" min="14">

                
                <button type="submit">Registrar</button>                   
            </form>
            </div>
        `;

    //construir el encabezado
    let tableHtml = `
            <h1>Participantes</h1>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Rol</th>
                        <th>Edad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

    //construir el body
    participante.forEach((obj) => {
      tableHtml += `
                <tr>
                    <td>${obj.id}</td>   
                    <td>${obj.nombre}</td>                    
                    <td>${obj.rol}</td>                    
                    <td>${obj.edad}</td>                    
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

    this.container.innerHTML = form + tableHtml;

    this.container.querySelectorAll(".btn-eliminar").forEach((button) => {
      button.addEventListener("click", () =>
        this.handleDelete(button.dataset.id)
      );
    });

    this.container.querySelectorAll(".btn-update").forEach((button) => {
      button.addEventListener("click", () =>
        this.handleUpdate(button.dataset.id)
      );
    });

    this.shadowRoot
      .querySelector("#participante-form")
      .addEventListener("submit", this.handleSubmit);
  };

  handleDelete = async (id) => {
    const confirmDelete = confirm(
      `Esta seguro de eliminar el participante con el id ${id}`
    );

    if (confirmDelete) {
      try {
        const response = await fetch(`${this.getAttribute("src")}/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Participante eliminado exitosamente");

          const src = this.getAttribute("src");
          this.fetchData(src);
        } else {
          alert("Error al eliminar el Participante");
        }
      } catch (error) {
        console.error(`Error al eliminar ${error}`);
      }
    }
  };

  handleUpdate = async (id) => {
    //Console de desarrollo
    //console.log("En el update");

    let up = `
        <div class="update-container" >
                <h2>Actualizando el Participante con ID: ${id}</h2>

            <form id="participante-form">
                <label >Nombre</label>
                <input required type="text" id="unombre" name="unombre">

                <label for="rol">Rol</label>
                <select required name="urol" id="urol">
                    <option value="Administrador">Administrador</option>
                    <option value="Invitado">Invitado</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Estudiante">Estudiante</option>
                </select>

                <label >Edad</label>
                <input required type="number" id="uedad" name="uedad" min="14">

                
                <button id="up" type="submit">Registrar</button>                   
            </form>
            </div>
        `;

    //capturo los valores de los formnularios

    try {
      this.shadowRoot.querySelector(".form-container").hidden = true;
      this.container.innerHTML = up + this.container.innerHTML;

      const response = await fetch(`${this.getAttribute("src")}/${id}`);
      const data = await response.json();
      this.shadowRoot.querySelector("#unombre").value = data[0].nombre;
      this.shadowRoot.querySelector("#urol").value = data[0].rol;
      this.shadowRoot.querySelector("#uedad").value = data[0].edad;
      this.shadowRoot.querySelector("#up").textContent = "Actualizar";
      this.shadowRoot.querySelector("#up").style.backgroundColor = "red";
      this.shadowRoot.querySelector("#up").style.color = "white";

      this.container.querySelectorAll(".btn-eliminar").forEach((button) => {
        button.hidden = true;
      });
      this.container.querySelectorAll(".btn-update").forEach((button) => {
        button.hidden = true;
      });

      this.shadowRoot
        .querySelector("#up")
        .addEventListener("click", async () => {
          //capturo los valores de los formnularios
          const nombre = this.shadowRoot.querySelector("#unombre").value;
          const rol = this.shadowRoot.querySelector("#urol").value;
          const edad = this.shadowRoot.querySelector("#uedad").value;

          //Control de edad
          if (edad < 14) {
            alert("Edad no admitida");
            return;
          }

          const upparticipante = {
            nombre,
            rol,
            edad,
          };

          const response = await fetch(`${this.getAttribute("src")}/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(upparticipante),
          });

          if (response.ok) {
            alert("Participante actualizado exitosamente");
            this.shadowRoot.querySelector("#proyecto-form").reset();

            const src = this.getAttribute("src");
            this.fetchData(src);
          } else {
            const errorData = await response.json();
            alert("Error al actualizar: " + errorData.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    //Console de desarrollo
    //console.log("dentro del metodo registrar");

    //capturo los valores de los formnularios
    const nombre = this.shadowRoot.querySelector("#nombre").value;
    const rol = this.shadowRoot.querySelector("#rol").value;
    const edad = this.shadowRoot.querySelector("#edad").value;

    const newparticipante = {
      nombre,
      rol,
      edad,
    };

    try {
      const response = await fetch(this.getAttribute("src"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newparticipante),
      });

      if (response.ok) {
        alert("Participante registrado exitosamente");
        this.shadowRoot.querySelector("#participante-form").reset();

        const src = this.getAttribute("src");
        this.fetchData(src);
      } else {
        const errorData = await response.json();
        alert("Error al registrar: " + errorData.message);
      }
    } catch (error) {
      console.error(`Error con la bd: ${error}`);
    }
  };

  mystyle = () => {
    this.mst = document.createElement("style");
    this.mst.innerHTML = `
            h1{
                color:white;
            }
            table{
                width:100%;
                border-collapse:collapse;
                box-shadow: 0 0 12px lime;
                margin:30px 0;
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
            td{
                color:white;
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
                border:1px solid white;
                border-radius: 10px;             
            }

            .btn-update{
                background-color:rgb(20, 53, 216);
                color:white;   
                padding: 5px 10px;
                border:1px solid white;
                border-radius: 10px;
            }

            button{
                cursor:pointer;
            }

            .form-container,
            .update-container{
                background: linear-gradient(to right, #fc466b, #3f5efb);
                padding: 10px 30px 20px 30px ;
                border: 1px solid white;
                box-shadow: 0 0 12px #fc466b;
                border-radius: 30px;
                color: white;
                text-shadow: -1px -1px 3px black;

            }
                
            .update-container button,
            .update-container input,
            .update-container select,
            .form-container button,
            .form-container input,
            .form-container select{
                border: 1px solid white;
                padding: 10px;
                border-radius: 30px;
                outline: none;

            }

        `;
    this.shadowRoot.appendChild(this.mst);
  };
}

window.customElements.define("participante-custom", participante);
