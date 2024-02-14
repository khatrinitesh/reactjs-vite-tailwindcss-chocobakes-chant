import React, { useEffect, useState } from "react";
// BELOW CODE > LIBRARY
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import Cookies from "js-cookie";

// BELOW CODE > PAGES
const Register = React.lazy(() => import("./pages/Register")); // 2
const Welcome = React.lazy(() => import("./pages/Welcome")); // 3
const WelcomeBack = React.lazy(() => import("./pages/WelcomeBack")); // 4
const SelectChant = React.lazy(() => import("./pages/SelectChant")); // 5
const Chant = React.lazy(() => import("./pages/Chant")); // 5
const Congratulations = React.lazy(() => import("./pages/Congratulations")); // 8
const TermsConditions = React.lazy(() => import("./pages/TermsConditions")); // 9
const Error = React.lazy(() => import("./pages/Error")); // 11
const Oops = React.lazy(() => import("./pages/Oops")); // 11
const CongratulationsLakshadweep = React.lazy(
  () => import("./pages/CongratulationsLakshadweep")
); // 11

import PortraitMobileMode from "./components/PortraitMobileMode";

// BELOW CODE > COMPONENTS
import Loading from "./components/Loading";
import { useOtpModalStore } from "./zustand/handleOtpModal";
import EnterOTPNum from "./components/EnterOTPNum";
import RedeemWorks from "./components/RedeemWorks";
import { useHowToModalStore } from "./zustand/handleHowToModal";
import EnterMobileNumber from "./components/EnterMobileNumber";
import { handleApiRequests } from "./utils/handleApiRequests";
import { getDeviceDetails } from "./utils/getDeviceDetails";
import { getBrowserDetails } from "./utils/getBrowserDetails";
import { getHutkVar } from "./utils/getHutkVar";
import { useRedeemModalStore } from "./zustand/handleRedeemModal";
import { useEnterNumberModalStore } from "./zustand/handleEnterNumberModal";
import HowToPlayModal from "./components/HowToPlayModal";
import Header from "./components/Header";
import ClickLoading from "./components/ClickLoading";
import DataEnrichment from "./components/DataEnrichment";
import { useDataEnrichmentStore } from "./zustand/handleDataEnrichment";

//redux functions

function App() {
  const { browser, os } = getBrowserDetails();
  const { search, pathname } = useLocation();
  const params = new URLSearchParams(search);
  const navigate = useNavigate();

  //ZUSTAND STATES
  const { otpModal } = useOtpModalStore();
  const { howToModal } = useHowToModalStore();
  const { redeemModal, content } = useRedeemModalStore();
  const { enterNumberModal } = useEnterNumberModalStore();

  //COOKIE VALUES
  const uid = Cookies.get("uid");
  const coupon = Cookies.get("coupon");

  const utm_campaign = params.get("utm_campaign");
  const utm_content = params.get("utm_content");
  const utm_medium = params.get("utm_medium");
  const utm_source = params.get("utm_source");
  const utm_term = params.get("utm_term");
  const [shouldNavigateToWelcomePage, setShouldNavigateToWelcomePage] =
    useState(false);
  const [loadingForJioUsers, setLoadingForJioUsers] = useState(false);

  //zustand
  const { dataEnrichment } = useDataEnrichmentStore();

  const [personDataForJioPTM, setPersonDataForJioPTM] = useState({
    uuid: params.get("uuid") !== null ? params.get("uuid") : "",
    device: getDeviceDetails(),
    os,
    browser,
    latitude: "0",
    longitude: "0",
    utm_camp: utm_campaign !== null ? utm_campaign : "",
    utm_content: utm_content !== null ? utm_content : "",
    utm_medium: utm_medium !== null ? utm_medium : "",
    utm_src: utm_source !== null ? utm_source : "",
    utm_term: utm_term !== null ? utm_term : "",
  });

  const [personData, setPersonData] = useState({
    name: "",
    mobile: "",
    email: "",
    terms: false,
    promo: true,
    device: getDeviceDetails(),
    os,
    browser,
    cid: "",
    hutk: "",
    utm_camp: utm_campaign !== null ? utm_campaign : "",
    utm_content: utm_content !== null ? utm_content : "",
    utm_medium: utm_medium !== null ? utm_medium : "",
    utm_src: utm_source !== null ? utm_source : "",
    utm_term: utm_term !== null ? utm_term : "",
    otp: "",
    token: "",
    latitude: "",
    longitude: "",
  });

  const handleOnChange = (type, value) => {
    setPersonData((draft) => {
      return { ...draft, [type]: value };
    });
  };

  const handleSendExternalUserRequest = () => {
    setLoadingForJioUsers(true);
    handleApiRequests(personDataForJioPTM, "/find-external-user")
      .then((res) => {
        setLoadingForJioUsers(false);
        if (res.success) {
          Cookies.set("uid", res.uid);
          Cookies.set("name", res.name);
          Cookies.set("coupon", JSON.stringify(res.category));
          Cookies.set("grandPrize", res.grandPrize);
          if (res.category && res.grandPrize) {
            navigate("/welcome-back", { replace: true });
          } else {
            navigate("/select-chant", { replace: true });
          }
        } else {
          navigate("/");
        }
      })
      .catch(() => {});
  };

  const getGoogleCID = () => {
    return getData("_ga").split(".")[2] + "." + getData("_ga").split(".")[3];
  };

  const getData = (cname) => {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  useEffect(() => {
    const hutkVar = getData("hubspotutk");
    const Cid = getGoogleCID();

    handleOnChange("cid", Cid);
    handleOnChange("hutk", hutkVar);
  }, [personData?.name]);

  //HIT-LOG-API-CALL
  useEffect(() => {
    if (pathname === "/") {
      handleApiRequests(
        {
          device: getDeviceDetails(),
          os,
          browser,
        },
        "/add-hit-log"
      )
        .then(() => {})
        .catch(() => {});
    }
  }, [pathname]);

  useEffect(() => {
    if (uid === undefined) {
      if (
        utm_campaign === null &&
        utm_content === null &&
        utm_source === null &&
        utm_term === null &&
        utm_medium === null
      ) {
        if (pathname !== "/terms") {
          navigate("/");
        }
      }
    } else {
      if (shouldNavigateToWelcomePage) {
        if (pathname !== "/") {
          navigate(pathname, { replace: true });
        } else {
          navigate("/welcome", { replace: true });
        }
      }
    }
  }, [
    uid,
    utm_campaign,
    utm_content,
    utm_medium,
    utm_source,
    utm_term,
    shouldNavigateToWelcomePage,
    pathname,
  ]);

  useEffect(() => {
    if (uid !== undefined) {
      setShouldNavigateToWelcomePage(true);
    }
  }, [uid]);

  useEffect(() => {
    if (personDataForJioPTM.uuid !== "") {
      handleSendExternalUserRequest();
    }
  }, [personDataForJioPTM?.uuid, personDataForJioPTM?.utm_src]);

  return (
    <>
      <PortraitMobileMode />
      <Header />
      {/* START >> IT IS ONLY FOR MOBILE & DESKTOP DEVICE - PORTRAIT & LANDSCAPE */}
      <div className="pt-[90px]">
        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense fallback={<Loading />}>
                <Register
                  personData={personData}
                  setPersonData={setPersonData}
                  utm_campaign={utm_campaign}
                  utm_content={utm_content}
                  utm_medium={utm_medium}
                  utm_source={utm_source}
                  utm_term={utm_term}
                />
              </React.Suspense>
            }
          />
          <Route
            path="/select-chant"
            element={
              <React.Suspense fallback={<Loading />}>
                <SelectChant />
              </React.Suspense>
            }
          />
          <Route
            path="/chant/:id"
            element={
              <React.Suspense fallback={<Loading />}>
                <Chant handleOnChange={handleOnChange} />
              </React.Suspense>
            }
          />
          <Route
            path="/congratulations"
            element={
              <React.Suspense fallback={<Loading />}>
                <Congratulations code={coupon} />
              </React.Suspense>
            }
          />
          <Route
            path="/welcome"
            element={
              <React.Suspense fallback={<Loading />}>
                <Welcome />
              </React.Suspense>
            }
          />
          <Route
            path="/welcome-back"
            element={
              <React.Suspense fallback={<Loading />}>
                <WelcomeBack />
              </React.Suspense>
            }
          />
          <Route
            path="/congratulations-lakshadweep"
            element={
              <React.Suspense fallback={<Loading />}>
                <CongratulationsLakshadweep />
              </React.Suspense>
            }
          />

          <Route
            path="*"
            element={
              <React.Suspense fallback={<Loading />}>
                <Error />
              </React.Suspense>
            }
          />
          <Route
            path="/terms"
            element={
              <React.Suspense fallback={<Loading />}>
                <TermsConditions />
              </React.Suspense>
            }
          />
          <Route
            path="/oops"
            element={
              <React.Suspense fallback={<Loading />}>
                <Oops />
              </React.Suspense>
            }
          />
        </Routes>
      </div>
      {/* END >> IT IS ONLY FOR MOBILE DESKTOP DEVICE - PORTRAIT & LANDSCAPE */}

      {/* Modal state */}
      {otpModal && (
        <EnterOTPNum
          personData={personData}
          handleOnChange={handleOnChange}
          setShouldNavigateToWelcomePage={setShouldNavigateToWelcomePage}
        />
      )}
      {redeemModal && <RedeemWorks content={content} />}
      {howToModal && <HowToPlayModal />}
      {enterNumberModal && (
        <EnterMobileNumber handleOnChange={handleOnChange} />
      )}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#facb60",
            fontSize: 16,
            borderWidth: 0,
          },
        }}
      />
      {loadingForJioUsers && (
        <div className="absolute top-0 flex justify-center items-center z-[9999999999999] h-full w-full backdrop-blur-sm">
          <Loading />
        </div>
      )}
      {dataEnrichment &&
        (pathname === "/congratulations" ||
          pathname === "/congratulations-lakshadweep") && <DataEnrichment />}
    </>
  );
}

export default App;
