import type { JSX } from "react";

export type NavigationProps = {
  userName: string;
  onLogout: () => void;
};

export default function Navigation(props: NavigationProps): JSX.Element;
