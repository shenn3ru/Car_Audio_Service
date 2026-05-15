let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");
let currentIndex = 0;
let intervalId;

//dvijenia slide
function changeSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
    currentIndex = index;
}

//next slide, automatizare si stop
function nextSlide() {
    let nextIndex = (currentIndex + 1) % slides.length;
    changeSlide(nextIndex);
}
function startAutoSlide() {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 4000);
}
function stopAutoSlide() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

//tipo stopare
const bannerContainer = document.querySelector(".banner");
bannerContainer.addEventListener("mouseenter", stopAutoSlide);
bannerContainer.addEventListener("mouseleave", startAutoSlide);

dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
        changeSlide(idx);
        startAutoSlide();
    });
});

startAutoSlide();



//certov overlay
const bannerOverlay = document.getElementById("overlay");
const overlayImg = document.getElementById("overlayImg");
const overlayTitle = document.getElementById("overlayTitle");
const overlayText = document.getElementById("overlayText");
const overlayList = document.getElementById("overlayList");

overlayList.style.display = "none";

function openBannerOverlay(imgUrl, title, infoText) {
    overlayImg.src = imgUrl;
    overlayTitle.innerText = title;
    overlayText.innerText = infoText;
    overlayList.style.display = "none";
    bannerOverlay.style.display = "flex";
}

//clickabelnosti
slides.forEach(slide => {
    slide.addEventListener("click", (e) => {
        if (e.target.classList.contains("hero-btn")) {
            return;
        }
        
        const bgImage = slide.style.backgroundImage;
        const imgUrl = bgImage.slice(5, -2);
        const title = slide.querySelector("h1").innerText;
        const infoText = slide.getAttribute("data-info") || "Servicii profesionale de calitate pentru mașina dumneavoastră.";
        
        openBannerOverlay(imgUrl, title, infoText);
    });
});

document.querySelectorAll(".hero-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const slide = btn.closest(".slide");
        const bgImage = slide.style.backgroundImage;
        const imgUrl = bgImage.slice(5, -2);
        const title = slide.querySelector("h1").innerText;
        const infoText = slide.getAttribute("data-info") || "Servicii profesionale de calitate pentru mașina dumneavoastră.";
        
        openBannerOverlay(imgUrl, title, infoText);
    });
});

//info card (nado meneati)
const servicesData = {
    multimedia: {
        title: "Multimedia auto",
        img: "image/multimedia auto.jpg",
        text: "Servicii complete pentru sisteme multimedia auto. Oferim cele mai noi soluții pentru entertainment-ul mașinii tale.",
        list: [
            "✓ Actualizare software navigație",
            "✓ Actualizare hărți Europa",
            "✓ Conversie USA → UE",
            "✓ Activare CarPlay / Android Auto",
            "✓ Instalare ecrane multimedia"
        ]
    },
    audio: {
        title: "Audio auto",
        img: "image/audio auto.jpg",
        text: "Reparații și optimizare sisteme audio auto. Redăm calitatea sunetului din mașina ta.",
        list: [
            "✓ Reparații amplificatoare",
            "✓ Diagnoză sistem audio",
            "✓ Upgrade difuzoare",
            "✓ Instalare subwoofer",
            "✓ Izolare fonică"
        ]
    },
    electronic: {
        title: "Electronică auto",
        img: "image/electronica auto.jpg",
        text: "Diagnosticare și reparații module electronice. Rezolvăm orice problemă electrică a autovehiculului.",
        list: [
            "✓ Reparații plăci de bază",
            "✓ Module de control",
            "✓ Diagnoză completă",
            "✓ Reprogramare ECU",
            "✓ Reparații senzori"
        ]
    },
    premium: {
        title: "Premium OEM",
        img: "image/oem.png",
        text: "Servicii pentru sisteme premium. Specialiști în mărcile de lux.",
        list: [
            "✓ Porsche PCM",
            "✓ HARMAN KARDON",
            "✓ Upgrade MIB",
            "✓ BOSE audio",
            "✓ Bang & Olufsen"
        ]
    },
    accesorii: {
        title: "Accesorii",
        img: "image/acc.jpg",
        text: "Instalare accesorii multimedia. Adaugă funcționalități moderne mașinii tale.",
        list: [
            "✓ Porturi USB suplimentare",
            "✓ Bluetooth hands-free",
            "✓ Module externe audio",
            "✓ Camere de marșarier",
            "✓ Senzori de parcare"
        ]
    },
    tv: {
        title: "TV & Monitoare",
        img: "image/tv.jpg",
        text: "Reparații și instalare televizoare și monitoare auto. Divertisment la bord pentru pasageri.",
        list: [
            "✓ Reparații ecrane LCD/LED",
            "✓ Înlocuire touchscreen",
            "✓ Instalare monitoare tetieră",
            "✓ Conectivitate HDMI",
            "✓ Suport pentru multiple surse video"
        ]
    }
};

//open overlay
function openCardOverlay(serviceKey) {
    const data = servicesData[serviceKey];
    if (!data) return;
    
    overlayImg.src = data.img;
    overlayTitle.innerText = data.title;
    overlayText.innerText = data.text;
    
    overlayList.style.display = "block";
    overlayList.innerHTML = "";
    data.list.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = item;
        overlayList.appendChild(li);
    });
    
    bannerOverlay.style.display = "flex";
}

document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        const serviceKey = card.dataset.service;
        openCardOverlay(serviceKey);
    });
});

function closeOverlay() {
    bannerOverlay.style.display = "none";
}

//zacrta
bannerOverlay.addEventListener("click", (e) => {
    if (e.target === bannerOverlay) {
        closeOverlay();
    }
});

document.getElementById("overlayContent").addEventListener("click", (e) => {
    e.stopPropagation();
});

//animation
const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});