import { SceneManager } from './modules/sceneManager.js';
import { AudioManager } from './modules/audioManager.js';
import { ModalManager } from './modules/modalManager.js';
import { PRESENTATION_DATA } from './modules/dataMuseum.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app');
  const locationNameEl = document.getElementById('locationName');
  const eyeIconEl = document.getElementById('eyeIcon');
  const btnSalasMenu = document.getElementById('btnSalasMenu');
  const salasDropdownMenu = document.getElementById('salasMenuDropdown');

  // Initialize Audio & Modal Managers
  const audioManager = new AudioManager();
  let sceneManager = null;

  const modalManager = new ModalManager(audioManager, () => {
    // Callback when clicking "EMPEZAR" on Welcome Modal
    audioManager.playNavigationChime();
    modalManager.showPresentationModal(PRESENTATION_DATA);
  });

  // Initialize 3D Scene Engine
  sceneManager = new SceneManager(
    container,
    (clickedItem) => {
      // On exhibit item clicked in 3D scene
      audioManager.playUiClickSound();
      modalManager.showExhibitDetailModal(clickedItem);
    },
    (newLocation) => {
      // On camera position change
      audioManager.playNavigationChime();
      locationNameEl.textContent = newLocation.name;
    }
  );

  // Setup Top Navigation Controls
  document.getElementById('btnPresentation').addEventListener('click', () => {
    modalManager.showPresentationModal(PRESENTATION_DATA);
  });

  document.getElementById('btnHelpGuide').addEventListener('click', () => {
    modalManager.showGuideModal();
  });

  document.getElementById('btnToggleArrows').addEventListener('click', () => {
    audioManager.playUiClickSound();
    const isVisible = sceneManager.toggleArrows();
    eyeIconEl.textContent = isVisible ? '👁️' : '🙈';
  });

  // Setup Salas Dropdown Menu
  btnSalasMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    audioManager.playUiClickSound();
    salasDropdownMenu.classList.toggle('hidden');
  });

  document.addEventListener('click', () => {
    if (!salasDropdownMenu.classList.contains('hidden')) {
      salasDropdownMenu.classList.add('hidden');
    }
  });

  document.querySelectorAll('.sala-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const posId = btn.getAttribute('data-pos');
      sceneManager.jumpToLocation(posId);
      salasDropdownMenu.classList.add('hidden');
    });
  });

  // Auto-launch Welcome Modal on app startup (Image 1 style)
  setTimeout(() => {
    modalManager.showWelcomeModal();
  }, 300);
});
