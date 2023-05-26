window.onload = function() {
  loadMenu();
  setInterval(loadMenu, 60000);
}

function loadMenu() {
  var url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTGKfAR1DekA5EDxZ7aQGAfVihvRTMuKPXIKsjdpl6XbXA9a2er23XADZVg3faeof2Ixo9_wwzztQ65/pub?output=csv";
  
  fetch(url)
    .then(response => response.text())
    .then(data => {
      var lines = data.split("\n");
      var items = [];
      lines.forEach((line, index) => {
        if(index !== 0) { // Ignoramos la primera línea que contiene los encabezados
          var cells = line.split(",");
          items.push({
            categoria: cells[0],
            plato: cells[1],
            valor: cells[2],
            imagen: cells[3],
            descripcion: cells[4] // Añadimos la descripción aquí
          });
        }
      });
      renderItems(items);
    });
}

function renderItems(items) {
  var menuDiv = document.getElementById('menu');
  menuDiv.innerHTML = ''; // Limpiar el contenido existente

  items.forEach(item => {
    var itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    var img = document.createElement('img');
    img.src = item.imagen;
    itemDiv.appendChild(img);

    var categoria = document.createElement('p');
    categoria.textContent = item.categoria;
    itemDiv.appendChild(categoria);

    var plato = document.createElement('h2'); // Hago que el nombre del plato sea un poco más destacado
    plato.textContent = item.plato;
    itemDiv.appendChild(plato);

    var descripcion = document.createElement('p'); // Añadimos la descripción aquí
    descripcion.textContent = item.descripcion;
    itemDiv.appendChild(descripcion);

    var valor = document.createElement('p');
    valor.textContent = "$" + item.valor;
    itemDiv.appendChild(valor);

    menuDiv.appendChild(itemDiv);
  });
}
