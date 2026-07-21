export type FaqItem = { q: string; a: string };

export const faqData: Record<"en" | "sw", FaqItem[]> = {
  en: [
    {
      q: "What is GovHub Tanzania?",
      a: "GovHub Tanzania is an independent directory that brings together official government forms from agencies across Tanzania in one place, so you don't have to visit multiple offices or websites to find the right one.",
    },
    {
      q: "Is this an official government website?",
      a: 'No. GovHub Tanzania is an independent project, not a government agency. We source every form directly from official agency releases and clearly credit the issuing agency on each form\'s page.',
    },
    {
      q: "Are the forms free to download?",
      a: 'Most forms are free. Where a government fee applies, it\'s shown clearly on the form\'s page — look for the "Fee" field before you start.',
    },
    {
      q: "How do I know a form is current?",
      a: 'Every form shows its version number and the date it was last updated. Forms updated in the last two weeks are marked "● updated" so you can spot recent changes at a glance.',
    },
    {
      q: "Do I need an account to download a form?",
      a: "No — anyone can search and download forms without signing up. Creating a free account only adds the ability to save forms to your favourites for quick access later.",
    },
    {
      q: "How do I save a form for later?",
      a: 'Click the heart icon on any form, or the "Save to favourites" button on a form\'s page. You\'ll need to be logged in — signing up is free and takes a minute.',
    },
    {
      q: "I think a form is outdated or wrong — what do I do?",
      a: "Please let us know at hello@govhubtanzania.co.tz so we can verify it with the issuing agency and correct it as quickly as possible.",
    },
    {
      q: "Is GovHub available in Swahili?",
      a: "Yes — use the EN · SW switch in the top right of any page to toggle the site's language at any time.",
    },
    {
      q: "Can I use GovHub offline or install it like an app?",
      a: 'Yes. On mobile or desktop Chrome, look for "Add to Home Screen" or the install icon in the address bar to install GovHub as an app you can open directly, without opening a browser first.',
    },
  ],
  sw: [
    {
      q: "GovHub Tanzania ni nini?",
      a: "GovHub Tanzania ni orodha huru inayokusanya fomu rasmi za serikali kutoka mashirika mbalimbali ya Tanzania mahali pamoja, ili usihitaji kutembelea ofisi au tovuti nyingi kutafuta fomu sahihi.",
    },
    {
      q: "Je, hii ni tovuti rasmi ya serikali?",
      a: "Hapana. GovHub Tanzania ni mradi huru, si shirika la serikali. Tunapata kila fomu moja kwa moja kutoka kwa matoleo rasmi ya mashirika, na tunaonyesha wazi shirika linalohusika kwenye ukurasa wa kila fomu.",
    },
    {
      q: "Je, fomu ni bure kupakua?",
      a: 'Fomu nyingi ni bure. Pale ambapo ada ya serikali inatakiwa, inaonyeshwa wazi kwenye ukurasa wa fomu — angalia sehemu ya "Ada" kabla ya kuanza.',
    },
    {
      q: "Ninajuaje kama fomu ni ya sasa?",
      a: 'Kila fomu inaonyesha toleo lake na tarehe ya mara ya mwisho kusasishwa. Fomu zilizosasishwa ndani ya wiki mbili zilizopita zinaonyeshwa alama "● updated" ili uweze kuona mabadiliko ya hivi karibuni kwa haraka.',
    },
    {
      q: "Je, nahitaji akaunti kupakua fomu?",
      a: "Hapana — mtu yeyote anaweza kutafuta na kupakua fomu bila kujisajili. Kuunda akaunti ya bure kunaongeza tu uwezo wa kuhifadhi fomu kwenye vipendwa kwa matumizi ya haraka baadaye.",
    },
    {
      q: "Ninawezaje kuhifadhi fomu kwa matumizi ya baadaye?",
      a: 'Bofya alama ya moyo kwenye fomu yoyote, au kitufe cha "Hifadhi kwenye vipendwa" kwenye ukurasa wa fomu. Utahitaji kuingia kwenye akaunti — kujisajili ni bure na huchukua dakika moja.',
    },
    {
      q: "Nadhani fomu ina makosa au si ya sasa — nifanye nini?",
      a: "Tafadhali tujulishe kupitia hello@govhubtanzania.co.tz ili tuweze kuthibitisha na shirika husika na kurekebisha haraka iwezekanavyo.",
    },
    {
      q: "Je, GovHub inapatikana kwa Kiswahili?",
      a: "Ndiyo — tumia kitufe cha EN · SW kilicho juu kulia mwa ukurasa wowote kubadilisha lugha ya tovuti wakati wowote.",
    },
    {
      q: "Je, naweza kutumia GovHub bila mtandao au kuisakinisha kama programu?",
      a: 'Ndiyo. Kwenye simu au Chrome ya kompyuta, tafuta "Ongeza kwenye Skrini ya Nyumbani" au alama ya kusakinisha kwenye upau wa anwani ili kusakinisha GovHub kama programu unayoweza kufungua moja kwa moja.',
    },
  ],
};
