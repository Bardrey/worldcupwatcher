/* ============================================
   WORLDCUPWATCHER — Main Application
   ============================================ */

(function () {
  'use strict';

  // ── State ──────────────────────────────────
  let state = {
    favouriteTeam: null,
    currentTab: 'upcoming',
    currentView: 'list',
    currentFilter: 'all',
    map: null,
    markers: [],
    shareEventId: null,
    signedIn: false,
    userName: null,
    savedEvents: [],
    teamFilter: false,
    matchFilter: null,       // matchId to filter upcoming events
    fixturesSubTab: 'matches', // 'matches' or 'standings'
  };

  // ── Helpers ────────────────────────────────
  function getTeam(code) {
    return TEAMS_2026.find(t => t.code === code);
  }

  function getMatch(id) {
    return MATCHES.find(m => m.id === id);
  }

  function matchLabel(matchId) {
    const m = getMatch(matchId);
    if (!m) return '';
    const a = getTeam(m.teamA);
    const b = getTeam(m.teamB);
    return `${a?.flag || ''} ${a?.name || m.teamA} vs ${b?.name || m.teamB} ${b?.flag || ''}`;
  }

  function matchLabelShort(matchId) {
    const m = getMatch(matchId);
    if (!m) return '';
    const a = getTeam(m.teamA);
    const b = getTeam(m.teamB);
    return `${a?.name || m.teamA} vs ${b?.name || m.teamB}`;
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
  }

  function isThisWeek(dateStr) {
    const now = new Date();
    const d = new Date(dateStr + 'T00:00:00');
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);
    return d >= startOfWeek && d < endOfWeek;
  }

  function isMatchForTeam(matchId, teamCode) {
    const m = getMatch(matchId);
    return m && (m.teamA === teamCode || m.teamB === teamCode);
  }

  function eventMatchesTeam(event, teamCode) {
    return isMatchForTeam(event.matchId, teamCode);
  }

  // ── LocalStorage ───────────────────────────
  function loadTeam() {
    return localStorage.getItem('wcw_team');
  }

  function saveTeam(code) {
    localStorage.setItem('wcw_team', code);
  }

  function loadAuth() {
    const auth = localStorage.getItem('wcw_auth');
    if (auth) {
      const parsed = JSON.parse(auth);
      state.signedIn = true;
      state.userName = parsed.name;
    }
  }

  function saveAuth(name, provider) {
    state.signedIn = true;
    state.userName = name;
    localStorage.setItem('wcw_auth', JSON.stringify({ name, provider }));
  }

  function loadSavedEvents() {
    const saved = localStorage.getItem('wcw_saved');
    state.savedEvents = saved ? JSON.parse(saved) : [];
  }

  function saveFavourite(eventId) {
    if (!state.savedEvents.includes(eventId)) {
      state.savedEvents.push(eventId);
      localStorage.setItem('wcw_saved', JSON.stringify(state.savedEvents));
    }
  }

  function removeFavourite(eventId) {
    state.savedEvents = state.savedEvents.filter(id => id !== eventId);
    localStorage.setItem('wcw_saved', JSON.stringify(state.savedEvents));
  }

  function isFavourited(eventId) {
    return state.savedEvents.includes(eventId);
  }

  // ── DOM Refs ───────────────────────────────
  const $overlay = document.getElementById('team-select-overlay');
  const $teamGrid = document.getElementById('team-grid');
  const $teamSearch = document.getElementById('team-search');
  const $skipTeam = document.getElementById('skip-team');
  const $listView = document.getElementById('list-view');
  const $eventList = document.getElementById('event-list');
  const $noResults = document.getElementById('no-results');
  const $contentArea = document.getElementById('content-area');
  const $matchHighlight = document.getElementById('match-highlight');
  const $currentTeamFlag = document.getElementById('current-team-flag');
  const $btnTeamChange = document.getElementById('btn-team-change');
  const $shareModal = document.getElementById('share-modal');
  const $mapCard = document.getElementById('map-card');
  const $signinModal = document.getElementById('signin-modal');
  const $mapMode = document.getElementById('map-mode');
  const $btnOpenMap = document.getElementById('btn-open-map');
  const $btnCloseMap = document.getElementById('btn-close-map');

  // ── Team Selection ─────────────────────────
  function renderTeamGrid(filter = '') {
    const filtered = TEAMS_2026.filter(t =>
      t.name.toLowerCase().includes(filter.toLowerCase())
    );
    $teamGrid.innerHTML = filtered.map(t => `
      <button class="team-card" data-code="${t.code}" aria-label="${t.name}">
        <span class="flag">${t.flag}</span>
        <span class="team-name">${t.name}</span>
      </button>
    `).join('');

    $teamGrid.querySelectorAll('.team-card').forEach(card => {
      card.addEventListener('click', () => {
        const code = card.dataset.code;
        state.favouriteTeam = code;
        saveTeam(code);
        hideOverlay();
        init();
      });
    });
  }

  function hideOverlay() {
    $overlay.classList.add('hidden');
    setTimeout(() => { $overlay.style.display = 'none'; }, 400);
  }

  function showOverlay() {
    $overlay.style.display = 'flex';
    $overlay.classList.remove('hidden');
    renderTeamGrid();
  }

  $teamSearch.addEventListener('input', () => {
    renderTeamGrid($teamSearch.value);
  });

  $skipTeam.addEventListener('click', () => {
    hideOverlay();
    init();
  });

  $btnTeamChange.addEventListener('click', () => {
    showOverlay();
  });

  // ── Map Mode ────────────────────────────────
  $btnOpenMap.addEventListener('click', () => openMapMode());
  $btnCloseMap.addEventListener('click', () => closeMapMode());

  function openMapMode() {
    state.currentView = 'map';
    $mapMode.hidden = false;
    $btnOpenMap.hidden = true;
    document.body.style.overflow = 'hidden';
    initMap();
    renderMapMarkers();
  }

  function closeMapMode() {
    state.currentView = 'list';
    $mapMode.hidden = true;
    $btnOpenMap.hidden = false;
    $mapCard.hidden = true;
    document.body.style.overflow = '';
  }

  // ── Filter Chips ───────────────────────────
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.currentFilter = chip.dataset.filter;
      renderCurrentTab();
    });
  });

  // ── Bottom Nav ─────────────────────────────
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      state.currentTab = item.dataset.tab;
      // Clear match filter when manually switching to a tab
      if (item.dataset.tab !== 'upcoming') {
        state.matchFilter = null;
      }
      renderCurrentTab();
    });
  });

  // ── Filtering & Sorting ────────────────────
  function getFilteredEvents() {
    let events = [...EVENTS];
    const filter = state.currentFilter;

    if (filter === 'free') events = events.filter(e => e.type === 'free');
    else if (filter === 'ticketed') events = events.filter(e => e.type === 'ticketed');
    else if (filter === 'fan-zone') events = events.filter(e => e.vibe === 'Fan Zone');
    else if (filter === 'pub') events = events.filter(e => e.vibe === 'Pub');
    else if (filter === 'rooftop') events = events.filter(e => e.vibe === 'Rooftop');
    else if (filter === 'outdoor') events = events.filter(e => e.vibe === 'Outdoor');

    if (state.currentTab === 'upcoming') {
      if (state.matchFilter) {
        events = events.filter(e => e.matchId === state.matchFilter);
      } else if (state.teamFilter && state.favouriteTeam) {
        events = events.filter(e => eventMatchesTeam(e, state.favouriteTeam));
      }
      events.sort((a, b) => {
        const da = new Date(a.date + 'T' + a.time);
        const db = new Date(b.date + 'T' + b.time);
        return da - db;
      });
    } else if (state.currentTab === 'favourites') {
      events = events.filter(e => state.savedEvents.includes(e.id));
      events.sort((a, b) => {
        const da = new Date(a.date + 'T' + a.time);
        const db = new Date(b.date + 'T' + b.time);
        return da - db;
      });
    }

    return events;
  }

  // ── Render Event List ──────────────────────
  function renderEventList() {
    const events = getFilteredEvents();

    // Always build the tab header first so the toggle is always visible
    let html = '';
    let lastDate = '';

    if (state.currentTab === 'upcoming' && state.matchFilter) {
      const match = getMatch(state.matchFilter);
      const teamA = getTeam(match?.teamA);
      const teamB = getTeam(match?.teamB);
      html += `<div class="tab-header">
        <span>${teamA?.flag || ''} ${teamA?.name || ''} vs ${teamB?.name || ''} ${teamB?.flag || ''}</span>
        <button class="clear-filter-btn" id="clear-match-filter">✕ Clear</button>
      </div>`;
    } else if (state.currentTab === 'upcoming' && state.favouriteTeam) {
      const team = getTeam(state.favouriteTeam);
      html += `<div class="tab-header">UPCOMING
        <label class="team-toggle">
          <input type="checkbox" id="team-only-toggle" ${state.teamFilter ? 'checked' : ''}>
          <span class="toggle-label">${team?.flag || ''} ${team?.name || 'My team'}</span>
        </label>
      </div>`;
    } else if (state.currentTab === 'favourites') {
      html += `<div class="tab-header">YOUR FAVOURITES<span class="tab-count">${events.length} saved</span></div>`;
    }

    if (events.length === 0) {
      $eventList.innerHTML = html;
      $noResults.hidden = false;
      if (state.currentTab === 'favourites') {
        if (!state.signedIn) {
          $noResults.innerHTML = `
            <p>SAVE YOUR FAVOURITES</p>
            <span>Sign in to save venues you love and never miss a screening.</span>
            <button class="empty-cta" onclick="document.getElementById('signin-modal').hidden=false">
              SIGN IN
            </button>
          `;
        } else {
          $noResults.innerHTML = `
            <p>NO FAVOURITES YET</p>
            <span>Tap the heart on any event to save it here.</span>
          `;
        }
      } else if (state.currentTab === 'upcoming' && state.matchFilter) {
        const match = getMatch(state.matchFilter);
        $noResults.innerHTML = `
          <p>NO SCREENINGS</p>
          <span>No venues are screening this match yet</span>
        `;
      } else if (state.currentTab === 'upcoming' && state.teamFilter && state.favouriteTeam) {
        const team = getTeam(state.favouriteTeam);
        $noResults.innerHTML = `
          <p>NO ${team?.name?.toUpperCase() || 'TEAM'} EVENTS</p>
          <span>No screenings found for ${team?.flag || ''} ${team?.name || 'your team'} with current filters</span>
        `;
      } else {
        $noResults.innerHTML = '<p>NO EVENTS FOUND</p><span>Try changing your filters</span>';
      }
      // Bind toggle even in empty state
      bindUpcomingControls();
      return;
    }

    $noResults.hidden = true;

    events.forEach(event => {
      if (event.date !== lastDate) {
        lastDate = event.date;
        html += `<div class="date-separator">${formatDate(event.date)}</div>`;
      }

      const match = getMatch(event.matchId);
      const isRecommended = state.favouriteTeam && eventMatchesTeam(event, state.favouriteTeam) && state.currentTab !== 'your-team';
      const btnLabel = event.type === 'ticketed' ? 'GET TICKETS' : 'RSVP / INFO';
      const isFav = isFavourited(event.id);

      const venueImg = VENUE_IMAGES[event.venue] || null;

      html += `
        <div class="event-card${isRecommended ? ' recommended' : ''}" data-id="${event.id}">
          ${venueImg ? `<div class="card-img"><img src="${venueImg}" alt="${event.venue}" loading="lazy"></div>` : ''}
          <div class="card-body">
            <div class="card-top">
              <span class="card-match">${matchLabelShort(event.matchId)}</span>
              <div class="card-top-right">
                <span class="card-type-tag ${event.type}">${event.type === 'free' ? 'FREE' : event.price}</span>
                <button class="fav-btn${isFav ? ' fav-active' : ''}" data-fav-id="${event.id}" aria-label="Favourite">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="${isFav ? 'var(--canada-red)' : 'none'}"><path d="M10 17s-7-4.35-7-8.5C3 5.46 5.46 3 8 3c1.4 0 2.6.7 3.4 1.7L10 6l-1.4-1.3C9.4 3.7 10.6 3 12 3c2.54 0 5 2.46 5 5.5 0 4.15-7 8.5-7 8.5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
                </button>
              </div>
            </div>
            <div class="card-venue">${event.venue}</div>
            <div class="card-address">${event.address}</div>
            <div class="card-meta">
              <span class="meta-pill vibe">${event.vibe}</span>
              <span class="meta-pill">${event.capacity} capacity</span>
              ${match ? `<span class="meta-pill">${match.stage}</span>` : ''}
            </div>
            <div class="card-time">${formatDate(event.date)} &middot; Doors ${event.time}</div>
            <p style="font-size:13px;color:var(--text-muted);margin-top:8px;line-height:1.5">${event.description}</p>
            <div class="card-actions">
              <a href="${event.link}" target="_blank" rel="noopener" class="card-btn primary">${btnLabel}</a>
              <button class="card-btn secondary share-trigger" data-event-id="${event.id}">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10.5 4.67a2.33 2.33 0 100-4.67 2.33 2.33 0 000 4.67zM3.5 9.33a2.33 2.33 0 100-4.67 2.33 2.33 0 000 4.67zM10.5 14a2.33 2.33 0 100-4.67 2.33 2.33 0 000 4.67zM5.57 8.23l2.87 1.87M8.43 3.9L5.57 5.77" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
                SHARE
              </button>
            </div>
            <div class="card-source">via ${event.source}</div>
          </div>
        </div>
      `;
    });

    $eventList.innerHTML = html;

    document.querySelectorAll('.share-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openShareModal(btn.dataset.eventId);
      });
    });

    document.querySelectorAll('.fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!state.signedIn) {
          $signinModal.hidden = false;
          return;
        }
        const eventId = btn.dataset.favId;
        if (isFavourited(eventId)) {
          removeFavourite(eventId);
        } else {
          saveFavourite(eventId);
        }
        renderCurrentTab();
      });
    });

    bindUpcomingControls();
  }

  function bindUpcomingControls() {
    const teamToggle = document.getElementById('team-only-toggle');
    if (teamToggle) {
      teamToggle.addEventListener('change', () => {
        state.teamFilter = teamToggle.checked;
        renderCurrentTab();
      });
    }
    const clearBtn = document.getElementById('clear-match-filter');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        state.matchFilter = null;
        renderCurrentTab();
      });
    }
  }

  // ── Fixtures Tab ──────────────────────────
  function getScreeningCount(matchId) {
    return EVENTS.filter(e => e.matchId === matchId).length;
  }

  function renderFixtures() {
    const subTab = state.fixturesSubTab;

    let html = '<div class="fixtures-view">';

    // Segmented toggle
    html += `<div class="segment-toggle">
      <button class="segment-btn${subTab === 'matches' ? ' active' : ''}" data-segment="matches">Matches</button>
      <button class="segment-btn${subTab === 'standings' ? ' active' : ''}" data-segment="standings">Standings</button>
    </div>`;

    if (subTab === 'standings') {
      html += renderStandingsHTML();
      html += '</div>';
      $eventList.innerHTML = html;
      $noResults.hidden = true;
      bindSegmentToggle();
      return;
    }

    // Matches view — group by date
    const sortedMatches = [...MATCHES].sort((a, b) => {
      const da = new Date(a.date + 'T' + a.time);
      const db = new Date(b.date + 'T' + b.time);
      return da - db;
    });

    let lastDate = '';

    sortedMatches.forEach(match => {
      const teamA = getTeam(match.teamA);
      const teamB = getTeam(match.teamB);
      const isPlayed = match.scoreA !== undefined;
      const isHighlight = state.favouriteTeam && (match.teamA === state.favouriteTeam || match.teamB === state.favouriteTeam);
      const screenings = getScreeningCount(match.id);

      if (match.date !== lastDate) {
        lastDate = match.date;
        html += `<div class="fixture-date-label">${formatDate(match.date)}</div>`;
      }

      html += `<div class="fixture-row${isPlayed ? ' played' : ''}${isHighlight ? ' highlight' : ''}${screenings > 0 && !isPlayed ? ' has-screenings' : ''}" data-match-id="${match.id}">
        <div class="fixture-teams">
          <div class="fixture-team home">
            <span class="fixture-team-name">${teamA?.name || match.teamA}</span>
            <span class="fixture-team-flag">${teamA?.flag || ''}</span>
          </div>
          ${isPlayed
            ? `<span class="fixture-score">${match.scoreA} - ${match.scoreB}</span>`
            : `<span class="fixture-vs">${match.time}</span>`
          }
          <div class="fixture-team away">
            <span class="fixture-team-flag">${teamB?.flag || ''}</span>
            <span class="fixture-team-name">${teamB?.name || match.teamB}</span>
          </div>
        </div>
        <div class="fixture-bottom">
          <span class="fixture-stage">${match.stage}${isPlayed ? ' · FT' : ''}</span>
          ${!isPlayed && screenings > 0
            ? `<span class="fixture-screenings">${screenings} screening${screenings !== 1 ? 's' : ''} ›</span>`
            : ''
          }
        </div>
      </div>`;
    });

    html += '</div>';
    $eventList.innerHTML = html;
    $noResults.hidden = true;

    // Bind fixture row clicks
    document.querySelectorAll('.fixture-row').forEach(row => {
      row.addEventListener('click', () => {
        const matchId = row.dataset.matchId;
        const screenings = getScreeningCount(matchId);
        if (screenings > 0) {
          state.matchFilter = matchId;
          state.currentTab = 'upcoming';
          document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
          document.querySelector('.nav-item[data-tab="upcoming"]').classList.add('active');
          renderCurrentTab();
          // Scroll to top so the fixture header is aligned right under the match highlight
          document.querySelector('.list-view').scrollTop = 0;
        }
      });
    });

    bindSegmentToggle();
  }

  function bindSegmentToggle() {
    document.querySelectorAll('.segment-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.fixturesSubTab = btn.dataset.segment;
        renderCurrentTab();
      });
    });
  }

  function renderStandingsHTML() {
    let html = '';
    for (const [group, standings] of Object.entries(GROUP_STANDINGS)) {
      html += `<div class="group-header">GROUP ${group}</div>`;
      html += `
        <div class="table-row header">
          <span class="pos">#</span>
          <span class="team-col">TEAM</span>
          <span class="stat">P</span>
          <span class="stat">W</span>
          <span class="stat">D</span>
          <span class="stat">GD</span>
          <span class="pts">PTS</span>
        </div>
      `;
      standings.forEach((row, i) => {
        const team = getTeam(row.team);
        const isHighlight = state.favouriteTeam && row.team === state.favouriteTeam;
        html += `
          <div class="table-row${isHighlight ? ' highlight-row' : ''}">
            <span class="pos">${i + 1}</span>
            <span class="team-col">
              <span class="flag">${team?.flag || ''}</span>
              <span class="name">${team?.name || row.team}</span>
            </span>
            <span class="stat">${row.p}</span>
            <span class="stat">${row.w}</span>
            <span class="stat">${row.d}</span>
            <span class="stat">${row.gd > 0 ? '+' : ''}${row.gd}</span>
            <span class="pts">${row.pts}</span>
          </div>
        `;
      });
    }
    return html;
  }

  // ── League Tables ──────────────────────────
  function renderTables() {
    let html = '<div class="tables-view">';

    for (const [group, standings] of Object.entries(GROUP_STANDINGS)) {
      html += `<div class="group-header">GROUP ${group}</div>`;
      html += `
        <div class="table-row header">
          <span class="pos">#</span>
          <span class="team-col">TEAM</span>
          <span class="stat">P</span>
          <span class="stat">W</span>
          <span class="stat">D</span>
          <span class="stat">GD</span>
          <span class="pts">PTS</span>
        </div>
      `;

      standings.forEach((row, i) => {
        const team = getTeam(row.team);
        const isHighlight = state.favouriteTeam && row.team === state.favouriteTeam;
        html += `
          <div class="table-row${isHighlight ? ' highlight-row' : ''}">
            <span class="pos">${i + 1}</span>
            <span class="team-col">
              <span class="flag">${team?.flag || ''}</span>
              <span class="name">${team?.name || row.team}</span>
            </span>
            <span class="stat">${row.p}</span>
            <span class="stat">${row.w}</span>
            <span class="stat">${row.d}</span>
            <span class="stat">${row.gd > 0 ? '+' : ''}${row.gd}</span>
            <span class="pts">${row.pts}</span>
          </div>
        `;
      });
    }

    html += '</div>';
    $eventList.innerHTML = html;
    $noResults.hidden = true;
  }

  // ── Match Highlight Banner ─────────────────
  function updateMatchHighlight() {
    if (!state.favouriteTeam) {
      $matchHighlight.hidden = true;
      $contentArea.classList.remove('has-highlight');
      return;
    }

    const team = getTeam(state.favouriteTeam);
    const now = new Date();
    const nextMatch = MATCHES
      .filter(m => m.teamA === state.favouriteTeam || m.teamB === state.favouriteTeam)
      .filter(m => new Date(m.date + 'T' + m.time) >= new Date(now.toDateString()))
      .sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time))[0];

    if (!nextMatch) {
      $matchHighlight.hidden = true;
      $contentArea.classList.remove('has-highlight');
      return;
    }

    const teamA = getTeam(nextMatch.teamA);
    const teamB = getTeam(nextMatch.teamB);

    document.getElementById('hl-team-a').textContent = `${teamA?.flag || ''} ${teamA?.name || nextMatch.teamA}`;
    document.getElementById('hl-team-b').textContent = `${teamB?.name || nextMatch.teamB} ${teamB?.flag || ''}`;
    document.getElementById('hl-match-time').textContent = `${formatDate(nextMatch.date)} ${nextMatch.time}`;

    $matchHighlight.hidden = false;
    $contentArea.classList.add('has-highlight');
  }

  // ── Team Badge ─────────────────────────────
  function updateTeamBadge() {
    if (state.favouriteTeam) {
      const team = getTeam(state.favouriteTeam);
      $currentTeamFlag.textContent = team?.flag || '';
    } else {
      $currentTeamFlag.textContent = '\u{26BD}';
    }
  }

  // ── Map ────────────────────────────────────
  function initMap() {
    if (state.map) return;

    state.map = L.map('map', {
      center: [51.5074, -0.1278],
      zoom: 12,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(state.map);

    state.map.zoomControl.setPosition('topright');

    state.map.on('click', () => {
      $mapCard.hidden = true;
    });

    setTimeout(() => state.map.invalidateSize(), 100);
  }

  function renderMapMarkers() {
    if (!state.map) return;

    state.markers.forEach(m => state.map.removeLayer(m));
    state.markers = [];

    const events = getFilteredEvents();

    events.forEach(event => {
      const isRecommended = state.favouriteTeam && eventMatchesTeam(event, state.favouriteTeam);
      const markerClass = event.type === 'free' ? 'free-marker' : '';
      const recClass = isRecommended ? ' recommended-marker' : '';

      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-dot ${markerClass}${recClass}"></div>`,
        iconSize: [20, 25],
        iconAnchor: [10, 25],
      });

      const marker = L.marker([event.lat, event.lng], { icon }).addTo(state.map);

      marker.on('click', () => {
        showMapCard(event);
      });

      state.markers.push(marker);
    });

    if (events.length > 0) {
      const bounds = L.latLngBounds(events.map(e => [e.lat, e.lng]));
      state.map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }

  function showMapCard(event) {
    const btnLabel = event.type === 'ticketed' ? 'GET TICKETS' : 'RSVP / INFO';

    $mapCard.innerHTML = `
      <button class="map-card-close" aria-label="Close">&times;</button>
      <span class="card-match">${matchLabelShort(event.matchId)}</span>
      <span class="card-type-tag ${event.type}" style="float:right;margin-top:-4px">${event.type === 'free' ? 'FREE' : event.price}</span>
      <div class="card-venue">${event.venue}</div>
      <div class="card-address">${event.address}</div>
      <div class="card-meta">
        <span class="meta-pill vibe">${event.vibe}</span>
        <span class="meta-pill">${event.capacity}</span>
      </div>
      <div class="card-time">${formatDate(event.date)} &middot; ${event.time}</div>
      <div class="card-actions">
        <a href="${event.link}" target="_blank" rel="noopener" class="card-btn primary">${btnLabel}</a>
        <button class="card-btn secondary share-trigger" data-event-id="${event.id}">SHARE</button>
      </div>
    `;
    $mapCard.hidden = false;

    $mapCard.querySelector('.map-card-close').addEventListener('click', () => {
      $mapCard.hidden = true;
    });

    $mapCard.querySelector('.share-trigger').addEventListener('click', (e) => {
      e.stopPropagation();
      openShareModal(event.id);
    });
  }

  // ── Share Modal ────────────────────────────
  function openShareModal(eventId) {
    state.shareEventId = eventId;
    const event = EVENTS.find(e => e.id === eventId);
    if (!event) return;

    $shareModal.hidden = false;
    document.getElementById('copy-confirm').hidden = true;

    const text = `${event.venue} — ${matchLabelShort(event.matchId)}\n${formatDate(event.date)} ${event.time}\n${event.link}`;
    const url = event.link;

    $shareModal.querySelectorAll('.share-btn').forEach(btn => {
      btn.onclick = () => {
        const platform = btn.dataset.platform;
        if (platform === 'whatsapp') {
          window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        } else if (platform === 'twitter') {
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
        } else if (platform === 'telegram') {
          window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        } else if (platform === 'copy') {
          navigator.clipboard.writeText(text).then(() => {
            document.getElementById('copy-confirm').hidden = false;
          });
        }
      };
    });
  }

  $shareModal.querySelector('.modal-backdrop').addEventListener('click', () => {
    $shareModal.hidden = true;
  });

  $shareModal.querySelector('.modal-close').addEventListener('click', () => {
    $shareModal.hidden = true;
  });

  // ── Render Router ──────────────────────────
  function renderCurrentTab() {
    const $filterBar = document.querySelector('.filter-bar');
    if (state.currentTab === 'fixtures') {
      $filterBar.hidden = true;
      $matchHighlight.hidden = true;
      $btnOpenMap.hidden = true;
      $contentArea.classList.remove('has-highlight');
      $contentArea.classList.add('no-filters');
      renderFixtures();
      // Always scroll to top when entering fixtures
      document.querySelector('.list-view').scrollTop = 0;
    } else {
      $filterBar.hidden = false;
      $btnOpenMap.hidden = false;
      $contentArea.classList.remove('no-filters');
      updateMatchHighlight();
      renderEventList();
    }
  }

  // ── Init ───────────────────────────────────
  function init() {
    updateTeamBadge();
    updateMatchHighlight();
    renderCurrentTab();
  }

  // ── Sign-In Modal ──────────────────────────
  $signinModal.querySelector('.modal-backdrop').addEventListener('click', () => {
    $signinModal.hidden = true;
  });
  $signinModal.querySelector('.modal-close').addEventListener('click', () => {
    $signinModal.hidden = true;
  });

  document.getElementById('signin-apple').addEventListener('click', () => {
    saveAuth('Apple User', 'apple');
    $signinModal.hidden = true;
    renderCurrentTab();
  });

  document.getElementById('signin-google').addEventListener('click', () => {
    saveAuth('Google User', 'google');
    $signinModal.hidden = true;
    renderCurrentTab();
  });

  // ── Boot ───────────────────────────────────
  loadAuth();
  loadSavedEvents();

  const savedTeam = loadTeam();
  if (savedTeam) {
    state.favouriteTeam = savedTeam;
    hideOverlay();
    init();
  } else {
    renderTeamGrid();
  }
})();
