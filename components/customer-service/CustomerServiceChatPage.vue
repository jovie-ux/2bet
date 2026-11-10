<script setup lang="ts">
const props = defineProps<{
  serviceNumber: 1 | 2
}>()

const { closeComments } = useCommentPanel()
const { translate, locale } = useSiteLocale()
const langParam = computed(() => (locale.value === 'pt' ? 'pt' : (locale.value || 'en')))
const chatUrl = computed(() => `https://cs11.levxfemf.app/#/index?source=2bet&needNav=1&lang=${langParam.value}&vipType=0&isPC=1&darkMode=1&deviceCode=4ff68888-f34d-49fb-ab39-e0ff581e41b8&deviceId=4ff68888-f34d-49fb-ab39-e0ff581e41b8`)

useAppSeo({
  title: computed(() => locale.value === 'pt' ? formatSeoTitle(`Atendimento 24/7 — Suporte Oficial Canal ${props.serviceNumber} | 2bet`) : `24/7 Services ${props.serviceNumber} | 2Bet Brasil`),
  description: computed(() => locale.value === 'pt' ? formatSeoDescription(`Converse com nossa equipe no chat ao vivo da 2bet Brasil (Canal ${props.serviceNumber}). Suporte 24 horas para dúvidas sobre saldo e bônus.`) : `Chat with 2Bet 24/7 Customer Service ${props.serviceNumber} for account, deposit, withdrawal, promotion, and verification assistance.`),
  breadcrumbs: computed(() => [
    { name: translate('Home'), path: '/' },
    { name: translate('Customer Service'), path: '/egames/customer-service' },
    { name: `${translate('24/7 Services')} ${props.serviceNumber}`, path: `/egames/customer-service/${props.serviceNumber}` },
  ]),
  schema: {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `2bet Atendimento 24/7 Canal ${props.serviceNumber}`,
    url: `https://2bet.com/egames/customer-service/${props.serviceNumber}`,
  },
})

onMounted(() => {
  closeComments()
})
</script>

<template>
  <div class="customer-service-chat-page text-white">
    <SeoHeader
      sticky
      title="24/7 Services"
      :meta-title="`Atendimento 24/7 — Canal ${serviceNumber} de Suporte Online | 2bet`"
      :description="`Converse ao vivo com o suporte 24/7 da 2bet Brasil (Canal ${serviceNumber}) para ajuda rápida com conta, depósitos, saques e bônus.`"
      back-to="/egames/customer-service"
    />

    <section class="customer-service-chat-stage" :aria-label="`24/7 Services ${serviceNumber} chat`">
      <iframe
        title="customerService"
        allow="microphone"
        sandbox="allow-scripts allow-forms allow-pointer-lock allow-popups allow-same-origin allow-top-navigation"
        :src="chatUrl"
        class="customer-service-chat-frame"
      />
    </section>
  </div>
</template>

<style scoped>
.customer-service-chat-page {
  display: flex;
  width: 100%;
  min-width: 0;
  min-height: calc(100vh - var(--header-height) + 12px);
  flex-direction: column;
}

.customer-service-chat-stage {
  display: flex;
  min-height: 0;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  margin-top: 0.35rem;
  padding: 1rem 0;
  border-radius: 0.5rem 0.5rem 0 0;
  background: #141414;
}

.customer-service-chat-frame {
  display: block;
  width: min(100%, 536px);
  height: min(756px, calc(100vh - 172px));
  min-height: 520px;
  flex: 0 1 auto;
  border: 0;
  border-radius: 0.5rem;
  background: #232323;
  box-shadow: 0 0.45rem 1.25rem rgba(0, 0, 0, 0.28);
}

@media (max-width: 63.99rem) {
  .customer-service-chat-page {
    min-height: calc(100dvh - var(--header-height));
  }

  .customer-service-chat-stage {
    margin-top: 0.2rem;
    padding: 0.35rem 0;
    background: #141414;
  }

  .customer-service-chat-frame {
    width: 100%;
    height: calc(100dvh - var(--header-height) - 3.25rem);
    min-height: 480px;
    border-radius: 0.45rem;
  }
}
</style>
