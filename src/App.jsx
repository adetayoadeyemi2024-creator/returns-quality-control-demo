import React, { useState } from "react";

export default function App() {
  const [orderId, setOrderId] = useState("ORD-24198");
  const [customerName, setCustomerName] = useState("Tayo Adeyemi");
  const [productType, setProductType] = useState("Fashion");
  const [issueType, setIssueType] = useState("Defective item");
  const [videoName, setVideoName] = useState("");
  const [decision, setDecision] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [currentCheckIndex, setCurrentCheckIndex] = useState(0);

  const analysisChecks = [
    "🔍 Scanning video frames...",
    "🏷 Detecting tags and packaging...",
    "📦 Matching product with catalog...",
    "⚠ Checking for wear and damage...",
    "🧠 Calculating fraud risk score..."
  ];

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoName(file.name);
      setDecision(null);
      setStep(2);
    }
  };

  const runAnalysis = () => {
    setLoading(true);
    setDecision(null);
    setCurrentCheckIndex(0);

    let i = 0;

    const interval = setInterval(() => {
      i++;
      setCurrentCheckIndex(i);

      if (i === analysisChecks.length - 1) {
        clearInterval(interval);

        setTimeout(() => {
          let result;

          if (issueType === "Defective item") {
            result = {
              status: "Manual Review",
              color: "#b45309",
              bg: "#fff7ed",
              border: "#fdba74",
              risk: "Medium",
              confidence: "78%",
              summary:
                "Defect claim needs a human check because the visible evidence is inconclusive.",
              action: "Route to review team before refund approval.",
              reasons: [
                "Defect area visible but unclear",
                "Product match likely",
                "No strong evidence of misuse"
              ]
            };
          } else if (issueType === "Item arrived damaged") {
            result = {
              status: "Approved",
              color: "#15803d",
              bg: "#f0fdf4",
              border: "#86efac",
              risk: "Low",
              confidence: "91%",
              summary:
                "The video supports the reported damage and no obvious policy violation was detected.",
              action: "Approve refund and issue prepaid return label.",
              reasons: [
                "Damage visible on camera",
                "Packaging context supports claim",
                "Low fraud risk detected"
              ]
            };
          } else if (issueType === "Wrong item received") {
            result = {
              status: "Manual Review",
              color: "#b45309",
              bg: "#fff7ed",
              border: "#fdba74",
              risk: "Medium",
              confidence: "74%",
              summary:
                "The returned item may not match the original order details. Manual verification recommended.",
              action: "Cross-check order images and SKU history.",
              reasons: [
                "Possible mismatch with order record",
                "Visual evidence not conclusive",
                "Review recommended before refund"
              ]
            };
          } else {
            result = {
              status: "Denied",
              color: "#b91c1c",
              bg: "#fef2f2",
              border: "#fca5a5",
              risk: "High",
              confidence: "87%",
              summary:
                "Potential policy violation detected. Claim reason does not align with visible item condition.",
              action: "Reject instant refund and provide policy explanation.",
              reasons: [
                "No visible defect detected",
                "Return reason conflicts with condition shown",
                "High policy-abuse likelihood"
              ]
            };
          }

          setDecision(result);
          setLoading(false);
          setStep(3);
        }, 800);
      }
    }, 500);
  };

  const resetDemo = () => {
    setVideoName("");
    setDecision(null);
    setLoading(false);
    setStep(1);
    setCurrentCheckIndex(0);
    setOrderId("ORD-24198");
    setCustomerName("Tayo Adeyemi");
    setProductType("Fashion");
    setIssueType("Defective item");
  };

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.header}>
          <div>
            <div style={styles.badge}>Prototype Demo</div>
            <h1 style={styles.title}>Returns Quality Control API</h1>
            <p style={styles.subtitle}>
              Pre-return video verification for e-commerce brands to reduce
              fraud before refunds are approved.
            </p>
          </div>
          <div style={styles.logoBox}>RQ</div>
        </div>

        <div style={styles.stepRow}>
          {["Return Started", "Evidence Analysed", "Decision Generated"].map(
            (label, i) => (
              <div
                key={label}
                style={{
                  ...styles.stepCard,
                  ...(step >= i + 1 ? styles.stepCardActive : {})
                }}
              >
                <div style={styles.stepNumber}>Step {i + 1}</div>
                <div style={styles.stepLabel}>{label}</div>
              </div>
            )
          )}
        </div>

        <div style={styles.mainGrid}>
          <div style={styles.leftColumn}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitleDark}>Return submission</h2>
                <span style={styles.pill}>Customer-facing flow</span>
              </div>

              <div style={styles.formGrid}>
                <div>
                  <label style={styles.label}>Order ID</label>
                  <input
                    style={styles.input}
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </div>

                <div>
                  <label style={styles.label}>Customer name</label>
                  <input
                    style={styles.input}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>

                <div>
                  <label style={styles.label}>Product category</label>
                  <select
                    style={styles.input}
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                  >
                    <option>Fashion</option>
                    <option>Electronics</option>
                    <option>Homeware</option>
                  </select>
                </div>

                <div>
                  <label style={styles.label}>Claimed issue</label>
                  <select
                    style={styles.input}
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                  >
                    <option>Defective item</option>
                    <option>Item arrived damaged</option>
                    <option>Wrong item received</option>
                    <option>Changed mind</option>
                  </select>
                </div>
              </div>

              <div style={styles.instructionsBox}>
                <div style={styles.instructionsTitle}>Guided video prompt</div>
                <ul style={styles.list}>
                  <li>Show front, back, and side angles</li>
                  <li>Hold tags or packaging in frame for 3 seconds</li>
                  <li>Zoom in on the claimed defect or damage</li>
                  <li>Record in bright lighting without filters</li>
                </ul>
              </div>

              <div style={styles.uploadBox}>
                <label style={styles.uploadLabel}>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleUpload}
                    style={{ display: "none" }}
                  />
                  <div style={styles.uploadTitle}>Upload return video</div>
                  <div style={styles.uploadSub}>
                    Tap to choose a video file for inspection
                  </div>
                  {videoName && (
                    <div style={styles.fileTag}>Selected: {videoName}</div>
                  )}
                </label>
              </div>

              <div style={styles.buttonRow}>
                <button
                  onClick={runAnalysis}
                  disabled={!videoName || loading}
                  style={{
                    ...styles.primaryButton,
                    opacity: !videoName || loading ? 0.5 : 1,
                    cursor: !videoName || loading ? "not-allowed" : "pointer"
                  }}
                >
                  {loading ? "Analysing return..." : "Run verification"}
                </button>

                <button onClick={resetDemo} style={styles.secondaryButton}>
                  Reset demo
                </button>
              </div>

              {loading && (
                <div style={styles.analysisPanel}>
                  <div style={styles.analysisTitle}>Analysis in progress</div>
                  {analysisChecks.map((item, index) => (
                    <div
                      key={item}
                      style={{
                        ...styles.analysisLine,
                        opacity: index <= currentCheckIndex ? 1 : 0.3
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={styles.rightColumn}>
            <div style={styles.card}>
              <h2 style={styles.cardTitleDark}>Decision panel</h2>
              {!decision && !loading && (
                <div style={styles.emptyState}>
                  Upload a video and run verification to generate a decision.
                </div>
              )}

              {decision && (
                <div
                  style={{
                    ...styles.decisionBox,
                    background: decision.bg,
                    borderColor: decision.border
                  }}
                >
                  <div style={{ ...styles.decisionStatus, color: decision.color }}>
                    {decision.status}
                  </div>

                  <div style={styles.riskLine}>
                    Fraud risk: <strong>{decision.risk}</strong>
                  </div>
                  <div style={styles.riskLine}>
                    Confidence score: <strong>{decision.confidence}</strong>
                  </div>

                  <p style={styles.decisionText}>{decision.summary}</p>

                  <div style={styles.reasonBox}>
                    <div style={styles.actionLabel}>Reasoning breakdown</div>
                    {decision.reasons.map((reason) => (
                      <div key={reason} style={styles.reasonItem}>
                        • {reason}
                      </div>
                    ))}
                  </div>

                  <div style={styles.actionBox}>
                    <div style={styles.actionLabel}>Recommended action</div>
                    <div>{decision.action}</div>
                  </div>
                </div>
              )}
            </div>

            <div style={styles.card}>
              <h2 style={styles.cardTitleDark}>Ops dashboard snapshot</h2>
              <div style={styles.metricsGrid}>
                <div style={styles.metricCard}>
                  <div style={styles.metricLabel}>Fraud flagged</div>
                  <div style={styles.metricValue}>17%</div>
                </div>
                <div style={styles.metricCard}>
                  <div style={styles.metricLabel}>Manual reviews</div>
                  <div style={styles.metricValue}>5%</div>
                </div>
                <div style={styles.metricCard}>
                  <div style={styles.metricLabel}>Avg decision time</div>
                  <div style={styles.metricValue}>23s</div>
                </div>
                <div style={styles.metricCard}>
                  <div style={styles.metricLabel}>Estimated savings</div>
                  <div style={styles.metricValue}>£4,280</div>
                </div>
              </div>
            </div>

            <div style={styles.pitchBox}>
              <div style={styles.pitchTitle}>Pitch line</div>
              <p style={styles.pitchText}>
                We help brands stop fraudulent or non-compliant returns before
                shipping, warehousing, and refund costs are incurred.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f4f6",
    padding: "32px 20px",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: "#111827"
  },
  shell: {
    maxWidth: "1200px",
    margin: "0 auto"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "24px",
    flexWrap: "wrap"
  },
  badge: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: "999px",
    background: "#e5e7eb",
    fontSize: "12px",
    fontWeight: 600,
    marginBottom: "12px",
    color: "#111827"
  },
  title: {
    fontSize: "38px",
    lineHeight: 1.1,
    margin: 0,
    color: "#111827"
  },
  subtitle: {
    marginTop: "12px",
    maxWidth: "760px",
    color: "#4b5563",
    fontSize: "16px",
    lineHeight: 1.6
  },
  logoBox: {
    width: "64px",
    height: "64px",
    borderRadius: "18px",
    background: "#111827",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "22px"
  },
  stepRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
    marginBottom: "20px"
  },
  stepCard: {
    border: "1.5px solid #d1d5db",
    borderRadius: "14px",
    background: "white",
    padding: "14px"
  },
  stepCardActive: {
    border: "1.5px solid #111827",
    background: "#f9fafb"
  },
  stepNumber: {
    fontSize: "12px",
    color: "#6b7280",
    marginBottom: "6px"
  },
  stepLabel: {
    fontWeight: 600,
    color: "#111827"
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: "20px"
  },
  leftColumn: {
    minWidth: 0
  },
  rightColumn: {
    minWidth: 0,
    display: "grid",
    gap: "20px",
    alignSelf: "start"
  },
  card: {
    background: "white",
    borderRadius: "20px",
    padding: "22px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
    border: "1px solid #e5e7eb"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    alignItems: "center",
    marginBottom: "18px",
    flexWrap: "wrap"
  },
  cardTitleDark: {
    margin: 0,
    fontSize: "22px",
    color: "#111827",
    fontWeight: 700
  },
  pill: {
    fontSize: "12px",
    padding: "6px 10px",
    borderRadius: "999px",
    background: "#f3f4f6",
    color: "#374151",
    fontWeight: 600
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "14px",
    marginBottom: "18px"
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "13px",
    color: "#374151",
    fontWeight: 600
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    background: "#ffffff",
    color: "#111827",
    outline: "none"
  },
  instructionsBox: {
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
    borderRadius: "16px",
    padding: "16px",
    marginBottom: "18px"
  },
  instructionsTitle: {
    fontWeight: 700,
    marginBottom: "10px",
    color: "#111827"
  },
  list: {
    margin: 0,
    paddingLeft: "20px",
    color: "#4b5563",
    lineHeight: 1.8
  },
  uploadBox: {
    marginBottom: "18px"
  },
  uploadLabel: {
    display: "block",
    border: "2px dashed #cbd5e1",
    borderRadius: "18px",
    background: "#ffffff",
    padding: "32px 18px",
    textAlign: "center",
    cursor: "pointer"
  },
  uploadTitle: {
    fontSize: "18px",
    fontWeight: 700,
    marginBottom: "8px",
    color: "#111827"
  },
  uploadSub: {
    color: "#6b7280",
    fontSize: "14px"
  },
  fileTag: {
    marginTop: "14px",
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: "999px",
    background: "#eef2ff",
    color: "#3730a3",
    fontSize: "13px",
    fontWeight: 600
  },
  buttonRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap"
  },
  primaryButton: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "12px",
    background: "#111827",
    color: "white",
    fontWeight: 700,
    fontSize: "14px"
  },
  secondaryButton: {
    padding: "12px 18px",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    background: "white",
    color: "#111827",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer"
  },
  analysisPanel: {
    marginTop: "18px",
    background: "#111827",
    color: "white",
    borderRadius: "16px",
    padding: "16px"
  },
  analysisTitle: {
    fontWeight: 700,
    marginBottom: "10px",
    color: "#ffffff"
  },
  analysisLine: {
    color: "#d1d5db",
    marginBottom: "8px",
    fontSize: "14px",
    transition: "opacity 0.25s ease"
  },
  emptyState: {
    padding: "18px",
    borderRadius: "16px",
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    color: "#6b7280"
  },
  decisionBox: {
    border: "1px solid",
    borderRadius: "18px",
    padding: "18px"
  },
  decisionStatus: {
    fontSize: "28px",
    fontWeight: 800,
    marginBottom: "10px"
  },
  riskLine: {
    fontSize: "14px",
    marginBottom: "10px",
    color: "#374151"
  },
  decisionText: {
    color: "#374151",
    lineHeight: 1.7
  },
  reasonBox: {
    marginTop: "14px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.75)",
    padding: "14px",
    border: "1px solid rgba(255,255,255,0.8)"
  },
  reasonItem: {
    color: "#374151",
    marginTop: "8px",
    fontSize: "14px",
    lineHeight: 1.6
  },
  actionBox: {
    marginTop: "14px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.75)",
    padding: "14px",
    border: "1px solid rgba(255,255,255,0.8)"
  },
  actionLabel: {
    fontSize: "12px",
    color: "#6b7280",
    marginBottom: "6px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px"
  },
  metricCard: {
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
    borderRadius: "16px",
    padding: "16px"
  },
  metricLabel: {
    fontSize: "12px",
    color: "#6b7280",
    marginBottom: "8px"
  },
  metricValue: {
    fontSize: "28px",
    fontWeight: 800,
    color: "#111827"
  },
  pitchBox: {
    background: "#111827",
    color: "white",
    borderRadius: "20px",
    padding: "22px"
  },
  pitchTitle: {
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#9ca3af",
    marginBottom: "10px",
    fontWeight: 700
  },
  pitchText: {
    margin: 0,
    lineHeight: 1.8,
    color: "#e5e7eb"
  }
};