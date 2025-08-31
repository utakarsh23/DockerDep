const express = require("express");

const app = express();

app.get("/from-python", async (req, res) => {
    try {
        console.log("about to call")
        const response = await fetch("http://127.0.0.1:7777/hello");
        console.log("called")
        const text = await response.text();
        console.log(text)
        res.send(`Express got this: ${text}`);
    } catch (err) {
        console.log("huhh error")
        res.status(500).send("Error calling Python backend: " + err.message);
    }
});

app.get("/health", async(req, res) => {
    return res.status(200).json({message: "huhhh it is working"});
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express running on http://0.0.0.0:${PORT}`);
});