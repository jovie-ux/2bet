<script setup lang="ts">
import { ChevronDown, ChevronRight, Download } from 'lucide-vue-next'
import { faqItems } from '~/data/homepage'

const { translate } = useSiteLocale()

const openFaqIndex = ref<number | null>(null)
const { bybetRedirectUrl: rawRedirectUrl, bybetRedirectCode } = useRuntimeConfig().public
const externalSiteUrl = `${(rawRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${bybetRedirectCode || 'xjSD'}`

const toggleFaq = (index: number): void => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}
</script>

<template>
  <section class="app-promotion" aria-label="Bybet app">
    <div class="app-promotion-card">
      <div class="app-promotion-media" aria-hidden="true">
        <img
          class="app-promotion-art"
          src="/reference/app-download.webp"
          alt=""
          width="1640"
          height="395"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
        >
      </div>
      <div class="app-promotion-qr-copy">
        <strong>{{ translate('Scan to Download') }}</strong>
        <span>{{ translate('Available for iOS & Android') }}</span>
      </div>
      <div class="app-promotion-content">
        <div class="app-promotion-copy">
          <span class="app-promotion-eyebrow">{{ translate('BYBET APP') }}</span>
          <h2 class="app-promotion-heading">
            {{ translate('Download ByBet App for Slots, Live Casino and Sports Betting') }}
          </h2>
          <p class="app-promotion-description">
            {{ translate('Your favorite slots, live casino games, and sports bets all in one place. Take ByBet with you wherever you go.') }}
          </p>
          <NuxtLink class="app-promotion-cta" to="/download-app">  
            <Download class="app-promotion-cta-icon" :size="14" aria-hidden="true" />
            <span class="app-promotion-cta-label">{{ translate('Download App') }}</span>
            <ChevronRight class="app-promotion-cta-chevron" :size="16" stroke-width="3" aria-hidden="true" />
          </NuxtLink>            
        </div>
      </div>
    </div>
  </section>

  <section class="information-grid">
    <article class="about-panel">
      <div class="about-panel-copy">
        <h2>{{ translate('Discover ByBet Slots') }}</h2>
        <p>{{ translate('At ByBet, we bring you an exceptional slots experience with thousands of games from the world’s top providers. From classic fruit machines to the latest video slots with blockbuster features, there’s always something new to explore.') }}</p>
        <p>{{ translate('Enjoy exciting jackpots, innovative gameplay and generous rewards — all in one place. Whether you’re a casual player or a high roller, ByBet is your home for bigger wins.') }}</p>
        <a class="about-panel-cta" :href="externalSiteUrl" rel="noopener noreferrer">
          {{ translate('Play Now') }}
          <ChevronRight :size="12" aria-hidden="true" />
        </a>
        <!-- <NuxtLink class="about-panel-cta" to="/explore/egames/slots">
          {{ translate('Play Now') }}
          <ChevronRight :size="12" aria-hidden="true" />
        </NuxtLink> -->
      </div>
      <img
        class="about-panel-art"
        src="/reference/about-slots.webp"
        alt=""
        width="1024"
        height="345"
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      >
    </article>

    <section class="faq-panel" aria-labelledby="faq-title">
      <h2 id="faq-title">{{ translate('Frequently Asked Questions') }}</h2>
      <div class="faq-list">
        <article v-for="(faqItem, index) in faqItems" :key="faqItem.question">
          <button type="button" :aria-expanded="openFaqIndex === index" @click="toggleFaq(index)">
            <h3>{{ translate(faqItem.question) }}</h3>
            <ChevronDown :size="12" :class="{ open: openFaqIndex === index }" />
          </button>
          <p v-if="openFaqIndex === index">{{ translate(faqItem.answer) }}</p>
        </article>
      </div>
    </section>
  </section>
</template>

<style scoped>
.app-promotion {
  margin-top: 0.85rem;
}

.app-promotion-card {
  position: relative;
  width: 100%;
  overflow: hidden;
  border: 1px solid rgba(50, 212, 154, 0.22);
  border-radius: 0.42rem;
  background: #03150f;
  box-shadow:
    inset 0 1px rgba(255, 255, 255, 0.04),
    0 0.2rem 0.65rem rgba(0, 0, 0, 0.28);
  container-type: inline-size;
  container-name: app-promotion;
}

.app-promotion-media {
  width: 100%;
  line-height: 0;
}

.app-promotion-art {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
}

.app-promotion-qr-copy {
  display: grid;
  position: absolute;
  z-index: 2;
  top: 60%;
  left: 94%;
  width: 12%;
  color: #ffffff;
  text-align: center;
  text-shadow: 0 1px 0.3rem rgba(0, 0, 0, 0.85);
  transform: translateX(-50%);
  gap: 0.08rem;
}

.app-promotion-qr-copy strong {
  font-size: clamp(0.36rem, 0.82cqi, 0.66rem);
  font-weight: 800;
  line-height: 1.15;
  white-space: nowrap;
}

.app-promotion-qr-copy span {
  color: #d8e8e0;
  font-size: clamp(0.25rem, 0.48cqi, 0.42rem);
  font-weight: 500;
  line-height: 1.2;
  white-space: nowrap;
}

.app-promotion-content {
  display: flex;
  position: absolute;
  inset: 0;
  align-items: center;
  padding: clamp(0.32rem, 2.2cqi, 0.72rem) clamp(0.55rem, 4cqi, 1.15rem);
  pointer-events: none;
}

.app-promotion-copy {
  display: flex;
  z-index: 1;
  width: 50%;
  max-width: 29rem;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  text-shadow: 0 1px 0.45rem rgba(0, 0, 0, 0.45);
}

.app-promotion-eyebrow {
  color: #3ce8a8;
  font-size: clamp(0.5rem, 1.35cqi, 0.72rem);
  font-weight: 800;
  letter-spacing: 0.12em;
  line-height: 1.15;
  text-transform: uppercase;
}

.app-promotion-heading {
  margin: clamp(0.12rem, 0.65cqi, 0.28rem) 0 0;
  color: #ffffff;
  font-size: clamp(0.9rem, 3.5cqi, 1.55rem);
  font-weight: 850;
  letter-spacing: -0.025em;
  line-height: 1.18;
}

.app-promotion-description {
  margin: clamp(0.18rem, 0.85cqi, 0.38rem) 0 0;
  color: #e2ebe6;
  font-size: clamp(0.44rem, 1.55cqi, 0.64rem);
  font-weight: 500;
  line-height: 1.5;
}

.app-promotion-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: clamp(1.45rem, 4.6cqi, 2rem);
  margin-top: clamp(0.28rem, 1.1cqi, 0.55rem);
  padding: 0.22rem clamp(0.9rem, 3cqi, 1.45rem);
  border: 1px solid rgba(91, 230, 179, 0.52);
  border-radius: 0.38rem;
  color: #ffffff;
  font-size: clamp(0.5rem, 1.75cqi, 0.74rem);
  font-weight: 800;
  line-height: 1;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  backdrop-filter: blur(12px) saturate(1.2);
  -webkit-backdrop-filter: blur(12px) saturate(1.2);
  background: linear-gradient(145deg, rgba(10, 151, 103, 0.82), rgba(3, 98, 66, 0.68));
  box-shadow:
    inset 0 1px rgba(255, 255, 255, 0.18),
    inset 0 -1px rgba(0, 52, 35, 0.3),
    0 0.22rem 0.55rem rgba(0, 52, 35, 0.3);
  gap: clamp(0.28rem, 1cqi, 0.5rem);
  pointer-events: auto;
  text-shadow: 0 1px 0 rgba(0, 34, 23, 0.45);
  animation: app-promotion-cta-heartbeat 1.9s ease-in-out infinite;
  transition: filter 160ms ease, border-color 160ms ease;
  will-change: transform, box-shadow;
}

.app-promotion-cta-icon,
.app-promotion-cta-chevron {
  flex: 0 0 auto;
  filter: drop-shadow(0 1px 0 rgba(0, 48, 32, 0.45));
}

.app-promotion-cta-label {
  white-space: nowrap;
}

.app-promotion-cta:hover {
  border-color: rgba(130, 242, 200, 0.78);
  background: linear-gradient(145deg, rgba(13, 174, 119, 0.88), rgba(4, 123, 83, 0.74));
  filter: brightness(1.04);
}

@keyframes app-promotion-cta-heartbeat {
  0%,
  100% {
    transform: scale(1);
    border-color: rgba(91, 230, 179, 0.52);
    box-shadow:
      inset 0 1px rgba(255, 255, 255, 0.18),
      inset 0 -1px rgba(0, 52, 35, 0.3),
      0 0.22rem 0.55rem rgba(0, 52, 35, 0.3),
      0 0 0.35rem rgba(50, 212, 154, 0.18);
  }

  12% {
    transform: scale(1.05);
    border-color: rgba(130, 242, 200, 0.88);
    box-shadow:
      inset 0 1px rgba(255, 255, 255, 0.24),
      inset 0 -1px rgba(0, 52, 35, 0.3),
      0 0.28rem 0.65rem rgba(0, 52, 35, 0.34),
      0 0 0.65rem rgba(80, 230, 175, 0.42);
  }

  24% {
    transform: scale(1);
    border-color: rgba(91, 230, 179, 0.55);
    box-shadow:
      inset 0 1px rgba(255, 255, 255, 0.18),
      inset 0 -1px rgba(0, 52, 35, 0.3),
      0 0.22rem 0.55rem rgba(0, 52, 35, 0.3),
      0 0 0.4rem rgba(50, 212, 154, 0.22);
  }

  36% {
    transform: scale(1.035);
    border-color: rgba(110, 235, 190, 0.72);
    box-shadow:
      inset 0 1px rgba(255, 255, 255, 0.21),
      inset 0 -1px rgba(0, 52, 35, 0.3),
      0 0.25rem 0.6rem rgba(0, 52, 35, 0.32),
      0 0 0.55rem rgba(64, 220, 165, 0.34);
  }

  48% {
    transform: scale(1);
    border-color: rgba(91, 230, 179, 0.52);
    box-shadow:
      inset 0 1px rgba(255, 255, 255, 0.18),
      inset 0 -1px rgba(0, 52, 35, 0.3),
      0 0.22rem 0.55rem rgba(0, 52, 35, 0.3),
      0 0 0.35rem rgba(50, 212, 154, 0.18);
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-promotion-cta {
    animation: none;
    will-change: auto;
  }
}

.information-grid {
  display: grid;
  margin-top: 0.73rem;
  grid-template-columns: 1.08fr 1fr;
  gap: 0.38rem;
}

.about-panel,
.faq-panel {
  height: 20rem;
  overflow: hidden;
  border: 1px solid rgba(50, 212, 154, 0.18);
  border-radius: 0.35rem;
  background: #07130f;
  box-shadow:
    inset 0 1px rgba(255, 255, 255, 0.04),
    0 0.18rem 0.5rem rgba(0, 0, 0, 0.22);
}

.about-panel {
  display: flex;
  position: relative;
  align-items: center;
  padding: 0 0.55rem 0 0.62rem;
  background:
    linear-gradient(105deg, #051811 0%, #06241a 42%, rgba(6, 36, 26, 0.72) 68%, rgba(4, 22, 16, 0.35) 100%);
}

.about-panel-copy {
  position: relative;
  z-index: 2;
  max-width: 50%;
}

.about-panel h2,
.faq-panel h2 {
  margin: 0 0 0.48rem;
  color: #ffffff;
  font-size: clamp(0.76rem, 0.18rem + 2.35vw, 1.02rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.about-panel p {
  margin: 0 0 0.38rem;
  color: #c5d4cc;
  font-size: var(--font-body);
  line-height: 1.62;
}

.about-panel p:last-of-type {
  margin-bottom: 0;
}

.about-panel-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: clamp(1.22rem, 2.4cqi, 1.48rem);
  margin-top: 0.38rem;
  padding: 0.14rem clamp(0.68rem, 1.55cqi, 0.88rem);
  border: 1px solid rgba(91, 230, 179, 0.52);
  border-radius: 0.38rem;
  color: #ffffff;
  font-size: clamp(0.44rem, 0.08rem + 1.1vw, 0.58rem);
  font-weight: 800;
  line-height: 1;
  text-decoration: none;
  backdrop-filter: blur(12px) saturate(1.2);
  -webkit-backdrop-filter: blur(12px) saturate(1.2);
  background: linear-gradient(145deg, rgba(10, 151, 103, 0.82), rgba(3, 98, 66, 0.68));
  box-shadow:
    inset 0 1px rgba(255, 255, 255, 0.18),
    inset 0 -1px rgba(0, 52, 35, 0.3),
    0 0.22rem 0.55rem rgba(0, 52, 35, 0.3);
  gap: 0.22rem;
  transition: filter 160ms ease, border-color 160ms ease, transform 160ms ease;
}

.about-panel-cta:hover {
  border-color: rgba(130, 242, 200, 0.78);
  background: linear-gradient(145deg, rgba(13, 174, 119, 0.88), rgba(4, 123, 83, 0.74));
  filter: brightness(1.04);
  transform: translateY(-1px);
}

.about-panel-art {
  position: absolute;
  top: 0;
  right: 0;
  width: 56%;
  height: 100%;
  object-fit: cover;
  object-position: right center;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.35) 16%, #000 38%);
  mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.35) 16%, #000 38%);
}

.faq-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.55rem 0.58rem;
  background: linear-gradient(165deg, #081912, #06140f);
}

.faq-list {
  display: grid;
  gap: 0.22rem;
}

.faq-list article {
  overflow: hidden;
  border: 1px solid rgba(50, 212, 154, 0.12);
  border-radius: 0.28rem;
  background: linear-gradient(180deg, rgba(14, 30, 25, 0.94), rgba(9, 22, 18, 0.9));
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.04);
}

.faq-list button {
  display: flex;
  width: 100%;
  min-height: 1.32rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.58rem;
  border: 0;
  color: #e4ece8;
  font-size: clamp(0.42rem, 0.06rem + 1.22vw, 0.56rem);
  font-weight: 600;
  line-height: 1.35;
  text-align: left;
  background: transparent;
  gap: 0.4rem;
}

.faq-list svg {
  flex: 0 0 auto;
  transition: transform 140ms ease;
}

.faq-list svg.open {
  transform: rotate(180deg);
}

.faq-list p {
  margin: 0;
  padding: 0.1rem 0.58rem 0.36rem;
  color: #8ea097;
  font-size: clamp(0.4rem, 0.04rem + 1.1vw, 0.52rem);
  line-height: 1.45;
}

@media (max-width: 63.99rem) {
  .app-promotion {
    margin-top: 0.65rem;
  }

  .app-promotion-card {
    border-radius: 0.5rem;
  }

  .app-promotion-media {
    min-height: 9.8rem;
    aspect-ratio: 2.15 / 1;
    background: #03150f;
  }

  .app-promotion-art {
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .app-promotion-content {
    padding: 0.65rem 0.75rem;
  }

  .app-promotion-qr-copy {
    top: 74%;
    left: 91%;
    width: 22%;
  }

  .app-promotion-qr-copy strong {
    font-size: clamp(0.5rem, 2cqi, 0.64rem);
  }

  .app-promotion-qr-copy span {
    font-size: clamp(0.42rem, 1.6cqi, 0.52rem);
  }

  .app-promotion-copy {
    width: 58%;
    max-width: 58%;
  }

  .app-promotion-eyebrow {
    font-size: 0.62rem;
  }

  .app-promotion-heading {
    margin-top: 0.18rem;
    font-size: clamp(0.82rem, 3.6cqi, 1.05rem);
    line-height: 1.18;
  }

  .app-promotion-description {
    margin-top: 0.24rem;
    font-size: clamp(0.62rem, 2.4cqi, 0.75rem);
    line-height: 1.35;
  }

  .app-promotion-cta {
    min-height: 1.85rem;
    margin-top: 0.42rem;
    padding: 0.25rem 0.8rem;
    border-radius: 0.42rem;
    font-size: clamp(0.65rem, 2.5cqi, 0.78rem);
    gap: 0.32rem;
  }

  .information-grid {
    margin-top: 0.65rem;
    grid-template-columns: 1fr;
    gap: 0.65rem;
  }

  .about-panel {
    height: auto;
    min-height: auto;
    padding: 1rem 0.85rem;
    border-radius: 0.5rem;
  }

  .faq-panel {
    height: auto;
    min-height: auto;
    padding: 1rem 0.85rem;
    border-radius: 0.5rem;
  }

  .about-panel h2,
  .faq-panel h2 {
    margin-bottom: 0.6rem;
    font-size: 1.02rem;
  }

  .about-panel p {
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    line-height: 1.55;
  }

  .about-panel-cta {
    min-height: 1.95rem;
    margin-top: 0.55rem;
    padding: 0.28rem 0.9rem;
    border-radius: 0.42rem;
    font-size: 0.78rem;
  }

  .about-panel-copy {
    max-width: none;
  }

  .about-panel-art {
    width: 100%;
    opacity: 0.22;
    -webkit-mask-image: linear-gradient(180deg, transparent, #000 35%);
    mask-image: linear-gradient(180deg, transparent, #000 35%);
  }

  .faq-list {
    gap: 0.38rem;
  }

  .faq-list article {
    border-radius: 0.42rem;
  }

  .faq-list button {
    min-height: 2.5rem;
    padding: 0.65rem 0.75rem;
    font-size: 0.82rem;
  }

  .faq-list button h3 {
    margin: 0;
    font-size: inherit;
    font-weight: 600;
  }

  .faq-list svg {
    width: 1rem;
    height: 1rem;
  }

  .faq-list p {
    padding: 0 0.75rem 0.65rem;
    font-size: 0.76rem;
    line-height: 1.5;
  }
}
</style>
