
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Angel One Investment Tracker</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<header class="top-header">
  <div>
    <h1>Angel One Investment Tracker</h1>
    <p>Investment &amp; Profit Management Dashboard</p>
  </div>
  <div class="date-display" id="todayDate"></div>
</header>

<section class="account-section">
  <div class="section-title"><h2>Account Details</h2></div>
  <div class="account-grid">
    <div class="account-card">
      <span>Full Name</span>
      <strong>Nilesh Vamarao Patil</strong>
    </div>
    <div class="account-card">
      <span>Client ID</span>
      <strong>AJAD1057</strong>
    </div>
    <div class="account-card">
      <span>PAN</span>
      <strong>CRPPP6734G</strong>
    </div>
  </div>
</section>

<main>
  <section class="dashboard-section">
    <div class="section-title">
      <h2>Financial Overview</h2>
      <p>Financial position and collection targets</p>
    </div>

    <div style="text-align:center;margin-bottom:25px">
      <a href="update.html"
         style="display:inline-block;padding:12px 24px;background:#2563eb;color:white;text-decoration:none;border-radius:8px;font-weight:600">
        + Update Today's Profit / Withdrawal
      </a>
    </div>

    <div class="summary-grid">
      <div class="summary-card capital-card">
        <span>Total Capital</span>
        <strong id="totalCapital">₹21,00,000</strong>
        <small>Original invested capital</small>
      </div>

      <div class="summary-card profit-card">
        <span>Current Profit</span>
        <strong id="currentProfit">Loading...</strong>
        <small>Based on saved financial records</small>
      </div>

      <div class="summary-card withdrawal-card">
        <span>Total Withdrawn</span>
        <strong id="totalWithdrawn">Loading...</strong>
        <small>Recorded withdrawals</small>
      </div>

      <div class="summary-card commission-card">
        <span>Total Commission</span>
        <strong id="totalCommission">Loading...</strong>
        <small>Commission on recorded withdrawals</small>
      </div>

      <div class="summary-card net-card">
        <span>Net Amount Received</span>
        <strong id="netReceived">Loading...</strong>
        <small>Recorded cash received</small>
      </div>

      <div class="summary-card today-card">
        <span>Today's P&amp;L</span>
        <strong id="todayProfit">Loading...</strong>
        <small>Today's recorded trading result</small>
      </div>
    </div>
  </section>

  <!-- COLLECTION TARGETS AS OF THE REPORTING DATE -->
  <section class="data-section">
    <div class="section-title">
      <h2>Collection Summary</h2>
      <p id="reportingDateLabel">Reporting date: 15 October 2026</p>
    </div>

    <div class="summary-grid">
      <div class="summary-card withdrawal-card">
        <span>September Collection Target</span>
        <strong id="septemberTarget">₹1,95,000</strong>
        <small>Four weekly targets of ₹40,000 plus ₹35,000 for the final week</small>
      </div>

      <div class="summary-card profit-card">
        <span>October Target to Date</span>
        <strong id="octoberTarget">Loading...</strong>
        <small>₹10,000 per eligible trading day through 15 October</small>
      </div>

      <div class="summary-card capital-card">
        <span>Target Collection to Date</span>
        <strong id="targetToDate">Loading...</strong>
        <small>September target plus October target to date</small>
      </div>
    </div>

    <p style="margin-top:16px;color:#64748b">
      These are target figures based on your collection rules. They are not
      confirmed withdrawals and are not added to the actual financial totals.
    </p>
  </section>

  <!-- FUTURE PLAN -->
  <section class="data-section">
    <div class="section-title">
      <h2>Upcoming Collection Plan</h2>
      <p>Future targets are displayed separately from present collections.</p>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Week</th>
            <th>Eligible Trading Days</th>
            <th>Planned Collection</th>
          </tr>
        </thead>
        <tbody id="futurePlanBody"></tbody>
      </table>
    </div>

    <p style="margin-top:12px;color:#64748b">
      Weekends and dates entered in the exchange-holiday list are excluded.
      Update the holiday list whenever an exchange holiday is announced.
    </p>
  </section>

  <!-- CAPITAL ALLOCATION -->
  <section class="allocation-section">
    <div class="section-title">
      <h2>Capital Allocation</h2>
      <p>₹21,00,000 Total Invested Capital</p>
    </div>

    <div class="allocation-group">
      <div class="group-header">
        <div><h3>Equity Indices</h3><span>NIFTY + SENSEX</span></div>
        <strong>₹8,00,000</strong>
      </div>
      <div class="allocation-items">
        <div class="allocation-item">
          <label>NIFTY</label>
          <div class="allocation-input">
            <input type="number" id="niftyPercent" value="50" min="0" max="100" onchange="updateAllocation()">
            <span>%</span>
          </div>
          <strong id="niftyAmount">₹4,00,000</strong>
        </div>
        <div class="allocation-item">
          <label>SENSEX</label>
          <div class="allocation-input">
            <input type="number" id="sensexPercent" value="50" min="0" max="100" onchange="updateAllocation()">
            <span>%</span>
          </div>
          <strong id="sensexAmount">₹4,00,000</strong>
        </div>
      </div>
    </div>

    <div class="allocation-group">
      <div class="group-header">
        <div><h3>Precious Metals</h3><span>GOLD + SILVER</span></div>
        <strong>₹8,00,000</strong>
      </div>
      <div class="allocation-items">
        <div class="allocation-item">
          <label>GOLD</label>
          <div class="allocation-input">
            <input type="number" id="goldPercent" value="50" min="0" max="100" onchange="updateAllocation()">
            <span>%</span>
          </div>
          <strong id="goldAmount">₹4,00,000</strong>
        </div>
        <div class="allocation-item">
          <label>SILVER</label>
          <div class="allocation-input">
            <input type="number" id="silverPercent" value="50" min="0" max="100" onchange="updateAllocation()">
            <span>%</span>
          </div>
          <strong id="silverAmount">₹4,00,000</strong>
        </div>
      </div>
    </div>

    <div class="allocation-group">
      <div class="group-header">
        <div>
          <h3>Other Commodities</h3>
          <span>CRUDE OIL, GOLD MINI, SILVER MINI, NATURAL GAS</span>
        </div>
        <strong>₹5,00,000</strong>
      </div>
      <div class="allocation-items">
        <div class="allocation-item">
          <label>CRUDE OIL</label>
          <div class="allocation-input">
            <input type="number" id="crudePercent" value="25" min="0" max="100" onchange="updateAllocation()">
            <span>%</span>
          </div>
          <strong id="crudeAmount">₹1,25,000</strong>
        </div>
        <div class="allocation-item">
          <label>GOLD MINI</label>
          <div class="allocation-input">
            <input type="number" id="goldMiniPercent" value="25" min="0" max="100" onchange="updateAllocation()">
            <span>%</span>
          </div>
          <strong id="goldMiniAmount">₹1,25,000</strong>
        </div>
        <div class="allocation-item">
          <label>SILVER MINI</label>
          <div class="allocation-input">
            <input type="number" id="silverMiniPercent" value="25" min="0" max="100" onchange="updateAllocation()">
            <span>%</span>
          </div>
          <strong id="silverMiniAmount">₹1,25,000</strong>
        </div>
        <div class="allocation-item">
          <label>NATURAL GAS</label>
          <div class="allocation-input">
            <input type="number" id="gasPercent" value="25" min="0" max="100" onchange="updateAllocation()">
            <span>%</span>
          </div>
          <strong id="gasAmount">₹1,25,000</strong>
        </div>
      </div>
    </div>
  </section>

  <!-- ACTUAL WITHDRAWALS -->
  <section class="data-section">
    <div class="section-title">
      <h2>Profit Withdrawal History</h2>
      <p>Actual records loaded from the database</p>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Withdrawal</th>
            <th>Commission</th>
            <th>Profit Amount</th>
            <th>Net Received</th>
          </tr>
        </thead>
        <tbody id="withdrawalTableBody">
          <tr><td colspan="5">Loading withdrawal records...</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="data-section">
    <div class="section-title">
      <h2>Daily Profit / Loss</h2>
      <p>Actual trading results loaded from the database</p>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Profit</th>
            <th>Loss</th>
            <th>Net P&amp;L</th>
          </tr>
        </thead>
        <tbody id="profitTableBody">
          <tr><td colspan="4">Loading daily results...</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="chart-section">
    <div class="section-title"><h2>Profit Performance</h2></div>
    <div class="chart-container"><canvas id="profitChart"></canvas></div>
  </section>
</main>

<footer>
  <p>Angel One Investment Tracker</p>
  <span>Personal Investment Record</span>
</footer>

<script>
  /*
   * REPORTING DATE
   * Keep fixed at 15 October 2026 for this update.
   * Set USE_LIVE_DATE to true later to follow the current date automatically.
   */
  const USE_LIVE_DATE = false;
  const FIXED_REPORTING_DATE = "2026-10-15";

  /*
   * Add official exchange holidays as YYYY-MM-DD.
   * 2 October 2026 is included as Gandhi Jayanti.
   * Verify the full exchange holiday calendar before relying on the targets.
   */
  const EXCHANGE_HOLIDAYS = ["2026-10-02"];

  const SEPTEMBER_TARGET = 195000;
  const DAILY_TARGET = 10000;
  const OCTOBER_START = "2026-10-01";
  const PLAN_WEEKS_AHEAD = 8;

  const money = n => "₹" + Number(n || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 0
  });

  function isoDate(date) {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0")
    ].join("-");
  }

  function parseDate(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  function isTradingDay(date) {
    const weekday = date.getDay();
    return weekday !== 0 &&
           weekday !== 6 &&
           !EXCHANGE_HOLIDAYS.includes(isoDate(date));
  }

  function countTradingDays(startISO, endISO) {
    let count = 0;
    const day = parseDate(startISO);
    const end = parseDate(endISO);

    while (day <= end) {
      if (isTradingDay(day)) count++;
      day.setDate(day.getDate() + 1);
    }
    return count;
  }

  function getReportingDate() {
    return USE_LIVE_DATE ? new Date() : parseDate(FIXED_REPORTING_DATE);
  }

  function renderCollectionSummary() {
    const reportDate = getReportingDate();
    const reportISO = isoDate(reportDate);

    document.getElementById("todayDate").textContent =
      reportDate.toLocaleDateString("en-IN", {
        day: "2-digit", month: "short", year: "numeric"
      });

    document.getElementById("reportingDateLabel").textContent =
      "Reporting date: " + reportDate.toLocaleDateString("en-IN", {
        day: "2-digit", month: "long", year: "numeric"
      });

    const octoberEnd = reportISO < OCTOBER_START ? null : reportISO;
    const octoberDays = octoberEnd
      ? countTradingDays(OCTOBER_START, octoberEnd)
      : 0;

    const octoberTarget = octoberDays * DAILY_TARGET;
    document.getElementById("septemberTarget").textContent = money(SEPTEMBER_TARGET);
    document.getElementById("octoberTarget").textContent = money(octoberTarget);
    document.getElementById("targetToDate").textContent =
      money(SEPTEMBER_TARGET + octoberTarget);

    renderFuturePlan(reportDate);
  }

  function renderFuturePlan(reportDate) {
    const body = document.getElementById("futurePlanBody");
    body.replaceChildren();

    // Start with the next calendar day. No future target is included in totals.
    const start = new Date(reportDate);
    start.setDate(start.getDate() + 1);

    // Move to the next Monday.
    while (start.getDay() !== 1) {
      start.setDate(start.getDate() + 1);
    }

    for (let week = 0; week < PLAN_WEEKS_AHEAD; week++) {
      const monday = new Date(start);
      monday.setDate(start.getDate() + week * 7);

      const friday = new Date(monday);
      friday.setDate(monday.getDate() + 4);

      const tradingDays = countTradingDays(isoDate(monday), isoDate(friday));
      const tr = document.createElement("tr");

      const weekLabel =
        monday.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) +
        " – " +
        friday.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

      [weekLabel, String(tradingDays), money(tradingDays * DAILY_TARGET)]
        .forEach(value => {
          const td = document.createElement("td");
          td.textContent = value;
          tr.appendChild(td);
        });

      body.appendChild(tr);
    }
  }

  function updateAllocation() {
    const percent = id => Math.max(0, Math.min(100,
      Number(document.getElementById(id).value) || 0));

    document.getElementById("niftyAmount").textContent = money(800000 * percent("niftyPercent") / 100);
    document.getElementById("sensexAmount").textContent = money(800000 * percent("sensexPercent") / 100);
    document.getElementById("goldAmount").textContent = money(800000 * percent("goldPercent") / 100);
    document.getElementById("silverAmount").textContent = money(800000 * percent("silverPercent") / 100);
    document.getElementById("crudeAmount").textContent = money(500000 * percent("crudePercent") / 100);
    document.getElementById("goldMiniAmount").textContent = money(500000 * percent("goldMiniPercent") / 100);
    document.getElementById("silverMiniAmount").textContent = money(500000 * percent("silverMiniPercent") / 100);
    document.getElementById("gasAmount").textContent = money(500000 * percent("gasPercent") / 100);
  }

  renderCollectionSummary();
  updateAllocation();
</script>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="script.js"></script>
</body>
</html>
