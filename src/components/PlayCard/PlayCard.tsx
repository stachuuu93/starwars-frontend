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
import { green, red } from "@mui/material/colors";
import { capitalize } from "lodash";

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
        <ListItemText>{`${capitalize(key)}: ${value}`}</ListItemText>
      </ListItem>
    ));

  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardHeader
        title={attributes.name}
        subheader={capitalize(type)}
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
