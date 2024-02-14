import React, { useEffect, useState } from "react";

// BELOW COMPONENTS
import BiscuitOption from "../components/BiscuitOption";
import BtnPrimaryPurpleArrow from "../components/BtnPrimaryPurpleArrow";
import SlideShow from "../components/SlideShow";
import MediumHeadTitle from "../components/MediumHeadTitle";
import MediumHeadTitlePurple from "../components/MediumHeadTitlePurple";

// BELOW IMAGES
import { handleApiRequests } from "../utils/handleApiRequests";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ToastMessage from "../components/ToastMessage";
import { useHowToModalStore } from "../zustand/handleHowToModal";

const SelectChant = () => {
  const navigate = useNavigate();
  const assetsBucketUrl = import.meta.env.VITE_ASSETS_BUCKET_URL;
  const { howToModal, changeHowToModalState } = useHowToModalStore();

  const [mantra, setMantra] = useState(
    "Cadbury Chocobakes Choc Filled Cookies"
  );
  const [areAllCouponsNull, setAreAllCouponsNull] = useState(true);
  const [loading, setLoading] = useState(false);
  const [chantRoute, setChantRoute] = useState("choc-filled");
  const [couponArray, setCouponArray] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [allCouponsCollected, setAllCouponsCollected] = useState(false);

  //COOKIE VALUES
  const uid = Cookies.get("uid");

  const mantraArray = [
    {
      img: `${assetsBucketUrl}/img/cookies/biscuit1-v1.png`,
      text: "Cadbury Chocobakes Choc Filled Cookies",
      route: "choc-filled",
    },
    {
      img: `${assetsBucketUrl}/img/cookies/biscuit2-v1.png`,
      text: "Cadbury Chocobakes Choc Layered Cakes",
      route: "choc-layered",
    },
    {
      img: `${assetsBucketUrl}/img/cookies/biscuit3-v1.png`,
      text: "Cadbury Chocobakes Choco Chip Cookies",
      route: "choco-chip",
    },
  ];

  const handleChangeMantra = (text, route) => {
    setMantra(text);
    setChantRoute(route);
  };

  const handleSubmit = () => {
    if (coupon) {
      if (coupon !== "Lakshadweep") {
        setLoading(true);
        handleApiRequests(
          { uid, chant: mantra, couponCat: coupon },
          "/update-chant"
        ).then((res) => {
          if (res.success) {
            setLoading(false);
            Cookies.set("couponType", coupon);
            Cookies.set("mantraType", mantra);
            navigate(`/chant/${chantRoute}`);
          }
        });
      } else {
        Cookies.set("couponType", coupon);
        Cookies.set("mantraType", mantra);
        navigate(`/chant/${chantRoute}`);
      }
    } else {
      toast(<ToastMessage text="Please select a coupon" />);
    }
  };

  const handleGetCouponCategories = () => {
    handleApiRequests({ uid }, "/get-coupons-categories")
      .then((res) => {
        if (res.success) {
          setCouponArray(res);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        document.body.classList.remove("overflow-hidden");
      } else {
        document.body.classList.add("overflow-auto");
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleGetCouponCategories();
  }, []);

  useEffect(() => {
    changeHowToModalState();
    return () => {
      if (howToModal) {
        changeHowToModalState();
      }
    };
  }, []);

  useEffect(() => {
    if (couponArray?.length !== 0) {
      const value = couponArray?.category?.every(
        (coupon) => coupon?.coupon === null
      );

      setAreAllCouponsNull(value);
      if (value) {
        setCoupon(null);
      } else {
        if (!couponArray?.grandPrize) {
          setCoupon("Lakshadweep");
        } else {
          setCoupon(null);
          toast(<ToastMessage text="You have collected all the coupons" />);
          setAllCouponsCollected(true);
        }
      }
    }
  }, [couponArray]);

  return (
    <>
      <div className="w-full select-none relative bgChant bg-chantGradient min-h-[calc(100vh-90px)] flex flex-col items-center gap-[20px] py-[20px]">
        <div className="md:max-w-[40%] max-w-[97%] w-full mx-auto flex items-start flex-col relative justify-center ">
          <div className="px-[20px] w-full mx-auto relative gap-[10px] flex items-center justify-center flex-col">
            <MediumHeadTitlePurple
              style="mb-[0] !text-[2vh]"
              data="STEP 1: Select your chant"
            ></MediumHeadTitlePurple>
            <div className="verticalTimeline w-full">
              {mantraArray?.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <BiscuitOption
                      onClick={() => {
                        window.dataLayer = window.dataLayer || [];
                        dataLayer.push({
                          event: "Select_Your_Chant",
                          click: item.text,
                        });
                        handleChangeMantra(item.text, item.route);
                      }}
                      style={`${mantra === item.text && "active scale-[1.02]"}`}
                      img={item.img}
                    >
                      {item.text}
                    </BiscuitOption>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
        <div className="slideshow bg-primaryGradient1 relative w-full">
          <div className="triangle-bottom absolute top-[-15px] translate-x-[-50%] left-[50%] border-t-[15px] border-t-[#f6af33] md:border-t-[#fde969]"></div>
          <div className="max-w-[360px] md:max-w-[600px] mx-auto">
            <MediumHeadTitle
              style="mb-[0] !text-[2vh]"
              data="STEP 2: Select what you desire"
            />
            <div className="relative">
              <SlideShow
                array={couponArray?.category}
                setCoupon={setCoupon}
                coupon={coupon}
                areAllCouponsNull={areAllCouponsNull}
              />
            </div>

            {couponArray?.length !== 0 && (
              <button
                disabled={couponArray?.grandPrize}
                onClick={() => {
                  window.dataLayer = window.dataLayer || [];
                  dataLayer.push({
                    event: "Select_Coupon_Option",
                    click: "Lakshadweep",
                  });
                  setCoupon("Lakshadweep");
                }}
                className={`flex items-center disabled:opacity-50 mt-4 justify-center w-full duration-300  rounded-[16px]`}
              >
                <img
                  className={`max-w-[350px] rounded-[16px] duration-200 h-[100px] md:h-[120px] object-contain ${
                    coupon === "Lakshadweep"
                      ? "scale-[1.02] border-[4px] border-[#feea5c]"
                      : "shadow-btnPrimaryDarkShadow"
                  }`}
                  src={`${assetsBucketUrl}/img/logos/grandprize0-v3.png`}
                />
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <BtnPrimaryPurpleArrow
            disabled={
              allCouponsCollected || couponArray?.length === 0 || loading
            }
            loading={loading}
            onClick={handleSubmit}
          >
            Start chanting
          </BtnPrimaryPurpleArrow>
        </div>
      </div>
    </>
  );
};

export default SelectChant;
