import React from "react";
import Badge from "@mui/material/Badge";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
import { useAppSelector } from "../../store/hooks";
import { selectAll } from "../../store/modules/notesSlice";

const NotesCounter: React.FC = () => {
  const listNotes = useAppSelector(selectAll);

  return (
    <Badge
      badgeContent={listNotes.length}
      color="secondary"
    >
      <FormatListNumberedRtlIcon />
    </Badge>
  );
};

export default NotesCounter;
