import { atom } from "jotai";

export const codeScannedAtom = atom<string | null>("");
export const scanModeAtom = atom<boolean>(false);
export const searchQueryAtom = atom<string>("");