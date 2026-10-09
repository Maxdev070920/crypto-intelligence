/**
 * Single source of truth for the current release shown on the website.
 * Keep `version` in sync with the desktop app's package.json and fill in the
 * checksums from `release/<version>/*.sha256` after running `npm run dist:all`.
 *
 * Download URLs follow the GitHub Releases asset convention used by
 * electron-builder's publish configuration. Until the release is uploaded the
 * links resolve to the releases page rather than a broken asset.
 */
const OWNER_REPO = 'Maxdev070920/crypto-intelligence'
const VERSION = '0.1.0'
/** Git tag of the GitHub release that holds the assets. */
const RELEASE_TAG = 'desktop_1.0.0'
/** Set to true once the assets for VERSION have been uploaded to GitHub Releases. */
const ASSETS_PUBLISHED = true

const releasesUrl = `https://github.com/${OWNER_REPO}/releases`
const assetUrl = (file: string) => (ASSETS_PUBLISHED ? `https://github.com/${OWNER_REPO}/releases/download/${RELEASE_TAG}/${file}` : releasesUrl)

export interface Artifact {
  kind: 'installer' | 'portable'
  label: string
  fileName: string
  downloadUrl: string
  /** Approximate size, shown for orientation. */
  sizeLabel: string
  /** SHA-256 of the file (from release/<version>/<file>.sha256). */
  sha256: string
  description: string
  notes: string[]
}

export const release = {
  version: VERSION,
  date: '2026-09-14',
  releasesUrl,
  assetsPublished: ASSETS_PUBLISHED,
  requirements: ['Windows 10 or Windows 11 (64-bit)', 'Internet connection for live market data', 'About 300 MB of disk space (installer) or 400 MB free where the portable version runs'],
  installer: {
    kind: 'installer',
    label: 'Windows Installer',
    fileName: 'bundle-Setup.exe',
    downloadUrl: assetUrl('bundle-Setup.exe'),
    sizeLabel: '~110 MB',
    sha256: '53092523e697c74250f8cf490bca2fa0ac8b6f076372ea3d80bf3a19ff6db9a1',
    description: 'Installs Crypto Intelligence in the normal per-user Windows application location with Start-menu and desktop shortcuts.',
    notes: ['Recommended for everyday use', 'Data is stored in your Windows user profile', 'Supports in-app update checks']
  } satisfies Artifact,
  portable: {
    kind: 'portable',
    label: 'Windows Portable',
    fileName: 'bundle-portable.exe',
    downloadUrl: assetUrl('bundle-portable.exe'),
    sizeLabel: '~110 MB',
    sha256: '7b36f2182c6502f193df466b11f9b1afee1939efe9ef0ddbe2dde11e2efbeda3',
    description: 'Run Crypto Intelligence directly without installing it. Your data is stored in a "Crypto Intelligence Data" folder next to the executable.',
    notes: ['No installation wizard, no administrator rights', 'Copy the .exe and its data folder together to move it', 'Updates: download the new portable .exe and replace the old one']
  } satisfies Artifact
}

