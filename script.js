// ==========================================
// ANGEL ONE INVESTMENT TRACKER
// ==========================================

const TOTAL_CAPITAL = 2100000;


// ==========================================
// INITIAL WITHDRAWAL RECORDS
// ==========================================

let withdrawals = [
    {
        date: "2026-09-01",
        amount: 15000,
        commission: 2670
    },
    {
        date: "2026-09-02",
        amount: 10000,
        commission: 1780
    },
    {
        date: "2026-09-07",
        amount: 15000,
        commission: 2670
    }
];


// ==========================================
// DAILY PROFIT RECORDS
// ==========================================

let profits = [];


// ==========================================
// CURRENCY FORMAT
// ==========================================

function formatCurrency(amount) {

    return "₹" + Number(amount).toLocaleString("en-IN", {
        maximumFractionDigits: 0
    });

}


// ==========================================
// DATE FORMAT
// ==========================================

function formatDate(dateString) {

    const date = new Date(dateString + "T00:00:00");

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

}


// ==========================================
// DISPLAY TODAY'S DATE
// ==========================================

function displayToday() {

    const today = new Date();

    document.getElementById("todayDate").textContent =
        today.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

}


// ==========================================
// CAPITAL ALLOCATION
// ==========================================

function updateAllocation() {

    const nifty =
        Number(document.getElementById("niftyPercent").value) || 0;

    const sensex =
        Number(document.getElementById("sensexPercent").value) || 0;

    const gold =
        Number(document.getElementById("goldPercent").value) || 0;

    const silver =
        Number(document.getElementById("silverPercent").value) || 0;

    const crude =
        Number(document.getElementById("crudePercent").value) || 0;

    const goldMini =
        Number(document.getElementById("goldMiniPercent").value) || 0;

    const silverMini =
        Number(document.getElementById("silverMiniPercent").value) || 0;

    const gas =
        Number(document.getElementById("gasPercent").value) || 0;


    // ₹8,00,000 - NIFTY + SENSEX

    document.getElementById("niftyAmount").textContent =
        formatCurrency(800000 * nifty / 100);

    document.getElementById("sensexAmount").textContent =
        formatCurrency(800000 * sensex / 100);


    // ₹8,00,000 - GOLD + SILVER

    document.getElementById("goldAmount").textContent =
        formatCurrency(800000 * gold / 100);

    document.getElementById("silverAmount").textContent =
        formatCurrency(800000 * silver / 100);


    // ₹5,00,000 - OTHER COMMODITIES

    document.getElementById("crudeAmount").textContent =
        formatCurrency(500000 * crude / 100);

    document.getElementById("goldMiniAmount").textContent =
        formatCurrency(500000 * goldMini / 100);

    document.getElementById("silverMiniAmount").textContent =
        formatCurrency(500000 * silverMini / 100);

    document.getElementById("gasAmount").textContent =
        formatCurrency(500000 * gas / 100);

}


// ==========================================
// ADD DAILY PROFIT
// ==========================================

function addProfit() {

    const date =
        document.getElementById("profitDate").value;

    const amount =
        Number(document.getElementById("dailyProfit").value);


    if (!date || !amount) {

        alert("Please enter both date and profit.");

        return;
    }


    profits.push({
        date: date,
        amount: amount
    });


    profits.sort((a, b) =>
        new Date(a.date) - new Date(b.date)
    );


    document.getElementById("profitDate").value = "";
    document.getElementById("dailyProfit").value = "";


    renderProfits();

    updateDashboard();

}


// ==========================================
// DISPLAY DAILY PROFITS
// ==========================================

function renderProfits() {

    const table =
        document.getElementById("profitTableBody");

    table.innerHTML = "";

    let runningProfit = 0;


    profits.forEach((record, index) => {

        runningProfit += Number(record.amount);


        const row = document.createElement("tr");


        row.innerHTML = `

            <td>
                ${formatDate(record.date)}
            </td>

            <td>
                ${formatCurrency(record.amount)}
            </td>

            <td>
                ${formatCurrency(runningProfit)}
            </td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteProfit(${index})">

                    Delete

                </button>

            </td>

        `;


        table.appendChild(row);

    });

}


// ==========================================
// DELETE DAILY PROFIT
// ==========================================

function deleteProfit(index) {

    profits.splice(index, 1);

    renderProfits();

    updateDashboard();

}


// ==========================================
// ADD WITHDRAWAL
// ==========================================

function addWithdrawal() {

    const date =
        document.getElementById("withdrawalDate").value;

    const amount =
        Number(document.getElementById("withdrawalAmount").value);

    const commission =
        Number(document.getElementById("withdrawalCommission").value);


    if (!date || !amount || !commission) {

        alert("Please enter date, withdrawal and commission.");

        return;
    }


    withdrawals.push({

        date: date,

        amount: amount,

        commission: commission

    });


    withdrawals.sort((a, b) =>
        new Date(a.date) - new Date(b.date)
    );


    document.getElementById("withdrawalDate").value = "";

    document.getElementById("withdrawalAmount").value = "";

    document.getElementById("withdrawalCommission").value = "";


    renderWithdrawals();

    updateDashboard();

}


// ==========================================
// DISPLAY WITHDRAWALS
// ==========================================

function renderWithdrawals() {

    const table =
        document.getElementById("withdrawalTableBody");

    table.innerHTML = "";


    withdrawals.forEach((record, index) => {

        const profitAmount =
            record.amount + record.commission;


        const netReceived =
            record.amount - record.commission;


        const row = document.createElement("tr");


        row.innerHTML = `

            <td>
                ${formatDate(record.date)}
            </td>

            <td>
                ${formatCurrency(record.amount)}
            </td>

            <td>
                ${formatCurrency(record.commission)}
            </td>

            <td>
                ${formatCurrency(profitAmount)}
            </td>

            <td>
                ${formatCurrency(netReceived)}
            </td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteWithdrawal(${index})">

                    Delete

                </button>

            </td>

        `;


        table.appendChild(row);

    });

}


// ==========================================
// DELETE WITHDRAWAL
// ==========================================

function deleteWithdrawal(index) {

    withdrawals.splice(index, 1);

    renderWithdrawals();

    updateDashboard();

}


// ==========================================
// UPDATE DASHBOARD
// ==========================================

function updateDashboard() {

    let dailyProfitTotal = 0;


    profits.forEach(record => {

        dailyProfitTotal += Number(record.amount);

    });


    let withdrawalTotal = 0;

    let commissionTotal = 0;


    withdrawals.forEach(record => {

        withdrawalTotal += Number(record.amount);

        commissionTotal += Number(record.commission);

    });


    // According to your rule:
    // Profit = Withdrawal + Commission

    const withdrawalProfit =
        withdrawalTotal + commissionTotal;


    const totalProfit =
        dailyProfitTotal + withdrawalProfit;


    const netReceived =
        withdrawalTotal - commissionTotal;


    document.getElementById("totalCapital").textContent =
        formatCurrency(TOTAL_CAPITAL);


    document.getElementById("currentProfit").textContent =
        formatCurrency(totalProfit);


    document.getElementById("totalWithdrawn").textContent =
        formatCurrency(withdrawalTotal);


    document.getElementById("totalCommission").textContent =
        formatCurrency(commissionTotal);


    document.getElementById("netReceived").textContent =
        formatCurrency(netReceived);


    // Today's P&L

    const today =
        new Date().toISOString().split("T")[0];


    let todayTotal = 0;


    profits.forEach(record => {

        if (record.date === today) {

            todayTotal += Number(record.amount);

        }

    });


    document.getElementById("todayProfit").textContent =
        formatCurrency(todayTotal);


    updateChart();

}


// ==========================================
// PROFIT CHART
// ==========================================

let profitChart = null;


function updateChart() {

    const canvas =
        document.getElementById("profitChart");


    if (!canvas) return;


    const labels = [];

    const values = [];


    let runningProfit = 0;


    profits.forEach(record => {

        runningProfit += Number(record.amount);

        labels.push(formatDate(record.date));

        values.push(runningProfit);

    });


    if (profitChart) {

        profitChart.destroy();

    }


    profitChart =
        new Chart(canvas, {

            type: "line",

            data: {

                labels: labels,

                datasets: [

                    {

                        label: "Running Profit",

                        data: values,

                        tension: 0.3,

                        fill: false

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false

            }

        });

}


// ==========================================
// INITIALIZE
// ==========================================

displayToday();

updateAllocation();

renderProfits();

renderWithdrawals();

updateDashboard();
