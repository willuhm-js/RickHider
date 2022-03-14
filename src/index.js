const express = require("express");
const ejs = require("ejs");
const path = require("path");
const tinyurl = require("tinyurl-api");
const join = (p) => path.join(__dirname, p); 

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", join("views"));
app.use(express.static(join("public")))

app.get("/", (req, res) => res.render("index"));

app.post("/genRoller", async (req, res) => {
  let url = `https://${req.get("host")}/roller?`;
  for (key of Object.keys(req.body)) {
    if(req.body[key].length !== 0) {
      url += `${encodeURIComponent(req.body[key])}&`;
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

app.listen(process.env.POT || 8080, () => console.log("Fertig!"));