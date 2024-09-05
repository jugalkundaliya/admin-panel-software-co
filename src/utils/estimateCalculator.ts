import { IEstimateTotal } from "../components/EstimatesForm";
import { IEstimateRecord } from "../components/EstimatesForm/EstimateRecord";

export const calculateEstimates = (
  estimate: IEstimateRecord
): IEstimateRecord => {
  const estimates = estimate.estimates.map((item) => {
    const finalPrice =
      (item?.quantity || 0) * (item?.price || 0) +
      ((item?.margin || 0) * (item?.quantity || 0) * (item?.price || 0)) / 100;
    return { ...item, finalPrice };
  });

  const total = estimates.reduce((acc, cur) => acc + cur.finalPrice, 0);

  return { ...estimate, estimates, total };
};

export const calculateTotals = (
  estimateRecords: IEstimateRecord[]
): IEstimateTotal => {
  let subTotal = 0;
  let margin = 0;
  estimateRecords.forEach((estimateRecord) => {
    subTotal += estimateRecord.estimates.reduce(
      (acc, cur) => acc + (cur.quantity || 0) * (cur.price || 0),
      0
    );
    margin += estimateRecord.estimates.reduce(
      (acc, cur) =>
        acc +
        ((cur.margin || 0) / 100) * (cur.quantity || 0) * (cur.price || 0),
      0
    );
  });
  return { subTotal, margin, total: subTotal + margin };
};
