// CONFIGURACIÓN DE EMAILJS
const EMAILJS_CONFIG = {
    publicKey: 'ePb9ce4CPNTL2TJka',
    serviceId: 'service_jpacw9m',
    templateId: 'template_0ir80zg'
};

// Inicializar EmailJS cuando cargue la página
(function() {
    emailjs.init(EMAILJS_CONFIG.publicKey);
})();

// NAVEGACIÓN MÓVIL
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// HEADER CON SCROLL
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 100);
});

        // FILTRO DE PORTAFOLIO
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover clase active de todos los botones
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                // Agregar clase active al botón clickeado
                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');
                
                const filterValue = button.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
        
        // Animación de elementos al hacer scroll
        const fadeElements = document.querySelectorAll('.service-card, .portfolio-item');
        
        const fadeInOnScroll = () => {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('fade-in');
                }
            });
        };
        
        window.addEventListener('scroll', fadeInOnScroll);
        // Ejecutar una vez al cargar la página
        fadeInOnScroll();

        // FORMULARIO DE CONTACTO CON EMAILJS
        const contactForm = document.getElementById('form-contacto');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            // Deshabilitar botón
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            submitBtn.style.opacity = '0.7';
            
            // Obtener valores del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const asunto = document.getElementById('asunto').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            
            // Validar que no estén vacíos
            if (!nombre || !email || !mensaje) {
                alert('Por favor, completa todos los campos requeridos.');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                submitBtn.style.opacity = '1';
                return;
            }
        
            // El template usa: {{name}}, {{email}}, {{asunto}}, {{message}}
            const templateParams = {
                name: nombre,
                email: email,
                asunto: asunto || 'Consulta desde ArquiDesign',
                message: mensaje
            };
            
            console.log('📧 Enviando email con estos datos:', templateParams);
            
            // Enviar email
            emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams
            )
            .then(function(response) {
                console.log('✅ EMAIL ENVIADO EXITOSAMENTE!', response);
                console.log('Status:', response.status);
                console.log('Text:', response.text);
                alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
                contactForm.reset();
            })
            .catch(function(error) {
                console.error('❌ ERROR COMPLETO:', error);
                console.error('Error status:', error.status);
                console.error('Error text:', error.text);
                alert('Error al enviar: ' + (error.text || error.message || 'Error desconocido'));
            })
            .finally(function() {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                submitBtn.style.opacity = '1';
            });
        });

        // ESTILO PARA ACCESIBILIDAD
        const style = document.createElement('style');
        style.textContent = `
            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
            }
        `;

        document.head.appendChild(style);
