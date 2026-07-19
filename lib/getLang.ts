import { cookies } from "next/headers";
import { dictionaries, type Lang } from "./i18n";

export async function getLang(): Promise<Lang> {
  const cookieStore = await cookies();
  const value = cookieStore.get("lang")?.value;
  return value === "sw" ? "sw" : "en";
}

export async function getDictionary() {
  const lang = await getLang();
  return { lang, t: dictionaries[lang] };
}
