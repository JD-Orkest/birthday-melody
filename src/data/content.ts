export interface TimelineItem {
  id: number
  title: string
  meta: string
  text: string
  img: string
}

export interface GalleryImage {
  src: string
  caption: string
}

export interface GalleryImages {
  elle: GalleryImage[]
  nous: GalleryImage[]
  eux: GalleryImage[]
}

export interface SmsMessage {
  from: 'me' | 'her'
  text: string
  time?: string
}

export interface SmsSection {
  title: string
  messages: SmsMessage[]
}

export interface FinaleInfo {
  hour: string
  address: string
}

export const CODES: Record<number, string> = {
  1: 'yuka',
  2: 'sagittaire',
  3: 'albâtre',
  4: 'olaf',
  5: 'andré'
}

export const TIMELINE: TimelineItem[] = [
  {
    id: 1,
    title: 'Le photomaton',
    meta: 'Thieusies',
    text: 'On ne se connaissait même pas encore, et déjà tu m’as enrôlé dans une mission photomaton… dans une caravane, en plus. Niveau concept, c’était entre le plan foireux et le coup du siècle. Spoiler : c’était le coup du siècle. PS: On a retrouvé Romain!!!',
    img: ''
  },
  {
    id: 2,
    title: 'La rose qui n\'était pas une rose',
    meta: 'Thieusies - Sud de la France - Houdeng',
    text: 'À Thieusies, t’as cueilli une fleur pour moi en me disant que je devais te la ramener. Romantique, mais un peu tordu comme mission. Elle a survécu à un mariage, trois jours de canicule et l’enfer de la voiture… juste pour que je te la rende à notre premier date. Honnêtement, cette fleur mérite une médaille, ou au moins une minute de silence.',
    img: ''
  },
  {
    id: 3,
    title: 'Troll & Bush',
    meta: 'Houdeng',
    text: 'J’ai passé une soirée géniale à t’écouter raconter tes histoires, et au final, même pas un baiser pour le héros du jour. T’es clairement pas une femme facile, et il a fallu que je décode tes sous-entendus pour piger que je devais te raccompagner à ta voiture. Résultat : je l’ai pas fait. Niveau timing romantique, j’étais en mode avion.',
    img: ''
  },
  {
    id: 4,
    title: 'Le picnic',
    meta: 'Ascenseur de Thieu',
    text: 'Ce jour-là, c’est celui où j’ai découvert ton intérieur (l’appartement, hein, précisons). À ce moment-là, tu te demandais sérieusement si j’étais pas gay à force de rien tenter. Alors j’ai fini par sauter le pas, un peu gêné, en sortant de chez toi. Et là, bam, j’ai compris que j’étais foutu.',
    img: ''
  },
  {
    id: 5,
    title: 'El famoso DOUUUREUUUH',
    meta: 'Un festival avec des musiques de sauvages',
    text: 'Je t’ai découverte dans ton élément, rayonnante, avec ton énergie qui faisait vibrer tout autour de toi. Après la marche sans fin depuis le parking, t’étais déjà en train de rire, de danser, de croquer la vie comme si le festival t’appartenait. Moi, je suivais juste, un peu ébloui, à me dire que t’avais clairement quelque chose en plus.',
    img: ''
  },
  {
    id: 6,
    title: 'El famoso DOUUUREUUUH 2',
    meta: 'Y avait quand même du bon son finalement...',
    text: 'Tu savais que je voulais voir Hamza. Toi, tu connaissais à peine, t’étais pas spécialement fan. Et pourtant, quand la pluie s’est mise à tomber, t’étais partie aux toilettes… mais t’es revenue en pleine douche nationale, trempée comme une éponge en fin de service, juste pour me retrouver. C’est là que je me suis dit que t’étais pas juste une fille bien… t’étais la bonne.',
    img: ''
  },
  {
    id: 7,
    title: 'La rencontre avec Nancy',
    meta: 'Chez moi',
    text: 'Je te raccompagnais à ta voiture après une petite soirée improvisée à la buvette de Thieu, quand t’as sorti ton fameux “viens, on fait soirée avec ta mère.” On n’était même pas encore ensemble, mais j’ai compris que t’étais du genre à rendre la vie imprévisible. Et quand t’as enfin rencontré ma mère, et que j’ai balancé qu’on s’était rencontrés en club libertin, ton visage est devenu rouge comme la fleur de Thieusies.',
    img: ''
  },
  {
    id: 8,
    title: 'Notre premier "voyage"',
    meta: 'Cologne',
    text: 'Entre toi qui soulèves une grille du Moyen Âge, qui utilise des cabines téléphoniques abandonnées, et nous deux qui rigolons (un peu trop fort) à des trucs qu’on n’aurait clairement pas dû… c’était n’importe quoi, mais dans le meilleur sens. On est partis le lendemain de notre premier “nous”, et pourtant, tout sonnait comme si on se connaissait depuis toujours. Ce week-end-là, c’était pas juste incroyable, c’était le début d’un truc qu’aucun de nous deux n’avait vu venir. Merci Adolf.',
    img: ''
  },
  {
    id: 9,
    title: 'Des ballons et des a....lcooliques',
    meta: 'Le Roeulx',
    text: 'Cette soirée où t’avais tellement bu que t’es devenue une sorte d’Arsène Lupin version voleuse de nain de jardin… légendaire. C’était la première fois que tu faisais face à ta peur des nains, et franchement, j’étais fier de toi. Parce qu’en décapitant ce pauvre nain, t’as pas juste vaincu ta peur… t’as posé les bases d’une mythologie personnelle.',
    img: ''
  },
  {
    id: 10,
    title: 'La rencontre avec tes amis',
    meta: 'Sur le marché aux herbes un 27 août',
    text: 'Ce jour-là, j’ai rencontré tes amis, ta bande, ton petit monde à toi. J’ai découvert une partie de ton univers, ceux qui te font rire, qui te portent, qui t’énervent parfois aussi mais que t’aimes fort quand même. J’ai vu à quel point t’étais vraie avec eux, et j’ai compris que faire partie de tout ça, c’était déjà un sacré privilège.',
    img: ''
  },
  {
    id: 11,
    title: 'La rencontre avec ta famille',
    meta: 'Chez toi',
    text: 'J’avais déjà rencontré ta petite sœur et ton petit frère, deux petits loups adorables, un peu comme toi en version miniature. Mais ce jour-là, j’ai rencontré ta maman, celle que tu admires tant, celle qui a mis au monde la 8ᵉ merveille du monde (t\'aimes mon violon?). J’ai aussi rencontré ta cousine, son compagnon, et appris que tu allais être la marraine de la petite Olivia. Et là, j’ai su que j’étais entouré de gens vrais, chaleureux, et que, quelque part au milieu d’eux, j’étais exactement à ma place.',
    img: ''
  },
  {
    id: 12,
    title: 'Aujourd\'hui',
    meta: 'Maintenant',
    text: 'Aujourd’hui, je peux vraiment dire que je suis heureux. Nos différences nous rapprochent, elles font de nous une vraie équipe, plus soudée chaque jour. T’es la plus belle chose qui me soit arrivée depuis longtemps. Mais si tu veux la suite… faudra que tu trouves le deuxième indice. Bonne chance détective.',
    img: ''
  }
]

export const GALLERY: GalleryImages = {
  elle: [
    { src: '/img/elle1.jpeg', caption: 'Quand tu ronfles un peu...' },
    { src: '/img/elle2.jpeg', caption: 'Je ne dirai pas où c\'était' },
    { src: '/img/elle3.jpeg', caption: 'Haaa l\'alcoolisme' },
    { src: '/img/elle4.jpeg', caption: 'À deux doigts de la mort' },
    { src: '/img/elle5.jpeg', caption: 'Finalement c\'est moi qui suis mort...' },
    { src: '/img/elle6.jpeg', caption: '... En la sauvant de la noyade' },
    { src: '/img/elle7.jpeg', caption: 'Et c\'est comme ça qu\'elle me remercie' },
    { src: '/img/elle8.jpeg', caption: 'Le chapelier fou' },
    { src: '/img/elle9.jpeg', caption: 'VOLEUSE' },
    { src: '/img/elle10.jpeg', caption: 'Dotée d\'une force hors du commun' },
    { src: '/img/elle13.jpeg', caption: 'Doudou : 1ère édition 🐉 L’an dernier ? Crise existentielle à 4h du mat’ sur fond de musique locale (on s’en souvient toutes, #Aposauveuse). #Jeannou' },
    { src: '/img/elle11.jpeg', caption: 'J\'aimerai que quelqu\'un m\'explique le concept... Merci Jeannou pour la photo' },
    
    
  ],
  nous: [
    { src: '/img/nous1.jpg', caption: 'Il est bizarre lui, il veut me pécho?' },
    { src: '/img/nous12.jpeg', caption: 'En vrai sympa quand même le mec' },
    { src: '/img/nous2.jpeg', caption: 'En vrai il est vraiment sympa le mec' },
    { src: '/img/nous3.jpeg', caption: 'Crispation max' },
    { src: '/img/nous4.jpeg', caption: 'J+1, c\'est bon je suis à l\'aise' },
    { src: '/img/nous5.jpg', caption: 'Le deuxième photomaton' },
    { src: '/img/nous6.jpeg', caption: 'De bon matin' },
    { src: '/img/nous7.jpeg', caption: 'Notre plus belle photo à deux' },
    { src: '/img/nous8.jpeg', caption: 'Vas y on est mignons' },
    { src: '/img/nous9.jpeg', caption: 'En train de regarder Dobermann' },
    { src: '/img/nous10.jpeg', caption: 'De bon matin 2 + allergie aux chats' },
    { src: '/img/nous11.jpeg', caption: 'Le jour où tu en as découvert un peu plus sur moi en rencontrant ma Marraine' },
    { src: '/img/nous13.jpeg', caption: 'Les gens ont enfin vraiment compris qu\'on était ensemble grâce à ta story! Notre première fois à la mer tous les deux <3' },
    
  ],
  eux: [
    { src: '/img/eux1.jpeg', caption: 'Une vue plongeante...' },
    { src: '/img/eux2.jpeg', caption: 'T\'as eu le ticket gagnant gâce à ce groupe' },
    { src: '/img/eux3.jpeg', caption: 'La fameuse rencontre' },
    { src: '/img/eux4.jpeg', caption: 'Du Bigflo & Oli sous la pluie, des verres, des rires, des danses un peu floues... #Jeannou' },
    { src: '/img/eux5.jpeg', caption: 'Des larmes sur le parking parce qu’elle ne trouvait plus sa voiture... #Jeannou' },
    { src: '/img/eux6.jpeg', caption: 'Finir par dormir chez moi pour fuir le camping… C’est aussi ça, Doureuuuuuuh ✨ #Jeannou' },
    { src: '/img/eux7.jpeg', caption: 'Doudou : 2ème édition 🐉 Cette année ? Sourires, bonne humeur et zéro drame — qui aurait cru ?! Comme quoi, le vrai glow up, c’est pas le mec… c’est elle ✨ #Jeannou' },
    { src: '/img/eux8.jpeg', caption: 'Amsterdam, épisode légendaire 🚭 Après un date romantique dans la rue, une balade sublime dans le quartier rouge, des visites de musées vraiment enrichissantes et un bad trip MÉMORABLE. C’est aussi ça, le genre de souvenirs que laisse Mélo 😁 #Jeannou' },
    { src: '/img/eux9.jpeg', caption: 'Et parce qu’on fête mon anniversaire chaque année ensemble... #Jeannou' },
    { src: '/img/eux10.jpeg', caption: '... il en ressort à chaque fois des anecdotes de dingue (celles-ci, je ne les expliquerai pas… tu t’en souviendras 😁) #Jeannou' },
    { src: '/img/eux11.jpeg', caption: 'Mélo, c’est aussi le genre de femme qu’on peut retrouver le vendredi dans un village paumé, à la fête de la bière, devant une scène avec un vieux rocker, et le samedi, en pleine rave, à taper du pied jusqu’à 6 h du matin. #Jeannou' },
    { src: '/img/eux12.jpeg', caption: 'On en a traversé, des moments difficiles, ensemble. Tu es restée à chaque instant, à m’écouter parler de la même personne en boucle pendant des mois, à me voir “trouver l’homme de ma vie” à chaque coin de rue 😅 Pour tout ça, merci ma Mélostar — et surtout, je t’aime <3 #Jeannou' },
    { src: '/img/eux13.jpeg', caption: 'Nos raves improvisées en plâtre et couverture de survie. Parce que sinon c’est pas vraiment fun 🎉 #Saraaaah' 
    },
    { src: '/img/eux14.jpeg', caption: 'Nos pique-niques sous la pluie. Parce qu’on a besoin que de nous pour sentir le soleil ☀️ #Saraaaah' },
    { src: '/img/eux15.jpeg', caption: 'Parce que toutes nos soirées finissent d’office par un craquage 🤪 #Saraaaah' },
    { src: '/img/eux16.jpeg', caption: 'Nous 3 réunies sous le soleil d’Annecy ☀️ #Saraaaah' },
    { src: '/img/eux17.jpeg', caption: 'Parce que nos fiaks valent le détour 🫶🏻 #Saraaaah' },
    { src: '/img/eux18.jpeg', caption: 'L’amour et le joie dans cette photo.. je trouve qu’elle nous définit tellement ❤️ #Saraaaah' },
    { src: '/img/eux19.jpeg', caption: 'À défaut d’être bonne, t’es aussi une super imitatrice 👌🏼 #Saraaaah' },
    { src: '/img/eux20.jpeg', caption: 'Parce que toi et moi sans une petite bière, c’est comme un karaoké sans Diam’s 🎤🍻 #Saraaaah' },
    { src: '/img/eux21.JPEG', caption: 'Il y\'a un peu plus de 11 ans, on se voyait chez mes parents pour faire des cupcakes ensemble. Tu n\'as jamais cessé d\'être cette personne drôle, solaire et extraordinaire. #Tiph' },
    { src: '/img/eux22.JPEG', caption: 'Après nos retrouvailles, 6 ans plus tard, nos connexions se traduisent même dans nos vêtements ! #Tiph' },
    { src: '/img/eux23.JPEG', caption: 'Nos premières vacances ensemble, à 3. Qui se clôturera sur notre mantra "Gratitude". Des vacances mémorables, parmi les meilleures vacances de ma vie. Même si tu as vomi dans la clim de la voiture. #Tiph' },
    { src: '/img/eux24.jpg', caption: 'En dehors des voyages, tu rends chaque moment mémorable. Je pense qu’en ta présence, pas une seule fois je n’ai fait autre chose que rire aux éclats, ou au minimum sourire… même après une rupture ou un pneu crevé. #Tiph' },
    { src: '/img/eux25.jpg', caption: 'Tu es le genre de star qui encourage ses amies à partager son projecteur, voire faire en sorte que tous les projecteurs soit sur ces amies. #Tiph' }
  ]
}

export const SMS: SmsSection[] = [
  {
    title: 'Le jeudi 3 juillet après Thieusies',
    messages: [
      { from: 'me', text: 'Je crois qu\'en 4 ans t\'es la meuf la plus solaire, la plus bonne ambi que j\'ai rencontré.' },
      { from: 'her', text: 'Ahaha trop mims' },
      { from: 'her', text: 'Faut s\'amuser dans la vie' },
      { from: 'her', text: 'After chez Max dommage tu viens pas' },
      { from: 'me', text: 'Semaine pro on fait un truc' },
      { from: 'me', text: 'Un verre ou une bouffe' },
      { from: 'her', text: 'Si tu m\'invites à manger go' },
      { from: 'me', text: 'Viens au Roeulx ma binchou' }
    ]
  },
  {
    title: 'Un peu plus tard sur le week end qui suivait…',
    messages: [
      { from: 'her', text: 'Jpp ma sœur est tombée sur notre photo et m\'a demandé si t\'étais mon copain 😂😂😂😂' },
      { from: 'me', text: 'Hahahahaah «ha bah non en fait c\'est un mec que je connaissais depuis 2 min »' },
      { from: 'her', text: 'Ahahahaa je t\'ai pas mit de vent, on venait à peine de se rencontrer, ta technique de « tu me raccompagnes à la voiture » comme si j\'étais garde du corps ahaha' },
      { from: 'her', text: 'Tu pensais quand même pas que ça serait si facile ? 🙄😏' },
      { from: 'her', text: 'Minimum un pique nique et un couché de soleil 🙄' },
      { from: 'me', text: 'Hahahahha je pensais que t\'avais compris pa je te demandais de me raccompagner pcq effectivement non t\'es pas garde du corps 🤣' },
      { from: 'her', text: 'Je pensais que tu te sentais pas en sécurité moi... ahahaha 🙄' },
      { from: 'me', text: 'C\'est vrai qu\'on sait jamais ce qui peut arriver vaut mieux être deux quoi 🤣' }
    ]
  },
  {
    title: 'Et 10j plus tard ça y est t\'étais sous le charme de mes violons…',
    messages: [
      { from: 'her', text: 'J\'ai prit ma retraite de Charo moi aha' },
      { from: 'me', text: 'Quand je disais que t\'étais retraitée... hahahaha\nEn vrai ça m\'intéresse plus non plus' },
      { from: 'her', text: 'Ahahah depuis 10j? Mdr\nPcq y a 10j t\'as essayé de me Charo 🙄' },
      { from: 'me', text: 'Pcq y a 10j je te connaissais pas 🙄' },
      { from: 'me', text: 'C\'était pas prévu toi et moi de base 🤣' },
      { from: 'her', text: '🎻🎻🎻' },
      { from: 'me', text: 'Hahahaha j\'avoue le violon était présent 🤣' },
      { from: 'me', text: 'Mais je ressens de moins en moins ce besoin de plaire ou de charo mais avec toi y a eu un feeling direct et comme je te connaissais pas j\'avoue j\'ai essayé 🙄' }
    ]
  },
  {
    title: 'Quelques heures plus tard…',
    messages: [
      { from: 'her', text: 'Bon par contre un peu relou que les heures passent aussi vite quand on traîne ensemble' },
      { from: 'her', text: 'J\'avais pas trop envie que tu partes ce matin' },
      { from: 'me', text: 'Je trouve qu\'avec toi y a vraiment un truc qui se passe que j\'explique pas, genre tout se passe naturellement sans rien forcer d\'un côté comme de l\'autre' },
      { from: 'her', text: 'Honnêtement, j\'aime beaucoup ce qu\'on vit c\'est chouette et comme tu dis naturel, je trouve aussi qu\'il y a un très bon feeling, d\'ailleurs c\'est pour ça que je continue de te voir alors que de base l\'âge moi ça me bloque beaucoup mais pour le coup je te trouve assez mature et réfléchit 🤔 ( après je peux paraître parfois un peu bizarre mais j\'suis encore un peu trauma de ma dernière relation donc je suis parfois sur « ms gardes » comme tu disais, je sais que j\'ai besoin de temps mais dans tout\nles cas tu reste une très belle rencontre donc je sais pas où ça va mais en tout cas j\'aime bien ☺️' }
    ]
  },
  {
    title: 'À la veille de Dour',
    messages: [
      { from: 'her', text: 'Ouiiiiiiiiiii ça va être incroyable, j\'ai tellement hâte ! C\'est « mes vacances » en qq sorte de cette année 🥰' },
      { from: 'me', text: 'Je suis content pour toi, tu le mérites après autant d\'heures de taff (même si tu te reposes à fedasil) hahahaha' },
      { from: 'her', text: 'Ahaha je suis contente que tu te sentes suffisamment à l\'aise pour être toi même, merci pour ton honnêteté 🫶🏼' },
      { from: 'me', text: 'Je suis juste heureux quand on se voit sans que je l\'explique, t\'arrives à me mettre dans un mood où je suis 100% à l\'aise avec toi! Toi aussi merci d\'être toi même avec moi 🫶🏼' }
    ]
  },
  {
    title: 'Et ta mignonitude après notre journée à Doureuuuh…',
    messages: [
      { from: 'her', text: 'En tout cas je regrette pas du tout d\'avoir passé cette journée avec toi vraiment, je sais que t\'avais pas hyper bien prit le fait que j\'avais dit que je ne voulais pas passer la journée avec toi de base mais c\'est parce que ça m\'arrive de me sentir vite oppressée, mais là pour le coup c\'était pas le cas et franchement merci pour la journée d\'hier c\'était trop chouette ❤️' },
      { from: 'her', text: 'Je suis contente de t\'avoir rencontré' }
    ]
  },
  {
    title: 'À chaque fois qu\'on se voyait, c\'est toujours comme ça maintenant en fait…',
    messages: [
      { from: 'her', text: 'J\'ai passé un très bon moment, ça m\'a fait vraiment du bien cette soirée avec toi ❤️' },
      { from: 'her', text: 'J\'aime bien cette liberté d\'être moi même sans filtre' },
      { from: 'me', text: 'Ça devient une habitude, ça me fait du bien aussi quand je te vois, tu me donnes le sourire à chaque fois ❤️' }
    ]
  },
  {
    title: 'Et après les nombreuses autres soirées qu\'on a passé à discuter…',
    messages: [
      { from: 'me', text: 'Je sais pas comment expliquer ce qu\'on vit, ça m\'a vraiment fait kiffer les discussions qu\'on a eu hier soir! ( à par peut être la partie où je suis pas ton style)🤣\nOn apprend à se connaître encore aujourd\'hui à notre rythme et le fait que tu me fasses confiance au point de m\'expliquer des choses aussi intimes sur toi me touche beaucoup, t\'es la personne dont je me lasse pas avec qui je suis toujours bien et merci pour ça 🫶🏼' },
      { from: 'her', text: 'Oui, pareil de mon côté... c\'est vrai que c\'est un lien spécial. Mais je me sens de plus en plus à l\'aise donc merci à toi de m\'offrir un espace sécurisant où je peux avoir la liberté de m\'ouvrir. Mais la Melo que t\'as vu hier y a très peu de gens qui l\'ont vue donc tu peux te sentir privilégié... aha mais en vrai tu devrais le prendre bien que tu sois pas mon style de base.\nParce que malgré ça j\'ai quand même creusé avec toi parce que je voyais que y avait des choses intéressantes derrière et en vrai plus le temps passe plus je comprend.\nMais je ne me lasse pas du tout non plus d\'être avec toi, j\'ai préféré 1000x la soirée d\'hier que de sortir 🥰🫶🏼' },
      { from: 'me', text: 'En vrai ça faisait longtemps que je m\'étais plus senti aussi bien et aussi à l\'aise avec quelqu\'un, on vit quelque chose de vraiment bien et hâte de voir ce que ça nous réserve 🫶🏼' },
      { from: 'her', text: 'Tout pareil, j\'pense que j\'me pose pas de questions mais effectivement parfois ça me fait bizarre de voir qq aussi régulièrement 🥲mais sans regrets j\'aime beaucoup trop passer du temps avec toi 😘 prends pas la\ngrosse tête' }
    ]
  },
  {
    title: 'Pendant le voyage en Égypte… Il nous aura servi à se faire confiance et à sortir plus fort!',
    messages: [
      { from: 'her', text: 'J\'me laisse tt doucement m\'ouvrir fort avec toi côté sentimental et c\'est vrmt qq chose de pas évident pour moi, j\'espère juste que tu ne profiteras pas de ça, je déteste être vulnérable parce que j\'ai vrmt peur d\'être blessée à nouveau et même si je fais la meuf et tout je tiens bcp à toi et j\'ai vrmt pas envie que ça s\'arrête entre nous 🫶🏼' },
      { from: 'her', text: 'Je dois être honnête avec toi, j\'me sens un petit peu en insécurité mais j\'essaie de réapprendre à faire confiance parce que tu dois pas payer les pots cassés de mon passé, mais ça me rappelle des souvenirs pas ouf... mais bon, j\'pense que ça se passera bien & j\'espère pouvoir te faire confiance, c\'est un bon exercice pour moi aussi, mais par contre quand tu rentres tu m\'abandonnes plus hein 🙄 les prochaines ça sera à 2 InchAllah 🥰❤️' },
      { from: 'me', text: 'Je pense que je dois te faire confiance, sinon je me rends juste malade pour rien... Je suis très bien avec toi et j\'espère que tu seras correct autant que je l\'espère, je ne te ferai pas ce que j\'ai envie qu\'on te fasse donc je pense qu\'on peut vraiment déboucher sur quelque chose de vraiment bien\nÇa me tente bien ce programme après le voyage 🙄\nAttends moi pour mercredi arnaqueuse!! ❤️' },
      { from: 'her', text: 'N\'empêche je suis assez étonnée de moi, j\'pensais que j\'allais me sentir bcp plus angoissée vis à vis de la confiance et tout que tu sois en vacances mais en vrai ça va je trouve non?' },
      { from: 'her', text: 'J\'suis contente que ça se passe comme ça parce que j\'me dis que j\'arrive quand même à avoir confiance malgré mes antécédents, sans te mentir j\'avais peur d\'être chiante avec toi parce que j\'aime bcp contrôler mais pour le coup pas du tt 🙄 et merci de me dire quand tu rentres et ce que tu fais ça me met en sécurité ❤️' },
      { from: 'her', text: 'Par contre arrête de le prendre mal quand je te dis que t\'es pas mon genre de base. Ça ne veut pas dire que je ne te trouve pas beau ou attirant. Mais le truc c\'est que j\'aime beaucoup qui tu es, enfin de ce que je connais jusqu\'à mtn, ta personnalité me plaît énormément, ta réflexion, le fait que tu sois très posé, secure et toi en fait simplement. Je te trouve atypique et ça me plaît de ouf. C\'est vraiment ce qui m\'a attiré le + chez toi et honnêtement je te trouve très charismatique, à savoir que j\'aime vraiment beaucoup les gens charismatiques, qui dégagent des choses. Donc j\'ai vraiment envie d\'enlever ça de ta tête parce que je veux pas que ça te vexe alors qu\'au contraire ce que j\'essaie d\'exprimer et tout l\'inverse. Justement le fait que de base tu ne sois pas mon genre et que j\'ai été beaucoup plus loin avec toi c\'est bien la preuve que j\'ai été attirée par + qu\'un humour ou un physique mais toi tout entier 🫶🏼' }
    ]
  }
]

export const FINALE: FinaleInfo = {
  hour: '19:00',
  address: 'Nom du restaurant, Adresse complète (à remplacer)'
}

export const STEPS_INFO = [
  {
    id: 1,
    title: 'Notre parcours',
    subtitle: 'Les moments qui ont comptés',
    hint: 'Un indice t’attend là où les croquettes disparaissent comme par magie',
    icon: 'clock'
  },
  {
    id: 2,
    title: 'Moments capturés',
    subtitle: 'Toi + moi + tous ceux qui le veulent',
    hint: 'Tu devrais aller voir là où s’éclaire la nuit depuis ta main.',
    icon: 'camera'
  },
  {
    id: 3,
    title: 'Le petit mot',
    subtitle: 'Sortez les mouchoirs!',
    hint: 'Tu me trouveras en cherchant chaleur, lumière et réconfort.',
    icon: 'envelope'
  },
  {
    id: 4,
    title: 'Nos mots partagés',
    subtitle: 'Les conversations qui durent',
    hint: 'Va là où même les princesses frottent pour que la magie opère, tu trouveras la suite dans le coin où Cendrillon planquerait son seau.',
    icon: 'comments'
  },
  {
    id: 5,
    title: 'Le cadeau',
    subtitle: 'J\'espère que ça te plaira',
    hint: 'Je pense que tu as reçu du courrier ',
    icon: 'gift'
  }
]

export const LETTER_CONTENT = `Bon anniversaire, toi!

Je tenais à te dire qu’en quelques mois, t’es devenue un personnage principal dans mon histoire. T’as pris une telle importance qu’aujourd’hui, avant de penser à moi, je pense à nous…

T’as déjà un gros cou et des grosses chevilles, mais c’est ton anniversaire, alors je peux me permettre de les gonfler encore un peu 🙄
T’es la personne la plus gentille et bienveillante que je connaisse. Ton amour pour tes proches, pour les animaux, pour la vie, est inestimable. T’es une personne forte, capable de porter le malheur des autres à bout de bras jusqu’à ce qu’il se transforme en bonheur. Ne change pas ❤️

Je me souviendrai toute ma vie de cette soirée où ni toi ni moi ne devions être. Ce soir-là, j’ai rencontré la personne la plus solaire que je connaisse : un petit bout de femme enjoué avec qui le temps s’est arrêté ⏳

Le temps passe trop vite à tes côtés, pourtant j’en ai pas perdu une seconde. Jusqu’à aujourd’hui, les aiguilles tournent sans que je m’en rende compte, tellement tout paraît mieux avec toi. Tout ce que j’aimais faire seul est devenu meilleur depuis que t’es là…

Petit à petit, on apprend à se comprendre, à s’écouter, à construire.
Notre communication, notre confiance et notre respect mutuel sont les fondations solides d’une relation qui grandit chaque jour un peu plus.

Bref, je t’aime fort ❤️
Profite de ton anniversaire, ris, vis, sois toi! Cette personne merveilleuse, entière, lumineuse.
Je suis fier d’être ton copain, et je ne peux que t’admirer 🥰`
