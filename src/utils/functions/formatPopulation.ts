import { INTEGER_FORMATTER } from "./INTEGER_FORMATTER";

const formatPopulation = (population: number) => {
  if (typeof population !== "number") {
    return "";
  }
  return INTEGER_FORMATTER.format(population);
};

export default formatPopulation;
