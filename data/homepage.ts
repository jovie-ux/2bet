import { h, type Component } from 'vue'
import { SLOTS, type SlotGame } from './slots'
import {
  BadgeDollarSign,
  BadgeCent,
  BadgePlus,
  CreditCard,
  Crown,
  Flame,
  Gamepad2,
  Gem,
  Gift,
  Globe,
  Grid2X2,
  Moon,
  NotebookTabs,
  Spade,
  Table2,
  UserRound,
  Volleyball,
} from 'lucide-vue-next'

export interface RailSubItem {
  label: string
  underMaintenance?: boolean
  showFundsModal?: boolean
  icon?: Component
  iconImage?: string
  to: string
  accentColor: string
  external?: boolean
}

export interface RailItem {
  label: string
  icon: Component
  sectionId: string | null
  to?: string
  children?: RailSubItem[]
  control?: 'language' | 'theme'
  defaultExpanded?: boolean
  surface?: boolean
  external?: boolean
}

export interface ReferenceGame {
  id?: string
  title: string
  provider: string
  image: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface GameCategory {
  label: string
  icon: Component
  accentColor: string
  to: string
}

export interface HomepageChannel {
  label: string
  iconImage: string
  to: string
}
const Home: Component = {
  name: 'HomeIcon',
  render: () => h(
    'svg',
    {
      width: 18,
      height: 19,
      viewBox: '0 0 18 19',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      'aria-hidden': 'true',
    },
    [
      h('path', {
        'fill-rule': 'evenodd',
        'clip-rule': 'evenodd',
        d: 'M15.4264 18.3915C16.6029 18.4863 17.6085 17.6139 17.7224 16.4571L17.7034 16.4381V8.18823C17.7034 7.69514 17.4947 7.22101 17.1342 6.8986L10.5689 0.640076C9.6012 -0.213359 8.12117 -0.213359 7.15346 0.640076L0.569242 6.8986C0.208723 7.23997 0 7.69514 0 8.18823V16.4381C0.0948743 17.595 1.11951 18.4674 2.27697 18.3726H5.92011C6.56525 18.4295 7.13449 17.9553 7.19141 17.3105V14.3519C7.22936 13.6123 7.77963 13.0244 8.50067 12.9295C8.57657 12.9106 8.65247 12.8916 8.72836 12.8916C9.62018 12.7968 10.4171 13.4226 10.512 14.314V17.3295C10.5689 17.9553 11.1382 18.4484 11.7833 18.3915H15.4264Z',
        fill: 'currentColor',
      }),
    ],
  ),
}

const SportsIcon: Component = {
  name: 'SportsIcon',
  render: () => h(
    'svg',
    {
      width: 20,
      height: 20,
      viewBox: '0 0 20 20',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      'aria-hidden': 'true',
    },
    [
      h('path', {
        d: 'M10 14V12.2C10 10.98 10.98 10 12.2 10H14.2L14.31 9.65L16.7 8.87L17.99 9.81V10H18.79C19.23 10 19.63 10.13 19.97 10.35C19.97 10.23 19.99 10.12 19.99 10C20 4.48 15.52 0 10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C10.12 20 10.23 19.99 10.35 19.98C10.13 19.64 10 19.23 10 18.8V18C9.15 18 8.31 17.87 7.5 17.6L6.95 15.89L8.33 13.99H10V14ZM11 3.28L12.29 2.34C13.98 2.85 15.45 3.89 16.48 5.32L15.93 7.02L13.69 7.75L11 5.79V3.27V3.28ZM5.39 14.65H3.48C2.55 13.34 2 11.74 2 10.01V9.82L3.29 8.88L5.68 9.66L6.71 12.83L5.39 14.65ZM6.3 7.76L4.06 7.03L3.51 5.33C4.54 3.9 6.02 2.85 7.7 2.34L8.99 3.28V5.8L6.29 7.76H6.3Z',
        fill: 'currentColor',
      }),
      h('path', {
        d: 'M18.2 11H12.8C11.81 11 11 11.81 11 12.8V18.2C11 19.19 11.81 20 12.8 20H18.2C19.19 20 20 19.19 20 18.2V12.8C20 11.81 19.19 11 18.2 11ZM13.78 18V13L18.11 15.5L13.78 18Z',
        fill: 'currentColor',
      }),
    ],
  ),
}

const EntertainIcon: Component = {
  name: 'EntertainIcon',
  render: () => h(
    'svg',
    {
      width: 20,
      height: 20,
      viewBox: '0 0 20 20',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      'aria-hidden': 'true',
      class: 'fill-text-2',
    },
    [
      h('path', {
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        d: 'M15.2233 17.2649C13.4262 17.259 11.8849 16.3768 11.2853 15.1303C11.2554 15.0726 11.2298 15.0198 11.2066 14.9722C11.1025 14.7582 11.0483 14.6467 10.8842 14.6467C10.7301 14.6467 10.7368 14.9702 10.7382 15.0373C10.7383 15.0416 10.7384 15.0449 10.7384 15.0469C10.8842 17.3317 11.7593 18.5157 13.0902 19.5664C13.3455 19.7832 13.1814 20 13.0902 20H6.94622C6.94622 20 6.65451 19.7832 6.94622 19.5664C8.27712 18.5491 9.17047 17.3317 9.29809 15.0469C9.29809 14.9969 9.29809 14.6467 9.15224 14.6467C8.99584 14.6467 8.95032 14.7379 8.85139 14.9363C8.82346 14.9923 8.79128 15.0569 8.75114 15.1303C8.1495 16.3977 6.61805 17.265 4.7949 17.265C1.95078 17.265 0 15.0302 0 12.4786C0 9.4658 2.56525 7.27578 4.32025 5.77749C4.4013 5.70829 4.48062 5.64057 4.55789 5.57432C6.69098 3.70648 9.09754 1.27163 9.95442 0.0375235C9.95442 -0.0125078 10.0273 -0.0125078 10.0456 0.0375235C10.9025 1.27163 13.309 3.70648 15.4421 5.57432C15.5215 5.64241 15.6029 5.71195 15.686 5.78294C17.4553 7.29432 20 9.46809 20 12.4786C20 15.0082 18.0756 17.2554 15.2233 17.2649Z',
        fill: 'currentColor',
      }),
    ],
  ),
}
const eGamesIcon: Component = {
  name: 'eGamesIcon',
  render: () => h(
    'svg',
    {
      width: 21,
      height: 20,
      viewBox: '0 0 21 20',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      'aria-hidden': 'true',
    },
    [
      h('path', {
        d: 'M0.875 0.133777C0.957157 -0.13195 1.95422 0.0806319 2.17722 0.0783942C2.3013 0.0772754 2.42984 0.0129415 2.56845 0.0118227C3.1972 0.00734726 3.82763 0.0129415 4.45583 0.0252489C4.99125 1.02494 5.57529 1.19389 6.65787 1.02382C7.00606 0.969558 7.6119 0.711663 7.93606 0.686489C9.9654 0.527612 11.9685 1.59947 14.0559 0.844247C14.3628 0.733481 15.2587 0.0744783 15.4331 0.0895827C15.7561 0.117554 17.2886 2.25959 17.753 2.51525C17.8581 2.8123 17.663 2.76251 17.5283 2.89398C12.7258 7.5786 10.0347 12.948 12.5821 19.6974C12.6101 19.7713 12.6498 19.8345 12.714 19.8815C12.7247 19.9039 12.5285 19.9995 12.5173 19.9995H2.72997C2.70873 19.9995 2.4589 19.9061 2.44884 19.8714C2.55336 19.284 2.29291 18.62 2.29571 18.0645C2.31974 13.4123 6.83951 9.44708 10.1711 6.81163C10.7344 6.36577 11.2173 6.42451 10.3404 5.8276C8.78837 4.77197 7.04798 4.76022 5.57306 5.94061C5.04658 6.36186 4.86718 6.83177 4.46645 7.36099H0.953804C0.979513 7.28323 0.875 7.1898 0.875 7.16351V0.133777Z',
        fill: 'currentColor',
      }),
      h('path', {
        d: 'M13.1497 18.6569C12.9239 18.5936 12.8311 17.6891 12.7758 17.4513C12.0766 14.4276 12.4913 11.7194 13.8561 8.93741C14.8096 6.99453 16.351 5.21276 17.8869 3.72021L18.0898 3.78063L19.6228 5.5445C19.7821 5.84995 19.4389 5.82477 19.2629 5.97526C18.1496 6.92852 16.4248 9.35586 15.8587 10.7046C15.0606 12.6056 14.7738 15.024 15.259 17.0194C15.3858 17.5419 15.7318 18.1187 15.7933 18.6569H13.1491H13.1497Z',
        fill: 'currentColor',
      }),
      h('path', {
        d: 'M20.486 7.72341C20.6006 7.86383 20.8918 7.97627 20.8152 8.15529C20.2803 8.8238 19.6114 9.39274 19.1223 10.1004C17.862 11.9241 17.3814 14.1462 18.1029 16.3067C18.1649 16.4924 18.327 16.5981 18.3198 16.7995L18.1415 16.9041L16.1881 16.8012L16.0462 16.6272C16.0931 16.1942 15.9031 15.7803 15.874 15.3775C15.7589 13.7954 16.1362 12.055 16.8091 10.6279C17.4674 9.23162 18.5059 7.83698 19.7013 6.88428C19.9187 6.88428 20.3346 7.53657 20.4866 7.72286L20.486 7.72341Z',
        fill: 'currentColor',
      }),
      h('path', {
        d: 'M3.0051 8.30925L3.47681 9.77326L4.97799 10.3232L3.49804 10.8541L3.02466 12.2364L2.84917 12.3377L2.41379 10.9162L1.41505 10.5732L0.955078 10.3243L2.44062 9.7962C2.55016 9.33076 2.73571 8.89552 2.85196 8.42952C2.88047 8.31596 2.78601 8.28631 3.0051 8.30869V8.30925Z',
        fill: 'currentColor',
      }),
      h('path', {
        d: 'M7.18936 6.13701C7.27151 5.7415 8.15121 5.82933 8.48543 5.86681C8.5715 5.87632 9.28074 6.03967 9.31986 6.05869C9.42605 6.1096 9.50262 6.25057 9.48417 6.36693L7.34752 8.11234L7.18991 8.03234C7.26816 7.48131 7.08428 6.64664 7.18991 6.13645L7.18936 6.13701Z',
        fill: 'currentColor',
      }),
      h('path', {
        d: 'M19.4231 0.0945611C19.5751 0.346302 19.6203 0.852022 19.7729 1.04894C20.03 1.38012 20.6174 1.19943 20.8449 1.59438C19.8864 1.74039 19.5572 2.04863 19.4236 3.017L18.9195 1.90262L17.9258 1.55578L18.948 1.07971C19.0363 0.86377 19.1621 0.643916 19.2453 0.428538C19.3074 0.267983 19.1643 0.0369404 19.4225 0.0951206L19.4231 0.0945611Z',
        fill: 'currentColor',
      }),
      h('path', {
        d: 'M20.269 3.19127C21.1599 2.92021 21.0286 4.52144 20.1332 4.08327C20.0254 4.03017 19.9164 3.77587 19.8286 3.6736C19.813 3.57355 20.1673 3.22201 20.2685 3.19127H20.269Z',
        fill: 'currentColor',
      }),
    ],
  ),
}
const BonusIcon: Component = {
  name: 'BonusIcon',
  render: () => h(
    'svg',
    {
      width: 20,
      height: 20,
      viewBox: '0 0 20 20',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      'aria-hidden': 'true',
    },
    [
      h('path', {
        d: 'M10.3191 5.1543H9.24219V16.9998H10.3191V5.1543Z',
        fill: 'currentColor',
      }),
      h('path', {
        d: 'M10 7.11771e-09C11.8584 7.11771e-09 12.7878 -0.000348702 13.5605 0.15332C16.7341 0.784574 19.2154 3.26593 19.8467 6.43945C20.0003 7.2122 20 8.14158 20 10C20 11.8584 20.0003 12.7878 19.8467 13.5605C19.2154 16.7341 16.7341 19.2154 13.5605 19.8467C12.7878 20.0003 11.8584 20 10 20C8.14158 20 7.2122 20.0003 6.43945 19.8467C3.26593 19.2154 0.784574 16.7341 0.15332 13.5605C-0.000348702 12.7878 7.11771e-09 11.8584 7.11771e-09 10C7.11682e-09 8.14158 -0.000348702 7.2122 0.15332 6.43945C0.784574 3.26593 3.26593 0.784574 6.43945 0.15332C7.2122 -0.000348702 8.14158 7.11682e-09 10 7.11771e-09ZM4.81445 10.5C4.52065 10.5 4.28223 10.6843 4.28223 10.9111V15.2939C4.28255 16.1248 5.15702 16.7998 6.2334 16.7998H13.3301C14.4065 16.7998 15.2819 16.1248 15.2822 15.2939V10.9111C15.2822 10.6843 15.0428 10.5 14.749 10.5H4.81445ZM7.10742 5.1543C7.02 4.96882 7.02442 4.75652 7.12402 4.57031C7.34027 4.1665 7.99038 4.12489 8.25098 4.5166L9 5.15039H11L11.3242 4.51758C11.5777 4.13886 12.2282 4.15673 12.4502 4.57129C12.5495 4.75709 12.5549 4.96869 12.4678 5.1543H7.10742ZM13.583 5.1543C13.642 4.78722 13.5818 4.40373 13.3994 4.06348L13.4023 4.06445C13.1009 3.5011 12.5167 3.15065 11.8701 3.15039C11.2909 3.15039 10.7521 3.43864 10.4297 3.9209L9.78906 4.88184L9.14746 3.91992C8.82518 3.43779 8.28643 3.15054 7.7002 3.15039C7.0608 3.1504 6.47741 3.50032 6.17578 4.06348C5.99324 4.40385 5.93314 4.78723 5.99219 5.1543H4.75586C4.06222 5.15456 3.5 5.71743 3.5 6.41113V8.3623C3.5 9.056 4.06222 9.61888 4.75586 9.61914H14.8066C15.5005 9.61914 16.0635 9.05616 16.0635 8.3623V6.41113C16.0635 5.71727 15.5005 5.1543 14.8066 5.1543H13.583Z',
        fill: 'currentColor',
      }),
    ],
  ),
}

const LivePlazaIcon: Component = {
  name: 'LivePlazaIcon',
  render: () => h(
    'svg',
    {
      width: 20,
      height: 20,
      viewBox: '0 0 20 20',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      'aria-hidden': 'true',
    },
    [
      h('path', {
        d: 'M10 1C7.239 1 5 3.239 5 6V8H15V6C15 3.239 12.761 1 10 1Z',
        fill: 'currentColor',
      }),
      h('path', {
        'fill-rule': 'evenodd',
        'clip-rule': 'evenodd',
        d: 'M4 5C4.552 5 5 5.448 5 6V9H15V6C15 5.448 15.448 5 16 5C16.552 5 17 5.448 17 6V10C17 13.52 14.387 16.432 11 16.917V18H14C14.552 18 15 18.448 15 19C15 19.552 14.552 20 14 20H6C5.448 20 5 19.552 5 19C5 18.448 5.448 18 6 18H9V16.917C5.613 16.432 3 13.52 3 10V6C3 5.448 3.448 5 4 5ZM5 11C5.47 13.282 7.487 15 10 15C12.513 15 14.53 13.282 15 11H5Z',
        fill: 'currentColor',
      }),
    ],
  ),
}

export const homepageChannels: HomepageChannel[] = [
  { label: 'Slots', iconImage: '/icons/egames/slots.webp', to: '/explore/egames/slots' },
  { label: 'Live Casino', iconImage: '/icons/entertainment/live-casino.webp', to: '/explore/entertainment/live-casino' },
  { label: 'Sports', iconImage: '/icons/sports/basketball.webp', to: '/explore/sports/popular' },
  { label: 'eSports', iconImage: '/icons/entertainment/gaming.webp', to: '/explore/entertainment/gaming' },
  { label: 'Lottery', iconImage: '/icons/sports/soccer.webp', to: '/explore/sports/soccer' },
]

export const createRailItems = (bybetRedirectUrl: string, redirectCode?: string): RailItem[] => [
  { label: 'Home', icon: Home, sectionId: null, to: '/' },
  {
    label: 'Sports',
    icon: SportsIcon,
    sectionId: null,
    children: [
      { label: 'Popular', iconImage: '/icons/sports/popular.webp', to: '/explore/sports/popular', accentColor: '#ff6948' },
      { label: 'Basketball', iconImage: '/icons/sports/basketball.webp', to: '/explore/sports/basketball', accentColor: '#ff8a3d' },
      { label: 'Soccer', iconImage: '/icons/sports/soccer.webp', to: '/explore/sports/soccer', accentColor: '#f4f7f5' },
      { label: 'Tennis', iconImage: '/icons/sports/tennis.webp', to: `${(bybetRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/sportEvents/inplay/tennis?p=${redirectCode || 'xjSD'}`, accentColor: '#9cda35', external: true },
      { label: 'Table Tennis', iconImage: '/icons/sports/table-tennis.webp', to: `${(bybetRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/sportEvents/incoming/tableTennis?p=${redirectCode || 'xjSD'}`, accentColor: '#9cda35', external: true },
      { label: 'eSports', iconImage: '/icons/sports/egame.webp', to: `${(bybetRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/sportEvents/eSportGame?p=${redirectCode || 'xjSD'}`, accentColor: '#9cda35', external: true },
      { label: 'eSports', iconImage: '/icons/sports/esports.webp', to: `${(bybetRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/sportEvents/eSportBall?p=${redirectCode || 'xjSD'}`, accentColor: '#9cda35', external: true },
      // { label: 'Baseball', iconImage: '/icons/sports/baseball.webp', to: '/explore/sports/baseball', accentColor: '#ff6262' },
      { label: 'Live', iconImage: '/icons/sports/live.webp', to: '/explore/sports/live', accentColor: '#48d5a5' },
    ],
  },
  {
    label: 'Entertainment',
    icon: EntertainIcon,
    sectionId: null,
    children: [
      { label: 'Live Casino', iconImage: '/icons/entertainment/live-casino.webp', to: '/explore/entertainment/live-casino', accentColor: '#e2c37b' },
      { label: 'Gaming', iconImage: '/icons/entertainment/gaming.webp', to: '/explore/entertainment/gaming', accentColor: '#777cff', underMaintenance: true },
    ],
  },
  {
    label: 'eGames',
    icon: eGamesIcon,
    sectionId: null,
    defaultExpanded: true,
    children: [
      { label: 'Slots', iconImage: '/icons/egames/slots.webp', to: '/explore/egames/slots', accentColor: '#f1b33c' },
      { label: 'Bingo', iconImage: '/icons/egames/bingo.webp', to: '/explore/egames/bingo', accentColor: '#4d9cff' },
      { label: 'Jackpot', iconImage: '/icons/egames/jackpot.webp', to: '/explore/egames/jackpot', accentColor: '#f4bd3e' },
      { label: 'History', iconImage: '/icons/egames/history.webp', to: `${(bybetRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${redirectCode || 'xjSD'}`, accentColor: '#45cdb0', external: true },
      { label: 'Customer Service', iconImage: '/icons/egames/customer-service.webp', to: '/explore/egames/customer-service', accentColor: '#8bd537' },
    ],
  },
  { label: 'Bonuses', icon: BonusIcon, sectionId: null, to: '/explore/bonuses' },
  {
    label: 'Live Plaza',
    icon: LivePlazaIcon,
    sectionId: null,
    children: [
      { label: 'Home', iconImage: '/icons/live-plaza/home.webp', to: '/explore/live-plaza/home', accentColor: '#ff9f2f' },
      { label: 'Streamer', iconImage: '/icons/live-plaza/streamer.webp', to: '/explore/live-plaza/streamer', accentColor: '#ff9f2f' },
      { label: 'Expert Predictions', iconImage: '/icons/live-plaza/expert-predictions.webp', to: '/explore/live-plaza/expert-predictions', accentColor: '#55aef7' },
      { label: 'Funds', iconImage: '/icons/live-plaza/funds.webp', to: '/explore/live-plaza/funds', accentColor: '#f1644d', showFundsModal: true },
    ],
  },
  { label: 'Me', icon: UserRound, sectionId: null, to: '/explore/account/me' },
  { label: 'Deposit', icon: BadgeDollarSign, sectionId: null, to: `${(bybetRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${redirectCode || 'xjSD'}`, external: true }, ///explore/account/deposit
  { label: 'Withdraw', icon: CreditCard, sectionId: null, to: `${(bybetRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${redirectCode || 'xjSD'}`, external: true }, //explore/account/withdraw
  { label: 'VIP', icon: Crown, sectionId: null, to: `${(bybetRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${redirectCode || 'xjSD'}`, external: true }, //explore/account/vip
  { label: 'History', icon: NotebookTabs, sectionId: null, to: `${(bybetRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${redirectCode || 'xjSD'}`, external: true }, // explore/account/history
  { label: 'English', icon: Globe, sectionId: null, control: 'language', surface: true },
  { label: 'Auto', icon: Moon, sectionId: null, control: 'theme', surface: true },
]

const gamePlaceholderImage = '/brand/bybet-logo.webp'

const createGames = (
  titles: string[],
  providers: string[],
): ReferenceGame[] => titles.map((title, index) => ({
  title,
  provider: providers[index] ?? 'Bybet',
  image: gamePlaceholderImage,
}))

const resolveSlotImage = (game: SlotGame): string => {
  if (game.image && game.image.startsWith('/images/slots/')) {
    return game.image
  }
  const baseId = game.id.replace(/-hot$|-popular$|-top$/, '')
  if (baseId === 'chinese-new-year') {
    return '/images/slots/chinese-new-year-deluxe.webp'
  }
  return `/images/slots/${baseId}.webp`
}

const parseHotPercent = (val: unknown): number => {
  if (typeof val === 'number') return val
  if (typeof val === 'string') return parseFloat(val.replace('%', '').trim()) || 0
  return 0
}

const buildUniqueSlotGames = (
  slots: SlotGame[],
  limit?: number,
): ReferenceGame[] => {
  const seenTitles = new Set<string>()
  const result: ReferenceGame[] = []

  for (const game of slots) {
    const normTitle = game.title.toLowerCase().trim()
    if (seenTitles.has(normTitle)) continue
    seenTitles.add(normTitle)
    result.push({
      id: game.id,
      title: game.title,
      provider: game.provider,
      image: resolveSlotImage(game),
    })
    if (limit && result.length >= limit) break
  }

  return result
}

// Popular Slots: highest livePlayers
export const popularGames: ReferenceGame[] = buildUniqueSlotGames(
  [...SLOTS]
    .filter(g => typeof g.livePlayers === 'number' && g.livePlayers > 0)
    .sort((a, b) => (b.livePlayers ?? 0) - (a.livePlayers ?? 0)),
  12,
)

// New Releases: new: true
export const newGames: ReferenceGame[] = buildUniqueSlotGames(
  [...SLOTS]
    .filter(g => g.new === true)
    .sort((a, b) => (b.livePlayers ?? 0) - (a.livePlayers ?? 0)),
)

// Recommended For You: highest hotPercent
export const recommendedGames: ReferenceGame[] = buildUniqueSlotGames(
  [...SLOTS]
    .filter(g => Boolean(g.hotPercent))
    .sort((a, b) => parseHotPercent(b.hotPercent) - parseHotPercent(a.hotPercent)),
  12,
)

export const mobileQuickCategories: GameCategory[] = [
  { label: 'Hot Slots', icon: Flame, accentColor: '#ffb02e', to: '/explore/egames/slots' },
  { label: 'Jackpots', icon: Crown, accentColor: '#f4f7f5', to: '/explore/egames/jackpot' },
  { label: 'New Games', icon: BadgePlus, accentColor: '#f4f7f5', to: '/explore/egames/slots' },
  { label: 'Buy Feature', icon: BadgeCent, accentColor: '#f4f7f5', to: '/explore/egames/slots' },
]

export const gameCategories: GameCategory[] = [
  ...mobileQuickCategories,
  { label: 'Megaways', icon: Gem, accentColor: '#f4f7f5', to: '/explore/egames/slots' },
  { label: 'Table Games', icon: Table2, accentColor: '#f4f7f5', to: '/explore/entertainment/gaming' },
  { label: 'All Slots', icon: Grid2X2, accentColor: '#f4f7f5', to: '/explore/egames/slots' },
]

export const providers = [
  'PG',
  'JILI',
  'PP',
  'CQ9',
  'JDB',
  'RED TIGER',
]

export const providerLogoByName: Record<string, string> = {
  PG: '/images/providers/pg.webp',
  JILI: '/images/providers/jili.webp',
  PP: '/images/providers/pp.webp',
  CQ9: '/images/providers/cq9.webp',
  JDB: '/images/providers/jdb.webp',
  'RED TIGER': '/images/providers/red-tiger.webp',
}

export const faqItems: FaqItem[] = [
  {
    question: 'What is ByBet Slot?',
    answer:
      'ByBet Slot is a premium online gaming destination that offers a comprehensive collection of high-quality digital slot machines. We provide a secure environment where users can explore various themes, from ancient civilizations to futuristic adventures. Our platform integrates the ByBet slots casino library with advanced technology, allowing you to enjoy seamless gameplay whether you are using a desktop browser or the ByBet app slot for mobile convenience.',
  },
  {
    question: 'Is ByBet legit or a scam?',
    answer:
      'We can confidently state that we are a fully legitimate and legal gaming platform. To ensure the highest standards of safety and fairness, we hold a formal license from PAGCOR (Philippine Amusement and Gaming Corporation). This certification means we operate under strict regulatory oversight, ensuring that all our operations are transparent and that our games, including those featuring the ByBet scatter symbols, are fair and unbiased. Your security is our top priority, and we employ industry-leading encryption to protect every interaction on our site.',
  },
  {
    question: 'Is the ByBet app slot compatible with both Android and iOS?',
    answer:
      'Yes, we have designed our application to be fully compatible with both major mobile operating systems. You can download the app directly from our official site to ensure you are getting the most secure and updated version.',
  },
  {
    question: 'How does the ByBet slots casino ensure fairness?',
    answer:
      'We use certified Random Number Generators (RNG) to ensure that every outcome is random and unbiased. We undergo regular audits by third-party organizations to verify that our games operate according to international fairness standards.',
  },
  {
    question: 'What makes the ByBet scatter symbol special?',
    answer:
      'In most of our games, the scatter symbol is a powerful tool that can trigger special features regardless of where it lands on the reels. This often leads to free spins or special mini-games that add excitement to your session.',
  },
]
