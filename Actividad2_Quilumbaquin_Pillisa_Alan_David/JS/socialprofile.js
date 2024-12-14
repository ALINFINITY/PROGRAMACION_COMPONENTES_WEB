class socialprofile extends HTMLElement {
  constructor() {
    super();

    //Se crea el shadow root
    this.shadow = this.attachShadow({ mode: "open" });
    this.mystyle();

    this.containerp = document.createElement("div");
    this.containerp.classList.add("container");
    this.shadow.appendChild(this.containerp);
  }

  //Función que se ejecuta luego del constructor
  connectedCallback() {
    this.myprofile();
  }

  //Render de la tarjeta con mis datos
  myprofile(){
    const datos = {
        Nombres: "Alan David",
        Apellidos: "Quilumbaquin Pillisa",
        Carrera: "Ingeniería en Tecnologías de la Información",
        Intereses: "Redes de comunicación, Programación de software y Administración y Gestión de bases de datos."
    }

    this.mytag = document.createElement('div');
    this.mytag.classList.add("mytag");
    this.img = document.createElement('img');
    const br = document.createElement('br');
    this.img.src = "https://cdn-icons-png.flaticon.com/128/10146/10146555.png";
    this.img.alt = "Imagen de perfil";

    this.h2 = document.createElement('h2');
    this.h2.textContent = datos.Nombres;
    this.mytag.appendChild(this.h2);
    this.mytag.appendChild(this.img);

    this.lab = document.createElement('div');

    Object.entries(datos).forEach(([llave,valor])=>{
        this.eti = document.createElement('label');
        this.eti.textContent = `${llave}: ${valor}`;
        this.lab.appendChild(br.cloneNode());
        this.lab.appendChild(br.cloneNode());
        this.lab.appendChild(this.eti);
    });

    this.mytag.appendChild(this.lab);
    this.containerp.appendChild(this.mytag);

  }

  mystyle = () => {
    this.styleCustom = document.createElement("style");
    this.styleCustom.innerHTML = `
      .container{
        display: flex;
        padding: 18px;
        border: 1px solid white;
        border-radius: 30px;
        justify-content: center;
        font-family: cursive;
      }
      
      .mytag{
        display: flex;
        justify-content: center;
        color: white;
        flex-direction: column;
        width: 50%;
        border: 3px solid white;
        padding: 18px;
        border-radius: 30px;
        align-items: center;
        text-shadow: -2px -1px 2px black;
        background: linear-gradient(to right, #ff416c, #ff4b2b);
      }


      .mytag img{
        width: 100px;
        filter: drop-shadow(0 0 6px white);
      }

    `;
    this.shadow.appendChild(this.styleCustom);
  };
}
window.customElements.define('socialprofile-custom',socialprofile);
