<script setup lang="ts">
import { ChevronLeft } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    title?: string
    backTo?: string
    showBack?: boolean
    sticky?: boolean
    customClass?: string
    mobileTabs?: boolean
  }>(),
  {
    title: '',
    backTo: '/account/me',
    showBack: true,
    sticky: true,
    customClass: '',
    mobileTabs: false,
  }
)

const emit = defineEmits<{
  (e: 'back'): void
}>()

const router = useRouter()
const { translate } = useSiteLocale()

const handleBack = (): void => {
  emit('back')
  if (import.meta.client && window.history.length > 1) {
    router.back()
  } else if (props.backTo) {
    router.push(props.backTo)
  }
}
</script>

<template>
  <header
    class="subpage-header"
    :class="[
      sticky ? 'subpage-header--sticky sticky-header-seal' : 'relative',
      customClass,
      { 'subpage-header--mobile-tabs': mobileTabs },
    ]"
    role="banner"
  >
    <!-- Left: Back button or custom left content -->
    <div class="subpage-header__left">
      <slot name="left">
        <button
          v-if="showBack"
          type="button"
          class="subpage-header__back-btn"
          :aria-label="translate('Go back')"
          :title="translate('Go back')"
          @click="handleBack"
        >
          <ChevronLeft :size="18" :stroke-width="2.6" />
        </button>
        <div v-else class="subpage-header__spacer" aria-hidden="true" />
      </slot>
    </div>

    <!-- Center: Title or custom content (e.g. segmented tabs) -->
    <div class="subpage-header__center">
      <slot name="center">
        <h1 v-if="title" class="subpage-header__title">
          {{ translate(title) }}
        </h1>
      </slot>
    </div>

    <!-- Right: Action buttons or spacer for centered title alignment -->
    <div class="subpage-header__right">
      <slot name="right">
        <slot name="actions">
          <div class="subpage-header__spacer" aria-hidden="true" />
        </slot>
      </slot>
    </div>
  </header>
</template>

<style scoped>
@media (max-width: 63.99rem) {
  .subpage-header.subpage-header--mobile-tabs {
    height: 48px;
    min-height: 48px;
    margin-bottom: 0;
    padding: 0 12px;
    gap: 12px;
    box-shadow: none;
  }
  .subpage-header--mobile-tabs .subpage-header__left { min-width: 30px; }
  .subpage-header--mobile-tabs .subpage-header__back-btn { width: 30px; height: 30px; border-color: #ffffff60; }
  .subpage-header--mobile-tabs .subpage-header__center { padding: 0; }
  .subpage-header--mobile-tabs .subpage-header__right { display: none; }
  .subpage-header--mobile-tabs :deep([role="tablist"]) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
    padding: 0;
    border-radius: 0;
    background: transparent;
    gap: 8px;
  }
  .subpage-header--mobile-tabs :deep([role="tab"]) {
    min-width: 0;
    height: 30px;
    padding: 0 8px;
    border: 1px solid #ffffff60;
    border-radius: 8px;
    color: #fff;
    background: #ffffff59;
    font-size: 14px;
    font-weight: 700;
    box-shadow: none;
  }
  .subpage-header--mobile-tabs :deep([role="tab"][aria-selected="true"]) {
    color: var(--main-color);
    background: #fedf00;
    border-color: #fff;
  }
}

.subpage-header {
  position: relative;
  display: flex;
  min-height: 48px;
  height: 48px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  background-color: var(--main-color);
  color: #ffffff;
  user-select: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
}

.subpage-header--sticky {
  position: sticky;
  top: 0;
  z-index: 40;
}

.subpage-header__left,
.subpage-header__right {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  min-width: 32px;
}

.subpage-header__left {
  justify-content: flex-start;
}

.subpage-header__right {
  justify-content: flex-end;
}

.subpage-header__center {
  display: flex;
  flex: 1 1 0%;
  min-width: 0;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  text-align: center;
}

.subpage-header__title {
  margin: 0;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 240px;
}

@media (min-width: 480px) {
  .subpage-header__title {
    max-width: 360px;
    font-size: 17px;
  }
}

.subpage-header__back-btn {
  display: flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  cursor: pointer;
  transition: background-color 150ms ease, transform 150ms ease;
}

.subpage-header__back-btn:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

.subpage-header__back-btn:active {
  transform: scale(0.95);
}

.subpage-header__spacer {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

@media (min-width: 64rem) {
  .subpage-header {
    min-height: 44px;
    height: 44px;
    justify-content: flex-start;
    padding: 0 12px;
    border: 1px solid rgba(255, 255, 255, 0.035);
    border-radius: 11px;
    margin-bottom: 8px;
    background: linear-gradient(180deg, #202221 0%, #1b1c1b 100%);
    box-shadow: none;
    gap: 8px;
  }

  .subpage-header__left,
  .subpage-header__right {
    min-width: 32px;
  }

  .subpage-header__center {
    flex: 1 1 auto;
    justify-content: flex-start;
    padding: 0;
    text-align: left;
  }

  .subpage-header__title {
    max-width: none;
    font-size: 16px;
    line-height: 1.2;
  }

  .subpage-header__back-btn {
    border: 0;
    color: #16a27b;
    background: #111514;
  }

  .subpage-header__back-btn:hover {
    background: #151b19;
  }

  .subpage-header--sticky {
    top: var(--content-sticky-top);
    z-index: 60;
  }
}
</style>

