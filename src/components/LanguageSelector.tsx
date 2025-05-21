import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";
import { BR, US, ES } from "country-flag-icons/react/3x2";

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120, mr: 2 }}>
      <Select
        value={i18n.language}
        onChange={handleLanguageChange}
        sx={{
          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
          },
        }}
      >
        <MenuItem
          value="pt"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <BR title="Português" style={{ width: 20, height: 15 }} />
          Português
        </MenuItem>
        <MenuItem
          value="en"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <US title="English" style={{ width: 20, height: 15 }} />
          English
        </MenuItem>
        <MenuItem
          value="es"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <ES title="Español" style={{ width: 20, height: 15 }} />
          Español
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
