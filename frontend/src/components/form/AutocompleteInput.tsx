import {
  FormControl,
  Input,
  InputLabel,
  List,
  ListItem,
  Paper,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const listRef = useRef<HTMLDivElement>(null);

  /** 🔁 sincroniza texto com valor válido */
  useEffect(() => {
    const selected = options.find((o) => o.label === value);
    setSearchTerm(selected ? selected.label : "");
  }, [value, options]);

  /** 🔍 filtro inteligente */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchTerm) {
        setFilteredOptions(options.slice(0, 20));
        setHighlightedIndex(-1);
        return;
      }

      const normalizedSearch = normalizeText(searchTerm);

      const filtered = options
        .filter((o) => normalizeText(o.label).includes(normalizedSearch))
        .sort((a, b) => {
          const aLabel = normalizeText(a.label);
          const bLabel = normalizeText(b.label);

          if (aLabel === normalizedSearch && bLabel !== normalizedSearch)
            return -1;
          if (bLabel === normalizedSearch && aLabel !== normalizedSearch)
            return 1;

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

          return aLabel.localeCompare(bLabel);
        })
        .slice(0, 100);

      setFilteredOptions(filtered);
      setHighlightedIndex(-1);
    }, 150);

    return () => clearTimeout(timer);
  }, [searchTerm, options]);

  /** ✅ seleção válida */
  const handleSelect = (option: Option) => {
    onChange(name, option.label);
    setSearchTerm(option.label);
    setShowOptions(false);
    setHighlightedIndex(-1);
  };

  /** ❌ bloqueia valores fora da API */
  const handleBlur = () => {
    const match = options.find(
      (o) => normalizeText(o.label) === normalizeText(searchTerm)
    );

    if (match) {
      onChange(name, match.label);
      setSearchTerm(match.label);
    } else {
      onChange(name, "");
      setSearchTerm("");
    }

    setShowOptions(false);
    setHighlightedIndex(-1);
  };

  /** 📌 Mantém item destacado visível ao navegar com teclado */
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      if (item) {
        const itemTop = item.offsetTop;
        const itemBottom = itemTop + item.offsetHeight;
        const scrollTop = listRef.current.scrollTop;
        const scrollBottom = scrollTop + listRef.current.clientHeight;

        if (itemTop < scrollTop) {
          listRef.current.scrollTop = itemTop;
        } else if (itemBottom > scrollBottom) {
          listRef.current.scrollTop = itemBottom - listRef.current.clientHeight;
        }
      }
    }
  }, [highlightedIndex]);

  return (
    <FormControl fullWidth variant="standard" style={{ position: "relative" }}>
      <InputLabel>{label}</InputLabel>

      <Input
        id={name}
        name={name}
        value={searchTerm}
        autoComplete="off"
        required
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowOptions(true);
        }}
        onFocus={() => setShowOptions(true)}
        onBlur={() => setTimeout(handleBlur, 150)}
        onKeyDown={(e) => {
          if (!showOptions || filteredOptions.length === 0) return;

          if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((i) =>
              i < filteredOptions.length - 1 ? i + 1 : 0
            );
          }

          if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((i) =>
              i > 0 ? i - 1 : filteredOptions.length - 1
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
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "auto", // permite scroll chaining natural
            touchAction: "pan-y", // permite scroll vertical no mobile
          }}
          ref={listRef}
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
