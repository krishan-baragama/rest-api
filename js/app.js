// =======================
// CONFIG
// =======================
// const API_BASE_URL = "http://localhost:3000";
const API_BASE_URL = "https://rest-api-krishan.onrender.com";



// ⚠️ For a real project you would NOT expose the key in frontend.
// For this school project it's okay.
const API_KEY = "my-super-secret-api-key-change-this-in-production";

function buildHeaders() {
  return {
    "Content-Type": "application/json",
    "X-API-Key": API_KEY,
  };
}

async function apiRequest(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  const opts = {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...buildHeaders(),
    },
  };

  const res = await fetch(url, opts);

  if (!res.ok) {
    // 204 has no body
    const text = await res.text();
    let json;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = null;
    }
    const message =
      (json && (json.message || json.error)) ||
      `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  // If no content (204), return null
  if (res.status === 204) return null;

  return res.json();
}

// =======================
// TABS
// =======================
function setupTabs() {
  const buttons = document.querySelectorAll(".tab-button");
  const sections = document.querySelectorAll(".tab-section");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      sections.forEach((s) => s.classList.remove("active"));

      btn.classList.add("active");
      const targetId = btn.dataset.target;
      document.getElementById(targetId).classList.add("active");
    });
  });
}

// =======================
// USERS
// =======================
const usersTableBody = document.getElementById("users-table-body");
const userForm = document.getElementById("user-form");
const userIdInput = document.getElementById("user-id");
const userNameInput = document.getElementById("user-name");
const userEmailInput = document.getElementById("user-email");
const userFormTitle = document.getElementById("user-form-title");
const userResetBtn = document.getElementById("user-reset-btn");
const userDeleteBtn = document.getElementById("user-delete-btn");
const userMessage = document.getElementById("user-message");

async function loadUsers() {
  try {
    const users = await apiRequest("/users");
    usersTableBody.innerHTML = "";

    users.forEach((user) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email || ""}</td>
        <td>${user.created_at || ""}</td>
      `;
      tr.addEventListener("click", () => fillUserForm(user));
      usersTableBody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
    setMessage(userMessage, err.message, true);
  }
}

function fillUserForm(user) {
  userIdInput.value = user.id;
  userNameInput.value = user.name;
  userEmailInput.value = user.email || "";

  userFormTitle.textContent = `Edit User #${user.id}`;
  userDeleteBtn.disabled = false;
}

function resetUserForm() {
  userForm.reset();
  userIdInput.value = "";
  userFormTitle.textContent = "Create User";
  userDeleteBtn.disabled = true;
  setMessage(userMessage, "");
}

userForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = userIdInput.value.trim();
  const payload = {
    name: userNameInput.value.trim(),
    email: userEmailInput.value.trim(),
  };

  try {
    if (!id) {
      // CREATE
      await apiRequest("/users", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setMessage(userMessage, "User created successfully", false);
    } else {
      // UPDATE
      await apiRequest(`/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      setMessage(userMessage, "User updated successfully", false);
    }

    resetUserForm();
    await loadUsers();
  } catch (err) {
    console.error(err);
    setMessage(userMessage, err.message, true);
  }
});

userResetBtn.addEventListener("click", () => {
  resetUserForm();
});

userDeleteBtn.addEventListener("click", async () => {
  const id = userIdInput.value.trim();
  if (!id) return;

  if (!confirm(`Delete user #${id}?`)) return;

  try {
    await apiRequest(`/users/${id}`, {
      method: "DELETE",
    });
    setMessage(userMessage, "User deleted successfully", false);
    resetUserForm();
    await loadUsers();
  } catch (err) {
    console.error(err);
    setMessage(userMessage, err.message, true);
  }
});

// =======================
// GAMES
// =======================
const gamesTableBody = document.getElementById("games-table-body");
const gameForm = document.getElementById("game-form");
const gameIdInput = document.getElementById("game-id");
const gameTitleInput = document.getElementById("game-title");
const gamePlatformInput = document.getElementById("game-platform");
const gameGenreInput = document.getElementById("game-genre");
const gameReleaseYearInput = document.getElementById("game-release-year");
const gameRatingInput = document.getElementById("game-rating");
const gamePriceInput = document.getElementById("game-price");
const gameFormTitle = document.getElementById("game-form-title");
const gameResetBtn = document.getElementById("game-reset-btn");
const gameDeleteBtn = document.getElementById("game-delete-btn");
const gameMessage = document.getElementById("game-message");

async function loadGames() {
  try {
    const games = await apiRequest("/games");
    gamesTableBody.innerHTML = "";

    games.forEach((game) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${game.id}</td>
        <td>${game.title}</td>
        <td>${game.platform || ""}</td>
        <td>${game.genre || ""}</td>
        <td>${game.release_year ?? ""}</td>
        <td>${game.rating ?? ""}</td>
        <td>${game.price ?? ""}</td>
      `;
      tr.addEventListener("click", () => fillGameForm(game));
      gamesTableBody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
    setMessage(gameMessage, err.message, true);
  }
}

function fillGameForm(game) {
  gameIdInput.value = game.id;
  gameTitleInput.value = game.title || "";
  gamePlatformInput.value = game.platform || "";
  gameGenreInput.value = game.genre || "";
  gameReleaseYearInput.value = game.release_year ?? "";
  gameRatingInput.value = game.rating ?? "";
  gamePriceInput.value = game.price ?? "";

  gameFormTitle.textContent = `Edit Game #${game.id}`;
  gameDeleteBtn.disabled = false;
}

function resetGameForm() {
  gameForm.reset();
  gameIdInput.value = "";
  gameFormTitle.textContent = "Create Game";
  gameDeleteBtn.disabled = true;
  setMessage(gameMessage, "");
}

gameForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = gameIdInput.value.trim();

  const payload = {
    title: gameTitleInput.value.trim(),
    platform: gamePlatformInput.value.trim(),
    genre: gameGenreInput.value.trim() || null,
    release_year: gameReleaseYearInput.value
      ? Number(gameReleaseYearInput.value)
      : null,
    rating: gameRatingInput.value ? Number(gameRatingInput.value) : null,
    price: gamePriceInput.value ? Number(gamePriceInput.value) : null,
  };

  try {
    if (!id) {
      // CREATE
      await apiRequest("/games", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setMessage(gameMessage, "Game created successfully", false);
    } else {
      // UPDATE
      await apiRequest(`/games/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      setMessage(gameMessage, "Game updated successfully", false);
    }

    resetGameForm();
    await loadGames();
  } catch (err) {
    console.error(err);
    setMessage(gameMessage, err.message, true);
  }
});

gameResetBtn.addEventListener("click", () => {
  resetGameForm();
});

gameDeleteBtn.addEventListener("click", async () => {
  const id = gameIdInput.value.trim();
  if (!id) return;

  if (!confirm(`Delete game #${id}?`)) return;

  try {
    await apiRequest(`/games/${id}`, {
      method: "DELETE",
    });
    setMessage(gameMessage, "Game deleted successfully", false);
    resetGameForm();
    await loadGames();
  } catch (err) {
    console.error(err);
    setMessage(gameMessage, err.message, true);
  }
});

// =======================
// Helpers
// =======================
function setMessage(el, text, isError = false) {
  if (!el) return;
  el.textContent = text;
  el.classList.remove("error", "success");
  if (!text) return;
  el.classList.add(isError ? "error" : "success");
}

// =======================
// INIT
// =======================
document.addEventListener("DOMContentLoaded", async () => {
  setupTabs();
  await loadUsers();
  await loadGames();
});
