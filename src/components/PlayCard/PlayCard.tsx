import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { green, purple, red, yellow } from "@mui/material/colors";
import { startCase } from "lodash";

import { CharacterAttributes, StarshipAttributes } from "../../types";

export interface PlayCardProps {
  attributes: CharacterAttributes | StarshipAttributes;
  imageUrl?: string;
  type: "character" | "starship";
}

const PlayCard = ({ attributes, imageUrl, type }: PlayCardProps) => {
  const attribiutesList = Object.entries(attributes)
    .filter(([key]) => key !== "name")
    .map(([key, value]) => (
      <ListItem>
        <ListItemText>{`${startCase(key)}: ${value}`}</ListItemText>
      </ListItem>
    ));

  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: purple[900],
        color: yellow[100],
        width: "300px",
      }}
    >
      <CardHeader
        title={attributes.name}
        subheader={startCase(type)}
        avatar={
          <Avatar
            sx={{ bgcolor: type === "character" ? red[600] : green[300] }}
          >
            {type.slice(0, 1).toUpperCase()}
          </Avatar>
        }
      />
      {imageUrl && (
        <CardMedia
          component="div"
          image={imageUrl}
          sx={{ height: "200px", backgroundPosition: "top" }}
        />
      )}
      <CardContent>
        <List dense>{attribiutesList}</List>
      </CardContent>
    </Card>
  );
};

export default PlayCard;
