export const getBrowserDetails = () => {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform.toLowerCase();

  const detectBrowser = () => {
    if (userAgent.includes("Firefox")) {
      return "Firefox";
    } else if (
      userAgent.includes("Chrome") &&
      !userAgent.includes("Chromium")
    ) {
      return "Chrome";
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
      return "Safari";
    } else if (userAgent.includes("Edge")) {
      return "Edge";
    } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
      return "Internet Explorer";
    }
    return "Unknown Browser";
  };

  const detectOS = () => {
    if (platform.includes("win")) {
      return "Windows";
    }
    if (platform.includes("mac")) {
      return "MacOS";
    }
    if (platform.includes("linux")) {
      return "Linux";
    }
    if (platform.includes("iphone") || platform.includes("ipad")) {
      return "iOS";
    }
    if (platform.includes("android")) {
      return "Android";
    }
    return "Unknown OS";
  };

  return {
    browser: detectBrowser(),
    os: detectOS(),
  };
};
