import type { LiveCasinoRoadPatternKey } from '../utils/liveCasinoRoadPatterns'

export interface LiveCasinoTable {
  id: string
  title: string
  image: string
  players: number
  category: string
  href?: string
  /** Optional provider road code; otherwise inferred from the table's wins. */
  roadPattern?: Exclude<LiveCasinoRoadPatternKey, 'all'>
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
  { key: 'featured', label: 'Featured' },
  { key: 'good-road', label: 'Good Road' },
  { key: 'live-show', label: 'Live Show' },
  { key: 'baccarat', label: 'Baccarat' },
  { key: 'dragon-tiger', label: 'Dragon Tiger' },
  { key: 'roulette', label: 'Roulette' },
  { key: 'sicbo', label: 'Sicbo' },
  { key: 'evolution', label: 'Evolution' },
]

export const GAME_SHOW: LiveCasinoTable[] = [
  {
    "id": "treasure-roulette-c05",
    "title": "Treasure Roulette C05",
    "image": "/images/casino/roulette/treasure-roulette-c05.webp",
    "players": 91,
    "category": "game-show",
    "wins": [["B", 31], ["B", 6], ["R", 12], ["B", 10], ["R", 3], ["R", 12], ["B", 2], ["R", 5], ["R", 5], ["B", 10]]
  },
]

export const BACCARAT: LiveCasinoTable[] = [
  {
    "id": "bac-bo",
    "title": "Bac Bo C01",
    "image": "/images/casino/baccarat/bac-bo.webp",
    "players": 50,
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
    "id": "speed-g15",
    "title": "Speed  G15",
    "image": "/images/casino/baccarat/qmf_baccpk1_sdx.webp",
    "players": 64,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "P",
          "yellowCenter": true
        },
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
          "result": "B",
          "cornerMark": "blue"
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
          "cornerMark": "red",
          "yellowCenter": true
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
        },
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ]
    ],
    "stats": {
      "shoe": 41,
      "banker": 18,
      "player": 19,
      "tie": 4
    }
  },
  {
    "id": "speed-c01",
    "title": "Speed C01",
    "image": "/images/casino/baccarat/feo_815_sdx.webp",
    "players": 21,
    "category": "baccarat",
    "wins": [
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
          "cornerMark": "blue",
          "yellowCenter": true
        },
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
      "shoe": 16,
      "banker": 5,
      "player": 11,
      "tie": 0
    }
  },
  {
    "id": "speed-c06",
    "title": "Speed C06",
    "image": "/images/casino/baccarat/feo_808_sdx.webp",
    "players": 36,
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
        }
      ]
    ],
    "stats": {
      "shoe": 14,
      "banker": 7,
      "player": 5,
      "tie": 2
    }
  },
  {
    "id": "speed-c17",
    "title": "Speed C17",
    "image": "/images/casino/baccarat/feo_844_sdx.webp",
    "players": 59,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B",
          "cornerMark": "red",
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
        },
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P",
          "yellowCenter": true,
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
      ]
    ],
    "stats": {
      "shoe": 43,
      "banker": 20,
      "player": 18,
      "tie": 5
    }
  },
  {
    "id": "speed-c18",
    "title": "Speed C18",
    "image": "/images/casino/baccarat/feo_811_sdx.webp",
    "players": 31,
    "category": "baccarat",
    "wins": [
      [
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
      "shoe": 16,
      "banker": 11,
      "player": 4,
      "tie": 1
    }
  },
  {
    "id": "speed-c08",
    "title": "Speed C08",
    "image": "/images/casino/baccarat/feo_827_sdx.webp",
    "players": 49,
    "category": "baccarat",
    "wins": [
      [
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
          "cornerMark": "red",
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
      "shoe": 33,
      "banker": 17,
      "player": 14,
      "tie": 2
    }
  },
  {
    "id": "speed-g14",
    "title": "Speed  G14",
    "image": "/images/casino/baccarat/qmf_baccpj1_sdx.webp",
    "players": 112,
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
      "banker": 10,
      "player": 14,
      "tie": 3
    }
  },
  {
    "id": "speed-c03",
    "title": "Speed C03",
    "image": "/images/casino/baccarat/feo_817_sdx.webp",
    "players": 69,
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
          "yellowCenter": true
        },
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
          "yellowCenter": true
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
          "yellowCenter": true,
          "tie": true
        },
        {
          "result": "P",
          "yellowCenter": true
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
      "shoe": 44,
      "banker": 23,
      "player": 16,
      "tie": 5
    }
  },
  {
    "id": "speed-c09",
    "title": "Speed C09",
    "image": "/images/casino/baccarat/feo_810_sdx.webp",
    "players": 69,
    "category": "baccarat",
    "wins": [
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
          "cornerMark": "red",
          "yellowCenter": true
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
          "result": "B",
          "yellowCenter": true,
          "tie": true
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
          "result": "B",
          "cornerMark": "blue",
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
        },
        {
          "result": "P",
          "cornerMark": "red",
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
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "blue",
          "yellowCenter": true
        },
        {
          "result": "P",
          "cornerMark": "red",
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
      ]
    ],
    "stats": {
      "shoe": 53,
      "banker": 19,
      "player": 26,
      "tie": 8
    }
  },
  {
    "id": "speed-c12",
    "title": "Speed C12",
    "image": "/images/casino/baccarat/feo_833_sdx.webp",
    "players": 55,
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
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "B",
          "yellowCenter": true
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
          "cornerMark": "red"
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
      "shoe": 47,
      "banker": 25,
      "player": 17,
      "tie": 5
    }
  },
  {
    "id": "speed-c13",
    "title": "Speed C13",
    "image": "/images/casino/baccarat/feo_829_sdx.webp",
    "players": 57,
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
          "cornerMark": "blue",
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
      ]
    ],
    "stats": {
      "shoe": 17,
      "banker": 8,
      "player": 8,
      "tie": 1
    }
  },
  {
    "id": "speed-v14",
    "title": "Speed V14",
    "image": "/images/casino/baccarat/dfg_77846_sdx.webp",
    "players": 34,
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
          "tie": true
        },
        {
          "result": "B",
          "yellowCenter": true
        }
      ]
    ],
    "stats": {
      "shoe": 23,
      "banker": 12,
      "player": 8,
      "tie": 3
    }
  },
  {
    "id": "speed-c07",
    "title": "Speed C07",
    "image": "/images/casino/baccarat/feo_826_sdx.webp",
    "players": 44,
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
          "result": "P",
          "cornerMark": "blue"
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
        },
        {
          "result": "P"
        }
      ]
    ],
    "stats": {
      "shoe": 24,
      "banker": 11,
      "player": 11,
      "tie": 2
    }
  },
  {
    "id": "speed-c11",
    "title": "Speed C11",
    "image": "/images/casino/baccarat/feo_3261_sdx.webp",
    "players": 13,
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
        },
        {
          "result": "P"
        }
      ]
    ],
    "stats": {
      "shoe": 13,
      "banker": 6,
      "player": 6,
      "tie": 1
    }
  },
  {
    "id": "speed-c16",
    "title": "Speed C16",
    "image": "/images/casino/baccarat/feo_801_sdx.webp",
    "players": 59,
    "category": "baccarat",
    "wins": [
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
      "shoe": 30,
      "banker": 14,
      "player": 16,
      "tie": 0
    }
  },
  {
    "id": "speed-c02",
    "title": "Speed C02",
    "image": "/images/casino/baccarat/feo_816_sdx.webp",
    "players": 121,
    "category": "baccarat",
    "wins": [
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
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "B"
        }
      ]
    ],
    "stats": {
      "shoe": 20,
      "banker": 10,
      "player": 7,
      "tie": 3
    }
  },
  {
    "id": "speed-c05",
    "title": "Speed C05",
    "image": "/images/casino/baccarat/feo_809_sdx.webp",
    "players": 44,
    "category": "baccarat",
    "wins": [
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
          "cornerMark": "red",
          "yellowCenter": true
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
        },
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
          "result": "B",
          "yellowCenter": true
        },
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
          "result": "B",
          "yellowCenter": true,
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
      ]
    ],
    "stats": {
      "shoe": 63,
      "banker": 27,
      "player": 29,
      "tie": 7
    }
  },
  {
    "id": "speed-c10",
    "title": "Speed C10",
    "image": "/images/casino/baccarat/feo_3260_sdx.webp",
    "players": 86,
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
          "cornerMark": "red",
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
      ]
    ],
    "stats": {
      "shoe": 10,
      "banker": 5,
      "player": 4,
      "tie": 1
    }
  },
  {
    "id": "speed-c15",
    "title": "Speed C15",
    "image": "/images/casino/baccarat/feo_828_sdx.webp",
    "players": 55,
    "category": "baccarat",
    "wins": [
      [
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
      "shoe": 28,
      "banker": 15,
      "player": 9,
      "tie": 4
    }
  },
  {
    "id": "speed-c19",
    "title": "Speed C19",
    "image": "/images/casino/baccarat/feo_3712_sdx.webp",
    "players": 69,
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
          "cornerMark": "red"
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
          "yellowCenter": true
        }
      ]
    ],
    "stats": {
      "shoe": 26,
      "banker": 11,
      "player": 10,
      "tie": 5
    }
  },
  {
    "id": "speed-g13",
    "title": "Speed  G13",
    "image": "/images/casino/baccarat/qmf_baccpi1_sdx.webp",
    "players": 52,
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
      "shoe": 19,
      "banker": 9,
      "player": 7,
      "tie": 3
    }
  },
  {
    "id": "speed-m02",
    "title": "Speed M02",
    "image": "/images/casino/baccarat/hbn_bac3155_sdx.webp",
    "players": 68,
    "category": "baccarat",
    "wins": [
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
          "tie": true
        },
        {
          "result": "B"
        }
      ]
    ],
    "stats": {
      "shoe": 23,
      "banker": 12,
      "player": 8,
      "tie": 3
    }
  },
  {
    "id": "speed-m03",
    "title": "Speed M03",
    "image": "/images/casino/baccarat/hbn_bac3157_sdx.webp",
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
          "result": "P"
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
          "result": "B",
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
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "blue",
          "yellowCenter": true
        }
      ]
    ],
    "stats": {
      "shoe": 35,
      "banker": 17,
      "player": 14,
      "tie": 4
    }
  },
  {
    "id": "speed-m04",
    "title": "Speed M04",
    "image": "/images/casino/baccarat/hbn_bac3137_sdx.webp",
    "players": 28,
    "category": "baccarat",
    "wins": [
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
          "tie": true
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
          "result": "B"
        }
      ]
    ],
    "stats": {
      "shoe": 5,
      "banker": 2,
      "player": 2,
      "tie": 1
    }
  },
  {
    "id": "speed-m05",
    "title": "Speed M05",
    "image": "/images/casino/baccarat/hbn_bac5103_sdx.webp",
    "players": 28,
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
      ],
      [
        {
          "result": "P"
        }
      ]
    ],
    "stats": {
      "shoe": 1,
      "banker": 1,
      "player": 0,
      "tie": 0
    }
  },
  {
    "id": "classic-r26",
    "title": "Classic R26",
    "image": "/images/casino/baccarat/uap_EUBAC005_hdx.webp",
    "players": 44,
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
          "result": "P",
          "cornerMark": "red"
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
      ]
    ],
    "stats": {
      "shoe": 47,
      "banker": 26,
      "player": 17,
      "tie": 4
    }
  },
  {
    "id": "classic-r11",
    "title": "Classic R11",
    "image": "/images/casino/baccarat/uap_TWBAC002_sdx.webp",
    "players": 66,
    "category": "baccarat",
    "wins": [
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
      ]
    ],
    "stats": {
      "shoe": 26,
      "banker": 13,
      "player": 10,
      "tie": 3
    }
  },
  {
    "id": "classic-r20",
    "title": "Classic R20",
    "image": "/images/casino/baccarat/uap_PHBAC005_hd.webp",
    "players": 27,
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
        },
        {
          "result": "B"
        }
      ]
    ],
    "stats": {
      "shoe": 8,
      "banker": 5,
      "player": 2,
      "tie": 1
    }
  },
  {
    "id": "classic-v07",
    "title": "Classic V07",
    "image": "/images/casino/baccarat/dfg_353_sdx.webp",
    "players": 51,
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
          "result": "B",
          "cornerMark": "red"
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
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "red",
          "yellowCenter": true
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
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ]
    ],
    "stats": {
      "shoe": 30,
      "banker": 13,
      "player": 15,
      "tie": 2
    }
  },
  {
    "id": "classic-m06",
    "title": "Classic M06",
    "image": "/images/casino/baccarat/hbn_bac-std3216_sdx.webp",
    "players": 31,
    "category": "baccarat",
    "wins": [
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
          "result": "P"
        },
        {
          "result": "P"
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
      ]
    ],
    "stats": {
      "shoe": 43,
      "banker": 22,
      "player": 18,
      "tie": 3
    }
  },
  {
    "id": "classic-r17",
    "title": "Classic R17",
    "image": "/images/casino/baccarat/uap_PHBAC002_hd.webp",
    "players": 51,
    "category": "baccarat",
    "wins": [
      [
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
          "yellowCenter": true
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
        },
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
      "shoe": 34,
      "banker": 13,
      "player": 19,
      "tie": 2
    }
  },
  {
    "id": "classic-m13",
    "title": "Classic M13",
    "image": "/images/casino/baccarat/hbn_bac-std3221_sdx.webp",
    "players": 60,
    "category": "baccarat",
    "wins": [
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
          "yellowCenter": true
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
      ]
    ],
    "stats": {
      "shoe": 21,
      "banker": 6,
      "player": 12,
      "tie": 3
    }
  },
  {
    "id": "classic-v01",
    "title": "Classic V01",
    "image": "/images/casino/baccarat/dfg_27_sdx.webp",
    "players": 29,
    "category": "baccarat",
    "wins": [
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
      "shoe": 5,
      "banker": 2,
      "player": 2,
      "tie": 1
    }
  },
  {
    "id": "classic-m08",
    "title": "Classic M08",
    "image": "/images/casino/baccarat/hbn_bac-std3230_sdx.webp",
    "players": 62,
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
          "result": "B",
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
          "yellowCenter": true
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
          "cornerMark": "blue"
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
        },
        {
          "result": "B",
          "cornerMark": "red",
          "yellowCenter": true
        },
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
        },
        {
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B",
          "cornerMark": "red",
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
        }
      ],
      [
        {
          "result": "B"
        }
      ]
    ],
    "stats": {
      "shoe": 47,
      "banker": 25,
      "player": 15,
      "tie": 7
    }
  },
  {
    "id": "classic-r16",
    "title": "Classic R16",
    "image": "/images/casino/baccarat/uap_PHBAC001_hd.webp",
    "players": 81,
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
          "cornerMark": "red"
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
          "cornerMark": "blue",
          "yellowCenter": true
        },
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
        }
      ],
      [
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
          "yellowCenter": true
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
      "shoe": 37,
      "banker": 11,
      "player": 23,
      "tie": 3
    }
  },
  {
    "id": "classic-r15",
    "title": "Classic R15",
    "image": "/images/casino/baccarat/uap_TWBAC006_sdx.webp",
    "players": 149,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "P",
          "yellowCenter": true,
          "tie": true
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
          "cornerMark": "red",
          "yellowCenter": true
        },
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
          "result": "P",
          "yellowCenter": true
        }
      ]
    ],
    "stats": {
      "shoe": 45,
      "banker": 26,
      "player": 18,
      "tie": 1
    }
  },
  {
    "id": "classic-m07",
    "title": "Classic M07",
    "image": "/images/casino/baccarat/hbn_bac-std3215_sdx.webp",
    "players": 64,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P",
          "cornerMark": "red",
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
          "yellowCenter": true
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
        }
      ]
    ],
    "stats": {
      "shoe": 39,
      "banker": 17,
      "player": 19,
      "tie": 3
    }
  },
  {
    "id": "classic-m12",
    "title": "Classic M12",
    "image": "/images/casino/baccarat/hbn_bac-std5102_sdx.webp",
    "players": 68,
    "category": "baccarat",
    "wins": [
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
          "result": "P",
          "cornerMark": "red"
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
          "result": "B",
          "cornerMark": "red",
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
      ]
    ],
    "stats": {
      "shoe": 35,
      "banker": 19,
      "player": 13,
      "tie": 3
    }
  },
  {
    "id": "classic-r22",
    "title": "Classic R22",
    "image": "/images/casino/baccarat/uap_EUBAC001_hdx.webp",
    "players": 62,
    "category": "baccarat",
    "wins": [
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
      "shoe": 50,
      "banker": 29,
      "player": 17,
      "tie": 4
    }
  },
  {
    "id": "classic-v04",
    "title": "Classic V04",
    "image": "/images/casino/baccarat/dfg_350_sdx.webp",
    "players": 63,
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
      "shoe": 30,
      "banker": 17,
      "player": 9,
      "tie": 4
    }
  },
  {
    "id": "classic-v09",
    "title": "Classic V09",
    "image": "/images/casino/baccarat/dfg_355_sdx.webp",
    "players": 39,
    "category": "baccarat",
    "wins": [
      [
        {
          "result": "B",
          "yellowCenter": true
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
          "result": "P",
          "yellowCenter": true,
          "tie": true
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
          "result": "P",
          "yellowCenter": true
        },
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
        },
        {
          "result": "P",
          "cornerMark": "red",
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
          "cornerMark": "red"
        }
      ]
    ],
    "stats": {
      "shoe": 55,
      "banker": 24,
      "player": 25,
      "tie": 6
    }
  },
  {
    "id": "classic-m10",
    "title": "Classic M10",
    "image": "/images/casino/baccarat/hbn_bac-std3232_sdx.webp",
    "players": 38,
    "category": "baccarat",
    "wins": [
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
          "yellowCenter": true,
          "tie": true
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
          "cornerMark": "red"
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
        }
      ]
    ],
    "stats": {
      "shoe": 37,
      "banker": 16,
      "player": 20,
      "tie": 1
    }
  },
  {
    "id": "classic-v11",
    "title": "Classic V11",
    "image": "/images/casino/baccarat/dfg_77844_sdx.webp",
    "players": 15,
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
          "result": "B"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "red",
          "yellowCenter": true
        },
        {
          "result": "P",
          "yellowCenter": true
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
        },
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
      "shoe": 22,
      "banker": 9,
      "player": 8,
      "tie": 5
    }
  },
  {
    "id": "classic-r10",
    "title": "Classic R10",
    "image": "/images/casino/baccarat/uap_TWBAC001_sdx.webp",
    "players": 64,
    "category": "baccarat",
    "wins": [
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
        }
      ],
      [
        {
          "result": "P"
        }
      ]
    ],
    "stats": {
      "shoe": 24,
      "banker": 7,
      "player": 14,
      "tie": 3
    }
  },
  {
    "id": "classic-r12",
    "title": "Classic R12",
    "image": "/images/casino/baccarat/uap_TWBAC003_sdx.webp",
    "players": 79,
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
          "cornerMark": "red"
        }
      ]
    ],
    "stats": {
      "shoe": 33,
      "banker": 15,
      "player": 15,
      "tie": 3
    }
  },
  {
    "id": "classic-r13",
    "title": "Classic R13",
    "image": "/images/casino/baccarat/uap_TWBAC004_sdx.webp",
    "players": 68,
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
          "yellowCenter": true
        }
      ]
    ],
    "stats": {
      "shoe": 3,
      "banker": 1,
      "player": 2,
      "tie": 0
    }
  },
  {
    "id": "classic-r14",
    "title": "Classic R14",
    "image": "/images/casino/baccarat/uap_TWBAC005_sdx.webp",
    "players": 69,
    "category": "baccarat",
    "wins": [
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
      "shoe": 6,
      "banker": 2,
      "player": 4,
      "tie": 0
    }
  },
  {
    "id": "classic-r18",
    "title": "Classic R18",
    "image": "/images/casino/baccarat/uap_PHBAC003_hd.webp",
    "players": 40,
    "category": "baccarat",
    "wins": [
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
          "result": "P",
          "yellowCenter": true
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
          "cornerMark": "red"
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
          "yellowCenter": true
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
          "result": "P",
          "cornerMark": "blue"
        },
        {
          "result": "P",
          "yellowCenter": true
        }
      ]
    ],
    "stats": {
      "shoe": 54,
      "banker": 25,
      "player": 25,
      "tie": 4
    }
  },
  {
    "id": "classic-r19",
    "title": "Classic R19",
    "image": "/images/casino/baccarat/uap_PHBAC004_hd.webp",
    "players": 31,
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
          "yellowCenter": true
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
      ],
      [
        {
          "result": "B"
        }
      ]
    ],
    "stats": {
      "shoe": 30,
      "banker": 15,
      "player": 13,
      "tie": 2
    }
  },
  {
    "id": "classic-r21",
    "title": "Classic R21",
    "image": "/images/casino/baccarat/uap_PHBAC006_hd.webp",
    "players": 77,
    "category": "baccarat",
    "wins": [
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
          "cornerMark": "blue"
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
        },
        {
          "result": "P",
          "yellowCenter": true,
          "tie": true
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
        },
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
      "shoe": 51,
      "banker": 19,
      "player": 25,
      "tie": 7
    }
  },
  {
    "id": "classic-r23",
    "title": "Classic R23",
    "image": "/images/casino/baccarat/uap_EUBAC002_hdx.webp",
    "players": 43,
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
          "yellowCenter": true,
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
      ]
    ],
    "stats": {
      "shoe": 29,
      "banker": 12,
      "player": 13,
      "tie": 4
    }
  },
  {
    "id": "classic-r24",
    "title": "Classic R24",
    "image": "/images/casino/baccarat/uap_EUBAC003_hdx.webp",
    "players": 75,
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
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P",
          "yellowCenter": true
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
          "cornerMark": "red",
          "yellowCenter": true
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
          "yellowCenter": true
        },
        {
          "result": "B",
          "cornerMark": "red",
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
        },
        {
          "result": "B",
          "cornerMark": "blue"
        }
      ],
      [
        {
          "result": "P",
          "cornerMark": "red",
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
          "result": "P",
          "yellowCenter": true
        },
        {
          "result": "P",
          "yellowCenter": true
        },
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
        }
      ]
    ],
    "stats": {
      "shoe": 56,
      "banker": 23,
      "player": 27,
      "tie": 6
    }
  },
  {
    "id": "classic-r25",
    "title": "Classic R25",
    "image": "/images/casino/baccarat/uap_EUBAC004_hdx.webp",
    "players": 30,
    "category": "baccarat",
    "wins": [
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
          "result": "B",
          "yellowCenter": true
        },
        {
          "result": "B",
          "cornerMark": "red",
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
        }
      ]
    ],
    "stats": {
      "shoe": 56,
      "banker": 26,
      "player": 26,
      "tie": 4
    }
  },
  {
    "id": "classic-v02",
    "title": "Classic V02",
    "image": "/images/casino/baccarat/dfg_348_sdx.webp",
    "players": 50,
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
          "result": "P"
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
          "tie": true
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
          "cornerMark": "red",
          "yellowCenter": true
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
      "shoe": 27,
      "banker": 9,
      "player": 14,
      "tie": 4
    }
  },
  {
    "id": "classic-v03",
    "title": "Classic V03",
    "image": "/images/casino/baccarat/dfg_349_sdx.webp",
    "players": 23,
    "category": "baccarat",
    "wins": [
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
          "result": "P",
          "cornerMark": "blue",
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
          "result": "P"
        }
      ]
    ],
    "stats": {
      "shoe": 21,
      "banker": 9,
      "player": 8,
      "tie": 4
    }
  },
  {
    "id": "classic-v05",
    "title": "Classic V05",
    "image": "/images/casino/baccarat/dfg_351_sdx.webp",
    "players": 75,
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
          "cornerMark": "red"
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
          "cornerMark": "red"
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
      "shoe": 31,
      "banker": 14,
      "player": 14,
      "tie": 3
    }
  }
]

export const DRAGON_TIGER: LiveCasinoTable[] = [
  {
    "id": "dragon-tiger-c01",
    "title": "Dragon Tiger C01",
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
    "id": "dragon-tiger-v01",
    "title": "Dragon Tiger V01",
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
]

export const ROULETTE: LiveCasinoTable[] = [
  {
    "id": "roulette-c01",
    "title": "Roulette C01",
    "image": "/images/casino/roulette/spdk1_imr_med_M.webp",
    "players": 91,
    "category": "roulette",
    "wins": [["B", 31], ["B", 6], ["R", 12], ["B", 10], ["R", 3], ["R", 12], ["B", 2], ["R", 5], ["R", 5], ["B", 10]]
  },
  {
    "id": "roulette-c03",
    "title": "Roulette C03",
    "image": "/images/casino/roulette/lrm1_imr_med_M.webp",
    "players": 46,
    "category": "roulette",
    "wins": [["B", 24], ["R", 25], ["B", 35], ["R", 27], ["B", 10], ["B", 10], ["R", 12], ["B", 6]]
  },
  {
    "id": "treasure-roulette-c05",
    "title": "Treasure Roulette C05",
    "image": "/images/casino/roulette/genr1_ss_thumb_med_M.webp",
    "players": 282,
    "category": "roulette",
    "wins": [["R", 1], ["R", 27], ["B", 8], ["B", 13], ["B", 4], ["B", 26], ["B", 35], ["B", 20]]
  },
  {
    "id": "roulette-c06",
    "title": "Roulette C06",
    "image": "/images/casino/roulette/green_imr_med_M.webp",
    "players": 179,
    "category": "roulette",
    "wins": [["R", 16], ["G", 0], ["B", 10], ["R", 3], ["B", 28], ["R", 32], ["R", 25], ["B", 31]]
  },
  {
    "id": "roulette-c07",
    "title": "Roulette C07",
    "image": "/images/casino/roulette/rng_salonpriveautoroulette_med_M.webp",
    "players": 0,
    "category": "roulette",
    "wins": [["R", 9], ["B", 35], ["G", 0], ["B", 4], ["R", 34], ["B", 33], ["B", 8], ["R", 1]]
  },
  {
    "id": "roulette-v01",
    "title": "Roulette V01",
    "image": "/images/casino/roulette/immersive_med_M.webp",
    "players": 465,
    "category": "roulette",
    "wins": [["R", 32], ["R", 34], ["R", 21], ["B", 8], ["G", 0], ["B", 6], ["B", 8], ["B", 4]]
  },
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
