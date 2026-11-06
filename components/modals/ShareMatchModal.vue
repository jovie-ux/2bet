<script setup lang="ts">
import { computed } from 'vue'
import { Share2 } from 'lucide-vue-next'
import type { SportsEvent } from '~/types/sports'

const props = defineProps<{
  match: SportsEvent
}>()

const emit = defineEmits<{
  close: []
  save: []
}>()

const formattedDate = computed(() => {
  return new Intl.DateTimeFormat('en-PH', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Manila',
  }).format(new Date(props.match.commence_time)).replace(',', '')
})

const getSportIcon = (sportKey: string) => {
  if (sportKey.includes('basketball')) return '🏀'
  if (sportKey.includes('soccer')) return '⚽'
  if (sportKey.includes('baseball')) return '⚾'
  return '🏆'
}

const handleImgError = (event: Event): void => {
  const target = event.target as HTMLImageElement | null
  if (target) {
    target.style.display = 'none'
  }
}
</script>

<template>
  <div class="share-modal-overlay" @click.self="emit('close')">
    <div class="share-modal-container mobile-modal-slide-up">
      <div class="share-card">
        <!-- Top Decorative Section -->
        <div class="card-header-deco">
          <div class="brand-header">
            <div class="brand-logo">2Bet</div>
            <span class="brand-name">2Bet</span>
          </div>
          <div class="deco-people">
            <img :src="'/images/share-people.webp'" alt="People" @error="handleImgError" />
          </div>
        </div>

        <!-- Content Section -->
        <div class="card-content">
          <div class="match-info">
            <span class="sport-icon">{{ getSportIcon(match.sport_key) }}</span>
            <span class="tournament-name">{{ match.sport_title }}</span>
            <span class="match-date">{{ formattedDate }}</span>
          </div>

          <div class="teams-section">
            <div class="team-row">
              <img v-if="match.home_team" :src="`/images/teams/${match.home_team.toLowerCase().replace(/ /g, '-')}.webp`" class="team-logo" alt="" @error="handleImgError" />
              <span class="team-name">{{ match.home_team }}</span>
            </div>
            <div class="team-row">
              <img v-if="match.away_team" :src="`/images/teams/${match.away_team.toLowerCase().replace(/ /g, '-')}.webp`" class="team-logo" alt="" @error="handleImgError" />
              <span class="team-name">{{ match.away_team }}</span>
            </div>
          </div>

          <div class="qr-section">
            <div class="qr-code">
              <!-- Placeholder for QR Code -->
              <img :src="'/images/qr-placeholder.webp'" alt="QR Code" @error="handleImgError" />
            </div>
            <span class="qr-label">Enter APP</span>
          </div>
        </div>
      </div>

      <!-- Bottom Actions -->
      <div class="modal-footer">
        <button class="footer-share-btn" @click="emit('close')">
          <Share2 :size="20" />
        </button>
        <button class="save-btn" @click="emit('save')">
          Save QR Code
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.share-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.share-modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

.share-card {
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.card-header-deco {
  background: linear-gradient(135deg, #00b36a 0%, #007a4a 100%);
  padding: 24px;
  position: relative;
  min-height: 120px;
  display: flex;
  align-items: flex-start;
  color: white;
}

.brand-header {
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 2;
}

.brand-logo {
  background: #000;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
}

.brand-name {
  font-weight: 600;
  font-size: 16px;
}

.deco-people {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  pointer-events: none;
}

.deco-people img {
  height: 120px;
  display: block;
}

.card-content {
  padding: 24px;
  color: #333;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.match-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
}

.match-info .match-date {
  margin-left: auto;
  color: #666;
}

.teams-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.team-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 600;
}

.team-logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.qr-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.qr-code {
  width: 160px;
  height: 160px;
  background: #eee;
  border-radius: 8px;
}

.qr-code img {
  width: 100%;
  height: 100%;
}

.qr-label {
  font-size: 12px;
  color: #666;
}

.modal-footer {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.footer-share-btn {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.save-btn {
  flex: 1;
  background: #006d44;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.save-btn:hover {
  background: #005a38;
}
</style>
