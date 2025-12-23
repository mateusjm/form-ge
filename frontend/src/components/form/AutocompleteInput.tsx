import {
  FormControl,
  Input,
  InputLabel,
  List,
  ListItem,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";

type Option = {
  id: number;
  nome: string;
  estado: string;
  label: string;
};

type AutocompleteInputProps = {
  label: string;
  name: string;
  value: string;
  options: Option[];
  onChange: (name: string, value: string) => void;
};

// Remove acentos
const normalizeText = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const AutocompleteInput = ({
  label,
  name,
  value,
  options,
  onChange,
}: AutocompleteInputProps) => {
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Atualiza texto exibido
  useEffect(() => {
    const selectedOption = options.find((o) => o.label === value);
    if (selectedOption) {
      setSearchTerm(selectedOption.label);
    } else {
      setSearchTerm(value || "");
    }
  }, [value, options]);

  // Filtro + ordenação inteligente
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        const normalizedSearch = normalizeText(searchTerm);

        const filtered = options
          .filter((option) =>
            normalizeText(option.label).includes(normalizedSearch)
          )
          .sort((a, b) => {
            const aLabel = normalizeText(a.label);
            const bLabel = normalizeText(b.label);

            // 1️⃣ correspondência exata
            if (aLabel === normalizedSearch && bLabel !== normalizedSearch)
              return -1;
            if (bLabel === normalizedSearch && aLabel !== normalizedSearch)
              return 1;

            // 2️⃣ começa com
            if (
              aLabel.startsWith(normalizedSearch) &&
              !bLabel.startsWith(normalizedSearch)
            )
              return -1;
            if (
              bLabel.startsWith(normalizedSearch) &&
              !aLabel.startsWith(normalizedSearch)
            )
              return 1;

            // 3️⃣ ordem alfabética
            return aLabel.localeCompare(bLabel);
          })
          .slice(0, 100);

        setFilteredOptions(filtered);
      } else {
        setFilteredOptions(options.slice(0, 20));
      }

      setHighlightedIndex(-1);
    }, 150);

    return () => clearTimeout(timer);
  }, [searchTerm, options]);

  const handleSelect = (option: Option) => {
    onChange(name, option.label);
    setSearchTerm(option.label);
    setShowOptions(false);
    setHighlightedIndex(-1);
  };

  return (
    <FormControl fullWidth variant="standard" style={{ position: "relative" }}>
      <InputLabel>{label}</InputLabel>

      <Input
        id={name}
        name={name}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowOptions(true);
        }}
        onFocus={() => setShowOptions(true)}
        onBlur={() => setTimeout(() => setShowOptions(false), 150)}
        onKeyDown={(e) => {
          if (!showOptions || filteredOptions.length === 0) return;

          if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
              prev < filteredOptions.length - 1 ? prev + 1 : 0
            );
          }

          if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
              prev > 0 ? prev - 1 : filteredOptions.length - 1
            );
          }

          if (e.key === "Enter" && highlightedIndex >= 0) {
            e.preventDefault();
            handleSelect(filteredOptions[highlightedIndex]);
          }

          if (e.key === "Escape") {
            setShowOptions(false);
          }
        }}
        autoComplete="off"
        required
      />

      {showOptions && filteredOptions.length > 0 && (
        <Paper
          style={{
            position: "absolute",
            zIndex: 10,
            top: "100%",
            left: 0,
            right: 0,
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          <List dense>
            {filteredOptions.map((option, index) => (
              <ListItem
                key={option.id}
                component="li"
                button
                onMouseDown={() => handleSelect(option)}
                sx={{
                  cursor: "pointer",
                    padding: 1.5,
                  bgcolor:
                    index === highlightedIndex
                      ? "action.selected"
                      : "transparent",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                {option.label}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </FormControl>
  );
};
