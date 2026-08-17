/* instrumentation.ts */
import * as opentelemetry from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-proto";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";

const otelUrl = process.env.OTEL_URL?.trim();

if (!otelUrl) {
  console.log(
    "[LOG] OTEL_URL not configured. Skipping OpenTelemetry initialization.",
  );
} else {
  const sdk = new opentelemetry.NodeSDK({
    // Resource.default() automatically captures the OTEL_SERVICE_NAME environment variable
    traceExporter: new OTLPTraceExporter({
      url: `${otelUrl}/v1/traces`,
      headers: {},
    }),
    metricReader: new PeriodicExportingMetricReader({
      exporter: new OTLPMetricExporter({
        url: `${otelUrl}/v1/metrics`,
        headers: {},
      }),
    }),
    instrumentations: [getNodeAutoInstrumentations()],
  });

  sdk.start();
}
