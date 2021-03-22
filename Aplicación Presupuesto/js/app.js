const ingresos = [new Ingreso("Salario", 2530), new Ingreso("Venta", 1000)];
const egresos = [
  new Egreso("Consulta Médica", 3000),
  new Egreso("Salida Familiar", 250),
];

const cargarApp = () => {
  let total = cargarCabecero();
  cargarIngresosyEgresos(total);
};

const cargarCabecero = () => {
  let totalIngresos = 0;
  let totalEgresos = 0;
  ingresos.forEach((el) => {
    totalIngresos += el.valor;
  });

  egresos.forEach((el) => {
    totalEgresos += el.valor;
  });

  console.log(totalIngresos);
  console.log(totalEgresos);

  let totalPresupuesto = totalIngresos - totalEgresos;
  let porcentajeEgreso = totalEgresos / totalIngresos;
  console.log(porcentajeEgreso);

  const presupuesto = document.getElementById("presupuesto");
  const ingreso = document.getElementById("ingresos");
  const egreso = document.getElementById("egresos");
  const porcentaje = document.getElementById("porcentaje");
  presupuesto.innerHTML = formatoMoneda(totalPresupuesto);
  ingreso.innerHTML = formatoMoneda(totalIngresos);
  egreso.innerHTML = formatoMoneda(totalEgresos);
  porcentaje.innerHTML = formatoPorcentaje(porcentajeEgreso);
  return totalEgresos;
};
const formatoMoneda = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
};
const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

const cargarIngresosyEgresos = (totalEgresos) => {
  let ingresosHTML = "";
  let egresosHTML = "";
  for (let ingreso of ingresos) {
    ingresosHTML += crearHTML(ingreso, true);
  }
  for (let egreso of egresos) {
    egresosHTML += crearHTML(egreso, false, totalEgresos);
  }

  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
  document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

const crearHTML = (el, isIngreso, total = 0) => {
  let html;
  const valor = el.valor;
  const descripcion = el.descripcion;
  if (isIngreso) {
    html = `
    <div class="elemento limpiarEstilos">
      <div class="elemento_descripcion">${descripcion}</div>
      <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+${formatoMoneda(valor)}</div>
        <div class="elemento_eliminar">
          <button class="elemento_eliminar--btn">
            <ion-icon name="close-circle-outline" onclick="eliminarObjeto(${
              el.id
            },true)"></ion-icon>
          </button>
        </div>
      </div>
    </div>`;
  } else {
    html = `<div class="elemento limpiarEstilos">
      <div class="elemento_descripcion">${descripcion}</div>
      <div class="derecha limpiarEstilos">
        <div class="elemento_valor">-${formatoMoneda(valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(
          valor / total
        )}</div>
        <div class="elemento_eliminar">
          <button class="elemento_eliminar--btn" onclick="">
            <ion-icon name="close-circle-outline" onclick="eliminarObjeto(${
              el.id
            })"></ion-icon>
          </button>
        </div>
      </div>
    </div>`;
  }
  return html;
};

const eliminarObjeto = (id, isIngreso = false) => {
  let indiceAEliminar;
  console.log(ingresos);
  if (isIngreso) {
    indiceAEliminar = ingresos.findIndex((ingreso) => ingreso.id === id);
    ingresos.splice(indiceAEliminar, 1);
  } else {
    indiceAEliminar = egresos.findIndex((egreso) => egreso.id === id);
    egresos.splice(indiceAEliminar, 1);
  }
  cargarApp();
};

const agregarDato = () => {
  let nuevoEl;
  const form = document.forms["forma"];
  let tipo = form["tipo"].value;
  let valor = +form["valor"].value;
  let descripcion = form["descripcion"].value;
  let isIngreso = tipo == "ingreso";
  if (descripcion)
    if (isIngreso) {
      ingresos.push(new Ingreso(descripcion, valor));
    } else {
      egresos.push(new Egreso(descripcion, valor));
    }
  form["valor"].value = "";
  form["descripcion"].value = "";
  cargarApp();
};
