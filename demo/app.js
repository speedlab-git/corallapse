// CoralLapse demo: step navigation and view toggles. No build step, no dependencies.
(function () {
  'use strict';
  var STEPS = [
    ['Add surveys', 'Video, images, labels'],
    ['Segment and classify', 'SAM 2 + classifier'],
    ['Reconstruct 4D', 'One model over time'],
    ['Explore', 'Novel views, 3D colonies'],
    ['Analyze change', 'Surface, class, colony'],
    ['Verified report', 'VLM + checker']
  ];
  var CHECK = '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 7.5l3 3 6-7" fill="none" stroke="#0B6E79" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var state = { step: 0, segData: 'clip', segView: 'masks', tool: 'add', prView: 'points', ex: 'scene', view: 0, fgb: 'pub' };

  var SEG = {
    masks: ['assets/key_masks.jpg', 'SAM masks for six colonies over the keyframe', 'masks'],
    rgb: ['assets/key_rgb.jpg', 'Keyframe from the sample reef clip', 'input'],
    depth: ['assets/key_depth.jpg', 'Per-frame depth, bright is near', 'depth']
  };
  var PR = {
    points: ['assets/pr_points.jpg', 'Pulley Ridge ROV photo with 50 expert CPCe points'],
    dense: ['assets/pr_dense.jpg', 'Baseline dense benthic map of the same photo']
  };
  var SCENE = [['assets/nv_a.jpg', 'yaw +1.8° pitch 0.6°'], ['assets/nv_b.jpg', 'yaw +21.7° pitch 11.4°'], ['assets/nv_c.jpg', 'yaw −20.6° pitch 7.2°']];
  var COLONY = [['assets/novel_0.jpg', 'view 1 of 3'], ['assets/novel_1.jpg', 'view 2 of 3'], ['assets/novel_2.jpg', 'view 3 of 3']];
  var FGB = {
    pub: ['assets/fgb19.jpg', 'Plot T3 mosaic, October 2019, as published', 'as published'],
    cc: ['assets/fgb19cc.jpg', 'Plot T3 mosaic, October 2019, colour-matched to 2022', 'colour-matched to 2022']
  };

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function img(id, src, alt) { var el = document.getElementById(id); el.src = src; el.alt = alt; }

  function renderNav() {
    var nav = document.getElementById('stepnav');
    nav.innerHTML = '';
    STEPS.forEach(function (s, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'step' + (i < state.step ? ' done' : '');
      if (i === state.step) b.setAttribute('aria-current', 'step');
      b.innerHTML = '<span class="n">' + (i < state.step ? CHECK : String(i + 1)) + '</span><span class="t"><b></b><span></span></span>';
      b.querySelector('b').textContent = s[0];
      b.querySelector('.t span').textContent = s[1];
      b.addEventListener('click', function () { go(i); });
      nav.appendChild(b);
    });
  }

  function render() {
    renderNav();
    $$('section.pane').forEach(function (p) { p.hidden = Number(p.dataset.step) !== state.step; });
    $$('[data-group]').forEach(function (g) {
      var key = g.dataset.group;
      $$('button[data-v]', g).forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.v === state[key])); });
    });
    $$('[data-show]').forEach(function (el) {
      var kv = el.dataset.show.split(':');
      el.hidden = state[kv[0]] !== kv[1];
    });
    var s = SEG[state.segView]; img('segImg', s[0], s[1]);
    $('#segCap').textContent = 'keyframe 14 / 23 · ' + s[2];
    var p = PR[state.prView]; img('prImg', p[0], p[1]);
    var fig = $('#exFig'), box = $('#angleBox');
    if (state.ex === 'tracks') {
      img('exImg', 'assets/track_t2.jpg', 'Points tracked on one colony through all frames');
      $('#exCap').textContent = '26 points · 23 frames';
      fig.classList.remove('light'); box.hidden = true;
    } else {
      var set = state.ex === 'scene' ? SCENE : COLONY, v = set[state.view];
      img('exImg', v[0], state.ex === 'scene' ? 'Novel view of the reconstructed reef' : 'Branching colony lifted to 3D');
      $('#exCap').textContent = (state.ex === 'scene' ? 'novel view · ' : 'colony 2 · ') + v[1];
      $('#exAngle').textContent = v[1];
      fig.classList.toggle('light', state.ex === 'colony'); box.hidden = false;
    }
    $('#yaw').value = state.view;
    var f = FGB[state.fgb]; img('fgbImg', f[0], f[1]);
    $('#fgbCap').textContent = 'Survey 1 · Oct 2019 · ' + f[2];
    if (state.step === 2) animateStages();
  }

  function go(i) {
    state.step = Math.max(0, Math.min(STEPS.length - 1, i));
    render();
    try { history.replaceState(null, '', '#step-' + (state.step + 1)); } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  var animated = false;
  function animateStages() {
    var bar = $('#prog');
    if (animated) { bar.style.width = '62.5%'; return; }
    animated = true; bar.style.width = '0';
    var done = $$('#stages li[data-done]');
    done.forEach(function (li) { li.style.opacity = '0.35'; });
    done.forEach(function (li, k) {
      setTimeout(function () { li.style.opacity = '1'; bar.style.width = ((k + 1) / 8 * 100) + '%'; }, 350 * (k + 1));
    });
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('button');
    if (!t) return;
    if (t.hasAttribute('data-next')) { go(state.step + 1); return; }
    if (t.hasAttribute('data-go')) { go(Number(t.dataset.go)); return; }
    var g = t.closest('[data-group]');
    if (g && t.dataset.v) {
      state[g.dataset.group] = t.dataset.v;
      if (g.dataset.group === 'ex') state.view = 0;
      render();
    }
  });
  $('#yaw').addEventListener('input', function (e) { state.view = Number(e.target.value); render(); });

  $('#up').addEventListener('change', function (e) {
    var n = e.target.files.length;
    $('#dropmsg').textContent = n ? n + ' file' + (n > 1 ? 's' : '') + ' selected (demo: not uploaded)' : 'Drop files here or browse';
    $('#drop').classList.toggle('has', n > 0);
  });

  $('#csv').addEventListener('click', function () {
    var rows = $$('#claims tr').map(function (tr) {
      return $$('th,td', tr).map(function (c) { return '"' + c.textContent.trim().replace(/"/g, '""') + '"'; }).join(',');
    });
    var blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'corallapse_plotT3_measurements.csv';
    document.body.appendChild(a); a.click(); a.remove();
  });
  $('#pdf').addEventListener('click', function () { window.print(); });

  var m = /#step-(\d)/.exec(location.hash);
  if (m) state.step = Math.max(0, Math.min(5, Number(m[1]) - 1));
  render();
})();
