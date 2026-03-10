// src/types/next-pwa.d.ts
declare module "next-pwa" {
  import type { NextConfig } from "next";

  interface PWAConfig {
    dest: string; // direktori untuk service worker (biasanya 'public')
    register?: boolean; // daftar service worker secara automatik
    skipWaiting?: boolean; // aktifkan service worker baru dengan segera
    disable?: boolean | ((nextConfig: NextConfig) => boolean); // matikan PWA dalam mod pembangunan
    runtimeCaching?: any[]; // konfigurasi caching lanjutan (optional)
  }

  function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig;

  export default withPWA;
}
