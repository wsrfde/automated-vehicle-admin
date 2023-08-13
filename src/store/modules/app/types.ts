export interface AppState {
  title: string;
  theme: string;
  colorWeek: boolean;
  navbar: boolean;
  menu: boolean;
  menuCollapse: boolean;
  footer: boolean;
  themeColor: string;
  menuWidth: number;
  globalSettings: boolean;
  defaultRouter: string;
  monitorAddress: string;
  [key: string]: unknown;
}
