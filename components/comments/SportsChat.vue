<script setup lang="ts">
const { bybetRedirectUrl: bybetBaseUrl, bybetRedirectCode } = useRuntimeConfig().public
const bybetRedirectUrl = `${bybetBaseUrl}/login?p=${bybetRedirectCode}`
const { translate } = useSiteLocale()
</script>

<template>
  <section id="sports-chat" class="sports-chat" :aria-label="translate('Conversation')">
    <div class="sports-chat__body">
      <div class="sports-chat__empty" role="status">
        <svg viewBox="0 0 240 160" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="conversation-ground" x1="120" y1="70" x2="120" y2="160" gradientUnits="userSpaceOnUse">
              <stop stop-color="#656767" />
              <stop offset="1" stop-color="#131313" />
            </linearGradient>
            <linearGradient id="conversation-bubble" x1="128" y1="65" x2="156" y2="111" gradientUnits="userSpaceOnUse">
              <stop stop-color="#f0f2f3" /><stop offset="1" stop-color="#9b9e9f" />
            </linearGradient>
          </defs>
          <path d="M10 156C29 99 69 75 120 75C171 75 211 101 230 156H10Z" fill="url(#conversation-ground)" />
          <path d="M76 46C76 28 91 16 111 16C134 16 148 29 148 46C148 65 135 76 115 76H98L80 84L84 66C79 61 76 54 76 46Z" fill="#b4b9bc" />
          <g fill="#e3e7e9"><circle cx="96" cy="44" r="4.5" /><circle cx="113" cy="44" r="4.5" /><circle cx="130" cy="44" r="4.5" /></g>
          <path d="M114 67C114 57 123 51 135 51C147 51 156 58 156 68C156 74 153 79 148 82L151 90L139 85H135C123 85 114 78 114 67Z" fill="url(#conversation-bubble)" />
          <g fill="#f4f5f5"><circle cx="125" cy="66" r="2.5" /><circle cx="135" cy="66" r="2.5" /><circle cx="145" cy="66" r="2.5" /></g>
          <ellipse cx="116" cy="103" rx="20" ry="2.5" fill="#c9cdce" />
          <path d="M54 102L53 80L57 95L60 77L60 102Z" fill="#c9cdce" />
          <path d="M180 104V118" stroke="#c9cdce" stroke-width="2" /><path d="M173 99C176 83 183 83 187 99C189 106 171 106 173 99Z" fill="#c9cdce" />
          <path d="M164 33C180 52 186 30 176 31C165 33 176 45 188 49" stroke="#006b4b" stroke-width="1.5" />
        </svg>
        <p>{{ translate('No conversation at the moment') }}</p>
      </div>
    </div>
    <footer class="comment-footer sports-chat__footer">
      <a id="sports-chat-login" :href="bybetRedirectUrl" class="chat-login sports-chat__login">{{ translate('Log in to chat') }}</a>
      <a :href="bybetRedirectUrl" class="chat-login sports-chat__compose" :aria-label="translate('Log in to send a message')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="-1 -1 22 22" fill="none" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.858 0V0.013C12.1678 0.0463357 12.4027 0.307863 12.4027 0.6195C12.4027 0.931137 12.1678 1.19266 11.858 1.226V1.245H2.905C1.99022 1.24554 1.24785 1.98523 1.244 2.9V17.1C1.2462 18.0159 1.98905 18.7575 2.905 18.758H15.084C15.9996 18.7569 16.7418 18.0156 16.744 17.1V9.365H16.763C16.7635 9.02635 17.0374 8.75165 17.376 8.75C17.5395 8.75079 17.6961 8.81659 17.8111 8.93289C17.926 9.0492 17.9901 9.20645 17.989 9.37V17.1C17.9846 18.7017 16.6858 19.9984 15.084 20H2.905C1.30325 19.9984 0.00440563 18.7017 0 17.1V2.9C0.00440563 1.29825 1.30325 0.00164637 2.905 0H11.858ZM13.605 13.79C13.9482 13.79 14.2265 14.0683 14.2265 14.4115C14.2265 14.7547 13.9482 15.033 13.605 15.033H4.585C4.24176 15.033 3.9635 14.7547 3.9635 14.4115C3.9635 14.0683 4.24176 13.79 4.585 13.79H13.605ZM13.717 9.378C14.0602 9.378 14.3385 9.65626 14.3385 9.9995C14.3385 10.3427 14.0602 10.621 13.717 10.621H4.697C4.35375 10.621 4.0755 10.3427 4.0755 9.9995C4.0755 9.65626 4.35375 9.378 4.697 9.378H13.717ZM16.503 0L20 3.4L16.503 6.786V4.848C14.3797 4.68687 12.3162 5.5967 11.003 7.273C11.003 7.273 11.643 1.938 16.503 1.938V0ZM8.319 4.966C8.66224 4.966 8.9405 5.24426 8.9405 5.5875C8.9405 5.93075 8.66224 6.209 8.319 6.209H4.696C4.35276 6.209 4.0745 5.93075 4.0745 5.5875C4.0745 5.24426 4.35276 4.966 4.696 4.966H8.319Z" fill="currentColor" />
        </svg>
      </a>
    </footer>
  </section>
</template>

<style scoped>
.sports-chat { display: flex; width: 100%; min-width: 0; min-height: 0; flex: 1 1 0; flex-direction: column; overflow: hidden; border: 1px solid rgb(255 255 255 / 5%); border-radius: 12px; color: #f4f4f4; background: #131313; }
.sports-chat__body { display: flex; min-width: 0; min-height: 0; flex: 1 1 0; align-items: center; justify-content: center; overflow-y: auto; padding: 16px 12px; }
.sports-chat__empty { display: flex; width: 100%; flex: 0 0 auto; flex-direction: column; align-items: center; text-align: center; }
.sports-chat__empty > svg { display: block; width: min(220px, 80%); height: auto; }
.sports-chat__empty p { margin: 12px 0 0; color: #979b9c; font-size: 16px; line-height: 24px; }
.sports-chat__footer { display: flex; flex: 0 0 auto; align-items: center; gap: 8px; padding: 8px; padding-bottom: max(8px, env(safe-area-inset-bottom)); }
.chat-login { min-width: 0; min-height: 40px; border: 1px solid rgb(255 255 255 / 22%); border-radius: 24px; color: #a7afad; background: linear-gradient(145deg, rgb(255 255 255 / 14%), rgb(255 255 255 / 2.5%) 55%, rgb(255 255 255 / 7%)); box-shadow: inset 0 1px 1px rgb(255 255 255 / 32%), inset 0 -1px 2px rgb(255 255 255 / 8%), 0 4px 12px rgb(0 0 0 / 24%); text-decoration: none; }
.chat-login:focus-visible { outline: 2px solid #30cf99; outline-offset: 2px; }
.sports-chat__login { display: flex; flex: 1 1 0; align-items: center; padding: 0 12px; font-size: 14px; line-height: 20px; }
.sports-chat__compose { display: grid; width: 40px; height: 40px; flex: 0 0 40px; place-items: center; }
.sports-chat__compose svg { display: block; width: 22px; height: 22px; }
:global(html[data-theme='light']) .sports-chat { border-color: #d8e2dc; background: #f5f8f6; }
:global(html[data-theme='light']) .sports-chat__empty p { color: #61706a; }
</style>
