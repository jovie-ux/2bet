<script setup lang="ts">
import type { VipBenefitTier, VipRebateTier, VipTableLabels } from '~/data/promotions'

withDefaults(defineProps<{
  rebates: VipRebateTier[]
  benefits: VipBenefitTier[]
  labels?: VipTableLabels
  program?: boolean
}>(), { program: false })

const { translate } = useSiteLocale()
</script>

<template>
  <div class="vip-benefits" :class="{ 'vip-benefits--program': program }" lang="pt-BR">
    <div class="vip-benefits__scroller" tabindex="0" role="region" :aria-label="translate('Tabela de cashback VIP, rolável horizontalmente')">
      <div class="vip-benefits__rebates">
        <table v-for="tier in rebates" :key="tier.level" class="vip-rebate-table">
          <caption class="vip-benefits__caption">{{ tier.level }} — {{ translate('Porcentagem de cashback e limite diário') }}</caption>
          <colgroup>
            <col class="vip-rebate-table__level-column">
            <col class="vip-rebate-table__label-column">
            <col class="vip-rebate-table__slots-column">
            <col class="vip-rebate-table__esports-column">
            <col class="vip-rebate-table__games-column">
            <col class="vip-rebate-table__cap-column">
          </colgroup>
          <tbody>
            <tr>
              <th rowspan="2" scope="rowgroup"><span v-if="program" aria-hidden="true">👑 </span>{{ tier.level }}</th>
              <td rowspan="2"><template v-if="labels?.rate">{{ labels.rate }}</template><template v-else>{{ translate('Taxa de') }}<br>{{ translate('Cashback') }}</template></td>
              <td>{{ translate('Esportes') }}<br>{{ tier.sports }}</td>
              <td colspan="2">{{ labels?.liveCasino || translate('Ao Vivo') }}<br>{{ tier.liveCasino }}</td>
              <td :aria-label="`${translate('Esportes e Cassino Ao Vivo limite diário')}: ${labels?.unlimited || translate('Sem Limite')}`">{{ labels?.unlimited || translate('Sem Limite') }}</td>
            </tr>
            <tr>
              <td>{{ translate('Slots') }}<br>{{ tier.slots }}</td>
              <td>{{ translate('eSports') }}<br>{{ tier.esports }}</td>
              <td>{{ translate('Mesa') }}<br>{{ tier.tableGames }}</td>
              <td :aria-label="`${translate('Slots, eSports e Jogos de Mesa limite diário')}: ${tier.dailyCap}`">{{ tier.dailyCap }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <p class="vip-benefits__note">{{ labels?.note || translate('Nota: O cashback de Esportes e Cassino Ao Vivo não possui limite; o limite diário de cashback para Slots, eSports e Jogos de Mesa segue a tabela VIP acima.') }}</p>

    <h3 class="vip-benefits__title"><span v-if="program" aria-hidden="true">👑 </span>{{ labels?.benefitsTitle || translate('Benefícios de Evolução VIP') }}</h3>
    <div class="vip-benefits__scroller" tabindex="0" role="region" :aria-label="translate('Benefícios de Evolução VIP, rolável horizontalmente')">
      <div class="vip-benefits__upgrade-table-frame">
        <table class="vip-upgrade-table">
          <caption class="vip-benefits__caption">{{ translate('Evolução VIP: Rollover, Bônus de Nível, Mensal e Aniversário') }}</caption>
          <thead>
            <tr>
              <th scope="col"><span v-if="program" class="vip-benefits__header-icon" aria-hidden="true">🏆</span>{{ translate('Nível') }}</th>
              <th scope="col"><span v-if="program" class="vip-benefits__header-icon" aria-hidden="true">🎯</span><template v-if="labels?.turnover">{{ labels.turnover }}</template><template v-else>{{ translate('Turnover') }}<br>{{ translate('Upgrade') }}</template></th>
              <th scope="col"><span v-if="program" class="vip-benefits__header-icon" aria-hidden="true">🎁</span><template v-if="labels?.upgradeBonus">{{ labels.upgradeBonus }}</template><template v-else>{{ translate('Bônus') }}<br>{{ translate('Nível') }}</template></th>
              <th scope="col"><span v-if="program" class="vip-benefits__header-icon" aria-hidden="true">🧧</span><template v-if="labels?.monthlyBonus">{{ labels.monthlyBonus }}</template><template v-else>{{ translate('Bônus') }}<br>{{ translate('Mensal') }}</template></th>
              <th scope="col"><span v-if="program" class="vip-benefits__header-icon" aria-hidden="true">🎂</span><template v-if="labels?.birthdayBonus">{{ labels.birthdayBonus }}</template><template v-else>{{ translate('Bônus') }}<br>{{ translate('Aniversário') }}</template></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tier in benefits" :key="tier.level">
              <th scope="row">{{ tier.level }}</th>
              <td>{{ tier.turnover }}</td>
              <td>{{ tier.upgradeBonus }}</td>
              <td>{{ tier.monthlyRedPacket }}</td>
              <td>{{ tier.birthdayBonus }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vip-benefits {
  width: 100%;
  min-width: 0;
  margin-top: 14px;
  color: #fff;
}

.vip-benefits__scroller {
  width: 100%;
  min-width: 0;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-color: #429bdb #242424;
  scrollbar-width: thin;
}

.vip-benefits__scroller:focus-visible {
  outline: 2px solid #429bdb;
  outline-offset: 3px;
}

.vip-benefits__rebates {
  min-width: 660px;
}

.vip-rebate-table {
  width: 100%;
  margin: 0 0 12px;
  overflow: hidden;
  border: 1px solid #429bdb;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  table-layout: fixed;
  font-family: 'Times New Roman', 'PingFang TC', serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.05;
}

.vip-rebate-table:last-child {
  margin-bottom: 0;
}

.vip-rebate-table__level-column { width: 20%; }
.vip-rebate-table__label-column { width: 17%; }
.vip-rebate-table__slots-column { width: 20%; }
.vip-rebate-table__esports-column { width: 13%; }
.vip-rebate-table__games-column { width: 10%; }
.vip-rebate-table__cap-column { width: 20%; }

.vip-rebate-table th,
.vip-rebate-table td {
  height: 47px;
  padding: 6px 8px;
  border-right: 1px solid #429bdb;
  text-align: center;
  vertical-align: middle;
}

.vip-rebate-table td:last-child {
  border-right: 0;
}

.vip-rebate-table tr:first-child td:not([rowspan]) {
  border-bottom: 1px solid #429bdb;
}

.vip-benefits__note {
  margin: 12px 0 0;
  font-family: 'Times New Roman', 'PingFang TC', serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
}

.vip-benefits__title {
  margin: 32px 0 12px;
  font-size: 16px;
  font-weight: 800;
  line-height: 1.4;
  text-align: center;
}

.vip-benefits__upgrade-table-frame {
  min-width: 620px;
  overflow: hidden;
  border: 2px solid #429bdb;
  border-radius: 10px;
}

.vip-upgrade-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
}

.vip-upgrade-table th,
.vip-upgrade-table td {
  height: 30px;
  padding: 5px 8px;
  border-right: 1px solid #429bdb;
  border-bottom: 1px solid #429bdb;
  text-align: center;
  vertical-align: middle;
}

.vip-upgrade-table thead th {
  height: 48px;
}

.vip-upgrade-table tr > :last-child {
  border-right: 0;
}

.vip-upgrade-table tbody tr:last-child > * {
  border-bottom: 0;
}

.vip-benefits__caption {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.vip-benefits--program .vip-rebate-table__level-column,
.vip-benefits--program .vip-rebate-table__label-column,
.vip-benefits--program .vip-rebate-table__esports-column,
.vip-benefits--program .vip-rebate-table__games-column { width: 12.5%; }
.vip-benefits--program .vip-rebate-table__slots-column,
.vip-benefits--program .vip-rebate-table__cap-column { width: 25%; }
.vip-benefits__header-icon { display: block; margin-bottom: 2px; line-height: 1; }

:global(html[data-theme='light']) .vip-benefits {
  color: #14251d;
}

@media (max-width: 63.99rem) {
  .vip-benefits__note,
  .vip-benefits__title {
    font-size: 14px;
  }
}
</style>
