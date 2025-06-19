(function(){
  // ——— Styles —————————————————————————————————————————————————————
  const style = document.createElement('style');
  style.textContent = `
    #cheatPanel {
      position: fixed;
      top: 20px;
      left: 20px;
      width: 220px;
      background: rgba(0,0,0,0.7);
      color: #fff;
      font-family: sans-serif;
      border-radius: 8px;
      padding: 16px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 16px;
      cursor: move;               /* indicate draggable */
      user-select: none;
    }
    #cheatPanel .section { display: flex; flex-direction: column; gap: 8px; }
    #cheatPanel .controls { display: flex; gap: 8px; align-items: center; }
    #cheatPanel button {
      padding: 6px 12px; border: none; border-radius: 4px;
      background: #333; color: #fff; cursor: pointer; font-size: 14px;
    }
    #cheatPanel input[type="text"] {
      width: 50px; padding: 4px 8px;
      border-radius: 4px; border: none;
      font-size: 14px; text-align: center;
    }
    #cheatPanel input[type="range"] { width: 100%; }
    #cheatPanel label { font-size: 14px; }
  `;
  document.head.appendChild(style);

  // ——— Build Panel ——————————————————————————————————————————————————
  const panel = document.createElement('div');
  panel.id = 'cheatPanel';

  panel.innerHTML = `
    <div class="section">
      <button id="spawnBtn">Bot Spawner</button>
      <div id="spawnControls" class="controls" style="display:none">
        <input id="spawnInput" type="text" maxlength="2" placeholder="##" pattern="[A-Za-z0-9]{1,2}">
        <button id="spawnGo">Spawn</button>
      </div>
    </div>
    <div class="section">
      <button id="antiBtn">Anti Bush: Off</button>
    </div>
    <div class="section">
      <label for="zoomSlider">Zoom Hack: <span id="zoomValue">1.000</span></label>
      <input id="zoomSlider" type="range" min="1000" max="5000" step="1" value="1000">
    </div>
  `;
  document.body.appendChild(panel);

  // ——— Dragging Logic ——————————————————————————————————————————————————
  panel.addEventListener('pointerdown', e => {
    // only start drag if clicking the panel background (not inputs/buttons)
    if (e.target !== panel) return;
    const startX = e.clientX, startY = e.clientY;
    const origX = panel.offsetLeft, origY = panel.offsetTop;

    function onPointerMove(e) {
      panel.style.left = origX + (e.clientX - startX) + 'px';
      panel.style.top  = origY + (e.clientY - startY) + 'px';
    }
    function onPointerUp() {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    }
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  });

  // ——— Wire up controls ——————————————————————————————————————————————————

  // Bot Spawner
  const spawnBtn = document.getElementById('spawnBtn'),
        spawnControls = document.getElementById('spawnControls'),
        spawnInput = document.getElementById('spawnInput'),
        spawnGo    = document.getElementById('spawnGo');
  spawnBtn.addEventListener('click', () => {
    spawnControls.style.display = spawnControls.style.display === 'none' ? 'flex' : 'none';
  });
  spawnGo.addEventListener('click', () => {
    const v = spawnInput.value.trim();
    if (!/^[A-Za-z0-9]{1,2}$/.test(v)) {
      return alert('Enter 1–2 alphanumeric chars');
    }
    alert(`${v} bots have spawned into the server.`);
  });

  // Anti Bush
  const antiBtn = document.getElementById('antiBtn');
  let antiOn = false;
  antiBtn.addEventListener('click', () => {
    antiOn = !antiOn;
    antiBtn.textContent = `Anti Bush: ${antiOn ? 'On' : 'Off'}`;
  });

  // Zoom Hack
  const zoomSlider = document.getElementById('zoomSlider'),
        zoomValue  = document.getElementById('zoomValue');
  zoomSlider.addEventListener('input', () => {
    const z = (zoomSlider.value / 1000).toFixed(3);
    zoomValue.textContent = z;
    // Example: apply zoom: taro.client.setZoom(Number(z));
  });
})();
