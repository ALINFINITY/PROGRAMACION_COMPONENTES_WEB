class footer extends HTMLElement {
  constructor() {
    super();

    //Se crea el shadow root
    this.shadow = this.attachShadow({ mode: "open" });
    this.mystyle();

    this.containerfoot = document.createElement("div");
    this.containerfoot.classList.add("container");
    this.shadow.appendChild(this.containerfoot);
  }

  //Función que se ejecuta luego del constructor
  connectedCallback() {
    const imgdefault =
      "https://cdn-icons-png.flaticon.com/128/4461/4461744.png";
    //Obtengo los atributos del HTML
    let company = this.getAttribute("company") || "S.A";
    let srcimgfk = this.getAttribute("srcimgfk") || imgdefault;
    let srcimgig = this.getAttribute("srcimgig") || imgdefault;
    let srcimgx = this.getAttribute("srcimgx") || imgdefault;
    let languaje = this.getAttribute("languaje") || "Ingles";
    let fklink = this.getAttribute("fklink") || "https://www.facebook.com/";
    let iglink = this.getAttribute("iglink") || "https://www.instagram.com/";
    let xlink = this.getAttribute("xlink") || "https://x.com/";
    let termlink = this.getAttribute("termlink") || "";
    let privlink = this.getAttribute("privlink") || "";

    //Paso los atributos a mi footer
    this.myfooter(
      company,
      srcimgfk,
      srcimgig,
      srcimgx,
      languaje,
      fklink,
      iglink,
      xlink,
      termlink,
      privlink
    );
  }

  //Render de mi footer
  myfooter = (
    company,
    srcimgfk,
    srcimgig,
    srcimgx,
    languaje,
    fklink,
    iglink,
    xlink,
    termlink,
    privlink
  ) => {
    this.div1 = document.createElement("div");
    this.div2 = document.createElement("div");
    this.div3 = document.createElement("div");

    this.div1.classList.add("div1");
    this.div2.classList.add("div2");
    this.div3.classList.add("div3");

    //Va en div1
    this.lanlab = document.createElement("label");
    this.lanlab.textContent =
      languaje === "Español" ? `${languaje} (Ecuador)` : languaje;

    this.auserp = document.createElement("a");
    this.auserp.href = privlink;
    this.auserp.textContent = "Privacidad del Usuario";

    this.aterm = document.createElement("a");
    this.aterm.href = termlink;
    this.aterm.textContent = "Términos de uso";

    this.coplab = document.createElement("label");
    this.coplab.innerHTML = `&copy; 2024 ${company}. All rights reserved`;

    this.div1.appendChild(this.lanlab);
    this.div1.appendChild(this.auserp);
    this.div1.appendChild(this.aterm);
    this.div1.appendChild(this.coplab);

    this.containerfoot.appendChild(this.div1);

    //Va en div2
    const atarget = '_blank';

    
    this.af = document.createElement("a");
    this.imf = document.createElement("img");
    this.af.href = fklink;
    this.af.target = atarget;
    this.imf.src = srcimgfk;
    this.imf.alt = "Imagen de facebook";
    this.af.appendChild(this.imf);

    this.aig = document.createElement("a");
    this.imig = document.createElement("img");
    this.aig.href = iglink;
    this.aig.target = atarget;
    this.imig.src = srcimgig;
    this.imig.alt = "Imagen de Instagram";
    this.aig.appendChild(this.imig);

    this.ax = document.createElement("a");
    this.imx = document.createElement("img");
    this.ax.href = xlink;
    this.ax.target = atarget;
    this.imx.src = srcimgx;
    this.imx.alt = "Imagen de X (Twitter)";
    this.ax.appendChild(this.imx);

    this.div2.appendChild(this.af);
    this.div2.appendChild(this.aig);
    this.div2.appendChild(this.ax);

    this.containerfoot.appendChild(this.div2);

    //Va en div3
    this.contact = document.createElement("label");
    this.contacth = document.createElement("h3");
    this.contacth.textContent =
      languaje === "Español" ? `Contacto (${company})` : `Contact (${company})`;
    this.contact.textContent =
      languaje === "Español"
        ? `Quito - Ecuador: +593 908409344`
        : `EEUU: +1 (999) 123-456`;
    this.div3.appendChild(this.contacth);
    this.div3.appendChild(this.contact);

    this.containerfoot.appendChild(this.div3);
  };

  //Función de estilos CSS
  mystyle = () => {
    this.styleCustom = document.createElement("style");
    this.styleCustom.innerHTML = `

      .container{
          display: flex;
          background: linear-gradient(to right, #ff416c, #ff4b2b);
          justify-content: space-evenly;
          border: 1px solid white;
          border-radius: 30px;
          flex-wrap: wrap;
          padding: 10px 0 20px 20px;
          font-family: cursive;
      }

      .div1{
          display: flex;
          flex:1;
          padding: 10px;
          margin: 10px;
          flex-direction: column;
          gap: 10px;
          font-size: 1rem;
          text-align: center;
          color: white;
          text-shadow: -2px -1px 2px black;
      }

      .div1 a{
          text-decoration: none;
          color: white;
          text-shadow: -2px -1px 2px black;
          font-weight: bold;
      }

      .div2{
          display: flex;
          flex:1;
          padding: 10px;
          margin: 10px;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: center;
      }

      .div2 img{
          width: 55px;
          filter: drop-shadow(0 0 6px white);
      }

      .div3 {
          flex:1;
          padding: 10px;
          margin: 10px;
          color: white;
          text-shadow: -2px -1px 2px black;
      }

   `;

    this.shadow.appendChild(this.styleCustom);
  };
}

window.customElements.define("footer-custom", footer);
