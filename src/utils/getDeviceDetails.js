export const getDeviceDetails = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile =
    /mobile|android|iphone|ipad|phone|blackberry|opera mini|opera mobi|iemobile/i.test(
      userAgent
    );
  const isTablet = /tablet|ipad/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;

  let deviceType = "Unknown";

  if (isMobile) {
    deviceType = "Mobile";
  } else if (isTablet) {
    deviceType = "Tablet";
  } else if (isDesktop) {
    deviceType = "Desktop";
  }

  return deviceType;
};
