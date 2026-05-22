#!/usr/bin/env node
'use strict';

/**
 * send-report.js
 * Reads lib/scan-report.json and sends a daily summary email via GMX SMTP.
 * Run after build-data-ts.js completes.
 */

const nodemailer = require('nodemailer');
const fs         = require('fs');
const path       = require('path');

const REPORT_PATH = path.join(__dirname, '..', 'lib', 'scan-report.json');

// ── Email config ──────────────────────────────────────────────────────────────

const GMX_USER = process.env.GMX_USER;
const GMX_PASS = process.env.GMX_PASSWORD;
const TO_EMAIL = process.env.REPORT_TO || GMX_USER;

if (!GMX_USER || !GMX_PASS) {
  console.error('[send-report] GMX_USER or GMX_PASSWORD not set. Skipping email.');
  process.exit(0);
}

// ── Load report ───────────────────────────────────────────────────────────────

if (!fs.existsSync(REPORT_PATH)) {
  console.error('[send-report] scan-report.json not found. Run build-data-ts.js first.');
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf8'));
const { scanTimestampNY, etfScan, yfScan } = report;

// ── HTML builders ─────────────────────────────────────────────────────────────

const STATUS_OK   = '<span style="color:#34d399;font-weight:700;">&#10003;</span>';
const STATUS_FAIL = '<span style="color:#f87171;font-weight:700;">&#10007;</span>';

function etfRows() {
  return Object.entries(etfScan.results).map(([etf, r]) => {
    const status = r.ok ? STATUS_OK : STATUS_FAIL;
    const count  = r.ok ? `${r.count} holdings` : 'no data';
    return `<tr>
      <td style="padding:5px 12px;font-family:monospace;font-size:13px;color:#f1f5f9;">${etf}</td>
      <td style="padding:5px 12px;font-size:13px;color:#94a3b8;">${count}</td>
      <td style="padding:5px 12px;text-align:center;">${status}</td>
    </tr>`;
  }).join('');
}

function yfFailedList() {
  if (yfScan.failed.length === 0) return '<em style="color:#34d399;">All tickers returned data.</em>';
  return yfScan.failed.map(t =>
    `<code style="background:#1e293b;padding:1px 6px;border-radius:4px;font-size:12px;color:#f87171;">${t}</code>`
  ).join(' ');
}

const etfStatusLine = etfScan.failed.length === 0
  ? `<span style="color:#34d399;">All ${etfScan.ok}/${etfScan.total} ETFs scraped successfully.</span>`
  : `<span style="color:#fbbf24;">${etfScan.ok}/${etfScan.total} ETFs ok. Failed: ${etfScan.failed.join(', ')}</span>`;

const yfStatusLine = yfScan.failed.length === 0
  ? `<span style="color:#34d399;">All ${yfScan.succeeded}/${yfScan.total} tickers returned financials.</span>`
  : `<span style="color:#fbbf24;">${yfScan.succeeded}/${yfScan.total} tickers ok. ${yfScan.failed.length} failed.</span>`;

const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:-apple-system,'Segoe UI',Arial,sans-serif;color:#f1f5f9;">
<div style="max-width:640px;margin:32px auto;padding:0 16px;">

  <!-- Header -->
  <div style="border-bottom:1px solid #1e293b;padding-bottom:16px;margin-bottom:24px;">
    <span style="font-size:20px;font-weight:800;letter-spacing:-.01em;">
      <span style="color:#34d399;">Top</span>10 Daily Scan Report
    </span>
    <span style="float:right;font-size:12px;color:#64748b;margin-top:5px;">${scanTimestampNY}</span>
  </div>

  <!-- Summary banner -->
  <div style="background:#1e293b;border-radius:10px;padding:14px 18px;margin-bottom:24px;font-size:13px;line-height:1.7;">
    <div>${etfStatusLine}</div>
    <div>${yfStatusLine}</div>
  </div>

  <!-- ETF Holdings Scan -->
  <h2 style="font-size:14px;font-weight:700;color:#94a3b8;letter-spacing:.08em;text-transform:uppercase;margin:0 0 10px;">ETF Holdings Scan</h2>
  <table style="width:100%;border-collapse:collapse;background:#1e293b;border-radius:10px;overflow:hidden;margin-bottom:28px;">
    <thead>
      <tr style="border-bottom:1px solid #334155;">
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">ETF</th>
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">Result</th>
        <th style="padding:8px 12px;text-align:center;font-size:11px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">Status</th>
      </tr>
    </thead>
    <tbody>${etfRows()}</tbody>
  </table>

  <!-- Yahoo Finance Scan -->
  <h2 style="font-size:14px;font-weight:700;color:#94a3b8;letter-spacing:.08em;text-transform:uppercase;margin:0 0 10px;">Yahoo Finance Scan</h2>
  <div style="background:#1e293b;border-radius:10px;padding:14px 18px;margin-bottom:28px;font-size:13px;line-height:1.8;">
    <div style="margin-bottom:8px;">
      <strong style="color:#f1f5f9;">${yfScan.succeeded}</strong>
      <span style="color:#64748b;"> of </span>
      <strong style="color:#f1f5f9;">${yfScan.total}</strong>
      <span style="color:#64748b;"> tickers returned financials + price data.</span>
    </div>
    <div>
      <span style="color:#64748b;font-size:12px;margin-right:8px;">Failed:</span>
      ${yfFailedList()}
    </div>
  </div>

  <!-- Footer -->
  <div style="border-top:1px solid #1e293b;padding-top:14px;font-size:11px;color:#475569;display:flex;justify-content:space-between;">
    <span>top10.spready.io</span>
    <span>${scanTimestampNY}</span>
  </div>

</div>
</body>
</html>`;

// ── Send ──────────────────────────────────────────────────────────────────────

const etfOk  = etfScan.ok;
const etfTot = etfScan.total;
const yfOk   = yfScan.succeeded;
const yfTot  = yfScan.total;

const subject = `Top10 Scan — ETF ${etfOk}/${etfTot} · YF ${yfOk}/${yfTot} — ${scanTimestampNY}`;

const transporter = nodemailer.createTransport({
  host:   'mail.gmx.com',
  port:   587,
  secure: false,
  auth:   { user: GMX_USER, pass: GMX_PASS },
});

(async () => {
  await transporter.sendMail({
    from:    `"Top10 Bot" <${GMX_USER}>`,
    to:      TO_EMAIL,
    subject,
    html,
  });
  console.log(`[send-report] Email sent: ${subject}`);
})().catch(e => {
  console.error('[send-report] Failed to send email:', e.message);
  process.exit(1);
});
