import React, { useEffect, useState } from "react";
import Navigation from "./src/navigations";
import { generateClient } from 'aws-amplify/api';
import {
  withAuthenticator,
  useAuthenticator
} from '@aws-amplify/ui-react-native';
import { SafeAreaView, Text,View } from "react-native";

const userSelector = (context) => [context.user];
const client = generateClient();

const App = () => {
  return (
    <Navigation />
  )
}
export default withAuthenticator(App);