let deviceMode = "mobile"; // Default mode
const startBtn = document.getElementById("startBtn");
const result = document.getElementById("result");
const modeToggle = document.getElementById("modeToggle");

modeToggle.addEventListener("click", () => {
  deviceMode = deviceMode === "mobile" ? "pc" : "mobile";
  modeToggle.textContent = `Mode: ${deviceMode === "mobile" ? "Mobile" : "PC"}`;
});

// Game logic
startBtn.addEventListener("click", () => {
  result.textContent = "Wait for the signal...";
  startBtn.disabled = true;

  const delay = Math.random() * 2000 + 1000; // 1–3s delay
  setTimeout(() => {
    document.body.classList.add("signal");
    result.textContent = deviceMode === "pc"
      ? "Press F or Space NOW!"
      : "Tap the screen NOW!";
    const startTime = performance.now();

    const handler = (e) => {
      const validKey = e.type === "touchstart" ||
        (e.type === "keydown" && (e.code === "Space" || e.code === "KeyF"));

      if (!validKey) return;

      const endTime = performance.now();
      const reaction = Math.round(endTime - startTime);

      result.textContent = `⚡ Reaction Time: ${reaction} ms`;
      document.body.classList.remove("signal");
      startBtn.disabled = false;

      if (deviceMode === "pc")
        document.removeEventListener("keydown", handler);
      else
        document.removeEventListener("touchstart", handler);
    };

    if (deviceMode === "pc")
      document.addEventListener("keydown", handler);
    else
      document.addEventListener("touchstart", handler);
  }, delay);
});
