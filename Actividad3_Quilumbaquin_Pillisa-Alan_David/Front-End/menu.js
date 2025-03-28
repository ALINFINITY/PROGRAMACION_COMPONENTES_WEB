class menu extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.mystyle();

        this.container = document.createElement('div');


        this.shadowRoot.appendChild(this.container);
    }

    connectedCallback(){
        const srcin = this.getAttribute('srcinicio');
        const srcpt = this.getAttribute('srcparticipante');
        const srcpr = this.getAttribute('srcproyectos');

        this.render(srcin,srcpt,srcpr);

    }

    render = (srcin,srcpt,srcpr) => {
       
        this.container.innerHTML = `
            <ul>
                <li>
                    <a id="srcin" href="">Inicio</a>
                </li>
                <li>
                    <a id="srcpt" href="">Participantes</a>
                </li>
                <li>
                    <a id="srcpr" href="">Proyectos</a>
                </li>
            </ul>
        `;

        const inicio = this.container.querySelector("#srcin");
        const participante = this.container.querySelector("#srcpt");
        const proyectos = this.container.querySelector("#srcpr");

        inicio.href = srcin;
        participante.href = srcpt;
        proyectos.href = srcpr;
       
    }


    mystyle = ()=>{
        this.mst = document.createElement('style');
        this.mst.innerHTML = `

            ul{
                display: flex;
                justify-content: space-between;
                list-style-type: none;
                padding: 20px 80px;

            }

            li{
                padding: 10px 20px;
                border: 1px solid black;
                border-radius: 30px;
                background-color: black;
            }

            a{
                text-decoration: none;
                font-size: 1.5rem;
                font-weight: bold;
                color: white;
                text-shadow: -1px -1px 4px lime;
            }
        `;
        this.shadowRoot.appendChild(this.mst);
    }

}

window.customElements.define('menu-custom',menu);