import React, { useState, ChangeEvent } from "react";
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
  const defaultTimeWindow = currentTimeWindow || 'week';

  const defaultValues = {
    defaultValues: {
      timeWindow: defaultTimeWindow,
    }
  };

  const {
    control,
    handleSubmit,
  } = useForm<TimeWindow>(defaultValues);

  const [timeWindow, setTimeWindow] = useState(defaultTimeWindow);

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
      <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          control={control}
          name="timeWindow"
          render={({ field }) => (
            <TextField
              {...field}
              helperText="Choose your time period"
              id="select-timeWindow"
              select
              variant="outlined"
              value={timeWindow || ''} //CANT BE UNDEFINED
              onChange={handleTimeWindowChange}
              
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
      </form>
    </Box>
  );
};

export default TimeWindowSelector;
