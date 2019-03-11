import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { fetchDecision } from "../../utils/api";

export class Decision extends React.Component {
  state = {
    decision: {}
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    fetchDecision(id).then(({ decision }) => this.setState({ decision }));
  }

  render() {
    const { decision } = this.state;

    return (
      <Grid container spacing={24} style={{ paddingTop: "40px" }}>
        <Grid xs={12}>
          <Typography variant="h4">{decision.title}</Typography>
        </Grid>
        <Grid xs={12} style={{ paddingTop: "40px" }}>
          <Typography variant="body1">
            <span dangerouslySetInnerHTML={{ __html: decision.html_content }} />
          </Typography>
        </Grid>
      </Grid>
    );
  }
}
