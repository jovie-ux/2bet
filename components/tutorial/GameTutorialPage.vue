<script setup lang="ts">
import SubpageHeader from '~/components/SubpageHeader.vue'
import { CircleDot, Flag } from 'lucide-vue-next'

type TutorialMode = 'mock-betting' | 'tutorial'
type MarketKey = 'hdp' | 'o-u' | '1x2' | 'corners' | 'odd-even' | 'correct-score' | 'outright'
type BetOutcome = 'WIN' | 'LOSE' | 'WIN_HALF' | 'LOSE_HALF' | 'REFUND'
type CorrectScoreFilter = 'popular' | 'all'

const outcomeStampMap: Record<BetOutcome, { src: string; alt: string }> = {
  WIN: { src: '/tutorial-assets/result-stamp-win.webp', alt: 'WIN' },
  LOSE: { src: '/tutorial-assets/result-stamp-lose.webp', alt: 'LOSE' },
  WIN_HALF: { src: '/tutorial-assets/result-stamp-win-half.webp', alt: 'WIN HALF' },
  LOSE_HALF: { src: '/tutorial-assets/result-stamp-lose-half.webp', alt: 'LOSE HALF' },
  REFUND: { src: '/tutorial-assets/result-stamp-refund.webp', alt: 'Refund' },
}

const props = withDefaults(defineProps<{
  mode?: TutorialMode
}>(), {
  mode: 'mock-betting',
})

interface BetChoice {
  id: string
  label: string
  selection: string
  odds: string
  outcome: BetOutcome
  explanation: string
}

interface TutorialLesson {
  title: string
  summary: string
  rules: Array<{
    title: string
    body: string
  }>
  example: string
}

interface MarketDefinition {
  key: MarketKey
  label: string
  panelTitle: string
  choices: BetChoice[]
  lesson: TutorialLesson
}

type TutorialOutcomeStatus = 'win' | 'lose' | 'refund' | 'win-half' | 'lose-half'
type TutorialOptionTone = 'home' | 'draw' | 'away'

interface TutorialVisualOption {
  label: string
  value?: string
  status: TutorialOutcomeStatus
  tone: TutorialOptionTone
}

interface TutorialScenario {
  score: string
  description: string
  subtitle?: string
  image?: string
  options: TutorialVisualOption[]
}

interface TutorialGroup {
  title: string
  scenarios: TutorialScenario[]
}

interface TutorialDefinition {
  intro?: string
  title?: string
  groups?: TutorialGroup[]
  scenarios?: TutorialScenario[]
}

const choice = (
  id: string,
  label: string,
  selection: string,
  odds: string,
  outcome: BetOutcome,
  explanation: string,
): BetChoice => ({ id, label, selection, odds, outcome, explanation })

const tutorialOption = (
  label: string,
  value: string | undefined,
  status: TutorialOutcomeStatus,
  tone: TutorialOptionTone,
): TutorialVisualOption => ({ label, value, status, tone })

const markets: MarketDefinition[] = [
  {
    key: 'hdp',
    label: 'HDP',
    panelTitle: 'HDP',
    choices: [
      choice('barcelona-0', '0', 'Barcelona 0', '1.98', 'WIN', 'When the handicap is 0, betting on the winning team will result in a win. For example, bets on Barcelona (0) to win when they win.'),
      choice('madrid-0', '0', 'Real Madrid 0', '1.98', 'LOSE', 'When the handicap is 0, betting on the winning team to win, Real Madrid loses, so betting on Real Madrid (0) lose.'),
      choice('barcelona-025', '−0/0.5', 'Barcelona −0/0.5', '1.98', 'WIN', 'After Real Madrid receives the handicap, and if the final score is 2-0 or 2-0.5, Barcelona wins, so bets on Barcelona (-0/0.5) will result in a win.'),
      choice('madrid-025', '+0/0.5', 'Real Madrid +0/0.5', '1.98', 'LOSE', 'After Real Madrid receives the handicap, if the final score is 2-0 or 2-0.5, both are Real Madrid losses, so bets on Real Madrid (+0/0.5) loses.'),
      choice('barcelona-1', '−1', 'Barcelona −1', '1.98', 'WIN', 'After Real Madrid receives the handicap, and if the final score is 2-1, Barcelona wins, so bets on Barcelona (-1) will result in a win.'),
      choice('madrid-1', '+1', 'Real Madrid +1', '1.98', 'LOSE', 'After Real Madrid receives the handicap, if the final score is 2-1, Real Madrid loses, so bets on Real Madrid (+1) lose.'),
      choice('barcelona-175', '−1.5/2', 'Barcelona −1.5/2', '1.98', 'WIN_HALF', 'After Real Madrid receives the handicap, if the final score is 2-1.5 or 2-2; 2-1.5 results in a win for Barcelona, and half the result is also a win for Barcelona, so bets on Barcelona (-1.5/2) will result in a half-win.'),
      choice('madrid-175', '+1.5/2', 'Real Madrid +1.5/2', '1.98', 'LOSE_HALF', 'After Real Madrid receives the handicap, if the final score is 2-1.5 or 2-2; 2-1.5 results in a lose for Real Madrid, and half the result is also a lose for Real Madrid, so bets on Real Madrid (-1.5/2) will result in a half-lose.'),
    ],
    lesson: {
      title: 'Asian Handicap (HDP)',
      summary: 'A handicap gives one team a virtual head start or deficit before the result is settled, removing the draw from most lines.',
      rules: [
        { title: 'Minus handicap', body: 'The favored team must win by more than the handicap for the wager to win.' },
        { title: 'Plus handicap', body: 'The underdog receives a virtual goal advantage before the scores are compared.' },
        { title: 'Quarter lines', body: 'Lines such as 0/0.5 split the stake equally across the two neighboring handicap lines.' },
      ],
      example: 'Barcelona wins 2–0. Barcelona −1 is a win because the adjusted score is 1–0; Barcelona −2 is a push.',
    },
  },
  {
    key: 'o-u',
    label: 'O/U',
    panelTitle: 'O/U',
    choices: [
      choice('over-15', 'Over 1.5', 'Over 1.5', '1.98', 'WIN', 'The number of goals is 2, which is greater than 1.5, so bets on (over 1.5) win.'),
      choice('under-15', 'Under 1.5', 'Under 1.5', '1.98', 'LOSE', 'The number of goals is 2, which is greater than 1.5, so bets on (under 1.5) lose.'),
      choice('over-175', 'Over 1.5/2', 'Over 1.5/2', '1.98', 'WIN_HALF', 'The number of goals is 2, greater than the bet of 1.5 is a win, equal to the bet of 2 is a draw, and half the result is a win, so bets on (over 1.5/2) is a half-win.'),
      choice('under-175', 'Under 1.5/2', 'Under 1.5/2', '1.98', 'LOSE_HALF', 'If the number of goals is 2, greater than the bet of 1.5 is a loss, equal to the bet item of 2 is a draw, and half the result is a loss, so bets on (Under 1.5/2) is a half-lose.'),
      choice('over-2', 'Over 2', 'Over 2', '1.98', 'REFUND', 'The number of goals is 2, equal to the bet of 2 is a draw, so bets on (Over 2) will be refunded.'),
      choice('under-2', 'Under 2', 'Under 2', '1.98', 'REFUND', 'The number of goals is 2, equal to the bet of 2 is a draw, so bets on (Under 2) will be refunded.'),
      choice('over-225', 'Over 2/2.5', 'Over 2/2.5', '1.98', 'LOSE_HALF', 'The number of goals is 2, equal to the bet of 2 is a draw, less than the bet of 2.5 is a loss, and half the result is a win, so bets on (Over1.5/2) is a half-win.'),
      choice('under-225', 'Under 2/2.5', 'Under 2/2.5', '1.98', 'WIN_HALF', 'If the number of goals is 2, equal to the bet of 2 is a draw, and less than the bet of 2.5 is a win. Half the result is a win, so bets on (Under 2/2.5) is a half-win.'),
    ],
    lesson: {
      title: 'Over / Under (O/U)',
      summary: 'Predict whether the combined score of both teams will finish above or below a posted total.',
      rules: [
        { title: 'Over', body: 'Wins when the final combined score is greater than the listed line.' },
        { title: 'Under', body: 'Wins when the final combined score is lower than the listed line.' },
        { title: 'Whole lines', body: 'When the total equals a whole-number line, the wager is a push and the stake is returned.' },
      ],
      example: 'A 2–0 result has two total goals. Over 1.5 wins, Under 2.5 wins, and a wager on exactly Over or Under 2 pushes.',
    },
  },
  {
    key: '1x2',
    label: '1X2',
    panelTitle: '1X2',
    choices: [
      choice('home-win', '1  Barcelona', 'Barcelona (1)', '1.98', 'WIN', 'Barcelona wins by 2 goals, so bets on (Home Win) win.'),
      choice('draw', 'X  Draw', 'Draw (X)', '3.20', 'LOSE', 'Barcelona wins by 2 goals, not a draw, so bets on (Draw) lose'),
      choice('away-win', '2  Real Madrid', 'Real Madrid (2)', '3.80', 'LOSE', 'Real Madrid loses by 2 goals, so bets on (Away Win) lose.'),
    ],
    lesson: {
      title: '1X2 Match Result',
      summary: 'Choose one of three regulation-time outcomes: home win, draw, or away win.',
      rules: [
        { title: '1 — Home', body: 'The home team must lead when regulation time and stoppage time end.' },
        { title: 'X — Draw', body: 'Both teams must have the same score at the end of regulation.' },
        { title: '2 — Away', body: 'The away team must win within regulation time; extra time does not count.' },
      ],
      example: 'Barcelona is listed at home and wins 2–0, so 1 wins while X and 2 lose.',
    },
  },
  {
    key: 'corners',
    label: 'Corners',
    panelTitle: 'Corners',
    choices: [
      choice('corners-barcelona-15', '-1.5', 'Barcelona -1.5', '1.98', 'WIN', 'After receiving handicap points, Real Madrid vs. Barcelona corner handicap result is: 7-6.5, Barcelona wins, so bets on Barcelona (-1.5) win.'),
      choice('corners-real-madrid-15', '+1.5', 'Real Madrid +1.5', '1.98', 'LOSE', 'After receiving handicap points, Real Madrid vs. Barcelona corner handicap result is: 7-6.5, Real Madrid loses, so bets on Real Madrid (+1.5) lose.'),
      choice('corners-barcelona-152', '-1.5/2', 'Barcelona -1.5/2', '1.98', 'WIN_HALF', 'After receiving the handicap, if the final score of corner handicap is 7-6.5 or 7-7; 7-6.5 results in a win for Real Madrid, and half the result is also a win for Real Madrid, so bets on Real Madrid (+1.5/2) will result in a half-loss'),
      choice('corners-real-madrid-152', '+1.5/2', 'Real Madrid +1.5/2', '1.98', 'LOSE', 'After receiving the handicap, if the final score of corner handicap is 7-6.5 or 7-7; 7-6.5 results in a loss for Real Madrid, and half the result is also a loss for Real Madrid, so bets on Real Madrid (+1.5/2) will result in a half-loss.'),
    ],
    lesson: {
      title: 'Corner Betting',
      summary: 'Corner markets are settled using awarded corner kicks rather than goals or the match winner.',
      rules: [
        { title: 'Total corners', body: 'Add the corners taken by both teams and compare the total with the selected line.' },
        { title: 'Corner handicap', body: 'Apply the posted corner advantage or deficit before comparing each team.' },
        { title: 'Settlement', body: 'Only corners awarded during the stated match period are counted.' },
      ],
      example: 'If Barcelona has six corners and Real Madrid has three, the total is nine and Barcelona −1 corners wins.',
    },
  },
  {
    key: 'odd-even',
    label: 'Odd / Even',
    panelTitle: 'Odd / Even',
    choices: [
      choice('odd', 'Odd', 'Odd', '1.98', 'LOSE', 'The number of goals is 2, which is an even number, so bets on (odd) lose.'),
      choice('even', 'Even', 'Even', '1.98', 'WIN', 'The number of goals is 2, which is an even number, so bets on (even) win.'),
    ],
    lesson: {
      title: 'Odd / Even',
      summary: 'Predict whether the combined final score will be an odd or even number.',
      rules: [
        { title: 'Odd totals', body: 'Totals such as 1, 3, 5, and 7 settle as Odd.' },
        { title: 'Even totals', body: 'Totals such as 0, 2, 4, and 6 settle as Even.' },
        { title: 'Zero rule', body: 'A 0–0 match has a total of zero, which is classified as Even.' },
      ],
      example: 'Barcelona 2–0 Real Madrid produces two total goals, so Even wins.',
    },
  },
  {
    key: 'correct-score',
    label: 'Correct Score',
    panelTitle: 'Correct Score',
    choices: [
      choice('score-20', '2–0', '2–0', '1.98', 'WIN', 'The result is exactly the same as the bet item, so bets on (2-0) win.'),
      choice('score-other', 'Others', 'Others', '1.98', 'LOSE', 'Only when the match result is inconsistent with all score options, the bet on "other score" wins; as there is a bet item that matches the result score, the bet (other score) lose.'),
      choice('score-02', '0–2', '0-2', '1.98', 'LOSE', 'Betting score is inconsistent with result score, so bets (0-2) lose.'),
    ],
    lesson: {
      title: 'Correct Score',
      summary: 'Predict the exact score at the end of regulation time for higher potential odds.',
      rules: [
        { title: 'Exact result', body: 'Both teams’ goal totals must match the chosen score exactly.' },
        { title: 'Regulation only', body: 'Extra time and penalty shootouts are excluded unless the market explicitly says otherwise.' },
        { title: 'Any other score', body: 'This covers scorelines not listed as individual selections in the market.' },
      ],
      example: 'A Barcelona 2–0 selection only wins if the match ends exactly 2–0 after regulation time.',
    },
  },
  {
    key: 'outright',
    label: 'Outright',
    panelTitle: 'Outright',
    choices: [
      choice('real-madrid-outright', 'Real Madrid', 'Real Madrid', '13.0', 'WIN', 'Real Madrid wins the championship, so bets on Real Madrid win.'),
      choice('barcelona-outright', 'Barcelona', 'Barcelona', '13.0', 'LOSE', 'Barcelona is the runner-up without winning, so bets on (Barcelona) lose.'),
      choice('atletico-outright', 'Atletico Madrid', 'Atletico Madrid', '13.0', 'LOSE', 'Atletico Madrid is third place without winning, so bets on (Atletico Madrid) lose.'),
      choice('villarreal-outright', 'Villarreal', 'Villarreal', '13.0', 'LOSE', 'Villarreal is not listed as winner, so bets on (Villarreal) lose.'),
    ],
    lesson: {
      title: 'Outright Betting',
      summary: 'Choose the eventual winner of a league, tournament, or season rather than the result of one match.',
      rules: [
        { title: 'Long-term market', body: 'The wager remains open until the named competition is officially decided.' },
        { title: 'All-in principle', body: 'Selections may lose if a team withdraws unless the market rules state that stakes are void.' },
        { title: 'Dead heat', body: 'When winners tie, the stake can be divided by the number of tied winners before odds are applied.' },
      ],
      example: 'Real Madrid is declared Spanish LaLiga champion, so the Real Madrid outright selection wins regardless of individual match results.',
    },
  },
]

const tutorialDefinitions: Record<MarketKey, TutorialDefinition> = {
  hdp: {
    intro: 'In-play – The result of the handicap is based on the goal difference of the bet after the bet is placed. For example, if the score is 1-0 when placing the bet, and the final score is 2-1, then the result of the in-play to handicap is 1-1.',
    groups: [
      {
        title: 'Handicap 0',
        scenarios: [
          {
            score: '1-0',
            description: 'Home and away are well matched in strength. There is no handicap, and bets on the winning team win.',
            image: 'Handicap-0_1-0',
            options: [
              tutorialOption('Home', '0', 'win', 'home'),
              tutorialOption('Away', '0', 'lose', 'away'),
            ],
          },
          {
            score: '1-1',
            description: 'If the result is a draw, the bet amount will be refunded.',
            image: 'Handicap-0_1-1',
            options: [
              tutorialOption('Home', '0', 'refund', 'home'),
              tutorialOption('Away', '0', 'refund', 'away'),
            ],
          },
        ],
      },
      {
        title: 'Handicap 0/0.5',
        scenarios: [
          {
            score: '1-0',
            description: 'The giver of the handicap wins by 1 goal. Bets on the giver of the handicap wins half, bets on the recipient of the handicap loses half',
            image: 'Handicap-0-0.5_1-0',
            options: [
              tutorialOption('Home', '−0/−0.5', 'win', 'home'),
              tutorialOption('Away', '+0/+0.5', 'lose', 'away'),
            ],
          },
          {
            score: '0-0',
            description: 'Draw. The bets on the giver of the handicap loses half, the bets on the recipient of the handicap wins half.',
            image: 'Handicap-0-0.5_0-0',
            options: [
              tutorialOption('Home', '−0/−0.5', 'lose-half', 'home'),
              tutorialOption('Away', '+0/+0.5', 'win-half', 'away'),
            ],
          },
          {
            score: '0-1',
            description: 'The giver of the handicap loses. Bets on the giver of the handicap lose, bets on the recipient of the handicap win',
            image: 'Handicap-0-0.5_0-1',
            options: [
              tutorialOption('Home', '−0/−0.5', 'lose', 'home'),
              tutorialOption('Away', '+0/+0.5', 'win', 'away'),
            ],
          },
        ],
      },
      {
        title: 'Handicap 0.5',
        scenarios: [
          {
            score: '1-0',
            description: 'The giver of the handicap wins by 1 goal. Bets on the giver of the handicap wins half, bets on the recipient of the handicap loses half',
            image: 'Handicap-0.5_1-0',
            options: [
              tutorialOption('Home', '+0.5', 'win', 'home'),
              tutorialOption('Away', '−0.5', 'lose', 'away'),
            ],
          },
          {
            score: '0-0',
            description: 'A draw or the giver of the handicap loses. Bets on the giver of the handicap lose, bets on the recipient of the handicap win',
            image: 'Handicap-0.5_0-0',
            options: [
              tutorialOption('Home', '+0.5', 'lose', 'home'),
              tutorialOption('Away', '−0.5', 'win', 'away'),
            ],
          },
        ],
      },
      {
        title: 'Handicap 0.5/1',
        scenarios: [
          {
            score: '2-0',
            description: 'The giver of the handicap wins by 2 or more goals. Bets on the giver of the handicap lose, bets on the recipient of the handicap win.',
            image: 'Handicap-0.5-1_2-0',
            options: [
              tutorialOption('Home', '+0.5/1', 'win', 'home'),
              tutorialOption('Away', '−0.5/1', 'lose', 'away'),
            ],
          },
          {
            score: '1-0',
            description: 'The giver of the handicap wins by 1 goal. Bets on the giver of the handicap loses half, bets on the recipient of the handicap wins half.',
            image: 'Handicap-0.5-1_1-0',
            options: [
              tutorialOption('Home', '+0.5/1', 'win-half', 'home'),
              tutorialOption('Away', '−0.5/1', 'lose-half', 'away'),
            ],
          },
          {
            score: '0-0',
            description: 'A draw or the giver of the handicap loses. Bets on the giver of the handicap lose, bets on the recipient of the handicap win',
            image: 'Handicap-0.5-1_0-0',
            options: [
              tutorialOption('Home', '+0.5/1', 'lose', 'home'),
              tutorialOption('Away', '−0.5/1', 'win', 'away'),
            ],
          },
        ],
      },
      {
        title: 'Handicap 1',
        scenarios: [
          {
            score: '2-0',
            description: 'The giver of the handicap wins by 2 or more goals. Bets on the giver of the handicap lose, bets on the recipient of the handicap win.',
            image: 'Handicap-1_2-0',
            options: [
              tutorialOption('Home', '+1', 'win', 'home'),
              tutorialOption('Away', '−1', 'lose', 'away'),
            ],
          },
          {
            score: '1-0',
            description: 'The giver of the handicap wins by 1 goal. The bets on home or away will be refunded',
            image: 'Handicap-1_1-0',
            options: [
              tutorialOption('Home', '+1', 'refund', 'home'),
              tutorialOption('Away', '−1', 'refund', 'away'),
            ],
          },
          {
            score: '0-0',
            description: 'A draw or the giver of the handicap loses. Bets on the giver of the handicap lose, bets on the recipient of the handicap win',
            image: 'Handicap-1_0-0',
            options: [
              tutorialOption('Home', '+1', 'lose', 'home'),
              tutorialOption('Away', '−1', 'win', 'away'),
            ],
          },
        ],
      },
      {
        title: 'Handicap 1/1.5',
        scenarios: [
          {
            score: '2-0',
            description: 'The giver of the handicap wins by 2 or more goals. Bets on the giver of the handicap lose, bets on the recipient of the handicap win.',
            image: 'Handicap-1-1.5_2-0',
            options: [
              tutorialOption('Home', '+1/1.5', 'win', 'home'),
              tutorialOption('Away', '−1/1.5', 'lose', 'away'),
            ],
          },
          {
            score: '1-0',
            description: 'The giver of the handicap wins by 1 goal. Bets on the giver of the handicap loses half, bets on the recipient of the handicap wins half.',
            image: 'Handicap-1-1.5_1-0',
            options: [
              tutorialOption('Home', '+1/1.5', 'lose-half', 'home'),
              tutorialOption('Away', '−1/1.5', 'win-half', 'away'),
            ],
          },
          {
            score: '0-0',
            description: 'A draw or the giver of the handicap loses. Bets on the giver of the handicap lose, bets on the recipient of the handicap win',
            image: 'Handicap-1-1.5_0-0',
            options: [
              tutorialOption('Home', '+1/1.5', 'lose', 'home'),
              tutorialOption('Away', '−1/1.5', 'win', 'away'),
            ],
          },
        ],
      },
      {
        title: 'Handicap 1.5',
        scenarios: [
          {
            score: '2-0',
            description: 'The giver of the handicap wins by 2 or more goals. Bets on the giver of the handicap lose, bets on the recipient of the handicap win.',
            image: 'Handicap-1.5_2-0',
            options: [
              tutorialOption('Home', '+1.5', 'win', 'home'),
              tutorialOption('Away', '−1.5', 'lose', 'away'),
            ],
          },
          {
            score: '1-0',
            description: 'The giver of the handicap wins by 1 goal. Bets on the giver of the handicap lose, bets on the recipient of the handicap win.',
            image: 'Handicap-1.5_1-0',
            options: [
              tutorialOption('Home', '+1.5', 'lose', 'home'),
              tutorialOption('Away', '−1.5', 'win', 'away'),
            ],
          },
          {
            score: '0-0',
            description: 'A draw or the giver of the handicap loses. Bets on the giver of the handicap lose, bets on the recipient of the handicap win',
            image: 'Handicap-1.5_0-0',
            options: [
              tutorialOption('Home', '+1.5', 'lose', 'home'),
              tutorialOption('Away', '−1.5', 'win', 'away'),
            ],
          },
        ],
      },
      {
        title: 'Handicap 1.5/2',
        scenarios: [
          {
            score: '3-0',
            description: 'The giver of the handicap wins by 3 or more goals. Bets on the giver of the handicap lose, bets on the recipient of the handicap win.',
            image: 'Handicap-1.5-2_3-0',
            options: [
              tutorialOption('Home', '+1.5/2', 'win', 'home'),
              tutorialOption('Away', '−1.5/2', 'lose', 'away'),
            ],
          },
          {
            score: '2-0',
            description: 'Handicap team wins by 2 goals. Half win on handicap team, half lose on opponent team.',
            image: 'Handicap-1.5-2_2-0',
            options: [
              tutorialOption('Home', '+1.5/2', 'win-half', 'home'),
              tutorialOption('Away', '−1.5/2', 'lose-half', 'away'),
            ],
          },
          {
            score: '1-0',
            description: 'Handicap giver wins 1 goal/draw/handicap giver loses. Bets on the giver of the handicap lose, bets on the recipient of the handicap win',
            image: 'Handicap-1.5-2_1-0',
            options: [
              tutorialOption('Home', '+1.5/2', 'lose', 'home'),
              tutorialOption('Away', '−1.5/2', 'win', 'away'),
            ],
          },
        ],
      },
    ],
  },
  'o-u': {
    title: 'Over/Under',
    scenarios: [
      {
        score: '1-1',
        description: 'If total number of goals is greater than the selected item, all bets on Over win, all bets on Under lose.',
        image: 'Over-Under_1-1',
        options: [
          tutorialOption('Over', 'O 1.5', 'win', 'home'),
          tutorialOption('Under', 'U 1.5', 'lose', 'away'),
        ],
      },
      {
        score: '1-1',
        description: 'If total number of goals exceed half of the selected item, then half-win for Over, half loss for Under.',
        image: 'Over-Under_1-1-2',
        options: [
          tutorialOption('Over', 'O 1.5/2', 'win-half', 'home'),
          tutorialOption('Under', 'U 1.5/2', 'lose-half', 'away'),
        ],
      },
      {
        score: '1-1',
        description: 'If total number of goals are equal to the selected item, the bet will be refunded (draw).',
        image: 'Over-Under_1-1-3',
        options: [
          tutorialOption('Over', 'O 2', 'refund', 'home'),
          tutorialOption('Under', 'U 2', 'refund', 'away'),
        ],
      },
    ],
  },
  '1x2': {
    title: 'Win/Draw/Lose',
    scenarios: [
      {
        score: '1-0',
        description: 'If the selected item completely with the match for guessing the final result (win/draw/loss), it will be a full win, or vice versa.',
        image: 'Win-Draw-Lose_1-0',
        options: [
          tutorialOption('Home', undefined, 'win', 'home'),
          tutorialOption('Draw', undefined, 'lose', 'draw'),
          tutorialOption('Away', undefined, 'lose', 'away'),
        ],
      },
      {
        score: '1-1',
        description: 'If the selected item completely with the match for guessing the final result (win/draw/loss), it will be a full win, or vice versa.',
        image: 'Win-Draw-Lose_1-1',
        options: [
          tutorialOption('Home', undefined, 'lose', 'home'),
          tutorialOption('Draw', undefined, 'win', 'draw'),
          tutorialOption('Away', undefined, 'lose', 'away'),
        ],
      },
      {
        score: '0-1',
        description: 'If the selected item completely with the match for guessing the final result (win/draw/loss), it will be a full win, or vice versa.',
        image: 'Win-Draw-Lose_0-1',
        options: [
          tutorialOption('Home', undefined, 'lose', 'home'),
          tutorialOption('Draw', undefined, 'lose', 'draw'),
          tutorialOption('Away', undefined, 'win', 'away'),
        ],
      },
    ],
  },
  corners: {
    intro: 'Winning is determined by the total number of corners taken by the home and away teams.',
    groups: [
      {
        title: 'Corners Handicap',
        scenarios: [
          {
            score: '7-5',
            subtitle: 'Corner Kick Results',
            description: '',
            image: 'Corners-Handicap_7-5',
            options: [
              tutorialOption('Home', '−1.5', 'win', 'home'),
              tutorialOption('Away', '+1.5', 'lose', 'away'),
            ],
          },
        ],
      },
      {
        title: 'Corners Over/Under',
        scenarios: [
          {
            score: '7-5',
            subtitle: 'Corner Kick Results',
            description: '',
            image: 'Corners-Over-Under_7-5',
            options: [
              tutorialOption('Over', 'O11.5', 'win', 'home'),
              tutorialOption('Under', 'U11.5', 'lose', 'away'),
            ],
          },
        ],
      },
      {
        title: 'Corners 1X2',
        scenarios: [
          {
            score: '7-5',
            subtitle: 'Corner Kick Results',
            description: '',
            image: 'Corners-1X2_7-5',
            options: [
              tutorialOption('Home', undefined, 'win', 'home'),
              tutorialOption('Draw', undefined, 'lose', 'draw'),
              tutorialOption('Away', undefined, 'lose', 'away'),
            ],
          },
        ],
      },
      {
        title: 'Corners Odd/Even',
        scenarios: [
          {
            score: '7-5',
            subtitle: 'Corner Kick Results',
            description: '',
            image: 'Corners-Odd-Even_7-5',
            options: [
              tutorialOption('Odd', 'O', 'lose', 'home'),
              tutorialOption('Even', 'U', 'win', 'away'),
            ],
          },
        ],
      },
    ],
  },
  'odd-even': {
    title: 'Odd/Even',
    scenarios: [
      {
        score: '1-0',
        description: 'If total number of goals are odd, bets on Odd wins, bets on Even loses.',
        image: 'Odd-Even_1-0',
        options: [
          tutorialOption('Odd', 'O', 'win', 'home'),
          tutorialOption('Even', 'U', 'lose', 'away'),
        ],
      },
      {
        score: '0-0',
        description: 'If total number of goals are even, bets on Odd loses, bets on Even wins (0–0 is even).',
        image: 'Odd-Even_0-0',
        options: [
          tutorialOption('Odd', 'O', 'lose', 'home'),
          tutorialOption('Even', 'U', 'win', 'away'),
        ],
      },
    ],
  },
  'correct-score': {
    title: 'Match Result',
    scenarios: [
      {
        score: '1-0',
        description: 'If the selected item completely with the match for guessing the final result, it will be a full win, or vice versa.',
        image: 'Match-Result_1-0',
        options: [
          tutorialOption('1-0', undefined, 'win', 'home'),
          tutorialOption('0-0', undefined, 'lose', 'draw'),
          tutorialOption('0-1', undefined, 'lose', 'away'),
        ],
      },
      {
        score: '1-0',
        description: 'If the selected item completely with the match for guessing the final result, it will be a full win, or vice versa.',
        image: 'Match-Result_1-0-2',
        options: [
          tutorialOption('2-0', undefined, 'lose', 'home'),
          tutorialOption('1-1', undefined, 'lose', 'draw'),
          tutorialOption('0-2', undefined, 'lose', 'away'),
        ],
      },
      {
        score: '1-0',
        description: 'If the selected item completely with the match for guessing the final result, it will be a full win, or vice versa.',
        image: 'Match-Result_1-0-3',
        options: [
          tutorialOption('2-1', undefined, 'lose', 'home'),
          tutorialOption('Others', undefined, 'lose', 'draw'),
          tutorialOption('1-2', undefined, 'lose', 'away'),
        ],
      },
    ],
  },
  outright: {
    title: 'Tournament Winner',
    scenarios: [
      {
        score: 'Real Madrid wins',
        description: 'Spanish La Liga If the bet is on the team that wins the championship, it will be a win, and the rest will be deemed as loss.',
        image: 'Tournament-Winner_Real-Madrid-wins',
        options: [
          tutorialOption('Real Madrid', undefined, 'win', 'home'),
          tutorialOption('Others', undefined, 'lose', 'away'),
        ],
      },
    ],
  },
}

const activeMode = computed(() => props.mode)
const activeMarketKey = ref<MarketKey>('hdp')
const selectedChoiceId = ref<string | null>(null)
const correctScoreFilter = ref<CorrectScoreFilter>('all')

const activeMarket = computed(() => markets.find(market => market.key === activeMarketKey.value) ?? markets[0]!)
const activeTutorial = computed(() => tutorialDefinitions[activeMarketKey.value])
const selectedChoice = computed(() => activeMarket.value.choices.find(item => item.id === selectedChoiceId.value) ?? null)
const isOutright = computed(() => activeMarketKey.value === 'outright')
const isThreeChoiceMarket = computed(() => activeMarketKey.value === '1x2' || activeMarketKey.value === 'correct-score')

const selectMarket = (market: MarketKey): void => {
  activeMarketKey.value = market
  selectedChoiceId.value = null
}

const selectChoice = (id: string): void => {
  selectedChoiceId.value = id
}
</script>

<template>
  <section
    class="game-tutorial-page"
    :class="{ 'game-tutorial-page--lesson': activeMode === 'tutorial' }"
  >
    <SubpageHeader mobile-tabs back-to="/explore/account/me" class="mb-2">
      <template #center>
        <div class="tutorial-pill-group" role="tablist">
          <NuxtLink
            to="/tutorial/mock-betting"
            class="tutorial-pill"
            :class="{ 'tutorial-pill--active': activeMode === 'mock-betting' }"
            role="tab"
            :aria-selected="activeMode === 'mock-betting'"
          >
            Mock Betting
          </NuxtLink>
          <NuxtLink
            to="/tutorial"
            class="tutorial-pill"
            :class="{ 'tutorial-pill--active': activeMode === 'tutorial' }"
            role="tab"
            :aria-selected="activeMode === 'tutorial'"
          >
            Tutorial
          </NuxtLink>
        </div>
      </template>
    </SubpageHeader>

    <div class="tutorial-content-container px-2 sm:px-0">
      <nav class="market-tabs sticky-header-seal" aria-label="Betting markets">
      <button
        v-for="market in markets"
        :key="market.key"
        type="button"
        class="market-tab"
        :class="{ 'market-tab--active': activeMarketKey === market.key }"
        :aria-pressed="activeMarketKey === market.key"
        @click="selectMarket(market.key)"
      >
        {{ market.label }}
      </button>
    </nav>

    <div v-if="activeMode === 'mock-betting'" class="mock-betting-content ">
      <div v-if="!isOutright" class="match-banner ">
        <div class="match-team match-team--home">
          <div class="match-name">
            <strong>Barcelona</strong>
            <span>2</span>
          </div>
          <img src="/tutorial-assets/barcelona-crest.webp" alt="Barcelona crest">
        </div>

        <div class="match-score">
          <strong>2 - 0</strong>
          <div>
            <span><svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 p-[1px]"><title>ht@0.5x</title><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="ht" fill="#999999" class="fill-icon-8"><path d="M10,0 C15.5166667,0 20,4.48333333 20,10 C20,15.5166667 15.5166667,20 10,20 C4.48333333,20 0,15.5166667 0,10 C0,4.48333333 4.48333333,0 10,0 Z M10,1.25 C5.16666667,1.25 1.25,5.16666667 1.25,10 C1.25,14.8333333 5.16666667,18.75 10,18.75 C14.8333333,18.75 18.75,14.8333333 18.75,10 C18.75,5.16666667 14.8333333,1.25 10,1.25 Z M4.90096842,6.21826172 L4.90096842,9.26826172 L8.11763509,9.26826172 L8.11763509,6.21826172 L9.73430176,6.21826172 L9.73430176,13.7849284 L8.11763509,13.7849284 L8.11763509,10.6682617 L4.90096842,10.6682617 L4.90096842,13.7849284 L3.28430176,13.7849284 L3.28430176,6.21826172 L4.90096842,6.21826172 Z M16.7218058,6.21826172 L16.7218058,7.53492839 L14.5551392,7.53492839 L14.5551392,13.7849284 L12.9384725,13.7849284 L12.9384725,7.53492839 L10.7884725,7.53492839 L10.7884725,6.21826172 L16.7218058,6.21826172 Z" id="Combined-Shape"></path></g></g></svg>0–0</span>
            <span><svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 p-[1px]"><title>corner kick@0.5x</title><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="corner-kick" fill="#999999" class="fill-icon-8"><path d="M9.4,0 L17.3166667,4.01666667 L10.9,7.28333333 C10.7166667,7.35 10.5666667,7.58333333 10.5833333,7.83333333 L10.5833333,11.9833333 C10.5833333,12.1166667 10.5666667,12.3 10.7,12.45 C10.8333333,12.6333333 11.0333333,12.6333333 11.1333333,12.65 C12.35,12.8666667 13.4666667,13.4166667 14.3666667,14.25 L14.75,14.55 L15.0166667,14.3666667 L19.0666667,10.9833333 C19.1666667,10.9333333 19.2833333,10.8833333 19.4,10.8833333 C19.7333333,10.8833333 20,11.15 20,11.4833333 C20,11.65 19.9166667,11.8 19.8,11.9166667 L10,20 L0.166666667,11.9666667 L0.183333333,11.95 C0.0666666667,11.8333333 0,11.6833333 0,11.5166667 C0,11.2 0.266666667,10.9166667 0.6,10.9166667 C0.716666667,10.9166667 0.816666667,10.9666667 0.9,11.0166667 L0.966666667,11.0666667 C0.983333333,11.0833333 1.01666667,11.1 1.03333333,11.1166667 L5.25,14.6 L5.5,14.35 C6,13.8833333 6.55,13.5 7.16666667,13.2 C7.76666667,12.9 8.4,12.7 9.06666667,12.6 L9.4,12.55 L9.4,0 Z M10.594991,13.7801107 L10.594991,17.963444 L13.8283244,15.3467773 L13.4616577,15.0301107 C12.7783244,14.4467773 11.944991,14.0467773 11.0616577,13.8801107 L10.594991,13.7801107 Z M9.40248617,13.7874349 L8.91915283,13.8707682 C8.05248617,14.0541016 7.21915283,14.4374349 6.5358195,15.0207682 L6.40248617,15.1374349 L6.40248617,15.5207682 L6.55248617,15.6541016 L9.40248617,17.9541016 L9.40248617,13.7874349 Z M10.5937703,1.96858724 L10.5937703,6.08525391 L14.6437703,4.01858724 L10.5937703,1.96858724 Z" id="路径-16856"></path></g></g></svg>0–0</span>
          </div>
        </div>

        <div class="match-team match-team--away">
          <div class="match-name">
            <span>2</span>
            <strong>Real Madrid</strong>
          </div>
          <img src="/tutorial-assets/real-madrid-crest.webp" alt="Real Madrid crest">
        </div>
      </div>

      <div class="market-panel" :class="{ 'market-panel--outright': isOutright }">
        <div v-if="isOutright" class="outright-heading">
          <h1>Spanish LaLiga</h1>
          <p>Real Madrid wins the championship, Barcelona is the runner-up, and Atletico Madrid is third place</p>
        </div>

        <div class="market-panel-heading">
          <h2 v-if="!isOutright" class="market-panel-title">{{ activeMarket.panelTitle }}</h2>
          <h2 v-else class="market-panel-title">{{ activeMarket.panelTitle }}</h2>

          <div v-if="activeMarketKey === 'correct-score'" class="correct-score-filters" aria-label="Correct score selections">
            <button
              type="button"
              :class="{ 'correct-score-filter--active': correctScoreFilter === 'popular' }"
              :aria-pressed="correctScoreFilter === 'popular'"
              @click="correctScoreFilter = 'popular'"
            >
              Popular
            </button>
            <button
              type="button"
              :class="{ 'correct-score-filter--active': correctScoreFilter === 'all' }"
              :aria-pressed="correctScoreFilter === 'all'"
              @click="correctScoreFilter = 'all'"
            >
              All
            </button>
          </div>
        </div>

        <div class="choice-grid" :class="{ 'choice-grid--three': isThreeChoiceMarket }">
          <button
            v-for="item in activeMarket.choices"
            :key="item.id"
            type="button"
            class="bet-choice"
            :class="{ 'bet-choice--selected': selectedChoiceId === item.id }"
            :aria-pressed="selectedChoiceId === item.id"
            @click="selectChoice(item.id)"
          >
            <span>{{ item.label }}</span>
            <strong>{{ item.odds }}</strong>
          </button>
        </div>
      </div>

      <Transition name="result-card">
        <article v-if="selectedChoice" class="betting-result" aria-live="polite">
          <div class="betting-result-copy">
            <h2>Betting Result</h2>
            <p>{{ selectedChoice.selection }} @{{ selectedChoice.odds }}</p>
          </div>
          <div class="result-stamp" :class="`result-stamp--${selectedChoice.outcome.toLowerCase().replace('_', '-')}`">
            <img
              :src="outcomeStampMap[selectedChoice.outcome].src"
              :alt="outcomeStampMap[selectedChoice.outcome].alt"
              class="result-stamp-img"
              width="44"
              height="44"
            />
          </div>
          <p class="result-explanation">{{ selectedChoice.explanation }}</p>
        </article>
      </Transition>
    </div>

    <div v-else class="tutorial-content">
      <p v-if="activeTutorial.intro" class="tutorial-intro">
        {{ activeTutorial.intro }}
      </p>

      <span v-if="activeTutorial.title" class="tutorial-section-title">
        {{ activeTutorial.title }}
      </span>

      <div v-if="activeTutorial.scenarios" class="tutorial-card-grid">
        <TutorialScenarioCard
          v-for="(scenario, index) in activeTutorial.scenarios"
          :key="`${activeMarketKey}-${index}`"
          :scenario="scenario"
        />
      </div>

      <div v-else class="tutorial-group-grid">
        <section
          v-for="group in activeTutorial.groups"
          :key="group.title"
          class="tutorial-group"
        >
          <h2>{{ group.title }}</h2>
          <div class="tutorial-group-cards">
            <TutorialScenarioCard
              v-for="(scenario, index) in group.scenarios"
              :key="`${group.title}-${index}`"
              :scenario="scenario"
            />
          </div>
        </section>
      </div>
    </div>
    </div>
  </section>
</template>

<style scoped>
@media (max-width: 63.99rem) {
  .game-tutorial-page {
    background: linear-gradient(var(--main-color) 0 74px, transparent 74px);
  }
}

.game-tutorial-page {
  display: flex;
  width: min(100%, 1285px);
  min-height: calc(100vh - var(--header-height));
  flex-direction: column;
  margin: 0 auto;
  color: #f4f4f4;
}

.game-tutorial-page--lesson {
  min-height: calc(100vh - var(--header-height) + 160px);
}

.tutorial-pill-group {
  display: inline-flex;
  align-items: center;
  background-color: #0a402d;
  border-radius: 9999px;
  padding: 2.5px;
  gap: 2px;
}

.tutorial-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 16px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.82);
  transition: all 150ms ease;
  text-decoration: none;
  line-height: 1.2;
}

.tutorial-pill:hover {
  color: #ffffff;
}

.tutorial-pill--active {
  background-color: #ffffff;
  color: var(--main-color);
  font-weight: 700;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

@media (min-width: 64rem) {
  .tutorial-pill-group {
    padding: 0;
    border-radius: 0;
    background: transparent;
    gap: 8px;
  }

  .tutorial-pill {
    min-width: 128px;
    height: 32px;
    padding: 0 22px;
    border-radius: 8px;
    color: #f3f3f3;
    font-size: 14px;
    font-weight: 700;
    line-height: 1;
    background: #6c6d6c;
    box-shadow: none;
  }

  .tutorial-pill:hover {
    color: #ffffff;
    background: #7b7c7b;
  }

  .tutorial-pill--active,
  .tutorial-pill--active:hover {
    color: #ffffff;
    background: var(--main-color);
  }
}

.market-tabs {
  display: flex;
  align-items: center;
  border-radius: 12px;
  background: #1c1d1c;
}

/* market-tabs sticky position */

.game-mode-tab {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 128px;
  height: 32px;
  padding: 0 22px;
  border: 0;
  border-radius: 8px;
  color: #f3f3f3;
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  background: #6c6d6c;
  cursor: pointer;
  transition: background-color 150ms ease;
}

.game-mode-tab:hover {
  background: #7b7c7b;
}

.game-mode-tab--active,
.game-mode-tab--active:hover {
  background: #007653;
}

.market-tabs {
  position: sticky;
  z-index: 59;
  top: calc(var(--content-sticky-top) + 52px);
  min-height: 44px;
  margin-top: 8px;
  padding: 6px 9px;
  overflow-x: auto;
  border-radius: 11px;
  gap: 10px;
  scrollbar-width: none;
}

.market-tabs::-webkit-scrollbar {
  display: none;
}

.market-tab {
  height: 28px;
  flex: 0 0 auto;
  padding: 0 13px;
  border: 0;
  border-radius: 16px;
  color: #ececec;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  background: transparent;
  cursor: pointer;
  transition: color 150ms ease, background-color 150ms ease;
}

.market-tab:hover {
  background: rgba(255, 255, 255, 0.06);
}

.market-tab--active,
.market-tab--active:hover {
  color: white;
  font-weight: 700;
  background: var(--main-color);
}

.mock-betting-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

.match-banner {
  display: grid;
  position: relative;
  min-height: 116px;
  overflow: hidden;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 14px 13px;
  border-radius: 13px;
  background:
    linear-gradient(90deg, rgba(8, 63, 45, 0.72), rgba(21, 67, 53, 0.48) 50%, rgba(8, 63, 45, 0.72)),
    url('/tutorial-assets/mock-betting-background.webp') center / cover no-repeat;
  box-shadow: inset 0 0 30px rgba(0, 35, 25, 0.18);
}

.match-team {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  justify-content: space-between;
}

.match-team--away {
  align-items: flex-end;
}

.match-name {
  display: flex;
  align-items: center;
  color: #f5f5f5;
  font-size: 14px;
  gap: 3px;
}

.match-name strong {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.match-name span {
  display: inline-grid;
  min-width: 9px;
  height: 13px;
  place-items: center;
  border-radius: 1px;
  color: #fff;
  font-size: 9px;
  font-weight: 800;
  background: #FEBA00;
}

.match-team img {
  width: 43px;
  height: 43px;
  object-fit: contain;
}

.match-score {
  display: flex;
  align-self: start;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
}

.match-score > strong {
  font-size: 21px;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.match-score > div {
  display: flex;
  margin-top: 8px;
  color: #d8dedb;
  font-size: 11px;
  gap: 8px;
}

html[data-theme='light']:not(#_) .game-tutorial-page .match-score{
  color: #fff;
}

.match-score span {
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

.market-panel,
.betting-result {
  border-radius: 13px;
  background: #141414;
}

.market-panel {
  padding: 11px 9px 8px;
}

.market-panel--outright {
  padding-top: 9px;
}

.market-panel-title {
  margin: 0;
  color: #969696;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
}

.market-panel--outright .market-panel-title {
  color: #f2f2f2;
  font-size: 16px;
  font-weight: 700;
}

.market-panel-heading {
  display: flex;
  min-height: 25px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 12px;
}

.market-panel--outright .market-panel-heading {
  min-height: 0;
  margin-top: 9px;
}

.correct-score-filters {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 8px;
}

.correct-score-filters button {
  display: inline-flex;
  height: 24px;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  border: 1px solid #858585;
  border-radius: 999px;
  color: #979797;
  font: inherit;
  font-size: 12px;
  line-height: 1;
  background: transparent;
  cursor: pointer;
  transition: border-color 140ms ease, color 140ms ease, background-color 140ms ease;
}

.correct-score-filters button:hover {
  border-color: #b4b4b4;
  color: #e5e5e5;
}

.correct-score-filters .correct-score-filter--active,
.correct-score-filters .correct-score-filter--active:hover {
  border-color: #007653;
  color: #fff;
  background: #007653;
}

.outright-heading h1 {
  margin: 0 0 2px;
  color: #f4f4f4;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
}

.outright-heading p {
  margin: 0;
  color: #eeeeee;
  font-size: 12px;
  line-height: 1.45;
}

.choice-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 7px 8px;
}

.choice-grid--three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.bet-choice {
  display: flex;
  min-width: 0;
  height: 39px;
  align-items: center;
  justify-content: space-between;
  padding: 0 9px;
  border: 1px solid transparent;
  border-radius: 8px;
  color: #939393;
  font-size: 14px;
  text-align: left;
  background: #000;
  cursor: pointer;
  transition: border-color 140ms ease, background-color 140ms ease, color 140ms ease;
  gap: 12px;
}

.bet-choice:hover {
  border-color: rgba(0, 166, 116, 0.45);
  color: #dedede;
}

.bet-choice strong {
  flex: 0 0 auto;
  color: #f1f1f1;
  font-size: 14px;
  font-weight: 700;
}

.bet-choice--selected,
.bet-choice--selected:hover {
  border-color: #007d5b;
  color: #eeeeee;
  background: #0c1d17;
}

.betting-result {
  display: grid;
  position: relative;
  min-height: 111px;
  grid-template-columns: 1fr auto;
  padding: 15px 13px 10px;
}

.betting-result-copy h2 {
  margin: 0 0 1px;
  color: #f4f4f4;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
}

.betting-result-copy p {
  margin: 0;
  color: #f0f0f0;
  font-size: 13px;
  line-height: 1.35;
}

.result-stamp {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  align-self: start;
  flex-shrink: 0;
}

.result-stamp-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  user-select: none;
}

.result-stamp--win {
  color: #7ca800;
}

.result-stamp--lose {
  color: #d74d43;
}

.result-stamp--push {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 3px double currentColor;
  border-radius: 50%;
  font-size: 11px;
  font-style: italic;
  font-weight: 800;
  line-height: 1;
  transform: rotate(12deg);
  color: #d3a33a;
  background: rgba(211, 163, 58, 0.08);
}

.result-explanation {
  grid-column: 1 / -1;
  margin: 9px 0 0;
  padding-top: 10px;
  border-top: 1px solid #4a4a4a;
  color: #eeeeee;
  font-size: 13px;
  line-height: 1.35;
}

.result-card-enter-active,
.result-card-leave-active {
  transition: opacity 150ms ease, transform 150ms ease;
}

.result-card-enter-from,
.result-card-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.tutorial-content {
  margin-top: 8px;
}

.tutorial-intro {
  margin: 0 0 12px;
  padding: 11px 13px;
  border-radius: 11px;
  color: #eeeeee;
  font-size: 12px;
  line-height: 1.45;
  background: #141414;
}

.tutorial-section-title,
.tutorial-group h2 {
  color: #f4f4f4;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.25;
}

.tutorial-section-title {
  margin: 15px 4px 12px;
}

.tutorial-card-grid,
.tutorial-group-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.tutorial-group-grid {
  align-items: start;
  row-gap: 16px;
}

.tutorial-group {
  min-width: 0;
}

.tutorial-group h2 {
  margin: 0 4px 8px;
}

.tutorial-group-cards {
  display: grid;
  gap: 8px;
}

.tutorial-responsible {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
}

.tutorial-responsible-logos {
  display: flex;
  min-height: 104px;
  align-items: flex-end;
  justify-content: center;
  padding: 14px 0 0;
  gap: 25px;
}

.tutorial-responsible-logos img:first-child {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: contain;
}

.tutorial-responsible-logos img:last-child {
  width: 184px;
  height: 47px;
  border-radius: 11px;
  object-fit: cover;
  image-rendering: auto;
}

.tutorial-compliance-copy {
  display: flex;
  width: min(100%, 420px);
  flex-direction: column;
  align-items: center;
  padding: 8px 16px 28px;
  text-align: center;
}

.tutorial-compliance-copy p {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
  gap: 5px 12px;
}

.tutorial-compliance-copy a {
  color: #c61c27;
  font-size: 9px;
  font-weight: 800;
  text-decoration: none;
}

.tutorial-compliance-copy strong {
  max-width: 330px;
  margin-top: 12px;
  color: #1849a4;
  font-size: 10px;
  line-height: 1.45;
}

.tutorial-compliance-copy img {
  width: 129px;
  height: auto;
  margin-top: 13px;
  object-fit: contain;
}

@media (max-width: 64rem) {
  .game-tutorial-page {
    min-height: calc(100vh - var(--header-height) - 8px);
    margin-top: 0;
  }

  .game-tutorial-page--lesson {
    min-height: calc(100vh - var(--header-height) + 152px);
  }

  .market-tabs {
    top: 48px;
  }
}

@media (max-width: 46rem) {
  .market-tabs {
    justify-content: flex-start;
  }

  .match-banner {
    min-height: 124px;
    padding-inline: 10px;
  }

  .match-name {
    max-width: 105px;
    font-size: 12px;
  }

  .match-score > strong {
    font-size: 18px;
  }

  .choice-grid {
    grid-template-columns: 1fr;
  }

  .bet-choice {
    height: 42px;
  }

  .tutorial-card-grid,
  .tutorial-group-grid {
    grid-template-columns: 1fr;
  }

  .tutorial-group-grid {
    gap: 14px;
  }

  .tutorial-intro {
    font-size: 11px;
  }

  .tutorial-responsible-logos {
    min-height: 92px;
    gap: 14px;
  }

  .tutorial-responsible-logos img:first-child {
    width: 65px;
    height: 65px;
  }

  .tutorial-responsible-logos img:last-child {
    width: 150px;
    height: 39px;
  }
}

@media (max-width: 25rem) {
  .game-back {
    margin-right: 0;
  }

  .game-mode-tab {
    font-size: 12px;
  }

  .match-team img {
    width: 36px;
    height: 36px;
  }
}
</style>
