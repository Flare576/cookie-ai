// consider this for strats
// https://www.reddit.com/r/CookieClicker/comments/xmrhwn/build_for_trillion_heavenly_chips_what_can_i/
let game;
let flareKillable;
let flareDelay = 1000/flareHz;
let flareOneAction = true;
let flareAscending = 0;
let flareSubStep = 0;
let flareMessages = [];
let flareWonAchievements = [];
let flareNextPurchase;
let flareRepurchase;
// If we spend cookies or need to save, set to false
let flareShouldSpendCookies = true;
let flareDashMessage = "";
let gid = (n) => game.document.getElementById(n);

// Line 2713 shows a lot of the variables in the game
// Line 7683 shows the Game.Objects definition
// Line 9932 upgrades defined

const flareOp = () => {
  flareDashMessage = "";
  flareShouldSpendCookies = true;
  [
    flareAscend,
    flareClickShimmer,
    flareSpendLumps,
    flareCastSpells,
    flarePlayWithGods,
    flareTendGarden,
    flareAdjustStocks,
    flareTrainDragon,
    flareShop,
    flareClickCookie,
  ].find(f => f());
  flareDrawOutput();
};

const flareAscend = () => {
  //Don't ascend if you have an active buff - you might get another level
  if (flareHasBuff()) return false;

  if (flareAscending > 0 || game.Game.cookiesEarned >= flareAscensionGoal()) {
    switch (flareAscending) {
      case 0: // Click the button
        flareAscending = 1;
        game.Game.Ascend(1);
        break;
      case 1: // Wait for UI to show up, then apply Heavenly Chips
        if (gid('heavenlyUpgrade363')) {
          // Permanent Upgrade, skip during this step
          const next = flareNextChipBatch().upgrades.find(u => u.id !== 264 && !u.bought);
          if (next && next.basePrice <= game.Game.heavenlyChips) {
            game.Game.UpgradesById[next.id].click();
          } else {
            flareAscending = 2;
          }
        }
        break;
      case 2: // Set Permanent Upgrade 1
        const perm1 = game.Game.UpgradesById[264];
        if (perm1.bought || (perm1.canBePurchased && perm1.basePrice <= game.Game.heavenlyChips)) {
          if (!flareSetPermanentUpgrade1()) {
            flareAscending = 3;
          }
        }
        break;
      case 3: // Set Ascend mode
        flareAscending = 4;
        game.Game.nextAscensionMode = 0;
        //game.Game.nextAscensionMode = 1; // Born again grants access to some achievements, See Line 16328
        break;
      case 4: // Lets-a-go
        flareAscending = 5;
        game.Game.Reincarnate(1);
        break;
      case 5: // UI restored
        if (gid('product2') && gid('product2').classList.contains('toggledOff')) {
          flareChat.forEach(c => {
            if (c.resetOnAscension) c.fired = false;
          });
          flareAscending = 0;
        }
        break;
    }
    return true;
  }
  return false;
}

const flareAscensionGoal = () => {
  // See Line 16542
  const next = flareNextChipBatch();
  const owned = Math.floor(game.Game.HowMuchPrestige(game.Game.cookiesReset));
  return game.Game.HowManyCookiesReset(owned + next.batchCost) - game.Game.cookiesReset;
}

const flareNextChipBatch = () => {
  return flareAscensionList
    .map(batch => {
      const upgrades = batch.map(id => game.Game.UpgradesById[id])
      const done = upgrades[upgrades.length - 1].bought;
      const batchCost = upgrades.reduce((total, u) => total += u.basePrice,0);
      return {
        done,
        upgrades,
        batchCost,
      }
    })
    .find(batch => !batch.done);
}

const flareSetPermanentUpgrade1 = () => {
  switch (flareSubStep) {
    case 0:
      if(gid('heavenlyUpgrade264')) {
        gid('heavenlyUpgrade264').click();
        flareSubStep = 1;
      }
      break;
    case 1:
      // Right now, just use Kitten managers, eventually do a priority thing
      const bestAvailable = [
        'upgradeForPermanent320', // Kitten Accountants
        'upgradeForPermanent187', // Kitten Managers
        'upgradeForPermanent108', // Kitten Overseers
        'upgradeForPermanent32', // Kitten Workers
      ].find(id => gid(id));
      if(gid(bestAvailable)) {
        gid(bestAvailable).click();
        flareSubStep = 2;
      }
      break;
    case 2:
      if(gid('promptOption0')) {
        gid('promptOption0').click();
        flareSubStep = 3;
      }
      break;
    case 3:
      flareSubStep = 0;
      return false;
  }
  return true;
}

const flareClickShimmer = () => {
  if (game.Game.shimmers.length) {
    const topGolden = game.Game.shimmers.find(s => !s.wrath);
    if (topGolden) {
      // Line 5653 is pop-up call
      // For the first cookie, wait until (literally) the last second
      if (game.Game.goldenClicks === 0 && topGolden.life >= 30) return false;
      // wait just a bit
      // if (topGolden.dur * 30 - topGolden.life < 15) return false;
      topGolden.l.click();
      const message = game.Game.textParticles
        .filter(t => t.life >= 0 && !t.text.includes('Promising fate!'))
        .sort((a,b) => a.life - b.life)[0].text;
      flareLog(`Clicking Golden Cookie - ${message}`);
      return flareOneAction;
    }
  }
}

const flareClickCookie = () => {
  // For some reason this doesn't register all the clicks
  // gid('bigCookie').click();
  game.Game.ClickCookie();
}

const flareSpendLumps = () => {
  return false; // TODO: remove after finishing garden
  const lumpAge = Date.now() - game.Game.lumpT;
  if (lumpAge > game.Game.lumpRipeAge) {
    flareLog('Harvesting a Sugar Lump')
    game.Game.clickLump();
    return flareOneAction;
  }

  const lumps = game.Game.lumps;
  if (lumps > 0) {
    // We want access to the minigames first
    const nextMinigame = [
      'Wizard tower', // 1st Grimoire
      'Temple', // 2nd Pantheon
      'Farm', // 3rd Garden
      'Bank', // 4th Stock Market
    ]
      .map(n => game.Game.Objects[n])
      .find(obj => obj.level === 0);
    if (nextMinigame) {
      if (nextMinigame.amount) {
        flareLog(`Activating Minigame: ${nextMinigame.minigameName}`);
        nextMinigame.levelUp();
        return flareOneAction;
      }
      return false;
    }
    // all unlocked, upgrade
    const farm = game.Game.Objects['Farm'];
    const cursor = game.Game.Objects['Cursor'];
    const cortex = game.Game.Objects['Cortex baker'];
    const idle = game.Game.Objects['Idleverse'];

    if (farm.level < 9) {
      if (!farm.locked && lumps >= farm.level + 1) {
        flareLog('Upgrading Farm with sugar lumps');
        farm.levelUp();
        return flareOneAction;
      }
      return false;
    }
    if (cursor.level < 12) {
      if (cursor.locked) return false;
      const lumpsSpent = cursor.level*(cursor.level + 1)/2;
      // We want to jump to 4 (10 lumps), 10 (55 lumps), and 12 (78 lumps)
      if (cursor.level < 4 && lumps >= 10 - lumpsSpent) {
        flareLog('Upgrading Cursor with sugar lumps');
        cursor.levelUp();
        return flareOneAction;
      } else if (cursor.level < 10 && lumps >= 55 - lumpsSpent) {
        flareLog('Upgrading Cursor with sugar lumps');
        cursor.levelUp();
        return flareOneAction;
      } else if (cursor.level < 12 && lumps >= 78 - lumpsSpent) {
        flareLog('Upgrading Cursor with sugar lumps');
        cursor.levelUp();
        return flareOneAction;
      }
      return false
    }
    // All upgraded, optimize click effects
    if (lumps > 100) {
      const adjustedLumps = lumps - 100; // keep a buffer of 100
      if (farm.level < 10) {
        // Take Farms to 10
        if (!farm.locked && adjustedLumps >= farm.level + 1) {
          flareLog('Upgrading Farms with sugar lumps');
          farm.levelUp();
          return flareOneAction;
        }
        return false;
      } else if (cursor.level < 18) {
        // Take Cursors to 18
        if (!cursor.locked && adjustedLumps >= cursor.level + 1) {
          flareLog('Upgrading Cursors with sugar lumps');
          cursor.levelUp();
          return flareOneAction;
        }
        return false;
      } else if (cortex.level < 10) {
        // Take Cortex bakers to 10
        if (!cortex.locked && adjustedLumps >= cortex.level + 1) {
          flareLog('Upgrading Cortex bakers with sugar lumps');
          cortex.levelUp();
          return flareOneAction;
        }
      } else if (cursor.level < 19) {
        // Take Cursors to 19
        if (!cursor.locked && adjustedLumps >= cursor.level + 1) {
          flareLog('Upgrading Cursors with sugar lumps');
          cursor.levelUp();
          return flareOneAction;
        }
        return false;
      } else if (idle.level < 10) {
        // Take idleverse to 10
        if (!idle.locked && adjustedLumps >= idle.level + 1) {
          flareLog('Upgrading Idleverse with sugar lumps');
          idle.levelUp();
          return flareOneAction;
        }
        return false;
      } else if (cursor.level < 20) {
        // Take Cursors to 20
        if (!cursor.locked && adjustedLumps >= cursor.level + 1) {
          flareLog('Upgrading Cursor with sugar lumps');
          cursor.levelUp();
          return flareOneAction;
        }
        return false;
      }
    }
  }
  return false;
}

const flareCastSpells = () => {
  const tower = game.Game.Objects['Wizard tower'];
  if (!tower.minigameLoaded) return false;
  if (flareBoostBuffs()) {
    const grimoire = tower.minigame;
    const spell = grimoire.spells['hand of fate'];
    // Magic is full and spell isn't too expensive
    if (grimoire.magic === grimoire.magicM && grimoire.magic > grimoire.getSpellCost(spell)) {
      flareLog('Casting "Force the Hand of Fate"');
      grimoire.castSpell(spell);
      return flareOneAction;
    }
  }
  return false;
}

const flareIsBefore = (current, hour, minute) => {
  const ch = current.getUTCHours();
  if (ch < hour) return true
  // Allow 1 minute past to account for any multi-step processes
  else return ch === hour && current.getMinutes() - minute <= 1;
}

const flarePlayWithGods = () => {
  const temple = game.Game.Objects['Temple'];
  if (!temple.minigameLoaded) return false;
  const mg = temple.minigame;
  if (mg.swaps === 3) {
    const current = new Date();
    let gods;
    // Line 4998 for formula
    // Ages times: https://cookieclicker.fandom.com/wiki/Pantheon#Cyclius,_Spirit_of_Ages
    if (flareIsBefore(current, 1, 12)) {
      gods = [{ name: 'ages', slot: 0 }, { name: 'labor', slot: 1 }, { name: 'creation', slot: 2 }];
    } else if (flareIsBefore(current, 4, 0)) {
      gods = [{ name: 'ages', slot: 1 }, { name: 'labor', slot: 0 }, { name: 'creation', slot: 2 }];
    } else if (flareIsBefore(current, 9, 19)) {
      gods = [{ name: 'ages', slot: 2 }, { name: 'labor', slot: 0 }, { name: 'creation', slot: 1 }];
    } else if (flareIsBefore(current, 10, 20)) {
      gods = [{ name: 'ages', slot: 0 }, { name: 'labor', slot: 2 }, { name: 'creation', slot: 1 }];
    } else if (flareIsBefore(current, 12, 00)) {
      gods = [{ name: 'ages', slot: 2 }, { name: 'labor', slot: 0 }, { name: 'creation', slot: 1 }];
    } else if (flareIsBefore(current, 13, 12)) {
      gods = [{ name: 'ages', slot: 0 }, { name: 'labor', slot: 2 }, { name: 'creation', slot: 1 }];
    } else if (flareIsBefore(current, 18, 00)) {
      gods = [{ name: 'ages', slot: 1 }, { name: 'labor', slot: 0 }, { name: 'creation', slot: 2 }];
    } else if (flareIsBefore(current, 19, 30)) {
      gods = [{ name: 'ages', slot: 0 }, { name: 'labor', slot: 1 }, { name: 'creation', slot: 2 }];
    } else if (flareIsBefore(current, 21, 00)) {
      gods = [{ name: 'decadence', slot: 0 }, { name: 'labor', slot: 1 }, { name: 'creation', slot: 2 }];
    } else if (flareIsBefore(current, 22, 30)) {
      gods = [{ name: 'ages', slot: 0 }, { name: 'labor', slot: 1 }, { name: 'creation', slot: 2 }];
    } else if (flareIsBefore(current, 24, 00)) {
      gods = [{ name: 'decadence', slot: 0 }, { name: 'labor', slot: 1 }, { name: 'creation', slot: 2 }];
    }

    if (gods.find(({name, slot}) => flareMoveGod(mg.gods[name], slot))) return true;

    // Once we figure out Godzamok
    /*
    if (mg.slot[0] === -1) {
      if (flareMoveGod(mg.gods['ruin'], 0)) return true;
    } else if (mg.slot[1] === -1) {
      if (flareMoveGod(mg.gods['labor'], 1)) return true;
    } else if (mg.slot[2] === -1) {
      if (flareMoveGod(mg.gods['creation'], 2)) return true;
    }
    */
  }
  return false; // need to figure out when this is actually beneficial
  const buffs = Object.keys(game.Game.buffs);
  const devastate = !buffs.includes('Devastation') && !buffs.includes('Cookie storm') && buffs.length > 1;
  if (mg.slot[0] === 2 && (flareSubStep || devastate)) {
    // https://cookieclicker.wiki.gg/wiki/Pantheon#Godzamok_101
    const sellable = ['Farm', 'Mine', 'Factory', 'Bank', 'Shipment', 'Alchemy lab', 'Portal', 'Antimatter condenser'];
    switch (flareSubStep) {
      case 0:
        flareRepurchase = sellable
          .map(n => {
            const obj = game.Game.Objects[n];
            if (obj.amount < 50) return null;
            return {
              name: obj.name,
              sold: obj.amount,
              obj,
              bought: 0,
            };
          })
          .filter(o => o);
        game.Game.storeBulkButton(5); // Set to All to sell fastest
        flareSubStep++;
        return true;
      case 1:
        const toSell = sellable
          .map(n => {
            const obj = game.Game.Objects[n];
            return obj.amount > 50 ? obj : null;
          })
          .filter(o => o);
        if (toSell.length) {
          const obj = toSell[0];
          flareLog(`Selling Building: ${obj.name} x${obj.amount}`);
          obj.sell();
          return true;
        } else flareSubStep++;
        break;
      case 2: game.Game.storeBulkButton(4); flareSubStep++; return true; // Set to 100
      case 3:
        const toBuyAt100 = flareRepurchase
          .filter(o => o.sold - o.bought > 100);
        if (toBuyAt100.length) {
          const buying = toBuyAt100[0];
          flareLog(`Buying Building: ${buying.name} x100`);
          buying.bought+=100;
          buying.obj.buy();
          return true;
        } else flareSubStep++;
        break
      case 4: game.Game.storeBulkButton(3); flareSubStep++; return true; // Set to 10
      case 5:
        const toBuyAt10 = flareRepurchase
          .filter(o => o.sold - o.bought > 10);
        if (toBuyAt10.length) {
          const buying = toBuyAt10[0];
          flareLog(`Buying Building: ${buying.name} x10`);
          buying.bought+=10;
          buying.obj.buy();
          return true;
        } else flareSubStep++;
        break
      case 6: game.Game.storeBulkButton(2); flareSubStep = 0; return true;
    }
  }
}

const flareMoveGod = (from, to) => {
  const mg = game.Game.Objects['Temple'].minigame;
  if (mg.slot[to] === from.id) return false; // That god is already in that slot
  switch (flareSubStep) {
    case 0:
      flareLog(`Swapping God ${from.name} to Slot ${to + 1}`);
      mg.dragGod(from);
      flareSubStep++; return true;
    case 1: mg.hoverSlot(to); flareSubStep++; return true;
    case 2: mg.dropGod(); flareSubStep = 0; return true;
  }
}

// Eventually make this check for good and bad buffs
const flareHasBuff = () => {
  const keys = Object.keys(game.Game.buffs);
  return keys.length;
}

// If there's a buff, and we're full on magic, summon another cookie!
const flareBoostBuffs = () => {
  const keys = Object.keys(game.Game.buffs);
  if (keys.length) {
    const buff = game.Game.buffs[keys[0]];
    //return keys.length > 1 || buff.time > buff.maxTime * .9 && buff.time < buff.maxTime * .95;
    return keys.length > 1 || buff.time > buff.maxTime * .9;
  }
  return false;
}

// I think the goal of this game is going to be unlocking all the plants
const flareTendGarden = () => {
  const farm = game.Game.Objects['Farm'];
  if (!farm.minigameLoaded) return false;

  const garden = farm.minigame;

  const soil = ['woodchips', 'fertilizer', 'dirt']
    .map(n => garden.soils[n])
    .find(s => farm.amount >= s.req)
  if (garden.soil !== soil.id) {
    flareLog(`Swapping Garden soil to ${soil.name}`);
    gid(`gardenSoil-${soil.id}`).click();
    return true;
  }

  const plantTiles = { primary: [], secondary: [] };
  let harvestTiles;

  switch (farm.level) {
    case 1:
      plantTiles.primary = [{x:3,y:2}];
      plantTiles.secondary = [{x:2,y:2}];
      harvestTiles = [{x:2,y:3},{x:3,y:3}];
      break;
    case 2:
      plantTiles.primary = [{x:3,y:2}];
      plantTiles.secondary = [{x:3,y:3}];
      harvestTiles = [{x:2,y:2},{x:4,y:2},{x:2,y:3},{x:4,y:3}];
      break;
    case 3:
      plantTiles.primary = [{x:2,y:3},{x:4,y:3}];
      plantTiles.secondary = [{x:3,y:3}];
      harvestTiles = [
        {x:2,y:2},{x:3,y:2},{x:4,y:2},

        {x:2,y:4},{x:3,y:4},{x:4,y:4}];
      break;
    case 4:
      plantTiles.primary = [{x:2,y:3},{x:3,y:3}];
      plantTiles.secondary = [{x:1,y:3},{x:4,y:3}];
      harvestTiles = [
        {x:1,y:2},{x:2,y:2},{x:3,y:2},{x:4,y:2},
        {x:1,y:4},{x:2,y:4},{x:3,y:4},{x:4,y:4},
      ];
      break;
    case 5:
      plantTiles.primary = [{x:2,y:2},{x:3,y:3}];
      plantTiles.secondary = [{x:1,y:1},{x:4,y:1},{x:1,y:4},{x:4,y:4}];
      harvestTiles = [
                  {x:2,y:1},{x:2,y:1},
        {x:1,y:2},                    {x:4,y:2},
        {x:1,y:3},                    {x:4,y:3},
                  {x:2,y:4},{x:3,y:4},
      ];
      break;
    case 6:
      plantTiles.primary = [{x:3,y:1},{x:2,y:3},{x:5,y:3}];
      plantTiles.secondary = [{x:1,y:1},{x:5,y:1},{x:4,y:3},{x:1,y:4}];
      harvestTiles = [
                  {x:2,y:1},          {x:4,y:1},
        {x:1,y:2},{x:2,y:2},{x:3,y:2},{x:4,y:2},{x:5,y:2},
        {x:1,y:3},          {x:3,y:3},
                  {x:2,y:4},{x:3,y:4},{x:4,y:4},{x:5,y:4},
      ];
      break;
    case 7:
      plantTiles.primary = [{x:2,y:1},{x:5,y:1},{x:2,y:4},{x:5,y:4}];
      plantTiles.secondary = [{x:1,y:1},{x:4,y:1},{x:1,y:4},{x:4,y:4}];
      harvestTiles = [
                            {x:3,y:1},
        {x:1,y:2},{x:2,y:2},{x:3,y:2},{x:4,y:2},{x:5,y:2},
        {x:1,y:3},{x:2,y:3},{x:3,y:3},{x:4,y:3},{x:5,y:3},
                            {x:3,y:4},
        {x:1,y:5},{x:2,y:5},{x:3,y:5},{x:4,y:5},{x:5,y:5},
      ];
      break;
    case 8:
      plantTiles.primary = [{x:2,y:1},{x:5,y:1},{x:2,y:4},{x:5,y:4}];
      plantTiles.secondary = [{x:2,y:2},{x:5,y:2},{x:2,y:5},{x:5,y:5}];
      harvestTiles = [
        {x:1,y:1},          {x:3,y:1},{x:4,y:1},          {x:6,y:1},
        {x:1,y:2},          {x:3,y:2},{x:4,y:2},          {x:6,y:2},
        {x:1,y:3},{x:2,y:3},{x:3,y:3},{x:4,y:3},{x:5,y:3},{x:6,y:3},
        {x:1,y:4},          {x:3,y:4},{x:4,y:4},          {x:6,y:4},
        {x:1,y:5},          {x:3,y:5},{x:4,y:5},          {x:6,y:5},
      ];
      break;
    case 9:
      plantTiles.primary = [{x:1,y:2},{x:3,y:2},{x:6,y:2},{x:1,y:5},{x:4,y:5},{x:6,y:5}];
      plantTiles.secondary = [{x:2,y:2},{x:5,y:2},{x:2,y:5},{x:5,y:5}];
      harvestTiles = [
        {x:1,y:1},{x:2,y:1},{x:3,y:1},{x:4,y:1},{x:5,y:1},{x:6,y:1},
                                      {x:4,y:2},
        {x:1,y:3},{x:2,y:3},{x:3,y:3},{x:4,y:3},{x:5,y:3},{x:6,y:3},
        {x:1,y:4},{x:2,y:4},{x:3,y:4},{x:4,y:4},{x:5,y:4},{x:6,y:4},
                                      {x:4,y:5},
        {x:1,y:6},{x:2,y:6},{x:3,y:6},{x:4,y:6},{x:5,y:6},{x:6,y:6},
      ];
      break;
  }

  const plants = garden.plants;
  const crops = flarePlants
    .map(({target, primary, secondary}) => {
      return {
        target: plants[target],
        primary: plants[primary],
        secondary: plants[secondary],
      };
    })
    .find(({target, primary, secondary}) => {
      if (target.unlocked || garden.plot.find(a => a.find(p => p[0] === target.id + 1)))
        return false;
      return primary.unlocked && secondary.unlocked;
    });

    // complex plants
  if (crops.target.key === 'everdaisy' && farm.level >= 3) {
    switch (farm.level) {
      case 3:
        plantTiles.primary = [
          {x:2,y:2},{x:3,y:2},{x:4,y:2},
          {x:2,y:3},          {x:4,y:3},
        ];
        plantTiles.secondary = [{x:2,y:4},{x:3,y:4},{x:4,y:4}];
        harvestTiles = [{x:3,y:3}];
        break;
      case 4:
        plantTiles.primary = [
          {x:1,y:2},{x:2,y:2},{x:3,y:2},{x:4,y:2},
          {x:1,y:3},                    {x:4,y:3},
        ];
        plantTiles.secondary = [{x:1,y:4},{x:2,y:4},{x:3,y:4},{x:4,y:4}];
        harvestTiles = [{x:2,y:3},{x:3,y:3}];
        break;
      case 5:
        plantTiles.primary = [

          {x:1,y:2},                    {x:4,y:2},
          {x:1,y:3},{x:2,y:3},          {x:4,y:3},
          {x:1,y:4},
        ];
        plantTiles.secondary = [
          {x:1,y:1},{x:2,y:1},{x:3,y:1},{x:4,y:1},


          {x:2,y:4},{x:3,y:4},{x:4,y:4},
        ];
        harvestTiles = [{x:2,y:2},{x:3,y:2},{x:3,y:3}];
        break;
      case 6:
        plantTiles.primary = [
          {x:1,y:1},{x:2,y:1},         ,{x:4,y:1},{x:5,y:1},
          {x:1,y:2},                              {x:5,y:2},
          {x:1,y:3},                              {x:5,y:3},
          {x:1,y:4},{x:2,y:4},         ,{x:4,y:4},{x:5,y:4},
        ];
        plantTiles.secondary = [
          {x:3,y:1},
          {x:3,y:2},
          {x:3,y:3},
          {x:3,y:r},
        ];
        harvestTiles = [{x:2,y:2},{x:4,y:2},{x:2,y:3},{x:4,y:3}];
        break;
      case 7:
        plantTiles.primary = [
          {x:1,y:1},{x:2,y:1},{x:3,y:1},{x:4,y:1},{x:5,y:1},
          {x:1,y:2},                              {x:5,y:2},

          {x:1,y:4},                              {x:5,y:4},
          {x:1,y:5},{x:2,y:5},{x:3,y:5},{x:4,y:5},{x:5,y:5},
        ];
        plantTiles.secondary = [
          {x:1,y:3},{x:2,y:3},{x:3,y:3},{x:4,y:3},{x:5,y:3},
        ];
        harvestTiles = [
          {x:2,y:2},{x:3,y:2},{x:4,y:2},

          {x:2,y:4},{x:3,y:4},{x:4,y:4},
        ];
        break;
      case 8:
        plantTiles.primary = [
          {x:1,y:1},{x:2,y:1},{x:3,y:1},{x:4,y:1},{x:5,y:1},{x:6,y:1},
          {x:1,y:2},                                        {x:6,y:2},

          {x:1,y:4},                                        {x:6,y:4},
          {x:1,y:5},{x:2,y:5},{x:3,y:5},{x:4,y:5},{x:5,y:5},{x:6,y:5},
        ];
        plantTiles.secondary = [
          {x:1,y:3},{x:2,y:3},{x:3,y:3},{x:4,y:3},{x:5,y:3},{x:6,y:3},
        ];
        harvestTiles = [
          {x:2,y:2},{x:3,y:2},{x:4,y:2},{x:5,y:2},

          {x:2,y:4},{x:3,y:4},{x:4,y:4},{x:5,y:2},
        ];
        break;
      case 9:
        plantTiles.primary = [

          {x:1,y:2},          {x:3,y:2},{x:4,y:2},          {x:6,y:2},
          {x:1,y:3},          {x:3,y:3},                    {x:6,y:3},

          {x:1,y:5},                                        {x:6,y:5},
          {x:1,y:6},{x:2,y:6},{x:3,y:6},{x:4,y:6},{x:5,y:6},{x:6,y:6},
        ];
        plantTiles.secondary = [
          {x:1,y:1},{x:2,y:1},{x:3,y:1},{x:4,y:1},{x:5,y:1},{x:6,y:1},


          {x:1,y:4},{x:2,y:4},{x:3,y:4},{x:4,y:4},{x:5,y:4},{x:6,y:4},


        ];
        harvestTiles = [

          {x:2,y:2},                    {x:5,y:2},
          {x:2,y:3},          {x:4,y:3},{x:5,y:3},

          {x:2,y:5},{x:3,y:5},{x:4,y:5},{x:5,y:5},

        ];
        break;
    }
  } else if (crops.target.key === 'shriekbulb') {
    switch (farm.level) {
      case 1:
        plantTiles.primary = [{x:2,y:2},{x:3,y:2},{x:2,y:3}];
        harvestTiles = [{x:3,y:3}];
        break;
      case 2:
        plantTiles.primary = [
          {x:2,y:2},{x:3,y:2},{x:4,y:2},
                    {x:3,y:3},
        ];
        harvestTiles = [{x:2,y:3},{x:4,y:3}];
        break;
      case 3:
        plantTiles.primary = [
          {x:2,y:2},          {x:4,y:2},
                    {x:3,y:3},
          {x:2,y:4},          {x:4,y:4},
        ];
        harvestTiles = [
                    {x:3,y:2},
          {x:2,y:3},          {x:4,y:3},
                    {x:3,y:4},
        ];
        break;
      case 4:
        plantTiles.primary = [
          {x:1,y:1},                    {x:4,y:1},
                    {x:2,y:2},{x:3,y:2},
          {x:1,y:3},                    {x:4,y:3},
        ];
        harvestTiles = [
                    {x:2,y:1},{x:3,y:1},
          {x:1,y:2},                    {x:4,y:2},
                    {x:2,y:3},{x:3,y:3},
        ];
        break;
      case 5:
        plantTiles.primary = [
          {x:1,y:1},                    {x:4,y:1},
                    {x:2,y:2},{x:3,y:2},
                    {x:2,y:3},{x:3,y:3},
          {x:1,y:4},                    {x:4,y:4},
        ];
        harvestTiles = [
                    {x:2,y:1},{x:3,y:1},
          {x:1,y:2},                    {x:4,y:2},
          {x:1,y:3},                    {x:4,y:3},
                    {x:2,y:4},{x:3,y:4},
        ];
        break;
      case 6:
        plantTiles.primary = [
                    {x:2,y:1},          {x:4,y:1},
                                        {x:4,y:2},{x:5,y:2},
          {x:1,y:3},{x:2,y:3},
                    {x:2,y:4},          {x:4,y:4},
        ];
        harvestTiles = [
          {x:1,y:1},          {x:3,y:1},          {x:5,y:1},
          {x:1,y:2},{x:2,y:2},{x:3,y:2},
          {x:1,y:3},{x:2,y:3},
          {x:1,y:4},          {x:3,y:4},          {x:5,y:4},
        ];
        break;
      case 7:
        plantTiles.primary = [
                              {x:3,y:1},
          {x:1,y:2},          {x:3,y:2},          {x:5,y:2},

          {x:1,y:4},{x:2,y:4},          {x:4,y:4},{x:5,y:4},
                    {x:2,y:5},          {x:4,y:5},
        ];
        harvestTiles = [
          {x:1,y:1},{x:2,y:1},          {x:4,y:1},{x:5,y:1},
                    {x:2,y:2},          {x:4,y:2},
          {x:1,y:3},{x:2,y:3},{x:3,y:3},{x:4,y:3},{x:5,y:3},
                              {x:3,y:4},
          {x:1,y:5},          {x:3,y:5},          {x:5,y:5},
        ];
        break;
      case 8:
        plantTiles.primary = [
          {x:1,y:1},          {x:3,y:1},          {x:5,y:1},
                    {x:2,y:2},                    {x:5,y:2},
                    {x:2,y:3},                    {x:5,y:3},
                    {x:2,y:4},                    {x:5,y:4},
          {x:1,y:5},          {x:3,y:5},          {x:5,y:5},
        ];
        harvestTiles = [
                    {x:2,y:1},          {x:4,y:1},          {x:6,y:1},
          {x:1,y:2},          {x:3,y:2},{x:4,y:2},          {x:6,y:2},
          {x:1,y:3},          {x:3,y:3},{x:4,y:3},          {x:6,y:3},
          {x:1,y:4},          {x:3,y:4},{x:4,y:4},          {x:6,y:4},
                    {x:2,y:5},          {x:4,y:5},          {x:6,y:5},
        ];
        break;
      case 9:
        plantTiles.primary = [
          {x:1,y:1},          {x:3,y:1},          {x:5,y:1},
                    {x:2,y:2},                    {x:5,y:2},
                    {x:2,y:3},                    {x:5,y:3},
                    {x:2,y:4},                    {x:5,y:4},
                    {x:2,y:5},                    {x:5,y:5},
          {x:1,y:6},          {x:3,y:6},          {x:5,y:6},
        ];
        harvestTiles = [
                    {x:2,y:1},          {x:4,y:1},          {x:6,y:1},
          {x:1,y:2},          {x:3,y:2},{x:4,y:2},          {x:6,y:2},
          {x:1,y:3},          {x:3,y:3},{x:4,y:3},          {x:6,y:3},
          {x:1,y:4},          {x:3,y:4},{x:4,y:4},          {x:6,y:4},
          {x:1,y:5},          {x:3,y:5},{x:4,y:5},          {x:6,y:5},
                    {x:2,y:6},          {x:4,y:6},          {x:6,y:6},
        ];
        break;
    }
  }

  let acted = plantTiles.primary.find(({x,y}) => flarePlant(x,y,crops.primary, crops.target));
  if (!acted) acted = plantTiles.secondary.find(({x,y}) => flarePlant(x,y,crops.secondary, crops.target));
  if (!acted) acted = harvestTiles.find(({x,y}) => flareHarvest(x,y));

  return acted;
}

const flarePlant = (x, y, crop, target) => {
  const garden = game.Game.Objects['Farm'].minigame;

  // See line 1454 on the "crop.id + 1" thing :/
  const existingCropId = garden.getTile(x,y)[0] - 1;
  // Remove what is there already if necessary
  if (existingCropId >= 0) {
    const maxWait = existingCropId === crop.id;
    return flareHarvest(x,y,maxWait);
  }
  if (!crop.unlocked) return false; // We could be waiting for Meddleweed, which we can't plant right away
  const cropCost = garden.getCost(crop);
  if (flareHasBuff() || game.Game.cookies < cropCost) {
    flareNextPurchase = {
      name: crop.name,
      price: cropCost,
      delta: `Target: ${target.name}`,
      eta: (cropCost - game.Game.cookies) / flareGetRate(),
    };
    flareShouldSpendCookies = false;
    return false;
  }

  switch (flareSubStep) {
    case 0:
      flareLog(`Planting ${crop.name} in ${x},${y}`);
      crop.l.click();
      flareSubStep++;
      return true;
    case 1: garden.clickTile(x, y); flareSubStep = 0; return true;
  }
}

const flareHarvest = (x, y, maxWait) => {
  const garden = game.Game.Objects['Farm'].minigame;
  // See line 1454 on the "crop.id + 1" thing :/
  const tileCropId = garden.getTile(x,y)[0] - 1;
  const maturity = garden.getTile(x,y)[1];
  if (tileCropId >= 0) {
    const crop = garden.plantsById[tileCropId];
    let maturityMinimum = crop.mature;
    if (maxWait) {
      // let crumbspores pop
      maturityMinimum = crop.key === 'crumbspore' ? 100 : 100 - crop.ageTick;
    }
    if (!(flareNeedMature(crop) || maxWait) || maturity >= maturityMinimum) {
      // flareLog(`Harvesting ${crop.name} in ${x},${y}`);
      flareLog(`Harvesting ${crop.name}`);
      garden.clickTile(x, y);
      return true;
    }
  }
  return false;
}

const flareNeedMature = (crop) => {
  if (crop.key === 'meddleweed') {
    const plants = game.Game.Objects['Farm'].minigame.plants;
    return !(crop.unlocked && plants['brownMold'].unlocked && plants['crumbspore'].unlocked);
  } else return !crop.unlocked;
}

const flareAdjustStocks = () => {
  return false;
  const bank = game.Game.Objects['Bank'];
  if (!bank.minigameLoaded) return false;
  if (!bank.onMinigame) {
    bank.switchMinigame(1);
    return flareOneAction;
  }
}

const flareTrainDragon = () => {
  // Special menu at line 14977
  if (game.Game.Has('A crumbly egg')) {
    const dl = game.Game.dragonLevel;
    // Dragon Levels at line 14777
    if (dl < 5) {
      const mult = Math.pow(2, dl);
      const cost = 1000000 * mult;
      // If it's going to take more than 10 seconds to get the cost, don't wait
      const time = cost / flareGetRate();
      if (time > 10) return false;
      flareNextPurchase = {
        name: `Dragon Lvl ${dl+1}`,
        price: cost,
        delta: 'izza dragon! rawr!',
        eta: (cost - game.Game.cookies) / flareGetRate(),
      };
      flareShouldSpendCookies = false;
      if (game.Game.cookies >= cost) {
        flareLog("Upgrading Dragon!");
        game.Game.UpgradeDragon();
        return flareOneAction;
      }
      flareDashMessage += "Saving for dragon level";
    } else {
      let target;
      switch (dl) {
        case 5: target = 'Cursor'; break;
        case 6: target = 'Grandma'; break;
        case 7: target = 'Farm'; break;
        case 8: target = 'Mine'; break;
        case 9: target = 'Factory'; break;
        case 10: target = 'Bank'; break;
        case 11: target = 'Temple'; break;
        default: target = 'Cortex baker';
      }
      if (game.Game.Objects[target].amount >= 100) {
        game.Game.specialTab='dragon';
        game.Game.ToggleSpecialMenu(1);
        game.Game.UpgradeDragon();
        return flareOneAction;
      }
    }
    if (dl >= 5) {
      const bestAura = [
        {
          id: 1,
          delta: () => game.Game.cookiesPs * game.Game.milkProgress * 0.05,
          owned: () => game.Game.dragonLevel >= 5,
        }, {
          id: 2,
          delta: () => flareHz * game.Game.cookiesPs * .05,
          owned: () => game.Game.dragonLevel >= 6,
        }, {
          id: 3,
          delta: () => {
            const g = game.Game.Objects['Grandma'];
            const num = game.Game.BuildingsOwned - g.amount;
            return num * 0.01 * g.amount * g.storedTotalCps;
          },
          owned: () => game.Game.dragonLevel >= 7,
        }, {
          id: 4,
          delta: () => 0, // enables "Dragon Harvest" golden cookie... not sure if that's good yet
          owned: () => game.Game.dragonLevel >= 8,
        }, {
          id: 5,
          delta: () => 0, // Buildings sell for 50% instead of 25%, might be useful if double-casting
          owned: () => game.Game.dragonLevel >= 9,
        }, {
          id: 6,
          delta: () => 0, //flareUpgrades().price * 0.02, // Upgrades are 2% cheeper, but need to consider the cost to switch and how long you'll need to save for
          owned: () => game.Game.dragonLevel >= 10,
        }, {
          id: 7,
          delta: () => 0, //flareBuildings().price * 0.02, // Buildings are 2% cheeper, but need to consider the cost to switch and how long you'll need to save for
          owned: () => game.Game.dragonLevel >= 10,
        }, {
          id: 8,
          delta: () => game.Game.prestige * .01 * .05 * game.Game.cookiesPs, // 5% bonus to prestige
          owned: () => game.Game.dragonLevel >= 11,
        },
      ]
        .map(a => {
          if (!a.owned()) return null;
          const id = a.id;
          const d = a.delta();
          return { id, delta: d }
        })
        .filter(o => o)
        .sort((a, b) => b.delta - a.delta)[0]?.id;

      if (game.Game.dragonAura !== bestAura) {
        return flareSetDragonAura(bestAura, 0);
      }
    }
  }
  return false
}

const flareSetDragonAura = (id, slot) => {
  // Auras defined on line 14829
  // Cost to sacrifice is 1 of your highest building (line 14904)
  switch (flareSubStep) {
    case 0:
      game.Game.specialTab='dragon';
      game.Game.ToggleSpecialMenu(1);
      flareSubStep = 1;
      game.Game.SetDragonAura(id,slot); //aura, slot
      return true;
    case 1:
      gid('promptOption0').click();
      flareSubStep = 0;
      return flareOneAction;
  }
}


const flareShop = () => {
  if (!flareShouldSpendCookies) return false;

  const nextBuilding = flareBuildings();
  const nextUpgrade = flareUpgrades();
  if (nextUpgrade && nextUpgrade.ratio > nextBuilding?.ratio || 0) {
    flareNextPurchase = nextUpgrade;
    if (game.Game.cookies >= nextUpgrade.price) {
      flareShouldSpendCookies = false;
      flareLog(`Upgrading! ${nextUpgrade.name} - ${nextUpgrade.desc}`);
      game.Game.UpgradesById[nextUpgrade.id].click();
    }
  } else if(nextBuilding) {
    flareNextPurchase = nextBuilding;
    if (game.Game.cookies >= nextBuilding.price) {
      flareShouldSpendCookies = false;
      flareLog(`Buying building: ${nextBuilding.name}`);
      game.Game.Objects[nextBuilding.name].buy();
      return flareOneAction;
    }
  }
  return false;
}

const flareObjectsNoCursor = () => {
  let num = 0;
  for (const i in game.Game.Objects) num += game.Game.Objects[i].amount;
  return num - game.Game.Objects['Cursor'].amount;
}

const flareUpgrades = () => {
  return flareUpgradesList
    .map(({id, delta}) => {
      const u = game.Game.UpgradesById[id];
      if (!u.unlocked || u.bought) return null;
      const name = u.name;
      const desc = u.ddesc;
      const price = u.getPrice();
      const d = delta();
      const ratio = d/price;
      const eta = (price - game.Game.cookies) / flareGetRate();
      return {
        id,
        name,
        desc,
        price,
        delta: d,
        ratio,
        eta,
      };
    })
    .filter(d => d)
    .sort((a,b) => b.ratio - a.ratio)[0];
}

const flareGetRate = () => {
  return flareHz * game.Game.computedMouseCps + game.Game.cookiesPs;
}

const flareBuildings = () => {
  return flareBuildingsList
    .map(({id, delta}) => {
      const obj = game.Game.Objects[id];
      if (obj.locked) return null;
      const basicDelta = game.Game.globalCpsMult * obj.storedCps + flareCurrentFingersBase();
      const d = delta ? delta() : basicDelta;
      // For some reason this isn't necessary
      // const price = game.Game.modifyBuildingPrice(obj, obj.price);
      const price = obj.price;

      // If it's going to take < 2 seconds to save for it, just buy it - we might get upgrades sooner
      const timeCheck = price / flareGetRate();
      const buyCheep = !game.Game.Has('Get lucky') || !flareHasBuff();
      // const ratio = timeCheck <= 2 && buyCheep ? 1 / timeCheck : d/price;
      const ratio = timeCheck <= 2 && buyCheep ? .9 : d/price;

      const eta = (price - game.Game.cookies) / flareGetRate();
      return {
        name: id,
        price,
        delta: d,
        ratio,
        eta,
      };
    })
    .filter(b => b)
    .sort((a,b) => b.ratio - a.ratio)[0];
}

const kickoff = () => {
  flareLog('Initiating Feature Laden Automated Resource Engine (F.L.A.R.E.)');
  if (gid('langSelect-EN')) {
    console.log("selecting English");
    gid('langSelect-EN').click();
  }
  game.Game.OpenSesame();
  setTimeout(() => flareKillable = setInterval(flareOp, flareDelay),1000)
};

const resetGame = () => {
  clearTimeout(flareKillable);
  game.Game.HardReset(2);
  // Clear persistent data
  flareMessages = [];
  flareWonAchievements = [];
  flareChat.forEach(c => c.fired = false);
  setTimeout(kickoff, 2000);
};

const flareDrawOutput = () => {
  flareCheckTalk();
  document.getElementById("flareRandomDiv").innerHTML = flareDashMessage;
  const f = (n) => n ? n.toLocaleString('en-US', {maximumFractionDigits:2}) : '';
  document.getElementById("flareDynamicOutput").innerHTML = `
<div>
  Clicking CPS: ${f(Math.round(flareHz * game.Game.computedMouseCps))}<br/>
  Next: ${flareNextPurchase?.name}<br/>
  Cost: ${f(flareNextPurchase?.price)}<br/>
  Delta: ${f(flareNextPurchase?.delta)}<br/>
  ETA: ${f(flareNextPurchase?.eta)}<br/>
  </div>
  `;
}

const flareCheckTalk = () => {
  flareChat.forEach(chat => {
    if (!chat.fired && chat.criteria()) {
      chat.fired = true;
      flareLog(chat.message);
    }
  });
  for (var i in game.Game.AchievementsById) {
    const a = game.Game.AchievementsById[i];
    if (a.won && !flareWonAchievements.includes(i)) {
      flareWonAchievements.push(i);
      let message = `Achievement won: ${a.dname}`;
      if (a.ddesc) message += ` - ${a.ddesc}`;
      flareLog(message);
      game.Game.CloseNotes();
    }
  }
  const c = gid('cookies').getBoundingClientRect();
  // document.getElementById("flareOutputContainer").style.top = `${Math.ceil(c.y + c.height)}px`;
  document.getElementById("flareOutputContainer").style.width = `${gid("sectionLeft").offsetWidth}px`;
}

const flareLog = (message) => {
  if (!message) return;
  const lastIndex = flareMessages.length - 1;
  if (lastIndex > 0 && message === flareMessages[lastIndex].message) flareMessages[lastIndex].qty++;
  else flareMessages.push({ message, qty: 1 });
  let messages = '';
  flareMessages
    .slice(Math.max(flareMessages.length - 100, 0))
    .forEach((m, i) => {
      let mess = m.message;
      if (m.qty > 1) mess += ` (x${m.qty})`;
      mess = mess.replace(/Error/g, '<span class="flareError">Error</span>');
      mess = mess.replace(/Swapping God/g, '<span class="flareGod">Swapping God</span>');
      mess = mess.replace(/Harvesting/g, '<span class="flareHarvesting">Harvesting</span>');
      mess = mess.replace(/Planting/g, '<span class="flarePlanting">Planting</span>');
      mess = mess.replace(/Building Available/g, '<span class="flareNewBuilding">Building Available</span>');
      mess = mess.replace(/Activating Minigame/g, '<span class="flareMinigame">Activating Minigame</span>');
      mess = mess.replace(/Upgrading!/g, '<span class="flareUpgrading">Upgrading!</span>');
      mess = mess.replace(/Buying building/g, '<span class="flareBuyBuilding">Buying building</span>');
      mess = mess.replace(/Achievement won/g, '<span class="flareAchievement">Achievement won</span>');
      mess = mess.replace(/Clicking Golden Cookie/g, '<span class="flareGoldenCookie">Clicking Golden Cookie</span>');

      if (i === Math.min(flareMessages.length, 100) - 1) {
        mess = `(new)&nbsp;${mess}`;
      }
      messages += `<div>${mess}</div>`;
    });
  document.getElementById('flareOutput').innerHTML = messages;
  document.getElementById("flareOutput").scrollTop = document.getElementById("flareOutput").scrollHeight;
  console.log(`${game.Game.T}- ${message}`);
};

const startFlare = () => {
  console.log('startFlare');
  // Let the game call our init once its ready
  setTimeout(() => {
    game = window.frames[0];
    if (!game.Game) {
      startFlare();
      return false;
    }
    game.Game.registerMod('F.L.A.R.E. AI', {
      init:function(){
        console.log('init');
        kickoff();
      },
      save:function(){
        sessionStorage.setItem('flareMessages', JSON.stringify(flareMessages));
        sessionStorage.setItem('flareWonAchievements', JSON.stringify(flareWonAchievements));
        sessionStorage.setItem('flareChat', JSON.stringify(flareChat.map(c => c.fired)));
        return "saved it mahself";
      },
      load:function(str){
        flareMessages = JSON.parse(sessionStorage.getItem('flareMessages'));
        flareWonAchievements = JSON.parse(sessionStorage.getItem('flareWonAchievements'));
        JSON.parse(sessionStorage.getItem('flareChat')).forEach((c, i) => flareChat[i].fired = c);
        flareLog("Loaded!");
      },
    });
  }, 1000);
}

// Functions basically lifted from main game
const flareCurrentFingersBase = () => {
  // This code snagged from Line 4677
  var add=0;
  if (game.Game.Has('Thousand fingers')) add+=		0.1;
  if (game.Game.Has('Million fingers')) add*=		5;
  if (game.Game.Has('Billion fingers')) add*=		10;
  if (game.Game.Has('Trillion fingers')) add*=		20;
  if (game.Game.Has('Quadrillion fingers')) add*=	20;
  if (game.Game.Has('Quintillion fingers')) add*=	20;
  if (game.Game.Has('Sextillion fingers')) add*=	20;
  if (game.Game.Has('Septillion fingers')) add*=	20;
  if (game.Game.Has('Octillion fingers')) add*=	20;
  if (game.Game.Has('Nonillion fingers')) add*=	20;
  if (game.Game.Has('Decillion fingers')) add*=	20;
  if (game.Game.Has('Undecillion fingers')) add*=	20;
  if (game.Game.Has('Unshackled cursors')) add*=	25;

  return add * (flareHz + game.Game.Objects['Cursor'].amount);
}

const flareCurrentFingers = () => {
  return flareCurrentFingersBase() * flareObjectsNoCursor();
};
