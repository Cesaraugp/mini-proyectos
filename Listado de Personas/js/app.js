const personas = [
  new Persona("Juan", "Perez"),
  new Persona("Karla", "Ramirez"),
  new Persona("Pedro", "Navaja"),
];

function mostrarPersonas() {
  const personasList = document.getElementById("personas");
  if (personasList.hasChildNodes()) personasList.innerHTML = "";
  personas.forEach((persona) => {
    let el = document.createElement("li");
    (el.innerHTML = persona.nombre + " " + persona.apellido),
      personasList.appendChild(el);
  });
}

function agregarPersona() {
  let newPersona;
  const formulario = document.forms["formulario"];
  let nombre = formulario["Nombre"].value;
  let apellido = formulario["Apellido"].value;
  if (!nombre || !apellido) {
    console.log("No hay información que agregar");
    return;
  }
  newPersona = new Persona(nombre, apellido);
  personas.push(newPersona);
  mostrarPersonas();
}
