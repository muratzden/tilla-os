export type MemoryEntry = {
  timestamp: number;

  input?: any;

  dna?: any;
  dnaInterpretation?: any;

  meaning?: any;
  knowledge?: any;

  narrative?: any;

  archetype?: any;

  world?: any;
  scene?: any;

  collection?: any;

  artDirection?: any;

  visualPrompt?: any;
  governedPrompt?: any;

  decision?: any;

  content?: any;

  governed?: any;
};

const memoryStore: MemoryEntry[] = [];

export const brandMemory = {
  write(entry: Partial<MemoryEntry>) {
    const memoryEntry: MemoryEntry = {
      timestamp: Date.now(),
      ...entry,
    };

    memoryStore.push(memoryEntry);

    return memoryEntry;
  },

  save(entry: Partial<MemoryEntry>) {
    return this.write(entry);
  },

  all() {
    return memoryStore;
  },

  latest() {
    return memoryStore[memoryStore.length - 1] ?? null;
  },

  clear() {
    memoryStore.length = 0;

    return {
      success: true,
      message: "Brand memory cleared.",
    };
  },

  count() {
    return memoryStore.length;
  },
};

export function readMemory(): {
  decisions: MemoryEntry[];
  feedback: any[];
} {
  return {
    decisions: brandMemory.all(),
    feedback: [],
  };
}

export function saveDecision(entry: Partial<MemoryEntry>) {
  return brandMemory.write(entry);
}
