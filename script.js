document.addEventListener('DOMContentLoaded', () => {

    // Элементы DOM
    const startOverlay = document.getElementById('start-overlay');
    const startBtn = document.getElementById('start-btn');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const heartsContainer = document.getElementById('hearts-container');
    const sliderContainer = document.querySelector('.slider');
    const dotsContainer = document.getElementById('dots-container');

    // Настройки
    const IMAGE_COUNT = 10; // Целевое количество картинок (можно менять)
    const SLIDE_INTERVAL = 4000; // Миллисекунды (4 секунды)

    // Массив изображений (заглушки или реальные пути)
    const images = [
        'images/photo_1_2026-02-21_17-02-08.jpg',
        'images/photo_2_2026-02-21_17-02-08.jpg',
        'images/photo_3_2026-02-21_17-02-08.jpg',
        'images/photo_4_2026-02-21_17-02-08.jpg',
        'images/photo_5_2026-02-21_17-02-08.jpg',
        'images/photo_6_2026-02-21_17-02-08.jpg',
        'images/photo_7_2026-02-21_17-02-08.jpg',
        'images/photo_8_2026-02-21_17-02-08.jpg',
        'images/photo_9_2026-02-21_17-02-08.jpg',
        'images/photo_10_2026-02-21_17-02-08.jpg',
        'images/photo_11_2026-02-21_17-02-08.jpg'
    ];

    let currentSlide = 0;
    let slides = [];
    let slideInterval;

    // Инициализация слайдера (создание элементов)
    function initSlider() {
        // Очищаем статику
        sliderContainer.querySelectorAll('.slide').forEach(el => el.remove());

        if (images.length === 0) return;

        images.forEach((src, index) => {
            // Создаем слайд
            const slide = document.createElement('div');
            slide.className = 'slide';
            if (index === 0) slide.classList.add('active');

            // Задаем фон
            slide.style.backgroundImage = `url('${src}')`;

            // Обработчик ошибки загрузки картинки (чтобы слайдер не ломался визуально)
            const img = new Image();
            img.onerror = () => {
                slide.style.backgroundImage = 'none';
                slide.style.backgroundColor = '#ffd1dc';
                slide.innerHTML = `<div style="display:flex; height:100%; align-items:center; justify-content:center; color:#fff; text-align:center; padding:20px;">Фото ${index + 1} не найдено.<br>Поместите ${src}</div>`;
            };
            img.src = src;

            sliderContainer.insertBefore(slide, sliderContainer.querySelector('.slider-controls'));
            slides.push(slide);

            // Создаем точку
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });
    }

    // Функция переключения слайда
    function nextSlide() {
        if (slides.length <= 1) return;

        // Скрываем текущий
        slides[currentSlide].classList.remove('active');
        dotsContainer.children[currentSlide].classList.remove('active');

        // Вычисляем следующий
        currentSlide = (currentSlide + 1) % slides.length;

        // Показываем новый
        slides[currentSlide].classList.add('active');
        dotsContainer.children[currentSlide].classList.add('active');
    }

    // Запуск слайдера
    function startSlider() {
        slideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
    }

    // Генерация плавающих сердечек на фоне
    function createHearts() {
        const heartsCount = 15; // Количество сердечек одновременно
        const heartSymbols = ['❤️', '💖', '💕', '💗'];

        for (let i = 0; i < heartsCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'float-heart';
            heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

            // Рандомная позиция, задержка и размер
            const size = Math.random() * 1.5 + 0.5; // от 0.5em до 2em
            const left = Math.random() * 100; // 0% до 100%
            const duration = Math.random() * 10 + 10; // 10s до 20s
            const delay = Math.random() * 5; // 0s до 5s

            heart.style.fontSize = `${size}rem`;
            heart.style.left = `${left}%`;
            heart.style.animationDuration = `${duration}s`;
            heart.style.animationDelay = `${delay}s`;

            heartsContainer.appendChild(heart);
        }
    }

    // --- Обработчик Стартового Экрана ---
    startBtn.addEventListener('click', () => {

        // 1. Скрываем оверлей (плавно)
        startOverlay.style.opacity = '0';
        setTimeout(() => {
            startOverlay.style.display = 'none';
        }, 1000);

        // 2. Показываем основной контент
        mainContent.classList.remove('hidden');

        // 3. Запускаем музыку
        bgMusic.play().catch(e => {
            console.log("Автовоспроизведение заблокировано браузером", e);
        });

        // 4. Генерируем анимации фона
        createHearts();

        // 5. Запускаем слайдер
        initSlider();
        startSlider();
    });

});
