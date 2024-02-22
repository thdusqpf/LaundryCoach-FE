/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createLaundryTips = /* GraphQL */ `mutation CreateLaundryTips(
  $input: CreateLaundryTipsInput!
  $condition: ModelLaundryTipsConditionInput
) {
  createLaundryTips(input: $input, condition: $condition) {
    id
    title
    desc
    background_img
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateLaundryTipsMutationVariables,
  APITypes.CreateLaundryTipsMutation
>;
export const updateLaundryTips = /* GraphQL */ `mutation UpdateLaundryTips(
  $input: UpdateLaundryTipsInput!
  $condition: ModelLaundryTipsConditionInput
) {
  updateLaundryTips(input: $input, condition: $condition) {
    id
    title
    desc
    background_img
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateLaundryTipsMutationVariables,
  APITypes.UpdateLaundryTipsMutation
>;
export const deleteLaundryTips = /* GraphQL */ `mutation DeleteLaundryTips(
  $input: DeleteLaundryTipsInput!
  $condition: ModelLaundryTipsConditionInput
) {
  deleteLaundryTips(input: $input, condition: $condition) {
    id
    title
    desc
    background_img
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteLaundryTipsMutationVariables,
  APITypes.DeleteLaundryTipsMutation
>;
export const createSearchResult = /* GraphQL */ `mutation CreateSearchResult(
  $input: CreateSearchResultInput!
  $condition: ModelSearchResultConditionInput
) {
  createSearchResult(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateSearchResultMutationVariables,
  APITypes.CreateSearchResultMutation
>;
export const updateSearchResult = /* GraphQL */ `mutation UpdateSearchResult(
  $input: UpdateSearchResultInput!
  $condition: ModelSearchResultConditionInput
) {
  updateSearchResult(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateSearchResultMutationVariables,
  APITypes.UpdateSearchResultMutation
>;
export const deleteSearchResult = /* GraphQL */ `mutation DeleteSearchResult(
  $input: DeleteSearchResultInput!
  $condition: ModelSearchResultConditionInput
) {
  deleteSearchResult(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteSearchResultMutationVariables,
  APITypes.DeleteSearchResultMutation
>;
export const createMyCloset = /* GraphQL */ `mutation CreateMyCloset(
  $input: CreateMyClosetInput!
  $condition: ModelMyClosetConditionInput
) {
  createMyCloset(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateMyClosetMutationVariables,
  APITypes.CreateMyClosetMutation
>;
export const updateMyCloset = /* GraphQL */ `mutation UpdateMyCloset(
  $input: UpdateMyClosetInput!
  $condition: ModelMyClosetConditionInput
) {
  updateMyCloset(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateMyClosetMutationVariables,
  APITypes.UpdateMyClosetMutation
>;
export const deleteMyCloset = /* GraphQL */ `mutation DeleteMyCloset(
  $input: DeleteMyClosetInput!
  $condition: ModelMyClosetConditionInput
) {
  deleteMyCloset(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteMyClosetMutationVariables,
  APITypes.DeleteMyClosetMutation
>;
export const createWashingMethod = /* GraphQL */ `mutation CreateWashingMethod(
  $input: CreateWashingMethodInput!
  $condition: ModelWashingMethodConditionInput
) {
  createWashingMethod(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateWashingMethodMutationVariables,
  APITypes.CreateWashingMethodMutation
>;
export const updateWashingMethod = /* GraphQL */ `mutation UpdateWashingMethod(
  $input: UpdateWashingMethodInput!
  $condition: ModelWashingMethodConditionInput
) {
  updateWashingMethod(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateWashingMethodMutationVariables,
  APITypes.UpdateWashingMethodMutation
>;
export const deleteWashingMethod = /* GraphQL */ `mutation DeleteWashingMethod(
  $input: DeleteWashingMethodInput!
  $condition: ModelWashingMethodConditionInput
) {
  deleteWashingMethod(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteWashingMethodMutationVariables,
  APITypes.DeleteWashingMethodMutation
>;
export const createAnalysisResult = /* GraphQL */ `mutation CreateAnalysisResult(
  $input: CreateAnalysisResultInput!
  $condition: ModelAnalysisResultConditionInput
) {
  createAnalysisResult(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateAnalysisResultMutationVariables,
  APITypes.CreateAnalysisResultMutation
>;
export const updateAnalysisResult = /* GraphQL */ `mutation UpdateAnalysisResult(
  $input: UpdateAnalysisResultInput!
  $condition: ModelAnalysisResultConditionInput
) {
  updateAnalysisResult(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateAnalysisResultMutationVariables,
  APITypes.UpdateAnalysisResultMutation
>;
export const deleteAnalysisResult = /* GraphQL */ `mutation DeleteAnalysisResult(
  $input: DeleteAnalysisResultInput!
  $condition: ModelAnalysisResultConditionInput
) {
  deleteAnalysisResult(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteAnalysisResultMutationVariables,
  APITypes.DeleteAnalysisResultMutation
>;
