const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const ConnectDb = require("./dbconfig");
const UserRoutes = require("./routes/UserRoutes");
const WorkerRoutes = require("./routes/WorkerRoutes");
const RequestRoutes = require("./routes/RequestRoutes");
const AdminRoutes = require("./routes/AdminRoutes");
const isAdmin = require("./middleware/isAdmin");
const app = express();

//parse the data
app.use(express.json());

//use cors
app.use(cors({ origin: "*" }));

//config dotenv
dotenv.config();
  
// connect database
ConnectDb();

app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/workers", WorkerRoutes);
app.use("/api/v1/request", RequestRoutes);

// use with middleware
app.use("/api/v1/admin", isAdmin, AdminRoutes);


app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`${Object.keys(r.route.methods)} ${r.route.path}`);
  }
});


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("server running on", PORT);
});
