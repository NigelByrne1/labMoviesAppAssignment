import React, { useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import styles from "./styles";
import timeWindows from "./timeWindowOptions";
import { TimeWindow } from "../../types/interfaces";

interface TimeWindowSelectorProps {
  currentTimeWindow: string;
  onTimeWindowChange: (timeWindow: string) => void;
}

const TimeWindowSelector: React.FC<TimeWindowSelectorProps> = ({ 
  currentTimeWindow, 
  onTimeWindowChange 
}) => {
  const defaultValues = {
    defaultValues: {
      timeWindow: currentTimeWindow,
    }
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TimeWindow>(defaultValues);

  const [timeWindow, setTimeWindow] = useState(currentTimeWindow);

  const handleTimeWindowChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTimeWindow = event.target.value;
    setTimeWindow(newTimeWindow);
    onTimeWindowChange(newTimeWindow);
  };

  const onSubmit: SubmitHandler<TimeWindow> = (formData) => {
    onTimeWindowChange(formData.timeWindow);
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Select Time Period
      </Typography>

      <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          control={control}
          name="timeWindow"
          render={({ field }) => (
            <TextField
              {...field}
              id="select-timeWindow"
              select
              variant="outlined"
              label="Time Period Select"
              value={timeWindow}
              onChange={handleTimeWindowChange}
              helperText="Choose your time period"
              sx={styles.textField}
            >
              {timeWindows.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={styles.submit}
          >
            Apply
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            sx={styles.submit}
            onClick={() => {
              reset({
                timeWindow: currentTimeWindow,
              });
              setTimeWindow(currentTimeWindow);
            }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default TimeWindowSelector;
