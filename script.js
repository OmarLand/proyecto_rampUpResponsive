
//Inicializo mi pagina y haré las llamadas acá de las funciones necesarias
window.onload = function(){

    console.log( "Lienzo preparado bro!" );
    prepareButtonCheck();

}

// Acá añado funciones al botón de Evaluar las letras
function prepareButtonCheck(){
    
    // Script que me permite reemplazar los guiones por letras existentes
    String.prototype.replaceAt = function ( index, character ) {
        return this.substring(0, index) + character + this.substring(index+character.length); 
        //Ejemplo animalSecret = animalSecret,replaceAt(i*2, letra) 
    }
    
    // Inicializo el Array que contiene los animales del juego
    const animals = [ "perro", "gato", "raton", "elefante", "jirafa", "pajaro", "caballo", "cerdo", "tortuga", "leon" ];
    const animal = animals[Math.floor(Math.random()*animals.length ) ];
    let animalSecret =  animal.replace(/./g, "_ ");
    let failsCounter = 0;
   
    //Muestra en pantalla el animal elegido al azar - Lo comento por mientras
    //alert( animal + " - " + animalSecret );

    // Muestro al cargar la pagina las lineas como pista del animal Secreto
    document.querySelector('#animalRevealed').innerHTML = animalSecret;
    document.querySelector('#btn-check').addEventListener('click', () => {
      
        const letter = document.querySelector('#letter').value;
        // alert("Esto funciona");
        let fails = true;

        for ( let i = 0; i < animal.length; i++ ){
            if( letter == animal[i] ){
                animalSecret = animalSecret.replaceAt( i*2, letter );
                fails = false;
                // alert(animal);
            }
        }

        // En cada fallo pongo una imagen distinta del ahorcado hasta llegar al 5 que ha perdido
        if ( fails ){
            
            failsCounter++;
            
            switch( failsCounter ) {
                case 1:
                    let try1 = document.querySelector('#image');
                    try1.innerHTML = '<img src="./img/0.png" style="width: 75%; margin-top: 45px" ></img>';
                    
                break;
                case 2:
                    let try2 = document.querySelector('#image');
                    try2.innerHTML = '<img src="./img/1.png" style="width: 75%; margin-top: 45px" ></img>';
                    
                break;
                case 3:
                    let try3 = document.querySelector('#image');
                    try3.innerHTML = '<img src="./img/2.png" style="width: 75%; margin-top: 45px" ></img>';
                    
                break;
                case 4:
                    let try4 = document.querySelector('#image');
                    try4.innerHTML = '<img src="./img/3.png" style="width: 75%; margin-top: 45px" ></img>';
                    
                break;
                case 5:
                    let try5 = document.querySelector('#image');
                    try5.innerHTML = '<img src="./img/4.png" style="width: 75%; margin-top: 45px" ></img>';
                    
                break;
                 
            }

            // Cuando llego al fallo 4 muestro mensaje Has perdido
            if( failsCounter === 5 ){
                alert("Has pedido el juego.");
            }
            
        } else {
            //Evaluo si es que no existe ya guiones es porque he ganado
            if( animalSecret.indexOf("_") < 0 ){
                alert("¡Ehnorabuena has ganado!");
            }
        }

        //Voy mostrando las letras atinadas junto los guiones faltantes
        document.querySelector('#animalRevealed').innerHTML = animalSecret.toUpperCase();
       
        // Acá por cada ingreso reseteo el valor del campo Letter con value "" y focalizo el teclado alli focus
        document.querySelector("#letter").value = ""; // Seteo a Empty el campo texto
        document.querySelector("#letter").focus();    // Enfoco luego del intento para ingresar otro valor
    });

}

