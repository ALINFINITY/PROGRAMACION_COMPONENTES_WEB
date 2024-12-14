class menu extends HTMLElement{
    constructor(){
        super();
        
        //Se crea el shadow root
        this.shadow = this.attachShadow({mode:'open'});
        this.mystyle();

        this.containermenu = document.createElement('div');
        this.containermenu.classList.add("container");
        this.shadow.appendChild(this.containermenu);
    }

    //Función que se ejecuta luego del constructor
    connectedCallback(){
        this.mymenu();
    };


    //Función para construir un menu dinámico (Render)
    mymenu = ()=>{
        try{
            this.miul = document.createElement('ul');
            const numitems = this.getAttribute('numitems') || 0;
            for(let i = 0;i<numitems;i++){
                this.eli = document.createElement('li');
                this.ali = document.createElement('a');
                this.ali.textContent = this.getAttribute(`nameitem${i+1}`) || "AddName";
                this.ali.href = this.getAttribute(`srcitem${i+1}`) || "";
                this.eli.appendChild(this.ali);
                this.miul.appendChild(this.eli);
            }
            this.containermenu.appendChild(this.miul);
        }catch(e){
            console.log(e);
        }

    };  

    //Función de estilo
    mystyle = () => {
        this.styleCustom = document.createElement("style");
        this.styleCustom.innerHTML = `

            .container{
                background: linear-gradient(to right, #ff416c, #ff4b2b);
                padding: 18px;
                border: 1px solid white;
                border-radius: 30px;
                margin: 10px 0;
                font-size: 1.2rem;
                font-family: cursive;
                font-weight: bold;
            }

            .container ul{
                display: flex;
                flex-direction: row;
                justify-content: start;
                gap: 10px;
                list-style-type: none;
                flex-wrap: wrap;
            }


            .container a{
                display: inline-block;
                text-decoration: none;
                color: white;
                padding: 10px;
                border: 1px dashed white;
                text-shadow: -2px -1px 2px black;
            }

        `;

        this.shadow.appendChild(this.styleCustom);
      };


}
window.customElements.define('menu-custom',menu);