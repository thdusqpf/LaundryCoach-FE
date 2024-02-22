/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getLaundryTips = /* GraphQL */ `query GetLaundryTips($id: ID!) {
  getLaundryTips(id: $id) {
    id
    title
    desc
    background_img
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetLaundryTipsQueryVariables,
  APITypes.GetLaundryTipsQuery
>;
export const listLaundryTips = /* GraphQL */ `query ListLaundryTips(
  $filter: ModelLaundryTipsFilterInput
  $limit: Int
  $nextToken: String
) {
  listLaundryTips(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      desc
      background_img
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListLaundryTipsQueryVariables,
  APITypes.ListLaundryTipsQuery
>;
export const getSearchResult = /* GraphQL */ `query GetSearchResult($id: ID!) {
  getSearchResult(id: $id) {
    id
    user_id
    title
    materials
    laundry_method
    summary
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSearchResultQueryVariables,
  APITypes.GetSearchResultQuery
>;
export const listSearchResults = /* GraphQL */ `query ListSearchResults(
  $filter: ModelSearchResultFilterInput
  $limit: Int
  $nextToken: String
) {
  listSearchResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user_id
      title
      materials
      laundry_method
      summary
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSearchResultsQueryVariables,
  APITypes.ListSearchResultsQuery
>;
export const getMyCloset = /* GraphQL */ `query GetMyCloset($id: ID!) {
  getMyCloset(id: $id) {
    id
    user_id
    title
    note
    imagePath
    symbols
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMyClosetQueryVariables,
  APITypes.GetMyClosetQuery
>;
export const listMyClosets = /* GraphQL */ `query ListMyClosets(
  $filter: ModelMyClosetFilterInput
  $limit: Int
  $nextToken: String
) {
  listMyClosets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user_id
      title
      note
      imagePath
      symbols
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMyClosetsQueryVariables,
  APITypes.ListMyClosetsQuery
>;
export const getWashingMethod = /* GraphQL */ `query GetWashingMethod($id: ID!) {
  getWashingMethod(id: $id) {
    id
    category
    desc
    method_name
    symbol
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetWashingMethodQueryVariables,
  APITypes.GetWashingMethodQuery
>;
export const listWashingMethods = /* GraphQL */ `query ListWashingMethods(
  $filter: ModelWashingMethodFilterInput
  $limit: Int
  $nextToken: String
) {
  listWashingMethods(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      category
      desc
      method_name
      symbol
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListWashingMethodsQueryVariables,
  APITypes.ListWashingMethodsQuery
>;
export const getAnalysisResult = /* GraphQL */ `query GetAnalysisResult($id: ID!) {
  getAnalysisResult(id: $id) {
    id
    user_id
    title
    imagePath
    symbol
    memo
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAnalysisResultQueryVariables,
  APITypes.GetAnalysisResultQuery
>;
export const listAnalysisResults = /* GraphQL */ `query ListAnalysisResults(
  $filter: ModelAnalysisResultFilterInput
  $limit: Int
  $nextToken: String
) {
  listAnalysisResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user_id
      title
      imagePath
      symbol
      memo
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAnalysisResultsQueryVariables,
  APITypes.ListAnalysisResultsQuery
>;
