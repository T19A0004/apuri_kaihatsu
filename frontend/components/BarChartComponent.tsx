"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

// Mock data: Read and Unread Messages
const chartData = [
  { date: "2024-04-01", read: 222, unread: 150 },
  { date: "2024-04-02", read: 97, unread: 180 },
  { date: "2024-04-03", read: 167, unread: 120 },
  { date: "2024-04-04", read: 242, unread: 260 },
  { date: "2024-04-05", read: 373, unread: 290 },
  { date: "2024-04-06", read: 301, unread: 340 },
  { date: "2024-04-07", read: 245, unread: 180 },
  { date: "2024-04-08", read: 409, unread: 320 },
  { date: "2024-04-09", read: 59, unread: 110 },
  { date: "2024-04-10", read: 200, unread: 200 },
  { date: "2024-04-11", read: 327, unread: 350 },
  { date: "2024-04-12", read: 292, unread: 210 },
  { date: "2024-04-13", read: 342, unread: 380 },
  { date: "2024-04-14", read: 137, unread: 220 },
  { date: "2024-04-15", read: 120, unread: 170 },
  { date: "2024-04-16", read: 138, unread: 190 },
  { date: "2024-04-17", read: 446, unread: 360 },
  { date: "2024-04-18", read: 364, unread: 410 },
  { date: "2024-04-19", read: 243, unread: 180 },
  { date: "2024-04-20", read: 89, unread: 150 },
  { date: "2024-04-21", read: 137, unread: 200 },
  { date: "2024-04-22", read: 224, unread: 170 },
  { date: "2024-04-23", read: 138, unread: 230 },
  { date: "2024-04-24", read: 387, unread: 290 },
  { date: "2024-04-25", read: 215, unread: 250 },
  { date: "2024-04-26", read: 75, unread: 130 },
  { date: "2024-04-27", read: 383, unread: 420 },
  { date: "2024-04-28", read: 122, unread: 180 },
  { date: "2024-04-29", read: 315, unread: 240 },
  { date: "2024-04-30", read: 454, unread: 380 },
  { date: "2024-05-01", read: 165, unread: 220 },
  { date: "2024-05-02", read: 293, unread: 310 },
  { date: "2024-05-03", read: 247, unread: 190 },
  { date: "2024-05-04", read: 385, unread: 420 },
  { date: "2024-05-05", read: 481, unread: 390 },
  { date: "2024-05-06", read: 498, unread: 520 },
  { date: "2024-05-07", read: 388, unread: 300 },
  { date: "2024-05-08", read: 149, unread: 210 },
  { date: "2024-05-09", read: 227, unread: 180 },
  { date: "2024-05-10", read: 293, unread: 330 },
  { date: "2024-05-11", read: 335, unread: 270 },
  { date: "2024-05-12", read: 197, unread: 240 },
  { date: "2024-05-13", read: 197, unread: 160 },
  { date: "2024-05-14", read: 448, unread: 490 },
  { date: "2024-05-15", read: 473, unread: 380 },
  { date: "2024-05-16", read: 338, unread: 400 },
  { date: "2024-05-17", read: 499, unread: 420 },
  { date: "2024-05-18", read: 315, unread: 350 },
  { date: "2024-05-19", read: 235, unread: 180 },
  { date: "2024-05-20", read: 177, unread: 230 },
  { date: "2024-05-21", read: 82, unread: 140 },
  { date: "2024-05-22", read: 81, unread: 120 },
  { date: "2024-05-23", read: 0, unread: 600 },
  { date: "2024-05-24", read: 600, unread: 0 },
  { date: "2024-05-25", read: 300, unread: 300 },
  { date: "2024-05-26", read: 213, unread: 170 },
  { date: "2024-05-27", read: 420, unread: 460 },
  { date: "2024-05-28", read: 233, unread: 190 },
  { date: "2024-05-29", read: 78, unread: 130 },
  { date: "2024-05-30", read: 340, unread: 280 },
  { date: "2024-05-31", read: 178, unread: 230 },
  { date: "2024-06-01", read: 178, unread: 200 },
  { date: "2024-06-02", read: 470, unread: 410 },
  { date: "2024-06-03", read: 103, unread: 160 },
  { date: "2024-06-04", read: 439, unread: 380 },
  { date: "2024-06-05", read: 88, unread: 140 },
  { date: "2024-06-06", read: 294, unread: 250 },
  { date: "2024-06-07", read: 323, unread: 370 },
  { date: "2024-06-08", read: 385, unread: 320 },
  { date: "2024-06-09", read: 438, unread: 480 },
  { date: "2024-06-10", read: 155, unread: 200 },
  { date: "2024-06-11", read: 92, unread: 150 },
  { date: "2024-06-12", read: 492, unread: 420 },
  { date: "2024-06-13", read: 81, unread: 130 },
  { date: "2024-06-14", read: 426, unread: 380 },
  { date: "2024-06-15", read: 307, unread: 350 },
  { date: "2024-06-16", read: 37, unread: 310 },
  { date: "2024-06-17", read: 475, unread: 520 },
  { date: "2024-06-18", read: 107, unread: 170 },
  { date: "2024-06-19", read: 341, unread: 290 },
  { date: "2024-06-20", read: 408, unread: 450 },
  { date: "2024-06-21", read: 169, unread: 210 },
  { date: "2024-06-22", read: 317, unread: 270 },
  { date: "2024-06-23", read: 480, unread: 130 },
  { date: "2024-06-24", read: 132, unread: 180 },
  { date: "2024-06-25", read: 141, unread: 190 },
  { date: "2024-06-26", read: 434, unread: 180 },
  { date: "2024-06-27", read: 0, unread: 600 },
  { date: "2024-06-28", read: 600, unread: 300 },
  { date: "2024-06-29", read: 600, unread: 0 },
  { date: "2024-06-30", read: 300, unread: 300 },
]

export function BarChartComponent() {
  const t = useTranslations("graph");
  const [timeRange, setTimeRange] = React.useState("90d");

  // Filter data based on time range
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30"); // Change to the latest date in your dataset
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  // Calculate total messages and percentages
  const totalMessages = filteredData.reduce(
    (acc, curr) => ({
      read: acc.read + curr.read,
      unread: acc.unread + curr.unread,
    }),
    { read: 0, unread: 0 }
  );

  const readPercentage = (
    (totalMessages.read / (totalMessages.read + totalMessages.unread)) *
    100
  ).toFixed(1);
  const unreadPercentage = (
    (totalMessages.unread / (totalMessages.read + totalMessages.unread)) *
    100
  ).toFixed(1);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>{t("Messages Overview")}</CardTitle>
          <CardDescription>
            {t("Showing read and unread messages for the selected time range")}
          </CardDescription>
          <div>
            <strong>{t("Read")}:</strong> {readPercentage}% &nbsp; | &nbsp;
            <strong>{t("Unread")}:</strong> {unreadPercentage}%
          </div>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label={t("Select a value")}
          >
            <SelectValue placeholder={t("Last 3 months")} />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              {t("Last 3 months")}
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              {t("Last 30 days")}
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              {t("Last 7 days")}
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={filteredData}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <YAxis />
          <Tooltip
          contentStyle={{
            backgroundColor: "var(--tooltip-bg-color)", // Use a CSS variable
            border: "none",
            borderRadius: "8px",
          }}
            formatter={(value, name, props) => {
              const { payload } = props;
              const total = payload.read + payload.unread;
              const percentage = total > 0 ? ((value as number) / total * 100).toFixed(1) : "0.0";
              return [`${value} (${percentage}%)`, name];
            }}
            labelFormatter={(value) =>
              new Date(value).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }
          />
          <Legend />
          <Bar dataKey="read" fill="#4CAF50" stackId="a" /> {/* Green for read */}
          <Bar dataKey="unread" fill="#F44336" stackId="a" /> {/* Red for unread */}
        </BarChart>
      </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
