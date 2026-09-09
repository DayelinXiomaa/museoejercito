// Modal Manager for handling UI dialogs matching Images 1, 2, 3 and exhibit details

export class ModalManager {
  constructor(audioManager, onStartTour) {
    this.audioManager = audioManager;
    this.onStartTour = onStartTour;

    this.createDomContainers();
  }

  createDomContainers() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'museum-modal-overlay hidden';
    document.body.appendChild(this.overlay);

    this.modalBox = document.createElement('div');
    this.modalBox.className = 'museum-modal-box';
    this.overlay.appendChild(this.modalBox);

    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.closeModal();
      }
    });
  }

  showWelcomeModal() {
    this.audioManager.playUiClickSound();

    this.modalBox.innerHTML = `
      <div class="modal-card welcome-card">
        <button class="modal-close-btn" id="btnCloseWelcome" aria-label="Cerrar">&times;</button>
        <div class="welcome-header-image">
          <div class="welcome-badge">MUSEO VIRTUAL DEL EJÉRCITO</div>
        </div>
        <div class="welcome-content">
          <p class="welcome-text">
            Bienvenido, en esta visita interactiva podrás navegar y conocer el <strong>Museo del Ejército del Perú</strong>, espacio de memoria, historia militar y tributo a la riqueza patrimonial y heroicidad de nuestra Patria.
          </p>
          <button class="btn-empezar" id="btnEmpezar">EMPEZAR</button>
        </div>
      </div>
    `;

    this.openModal();

    document.getElementById('btnEmpezar').addEventListener('click', () => {
      this.closeModal();
      if (typeof this.onStartTour === 'function') {
        this.onStartTour();
      }
    });

    document.getElementById('btnCloseWelcome').addEventListener('click', () => {
      this.closeModal();
    });
  }

  showGuideModal() {
    this.audioManager.playUiClickSound();

    this.modalBox.innerHTML = `
      <div class="modal-card guide-card">
        <div class="guide-header">
          <h2>Guía del recorrido virtual</h2>
          <button class="modal-close-btn" id="btnCloseGuide" aria-label="Cerrar">&times;</button>
        </div>
        
        <div class="guide-body">
          <div class="guide-section">
            <h3>Menú de enlaces</h3>
            <ul class="guide-list">
              <li><span>Página web oficial</span> <span class="guide-icon">🌐</span></li>
              <li><span>Spotify Audio Guía</span> <span class="guide-icon">🎵</span></li>
              <li><span>Canal de YouTube</span> <span class="guide-icon">▶️</span></li>
              <li><span>Página de Facebook</span> <span class="guide-icon">📘</span></li>
            </ul>
          </div>

          <div class="guide-section">
            <h3>Menú de navegación</h3>
            <ul class="guide-list">
              <li><span>Mostrar/ocultar accesos directos a salas</span> <span class="guide-badge-ui">Puntos del Museo</span></li>
            </ul>
          </div>

          <div class="guide-section">
            <h3>Menú de herramientas</h3>
            <ul class="guide-list">
              <li><span>Mostrar/ocultar puntos de navegación (flechas)</span> <span class="guide-icon">👁️</span></li>
              <li><span>Ayuda - Guía de navegación</span> <span class="guide-icon">?</span></li>
            </ul>
          </div>

          <div class="guide-section highlight-box">
            <h3>Navegación en las salas</h3>
            <div class="guide-instruction-item">
              <div class="instruction-text">
                <strong>Mover el mouse presionando el clic izquierdo</strong> (o arrastrar dedo en pantalla táctil) para mover la vista del visor 360°.
              </div>
              <div class="instruction-icon">🖱️</div>
            </div>
            <div class="guide-instruction-item">
              <div class="instruction-text">
                <strong>Seleccionar el icono de flecha <span>(↑)</span></strong> en el suelo para desplazarse por la habitación.
              </div>
              <div class="instruction-icon">⬆️</div>
            </div>
            <div class="guide-instruction-item">
              <div class="instruction-text">
                <strong>Acceder a información temática e imágenes</strong> haciendo clic en las pantallas, tablets <span>(📱)</span> y cuadros <span>(🖼️)</span>.
              </div>
              <div class="instruction-icon">🖼️</div>
            </div>
            <div class="guide-instruction-item">
              <div class="instruction-text">
                <strong>Cartas manuscritas y libros antiguos</strong> en el mueble vitrina central <span>(✉️ / 📚)</span>.
              </div>
              <div class="instruction-icon">📜</div>
            </div>
            <div class="guide-instruction-item">
              <div class="instruction-text">
                <strong>Locución de audio integrada <span>(🔊)</span></strong> para escuchar narraciones guiadas.
              </div>
              <div class="instruction-icon">🔊</div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.openModal();

    document.getElementById('btnCloseGuide').addEventListener('click', () => {
      this.closeModal();
    });
  }

  showPresentationModal(presentationData) {
    this.audioManager.playUiClickSound();

    this.modalBox.innerHTML = `
      <div class="modal-card presentation-card">
        <button class="modal-close-btn" id="btnClosePres" aria-label="Cerrar">&times;</button>
        
        <div class="presentation-header">
          <div class="speaker-circle">
            <span class="speaker-icon">🔊</span>
          </div>
          <h2>PRESENTACIÓN</h2>
        </div>

        <div class="presentation-body">
          <div class="presentation-paragraphs">
            ${presentationData.text.split('\n\n').map(p => `<p>${p}</p>`).join('')}
          </div>

          <div class="audio-player-widget">
            <div class="audio-controls">
              <button class="btn-audio-play" id="btnAudioPlay">
                <span id="audioPlayIcon">▶</span> Escuchar Locución
              </button>
              <button class="btn-audio-stop" id="btnAudioStop">⏹ Detener</button>
            </div>
            <div class="audio-speed-selector">
              <label for="audioRateSelect">Velocidad:</label>
              <select id="audioRateSelect">
                <option value="0.9">0.9x Pausada</option>
                <option value="1.0" selected>1.0x Normal</option>
                <option value="1.2">1.2x Rápida</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    `;

    this.openModal();

    const btnPlay = document.getElementById('btnAudioPlay');
    const btnStop = document.getElementById('btnAudioStop');
    const rateSelect = document.getElementById('audioRateSelect');

    btnPlay.addEventListener('click', () => {
      if (this.audioManager.isPlaying) {
        this.audioManager.pauseText();
        btnPlay.innerHTML = '▶ Reanudar';
      } else if (this.audioManager.isPaused) {
        this.audioManager.resumeText();
        btnPlay.innerHTML = '⏸ Pausar';
      } else {
        this.audioManager.playText(presentationData.text, () => {
          btnPlay.innerHTML = '▶ Escuchar Locución';
        });
        btnPlay.innerHTML = '⏸ Pausar';
      }
    });

    btnStop.addEventListener('click', () => {
      this.audioManager.stopText();
      btnPlay.innerHTML = '▶ Escuchar Locución';
    });

    rateSelect.addEventListener('change', (e) => {
      this.audioManager.setRate(e.target.value);
    });

    document.getElementById('btnClosePres').addEventListener('click', () => {
      this.audioManager.stopText();
      this.closeModal();
    });
  }

  showExhibitDetailModal(itemData) {
    this.audioManager.playUiClickSound();

    let detailHtml = '';
    const title = itemData.title || itemData.name || 'Detalle de Exhibición';
    const type = itemData.type || 'pantalla';

    if (type === 'screen') {
      const data = itemData.data;
      detailHtml = `
        <div class="exhibit-screen-view">
          <div class="screen-hero-bar">
            <span class="screen-icon">${data.icon || '📜'}</span>
            <div>
              <h3>${data.title}</h3>
              <p class="subtitle">${data.subtitle || ''}</p>
            </div>
          </div>
          <div class="screen-summary">${data.content.summary}</div>
          <div class="screen-sections-grid">
            ${data.content.sections.map(sec => `
              <div class="screen-card-box">
                <h4>${sec.heading}</h4>
                <p>${sec.text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (type === 'carta') {
      const data = itemData.data;
      detailHtml = `
        <div class="exhibit-letter-view">
          <div class="letter-header-badge">DOCUMENTO MANUSCRITO ORIGINAL</div>
          <h3>${data.title}</h3>
          <p class="letter-meta"><strong>Fecha/Lugar:</strong> ${data.date} | <strong>Autor:</strong> ${data.author}</p>
          <div class="letter-transcript-box">
            <div class="letter-seal">PERÚ</div>
            <p class="transcript-text">${data.transcript.replace(/\n/g, '<br>')}</p>
          </div>
          <p class="letter-notes"><em>${data.details}</em></p>
        </div>
      `;
    } else if (type === 'libro') {
      const data = itemData.data;
      detailHtml = `
        <div class="exhibit-book-view">
          <div class="book-cover-badge">BIBLIOTECA HISTÓRICA DEL EJÉRCITO</div>
          <h3>${data.title}</h3>
          <p class="book-meta"><strong>Año de Edición:</strong> ${data.year} | <strong>Autoría:</strong> ${data.author}</p>
          <div class="book-content-box">
            <p><strong>Resumen de la Obra:</strong> ${data.summary}</p>
            <p><strong>Contenido del Tomo:</strong> ${data.contents}</p>
          </div>
          <p class="book-notes"><em>${data.details}</em></p>
        </div>
      `;
    } else {
      const data = itemData.data || itemData;
      detailHtml = `
        <div class="exhibit-generic-view">
          <h3>${data.title}</h3>
          <p class="summary-lead">${data.summary || ''}</p>
          <div class="details-body">${data.details || ''}</div>
        </div>
      `;
    }

    this.modalBox.innerHTML = `
      <div class="modal-card detail-card">
        <div class="detail-top-bar">
          <span class="detail-badge-tag">${type.toUpperCase()} INTERACTIVO</span>
          <button class="modal-close-btn" id="btnCloseDetail" aria-label="Cerrar">&times;</button>
        </div>

        <div class="detail-body">
          ${detailHtml}
        </div>

        <div class="detail-footer">
          <button class="btn-read-aloud" id="btnReadAloud">🔊 Escuchar Resumen en Audio</button>
        </div>
      </div>
    `;

    this.openModal();

    const readText = this.extractTextForSpeech(itemData);

    document.getElementById('btnReadAloud').addEventListener('click', () => {
      this.audioManager.playText(readText);
    });

    document.getElementById('btnCloseDetail').addEventListener('click', () => {
      this.audioManager.stopText();
      this.closeModal();
    });
  }

  extractTextForSpeech(itemData) {
    if (itemData.data && itemData.data.content) {
      const c = itemData.data.content;
      return `${itemData.title}. ${c.summary}. ` + c.sections.map(s => `${s.heading}: ${s.text}`).join('. ');
    }
    if (itemData.data && itemData.data.transcript) {
      return `${itemData.title}. ${itemData.data.transcript}`;
    }
    if (itemData.data && itemData.data.summary) {
      return `${itemData.title}. ${itemData.data.summary}. ${itemData.data.details || ''}`;
    }
    return itemData.title || '';
  }

  openModal() {
    this.overlay.classList.remove('hidden');
  }

  closeModal() {
    this.overlay.classList.add('hidden');
    this.modalBox.innerHTML = '';
  }
}
