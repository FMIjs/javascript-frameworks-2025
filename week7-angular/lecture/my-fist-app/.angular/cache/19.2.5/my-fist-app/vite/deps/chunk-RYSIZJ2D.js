// node_modules/@azure/msal-browser/dist/telemetry/BrowserPerformanceMeasurement.mjs
var BrowserPerformanceMeasurement = class _BrowserPerformanceMeasurement {
  constructor(name, correlationId) {
    this.correlationId = correlationId;
    this.measureName = _BrowserPerformanceMeasurement.makeMeasureName(name, correlationId);
    this.startMark = _BrowserPerformanceMeasurement.makeStartMark(name, correlationId);
    this.endMark = _BrowserPerformanceMeasurement.makeEndMark(name, correlationId);
  }
  static makeMeasureName(name, correlationId) {
    return `msal.measure.${name}.${correlationId}`;
  }
  static makeStartMark(name, correlationId) {
    return `msal.start.${name}.${correlationId}`;
  }
  static makeEndMark(name, correlationId) {
    return `msal.end.${name}.${correlationId}`;
  }
  static supportsBrowserPerformance() {
    return typeof window !== "undefined" && typeof window.performance !== "undefined" && typeof window.performance.mark === "function" && typeof window.performance.measure === "function" && typeof window.performance.clearMarks === "function" && typeof window.performance.clearMeasures === "function" && typeof window.performance.getEntriesByName === "function";
  }
  /**
   * Flush browser marks and measurements.
   * @param {string} correlationId
   * @param {SubMeasurement} measurements
   */
  static flushMeasurements(correlationId, measurements) {
    if (_BrowserPerformanceMeasurement.supportsBrowserPerformance()) {
      try {
        measurements.forEach((measurement) => {
          const measureName = _BrowserPerformanceMeasurement.makeMeasureName(measurement.name, correlationId);
          const entriesForMeasurement = window.performance.getEntriesByName(measureName, "measure");
          if (entriesForMeasurement.length > 0) {
            window.performance.clearMeasures(measureName);
            window.performance.clearMarks(_BrowserPerformanceMeasurement.makeStartMark(measureName, correlationId));
            window.performance.clearMarks(_BrowserPerformanceMeasurement.makeEndMark(measureName, correlationId));
          }
        });
      } catch (e) {
      }
    }
  }
  startMeasurement() {
    if (_BrowserPerformanceMeasurement.supportsBrowserPerformance()) {
      try {
        window.performance.mark(this.startMark);
      } catch (e) {
      }
    }
  }
  endMeasurement() {
    if (_BrowserPerformanceMeasurement.supportsBrowserPerformance()) {
      try {
        window.performance.mark(this.endMark);
        window.performance.measure(this.measureName, this.startMark, this.endMark);
      } catch (e) {
      }
    }
  }
  flushMeasurement() {
    if (_BrowserPerformanceMeasurement.supportsBrowserPerformance()) {
      try {
        const entriesForMeasurement = window.performance.getEntriesByName(this.measureName, "measure");
        if (entriesForMeasurement.length > 0) {
          const durationMs = entriesForMeasurement[0].duration;
          window.performance.clearMeasures(this.measureName);
          window.performance.clearMarks(this.startMark);
          window.performance.clearMarks(this.endMark);
          return durationMs;
        }
      } catch (e) {
      }
    }
    return null;
  }
};

export {
  BrowserPerformanceMeasurement
};
/*! Bundled license information:

@azure/msal-browser/dist/telemetry/BrowserPerformanceMeasurement.mjs:
  (*! @azure/msal-browser v4.8.0 2025-03-20 *)
*/
//# sourceMappingURL=chunk-RYSIZJ2D.js.map
