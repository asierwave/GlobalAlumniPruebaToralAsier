const retocards = document.querySelector('.retocards');
const retocardsArray = document.querySelectorAll('.retocard');
let counter = 0;
let intervalTime = 6000; // Intervalo de tiempo en milisegundos (6 segundos)
let autoSlide;

// Función para actualizar la posición del carrusel
function updateCarousel() {
  const cardWidth = retocardsArray[0].clientWidth; // Ancho de una tarjeta
  retocards.style.transform = `translateX(${-counter * cardWidth}px)`; // Mover el carrusel
}

// Función para determinar cuántas tarjetas saltar según el ancho de la pantalla
function getCardsToSkip() {
  if (innerWidth > 1250) {
    return 3; // Saltar 3 tarjetas
  } else if (innerWidth > 800 && innerWidth <= 1250) {
    return 2; // Saltar 2 tarjetas
  } else {
    return 1; // Saltar 1 tarjeta
  }
}

// Función para avanzar automáticamente
function autoNextSlide() {
  const cardsToSkip = getCardsToSkip();
  counter = (counter + cardsToSkip) % retocardsArray.length; // Avanzar tarjetas
  updateCarousel();
}

// Iniciar el desplazamiento automático
function startAutoSlide() {
  autoSlide = setInterval(autoNextSlide, intervalTime);
}

// Detener el desplazamiento automático
function stopAutoSlide() {
  clearInterval(autoSlide);
}

// Función para reiniciar la rotación automática tras interacción del usuario
function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}
// Función para saltar las cards hacia adelante o atrás
function jumpCards(numCards) {
    const cardsToSkip = getCardsToSkip();
    const totalCards = retocardsArray.length;
  
    // Si estamos en la primera posición y retrocedemos, vamos al final
    if (counter === 0 && numCards < 0) {
      counter = Math.floor((totalCards - 1) / cardsToSkip) * cardsToSkip;
    } else {
      counter = (counter + numCards + totalCards) % totalCards;  // Garantiza que el índice no sea negativo
    }
    
    updateCarousel();
}

// Evento de clic en el botón "Next"
document.querySelector('.next').addEventListener('click', () => {
  stopAutoSlide();  // Detener la rotación automática al usar botones manualmente
  const cardsToSkip = getCardsToSkip();
  jumpCards(cardsToSkip); // Avanzar según el ancho de la pantalla
});


// Evento de clic en el botón "Prev"
document.querySelector('.prev').addEventListener('click', () => {
    stopAutoSlide();  // Detener la rotación automática al usar botones manualmente
    const cardsToSkip = getCardsToSkip();
    jumpCards(-cardsToSkip);  // Retroceder según el ancho de la pantalla
    startAutoSlide();  // Reiniciar la rotación automática después de la interacción
  });

// Cuando la ventana cambia de tamaño, actualiza la posición del carrusel
window.addEventListener('resize', () => {
  updateCarousel();
});

// Iniciar el carrusel automáticamente
startAutoSlide();
