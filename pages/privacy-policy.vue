<script setup lang="ts">
import LegalPageShell from '~/components/legal/LegalPageShell.vue'

useAppSeo({
  title: 'Política de Privacidade e Proteção de Dados Pessoais | 2bet',
  description: 'Saiba como a 2bet Brasil protege suas informações pessoais e bancárias, garantindo conformidade com a LGPD e rigorosos padrões de segurança.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Política de Privacidade', path: '/privacy-policy' },
  ],
})
</script>

<template>
  <LegalPageShell title="Privacy Policy">
    <p>
      2Bet, operated by Global Play Hub Innovations Corp., acts as the Personal Information Controller (PIC) responsible for the collection and processing of your personal data under the Philippine Data Privacy Act of 2012 (Republic Act No. 10173) and National Privacy Commission (NPC) regulations. We are committed to safeguarding player confidentiality with enterprise-grade standards.
    </p>

    <h3 class="text-white font-bold text-sm sm:text-[15px] pt-3 mb-1.5">
      1.0 Personal Information We Collect
    </h3>
    <p>
      We collect only the minimum information necessary to provide safe, compliant, and seamless gaming services:
    </p>
    <ul class="list-disc list-inside space-y-1.5 pl-1 text-[#959799]">
      <li><strong class="text-white/80">Identity Information:</strong> Full legal name, date of birth, nationality, and government ID scans (Passport, Driver’s License, UMID) for KYC verification.</li>
      <li><strong class="text-white/80">Contact Information:</strong> Active Philippine mobile phone number, email address, and residential address.</li>
      <li><strong class="text-white/80">Financial &amp; Payment Data:</strong> GCash/Maya phone numbers, bank account details, transaction reference IDs, and payment verification receipts.</li>
      <li><strong class="text-white/80">Technical &amp; Usage Data:</strong> IP address, device fingerprints, browser version, operating system, and geographic location logs.</li>
      <li><strong class="text-white/80">Gaming History:</strong> Betting slips, game round outcomes, livestream chat messages, and deposit/withdrawal timestamps.</li>
    </ul>

    <h3 class="text-white font-bold text-sm sm:text-[15px] pt-3 mb-1.5">
      2.0 Purposes &amp; Legal Grounds for Processing
    </h3>
    <p>
      Your data is processed strictly for legitimate contractual and regulatory objectives:
    </p>
    <ul class="list-disc list-inside space-y-1.5 pl-1 text-[#959799]">
      <li><strong class="text-white/80">Regulatory &amp; Legal Compliance:</strong> Fulfilling mandatory KYC age verification (21+ rule) and anti-money laundering reporting required by PAGCOR and the AMLC.</li>
      <li><strong class="text-white/80">Service Execution:</strong> Authenticating login credentials, processing automated deposits/payouts, and calculating accurate sports settlements.</li>
      <li><strong class="text-white/80">Fraud Detection &amp; Security:</strong> Detecting automated bot wagering, latency exploitation, multi-accounting, and cyber threats.</li>
      <li><strong class="text-white/80">Customer Experience:</strong> Providing 24/7 personalized live chat support and delivering opt-in promotional rewards.</li>
    </ul>

    <h3 class="text-white font-bold text-sm sm:text-[15px] pt-3 mb-1.5">
      3.0 Data Security &amp; Storage Protocols
    </h3>
    <p>
      All transmission of sensitive data is protected using 256-bit Transport Layer Security (TLS/SSL) encryption. Player databases are hosted in ISO/IEC 27001-certified data centers equipped with multi-layer firewall intrusion detection, strict least-privilege role access, and continuous security audits.
    </p>

    <h3 class="text-white font-bold text-sm sm:text-[15px] pt-3 mb-1.5">
      4.0 Third-Party Disclosures &amp; Regulatory Sharing
    </h3>
    <p>
      We never sell or rent your personal information to third-party marketers. Data is only shared with trusted service providers under strict data sharing agreements: payment gateways (for deposit/withdrawal settlement), licensed game studios (for game launching), and statutory regulatory bodies (PAGCOR and law enforcement) when legally mandated.
    </p>

    <h3 class="text-white font-bold text-sm sm:text-[15px] pt-3 mb-1.5">
      5.0 Cookies &amp; Tracking Technologies
    </h3>
    <p>
      2Bet utilizes session cookies and essential local storage tokens to preserve your active login session, language preferences, and odds display format. Analytics cookies are aggregated and anonymized to optimize page loading speeds and interface usability.
    </p>

    <h3 class="text-white font-bold text-sm sm:text-[15px] pt-3 mb-1.5">
      6.0 Data Retention Timelines
    </h3>
    <p>
      In accordance with the Anti-Money Laundering Act (AMLA), customer identification records, wagering logs, and financial transaction histories must be retained for a minimum statutory period of five (5) years following account termination. After this timeline, records are securely expunged or anonymized.
    </p>

    <h3 class="text-white font-bold text-sm sm:text-[15px] pt-3 mb-1.5">
      7.0 Your Rights as a Data Subject
    </h3>
    <p>
      Under RA 10173, you hold the following rights: the right to be informed, the right to access your stored personal information, the right to rectify inaccurate data, the right to object to automated processing, and the right to lodge a formal complaint with the National Privacy Commission (NPC).
    </p>

    <h3 class="text-white font-bold text-sm sm:text-[15px] pt-3 mb-1.5">
      8.0 Data Protection Officer (DPO) Contact Details
    </h3>
    <p>
      For inquiries regarding this Privacy Policy or to exercise your data subject rights, please reach out to our dedicated Data Protection Officer:
    </p>
    <div class="pt-1 space-y-1 text-[#959799]">
      <p><span class="text-white/80">Email:</span> dpo@2bet.com / privacy@2bet.ph</p>
      <p><span class="text-white/80">Attention:</span> Data Protection Compliance Office</p>
    </div>
  </LegalPageShell>
</template>
