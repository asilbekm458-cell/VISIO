export interface ColorSwatch {
  hex: string;
  name: string;
  role: string;
}

export interface Palette {
  colors: ColorSwatch[];
  note: string;
}

export interface StyleDetail {
  name: string;
  description: string;
  colors: ColorSwatch[];
  materials: string[];
  furniture: string[];
  tips: string[];
}

export type RoomType = "living" | "bedroom" | "kitchen" | "bathroom" | "office" | "kids";
export type Lighting = "natural" | "limited" | "artificial" | "mixed";
export type Mood = "calm" | "energetic" | "cozy" | "luxury" | "modern" | "natural";

const palettes: Partial<Record<RoomType, Partial<Record<Mood, Partial<Record<Lighting, Palette>>>>>> = {
  living: {
    calm: {
      natural: {
        colors: [
          { hex: "#E8E0D5", name: "Qum rangi", role: "Asosiy devor" },
          { hex: "#C4B5A0", name: "Latte", role: "Accent devor" },
          { hex: "#8B7355", name: "Tosh jigarrang", role: "Mebel" },
          { hex: "#4A5240", name: "Ormon yashili", role: "Dekoratsiya" },
        ],
        note: "Tabiiy yorug'lik bilan qum va yashil tonlar uyg'unlik yaratadi. Psixologik ta'sir: tinchlik va osoyishtalik. Parda uchun krem yoki oq rangni tavsiya etamiz.",
      },
      limited: {
        colors: [
          { hex: "#F5EBD8", name: "Iliq oq", role: "Asosiy devor" },
          { hex: "#E8D5B5", name: "Ochiq qum", role: "Accent" },
          { hex: "#A0856A", name: "Karamel", role: "Mebel" },
          { hex: "#6B7C5E", name: "Sage", role: "O'simliklar" },
        ],
        note: "Cheklangan yorug'likda iliq, aks ettiruvchi ranglar xonani kengaytiradi. Yorug' rangli parda va kuzgu qo'shing.",
      },
      mixed: {
        colors: [
          { hex: "#F0E6D3", name: "Sutli krem", role: "Asosiy devor" },
          { hex: "#D4C5A9", name: "Bug'doy", role: "Accent devor" },
          { hex: "#7A8B6F", name: "Zaytun", role: "Mebel" },
          { hex: "#B8A88A", name: "Qumtosh", role: "Qoplam" },
        ],
        note: "Aralash yorug'likda neytral-iliq tonlar eng yaxshi natija beradi. Yorug'lik manbalarini balandda joylashtiring.",
      },
    },
    energetic: {
      natural: {
        colors: [
          { hex: "#FF6B35", name: "Korall", role: "Accent devor" },
          { hex: "#F7F3EE", name: "Iliq oq", role: "Asosiy devor" },
          { hex: "#2D4A3E", name: "To'q yashil", role: "Mebel va parda" },
          { hex: "#FFB347", name: "O'rik", role: "Dekoratsiya" },
        ],
        note: "Faol va ijodiy muhit uchun korall-yashil kontrast. Mehmonxona yoki ijodiy ish bo'shliq uchun ideal.",
      },
      artificial: {
        colors: [
          { hex: "#E63946", name: "Qizil", role: "Accent" },
          { hex: "#1D3557", name: "Ko'k", role: "Asosiy devor" },
          { hex: "#F1FAEE", name: "Muz oq", role: "Shift" },
          { hex: "#A8DADC", name: "Bublegam", role: "Dekor" },
        ],
        note: "Sun'iy yorug'lik ostida kuchli kontrastli ranglar energiya bag'ishlaydi. LED lampa iliq tonda bo'lsin.",
      },
    },
    cozy: {
      natural: {
        colors: [
          { hex: "#8B4513", name: "Qo'ng'ir", role: "Asosiy devor" },
          { hex: "#D2691E", name: "Shokolad", role: "Accent" },
          { hex: "#F4A460", name: "Qumli jigarrang", role: "Mebel" },
          { hex: "#FFF8DC", name: "Mays", role: "Yorug'lik elementlar" },
        ],
        note: "Issiq va qulay atmosfera uchun jigarrang-oltin palitrasi. Sherpa jun, paxta va teridan tayyorlangan to'qimalar mos.",
      },
      limited: {
        colors: [
          { hex: "#FFDAB9", name: "Shaftoli", role: "Asosiy devor" },
          { hex: "#CD853F", name: "Peru", role: "Mebel" },
          { hex: "#FFF5EE", name: "Linen", role: "Shift" },
          { hex: "#DEB887", name: "Burlywood", role: "Qoplama" },
        ],
        note: "Cheklangan yorug'likda iliq tonlar xonani shinam qiladi. Mat finish devor bo'yoqlari yorug'likni yaxshi aks ettiradi.",
      },
    },
    luxury: {
      natural: {
        colors: [
          { hex: "#1C1C1C", name: "Antrasit", role: "Asosiy devor" },
          { hex: "#C9A84C", name: "Oltin", role: "Accent" },
          { hex: "#2C1810", name: "Espresso", role: "Mebel" },
          { hex: "#F5F0E8", name: "Sut", role: "Kontrastli element" },
        ],
        note: "Premium va elegant muhit uchun qora-oltin kombinatsiyasi. Marmar, mis va kadifel mato eng mos materiallar.",
      },
      mixed: {
        colors: [
          { hex: "#2C2C2C", name: "Charcoal", role: "Asosiy" },
          { hex: "#B8860B", name: "Dark goldenrod", role: "Accent" },
          { hex: "#3C3C3C", name: "Slate", role: "Mebel" },
          { hex: "#E8E0D0", name: "Ivory", role: "Tekstil" },
        ],
        note: "Aralash yorug'likda qorong'i asosga oltin detallar mos keladi. Dimmer shart — yorug'lik boshqaruv muhim.",
      },
    },
    modern: {
      natural: {
        colors: [
          { hex: "#F8F9FA", name: "Optic white", role: "Asosiy devor" },
          { hex: "#E9ECEF", name: "Kulrang oq", role: "Ikkinchi devor" },
          { hex: "#495057", name: "Qo'rg'oshin", role: "Mebel" },
          { hex: "#339AF0", name: "Elektrik ko'k", role: "Accent dekor" },
        ],
        note: "Zamonaviy minimal uslub uchun neytral bazaga yorqin accent. Geometrik shakllar va texnologik elementlar mos.",
      },
      artificial: {
        colors: [
          { hex: "#1A1A2E", name: "Midnight", role: "Asosiy" },
          { hex: "#16213E", name: "Navy", role: "Ikkinchi" },
          { hex: "#0F3460", name: "Deep blue", role: "Mebel" },
          { hex: "#E94560", name: "Neon red", role: "Accent" },
        ],
        note: "Sun'iy yorug'lik bilan qorong'i zamonaviy uslub ajoyib ko'rinadi. LED strip va neon aksentlar qo'shing.",
      },
    },
    natural: {
      natural: {
        colors: [
          { hex: "#8FBC8F", name: "O'rta yashil", role: "Asosiy devor" },
          { hex: "#F5DEB3", name: "Bug'doy", role: "Zamin" },
          { hex: "#8B6914", name: "Qarag'ay", role: "Mebel" },
          { hex: "#F0E68C", name: "Xaki", role: "Parda" },
        ],
        note: "Eko-natural uslub uchun o'simlik va er tonlari. Bambuk, rattan va tabiiy tosh materiallar mos.",
      },
    },
  },
  bedroom: {
    calm: {
      natural: {
        colors: [
          { hex: "#D4E6FF", name: "Osmon ko'ki", role: "Asosiy devor" },
          { hex: "#EBF5FF", name: "Muz ko'ki", role: "Shift" },
          { hex: "#8BA3C4", name: "Tog' ko'ki", role: "Accent" },
          { hex: "#F5F0E8", name: "Krem", role: "To'shak-yostiq" },
        ],
        note: "Yotoqxona uchun ko'k tonlar uyqu sifatini yaxshilaydi. Psixologik ta'sir: tinchlantiruvchi, uyquga yordam beradi.",
      },
      limited: {
        colors: [
          { hex: "#E8D5E8", name: "Lavanda", role: "Asosiy devor" },
          { hex: "#F5EEFF", name: "Oq lavanda", role: "Shift" },
          { hex: "#9B72CF", name: "Binafsha", role: "Accent" },
          { hex: "#E0D0F5", name: "Lilac", role: "Parda" },
        ],
        note: "Cheklangan yorug'lik uchun lavanda-binafsha tonlar. Uyquga tayyorlanish uchun ideal muhit.",
      },
    },
    cozy: {
      natural: {
        colors: [
          { hex: "#8B6B4A", name: "Teak jigar", role: "Asosiy devor" },
          { hex: "#D4A96A", name: "Oltin jigar", role: "Accent" },
          { hex: "#2C1810", name: "Espresso", role: "Bosh to'shak" },
          { hex: "#F5DEB3", name: "Makoviy", role: "Yostiq" },
        ],
        note: "Qulay yotoq uchun issiq jigarrang palitrasi. Termal parda, sherpa to'shak yostig'i to'ldirib beradi.",
      },
    },
    luxury: {
      natural: {
        colors: [
          { hex: "#0D0D0D", name: "Jet qora", role: "Bir devor" },
          { hex: "#1C2833", name: "Tun ko'ki", role: "Qolgan devorlar" },
          { hex: "#F5CBA7", name: "Oltin zarhal", role: "Accent" },
          { hex: "#FFFFFF", name: "Optic oq", role: "To'shak linenlar" },
        ],
        note: "Hashamatli suite uslubi. Qora-oltin palitrasi + premium mato (ipak, kadifel). Dimmer chiroqlar shart.",
      },
    },
    modern: {
      natural: {
        colors: [
          { hex: "#F5F5F5", name: "Tizza oq", role: "Asosiy" },
          { hex: "#E0E0E0", name: "Kulrang", role: "Ikkinchi" },
          { hex: "#424242", name: "Dark grey", role: "Mebel" },
          { hex: "#00BCD4", name: "Cyan", role: "Accent" },
        ],
        note: "Zamonaviy yotoqxona uchun minimalist palitra. Yorug'likni boshqarish va akustika muhim.",
      },
    },
  },
  kitchen: {
    modern: {
      natural: {
        colors: [
          { hex: "#FFFFFF", name: "Optic oq", role: "Shkaflar" },
          { hex: "#2C3E50", name: "Ko'k-kulrang", role: "Adalar" },
          { hex: "#F39C12", name: "Oltin", role: "Qo'l ushlagichlar" },
          { hex: "#ECF0F1", name: "Kumush", role: "Texnika rangi" },
        ],
        note: "Zamonaviy oshxona uchun oq-qo'ng'ir-oltin kombinatsiyasi klassik tanlov. Marmar countertop mos keladi.",
      },
    },
    natural: {
      natural: {
        colors: [
          { hex: "#F5F5DC", name: "Beige", role: "Shkaflar" },
          { hex: "#8FBC8F", name: "Sage yashil", role: "Accent shkaflar" },
          { hex: "#D2B48C", name: "Bug'doyrang", role: "Countertop" },
          { hex: "#FFFACD", name: "Limon sariq", role: "Mayda dekorlar" },
        ],
        note: "Natural oshxona uchun yashil-beige palitrasi. Yog'och countertop va o'simliklar bilan to'ldiring.",
      },
    },
    energetic: {
      natural: {
        colors: [
          { hex: "#E74C3C", name: "Pomidor qizil", role: "Accent" },
          { hex: "#FFFFFF", name: "Oq", role: "Asosiy shkaflar" },
          { hex: "#2C3E50", name: "To'q ko'k", role: "Orqa panel" },
          { hex: "#F39C12", name: "Apelsin", role: "Dekor" },
        ],
        note: "Energetik oshxona uchun qizil-ok ranglari. Ijobiy kayfiyat va ishtaha rag'batlantiradi.",
      },
    },
  },
  bathroom: {
    calm: {
      natural: {
        colors: [
          { hex: "#E0F7FA", name: "Ice blue", role: "Devor" },
          { hex: "#B2EBF2", name: "Light cyan", role: "Qoplama" },
          { hex: "#FFFFFF", name: "Oq", role: "Sanitar" },
          { hex: "#80CBC4", name: "Teal", role: "Aksent" },
        ],
        note: "Tinch hammom uchun muz ko'ki tonlari. Spa atmosferasi yaratadi. Tabiiy tosh qoplama ideal.",
      },
    },
    luxury: {
      natural: {
        colors: [
          { hex: "#1A1A1A", name: "Qora marmar", role: "Zamin" },
          { hex: "#C0C0C0", name: "Kumush", role: "Aksessuarlar" },
          { hex: "#F5F5F5", name: "Marble white", role: "Devor" },
          { hex: "#B8860B", name: "Oltin", role: "Chiroqlar" },
        ],
        note: "Hashamatli hammom uchun qora-oq-oltin. Marmar va kumush aksessuarlar zaruriy.",
      },
    },
  },
  office: {
    modern: {
      natural: {
        colors: [
          { hex: "#FFFFFF", name: "Oq", role: "Devor" },
          { hex: "#37474F", name: "Blue grey", role: "Mebel" },
          { hex: "#263238", name: "Charcoal", role: "Aksent devor" },
          { hex: "#00ACC1", name: "Cyan", role: "Aksent dekor" },
        ],
        note: "Productiv ish joyi uchun minimalist palitra. Tabiiy yorug'lik va ergonomik mebel muhim.",
      },
    },
    energetic: {
      natural: {
        colors: [
          { hex: "#FFC107", name: "Ambor", role: "Aksent devor" },
          { hex: "#FFFFFF", name: "Oq", role: "Asosiy devor" },
          { hex: "#455A64", name: "Slate", role: "Mebel" },
          { hex: "#FF5722", name: "Deep orange", role: "Aksent dekor" },
        ],
        note: "Ijodiy jamoa uchun energiyali ranglar. Sariq-oq bazada yorqin aksentlar.",
      },
    },
  },
  kids: {
    energetic: {
      natural: {
        colors: [
          { hex: "#FFD54F", name: "Quyosh sariq", role: "Asosiy" },
          { hex: "#4FC3F7", name: "Osmon ko'ki", role: "Accent" },
          { hex: "#FFFFFF", name: "Oq", role: "Mebel" },
          { hex: "#81C784", name: "Yashil", role: "Dekor" },
        ],
        note: "Bolalar uchun quvnoq va ijobiy ranglar. Psixologik rivojlanishga yordam beradi.",
      },
    },
    calm: {
      natural: {
        colors: [
          { hex: "#C5E1A5", name: "Light green", role: "Devor" },
          { hex: "#FFF9C4", name: "Light yellow", role: "Shift" },
          { hex: "#B3E5FC", name: "Light blue", role: "Accent" },
          { hex: "#FFE0B2", name: "Peach", role: "Mebel" },
        ],
        note: "Tinch o'yin muhiti uchun pastel ranglar. Uyqu va o'yin uchun alohida zonalar yaratish tavsiya etiladi.",
      },
    },
  },
};

export function getPalette(room: RoomType, mood: Mood, light: Lighting): Palette | null {
  const roomData = palettes[room];
  if (!roomData) return null;
  const moodData = roomData[mood];
  if (!moodData) return null;
  // Try exact match first
  const exactPalette = moodData[light];
  if (exactPalette) return exactPalette;
  // Fallback: try 'natural' lighting for any mood
  const fallbackPalette = moodData["natural"];
  if (fallbackPalette) return fallbackPalette;
  // Final fallback: try 'calm' mood with 'natural' lighting
  const calmData = palettes[room]?.calm;
  if (calmData) {
    return calmData.natural || calmData[light] || null;
  }
  return null;
}

export const styleDetails: Record<string, StyleDetail> = {
  modern: {
    name: "Zamonaviy",
    description:
      "Toza chiziqlar, minimalist shakllar va texnologik elementlar bilan to'ldirilgan zamonaviy interyer. Oddiy geometrik shakllar va silliq sirtlar asosiy xususiyat.",
    colors: [
      { hex: "#3D52A0", name: "Indigo", role: "Asosiy accent" },
      { hex: "#EEEEEE", name: "Tizza oq", role: "Devorlar" },
      { hex: "#7091E6", name: "Cornflower", role: "Dekor" },
      { hex: "#1A1A2E", name: "Midnight", role: "Mebel" },
    ],
    materials: ["Metall", "Shisha", "Beton", "Teri", "Lak yog'och"],
    furniture: ["Minimalist divan", "Shisha stol", "LED panel chiroq", "Geometrik gilam"],
    tips: [
      "Ochiq reja bilan kenglik hissi yaratish",
      "Yashirin yoritish tizimidan foydalanish",
      "Tekstil sifatida teri va mat tog'oralardan foydalanish",
      "Katta oynali eshiklar tabiiy yorug'lik uchun",
    ],
  },
  scandi: {
    name: "Skandinavcha",
    description:
      "Issiq, natural va funksional dizayn. Hygge falsafasiga asoslangan, tabiiy materiallar va yorug'likni maksimal ishlatish bilan ajralib turadi.",
    colors: [
      { hex: "#D4C5A9", name: "Linen", role: "Asosiy devor" },
      { hex: "#8B7355", name: "Walnut", role: "Mebel" },
      { hex: "#E8DDD0", name: "Cream", role: "Tekstil" },
      { hex: "#F5F0E8", name: "Warm white", role: "Shift" },
    ],
    materials: ["Yog'och (qayin, qarag'ay)", "Paxta", "Linen", "Jun", "Keramika"],
    furniture: ["L Shape divan", "Yog'och stol", "Paxta gilam", "Pendant chiroq"],
    tips: [
      "Tabiiy yog'och elementlar ko'proq qo'shish",
      "Yorug' rangli parda va tabiiy matolardan foydalanish",
      "Minimalist dekoratsiya — har bir narsa funksional bo'lishi kerak",
      "O'simliklar bilan tabiiy atmosfera yaratish",
    ],
  },
  eastern: {
    name: "Sharqona",
    description:
      "Boy an'analar, murakkab naqshlar va issiq ranglar bilan to'ldirilgan sharqona interyer. Marokash, Osiyo va O'rta Sharq dizayn elementlari uyg'unlashgan.",
    colors: [
      { hex: "#8B1A1A", name: "Tomato", role: "Asosiy accent" },
      { hex: "#C8860A", name: "Dark gold", role: "Dekor" },
      { hex: "#4A0404", name: "Dark maroon", role: "Mebel" },
      { hex: "#1C0A00", name: "Espresso", role: "Asosiy devor" },
    ],
    materials: ["Mis", "Kadifel", "Marmar", "Xidirgil (mosaic)", "Keramika"],
    furniture: ["Oltin mixli divan", "Xalq kamin", "Naqshli gilam", "Mis chiroq"],
    tips: [
      "Mozaik va naqshli detallar ko'proq qo'shish",
      "Mis va oltin aksessuarlar bilan hashamat yaratish",
      "Sharqona gilamlar zamin uchun ideal",
      "Zanjirli yoki lampa shaklidagi chiroqlar tanlang",
    ],
  },
  loft: {
    name: "Loft",
    description:
      "Sanoat uslubidagi ochiq makonlar, ochilgan g'isht va metalldan foydalanish bilan ajralib turadi. Kreativ va erkin fazilar uchun.",
    colors: [
      { hex: "#555555", name: "Concrete", role: "Devor" },
      { hex: "#333333", name: "Iron", role: "Mebel" },
      { hex: "#E07B39", name: "Rust", role: "Accent" },
      { hex: "#2A2A2A", name: "Charcoal", role: "Zamin" },
    ],
    materials: ["G'isht", "Metal", "Beton", "Kesilgan yog'och", "Industrial shisha"],
    furniture: ["Metal stul", "Pallet stol", "Ochiq kitob javon", "Industrial chiroq"],
    tips: [
      "Ochiq devor va trubalarni yashirmaslik",
      "Eski yog'och elementlar bilan issiqlik qo'shish",
      "Katta oyna va ochiq makon hissi",
      "Sanoat uslubidagi chiroqlar va aksessuarlar",
    ],
  },
  luxury: {
    name: "Hashamatli",
    description:
      "Premium materiallar, murakkab detallar va eksklyuziv atmosfera. YUqori sinf mehmonxonalar va penthouse interyerlaridan ilhomlangan.",
    colors: [
      { hex: "#2C1810", name: "Espresso", role: "Asosiy devor" },
      { hex: "#C9A84C", name: "Gold", role: "Accent" },
      { hex: "#1C1C1C", name: "Black", role: "Mebel" },
      { hex: "#F5F0E8", name: "Ivory", role: "Tekstil" },
    ],
    materials: ["Marmar", "Kadifel", "Ipak", "Mis", "Brass"],
    furniture: ["Chesterfield divan", "Kristal lyustra", "Marmar stol", "Velvet parda"],
    tips: [
      "Marmar va tabiiy tosh qoplama qo'llash",
      "Kadifel va ipak matolardan foydalanish",
      "Oltin va mis aksessuarlar bilan hashamat qo'shish",
      "Dimmer bilan yoritish boshqarish zaruriy",
    ],
  },
  minimal: {
    name: "Minimalist",
    description:
      "Faqat zaruriy narsalar. Toza sirtlar, monoxrom ranglar va funksionallik. Less is more falsafasi.",
    colors: [
      { hex: "#E5E5E5", name: "Light grey", role: "Devor" },
      { hex: "#BDBDBD", name: "Silver", role: "Mebel" },
      { hex: "#757575", name: "Grey", role: "Aksent" },
      { hex: "#FAFAFA", name: "Near white", role: "Shift" },
    ],
    materials: ["Oq yog'och", "Betun", "Shisha", "Plywood", "Chelik"],
    furniture: ["Platforma to'shak", "Built-in javon", "Minimal stol", "Track chiroq"],
    tips: [
      "Faqat eng zaruriy mebelni saqlash",
      "Yashirin saqlash joylari qo'shish",
      "Bitta rangli aksent element tanlang",
      "Sirtlarni toza va minimal saqlash",
    ],
  },
};

export const roomTypes: Record<string, string> = {
  living: "Mehmonxona",
  bedroom: "Yotoqxona",
  kitchen: "Oshxona",
  bathroom: "Hammom",
  office: "Ish xonasi",
  kids: "Bolalar xonasi",
};

export const lightingTypes: Record<string, string> = {
  natural: "Tabiiy (janub/sharq)",
  limited: "Cheklangan yorug'lik",
  artificial: "Sun'iy yorug'lik",
  mixed: "Aralash",
};

export const moodTypes: Record<string, string> = {
  calm: "Tinch va osoyishta",
  energetic: "Faol va ijodiy",
  cozy: "Issiq va qulay",
  luxury: "Hashamatli",
  modern: "Zamonaviy",
  natural: "Tabiiy / Eko",
};
