import { Input, Button, UnstyledButton } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { FaSearchLocation } from "react-icons/fa";
import { getHotkeyHandler } from "@mantine/hooks";

type Props = {
  city: string;
  setCity: (value: string) => void;
  handleCitySubmit: () => void;
  lastSearch: string;
  error: string | null;
  introPage: boolean;
};

const SearchInput = ({
  city,
  setCity,
  handleCitySubmit,
  lastSearch,
  error,
  introPage,
}: Props) => {
  const widths = introPage ? "md:w-2/3" : "md:w-1/2 lg:w-1/3";

  return (
    <>
      <div className={`w-full ${widths} mb-10 mt-10`}>
        <Input
          size="lg"
          placeholder="Search a location..."
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          leftSection={<CiSearch size={25} />}
          error={error}
          onKeyDown={getHotkeyHandler([["Enter", handleCitySubmit]])}
          rightSection={
            introPage ? (
              <UnstyledButton onClick={handleCitySubmit}>
                <FaSearchLocation
                  size={25}
                  style={{ display: city ? undefined : "none" }}
                />
              </UnstyledButton>
            ) : null
          }
        />
      </div>
      {!introPage && (
        <div className="mt-10">
          <Button
            onClick={handleCitySubmit}
            disabled={!city.trim() || city === lastSearch}
            size="lg"
          >
            <FaSearchLocation />
          </Button>
        </div>
      )}
    </>
  );
};

export default SearchInput;
