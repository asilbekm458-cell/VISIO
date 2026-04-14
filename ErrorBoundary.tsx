"use client";

import { Component, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-12 h-12 rounded-full bg-[rgba(255,107,107,0.1)] flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-[#FF6B6B]" />
            </div>
            <h3 className="text-[16px] font-semibold text-[#EEF2FF] mb-2">
              Nimaadir noto&apos;g&apos;ri bo&apos;ldi
            </h3>
            <p className="text-[13px] text-[#94A3C4] mb-4 text-center max-w-[300px]">
              Sahifani yangilash orqali muammoni tuzatishga harakat qiling.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5B5FEF] text-[13px] font-medium text-white hover:opacity-90 transition-opacity"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Qayta yuklash
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
