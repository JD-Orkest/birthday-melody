# Constellation Background - Documentation

## 🌟 Description

Composant de fond animé affichant un ciel étoilé avec la constellation du Sagittaire en vedette. Le fond s'anime au scroll grâce à GSAP ScrollTrigger.

## ✨ Fonctionnalités

### Constellation du Sagittaire
- **8 étoiles principales** avec leurs noms authentiques :
  - Kaus Australis (la plus brillante)
  - Kaus Media
  - Kaus Borealis
  - Ascella
  - Nunki
  - Phi Sgr
  - Sigma Sgr
  - Tau Sgr

- **Lignes de connexion** formant la silhouette de l'archer
- **Effet de lueur** (glow) autour de chaque étoile
- **Couleur ambrée** (#E7B980) pour représenter la chaleur du Sagittaire

### Étoiles décoratives
- **80 étoiles** dispersées aléatoirement
- **Effet de scintillement** (twinkle) continu
- **Opacité variable** pour créer de la profondeur

### Animations GSAP
1. **Parallaxe au scroll** : La constellation se déplace légèrement avec le défilement
2. **Rotation subtile** : Effet de rotation basé sur la progression du scroll
3. **Pulse lumineux** : Variation de luminosité en boucle pour un effet vivant
4. **Déplacement organique** : Chaque étoile bouge de façon unique

## 🎨 Personnalisation

### Modifier la couleur de la constellation

```typescript
// Dans drawSagittarius(), ligne ~108
ctx.strokeStyle = 'rgba(231, 185, 128, 0.3)' // Lignes
// et ligne ~122
gradient.addColorStop(0, 'rgba(231, 185, 128, 0.8)') // Glow
```

### Ajouter plus d'étoiles décoratives

```typescript
// Dans initCanvas(), ligne ~42
for (let i = 0; i < 120; i++) { // Changer 80 en 120 par exemple
  decorativeStars.push({...})
}
```

### Modifier la position de la constellation

```typescript
// Dans drawSagittarius(), ligne ~97
const offsetY = scrollY + viewportHeight * 0.4 // 0.4 = 40% de la hauteur
```

### Ajuster la vitesse d'animation

```typescript
// Dans setupScrollAnimations(), ligne ~154
scrub: 2 // Plus le nombre est élevé, plus l'animation est lente
```

## ♿ Accessibilité

- `aria-hidden="true"` : Le canvas est masqué pour les lecteurs d'écran
- `pointer-events: none` : N'interfère pas avec les interactions utilisateur
- Disparaît complètement avec `prefers-reduced-motion: reduce`

## 🎯 Performance

- **Canvas API** utilisée pour le rendu (plus performant que SVG pour de nombreuses étoiles)
- **RequestAnimationFrame** pour des animations fluides à 60 FPS
- **Position fixed** pour éviter les reflows lors du scroll
- **Nettoyage automatique** des animations GSAP au démontage du composant

## 🔧 Intégration

Le composant est intégré dans `App.vue` :

```vue
<template>
  <div id="app">
    <ConstellationBackground />
    <!-- Reste du contenu -->
  </div>
</template>
```

## 📊 Structure des données

### Format des étoiles du Sagittaire
```typescript
{
  x: 0.5,        // Position X (0-1, relatif à la largeur)
  y: 0.3,        // Position Y (0-1, relatif à la hauteur)
  size: 2.5,     // Taille en pixels
  name: 'Kaus Australis' // Nom de l'étoile
}
```

### Format des connexions
```typescript
[0, 1] // Connecte l'étoile à l'index 0 avec celle à l'index 1
```

## 🌙 Ajouter d'autres constellations

Pour ajouter une nouvelle constellation (ex: Orion) :

1. Créer un nouveau tableau d'étoiles
2. Définir les lignes de connexion
3. Créer une fonction `drawOrion()` similaire à `drawSagittarius()`
4. Appeler cette fonction dans `draw()`
5. Configurer des animations GSAP spécifiques si nécessaire

## 🐛 Debugging

Si le fond ne s'affiche pas :
1. Vérifiez la console pour les erreurs
2. Assurez-vous que GSAP ScrollTrigger est bien importé
3. Vérifiez le z-index dans App.vue (devrait être 0)
4. Testez avec `prefers-reduced-motion` désactivé

## 📱 Responsive

Le canvas s'adapte automatiquement :
- Redimensionnement automatique lors du resize de la fenêtre
- Positions relatives (0-1) pour s'adapter à toutes les tailles
- Testé sur mobile, tablette et desktop
