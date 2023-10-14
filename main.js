window.onload = function() {
  loadMenu();
  setInterval(loadMenu, 60000);
};

function loadMenu() {
  var url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRnWzywz5HkLN2JtoNlOTp3l7JTqk0ps9VoS6n9bNsjj5V-S8ZqSp8KmZyDxhDfMgwBdWdU-jncoWEw/pub?output=csv";
  fetch(url)
    .then(response => response.text())
    .then(data => {
      var lines = data.split("\n");
      var items = [];
      lines.forEach((line, index) => {
        if(index !== 0) {
          var cells = line.split(",");
          items.push({
            categoria: cells[0],
            plato: cells[1],
            valor: cells[2],
            imagen: cells[3],
            descripcion: cells[4]
          });
        }
      });
      renderCategories(items);
    });
}

function renderCategories(items) {
  var categoryContainer = document.getElementById('categoryContainer');
  var uniqueCategories = [...new Set(items.map(item => item.categoria))];
  categoryContainer.innerHTML = '';
  uniqueCategories.forEach(category => {
    var categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');
    categoryDiv.addEventListener('click', () => showMenuByCategory(items, category));
    
    var img = document.createElement('img');
    img.src = items.find(item => item.categoria === category).imagen;
    categoryDiv.appendChild(img);

    var categoryLabel = document.createElement('p');
    categoryLabel.textContent = category;
    categoryLabel.classList.add('category-label');
    categoryDiv.appendChild(categoryLabel);
    categoryContainer.appendChild(categoryDiv);
  });
}

function showMenuByCategory(items, category) {
  var filteredItems = items.filter(item => item.categoria === category);
  var menuDiv = document.getElementById('menu');
  menuDiv.innerHTML = '';
  filteredItems.forEach(item => {
    var itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    var img = document.createElement('img');
    img.src = item.imagen;
    itemDiv.appendChild(img);
    var plato = document.createElement('h2');
    plato.textContent = item.plato;
    itemDiv.appendChild(plato);
    var descripcion = document.createElement('p');
    descripcion.textContent = item.descripcion;
    itemDiv.appendChild(descripcion);
    var valor = document.createElement('p');
    valor.textContent = "$" + item.valor;
    itemDiv.appendChild(valor);
    menuDiv.appendChild(itemDiv);
  });

  document.getElementById('menu').style.display = 'block';
  document.getElementById('categoryContainer').style.display = 'none';
  document.getElementById('welcome-section').style.display = 'none';
  document.getElementById('backButton').style.display = 'block';
  
  document.getElementById('backButton').onclick = function() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('categoryContainer').style.display = 'block';
    document.getElementById('welcome-section').style.display = 'block';
    document.getElementById('backButton').style.display = 'none';
  };
}

