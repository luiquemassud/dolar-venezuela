const API_RATES = {
  USD: {
    oficial: "https://ve.dolarapi.com/v1/dolares/oficial",
    paralelo: "https://ve.dolarapi.com/v1/dolares/paralelo"
  },
  EUR: {
    oficial: "https://ve.dolarapi.com/v1/euros/oficial"
  }
};

const rates = {
  USD: { oficial: null, oficialFecha: null, paralelo: null, paraleloFecha: null },
  EUR: { oficial: null, oficialFecha: null }
};

const state = {
  lang: localStorage.getItem("dv-lang") || "es",
  mode: localStorage.getItem("dv-mode") || "compare",
  statusMode: "initial"
};

const i18n = {
  es: {
    title: "Calculadora Venezuela",
    subtitle: "Compara Zelle, bolívares, dólar y euro con tasas actualizadas.",
    languageLabel: "Idioma",
    toolTitle: "Herramienta",
    modeCompare: "Comparar pago",
    modeConvert: "Bolívares a USD",
    compareTitle: "Datos de la compra",
    convertTitle: "Precio en bolívares",
    priceRef: "Precio de referencia",
    referenceCurrency: "Moneda de referencia",
    priceZelleUsd: "Precio por Zelle / USD directo",
    storeRate: "Tasa usada por la tienda",
    vesPer: "VES por",
    myRate: "Mi tasa real USD",
    vesAmount: "Precio en bolívares",
    conversionRate: "Tasa para convertir a USD",
    updateApi: "Actualizar tasas",
    useBcv: "Aplicar oficial tienda",
    useParallel: "Aplicar paralelo USD",
    useBcvRate: "Usar USD BCV",
    useParallelRate: "Usar USD paralelo",
    initialStatus: "Cargando tasas...",
    searching: "Buscando tasas...",
    updated: "Tasas actualizadas.",
    referenceDates: "Fechas de referencia",
    referenceDate: "Fecha",
    noReferenceDate: "Sin fecha",
    venezuelaTime: "Hora Venezuela",
    bcv: "BCV",
    parallel: "Paralelo",
    apiFail: "No pude obtener la API automáticamente.",
    fillManual: "Llena manualmente la tasa.",
    updateApiFirst: "Actualiza por API primero o completa el valor manualmente.",
    bestOption: "Mejor opción",
    estimatedValue: "Valor estimado",
    storeCharges: "Precio ref convertido a bolívares por la tienda:",
    ifExchange: "Costo real en USD si cambias dólares y pagas en bolívares:",
    ifPayZelle: "Costo si pagas por Zelle / USD directo:",
    usdAtBcv: "USD al BCV:",
    usdAtParallel: "USD al paralelo:",
    eurAtBcv: "EUR al BCV:",
    fillValues: "Ingresa los valores para comparar.",
    fillBolivares: "Ingresa el precio en bolívares.",
    economyLoss: "Ahorro/pérdida: —",
    selectedRate: "Tasa usada",
    bestExchange: "Mejor: cambiar dólares a bolívares y pagar en bolívares.",
    bestZelle: "Mejor: pagar por Zelle / USD directo.",
    same: "Da igual. Las dos opciones dan prácticamente el mismo valor.",
    youSave: "Ahorras",
    exchangingCostsMore: "Pagar en bolívares saldría",
    moreExpensive: "más caro",
    almostZero: "Diferencia casi cero.",
    refPlaceholder: "Ej: 100",
    zellePlaceholder: "Ej: 95",
    vesPlaceholder: "Ej: 1200",
    compareRule: "<strong>Regla:</strong><br>El precio de referencia puede estar en USD o EUR. La tienda convierte ese valor a bolívares con su tasa; después comparamos el costo real en USD contra Zelle/USD directo.",
    compareExample: "Ejemplo: tienda pide EUR 100 ref a tasa 702 Bs/EUR, pero Zelle cuesta US$ 95. La tienda cobra 70.200 Bs. Si tú cambias dólares a 791 Bs/USD, necesitas US$ 88,75.",
    convertRule: "<strong>Regla:</strong><br>Cuando el precio ya está en bolívares, divide el valor por la tasa que representa tu realidad. Para un viajero que cambia dólares, normalmente el paralelo USD es la referencia práctica.",
    convertExample: "Ejemplo: si algo cuesta 1.200 Bs y tu tasa real es 791 Bs/USD, el costo aproximado es US$ 1,52."
  },
  pt: {
    title: "Calculadora Venezuela",
    subtitle: "Compare Zelle, bolívares, dólar e euro com taxas atualizadas.",
    languageLabel: "Idioma",
    toolTitle: "Ferramenta",
    modeCompare: "Comparar pagamento",
    modeConvert: "Bolívares para USD",
    compareTitle: "Dados da compra",
    convertTitle: "Preço em bolívares",
    priceRef: "Preço de referência",
    referenceCurrency: "Moeda de referência",
    priceZelleUsd: "Preço por Zelle / USD direto",
    storeRate: "Taxa usada pela loja",
    vesPer: "VES por",
    myRate: "Minha taxa real USD",
    vesAmount: "Preço em bolívares",
    conversionRate: "Taxa para converter em USD",
    updateApi: "Atualizar taxas",
    useBcv: "Aplicar oficial loja",
    useParallel: "Aplicar paralelo USD",
    useBcvRate: "Usar USD BCV",
    useParallelRate: "Usar USD paralelo",
    initialStatus: "Carregando taxas...",
    searching: "Buscando taxas...",
    updated: "Taxas atualizadas.",
    referenceDates: "Datas de referência",
    referenceDate: "Data",
    noReferenceDate: "Sem data",
    venezuelaTime: "Hora da Venezuela",
    bcv: "BCV",
    parallel: "Paralelo",
    apiFail: "Não consegui puxar a API automaticamente.",
    fillManual: "Preencha a taxa manualmente.",
    updateApiFirst: "Atualize pela API primeiro ou preencha o valor manualmente.",
    bestOption: "Melhor opção",
    estimatedValue: "Valor estimado",
    storeCharges: "Preço ref convertido para bolívares pela loja:",
    ifExchange: "Custo real em USD se trocar dólares e pagar em bolívares:",
    ifPayZelle: "Custo se pagar por Zelle / USD direto:",
    usdAtBcv: "USD no BCV:",
    usdAtParallel: "USD no paralelo:",
    eurAtBcv: "EUR no BCV:",
    fillValues: "Preencha os valores para comparar.",
    fillBolivares: "Preencha o preço em bolívares.",
    economyLoss: "Economia/perda: —",
    selectedRate: "Taxa usada",
    bestExchange: "Melhor: trocar dólares para bolívares e pagar em bolívares.",
    bestZelle: "Melhor: pagar por Zelle / USD direto.",
    same: "Tanto faz. Os dois dão praticamente o mesmo valor.",
    youSave: "Você economiza",
    exchangingCostsMore: "Pagar em bolívares sairia",
    moreExpensive: "mais caro",
    almostZero: "Diferença quase zero.",
    refPlaceholder: "Ex: 100",
    zellePlaceholder: "Ex: 95",
    vesPlaceholder: "Ex: 1200",
    compareRule: "<strong>Regra:</strong><br>O preço de referência pode estar em USD ou EUR. A loja converte esse valor para bolívares com a taxa dela; depois comparamos o custo real em USD contra Zelle/USD direto.",
    compareExample: "Exemplo: loja pede EUR 100 ref na taxa 702 Bs/EUR, mas Zelle custa US$ 95. A loja cobra 70.200 Bs. Se você troca dólares a 791 Bs/USD, precisa de US$ 88,75.",
    convertRule: "<strong>Regra:</strong><br>Quando o preço já está em bolívares, divida o valor pela taxa que representa sua realidade. Para um viajante que troca dólares, normalmente o paralelo USD é a referência prática.",
    convertExample: "Exemplo: se algo custa 1.200 Bs e sua taxa real é 791 Bs/USD, o custo aproximado é US$ 1,52."
  },
  en: {
    title: "Venezuela Calculator",
    subtitle: "Compare Zelle, bolivars, dollars, and euros with updated rates.",
    languageLabel: "Language",
    toolTitle: "Tool",
    modeCompare: "Compare payment",
    modeConvert: "Bolivars to USD",
    compareTitle: "Purchase details",
    convertTitle: "Price in bolivars",
    priceRef: "Reference price",
    referenceCurrency: "Reference currency",
    priceZelleUsd: "Zelle / direct USD price",
    storeRate: "Rate used by the store",
    vesPer: "VES per",
    myRate: "My real USD rate",
    vesAmount: "Price in bolivars",
    conversionRate: "Rate to convert to USD",
    updateApi: "Update rates",
    useBcv: "Apply official store",
    useParallel: "Apply USD parallel",
    useBcvRate: "Use USD BCV",
    useParallelRate: "Use USD parallel",
    initialStatus: "Loading rates...",
    searching: "Fetching rates...",
    updated: "Rates updated.",
    referenceDates: "Reference dates",
    referenceDate: "Date",
    noReferenceDate: "No date",
    venezuelaTime: "Venezuela time",
    bcv: "BCV",
    parallel: "Parallel",
    apiFail: "Could not fetch the API automatically.",
    fillManual: "Fill in the rate manually.",
    updateApiFirst: "Update via API first or fill in the value manually.",
    bestOption: "Best option",
    estimatedValue: "Estimated value",
    storeCharges: "Reference price converted to bolivars by the store:",
    ifExchange: "Real USD cost if you exchange dollars and pay in bolivars:",
    ifPayZelle: "Cost if you pay via Zelle / direct USD:",
    usdAtBcv: "USD at BCV:",
    usdAtParallel: "USD at parallel:",
    eurAtBcv: "EUR at BCV:",
    fillValues: "Enter the values to compare.",
    fillBolivares: "Enter the price in bolivars.",
    economyLoss: "Savings/loss: —",
    selectedRate: "Rate used",
    bestExchange: "Best: exchange dollars into bolivars and pay in bolivars.",
    bestZelle: "Best: pay via Zelle / direct USD.",
    same: "Either option is basically the same.",
    youSave: "You save",
    exchangingCostsMore: "Paying in bolivars would cost",
    moreExpensive: "more",
    almostZero: "Almost no difference.",
    refPlaceholder: "Ex: 100",
    zellePlaceholder: "Ex: 95",
    vesPlaceholder: "Ex: 1200",
    compareRule: "<strong>Rule:</strong><br>The reference price can be in USD or EUR. The store converts it to bolivars with its rate; then we compare the real USD cost against Zelle/direct USD.",
    compareExample: "Example: store asks EUR 100 ref at 702 Bs/EUR, but Zelle is US$ 95. The store charges 70,200 Bs. If you exchange dollars at 791 Bs/USD, you need US$ 88.75.",
    convertRule: "<strong>Rule:</strong><br>When the price is already in bolivars, divide it by the rate that matches your reality. For a traveler exchanging dollars, USD parallel is usually the practical reference.",
    convertExample: "Example: if something costs 1,200 Bs and your real rate is 791 Bs/USD, the approximate cost is US$ 1.52."
  }
};

const app = document.getElementById("app");
const el = id => document.getElementById(id);
const t = key => i18n[state.lang][key];

function renderShell() {
  app.innerHTML = `
    <div class="wrap">
      <header class="topbar">
        <div class="brand">
          <h1 data-i18n="title"></h1>
          <div class="sub" data-i18n="subtitle"></div>
        </div>

        <select id="language" class="language-pill" aria-label="Language">
          <option value="es">🇻🇪 ES</option>
          <option value="pt">🇧🇷 PT</option>
          <option value="en">🇺🇸 EN</option>
        </select>
      </header>

      <main class="stack">
        <section class="card">
          <div class="card-title" data-i18n="toolTitle"></div>
          <div class="segmented mode-switch" role="radiogroup" aria-label="Tool">
            <label>
              <input type="radio" name="mode" value="compare">
              <span data-i18n="modeCompare"></span>
            </label>
            <label>
              <input type="radio" name="mode" value="convert">
              <span data-i18n="modeConvert"></span>
            </label>
          </div>
        </section>

        <section id="comparePanel" class="card">
          <div class="card-title" data-i18n="compareTitle"></div>

          <div class="grid">
            <div>
              <label id="priceRefLabel" for="precoUsd"></label>
              <input id="precoUsd" type="number" step="0.01" inputmode="decimal">
            </div>

            <div>
              <label data-i18n="referenceCurrency"></label>
              <div class="segmented two" role="radiogroup" aria-label="Reference currency">
                <label>
                  <input type="radio" name="moedaRef" value="USD">
                  <span>USD</span>
                </label>
                <label>
                  <input type="radio" name="moedaRef" value="EUR">
                  <span>EUR</span>
                </label>
              </div>
            </div>
          </div>

          <div style="margin-top: 12px;">
            <label for="precoZelleUsd" data-i18n="priceZelleUsd"></label>
            <input id="precoZelleUsd" type="number" step="0.01" inputmode="decimal">
          </div>

          <div class="grid" style="margin-top: 12px;">
            <div>
              <label id="storeRateLabel" for="taxaLoja"></label>
              <input id="taxaLoja" type="number" step="0.01" inputmode="decimal">
            </div>

            <div>
              <label for="minhaTaxa" data-i18n="myRate"></label>
              <input id="minhaTaxa" type="number" step="0.01" inputmode="decimal">
            </div>
          </div>

          <div class="actions">
            <button id="updateRatesCompare" class="primary" type="button" data-i18n="updateApi"></button>
            <button id="useOfficialStore" class="secondary" type="button" data-i18n="useBcv"></button>
            <button id="useParallelCompare" class="secondary" type="button" data-i18n="useParallel"></button>
          </div>
        </section>

        <section id="convertPanel" class="card">
          <div class="card-title" data-i18n="convertTitle"></div>

          <div class="grid">
            <div>
              <label for="valorVes" data-i18n="vesAmount"></label>
              <input id="valorVes" type="number" step="0.01" inputmode="decimal">
            </div>

            <div>
              <label for="taxaConversaoUsd" data-i18n="conversionRate"></label>
              <input id="taxaConversaoUsd" type="number" step="0.01" inputmode="decimal">
            </div>
          </div>

          <div class="actions">
            <button id="updateRatesConvert" class="primary" type="button" data-i18n="updateApi"></button>
            <button id="useBcvConvert" class="secondary" type="button" data-i18n="useBcvRate"></button>
            <button id="useParallelConvert" class="secondary" type="button" data-i18n="useParallelRate"></button>
          </div>
        </section>

        <section class="card">
          <div id="status" class="status-panel"></div>
          <pre id="debug" class="debug"></pre>
        </section>

        <section id="compareResult" class="card result-card">
          <div class="decision-box">
            <div class="result-line" data-i18n="bestOption"></div>
            <div id="decisao" class="result-main"></div>
            <div id="economia" class="pill"></div>
          </div>

          <div class="metrics-grid">
            <div class="metric">
              <div class="result-line" data-i18n="storeCharges"></div>
              <div id="precoVes" class="big-number">—</div>
            </div>
            <div class="metric">
              <div class="result-line" data-i18n="ifExchange"></div>
              <div id="custoRealUsd" class="big-number">—</div>
            </div>
            <div class="metric">
              <div class="result-line" data-i18n="ifPayZelle"></div>
              <div id="pagandoZelle" class="big-number">—</div>
            </div>
          </div>
        </section>

        <section id="convertResult" class="card result-card">
          <div class="decision-box">
            <div class="result-line" data-i18n="estimatedValue"></div>
            <div id="valorConvertidoUsd" class="result-main"></div>
            <div id="taxaConvertida" class="pill"></div>
          </div>

          <div class="metrics-grid">
            <div class="metric">
              <div class="result-line" data-i18n="usdAtBcv"></div>
              <div id="usdBcvResultado" class="big-number">—</div>
            </div>
            <div class="metric">
              <div class="result-line" data-i18n="usdAtParallel"></div>
              <div id="usdParaleloResultado" class="big-number">—</div>
            </div>
            <div class="metric">
              <div class="result-line" data-i18n="eurAtBcv"></div>
              <div id="eurBcvResultado" class="big-number">—</div>
            </div>
          </div>
        </section>

        <section class="card">
          <div class="result-line" id="ruleText"></div>
        </section>

        <section class="card mini" id="exampleText"></section>
      </main>
    </div>
  `;
}

function wireEvents() {
  el("language").addEventListener("change", event => {
    state.lang = event.target.value;
    localStorage.setItem("dv-lang", state.lang);
    applyLanguage();
  });

  document.querySelectorAll('input[name="mode"]').forEach(input => {
    input.addEventListener("change", () => setMode(input.value));
  });

  document.querySelectorAll('input[name="moedaRef"]').forEach(input => {
    input.addEventListener("change", () => {
      updateModeLabels();
      fillOfficialStoreRate();
      calculateCompare();
    });
  });

  ["precoUsd", "precoZelleUsd", "taxaLoja", "minhaTaxa"].forEach(id => {
    el(id).addEventListener("input", calculateCompare);
    el(id).addEventListener("change", calculateCompare);
  });

  ["valorVes", "taxaConversaoUsd"].forEach(id => {
    el(id).addEventListener("input", calculateConvert);
    el(id).addEventListener("change", calculateConvert);
  });

  el("updateRatesCompare").addEventListener("click", loadRates);
  el("updateRatesConvert").addEventListener("click", loadRates);
  el("useOfficialStore").addEventListener("click", useOfficialStoreRate);
  el("useParallelCompare").addEventListener("click", useParallelCompareRate);
  el("useBcvConvert").addEventListener("click", useBcvConvertRate);
  el("useParallelConvert").addEventListener("click", useParallelConvertRate);
}

function locale() {
  const locales = { es: "es-VE", pt: "pt-BR", en: "en-US" };
  return locales[state.lang] || "es-VE";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function selectedValue(name, fallback) {
  return document.querySelector(`input[name="${name}"]:checked`)?.value || fallback;
}

function setRadioValue(name, value) {
  const input = document.querySelector(`input[name="${name}"][value="${value}"]`);
  if (input) input.checked = true;
}

function numberFrom(id) {
  return Number(String(el(id).value).replace(",", ".")) || 0;
}

function setInput(id, value) {
  el(id).value = value == null ? "" : String(value);
}

function formatTaxRate(value) {
  return Number(value).toFixed(2);
}

function formatVES(value) {
  return new Intl.NumberFormat("es-VE", {
    style: "currency",
    currency: "VES",
    maximumFractionDigits: 2
  }).format(value);
}

function formatCurrency(value, currency) {
  return new Intl.NumberFormat(currency === "EUR" ? "de-DE" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  }).format(value);
}

function formatUSD(value) {
  return formatCurrency(value, "USD");
}

function writeDebug(text) {
  const debug = el("debug");
  const now = new Date().toLocaleTimeString();
  debug.textContent += `[${now}] ${text}\n`;
}

function extractValue(obj) {
  if (!obj) return null;

  const possibleValues = [
    obj.promedio,
    obj.venta,
    obj.compra,
    obj.valor,
    obj.price,
    obj.rate
  ];

  for (const value of possibleValues) {
    const number = Number(String(value).replace(",", "."));
    if (number > 0) return number;
  }

  return null;
}

function extractDate(obj) {
  return obj?.fechaActualizacion || obj?.updatedAt || obj?.date || null;
}

function formatReferenceDate(value) {
  if (!value) return t("noReferenceDate");

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const hasUsefulTime = !/T00:00:00(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/.test(value);
  const options = hasUsefulTime
    ? { dateStyle: "medium", timeStyle: "short", timeZone: "America/Caracas" }
    : { dateStyle: "medium", timeZone: "America/Caracas" };

  return new Intl.DateTimeFormat(locale(), options).format(date);
}

function rateItem(name, value, date) {
  return `
    <div class="rate-item">
      <span class="rate-name">${escapeHtml(name)}</span>
      <span class="rate-value">${escapeHtml(formatTaxRate(value))}</span>
      <span class="rate-date">${escapeHtml(t("referenceDate"))}: ${escapeHtml(formatReferenceDate(date))}</span>
    </div>
  `;
}

function applyLanguage() {
  document.documentElement.lang = state.lang;
  document.title = t("title");
  el("language").value = state.lang;

  document.querySelectorAll("[data-i18n]").forEach(node => {
    node.textContent = t(node.getAttribute("data-i18n"));
  });

  el("precoUsd").placeholder = t("refPlaceholder");
  el("precoZelleUsd").placeholder = t("zellePlaceholder");
  el("valorVes").placeholder = t("vesPlaceholder");
  el("taxaConversaoUsd").placeholder = "791.03";

  updateModeLabels();
  updateModeContent();
  renderStatus();
  calculateCompare();
  calculateConvert();
}

function setMode(mode) {
  state.mode = mode;
  localStorage.setItem("dv-mode", mode);
  updateModeContent();
}

function updateModeContent() {
  setRadioValue("mode", state.mode);
  const compareMode = state.mode === "compare";

  el("comparePanel").hidden = !compareMode;
  el("compareResult").hidden = !compareMode;
  el("convertPanel").hidden = compareMode;
  el("convertResult").hidden = compareMode;
  el("ruleText").innerHTML = compareMode ? t("compareRule") : t("convertRule");
  el("exampleText").innerHTML = compareMode ? t("compareExample") : t("convertExample");

  if (compareMode) {
    calculateCompare();
  } else {
    calculateConvert();
  }
}

function referenceCurrency() {
  return selectedValue("moedaRef", "USD");
}

function updateModeLabels() {
  const currency = referenceCurrency();
  el("priceRefLabel").textContent = `${t("priceRef")} (${currency})`;
  el("storeRateLabel").textContent = `${t("storeRate")} (${t("vesPer")} ${currency})`;
}

function renderStatus() {
  const status = el("status");

  if (state.statusMode === "rates" && rates.USD.oficial && rates.USD.paralelo && rates.EUR.oficial) {
    status.innerHTML = `
      <div class="status-head">
        <span class="status-title ok">${escapeHtml(t("updated"))}</span>
        <span class="status-meta">${escapeHtml(t("referenceDates"))} · ${escapeHtml(t("venezuelaTime"))}</span>
      </div>
      <div class="rates-grid">
        ${rateItem(`USD ${t("bcv")}`, rates.USD.oficial, rates.USD.oficialFecha)}
        ${rateItem(`USD ${t("parallel")}`, rates.USD.paralelo, rates.USD.paraleloFecha)}
        ${rateItem(`EUR ${t("bcv")}`, rates.EUR.oficial, rates.EUR.oficialFecha)}
      </div>
    `;
    return;
  }

  if (state.statusMode === "error") {
    status.innerHTML =
      `<span class="danger">${escapeHtml(t("apiFail"))}</span><br>` +
      `${escapeHtml(t("fillManual"))}`;
    return;
  }

  const key = state.statusMode === "loading" ? "searching" : "initialStatus";
  status.innerHTML = `<span class="status-title">${escapeHtml(t(key))}</span>`;
}

function setBlankCompareResult() {
  el("precoVes").textContent = "—";
  el("custoRealUsd").textContent = "—";
  el("pagandoZelle").textContent = "—";
  el("decisao").textContent = t("fillValues");
  el("economia").textContent = t("economyLoss");
  el("economia").className = "pill";
}

function calculateCompare() {
  const currency = referenceCurrency();
  const referencePrice = numberFrom("precoUsd");
  const zelleInput = numberFrom("precoZelleUsd");
  const storeRate = numberFrom("taxaLoja");
  const realUsdRate = numberFrom("minhaTaxa");
  const zelleUsd = zelleInput || (currency === "USD" ? referencePrice : 0);

  if (!referencePrice || !zelleUsd || !storeRate || !realUsdRate) {
    setBlankCompareResult();
    return;
  }

  const bolivarsCharged = referencePrice * storeRate;
  const realUsdCost = bolivarsCharged / realUsdRate;
  const savings = zelleUsd - realUsdCost;
  const percentage = (savings / zelleUsd) * 100;

  el("precoVes").textContent = formatVES(bolivarsCharged);
  el("custoRealUsd").textContent = formatUSD(realUsdCost);
  el("pagandoZelle").textContent = formatUSD(zelleUsd);

  if (savings > 0.005) {
    el("decisao").textContent = t("bestExchange");
    el("economia").textContent = `${t("youSave")} ${formatUSD(savings)} (${percentage.toFixed(1)}%)`;
    el("economia").className = "pill good";
  } else if (savings < -0.005) {
    el("decisao").textContent = t("bestZelle");
    el("economia").textContent = `${t("exchangingCostsMore")} ${formatUSD(Math.abs(savings))} ${t("moreExpensive")} (${Math.abs(percentage).toFixed(1)}%)`;
    el("economia").className = "pill bad";
  } else {
    el("decisao").textContent = t("same");
    el("economia").textContent = t("almostZero");
    el("economia").className = "pill";
  }
}

function setBlankConvertResult() {
  el("valorConvertidoUsd").textContent = t("fillBolivares");
  el("taxaConvertida").textContent = `${t("selectedRate")}: —`;
  el("taxaConvertida").className = "pill";
  el("usdBcvResultado").textContent = "—";
  el("usdParaleloResultado").textContent = "—";
  el("eurBcvResultado").textContent = "—";
}

function calculateConvert() {
  const bolivars = numberFrom("valorVes");
  const selectedRate = numberFrom("taxaConversaoUsd");

  if (!bolivars || !selectedRate) {
    setBlankConvertResult();
    return;
  }

  el("valorConvertidoUsd").textContent = formatUSD(bolivars / selectedRate);
  el("taxaConvertida").textContent = `${t("selectedRate")}: ${formatTaxRate(selectedRate)} VES/USD`;
  el("taxaConvertida").className = "pill good";

  el("usdBcvResultado").textContent = rates.USD.oficial
    ? formatUSD(bolivars / rates.USD.oficial)
    : "—";

  el("usdParaleloResultado").textContent = rates.USD.paralelo
    ? formatUSD(bolivars / rates.USD.paralelo)
    : "—";

  el("eurBcvResultado").textContent = rates.EUR.oficial
    ? formatCurrency(bolivars / rates.EUR.oficial, "EUR")
    : "—";
}

async function fetchJsonDirect(url) {
  writeDebug("Trying direct: " + url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("HTTP direct " + res.status);
  return await res.json();
}

async function fetchJsonWithProxy(url) {
  const proxy = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url);
  writeDebug("Trying proxy: " + proxy);
  const res = await fetch(proxy, { cache: "no-store" });
  if (!res.ok) throw new Error("HTTP proxy " + res.status);
  return await res.json();
}

async function fetchJson(url) {
  try {
    return await fetchJsonDirect(url);
  } catch (directError) {
    writeDebug("Direct failed: " + directError.message);
    return await fetchJsonWithProxy(url);
  }
}

async function loadRates() {
  state.statusMode = "loading";
  renderStatus();
  el("debug").textContent = "";

  try {
    const [usdOfficial, usdParallel, eurOfficial] = await Promise.all([
      fetchJson(API_RATES.USD.oficial),
      fetchJson(API_RATES.USD.paralelo),
      fetchJson(API_RATES.EUR.oficial)
    ]);

    const usdOfficialValue = extractValue(usdOfficial);
    const usdParallelValue = extractValue(usdParallel);
    const eurOfficialValue = extractValue(eurOfficial);

    if (!usdOfficialValue || !usdParallelValue || !eurOfficialValue) {
      throw new Error("Could not identify API values.");
    }

    rates.USD.oficial = usdOfficialValue;
    rates.USD.paralelo = usdParallelValue;
    rates.USD.oficialFecha = extractDate(usdOfficial);
    rates.USD.paraleloFecha = extractDate(usdParallel);
    rates.EUR.oficial = eurOfficialValue;
    rates.EUR.oficialFecha = extractDate(eurOfficial);

    fillAutomaticRates();

    state.statusMode = "rates";
    renderStatus();
    calculateCompare();
    calculateConvert();
  } catch (err) {
    writeDebug("FINAL ERROR: " + err.message);
    state.statusMode = "error";
    renderStatus();
  }
}

function fillOfficialStoreRate() {
  const currency = referenceCurrency();
  const officialRate = rates[currency]?.oficial;
  if (officialRate) {
    setInput("taxaLoja", formatTaxRate(officialRate));
  }
}

function fillAutomaticRates() {
  fillOfficialStoreRate();

  if (rates.USD.paralelo) {
    setInput("minhaTaxa", formatTaxRate(rates.USD.paralelo));
    setInput("taxaConversaoUsd", formatTaxRate(rates.USD.paralelo));
  }
}

function useOfficialStoreRate() {
  const currency = referenceCurrency();
  const officialRate = rates[currency]?.oficial;

  if (officialRate) {
    setInput("taxaLoja", formatTaxRate(officialRate));
    calculateCompare();
  } else {
    el("status").innerHTML = `<span class="danger">${t("updateApiFirst")}</span>`;
  }
}

function useParallelCompareRate() {
  if (rates.USD.paralelo) {
    setInput("minhaTaxa", formatTaxRate(rates.USD.paralelo));
    calculateCompare();
  } else {
    el("status").innerHTML = `<span class="danger">${t("updateApiFirst")}</span>`;
  }
}

function useBcvConvertRate() {
  if (rates.USD.oficial) {
    setInput("taxaConversaoUsd", formatTaxRate(rates.USD.oficial));
    calculateConvert();
  } else {
    el("status").innerHTML = `<span class="danger">${t("updateApiFirst")}</span>`;
  }
}

function useParallelConvertRate() {
  if (rates.USD.paralelo) {
    setInput("taxaConversaoUsd", formatTaxRate(rates.USD.paralelo));
    calculateConvert();
  } else {
    el("status").innerHTML = `<span class="danger">${t("updateApiFirst")}</span>`;
  }
}

function init() {
  renderShell();
  wireEvents();
  setRadioValue("mode", state.mode);
  setRadioValue("moedaRef", "USD");
  applyLanguage();
  loadRates();
}

init();
