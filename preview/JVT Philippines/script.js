(() => {
  "use strict";

  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const fitmentOptions = [...document.querySelectorAll("[data-fitment]")];

  const fitments = {
    honda160: {
      brand: "Honda scooter platforms",
      title: "PCX160 / ADV160 / Click160",
      application: "PCX160, ADV160, and Click160",
      inclusions: "Pulley, drive face, and backplate with slider",
      image: "assets/images/jvt-pulley-set-s2-honda-pcx-adv-click.jpg",
      alt: "JVT Pulley Set S2 for Honda PCX160, ADV160, and Click160"
    },
    click: {
      brand: "Honda scooter platforms",
      title: "Click125 / Click150",
      application: "Click125 and Click150",
      inclusions: "Pulley, drive face, and backplate with slider",
      image: "assets/images/jvt-pulley-set-s2-honda-click-125-150.jpg",
      alt: "JVT Pulley Set S2 for Honda Click125 and Click150"
    },
    yamaha125: {
      brand: "Yamaha scooter platforms",
      title: "Mio i125 / M3 / Gravis / Fazzio",
      application: "Mio i125, M3, Gravis, and Fazzio",
      inclusions: "Pulley, pulley bushing, drive face, and backplate with slider",
      image: "assets/images/jvt-pulley-set-s2-yamaha-mio-fazzio.jpg",
      alt: "JVT Pulley Set S2 for Yamaha Mio i125, M3, Gravis, and Fazzio"
    },
    honda150: {
      brand: "Honda scooter platforms",
      title: "ADV150 / PCX150",
      application: "ADV150 and PCX150",
      inclusions: "Pulley, drive face, and backplate with slider",
      image: "assets/images/jvt-pulley-set-s2-honda-adv-pcx-150.jpg",
      alt: "JVT Pulley Set S2 for Honda ADV150 and PCX150"
    },
    yamahaClassic: {
      brand: "Yamaha scooter platforms",
      title: "Mio Sporty / Soulty / Fino / Nouvo",
      application: "Mio Sporty, Soulty, Fino, and Nouvo",
      inclusions: "Pulley, drive face, and backplate with slider",
      image: "assets/images/jvt-pulley-set-s2-yamaha-mio-fino-nouvo.jpg",
      alt: "JVT Pulley Set S2 for Yamaha Mio Sporty, Soulty, Fino, and Nouvo"
    }
  };

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  const setMenu = (isOpen) => {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.querySelector(".sr-only").textContent = isOpen ? "Close menu" : "Open menu";
    mobileMenu.hidden = !isOpen;
    document.body.classList.toggle("menu-open", isOpen);
    header?.classList.toggle("menu-is-open", isOpen);

    if (isOpen) {
      mobileMenu.querySelector("a")?.focus();
    }
  };

  const setFitment = (key) => {
    const fitment = fitments[key];
    const image = document.querySelector("[data-fitment-image]");
    if (!fitment || !image) return;

    fitmentOptions.forEach((option) => {
      const isActive = option.dataset.fitment === key;
      option.classList.toggle("is-active", isActive);
      option.setAttribute("aria-pressed", String(isActive));
    });

    image.style.opacity = "0";
    window.setTimeout(() => {
      image.src = fitment.image;
      image.alt = fitment.alt;
      image.style.opacity = "1";
    }, 120);

    document.querySelector("[data-fitment-brand]").textContent = fitment.brand;
    document.querySelector("[data-fitment-title]").textContent = fitment.title;
    document.querySelector("[data-fitment-application]").textContent = fitment.application;
    document.querySelector("[data-fitment-inclusions]").textContent = fitment.inclusions;
  };

  menuToggle?.addEventListener("click", () => {
    setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  mobileMenu?.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });

  fitmentOptions.forEach((option) => {
    option.addEventListener("click", () => setFitment(option.dataset.fitment));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuToggle.focus();
    }
  });

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
})();
