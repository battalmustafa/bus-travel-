import BusQueryParametersService from "../services/BusQueryParameterService";
import { SearchPayload } from "../types/types";
import React from "react";
import { useLocation } from "react-router-dom";



function useQueryParameters() {
  const { search } = useLocation();

  return React.useMemo((): SearchPayload | null => {
    const urlParams = new URLSearchParams(search);
    const searchType = urlParams.get("searchType") || "Bus";

    switch (searchType) {
      case "Bus":
        return BusQueryParametersService.decode(urlParams);
      default:
        return null;
    }
  }, [search]);
}

export default useQueryParameters;
