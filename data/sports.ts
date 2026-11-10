import type { Sport, SportsEvent } from '~/types/sports'

const now = () => Date.now()
const hoursFromNow = (h: number) => new Date(now() + h * 3600 * 1000).toISOString()
const hoursAgo = (h: number) => new Date(now() - h * 3600 * 1000).toISOString()

export const getTournamentLogo = (sport: Sport | string | undefined | null): string => {
  if (!sport) return '/images/sports/popular.webp'
  if (typeof sport === 'object' && sport.logo) return sport.logo

  const key = (typeof sport === 'object' ? `${sport.key} ${sport.title} ${sport.group}` : sport).toLowerCase()

  if (key.includes('nba')) return '/images/sports/nba.webp'
  if (key.includes('euroleague')) return '/images/sports/euroleague.webp'
  if (key.includes('ncaa') || key.includes('ncaab') || key.includes('march_madness')) return '/images/sports/ncaab.webp'
  if (key.includes('pba') || key.includes('philippine') || key.includes('pilipinas')) return '/images/sports/pba.webp'
  if (key.includes('epl') || key.includes('premier_league') || key.includes('premier league')) return '/images/sports/premier-league.webp'
  if (key.includes('conference')) return '/images/sports/uefa-europa-conference-league.webp'
  if (key.includes('europa_league') || key.includes('europa league')) return '/images/sports/uefa-europa-league.webp'
  if (key.includes('nations_league') || key.includes('nations league')) return '/images/sports/uefa-nations-league.webp'
  if (key.includes('champions_league') || key.includes('champs_league') || key.includes('uefa_champions') || key.includes('ucl')) return '/images/sports/uefa-champions-league.webp'
  if (key.includes('libertadores') || key.includes('conmebol')) return '/images/sports/conmebol-libertadores.webp'
  if (key.includes('mls')) return '/images/sports/mls.webp'
  if (key.includes('bundesliga')) return '/images/sports/bundesliga.webp'
  if (key.includes('serie_a') || key.includes('serie a')) return '/images/sports/serie-a.webp'
  if (key.includes('la_liga') || key.includes('laliga') || key.includes('la liga')) return '/images/sports/la-liga.webp'
  if (key.includes('ligue_1') || key.includes('ligue 1') || key.includes('ligue_one')) return '/images/sports/ligue-1.webp'
  if (key.includes('mlb') || key.includes('world_series')) return '/images/sports/mlb.webp'
  if (key.includes('npb')) return '/images/sports/npb.webp'
  if (key.includes('wimbledon')) return '/images/sports/wimbledon.webp'
  if (key.includes('us_open') || key.includes('us open')) return '/images/sports/us-open.webp'
  if (key.includes('aus_open') || key.includes('australian')) return '/images/sports/australian-open.webp'
  if (key.includes('roland_garros') || key.includes('french_open')) return '/images/sports/roland-garros.webp'
  if (key.includes('atp')) return '/images/sports/atp.webp'
  if (key.includes('wta')) return '/images/sports/wta.webp'
  if (key.includes('utr')) return '/images/sports/utr.webp'
  if (key.includes('nfl')) return '/images/sports/nfl.webp'
  if (key.includes('nbl')) return '/images/sports/nbl.webp'

  if (key.includes('basketball')) return '/icons/sports/basketball.webp'
  if (key.includes('soccer') || key.includes('football')) return '/icons/sports/soccer.webp'
  if (key.includes('tennis')) return '/icons/sports/tennis.webp'
  if (key.includes('baseball')) return '/icons/sports/baseball.webp'

  return '/images/sports/popular.webp'
}

export const getSportBall = (sport: Sport | string | undefined | null, sportParam?: string): string => {
  if (!sport && !sportParam) return ''
  const str = `${sport && typeof sport === 'object' ? `${sport.group || ''} ${sport.key || ''} ${sport.title || ''}` : (sport || '')} ${sportParam || ''}`.toLowerCase()

  if (str.includes('basketball') || str.includes('nba') || str.includes('euroleague') || str.includes('ncaa') || str.includes('pba')) {
    return '/icons/sports/basketball.webp'
  }
  if (str.includes('soccer') || str.includes('epl') || str.includes('bundesliga') || str.includes('serie_a') || str.includes('la_liga') || str.includes('uefa') || str.includes('ligue') || str.includes('football')) {
    return '/icons/sports/soccer.webp'
  }
  if (str.includes('tennis') || str.includes('atp') || str.includes('wta') || str.includes('utr') || str.includes('wimbledon') || str.includes('open')) {
    return '/icons/sports/tennis.webp'
  }
  if (str.includes('baseball') || str.includes('mlb') || str.includes('npb')) {
    return '/icons/sports/baseball.webp'
  }
  return ''
}

export const SAMPLE_SPORTS: Sport[] = [
  {
    key: "basketball_euroleague",
    group: "Basketball",
    title: "Basketball Euroleague",
    description: "Basketball Euroleague",
    active: true,
    has_outrights: false,
    country: "International",
    logo: "/images/sports/euroleague.webp",
  },
  {
    key: "basketball_nba",
    group: "Basketball",
    title: "NBA",
    description: "US Basketball",
    active: true,
    has_outrights: false,
    country: "USA",
    logo: "/images/sports/nba.webp",
  },
  {
    key: "basketball_nba_championship_winner",
    group: "Basketball",
    title: "NBA Championship Winner",
    description: "Championship Winner 2026/2027",
    active: true,
    has_outrights: true,
    country: "USA",
    logo: "/images/sports/nba.webp",
  },
  {
    key: "basketball_nbl",
    group: "Basketball",
    title: "NBL",
    description: "AU National Basketball League",
    active: true,
    has_outrights: false,
    country: "Australia",
    logo: "/images/sports/nbl.webp",
  },
  {
    key: "basketball_ncaab",
    group: "Basketball",
    title: "NCAAB",
    description: "US College Basketball",
    active: true,
    has_outrights: false,
    country: "USA",
    logo: "/images/sports/ncaab.webp",
  },
  {
    key: "basketball_ncaab_championship_winner",
    group: "Basketball",
    title: "NCAAB Championship Winner",
    description: "US College Basketball Championship Winner",
    active: true,
    has_outrights: true,
    country: "USA",
    logo: "/images/sports/ncaab.webp",
  },
  {
    key: "basketball_wnba",
    group: "Basketball",
    title: "WNBA",
    description: "US Basketball",
    active: true,
    has_outrights: false,
    country: "USA",
    logo: "/images/sports/nba.webp",
  },
  {
    key: "basketball_pba",
    group: "Basketball",
    title: "PBA Philippine Cup",
    description: "Philippine Basketball Association",
    active: true,
    has_outrights: false,
    country: "Philippines",
    logo: "/images/sports/pba.webp",
  },
  {
    key: "basketball_euroleague_winner",
    group: "Basketball",
    title: "EuroLeague Championship",
    description: "European Championship Winner",
    active: true,
    has_outrights: true,
    country: "International",
    logo: "/images/sports/euroleague.webp",
  },
  {
    key: "soccer_argentina_primera_division",
    group: "Soccer",
    title: "Primera División - Argentina",
    description: "Argentine Primera División",
    active: true,
    has_outrights: false,
    country: "Argentina",
    logo: "/images/sports/Primera Division.webp",

  },
  {
    key: "soccer_australia_aleague",
    group: "Soccer",
    title: "A-League",
    description: "Aussie Soccer",
    active: true,
    has_outrights: false,
    country: "Australia",
    logo: "/images/sports/a league.webp",
  },
  {
    key: "soccer_austria_bundesliga",
    group: "Soccer",
    title: "Austrian Football Bundesliga",
    description: "Austrian Soccer",
    active: true,
    has_outrights: false,
    country: "Austria",
    logo: "/images/sports/austria bundesliga.webp",
  },
  {
    key: "soccer_belgium_first_div",
    group: "Soccer",
    title: "Belgium First Div",
    description: "Belgian First Division A",
    active: true,
    has_outrights: false,
    country: "Belgium",
    logo: "/images/sports/bundesliga.webp",
  },
  {
    key: "soccer_brazil_campeonato",
    group: "Soccer",
    title: "Brazil Série A",
    description: "Brasileirão Série A",
    active: true,
    has_outrights: false,
    country: "Brazil",
  },
  {
    key: "soccer_brazil_serie_b",
    group: "Soccer",
    title: "Brazil Série B",
    description: "Campeonato Brasileiro Série B",
    active: true,
    has_outrights: false,
    country: "Brazil",
    logo: "/images/sports/serie-a.webp",
  },
  {
    key: "soccer_chile_campeonato",
    group: "Soccer",
    title: "Primera División - Chile",
    description: "Campeonato Chileno",
    active: true,
    has_outrights: false,
    country: "Chile",
  },
  {
    key: "soccer_conmebol_copa_libertadores",
    group: "Soccer",
    title: "Copa Libertadores",
    description: "CONMEBOL Copa Libertadores",
    active: true,
    has_outrights: false,
    country: "America",
    logo: "/images/sports/conmebol-libertadores.webp",
  },
  {
    key: "soccer_conmebol_copa_sudamericana",
    group: "Soccer",
    title: "Copa Sudamericana",
    description: "CONMEBOL Copa Sudamericana",
    active: true,
    has_outrights: false,
    country: "America",
  },
  {
    key: "soccer_denmark_superliga",
    group: "Soccer",
    title: "Denmark Superliga",
    description: "Danish Soccer",
    active: true,
    has_outrights: false,
    country: "Denmark",
  },
  {
    key: "soccer_efl_champ",
    group: "Soccer",
    title: "Championship",
    description: "England League Championship",
    active: true,
    has_outrights: false,
    country: "England",
    logo: ''
  },
  {
    key: "soccer_england_efl_cup",
    group: "Soccer",
    title: "EFL Cup",
    description: "League Cup",
    active: true,
    has_outrights: false,
    country: "England",
  },
  {
    key: "soccer_england_league1",
    group: "Soccer",
    title: "League 1",
    description: "EFL League 1",
    active: true,
    has_outrights: false,
    country: "England",
  },
  {
    key: "soccer_england_league2",
    group: "Soccer",
    title: "League 2",
    description: "EFL League 2 ",
    active: true,
    has_outrights: false,
    country: "England",
  },
  {
    key: "soccer_epl",
    group: "Soccer",
    title: "EPL",
    description: "English Premier League",
    active: true,
    has_outrights: false,
    country: "England",
    logo: "/images/sports/premier-league.webp",
  },
  {
    key: "soccer_finland_veikkausliiga",
    group: "Soccer",
    title: "Veikkausliiga - Finland",
    description: "Finnish  Soccer",
    active: true,
    has_outrights: false,
    country: "Finland",
  },
  {
    key: "soccer_france_ligue_one",
    group: "Soccer",
    title: "Ligue 1 - France",
    description: "French Soccer",
    active: true,
    has_outrights: false,
    country: "France",
    logo: "/images/sports/ligue-1.webp",
  },
  {
    key: "soccer_france_ligue_two",
    group: "Soccer",
    title: "Ligue 2 - France",
    description: "French Soccer",
    active: true,
    has_outrights: false,
    country: "France",
    logo: "/images/sports/ligue-1.webp",
  },
  {
    key: "soccer_germany_bundesliga",
    group: "Soccer",
    title: "Bundesliga - Germany",
    description: "German Soccer",
    active: true,
    has_outrights: false,
    country: "Germany",
    logo: "/images/sports/bundesliga.webp",
  },
  {
    key: "soccer_germany_bundesliga2",
    group: "Soccer",
    title: "Bundesliga 2 - Germany",
    description: "German Soccer",
    active: true,
    has_outrights: false,
    country: "Germany",
    logo: "/images/sports/bundesliga.webp",
  },
  {
    key: "soccer_germany_dfb_pokal",
    group: "Soccer",
    title: "DFB-Pokal",
    description: "German Soccer",
    active: true,
    has_outrights: false,
    country: "Germany",
  },
  {
    key: "soccer_germany_liga3",
    group: "Soccer",
    title: "3. Liga - Germany",
    description: "German Soccer",
    active: true,
    has_outrights: false,
    country: "Germany",
  },
  {
    key: "soccer_greece_super_league",
    group: "Soccer",
    title: "Super League - Greece",
    description: "Greek Soccer",
    active: true,
    has_outrights: false,
    country: "Greece",
  },
  {
    key: "soccer_italy_serie_a",
    group: "Soccer",
    title: "Serie A - Italy",
    description: "Italian Soccer",
    active: true,
    has_outrights: false,
    country: "Italy",
    logo: "/images/sports/serie-a.webp",
  },
  {
    key: "soccer_italy_serie_b",
    group: "Soccer",
    title: "Serie B - Italy",
    description: "Italian Soccer",
    active: true,
    has_outrights: false,
    country: "Italy",
    logo: "/images/sports/serie-a.webp",
  },
  {
    key: "soccer_japan_j_league",
    group: "Soccer",
    title: "J League",
    description: "Japan Soccer League",
    active: true,
    has_outrights: false,
    country: "Japan",
  },
  {
    key: "soccer_league_of_ireland",
    group: "Soccer",
    title: "League of Ireland",
    description: "Airtricity League Premier Division",
    active: true,
    has_outrights: false,
    country: "Ireland",
  },
  {
    key: "soccer_mexico_ligamx",
    group: "Soccer",
    title: "Liga MX",
    description: "Mexican Soccer",
    active: true,
    has_outrights: false,
    country: "Mexico",
  },
  {
    key: "soccer_netherlands_eredivisie",
    group: "Soccer",
    title: "Dutch Eredivisie",
    description: "Dutch Soccer",
    active: true,
    has_outrights: false,
    country: "Netherlands",
  },
  {
    key: "soccer_norway_eliteserien",
    group: "Soccer",
    title: "Eliteserien - Norway",
    description: "Norwegian Soccer",
    active: true,
    has_outrights: false,
    country: "Norway",
  },
  {
    key: "soccer_poland_ekstraklasa",
    group: "Soccer",
    title: "Ekstraklasa - Poland",
    description: "Polish Soccer",
    active: true,
    has_outrights: false,
    country: "Poland",
  },
  {
    key: "soccer_portugal_primeira_liga",
    group: "Soccer",
    title: "Primeira Liga - Portugal",
    description: "Portugese Soccer",
    active: true,
    has_outrights: false,
    country: "Portugal",
  },
  {
    key: "soccer_russia_premier_league",
    group: "Soccer",
    title: "Premier League - Russia",
    description: "Russian Soccer",
    active: true,
    has_outrights: false,
    country: "Russia",
  },
  {
    key: "soccer_saudi_arabia_pro_league",
    group: "Soccer",
    title: "Saudi Pro League",
    description: "Saudi Soccer",
    active: true,
    has_outrights: false,
    country: "Saudi Arabia",
  },
  {
    key: "soccer_spain_la_liga",
    group: "Soccer",
    title: "La Liga - Spain",
    description: "Spanish Soccer",
    active: true,
    has_outrights: false,
    country: "Spain",
    logo: "/images/sports/la-liga.webp",
  },
  {
    key: "soccer_spain_segunda_division",
    group: "Soccer",
    title: "La Liga 2 - Spain",
    description: "Spanish Soccer",
    active: true,
    has_outrights: false,
    country: "Spain",
  },
  {
    key: "soccer_spl",
    group: "Soccer",
    title: "Premiership - Scotland",
    description: "Scottish Premiership",
    active: true,
    has_outrights: false,
    country: "Scotland",
  },
  {
    key: "soccer_sweden_allsvenskan",
    group: "Soccer",
    title: "Allsvenskan - Sweden",
    description: "Swedish Soccer",
    active: true,
    has_outrights: false,
    country: "Sweden",
  },
  {
    key: "soccer_sweden_superettan",
    group: "Soccer",
    title: "Superettan - Sweden",
    description: "Swedish Soccer",
    active: true,
    has_outrights: false,
    country: "Sweden",
  },
  {
    key: "soccer_switzerland_superleague",
    group: "Soccer",
    title: "Swiss Superleague",
    description: "Swiss Soccer",
    active: true,
    has_outrights: false,
    country: "Switzerland",
  },
  {
    key: "soccer_turkey_super_league",
    group: "Soccer",
    title: "Turkey Super League",
    description: "Turkish Soccer",
    active: true,
    has_outrights: false,
    country: "Turkey",
  },
  {
    key: "soccer_uefa_champs_league",
    group: "Soccer",
    title: "UEFA Champions League",
    description: "European Champions League",
    active: true,
    has_outrights: false,
    country: "International",
    logo: "/images/sports/uefa-champions-league.webp",
  },
  {
    key: "soccer_uefa_champs_league_women",
    group: "Soccer",
    title: "UEFA Champions League Women",
    description: "European Champions League Women",
    active: true,
    has_outrights: false,
    country: "International",
    logo: "/images/sports/uefa-champions-league.webp",
  },
  {
    key: "soccer_uefa_europa_league",
    group: "Soccer",
    title: "UEFA Europa League",
    description: "European Europa League",
    active: true,
    has_outrights: false,
    country: "International",
    logo: "/images/sports/uefa-europa-league.webp",
  },
  {
    key: "soccer_uefa_nations_league",
    group: "Soccer",
    title: "UEFA Nations League",
    description: "UEFA Nations League",
    active: true,
    has_outrights: false,
    country: "International",
    logo: "/images/sports/uefa-nations-league.webp",
  },
  {
    key: "soccer_usa_mls",
    group: "Soccer",
    title: "MLS",
    description: "Major League Soccer",
    active: true,
    has_outrights: false,
    country: "USA",
    logo: "/images/sports/mls.webp",
  },
  {
    key: "soccer_uefa_europa_conference_league",
    group: "Soccer",
    title: "UEFA Europa Conference League",
    description: "European Conference League",
    active: true,
    has_outrights: false,
    country: "International",
    logo: "/images/sports/uefa-europa-conference-league.webp",
  },
  {
    key: "soccer_epl_winner",
    group: "Soccer",
    title: "Premier League Winner 2026/27",
    description: "English Premier League Outright",
    active: true,
    has_outrights: true,
    country: "England",
    logo: "/images/sports/premier-league.webp",
  },
  {
    key: "soccer_uefa_champions_league_winner",
    group: "Soccer",
    title: "UEFA Champions League Winner",
    description: "Champions League Outright",
    active: true,
    has_outrights: true,
    country: "International",
    logo: "/images/sports/uefa-champions-league.webp",
  },
  {
    key: "soccer_germany_bundesliga_winner",
    group: "Soccer",
    title: "Bundesliga Winner",
    description: "Bundesliga Outright",
    active: true,
    has_outrights: true,
    country: "Germany",
    logo: "/images/sports/bundesliga.webp",
  },
  {
    key: "soccer_italy_serie_a_winner",
    group: "Soccer",
    title: "Serie A Winner",
    description: "Serie A Outright",
    active: true,
    has_outrights: true,
    country: "Italy",
    logo: "/images/sports/serie-a.webp",
  },
  {
    key: "soccer_spain_la_liga_winner",
    group: "Soccer",
    title: "La Liga Winner",
    description: "La Liga Outright",
    active: true,
    has_outrights: true,
    country: "Spain",
    logo: "/images/sports/la-liga.webp",
  },
  {
    key: "baseball_kbo",
    group: "Baseball",
    title: "KBO",
    description: "KBO League",
    active: true,
    has_outrights: false,
    country: "South Korea",
  },
  {
    key: "baseball_mlb",
    group: "Baseball",
    title: "MLB",
    description: "Major League Baseball",
    active: true,
    has_outrights: false,
    country: "USA",
    logo: "/images/sports/mlb.webp",
  },
  {
    key: "baseball_mlb_world_series_winner",
    group: "Baseball",
    title: "MLB World Series Winner",
    description: "World Series Winner 2026",
    active: true,
    has_outrights: true,
    country: "USA",
    logo: "/images/sports/mlb.webp",
  },
  {
    key: "baseball_npb",
    group: "Baseball",
    title: "NPB",
    description: "Nippon Professional Baseball",
    active: true,
    has_outrights: false,
    country: "Japan",
    logo: "/images/sports/npb.webp",
  },
  {
    key: "tennis_atp_wimbledon",
    group: "Tennis",
    title: "ATP Wimbledon",
    description: "Grand Slam Championships",
    active: true,
    has_outrights: false,
    country: "England",
    logo: "/images/sports/wimbledon.webp",
  },
  {
    key: "tennis_atp_aus_open",
    group: "Tennis",
    title: "ATP Australian Open",
    description: "Grand Slam Tournament",
    active: true,
    has_outrights: false,
    country: "Australia",
    logo: "/images/sports/australian-open.webp",
  },
  {
    key: "tennis_wta_us_open",
    group: "Tennis",
    title: "WTA US Open",
    description: "Grand Slam Tournament",
    active: true,
    has_outrights: false,
    country: "USA",
    logo: "/images/sports/us-open.webp",
  },
  {
    key: "tennis_atp_roland_garros",
    group: "Tennis",
    title: "ATP French Open",
    description: "Roland Garros Grand Slam",
    active: true,
    has_outrights: false,
    country: "France",
    logo: "/images/sports/roland-garros.webp",
  },
  {
    key: "tennis_atp_1000_shanghai_masters_singles",
    group: "Tennis",
    title: "ATP 1000 China Shanghai Masters Men Singles",
    description: "ATP 1000 Men Singles",
    active: true,
    has_outrights: false,
    country: "China",
    logo: "/images/sports/atp.webp",
  },
  {
    key: "tennis_atp_1000_shanghai_masters_doubles",
    group: "Tennis",
    title: "ATP 1000 China Shanghai Masters Men Doubles",
    description: "ATP 1000 Men Doubles",
    active: true,
    has_outrights: false,
    country: "China",
    logo: "/images/sports/atp.webp",
  },
  {
    key: "tennis_atp_bolivia_santa_cruz_2_challenger_singles",
    group: "Tennis",
    title: "ATP Bolivia Santa Cruz 2 Challenger Men Singles",
    description: "Challenger Men Singles",
    active: true,
    has_outrights: false,
    country: "Bolivia",
    logo: "/images/sports/atp.webp",
  },
  {
    key: "tennis_atp_bolivia_santa_cruz_2_challenger_doubles",
    group: "Tennis",
    title: "ATP Bolivia Santa Cruz 2 Challenger Men Doubles",
    description: "Challenger Men Doubles",
    active: true,
    has_outrights: false,
    country: "Bolivia",
    logo: "/images/sports/atp.webp",
  },
  {
    key: "tennis_atp_china_jinan_challenger_singles",
    group: "Tennis",
    title: "ATP China Jinan Challenger Men Singles",
    description: "Challenger Men Singles",
    active: true,
    has_outrights: false,
    country: "China",
    logo: "/images/sports/atp.webp",
  },
  {
    key: "tennis_wta_125_spain",
    group: "Tennis",
    title: "WTA 125 Spain",
    description: "WTA 125 Women Singles",
    active: true,
    has_outrights: false,
    country: "Spain",
    logo: "/images/sports/wta.webp",
  },
  {
    key: "tennis_wta_wuhan_open_singles",
    group: "Tennis",
    title: "WTA Wuhan Open Women Singles",
    description: "WTA 1000 Women Singles",
    active: true,
    has_outrights: false,
    country: "China",
    logo: "/images/sports/wta.webp",
  },
  {
    key: "tennis_wta_us_open_singles",
    group: "Tennis",
    title: "WTA US Open Women Singles",
    description: "Grand Slam Women Singles",
    active: true,
    has_outrights: false,
    country: "USA",
    logo: "/images/sports/us-open.webp",
  },
  {
    key: "tennis_wta_beijing_china_open",
    group: "Tennis",
    title: "WTA 1000 China Beijing Open Women Singles",
    description: "WTA 1000 Women Singles",
    active: true,
    has_outrights: false,
    country: "China",
    logo: "/images/sports/wta.webp",
  },
  {
    key: "tennis_utr_pro_series_men_singles",
    group: "Tennis",
    title: "UTR Pro Tennis Series Men Singles",
    description: "UTR Pro Series",
    active: true,
    has_outrights: false,
    country: "USA",
    logo: "/images/sports/utr.webp",
  },
  {
    key: "tennis_utr_pro_series_women_singles",
    group: "Tennis",
    title: "UTR Pro Tennis Series Women Singles",
    description: "UTR Pro Series",
    active: true,
    has_outrights: false,
    country: "USA",
    logo: "/images/sports/utr.webp",
  },
  {
    key: "tennis_utr_newport_beach_singles",
    group: "Tennis",
    title: "UTR Newport Beach Men Singles",
    description: "UTR Newport Beach",
    active: true,
    has_outrights: false,
    country: "USA",
    logo: "/images/sports/utr.webp",
  },
  {
    key: "tennis_utr_barcelona_singles",
    group: "Tennis",
    title: "UTR Barcelona Men Singles",
    description: "UTR Barcelona",
    active: true,
    has_outrights: false,
    country: "Spain",
    logo: "/images/sports/utr.webp",
  },
  {
    key: "tennis_atp_wimbledon_winner",
    group: "Tennis",
    title: "ATP Wimbledon Winner 2026",
    description: "Grand Slam Championships Outright",
    active: true,
    has_outrights: true,
    country: "England",
    logo: "/images/sports/wimbledon.webp",
  },
  {
    key: "tennis_atp_aus_open_winner",
    group: "Tennis",
    title: "ATP Australian Open Winner 2027",
    description: "Grand Slam Tournament Outright",
    active: true,
    has_outrights: true,
    country: "Australia",
    logo: "/images/sports/australian-open.webp",
  },
  {
    key: "tennis_wta_us_open_winner",
    group: "Tennis",
    title: "WTA US Open Winner 2026",
    description: "Grand Slam Tournament Outright",
    active: true,
    has_outrights: true,
    country: "USA",
    logo: "/images/sports/us-open.webp",
  },
]

export const SAMPLE_MATCH_EVENTS: Record<string, SportsEvent[]> = {
  // Basketball NBA
  basketball_nba: [
    {
      id: 'nba_game_1',
      sport_key: 'basketball_nba',
      sport_title: 'NBA',
      commence_time: hoursFromNow(2.5),
      home_team: 'Boston Celtics',
      away_team: 'Los Angeles Lakers',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Boston Celtics', price: 1.68 },
                { name: 'Los Angeles Lakers', price: 2.25 },
              ],
            },
            {
              key: 'spreads',
              outcomes: [
                { name: 'Boston Celtics', price: 1.91, point: -4.5 },
                { name: 'Los Angeles Lakers', price: 1.91, point: 4.5 },
              ],
            },
            {
              key: 'totals',
              outcomes: [
                { name: 'Over', price: 1.90, point: 226.5 },
                { name: 'Under', price: 1.90, point: 226.5 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'nba_game_2',
      sport_key: 'basketball_nba',
      sport_title: 'NBA',
      commence_time: hoursFromNow(5),
      home_team: 'Golden State Warriors',
      away_team: 'Denver Nuggets',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Golden State Warriors', price: 2.10 },
                { name: 'Denver Nuggets', price: 1.78 },
              ],
            },
            {
              key: 'spreads',
              outcomes: [
                { name: 'Golden State Warriors', price: 1.91, point: 2.5 },
                { name: 'Denver Nuggets', price: 1.91, point: -2.5 },
              ],
            },
            {
              key: 'totals',
              outcomes: [
                { name: 'Over', price: 1.90, point: 228.0 },
                { name: 'Under', price: 1.90, point: 228.0 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'nba_game_3',
      sport_key: 'basketball_nba',
      sport_title: 'NBA',
      commence_time: hoursFromNow(23),
      home_team: 'Dallas Mavericks',
      away_team: 'Phoenix Suns',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Dallas Mavericks', price: 1.82 },
                { name: 'Phoenix Suns', price: 2.05 },
              ],
            },
            {
              key: 'spreads',
              outcomes: [
                { name: 'Dallas Mavericks', price: 1.91, point: -2.0 },
                { name: 'Phoenix Suns', price: 1.91, point: 2.0 },
              ],
            },
            {
              key: 'totals',
              outcomes: [
                { name: 'Over', price: 1.88, point: 224.5 },
                { name: 'Under', price: 1.92, point: 224.5 },
              ],
            },
          ],
        },
      ],
    },
  ],

  // Basketball EuroLeague
  basketball_euroleague: [
    {
      id: 'euro_game_1',
      sport_key: 'basketball_euroleague',
      sport_title: 'EuroLeague',
      commence_time: hoursFromNow(4),
      home_team: 'Real Madrid Baloncesto',
      away_team: 'Panathinaikos BC',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Real Madrid Baloncesto', price: 1.72 },
                { name: 'Panathinaikos BC', price: 2.15 },
              ],
            },
            {
              key: 'spreads',
              outcomes: [
                { name: 'Real Madrid Baloncesto', price: 1.90, point: -3.5 },
                { name: 'Panathinaikos BC', price: 1.90, point: 3.5 },
              ],
            },
            {
              key: 'totals',
              outcomes: [
                { name: 'Over', price: 1.90, point: 165.5 },
                { name: 'Under', price: 1.90, point: 165.5 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'euro_game_2',
      sport_key: 'basketball_euroleague',
      sport_title: 'EuroLeague',
      commence_time: hoursFromNow(6.5),
      home_team: 'FC Barcelona Basquet',
      away_team: 'Olympiacos BC',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'FC Barcelona Basquet', price: 1.85 },
                { name: 'Olympiacos BC', price: 1.98 },
              ],
            },
            {
              key: 'spreads',
              outcomes: [
                { name: 'FC Barcelona Basquet', price: 1.91, point: -1.5 },
                { name: 'Olympiacos BC', price: 1.91, point: 1.5 },
              ],
            },
            {
              key: 'totals',
              outcomes: [
                { name: 'Over', price: 1.89, point: 162.0 },
                { name: 'Under', price: 1.89, point: 162.0 },
              ],
            },
          ],
        },
      ],
    },
  ],

  // Basketball NCAAB
  basketball_ncaab: [
    {
      id: 'ncaab_game_1',
      sport_key: 'basketball_ncaab',
      sport_title: "NCAA Men's Basketball",
      commence_time: hoursFromNow(8),
      home_team: 'Duke Blue Devils',
      away_team: 'North Carolina Tar Heels',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Duke Blue Devils', price: 1.65 },
                { name: 'North Carolina Tar Heels', price: 2.30 },
              ],
            },
            {
              key: 'spreads',
              outcomes: [
                { name: 'Duke Blue Devils', price: 1.91, point: -5.0 },
                { name: 'North Carolina Tar Heels', price: 1.91, point: 5.0 },
              ],
            },
            {
              key: 'totals',
              outcomes: [
                { name: 'Over', price: 1.90, point: 154.5 },
                { name: 'Under', price: 1.90, point: 154.5 },
              ],
            },
          ],
        },
      ],
    },
  ],

  // Soccer Premier League
  soccer_epl: [
    {
      id: 'epl_game_1',
      sport_key: 'soccer_epl',
      sport_title: 'Premier League',
      commence_time: hoursFromNow(1.5),
      home_team: 'Arsenal',
      away_team: 'Chelsea',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Arsenal', price: 1.85 },
                { name: 'Draw', price: 3.60 },
                { name: 'Chelsea', price: 4.20 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'epl_game_2',
      sport_key: 'soccer_epl',
      sport_title: 'Premier League',
      commence_time: hoursFromNow(4),
      home_team: 'Manchester City',
      away_team: 'Liverpool',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Manchester City', price: 2.10 },
                { name: 'Draw', price: 3.50 },
                { name: 'Liverpool', price: 3.30 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'epl_game_3',
      sport_key: 'soccer_epl',
      sport_title: 'Premier League',
      commence_time: hoursFromNow(26),
      home_team: 'Manchester United',
      away_team: 'Tottenham Hotspur',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Manchester United', price: 2.45 },
                { name: 'Draw', price: 3.40 },
                { name: 'Tottenham Hotspur', price: 2.85 },
              ],
            },
          ],
        },
      ],
    },
  ],

  // Soccer UEFA Champions League
  soccer_uefa_champions_league: [
    {
      id: 'ucl_game_1',
      sport_key: 'soccer_uefa_champions_league',
      sport_title: 'UEFA Champions League',
      commence_time: hoursFromNow(3),
      home_team: 'Real Madrid',
      away_team: 'Bayern Munich',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Real Madrid', price: 2.25 },
                { name: 'Draw', price: 3.50 },
                { name: 'Bayern Munich', price: 3.10 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'ucl_game_2',
      sport_key: 'soccer_uefa_champions_league',
      sport_title: 'UEFA Champions League',
      commence_time: hoursFromNow(7),
      home_team: 'Paris Saint-Germain',
      away_team: 'Inter Milan',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Paris Saint-Germain', price: 2.05 },
                { name: 'Draw', price: 3.45 },
                { name: 'Inter Milan', price: 3.55 },
              ],
            },
          ],
        },
      ],
    },
  ],

  // Soccer Bundesliga
  soccer_germany_bundesliga: [
    {
      id: 'bdes_game_1',
      sport_key: 'soccer_germany_bundesliga',
      sport_title: 'Bundesliga',
      commence_time: hoursFromNow(4.5),
      home_team: 'Bayer Leverkusen',
      away_team: 'Borussia Dortmund',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Bayer Leverkusen', price: 1.95 },
                { name: 'Draw', price: 3.75 },
                { name: 'Borussia Dortmund', price: 3.70 },
              ],
            },
          ],
        },
      ],
    },
  ],

  // Soccer Serie A
  soccer_italy_serie_a: [
    {
      id: 'seriea_game_1',
      sport_key: 'soccer_italy_serie_a',
      sport_title: 'Serie A',
      commence_time: hoursFromNow(5.5),
      home_team: 'Inter Milan',
      away_team: 'AC Milan',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Inter Milan', price: 2.15 },
                { name: 'Draw', price: 3.30 },
                { name: 'AC Milan', price: 3.45 },
              ],
            },
          ],
        },
      ],
    },
  ],

  // Soccer La Liga
  soccer_spain_la_liga: [
    {
      id: 'laliga_game_1',
      sport_key: 'soccer_spain_la_liga',
      sport_title: 'La Liga',
      commence_time: hoursFromNow(6),
      home_team: 'Barcelona',
      away_team: 'Atletico Madrid',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Barcelona', price: 1.90 },
                { name: 'Draw', price: 3.60 },
                { name: 'Atletico Madrid', price: 3.90 },
              ],
            },
          ],
        },
      ],
    },
  ],

  // UEFA Champions League (API key alias)
  soccer_uefa_champs_league: [
    {
      id: 'ucl_game_1',
      sport_key: 'soccer_uefa_champs_league',
      sport_title: 'UEFA Champions League',
      commence_time: hoursFromNow(3),
      home_team: 'Real Madrid',
      away_team: 'Bayern Munich',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Real Madrid', price: 2.25 },
                { name: 'Draw', price: 3.50 },
                { name: 'Bayern Munich', price: 3.10 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'ucl_game_2',
      sport_key: 'soccer_uefa_champs_league',
      sport_title: 'UEFA Champions League',
      commence_time: hoursFromNow(7),
      home_team: 'Paris Saint-Germain',
      away_team: 'Inter Milan',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Paris Saint-Germain', price: 2.05 },
                { name: 'Draw', price: 3.45 },
                { name: 'Inter Milan', price: 3.55 },
              ],
            },
          ],
        },
      ],
    },
  ],

  // Soccer UEFA Europa League
  soccer_uefa_europa_league: [
    {
      id: 'uel_game_1',
      sport_key: 'soccer_uefa_europa_league',
      sport_title: 'UEFA Europa League',
      commence_time: hoursFromNow(4),
      home_team: 'Roma',
      away_team: 'Athletic Bilbao',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Roma', price: 2.10 },
                { name: 'Draw', price: 3.30 },
                { name: 'Athletic Bilbao', price: 3.50 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'uel_game_2',
      sport_key: 'soccer_uefa_europa_league',
      sport_title: 'UEFA Europa League',
      commence_time: hoursFromNow(6.5),
      home_team: 'Tottenham Hotspur',
      away_team: 'Qarabag FK',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Tottenham Hotspur', price: 1.25 },
                { name: 'Draw', price: 6.00 },
                { name: 'Qarabag FK', price: 10.50 },
              ],
            },
          ],
        },
      ],
    },
  ],

  // Soccer UEFA Europa Conference League
  soccer_uefa_europa_conference_league: [
    {
      id: 'uecl_game_1',
      sport_key: 'soccer_uefa_europa_conference_league',
      sport_title: 'UEFA Europa Conference League',
      commence_time: hoursFromNow(5),
      home_team: 'Chelsea',
      away_team: 'Gent',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Chelsea', price: 1.30 },
                { name: 'Draw', price: 5.50 },
                { name: 'Gent', price: 9.00 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'uecl_game_2',
      sport_key: 'soccer_uefa_europa_conference_league',
      sport_title: 'UEFA Europa Conference League',
      commence_time: hoursFromNow(8),
      home_team: 'Fiorentina',
      away_team: 'The New Saints',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Fiorentina', price: 1.15 },
                { name: 'Draw', price: 7.50 },
                { name: 'The New Saints', price: 16.00 },
              ],
            },
          ],
        },
      ],
    },
  ],

  // Soccer UEFA Nations League
  soccer_uefa_nations_league: [
    {
      id: 'unl_game_1',
      sport_key: 'soccer_uefa_nations_league',
      sport_title: 'UEFA Nations League',
      commence_time: hoursFromNow(3.5),
      home_team: 'Spain',
      away_team: 'Denmark',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Spain', price: 1.45 },
                { name: 'Draw', price: 4.50 },
                { name: 'Denmark', price: 7.00 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'unl_game_2',
      sport_key: 'soccer_uefa_nations_league',
      sport_title: 'UEFA Nations League',
      commence_time: hoursFromNow(7),
      home_team: 'France',
      away_team: 'Belgium',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'France', price: 1.80 },
                { name: 'Draw', price: 3.60 },
                { name: 'Belgium', price: 4.40 },
              ],
            },
          ],
        },
      ],
    },
  ],

  // Soccer CONMEBOL Libertadores
  soccer_conmebol_copa_libertadores: [
    {
      id: 'copa_lib_1',
      sport_key: 'soccer_conmebol_copa_libertadores',
      sport_title: 'Copa Libertadores',
      commence_time: hoursFromNow(5.5),
      home_team: 'River Plate',
      away_team: 'Atletico Mineiro',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'River Plate', price: 1.95 },
                { name: 'Draw', price: 3.25 },
                { name: 'Atletico Mineiro', price: 4.00 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'copa_lib_2',
      sport_key: 'soccer_conmebol_copa_libertadores',
      sport_title: 'Copa Libertadores',
      commence_time: hoursFromNow(9),
      home_team: 'Botafogo',
      away_team: 'Penarol',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Botafogo', price: 1.55 },
                { name: 'Draw', price: 3.80 },
                { name: 'Penarol', price: 6.50 },
              ],
            },
          ],
        },
      ],
    },
  ],

  // Soccer MLS
  soccer_usa_mls: [
    {
      id: 'mls_game_1',
      sport_key: 'soccer_usa_mls',
      sport_title: 'MLS',
      commence_time: hoursFromNow(4.5),
      home_team: 'Inter Miami CF',
      away_team: 'Atlanta United',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Inter Miami CF', price: 1.50 },
                { name: 'Draw', price: 4.50 },
                { name: 'Atlanta United', price: 5.50 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'mls_game_2',
      sport_key: 'soccer_usa_mls',
      sport_title: 'MLS',
      commence_time: hoursFromNow(8),
      home_team: 'Los Angeles FC',
      away_team: 'LA Galaxy',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Los Angeles FC', price: 1.90 },
                { name: 'Draw', price: 3.75 },
                { name: 'LA Galaxy', price: 3.60 },
              ],
            },
          ],
        },
      ],
    },
  ],

  // Baseball MLB
  baseball_mlb: [
    {
      id: 'mlb_game_1',
      sport_key: 'baseball_mlb',
      sport_title: 'MLB',
      commence_time: hoursFromNow(3.5),
      home_team: 'Los Angeles Dodgers',
      away_team: 'New York Yankees',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Los Angeles Dodgers', price: 1.74 },
                { name: 'New York Yankees', price: 2.15 },
              ],
            },
            {
              key: 'spreads',
              outcomes: [
                { name: 'Los Angeles Dodgers', price: 2.10, point: -1.5 },
                { name: 'New York Yankees', price: 1.75, point: 1.5 },
              ],
            },
            {
              key: 'totals',
              outcomes: [
                { name: 'Over', price: 1.91, point: 8.5 },
                { name: 'Under', price: 1.91, point: 8.5 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'mlb_game_2',
      sport_key: 'baseball_mlb',
      sport_title: 'MLB',
      commence_time: hoursFromNow(6),
      home_team: 'Philadelphia Phillies',
      away_team: 'Houston Astros',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Philadelphia Phillies', price: 1.83 },
                { name: 'Houston Astros', price: 2.00 },
              ],
            },
            {
              key: 'spreads',
              outcomes: [
                { name: 'Philadelphia Phillies', price: 2.20, point: -1.5 },
                { name: 'Houston Astros', price: 1.68, point: 1.5 },
              ],
            },
            {
              key: 'totals',
              outcomes: [
                { name: 'Over', price: 1.95, point: 7.5 },
                { name: 'Under', price: 1.85, point: 7.5 },
              ],
            },
          ],
        },
      ],
    },
  ],

  // Baseball NPB
  baseball_npb: [
    {
      id: 'npb_game_1',
      sport_key: 'baseball_npb',
      sport_title: 'NPB',
      commence_time: hoursFromNow(5),
      home_team: 'Yomiuri Giants',
      away_team: 'Hanshin Tigers',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Yomiuri Giants', price: 1.85 },
                { name: 'Hanshin Tigers', price: 1.95 },
              ],
            },
            {
              key: 'spreads',
              outcomes: [
                { name: 'Yomiuri Giants', price: 2.25, point: -1.5 },
                { name: 'Hanshin Tigers', price: 1.65, point: 1.5 },
              ],
            },
            {
              key: 'totals',
              outcomes: [
                { name: 'Over', price: 1.90, point: 6.5 },
                { name: 'Under', price: 1.90, point: 6.5 },
              ],
            },
          ],
        },
      ],
    },
  ],

  // Tennis Wimbledon
  tennis_atp_wimbledon: [
    {
      id: 'wimb_game_1',
      sport_key: 'tennis_atp_wimbledon',
      sport_title: 'ATP Wimbledon',
      commence_time: hoursFromNow(2),
      home_team: 'Carlos Alcaraz',
      away_team: 'Jannik Sinner',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Carlos Alcaraz', price: 1.78 },
                { name: 'Jannik Sinner', price: 2.05 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'wimb_game_2',
      sport_key: 'tennis_atp_wimbledon',
      sport_title: 'ATP Wimbledon',
      commence_time: hoursFromNow(4.5),
      home_team: 'Novak Djokovic',
      away_team: 'Daniil Medvedev',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Novak Djokovic', price: 1.62 },
                { name: 'Daniil Medvedev', price: 2.30 },
              ],
            },
          ],
        },
      ],
    },
  ],

  // Tennis Australian Open
  tennis_atp_aus_open: [
    {
      id: 'aus_game_1',
      sport_key: 'tennis_atp_aus_open',
      sport_title: 'ATP Australian Open',
      commence_time: hoursFromNow(6),
      home_team: 'Alexander Zverev',
      away_team: 'Stefanos Tsitsipas',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Alexander Zverev', price: 1.75 },
                { name: 'Stefanos Tsitsipas', price: 2.10 },
              ],
            },
          ],
        },
      ],
    },
  ],

  // Tennis WTA US Open
  tennis_wta_us_open: [
    {
      id: 'uswta_game_1',
      sport_key: 'tennis_wta_us_open',
      sport_title: 'WTA US Open',
      commence_time: hoursFromNow(3.5),
      home_team: 'Iga Swiatek',
      away_team: 'Aryna Sabalenka',
      bookmakers: [
        {
          key: 'bybet_bookmaker',
          title: '2Bet Sportsbook',
          markets: [
            {
              key: 'h2h',
              outcomes: [
                { name: 'Iga Swiatek', price: 1.82 },
                { name: 'Aryna Sabalenka', price: 2.00 },
              ],
            },
          ],
        },
      ],
    },
  ],
}

// Live Inplay sample events (with scores and started in past)
export const SAMPLE_INPLAY_EVENTS: SportsEvent[] = [
  {
    id: 'live_nba_1',
    sport_key: 'basketball_nba',
    sport_title: 'NBA',
    commence_time: hoursAgo(1.2),
    home_team: 'Milwaukee Bucks',
    away_team: 'Miami Heat',
    completed: false,
    scores: [
      { name: 'Milwaukee Bucks', score: '84' },
      { name: 'Miami Heat', score: '79' },
    ],
    bookmakers: [
      {
        key: 'bybet_live',
        title: '2Bet Live',
        markets: [
          {
            key: 'h2h',
            outcomes: [
              { name: 'Milwaukee Bucks', price: 1.45 },
              { name: 'Miami Heat', price: 2.70 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'live_nba_2',
    sport_key: 'basketball_nba',
    sport_title: 'NBA',
    commence_time: hoursAgo(0.6),
    home_team: 'Los Angeles Lakers',
    away_team: 'Boston Celtics',
    completed: false,
    scores: [
      { name: 'Los Angeles Lakers', score: '76' },
      { name: 'Boston Celtics', score: '72' },
    ],
    bookmakers: [
      {
        key: 'bybet_live',
        title: '2Bet Live',
        markets: [
          {
            key: 'h2h',
            outcomes: [
              { name: 'Los Angeles Lakers', price: 1.78 },
              { name: 'Boston Celtics', price: 2.10 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'live_nba_3',
    sport_key: 'basketball_nba',
    sport_title: 'NBA',
    commence_time: hoursAgo(1.9),
    home_team: 'Golden State Warriors',
    away_team: 'Denver Nuggets',
    completed: false,
    scores: [
      { name: 'Golden State Warriors', score: '104' },
      { name: 'Denver Nuggets', score: '101' },
    ],
    bookmakers: [
      {
        key: 'bybet_live',
        title: '2Bet Live',
        markets: [
          {
            key: 'h2h',
            outcomes: [
              { name: 'Golden State Warriors', price: 1.62 },
              { name: 'Denver Nuggets', price: 2.35 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'live_soccer_1',
    sport_key: 'soccer_epl',
    sport_title: 'Premier League',
    commence_time: hoursAgo(0.8),
    home_team: 'Manchester City',
    away_team: 'Liverpool',
    completed: false,
    scores: [
      { name: 'Manchester City', score: '2' },
      { name: 'Liverpool', score: '1' },
    ],
    bookmakers: [
      {
        key: 'bybet_live',
        title: '2Bet Live',
        markets: [
          {
            key: 'h2h',
            outcomes: [
              { name: 'Manchester City', price: 1.35 },
              { name: 'Draw', price: 4.80 },
              { name: 'Liverpool', price: 7.50 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'live_tennis_1',
    sport_key: 'tennis_atp_wimbledon',
    sport_title: 'ATP Wimbledon',
    commence_time: hoursAgo(1.5),
    home_team: 'Carlos Alcaraz',
    away_team: 'Jannik Sinner',
    completed: false,
    scores: [
      { name: 'Carlos Alcaraz', score: '2' },
      { name: 'Jannik Sinner', score: '1' },
    ],
    bookmakers: [
      {
        key: 'bybet_live',
        title: '2Bet Live',
        markets: [
          {
            key: 'h2h',
            outcomes: [
              { name: 'Carlos Alcaraz', price: 1.40 },
              { name: 'Jannik Sinner', price: 2.85 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'live_mlb_1',
    sport_key: 'baseball_mlb',
    sport_title: 'MLB',
    commence_time: hoursAgo(2.1),
    home_team: 'Los Angeles Dodgers',
    away_team: 'San Francisco Giants',
    completed: false,
    scores: [
      { name: 'Los Angeles Dodgers', score: '5' },
      { name: 'San Francisco Giants', score: '3' },
    ],
    bookmakers: [
      {
        key: 'bybet_live',
        title: '2Bet Live',
        markets: [
          {
            key: 'h2h',
            outcomes: [
              { name: 'Los Angeles Dodgers', price: 1.28 },
              { name: 'San Francisco Giants', price: 3.60 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'live_mlb_2',
    sport_key: 'baseball_mlb',
    sport_title: 'MLB',
    commence_time: hoursAgo(1.4),
    home_team: 'New York Yankees',
    away_team: 'Boston Red Sox',
    completed: false,
    scores: [
      { name: 'New York Yankees', score: '4' },
      { name: 'Boston Red Sox', score: '2' },
    ],
    bookmakers: [
      {
        key: 'bybet_live',
        title: '2Bet Live',
        markets: [
          {
            key: 'h2h',
            outcomes: [
              { name: 'New York Yankees', price: 1.55 },
              { name: 'Boston Red Sox', price: 2.45 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'live_npb_1',
    sport_key: 'baseball_npb',
    sport_title: 'NPB',
    commence_time: hoursAgo(0.7),
    home_team: 'Yomiuri Giants',
    away_team: 'Hanshin Tigers',
    completed: false,
    scores: [
      { name: 'Yomiuri Giants', score: '3' },
      { name: 'Hanshin Tigers', score: '1' },
    ],
    bookmakers: [
      {
        key: 'bybet_live',
        title: '2Bet Live',
        markets: [
          {
            key: 'h2h',
            outcomes: [
              { name: 'Yomiuri Giants', price: 1.70 },
              { name: 'Hanshin Tigers', price: 2.15 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'live_euro_1',
    sport_key: 'basketball_euroleague',
    sport_title: 'EuroLeague',
    commence_time: hoursAgo(1.1),
    home_team: 'Real Madrid Baloncesto',
    away_team: 'Panathinaikos BC',
    completed: false,
    scores: [
      { name: 'Real Madrid Baloncesto', score: '68' },
      { name: 'Panathinaikos BC', score: '65' },
    ],
    bookmakers: [
      {
        key: 'bybet_live',
        title: '2Bet Live',
        markets: [
          {
            key: 'h2h',
            outcomes: [
              { name: 'Real Madrid Baloncesto', price: 1.50 },
              { name: 'Panathinaikos BC', price: 2.60 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'live_pba_1',
    sport_key: 'basketball_pba',
    sport_title: 'PBA',
    commence_time: hoursAgo(1.8),
    home_team: 'San Miguel Beermen',
    away_team: 'Barangay Ginebra',
    completed: false,
    scores: [
      { name: 'San Miguel Beermen', score: '88' },
      { name: 'Barangay Ginebra', score: '82' },
    ],
    bookmakers: [
      {
        key: 'bybet_live',
        title: '2Bet Live',
        markets: [
          {
            key: 'h2h',
            outcomes: [
              { name: 'San Miguel Beermen', price: 1.65 },
              { name: 'Barangay Ginebra', price: 2.25 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'live_soccer_laliga',
    sport_key: 'soccer_spain_la_liga',
    sport_title: 'La Liga',
    commence_time: hoursAgo(0.5),
    home_team: 'Real Madrid',
    away_team: 'Barcelona',
    completed: false,
    scores: [
      { name: 'Real Madrid', score: '2' },
      { name: 'Barcelona', score: '1' },
    ],
    bookmakers: [
      {
        key: 'bybet_live',
        title: '2Bet Live',
        markets: [
          {
            key: 'h2h',
            outcomes: [
              { name: 'Real Madrid', price: 1.85 },
              { name: 'Draw', price: 3.50 },
              { name: 'Barcelona', price: 3.90 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'live_soccer_bundesliga',
    sport_key: 'soccer_germany_bundesliga',
    sport_title: 'Bundesliga',
    commence_time: hoursAgo(1.1),
    home_team: 'Bayern Munich',
    away_team: 'Borussia Dortmund',
    completed: false,
    scores: [
      { name: 'Bayern Munich', score: '3' },
      { name: 'Borussia Dortmund', score: '2' },
    ],
    bookmakers: [
      {
        key: 'bybet_live',
        title: '2Bet Live',
        markets: [
          {
            key: 'h2h',
            outcomes: [
              { name: 'Bayern Munich', price: 1.30 },
              { name: 'Draw', price: 5.00 },
              { name: 'Borussia Dortmund', price: 8.50 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'live_tennis_wta',
    sport_key: 'tennis_wta_wuhan_open_singles',
    sport_title: 'WTA Wuhan Open',
    commence_time: hoursAgo(0.9),
    home_team: 'Aryna Sabalenka',
    away_team: 'Iga Swiatek',
    completed: false,
    scores: [
      { name: 'Aryna Sabalenka', score: '1' },
      { name: 'Iga Swiatek', score: '1' },
    ],
    bookmakers: [
      {
        key: 'bybet_live',
        title: '2Bet Live',
        markets: [
          {
            key: 'h2h',
            outcomes: [
              { name: 'Aryna Sabalenka', price: 1.95 },
              { name: 'Iga Swiatek', price: 1.85 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'live_tennis_atp_shanghai',
    sport_key: 'tennis_atp_1000_shanghai_masters_singles',
    sport_title: 'ATP Shanghai Masters',
    commence_time: hoursAgo(1.3),
    home_team: 'Novak Djokovic',
    away_team: 'Daniil Medvedev',
    completed: false,
    scores: [
      { name: 'Novak Djokovic', score: '1' },
      { name: 'Daniil Medvedev', score: '0' },
    ],
    bookmakers: [
      {
        key: 'bybet_live',
        title: '2Bet Live',
        markets: [
          {
            key: 'h2h',
            outcomes: [
              { name: 'Novak Djokovic', price: 1.48 },
              { name: 'Daniil Medvedev', price: 2.65 },
            ],
          },
        ],
      },
    ],
  },
]

// Outrights sample data
export const SAMPLE_OUTRIGHT_EVENTS: Record<string, SportsEvent[]> = {
  basketball_nba: [
    {
      id: 'outright_nba',
      sport_key: 'basketball_nba',
      sport_title: 'NBA Championship 2026/27',
      commence_time: hoursFromNow(2000),
      home_team: null,
      away_team: null,
      bookmakers: [
        {
          key: 'bybet_outright',
          title: '2Bet Futures',
          markets: [
            {
              key: 'outrights',
              outcomes: [
                { name: 'Boston Celtics', price: 3.50 },
                { name: 'Denver Nuggets', price: 5.25 },
                { name: 'Oklahoma City Thunder', price: 6.50 },
                { name: 'Minnesota Timberwolves', price: 9.00 },
                { name: 'Dallas Mavericks', price: 10.50 },
                { name: 'New York Knicks', price: 12.00 },
                { name: 'Milwaukee Bucks', price: 14.00 },
                { name: 'Philadelphia 76ers', price: 16.00 },
              ],
            },
          ],
        },
      ],
    },
  ],

  basketball_euroleague: [
    {
      id: 'outright_euroleague',
      sport_key: 'basketball_euroleague',
      sport_title: 'EuroLeague Winner 2026/27',
      commence_time: hoursFromNow(2100),
      home_team: null,
      away_team: null,
      bookmakers: [
        {
          key: 'bybet_outright',
          title: '2Bet Futures',
          markets: [
            {
              key: 'outrights',
              outcomes: [
                { name: 'Real Madrid Baloncesto', price: 3.20 },
                { name: 'Panathinaikos BC', price: 4.00 },
                { name: 'Olympiacos BC', price: 4.75 },
                { name: 'FC Barcelona Basquet', price: 6.00 },
                { name: 'Fenerbahce Beko', price: 7.50 },
                { name: 'AS Monaco', price: 9.00 },
              ],
            },
          ],
        },
      ],
    },
  ],

  soccer_epl: [
    {
      id: 'outright_epl',
      sport_key: 'soccer_epl',
      sport_title: 'Premier League Winner 2026/27',
      commence_time: hoursFromNow(3000),
      home_team: null,
      away_team: null,
      bookmakers: [
        {
          key: 'bybet_outright',
          title: '2Bet Futures',
          markets: [
            {
              key: 'outrights',
              outcomes: [
                { name: 'Manchester City', price: 2.10 },
                { name: 'Arsenal', price: 3.25 },
                { name: 'Liverpool', price: 4.50 },
                { name: 'Chelsea', price: 15.00 },
                { name: 'Tottenham Hotspur', price: 25.00 },
                { name: 'Aston Villa', price: 35.00 },
                { name: 'Newcastle United', price: 40.00 },
                { name: 'Manchester United', price: 50.00 },
              ],
            },
          ],
        },
      ],
    },
  ],

  soccer_uefa_champions_league: [
    {
      id: 'outright_ucl',
      sport_key: 'soccer_uefa_champions_league',
      sport_title: 'UEFA Champions League Winner 2026/27',
      commence_time: hoursFromNow(2500),
      home_team: null,
      away_team: null,
      bookmakers: [
        {
          key: 'bybet_outright',
          title: '2Bet Futures',
          markets: [
            {
              key: 'outrights',
              outcomes: [
                { name: 'Real Madrid', price: 3.75 },
                { name: 'Manchester City', price: 4.25 },
                { name: 'Bayern Munich', price: 6.50 },
                { name: 'Arsenal', price: 8.00 },
                { name: 'Paris Saint-Germain', price: 11.00 },
                { name: 'Barcelona', price: 13.00 },
                { name: 'Inter Milan', price: 15.00 },
                { name: 'Bayer Leverkusen', price: 20.00 },
              ],
            },
          ],
        },
      ],
    },
  ],

  soccer_germany_bundesliga: [
    {
      id: 'outright_bdes',
      sport_key: 'soccer_germany_bundesliga',
      sport_title: 'Bundesliga Winner 2026/27',
      commence_time: hoursFromNow(2800),
      home_team: null,
      away_team: null,
      bookmakers: [
        {
          key: 'bybet_outright',
          title: '2Bet Futures',
          markets: [
            {
              key: 'outrights',
              outcomes: [
                { name: 'Bayern Munich', price: 1.80 },
                { name: 'Bayer Leverkusen', price: 2.85 },
                { name: 'Borussia Dortmund', price: 7.50 },
                { name: 'RB Leipzig', price: 10.00 },
              ],
            },
          ],
        },
      ],
    },
  ],

  soccer_italy_serie_a: [
    {
      id: 'outright_seriea',
      sport_key: 'soccer_italy_serie_a',
      sport_title: 'Serie A Winner 2026/27',
      commence_time: hoursFromNow(2800),
      home_team: null,
      away_team: null,
      bookmakers: [
        {
          key: 'bybet_outright',
          title: '2Bet Futures',
          markets: [
            {
              key: 'outrights',
              outcomes: [
                { name: 'Inter Milan', price: 1.95 },
                { name: 'Juventus', price: 3.50 },
                { name: 'AC Milan', price: 5.50 },
                { name: 'Napoli', price: 8.00 },
              ],
            },
          ],
        },
      ],
    },
  ],

  baseball_mlb: [
    {
      id: 'outright_mlb',
      sport_key: 'baseball_mlb',
      sport_title: 'World Series Winner 2026',
      commence_time: hoursFromNow(1800),
      home_team: null,
      away_team: null,
      bookmakers: [
        {
          key: 'bybet_outright',
          title: '2Bet Futures',
          markets: [
            {
              key: 'outrights',
              outcomes: [
                { name: 'Los Angeles Dodgers', price: 3.50 },
                { name: 'New York Yankees', price: 5.00 },
                { name: 'Philadelphia Phillies', price: 7.50 },
                { name: 'Baltimore Orioles', price: 9.00 },
                { name: 'Atlanta Braves', price: 11.00 },
                { name: 'Houston Astros', price: 13.00 },
              ],
            },
          ],
        },
      ],
    },
  ],

  tennis_atp_wimbledon: [
    {
      id: 'outright_wimb',
      sport_key: 'tennis_atp_wimbledon',
      sport_title: 'Gentlemen\'s Singles Winner 2026',
      commence_time: hoursFromNow(1200),
      home_team: null,
      away_team: null,
      bookmakers: [
        {
          key: 'bybet_outright',
          title: '2Bet Futures',
          markets: [
            {
              key: 'outrights',
              outcomes: [
                { name: 'Carlos Alcaraz', price: 2.50 },
                { name: 'Jannik Sinner', price: 2.85 },
                { name: 'Novak Djokovic', price: 4.20 },
                { name: 'Alexander Zverev', price: 11.00 },
                { name: 'Daniil Medvedev', price: 14.00 },
              ],
            },
          ],
        },
      ],
    },
  ],

  tennis_atp_aus_open: [
    {
      id: 'outright_aus',
      sport_key: 'tennis_atp_aus_open',
      sport_title: 'Men\'s Australian Open Winner 2027',
      commence_time: hoursFromNow(2200),
      home_team: null,
      away_team: null,
      bookmakers: [
        {
          key: 'bybet_outright',
          title: '2Bet Futures',
          markets: [
            {
              key: 'outrights',
              outcomes: [
                { name: 'Jannik Sinner', price: 2.30 },
                { name: 'Carlos Alcaraz', price: 2.90 },
                { name: 'Novak Djokovic', price: 4.50 },
              ],
            },
          ],
        },
      ],
    },
  ],

  tennis_wta_us_open: [
    {
      id: 'outright_uswta',
      sport_key: 'tennis_wta_us_open',
      sport_title: 'Women\'s US Open Winner 2026',
      commence_time: hoursFromNow(1500),
      home_team: null,
      away_team: null,
      bookmakers: [
        {
          key: 'bybet_outright',
          title: '2Bet Futures',
          markets: [
            {
              key: 'outrights',
              outcomes: [
                { name: 'Aryna Sabalenka', price: 3.25 },
                { name: 'Iga Swiatek', price: 3.50 },
                { name: 'Coco Gauff', price: 6.00 },
                { name: 'Elena Rybakina', price: 8.50 },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export interface SportsApiQuery {
  mode?: string
  sport?: string
}

const getOutrightEvents = (sportKey: string): SportsEvent[] => {
  if (SAMPLE_OUTRIGHT_EVENTS[sportKey]) {
    return SAMPLE_OUTRIGHT_EVENTS[sportKey]
  }

  const tournamentKey = Object.keys(SAMPLE_OUTRIGHT_EVENTS)
    .filter(key => sportKey.startsWith(`${key}_`))
    .sort((a, b) => b.length - a.length)[0]

  return tournamentKey ? SAMPLE_OUTRIGHT_EVENTS[tournamentKey] ?? [] : []
}

export function getSampleSportsData(query: SportsApiQuery = {}): { sports: Sport[]; events: SportsEvent[] } {
  const mode = String(query.mode || 'league')
  const sportKey = String(query.sport || '')

  if (mode === 'league') {
    const sports = SAMPLE_SPORTS.filter((sport) => {
      if (!sport.has_outrights) {
        return true
      }

      return getOutrightEvents(sport.key).some((event: SportsEvent) =>
        event.bookmakers?.some(bookmaker =>
          bookmaker.markets.some(market => market.key === 'outrights' && market.outcomes.length > 0),
        ),
      )
    })

    return { sports, events: [] }
  }

  if (mode === 'outright') {
    if (sportKey) {
      return { sports: [], events: getOutrightEvents(sportKey) }
    }
    const allOutrights = Object.values(SAMPLE_OUTRIGHT_EVENTS).flat()
    return { sports: [], events: allOutrights }
  }

  if (mode === 'inplay') {
    if (sportKey) {
      const filtered = SAMPLE_INPLAY_EVENTS.filter(e => e.sport_key === sportKey)
      return { sports: [], events: filtered }
    }
    return { sports: [], events: SAMPLE_INPLAY_EVENTS }
  }

  if (mode === 'league-odds') {
    const events = SAMPLE_MATCH_EVENTS[sportKey] ?? []
    return { sports: [], events: events.slice(0, 2) }
  }

  if (mode === 'upcoming' || mode === 'prematch') {
    if (sportKey) {
      const events = SAMPLE_MATCH_EVENTS[sportKey] ?? []
      return { sports: [], events }
    }
    const allMatches = Object.values(SAMPLE_MATCH_EVENTS).flat()
    return { sports: [], events: allMatches }
  }

  return { sports: [], events: [] }
}
