import express from "express";
import http from "http";
import { Server } from "socket.io";
import useragent from "useragent";
import geoip from "geoip-lite";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // or "https://your-frontend-app.onrender.com" for security
    methods: ["GET", "POST"]
  }
});

// Serve dashboard files
app.use(express.static(path.join(process.cwd(), "public")));

// Visitor tracking middleware
app.use((req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const agent = useragent.parse(req.headers["user-agent"]);
  const geo = geoip.lookup(ip) || {};

  const visitorInfo = {
    timestamp: new Date().toISOString(),
    ip,
    url: req.originalUrl,
    method: req.method,
    browser: agent.toAgent(),
    os: agent.os.toString(),
    device: agent.device.toString(),
    country: geo.country || "Unknown",
    city: geo.city || "Unknown",
    geo
  };

  io.emit("new-visitor", visitorInfo);
  next();
});

// Catch-all to serve dashboard
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
