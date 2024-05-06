// consider this for strats
// https://www.reddit.com/r/CookieClicker/comments/xmrhwn/build_for_trillion_heavenly_chips_what_can_i/
let game;
let flareKillable;
let flareTick;
let flareDelay = 1000/flareHz;
let flareOneAction = true;
let flareMultiStep;
let flareTallestCookie = 0;
let flareLongestWait = 0;
let flareMessages = [[], [], []];
let flareLogs = [];
let flareWonAchievements = [];
let flareNextPurchase;
// If we spend cookies or need to save, set to false
let flareShouldSpendCookies = true;
let flareDashMessage = "";
let gid = (n) => game.document.getElementById(n);

// Line 2713 shows a lot of the variables in the game
// Line 7683 shows the Game.Objects definition
// Line 9932 upgrades defined

const flareOp = () => {
  flareTick++;
  flareDashMessage = "";
  if (flareMultiStep) {
    flareMultiStep();
  } else {
    flareShouldSpendCookies = true;
    [
      flareAscend,
      flareClickShimmer,
      flareClickFortune,
      flareSpendLumps,
      flareManageSeasons,
      flareCastSpells,
      flarePlayWithGods,
      flareTendGarden,
      flareAdjustStocks,
      flareTrainDragon,
      flareShop,
      flareAchievementHunt,
      flareHandleGrandmapocalypse,
      flareClickCookie,
    ].find(f => f());
  }
  flareDrawOutput();
};

const flareAscend = () => {
  //Don't ascend if you have two or more active buffs; milk it
  if (flareGoodBuffs().length > 1) return false;

  if (game.Game.cookiesEarned >= flareAscensionGoal()) {
    if (flareGardenCheck()) return false;
    flareLog('Ascending!');
    game.Game.Ascend(1);
    flareMultiStep = () => {// Wait for UI to show up, then apply Heavenly Chips
      if (!gid('heavenlyUpgrade363')) return false;
      // 264-268 are Permanent Upgrade, skip during this step
      const nextUp = flareNextChipBatch().upgrades.find(u => ![264,265,266,267,268].includes(u.id) && !u.bought);

      if (nextUp && nextUp.basePrice <= game.Game.heavenlyChips) {
        flareLog(`Unlocking: ${nextUp.name}`);
        game.Game.UpgradesById[nextUp.id].click();
        return true;
      }
      flareMultiStep = () => {// Set Permanent Upgrades
        flareSetPermanentUpgrades(() => {// Set Ascend mode
          game.Game.nextAscensionMode = 0;
          //game.Game.nextAscensionMode = 1; // Born again grants access to some achievements, See Line 16328
          flareMultiStep = () => {// Lets-a-go
            game.Game.Reincarnate(1);
            flareMultiStep = () => {// UI restored
              if (!gid('product19') || !gid('product19').classList.contains('toggledOff')) return false
              flareChat.forEach(c => {
                if (c.resetOnAscension) c.fired = false;
              });
              flareLongestWait = 0;
              flareMultiStep = undefined;
            };
          };
        });
      };
    };
    return true;
  }
  return false;
}

const flareAscensionGoal = () => {
  // See Line 16542
  const nextBatch = flareNextChipBatch();
  const moreChips = nextBatch.batchCost - game.Game.heavenlyChips;
  // Can't use game.Game.prestige - it can be off... somehow
  const totalChips = Math.ceil(game.Game.HowMuchPrestige(game.Game.cookiesReset)) + moreChips;
  let moreCookies = 0;
  let i = 0;
  do {
    // HowManyCookiesReset doesn't always return a new number - add a buffer until it does
    moreCookies = game.Game.HowManyCookiesReset(1 + totalChips + i) - game.Game.cookiesReset;
    i = totalChips - Math.floor(game.Game.HowMuchPrestige(game.Game.cookiesReset + moreCookies));
  } while (i > 0);
  return moreCookies
}

const flareNextChipBatch = () => {
  const left = flareAscensionList
    .map(batch => {
      const upgrades = batch
        .map(id => game.Game.UpgradesById[id])
        .filter(u => !u.bought);
      if (!upgrades.length) return null;

      const batchCost = Math.ceil(upgrades.reduce((total, u) => total += u.basePrice,0));
      return {
        upgrades,
        batchCost,
      }
    })
    .filter(b=>b);

  const batch = left.length ? left[0] : { upgrades: [], batchCost: 0 };
  const extra = game.Game.heavenlyChips - batch.batchCost;
  // if these are available, affordable, and un-purchased, put them at the top of the list
  [411, 412, 413].forEach(id => {
    const upgrade = game.Game.UpgradesById[id];
    if (upgrade.canBePurchased && !upgrade.bought && upgrade.basePrice < extra) {
      batch.upgrades.unshift(upgrade);
      batch.batchCost += upgrade.basePrice;
    }
  });

  if (!batch.upgrades.length) {
    batch.batchCost = Math.floor(game.Game.HowMuchPrestige(game.Game.cookiesReset)) * 10;
    // Nothing left to buy... or is there
    if (!game.Game.Has('Lucky payout')) {
      let cur = game.Game.prestige;
      // Make a new number where the most significant numbers are the same, but 12 are 7
      const sig = cur.toString().length - 12;
      let goal = cur.toString().split('').reduce((a,e,i) => a + (i > sig ? '7' : e), '') * 1;
      if (cur > goal) { // ugh, current prestige is actually higher than our "goal", bump up those numbers
        const bump = 1000000000000;
        while (cur > goal) goal += bump;
      }
      batch.batchCost = goal - cur;
    }
  }
  return batch;
}

const flareSetPermanentUpgrades = (next) => {
  const reset = flareGrandmas
    .map(id => game.Game.UpgradesById[id])
    .filter(o => o.bought)
    .sort((a,b) => a.getPrice() - b.getPrice());

  const upgrades = flareBestUpgrades
    .map(id => game.Game.UpgradesById[id])
    .filter(o => o.bought)
    .sort((a,b) => a.getPrice() - b.getPrice());

  const v = game.Game.UpgradesById[268];
  const iv = game.Game.UpgradesById[267];
  const iii = game.Game.UpgradesById[266];
  const ii = game.Game.UpgradesById[265];
  const i = game.Game.UpgradesById[264];

  flareSetPermanentSlot(v, reset,
    () => flareSetPermanentSlot(iv, reset,
      () => flareSetPermanentSlot(iii, reset,
        () => flareSetPermanentSlot(ii, reset,
          () => flareSetPermanentSlot(i, reset,
            () => flareSetPermanentSlot(v, upgrades,
              () => flareSetPermanentSlot(iv, upgrades,
                () => flareSetPermanentSlot(iii, upgrades,
                  () => flareSetPermanentSlot(ii, upgrades,
                    () => flareSetPermanentSlot(i, upgrades, next)
                  )
                )
              )
            )
          )
        )
      )
    )
  );
}

const flareSetPermanentSlot = (slot, upgrades, next) => {
  if (slot.bought || (slot.canBePurchased && slot.basePrice <= game.Game.heavenlyChips)) {
    if (!slot.bought) flareLog(`Unlocking: ${slot.name}`);
    flareMultiStep = () => {
      const slotGid = `heavenlyUpgrade${slot.id}`;
      if(!gid(slotGid)) return false;
      gid(slotGid).click();
      flareMultiStep = () => {
        const upgrade = upgrades.length && upgrades.pop();
        if (upgrade) {
          const upgradeGid = `upgradeForPermanent${upgrade.id}`;
          if(!gid(upgradeGid)) return false;
          gid(upgradeGid).click();
          flareMultiStep = () => { // Click Confirm
            gid('promptOption0').click();
            flareMultiStep = next;
          };
        } else {
          flareMultiStep = () => { // Click Cancel
            gid('promptOption1').click();
            flareMultiStep = next;
          };
        }
      };
      return true;
    }
    return true;
  }
  flareMultiStep = next; // we don't have this slot :/
}

const flareClickShimmer = () => {
  if (game.Game.shimmers.length) {
    const clickWrath = game.Game.elderWrath > 0;
    const topGolden = game.Game.shimmers.find(s => clickWrath || !s.wrath);
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
      const type = topGolden.wrath ? 'Wrath' : topGolden.type === 'reindeer' ? 'Reindeer' : 'Golden';
      flareLog(`Clicking ${type} Cookie - ${message}`);
      return flareOneAction;
    }
  }
}

const flareClickFortune = () => {
  if (gid("commentsText1").querySelector('.fortune')) {
    flareLog('Clicking fortune!');
    gid("commentsText1").click();
    return flareOneAction;
  }
  return false;
}

const flareManageSeasons = () => {
  const holidayWaitSeconds = 30;
  if (!game.Game.HasUnlocked('Season switcher')) return false;

  const flareSeasonPhases = [
    {
      done: () => game.Game.Has('Santa\'s dominion') && game.Game.unbuffedCps >= 1.0e+21,
      name: 'Christmas',
      id: 182,
      delta: 'Holly Jolly',
      extra: () => {
        const santaLvl = game.Game.santaLevel+1;
        const santaCost = Math.pow(santaLvl, santaLvl);
        if (santaLvl < 15 && game.Game.cookies >= santaCost) {
          flareShouldSpendCookies = false;
          game.Game.UpgradeSanta();
          return flareOneAction;
        }
      },
    },{
      done: () => game.Game.GetHowManyHeartDrops() === 7,
      name: 'Valentines',
      id: 184,
      delta: '<3',
    },{
      done: () => game.Game.GetHowManyEggs() === 20,
      name: 'Easter',
      id: 209,
      delta: 'Wascally Wabbits',
    },{
      done: () => game.Game.GetHowManyHalloweenDrops() === 7,
      name: 'Halloween',
      id: 183,
      delta: 'Spooky Scary Skeletons',
    },{
      done: () => false,
      name: 'Christmas',
      id: 182,
      delta: 'Back for Reindeer cookies',
    },
  ];
  const next = flareSeasonPhases.find(s=>!s.done());
  if (next) {
    if (game.Game.season !== next.name.toLowerCase()) {
      const cost = game.Game.UpgradesById[next.id].priceFunc();
      if (game.Game.cookies >= cost) {
        flareLog(`Changing Season to ${next.name}`);
        flareShouldSpendCookies = false;
        game.Game.UpgradesById[next.id].click();
        return flareOneAction;
      } else {
        const eta = (cost - game.Game.cookies) / flareGetRate();
        if (eta <= holidayWaitSeconds) {
          flareNextPurchase = {
            name: `Waiting for ${next.name}!`,
            price: cost,
            delta: next.delta,
            eta,
          };
          flareShouldSpendCookies = false;
        }
        return false;
      }
    } else if (next.extra) return next.extra();
  }
  return false;
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
      // Skip the bank for now, use that lump on the farm upgrades
      // 'Bank', // 4th Stock Market
    ]
      .map(n => game.Game.Objects[n])
      .find(obj => obj.level === 0);
    if (nextMinigame) {
      if (nextMinigame.amount) {
        if (game.Game.lumpsTotal === 1) { // our first lump!
          flareLog('Hiding unnecessary buildings');
          game.Game.ObjectsById.forEach(o => o.mute(1));
        }
        nextMinigame.mute(0);
        flareLog(`Activating Minigame: ${nextMinigame.minigameName}`);
        nextMinigame.levelUp();
        nextMinigame.switchMinigame(1);
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
  const grimoire = tower.minigame;
  const spell = grimoire.spells['hand of fate'];
  if (grimoire.magicM >= 100) {
    if (grimoire.magic >= 100) {
      if (flareCastableBuffs().length) {
        tower.switchMinigame(1);
        flareLog('Casting "Force the Hand of Fate"');
        grimoire.castSpell(spell);
        flareMultiStep = () => {
          if(grimoire.magic >= 100) return false; // it may take a few frames to update
          flareClickShimmer(); // click the cookie
          flareMultiStep = () => {
            if (flareGoodBuffs().length >= 2) {
              tower.sell(tower.amount - 21);
              flareMultiStep = () => {
                if(grimoire.magic > 23) return false; // it may take a few frames to update
                flareLog('Casting "Force the Hand of Fate"');
                grimoire.castSpell(spell);
                flareMultiStep = () => {
                  if(grimoire.magic > 1) return false; // it may take a few frames to update
                  tower.sell(21); // reset magic meter
                  flareMultiStep = () => {
                    if(tower.amount > 0) tower.sell(); // just in case
                    flareMultiStep = undefined;
                  }
                }
              }
            } else flareMultiStep = undefined;
          }
        }
        return true;
      }
    }
  } else if (flareBoostBuffs()) {
    // Magic is full and spell isn't too expensive
    // Need 21 towers to cast Hand of Fate
    // 517 towers gets 100 magic
    if (grimoire.magic === grimoire.magicM && grimoire.magic > grimoire.getSpellCost(spell)) {
      flareLog('Casting "Force the Hand of Fate"');
      tower.switchMinigame(1);
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

    let zero;
    if (game.Game.lumpT + game.Game.lumpRipeAge <= Date.now() + (2*60*60*1000)) {
      zero = 'order';
    } else if (flareNextChipBatch().batchCost > 10000000000) { // 9th ascension?
      zero = 'ruin';
    }

    if (zero) {
      gods = gods.sort((a,b) => a.slot - b.slot);
      gods[0].name = zero;
    }

    if (gods.find(({name, slot}) => flareMoveGod(mg.gods[name], slot))) return true;
  }

  if (mg.slot[0] === 2) {
    const buffs = Object.keys(game.Game.buffs);
    if (
      buffs.includes('Devastation')
      || buffs.includes('Cookie storm')
      || flareGoodBuffs().length < 2
    ) return false;
    // https://cookieclicker.wiki.gg/wiki/Pantheon#Godzamok_101
    const sellable = ['Antimatter condenser', 'Portal', 'Alchemy lab', 'Shipment', 'Bank', 'Factory', 'Mine', 'Farm'];

    const flareRepurchase = sellable
      .map(n => {
        const obj = game.Game.Objects[n];
        if (obj.amount < 500) return null;
        return {
          name: obj.name,
          sold: obj.amount,
          obj,
          bought: 0,
          wasSold: false,
        };
      })
      .filter(o => o);
    if (!flareRepurchase.length) return false;
    game.Game.storeBulkButton(1); // Set to sell
    flareMultiStep = () => { // Set to All to sell fastest
      game.Game.storeBulkButton(5);
      flareMultiStep = () => { // Sell each building type
        const toSell = flareRepurchase.find(o => !o.wasSold);
        if (toSell) {
          flareLog(`Selling building: ${toSell.name}`, toSell.sold);
          toSell.obj.sell(-1);
          toSell.wasSold = true;
          return true;
        }
        flareMultiStep = () => { // Set to Buy
          game.Game.storeBulkButton(0);
          flareMultiStep = () => { // Set button to 100's
            game.Game.storeBulkButton(4);
            flareMultiStep = () => { // Buy back anything in the 100-range
              const toBuyAt100 = flareRepurchase
                .filter(o => o.sold - o.bought > 100);
              if (toBuyAt100.length) {
                const buying = toBuyAt100[0];
                const before = buying.obj.amount;
                buying.obj.buy();
                const qty = buying.obj.amount - before;
                if (qty !== 100) buying.bought = buying.sold; // We can't afford more
                else buying.bought+=100;
                if (qty > 0) flareLog(`Buying building: ${buying.name}`, qty);
                return true;
              }
              flareMultiStep = undefined;
            }
          }
        }
      }
    }
  }
}

const flareMoveGod = (from, to) => {
  const temple = game.Game.Objects['Temple'];
  const mg = temple.minigame;
  if (mg.slot[to] === from.id) return false; // That god is already in that slot

  flareLog(`Swapping God ${from.name} to ${flareSlotNames[to]} Slot`);
  temple.switchMinigame(1);
  mg.dragGod(from);
  flareMultiStep = () => {
    mg.hoverSlot(to);
    flareMultiStep = () => {
      mg.dropGod();
      flareMultiStep = undefined;
    }
  }
  return true;
}

const flareGoodBuffs = () => {
  let good = flareCastableBuffs();
  const keys = Object.keys(game.Game.buffs);
  if (keys.length > good.length) {
    good = good.concat(keys.filter(b => flareOtherBuffs.includes(b)));
  }
  return good;
}

const flareCastableBuffs = () => {
  let good = [];
  let count = 0;
  const buffs = Object.keys(game.Game.buffs);
  const gcbs = game.Game.goldenCookieBuildingBuffs;
  if (buffs.length === 0) return good;
  for (b in gcbs) {
    if (buffs.includes(gcbs[b][0])) good.push(gcbs[b][0]);
  }
  if (buffs.includes('Elder frenzy')) good.push('Elder frenzy');
  return good;
}

// If there's a buff, and we're full on magic, summon another cookie!
const flareBoostBuffs = () => {
  const buffs = flareGoodBuffs();
  if (buffs.length) {
    const buff = game.Game.buffs[buffs[0]];
    return buffs.length > 1 || buff.time > buff.maxTime * .9;
  }
  return false;
}

// I think the goal of this game is going to be unlocking all the plants
const flareTendGarden = () => {
  const farm = game.Game.Objects['Farm'];
  if (!farm.amount || !farm.minigameLoaded) return false;
  farm.switchMinigame(1);

  const garden = farm.minigame;
  const plants = garden.plants;

  const crops = flarePlants
    .map(({target, primary, secondary, soil, layout = 'standard'}) => {
      return {
        target: plants[target],
        primary: plants[primary],
        secondary: plants[secondary],
        soil,
        layout,
      };
    })
    .find(({target, primary, secondary}) => {
      // If we don't have meddleweed, return it
      if (!plants['meddleweed'].unlocked && target.key === 'meddleweed') return true;
      if (target.unlocked || garden.plot.find(a => a.find(p => p[0] === target.id + 1)))
        return false;
      return primary.unlocked && secondary.unlocked;
    });

  if (Date.now() > garden.nextSoil) {
    const soils = ['fertilizer', 'dirt'];
    if (!flareGardenCheck() && crops.soil) soils.unshift(crops.soil);
    const soil = soils
      .map(n => garden.soils[n])
      .find(s => farm.amount >= s.req)
    if (garden.soil !== soil.id) {
      flareLog(`Swapping Garden soil to ${soil.name}`);
      gid(`gardenSoil-${soil.id}`).click();
      return true;
    }
  }
  flareDashMessage += `Target: ${crops.target.key}`;

  const plantTiles = flareGardenTiles[crops.layout][farm.level - 1];

  let acted = plantTiles.primary.find(({x,y}) => flarePlant(x,y,crops.primary, crops.target));
  if (!acted && plantTiles.secondary)
    acted = plantTiles.secondary.find(({x,y}) => flarePlant(x,y,crops.secondary, crops.target));
  if (!acted)
    acted = plantTiles.harvest.find(({x,y}) => flareHarvest(x,y));

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
  if (flareGoodBuffs().length || game.Game.cookies < cropCost) {
    const eta = flareGetETA(cropCost);
    if (eta <= flareLongestWait) {
      flareNextPurchase = {
        name: crop.name,
        price: cropCost,
        delta: `Target: ${target.name}`,
        eta: flareGoodBuffs().length ? 'waiting on buff' : eta,
      };
      flareShouldSpendCookies = false;
    }
    return false;
  }
  flareLog(`Planting ${crop.name} in ${x},${y}`);
  crop.l.click();
  flareMultiStep = () => {
    garden.clickTile(x, y);
    flareMultiStep = undefined;
  }
  return true;
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
      maturityMinimum = crop.key === 'crumbspore' ? 100 : 95 - crop.ageTick - crop.ageTickR;
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

const flareGardenCheck = () => {
  const farm = game.Game.Objects['Farm'];
  if (!farm.amount ||!farm.minigameLoaded) return false;
  const garden = game.Game.Objects['Farm'].minigame;
  const layout = flareGardenTiles['standard'][farm.level - 1];
  const allTiles = layout.primary.concat(layout.secondary || [], layout.harvest);
  return allTiles.find(({x,y}) => {
    const tileCropId = garden.getTile(x,y)[0];
    return tileCropId && !garden.plantsById[tileCropId - 1].unlocked;
  });
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
      if (time > 1) return false;
      flareNextPurchase = {
        name: `Dragon Lvl ${dl+1}`,
        price: cost,
        delta: 'izza dragon! rawr!',
        eta: (cost - game.Game.cookies) / flareGetRate(),
      };
      flareShouldSpendCookies = false;
      if (game.Game.cookies >= cost) {
        flareLog(`Upgrading Dragon! (goodbye ${cost} cookies)`);
        game.Game.UpgradeDragon();
        return flareOneAction;
      }
    } else if (dl <= 24) {
        let target;
        let qty = 100;
        switch (dl) {
          case 5: target = 'Cursor'; break;
          case 6: target = 'Grandma'; break;
          case 7: target = 'Farm'; break;
          case 8: target = 'Mine'; break;
          case 9: target = 'Factory'; break;
          case 10: target = 'Bank'; break;
          case 11: target = 'Temple'; break;
          case 12: target = 'Wizard tower'; qty = 200; break;
          case 13: target = 'Shipment'; break;
          case 14: target = 'Alchemy lab'; break;
          case 15: target = 'Portal'; break;
          case 16: target = 'Time machine'; break;
          case 17: target = 'Antimatter condenser'; break;
          case 18: target = 'Prism'; break;
          case 19: target = 'Chancemaker'; break;
          case 20: target = 'Fractal engine'; break;
          case 21: target = 'Javascript console'; break;
          case 22: target = 'Idleverse'; break;
          case 23: target = 'Cortex baker'; break;
          case 24: target = 'You'; break;
            // case 25: 50 of all buildings
            // case 26: 200 of all buildings
        }
        if (target && game.Game.Objects[target].amount >= qty) {
          flareLog(`Upgrading Dragon! (goodbye 100 ${target})`);
          game.Game.specialTab='dragon';
          game.Game.ToggleSpecialMenu(1);
          game.Game.UpgradeDragon();
          flareMultiStep = () => {
            game.Game.storeBulkButton(4);
            flareMultiStep = () => {
              game.Game.Objects[target].buy();
              flareMultiStep = () => {
                flareLog(`Buying building: ${target}`, game.Game.Objects[target].amount);
                game.Game.storeBulkButton(2);
                flareMultiStep = undefined;
              }
            }
          }
          return true;
        }
    } else if (dl <= 26 && game.Game.Objects['You'].amount > 200) {
      // Only worth doing the 50 if we can also do the 200
      let qty = dl === 25 ? 50 : 200;
      flareLog(`Upgrading Dragon! (goodbye ${qty} EVERYTHINGS)`);
      game.Game.specialTab='dragon';
      game.Game.ToggleSpecialMenu(1);
      game.Game.UpgradeDragon();
    }

    if (dl >= 5) {
      // Line 14798 for auras
      const bestAuras = [
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
            // for some reason, grandmas.storedTotalChips shoots up during Cursed finger...
            if (!game.Game.cookiesPs) return 0;
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
          owned: () => game.Game.dragonLevel >= 11,
        }, {
          id: 8,
          delta: () => flareHeavenlyIncrease(.05), // 5% bonus to prestige
          owned: () => game.Game.dragonLevel >= 12,
        }, {
          id: 9,
          delta: () => 0, // Golden cookies 5% appear
          owned: () => game.Game.dragonLevel >= 13,
        }, {
          id: 10,
          delta: () => 0, // enables "Dragon Flight" Golden cookie
          owned: () => game.Game.dragonLevel >= 14,
        }, {
          id: 11,
          delta: () => 0, // Golden cookies give 10% more cookies
          owned: () => game.Game.dragonLevel >= 15,
        }, {
          id: 12,
          delta: () => 0, // Wrath cookies give 10% more cookies
          owned: () => game.Game.dragonLevel >= 16,
        }, {
          id: 13,
          delta: () => 0, // Golden cookies last 5% longer
          owned: () => game.Game.dragonLevel >= 17,
        }, {
          id: 14,
          delta: () => flareNeedDrops() ? Number.MAX_VALUE - 1 : 0, // 25%+ Random Drops
          owned: () => game.Game.dragonLevel >= 18,
        }, {
          id: 15,
          delta: () => flareGetRate(), // All cookie production doubled
          owned: () => game.Game.dragonLevel >= 19,
        }, {
          id: 16,
          delta: () => 0, // 123% per golden cookie on screen
          owned: () => game.Game.dragonLevel >= 20,
        }, {// Sugar lumps grow 5% faster, 50% weirder
          id: 17,
          delta: () => flareNextChipBatch().upgrades.length === 0 ? Number.MAX_VALUE : 0,
          owned: () => game.Game.dragonLevel >= 21,
        }, {
          id: 18,
          delta: () => 0, // 1/10 of each other aura
          owned: () => game.Game.dragonLevel >= 22,
        }, {
          id: 19,
          delta: () => 0, // Selling best building may grant wish
          owned: () => game.Game.dragonLevel >= 23,
        }, {
          id: 21,
          delta: () => 0, // Supreme Intellect - powers minigames
          owned: () => game.Game.dragonLevel >= 24,
        }, {
          id: 22,
          delta: () => 0, // Dragon Guts, +2 wrinklers, 20% more eaten, 20% more splode
          owned: () => game.Game.dragonLevel >= 25,
        }, // 26 is bake a cookie, 27 is get another aura
      ]
        .map(a => {
          if (!a.owned()) return null;
          const id = a.id;
          const d = a.delta();
          return { id, delta: d }
        })
        .filter(o => o)
        .sort((a, b) => b.delta - a.delta);

      if (game.Game.dragonAura !== bestAuras[0].id) {
        return flareSetDragonAura(bestAuras[0].id, 0);
      }

      if (game.Game.dragonLevel === 27) {
        if (game.Game.dragonAura2 !== bestAuras[1].id) {
          return flareSetDragonAura(bestAuras[1].id, 1);
        }
      }
    }
  }
  return false
}

const flareSetDragonAura = (id, slot) => {
  // Auras defined on line 14829
  // Cost to sacrifice is 1 of your highest building (line 14904)
  flareLog(`Dragon Aura set to ${game.Game.dragonAuras[id].name}`);
  game.Game.specialTab='dragon';
  game.Game.ToggleSpecialMenu(1);
  flareMultiStep = () => {
    game.Game.SetDragonAura(id,slot); //aura, slot
    flareMultiStep = () => {
      gid('promptOption0').click();
      flareMultiStep = undefined;
    }
  }
  return true;
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
      if (nextUpgrade.after) {
        flareMultiStep = nextUpgrade.after;
      } else if (flareLongestWait < 1 && game.Game.Has('Inspired checklist')) {
        flareMultiStep = () => {
          flareLog('Upgrading! Buy ALL!');
          game.Game.storeBuyAll();
          flareMultiStep = undefined;
        }
      }
      return flareOneAction;
    }
  } else if(nextBuilding) {
    flareNextPurchase = nextBuilding;
    const building = game.Game.Objects[nextBuilding.name];
    const bought = [
      () => flareBuyQty(building, 100),
      () => flareBuyQty(building, 10),
      () => flareBuyQty(building, 1),
    ].find(f => f());
    if (bought) {
      if (building.minigameLoaded && !building.onMinigame) building.switchMinigame(1);
      flareShouldSpendCookies = false;
      return flareOneAction;
    }
  }
  flareLongestWait = Math.max(flareLongestWait, flareNextPurchase?.eta) || 0;
  return false;
}

const flareBuyQty = (obj, qty) => {
  if (game.Game.cookies >= obj.getSumPrice(qty)) {
    flareLog(`Buying building: ${obj.name}`, qty);
    if (game.Game.buyBulk !== qty) {
      game.Game.storeBulkButton(qty === 100 ? 4 : qty === 10 ? 3 : 2);
      flareMultiStep = () => {
        obj.buy();
        flareMultiStep = undefined;
      }
    } else {
      obj.buy();
    }
    return true;
  }
  return false;
}

const flareUpgrades = () => {
  return flareUpgradesList
    .map(({id, delta, after}) => {
      const u = game.Game.UpgradesById[id];
      if (!u.unlocked || u.bought) return null;
      const name = u.name;
      const desc = u.ddesc;
      const price = u.getPrice();
      const d = delta();

      const quickBuyLimit = Math.min(2, flareLongestWait * .1); // 2 seconds or 10% of the longest wait so far
      const timeCheck = price / flareGetRate();
      const ratio = timeCheck <= quickBuyLimit ? d : d/price;
      // const ratio = d/price;
      const eta = flareGetETA(price);
      return {
        id,
        name,
        desc,
        price,
        delta: d,
        ratio,
        eta,
        after,
      };
    })
    .filter(d => d)
    .sort((a,b) => b.ratio - a.ratio)[0];
}

const flareGetRate = () => {
  return flareHz * game.Game.computedMouseCps + game.Game.cookiesPs;
}

const flareGetETA = (price) => {
  const ws = game.Game.wrinklers.filter(w=>w.sucked);
  const sucked = ws.reduce((s,w) => s+=w.sucked,0);
  // cookiesPs doesn't get reduced by wrinklers, just display.
  // Calculating exact suck rate sucks, this is close enough
  return (price - game.Game.cookies - sucked) / flareGetRate();
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

      const quickBuyLimit = Math.min(2, flareLongestWait * .1); // 2 seconds or 10% of the longest wait so far
      const timeCheck = price / flareGetRate();
      const buyCheep = !game.Game.Has('Get lucky') || !flareGoodBuffs().length;
      const ratio = timeCheck <= quickBuyLimit && buyCheep ? d : d/price;

      const eta = flareGetETA(price);
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
  flareTick = 0;
  flareLog('Initiating Feature Laden Automated Resource Engine (F.L.A.R.E.)');
  if (gid('langSelect-EN')) {
    console.log("selecting English");
    gid('langSelect-EN').click();
  }
  setTimeout(() => flareKillable = setInterval(flareOp, flareDelay),1000)
};

const resetGame = () => {
  clearTimeout(flareKillable);
  game.Game.HardReset(2);
  // Clear persistent data
  flareTick = 0;
  flareMessages = [];
  flareLog = [];
  flareWonAchievements = [];
  flareChat.forEach(c => c.fired = false);
  setTimeout(kickoff, 2000);
};

const flareDrawOutput = () => {
  flareCheckTalk();
  document.getElementById("flareRandomDiv").innerHTML = flareDashMessage;
  const f = (n) => {
    if (!n || isNaN(n)) return n;
    if (n > 1e+20) return n.toExponential(4);
    return n.toLocaleString('en-US', {maximumFractionDigits:2});
  }
  document.getElementById("flareDynamicOutput").innerHTML = `
<div>
  Clicking CPS: ${f(Math.round(flareHz * game.Game.computedMouseCps))}<br/>
  Next: ${flareNextPurchase?.name}<br/>
  Cost: ${f(flareNextPurchase?.price)}<br/>
  Delta: ${f(flareNextPurchase?.delta)}<br/>
  ETA: ${f(flareNextPurchase?.eta)}<br/>
  Longest: ${f(flareLongestWait)}<br/>
  Batch: ${f(flareNextChipBatch().batchCost)} <br/>
  </div>
  `;
  // For funsies, start the output in the center, then bump it down when we get first grandma, then move to cookie when
  // we get our first farm
  const out = document.getElementById('flareOutputContainer');
  if (
    !(game.Game.Objects['Farm'].amount || game.Game.Objects['Wizard tower'].amount)
    || (game.Game.elderWrath && !game.Game.HasAchiev('Itchscratcher'))
  ) {
    const divider = gid('leftBeam').getBoundingClientRect();
    const ca = gid('centerArea').getBoundingClientRect();
    out.style.left = `${ca.x}px`;
    out.style.width = `${ca.width}px`;
    out.style.bottom = '10px';
    if (!game.Game.Objects['Grandma'].amount) {
      out.style.height = `${ca.height - 10}px`;
    } else {
      const row1 = gid('row1').getBoundingClientRect();
      out.style.height = `${ca.height - row1.height - 10}px`;
    }
  } else {
    const leftDiv = gid('sectionLeft').getBoundingClientRect();
    const cDiv =  gid('cookies').getBoundingClientRect();
    flareTallestCookie = Math.max(cDiv.height, flareTallestCookie);
    const calcHeight = leftDiv.height - flareTallestCookie - cDiv.y - 40;
    out.style.bottom = '40px';
    out.style.left = 0;
    out.style.width = `${leftDiv.width}px`;
    out.style.height = `${calcHeight}px`;
  }
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
  if ((flareTick / flareHz) % 60 === 0) flareLog('Log');
}

const flareLog = (message, qty = 1) => {
  flareLogs.push({
    tick: flareTick,
    timestamp: Date.now(),
    message: qty > 1 ? message + ` x${qty}`: message,
    cookies: Math.floor(game.Game.cookies),
    chips: Math.floor(game.Game.HowMuchPrestige(game.Game.cookiesReset+game.Game.cookiesEarned)),
    building_cps: Math.floor(game.Game.cookiesPs),
    click_cps: Math.floor(flareHz * game.Game.computedMouseCps),
  });
  console.log(`${flareTick}- ${message}`);

  if (!message || message === 'Log') return;

  let type = 2; // default to bottom
  let mess = message;
  flareChatChecks.find((checks, i) => checks.find(e => {
    mess = mess.replace(e.regex, `<span class="${e.class}">$1</span>`);
    if (mess !== message) {
      type = i;
      return true;
    }
  }));

  let list = flareMessages[type];
  const lastIndex = list.length - 1;
  if (lastIndex > 0 && mess === list[lastIndex].message) list[lastIndex].qty += qty;
  else list.push({ message: mess, qty });

  flareMessages = flareMessages.map((l,lid) => {
    let messages = '';
    l = l.slice(Math.max(l.length - 100, 0));
    l.forEach((m, i) => {
        let mess = m.message;
        if (m.qty > 1) mess += ` (x${m.qty})`;
        if (type === lid && i === Math.min(list.length, 100) - 1) {
          mess = `(new)&nbsp;${mess}`;
        }
        messages += `<div>${mess}</div>`;
      });

    let elementName = 'flareOutputBot';
    if (lid === 0) elementName = 'flareOutputTop';
    if (lid === 1) elementName = 'flareOutputMid';

    document.getElementById(elementName).innerHTML = messages;
    return l;
  });

  document.getElementById('flareOutputTop').scrollTop = document.getElementById('flareOutputTop').scrollHeight;
  document.getElementById('flareOutputMid').scrollTop = document.getElementById('flareOutputMid').scrollHeight;
  document.getElementById('flareOutputBot').scrollTop = document.getElementById('flareOutputBot').scrollHeight;
};

const flareDownload = () => {
  const head = 'tick,timestamp,message,cookies,chips,building_cps,click_cps';
  const output = head + '\n' + flareLogs.map(l => {
    let line = `${l.tick},`;
    line += `${l.timestamp},`
    line += `"${l.message.replaceAll('"','""')}",`
    line += `${l.cookies},`
    line += `${l.chips},`
    line += `${l.building_cps},`
    line += `${l.click_cps}`
    return line;
  }).join('\n');
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(output));
  element.setAttribute('download', 'cookie_log.csv');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

const startFlare = () => {
  setTimeout(() => {
    game = window.frames[0];
    if (!game.Game) {
      startFlare();
      return false;
    }
    game.Game.registerMod('FLARE AI', {
      init:function(){
        kickoff();
        // game.Game.prefs['format'] = 1;
        // TODO: remove after done testing
        game.Game.prefs['fancy'] = 0;
        game.Game.prefs['filters'] = 0;
        game.Game.prefs['particles'] = 0;
        game.Game.prefs['numbers'] = 1;
        game.Game.prefs['milk'] = 0;
        game.Game.prefs['cursors'] = 0;
        game.Game.prefs['wobbly'] = 0;
      },
      save:function(){
        return JSON.stringify({
          flareTick,
          flareLongestWait,
          flareChat: flareChat.map(c => c.fired),
        });
      },
      load:function(str){
        flareWonAchievements = [];
        for (var i in game.Game.AchievementsById) {
          if (game.Game.AchievementsById[i].won && !flareWonAchievements.includes(i)) {
            flareWonAchievements.push(i);
          }
        }
        const restored = JSON.parse(str);
        flareTick = restored.flareTick;
        flareLongestWait = restored.flareLongestWait;
        restored.flareChat.forEach((c, i) => flareChat[i].fired = c);
        flareLog("Loaded!");
      },
    });
  }, 1000);
}

const flareAchievementHunt = () => {
  if (!game.Game.HasAchiev('Cookie-dunker') && game.Game.milkH > .2) {
    document.getElementById('game').style.height = '100px';
  } else {
    document.getElementById('game').style.height = '100vh';
  }
}

// Line 14252
const flareHandleGrandmapocalypse = () => {
  if (game.Game.elderWrath > 0) {
    const active = game.Game.wrinklers.filter(w=>w.sucked).sort((a,b) => b.sucked - a.sucked);
    // If we don't have "Wrinkler poker" yet, poke the first wrinkler until we do
    if (active.length && !game.Game.HasAchiev('Wrinkler poker')) {
      const longest = active[0];
      if (longest.hp <= 2) active.shift();
    }
    // If we're still waiting for drops/achievements, click wrinklers asap
    if (flareNeedWrinklerDrops() || !game.Game.HasAchiev('Moistburster')) {
      const clicked = active.find(w => flareClickWrinkler(w));
      return clicked && flareOneAction;
    }
    // If we haven't appeased them enough, do that
    const pledge = game.Game.UpgradesById[74];
    if (!(game.Game.HasAchiev('Elder slumber') || game.Game.pledges >= 5) && pledge.unlocked) {
      const price = pledge.getPrice();
      const eta = (price - game.Game.cookies) / flareGetRate();
      flareNextPurchase = {
        name: pledge.name,
        price,
        delta: 'No moar',
        eta: eta > 0 ? eta : 0,
      };
      flareShouldSpendCookies = false;
      if (game.Game.cookies >= price) {
        flareLog('Appeasing the Grandmatriarchs');
        pledge.click();
        flareMultiStep = () => {
          const cov = game.Game.UpgradesById[84];
          if (!cov.unlocked) return false;
          cov.click();
          flareMultiStep = () => {
            const revoke = game.Game.UpgradesById[85];
            if (!revoke.unlocked) return false;
            revoke.click();
            flareMultiStep = undefined;
          }
        }
        return true;
      }
      return false;
    }
    const sum = active.reduce((s,w) => s+=w.sucked,0);
    flareDashMessage += sum;
    // If we can't afford the upgrade otherwise, and CAN with wrinklers, pop 'em like they're hot
    if (game.Game.cookies < flareNextPurchase.price && sum + game.Game.cookies >= flareNextPurchase.price) {
      flareMultiStep = () => {
        if (!active.find(w => flareClickWrinkler(w))) flareMultiStep = undefined;
      };
    }
  }
}

const flareClickWrinkler = (wrinkler) => {
  if (wrinkler.sucked) {
    if (wrinkler.hp < 1) flareLog('Pop goes the wrinkler');
    game.Game.mouseX = wrinkler.x;
    game.Game.mouseY = wrinkler.y;
    gid('backgroundLeftCanvas').click();
    return true;
  }
  return false;
}

const flareNeedWrinklerDrops = () => {
  return !(game.Game.GetHowManyEggs() === 20
  && game.Game.GetHowManyHalloweenDrops() === 7);
}

const flareNeedDrops = () => {
  return flareNeedWrinklerDrops() || game.Game.GetHowManyReindeerDrops() < 7;
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
  const rest = game.Game.BuildingsOwned - game.Game.Objects['Cursor'].amount;
  return flareCurrentFingersBase() * rest;
};

const flareCheat = () => {
  game.Game.OpenSesame();
  if(game.Game.lumpsTotal <= 0) {
    game.Game.lumpsTotal = 1;
    game.Game.lumps = 1;
  }

  game.Game.shimmerTypes['golden'].time = game.Game.shimmerTypes['golden'].maxTime;
  if(!game.Game.goldenClicks) {
    setTimeout(() => {
      game.Game.goldenClicks = 77;
      game.Game.goldenClicksLocal = 77;
      game.Game.shimmerTypes['golden'].time = game.Game.shimmerTypes['golden'].maxTime;
    }, 15000);
  }
}
const flareStop = () => flareKillable = flareKillable ? clearInterval(flareKillable) : setInterval(flareOp, flareDelay);

const flareHeavenlyIncrease = (addPercent) => {
  const curHM = game.Game.GetHeavenlyMultiplier();
  const pres = game.Game.prestige * .01;
  const baseCPS = game.Game.cookiesPs / game.Game.globalCpsMult;

  const baseMult = game.Game.globalCpsMult / (1+pres * curHM);
  const newMult = baseMult * (1+pres * (curHM + addPercent))
  const newCPS = baseCPS * newMult;
  return newCPS - game.Game.cookiesPs;
}

const flareGetChips = () => {
  const moreChips = flareNextChipBatch().batchCost - game.Game.heavenlyChips;
  const totalChips = moreChips + Math.ceil(game.Game.HowMuchPrestige(game.Game.cookiesReset)) + 1;
  const moreCookiesNeeded = game.Game.HowManyCookiesReset(totalChips) - game.Game.cookiesReset;
  game.Game.cookies = moreCookiesNeeded;
  game.Game.cookiesEarned = moreCookiesNeeded;
}
