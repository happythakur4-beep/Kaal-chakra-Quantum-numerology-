import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Download, 
  Terminal, 
  Layers, 
  Check, 
  Copy, 
  Play, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  Flame,
  Radio,
  FileCode
} from 'lucide-react';
import { cosmicAudio } from '../utils/audioSynthesizer';
import { motion, AnimatePresence } from 'motion/react';

interface AndroidExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AndroidExportModal({ isOpen, onClose }: AndroidExportModalProps) {
  const [activeTab, setActiveTab] = useState<'pwa' | 'capacitor' | 'twa'>('pwa');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    cosmicAudio.playTone(600, 0.05);
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const capacitorCommands = `npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "Kaal Chakra" "com.kaalchakra.astrology" --web-dir dist
npm run build
npx cap add android
npx cap open android`;

  const androidManifestSnippet = `<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.kaalchakra.astrology">
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <application
        android:label="Kaal Chakra"
        android:icon="@mipmap/ic_launcher"
        android:theme="@style/AppTheme.NoActionBar"
        android:usesCleartextTraffic="true">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:screenOrientation="portrait"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-2xl bg-[#0c0a17] border border-[#d4af37]/40 rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.2)] overflow-hidden my-auto"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-950/40 via-[#18142a] to-amber-950/40 border-b border-[#d4af37]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-[0_0_15px_rgba(212,175,55,0.3)] flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-200">
                Kaal Chakra for Android
              </h3>
              <p className="text-xs text-gray-400 font-sans">
                Native APK Build & 1-Tap Mobile Installation Matrix
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              cosmicAudio.playTone(300, 0.05);
              onClose();
            }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#d4af37]/20 bg-[#08070e] px-4 pt-2 gap-2">
          <button
            onClick={() => {
              cosmicAudio.playTone(432, 0.04);
              setActiveTab('pwa');
            }}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-cinzel font-semibold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
              activeTab === 'pwa'
                ? 'border-[#d4af37] text-amber-300 bg-amber-500/10 rounded-t-lg'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>1-Tap Install (PWA)</span>
          </button>

          <button
            onClick={() => {
              cosmicAudio.playTone(432, 0.04);
              setActiveTab('capacitor');
            }}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-cinzel font-semibold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
              activeTab === 'capacitor'
                ? 'border-[#d4af37] text-amber-300 bg-amber-500/10 rounded-t-lg'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Capacitor APK Export</span>
          </button>

          <button
            onClick={() => {
              cosmicAudio.playTone(432, 0.04);
              setActiveTab('twa');
            }}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-cinzel font-semibold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
              activeTab === 'twa'
                ? 'border-[#d4af37] text-amber-300 bg-amber-500/10 rounded-t-lg'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Play Store (TWA)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[68vh] overflow-y-auto custom-scrollbar">
          {activeTab === 'pwa' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-transparent border border-[#d4af37]/30">
                <div className="flex items-center gap-2 text-amber-300 font-cinzel font-bold text-sm mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Instant Installation on Any Android Phone</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Kaal Chakra is pre-configured with a Web App Manifest, Service Worker offline cache, and Android launcher icons. It installs directly as a standalone Android app without browser URL bars.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">1</div>
                  <h4 className="text-xs font-bold text-gray-200">Open in Chrome</h4>
                  <p className="text-[11px] text-gray-400">Open this app's URL in Google Chrome or any Chromium Android browser.</p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">2</div>
                  <h4 className="text-xs font-bold text-gray-200">Tap Menu (⋮)</h4>
                  <p className="text-[11px] text-gray-400">Tap the three vertical dots in Chrome or tap the "Install" bottom banner.</p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">3</div>
                  <h4 className="text-xs font-bold text-gray-200">"Install App"</h4>
                  <p className="text-[11px] text-gray-400">Select "Install Kaal Chakra" or "Add to Home screen" to launch from your app drawer.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Supports Android 12/13/14/15 edge-to-edge UI & splash screen</span>
                </div>
                <span className="text-emerald-400 font-semibold text-[11px]">Ready</span>
              </div>
            </div>
          )}

          {activeTab === 'capacitor' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-[#d4af37]/30">
                <p className="text-xs text-gray-300">
                  Export this project to a native Android Studio project using Capacitor to compile signed <code className="text-amber-300 font-mono">.apk</code> or <code className="text-amber-300 font-mono">.aab</code> release bundles.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-cinzel text-amber-300 font-bold">Terminal Build Commands</span>
                  <button
                    onClick={() => copyToClipboard(capacitorCommands, 'cap')}
                    className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedCode === 'cap' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode === 'cap' ? 'Copied' : 'Copy Commands'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-black/60 border border-white/10 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed">
                  {capacitorCommands}
                </pre>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs text-gray-300">
                <h5 className="font-bold text-amber-300 font-cinzel">Configuration Created:</h5>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-gray-400">
                  <li><code className="text-amber-200">capacitor.config.json</code> is pre-configured with package <code className="text-amber-200">com.kaalchakra.astrology</code>.</li>
                  <li>In Android Studio, click <strong>Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</strong>.</li>
                  <li>The output APK will be saved at <code className="text-amber-200">android/app/build/outputs/apk/debug/app-debug.apk</code>.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'twa' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-gray-300 leading-relaxed">
                Publish directly to the Google Play Store using <strong>Bubblewrap (Google's official Trusted Web Activity CLI)</strong> for high performance and automatic Play Store updates.
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-cinzel text-amber-300 font-bold">AndroidManifest.xml Template</span>
                  <button
                    onClick={() => copyToClipboard(androidManifestSnippet, 'manifest')}
                    className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedCode === 'manifest' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode === 'manifest' ? 'Copied' : 'Copy XML'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-black/60 border border-white/10 text-amber-300 font-mono text-[11px] overflow-x-auto max-h-48 leading-tight">
                  {androidManifestSnippet}
                </pre>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs text-gray-300">
                <span className="font-bold text-amber-300 font-cinzel">Play Store Deployment:</span>
                <p className="text-[11px] text-gray-400">
                  Run <code className="text-amber-200">npx @bubblewrap/cli init --manifest=https://.../manifest.json</code> to generate your Google Play Store ready Android app bundle (.aab).
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#08070e] border-t border-[#d4af37]/20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-400 font-sans">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>Package ID: <code className="text-amber-300 font-mono">com.kaalchakra.astrology</code></span>
          </div>
          <button
            onClick={() => {
              cosmicAudio.playTone(300, 0.05);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b45309] text-gray-950 font-cinzel font-bold text-xs hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
}
