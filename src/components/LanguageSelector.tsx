import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { US, BR, ES } from "country-flag-icons/react/3x2";

const LANGUAGES = [
  { code: "en", name: "English", flag: US },
  { code: "pt", name: "Português", flag: BR },
  { code: "es", name: "Español", flag: ES },
];

export default function LanguageSelector() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { currentLanguage, changeLanguage } = useLanguage();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode);
    handleClose();
  };

  const CurrentFlag =
    LANGUAGES.find((lang) => lang.code === currentLanguage)?.flag || US;

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <CurrentFlag style={{ width: 24, height: 24 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
      >
        {LANGUAGES.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={currentLanguage === language.code}
          >
            <language.flag style={{ width: 20, height: 20, marginRight: 8 }} />
            {language.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
