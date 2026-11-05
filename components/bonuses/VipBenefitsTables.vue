<script setup lang="ts">
import type { VipBenefitTier, VipRebateTier } from '~/data/promotions'

defineProps<{
  rebates: VipRebateTier[]
  benefits: VipBenefitTier[]
}>()
</script>

<template>
  <div class="vip-benefits" lang="zh-Hant">
    <div class="vip-benefits__scroller" tabindex="0" role="region" aria-label="VIP返水比例表，可橫向捲動">
      <div class="vip-benefits__rebates">
        <table v-for="tier in rebates" :key="tier.level" class="vip-rebate-table">
          <caption class="vip-benefits__caption">{{ tier.level }} 返水比例與每日返水上限</caption>
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
              <th rowspan="2" scope="rowgroup">{{ tier.level }}</th>
              <td rowspan="2">返水<br>比例</td>
              <td>體育<br>{{ tier.sports }}</td>
              <td colspan="2">真人<br>{{ tier.liveCasino }}</td>
              <td aria-label="體育及真人每日返水上限：無上限">無上限</td>
            </tr>
            <tr>
              <td>電子<br>{{ tier.slots }}</td>
              <td>電競{{ tier.esports }}</td>
              <td>棋牌{{ tier.tableGames }}</td>
              <td :aria-label="`電子、電競及棋牌每日返水上限：${tier.dailyCap}`">{{ tier.dailyCap }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <p class="vip-benefits__note">注：體育及真人返水不設上限；電子、電競及棋牌返水每日上限依以上 VIP 返水表為準。</p>

    <h3 class="vip-benefits__title">VIP升級福利一覽</h3>
    <div class="vip-benefits__scroller" tabindex="0" role="region" aria-label="VIP升級福利一覽，可橫向捲動">
      <div class="vip-benefits__upgrade-table-frame">
        <table class="vip-upgrade-table">
          <caption class="vip-benefits__caption">VIP升級流水、晉級禮金、每月紅包及生日禮金</caption>
          <thead>
            <tr>
              <th scope="col">等級</th>
              <th scope="col">升級<br>流水</th>
              <th scope="col">晉級<br>禮金</th>
              <th scope="col">每月<br>紅包</th>
              <th scope="col">生日<br>禮金</th>
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
