// Ticker → company domain, for the Google favicon logo API. Shared by the
// light tiles and the classic dashboard (single source of truth).
export const TICKER_DOMAINS: Record<string, string> = {
  // Software & Cyber themes (added 2026-07-24) + backfill of missing logos
  CHKP: 'checkpoint.com',  CRM:  'salesforce.com',   CSCO: 'cisco.com',
  DDOG: 'datadoghq.com',   DOCN: 'digitalocean.com', FRSH: 'freshworks.com',
  FTNT: 'fortinet.com',    GEN:  'gendigital.com',   GTLB: 'gitlab.com',
  HUBS: 'hubspot.com',     NOW:  'servicenow.com',   NTNX: 'nutanix.com',
  NTSK: 'netskope.com',    OKTA: 'okta.com',         QLYS: 'qualys.com',
  RBRK: 'rubrik.com',      RDWR: 'radware.com',      S:    'sentinelone.com',
  SNOW: 'snowflake.com',   TENB: 'tenable.com',      TWLO: 'twilio.com',
  VRNS: 'varonis.com',     ZS:   'zscaler.com',      ATEN: 'a10networks.com',
  BRZE: 'braze.com',       WK:   'workiva.com',      XMTR: 'xometry.com',
  AIR:  'airbus.com',      ATI:  'atimaterials.com', BMNR: 'bitminetech.io',
  CW:   'curtisswright.com', DIOD: 'diodes.com',     IESC: 'ies-co.com',
  LSCC: 'latticesemi.com', ORA:  'ormat.com',        SPCX: 'spacex.com',
  TER:  'teradyne.com',    WULF: 'terawulf.com',
  // Semiconductors & chip design
  NVDA: 'nvidia.com',    AVGO: 'broadcom.com',       AMD:  'amd.com',
  INTC: 'intel.com',     MU:   'micron.com',          TXN:  'ti.com',
  ADI:  'analog.com',    MCHP: 'microchip.com',       ON:   'onsemi.com',
  MPWR: 'monolithicpower.com', MTSI: 'macom.com',     SWKS: 'skyworks.com',
  MXL:  'maxlinear.com', LRCX: 'lamresearch.com',     AMAT: 'appliedmaterials.com',
  KLAC: 'kla.com',       QCOM: 'qualcomm.com',        SNPS: 'synopsys.com',
  // AI & Cloud infrastructure
  CRWV: 'coreweave.com', ALAB: 'asteralabs.com',      ANET: 'arista.com',
  PLTR: 'palantir.com',  CRDO: 'credotech.com',       CLS:  'celestica.com',
  // Mega-cap tech
  GOOGL: 'google.com',   MSFT: 'microsoft.com',       AAPL: 'apple.com',
  AMZN: 'amazon.com',    META: 'meta.com',             TSLA: 'tesla.com',
  // Storage & memory
  WDC:  'westerndigital.com', STX: 'seagate.com',
  // Electrification & energy
  POWL: 'powellind.com', PWR:  'quantaservices.com',  BELFB: 'belfuse.com',
  BE:   'bloomenergy.com', HUBB: 'hubbell.com',        AEIS: 'advanced-energy.com',
  SEDG: 'solaredge.com', ENPH: 'enphase.com',         ITRI: 'itron.com',
  ETN:  'eaton.com',     GEV:  'gevernova.com',        NEE:  'nexteraenergy.com',
  // Industrials & construction
  STRL: 'sterlinginfrastructure.com', FIX: 'comfortsystemsusa.com',
  AGX:  'argan.com',     MTZ:  'mastec.com',           DY:   'dycomind.com',
  CLH:  'cleanharbors.com', GVA: 'graniteconstruction.com', R: 'ryder.com',
  ECG:  'everus.com',    SPXC: 'spx.com',             KRMN: 'karman.space',
  // Additional tech & cloud
  DELL: 'dell.com',     AKAM: 'akamai.com',           HPE:  'hpe.com',
  GOOG: 'google.com',   SNDK: 'sandisk.com',           MRVL: 'marvell.com',
  RKLB: 'rocketlabusa.com', SATS: 'echostar.com',     ARM:  'arm.com',
  OHB:  'ohb.de',       PL:   'planet.com',            VICR: 'vicr.com',
  // Energy & utilities
  OGE:  'oge.com',      ET:   'energytransfer.com',   ETR:  'entergy.com',
  VRT:  'vertiv.com',   NVT:  'nvent.com',
  // Industrial services
  TTMI: 'ttm.com',      EME:  'emcorgroup.com',       SAIA: 'saia.com',
  CHRW: 'chrobinson.com', JBL: 'jabil.com',
  // Legacy map entries (kept for any residual references)
  GE:   'ge.com',        RTX:  'rtx.com',             HON:  'honeywell.com',
  CAT:  'caterpillar.com', DE:  'deere.com',           LMT:  'lockheedmartin.com',
  UPS:  'ups.com',       NOC:  'northropgrumman.com',  EMR:  'emerson.com',
  // Meme theme (space, quantum, AI-infra and high-momentum retail names)
  ASTS: 'ast-science.com', RDW:  'redwirespace.com',   AAOI: 'ao-inc.com',
  LUNR: 'intuitivemachines.com', IREN: 'iren.com',     NBIS: 'nebius.com',
  QBTS: 'dwavequantum.com', ONDS: 'ondas.com',         APLD: 'applieddigital.com',
  IONQ: 'ionq.com',      TE:   't1energy.com',         AXTI: 'axt.com',
  NVTS: 'navitassemi.com', WOLF: 'wolfspeed.com',
  // Non-US listings
  PRY:  'prysmian.com',  TSM:  'tsmc.com',        LIN:  'linde.com',
  ASML: 'asml.com',
  // Semiconductors & photonics
  NXPI: 'nxp.com',       COHR: 'coherent.com',    LITE: 'lumentum.com',
  RMBS: 'rambus.com',    CDNS: 'cadence.com',
  // Software & cloud
  ORCL: 'oracle.com',    PANW: 'paloaltonetworks.com', SHOP: 'shopify.com',
  CRWD: 'crowdstrike.com',  NET: 'cloudflare.com',
  // Industrials & power
  AEP:  'aep.com',       XEL:  'xcelenergy.com',  UNP:  'up.com',
  GD:   'gd.com',        TKR:  'timken.com',       GTES: 'gates.com',
  MOD:  'modine.com',    AIT:  'applied.com',      APH:  'amphenol.com',
  CGNX: 'cognex.com',
  HWM:  'howmet.com',    BWXT: 'bwxt.com',         KTOS: 'kratosdefense.com',
  HII:  'hii.com',       RBC:  'rbcbearings.com',  MRCY: 'mrcy.com',
  DRS:  'leonardodrs.com', TPC: 'tutorperini.com',
  // Energy & utilities (additional)
  CEG:  'constellationenergy.com', NRG: 'nrg.com', WMB: 'williams.com',
  SU:   'se.com',
  // Clean energy
  BLDP: 'ballard.com',   SHLS: 'shoals.com',
  // Space & energy
  SPCE: 'virgingalactic.com', OKLO: 'oklo.com',   HYLN: 'hyliion.com',
  CIFR: 'ciphermining.com',   RGTI: 'rigetti.com',
};

/** Google favicon URL for a ticker, or null if we have no domain for it. */
export function logoUrl(ticker: string): string | null {
  const domain = TICKER_DOMAINS[ticker];
  return domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : null;
}
