//Elaborado por: Quilumbauin Alan

class user extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    //Agrego el estilo para el componente
    this.custom_style();
    //Agrego el div inicial del componente
    this.init_box();

  };

  //Implementación del componente y funcionalidades
  connectedCallback() {
    this.render();

    //funcionalidad de los botones

    //Añadir
    this.add_friend();

    //Seguir
    this.follow_friend();
  };

  //Render para definir los elementos y propiedades del componente
  render = () =>{
    const src_img = this.getAttribute("src_img")||"recursos_img/default.png";
    const name = this.getAttribute("name")||"Usuario anónimo";
    const description = this.getAttribute("description")||"El usuario no ha proporcionado ninguna descripción...";
    
    //Caja de usuario
    const div_profile = document.createElement("div");
    div_profile.className = "p_box";
    div_profile.innerHTML = ` 
        <img src=${src_img} alt="">
        <br>
        <h1>${name}</h1>
        <br>
        <p>${description}</p>
        <br>
        <button id="btn_fll" class="btn_seguir">Seguir</button>
        <br>
        <button id="btn_add" class="btn_agregar">Agregar</button>
    `;
    
    this.shadowRoot.querySelector(".g_box").appendChild(div_profile);
  };

  //Div inicial del componente 
  init_box = () => {
    const div = document.createElement("div");
    div.className = "g_box";
    this.shadowRoot.appendChild(div);
  };

  //Funcionalidad de los botones:

  //Agregar
  add_friend = () =>{
    const name = this.getAttribute("name")||"Usuario anónimo";

    this.shadowRoot.getElementById("btn_add").addEventListener('click',()=>{
        if(this.shadowRoot.getElementById("btn_add").className == "btn_agregar"){
          this.shadowRoot.querySelector(".btn_agregar").className = "btn_cancelar_solicitud"
          this.shadowRoot.querySelector(".btn_cancelar_solicitud").style.backgroundColor = "#3F5EFB";
          alert(`Solicitud de amistad enviada a ${name}`);
          this.shadowRoot.querySelector(".btn_cancelar_solicitud").textContent = "Cancelar solicitud";
        }else{
          let boolconf = confirm(`¿Estás seguro de cancelar la solicitud de amistad enviada a ${name}?`)
          if(boolconf){
            this.shadowRoot.querySelector(".btn_cancelar_solicitud").className = "btn_agregar";
            this.shadowRoot.querySelector(".btn_agregar").textContent = "Agregar";
            this.shadowRoot.querySelector(".btn_agregar").style.backgroundColor = "rgb(40, 40, 255)"
          }
        };
    });
  };


  //Seguir
  follow_friend = () =>{
    const name = this.getAttribute("name")||"Usuario anónimo";

    this.shadowRoot.getElementById("btn_fll").addEventListener('click',()=>{
      if(this.shadowRoot.getElementById("btn_fll").className == "btn_seguir"){
        this.shadowRoot.querySelector(".btn_seguir").style.backgroundColor = "#05b83b";
        this.shadowRoot.querySelector(".btn_seguir").textContent = "Siguiendo";
        this.shadowRoot.querySelector(".btn_seguir").className = "btn_no_seguir";
      }else{
        let boolconf = confirm(`¿Quieres dejar de seguir a ${name}?`)
        if(boolconf){
          this.shadowRoot.querySelector(".btn_no_seguir").className = "btn_seguir";
          this.shadowRoot.querySelector(".btn_seguir").style.backgroundColor = "rgba(224, 12, 58, 0.904)";
          this.shadowRoot.querySelector(".btn_seguir").textContent = "Seguir";
        }
      };
    });

    
  };


  //Estilo del componente 
  custom_style = () => {
    const estilo = document.createElement("style");
    estilo.textContent = ` 
        .g_box{
            width: 95%;
            padding: 20px;
            margin: 20px 0; 
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        .g_box img{
            width: 180px;
            border: 1px solid black;
            border-radius: 50%;
        }

        .p_box h1{
           margin: 10px 0;
        }

        .p_box p{
           margin: 0;
           font-family: cursive;
           text-wrap: wrap;
           text-align: justify;
        }

        .p_box{
            width: 50%;
            padding: 20px 80px;
            margin: 0;
            border: 1px solid black;
            border-radius: 20px;
            background: #8A2387;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #F27121, #E94057, #8A2387);  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #F27121, #E94057, #8A2387); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            color: white;
        }

        .p_box button{
             border: 1px solid white;
             width: 80%;
             margin: 10px 0;
             padding: 8px 16px;
             border-radius: 10px;
             cursor: pointer;
             font-weight: bold;
             color: white;
             outline: none;
             font-family: cursive;
        }

        .p_box button:hover{
           box-shadow: 0 0 15px 5px rgba(224, 12, 58, 0.904);
           animation: color 2s infinite alternate;
        }

        @keyframes color {
          50%{box-shadow: 0 0 15px 5px rgba(224, 12, 58, 0.904);}
          70%{box-shadow: 0 0 15px 5px #0f3c9c;}
          100%{box-shadow: 0 0 15px 5px rgba(0, 255, 0, 0.7);}
        }

        .btn_seguir{
             background-color: rgba(224, 12, 58, 0.904);
        }

        .btn_agregar{
           background-color: rgb(40, 40, 255);
        }
    `;
    this.shadowRoot.appendChild(estilo);
  };
}

//Defino el componente
window.customElements.define("user-profile", user);
