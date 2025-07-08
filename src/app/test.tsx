"use client"

import { useT } from "@/lib/i18n"

export function Test() {
    const { t } = useT("home")
    return(
        <h2>{t("title")}</h2>
    )
}