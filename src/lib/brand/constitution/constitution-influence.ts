import type { LocalizedText } from "../../i18n/get-localized-text";

export type ConstitutionInfluence = {
  worldBonuses: Record<string, number>;
  worldPenalties: Record<string, number>;
  worldReasons: Record<string, LocalizedText[]>;
  vetoWorlds: string[];
  vetoReasons: Record<string, LocalizedText>;
};

export function getConstitutionInfluence(
  archetypeKey?: string,
): ConstitutionInfluence {
  switch (archetypeKey) {
    case "quiet_power":
      return {
        worldBonuses: {
          collector_office: 5,
          private_library: 3,
          writer_studio: 2,
          quiet_residence: 1,
        },
        worldPenalties: {
          quiet_residence: 2,
        },
        worldReasons: {
          collector_office: [
            {
              tr: "Collector Office, Quiet Power için kontrollü güç, disiplin ve profesyonel ağırlık sinyali verir.",
              en: "Collector Office signals controlled power, discipline and professional weight for Quiet Power.",
            },
          ],
          private_library: [
            {
              tr: "Private Library, Quiet Power içinde sessiz otorite ve kalıcı değer hissini destekler.",
              en: "Private Library supports quiet authority and lasting value within Quiet Power.",
            },
          ],
          writer_studio: [
            {
              tr: "Writer Studio, düşünce, üretim ve kişisel karakter sinyalini destekler.",
              en: "Writer Studio supports thought, making and personal character.",
            },
          ],
          quiet_residence: [
            {
              tr: "Quiet Residence sıcaklık sağlar ancak Quiet Power için otorite sinyali daha zayıftır.",
              en: "Quiet Residence adds warmth but carries a weaker authority signal for Quiet Power.",
            },
          ],
        },
        vetoWorlds: [],
        vetoReasons: {},
      };

    case "modern_nomad":
      return {
        worldBonuses: {
          writer_studio: 5,
          quiet_residence: 3,
          private_library: 2,
          collector_office: 1,
        },
        worldPenalties: {
          collector_office: 3,
        },
        worldReasons: {
          writer_studio: [
            {
              tr: "Writer Studio, Modern Nomad için hareketli üretim, düşünce ve geçiş fikrini destekler.",
              en: "Writer Studio supports mobile making, thought and transition for Modern Nomad.",
            },
          ],
          quiet_residence: [
            {
              tr: "Quiet Residence, Modern Nomad için esnek yaşam ve sade kullanım hissini destekler.",
              en: "Quiet Residence supports flexible living and quiet utility for Modern Nomad.",
            },
          ],
          private_library: [
            {
              tr: "Private Library, Modern Nomad içinde kişisel karakter ve sahiplik duygusunu destekler.",
              en: "Private Library supports personal character and ownership within Modern Nomad.",
            },
          ],
          collector_office: [
            {
              tr: "Collector Office, Modern Nomad için fazla sabit ve yönetici odaklıdır.",
              en: "Collector Office is too static and executive-focused for Modern Nomad.",
            },
          ],
        },
        vetoWorlds: ["collector_office"],
        vetoReasons: {
          collector_office: {
            tr: "Collector Office, Modern Nomad için fazla sabit ve yönetici odaklıdır. Bu arketip hareket, geçiş ve uyarlanabilir ortam ister.",
            en: "Collector Office is too static and executive for Modern Nomad. This archetype needs movement, transition and adaptable environments.",
          },
        },
      };

    case "quiet_luxury":
      return {
        worldBonuses: {
          quiet_residence: 4,
          private_library: 3,
          collector_office: 2,
          writer_studio: 2,
        },
        worldPenalties: {
          writer_studio: 1,
        },
        worldReasons: {
          quiet_residence: [
            {
              tr: "Quiet Residence, Quiet Luxury için sakinlik, sadelik ve rafine yaşam hissini destekler.",
              en: "Quiet Residence supports calm, simplicity and refined living for Quiet Luxury.",
            },
          ],
          private_library: [
            {
              tr: "Private Library, Quiet Luxury içinde kalıcılık, sahiplik ve sessiz değer hissini güçlendirir.",
              en: "Private Library strengthens longevity, ownership and quiet value within Quiet Luxury.",
            },
          ],
          collector_office: [
            {
              tr: "Collector Office, Quiet Luxury için kontrollü profesyonellik ve premium ağırlık sağlar.",
              en: "Collector Office adds controlled professionalism and premium weight for Quiet Luxury.",
            },
          ],
          writer_studio: [
            {
              tr: "Writer Studio zanaat izini taşır ancak Quiet Luxury için fazla üretim odaklı kalabilir.",
              en: "Writer Studio carries the trace of craft but can feel too production-focused for Quiet Luxury.",
            },
          ],
        },
        vetoWorlds: [],
        vetoReasons: {},
      };

    case "warm_heritage":
    default:
      return {
        worldBonuses: {
          private_library: 6,
          writer_studio: 5,
          collector_office: 2,
          quiet_residence: 1,
        },
        worldPenalties: {
          quiet_residence: 2,
        },
        worldReasons: {
          private_library: [
            {
              tr: "Private Library, uzun ömür, sahiplik ve zamanla karakter kazanma fikrini destekler.",
              en: "Private Library supports longevity, ownership and character gained over time.",
            },
          ],
          writer_studio: [
            {
              tr: "Writer Studio, insan emeği, malzeme gerçekliği ve üretim izini görünür kılar.",
              en: "Writer Studio makes human craft, material truth and traces of making visible.",
            },
          ],
          collector_office: [
            {
              tr: "Collector Office, kontrollü güç ve kalıcı nesne algısını destekler.",
              en: "Collector Office supports controlled power and the perception of a lasting object.",
            },
          ],
          quiet_residence: [
            {
              tr: "Quiet Residence sıcaklık sağlar ancak Tilla'nın zanaat ve miras sinyalini daha zayıf taşır.",
              en: "Quiet Residence adds warmth but carries Tilla's craft and heritage signal more weakly.",
            },
          ],
        },
        vetoWorlds: [],
        vetoReasons: {},
      };
  }
}
