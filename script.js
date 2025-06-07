// Initialiser ou récupérer le panier
let panier = JSON.parse(localStorage.getItem('panier')) || [];

// Ajouter un produit au panier
function ajouterAuPanier(produit) {
  // Chercher si le produit est déjà dans le panier
  const index = panier.findIndex(item => item.nom === produit.nom);

  if (index !== -1) {
    panier[index].quantite += 1; // augmenter quantité
  } else {
    panier.push({ ...produit, quantite: 1 });
  }

  // Sauvegarder dans localStorage
  localStorage.setItem('panier', JSON.stringify(panier));
  mettreAJourIconePanier();
  flashIcon();
  showNotif("✅ Produit ajouté au panier");

}
// Fait grossir l'icône du panier brièvement
function flashIcon() {
  const span = document.getElementById("cart-count");
  if (!span) return;

  span.style.transform = "scale(1.3)";
  span.style.transition = "transform 0.2s";
  setTimeout(() => {
    span.style.transform = "scale(1)";
  }, 200);
}

// Affiche un message temporaire en bas de l’écran
function showNotif(message) {
  const notif = document.getElementById("notif");
  if (!notif) return;

  notif.textContent = message;
  notif.classList.add("show");

  setTimeout(() => {
    notif.classList.remove("show");
  }, 3000);
}

// Afficher le panier sur la page cart.html
function afficherPanier() {
  const tbody = document.querySelector("#cart-body");
  const totalElement = document.querySelector("#total");

  if (!tbody || !totalElement) return;

  let total = 0;
  tbody.innerHTML = "";

  panier.forEach((item, index) => {
    const sousTotal = item.prix * item.quantite;
    total += sousTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.nom}</td>
      <td>${item.quantite}</td>
      <td>${item.prix.toLocaleString()} FCFA</td>
      <td>${sousTotal.toLocaleString()} FCFA</td>
      <td><button onclick="supprimerProduit(${index})">✖</button></td>
    `;
    tbody.appendChild(row);
  });

  totalElement.textContent = `${total.toLocaleString()} FCFA`;
}

// Supprimer un produit du panier
function supprimerProduit(index) {
  panier.splice(index, 1);
  localStorage.setItem('panier', JSON.stringify(panier));
  afficherPanier();
}

// Si on est sur la page cart.html, afficher le panier automatiquement
if (window.location.pathname.includes("cart.html")) {
  afficherPanier();
}
function mettreAJourIconePanier() {
  const span = document.getElementById("cart-count");
  if (!span) return;

  let totalArticles = 0;
  panier.forEach(item => {
    totalArticles += item.quantite;
  });

  span.textContent = totalArticles;
}
if (document.readyState !== "loading") {
  mettreAJourIconePanier();
} else {
  document.addEventListener("DOMContentLoaded", mettreAJourIconePanier);
}
