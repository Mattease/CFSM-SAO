import { describe, expect, it } from "vitest";
import {
  buildLoadTimeRangeOptions,
  buildPingTimeRangeOptions,
} from "@/components/instance/chartShared";

const ALL_STEPS = [
  { label: "10 分钟", value: 0.167 },
  { label: "30 分钟", value: 0.5 },
  { label: "1 小时", value: 1 },
  { label: "6 小时", value: 6 },
  { label: "12 小时", value: 12 },
  { label: "1 天", value: 24 },
  { label: "3 天", value: 72 },
  { label: "7 天", value: 168 },
  { label: "30 天", value: 720 },
];

describe("detail chart time ranges", () => {
  it("offers every backend-supported step up to 30 days", () => {
    // 后端 /api/history/all 最长支持 30 天（720 小时），登录与未登录上限一致。
    expect(buildPingTimeRangeOptions(720)).toEqual(ALL_STEPS);
    expect(buildLoadTimeRangeOptions(720)).toEqual([
      { label: "实时", value: 0 },
      ...ALL_STEPS,
    ]);
  });

  it("filters out steps above a smaller maxHours cap", () => {
    expect(buildPingTimeRangeOptions(24)).toEqual([
      { label: "10 分钟", value: 0.167 },
      { label: "30 分钟", value: 0.5 },
      { label: "1 小时", value: 1 },
      { label: "6 小时", value: 6 },
      { label: "12 小时", value: 12 },
      { label: "1 天", value: 24 },
    ]);
    expect(buildLoadTimeRangeOptions(24)).toEqual([
      { label: "实时", value: 0 },
      { label: "10 分钟", value: 0.167 },
      { label: "30 分钟", value: 0.5 },
      { label: "1 小时", value: 1 },
      { label: "6 小时", value: 6 },
      { label: "12 小时", value: 12 },
      { label: "1 天", value: 24 },
    ]);
  });
});
