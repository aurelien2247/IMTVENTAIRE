import { atom } from "jotai";

export const codeScannedAtom = atom<string | null>("29593");
export const scanModeAtom = atom<boolean>(false);
export const searchQueryAtom = atom<string>("");