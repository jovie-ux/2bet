import { sortRailGames } from '~/utils/gameSort'

export interface SlotGame {
  id: string
  title: string
  provider: string
  providerLogo?: string
  image: string
  badge?: string
  buyBonus?: boolean
  bottomMultiplier?: string
  hotPercent?: string
  coldPercent?: string
  rtpPercent?: string
  livePlayers?: number
  href?: string
  category?: string | string[]
  categories?: string[]
  theme?: string
  features?: string[]
  winningLine?: string
  new?: boolean
  jackpot?: boolean
  Jackpot?: boolean
  jackpotPrice?: number | string
  JackpotPrice?: number | string
}

export interface SlotCategory {
  key: string
  label: string
  shortLabel: string
  iconName?: string
  emoji?: string
  iconImage?: string
  svg?: string
}

export interface SlotSection {
  id: string
  title: string
  emoji?: string
  iconImage?: string
  iconName?: string
  count: number
  hasHelp?: boolean
  games: SlotGame[]
  allMatchingGames?: SlotGame[]
}

export interface SlotSectionConfig {
  id: string
  title: string
  emoji?: string
  iconImage?: string
  iconName?: string
  hasHelp?: boolean
}

export interface ReferenceGame {
  title: string
  provider: string
  image: string
}

export const newGames: ReferenceGame[] = [
  { title: 'Wild Hop & Drop', provider: 'Pragmatic Play', image: '/images/games/new-releases/wild-hop-and-drop.webp' },
  { title: 'Spin & Score Megaways', provider: 'Pragmatic Play', image: '/images/games/new-releases/spin-and-score-megaways.webp' },
  { title: 'Super Wildrix', provider: 'PG', image: '/images/games/new-releases/super-wildrix.webp' },
  { title: 'Snakes & Ladders: Snake Eyes', provider: 'Pragmatic Play', image: '/images/games/new-releases/snakes-and-ladders-snake-eyes.webp' },
  { title: 'Fortune Rabbit Xtreme', provider: 'PG Soft', image: '/images/games/new-releases/fortune-rabbit-xtreme.webp' },
  { title: 'Bigger Bass Blizzard', provider: 'Pragmatic Play', image: '/images/games/new-releases/bigger-bass-blizzard.webp' },
  { title: 'John Hunter: Book of Tut Respin', provider: 'Pragmatic Play', image: '/images/games/new-releases/john-hunter-book-of-tut-respin.webp' },
  { title: 'Chinese New Year Deluxe', provider: 'PG Soft', image: '/images/games/new-releases/chinese-new-year-deluxe.webp' },
]

export const FREQUENTLY_SEARCHED_SLOTS: string[] = [
  'Super Ace',
  'Super Ace Deluxe',
  'Pinata Wins',
  'Wild Bounty Showdown',
  'Wild Ace',
  'Wild Bronco',
  'Fortune Gems 2',
  'Fortune Gems',
  'Fortune Garuda 500',
  'Golden Empire',
]

export const SLOT_CATEGORY_SVGS: Record<string, string> = {
  bonus: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><g transform="translate(0, 0.333)"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.663 0C18.9143 0 24 5.23395 24 11.667C23.9998 18.0998 18.9142 23.333 12.663 23.333C10.2037 23.333 7.80946 22.507 5.85347 20.9941L1.52925 21.8838C1.04875 21.9827 0.554607 21.7895 0.25874 21.3867C-0.0370806 20.9839 -0.0830807 20.4424 0.140576 19.9932L2.13179 15.9941C1.59661 14.6194 1.32617 13.1667 1.32612 11.667C1.32612 5.23404 6.4118 5.32292e-06 12.663 0ZM17.1855 5.90723C16.685 5.48732 15.9384 5.55219 15.5185 6.05273L7.71968 15.3496C7.3001 15.8501 7.36578 16.5958 7.86616 17.0156C8.36659 17.4354 9.11222 17.3703 9.53218 16.8701L17.332 7.57324C17.7516 7.07276 17.6858 6.32708 17.1855 5.90723ZM16.1699 12.168C14.7946 12.168 13.6796 13.2829 13.6796 14.6582C13.6796 16.0335 14.7946 17.1484 16.1699 17.1484C17.5452 17.1484 18.6601 16.0335 18.6601 14.6582C18.6601 13.2829 17.5452 12.168 16.1699 12.168ZM16.1699 13.8682C16.6063 13.8682 16.9599 14.2218 16.9599 14.6582C16.9599 15.0946 16.6063 15.4482 16.1699 15.4482C15.7334 15.4482 15.3798 15.0946 15.3798 14.6582C15.3798 14.2218 15.7334 13.8682 16.1699 13.8682ZM8.95698 5.66992C7.5817 5.66993 6.46681 6.78489 6.46675 8.16016C6.46675 9.53548 7.58166 10.6504 8.95698 10.6504C10.3323 10.6504 11.4472 9.53549 11.4472 8.16016C11.4472 6.78488 10.3323 5.66992 8.95698 5.66992ZM8.95698 7.37012C9.39339 7.37012 9.74696 7.72376 9.74702 8.16016C9.74702 8.5966 9.39343 8.9502 8.95698 8.9502C8.52055 8.95018 8.16694 8.59659 8.16694 8.16016C8.167 7.72377 8.52058 7.37013 8.95698 7.37012Z" class="fill-text-4"></path></g></svg>`,
  'top-pick': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><g clip-path="url(#clip0_14377_100787)"><path d="M15.9979 9.15103H22.6037C22.6838 9.15103 23.1316 9.3784 23.2346 9.44847C24.7551 10.4809 23.8239 12.7474 22.0688 12.5787L22.6366 12.8318C24.1458 13.9257 23.3218 16.1293 21.498 16.0064L22.0659 16.2595C23.575 17.3534 22.7511 19.557 20.9273 19.434L21.4951 19.6871C22.3119 20.3249 22.5794 21.3073 21.9257 22.181C21.744 22.4241 21.1862 22.8617 20.8915 22.8617H6.28516V10.2964C8.59677 9.6887 11.246 8.07282 12.2973 5.84777C12.9224 4.52647 13.5261 0.920051 14.7334 0.286569C15.5101 -0.120976 16.5258 -0.166736 17.0565 0.634054C17.7888 1.73943 17.8732 5.10561 17.5156 6.35255C17.2224 7.37785 16.613 8.30305 15.9979 9.15389V9.15103Z"  class="fill-text-4"></path><path d="M5.71322 8.00708H0V24H5.71322V8.00708Z"  class="fill-text-4"></path></g><defs><clipPath id="clip0_14377_100787"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>`,
  top: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none"><path d="M22.3782 7.39053C22.1637 7.21145 21.9032 7.09628 21.6263 7.05815C21.3495 7.02003 21.0675 7.06048 20.8126 7.17491L16.0688 9.28428L13.3126 4.31553C13.1809 4.08355 12.99 3.89064 12.7594 3.75643C12.5289 3.62222 12.2669 3.55151 12.0001 3.55151C11.7333 3.55151 11.4713 3.62222 11.2408 3.75643C11.0102 3.89064 10.8193 4.08355 10.6876 4.31553L7.93135 9.28428L3.1876 7.17491C2.93214 7.06065 2.64981 7.02014 2.37252 7.05795C2.09524 7.09577 1.83407 7.21039 1.61852 7.38887C1.40298 7.56736 1.24166 7.80258 1.15281 8.06794C1.06396 8.33331 1.05111 8.61825 1.11573 8.89053L3.49697 19.0437C3.54251 19.2402 3.62747 19.4255 3.74672 19.5883C3.86597 19.751 4.01702 19.8879 4.19072 19.9905C4.42589 20.1313 4.69477 20.2058 4.96885 20.2062C5.10208 20.2059 5.23462 20.187 5.3626 20.1499C9.70306 18.9499 14.2878 18.9499 18.6282 20.1499C19.0245 20.2541 19.446 20.1968 19.8001 19.9905C19.9749 19.8892 20.1267 19.7527 20.2461 19.5897C20.3655 19.4268 20.4499 19.2408 20.4938 19.0437L22.8845 8.89053C22.9484 8.61817 22.9348 8.33337 22.8454 8.06831C22.7559 7.80324 22.5941 7.56848 22.3782 7.39053Z"  class="fill-text-4"></path></svg>`,
  new: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><g clip-path="url(#clip0_33258_7160)"><mask id="mask0_33258_7160" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24" style="mask-type: luminance;"><path d="M0 0H24V24H0V0Z" fill="white"></path></mask><g mask="url(#mask0_33258_7160)"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.0929 2.48099L11.9999 0.625488L8.90689 2.48099L5.31439 2.79749L3.89988 6.11699L1.18188 8.48549L1.99038 12L1.18188 15.5145L3.90139 17.8845L5.31439 21.2025L8.90689 21.519L11.9999 23.3745L15.0929 21.519L18.6854 21.2025L20.0984 17.883L22.8179 15.5145L22.0094 12L22.8179 8.48549L20.0984 6.11549L18.6854 2.79749L15.0929 2.48099ZM4.49988 15V8.99999H6.74989C6.74989 8.99999 6.74989 9.02099 6.75888 9.07349C6.76689 9.12749 6.77989 9.19949 6.79788 9.28949C6.83589 9.46949 6.88988 9.69249 6.95988 9.95849C7.09788 10.488 7.28239 11.1345 7.46989 11.7945L7.49989 11.895V8.99999H8.99989V15H6.74989C6.74989 15 6.74889 14.9775 6.74088 14.9265L6.70188 14.7105C6.65301 14.4863 6.599 14.2632 6.53989 14.0415C6.37648 13.4277 6.20647 12.8156 6.02988 12.2055L5.99989 12.105V15H4.49988ZM13.4999 8.99999H9.74989V15H13.4999V13.5H11.2499V12.75H12.8999V11.25H11.2499V10.5H13.4999V8.99999ZM15.7499 8.99999H14.2499V15H15.7499V14.25C15.7499 13.722 15.9404 13.17 16.2104 12.756C16.3454 12.552 16.4834 12.405 16.5989 12.3165C16.6388 12.2818 16.6845 12.2543 16.7339 12.2355C16.7564 12.2415 16.8254 12.2655 16.9439 12.3435C17.0939 12.444 17.2679 12.603 17.4329 12.813C17.7734 13.2405 17.9999 13.773 17.9999 14.25V15H19.4999V8.99999H17.9999V11.2605C17.9289 11.2032 17.8553 11.1491 17.7794 11.0985C17.4944 10.9065 17.1284 10.7325 16.7294 10.7325C16.3484 10.7325 16.0124 10.89 15.7499 11.0775V8.99999Z"  class="fill-text-4"></path></g></g><defs><clipPath id="clip0_33258_7160"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>`,
  hot: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none"><g clip-path="url(#clip0_31680_126610)"><path d="M19.6196 5.71476C16.2466 6.65237 15.6286 9.3108 15.846 10.9996C13.4397 8.24164 13.5382 5.06971 13.5382 0.5C5.8204 3.33671 7.61532 11.5162 7.38476 13.9999C5.44348 12.4507 5.07646 8.75006 5.07646 8.75006C3.02732 9.77808 2 12.5234 2 14.7501C2 20.135 6.47685 24.5 12.0003 24.5C17.5232 24.5 22 20.135 22 14.7501C22 11.5502 19.5899 10.0737 19.6196 5.71426V5.71476Z" fill="none" class="fill-text-4"></path></g><defs><clipPath id="clip0_31680_126610"><rect width="24" height="24" fill="none" transform="translate(0 0.5)" class="fill-text-4"></rect></clipPath></defs></svg>`,
  cold: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none"><g clip-path="url(#clip0_33258_126329)"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.9999 0.75C12.5522 0.75 12.9999 1.19772 12.9999 1.75V4.00383L14.7389 3.17316C15.2372 2.93511 15.8342 3.14612 16.0723 3.64447C16.3103 4.14282 16.0993 4.73979 15.601 4.97784L12.9999 6.22029V7.25143L14.4531 6.7702L15.7468 7.5175L16.0549 9.01119L16.9543 8.49321L16.7329 5.62702C16.6904 5.07638 17.1023 4.59551 17.6529 4.55297C18.2035 4.51043 18.6844 4.92233 18.727 5.47298L18.8748 7.3872L20.8349 6.25843C21.3135 5.98281 21.9249 6.14735 22.2005 6.62595C22.4761 7.10454 22.3116 7.71595 21.833 7.99157L19.8784 9.11718L21.464 10.2003C21.92 10.5118 22.0372 11.134 21.7257 11.5901C21.4141 12.0461 20.7919 12.1633 20.3359 11.8517L17.9546 10.2251L17.0581 10.7414L18.1983 11.7522L18.1983 13.2488L17.0582 14.2594L17.9553 14.776L20.3357 13.1494C20.7917 12.8378 21.414 12.9548 21.7256 13.4108C22.0372 13.8668 21.9201 14.489 21.4641 14.8006L19.8791 15.8838L21.833 17.0089C22.3116 17.2845 22.4761 17.8959 22.2005 18.3745C21.9249 18.8531 21.3135 19.0177 20.8349 18.7421L18.8749 17.6134L18.727 19.528C18.6844 20.0787 18.2035 20.4906 17.6529 20.448C17.1023 20.4055 16.6904 19.9246 16.7329 19.374L16.9543 16.5075L16.0551 15.9896L15.7468 17.4832L14.453 18.2303L12.9999 17.749V18.7804L15.6009 20.0226C16.0993 20.2607 16.3103 20.8576 16.0723 21.356C15.8343 21.8543 15.2373 22.0654 14.739 21.8274L12.9999 20.9968V23.25C12.9999 23.8023 12.5522 24.25 11.9999 24.25C11.4476 24.25 10.9999 23.8023 10.9999 23.25V20.9969L9.26145 21.8273C8.76311 22.0654 8.16614 21.8544 7.92809 21.356C7.69004 20.8577 7.90105 20.2607 8.3994 20.0227L10.9999 18.7804V17.7492L9.5473 18.2303L8.25358 17.4832L7.94521 15.9893L7.0455 16.5074L7.26696 19.374C7.3095 19.9246 6.8976 20.4055 6.34695 20.448C5.79631 20.4906 5.31544 20.0787 5.2729 19.528L5.12498 17.6133L3.16543 18.7416C2.68682 19.0172 2.07542 18.8526 1.79983 18.374C1.52424 17.8954 1.68882 17.284 2.16743 17.0084L4.12143 15.8833L2.53683 14.8007C2.0808 14.4892 1.96368 13.8669 2.27522 13.4109C2.58676 12.9549 3.209 12.8377 3.66502 13.1493L6.04534 14.7754L6.94206 14.2591L5.80199 13.2482V11.7518L6.94185 10.7411L6.04565 10.2249L3.66512 11.8516C3.20913 12.1632 2.58688 12.0462 2.27529 11.5902C1.96369 11.1342 2.08074 10.512 2.53673 10.2004L4.12205 9.11705L2.16785 7.99155C1.68926 7.71592 1.52474 7.1045 1.80037 6.62592C2.07601 6.14733 2.68742 5.98281 3.16601 6.25845L5.12505 7.38673L5.2729 5.47298C5.31544 4.92233 5.79631 4.51043 6.34695 4.55297C6.8976 4.59551 7.3095 5.07638 7.26696 5.62702L7.04556 8.49283L7.94516 9.01094L8.25358 7.51684L9.54751 6.76977L10.9999 7.25111V6.21986L8.39946 4.97787C7.90109 4.73985 7.69004 4.14289 7.92806 3.64453C8.16608 3.14617 8.76304 2.93512 9.2614 3.17313L10.9999 4.00346V1.75C10.9999 1.19772 11.4476 0.75 11.9999 0.75ZM10.9999 9.35808L9.98509 9.02176L9.77033 10.0621L10.9999 10.7703V9.35808ZM9.99632 12.5003L8.76938 11.7936L7.97273 12.5L8.76972 13.2067L9.99632 12.5003ZM9.77042 14.9383L9.98514 15.9785L10.9999 15.6424V14.2302L9.77042 14.9383ZM12.9999 14.2302V15.6421L14.0152 15.9784L14.2299 14.9385L12.9999 14.2302ZM15.2305 13.2069L14.0038 12.5003L15.2304 11.794L16.0274 12.5005L15.2305 13.2069ZM14.2296 10.0624L14.015 9.02208L12.9999 9.35824V10.7705L14.2296 10.0624Z"  class="fill-text-4"></path></g><defs><clipPath id="clip0_33258_126329"><rect width="24" height="24" fill="white" transform="translate(0 0.5)"></rect></clipPath></defs></svg>`,
  "max-rpt": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none"><path d="M13.5 16.5C13.5 16.8978 13.342 17.2794 13.0607 17.5607C12.7794 17.842 12.3978 18 12 18C11.6022 18 11.2206 17.842 10.9393 17.5607C10.658 17.2794 10.5 16.8978 10.5 16.5C10.5 16.1022 10.658 15.7206 10.9393 15.4393C11.2206 15.158 11.6022 15 12 15C12.3978 15 12.7794 15.158 13.0607 15.4393C13.342 15.7206 13.5 16.1022 13.5 16.5Z"  class="fill-text-4"></path><path d="M14.347 1.15991L17.527 5.61591L19.624 4.90091L21.538 10.4999H22.5V22.4999H1.5V10.4999H2.01V10.4899L2.658 10.4959L14.347 1.15991ZM9.397 10.4999H19.425L18.388 7.46691L16.866 7.95391L9.397 10.4999ZM7.839 8.91691L15.55 6.28991L13.946 4.03991L7.839 8.91691ZM5.5 12.4999H3.5V14.4999C4.03043 14.4999 4.53914 14.2892 4.91421 13.9141C5.28929 13.5391 5.5 13.0303 5.5 12.4999ZM15.5 16.4999C15.5 16.0403 15.4095 15.5852 15.2336 15.1605C15.0577 14.7359 14.7999 14.35 14.4749 14.025C14.1499 13.7 13.764 13.4422 13.3394 13.2663C12.9148 13.0904 12.4596 12.9999 12 12.9999C11.5404 12.9999 11.0852 13.0904 10.6606 13.2663C10.236 13.4422 9.85013 13.7 9.52513 14.025C9.20012 14.35 8.94231 14.7359 8.76642 15.1605C8.59053 15.5852 8.5 16.0403 8.5 16.4999C8.5 17.4282 8.86875 18.3184 9.52513 18.9748C10.1815 19.6312 11.0717 19.9999 12 19.9999C12.9283 19.9999 13.8185 19.6312 14.4749 18.9748C15.1313 18.3184 15.5 17.4282 15.5 16.4999ZM20.5 20.4999V18.4999C19.9696 18.4999 19.4609 18.7106 19.0858 19.0857C18.7107 19.4608 18.5 19.9695 18.5 20.4999H20.5ZM18.5 12.4999C18.5 13.0303 18.7107 13.5391 19.0858 13.9141C19.4609 14.2892 19.9696 14.4999 20.5 14.4999V12.4999H18.5ZM3.5 20.4999H5.5C5.5 19.9695 5.28929 19.4608 4.91421 19.0857C4.53914 18.7106 4.03043 18.4999 3.5 18.4999V20.4999Z"  class="fill-text-4"></path></svg>`,
  home: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M1 21.57V9.14079C1 8.77472 1.0901 8.42819 1.27029 8.1012C1.45048 7.77422 1.69876 7.50491 2.01514 7.29327L10.4773 1.46188C10.9204 1.15396 11.4264 1 11.9953 1C12.5641 1 13.0733 1.15396 13.5227 1.46188L21.9849 7.29184C22.3023 7.50348 22.5506 7.77326 22.7297 8.1012C22.9099 8.42819 23 8.77472 23 9.14079V21.57C23 21.9533 22.8434 22.2874 22.5301 22.5724C22.2169 22.8575 21.8497 23 21.4286 23H16.1109C15.7505 23 15.4488 22.8894 15.2057 22.6682C14.9627 22.4461 14.8411 22.1716 14.8411 21.8446V15.0251C14.8411 14.6981 14.7196 14.424 14.4766 14.2029C14.2325 13.9807 13.9308 13.8697 13.5714 13.8697H10.4286C10.0692 13.8697 9.76805 13.9807 9.525 14.2029C9.28091 14.424 9.15886 14.6981 9.15886 15.0251V21.846C9.15886 22.173 9.03733 22.4471 8.79429 22.6682C8.55124 22.8894 8.25005 23 7.89071 23H2.57143C2.15029 23 1.78309 22.8575 1.46986 22.5724C1.15662 22.2874 1 21.9533 1 21.57Z"  class="fill-title-button-special"></path></svg>`,
}

export const SLOT_CATEGORIES: SlotCategory[] = [
  { key: 'home', label: 'Home', shortLabel: 'Home', iconName: 'House' },
  { key: 'bonus', label: 'Bonus', shortLabel: 'Bonus', iconName: 'Percent', emoji: '🟡', iconImage: '/icons/slots/bonuses.webp', svg: SLOT_CATEGORY_SVGS.bonus },
  { key: 'top-pick', label: 'Top Pick', shortLabel: 'Top Pick', iconName: 'ThumbsUp', emoji: '👍', iconImage: '/icons/slots/top-pick.webp' },
  { key: 'top', label: 'Top', shortLabel: 'Top', iconName: 'Medal', emoji: '🏅', iconImage: '/icons/slots/top.webp' },
  { key: 'new', label: 'New', shortLabel: 'New', iconName: 'Sparkles', emoji: '🆕', iconImage: '/icons/slots/new.webp' },
  { key: 'hot', label: 'Hot games', shortLabel: 'Hot...', iconName: 'Flame', emoji: '🔥', iconImage: '/icons/slots/hot.webp' },
  { key: 'cold', label: 'Cold Games', shortLabel: 'Cold...', iconName: 'Snowflake', emoji: '❄️', iconImage: '/icons/slots/cold.webp' },
  { key: 'max-rpt', label: 'Max RTP', shortLabel: 'Max...', iconName: 'Banknote', emoji: '💵', iconImage: '/icons/slots/max-rtp.webp' },
]

export const SLOT_SECTION_CONFIGS: SlotSectionConfig[] = [
  { id: 'bonuses', title: 'Bonuses', emoji: '🟡', iconImage: '/icons/slots/bonuses.webp', iconName: 'Percent', hasHelp: false },
  { id: 'top-pick', title: 'Top Pick', emoji: '👍', iconImage: '/icons/slots/top-pick.webp', iconName: 'ThumbsUp', hasHelp: false },
  { id: 'top', title: 'Top', emoji: '🏅', iconImage: '/icons/slots/top.webp', iconName: 'Medal', hasHelp: false },
  { id: 'new', title: 'New', emoji: '🆕', iconImage: '/icons/slots/new.webp', iconName: 'Sparkles', hasHelp: false },
  { id: 'hot', title: 'Hot games', emoji: '🔥', iconImage: '/icons/slots/hot.webp', iconName: 'Flame', hasHelp: true },
  { id: 'cold', title: 'Cold Games', emoji: '❄️', iconImage: '/icons/slots/cold.webp', iconName: 'Snowflake', hasHelp: true },
  { id: 'max-rtp', title: 'Max RTP', emoji: '💵', iconImage: '/icons/slots/max-rtp.webp', iconName: 'Trophy', hasHelp: false },
]

export interface SlotProviderOption {
  key: string
  label: string
  logo?: string
}

export const SLOT_PROVIDERS: SlotProviderOption[] = [
  { key: 'all', label: 'All' },
  { key: 'PG', label: 'PG', logo: '/images/providers/pg.webp' },
  { key: 'JILI', label: 'JILI', logo: '/images/providers/jili.webp' },
  { key: 'PP', label: 'PP', logo: '/images/providers/pp.webp' },
  { key: 'CQ9', label: 'CQ9', logo: '/images/providers/cq9.webp' },
  { key: 'JDB', label: 'JDB', logo: '/images/providers/jdb.webp' },
  { key: 'Red Tiger', label: 'Red Tiger', logo: '/images/providers/red-tiger.webp' },
]

export const normalizeSlotProvider = (provider: string): string => {
  const p = (provider || '').trim().toLowerCase()
  if (p === 'pp' || p === 'pragmatic play' || p === 'pragmatic') return 'pp'
  if (p === 'pg' || p === 'pg soft') return 'pg'
  if (p === 'jdb' || p === 'jpg') return 'jdb'
  if (p === 'jili') return 'jili'
  if (p === 'cq9') return 'cq9'
  if (p === 'red tiger' || p === 'redtiger' || p === 'unknown') return 'red tiger'
  return p
}

export const getSlotProviderLogo = (provider: string): string => {
  const norm = normalizeSlotProvider(provider)
  if (norm === 'pp') return '/images/providers/pp.webp'
  if (norm === 'pg') return '/images/providers/pg.webp'
  if (norm === 'jdb') return '/images/providers/jdb.webp'
  if (norm === 'jili') return '/images/providers/jili.webp'
  if (norm === 'cq9') return '/images/providers/cq9.webp'
  if (norm === 'red tiger') return '/images/providers/red-tiger.webp'
  return ''
}

export const normalizeSlotCategory = (param: string): string => {
  const p = (param || '').toLowerCase()
  if (p === 'bonus' || p === 'bonuses') return 'bonus'
  if (p === 'top-pick' || p === 'top-picks') return 'top-pick'
  if (p === 'max-rpt' || p === 'max-rtp') return 'max-rpt'
  return p
}

export const isGameInSlotCategory = (game: SlotGame, categoryKey: string): boolean => {
  const target = normalizeSlotCategory(categoryKey)
  const rawCats: string[] = Array.isArray(game.category)
    ? game.category
    : (game.categories || (game.category ? [game.category] : []))
  const normCats = rawCats.map(c => normalizeSlotCategory(c))
  const hasCat = normCats.includes(target)

  if (target === 'bonus') {
    return hasCat
  }
  if (target === 'top-pick') {
    return hasCat
  }
  if (target === 'top') {
    return hasCat || (game.livePlayers !== undefined && game.livePlayers > 0)
  }
  if (target === 'new') {
    return hasCat || Boolean(game.new) || game.badge === 'NEW'
  }
  if (target === 'hot') {
    return hasCat || Boolean(game.hotPercent)
  }
  if (target === 'cold') {
    return hasCat || Boolean(game.coldPercent)
  }
  if (target === 'max-rpt') {
    return hasCat || Boolean(game.rtpPercent)
  }

  return hasCat
}

const slotsBatch1: SlotGame[] = [
  {
    "id": "3-lightning-blitz",
    "title": "3 Lightning Blitz",
    "provider": "JILI",
    "image": "/images/slots/3-lightning-blitz.webp",
    "category": [
      "bonus"
    ],
    "new": true,
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jili.webp"
  },
  {
    "id": "golden-retriever",
    "title": "Golden Retriever",
    "provider": "PP",
    "image": "/images/slots/golden-retriever.webp",
    "category": [
      "bonus"
    ],
    "new": true,
    "theme": "Nature",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pp.webp"
  },
  {
    "id": "harvest-moon-grave-profits",
    "title": "Harvest Moon – Grave Profits",
    "provider": "PP",
    "image": "/images/slots/harvest-moon-grave-profits.webp",
    "category": [
      "bonus"
    ],
    "new": true,
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "20 lines",
    "providerLogo": "/images/providers/pp.webp"
  },
  {
    "id": "joker-s-revenge",
    "title": "Joker’s Revenge",
    "provider": "PP",
    "image": "/images/slots/joker-s-revenge.webp",
    "category": [
      "bonus"
    ],
    "new": true,
    "theme": "Adventures",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp"
  },
  {
    "id": "777-wheel-blitz",
    "title": "777 Wheel Blitz",
    "provider": "PP",
    "image": "/images/slots/777-wheel-blitz.webp",
    "category": [
      "bonus"
    ],
    "new": true,
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "20 lines",
    "providerLogo": "/images/providers/pp.webp"
  },
  {
    "id": "mahjong-wins-triple-pot",
    "title": "Mahjong Wins Triple Pot",
    "provider": "PP",
    "image": "/images/slots/mahjong-wins-triple-pot.webp",
    "category": [
      "bonus"
    ],
    "new": true,
    "theme": "Others",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pp.webp"
  },
  {
    "id": "super-ace",
    "title": "Super Ace",
    "provider": "JILI",
    "image": "/images/slots/super-ace.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "95.8%",
    "livePlayers": 8592,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "super-ace-deluxe",
    "title": "Super Ace Deluxe",
    "provider": "JILI",
    "image": "/images/slots/super-ace-deluxe.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "99.3%",
    "livePlayers": 6498,
    "rtpPercent": "97.0%"
  },
  {
    "id": "wild-ace",
    "title": "Wild Ace",
    "provider": "JILI",
    "image": "/images/slots/wild-ace.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "95.5%",
    "livePlayers": 3026,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "wild-bronco",
    "title": "Wild Bronco",
    "provider": "JDB",
    "image": "/images/slots/wild-bronco.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "new": true,
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jdb.webp",
    "hotPercent": "97.7%",
    "livePlayers": 1938,
    "rtpPercent": "96.7%"
  },
  {
    "id": "fortune-gems",
    "title": "Fortune Gems",
    "provider": "JILI",
    "image": "/images/slots/fortune-gems.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "92.3%",
    "livePlayers": 1759,
    "rtpPercent": "97.0%"
  },
  {
    "id": "fortune-gems-2",
    "title": "Fortune Gems 2",
    "provider": "JILI",
    "image": "/images/slots/fortune-gems-2.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "91.9%",
    "livePlayers": 868,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "golden-empire",
    "title": "Golden Empire",
    "provider": "JILI",
    "image": "/images/slots/golden-empire.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "93.7%",
    "livePlayers": 996,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "sugar-rush",
    "title": "Sugar Rush",
    "provider": "PP",
    "image": "/images/slots/sugar-rush.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "81.0%",
    "livePlayers": 565,
    "rtpPercent": "96.5%"
  },
  {
    "id": "super-ace-2",
    "title": "Super Ace 2",
    "provider": "JILI",
    "image": "/images/slots/super-ace-2.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "91.2%",
    "livePlayers": 829,
    "rtpPercent": "97.0%"
  },
  {
    "id": "party-ape",
    "title": "Party Ape",
    "provider": "JILI",
    "image": "/images/slots/party-ape.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "96.3%",
    "livePlayers": 1053,
    "rtpPercent": "97.0%"
  },
  {
    "id": "sweet-bonanza-1000",
    "title": "Sweet Bonanza 1000",
    "provider": "PP",
    "image": "/images/slots/sweet-bonanza-1000.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "102.7%",
    "livePlayers": 656,
    "rtpPercent": "96.5%"
  },
  {
    "id": "money-coming",
    "title": "Money Coming",
    "provider": "JILI",
    "image": "/images/slots/money-coming.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "92.9%",
    "livePlayers": 630,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "mega-ace",
    "title": "Mega Ace",
    "provider": "JILI",
    "image": "/images/slots/mega-ace.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "hot",
      "cold",
      "max-rpt"
    ],
    "Jackpot": true,
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "96.0%",
    "coldPercent": "95.2%",
    "livePlayers": 630,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "gates-of-olympus-super-scatter",
    "title": "Gates of Olympus Super Scatter",
    "provider": "PP",
    "image": "/images/slots/gates-of-olympus-super-scatter.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 308,
    "rtpPercent": "96.5%"
  },
  {
    "id": "3-super-ace",
    "title": "3 Super Ace",
    "provider": "JILI",
    "image": "/images/slots/3-super-ace.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "97.4%",
    "coldPercent": "94.7%",
    "livePlayers": 473,
    "rtpPercent": "97.0%"
  },
  {
    "id": "circus-joker-4096",
    "title": "Circus Joker 4096",
    "provider": "JILI",
    "image": "/images/slots/circus-joker-4096.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "4096",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "95.1%",
    "livePlayers": 409,
    "rtpPercent": "97.0%"
  },
  {
    "id": "gates-of-hades",
    "title": "Gates of Hades",
    "provider": "PP",
    "image": "/images/slots/gates-of-hades.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "101.0%",
    "livePlayers": 312,
    "rtpPercent": "96.5%"
  },
  {
    "id": "pirate-queen-2",
    "title": "Pirate Queen 2",
    "provider": "JILI",
    "image": "/images/slots/pirate-queen-2.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "95.4%",
    "livePlayers": 225,
    "rtpPercent": "97.0%"
  },
  {
    "id": "5-lions-megaways",
    "title": "5 Lions Megaways",
    "provider": "PP",
    "image": "/images/slots/5-lions-megaways.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "117.1%",
    "livePlayers": 375,
    "rtpPercent": "95.5%"
  },
  {
    "id": "voyage-of-daring-queen-x-lock",
    "title": "Voyage of Daring Queen X-Lock",
    "provider": "JDB",
    "image": "/images/slots/voyage-of-daring-queen-x-lock.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jdb.webp",
    "hotPercent": "119.2%",
    "livePlayers": 158,
    "rtpPercent": "96.4%"
  },
  {
    "id": "3-coin-treasures-2",
    "title": "3 Coin Treasures 2",
    "provider": "JILI",
    "image": "/images/slots/3-coin-treasures-2.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "jackpot": true,
    "hotPercent": "97.1%",
    "livePlayers": 301,
    "rtpPercent": "97.0%"
  },
  {
    "id": "crazy777",
    "title": "Crazy777",
    "provider": "JILI",
    "image": "/images/slots/crazy777.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "livePlayers": 171,
    "rtpPercent": "97.0%"
  },
  {
    "id": "wild-west-gold-blazing-bounty",
    "title": "Wild West Gold Blazing Bounty",
    "provider": "PP",
    "image": "/images/slots/wild-west-gold-blazing-bounty.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 113,
    "rtpPercent": "96.4%"
  },
  {
    "id": "gates-of-olympus",
    "title": "Gates of Olympus",
    "provider": "PP",
    "image": "/images/slots/gates-of-olympus.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "78.2%",
    "livePlayers": 166,
    "rtpPercent": "96.5%"
  },
  {
    "id": "pirate-queen",
    "title": "Pirate Queen",
    "provider": "JILI",
    "Jackpot": true,
    "image": "/images/slots/pirate-queen.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "101.8%",
    "livePlayers": 50,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "bandit-megaways",
    "title": "Bandit Megaways",
    "provider": "PP",
    "image": "/images/slots/bandit-megaways.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "53.0%",
    "livePlayers": 37,
    "rtpPercent": "96.5%"
  },
  {
    "id": "sweet-bonanza",
    "title": "Sweet Bonanza",
    "provider": "PP",
    "image": "/images/slots/sweet-bonanza.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "94.7%",
    "livePlayers": 117,
    "rtpPercent": "96.5%"
  },
  {
    "id": "neko-fortune",
    "title": "Neko Fortune",
    "provider": "JILI",
    "image": "/images/slots/neko-fortune.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "90.9%",
    "livePlayers": 98,
    "rtpPercent": "97.0%"
  },
  {
    "id": "ali-baba",
    "title": "Ali Baba",
    "provider": "JILI",
    "image": "/images/slots/ali-baba.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "91.1%",
    "livePlayers": 109,
    "rtpPercent": "97.0%"
  },
  {
    "id": "golden-joker",
    "title": "Golden Joker",
    "provider": "JILI",
    "image": "/images/slots/golden-joker.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "87.9%",
    "livePlayers": 55,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "money-coming-expand-bets",
    "title": "Money Coming Expand Bets",
    "provider": "JILI",
    "image": "/images/slots/money-coming-expand-bets.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "102.5%",
    "livePlayers": 136,
    "rtpPercent": "97.0%"
  },
  {
    "id": "boxing-king-title-match",
    "title": "Boxing King Title Match",
    "provider": "JILI",
    "image": "/images/slots/boxing-king-title-match.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "91.6%",
    "livePlayers": 88,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "elemental-link-fire",
    "title": "Elemental Link Fire",
    "provider": "JDB",
    "image": "/images/slots/elemental-link-fire.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jdb.webp",
    "coldPercent": "69.9%",
    "livePlayers": 30,
    "rtpPercent": "96.0%",
    "jackpot": true
  },
  {
    "id": "blossom-of-wealth",
    "title": "Blossom of Wealth",
    "provider": "JDB",
    "image": "/images/slots/blossom-of-wealth.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jdb.webp",
    "coldPercent": "57.3%",
    "livePlayers": 68,
    "rtpPercent": "96.0%",
    "jackpot": true
  },
  {
    "id": "lucky-jaguar",
    "title": "Lucky Jaguar",
    "provider": "JILI",
    "image": "/images/slots/lucky-jaguar.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "livePlayers": 54,
    "rtpPercent": "97.0%"
  },
  {
    "id": "vampy-party",
    "title": "Vampy Party",
    "provider": "PP",
    "image": "/images/slots/vampy-party.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "76.9%",
    "livePlayers": 39,
    "rtpPercent": "96.0%"
  },
  {
    "id": "golden-empire-2",
    "title": "Golden Empire 2",
    "provider": "JILI",
    "image": "/images/slots/golden-empire-2.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "98.0%",
    "livePlayers": 57
  },
  {
    "id": "wisdom-of-athena-1000",
    "title": "Wisdom of Athena 1000",
    "provider": "PP",
    "image": "/images/slots/wisdom-of-athena-1000.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "131.1%",
    "livePlayers": 42,
    "rtpPercent": "96.0%"
  },
  {
    "id": "bone-fortune",
    "title": "Bone Fortune",
    "provider": "JILI",
    "image": "/images/slots/bone-fortune.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "100.8%",
    "livePlayers": 60,
    "rtpPercent": "97.0%"
  },
  {
    "id": "big-bass-bonanza-keeping-it-reel",
    "title": "Big Bass Bonanza - Keeping it Reel",
    "provider": "PP",
    "image": "/images/slots/big-bass-bonanza-keeping-it-reel.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "45.3%",
    "rtpPercent": "96.0%"
  },
  {
    "id": "starlight-princess",
    "title": "Starlight Princess",
    "provider": "PP",
    "image": "/images/slots/starlight-princess.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Science Fiction",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "80.4%",
    "livePlayers": 61,
    "rtpPercent": "96.5%"
  },
  {
    "id": "teeed-up",
    "title": "TEEED UP!",
    "provider": "JDB",
    "image": "/images/slots/teeed-up.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "new": true,
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jdb.webp",
    "coldPercent": "70.8%",
    "livePlayers": 81,
    "rtpPercent": "96.5%"
  },
  {
    "id": "3-charge-buffalo",
    "title": "3 Charge Buffalo",
    "provider": "JILI",
    "image": "/images/slots/3-charge-buffalo.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "88.4%",
    "livePlayers": 51,
    "rtpPercent": "96.2%"
  },
  {
    "id": "lucky-goldbricks",
    "title": "Lucky Goldbricks",
    "provider": "JILI",
    "image": "/images/slots/lucky-goldbricks.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "92.6%",
    "livePlayers": 19,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "candy-blitz-bombs",
    "title": "Candy Blitz Bombs",
    "provider": "PP",
    "image": "/images/slots/candy-blitz-bombs.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "109.7%",
    "livePlayers": 31,
    "rtpPercent": "96.4%"
  },
  {
    "id": "mayan-empire",
    "title": "Mayan Empire",
    "provider": "JILI",
    "image": "/images/slots/mayan-empire.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "89.2%",
    "livePlayers": 15,
    "rtpPercent": "97.0%"
  },
  {
    "id": "fortunepig",
    "title": "FortunePig",
    "provider": "JILI",
    "image": "/images/slots/fortunepig.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "livePlayers": 298,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "charge-buffalo",
    "title": "Charge Buffalo",
    "provider": "JILI",
    "image": "/images/slots/charge-buffalo.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "100.7%",
    "livePlayers": 34,
    "rtpPercent": "97.0%"
  },
  {
    "id": "romax",
    "title": "RomaX",
    "provider": "JILI",
    "image": "/images/slots/romax.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "jackpot": true,
    "hotPercent": "99.2%",
    "livePlayers": 45,
    "rtpPercent": "97.0%"
  },
  {
    "id": "gates-of-olympus-xmas-1000",
    "title": "Gates of Olympus Xmas 1000",
    "provider": "PP",
    "image": "/images/slots/gates-of-olympus-xmas-1000.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "67.0%",
    "livePlayers": 23,
    "rtpPercent": "96.5%"
  },
  {
    "id": "shogun",
    "title": "Shogun",
    "provider": "JILI",
    "image": "/images/slots/shogun.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "72.4%",
    "livePlayers": 4,
    "rtpPercent": "97.0%"
  },
  {
    "id": "shanghai-beauty",
    "title": "Shanghai Beauty",
    "provider": "JILI",
    "image": "/images/slots/shanghai-beauty.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Romantic",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "68.7%",
    "livePlayers": 17,
    "rtpPercent": "97.0%"
  },
  {
    "id": "ragnarok-thor-vs-loki",
    "title": "Ragnarok : Thor VS Loki",
    "provider": "JDB",
    "image": "/images/slots/ragnarok-thor-vs-loki.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jdb.webp",
    "coldPercent": "25.4%",
    "livePlayers": 8
  },
  {
    "id": "cash-bonanza",
    "title": "Cash Bonanza",
    "provider": "PP",
    "image": "/images/slots/cash-bonanza.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 1,
    "rtpPercent": "95.5%"
  },
  {
    "id": "bonus-hunter",
    "title": "Bonus Hunter",
    "provider": "JILI",
    "image": "/images/slots/bonus-hunter.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "85.9%",
    "livePlayers": 26,
    "rtpPercent": "97.0%"
  },
  {
    "id": "10-sparkling-crown",
    "title": "10 Sparkling Crown",
    "provider": "JILI",
    "image": "/images/slots/10-sparkling-crown.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "83.2%",
    "livePlayers": 27,
    "rtpPercent": "97.0%"
  },
  {
    "id": "resurrecting-riches",
    "title": "Resurrecting Riches",
    "provider": "PP",
    "image": "/images/slots/resurrecting-riches.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "62.9%",
    "livePlayers": 36,
    "rtpPercent": "96.5%"
  },
  {
    "id": "fortune-treasure",
    "title": "Fortune Treasure",
    "provider": "JDB",
    "image": "/images/slots/fortune-treasure.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jdb.webp",
    "hotPercent": "116.4%",
    "livePlayers": 52,
    "rtpPercent": "95.9%",
    "jackpot": true
  },
  {
    "id": "magic-lamp",
    "title": "Magic Lamp",
    "provider": "JILI",
    "image": "/images/slots/magic-lamp.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "86.9%",
    "livePlayers": 15,
    "rtpPercent": "97.0%"
  },
  {
    "id": "sweet-land",
    "title": "Sweet Land",
    "provider": "JILI",
    "image": "/images/slots/sweet-land.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "137.4%",
    "livePlayers": 45,
    "rtpPercent": "97.0%"
  },
  {
    "id": "sevensevenseven",
    "title": "SevenSevenSeven",
    "provider": "JILI",
    "image": "/images/slots/sevensevenseven.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "80.2%",
    "livePlayers": 38,
    "rtpPercent": "97.0%"
  },
  {
    "id": "zeus-vs-hades-gods-of-war",
    "title": "Zeus vs Hades - Gods of War",
    "provider": "PP",
    "image": "/images/slots/zeus-vs-hades-gods-of-war.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "42.5%",
    "livePlayers": 26,
    "rtpPercent": "96.0%"
  },
  {
    "id": "clover-coins-4x4",
    "title": "Clover Coins 4x4",
    "provider": "JILI",
    "image": "/images/slots/clover-coins-4x4.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Romantic",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "93.5%",
    "livePlayers": 51,
    "rtpPercent": "97.0%"
  },
  {
    "id": "book-of-monsters",
    "title": "Book of Monsters",
    "provider": "PP",
    "image": "/images/slots/book-of-monsters.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "111.4%",
    "livePlayers": 4,
    "rtpPercent": "96.5%"
  },
  {
    "id": "sugar-supreme-powernudge",
    "title": "Sugar Supreme Powernudge",
    "provider": "PP",
    "image": "/images/slots/sugar-supreme-powernudge.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "37.8%",
    "livePlayers": 31,
    "rtpPercent": "96.0%"
  },
  {
    "id": "coin-of-lightning",
    "title": "Coin of Lightning",
    "provider": "JILI",
    "image": "/images/slots/coin-of-lightning.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "85.7%",
    "livePlayers": 22,
    "rtpPercent": "97.0%"
  },
  {
    "id": "fire-stampede",
    "title": "Fire Stampede",
    "provider": "PP",
    "image": "/images/slots/fire-stampede.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "115.4%",
    "livePlayers": 13,
    "rtpPercent": "96.0%"
  },
  {
    "id": "billionaire",
    "title": "Billionaire",
    "provider": "JDB",
    "image": "/images/slots/billionaire.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jdb.webp",
    "hotPercent": "113.8%",
    "livePlayers": 23,
    "rtpPercent": "96.5%",
    "jackpot": true
  },
  {
    "id": "wild-racer",
    "title": "Wild Racer",
    "provider": "JILI",
    "image": "/images/slots/wild-racer.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "cold",
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "99.2%",
    "coldPercent": "95.3%",
    "livePlayers": 2,
    "rtpPercent": "97.0%"
  },
  {
    "id": "clover-coins-3x3",
    "title": "Clover Coins 3x3",
    "provider": "JILI",
    "image": "/images/slots/clover-coins-3x3.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "cold",
      "max-rpt"
    ],
    "theme": "Romantic",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "117.3%",
    "coldPercent": "87.6%",
    "livePlayers": 20,
    "rtpPercent": "97.0%"
  },
  {
    "id": "fortune-tree",
    "title": "Fortune Tree",
    "provider": "JILI",
    "image": "/images/slots/fortune-tree.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "98.8%",
    "coldPercent": "74.0%",
    "livePlayers": 13,
    "rtpPercent": "97.0%"
  },
  {
    "id": "super-rich",
    "title": "Super Rich",
    "provider": "JILI",
    "image": "/images/slots/super-rich.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "75.0%",
    "livePlayers": 41,
    "rtpPercent": "97.0%"
  },
  {
    "id": "twin-wins",
    "title": "TWIN WINS",
    "provider": "JILI",
    "image": "/images/slots/twin-wins.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "livePlayers": 17,
    "rtpPercent": "97.0%"
  },
  {
    "id": "king-arthur",
    "title": "King Arthur",
    "provider": "JILI",
    "image": "/images/slots/king-arthur.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "113.7%",
    "livePlayers": 10,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "sweet-magic",
    "title": "Sweet Magic",
    "provider": "JILI",
    "image": "/images/slots/sweet-magic.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "86.0%",
    "livePlayers": 21,
    "rtpPercent": "97.0%"
  },
  {
    "id": "gold-rush",
    "title": "Gold Rush",
    "provider": "JILI",
    "image": "/images/slots/gold-rush.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "89.7%",
    "livePlayers": 11,
    "rtpPercent": "97.0%"
  },
  {
    "id": "jungle-king",
    "title": "Jungle King",
    "provider": "JILI",
    "image": "/images/slots/jungle-king.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "livePlayers": 5,
    "rtpPercent": "97.0%"
  },
  {
    "id": "bubble-beauty",
    "title": "Bubble Beauty",
    "provider": "JILI",
    "image": "/images/slots/bubble-beauty.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Romantic",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "66.4%",
    "livePlayers": 15,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "wild-west-duels",
    "title": "Wild West Duels",
    "provider": "PP",
    "image": "/images/slots/wild-west-duels.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "97.6%",
    "livePlayers": 4,
    "rtpPercent": "96.0%"
  },
  {
    "id": "master-tiger",
    "Jackpot": true,
    "title": "Master Tiger",
    "provider": "JILI",
    "image": "/images/slots/master-tiger.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "87.4%",
    "livePlayers": 24,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "golden-bank",
    "title": "Golden Bank",
    "provider": "JILI",
    "image": "/images/slots/golden-bank.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "81.5%",
    "livePlayers": 3,
    "rtpPercent": "97.0%"
  },
  {
    "id": "devil-fire-twins",
    "title": "Devil Fire Twins",
    "provider": "JILI",
    "image": "/images/slots/devil-fire-twins.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "97.8%",
    "livePlayers": 63,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "fruity-treats",
    "title": "Fruity Treats",
    "provider": "PP",
    "image": "/images/slots/fruity-treats.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 3,
    "rtpPercent": "96.0%"
  },
  {
    "id": "blitz-super-wheel",
    "title": "Blitz Super Wheel",
    "provider": "PP",
    "image": "/images/slots/blitz-super-wheel.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "86.1%",
    "livePlayers": 6,
    "rtpPercent": "96.5%"
  },
  {
    "id": "big-bass-bonanza-megaways",
    "title": "Big Bass Bonanza Megaways",
    "provider": "PP",
    "image": "/images/slots/big-bass-bonanza-megaways.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "3.0%",
    "livePlayers": 8,
    "rtpPercent": "95.6%"
  },
  {
    "id": "fa-fa-fa",
    "title": "Fa Fa Fa",
    "provider": "JILI",
    "image": "/images/slots/fa-fa-fa.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "60.1%",
    "livePlayers": 9,
    "rtpPercent": "97.0%"
  },
  {
    "id": "lucky-jaguar-2",
    "title": "Lucky Jaguar 2",
    "provider": "JILI",
    "image": "/images/slots/lucky-jaguar-2.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "101.5%",
    "livePlayers": 41,
    "rtpPercent": "97.0%"
  },
  {
    "id": "buffalo-king-megaways",
    "title": "Buffalo King Megaways",
    "provider": "PP",
    "image": "/images/slots/buffalo-king-megaways.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "86.0%",
    "rtpPercent": "95.5%"
  },
  {
    "id": "crazy777-2",
    "title": "Crazy777 2",
    "provider": "JILI",
    "image": "/images/slots/crazy777-2.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "87.5%",
    "livePlayers": 13,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "wheel-o-gold",
    "title": "Wheel O'Gold",
    "provider": "PP",
    "image": "/images/slots/wheel-o-gold.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "78.2%",
    "livePlayers": 5,
    "rtpPercent": "96.0%"
  },
  {
    "id": "wild-west-gold",
    "title": "Wild West Gold",
    "provider": "PP",
    "image": "/images/slots/wild-west-gold.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "50.6%",
    "livePlayers": 7,
    "rtpPercent": "96.5%"
  },
  {
    "id": "samba",
    "title": "Samba",
    "provider": "JILI",
    "image": "/images/slots/samba.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "87.8%",
    "livePlayers": 30,
    "rtpPercent": "97.0%"
  },
  {
    "id": "wild-beach-party",
    "title": "Wild Beach Party",
    "provider": "PP",
    "image": "/images/slots/wild-beach-party.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "26.8%",
    "livePlayers": 2,
    "rtpPercent": "95.4%"
  },
  {
    "id": "hot-to-burn-hold-and-spin",
    "title": "Hot to Burn Hold and Spin",
    "provider": "PP",
    "image": "/images/slots/hot-to-burn-hold-and-spin.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "110.1%",
    "livePlayers": 2,
    "rtpPercent": "96.7%"
  },
  {
    "id": "lucky-coming",
    "title": "Lucky Coming",
    "provider": "JILI",
    "image": "/images/slots/lucky-coming.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "79.0%",
    "livePlayers": 2,
    "rtpPercent": "97.0%"
  },
  {
    "id": "day-of-dead",
    "title": "Day of Dead",
    "provider": "PP",
    "image": "/images/slots/day-of-dead.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "54.9%",
    "livePlayers": 5,
    "rtpPercent": "95.5%"
  },
  {
    "id": "gem-fire-fortune",
    "title": "Gem Fire Fortune",
    "provider": "PP",
    "image": "/images/slots/gem-fire-fortune.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "55.8%",
    "coldPercent": "55.8%"
  },
  {
    "id": "mining-rush",
    "title": "Mining Rush",
    "provider": "PP",
    "image": "/images/slots/mining-rush.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "63.9%",
    "livePlayers": 1,
    "rtpPercent": "96.5%"
  },
  {
    "id": "volcano-goddess",
    "title": "Volcano Goddess",
    "provider": "PP",
    "image": "/images/slots/volcano-goddess.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "115.0%",
    "livePlayers": 16,
    "rtpPercent": "96.4%"
  },
  {
    "id": "3-coin-wild-horse",
    "title": "3 Coin Wild Horse",
    "provider": "JILI",
    "image": "/images/slots/3-coin-wild-horse.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "84.0%",
    "livePlayers": 13,
    "rtpPercent": "97.0%"
  },
  {
    "id": "3-coin-wild-tiger",
    "title": "3 Coin Wild Tiger",
    "provider": "JILI",
    "image": "/images/slots/3-coin-wild-tiger.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "91.3%",
    "livePlayers": 19,
    "rtpPercent": "97.0%"
  },
  {
    "id": "mining-rush-2",
    "title": "Mining Rush",
    "provider": "PP",
    "image": "/images/slots/mining-rush-2.webp",
    "category": [
      "bonus"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp"
  },
  {
    "id": "voyage-of-blast-raider-x-lock",
    "title": "Voyage of Blast Raider X-Lock",
    "provider": "JDB",
    "image": "/images/slots/voyage-of-blast-raider-x-lock.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jdb.webp",
    "coldPercent": "60.9%",
    "livePlayers": 16,
    "rtpPercent": "96.4%"
  },
  {
    "id": "book-of-gold",
    "title": "Book of Gold",
    "provider": "JILI",
    "image": "/images/slots/book-of-gold.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "57.8%",
    "livePlayers": 38,
    "rtpPercent": "97.0%"
  },
  {
    "id": "starz-megaways",
    "title": "Starz Megaways",
    "provider": "PP",
    "image": "/images/slots/starz-megaways.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Science Fiction",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.4%"
  },
  {
    "id": "fruit-party-2",
    "title": "Fruit Party 2",
    "provider": "PP",
    "image": "/images/slots/fruit-party-2.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "38.5%",
    "livePlayers": 1,
    "rtpPercent": "95.4%"
  },
  {
    "id": "cash-elevator",
    "title": "Cash Elevator",
    "provider": "PP",
    "image": "/images/slots/cash-elevator.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "86.6%",
    "rtpPercent": "96.6%"
  },
  {
    "id": "lantern-wealth",
    "title": "Lantern Wealth",
    "provider": "JDB",
    "image": "/images/slots/lantern-wealth.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jdb.webp",
    "coldPercent": "55.2%",
    "livePlayers": 3,
    "rtpPercent": "95.9%",
    "jackpot": true
  },
  {
    "id": "rooster-in-love",
    "title": "Rooster In Love",
    "provider": "JDB",
    "image": "/images/slots/rooster-in-love.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Romantic",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jdb.webp",
    "coldPercent": "75.5%",
    "livePlayers": 5,
    "rtpPercent": "96.7%",
    "jackpot": true
  },
  {
    "id": "fortunehorse",
    "title": "FortuneHorse",
    "provider": "JDB",
    "image": "/images/slots/fortunehorse.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jdb.webp",
    "livePlayers": 7,
    "rtpPercent": "95.9%",
    "jackpot": true
  },
  {
    "id": "treasure-quest",
    "title": "Treasure Quest",
    "provider": "JILI",
    "image": "/images/slots/treasure-quest.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "89.5%",
    "livePlayers": 7,
    "rtpPercent": "97.0%"
  },
  {
    "id": "party-night",
    "title": "Party Night",
    "provider": "JILI",
    "image": "/images/slots/party-night.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "108.8%",
    "livePlayers": 33,
    "rtpPercent": "97.0%"
  },
  {
    "id": "wild-wild-joker",
    "title": "Wild Wild Joker",
    "provider": "PP",
    "image": "/images/slots/wild-wild-joker.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "114.6%",
    "livePlayers": 47,
    "rtpPercent": "96.4%"
  },
  {
    "id": "wonder-elephant",
    "title": "Wonder Elephant",
    "provider": "JDB",
    "image": "/images/slots/wonder-elephant.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jdb.webp",
    "coldPercent": "53.7%",
    "livePlayers": 6,
    "rtpPercent": "95.9%",
    "jackpot": true
  },
  {
    "id": "flirting-scholar-tang",
    "title": "Flirting Scholar Tang",
    "provider": "JDB",
    "image": "/images/slots/flirting-scholar-tang.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jdb.webp",
    "coldPercent": "60.0%",
    "livePlayers": 6,
    "rtpPercent": "96.4%",
    "jackpot": true
  },
  {
    "id": "agent-ace",
    "title": "Agent Ace",
    "provider": "JILI",
    "image": "/images/slots/agent-ace.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "106.9%",
    "livePlayers": 12,
    "rtpPercent": "97.0%"
  },
  {
    "id": "thor-x",
    "title": "Thor X",
    "provider": "JILI",
    "image": "/images/slots/thor-x.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "livePlayers": 7,
    "rtpPercent": "97.0%"
  },
  {
    "id": "golden-queen",
    "title": "Golden Queen",
    "provider": "JILI",
    "image": "/images/slots/golden-queen.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "81.0%",
    "livePlayers": 10,
    "rtpPercent": "97.0%"
  },
  {
    "id": "20-blazing-clover",
    "title": "20 Blazing Clover",
    "provider": "JILI",
    "image": "/images/slots/20-blazing-clover.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Romantic",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "livePlayers": 14,
    "rtpPercent": "97.0%"
  },
  {
    "id": "cleocatra",
    "title": "Cleocatra",
    "provider": "PP",
    "image": "/images/slots/cleocatra.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "14.4%",
    "rtpPercent": "96.2%"
  },
  {
    "id": "sweet-powernudge",
    "title": "Sweet Powernudge",
    "provider": "PP",
    "image": "/images/slots/sweet-powernudge.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 5,
    "rtpPercent": "96.0%"
  },
  {
    "id": "hot-pepper",
    "title": "Hot Pepper",
    "provider": "PP",
    "image": "/images/slots/hot-pepper.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "41.0%",
    "livePlayers": 2,
    "rtpPercent": "96.4%"
  },
  {
    "id": "mustang-gold-megaways",
    "title": "Mustang Gold Megaways",
    "provider": "PP",
    "image": "/images/slots/mustang-gold-megaways.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins",
      "Prize Pool"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 1,
    "rtpPercent": "96.5%"
  },
  {
    "id": "world-cup",
    "title": "World Cup",
    "provider": "JILI",
    "image": "/images/slots/world-cup.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "80.5%",
    "livePlayers": 9,
    "rtpPercent": "97.0%"
  },
  {
    "id": "golden-bank-2",
    "title": "Golden Bank 2",
    "provider": "JILI",
    "image": "/images/slots/golden-bank-2.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "97.1%",
    "livePlayers": 7,
    "rtpPercent": "97.0%"
  },
  {
    "id": "lucky-caramelo",
    "title": "Lucky Caramelo",
    "provider": "JILI",
    "image": "/images/slots/lucky-caramelo.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "110.9%",
    "livePlayers": 15,
    "rtpPercent": "97.0%"
  },
  {
    "id": "monster-superlanche",
    "title": "Monster Superlanche",
    "provider": "PP",
    "image": "/images/slots/monster-superlanche.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "24.9%",
    "rtpPercent": "96.0%"
  },
  {
    "id": "treasure-wild",
    "title": "Treasure Wild",
    "provider": "PP",
    "image": "/images/slots/treasure-wild.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "128.1%",
    "livePlayers": 22,
    "rtpPercent": "96.5%"
  },
  {
    "id": "buffalo-king-untamed-megaways",
    "title": "Buffalo King Untamed Megaways",
    "provider": "PP",
    "image": "/images/slots/buffalo-king-untamed-megaways.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "45.1%",
    "livePlayers": 6,
    "rtpPercent": "96.0%"
  },
  {
    "id": "winning-mask",
    "title": "Winning Mask",
    "provider": "JDB",
    "image": "/images/slots/winning-mask.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jdb.webp",
    "coldPercent": "74.4%",
    "livePlayers": 7,
    "rtpPercent": "96.0%",
    "jackpot": true
  },
  {
    "id": "happy-taxi",
    "title": "Happy Taxi",
    "provider": "JILI",
    "image": "/images/slots/happy-taxi.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "88.0%",
    "livePlayers": 16,
    "rtpPercent": "97.0%"
  },
  {
    "id": "safari-mystery",
    "title": "Safari Mystery",
    "provider": "JILI",
    "image": "/images/slots/safari-mystery.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "60.3%",
    "livePlayers": 10
  },
  {
    "id": "fruity-wheel",
    "title": "Fruity Wheel",
    "provider": "JILI",
    "image": "/images/slots/fruity-wheel.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "75.5%",
    "livePlayers": 9,
    "rtpPercent": "97.0%"
  },
  {
    "id": "strawberry-cocktail",
    "title": "Strawberry Cocktail",
    "provider": "PP",
    "image": "/images/slots/strawberry-cocktail.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "181.4%",
    "livePlayers": 8,
    "rtpPercent": "96.0%"
  },
  {
    "id": "fortune-of-giza",
    "title": "Fortune of Giza",
    "provider": "PP",
    "image": "/images/slots/fortune-of-giza.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "38.2%",
    "rtpPercent": "96.5%"
  },
  {
    "id": "egyptian-fortunes",
    "title": "Egyptian Fortunes",
    "provider": "PP",
    "image": "/images/slots/egyptian-fortunes.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "51.3%",
    "rtpPercent": "96.5%"
  },
  {
    "id": "gems-bonanza",
    "title": "Gems Bonanza",
    "provider": "PP",
    "image": "/images/slots/gems-bonanza.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "41.8%",
    "livePlayers": 7,
    "rtpPercent": "96.5%"
  },
  {
    "id": "heart-of-cleopatra",
    "title": "Heart of Cleopatra",
    "provider": "PP",
    "image": "/images/slots/heart-of-cleopatra.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "133.4%",
    "livePlayers": 3,
    "rtpPercent": "96.4%"
  },
  {
    "id": "sweet-bonanza-xmas",
    "title": "Sweet Bonanza Xmas",
    "provider": "PP",
    "image": "/images/slots/sweet-bonanza-xmas.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "34.9%",
    "livePlayers": 10,
    "rtpPercent": "96.4%"
  },
  {
    "id": "5-lions-megaways-2",
    "title": "5 Lions Megaways 2",
    "provider": "PP",
    "image": "/images/slots/5-lions-megaways-2.webp",
    "category": [
      "bonus",
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "67.6%",
    "livePlayers": 4,
    "rtpPercent": "96.5%"
  },
  {
    "id": "3-lucky-lion",
    "title": "3 Lucky Lion",
    "provider": "JILI",
    "image": "/images/slots/3-lucky-lion.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "85.0%",
    "livePlayers": 7
  },
  {
    "id": "big-bass-secrets-of-the-golden-lake",
    "title": "Big Bass Secrets of the Golden Lake",
    "provider": "PP",
    "image": "/images/slots/big-bass-secrets-of-the-golden-lake.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  },
  {
    "id": "release-the-bison",
    "title": "Release the Bison",
    "provider": "PP",
    "image": "/images/slots/release-the-bison.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "30.3%",
    "livePlayers": 2,
    "rtpPercent": "96.5%"
  },
  {
    "id": "emerald-king",
    "title": "Emerald King",
    "provider": "PP",
    "image": "/images/slots/emerald-king.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 21,
    "rtpPercent": "96.5%"
  },
  {
    "id": "gem-elevator",
    "title": "Gem Elevator",
    "provider": "PP",
    "image": "/images/slots/gem-elevator.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "bow-of-artemis",
    "title": "Bow of Artemis",
    "provider": "PP",
    "image": "/images/slots/bow-of-artemis.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "7.5%",
    "livePlayers": 1,
    "rtpPercent": "96.0%"
  },
  {
    "id": "jackpot-hunter",
    "title": "Jackpot Hunter",
    "provider": "PP",
    "image": "/images/slots/jackpot-hunter.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  },
  {
    "id": "book-of-golden-sands",
    "title": "Book of Golden Sands",
    "provider": "PP",
    "image": "/images/slots/book-of-golden-sands.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "80.2%",
    "rtpPercent": "96.4%"
  },
  {
    "id": "mystic-chief",
    "title": "Mystic Chief",
    "provider": "PP",
    "image": "/images/slots/mystic-chief.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "mjolnir",
    "title": "Mjolnir",
    "provider": "JDB",
    "image": "/images/slots/mjolnir.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jdb.webp",
    "hotPercent": "148.0%",
    "livePlayers": 15,
    "rtpPercent": "96.5%",
    "jackpot": true
  },
  {
    "id": "xiyangyang",
    "title": "XiYangYang",
    "provider": "JDB",
    "image": "/images/slots/xiyangyang.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jdb.webp",
    "livePlayers": 9,
    "rtpPercent": "95.9%",
    "jackpot": true
  },
  {
    "id": "lucky-doggy",
    "title": "Lucky Doggy",
    "provider": "JILI",
    "image": "/images/slots/lucky-doggy.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "56.7%",
    "livePlayers": 1,
    "rtpPercent": "97.0%"
  },
  {
    "id": "3-witch-s-lamp",
    "title": "3 Witch's Lamp",
    "provider": "JILI",
    "image": "/images/slots/3-witch-s-lamp.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "104.8%",
    "livePlayers": 11,
    "rtpPercent": "97.0%"
  },
  {
    "id": "barn-festival",
    "title": "Barn Festival",
    "provider": "PP",
    "image": "/images/slots/barn-festival.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "80.0%",
    "livePlayers": 2,
    "rtpPercent": "95.3%"
  },
  {
    "id": "jungle-gorilla",
    "title": "Jungle Gorilla",
    "provider": "PP",
    "image": "/images/slots/jungle-gorilla.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "54.4%",
    "rtpPercent": "96.5%"
  },
  {
    "id": "starlight-christmas",
    "title": "Starlight Christmas",
    "provider": "PP",
    "image": "/images/slots/starlight-christmas.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Science Fiction",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 3,
    "rtpPercent": "96.5%"
  },
  {
    "id": "release-the-kraken-megawaystm",
    "title": "Release the Kraken Megaways\u2122",
    "provider": "PP",
    "image": "/images/slots/release-the-kraken-megawaystm.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "126.9%",
    "livePlayers": 5,
    "rtpPercent": "96.0%"
  },
  {
    "id": "chin-shi-huang",
    "title": "Chin Shi Huang",
    "provider": "JILI",
    "image": "/images/slots/chin-shi-huang.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "38.0%",
    "livePlayers": 6,
    "rtpPercent": "97.0%"
  },
  {
    "id": "3-coin-treasures",
    "title": "3 Coin Treasures",
    "provider": "JILI",
    "image": "/images/slots/3-coin-treasures.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "104.8%",
    "livePlayers": 22,
    "rtpPercent": "97.0%"
  },
  {
    "id": "pharaoh-treasure",
    "title": "Pharaoh Treasure",
    "provider": "JILI",
    "image": "/images/slots/pharaoh-treasure.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "188.0%",
    "livePlayers": 18,
    "rtpPercent": "97.0%"
  },
  {
    "id": "the-dragon-tiger",
    "title": "The Dragon Tiger",
    "provider": "PP",
    "image": "/images/slots/the-dragon-tiger.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "42.7%",
    "livePlayers": 2,
    "rtpPercent": "96.5%"
  },
  {
    "id": "gods-of-giza",
    "title": "Gods of Giza",
    "provider": "PP",
    "image": "/images/slots/gods-of-giza.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "27.4%",
    "livePlayers": 3,
    "rtpPercent": "96.0%"
  },
  {
    "id": "moleionaire",
    "title": "Moleionaire",
    "provider": "PP",
    "image": "/images/slots/moleionaire.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  },
  {
    "id": "forging-wilds",
    "title": "Forging Wilds",
    "provider": "PP",
    "image": "/images/slots/forging-wilds.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 5,
    "rtpPercent": "96.5%"
  },
  {
    "id": "santa",
    "title": "Santa",
    "provider": "PP",
    "image": "/images/slots/santa.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "95.9%"
  },
  {
    "id": "towering-fortunes",
    "title": "Towering Fortunes",
    "provider": "PP",
    "image": "/images/slots/towering-fortunes.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "eternal-empress-freeze-time",
    "title": "Eternal Empress - Freeze Time",
    "provider": "PP",
    "image": "/images/slots/eternal-empress-freeze-time.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 3,
    "rtpPercent": "96.5%"
  },
  {
    "id": "star-bounty",
    "title": "Star Bounty",
    "provider": "PP",
    "image": "/images/slots/star-bounty.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Science Fiction",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "92.9%",
    "livePlayers": 4,
    "rtpPercent": "96.6%"
  },
  {
    "id": "the-red-queen",
    "title": "The Red Queen",
    "provider": "PP",
    "image": "/images/slots/the-red-queen.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Romantic",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  },
  {
    "id": "wild-wild-riches-megaways",
    "title": "Wild Wild Riches Megaways",
    "provider": "PP",
    "image": "/images/slots/wild-wild-riches-megaways.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins",
      "Prize Pool"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  },
  {
    "id": "the-llama-adventure",
    "title": "The Llama Adventure",
    "provider": "JDB",
    "image": "/images/slots/the-llama-adventure.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jdb.webp",
    "livePlayers": 1,
    "rtpPercent": "96.2%",
    "jackpot": true
  },
  {
    "id": "new-year",
    "title": "New Year",
    "provider": "JDB",
    "image": "/images/slots/new-year.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jdb.webp",
    "coldPercent": "46.0%",
    "livePlayers": 7,
    "rtpPercent": "96.3%",
    "jackpot": true
  },
  {
    "id": "gorilla-mayhem",
    "title": "Gorilla Mayhem",
    "provider": "PP",
    "image": "/images/slots/gorilla-mayhem.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "5-lions-dance",
    "title": "5 Lions Dance",
    "provider": "PP",
    "image": "/images/slots/5-lions-dance.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "mahjong-panda",
    "title": "Mahjong Panda",
    "provider": "PP",
    "image": "/images/slots/mahjong-panda.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.4%"
  },
  {
    "id": "mahjong-wins-bonus",
    "title": "Mahjong Wins Bonus",
    "provider": "PP",
    "image": "/images/slots/mahjong-wins-bonus.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.4%"
  },
  {
    "id": "moonshot",
    "title": "Moonshot",
    "provider": "PP",
    "image": "/images/slots/moonshot.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "amazing-money-machine",
    "title": "Amazing Money Machine",
    "provider": "PP",
    "image": "/images/slots/amazing-money-machine.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "64.1%",
    "rtpPercent": "96.4%"
  },
  {
    "id": "big-bass-floats-my-boat",
    "title": "Big Bass Floats My Boat",
    "provider": "PP",
    "image": "/images/slots/big-bass-floats-my-boat.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 13,
    "rtpPercent": "96.0%"
  },
  {
    "id": "big-burger-load-it-up-with-xtra-cheese",
    "title": "Big Burger Load it up with Xtra cheese",
    "provider": "PP",
    "image": "/images/slots/big-burger-load-it-up-with-xtra-cheese.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  },
  {
    "id": "gates-of-valhalla",
    "title": "Gates of Valhalla",
    "provider": "PP",
    "image": "/images/slots/gates-of-valhalla.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 19,
    "rtpPercent": "96.4%"
  },
  {
    "id": "drago-jewels-of-fortune",
    "title": "Drago - Jewels of Fortune",
    "provider": "PP",
    "image": "/images/slots/drago-jewels-of-fortune.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "aladdin-and-the-sorcerer",
    "title": "Aladdin and the Sorcerer",
    "provider": "PP",
    "image": "/images/slots/aladdin-and-the-sorcerer.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 5,
    "rtpPercent": "96.2%"
  },
  {
    "id": "gates-of-aztec",
    "title": "Gates of Aztec",
    "provider": "PP",
    "image": "/images/slots/gates-of-aztec.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "money-stacks",
    "title": "Money Stacks",
    "provider": "PP",
    "image": "/images/slots/money-stacks.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "125.7%",
    "livePlayers": 3,
    "rtpPercent": "96.5%"
  },
  {
    "id": "the-big-dawgs",
    "title": "The Big Dawgs",
    "provider": "PP",
    "image": "/images/slots/the-big-dawgs.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "152.2%",
    "livePlayers": 11,
    "rtpPercent": "95.9%"
  },
  {
    "id": "busy-bees",
    "title": "Busy Bees",
    "provider": "PP",
    "image": "/images/slots/busy-bees.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  },
  {
    "id": "bonanza-gold",
    "title": "Bonanza Gold",
    "provider": "PP",
    "image": "/images/slots/bonanza-gold.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "candy-village",
    "title": "Candy Village",
    "provider": "PP",
    "image": "/images/slots/candy-village.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "95.4%"
  },
  {
    "id": "chicken-drop",
    "title": "Chicken Drop",
    "provider": "PP",
    "image": "/images/slots/chicken-drop.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 34,
    "rtpPercent": "96.5%"
  },
  {
    "id": "the-great-chicken-escape",
    "title": "The Great Chicken Escape",
    "provider": "PP",
    "image": "/images/slots/the-great-chicken-escape.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 4,
    "rtpPercent": "96.5%"
  },
  {
    "id": "candy-jar-clusters",
    "title": "Candy Jar Clusters",
    "provider": "PP",
    "image": "/images/slots/candy-jar-clusters.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "95.0%"
  },
  {
    "id": "sweet-kingdom",
    "title": "Sweet Kingdom",
    "provider": "PP",
    "image": "/images/slots/sweet-kingdom.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "gears-of-horus",
    "title": "Gears of Horus",
    "provider": "PP",
    "image": "/images/slots/gears-of-horus.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "64.0%",
    "rtpPercent": "95.0%"
  },
  {
    "id": "colossal-cash-zone",
    "title": "Colossal Cash Zone",
    "provider": "PP",
    "image": "/images/slots/colossal-cash-zone.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "33.3%",
    "livePlayers": 3,
    "rtpPercent": "96.5%"
  },
  {
    "id": "crank-it-up",
    "title": "Crank It Up",
    "provider": "PP",
    "image": "/images/slots/crank-it-up.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "95.9%"
  },
  {
    "id": "devilicious",
    "title": "Devilicious",
    "provider": "PP",
    "image": "/images/slots/devilicious.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 5,
    "rtpPercent": "96.4%"
  },
  {
    "id": "the-dog-house-muttley-crew",
    "title": "The Dog House \u2013 Muttley Crew",
    "provider": "PP",
    "image": "/images/slots/the-dog-house-muttley-crew.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "the-dog-house-royal-hunt",
    "title": "The Dog House Royal Hunt",
    "provider": "PP",
    "image": "/images/slots/the-dog-house-royal-hunt.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 3,
    "rtpPercent": "96.5%"
  },
  {
    "id": "the-dog-house-dog-or-alive",
    "title": "The Dog House Dog or Alive",
    "provider": "PP",
    "image": "/images/slots/the-dog-house-dog-or-alive.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 1,
    "rtpPercent": "96.5%"
  },
  {
    "id": "the-dog-house-multihold",
    "title": "The Dog House Multihold",
    "provider": "PP",
    "image": "/images/slots/the-dog-house-multihold.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "41.8%",
    "rtpPercent": "96.0%"
  },
  {
    "id": "dragon-hero",
    "title": "Dragon Hero",
    "provider": "PP",
    "image": "/images/slots/dragon-hero.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "60.7%",
    "rtpPercent": "96.0%"
  },
  {
    "id": "drill-that-gold",
    "title": "Drill that Gold",
    "provider": "PP",
    "image": "/images/slots/drill-that-gold.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.4%"
  },
  {
    "id": "8-dragons",
    "title": "8 Dragons",
    "provider": "PP",
    "image": "/images/slots/8-dragons.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "88.4%",
    "livePlayers": 3,
    "rtpPercent": "96.3%"
  },
  {
    "id": "emerald-king-rainbow-road",
    "title": "Emerald King Rainbow Road",
    "provider": "PP",
    "image": "/images/slots/emerald-king-rainbow-road.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.7%"
  },
  {
    "id": "empty-the-bank",
    "title": "Empty the Bank",
    "provider": "PP",
    "image": "/images/slots/empty-the-bank.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.4%"
  },
  {
    "id": "fire-hot-20",
    "title": "Fire Hot 20",
    "provider": "PP",
    "image": "/images/slots/fire-hot-20.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "95.2%"
  },
  {
    "id": "candy-corner",
    "title": "Candy Corner",
    "provider": "PP",
    "image": "/images/slots/candy-corner.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "82.0%",
    "livePlayers": 4,
    "rtpPercent": "96.5%"
  },
  {
    "id": "fruits-of-the-amazon",
    "title": "Fruits of the Amazon",
    "provider": "PP",
    "image": "/images/slots/fruits-of-the-amazon.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "fruit-party",
    "title": "Fruit Party",
    "provider": "PP",
    "image": "/images/slots/fruit-party.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "gatot-kaca-s-fury",
    "title": "Gatot Kaca's Fury",
    "provider": "PP",
    "image": "/images/slots/gatot-kaca-s-fury.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "gates-of-gatot-kaca",
    "title": "Gates of Gatot Kaca",
    "provider": "PP",
    "image": "/images/slots/gates-of-gatot-kaca.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "rabbit-garden",
    "title": "Rabbit Garden",
    "provider": "PP",
    "image": "/images/slots/rabbit-garden.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "51.3%",
    "rtpPercent": "96.0%"
  },
  {
    "id": "hercules-and-pegasus",
    "title": "Hercules and Pegasus",
    "provider": "PP",
    "image": "/images/slots/hercules-and-pegasus.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "honey-honey-honey",
    "title": "Honey Honey Honey",
    "provider": "PP",
    "image": "/images/slots/honey-honey-honey.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "african-elephant",
    "title": "African Elephant",
    "provider": "PP",
    "image": "/images/slots/african-elephant.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp"
  },
  {
    "id": "release-the-kraken",
    "title": "Release the Kraken",
    "provider": "PP",
    "image": "/images/slots/release-the-kraken.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "release-the-kraken-2",
    "title": "Release the Kraken 2",
    "provider": "PP",
    "image": "/images/slots/release-the-kraken-2.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "110.5%",
    "coldPercent": "85.6%",
    "livePlayers": 3,
    "rtpPercent": "96.0%"
  },
  {
    "id": "gems-of-serengeti",
    "title": "Gems of Serengeti",
    "provider": "PP",
    "image": "/images/slots/gems-of-serengeti.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.4%"
  },
  {
    "id": "leprechaun-song",
    "title": "Leprechaun Song",
    "provider": "PP",
    "image": "/images/slots/leprechaun-song.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.4%"
  },
  {
    "id": "leprechaun-carol",
    "title": "Leprechaun Carol",
    "provider": "PP",
    "image": "/images/slots/leprechaun-carol.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "lobster-bob-s-sea-food-and-win-it",
    "title": "Lobster Bob's Sea Food and Win It",
    "provider": "PP",
    "image": "/images/slots/lobster-bob-s-sea-food-and-win-it.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  },
  {
    "id": "pinup-girls",
    "title": "Pinup Girls",
    "provider": "PP",
    "image": "/images/slots/pinup-girls.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.4%"
  },
  {
    "id": "the-magic-cauldron",
    "title": "The Magic Cauldron",
    "provider": "PP",
    "image": "/images/slots/the-magic-cauldron.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.4%"
  },
  {
    "id": "mammoth-gold-megaways",
    "title": "Mammoth Gold Megaways",
    "provider": "PP",
    "image": "/images/slots/mammoth-gold-megaways.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins",
      "Prize Pool"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  },
  {
    "id": "medusa-s-stone",
    "title": "Medusa\u2019s Stone",
    "provider": "PP",
    "image": "/images/slots/medusa-s-stone.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "36.4%",
    "livePlayers": 7,
    "rtpPercent": "96.4%"
  },
  {
    "id": "blade-fangs",
    "title": "Blade & Fangs",
    "provider": "PP",
    "image": "/images/slots/blade-fangs.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "139.4%",
    "livePlayers": 5,
    "rtpPercent": "96.0%"
  },
  {
    "id": "yeti-quest",
    "title": "Yeti Quest",
    "provider": "PP",
    "image": "/images/slots/yeti-quest.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 8,
    "rtpPercent": "96.0%"
  },
  {
    "id": "hand-of-midas-2",
    "title": "Hand of Midas 2",
    "provider": "PP",
    "image": "/images/slots/hand-of-midas-2.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 1,
    "rtpPercent": "96.0%"
  },
  {
    "id": "wukong-rush",
    "title": "Wukong Rush",
    "provider": "PP",
    "image": "/images/slots/wukong-rush.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "mighty-munching-melons",
    "title": "Mighty Munching Melons",
    "provider": "PP",
    "image": "/images/slots/mighty-munching-melons.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  },
  {
    "id": "mochimon",
    "title": "Mochimon",
    "provider": "PP",
    "image": "/images/slots/mochimon.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "pirate-golden-age",
    "title": "Pirate Golden Age",
    "provider": "PP",
    "image": "/images/slots/pirate-golden-age.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.4%"
  },
  {
    "id": "muertos-multiplier-megaways",
    "title": "Muertos Multiplier Megaways",
    "provider": "PP",
    "image": "/images/slots/muertos-multiplier-megaways.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  },
  {
    "id": "clover-gold",
    "title": "Clover Gold",
    "provider": "PP",
    "image": "/images/slots/clover-gold.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "95.5%"
  },
  {
    "id": "nile-fortune",
    "title": "Nile Fortune",
    "provider": "PP",
    "image": "/images/slots/nile-fortune.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  },
  {
    "id": "octobeer-fortunes",
    "title": "Octobeer Fortunes",
    "provider": "PP",
    "image": "/images/slots/octobeer-fortunes.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "pyramid-bonanza",
    "title": "Pyramid Bonanza",
    "provider": "PP",
    "image": "/images/slots/pyramid-bonanza.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.4%"
  },
  {
    "id": "phoenix-forge",
    "title": "Phoenix Forge",
    "provider": "PP",
    "image": "/images/slots/phoenix-forge.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "207.9%",
    "livePlayers": 41,
    "rtpPercent": "95.5%"
  },
  {
    "id": "aztec-smash",
    "title": "Aztec Smash",
    "provider": "PP",
    "image": "/images/slots/aztec-smash.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "santa-s-great-gifts",
    "title": "Santa's Great Gifts",
    "provider": "PP",
    "image": "/images/slots/santa-s-great-gifts.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "70.6%",
    "livePlayers": 4,
    "rtpPercent": "96.2%"
  },
  {
    "id": "mystery-mice",
    "title": "Mystery Mice",
    "provider": "PP",
    "image": "/images/slots/mystery-mice.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "36.9%",
    "rtpPercent": "96.4%"
  },
  {
    "id": "santa-s-xmas-rush",
    "title": "Santa's Xmas Rush",
    "provider": "PP",
    "image": "/images/slots/santa-s-xmas-rush.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "59.1%",
    "livePlayers": 6,
    "rtpPercent": "96.5%"
  },
  {
    "id": "great-rhino",
    "title": "Great Rhino",
    "provider": "PP",
    "image": "/images/slots/great-rhino.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "great-rhino-deluxe",
    "title": "Great Rhino Deluxe",
    "provider": "PP",
    "image": "/images/slots/great-rhino-deluxe.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 2,
    "rtpPercent": "96.0%"
  },
  {
    "id": "rock-vegas",
    "title": "Rock Vegas",
    "provider": "PP",
    "image": "/images/slots/rock-vegas.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.6%"
  },
  {
    "id": "saiyan-maniatm",
    "title": "Saiyan Mania\u2122",
    "provider": "PP",
    "image": "/images/slots/saiyan-maniatm.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "santa-s-wonderland",
    "title": "Santa's Wonderland",
    "provider": "PP",
    "image": "/images/slots/santa-s-wonderland.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 11,
    "rtpPercent": "96.2%"
  },
  {
    "id": "shining-hot-20",
    "title": "Shining Hot 20",
    "provider": "PP",
    "image": "/images/slots/shining-hot-20.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.3%"
  },
  {
    "id": "heroic-spins",
    "title": "Heroic Spins",
    "provider": "PP",
    "image": "/images/slots/heroic-spins.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  }
]

const slotsBatch2: SlotGame[] = [
  {
    "id": "the-knight-king",
    "title": "The Knight King",
    "provider": "PP",
    "image": "/images/slots/the-knight-king.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  },
  {
    "id": "smugglers-cove",
    "title": "Smugglers Cove",
    "provider": "PP",
    "image": "/images/slots/smugglers-cove.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "shield-of-sparta",
    "title": "Shield of Sparta",
    "provider": "PP",
    "image": "/images/slots/shield-of-sparta.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "pot-of-fortune",
    "title": "Pot of Fortune",
    "provider": "PP",
    "image": "/images/slots/pot-of-fortune.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  },
  {
    "id": "ice-lobster",
    "title": "Ice Lobster",
    "provider": "PP",
    "image": "/images/slots/ice-lobster.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  },
  {
    "id": "the-great-stick-up",
    "title": "The Great Stick-Up",
    "provider": "PP",
    "image": "/images/slots/the-great-stick-up.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "31.1%",
    "rtpPercent": "96.3%"
  },
  {
    "id": "super-x",
    "title": "Super X",
    "provider": "PP",
    "image": "/images/slots/super-x.webp",
    "category": [
      "bonus",
      "cold",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "15.0%",
    "livePlayers": 2,
    "rtpPercent": "96.5%"
  },
  {
    "id": "sword-of-ares",
    "title": "Sword of Ares",
    "provider": "PP",
    "image": "/images/slots/sword-of-ares.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.4%"
  },
  {
    "id": "trees-of-treasure",
    "title": "Trees of Treasure",
    "provider": "PP",
    "image": "/images/slots/trees-of-treasure.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "93.9%",
    "rtpPercent": "96.1%"
  },
  {
    "id": "black-bull",
    "title": "Black Bull",
    "provider": "PP",
    "image": "/images/slots/black-bull.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "aztec-treasure-hunt",
    "title": "Aztec Treasure Hunt",
    "provider": "PP",
    "image": "/images/slots/aztec-treasure-hunt.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "33.2%",
    "livePlayers": 3,
    "rtpPercent": "96.0%"
  },
  {
    "id": "the-tweety-house",
    "title": "The Tweety House",
    "provider": "PP",
    "image": "/images/slots/the-tweety-house.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "95.5%"
  },
  {
    "id": "the-ultimate-5",
    "title": "The Ultimate 5",
    "provider": "PP",
    "image": "/images/slots/the-ultimate-5.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "down-the-rails",
    "title": "Down the Rails",
    "provider": "PP",
    "image": "/images/slots/down-the-rails.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "wild-booster",
    "title": "Wild Booster",
    "provider": "PP",
    "image": "/images/slots/wild-booster.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.4%"
  },
  {
    "id": "wildman-super-bonanza",
    "title": "Wildman Super Bonanza",
    "provider": "PP",
    "image": "/images/slots/wildman-super-bonanza.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "wild-pixies",
    "title": "Wild Pixies",
    "provider": "PP",
    "image": "/images/slots/wild-pixies.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "greedy-wolf",
    "title": "Greedy Wolf",
    "provider": "PP",
    "image": "/images/slots/greedy-wolf.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 1,
    "rtpPercent": "96.4%"
  },
  {
    "id": "christmas-carol-megaways",
    "title": "Christmas Carol Megaways",
    "provider": "PP",
    "image": "/images/slots/christmas-carol-megaways.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "year-of-the-dragon-king",
    "title": "Year of the Dragon King",
    "provider": "PP",
    "image": "/images/slots/year-of-the-dragon-king.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 1,
    "rtpPercent": "96.0%"
  },
  {
    "id": "cheeky-emperor",
    "title": "Cheeky Emperor",
    "provider": "PP",
    "image": "/images/slots/cheeky-emperor.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "dance-party",
    "title": "Dance Party",
    "provider": "PP",
    "image": "/images/slots/dance-party.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "disco-lady",
    "title": "Disco Lady",
    "provider": "PP",
    "image": "/images/slots/disco-lady.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "eye-of-cleopatra",
    "title": "Eye of Cleopatra",
    "provider": "PP",
    "image": "/images/slots/eye-of-cleopatra.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 1,
    "rtpPercent": "96.5%"
  },
  {
    "id": "the-wild-machine",
    "title": "The Wild Machine",
    "provider": "PP",
    "image": "/images/slots/the-wild-machine.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "pirate-gold-deluxe",
    "title": "Pirate Gold Deluxe",
    "provider": "PP",
    "image": "/images/slots/pirate-gold-deluxe.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 1,
    "rtpPercent": "96.4%"
  },
  {
    "id": "rainbow-reels",
    "title": "Rainbow Reels",
    "provider": "PP",
    "image": "/images/slots/rainbow-reels.webp",
    "category": [
      "bonus",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "21.8%",
    "rtpPercent": "96.0%"
  },
  {
    "id": "spartan-king",
    "title": "Spartan King",
    "provider": "PP",
    "image": "/images/slots/spartan-king.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.6%"
  },
  {
    "id": "street-racer",
    "title": "Street Racer",
    "provider": "PP",
    "image": "/images/slots/street-racer.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "voodoo-magic",
    "title": "Voodoo Magic",
    "provider": "PP",
    "image": "/images/slots/voodoo-magic.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 3,
    "rtpPercent": "96.5%"
  },
  {
    "id": "wild-depths",
    "title": "Wild Depths",
    "provider": "PP",
    "image": "/images/slots/wild-depths.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.4%"
  },
  {
    "id": "congo-cash",
    "title": "Congo Cash",
    "provider": "PP",
    "image": "/images/slots/congo-cash.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "juicy-fruits-multihold",
    "title": "Juicy Fruits Multihold",
    "provider": "PP",
    "image": "/images/slots/juicy-fruits-multihold.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "97.2%",
    "rtpPercent": "96.0%"
  },
  {
    "id": "might-of-ra",
    "title": "Might of Ra",
    "provider": "PP",
    "image": "/images/slots/might-of-ra.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.4%"
  },
  {
    "id": "john-hunter-and-the-aztec-treasure",
    "title": "John Hunter and the Aztec Treasure",
    "provider": "PP",
    "image": "/images/slots/john-hunter-and-the-aztec-treasure.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 8,
    "rtpPercent": "96.5%"
  },
  {
    "id": "magic-journey",
    "title": "Magic Journey",
    "provider": "PP",
    "image": "/images/slots/magic-journey.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "the-alter-ego",
    "title": "The Alter Ego",
    "provider": "PP",
    "image": "/images/slots/the-alter-ego.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  },
  {
    "id": "anime-mecha-megawaystm",
    "title": "Anime Mecha Megaways\u2122",
    "provider": "PP",
    "image": "/images/slots/anime-mecha-megawaystm.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Anime",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  },
  {
    "id": "triple-pot-gold",
    "title": "Triple Pot Gold",
    "provider": "PP",
    "image": "/images/slots/triple-pot-gold.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 3,
    "rtpPercent": "96.0%"
  },
  {
    "id": "aztec-king-megaways",
    "title": "Aztec King Megaways",
    "provider": "PP",
    "image": "/images/slots/aztec-king-megaways.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "big-bass-hold-spinner-megawaystm",
    "title": "Big Bass Hold & Spinner Megaways\u2122",
    "provider": "PP",
    "image": "/images/slots/big-bass-hold-spinner-megawaystm.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 3,
    "rtpPercent": "96.7%"
  },
  {
    "id": "money-stacks-megawaystm",
    "title": "Money Stacks Megaways\u2122",
    "provider": "PP",
    "image": "/images/slots/money-stacks-megawaystm.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "brick-house-bonanza",
    "title": "Brick House Bonanza",
    "provider": "PP",
    "image": "/images/slots/brick-house-bonanza.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 20,
    "rtpPercent": "96.5%"
  },
  {
    "id": "running-sushi",
    "title": "Running Sushi",
    "provider": "PP",
    "image": "/images/slots/running-sushi.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  },
  {
    "id": "cash-surge",
    "title": "Cash Surge",
    "provider": "PP",
    "image": "/images/slots/cash-surge.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "117.3%",
    "livePlayers": 11,
    "rtpPercent": "96.5%"
  },
  {
    "id": "chilli-heat-megaways",
    "title": "Chilli Heat Megaways",
    "provider": "PP",
    "image": "/images/slots/chilli-heat-megaways.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 6,
    "rtpPercent": "96.5%"
  },
  {
    "id": "crystal-caverns-megaways",
    "title": "Crystal Caverns Megaways",
    "provider": "PP",
    "image": "/images/slots/crystal-caverns-megaways.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.4%"
  },
  {
    "id": "the-dog-house-megaways",
    "title": "The Dog House Megaways",
    "provider": "PP",
    "image": "/images/slots/the-dog-house-megaways.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 3,
    "rtpPercent": "96.5%"
  },
  {
    "id": "elemental-gems-megaways",
    "title": "Elemental Gems Megaways",
    "provider": "PP",
    "image": "/images/slots/elemental-gems-megaways.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins",
      "Prize Pool"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "95.4%"
  },
  {
    "id": "castle-of-fire",
    "title": "Castle of Fire",
    "provider": "PP",
    "image": "/images/slots/castle-of-fire.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  },
  {
    "id": "blazing-wilds-megaways",
    "title": "Blazing Wilds Megaways",
    "provider": "PP",
    "image": "/images/slots/blazing-wilds-megaways.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins",
      "Prize Pool"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp"
  },
  {
    "id": "floating-dragon-megaways",
    "title": "Floating Dragon Megaways",
    "provider": "PP",
    "image": "/images/slots/floating-dragon-megaways.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.7%"
  },
  {
    "id": "floating-dragon-new-year-festival-ultra-megawaystm-hold-spin",
    "title": "Floating Dragon New Year Festival Ultra Megaways\u2122 Hold & Spin",
    "provider": "PP",
    "image": "/images/slots/floating-dragon-new-year-festival-ultra-megawaystm-hold-spin.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "62.2%",
    "rtpPercent": "96.7%"
  },
  {
    "id": "frogs-bugs",
    "title": "Frogs & Bugs",
    "provider": "PP",
    "image": "/images/slots/frogs-bugs.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.4%"
  },
  {
    "id": "fury-of-odin-megaways",
    "title": "Fury of Odin Megaways",
    "provider": "PP",
    "image": "/images/slots/fury-of-odin-megaways.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "37.5%",
    "livePlayers": 7,
    "rtpPercent": "95.9%"
  },
  {
    "id": "power-of-thor-megaways",
    "title": "Power of Thor Megaways",
    "provider": "PP",
    "image": "/images/slots/power-of-thor-megaways.webp",
    "category": [
      "bonus",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "92.0%",
    "rtpPercent": "96.5%"
  },
  {
    "id": "legend-of-heroes-megaways",
    "title": "Legend of Heroes Megaways",
    "provider": "PP",
    "image": "/images/slots/legend-of-heroes-megaways.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "revenge-of-loki-megaways",
    "title": "Revenge of Loki Megaways",
    "provider": "PP",
    "image": "/images/slots/revenge-of-loki-megaways.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "25.0%",
    "rtpPercent": "96.5%"
  },
  {
    "id": "lucky-fishing-megaways",
    "title": "Lucky Fishing Megaways",
    "provider": "PP",
    "image": "/images/slots/lucky-fishing-megaways.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "madame-destiny-megaways",
    "title": "Madame Destiny Megaways",
    "provider": "PP",
    "image": "/images/slots/madame-destiny-megaways.webp",
    "category": [
      "bonus",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "100.7%",
    "rtpPercent": "96.5%"
  },
  {
    "id": "mahjong-wins-3-black-scatter",
    "title": "Mahjong Wins 3 - Black Scatter",
    "provider": "PP",
    "image": "/images/slots/mahjong-wins-3-black-scatter.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "mahjong-wins-2",
    "title": "Mahjong Wins 2",
    "provider": "PP",
    "image": "/images/slots/mahjong-wins-2.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "barnyard-megahays-megaways",
    "title": "Barnyard Megahays Megaways",
    "provider": "PP",
    "image": "/images/slots/barnyard-megahays-megaways.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "pompeii-megareels-megaways",
    "title": "Pompeii Megareels Megaways",
    "provider": "PP",
    "image": "/images/slots/pompeii-megareels-megaways.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  },
  {
    "id": "sumo-supreme-megaways",
    "title": "Sumo Supreme Megaways",
    "provider": "PP",
    "image": "/images/slots/sumo-supreme-megaways.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "might-of-freya-megawaystm",
    "title": "Might of Freya Megaways\u2122",
    "provider": "PP",
    "image": "/images/slots/might-of-freya-megawaystm.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "raging-waterfall-megaways",
    "title": "Raging Waterfall Megaways",
    "provider": "PP",
    "image": "/images/slots/raging-waterfall-megaways.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "ancient-island-megawaystm",
    "title": "Ancient Island Megaways\u2122",
    "provider": "PP",
    "image": "/images/slots/ancient-island-megawaystm.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "old-gold-miner-megaways",
    "title": "Old Gold Miner Megaways",
    "provider": "PP",
    "image": "/images/slots/old-gold-miner-megaways.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins",
      "Prize Pool"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "pizza-pizza-pizza",
    "title": "PIZZA! PIZZA? PIZZA!",
    "provider": "PP",
    "image": "/images/slots/pizza-pizza-pizza.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  },
  {
    "id": "5-rabbits-megaways",
    "title": "5 Rabbits Megaways",
    "provider": "PP",
    "image": "/images/slots/5-rabbits-megaways.webp",
    "category": [
      "bonus",
      "top-pick",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "great-rhino-megaways",
    "title": "Great Rhino Megaways",
    "provider": "PP",
    "image": "/images/slots/great-rhino-megaways.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 3,
    "rtpPercent": "96.5%"
  },
  {
    "id": "wild-celebrity-bus-megaways",
    "title": "Wild Celebrity Bus Megaways",
    "provider": "PP",
    "image": "/images/slots/wild-celebrity-bus-megaways.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins",
      "Prize Pool"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.0%"
  },
  {
    "id": "rise-of-samurai-megaways-not-available-for-japan-market",
    "title": "Rise of Samurai Megaways  (Not available for Japan market)",
    "provider": "PP",
    "image": "/images/slots/rise-of-samurai-megaways-not-available-for-japan-market.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Anime",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "95.7%"
  },
  {
    "id": "dwarf-dragon",
    "title": "Dwarf & Dragon",
    "provider": "PP",
    "image": "/images/slots/dwarf-dragon.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 1,
    "rtpPercent": "96.5%"
  },
  {
    "id": "candy-stars",
    "title": "Candy Stars",
    "provider": "PP",
    "image": "/images/slots/candy-stars.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 5,
    "rtpPercent": "96.4%"
  },
  {
    "id": "timber-stacks",
    "title": "Timber Stacks",
    "provider": "PP",
    "image": "/images/slots/timber-stacks.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.5%"
  },
  {
    "id": "cowboy-coins",
    "title": "Cowboy Coins",
    "provider": "PP",
    "image": "/images/slots/cowboy-coins.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 7,
    "rtpPercent": "96.0%"
  },
  {
    "id": "witch-heart-megawaystm",
    "title": "Witch Heart Megaways\u2122",
    "provider": "PP",
    "image": "/images/slots/witch-heart-megawaystm.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Romantic",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "71.4%",
    "rtpPercent": "96.4%"
  },
  {
    "id": "the-wild-gang",
    "title": "The Wild Gang",
    "provider": "PP",
    "image": "/images/slots/the-wild-gang.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 1,
    "rtpPercent": "96.2%"
  },
  {
    "id": "wild-west-gold-megaways",
    "title": "Wild West Gold Megaways",
    "provider": "PP",
    "image": "/images/slots/wild-west-gold-megaways.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins",
      "Prize Pool"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 3,
    "rtpPercent": "95.3%"
  },
  {
    "id": "extra-juicy-megaways",
    "title": "Extra Juicy Megaways",
    "provider": "PP",
    "image": "/images/slots/extra-juicy-megaways.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "Megaways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.4%"
  },
  {
    "id": "yum-yum-powerways",
    "title": "Yum Yum Powerways",
    "provider": "PP",
    "image": "/images/slots/yum-yum-powerways.webp",
    "category": [
      "bonus",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pp.webp",
    "rtpPercent": "96.4%"
  },
  {
    "id": "zombie-carnival",
    "title": "Zombie Carnival",
    "provider": "PP",
    "image": "/images/slots/zombie-carnival.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "29.7%",
    "rtpPercent": "95.5%"
  },
  {
    "id": "ways-of-the-qilin",
    "title": "Ways of the Qilin",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/ways-of-the-qilin.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "coldPercent": "82.7%",
    "livePlayers": 770,
    "rtpPercent": "96.6%"
  },
  {
    "id": "golden-eggs",
    "title": "Golden Eggs",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/golden-eggs.webp",
    "category": [
      "top-pick",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Buy Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "hotPercent": "132.4%",
    "livePlayers": 63,
    "rtpPercent": "96.9%"
  },
  {
    "id": "open-sesame",
    "title": "Open Sesame",
    "provider": "JDB",
    "providerLogo": "/images/providers/jdb.webp",
    "image": "/images/slots/open-sesame.webp",
    "category": [
      "top-pick",
      "top",
      "hot",
      "max-rpt",
      "bonus"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "hotPercent": "100.8%",
    "livePlayers": 335,
    "rtpPercent": "96.2%",
    "jackpot": true
  },
  {
    "id": "wild-hot-chilli-reels",
    "title": "Wild Hot Chilli Reels",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/wild-hot-chilli-reels.webp",
    "category": [
      "top-pick",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "hotPercent": "96.0%",
    "livePlayers": 217
  },
  {
    "id": "lucky-neko",
    "title": "Lucky Neko",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/lucky-neko.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Anime",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "coldPercent": "88.8%",
    "livePlayers": 474,
    "rtpPercent": "96.7%"
  },
  {
    "id": "boxing-king",
    "title": "Boxing King",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/boxing-king.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Buy Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "coldPercent": "95.3%",
    "livePlayers": 185,
    "rtpPercent": "97.0%"
  },
  {
    "id": "panda-s-fortune",
    "title": "Panda's Fortune",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/panda-s-fortune.webp",
    "category": [
      "top-pick",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "All Ways",
    "hotPercent": "139.3%",
    "livePlayers": 16,
    "rtpPercent": "96.1%"
  },
  {
    "id": "good-fortune-m",
    "title": "Good Fortune M",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/good-fortune-m.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Romantic",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "coldPercent": "51.8%",
    "livePlayers": 30,
    "rtpPercent": "96.1%"
  },
  {
    "id": "kong",
    "title": "Kong",
    "provider": "JDB",
    "providerLogo": "/images/providers/jdb.webp",
    "image": "/images/slots/kong.webp",
    "category": [
      "top-pick",
      "top",
      "hot",
      "cold",
      "max-rpt",
      "bonus"
    ],
    "theme": "Movie",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "hotPercent": "115.5%",
    "coldPercent": "94.3%",
    "livePlayers": 55,
    "rtpPercent": "95.8%",
    "jackpot": true
  },
  {
    "id": "vault-cracker",
    "title": "Vault Cracker",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/vault-cracker.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventure",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "coldPercent": "72.8%",
    "livePlayers": 19
  },
  {
    "id": "wild-bandito",
    "title": "Wild Bandito",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/wild-bandito.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventure",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "coldPercent": "91.4%",
    "livePlayers": 384,
    "rtpPercent": "96.7%"
  },
  {
    "id": "fa-cai-shen2",
    "title": "Fa Cai Shen2",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/fa-cai-shen2.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "coldPercent": "45.6%",
    "livePlayers": 11,
    "rtpPercent": "96.1%"
  },
  {
    "id": "fa-fa-babies",
    "title": "Fa Fa Babies",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/fa-fa-babies.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Buy Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "coldPercent": "77.4%",
    "livePlayers": 16
  },
  {
    "id": "fortune-ox",
    "title": "Fortune Ox",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/fortune-ox.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "All Ways",
    "coldPercent": "83.1%",
    "livePlayers": 81,
    "rtpPercent": "96.7%"
  },
  {
    "id": "hotspin",
    "title": "HotSpin",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/hotspin.webp",
    "category": [
      "top-pick",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "hotPercent": "123.2%",
    "livePlayers": 10,
    "rtpPercent": "96.1%"
  },
  {
    "id": "dragon-soar-hyper-wild",
    "title": "Dragon Soar - Hyper Wild",
    "provider": "JDB",
    "providerLogo": "/images/providers/jdb.webp",
    "image": "/images/slots/dragon-soar-hyper-wild.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt",
      "bonus"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "coldPercent": "85.9%",
    "livePlayers": 120,
    "rtpPercent": "96.9%",
    "jackpot": true
  },
  {
    "id": "dynamite-riches-megaways",
    "title": "Dynamite Riches Megaways",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/dynamite-riches-megaways.webp",
    "category": [
      "top-pick",
      "top",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "livePlayers": 3
  },
  {
    "id": "treasures-of-aztec",
    "title": "Treasures of Aztec",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/treasures-of-aztec.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "coldPercent": "93.7%",
    "livePlayers": 289,
    "rtpPercent": "96.7%"
  },
  {
    "id": "sweet-pop",
    "title": "Sweet POP",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/sweet-pop.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Buy Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "coldPercent": "65.3%",
    "livePlayers": 6,
    "rtpPercent": "96.1%"
  },
  {
    "id": "piggy-bank",
    "title": "Piggy Bank",
    "provider": "JDB",
    "providerLogo": "/images/providers/jdb.webp",
    "image": "/images/slots/piggy-bank.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt",
      "bonus"
    ],
    "theme": "Entertainment",
    "Jackpot": true,
    "JackpotPrice": 3062.32,
    "features": [
      "Auto Game"
    ],
    "winningLine": "20 lines",
    "coldPercent": "87.4%",
    "livePlayers": 106,
    "rtpPercent": "96.5%",
    "jackpot": true
  },
  {
    "id": "zeus-lightning-power-reels",
    "title": "Zeus' Lightning Power Reels",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/zeus-lightning-power-reels.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "coldPercent": "75.9%",
    "livePlayers": 7,
    "rtpPercent": "95.6%"
  },
  {
    "id": "mahjong-ways",
    "title": "Mahjong Ways",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/mahjong-ways.webp",
    "category": [
      "top-pick",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "hotPercent": "99.9%",
    "livePlayers": 479,
    "rtpPercent": "96.9%"
  },
  {
    "id": "fortune-gems-3",
    "title": "Fortune Gems 3",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/fortune-gems-3.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "coldPercent": "94.8%",
    "livePlayers": 216,
    "rtpPercent": "97.0%"
  },
  {
    "id": "money-tree",
    "title": "Money Tree",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/money-tree.webp",
    "category": [
      "top-pick",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "hotPercent": "126.0%",
    "livePlayers": 29,
    "rtpPercent": "96.1%"
  },
  {
    "id": "pinatas-ponies",
    "title": "Pinatas & Ponies",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/pinatas-ponies.webp",
    "category": [
      "top-pick",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "20 lines",
    "hotPercent": "108.8%",
    "livePlayers": 15,
    "rtpPercent": "95.6%"
  },
  {
    "id": "cocktail-nights",
    "title": "Cocktail Nights",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/cocktail-nights.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "coldPercent": "89.1%",
    "livePlayers": 93,
    "rtpPercent": "96.7%"
  },
  {
    "id": "charge-buffalo-ascent",
    "title": "Charge Buffalo Ascent",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/charge-buffalo-ascent.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "coldPercent": "93.9%",
    "livePlayers": 46,
    "rtpPercent": "97.0%"
  },
  {
    "id": "zeus",
    "title": "Zeus",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/zeus.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "coldPercent": "13.8%",
    "livePlayers": 5,
    "rtpPercent": "97.0%"
  },
  {
    "id": "dragon-s-luck-megawaystm",
    "title": "Dragon's Luck MegaWays\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/dragon-s-luck-megawaystm.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "coldPercent": "86.4%",
    "livePlayers": 3,
    "rtpPercent": "95.6%"
  },
  {
    "id": "speed-winner",
    "title": "Speed Winner",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/speed-winner.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Auto Game"
    ],
    "winningLine": "20 lines",
    "coldPercent": "91.0%",
    "livePlayers": 31,
    "rtpPercent": "96.7%"
  },
  {
    "id": "wheel-money",
    "title": "Wheel Money",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/wheel-money.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243",
    "coldPercent": "88.2%",
    "livePlayers": 6,
    "rtpPercent": "97.0%"
  },
  {
    "id": "bounty-raid-2",
    "title": "Bounty Raid 2",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/bounty-raid-2.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "coldPercent": "74.1%",
    "livePlayers": 11,
    "rtpPercent": "95.6%"
  },
  {
    "id": "wild-bounty-showdown",
    "title": "Wild Bounty Showdown",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/wild-bounty-showdown.webp",
    "category": [
      "top-pick",
      "top",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "livePlayers": 4061,
    "rtpPercent": "96.7%"
  },
  {
    "id": "5-god-beasts",
    "title": "5 God Beasts",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/5-god-beasts.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "coldPercent": "27.2%",
    "rtpPercent": "96.0%"
  },
  {
    "id": "hoard-of-poseidon",
    "title": "Hoard of Poseidon",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/hoard-of-poseidon.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "coldPercent": "37.6%",
    "livePlayers": 5,
    "rtpPercent": "95.7%"
  },
  {
    "id": "asgardian-rising",
    "title": "Asgardian Rising",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/asgardian-rising.webp",
    "category": [
      "top-pick",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "hotPercent": "105.7%",
    "livePlayers": 58,
    "rtpPercent": "96.7%"
  },
  {
    "id": "mummy-s-jewels",
    "title": "Mummy\u2019s Jewels",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/mummy-s-jewels.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "coldPercent": "72.8%",
    "livePlayers": 8,
    "rtpPercent": "96.5%"
  },
  {
    "id": "fire-chibi-2",
    "title": "Fire Chibi 2",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/fire-chibi-2.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Anime",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "coldPercent": "86.6%",
    "livePlayers": 4,
    "rtpPercent": "96.0%"
  },
  {
    "id": "dragon-s-luck-deluxe",
    "title": "Dragon's Luck Deluxe",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/dragon-s-luck-deluxe.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "coldPercent": "35.2%",
    "livePlayers": 3,
    "rtpPercent": "95.7%"
  },
  {
    "id": "midas-fortune",
    "title": "Midas Fortune",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/midas-fortune.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "coldPercent": "93.2%",
    "livePlayers": 47,
    "rtpPercent": "96.7%"
  },
  {
    "id": "flower-fortunes",
    "title": "Flower Fortunes",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/flower-fortunes.webp",
    "category": [
      "top-pick",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "rtpPercent": "96.0%"
  },
  {
    "id": "dragons-clusterbustertm",
    "title": "Dragons Clusterbuster\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/dragons-clusterbustertm.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "coldPercent": "52.0%",
    "livePlayers": 5,
    "rtpPercent": "95.7%"
  },
  {
    "id": "pinata-wins",
    "title": "Pinata Wins",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/pinata-wins.webp",
    "category": [
      "top-pick",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "hotPercent": "99.6%",
    "livePlayers": 5065,
    "rtpPercent": "96.7%"
  },
  {
    "id": "king-kong-shake",
    "title": "King Kong Shake",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/king-kong-shake.webp",
    "category": [
      "top-pick",
      "max-rpt"
    ],
    "theme": "Movie",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "rtpPercent": "96.1%"
  },
  {
    "id": "diamond-royale",
    "title": "Diamond Royale",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/diamond-royale.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Romantic",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "coldPercent": "29.0%",
    "livePlayers": 4,
    "rtpPercent": "95.7%"
  },
  {
    "id": "fortune-rabbit",
    "title": "Fortune Rabbit",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/fortune-rabbit.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Buy Spins",
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "coldPercent": "34.0%",
    "livePlayers": 12,
    "rtpPercent": "96.7%"
  },
  {
    "id": "football-fever-m",
    "title": "Football Fever M",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/football-fever-m.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243",
    "coldPercent": "33.4%",
    "rtpPercent": "96.0%"
  },
  {
    "id": "diamond-blitz",
    "title": "Diamond Blitz",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/diamond-blitz.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Science Fiction",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "coldPercent": "35.6%",
    "livePlayers": 1,
    "rtpPercent": "95.7%"
  },
  {
    "id": "anubis-wrath",
    "title": "Anubis Wrath",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/anubis-wrath.webp",
    "category": [
      "top-pick",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243",
    "hotPercent": "152.6%",
    "livePlayers": 120,
    "rtpPercent": "96.7%"
  },
  {
    "id": "aladdin-s-lamp",
    "title": "Aladdin's lamp",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/aladdin-s-lamp.webp",
    "category": [
      "top-pick",
      "cold",
      "top",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "20 lines",
    "coldPercent": "10.8%",
    "livePlayers": 4,
    "rtpPercent": "96.1%"
  },
  {
    "id": "cash-volt",
    "title": "Cash Volt",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/cash-volt.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Science Fiction",
    "features": [
      "Free Spins"
    ],
    "winningLine": "1024",
    "coldPercent": "64.3%",
    "livePlayers": 2,
    "rtpPercent": "95.7%"
  },
  {
    "id": "zombie-outbreak",
    "title": "Zombie Outbreak",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/zombie-outbreak.webp",
    "category": [
      "top-pick",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "hotPercent": "127.5%",
    "livePlayers": 33,
    "rtpPercent": "96.7%"
  },
  {
    "id": "888-cai-shen",
    "title": "888 Cai Shen",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/888-cai-shen.webp",
    "category": [
      "top-pick",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243",
    "hotPercent": "142.2%",
    "livePlayers": 2,
    "rtpPercent": "96.1%"
  },
  {
    "id": "bounty-raid",
    "title": "Bounty Raid",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/bounty-raid.webp",
    "category": [
      "top-pick",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "20 lines",
    "hotPercent": "97.5%",
    "livePlayers": 44,
    "rtpPercent": "95.7%"
  },
  {
    "id": "yakuza-honor",
    "title": "Yakuza Honor",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/yakuza-honor.webp",
    "category": [
      "top-pick",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "hotPercent": "102.5%",
    "livePlayers": 87,
    "rtpPercent": "96.7%"
  },
  {
    "id": "super-ace-joker",
    "title": "Super Ace Joker",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/super-ace-joker.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "coldPercent": "95.4%",
    "livePlayers": 59,
    "rtpPercent": "97.0%"
  },
  {
    "id": "mr-miser",
    "title": "Mr. Miser",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/mr-miser.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "20 lines",
    "coldPercent": "58.1%",
    "livePlayers": 12,
    "rtpPercent": "96.1%"
  },
  {
    "id": "aztec-spins",
    "title": "Aztec Spins",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/aztec-spins.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "coldPercent": "35.6%",
    "livePlayers": 4,
    "rtpPercent": "95.7%"
  },
  {
    "id": "geisha-s-revenge",
    "title": "Geisha's Revenge",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/geisha-s-revenge.webp",
    "category": [
      "top-pick",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "hotPercent": "115.6%",
    "livePlayers": 223,
    "rtpPercent": "96.8%"
  },
  {
    "id": "wild-disco-night",
    "title": "Wild Disco Night",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/wild-disco-night.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "coldPercent": "78.9%",
    "livePlayers": 6,
    "rtpPercent": "97.0%"
  },
  {
    "id": "777-super-strike",
    "title": "777 Super Strike",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/777-super-strike.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "coldPercent": "46.2%",
    "livePlayers": 2,
    "rtpPercent": "95.7%"
  },
  {
    "id": "mr-treasure-s-fortune",
    "title": "Mr. Treasure\u2019s Fortune",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/mr-treasure-s-fortune.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "Pay Anywhere",
    "coldPercent": "94.2%",
    "livePlayers": 9,
    "rtpPercent": "96.7%"
  },
  {
    "id": "sung-wukong",
    "title": "Sung Wukong",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/sung-wukong.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "coldPercent": "79.0%",
    "livePlayers": 74,
    "rtpPercent": "96.0%"
  },
  {
    "id": "10001-nights",
    "title": "10001 Nights",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/10001-nights.webp",
    "category": [
      "top-pick",
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways",
    "hotPercent": "97.8%",
    "livePlayers": 2,
    "rtpPercent": "95.7%"
  },
  {
    "id": "fortune-coins",
    "title": "Fortune Coins",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/fortune-coins.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "coldPercent": "83.4%",
    "livePlayers": 37,
    "rtpPercent": "97.0%"
  },
  {
    "id": "black-wukong",
    "title": "Black Wukong",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/black-wukong.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "coldPercent": "44.7%",
    "livePlayers": 10,
    "rtpPercent": "95.9%"
  },
  {
    "id": "777-strike",
    "title": "777 Strike",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/777-strike.webp",
    "category": [
      "top-pick",
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways",
    "coldPercent": "66.9%",
    "livePlayers": 51,
    "rtpPercent": "95.8%"
  },
  {
    "id": "fortune-garuda-500",
    "title": "Fortune Garuda 500",
    "provider": "JILI",
    "image": "/images/slots/fortune-garuda-500.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "500",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "91.2%",
    "livePlayers": 931,
    "rtpPercent": "97.0%"
  },
  {
    "id": "jade-legends",
    "title": "Jade Legends",
    "provider": "PP",
    "image": "/images/slots/jade-legends.webp",
    "category": [
      "bonus",
      "top",
      "max-rpt"
    ],
    "new": true,
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 235,
    "rtpPercent": "96.5%"
  },
  {
    "id": "super-serge",
    "title": "Super Serge",
    "provider": "PP",
    "image": "/images/slots/super-serge.webp",
    "category": [
      "bonus",
      "top",
      "cold",
      "max-rpt"
    ],
    "new": true,
    "theme": "Adventures",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "74.9%",
    "livePlayers": 153,
    "rtpPercent": "96.5%"
  },
  {
    "id": "mahjong-wilds",
    "title": "Mahjong Wilds",
    "provider": "CQ9",
    "image": "/images/slots/mahjong-wilds.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "78.3%",
    "livePlayers": 125,
    "rtpPercent": "97.5%"
  },
  {
    "id": "mahjong-wilds-2",
    "title": "Mahjong Wilds 2",
    "provider": "CQ9",
    "image": "/images/slots/mahjong-wilds-2.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "93.0%",
    "livePlayers": 120,
    "rtpPercent": "97.5%"
  },
  {
    "id": "wild-bounty-deluxe",
    "title": "WILD BOUNTY Deluxe",
    "provider": "CQ9",
    "image": "/images/slots/wild-bounty-deluxe.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "83.3%",
    "livePlayers": 29,
    "rtpPercent": "97.3%"
  },
  {
    "id": "mighty-mania",
    "title": "Mighty Mania",
    "provider": "PG",
    "image": "/images/slots/mighty-mania.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "hotPercent": "110.8%",
    "livePlayers": 41,
    "rtpPercent": "96.8%"
  },
  {
    "id": "top-ace",
    "title": "Top Ace",
    "provider": "CQ9",
    "image": "/images/slots/top-ace.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "69.8%",
    "livePlayers": 63,
    "rtpPercent": "97.5%"
  },
  {
    "id": "dj-neko",
    "title": "DJ Neko",
    "provider": "PP",
    "image": "/images/slots/dj-neko.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "48.7%",
    "livePlayers": 8,
    "rtpPercent": "96.5%"
  },
  {
    "id": "reel-royale-showdown",
    "title": "Reel Royale Showdown",
    "provider": "PG",
    "image": "/images/slots/reel-royale-showdown.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "hotPercent": "157.7%",
    "livePlayers": 18,
    "rtpPercent": "96.8%"
  },
  {
    "id": "lucky-neko-2",
    "title": "Lucky Neko 2",
    "provider": "CQ9",
    "image": "/images/slots/lucky-neko-2.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Anime",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "hotPercent": "101.4%",
    "livePlayers": 36,
    "rtpPercent": "97.5%"
  },
  {
    "id": "crazy-crazy-3",
    "title": "Crazy Crazy 3",
    "provider": "CQ9",
    "image": "/images/slots/crazy-crazy-3.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "hotPercent": "133.1%",
    "rtpPercent": "97.2%"
  },
  {
    "id": "legacy-of-olympus",
    "title": "Legacy of Olympus",
    "provider": "CQ9",
    "image": "/images/slots/legacy-of-olympus.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "74.3%",
    "livePlayers": 40,
    "rtpPercent": "97.5%"
  },
  {
    "id": "legacy-of-olympus1000",
    "title": "Legacy of Olympus1000",
    "provider": "CQ9",
    "image": "/images/slots/legacy-of-olympus1000.webp",
    "category": [
      "top",
      "hot",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "1000",
    "providerLogo": "/images/providers/cq9.webp",
    "hotPercent": "119.8%",
    "coldPercent": "91.2%",
    "livePlayers": 28,
    "rtpPercent": "97.5%"
  },
  {
    "id": "shaolin-soccer",
    "title": "Shaolin Soccer",
    "provider": "PG",
    "image": "/images/slots/shaolin-soccer.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Movie",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "hotPercent": "156.9%",
    "livePlayers": 26,
    "rtpPercent": "96.9%"
  },
  {
    "id": "wild-bandito-2",
    "title": "WILD BANDITO 2",
    "provider": "CQ9",
    "image": "/images/slots/wild-bandito-2.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "92.0%",
    "livePlayers": 60,
    "rtpPercent": "97.5%"
  },
  {
    "id": "fortune-gems-legend",
    "title": "Fortune Gems Legend",
    "provider": "JILI",
    "image": "/images/slots/fortune-gems-legend.webp",
    "category": [
      "top",
      "hot",
      "max-rpt",
      "bonus"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "96.0%",
    "livePlayers": 52,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "rave-party-fever",
    "title": "Rave Party Fever",
    "provider": "PG",
    "image": "/images/slots/rave-party-fever.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "Pay Anywhere",
    "providerLogo": "/images/providers/pg.webp",
    "hotPercent": "126.4%",
    "livePlayers": 2,
    "rtpPercent": "96.7%"
  },
  {
    "id": "journey-to-the-wealth",
    "title": "Journey to the Wealth",
    "provider": "PG",
    "image": "/images/slots/journey-to-the-wealth.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "79.5%",
    "livePlayers": 12,
    "rtpPercent": "96.3%"
  },
  {
    "id": "wild-heist-cashout",
    "title": "Wild Heist Cashout",
    "provider": "PG",
    "image": "/images/slots/wild-heist-cashout.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "59.6%",
    "livePlayers": 14,
    "rtpPercent": "96.7%"
  },
  {
    "id": "treasures-of-aztec-1024",
    "title": "Treasures Of Aztec 1024",
    "provider": "CQ9",
    "image": "/images/slots/treasures-of-aztec-1024.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "93.7%",
    "livePlayers": 29,
    "rtpPercent": "97.5%"
  },
  {
    "id": "mahjong-wins",
    "title": "Mahjong Wins",
    "provider": "JDB",
    "image": "/images/slots/mahjong-wins.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/jdb.webp",
    "hotPercent": "107.2%",
    "livePlayers": 26,
    "rtpPercent": "96.9%"
  },
  {
    "id": "top-ace-2",
    "title": "Top Ace 2",
    "provider": "CQ9",
    "image": "/images/slots/top-ace-2.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "78.1%",
    "livePlayers": 49,
    "rtpPercent": "97.5%"
  },
  {
    "id": "fortune-coins-2",
    "title": "Fortune Coins 2",
    "provider": "JILI",
    "image": "/images/slots/fortune-coins-2.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "101.2%",
    "livePlayers": 25,
    "rtpPercent": "97.0%"
  },
  {
    "id": "fortune-ace-super-scatter",
    "title": "Fortune Ace Super Scatter",
    "provider": "PP",
    "image": "/images/slots/fortune-ace-super-scatter.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "109.4%",
    "livePlayers": 15,
    "rtpPercent": "96.5%"
  },
  {
    "id": "werewolf-s-hunt",
    "title": "Werewolf's Hunt",
    "provider": "PG",
    "image": "/images/slots/werewolf-s-hunt.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "55.8%",
    "livePlayers": 5,
    "rtpPercent": "96.7%"
  },
  {
    "id": "sweet-burst",
    "title": "Sweet Burst",
    "provider": "PP",
    "image": "/images/slots/sweet-burst.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "124.4%",
    "livePlayers": 26,
    "rtpPercent": "97.5%"
  },
  {
    "id": "ganesha-fortune",
    "title": "Ganesha Fortune",
    "provider": "PG",
    "image": "/images/slots/ganesha-fortune.webp",
    "category": [
      "top",
      "hot",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "hotPercent": "97.4%",
    "coldPercent": "77.7%",
    "livePlayers": 2,
    "rtpPercent": "96.7%"
  },
  {
    "id": "samba-jewel",
    "title": "Samba Jewel",
    "provider": "JDB",
    "image": "/images/slots/samba-jewel.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/jdb.webp",
    "hotPercent": "97.3%",
    "livePlayers": 4,
    "rtpPercent": "96.0%"
  },
  {
    "id": "big-bass-bonanza-1000",
    "title": "Big Bass Bonanza 1000",
    "provider": "PP",
    "image": "/images/slots/big-bass-bonanza-1000.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "1000",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "85.7%",
    "rtpPercent": "96.5%"
  },
  {
    "id": "fire-stampede-2",
    "title": "Fire Stampede 2",
    "provider": "PP",
    "image": "/images/slots/fire-stampede-2.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "86.2%",
    "coldPercent": "86.2%",
    "livePlayers": 7
  },
  {
    "id": "medusa",
    "title": "Medusa",
    "provider": "JILI",
    "image": "/images/slots/medusa.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jili.webp",
    "livePlayers": 22,
    "rtpPercent": "97.0%"
  },
  {
    "id": "dragon-hatch",
    "title": "Dragon Hatch",
    "provider": "PG",
    "image": "/images/slots/dragon-hatch.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "hotPercent": "100.8%",
    "livePlayers": 2,
    "rtpPercent": "96.8%"
  },
  {
    "id": "jili-caishen",
    "title": "JILI CAISHEN",
    "provider": "JILI",
    "Jackpot": true,
    "image": "/images/slots/jili-caishen.webp",
    "category": [
      "top",
      "cold",
      "max-rpt",
      "bonus"
    ],
    "theme": "Myth & History",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "95.2%",
    "livePlayers": 19,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "chinese-new-year-deluxe",
    "title": "CHINESE NEW YEAR DELUXE",
    "provider": "CQ9",
    "image": "/images/slots/chinese-new-year-deluxe.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "66.3%",
    "livePlayers": 18,
    "rtpPercent": "97.0%"
  },
  {
    "id": "money-coming-2",
    "title": "Money Coming 2",
    "provider": "JILI",
    "image": "/images/slots/money-coming-2.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "20 lines",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "89.9%",
    "livePlayers": 10,
    "rtpPercent": "96.1%"
  },
  {
    "id": "treasures-of-aztec-2",
    "title": "Treasures Of Aztec 2",
    "provider": "CQ9",
    "image": "/images/slots/treasures-of-aztec-2.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "95.0%",
    "livePlayers": 2,
    "rtpPercent": "97.2%"
  },
  {
    "id": "mahjong-wilds-3",
    "title": "Mahjong Wilds 3",
    "provider": "CQ9",
    "image": "/images/slots/mahjong-wilds-3.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "hotPercent": "109.7%",
    "livePlayers": 18,
    "rtpPercent": "97.4%"
  },
  {
    "id": "dragonsworld",
    "title": "DragonsWorld",
    "provider": "JDB",
    "image": "/images/slots/dragonsworld.webp",
    "category": [
      "top",
      "cold",
      "max-rpt",
      "bonus"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jdb.webp",
    "coldPercent": "82.4%",
    "livePlayers": 10,
    "rtpPercent": "95.9%",
    "jackpot": true
  },
  {
    "id": "dragon-hatch-2",
    "title": "Dragon Hatch 2",
    "provider": "PG",
    "image": "/images/slots/dragon-hatch-2.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "94.4%",
    "livePlayers": 8,
    "rtpPercent": "96.7%"
  },
  {
    "id": "casino-spin",
    "title": "Casino Spin",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/casino-spin.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "coldPercent": "64.2%",
    "rtpPercent": "96.0%"
  },
  {
    "id": "cruise-royale",
    "title": "Cruise Royale",
    "provider": "PG",
    "image": "/images/slots/cruise-royale.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "livePlayers": 9,
    "rtpPercent": "96.6%"
  },
  {
    "id": "opera-dynasty",
    "title": "Opera Dynasty",
    "provider": "PG",
    "image": "/images/slots/opera-dynasty.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "41.4%",
    "rtpPercent": "96.7%"
  },
  {
    "id": "fiesta-fortune",
    "title": "Fiesta Fortune",
    "provider": "PP",
    "image": "/images/slots/fiesta-fortune.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "95.3%",
    "livePlayers": 4,
    "rtpPercent": "96.5%"
  },
  {
    "id": "honey-trap-of-diao-chan",
    "title": "Honey Trap of Diao Chan",
    "provider": "PG",
    "image": "/images/slots/honey-trap-of-diao-chan.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "44.7%",
    "livePlayers": 18,
    "rtpPercent": "96.9%"
  },
  {
    "id": "elf-bingo",
    "title": "Elf Bingo",
    "provider": "JILI",
    "Jackpot": true,
    "image": "/images/slots/elf-bingo.webp",
    "category": [
      "top",
      "cold",
      "max-rpt",
      "bonus"
    ],
    "theme": "Entertainment",
    "features": [
      "Buy Spins",
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "65.3%",
    "livePlayers": 20,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "knockout-riches",
    "title": "Knockout Riches",
    "provider": "PG",
    "image": "/images/slots/knockout-riches.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Auto Game",
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "78.8%",
    "livePlayers": 7,
    "rtpPercent": "96.7%"
  },
  {
    "id": "captain-s-bounty",
    "title": "Captain\"s Bounty",
    "provider": "PG",
    "image": "/images/slots/captain-s-bounty.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "hotPercent": "106.1%",
    "rtpPercent": "96.1%"
  },
  {
    "id": "battleground-royale",
    "title": "Battleground Royale",
    "provider": "PG",
    "image": "/images/slots/battleground-royale.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "83.9%",
    "livePlayers": 19,
    "rtpPercent": "96.7%"
  },
  {
    "id": "fruity-candy",
    "title": "Fruity Candy",
    "provider": "PG",
    "image": "/images/slots/fruity-candy.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "85.3%",
    "livePlayers": 7,
    "rtpPercent": "96.7%"
  },
  {
    "id": "wild-bounty-2048",
    "title": "WILD BOUNTY 2048",
    "provider": "CQ9",
    "image": "/images/slots/wild-bounty-2048.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "2048",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "29.9%",
    "livePlayers": 20,
    "rtpPercent": "96.5%"
  },
  {
    "id": "7-monkeys",
    "title": "7 Monkeys",
    "provider": "PP",
    "image": "/images/slots/7-monkeys.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "42.2%",
    "rtpPercent": "92.7%"
  },
  {
    "id": "ultimate-striker",
    "title": "Ultimate Striker",
    "provider": "PG",
    "image": "/images/slots/ultimate-striker.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "89.0%",
    "livePlayers": 5,
    "rtpPercent": "96.7%"
  },
  {
    "id": "win-win-won",
    "title": "Win Win Won",
    "provider": "PG",
    "image": "/images/slots/win-win-won.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "43.2%",
    "livePlayers": 7,
    "rtpPercent": "94.1%"
  },
  {
    "id": "joker-coins-expanded",
    "title": "Joker Coins Expanded",
    "provider": "JILI",
    "image": "/images/slots/joker-coins-expanded.webp",
    "category": [
      "top",
      "hot",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "107.1%",
    "coldPercent": "94.5%",
    "livePlayers": 24,
    "rtpPercent": "97.0%"
  },
  {
    "id": "lucky-jaguar-500",
    "title": "Lucky Jaguar 500",
    "provider": "JILI",
    "image": "/images/slots/lucky-jaguar-500.webp",
    "category": [
      "top",
      "cold",
      "max-rpt",
      "bonus"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "90.8%",
    "livePlayers": 22,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "circus-delight",
    "title": "Circus Delight",
    "provider": "PG",
    "image": "/images/slots/circus-delight.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "65.3%",
    "rtpPercent": "96.7%"
  },
  {
    "id": "ways-of-the-qilin-ultimate",
    "title": "WAYS OF THE QILIN Ultimate",
    "provider": "CQ9",
    "image": "/images/slots/ways-of-the-qilin-ultimate.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "70.8%",
    "livePlayers": 15,
    "rtpPercent": "97.5%"
  },
  {
    "id": "888-dragons",
    "title": "888 Dragons",
    "provider": "PP",
    "image": "/images/slots/888-dragons.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "132.4%",
    "livePlayers": 4,
    "rtpPercent": "96.8%"
  },
  {
    "id": "mystic-potion",
    "title": "Mystic Potion",
    "provider": "PG",
    "image": "/images/slots/mystic-potion.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "79.4%",
    "livePlayers": 2,
    "rtpPercent": "96.7%"
  },
  {
    "id": "sweet-bonanza-2500",
    "title": "Sweet Bonanza 2500",
    "provider": "PP",
    "image": "/images/slots/sweet-bonanza-2500.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Buy Spins",
      "Free Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "112.1%",
    "livePlayers": 10,
    "rtpPercent": "96.5%"
  },
  {
    "id": "sweet-rush-bonanza",
    "title": "Sweet Rush Bonanza",
    "provider": "PP",
    "image": "/images/slots/sweet-rush-bonanza.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Buy Spins",
      "Free Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "83.8%",
    "livePlayers": 7,
    "rtpPercent": "96.5%"
  },
  {
    "id": "lucky-panda",
    "title": "Lucky Panda",
    "provider": "PP",
    "image": "/images/slots/lucky-panda.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "62.7%",
    "livePlayers": 13,
    "rtpPercent": "97.5%"
  },
  {
    "id": "number-king",
    "title": "Number King",
    "provider": "JILI",
    "image": "/images/slots/number-king.webp",
    "category": [
      "top",
      "hot",
      "cold",
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Auto Game"
    ],
    "winningLine": "20 lines",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "104.1%",
    "coldPercent": "92.7%",
    "livePlayers": 3,
    "rtpPercent": "97.0%"
  },
  {
    "id": "oishi-delights",
    "title": "Oishi Delights",
    "provider": "PG",
    "image": "/images/slots/oishi-delights.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "61.8%",
    "livePlayers": 23,
    "rtpPercent": "96.7%"
  },
  {
    "id": "wild-fireworks",
    "title": "Wild Fireworks",
    "provider": "PG",
    "image": "/images/slots/wild-fireworks.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "hotPercent": "127.2%",
    "livePlayers": 5,
    "rtpPercent": "96.7%"
  },
  {
    "id": "hot-dj",
    "title": "Hot DJ",
    "provider": "CQ9",
    "image": "/images/slots/hot-dj.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Buy Spins",
      "Free Spins"
    ],
    "winningLine": "20 lines",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "8.3%",
    "livePlayers": 4,
    "rtpPercent": "96.0%"
  },
  {
    "id": "midnight-thirst",
    "title": "Midnight Thirst",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/midnight-thirst.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "20 lines",
    "hotPercent": "103.5%",
    "rtpPercent": "96.3%"
  },
  {
    "id": "spindrift2",
    "title": "Spindrift2",
    "provider": "JDB",
    "image": "/images/slots/spindrift2.webp",
    "category": [
      "top",
      "hot",
      "max-rpt",
      "bonus"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jdb.webp",
    "hotPercent": "129.3%",
    "livePlayers": 7,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "jurassic-kingdom",
    "title": "Jurassic Kingdom",
    "provider": "PG",
    "image": "/images/slots/jurassic-kingdom.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "85.0%",
    "livePlayers": 7,
    "rtpPercent": "96.7%"
  },
  {
    "id": "cash-mania",
    "title": "Cash Mania",
    "provider": "PG",
    "image": "/images/slots/cash-mania.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "20 lines",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "29.3%",
    "rtpPercent": "96.7%"
  },
  {
    "id": "legacy-of-egypt",
    "title": "Legacy of Egypt",
    "provider": "JILI",
    "image": "/images/slots/legacy-of-egypt.webp",
    "category": [
      "top",
      "hot",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "99.7%",
    "coldPercent": "95.8%",
    "livePlayers": 5,
    "rtpPercent": "97.0%"
  },
  {
    "id": "diner-frenzy-spins",
    "title": "Diner Frenzy Spins",
    "provider": "PG",
    "image": "/images/slots/diner-frenzy-spins.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "hotPercent": "169.2%",
    "livePlayers": 7,
    "rtpPercent": "96.8%"
  },
  {
    "id": "dragon-tiger-luck",
    "title": "Dragon Tiger Luck",
    "provider": "PG",
    "image": "/images/slots/dragon-tiger-luck.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "20 lines",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "44.2%",
    "livePlayers": 10,
    "rtpPercent": "96.9%"
  },
  {
    "id": "fortune-mouse",
    "title": "Fortune Mouse",
    "provider": "PG",
    "image": "/images/slots/fortune-mouse.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "hotPercent": "140.6%",
    "livePlayers": 7,
    "rtpPercent": "96.9%"
  },
  {
    "id": "caishen-wins",
    "title": "Caishen Wins",
    "provider": "PG",
    "image": "/images/slots/caishen-wins.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Buy Spins",
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "37.3%",
    "livePlayers": 12,
    "rtpPercent": "96.9%"
  },
  {
    "id": "zeus-vs-hades-gods-of-war-250",
    "title": "Zeus vs Hades Gods of War 250",
    "provider": "PP",
    "image": "/images/slots/zeus-vs-hades-gods-of-war-250.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "116.5%",
    "rtpPercent": "96.5%"
  },
  {
    "id": "starlight-princess-super-scatter",
    "title": "Starlight Princess Super Scatter",
    "provider": "PP",
    "image": "/images/slots/starlight-princess-super-scatter.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "73.7%",
    "livePlayers": 73,
    "rtpPercent": "96.5%"
  },
  {
    "id": "bingo-mania",
    "title": "Bingo Mania",
    "provider": "PP",
    "image": "/images/slots/bingo-mania.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "Pay Anywhere",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "61.4%",
    "livePlayers": 5,
    "rtpPercent": "96.5%"
  },
  {
    "id": "diner-delights",
    "title": "Diner Delights",
    "provider": "PG",
    "image": "/images/slots/diner-delights.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "32.4%",
    "livePlayers": 13,
    "rtpPercent": "96.7%"
  },
  {
    "id": "coin-tree",
    "title": "Coin Tree",
    "provider": "JILI",
    "image": "/images/slots/coin-tree.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "97.4%",
    "livePlayers": 9,
    "rtpPercent": "97.0%"
  },
  {
    "id": "ganesha-gold",
    "title": "Ganesha Gold",
    "provider": "PG",
    "image": "/images/slots/ganesha-gold.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "51.1%",
    "rtpPercent": "96.0%"
  },
  {
    "id": "jackpot-joker-fever",
    "title": "Jackpot Joker FEVER",
    "provider": "JILI",
    "image": "/images/slots/jackpot-joker-fever.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "90.0%",
    "livePlayers": 3,
    "rtpPercent": "97.0%"
  },
  {
    "id": "big-bass-halloween-3",
    "title": "Big Bass Halloween 3",
    "provider": "PP",
    "image": "/images/slots/big-bass-halloween-3.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "48.9%",
    "livePlayers": 7,
    "rtpPercent": "96.5%"
  },
  {
    "id": "you-can-piggy-bank-on-it",
    "title": "You Can Piggy Bank on it",
    "provider": "PP",
    "image": "/images/slots/you-can-piggy-bank-on-it.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "105.4%",
    "livePlayers": 7,
    "rtpPercent": "96.5%"
  },
  {
    "id": "fortune-of-olympus",
    "title": "Fortune Of Olympus",
    "provider": "PP",
    "image": "/images/slots/fortune-of-olympus.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "82.4%",
    "livePlayers": 2,
    "rtpPercent": "96.5%"
  },
  {
    "id": "3-magic-eggs",
    "title": "3 Magic Eggs",
    "provider": "PP",
    "image": "/images/slots/3-magic-eggs.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "94.0%",
    "livePlayers": 5,
    "rtpPercent": "96.5%"
  },
  {
    "id": "lucky-dice",
    "title": "Lucky Dice",
    "provider": "PP",
    "image": "/images/slots/lucky-dice.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "20 lines",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "49.8%",
    "livePlayers": 20,
    "rtpPercent": "97.5%"
  },
  {
    "id": "lucky-tiger-gold",
    "title": "Lucky Tiger Gold",
    "provider": "PP",
    "image": "/images/slots/lucky-tiger-gold.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "84.4%",
    "livePlayers": 9,
    "rtpPercent": "97.5%"
  },
  {
    "id": "wild-wild-chest",
    "title": "Wild Wild Chest",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/wild-wild-chest.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "coldPercent": "53.6%",
    "rtpPercent": "96.1%"
  },
  {
    "id": "dragon",
    "title": "Dragon",
    "provider": "JDB",
    "image": "/images/slots/dragon.webp",
    "category": [
      "top",
      "cold",
      "max-rpt",
      "bonus"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jdb.webp",
    "coldPercent": "77.7%",
    "livePlayers": 13,
    "rtpPercent": "96.2%",
    "jackpot": true
  },
  {
    "id": "orientanimals",
    "title": "OrientAnimals",
    "provider": "JDB",
    "image": "/images/slots/orientanimals.webp",
    "category": [
      "top",
      "cold",
      "max-rpt",
      "bonus"
    ],
    "theme": "Nature",
    "features": [
      "Prize Pool",
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/jdb.webp",
    "coldPercent": "70.0%",
    "livePlayers": 4,
    "rtpPercent": "95.9%",
    "jackpot": true
  },
  {
    "id": "mermaid-riches",
    "title": "Mermaid Riches",
    "provider": "PG",
    "image": "/images/slots/mermaid-riches.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "hotPercent": "100.5%",
    "livePlayers": 10,
    "rtpPercent": "96.7%"
  },
  {
    "id": "mask-carnival",
    "title": "Mask Carnival",
    "provider": "PG",
    "image": "/images/slots/mask-carnival.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game",
      "Free Spins"
    ],
    "winningLine": "Pay Anywhere",
    "providerLogo": "/images/providers/pg.webp",
    "hotPercent": "110.1%",
    "livePlayers": 4,
    "rtpPercent": "96.7%"
  },
  {
    "id": "the-queen-s-banquet",
    "title": "The Queen\u2019s Banquet",
    "provider": "PG",
    "image": "/images/slots/the-queen-s-banquet.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game",
      "Buy Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "93.8%",
    "livePlayers": 3,
    "rtpPercent": "96.7%"
  },
  {
    "id": "lucky-ball",
    "title": "Lucky Ball",
    "provider": "JILI",
    "image": "/images/slots/lucky-ball.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Buy Spins",
      "Prize Pool"
    ],
    "winningLine": "Pay Anywhere",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "89.9%",
    "livePlayers": 7,
    "rtpPercent": "97.0%"
  },
  {
    "id": "super-golf-drive",
    "title": "Super Golf Drive",
    "provider": "PG",
    "image": "/images/slots/super-golf-drive.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "20 lines",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "48.5%",
    "livePlayers": 5,
    "rtpPercent": "96.7%"
  },
  {
    "id": "gladiator-s-glory",
    "title": "Gladiator's Glory",
    "provider": "PG",
    "image": "/images/slots/gladiator-s-glory.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "livePlayers": 6,
    "rtpPercent": "96.7%"
  },
  {
    "id": "fortune-dragon",
    "title": "Fortune Dragon",
    "provider": "PG",
    "image": "/images/slots/fortune-dragon.webp",
    "category": [
      "top",
      "hot",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "hotPercent": "96.4%",
    "coldPercent": "20.3%",
    "rtpPercent": "96.7%"
  }
]

const slotsBatch3: SlotGame[] = [
  {
    "id": "chicky-run",
    "title": "Chicky Run",
    "provider": "PG",
    "image": "/images/slots/chicky-run.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game",
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "58.4%",
    "livePlayers": 19,
    "rtpPercent": "96.0%"
  },
  {
    "id": "graffiti-rush",
    "title": "Graffiti Rush",
    "provider": "PG",
    "image": "/images/slots/graffiti-rush.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "85.2%",
    "rtpPercent": "96.7%"
  },
  {
    "id": "incan-wonders",
    "title": "Incan Wonders",
    "provider": "PG",
    "image": "/images/slots/incan-wonders.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool",
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "92.4%",
    "livePlayers": 2,
    "rtpPercent": "96.7%"
  },
  {
    "id": "vampirekiss",
    "title": "VampireKiss",
    "provider": "CQ9",
    "image": "/images/slots/vampirekiss.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Buy Spins",
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "78.9%",
    "rtpPercent": "96.0%"
  },
  {
    "id": "supernova",
    "title": "Supernova",
    "provider": "JILI",
    "image": "/images/slots/supernova.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Science Fiction",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "75.5%",
    "livePlayers": 6,
    "rtpPercent": "97.0%"
  },
  {
    "id": "medusa-ii",
    "title": "Medusa II",
    "provider": "PG",
    "image": "/images/slots/medusa-ii.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "43.3%",
    "livePlayers": 5,
    "rtpPercent": "94.9%"
  },
  {
    "id": "egypt-s-book-of-mystery",
    "title": "Egypt\"s Book of Mystery",
    "provider": "PG",
    "image": "/images/slots/egypt-s-book-of-mystery.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "62.9%",
    "livePlayers": 11,
    "rtpPercent": "96.7%"
  },
  {
    "id": "treasure-mine-power-reelstm",
    "title": "Treasure Mine Power Reels\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/treasure-mine-power-reelstm.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "coldPercent": "63.2%",
    "livePlayers": 2
  },
  {
    "id": "triple-tigers",
    "title": "Triple Tigers",
    "provider": "PP",
    "image": "/images/slots/triple-tigers.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Auto Game"
    ],
    "winningLine": "20 lines",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "77.5%",
    "livePlayers": 10,
    "rtpPercent": "97.5%"
  },
  {
    "id": "horse-of-bounty",
    "title": "Horse of Bounty",
    "provider": "JDB",
    "image": "/images/slots/horse-of-bounty.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jdb.webp",
    "coldPercent": "52.8%",
    "livePlayers": 5,
    "rtpPercent": "96.7%"
  },
  {
    "id": "candy-bonanza",
    "title": "Candy Bonanza",
    "provider": "PG",
    "image": "/images/slots/candy-bonanza.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "59.2%",
    "livePlayers": 8,
    "rtpPercent": "96.7%"
  },
  {
    "id": "rise-of-apollo",
    "title": "Rise of Apollo",
    "provider": "PG",
    "image": "/images/slots/rise-of-apollo.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "48.7%",
    "livePlayers": 25,
    "rtpPercent": "96.7%"
  },
  {
    "id": "prosperity-fortune-tree",
    "title": "Prosperity Fortune Tree",
    "provider": "PG",
    "image": "/images/slots/prosperity-fortune-tree.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "80.1%",
    "livePlayers": 5,
    "rtpPercent": "96.7%"
  },
  {
    "id": "disconight-m",
    "title": "DiscoNight M",
    "provider": "CQ9",
    "image": "/images/slots/disconight-m.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "hotPercent": "139.9%",
    "livePlayers": 11,
    "rtpPercent": "96.1%"
  },
  {
    "id": "xmas",
    "title": "Xmas",
    "provider": "CQ9",
    "image": "/images/slots/xmas.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "84.4%",
    "livePlayers": 11,
    "rtpPercent": "97.5%"
  },
  {
    "id": "bakery-bonanza",
    "title": "Bakery Bonanza",
    "provider": "PG",
    "image": "/images/slots/bakery-bonanza.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "hotPercent": "103.8%",
    "livePlayers": 4,
    "rtpPercent": "96.7%"
  },
  {
    "id": "forge-of-wealth",
    "title": "Forge of Wealth",
    "provider": "PG",
    "image": "/images/slots/forge-of-wealth.webp",
    "category": [
      "top",
      "hot",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "hotPercent": "102.8%",
    "coldPercent": "90.2%",
    "livePlayers": 8,
    "rtpPercent": "96.7%"
  },
  {
    "id": "aztec-priestess",
    "title": "Aztec Priestess",
    "provider": "JILI",
    "image": "/images/slots/aztec-priestess.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "94.7%",
    "livePlayers": 20,
    "rtpPercent": "97.0%"
  },
  {
    "id": "keno",
    "title": "Keno",
    "provider": "JILI",
    "image": "/images/slots/keno.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "49.7%",
    "livePlayers": 3,
    "rtpPercent": "97.0%"
  },
  {
    "id": "fortune-monkey",
    "title": "Fortune Monkey",
    "provider": "JILI",
    "image": "/images/slots/fortune-monkey.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "79.6%",
    "livePlayers": 14,
    "rtpPercent": "97.0%"
  },
  {
    "id": "boxing-extravaganza",
    "title": "Boxing Extravaganza",
    "provider": "JILI",
    "image": "/images/slots/boxing-extravaganza.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jili.webp",
    "rtpPercent": "97.0%"
  },
  {
    "id": "queen-of-bounty",
    "title": "Queen of Bounty",
    "provider": "PG",
    "image": "/images/slots/queen-of-bounty.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "hotPercent": "107.5%",
    "livePlayers": 7,
    "rtpPercent": "96.7%"
  },
  {
    "id": "genie-s-3-wishes",
    "title": "Genie\"s 3 Wishes",
    "provider": "PG",
    "image": "/images/slots/genie-s-3-wishes.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "93.0%",
    "rtpPercent": "96.7%"
  },
  {
    "id": "cake-and-ice-cream",
    "title": "Cake and Ice Cream",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/cake-and-ice-cream.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways",
    "coldPercent": "73.1%",
    "rtpPercent": "95.7%"
  },
  {
    "id": "dragon-s-fire",
    "title": "Dragon's Fire",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/dragon-s-fire.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "hotPercent": "57.3%",
    "coldPercent": "57.3%"
  },
  {
    "id": "big-bass-splash-1000",
    "title": "Big Bass Splash 1000",
    "provider": "PP",
    "image": "/images/slots/big-bass-splash-1000.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "11.3%",
    "livePlayers": 2,
    "rtpPercent": "96.5%"
  },
  {
    "id": "aztec-gems-megawaystm",
    "title": "Aztec Gems Megaways\u2122",
    "provider": "PP",
    "image": "/images/slots/aztec-gems-megawaystm.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "75.3%",
    "rtpPercent": "96.5%"
  },
  {
    "id": "fire-stampede-ultimate",
    "title": "Fire Stampede Ultimate",
    "provider": "PP",
    "image": "/images/slots/fire-stampede-ultimate.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "41.0%",
    "coldPercent": "41.0%"
  },
  {
    "id": "starlight-princess-pachi",
    "title": "Starlight Princess Pachi",
    "provider": "PP",
    "image": "/images/slots/starlight-princess-pachi.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Romantic",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "113.5%",
    "livePlayers": 9,
    "rtpPercent": "96.0%"
  },
  {
    "id": "destiny-of-sun-moon",
    "title": "Destiny of Sun & Moon",
    "provider": "PG",
    "image": "/images/slots/destiny-of-sun-moon.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "79.5%",
    "livePlayers": 3,
    "rtpPercent": "96.8%"
  },
  {
    "id": "win-win-fish-prawn-crab",
    "title": "Win Win Fish Prawn Crab",
    "provider": "PG",
    "image": "/images/slots/win-win-fish-prawn-crab.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "58.6%",
    "rtpPercent": "96.7%"
  },
  {
    "id": "lucky-piggy",
    "title": "Lucky Piggy",
    "provider": "PG",
    "image": "/images/slots/lucky-piggy.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "64.0%",
    "livePlayers": 9,
    "rtpPercent": "96.7%"
  },
  {
    "id": "mafia-mayhem",
    "title": "Mafia Mayhem",
    "provider": "PG",
    "image": "/images/slots/mafia-mayhem.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "hotPercent": "102.3%",
    "livePlayers": 8,
    "rtpPercent": "96.7%"
  },
  {
    "id": "museum-mystery",
    "title": "Museum Mystery",
    "provider": "PG",
    "image": "/images/slots/museum-mystery.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "27.1%",
    "livePlayers": 21,
    "rtpPercent": "96.7%"
  },
  {
    "id": "jackpot-joker",
    "title": "Jackpot Joker",
    "provider": "JILI",
    "image": "/images/slots/jackpot-joker.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "89.7%",
    "livePlayers": 6,
    "rtpPercent": "97.0%"
  },
  {
    "id": "go-for-champion",
    "title": "Go For Champion",
    "provider": "JILI",
    "image": "/images/slots/go-for-champion.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "61.5%",
    "livePlayers": 6,
    "rtpPercent": "97.0%"
  },
  {
    "id": "the-great-icescape",
    "title": "The Great Icescape",
    "provider": "PG",
    "image": "/images/slots/the-great-icescape.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "34.9%",
    "livePlayers": 9,
    "rtpPercent": "96.3%"
  },
  {
    "id": "phoenix-rises",
    "title": "Phoenix Rises",
    "provider": "PG",
    "image": "/images/slots/phoenix-rises.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "46.1%",
    "livePlayers": 6,
    "rtpPercent": "96.7%"
  },
  {
    "id": "mahjong-break",
    "title": "Mahjong Break",
    "provider": "CQ9",
    "image": "/images/slots/mahjong-break.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "hotPercent": "107.4%",
    "livePlayers": 3,
    "rtpPercent": "97.1%"
  },
  {
    "id": "dragon-s-luck-power-reels",
    "title": "Dragon's Luck Power Reels",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/dragon-s-luck-power-reels.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "livePlayers": 2,
    "rtpPercent": "96.1%"
  },
  {
    "id": "epic-journey",
    "title": "Epic Journey",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/epic-journey.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "rtpPercent": "96.2%"
  },
  {
    "id": "jackpot-quest",
    "title": "Jackpot Quest",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/jackpot-quest.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "coldPercent": "26.5%",
    "rtpPercent": "96.3%"
  },
  {
    "id": "john-hunter-the-book-of-tut-respin",
    "title": "John Hunter & the Book of Tut Respin",
    "provider": "PP",
    "image": "/images/slots/john-hunter-the-book-of-tut-respin.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "94.4%",
    "rtpPercent": "95.5%"
  },
  {
    "id": "inca-queen",
    "title": "Inca Queen",
    "provider": "PP",
    "image": "/images/slots/inca-queen.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "123.0%",
    "livePlayers": 23,
    "rtpPercent": "96.5%"
  },
  {
    "id": "caishen-s-gold",
    "title": "Caishen's Gold",
    "provider": "PP",
    "image": "/images/slots/caishen-s-gold.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "103.5%",
    "livePlayers": 11,
    "rtpPercent": "97.0%"
  },
  {
    "id": "777-rush",
    "title": "777 Rush",
    "provider": "PP",
    "image": "/images/slots/777-rush.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "106.8%",
    "livePlayers": 10,
    "rtpPercent": "97.5%"
  },
  {
    "id": "wheel-of-happiness",
    "title": "Wheel of Happiness",
    "provider": "PP",
    "image": "/images/slots/wheel-of-happiness.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "56.7%",
    "rtpPercent": "96.4%"
  },
  {
    "id": "glamorousgirl",
    "title": "GlamorousGirl",
    "provider": "JDB",
    "image": "/images/slots/glamorousgirl.webp",
    "category": [
      "top",
      "hot",
      "max-rpt",
      "bonus"
    ],
    "theme": "Romantic",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jdb.webp",
    "hotPercent": "103.0%",
    "rtpPercent": "95.8%",
    "jackpot": true
  },
  {
    "id": "lucky-elephant-x-huge",
    "title": "Lucky Elephant X-Huge",
    "provider": "JDB",
    "image": "/images/slots/lucky-elephant-x-huge.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jdb.webp",
    "coldPercent": "90.8%",
    "livePlayers": 17,
    "rtpPercent": "96.4%"
  },
  {
    "id": "butterfly-blossom",
    "title": "Butterfly Blossom",
    "provider": "PG",
    "image": "/images/slots/butterfly-blossom.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "56.0%",
    "livePlayers": 22,
    "rtpPercent": "96.7%"
  },
  {
    "id": "fortune-tiger",
    "title": "Fortune Tiger",
    "provider": "PG",
    "image": "/images/slots/fortune-tiger.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "62.7%",
    "livePlayers": 5,
    "rtpPercent": "96.8%"
  },
  {
    "id": "songkran-splash",
    "title": "Songkran Splash",
    "provider": "PG",
    "image": "/images/slots/songkran-splash.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "32.0%",
    "livePlayers": 9,
    "rtpPercent": "96.6%"
  },
  {
    "id": "tsar-treasures",
    "title": "Tsar Treasures",
    "provider": "PG",
    "image": "/images/slots/tsar-treasures.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "25.6%",
    "livePlayers": 5,
    "rtpPercent": "96.7%"
  },
  {
    "id": "gemstones-gold",
    "title": "Gemstones Gold",
    "provider": "PG",
    "image": "/images/slots/gemstones-gold.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "37.5%",
    "livePlayers": 7,
    "rtpPercent": "96.7%"
  },
  {
    "id": "super-wildrix",
    "title": "Super Wildrix",
    "provider": "PG",
    "image": "/images/slots/super-wildrix.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Buy Spins",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "86.9%",
    "livePlayers": 9,
    "rtpPercent": "96.7%"
  },
  {
    "id": "zombie-blasters",
    "title": "Zombie Blasters",
    "provider": "PG",
    "image": "/images/slots/zombie-blasters.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "50.0%",
    "rtpPercent": "96.7%"
  },
  {
    "id": "candy-baby",
    "title": "Candy Baby",
    "provider": "JILI",
    "image": "/images/slots/candy-baby.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "76.0%",
    "livePlayers": 29,
    "rtpPercent": "97.0%"
  },
  {
    "id": "double-fortune",
    "title": "Double Fortune",
    "provider": "PG",
    "image": "/images/slots/double-fortune.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game",
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "14.8%",
    "livePlayers": 9,
    "rtpPercent": "96.2%"
  },
  {
    "id": "100-blazing-clover",
    "title": "100 Blazing Clover",
    "provider": "JILI",
    "image": "/images/slots/100-blazing-clover.webp",
    "category": [
      "top",
      "cold",
      "max-rpt",
      "bonus"
    ],
    "theme": "Romantic",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "75.5%",
    "livePlayers": 6,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "dreams-of-macau",
    "title": "Dreams of Macau",
    "provider": "PG",
    "image": "/images/slots/dreams-of-macau.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "76.1%",
    "livePlayers": 13,
    "rtpPercent": "96.7%"
  },
  {
    "id": "guardians-of-ice-and-fire",
    "title": "Guardians of Ice and Fire",
    "provider": "PG",
    "image": "/images/slots/guardians-of-ice-and-fire.webp",
    "category": [
      "top",
      "hot",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pg.webp",
    "hotPercent": "101.3%",
    "coldPercent": "92.7%",
    "livePlayers": 5,
    "rtpPercent": "96.7%"
  },
  {
    "id": "cai-shen-168",
    "title": "Cai Shen 168",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/cai-shen-168.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "coldPercent": "51.2%",
    "rtpPercent": "95.7%"
  },
  {
    "id": "god-of-wealth",
    "title": "God Of Wealth",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/god-of-wealth.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "livePlayers": 5,
    "rtpPercent": "96.2%"
  },
  {
    "id": "treasure-mine",
    "title": "Treasure Mine",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/treasure-mine.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "coldPercent": "33.0%",
    "livePlayers": 6
  },
  {
    "id": "big-bass-halloween-2",
    "title": "Big Bass Halloween 2",
    "provider": "PP",
    "image": "/images/slots/big-bass-halloween-2.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "16.4%",
    "livePlayers": 10,
    "rtpPercent": "96.7%"
  },
  {
    "id": "starlight-wins",
    "title": "Starlight Wins",
    "provider": "PP",
    "image": "/images/slots/starlight-wins.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Science Fiction",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "83.1%",
    "livePlayers": 6,
    "rtpPercent": "97.5%"
  },
  {
    "id": "oriental-prosperity",
    "title": "Oriental Prosperity",
    "provider": "PG",
    "image": "/images/slots/oriental-prosperity.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "61.4%",
    "livePlayers": 8,
    "rtpPercent": "96.7%"
  },
  {
    "id": "move-n-jump",
    "title": "Move n' Jump",
    "provider": "CQ9",
    "image": "/images/slots/move-n-jump.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "12.9%",
    "livePlayers": 1,
    "rtpPercent": "96.1%"
  },
  {
    "id": "hercules",
    "title": "Hercules",
    "provider": "CQ9",
    "image": "/images/slots/hercules.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "hotPercent": "130.9%",
    "livePlayers": 5,
    "rtpPercent": "95.9%"
  },
  {
    "id": "sin-city",
    "title": "Sin City",
    "provider": "JILI",
    "image": "/images/slots/sin-city.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Movie",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "120.4%",
    "livePlayers": 2,
    "rtpPercent": "97.0%"
  },
  {
    "id": "gem-saviour",
    "title": "Gem Saviour",
    "provider": "PG",
    "image": "/images/slots/gem-saviour.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "36.3%",
    "rtpPercent": "96.8%"
  },
  {
    "id": "tornado-rampage",
    "title": "Tornado Rampage",
    "provider": "PG",
    "image": "/images/slots/tornado-rampage.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "29.7%",
    "livePlayers": 16,
    "rtpPercent": "96.7%"
  },
  {
    "id": "devil-fire-2",
    "title": "Devil Fire 2",
    "provider": "JILI",
    "image": "/images/slots/devil-fire-2.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "theme": "Science Fiction",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jili.webp",
    "rtpPercent": "97.0%"
  },
  {
    "id": "potion-wizard",
    "title": "Potion Wizard",
    "provider": "JILI",
    "image": "/images/slots/potion-wizard.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Science Fiction",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "72.7%",
    "rtpPercent": "97.0%"
  },
  {
    "id": "fengshen",
    "title": "Fengshen",
    "provider": "JILI",
    "image": "/images/slots/fengshen.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "30.0%",
    "livePlayers": 8,
    "rtpPercent": "97.0%"
  },
  {
    "id": "rapid-gems-777",
    "title": "Rapid Gems 777",
    "provider": "JILI",
    "image": "/images/slots/rapid-gems-777.webp",
    "category": [
      "top",
      "cold",
      "max-rpt",
      "bonus"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "74.4%",
    "livePlayers": 13,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "zeus-2",
    "title": "Zeus",
    "provider": "CQ9",
    "image": "/images/slots/zeus-2.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "79.5%",
    "livePlayers": 2,
    "rtpPercent": "96.1%"
  },
  {
    "id": "war-of-dragons",
    "title": "War Of Dragons",
    "provider": "JILI",
    "image": "/images/slots/war-of-dragons.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jili.webp",
    "livePlayers": 5,
    "rtpPercent": "97.0%"
  },
  {
    "id": "firework-burst",
    "title": "Firework Burst",
    "provider": "JDB",
    "image": "/images/slots/firework-burst.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jdb.webp",
    "hotPercent": "101.4%"
  },
  {
    "id": "arcade-bomb",
    "title": "Arcade Bomb",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/arcade-bomb.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "coldPercent": "74.4%",
    "rtpPercent": "96.1%"
  },
  {
    "id": "devil-s-number",
    "title": "Devil's Number",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/devil-s-number.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243",
    "coldPercent": "29.1%",
    "livePlayers": 8,
    "rtpPercent": "96.0%"
  },
  {
    "id": "divine-ways",
    "title": "Divine Ways",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/divine-ways.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "coldPercent": "21.7%",
    "rtpPercent": "96.1%"
  },
  {
    "id": "sugarlicious-everywaytm",
    "title": "Sugarlicious EveryWay\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/sugarlicious-everywaytm.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "coldPercent": "73.4%",
    "rtpPercent": "95.6%"
  },
  {
    "id": "fortune-rabbit-xtreme",
    "title": "Fortune Rabbit Xtreme",
    "provider": "CQ9",
    "image": "/images/slots/fortune-rabbit-xtreme.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/cq9.webp",
    "hotPercent": "114.7%",
    "livePlayers": 10,
    "rtpPercent": "97.5%"
  },
  {
    "id": "wild-wild-riches",
    "title": "Wild Wild Riches",
    "provider": "PP",
    "image": "/images/slots/wild-wild-riches.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "62.5%",
    "rtpPercent": "96.7%"
  },
  {
    "id": "kingsman",
    "title": "Kingsman",
    "provider": "JDB",
    "image": "/images/slots/kingsman.webp",
    "category": [
      "top",
      "cold",
      "max-rpt",
      "bonus"
    ],
    "theme": "Movie",
    "features": [
      "Prize Pool"
    ],
    "providerLogo": "/images/providers/jdb.webp",
    "coldPercent": "61.5%",
    "livePlayers": 7,
    "rtpPercent": "96.2%",
    "jackpot": true
  },
  {
    "id": "prosperity-tiger",
    "title": "Prosperity Tiger",
    "provider": "JDB",
    "image": "/images/slots/prosperity-tiger.webp",
    "category": [
      "top",
      "cold",
      "max-rpt",
      "bonus"
    ],
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/jdb.webp",
    "coldPercent": "35.3%",
    "livePlayers": 1,
    "rtpPercent": "96.0%",
    "jackpot": true
  },
  {
    "id": "mahjong",
    "title": "Mahjong",
    "provider": "JDB",
    "image": "/images/slots/mahjong.webp",
    "category": [
      "top",
      "cold",
      "max-rpt",
      "bonus"
    ],
    "theme": "Others",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "20 lines",
    "providerLogo": "/images/providers/jdb.webp",
    "coldPercent": "46.2%",
    "livePlayers": 3,
    "rtpPercent": "96.3%",
    "jackpot": true
  },
  {
    "id": "crypto-gold",
    "title": "Crypto Gold",
    "provider": "PG",
    "image": "/images/slots/crypto-gold.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Science Fiction",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "91.0%",
    "livePlayers": 3,
    "rtpPercent": "96.7%"
  },
  {
    "id": "heist-stakes",
    "title": "Heist Stakes",
    "provider": "PG",
    "image": "/images/slots/heist-stakes.webp",
    "category": [
      "top",
      "hot",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "hotPercent": "450.0%",
    "coldPercent": "65.6%",
    "livePlayers": 3,
    "rtpPercent": "96.7%"
  },
  {
    "id": "buffalo-win",
    "title": "Buffalo Win",
    "provider": "PG",
    "image": "/images/slots/buffalo-win.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "95.2%",
    "livePlayers": 9,
    "rtpPercent": "96.7%"
  },
  {
    "id": "rave-jump-mobile",
    "title": "Rave Jump mobile",
    "provider": "CQ9",
    "image": "/images/slots/rave-jump-mobile.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "28.8%",
    "rtpPercent": "96.1%"
  },
  {
    "id": "raider-janes-crypt-of-fortune",
    "title": "Raider Janes Crypt of Fortune",
    "provider": "PG",
    "image": "/images/slots/raider-janes-crypt-of-fortune.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "90.5%",
    "rtpPercent": "96.7%"
  },
  {
    "id": "gu-gu-gu-2-m",
    "title": "Gu Gu Gu 2 M",
    "provider": "CQ9",
    "image": "/images/slots/gu-gu-gu-2-m.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "13.0%",
    "livePlayers": 2,
    "rtpPercent": "95.9%"
  },
  {
    "id": "mystical-spirits",
    "title": "Mystical Spirits",
    "provider": "PG",
    "image": "/images/slots/mystical-spirits.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Science Fiction",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "5.0%",
    "livePlayers": 41,
    "rtpPercent": "96.7%"
  },
  {
    "id": "safari-wilds",
    "title": "Safari Wilds",
    "provider": "PG",
    "image": "/images/slots/safari-wilds.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "72.5%",
    "livePlayers": 8,
    "rtpPercent": "96.7%"
  },
  {
    "id": "super5",
    "title": "Super5",
    "provider": "CQ9",
    "image": "/images/slots/super5.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Buy Spins",
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "hotPercent": "102.5%",
    "rtpPercent": "96.2%"
  },
  {
    "id": "three-crazy-piggies",
    "title": "Three Crazy Piggies",
    "provider": "PG",
    "image": "/images/slots/three-crazy-piggies.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "43.9%",
    "livePlayers": 40,
    "rtpPercent": "86.7%"
  },
  {
    "id": "golden-temple",
    "title": "Golden Temple",
    "provider": "JILI",
    "image": "/images/slots/golden-temple.webp",
    "category": [
      "top",
      "cold",
      "max-rpt",
      "bonus"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "22.1%",
    "livePlayers": 5,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "devil-fire",
    "title": "Devil Fire",
    "provider": "JILI",
    "image": "/images/slots/devil-fire.webp",
    "category": [
      "top",
      "hot",
      "max-rpt",
      "bonus"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "99.2%",
    "livePlayers": 3,
    "rtpPercent": "97.0%",
    "jackpot": true
  },
  {
    "id": "trial-of-phoenix",
    "title": "Trial of Phoenix",
    "provider": "JILI",
    "image": "/images/slots/trial-of-phoenix.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "80.3%",
    "livePlayers": 15,
    "rtpPercent": "97.0%"
  },
  {
    "id": "monkeys-wild-party",
    "title": "Monkeys Wild Party",
    "provider": "PG",
    "image": "/images/slots/monkeys-wild-party.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Buy Spins",
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "71.4%",
    "livePlayers": 38,
    "rtpPercent": "96.7%"
  },
  {
    "id": "go-fishing",
    "title": "Go Fishing",
    "provider": "CQ9",
    "image": "/images/slots/go-fishing.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Auto Game",
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "89.3%",
    "livePlayers": 1,
    "rtpPercent": "96.0%"
  },
  {
    "id": "777",
    "title": "777",
    "provider": "CQ9",
    "image": "/images/slots/777.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Buy Spins",
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "63.9%",
    "rtpPercent": "96.1%"
  },
  {
    "id": "wukong-peaches",
    "title": "WuKong&Peaches",
    "provider": "CQ9",
    "image": "/images/slots/wukong-peaches.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "73.8%",
    "rtpPercent": "96.9%"
  },
  {
    "id": "chinese-treasures",
    "title": "Chinese Treasures",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/chinese-treasures.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool",
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "coldPercent": "30.3%",
    "rtpPercent": "96.2%"
  },
  {
    "id": "egypt-megawaystm",
    "title": "Egypt Megaways\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/egypt-megawaystm.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "coldPercent": "83.5%",
    "rtpPercent": "95.7%"
  },
  {
    "id": "five-star",
    "title": "Five Star",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/five-star.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "coldPercent": "44.3%",
    "rtpPercent": "96.2%"
  },
  {
    "id": "fortune-house",
    "title": "Fortune House",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/fortune-house.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "coldPercent": "59.2%",
    "livePlayers": 1,
    "rtpPercent": "96.1%"
  },
  {
    "id": "grand-wheel",
    "title": "Grand Wheel",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/grand-wheel.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game",
      "Free Spins"
    ],
    "winningLine": "243",
    "livePlayers": 2,
    "rtpPercent": "96.2%"
  },
  {
    "id": "jack-in-a-pot",
    "title": "Jack In A Pot",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/jack-in-a-pot.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Buy Spins",
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "coldPercent": "49.0%",
    "rtpPercent": "96.0%"
  },
  {
    "id": "los-muertos-locos",
    "title": "Los Muertos Locos",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/los-muertos-locos.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "coldPercent": "30.5%",
    "livePlayers": 1,
    "rtpPercent": "96.1%"
  },
  {
    "id": "ten-elements",
    "title": "Ten Elements",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/ten-elements.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Science Fiction",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "coldPercent": "59.6%",
    "livePlayers": 1
  },
  {
    "id": "wild-bounty-2",
    "title": "WILD BOUNTY 2",
    "provider": "CQ9",
    "image": "/images/slots/wild-bounty-2.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/cq9.webp",
    "hotPercent": "104.4%",
    "livePlayers": 11,
    "rtpPercent": "96.5%"
  },
  {
    "id": "big-bass-boxing-bonus-round",
    "title": "Big Bass Boxing Bonus Round",
    "provider": "PP",
    "image": "/images/slots/big-bass-boxing-bonus-round.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "76.1%",
    "rtpPercent": "96.5%"
  },
  {
    "id": "big-bass-vegas-double-down-deluxe",
    "title": "Big Bass Vegas Double Down Deluxe",
    "provider": "PP",
    "image": "/images/slots/big-bass-vegas-double-down-deluxe.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "15.0%",
    "livePlayers": 4,
    "rtpPercent": "96.5%"
  },
  {
    "id": "fish-eye",
    "title": "Fish Eye",
    "provider": "PP",
    "image": "/images/slots/fish-eye.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "61.9%",
    "livePlayers": 12,
    "rtpPercent": "96.0%"
  },
  {
    "id": "bigger-bass-bonanza",
    "title": "Bigger Bass Bonanza",
    "provider": "PP",
    "image": "/images/slots/bigger-bass-bonanza.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "10.4%",
    "rtpPercent": "96.7%"
  },
  {
    "id": "aztec-powernudge",
    "title": "Aztec Powernudge",
    "provider": "PP",
    "image": "/images/slots/aztec-powernudge.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "32.8%",
    "livePlayers": 4,
    "rtpPercent": "96.4%"
  },
  {
    "id": "great-ghosts",
    "title": "Great Ghosts!",
    "provider": "PP",
    "image": "/images/slots/great-ghosts.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 3,
    "rtpPercent": "96.5%"
  },
  {
    "id": "6-jokers",
    "title": "6 Jokers",
    "provider": "PP",
    "image": "/images/slots/6-jokers.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "77.6%",
    "livePlayers": 1,
    "rtpPercent": "97.0%"
  },
  {
    "id": "aztec-gems-deluxe",
    "title": "Aztec Gems Deluxe",
    "provider": "PP",
    "image": "/images/slots/aztec-gems-deluxe.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 7,
    "rtpPercent": "96.5%"
  },
  {
    "id": "zombie-school-megaways",
    "title": "Zombie School Megaways",
    "provider": "PP",
    "image": "/images/slots/zombie-school-megaways.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "118.2%",
    "livePlayers": 4,
    "rtpPercent": "96.5%"
  },
  {
    "id": "opensesameii",
    "title": "OpenSesameII",
    "provider": "JDB",
    "image": "/images/slots/opensesameii.webp",
    "category": [
      "top",
      "cold",
      "max-rpt",
      "bonus"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/jdb.webp",
    "coldPercent": "8.5%",
    "livePlayers": 27,
    "rtpPercent": "95.8%",
    "jackpot": true
  },
  {
    "id": "garuda-gems",
    "title": "Garuda Gems",
    "provider": "PG",
    "image": "/images/slots/garuda-gems.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "34.6%",
    "livePlayers": 13,
    "rtpPercent": "96.7%"
  },
  {
    "id": "rooster-rumble",
    "title": "Rooster Rumble",
    "provider": "PG",
    "image": "/images/slots/rooster-rumble.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "52.7%",
    "livePlayers": 7,
    "rtpPercent": "96.7%"
  },
  {
    "id": "hyper-burst",
    "title": "Hyper Burst",
    "provider": "JILI",
    "image": "/images/slots/hyper-burst.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game",
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/jili.webp",
    "hotPercent": "103.3%",
    "livePlayers": 3,
    "rtpPercent": "97.0%"
  },
  {
    "id": "ninja-raccoon-frenzy",
    "title": "Ninja Raccoon Frenzy",
    "provider": "PG",
    "image": "/images/slots/ninja-raccoon-frenzy.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Anime",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "81.3%",
    "livePlayers": 6,
    "rtpPercent": "96.8%"
  },
  {
    "id": "wings-of-iguazu",
    "title": "Wings of Iguazu",
    "provider": "PG",
    "image": "/images/slots/wings-of-iguazu.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "20 lines",
    "providerLogo": "/images/providers/pg.webp",
    "rtpPercent": "96.7%"
  },
  {
    "id": "cricket-fever",
    "title": "Cricket Fever",
    "provider": "CQ9",
    "image": "/images/slots/cricket-fever.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Buy Spins",
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "51.0%",
    "rtpPercent": "95.9%"
  },
  {
    "id": "888",
    "title": "888",
    "provider": "CQ9",
    "image": "/images/slots/888.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/cq9.webp",
    "hotPercent": "100.0%",
    "rtpPercent": "95.9%"
  },
  {
    "id": "cricket-sah-75",
    "title": "Cricket Sah 75",
    "provider": "JILI",
    "image": "/images/slots/cricket-sah-75.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "84.5%",
    "rtpPercent": "97.0%"
  },
  {
    "id": "hawaii-beauty",
    "title": "Hawaii Beauty",
    "provider": "JILI",
    "image": "/images/slots/hawaii-beauty.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Romantic",
    "features": [
      "Auto Game"
    ],
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "65.0%",
    "livePlayers": 7,
    "rtpPercent": "97.0%"
  },
  {
    "id": "crazy-hunter-2",
    "title": "Crazy Hunter 2",
    "provider": "JILI",
    "image": "/images/slots/crazy-hunter-2.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways",
    "providerLogo": "/images/providers/jili.webp",
    "coldPercent": "66.0%",
    "livePlayers": 8,
    "rtpPercent": "97.0%"
  },
  {
    "id": "jewels-of-prosperity",
    "title": "Jewels of Prosperity",
    "provider": "PG",
    "image": "/images/slots/jewels-of-prosperity.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "coldPercent": "94.4%",
    "rtpPercent": "96.7%"
  },
  {
    "id": "thai-river-wonders",
    "title": "Thai River Wonders",
    "provider": "PG",
    "image": "/images/slots/thai-river-wonders.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "livePlayers": 2,
    "rtpPercent": "96.7%"
  },
  {
    "id": "ancient-script",
    "title": "Ancient Script",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/ancient-script.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "coldPercent": "39.7%",
    "rtpPercent": "96.2%"
  },
  {
    "id": "big-cat-rescue-megawaystm",
    "title": "Big Cat Rescue Megaways\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/big-cat-rescue-megawaystm.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "coldPercent": "45.1%",
    "rtpPercent": "95.7%"
  },
  {
    "id": "clover-craze",
    "title": "Clover Craze",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/clover-craze.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Auto Game"
    ],
    "winningLine": "20 lines",
    "rtpPercent": "96.2%"
  },
  {
    "id": "cotton-gang-affair",
    "title": "Cotton Gang Affair",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/cotton-gang-affair.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "coldPercent": "22.8%",
    "rtpPercent": "96.0%"
  },
  {
    "id": "golden-horus",
    "title": "Golden Horus",
    "provider": "CQ9",
    "image": "/images/slots/golden-horus.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/cq9.webp",
    "hotPercent": "100.1%",
    "rtpPercent": "97.0%"
  },
  {
    "id": "dream-destiny",
    "title": "Dream Destiny",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/dream-destiny.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "coldPercent": "64.0%",
    "rtpPercent": "95.8%"
  },
  {
    "id": "fishtastic",
    "title": "Fishtastic",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/fishtastic.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "rtpPercent": "95.6%"
  },
  {
    "id": "hero-of-the-3-kingdoms-cao-cao",
    "title": "Hero of the 3 Kingdoms - Cao Cao",
    "provider": "CQ9",
    "image": "/images/slots/hero-of-the-3-kingdoms-cao-cao.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "coldPercent": "15.7%",
    "livePlayers": 4,
    "rtpPercent": "96.2%"
  },
  {
    "id": "crazy-crazy",
    "title": "Crazy Crazy",
    "provider": "CQ9",
    "image": "/images/slots/crazy-crazy.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/cq9.webp",
    "hotPercent": "140.7%",
    "livePlayers": 10,
    "rtpPercent": "97.1%"
  },
  {
    "id": "big-bass-bonanza",
    "title": "Big Bass Bonanza",
    "provider": "PP",
    "image": "/images/slots/big-bass-bonanza.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Prize Pool",
      "Free Spins"
    ],
    "winningLine": "1024",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "73.8%",
    "rtpPercent": "96.7%"
  },
  {
    "id": "return-of-the-dead",
    "title": "Return of the Dead",
    "provider": "PP",
    "image": "/images/slots/return-of-the-dead.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "96.8%",
    "rtpPercent": "96.7%"
  },
  {
    "id": "jelly-express",
    "title": "Jelly Express",
    "provider": "PP",
    "image": "/images/slots/jelly-express.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "87.1%",
    "rtpPercent": "96.5%"
  },
  {
    "id": "sweet-bonanza-super-scatter",
    "title": "Sweet Bonanza Super Scatter",
    "provider": "PP",
    "image": "/images/slots/sweet-bonanza-super-scatter.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Prize Pool",
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "livePlayers": 3,
    "rtpPercent": "96.5%"
  },
  {
    "id": "caishen-s-cash",
    "title": "Caishen's Cash",
    "provider": "PP",
    "image": "/images/slots/caishen-s-cash.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Auto Game",
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "24.7%",
    "rtpPercent": "96.5%"
  },
  {
    "id": "majestic-express-gold-run",
    "title": "Majestic Express Gold Run",
    "provider": "PP",
    "image": "/images/slots/majestic-express-gold-run.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "68.4%",
    "rtpPercent": "96.5%"
  },
  {
    "id": "gold-train",
    "title": "Gold Train",
    "provider": "PP",
    "image": "/images/slots/gold-train.webp",
    "category": [
      "top",
      "hot",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "hotPercent": "100.0%",
    "livePlayers": 1,
    "rtpPercent": "97.1%"
  },
  {
    "id": "anaconda-gold",
    "title": "Anaconda Gold",
    "provider": "PP",
    "image": "/images/slots/anaconda-gold.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pp.webp",
    "coldPercent": "69.5%",
    "livePlayers": 8,
    "rtpPercent": "96.5%"
  },
  {
    "id": "winter-wonders",
    "title": "Winter Wonders",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/winter-wonders.webp",
    "category": [
      "top",
      "cold",
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "coldPercent": "79.0%",
    "rtpPercent": "96.1%"
  },
  {
    "id": "serpent-king",
    "title": "Serpent King",
    "provider": "Unknown",
    "image": "/images/slots/serpent-king.webp",
    "category": [
      "cold",
      "top",
      "max-rpt"
    ],
    "coldPercent": "8.8%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "livePlayers": 5,
    "providerLogo": "/images/providers/red-tiger.webp",
    "rtpPercent": "95.7%"
  },
  {
    "id": "hotpot",
    "title": "Hotpot",
    "provider": "PG",
    "image": "/images/slots/hotpot.webp",
    "category": [
      "cold",
      "max-rpt"
    ],
    "coldPercent": "28.6%",
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "providerLogo": "/images/providers/pg.webp",
    "rtpPercent": "95.8%"
  },
  {
    "id": "return-of-the-dead-hot",
    "title": "Return of the Dead",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/games/new-releases/john-hunter-book-of-tut-respin.webp",
    "category": [
      "hot"
    ],
    "hotPercent": "213.1%"
  },
  {
    "id": "chinese-new-year-hot",
    "title": "CHINESE NEW YEAR",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/games/new-releases/chinese-new-year-deluxe.webp",
    "category": [
      "hot"
    ],
    "hotPercent": "191.4%"
  },
  {
    "id": "good-fortune-m-hot",
    "title": "Good Fortune M",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/games/popular/fortune-gems-2.webp",
    "category": [
      "hot"
    ],
    "hotPercent": "180.4%"
  },
  {
    "id": "gates-of-olympus-hot",
    "title": "Gates of Olympus",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/games/popular/gates-of-olympus.webp",
    "category": [
      "hot"
    ],
    "hotPercent": "170.5%"
  },
  {
    "id": "cash-volt-hot",
    "title": "Cash Volt",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/games/new-releases/777-strike.webp",
    "category": [
      "hot"
    ],
    "hotPercent": "166.9%"
  },
  {
    "id": "fortune-gems-hot-2",
    "title": "Fortune Gems 2",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/games/popular/super-ace.webp",
    "category": [
      "hot"
    ],
    "hotPercent": "155.2%"
  },
  {
    "id": "dragons-world",
    "title": "DragonsWorld",
    "provider": "JDB",
    "providerLogo": "/images/providers/jdb.webp",
    "image": "/images/games/popular/mega-ace.webp",
    "badge": "7000X",
    "coldPercent": "7.2%",
    "category": [
      "cold"
    ]
  },
  {
    "id": "floating-dragon-cold",
    "title": "Floating Dragon",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/games/new-releases/lucky-neko.webp",
    "coldPercent": "9.1%",
    "category": [
      "cold"
    ]
  },
  {
    "id": "glamorous-girl",
    "title": "GlamorousGirl",
    "provider": "JDB",
    "providerLogo": "/images/providers/jdb.webp",
    "image": "/images/games/new-releases/wild-bandito.webp",
    "badge": "3600X",
    "coldPercent": "5.0%",
    "category": [
      "cold"
    ]
  },
  {
    "id": "bigger-bass-blizzard-cold",
    "title": "Bigger Bass Blizzard",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/games/new-releases/bigger-bass-blizzard.webp",
    "coldPercent": "13.4%",
    "category": [
      "cold"
    ]
  },
  {
    "id": "bee-keeper-cold",
    "title": "Bee Keeper",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/games/new-releases/snakes-and-ladders-snake-eyes.webp",
    "coldPercent": "16.2%",
    "category": [
      "cold"
    ]
  },
  {
    "id": "sweet-bonanza-cold",
    "title": "Sweet Bonanza",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/games/popular/sweet-bonanza-1000.webp",
    "coldPercent": "18.5%",
    "category": [
      "cold"
    ]
  },
  {
    "id": "fruity-carnival",
    "title": "FruityCarnival",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/games/popular/sugar-rush-dice.webp",
    "rtpPercent": "97.5%",
    "category": [
      "max-rpt"
    ]
  },
  {
    "id": "jewel-luxury",
    "title": "JewelLuxury",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/games/popular/sweet-bonanza-1000.webp",
    "rtpPercent": "97.5%",
    "category": [
      "max-rpt"
    ]
  },
  {
    "id": "xmas-max-rtp",
    "title": "Xmas",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/games/new-releases/7-wheel-money.webp",
    "rtpPercent": "97.5%",
    "category": [
      "max-rpt"
    ]
  },
  {
    "id": "legacy-of-olympus-rtp",
    "title": "Legacy of Olympus",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/games/new-releases/open-sesame.webp",
    "rtpPercent": "97.5%",
    "category": [
      "max-rpt"
    ]
  },
  {
    "id": "mahjong-wilds-rtp",
    "title": "Mahjong Wilds",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/games/new-releases/fortune-rabbit-xtreme.webp",
    "rtpPercent": "97.5%",
    "category": [
      "max-rpt"
    ]
  },
  {
    "id": "golden-empire-rtp",
    "title": "Golden Empire",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/games/popular/golden-empire.webp",
    "rtpPercent": "97.2%",
    "category": [
      "max-rpt"
    ]
  },
  {
    "id": "winning-mask-ii",
    "title": "Winning Mask II",
    "provider": "JDB",
    "providerLogo": "/images/providers/jdb.webp",
    "image": "/images/slots/winning-mask-ii.webp",
    "category": [
      "top",
      "max-rpt",
      "bonus"
    ],
    "livePlayers": 17,
    "theme": "Others",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "rtpPercent": "95.9%",
    "jackpot": true
  },
  {
    "id": "fortune-snake",
    "title": "Fortune Snake",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/fortune-snake.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 17,
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "1024",
    "rtpPercent": "96.7%"
  },
  {
    "id": "ways-of-the-holy-horse",
    "title": "Ways of the Holy Horse",
    "provider": "JDB",
    "providerLogo": "/images/providers/jdb.webp",
    "image": "/images/slots/ways-of-the-holy-horse.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 14,
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "rtpPercent": "96.6%"
  },
  {
    "id": "fortune-horse",
    "title": "Fortune Horse",
    "provider": "JDB",
    "providerLogo": "/images/providers/jdb.webp",
    "image": "/images/slots/fortune-horse.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 11,
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "rtpPercent": "96.7%"
  },
  {
    "id": "night-city",
    "title": "Night City",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/night-city.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 10,
    "theme": "Science Fiction",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "rtpPercent": "97.0%"
  },
  {
    "id": "big-bass-reel-repeat",
    "title": "Big Bass Reel Repeat",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/big-bass-reel-repeat.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 10,
    "theme": "Foods",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "rtpPercent": "96.5%"
  },
  {
    "id": "bomb-bonanza",
    "title": "Bomb Bonanza",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/bomb-bonanza.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 9,
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "rtpPercent": "96.4%"
  },
  {
    "id": "spirited-wonders",
    "title": "Spirited Wonders",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/spirited-wonders.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 8,
    "theme": "Science Fiction",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "rtpPercent": "96.7%"
  },
  {
    "id": "dabanggg",
    "title": "Dabanggg",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/dabanggg.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 7,
    "theme": "Movie",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "rtpPercent": "97.0%"
  },
  {
    "id": "crazy-hunter",
    "title": "Crazy Hunter",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/crazy-hunter.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 6,
    "theme": "Adventures",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "rtpPercent": "97.0%"
  },
  {
    "id": "sugar-monster",
    "title": "Sugar Monster",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/sugar-monster.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 6,
    "theme": "Foods",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways",
    "rtpPercent": "95.7%"
  },
  {
    "id": "big-bass-christmas-frozen-lake",
    "title": "Big Bass Christmas Frozen Lake",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/big-bass-christmas-frozen-lake.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 5,
    "theme": "Entertainment",
    "features": [
      "Buy Spins",
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "rtpPercent": "96.0%"
  },
  {
    "id": "big-bass-raceday-repeat",
    "title": "Big Bass Raceday Repeat",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/big-bass-raceday-repeat.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 5,
    "theme": "Sports",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243",
    "rtpPercent": "96.5%"
  },
  {
    "id": "christmas-big-bass-bonanza",
    "title": "Christmas Big Bass Bonanza",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/christmas-big-bass-bonanza.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 5,
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "rtpPercent": "95.6%"
  },
  {
    "id": "greedy-fortune-pig",
    "title": "Greedy Fortune Pig",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/greedy-fortune-pig.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 5,
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "rtpPercent": "96.5%"
  },
  {
    "id": "ancient-egypt-classic",
    "title": "Ancient Egypt Classic",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/ancient-egypt-classic.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 4,
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "rtpPercent": "96.5%"
  },
  {
    "id": "hot-chilli",
    "title": "Hot Chilli",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/hot-chilli.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 4,
    "theme": "Foods",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "inferno-mayhem",
    "title": "Inferno Mayhem",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/inferno-mayhem.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 3,
    "theme": "Science Fiction",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "20 lines",
    "rtpPercent": "96.7%"
  },
  {
    "id": "diamondparty",
    "title": "DiamondParty",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/diamondparty.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 3,
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243",
    "rtpPercent": "97.0%"
  },
  {
    "id": "7-s-luck",
    "title": "7's Luck",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/7-s-luck.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 3,
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "rtpPercent": "96.7%"
  },
  {
    "id": "royal-gems",
    "title": "Royal Gems",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/royal-gems.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 3,
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "legend-of-perseus",
    "title": "Legend of Perseus",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/legend-of-perseus.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 2,
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "rtpPercent": "96.7%"
  },
  {
    "id": "fire777",
    "title": "Fire777",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/fire777.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 2,
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243",
    "rtpPercent": "97.0%"
  },
  {
    "id": "red-hot-bbq",
    "title": "Red Hot BBQ",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/red-hot-bbq.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 2,
    "theme": "Foods",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "crazy-crazy-2",
    "title": "Crazy Crazy 2",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/crazy-crazy-2.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 2,
    "theme": "Adventures",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "rtpPercent": "97.1%"
  },
  {
    "id": "wild-fight",
    "title": "Wild Fight",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/wild-fight.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 2,
    "theme": "Sports",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "witches-night",
    "title": "Witches Night",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/witches-night.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 1,
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "20 lines",
    "rtpPercent": "97.0%"
  },
  {
    "id": "jungle-delight",
    "title": "Jungle Delight",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/jungle-delight.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 1,
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "rtpPercent": "96.0%"
  },
  {
    "id": "sosweet",
    "title": "SoSweet",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/sosweet.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 1,
    "theme": "Foods",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways",
    "rtpPercent": "96.1%"
  },
  {
    "id": "majestic-treasures",
    "title": "Majestic Treasures",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/majestic-treasures.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 1,
    "theme": "Adventures",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways",
    "rtpPercent": "96.6%"
  },
  {
    "id": "bombuster",
    "title": "Bombuster",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/bombuster.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 1,
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "1024",
    "rtpPercent": "95.7%"
  },
  {
    "id": "play-with-the-devil",
    "title": "Play with the Devil",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/play-with-the-devil.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 1,
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "rtpPercent": "95.7%"
  },
  {
    "id": "vampires-vs-wolves",
    "title": "Vampires VS Wolves",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/vampires-vs-wolves.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 1,
    "theme": "Myth & History",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243",
    "rtpPercent": "96.4%"
  },
  {
    "id": "angel-vs-sinner",
    "title": "Angel vs Sinner",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/angel-vs-sinner.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 1,
    "theme": "Romantic",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways",
    "rtpPercent": "96.5%"
  },
  {
    "id": "genie-s-gem-bonanza",
    "title": "Genie\u2019s Gem Bonanza",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/genie-s-gem-bonanza.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 1,
    "theme": "Movie",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243",
    "rtpPercent": "96.5%"
  },
  {
    "id": "money-mouse",
    "title": "Money Mouse",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/money-mouse.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 1,
    "theme": "Romantic",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "Pay Anywhere",
    "rtpPercent": "96.0%"
  },
  {
    "id": "wanted-wildz-extreme",
    "title": "Wanted Wildz Extreme",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/wanted-wildz-extreme.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 1,
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243",
    "rtpPercent": "96.2%"
  },
  {
    "id": "wild-hot-chilli-reels-2",
    "title": "Wild Hot Chilli Reels 2",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/wild-hot-chilli-reels-2.webp",
    "category": [
      "top",
      "max-rpt"
    ],
    "livePlayers": 1,
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "fruitycarnival",
    "title": "FruityCarnival",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/fruitycarnival.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "97.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "jewelluxury",
    "title": "JewelLuxury",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/jewelluxury.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "97.5%",
    "theme": "Others",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "super-power-bank",
    "title": "Super Power Bank",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/super-power-bank.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "97.2%",
    "theme": "Science Fiction",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "disco-piggy",
    "title": "Disco Piggy",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/disco-piggy.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "97.1%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "crazy-pusher",
    "title": "Crazy Pusher",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/crazy-pusher.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "97.0%",
    "theme": "Sports",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "cricket-king-18",
    "title": "Cricket King 18",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/cricket-king-18.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "97.0%",
    "theme": "Sports",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "arena-fighter",
    "title": "Arena Fighter",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/arena-fighter.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "97.0%",
    "theme": "Sports",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "bangla-beauty",
    "title": "Bangla Beauty",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/bangla-beauty.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "97.0%",
    "theme": "Romantic",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "the-pig-house",
    "title": "The Pig House",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/the-pig-house.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "97.0%",
    "theme": "Foods",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "keno-bonus-number",
    "title": "Keno Bonus Number",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/keno-bonus-number.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "97.0%",
    "theme": "Others",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "keno-super-chance",
    "title": "Keno Super Chance",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/keno-super-chance.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "97.0%",
    "theme": "Others",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "bao-boon-chin",
    "title": "Bao boon chin",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/bao-boon-chin.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "97.0%",
    "theme": "Foods",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "god-of-martial",
    "title": "God Of Martial",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/god-of-martial.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "97.0%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "crazy-fafafa",
    "title": "Crazy FaFaFa",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/crazy-fafafa.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "97.0%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "dragon-treasure",
    "title": "Dragon Treasure",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/dragon-treasure.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "97.0%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "joker-s-fortune",
    "title": "Joker's Fortune",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/joker-s-fortune.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "97.0%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "wonwonwon",
    "title": "WonWonWon",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/wonwonwon.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "97.0%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "secret-treasure",
    "title": "Secret Treasure",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/secret-treasure.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "97.0%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "football-boots",
    "title": "Football Boots",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/football-boots.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "97.0%",
    "theme": "Sports",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "wizard-s-wizard",
    "title": "Wizard's Wizard",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/wizard-s-wizard.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "97.0%",
    "theme": "Science Fiction",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "money-money-money",
    "title": "Money Money Money",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/money-money-money.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "97.0%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "888-bonanza",
    "title": "888 Bonanza",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/888-bonanza.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "97.0%",
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "hot-to-burn-multiplier",
    "title": "Hot to Burn Multiplier",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/hot-to-burn-multiplier.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "irish-charms",
    "title": "Irish Charms",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/irish-charms.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.9%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "diamonds-are-forever-3-lines",
    "title": "Diamonds are Forever 3 Lines",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/diamonds-are-forever-3-lines.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.9%",
    "theme": "Romantic",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "3 Lines"
  },
  {
    "id": "money-roll",
    "title": "Money Roll",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/money-roll.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.9%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "diamond-strike",
    "title": "Diamond Strike",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/diamond-strike.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.9%",
    "theme": "Romantic",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "modern-gods",
    "title": "Modern Gods",
    "provider": "JDB",
    "providerLogo": "/images/providers/jdb.webp",
    "image": "/images/slots/modern-gods.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.8%",
    "theme": "Science Fiction",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "jack-the-giant-hunter",
    "title": "Jack the Giant Hunter",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/jack-the-giant-hunter.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.8%",
    "theme": "Adventures",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "perfect-strike",
    "title": "Perfect Strike",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/perfect-strike.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.8%",
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "fu-fu-fu",
    "title": "Fu Fu Fu",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/fu-fu-fu.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.8%",
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "legendary-monkey-king",
    "title": "Legendary Monkey King",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/legendary-monkey-king.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.7%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "emoji-riches",
    "title": "Emoji Riches",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/emoji-riches.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.7%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "supermarket-spree",
    "title": "Supermarket Spree",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/supermarket-spree.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.7%",
    "theme": "Foods",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "alchemy-gold",
    "title": "Alchemy Gold",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/alchemy-gold.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.7%",
    "theme": "Science Fiction",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "hawaiian-tiki",
    "title": "Hawaiian Tiki",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/hawaiian-tiki.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.7%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "futebol-fever",
    "title": "Futebol Fever",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/futebol-fever.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.7%",
    "theme": "Sports",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "rio-fantasia",
    "title": "Rio Fantasia",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/rio-fantasia.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.7%",
    "theme": "Adventures",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  }
]

const slotsBatch4: SlotGame[] = [
  {
    "id": "vampire-s-charm",
    "title": "Vampire\"s Charm",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/vampire-s-charm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.7%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "galactic-gems",
    "title": "Galactic Gems",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/galactic-gems.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.7%",
    "theme": "Science Fiction",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "secrets-of-cleopatra",
    "title": "Secrets of Cleopatra",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/secrets-of-cleopatra.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.7%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "bali-vacation",
    "title": "Bali Vacation",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/bali-vacation.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.7%",
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "jack-frost-s-winter",
    "title": "Jack Frost\"s Winter",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/jack-frost-s-winter.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.7%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "eye-of-the-storm",
    "title": "Eye of the Storm",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/eye-of-the-storm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.7%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "1024"
  },
  {
    "id": "floating-dragon",
    "title": "Floating Dragon",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/floating-dragon.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.7%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "star-pirates-code",
    "title": "Star Pirates Code",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/star-pirates-code.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.7%",
    "theme": "Science Fiction",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "big-bass-splash",
    "title": "Big Bass Splash",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/big-bass-splash.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.7%",
    "theme": "Nature",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "big-juan",
    "title": "Big Juan",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/big-juan.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.7%",
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "ultra-burn",
    "title": "Ultra Burn",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/ultra-burn.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "little-gem",
    "title": "Little Gem",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/little-gem.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.7%",
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "ultra-hold-and-spin",
    "title": "Ultra Hold and Spin",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/ultra-hold-and-spin.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.7%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "olympig",
    "title": "Olympig",
    "provider": "JDB",
    "providerLogo": "/images/providers/jdb.webp",
    "image": "/images/slots/olympig.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.6%",
    "theme": "Sports",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "watah-master-2",
    "title": "Watah Master 2",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/watah-master-2.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.6%",
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024"
  },
  {
    "id": "snakes-and-ladders-megadice",
    "title": "Snakes and Ladders Megadice",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/snakes-and-ladders-megadice.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.6%",
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "tic-tac-take",
    "title": "Tic Tac Take",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/tic-tac-take.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.6%",
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "candy-rush",
    "title": "Candy Rush",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/candy-rush.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.6%",
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "book-of-kingdoms",
    "title": "Book of Kingdoms",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/book-of-kingdoms.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.6%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "great-lagoon",
    "title": "Great Lagoon",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/great-lagoon.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.6%",
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "great-reef",
    "title": "Great Reef",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/great-reef.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.6%",
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "hot-to-burn-extreme",
    "title": "Hot to Burn Extreme",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/hot-to-burn-extreme.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "mighty-kong",
    "title": "Mighty Kong",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/mighty-kong.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.6%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "ultra-burn-2",
    "title": "Ultra Burn",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/ultra-burn-2.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.6%",
    "theme": "Sports",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "triple-pot-plinko-hercules",
    "title": "Triple Pot Plinko Hercules",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/triple-pot-plinko-hercules.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.6%",
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "voyage-of-cryo-gunner-x-lock",
    "title": "Voyage of Cryo Gunner X-Lock",
    "provider": "JDB",
    "providerLogo": "/images/providers/jdb.webp",
    "image": "/images/slots/voyage-of-cryo-gunner-x-lock.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Science Fiction",
    "features": [
      "Free Spins"
    ],
    "winningLine": "1024"
  },
  {
    "id": "watah-master",
    "title": "Watah Master",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/watah-master.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "watah-master-turbo",
    "title": "Watah Master Turbo",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/watah-master-turbo.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "hundreds-and-thousands",
    "title": "Hundreds and Thousands",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/hundreds-and-thousands.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "temujin-treasures",
    "title": "Temujin Treasures",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/temujin-treasures.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "big-bass-bonanza-reel-action",
    "title": "Big Bass Bonanza \u2013 Reel Action",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/big-bass-bonanza-reel-action.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "big-bass-mission-fishin",
    "title": "Big Bass Mission Fishin\u2019",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/big-bass-mission-fishin.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Foods",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "big-bass-trophy-catch",
    "title": "Big Bass Trophy Catch",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/big-bass-trophy-catch.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "big-bass-football-bonanza",
    "title": "Big Bass Football Bonanza",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/big-bass-football-bonanza.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Sports",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "bee-keeper",
    "title": "Bee Keeper",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/bee-keeper.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Foods",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "book-of-aztec-king",
    "title": "Book of Aztec King",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/book-of-aztec-king.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "knights-vs-barbarians",
    "title": "Knights vs Barbarians",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/knights-vs-barbarians.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "chilli-heat-spicy-spins",
    "title": "Chilli Heat Spicy Spins",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/chilli-heat-spicy-spins.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "cowboys-gold",
    "title": "Cowboys Gold",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/cowboys-gold.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "temple-guardians",
    "title": "Temple Guardians",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/temple-guardians.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "dragon-king-hot-pots",
    "title": "Dragon King Hot Pots",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/dragon-king-hot-pots.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "dynamite-diggin-doug",
    "title": "Dynamite Diggin Doug",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/dynamite-diggin-doug.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "fangtastic-freespins",
    "title": "Fangtastic Freespins",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/fangtastic-freespins.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "finger-lick-n-free-spins",
    "title": "Finger Lick'n Free Spins",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/finger-lick-n-free-spins.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "escape-the-pyramid-fire-ice",
    "title": "Escape the Pyramid \u2013 Fire & Ice",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/escape-the-pyramid-fire-ice.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "fire-strike",
    "title": "Fire Strike",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/fire-strike.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "fonzo-s-feline-fortunes",
    "title": "Fonzo\u2019s Feline Fortunes",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/fonzo-s-feline-fortunes.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "extra-juicy",
    "title": "Extra Juicy",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/extra-juicy.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "fishin-reels",
    "title": "Fishin Reels",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/fishin-reels.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "1024"
  },
  {
    "id": "hot-to-burn-7-deadly-free-spins",
    "title": "Hot to Burn - 7 Deadly Free Spins",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/hot-to-burn-7-deadly-free-spins.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "joker-s-jewels-hot",
    "title": "Joker\u2019s Jewels Hot",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/joker-s-jewels-hot.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "jackpot-blaze",
    "title": "Jackpot Blaze",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/jackpot-blaze.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "madame-destiny",
    "title": "Madame Destiny",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/madame-destiny.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Romantic",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "oodles-of-noodles",
    "title": "Oodles of Noodles",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/oodles-of-noodles.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "spellmaster",
    "title": "Spellmaster",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/spellmaster.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Science Fiction",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "steamin-reels",
    "title": "Steamin\u2019 Reels",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/steamin-reels.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "mysterious-egypt",
    "title": "Mysterious Egypt",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/mysterious-egypt.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "bigger-bass-splash",
    "title": "Bigger Bass Splash",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/bigger-bass-splash.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "club-tropicana-happy-hour",
    "title": "Club Tropicana Happy Hour",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/club-tropicana-happy-hour.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "fairytale-fortune",
    "title": "Fairytale Fortune",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/fairytale-fortune.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "treasure-horse",
    "title": "Treasure Horse",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/treasure-horse.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "lucky-dragon-ball",
    "title": "Lucky Dragon Ball",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/lucky-dragon-ball.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Anime",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "tree-of-riches",
    "title": "Tree of Riches",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/tree-of-riches.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "master-joker",
    "title": "Master Joker",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/master-joker.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "alien-invaders",
    "title": "Alien Invaders",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/alien-invaders.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Science Fiction",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "kingdom-of-asgard",
    "title": "Kingdom of Asgard",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/kingdom-of-asgard.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "the-big-dog-house",
    "title": "The Big Dog House",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/the-big-dog-house.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "sweet-craze",
    "title": "Sweet Craze",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/sweet-craze.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "snow-party",
    "title": "Snow Party",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/snow-party.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "haunted-crypt",
    "title": "Haunted Crypt",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/haunted-crypt.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Others",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "the-dog-house",
    "title": "The Dog House",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/the-dog-house.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "frightening-frankie",
    "title": "Frightening Frankie",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/frightening-frankie.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Others",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "lady-godiva",
    "title": "Lady Godiva",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/lady-godiva.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "jumbo-safari",
    "title": "Jumbo Safari",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/jumbo-safari.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "lobster-house",
    "title": "Lobster House",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/lobster-house.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Foods",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "the-hand-of-midas",
    "title": "The Hand of Midas",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/the-hand-of-midas.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "mermaid-s-treasure-trove",
    "title": "Mermaid\u2019s Treasure Trove",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/mermaid-s-treasure-trove.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "gates-of-gatot-kaca-super-scatter",
    "title": "Gates of Gatot Kaca Super Scatter",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/gates-of-gatot-kaca-super-scatter.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "oracle-of-gold",
    "title": "Oracle of Gold",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/oracle-of-gold.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "ice-mints",
    "title": "Ice Mints",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/ice-mints.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "heartbreakers",
    "title": "Heartbreakers",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/heartbreakers.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Romantic",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "rolling-in-treasures",
    "title": "Rolling in Treasures",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/rolling-in-treasures.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "gates-of-pyroth",
    "title": "Gates of Pyroth",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/gates-of-pyroth.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "idol-pop-fever",
    "title": "Idol Pop Fever",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/idol-pop-fever.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "starlight-archer-1000",
    "title": "Starlight Archer 1000",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/starlight-archer-1000.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Science Fiction",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "raging-bull",
    "title": "Raging Bull",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/raging-bull.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Sports",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "greek-gods",
    "title": "Greek Gods",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/greek-gods.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "5-lions",
    "title": "5 Lions",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/5-lions.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "5-lions-gold",
    "title": "5 Lions Gold",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/5-lions-gold.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "monkey-warrior",
    "title": "Monkey Warrior",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/monkey-warrior.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "queenie",
    "title": "Queenie",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/queenie.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Others",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "badge-blitz",
    "title": "Badge Blitz",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/badge-blitz.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "bounty-gold",
    "title": "Bounty Gold",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/bounty-gold.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "chests-of-cai-shen-2",
    "title": "Chests of Cai Shen 2",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/chests-of-cai-shen-2.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "chilli-heat",
    "title": "Chilli Heat",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/chilli-heat.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "cash-patrol",
    "title": "Cash Patrol",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/cash-patrol.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Sports",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "gold-party-2-after-hours",
    "title": "Gold Party 2 \u2013 After Hours",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/gold-party-2-after-hours.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "gold-rush-2",
    "title": "Gold Rush",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/gold-rush-2.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Adventure",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "hot-fiesta",
    "title": "Hot Fiesta",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/hot-fiesta.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "joker-king",
    "title": "Joker King",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/joker-king.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "aztec-blaze",
    "title": "Aztec Blaze",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/aztec-blaze.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "3-kingdoms-battle-of-red-cliffs",
    "title": "3 Kingdoms - Battle of Red Cliffs",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/3-kingdoms-battle-of-red-cliffs.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "lucky-s-wild-pub-2",
    "title": "Lucky\u2019s Wild Pub 2",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/lucky-s-wild-pub-2.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "lucky-s-wild-pub",
    "title": "Lucky\u2019s Wild Pub",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/lucky-s-wild-pub.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "mustang-gold",
    "title": "Mustang Gold",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/mustang-gold.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Adventure",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "peking-luck",
    "title": "Peking Luck",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/peking-luck.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "pyramid-king",
    "title": "Pyramid King",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/pyramid-king.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Buy Spins",
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "wolf-gold-4-pack",
    "title": "Wolf Gold 4 Pack",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/wolf-gold-4-pack.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "heart-of-rio",
    "title": "Heart of Rio",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/heart-of-rio.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Romantic",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "cult",
    "title": "CULT.",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/cult.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Others",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "sleeping-dragon",
    "title": "Sleeping Dragon",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/sleeping-dragon.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "wolf-gold-ultimate",
    "title": "Wolf Gold Ultimate",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/wolf-gold-ultimate.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Adventures",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "wild-walker",
    "title": "Wild Walker",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/wild-walker.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Nature",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "penguins-christmas-party-time",
    "title": "Penguins Christmas Party Time",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/penguins-christmas-party-time.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "mysterious",
    "title": "Mysterious",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/mysterious.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Others",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "cosmic-cash",
    "title": "Cosmic Cash",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/cosmic-cash.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Science Fiction",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "fruit-rainbow",
    "title": "Fruit Rainbow",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/fruit-rainbow.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "hammerstorm",
    "title": "Hammerstorm",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/hammerstorm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Movie",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "pandemic-rising",
    "title": "Pandemic Rising",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/pandemic-rising.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Others",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "pirate-gold",
    "title": "Pirate Gold",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/pirate-gold.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "fortune-hit-n-roll",
    "title": "Fortune Hit'n Roll",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/fortune-hit-n-roll.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "3-genie-wishes",
    "title": "3 Genie Wishes",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/3-genie-wishes.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "dragon-s-gate-bonus-choice",
    "title": "Dragon's Gate Bonus Choice",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/dragon-s-gate-bonus-choice.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "tiny-toads",
    "title": "Tiny Toads",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/tiny-toads.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Auto Game",
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "juicy-fruits",
    "title": "Juicy Fruits",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/juicy-fruits.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "pixie-wings",
    "title": "Pixie Wings",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/pixie-wings.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "aztec-gems",
    "title": "Aztec Gems",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/aztec-gems.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "big-bass-bonanza-3-reeler",
    "title": "Big Bass Bonanza 3 Reeler",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/big-bass-bonanza-3-reeler.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "himalayan-wild",
    "title": "Himalayan Wild",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/himalayan-wild.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "joker-s-jewels-wild",
    "title": "Joker's Jewels Wild",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/joker-s-jewels-wild.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "joker-s-jewels",
    "title": "Joker's Jewels",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/joker-s-jewels.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "joker-s-jewels-cash",
    "title": "Joker\u2019s Jewels Cash",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/joker-s-jewels-cash.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "joker-s-jewels-hold-spin",
    "title": "Joker\u2019s Jewels Hold & Spin",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/joker-s-jewels-hold-spin.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Hold & Spin"
    ],
    "winningLine": "243"
  },
  {
    "id": "super-joker",
    "title": "Super Joker",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/super-joker.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "code-of-cairo",
    "title": "Code of Cairo",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/code-of-cairo.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "super-7s",
    "title": "Super 7s",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/super-7s.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "triple-dragons",
    "title": "Triple Dragons",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/triple-dragons.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "aztec-bonanza",
    "title": "Aztec Bonanza",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/aztec-bonanza.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "mystic-wishes",
    "title": "Mystic Wishes",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/mystic-wishes.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "gem-trio",
    "title": "Gem Trio",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/gem-trio.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "monkey-madness",
    "title": "Monkey Madness",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/monkey-madness.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "piggy-bank-bills",
    "title": "Piggy Bank Bills",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/piggy-bank-bills.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Others",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "caishen-s-cash-pots",
    "title": "Caishen's Cash Pots",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/caishen-s-cash-pots.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "bigger-barn-house-bonanza",
    "title": "Bigger Barn House Bonanza",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/bigger-barn-house-bonanza.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "furry-bonanza-megaways",
    "title": "Furry Bonanza Megaways",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/furry-bonanza-megaways.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "captain-kraken-megaways",
    "title": "Captain Kraken Megaways",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/captain-kraken-megaways.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "dragon-pots-megaways",
    "title": "Dragon Pots Megaways",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/dragon-pots-megaways.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "spin-score-megaways",
    "title": "Spin & Score Megaways",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/spin-score-megaways.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Sports",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "lava-balls",
    "title": "Lava Balls",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/lava-balls.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Nature",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "mummy-s-jewels-100",
    "title": "Mummy\u2019s Jewels 100",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/mummy-s-jewels-100.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "mr-null-s-wicked-wares",
    "title": "Mr Null's Wicked Wares",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/mr-null-s-wicked-wares.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Others",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "launch-to-riches",
    "title": "Launch to Riches",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/launch-to-riches.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "sanatorium-secrets",
    "title": "Sanatorium Secrets",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/sanatorium-secrets.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Others",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "savannah-legend",
    "title": "Savannah Legend",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/savannah-legend.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "triple-pot-diamond",
    "title": "Triple Pot Diamond",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/triple-pot-diamond.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Romantic",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "curse-of-the-werewolf-megaways",
    "title": "Curse of the Werewolf Megaways",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/curse-of-the-werewolf-megaways.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "bloody-dawn",
    "title": "Bloody Dawn",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/bloody-dawn.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Romantic",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "wild-wild-riches-returns",
    "title": "Wild Wild Riches Returns",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/wild-wild-riches-returns.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.5%",
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "jade-butterfly",
    "title": "Jade Butterfly",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/jade-butterfly.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Anime",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "hotpot-wins",
    "title": "Hotpot Wins",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/hotpot-wins.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "john-hunter-and-galileo-s-secrets",
    "title": "John Hunter and Galileo\u2019s Secrets",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/john-hunter-and-galileo-s-secrets.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Science Fiction",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "chicken-chase",
    "title": "Chicken Chase",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/chicken-chase.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "coffee-wild",
    "title": "Coffee Wild",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/coffee-wild.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "john-hunter-and-the-mayan-gods",
    "title": "John Hunter and the Mayan Gods",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/john-hunter-and-the-mayan-gods.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "rise-of-giza-powernudge",
    "title": "Rise of Giza PowerNudge",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/rise-of-giza-powernudge.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "wild-hop-drop",
    "title": "Wild Hop & Drop",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/wild-hop-drop.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "rainbow-gold",
    "title": "Rainbow Gold",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/rainbow-gold.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "emperor-caishen",
    "title": "Emperor Caishen",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/emperor-caishen.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "asgard",
    "title": "Asgard",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/asgard.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Myth & History",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "chests-of-cai-shen",
    "title": "Chests of Cai Shen",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/chests-of-cai-shen.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "dragon-kingdom",
    "title": "Dragon Kingdom",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/dragon-kingdom.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "dwarven-gold-deluxe",
    "title": "Dwarven Gold Deluxe",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/dwarven-gold-deluxe.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "journey-to-the-west",
    "title": "Journey to the West",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/journey-to-the-west.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "rise-of-samurai",
    "title": "Rise of Samurai",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/rise-of-samurai.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "wild-spells",
    "title": "Wild Spells",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/wild-spells.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Anime",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "safari-king",
    "title": "Safari King",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/safari-king.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Nature",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "dragon-kingdom-eyes-of-fire",
    "title": "Dragon Kingdom - Eyes of Fire",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/dragon-kingdom-eyes-of-fire.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "fire-88",
    "title": "Fire 88",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/fire-88.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "master-chen-s-fortune",
    "title": "Master Chen's Fortune",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/master-chen-s-fortune.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "argonauts",
    "title": "Argonauts",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/argonauts.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "wild-wildebeest-wins",
    "title": "Wild Wildebeest Wins",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/wild-wildebeest-wins.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "congo-cash-xl",
    "title": "Congo Cash XL",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/congo-cash-xl.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Nature",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "wild-skullz",
    "title": "Wild Skullz",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/wild-skullz.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "tropical-tiki",
    "title": "Tropical Tiki",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/tropical-tiki.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "zeus-vs-typhon",
    "title": "Zeus vs Typhon",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/zeus-vs-typhon.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "7-clovers-of-fortune",
    "title": "7 Clovers of Fortune",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/7-clovers-of-fortune.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.4%",
    "theme": "Romantic",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "formosa-bear",
    "title": "Formosa Bear",
    "provider": "JDB",
    "providerLogo": "/images/providers/jdb.webp",
    "image": "/images/slots/formosa-bear.webp",
    "category": [
      "max-rpt",
      "bonus"
    ],
    "rtpPercent": "96.3%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "20 lines",
    "jackpot": true
  },
  {
    "id": "santa-s-gift-rush",
    "title": "Santa\"s Gift Rush",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/santa-s-gift-rush.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.3%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "dont-hit-plz",
    "title": "Dont Hit Plz",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/dont-hit-plz.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.3%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "shining-hot-100",
    "title": "Shining Hot 100",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/shining-hot-100.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.3%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "100"
  },
  {
    "id": "crown-of-fire",
    "title": "Crown of Fire",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/crown-of-fire.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "queen-of-gods",
    "title": "Queen of Gods",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/queen-of-gods.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.3%",
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "shining-hot-40",
    "title": "Shining Hot 40",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/shining-hot-40.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.3%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "40"
  },
  {
    "id": "north-guardians",
    "title": "North Guardians",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/north-guardians.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.3%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "shining-hot-5",
    "title": "Shining Hot 5",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/shining-hot-5.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.3%",
    "theme": "Movie",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "hockey-attack",
    "title": "Hockey Attack",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/hockey-attack.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.3%",
    "theme": "Sports",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "fruitking",
    "title": "FruitKing",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/fruitking.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.2%",
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "godofchess",
    "title": "GodOfChess",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/godofchess.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.2%",
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "hot-pinatas",
    "title": "Hot Pinatas",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/hot-pinatas.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.2%",
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "wolf-moon",
    "title": "Wolf Moon",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/wolf-moon.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.2%",
    "theme": "Nature",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "world-cup-russia-2018",
    "title": "World Cup Russia 2018",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/world-cup-russia-2018.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.2%",
    "theme": "Sports",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "football-baby",
    "title": "Football Baby",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/football-baby.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.2%",
    "theme": "Sports",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "christmas-multihops",
    "title": "Christmas MULTIHOPS",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/christmas-multihops.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.2%",
    "theme": "Others",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "cinderella-s-ball",
    "title": "Cinderella's Ball",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/cinderella-s-ball.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.2%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "crazy-genie",
    "title": "Crazy Genie",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/crazy-genie.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.2%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "dragon-s-luck",
    "title": "Dragon's Luck",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/dragon-s-luck.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.2%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "fortune-fest",
    "title": "Fortune Fest",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/fortune-fest.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.2%",
    "theme": "Others",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "chicagoii",
    "title": "CHICAGO\u2161",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/chicagoii.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.2%",
    "theme": "Movie",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "golden-lotus",
    "title": "Golden Lotus",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/golden-lotus.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.2%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "jelly-multihopstm",
    "title": "Jelly Multihops\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/jelly-multihopstm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.2%",
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "golden-temple-2",
    "title": "Golden Temple",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/golden-temple-2.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.2%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "three-star-fortune",
    "title": "Three Star Fortune",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/three-star-fortune.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.2%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "king-of-spear",
    "title": "King of Spear",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/king-of-spear.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.2%",
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "striking-hot-5",
    "title": "Striking Hot 5",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/striking-hot-5.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.2%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "lucky-dragons",
    "title": "Lucky Dragons",
    "provider": "JDB",
    "providerLogo": "/images/providers/jdb.webp",
    "image": "/images/slots/lucky-dragons.webp",
    "category": [
      "max-rpt",
      "bonus"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "jackpot": true
  },
  {
    "id": "lucky-bats-jp",
    "title": "Lucky Bats JP",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/lucky-bats-jp.webp",
    "category": [
      "jackpot",
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "jackpot": true
  },
  {
    "id": "jumping-mobile",
    "title": "jumping mobile",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/jumping-mobile.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Sports",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "golden-egg-jp",
    "title": "Golden Egg JP",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/golden-egg-jp.webp",
    "category": [
      "max-rpt",
      "bonus"
    ],
    "rtpPercent": "96.1%",
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243",
    "jackpot": true
  },
  {
    "id": "jump-higher-mobile",
    "title": "Jump Higher mobile",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/jump-higher-mobile.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Sports",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "flyout",
    "title": "FlyOut",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/flyout.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "ravejump2-m",
    "title": "RaveJump2 M",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/ravejump2-m.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "zeus-m",
    "title": "Zeus M",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/zeus-m.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "god-of-war-m",
    "title": "God of War M",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/god-of-war-m.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Movie",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "gold-stealer",
    "title": "Gold Stealer",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/gold-stealer.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "gu-gu-gu-m",
    "title": "Gu Gu Gu M",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/gu-gu-gu-m.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Anime",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "fire-chibi-m",
    "title": "Fire Chibi M",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/fire-chibi-m.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Anime",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "fortune-totem",
    "title": "Fortune Totem",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/fortune-totem.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "gugugu",
    "title": "GuGuGu",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/gugugu.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Anime",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "shou-xin",
    "title": "Shou-Xin",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/shou-xin.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Others",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "double-fly",
    "title": "Double Fly",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/double-fly.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "six-candy",
    "title": "Six Candy",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/six-candy.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "5-boxing",
    "title": "5 Boxing",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/5-boxing.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Sports",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "thor-2",
    "title": "Thor 2",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/thor-2.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Movie",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "wolf-disco",
    "title": "Wolf Disco",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/wolf-disco.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "fire-queen2",
    "title": "Fire Queen2",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/fire-queen2.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "dragon-s-treasure",
    "title": "Dragon\u2019s Treasure",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/dragon-s-treasure.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "songkran-festival",
    "title": "Songkran Festival",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/songkran-festival.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Others",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "muaythai",
    "title": "MuayThai",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/muaythai.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Sports",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "orientalbeauty",
    "title": "OrientalBeauty",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/orientalbeauty.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "ravehigh",
    "title": "RaveHigh",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/ravehigh.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "disconight",
    "title": "DiscoNight",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/disconight.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "the-cupids",
    "title": "The Cupids",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/the-cupids.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Romantic",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "bigwolf",
    "title": "BigWolf",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/bigwolf.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "oo-ga-cha-ka",
    "title": "Oo Ga Cha Ka",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/oo-ga-cha-ka.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Foods",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "king-of-atlantis",
    "title": "King of Atlantis",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/king-of-atlantis.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "burning-xi-you",
    "title": "Burning Xi-You",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/burning-xi-you.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "ninja-raccoon",
    "title": "Ninja Raccoon",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/ninja-raccoon.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Anime",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "dollar-bomb",
    "title": "Dollar Bomb",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/dollar-bomb.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "monkeyofficelegend",
    "title": "MonkeyOfficeLegend",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/monkeyofficelegend.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "floating-market",
    "title": "Floating Market",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/floating-market.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  }
]

const slotsBatch5: SlotGame[] = [
  {
    "id": "loy-krathong",
    "title": "Loy Krathong",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/loy-krathong.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "acrobatics",
    "title": "Acrobatics",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/acrobatics.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "k-o-island",
    "title": "K.O. Island",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/k-o-island.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "lucky-tigers",
    "title": "Lucky Tigers",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/lucky-tigers.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "mirror-mirror",
    "title": "Mirror Mirror",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/mirror-mirror.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "night-city-2",
    "title": "Night City",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/night-city-2.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Science Fiction",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "ravejump2",
    "title": "RaveJump2",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/ravejump2.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "treasure-pirate",
    "title": "Treasure Pirate",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/treasure-pirate.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Adventures",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "mafia",
    "title": "Mafia",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/mafia.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Romantic",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "waterworld",
    "title": "WaterWorld",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/waterworld.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "god-of-war",
    "title": "God of War",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/god-of-war.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "detective-dee",
    "title": "Detective Dee",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/detective-dee.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "fire-chibi",
    "title": "Fire Chibi",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/fire-chibi.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Anime",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "sherlock-holmes",
    "title": "Sherlock Holmes",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/sherlock-holmes.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "pharaoh-s-gold",
    "title": "Pharaoh's Gold",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/pharaoh-s-gold.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "lonely-planet",
    "title": "Lonely Planet",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/lonely-planet.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Adventures",
    "features": [
      "Auto Game"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "good-fortune",
    "title": "Good Fortune",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/good-fortune.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "da-fa-cai",
    "title": "Da Fa Cai",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/da-fa-cai.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "da-hong-zhong",
    "title": "Da Hong Zhong",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/da-hong-zhong.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "ecstatic-circus",
    "title": "Ecstatic Circus",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/ecstatic-circus.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "jumphigh",
    "title": "JumpHigh",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/jumphigh.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "ravejump",
    "title": "RaveJump",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/ravejump.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "blast-away",
    "title": "Blast Away",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/blast-away.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Science Fiction",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "1024"
  },
  {
    "id": "apollo",
    "title": "Apollo",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/apollo.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "chameleon",
    "title": "Chameleon",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/chameleon.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "zhongkui",
    "title": "ZhongKui",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/zhongkui.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "jumphigher",
    "title": "JumpHigher",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/jumphigher.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "asian-fortune",
    "title": "Asian Fortune",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/asian-fortune.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "blue-diamond",
    "title": "Blue Diamond",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/blue-diamond.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Nature",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "dragon-pearl",
    "title": "Dragon Pearl",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/dragon-pearl.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "1024"
  },
  {
    "id": "elven-magic",
    "title": "Elven Magic",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/elven-magic.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Science Fiction",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "esqueleto-mariachi",
    "title": "Esqueleto Mariachi",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/esqueleto-mariachi.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Others",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "flaming-fox",
    "title": "Flaming Fox",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/flaming-fox.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "fortune-charm",
    "title": "Fortune Charm",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/fortune-charm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "hanuman-bingo",
    "title": "Hanuman Bingo",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/hanuman-bingo.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "gems-gone-wild",
    "title": "Gems Gone Wild",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/gems-gone-wild.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "glow-dig",
    "title": "Glow Dig",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/glow-dig.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Adventures",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "golden-lamps",
    "title": "Golden Lamps",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/golden-lamps.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "golden-toad",
    "title": "Golden Toad",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/golden-toad.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "gold-star",
    "title": "Gold Star",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/gold-star.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "imperial-palace",
    "title": "Imperial Palace",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/imperial-palace.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "jade-charms",
    "title": "Jade Charms",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/jade-charms.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "lucky-carnival",
    "title": "Lucky Carnival",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/lucky-carnival.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "macau-racing",
    "title": "Macau Racing",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/macau-racing.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Sports",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "ancient-egypt",
    "title": "Ancient Egypt",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/ancient-egypt.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "wild-gladiator",
    "title": "Wild Gladiator",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/wild-gladiator.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "hot-safari",
    "title": "Hot Safari",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/hot-safari.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "wild-wild-bananas",
    "title": "Wild Wild Bananas",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/wild-wild-bananas.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.1%",
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "luckybats",
    "title": "LuckyBats",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/luckybats.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "treasure-boel-jp",
    "title": "Treasure Boel JP",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/treasure-boel-jp.webp",
    "category": [
      "max-rpt",
      "bonus"
    ],
    "rtpPercent": "96.0%",
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243",
    "jackpot": true
  },
  {
    "id": "pyramid-raider",
    "title": "Pyramid Raider",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/pyramid-raider.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Adventures",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "flying-cai-shen",
    "title": "Flying Cai Shen",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/flying-cai-shen.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "snow-queen",
    "title": "Snow Queen",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/snow-queen.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "wonderland",
    "title": "Wonderland",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/wonderland.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Anime",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "skrskr",
    "title": "SkrSkr",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/skrskr.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "luckybats-m",
    "title": "LuckyBats M",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/luckybats-m.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "invincible-elephant",
    "title": "Invincible Elephant",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/invincible-elephant.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "fa-cai-shen-m",
    "title": "Fa Cai Shen M",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/fa-cai-shen-m.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "meow",
    "title": "Meow",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/meow.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "hephaestus",
    "title": "Hephaestus",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/hephaestus.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "fa-cai-fu-wa",
    "title": "Fa Cai Fu Wa",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/fa-cai-fu-wa.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "sky-lanterns",
    "title": "Sky Lanterns",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/sky-lanterns.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "kronos",
    "title": "Kronos",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/kronos.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "greatlion",
    "title": "GreatLion",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/greatlion.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Adventures",
    "features": [
      "Auto Game",
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "greek-gods-2",
    "title": "Greek Gods",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/greek-gods-2.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool",
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "6-toros",
    "title": "6 Toros",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/6-toros.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Sports",
    "features": [
      "Prize Pool",
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "jump-high-2",
    "title": "Jump High 2",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/jump-high-2.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Adventures",
    "features": [
      "Auto Game",
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "gu-gu-gu-3",
    "title": "Gu Gu Gu 3",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/gu-gu-gu-3.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Foods",
    "features": [
      "Buy Spins",
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "six-gacha",
    "title": "Six Gacha",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/six-gacha.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Anime",
    "features": [
      "Prize Pool",
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "dragon-ball",
    "title": "Dragon Ball",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/dragon-ball.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Anime",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "wing-chun",
    "title": "Wing Chun",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/wing-chun.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Sports",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "lord-ganesha",
    "title": "Lord Ganesha",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/lord-ganesha.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool",
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "mini-roulette",
    "title": "Mini Roulette",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/mini-roulette.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Entertainment",
    "features": [
      "Prize Pool",
      "Auto Game"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "detective-dee2",
    "title": "Detective Dee2",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/detective-dee2.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Movie",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "baseball-fever",
    "title": "Baseball Fever",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/baseball-fever.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Sports",
    "features": [
      "Prize Pool",
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "striker-wild",
    "title": "Striker WILD",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/striker-wild.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Sports",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "the-chicken-house",
    "title": "The Chicken House",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/the-chicken-house.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "crazy-nuozha",
    "title": "Crazy NuoZha",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/crazy-nuozha.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "pub-tycoon",
    "title": "Pub Tycoon",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/pub-tycoon.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "all-wilds",
    "title": "All Wilds",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/all-wilds.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "apsaras",
    "title": "Apsaras",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/apsaras.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "fruitkingii",
    "title": "FruitKingII",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/fruitkingii.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Foods",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "emperor-s-favour",
    "title": "Emperor\"s Favour",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/emperor-s-favour.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "mr-rich",
    "title": "Mr.Rich",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/mr-rich.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Adventures",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "uproar-in-heaven",
    "title": "Uproar in Heaven",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/uproar-in-heaven.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "funny-alpaca",
    "title": "Funny Alpaca",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/funny-alpaca.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Nature",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "summermood",
    "title": "SummerMood",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/summermood.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Nature",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "jungle-party",
    "title": "Jungle Party",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/jungle-party.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "facaishen",
    "title": "FaCaiShen",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/facaishen.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "wanbaodino",
    "title": "WanBaoDino",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/wanbaodino.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Nature",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "happyrichyear",
    "title": "HappyRichYear",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/happyrichyear.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "treasurebowl",
    "title": "TreasureBowl",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/treasurebowl.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Adventures",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "redphoenix",
    "title": "RedPhoenix",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/redphoenix.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "poseidon",
    "title": "Poseidon",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/poseidon.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "fire-queen",
    "title": "Fire Queen",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/fire-queen.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Romantic",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "runningtoro",
    "title": "RunningToro",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/runningtoro.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Sports",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "all-star-team",
    "title": "All Star Team",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/all-star-team.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Sports",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "ali-baba-s-luck-megaways",
    "title": "Ali Baba's Luck Megaways",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/ali-baba-s-luck-megaways.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "ali-baba-s-luck-power-reels",
    "title": "Ali Baba's Luck Power Reels",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/ali-baba-s-luck-power-reels.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "amazon-island-megaways",
    "title": "Amazon Island Megaways",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/amazon-island-megaways.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "case-closed",
    "title": "Case Closed",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/case-closed.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Anime",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "cobra-queen",
    "title": "Cobra Queen",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/cobra-queen.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "drfrancashstein",
    "title": "DrFrancashstein",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/drfrancashstein.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "elephant-treasure",
    "title": "Elephant Treasure",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/elephant-treasure.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "emerald-diamond",
    "title": "Emerald Diamond",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/emerald-diamond.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Nature",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "five-star-power-reels",
    "title": "Five Star Power Reels",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/five-star-power-reels.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "fruit-blox",
    "title": "Fruit Blox",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/fruit-blox.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "myeong-ryang",
    "title": "Myeong-ryang",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/myeong-ryang.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "monster-hunter",
    "title": "Monster Hunter",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/monster-hunter.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Adventures",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "coin-spinner",
    "title": "Coin Spinner",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/coin-spinner.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "ganesha-jr",
    "title": "Ganesha Jr.",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/ganesha-jr.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "dragon-koi",
    "title": "Dragon Koi",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/dragon-koi.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "football-fever",
    "title": "Football Fever",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/football-fever.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Sports",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "gemtastic",
    "title": "Gemtastic",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/gemtastic.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "golden-offer",
    "title": "Golden Offer",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/golden-offer.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Others",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "leprechauns-magic-megaways",
    "title": "Leprechauns Magic Megaways",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/leprechauns-magic-megaways.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "leprechauns-magic-power-reels",
    "title": "Leprechauns Magic Power Reels",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/leprechauns-magic-power-reels.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "red-hot-slot",
    "title": "Red Hot Slot",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/red-hot-slot.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "sword-stomp",
    "title": "Sword Stomp",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/sword-stomp.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Adventures",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "big-bass-day-at-the-races",
    "title": "Big Bass Day at the Races",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/big-bass-day-at-the-races.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "big-bass-return-to-the-races",
    "title": "Big Bass Return to the Races",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/big-bass-return-to-the-races.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Sports",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "big-bass-xmas-xtreme",
    "title": "Big Bass Xmas Xtreme",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/big-bass-xmas-xtreme.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "big-bass-halloween",
    "title": "Big Bass Halloween",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/big-bass-halloween.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "ding-dong-christmas-bells",
    "title": "Ding Dong Christmas Bells",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/ding-dong-christmas-bells.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "jane-hunter-and-the-mask-of-montezuma",
    "title": "Jane Hunter and the Mask of Montezuma",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/jane-hunter-and-the-mask-of-montezuma.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "good-luck-good-fortune",
    "title": "Good Luck & Good Fortune",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/good-luck-good-fortune.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Foods",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "peak-power",
    "title": "Peak Power",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/peak-power.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Sports",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "snakes-ladders-snake-eyes",
    "title": "Snakes & Ladders - Snake Eyes",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/snakes-ladders-snake-eyes.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "bigger-bass-blizzard-christmas-catch",
    "title": "Bigger Bass Blizzard - Christmas Catch",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/bigger-bass-blizzard-christmas-catch.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "samurai-code",
    "title": "Samurai Code",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/samurai-code.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Science Fiction",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "club-tropicana",
    "title": "Club Tropicana",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/club-tropicana.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "zombie-train",
    "title": "Zombie Train",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/zombie-train.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "wisdom-of-athena-1000-xmas",
    "title": "Wisdom of Athena 1000 Xmas",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/wisdom-of-athena-1000-xmas.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "vegas-magic",
    "title": "Vegas Magic",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/vegas-magic.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "fire-archer",
    "title": "Fire Archer",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/fire-archer.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "bull-fiesta",
    "title": "Bull Fiesta",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/bull-fiesta.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "golden-ox",
    "title": "Golden Ox",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/golden-ox.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "golden-pig",
    "title": "Golden Pig",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/golden-pig.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "lucky-new-year",
    "title": "Lucky New Year",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/lucky-new-year.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "reel-banks",
    "title": "Reel Banks",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/reel-banks.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Others",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024"
  },
  {
    "id": "secret-city-gold",
    "title": "Secret City Gold",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/secret-city-gold.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "the-tiger-warrior",
    "title": "The Tiger Warrior",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/the-tiger-warrior.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "vegas-nights",
    "title": "Vegas Nights",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/vegas-nights.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "wildies",
    "title": "Wildies",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/wildies.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "wolf-gold",
    "title": "Wolf Gold",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/wolf-gold.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "buffalo-king",
    "title": "Buffalo King",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/buffalo-king.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "demon-pots",
    "title": "Demon Pots",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/demon-pots.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Others",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "Pay Anywhere"
  },
  {
    "id": "ripe-rewards",
    "title": "Ripe Rewards",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/ripe-rewards.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "chase-for-glory",
    "title": "Chase for Glory",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/chase-for-glory.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Sports",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "firebird-spirit",
    "title": "Firebird Spirit",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/firebird-spirit.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "cyber-pup-megaways",
    "title": "Cyber Pup Megaways",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/cyber-pup-megaways.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Science Fiction",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "3-dancing-monkeys",
    "title": "3 Dancing Monkeys",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/3-dancing-monkeys.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "mystery-of-the-orient",
    "title": "Mystery Of The Orient",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/mystery-of-the-orient.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Adventures",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "wanted-wildz",
    "title": "Wanted Wildz",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/wanted-wildz.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Adventure",
    "features": [
      "Prize Pool"
    ]
  },
  {
    "id": "win-escalator",
    "title": "Win Escalator",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/win-escalator.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ]
  },
  {
    "id": "wrigley-s-world",
    "title": "Wrigley's World",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/wrigley-s-world.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "96.0%",
    "theme": "Foods",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "ugo-aztec-gold",
    "title": "UGO Aztec Gold",
    "provider": "JDB",
    "providerLogo": "/images/providers/jdb.webp",
    "image": "/images/slots/ugo-aztec-gold.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.9%",
    "theme": "Myth & History",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "zumawild",
    "title": "ZumaWild",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/zumawild.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.9%",
    "theme": "Anime",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "dragon-heart",
    "title": "Dragon Heart",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/dragon-heart.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.9%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "the-beast-war",
    "title": "The Beast War",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/the-beast-war.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.9%",
    "theme": "Adventure",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "gugugu2",
    "title": "GuGuGu2",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/gugugu2.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.9%",
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "80s-spins",
    "title": "80s Spins",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/80s-spins.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.9%",
    "theme": "Movie",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "treasureisland",
    "title": "TreasureIsland",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/treasureisland.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.9%",
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "thor",
    "title": "THOR",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/thor.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.9%",
    "theme": "Movie",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "leprechaun-s-magic",
    "title": "Leprechaun's Magic",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/leprechaun-s-magic.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.9%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "7-piggies",
    "title": "7 Piggies",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/7-piggies.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.9%",
    "theme": "Entertainment",
    "features": [
      "Buy Spins",
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "rise-of-pyramids",
    "title": "Rise of Pyramids",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/rise-of-pyramids.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.9%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool",
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "mr-hallow-win",
    "title": "Mr. Hallow-Win",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/mr-hallow-win.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.8%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "piggy-gold",
    "title": "Piggy Gold",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/piggy-gold.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.8%",
    "theme": "Foods",
    "features": [
      "Buy Spins",
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "ali-baba-s-luck",
    "title": "Ali Baba's Luck",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/ali-baba-s-luck.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.8%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "chinese-wilds",
    "title": "Chinese Wilds",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/chinese-wilds.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.8%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "dragon-s-mirror",
    "title": "Dragon's Mirror",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/dragon-s-mirror.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.8%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "epic-treasure",
    "title": "Epic Treasure",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/epic-treasure.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.8%",
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "nightmare-family-megaways",
    "title": "Nightmare Family Megaways",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/nightmare-family-megaways.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.8%",
    "theme": "Others",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "redline-rush",
    "title": "Redline Rush",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/redline-rush.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.8%",
    "theme": "Sports",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "sea-boat-adventure-megawaystm",
    "title": "Sea Boat Adventure MegaWays\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/sea-boat-adventure-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.8%",
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "24-hour-grand-prix",
    "title": "24 Hour Grand Prix",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/24-hour-grand-prix.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Sports",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "hip-hop-panda",
    "title": "Hip Hop Panda",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/hip-hop-panda.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "legend-of-hou-yi",
    "title": "Legend of Hou Yi",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/legend-of-hou-yi.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "prosperity-lion",
    "title": "Prosperity Lion",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/prosperity-lion.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "symbols-of-egypt",
    "title": "Symbols of Egypt",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/symbols-of-egypt.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Buy Spins",
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "4-squad",
    "title": "4 Squad",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/4-squad.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Sports",
    "features": [
      "Auto Game"
    ],
    "winningLine": "1024"
  },
  {
    "id": "agent-royale",
    "title": "Agent Royale",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/agent-royale.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Adventures",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "alexander-the-great-world-conqueror",
    "title": "Alexander The Great World Conqueror",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/alexander-the-great-world-conqueror.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "ancient-disco",
    "title": "Ancient Disco",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/ancient-disco.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "ancients-blessing",
    "title": "Ancients' Blessing",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/ancients-blessing.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "apache-way",
    "title": "Apache Way",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/apache-way.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "atlantis",
    "title": "Atlantis",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/atlantis.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "aurum-codex",
    "title": "Aurum Codex",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/aurum-codex.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "bass-boss",
    "title": "Bass Boss",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/bass-boss.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "1024"
  },
  {
    "id": "blobsters-clusterbustertm",
    "title": "Blobsters ClusterBuster\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/blobsters-clusterbustertm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Anime",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "blood-suckerstm-megawaystm",
    "title": "Blood Suckers\u2122 Megaways\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/blood-suckerstm-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Others",
    "features": [
      "Free Spins"
    ],
    "winningLine": "1024"
  },
  {
    "id": "buffalo-collector",
    "title": "Buffalo Collector",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/buffalo-collector.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Nature",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "bugsy-s-bar",
    "title": "Bugsy\u2019s Bar",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/bugsy-s-bar.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ]
  },
  {
    "id": "bulls-run-wild",
    "title": "Bulls Run Wild",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/bulls-run-wild.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Sports",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "cash-explorer",
    "title": "Cash Explorer",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/cash-explorer.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Adventures",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "cash-ultimate",
    "title": "Cash Ultimate",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/cash-ultimate.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Others",
    "features": [
      "Buy Spins"
    ]
  },
  {
    "id": "cirque-d-la-fortune",
    "title": "Cirque D\u0435 La Fortune",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/cirque-d-la-fortune.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "clash-of-the-beasts",
    "title": "Clash of the Beasts",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/clash-of-the-beasts.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "crystal-mirror",
    "title": "Crystal Mirror",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/crystal-mirror.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Science Fiction",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "desert-legends",
    "title": "Desert Legends",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/desert-legends.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "1024"
  },
  {
    "id": "diamond-blitz-2",
    "title": "Diamond Blitz 2",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/diamond-blitz-2.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Science Fiction",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "diamond-doggies",
    "title": "Diamond Doggies",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/diamond-doggies.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Nature",
    "features": [
      "Auto Game"
    ]
  },
  {
    "id": "diamonds-up",
    "title": "Diamonds Up",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/diamonds-up.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Science Fiction",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "dice-dice-dice",
    "title": "Dice Dice Dice",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/dice-dice-dice.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ]
  },
  {
    "id": "doggy-riches-megawaystm",
    "title": "Doggy Riches Megaways\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/doggy-riches-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "dragon-s-fire-infinireels",
    "title": "Dragon's Fire Infinireels",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/dragon-s-fire-infinireels.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "dragon-s-fire-megawaystm",
    "title": "Dragon's Fire MegaWays\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/dragon-s-fire-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "dynamite-riches",
    "title": "Dynamite Riches",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/dynamite-riches.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "easy-gold",
    "title": "Easy Gold",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/easy-gold.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "egypt-clusterbustertm",
    "title": "Egypt Clusterbuster\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/egypt-clusterbustertm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "emperor-of-india",
    "title": "Emperor of India",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/emperor-of-india.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "epic-treasure-2",
    "title": "Epic Treasure 2",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/epic-treasure-2.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "flodder",
    "title": "Flodder",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/flodder.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "fruit-flash",
    "title": "Fruit Flash",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/fruit-flash.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "fruit-snap",
    "title": "Fruit Snap",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/fruit-snap.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "gems-inferno-megawaystm",
    "title": "Gems Inferno Megaways\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/gems-inferno-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "genie-nights",
    "title": "Genie Nights",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/genie-nights.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "giga-blast",
    "title": "Giga Blast",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/giga-blast.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "goddess-of-the-moon-megaways",
    "title": "Goddess of the Moon MegaWays",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/goddess-of-the-moon-megaways.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "gods-of-troy",
    "title": "Gods of Troy",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/gods-of-troy.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "gods-of-troy-megawaystm",
    "title": "Gods of Troy MegaWays\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/gods-of-troy-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "golden-cryptex",
    "title": "Golden Cryptex",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/golden-cryptex.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Science Fiction",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "golden-leprechaun-megawaystm",
    "title": "Golden Leprechaun MegaWays\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/golden-leprechaun-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "golden-tsar",
    "title": "Golden Tsar",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/golden-tsar.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "gold-mine-mistress",
    "title": "Gold Mine Mistress",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/gold-mine-mistress.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Romantic",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "gonzo-s-questtm-megawaystm",
    "title": "Gonzo's Quest\u2122 MegaWays\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/gonzo-s-questtm-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "good-luck-clusterbustertm",
    "title": "Good Luck Clusterbuster\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/good-luck-clusterbustertm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "hansel-gretel-candyhouse",
    "title": "Hansel & Gretel Candyhouse",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/hansel-gretel-candyhouse.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "happy-apples",
    "title": "Happy Apples",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/happy-apples.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Foods",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "here-kitty-kitty",
    "title": "Here Kitty Kitty",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/here-kitty-kitty.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "in-the-rabbit-hole",
    "title": "In the Rabbit Hole",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/in-the-rabbit-hole.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Adventures",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "judgement-day-megawaystm",
    "title": "Judgement Day Megaways\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/judgement-day-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "legend-of-forbidden-love-megawaystm",
    "title": "Legend of Forbidden Love Megaways\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/legend-of-forbidden-love-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Romantic",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "london-tube",
    "title": "London Tube",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/london-tube.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Others",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "magic-powers-megaways",
    "title": "Magic Powers Megaways",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/magic-powers-megaways.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Science Fiction",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "majestic-mysteries-power-reelstm",
    "title": "Majestic Mysteries Power Reels\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/majestic-mysteries-power-reelstm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "mayhem",
    "title": "Mayhem",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/mayhem.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "midnight-romance",
    "title": "Midnight Romance",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/midnight-romance.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Romantic",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "moon-spell",
    "title": "Moon Spell",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/moon-spell.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "narcos-mexico",
    "title": "Narcos Mexico",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/narcos-mexico.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Movie",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "piggy-riches-2tm-megawaystm",
    "title": "Piggy Riches 2\u2122 MegaWays\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/piggy-riches-2tm-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "primate-king-megawaystm",
    "title": "Primate King MegaWays\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/primate-king-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "reel-keeper-power-reels",
    "title": "Reel Keeper Power Reels",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/reel-keeper-power-reels.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "risque-megawaystm",
    "title": "Risque Megaways\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/risque-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "robin-hood-s-wild-forest",
    "title": "Robin Hood's Wild Forest",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/robin-hood-s-wild-forest.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "sakura-masks",
    "title": "Sakura Masks",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/sakura-masks.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Anime",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "santa-spins",
    "title": "Santa Spins",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/santa-spins.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ]
  },
  {
    "id": "savannah-pride",
    "title": "Savannah Pride",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/savannah-pride.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "sea-boat-adventure",
    "title": "Sea Boat Adventure",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/sea-boat-adventure.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  }
]

const slotsBatch6: SlotGame[] = [
  {
    "id": "shadow-society",
    "title": "Shadow Society",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/shadow-society.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "sheep-gone-wild",
    "title": "Sheep Gone Wild",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/sheep-gone-wild.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "siren-s-riches",
    "title": "Siren's Riches",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/siren-s-riches.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "stolen-treasures",
    "title": "Stolen Treasures",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/stolen-treasures.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "the-good-the-bad-and-the-rich",
    "title": "The Good, The Bad and The Rich",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/the-good-the-bad-and-the-rich.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "Pay Anywhere"
  },
  {
    "id": "transylvanian-night-of-blood",
    "title": "Transylvanian: Night of Blood",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/transylvanian-night-of-blood.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "trick-of-the-dead-wild-candies-megaways",
    "title": "Trick of the Dead Wild Candies Megaways",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/trick-of-the-dead-wild-candies-megaways.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "tricks-and-treats",
    "title": "Tricks and Treats",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/tricks-and-treats.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "Pay Anywhere"
  },
  {
    "id": "ultra-rich",
    "title": "Ultra Rich",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/ultra-rich.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "viking-s-legacy-everywaytm",
    "title": "Viking's Legacy EveryWay\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/viking-s-legacy-everywaytm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "hokkaido-wolf",
    "title": "Hokkaido Wolf",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/hokkaido-wolf.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "wild-touchdown-megaways",
    "title": "Wild Touchdown Megaways",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/wild-touchdown-megaways.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Sports",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "wild-tundra",
    "title": "Wild Tundra",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/wild-tundra.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "wolfkin",
    "title": "Wolfkin",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/wolfkin.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "wolf-stacks-megaways",
    "title": "Wolf Stacks MegaWays",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/wolf-stacks-megaways.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "yucatan-s-mystery",
    "title": "Yucatan's Mystery",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/yucatan-s-mystery.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "zaida-s-fortune",
    "title": "Zaida's Fortune",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/zaida-s-fortune.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Romantic",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "zeus-lightning-megawaystm",
    "title": "Zeus Lightning MegaWays\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/zeus-lightning-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.7%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "10-001-nights-megawaystm",
    "title": "10,001 Nights MegaWays\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/10-001-nights-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "5-families",
    "title": "5 Families",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/5-families.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ]
  },
  {
    "id": "astronaut",
    "title": "Astronaut",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/astronaut.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Science Fiction",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "athens-megawaystm",
    "title": "Athens MegaWays\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/athens-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "bass-boss-megawaystm",
    "title": "Bass Boss MegaWays\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/bass-boss-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Sports",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "betty-boris-and-boo",
    "title": "Betty, Boris and Boo",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/betty-boris-and-boo.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ]
  },
  {
    "id": "buffalo-mania-megawaystm",
    "title": "Buffalo Mania MegaWays\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/buffalo-mania-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "cannonball-cash",
    "title": "Cannonball Cash",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/cannonball-cash.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "cash-or-nothing",
    "title": "Cash or Nothing",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/cash-or-nothing.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ]
  },
  {
    "id": "christmas-morning",
    "title": "Christmas Morning",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/christmas-morning.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Others",
    "features": [
      "Free Spins",
      "Auto Game"
    ]
  },
  {
    "id": "cyber-attack",
    "title": "Cyber Attack",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/cyber-attack.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Science Fiction",
    "features": [
      "Buy Spins",
      "Free Spins"
    ],
    "winningLine": "1024"
  },
  {
    "id": "da-vinci-s-mystery",
    "title": "Da Vinci's Mystery",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/da-vinci-s-mystery.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "dear-santa",
    "title": "Dear Santa",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/dear-santa.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "dragons-lock",
    "title": "Dragons\u2019 Lock",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/dragons-lock.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "eagle-riches",
    "title": "Eagle Riches",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/eagle-riches.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Adventures",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "gems-gone-wild-power-reels",
    "title": "Gems Gone Wild Power Reels",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/gems-gone-wild-power-reels.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Science Fiction",
    "features": [
      "Prize Pool",
      "Free Spins"
    ],
    "winningLine": "1024"
  },
  {
    "id": "gonzita-s-quest",
    "title": "Gonzita's Quest",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/gonzita-s-quest.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "great-gold",
    "title": "Great Gold",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/great-gold.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Adventures",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "knights-of-avalon",
    "title": "Knights Of Avalon",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/knights-of-avalon.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "magic-tricks",
    "title": "Magic Tricks",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/magic-tricks.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "Pay Anywhere"
  },
  {
    "id": "monsters-unchained",
    "title": "Monsters Unchained",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/monsters-unchained.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "mystery-reels-deluxe",
    "title": "Mystery Reels Deluxe",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/mystery-reels-deluxe.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Others",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "peggy-sweets",
    "title": "Peggy Sweets",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/peggy-sweets.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Foods",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "purr-power",
    "title": "Purr Power",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/purr-power.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "rock-n-lock",
    "title": "Rock'n'Lock",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/rock-n-lock.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "roman-emperors",
    "title": "Roman Emperors",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/roman-emperors.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "spooky-carnival",
    "title": "Spooky Carnival",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/spooky-carnival.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "steam-squad",
    "title": "Steam Squad",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/steam-squad.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Science Fiction",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "the-wild-kiss",
    "title": "The Wild Kiss",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/the-wild-kiss.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Romantic",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "trillionaire-megawaystm",
    "title": "Trillionaire MegaWays\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/trillionaire-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "turtle-paradise",
    "title": "Turtle Paradise",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/turtle-paradise.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "vault-cracker-megawaystm",
    "title": "Vault Cracker MegaWays\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/vault-cracker-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "viral-spiral",
    "title": "Viral Spiral",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/viral-spiral.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Others",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "lucky-grace-and-charm",
    "title": "Lucky Grace And Charm",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/lucky-grace-and-charm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Romantic",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "magic-money-maze",
    "title": "Magic Money Maze",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/magic-money-maze.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "spirit-of-adventure",
    "title": "Spirit of Adventure",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/spirit-of-adventure.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "dragon-hot-hold-and-spin",
    "title": "Dragon Hot Hold and Spin",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/dragon-hot-hold-and-spin.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "wings-of-ra",
    "title": "Wings Of Ra",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/wings-of-ra.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "wings-of-ra-megawaystm",
    "title": "Wings of Ra Megaways\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/wings-of-ra-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Myth & History",
    "features": [
      "Buy Spins",
      "Free Spins"
    ],
    "winningLine": "1024"
  },
  {
    "id": "year-round-riches-clusterbuster",
    "title": "Year-Round Riches Clusterbuster",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/year-round-riches-clusterbuster.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "Pay Anywhere"
  },
  {
    "id": "zillard-king",
    "title": "Zillard King",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/zillard-king.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.6%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "gem-saviour-sword",
    "title": "Gem Saviour Sword",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/gem-saviour-sword.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.5%",
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "bubble-pop",
    "title": "Bubble Pop",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/bubble-pop.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "Pay Anywhere"
  },
  {
    "id": "book-of-fallen",
    "title": "Book of Fallen",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/book-of-fallen.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "fire-strike-2",
    "title": "Fire Strike 2",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/fire-strike-2.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "aztec-king",
    "title": "Aztec King",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/aztec-king.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.5%",
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "magician-s-secrets",
    "title": "Magician's Secrets",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/magician-s-secrets.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "lucky-lightning",
    "title": "Lucky Lightning",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/lucky-lightning.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.5%",
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "koi-pond",
    "title": "Koi Pond",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/koi-pond.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.4%",
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "gold-party",
    "title": "Gold Party",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/gold-party.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.4%",
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "fire-hot-5",
    "title": "Fire Hot 5",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/fire-hot-5.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "hood-vs-wolf",
    "title": "Hood vs Wolf",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/hood-vs-wolf.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.3%",
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "goblin-heist-powernudge",
    "title": "Goblin Heist Powernudge",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/goblin-heist-powernudge.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.3%",
    "theme": "Adventures",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "medusa-2",
    "title": "Medusa",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/medusa-2.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.2%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "fire-hot-100",
    "title": "Fire Hot 100",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/fire-hot-100.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "fire-hot-40",
    "title": "Fire Hot 40",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/fire-hot-40.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "lucky-dragons-2",
    "title": "Lucky Dragons",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/lucky-dragons-2.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.1%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "hercules-son-of-zeus",
    "title": "Hercules Son Of Zeus",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/hercules-son-of-zeus.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.1%",
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "tree-of-fortune",
    "title": "Tree of Fortune",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/tree-of-fortune.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.0%",
    "theme": "Nature",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "fortune-gods",
    "title": "Fortune Gods",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/fortune-gods.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.0%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "devil-s-13",
    "title": "Devil's 13",
    "provider": "PP",
    "providerLogo": "/images/providers/pp.webp",
    "image": "/images/slots/devil-s-13.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "95.0%",
    "theme": "Others",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "plushie-frenzy",
    "title": "Plushie Frenzy",
    "provider": "PG",
    "providerLogo": "/images/providers/pg.webp",
    "image": "/images/slots/plushie-frenzy.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "94.8%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "fa-fa-babies-2",
    "title": "Fa Fa Babies 2",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/fa-fa-babies-2.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "94.7%",
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "rainbow-jackpots-megaways",
    "title": "Rainbow Jackpots MegaWays",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/rainbow-jackpots-megaways.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "94.7%",
    "theme": "Nature",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "fortune-spirits",
    "title": "Fortune Spirits",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/fortune-spirits.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "92.3%",
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "lucky-3",
    "title": "Lucky 3",
    "provider": "CQ9",
    "providerLogo": "/images/providers/cq9.webp",
    "image": "/images/slots/lucky-3.webp",
    "category": [
      "max-rpt"
    ],
    "rtpPercent": "89.3%",
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "1942-sky-warrior",
    "title": "1942: Sky Warrior",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/1942-sky-warrior.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "caishen-party",
    "title": "Caishen Party",
    "provider": "JDB",
    "providerLogo": "/images/providers/jdb.webp",
    "image": "/images/slots/caishen-party.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "galaxy-burst",
    "title": "Galaxy Burst",
    "provider": "JDB",
    "providerLogo": "/images/providers/jdb.webp",
    "image": "/images/slots/galaxy-burst.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Science Fiction",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "age-of-akkadia",
    "title": "Age Of Akkadia",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/age-of-akkadia.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "beriched",
    "title": "Beriched",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/beriched.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "blazing-clusters",
    "title": "Blazing Clusters",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/blazing-clusters.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Science Fiction",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "dracula-awakening",
    "title": "Dracula Awakening",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/dracula-awakening.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "dragon-king-legend-of-the-seas",
    "title": "Dragon King: Legend of the Seas",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/dragon-king-legend-of-the-seas.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "forever-7-s",
    "title": "Forever 7's",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/forever-7-s.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "fortune-house-power-reelstm",
    "title": "Fortune House Power Reels\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/fortune-house-power-reelstm.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "get-the-gold-infinireelstm",
    "title": "Get the Gold INFINIREELS\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/get-the-gold-infinireelstm.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "hammer-gods",
    "title": "Hammer Gods",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/hammer-gods.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "harle-coin",
    "title": "Harle Coin",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/harle-coin.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Romantic",
    "features": [
      "Free Spins"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "hot-hot-chilli-pot",
    "title": "Hot Hot Chilli Pot",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/hot-hot-chilli-pot.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "hustling",
    "title": "Hustling",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/hustling.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "jester-spins",
    "title": "Jester Spins",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/jester-spins.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "jewel-scarabs",
    "title": "Jewel Scarabs",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/jewel-scarabs.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "jingle-bells",
    "title": "Jingle Bells",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/jingle-bells.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "jingle-bells-power-reels",
    "title": "Jingle Bells Power Reels",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/jingle-bells-power-reels.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "1024"
  },
  {
    "id": "jingle-ways-megawaystm",
    "title": "Jingle Ways Megaways\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/jingle-ways-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "joe-exotic",
    "title": "Joe Exotic",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/joe-exotic.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Movie",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "laser-fruit",
    "title": "Laser Fruit",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/laser-fruit.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "last-chance-saloon",
    "title": "Last Chance Saloon",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/last-chance-saloon.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "legendary-excalibur",
    "title": "Legendary Excalibur",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/legendary-excalibur.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "legend-of-athena",
    "title": "Legend Of Athena",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/legend-of-athena.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "lion-dance",
    "title": "Lion Dance",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/lion-dance.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "lion-s-hoard",
    "title": "Lion's Hoard",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/lion-s-hoard.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "lucky-little-devil",
    "title": "Lucky Little Devil",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/lucky-little-devil.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Romantic",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "lucky-easter",
    "title": "Lucky Easter",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/lucky-easter.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "1024"
  },
  {
    "id": "lucky-fortune-cat",
    "title": "Lucky Fortune Cat",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/lucky-fortune-cat.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "lucky-fridays",
    "title": "Lucky Fridays",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/lucky-fridays.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "lucky-halloween",
    "title": "Lucky Halloween",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/lucky-halloween.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "lucky-oktoberfest",
    "title": "Lucky Oktoberfest",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/lucky-oktoberfest.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "lucky-valentine",
    "title": "Lucky Valentine",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/lucky-valentine.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Romantic",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "lucky-wizard",
    "title": "Lucky Wizard",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/lucky-wizard.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "magic-gate",
    "title": "Magic Gate",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/magic-gate.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Science Fiction",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "masquerade",
    "title": "Masquerade",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/masquerade.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "mayan-gods",
    "title": "Mayan Gods",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/mayan-gods.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "mega-dragon",
    "title": "Mega Dragon",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/mega-dragon.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "mega-jade",
    "title": "Mega Jade",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/mega-jade.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "mega-pyramid",
    "title": "Mega Pyramid",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/mega-pyramid.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "mega-rise",
    "title": "Mega Rise",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/mega-rise.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "midas-gold",
    "title": "Midas Gold",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/midas-gold.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "multiplier-riches",
    "title": "Multiplier Riches",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/multiplier-riches.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Free Spins",
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "mystery-reels",
    "title": "Mystery Reels",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/mystery-reels.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "mystery-reels-megaways",
    "title": "Mystery Reels MegaWays",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/mystery-reels-megaways.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "mystery-reels-power-reels",
    "title": "Mystery Reels Power Reels",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/mystery-reels-power-reels.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "mystic-staxx",
    "title": "Mystic Staxx",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/mystic-staxx.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "mystic-wheel",
    "title": "Mystic Wheel",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/mystic-wheel.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "neon-links",
    "title": "Neon Links",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/neon-links.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Science Fiction",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "nft-megawaystm",
    "title": "NFT Megaways\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/nft-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Science Fiction",
    "features": [
      "Buy Spins",
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "night-roller",
    "title": "Night Roller",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/night-roller.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "ninja-ways",
    "title": "Ninja Ways",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/ninja-ways.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Anime",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "ocean-fortune",
    "title": "Ocean Fortune",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/ocean-fortune.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "path-of-destiny",
    "title": "Path of Destiny",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/path-of-destiny.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "persian-fortune",
    "title": "Persian Fortune",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/persian-fortune.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "phoenix-fire-power-reels",
    "title": "Phoenix Fire Power Reels",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/phoenix-fire-power-reels.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "piggy-pirates",
    "title": "Piggy Pirates",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/piggy-pirates.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "piggy-richestm-megawaystm",
    "title": "Piggy Riches\u2122 MegaWays\u2122",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/piggy-richestm-megawaystm.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Buy Spins",
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "pirates-plenty-battle-for-gold",
    "title": "Pirates' Plenty Battle for Gold",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/pirates-plenty-battle-for-gold.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "pirates-plenty",
    "title": "Pirates' Plenty",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/pirates-plenty.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "pirates-plenty-megaways",
    "title": "Pirates Plenty MegaWays",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/pirates-plenty-megaways.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "primate-king",
    "title": "Primate King",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/primate-king.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "puss-n-boots",
    "title": "Puss'n Boots",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/puss-n-boots.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Movie",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "rainbow-jackpots",
    "title": "Rainbow Jackpots",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/rainbow-jackpots.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "rainbow-jackpots-power-lines",
    "title": "Rainbow Jackpots Power Lines",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/rainbow-jackpots-power-lines.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "ra-s-legend",
    "title": "Ra's Legend",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/ra-s-legend.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "1024"
  },
  {
    "id": "reactor",
    "title": "Reactor",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/reactor.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Science Fiction",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "red-diamond",
    "title": "Red Diamond",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/red-diamond.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Others",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "phoenix",
    "title": "Phoenix",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/phoenix.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "reel-heist",
    "title": "Reel Heist",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/reel-heist.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Auto Game"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "reel-keeper",
    "title": "Reel Keeper",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/reel-keeper.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "reel-king-mega",
    "title": "Reel King Mega",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/reel-king-mega.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "1024"
  },
  {
    "id": "regal-beasts",
    "title": "Regal Beasts",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/regal-beasts.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "regal-streak",
    "title": "Regal Streak",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/regal-streak.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "reptizillions-power-reels",
    "title": "Reptizillions Power Reels",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/reptizillions-power-reels.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "riddle-of-the-sphinx",
    "title": "Riddle Of The Sphinx",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/riddle-of-the-sphinx.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "1024"
  },
  {
    "id": "rio-stars",
    "title": "Rio Stars",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/rio-stars.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "rocket-men",
    "title": "Rocket Men",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/rocket-men.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Science Fiction",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "shah-mat",
    "title": "Shah Mat",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/shah-mat.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "snow-wild-and-the-7-features",
    "title": "Snow Wild And The 7 Features",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/snow-wild-and-the-7-features.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Prize Pool",
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "spin-town",
    "title": "Spin Town",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/spin-town.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "stage-888",
    "title": "Stage 888",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/stage-888.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Buy Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "sumo-spins",
    "title": "Sumo Spins",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/sumo-spins.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Sports",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "sylvan-spirits",
    "title": "Sylvan Spirits",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/sylvan-spirits.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "the-equalizer",
    "title": "The Equalizer",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/the-equalizer.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Movie",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "the-greatest-train-robbery",
    "title": "The Greatest Train Robbery",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/the-greatest-train-robbery.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Movie",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "the-wild-hatter",
    "title": "The Wild Hatter",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/the-wild-hatter.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Anime",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "the-wisecracker-lightning",
    "title": "The Wisecracker Lightning",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/the-wisecracker-lightning.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "thor-s-lightning",
    "title": "Thor's Lightning",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/thor-s-lightning.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Science Fiction",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "thor-s-vengeance",
    "title": "Thor's Vengeance",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/thor-s-vengeance.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Science Fiction",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "three-kingdoms",
    "title": "Three Kingdoms",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/three-kingdoms.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "three-musketeers",
    "title": "Three Musketeers",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/three-musketeers.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Movie",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "tiki-fruits",
    "title": "Tiki Fruits",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/tiki-fruits.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Foods",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "tiki-fruits-totem-frenzy",
    "title": "Tiki Fruits Totem Frenzy",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/tiki-fruits-totem-frenzy.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins",
      "Prize Pool"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "totem-lightning",
    "title": "Totem Lightning",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/totem-lightning.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "totem-lightning-power-reels",
    "title": "Totem Lightning Power Reels",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/totem-lightning-power-reels.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Auto Game",
      "Free Spins"
    ],
    "winningLine": "1024"
  },
  {
    "id": "trillionaire",
    "title": "Trillionaire",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/trillionaire.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Buy Spins",
      "Prize Pool"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "vault-of-anubis",
    "title": "Vault Of Anubis",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/vault-of-anubis.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "vicky-ventura",
    "title": "Vicky Ventura",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/vicky-ventura.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Movie",
    "features": [
      "Free Spins"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "war-of-gods",
    "title": "War of Gods",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/war-of-gods.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Prize Pool"
    ],
    "winningLine": "243"
  },
  {
    "id": "well-of-wilds-megaways",
    "title": "Well of Wilds MegaWays",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/well-of-wilds-megaways.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "1024"
  },
  {
    "id": "well-of-wishes",
    "title": "Well Of Wishes",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/well-of-wishes.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "what-the-fox-megaways",
    "title": "What The Fox MegaWays",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/what-the-fox-megaways.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "1024"
  },
  {
    "id": "wild-cats-multiline",
    "title": "Wild Cats Multiline",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/wild-cats-multiline.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Auto Game"
    ],
    "winningLine": "243"
  },
  {
    "id": "wild-circus",
    "title": "Wild Circus",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/wild-circus.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "20 lines"
  },
  {
    "id": "wild-elements",
    "title": "Wild Elements",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/wild-elements.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Nature",
    "features": [
      "Free Spins"
    ],
    "winningLine": "243"
  },
  {
    "id": "wild-expedition",
    "title": "Wild Expedition",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/wild-expedition.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Adventures",
    "features": [
      "Auto Game"
    ],
    "winningLine": "All Ways"
  },
  {
    "id": "wild-nords",
    "title": "Wild Nords",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/wild-nords.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Buy Spins"
    ]
  },
  {
    "id": "wild-o-clock",
    "title": "Wild O'Clock",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/wild-o-clock.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Entertainment",
    "features": [
      "Auto Game"
    ],
    "winningLine": "Pay Anywhere"
  },
  {
    "id": "wild-spartans",
    "title": "Wild Spartans",
    "provider": "Red Tiger",
    "providerLogo": "/images/providers/red-tiger.webp",
    "image": "/images/slots/wild-spartans.webp",
    "category": [
      "max-rpt"
    ],
    "theme": "Myth & History",
    "features": [
      "Free Spins"
    ],
    "winningLine": "1024"
  },
  {
    "id": "jackpot-bingo",
    "title": "Jackpot Bingo",
    "provider": "JILI",
    "providerLogo": "/images/providers/jili.webp",
    "image": "/images/slots/jackpot-bingo.webp",
    "category": [
      "bonus"
    ],
    "jackpot": true,
    "rtpPercent": "97.0%",
    "theme": "Entertainment",
    "features": [
      "Buy Spins",
      "Free Spins"
    ]
  }
]

export const SLOTS: SlotGame[] = [
  ...slotsBatch1,
  ...slotsBatch2,
  ...slotsBatch3,
  ...slotsBatch4,
  ...slotsBatch5,
  ...slotsBatch6,
]

export const buildSlotSections = (slots: SlotGame[] = SLOTS): SlotSection[] => {
  return SLOT_SECTION_CONFIGS.map((cfg) => {
    const seenIds = new Set<string>()
    const matchingGames: SlotGame[] = []

    for (const game of slots) {
      if (seenIds.has(game.id)) continue
      if (isGameInSlotCategory(game, cfg.id)) {
        seenIds.add(game.id)
        matchingGames.push(game)
      }
    }

    const sortedGames = sortRailGames(matchingGames, { category: cfg.id, label: cfg.title })

    return {
      ...cfg,
      count: matchingGames.length,
      games: sortedGames,
      allMatchingGames: sortedGames,
    }
  })
}

export const SLOT_SECTIONS: SlotSection[] = buildSlotSections(SLOTS)

