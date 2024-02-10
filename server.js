import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

// Middlewares
import connectDB from './config/db.js';
import logRequestBody from "./middlewares/requestBodyData.js";
// import { authenticateToken } from "./middlewares/auth.js";

// Routes
// import authRoutes from "./routes/authRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
import serviceRoute from "./routes/serviceRoute.js";
// import orderRoutes from "./routes/orderRoutes.js";
import categoryRoute from "./routes/categoryRoute.js";
import carouselRoute from "./routes/carouselRoute.js"; 
import reviewRoutes from "./routes/reviewRoute.js";
// import storyRoutes from "./routes/storyRoutes.js";
// import collectionRoutes from "./routes/collectionRoutes.js";
// import emailRoutes from "./routes/emailRoutes.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS
app.use(cors());
//app.use(cors({ origin: "http://example.com" }));

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(logRequestBody);
app.use(express.static("./"));

// Middleware to log request details


// authentication routes
// app.use("/api", authRoutes);

// all the other routes
// app.use("/api", adminRoutes);
app.use("/api", serviceRoute);
// app.use("/api", orderRoutes);
app.use("/api", categoryRoute);
app.use("/api", carouselRoute);
app.use("/api", reviewRoutes);
// app.use("/api", storyRoutes);
// app.use("/api", collectionRoutes); 
// app.use("/api", emailRoutes);

// app.use("/api", authenticateToken ,adminRoutes);// protected routes should be like this

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
