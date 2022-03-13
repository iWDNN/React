import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: string;
    bgColor: string;
    boardColor: string;
    cardColor: string;
  }
}