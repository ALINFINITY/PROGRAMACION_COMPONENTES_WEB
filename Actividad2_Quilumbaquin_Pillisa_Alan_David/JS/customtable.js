class customtable extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.mystyle();

    this.containertabla = document.createElement("div");
    this.containertabla.classList.add("container");
    this.shadow.appendChild(this.containertabla);

    //Template tabla
    this.template = document.createElement('template');
    this.template.innerHTML = `
        <table>
            <thead>
                <tr class="dathead">
                    
                </tr>
            </thead>
            <tbody class="tbod">

            </tbody>
        </table>
    `;

  }

  //Función que se ejecuta luego del constructor
  connectedCallback() {
    const srcAPI = this.getAttribute("srcAPI");
    this.fetchData(srcAPI);
  }

  //Render de la tabla
  mytabla = (data) => {
    this.tabla = this.template.content.cloneNode(true);

    //De la API se extraerá nombre, usuario, email, código postal, teléfono, website y nombre de la compañía

    const encabezados = ["Nombre","Usuario","Email","Código Postal","Teléfono","Website","Compañía"];

    encabezados.forEach((elm)=>{
        this.e = document.createElement('th');
        this.e.textContent = elm;
        this.tabla.querySelector(".dathead").appendChild(this.e);
    });

    data.forEach((obj)=>{
        this.tr = document.createElement('tr');
        this.dno = document.createElement('td');
        this.dun = document.createElement('td');
        this.dem = document.createElement('td');
        this.dco = document.createElement('td');
        this.dte = document.createElement('td');
        this.dwb = document.createElement('td');
        this.dcm = document.createElement('td');

        this.dno.textContent = obj.name;
        this.dun.textContent = obj.username;
        this.dem.textContent = obj.email;
        this.dco.textContent = obj.address.zipcode;
        this.dte.textContent = obj.phone;
        this.dwb.textContent = obj.website;
        this.dcm.textContent = obj.company.name;

        this.tr.appendChild(this.dno);
        this.tr.appendChild(this.dun);
        this.tr.appendChild(this.dem);
        this.tr.appendChild(this.dco);
        this.tr.appendChild(this.dte);
        this.tr.appendChild(this.dwb);
        this.tr.appendChild(this.dcm);
        
        this.tabla.querySelector(".tbod").appendChild(this.tr);
    });

    const h2 = document.createElement('h2');
    h2.textContent = "Utilización de API Rest"

    this.containertabla.appendChild(h2);
    this.containertabla.appendChild(this.tabla);
  };

  fetchData = async (srcAPI) => {
    try {
      const response = await fetch(srcAPI);
      const data = await response.json();
      this.mytabla(data);
    } catch (e) {
      console.log(e);
    }
  };

  mystyle = () => {
    this.styleCustom = document.createElement("style");
    this.styleCustom.innerHTML = `
        .container{
            background: linear-gradient(to right, #ff416c, #ff4b2b);
            padding: 24px;
            margin: 10px;
            border: 1px solid white;
            border-radius: 30px;
            color: white;
            font-family: cursive;
            text-shadow: -2px -1px 2px black;
            overflow: auto;

        }

        .container table{
            width: 100%;
        }

        .container th{
            padding: 4px;
            text-shadow: -2px -1px 1px black;
            border: 1px solid white;
            background-color: #ff4b2b;
        }   

        .container td{
            padding: 4px;
            text-shadow: -2px -1px 2px black;
            border: 1px solid white;
            background-color:rgb(224, 20, 68);
        }

    `;
    this.shadow.appendChild(this.styleCustom);
  };
}
window.customElements.define("table-custom", customtable);
