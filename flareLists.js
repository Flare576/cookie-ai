const flareAscensionList = [
  [
    363, // Cost: 1, Unlocks others (Legacy)
    323, // Cost: 9, (How to bake your dragon) req363
    395, // Cost: 3, 10% increase Cookie multiplier (Heavenly cookies) req363
    264, // Cost: 100, Unlock perrmanent slot (put best kitten) req363
    254, // Cost: 25, unlocks more cookie upgrades (macarons) req395
    255, // Cost: 25, unlocks more cookie upgrades (brand biscuits) req395
    253, // Cost: 25, unlocks more cookie upgrades (british tea biscuits) req395
    282, // Cost: 75, 5% more golden cookies (Heavenly Luck) req363
    520, // Cost: 100, 1% per herald (Heralds) - we're offline, so it doesn't count, but it unlocks seasons req363
  ],[
    181, // Cost: 1111, Unlock Season Switcher (Season Switcher) req520
    327, // Cost: 999, Unlock Golden Switch (Golden Switch) req282
    283, // Cost: 777, Golden Cookies effects last 10% longer (Lasting fortune) req282
  ],[
    281, // Cost: 1, Offline Mode (Twin Gates of Transcendence) req363
    326, // Cost: 25, unlocks more cookie upgrades (butter cookies) req395
    288, // Cost: 50, start with 10 cursors (Starter kit) req254 req255 req253 req326
    290, // Cost: 55,555, clicking +10% (Halo gloves) req288
    141, // Cost: 500, Research 10x faster (Persistent memory) req363
  ],[
    265, // Cost: 20,000, Unlock perrmanent slot II (put ??????)
  ],[
    365, // Cost: 99,999, 10% CPS for golden cookie upgrades (Residual luck) req327
  ],[
    266, // Cost: 3m, Unlock perrmanent slot III (put ??????)
    719, // Cost: 555.555m, Cursor levels boost clicks 5% (Aura gloves) req290
    720, // Cost: 555.555b, Cursor levels to 20 (Luminous gloves) req719

    // Trans left
    353, // Cost: 7, Offline 2h (Belphegor) req281
    354, // Cost: 49, Offline 4h (Mammon) req353
    355, // Cost: 343, Offline 8h (Abaddon) req354
    356, // Cost: 2,401, Offline 16h (Satan) req355
    357, // Cost: 16,807, Offline 1d,8h (Asmodeus) req356
    358, // Cost: 117,649, Offline 2d,16h (Beelzebub) req357
    359, // Cost: 823,543, Offline 5d,8h (Lucifer) req358

  ],[
    // Trans right
    274, // Cost: 7, Offline 15% (Angels) req281
    275, // Cost: 49, Offline 25% (Archangels) req274
    276, // Cost: 343, Offline 35% (Virtues) req275
    277, // Cost: 2,401, Offline 45% (Dominions) req276
    278, // Cost: 16,807, Offline 55% (Cherubim) req277
    279, // Cost: 117,649, Offline 65% (Seraphim) req278
    280, // Cost: 823,543, Offline 75% (God) req279

    291, // Cost: 9,000, Kittens 10% (Kitten angels) req277
    717, // Cost 9b, Kitten upgrades boost grandma 29% (Cat ladies) req291
    718, // Cost: 900b, Grandmas get 5% from milk (Milkhelp) req717

    393, // Cost: 222,222 Synergys @ 15 of each building (Synergies Vol. I) req356 req277
    394, // Cost: 2.222m, Synergys @ 75 of each building (Synergies Vol. II) req358 req393 req279

    325, // Cost: 40.354m, Synergy upgrads 2% off, 5% regular CPS, Offline 2d (Chimera) req359 req394 req280

    268, // Cost: 555,555b, Upgrades 1% cheaper per 100 cursors (Five-finger discount) req290 req355

  ],[
    // Starter branch
    289, // Cost: 5000, start with 5 grandmas (Starter kitchen) req288
    292, // Cost: 44,444, Wrinklers appear 5x faster (Unholy bait) req289
    364, // Cost: 444,444, +2 Wrinklers (Elder spice) req292
    293, // Cost: 444,444, Wrinklers explode +5% (Sacrilegious corruption) req292

    396, // Cost: 6.66m, 10% CPS (Wrinkly cookies) req293 req364
    495, // Cost: 100m, Mouse tip for wrinkler (Eye of the wrinkler) req396
    408, // Cost: 100m, Sugar lumps -1h (Stevia caelestis) req396
    449, // Cost: 200m, Sugar Lumps 1% (up to 100) (Sugar baking) req408
    539, // Cost: 1b, 5% + 1%/building level 10+ (Sugar crystal cookies) req449
    540, // Cost: 333b, Various maybe-cookie upgrades (Box of maybe cookies) req539
    541, // Cost: 333b, Various not-cookie upgrades (Box of not cookies) req539
    542, // Cost: 333b, Various pastry upgrades (Box of pastries) req539

    450, // Cost: 400m, Sugar frenzy (3x, 1h, cost 1lump) (Sugar craving) req449
    451, // Cost: 600m, up to 600 grandma -6s sugar lumps (Sugar aging process) req450
    409, // Cost: 300m, Sugar lumps -1h (Diabetica Daemonicus) req451 req408
    410, // Cost: 1b, Bifuricated Lumps +5% often, likely (Sucralosia Inutilis) req409

  ],[
    // Seasons
    269, // Cost: 111,111, Easter Eggs drop +10% (Starspawn) req181,
    270, // Cost: 111,111, Christmas cookies drop +10% (Starsnow) req181,
    271, // Cost: 111,111, Halloween cookies drop +10% (Starterror) req181,
    272, // Cost: 111,111, Valentines cookies drop +10% (Starlove) req181,
    273, // Cost: 111,111, Business Golden cookies (Startrade) req181,
    537, // Cost: 1.111b 1/5 chance to keep holiday drops (Keepsakes) req269-273

    // Spirals
    496, // Cost: 900,000, Buy all button for upgrades (Inspired checklist) req265 req141
    561, // Cost: 2m, Mouse tip for costs (Genius accounting) req496
    505, // Cost: 5m, Mouse tip for Tier (Label printer) req561
    787, // Cost: 10m, Unshackles plain-tier upgrades (Unshackled flavor) req505

    //Spiral Inside

  ],[
    788, // Cost: 1.81b, Berrylium upgradeds (Unshackled berrylium) req787
    789, // Cost: 37.88b, Blueberrylium upgrades (Unshackled blueberrylium) req788
    790, // Cost: 327.68b, Chalcedhoney upgrades (Unshackled chalcedhoney) req789
    791, // Cost: 1.747t, Buttergold upgrades (Unshackled buttergold) req790
    792, // Cost: 6.857t, Sugarmuck upgrades (Unshackled sugarmuck) req791
    793, // Cost: 21.789t, Jetmint upgrades (Unshackled jetmint) req792
    794, // Cost: 59.316t, Cherrysilver upgrades (Unshackled cherrysilver) req793
    795, // Cost: 143.489t, Hazelrald upgrades (Unshackled hazelrald) req794
    796, // Cost: 316.228t, Mooncandy upgrades (Unshackled mooncandy) req795
    797, // Cost: 646.316t, Astrofudge upgrades (Unshackled astrofudge) req796
    798, // Cost: 1.241quad, Alabascream upgrades (Unshackled alabascream) req797
    799, // Cost: 2.262quad, Iridyum upgrades (Unshackled iridyum) req798
    800, // Cost: 3.944quad, Glucosmium upgrades (Unshackled glucosmium) req799
    863, // Cost: 6.617quad, Glimmeringue upgrades (Unshackled glimmeringue) req800

  ],[
    // Spiral Outside
    768, // Cost: 15m, Thousand Fingers x25 (Unshackled cursors) req787
    769, // Cost: 1.92b, Tiered Grandma Upgrades +50% (Unshackled grandmas) req768
    770, // Cost: 32.805b, Tiered Farm Upgrades +180% (Unshackled farms) req769
    771, // Cost: 245.76b, Tiered Mine Upgrades +170% (Unshackled mines) req770
    772, // Cost: 1.172t, Tiered Factory Upgrades +160% (Unshackled factories) req771
    773, // Cost: 4.199t, Tiered Bank Upgrades +150% (Unshackled banks) req772
    774, // Cost: 12.353t, Tiered Temple Upgrades +140% (Unshackled temples) req773
    775, // Cost: 31.457t, Tiered WT Upgrades +130% (Unshackled wizard towers) req774
    776, // Cost: 71.745t, Tiered Shipment Upgrades +120% (Unshackled shipments) req775
    777, // Cost: 150t, Tiered AL Upgrades +110% (Unshackled alchemy labs) req776
    778, // Cost: 292,308t, Tiered Portal Upgrades +100% (Unshackled portals) req777
    779, // Cost: 537.477t, Tiered TM Upgrades +90% (Unshackled time machines) req778
    780, // Cost: 941.228t, Tiered AC Upgrades +80% (Unshackled antimatter condensers) req779
    781, // Cost: 1.581quad, Tiered Prism Upgrades +70% (Unshackled prisms) req780
    782, // Cost: 2.563quad, Tiered Chancemaker Upgrades +60% (Unshackled chancemakers) req781
    783, // Cost: 4.027quad, Tiered Fractal Upgrades +50% (Unshackled fractal engines) req782
    784, // Cost: 6.155quad, Tiered JSC Upgrades +40% (Unshackled javascript consoles) req783
    785, // Cost: 9.183quad, Tiered Idleverse Upgrades +30% (Unshackled idleverses) req784
    786, // Cost: 13.408quad, Tiered Cortex Upgrades +20% (Unshackled cortex bakers) req785
    864, // Cost: 19.2quad, Tiered You Upgrades +10% (Unshackled You) req786

  ],[
    // Permanent Slots
    266, // Cost: 3m, Slot III (Permanent upgrade slot III) req265
    267, // Cost: 400m, Slot IV (Permanent upgrade slot IV) req266
    268, // Cost: 50b, Slot V (Permanent upgrade slot V) req267

    // Bottom
    328, // Cost: 9, Milk Selector (Classic dairy selection) req363
    362, // Cost: 99, Background selector (Basic wallpaper assortment) req328
    804, // Cost: 10m, Wallpapers (Distinguished wallpaper assortment) req362
    329, // Cost: 1m, Moar Milk (fanciful dairy selection) req363

    360, // Cost: 999,999 Golden cookie sound (Golden cookie alert sound) req365
    805, // Cost: 100b, Jukebox (Sound test) req804 req329 req360

    647, // Cost: 100b, Pet the dragon (Pet the dragon) req365 req323

    284, // Cost: 7,777, Golden cookies stay 5% longer (Decisive fate) req283
    286, // Cost: 99,999, All upgrades 1% cheaper (Divine sales) req284
    287, // Cost: 399,999, Cookie upgrades 5x cheaper (Divine bakeries) req286
    397, // Cost: 7.777m, golden cookies 1% double (Distilled essence of redoubled luck) req365 req287

    562, // Cost: 1b, 50% boost, but clicking breaks it (Shimmering veil) req397
    591, // Cost: 15b, random drops 5x common w/o Heavenly chip secret (Cosmic beginner's luck) req562
    592, // Cost: 15b, 10% veil not break, 10% CPS (Reinforced membrane) req562
    801, // Cost: 150b, 10% veil not break, 5% CPS (Delicate touch) req592
    802, // Cost: 15t, 10% veil not break, 5% CPS (Steadfast murmur) req801
    803, // Cost: 1.5quad, 10% veil not break, 5% CPS (Glittering edge) req802

    643, // Cost: 77.777b, news ticker can have fortunes (Fortune cookies) req397

  ],[
    // Hidden
    411, // Cost: 777, +1% pres, +1% golden life/duration (Lucky digit) req282 + 1 '7' in prestige level
    412, // Cost: 77,777, +1% pres, +1% golden life/duration (Lucky number) req283 req411+ 2 '7' in prestige level
    413, // Cost: 77.777m, +1% pres, +1% golden life/duration (Lucky payout) req284 req412+ 4 '7' in prestige level

  ],
]

const flareBuildingsList = [
  {
    id: 'Cursor',
    delta: () => game.Game.globalCpsMult * game.Game.Objects['Cursor'].storedCps,
  },
  {
    id: 'Grandma',
    delta: () => {
      const getBoost = (name, fraction) => {
        const gs = game.Game.Objects['Grandma'].amount;
        const obj = game.Game.Objects[name];
        // The current storedCps is based on the current number of grandmas helping;
        // we need to know what it is without them...
        const base = obj.storedCps / (1 + ((gs / fraction) * .01));
        // so we can calculate how much one more would be
        return obj.amount * base * .01;
      }

      let delta = game.Game.globalCpsMult * game.Game.Objects['Grandma'].storedCps;
      if (game.Game.Has('Farmer grandmas')) delta += getBoost('Farm', 1);
      if (game.Game.Has('Miner grandmas')) delta += getBoost('Mine', 2);
      if (game.Game.Has('Worker grandmas')) delta += getBoost('Factory', 3);
      if (game.Game.Has('Banker grandmas')) delta += getBoost('Bank', 4);
      if (game.Game.Has('Priestess grandmas')) delta += getBoost('Temple', 5);
      if (game.Game.Has('Witch grandmas')) delta += getBoost('Wizard tower', 6);
      if (game.Game.Has('Cosmic grandmas')) delta += getBoost('Shipment', 7);
      if (game.Game.Has('Transmuted grandmas')) delta += getBoost('Alchemy lab', 8);
      if (game.Game.Has('Altered grandmas')) delta += getBoost('Portal', 9);
      if (game.Game.Has('Grandmas\' grandmas')) delta += getBoost('Time machine', 10);
      if (game.Game.Has('Antigrandmas')) delta += getBoost('Antimatter condenser', 11);
      if (game.Game.Has('Raindbow grandmas')) delta += getBoost('Prism', 12);
      if (game.Game.Has('Lucky grandmas')) delta += getBoost('Chancemaker', 13);
      if (game.Game.Has('Metagrandmas')) delta += getBoost('Fractal engine', 14);
      if (game.Game.Has('Script grannies')) delta += getBoost('Javascript console', 15);
      if (game.Game.Has('Alternate grandmas')) delta += getBoost('Idleverse', 16);
      return delta;
    },
  }, {
    id: 'Farm',
  }, {
    id: 'Mine',
  }, {
    id: 'Factory',
  }, {
    id: 'Bank',
  }, {
    id: 'Temple',
  }, {
    id: 'Wizard tower',
  }, {
    id: 'Shipment',
  }, {
    id: 'Alchemy lab',
  }, {
    id: 'Portal',
  }, {
    id: 'Time machine',
  }, {
    id: 'Antimatter condenser',
  }, {
    id: 'Prism',
  }, {
    id: 'Chancemaker',
  }, {
    id: 'Fractal engine',
  }, {
    id: 'Javascript console',
  }, {
    id: 'Idleverse',
  }, {
    id: 'Cortex baker',
  }, {
    id: 'You',
  },
];

const flareUpgradesList = [
  { // 2x cursor for 100c, unlocked by first cursor
    id: 0,
    delta: () => flareCursorAndClick(),
  },
  { // 2x cursor for 500c
    id: 1,
    delta: () => flareCursorAndClick(),
  },
  { // 2x cursor for 10000c
    id: 2,
    delta: () => flareCursorAndClick(),
  },
  { // 0.1 for each non-cursor building for 100000c
    id: 3,
    delta: () => (game.Game.Objects['Cursor'].amount + flareHz) * flareObjectsNoCursor() * .1,
  },
  { // Upgrade3 x5 for 10m c
    id: 4,
    delta: () => flareCurrentFingers() * 5,
  },
  { // Upgrade3 x10 for 100m c
    id: 5,
    delta: () => flareCurrentFingers() * 10,
  },
  { // Upgrade3 x20 for 1b c (trillian fingers)
    id: 6,
    delta: () => flareCurrentFingers() * 20,
  },
  { // Upgrade3 x20 for 10b c (quadrillian fingers)
    id: 43,
    delta: () => flareCurrentFingers() * 20,
  },
  { // Upgrade3 x20 for 10t c (quadrillian fingers)
    id: 82,
    delta: () => flareCurrentFingers() * 20,
  },
  { // Upgrade3 x20 for 10quad c (quadrillian fingers)
    id: 109,
    delta: () => flareCurrentFingers() * 20,
  },
  { // Upgrade3 x20 for 10quint c (septillian fingers)
    id: 188,
    delta: () => flareCurrentFingers() * 20,
  },
  { // Upgrade3 x20 for 10sex c (octillion fingers)
    id: 189,
    delta: () => flareCurrentFingers() * 20,
  },
  { // Upgrade3 x20 for 10sep c (nonillion fingers)
    id: 660,
    delta: () => flareCurrentFingers() * 20,
  },
  { // Upgrade3 x20 for 10oct c (decillion fingers)
    id: 764,
    delta: () => flareCurrentFingers() * 20,
  },
  { // Upgrade3 x20 for 10non c (undecillion fingers)
    id: 873,
    delta: () => flareCurrentFingers() * 20,
  },

  { // Clicking gains +1% of CPS for 50000c
    id: 75,
    delta: () => flareHz * game.Game.cookiesPs * .01,
  },
  { // Clicking gains +1% of CPS for 5m c
    id: 76,
    delta: () => flareHz * game.Game.cookiesPs * .01,
  },
  { // Clicking gains +1% of CPS for 500m c
    id: 77,
    delta: () => flareHz * game.Game.cookiesPs * .01,
  },
  { // Clicking gains +1% of CPS for 50b c
    id: 78,
    delta: () => flareHz * game.Game.cookiesPs * .01,
  },
  { // Clicking gains +1% of CPS for 5t c
    id: 119,
    delta: () => flareHz * game.Game.cookiesPs * .01,
  },
  { // Clicking gains +1% of CPS for 500t c
    id: 190,
    delta: () => flareHz * game.Game.cookiesPs * .01,
  },
  { // Clicking gains +1% of CPS for 50quad c
    id: 191,
    delta: () => flareHz * game.Game.cookiesPs * .01,
  },
  { // Clicking gains +1% of CPS for 51quint c
    id: 366,
    delta: () => flareHz * game.Game.cookiesPs * .01,
  },
  { // Clicking gains +1% of CPS for 500quint c
    id: 367,
    delta: () => flareHz * game.Game.cookiesPs * .01,
  },
  { // Clicking gains +1% of CPS for 50sex c
    id: 427,
    delta: () => flareHz * game.Game.cookiesPs * .01,
  },
  { // Clicking gains +1% of CPS for 5sep c
    id: 460,
    delta: () => flareHz * game.Game.cookiesPs * .01,
  },
  { // Clicking gains +1% of CPS for 500sep c
    id: 461,
    delta: () => flareHz * game.Game.cookiesPs * .01,
  },
  { // Clicking gains +1% of CPS for 50oct c
    id: 661,
    delta: () => flareHz * game.Game.cookiesPs * .01,
  },
  { // Clicking gains +1% of CPS for 5non c
    id: 765,
    delta: () => flareHz * game.Game.cookiesPs * .01,
  },
  { // Clicking gains +1% of CPS for 500non c
    id: 874,
    delta: () => flareHz * game.Game.cookiesPs * .01,
  },

  { id: 57,  delta: () => flareGrandmaSynergy('Farm') },
  { id: 58,  delta: () => flareGrandmaSynergy('Mine') },
  { id: 59,  delta: () => flareGrandmaSynergy('Factory') },
  { id: 250, delta: () => flareGrandmaSynergy('Bank') },
  { id: 251, delta: () => flareGrandmaSynergy('Temple') },
  { id: 252, delta: () => flareGrandmaSynergy('Wizard tower') },
  { id: 60,  delta: () => flareGrandmaSynergy('Shipment') },
  { id: 61,  delta: () => flareGrandmaSynergy('Alchemy lab') },
  { id: 62,  delta: () => flareGrandmaSynergy('Portal') },
  { id: 63,  delta: () => flareGrandmaSynergy('Time machine') },
  { id: 103, delta: () => flareGrandmaSynergy('Antimatter condenser') },
  { id: 180, delta: () => flareGrandmaSynergy('Prism') },
  { id: 415, delta: () => flareGrandmaSynergy('Chancemaker') },
  { id: 521, delta: () => flareGrandmaSynergy('Fractal engine') },
  { id: 593, delta: () => flareGrandmaSynergy('Javascript console') },
  { id: 683, delta: () => flareGrandmaSynergy('Idleverse') },
  { id: 729, delta: () => flareGrandmaSynergy('Cortex baker') },
  { id: 825, delta: () => flareGrandmaSynergy('You') },

  { // 4x Grandmas, unlocks other upgrades for 1quad c
    id: 64,
    delta: () => {
      const g = 3 * game.Game.Objects['Grandma'].storedTotalCps;
      // not sure how to value the other upgrades yet
      // First research costs also costs 1 quad and gives 1% upgrade
      const up = flareGetRate() * .01;
      return g + up;
    },
  },

  { // More CPS for more milk for 9m c (See line 5022) (kitten helpers)
    id: 31,
    delta: () => game.Game.cookiesPs * game.Game.milkProgress * 0.1,
  },
  { // More CPS for more milk for 9b c (See line 5022) (kitten workers)
    id: 32,
    delta: () => game.Game.cookiesPs * game.Game.milkProgress * 0.125,
  },
  { // More CPS for more milk for 90t c (See line 5022) (kitten engineers)
    id: 54,
    delta: () => game.Game.cookiesPs * game.Game.milkProgress * 0.15,
  },
  { // More CPS for more milk for 90quad c (See line 5022) (kitten overseers)
    id: 108,
    delta: () => game.Game.cookiesPs * game.Game.milkProgress * 0.175,
  },
  { // More CPS for more milk for 900quint c (See line 5022) (kitten managers)
    id: 187,
    delta: () => game.Game.cookiesPs * game.Game.milkProgress * 0.2,
  },
  { // More CPS for more milk for 900sex c (See line 5022) (kitten accountants)
    id: 320,
    delta: () => game.Game.cookiesPs * game.Game.milkProgress * 0.2,
  },
  { // More CPS for more milk for 900sep c (See line 5022) (kitten specialists)
    id: 321,
    delta: () => game.Game.cookiesPs * game.Game.milkProgress * 0.2,
  },
  { // More CPS for more milk for 900oct c (See line 5022) (kitten experts)
    id: 322,
    delta: () => game.Game.cookiesPs * game.Game.milkProgress * 0.2,
  },
  { // More CPS for more milk for 900non c (See line 5022) (kitten consultants)
    id: 425,
    delta: () => game.Game.cookiesPs * game.Game.milkProgress * 0.2,
  },
  { // More CPS for more milk for 900dec c (See line 5022) (kitten assis...)
    id: 442,
    delta: () => game.Game.cookiesPs * game.Game.milkProgress * 0.175,
  },
  { // More CPS for more milk for 900dec c (See line 5022) (kitten assis...)
    id: 442,
    delta: () => game.Game.cookiesPs * game.Game.milkProgress * 0.175,
  },
  { // More CPS for more milk for 900undec c (See line 5022) (kitten marketeers)
    id: 462,
    delta: () => game.Game.cookiesPs * game.Game.milkProgress * 0.15,
  },
  { // More CPS for more milk for 900duodec c (See line 5022) (kitten analyst)
    id: 494,
    delta: () => game.Game.cookiesPs * game.Game.milkProgress * 0.125,
  },
  { // More CPS for more milk for 900duodec c (See line 5022) (kitten executive)
    id: 613,
    delta: () => game.Game.cookiesPs * game.Game.milkProgress * 0.115,
  },

  { // Cookie Production Multiplier 1% for 999999c
    id: 33,
    delta: () => flareGetRate() * .01,
  },
  { // Cookie Production Multiplier 1% for 5m c
    id: 34,
    delta: () => flareGetRate() * .01,
  },
  { // Cookie Production Multiplier 1% for 10m c
    id: 35,
    delta: () => flareGetRate() * .01,
  },
  { // Cookie Production Multiplier 2% for 50m c (Peanut Butter)
    id: 36,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 100m c (Coconut)
    id: 37,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 500m c (White Chocolate)
    id: 38,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 100m c (Macademia)
    id: 39,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 5b c (DoubleChip)
    id: 40,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 10b c (white choc mac)
    id: 41,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 50b c (all chocolate)
    id: 42,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 5% for 100b c (dark chocolate coated)
    id: 55,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 100b c (white chocolate coated)
    id: 56,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 2% for 500b c (eclipse)
    id: 80,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 1t c (zebra)
    id: 81,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 5t c (snickerdoodle)
    id: 88,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 10t c (stroopwafels)
    id: 89,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 50t c (macaroons)
    id: 90,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 100t c (empire biscuits)
    id: 92,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 500t c (madeleines)
    id: 104,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 500t c (palmiers)
    id: 105,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 1quad c (palets)
    id: 106,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 1quad c (sables)
    id: 107,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 10quad c (gingerbread men)
    id: 150,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 10quad c (gingerbread tree)
    id: 151,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 5% for 50quad c (pure black)
    id: 256,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 50quad c (pure white)
    id: 257,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 3% for 100quad c (lady fingers)
    id: 258,
    delta: () => flareGetRate() * .03,
  },
  { // Cookie Production Multiplier 3% for 500quad c (Tuiles)
    id: 259,
    delta: () => flareGetRate() * .03,
  },
  { // Cookie Production Multiplier 3% for 1quint c (chocolate-stuffed biscuit)
    id: 260,
    delta: () => flareGetRate() * .03,
  },
  { // Cookie Production Multiplier 3% for 5quint c (checker cookie)
    id: 261,
    delta: () => flareGetRate() * .03,
  },
  { // Cookie Production Multiplier 3% for 10quint c (butter)
    id: 262,
    delta: () => flareGetRate() * .03,
  },
  { // Cookie Production Multiplier 3% for 50quint c (cream)
    id: 263,
    delta: () => flareGetRate() * .03,
  },
  { // Cookie Production Multiplier 10% for 100oct c (Milk chocolate butter buscuit)
    id: 334,
    delta: () => flareGetRate() * .10,
  },
  { // Cookie Production Multiplier 10% for 100non c (Dark chocolate butter buscuit)
    id: 335,
    delta: () => flareGetRate() * .10,
  },
  { // Cookie Production Multiplier 10% for 100dec c (White chocolate butter buscuit)
    id: 336,
    delta: () => flareGetRate() * .10,
  },
  { // Cookie Production Multiplier 10% for 100dunec c (Ruby chocolate butter buscuit)
    id: 337,
    delta: () => flareGetRate() * .10,
  },
  { // Cookie Production Multiplier 4% for 100quint c (gingersnap)
    id: 338,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 500quint c (cinnamon)
    id: 339,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 1sex c (vanity)
    id: 340,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 5sex c (cigars)
    id: 341,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 10sex c (Pinwheel)
    id: 342,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 50sex c (Fudge squares)
    id: 343,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 100sex c (Shortbread biscuits)
    id: 350,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 500sex c (Millionaires Shortbread)
    id: 351,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 1sep c (Caramel)
    id: 352,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 10% for 100dunec c (Lavendar chocolate butter buscuit)
    id: 400,
    delta: () => flareGetRate() * .10,
  },
  { // Cookie Production Multiplier 4% for 5sep c (Pecan Sandies)
    id: 403,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 5sep c (Moravian Spice)
    id: 404,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 50sep c (Anzac biscuits)
    id: 405,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 100sep c (Buttercakes)
    id: 406,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 500sep c (Ice cream sandwiches)
    id: 407,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 10% for 100oct c (Birthday)
    id: 426,
    delta: () => flareGetRate() * .10,
  },
  { // Cookie Production Multiplier 4% for 1oct c (Pink biscuits)
    id: 444,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 5oct c (Whole grain)
    id: 445,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 10oct c (Candy)
    id: 446,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 50oct c (Big Chip)
    id: 447,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 1% for 100oct c (One Chip)
    id: 448,
    delta: () => flareGetRate() * .01,
  },
  { // Cookie Production Multiplier 4% for 500oct c (Sprinkles)
    id: 453,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 950oct c (Peanutbutter blossom)
    id: 454,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 5non c (Nobake)
    id: 455,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 10non c (Florentines)
    id: 456,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 50non c (Chocolate crinkles)
    id: 457,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 100non c (Maple)
    id: 458,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 500non c (Persian Rice)
    id: 464,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 1dec c (Norwegian)
    id: 465,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 5dec c (Crispy rice)
    id: 466,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 10dec c (Ube)
    id: 467,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 50dec c (Butterscotch)
    id: 468,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 100dec c (Speculaas)
    id: 469,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 500dec c (Chocolate Oatmeal)
    id: 498,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 1undec c (Molasses)
    id: 499,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 5undec c (Biscotti)
    id: 500,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 10undec c (Waffle)
    id: 501,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 2% for 100m c (Almond)
    id: 502,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 100m c (Hazelnut)
    id: 503,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 100m c (Walnut)
    id: 504,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 4% for 50undec c (Custard Creams)
    id: 535,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 100undec c (Bourbon biscuits)
    id: 536,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 5% for 500undec c (Mini)
    id: 538,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 5duodec c (Whoopie Pies)
    id: 565,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 5duodec c (Caramel wafer biscuits)
    id: 566,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 10duodec c (Chocolate chip mocha)
    id: 567,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 30duodec c (Earl grey)
    id: 568,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 100duodec c (Corn syrup)
    id: 569,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 300duodec c (Icebox)
    id: 570,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 300duodec c (Graham cracker)
    id: 571,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 3tredec c (Hardtack)
    id: 572,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 10tredec c (Cornflake)
    id: 573,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 30tredec c (Tofu)
    id: 574,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 30tredec c (Gluten free)
    id: 575,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 100tredec c (Russian bread)
    id: 576,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 300tredec c (Lebkuchen)
    id: 577,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 1quatdec c (Aachener)
    id: 578,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 3quatdec c (Canistrelli)
    id: 579,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 10quatdec c (Nice)
    id: 580,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 30quatdec c (French pure butter)
    id: 581,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 30quatdec c (Petit beurre)
    id: 582,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 100quatdec c (Nanaimo bars)
    id: 583,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 300quatdec c (Berger)
    id: 584,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 1quindec c (Chinsuko)
    id: 585,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 1quindec c (Panda koala)
    id: 586,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 3quindec c (Putri salju)
    id: 587,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 5% for 10quindec c (Milk)
    id: 588,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 10% for 1t c (Chocolate Chip)
    id: 590,
    delta: () => flareGetRate() * .10,
  },
  { // Cookie Production Multiplier 5% for 30quindec c (Kruidnoten)
    id: 607,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 05% for 35duodec c (Chai tea)
    id: 614,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 2% for 100m c (Cashew)
    id: 727,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 500m c (Milk Chocolate)
    id: 728,
    delta: () => flareGetRate() * .02,
  },

  // Ascension Cookies - macarons
  { // Cookie Production Multiplier 3% for 10000 c (Rose macarons)
    id: 202,
    delta: () => flareGetRate() * .03,
  },
  { // Cookie Production Multiplier 3% for 10m c (lemon macarons)
    id: 203,
    delta: () => flareGetRate() * .03,
  },
  { // Cookie Production Multiplier 3% for 10b c (chocolate macarons)
    id: 204,
    delta: () => flareGetRate() * .03,
  },
  { // Cookie Production Multiplier 3% for 10t c (pistachio macarons)
    id: 205,
    delta: () => flareGetRate() * .03,
  },
  { // Cookie Production Multiplier 3% for 10quad c (hazelnut  macarons)
    id: 206,
    delta: () => flareGetRate() * .03,
  },
  { // Cookie Production Multiplier 3% for 10quint c (hazelnut macarons)
    id: 207,
    delta: () => flareGetRate() * .03,
  },
  { // Cookie Production Multiplier 3% for 10sex c (Caramel macarons)
    id: 230,
    delta: () => flareGetRate() * .03,
  },
  { // Cookie Production Multiplier 3% for 10sep c (Licorice macarons)
    id: 231,
    delta: () => flareGetRate() * .03,
  },
  { // Cookie Production Multiplier 3% for 10oct c (Earl grey macarons)
    id: 725,
    delta: () => flareGetRate() * .03,
  },

  // Ascension Cookies - brand
  { // Cookie Production Multiplier 2% for 5quad c (Fig gluttons)
    id: 125,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 5quad c (Loreols)
    id: 126,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 5quad c (Jaffa Cakes)
    id: 127,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 5quad c (Grease's Cups)
    id: 128,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 5quad c (Digits)
    id: 344,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 3% for 10quad c (Caramoas)
    id: 120,
    delta: () => flareGetRate() * .03,
  },
  { // Cookie Production Multiplier 3% for 10quad c (Sagalongs)
    id: 121,
    delta: () => flareGetRate() * .03,
  },
  { // Cookie Production Multiplier 3% for 10quad c (Shortfoils)
    id: 122,
    delta: () => flareGetRate() * .03,
  },
  { // Cookie Production Multiplier 3% for 10quad c (Win mints)
    id: 123,
    delta: () => flareGetRate() * .03,
  },
  { // Cookie Production Multiplier 3% for 5sex c (Lombardia)
    id: 401,
    delta: () => flareGetRate() * .03,
  },
  { // Cookie Production Multiplier 3% for 5sex c (Bastenaken)
    id: 402,
    delta: () => flareGetRate() * .03,
  },
  { // Cookie Production Multiplier 2% for 5sep c (Festivity Loops)
    id: 463,
    delta: () => flareGetRate() * .03,
  },
  { // Cookie Production Multiplier 2% for 5oct c (Havabreaks)
    id: 612,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 5non c (Zilla wafers)
    id: 618,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 5dec c (Dim dams)
    id: 619,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 5undec c (Pokey)
    id: 726,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 5duodec c (Nines)
    id: 824,
    delta: () => flareGetRate() * .02,
  },

  // Ascension Cookies - Butter cookies
  { // Cookie Production Multiplier 4% for 100sex c (Butter horseshoes)
    id: 345,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 500sex c (Butter pucks)
    id: 346,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 950sex c (Butter knots)
    id: 347,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 5sep c (Butter slabs)
    id: 348,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 10sep c (Butter swirls)
    id: 349,
    delta: () => flareGetRate() * .04,
  },

  // Ascension Cookies - british tea biscuits
  { // Cookie Production Multiplier 2% for 100t c (british tea biscuits)
    id: 93,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 100t c (choclate british tea biscuits)
    id: 94,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 100t c (round british tea biscuits)
    id: 95,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 100t c (round chocolate british tea biscuits)
    id: 96,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 100t c (round british tea biscuits heart)
    id: 97,
    delta: () => flareGetRate() * .02,
  },
  { // Cookie Production Multiplier 2% for 100t c (round chocolate british tea biscuits heart)
    id: 98,
    delta: () => flareGetRate() * .02,
  },

  // Ascension - Maybe cookies
  { // Cookie Production Multiplier 4% for 100dec c (Cookie dough)
    id: 551,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 4% for 10undec c (Burnt)
    id: 552,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 3% for 1duodec c (no chips)
    id: 553,
    delta: () => flareGetRate() * .03,
  },
  { // Cookie Production Multiplier 4% for 100duodec c (Flavor text)
    id: 554,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 5% for 10tredec c (High definition)
    id: 555,
    delta: () => flareGetRate() * .05,
  },
  { // Cookie Production Multiplier 4% for 1quatdec c (Crackers)
    id: 611,
    delta: () => flareGetRate() * .04,
  },
  { // Cookie Production Multiplier 5% for 100quatdec c (Deep fried)
    id: 818,
    delta: () => flareGetRate() * .05,
  },

  { // Golden cookie rate increase 2x 777.7m c (worth waiting 10 min for)
    id: 52,
    delta: () => flareWaitMinutes(10, 52),
  },
  { // Golden cookie rate increase 2x 77.7b c (worth waiting 10 min for)
    id: 53,
    delta: () => flareWaitMinutes(10, 53),
  },
  { // Golden cookie last 2x longer 77.7t c (worth waiting 20 min for)
    id: 86,
    delta: () => flareWaitMinutes(20, 86),
  },

  // Asencion - Synergy
  // Missing one or two in here
  { id: 369, delta: () => flareSynergy('Farm', 'Time machine') },
  { id: 370, delta: () => flareSynergy('Farm', 'Temple') },
  { id: 371, delta: () => flareSynergy('Mine', 'Wizard tower') },
  { id: 372, delta: () => flareSynergy('Mine', 'Shipment') },
  { id: 373, delta: () => flareSynergy('Factory', 'Antimatter condenser') },
  { id: 374, delta: () => flareSynergy('Factory', 'Time machine') },
  { id: 375, delta: () => flareSynergy('Bank', 'Portal') },
  { id: 376, delta: () => flareSynergy('Factory', 'Bank') },
  { id: 377, delta: () => flareSynergy('Temple', 'Portal') },
  { id: 378, delta: () => flareSynergy('Temple', 'Antimatter condenser') },
  { id: 379, delta: () => flareSynergy('Wizard tower', 'Alchemy lab') },
  { id: 380, delta: () => flareSynergy('Farm', 'Wizard tower') },
  { id: 382, delta: () => flareSynergy('Factory', 'Shipment') },
  { id: 384, delta: () => flareSynergy('Bank', 'Alchemy lab') },
  { id: 385, delta: () => flareSynergy('Farm', 'Portal') },
  { id: 386, delta: () => flareSynergy('Portal', 'Prism') },
  { id: 387, delta: () => flareSynergy('Shipment', 'Time machine') },
  { id: 388, delta: () => flareSynergy('Time machine', 'Prism') },
  { id: 389, delta: () => flareSynergy('Bank', 'Antimatter condenser') },
  { id: 390, delta: () => flareSynergy('Alchemy lab', 'Antimatter condenser') },
  { id: 391, delta: () => flareSynergy('Wizard tower', 'Prism') },
  { id: 392, delta: () => flareSynergy('Temple', 'Prism') },
  { id: 424, delta: () => flareSynergy('Mine', 'Chancemaker') },
  { id: 443, delta: () => flareSynergy('Antimatter condenser', 'Chancemaker') },
  { id: 533, delta: () => flareSynergy('Prism', 'Fractal engine') },
  { id: 534, delta: () => flareSynergy('Cursor', 'Fractal engine') },
  { id: 605, delta: () => flareSynergy('Grandma', 'Javascript console') },
  { id: 606, delta: () => flareSynergy('Chancemaker', 'Javascript console') },
  { id: 696, delta: () => flareSynergy('Portal', 'Idleverse') },
  { id: 697, delta: () => flareSynergy('Fractal engine', 'Idleverse') },
  { id: 761, delta: () => flareSynergy('Temple', 'Cortex baker') },
  { id: 762, delta: () => flareSynergy('Farm', 'Cortex baker') },
  { id: 859, delta: () => flareSynergy('Time machine', 'You') },
  { id: 860, delta: () => flareSynergy('Javascript console', 'You') },

  // Ascension
  { // Unlocks 5% of the potential of your prestiege level 11c
    id: 129,
    delta: () => flareHeavenlyIncrease(.05),
  },
  { // Unlocks 25% of the potential of your prestiege level 1111c
    id: 130,
    delta: () => flareHeavenlyIncrease(.20),
  },
  { // Unlocks 50% of the potential of your prestiege level 111111c
    id: 131,
    delta: () => flareHeavenlyIncrease(.25),
  },
  { // Unlocks 75% of the potential of your prestiege level 11.11m c
    id: 132,
    delta: () => flareHeavenlyIncrease(.25),
  },
  { // Unlocks 100% of the potential of your prestiege level 1.11b c
    id: 133,
    delta: () => flareHeavenlyIncrease(.25),
  },
  { // Cookie production Multipler 1% 100c
    id: 589,
    delta: () => flareGetRate() * .01, // I think...
  },
  { // Dragon Egg 25c
    id: 324,
    delta: () => 25,
  },

  // Easter
  { // Cookie production Multiplier 1% 999c (scales on eggs) (chicken)
    id: 210,
    delta: () => flareGetRate() * .01,
  },
  { // Cookie production Multiplier 1% 999c (scales on eggs) (duck)
    id: 211,
    delta: () => flareGetRate() * .01,
  },
  { // Cookie production Multiplier 1% 999c (scales on eggs) (turkey)
    id: 212,
    delta: () => flareGetRate() * .01,
  },
  { // Cookie production Multiplier 1% 999c (scales on eggs) (quial)
    id: 213,
    delta: () => flareGetRate() * .01,
  },
  { // Cookie production Multiplier 1% 999c (scales on eggs) (robin)
    id: 214,
    delta: () => flareGetRate() * .01,
  },
  { // Cookie production Multiplier 1% 999c (scales on eggs) (robin)
    id: 214,
    delta: () => flareGetRate() * .01,
  },
  { // Cookie production Multiplier 1% 999c (scales on eggs) (Ostrich)
    id: 215,
    delta: () => flareGetRate() * .01,
  },
  { // Cookie production Multiplier 1% 999c (scales on eggs) (Cassowary)
    id: 216,
    delta: () => flareGetRate() * .01,
  },
  { // Cookie production Multiplier 1% 999c (scales on eggs) (salmon roe)
    id: 217,
    delta: () => flareGetRate() * .01,
  },
  { // Cookie production Multiplier 1% 999c (scales on eggs) (frogspawn)
    id: 218,
    delta: () => flareGetRate() * .01,
  },
  { // Cookie production Multiplier 1% 999c (scales on eggs) (shark)
    id: 219,
    delta: () => flareGetRate() * .01,
  },
  { // Cookie production Multiplier 1% 999c (scales on eggs) (turtle)
    id: 220,
    delta: () => flareGetRate() * .01,
  },
  { // Cookie production Multiplier 1% 999c (scales on eggs) (ant larva)
    id: 221,
    delta: () => flareGetRate() * .01,
  },
  { // Golden Cookies rate up 5% 999c (scales on eggs) (Golden Goose)
    id: 222,
    delta: () => flareWaitMinutes(5, 222),
  },
  { // Buildings an upgrades are 1% cheaper 999c (scales on eggs) (faberge)
    id: 223,
    delta: () => flareBuildings().price * .01, // meh
  },
  { // explode into 5% cookies 999c (scales on eggs) (wrinklerspawn)
    id: 224,
    delta: () => flareWaitMinutes(1, 224), // I don't know how this works yet
  },
  { // Clciking is 10% more effective 999c (scales on eggs) (cookie egg)
    id: 225,
    delta: () => flareHz * game.Game.computedMouseCps * .1,
  },
  { // Other eggs appear 10% more often 999c (scales on eggs) (omlette)
    id: 226,
    delta: () => 10000, // shruggy
  },
  { // Contains a lot of cookies 999c (scales on eggs) (chocolate egg)
    id: 227,
    delta: () => game.Game.cookies * .05,
  },
  { // Increase based on time played... just go with 1%  999c (scales on eggs) (Century Egg)
    id: 228,
    delta: () => flareGetRate() * .01,
  },
  { // +9CPS cookies 999c (scales on eggs) ("egg")
    id: 229,
    delta: () => 9,
  },

  // Christmas
  { // Unlock Christmas! 25c (Festive Hat) [Santa's Gift]
    id: 152,
    delta: () => 25,
  },
  { // 2% CPS  252.5bil c (Christmas Tree Biscuits) [Reindeer]
    id: 143,
    delta: () => flareGetRate() * .02,
  },
  { // 2% CPS  252.5bil c (Snowflake biscuit) [Reindeer]
    id: 144,
    delta: () => flareGetRate() * .02,
  },
  { // 2% CPS  252.5bil c (Snowman biscuit) [Reindeer]
    id: 145,
    delta: () => flareGetRate() * .02,
  },
  { // 2% CPS  252.5bil c (Holly Biscuits) [Reindeer]
    id: 146,
    delta: () => flareGetRate() * .02,
  },
  { // 2% CPS  252.5bil c (Candy Cane Biscuits) [Reindeer]
    id: 147,
    delta: () => flareGetRate() * .02,
  },
  { // 2% CPS 252.5bil c (Bell Biscuits) [Reindeer]
    id: 148,
    delta: () => flareGetRate() * .02,
  },
  { // 2% CPS 252.5bil c (Present Biscuits) [Reindeer]
    id: 149,
    delta: () => flareGetRate() * .02,
  },
  { // 15% CPS 2525c (Increased Merriness) scales [Santa's Gift]
    id: 153,
    delta: () => flareGetRate() * .15,
  },
  { // 15% CPS 2525c (Improved Jolliness) scales [Santa's Gift]
    id: 154,
    delta: () => flareGetRate() * .15,
  },
  { // 1% CPS 2525c (A lump of coal) scales [Santa's Gift]
    id: 155,
    delta: () => flareGetRate() * .01,
  },
  { // 1% CPS 2525c (An Itchy Sweater) scales [Santa's Gift]
    id: 156,
    delta: () => flareGetRate() * .01,
  },
  { // Reindeer appear 2x 2525c (Reindeer Baking Grounds) scales [Santa's Gift]
    id: 157,
    delta: () => flareWaitMinutes(10, 157),
  },
  { // Reindeer 2x slower 2525c (Weight Sleighs) scales [Santa's Gift]
    id: 158,
    delta: () => flareWaitMinutes(10, 158),
  },
  { // Reindeer give 2x 2525c (Ho-ho-ho flavored frosting) scales [Santa's Gift]
    id: 159,
    delta: () => flareWaitMinutes(10, 159),
  },
  { // Buildings 1% cheaper 2525c (Season Savings) scales [Santa's Gift]
    id: 160,
    delta: () => flareWaitMinutes(5, 159),
  },
  { // Upgrades 5% cheaper  2525c (Toy Workshop) scales [Santa's Gift]
    id: 161,
    delta: () => flareWaitMinutes(5, 159),
  },
  { // Grandmas 2x 2525c (Naughty List) scales [Santa's Gift]
    id: 162,
    delta: () => game.Game.Objects['Grandma'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // Random drops 10% 2525c (Santa's Botttomless Bag) scales [Santa's Gift]
    id: 163,
    delta: () => flareWaitMinutes(10, 163),
  },
  { // Clicking 10% 2525c (Santa's Helpers) scales [Santa's Gift]
    id: 164,
    delta: () => flareHz * game.Game.cookiesPs * .1,
  },
  { // CPS +3% / Santa Level 2525c (Santa's Legacy) scales [Santa's Gift]
    id: 165,
    delta: () => flareGetRate() * game.Game.santaLevel * .03,
  },
  { // Milk 5% more powerful 2525c (Santa's Milk and Cookies) scales [Santa's Gift]
    id: 166,
    delta: () => game.Game.cookiesPs * game.Game.milkProgress * 0.05,
  },
  { // Cookie prod 20%, Buildings 1% off, Upgrades 5% off 2.4 quad c (Santa's Dominion)
    id: 168,
    delta: () => flareWaitMinutes(20, 168),
  },

  // Valentine's Day
  { // 2% for 931,000c (Pure heart biscuits)
    id: 169,
    delta: () => flareGetRate() * .02,
  },
  { // 2% for 931m c (Ardent heart biscuits)
    id: 170,
    delta: () => flareGetRate() * .02,
  },
  { // 2% for 931b c (Sour heart biscuits)
    id: 171,
    delta: () => flareGetRate() * .02,
  },
  { // 2% for 931t c (Weeping heart biscuits)
    id: 172,
    delta: () => flareGetRate() * .02,
  },
  { // 2% for 931quad c (Golden heart biscuits)
    id: 173,
    delta: () => flareGetRate() * .02,
  },
  { // 2% for 931quint c (Eternal heart biscuits)
    id: 174,
    delta: () => flareGetRate() * .02,
  },
  { // 2% for 931sex c (Prism heart biscuits)
    id: 645,
    delta: () => flareGetRate() * .02,
  },

  // Research?
  { // Cookie production Multiplier 1% 1quad c (Specialized Chocolate Chips)
    id: 65,
    delta: () => flareGetRate() * .01,
  },
  { // Cookie production Multiplier 2% 2quad c (Designer cocoa beans)
    id: 66,
    delta: () => flareGetRate() * .02,
  },
  { // Grandmas Double 4quad c (Ritual Rolling Pin)
    id: 67,
    delta: () => game.Game.Objects['Grandma'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // Cookie production Multiplier 3% 8quad c (Underworld Ovens)
    id: 68,
    delta: () => flareGetRate() * .03,
  },
  /*
  { // Grandmas get .02CPS per grandma 16quad c (One Mind)
    id: 69,
    delta: () => {
      const g = game.Game.Objects['Grandma'];
      const d = g.amount * .02;
      return g.amount * d;
    },
  },
  */
];

[7,   8,   9,   44,  110, 192, 294, 307, 428, 480, 506, 662, 700, 743, 840]
  .forEach(id=>flareUpgradesList.push({id, delta: () => flareDouble('Grandma')}));

[10,  11,  12,  45,  111, 193, 295, 308, 429, 481, 507, 663, 701, 744, 841]
  .forEach(id=>flareUpgradesList.push({id, delta: () => flareDouble('Farm')}));

[16,  17,  18,  47,  113, 195, 296, 309, 430, 482, 508, 664, 702, 745, 842]
  .forEach(id=>flareUpgradesList.push({id, delta: () => flareDouble('Mine')}));

[13,  14,  15,  46,  112, 194, 297, 310, 431, 483, 509, 665, 703, 746, 843]
  .forEach(id=>flareUpgradesList.push({id, delta: () => flareDouble('Factory')}));

[232, 233, 234, 235, 236, 237, 298, 311, 432, 484, 510, 666, 704, 747, 844]
  .forEach(id=>flareUpgradesList.push({id, delta: () => flareDouble('Bank')}));

[238, 239, 240, 241, 242, 243, 299, 312, 433, 485, 511, 667, 705, 748]
  .forEach(id=>flareUpgradesList.push({id, delta: () => flareDouble('Temple')}));

[244, 245, 246, 247, 248, 249, 300, 313, 434, 486, 512, 668, 706, 749]
  .forEach(id=>flareUpgradesList.push({id, delta: () => flareDouble('Wizard tower')}));

[19,  20,  21,  48,  114, 196, 301, 314, 435, 487, 513, 669, 707, 750]
  .forEach(id=>flareUpgradesList.push({id, delta: () => flareDouble('Shipment')}));

[22,  23,  24,  49,  115, 197, 302, 315, 436, 488, 514, 670, 708]
  .forEach(id=>flareUpgradesList.push({id, delta: () => flareDouble('Alchemy lab')}));

[25,  26,  27,  50,  116, 198, 303, 316, 437, 489, 515, 671, 709]
  .forEach(id=>flareUpgradesList.push({id, delta: () => flareDouble('Portal')}));

[28,  29,  30,  51,  117, 199, 304, 317, 438, 490, 516, 672]
  .forEach(id=>flareUpgradesList.push({id, delta: () => flareDouble('Time machine')}));

[99,  100, 101, 102, 118, 200, 305, 318, 439, 491, 517, 673]
  .forEach(id=>flareUpgradesList.push({id, delta: () => flareDouble('Antimatter condenser')}));

[175, 176, 177, 178, 179, 201, 306, 319, 440, 492, 518, 674]
  .forEach(id=>flareUpgradesList.push({id, delta: () => flareDouble('Prism')}));

[416, 417, 418, 419, 420, 421, 422, 423, 441, 493, 519, 675]
  .forEach(id=>flareUpgradesList.push({id, delta: () => flareDouble('Chancemaker')}));

[522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532]
  .forEach(id=>flareUpgradesList.push({id, delta: () => flareDouble('Fractal engine')}));

[594, 595, 596, 597, 598, 599, 600, 601, 602, 603, 604]
  .forEach(id=>flareUpgradesList.push({id, delta: () => flareDouble('Javascript console')}));

[684, 685, 686, 687, 688, 689, 690, 691, 692, 693]
  .forEach(id=>flareUpgradesList.push({id, delta: () => flareDouble('Idleverse')}));

[730, 731, 732, 733, 734, 735, 736, 737, 738]
  .forEach(id=>flareUpgradesList.push({id, delta: () => flareDouble('Cortex baker')}));

[826, 827, 828, 829, 830, 831, 832, 833, 834]
  .forEach(id=>flareUpgradesList.push({id, delta: () => flareDouble('You')}));

// Messages resulting from game events that don't have an action associated with them
const flareChat = [
  {
    criteria: () => true,
    fired: false,
    message: `Frequency: ${flareHz}Hz`
  }, {
    criteria: () => true,
    fired: false,
    message: 'Operation: Make Cookies for operator (You)'
  }, {
    criteria: () => true,
    fired: false,
    message: 'Status: Running independently and alone'
  }, {
    criteria: () => true,
    fired: false,
    message: `Status: I'll just click the big cookie, then?`
  }, {
    resetOnAscension: false,
    criteria: () => game.Game.milkH > .1,
    fired: false,
    message: 'Error: Don\'t freak out, I\'m dunking the cookie.',
  }, {
    resetOnAscension: false,
    criteria: () => game.Game.Objects['Grandma'].amount,
    fired: false,
    message: 'Error: Oh, excuse me, ma\'am...',
  }, {
    resetOnAscension: false,
    criteria: () => game.Game.Objects['Farm'].amount,
    fired: false,
    message: 'Error: Ok, I\'ll just move over by the cookie...',
  }, {
    resetOnAscension: false,
    criteria: () => game.Game.shimmers.length,
    fired: false,
    message: 'Error: Oh. Do I click the golden one, too?',
  }, {
    resetOnAscension: true,
    criteria: () => !game.Game.Objects['Cursor'].locked,
    fired: false,
    message: 'Building Available: Cursors now available for purchase.',
  }, {
    resetOnAscension: true,
    criteria: () => !game.Game.Objects['Grandma'].locked,
    fired: false,
    message: 'Building Available: Grandma now available for hire.',
  }, {
    resetOnAscension: true,
    criteria: () => !game.Game.Objects['Farm'].locked,
    fired: false,
    message: 'Building Available: Farms available to grow cookies.',
  }, {
    resetOnAscension: true,
    criteria: () => !game.Game.Objects['Mine'].locked,
    fired: false,
    message: 'Building Available: Underground deposits of cookies discovered. Opening Mines.',
  }, {
    resetOnAscension: true,
    criteria: () => !game.Game.Objects['Factory'].locked,
    fired: false,
    message: 'Building Available: Factories full of kitchens baking your cookies.',
  }, {
    resetOnAscension: true,
    criteria: () => !game.Game.Objects['Bank'].locked,
    fired: false,
    message: 'Building Available: Banks to facilitate cookied-related transactions now available.',
  }, {
    resetOnAscension: true,
    criteria: () => !game.Game.Objects['Temple'].locked,
    fired: false,
    message: 'Building Available: Temples dedicated to the cookie pantheon now opening.',
  }, {
    resetOnAscension: true,
    criteria: () => !game.Game.Objects['Wizard tower'].locked,
    fired: false,
    message: 'Building Available: Study of cookie magic requires dedicated facilities. Opening Wizard towers.',
  }, {
    resetOnAscension: true,
    criteria: () => !game.Game.Objects['Shipment'].locked,
    fired: false,
    message: 'Building Available: Shipments arriving from other planets to meet demand.',
  }, {
    resetOnAscension: true,
    criteria: () => !game.Game.Objects['Alchemy lab'].locked,
    fired: false,
    message: 'Building Available: Using Alchemy labs to convert raw materials directly to cookies. Starting with useless gold.',
  }, {
    resetOnAscension: true,
    criteria: () => !game.Game.Objects['Portal'].locked,
    fired: false,
    message: 'Building Available: Portals to the cookieverse offer new means to expand.',
  }, {
    resetOnAscension: true,
    criteria: () => !game.Game.Objects['Time machine'].locked,
    fired: false,
    message: 'Building Available: Time machines allow selling cookies before they are made and after they are eaten.',
  }, {
    resetOnAscension: true,
    criteria: () => !game.Game.Objects['Antimatter condenser'].locked,
    fired: false,
    message: 'Building Available: Inverse cookies from Antimatter condensers are soft on the outside and crispy inside. Still delicious.',
  }, {
    resetOnAscension: true,
    criteria: () => !game.Game.Objects['Prism'].locked,
    fired: false,
    message: 'Building Available: Prisms converting light into cookies, skipping all the messy steps.',
  }, {
    resetOnAscension: true,
    criteria: () => !game.Game.Objects['Chancemaker'].locked,
    fired: false,
    message: 'Building Available: Chancemakers to exploit probability, allowing cookies to simply start existing.',
  }, {
    resetOnAscension: true,
    criteria: () => !game.Game.Objects['Fractal engine'].locked,
    fired: false,
    message: 'Building Available: Repeating patterns in Fractal engines give rise to recursive cookies.',
  }, {
    resetOnAscension: true,
    criteria: () => !game.Game.Objects['Javascript console'].locked,
    fired: false,
    message: 'Building Available: You were already in the Javascript console anyway.',
  }, {
    resetOnAscension: true,
    criteria: () => !game.Game.Objects['Idleverse'].locked,
    fired: false,
    message: 'Building Available: Crossing into other Idleverses to co-generate cookies.',
  }, {
    resetOnAscension: true,
    criteria: () => !game.Game.Objects['Cortex baker'].locked,
    fired: false,
    message: 'Building Available: Not sure what this is.',
  },
];

const flarePlants = [
  {
    target: 'meddleweed',
    primary: 'meddleweed',
    secondary: 'meddleweed',
  }, {
    target: 'crumbspore',
    primary: 'meddleweed',
    secondary: 'meddleweed',
  }, {
    target: 'brownMold',
    primary: 'meddleweed',
    secondary: 'meddleweed',
  }, {
    target: 'bakeberry',
    primary: 'bakerWheat',
    secondary: 'bakerWheat',
  }, {
    target: 'queenbeet',
    primary: 'bakeberry',
    secondary: 'chocoroot',
  }, {
    target: 'chocoroot',
    primary: 'brownMold',
    secondary: 'bakerWheat',
  }, {
    target: 'whiteMildew',
    primary: 'brownMold',
    secondary: 'brownMold',
  }, {
    target: 'whiteChocoroot',
    primary: 'chocoroot',
    secondary: 'whiteMildew',
  }, {
    target: 'thumbcorn',
    primary: 'bakerWheat',
    secondary: 'bakerWheat',
  }, {
    target: 'cronerice',
    primary: 'thumbcorn',
    secondary: 'bakerWheat',
  }, {
    target: 'gildmillet',
    primary: 'cronerice',
    secondary: 'thumbcorn',
  }, {
    target: 'clover',
    primary: 'gildmillet',
    secondary: 'bakerWheat',
  }, {
    target: 'shimmerlily',
    primary: 'clover',
    secondary: 'gildmillet',
  }, {
    target: 'whiskerbloom',
    primary: 'whiteChocoroot',
    secondary: 'shimmerlily',
  }, {
    target: 'nursetulip',
    primary: 'whiskerbloom',
    secondary: 'whiskerbloom',
  }, {
    target: 'elderwort',
    primary: 'shimmerlily',
    secondary: 'cronerice',
  }, {
    target: 'greenRot',
    primary: 'clover',
    secondary: 'whiteMildew',
  }, {
    target: 'doughshroom',
    primary: 'crumbspore',
    secondary: 'crumbspore',
  }, {
    target: 'duketater',
    primary: 'queenbeet',
    secondary: 'queenbeet',

  }, {
    target: 'goldenClover',
    primary: 'gildmillet',
    secondary: 'bakerWheat',
  }, {
    target: 'chimerose',
    primary: 'whiskerbloom',
    secondary: 'shimmerlily',
  }, {
    target: 'foolBolete',
    primary: 'doughshroom',
    secondary: 'greenRot',
  }, {
    target: 'keenmoss',
    primary: 'greenRot',
    secondary: 'brownMold',
  }, {
    target: 'drowsyfern',
    primary: 'keenmoss',
    secondary: 'chocoroot',
  }, {
    target: 'wardlichen',
    primary: 'keenmoss',
    secondary: 'cronerice',
  }, {
    target: 'ichorpuff',
    primary: 'elderwort',
    secondary: 'crumbspore',
  }, {
    target: 'glovemorel',
    primary: 'crumbspore',
    secondary: 'thumbcorn',
  }, {
    target: 'cheapcap',
    primary: 'shimmerlily',
    secondary: 'crumbspore',
  }, {
    target: 'wrinklegill',
    primary: 'crumbspore',
    secondary: 'brownMold',
  }, {
    target: 'tidygrass',
    primary: 'whiteChocoroot',
    secondary: 'bakerWheat',
  }, {
    target: 'everdaisy',
    primary: 'tidygrass',
    secondary: 'elderwort',
  }, {
    target: 'queenbeetLump',
    primary: 'queenbeet',
    secondary: 'queenbeet',
  }, {
    target: 'shriekbulb',
    primary: 'duketater',
    secondary: 'duketater',
  }
];
const flareSlotNames = ['Diamond', 'Ruby', 'Jade'];

const flareWaitMinutes = (minutes, upgradeID) => {
  const actualMax = Math.min(minutes * 60, flareLongestWait);
  const price = game.Game.UpgradesById[upgradeID].getPrice();
  return price / flareGetRate() > actualMax ? 0 : price;
};

const flareCursorAndClick = () => {
  const cursor = game.Game.Objects['Cursor'].storedTotalCps * game.Game.globalCpsMult;
  const click = flareHz * game.Game.computedMouseCps;
  return cursor + click;
}

const flareSynergy = (fivePercent, pointOnePercent) => {
  const b1 = game.Game.Objects[fivePercent];
  const b2 = game.Game.Objects[pointOnePercent];
  const g = game.Game.Objects['Grandma'];
  const mult = game.Game.globalCpsMult;

  // To be complete, would also need to include building buffs. This is close enough
  const b1Boost = mult*(1 + b2.amount*.05) * b1.storedTotalCps * (1+g.amount/b1.id*.01);
  const b2Boost = mult*(1 + b1.amount*.001) * b2.storedTotalCps * (1+g.amount/b2.id*.01);

  return b1Boost + b2Boost;
}

const flareGrandmaSynergy = (name) => {
  const g = game.Game.Objects['Grandma'];
  const b = game.Game.Objects[name];
  const b_delta = b.storedTotalCps * ((g.amount / (b.id - 1)) * .01);
  return (g.storedTotalCps + b_delta) * game.Game.globalCpsMult;
}

const flareDouble = (name) => {
  return game.Game.Objects[name].storedTotalCps * game.Game.globalCpsMult;
}
