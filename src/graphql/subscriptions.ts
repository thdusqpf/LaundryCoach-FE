/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateLaundryTips = /* GraphQL */ `subscription OnCreateLaundryTips(
  $filter: ModelSubscriptionLaundryTipsFilterInput
) {
  onCreateLaundryTips(filter: $filter) {
    id
    title
    desc
    background_img
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateLaundryTipsSubscriptionVariables,
  APITypes.OnCreateLaundryTipsSubscription
>;
export const onUpdateLaundryTips = /* GraphQL */ `subscription OnUpdateLaundryTips(
  $filter: ModelSubscriptionLaundryTipsFilterInput
) {
  onUpdateLaundryTips(filter: $filter) {
    id
    title
    desc
    background_img
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateLaundryTipsSubscriptionVariables,
  APITypes.OnUpdateLaundryTipsSubscription
>;
export const onDeleteLaundryTips = /* GraphQL */ `subscription OnDeleteLaundryTips(
  $filter: ModelSubscriptionLaundryTipsFilterInput
) {
  onDeleteLaundryTips(filter: $filter) {
    id
    title
    desc
    background_img
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteLaundryTipsSubscriptionVariables,
  APITypes.OnDeleteLaundryTipsSubscription
>;
export const onCreateSearchResult = /* GraphQL */ `subscription OnCreateSearchResult(
  $filter: ModelSubscriptionSearchResultFilterInput
) {
  onCreateSearchResult(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateSearchResultSubscriptionVariables,
  APITypes.OnCreateSearchResultSubscription
>;
export const onUpdateSearchResult = /* GraphQL */ `subscription OnUpdateSearchResult(
  $filter: ModelSubscriptionSearchResultFilterInput
) {
  onUpdateSearchResult(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateSearchResultSubscriptionVariables,
  APITypes.OnUpdateSearchResultSubscription
>;
export const onDeleteSearchResult = /* GraphQL */ `subscription OnDeleteSearchResult(
  $filter: ModelSubscriptionSearchResultFilterInput
) {
  onDeleteSearchResult(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteSearchResultSubscriptionVariables,
  APITypes.OnDeleteSearchResultSubscription
>;
export const onCreateMyCloset = /* GraphQL */ `subscription OnCreateMyCloset($filter: ModelSubscriptionMyClosetFilterInput) {
  onCreateMyCloset(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateMyClosetSubscriptionVariables,
  APITypes.OnCreateMyClosetSubscription
>;
export const onUpdateMyCloset = /* GraphQL */ `subscription OnUpdateMyCloset($filter: ModelSubscriptionMyClosetFilterInput) {
  onUpdateMyCloset(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateMyClosetSubscriptionVariables,
  APITypes.OnUpdateMyClosetSubscription
>;
export const onDeleteMyCloset = /* GraphQL */ `subscription OnDeleteMyCloset($filter: ModelSubscriptionMyClosetFilterInput) {
  onDeleteMyCloset(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteMyClosetSubscriptionVariables,
  APITypes.OnDeleteMyClosetSubscription
>;
export const onCreateWashingMethod = /* GraphQL */ `subscription OnCreateWashingMethod(
  $filter: ModelSubscriptionWashingMethodFilterInput
) {
  onCreateWashingMethod(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateWashingMethodSubscriptionVariables,
  APITypes.OnCreateWashingMethodSubscription
>;
export const onUpdateWashingMethod = /* GraphQL */ `subscription OnUpdateWashingMethod(
  $filter: ModelSubscriptionWashingMethodFilterInput
) {
  onUpdateWashingMethod(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateWashingMethodSubscriptionVariables,
  APITypes.OnUpdateWashingMethodSubscription
>;
export const onDeleteWashingMethod = /* GraphQL */ `subscription OnDeleteWashingMethod(
  $filter: ModelSubscriptionWashingMethodFilterInput
) {
  onDeleteWashingMethod(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteWashingMethodSubscriptionVariables,
  APITypes.OnDeleteWashingMethodSubscription
>;
export const onCreateAnalysisResult = /* GraphQL */ `subscription OnCreateAnalysisResult(
  $filter: ModelSubscriptionAnalysisResultFilterInput
) {
  onCreateAnalysisResult(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAnalysisResultSubscriptionVariables,
  APITypes.OnCreateAnalysisResultSubscription
>;
export const onUpdateAnalysisResult = /* GraphQL */ `subscription OnUpdateAnalysisResult(
  $filter: ModelSubscriptionAnalysisResultFilterInput
) {
  onUpdateAnalysisResult(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAnalysisResultSubscriptionVariables,
  APITypes.OnUpdateAnalysisResultSubscription
>;
export const onDeleteAnalysisResult = /* GraphQL */ `subscription OnDeleteAnalysisResult(
  $filter: ModelSubscriptionAnalysisResultFilterInput
) {
  onDeleteAnalysisResult(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAnalysisResultSubscriptionVariables,
  APITypes.OnDeleteAnalysisResultSubscription
>;
