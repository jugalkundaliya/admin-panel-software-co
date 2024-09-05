import React from "react";
import { Box, InputAdornment, TextField, styled } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";

const Container = styled(Box)`
  display: flex;
  align-items: center;
  position: relative;
`;

const Line = styled("div")(({ theme }) => ({
  width: "20px",
  backgroundColor: theme.palette.divider,
  height: 2,
}));

const Add: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <AddIcon
    onClick={onClick}
    sx={{
      fontSize: "1.5rem",
      color: (theme) => theme.palette.white.main,
      bgcolor: (theme) => theme.palette.black.main,
      borderRadius: "50%",
      cursor: "pointer",
    }}
  />
);

const Remove: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <RemoveIcon
    onClick={onClick}
    sx={{
      fontSize: "1.5rem",
      bgcolor: (theme) => theme.palette.grey[400],
      color: (theme) => theme.palette.white.main,
      borderRadius: "50%",
      cursor: "pointer",
    }}
  />
);

export type IEstimateRecord = {
  item: string;
  total: number;
  estimates: {
    name?: string;
    description?: string;
    unit?: string;
    quantity?: number;
    price?: number;
    margin?: number;
    finalPrice?: number;
  }[];
};

type EstimateRecordProps = {
  item: IEstimateRecord;
  onChange: (record: IEstimateRecord) => void;
  onAddItem: () => void;
};

const EstimateRecord: React.FC<EstimateRecordProps> = ({
  item,
  onChange,
  onAddItem,
}) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof IEstimateRecord
  ) => {
    onChange({ ...item, [key]: event.target.value });
  };

  const handleEstimateItemChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    key: keyof IEstimateRecord["estimates"][number]
  ) => {
    onChange({
      ...item,
      estimates: item.estimates.map((estimate, estimateIndex) =>
        estimateIndex === index
          ? {
              ...estimate,
              [key]: event.target.value,
            }
          : estimate
      ),
    });
  };

  const addEstimateRecord = () =>
    onChange({
      ...item,
      estimates: [...item.estimates, {}],
    });

  const removeEstimateRecord = (index: number) =>
    onChange({
      ...item,
      estimates: item.estimates.filter(
        (_estimate, estimateIndex) => estimateIndex !== index
      ),
    });

  return (
    <Box sx={{ margin: "30px 0" }}>
      <Container>
        <Add onClick={onAddItem} />
        <Line />
        <TextField
          variant="outlined"
          placeholder="Sample Section"
          sx={{ minWidth: 250 }}
          value={item.item}
          onChange={(e) => handleChange(e, "item")}
        />
        <Line sx={{ flex: 1 }} />
        <TextField
          variant="outlined"
          type="number"
          placeholder="0.00"
          disabled
          value={item.total}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment sx={{ fontWeight: 700 }} position="start">
                  $
                </InputAdornment>
              ),
            },
          }}
        />
      </Container>
      {item.estimates.map((estimate, index) => (
        <Container
          sx={{ marginTop: 3, gap: 2.5, marginLeft: 5.5, marginRight: 2 }}
          key={index}
        >
          <TextField
            variant="outlined"
            placeholder="Item Name"
            sx={{ minWidth: 200 }}
            value={estimate.name}
            onChange={(e) => handleEstimateItemChange(e, index, "name")}
          />
          <TextField
            variant="outlined"
            placeholder="Item Description"
            sx={{ minWidth: 200 }}
            value={estimate.description}
            onChange={(e) => handleEstimateItemChange(e, index, "description")}
          />
          <TextField
            variant="outlined"
            placeholder="Unit"
            type="string"
            value={estimate.unit}
            onChange={(e) => handleEstimateItemChange(e, index, "unit")}
          />
          <TextField
            variant="outlined"
            placeholder="Quantity"
            type="number"
            value={estimate.quantity}
            onChange={(e) => handleEstimateItemChange(e, index, "quantity")}
          />
          <TextField
            variant="outlined"
            placeholder="Price"
            type="number"
            value={estimate.price}
            onChange={(e) => handleEstimateItemChange(e, index, "price")}
          />
          <TextField
            variant="outlined"
            placeholder="Margin"
            type="number"
            value={estimate.margin}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment sx={{ fontWeight: 700 }} position="start">
                    %
                  </InputAdornment>
                ),
              },
            }}
            onChange={(e) => handleEstimateItemChange(e, index, "margin")}
          />
          <TextField
            variant="outlined"
            placeholder="Total"
            type="number"
            value={estimate.finalPrice}
            disabled
          />
          <Add onClick={addEstimateRecord} />
          {index !== 0 && (
            <Remove onClick={() => removeEstimateRecord(index)} />
          )}
        </Container>
      ))}
    </Box>
  );
};

export default EstimateRecord;
