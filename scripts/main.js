const retocards = document.querySelector('.retocards');
const retocardsArray = document.querySelectorAll('.retocard');
let counter = 0;
let intervalTime = 6000; 
let autoSlide;

// Función para actualizar la posición del carrusel
function updateCarousel() {
    const cardWidth = retocardsArray[0].clientWidth; // Ancho de una tarjeta
  retocards.style.transform = `translateX(${-counter * cardWidth}px)`; // Mover el carrusel
}

// Función para determinar cuántas tarjetas saltar según el ancho de la pantalla, 3 en desktop, 2 en tablet y 1 en mobile
function getCardsToSkip() {
  if (innerWidth > 1250) {
    return 3; 
  } else if (innerWidth > 800 && innerWidth <= 1250) {
    return 2; 
  } else {
    return 1;
  }
}

// Para que las cards se muevan automáticamente
function autoNextSlide() {
  const cardsToSkip = getCardsToSkip();
  counter = (counter + cardsToSkip) % retocardsArray.length; 
  updateCarousel();
}


function startAutoSlide() {
  autoSlide = setInterval(autoNextSlide, intervalTime);
}

// Para detener y reanudar el movimiento automático cuando se usen los botones y después de usarlos
function stopAutoSlide() {
  clearInterval(autoSlide);
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}


// Funcionamiento de los botones laterales
function jumpCards(numCards) {
    const cardsToSkip = getCardsToSkip();
    
    const totalCards = retocardsArray.length;
  
    // Si estamos en la primera posición y retrocedemos, vamos al final
    if (counter === 0 && numCards < 0) {
      counter = Math.floor((totalCards - 1) / cardsToSkip) * cardsToSkip;
    } else {
      counter = (counter + numCards + totalCards) % totalCards;  
    }
    
    updateCarousel();
}

// Funcionamiento botón adelante
document.querySelector('.next').addEventListener('click', () => {
  stopAutoSlide();  // Llama a la función para detener el movimiento automático de cards
  const cardsToSkip = getCardsToSkip();
  jumpCards(cardsToSkip); 
});


// Funcionamiento botón hacia atrás
document.querySelector('.prev').addEventListener('click', () => {
    stopAutoSlide();  
    const cardsToSkip = getCardsToSkip();
    jumpCards(-cardsToSkip);  // Llama función para saltar cards según el tamaño de pantalla (3,2,1)
    startAutoSlide();  // Llama a la función para reiniciaar el movimiento automático de cards
  });

// Cuando la ventana cambia de tamaño, actualiza la posición del carrusel de acuerdo a ese tamaño
window.addEventListener('resize', () => {
  updateCarousel();
});

//Llamar a la función de movimiento automático
startAutoSlide();
