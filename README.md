# Anniversaire Melo 🎂✨

Un site web interactif pour célébrer l'anniversaire de Melo avec 5 étapes verrouillées par des codes secrets.

## 🚀 Stack technique

- **Vue 3** - Framework JavaScript progressif
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide
- **Pinia** - Gestion d'état
- **Vue Router** - Navigation
- **GSAP** - Animations
- **SCSS** - Styles avec variables CSS

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build
npm run preview
```

## 🎨 Structure du projet

```
src/
├── assets/
│   └── img/                    # Images (placeholders à remplacer)
├── components/
│   ├── atoms/                  # Composants de base
│   ├── molecules/              # Composants intermédiaires
│   ├── organisms/              # Composants complexes
│   └── layout/                 # Layout (Header, Footer)
├── pages/                      # Pages de l'application
├── router/                     # Configuration du routeur
├── store/                      # Gestion d'état Pinia
├── data/                       # Données de contenu
├── composables/                # Utilitaires réutilisables
└── styles/                     # Styles globaux
```

## 🔐 Les 5 étapes

1. **Notre temps** (code: `yuka`) - Timeline des moments partagés
2. **Les visages** (code: `sagittaire`) - Galerie de photos
3. **Le mot doux** (code: `albâtre`) - Lettre personnelle
4. **Nos mots à deux doigts** (code: `olaf`) - Thread de SMS
5. **L'adresse** (code: `andré`) - Révélation finale

## ✨ Fonctionnalités

- ✅ 5 étapes verrouillées par codes
- ✅ Validation normalisée (accents, casse)
- ✅ Persistance localStorage
- ✅ Animations GSAP subtiles
- ✅ Support `prefers-reduced-motion`
- ✅ Responsive mobile-first
- ✅ Accessibilité (ARIA, focus visible)
- ✅ Lazy-loading des images
- ✅ Code-splitting par route

## 🎯 Personnalisation

### Remplacer les contenus

1. **Codes** : Modifier dans `src/data/content.ts` → `CODES`
2. **Timeline** : Modifier dans `src/data/content.ts` → `TIMELINE`
3. **Galerie** : Modifier dans `src/data/content.ts` → `GALLERY`
4. **SMS** : Modifier dans `src/data/content.ts` → `SMS`
5. **Finale** : Modifier dans `src/data/content.ts` → `FINALE`
6. **Lettre** : Modifier dans `src/data/content.ts` → `LETTER_CONTENT`

### Remplacer les images

Placer vos images dans le dossier `public/img/` avec les noms suivants :

- Timeline : `t1.jpg`, `t2.jpg`, ... `t10.jpg`
- Galerie Elle : `elle1.jpg`, `elle2.jpg`, ... `elle8.jpg`
- Galerie Nous : `nous1.jpg`, `nous2.jpg`, ... `nous8.jpg`
- Galerie Eux : `eux1.jpg`, `eux2.jpg`, ... `eux8.jpg`

### Personnaliser les couleurs

Modifier les variables CSS dans `src/styles/tokens.css`.

## 🔒 Sécurité & vie privée

- ✅ Aucune mention du cadeau final dans le code
- ✅ Pas d'appels réseau externes
- ✅ Tout fonctionne en local
- ✅ Option de réinitialisation de la progression

## ♿ Accessibilité

- ✅ Contrastes AA
- ✅ Navigation au clavier
- ✅ Labels ARIA
- ✅ Focus visible
- ✅ Support lecteurs d'écran
- ✅ Tailles de cibles ≥ 44px

## 📱 Responsive

- Mobile-first design
- Breakpoints : 640px, 768px, 1024px
- Images optimisées et lazy-load

## 🎬 Animations

- Entrées de page avec GSAP
- Stagger reveals
- Respect de `prefers-reduced-motion`
- Pas de scroll-jacking

## 🌐 Déploiement

Le site peut être déployé sur :
- **Netlify** : Drag & drop du dossier `dist`
- **Vercel** : Import du repo GitHub
- **GitHub Pages** : Via GitHub Actions
- Tout hébergeur statique

## 📝 License

Projet personnel - Tous droits réservés

---

Fait avec ❤️ pour Melo
# birthday-melody
# birthday-melody
