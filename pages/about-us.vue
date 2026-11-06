<script setup lang="ts">
import LegalPageShell from '~/components/legal/LegalPageShell.vue'

useAppSeo({
  title: 'About Us — Online Sports & Casino Gaming | 2Bet',
  description: 'Learn about 2Bet Philippines: our commitment to fair gaming, player protection, 24/7 customer support, and premier online sports and casino betting.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About 2Bet',
    url: 'https://2bet.com/about-us',
    description: 'Learn about 2Bet Philippines, player protection, and our premier online sports and casino gaming platform.',
  },
})
</script>

<template>
  <LegalPageShell title="About Us">
    <p>
      2Bet is an online sports betting and gaming platform designed to provide users with a secure, reliable, and premium wagering experience. We uphold the highest standards of integrity, transparency, and responsible gaming—earning the trust of sports fans and bettors alike.
    </p>

    <p>
      Our platform is designed with the user in mind, offering secure technology, seamless navigation, and competitive markets across a wide range of sports and gaming options. 2Bet continuously invests in innovation, compliance, and customer protection to ensure a fair and enjoyable experience for every player.
    </p>

    <p>
      At 2Bet, player safety and data security are paramount. We implement robust safeguards and follow applicable regulatory requirements to protect personal information and transactions, providing our users with confidence and peace of mind.
    </p>

    <p>
      Join 2Bet today and experience a trusted platform that elevates your sports betting journey to the next level.
    </p>

    <h3 class="text-white font-bold text-sm sm:text-[15px] pt-3 mb-2">
      Cookies &amp; User Experience
    </h3>

    <p>
      To enhance your experience and improve platform performance, 2Bet uses cookies and similar technologies to collect information from our servers when you access or use the website. By registering with 2Bet or continuing to use the platform, you consent to our use of cookies in accordance with our Cookie Policy.
    </p>

    <p>
      Please note that deleting or disabling cookies may limit your access to certain features or areas of the platform and may affect overall functionality.
    </p>

    <div class="pt-3 space-y-1 text-[#959799]">
      <p>Our customer service team is available 24/7 to assist you via phone.</p>
      <p>Please contact us at the following numbers:</p>
      <p><span class="text-white/80">Customer Service Hotline1 :</span> 09171518999</p>
      <p><span class="text-white/80">Customer Service Hotline2 :</span> 09171517999</p>
      <p><span class="text-white/80">Complaint Hotline :</span> 09177073888</p>
      <p><span class="text-white/80">Email :</span> support@2bet.com</p>
      <p><span class="text-white/80">Facebook :</span> @2betph</p>
    </div>
  </LegalPageShell>
</template>
