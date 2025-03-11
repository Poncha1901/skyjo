import { fork } from "child_process";

const apiServer = fork("src/api/index.ts");
const webServer = fork("src/web/index.ts");

apiServer.on("exit", (code) => {
  console.log(`API server exited with code ${code}`);
});

webServer.on("exit", (code) => {
  console.log(`Web server exited with code ${code}`);
});
