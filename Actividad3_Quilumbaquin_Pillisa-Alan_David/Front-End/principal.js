class principal extends HTMLElement {
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
      const vista = data || [];
      console.log(`Se obtuvieron ${vista.length} vistas`);
      console.log(vista);
      this.render(vista);
    } catch (error) {
      console.log(error);
    }
  };

  render = (vista) => {
    if (vista.length == 0) {
      this.container.innerHTML = `
                <p class="empty-alert">No existen vistas disponibles</p>
            `;
    }

    //Formulario asociación
    let form = `
        <div class="form-container" >
            <h2>Registrar una nueva asociación</h2>

            <form id="asoc-form">
                <label>Ingrese el ID del Participante</label>
                <input required type="number" id="idpt" name="idpt" min="1">
        
                <label>Ingrese el ID del Proyecto</label>
                <input required type="number" id="idpro" name="idpro" min="1">

                <button type="submit">Registrar</button>                   
            </form>
            </div>
        `;

    //construir el encabezado
    let tableHtml = `
            <h1>Asociaciones</h1>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre Participante</th>
                        <th>Edad Participante</th>
                        <th>Rol Participante</th>
                        <th>Nombre Proyecto</th>
                        <th>Tipo de Proyecto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

    //construir el body
    vista.forEach((obj) => {
      tableHtml += `
                <tr>
                    <td>${obj.id}</td>   
                    <td>${obj.participante}</td>                    
                    <td>${obj.edad}</td>  
                    <td>${obj.rol}</td>      
                    <td>${obj.nombreproyecto}</td>      
                    <td>${obj.tipo}</td>      
                    <td class = "actions">
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

    this.shadowRoot
      .querySelector("#asoc-form")
      .addEventListener("submit", this.handleSubmit);
  };

  handleDelete = async (id) => {
    const confirmDelete = confirm(
      `Esta seguro de eliminar la Asociación con el id ${id}`
    );

    if (confirmDelete) {
      try {
        const response = await fetch(`${this.getAttribute("src")}/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Asociación eliminada exitosamente");
          //this.fetchData()
          const src = this.getAttribute("src");
          this.fetchData(src);
        } else {
          alert("Error al eliminar Asociación");
        }
      } catch (error) {
        console.error(`Error al eliminar ${error}`);
      }
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log("dentro del metodo registrar");

    //capturo los valores de los formnularios
    const idpt = this.shadowRoot.querySelector("#idpt").value;
    const idpro = this.shadowRoot.querySelector("#idpro").value;

    const newproyecto = {
      idpt,
      idpro,
    };

    try {
      const response = await fetch(this.getAttribute("src"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newproyecto),
      });

      if (response.ok) {
        alert("Asociación registrada exitosamente");
        this.shadowRoot.querySelector("#asoc-form").reset();

        const src = this.getAttribute("src");
        this.fetchData(src);
      } else {
        const errorData = await response.json();
        alert(
          "Error al registrar: " +
            errorData.message +
            " o Entidades participantes no definidas"
        );
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

      button{
          cursor:pointer;
      }


      .form-container{
          background: linear-gradient(to right, #fc466b, #3f5efb);
          padding: 10px 30px 20px 30px ;
          border: 1px solid white;
          box-shadow: 0 0 12px #fc466b;
          border-radius: 30px;
          color: white;
          text-shadow: -1px -1px 3px black;

      }

      .form-container button,
      .form-container input{
          border: none;
          padding: 10px;
          border-radius: 30px;
          outline: none;

      }

        `;
    this.shadowRoot.appendChild(this.mst);
  };
}

window.customElements.define("principal-custom", principal);
