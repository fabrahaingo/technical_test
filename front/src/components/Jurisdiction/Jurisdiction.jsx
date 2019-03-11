import React from "react";
import { Link } from "react-router-dom";
import {
  List,
  Typography,
  Card,
  CardContent,
  Grid,
  ListItem
} from "@material-ui/core";
import {
  fetchJuridictionInfo,
  fetchJurisdiction,
  fetchTopDecisions
} from "../../utils/api";

const Item = ({ children, isChildren }) => (
  <span style={{ display: "flex", padding: isChildren ? "4px 8px" : "8px 0" }}>
    <Typography variant="body1">{children}</Typography>
  </span>
);

export class Jurisdiction extends React.Component {
  state = {
    jurisdiction_infos: {},
    jurisdiction_contact_infos: {},
    jurisdiction_top_decisions: []
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    fetchJurisdiction(id)
      .then(({ jurisdiction_infos }) => this.setState({ jurisdiction_infos }))
      .then(() => fetchJuridictionInfo(id))
      .then(({ jurisdiction_contact_infos }) =>
        this.setState({ jurisdiction_contact_infos })
      )
      .then(() => fetchTopDecisions(id))
      .then(({ jurisdiction_top_decisions }) =>
        this.setState({ jurisdiction_top_decisions })
      );
  }

  render() {
    const {
      jurisdiction_infos,
      jurisdiction_contact_infos,
      jurisdiction_top_decisions
    } = this.state;
    const { fax = [], telephone = [], email = [] } = jurisdiction_contact_infos;

    return (
      <Grid container spacing={24} style={{ paddingTop: "24px" }}>
        <Grid item xs={7}>
          <Card>
            <CardContent>
              <Typography variant="h6">{jurisdiction_infos.name}</Typography>

              <List>
                {jurisdiction_infos.commune_name && (
                  <Item>Ville: {jurisdiction_infos.commune_name}</Item>
                )}

                {jurisdiction_infos.address && (
                  <Item>Adresse: {jurisdiction_infos.address}</Item>
                )}

                {telephone.length > 0 && (
                  <>
                    <Item>
                      {telephone.length > 1 ? "Téléphones" : "Télépone"}
                    </Item>

                    {telephone.map(({ data, verified }) => (
                      <Item isChildren key={data}>
                        {data}: {verified ? "Vérifié" : "Non vérifié"}
                      </Item>
                    ))}
                  </>
                )}

                {fax.length > 0 && (
                  <>
                    <Item>Fax</Item>
                    {fax.map(({ data, verified }) => (
                      <Item isChildren key={data}>
                        {data}: {verified ? "Vérifié" : "Non vérifié"}
                      </Item>
                    ))}
                  </>
                )}

                {email.length > 0 && (
                  <>
                    <Item>{email.length > 1 ? "Emails" : "Email"}</Item>
                    {email.map(({ data, verified }) => (
                      <Item isChildren key={data}>
                        {data}: {verified ? "Vérifié" : "Non vérifié"}
                      </Item>
                    ))}
                  </>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={5}>
          <Card>
            <CardContent>
              <Typography variant="h6">Top decision</Typography>

              {jurisdiction_top_decisions.map(({ title, doc_id }) => (
                <Link to={`/d/${doc_id}`} key={doc_id}>
                  <ListItem button>
                    <Typography variant="body1">{title}</Typography>
                  </ListItem>
                </Link>
              ))}

              {jurisdiction_top_decisions.length === 0 && (
                <Typography variant="body1">
                  This jurisdiction does not already have top decisions
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
