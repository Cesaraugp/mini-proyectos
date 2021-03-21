const mostrarFecha=()=>{
    const fecha= new Date;
    let h= formatoHora(fecha.getHours());
    let m= formatoHora(fecha.getMinutes());
    let s= formatoHora(fecha.getSeconds());
    const meses=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    const dias=['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];

    let date=`${dias[fecha.getDay()]}, ${fecha.getDate()} de ${meses[fecha.getUTCMonth()]} del ${fecha.getFullYear()} `;
    
    return [date,`${h}:${m}:${s}`]
    
}
const formatoHora=(hora)=>{
 if (hora<10){
     hora='0' + hora;
 }
 return hora;
}

const actualizarHora= ()=>{
    const hora= document.getElementById('hora');
    const fecha=document.getElementById('fecha');
    let fechaYHora= mostrarFecha();
    if (fecha.innerHTML!==fechaYHora[0]) fecha.innerHTML = fechaYHora[0];
    hora.innerHTML=fechaYHora[1];
}

setInterval(actualizarHora, 1000);