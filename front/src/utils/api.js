import { ENDPOINT } from "../config";

export const fetchJurisdiction = id => {
  return fetch(`${ENDPOINT}/jurisdiction/${id}`).then(response =>
    response.json()
  );
};

export const fetchDecision = id => {
  return fetch(`${ENDPOINT}/getDecision?doc_id=${id}`).then(response =>
    response.json()
  );
};

export const fetchJuridictionInfo = id => {
  return fetch(
    `${ENDPOINT}/getJurisdictionContactInfos?jurisdiction_id=${id}`
  ).then(response => response.json());
};

export const fetchTopDecisions = id => {
  return fetch(
    `${ENDPOINT}/getJurisdictionTopDecisions?jurisdiction_id=${id}`
  ).then(response => {
    if (response.status === 200) return response.json();
    return Promise.reject("You have to implement this route");
  });
};
