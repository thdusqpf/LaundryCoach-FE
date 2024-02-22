/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateLaundryTipsInput = {
  id?: string | null,
  title?: string | null,
  desc?: string | null,
  background_img?: string | null,
};

export type ModelLaundryTipsConditionInput = {
  title?: ModelStringInput | null,
  desc?: ModelStringInput | null,
  background_img?: ModelStringInput | null,
  and?: Array< ModelLaundryTipsConditionInput | null > | null,
  or?: Array< ModelLaundryTipsConditionInput | null > | null,
  not?: ModelLaundryTipsConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type LaundryTips = {
  __typename: "LaundryTips",
  id: string,
  title?: string | null,
  desc?: string | null,
  background_img?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateLaundryTipsInput = {
  id: string,
  title?: string | null,
  desc?: string | null,
  background_img?: string | null,
};

export type DeleteLaundryTipsInput = {
  id: string,
};

export type CreateSearchResultInput = {
  id?: string | null,
  user_id?: string | null,
  title: string,
  materials?: string | null,
  laundry_method?: Array< string | null > | null,
  summary?: string | null,
};

export type ModelSearchResultConditionInput = {
  user_id?: ModelStringInput | null,
  title?: ModelStringInput | null,
  materials?: ModelStringInput | null,
  laundry_method?: ModelStringInput | null,
  summary?: ModelStringInput | null,
  and?: Array< ModelSearchResultConditionInput | null > | null,
  or?: Array< ModelSearchResultConditionInput | null > | null,
  not?: ModelSearchResultConditionInput | null,
};

export type SearchResult = {
  __typename: "SearchResult",
  id: string,
  user_id?: string | null,
  title: string,
  materials?: string | null,
  laundry_method?: Array< string | null > | null,
  summary?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateSearchResultInput = {
  id: string,
  user_id?: string | null,
  title?: string | null,
  materials?: string | null,
  laundry_method?: Array< string | null > | null,
  summary?: string | null,
};

export type DeleteSearchResultInput = {
  id: string,
};

export type CreateMyClosetInput = {
  id?: string | null,
  user_id: string,
  title?: string | null,
  note?: string | null,
  imagePath?: string | null,
  symbols?: Array< string | null > | null,
};

export type ModelMyClosetConditionInput = {
  user_id?: ModelStringInput | null,
  title?: ModelStringInput | null,
  note?: ModelStringInput | null,
  imagePath?: ModelStringInput | null,
  symbols?: ModelStringInput | null,
  and?: Array< ModelMyClosetConditionInput | null > | null,
  or?: Array< ModelMyClosetConditionInput | null > | null,
  not?: ModelMyClosetConditionInput | null,
};

export type MyCloset = {
  __typename: "MyCloset",
  id: string,
  user_id: string,
  title?: string | null,
  note?: string | null,
  imagePath?: string | null,
  symbols?: Array< string | null > | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateMyClosetInput = {
  id: string,
  user_id?: string | null,
  title?: string | null,
  note?: string | null,
  imagePath?: string | null,
  symbols?: Array< string | null > | null,
};

export type DeleteMyClosetInput = {
  id: string,
};

export type CreateWashingMethodInput = {
  id?: string | null,
  category?: string | null,
  desc?: string | null,
  method_name?: string | null,
  symbol?: string | null,
};

export type ModelWashingMethodConditionInput = {
  category?: ModelStringInput | null,
  desc?: ModelStringInput | null,
  method_name?: ModelStringInput | null,
  symbol?: ModelStringInput | null,
  and?: Array< ModelWashingMethodConditionInput | null > | null,
  or?: Array< ModelWashingMethodConditionInput | null > | null,
  not?: ModelWashingMethodConditionInput | null,
};

export type WashingMethod = {
  __typename: "WashingMethod",
  id: string,
  category?: string | null,
  desc?: string | null,
  method_name?: string | null,
  symbol?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateWashingMethodInput = {
  id: string,
  category?: string | null,
  desc?: string | null,
  method_name?: string | null,
  symbol?: string | null,
};

export type DeleteWashingMethodInput = {
  id: string,
};

export type CreateAnalysisResultInput = {
  id?: string | null,
  user_id?: string | null,
  title?: string | null,
  imagePath?: string | null,
  symbol?: Array< string | null > | null,
  memo?: string | null,
};

export type ModelAnalysisResultConditionInput = {
  user_id?: ModelStringInput | null,
  title?: ModelStringInput | null,
  imagePath?: ModelStringInput | null,
  symbol?: ModelStringInput | null,
  memo?: ModelStringInput | null,
  and?: Array< ModelAnalysisResultConditionInput | null > | null,
  or?: Array< ModelAnalysisResultConditionInput | null > | null,
  not?: ModelAnalysisResultConditionInput | null,
};

export type AnalysisResult = {
  __typename: "AnalysisResult",
  id: string,
  user_id?: string | null,
  title?: string | null,
  imagePath?: string | null,
  symbol?: Array< string | null > | null,
  memo?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateAnalysisResultInput = {
  id: string,
  user_id?: string | null,
  title?: string | null,
  imagePath?: string | null,
  symbol?: Array< string | null > | null,
  memo?: string | null,
};

export type DeleteAnalysisResultInput = {
  id: string,
};

export type ModelLaundryTipsFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  desc?: ModelStringInput | null,
  background_img?: ModelStringInput | null,
  and?: Array< ModelLaundryTipsFilterInput | null > | null,
  or?: Array< ModelLaundryTipsFilterInput | null > | null,
  not?: ModelLaundryTipsFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelLaundryTipsConnection = {
  __typename: "ModelLaundryTipsConnection",
  items:  Array<LaundryTips | null >,
  nextToken?: string | null,
};

export type ModelSearchResultFilterInput = {
  id?: ModelIDInput | null,
  user_id?: ModelStringInput | null,
  title?: ModelStringInput | null,
  materials?: ModelStringInput | null,
  laundry_method?: ModelStringInput | null,
  summary?: ModelStringInput | null,
  and?: Array< ModelSearchResultFilterInput | null > | null,
  or?: Array< ModelSearchResultFilterInput | null > | null,
  not?: ModelSearchResultFilterInput | null,
};

export type ModelSearchResultConnection = {
  __typename: "ModelSearchResultConnection",
  items:  Array<SearchResult | null >,
  nextToken?: string | null,
};

export type ModelMyClosetFilterInput = {
  id?: ModelIDInput | null,
  user_id?: ModelStringInput | null,
  title?: ModelStringInput | null,
  note?: ModelStringInput | null,
  imagePath?: ModelStringInput | null,
  symbols?: ModelStringInput | null,
  and?: Array< ModelMyClosetFilterInput | null > | null,
  or?: Array< ModelMyClosetFilterInput | null > | null,
  not?: ModelMyClosetFilterInput | null,
};

export type ModelMyClosetConnection = {
  __typename: "ModelMyClosetConnection",
  items:  Array<MyCloset | null >,
  nextToken?: string | null,
};

export type ModelWashingMethodFilterInput = {
  id?: ModelIDInput | null,
  category?: ModelStringInput | null,
  desc?: ModelStringInput | null,
  method_name?: ModelStringInput | null,
  symbol?: ModelStringInput | null,
  and?: Array< ModelWashingMethodFilterInput | null > | null,
  or?: Array< ModelWashingMethodFilterInput | null > | null,
  not?: ModelWashingMethodFilterInput | null,
};

export type ModelWashingMethodConnection = {
  __typename: "ModelWashingMethodConnection",
  items:  Array<WashingMethod | null >,
  nextToken?: string | null,
};

export type ModelAnalysisResultFilterInput = {
  id?: ModelIDInput | null,
  user_id?: ModelStringInput | null,
  title?: ModelStringInput | null,
  imagePath?: ModelStringInput | null,
  symbol?: ModelStringInput | null,
  memo?: ModelStringInput | null,
  and?: Array< ModelAnalysisResultFilterInput | null > | null,
  or?: Array< ModelAnalysisResultFilterInput | null > | null,
  not?: ModelAnalysisResultFilterInput | null,
};

export type ModelAnalysisResultConnection = {
  __typename: "ModelAnalysisResultConnection",
  items:  Array<AnalysisResult | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionLaundryTipsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  desc?: ModelSubscriptionStringInput | null,
  background_img?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionLaundryTipsFilterInput | null > | null,
  or?: Array< ModelSubscriptionLaundryTipsFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionSearchResultFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  user_id?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  materials?: ModelSubscriptionStringInput | null,
  laundry_method?: ModelSubscriptionStringInput | null,
  summary?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSearchResultFilterInput | null > | null,
  or?: Array< ModelSubscriptionSearchResultFilterInput | null > | null,
};

export type ModelSubscriptionMyClosetFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  user_id?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  note?: ModelSubscriptionStringInput | null,
  imagePath?: ModelSubscriptionStringInput | null,
  symbols?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMyClosetFilterInput | null > | null,
  or?: Array< ModelSubscriptionMyClosetFilterInput | null > | null,
};

export type ModelSubscriptionWashingMethodFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  category?: ModelSubscriptionStringInput | null,
  desc?: ModelSubscriptionStringInput | null,
  method_name?: ModelSubscriptionStringInput | null,
  symbol?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionWashingMethodFilterInput | null > | null,
  or?: Array< ModelSubscriptionWashingMethodFilterInput | null > | null,
};

export type ModelSubscriptionAnalysisResultFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  user_id?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  imagePath?: ModelSubscriptionStringInput | null,
  symbol?: ModelSubscriptionStringInput | null,
  memo?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAnalysisResultFilterInput | null > | null,
  or?: Array< ModelSubscriptionAnalysisResultFilterInput | null > | null,
};

export type CreateLaundryTipsMutationVariables = {
  input: CreateLaundryTipsInput,
  condition?: ModelLaundryTipsConditionInput | null,
};

export type CreateLaundryTipsMutation = {
  createLaundryTips?:  {
    __typename: "LaundryTips",
    id: string,
    title?: string | null,
    desc?: string | null,
    background_img?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateLaundryTipsMutationVariables = {
  input: UpdateLaundryTipsInput,
  condition?: ModelLaundryTipsConditionInput | null,
};

export type UpdateLaundryTipsMutation = {
  updateLaundryTips?:  {
    __typename: "LaundryTips",
    id: string,
    title?: string | null,
    desc?: string | null,
    background_img?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteLaundryTipsMutationVariables = {
  input: DeleteLaundryTipsInput,
  condition?: ModelLaundryTipsConditionInput | null,
};

export type DeleteLaundryTipsMutation = {
  deleteLaundryTips?:  {
    __typename: "LaundryTips",
    id: string,
    title?: string | null,
    desc?: string | null,
    background_img?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSearchResultMutationVariables = {
  input: CreateSearchResultInput,
  condition?: ModelSearchResultConditionInput | null,
};

export type CreateSearchResultMutation = {
  createSearchResult?:  {
    __typename: "SearchResult",
    id: string,
    user_id?: string | null,
    title: string,
    materials?: string | null,
    laundry_method?: Array< string | null > | null,
    summary?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSearchResultMutationVariables = {
  input: UpdateSearchResultInput,
  condition?: ModelSearchResultConditionInput | null,
};

export type UpdateSearchResultMutation = {
  updateSearchResult?:  {
    __typename: "SearchResult",
    id: string,
    user_id?: string | null,
    title: string,
    materials?: string | null,
    laundry_method?: Array< string | null > | null,
    summary?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSearchResultMutationVariables = {
  input: DeleteSearchResultInput,
  condition?: ModelSearchResultConditionInput | null,
};

export type DeleteSearchResultMutation = {
  deleteSearchResult?:  {
    __typename: "SearchResult",
    id: string,
    user_id?: string | null,
    title: string,
    materials?: string | null,
    laundry_method?: Array< string | null > | null,
    summary?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMyClosetMutationVariables = {
  input: CreateMyClosetInput,
  condition?: ModelMyClosetConditionInput | null,
};

export type CreateMyClosetMutation = {
  createMyCloset?:  {
    __typename: "MyCloset",
    id: string,
    user_id: string,
    title?: string | null,
    note?: string | null,
    imagePath?: string | null,
    symbols?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMyClosetMutationVariables = {
  input: UpdateMyClosetInput,
  condition?: ModelMyClosetConditionInput | null,
};

export type UpdateMyClosetMutation = {
  updateMyCloset?:  {
    __typename: "MyCloset",
    id: string,
    user_id: string,
    title?: string | null,
    note?: string | null,
    imagePath?: string | null,
    symbols?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMyClosetMutationVariables = {
  input: DeleteMyClosetInput,
  condition?: ModelMyClosetConditionInput | null,
};

export type DeleteMyClosetMutation = {
  deleteMyCloset?:  {
    __typename: "MyCloset",
    id: string,
    user_id: string,
    title?: string | null,
    note?: string | null,
    imagePath?: string | null,
    symbols?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateWashingMethodMutationVariables = {
  input: CreateWashingMethodInput,
  condition?: ModelWashingMethodConditionInput | null,
};

export type CreateWashingMethodMutation = {
  createWashingMethod?:  {
    __typename: "WashingMethod",
    id: string,
    category?: string | null,
    desc?: string | null,
    method_name?: string | null,
    symbol?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateWashingMethodMutationVariables = {
  input: UpdateWashingMethodInput,
  condition?: ModelWashingMethodConditionInput | null,
};

export type UpdateWashingMethodMutation = {
  updateWashingMethod?:  {
    __typename: "WashingMethod",
    id: string,
    category?: string | null,
    desc?: string | null,
    method_name?: string | null,
    symbol?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteWashingMethodMutationVariables = {
  input: DeleteWashingMethodInput,
  condition?: ModelWashingMethodConditionInput | null,
};

export type DeleteWashingMethodMutation = {
  deleteWashingMethod?:  {
    __typename: "WashingMethod",
    id: string,
    category?: string | null,
    desc?: string | null,
    method_name?: string | null,
    symbol?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAnalysisResultMutationVariables = {
  input: CreateAnalysisResultInput,
  condition?: ModelAnalysisResultConditionInput | null,
};

export type CreateAnalysisResultMutation = {
  createAnalysisResult?:  {
    __typename: "AnalysisResult",
    id: string,
    user_id?: string | null,
    title?: string | null,
    imagePath?: string | null,
    symbol?: Array< string | null > | null,
    memo?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAnalysisResultMutationVariables = {
  input: UpdateAnalysisResultInput,
  condition?: ModelAnalysisResultConditionInput | null,
};

export type UpdateAnalysisResultMutation = {
  updateAnalysisResult?:  {
    __typename: "AnalysisResult",
    id: string,
    user_id?: string | null,
    title?: string | null,
    imagePath?: string | null,
    symbol?: Array< string | null > | null,
    memo?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAnalysisResultMutationVariables = {
  input: DeleteAnalysisResultInput,
  condition?: ModelAnalysisResultConditionInput | null,
};

export type DeleteAnalysisResultMutation = {
  deleteAnalysisResult?:  {
    __typename: "AnalysisResult",
    id: string,
    user_id?: string | null,
    title?: string | null,
    imagePath?: string | null,
    symbol?: Array< string | null > | null,
    memo?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetLaundryTipsQueryVariables = {
  id: string,
};

export type GetLaundryTipsQuery = {
  getLaundryTips?:  {
    __typename: "LaundryTips",
    id: string,
    title?: string | null,
    desc?: string | null,
    background_img?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListLaundryTipsQueryVariables = {
  filter?: ModelLaundryTipsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLaundryTipsQuery = {
  listLaundryTips?:  {
    __typename: "ModelLaundryTipsConnection",
    items:  Array< {
      __typename: "LaundryTips",
      id: string,
      title?: string | null,
      desc?: string | null,
      background_img?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSearchResultQueryVariables = {
  id: string,
};

export type GetSearchResultQuery = {
  getSearchResult?:  {
    __typename: "SearchResult",
    id: string,
    user_id?: string | null,
    title: string,
    materials?: string | null,
    laundry_method?: Array< string | null > | null,
    summary?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSearchResultsQueryVariables = {
  filter?: ModelSearchResultFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSearchResultsQuery = {
  listSearchResults?:  {
    __typename: "ModelSearchResultConnection",
    items:  Array< {
      __typename: "SearchResult",
      id: string,
      user_id?: string | null,
      title: string,
      materials?: string | null,
      laundry_method?: Array< string | null > | null,
      summary?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMyClosetQueryVariables = {
  id: string,
};

export type GetMyClosetQuery = {
  getMyCloset?:  {
    __typename: "MyCloset",
    id: string,
    user_id: string,
    title?: string | null,
    note?: string | null,
    imagePath?: string | null,
    symbols?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMyClosetsQueryVariables = {
  filter?: ModelMyClosetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMyClosetsQuery = {
  listMyClosets?:  {
    __typename: "ModelMyClosetConnection",
    items:  Array< {
      __typename: "MyCloset",
      id: string,
      user_id: string,
      title?: string | null,
      note?: string | null,
      imagePath?: string | null,
      symbols?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetWashingMethodQueryVariables = {
  id: string,
};

export type GetWashingMethodQuery = {
  getWashingMethod?:  {
    __typename: "WashingMethod",
    id: string,
    category?: string | null,
    desc?: string | null,
    method_name?: string | null,
    symbol?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListWashingMethodsQueryVariables = {
  filter?: ModelWashingMethodFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListWashingMethodsQuery = {
  listWashingMethods?:  {
    __typename: "ModelWashingMethodConnection",
    items:  Array< {
      __typename: "WashingMethod",
      id: string,
      category?: string | null,
      desc?: string | null,
      method_name?: string | null,
      symbol?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAnalysisResultQueryVariables = {
  id: string,
};

export type GetAnalysisResultQuery = {
  getAnalysisResult?:  {
    __typename: "AnalysisResult",
    id: string,
    user_id?: string | null,
    title?: string | null,
    imagePath?: string | null,
    symbol?: Array< string | null > | null,
    memo?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAnalysisResultsQueryVariables = {
  filter?: ModelAnalysisResultFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAnalysisResultsQuery = {
  listAnalysisResults?:  {
    __typename: "ModelAnalysisResultConnection",
    items:  Array< {
      __typename: "AnalysisResult",
      id: string,
      user_id?: string | null,
      title?: string | null,
      imagePath?: string | null,
      symbol?: Array< string | null > | null,
      memo?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateLaundryTipsSubscriptionVariables = {
  filter?: ModelSubscriptionLaundryTipsFilterInput | null,
};

export type OnCreateLaundryTipsSubscription = {
  onCreateLaundryTips?:  {
    __typename: "LaundryTips",
    id: string,
    title?: string | null,
    desc?: string | null,
    background_img?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateLaundryTipsSubscriptionVariables = {
  filter?: ModelSubscriptionLaundryTipsFilterInput | null,
};

export type OnUpdateLaundryTipsSubscription = {
  onUpdateLaundryTips?:  {
    __typename: "LaundryTips",
    id: string,
    title?: string | null,
    desc?: string | null,
    background_img?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteLaundryTipsSubscriptionVariables = {
  filter?: ModelSubscriptionLaundryTipsFilterInput | null,
};

export type OnDeleteLaundryTipsSubscription = {
  onDeleteLaundryTips?:  {
    __typename: "LaundryTips",
    id: string,
    title?: string | null,
    desc?: string | null,
    background_img?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSearchResultSubscriptionVariables = {
  filter?: ModelSubscriptionSearchResultFilterInput | null,
};

export type OnCreateSearchResultSubscription = {
  onCreateSearchResult?:  {
    __typename: "SearchResult",
    id: string,
    user_id?: string | null,
    title: string,
    materials?: string | null,
    laundry_method?: Array< string | null > | null,
    summary?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSearchResultSubscriptionVariables = {
  filter?: ModelSubscriptionSearchResultFilterInput | null,
};

export type OnUpdateSearchResultSubscription = {
  onUpdateSearchResult?:  {
    __typename: "SearchResult",
    id: string,
    user_id?: string | null,
    title: string,
    materials?: string | null,
    laundry_method?: Array< string | null > | null,
    summary?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSearchResultSubscriptionVariables = {
  filter?: ModelSubscriptionSearchResultFilterInput | null,
};

export type OnDeleteSearchResultSubscription = {
  onDeleteSearchResult?:  {
    __typename: "SearchResult",
    id: string,
    user_id?: string | null,
    title: string,
    materials?: string | null,
    laundry_method?: Array< string | null > | null,
    summary?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMyClosetSubscriptionVariables = {
  filter?: ModelSubscriptionMyClosetFilterInput | null,
};

export type OnCreateMyClosetSubscription = {
  onCreateMyCloset?:  {
    __typename: "MyCloset",
    id: string,
    user_id: string,
    title?: string | null,
    note?: string | null,
    imagePath?: string | null,
    symbols?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMyClosetSubscriptionVariables = {
  filter?: ModelSubscriptionMyClosetFilterInput | null,
};

export type OnUpdateMyClosetSubscription = {
  onUpdateMyCloset?:  {
    __typename: "MyCloset",
    id: string,
    user_id: string,
    title?: string | null,
    note?: string | null,
    imagePath?: string | null,
    symbols?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMyClosetSubscriptionVariables = {
  filter?: ModelSubscriptionMyClosetFilterInput | null,
};

export type OnDeleteMyClosetSubscription = {
  onDeleteMyCloset?:  {
    __typename: "MyCloset",
    id: string,
    user_id: string,
    title?: string | null,
    note?: string | null,
    imagePath?: string | null,
    symbols?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateWashingMethodSubscriptionVariables = {
  filter?: ModelSubscriptionWashingMethodFilterInput | null,
};

export type OnCreateWashingMethodSubscription = {
  onCreateWashingMethod?:  {
    __typename: "WashingMethod",
    id: string,
    category?: string | null,
    desc?: string | null,
    method_name?: string | null,
    symbol?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateWashingMethodSubscriptionVariables = {
  filter?: ModelSubscriptionWashingMethodFilterInput | null,
};

export type OnUpdateWashingMethodSubscription = {
  onUpdateWashingMethod?:  {
    __typename: "WashingMethod",
    id: string,
    category?: string | null,
    desc?: string | null,
    method_name?: string | null,
    symbol?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteWashingMethodSubscriptionVariables = {
  filter?: ModelSubscriptionWashingMethodFilterInput | null,
};

export type OnDeleteWashingMethodSubscription = {
  onDeleteWashingMethod?:  {
    __typename: "WashingMethod",
    id: string,
    category?: string | null,
    desc?: string | null,
    method_name?: string | null,
    symbol?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAnalysisResultSubscriptionVariables = {
  filter?: ModelSubscriptionAnalysisResultFilterInput | null,
};

export type OnCreateAnalysisResultSubscription = {
  onCreateAnalysisResult?:  {
    __typename: "AnalysisResult",
    id: string,
    user_id?: string | null,
    title?: string | null,
    imagePath?: string | null,
    symbol?: Array< string | null > | null,
    memo?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAnalysisResultSubscriptionVariables = {
  filter?: ModelSubscriptionAnalysisResultFilterInput | null,
};

export type OnUpdateAnalysisResultSubscription = {
  onUpdateAnalysisResult?:  {
    __typename: "AnalysisResult",
    id: string,
    user_id?: string | null,
    title?: string | null,
    imagePath?: string | null,
    symbol?: Array< string | null > | null,
    memo?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAnalysisResultSubscriptionVariables = {
  filter?: ModelSubscriptionAnalysisResultFilterInput | null,
};

export type OnDeleteAnalysisResultSubscription = {
  onDeleteAnalysisResult?:  {
    __typename: "AnalysisResult",
    id: string,
    user_id?: string | null,
    title?: string | null,
    imagePath?: string | null,
    symbol?: Array< string | null > | null,
    memo?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
