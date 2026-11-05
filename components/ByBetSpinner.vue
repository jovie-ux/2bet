<script setup lang="ts">
type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number

const props = withDefaults(
  defineProps<{
    size?: SpinnerSize
    speed?: number
    label?: string
    fullscreen?: boolean
    overlay?: boolean
    theme?: 'auto' | 'dark' | 'light'
    customClass?: string
  }>(),
  {
    size: 'md',
    speed: 1.1,
    label: '',
    fullscreen: false,
    overlay: false,
    theme: 'auto',
    customClass: '',
  }
)

const { effectiveTheme } = useSiteTheme()

const isDarkTheme = computed(() => {
  if (props.theme === 'dark') return true
  if (props.theme === 'light') return false
  return effectiveTheme.value !== 'light'
})

const greenColor = computed(() => (isDarkTheme.value ? '#fff' : 'var(--main-color)'))

const dimension = computed(() => {
  if (typeof props.size === 'number') return props.size
  switch (props.size) {
    case 'xs': return 38
    case 'sm': return 54
    case 'md': return 82
    case 'lg': return 112
    case 'xl': return 148
    default: return 82
  }
})

const logoWidth = computed(() => {
  return Math.round(dimension.value * 0.54)
})

const gradientId = useId ? useId() : `bybet-spin-${Math.random().toString(36).slice(2, 8)}`
</script>

<template>
  <div
    class="bybet-spinner-root"
    :class="[
      fullscreen ? 'bybet-spinner-root--fullscreen' : overlay ? 'bybet-spinner-root--overlay' : 'bybet-spinner-root--inline',
      customClass,
    ]"
    role="status"
    :aria-label="label || 'Loading...'"
  >
    <div
      class="bybet-spinner"
      :style="{
        width: `${dimension}px`,
        height: `${dimension}px`,
      }"
    >
      <!-- Rotating Circular Ring -->
      <div
        class="bybet-spinner__ring"
        :style="{ animationDuration: `${speed}s` }"
      >
        <svg
          class="w-full h-full block"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient :id="gradientId" x1="18%" y1="78%" x2="68%" y2="88%">
              <stop offset="0%" :stop-color="greenColor" :style="{ stopColor: greenColor }" stop-opacity="0.06" />
              <stop offset="35%" :stop-color="greenColor" :style="{ stopColor: greenColor }" stop-opacity="0.38" />
              <stop offset="70%" :stop-color="greenColor" :style="{ stopColor: greenColor }" stop-opacity="0.78" />
              <stop offset="100%" :stop-color="greenColor" :style="{ stopColor: greenColor }" stop-opacity="1" />
            </linearGradient>
          </defs>

          <!-- Arc tracing ~285 degrees matching user screenshot -->
          <path
            d="M 19.36 75.71 A 40 40 0 1 1 66.90 86.25"
            fill="none"
            :stroke="`url(#${gradientId})`"
            stroke-width="3.8"
            stroke-linecap="round"
          />

          <!-- Leading Bead at (66.90, 86.25) -->
          <circle
            cx="66.90"
            cy="86.25"
            r="3.2"
            :fill="greenColor"
            :style="{ fill: greenColor }"
          />
        </svg>
      </div>

      <!-- Static ByBet Logo in the center (does NOT rotate) -->
      <div class="bybet-spinner__center">
        <img
          :src="isDarkTheme ? '/brand/2bet-logo.webp' : '/brand/bybet-loader-logo.webp'"
          alt="ByBet"
          class="bybet-spinner__logo select-none pointer-events-none object-contain"
          :style="{
            width: `${logoWidth}px`,
          }"
          loading="eager"
          fetchpriority="high"
          draggable="false"
        />
      </div>
    </div>

    <!-- Optional Label text -->
    <p
      v-if="label"
      class="bybet-spinner__label"
      :class="isDarkTheme ? 'text-[#a2a6a4]' : 'text-white'"
    >
      {{ label }}
    </p>
  </div>
</template>

<style scoped>
.bybet-spinner-root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.bybet-spinner-root--fullscreen {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background-color: var(--page, #000000);
}

:global(html[data-theme='light']) .bybet-spinner-root--fullscreen {
  background-color: var(--page, #eef5f1);
}

.bybet-spinner-root--overlay {
  position: absolute;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
}

.bybet-spinner-root--inline {
  position: relative;
  display: inline-flex;
}

.bybet-spinner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.bybet-spinner__ring {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  animation: bybet-spin 1.1s linear infinite;
  will-change: transform;
}

@keyframes bybet-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.bybet-spinner__center {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  user-select: none;
  z-index: 2;
}

.bybet-spinner__logo {
  display: block;
  height: auto;
  max-width: 70%;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.25));
}

.bybet-spinner__label {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-align: center;
}
</style>

