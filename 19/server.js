
import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const env = {
  PORT: 5000,
  SERVER_TOKEN:
    "dadf62e7dadf62e7dadf62e757d9ca0cb6ddadfdadf62e7be37d7e899c0339d471ccf4a",
};

class AuthController {
  async login(silentToken, uuid) {
    try {
      const response = await axios.get(
        `https://api.vk.com/method/auth.exchangeSilentAuthToken?v=5.131&token=${silentToken}&uuid=${uuid}&access_token=${env.SERVER_TOKEN}`
      );

      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
}

class WallController {
  async get(owner_id, access_token, offset) {
    try {
      const response = await axios.get(
        `https://api.vk.com/method/wall.get?owner_id=${owner_id}&access_token=${access_token}&offset=${offset}&v=5.131`
      );

      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
}

const app = express();

const PORT = env.PORT || 5000;

const allowCrossDomain = (_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "origin, content-type, accept");
  next();
};

app.use(allowCrossDomain);
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get("/api", (req, res) => {
  res.send({ message: 'api' });
});

const auth = new AuthController()
app.post("/api/auth", async (req, res) => {
 try {
  const { silentToken, uuid } = req.body

  const data = await auth.login(silentToken, uuid)

  res.send(data)
 } catch (error) {
  res.status("400").send(error.message)
 }
});

const wall = new WallController()
app.post("/api/wall", async (req, res) => {
  try {
    const { access_token, ownerId, offset } = req.body

    const data = await wall.get(ownerId, access_token, offset)
  
    res.send(data)
  } catch (error) {
    res.status("400").send(error.message)
  }
});

