// 1. DADOS DO SITE (Simulando uma API)
const aliados = [
    { nome: "Alfred Pennyworth", papel: "Mordomo e Estrategista" },
    { nome: "Robin", papel: "Parceiro de Combate" },
    { nome: "Batgirl", papel: "Especialista em TI" }
];

const viloes = [
    { nome: "Coringa", frase: "Por que tão sério?" },
    { nome: "Pinguim", frase: "Gotham pertence a mim." },
    { nome: "Mulher-Gato", frase: "Miau..." }
];

const faqs = [
    { q: "Qual o verdadeiro nome do Batman?", a: "Bruce Wayne." },
    { q: "Onde fica a Batcaverna?", a: "Sob a Mansão Wayne." }
];

// 2. RENDERIZAÇÃO DINÂMICA
function renderConteudo() {
    // Renderizar Aliados
    const gridAliados = document.getElementById('grid-aliados');
    aliados.forEach(hero => {
        gridAliados.innerHTML += `
            <article class="card">
                <h3>${hero.nome}</h3>
                <p>${hero.papel}</p>
            </article>
        `;
    });

    // Renderizar Vilões (Carrossel)
    const track = document.getElementById('carousel-track');
    viloes.forEach(vilao => {
        track.innerHTML += `
            <div class="carousel-item">
                <h3>${vilao.nome}</h3>
                <p>"${vilao.frase}"</p>
            </div>
        `;
    });

    // Renderizar FAQ
    const faqContainer = document.getElementById('faq-container');
    faqs.forEach((item, index) => {
        faqContainer.innerHTML += `
            <div class="accordion-item">
                <button class="accordion-header" onclick="toggleAccordion(${index})">
                    ${item.q}
                </button>
                <div class="accordion-content" id="faq-${index}">
                    <p>${item.a}</p>
                </div>
            </div>
        `;
    });
}

// 3. ACESSIBILIDADE: TAMANHO DA FONTE
let currentFontSize = 16;
document.getElementById('increase-font').addEventListener('click', () => {
    currentFontSize += 2;
    document.documentElement.style.setProperty('--font-base', currentFontSize + 'px');
});

document.getElementById('decrease-font').addEventListener('click', () => {
    currentFontSize -= 2;
    document.documentElement.style.setProperty('--font-base', currentFontSize + 'px');
});

// 4. ALTO CONTRASTE
document.getElementById('toggle-contrast').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});

// 5. LÓGICA DO ACORDEÃO
function toggleAccordion(index) {
    const contents = document.querySelectorAll('.accordion-content');
    contents[index].classList.toggle('active');
}

// 6. CARROSSEL (Lógica de slide)
let currentSlide = 0;
document.getElementById('next').addEventListener('click', () => {
    if (currentSlide < viloes.length - 1) currentSlide++;
    updateCarousel();
});

document.getElementById('prev').addEventListener('click', () => {
    if (currentSlide > 0) currentSlide--;
    updateCarousel();
});

function updateCarousel() {
    const track = document.getElementById('carousel-track');
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// 7. SCROLL REVEAL (Animação de entrada)
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        let windowHeight = window.innerHeight;
        let elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);
window.onload = () => {
    renderConteudo();
    reveal();
};
