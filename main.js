// Este código se ejecutará una vez que la ventana del navegador se haya cargado completamente.
window.onload = function() {
  // Carga el menú inmediatamente después de que la ventana se haya cargado.
  loadMenu();

  // Configura un temporizador para volver a cargar el menú cada 60 segundos (60000 milisegundos).
  setInterval(loadMenu, 60000);
};

// La función loadMenu se encarga de buscar los datos del menú de la hoja de Google Sheets y procesarlos.
function loadMenu() {
  // URL del documento de Google Sheets publicado como CSV.
  var url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTGKfAR1DekA5EDxZ7aQGAfVihvRTMuKPXIKsjdpl6XbXA9a2er23XADZVg3faeof2Ixo9_wwzztQ65/pub?output=csv";
  
  // Usa fetch para obtener los datos de la URL.
  fetch(url)
    .then(response => response.text()) // Convierte la respuesta en texto.
    .then(data => {
      var lines = data.split("\n"); // Divide los datos de texto en líneas.
      var items = [];

      // Itera a través de cada línea, ignorando la primera línea (la cabecera).
      lines.forEach((line, index) => {
        if(index !== 0) {
          var cells = line.split(","); // Divide cada línea en celdas basándose en la coma.
          // Empuja cada fila de datos en la matriz de artículos como un objeto.
          items.push({
            categoria: cells[0],
            plato: cells[1],
            valor: cells[2],
            imagen: cells[5],
            descripcion: cells[4] // Añadimos la descripción aquí
          });
        }
      });
      // Envía los elementos a la función renderItems para que sean visualizados.
      renderItems(items);
    });
}

// La función renderItems toma los elementos del menú y los visualiza en el DOM.
function renderItems(items) {
  // Selecciona el elemento del menú del DOM.
  var menuDiv = document.getElementById('menu');
  menuDiv.innerHTML = ''; // Limpiar el contenido existente

  // Itera sobre cada elemento.
  items.forEach(item => {
    // Crea y configura los elementos del DOM para cada propiedad del elemento.
    var itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    var img = document.createElement('img');
    img.src = item.imagen;
    itemDiv.appendChild(img);

    var categoria = document.createElement('p');
    categoria.textContent = item.categoria;
    itemDiv.appendChild(categoria);

    var plato = document.createElement('h2');
    plato.textContent = item.plato;
    itemDiv.appendChild(plato);

    var descripcion = document.createElement('p');
    descripcion.textContent = item.descripcion;
    itemDiv.appendChild(descripcion);

    var valor = document.createElement('p');
    valor.textContent = "$" + item.valor;
    itemDiv.appendChild(valor);

    // Agrega el elemento a la lista en el DOM.
    menuDiv.appendChild(itemDiv);
  });
}
