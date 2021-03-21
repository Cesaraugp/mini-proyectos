function sumar() {
  const form = document.forms["formulario"];
  let opAValue = parseInt(form["opA"].value);
  let opBValue = parseInt(form["opB"].value);
  if (isNaN(opAValue) || isNaN(opBValue)) {
    let campo = isNaN(opAValue) ? form["opA"] : form["opB"];
    alert(`El campo: "${campo.placeholder}" está vacío`);
    return;
  }
  document.getElementById("resultado").innerHTML = `Resultado: ${
    opAValue + opBValue
  }`;
}
