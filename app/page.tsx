"use client";

import React from "react";

import { Container, Typography, Box, Modal, IconButton, Fade } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFilter } from "./FilterContext";

export default function PortfolioPage() {
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedVideo, setSelectedVideo] = React.useState<string>("");
  const { selectedTag } = useFilter();
  const galleryRef = React.useRef<HTMLDivElement | null>(null);
  const [isFading, setIsFading] = React.useState(false);

  const items = [
    {
      img: "/img/Budweiser.jpg",
      videoUrl: "https://etc1.st-th-1.byteark.com/Budweiser_.mp4",
      title: "Budweiser",
      tag:"Commercials"
    },
    {
      img: "/img/CLOSE_UP.jpg",
      videoUrl: "https://etc1.st-th-1.byteark.com/CLOSE%20UP.mov",
      title: "CLOSE UP",
       tag:"Recent_Work"
    },
    {
      img: "/img/Durex.png",
      videoUrl: "https://etc1.st-th-1.byteark.com/durex.mp4",
      title: "Durex",
       tag:"Commercials"
    },
    {
      img: "/img/OLAY.jpg",
      videoUrl: "https://etc1.st-th-1.byteark.com/OLAY.mp4",
      title: "OLAY",
       tag:"Hightlight"
    },
    {
      img: "/img/PANTENE_ID.jpg",
      videoUrl: "https://etc1.st-th-1.byteark.com/PANTENE%20ID.mp4",
      title: "PANTENE ID",
       tag:"Beauty"
    },
    {
      img: "/img/PANTENE.jpg",
      videoUrl: "https://etc1.st-th-1.byteark.com/PANTENE.mp4",
      title: "PANTENE",
       tag:"Hightlight"
    },
    {
      img: "/img/ROYAL_STAG.jpg",
      videoUrl: "https://etc1.st-th-1.byteark.com/ROYAL%20STAG.mp4",
      title: "ROYAL STAG",
       tag:"Hightlight"
    },
    {
      img: "/img/SOLGAR.jpg",
      videoUrl: "https://etc1.st-th-1.byteark.com/SOLGAR.mp4",
      title: "SOLGAR",
       tag:"Hightlight"
    },
    {
      img: "/img/ViVo.jpg",
      videoUrl: "https://etc1.st-th-1.byteark.com/ViVo.mp4",
      title: "ViVo",
       tag:"Hightlight"
    },
    {
      img: "/img/Blue_Band.jpg",
      videoUrl: "https://etc1.st-th-1.byteark.com/Blue%20Band.mp4",
      title: "Blue Band",
       tag:"Recent_Work"
    },
    {
      img: "/img/KFC.jpg",
      videoUrl: "https://etc1.st-th-1.byteark.com/KFC.mp4",
      title: "KFC",
       tag:"Recent_Work"
    },
    {
      img: "/img/L’OréalUV.jpg",
      videoUrl: "https://etc1.st-th-1.byteark.com/L%E2%80%99Or%C3%A9al%20UV.mp4",
      title: "L'Oréal UV",
       tag:"Hightlight"
    },
    {
      img: "/img/L’Oréal_(1).jpg",
      videoUrl: "https://etc1.st-th-1.byteark.com/L%E2%80%99Or%C3%A9al_%281%29.mp4",
      title: "L'Oréal",
       tag:"Beauty"
    },
    {
      img: "/img/L’Oréal_(2).jpg",
      videoUrl: "https://etc1.st-th-1.byteark.com/L%E2%80%99Or%C3%A9al_%282%29.mp4",
      title: "L'Oréal",
       tag:"Beauty"
    },
    {
      img: "/img/L’Oréal_(3).jpg",
      videoUrl: "https://etc1.st-th-1.byteark.com/L%E2%80%99Or%C3%A9al_%283%29.mp4",
      title: "L'Oréal",
       tag:"Beauty"
    },
    {
      img: "/img/L’Oréal.jpg",
      videoUrl: "https://etc1.st-th-1.byteark.com/L%E2%80%99Or%C3%A9al_.mp4",
      title: "L'Oréal",
       tag:"Beauty"
    },
    {
      img: "/img/TITAN.jpg",
      videoUrl: "https://etc1.st-th-1.byteark.com/TITAN.mp4",
      title: "TITAN",
       tag:"Commercials"
    },
    {
      img: "/img/Vidal_Sassoon.jpg",
      videoUrl: "https://etc1.st-th-1.byteark.com/Vidal%20Sassoon.mp4",
      title: "Vidal Sassoon",
       tag:"Beauty"
    },
    {
      img: "/img/Bank_Of_ Singapore.jpg",
      videoUrl: "https://etc1.st-th-1.byteark.com/Bank%20Of%20Singapore2.mp4",
      title: "Bank Of Singapore",
       tag:"Commercials"
    },
  ];

  // Compute next items for the current tag
  const nextItems = React.useMemo(() => {
    if (!selectedTag) return items;
    return items.filter((item) => item.tag.split(",").map((t) => t.trim()).includes(selectedTag));
  }, [selectedTag, items]);

  // Two-phase fade: fade out, swap items, fade in
  const [displayItems, setDisplayItems] = React.useState(nextItems);
  const [isInitialMount, setIsInitialMount] = React.useState(true);
  const prevNextItemsRef = React.useRef(nextItems);
  
  React.useEffect(() => {
    // On initial mount, just set items without fade
    if (isInitialMount) {
      setDisplayItems(nextItems);
      prevNextItemsRef.current = nextItems;
      setIsInitialMount(false);
      return;
    }
    
    // Only trigger fade if items actually changed
    if (JSON.stringify(prevNextItemsRef.current) !== JSON.stringify(nextItems)) {
      setIsFading(true);
      const outTimer = setTimeout(() => {
        setDisplayItems(nextItems);
        prevNextItemsRef.current = nextItems;
        // allow next paint then fade in
        setTimeout(() => setIsFading(false), 20);
      }, 180);
      return () => clearTimeout(outTimer);
    } else {
      // If same items, just update ref
      prevNextItemsRef.current = nextItems;
    }
  }, [nextItems, isInitialMount]);

  const handleOpenModal = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedVideo("");
  };

  return (
    <Container
      maxWidth={false}
      sx={{ 
        maxWidth: { xs: "100%", sm: "1300px" }, 
        margin: "0 auto", 
        padding: "130px 20px", 
        textAlign: "center" 
      }}
    >


      <Box
        id="gallery"
        ref={galleryRef}
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr", // Default: 1 column (< 576px)
          gap: 4,
          justifyContent: "center",
          maxWidth: "1300px",
          margin: "0 auto",
          opacity: isFading ? 0 : 1,
          transition: "opacity 180ms ease",
          "@media (min-width: 576px)": {
            gridTemplateColumns: "repeat(2, 1fr)", // 2 columns (576px - 1300px)
          },
          "@media (min-width: 1300px)": {
            gridTemplateColumns: "repeat(3, 1fr)", // 3 columns (> 1300px)
          },
        }}
      >
        {displayItems.map((item, index) => (
          <Fade in={true} timeout={600} key={`${item.videoUrl}-${index}`} style={{ transitionDelay: `${index * 100}ms` }}>
            <div>
            <Box sx={{ textAlign: "left" }}>
                {/* กล่องรูป 16:9 responsive */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: { xs: "100%", sm: 600 },
                    paddingTop: "56.25%", // 16:9
                    overflow: "hidden",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    "&:hover img": { transform: "scale(1.05)" },
                    "&:hover": { cursor: "pointer" },
                    margin: "0 auto",
                    animation: "fadeInUp 0.6s ease-out",
                    "@keyframes fadeInUp": {
                      from: {
                        opacity: 0,
                        transform: "translateY(30px)",
                      },
                      to: {
                        opacity: 1,
                        transform: "translateY(0)",
                      },
                    },
                  }}
                  onClick={() => handleOpenModal(item.videoUrl)}
                >
                  <Box
                    component="img"
                    src={item.img}
                    alt={item.title}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </Box>

                <Typography
                  mt={1}
                  ml={2}
                  onClick={() => handleOpenModal(item.videoUrl)}
                  sx={{ 
                    fontFamily: "var(--font-montserrat), sans-serif",
                    cursor: "pointer",
                    "&:hover": { 
                      color: "primary.main",
                      textDecoration: "underline"
                    }
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            </div>
          </Fade>
        ))}
      </Box>

      {/* Video Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "90vw",
            maxWidth: 1200,
            bgcolor: "black",
            boxShadow: 24,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "white",
              bgcolor: "rgba(0, 0, 0, 0.5)",
              "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Video Player */}
          <Box
            component="video"
            src={selectedVideo}
            controls
            autoPlay
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "90vh", // ✅ ป้องกันสูงเกินจอ
              objectFit: "contain", // ✅ ปรับให้แสดงครบไม่ตัดขอบ
              display: "block",
            }}
          />
        </Box>
      </Modal>
    
    </Container>
  );
}
