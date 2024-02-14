import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles

// BELOW COMPONENT FILES
import RadioButton from "./RadioButton";
import BtnPrimaryPurpleArrow from "./BtnPrimaryPurpleArrow";
import { handleApiRequests } from "../utils/handleApiRequests";
import Cookies from "js-cookie";
import { useDataEnrichmentStore } from "../zustand/handleDataEnrichment";

const DataEnrichment = () => {
  const assetsBucketUrl = import.meta.env.VITE_ASSETS_BUCKET_URL;
  const [shouldHideOverflow, setShouldHideOverflow] = useState(false);
  const uid = Cookies.get("uid");
  const [loading, setLoading] = useState(false);

  const { changeDataEnrichmentState } = useDataEnrichmentStore();

  const [dataEnrichmentAnswers, setDataEnrichmentAnswers] = useState({
    ans1: "",
    ans2: "",
    ans3: "",
  });

  const { ans1, ans2, ans3 } = dataEnrichmentAnswers;

  const RadioOption1 = [
    { id: "option1", label: "Cadbury Chocobakes Centre Filled Cookies" },
    { id: "option2", label: "Cadbury Chocobakes Chocochip Cookie" },
    { id: "option3", label: "Cadbury Chocobakes Choc Filled Cakes" },
  ];
  const RadioOption2 = [
    { id: "option1", label: "Cadbury Chocobakes Centre Filled Cookies" },
    { id: "option2", label: "Cadbury Chocobakes Chocochip Cookie" },
    { id: "option3", label: "Cadbury Chocobakes Choc Filled Cakes" },
  ];
  const RadioOption3 = [
    { id: "option1", label: "Personal Indulgence" },
    { id: "option2", label: "Sharing with Family" },
    { id: "option3", label: "School Lunchbox Treat" },
    { id: "option4", label: "Elevating Tea / Coffee Breaks" },
    { id: "option5", label: "Any other occasion" },
  ];

  const handleOnChange = (type, value) => {
    setDataEnrichmentAnswers((draft) => {
      return { ...draft, [type]: value };
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    handleApiRequests(
      {
        uid,
        ansFavProduct: ans1,
        ansProdPurchase: ans2,
        ansOccasion: ans3,
      },
      "/add-ques"
    )
      .then((res) => {
        if (res.success) {
          setLoading(false);
          changeDataEnrichmentState();
        }
      })
      .catch(() => {});
  };

  // AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setShouldHideOverflow(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = shouldHideOverflow
      ? "overflow-hidden"
      : "visible";

    return () => {
      document.body.style.overflow = "hidden";
    };
  }, [shouldHideOverflow]);

  return (
    <div className="mainContent z-[9999] absolute top-0 overflow-hidden w-full min-h-screen  bg-oopsCongratsGradient">
      <div className="h-full w-full relative z-[9]">
        <div
          className="leftLeave absolute top-[10px] left-[10px] "
          data-aos="fade-down"
        >
          <img
            src={`${assetsBucketUrl}/img/leaves/icon1-v1.png`}
            alt=""
            className="max-w-full block mx-auto rotate-[-80deg] relative w-[50px] md:w-[70px]"
          />
        </div>
        <div
          className="rightLeave absolute top-[10px] right-[10px]"
          data-aos="fade-down"
        >
          <img
            src={`${assetsBucketUrl}/img/leaves/icon2-v1.png`}
            alt=""
            className="max-w-full block rotate-[80deg] relative w-[50px] md:w-[70px]"
          />
        </div>
      </div>
      <div className="md:h-[50vh] items-start dataEnrichmentContent grid gap-[20px] md:gap-[50px] md:grid-cols-2 w-full py-[100px] container mx-auto px-[20px]">
        <div className="leftContent relative px-[20px]">
          <div className="boxRow mb-[20px] md:mb-[50px]">
            <h3 className="textShadowGoldenLight leading-normal headTitle mb-[10px] md:mb-[20px] text-[2vh] md:text-[1.50vw] text-tertiarycolor font-proximanovaEB">
              Which is your favourite Cadbury Chocobakes Product?
            </h3>
            <RadioButton
              questionNumber={1}
              handleOnChange={handleOnChange}
              RadioOption={RadioOption1}
            />
          </div>
          <div className="boxRow">
            <h3 className="textShadowGoldenLight leading-normal headTitle mb-[10px] md:mb-[20px] text-[2vh] md:text-[1.50vw] text-tertiarycolor font-proximanovaEB">
              Which Cadbury Chocobakes Product would you purchase next time you
              shop?
            </h3>
            <RadioButton
              questionNumber={2}
              handleOnChange={handleOnChange}
              RadioOption={RadioOption2}
            />
          </div>
        </div>

        <div className="rightsContent relative px-[20px]">
          <h3 className="textShadowGoldenLight leading-normal headTitle mb-[10px] md:mb-[20px] text-[2vh] md:text-[1.50vw] text-tertiarycolor font-proximanovaEB">
            For what occasion do you consume your favorite Chocobakes product?
          </h3>
          <RadioButton
            questionNumber={3}
            handleOnChange={handleOnChange}
            RadioOption={RadioOption3}
          />
          <div className="flex justify-center md:justify-start">
            <BtnPrimaryPurpleArrow
              loading={loading}
              disabled={
                dataEnrichmentAnswers.ans1 === "" ||
                dataEnrichmentAnswers.ans2 === "" ||
                dataEnrichmentAnswers.ans3 === "" ||
                loading
              }
              onClick={handleSubmit}
              style="btnPrimaryOne relative top-[50px] z-[999] leading-tight"
            >
              <span className="relative">Submit</span>
            </BtnPrimaryPurpleArrow>
          </div>
        </div>
      </div>

      {/* TRIPCHOCOLATE */}
      <div className="tripchocoBlock md:absolute md:bottom-[20%] md:right-[5%]">
        <img
          src={`${assetsBucketUrl}/img/cookies/triplechocolate-v1.png`}
          alt=""
          className="max-w-[300px] mx-auto md:max-w-[300px] lg:max-w-[350px] 2xl:max-w-[500px]"
        />
      </div>

      {/* bottom curve */}
      <div className="bottomCurve fixed md:absolute bottom-0  w-full left-0 ">
        <div className="leftLeave absolute bottom-[10px] md:bottom-[140px] left-[10px] ">
          <img
            src={`${assetsBucketUrl}/img/leaves/icon1-v1.png`}
            alt=""
            className="max-w-full block mx-auto rotate-[180deg] relative w-[50px] md:w-[70px]"
          />
        </div>
        <div className="rightLeave absolute bottom-[10px] md:bottom-[140px] right-[10px]">
          <img
            src={`${assetsBucketUrl}/img/leaves/icon2-v1.png`}
            alt=""
            className="max-w-full block rotate-[180deg] relative w-[50px] md:w-[70px]"
          />
        </div>
      </div>
    </div>
  );
};

export default DataEnrichment;
