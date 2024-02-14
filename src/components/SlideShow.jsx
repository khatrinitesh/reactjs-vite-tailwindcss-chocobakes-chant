import { Navigation, EffectCoverflow } from "swiper/modules";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ClickLoading from "../components/ClickLoading";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { IconChevronsLeft } from "@tabler/icons-react";
import { IconChevronsRight } from "@tabler/icons-react";

const SlideShow = ({ setCoupon, array, coupon, areAllCouponsNull }) => {
  const assetsBucketUrl = import.meta.env.VITE_ASSETS_BUCKET_URL;
  const [activeIndex, setActiveIndex] = useState(0);
  const [sortedArray, setSortedArray] = useState([]);

  const handleCouponName = (index) => {
    if (sortedArray[index]?.allow) {
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: "Select_Coupon_Option",
        click: array[index]?.category,
      });
      setCoupon(array[index]?.category);
    } else {
      setCoupon(null);
    }
  };

  const handleSwiper = (swiper) => {
    const index = swiper.realIndex;
    setActiveIndex(index);
    handleCouponName(index);
  };

  const handleDisplayImage = (name) => {
    if (name === "Amazon") {
      return `${assetsBucketUrl}/img/slides/slide1-v1.png`;
    }
    if (name === "Flipkart") {
      return `${assetsBucketUrl}/img/slides/slide2-v1.png`;
    }
    if (name === "MMT") {
      return `${assetsBucketUrl}/img/slides/slide3-v1.png`;
    }
    if (name === "Nykaa") {
      return `${assetsBucketUrl}/img/slides/slide4-v1.png`;
    }
    if (name === "Uber") {
      return `${assetsBucketUrl}/img/slides/slide5-v1.png`;
    }
  };

  useEffect(() => {
    if (array && array.length === 5) {
      const allowIndex = array.findIndex((item) => item.allow);

      if (allowIndex !== -1 && allowIndex !== 2) {
        const [allowItem] = array.splice(allowIndex, 1);

        array.splice(2, 0, allowItem);
      }

      setSortedArray([...array]);
    }
  }, [array]);

  useEffect(() => {
    if (areAllCouponsNull) {
      if (sortedArray?.length === 5) {
        if (array[2]?.allow) {
          setCoupon(array[2]?.category);
        } else {
          setCoupon(null);
        }
      }
    }
  }, [sortedArray, areAllCouponsNull]);

  return (
    <Swiper
      initialSlide={2}
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      loop={false}
      slidesPerView={3}
      className={`mt-4 ${areAllCouponsNull === false && "swiper-disabled"}`}
      modules={[EffectCoverflow, Navigation]}
      coverflowEffect={{
        rotate: 0,
        stretch: window.innerWidth > 768 ? 50 : 25,
        depth: 120,
        modifier: 2.5,
      }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        clickable: true,
      }}
      onSwiper={handleSwiper}
      onSlideChange={handleSwiper}
    >
      {array?.length === 5 ? (
        <>
          {array?.map((item, index) => (
            <SwiperSlide key={index}>
              <button
                disabled={activeIndex !== index}
                onClick={() => {
                  if (activeIndex === index && item?.allow) {
                    window.dataLayer = window.dataLayer || [];
                    dataLayer.push({
                      event: "Select_Coupon_Option",
                      click: item.category,
                    });
                    setCoupon(item.category);
                  }
                }}
                key={index}
                className="disabled:brightness-[0.6] outline-none object-cover aspect-square rounded-[18px] duration-300  relative "
              >
                <img
                  src={handleDisplayImage(item.category)}
                  className={`aspect-square mx-auto block rounded-[18px] overflow-hidden md:h-[120px] md:w-[120px] h-[90px] w-[90px] duration-300 ${
                    coupon === item.category
                      ? "border-[4px] border-[#feea5c]"
                      : ""
                  }`}
                />
                {!item?.allow && (
                  <div className="absolute top-0">
                    <img
                      src={`${assetsBucketUrl}/img/slides/sorrycard-v1.png`}
                      className="aspect-square mx-auto block rounded-[18px] overflow-hidden md:h-[120px] md:w-[120px] h-[90px] w-[90px] duration-300"
                    />
                  </div>
                )}
              </button>
            </SwiperSlide>
          ))}
        </>
      ) : (
        <div className="md:h-[120px] h-[90px] flex justify-center items-center">
          <ClickLoading />
        </div>
      )}
      <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow">
          <IconChevronsLeft stroke={1.5} color="#ffffff90" />
        </div>
        <div className="swiper-button-next slider-arrow">
          <IconChevronsRight stroke={1.5} color="#ffffff90" />
        </div>
      </div>
    </Swiper>
  );
};

export default SlideShow;
