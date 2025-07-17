// Refresh the iframe every 5 minutes (300,000 ms)
setInterval(() => {
  const iframe = document.querySelector("iframe");
  if (iframe) {
    // Reload the iframe by resetting the src
    iframe.src = iframe.src;
  }
}, 300000); // 5 minutes in milliseconds
