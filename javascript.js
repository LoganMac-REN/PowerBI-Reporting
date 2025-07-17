// Refresh the iframe every 15 minutes (900,000 ms)
setInterval(() => {
  const iframe = document.querySelector("iframe");
  if (iframe) {
    // Reload the iframe by resetting the src
    iframe.src = iframe.src;
  }
}, 900000); // 15 minutes in milliseconds
