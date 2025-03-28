class footer extends HTMLElement {
  constructor() {
    super();

    //Se crea el shadow root
    this.attachShadow({ mode: "open" });
    this.mystyle();

    this.containerfoot = document.createElement("div");
    this.containerfoot.classList.add("container");
    this.shadowRoot.appendChild(this.containerfoot);

    this.template = document.createElement("template");
    this.template.innerHTML = `
            <div class="foot">
                <h3>Realizado con la tecnología de Custom Elements</h3>
                <div class="enlaces">
                    <a id="fb" href="">Facebook</a>
                    <a id="ig" href="">Instagram</a>
                    <a id="ep" href="">ESPE</a>
                </div>
                <p>&copy; All rights reserved</p>
            </div>
      `;
  }

  //Función que se ejecuta luego del constructor
  connectedCallback() {
    const fblink = this.getAttribute("srcfb");
    const iglink = this.getAttribute("srcig");
    const eplink = this.getAttribute("srcep");

    this.myfooter(fblink, iglink, eplink);
  }

  //Render de mi footer
  myfooter = (Facebooksrc, Instagramsrc, ESPEsrc) => {
    const foot = this.template.content.cloneNode(true);
    const Facebook = foot.querySelector("#fb");
    const Instagram = foot.querySelector("#ig");
    const ESPE = foot.querySelector("#ep");

    Facebook.href = Facebooksrc;
    Instagram.href = Instagramsrc;
    ESPE.href = ESPEsrc;

    this.containerfoot.appendChild(foot);
  };

  //Función de estilos CSS
  mystyle = () => {
    this.mst = document.createElement("style");
    this.mst.innerHTML = `
            .foot{
                background: linear-gradient(to right, #000046, #1cb5e0);
                text-shadow: -1px -1px 2px black;
                display: flex;
                flex-direction: column;
                padding: 10px;
                text-align: center;
                border: 1px solid white;
                box-shadow: 0 0 12px #1cb5e0;
                border-radius: 30px;
                gap: 20px;
                color: white;
            }

            .enlaces{
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                font-weight: bold;
            }

            .enlaces a{
                text-decoration: none;
                color: white;
            }

        `;
    this.shadowRoot.appendChild(this.mst);
  };
}

window.customElements.define("footer-custom", footer);
