export function worldNarrator(world: any) {
  if (world.environment === "private_study") {
    return "Ceviz ağacı, kâğıt ve pirinç detayların eşlik ettiği zamansız bir çalışma odası atmosferi.";
  }

  if (world.environment === "executive_office") {
    return "Kontrollü detaylar ve güçlü sadelikle şekillenen profesyonel bir çalışma alanı.";
  }

  if (world.environment === "travel_lounge") {
    return "Hareket, keşif ve yolculuk hissini taşıyan rafine bir atmosfer.";
  }

  if (world.environment === "minimal_studio") {
    return "Malzemenin ön plana çıktığı sakin ve zamansız bir görsel dünya.";
  }

  return "Tilla'nın zamansız zanaat dünyası.";
}
