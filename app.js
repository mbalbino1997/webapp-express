const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const moviesRouter = require("./routers/movies");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/movies", moviesRouter);

app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
})