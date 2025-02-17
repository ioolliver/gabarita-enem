'use client';

import { useEffect } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";

export function PageView() {
    useEffect(() => {
        const ANALYTICS = getAnalytics();
        logEvent(ANALYTICS, "page_view", {
            page_path: window.origin
        })
    }, []);
    
    return null;
}