import React from 'react';
import facebook from "./facebook.png"
import twitter from "./twitter.png"
import instagram from "./instagram.png"
import { Link } from 'react-router-dom';

const AboutUs: React.FunctionComponent = () => (
  <div>
    <h1>About Us page</h1>
    {/*<Link to="www.facebook.com"></Link>*/}
    <h2>Social Media</h2>
    <img src={facebook} alt="Facebook logo" className="logo" id="facebook"/>
    <img src={twitter} alt="Twitter logo" className="logo" id="twitter" />
    <img src={instagram} alt="instagram logo" className="logo" id="instagram" />
    <p>Remember to follow us on our social media to know more about us and get notified about promotions and deals</p>
  </div>
);

export default AboutUs;
