import { atom } from "jotai";

export const codeScannedAtom = atom<string | null>("2959");
export const scanModeAtom = atom<boolean>(false);
export const searchQueryAtom = atom<string>("");