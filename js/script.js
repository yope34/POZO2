const btnCarrito = document.querySelector('.container-cart-icon')
const containerCarrito = document.querySelector('.container-carrito')

btnCarrito.addEventListener('click', () => {
   containerCarrito.classList.toggle('hidden-carrito')
})


const carritoInfo = document.querySelector('.carrito-producto')
const rowProducto = document.querySelector('.row-producto')

const productLista = document.querySelector('.container-items')

//variable para la lista de productos
let allProduct = []

const valorTotal = document.querySelector('.total-pagar')
const countProducts = document.querySelector('#contador')

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.carrito-total');

productLista.addEventListener('click', e => {

   if (e.target.classList.contains('btn-add')) {
      const product = e.target.parentElement;

      const infoProduct = {
         cantidad: 1,
         titulo: product.querySelector('h2').textContent,
         precio: product.querySelector('p').textContent,
      };

      const exits = allProduct.some(
         product => product.titulo === infoProduct.titulo
      );

      if (exits) {
         const products = allProduct.map(product => {
            if (product.titulo === infoProduct.titulo) {
               product.cantidad++;
               return product;
            }
            else {
               return product;
            }
         });
         allProduct = [...products];
      }
      else {
         allProduct = [...allProduct, infoProduct];
      }
      showHTML();
   }
});

rowProducto.addEventListener('click', e => {
	if (e.target.classList.contains('icono-close')) {
		const product = e.target.parentElement;
      const titulo = product.querySelector('p').textContent;

      const updatedProducts = allProduct.map(item => {
         if (item.titulo === titulo) {
            if (item.cantidad > 1) {
               item.cantidad--;
            } else {
               return null;
            }
         }
         return item;
      });
      allProduct = updatedProducts.filter(item => item !== null);

      showHTML();
	}
});

//HTML
const showHTML = () => {

   if (!allProduct.length) {
		cartEmpty.classList.remove('hidden');
		rowProducto.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} 
   else {
		cartEmpty.classList.add('hidden');
		rowProducto.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}


   //Limpiar
   rowProducto.innerHTML = '';

   let total = 0;
   let totalProducts = 0;
   allProduct.forEach(product => {
      const containerProduct = document.createElement('div');
      containerProduct.classList.add('carrito-producto');

      containerProduct.innerHTML = `
         <div class="info-carrito">
            <span class="cantidad-producto">${product.cantidad}</span>
            <p class="titulo-producto">${product.titulo}</p>
            <span class="precio-producto">${product.precio}</span>
         </div>
         <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="1.5"
            stroke="currentColor" 
            class="icono-close"
            >
            <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            d="M6 18L18 6M6 6l12 12" 
            />
         </svg>
   `;
      rowProducto.append(containerProduct);
      total = total + parseFloat(product.cantidad * product.precio.slice(2))
      totalProducts = totalProducts + product.cantidad;
   });

   valorTotal.innerHTML = `S/${total.toFixed(2)}`;
   countProducts.innerText = totalProducts;
   document.getElementById("total-modal").innerText = `Total: S/${total.toFixed(2)}`;
};

 
 
