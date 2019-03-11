import React from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Card,
  CardContent
} from "@material-ui/core";
import { ENDPOINT } from "../../config";

export class Home extends React.Component {
  state = {
    links: []
  };

  componentDidMount() {
    return fetch(ENDPOINT)
      .then(response => response.json())
      .then(({ links }) => this.setState({ links }));
  }

  render() {
    return (
      <div style={{ paddingTop: "24px" }}>
        {this.state.links.length > 0 && (
          <>
            <Card>
              <CardContent>
                <Typography variant="h4">Jurisdictions sample</Typography>

                <List component="nav">
                  {this.state.links.map(({ id, title, url }) => (
                    <Link to={url} key={url}>
                      <ListItem button>
                        <ListItemText primary={title} />
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    );
  }
}
