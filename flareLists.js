const flareAscensionList = [
  [
    363, // Cost: 1, Unlocks others (Legacy)
    323, // Cost: 9, (How to bake your dragon)
    395, // Cost: 3, 10% increase Cookie multiplier (Heavenly cookies)
    264, // Cost: 100, Unlock perrmanent slot (put kitten managers)
    254, // Cost: 25, unlocks more cookie upgrades (macarons)
    255, // Cost: 25, unlocks more cookie upgrades (brand biscuits)
    253, // Cost: 25, unlocks more cookie upgrades (british tea biscuits)
    282, // Cost: 75, 5% more golden cookies (Heavenly Luck)
    520, // Cost: 100, 1% per herald (Heralds) - we're offline, so it doesn't count, but it unlocks seasons
    // 326, // Cost: 25, unlocks more cookie upgrades (butter cookies) Not worth it
  ],[
    181, // Cost: 1111, Unlock Season Switcher (Season Switcher)
    327, // Cost: 999, Unlock Golden Switch (Golden Switch)
    283, // Cost: 777, Golden Cookies effects last 10% longer (Lasting fortune)
  ],[
    365, // Cost: 99,999, 10% CPS for golden cookie upgrades (Residual luck)
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
  },
];

const flareUpgradesList = [
  { // 2x cursor for 100c, unlocked by first cursor
    id: 0,
    delta: () => game.Game.Objects['Cursor'].storedTotalCps + flareHz,
  },
  { // 2x cursor for 500c
    id: 1,
    delta: () => game.Game.Objects['Cursor'].storedTotalCps + flareHz,
  },
  { // 2x cursor for 10000c
    id: 2,
    delta: () => game.Game.Objects['Cursor'].storedTotalCps + flareHz,
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

  { // 2x grandma for 1000c
    id: 7,
    delta: () => game.Game.Objects['Grandma'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x grandma for 5000c
    id: 8,
    delta: () => game.Game.Objects['Grandma'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x grandma for 50000c
    id: 9,
    delta: () => game.Game.Objects['Grandma'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x grandma for 5m c
    id: 44,
    delta: () => game.Game.Objects['Grandma'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x grandma for 500m c
    id: 110,
    delta: () => game.Game.Objects['Grandma'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x grandma for 50b c
    id: 192,
    delta: () => game.Game.Objects['Grandma'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x grandma for 50t c
    id: 294,
    delta: () => game.Game.Objects['Grandma'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x grandma for 50quad c
    id: 307,
    delta: () => game.Game.Objects['Grandma'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x grandma for 50quint c
    id: 428,
    delta: () => game.Game.Objects['Grandma'].storedTotalCps * game.Game.globalCpsMult,
  },

  { // 2x farms for 11000c
    id: 10,
    delta: () => game.Game.Objects['Farm'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x farms for 55000c
    id: 11,
    delta: () => game.Game.Objects['Farm'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x farms for 550000c
    id: 12,
    delta: () => game.Game.Objects['Farm'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x farms for 55m c
    id: 45,
    delta: () => game.Game.Objects['Farm'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x farms for 5.5b c
    id: 111,
    delta: () => game.Game.Objects['Farm'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x farms for 550b c
    id: 193,
    delta: () => game.Game.Objects['Farm'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x farms for 550t c
    id: 295,
    delta: () => game.Game.Objects['Farm'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x farms for 550quad c
    id: 308,
    delta: () => game.Game.Objects['Farm'].storedTotalCps * game.Game.globalCpsMult,
  },

  { // 2x factories for 1.3m c
    id: 13,
    delta: () => game.Game.Objects['Factory'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x factories for 6.5m c
    id: 14,
    delta: () => game.Game.Objects['Factory'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x factories for 65m c
    id: 15,
    delta: () => game.Game.Objects['Factory'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x factories for 6.5b c
    id: 46,
    delta: () => game.Game.Objects['Factory'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x factories for 650b c
    id: 112,
    delta: () => game.Game.Objects['Factory'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x factories for 65t c
    id: 194,
    delta: () => game.Game.Objects['Factory'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x factories for 65quad c
    id: 297,
    delta: () => game.Game.Objects['Factory'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x factories for 65quint c
    id: 310,
    delta: () => game.Game.Objects['Factory'].storedTotalCps * game.Game.globalCpsMult,
  },

  { // 2x mines for 120000c
    id: 16,
    delta: () => game.Game.Objects['Mine'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x mines for 600000c
    id: 17,
    delta: () => game.Game.Objects['Mine'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x mines for 6m c
    id: 18,
    delta: () => game.Game.Objects['Mine'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x mines for 600m c
    id: 47,
    delta: () => game.Game.Objects['Mine'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x mines for 60b c
    id: 113,
    delta: () => game.Game.Objects['Mine'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x mines for 6t c
    id: 195,
    delta: () => game.Game.Objects['Mine'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x mines for 6quad c
    id: 296,
    delta: () => game.Game.Objects['Mine'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x mines for 6quint c
    id: 309,
    delta: () => game.Game.Objects['Mine'].storedTotalCps * game.Game.globalCpsMult,
  },

  { // 2x bank for 14m c
    id: 232,
    delta: () => game.Game.Objects['Bank'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x bank for 70m c
    id: 233,
    delta: () => game.Game.Objects['Bank'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x bank for 700m c
    id: 234,
    delta: () => game.Game.Objects['Bank'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x bank for 70b c
    id: 235,
    delta: () => game.Game.Objects['Bank'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x bank for 7t c
    id: 236,
    delta: () => game.Game.Objects['Bank'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x bank for 700t c
    id: 237,
    delta: () => game.Game.Objects['Bank'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x bank for 700quad c
    id: 298,
    delta: () => game.Game.Objects['Bank'].storedTotalCps * game.Game.globalCpsMult,
  },

  { // 2x temple for 200m c
    id: 238,
    delta: () => game.Game.Objects['Temple'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x temple for 1b c
    id: 239,
    delta: () => game.Game.Objects['Temple'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x temple for 10b c
    id: 240,
    delta: () => game.Game.Objects['Temple'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x temple for 1t c
    id: 241,
    delta: () => game.Game.Objects['Temple'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x temple for 100t c
    id: 242,
    delta: () => game.Game.Objects['Temple'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x temple for 10quad c
    id: 243,
    delta: () => game.Game.Objects['Temple'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x temple for 10quint c
    id: 299,
    delta: () => game.Game.Objects['Temple'].storedTotalCps * game.Game.globalCpsMult,
  },

  { // 2x wizard tower for 3.3b c
    id: 244,
    delta: () => game.Game.Objects['Wizard tower'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x wizard tower for 16.5b c
    id: 245,
    delta: () => game.Game.Objects['Wizard tower'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x wizard tower for 165b c
    id: 246,
    delta: () => game.Game.Objects['Wizard tower'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x wizard tower for 16.5t c
    id: 247,
    delta: () => game.Game.Objects['Wizard tower'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x wizard tower for 1.65quad c
    id: 248,
    delta: () => game.Game.Objects['Wizard tower'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x wizard tower for 165quad c
    id: 249,
    delta: () => game.Game.Objects['Wizard tower'].storedTotalCps * game.Game.globalCpsMult,
  },

  { // 2x Shipment for 51b c
    id: 19,
    delta: () => game.Game.Objects['Shipment'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Shipment for 255b c
    id: 20,
    delta: () => game.Game.Objects['Shipment'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Shipment for 2.55t c
    id: 21,
    delta: () => game.Game.Objects['Shipment'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Shipment for 255t c
    id: 48,
    delta: () => game.Game.Objects['Shipment'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Shipment for 25.5quad c
    id: 114,
    delta: () => game.Game.Objects['Shipment'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Shipment for 2.55quint c
    id: 196,
    delta: () => game.Game.Objects['Shipment'].storedTotalCps * game.Game.globalCpsMult,
  },

  { // 2x Alchemy lab for 750b c
    id: 22,
    delta: () => game.Game.Objects['Alchemy lab'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Alchemy lab for 3.75t c
    id: 23,
    delta: () => game.Game.Objects['Alchemy lab'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Alchemy lab for 37.5t c
    id: 24,
    delta: () => game.Game.Objects['Alchemy lab'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Alchemy lab for 3.75quad c
    id: 49,
    delta: () => game.Game.Objects['Alchemy lab'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Alchemy lab for 375quad c
    id: 115,
    delta: () => game.Game.Objects['Alchemy lab'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Alchemy lab for 37.5quint c
    id: 197,
    delta: () => game.Game.Objects['Alchemy lab'].storedTotalCps * game.Game.globalCpsMult,
  },

  { // 2x Portal for 10t c
    id: 25,
    delta: () => game.Game.Objects['Portal'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Portal for 50t c
    id: 26,
    delta: () => game.Game.Objects['Portal'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Portal for 3.75quad c
    id: 27,
    delta: () => game.Game.Objects['Portal'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Portal for 50quad c
    id: 50,
    delta: () => game.Game.Objects['Portal'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Portal for 5quint c
    id: 116,
    delta: () => game.Game.Objects['Portal'].storedTotalCps * game.Game.globalCpsMult,
  },

  { // 2x Time Machine for 140t c
    id: 28,
    delta: () => game.Game.Objects['Time machine'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Time Machine for 700t c
    id: 29,
    delta: () => game.Game.Objects['Time machine'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Time Machine for 7quad c
    id: 30,
    delta: () => game.Game.Objects['Time machine'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Time Machine for 700quad c
    id: 51,
    delta: () => game.Game.Objects['Time machine'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Time Machine for 70quint c
    id: 117,
    delta: () => game.Game.Objects['Time machine'].storedTotalCps * game.Game.globalCpsMult,
  },

  { // 2x Antimater condensor for 1.7quad c
    id: 99,
    delta: () => game.Game.Objects['Antimatter condenser'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Antimater condensor for 8.5quad c
    id: 100,
    delta: () => game.Game.Objects['Antimatter condenser'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Antimater condensor for 85quad c
    id: 101,
    delta: () => game.Game.Objects['Antimatter condenser'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Antimater condensor for 8.5quint c
    id: 102,
    delta: () => game.Game.Objects['Antimatter condenser'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Antimater condensor for 850quint c
    id: 118,
    delta: () => game.Game.Objects['Antimatter condenser'].storedTotalCps * game.Game.globalCpsMult,
  },

  { // 2x Prism for 21quad c
    id: 175,
    delta: () => game.Game.Objects['Prism'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Prism for 105quad c
    id: 176,
    delta: () => game.Game.Objects['Prism'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Prism for 1.05quint c
    id: 177,
    delta: () => game.Game.Objects['Prism'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Prism for 105quint c
    id: 178,
    delta: () => game.Game.Objects['Prism'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Prism for 10.5sex c
    id: 179,
    delta: () => game.Game.Objects['Prism'].storedTotalCps * game.Game.globalCpsMult,
  },

  { // 2x Chancemaker for 260quad c
    id: 416,
    delta: () => game.Game.Objects['Chancemaker'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Chancemaker for 1.3quint c
    id: 417,
    delta: () => game.Game.Objects['Chancemaker'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Chancemaker for 13quint c
    id: 418,
    delta: () => game.Game.Objects['Chancemaker'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Chancemaker for 1.3sex c
    id: 419,
    delta: () => game.Game.Objects['Chancemaker'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Chancemaker for 130sex c
    id: 420,
    delta: () => game.Game.Objects['Chancemaker'].storedTotalCps * game.Game.globalCpsMult,
  },

  { // 2x Fractal engine for 3.1quint c
    id: 522,
    delta: () => game.Game.Objects['Fractal engine'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Fractal engine for 15.5quint c
    id: 523,
    delta: () => game.Game.Objects['Fractal engine'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Fractal engine for 155quint c
    id: 524,
    delta: () => game.Game.Objects['Fractal engine'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Fractal engine for 1.5sex c
    id: 525,
    delta: () => game.Game.Objects['Fractal engine'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Fractal engine for 1.55sep c
    id: 526,
    delta: () => game.Game.Objects['Fractal engine'].storedTotalCps * game.Game.globalCpsMult,
  },

  { // 2x Javascript console for 710quint c
    id: 594,
    delta: () => game.Game.Objects['Javascript console'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Javascript console for 3.55sex c
    id: 595,
    delta: () => game.Game.Objects['Javascript console'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Javascript console for 35.5sex c
    id: 596,
    delta: () => game.Game.Objects['Javascript console'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Javascript console for 3.55sep c
    id: 597,
    delta: () => game.Game.Objects['Javascript console'].storedTotalCps * game.Game.globalCpsMult,
  },

  { // 2x Idleverse for 120sex c
    id: 684,
    delta: () => game.Game.Objects['Idleverse'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Idleverse for 600sex c
    id: 685,
    delta: () => game.Game.Objects['Idleverse'].storedTotalCps * game.Game.globalCpsMult,
  },
  { // 2x Idleverse for 6sep c
    id: 686,
    delta: () => game.Game.Objects['Idleverse'].storedTotalCps * game.Game.globalCpsMult,
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

  { // 2x Grandmas, Farms +1% CPS / Grandma for 55000c
    id: 57,
    delta: () => {
      const g = game.Game.Objects['Grandma'];
      const f = game.Game.Objects['Farm'];
      const f_delta = f.amount * (g.amount * f.storedCps * .01);
      return (g.storedTotalCps + f_delta) * game.Game.globalCpsMult;
    },
  },
  { // 2x Grandmas, Mines +1% CPS / 2xGrandma for 600000c
    id: 58,
    delta: () => {
      const g = game.Game.Objects['Grandma'];
      const m = game.Game.Objects['Mine'];
      const m_delta = m.amount * ((g.amount / 2) * m.storedCps * .01);
      return (g.storedTotalCps + m_delta) * game.Game.globalCpsMult;
    },
  },
  { // 2x Grandmas, Factories +1% CPS / 3xGrandma for 6.5m c
    id: 59,
    delta: () => {
      const g = game.Game.Objects['Grandma'];
      const f = game.Game.Objects['Factory'];
      const f_delta = f.amount * ((g.amount / 3) * f.storedCps * .01);
      return (g.storedTotalCps + f_delta) * game.Game.globalCpsMult;
    },
  },
  { // 2x Grandmas, Banks +1% CPS / 4xGrandma for 70m c
    id: 250,
    delta: () => {
      const g = game.Game.Objects['Grandma'];
      const b = game.Game.Objects['Bank'];
      const b_delta = b.amount * ((g.amount / 4) * b.storedCps * .01);
      return (g.storedTotalCps + b_delta) * game.Game.globalCpsMult;
    },
  },
  { // 2x Grandmas, Temple +1% CPS / 5xGrandma for 2b c
    id: 251,
    delta: () => {
      const g = game.Game.Objects['Grandma'];
      const t = game.Game.Objects['Temple'];
      const t_delta = t.amount * ((g.amount / 5) * t.storedCps * .01);
      return (g.storedTotalCps + t_delta) * game.Game.globalCpsMult;
    },
  },
  { // 2x Grandmas, Wizard tower +1% CPS / 6xGrandma for 16.5b c
    id: 252,
    delta: () => {
      const g = game.Game.Objects['Grandma'];
      const w = game.Game.Objects['Wizard tower'];
      const w_delta = w.amount * ((g.amount / 6) * w.storedCps * .01);
      return (g.storedTotalCps + w_delta) * game.Game.globalCpsMult;
    },
  },
  { // 2x Grandmas, Shipment +1% CPS / 7xGrandma for 255b c
    id: 60,
    delta: () => {
      const g = game.Game.Objects['Grandma'];
      const s = game.Game.Objects['Shipment'];
      const s_delta = s.amount * ((g.amount / 7) * s.storedCps * .01);
      return (g.storedTotalCps + s_delta) * game.Game.globalCpsMult;
    },
  },
  { // 2x Grandmas, Alchemy lab +1% CPS / 8xGrandma for 255b c
    id: 61,
    delta: () => {
      const g = game.Game.Objects['Grandma'];
      const a = game.Game.Objects['Alchemy lab'];
      const a_delta = a.amount * ((g.amount / 8) * a.storedCps * .01);
      return (g.storedTotalCps + a_delta) * game.Game.globalCpsMult;
    },
  },
  { // 2x Grandmas, Portals +1% CPS / 9xGrandma for 50t c
    id: 62,
    delta: () => {
      const g = game.Game.Objects['Grandma'];
      const p = game.Game.Objects['Portal'];
      const p_delta = p.amount * ((g.amount / 9) * p.storedCps * .01);
      return (g.storedTotalCps + p_delta) * game.Game.globalCpsMult;
    },
  },
  { // 2x Grandmas, Time Machines +1% CPS / 10xGrandma for 700t c
    id: 63,
    delta: () => {
      const g = game.Game.Objects['Grandma'];
      const t = game.Game.Objects['Time machine'];
      const t_delta = t.amount * ((g.amount / 10) * t.storedCps * .01);
      return (g.storedTotalCps + t_delta) * game.Game.globalCpsMult;
    },
  },
  { // 2x Grandmas, Antimatter condenser +1% CPS / 11xGrandma for 8.5quad c
    id: 103,
    delta: () => {
      const g = game.Game.Objects['Grandma'];
      const a = game.Game.Objects['Antimatter condenser'];
      const a_delta = a.amount * ((g.amount / 11) * a.storedCps * .01);
      return (g.storedTotalCps + a_delta) * game.Game.globalCpsMult;
    },
  },
  { // 2x Grandmas, Prism +1% CPS / 12xGrandma for 8.5quad c
    id: 180,
    delta: () => {
      const g = game.Game.Objects['Grandma'];
      const p = game.Game.Objects['Prism'];
      const p_delta = p.amount * ((g.amount / 12) * p.storedCps * .01);
      return (g.storedTotalCps + p_delta) * game.Game.globalCpsMult;
    },
  },
  { // 2x Grandmas, Chancemaker +1% CPS / 13xGrandma for 1.3quint c
    id: 415,
    delta: () => {
      const g = game.Game.Objects['Grandma'];
      const c = game.Game.Objects['Chancemaker'];
      const c_delta = c.amount * ((g.amount / 13) * c.storedCps * .01);
      return (g.storedTotalCps + c_delta) * game.Game.globalCpsMult;
    },
  },
  { // 2x Grandmas, Fractal engine +1% CPS / 14xGrandma for 15.5quint c
    id: 521,
    delta: () => {
      const g = game.Game.Objects['Grandma'];
      const f = game.Game.Objects['Fractal engine'];
      const f_delta = f.amount * ((g.amount / 14) * f.storedCps * .01);
      return (g.storedTotalCps + f_delta) * game.Game.globalCpsMult;
    },
  },
  { // 2x Grandmas, Javascript console +1% CPS / 15xGrandma for 3.55sex c
    id: 593,
    delta: () => {
      const g = game.Game.Objects['Grandma'];
      const j = game.Game.Objects['Javascript console'];
      const j_delta = j.amount * ((g.amount / 15) * j.storedCps * .01);
      return (g.storedTotalCps + j_delta) * game.Game.globalCpsMult;
    },
  },
  { // 2x Grandmas, Idleverse +1% CPS / 16xGrandma for 600sex c
    id: 683,
    delta: () => {
      const g = game.Game.Objects['Grandma'];
      const i = game.Game.Objects['Idleverse'];
      const i_delta = i.amount * ((g.amount / 16) * i.storedCps * .01);
      return (g.storedTotalCps + i_delta) * game.Game.globalCpsMult;
    },
  },
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
  { // Cookie Production Multiplier 4% for 1oct c (Pink biscuits)
    id: 444,
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
  { // Cookie Production Multiplier 10% for 1t c (Chocolate Chip)
    id: 590,
    delta: () => flareGetRate() * .10,
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
    delta: () => 0, // I don't know how this works yet
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
  { // Grandmas get .02CPS per grandma 16quad c (One Mind)
    id: 69,
    delta: () => {
      const g = game.Game.Objects['Grandma'];
      const d = g.amount * .02;
      return g.amount * d;
    },
  },
];

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
  const price = game.Game.UpgradesById[upgradeID].getPrice();
  return price / flareGetRate() > minutes * 60 ? 0 : price;
};
