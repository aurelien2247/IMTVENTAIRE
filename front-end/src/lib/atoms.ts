import { atom } from "jotai";

export const codeScannedAtom = atom<string | null>("A-103");
export const scanModeAtom = atom<boolean>(false);