import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";

function AddComponents(props) {
  const [component, setComponent] = useState("");
  const [componentId, setComponentId] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [description, setDescription] = useState("");

  const handleAddComponent = () => {
    // Validate component data
    if (component.trim() === "" || componentId.trim() === "") {
      alert("Please enter component name and ID.");
      return;
    }

    // Create new component object
    const newComponent = {
      component: component,
      componentId: componentId,
      serialNumber: serialNumber,
      description: description,
    };

    // Pass the new component to the parent component
    props.onAddComponent(newComponent);

    // Reset component form fields
    setComponent("");
    setComponentId("");
    setSerialNumber("");
    setDescription("");
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Add Component</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Component Name"
          fullWidth
          value={component}
          onChange={(e) => setComponent(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Component ID"
          fullWidth
          value={componentId}
          onChange={(e) => setComponentId(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Serial Number"
          fullWidth
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddComponent} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddComponents.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddComponent: PropTypes.func.isRequired,
};

export default AddComponents;
