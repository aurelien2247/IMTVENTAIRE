import { atom } from "jotai";

export const codeScannedAtom = atom<string | null>(null);
export const searchQueryAtom = atom<string>("");