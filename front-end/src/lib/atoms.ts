import { atom } from "jotai";

export const codeScannedAtom = atom<string | null>("");
export const scanModeAtom = atom<boolean>(false);
export const searchQueryAtom = atom<string>("");
export const searchPiecesOnly = atom<boolean>(false);
export const pieceSelectedAtom = atom<string>("");