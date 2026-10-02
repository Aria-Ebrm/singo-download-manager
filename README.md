# Singo Download Manager

<div align="center">
  <h3>Next-Generation High Performance Download Manager</h3>
  <p>Engineered with Rust Async Core, Tauri v2 & Vercel Geist Design System</p>
</div>

---

## ⚡️ Key Features

- **Blazing Fast (Rust Engine):** Non-blocking asynchronous network I/O with Tokio and zero-copy streams.
- **Dynamic Segment Splitting:** IDM-style adaptive multi-connection part splitting to fully saturate your bandwidth.
- **Zero-Freeze Disk Allocation:** Fast OS-level preallocation preventing system freezes during huge downloads.
- **Security-First Architecture:** Stdio-based Native Messaging Host for Chrome and Firefox extensions with no insecure local HTTP ports.
- **Minimal Footprint:** Memory usage below 25MB (compared to 200MB+ in traditional JVM/Electron apps).
- **Vercel Geist Design System:** Pixel-perfect ink `#171717` on `#fafafa` canvas with 1px hairlines and custom vector Lucide icons.
- **Cross-Platform:** Windows, macOS, Linux, and Android.

---

## 🛠️ Project Structure

```
├── singo-download-manager/
│   ├── src/                    # Frontend UI (React + TypeScript + Tailwind CSS)
│   │   ├── components/         # Download cards, sidebar, modal, local SVG icon loader
│   │   ├── types/              # Type-safe download telemetry schemas
│   │   └── App.tsx             # Main dashboard
│   ├── src-tauri/              # Rust Native Engine & Native Messaging Host
│   │   ├── src/engine/part.rs  # Dynamic part splitting algorithm
│   │   ├── src/engine/disk.rs  # Fast disk preallocation
│   │   └── src/bin/native_host.rs # Stdio Native Messaging host
│   └── public/icons/           # 1,500+ vector SVG icons
├── .github/workflows/          # Multi-platform automated CI/CD release workflow
└── DESIGN.md                   # Vercel Geist design tokens and guidelines
```

---

## 🚀 Building & Running

### Frontend
```bash
cd singo-download-manager
npm install
npm run dev
```

### Automated Multi-Platform Release (GitHub Actions)
Push any release tag (e.g. `v1.0.0`) to your GitHub repository to automatically trigger the `.github/workflows/release.yml` pipeline that builds, tests, and publishes signed release binaries for Windows, macOS, and Linux with SHA256 checksums.
