let inventarioVisible = false;

const inventario = [
    {id:1, nombre: "Camiseta", cantidad: 50, precio: 15},
    {id:2, nombre: "Pantalon", cantidad: 30, precio: 30},
    {id:3, nombre: "Zapatos",  cantidad: 20, precio: 50}
];

//PARTE 1- AGREGAR PRODUCTO
function agregarProducto() {
    // Se obtienen los valores ingresados en los campos del formulario
    const nuevoProductoNombre = document.getElementById('nuevoProducto').value;
    const nuevoProductoCantidad = parseInt(document.getElementById('cantidadProducto').value);
    const nuevoProductoPrecio = parseFloat(document.getElementById('precioProducto').value);

    if (nuevoProductoNombre === '' || isNaN(nuevoProductoCantidad) || isNaN(nuevoProductoPrecio) || nuevoProductoCantidad <= 0 || nuevoProductoPrecio < 0) {
        alert('Por favor, complete todos los campos con valores válidos mayores o iguales a 0.');
        return;
    }

    // Se crea nuevo objeto
    const nuevoProducto = { nombre: nuevoProductoNombre, cantidad: nuevoProductoCantidad, precio: nuevoProductoPrecio };

    // Se agrega el nuevo producto al inventario
    inventario.push(nuevoProducto);

    mostrarInventario();

    document.getElementById('nuevoProducto').value = '';
    document.getElementById('cantidadProducto').value = '';
    document.getElementById('precioProducto').value = '';
}

//PARTE 2 -- ACTUALIZAR INVENTARIO
function actualizarInventario() {
    
    const nombreProducto = document.getElementById('actualizarNombre').value;
    const cantidadProducto = parseInt(document.getElementById('actualizarCantidad').value);
    const precioProducto = parseFloat(document.getElementById('actualizarPrecio').value);

    if (cantidadProducto < 0 || precioProducto < 0) {
        alert('Por favor, ingrese valores válidos mayores o iguales a 0.');
        return;
    }

    // Busca un producto en el inventario con el nombre coincidente
    const productoExistente = inventario.find(producto => producto.nombre === nombreProducto);

    // Si se encontró un producto con el nombre coincidente, actualiza su cantidad y precio
    if (productoExistente) {
        productoExistente.cantidad = cantidadProducto;
        productoExistente.precio = precioProducto;
        productoExistente.cantidad *= 1.1; // Aumenta la cantidad en un 10%
    } else {
        // Si no se encontró, agrega un nuevo producto al inventario
        const nuevoProducto = { nombre: nombreProducto, cantidad: cantidadProducto, precio: precioProducto };
        inventario.push(nuevoProducto);
    }

    document.getElementById('actualizarNombre').value = '';
    document.getElementById('actualizarCantidad').value = '';
    document.getElementById('actualizarPrecio').value = '';

    mostrarInventario();
}

//PARTE 3 -- BUSCAR PRODUCTO
function buscarProducto() {

    // Se obtiene el valor ingresado en el campo de búsqueda
    const nombreProductoABuscar = document.getElementById('buscarProductoInput').value;

    const productoEncontrado = inventario.find(producto => producto.nombre === nombreProductoABuscar);

    const resultadoBusquedaElement = document.getElementById('resultadoBusqueda');

    // Si se encontró un producto, muestra sus datos
    if (productoEncontrado) {
        resultadoBusquedaElement.textContent = `Nombre: ${productoEncontrado.nombre}, Cantidad: ${productoEncontrado.cantidad}, Precio: $${productoEncontrado.precio}`;
    } else {
        resultadoBusquedaElement.textContent = 'Producto no encontrado';
    }

    document.getElementById('buscarProductoInput').value = '';
}

//PARTE 4 -- ELIMINAR PRODUCTO
function eliminarProductos() {
   
    const precioAEliminar = parseFloat(document.getElementById('eliminarPrecio').value);

    if (precioAEliminar < 0) {
        alert('Por favor, ingrese un valor válido mayor o igual a 0 en el campo de precio a eliminar.');
        return;
    }

    // Itera sobre el inventario y elimina los productos con precio mayor al ingresado
    for (let i = inventario.length - 1; i >= 0; i--) {
        if (inventario[i].precio > precioAEliminar) {
            inventario.splice(i, 1);
        }
    }

    mostrarInventario();

    document.getElementById('eliminarPrecio').value = '';
}

//PARTE 5 -- RESUMEN DEL INVENTARIO
function mostrarInventario() {
    
    const inventarioList = document.getElementById('inventarioList');
    const totalInventarioElement = document.getElementById('totalInventario'); 
    
    inventarioList.innerHTML = '';

    // Calcula el total del inventario
    let totalInventario = 0;

    inventario.forEach(producto => {
        const { nombre, cantidad, precio } = producto;
        const productoItem = document.createElement('li');
        productoItem.textContent = `Nombre: ${nombre}, Cantidad: ${cantidad}, Precio: $${precio}`;
        inventarioList.appendChild(productoItem);

        // Actualiza el total del inventario
        totalInventario += cantidad * precio;
    });

    // Muestra el total del inventario
    totalInventarioElement.textContent = `Total del inventario: $${totalInventario}`;

     if (!inventarioVisible) {
        inventarioList.style.display = 'block'; 
        totalInventarioElement.style.display = 'block'; 
    } else {
        inventarioList.style.display = 'none'; 
        totalInventarioElement.style.display = 'none'; 
    }

    inventarioVisible = !inventarioVisible;
}






