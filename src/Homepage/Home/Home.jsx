import React from 'react';
import HomeSlider from './Slider';
import Slider from './Slider';
import Features from './Article';
import PricingPlans from './Pricing';

const Home = () => {

     const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
    return (
        <div className=' w-full'>
            <Slider></Slider>
            <Features></Features>
            <h1 className='font-bold text-xl text-center md:text-3xl'>Top Categories</h1>
            <PricingPlans></PricingPlans>
            <div className='flex justify-center items-center'>
                <button className='btn btn-accent' onClick={scrollToTop}>Scroll to top</button>
            </div>
        </div>
    );
};

export default Home;