class headerPlugin extends HTMLElement {
  async connectedCallback() {
    const config = this.config || {};
    this.timezone = config["timezone"]

    const lat = config["lat"]?.trim();
    const lon = config["lon"]?.trim();

    if (lat ==="" || lon === "" || !Number.isFinite(Number(lat)) || !Number.isFinite(Number(lon))) {
      this.innerHTML = "<p class=\"configuration-message\">Bitte konfiguriere zuerst den Standort des Widgets.</p>";
      return
    }
    
    // Basis-URL aus Attribut
    const baseUrl = this.getAttribute('base-url');
    if (!baseUrl) throw new Error("base-url attribute is required");   
    this.baseUrl = baseUrl

    // 1. CSS laden
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = `${baseUrl}/style.css`;
    this.appendChild(style);

    // 2. HTML laden
    const htmlResponse = await fetch(`${baseUrl}/template.html`);
    let html = await htmlResponse.text();

    // Asset-Pfade ersetzen: ./assets/... → ${baseUrl}/assets/...
    html = html.replace(/\.\/assets\//g, `${baseUrl}/assets/`);

    this.innerHTML += html; // HTML in Shadow DOM oder direkt ins Element

    // 3. Logik

    // Module Ladern
    const timeModule = await import(`${baseUrl}/logic/time.js`);
    const weatherModule = await import(`${baseUrl}/logic/weather.js`);

    this.time = timeModule;
    this.weather = weatherModule;

    this.updateView()
    this.time.setCurrentTime(this, this.timezone);

    setInterval(() => this.time.setCurrentTime(this, this.timezone), 1000); // jede Sekunde
    setInterval(() => this.updateView(), 1000*60* config["Wetter_interval"]); // alle 30 minuten
  }

  updateView () {
    this.time.setCurrentDate(this, this.timezone);
    this.weather.getWeatherData(this, this.config, this.baseUrl)
  }
}

customElements.define('smartmirror-plugin-header', headerPlugin);