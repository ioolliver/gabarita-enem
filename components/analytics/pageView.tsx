'use client';

import { useEffect } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";

export function PageView({ title } : { title: string }) {
    useEffect(() => {
        const ANALYTICS = getAnalytics();
        logEvent(ANALYTICS, "page_view", {
            page_title: title
        })
    }, []);
    
    return null;
}