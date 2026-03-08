/**
 * Static fallback data for heroes missing from marvelrivalsapi.com
 * These are merged into the live API response at runtime.
 * Update this file manually when the API eventually adds these heroes.
 *
 * Heroes covered:
 *  - Blade        (Season 3.5, hero #41)
 *  - Angela       (Season 4,   hero #42)
 *  - Daredevil    (Season 4.5, hero #43)
 *  - Gambit       (Season 5,   hero #44)
 *  - Rogue        (Season 5.5, hero #45)
 *  - Deadpool     (Season 6,   hero #46)
 *  - Elsa Bloodstone (Season 6.5, hero #47)
 */

export interface MissingHero {
  id: number;
  name: string;
  real_name: string;
  imageUrl: string;
  role: string;
  attack_type: string;
  team: string[];
  difficulty: string;
  bio: string;
  lore: string;
  season_added: string;
  transformations: {
    id: string;
    name: string;
    icon: string;
    health: string | null;
    movement_speed: string | null;
  }[];
  abilities: {
    id: number;
    icon: string;
    name: string;
    type: string;
    isCollab: boolean;
    description: string;
    transformation_id: string;
  }[];
  costumes: {
    id: string;
    name: string;
    icon: string;
    quality: "NO_QUALITY" | "BLUE" | "PURPLE" | "ORANGE";
    description: string;
    appearance: string;
  }[];
}

export const MISSING_HEROES: MissingHero[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // BLADE — Season 3.5: The Abyss Awakens
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1038,
    name: "Blade",
    real_name: "Eric Brooks",
    imageUrl: "https://marvelrivalsapi.com/rivals/heroes/card/blade.png",
    role: "Duelist",
    attack_type: "Melee Heroes",
    team: ["Night Watch"],
    difficulty: "3",
    bio: "Born of a human mother bitten by a vampire, Eric Brooks inherited superhuman strength, speed, and an immunity to vampiric infection. Armed with a titanium sword and an arsenal of UV weaponry, Blade has spent his entire life hunting the creatures of the night.",
    lore: "Caught between the world of the living and the undead, Blade walks the razor's edge. He arrived in the fractured Marvel universe drawn by a surge of vampiric energy, a dark resonance strong enough to pull him across realities. Where the darkness gathers, the Daywalker follows.",
    season_added: "Season 3.5",
    transformations: [
      {
        id: "0",
        name: "Blade",
        icon: "/rivals/heroes/transformations/blade-headbig-0.webp",
        health: "250",
        movement_speed: "6 m/s",
      },
    ],
    abilities: [
      {
        id: 90010,
        icon: "",
        name: "Soul Slash",
        type: "Weapon",
        isCollab: false,
        description: "Swing Blade's titanium sword in a rapid melee combo.",
        transformation_id: "0",
      },
      {
        id: 90011,
        icon: "",
        name: "Shotgun Blast",
        type: "Weapon",
        isCollab: false,
        description: "Fire UV-charged shotgun rounds at close range.",
        transformation_id: "0",
      },
      {
        id: 90012,
        icon: "",
        name: "Daywalker Dash",
        type: "Normal",
        isCollab: false,
        description: "Dash forward through enemies, dealing damage and briefly stunning targets hit.",
        transformation_id: "0",
      },
      {
        id: 90013,
        icon: "",
        name: "Vamp Senses",
        type: "Passive",
        isCollab: false,
        description: "Blade detects nearby enemies through walls using heightened vampiric senses.",
        transformation_id: "0",
      },
      {
        id: 90014,
        icon: "",
        name: "Bloodline Awakening",
        type: "Normal",
        isCollab: false,
        description: "Activate vampiric blood to temporarily boost movement speed and damage output.",
        transformation_id: "0",
      },
      {
        id: 90015,
        icon: "",
        name: "Thousand-Fold Slash",
        type: "Ultimate",
        isCollab: false,
        description: "Unleash a devastating flurry of sword strikes, dealing massive damage to all enemies in range.",
        transformation_id: "0",
      },
    ],
    costumes: [
      {
        id: "blade-10380001",
        name: "Blade",
        icon: "/costumes/blade-10380001.png",
        quality: "NO_QUALITY",
        description: "0",
        appearance: "Default",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ANGELA — Season 4: Heart of the Dragon
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1042,
    name: "Angela",
    real_name: "Aldrif Odinsdottir",
    imageUrl: "https://marvelrivalsapi.com/rivals/heroes/card/angela.png",
    role: "Vanguard",
    attack_type: "Melee Heroes",
    team: ["Asgardians"],
    difficulty: "4",
    bio: "Stolen from Asgard as an infant, Aldrif was raised among the Angels of the Tenth Realm to become their greatest warrior. Known as Angela, the Hand of Heven, she wields weapons forged from Ichor and commands the battlefield from the skies — the first Vanguard who fights freely in flight.",
    lore: "When Hela kidnapped her sister Laussa, Angela gave chase across a collapsing universe locked in eternal combat. She eventually found her way home, tracking Laussa and Hela to the Eighth City in the newly-formed Heart of Heven. The Hand of Heven is here — show some respect.",
    season_added: "Season 4",
    transformations: [
      {
        id: "0",
        name: "Angela",
        icon: "/rivals/heroes/transformations/angela-headbig-0.webp",
        health: "550",
        movement_speed: "6 m/s",
      },
    ],
    abilities: [
      {
        id: 90020,
        icon: "",
        name: "Spears of Ichors",
        type: "Weapon",
        isCollab: false,
        description: "Lunge forward with a divine spear. Damage scales with current Attack Charge. At full charge, launches enemies upward.",
        transformation_id: "0",
      },
      {
        id: 90021,
        icon: "",
        name: "Axes of Ichors",
        type: "Weapon",
        isCollab: false,
        description: "Strike with twin axes in a four-hit combo. The fourth hit propels Angela forward. Attack Charge doubles damage per hit.",
        transformation_id: "0",
      },
      {
        id: 90022,
        icon: "",
        name: "Shielded Stance",
        type: "Normal",
        isCollab: false,
        description: "Form a shield from Ichor to block incoming melee and ranged attacks. Absorbing damage builds Attack Charge.",
        transformation_id: "0",
      },
      {
        id: 90023,
        icon: "",
        name: "Seraphic Soar",
        type: "Passive",
        isCollab: false,
        description: "Angela flies freely. Moving forward in flight rapidly charges the Attack Charge meter.",
        transformation_id: "0",
      },
      {
        id: 90024,
        icon: "",
        name: "Assassin's Charge",
        type: "Normal",
        isCollab: false,
        description: "Fly forward and impale up to two enemies on the spear, dragging them until the charge ends or the bar depletes.",
        transformation_id: "0",
      },
      {
        id: 90025,
        icon: "",
        name: "Divine Judgement",
        type: "Normal",
        isCollab: false,
        description: "Dive to the ground and create a judgment zone. Allies gain bonus health and speed; enemies take damage over time.",
        transformation_id: "0",
      },
      {
        id: 90026,
        icon: "",
        name: "Heven's Retribution",
        type: "Ultimate",
        isCollab: false,
        description: "Hurl a ribbon-wrapped spear that binds and holds enemies in place. Slam down to create a Divine Judgement Zone on impact.",
        transformation_id: "0",
      },
    ],
    costumes: [
      {
        id: "angela-10420001",
        name: "Angela",
        icon: "/costumes/angela-10420001.png",
        quality: "NO_QUALITY",
        description: "0",
        appearance: "Default",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DAREDEVIL — Season 4.5: Heart of the Dragon
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1043,
    name: "Daredevil",
    real_name: "Matt Murdock",
    imageUrl: "https://marvelrivalsapi.com/rivals/heroes/card/daredevil.png",
    role: "Duelist",
    attack_type: "Melee Heroes",
    team: ["MarvelKnights"],
    difficulty: "3",
    bio: "A tragic accident robbed Matt Murdock of his sight but awakened an extraordinary Radar Sense that paints the world in sound and touch. By day he defends Hell's Kitchen in the courtroom; by night, Daredevil wields his billy clubs to deliver the justice the law cannot.",
    lore: "Drawn into the fractured Marvel universe by echoes of injustice, Daredevil tracked the source to the Heart of the Dragon conflict. Where the law fails, the Man Without Fear does not — and evil will find no shelter from his radar-guided wrath.",
    season_added: "Season 4.5",
    transformations: [
      {
        id: "0",
        name: "Daredevil",
        icon: "/rivals/heroes/transformations/daredevil-headbig-0.webp",
        health: "250",
        movement_speed: "6 m/s",
      },
    ],
    abilities: [
      {
        id: 90030,
        icon: "",
        name: "Billy Club Strike",
        type: "Weapon",
        isCollab: false,
        description: "Swing billy clubs in a rapid melee combo, consuming Fury charges to empower strikes.",
        transformation_id: "0",
      },
      {
        id: 90031,
        icon: "",
        name: "Objection",
        type: "Normal",
        isCollab: false,
        description: "Enter a defensive stance for up to 1.5s, deflecting attacks and projectiles. Grants 2 Fury if at least one attack is deflected.",
        transformation_id: "0",
      },
      {
        id: 90032,
        icon: "",
        name: "Devil's Latch",
        type: "Normal",
        isCollab: false,
        description: "Grapple to a surface or enemy. Hitting an enemy reels them in and enables Righteous Cross. Grants 1 Fury on completion.",
        transformation_id: "0",
      },
      {
        id: 90033,
        icon: "",
        name: "Radar Sense",
        type: "Passive",
        isCollab: false,
        description: "Detects nearby enemies and allies through walls. Enemies beyond a certain range become invisible to the player.",
        transformation_id: "0",
      },
      {
        id: 90034,
        icon: "",
        name: "Infernal Fury",
        type: "Normal",
        isCollab: false,
        description: "Spend 2 Fury to unleash Devil's Chain (close-range strike granting bonus health) or Devil's Throw (baton bounce between enemies, slowing targets).",
        transformation_id: "0",
      },
      {
        id: 90035,
        icon: "",
        name: "Sonic Pursuit",
        type: "Normal",
        isCollab: false,
        description: "Mark a target to gain damage reduction and movement speed boost. Dash to the marked target to blind them and gain 2 Fury.",
        transformation_id: "0",
      },
      {
        id: 90036,
        icon: "",
        name: "Let The Devil Out",
        type: "Ultimate",
        isCollab: false,
        description: "Create a dome that blinds enemies within line of sight and ramps up damage over time. Continuously regenerates Fury while active.",
        transformation_id: "0",
      },
    ],
    costumes: [
      {
        id: "daredevil-10430001",
        name: "Daredevil",
        icon: "/costumes/daredevil-10430001.png",
        quality: "NO_QUALITY",
        description: "0",
        appearance: "Default",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // GAMBIT — Season 5: Love is a Battlefield
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1044,
    name: "Gambit",
    real_name: "Remy LeBeau",
    imageUrl: "https://marvelrivalsapi.com/rivals/heroes/card/gambit.png",
    role: "Strategist",
    attack_type: "Projectile Heroes",
    team: ["X-Men"],
    difficulty: "4",
    bio: "Remy LeBeau — the mutant thief Gambit — combines Cajun charm with the ability to charge any object with kinetic energy, turning a simple playing card into an explosive projectile. Louisiana-born and self-taught, his suave wit masks one of Marvel's most dangerously unpredictable mutants.",
    lore: "Laissez les bons temps rouler. Gambit arrived in the museum conflict alongside his beloved Rogue, their romance as volatile and kinetic as the cards he charges. When the multiverse needed a wild card, it got exactly that — the Ragin' Cajun, ready to raise the stakes.",
    season_added: "Season 5",
    transformations: [
      {
        id: "0",
        name: "Gambit",
        icon: "/rivals/heroes/transformations/gambit-headbig-0.webp",
        health: "275",
        movement_speed: "6 m/s",
      },
    ],
    abilities: [
      {
        id: 90040,
        icon: "",
        name: "Bidding Barrage",
        type: "Weapon",
        isCollab: false,
        description: "Rapid-fire charged playing cards that deal kinetic damage on impact.",
        transformation_id: "0",
      },
      {
        id: 90041,
        icon: "",
        name: "Big Easy Impact",
        type: "Normal",
        isCollab: false,
        description: "Charge a large object with kinetic energy and hurl it forward, dealing massive area damage.",
        transformation_id: "0",
      },
      {
        id: 90042,
        icon: "",
        name: "Staff Sweep",
        type: "Normal",
        isCollab: false,
        description: "Swing Gambit's charged bo staff to knock nearby enemies off their feet.",
        transformation_id: "0",
      },
      {
        id: 90043,
        icon: "",
        name: "Bridge Boost",
        type: "Normal",
        isCollab: false,
        description: "Channel kinetic energy into a nearby ally, amplifying their damage and granting them bonus health.",
        transformation_id: "0",
      },
      {
        id: 90044,
        icon: "",
        name: "Ragin' Royal Flush",
        type: "Ultimate",
        isCollab: false,
        description: "Deal a full hand — unleash a rapid barrage of hyper-charged cards that pierce through enemies and dramatically increase in damage with each hit.",
        transformation_id: "0",
      },
    ],
    costumes: [
      {
        id: "gambit-10440001",
        name: "Gambit",
        icon: "/costumes/gambit-10440001.png",
        quality: "NO_QUALITY",
        description: "0",
        appearance: "Default",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ROGUE — Season 5.5: Love is a Battlefield
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1045,
    name: "Rogue",
    real_name: "Anna Marie",
    imageUrl: "https://marvelrivalsapi.com/rivals/heroes/card/rogue.png",
    role: "Vanguard",
    attack_type: "Melee Heroes",
    team: ["X-Men"],
    difficulty: "3",
    bio: "Anna Marie — Rogue — has never been able to touch another person without absorbing their memories, emotions, and powers. A burden that became her greatest weapon: any ability she can steal, she can turn against its owner. A durable hybrid tank who fights at the front while sapping enemy strength.",
    lore: "She came to the museum conflict hand-in-hand with Gambit, their unspoken love as powerful as any ability she has ever absorbed. When enemies try to bring her down, they find themselves weakened instead — because Rogue doesn't just take hits, she takes everything.",
    season_added: "Season 5.5",
    transformations: [
      {
        id: "0",
        name: "Rogue",
        icon: "/rivals/heroes/transformations/rogue-headbig-0.webp",
        health: "650",
        movement_speed: "6 m/s",
      },
    ],
    abilities: [
      {
        id: 90050,
        icon: "",
        name: "Power Surge Punch",
        type: "Weapon",
        isCollab: false,
        description: "Perform two quick melee strikes then a slower thrusting strike dealing increased damage.",
        transformation_id: "0",
      },
      {
        id: 90051,
        icon: "",
        name: "Defensive Stance",
        type: "Normal",
        isCollab: false,
        description: "Reduce damage taken from the front and pull in oncoming projectiles. Blocked damage charges backlash energy for Southern Brawl.",
        transformation_id: "0",
      },
      {
        id: 90052,
        icon: "",
        name: "Southern Brawl",
        type: "Normal",
        isCollab: false,
        description: "Dash forward and strike, draining all stored backlash energy for a powerful knockback hit.",
        transformation_id: "0",
      },
      {
        id: 90053,
        icon: "",
        name: "Fatal Attraction",
        type: "Normal",
        isCollab: false,
        description: "Short dash that can be re-activated to create a temporary zone dealing damage over time to nearby enemies.",
        transformation_id: "0",
      },
      {
        id: 90054,
        icon: "",
        name: "Ability Absorption",
        type: "Normal",
        isCollab: false,
        description: "Reach out and steal an enemy hero's ability for 10 seconds, reducing their stats while empowering Rogue.",
        transformation_id: "0",
      },
      {
        id: 90055,
        icon: "",
        name: "Unbridled Potential",
        type: "Ultimate",
        isCollab: false,
        description: "Channel all absorbed power into a devastating full-body surge that knocks back nearby enemies and grants Rogue bonus health.",
        transformation_id: "0",
      },
    ],
    costumes: [
      {
        id: "rogue-10450001",
        name: "Rogue",
        icon: "/costumes/rogue-10450001.png",
        quality: "NO_QUALITY",
        description: "0",
        appearance: "Default",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DEADPOOL — Season 6: Night at the Museum
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1046,
    name: "Deadpool",
    real_name: "Wade Wilson",
    imageUrl: "https://marvelrivalsapi.com/rivals/heroes/card/the-deadpool.png",
    role: "Duelist",
    attack_type: "Hitscan Heroes",
    team: ["MarvelKnights"],
    difficulty: "3",
    bio: "Wade Wilson is the Merc with a Mouth — a former special forces operative turned mercenary whose experimental regeneration serum granted him an accelerated healing factor along with an unstable mind and an unbreakable fourth wall. Equal parts lethal and insufferable, Deadpool is Marvel Rivals' first Multi-Role hero.",
    lore: "Thanks to an experimental serum that vastly extended his lifespan, Deadpool's war has continued into the far-flung future. As a member of the New Marvel Knights, his impressive arsenal has become a vital part of Black Widow's crusade against Doom 2099. He arrived at the museum with a quip ready and his katanas drawn — and honestly, he's been having a great time.",
    season_added: "Season 6",
    transformations: [
      {
        id: "0",
        name: "Deadpool",
        icon: "/rivals/heroes/transformations/the-deadpool-headbig-0.webp",
        health: "300",
        movement_speed: "6 m/s",
      },
    ],
    abilities: [
      {
        id: 90060,
        icon: "",
        name: "Dual Pistols",
        type: "Weapon",
        isCollab: false,
        description: "Rapid-fire dual pistols dealing consistent hitscan damage at range.",
        transformation_id: "0",
      },
      {
        id: 90061,
        icon: "",
        name: "Katana Slash",
        type: "Weapon",
        isCollab: false,
        description: "Switch to twin katanas for high melee damage in close quarters.",
        transformation_id: "0",
      },
      {
        id: 90062,
        icon: "",
        name: "Chimichanga Rush",
        type: "Normal",
        isCollab: false,
        description: "Dash forward, closing distance with a target and slashing with a katana.",
        transformation_id: "0",
      },
      {
        id: 90063,
        icon: "",
        name: "Regen Factor",
        type: "Passive",
        isCollab: false,
        description: "Deadpool's healing factor passively restores health over time when out of combat.",
        transformation_id: "0",
      },
      {
        id: 90064,
        icon: "",
        name: "Role Switch",
        type: "Normal",
        isCollab: false,
        description: "Toggle between Vanguard, Duelist, and Strategist roles, changing stats and some ability effects.",
        transformation_id: "0",
      },
      {
        id: 90065,
        icon: "",
        name: "Maximum Effort",
        type: "Ultimate",
        isCollab: false,
        description: "Go all out — unleash a rapid combo of gunfire and katana strikes that overwhelm a target area with pure chaos damage.",
        transformation_id: "0",
      },
    ],
    costumes: [
      {
        id: "deadpool-10460001",
        name: "Deadpool",
        icon: "/costumes/the-deadpool-10460001.png",
        quality: "NO_QUALITY",
        description: "0",
        appearance: "Default",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ELSA BLOODSTONE — Season 6.5: Night at the Museum
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1047,
    name: "Elsa Bloodstone",
    real_name: "Elsa Bloodstone",
    imageUrl: "https://marvelrivalsapi.com/rivals/heroes/card/elsa-bloodstone.png",
    role: "Duelist",
    attack_type: "Hitscan Heroes",
    team: ["MarvelKnights"],
    difficulty: "3",
    bio: "Born into a lineage of legendary monster hunters, Elsa Bloodstone carries the power of the Bloodstone Choker — granting superhuman strength, agility, and endless stamina. Dry wit, British bluntness, and a double-barrelled shotgun: prey doesn't get a second chance.",
    lore: "The instinct to hunt is in her blood, and every foe she faces inevitably becomes prey ensnared in her traps. Elsa arrived at the museum with her guns loaded and her creatures ready, lured by a convergence of monstrous energy strong enough to make even the Bloodstone itself glow. She wasn't going to miss a hunt this good.",
    season_added: "Season 6.5",
    transformations: [
      {
        id: "0",
        name: "Elsa Bloodstone",
        icon: "/rivals/heroes/transformations/elsa-bloodstone-headbig-0.webp",
        health: "275",
        movement_speed: "6 m/s",
      },
    ],
    abilities: [
      {
        id: 90070,
        icon: "",
        name: "Double-Barrel Blaster",
        type: "Weapon",
        isCollab: false,
        description: "Close-range shotgun firing two-shot bursts. Deals high damage up close with 8 shells before reload.",
        transformation_id: "0",
      },
      {
        id: 90071,
        icon: "",
        name: "Elephant Gun",
        type: "Weapon",
        isCollab: false,
        description: "Switch to a long-range elephant gun that pierces through multiple enemies and deals very high damage per shot.",
        transformation_id: "0",
      },
      {
        id: 90072,
        icon: "",
        name: "Living Bullet",
        type: "Normal",
        isCollab: false,
        description: "Fire a special round that splits on impact, seeking nearby enemies and marking each with a Spectral Sigil.",
        transformation_id: "0",
      },
      {
        id: 90073,
        icon: "",
        name: "Helix Advance",
        type: "Normal",
        isCollab: false,
        description: "Dash forward and empower the next Double-Barrel Blaster shot with piercing damage. Cooldown reduced by Inherited Instinct stacks.",
        transformation_id: "0",
      },
      {
        id: 90074,
        icon: "",
        name: "Smoky Snare",
        type: "Normal",
        isCollab: false,
        description: "Deploy a creature trap that immobilizes the first enemy to walk through it for 1.2 seconds.",
        transformation_id: "0",
      },
      {
        id: 90075,
        icon: "",
        name: "Inherited Instinct",
        type: "Passive",
        isCollab: false,
        description: "Dealing damage charges Instinct stacks, reducing Helix Advance cooldown. Gain Instinct on KO; lose one level on death.",
        transformation_id: "0",
      },
      {
        id: 90076,
        icon: "",
        name: "Apex Predator",
        type: "Ultimate",
        isCollab: false,
        description: "Summon Glartrox to charge forward, capturing enemies in its path and dragging them to a wall for a devastating bite. Can be recalled early.",
        transformation_id: "0",
      },
    ],
    costumes: [
      {
        id: "elsa-10470001",
        name: "Elsa Bloodstone",
        icon: "/costumes/elsa-bloodstone-10470001.png",
        quality: "NO_QUALITY",
        description: "0",
        appearance: "Default",
      },
    ],
  },
];

/** Lookup map by hero name (lowercase) for fast merging */
export const MISSING_HEROES_MAP = new Map(
  MISSING_HEROES.map((h) => [h.name.toLowerCase(), h])
);
