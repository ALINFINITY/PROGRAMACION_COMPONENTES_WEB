class Generator extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:'open'});

        //Estilo
        this.mystyle();

        //Contenedores
        this.generatorcontainer = document.createElement('div');
        this.generatorcontainer.classList.add('Cgenerator');

        this.formcontainer = document.createElement('div');
        this.formcontainer.classList.add('Cform');

        this.cardcontainer = document.createElement('div');
        this.cardcontainer.classList.add('Ccard');

        //Templates

        this.card = document.createElement('template');
        this.card.innerHTML = `
            <div class="tj">
                <h2></h2>
                <img src="" alt="">
                <br>
                <p></p>
                <br>
                <button class="btneliminar">Eliminar</button>
            </div>
        `;

        this.form = document.createElement('template');
        this.form.innerHTML = `
            <div class="formulario">
                <form>
                    <label>Ingresa el título de tu tarjeta</label>
                    <br>
                    <input class="titulo" required type="text" placeholder="Titulo">
                    <br>
                    <label>Ingresa un URL de imagen de tu tarjeta</label>
                    <br>
                    <input class="urlimg" required type="text" placeholder="URL-img">
                    <br>
                    <label>Ingresa una descripción</label>
                    <br>
                    <input class="descripcion" required type="text" placeholder="Descripción">
                    <br>
                    <br>
                    <button>Ingresar</button>
                </form>
            </div>
        `;
        

        //Añado el contenedor al shadow root
        this.shadowRoot.appendChild(this.generatorcontainer);

    }   

    connectedCallback(){
        //ID para cada div
        this.iddivs = 1;

        //Añado los contenedores de formulario y tarjetas
        this.generatorcontainer.appendChild(this.formcontainer);
        this.generatorcontainer.appendChild(this.cardcontainer);

        //Botón para crear tarjetas
        this.divbtn = document.createElement('div');
        this.divbtn.classList.add("divbtnc");
        this.btnadd = document.createElement('button');
        this.btnadd.classList.add('btncrear');
        this.btnadd.textContent = 'Crear tarjeta';
        this.divbtn.appendChild(this.btnadd);
        this.cardcontainer.appendChild(this.divbtn);

        this.btnadd.addEventListener('click',()=>{
            const formulario = this.form.content.cloneNode(true);
            this.formcontainer.appendChild(formulario);
            this.btnadd.hidden = true;
            this.creartarjeta();
        });

    }

    //Render de mi tarjeta
    creartarjeta = () =>{
        //Formulario
        const form = this.formcontainer.querySelector('form');

        form.addEventListener('submit',(e)=>{
            e.preventDefault();
            
            //Div
            const card = this.card.content.cloneNode(true);
            const div = card.querySelector('div');
            div.classList.add(`tarjeta${this.iddivs}`);
            const divid = `tarjeta${this.iddivs}`;
            
            //Elementos
            const titulo = card.querySelector('h2');
            const img = card.querySelector('img');
            const p = card.querySelector('p');
            
            //Información
            titulo.textContent = form.querySelector('.titulo').value;
            img.src = form.querySelector('.urlimg').value;
            img.alt = `Imagen de ${form.querySelector('.titulo').value}`;
            p.textContent = form.querySelector('.descripcion').value;
            

            //Botón Eliminar
            const btn = card.querySelector('.btneliminar');
            btn.addEventListener('click',()=>{
                const c = confirm(`Seguro que quieres eliminar la tarjeta ${titulo.textContent}`)
                if (c){
                    div.remove();
                    alert(`Se elimino la tarjeta ${titulo.textContent}`);
                }
            });

            //Agregar
            this.cardcontainer.appendChild(card);

            //Mensaje agregado
            alert("Tarjeta agregada exitosamente");
            this.formcontainer.innerHTML = "";
            this.btnadd.hidden = false;

            //Valor id para el siguiente ID
            this.iddivs = parseInt(this.iddivs)+1;
            
        });
    }


    mystyle = () =>{
        this.stylep = document.createElement('style');
        this.stylep.textContent = `
            *{
                font-family: cursive;
            }

            .Ccard{
                display: grid;
                grid-template-columns: repeat(auto-fit,minmax(225px, 1fr));
                gap: 10px;
            }

            .tj{
                box-sizing: border-box;
                background-color: sandybrown;
                padding: 20px;
                border: 1px solid black;
                border-radius: 30px;
                width: fit-content;
                color: white;
                text-shadow: -1px -1px 2px black;
                height: fit-content;
            }

            .divbtnc button,
            .tj button,
            .formulario input,
            .formulario button {
                border: 1px solid black;
                border-radius: 30px;
                padding: 10px;
            }

            .formulario{
                display: flex;
                justify-content: center;
            }

            .formulario form {
                background-color: black;
                color: white;
                border: 1px solid white;
                text-shadow: -1px -1px 2px lime;
                border-radius: 30px;
                padding: 20px;
                width: 40%;
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            .formulario button:hover{
                background-color: black;
                color: lime;
                border: 1px solid lime;
            }

            .tj img{
                width: 200px;
                border: 1px solid black;
                border-radius: 30px;
            }

            .divbtnc{
                grid-column: 1/-1;
            }

            .tj button:hover{
                background-color: black;
                text-shadow: -1px -1px 3px red;
                color: white;
                font-weight: bold;
                border: 1px solid red;
            }

            .divbtnc {
                display: flex;
                justify-content: center;
            }

            button{
                cursor: pointer;
            }

        `;

        this.shadowRoot.appendChild(this.stylep);
    }
}

window.customElements.define('card-generator',Generator);