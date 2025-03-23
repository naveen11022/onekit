const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "naviprasaad50@gmail.com",  // Your Gmail address
        pass: "crzl sicn ekoz iqqm",       // Your Gmail app password
    },
});

// 📧 Route 1: Form Submission with Privacy Policy and Future Opportunities
app.post("/submit", async (req, res) => {
    try {
        const { name, email, phone, portfolio, privacy_policy, future_opportunities } = req.body;

        if (!name || !email || !phone || !portfolio) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        console.log("Received form data:", req.body);

        const mailOptions = {
            from: email,
            to: "23am040@kpriet.ac.in",
            subject: "New Form Submission",
            text: `
                Name: ${name}
                Email: ${email}
                Phone: ${phone}
                Portfolio: ${portfolio}
                Privacy Policy Accepted: ${privacy_policy}
                Future Opportunities Consent: ${future_opportunities}
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log("Form submission email sent successfully!");
        res.status(200).json({ message: "Form submitted successfully and email sent!" });
    } catch (error) {
        console.error("Error while sending form submission email:", error);
        res.status(500).json({ error: error.message || "Failed to send email" });
    }
});

// 📧 Route 2: Demo Request with Company Name and Requirements
app.post("/schedule-demo", async (req, res) => {
    try {
        const { companyName, name, email, phone, requirements } = req.body;

        if (!companyName || !name || !email || !phone || !requirements) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        console.log("Received demo request data:", req.body);

        const mailOptions = {
            from: email,
            to: "23am040@kpriet.ac.in",
            subject: "New Demo Request",
            text: `
                Company Name: ${companyName}
                Name: ${name}
                Email: ${email}
                Phone: ${phone}
                Requirements: ${requirements}
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log("Demo request email sent successfully!");
        res.status(200).json({ message: "Demo request submitted successfully and email sent!" });
    } catch (error) {
        console.error("Error while sending demo request email:", error);
        res.status(500).json({ error: error.message || "Failed to send email" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
