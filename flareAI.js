// consider this for strats
// https://www.reddit.com/r/CookieClicker/comments/xmrhwn/build_for_trillion_heavenly_chips_what_can_i/
let game;
let flareKillable;
let flareHz = 30;
let flareDelay = 1000/flareHz;
let flareOneAction = true;
let flareAscending = 0;
let flareSubStep = 0;
let flareWonAchievements = [];
let flareNextPurchase;
let flareRepurchase;
// If we spend cookies or need to save, set to false
let flareShouldSpendCookies = true;
let flareMessages = [];
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
  if (Object.keys(game.Game.buffs).length) return false;

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
  return [
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
      // console.log(JSON.stringify(game.Game.textParticles));
      topGolden.l.click();
      // const message = game.Game.textParticles.findLast(t => t.life !== -1).text;
      const message = game.Game.textParticles
        .filter(t => t.life >= 0)
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
    current.setUTCHours(20, 00);
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
  return false;
  const farm = game.Game.Objects['Farm'];
  if (!farm.minigameLoaded) return false;

  const garden = farm.minigame;
  const plants = garden.plants.filter(p=>p.unlocked);
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
  return [
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

    { // 2x Idleverse for 120sex c
      id: 684,
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
    { // Cookie Production Multiplier 4% for 1sep c (Caramel)
      id: 352,
      delta: () => flareGetRate() * .04,
    },
    { // Cookie Production Multiplier 4% for 5sep c (Pecan Sandies)
      id: 403,
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
      delta: () => 777777777 / flareGetRate() > 600 ? 0 : 777777777,
    },
    { // Golden cookie rate increase 2x 77.7b c (worth waiting 10 min for)
      id: 53,
      delta: () => 77777777777 / flareGetRate() > 600 ? 0 : 77777777777,
    },
    { // Golden cookie last 2x longer 77.7t c (worth waiting 20 min for)
      id: 86,
      delta: () => 77777777777777 / flareGetRate() > 1200 ? 0 : 77777777777777,
    },

    // Ascension
    { // Unlocks 5% of the potential of your prestiege level 11c
      id: 129,
      delta: () => game.Game.prestige * .01 * .05 * game.Game.cookiesPs,
    },
    { // Unlocks 25% of the potential of your prestiege level 1111c
      id: 130,
      delta: () => game.Game.prestige * .01 * .20 * game.Game.cookiesPs, //jump is from 5 to 25
    },
    { // Unlocks 50% of the potential of your prestiege level 111111c
      id: 131,
      delta: () => game.Game.prestige * .01 * .25 * game.Game.cookiesPs, //jump is from 25 to 50
    },
    { // Unlocks 75% of the potential of your prestiege level 11.11m c
      id: 132,
      delta: () => game.Game.prestige * .01 * .25 * game.Game.cookiesPs, //jump is from 50 to 75
    },
    { // Unlocks 100% of the potential of your prestiege level 1.11b c
      id: 133,
      delta: () => game.Game.prestige * .01 * .25 * game.Game.cookiesPs, //jump is from 75 to 100
    },
    { // Cookie production Multipler 1% 100c
      id: 589,
      delta: () => flareGetRate() * .01, // I think...
    },
    { // Dragon Egg 25c
      id: 324,
      delta: () => 25,
    },

    //Eggs?
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
      delta: () => game.Game.UpgradesById[221].getPrice(), // just say it's always worth it for now
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
  ]
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
  return [
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
  ]
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
      const buyCheep = !game.Game.Has('Get lucky') || !Object.keys(game.Game.buffs).length;
      const ratio = timeCheck <= 2 && buyCheep ? 1 / timeCheck : d/price;

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
  game = window.frames[0];
  flareLog('Initiating Feature Laden Automated Resource Engine (F.L.A.R.E.)');
  setTimeout(() => flareKillable = setInterval(flareOp, flareDelay),1000)
};

const resetGame = () => {
  game = window.frames[0];
  clearTimeout(flareKillable);
  setTimeout(() => {
    //game.Game.HardReset(2);
    game.Game.OpenSesame();
    if (gid('langSelect-EN')) {
      console.log("selecting English");
      gid('langSelect-EN').click();
    }
    kickoff()
  }, 2000);
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
    message: 'Building Available: Not sure what this is.',
  }, {
    resetOnAscension: true,
    criteria: () => !game.Game.Objects['Cortex baker'].locked,
    fired: false,
    message: 'Building Available: Not sure what this is.',
  },
];

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
  document.getElementById("flareOutputContainer").style.top = `${Math.ceil(c.y + c.height)}px`;
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
    mess = mess.replace(/Error/g, `<span style="color:red">Error</span>`);
    mess = mess.replace(/Swapping God/g, `<span style="color:purple">Swapping God</span>`);
    mess = mess.replace(/Building Available/g, `<span style="color:green">Building Available</span>`);
    mess = mess.replace(/Activating Minigame/g, `<span style="color:green">Activating Minigame</span>`);
    mess = mess.replace(/Upgrading!/g, `<span style="color:blue">Upgrading!</span>`);
    mess = mess.replace(/Buying building/g, `<span style="color:orange">Buying building</span>`);
    mess = mess.replace(/Achievement won/g, `<span style="color:gold">Achievement won</span>`);
    mess = mess.replace(/Clicking Golden Cookie/g, `<span style="color:gold;font-weight:bold">Clicking Golden Cookie</span>`);

      if (i > 0) {
        messages += '<br/>';
      }
      if (i < flareMessages.length - 1) {
        messages += '&nbsp;';
      } else {
          messages += '(new)&nbsp;';
      }
      messages += mess;
  });
  document.getElementById('flareOutput').innerHTML = messages;
  document.getElementById("flareOutput").scrollTop = document.getElementById("flareOutput").scrollHeight;
  console.log(`${game.Game.T}- ${message}`);
};

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
