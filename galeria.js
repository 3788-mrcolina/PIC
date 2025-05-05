const body = document.body;
let arrayImagenes = [
    { url: 'https://static.wikia.nocookie.net/dragonball/images/9/9a/Son_Gohan_en_Super_Hero.png/revision/latest?cb=20211227034049&path-prefix=es', descripcion: 'Gohan' },
    { url: 'https://static.wikia.nocookie.net/dragonball/images/7/75/Son_Goten_en_Super_Hero.png/revision/latest?cb=20220301231928&path-prefix=es', descripcion: 'Goten' },
    { url: 'https://static.wikia.nocookie.net/dragonball/images/e/e2/Trunks_en_Super_Hero.png/revision/latest?cb=20220301231321&path-prefix=es', descripcion: 'Trunks' },
    { url: 'https://static.wikia.nocookie.net/dragonball/images/1/14/Vegeta_en_Super_Hero.png/revision/latest?cb=20220119211034&path-prefix=es', descripcion: 'Vegeta' },
    { url: 'https://static.wikia.nocookie.net/dragonball/images/c/c0/Son_Goku_en_Super_Hero.png/revision/latest?cb=20220302091733&path-prefix=es', descripcion: 'Goku' },
    { url: 'https://static.wikia.nocookie.net/dragonball/images/1/11/Bulma_en_Super_Hero.png/revision/latest?cb=20220302000533&path-prefix=es', descripcion: 'Bulma' },
    { url: 'https://static.wikia.nocookie.net/dragonball/images/9/97/Mr_Satan_DBSuper.png/revision/latest?cb=20161112215303&path-prefix=es', descripcion: 'Mr. Satan' }
];

const mainContainer = document.createElement('div');

const createStyle = () => {
    const style = document.createElement('style');
    style.textContent = `
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(to right, #e0eafc, #cfdef3);
            margin: 0;
            padding: 40px;
        }

        header, footer {
            background-color: #f1f1f1;
            padding: 1rem;
            text-align: center;
            font-weight: bold;
            font-size: 1.2rem;
        }

        button {
            padding: 10px 20px;
            background-color: #007acc;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }


        img:hover {
            transform: scale(1.1);
            transition: transform 0.3s ease-in-out;
        }

        .contenedor {
            display: grid;
            grid-template-columns: 1fr 3fr;
        }

        .barra-lateral {
            border-right: 1px solid gray;
            padding: 1rem;
        }

        .galeria {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            padding: 1rem;
        }

        .tarjeta {
            border: 1px solid #ccc;
            padding: 10px;
            width: 150px;
            text-align: center;
            background-color: #fff;
            border-radius: 8px;
            
        }

        .tarjeta img {
            width: 100%;
            border-radius: 5px;
        }

        .formulario {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 2rem;
            max-width: 400px;
            margin: auto;
        }

        .formulario label {
            font-weight: bold;
            margin-bottom: 0.25rem;
        }

        .formulario input {
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 100%;
        }

    `;
    document.head.appendChild(style);
};

const createLayoutGaleria = () => {
    mainContainer.innerHTML = '';
    
    // Elimina headers y footers anteriores
    document.querySelectorAll('header, footer').forEach(el => el.remove());
    
    const contenedor = document.createElement('div');
    contenedor.className = 'contenedor';

    // Header
    const encabezado = document.createElement('header');
    const titulo = document.createElement('h1');
    titulo.textContent = 'GALERÍA DE FOTOS';
    encabezado.appendChild(titulo);
    encabezado.append('Programación Integrativa de Componentes Web');
    body.appendChild(encabezado);
    body.appendChild(mainContainer);

    // Sidebar
    const barraLateral = document.createElement('div');
    barraLateral.className = 'barra-lateral';

    const botonRegistrar = document.createElement('button');
    botonRegistrar.textContent = 'Registrar Nueva Foto';
    botonRegistrar.addEventListener('click', createLayoutFormulario);
    barraLateral.appendChild(botonRegistrar);

    // Galería
    const galeria = document.createElement('div');
    galeria.className = 'galeria';

    arrayImagenes.forEach(({ url, descripcion }) => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta';

        const img = document.createElement('img');
        img.src = url;
        img.alt = descripcion;

        const desc = document.createElement('p');
        desc.textContent = descripcion;

        tarjeta.appendChild(img);
        tarjeta.appendChild(desc);
        galeria.appendChild(tarjeta);
    });

    contenedor.appendChild(barraLateral);
    contenedor.appendChild(galeria);
    mainContainer.appendChild(contenedor);

    // Footer
    const pie = document.createElement('footer');
    pie.textContent = 'Mateo Colina - Footer';
    body.appendChild(pie);
};

const createLayoutFormulario = () => {
    mainContainer.innerHTML = '';

    const formulario = document.createElement('form');
    formulario.className = 'formulario';

    const campos = [
        { label: 'URL', type: 'text', id: 'url' },
        { label: 'Descripción', type: 'text', id: 'descripcion' }
    ];

    campos.forEach(({ label, type, id }) => {
        const fieldWrapper = document.createElement('div');

        const labelElement = document.createElement('label');
        labelElement.textContent = label;
        labelElement.htmlFor = id;

        const inputElement = document.createElement('input');
        inputElement.type = type;
        inputElement.id = id;
        inputElement.required = true;

        fieldWrapper.appendChild(labelElement);
        fieldWrapper.appendChild(inputElement);
        formulario.appendChild(fieldWrapper);
    });

    const enviarBtn = document.createElement('button');
    enviarBtn.type = 'submit';
    enviarBtn.textContent = 'Agregar Foto';
    formulario.appendChild(enviarBtn);

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const url = formulario.querySelector('#url').value.trim();
        const descripcion = formulario.querySelector('#descripcion').value.trim();

        if (!url) {
            alert('La URL no puede estar vacía');
            return;
        }

        if (descripcion.length < 3) {
            alert('La descripción debe tener al menos 3 caracteres');
            return;
        }

        arrayImagenes.push({ url, descripcion });
        createLayoutGaleria(); // Redirige a la galería
    });

    mainContainer.appendChild(formulario);
};

createStyle(); 
createLayoutGaleria(); 
