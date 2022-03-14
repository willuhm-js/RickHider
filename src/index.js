const express = require("express");
const ejs = require("ejs");
const path = require("path");
const tinyurl = require("tinyurl-api");
const rateLimit = require("express-rate-limit");
const join = (p) => path.join(__dirname, p); 

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", join("views"));
app.use(express.static(join("public")))

app.use("/genRoller", rateLimit({
  windowMs: 60 * 1000, // 60 seconds
  max: 10, // 10 requests
  standardHeaders: true,
  legacyHeaders: false,
  message: "<script>window.location.href = '/error/429/Too%20many%20requests.'</script>"
}))

app.get("/", (req, res) => res.render("index"));

app.post("/genRoller", async (req, res) => {
  let url = `https://${req.get("host")}/roller?`;
  for (key of Object.keys(req.body)) {
    if(req.body[key].length !== 0) {
      url += `${key}=${encodeURIComponent(req.body[key])}&`;
    }
  }
  try {
    url = await tinyurl(url);
  } catch {}
  res.render("success.ejs", { url })
});

app.get("/roller", (req, res) => {
  const { title, description, thumbnail, url } = req.query;
  res.render("roller", { title, description, thumbnail, url });
});

app.get("/error/:code/:message", (req, res) => {
  const { code, message } = req.params;
  res.status(code).render("error.ejs", { message })
})

app.get("/*", (req, res) => {
  res.redirect("/error/404/Page%20not%20found.");
});

app.listen(process.env.PORT || 8080, () => console.log("Fertig!"));