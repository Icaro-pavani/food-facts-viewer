import app, { initialize } from "./app.js";

const port = +process.env.PORT || 4000;

initialize().then(() => {
  app.listen(port, () => console.log(`API is running at port ${port}`));
});
