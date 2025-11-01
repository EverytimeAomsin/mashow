import React from "react";
import {
  Box,
  Typography,
  Link,
  IconButton,
  Stack,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Image from "next/image";

export default function Footer() {
  const socials = [
    {
      name: "Vimeo",
      url: "https://vimeo.com/user22123398",
      bgColor: "#1AB7EA",
      icon: "/vimeo-white-icon.webp",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/imp-manuschanok-23863856",
      bgColor: "#0077B5",
      icon: <LinkedInIcon fontSize="small" />,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/manuschanok_imp?igsh=MWlyN3g2Y2ZiazBnZQ%3D%3D&utm_source=qr",
      bgColor: "#E4405F",
      icon: <InstagramIcon fontSize="small" />,
    },
  ];
  return (
    <Box
      component="footer"
      sx={{ color: "text.secondary", fontFamily: "var(--font-montserrat), sans-serif" }}
    >
      <Box sx={{   py: 3 }}>
         {/* bgcolor: "#f3f4f6" */}
       
        <Box
          sx={{
            maxWidth: "1300px", // max-w-screen-xl
            margin: "0 auto",
            padding: { xs: "16px", sm: "16px" }, // p-4 equivalent
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", sm: "flex-start" },
              mb: { xs: 2, sm: 0 },
              margin: 0,
              padding: 0,
              width: { xs: "100%", sm: "auto" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography sx={{ fontWeight: 500, margin: 0, padding: 0 }}>
              <b>Contact:</b>
            </Typography>
          </Box>

          {/* Copyright */}
          <Typography
            variant="body2"
            sx={{
              textAlign: { xs: "center", sm: "left" },
              ml: { sm: 1 },
              mt: { xs: 0, sm: 0 },
              flexGrow: 1,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Link href="tel:+66996356951" underline="hover" color="inherit">
              +66 99 635 6951
            </Link>{" / "}
            <Link
              href="mailto:impmiko@gmail.com"
              underline="hover"
              color="inherit"
            >
              impmiko@gmail.com
            </Link>
          </Typography>

          {/* Social Icons */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mt: { xs: 2, sm: 0 },
              justifyContent: { xs: "center", sm: "flex-start" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {socials.map((social) => (
              <IconButton
                key={social.name}
                component="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: social.bgColor, // สีพื้นหลังตามแบรนด์
                  color: "#fff", // ไอคอนสีขาว
                  "&:hover": {
                    bgcolor: "#000", // พื้นหลังเปลี่ยนเป็นดำเมื่อ hover
                  },
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {typeof social.icon === "string" ? (
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={20}
                    height={20}
                    style={{
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  social.icon
                )}
              </IconButton>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
