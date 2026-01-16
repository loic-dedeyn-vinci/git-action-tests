// src/index.ts

import app from "./app";

const port = 8080;

app.listen(port, () => {
    console.log(`Server : http://localhost:${port}`);
});
