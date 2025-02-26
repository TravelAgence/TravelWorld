

import React from 'react';
import ServiceCard from './ServiceCard';
import {Col} from "reactstrap";

import weatherImg from './../assets/images/weather.png';
import guideImg from './../assets/images/guide.png';
import customizationImg from './../assets/images/customization.png';

const servicesData = [
    {
        imgUrl: weatherImg,
        title: 'Calculate Weather',
        description: 'A weather app that allows you to search for the weather of any city, country or location.',
    },
    {
        imgUrl: guideImg,
        title: 'Best Tour Guide',
        description: 'A weather app that allows you to search for the weather of any city, country or location.',
    },
    {
        imgUrl: customizationImg,
        title: 'Customization',
        description: 'A website that allows you to customize your experience with the best restaurants in your area.',
    },
]

const ServiceList = () => {
  return (
    <>
    {
        servicesData.map((item, index) => (
            <Col lg="3" key={index}>
                <ServiceCard item={item}/>
            </Col>
        ))}
    </>
  );
};

export default ServiceList
