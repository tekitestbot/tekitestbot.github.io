document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("cookiesAccepted")) {
      loadAnalytics();
    } else {
      document.getElementById("cookie-banner").style.display = "block";
    }
  
    document.getElementById("accept-cookies").addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      document.getElementById("cookie-banner").style.display = "none";
      loadAnalytics();
    });
  });
  
  function loadAnalytics() {
    let script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-M5214MH7Q9";
    script.async = true;
    document.head.appendChild(script);
  
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-M5214MH7Q9');
    };
  }
  