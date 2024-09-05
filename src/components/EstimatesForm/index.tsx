import { useEffect, useState } from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import EstimateRecord, { IEstimateRecord } from "./EstimateRecord";
import {
  calculateEstimates,
  calculateTotals,
} from "../../utils/estimateCalculator";
import { formattedUSD } from "../../utils/numberFormatter";

export type IEstimateTotal = {
  subTotal: number;
  margin: number;
  total: number;
};

export type EstimatesFormProps = {
  onSubmit: (estimate: IEstimateRecord[]) => void;
  onCancel: () => void;
  savedItem?: IEstimateRecord[];
};

const EstimatesForm: React.FC<EstimatesFormProps> = ({
  onSubmit,
  onCancel,
  savedItem,
}) => {
  const [estimates, setEstimates] = useState<IEstimateRecord[]>(
    savedItem?.length
      ? savedItem
      : [
          {
            item: "",
            total: 0,
            estimates: [{}],
          },
        ]
  );

  const [total, setTotal] = useState<IEstimateTotal>();

  useEffect(() => {
    setTotal(calculateTotals(estimates));
  }, [estimates]);

  const handleEstimateChange = (
    updatedEstimate: IEstimateRecord,
    index: number
  ) =>
    setEstimates((prev) =>
      prev.map((item, i) =>
        i === index ? calculateEstimates(updatedEstimate) : item
      )
    );

  const handleAddItem = () =>
    setEstimates((prev) => [
      ...prev,
      {
        item: "",
        total: 0,
        estimates: [{}],
      },
    ]);

  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 24px",
          "> *": { fontWeight: 500 },
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Typography>ITEM</Typography>
        <Typography>DESCRIPTION</Typography>
        <Typography>UNIT</Typography>
        <Typography>QUANTITY</Typography>
        <Typography>PRICE ($)</Typography>
        <Typography>MARGIN (+/-)`</Typography>
      </Box>
      <Box
        sx={{
          padding: "8px 24px",
          input: {
            padding: "12px 8px",
          },
        }}
      >
        {estimates.map((estimate, index) => (
          <EstimateRecord
            item={estimate}
            onChange={(item) => handleEstimateChange(item, index)}
            onAddItem={handleAddItem}
          />
        ))}
        {!!total?.subTotal && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                borderTop: "1px solid #e0e0e0",
                padding: "12px 24px",
                display: "flex",
                width: "500px",
                justifyContent: "space-between",
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              <Typography>Sub Total</Typography>
              <Typography>{formattedUSD(total?.subTotal || 0)}</Typography>
            </Box>
            <Box
              sx={{
                borderTop: "1px solid #e0e0e0",
                padding: "12px 24px",
                display: "flex",
                width: "500px",
                justifyContent: "space-between",
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              <Typography>Total Margin</Typography>
              <Typography>{formattedUSD(total?.margin || 0)}</Typography>
            </Box>
            <Box
              sx={{
                borderTop: "1px solid #e0e0e0",
                padding: "12px 24px",
                display: "flex",
                width: "500px",
                justifyContent: "space-between",
                fontWeight: 700,
              }}
            >
              <Typography>Total Amount</Typography>
              <Typography>{formattedUSD(total?.total || 0)}</Typography>
            </Box>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            gap: 4,
            justifyContent: "flex-end",
            width: "100%",
            marginTop: 2,
            button: {
              padding: "10px",
              width: "200px",
              borderRadius: 2,
            },
          }}
        >
          <Button
            variant="outlined"
            sx={{ textTransform: "none" }}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={() => onSubmit(estimates)}>
            SUBMIT
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default EstimatesForm;
