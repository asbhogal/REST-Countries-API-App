import { Countries } from "@/utils/types";
import { INTEGER_FORMATTER } from "./INTEGER_FORMATTER";

const formatPopulation = (population: Countries) => {
  if (typeof population !== "number") {
    return "";
  }
  return INTEGER_FORMATTER.format(population);
};

export default formatPopulation;
