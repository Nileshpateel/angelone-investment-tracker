// ==========================================================
// ANGEL ONE TRACKER - ENTRY PAGE
// ==========================================================


// ==========================================================
// APPS SCRIPT WEB APP URL
// ==========================================================

const API_URL =
    "PASTE_YOUR_DEPLOYED_APPS_SCRIPT_URL_HERE";


// ==========================================================
// COMMISSION RATE
// ==========================================================

const COMMISSION_RATE = 0.178;


// ==========================================================
// CURRENCY FORMAT
// ==========================================================

function formatCurrency(amount) {

    return "₹" + Number(amount || 0).toLocaleString("en-IN", {

        maximumFractionDigits: 0

    });

}


// ==========================================================
// TODAY
// ==========================================================

function getToday() {

    const now = new Date();

    const year =
        now.getFullYear();

    const month =
        String(now.getMonth() + 1).padStart(2, "0");

    const day =
        String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


// ==========================================================
// SET DEFAULT DATES
// ==========================================================

function setDefaultDates() {

    const today = getToday();


    document.getElementById(
        "profitDate"
    ).value = today;


    document.getElementById(
        "withdrawalDate"
    ).value = today;

}


// ==========================================================
// SEND DATA TO APPS SCRIPT
// ==========================================================

async function sendToDatabase(data) {

    try {

        const response = await fetch(

            API_URL,

            {

                method: "POST",

                body: JSON.stringify(data)

            }

        );


        if (!response.ok) {

            throw new Error(
                "Server returned HTTP " +
                response.status
            );

        }


        const result =
            await response.json();


        return result;


    } catch (error) {

        console.error(
            "Database error:",
            error
        );


        alert(
            "Unable to connect to the database.\n\n" +
            "Please check the Apps Script deployment URL."
        );


        return null;

    }

}


// ==========================================================
// SAVE DAILY PROFIT / LOSS
// ==========================================================

async function saveProfit() {


    const date =
        document.getElementById(
            "profitDate"
        ).value;


    const profit =
        Number(
            document.getElementById(
                "dailyProfit"
            ).value
        ) || 0;


    const loss =
        Number(
            document.getElementById(
                "dailyLoss"
            ).value
        ) || 0;


    const notes =
        document.getElementById(
            "profitNotes"
        ).value.trim();


    if (!date) {

        alert(
            "Please select a date."
        );

        return;

    }


    if (profit === 0 && loss === 0) {

        alert(
            "Please enter a profit or loss amount."
        );

        return;

    }


    if (profit < 0 || loss < 0) {

        alert(
            "Profit and loss cannot be negative."
        );

        return;

    }


    const result =
        await sendToDatabase({

            action:
                "addDailyProfit",

            date:
                date,

            profit:
                profit,

            loss:
                loss,

            notes:
                notes

        });


    if (
        result &&
        result.status === "success"
    ) {

        alert(
            "Daily result saved successfully."
        );


        document.getElementById(
            "dailyProfit"
        ).value = "";


        document.getElementById(
            "dailyLoss"
        ).value = "0";


        document.getElementById(
            "profitNotes"
        ).value = "";


        await loadTodaySummary();

    }

}


// ==========================================================
// SAVE WITHDRAWAL
// ==========================================================

async function saveWithdrawal() {


    const date =
        document.getElementById(
            "withdrawalDate"
        ).value;


    const withdrawal =
        Number(
            document.getElementById(
                "withdrawalAmount"
            ).value
        ) || 0;


    const notes =
        document.getElementById(
            "withdrawalNotes"
        ).value.trim();


    if (!date) {

        alert(
            "Please select a date."
        );

        return;

    }


    if (withdrawal <= 0) {

        alert(
            "Please enter a valid withdrawal amount."
        );

        return;

    }


    // ------------------------------------------------------
    // Commission preview
    // ------------------------------------------------------

    const commission =
        Math.round(
            withdrawal *
            COMMISSION_RATE
        );


    const profitAmount =
        withdrawal +
        commission;


    const confirmation =
        confirm(

            "Withdrawal: " +
            formatCurrency(withdrawal) +

            "\nCommission: " +
            formatCurrency(commission) +

            "\nProfit Amount: " +
            formatCurrency(profitAmount) +

            "\nNet Received: " +
            formatCurrency(withdrawal) +

            "\n\nSave this withdrawal?"

        );


    if (!confirmation) {

        return;

    }


    const result =
        await sendToDatabase({

            action:
                "addWithdrawal",

            date:
                date,

            withdrawal:
                withdrawal,

            notes:
                notes

        });


    if (
        result &&
        result.status === "success"
    ) {

        alert(

            "Withdrawal saved successfully.\n\n" +

            "Withdrawal: " +
            formatCurrency(
                result.withdrawal
            ) +

            "\nCommission: " +
            formatCurrency(
                result.commission
            ) +

            "\nProfit Amount: " +
            formatCurrency(
                result.profitAmount
            ) +

            "\nNet Received: " +
            formatCurrency(
                result.netReceived
            )

        );


        document.getElementById(
            "withdrawalAmount"
        ).value = "";


        document.getElementById(
            "withdrawalNotes"
        ).value = "";


        await loadTodaySummary();

    }

}


// ==========================================================
// LOAD TODAY'S SUMMARY
// ==========================================================

async function loadTodaySummary() {


    try {


        const response =
            await fetch(

                API_URL +
                "?action=getDashboard"

            );


        if (!response.ok) {

            throw new Error(
                "HTTP " +
                response.status
            );

        }


        const data =
            await response.json();


        if (
            !data ||
            data.status !== "success"
        ) {

            throw new Error(
                data.message ||
                "Unable to load dashboard."
            );

        }


        const today =
            getToday();


        let todayProfit =
            0;

        let todayWithdrawal =
            0;

        let todayCommission =
            0;


        // --------------------------------------------------
        // DAILY PROFITS
        // --------------------------------------------------

        if (
            Array.isArray(
                data.dailyProfits
            )
        ) {

            data.dailyProfits.forEach(
                function(item) {

                    if (
                        formatSheetDate(
                            item.date
                        ) === today
                    ) {

                        todayProfit +=
                            Number(
                                item.netPnl
                            ) || 0;

                    }

                }
            );

        }


        // --------------------------------------------------
        // WITHDRAWALS
        // --------------------------------------------------

        if (
            Array.isArray(
                data.withdrawals
            )
        ) {

            data.withdrawals.forEach(
                function(item) {

                    if (
                        formatSheetDate(
                            item.date
                        ) === today
                    ) {

                        todayWithdrawal +=
                            Number(
                                item.withdrawal
                            ) || 0;


                        todayCommission +=
                            Number(
                                item.commission
                            ) || 0;

                    }

                }
            );

        }


        // --------------------------------------------------
        // NET RECEIVED
        // --------------------------------------------------

        const todayNet =
            todayWithdrawal;


        document.getElementById(
            "todayProfit"
        ).textContent =
            formatCurrency(
                todayProfit
            );


        document.getElementById(
            "todayWithdrawal"
        ).textContent =
            formatCurrency(
                todayWithdrawal
            );


        document.getElementById(
            "todayCommission"
        ).textContent =
            formatCurrency(
                todayCommission
            );


        document.getElementById(
            "todayNet"
        ).textContent =
            formatCurrency(
                todayNet
            );


        renderRecentUpdates(
            data.dailyProfits || [],
            data.withdrawals || []
        );


    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

    }

}


// ==========================================================
// SHEET DATE → YYYY-MM-DD
// ==========================================================

function formatSheetDate(value) {


    if (!value) {

        return "";

    }


    const date =
        new Date(value);


    if (
        isNaN(
            date.getTime()
        )
    ) {

        return String(value);

    }


    /*
       Apps Script sends Sheet dates as UTC strings.

       Example:

       2026-09-01 in India

       may arrive as:

       2026-08-31T18:30:00.000Z

       We therefore convert using
       Indian Standard Time.
    */


    const formatter =
        new Intl.DateTimeFormat(

            "en-CA",

            {

                timeZone:
                    "Asia/Kolkata",

                year:
                    "numeric",

                month:
                    "2-digit",

                day:
                    "2-digit"

            }

        );


    return formatter.format(
        date
    );

}


// ==========================================================
// RECENT UPDATES
// ==========================================================

function renderRecentUpdates(
    profits,
    withdrawals
) {


    const table =
        document.getElementById(
            "recentUpdates"
        );


    table.innerHTML = "";


    const updates = [];


    // ------------------------------------------------------
    // PROFITS
    // ------------------------------------------------------

    profits.forEach(
        function(item) {

            updates.push({

                date:
                    formatSheetDate(
                        item.date
                    ),

                type:
                    "Daily P&L",

                amount:
                    Number(
                        item.netPnl
                    ) || 0,

                commission:
                    0

            });

        }
    );


    // ------------------------------------------------------
    // WITHDRAWALS
    // ------------------------------------------------------

    withdrawals.forEach(
        function(item) {

            updates.push({

                date:
                    formatSheetDate(
                        item.date
                    ),

                type:
                    "Withdrawal",

                amount:
                    Number(
                        item.withdrawal
                    ) || 0,

                commission:
                    Number(
                        item.commission
                    ) || 0

            });

        }
    );


    // ------------------------------------------------------
    // SORT
    // ------------------------------------------------------

    updates.sort(
        function(a, b) {

            return (
                new Date(b.date) -
                new Date(a.date)
            );

        }
    );


    // ------------------------------------------------------
    // DISPLAY
    // ------------------------------------------------------

    updates
        .slice(0, 10)
        .forEach(
            function(item) {


                const row =
                    document.createElement(
                        "tr"
                    );


                row.innerHTML = `

                    <td>
                        ${item.date}
                    </td>

                    <td>
                        ${item.type}
                    </td>

                    <td>
                        ${formatCurrency(
                            item.amount
                        )}
                    </td>

                    <td>
                        ${formatCurrency(
                            item.commission
                        )}
                    </td>

                `;


                table.appendChild(
                    row
                );

            }
        );

}


// ==========================================================
// START PAGE
// ==========================================================

setDefaultDates();

loadTodaySummary();
