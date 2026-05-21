const TRANSLIT: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i",
  й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t",
  у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "",
  э: "e", ю: "yu", я: "ya",
};

function translit(value: string): string {
  return value
    .split("")
    .map((char) => {
      const lower = char.toLowerCase();
      return TRANSLIT[lower] ?? lower;
    })
    .join("");
}

export function makeSlug(source: string, fallbackPrefix = "item"): string {
  const base = translit(source.trim())
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  if (base) return base;
  return `${fallbackPrefix}-${Math.random().toString(36).slice(2, 8)}`;
}

