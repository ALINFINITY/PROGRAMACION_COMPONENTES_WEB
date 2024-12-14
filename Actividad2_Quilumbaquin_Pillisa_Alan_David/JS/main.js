class main extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.mystyle();
    this.slotsd();
  }

  //Función de estilos
  mystyle = () => {
    this.styleCustom = document.createElement("style");
    this.styleCustom.innerHTML = `

      .container{
          background: linear-gradient(to right, #ff416c, #ff4b2b);
          padding: 18px;
          margin: 20px 0;
          border: 1px solid white;
          border-radius: 30px;
          color: white;
          text-shadow: -2px -1px 2px black;
          font-family: cursive;
      }
   `;
    this.shadow.appendChild(this.styleCustom);
  };

  //Función de slots dinámicos
  slotsd = () => {
    this.containerslot = document.createElement("div");
    this.containerslot.classList.add("container");
    this.shadow.appendChild(this.containerslot);

    //Slot dinámico
    const slot = document.createElement("slot");
    this.containerslot.appendChild(slot);
  };
}

window.customElements.define("main-custom", main);
