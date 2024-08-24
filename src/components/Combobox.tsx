import {
  Combobox as HeadlessCombobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

export interface ComboboxOption {
  id: string;
  label: string;
}

export interface ComboboxProps {
  selected?: Maybe<ComboboxOption>;
  onSelect: (selected?: ComboboxOption | null) => void;
  query?: Maybe<string>;
  onChangeQuery: (query?: Maybe<string>) => void;
  options?: ComboboxOption[];
  loading?: boolean;
  debounceTime?: number;
  emptyStateMessage?: string;
}

// I could extract to a generic component, but since it's not being reused on the app I decided to keep it simple
export function Combobox({
  selected,
  onSelect,
  query,
  onChangeQuery,
  options,
  loading,
  debounceTime = 300,
  emptyStateMessage = "No results",
}: ComboboxProps) {
  const [tempQuery, setTempQuery] = useState(query);

  const debouncedOnChangeQuery = useMemo(
    () =>
      debounce(onChangeQuery, debounceTime, { leading: false, trailing: true }),
    [debounceTime, onChangeQuery],
  );

  useEffect(() => {
    debouncedOnChangeQuery(tempQuery);
  }, [debouncedOnChangeQuery, tempQuery]);

  return (
    <HeadlessCombobox
      value={selected}
      onChange={onSelect}
      onClose={() => onChangeQuery("")}
    >
      <ComboboxInput
        aria-label="Movie Title"
        value={tempQuery || ""}
        displayValue={(selected: ComboboxOption) =>
          selected?.label || query || ""
        }
        onChange={(event) => setTempQuery(event.target.value)}
        className="rounded border-2 border-solid border-black p-2"
      />
      <ComboboxOptions anchor="bottom" className="border empty:invisible">
        {loading && (
          <ComboboxOption className="bg-white" disabled value="">
            {" "}
            Loading ...
          </ComboboxOption>
        )}

        {!loading && !!query?.length && !options?.length && (
          <ComboboxOption className="bg-white" disabled value="">
            {emptyStateMessage}
          </ComboboxOption>
        )}

        {!loading &&
          options?.map((option) => (
            <ComboboxOption
              key={option.id}
              value={option}
              className="bg-white data-[focus]:bg-blue-100"
            >
              {option.label}
            </ComboboxOption>
          ))}
      </ComboboxOptions>
    </HeadlessCombobox>
  );
}
