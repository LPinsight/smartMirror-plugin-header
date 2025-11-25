class templatePlugin extends HTMLElement {
  async connectedCallback() {
    const config = this.config || {};  

    // Basis-URL aus Attribut
    const baseUrl = this.getAttribute('base-url');
    if (!baseUrl) throw new Error("base-url attribute is required");   

    // 1. CSS laden
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = `${baseUrl}/style.css`;
    this.appendChild(style);

    // 2. HTML laden
    const htmlResponse = await fetch(`${baseUrl}/template.html`);
    const html = await htmlResponse.text();
    this.innerHTML += html; // HTML in Shadow DOM oder direkt ins Element

    // 3. Logik
    

      
  }
}

customElements.define('smartmirror-plugin-template', templatePlugin);