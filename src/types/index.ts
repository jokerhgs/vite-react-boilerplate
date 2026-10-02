import type { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface PageProps<TParams = Record<string, string>> {
  params?: TParams;
}
