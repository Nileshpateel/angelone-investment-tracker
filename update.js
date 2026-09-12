// ==========================================
// ANGEL ONE TRACKER - DAILY UPDATE
// ==========================================

// Paste your Google Apps Script Web App URL below.
const API_URL = "https://script.google.com/macros/s/AKfycbzlEjbk4fGXvZk7_mKbFC0b4tuJaCq1QwyC25bIxRrqrDeBZbuUsBgTD4-KZaS6R2dMfQ/exec";


// ==========================================
// CURRENCY FORMAT
// ==========================================

function formatCurrency(amount) {
    return "₹" + Number(amount || 0).toLocaleString("en-IN", {
        maximumFractionDigits: 0
    });
}


// ==========================================
// TODAY'S DATE
// ==========================================

function getToday() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


// ==========================================
// SET DEFAULT DATE
// ==========================================

function setDefaultDates() {

    const today = getToday();

    document.getElementById("profitDate").value = today;

    document.getElementById("withdrawalDate").value = today;
}


// ==========================================
// SEND DATA TO GOOGLE SHEETS
// ==========================================

async function sendToDatabase(data) {

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            body: JSON.stringify(data)

        });

        const result = await response.json();

        return result;

    } catch (error) {

        console.error(error);

        alert(
            "Unable to connect to the Google Sheet database."
        );

        return null;
    }
}


// ==========================================
// SAVE PROFIT
// ==========================================

async function saveProfit() {

    const date =
        document.getElementById("profitDate").value;

    const profit =
        Number(
            document.getElementById("dailyProfit").value
        );


    if (!date || !profit) {

        alert("Please enter the date and profit amount.");

        return;
    }


    const result = await sendToDatabase({

        action: "addDailyProfit",

        date: date,

        profit: profit,

        notes: ""

    });


    if (result && result.status === "success") {

        alert("Today's profit has been saved.");

        document.getElementById("dailyProfit").value = "";

        loadTodaySummary();
    }

}


// ==========================================
// SAVE WITHDRAWAL
// ==========================================

async function saveWithdrawal() {

    const date =
        document.getElementById("withdrawalDate").value;

    const withdrawal =
        Number(
            document.getElementById("withdrawalAmount").value
        );

    const commission =
        Number(
            document.getElementById("withdrawalCommission").value
        );


    if (!date || !withdrawal || !commission) {

        alert(
            "Please enter the date, withdrawal amount and commission."
        );

        return;
    }


    const result = await sendToDatabase({

        action: "addWithdrawal",

        date: date,

        withdrawal: withdrawal,

        commission: commission,

        notes: ""

    });


    if (result && result.status === "success") {

        alert("Withdrawal has been saved.");

        document.getElementById("withdrawalAmount").value = "";

        document.getElementById("withdrawalCommission").value = "";

        loadTodaySummary();
    }

}


// ==========================================
// LOAD TODAY'S SUMMARY
// ==========================================

async function loadTodaySummary() {

    const today = getToday();


    try {

        const profitResponse = await fetch(API_URL, {

            method: "POST",

            body: JSON.stringify({

                action: "getDailyProfits"

            })

        });


        const profits =
            await profitResponse.json();


        const withdrawalResponse = await fetch(API_URL, {

            method: "POST",

            body: JSON.stringify({

                action: "getWithdrawals"

            })

        });


        const withdrawals =
            await withdrawalResponse.json();


        let todayProfit = 0;

        let todayWithdrawal = 0;

        let todayCommission = 0;


        profits.forEach(item => {

            if (formatSheetDate(item.date) === today) {

                todayProfit +=
                    Number(item.profit) || 0;

            }

        });


        withdrawals.forEach(item => {

            if (formatSheetDate(item.date) === today) {

                todayWithdrawal +=
                    Number(item.withdrawal) || 0;

                todayCommission +=
                    Number(item.commission) || 0;

            }

        });


        const todayNet =
    (todayWithdrawal + todayCommission) - todayCommission;
        

        document.getElementById("todayProfit").textContent =
            formatCurrency(todayProfit);


        document.getElementById("todayWithdrawal").textContent =
            formatCurrency(todayWithdrawal);


        document.getElementById("todayCommission").textContent =
            formatCurrency(todayCommission);


        document.getElementById("todayNet").textContent =
            formatCurrency(todayNet);


        renderRecentUpdates(profits, withdrawals);

    } catch (error) {

        console.error(error);

    }

}


// ==========================================
// GOOGLE SHEET DATE CONVERSION
// ==========================================

function formatSheetDate(value) {

    if (!value) return "";

    const date = new Date(value);

    if (isNaN(date.getTime())) {
        return String(value);
    }

    const year =
        date.getFullYear();

    const month =
        String(date.getMonth() + 1).padStart(2, "0");

    const day =
        String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


// ==========================================
// RECENT UPDATES
// ==========================================

function renderRecentUpdates(profits, withdrawals) {

    const table =
        document.getElementById("recentUpdates");

    table.innerHTML = "";


    const updates = [];


    profits.forEach(item => {

        updates.push({

            date: formatSheetDate(item.date),

            type: "Profit",

            amount: Number(item.profit) || 0,

            commission: 0

        });

    });


    withdrawals.forEach(item => {

        updates.push({

            date: formatSheetDate(item.date),

            type: "Withdrawal",

            amount: Number(item.withdrawal) || 0,

            commission: Number(item.commission) || 0

        });

    });


    updates.sort((a, b) =>
        new Date(b.date) - new Date(a.date)
    );


    updates.slice(0, 10).forEach(item => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${item.date}</td>

            <td>${item.type}</td>

            <td>${formatCurrency(item.amount)}</td>

            <td>${formatCurrency(item.commission)}</td>

        `;


        table.appendChild(row);

    });

}


// ==========================================
// START PAGE
// ==========================================

setDefaultDates();

loadTodaySummary();
