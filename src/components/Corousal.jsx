import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CreateStory from "./createdStory";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";



function AutoPlay({data=[],handlePlay}) { 
  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.down("md"));
  const sm = useMediaQuery(breakpoints.down("sm"));
  const settings = {
    
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: md ? (sm ? 1 : 2) : 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    swipe: true,
    nextArrow: <SamplePrevArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} hide-arrow`}
        style={{ ...style, display: "none", background: "" }}
        onClick={onClick}
      />
    );
  }
console.log(data);
  return (
    <>
      <Box sx={{ width: "75vw" }}>
        <Slider {...settings}>
          {data?.map((item, index) => (
              <Box key={index} onClick={()=>handlePlay(item)}>
              <CreateStory  key={index} item={item} index={index} />
            </Box>
          ))}
          
        </Slider>
      </Box>
    </>
  );
}

export default AutoPlay;
