
    const reCarnet  = /^[A-Z]{2}\d{3}$/;                                   
    const reNombre  = /^[\p{L}]+(?:\s+[\p{L}]+)+$/u;                        
    const reDUI     = /^\d{8}-\d$/;                                         
    const reNIT     = /^\d{4}-\d{6}-\d{3}-\d$/;                              
    const reFecha   = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/; 
    const reCorreo  = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;                      
    const reEdad    = /^\d+$/;                                              

    const f = {
      carnet: document.getElementById('carnet'),
      nombre: document.getElementById('nombre'),
      dui:    document.getElementById('dui'),
      nit:    document.getElementById('nit'),
      fecha:  document.getElementById('fecha'),
      correo: document.getElementById('correo'),
      edad:   document.getElementById('edad'),
    };

    function marcar(input, ok) {
      input.classList.toggle('is-valid', ok);
      input.classList.toggle('is-invalid', !ok);
    }

    function vCarnet(){   marcar(f.carnet, reCarnet.test(f.carnet.value.trim().toUpperCase())); }
    function vNombre(){   marcar(f.nombre, reNombre.test(f.nombre.value.trim())); }
    function vDUI(){      marcar(f.dui,    reDUI.test(f.dui.value.trim())); }
    function vNIT(){      marcar(f.nit,    reNIT.test(f.nit.value.trim())); }
    function vFecha(){    marcar(f.fecha,  reFecha.test(f.fecha.value.trim())); }
    function vCorreo(){   marcar(f.correo, reCorreo.test(f.correo.value.trim())); }
    function vEdad(){
      const ok = reEdad.test(f.edad.value.trim());
      if(!ok){ return marcar(f.edad,false); }
      const n = parseInt(f.edad.value,10);
      marcar(f.edad, n>=1 && n<=120);
    }

    f.carnet.addEventListener('input', vCarnet);
    f.nombre.addEventListener('input', vNombre);
    f.dui.addEventListener('input', vDUI);
    f.nit.addEventListener('input', vNIT);
    f.fecha.addEventListener('input', vFecha);
    f.correo.addEventListener('input', vCorreo);
    f.edad.addEventListener('input', vEdad);

    document.getElementById('formEst').addEventListener('submit', (e)=>{
      e.preventDefault();
      vCarnet(); vNombre(); vDUI(); vNIT(); vFecha(); vCorreo(); vEdad();

      const todoOk = document.querySelectorAll('.is-invalid').length === 0 &&
                     Object.values(f).every(el => el.value.trim() !== '');

      const out = document.getElementById('salida');
      if (todoOk) {
        out.textContent =
`✔ Datos válidos:
Carnet: ${f.carnet.value}
Nombre: ${f.nombre.value}
DUI: ${f.dui.value}
NIT: ${f.nit.value}
Fecha: ${f.fecha.value}
Correo: ${f.correo.value}
Edad: ${f.edad.value}`;
      } else {
        out.textContent = '⚠ Revise los campos marcados en rojo.';
      }
    });
    
    document.getElementById('btnLimpiar').addEventListener('click', ()=>{
      Object.values(f).forEach(el => el.classList.remove('is-valid','is-invalid'));
      document.getElementById('salida').textContent = '';
    });