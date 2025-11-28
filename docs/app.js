// Datos mínimos para búsqueda rápida en index.html
const DRUG_CLASSES = [
  {
    id: "beta-bloqueantes",
    name: "Beta-bloqueantes",
    examples: ["metoprolol", "propranolol", "atenolol"],
    area: "Cardiovascular",
    route: "Oral / IV",
  },
  {
    id: "aine",
    name: "AINE",
    examples: ["ibuprofeno", "naproxeno", "diclofenaco"],
    area: "Dolor / Inflamación",
    route: "Oral / IV / Tópica",
  },
  {
    id: "ieca",
    name: "Inhibidores de la ECA",
    examples: ["enalapril", "lisinopril", "ramipril"],
    area: "Cardiovascular",
    route: "Oral",
  },
  {
    id: "estatinas",
    name: "Estatinas",
    examples: ["atorvastatina", "simvastatina", "rosuvastatina"],
    area: "Lípidos",
    route: "Oral",
  },
    {
    id: "antidiabeticos-orales",
    name: "Antidiabéticos orales",
    examples: ["metformina", "sulfonilureas", "inhibidores SGLT2"],
    area: "Endocrino / Metabolismo",
    route: "Oral",
  },
  {
    id: "beta2",
    name: "Broncodilatadores β2",
    examples: ["salbutamol", "formoterol", "salmeterol"],
    area: "Respiratorio",
    route: "Inhalada",
  },
  {
    id: "penicilinas",
    name: "Penicilinas",
    examples: ["penicilina G", "amoxicilina", "ampicilina"],
    area: "Anti-infecciosos",
    route: "Oral / IM / IV",
  },
  {
    id: "benzodiacepinas",
    name: "Benzodiacepinas",
    examples: ["diazepam", "lorazepam", "alprazolam"],
    area: "Sistema nervioso",
    route: "Oral / IV (según fármaco)",
  },
  {
    id: "isrs",
    name: "Antidepresivos ISRS",
    examples: ["sertralina", "fluoxetina", "citalopram"],
    area: "Psiquiatría",
    route: "Oral",
  },

];

// Menú móvil
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".app-nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });

  nav.addEventListener("click", (e) => {
    if (e.target.matches(".nav-link")) {
      nav.classList.remove("is-open");
    }
  });
}

// Búsqueda rápida en index.html
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

if (searchInput && searchResults) {
  const renderResults = (query = "") => {
    const q = query.toLowerCase().trim();
    const filtered = DRUG_CLASSES.filter((item) => {
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.examples.some((ex) => ex.toLowerCase().includes(q))
      );
    });

    searchResults.innerHTML = filtered
      .map(
        (item) => `
        <article class="info-card">
          <h3>${item.name}</h3>
          <p class="chip">${item.area}</p>
          <p>Vía(s) habitual(es): ${item.route}</p>
          <p style="margin-top: .35rem; color: #a0a0b5;">
            Ejemplos: ${item.examples.join(", ")}.
          </p>
          <a class="card-link" href="clases.html">
            Ver detalles en clases →
          </a>
        </article>
      `
      )
      .join("");
  };

  renderResults();

  searchInput.addEventListener("input", (e) => {
    renderResults(e.target.value);
  });
}

// Modal en clases.html
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");

const MODAL_TEXT = {
  "beta-bloqueantes": {
    title: "Beta-bloqueantes",
    html: `
      <p>
        Se emplean con frecuencia en hipertensión, cardiopatía isquémica y
        algunas arritmias, siempre ajustando a la situación clínica individual.
      </p>
      <p>
        Pueden reducir la frecuencia cardiaca y la contractilidad miocárdica,
        por lo que requieren precaución en pacientes con bradicardia o bloqueo AV.
      </p>
    `,
  },
  aine: {
    title: "AINE",
    html: `
      <p>
        Útiles para el tratamiento sintomático de dolor leve a moderado, fiebre
        y procesos inflamatorios de diversa etiología.
      </p>
      <p>
        Pueden asociarse a riesgo gastrointestinal, renal y cardiovascular,
        por lo que su uso prolongado debe valorarse cuidadosamente.
      </p>
    `,
  },
  ieca: {
    title: "Inhibidores de la ECA",
    html: `
      <p>
        Fármacos clave en el manejo de hipertensión arterial y en la prevención
        de progresión de nefropatía en determinados pacientes.
      </p>
      <p>
        Pueden producir tos seca y, en raros casos, angioedema; se monitoriza
        función renal y potasio sérico durante su uso.
      </p>
    `,
  },
  estatinas: {
    title: "Estatinas",
    html: `
      <p>
        Constituyen la base del tratamiento hipolipemiante para reducir riesgo
        cardiovascular en pacientes seleccionados.
      </p>
      <p>
        Es importante vigilar síntomas musculares y, en algunos casos, enzimas
        hepáticas, de acuerdo con las guías clínicas vigentes.
      </p>
    `,
  },
};

if (modal && modalContent) {
  document.addEventListener("click", (e) => {
    // Abrir modal
    const openBtn = e.target.closest("[data-open-modal]");
    if (openBtn) {
      const key = openBtn.getAttribute("data-open-modal");
      const info = MODAL_TEXT[key];
      if (info) {
        modalContent.innerHTML = `
          <h2>${info.title}</h2>
          ${info.html}
          <p style="margin-top:.6rem; font-size:.85rem; color:#a0a0b5;">
            Información resumida con fines educativos. Verifica siempre en guías y
            bases de datos oficiales antes de tomar decisiones clínicas.
          </p>
        `;
        modal.classList.add("is-open");
      }
    }

    // Cerrar modal
    if (e.target.matches("[data-close-modal]")) {
      modal.classList.remove("is-open");
    }
  });

  // Cerrar con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.remove("is-open");
    }
  });
}
