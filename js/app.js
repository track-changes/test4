const animations = [
    {
        observerSelector: '.contact-list',
        animationSelector: '.contact-list',
        animation: {
            translateY: [64, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutSine',
        },
    },
    {
        observerSelector: '.about-description',
        animationSelector: '.about-description',
        animation: {
            translateY: [64, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutSine',
        },
    },
    {
        observerSelector: '.about-cards',
        animationSelector: '.about-cards',
        animation: {
            translateY: [64, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutSine',
        },
    },
    {
        observerSelector: '.about-what',
        animationSelector: '.about-what',
        animation: {
            translateY: [64, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutSine',
        },
    },
    {
        observerSelector: '.about-benefit',
        animationSelector: '.about-benefit',
        animation: {
            translateY: [64, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutSine',
        },
    },
    {
        observerSelector: '.referral-page .banner__subtext',
        animationSelector: '.referral-page .banner__subtext',
        animation: {
            translateY: [64, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutSine',
        },
    },
    {
        observerSelector: '.steps-inner',
        animationSelector: '.steps',
        animation: {
            translateY: [64, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutSine',
        },
    },
    {
        observerSelector: '.referral-page .why',
        animationSelector: '.referral-page .why',
        animation: {
            translateY: [64, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutSine',
        },
    },
    {
        observerSelector: '.referral-page .faq__header',
        animationSelector: '.referral-page .faq',
        animation: {
            translateY: [64, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutSine',
        },
    },
];
window.addEventListener('DOMContentLoaded', () => {
    if (!isDesktop()) return;
    animations.forEach(animConfig => {
        if (animConfig.animation.opacity && animConfig.animation.opacity[0] === 0 && animConfig.animation.opacity[1] === 1) {
            const elements = document.querySelectorAll(animConfig.animationSelector);
            elements.forEach(el => {
                el.style.opacity = '0';
            });
        }
    });
});

const animateElement = (element, animation) => {
    anime({
        targets: element,
        ...animation,
    });
};

const isDesktop = () => window.innerWidth >= 1024;

const observer = new IntersectionObserver((entries, observer) => {
    if (!isDesktop()) return;

    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            animations
                .filter(animConfig => entry.target.matches(animConfig.observerSelector))
                .forEach(animConfig => {
                    const elements = document.querySelectorAll(animConfig.animationSelector);
                    elements.forEach(el => animateElement(el, animConfig.animation));
                });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

animations.forEach(animConfig => {
    const observerElement = document.querySelector(animConfig.observerSelector);
    if (observerElement) observer.observe(observerElement);
});

window.addEventListener('resize', () => {
    if (!isDesktop()) {
        observer.disconnect();
    } else {
        animations.forEach((animConfig) => {
            const elements = document.querySelectorAll(animConfig.selector);
            elements.forEach((el) => observer.observe(el));
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Функция для копирования текста
    function copyCode(button) {
        const codeBlock = button.closest(".js-apiCodeWrap")?.querySelector(".js-apiCodeText");
        if (!codeBlock) return;

        const textToCopy = codeBlock.textContent.replace(/\u00a0/g, " ");

        // Проверяем доступность clipboard API
        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                updateButton(button);
            }).catch(console.error);
        } else {
            // Альтернатива для старых браузеров
            const textarea = document.createElement("textarea");
            textarea.value = textToCopy;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand("copy");
                updateButton(button);
            } catch (err) {
                console.error("Не удалось скопировать текст: ", err);
            } finally {
                document.body.removeChild(textarea);
            }
        }
    }

    function updateButton(button) {
        const originalText = button.innerText;
        button.innerText = button.getAttribute("data-copied");
        button.classList.add("copied");

        setTimeout(() => {
            button.innerText = originalText;
            button.classList.remove("copied");
        }, 3000);
    }

    // Функция для переключения видимости кода
    function toggleCode(button) {
        const codeBlock = button.closest(".js-apiCodeWrap")?.querySelector(".js-apiCodeBlock");
        if (!codeBlock) return;

        codeBlock.classList.toggle("show");
        button.classList.toggle("active");
        const originalText = button.innerText;
        button.innerText = button.getAttribute("data-hide");
        button.setAttribute("data-hide", originalText)
    }

    // Делегирование событий для копирования и показа/скрытия
    document.body.addEventListener("click", function (event) {
        if (event.target.classList.contains("js-codeCopy")) {
            copyCode(event.target);
        } else if (event.target.classList.contains("js-apiCodeToggle")) {
            toggleCode(event.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const articlePage = document.querySelector('.js-articlePage');
    if (articlePage) {
        const article = articlePage.querySelector('.article');
        article.querySelectorAll('p').forEach(function(p) {
            const img = p.querySelector('img');
            if (img) {
                p.classList.add('img-block');
        
                const altText = img.getAttribute('alt');
                if (altText) {
                    const span = document.createElement('span');
                    span.textContent = altText;
                    p.appendChild(span);
                }
            }
        });
    }
    if (articlePage && window.matchMedia('(min-width: 1280px)').matches) {
        const headings = articlePage.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const tocContainer = document.querySelector('.js-articleTitles');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: [0, 0.5, 1],
        };

        let headingCount = 0;

        // Получаем текущий URL страницы
        const currentUrl = window.location.origin + window.location.pathname;

        headings.forEach((heading) => {
            headingCount++;
            const headingId = `title${headingCount}`;
            heading.setAttribute('id', headingId);

            const li = document.createElement('li');
            li.className = 'article__titles-item js-articleTitlesItem';
            li.setAttribute('data-title', headingId);

            const anchor = document.createElement('a');
            anchor.href = `${currentUrl}#${headingId}`; // Формируем полный URL с якорем
            anchor.textContent = heading.textContent;

            li.appendChild(anchor);
            tocContainer.appendChild(li);
        });

        const updateActiveItem = () => {
            const visibleHeadings = [];

            headings.forEach((heading) => {
                const rect = heading.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    visibleHeadings.push({
                        heading,
                        distance: rect.top,
                    });
                }
            });

            if (visibleHeadings.length > 0) {
                const closestHeading = visibleHeadings.reduce((prev, curr) =>
                    Math.abs(curr.distance) < Math.abs(prev.distance) ? curr : prev
                );

                document.querySelectorAll('.js-articleTitlesItem').forEach((item) => {
                    item.classList.toggle(
                        'active',
                        item.getAttribute('data-title') === closestHeading.heading.getAttribute('id')
                    );
                });
            }
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > 0) {
                    updateActiveItem();
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        headings.forEach((heading) => observer.observe(heading));

        window.addEventListener('scroll', updateActiveItem);
        updateActiveItem();
    }
});

const faqSection = document.querySelector('.js-faqSection');
if (faqSection) {
    let questions = faqSection.querySelectorAll('.js-faqQuestion');
    questions.forEach((question) => {
        question.addEventListener('click', () => {
            question.closest('.js-faqItem').classList.toggle('open')
        });
    });
}

let footerLinksBoxs = document.querySelectorAll('.js-footerLinksBox');
footerLinksBoxs.forEach(box => {
    const toggle = box.querySelector('.js-footerLinksToggle');
    const links = box.querySelector('.js-footerLinksList');
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        toggle.addEventListener('click', function () {
            toggle.classList.toggle('active');
            links.classList.toggle('show');
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const light = lottie.loadAnimation({
        container: document.getElementById('lottie-light'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'lottie/light.json'
    });

    const lightSecond = lottie.loadAnimation({
        container: document.getElementById('lottie-light-second'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'lottie/light.json'
    });
    const flyingmoney = lottie.loadAnimation({
        container: document.getElementById('lottie-flyingmoney'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'lottie/flyingmoney.json'
    });


    const animations = {
        laptop: lottie.loadAnimation({
            container: document.getElementById('lottie-laptop'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'lottie/laptop.json'
        }),
        money: lottie.loadAnimation({
            container: document.getElementById('lottie-money'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'lottie/money.json'
        }),
        moneySecond: lottie.loadAnimation({
            container: document.getElementById('lottie-money-second'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'lottie/money.json'
        })
    };

    const elementsToTrack = [
        { step: '1', elementId: 'lottie-laptop', animation: animations.laptop },
        { step: '4', elementId: 'lottie-money', animation: animations.money },
        { step: '5', elementId: 'lottie-money-second', animation: animations.moneySecond },
        { step: '6', elementId: 'lottie-money-second', animation: animations.moneySecond }
    ];

    elementsToTrack.forEach(({ step, elementId, animation }) => {
        const element = document.getElementById(elementId);
        const stepElement = document.querySelector(`.js-solutionStep[data-step='${step}']`);
        if (stepElement) {
            stepElement.addEventListener('mouseenter', () => {
                animation.loop = true;
                animation.play();
            });

            stepElement.addEventListener('mouseleave', () => {
                animation.loop = false;
                animation.stop();
            });

            // Контроль итераций
            let iterations = 0;
            let observerInitialized = false;

            function startIterations() {
                if (observerInitialized) return;
                observerInitialized = true;

                animation.play();
                animation.addEventListener('complete', function onComplete() {
                    iterations++;
                    if (iterations < 2) {
                        animation.goToAndPlay(0, true);
                    } else {
                        animation.stop();
                        animation.removeEventListener('complete', onComplete);
                    }
                });
            }

            // Observer для отслеживания видимости
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !observerInitialized) {
                        startIterations();
                    }
                });
            });

            observer.observe(element);
        }
    });

});
function openPopup(elem) {
    const popups = document.querySelectorAll('.js-popup');
    popups.forEach(popup => {
        popup.classList.add('hide');
        wrapperUnfixPosition();
    });
    const popupId = elem.getAttribute('data-popup');
    const popup = document.querySelector(`#${popupId}`);
    popup.classList.remove('hide');
    popup.classList.add('block');
    wrapperFixPosition();
}

function closePopup(elem) {
    const popup = elem.closest('.js-popup');
    popup.classList.add('decrease');
    setTimeout(() => {
        popup.classList.remove('block');
        popup.classList.add('hide');
        popup.classList.remove('decrease');
        wrapperUnfixPosition();
    }, 350);
}

function handlePopupActions(event) {
    function checkParentsForPopup(targetElement) {
        if (targetElement.classList.contains('js-popupOpen')) {
            openPopup(targetElement);
            return true;
        } else if (targetElement.parentNode !== document.body) {
            return checkParentsForPopup(targetElement.parentNode);
        } else {
            return false;
        }
    }
    
    if (event.target.classList.contains('js-popupOpen')) {
        openPopup(event.target);
    } else if (event.target.classList.contains('js-popupClose')) {
        closePopup(event.target);
    } else {
        checkParentsForPopup(event.target)
    }
}

document.addEventListener('click', handlePopupActions);

document.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) {
        const popups = document.querySelectorAll('.js-popup');
        popups.forEach(popup => {
            popup.classList.add('decrease');
            setTimeout(() => {
                popup.classList.remove('block');
                popup.classList.add('hide');
                popup.classList.remove('decrease');
                wrapperUnfixPosition();
            }, 350);
        });
    }
});

document.addEventListener('click', function(event) {
    const activePopup = document.querySelector('.js-popup.block');
    if (activePopup && event.target.classList.contains('js-popup')) {
        activePopup.classList.add('decrease');
        setTimeout(() => {
            activePopup.classList.remove('block');
            activePopup.classList.add('hide');
            activePopup.classList.remove('decrease');
            wrapperUnfixPosition();
        }, 350);
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const pricePage = document.querySelector(".price-page");
    if (!pricePage) return;

    const widgetContainer = document.querySelector(".tradingview-widget-container");


    const scriptUrl = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";

    function loadWidget(interval) {
        widgetContainer.innerHTML = "";
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = scriptUrl;

        // Формируем объект конфигурации
        let widgetConfig = {
            "symbols": [[
                `BINANCE:TRXUSD|${interval}`
            ]],
            "chartOnly": true,
            "width": "100%",
            "height": "100%",
            "locale": "en",
            "autosize": true,
            "showVolume": false,
            "showMA": false,
            "hideDateRanges": true,
            "hideMarketStatus": false,
            "hideSymbolLogo": false,
            "scalePosition": "right",
            "scaleMode": "Normal",
            "fontFamily": "Lato,-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
            "fontSize": "14",
            "backgroundColor": "rgba(255, 255, 255, 0)",
            "noTimeScale": false,
            "valuesTracking": "1",
            "changeMode": "price-and-percent",
            "chartType": "area",
            "gridLineColor": "rgba(35, 35, 35, 1)",
            "widgetFontColor": "rgba(129, 129, 129, 1)",
            "lineColor": "rgba(116, 235, 105, 1)",
            "topColor": "rgba(116, 235, 105, 0.3)",
            "bottomColor": "rgba(116, 235, 105, 0)",
            "lineWidth": 2,
            "lineType": 0
        };

        // Если выбран "7D", добавляем параметр "dateRanges"
        if (interval === "7D") {
            widgetConfig.dateRanges = ["1w|60"];
        }

        // Преобразуем объект в строку и добавляем в script.innerHTML
        script.innerHTML = JSON.stringify(widgetConfig);
        widgetContainer.appendChild(script);
    }

    document.querySelectorAll(".js-switchChart").forEach(input => {
        input.addEventListener("change", function () {
            const intervalMap = {
                "1d": "1D",
                "7d": "7D",
                "1m": "1M",
                "3m": "3M",
                "1y": "1Y"
            };
            loadWidget(intervalMap[this.id]);
        });
    });

    loadWidget("1M");


// URL для получения данных тикера по паре TRX-USDT
const tickerUrl = 'https://www.okx.com/api/v5/market/ticker?instId=TRX-USDT';

fetch(tickerUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        if (data && data.data && data.data.length > 0) {
            const ticker = data.data[0];

            // Извлекаем необходимые данные
            const currentPrice = parseFloat(ticker.last);
            const open24h = parseFloat(ticker.open24h); // Цена 24 часа назад
            const volume24h = parseFloat(ticker.vol24h);

            // Вычисляем процентное изменение цены за 24 часа
            const priceChangePercent = ((currentPrice - open24h) / open24h) * 100;

            // Фиксированное значение для circulating supply TRX (примерное)
            const circulatingSupply = 95039352646;
            const marketCap = circulatingSupply * currentPrice;

            // Функция для форматирования чисел с суффиксами
            function formatNumber(value) {
                if (value >= 1e9) {
                    return (value / 1e9).toFixed(2) + 'B';
                } else if (value >= 1e6) {
                    return (value / 1e6).toFixed(2) + 'M';
                } else {
                    return value.toFixed(2);
                }
            }

            // Форматируем данные с префиксом "≈ $"
            const formattedPrice = '$' + currentPrice.toFixed(2);
            const formattedPriceText = currentPrice.toFixed(4) + ' USDT';
            const formattedVolume = '$' + formatNumber(volume24h);
            const formattedMarketCap = '$' + formatNumber(marketCap);
            const formattedSupply = formatNumber(circulatingSupply);

            // Обновляем значения в элементах на странице
            const infoValueElem = document.querySelector('.js-infoValue');
            const infoCapElem = document.querySelector('.js-infoCap');
            const marketCapElem = document.querySelector('.js-marketCap');
            const supplyElem = document.querySelector('.js-circulatingSupply');
            const priceChangeElem = document.querySelector('.js-priceChange');
            const priceElem = document.querySelector('.js-priceText');
            const chartPrice = document.querySelector('.js-chartPrice');
            const infoElem = document.querySelector('.js-volumeText');
            const priceChangeText = document.querySelector('.js-priceChangeText');

            if (priceElem) {
                priceElem.textContent = formattedPrice;
            }
            if (chartPrice) {
                chartPrice.textContent = formattedPriceText;
            }
            if (infoValueElem) {
                infoValueElem.textContent = formattedVolume;
                infoElem.textContent = formattedVolume;
            }
            if (infoCapElem) {
                infoCapElem.textContent = formattedMarketCap;
                marketCapElem.textContent = formattedMarketCap;
            }
            if (supplyElem) {
                supplyElem.textContent = formattedSupply;
            }
            if (priceChangeText) {
                priceChangeText.textContent = priceChangePercent.toFixed(2) + '%';
            }
            if (priceChangeElem) {
                priceChangeElem.textContent = priceChangePercent.toFixed(2) + '%';
                // Если изменение отрицательное, добавляем класс 'red'
                if (priceChangePercent < 0) {
                    priceChangeElem.classList.add('red');
                }
            }
        } else {
            console.error('Нет данных для отображения');
        }
    })
    .catch(error => {
        console.error('Ошибка запроса:', error);
    });


    window.addEventListener('DOMContentLoaded', updateSurveyLines);

});


function updateSurveyLines() {
    const surveyLines = document.querySelector('.js-surveyLines');
    const likeLine = document.querySelector('.js-likeLine');
    const dislikeLine = document.querySelector('.js-dislikeLine');

    const likeCount = parseInt(document.querySelector('.js-likeCounter').innerText) || 0;
    const dislikeCount = parseInt(document.querySelector('.js-dislikeCounter').innerText) || 0;
    const totalVotes = likeCount + dislikeCount;

    let likeWidth = 0;
    let dislikeWidth = 0;

    if (totalVotes > 0) {
        likeWidth = (likeCount / totalVotes) * 100;
        dislikeWidth = (dislikeCount / totalVotes) * 100;
        surveyLines.classList.remove('hide');
    } else {
        surveyLines.classList.add('hide');
    }

    likeLine.style.width = `calc(${likeWidth}% - 4px)`;
    dislikeLine.style.width = `calc(${dislikeWidth}% - 4px)`;
}

document.addEventListener("DOMContentLoaded", async function () {
    // Если страница не предназначена для прайсинга, прерываем выполнение
    if (!document.querySelector('.js-pricingPage')) return;

    // Глобальные переменные для smart‑режима
    let globalSmartModePrice = null;

    /* ============================
       Обработка переключения табов
    ============================ */
    const tabButtons = document.querySelectorAll('.js-changeTab');
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedTab = button.getAttribute('data-tab');
            const tabContents = document.querySelectorAll('.js-tabContent');
            tabContents.forEach(content => {
                if (content.getAttribute('data-tab') === selectedTab) {
                    content.classList.remove('hide');
                } else {
                    content.classList.add('hide');
                }
            });
        });
    });

    /* ============================
       Делегирование ховера для цены
    ============================ */
    const hoverEl = document.querySelector('.js-tableHover');
    const tableInner = document.querySelector('.js-tableInner');
    tableInner.addEventListener('mousemove', function (e) {
        if (e.target.classList.contains('js-pricingValue')) {
            const innerRect = tableInner.getBoundingClientRect();
            const itemRect = e.target.getBoundingClientRect();
            const topPosition = itemRect.top - innerRect.top;
            hoverEl.classList.add('visible');
            hoverEl.style.top = topPosition + 'px';
        } else {
            hoverEl.classList.remove('visible');
        }
    });
    tableInner.addEventListener('mouseleave', function () {
        hoverEl.classList.remove('visible');
    });

    /* ============================
       Определяем активную валюту и получаем курс TRX/USDT
    ============================ */
    let activeCurrency = document.querySelector('.js-changeCurrency.active').getAttribute('data-currency');
    let trxRate = null;
    const fetchRate = async () => {
        try {
            const response = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=TRXUSDT");
            if (response.ok) {
                const data = await response.json();
                return parseFloat(data.price);
            } else {
                console.error("Ошибка получения курса TRX/USDT: " + response.status);
            }
        } catch (error) {
            console.error("Ошибка при получении курса TRX/USDT:", error);
        }
        return null;
    };
    trxRate = await fetchRate();

    /* ============================
       Загрузка данных API и рендеринг
    ============================ */
    let globalPricingData = null;
    let globalDiscountData = null;
    try {
        const response = await fetch('https://api.feesaver.com/common/prices');
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.status);
        }
        const data = await response.json();
        globalPricingData = data.result.prices;
        globalDiscountData = data.result.discounts;
        globalSmartModePrice = data.result.smartModePrice;

        // Рендерим таблицу (purchase‑режим)
        renderDiscounts(globalDiscountData);
        renderPrices(globalPricingData, globalDiscountData, activeCurrency, trxRate);
        // Обновляем smart‑режим (без объёмов)
        updateSmartMode(globalSmartModePrice, activeCurrency, trxRate);

        // Добавляем класс loaded, сигнализирующий о завершении загрузки таблицы
        tableInner.classList.add('loaded');
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        tableInner.classList.add('error');
    }

    /* ============================
       Переключение валют
    ============================ */
    const currencyButtons = document.querySelectorAll('.js-changeCurrency');
    currencyButtons.forEach(button => {
        button.addEventListener('click', function () {
            currencyButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            activeCurrency = button.getAttribute('data-currency');
            renderPrices(globalPricingData, globalDiscountData, activeCurrency, trxRate);
            updateSmartMode(globalSmartModePrice, activeCurrency, trxRate);
            console.log('Выбрана валюта', activeCurrency.toUpperCase());
        });
    });
});

/* ============================
   Вспомогательная функция форматирования числа для колонки скидок
   Разбивает число на разряды с двумя десятичными знаками, заменяет разделитель на пробелы,
   не отображает дробную часть, если она равна "00", добавляет букву "M"
============================ */
function formatPrice(num) {
    let fixed = num.toFixed(2);
    if (fixed.endsWith(".00")) {
        fixed = num.toFixed(0);
    }
    fixed = fixed.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return fixed + "M";
}

/* ============================
   Функция форматирования цены для smart‑режима
   Округляет до двух знаков, разделяя группы пробелами, десятичный разделитель — точка
============================ */
function formatSmartPrice(num) {
    let fixed = num.toFixed(2);
    let parts = fixed.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

/* ============================
   Функция рендера скидок (фиксированный столбец)
============================ */
function renderDiscounts(discounts) {
    const discountContainer = document.querySelector('.js-discountRequireCol');
    if (discountContainer) {
        discountContainer.querySelectorAll('.js-discountRequire').forEach(el => el.remove());

        if (discounts.length > 0) {
            const baseElem = document.createElement('div');
            baseElem.classList.add('pricing__table-value', 'js-discountRequire');
            baseElem.textContent = `<${formatPrice(discounts[0].startVolumeOrders)}`;
            baseElem.dataset.discount = 0;
            discountContainer.appendChild(baseElem);
        }
        discounts.forEach((discount, index) => {
            const discountElem = document.createElement('div');
            discountElem.classList.add('pricing__table-value', 'js-discountRequire');
            let text = "";
            if (index === discounts.length - 1) {
                text = `>${formatPrice(discount.startVolumeOrders)}`;
            } else {
                text = `${formatPrice(discount.startVolumeOrders)} - ${formatPrice(discount.endVolumeOrders)}`;
            }
            discountElem.textContent = text;
            discountElem.dataset.discount = discount.discount;
            discountContainer.appendChild(discountElem);
        });
    }
}

/* ============================
   Функция рендера прайсов (purchase‑режим)
============================ */
function renderPrices(prices, discountData, activeCurrency, trxRate) {
    prices.forEach(priceObj => {
        const pricingCol = document.querySelector(`.pricing__table-col[data-col="${priceObj.duration}"]`);
        if (pricingCol) {
            // Удаляем существующие ячейки с ценой, оставляя заголовок
            pricingCol.querySelectorAll('.js-pricingValue').forEach(el => el.remove());

            // Общее количество строк определяется по количеству строк в столбце "1h"
            const rowCount = 1 + discountData.length;
            // Вычисляем базовую цену (в зависимости от валюты)
            let basePrice = priceObj.amount;
            let convertedAmount;
            if (activeCurrency === 'sun') {
                convertedAmount = basePrice * 0.65;
            } else if (activeCurrency === 'trx') {
                convertedAmount = basePrice * 0.065;
            } else if (activeCurrency === 'usdt') {
                convertedAmount = basePrice * 0.065 * (trxRate || 1);
            }

            // Если это столбец "1h", проводим пересчёт цены с учетом скидок по строкам
            if (priceObj.duration === "1h") {
                for (let i = 0; i < rowCount; i++) {
                    const cell = document.createElement('div');
                    cell.classList.add('pricing__table-value', 'js-pricingValue');
                    // Для первой строки скидка = 0, для остальных берем скидку discountData[i - 1]
                    let appliedDiscount = i === 0 ? 0 : discountData[i - 1].discount;
                    let discountedPrice = convertedAmount * (1 - appliedDiscount / 100);
                    cell.textContent = discountedPrice.toFixed(2) + ' ' + activeCurrency.toUpperCase();
                    pricingCol.appendChild(cell);
                }
            } else {
                // Для остальных столбцов создаём такое же число строк,
                // но во всех строках отображаем фиксированную цену (без скидок)
                const fixedPrice = convertedAmount.toFixed(2) + ' ' + activeCurrency.toUpperCase();
                for (let i = 0; i < rowCount; i++) {
                    const cell = document.createElement('div');
                    cell.classList.add('pricing__table-value', 'js-pricingValue');
                    cell.textContent = fixedPrice;
                    pricingCol.appendChild(cell);
                }
            }
        }
    });
}


/* ============================
   Функция обновления smart‑режима
   Обновляет только цены по данным smartModePrice, без обработки объёмов.
   - .js-smartStandartPrice5 и .js-smartStandartPrice: стандартная цена (из amount)
   - .js-smartDoublePrice: двойная цена (2x стандарт)
============================ */
function updateSmartMode(smartModePrice, activeCurrency, trxRate) {
    if (!smartModePrice) return;

    let priceTRX = smartModePrice.amount; // цена в TRX
    let convertedPrice;
    if (activeCurrency === 'trx') {
        convertedPrice = priceTRX;
    } else if (activeCurrency === 'sun') {
        convertedPrice = priceTRX * 10 / 0.65;
    } else if (activeCurrency === 'usdt') {
        convertedPrice = priceTRX * (trxRate || 1);
    }
    const formattedPrice = formatSmartPrice(convertedPrice);
    const formattedDoublePrice = formatSmartPrice(convertedPrice * 2);

    document.querySelectorAll('.js-smartStandartPrice5').forEach(el => {
        el.textContent = formattedPrice + ' ' + activeCurrency.toUpperCase();
    });
    document.querySelectorAll('.js-smartStandartPrice').forEach(el => {
        el.textContent = formattedPrice + ' ' + activeCurrency.toUpperCase();
    });
    document.querySelectorAll('.js-smartDoublePrice').forEach(el => {
        el.textContent = formattedDoublePrice + ' ' + activeCurrency.toUpperCase();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.js-sliderBlogWrapper', {
        slidesPerView: 1, 
        spaceBetween: 24,
        loop: true,
        navigation: {
            nextEl: '.js-sliderBlogArrows .swiper-button-next',
            prevEl: '.js-sliderBlogArrows .swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2, 
            },
        },
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const solutionSection = document.querySelector('.js-solution');
    if (solutionSection) {
        const radios = solutionSection.querySelectorAll('.js-solutionSwitch');
        const steps = solutionSection.querySelectorAll('.js-solutionSteps');
        const sсhemes = solutionSection.querySelectorAll('.js-solutionScheme');
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                const selectedSolution = this.id;
                steps.forEach(step => {
                    step.classList.add('hide');  
                });
                document.querySelector(`.js-solutionSteps[data-solution="${selectedSolution}"]`).classList.remove('hide');  
                sсhemes.forEach(sсheme => {
                    sсheme.classList.add('hide');  
                });
                document.querySelector(`.js-solutionScheme[data-solution="${selectedSolution}"]`).classList.remove('hide');  
            });
        });


        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {

            steps.forEach((steps) => {
                steps.addEventListener('mouseenter', () => {
                    sсhemes.forEach(sсheme => {
                        sсheme.classList.add('dull');  
                    });
                });
            
                steps.addEventListener('mouseleave', () => {
                    sсhemes.forEach(sсheme => {
                        sсheme.classList.remove('dull');  
                    });
                });
                
            })


            const stepElements = solutionSection.querySelectorAll('.js-solutionStep');
            
            stepElements.forEach((stepElement) => {
                stepElement.addEventListener('mouseenter', () => {
                    stepElement.classList.add('active');
                    stepElements.forEach((stepElement) => {
                        stepElement.classList.add('gray');
                    })
                    const parentSolution = stepElement.closest('.js-solutionSteps').getAttribute('data-solution');
                    const stepNumber = stepElement.getAttribute('data-step');
                    const targetScheme = document.querySelector(`.js-solutionScheme[data-solution="${parentSolution}"]`);
                    if (targetScheme) {
                        targetScheme.classList.add(`step${stepNumber}`);
                    }
                });
            
                stepElement.addEventListener('mouseleave', () => {
                    stepElement.classList.remove('active');
                    stepElements.forEach((stepElement) => {
                        stepElement.classList.remove('gray');
                    })
                    const parentSolution = stepElement.closest('.js-solutionSteps').getAttribute('data-solution');
                    const stepNumber = stepElement.getAttribute('data-step');
                    const targetScheme = document.querySelector(`.js-solutionScheme[data-solution="${parentSolution}"]`);
                    if (targetScheme) {
                        targetScheme.classList.remove(`step${stepNumber}`);
                    }
                });
            });
            




        };

    }
});
const radioButtons = document.querySelectorAll('.js-statsRadio');

function handleRadioChange(event) {
    changeStatNumber();

    const selectedValue = event.target.value;
    let maxTrans = document.getElementById('rangeTransactions').getAttribute('data-max');
    let priceOne = 6;
    //let ratio = 3.35
    document.getElementById('rangeTrx').setAttribute('data-max', (priceOne * maxTrans).toFixed(2));
    //document.getElementById('rangePrice').setAttribute('data-max',  (priceOne * maxTrans * ratio).toFixed(2));
    document.getElementById('rangePrice').setAttribute('data-max',  '140');
    initializeSlider();
}


function setStatNumber() {
    const statNumberText = document.querySelector('.js-statNumber span');
    let current = document.querySelector('.js-inputTRX').value;
    statNumberText.textContent = current;
}

function changeStatNumber() {
    const statNumber = document.querySelector('.js-statNumber');
    const statNumberText = document.querySelector('.js-statNumber span');
    let currentStatNumber = statNumber.getAttribute('data-current');
    let newStatNumber = statNumber.getAttribute('data-swap');
    statNumberText.textContent = newStatNumber;
    statNumber.setAttribute('data-current', newStatNumber);
    statNumber.setAttribute('data-swap', currentStatNumber);
}

radioButtons.forEach(radio => {
    radio.addEventListener('change', handleRadioChange);
});

document.addEventListener('DOMContentLoaded', () => {
    const selectedRadio = document.querySelector('.js-statsRadio:checked');
    if (selectedRadio) {
        setStatNumber();
        handleRadioChange({ target: selectedRadio });
    }
});
function initializeSlider() {
    let ranges = document.querySelectorAll('.js-range');
    let isUpdating = false;

    ranges.forEach((range) => {
        let input = range.closest('.calculator__block').querySelector('input');
        let maxValue = Number(range.getAttribute('data-max'));
        let startValue = maxValue * 0.1; 

        if (range.noUiSlider) {
            range.noUiSlider.destroy();
        }

        const step = maxValue / 10; 
        noUiSlider.create(range, {
            start: [startValue], 
            connect: 'lower',
            step: step,
            range: {
                'min': 0,
                'max': maxValue
            },
            pips: {
                mode: 'positions',
                values: [0, 100],
                density: 4,
                format: {
                    to: (value) => value % 1 === 0 ? Math.round(value) : value,
                }
            }
        });

        range.noUiSlider.on('update', (values, handle) => {
            if (isUpdating) return;
        
            const value = parseFloat(values[handle]);
            input.value = value % 1 === 0 ? Math.round(value) : value.toFixed(2); // Ограничиваем до двух знаков после запятой
        
            const percentage = Math.round((value / maxValue) * 100);
        
            isUpdating = true; 
            ranges.forEach((otherRange) => {
                if (otherRange !== range && otherRange.noUiSlider) {
                    const otherMaxValue = Number(otherRange.getAttribute('data-max'));
                    let otherInput = otherRange.closest('.calculator__block').querySelector('input');
                    const newValue = (otherMaxValue * percentage) / 100;
                    otherInput.value = newValue % 1 === 0 ? Math.round(newValue) : newValue.toFixed(2); // Ограничиваем до двух знаков
                    otherRange.noUiSlider.set(newValue);
                }
            });
            isUpdating = false; 
            setStatNumber();
        });
        range.noUiSlider.on('start', (values, handle) => {
            ym(99489613, 'reachGoal', 'calc'); 
        });
    });
}


const backBtn = document.querySelector('.js-backBtn');

if (backBtn) {
    backBtn.addEventListener('click', function () {
        window.history.back();
    })
}
let banner = document.querySelector('.js-banner');

if (banner && window.matchMedia('(min-width: 1280px)').matches) {
    let isInside = false; 

    banner.style.transition = 'background-position 2s ease-out';

    banner.addEventListener('mouseenter', (e) => {
        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight } = banner;

        // Рассчитываем положение курсора относительно баннера
        const x = clientX - banner.getBoundingClientRect().left;
        const y = clientY - banner.getBoundingClientRect().top;

        const xPercent = (x / offsetWidth - 0.5) * -2; // Инвертируем значение
        const yPercent = (y / offsetHeight - 0.5) * -2; // Инвертируем значение

        const maxShift = 48;

        const shiftX = xPercent * maxShift;
        const shiftY = yPercent * maxShift;

        banner.style.backgroundPosition = `${50 + shiftX}% ${50 + shiftY}%`;
        setTimeout(() => {
            isInside = true;
            banner.style.transition = 'background-position .2s ease-out';
        }, 2000);
    });

    // Обрабатываем движение курсора
    /*banner.addEventListener('mousemove', (e) => {
        if (!isInside) return;

        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight } = banner;

        // Рассчитываем положение курсора относительно баннера
        const x = clientX - banner.getBoundingClientRect().left;
        const y = clientY - banner.getBoundingClientRect().top;

        const xPercent = (x / offsetWidth - 0.5) * -2; // Инвертируем значение
        const yPercent = (y / offsetHeight - 0.5) * -2; // Инвертируем значение

        const maxShift = 48;

        const shiftX = xPercent * maxShift;
        const shiftY = yPercent * maxShift;

        // Устанавливаем фоновую позицию
        banner.style.transition = ''; // Убираем плавность при движении
        banner.style.backgroundPosition = `${50 + shiftX}% ${50 + shiftY}%`;
    });*/

    // Возвращаем фон в центр при выходе курсора
    banner.addEventListener('mouseleave', () => {
        isInside = false; // Сбрасываем состояние
        banner.style.transition = 'background-position 2s ease-out'; // Включаем плавный переход
        banner.style.backgroundPosition = '50% 50%'; // Центрируем фон
    });
}

const burgerOpener = document.querySelector('.js-burgerOpener');
const burgerMenu = document.querySelector('.js-burgerMenu');
burgerOpener.addEventListener('click', function () {
    burgerMenu.classList.toggle('show');
  this.classList.toggle('active')
  if (this.classList.contains('active')) {
    wrapperFixPosition();
  } else {
    wrapperUnfixPosition();
  }
});
document.addEventListener('click', function (event) {
    const isClickInsideMenu = burgerMenu.contains(event.target);
    const isClickOnOpener = burgerOpener.contains(event.target);

    if (!isClickInsideMenu && !isClickOnOpener && burgerMenu.classList.contains('show')) {
        burgerMenu.classList.remove('show');
        burgerOpener.classList.remove('active');
        wrapperUnfixPosition();
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const cookieBanner = document.querySelector(".js-cookie");
    if (!cookieBanner) return;

    if (!getCookie("cookieConsent")) {
        cookieBanner.classList.add("show");
        setTimeout(() => {
            cookieBanner.classList.add("opacity");
        }, 100);
    }

    const acceptButton = cookieBanner.querySelector("button");
    acceptButton?.addEventListener("click", () => {
        setCookie("cookieConsent", "true", 365);
        cookieBanner.classList.remove("opacity");
        setTimeout(() => {
            cookieBanner.classList.remove("show");
        }, 400);
    });
});

const setCookie = (name, value, days) => {
    const expires = days
        ? "; expires=" + new Date(Date.now() + days * 864e5).toUTCString()
        : "";
    document.cookie = `${name}=${value}; path=/${expires}`;
};

const getCookie = (name) =>
    document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1] || null;

document.addEventListener('DOMContentLoaded', () => {
    let copyWrappers = document.querySelectorAll('.js-copyWrapper');
    copyWrappers.forEach((wrapper) => {
        let copyBtn = wrapper.querySelector('.js-copyBtn');
        copyBtn.addEventListener("click", (event) => {
            let copyText = wrapper.querySelector('.js-copyText').textContent;
            copyToClipboard(copyText, event);

        });
    });
});

function copyToClipboard(text, event) {
    const textArea = document.createElement('textarea');
    
    textArea.value = text;
    
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    event.target.classList.add('copied');
    if (document.querySelector('body').classList.contains('en')) {
        event.target.textContent = 'Copied';
    } else {
        event.target.textContent = 'Скопировано';
    }
    setTimeout(() => {
        event.target.classList.remove('copied');
        if (document.querySelector('body').classList.contains('en')) {
            event.target.textContent = 'Copy address';
        } else {
            event.target.textContent = 'Копировать';
        }
    }, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
    const languageButton = document.querySelector(".js-languageButton");
    const languageList = document.querySelector(".js-languageList");
    const languageItems = document.querySelectorAll(".js-languageItem");
    let langData = {};

    languageButton.addEventListener("click", () => {
        const expanded = languageButton.getAttribute("aria-expanded") === "true";
        languageButton.setAttribute("aria-expanded", !expanded);
        languageList.classList.toggle("hidden");
        languageButton.classList.toggle("active");
    });

    languageItems.forEach((item) => {
        item.addEventListener("click", () => {
            languageButton.setAttribute("aria-expanded", "false");
            languageList.classList.add("hidden");
            languageButton.classList.remove("active");
        });

        item.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                item.click();
            }
        });
    });

    document.addEventListener("click", (e) => {
        if (!languageButton.contains(e.target) && !languageList.contains(e.target)) {
            languageButton.setAttribute("aria-expanded", "false");
            languageList.classList.add("hidden");
            languageButton.classList.remove("active");
        }
    });

});
let notificationCount = 0;
// createNotification('yellow', 'Ошибка', 'Вы уже оставили свой голос', 5)
function createNotification(classes, title, text, duration) {
    if (notificationCount === 0) {
        const notificationsWrapper = document.createElement('div');
        notificationsWrapper.classList.add('notifications');
        document.body.appendChild(notificationsWrapper);
    }

    const notification = document.createElement('div');
    notification.classList.add('notification');
    if (classes) {
        const classList = classes.split(' ');
        classList.forEach(function (className) {
            notification.classList.add(className);
        });
    }

    // Создаем кнопку закрытия (крестик)
    const closeButton = document.createElement('span');
    closeButton.classList.add('notification-close');
    notification.appendChild(closeButton);

    const notificationTitle = document.createElement('h5');
    notificationTitle.textContent = title;
    notification.appendChild(notificationTitle);

    if (text !== undefined) {
        const notificationText = document.createElement('p');
        notificationText.textContent = text;
        notification.appendChild(notificationText);
    }

    const notificationsWrapper = document.querySelector('.notifications');
    notificationsWrapper.appendChild(notification);

    notificationCount++;

    // Запускаем таймеры для автоматической анимации и удаления
    const upTimeout = setTimeout(function () {
        notification.classList.add('up');
    }, duration * 1000 - 200);

    const removeTimeout = setTimeout(function () {
        notification.remove();
        notificationCount--;
        if (notificationCount === 0) {
            const notificationsWrapper = document.querySelector('.notifications');
            if (notificationsWrapper) {
                notificationsWrapper.remove();
            }
        }
    }, duration * 1000);

    // Обработчик клика по кнопке закрытия
    closeButton.addEventListener('click', function (e) {
        notification.classList.add('up');
        setTimeout(function () {
            clearTimeout(upTimeout);
            clearTimeout(removeTimeout);
            notification.remove();
            notificationCount--;
            if (notificationCount === 0) {
                const notificationsWrapper = document.querySelector('.notifications');
                if (notificationsWrapper) {
                    notificationsWrapper.remove();
                }
            }
        }, 200);
    });

    return notification;
}

const scrollUpBtn = document.querySelector('.js-scrollUp');
const footer = document.querySelector('footer');

const showButtonThreshold = window.innerHeight;

const scrollHandler = () => {
    const scrollY = window.scrollY;
    const footerRect = footer.getBoundingClientRect();
    const buttonHeight = scrollUpBtn.offsetHeight;

    if (scrollY > showButtonThreshold) {
        scrollUpBtn.classList.add('show');
    } else {
        scrollUpBtn.classList.remove('show');
    }

    if (footerRect.top < window.innerHeight) {
        scrollUpBtn.classList.add('fixed');
        scrollUpBtn.style.bottom = `${window.innerHeight - footerRect.top + 40}px`;
    } else {
        scrollUpBtn.classList.remove('fixed');
        scrollUpBtn.style.bottom = '40px';
    }
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
if (scrollUpBtn) {
    scrollUpBtn.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', scrollHandler);
}
let tooltips = document.querySelectorAll('.js-tooltip');
tooltips.forEach(tooltip => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        tooltip.addEventListener('mouseenter', function () {
            tooltip.classList.add('active');
        });
        tooltip.addEventListener('mouseleave', function () {
            tooltip.classList.remove('active');
        });
    } else {
        tooltip.addEventListener('click', function () {
            tooltip.classList.toggle('active');
        });
    }
    document.addEventListener('click', function (event) {
        if (!tooltip.contains(event.target)) {
            tooltip.classList.remove('active');
        }
    });

});
function wrapperFixPosition() {
    const fixBlocks = document.querySelectorAll('.js-fixBlock');
    let paddingOffset = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
    setTimeout(function () {
        if (!document.querySelector('body').hasAttribute('wrapper-body-scroll-fix')) {
            let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            fixBlocks.forEach((el) => {
                el.style.paddingRight = paddingOffset;
            });
            document.querySelector('body').style.overflow = 'hidden';
            document.querySelector('body').setAttribute('wrapper-body-scroll-fix', scrollPosition);
            document.querySelector('body').style.overflow = 'hidden';
            document.querySelector('body').style.position = 'fixed';
            document.querySelector('body').style.top = '-' + scrollPosition + 'px';
            document.querySelector('body').style.left = '0';
            document.querySelector('body').style.width = '100%';
            document.querySelector('body').style.paddingRight = paddingOffset;
        }
    }, 15);
}
function wrapperUnfixPosition() {
    const fixBlocks = document.querySelectorAll('.js-fixBlock');
    if (document.querySelector('body').hasAttribute('wrapper-body-scroll-fix')) {
        let scrollPosition = document.querySelector('body').getAttribute('wrapper-body-scroll-fix');
        document.querySelector('body').removeAttribute('wrapper-body-scroll-fix');
        document.querySelector('body').style.overflow = '';
        document.querySelector('body').style.position = '';
        document.querySelector('body').style.top = '';
        document.querySelector('body').style.left = '';
        document.querySelector('body').style.width = '';
        window.scroll(0, scrollPosition);
        fixBlocks.forEach((el) => {
            el.style.paddingRight = '0px';
        });
        document.querySelector('body').style.paddingRight = '0px';
    }
}