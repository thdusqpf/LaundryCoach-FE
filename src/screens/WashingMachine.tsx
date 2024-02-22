import React from 'react';
import LottieView from 'lottie-react-native';

const WashingMachine = () => {
  return <LottieView source={require('../../assets/animations/LaundryCoach.json')} style={{width: 200, height: 200}} autoPlay loop />;
};

export default WashingMachine;