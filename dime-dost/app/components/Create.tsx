import React, { useState } from "react";
import TextFields from "../components/TextFields";
import TextAreas from "../components/TextArea";
import { createTheme, ThemeProvider, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import MyDatePicker from "./DatePicker";

interface Props {
  open: boolean;
  handleClose: () => void;
}
const CreateExpense: React.FC<Props> = ({ open, handleClose }) => {
  const defaultTheme = createTheme();
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [amount, setAmount] = useState(0);
  const [amountError, setAmountError] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [shortDescriptionError, setShortDescriptionError] = useState("");
  const [date, setDate] = useState("");

  const modalClose = () => {
    console.log("closing modal");
    handleClose();
  };

  const handleSubmitCreate = async () => {
    console.log("creating expense");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Dialog
        open={open}
        onClose={modalClose}
        PaperProps={{
          component: "form",
          style: {
            boxShadow: "none",
            width: "100%",
            maxWidth: "650px", // Ensure responsiveness on larger screens
            padding: "10px",
          },
        }}
      >
        <DialogTitle>
          Create Expense
          <Button
            onClick={modalClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "transparent",
            }}
          >
            X
          </Button>
        </DialogTitle>

        <DialogContent className="space-y-2" dividers>
          <Grid container spacing={2}>
            {/* Title Field */}
            <Grid item xs={12} sm={6}>
              <TextFields
                inputText={title}
                setInputText={(value: string | number) =>
                  setTitle(value as string)
                }
                setHelperText={(value: string | number | null) =>
                  setTitleError(value as string)
                }
                error={titleError}
                label="Title *"
                type="text"
                InputProps={{}}
                style={{}}
              />
            </Grid>

            {/* Amount Field */}
            <Grid item xs={12} sm={6}>
              <TextFields
                inputText={amount}
                setInputText={(value: string | number) =>
                  setAmount(value as number)
                }
                setHelperText={(value: string | number | null) =>
                  setAmountError(value as string)
                }
                error={amountError}
                label="Amount *"
                type="number"
                InputProps={{}}
                style={{}}

              />
            </Grid>

            {/* Short Description */}
            <Grid item xs={12}>
              <TextAreas
                label="Short Description *"
                inputText={shortDescription}
                setInputText={(value: string | number) =>
                  setShortDescription(value as string)
                }
                setHelperText={(value: string | number | null) =>
                  setShortDescriptionError(value as string)
                }
                error={shortDescriptionError}
                maxRows={1}
                minRows={1}
                style={{ width: "100%" }}
              />
            </Grid>

            {/* Date Picker */}
            <Grid item xs={12} sm={6}>
              <MyDatePicker />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button color="error" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={handleSubmitCreate}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default CreateExpense;
