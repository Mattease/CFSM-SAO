import type { PingOverviewBucket } from "@/types/cfsm";
import { getDisplayDateParts, trimFixed } from "@/utils/format";

function formatPingBucketWindow(bucket: PingOverviewBucket | null) {
  if (!bucket || bucket.startAt == null || bucket.endAt == null) {
    return null;
  }

  const start = getDisplayDateParts(bucket.startAt);
  const end = getDisplayDateParts(bucket.endAt);
  return `${start.hour}:${start.minute} - ${end.hour}:${end.minute}`;
}

function formatLatencyBucketSummary(bucket: PingOverviewBucket | null) {
  if (!bucket) return "—";
  if (bucket.value != null) return `${trimFixed(bucket.value, 1)} ms`;
  return bucket.total > 0 ? "失败" : "无样本";
}

function formatLossBucketSummary(
  bucket: PingOverviewBucket | null,
  separator = " ",
) {
  if (!bucket) return "—";
  if (bucket.total <= 0 || bucket.loss == null) return "无样本";
  return `${trimFixed(bucket.loss, 1)}%${separator}${bucket.lost}/${bucket.total}`;
}

export function formatHealthBucketTooltip(
  bucket: PingOverviewBucket,
  kind: "latency" | "loss",
) {
  const window = formatPingBucketWindow(bucket);
  const summary =
    kind === "latency"
      ? formatLatencyBucketSummary(bucket)
      : formatLossBucketSummary(bucket, " · ");
  return window ? `${window} · ${summary}` : summary;
}
