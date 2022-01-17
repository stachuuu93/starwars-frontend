import {
  Avatar,
  Box,
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

import { AttributesState, Resource } from "../../types";

export interface PlayCardProps {
  resource: Resource;
  type: "character" | "starship";
  side: "left" | "right";
  attributesState: AttributesState;
}

const PlayCard = ({ resource, type, side, attributesState }: PlayCardProps) => {
  const { name, imageUrl, ...attributes } = resource;

  const getAttributeColor = (attributeName: string) => {
    if (attributesState[attributeName]) {
      return attributesState[attributeName] === side ? green[700] : red[700];
    }
    return "inherit";
  };

  const attribiutesList = Object.entries(attributes).map(
    ([attributeName, value]) => (
      <ListItem key={attributeName}>
        <ListItemText>
          {`${startCase(attributeName)}: `}
          <Box display="inline" color={getAttributeColor(attributeName)}>
            {value}
          </Box>
        </ListItemText>
      </ListItem>
    )
  );

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
        title={name}
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
