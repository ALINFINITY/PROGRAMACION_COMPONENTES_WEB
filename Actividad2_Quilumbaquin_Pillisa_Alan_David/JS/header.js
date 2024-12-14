class header extends HTMLElement {
  constructor() {
    super();

    //Se crea el shadow root
    this.shadow = this.attachShadow({ mode: "open" });
    this.mystyle();

    this.containerhead = document.createElement("div");
    this.containerhead.classList.add("container");
    this.shadow.appendChild(this.containerhead);
  }

  //Función que se ejecuta luego del constructor
  connectedCallback() {
    let title = this.getAttribute("title") || "Solución tecnológica en proceso";
    let author = this.getAttribute("author") || "Anónimo";
    let iconsrc = this.getAttribute("iconsrc") || "https://pngimg.com/uploads/pokeball/pokeball_PNG29.png";
    this.mytitle(title, author, iconsrc);
  };

  //Render de mi cabecera
  mytitle = (title, author, iconsrc) => {
    this.div = document.createElement("div");
    this.div.classList.add("mydiv")
    this.TH1 = document.createElement("h1");
    this.TH1.textContent = title;
    this.AUT = document.createElement("label");
    this.AUT.textContent = `El autor de esta página web es: ${author}`;
    this.IC = document.createElement("img");
    this.IC.src = iconsrc;
    this.IC.alt = `Icono favorito de ${author}`;

    this.div.appendChild(this.TH1);
    this.div.appendChild(this.AUT);
    this.containerhead.appendChild(this.div);
    this.containerhead.appendChild(this.IC);
  };

  //Función de estilos CSS
  mystyle = () => {
    this.styleCustom = document.createElement("style");
    this.styleCustom.innerHTML = `
      .container{
          display: flex;
          background: linear-gradient(to right, #ff416c, #ff4b2b);
          flex-direction: row;
          padding: 18px;
          border: 1px solid white;
          border-radius: 30px;
      }

      .container img{
        max-width: 110px;
        margin: 10px;
      }

      .mydiv{
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          width: 90%;
          font-family: cursive;
      }

      .mydiv h1{
          color: white;
          text-shadow: -1px -1px 8px white;
          font-size: 2rem;
      }

      .mydiv label{
          color: white;
          font-size: 1rem;
          text-shadow: -2px -1px 3px black;
      }
    `;
    this.shadow.appendChild(this.styleCustom);
  };
}

window.customElements.define("header-custom", header);
