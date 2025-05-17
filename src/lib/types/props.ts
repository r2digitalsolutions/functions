import { ClassValue } from "svelte/elements";

export type TProps = {
  class?: ClassValue;
  style?: string;
  [key: string]: any;
}