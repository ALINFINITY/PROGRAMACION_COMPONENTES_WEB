class gallery extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.mystyle();

    this.containergallery = document.createElement("div");
    this.containergallery.classList.add("container");
    this.shadow.appendChild(this.containergallery);

    const h2 = document.createElement('h2');
    h2.textContent = "Utilización de PokéAPI"

    this.containergallery.appendChild(h2);

    //Template gallery
    this.template = document.createElement("template");
    this.template.innerHTML = `
      <div class="cardPK">
        <h3></h3>
        <img src="" alt="">
        <br>
        <h4>Experiencia Base:</h4>
        <label id="exp"></label>
        <br>
        <h4>Tipo:</h4>
        <div id="tip"></div>
      </div>
    `;
  }

  //Función que se ejecuta luego del constructor
  connectedCallback() {
    const srcAPI = this.getAttribute("srcAPI");
    this.fetchData(srcAPI);
  }


  //Render de las tarjetas Pokemon
  mygallery = (data) => {
    this.card = this.template.content.cloneNode(true);
    this.card.querySelector("h3").textContent = data.name;
    this.card.querySelector("img").src = data.sprites.other['official-artwork'].front_default;
    this.card.querySelector("img").alt = `Imagen de ${data.name}`;
    this.card.querySelector("#exp").textContent = data.base_experience+" puntos";
    const br = document.createElement('br');

    data.types.forEach((obj)=>{
      const tip = document.createElement('label');
      tip.textContent = "- "+obj.type.name;
      this.card.querySelector("#tip").appendChild(tip); 
      this.card.querySelector("#tip").appendChild(br.cloneNode());
      this.card.querySelector("#tip").appendChild(br.cloneNode());
    });

    this.containergallery.appendChild(this.card);
  };

  //Obtengo un array de n APIs_Pokemon
  fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const pokemonapis = data.results;
      pokemonapis.forEach((obj) => {
        this.fetchPOKE(obj.url);
      });
    } catch (e) {
      console.log(e);
    }
  };

  //Obtengo la data de cada Pokemon
  fetchPOKE = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.mygallery(data);
    } catch (e) {
      console.log(e);
    }
  };

  mystyle = () => {
    this.styleCustom = document.createElement("style");
    this.styleCustom.innerHTML = `
      .container{
          background: linear-gradient(to right, #ff416c, #ff4b2b);
          padding: 18px;
          margin: 10px 0;
          border: 1px solid white;
          border-radius: 30px;
          color: white;
          text-shadow: -2px -1px 2px black;
          font-family: cursive;
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(200px, 1fr));
          gap: 18px;
      }

      .container img{
          filter: drop-shadow(-1px -1px 6px black);
          width: 200px;
      }

      .container h2{
          grid-column: 1/-1;
          text-align: center;
      }

      .container h3{
          text-align: center;
      }

      .cardPK{
          border: 2px dashed white;
          padding: 10px;
          border-radius: 30px;
      }

    `;
    this.shadow.appendChild(this.styleCustom);
  };
}
window.customElements.define("gallery-custom", gallery);
