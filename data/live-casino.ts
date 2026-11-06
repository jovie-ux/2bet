export interface LiveCasinoTable {
  id: string
  title: string
  image: string
  players: number
  category: string
  href?: string
  stats?: {
    shoe: number
    banker: number
    player: number
    tie: number
  }
  wins?: any
}

export interface LiveCasinoCategory {
  key: string
  label: string
}

export const LIVE_CASINO_CATEGORIES: LiveCasinoCategory[] = [
  { key: 'game-show', label: 'Game Show' },
  { key: 'baccarat', label: 'Baccarat' },
  { key: 'dragon-tiger', label: 'Dragon Tiger' },
  { key: 'roulette', label: 'Roulette' },
  { key: 'sicbo', label: 'Sicbo' },
  { key: 'fan-tan', label: 'Fan Tan' },
  { key: 'blackjack', label: 'Blackjack' },
  { key: 'poker', label: 'Poker' },
]

export const GAME_SHOW: LiveCasinoTable[] = [
  {
    "id": "crazy-pachinko",
    "title": "Crazy Pachinko",
    "image": "/images/casino/game-show/gen_pch2_med_M.webp",
    "players": 49,
    "category": "game-show"
  },
  {
    "id": "lightning-storm",
    "title": "Lightning Storm",
    "image": "/images/casino/game-show/lmwr1_med_M.webp",
    "players": 1786,
    "category": "game-show"
  },
  {
    "id": "super-color-game",
    "title": "Super Color Game",
    "image": "/images/casino/game-show/lcgr1_dice_med_M.webp",
    "players": 210,
    "category": "game-show"
  },
  {
    "id": "monopoly-live",
    "title": "MONOPOLY Live",
    "image": "/images/casino/game-show/mdc2_mw_en_med_M.webp",
    "players": 814,
    "category": "game-show"
  },
  {
    "id": "funky-time",
    "title": "Funky Time",
    "image": "/images/casino/game-show/fntk1_fnt_med_M.webp",
    "players": 4024,
    "category": "game-show"
  },
  {
    "id": "ice-fishing",
    "title": "Ice Fishing",
    "image": "/images/casino/game-show/icefishing_med_M.webp",
    "players": 28523,
    "category": "game-show"
  },
  {
    "id": "dream-catcher",
    "title": "Dream Catcher",
    "image": "/images/casino/game-show/dc1_mw_med_M.webp",
    "players": 237,
    "category": "game-show"
  },
  {
    "id": "crazy-time",
    "title": "Crazy Time",
    "image": "/images/casino/game-show/dc3_ct_med_M.webp",
    "players": 6548,
    "category": "game-show"
  },
  {
    "id": "imperial-quest",
    "title": "Imperial Quest",
    "image": "/images/casino/game-show/dcca1_mw_med_M.webp",
    "players": 34,
    "category": "game-show"
  },
  {
    "id": "monopoly-big-baller",
    "title": "MONOPOLY Big Baller",
    "image": "/images/casino/game-show/monbbk1_mb_en_med_M.webp",
    "players": 5627,
    "category": "game-show"
  },
  {
    "id": "crazy-time-a",
    "title": "Crazy Time A",
    "image": "/images/casino/game-show/ctk1_ct_med_M.webp",
    "players": 1789,
    "category": "game-show"
  },
  {
    "id": "lightning-dice",
    "title": "Lightning Dice",
    "image": "/images/casino/game-show/light1_dice_med_M.webp",
    "players": 271,
    "category": "game-show"
  },
  {
    "id": "football-studio-dice",
    "title": "Football Studio Dice",
    "image": "/images/casino/game-show/fsdicem1_bi_med_M.webp",
    "players": 77,
    "category": "game-show"
  },
  {
    "id": "dead-or-alive-saloon",
    "title": "Dead or Alive: Saloon",
    "image": "/images/casino/game-show/card_med_M.webp",
    "players": 42,
    "category": "game-show"
  },
  {
    "id": "race-track",
    "title": "Race Track",
    "image": "/images/casino/game-show/rng_racetrack_live_med_M.webp",
    "players": 229,
    "category": "game-show"
  },
  {
    "id": "crazy-coin-flip",
    "title": "Crazy Coin Flip",
    "image": "/images/casino/game-show/gen_ccf1_med_M.webp",
    "players": 157,
    "category": "game-show"
  },
  {
    "id": "perya-super-color-game",
    "title": "Perya Super Color Game",
    "image": "/images/casino/game-show/lcgceb1_dice_med_M.webp",
    "players": 82,
    "category": "game-show"
  },
  {
    "id": "balloon-race",
    "title": "Balloon Race",
    "image": "/images/casino/game-show/rng_balloonrace_med_M.webp",
    "players": 33,
    "category": "game-show"
  },
  {
    "id": "football-studio",
    "title": "Football Studio",
    "image": "/images/casino/game-show/topctm1_bi_med_M.webp",
    "players": 356,
    "category": "game-show"
  },
  {
    "id": "red-baron",
    "title": "Red Baron",
    "image": "/images/casino/game-show/redbaron_med_M.webp",
    "players": 202,
    "category": "game-show"
  },
  {
    "id": "marble-race",
    "title": "Marble Race",
    "image": "/images/casino/game-show/mracer1_mr_med_M.webp",
    "players": 87,
    "category": "game-show"
  },
  {
    "id": "extra-chilli-epic-spins",
    "title": "Extra Chilli Epic Spins",
    "image": "/images/casino/game-show/exchk_es0_med_M.webp",
    "players": 82,
    "category": "game-show"
  }
]

export const BACCARAT: LiveCasinoTable[] = [
  {
    "id": "thai-speed-baccarat-c",
    "title": "Thai Speed Baccarat C",
    "image": "/images/casino/baccarat/thaim3_bs_med_M.webp",
    "players": 27,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "red"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "cornerMark": "red",
          "yellowCenter": true
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true,
          "tie": true
        },
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "red"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "red",
          "yellowCenter": true
        }
      ]
    ],
    "stats": {
      "shoe": 30,
      "banker": 12,
      "player": 17,
      "tie": 1
    }
  },
  {
    "id": "pd-speed-baccarat-6",
    "title": "PD Speed Baccarat 6",
    "image": "/images/casino/baccarat/perceb6_bs_med_M.webp",
    "players": 29,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B",
          "tie": true
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "tie": true
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "tie": true
        },
        {
          "result": "B",
          "cornerMark": "red"
        },
        {
          "result": "B",
          "tie": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "red",
          "yellowCenter": true
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B",
          "cornerMark": "red"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ]
    ],
    "stats": {
      "shoe": 31,
      "banker": 17,
      "player": 10,
      "tie": 4
    }
  },
  {
    "id": "bonsai-speed-baccarat-b",
    "title": "Bonsai Speed Baccarat B",
    "image": "/images/casino/baccarat/bonca2_bs_med_M.webp",
    "players": 39,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "blue"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue"
        },
        {
          "result": "B",
          "cornerMark": "red"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "red"
        }
      ]
    ],
    "stats": {
      "shoe": 22,
      "banker": 11,
      "player": 11,
      "tie": 0
    }
  },
  {
    "id": "salon-prive-baccarat-e",
    "title": "Salon Privé Baccarat E",
    "image": "/images/casino/baccarat/spr4_bs_med_M.webp",
    "players": 0,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true,
          "tie": true
        }
      ],
      [
        {
          "result": "B",
          "tie": true
        },
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "tie": true
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "red"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue"
        }
      ]
    ],
    "stats": {
      "shoe": 20,
      "banker": 9,
      "player": 8,
      "tie": 3
    }
  },
  {
    "id": "speed-baccarat-2",
    "title": "Speed Baccarat 2",
    "image": "/images/casino/baccarat/genmad2_bs_med_M.webp",
    "players": 15,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "P",
          "cornerMark": "red",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "tie": true
        },
        {
          "result": "P",
          "cornerMark": "red"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B",
          "cornerMark": "red",
          "tie": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true,
          "tie": true
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "tie": true
        }
      ]
    ],
    "stats": {
      "shoe": 22,
      "banker": 8,
      "player": 10,
      "tie": 4
    }
  },
  {
    "id": "salon-prive-baccarat-g",
    "title": "Salon Privé Baccarat G",
    "image": "/images/casino/baccarat/spr9_bs_med_M.webp",
    "players": 1,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B",
          "tie": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "blue"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "tie": true
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "red",
          "yellowCenter": true
        },
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "tie": true
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "blue"
        },
        {
          "result": "P"
        }
      ]
    ],
    "stats": {
      "shoe": 25,
      "banker": 9,
      "player": 13,
      "tie": 3
    }
  },
  {
    "id": "speed-baccarat-b",
    "title": "Speed Baccarat B",
    "image": "/images/casino/baccarat/bac6_bs_med_M.webp",
    "players": 642,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "cornerMark": "blue",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue",
          "tie": true
        },
        {
          "result": "B",
          "cornerMark": "blue"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "blue"
        }
      ]
    ],
    "stats": {
      "shoe": 29,
      "banker": 17,
      "player": 11,
      "tie": 1
    }
  },
  {
    "id": "pd-speed-baccarat-1",
    "title": "PD Speed Baccarat 1",
    "image": "/images/casino/baccarat/perceb1_bs_med_M.webp",
    "players": 232,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ]
    ],
    "stats": {
      "shoe": 24,
      "banker": 16,
      "player": 8,
      "tie": 0
    }
  },
  {
    "id": "salon-prive-baccarat-f",
    "title": "Salon Privé Baccarat F",
    "image": "/images/casino/baccarat/spr8_bs_med_M.webp",
    "players": 0,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "tie": true
        },
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true,
          "tie": true
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P",
          "cornerMark": "blue",
          "yellowCenter": true
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "blue"
        },
        {
          "result": "P",
          "cornerMark": "red"
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "tie": true
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "cornerMark": "red"
        },
        {
          "result": "P",
          "cornerMark": "red"
        },
        {
          "result": "P",
          "cornerMark": "blue"
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ]
    ],
    "stats": {
      "shoe": 34,
      "banker": 11,
      "player": 20,
      "tie": 3
    }
  },
  {
    "id": "pd-speed-baccarat-3",
    "title": "PD Speed Baccarat 3",
    "image": "/images/casino/baccarat/perceb3_bs_med_M.webp",
    "players": 82,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "cornerMark": "red"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "cornerMark": "red"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B",
          "cornerMark": "red"
        }
      ],
      [
        {
          "result": "P"
        }
      ]
    ],
    "stats": {
      "shoe": 25,
      "banker": 12,
      "player": 13,
      "tie": 0
    }
  },
  {
    "id": "salon-prive-baccarat-c",
    "title": "Salon Privé Baccarat C",
    "image": "/images/casino/baccarat/spr7_bs_med_M.webp",
    "players": 0,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "red"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "red",
          "yellowCenter": true
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "cornerMark": "red"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "cornerMark": "red",
          "yellowCenter": true,
          "tie": true
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue"
        },
        {
          "result": "B"
        }
      ]
    ],
    "stats": {
      "shoe": 31,
      "banker": 15,
      "player": 15,
      "tie": 1
    }
  },
  {
    "id": "perya-speed-baccarat-12",
    "title": "Perya Speed Baccarat 12",
    "image": "/images/casino/baccarat/perceb12_bs_med_M.webp",
    "players": 39,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "red"
        },
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "tie": true
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B",
          "cornerMark": "blue",
          "tie": true
        }
      ],
      [
        {
          "result": "P"
        }
      ]
    ],
    "stats": {
      "shoe": 23,
      "banker": 11,
      "player": 10,
      "tie": 2
    }
  },
  {
    "id": "speed-baccarat-r",
    "title": "Speed Baccarat R",
    "image": "/images/casino/baccarat/genbaca2_bs_med_M.webp",
    "players": 60,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "P",
          "cornerMark": "blue",
          "tie": true
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "tie": true
        },
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B",
          "cornerMark": "red"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue",
          "yellowCenter": true
        },
        {
          "result": "B",
          "yellowCenter": true,
          "tie": true
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true,
          "tie": true
        },
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "tie": true
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "blue",
          "yellowCenter": true
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "red"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ]
    ],
    "stats": {
      "shoe": 31,
      "banker": 17,
      "player": 9,
      "tie": 5
    }
  },
  {
    "id": "perya-speed-baccarat-13",
    "title": "Perya Speed Baccarat 13",
    "image": "/images/casino/baccarat/perceb13_bs_med_M.webp",
    "players": 30,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "tie": true
        },
        {
          "result": "B",
          "cornerMark": "red"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true,
          "tie": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ]
    ],
    "stats": {
      "shoe": 19,
      "banker": 8,
      "player": 8,
      "tie": 3
    }
  },
  {
    "id": "no-commission-baccarat",
    "title": "No Commission Baccarat",
    "image": "/images/casino/baccarat/ncr1_bs_med_M.webp",
    "players": 930,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "cornerMark": "red"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B",
          "tie": true
        },
        {
          "result": "B",
          "cornerMark": "blue",
          "tie": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "tie": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "red"
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "red",
          "tie": true
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ]
    ],
    "stats": {
      "shoe": 31,
      "banker": 10,
      "player": 16,
      "tie": 5
    }
  },
  {
    "id": "pd-speed-baccarat-7",
    "title": "PD Speed Baccarat 7",
    "image": "/images/casino/baccarat/perceb7_bs_med_M.webp",
    "players": 28,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "cornerMark": "red"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B",
          "tie": true
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "tie": true
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "P",
          "tie": true
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B",
          "cornerMark": "blue"
        },
        {
          "result": "B",
          "tie": true
        }
      ],
      [
        {
          "result": "P"
        }
      ]
    ],
    "stats": {
      "shoe": 34,
      "banker": 15,
      "player": 15,
      "tie": 4
    }
  },
  {
    "id": "speed-baccarat-q",
    "title": "Speed Baccarat Q",
    "image": "/images/casino/baccarat/bact22_bs_med_M.webp",
    "players": 42,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "tie": true
        },
        {
          "result": "B",
          "cornerMark": "blue"
        },
        {
          "result": "B",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "cornerMark": "blue"
        },
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "red"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "red"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        }
      ]
    ],
    "stats": {
      "shoe": 28,
      "banker": 9,
      "player": 18,
      "tie": 1
    }
  },
  {
    "id": "perya-speed-baccarat-16",
    "title": "Perya Speed Baccarat 16",
    "image": "/images/casino/baccarat/perceb16_bs_med_M.webp",
    "players": 29,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true,
          "tie": true
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "red"
        },
        {
          "result": "P",
          "cornerMark": "blue"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B",
          "cornerMark": "red"
        }
      ],
      [
        {
          "result": "P",
          "tie": true
        },
        {
          "result": "P",
          "cornerMark": "red"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ]
    ],
    "stats": {
      "shoe": 25,
      "banker": 8,
      "player": 15,
      "tie": 2
    }
  },
  {
    "id": "speed-baccarat-z",
    "title": "Speed Baccarat Z",
    "image": "/images/casino/baccarat/genmad4_bs_med_M.webp",
    "players": 11,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "B",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "tie": true
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "tie": true
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "tie": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "tie": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ]
    ],
    "stats": {
      "shoe": 27,
      "banker": 12,
      "player": 11,
      "tie": 4
    }
  },
  {
    "id": "salon-prive-baccarat-m",
    "title": "Salon Privé Baccarat M",
    "image": "/images/casino/baccarat/spr15_bs_med_M.webp",
    "players": 3,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue"
        },
        {
          "result": "B",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "red",
          "yellowCenter": true
        }
      ]
    ],
    "stats": {
      "shoe": 20,
      "banker": 9,
      "player": 11,
      "tie": 0
    }
  },
  {
    "id": "super-speed-baccarat",
    "title": "Super Speed Baccarat",
    "image": "/images/casino/baccarat/supr1_bs_med_M.webp",
    "players": 300,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true,
          "tie": true
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "red",
          "tie": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "tie": true
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue",
          "yellowCenter": true
        }
      ]
    ],
    "stats": {
      "shoe": 24,
      "banker": 12,
      "player": 9,
      "tie": 3
    }
  },
  {
    "id": "control-squeeze-baccarat",
    "title": "Control Squeeze Baccarat",
    "image": "/images/casino/baccarat/bac4_bs_med_M.webp",
    "players": 148,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "B",
          "cornerMark": "blue",
          "yellowCenter": true
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "red"
        },
        {
          "result": "P",
          "tie": true
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "blue"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "tie": true
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "red"
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true,
          "tie": true
        }
      ],
      [
        {
          "result": "P",
          "tie": true
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true,
          "tie": true
        }
      ]
    ],
    "stats": {
      "shoe": 30,
      "banker": 17,
      "player": 8,
      "tie": 5
    }
  },
  {
    "id": "salon-prive-baccarat-h",
    "title": "Salon Privé Baccarat H",
    "image": "/images/casino/baccarat/spr10_bs_med_M.webp",
    "players": 0,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true,
          "tie": true
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "red",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "red"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "tie": true
        }
      ]
    ],
    "stats": {
      "shoe": 24,
      "banker": 12,
      "player": 8,
      "tie": 4
    }
  },
  {
    "id": "xxxtreme-lightning-baccarat",
    "title": "XXXtreme Lightning Baccarat",
    "image": "/images/casino/baccarat/xlb1_bi_med_M.webp",
    "players": 341,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "P",
          "tie": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "cornerMark": "red",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "tie": true
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "blue"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "tie": true
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "red",
          "yellowCenter": true
        },
        {
          "result": "B",
          "cornerMark": "red"
        }
      ]
    ],
    "stats": {
      "shoe": 27,
      "banker": 10,
      "player": 14,
      "tie": 3
    }
  },
  {
    "id": "baccarat-b",
    "title": "Baccarat B",
    "image": "/images/casino/baccarat/bac3_bs_med_M.webp",
    "players": 50,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "P",
          "tie": true
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "cornerMark": "blue"
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "blue",
          "tie": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P",
          "tie": true
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B",
          "tie": true
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ]
    ],
    "stats": {
      "shoe": 33,
      "banker": 14,
      "player": 15,
      "tie": 4
    }
  },
  {
    "id": "lotus-speed-baccarat-c",
    "title": "Lotus Speed Baccarat C",
    "image": "/images/casino/baccarat/lotca3_bs_med_M.webp",
    "players": 18,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "P",
          "tie": true
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "P",
          "tie": true
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "cornerMark": "blue",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "tie": true
        },
        {
          "result": "P",
          "cornerMark": "red"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B",
          "cornerMark": "blue",
          "tie": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "red",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "tie": true
        }
      ]
    ],
    "stats": {
      "shoe": 33,
      "banker": 12,
      "player": 16,
      "tie": 5
    }
  },
  {
    "id": "salon-prive-baccarat-l",
    "title": "Salon Privé Baccarat L",
    "image": "/images/casino/baccarat/spr14_bs_med_M.webp",
    "players": 1,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "tie": true
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "red"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "cornerMark": "red",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        }
      ]
    ],
    "stats": {
      "shoe": 30,
      "banker": 12,
      "player": 17,
      "tie": 1
    }
  },
  {
    "id": "perya-speed-baccarat-9",
    "title": "Perya Speed Baccarat 9",
    "image": "/images/casino/baccarat/perceb9_bs_med_M.webp",
    "players": 123,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "B",
          "cornerMark": "blue"
        },
        {
          "result": "B",
          "cornerMark": "blue",
          "yellowCenter": true
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "tie": true
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B",
          "tie": true
        },
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ]
    ],
    "stats": {
      "shoe": 22,
      "banker": 13,
      "player": 7,
      "tie": 2
    }
  },
  {
    "id": "peek-baccarat",
    "title": "Peek Baccarat",
    "image": "/images/casino/baccarat/pkbacr1_bs_med_M.webp",
    "players": 18,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue",
          "tie": true
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "tie": true
        },
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "B",
          "tie": true
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "blue",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue",
          "tie": true
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "red",
          "yellowCenter": true
        },
        {
          "result": "B",
          "cornerMark": "red"
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ]
    ],
    "stats": {
      "shoe": 30,
      "banker": 19,
      "player": 7,
      "tie": 4
    }
  },
  {
    "id": "speed-baccarat-x",
    "title": "Speed Baccarat X",
    "image": "/images/casino/baccarat/bac14_bs_med_M.webp",
    "players": 116,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B",
          "cornerMark": "red",
          "tie": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "tie": true
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B",
          "cornerMark": "blue",
          "yellowCenter": true
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true,
          "tie": true
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "red"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "cornerMark": "red",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        }
      ]
    ],
    "stats": {
      "shoe": 28,
      "banker": 17,
      "player": 8,
      "tie": 3
    }
  },
  {
    "id": "always-8-baccarat",
    "title": "Always 8 Baccarat",
    "image": "/images/casino/baccarat/abck1_bs_med_M.webp",
    "players": 80,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "P",
          "cornerMark": "red"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "blue",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue"
        },
        {
          "result": "B",
          "cornerMark": "blue",
          "tie": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "cornerMark": "blue"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "tie": true
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "red"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "cornerMark": "blue",
          "yellowCenter": true
        }
      ]
    ],
    "stats": {
      "shoe": 22,
      "banker": 7,
      "player": 12,
      "tie": 3
    }
  },
  {
    "id": "perya-speed-baccarat-17",
    "title": "Perya Speed Baccarat 17",
    "image": "/images/casino/baccarat/perceb17_bs_med_M.webp",
    "players": 51,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "B"
        },
        {
          "result": "B",
          "tie": true
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true,
          "tie": true
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ]
    ],
    "stats": {
      "shoe": 24,
      "banker": 12,
      "player": 10,
      "tie": 2
    }
  },
  {
    "id": "speed-baccarat-a",
    "title": "Speed Baccarat A",
    "image": "/images/casino/baccarat/bac5_bs_med_M.webp",
    "players": 2667,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "tie": true
        },
        {
          "result": "P",
          "tie": true
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "red"
        },
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "red"
        }
      ],
      [
        {
          "result": "B"
        }
      ]
    ],
    "stats": {
      "shoe": 22,
      "banker": 8,
      "player": 12,
      "tie": 2
    }
  },
  {
    "id": "super-speed-baccarat-a",
    "title": "Super Speed Baccarat A",
    "image": "/images/casino/baccarat/supgent1_bs_med_M.webp",
    "players": 29,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "red",
          "tie": true
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue",
          "yellowCenter": true,
          "tie": true
        },
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "cornerMark": "red",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue"
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "cornerMark": "blue",
          "yellowCenter": true
        },
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        }
      ]
    ],
    "stats": {
      "shoe": 32,
      "banker": 19,
      "player": 10,
      "tie": 3
    }
  },
  {
    "id": "pd-speed-baccarat-4",
    "title": "PD Speed Baccarat 4",
    "image": "/images/casino/baccarat/perceb4_bs_med_M.webp",
    "players": 22,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "tie": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P",
          "cornerMark": "red",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B",
          "cornerMark": "red"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "tie": true
        },
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B",
          "cornerMark": "blue",
          "yellowCenter": true,
          "tie": true
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "red"
        },
        {
          "result": "P"
        }
      ]
    ],
    "stats": {
      "shoe": 37,
      "banker": 17,
      "player": 16,
      "tie": 4
    }
  }
]

export const DRAGON_TIGER: LiveCasinoTable[] = [
  {
    "id": "super-speed-dragon-tiger",
    "title": "Super Speed Dragon Tiger",
    "image": "/images/casino/dragon-tiger/ssdtkau1_bs_med_M.webp",
    "players": 52,
    "category": "dragon-tiger",
    "wins": [
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue",
          "tie": true
        },
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B",
          "yellowCenter": true,
          "tie": true
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "red"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "red",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ]
    ],
    "stats": {
      "shoe": 19,
      "banker": 8,
      "player": 9,
      "tie": 2
    }
  },
  {
    "id": "dragon-tiger",
    "title": "Dragon Tiger",
    "image": "/images/casino/dragon-tiger/dtr1_bs_med_M.webp",
    "players": 563,
    "category": "dragon-tiger",
    "wins": [
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "cornerMark": "red",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B",
          "cornerMark": "blue"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "tie": true
        },
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "cornerMark": "red",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true,
          "tie": true
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "cornerMark": "blue",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        }
      ]
    ],
    "stats": {
      "shoe": 29,
      "banker": 10,
      "player": 17,
      "tie": 2
    }
  },
  {
    "id": "emperor-dragon-tiger",
    "title": "Emperor Dragon Tiger",
    "image": "/images/casino/dragon-tiger/edrca1_bs_med_M.webp",
    "players": 24,
    "category": "dragon-tiger",
    "wins": [
      [
        {
          "result": "P"
        },
        {
          "result": "P",
          "tie": true
        },
        {
          "result": "P",
          "cornerMark": "red",
          "yellowCenter": true
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "red",
          "tie": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue",
          "yellowCenter": true
        },
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "red",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "tie": true
        },
        {
          "result": "B",
          "cornerMark": "red"
        },
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        },
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue"
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "tie": true
        },
        {
          "result": "P"
        },
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B",
          "cornerMark": "blue",
          "yellowCenter": true
        }
      ]
    ],
    "stats": {
      "shoe": 38,
      "banker": 12,
      "player": 21,
      "tie": 5
    }
  },
  {
    "id": "lightning-dragon-tiger",
    "title": "Lightning Dragon Tiger",
    "image": "/images/casino/dragon-tiger/ldtk1_bi_med_M.webp",
    "players": 222,
    "category": "dragon-tiger",
    "wins": [
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B"
        },
        {
          "result": "B"
        },
        {
          "result": "B",
          "yellowCenter": true,
          "tie": true
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        },
        {
          "result": "B",
          "cornerMark": "blue",
          "yellowCenter": true
        },
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue"
        },
        {
          "result": "B",
          "cornerMark": "red",
          "yellowCenter": true
        }
      ],
      [
        {
          "result": "P"
        }
      ],
      [
        {
          "result": "B",
          "cornerMark": "blue"
        }
      ]
    ],
    "stats": {
      "shoe": 21,
      "banker": 14,
      "player": 6,
      "tie": 1
    }
  }
]

export const ROULETTE: LiveCasinoTable[] = [
  {
    "id": "speed-roulette",
    "title": "Speed Roulette",
    "image": "/images/casino/roulette/spdk1_imr_med_M.webp",
    "players": 91,
    "category": "roulette",
    "wins": [["B", 31], ["B", 6], ["R", 12], ["B", 10], ["R", 3], ["R", 12], ["B", 2], ["R", 5]]
  },
  {
    "id": "football-studio-roulette",
    "title": "Football Studio Roulette",
    "image": "/images/casino/roulette/lrm1_imr_med_M.webp",
    "players": 46,
    "category": "roulette",
    "wins": [["B", 24], ["R", 25], ["B", 35], ["R", 27], ["B", 10], ["B", 10], ["R", 12], ["B", 6]]
  },
  {
    "id": "speed-auto-roulette",
    "title": "Speed Auto Roulette",
    "image": "/images/casino/roulette/genr1_ss_thumb_med_M.webp",
    "players": 282,
    "category": "roulette",
    "wins": [["R", 1], ["R", 27], ["B", 8], ["B", 13], ["B", 4], ["B", 26], ["B", 35], ["B", 20]]
  },
  {
    "id": "roulette",
    "title": "Roulette",
    "image": "/images/casino/roulette/green_imr_med_M.webp",
    "players": 179,
    "category": "roulette",
    "wins": [["R", 16], ["G", 0], ["B", 10], ["R", 3], ["B", 28], ["R", 32], ["R", 25], ["B", 31]]
  },
  {
    "id": "salon-prive-auto-roulette-a",
    "title": "Salon Privé Auto-Roulette A",
    "image": "/images/casino/roulette/rng_salonpriveautoroulette_med_M.webp",
    "players": 0,
    "category": "roulette",
    "wins": [["R", 9], ["B", 35], ["G", 0], ["B", 4], ["R", 34], ["B", 33], ["B", 8], ["R", 1]]
  },
  {
    "id": "immersive-roulette",
    "title": "Immersive Roulette",
    "image": "/images/casino/roulette/immersive_med_M.webp",
    "players": 465,
    "category": "roulette",
    "wins": [["R", 32], ["R", 34], ["R", 21], ["B", 8], ["G", 0], ["B", 6], ["B", 8], ["B", 4]]
  },
  {
    "id": "pd-roulette",
    "title": "PD Roulette",
    "image": "/images/casino/roulette/perceb1_imr_med_M.webp",
    "players": 14,
    "category": "roulette",
    "wins": [["B", 8], ["R", 30], ["G", 0], ["R", 14], ["R", 5], ["R", 18], ["B", 8], ["B", 8]]
  },
  {
    "id": "lightning-roulette",
    "title": "Lightning Roulette",
    "image": "/images/casino/roulette/lightr1_imr_med_M.webp",
    "players": 751,
    "category": "roulette",
    "wins": [["R", 1], ["B", 33], ["R", 34], ["R", 7], ["R", 34], ["R", 9], ["R", 3], ["R", 19]]
  },
  {
    "id": "auto-roulette-vip",
    "title": "Auto-Roulette VIP",
    "image": "/images/casino/roulette/vip1_ss_thumb_med_M.webp",
    "players": 287,
    "category": "roulette",
    "wins": [["B", 2], ["B", 11], ["B", 28], ["R", 3], ["B", 8], ["R", 30], ["G", 0], ["B", 29]]
  },
  {
    "id": "emperor-roulette",
    "title": "Emperor Roulette",
    "image": "/images/casino/roulette/eprca1_imr_med_M.webp",
    "players": 25,
    "category": "roulette",
    "wins": [["B", 10], ["B", 10], ["B", 6], ["R", 18], ["B", 33], ["R", 3], ["R", 1], ["R", 9]]
  },
  {
    "id": "double-ball-roulette",
    "title": "Double Ball Roulette",
    "image": "/images/casino/roulette/dbrk1_imr_med_M.webp",
    "players": 26,
    "category": "roulette",
    "wins": [["B", 15], ["B", 13], ["R", 34], ["B", 17], ["B", 2], ["R", 23], ["R", 23], ["B", 35]]
  },
  {
    "id": "auto-roulette",
    "title": "Auto-Roulette",
    "image": "/images/casino/roulette/gen1_ss_thumb_med_M.webp",
    "players": 1291,
    "category": "roulette",
    "wins": [["R", 23], ["R", 12], ["B", 17], ["B", 8], ["B", 35], ["R", 16], ["B", 2], ["R", 16]]
  },
  {
    "id": "lotus-roulette",
    "title": "Lotus Roulette",
    "image": "/images/casino/roulette/lotca1_imr_med_M.webp",
    "players": 11,
    "category": "roulette",
    "wins": [["B", 13], ["R", 32], ["R", 3], ["R", 9], ["R", 30], ["B", 33], ["R", 14], ["R", 18]]
  },
  {
    "id": "salon-prive-auto-roulette-b",
    "title": "Salon Privé Auto-Roulette B",
    "image": "/images/casino/roulette/rng_salonpriveautoroulette_med_M.webp",
    "players": 0,
    "category": "roulette",
    "wins": [["R", 5], ["R", 5], ["B", 15], ["R", 14], ["R", 32], ["B", 28], ["R", 9], ["R", 14]]
  },
  {
    "id": "xxxtreme-lightning-roulette",
    "title": "XXXtreme Lightning Roulette",
    "image": "/images/casino/roulette/xfrt1_imr_med_M.webp",
    "players": 648,
    "category": "roulette",
    "wins": [["B", 17], ["B", 29], ["B", 35], ["B", 15], ["B", 22], ["B", 28], ["B", 17], ["R", 9]]
  },
  {
    "id": "gold-vault-roulette",
    "title": "Gold Vault Roulette",
    "image": "/images/casino/roulette/goldvk1_imr_med_M.webp",
    "players": 265,
    "category": "roulette",
    "wins": [["R", 16], ["R", 14], ["R", 30], ["R", 1], ["B", 2], ["R", 3], ["R", 36], ["R", 27]]
  },
  {
    "id": "bucharest-auto-roulette",
    "title": "Bucharest Auto-Roulette",
    "image": "/images/casino/roulette/buc1_ss_thumb_med_M.webp",
    "players": 181,
    "category": "roulette",
    "wins": [["B", 26], ["R", 1], ["B", 8], ["B", 2], ["R", 16], ["R", 34], ["R", 1], ["B", 35]]
  },
  {
    "id": "instant-roulette",
    "title": "Instant Roulette",
    "image": "/images/casino/roulette/s_inrok0_med_M.webp",
    "players": 111,
    "category": "roulette",
    "wins": [["R", 1], ["B", 28], ["B", 22], ["R", 12], ["R", 9], ["B", 22], ["B", 4], ["R", 18]]
  },
  {
    "id": "salon-prive-roulette",
    "title": "Salon Privé Roulette",
    "image": "/images/casino/roulette/spr2_imr_med_M.webp",
    "players": 0,
    "category": "roulette",
    "wins": [["R", 3], ["R", 7], ["B", 17], ["B", 17], ["R", 27], ["R", 27], ["R", 3], ["B", 33]]
  },
  {
    "id": "pd-lightning-roulette",
    "title": "PD Lightning Roulette",
    "image": "/images/casino/roulette/lightceb1_imr_med_M.webp",
    "players": 43,
    "category": "roulette",
    "wins": [["R", 16], ["B", 17], ["B", 29], ["R", 34], ["B", 29], ["R", 27], ["R", 34], ["R", 5]]
  },
  {
    "id": "american-roulette",
    "title": "American Roulette",
    "image": "/images/casino/roulette/dzerot1_imrs_med_M.webp",
    "players": 56,
    "category": "roulette",
    "wins": [["R", 1], ["B", 8], ["B", 4], ["R", 25], ["B", 2], ["B", 35], ["R", 3], ["B", 8]]
  },
  {
    "id": "vip-roulette",
    "title": "VIP Roulette",
    "image": "/images/casino/roulette/vipbuc1_imr_med_M.webp",
    "players": 52,
    "category": "roulette",
    "wins": [["B", 13], ["R", 7], ["B", 28], ["B", 2], ["R", 14], ["R", 27], ["R", 34], ["R", 12]]
  },
  {
    "id": "red-door-roulette",
    "title": "Red Door Roulette",
    "image": "/images/casino/roulette/rdr_imr_med_M.webp",
    "players": 1020,
    "category": "roulette",
    "wins": [["R", 7], ["R", 5], ["B", 8], ["R", 23], ["B", 20], ["B", 26], ["B", 8], ["R", 7]]
  }
]

export const SICBO: LiveCasinoTable[] = [
  {
    "id": "emperor-sic-bo-a",
    "title": "Sic Bo C1",
    "image": "/images/casino/sicbo/sicboca2_dice_med_M.webp",
    "players": 37,
    "category": "sicbo",
    "wins": [
      [[3, 5, 5], 13, ["R", "S"], ["B", "O"]],
      [[3, 5, 1], 9, ["R", "S"], ["S", "O"]],
      [[5, 4, 1], 10, ["R", "S"], ["S", "E"]],
      [[2, 2, 6], 10, ["G", "T"], ["S", "E"]],
      [[1, 2, 4], 7, ["G", "T"], ["S", "O"]],
      [[2, 5, 5], 12, ["R", "S"], ["B", "E"]],
      [[3, 2, 4], 9, ["G", "T"], ["S", "O"]],
      [[4, 1, 3], 8, ["R", "S"], ["S", "E"]],
      [[2, 1, 5], 8, ["G", "T"], ["S", "E"]]
    ]
  },
  {
    "id": "lotus-sic-bo",
    "title": "SicBo R01",
    "image": "/images/casino/sicbo/sicboca3_dice_med_M.webp",
    "players": 23,
    "category": "sicbo",
    "wins": [
      [[1, 1, 4], 6, ["R", "S"], ["S", "E"]],
      [[4, 2, 1], 7, ["R", "S"], ["S", "O"]],
      [[5, 4, 5], 14, ["R", "S"], ["B", "E"]],
      [[1, 3, 3], 7, ["G", "T"], ["S", "O"]],
      [[2, 6, 4], 12, ["R", "S"], ["B", "E"]],
      [[1, 1, 6], 8, ["R", "S"], ["S", "E"]],
      [[5, 3, 5], 13, ["G", "T"], ["B", "O"]],
      [[3, 2, 6], 11, ["G", "T"], ["B", "O"]],
      [[2, 3, 3], 8, ["G", "T"], ["S", "E"]]
    ]
  },
  {
    "id": "lightning-sic-bo",
    "title": "SicBo R02",
    "image": "/images/casino/sicbo/lsicbor1_dice_med_M.webp",
    "players": 231,
    "category": "sicbo",
    "wins": [
      [[5, 6, 6], 17, ["G", "T"], ["B", "O"]],
      [[4, 5, 5], 14, ["R", "S"], ["B", "E"]],
      [[5, 3, 4], 12, ["G", "T"], ["B", "E"]],
      [[4, 4, 2], 10, ["R", "S"], ["S", "E"]],
      [[6, 6, 2], 14, ["G", "T"], ["B", "E"]],
      [[4, 2, 4], 10, ["G", "T"], ["S", "E"]],
      [[1, 1, 5], 7, ["G", "T"], ["S", "O"]],
      [[3, 3, 6], 12, ["R", "S"], ["B", "E"]],
      [[4, 3, 6], 13, ["G", "T"], ["B", "O"]]
    ]
  },
  {
    "id": "super-sic-bo",
    "title": "SicBo R01",
    "image": "/images/casino/sicbo/sicbo_dice_med_M.webp",
    "players": 688,
    "category": "sicbo",
    "wins": [
      [[4, 2, 6], 12, ["G", "T"], ["B", "E"]],
      [[4, 5, 2], 11, ["G", "T"], ["B", "O"]],
      [[4, 1, 5], 10, ["R", "S"], ["S", "E"]],
      [[2, 2, 2], 6, ["R", "S"], ["S", "E"]],
      [[4, 2, 5], 11, ["R", "S"], ["B", "O"]],
      [[2, 6, 2], 10, ["R", "S"], ["S", "E"]],
      [[4, 6, 5], 15, ["R", "S"], ["B", "O"]],
      [[4, 5, 2], 11, ["R", "S"], ["B", "O"]],
      [[2, 4, 6], 12, ["R", "S"], ["B", "E"]]
    ]
  },
]

export const FANTAN: LiveCasinoTable[] = [
  {
    id: 'fan-tan',
    title: 'Fan Tan',
    image: '/images/casino/fantan/fantan.webp',
    players: 590,
    category: 'fan-tan',
    wins: [1, 1, 1, 2, 4, 3, 4, 2, 1, 2],
  }
]

export const BLACKJACK: LiveCasinoTable[] = [
  {
    "id": "salon-prive-blackjack-j",
    "title": "Salon Privé Blackjack J",
    "image": "/images/casino/blackjack/bj_spr10_med_M.webp",
    "players": 0,
    "category": "blackjack",
    "wins": [1, 1, 0, 0, 0, 0, 1]
  },
  {
    "id": "perya-classic-blackjack-4",
    "title": "Perya Classic Blackjack 4",
    "image": "/images/casino/blackjack/bj_perceb4_med_M.webp",
    "players": 12,
    "category": "blackjack",
    "wins": [0, 1, 1, 0, 0, 1, 0]
  },
  {
    "id": "blackjack-vip-9",
    "title": "Blackjack VIP 9",
    "image": "/images/casino/blackjack/bj_vipt12_med_M.webp",
    "players": 6,
    "category": "blackjack",
    "wins": [1, 1, 0, 0, 0, 0, 1]
  },
  {
    "id": "evo-speed-blackjack-2",
    "title": "Evo Speed Blackjack 2",
    "image": "/images/casino/blackjack/bj_espdk2_med_M.webp",
    "players": 11,
    "category": "blackjack",
  },
  {
    "id": "blackjack-vip-34",
    "title": "Blackjack VIP 34",
    "image": "/images/casino/blackjack/bj_vipr34_med_M.webp",
    "players": 0,
    "category": "blackjack",
    "wins": [1, 0, 0, 1, 1, 1, 1]
  },
  {
    "id": "salon-prive-blackjack-n",
    "title": "Salon Privé Blackjack N",
    "image": "/images/casino/blackjack/bj_spr14_med_M.webp",
    "players": 1,
    "category": "blackjack",
    "wins": [1, 0, 0, 0, 1, 0, 1]
  },
  {
    "id": "speed-vip-blackjack-k",
    "title": "Speed VIP Blackjack K",
    "image": "/images/casino/blackjack/bj_spdvipt11_med_M.webp",
    "players": 8,
    "category": "blackjack",
    "wins": [0, 1, 1, 1, 0, 0, 1]
  },
  {
    "id": "speed-vip-blackjack-d",
    "title": "Speed VIP Blackjack D",
    "image": "/images/casino/blackjack/bj_spdvipt4_med_M.webp",
    "players": 11,
    "category": "blackjack",
    "wins": [0, 1, 0, 0, 0, 0, 0]
  },
  {
    "id": "perya-classic-blackjack-1",
    "title": "Perya Classic Blackjack 1",
    "image": "/images/casino/blackjack/bj_perceb1_med_M.webp",
    "players": 12,
    "category": "blackjack",
    "wins": [1, 0, 1, 1, 1, 1, 0]
  },
  {
    "id": "blackjack-vip-a",
    "title": "Blackjack VIP A",
    "image": "/images/casino/blackjack/bj_vipro3_med_M.webp",
    "players": 7,
    "category": "blackjack",
    "wins": [0, 1, 0, 1, 0, 0, 0]
  },
  {
    "id": "blackjack-platinum-vip",
    "title": "Blackjack Platinum VIP",
    "image": "/images/casino/blackjack/bj_vipro12_med_M.webp",
    "players": 12,
    "category": "blackjack",
    "wins": [1, 1, 0, 1, 1, 0, 0]
  },
  {
    "id": "salon-prive-blackjack-h",
    "title": "Salon Privé Blackjack H",
    "image": "/images/casino/blackjack/bj_spr8_med_M.webp",
    "players": 0,
    "category": "blackjack",
    "wins": [0, 1, 0, 0, 1, 1, 1]
  },
  {
    "id": "blackjack-vip-3",
    "title": "Blackjack VIP 3",
    "image": "/images/casino/blackjack/bj_vipt6_med_M.webp",
    "players": 7,
    "category": "blackjack",
    "wins": [0, 0, 1, 1, 1, 1, 1]
  },
  {
    "id": "blackjack-vip-o",
    "title": "Blackjack VIP O",
    "image": "/images/casino/blackjack/bj_vipr8_med_M.webp",
    "players": 9,
    "category": "blackjack",
    "wins": [0, 1, 1, 1, 0, 0, 0]
  },
  {
    "id": "blackjack-vip-u",
    "title": "Blackjack VIP U",
    "image": "/images/casino/blackjack/bj_vgena52_med_M.webp",
    "players": 8,
    "category": "blackjack",
    "wins": [1, 0, 0, 1, 0, 0, 1]
  },
  {
    "id": "speed-vip-blackjack-a",
    "title": "Speed VIP Blackjack A",
    "image": "/images/casino/blackjack/bj_spdvipt1_med_M.webp",
    "players": 11,
    "category": "blackjack",
    "wins": [0, 0, 1, 0, 0, 1, 0]
  },
  {
    "id": "blackjack-vip-5",
    "title": "Blackjack VIP 5",
    "image": "/images/casino/blackjack/bj_vgena5_med_M.webp",
    "players": 9,
    "category": "blackjack",
    "wins": [0, 0, 1, 0, 0, 0, 0]
  },
  {
    "id": "blackjack-b",
    "title": "Blackjack B",
    "image": "/images/casino/blackjack/bj_gen2_med_M.webp",
    "players": 22,
    "category": "blackjack",
    "wins": [0, 0, 0, 0, 1, 0, 0]
  },
  {
    "id": "lightning-blackjack",
    "title": "Lightning Blackjack",
    "image": "/images/casino/blackjack/bj_lightr1_med_M.webp",
    "players": 30,
    "category": "blackjack",
    "wins": [1, 1, 0, 0, 1, 0, 0]
  },
  {
    "id": "blackjack-silver-e",
    "title": "Blackjack Silver E",
    "image": "/images/casino/blackjack/bj_cgent94_med_M.webp",
    "players": 6,
    "category": "blackjack",
    "wins": [1, 1, 0, 1, 1, 0, 1]
  },
  {
    "id": "blackjack-vip-1",
    "title": "Blackjack VIP 1",
    "image": "/images/casino/blackjack/bj_vipr7_med_M.webp",
    "players": 12,
    "category": "blackjack",
    "wins": [1, 1, 0, 0, 1, 1, 0]
  },
  {
    "id": "blackjack-vip-25",
    "title": "Blackjack VIP 25",
    "image": "/images/casino/blackjack/bj_vgena15_med_M.webp",
    "players": 7,
    "category": "blackjack",
    "wins": [1, 0, 0, 0, 0, 1, 1]
  },
  {
    "id": "evo-speed-blackjack-6",
    "title": "Evo Speed Blackjack 6",
    "image": "/images/casino/blackjack/bj_espdk6_med_M.webp",
    "players": 10,
    "category": "blackjack",
  },
  {
    "id": "blackjack-silver-b",
    "title": "Blackjack Silver B",
    "image": "/images/casino/blackjack/bj_cgent10_med_M.webp",
    "players": 6,
    "category": "blackjack",
    "wins": [0, 1, 0, 0, 1, 0, 0]
  },
  {
    "id": "blackjack-vip-q",
    "title": "Blackjack VIP Q",
    "image": "/images/casino/blackjack/bj_vipr4_med_M.webp",
    "players": 8,
    "category": "blackjack",
    "wins": [1, 0, 0, 0, 1, 0, 1]
  },
  {
    "id": "blackjack-vip-12",
    "title": "Blackjack VIP 12",
    "image": "/images/casino/blackjack/bj_vipro14_med_M.webp",
    "players": 10,
    "category": "blackjack",
    "wins": [0, 1, 1, 1, 1, 1, 0]
  },
  {
    "id": "blackjack-vip-36",
    "title": "Blackjack VIP 36",
    "image": "/images/casino/blackjack/bj_vipr39_med_M.webp",
    "players": 6,
    "category": "blackjack",
    "wins": [1, 0, 0, 0, 1, 0, 0]
  },
  {
    "id": "salon-prive-blackjack-m",
    "title": "Salon Privé Blackjack M",
    "image": "/images/casino/blackjack/bj_spr13_med_M.webp",
    "players": 0,
    "category": "blackjack",
    "wins": [0, 0, 0, 1, 0, 1, 0]
  },
  {
    "id": "perya-vip-blackjack-7",
    "title": "Perya VIP Blackjack 7",
    "image": "/images/casino/blackjack/bj_vperceb7_med_M.webp",
    "players": 6,
    "category": "blackjack",
    "wins": [1, 0, 1, 0, 1, 0, 0]
  },
  {
    "id": "perya-classic-blackjack-9",
    "title": "Perya Classic Blackjack 9",
    "image": "/images/casino/blackjack/bj_perceb9_med_M.webp",
    "players": 12,
    "category": "blackjack",
    "wins": [0, 0, 0, 0, 1, 1, 1]
  },
  {
    "id": "blackjack-vip-15",
    "title": "Blackjack VIP 15",
    "image": "/images/casino/blackjack/bj_vipt18_med_M.webp",
    "players": 6,
    "category": "blackjack",
    "wins": [0, 1, 0, 1, 1, 1, 1]
  },
  {
    "id": "blackjack-vip-28",
    "title": "Blackjack VIP 28",
    "image": "/images/casino/blackjack/bj_vgenmed28_med_M.webp",
    "players": 5,
    "category": "blackjack",
    "wins": [0, 0, 0, 0, 0, 0, 0]
  },
  {
    "id": "blackjack-vip-k",
    "title": "Blackjack VIP K",
    "image": "/images/casino/blackjack/bj_vipr6_med_M.webp",
    "players": 8,
    "category": "blackjack",
    "wins": [1, 0, 1, 0, 0, 1, 0]
  },
  {
    "id": "perya-vip-blackjack-2",
    "title": "Perya VIP Blackjack 2",
    "image": "/images/casino/blackjack/bj_vperceb2_med_M.webp",
    "players": 9,
    "category": "blackjack",
    "wins": [1, 1, 1, 0, 0, 1, 1]
  },
  {
    "id": "blackjack-vip-n",
    "title": "Blackjack VIP N",
    "image": "/images/casino/blackjack/bj_cgent67_med_M.webp",
    "players": 8,
    "category": "blackjack",
    "wins": [0, 1, 0, 1, 0, 0, 1]
  },
  {
    "id": "blackjack-silver-c",
    "title": "Blackjack Silver C",
    "image": "/images/casino/blackjack/bj_cgent88_med_M.webp",
    "players": 10,
    "category": "blackjack",
  },
  {
    "id": "blackjack-vip-x",
    "title": "Blackjack VIP X",
    "image": "/images/casino/blackjack/bj_vgena53_med_M.webp",
    "players": 7,
    "category": "blackjack",
    "wins": [1, 0, 1, 0, 0, 0, 1]
  },
  {
    "id": "blackjack-a",
    "title": "Blackjack A",
    "image": "/images/casino/blackjack/bj_gen7_med_M.webp",
    "players": 24,
    "category": "blackjack",
    "wins": [0, 1, 0, 0, 0, 1, 1]
  },
  {
    "id": "blackjack-vip-h",
    "title": "Blackjack VIP H",
    "image": "/images/casino/blackjack/bj_cgent66_med_M.webp",
    "players": 8,
    "category": "blackjack",
    "wins": [1, 0, 1, 1, 0, 0, 0]
  },
  {
    "id": "salon-prive-blackjack-i",
    "title": "Salon Privé Blackjack I",
    "image": "/images/casino/blackjack/bj_spr9_med_M.webp",
    "players": 0,
    "category": "blackjack",
    "wins": [0, 0, 1, 0, 1, 0, 1]
  },
  {
    "id": "perya-vip-blackjack-1",
    "title": "Perya VIP Blackjack 1",
    "image": "/images/casino/blackjack/bj_vperceb1_med_M.webp",
    "players": 8,
    "category": "blackjack",
    "wins": [0, 0, 0, 0, 0, 0, 0]
  },
  {
    "id": "blackjack-vip-37",
    "title": "Blackjack VIP 37",
    "image": "/images/casino/blackjack/bj_vgena20_med_M.webp",
    "players": 3,
    "category": "blackjack",
    "wins": [1, 0, 0, 1, 1, 1, 0]
  },
  {
    "id": "salon-prive-blackjack-d",
    "title": "Salon Privé Blackjack D",
    "image": "/images/casino/blackjack/bj_spr5_med_M.webp",
    "players": 0,
    "category": "blackjack",
    "wins": [0, 1, 0, 1, 1, 1, 1]
  },
  {
    "id": "perya-vip-blackjack-5",
    "title": "Perya VIP Blackjack 5",
    "image": "/images/casino/blackjack/bj_vperceb5_med_M.webp",
    "players": 7,
    "category": "blackjack",
    "wins": [1, 1, 0, 1, 0, 1, 1]
  },
  {
    "id": "blackjack-vip-alpha",
    "title": "Blackjack VIP Alpha",
    "image": "/images/casino/blackjack/bj_vipro13_med_M.webp",
    "players": 4,
    "category": "blackjack",
    "wins": [1, 0, 1, 0, 1, 0, 1]
  },
  {
    "id": "blackjack-vip-d",
    "title": "Blackjack VIP D",
    "image": "/images/casino/blackjack/bj_vipk4_med_M.webp",
    "players": 4,
    "category": "blackjack",
    "wins": [0, 1, 1, 0, 0, 1, 1]
  },
  {
    "id": "evo-speed-blackjack-10",
    "title": "Evo Speed Blackjack 10",
    "image": "/images/casino/blackjack/bj_espdmad10_med_M.webp",
    "players": 10,
    "category": "blackjack",
  },
  {
    "id": "salon-prive-blackjack-g",
    "title": "Salon Privé Blackjack G",
    "image": "/images/casino/blackjack/bj_spr7_med_M.webp",
    "players": 1,
    "category": "blackjack",
    "wins": [0, 1, 1, 0, 1, 1, 1]
  },
  {
    "id": "blackjack-vip-6",
    "title": "Blackjack VIP 6",
    "image": "/images/casino/blackjack/bj_vipt9_med_M.webp",
    "players": 8,
    "category": "blackjack",
    "wins": [0, 0, 0, 1, 0, 1, 0]
  }
]

export const POKER: LiveCasinoTable[] = [
  {
    "id": "three-card-poker",
    "title": "Three Card Poker",
    "image": "/images/casino/poker/pk_3card_med_M.webp",
    "players": 23,
    "category": "poker"
  },
  {
    "id": "2-hand-casino-hold-em",
    "title": "2 Hand Casino Hold'em",
    "image": "/images/casino/poker/pk_thchr1_med_M.webp",
    "players": 38,
    "category": "poker"
  },
  {
    "id": "super-andar-bahar",
    "title": "Super Andar Bahar",
    "image": "/images/casino/poker/pk_teds1_med_M.webp",
    "players": 336,
    "category": "poker"
  },
  {
    "id": "teen-patti",
    "title": "Teen Patti",
    "image": "/images/casino/poker/pk_tnptr1_med_M.webp",
    "players": 59,
    "category": "poker"
  },
  {
    "id": "casino-hold-em",
    "title": "Casino Hold'em",
    "image": "/images/casino/poker/pk_gen_med_M.webp",
    "players": 136,
    "category": "poker"
  },
  {
    "id": "caribbean-stud-poker",
    "title": "Caribbean Stud Poker",
    "image": "/images/casino/poker/pk_crb_med_M.webp",
    "players": 23,
    "category": "poker"
  },
  {
    "id": "texas-hold-em-bonus-poker",
    "title": "Texas Hold'em Bonus Poker",
    "image": "/images/casino/poker/pk_bth1_med_M.webp",
    "players": 57,
    "category": "poker"
  },
  {
    "id": "ultimate-texas-hold-em",
    "title": "Ultimate Texas Hold'em",
    "image": "/images/casino/poker/pk_uth1_med_M.webp",
    "players": 56,
    "category": "poker"
  }
]

export const LIVE_CASINO_TABLES: LiveCasinoTable[] = [
  ...GAME_SHOW,
  ...BACCARAT,
  ...DRAGON_TIGER,
  ...ROULETTE,
  ...SICBO,
  ...FANTAN,
  ...BLACKJACK,
  ...POKER,
]
