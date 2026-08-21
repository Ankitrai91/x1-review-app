import BUSINESS_CONFIG from "./businessConfig";

export const getBusinessConfig = () => {
  console.log("getBusinessConfig function CALLED");

  console.log(
    "Full URL:",
    window.location.href
  );

  console.log(
    "Pathname:",
    window.location.pathname
  );

  // const type = window.location.pathname
  //   .split("/")
  //   .filter(Boolean)[0]
  //   ?.toLowerCase();

   let type = "gym";
  const pathname = window.location.pathname.toLowerCase();

  if (pathname.startsWith("/restra")) {
    type = "restaurant";
  }

  console.log("Detected type:", type);

  console.log(
    "Available businesses:",
    BUSINESS_CONFIG
  );

  const config = BUSINESS_CONFIG[type];

  console.log("Matched config:", config);

  return config || null;
};