import { useEffect, useState } from "react";
import EstimatesTable from "../../components/EstimatesTable";
import { Box, Button, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import EstimatesForm from "../../components/EstimatesForm";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  fetchEstimates,
  updateEstimate,
} from "../../store/slices/estimateSlice";
import { IEstimateRecord } from "../../components/EstimatesForm/EstimateRecord";

const Estimates = () => {
  const dispatch = useAppDispatch();
  const { estimates, loading, error } = useAppSelector(
    (state) => state.estimates
  );
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentEstimatesIndex, setCurrentEstimatesIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    dispatch(fetchEstimates());
  }, [dispatch]);

  const handleEdit = (index: number) => {
    setCurrentEstimatesIndex(index);
    setIsFormVisible(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const handleSubmitForm = (updatedEstimates: IEstimateRecord[]): void => {
    if (currentEstimatesIndex !== null) {
      dispatch(
        updateEstimate({
          index: currentEstimatesIndex,
          estimate: {
            ...estimates[currentEstimatesIndex],
            estimates: updatedEstimates,
          },
        })
      );
    }
    setIsFormVisible(false);
  };
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 500, marginBottom: 3 }}
        >
          {isFormVisible
            ? currentEstimatesIndex !== null
              ? "Edit"
              : "Add New "
            : ""}{" "}
          Estimates
        </Typography>
        {!isFormVisible && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setIsFormVisible(true)}
            sx={{ height: 44 }}
          >
            Add Project
          </Button>
        )}
      </Box>
      {isFormVisible ? (
        <EstimatesForm
          onCancel={() => setIsFormVisible(false)}
          onSubmit={handleSubmitForm}
          savedItem={
            currentEstimatesIndex !== null
              ? estimates[currentEstimatesIndex].estimates
              : undefined
          }
        />
      ) : (
        <>
          <EstimatesTable onEdit={handleEdit} estimates={estimates} />
        </>
      )}
    </Box>
  );
};

export default Estimates;
