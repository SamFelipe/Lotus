document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOBILE MENU TOGGLE
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .btn-sm');
    const icon = mobileToggle.querySelector('i');

    function toggleMenu() {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    mobileToggle.addEventListener('click', toggleMenu);

    // Fechar ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) toggleMenu();
        });
    });

    // Fechar ao clicar fora do menu
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // 2. CONTADOR DE ESTATÍSTICAS
    const counters = document.querySelectorAll('.stat-number');
    const speed = 100; // Velocidade da animação

    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                
                const updateCount = () => {
                    // Pega o número atual (removemos o + no HTML, ele é adicionado via CSS ou JS se quiser)
                    const count = +counter.innerText.replace('+', ''); 
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = '+' + Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = '+' + target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(animateCounters, {
        root: null,
        threshold: 0.5
    });

    counters.forEach(counter => {
        sectionObserver.observe(counter);
    });

    // 3. COPY TO CLIPBOARD
    const copyBtns = document.querySelectorAll('.copy-btn');
    
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.getAttribute('data-clipboard');
            navigator.clipboard.writeText(text).then(() => {
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                btn.style.backgroundColor = '#25D366'; // Verde feedback
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = ''; // Volta cor original
                }, 2000);
            });
        });
    });

    // 4. NAVBAR SCROLL EFFECT
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
        } else {
            header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
        }
    });
});