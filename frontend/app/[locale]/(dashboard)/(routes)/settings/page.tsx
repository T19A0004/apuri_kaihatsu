"use client";

import { useTranslations } from "next-intl";
import LanguageSelect from "@/components/LanguageSelect";
import { ToggleMode } from "@/components/toggle-mode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Settings() {
  const t = useTranslations("settings");
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">{t("Settings")}</h1>

      {/* Language Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t("Language")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            {t("messages.languageDescription")}
          </p>
          <LanguageSelect />
        </CardContent>
      </Card>

      {/* Appearance Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t("Appearance")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            {t("messages.appearanceDescription")}
          </p>
          <ToggleMode />
        </CardContent>
      </Card>
    </div>
  );
}
