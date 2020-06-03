import React from 'react';
import styled from '@emotion/styled';
import facebook from './facebook.png';
import twitter from './twitter.png';
import instagram from './instagram.png';
import { Subtitle, Title } from '../../styles/shared-components';

const Logo = styled.img({
  width: '25%',
  display: 'block',
  margin: '7.5% auto',
  filter: 'grayscale(100%)',
});

const Text = styled.p({
  margin: '5% 15%',
  textAlign: 'center',
  fontFamily: 'Verdana',
  fontSize: '15px',
  lineHeight: '25px',
});

const AboutUs: React.FunctionComponent = () => (
  <div>
    <Title>About Us page</Title>
    <Subtitle>Social Media</Subtitle>
    <Logo src={facebook} alt="Facebook logo" />
    <Logo src={twitter} alt="Twitter logo" />
    <Logo src={instagram} alt="Instagram logo" />
    <Text>
      Remember to follow us on our social media to know more about us and get
      notified about promotions and deals
    </Text>
  </div>
);

export default AboutUs;
