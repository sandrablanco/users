// console.log("script.js funciona");//comprobamos que esta enganchado el script en la consola

// const listaUsuarios = document.getElementById('listaUsuarios');
// console.log(document.getElementById("listaUsuarios"));
// listaUsuarios.innerHTML = "<li> script funciona </li>";
//  console.log("listaUsuarios =", listaUsuarios);

// const obtenerUsuarios2 = () => {
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then(response => response.json())
//     .then(usuarios => {
//         const UsuariosModificados = usuarios.map(usuario => {
//             const edad = Math.floor(Math.random() * 60) + 18; // edad aleatoria 18-77
//             const img = `./assets/img/${usuario.id}.jpeg`;
//             const { street, suite, city } = usuario.address;
//             return {
//                 ...usuario,
//                 edad,
//                 img,
//                 direccionCompleta: `${street}, ${suite}, ${city}`
//             };
//         });
//         muestraUsuarios(UsuariosModificados);
//     })
//      .catch(error => {
//             console.log("Error:", error);
//         });
// }
document.addEventListener("DOMContentLoaded", () => { //el DOM carga, ul existe y no da error 
// espera a que el navegador haya cargado todo el html y luego ejecuta el script
    const listaUsuarios = document.getElementById("listaUsuarios");

    fetch("https://jsonplaceholder.typicode.com/users") //pedimos usuarios a la API fetch
        .then(res => res.json()) //respuesta de array de objetos json->javascript
        .then(usuarios => { //recibe los usuarios y los procesa. Nuevo array con map y spread
            const usuariosModificados = usuarios.map(usuario => {

                const edad = Math.floor(Math.random() * (60 - 18) + 18);//edad 18-60
                const img = `./assets/img/${usuario.id}.jpeg`;

                const { street, suite, city } = usuario.address; //destructuring 

                return {                                          //spread operator copia resto del array
                    ...usuario,                                   //y modifica img, edad y direccion
                    age: edad,
                    img,
                    address: `${street}, ${suite}, ${city}`
                };
            });

            mostrarUsuarios(usuariosModificados);//crea un array nuevo sin tocar el original
        })
        .catch(err => console.error("Error:", err));

    function mostrarUsuarios(lista) {   //crea tarjetas en el DOM 
        listaUsuarios.innerHTML = ""; //limpia lista antes de llenarla

        lista.forEach(usuario => {
            const li = document.createElement("li");
            li.classList.add("tarjeta");

            li.innerHTML = `
                <div class="contenido">
                    <p><strong>Nombre:</strong> ${usuario.name}</p>
                    <p><strong>Edad:</strong> ${usuario.age}</p>
                    <p><strong>Username:</strong> ${usuario.username}</p>
                    <p><strong>Teléfono:</strong> ${usuario.phone}</p>
                    <p><strong>Email:</strong> ${usuario.email}</p>

                    <p><strong>Compañía:</strong> ${usuario.company.name}</p>
                    <p><strong>Dirección:</strong> ${usuario.address}</p>
                </div>

                <div class="foto">
                    <img src="${usuario.img}" alt="${usuario.name}">
                </div>
            `;

            listaUsuarios.appendChild(li);
        });
    }

});