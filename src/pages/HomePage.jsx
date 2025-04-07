import React from "react";
import HeroComponent from "../components/HeroComponent";
import WhyDonateComponent from "../components/WhyDonateComponent";
import ActionComponent from "../components/ActionComponent";
import BloodInfoComponent from "../components/BloodInfoComponent";

const HomePage = () => {
    React.useEffect(() => {
        const userKey = localStorage.getItem('userKey') || false;
        if (!userKey) {
            window.location.href = '/signup';
        }
    }, []);

    return(
        <div >
            <HeroComponent/>
            <BloodInfoComponent/>
            <WhyDonateComponent/>
            <ActionComponent/>
        </div>
    )
}

export default HomePage