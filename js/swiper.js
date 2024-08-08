document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector('.list');
    const items = Array.from(document.querySelectorAll('.list li'));

    let isDown = false;
    let startX;
    let scrollLeft;
    let isTouch = false;
    let touchStartX;

    function cloneItems() {
        items.forEach(item => {
            const cloneFirst = item.cloneNode(true);
            const cloneLast = item.cloneNode(true);
            list.appendChild(cloneFirst);
            list.insertBefore(cloneLast, items[0]);
        });
    }

    function startDrag(e) {
        isDown = true;
        list.classList.add('active');
        startX = e.pageX || e.touches[0].pageX - list.offsetLeft;
        scrollLeft = list.scrollLeft;
    }

    function stopDrag() {
        isDown = false;
        list.classList.remove('active');
    }

    function dragMove(e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX || e.touches[0].pageX - list.offsetLeft;
        const walk = (x - startX) * 2;
        list.scrollLeft = scrollLeft - walk;
    }

    function handleScroll() {
        const scrollWidth = list.scrollWidth / 3; // Учитывая 3 набора элементов
        if (list.scrollLeft <= 0) {
            list.scrollLeft = scrollWidth;
        } else if (list.scrollLeft >= scrollWidth * 2) {
            list.scrollLeft = scrollWidth;
        }
    }

    function initCarousel() {
        cloneItems();

        list.addEventListener('mousedown', startDrag);
        list.addEventListener('touchstart', startDrag);

        list.addEventListener('mouseleave', stopDrag);
        list.addEventListener('mouseup', stopDrag);
        list.addEventListener('touchend', stopDrag);

        list.addEventListener('mousemove', dragMove);
        list.addEventListener('touchmove', dragMove);

        list.addEventListener('scroll', handleScroll);

        // Установка начальной позиции прокрутки на середину
        const scrollWidth = list.scrollWidth / 3;
        list.scrollLeft = scrollWidth;
    }

    function checkWindowSize() {
        if (window.innerWidth < 1200) {
            initCarousel();
        } else {
            // Удалить обработчики и сбросить изменения, если нужно
            list.removeEventListener('mousedown', startDrag);
            list.removeEventListener('touchstart', startDrag);
            list.removeEventListener('mouseleave', stopDrag);
            list.removeEventListener('mouseup', stopDrag);
            list.removeEventListener('touchend', stopDrag);
            list.removeEventListener('mousemove', dragMove);
            list.removeEventListener('touchmove', dragMove);
            list.removeEventListener('scroll', handleScroll);
        }
    }

    // Проверка начального размера окна
    checkWindowSize();

    // Добавление обработчика события изменения размера окна
    window.addEventListener('resize', checkWindowSize);
});
