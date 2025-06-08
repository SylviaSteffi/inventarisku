import { useColorMode } from "./color-mode";
import { toaster } from "./toaster";

export function ShowToast(judul, pesan) {
  return toaster.create({
    title: judul,
    description: pesan,
    duration: 1000,
  });
}
