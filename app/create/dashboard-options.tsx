"use client";

import { useState } from "react";

const chartOptions = [
  { value: "bar", label: "바", description: "항목별 수치 비교" },
  { value: "pie", label: "원형", description: "전체 구성 비율" },
  { value: "donut", label: "도넛", description: "비중과 구성 비교" }
] as const;

export function DashboardOptions({
  template,
  themeKey,
  templateLabels,
  themeLabels
}: {
  template: string;
  themeKey: string;
  templateLabels: Record<string, string>;
  themeLabels: Record<string, string>;
}) {
  const [selectedTemplate, setSelectedTemplate] = useState(template);

  return (
    <>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="template">Template</label>
          <select
            id="template"
            name="template"
            value={selectedTemplate}
            onChange={(event) => setSelectedTemplate(event.target.value)}
          >
            {Object.entries(templateLabels).map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="themeKey">Style</label>
          <select id="themeKey" name="themeKey" defaultValue={themeKey}>
            {Object.entries(themeLabels).map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedTemplate === "dashboard" ? (
        <fieldset className="field dashboard-chart-field">
          <legend>Dashboard charts</legend>
          <p className="field-hint">Choose one or more chart styles for the generated dashboard.</p>
          <div className="chart-type-options">
            {chartOptions.map((chart, index) => (
              <label className="chart-type-card" key={chart.value}>
                <input
                  name="chartTypes"
                  type="checkbox"
                  value={chart.value}
                  defaultChecked={index < 2}
                />
                <span className={`chart-option-preview chart-option-${chart.value}`} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                <strong>{chart.label}</strong>
                <small>{chart.description}</small>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}
    </>
  );
}
