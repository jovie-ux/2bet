export type PredictionSport = 'soccer' | 'basketball'
export type PredictionMarketType = '1X2' | 'Over / Under' | 'Handicap'

export interface ExpertPredictor {
  /** Unique row id from the predictor list. */
  id: string
  /** Display slug. Names are not guaranteed to be unique. */
  predictorId: string
  predictorName: string
  predictorAvatar: string
  hitRate: number
  winStreak?: string
  currentPredictions?: number
  sport?: PredictionSport
}

export interface PredictionOption {
  label: string
  odd: string
}

export interface Prediction {
  id: string
  predictorId: string
  predictorName: string
  predictorAvatar: string
  publishedAgo: string
  hitRate: number
  marketType: PredictionMarketType
  sport: PredictionSport
  league: string
  matchTime: string
  homeTeam: string
  awayTeam: string
  options: PredictionOption[]
  matchId?: string
  competitionLogo?: string
  homeTeamLogo?: string
  awayTeamLogo?: string
  matchTimeUtc?: string
  selection?: string
  line?: string | null
  currentOdds?: number
  winStreak?: string
  unlocked?: boolean
}

export interface PredictionsResponse {
  predictions: Prediction[]
  commenceTimeFrom: string
  commenceTimeTo: string
}

export const EXPERT_PREDICTORS: ExpertPredictor[] = [
  {
    "id": "pred-1",
    "predictorId": "cahir",
    "predictorName": "Cahir",
    "predictorAvatar": "/images/predictions/cahir.webp",
    "hitRate": 59.39,
    "sport": "basketball"
  },
  {
    "id": "pred-2",
    "predictorId": "tyrek",
    "predictorName": "Tyrek",
    "predictorAvatar": "/images/predictions/tyrek.webp",
    "hitRate": 59.25,
    "sport": "basketball"
  },
  {
    "id": "pred-3",
    "predictorId": "zeffirelli",
    "predictorName": "Zeffirelli",
    "predictorAvatar": "/images/predictions/zeffirelli.webp",
    "hitRate": 59.18,
    "sport": "basketball"
  },
  {
    "id": "pred-4",
    "predictorId": "dan",
    "predictorName": "Dan",
    "predictorAvatar": "/images/predictions/dan.webp",
    "hitRate": 59.11,
    "winStreak": "2x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-5",
    "predictorId": "daenerys",
    "predictorName": "Daenerys",
    "predictorAvatar": "/images/predictions/daenerys.webp",
    "hitRate": 58.95,
    "winStreak": "2x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-6",
    "predictorId": "tyrion",
    "predictorName": "Tyrion",
    "predictorAvatar": "/images/predictions/tyrion.webp",
    "hitRate": 58.88,
    "sport": "basketball"
  },
  {
    "id": "pred-7",
    "predictorId": "wehinahpay",
    "predictorName": "Wehinahpay",
    "predictorAvatar": "/images/predictions/wehinahpay.webp",
    "hitRate": 58.82,
    "sport": "basketball"
  },
  {
    "id": "pred-8",
    "predictorId": "aleem",
    "predictorName": "Aleem",
    "predictorAvatar": "/images/predictions/aleem.webp",
    "hitRate": 58.78,
    "sport": "basketball"
  },
  {
    "id": "pred-9",
    "predictorId": "heller",
    "predictorName": "Heller",
    "predictorAvatar": "/images/predictions/heller.webp",
    "hitRate": 58.74,
    "sport": "basketball"
  },
  {
    "id": "pred-10",
    "predictorId": "yaal",
    "predictorName": "Yaal",
    "predictorAvatar": "/images/predictions/yaal.webp",
    "hitRate": 58.7,
    "sport": "basketball"
  },
  {
    "id": "pred-11",
    "predictorId": "lander",
    "predictorName": "Lander",
    "predictorAvatar": "/images/predictions/lander.webp",
    "hitRate": 58.59,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-12",
    "predictorId": "hiroaki",
    "predictorName": "Hiroaki",
    "predictorAvatar": "/images/predictions/hiroaki.webp",
    "hitRate": 58.59,
    "sport": "basketball"
  },
  {
    "id": "pred-13",
    "predictorId": "cisco",
    "predictorName": "Cisco",
    "predictorAvatar": "/images/predictions/cisco.webp",
    "hitRate": 58.57,
    "winStreak": "2x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-14",
    "predictorId": "kiango",
    "predictorName": "Kiango",
    "predictorAvatar": "/images/predictions/kiango.webp",
    "hitRate": 58.56,
    "sport": "basketball"
  },
  {
    "id": "pred-15",
    "predictorId": "alastor",
    "predictorName": "Alastor",
    "predictorAvatar": "/images/predictions/alastor.webp",
    "hitRate": 58.56,
    "sport": "basketball"
  },
  {
    "id": "pred-16",
    "predictorId": "marsha",
    "predictorName": "Marsha",
    "predictorAvatar": "/images/predictions/marsha.webp",
    "hitRate": 58.49,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-17",
    "predictorId": "zorro",
    "predictorName": "Zorro",
    "predictorAvatar": "/images/predictions/zorro.webp",
    "hitRate": 58.47,
    "sport": "basketball"
  },
  {
    "id": "pred-18",
    "predictorId": "kismet",
    "predictorName": "Kismet",
    "predictorAvatar": "/images/predictions/kismet.webp",
    "hitRate": 58.4,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-19",
    "predictorId": "lester",
    "predictorName": "Lester",
    "predictorAvatar": "/images/predictions/lester.webp",
    "hitRate": 58.33,
    "sport": "basketball"
  },
  {
    "id": "pred-20",
    "predictorId": "terrence",
    "predictorName": "Terrence",
    "predictorAvatar": "/images/predictions/terrence.webp",
    "hitRate": 58.31,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-21",
    "predictorId": "aihe",
    "predictorName": "Aihe",
    "predictorAvatar": "/images/predictions/aihe.webp",
    "hitRate": 58.3,
    "sport": "basketball"
  },
  {
    "id": "pred-22",
    "predictorId": "daemyn",
    "predictorName": "Daemyn",
    "predictorAvatar": "/images/predictions/daemyn.webp",
    "hitRate": 58.29,
    "sport": "basketball"
  },
  {
    "id": "pred-23",
    "predictorId": "benji",
    "predictorName": "Benji",
    "predictorAvatar": "/images/predictions/benji.webp",
    "hitRate": 58.23,
    "sport": "basketball"
  },
  {
    "id": "pred-24",
    "predictorId": "dipaka",
    "predictorName": "Dipaka",
    "predictorAvatar": "/images/predictions/dipaka.webp",
    "hitRate": 58.21,
    "sport": "basketball"
  },
  {
    "id": "pred-25",
    "predictorId": "jaycob",
    "predictorName": "Jaycob",
    "predictorAvatar": "/images/predictions/jaycob.webp",
    "hitRate": 58.19,
    "sport": "basketball"
  },
  {
    "id": "pred-26",
    "predictorId": "ezio",
    "predictorName": "Ezio",
    "predictorAvatar": "/images/predictions/ezio.webp",
    "hitRate": 58.17,
    "winStreak": "2x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-27",
    "predictorId": "yanisin",
    "predictorName": "Yanisin",
    "predictorAvatar": "/images/predictions/yanisin.webp",
    "hitRate": 58.16,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-28",
    "predictorId": "gillis",
    "predictorName": "Gillis",
    "predictorAvatar": "/images/predictions/gillis.webp",
    "hitRate": 58.15,
    "sport": "basketball"
  },
  {
    "id": "pred-29",
    "predictorId": "jalie",
    "predictorName": "Jalie",
    "predictorAvatar": "/images/predictions/jalie.webp",
    "hitRate": 58.06,
    "sport": "basketball"
  },
  {
    "id": "pred-30",
    "predictorId": "arlo",
    "predictorName": "Arlo",
    "predictorAvatar": "/images/predictions/arlo.webp",
    "hitRate": 58.04,
    "sport": "basketball"
  },
  {
    "id": "pred-31",
    "predictorId": "rod",
    "predictorName": "Rod",
    "predictorAvatar": "/images/predictions/rod.webp",
    "hitRate": 58.02,
    "sport": "basketball"
  },
  {
    "id": "pred-32",
    "predictorId": "mariela",
    "predictorName": "Mariela",
    "predictorAvatar": "/images/predictions/mariela.webp",
    "hitRate": 57.97,
    "sport": "basketball"
  },
  {
    "id": "pred-33",
    "predictorId": "hekili",
    "predictorName": "Hekili",
    "predictorAvatar": "/images/predictions/hekili.webp",
    "hitRate": 57.95,
    "sport": "basketball"
  },
  {
    "id": "pred-34",
    "predictorId": "zaccheus",
    "predictorName": "Zaccheus",
    "predictorAvatar": "/images/predictions/zaccheus.webp",
    "hitRate": 57.94,
    "sport": "basketball"
  },
  {
    "id": "pred-35",
    "predictorId": "jeroen",
    "predictorName": "Jeroen",
    "predictorAvatar": "/images/predictions/jeroen.webp",
    "hitRate": 57.93,
    "sport": "basketball"
  },
  {
    "id": "pred-36",
    "predictorId": "irving",
    "predictorName": "Irving",
    "predictorAvatar": "/images/predictions/irving.webp",
    "hitRate": 57.92,
    "sport": "basketball"
  },
  {
    "id": "pred-37",
    "predictorId": "dennis",
    "predictorName": "Dennis",
    "predictorAvatar": "/images/predictions/dennis.webp",
    "hitRate": 57.89,
    "sport": "basketball"
  },
  {
    "id": "pred-38",
    "predictorId": "gilbert",
    "predictorName": "Gilbert",
    "predictorAvatar": "/images/predictions/gilbert.webp",
    "hitRate": 57.89,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-39",
    "predictorId": "warren",
    "predictorName": "Warren",
    "predictorAvatar": "/images/predictions/warren.webp",
    "hitRate": 57.83,
    "sport": "basketball"
  },
  {
    "id": "pred-40",
    "predictorId": "josue",
    "predictorName": "Josue",
    "predictorAvatar": "/images/predictions/josue.webp",
    "hitRate": 57.82,
    "sport": "basketball"
  },
  {
    "id": "pred-41",
    "predictorId": "neal",
    "predictorName": "Neal",
    "predictorAvatar": "/images/predictions/neal.webp",
    "hitRate": 57.82,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-42",
    "predictorId": "jagannatha",
    "predictorName": "Jagannatha",
    "predictorAvatar": "/images/predictions/jagannatha.webp",
    "hitRate": 57.79,
    "sport": "basketball"
  },
  {
    "id": "pred-43",
    "predictorId": "wolfgang",
    "predictorName": "Wolfgang",
    "predictorAvatar": "/images/predictions/wolfgang.webp",
    "hitRate": 57.76,
    "sport": "basketball"
  },
  {
    "id": "pred-44",
    "predictorId": "kaushal",
    "predictorName": "Kaushal",
    "predictorAvatar": "/images/predictions/kaushal.webp",
    "hitRate": 57.74,
    "sport": "basketball"
  },
  {
    "id": "pred-45",
    "predictorId": "viliulfo",
    "predictorName": "Viliulfo",
    "predictorAvatar": "/images/predictions/viliulfo.webp",
    "hitRate": 57.74,
    "sport": "basketball"
  },
  {
    "id": "pred-46",
    "predictorId": "juvaughn",
    "predictorName": "JuVaughn",
    "predictorAvatar": "/images/predictions/juvaughn.webp",
    "hitRate": 57.73,
    "sport": "basketball"
  },
  {
    "id": "pred-47",
    "predictorId": "caius",
    "predictorName": "Caius",
    "predictorAvatar": "/images/predictions/caius.webp",
    "hitRate": 57.73,
    "sport": "basketball"
  },
  {
    "id": "pred-48",
    "predictorId": "meurig",
    "predictorName": "Meurig",
    "predictorAvatar": "/images/predictions/meurig.webp",
    "hitRate": 57.73,
    "sport": "basketball"
  },
  {
    "id": "pred-49",
    "predictorId": "kamron",
    "predictorName": "Kamron",
    "predictorAvatar": "/images/predictions/kamron.webp",
    "hitRate": 57.71,
    "sport": "basketball"
  },
  {
    "id": "pred-50",
    "predictorId": "adwin",
    "predictorName": "Adwin",
    "predictorAvatar": "/images/predictions/adwin.webp",
    "hitRate": 57.71,
    "sport": "basketball"
  },
  {
    "id": "pred-51",
    "predictorId": "trory",
    "predictorName": "Trory",
    "predictorAvatar": "/images/predictions/trory.webp",
    "hitRate": 57.71,
    "winStreak": "3x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-52",
    "predictorId": "cemach",
    "predictorName": "Cemach",
    "predictorAvatar": "/images/predictions/cemach.webp",
    "hitRate": 57.7,
    "sport": "basketball"
  },
  {
    "id": "pred-53",
    "predictorId": "marvin",
    "predictorName": "Marvin",
    "predictorAvatar": "/images/predictions/marvin.webp",
    "hitRate": 57.67,
    "sport": "basketball"
  },
  {
    "id": "pred-54",
    "predictorId": "sanford",
    "predictorName": "Sanford",
    "predictorAvatar": "/images/predictions/sanford.webp",
    "hitRate": 57.62,
    "sport": "basketball"
  },
  {
    "id": "pred-55",
    "predictorId": "vince",
    "predictorName": "Vince",
    "predictorAvatar": "/images/predictions/vince.webp",
    "hitRate": 57.59,
    "winStreak": "3x wins",
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-56",
    "predictorId": "donny",
    "predictorName": "Donny",
    "predictorAvatar": "/images/predictions/donny.webp",
    "hitRate": 57.59,
    "winStreak": "2x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-57",
    "predictorId": "yaro",
    "predictorName": "Yaro",
    "predictorAvatar": "/images/predictions/yaro.webp",
    "hitRate": 57.58,
    "sport": "basketball"
  },
  {
    "id": "pred-58",
    "predictorId": "clovis",
    "predictorName": "Clovis",
    "predictorAvatar": "/images/predictions/clovis.webp",
    "hitRate": 57.56,
    "sport": "basketball"
  },
  {
    "id": "pred-59",
    "predictorId": "hercule",
    "predictorName": "Hercule",
    "predictorAvatar": "/images/predictions/hercule.webp",
    "hitRate": 57.56,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-60",
    "predictorId": "pasquale",
    "predictorName": "Pasquale",
    "predictorAvatar": "/images/predictions/pasquale.webp",
    "hitRate": 57.56,
    "sport": "basketball"
  },
  {
    "id": "pred-61",
    "predictorId": "meo",
    "predictorName": "Meo",
    "predictorAvatar": "/images/predictions/meo.webp",
    "hitRate": 57.54,
    "sport": "basketball"
  },
  {
    "id": "pred-62",
    "predictorId": "jamir",
    "predictorName": "Jamir",
    "predictorAvatar": "/images/predictions/jamir.webp",
    "hitRate": 57.53,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-63",
    "predictorId": "lieven",
    "predictorName": "Lieven",
    "predictorAvatar": "/images/predictions/lieven.webp",
    "hitRate": 57.51,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-64",
    "predictorId": "moshon",
    "predictorName": "Moshon",
    "predictorAvatar": "/images/predictions/moshon.webp",
    "hitRate": 57.5,
    "sport": "basketball"
  },
  {
    "id": "pred-65",
    "predictorId": "sion",
    "predictorName": "Sion",
    "predictorAvatar": "/images/predictions/sion.webp",
    "hitRate": 57.5,
    "sport": "basketball"
  },
  {
    "id": "pred-66",
    "predictorId": "celestine",
    "predictorName": "Celestine",
    "predictorAvatar": "/images/predictions/celestine.webp",
    "hitRate": 57.49,
    "sport": "basketball"
  },
  {
    "id": "pred-67",
    "predictorId": "colston",
    "predictorName": "Colston",
    "predictorAvatar": "/images/predictions/colston.webp",
    "hitRate": 57.47,
    "sport": "basketball"
  },
  {
    "id": "pred-68",
    "predictorId": "ernest",
    "predictorName": "Ernest",
    "predictorAvatar": "/images/predictions/ernest.webp",
    "hitRate": 57.47,
    "sport": "basketball"
  },
  {
    "id": "pred-69",
    "predictorId": "bakari",
    "predictorName": "Bakari",
    "predictorAvatar": "/images/predictions/bakari.webp",
    "hitRate": 57.45,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-70",
    "predictorId": "arfryn",
    "predictorName": "Arfryn",
    "predictorAvatar": "/images/predictions/arfryn.webp",
    "hitRate": 57.44,
    "sport": "basketball"
  },
  {
    "id": "pred-71",
    "predictorId": "colton",
    "predictorName": "Colton",
    "predictorAvatar": "/images/predictions/colton.webp",
    "hitRate": 57.42,
    "sport": "basketball"
  },
  {
    "id": "pred-72",
    "predictorId": "uziah",
    "predictorName": "Uziah",
    "predictorAvatar": "/images/predictions/uziah.webp",
    "hitRate": 57.42,
    "sport": "basketball"
  },
  {
    "id": "pred-73",
    "predictorId": "kumar",
    "predictorName": "Kumar",
    "predictorAvatar": "/images/predictions/kumar.webp",
    "hitRate": 57.41,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-74",
    "predictorId": "hamish",
    "predictorName": "Hamish",
    "predictorAvatar": "/images/predictions/hamish.webp",
    "hitRate": 57.39,
    "sport": "basketball"
  },
  {
    "id": "pred-75",
    "predictorId": "carew",
    "predictorName": "Carew",
    "predictorAvatar": "/images/predictions/carew.webp",
    "hitRate": 57.35,
    "sport": "basketball"
  },
  {
    "id": "pred-76",
    "predictorId": "osher",
    "predictorName": "Osher",
    "predictorAvatar": "/images/predictions/osher.webp",
    "hitRate": 57.34,
    "sport": "basketball"
  },
  {
    "id": "pred-77",
    "predictorId": "shukri",
    "predictorName": "Shukri",
    "predictorAvatar": "/images/predictions/shukri.webp",
    "hitRate": 57.34,
    "sport": "basketball"
  },
  {
    "id": "pred-78",
    "predictorId": "creon",
    "predictorName": "Creon",
    "predictorAvatar": "/images/predictions/creon.webp",
    "hitRate": 57.33,
    "sport": "basketball"
  },
  {
    "id": "pred-79",
    "predictorId": "feng",
    "predictorName": "Feng",
    "predictorAvatar": "/images/predictions/feng.webp",
    "hitRate": 57.32,
    "sport": "basketball"
  },
  {
    "id": "pred-80",
    "predictorId": "teo",
    "predictorName": "Teo",
    "predictorAvatar": "/images/predictions/teo.webp",
    "hitRate": 57.28,
    "sport": "basketball"
  },
  {
    "id": "pred-81",
    "predictorId": "chalsie",
    "predictorName": "Chalsie",
    "predictorAvatar": "/images/predictions/chalsie.webp",
    "hitRate": 57.27,
    "sport": "basketball"
  },
  {
    "id": "pred-82",
    "predictorId": "eytan",
    "predictorName": "Eytan",
    "predictorAvatar": "/images/predictions/eytan.webp",
    "hitRate": 57.25,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-83",
    "predictorId": "octavio",
    "predictorName": "Octavio",
    "predictorAvatar": "/images/predictions/octavio.webp",
    "hitRate": 57.23,
    "currentPredictions": 3,
    "sport": "basketball"
  },
  {
    "id": "pred-84",
    "predictorId": "sorley",
    "predictorName": "Sorley",
    "predictorAvatar": "/images/predictions/sorley.webp",
    "hitRate": 57.23,
    "winStreak": "2x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-85",
    "predictorId": "manabu",
    "predictorName": "Manabu",
    "predictorAvatar": "/images/predictions/manabu.webp",
    "hitRate": 57.23,
    "sport": "basketball"
  },
  {
    "id": "pred-86",
    "predictorId": "yeshua",
    "predictorName": "Yeshua",
    "predictorAvatar": "/images/predictions/yeshua.webp",
    "hitRate": 57.23,
    "sport": "basketball"
  },
  {
    "id": "pred-87",
    "predictorId": "genkei",
    "predictorName": "Genkei",
    "predictorAvatar": "/images/predictions/genkei.webp",
    "hitRate": 57.23,
    "sport": "basketball"
  },
  {
    "id": "pred-88",
    "predictorId": "hansel",
    "predictorName": "Hansel",
    "predictorAvatar": "/images/predictions/hansel.webp",
    "hitRate": 57.21,
    "winStreak": "2x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-89",
    "predictorId": "elior",
    "predictorName": "Elior",
    "predictorAvatar": "/images/predictions/elior.webp",
    "hitRate": 57.21,
    "sport": "basketball"
  },
  {
    "id": "pred-90",
    "predictorId": "charaka",
    "predictorName": "Charaka",
    "predictorAvatar": "/images/predictions/charaka.webp",
    "hitRate": 57.18,
    "sport": "basketball"
  },
  {
    "id": "pred-91",
    "predictorId": "biagio",
    "predictorName": "Biagio",
    "predictorAvatar": "/images/predictions/biagio.webp",
    "hitRate": 57.16,
    "sport": "basketball"
  },
  {
    "id": "pred-92",
    "predictorId": "zafer",
    "predictorName": "Zafer",
    "predictorAvatar": "/images/predictions/zafer.webp",
    "hitRate": 57.14,
    "sport": "basketball"
  },
  {
    "id": "pred-93",
    "predictorId": "efren",
    "predictorName": "Efren",
    "predictorAvatar": "/images/predictions/efren.webp",
    "hitRate": 57.14,
    "sport": "basketball"
  },
  {
    "id": "pred-94",
    "predictorId": "kadyn",
    "predictorName": "Kadyn",
    "predictorAvatar": "/images/predictions/kadyn.webp",
    "hitRate": 57.12,
    "winStreak": "4x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-95",
    "predictorId": "kevork",
    "predictorName": "Kevork",
    "predictorAvatar": "/images/predictions/kevork.webp",
    "hitRate": 57.11,
    "sport": "basketball"
  },
  {
    "id": "pred-96",
    "predictorId": "adymn",
    "predictorName": "Adymn",
    "predictorAvatar": "/images/predictions/adymn.webp",
    "hitRate": 57.09,
    "sport": "basketball"
  },
  {
    "id": "pred-97",
    "predictorId": "helge",
    "predictorName": "Helge",
    "predictorAvatar": "/images/predictions/helge.webp",
    "hitRate": 57.09,
    "sport": "basketball"
  },
  {
    "id": "pred-98",
    "predictorId": "illyria",
    "predictorName": "Illyria",
    "predictorAvatar": "/images/predictions/illyria.webp",
    "hitRate": 57.05,
    "sport": "basketball"
  },
  {
    "id": "pred-99",
    "predictorId": "aarav",
    "predictorName": "Aarav",
    "predictorAvatar": "/images/predictions/aarav.webp",
    "hitRate": 57.04,
    "sport": "basketball"
  },
  {
    "id": "pred-100",
    "predictorId": "spurius",
    "predictorName": "Spurius",
    "predictorAvatar": "/images/predictions/spurius.webp",
    "hitRate": 57.03,
    "sport": "basketball"
  },
  {
    "id": "pred-101",
    "predictorId": "baki",
    "predictorName": "Baki",
    "predictorAvatar": "/images/predictions/baki.webp",
    "hitRate": 57,
    "sport": "basketball"
  },
  {
    "id": "pred-102",
    "predictorId": "rockwell",
    "predictorName": "Rockwell",
    "predictorAvatar": "/images/predictions/rockwell.webp",
    "hitRate": 56.99,
    "sport": "basketball"
  },
  {
    "id": "pred-103",
    "predictorId": "feivel",
    "predictorName": "Feivel",
    "predictorAvatar": "/images/predictions/feivel.webp",
    "hitRate": 56.95,
    "winStreak": "3x wins",
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-104",
    "predictorId": "mandla",
    "predictorName": "Mandla",
    "predictorAvatar": "/images/predictions/mandla.webp",
    "hitRate": 56.93,
    "sport": "basketball"
  },
  {
    "id": "pred-105",
    "predictorId": "maxx",
    "predictorName": "Maxx",
    "predictorAvatar": "/images/predictions/maxx.webp",
    "hitRate": 56.93,
    "sport": "basketball"
  },
  {
    "id": "pred-106",
    "predictorId": "erast",
    "predictorName": "Erast",
    "predictorAvatar": "/images/predictions/erast.webp",
    "hitRate": 56.91,
    "sport": "basketball"
  },
  {
    "id": "pred-107",
    "predictorId": "talmon",
    "predictorName": "Talmon",
    "predictorAvatar": "/images/predictions/talmon.webp",
    "hitRate": 56.91,
    "sport": "basketball"
  },
  {
    "id": "pred-108",
    "predictorId": "benek",
    "predictorName": "Benek",
    "predictorAvatar": "/images/predictions/benek.webp",
    "hitRate": 56.89,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-109",
    "predictorId": "fintan",
    "predictorName": "Fintan",
    "predictorAvatar": "/images/predictions/fintan.webp",
    "hitRate": 56.89,
    "sport": "basketball"
  },
  {
    "id": "pred-110",
    "predictorId": "dhaval",
    "predictorName": "Dhaval",
    "predictorAvatar": "/images/predictions/dhaval.webp",
    "hitRate": 56.86,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-111",
    "predictorId": "gamaliel",
    "predictorName": "Gamaliel",
    "predictorAvatar": "/images/predictions/gamaliel.webp",
    "hitRate": 56.86,
    "sport": "basketball"
  },
  {
    "id": "pred-112",
    "predictorId": "ringo",
    "predictorName": "Ringo",
    "predictorAvatar": "/images/predictions/ringo.webp",
    "hitRate": 56.86,
    "sport": "basketball"
  },
  {
    "id": "pred-113",
    "predictorId": "eliud",
    "predictorName": "Eliud",
    "predictorAvatar": "/images/predictions/eliud.webp",
    "hitRate": 56.86,
    "sport": "basketball"
  },
  {
    "id": "pred-114",
    "predictorId": "sancho",
    "predictorName": "Sancho",
    "predictorAvatar": "/images/predictions/sancho.webp",
    "hitRate": 56.86,
    "sport": "basketball"
  },
  {
    "id": "pred-115",
    "predictorId": "arnie",
    "predictorName": "Arnie",
    "predictorAvatar": "/images/predictions/arnie.webp",
    "hitRate": 56.83,
    "sport": "basketball"
  },
  {
    "id": "pred-116",
    "predictorId": "deegan",
    "predictorName": "Deegan",
    "predictorAvatar": "/images/predictions/deegan.webp",
    "hitRate": 56.82,
    "sport": "basketball"
  },
  {
    "id": "pred-117",
    "predictorId": "azhar",
    "predictorName": "Azhar",
    "predictorAvatar": "/images/predictions/azhar.webp",
    "hitRate": 56.75,
    "winStreak": "2x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-118",
    "predictorId": "renatus",
    "predictorName": "Renatus",
    "predictorAvatar": "/images/predictions/renatus.webp",
    "hitRate": 56.75,
    "sport": "basketball"
  },
  {
    "id": "pred-119",
    "predictorId": "jaxxon",
    "predictorName": "Jaxxon",
    "predictorAvatar": "/images/predictions/jaxxon.webp",
    "hitRate": 56.73,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-120",
    "predictorId": "shahryar",
    "predictorName": "Shahryar",
    "predictorAvatar": "/images/predictions/shahryar.webp",
    "hitRate": 56.72,
    "winStreak": "3x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-121",
    "predictorId": "saddam",
    "predictorName": "Saddam",
    "predictorAvatar": "/images/predictions/saddam.webp",
    "hitRate": 56.71,
    "winStreak": "2x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-122",
    "predictorId": "din",
    "predictorName": "Din",
    "predictorAvatar": "/images/predictions/din.webp",
    "hitRate": 56.7,
    "sport": "basketball"
  },
  {
    "id": "pred-123",
    "predictorId": "yuvraj",
    "predictorName": "Yuvraj",
    "predictorAvatar": "/images/predictions/yuvraj.webp",
    "hitRate": 56.69,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-124",
    "predictorId": "barthelemy",
    "predictorName": "Barthelemy",
    "predictorAvatar": "/images/predictions/barthelemy.webp",
    "hitRate": 56.67,
    "sport": "basketball"
  },
  {
    "id": "pred-125",
    "predictorId": "dejan",
    "predictorName": "Dejan",
    "predictorAvatar": "/images/predictions/dejan.webp",
    "hitRate": 56.66,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-126",
    "predictorId": "duante",
    "predictorName": "Duante",
    "predictorAvatar": "/images/predictions/duante.webp",
    "hitRate": 56.64,
    "sport": "basketball"
  },
  {
    "id": "pred-127",
    "predictorId": "zhubin",
    "predictorName": "Zhubin",
    "predictorAvatar": "/images/predictions/zhubin.webp",
    "hitRate": 56.63,
    "sport": "basketball"
  },
  {
    "id": "pred-128",
    "predictorId": "cordero",
    "predictorName": "Cordero",
    "predictorAvatar": "/images/predictions/cordero.webp",
    "hitRate": 56.61,
    "sport": "basketball"
  },
  {
    "id": "pred-129",
    "predictorId": "taja",
    "predictorName": "Taja",
    "predictorAvatar": "/images/predictions/taja.webp",
    "hitRate": 56.61,
    "sport": "basketball"
  },
  {
    "id": "pred-130",
    "predictorId": "che",
    "predictorName": "Che",
    "predictorAvatar": "/images/predictions/che.webp",
    "hitRate": 56.6,
    "sport": "basketball"
  },
  {
    "id": "pred-131",
    "predictorId": "ernie",
    "predictorName": "Ernie",
    "predictorAvatar": "/images/predictions/ernie.webp",
    "hitRate": 56.59,
    "sport": "basketball"
  },
  {
    "id": "pred-132",
    "predictorId": "cathica",
    "predictorName": "Cathica",
    "predictorAvatar": "/images/predictions/cathica.webp",
    "hitRate": 56.57,
    "sport": "basketball"
  },
  {
    "id": "pred-133",
    "predictorId": "paros",
    "predictorName": "Paros",
    "predictorAvatar": "/images/predictions/paros.webp",
    "hitRate": 56.56,
    "sport": "basketball"
  },
  {
    "id": "pred-134",
    "predictorId": "chaviv",
    "predictorName": "Chaviv",
    "predictorAvatar": "/images/predictions/chaviv.webp",
    "hitRate": 56.55,
    "sport": "basketball"
  },
  {
    "id": "pred-135",
    "predictorId": "pranet",
    "predictorName": "Pranet",
    "predictorAvatar": "/images/predictions/pranet.webp",
    "hitRate": 56.55,
    "sport": "basketball"
  },
  {
    "id": "pred-136",
    "predictorId": "delroy",
    "predictorName": "Delroy",
    "predictorAvatar": "/images/predictions/delroy.webp",
    "hitRate": 56.54,
    "sport": "basketball"
  },
  {
    "id": "pred-137",
    "predictorId": "zayne",
    "predictorName": "Zayne",
    "predictorAvatar": "/images/predictions/zayne.webp",
    "hitRate": 56.49,
    "sport": "basketball"
  },
  {
    "id": "pred-138",
    "predictorId": "titouan",
    "predictorName": "Titouan",
    "predictorAvatar": "/images/predictions/titouan.webp",
    "hitRate": 56.47,
    "sport": "basketball"
  },
  {
    "id": "pred-139",
    "predictorId": "wyatt",
    "predictorName": "Wyatt",
    "predictorAvatar": "/images/predictions/wyatt.webp",
    "hitRate": 56.46,
    "sport": "basketball"
  },
  {
    "id": "pred-140",
    "predictorId": "demarion",
    "predictorName": "Demarion",
    "predictorAvatar": "/images/predictions/demarion.webp",
    "hitRate": 56.43,
    "sport": "basketball"
  },
  {
    "id": "pred-141",
    "predictorId": "calbhach",
    "predictorName": "Calbhach",
    "predictorAvatar": "/images/predictions/calbhach.webp",
    "hitRate": 56.43,
    "winStreak": "2x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-142",
    "predictorId": "rizwaan",
    "predictorName": "Rizwaan",
    "predictorAvatar": "/images/predictions/rizwaan.webp",
    "hitRate": 56.43,
    "sport": "basketball"
  },
  {
    "id": "pred-143",
    "predictorId": "haroun",
    "predictorName": "Haroun",
    "predictorAvatar": "/images/predictions/haroun.webp",
    "hitRate": 56.43,
    "winStreak": "2x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-144",
    "predictorId": "azaan",
    "predictorName": "Azaan",
    "predictorAvatar": "/images/predictions/azaan.webp",
    "hitRate": 56.42,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-145",
    "predictorId": "yehuda",
    "predictorName": "Yehuda",
    "predictorAvatar": "/images/predictions/yehuda.webp",
    "hitRate": 56.35,
    "winStreak": "3x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-146",
    "predictorId": "jatin",
    "predictorName": "Jatin",
    "predictorAvatar": "/images/predictions/jatin.webp",
    "hitRate": 56.34,
    "sport": "basketball"
  },
  {
    "id": "pred-147",
    "predictorId": "teodoro",
    "predictorName": "Teodoro",
    "predictorAvatar": "/images/predictions/teodoro.webp",
    "hitRate": 56.34,
    "sport": "basketball"
  },
  {
    "id": "pred-148",
    "predictorId": "amitai",
    "predictorName": "Amitai",
    "predictorAvatar": "/images/predictions/amitai.webp",
    "hitRate": 56.33,
    "sport": "basketball"
  },
  {
    "id": "pred-149",
    "predictorId": "danil",
    "predictorName": "Danil",
    "predictorAvatar": "/images/predictions/danil.webp",
    "hitRate": 56.32,
    "sport": "basketball"
  },
  {
    "id": "pred-150",
    "predictorId": "rodney",
    "predictorName": "Rodney",
    "predictorAvatar": "/images/predictions/rodney.webp",
    "hitRate": 56.28,
    "sport": "basketball"
  },
  {
    "id": "pred-151",
    "predictorId": "francesco",
    "predictorName": "Francesco",
    "predictorAvatar": "/images/predictions/francesco.webp",
    "hitRate": 56.28,
    "winStreak": "3x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-152",
    "predictorId": "jonah",
    "predictorName": "Jonah",
    "predictorAvatar": "/images/predictions/jonah.webp",
    "hitRate": 56.28,
    "sport": "basketball"
  },
  {
    "id": "pred-153",
    "predictorId": "atticus",
    "predictorName": "Atticus",
    "predictorAvatar": "/images/predictions/atticus.webp",
    "hitRate": 56.27,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-154",
    "predictorId": "giovanny",
    "predictorName": "Giovanny",
    "predictorAvatar": "/images/predictions/giovanny.webp",
    "hitRate": 56.24,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-155",
    "predictorId": "abdon",
    "predictorName": "Abdon",
    "predictorAvatar": "/images/predictions/abdon.webp",
    "hitRate": 56.24,
    "sport": "basketball"
  },
  {
    "id": "pred-156",
    "predictorId": "creed",
    "predictorName": "Creed",
    "predictorAvatar": "/images/predictions/creed.webp",
    "hitRate": 56.19,
    "sport": "basketball"
  },
  {
    "id": "pred-157",
    "predictorId": "jovian",
    "predictorName": "Jovian",
    "predictorAvatar": "/images/predictions/jovian.webp",
    "hitRate": 56.18,
    "sport": "basketball"
  },
  {
    "id": "pred-158",
    "predictorId": "zaid",
    "predictorName": "Zaid",
    "predictorAvatar": "/images/predictions/zaid.webp",
    "hitRate": 56.18,
    "sport": "basketball"
  },
  {
    "id": "pred-159",
    "predictorId": "viktor",
    "predictorName": "Viktor",
    "predictorAvatar": "/images/predictions/viktor.webp",
    "hitRate": 56.15,
    "sport": "basketball"
  },
  {
    "id": "pred-160",
    "predictorId": "doyle",
    "predictorName": "Doyle",
    "predictorAvatar": "/images/predictions/doyle.webp",
    "hitRate": 56.06,
    "sport": "basketball"
  },
  {
    "id": "pred-161",
    "predictorId": "urowo",
    "predictorName": "Urowo",
    "predictorAvatar": "/images/predictions/urowo.webp",
    "hitRate": 56.06,
    "sport": "basketball"
  },
  {
    "id": "pred-162",
    "predictorId": "eben",
    "predictorName": "Eben",
    "predictorAvatar": "/images/predictions/eben.webp",
    "hitRate": 56.04,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-163",
    "predictorId": "yonatan",
    "predictorName": "Yonatan",
    "predictorAvatar": "/images/predictions/yonatan.webp",
    "hitRate": 56.04,
    "sport": "basketball"
  },
  {
    "id": "pred-164",
    "predictorId": "niv",
    "predictorName": "Niv",
    "predictorAvatar": "/images/predictions/niv.webp",
    "hitRate": 56.03,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-165",
    "predictorId": "manny",
    "predictorName": "Manny",
    "predictorAvatar": "/images/predictions/manny.webp",
    "hitRate": 55.98,
    "sport": "basketball"
  },
  {
    "id": "pred-166",
    "predictorId": "odon",
    "predictorName": "Odon",
    "predictorAvatar": "/images/predictions/odon.webp",
    "hitRate": 55.98,
    "sport": "basketball"
  },
  {
    "id": "pred-167",
    "predictorId": "bosley",
    "predictorName": "Bosley",
    "predictorAvatar": "/images/predictions/bosley.webp",
    "hitRate": 55.98,
    "sport": "basketball"
  },
  {
    "id": "pred-168",
    "predictorId": "izayah",
    "predictorName": "Izayah",
    "predictorAvatar": "/images/predictions/izayah.webp",
    "hitRate": 55.98,
    "sport": "basketball"
  },
  {
    "id": "pred-169",
    "predictorId": "osbourne",
    "predictorName": "Osbourne",
    "predictorAvatar": "/images/predictions/osbourne.webp",
    "hitRate": 55.97,
    "sport": "basketball"
  },
  {
    "id": "pred-170",
    "predictorId": "gijs",
    "predictorName": "Gijs",
    "predictorAvatar": "/images/predictions/gijs.webp",
    "hitRate": 55.92,
    "sport": "basketball"
  },
  {
    "id": "pred-171",
    "predictorId": "axiom",
    "predictorName": "Axiom",
    "predictorAvatar": "/images/predictions/axiom.webp",
    "hitRate": 55.89,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-172",
    "predictorId": "caradoc",
    "predictorName": "Caradoc",
    "predictorAvatar": "/images/predictions/caradoc.webp",
    "hitRate": 55.88,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-173",
    "predictorId": "ferdinand",
    "predictorName": "Ferdinand",
    "predictorAvatar": "/images/predictions/ferdinand.webp",
    "hitRate": 55.87,
    "sport": "basketball"
  },
  {
    "id": "pred-174",
    "predictorId": "benen",
    "predictorName": "Benen",
    "predictorAvatar": "/images/predictions/benen.webp",
    "hitRate": 55.86,
    "sport": "basketball"
  },
  {
    "id": "pred-175",
    "predictorId": "urowo",
    "predictorName": "Urowo",
    "predictorAvatar": "/images/predictions/urowo.webp",
    "hitRate": 55.85,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-176",
    "predictorId": "jay",
    "predictorName": "Jay",
    "predictorAvatar": "/images/predictions/jay.webp",
    "hitRate": 55.81,
    "sport": "basketball"
  },
  {
    "id": "pred-177",
    "predictorId": "zef",
    "predictorName": "Zef",
    "predictorAvatar": "/images/predictions/zef.webp",
    "hitRate": 55.79,
    "sport": "basketball"
  },
  {
    "id": "pred-178",
    "predictorId": "haig",
    "predictorName": "Haig",
    "predictorAvatar": "/images/predictions/haig.webp",
    "hitRate": 55.78,
    "sport": "basketball"
  },
  {
    "id": "pred-179",
    "predictorId": "ginter",
    "predictorName": "Ginter",
    "predictorAvatar": "/images/predictions/ginter.webp",
    "hitRate": 55.75,
    "sport": "basketball"
  },
  {
    "id": "pred-180",
    "predictorId": "nimrod",
    "predictorName": "Nimrod",
    "predictorAvatar": "/images/predictions/nimrod.webp",
    "hitRate": 55.73,
    "sport": "basketball"
  },
  {
    "id": "pred-181",
    "predictorId": "bam",
    "predictorName": "Bam",
    "predictorAvatar": "/images/predictions/bam.webp",
    "hitRate": 55.71,
    "sport": "basketball"
  },
  {
    "id": "pred-182",
    "predictorId": "marleisha",
    "predictorName": "Marleisha",
    "predictorAvatar": "/images/predictions/marleisha.webp",
    "hitRate": 55.63,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-183",
    "predictorId": "nibaw",
    "predictorName": "Nibaw",
    "predictorAvatar": "/images/predictions/nibaw.webp",
    "hitRate": 55.61,
    "sport": "basketball"
  },
  {
    "id": "pred-184",
    "predictorId": "sylvester",
    "predictorName": "Sylvester",
    "predictorAvatar": "/images/predictions/sylvester.webp",
    "hitRate": 55.53,
    "sport": "basketball"
  },
  {
    "id": "pred-185",
    "predictorId": "redwulf",
    "predictorName": "Redwulf",
    "predictorAvatar": "/images/predictions/redwulf.webp",
    "hitRate": 55.46,
    "sport": "basketball"
  },
  {
    "id": "pred-186",
    "predictorId": "yosuke",
    "predictorName": "Yosuke",
    "predictorAvatar": "/images/predictions/yosuke.webp",
    "hitRate": 55.4,
    "winStreak": "3x wins",
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-187",
    "predictorId": "philip",
    "predictorName": "Philip",
    "predictorAvatar": "/images/predictions/philip.webp",
    "hitRate": 55.36,
    "sport": "basketball"
  },
  {
    "id": "pred-188",
    "predictorId": "harim",
    "predictorName": "Harim",
    "predictorAvatar": "/images/predictions/harim.webp",
    "hitRate": 55.36,
    "sport": "basketball"
  },
  {
    "id": "pred-189",
    "predictorId": "noma",
    "predictorName": "Noma",
    "predictorAvatar": "/images/predictions/noma.webp",
    "hitRate": 55.33,
    "sport": "basketball"
  },
  {
    "id": "pred-190",
    "predictorId": "gaspard",
    "predictorName": "Gaspard",
    "predictorAvatar": "/images/predictions/gaspard.webp",
    "hitRate": 55.32,
    "winStreak": "2x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-191",
    "predictorId": "hajime",
    "predictorName": "Hajime",
    "predictorAvatar": "/images/predictions/hajime.webp",
    "hitRate": 55.26,
    "sport": "basketball"
  },
  {
    "id": "pred-192",
    "predictorId": "beatus",
    "predictorName": "Beatus",
    "predictorAvatar": "/images/predictions/beatus.webp",
    "hitRate": 55.21,
    "sport": "basketball"
  },
  {
    "id": "pred-193",
    "predictorId": "raffi",
    "predictorName": "Raffi",
    "predictorAvatar": "/images/predictions/raffi.webp",
    "hitRate": 55.19,
    "sport": "basketball"
  },
  {
    "id": "pred-194",
    "predictorId": "orlando",
    "predictorName": "Orlando",
    "predictorAvatar": "/images/predictions/orlando.webp",
    "hitRate": 55.13,
    "sport": "basketball"
  },
  {
    "id": "pred-195",
    "predictorId": "hasim",
    "predictorName": "Hasim",
    "predictorAvatar": "/images/predictions/hasim.webp",
    "hitRate": 55.02,
    "sport": "basketball"
  },
  {
    "id": "pred-196",
    "predictorId": "dan",
    "predictorName": "Dan",
    "predictorAvatar": "/images/predictions/dan.webp",
    "hitRate": 54.84,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-197",
    "predictorId": "brend",
    "predictorName": "Brend",
    "predictorAvatar": "/images/predictions/brend.webp",
    "hitRate": 54.69,
    "sport": "basketball"
  },
  {
    "id": "pred-198",
    "predictorId": "barzillai",
    "predictorName": "Barzillai",
    "predictorAvatar": "/images/predictions/barzillai.webp",
    "hitRate": 54.68,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-199",
    "predictorId": "toi",
    "predictorName": "Toi",
    "predictorAvatar": "/images/predictions/toi.webp",
    "hitRate": 54.6,
    "winStreak": "2x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-200",
    "predictorId": "florian",
    "predictorName": "Florian",
    "predictorAvatar": "/images/predictions/florian.webp",
    "hitRate": 54.55,
    "sport": "basketball"
  },
  {
    "id": "pred-201",
    "predictorId": "alen",
    "predictorName": "Alen",
    "predictorAvatar": "/images/predictions/alen.webp",
    "hitRate": 54.33,
    "sport": "basketball"
  },
  {
    "id": "pred-202",
    "predictorId": "sandro",
    "predictorName": "Sandro",
    "predictorAvatar": "/images/predictions/sandro.webp",
    "hitRate": 45.69,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-203",
    "predictorId": "seong-su",
    "predictorName": "Seong-Su",
    "predictorAvatar": "/images/predictions/seong-su.webp",
    "hitRate": 45.42,
    "sport": "basketball"
  },
  {
    "id": "pred-204",
    "predictorId": "destined",
    "predictorName": "Destined",
    "predictorAvatar": "/images/predictions/destined.webp",
    "hitRate": 45.31,
    "sport": "basketball"
  },
  {
    "id": "pred-205",
    "predictorId": "amyntor",
    "predictorName": "Amyntor",
    "predictorAvatar": "/images/predictions/amyntor.webp",
    "hitRate": 45.29,
    "sport": "basketball"
  },
  {
    "id": "pred-206",
    "predictorId": "cullen",
    "predictorName": "Cullen",
    "predictorAvatar": "/images/predictions/cullen.webp",
    "hitRate": 45.21,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-207",
    "predictorId": "tybalt",
    "predictorName": "Tybalt",
    "predictorAvatar": "/images/predictions/tybalt.webp",
    "hitRate": 44.99,
    "sport": "basketball"
  },
  {
    "id": "pred-208",
    "predictorId": "jaycob",
    "predictorName": "Jaycob",
    "predictorAvatar": "/images/predictions/jaycob.webp",
    "hitRate": 44.95,
    "sport": "basketball"
  },
  {
    "id": "pred-209",
    "predictorId": "stanislaus",
    "predictorName": "Stanislaus",
    "predictorAvatar": "/images/predictions/stanislaus.webp",
    "hitRate": 44.94,
    "sport": "basketball"
  },
  {
    "id": "pred-210",
    "predictorId": "salix",
    "predictorName": "Salix",
    "predictorAvatar": "/images/predictions/salix.webp",
    "hitRate": 44.93,
    "winStreak": "2x wins",
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-211",
    "predictorId": "camaxtli",
    "predictorName": "Camaxtli",
    "predictorAvatar": "/images/predictions/camaxtli.webp",
    "hitRate": 44.91,
    "sport": "basketball"
  },
  {
    "id": "pred-212",
    "predictorId": "guo",
    "predictorName": "Guo",
    "predictorAvatar": "/images/predictions/guo.webp",
    "hitRate": 44.79,
    "sport": "basketball"
  },
  {
    "id": "pred-213",
    "predictorId": "lolonyo",
    "predictorName": "Lolonyo",
    "predictorAvatar": "/images/predictions/lolonyo.webp",
    "hitRate": 44.71,
    "sport": "basketball"
  },
  {
    "id": "pred-214",
    "predictorId": "masahiro",
    "predictorName": "Masahiro",
    "predictorAvatar": "/images/predictions/masahiro.webp",
    "hitRate": 44.65,
    "sport": "basketball"
  },
  {
    "id": "pred-215",
    "predictorId": "peso",
    "predictorName": "Peso",
    "predictorAvatar": "/images/predictions/peso.webp",
    "hitRate": 44.64,
    "sport": "basketball"
  },
  {
    "id": "pred-216",
    "predictorId": "bittor",
    "predictorName": "Bittor",
    "predictorAvatar": "/images/predictions/bittor.webp",
    "hitRate": 44.63,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-217",
    "predictorId": "molimo",
    "predictorName": "Molimo",
    "predictorAvatar": "/images/predictions/molimo.webp",
    "hitRate": 44.56,
    "sport": "basketball"
  },
  {
    "id": "pred-218",
    "predictorId": "hugh",
    "predictorName": "Hugh",
    "predictorAvatar": "/images/predictions/hugh.webp",
    "hitRate": 44.53,
    "sport": "basketball"
  },
  {
    "id": "pred-219",
    "predictorId": "imad",
    "predictorName": "Imad",
    "predictorAvatar": "/images/predictions/imad.webp",
    "hitRate": 44.5,
    "sport": "basketball"
  },
  {
    "id": "pred-220",
    "predictorId": "damian",
    "predictorName": "Damian",
    "predictorAvatar": "/images/predictions/damian.webp",
    "hitRate": 44.44,
    "sport": "basketball"
  },
  {
    "id": "pred-221",
    "predictorId": "oded",
    "predictorName": "Oded",
    "predictorAvatar": "/images/predictions/oded.webp",
    "hitRate": 44.37,
    "sport": "basketball"
  },
  {
    "id": "pred-222",
    "predictorId": "notaku",
    "predictorName": "Notaku",
    "predictorAvatar": "/images/predictions/notaku.webp",
    "hitRate": 44.36,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-223",
    "predictorId": "asuma",
    "predictorName": "Asuma",
    "predictorAvatar": "/images/predictions/asuma.webp",
    "hitRate": 44.36,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-224",
    "predictorId": "adish",
    "predictorName": "Adish",
    "predictorAvatar": "/images/predictions/adish.webp",
    "hitRate": 44.3,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-225",
    "predictorId": "esau",
    "predictorName": "Esau",
    "predictorAvatar": "/images/predictions/esau.webp",
    "hitRate": 44.24,
    "sport": "basketball"
  },
  {
    "id": "pred-226",
    "predictorId": "pedro",
    "predictorName": "Pedro",
    "predictorAvatar": "/images/predictions/pedro.webp",
    "hitRate": 44.23,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-227",
    "predictorId": "kittiya",
    "predictorName": "Kittiya",
    "predictorAvatar": "/images/predictions/kittiya.webp",
    "hitRate": 44.14,
    "sport": "basketball"
  },
  {
    "id": "pred-228",
    "predictorId": "konrad",
    "predictorName": "Konrad",
    "predictorAvatar": "/images/predictions/konrad.webp",
    "hitRate": 43.99,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-229",
    "predictorId": "kaz",
    "predictorName": "Kaz",
    "predictorAvatar": "/images/predictions/kaz.webp",
    "hitRate": 43.96,
    "sport": "basketball"
  },
  {
    "id": "pred-230",
    "predictorId": "chankoowashtay",
    "predictorName": "Chankoowashtay",
    "predictorAvatar": "/images/predictions/chankoowashtay.webp",
    "hitRate": 43.93,
    "currentPredictions": 3,
    "sport": "basketball"
  },
  {
    "id": "pred-231",
    "predictorId": "waseem",
    "predictorName": "Waseem",
    "predictorAvatar": "/images/predictions/waseem.webp",
    "hitRate": 43.9,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-232",
    "predictorId": "chadwick",
    "predictorName": "Chadwick",
    "predictorAvatar": "/images/predictions/chadwick.webp",
    "hitRate": 43.88,
    "currentPredictions": 4,
    "sport": "basketball"
  },
  {
    "id": "pred-233",
    "predictorId": "keyshawn",
    "predictorName": "Keyshawn",
    "predictorAvatar": "/images/predictions/keyshawn.webp",
    "hitRate": 43.87,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-234",
    "predictorId": "brad",
    "predictorName": "Brad",
    "predictorAvatar": "/images/predictions/brad.webp",
    "hitRate": 43.86,
    "sport": "basketball"
  },
  {
    "id": "pred-235",
    "predictorId": "jiro",
    "predictorName": "Jiro",
    "predictorAvatar": "/images/predictions/jiro.webp",
    "hitRate": 43.84,
    "sport": "basketball"
  },
  {
    "id": "pred-236",
    "predictorId": "gervasio",
    "predictorName": "Gervasio",
    "predictorAvatar": "/images/predictions/gervasio.webp",
    "hitRate": 43.83,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-237",
    "predictorId": "onofrio",
    "predictorName": "Onofrio",
    "predictorAvatar": "/images/predictions/onofrio.webp",
    "hitRate": 43.83,
    "sport": "basketball"
  },
  {
    "id": "pred-238",
    "predictorId": "subrahmanyan",
    "predictorName": "Subrahmanyan",
    "predictorAvatar": "/images/predictions/subrahmanyan.webp",
    "hitRate": 43.77,
    "winStreak": "2x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-239",
    "predictorId": "crowley",
    "predictorName": "Crowley",
    "predictorAvatar": "/images/predictions/crowley.webp",
    "hitRate": 43.7,
    "sport": "basketball"
  },
  {
    "id": "pred-240",
    "predictorId": "yanni",
    "predictorName": "Yanni",
    "predictorAvatar": "/images/predictions/yanni.webp",
    "hitRate": 43.69,
    "sport": "basketball"
  },
  {
    "id": "pred-241",
    "predictorId": "frick",
    "predictorName": "Frick",
    "predictorAvatar": "/images/predictions/frick.webp",
    "hitRate": 43.68,
    "sport": "basketball"
  },
  {
    "id": "pred-242",
    "predictorId": "marco",
    "predictorName": "Marco",
    "predictorAvatar": "/images/predictions/marco.webp",
    "hitRate": 43.67,
    "winStreak": "3x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-243",
    "predictorId": "altan",
    "predictorName": "Altan",
    "predictorAvatar": "/images/predictions/altan.webp",
    "hitRate": 43.64,
    "sport": "basketball"
  },
  {
    "id": "pred-244",
    "predictorId": "nereus",
    "predictorName": "Nereus",
    "predictorAvatar": "/images/predictions/nereus.webp",
    "hitRate": 43.62,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-245",
    "predictorId": "kahikina",
    "predictorName": "Kahikina",
    "predictorAvatar": "/images/predictions/kahikina.webp",
    "hitRate": 43.6,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-246",
    "predictorId": "tywin",
    "predictorName": "Tywin",
    "predictorAvatar": "/images/predictions/tywin.webp",
    "hitRate": 43.55,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-247",
    "predictorId": "tertius",
    "predictorName": "Tertius",
    "predictorAvatar": "/images/predictions/tertius.webp",
    "hitRate": 43.55,
    "sport": "basketball"
  },
  {
    "id": "pred-248",
    "predictorId": "kazuyuki",
    "predictorName": "Kazuyuki",
    "predictorAvatar": "/images/predictions/kazuyuki.webp",
    "hitRate": 43.55,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-249",
    "predictorId": "brown",
    "predictorName": "Brown",
    "predictorAvatar": "/images/predictions/brown.webp",
    "hitRate": 43.54,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-250",
    "predictorId": "asael",
    "predictorName": "Asael",
    "predictorAvatar": "/images/predictions/asael.webp",
    "hitRate": 43.53,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-251",
    "predictorId": "braven",
    "predictorName": "Braven",
    "predictorAvatar": "/images/predictions/braven.webp",
    "hitRate": 43.53,
    "sport": "basketball"
  },
  {
    "id": "pred-252",
    "predictorId": "itsuo",
    "predictorName": "Itsuo",
    "predictorAvatar": "/images/predictions/itsuo.webp",
    "hitRate": 43.52,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-253",
    "predictorId": "fearghus",
    "predictorName": "Fearghus",
    "predictorAvatar": "/images/predictions/fearghus.webp",
    "hitRate": 43.52,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-254",
    "predictorId": "raziel",
    "predictorName": "Raziel",
    "predictorAvatar": "/images/predictions/raziel.webp",
    "hitRate": 43.5,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-255",
    "predictorId": "gordy",
    "predictorName": "Gordy",
    "predictorAvatar": "/images/predictions/gordy.webp",
    "hitRate": 43.49,
    "currentPredictions": 3,
    "sport": "basketball"
  },
  {
    "id": "pred-256",
    "predictorId": "dominic",
    "predictorName": "Dominic",
    "predictorAvatar": "/images/predictions/dominic.webp",
    "hitRate": 43.48,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-257",
    "predictorId": "bavo",
    "predictorName": "Bavo",
    "predictorAvatar": "/images/predictions/bavo.webp",
    "hitRate": 43.47,
    "sport": "basketball"
  },
  {
    "id": "pred-258",
    "predictorId": "algernon",
    "predictorName": "Algernon",
    "predictorAvatar": "/images/predictions/algernon.webp",
    "hitRate": 43.46,
    "sport": "basketball"
  },
  {
    "id": "pred-259",
    "predictorId": "kyson",
    "predictorName": "Kyson",
    "predictorAvatar": "/images/predictions/kyson.webp",
    "hitRate": 43.46,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-260",
    "predictorId": "thamyris",
    "predictorName": "Thamyris",
    "predictorAvatar": "/images/predictions/thamyris.webp",
    "hitRate": 43.46,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-261",
    "predictorId": "yanisin",
    "predictorName": "Yanisin",
    "predictorAvatar": "/images/predictions/yanisin.webp",
    "hitRate": 43.42,
    "sport": "basketball"
  },
  {
    "id": "pred-262",
    "predictorId": "alf",
    "predictorName": "Alf",
    "predictorAvatar": "/images/predictions/alf.webp",
    "hitRate": 43.41,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-263",
    "predictorId": "brant",
    "predictorName": "Brant",
    "predictorAvatar": "/images/predictions/brant.webp",
    "hitRate": 43.41,
    "winStreak": "3x wins",
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-264",
    "predictorId": "soan",
    "predictorName": "Soan",
    "predictorAvatar": "/images/predictions/soan.webp",
    "hitRate": 43.39,
    "sport": "basketball"
  },
  {
    "id": "pred-265",
    "predictorId": "natan",
    "predictorName": "Natan",
    "predictorAvatar": "/images/predictions/natan.webp",
    "hitRate": 43.38,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-266",
    "predictorId": "diallo",
    "predictorName": "Diallo",
    "predictorAvatar": "/images/predictions/diallo.webp",
    "hitRate": 43.35,
    "winStreak": "2x wins",
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-267",
    "predictorId": "taban",
    "predictorName": "Taban",
    "predictorAvatar": "/images/predictions/taban.webp",
    "hitRate": 43.34,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-268",
    "predictorId": "nobuhide",
    "predictorName": "Nobuhide",
    "predictorAvatar": "/images/predictions/nobuhide.webp",
    "hitRate": 43.32,
    "winStreak": "2x wins",
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-269",
    "predictorId": "granville",
    "predictorName": "Granville",
    "predictorAvatar": "/images/predictions/granville.webp",
    "hitRate": 43.31,
    "sport": "basketball"
  },
  {
    "id": "pred-270",
    "predictorId": "flavian",
    "predictorName": "Flavian",
    "predictorAvatar": "/images/predictions/flavian.webp",
    "hitRate": 43.29,
    "winStreak": "2x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-271",
    "predictorId": "palmer",
    "predictorName": "Palmer",
    "predictorAvatar": "/images/predictions/palmer.webp",
    "hitRate": 43.28,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-272",
    "predictorId": "roald",
    "predictorName": "Roald",
    "predictorAvatar": "/images/predictions/roald.webp",
    "hitRate": 43.27,
    "sport": "basketball"
  },
  {
    "id": "pred-273",
    "predictorId": "freed",
    "predictorName": "Freed",
    "predictorAvatar": "/images/predictions/freed.webp",
    "hitRate": 43.27,
    "sport": "basketball"
  },
  {
    "id": "pred-274",
    "predictorId": "bo",
    "predictorName": "Bo",
    "predictorAvatar": "/images/predictions/bo.webp",
    "hitRate": 43.27,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-275",
    "predictorId": "luthando",
    "predictorName": "Luthando",
    "predictorAvatar": "/images/predictions/luthando.webp",
    "hitRate": 43.26,
    "sport": "basketball"
  },
  {
    "id": "pred-276",
    "predictorId": "cannon",
    "predictorName": "Cannon",
    "predictorAvatar": "/images/predictions/cannon.webp",
    "hitRate": 43.26,
    "sport": "basketball"
  },
  {
    "id": "pred-277",
    "predictorId": "krew",
    "predictorName": "Krew",
    "predictorAvatar": "/images/predictions/krew.webp",
    "hitRate": 43.25,
    "sport": "basketball"
  },
  {
    "id": "pred-278",
    "predictorId": "base",
    "predictorName": "Base",
    "predictorAvatar": "/images/predictions/base.webp",
    "hitRate": 43.25,
    "sport": "basketball"
  },
  {
    "id": "pred-279",
    "predictorId": "castaneda",
    "predictorName": "Castañeda",
    "predictorAvatar": "/images/predictions/castaneda.webp",
    "hitRate": 43.25,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-280",
    "predictorId": "jai",
    "predictorName": "Jai",
    "predictorAvatar": "/images/predictions/jai.webp",
    "hitRate": 43.23,
    "sport": "basketball"
  },
  {
    "id": "pred-281",
    "predictorId": "ethan",
    "predictorName": "Ethan",
    "predictorAvatar": "/images/predictions/ethan.webp",
    "hitRate": 43.22,
    "sport": "basketball"
  },
  {
    "id": "pred-282",
    "predictorId": "momuso",
    "predictorName": "Momuso",
    "predictorAvatar": "/images/predictions/momuso.webp",
    "hitRate": 43.19,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-283",
    "predictorId": "eljah",
    "predictorName": "Eljah",
    "predictorAvatar": "/images/predictions/eljah.webp",
    "hitRate": 43.18,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-284",
    "predictorId": "doruk",
    "predictorName": "Doruk",
    "predictorAvatar": "/images/predictions/doruk.webp",
    "hitRate": 43.17,
    "sport": "basketball"
  },
  {
    "id": "pred-285",
    "predictorId": "brennen",
    "predictorName": "Brennen",
    "predictorAvatar": "/images/predictions/brennen.webp",
    "hitRate": 43.15,
    "sport": "basketball"
  },
  {
    "id": "pred-286",
    "predictorId": "gitano",
    "predictorName": "Gitano",
    "predictorAvatar": "/images/predictions/gitano.webp",
    "hitRate": 43.14,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-287",
    "predictorId": "avyaan",
    "predictorName": "Avyaan",
    "predictorAvatar": "/images/predictions/avyaan.webp",
    "hitRate": 43.14,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-288",
    "predictorId": "blu",
    "predictorName": "Blu",
    "predictorAvatar": "/images/predictions/blu.webp",
    "hitRate": 43.13,
    "sport": "basketball"
  },
  {
    "id": "pred-289",
    "predictorId": "santino",
    "predictorName": "Santino",
    "predictorAvatar": "/images/predictions/santino.webp",
    "hitRate": 43.12,
    "sport": "basketball"
  },
  {
    "id": "pred-290",
    "predictorId": "dobry",
    "predictorName": "Dobry",
    "predictorAvatar": "/images/predictions/dobry.webp",
    "hitRate": 43.12,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-291",
    "predictorId": "dathan",
    "predictorName": "Dathan",
    "predictorAvatar": "/images/predictions/dathan.webp",
    "hitRate": 43.11,
    "sport": "basketball"
  },
  {
    "id": "pred-292",
    "predictorId": "justin",
    "predictorName": "Justin",
    "predictorAvatar": "/images/predictions/justin.webp",
    "hitRate": 43.11,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-293",
    "predictorId": "devota",
    "predictorName": "Devota",
    "predictorAvatar": "/images/predictions/devota.webp",
    "hitRate": 43.09,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-294",
    "predictorId": "damarion",
    "predictorName": "Damarion",
    "predictorAvatar": "/images/predictions/damarion.webp",
    "hitRate": 43.07,
    "sport": "basketball"
  },
  {
    "id": "pred-295",
    "predictorId": "sherif",
    "predictorName": "Sherif",
    "predictorAvatar": "/images/predictions/sherif.webp",
    "hitRate": 43.07,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-296",
    "predictorId": "nehemiah",
    "predictorName": "Nehemiah",
    "predictorAvatar": "/images/predictions/nehemiah.webp",
    "hitRate": 43.07,
    "sport": "basketball"
  },
  {
    "id": "pred-297",
    "predictorId": "mattox",
    "predictorName": "Mattox",
    "predictorAvatar": "/images/predictions/mattox.webp",
    "hitRate": 43.07,
    "sport": "basketball"
  },
  {
    "id": "pred-298",
    "predictorId": "florentin",
    "predictorName": "Florentin",
    "predictorAvatar": "/images/predictions/florentin.webp",
    "hitRate": 43.06,
    "sport": "basketball"
  },
  {
    "id": "pred-299",
    "predictorId": "ryota",
    "predictorName": "Ryota",
    "predictorAvatar": "/images/predictions/ryota.webp",
    "hitRate": 43.05,
    "sport": "basketball"
  },
  {
    "id": "pred-300",
    "predictorId": "balliol",
    "predictorName": "Balliol",
    "predictorAvatar": "/images/predictions/balliol.webp",
    "hitRate": 43.05,
    "sport": "basketball"
  },
  {
    "id": "pred-301",
    "predictorId": "christoffer",
    "predictorName": "Christoffer",
    "predictorAvatar": "/images/predictions/christoffer.webp",
    "hitRate": 43.04,
    "sport": "basketball"
  },
  {
    "id": "pred-302",
    "predictorId": "eastwood",
    "predictorName": "Eastwood",
    "predictorAvatar": "/images/predictions/eastwood.webp",
    "hitRate": 43.04,
    "sport": "basketball"
  },
  {
    "id": "pred-303",
    "predictorId": "toussaint",
    "predictorName": "Toussaint",
    "predictorAvatar": "/images/predictions/toussaint.webp",
    "hitRate": 43.04,
    "sport": "basketball"
  },
  {
    "id": "pred-304",
    "predictorId": "khaled",
    "predictorName": "Khaled",
    "predictorAvatar": "/images/predictions/khaled.webp",
    "hitRate": 43.03,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-305",
    "predictorId": "mollie",
    "predictorName": "Mollie",
    "predictorAvatar": "/images/predictions/mollie.webp",
    "hitRate": 43.03,
    "sport": "basketball"
  },
  {
    "id": "pred-306",
    "predictorId": "marcelo",
    "predictorName": "Marcelo",
    "predictorAvatar": "/images/predictions/marcelo.webp",
    "hitRate": 43.02,
    "sport": "basketball"
  },
  {
    "id": "pred-307",
    "predictorId": "crius",
    "predictorName": "Crius",
    "predictorAvatar": "/images/predictions/crius.webp",
    "hitRate": 43.02,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-308",
    "predictorId": "darrius",
    "predictorName": "Darrius",
    "predictorAvatar": "/images/predictions/darrius.webp",
    "hitRate": 42.97,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-309",
    "predictorId": "abimael",
    "predictorName": "Abimael",
    "predictorAvatar": "/images/predictions/abimael.webp",
    "hitRate": 42.96,
    "sport": "basketball"
  },
  {
    "id": "pred-310",
    "predictorId": "theodule",
    "predictorName": "Theodule",
    "predictorAvatar": "/images/predictions/theodule.webp",
    "hitRate": 42.94,
    "winStreak": "2x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-311",
    "predictorId": "konala",
    "predictorName": "Konala",
    "predictorAvatar": "/images/predictions/konala.webp",
    "hitRate": 42.94,
    "sport": "basketball"
  },
  {
    "id": "pred-312",
    "predictorId": "leland",
    "predictorName": "Leland",
    "predictorAvatar": "/images/predictions/leland.webp",
    "hitRate": 42.94,
    "sport": "basketball"
  },
  {
    "id": "pred-313",
    "predictorId": "omari",
    "predictorName": "Omari",
    "predictorAvatar": "/images/predictions/omari.webp",
    "hitRate": 42.93,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-314",
    "predictorId": "raivis",
    "predictorName": "Raivis",
    "predictorAvatar": "/images/predictions/raivis.webp",
    "hitRate": 42.92,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-315",
    "predictorId": "pasgen",
    "predictorName": "Pasgen",
    "predictorAvatar": "/images/predictions/pasgen.webp",
    "hitRate": 42.91,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-316",
    "predictorId": "ferial",
    "predictorName": "Ferial",
    "predictorAvatar": "/images/predictions/ferial.webp",
    "hitRate": 42.91,
    "sport": "basketball"
  },
  {
    "id": "pred-317",
    "predictorId": "wahchinksapa",
    "predictorName": "Wahchinksapa",
    "predictorAvatar": "/images/predictions/wahchinksapa.webp",
    "hitRate": 42.9,
    "sport": "basketball"
  },
  {
    "id": "pred-318",
    "predictorId": "jarlath",
    "predictorName": "Jarlath",
    "predictorAvatar": "/images/predictions/jarlath.webp",
    "hitRate": 42.9,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-319",
    "predictorId": "mingan",
    "predictorName": "Mingan",
    "predictorAvatar": "/images/predictions/mingan.webp",
    "hitRate": 42.88,
    "sport": "basketball"
  },
  {
    "id": "pred-320",
    "predictorId": "martirio",
    "predictorName": "Martirio",
    "predictorAvatar": "/images/predictions/martirio.webp",
    "hitRate": 42.85,
    "sport": "basketball"
  },
  {
    "id": "pred-321",
    "predictorId": "breccan",
    "predictorName": "Breccan",
    "predictorAvatar": "/images/predictions/breccan.webp",
    "hitRate": 42.83,
    "sport": "basketball"
  },
  {
    "id": "pred-322",
    "predictorId": "kotaro",
    "predictorName": "Kotaro",
    "predictorAvatar": "/images/predictions/kotaro.webp",
    "hitRate": 42.79,
    "sport": "basketball"
  },
  {
    "id": "pred-323",
    "predictorId": "kaidence",
    "predictorName": "Kaidence",
    "predictorAvatar": "/images/predictions/kaidence.webp",
    "hitRate": 42.78,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-324",
    "predictorId": "chesmu",
    "predictorName": "Chesmu",
    "predictorAvatar": "/images/predictions/chesmu.webp",
    "hitRate": 42.75,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-325",
    "predictorId": "delgado",
    "predictorName": "Delgado",
    "predictorAvatar": "/images/predictions/delgado.webp",
    "hitRate": 42.73,
    "sport": "basketball"
  },
  {
    "id": "pred-326",
    "predictorId": "pierluigi",
    "predictorName": "Pierluigi",
    "predictorAvatar": "/images/predictions/pierluigi.webp",
    "hitRate": 42.73,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-327",
    "predictorId": "natale",
    "predictorName": "Natale",
    "predictorAvatar": "/images/predictions/natale.webp",
    "hitRate": 42.72,
    "sport": "basketball"
  },
  {
    "id": "pred-328",
    "predictorId": "sokka",
    "predictorName": "Sokka",
    "predictorAvatar": "/images/predictions/sokka.webp",
    "hitRate": 42.71,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-329",
    "predictorId": "kosta",
    "predictorName": "Kosta",
    "predictorAvatar": "/images/predictions/kosta.webp",
    "hitRate": 42.7,
    "sport": "basketball"
  },
  {
    "id": "pred-330",
    "predictorId": "berkant",
    "predictorName": "Berkant",
    "predictorAvatar": "/images/predictions/berkant.webp",
    "hitRate": 42.69,
    "sport": "basketball"
  },
  {
    "id": "pred-331",
    "predictorId": "kamren",
    "predictorName": "Kamren",
    "predictorAvatar": "/images/predictions/kamren.webp",
    "hitRate": 42.69,
    "sport": "basketball"
  },
  {
    "id": "pred-332",
    "predictorId": "coniraya",
    "predictorName": "Coniraya",
    "predictorAvatar": "/images/predictions/coniraya.webp",
    "hitRate": 42.67,
    "sport": "basketball"
  },
  {
    "id": "pred-333",
    "predictorId": "kwam",
    "predictorName": "Kwam",
    "predictorAvatar": "/images/predictions/kwam.webp",
    "hitRate": 42.66,
    "sport": "basketball"
  },
  {
    "id": "pred-334",
    "predictorId": "sturla",
    "predictorName": "Sturla",
    "predictorAvatar": "/images/predictions/sturla.webp",
    "hitRate": 42.64,
    "sport": "basketball"
  },
  {
    "id": "pred-335",
    "predictorId": "orhan",
    "predictorName": "Orhan",
    "predictorAvatar": "/images/predictions/orhan.webp",
    "hitRate": 42.63,
    "sport": "basketball"
  },
  {
    "id": "pred-336",
    "predictorId": "ruger",
    "predictorName": "Ruger",
    "predictorAvatar": "/images/predictions/ruger.webp",
    "hitRate": 42.6,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-337",
    "predictorId": "neele",
    "predictorName": "Neele",
    "predictorAvatar": "/images/predictions/neele.webp",
    "hitRate": 42.59,
    "sport": "basketball"
  },
  {
    "id": "pred-338",
    "predictorId": "thuan",
    "predictorName": "Thuan",
    "predictorAvatar": "/images/predictions/thuan.webp",
    "hitRate": 42.59,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-339",
    "predictorId": "kenny",
    "predictorName": "Kenny",
    "predictorAvatar": "/images/predictions/kenny.webp",
    "hitRate": 42.59,
    "winStreak": "2x wins",
    "currentPredictions": 3,
    "sport": "basketball"
  },
  {
    "id": "pred-340",
    "predictorId": "adagio",
    "predictorName": "Adagio",
    "predictorAvatar": "/images/predictions/adagio.webp",
    "hitRate": 42.58,
    "sport": "basketball"
  },
  {
    "id": "pred-341",
    "predictorId": "hall",
    "predictorName": "Hall",
    "predictorAvatar": "/images/predictions/hall.webp",
    "hitRate": 42.58,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-342",
    "predictorId": "wuyi",
    "predictorName": "Wuyi",
    "predictorAvatar": "/images/predictions/wuyi.webp",
    "hitRate": 42.56,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-343",
    "predictorId": "amerigo",
    "predictorName": "Amerigo",
    "predictorAvatar": "/images/predictions/amerigo.webp",
    "hitRate": 42.53,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-344",
    "predictorId": "leverett",
    "predictorName": "Leverett",
    "predictorAvatar": "/images/predictions/leverett.webp",
    "hitRate": 42.53,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-345",
    "predictorId": "keb",
    "predictorName": "Keb",
    "predictorAvatar": "/images/predictions/keb.webp",
    "hitRate": 42.52,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-346",
    "predictorId": "calvin",
    "predictorName": "Calvin",
    "predictorAvatar": "/images/predictions/calvin.webp",
    "hitRate": 42.49,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-347",
    "predictorId": "ondre",
    "predictorName": "Ondre",
    "predictorAvatar": "/images/predictions/ondre.webp",
    "hitRate": 42.46,
    "sport": "basketball"
  },
  {
    "id": "pred-348",
    "predictorId": "kuper",
    "predictorName": "Kuper",
    "predictorAvatar": "/images/predictions/kuper.webp",
    "hitRate": 42.45,
    "sport": "basketball"
  },
  {
    "id": "pred-349",
    "predictorId": "erwin",
    "predictorName": "Erwin",
    "predictorAvatar": "/images/predictions/erwin.webp",
    "hitRate": 42.45,
    "winStreak": "2x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-350",
    "predictorId": "jedrek",
    "predictorName": "Jedrek",
    "predictorAvatar": "/images/predictions/jedrek.webp",
    "hitRate": 42.45,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-351",
    "predictorId": "moonus",
    "predictorName": "Moonus",
    "predictorAvatar": "/images/predictions/moonus.webp",
    "hitRate": 42.43,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-352",
    "predictorId": "romney",
    "predictorName": "Romney",
    "predictorAvatar": "/images/predictions/romney.webp",
    "hitRate": 42.42,
    "winStreak": "3x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-353",
    "predictorId": "temujin",
    "predictorName": "Temujin",
    "predictorAvatar": "/images/predictions/temujin.webp",
    "hitRate": 42.42,
    "sport": "basketball"
  },
  {
    "id": "pred-354",
    "predictorId": "alain",
    "predictorName": "Alain",
    "predictorAvatar": "/images/predictions/alain.webp",
    "hitRate": 42.4,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-355",
    "predictorId": "cayson",
    "predictorName": "Cayson",
    "predictorAvatar": "/images/predictions/cayson.webp",
    "hitRate": 42.4,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-356",
    "predictorId": "danyal",
    "predictorName": "Danyal",
    "predictorAvatar": "/images/predictions/danyal.webp",
    "hitRate": 42.39,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-357",
    "predictorId": "ashkan",
    "predictorName": "Ashkan",
    "predictorAvatar": "/images/predictions/ashkan.webp",
    "hitRate": 42.38,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-358",
    "predictorId": "pelton",
    "predictorName": "Pelton",
    "predictorAvatar": "/images/predictions/pelton.webp",
    "hitRate": 42.37,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-359",
    "predictorId": "nicholas",
    "predictorName": "Nicholas",
    "predictorAvatar": "/images/predictions/nicholas.webp",
    "hitRate": 42.35,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-360",
    "predictorId": "midhat",
    "predictorName": "Midhat",
    "predictorAvatar": "/images/predictions/midhat.webp",
    "hitRate": 42.35,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-361",
    "predictorId": "pascal",
    "predictorName": "Pascal",
    "predictorAvatar": "/images/predictions/pascal.webp",
    "hitRate": 42.31,
    "sport": "basketball"
  },
  {
    "id": "pred-362",
    "predictorId": "hodor",
    "predictorName": "Hodor",
    "predictorAvatar": "/images/predictions/hodor.webp",
    "hitRate": 42.31,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-363",
    "predictorId": "scooter",
    "predictorName": "Scooter",
    "predictorAvatar": "/images/predictions/scooter.webp",
    "hitRate": 42.29,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-364",
    "predictorId": "pirro",
    "predictorName": "Pirro",
    "predictorAvatar": "/images/predictions/pirro.webp",
    "hitRate": 42.29,
    "sport": "basketball"
  },
  {
    "id": "pred-365",
    "predictorId": "winulf",
    "predictorName": "Winulf",
    "predictorAvatar": "/images/predictions/winulf.webp",
    "hitRate": 42.27,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-366",
    "predictorId": "silko",
    "predictorName": "Silko",
    "predictorAvatar": "/images/predictions/silko.webp",
    "hitRate": 42.27,
    "sport": "basketball"
  },
  {
    "id": "pred-367",
    "predictorId": "alex",
    "predictorName": "Alex",
    "predictorAvatar": "/images/predictions/alex.webp",
    "hitRate": 42.26,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-368",
    "predictorId": "khadejah",
    "predictorName": "Khadejah",
    "predictorAvatar": "/images/predictions/khadejah.webp",
    "hitRate": 42.25,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-369",
    "predictorId": "othniel",
    "predictorName": "Othniel",
    "predictorAvatar": "/images/predictions/othniel.webp",
    "hitRate": 42.21,
    "sport": "basketball"
  },
  {
    "id": "pred-370",
    "predictorId": "eckhard",
    "predictorName": "Eckhard",
    "predictorAvatar": "/images/predictions/eckhard.webp",
    "hitRate": 42.19,
    "sport": "basketball"
  },
  {
    "id": "pred-371",
    "predictorId": "manfred",
    "predictorName": "Manfred",
    "predictorAvatar": "/images/predictions/manfred.webp",
    "hitRate": 42.19,
    "winStreak": "2x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-372",
    "predictorId": "drexel",
    "predictorName": "Drexel",
    "predictorAvatar": "/images/predictions/drexel.webp",
    "hitRate": 42.17,
    "sport": "basketball"
  },
  {
    "id": "pred-373",
    "predictorId": "yerodin",
    "predictorName": "Yerodin",
    "predictorAvatar": "/images/predictions/yerodin.webp",
    "hitRate": 42.17,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-374",
    "predictorId": "habib",
    "predictorName": "Habib",
    "predictorAvatar": "/images/predictions/habib.webp",
    "hitRate": 42.16,
    "sport": "basketball"
  },
  {
    "id": "pred-375",
    "predictorId": "carwyn",
    "predictorName": "Carwyn",
    "predictorAvatar": "/images/predictions/carwyn.webp",
    "hitRate": 42.1,
    "sport": "basketball"
  },
  {
    "id": "pred-376",
    "predictorId": "hamlin",
    "predictorName": "Hamlin",
    "predictorAvatar": "/images/predictions/hamlin.webp",
    "hitRate": 42.08,
    "winStreak": "2x wins",
    "sport": "basketball"
  },
  {
    "id": "pred-377",
    "predictorId": "nosewise",
    "predictorName": "Nosewise",
    "predictorAvatar": "/images/predictions/nosewise.webp",
    "hitRate": 42.04,
    "sport": "basketball"
  },
  {
    "id": "pred-378",
    "predictorId": "darrow",
    "predictorName": "Darrow",
    "predictorAvatar": "/images/predictions/darrow.webp",
    "hitRate": 42.03,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-379",
    "predictorId": "ion",
    "predictorName": "Ion",
    "predictorAvatar": "/images/predictions/ion.webp",
    "hitRate": 42.01,
    "sport": "basketball"
  },
  {
    "id": "pred-380",
    "predictorId": "hermias",
    "predictorName": "Hermias",
    "predictorAvatar": "/images/predictions/hermias.webp",
    "hitRate": 41.89,
    "sport": "basketball"
  },
  {
    "id": "pred-381",
    "predictorId": "sia",
    "predictorName": "Sia",
    "predictorAvatar": "/images/predictions/sia.webp",
    "hitRate": 41.87,
    "sport": "basketball"
  },
  {
    "id": "pred-382",
    "predictorId": "fumihiko",
    "predictorName": "Fumihiko",
    "predictorAvatar": "/images/predictions/fumihiko.webp",
    "hitRate": 41.86,
    "sport": "basketball"
  },
  {
    "id": "pred-383",
    "predictorId": "fei",
    "predictorName": "Fei",
    "predictorAvatar": "/images/predictions/fei.webp",
    "hitRate": 41.85,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-384",
    "predictorId": "jalil",
    "predictorName": "Jalil",
    "predictorAvatar": "/images/predictions/jalil.webp",
    "hitRate": 41.76,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-385",
    "predictorId": "aditya",
    "predictorName": "Aditya",
    "predictorAvatar": "/images/predictions/aditya.webp",
    "hitRate": 41.71,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-386",
    "predictorId": "tassos",
    "predictorName": "Tassos",
    "predictorAvatar": "/images/predictions/tassos.webp",
    "hitRate": 41.7,
    "sport": "basketball"
  },
  {
    "id": "pred-387",
    "predictorId": "astro",
    "predictorName": "Astro",
    "predictorAvatar": "/images/predictions/astro.webp",
    "hitRate": 41.7,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-388",
    "predictorId": "yitzhak",
    "predictorName": "Yitzhak",
    "predictorAvatar": "/images/predictions/yitzhak.webp",
    "hitRate": 41.66,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-389",
    "predictorId": "stanley",
    "predictorName": "Stanley",
    "predictorAvatar": "/images/predictions/stanley.webp",
    "hitRate": 41.66,
    "sport": "basketball"
  },
  {
    "id": "pred-390",
    "predictorId": "suelita",
    "predictorName": "Suelita",
    "predictorAvatar": "/images/predictions/suelita.webp",
    "hitRate": 41.64,
    "sport": "basketball"
  },
  {
    "id": "pred-391",
    "predictorId": "richard",
    "predictorName": "Richard",
    "predictorAvatar": "/images/predictions/richard.webp",
    "hitRate": 41.63,
    "sport": "basketball"
  },
  {
    "id": "pred-392",
    "predictorId": "narcissus",
    "predictorName": "Narcissus",
    "predictorAvatar": "/images/predictions/narcissus.webp",
    "hitRate": 41.62,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-393",
    "predictorId": "dalmazio",
    "predictorName": "Dalmazio",
    "predictorAvatar": "/images/predictions/dalmazio.webp",
    "hitRate": 41.61,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-394",
    "predictorId": "ramsey",
    "predictorName": "Ramsey",
    "predictorAvatar": "/images/predictions/ramsey.webp",
    "hitRate": 41.54,
    "winStreak": "2x wins",
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-395",
    "predictorId": "chayan",
    "predictorName": "Chayan",
    "predictorAvatar": "/images/predictions/chayan.webp",
    "hitRate": 41.54,
    "sport": "basketball"
  },
  {
    "id": "pred-396",
    "predictorId": "abu",
    "predictorName": "Abu",
    "predictorAvatar": "/images/predictions/abu.webp",
    "hitRate": 41.54,
    "sport": "basketball"
  },
  {
    "id": "pred-397",
    "predictorId": "jakai",
    "predictorName": "Jakai",
    "predictorAvatar": "/images/predictions/jakai.webp",
    "hitRate": 41.53,
    "sport": "basketball"
  },
  {
    "id": "pred-398",
    "predictorId": "aeolus",
    "predictorName": "Aeolus",
    "predictorAvatar": "/images/predictions/aeolus.webp",
    "hitRate": 41.53,
    "winStreak": "2x wins",
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-399",
    "predictorId": "sachio",
    "predictorName": "Sachio",
    "predictorAvatar": "/images/predictions/sachio.webp",
    "hitRate": 41.51,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-400",
    "predictorId": "daemyn",
    "predictorName": "Daemyn",
    "predictorAvatar": "/images/predictions/daemyn.webp",
    "hitRate": 41.5,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-401",
    "predictorId": "elihu",
    "predictorName": "Elihu",
    "predictorAvatar": "/images/predictions/elihu.webp",
    "hitRate": 41.49,
    "sport": "basketball"
  },
  {
    "id": "pred-402",
    "predictorId": "chinelo",
    "predictorName": "Chinelo",
    "predictorAvatar": "/images/predictions/chinelo.webp",
    "hitRate": 41.44,
    "sport": "basketball"
  },
  {
    "id": "pred-403",
    "predictorId": "walter",
    "predictorName": "Walter",
    "predictorAvatar": "/images/predictions/walter.webp",
    "hitRate": 41.43,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-404",
    "predictorId": "kanak",
    "predictorName": "Kanak",
    "predictorAvatar": "/images/predictions/kanak.webp",
    "hitRate": 41.4,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-405",
    "predictorId": "malik",
    "predictorName": "Malik",
    "predictorAvatar": "/images/predictions/malik.webp",
    "hitRate": 41.38,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-406",
    "predictorId": "herman",
    "predictorName": "Herman",
    "predictorAvatar": "/images/predictions/herman.webp",
    "hitRate": 41.26,
    "sport": "basketball"
  },
  {
    "id": "pred-407",
    "predictorId": "link",
    "predictorName": "Link",
    "predictorAvatar": "/images/predictions/link.webp",
    "hitRate": 41.25,
    "sport": "basketball"
  },
  {
    "id": "pred-408",
    "predictorId": "reynold",
    "predictorName": "Reynold",
    "predictorAvatar": "/images/predictions/reynold.webp",
    "hitRate": 41.23,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-409",
    "predictorId": "cornell",
    "predictorName": "Cornell",
    "predictorAvatar": "/images/predictions/cornell.webp",
    "hitRate": 40.99,
    "currentPredictions": 2,
    "sport": "basketball"
  },
  {
    "id": "pred-410",
    "predictorId": "caddock",
    "predictorName": "Caddock",
    "predictorAvatar": "/images/predictions/caddock.webp",
    "hitRate": 40.92,
    "sport": "basketball"
  },
  {
    "id": "pred-411",
    "predictorId": "antonius",
    "predictorName": "Antonius",
    "predictorAvatar": "/images/predictions/antonius.webp",
    "hitRate": 40.91,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-412",
    "predictorId": "rusul",
    "predictorName": "Rusul",
    "predictorAvatar": "/images/predictions/rusul.webp",
    "hitRate": 40.83,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-413",
    "predictorId": "satisha",
    "predictorName": "Satisha",
    "predictorAvatar": "/images/predictions/satisha.webp",
    "hitRate": 40.83,
    "sport": "basketball"
  },
  {
    "id": "pred-414",
    "predictorId": "cyrus",
    "predictorName": "Cyrus",
    "predictorAvatar": "/images/predictions/cyrus.webp",
    "hitRate": 40.58,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-415",
    "predictorId": "rooney",
    "predictorName": "Rooney",
    "predictorAvatar": "/images/predictions/rooney.webp",
    "hitRate": 39.78,
    "currentPredictions": 1,
    "sport": "basketball"
  },
  {
    "id": "pred-416",
    "predictorId": "bowie",
    "predictorName": "Bowie",
    "predictorAvatar": "/images/predictions/bowie.webp",
    "hitRate": 39.78,
    "sport": "basketball"
  },
  {
    "id": "pred-1",
    "predictorId": "jedaiah",
    "predictorName": "Jedaiah",
    "predictorAvatar": "/images/predictions/jedaiah.webp",
    "hitRate": 46.09,
    "winStreak": "3x wins",
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-2",
    "predictorId": "yodel",
    "predictorName": "Yodel",
    "predictorAvatar": "/images/predictions/yodel.webp",
    "hitRate": 46.07,
    "sport": "soccer"
  },
  {
    "id": "pred-3",
    "predictorId": "ervin",
    "predictorName": "Ervin",
    "predictorAvatar": "/images/predictions/ervin.webp",
    "hitRate": 46.06,
    "sport": "soccer"
  },
  {
    "id": "pred-4",
    "predictorId": "akihiro",
    "predictorName": "Akihiro",
    "predictorAvatar": "/images/predictions/akihiro.webp",
    "hitRate": 46.02,
    "sport": "soccer"
  },
  {
    "id": "pred-5",
    "predictorId": "dexter",
    "predictorName": "Dexter",
    "predictorAvatar": "/images/predictions/dexter.webp",
    "hitRate": 45.98,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-6",
    "predictorId": "carsten",
    "predictorName": "Carsten",
    "predictorAvatar": "/images/predictions/carsten.webp",
    "hitRate": 45.95,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-7",
    "predictorId": "ingo",
    "predictorName": "Ingo",
    "predictorAvatar": "/images/predictions/ingo.webp",
    "hitRate": 45.63,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-8",
    "predictorId": "dag",
    "predictorName": "Dag",
    "predictorAvatar": "/images/predictions/dag.webp",
    "hitRate": 45.52,
    "sport": "soccer"
  },
  {
    "id": "pred-9",
    "predictorId": "kalil",
    "predictorName": "Kalil",
    "predictorAvatar": "/images/predictions/kalil.webp",
    "hitRate": 45.47,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-10",
    "predictorId": "iker",
    "predictorName": "Iker",
    "predictorAvatar": "/images/predictions/iker.webp",
    "hitRate": 45.41,
    "sport": "soccer"
  },
  {
    "id": "pred-11",
    "predictorId": "zaccur",
    "predictorName": "Zaccur",
    "predictorAvatar": "/images/predictions/zaccur.webp",
    "hitRate": 45.37,
    "sport": "soccer"
  },
  {
    "id": "pred-12",
    "predictorId": "aron",
    "predictorName": "Aron",
    "predictorAvatar": "/images/predictions/aron.webp",
    "hitRate": 45.32,
    "sport": "soccer"
  },
  {
    "id": "pred-13",
    "predictorId": "lou",
    "predictorName": "Lou",
    "predictorAvatar": "/images/predictions/lou.webp",
    "hitRate": 45.3,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-14",
    "predictorId": "edmund",
    "predictorName": "Edmund",
    "predictorAvatar": "/images/predictions/edmund.webp",
    "hitRate": 45.22,
    "sport": "soccer"
  },
  {
    "id": "pred-15",
    "predictorId": "belial",
    "predictorName": "Belial",
    "predictorAvatar": "/images/predictions/belial.webp",
    "hitRate": 45.19,
    "sport": "soccer"
  },
  {
    "id": "pred-16",
    "predictorId": "leif",
    "predictorName": "Leif",
    "predictorAvatar": "/images/predictions/leif.webp",
    "hitRate": 45.15,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-17",
    "predictorId": "arvid",
    "predictorName": "Arvid",
    "predictorAvatar": "/images/predictions/arvid.webp",
    "hitRate": 45.13,
    "sport": "soccer"
  },
  {
    "id": "pred-18",
    "predictorId": "fayiz",
    "predictorName": "Fayiz",
    "predictorAvatar": "/images/predictions/fayiz.webp",
    "hitRate": 45.13,
    "sport": "soccer"
  },
  {
    "id": "pred-19",
    "predictorId": "jim",
    "predictorName": "Jim",
    "predictorAvatar": "/images/predictions/jim.webp",
    "hitRate": 45.13,
    "sport": "soccer"
  },
  {
    "id": "pred-20",
    "predictorId": "eithan",
    "predictorName": "Eithan",
    "predictorAvatar": "/images/predictions/eithan.webp",
    "hitRate": 45.06,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-21",
    "predictorId": "aric",
    "predictorName": "Aric",
    "predictorAvatar": "/images/predictions/aric.webp",
    "hitRate": 45.06,
    "sport": "soccer"
  },
  {
    "id": "pred-22",
    "predictorId": "boden",
    "predictorName": "Boden",
    "predictorAvatar": "/images/predictions/boden.webp",
    "hitRate": 45.05,
    "sport": "soccer"
  },
  {
    "id": "pred-23",
    "predictorId": "curran",
    "predictorName": "Curran",
    "predictorAvatar": "/images/predictions/curran.webp",
    "hitRate": 45.02,
    "sport": "soccer"
  },
  {
    "id": "pred-24",
    "predictorId": "kelvin",
    "predictorName": "Kelvin",
    "predictorAvatar": "/images/predictions/kelvin.webp",
    "hitRate": 45.01,
    "sport": "soccer"
  },
  {
    "id": "pred-25",
    "predictorId": "jayin",
    "predictorName": "Jayin",
    "predictorAvatar": "/images/predictions/jayin.webp",
    "hitRate": 45,
    "sport": "soccer"
  },
  {
    "id": "pred-26",
    "predictorId": "jaziel",
    "predictorName": "Jaziel",
    "predictorAvatar": "/images/predictions/jaziel.webp",
    "hitRate": 44.98,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-27",
    "predictorId": "joachim",
    "predictorName": "Joachim",
    "predictorAvatar": "/images/predictions/joachim.webp",
    "hitRate": 44.97,
    "sport": "soccer"
  },
  {
    "id": "pred-28",
    "predictorId": "arif",
    "predictorName": "Arif",
    "predictorAvatar": "/images/predictions/arif.webp",
    "hitRate": 44.96,
    "sport": "soccer"
  },
  {
    "id": "pred-29",
    "predictorId": "subrahmanyan",
    "predictorName": "Subrahmanyan",
    "predictorAvatar": "/images/predictions/subrahmanyan.webp",
    "hitRate": 44.94,
    "sport": "soccer"
  },
  {
    "id": "pred-30",
    "predictorId": "daithi",
    "predictorName": "Daithi",
    "predictorAvatar": "/images/predictions/daithi.webp",
    "hitRate": 44.93,
    "sport": "soccer"
  },
  {
    "id": "pred-31",
    "predictorId": "lailah",
    "predictorName": "Lailah",
    "predictorAvatar": "/images/predictions/lailah.webp",
    "hitRate": 44.91,
    "sport": "soccer"
  },
  {
    "id": "pred-32",
    "predictorId": "garvey",
    "predictorName": "Garvey",
    "predictorAvatar": "/images/predictions/garvey.webp",
    "hitRate": 44.88,
    "sport": "soccer"
  },
  {
    "id": "pred-33",
    "predictorId": "samuru",
    "predictorName": "Samuru",
    "predictorAvatar": "/images/predictions/samuru.webp",
    "hitRate": 44.85,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-34",
    "predictorId": "rizwana",
    "predictorName": "Rizwana",
    "predictorAvatar": "/images/predictions/rizwana.webp",
    "hitRate": 44.85,
    "sport": "soccer"
  },
  {
    "id": "pred-35",
    "predictorId": "pryce",
    "predictorName": "Pryce",
    "predictorAvatar": "/images/predictions/pryce.webp",
    "hitRate": 44.85,
    "sport": "soccer"
  },
  {
    "id": "pred-36",
    "predictorId": "ashton",
    "predictorName": "Ashton",
    "predictorAvatar": "/images/predictions/ashton.webp",
    "hitRate": 44.81,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-37",
    "predictorId": "elikai",
    "predictorName": "Elikai",
    "predictorAvatar": "/images/predictions/elikai.webp",
    "hitRate": 44.81,
    "sport": "soccer"
  },
  {
    "id": "pred-38",
    "predictorId": "jeroen",
    "predictorName": "Jeroen",
    "predictorAvatar": "/images/predictions/jeroen.webp",
    "hitRate": 44.81,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-39",
    "predictorId": "charolette",
    "predictorName": "Charolette",
    "predictorAvatar": "/images/predictions/charolette.webp",
    "hitRate": 44.75,
    "sport": "soccer"
  },
  {
    "id": "pred-40",
    "predictorId": "tevin",
    "predictorName": "Tevin",
    "predictorAvatar": "/images/predictions/tevin.webp",
    "hitRate": 44.73,
    "sport": "soccer"
  },
  {
    "id": "pred-41",
    "predictorId": "nando",
    "predictorName": "Nando",
    "predictorAvatar": "/images/predictions/nando.webp",
    "hitRate": 44.72,
    "sport": "soccer"
  },
  {
    "id": "pred-42",
    "predictorId": "rayvon",
    "predictorName": "Rayvon",
    "predictorAvatar": "/images/predictions/rayvon.webp",
    "hitRate": 44.72,
    "sport": "soccer"
  },
  {
    "id": "pred-43",
    "predictorId": "othmar",
    "predictorName": "Othmar",
    "predictorAvatar": "/images/predictions/othmar.webp",
    "hitRate": 44.7,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-44",
    "predictorId": "akello",
    "predictorName": "Akello",
    "predictorAvatar": "/images/predictions/akello.webp",
    "hitRate": 44.66,
    "sport": "soccer"
  },
  {
    "id": "pred-45",
    "predictorId": "cabot",
    "predictorName": "Cabot",
    "predictorAvatar": "/images/predictions/cabot.webp",
    "hitRate": 44.62,
    "sport": "soccer"
  },
  {
    "id": "pred-46",
    "predictorId": "manny",
    "predictorName": "Manny",
    "predictorAvatar": "/images/predictions/manny.webp",
    "hitRate": 44.61,
    "sport": "soccer"
  },
  {
    "id": "pred-47",
    "predictorId": "benen",
    "predictorName": "Benen",
    "predictorAvatar": "/images/predictions/benen.webp",
    "hitRate": 44.61,
    "sport": "soccer"
  },
  {
    "id": "pred-48",
    "predictorId": "pontus",
    "predictorName": "Pontus",
    "predictorAvatar": "/images/predictions/pontus.webp",
    "hitRate": 44.59,
    "winStreak": "2x wins",
    "currentPredictions": 3,
    "sport": "soccer"
  },
  {
    "id": "pred-49",
    "predictorId": "nikolas",
    "predictorName": "Nikolas",
    "predictorAvatar": "/images/predictions/nikolas.webp",
    "hitRate": 44.57,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-50",
    "predictorId": "bade",
    "predictorName": "Bade",
    "predictorAvatar": "/images/predictions/bade.webp",
    "hitRate": 44.56,
    "sport": "soccer"
  },
  {
    "id": "pred-51",
    "predictorId": "mitsuko",
    "predictorName": "Mitsuko",
    "predictorAvatar": "/images/predictions/mitsuko.webp",
    "hitRate": 44.56,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-52",
    "predictorId": "hisashi",
    "predictorName": "Hisashi",
    "predictorAvatar": "/images/predictions/hisashi.webp",
    "hitRate": 44.55,
    "sport": "soccer"
  },
  {
    "id": "pred-53",
    "predictorId": "zsuzsa",
    "predictorName": "Zsuzsa",
    "predictorAvatar": "/images/predictions/zsuzsa.webp",
    "hitRate": 44.54,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-54",
    "predictorId": "colton",
    "predictorName": "Colton",
    "predictorAvatar": "/images/predictions/colton.webp",
    "hitRate": 44.53,
    "sport": "soccer"
  },
  {
    "id": "pred-55",
    "predictorId": "nosewise",
    "predictorName": "Nosewise",
    "predictorAvatar": "/images/predictions/nosewise.webp",
    "hitRate": 44.52,
    "sport": "soccer"
  },
  {
    "id": "pred-56",
    "predictorId": "atle",
    "predictorName": "Atle",
    "predictorAvatar": "/images/predictions/atle.webp",
    "hitRate": 44.5,
    "sport": "soccer"
  },
  {
    "id": "pred-57",
    "predictorId": "din",
    "predictorName": "Din",
    "predictorAvatar": "/images/predictions/din.webp",
    "hitRate": 44.49,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-58",
    "predictorId": "shogo",
    "predictorName": "Shogo",
    "predictorAvatar": "/images/predictions/shogo.webp",
    "hitRate": 44.48,
    "sport": "soccer"
  },
  {
    "id": "pred-59",
    "predictorId": "dominick",
    "predictorName": "Dominick",
    "predictorAvatar": "/images/predictions/dominick.webp",
    "hitRate": 44.46,
    "currentPredictions": 3,
    "sport": "soccer"
  },
  {
    "id": "pred-60",
    "predictorId": "frida",
    "predictorName": "Frida",
    "predictorAvatar": "/images/predictions/frida.webp",
    "hitRate": 44.46,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-61",
    "predictorId": "joji",
    "predictorName": "Joji",
    "predictorAvatar": "/images/predictions/joji.webp",
    "hitRate": 44.46,
    "sport": "soccer"
  },
  {
    "id": "pred-62",
    "predictorId": "ramiro",
    "predictorName": "Ramiro",
    "predictorAvatar": "/images/predictions/ramiro.webp",
    "hitRate": 44.46,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-63",
    "predictorId": "keefe",
    "predictorName": "Keefe",
    "predictorAvatar": "/images/predictions/keefe.webp",
    "hitRate": 44.45,
    "sport": "soccer"
  },
  {
    "id": "pred-64",
    "predictorId": "guido",
    "predictorName": "Guido",
    "predictorAvatar": "/images/predictions/guido.webp",
    "hitRate": 44.45,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-65",
    "predictorId": "fumito",
    "predictorName": "Fumito",
    "predictorAvatar": "/images/predictions/fumito.webp",
    "hitRate": 44.44,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-66",
    "predictorId": "atawhai",
    "predictorName": "Atawhai",
    "predictorAvatar": "/images/predictions/atawhai.webp",
    "hitRate": 44.43,
    "sport": "soccer"
  },
  {
    "id": "pred-67",
    "predictorId": "ramirez",
    "predictorName": "Ramirez",
    "predictorAvatar": "/images/predictions/ramirez.webp",
    "hitRate": 44.41,
    "sport": "soccer"
  },
  {
    "id": "pred-68",
    "predictorId": "fraley",
    "predictorName": "Fraley",
    "predictorAvatar": "/images/predictions/fraley.webp",
    "hitRate": 44.41,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-69",
    "predictorId": "waldron",
    "predictorName": "Waldron",
    "predictorAvatar": "/images/predictions/waldron.webp",
    "hitRate": 44.41,
    "sport": "soccer"
  },
  {
    "id": "pred-70",
    "predictorId": "devlin",
    "predictorName": "Devlin",
    "predictorAvatar": "/images/predictions/devlin.webp",
    "hitRate": 44.4,
    "sport": "soccer"
  },
  {
    "id": "pred-71",
    "predictorId": "ravi",
    "predictorName": "Ravi",
    "predictorAvatar": "/images/predictions/ravi.webp",
    "hitRate": 44.39,
    "sport": "soccer"
  },
  {
    "id": "pred-72",
    "predictorId": "sthir",
    "predictorName": "Sthir",
    "predictorAvatar": "/images/predictions/sthir.webp",
    "hitRate": 44.39,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-73",
    "predictorId": "till",
    "predictorName": "Till",
    "predictorAvatar": "/images/predictions/till.webp",
    "hitRate": 44.39,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-74",
    "predictorId": "wheeler",
    "predictorName": "Wheeler",
    "predictorAvatar": "/images/predictions/wheeler.webp",
    "hitRate": 44.38,
    "winStreak": "3x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-75",
    "predictorId": "fernando",
    "predictorName": "Fernando",
    "predictorAvatar": "/images/predictions/fernando.webp",
    "hitRate": 44.38,
    "sport": "soccer"
  },
  {
    "id": "pred-76",
    "predictorId": "greg",
    "predictorName": "Greg",
    "predictorAvatar": "/images/predictions/greg.webp",
    "hitRate": 44.38,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-77",
    "predictorId": "emirhan",
    "predictorName": "Emirhan",
    "predictorAvatar": "/images/predictions/emirhan.webp",
    "hitRate": 44.37,
    "sport": "soccer"
  },
  {
    "id": "pred-78",
    "predictorId": "guy",
    "predictorName": "Guy",
    "predictorAvatar": "/images/predictions/guy.webp",
    "hitRate": 44.37,
    "sport": "soccer"
  },
  {
    "id": "pred-79",
    "predictorId": "dijon",
    "predictorName": "Dijon",
    "predictorAvatar": "/images/predictions/dijon.webp",
    "hitRate": 44.37,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-80",
    "predictorId": "amasai",
    "predictorName": "Amasai",
    "predictorAvatar": "/images/predictions/amasai.webp",
    "hitRate": 44.37,
    "sport": "soccer"
  },
  {
    "id": "pred-81",
    "predictorId": "cassander",
    "predictorName": "Cassander",
    "predictorAvatar": "/images/predictions/cassander.webp",
    "hitRate": 44.36,
    "sport": "soccer"
  },
  {
    "id": "pred-82",
    "predictorId": "evgeniy",
    "predictorName": "Evgeniy",
    "predictorAvatar": "/images/predictions/evgeniy.webp",
    "hitRate": 44.35,
    "sport": "soccer"
  },
  {
    "id": "pred-83",
    "predictorId": "dijon",
    "predictorName": "Dijon",
    "predictorAvatar": "/images/predictions/dijon.webp",
    "hitRate": 44.35,
    "sport": "soccer"
  },
  {
    "id": "pred-84",
    "predictorId": "yoshirou",
    "predictorName": "Yoshirou",
    "predictorAvatar": "/images/predictions/yoshirou.webp",
    "hitRate": 44.35,
    "sport": "soccer"
  },
  {
    "id": "pred-85",
    "predictorId": "ki",
    "predictorName": "Ki",
    "predictorAvatar": "/images/predictions/ki.webp",
    "hitRate": 44.35,
    "sport": "soccer"
  },
  {
    "id": "pred-86",
    "predictorId": "teman",
    "predictorName": "Teman",
    "predictorAvatar": "/images/predictions/teman.webp",
    "hitRate": 44.35,
    "sport": "soccer"
  },
  {
    "id": "pred-87",
    "predictorId": "muhammed",
    "predictorName": "Muhammed",
    "predictorAvatar": "/images/predictions/muhammed.webp",
    "hitRate": 44.34,
    "sport": "soccer"
  },
  {
    "id": "pred-88",
    "predictorId": "kande",
    "predictorName": "Kande",
    "predictorAvatar": "/images/predictions/kande.webp",
    "hitRate": 44.33,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-89",
    "predictorId": "fidel",
    "predictorName": "Fidel",
    "predictorAvatar": "/images/predictions/fidel.webp",
    "hitRate": 44.33,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-90",
    "predictorId": "wheeler",
    "predictorName": "Wheeler",
    "predictorAvatar": "/images/predictions/wheeler.webp",
    "hitRate": 44.33,
    "sport": "soccer"
  },
  {
    "id": "pred-91",
    "predictorId": "rohak",
    "predictorName": "Rohak",
    "predictorAvatar": "/images/predictions/rohak.webp",
    "hitRate": 44.33,
    "sport": "soccer"
  },
  {
    "id": "pred-92",
    "predictorId": "iikka",
    "predictorName": "Iikka",
    "predictorAvatar": "/images/predictions/iikka.webp",
    "hitRate": 44.32,
    "sport": "soccer"
  },
  {
    "id": "pred-93",
    "predictorId": "ranjit",
    "predictorName": "Ranjit",
    "predictorAvatar": "/images/predictions/ranjit.webp",
    "hitRate": 44.32,
    "sport": "soccer"
  },
  {
    "id": "pred-94",
    "predictorId": "martino",
    "predictorName": "Martino",
    "predictorAvatar": "/images/predictions/martino.webp",
    "hitRate": 44.31,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-95",
    "predictorId": "nirav",
    "predictorName": "Nirav",
    "predictorAvatar": "/images/predictions/nirav.webp",
    "hitRate": 44.3,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-96",
    "predictorId": "flavian",
    "predictorName": "Flavian",
    "predictorAvatar": "/images/predictions/flavian.webp",
    "hitRate": 44.3,
    "sport": "soccer"
  },
  {
    "id": "pred-97",
    "predictorId": "ikuya",
    "predictorName": "Ikuya",
    "predictorAvatar": "/images/predictions/ikuya.webp",
    "hitRate": 44.29,
    "sport": "soccer"
  },
  {
    "id": "pred-98",
    "predictorId": "jenson",
    "predictorName": "Jenson",
    "predictorAvatar": "/images/predictions/jenson.webp",
    "hitRate": 44.28,
    "sport": "soccer"
  },
  {
    "id": "pred-99",
    "predictorId": "valeriy",
    "predictorName": "Valeriy",
    "predictorAvatar": "/images/predictions/valeriy.webp",
    "hitRate": 44.28,
    "winStreak": "2x wins",
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-100",
    "predictorId": "caspian",
    "predictorName": "Caspian",
    "predictorAvatar": "/images/predictions/caspian.webp",
    "hitRate": 44.28,
    "sport": "soccer"
  },
  {
    "id": "pred-101",
    "predictorId": "humberto",
    "predictorName": "Humberto",
    "predictorAvatar": "/images/predictions/humberto.webp",
    "hitRate": 44.27,
    "sport": "soccer"
  },
  {
    "id": "pred-102",
    "predictorId": "rosh",
    "predictorName": "Rosh",
    "predictorAvatar": "/images/predictions/rosh.webp",
    "hitRate": 44.27,
    "sport": "soccer"
  },
  {
    "id": "pred-103",
    "predictorId": "aricin",
    "predictorName": "Aricin",
    "predictorAvatar": "/images/predictions/aricin.webp",
    "hitRate": 44.27,
    "sport": "soccer"
  },
  {
    "id": "pred-104",
    "predictorId": "tameron",
    "predictorName": "Tameron",
    "predictorAvatar": "/images/predictions/tameron.webp",
    "hitRate": 44.26,
    "sport": "soccer"
  },
  {
    "id": "pred-105",
    "predictorId": "dezi",
    "predictorName": "Dezi",
    "predictorAvatar": "/images/predictions/dezi.webp",
    "hitRate": 44.26,
    "sport": "soccer"
  },
  {
    "id": "pred-106",
    "predictorId": "ferrol",
    "predictorName": "Ferrol",
    "predictorAvatar": "/images/predictions/ferrol.webp",
    "hitRate": 44.26,
    "sport": "soccer"
  },
  {
    "id": "pred-107",
    "predictorId": "trenton",
    "predictorName": "Trenton",
    "predictorAvatar": "/images/predictions/trenton.webp",
    "hitRate": 44.26,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-108",
    "predictorId": "nana",
    "predictorName": "Nana",
    "predictorAvatar": "/images/predictions/nana.webp",
    "hitRate": 44.24,
    "sport": "soccer"
  },
  {
    "id": "pred-109",
    "predictorId": "juancho",
    "predictorName": "Juancho",
    "predictorAvatar": "/images/predictions/juancho.webp",
    "hitRate": 44.23,
    "sport": "soccer"
  },
  {
    "id": "pred-110",
    "predictorId": "carmi",
    "predictorName": "Carmi",
    "predictorAvatar": "/images/predictions/carmi.webp",
    "hitRate": 44.22,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-111",
    "predictorId": "ahe",
    "predictorName": "Ahe",
    "predictorAvatar": "/images/predictions/ahe.webp",
    "hitRate": 44.21,
    "sport": "soccer"
  },
  {
    "id": "pred-112",
    "predictorId": "granville",
    "predictorName": "Granville",
    "predictorAvatar": "/images/predictions/granville.webp",
    "hitRate": 44.21,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-113",
    "predictorId": "kesha",
    "predictorName": "Kesha",
    "predictorAvatar": "/images/predictions/kesha.webp",
    "hitRate": 44.21,
    "sport": "soccer"
  },
  {
    "id": "pred-114",
    "predictorId": "townes",
    "predictorName": "Townes",
    "predictorAvatar": "/images/predictions/townes.webp",
    "hitRate": 44.2,
    "sport": "soccer"
  },
  {
    "id": "pred-115",
    "predictorId": "faustus",
    "predictorName": "Faustus",
    "predictorAvatar": "/images/predictions/faustus.webp",
    "hitRate": 44.2,
    "sport": "soccer"
  },
  {
    "id": "pred-116",
    "predictorId": "cormick",
    "predictorName": "Cormick",
    "predictorAvatar": "/images/predictions/cormick.webp",
    "hitRate": 44.19,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-117",
    "predictorId": "acoose",
    "predictorName": "Acoose",
    "predictorAvatar": "/images/predictions/acoose.webp",
    "hitRate": 44.19,
    "sport": "soccer"
  },
  {
    "id": "pred-118",
    "predictorId": "shaman",
    "predictorName": "Shaman",
    "predictorAvatar": "/images/predictions/shaman.webp",
    "hitRate": 44.19,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-119",
    "predictorId": "atsuo",
    "predictorName": "Atsuo",
    "predictorAvatar": "/images/predictions/atsuo.webp",
    "hitRate": 44.18,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-120",
    "predictorId": "aziz",
    "predictorName": "Aziz",
    "predictorAvatar": "/images/predictions/aziz.webp",
    "hitRate": 44.18,
    "sport": "soccer"
  },
  {
    "id": "pred-121",
    "predictorId": "alric",
    "predictorName": "Alric",
    "predictorAvatar": "/images/predictions/alric.webp",
    "hitRate": 44.17,
    "sport": "soccer"
  },
  {
    "id": "pred-122",
    "predictorId": "ayaz",
    "predictorName": "Ayaz",
    "predictorAvatar": "/images/predictions/ayaz.webp",
    "hitRate": 44.17,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-123",
    "predictorId": "osvaldo",
    "predictorName": "Osvaldo",
    "predictorAvatar": "/images/predictions/osvaldo.webp",
    "hitRate": 44.16,
    "sport": "soccer"
  },
  {
    "id": "pred-124",
    "predictorId": "curran",
    "predictorName": "Curran",
    "predictorAvatar": "/images/predictions/curran.webp",
    "hitRate": 44.15,
    "sport": "soccer"
  },
  {
    "id": "pred-125",
    "predictorId": "masashi",
    "predictorName": "Masashi",
    "predictorAvatar": "/images/predictions/masashi.webp",
    "hitRate": 44.14,
    "sport": "soccer"
  },
  {
    "id": "pred-126",
    "predictorId": "stillman",
    "predictorName": "Stillman",
    "predictorAvatar": "/images/predictions/stillman.webp",
    "hitRate": 44.12,
    "sport": "soccer"
  },
  {
    "id": "pred-127",
    "predictorId": "devaun",
    "predictorName": "Devaun",
    "predictorAvatar": "/images/predictions/devaun.webp",
    "hitRate": 44.12,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-128",
    "predictorId": "xadrian",
    "predictorName": "Xadrian",
    "predictorAvatar": "/images/predictions/xadrian.webp",
    "hitRate": 44.11,
    "winStreak": "3x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-129",
    "predictorId": "giolla",
    "predictorName": "Giolla",
    "predictorAvatar": "/images/predictions/giolla.webp",
    "hitRate": 44.1,
    "sport": "soccer"
  },
  {
    "id": "pred-130",
    "predictorId": "helladius",
    "predictorName": "Helladius",
    "predictorAvatar": "/images/predictions/helladius.webp",
    "hitRate": 44.09,
    "sport": "soccer"
  },
  {
    "id": "pred-131",
    "predictorId": "royce",
    "predictorName": "Royce",
    "predictorAvatar": "/images/predictions/royce.webp",
    "hitRate": 44.09,
    "sport": "soccer"
  },
  {
    "id": "pred-132",
    "predictorId": "broox",
    "predictorName": "Broox",
    "predictorAvatar": "/images/predictions/broox.webp",
    "hitRate": 44.09,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-133",
    "predictorId": "baer",
    "predictorName": "Baer",
    "predictorAvatar": "/images/predictions/baer.webp",
    "hitRate": 44.08,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-134",
    "predictorId": "abba",
    "predictorName": "Abba",
    "predictorAvatar": "/images/predictions/abba.webp",
    "hitRate": 44.08,
    "sport": "soccer"
  },
  {
    "id": "pred-135",
    "predictorId": "harel",
    "predictorName": "Harel",
    "predictorAvatar": "/images/predictions/harel.webp",
    "hitRate": 44.08,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-136",
    "predictorId": "travis",
    "predictorName": "Travis",
    "predictorAvatar": "/images/predictions/travis.webp",
    "hitRate": 44.07,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-137",
    "predictorId": "konstantin",
    "predictorName": "Konstantin",
    "predictorAvatar": "/images/predictions/konstantin.webp",
    "hitRate": 44.07,
    "sport": "soccer"
  },
  {
    "id": "pred-138",
    "predictorId": "vidar",
    "predictorName": "Vidar",
    "predictorAvatar": "/images/predictions/vidar.webp",
    "hitRate": 44.07,
    "sport": "soccer"
  },
  {
    "id": "pred-139",
    "predictorId": "colten",
    "predictorName": "Colten",
    "predictorAvatar": "/images/predictions/colten.webp",
    "hitRate": 44.06,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-140",
    "predictorId": "hastin",
    "predictorName": "Hastin",
    "predictorAvatar": "/images/predictions/hastin.webp",
    "hitRate": 44.06,
    "sport": "soccer"
  },
  {
    "id": "pred-141",
    "predictorId": "garin",
    "predictorName": "Garin",
    "predictorAvatar": "/images/predictions/garin.webp",
    "hitRate": 44.05,
    "sport": "soccer"
  },
  {
    "id": "pred-142",
    "predictorId": "divyesh",
    "predictorName": "Divyesh",
    "predictorAvatar": "/images/predictions/divyesh.webp",
    "hitRate": 44.04,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-143",
    "predictorId": "candra",
    "predictorName": "Candra",
    "predictorAvatar": "/images/predictions/candra.webp",
    "hitRate": 44.04,
    "sport": "soccer"
  },
  {
    "id": "pred-144",
    "predictorId": "amado",
    "predictorName": "Amado",
    "predictorAvatar": "/images/predictions/amado.webp",
    "hitRate": 44.03,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-145",
    "predictorId": "alan",
    "predictorName": "Alan",
    "predictorAvatar": "/images/predictions/alan.webp",
    "hitRate": 44.03,
    "sport": "soccer"
  },
  {
    "id": "pred-146",
    "predictorId": "richard",
    "predictorName": "Richard",
    "predictorAvatar": "/images/predictions/richard.webp",
    "hitRate": 44.03,
    "sport": "soccer"
  },
  {
    "id": "pred-147",
    "predictorId": "dragon",
    "predictorName": "Dragon",
    "predictorAvatar": "/images/predictions/dragon.webp",
    "hitRate": 44.01,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-148",
    "predictorId": "riku",
    "predictorName": "Riku",
    "predictorAvatar": "/images/predictions/riku.webp",
    "hitRate": 44.01,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-149",
    "predictorId": "cortland",
    "predictorName": "Cortland",
    "predictorAvatar": "/images/predictions/cortland.webp",
    "hitRate": 44.01,
    "sport": "soccer"
  },
  {
    "id": "pred-150",
    "predictorId": "donald",
    "predictorName": "Donald",
    "predictorAvatar": "/images/predictions/donald.webp",
    "hitRate": 44,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-151",
    "predictorId": "heman",
    "predictorName": "Heman",
    "predictorAvatar": "/images/predictions/heman.webp",
    "hitRate": 44,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-152",
    "predictorId": "thaddai",
    "predictorName": "Thaddai",
    "predictorAvatar": "/images/predictions/thaddai.webp",
    "hitRate": 44,
    "sport": "soccer"
  },
  {
    "id": "pred-153",
    "predictorId": "shigeto",
    "predictorName": "Shigeto",
    "predictorAvatar": "/images/predictions/shigeto.webp",
    "hitRate": 44,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-154",
    "predictorId": "heli",
    "predictorName": "Heli",
    "predictorAvatar": "/images/predictions/heli.webp",
    "hitRate": 43.99,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-155",
    "predictorId": "jarl",
    "predictorName": "Jarl",
    "predictorAvatar": "/images/predictions/jarl.webp",
    "hitRate": 43.96,
    "sport": "soccer"
  },
  {
    "id": "pred-156",
    "predictorId": "svante",
    "predictorName": "Svante",
    "predictorAvatar": "/images/predictions/svante.webp",
    "hitRate": 43.96,
    "sport": "soccer"
  },
  {
    "id": "pred-157",
    "predictorId": "abimelech",
    "predictorName": "Abimelech",
    "predictorAvatar": "/images/predictions/abimelech.webp",
    "hitRate": 43.96,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-158",
    "predictorId": "ishmael",
    "predictorName": "Ishmael",
    "predictorAvatar": "/images/predictions/ishmael.webp",
    "hitRate": 43.95,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-159",
    "predictorId": "caspian",
    "predictorName": "Caspian",
    "predictorAvatar": "/images/predictions/caspian.webp",
    "hitRate": 43.95,
    "sport": "soccer"
  },
  {
    "id": "pred-160",
    "predictorId": "vincenzo",
    "predictorName": "Vincenzo",
    "predictorAvatar": "/images/predictions/vincenzo.webp",
    "hitRate": 43.94,
    "sport": "soccer"
  },
  {
    "id": "pred-161",
    "predictorId": "adish",
    "predictorName": "Adish",
    "predictorAvatar": "/images/predictions/adish.webp",
    "hitRate": 43.94,
    "sport": "soccer"
  },
  {
    "id": "pred-162",
    "predictorId": "eliel",
    "predictorName": "Eliel",
    "predictorAvatar": "/images/predictions/eliel.webp",
    "hitRate": 43.93,
    "sport": "soccer"
  },
  {
    "id": "pred-163",
    "predictorId": "lokman",
    "predictorName": "Lokman",
    "predictorAvatar": "/images/predictions/lokman.webp",
    "hitRate": 43.93,
    "sport": "soccer"
  },
  {
    "id": "pred-164",
    "predictorId": "taj",
    "predictorName": "Taj",
    "predictorAvatar": "/images/predictions/taj.webp",
    "hitRate": 43.93,
    "sport": "soccer"
  },
  {
    "id": "pred-165",
    "predictorId": "esdras",
    "predictorName": "Esdras",
    "predictorAvatar": "/images/predictions/esdras.webp",
    "hitRate": 43.92,
    "sport": "soccer"
  },
  {
    "id": "pred-166",
    "predictorId": "khalon",
    "predictorName": "Khalon",
    "predictorAvatar": "/images/predictions/khalon.webp",
    "hitRate": 43.91,
    "sport": "soccer"
  },
  {
    "id": "pred-167",
    "predictorId": "nicodemus",
    "predictorName": "Nicodemus",
    "predictorAvatar": "/images/predictions/nicodemus.webp",
    "hitRate": 43.91,
    "sport": "soccer"
  },
  {
    "id": "pred-168",
    "predictorId": "kong",
    "predictorName": "Kong",
    "predictorAvatar": "/images/predictions/kong.webp",
    "hitRate": 43.9,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-169",
    "predictorId": "lot",
    "predictorName": "Lot",
    "predictorAvatar": "/images/predictions/lot.webp",
    "hitRate": 43.89,
    "sport": "soccer"
  },
  {
    "id": "pred-170",
    "predictorId": "emiel",
    "predictorName": "Emiel",
    "predictorAvatar": "/images/predictions/emiel.webp",
    "hitRate": 43.89,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-171",
    "predictorId": "marciano",
    "predictorName": "Marciano",
    "predictorAvatar": "/images/predictions/marciano.webp",
    "hitRate": 43.89,
    "sport": "soccer"
  },
  {
    "id": "pred-172",
    "predictorId": "rob",
    "predictorName": "Rob",
    "predictorAvatar": "/images/predictions/rob.webp",
    "hitRate": 43.88,
    "sport": "soccer"
  },
  {
    "id": "pred-173",
    "predictorId": "chazz",
    "predictorName": "Chazz",
    "predictorAvatar": "/images/predictions/chazz.webp",
    "hitRate": 43.87,
    "sport": "soccer"
  },
  {
    "id": "pred-174",
    "predictorId": "uttam",
    "predictorName": "Uttam",
    "predictorAvatar": "/images/predictions/uttam.webp",
    "hitRate": 43.87,
    "sport": "soccer"
  },
  {
    "id": "pred-175",
    "predictorId": "georgino",
    "predictorName": "Georgino",
    "predictorAvatar": "/images/predictions/georgino.webp",
    "hitRate": 43.87,
    "sport": "soccer"
  },
  {
    "id": "pred-176",
    "predictorId": "leyati",
    "predictorName": "Leyati",
    "predictorAvatar": "/images/predictions/leyati.webp",
    "hitRate": 43.86,
    "sport": "soccer"
  },
  {
    "id": "pred-177",
    "predictorId": "aanav",
    "predictorName": "Aanav",
    "predictorAvatar": "/images/predictions/aanav.webp",
    "hitRate": 43.85,
    "sport": "soccer"
  },
  {
    "id": "pred-178",
    "predictorId": "osher",
    "predictorName": "Osher",
    "predictorAvatar": "/images/predictions/osher.webp",
    "hitRate": 43.85,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-179",
    "predictorId": "jeff",
    "predictorName": "Jeff",
    "predictorAvatar": "/images/predictions/jeff.webp",
    "hitRate": 43.85,
    "sport": "soccer"
  },
  {
    "id": "pred-180",
    "predictorId": "braulio",
    "predictorName": "Braulio",
    "predictorAvatar": "/images/predictions/braulio.webp",
    "hitRate": 43.84,
    "sport": "soccer"
  },
  {
    "id": "pred-181",
    "predictorId": "xanto",
    "predictorName": "Xanto",
    "predictorAvatar": "/images/predictions/xanto.webp",
    "hitRate": 43.83,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-182",
    "predictorId": "spurius",
    "predictorName": "Spurius",
    "predictorAvatar": "/images/predictions/spurius.webp",
    "hitRate": 43.83,
    "sport": "soccer"
  },
  {
    "id": "pred-183",
    "predictorId": "bedevere",
    "predictorName": "Bedevere",
    "predictorAvatar": "/images/predictions/bedevere.webp",
    "hitRate": 43.83,
    "sport": "soccer"
  },
  {
    "id": "pred-184",
    "predictorId": "christoffer",
    "predictorName": "Christoffer",
    "predictorAvatar": "/images/predictions/christoffer.webp",
    "hitRate": 43.83,
    "sport": "soccer"
  },
  {
    "id": "pred-185",
    "predictorId": "bary",
    "predictorName": "Bary",
    "predictorAvatar": "/images/predictions/bary.webp",
    "hitRate": 43.82,
    "sport": "soccer"
  },
  {
    "id": "pred-186",
    "predictorId": "romney",
    "predictorName": "Romney",
    "predictorAvatar": "/images/predictions/romney.webp",
    "hitRate": 43.82,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-187",
    "predictorId": "hercule",
    "predictorName": "Hercule",
    "predictorAvatar": "/images/predictions/hercule.webp",
    "hitRate": 43.81,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-188",
    "predictorId": "adarsh",
    "predictorName": "Adarsh",
    "predictorAvatar": "/images/predictions/adarsh.webp",
    "hitRate": 43.8,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-189",
    "predictorId": "abhinav",
    "predictorName": "Abhinav",
    "predictorAvatar": "/images/predictions/abhinav.webp",
    "hitRate": 43.8,
    "sport": "soccer"
  },
  {
    "id": "pred-190",
    "predictorId": "benedict",
    "predictorName": "Benedict",
    "predictorAvatar": "/images/predictions/benedict.webp",
    "hitRate": 43.8,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-191",
    "predictorId": "gerhard",
    "predictorName": "Gerhard",
    "predictorAvatar": "/images/predictions/gerhard.webp",
    "hitRate": 43.79,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-192",
    "predictorId": "ignace",
    "predictorName": "Ignace",
    "predictorAvatar": "/images/predictions/ignace.webp",
    "hitRate": 43.79,
    "sport": "soccer"
  },
  {
    "id": "pred-193",
    "predictorId": "benoit",
    "predictorName": "Benoît",
    "predictorAvatar": "/images/predictions/benoit.webp",
    "hitRate": 43.78,
    "sport": "soccer"
  },
  {
    "id": "pred-194",
    "predictorId": "aleem",
    "predictorName": "Aleem",
    "predictorAvatar": "/images/predictions/aleem.webp",
    "hitRate": 43.77,
    "sport": "soccer"
  },
  {
    "id": "pred-195",
    "predictorId": "bairn",
    "predictorName": "Bairn",
    "predictorAvatar": "/images/predictions/bairn.webp",
    "hitRate": 43.77,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-196",
    "predictorId": "epifanio",
    "predictorName": "Epifanio",
    "predictorAvatar": "/images/predictions/epifanio.webp",
    "hitRate": 43.76,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-197",
    "predictorId": "moby",
    "predictorName": "Moby",
    "predictorAvatar": "/images/predictions/moby.webp",
    "hitRate": 43.76,
    "sport": "soccer"
  },
  {
    "id": "pred-198",
    "predictorId": "destino",
    "predictorName": "Destino",
    "predictorAvatar": "/images/predictions/destino.webp",
    "hitRate": 43.75,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-199",
    "predictorId": "winthrop",
    "predictorName": "Winthrop",
    "predictorAvatar": "/images/predictions/winthrop.webp",
    "hitRate": 43.75,
    "sport": "soccer"
  },
  {
    "id": "pred-200",
    "predictorId": "velvel",
    "predictorName": "Velvel",
    "predictorAvatar": "/images/predictions/velvel.webp",
    "hitRate": 43.74,
    "sport": "soccer"
  },
  {
    "id": "pred-201",
    "predictorId": "yusef",
    "predictorName": "Yusef",
    "predictorAvatar": "/images/predictions/yusef.webp",
    "hitRate": 43.74,
    "sport": "soccer"
  },
  {
    "id": "pred-202",
    "predictorId": "khal",
    "predictorName": "Khal",
    "predictorAvatar": "/images/predictions/khal.webp",
    "hitRate": 43.73,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-203",
    "predictorId": "jolyon",
    "predictorName": "Jolyon",
    "predictorAvatar": "/images/predictions/jolyon.webp",
    "hitRate": 43.73,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-204",
    "predictorId": "ridha",
    "predictorName": "Ridha",
    "predictorAvatar": "/images/predictions/ridha.webp",
    "hitRate": 43.72,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-205",
    "predictorId": "jamil",
    "predictorName": "Jamil",
    "predictorAvatar": "/images/predictions/jamil.webp",
    "hitRate": 43.72,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-206",
    "predictorId": "telesphore",
    "predictorName": "Telesphore",
    "predictorAvatar": "/images/predictions/telesphore.webp",
    "hitRate": 43.71,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-207",
    "predictorId": "fiorenzo",
    "predictorName": "Fiorenzo",
    "predictorAvatar": "/images/predictions/fiorenzo.webp",
    "hitRate": 43.71,
    "sport": "soccer"
  },
  {
    "id": "pred-208",
    "predictorId": "floyd",
    "predictorName": "Floyd",
    "predictorAvatar": "/images/predictions/floyd.webp",
    "hitRate": 43.71,
    "sport": "soccer"
  },
  {
    "id": "pred-209",
    "predictorId": "lesharo",
    "predictorName": "Lesharo",
    "predictorAvatar": "/images/predictions/lesharo.webp",
    "hitRate": 43.69,
    "sport": "soccer"
  },
  {
    "id": "pred-210",
    "predictorId": "alto",
    "predictorName": "Alto",
    "predictorAvatar": "/images/predictions/alto.webp",
    "hitRate": 43.68,
    "sport": "soccer"
  },
  {
    "id": "pred-211",
    "predictorId": "gennadiy",
    "predictorName": "Gennadiy",
    "predictorAvatar": "/images/predictions/gennadiy.webp",
    "hitRate": 43.67,
    "sport": "soccer"
  },
  {
    "id": "pred-212",
    "predictorId": "kane",
    "predictorName": "Kane",
    "predictorAvatar": "/images/predictions/kane.webp",
    "hitRate": 43.66,
    "sport": "soccer"
  },
  {
    "id": "pred-213",
    "predictorId": "ephrath",
    "predictorName": "Ephrath",
    "predictorAvatar": "/images/predictions/ephrath.webp",
    "hitRate": 43.66,
    "sport": "soccer"
  },
  {
    "id": "pred-214",
    "predictorId": "spence",
    "predictorName": "Spence",
    "predictorAvatar": "/images/predictions/spence.webp",
    "hitRate": 43.66,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-215",
    "predictorId": "estevao",
    "predictorName": "Estevao",
    "predictorAvatar": "/images/predictions/estevao.webp",
    "hitRate": 43.65,
    "sport": "soccer"
  },
  {
    "id": "pred-216",
    "predictorId": "marius",
    "predictorName": "Marius",
    "predictorAvatar": "/images/predictions/marius.webp",
    "hitRate": 43.65,
    "sport": "soccer"
  },
  {
    "id": "pred-217",
    "predictorId": "alberto",
    "predictorName": "Alberto",
    "predictorAvatar": "/images/predictions/alberto.webp",
    "hitRate": 43.64,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-218",
    "predictorId": "mohawk",
    "predictorName": "Mohawk",
    "predictorAvatar": "/images/predictions/mohawk.webp",
    "hitRate": 43.64,
    "sport": "soccer"
  },
  {
    "id": "pred-219",
    "predictorId": "arrio",
    "predictorName": "Arrio",
    "predictorAvatar": "/images/predictions/arrio.webp",
    "hitRate": 43.64,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-220",
    "predictorId": "trevin",
    "predictorName": "Trevin",
    "predictorAvatar": "/images/predictions/trevin.webp",
    "hitRate": 43.64,
    "sport": "soccer"
  },
  {
    "id": "pred-221",
    "predictorId": "tsutomu",
    "predictorName": "Tsutomu",
    "predictorAvatar": "/images/predictions/tsutomu.webp",
    "hitRate": 43.63,
    "sport": "soccer"
  },
  {
    "id": "pred-222",
    "predictorId": "mimi",
    "predictorName": "Mimi",
    "predictorAvatar": "/images/predictions/mimi.webp",
    "hitRate": 43.63,
    "sport": "soccer"
  },
  {
    "id": "pred-223",
    "predictorId": "trenton",
    "predictorName": "Trenton",
    "predictorAvatar": "/images/predictions/trenton.webp",
    "hitRate": 43.62,
    "sport": "soccer"
  },
  {
    "id": "pred-224",
    "predictorId": "yotam",
    "predictorName": "Yotam",
    "predictorAvatar": "/images/predictions/yotam.webp",
    "hitRate": 43.61,
    "sport": "soccer"
  },
  {
    "id": "pred-225",
    "predictorId": "abhilash",
    "predictorName": "Abhilash",
    "predictorAvatar": "/images/predictions/abhilash.webp",
    "hitRate": 43.61,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-226",
    "predictorId": "melchior",
    "predictorName": "Melchior",
    "predictorAvatar": "/images/predictions/melchior.webp",
    "hitRate": 43.61,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-227",
    "predictorId": "shikamaru",
    "predictorName": "Shikamaru",
    "predictorAvatar": "/images/predictions/shikamaru.webp",
    "hitRate": 43.59,
    "sport": "soccer"
  },
  {
    "id": "pred-228",
    "predictorId": "jeramiah",
    "predictorName": "Jeramiah",
    "predictorAvatar": "/images/predictions/jeramiah.webp",
    "hitRate": 43.59,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-229",
    "predictorId": "winfred",
    "predictorName": "Winfred",
    "predictorAvatar": "/images/predictions/winfred.webp",
    "hitRate": 43.59,
    "sport": "soccer"
  },
  {
    "id": "pred-230",
    "predictorId": "herb",
    "predictorName": "Herb",
    "predictorAvatar": "/images/predictions/herb.webp",
    "hitRate": 43.57,
    "sport": "soccer"
  },
  {
    "id": "pred-231",
    "predictorId": "amasai",
    "predictorName": "Amasai",
    "predictorAvatar": "/images/predictions/amasai.webp",
    "hitRate": 43.57,
    "sport": "soccer"
  },
  {
    "id": "pred-232",
    "predictorId": "garfield",
    "predictorName": "Garfield",
    "predictorAvatar": "/images/predictions/garfield.webp",
    "hitRate": 43.56,
    "sport": "soccer"
  },
  {
    "id": "pred-233",
    "predictorId": "hisashi",
    "predictorName": "Hisashi",
    "predictorAvatar": "/images/predictions/hisashi.webp",
    "hitRate": 43.56,
    "sport": "soccer"
  },
  {
    "id": "pred-234",
    "predictorId": "hunt",
    "predictorName": "Hunt",
    "predictorAvatar": "/images/predictions/hunt.webp",
    "hitRate": 43.55,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-235",
    "predictorId": "vernados",
    "predictorName": "Vernados",
    "predictorAvatar": "/images/predictions/vernados.webp",
    "hitRate": 43.54,
    "sport": "soccer"
  },
  {
    "id": "pred-236",
    "predictorId": "gia",
    "predictorName": "Gia",
    "predictorAvatar": "/images/predictions/gia.webp",
    "hitRate": 43.53,
    "sport": "soccer"
  },
  {
    "id": "pred-237",
    "predictorId": "ephrath",
    "predictorName": "Ephrath",
    "predictorAvatar": "/images/predictions/ephrath.webp",
    "hitRate": 43.53,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-238",
    "predictorId": "ferrol",
    "predictorName": "Ferrol",
    "predictorAvatar": "/images/predictions/ferrol.webp",
    "hitRate": 43.53,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-239",
    "predictorId": "kumar",
    "predictorName": "Kumar",
    "predictorAvatar": "/images/predictions/kumar.webp",
    "hitRate": 43.52,
    "sport": "soccer"
  },
  {
    "id": "pred-240",
    "predictorId": "peleg",
    "predictorName": "Peleg",
    "predictorAvatar": "/images/predictions/peleg.webp",
    "hitRate": 43.5,
    "sport": "soccer"
  },
  {
    "id": "pred-241",
    "predictorId": "gradin",
    "predictorName": "Gradin",
    "predictorAvatar": "/images/predictions/gradin.webp",
    "hitRate": 43.49,
    "sport": "soccer"
  },
  {
    "id": "pred-242",
    "predictorId": "ynyr",
    "predictorName": "Ynyr",
    "predictorAvatar": "/images/predictions/ynyr.webp",
    "hitRate": 43.49,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-243",
    "predictorId": "orfeo",
    "predictorName": "Orfeo",
    "predictorAvatar": "/images/predictions/orfeo.webp",
    "hitRate": 43.48,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-244",
    "predictorId": "kainda",
    "predictorName": "Kainda",
    "predictorAvatar": "/images/predictions/kainda.webp",
    "hitRate": 43.48,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-245",
    "predictorId": "junior",
    "predictorName": "Junior",
    "predictorAvatar": "/images/predictions/junior.webp",
    "hitRate": 43.47,
    "sport": "soccer"
  },
  {
    "id": "pred-246",
    "predictorId": "garton",
    "predictorName": "Garton",
    "predictorAvatar": "/images/predictions/garton.webp",
    "hitRate": 43.47,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-247",
    "predictorId": "octavio",
    "predictorName": "Octavio",
    "predictorAvatar": "/images/predictions/octavio.webp",
    "hitRate": 43.47,
    "sport": "soccer"
  },
  {
    "id": "pred-248",
    "predictorId": "arshad",
    "predictorName": "Arshad",
    "predictorAvatar": "/images/predictions/arshad.webp",
    "hitRate": 43.46,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-249",
    "predictorId": "nichola",
    "predictorName": "Nichola",
    "predictorAvatar": "/images/predictions/nichola.webp",
    "hitRate": 43.45,
    "sport": "soccer"
  },
  {
    "id": "pred-250",
    "predictorId": "armas",
    "predictorName": "Armas",
    "predictorAvatar": "/images/predictions/armas.webp",
    "hitRate": 43.44,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-251",
    "predictorId": "black",
    "predictorName": "Black",
    "predictorAvatar": "/images/predictions/black.webp",
    "hitRate": 43.44,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-252",
    "predictorId": "danton",
    "predictorName": "Danton",
    "predictorAvatar": "/images/predictions/danton.webp",
    "hitRate": 43.43,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-253",
    "predictorId": "dick",
    "predictorName": "Dick",
    "predictorAvatar": "/images/predictions/dick.webp",
    "hitRate": 43.43,
    "sport": "soccer"
  },
  {
    "id": "pred-254",
    "predictorId": "muhsina",
    "predictorName": "Muhsina",
    "predictorAvatar": "/images/predictions/muhsina.webp",
    "hitRate": 43.42,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-255",
    "predictorId": "regis",
    "predictorName": "Regis",
    "predictorAvatar": "/images/predictions/regis.webp",
    "hitRate": 43.41,
    "sport": "soccer"
  },
  {
    "id": "pred-256",
    "predictorId": "tyshawn",
    "predictorName": "Tyshawn",
    "predictorAvatar": "/images/predictions/tyshawn.webp",
    "hitRate": 43.4,
    "sport": "soccer"
  },
  {
    "id": "pred-257",
    "predictorId": "leo",
    "predictorName": "Leo",
    "predictorAvatar": "/images/predictions/leo.webp",
    "hitRate": 43.4,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-258",
    "predictorId": "leriel",
    "predictorName": "Leriel",
    "predictorAvatar": "/images/predictions/leriel.webp",
    "hitRate": 43.39,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-259",
    "predictorId": "caolan",
    "predictorName": "Caolan",
    "predictorAvatar": "/images/predictions/caolan.webp",
    "hitRate": 43.39,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-260",
    "predictorId": "liam",
    "predictorName": "Liam",
    "predictorAvatar": "/images/predictions/liam.webp",
    "hitRate": 43.39,
    "sport": "soccer"
  },
  {
    "id": "pred-261",
    "predictorId": "gwalchmai",
    "predictorName": "Gwalchmai",
    "predictorAvatar": "/images/predictions/gwalchmai.webp",
    "hitRate": 43.38,
    "sport": "soccer"
  },
  {
    "id": "pred-262",
    "predictorId": "asuma",
    "predictorName": "Asuma",
    "predictorAvatar": "/images/predictions/asuma.webp",
    "hitRate": 43.37,
    "sport": "soccer"
  },
  {
    "id": "pred-263",
    "predictorId": "balin",
    "predictorName": "Balin",
    "predictorAvatar": "/images/predictions/balin.webp",
    "hitRate": 43.37,
    "sport": "soccer"
  },
  {
    "id": "pred-264",
    "predictorId": "oswulf",
    "predictorName": "Oswulf",
    "predictorAvatar": "/images/predictions/oswulf.webp",
    "hitRate": 43.37,
    "sport": "soccer"
  },
  {
    "id": "pred-265",
    "predictorId": "tarzan",
    "predictorName": "Tarzan",
    "predictorAvatar": "/images/predictions/tarzan.webp",
    "hitRate": 43.37,
    "sport": "soccer"
  },
  {
    "id": "pred-266",
    "predictorId": "ominotago",
    "predictorName": "Ominotago",
    "predictorAvatar": "/images/predictions/ominotago.webp",
    "hitRate": 43.36,
    "sport": "soccer"
  },
  {
    "id": "pred-267",
    "predictorId": "dinsmore",
    "predictorName": "Dinsmore",
    "predictorAvatar": "/images/predictions/dinsmore.webp",
    "hitRate": 43.35,
    "sport": "soccer"
  },
  {
    "id": "pred-268",
    "predictorId": "tu",
    "predictorName": "Tu",
    "predictorAvatar": "/images/predictions/tu.webp",
    "hitRate": 43.33,
    "sport": "soccer"
  },
  {
    "id": "pred-269",
    "predictorId": "ruba",
    "predictorName": "Ruba",
    "predictorAvatar": "/images/predictions/ruba.webp",
    "hitRate": 43.32,
    "winStreak": "3x wins",
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-270",
    "predictorId": "jawed",
    "predictorName": "Jawed",
    "predictorAvatar": "/images/predictions/jawed.webp",
    "hitRate": 43.32,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-271",
    "predictorId": "katsunori",
    "predictorName": "Katsunori",
    "predictorAvatar": "/images/predictions/katsunori.webp",
    "hitRate": 43.32,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-272",
    "predictorId": "maurus",
    "predictorName": "Maurus",
    "predictorAvatar": "/images/predictions/maurus.webp",
    "hitRate": 43.31,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-273",
    "predictorId": "menucha",
    "predictorName": "Menucha",
    "predictorAvatar": "/images/predictions/menucha.webp",
    "hitRate": 43.3,
    "sport": "soccer"
  },
  {
    "id": "pred-274",
    "predictorId": "amram",
    "predictorName": "Amram",
    "predictorAvatar": "/images/predictions/amram.webp",
    "hitRate": 43.3,
    "sport": "soccer"
  },
  {
    "id": "pred-275",
    "predictorId": "asif",
    "predictorName": "Asif",
    "predictorAvatar": "/images/predictions/asif.webp",
    "hitRate": 43.3,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-276",
    "predictorId": "sylvain",
    "predictorName": "Sylvain",
    "predictorAvatar": "/images/predictions/sylvain.webp",
    "hitRate": 43.3,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-277",
    "predictorId": "norm",
    "predictorName": "Norm",
    "predictorAvatar": "/images/predictions/norm.webp",
    "hitRate": 43.29,
    "sport": "soccer"
  },
  {
    "id": "pred-278",
    "predictorId": "aart",
    "predictorName": "Aart",
    "predictorAvatar": "/images/predictions/aart.webp",
    "hitRate": 43.29,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-279",
    "predictorId": "bradyn",
    "predictorName": "Bradyn",
    "predictorAvatar": "/images/predictions/bradyn.webp",
    "hitRate": 43.26,
    "sport": "soccer"
  },
  {
    "id": "pred-280",
    "predictorId": "tilden",
    "predictorName": "Tilden",
    "predictorAvatar": "/images/predictions/tilden.webp",
    "hitRate": 43.26,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-281",
    "predictorId": "dolph",
    "predictorName": "Dolph",
    "predictorAvatar": "/images/predictions/dolph.webp",
    "hitRate": 43.25,
    "sport": "soccer"
  },
  {
    "id": "pred-282",
    "predictorId": "gertraud",
    "predictorName": "Gertraud",
    "predictorAvatar": "/images/predictions/gertraud.webp",
    "hitRate": 43.25,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-283",
    "predictorId": "toure",
    "predictorName": "Toure",
    "predictorAvatar": "/images/predictions/toure.webp",
    "hitRate": 43.23,
    "sport": "soccer"
  },
  {
    "id": "pred-284",
    "predictorId": "jana",
    "predictorName": "Jana",
    "predictorAvatar": "/images/predictions/jana.webp",
    "hitRate": 43.23,
    "sport": "soccer"
  },
  {
    "id": "pred-285",
    "predictorId": "shlomo",
    "predictorName": "Shlomo",
    "predictorAvatar": "/images/predictions/shlomo.webp",
    "hitRate": 43.22,
    "sport": "soccer"
  },
  {
    "id": "pred-286",
    "predictorId": "safi",
    "predictorName": "Safi",
    "predictorAvatar": "/images/predictions/safi.webp",
    "hitRate": 43.22,
    "sport": "soccer"
  },
  {
    "id": "pred-287",
    "predictorId": "itamar",
    "predictorName": "Itamar",
    "predictorAvatar": "/images/predictions/itamar.webp",
    "hitRate": 43.21,
    "sport": "soccer"
  },
  {
    "id": "pred-288",
    "predictorId": "culley",
    "predictorName": "Culley",
    "predictorAvatar": "/images/predictions/culley.webp",
    "hitRate": 43.2,
    "sport": "soccer"
  },
  {
    "id": "pred-289",
    "predictorId": "berold",
    "predictorName": "Berold",
    "predictorAvatar": "/images/predictions/berold.webp",
    "hitRate": 43.2,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-290",
    "predictorId": "arvilas",
    "predictorName": "Arvilas",
    "predictorAvatar": "/images/predictions/arvilas.webp",
    "hitRate": 43.2,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-291",
    "predictorId": "bast",
    "predictorName": "Bast",
    "predictorAvatar": "/images/predictions/bast.webp",
    "hitRate": 43.18,
    "sport": "soccer"
  },
  {
    "id": "pred-292",
    "predictorId": "essien",
    "predictorName": "Essien",
    "predictorAvatar": "/images/predictions/essien.webp",
    "hitRate": 43.18,
    "sport": "soccer"
  },
  {
    "id": "pred-293",
    "predictorId": "earnest",
    "predictorName": "Earnest",
    "predictorAvatar": "/images/predictions/earnest.webp",
    "hitRate": 43.17,
    "sport": "soccer"
  },
  {
    "id": "pred-294",
    "predictorId": "fernando",
    "predictorName": "Fernando",
    "predictorAvatar": "/images/predictions/fernando.webp",
    "hitRate": 43.17,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-295",
    "predictorId": "girolamo",
    "predictorName": "Girolamo",
    "predictorAvatar": "/images/predictions/girolamo.webp",
    "hitRate": 43.15,
    "sport": "soccer"
  },
  {
    "id": "pred-296",
    "predictorId": "dajuan",
    "predictorName": "Dajuan",
    "predictorAvatar": "/images/predictions/dajuan.webp",
    "hitRate": 43.15,
    "sport": "soccer"
  },
  {
    "id": "pred-297",
    "predictorId": "kita",
    "predictorName": "Kita",
    "predictorAvatar": "/images/predictions/kita.webp",
    "hitRate": 43.15,
    "sport": "soccer"
  },
  {
    "id": "pred-298",
    "predictorId": "alexei",
    "predictorName": "Alexei",
    "predictorAvatar": "/images/predictions/alexei.webp",
    "hitRate": 43.14,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-299",
    "predictorId": "alain",
    "predictorName": "Alain",
    "predictorAvatar": "/images/predictions/alain.webp",
    "hitRate": 43.14,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-300",
    "predictorId": "varen",
    "predictorName": "Varen",
    "predictorAvatar": "/images/predictions/varen.webp",
    "hitRate": 43.13,
    "winStreak": "3x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-301",
    "predictorId": "dalmazio",
    "predictorName": "Dalmazio",
    "predictorAvatar": "/images/predictions/dalmazio.webp",
    "hitRate": 43.13,
    "sport": "soccer"
  },
  {
    "id": "pred-302",
    "predictorId": "hartmut",
    "predictorName": "Hartmut",
    "predictorAvatar": "/images/predictions/hartmut.webp",
    "hitRate": 43.12,
    "sport": "soccer"
  },
  {
    "id": "pred-303",
    "predictorId": "lieven",
    "predictorName": "Lieven",
    "predictorAvatar": "/images/predictions/lieven.webp",
    "hitRate": 43.1,
    "sport": "soccer"
  },
  {
    "id": "pred-304",
    "predictorId": "werner",
    "predictorName": "Werner",
    "predictorAvatar": "/images/predictions/werner.webp",
    "hitRate": 43.1,
    "sport": "soccer"
  },
  {
    "id": "pred-305",
    "predictorId": "riku",
    "predictorName": "Riku",
    "predictorAvatar": "/images/predictions/riku.webp",
    "hitRate": 43.1,
    "sport": "soccer"
  },
  {
    "id": "pred-306",
    "predictorId": "uba",
    "predictorName": "Uba",
    "predictorAvatar": "/images/predictions/uba.webp",
    "hitRate": 43.1,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-307",
    "predictorId": "clarence",
    "predictorName": "Clarence",
    "predictorAvatar": "/images/predictions/clarence.webp",
    "hitRate": 43.1,
    "sport": "soccer"
  },
  {
    "id": "pred-308",
    "predictorId": "tayib",
    "predictorName": "Tayib",
    "predictorAvatar": "/images/predictions/tayib.webp",
    "hitRate": 43.1,
    "sport": "soccer"
  },
  {
    "id": "pred-309",
    "predictorId": "ondre",
    "predictorName": "Ondre",
    "predictorAvatar": "/images/predictions/ondre.webp",
    "hitRate": 43.08,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-310",
    "predictorId": "timber",
    "predictorName": "Timber",
    "predictorAvatar": "/images/predictions/timber.webp",
    "hitRate": 43.08,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-311",
    "predictorId": "dhruv",
    "predictorName": "Dhruv",
    "predictorAvatar": "/images/predictions/dhruv.webp",
    "hitRate": 43.07,
    "sport": "soccer"
  },
  {
    "id": "pred-312",
    "predictorId": "osbourne",
    "predictorName": "Osbourne",
    "predictorAvatar": "/images/predictions/osbourne.webp",
    "hitRate": 43.07,
    "sport": "soccer"
  },
  {
    "id": "pred-313",
    "predictorId": "eros",
    "predictorName": "Eros",
    "predictorAvatar": "/images/predictions/eros.webp",
    "hitRate": 43.06,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-314",
    "predictorId": "boleslaw",
    "predictorName": "Boleslaw",
    "predictorAvatar": "/images/predictions/boleslaw.webp",
    "hitRate": 43.06,
    "sport": "soccer"
  },
  {
    "id": "pred-315",
    "predictorId": "velislav",
    "predictorName": "Velislav",
    "predictorAvatar": "/images/predictions/velislav.webp",
    "hitRate": 43.05,
    "sport": "soccer"
  },
  {
    "id": "pred-316",
    "predictorId": "isadore",
    "predictorName": "Isadore",
    "predictorAvatar": "/images/predictions/isadore.webp",
    "hitRate": 43.05,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-317",
    "predictorId": "ezri",
    "predictorName": "Ezri",
    "predictorAvatar": "/images/predictions/ezri.webp",
    "hitRate": 43.04,
    "sport": "soccer"
  },
  {
    "id": "pred-318",
    "predictorId": "phomello",
    "predictorName": "Phomello",
    "predictorAvatar": "/images/predictions/phomello.webp",
    "hitRate": 43.03,
    "sport": "soccer"
  },
  {
    "id": "pred-319",
    "predictorId": "fredrik",
    "predictorName": "Fredrik",
    "predictorAvatar": "/images/predictions/fredrik.webp",
    "hitRate": 43.02,
    "sport": "soccer"
  },
  {
    "id": "pred-320",
    "predictorId": "twon",
    "predictorName": "Twon",
    "predictorAvatar": "/images/predictions/twon.webp",
    "hitRate": 43.02,
    "sport": "soccer"
  },
  {
    "id": "pred-321",
    "predictorId": "aristedes",
    "predictorName": "Aristedes",
    "predictorAvatar": "/images/predictions/aristedes.webp",
    "hitRate": 43.02,
    "sport": "soccer"
  },
  {
    "id": "pred-322",
    "predictorId": "anisha",
    "predictorName": "Anisha",
    "predictorAvatar": "/images/predictions/anisha.webp",
    "hitRate": 43.02,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-323",
    "predictorId": "tatsuhiro",
    "predictorName": "Tatsuhiro",
    "predictorAvatar": "/images/predictions/tatsuhiro.webp",
    "hitRate": 43.02,
    "sport": "soccer"
  },
  {
    "id": "pred-324",
    "predictorId": "cortez",
    "predictorName": "Cortez",
    "predictorAvatar": "/images/predictions/cortez.webp",
    "hitRate": 43.02,
    "sport": "soccer"
  },
  {
    "id": "pred-325",
    "predictorId": "alard",
    "predictorName": "Alard",
    "predictorAvatar": "/images/predictions/alard.webp",
    "hitRate": 43.02,
    "sport": "soccer"
  },
  {
    "id": "pred-326",
    "predictorId": "aristides",
    "predictorName": "Aristides",
    "predictorAvatar": "/images/predictions/aristides.webp",
    "hitRate": 43.01,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-327",
    "predictorId": "bas",
    "predictorName": "Bas",
    "predictorAvatar": "/images/predictions/bas.webp",
    "hitRate": 43.01,
    "sport": "soccer"
  },
  {
    "id": "pred-328",
    "predictorId": "warwick",
    "predictorName": "Warwick",
    "predictorAvatar": "/images/predictions/warwick.webp",
    "hitRate": 43.01,
    "sport": "soccer"
  },
  {
    "id": "pred-329",
    "predictorId": "claudio",
    "predictorName": "Claudio",
    "predictorAvatar": "/images/predictions/claudio.webp",
    "hitRate": 42.99,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-330",
    "predictorId": "basir",
    "predictorName": "Basir",
    "predictorAvatar": "/images/predictions/basir.webp",
    "hitRate": 42.98,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-331",
    "predictorId": "darryl",
    "predictorName": "Darryl",
    "predictorAvatar": "/images/predictions/darryl.webp",
    "hitRate": 42.98,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-332",
    "predictorId": "abimael",
    "predictorName": "Abimael",
    "predictorAvatar": "/images/predictions/abimael.webp",
    "hitRate": 42.97,
    "sport": "soccer"
  },
  {
    "id": "pred-333",
    "predictorId": "sionn",
    "predictorName": "Sionn",
    "predictorAvatar": "/images/predictions/sionn.webp",
    "hitRate": 42.97,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-334",
    "predictorId": "aeneas",
    "predictorName": "Aeneas",
    "predictorAvatar": "/images/predictions/aeneas.webp",
    "hitRate": 42.97,
    "sport": "soccer"
  },
  {
    "id": "pred-335",
    "predictorId": "fazal",
    "predictorName": "Fazal",
    "predictorAvatar": "/images/predictions/fazal.webp",
    "hitRate": 42.96,
    "sport": "soccer"
  },
  {
    "id": "pred-336",
    "predictorId": "montego",
    "predictorName": "Montego",
    "predictorAvatar": "/images/predictions/montego.webp",
    "hitRate": 42.95,
    "sport": "soccer"
  },
  {
    "id": "pred-337",
    "predictorId": "tarmon",
    "predictorName": "Tarmon",
    "predictorAvatar": "/images/predictions/tarmon.webp",
    "hitRate": 42.95,
    "sport": "soccer"
  },
  {
    "id": "pred-338",
    "predictorId": "jawed",
    "predictorName": "Jawed",
    "predictorAvatar": "/images/predictions/jawed.webp",
    "hitRate": 42.94,
    "sport": "soccer"
  },
  {
    "id": "pred-339",
    "predictorId": "oleg",
    "predictorName": "Oleg",
    "predictorAvatar": "/images/predictions/oleg.webp",
    "hitRate": 42.94,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-340",
    "predictorId": "mayer",
    "predictorName": "Mayer",
    "predictorAvatar": "/images/predictions/mayer.webp",
    "hitRate": 42.94,
    "sport": "soccer"
  },
  {
    "id": "pred-341",
    "predictorId": "thelonious",
    "predictorName": "Thelonious",
    "predictorAvatar": "/images/predictions/thelonious.webp",
    "hitRate": 42.92,
    "sport": "soccer"
  },
  {
    "id": "pred-342",
    "predictorId": "burbank",
    "predictorName": "Burbank",
    "predictorAvatar": "/images/predictions/burbank.webp",
    "hitRate": 42.92,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-343",
    "predictorId": "eron",
    "predictorName": "Eron",
    "predictorAvatar": "/images/predictions/eron.webp",
    "hitRate": 42.91,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-344",
    "predictorId": "brevin",
    "predictorName": "Brevin",
    "predictorAvatar": "/images/predictions/brevin.webp",
    "hitRate": 42.89,
    "sport": "soccer"
  },
  {
    "id": "pred-345",
    "predictorId": "lopez",
    "predictorName": "Lopez",
    "predictorAvatar": "/images/predictions/lopez.webp",
    "hitRate": 42.88,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-346",
    "predictorId": "parees",
    "predictorName": "Parees",
    "predictorAvatar": "/images/predictions/parees.webp",
    "hitRate": 42.88,
    "winStreak": "3x wins",
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-347",
    "predictorId": "rich",
    "predictorName": "Rich",
    "predictorAvatar": "/images/predictions/rich.webp",
    "hitRate": 42.88,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-348",
    "predictorId": "adeoba",
    "predictorName": "Adeoba",
    "predictorAvatar": "/images/predictions/adeoba.webp",
    "hitRate": 42.87,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-349",
    "predictorId": "link",
    "predictorName": "Link",
    "predictorAvatar": "/images/predictions/link.webp",
    "hitRate": 42.86,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-350",
    "predictorId": "carolus",
    "predictorName": "Carolus",
    "predictorAvatar": "/images/predictions/carolus.webp",
    "hitRate": 42.86,
    "sport": "soccer"
  },
  {
    "id": "pred-351",
    "predictorId": "ciceron",
    "predictorName": "Ciceron",
    "predictorAvatar": "/images/predictions/ciceron.webp",
    "hitRate": 42.85,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-352",
    "predictorId": "katsuo",
    "predictorName": "Katsuo",
    "predictorAvatar": "/images/predictions/katsuo.webp",
    "hitRate": 42.84,
    "sport": "soccer"
  },
  {
    "id": "pred-353",
    "predictorId": "anika",
    "predictorName": "Anika",
    "predictorAvatar": "/images/predictions/anika.webp",
    "hitRate": 42.84,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-354",
    "predictorId": "lavada",
    "predictorName": "Lavada",
    "predictorAvatar": "/images/predictions/lavada.webp",
    "hitRate": 42.84,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-355",
    "predictorId": "eugene",
    "predictorName": "Eugene",
    "predictorAvatar": "/images/predictions/eugene.webp",
    "hitRate": 42.83,
    "sport": "soccer"
  },
  {
    "id": "pred-356",
    "predictorId": "yorick",
    "predictorName": "Yorick",
    "predictorAvatar": "/images/predictions/yorick.webp",
    "hitRate": 42.83,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-357",
    "predictorId": "ramiro",
    "predictorName": "Ramiro",
    "predictorAvatar": "/images/predictions/ramiro.webp",
    "hitRate": 42.83,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-358",
    "predictorId": "ziggy",
    "predictorName": "Ziggy",
    "predictorAvatar": "/images/predictions/ziggy.webp",
    "hitRate": 42.83,
    "sport": "soccer"
  },
  {
    "id": "pred-359",
    "predictorId": "yakov",
    "predictorName": "Yakov",
    "predictorAvatar": "/images/predictions/yakov.webp",
    "hitRate": 42.82,
    "sport": "soccer"
  },
  {
    "id": "pred-360",
    "predictorId": "jecori",
    "predictorName": "Jecori",
    "predictorAvatar": "/images/predictions/jecori.webp",
    "hitRate": 42.82,
    "sport": "soccer"
  },
  {
    "id": "pred-361",
    "predictorId": "anakin",
    "predictorName": "Anakin",
    "predictorAvatar": "/images/predictions/anakin.webp",
    "hitRate": 42.81,
    "sport": "soccer"
  },
  {
    "id": "pred-362",
    "predictorId": "chlothar",
    "predictorName": "Chlothar",
    "predictorAvatar": "/images/predictions/chlothar.webp",
    "hitRate": 42.8,
    "sport": "soccer"
  },
  {
    "id": "pred-363",
    "predictorId": "cadenza",
    "predictorName": "Cadenza",
    "predictorAvatar": "/images/predictions/cadenza.webp",
    "hitRate": 42.8,
    "sport": "soccer"
  },
  {
    "id": "pred-364",
    "predictorId": "manton",
    "predictorName": "Manton",
    "predictorAvatar": "/images/predictions/manton.webp",
    "hitRate": 42.79,
    "sport": "soccer"
  },
  {
    "id": "pred-365",
    "predictorId": "twm",
    "predictorName": "Twm",
    "predictorAvatar": "/images/predictions/twm.webp",
    "hitRate": 42.78,
    "sport": "soccer"
  },
  {
    "id": "pred-366",
    "predictorId": "aristophanes",
    "predictorName": "Aristophanes",
    "predictorAvatar": "/images/predictions/aristophanes.webp",
    "hitRate": 42.78,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-367",
    "predictorId": "ozer",
    "predictorName": "Ozer",
    "predictorAvatar": "/images/predictions/ozer.webp",
    "hitRate": 42.78,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-368",
    "predictorId": "ivailo",
    "predictorName": "Ivailo",
    "predictorAvatar": "/images/predictions/ivailo.webp",
    "hitRate": 42.75,
    "sport": "soccer"
  },
  {
    "id": "pred-369",
    "predictorId": "perry",
    "predictorName": "Perry",
    "predictorAvatar": "/images/predictions/perry.webp",
    "hitRate": 42.75,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-370",
    "predictorId": "dard",
    "predictorName": "Dard",
    "predictorAvatar": "/images/predictions/dard.webp",
    "hitRate": 42.74,
    "sport": "soccer"
  },
  {
    "id": "pred-371",
    "predictorId": "ghassan",
    "predictorName": "Ghassan",
    "predictorAvatar": "/images/predictions/ghassan.webp",
    "hitRate": 42.73,
    "sport": "soccer"
  },
  {
    "id": "pred-372",
    "predictorId": "binyamin",
    "predictorName": "Binyamin",
    "predictorAvatar": "/images/predictions/binyamin.webp",
    "hitRate": 42.73,
    "sport": "soccer"
  },
  {
    "id": "pred-373",
    "predictorId": "sidra",
    "predictorName": "Sidra",
    "predictorAvatar": "/images/predictions/sidra.webp",
    "hitRate": 42.72,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-374",
    "predictorId": "jayeenita",
    "predictorName": "Jayeenita",
    "predictorAvatar": "/images/predictions/jayeenita.webp",
    "hitRate": 42.72,
    "sport": "soccer"
  },
  {
    "id": "pred-375",
    "predictorId": "khalon",
    "predictorName": "Khalon",
    "predictorAvatar": "/images/predictions/khalon.webp",
    "hitRate": 42.7,
    "sport": "soccer"
  },
  {
    "id": "pred-376",
    "predictorId": "varun",
    "predictorName": "Varun",
    "predictorAvatar": "/images/predictions/varun.webp",
    "hitRate": 42.7,
    "sport": "soccer"
  },
  {
    "id": "pred-377",
    "predictorId": "tavon",
    "predictorName": "Tavon",
    "predictorAvatar": "/images/predictions/tavon.webp",
    "hitRate": 42.7,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-378",
    "predictorId": "taggart",
    "predictorName": "Taggart",
    "predictorAvatar": "/images/predictions/taggart.webp",
    "hitRate": 42.7,
    "sport": "soccer"
  },
  {
    "id": "pred-379",
    "predictorId": "elod",
    "predictorName": "Elod",
    "predictorAvatar": "/images/predictions/elod.webp",
    "hitRate": 42.69,
    "sport": "soccer"
  },
  {
    "id": "pred-380",
    "predictorId": "ausrys",
    "predictorName": "Ausrys",
    "predictorAvatar": "/images/predictions/ausrys.webp",
    "hitRate": 42.69,
    "sport": "soccer"
  },
  {
    "id": "pred-381",
    "predictorId": "jon",
    "predictorName": "Jon",
    "predictorAvatar": "/images/predictions/jon.webp",
    "hitRate": 42.69,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-382",
    "predictorId": "jagannatha",
    "predictorName": "Jagannatha",
    "predictorAvatar": "/images/predictions/jagannatha.webp",
    "hitRate": 42.69,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-383",
    "predictorId": "silvino",
    "predictorName": "Silvino",
    "predictorAvatar": "/images/predictions/silvino.webp",
    "hitRate": 42.68,
    "sport": "soccer"
  },
  {
    "id": "pred-384",
    "predictorId": "valora",
    "predictorName": "Valora",
    "predictorAvatar": "/images/predictions/valora.webp",
    "hitRate": 42.68,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-385",
    "predictorId": "leyati",
    "predictorName": "Leyati",
    "predictorAvatar": "/images/predictions/leyati.webp",
    "hitRate": 42.67,
    "sport": "soccer"
  },
  {
    "id": "pred-386",
    "predictorId": "daire",
    "predictorName": "Daire",
    "predictorAvatar": "/images/predictions/daire.webp",
    "hitRate": 42.66,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-387",
    "predictorId": "keefe",
    "predictorName": "Keefe",
    "predictorAvatar": "/images/predictions/keefe.webp",
    "hitRate": 42.66,
    "sport": "soccer"
  },
  {
    "id": "pred-388",
    "predictorId": "duka",
    "predictorName": "Duka",
    "predictorAvatar": "/images/predictions/duka.webp",
    "hitRate": 42.65,
    "sport": "soccer"
  },
  {
    "id": "pred-389",
    "predictorId": "barend",
    "predictorName": "Barend",
    "predictorAvatar": "/images/predictions/barend.webp",
    "hitRate": 42.65,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-390",
    "predictorId": "hampton",
    "predictorName": "Hampton",
    "predictorAvatar": "/images/predictions/hampton.webp",
    "hitRate": 42.64,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-391",
    "predictorId": "phomello",
    "predictorName": "Phomello",
    "predictorAvatar": "/images/predictions/phomello.webp",
    "hitRate": 42.64,
    "sport": "soccer"
  },
  {
    "id": "pred-392",
    "predictorId": "firuz",
    "predictorName": "Firuz",
    "predictorAvatar": "/images/predictions/firuz.webp",
    "hitRate": 42.64,
    "sport": "soccer"
  },
  {
    "id": "pred-393",
    "predictorId": "bian",
    "predictorName": "Bian",
    "predictorAvatar": "/images/predictions/bian.webp",
    "hitRate": 42.62,
    "sport": "soccer"
  },
  {
    "id": "pred-394",
    "predictorId": "sewati",
    "predictorName": "Sewati",
    "predictorAvatar": "/images/predictions/sewati.webp",
    "hitRate": 42.62,
    "sport": "soccer"
  },
  {
    "id": "pred-395",
    "predictorId": "tivka",
    "predictorName": "Tivka",
    "predictorAvatar": "/images/predictions/tivka.webp",
    "hitRate": 42.61,
    "sport": "soccer"
  },
  {
    "id": "pred-396",
    "predictorId": "linus",
    "predictorName": "Linus",
    "predictorAvatar": "/images/predictions/linus.webp",
    "hitRate": 42.59,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-397",
    "predictorId": "copper",
    "predictorName": "Copper",
    "predictorAvatar": "/images/predictions/copper.webp",
    "hitRate": 42.58,
    "sport": "soccer"
  },
  {
    "id": "pred-398",
    "predictorId": "dezi",
    "predictorName": "Dezi",
    "predictorAvatar": "/images/predictions/dezi.webp",
    "hitRate": 42.58,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-399",
    "predictorId": "midas",
    "predictorName": "Midas",
    "predictorAvatar": "/images/predictions/midas.webp",
    "hitRate": 42.56,
    "sport": "soccer"
  },
  {
    "id": "pred-400",
    "predictorId": "fynn",
    "predictorName": "Fynn",
    "predictorAvatar": "/images/predictions/fynn.webp",
    "hitRate": 42.55,
    "sport": "soccer"
  },
  {
    "id": "pred-401",
    "predictorId": "arsenio",
    "predictorName": "Arsenio",
    "predictorAvatar": "/images/predictions/arsenio.webp",
    "hitRate": 42.54,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-402",
    "predictorId": "baxter",
    "predictorName": "Baxter",
    "predictorAvatar": "/images/predictions/baxter.webp",
    "hitRate": 42.51,
    "sport": "soccer"
  },
  {
    "id": "pred-403",
    "predictorId": "lamont",
    "predictorName": "Lamont",
    "predictorAvatar": "/images/predictions/lamont.webp",
    "hitRate": 42.51,
    "sport": "soccer"
  },
  {
    "id": "pred-404",
    "predictorId": "judson",
    "predictorName": "Judson",
    "predictorAvatar": "/images/predictions/judson.webp",
    "hitRate": 42.49,
    "sport": "soccer"
  },
  {
    "id": "pred-405",
    "predictorId": "mfumu",
    "predictorName": "Mfumu",
    "predictorAvatar": "/images/predictions/mfumu.webp",
    "hitRate": 42.49,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-406",
    "predictorId": "quill",
    "predictorName": "Quill",
    "predictorAvatar": "/images/predictions/quill.webp",
    "hitRate": 42.48,
    "sport": "soccer"
  },
  {
    "id": "pred-407",
    "predictorId": "razon",
    "predictorName": "Razon",
    "predictorAvatar": "/images/predictions/razon.webp",
    "hitRate": 42.48,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-408",
    "predictorId": "ahearne",
    "predictorName": "Ahearne",
    "predictorAvatar": "/images/predictions/ahearne.webp",
    "hitRate": 42.47,
    "winStreak": "3x wins",
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-409",
    "predictorId": "cesar",
    "predictorName": "Cesar",
    "predictorAvatar": "/images/predictions/cesar.webp",
    "hitRate": 42.47,
    "sport": "soccer"
  },
  {
    "id": "pred-410",
    "predictorId": "marv",
    "predictorName": "Marv",
    "predictorAvatar": "/images/predictions/marv.webp",
    "hitRate": 42.46,
    "sport": "soccer"
  },
  {
    "id": "pred-411",
    "predictorId": "stanislaw",
    "predictorName": "Stanislaw",
    "predictorAvatar": "/images/predictions/stanislaw.webp",
    "hitRate": 42.45,
    "sport": "soccer"
  },
  {
    "id": "pred-412",
    "predictorId": "aithan",
    "predictorName": "Aithan",
    "predictorAvatar": "/images/predictions/aithan.webp",
    "hitRate": 42.44,
    "sport": "soccer"
  },
  {
    "id": "pred-413",
    "predictorId": "nivo",
    "predictorName": "Nivo",
    "predictorAvatar": "/images/predictions/nivo.webp",
    "hitRate": 42.42,
    "sport": "soccer"
  },
  {
    "id": "pred-414",
    "predictorId": "khoi",
    "predictorName": "Khoi",
    "predictorAvatar": "/images/predictions/khoi.webp",
    "hitRate": 42.42,
    "sport": "soccer"
  },
  {
    "id": "pred-415",
    "predictorId": "neron",
    "predictorName": "Neron",
    "predictorAvatar": "/images/predictions/neron.webp",
    "hitRate": 42.42,
    "sport": "soccer"
  },
  {
    "id": "pred-416",
    "predictorId": "tacito",
    "predictorName": "Tacito",
    "predictorAvatar": "/images/predictions/tacito.webp",
    "hitRate": 42.42,
    "sport": "soccer"
  },
  {
    "id": "pred-417",
    "predictorId": "kaz",
    "predictorName": "Kaz",
    "predictorAvatar": "/images/predictions/kaz.webp",
    "hitRate": 42.41,
    "winStreak": "3x wins",
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-418",
    "predictorId": "licio",
    "predictorName": "Licio",
    "predictorAvatar": "/images/predictions/licio.webp",
    "hitRate": 42.4,
    "sport": "soccer"
  },
  {
    "id": "pred-419",
    "predictorId": "wilfred",
    "predictorName": "Wilfred",
    "predictorAvatar": "/images/predictions/wilfred.webp",
    "hitRate": 42.4,
    "sport": "soccer"
  },
  {
    "id": "pred-420",
    "predictorId": "jacory",
    "predictorName": "Jacory",
    "predictorAvatar": "/images/predictions/jacory.webp",
    "hitRate": 42.39,
    "winStreak": "2x wins",
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-421",
    "predictorId": "georges",
    "predictorName": "Georges",
    "predictorAvatar": "/images/predictions/georges.webp",
    "hitRate": 42.37,
    "sport": "soccer"
  },
  {
    "id": "pred-422",
    "predictorId": "timothee",
    "predictorName": "Timothee",
    "predictorAvatar": "/images/predictions/timothee.webp",
    "hitRate": 42.37,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-423",
    "predictorId": "hamal",
    "predictorName": "Hamal",
    "predictorAvatar": "/images/predictions/hamal.webp",
    "hitRate": 42.35,
    "sport": "soccer"
  },
  {
    "id": "pred-424",
    "predictorId": "yisroel",
    "predictorName": "Yisroel",
    "predictorAvatar": "/images/predictions/yisroel.webp",
    "hitRate": 42.35,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-425",
    "predictorId": "quiqui",
    "predictorName": "Quiqui",
    "predictorAvatar": "/images/predictions/quiqui.webp",
    "hitRate": 42.34,
    "winStreak": "3x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-426",
    "predictorId": "gerasimos",
    "predictorName": "Gerasimos",
    "predictorAvatar": "/images/predictions/gerasimos.webp",
    "hitRate": 42.34,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-427",
    "predictorId": "vatsa",
    "predictorName": "Vatsa",
    "predictorAvatar": "/images/predictions/vatsa.webp",
    "hitRate": 42.31,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-428",
    "predictorId": "jericho",
    "predictorName": "Jericho",
    "predictorAvatar": "/images/predictions/jericho.webp",
    "hitRate": 42.31,
    "sport": "soccer"
  },
  {
    "id": "pred-429",
    "predictorId": "adriaan",
    "predictorName": "Adriaan",
    "predictorAvatar": "/images/predictions/adriaan.webp",
    "hitRate": 42.31,
    "sport": "soccer"
  },
  {
    "id": "pred-430",
    "predictorId": "aba",
    "predictorName": "Aba",
    "predictorAvatar": "/images/predictions/aba.webp",
    "hitRate": 42.31,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-431",
    "predictorId": "hiroshi",
    "predictorName": "Hiroshi",
    "predictorAvatar": "/images/predictions/hiroshi.webp",
    "hitRate": 42.3,
    "sport": "soccer"
  },
  {
    "id": "pred-432",
    "predictorId": "isaiah",
    "predictorName": "Isaiah",
    "predictorAvatar": "/images/predictions/isaiah.webp",
    "hitRate": 42.29,
    "sport": "soccer"
  },
  {
    "id": "pred-433",
    "predictorId": "tyr",
    "predictorName": "Tyr",
    "predictorAvatar": "/images/predictions/tyr.webp",
    "hitRate": 42.29,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-434",
    "predictorId": "ulema",
    "predictorName": "Ulema",
    "predictorAvatar": "/images/predictions/ulema.webp",
    "hitRate": 42.28,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-435",
    "predictorId": "bohannon",
    "predictorName": "Bohannon",
    "predictorAvatar": "/images/predictions/bohannon.webp",
    "hitRate": 42.27,
    "sport": "soccer"
  },
  {
    "id": "pred-436",
    "predictorId": "dementy",
    "predictorName": "Dementy",
    "predictorAvatar": "/images/predictions/dementy.webp",
    "hitRate": 42.25,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-437",
    "predictorId": "roanix",
    "predictorName": "Roanix",
    "predictorAvatar": "/images/predictions/roanix.webp",
    "hitRate": 42.24,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-438",
    "predictorId": "jeevan",
    "predictorName": "Jeevan",
    "predictorAvatar": "/images/predictions/jeevan.webp",
    "hitRate": 42.24,
    "winStreak": "2x wins",
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-439",
    "predictorId": "turin",
    "predictorName": "Turin",
    "predictorAvatar": "/images/predictions/turin.webp",
    "hitRate": 42.23,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-440",
    "predictorId": "branagan",
    "predictorName": "Branagan",
    "predictorAvatar": "/images/predictions/branagan.webp",
    "hitRate": 42.23,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-441",
    "predictorId": "venturo",
    "predictorName": "Venturo",
    "predictorAvatar": "/images/predictions/venturo.webp",
    "hitRate": 42.23,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-442",
    "predictorId": "jaffar",
    "predictorName": "Jaffar",
    "predictorAvatar": "/images/predictions/jaffar.webp",
    "hitRate": 42.22,
    "sport": "soccer"
  },
  {
    "id": "pred-443",
    "predictorId": "helel",
    "predictorName": "Helel",
    "predictorAvatar": "/images/predictions/helel.webp",
    "hitRate": 42.22,
    "sport": "soccer"
  },
  {
    "id": "pred-444",
    "predictorId": "lapo",
    "predictorName": "Lapo",
    "predictorAvatar": "/images/predictions/lapo.webp",
    "hitRate": 42.21,
    "currentPredictions": 3,
    "sport": "soccer"
  },
  {
    "id": "pred-445",
    "predictorId": "othmar",
    "predictorName": "Othmar",
    "predictorAvatar": "/images/predictions/othmar.webp",
    "hitRate": 42.21,
    "sport": "soccer"
  },
  {
    "id": "pred-446",
    "predictorId": "dionysius",
    "predictorName": "Dionysius",
    "predictorAvatar": "/images/predictions/dionysius.webp",
    "hitRate": 42.2,
    "sport": "soccer"
  },
  {
    "id": "pred-447",
    "predictorId": "yonatan",
    "predictorName": "Yonatan",
    "predictorAvatar": "/images/predictions/yonatan.webp",
    "hitRate": 42.19,
    "sport": "soccer"
  },
  {
    "id": "pred-448",
    "predictorId": "godwin",
    "predictorName": "Godwin",
    "predictorAvatar": "/images/predictions/godwin.webp",
    "hitRate": 42.15,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-449",
    "predictorId": "peeta",
    "predictorName": "Peeta",
    "predictorAvatar": "/images/predictions/peeta.webp",
    "hitRate": 42.14,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-450",
    "predictorId": "eligio",
    "predictorName": "Eligio",
    "predictorAvatar": "/images/predictions/eligio.webp",
    "hitRate": 42.14,
    "sport": "soccer"
  },
  {
    "id": "pred-451",
    "predictorId": "haro",
    "predictorName": "Haro",
    "predictorAvatar": "/images/predictions/haro.webp",
    "hitRate": 42.14,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-452",
    "predictorId": "seung",
    "predictorName": "Seung",
    "predictorAvatar": "/images/predictions/seung.webp",
    "hitRate": 42.11,
    "sport": "soccer"
  },
  {
    "id": "pred-453",
    "predictorId": "tycho",
    "predictorName": "Tycho",
    "predictorAvatar": "/images/predictions/tycho.webp",
    "hitRate": 42.11,
    "sport": "soccer"
  },
  {
    "id": "pred-454",
    "predictorId": "shakil",
    "predictorName": "Shakil",
    "predictorAvatar": "/images/predictions/shakil.webp",
    "hitRate": 42.1,
    "sport": "soccer"
  },
  {
    "id": "pred-455",
    "predictorId": "jonathon",
    "predictorName": "Jonathon",
    "predictorAvatar": "/images/predictions/jonathon.webp",
    "hitRate": 42.1,
    "sport": "soccer"
  },
  {
    "id": "pred-456",
    "predictorId": "jarrett",
    "predictorName": "Jarrett",
    "predictorAvatar": "/images/predictions/jarrett.webp",
    "hitRate": 42.08,
    "sport": "soccer"
  },
  {
    "id": "pred-457",
    "predictorId": "niel",
    "predictorName": "Niel",
    "predictorAvatar": "/images/predictions/niel.webp",
    "hitRate": 42.08,
    "sport": "soccer"
  },
  {
    "id": "pred-458",
    "predictorId": "murad",
    "predictorName": "Murad",
    "predictorAvatar": "/images/predictions/murad.webp",
    "hitRate": 42.01,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-459",
    "predictorId": "koichi",
    "predictorName": "Koichi",
    "predictorAvatar": "/images/predictions/koichi.webp",
    "hitRate": 42,
    "sport": "soccer"
  },
  {
    "id": "pred-460",
    "predictorId": "jedaiah",
    "predictorName": "Jedaiah",
    "predictorAvatar": "/images/predictions/jedaiah.webp",
    "hitRate": 42,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-461",
    "predictorId": "roan",
    "predictorName": "Roan",
    "predictorAvatar": "/images/predictions/roan.webp",
    "hitRate": 42,
    "sport": "soccer"
  },
  {
    "id": "pred-462",
    "predictorId": "marvin",
    "predictorName": "Marvin",
    "predictorAvatar": "/images/predictions/marvin.webp",
    "hitRate": 41.99,
    "sport": "soccer"
  },
  {
    "id": "pred-463",
    "predictorId": "zoya",
    "predictorName": "Zoya",
    "predictorAvatar": "/images/predictions/zoya.webp",
    "hitRate": 41.97,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-464",
    "predictorId": "navarro",
    "predictorName": "Navarro",
    "predictorAvatar": "/images/predictions/navarro.webp",
    "hitRate": 41.96,
    "winStreak": "4x wins",
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-465",
    "predictorId": "foy",
    "predictorName": "Foy",
    "predictorAvatar": "/images/predictions/foy.webp",
    "hitRate": 41.96,
    "sport": "soccer"
  },
  {
    "id": "pred-466",
    "predictorId": "skule",
    "predictorName": "Skule",
    "predictorAvatar": "/images/predictions/skule.webp",
    "hitRate": 41.9,
    "sport": "soccer"
  },
  {
    "id": "pred-467",
    "predictorId": "cendrillon",
    "predictorName": "Cendrillon",
    "predictorAvatar": "/images/predictions/cendrillon.webp",
    "hitRate": 41.88,
    "sport": "soccer"
  },
  {
    "id": "pred-468",
    "predictorId": "anish",
    "predictorName": "Anish",
    "predictorAvatar": "/images/predictions/anish.webp",
    "hitRate": 41.87,
    "sport": "soccer"
  },
  {
    "id": "pred-469",
    "predictorId": "copper",
    "predictorName": "Copper",
    "predictorAvatar": "/images/predictions/copper.webp",
    "hitRate": 41.86,
    "sport": "soccer"
  },
  {
    "id": "pred-470",
    "predictorId": "koichi",
    "predictorName": "Koichi",
    "predictorAvatar": "/images/predictions/koichi.webp",
    "hitRate": 41.83,
    "sport": "soccer"
  },
  {
    "id": "pred-471",
    "predictorId": "deror",
    "predictorName": "Deror",
    "predictorAvatar": "/images/predictions/deror.webp",
    "hitRate": 41.81,
    "sport": "soccer"
  },
  {
    "id": "pred-472",
    "predictorId": "manoja",
    "predictorName": "Manoja",
    "predictorAvatar": "/images/predictions/manoja.webp",
    "hitRate": 41.79,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-473",
    "predictorId": "durango",
    "predictorName": "Durango",
    "predictorAvatar": "/images/predictions/durango.webp",
    "hitRate": 41.78,
    "sport": "soccer"
  },
  {
    "id": "pred-474",
    "predictorId": "siddhartha",
    "predictorName": "Siddhartha",
    "predictorAvatar": "/images/predictions/siddhartha.webp",
    "hitRate": 41.74,
    "sport": "soccer"
  },
  {
    "id": "pred-475",
    "predictorId": "yuji",
    "predictorName": "Yuji",
    "predictorAvatar": "/images/predictions/yuji.webp",
    "hitRate": 41.73,
    "sport": "soccer"
  },
  {
    "id": "pred-476",
    "predictorId": "aart",
    "predictorName": "Aart",
    "predictorAvatar": "/images/predictions/aart.webp",
    "hitRate": 41.71,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-477",
    "predictorId": "langer",
    "predictorName": "Langer",
    "predictorAvatar": "/images/predictions/langer.webp",
    "hitRate": 41.71,
    "sport": "soccer"
  },
  {
    "id": "pred-478",
    "predictorId": "dumas",
    "predictorName": "Dumas",
    "predictorAvatar": "/images/predictions/dumas.webp",
    "hitRate": 41.71,
    "sport": "soccer"
  },
  {
    "id": "pred-479",
    "predictorId": "kyson",
    "predictorName": "Kyson",
    "predictorAvatar": "/images/predictions/kyson.webp",
    "hitRate": 41.7,
    "sport": "soccer"
  },
  {
    "id": "pred-480",
    "predictorId": "amram",
    "predictorName": "Amram",
    "predictorAvatar": "/images/predictions/amram.webp",
    "hitRate": 41.67,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-481",
    "predictorId": "tyshawn",
    "predictorName": "Tyshawn",
    "predictorAvatar": "/images/predictions/tyshawn.webp",
    "hitRate": 41.67,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-482",
    "predictorId": "giovanny",
    "predictorName": "Giovanny",
    "predictorAvatar": "/images/predictions/giovanny.webp",
    "hitRate": 41.66,
    "sport": "soccer"
  },
  {
    "id": "pred-483",
    "predictorId": "tyrek",
    "predictorName": "Tyrek",
    "predictorAvatar": "/images/predictions/tyrek.webp",
    "hitRate": 41.66,
    "sport": "soccer"
  },
  {
    "id": "pred-484",
    "predictorId": "rodrigo",
    "predictorName": "Rodrigo",
    "predictorAvatar": "/images/predictions/rodrigo.webp",
    "hitRate": 41.65,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-485",
    "predictorId": "ulrik",
    "predictorName": "Ulrik",
    "predictorAvatar": "/images/predictions/ulrik.webp",
    "hitRate": 41.64,
    "sport": "soccer"
  },
  {
    "id": "pred-486",
    "predictorId": "ivrit",
    "predictorName": "Ivrit",
    "predictorAvatar": "/images/predictions/ivrit.webp",
    "hitRate": 41.61,
    "sport": "soccer"
  },
  {
    "id": "pred-487",
    "predictorId": "cyneburg",
    "predictorName": "Cyneburg",
    "predictorAvatar": "/images/predictions/cyneburg.webp",
    "hitRate": 41.6,
    "sport": "soccer"
  },
  {
    "id": "pred-488",
    "predictorId": "aric",
    "predictorName": "Aric",
    "predictorAvatar": "/images/predictions/aric.webp",
    "hitRate": 41.56,
    "sport": "soccer"
  },
  {
    "id": "pred-489",
    "predictorId": "adolf",
    "predictorName": "Adolf",
    "predictorAvatar": "/images/predictions/adolf.webp",
    "hitRate": 41.55,
    "sport": "soccer"
  },
  {
    "id": "pred-490",
    "predictorId": "bertram",
    "predictorName": "Bertram",
    "predictorAvatar": "/images/predictions/bertram.webp",
    "hitRate": 41.51,
    "sport": "soccer"
  },
  {
    "id": "pred-491",
    "predictorId": "aslan",
    "predictorName": "Aslan",
    "predictorAvatar": "/images/predictions/aslan.webp",
    "hitRate": 41.43,
    "sport": "soccer"
  },
  {
    "id": "pred-492",
    "predictorId": "bickford",
    "predictorName": "Bickford",
    "predictorAvatar": "/images/predictions/bickford.webp",
    "hitRate": 41.42,
    "sport": "soccer"
  },
  {
    "id": "pred-493",
    "predictorId": "heman",
    "predictorName": "Heman",
    "predictorAvatar": "/images/predictions/heman.webp",
    "hitRate": 41.39,
    "sport": "soccer"
  },
  {
    "id": "pred-494",
    "predictorId": "bryanne",
    "predictorName": "Bryanne",
    "predictorAvatar": "/images/predictions/bryanne.webp",
    "hitRate": 41.34,
    "winStreak": "2x wins",
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-495",
    "predictorId": "abe",
    "predictorName": "Abe",
    "predictorAvatar": "/images/predictions/abe.webp",
    "hitRate": 41.32,
    "sport": "soccer"
  },
  {
    "id": "pred-496",
    "predictorId": "palti",
    "predictorName": "Palti",
    "predictorAvatar": "/images/predictions/palti.webp",
    "hitRate": 41.26,
    "winStreak": "2x wins",
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-497",
    "predictorId": "volkan",
    "predictorName": "Volkan",
    "predictorAvatar": "/images/predictions/volkan.webp",
    "hitRate": 41.18,
    "sport": "soccer"
  },
  {
    "id": "pred-498",
    "predictorId": "shana",
    "predictorName": "Shana",
    "predictorAvatar": "/images/predictions/shana.webp",
    "hitRate": 41.12,
    "sport": "soccer"
  },
  {
    "id": "pred-499",
    "predictorId": "callaghan",
    "predictorName": "Callaghan",
    "predictorAvatar": "/images/predictions/callaghan.webp",
    "hitRate": 40.89,
    "sport": "soccer"
  },
  {
    "id": "pred-500",
    "predictorId": "shallum",
    "predictorName": "Shallum",
    "predictorAvatar": "/images/predictions/shallum.webp",
    "hitRate": 40.64,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-501",
    "predictorId": "rogue",
    "predictorName": "Rogue",
    "predictorAvatar": "/images/predictions/rogue.webp",
    "hitRate": 40.52,
    "sport": "soccer"
  },
  {
    "id": "pred-502",
    "predictorId": "frick",
    "predictorName": "Frick",
    "predictorAvatar": "/images/predictions/frick.webp",
    "hitRate": 38.81,
    "sport": "soccer"
  },
  {
    "id": "pred-503",
    "predictorId": "theodule",
    "predictorName": "Theodule",
    "predictorAvatar": "/images/predictions/theodule.webp",
    "hitRate": 38.71,
    "sport": "soccer"
  },
  {
    "id": "pred-504",
    "predictorId": "calvin",
    "predictorName": "Calvin",
    "predictorAvatar": "/images/predictions/calvin.webp",
    "hitRate": 38.43,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-505",
    "predictorId": "chankoowashtay",
    "predictorName": "Chankoowashtay",
    "predictorAvatar": "/images/predictions/chankoowashtay.webp",
    "hitRate": 38.41,
    "currentPredictions": 3,
    "sport": "soccer"
  },
  {
    "id": "pred-506",
    "predictorId": "konala",
    "predictorName": "Konala",
    "predictorAvatar": "/images/predictions/konala.webp",
    "hitRate": 38.08,
    "sport": "soccer"
  },
  {
    "id": "pred-507",
    "predictorId": "onofrio",
    "predictorName": "Onofrio",
    "predictorAvatar": "/images/predictions/onofrio.webp",
    "hitRate": 38.07,
    "sport": "soccer"
  },
  {
    "id": "pred-508",
    "predictorId": "freed",
    "predictorName": "Freed",
    "predictorAvatar": "/images/predictions/freed.webp",
    "hitRate": 37.99,
    "sport": "soccer"
  },
  {
    "id": "pred-509",
    "predictorId": "silko",
    "predictorName": "Silko",
    "predictorAvatar": "/images/predictions/silko.webp",
    "hitRate": 37.98,
    "sport": "soccer"
  },
  {
    "id": "pred-510",
    "predictorId": "brown",
    "predictorName": "Brown",
    "predictorAvatar": "/images/predictions/brown.webp",
    "hitRate": 37.86,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-511",
    "predictorId": "marco",
    "predictorName": "Marco",
    "predictorAvatar": "/images/predictions/marco.webp",
    "hitRate": 37.84,
    "sport": "soccer"
  },
  {
    "id": "pred-512",
    "predictorId": "krew",
    "predictorName": "Krew",
    "predictorAvatar": "/images/predictions/krew.webp",
    "hitRate": 37.77,
    "sport": "soccer"
  },
  {
    "id": "pred-513",
    "predictorId": "nereus",
    "predictorName": "Nereus",
    "predictorAvatar": "/images/predictions/nereus.webp",
    "hitRate": 37.72,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-514",
    "predictorId": "hugh",
    "predictorName": "Hugh",
    "predictorAvatar": "/images/predictions/hugh.webp",
    "hitRate": 37.67,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-515",
    "predictorId": "dalmazio",
    "predictorName": "Dalmazio",
    "predictorAvatar": "/images/predictions/dalmazio.webp",
    "hitRate": 37.63,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-516",
    "predictorId": "sokka",
    "predictorName": "Sokka",
    "predictorAvatar": "/images/predictions/sokka.webp",
    "hitRate": 37.61,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-517",
    "predictorId": "danyal",
    "predictorName": "Danyal",
    "predictorAvatar": "/images/predictions/danyal.webp",
    "hitRate": 37.56,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-518",
    "predictorId": "adish",
    "predictorName": "Adish",
    "predictorAvatar": "/images/predictions/adish.webp",
    "hitRate": 37.52,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-519",
    "predictorId": "kuper",
    "predictorName": "Kuper",
    "predictorAvatar": "/images/predictions/kuper.webp",
    "hitRate": 37.46,
    "sport": "soccer"
  },
  {
    "id": "pred-520",
    "predictorId": "tywin",
    "predictorName": "Tywin",
    "predictorAvatar": "/images/predictions/tywin.webp",
    "hitRate": 37.43,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-521",
    "predictorId": "nosewise",
    "predictorName": "Nosewise",
    "predictorAvatar": "/images/predictions/nosewise.webp",
    "hitRate": 37.42,
    "sport": "soccer"
  },
  {
    "id": "pred-522",
    "predictorId": "romney",
    "predictorName": "Romney",
    "predictorAvatar": "/images/predictions/romney.webp",
    "hitRate": 37.36,
    "sport": "soccer"
  },
  {
    "id": "pred-523",
    "predictorId": "alain",
    "predictorName": "Alain",
    "predictorAvatar": "/images/predictions/alain.webp",
    "hitRate": 37.35,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-524",
    "predictorId": "eckhard",
    "predictorName": "Eckhard",
    "predictorAvatar": "/images/predictions/eckhard.webp",
    "hitRate": 37.34,
    "winStreak": "3x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-525",
    "predictorId": "diallo",
    "predictorName": "Diallo",
    "predictorAvatar": "/images/predictions/diallo.webp",
    "hitRate": 37.32,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-526",
    "predictorId": "bo",
    "predictorName": "Bo",
    "predictorAvatar": "/images/predictions/bo.webp",
    "hitRate": 37.28,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-527",
    "predictorId": "mattox",
    "predictorName": "Mattox",
    "predictorAvatar": "/images/predictions/mattox.webp",
    "hitRate": 37.24,
    "sport": "soccer"
  },
  {
    "id": "pred-528",
    "predictorId": "brad",
    "predictorName": "Brad",
    "predictorAvatar": "/images/predictions/brad.webp",
    "hitRate": 37.23,
    "sport": "soccer"
  },
  {
    "id": "pred-529",
    "predictorId": "jarlath",
    "predictorName": "Jarlath",
    "predictorAvatar": "/images/predictions/jarlath.webp",
    "hitRate": 37.22,
    "winStreak": "2x wins",
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-530",
    "predictorId": "satisha",
    "predictorName": "Satisha",
    "predictorAvatar": "/images/predictions/satisha.webp",
    "hitRate": 37.2,
    "sport": "soccer"
  },
  {
    "id": "pred-531",
    "predictorId": "avyaan",
    "predictorName": "Avyaan",
    "predictorAvatar": "/images/predictions/avyaan.webp",
    "hitRate": 37.19,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-532",
    "predictorId": "luthando",
    "predictorName": "Luthando",
    "predictorAvatar": "/images/predictions/luthando.webp",
    "hitRate": 37.19,
    "sport": "soccer"
  },
  {
    "id": "pred-533",
    "predictorId": "momuso",
    "predictorName": "Momuso",
    "predictorAvatar": "/images/predictions/momuso.webp",
    "hitRate": 37.18,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-534",
    "predictorId": "santino",
    "predictorName": "Santino",
    "predictorAvatar": "/images/predictions/santino.webp",
    "hitRate": 37.18,
    "sport": "soccer"
  },
  {
    "id": "pred-535",
    "predictorId": "link",
    "predictorName": "Link",
    "predictorAvatar": "/images/predictions/link.webp",
    "hitRate": 37.16,
    "sport": "soccer"
  },
  {
    "id": "pred-536",
    "predictorId": "wuyi",
    "predictorName": "Wuyi",
    "predictorAvatar": "/images/predictions/wuyi.webp",
    "hitRate": 37.14,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-537",
    "predictorId": "crius",
    "predictorName": "Crius",
    "predictorAvatar": "/images/predictions/crius.webp",
    "hitRate": 37.13,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-538",
    "predictorId": "asael",
    "predictorName": "Asael",
    "predictorAvatar": "/images/predictions/asael.webp",
    "hitRate": 37.11,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-539",
    "predictorId": "scooter",
    "predictorName": "Scooter",
    "predictorAvatar": "/images/predictions/scooter.webp",
    "hitRate": 37.11,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-540",
    "predictorId": "kanak",
    "predictorName": "Kanak",
    "predictorAvatar": "/images/predictions/kanak.webp",
    "hitRate": 37.1,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-541",
    "predictorId": "erwin",
    "predictorName": "Erwin",
    "predictorAvatar": "/images/predictions/erwin.webp",
    "hitRate": 37.1,
    "sport": "soccer"
  },
  {
    "id": "pred-542",
    "predictorId": "yanni",
    "predictorName": "Yanni",
    "predictorAvatar": "/images/predictions/yanni.webp",
    "hitRate": 37.04,
    "sport": "soccer"
  },
  {
    "id": "pred-543",
    "predictorId": "breccan",
    "predictorName": "Breccan",
    "predictorAvatar": "/images/predictions/breccan.webp",
    "hitRate": 37.03,
    "sport": "soccer"
  },
  {
    "id": "pred-544",
    "predictorId": "yitzhak",
    "predictorName": "Yitzhak",
    "predictorAvatar": "/images/predictions/yitzhak.webp",
    "hitRate": 37.02,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-545",
    "predictorId": "flavian",
    "predictorName": "Flavian",
    "predictorAvatar": "/images/predictions/flavian.webp",
    "hitRate": 37.01,
    "sport": "basketball"
  },
  {
    "id": "pred-546",
    "predictorId": "asuma",
    "predictorName": "Asuma",
    "predictorAvatar": "/images/predictions/asuma.webp",
    "hitRate": 36.97,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-547",
    "predictorId": "leland",
    "predictorName": "Leland",
    "predictorAvatar": "/images/predictions/leland.webp",
    "hitRate": 36.93,
    "sport": "soccer"
  },
  {
    "id": "pred-548",
    "predictorId": "daemyn",
    "predictorName": "Daemyn",
    "predictorAvatar": "/images/predictions/daemyn.webp",
    "hitRate": 36.92,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-549",
    "predictorId": "granville",
    "predictorName": "Granville",
    "predictorAvatar": "/images/predictions/granville.webp",
    "hitRate": 36.91,
    "sport": "soccer"
  },
  {
    "id": "pred-550",
    "predictorId": "alf",
    "predictorName": "Alf",
    "predictorAvatar": "/images/predictions/alf.webp",
    "hitRate": 36.91,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-551",
    "predictorId": "soan",
    "predictorName": "Soan",
    "predictorAvatar": "/images/predictions/soan.webp",
    "hitRate": 36.89,
    "sport": "soccer"
  },
  {
    "id": "pred-552",
    "predictorId": "chadwick",
    "predictorName": "Chadwick",
    "predictorAvatar": "/images/predictions/chadwick.webp",
    "hitRate": 36.89,
    "currentPredictions": 4,
    "sport": "soccer"
  },
  {
    "id": "pred-553",
    "predictorId": "delgado",
    "predictorName": "Delgado",
    "predictorAvatar": "/images/predictions/delgado.webp",
    "hitRate": 36.86,
    "sport": "soccer"
  },
  {
    "id": "pred-554",
    "predictorId": "aeolus",
    "predictorName": "Aeolus",
    "predictorAvatar": "/images/predictions/aeolus.webp",
    "hitRate": 36.86,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-555",
    "predictorId": "suelita",
    "predictorName": "Suelita",
    "predictorAvatar": "/images/predictions/suelita.webp",
    "hitRate": 36.83,
    "sport": "soccer"
  },
  {
    "id": "pred-556",
    "predictorId": "amyntor",
    "predictorName": "Amyntor",
    "predictorAvatar": "/images/predictions/amyntor.webp",
    "hitRate": 36.82,
    "sport": "soccer"
  },
  {
    "id": "pred-557",
    "predictorId": "justin",
    "predictorName": "Justin",
    "predictorAvatar": "/images/predictions/justin.webp",
    "hitRate": 36.79,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-558",
    "predictorId": "tybalt",
    "predictorName": "Tybalt",
    "predictorAvatar": "/images/predictions/tybalt.webp",
    "hitRate": 36.75,
    "sport": "soccer"
  },
  {
    "id": "pred-559",
    "predictorId": "chesmu",
    "predictorName": "Chesmu",
    "predictorAvatar": "/images/predictions/chesmu.webp",
    "hitRate": 36.74,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-560",
    "predictorId": "chayan",
    "predictorName": "Chayan",
    "predictorAvatar": "/images/predictions/chayan.webp",
    "hitRate": 36.73,
    "sport": "soccer"
  },
  {
    "id": "pred-561",
    "predictorId": "brant",
    "predictorName": "Brant",
    "predictorAvatar": "/images/predictions/brant.webp",
    "hitRate": 36.73,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-562",
    "predictorId": "fearghus",
    "predictorName": "Fearghus",
    "predictorAvatar": "/images/predictions/fearghus.webp",
    "hitRate": 36.72,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-563",
    "predictorId": "caddock",
    "predictorName": "Caddock",
    "predictorAvatar": "/images/predictions/caddock.webp",
    "hitRate": 36.7,
    "sport": "soccer"
  },
  {
    "id": "pred-564",
    "predictorId": "ramsey",
    "predictorName": "Ramsey",
    "predictorAvatar": "/images/predictions/ramsey.webp",
    "hitRate": 36.7,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-565",
    "predictorId": "stanley",
    "predictorName": "Stanley",
    "predictorAvatar": "/images/predictions/stanley.webp",
    "hitRate": 36.7,
    "sport": "soccer"
  },
  {
    "id": "pred-566",
    "predictorId": "palmer",
    "predictorName": "Palmer",
    "predictorAvatar": "/images/predictions/palmer.webp",
    "hitRate": 36.68,
    "winStreak": "2x wins",
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-567",
    "predictorId": "pierluigi",
    "predictorName": "Pierluigi",
    "predictorAvatar": "/images/predictions/pierluigi.webp",
    "hitRate": 36.68,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-568",
    "predictorId": "orhan",
    "predictorName": "Orhan",
    "predictorAvatar": "/images/predictions/orhan.webp",
    "hitRate": 36.67,
    "sport": "soccer"
  },
  {
    "id": "pred-569",
    "predictorId": "ryota",
    "predictorName": "Ryota",
    "predictorAvatar": "/images/predictions/ryota.webp",
    "hitRate": 36.66,
    "sport": "soccer"
  },
  {
    "id": "pred-570",
    "predictorId": "nicholas",
    "predictorName": "Nicholas",
    "predictorAvatar": "/images/predictions/nicholas.webp",
    "hitRate": 36.66,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-571",
    "predictorId": "ondre",
    "predictorName": "Ondre",
    "predictorAvatar": "/images/predictions/ondre.webp",
    "hitRate": 36.63,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-572",
    "predictorId": "drexel",
    "predictorName": "Drexel",
    "predictorAvatar": "/images/predictions/drexel.webp",
    "hitRate": 36.62,
    "sport": "soccer"
  },
  {
    "id": "pred-573",
    "predictorId": "antonius",
    "predictorName": "Antonius",
    "predictorAvatar": "/images/predictions/antonius.webp",
    "hitRate": 36.61,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-574",
    "predictorId": "seong-su",
    "predictorName": "Seong-Su",
    "predictorAvatar": "/images/predictions/seong-su.webp",
    "hitRate": 36.58,
    "sport": "soccer"
  },
  {
    "id": "pred-575",
    "predictorId": "sherif",
    "predictorName": "Sherif",
    "predictorAvatar": "/images/predictions/sherif.webp",
    "hitRate": 36.57,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-576",
    "predictorId": "amerigo",
    "predictorName": "Amerigo",
    "predictorAvatar": "/images/predictions/amerigo.webp",
    "hitRate": 36.54,
    "winStreak": "2x wins",
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-577",
    "predictorId": "natan",
    "predictorName": "Natan",
    "predictorAvatar": "/images/predictions/natan.webp",
    "hitRate": 36.54,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-578",
    "predictorId": "abu",
    "predictorName": "Abu",
    "predictorAvatar": "/images/predictions/abu.webp",
    "hitRate": 36.54,
    "sport": "soccer"
  },
  {
    "id": "pred-579",
    "predictorId": "jiro",
    "predictorName": "Jiro",
    "predictorAvatar": "/images/predictions/jiro.webp",
    "hitRate": 36.51,
    "sport": "soccer"
  },
  {
    "id": "pred-580",
    "predictorId": "narcissus",
    "predictorName": "Narcissus",
    "predictorAvatar": "/images/predictions/narcissus.webp",
    "hitRate": 36.5,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-581",
    "predictorId": "jedrek",
    "predictorName": "Jedrek",
    "predictorAvatar": "/images/predictions/jedrek.webp",
    "hitRate": 36.49,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-582",
    "predictorId": "kamren",
    "predictorName": "Kamren",
    "predictorAvatar": "/images/predictions/kamren.webp",
    "hitRate": 36.49,
    "sport": "soccer"
  },
  {
    "id": "pred-583",
    "predictorId": "leverett",
    "predictorName": "Leverett",
    "predictorAvatar": "/images/predictions/leverett.webp",
    "hitRate": 36.47,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-584",
    "predictorId": "mingan",
    "predictorName": "Mingan",
    "predictorAvatar": "/images/predictions/mingan.webp",
    "hitRate": 36.46,
    "sport": "soccer"
  },
  {
    "id": "pred-585",
    "predictorId": "cannon",
    "predictorName": "Cannon",
    "predictorAvatar": "/images/predictions/cannon.webp",
    "hitRate": 36.45,
    "sport": "soccer"
  },
  {
    "id": "pred-586",
    "predictorId": "neele",
    "predictorName": "Neele",
    "predictorAvatar": "/images/predictions/neele.webp",
    "hitRate": 36.45,
    "sport": "soccer"
  },
  {
    "id": "pred-587",
    "predictorId": "raziel",
    "predictorName": "Raziel",
    "predictorAvatar": "/images/predictions/raziel.webp",
    "hitRate": 36.41,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-588",
    "predictorId": "damian",
    "predictorName": "Damian",
    "predictorAvatar": "/images/predictions/damian.webp",
    "hitRate": 36.41,
    "sport": "soccer"
  },
  {
    "id": "pred-589",
    "predictorId": "dathan",
    "predictorName": "Dathan",
    "predictorAvatar": "/images/predictions/dathan.webp",
    "hitRate": 36.41,
    "sport": "soccer"
  },
  {
    "id": "pred-590",
    "predictorId": "mollie",
    "predictorName": "Mollie",
    "predictorAvatar": "/images/predictions/mollie.webp",
    "hitRate": 36.41,
    "sport": "soccer"
  },
  {
    "id": "pred-591",
    "predictorId": "marcelo",
    "predictorName": "Marcelo",
    "predictorAvatar": "/images/predictions/marcelo.webp",
    "hitRate": 36.4,
    "sport": "soccer"
  },
  {
    "id": "pred-592",
    "predictorId": "raivis",
    "predictorName": "Raivis",
    "predictorAvatar": "/images/predictions/raivis.webp",
    "hitRate": 36.37,
    "winStreak": "2x wins",
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-593",
    "predictorId": "peso",
    "predictorName": "Peso",
    "predictorAvatar": "/images/predictions/peso.webp",
    "hitRate": 36.37,
    "sport": "soccer"
  },
  {
    "id": "pred-594",
    "predictorId": "richard",
    "predictorName": "Richard",
    "predictorAvatar": "/images/predictions/richard.webp",
    "hitRate": 36.36,
    "sport": "soccer"
  },
  {
    "id": "pred-595",
    "predictorId": "pasgen",
    "predictorName": "Pasgen",
    "predictorAvatar": "/images/predictions/pasgen.webp",
    "hitRate": 36.3,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-596",
    "predictorId": "yanisin",
    "predictorName": "Yanisin",
    "predictorAvatar": "/images/predictions/yanisin.webp",
    "hitRate": 36.29,
    "sport": "soccer"
  },
  {
    "id": "pred-597",
    "predictorId": "eastwood",
    "predictorName": "Eastwood",
    "predictorAvatar": "/images/predictions/eastwood.webp",
    "hitRate": 36.27,
    "sport": "soccer"
  },
  {
    "id": "pred-598",
    "predictorId": "tertius",
    "predictorName": "Tertius",
    "predictorAvatar": "/images/predictions/tertius.webp",
    "hitRate": 36.24,
    "sport": "soccer"
  },
  {
    "id": "pred-599",
    "predictorId": "habib",
    "predictorName": "Habib",
    "predictorAvatar": "/images/predictions/habib.webp",
    "hitRate": 36.24,
    "sport": "soccer"
  },
  {
    "id": "pred-600",
    "predictorId": "aditya",
    "predictorName": "Aditya",
    "predictorAvatar": "/images/predictions/aditya.webp",
    "hitRate": 36.23,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-601",
    "predictorId": "lolonyo",
    "predictorName": "Lolonyo",
    "predictorAvatar": "/images/predictions/lolonyo.webp",
    "hitRate": 36.19,
    "sport": "soccer"
  },
  {
    "id": "pred-602",
    "predictorId": "tassos",
    "predictorName": "Tassos",
    "predictorAvatar": "/images/predictions/tassos.webp",
    "hitRate": 36.18,
    "sport": "soccer"
  },
  {
    "id": "pred-603",
    "predictorId": "salix",
    "predictorName": "Salix",
    "predictorAvatar": "/images/predictions/salix.webp",
    "hitRate": 36.18,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-604",
    "predictorId": "adagio",
    "predictorName": "Adagio",
    "predictorAvatar": "/images/predictions/adagio.webp",
    "hitRate": 36.16,
    "sport": "soccer"
  },
  {
    "id": "pred-605",
    "predictorId": "jaycob",
    "predictorName": "Jaycob",
    "predictorAvatar": "/images/predictions/jaycob.webp",
    "hitRate": 36.13,
    "sport": "soccer"
  },
  {
    "id": "pred-606",
    "predictorId": "kittiya",
    "predictorName": "Kittiya",
    "predictorAvatar": "/images/predictions/kittiya.webp",
    "hitRate": 36.11,
    "sport": "soccer"
  },
  {
    "id": "pred-607",
    "predictorId": "astro",
    "predictorName": "Astro",
    "predictorAvatar": "/images/predictions/astro.webp",
    "hitRate": 36.11,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-608",
    "predictorId": "kahikina",
    "predictorName": "Kahikina",
    "predictorAvatar": "/images/predictions/kahikina.webp",
    "hitRate": 36.07,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-609",
    "predictorId": "ethan",
    "predictorName": "Ethan",
    "predictorAvatar": "/images/predictions/ethan.webp",
    "hitRate": 36.04,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-610",
    "predictorId": "berkant",
    "predictorName": "Berkant",
    "predictorAvatar": "/images/predictions/berkant.webp",
    "hitRate": 36,
    "winStreak": "3x wins",
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-611",
    "predictorId": "roald",
    "predictorName": "Roald",
    "predictorAvatar": "/images/predictions/roald.webp",
    "hitRate": 35.99,
    "sport": "soccer"
  },
  {
    "id": "pred-612",
    "predictorId": "cyrus",
    "predictorName": "Cyrus",
    "predictorAvatar": "/images/predictions/cyrus.webp",
    "hitRate": 35.97,
    "winStreak": "4x wins",
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-613",
    "predictorId": "gitano",
    "predictorName": "Gitano",
    "predictorAvatar": "/images/predictions/gitano.webp",
    "hitRate": 35.96,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-614",
    "predictorId": "doruk",
    "predictorName": "Doruk",
    "predictorAvatar": "/images/predictions/doruk.webp",
    "hitRate": 35.96,
    "sport": "soccer"
  },
  {
    "id": "pred-615",
    "predictorId": "masahiro",
    "predictorName": "Masahiro",
    "predictorAvatar": "/images/predictions/masahiro.webp",
    "hitRate": 35.96,
    "sport": "soccer"
  },
  {
    "id": "pred-616",
    "predictorId": "crowley",
    "predictorName": "Crowley",
    "predictorAvatar": "/images/predictions/crowley.webp",
    "hitRate": 35.96,
    "sport": "soccer"
  },
  {
    "id": "pred-617",
    "predictorId": "coniraya",
    "predictorName": "Coniraya",
    "predictorAvatar": "/images/predictions/coniraya.webp",
    "hitRate": 35.95,
    "sport": "soccer"
  },
  {
    "id": "pred-618",
    "predictorId": "martirio",
    "predictorName": "Martirio",
    "predictorAvatar": "/images/predictions/martirio.webp",
    "hitRate": 35.95,
    "sport": "soccer"
  },
  {
    "id": "pred-619",
    "predictorId": "kosta",
    "predictorName": "Kosta",
    "predictorAvatar": "/images/predictions/kosta.webp",
    "hitRate": 35.94,
    "sport": "soccer"
  },
  {
    "id": "pred-620",
    "predictorId": "toussaint",
    "predictorName": "Toussaint",
    "predictorAvatar": "/images/predictions/toussaint.webp",
    "hitRate": 35.92,
    "sport": "soccer"
  },
  {
    "id": "pred-621",
    "predictorId": "manfred",
    "predictorName": "Manfred",
    "predictorAvatar": "/images/predictions/manfred.webp",
    "hitRate": 35.91,
    "sport": "soccer"
  },
  {
    "id": "pred-622",
    "predictorId": "devota",
    "predictorName": "Devota",
    "predictorAvatar": "/images/predictions/devota.webp",
    "hitRate": 35.91,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-623",
    "predictorId": "camaxtli",
    "predictorName": "Camaxtli",
    "predictorAvatar": "/images/predictions/camaxtli.webp",
    "hitRate": 35.9,
    "sport": "soccer"
  },
  {
    "id": "pred-624",
    "predictorId": "pascal",
    "predictorName": "Pascal",
    "predictorAvatar": "/images/predictions/pascal.webp",
    "hitRate": 35.89,
    "sport": "soccer"
  },
  {
    "id": "pred-625",
    "predictorId": "dobry",
    "predictorName": "Dobry",
    "predictorAvatar": "/images/predictions/dobry.webp",
    "hitRate": 35.89,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-626",
    "predictorId": "gervasio",
    "predictorName": "Gervasio",
    "predictorAvatar": "/images/predictions/gervasio.webp",
    "hitRate": 35.87,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-627",
    "predictorId": "omari",
    "predictorName": "Omari",
    "predictorAvatar": "/images/predictions/omari.webp",
    "hitRate": 35.87,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-628",
    "predictorId": "kotaro",
    "predictorName": "Kotaro",
    "predictorAvatar": "/images/predictions/kotaro.webp",
    "hitRate": 35.86,
    "sport": "soccer"
  },
  {
    "id": "pred-629",
    "predictorId": "imad",
    "predictorName": "Imad",
    "predictorAvatar": "/images/predictions/imad.webp",
    "hitRate": 35.86,
    "sport": "soccer"
  },
  {
    "id": "pred-630",
    "predictorId": "waseem",
    "predictorName": "Waseem",
    "predictorAvatar": "/images/predictions/waseem.webp",
    "hitRate": 35.86,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-631",
    "predictorId": "rooney",
    "predictorName": "Rooney",
    "predictorAvatar": "/images/predictions/rooney.webp",
    "hitRate": 35.86,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-632",
    "predictorId": "bittor",
    "predictorName": "Bittor",
    "predictorAvatar": "/images/predictions/bittor.webp",
    "hitRate": 35.84,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-633",
    "predictorId": "kyson",
    "predictorName": "Kyson",
    "predictorAvatar": "/images/predictions/kyson.webp",
    "hitRate": 35.82,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-634",
    "predictorId": "cullen",
    "predictorName": "Cullen",
    "predictorAvatar": "/images/predictions/cullen.webp",
    "hitRate": 35.81,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-635",
    "predictorId": "stanislaus",
    "predictorName": "Stanislaus",
    "predictorAvatar": "/images/predictions/stanislaus.webp",
    "hitRate": 35.8,
    "sport": "soccer"
  },
  {
    "id": "pred-636",
    "predictorId": "carwyn",
    "predictorName": "Carwyn",
    "predictorAvatar": "/images/predictions/carwyn.webp",
    "hitRate": 35.8,
    "sport": "soccer"
  },
  {
    "id": "pred-637",
    "predictorId": "hall",
    "predictorName": "Hall",
    "predictorAvatar": "/images/predictions/hall.webp",
    "hitRate": 35.79,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-638",
    "predictorId": "darrow",
    "predictorName": "Darrow",
    "predictorAvatar": "/images/predictions/darrow.webp",
    "hitRate": 35.77,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-639",
    "predictorId": "keyshawn",
    "predictorName": "Keyshawn",
    "predictorAvatar": "/images/predictions/keyshawn.webp",
    "hitRate": 35.76,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-640",
    "predictorId": "hermias",
    "predictorName": "Hermias",
    "predictorAvatar": "/images/predictions/hermias.webp",
    "hitRate": 35.73,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-641",
    "predictorId": "taban",
    "predictorName": "Taban",
    "predictorAvatar": "/images/predictions/taban.webp",
    "hitRate": 35.73,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-642",
    "predictorId": "sturla",
    "predictorName": "Sturla",
    "predictorAvatar": "/images/predictions/sturla.webp",
    "hitRate": 35.73,
    "sport": "soccer"
  },
  {
    "id": "pred-643",
    "predictorId": "braven",
    "predictorName": "Braven",
    "predictorAvatar": "/images/predictions/braven.webp",
    "hitRate": 35.69,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-644",
    "predictorId": "brennen",
    "predictorName": "Brennen",
    "predictorAvatar": "/images/predictions/brennen.webp",
    "hitRate": 35.69,
    "sport": "soccer"
  },
  {
    "id": "pred-645",
    "predictorId": "dominic",
    "predictorName": "Dominic",
    "predictorAvatar": "/images/predictions/dominic.webp",
    "hitRate": 35.68,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-646",
    "predictorId": "chinelo",
    "predictorName": "Chinelo",
    "predictorAvatar": "/images/predictions/chinelo.webp",
    "hitRate": 35.67,
    "sport": "soccer"
  },
  {
    "id": "pred-647",
    "predictorId": "castaneda",
    "predictorName": "Castañeda",
    "predictorAvatar": "/images/predictions/castaneda.webp",
    "hitRate": 35.67,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-648",
    "predictorId": "hodor",
    "predictorName": "Hodor",
    "predictorAvatar": "/images/predictions/hodor.webp",
    "hitRate": 35.67,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-649",
    "predictorId": "othniel",
    "predictorName": "Othniel",
    "predictorAvatar": "/images/predictions/othniel.webp",
    "hitRate": 35.65,
    "sport": "soccer"
  },
  {
    "id": "pred-650",
    "predictorId": "notaku",
    "predictorName": "Notaku",
    "predictorAvatar": "/images/predictions/notaku.webp",
    "hitRate": 35.63,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-651",
    "predictorId": "molimo",
    "predictorName": "Molimo",
    "predictorAvatar": "/images/predictions/molimo.webp",
    "hitRate": 35.62,
    "winStreak": "3x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-652",
    "predictorId": "walter",
    "predictorName": "Walter",
    "predictorAvatar": "/images/predictions/walter.webp",
    "hitRate": 35.61,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-653",
    "predictorId": "keb",
    "predictorName": "Keb",
    "predictorAvatar": "/images/predictions/keb.webp",
    "hitRate": 35.61,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-654",
    "predictorId": "base",
    "predictorName": "Base",
    "predictorAvatar": "/images/predictions/base.webp",
    "hitRate": 35.59,
    "sport": "soccer"
  },
  {
    "id": "pred-655",
    "predictorId": "bavo",
    "predictorName": "Bavo",
    "predictorAvatar": "/images/predictions/bavo.webp",
    "hitRate": 35.59,
    "sport": "soccer"
  },
  {
    "id": "pred-656",
    "predictorId": "khadejah",
    "predictorName": "Khadejah",
    "predictorAvatar": "/images/predictions/khadejah.webp",
    "hitRate": 35.58,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-657",
    "predictorId": "christoffer",
    "predictorName": "Christoffer",
    "predictorAvatar": "/images/predictions/christoffer.webp",
    "hitRate": 35.58,
    "sport": "soccer"
  },
  {
    "id": "pred-658",
    "predictorId": "kaz",
    "predictorName": "Kaz",
    "predictorAvatar": "/images/predictions/kaz.webp",
    "hitRate": 35.55,
    "sport": "soccer"
  },
  {
    "id": "pred-659",
    "predictorId": "pedro",
    "predictorName": "Pedro",
    "predictorAvatar": "/images/predictions/pedro.webp",
    "hitRate": 35.55,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-660",
    "predictorId": "temujin",
    "predictorName": "Temujin",
    "predictorAvatar": "/images/predictions/temujin.webp",
    "hitRate": 35.55,
    "sport": "soccer"
  },
  {
    "id": "pred-661",
    "predictorId": "ashkan",
    "predictorName": "Ashkan",
    "predictorAvatar": "/images/predictions/ashkan.webp",
    "hitRate": 35.54,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-662",
    "predictorId": "kenny",
    "predictorName": "Kenny",
    "predictorAvatar": "/images/predictions/kenny.webp",
    "hitRate": 35.54,
    "currentPredictions": 3,
    "sport": "soccer"
  },
  {
    "id": "pred-663",
    "predictorId": "bowie",
    "predictorName": "Bowie",
    "predictorAvatar": "/images/predictions/bowie.webp",
    "hitRate": 35.54,
    "sport": "soccer"
  },
  {
    "id": "pred-664",
    "predictorId": "yerodin",
    "predictorName": "Yerodin",
    "predictorAvatar": "/images/predictions/yerodin.webp",
    "hitRate": 35.52,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-665",
    "predictorId": "itsuo",
    "predictorName": "Itsuo",
    "predictorAvatar": "/images/predictions/itsuo.webp",
    "hitRate": 35.52,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-666",
    "predictorId": "ferial",
    "predictorName": "Ferial",
    "predictorAvatar": "/images/predictions/ferial.webp",
    "hitRate": 35.51,
    "sport": "soccer"
  },
  {
    "id": "pred-667",
    "predictorId": "pelton",
    "predictorName": "Pelton",
    "predictorAvatar": "/images/predictions/pelton.webp",
    "hitRate": 35.49,
    "winStreak": "2x wins",
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-668",
    "predictorId": "konrad",
    "predictorName": "Konrad",
    "predictorAvatar": "/images/predictions/konrad.webp",
    "hitRate": 35.47,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-669",
    "predictorId": "winulf",
    "predictorName": "Winulf",
    "predictorAvatar": "/images/predictions/winulf.webp",
    "hitRate": 35.46,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-670",
    "predictorId": "gordy",
    "predictorName": "Gordy",
    "predictorAvatar": "/images/predictions/gordy.webp",
    "hitRate": 35.45,
    "currentPredictions": 3,
    "sport": "soccer"
  },
  {
    "id": "pred-671",
    "predictorId": "wahchinksapa",
    "predictorName": "Wahchinksapa",
    "predictorAvatar": "/images/predictions/wahchinksapa.webp",
    "hitRate": 35.45,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-672",
    "predictorId": "jai",
    "predictorName": "Jai",
    "predictorAvatar": "/images/predictions/jai.webp",
    "hitRate": 35.44,
    "sport": "soccer"
  },
  {
    "id": "pred-673",
    "predictorId": "pirro",
    "predictorName": "Pirro",
    "predictorAvatar": "/images/predictions/pirro.webp",
    "hitRate": 35.43,
    "sport": "soccer"
  },
  {
    "id": "pred-674",
    "predictorId": "cornell",
    "predictorName": "Cornell",
    "predictorAvatar": "/images/predictions/cornell.webp",
    "hitRate": 35.41,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-675",
    "predictorId": "altan",
    "predictorName": "Altan",
    "predictorAvatar": "/images/predictions/altan.webp",
    "hitRate": 35.4,
    "sport": "soccer"
  },
  {
    "id": "pred-676",
    "predictorId": "alex",
    "predictorName": "Alex",
    "predictorAvatar": "/images/predictions/alex.webp",
    "hitRate": 35.34,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-677",
    "predictorId": "florentin",
    "predictorName": "Florentin",
    "predictorAvatar": "/images/predictions/florentin.webp",
    "hitRate": 35.33,
    "sport": "soccer"
  },
  {
    "id": "pred-678",
    "predictorId": "cayson",
    "predictorName": "Cayson",
    "predictorAvatar": "/images/predictions/cayson.webp",
    "hitRate": 35.32,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-679",
    "predictorId": "jakai",
    "predictorName": "Jakai",
    "predictorAvatar": "/images/predictions/jakai.webp",
    "hitRate": 35.31,
    "sport": "soccer"
  },
  {
    "id": "pred-680",
    "predictorId": "darrius",
    "predictorName": "Darrius",
    "predictorAvatar": "/images/predictions/darrius.webp",
    "hitRate": 35.31,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-681",
    "predictorId": "reynold",
    "predictorName": "Reynold",
    "predictorAvatar": "/images/predictions/reynold.webp",
    "hitRate": 35.29,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-682",
    "predictorId": "hamlin",
    "predictorName": "Hamlin",
    "predictorAvatar": "/images/predictions/hamlin.webp",
    "hitRate": 35.28,
    "sport": "soccer"
  },
  {
    "id": "pred-683",
    "predictorId": "blu",
    "predictorName": "Blu",
    "predictorAvatar": "/images/predictions/blu.webp",
    "hitRate": 35.28,
    "sport": "soccer"
  },
  {
    "id": "pred-684",
    "predictorId": "kaidence",
    "predictorName": "Kaidence",
    "predictorAvatar": "/images/predictions/kaidence.webp",
    "hitRate": 35.24,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-685",
    "predictorId": "nobuhide",
    "predictorName": "Nobuhide",
    "predictorAvatar": "/images/predictions/nobuhide.webp",
    "hitRate": 35.24,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-686",
    "predictorId": "balliol",
    "predictorName": "Balliol",
    "predictorAvatar": "/images/predictions/balliol.webp",
    "hitRate": 35.24,
    "sport": "soccer"
  },
  {
    "id": "pred-687",
    "predictorId": "fei",
    "predictorName": "Fei",
    "predictorAvatar": "/images/predictions/fei.webp",
    "hitRate": 35.18,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-688",
    "predictorId": "thamyris",
    "predictorName": "Thamyris",
    "predictorAvatar": "/images/predictions/thamyris.webp",
    "hitRate": 35.12,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-689",
    "predictorId": "eljah",
    "predictorName": "Eljah",
    "predictorAvatar": "/images/predictions/eljah.webp",
    "hitRate": 35.11,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-690",
    "predictorId": "fumihiko",
    "predictorName": "Fumihiko",
    "predictorAvatar": "/images/predictions/fumihiko.webp",
    "hitRate": 35.06,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-691",
    "predictorId": "thuan",
    "predictorName": "Thuan",
    "predictorAvatar": "/images/predictions/thuan.webp",
    "hitRate": 35.04,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-692",
    "predictorId": "abimael",
    "predictorName": "Abimael",
    "predictorAvatar": "/images/predictions/abimael.webp",
    "hitRate": 35.01,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-693",
    "predictorId": "kwam",
    "predictorName": "Kwam",
    "predictorAvatar": "/images/predictions/kwam.webp",
    "hitRate": 35.01,
    "sport": "soccer"
  },
  {
    "id": "pred-694",
    "predictorId": "destined",
    "predictorName": "Destined",
    "predictorAvatar": "/images/predictions/destined.webp",
    "hitRate": 35,
    "sport": "soccer"
  },
  {
    "id": "pred-695",
    "predictorId": "khaled",
    "predictorName": "Khaled",
    "predictorAvatar": "/images/predictions/khaled.webp",
    "hitRate": 35,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-696",
    "predictorId": "rusul",
    "predictorName": "Rusul",
    "predictorAvatar": "/images/predictions/rusul.webp",
    "hitRate": 34.96,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-697",
    "predictorId": "oded",
    "predictorName": "Oded",
    "predictorAvatar": "/images/predictions/oded.webp",
    "hitRate": 34.9,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-698",
    "predictorId": "herman",
    "predictorName": "Herman",
    "predictorAvatar": "/images/predictions/herman.webp",
    "hitRate": 34.89,
    "sport": "soccer"
  },
  {
    "id": "pred-699",
    "predictorId": "natale",
    "predictorName": "Natale",
    "predictorAvatar": "/images/predictions/natale.webp",
    "hitRate": 34.86,
    "sport": "soccer"
  },
  {
    "id": "pred-700",
    "predictorId": "guo",
    "predictorName": "Guo",
    "predictorAvatar": "/images/predictions/guo.webp",
    "hitRate": 34.85,
    "sport": "soccer"
  },
  {
    "id": "pred-701",
    "predictorId": "moonus",
    "predictorName": "Moonus",
    "predictorAvatar": "/images/predictions/moonus.webp",
    "hitRate": 34.84,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-702",
    "predictorId": "kazuyuki",
    "predictorName": "Kazuyuki",
    "predictorAvatar": "/images/predictions/kazuyuki.webp",
    "hitRate": 34.8,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-703",
    "predictorId": "nehemiah",
    "predictorName": "Nehemiah",
    "predictorAvatar": "/images/predictions/nehemiah.webp",
    "hitRate": 34.78,
    "winStreak": "2x wins",
    "sport": "soccer"
  },
  {
    "id": "pred-704",
    "predictorId": "subrahmanyan",
    "predictorName": "Subrahmanyan",
    "predictorAvatar": "/images/predictions/subrahmanyan.webp",
    "hitRate": 34.77,
    "sport": "soccer"
  },
  {
    "id": "pred-705",
    "predictorId": "jalil",
    "predictorName": "Jalil",
    "predictorAvatar": "/images/predictions/jalil.webp",
    "hitRate": 34.7,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-706",
    "predictorId": "esau",
    "predictorName": "Esau",
    "predictorAvatar": "/images/predictions/esau.webp",
    "hitRate": 34.64,
    "sport": "soccer"
  },
  {
    "id": "pred-707",
    "predictorId": "elihu",
    "predictorName": "Elihu",
    "predictorAvatar": "/images/predictions/elihu.webp",
    "hitRate": 34.61,
    "sport": "soccer"
  },
  {
    "id": "pred-708",
    "predictorId": "algernon",
    "predictorName": "Algernon",
    "predictorAvatar": "/images/predictions/algernon.webp",
    "hitRate": 34.54,
    "sport": "soccer"
  },
  {
    "id": "pred-709",
    "predictorId": "sia",
    "predictorName": "Sia",
    "predictorAvatar": "/images/predictions/sia.webp",
    "hitRate": 34.54,
    "sport": "soccer"
  },
  {
    "id": "pred-710",
    "predictorId": "malik",
    "predictorName": "Malik",
    "predictorAvatar": "/images/predictions/malik.webp",
    "hitRate": 34.49,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-711",
    "predictorId": "sandro",
    "predictorName": "Sandro",
    "predictorAvatar": "/images/predictions/sandro.webp",
    "hitRate": 34.35,
    "currentPredictions": 2,
    "sport": "soccer"
  },
  {
    "id": "pred-712",
    "predictorId": "ion",
    "predictorName": "Ion",
    "predictorAvatar": "/images/predictions/ion.webp",
    "hitRate": 34.29,
    "sport": "soccer"
  },
  {
    "id": "pred-713",
    "predictorId": "midhat",
    "predictorName": "Midhat",
    "predictorAvatar": "/images/predictions/midhat.webp",
    "hitRate": 34.2,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-714",
    "predictorId": "damarion",
    "predictorName": "Damarion",
    "predictorAvatar": "/images/predictions/damarion.webp",
    "hitRate": 34.12,
    "sport": "soccer"
  },
  {
    "id": "pred-715",
    "predictorId": "sachio",
    "predictorName": "Sachio",
    "predictorAvatar": "/images/predictions/sachio.webp",
    "hitRate": 33.9,
    "currentPredictions": 1,
    "sport": "soccer"
  },
  {
    "id": "pred-716",
    "predictorId": "ruger",
    "predictorName": "Ruger",
    "predictorAvatar": "/images/predictions/ruger.webp",
    "hitRate": 33.9,
    "currentPredictions": 2,
    "sport": "soccer"
  }
]
